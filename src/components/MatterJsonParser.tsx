import { useState, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import {
  getClusterName,
  getCommandName,
  getAttributeInfo,
  normalizeHexId,
  CLUSTER_DESCRIPTIONS,
} from "../data/matter-definitions";
import {
  SAMPLE_CAPABILITY,
  SAMPLE_STATE,
  SAMPLE_READ_RESPONSE,
} from "../data/sample-data";

// ── Types ───────────────────────────────────────────────────────────────

type JsonType = "capability" | "state" | "read_response" | "unknown";

interface ParsedCapability {
  type: "capability";
  matterNodeId?: string;
  deviceType?: string;
  endpoints: {
    id: string;
    deviceType?: string;
    clusters: {
      id: string;
      name: string;
      description: string;
      commands: { id: string; name: string }[] | null;
    }[];
  }[];
}

interface ParsedState {
  type: "state";
  matterNodeId?: string;
  endpoints: {
    id: string;
    clusters: {
      id: string;
      name: string;
      attributes: {
        id: string;
        name: string;
        rawValue: any;
        interpretation?: string;
        status?: "good" | "warning" | "critical" | "neutral";
      }[];
    }[];
  }[];
}

interface ParsedReadResponse {
  type: "read_response";
  matterNodeId?: string;
  results: {
    endpointId: string;
    clusterId: string;
    clusterName: string;
    attributeId: string;
    attributeName: string;
    rawValue: any;
    interpretation?: string;
    status?: "good" | "warning" | "critical" | "neutral";
  }[];
}

type ParseResult = ParsedCapability | ParsedState | ParsedReadResponse;

// ── Detection & Parsing ─────────────────────────────────────────────────

function detectJsonType(data: any): JsonType {
  // Read response: top-level read_results array
  if (Array.isArray(data?.read_results)) return "read_response";

  // Capability or State: both have endpoints with clusters
  if (data?.endpoints) {
    const endpoints = data.endpoints;
    for (const epId of Object.keys(endpoints)) {
      const clusters = endpoints[epId]?.clusters;
      if (clusters) {
        for (const cId of Object.keys(clusters)) {
          const cluster = clusters[cId];
          if ("commands" in cluster) return "capability";
          if ("attributes" in cluster) return "state";
        }
      }
    }
  }

  return "unknown";
}

function getValueStatus(
  clusterId: string,
  attributeId: string,
  value: any
): "good" | "warning" | "critical" | "neutral" {
  const nc = normalizeHexId(clusterId);
  const na = normalizeHexId(attributeId);

  if (nc === "0x101") {
    // DoorLock
    if (na === "0x0") {
      // LockState
      if (value === 1) return "good"; // locked
      if (value === 2) return "warning"; // unlocked
      return "critical"; // not fully locked/unlocked
    }
    if (na === "0x2") return value ? "good" : "critical"; // ActuatorEnabled
  }
  if (nc === "0x2f") {
    // PowerSource
    if (na === "0xc") {
      // BatPercentRemaining
      const pct = value / 2;
      if (pct > 50) return "good";
      if (pct > 20) return "warning";
      return "critical";
    }
    if (na === "0xe") {
      // BatChargeLevel
      if (value === 0) return "good";
      if (value === 1) return "warning";
      return "critical";
    }
    if (na === "0xf") return value ? "critical" : "good"; // BatReplacementNeeded
    if (na === "0x0") return value === 1 ? "good" : "neutral"; // Status
  }

  return "neutral";
}

function parseCapability(data: any): ParsedCapability {
  const matterNodeId = data.matter_node_id;
  const deviceType = data.device_type;

  const rawEndpoints = data.endpoints;
  const endpoints = Object.entries(rawEndpoints).map(
    ([epId, epData]: [string, any]) => {
      const epDeviceType = epData?.device_type;
      const clusters = Object.entries(epData?.clusters || {}).map(
        ([clusterId, clusterData]: [string, any]) => {
          const cmds = clusterData?.commands;
          const commands =
            Array.isArray(cmds) && cmds.length > 0
              ? cmds.map((cmdId: string) => ({
                  id: cmdId,
                  name: getCommandName(clusterId, cmdId),
                }))
              : null;
          const normalized = normalizeHexId(clusterId);
          return {
            id: clusterId,
            name: clusterData?.name || getClusterName(clusterId),
            description: CLUSTER_DESCRIPTIONS[normalized] || "",
            commands,
          };
        }
      );
      return { id: epId, deviceType: epDeviceType, clusters };
    }
  );

  return { type: "capability", matterNodeId, deviceType, endpoints };
}

function parseState(data: any): ParsedState {
  const matterNodeId = data.matter_node_id;

  const endpoints = Object.entries(data.endpoints || {}).map(
    ([epId, epData]: [string, any]) => {
      const clusters = Object.entries(epData?.clusters || {}).map(
        ([clusterId, clusterData]: [string, any]) => {
          const attrs = clusterData?.attributes || {};
          const attributes = Object.entries(attrs).map(
            ([attrId, value]: [string, any]) => {
              const info = getAttributeInfo(clusterId, attrId);
              const status = getValueStatus(clusterId, attrId, value);
              return {
                id: attrId,
                name: info?.name || attrId,
                rawValue: value,
                interpretation: info?.interpret?.(value),
                status,
              };
            }
          );
          return {
            id: clusterId,
            name: getClusterName(clusterId),
            attributes,
          };
        }
      );
      return { id: epId, clusters };
    }
  );

  return { type: "state", matterNodeId, endpoints };
}

function parseReadResponse(data: any): ParsedReadResponse {
  const matterNodeId = data.matter_node_id;

  const results = (data.read_results || []).map((r: any) => {
    const clusterId = String(r.cluster_id);
    const attributeId = String(r.attribute_id);
    const info = getAttributeInfo(clusterId, attributeId);
    const status = getValueStatus(clusterId, attributeId, r.attribute_value);
    return {
      endpointId: String(r.endpoint_id),
      clusterId,
      clusterName: getClusterName(clusterId),
      attributeId,
      attributeName: info?.name || attributeId,
      rawValue: r.attribute_value,
      interpretation: info?.interpret?.(r.attribute_value),
      status,
    };
  });

  return { type: "read_response", matterNodeId, results };
}

// ── Collapsible Section ─────────────────────────────────────────────────

function CollapsibleSection({
  title,
  badge,
  defaultOpen = true,
  children,
}: {
  title: string;
  badge?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="collapsible-section">
      <button
        className="collapsible-header"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className={`collapsible-arrow ${open ? "open" : ""}`}>
          <ChevronRight size={12} strokeWidth={1.5} />
        </span>
        <span className="collapsible-title">{title}</span>
        {badge && <span className="collapsible-badge">{badge}</span>}
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </div>
  );
}

// ── Value Display ───────────────────────────────────────────────────────

function ValueDisplay({
  value,
  interpretation,
  status = "neutral",
}: {
  value: any;
  interpretation?: string;
  status?: "good" | "warning" | "critical" | "neutral";
}) {
  const statusClass = `value-status-${status}`;
  const displayValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  return (
    <span className={`value-display ${statusClass}`}>
      <code className="value-raw">{displayValue}</code>
      {interpretation && (
        <span className="value-interpretation">{interpretation}</span>
      )}
    </span>
  );
}

// ── Result Renderers ────────────────────────────────────────────────────

function CapabilityResult({ data }: { data: ParsedCapability }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge capability-badge">Capability</div>

      <div className="identity-card">
        <h3>设备功能声明</h3>
        <div className="identity-grid">
          {data.matterNodeId && (
            <div className="identity-row">
              <span className="identity-key">Matter Node ID</span>
              <span className="identity-value">
                <code>{data.matterNodeId}</code>
              </span>
            </div>
          )}
          {data.deviceType && (
            <div className="identity-row">
              <span className="identity-key">Device Type</span>
              <span className="identity-value">
                <code>{data.deviceType}</code>
              </span>
            </div>
          )}
        </div>
      </div>

      {data.endpoints.map((ep) => (
        <CollapsibleSection
          key={ep.id}
          title={
            ep.deviceType
              ? `Endpoint ${ep.id} — ${ep.deviceType}`
              : `Endpoint ${ep.id}`
          }
          badge={`${ep.clusters.length} 个 Cluster`}
        >
          {ep.clusters.map((cluster) => (
            <div key={cluster.id} className="cluster-card">
              <div className="cluster-header-row">
                <code className="cluster-id">{cluster.id}</code>
                <span className="cluster-name">{cluster.name}</span>
                {cluster.description && (
                  <span className="cluster-desc">{cluster.description}</span>
                )}
              </div>
              {cluster.commands ? (
                <div className="commands-list">
                  <span className="commands-label">
                    支持命令 ({cluster.commands.length}):
                  </span>
                  <div className="commands-pills">
                    {cluster.commands.map((cmd) => (
                      <span key={cmd.id} className="command-pill">
                        <code className="command-id">{cmd.id}</code>
                        {cmd.name !== cmd.id && (
                          <span className="command-name">{cmd.name}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="commands-none">无自定义命令</div>
              )}
            </div>
          ))}
        </CollapsibleSection>
      ))}
    </div>
  );
}

function StateResult({ data }: { data: ParsedState }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge state-badge">State</div>

      <div className="identity-card">
        <h3>属性状态</h3>
        <div className="identity-grid">
          {data.matterNodeId && (
            <div className="identity-row">
              <span className="identity-key">Matter Node ID</span>
              <span className="identity-value">
                <code>{data.matterNodeId}</code>
              </span>
            </div>
          )}
        </div>
      </div>

      {data.endpoints.map((ep) => (
        <CollapsibleSection
          key={ep.id}
          title={`Endpoint ${ep.id}`}
          badge={`${ep.clusters.length} 个 Cluster`}
        >
          {ep.clusters.map((cluster) => (
            <CollapsibleSection
              key={cluster.id}
              title={`${cluster.id} ${cluster.name}`}
              badge={`${cluster.attributes.length} 个属性`}
            >
              <div className="attributes-table">
                <div className="attr-header">
                  <span>属性 ID</span>
                  <span>属性名</span>
                  <span>值</span>
                </div>
                {cluster.attributes.map((attr) => (
                  <div key={attr.id} className="attr-row">
                    <code className="attr-id">{attr.id}</code>
                    <span className="attr-name">{attr.name}</span>
                    <ValueDisplay
                      value={attr.rawValue}
                      interpretation={attr.interpretation}
                      status={attr.status}
                    />
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          ))}
        </CollapsibleSection>
      ))}
    </div>
  );
}

function ReadResponseResult({ data }: { data: ParsedReadResponse }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge read-badge">ReadAttribute</div>

      <div className="identity-card">
        <h3>读取结果</h3>
        <div className="identity-grid">
          {data.matterNodeId && (
            <div className="identity-row">
              <span className="identity-key">Matter Node ID</span>
              <span className="identity-value">
                <code>{data.matterNodeId}</code>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="attributes-table">
        <div className="attr-header read-header">
          <span>Endpoint</span>
          <span>Cluster</span>
          <span>属性</span>
          <span>值</span>
        </div>
        {data.results.map((r, i) => (
          <div key={i} className="attr-row read-row">
            <code className="attr-id">{r.endpointId}</code>
            <span className="cluster-ref">
              <code>{normalizeHexId(r.clusterId)}</code>
              <span className="cluster-ref-name">{r.clusterName}</span>
            </span>
            <span className="attr-name">{r.attributeName}</span>
            <ValueDisplay
              value={r.rawValue}
              interpretation={r.interpretation}
              status={r.status}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────

export default function MatterJsonParser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = useCallback(() => {
    setError(null);
    setResult(null);

    const trimmed = input.trim();
    if (!trimmed) {
      setError("请输入 JSON 数据");
      return;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(trimmed);
    } catch (e: any) {
      setError(`JSON 格式错误: ${e.message}`);
      return;
    }

    const jsonType = detectJsonType(parsed);

    try {
      switch (jsonType) {
        case "capability":
          setResult(parseCapability(parsed));
          break;
        case "state":
          setResult(parseState(parsed));
          break;
        case "read_response":
          setResult(parseReadResponse(parsed));
          break;
        default:
          setError(
            "无法识别 JSON 类型。支持的格式：设备功能声明（含 endpoints.clusters.commands）、属性状态（含 endpoints.clusters.attributes）、ReadAttribute 响应（含 read_results）。"
          );
      }
    } catch (e: any) {
      setError(`解析失败: ${e.message}`);
    }
  }, [input]);

  const loadSample = useCallback(
    (sample: string) => {
      setInput(sample);
      setError(null);
      setResult(null);
    },
    []
  );

  return (
    <div className="parser-container">
      {/* Sample buttons */}
      <div className="sample-buttons">
        <span className="sample-label">示例数据:</span>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_CAPABILITY)}
          type="button"
        >
          设备功能声明
        </button>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_STATE)}
          type="button"
        >
          属性状态
        </button>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_READ_RESPONSE)}
          type="button"
        >
          读属性响应
        </button>
      </div>

      {/* Input */}
      <textarea
        className="json-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={'粘贴 Matter 设备 JSON 数据...\n\n支持三种格式：\n  1. 设备功能声明（含 endpoints + clusters + commands）\n  2. 属性状态（含 endpoints + clusters + attributes）\n  3. ReadAttribute 响应（含 read_results）'}
        spellCheck={false}
      />

      {/* Parse button */}
      <button className="parse-btn" onClick={handleParse} type="button">
        解析
      </button>

      {/* Error */}
      {error && <div className="parse-error">{error}</div>}

      {/* Results */}
      {result?.type === "capability" && <CapabilityResult data={result} />}
      {result?.type === "state" && <StateResult data={result} />}
      {result?.type === "read_response" && <ReadResponseResult data={result} />}

      <style>{componentStyles}</style>
    </div>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────

const componentStyles = `
.parser-container {
  margin-top: 1rem;
}

/* ── Sample buttons ─────────────────────────── */
.sample-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.sample-label {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.sample-btn {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: var(--font-sans);
}

.sample-btn:hover {
  border-color: var(--border-active);
  color: var(--color-primary-600, #4f46e5);
  background: var(--bg-primary);
}

:root.dark .sample-btn:hover {
  color: var(--color-primary-400, #818cf8);
}

/* ── Textarea ───────────────────────────────── */
.json-input {
  width: 100%;
  min-height: 320px;
  padding: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.6;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: var(--bg-code);
  color: var(--text-primary);
  resize: vertical;
  outline: none;
  transition: border-color 0.15s ease;
  box-sizing: border-box;
  tab-size: 2;
  white-space: pre;
}

.json-input:focus {
  border-color: var(--border-active);
}

.json-input::placeholder {
  color: var(--text-muted);
  white-space: pre-line;
}

/* ── Parse button ───────────────────────────── */
.parse-btn {
  margin-top: 0.75rem;
  padding: 0.5rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  background: var(--color-primary-600, #4f46e5);
  color: #fff;
  cursor: pointer;
  transition: background 0.15s ease;
  font-family: var(--font-sans);
}

.parse-btn:hover {
  background: var(--color-primary-700, #4338ca);
}

/* ── Error ──────────────────────────────────── */
.parse-error {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  color: #991b1b;
  font-size: 0.8125rem;
  font-family: var(--font-mono);
}

:root.dark .parse-error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

/* ── Results container ──────────────────────── */
.parse-results {
  margin-top: 1.5rem;
}

/* ── Type badges ────────────────────────────── */
.result-type-badge {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.1875rem 0.625rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.capability-badge {
  background: #dbeafe;
  color: #1e40af;
}
:root.dark .capability-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.state-badge {
  background: #dcfce7;
  color: #166534;
}
:root.dark .state-badge {
  background: rgba(34, 197, 94, 0.2);
  color: #86efac;
}

.read-badge {
  background: #fef3c7;
  color: #92400e;
}
:root.dark .read-badge {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

/* ── Identity card ──────────────────────────── */
.identity-card {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
  background: var(--bg-secondary);
}

.identity-card h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: var(--text-primary);
}

.identity-grid {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.identity-row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  font-size: 0.8125rem;
}

.identity-key {
  flex-shrink: 0;
  width: 160px;
  color: var(--text-muted);
  font-weight: 500;
}

.identity-value {
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.identity-value code {
  font-family: var(--font-mono);
  font-size: 0.8125em;
  background: var(--bg-code);
  padding: 0.0625rem 0.375rem;
  border-radius: 0.25rem;
}

/* ── Collapsible ────────────────────────────── */
.collapsible-section {
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.collapsible-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.625rem 1rem;
  border: none;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-sans);
  transition: background 0.1s;
}

.collapsible-header:hover {
  background: var(--bg-hover);
}

.collapsible-arrow {
  display: inline-flex;
  transition: transform 0.15s ease;
  color: var(--text-muted);
  flex-shrink: 0;
}

.collapsible-arrow.open {
  transform: rotate(90deg);
}

.collapsible-title {
  flex: 1;
}

.collapsible-badge {
  font-size: 0.6875rem;
  font-weight: 400;
  color: var(--text-muted);
  background: var(--bg-primary);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid var(--border-color);
}

.collapsible-body {
  padding: 0.75rem 1rem;
}

/* ── Cluster card ───────────────────────────── */
.cluster-card {
  padding: 0.625rem 0.75rem;
  margin-bottom: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  background: var(--bg-primary);
}

.cluster-card:last-child {
  margin-bottom: 0;
}

.cluster-header-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.375rem;
}

.cluster-id {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: var(--bg-code);
  padding: 0.0625rem 0.375rem;
  border-radius: 0.25rem;
  color: var(--color-primary-600, #4f46e5);
}

:root.dark .cluster-id {
  color: var(--color-primary-400, #818cf8);
}

.cluster-name {
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--text-primary);
}

.cluster-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ── Commands ───────────────────────────────── */
.commands-list {
  margin-top: 0.25rem;
}

.commands-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.375rem;
}

.commands-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.command-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  background: var(--bg-code);
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
}

.command-id {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.command-name {
  color: var(--text-primary);
  font-weight: 500;
}

.commands-none {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-style: italic;
}

/* ── Attributes table ───────────────────────── */
.attributes-table {
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  overflow: hidden;
}

.attr-header {
  display: grid;
  grid-template-columns: 80px 200px 1fr;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.attr-header.read-header {
  grid-template-columns: 70px 180px 160px 1fr;
}

.attr-row {
  display: grid;
  grid-template-columns: 80px 200px 1fr;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.8125rem;
  align-items: baseline;
}

.attr-row.read-row {
  grid-template-columns: 70px 180px 160px 1fr;
}

.attr-row:last-child {
  border-bottom: none;
}

.attr-row:hover {
  background: var(--bg-secondary);
}

.attr-id {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-muted);
}

.attr-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.8125rem;
}

/* ── Cluster ref in read response ───────────── */
.cluster-ref {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.cluster-ref code {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.cluster-ref-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-primary);
}

/* ── Value display ──────────────────────────── */
.value-display {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.value-raw {
  font-family: var(--font-mono);
  font-size: 0.8125em;
  padding: 0.0625rem 0.375rem;
  border-radius: 0.25rem;
}

.value-interpretation {
  font-size: 0.75rem;
  font-weight: 500;
}

.value-status-good .value-raw {
  background: #dcfce7;
  color: #166534;
}
:root.dark .value-status-good .value-raw {
  background: rgba(34, 197, 94, 0.15);
  color: #86efac;
}
.value-status-good .value-interpretation {
  color: #16a34a;
}
:root.dark .value-status-good .value-interpretation {
  color: #4ade80;
}

.value-status-warning .value-raw {
  background: #fef3c7;
  color: #92400e;
}
:root.dark .value-status-warning .value-raw {
  background: rgba(245, 158, 11, 0.15);
  color: #fcd34d;
}
.value-status-warning .value-interpretation {
  color: #d97706;
}
:root.dark .value-status-warning .value-interpretation {
  color: #fbbf24;
}

.value-status-critical .value-raw {
  background: #fee2e2;
  color: #991b1b;
}
:root.dark .value-status-critical .value-raw {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}
.value-status-critical .value-interpretation {
  color: #dc2626;
}
:root.dark .value-status-critical .value-interpretation {
  color: #f87171;
}

.value-status-neutral .value-raw {
  background: var(--bg-code);
  color: var(--text-primary);
}
.value-status-neutral .value-interpretation {
  color: var(--text-secondary);
}

/* ── Responsive ─────────────────────────────── */
@media (max-width: 640px) {
  .identity-row {
    flex-direction: column;
    gap: 0.125rem;
  }
  .identity-key {
    width: auto;
  }
  .attr-header,
  .attr-row {
    grid-template-columns: 60px 1fr;
  }
  .attr-header.read-header,
  .attr-row.read-row {
    grid-template-columns: 1fr;
  }
  .attr-row {
    gap: 0.25rem;
  }
}
`;
