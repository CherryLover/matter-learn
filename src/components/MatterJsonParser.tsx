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
  SAMPLE_RAW_NODE,
} from "../data/sample-data";
import {
  hex,
  isTestVendor,
  siteCluster,
  clusterDisplayName,
  deviceTypeDisplayName,
  findDeviceType,
  attributeName as specAttributeName,
  commandName as specCommandName,
  decodeFeatureMap,
  decodeSpecVersion,
} from "../data/matter-spec";

// ── Types ───────────────────────────────────────────────────────────────

type JsonType = "capability" | "state" | "read_response" | "raw" | "unknown";

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

interface RawCluster {
  id: number;
  revision?: number;
  featureMap?: number;
  attributeList?: number[];
  accepted?: number[];
  generated?: number[];
  attributes: { id: number; value: any }[];
}

interface ParsedRaw {
  type: "raw";
  nodeId?: string;
  basic: Record<number, any>; // BasicInformation 0x0028 属性（端点 0）
  endpoints: {
    id: number;
    deviceTypes: { id: number; revision?: number }[];
    parts?: number[];
    serverList?: number[];
    clientList?: number[];
    clusters: RawCluster[];
  }[];
}

type ParseResult = ParsedCapability | ParsedState | ParsedReadResponse | ParsedRaw;

// ── Detection & Parsing ─────────────────────────────────────────────────

const RAW_PATH = /^(\d+)\/(\d+)\/(\d+)$/;

/** 找到 "端点/Cluster/属性" 形式的属性表：matter-server 节点数据或 HA 诊断导出 */
function findRawAttributes(data: any): { attrs: Record<string, any>; node: any } | null {
  const candidates = [data, data?.node, data?.data?.node, data?.data];
  for (const node of candidates) {
    const attrs = node?.attributes;
    if (attrs && typeof attrs === "object" && !Array.isArray(attrs)) {
      const keys = Object.keys(attrs);
      if (keys.length > 0 && keys.some((k) => RAW_PATH.test(k))) return { attrs, node };
    }
  }
  return null;
}

function detectJsonType(data: any): JsonType {
  // Raw attribute dump: "endpoint/cluster/attribute" keys
  if (findRawAttributes(data)) return "raw";

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

/** 结构体字段在原始数据里用字段编号表示（"0"、"1"），也兼容命名写法 */
function structField(v: any, index: number, ...names: string[]) {
  if (v == null || typeof v !== "object") return undefined;
  if (String(index) in v) return v[String(index)];
  for (const n of names) if (n in v) return v[n];
  return undefined;
}

function numList(v: any): number[] | undefined {
  return Array.isArray(v) ? v.map((x) => Number(x)).filter((x) => !Number.isNaN(x)) : undefined;
}

function parseRaw(data: any): ParsedRaw {
  const found = findRawAttributes(data)!;
  const byEp = new Map<number, Map<number, Map<number, any>>>();
  for (const [key, value] of Object.entries(found.attrs)) {
    const m = key.match(RAW_PATH);
    if (!m) continue;
    const [ep, cl, at] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (!byEp.has(ep)) byEp.set(ep, new Map());
    const clusters = byEp.get(ep)!;
    if (!clusters.has(cl)) clusters.set(cl, new Map());
    clusters.get(cl)!.set(at, value);
  }

  const endpoints = [...byEp.keys()].sort((a, b) => a - b).map((ep) => {
    const clusters = byEp.get(ep)!;
    const descriptor = clusters.get(0x001d);
    const deviceTypes = (descriptor?.get(0) ?? []).map((s: any) => ({
      id: Number(structField(s, 0, "deviceType", "device_type", "type")),
      revision: structField(s, 1, "revision"),
    }));
    const serverList = numList(descriptor?.get(1));
    // 先按 ServerList 顺序，再补上数据里出现但没列出的 Cluster
    const order = [...(serverList ?? [])];
    for (const id of [...clusters.keys()].sort((a, b) => a - b)) if (!order.includes(id)) order.push(id);
    return {
      id: ep,
      deviceTypes,
      parts: numList(descriptor?.get(3)),
      serverList,
      clientList: numList(descriptor?.get(2)),
      clusters: order.map((cid) => {
        const attrs = clusters.get(cid) ?? new Map();
        return {
          id: cid,
          revision: attrs.get(0xfffd),
          featureMap: attrs.get(0xfffc),
          attributeList: numList(attrs.get(0xfffb)),
          accepted: numList(attrs.get(0xfff9)),
          generated: numList(attrs.get(0xfff8)),
          attributes: [...attrs.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([id, value]) => ({ id, value })),
        };
      }),
    };
  });

  const basicMap = byEp.get(0)?.get(0x0028);
  const basic: Record<number, any> = {};
  basicMap?.forEach((v, k) => (basic[k] = v));
  const nodeId = found.node?.node_id ?? found.node?.nodeId ?? data?.matter_node_id;

  return { type: "raw", nodeId: nodeId != null ? String(nodeId) : undefined, basic, endpoints };
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

// ── i18n ───────────────────────────────────────────────────────────────

type Lang = 'zh' | 'en';

const ui = {
  capabilityTitle:   { zh: '设备功能声明', en: 'Device Capability' },
  stateTitle:        { zh: '属性状态', en: 'Attribute State' },
  readResultTitle:   { zh: '读取结果', en: 'Read Results' },
  clusters:          { zh: ' 个 Cluster', en: ' Clusters' },
  supportedCmds:     { zh: '支持命令', en: 'Supported Commands' },
  noCmds:            { zh: '无自定义命令', en: 'No custom commands' },
  attributes:        { zh: ' 个属性', en: ' Attributes' },
  attrId:            { zh: '属性 ID', en: 'Attr ID' },
  attrName:          { zh: '属性名', en: 'Name' },
  value:             { zh: '值', en: 'Value' },
  attribute:         { zh: '属性', en: 'Attribute' },
  emptyInput:        { zh: '请输入 JSON 数据', en: 'Please enter JSON data' },
  jsonError:         { zh: 'JSON 格式错误', en: 'JSON syntax error' },
  parseFail:         { zh: '解析失败', en: 'Parse failed' },
  unknownType:       {
    zh: '无法识别 JSON 类型。支持的格式：设备原始数据（attributes 里是 "端点/Cluster/属性" 形式）、设备功能声明（含 endpoints.clusters.commands）、属性状态（含 endpoints.clusters.attributes）、ReadAttribute 响应（含 read_results）。',
    en: 'Unable to identify JSON type. Supported formats: Raw device data ("endpoint/cluster/attribute" keys under attributes), Device Capability (with endpoints.clusters.commands), Attribute State (with endpoints.clusters.attributes), ReadAttribute Response (with read_results).',
  },
  sampleLabel:       { zh: '示例数据:', en: 'Sample data:' },
  sampleCapability:  { zh: '设备功能声明', en: 'Capability' },
  sampleState:       { zh: '属性状态', en: 'State' },
  sampleRead:        { zh: '读属性响应', en: 'Read Response' },
  sampleRaw:         { zh: '设备原始数据', en: 'Raw device data' },
  placeholder:       {
    zh: '粘贴 Matter 设备 JSON 数据...\n\n支持四种格式：\n  1. 设备原始数据（"端点/Cluster/属性" 形式，如 Home Assistant 诊断导出）\n  2. 设备功能声明（含 endpoints + clusters + commands）\n  3. 属性状态（含 endpoints + clusters + attributes）\n  4. ReadAttribute 响应（含 read_results）',
    en: 'Paste Matter device JSON data...\n\nSupported formats:\n  1. Raw device data ("endpoint/cluster/attribute" keys, e.g. a Home Assistant diagnostics download)\n  2. Device Capability (endpoints + clusters + commands)\n  3. Attribute State (endpoints + clusters + attributes)\n  4. ReadAttribute Response (read_results)',
  },
  rawTitle:          { zh: '设备画像', en: 'Device profile' },
  rawIntro:          { zh: '每一项右侧标注了它来自哪个标准字段（端点/Cluster/属性，十进制）。', en: 'Each item shows the standard field it came from (endpoint/cluster/attribute, decimal).' },
  rowDeviceType:     { zh: '设备类型', en: 'Device type' },
  rowVendor:         { zh: '厂商', en: 'Vendor' },
  rowProduct:        { zh: '产品', en: 'Product' },
  rowFirmware:       { zh: '固件版本', en: 'Firmware' },
  rowHardware:       { zh: '硬件版本', en: 'Hardware' },
  rowSerial:         { zh: '序列号', en: 'Serial number' },
  rowSpec:           { zh: '支持的 Matter 版本', en: 'Matter version' },
  rowEndpoints:      { zh: '功能端点', en: 'Endpoints' },
  testVendor:        { zh: '测试厂商 ID', en: 'test vendor ID' },
  howTitle:          { zh: '这些信息是怎么读出来的', en: 'How this was read' },
  how1:              { zh: '端点 0 的 Descriptor.PartsList（0/29/3）→ 设备有哪些端点', en: 'Descriptor.PartsList on endpoint 0 (0/29/3) → which endpoints exist' },
  how2:              { zh: '每个端点的 Descriptor.DeviceTypeList（x/29/0）→ 这个端点是什么设备', en: 'Descriptor.DeviceTypeList on each endpoint (x/29/0) → what each endpoint is' },
  how3:              { zh: '每个端点的 Descriptor.ServerList（x/29/1）→ 实现了哪些 Cluster', en: 'Descriptor.ServerList on each endpoint (x/29/1) → which clusters it implements' },
  how4:              { zh: '每个 Cluster 的 FeatureMap / AcceptedCommandList / AttributeList（x/y/65532、65529、65531）→ 具体支持哪些功能、命令和属性', en: 'FeatureMap / AcceptedCommandList / AttributeList of each cluster (x/y/65532, 65529, 65531) → exact features, commands and attributes' },
  how5:              { zh: '端点 0 的 BasicInformation（0/40/*）→ 厂商、型号、版本、序列号', en: 'BasicInformation on endpoint 0 (0/40/*) → vendor, model, versions, serial' },
  epDeviceTypes:     { zh: '设备类型', en: 'Device types' },
  clientClusters:    { zh: '客户端 Cluster（它会去控制别的设备）', en: 'Client clusters (it controls other devices with these)' },
  features:          { zh: '支持的功能', en: 'Features' },
  noFeatures:        { zh: '没有启用可选功能', en: 'No optional features' },
  accepted:          { zh: '可接收命令', en: 'Accepted commands' },
  generated:         { zh: '会回复', en: 'Generated responses' },
  attrList:          { zh: '已实现属性', en: 'Implemented attributes' },
  allAttrs:          { zh: '原始属性', en: 'Raw attributes' },
  openManual:        { zh: '手册 →', en: 'Manual →' },
  notReported:       { zh: '数据里没有这个 Cluster 的属性值（只知道它存在）', en: 'No attribute values for this cluster in the data (only that it exists)' },
  revision:          { zh: '修订版', en: 'rev' },
  parseBtn:          { zh: '解析', en: 'Parse' },
} as const;

function t(lang: Lang, key: keyof typeof ui): string {
  return ui[key][lang] ?? ui[key]['zh'];
}

// ── Result Renderers ────────────────────────────────────────────────────

function CapabilityResult({ data, lang }: { data: ParsedCapability; lang: Lang }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge capability-badge">Capability</div>

      <div className="identity-card">
        <h3>{t(lang, 'capabilityTitle')}</h3>
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
          badge={`${ep.clusters.length}${t(lang, 'clusters')}`}
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
                    {t(lang, 'supportedCmds')} ({cluster.commands.length}):
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
                <div className="commands-none">{t(lang, 'noCmds')}</div>
              )}
            </div>
          ))}
        </CollapsibleSection>
      ))}
    </div>
  );
}

function StateResult({ data, lang }: { data: ParsedState; lang: Lang }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge state-badge">State</div>

      <div className="identity-card">
        <h3>{t(lang, 'stateTitle')}</h3>
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
          badge={`${ep.clusters.length}${t(lang, 'clusters')}`}
        >
          {ep.clusters.map((cluster) => (
            <CollapsibleSection
              key={cluster.id}
              title={`${cluster.id} ${cluster.name}`}
              badge={`${cluster.attributes.length}${t(lang, 'attributes')}`}
            >
              <div className="attributes-table">
                <div className="attr-header">
                  <span>{t(lang, 'attrId')}</span>
                  <span>{t(lang, 'attrName')}</span>
                  <span>{t(lang, 'value')}</span>
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

function ReadResponseResult({ data, lang }: { data: ParsedReadResponse; lang: Lang }) {
  return (
    <div className="parse-results">
      <div className="result-type-badge read-badge">ReadAttribute</div>

      <div className="identity-card">
        <h3>{t(lang, 'readResultTitle')}</h3>
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
          <span>{t(lang, 'attribute')}</span>
          <span>{t(lang, 'value')}</span>
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

function SourceTag({ path }: { path: string }) {
  return <code className="raw-src">{path}</code>;
}

function RawClusterCard({ epId, c, lang }: { epId: number; c: RawCluster; lang: Lang }) {
  const site = siteCluster(c.id);
  const cid = hex(c.id);
  const features = c.featureMap !== undefined ? decodeFeatureMap(c.id, Number(c.featureMap)) : null;
  return (
    <div className="cluster-card">
      <div className="cluster-header-row">
        <code className="cluster-id">{cid}</code>
        <span className="cluster-name">{clusterDisplayName(c.id, lang)}</span>
        {c.revision !== undefined && <span className="cluster-desc">{t(lang, 'revision')} {String(c.revision)}</span>}
        {site && (
          <a className="raw-manual" href={`/${lang}/clusters/${site.slug}/`}>{t(lang, 'openManual')}</a>
        )}
      </div>

      {c.attributes.length === 0 && <div className="commands-none">{t(lang, 'notReported')}</div>}

      {features && (
        <div className="commands-list">
          <span className="commands-label">
            {t(lang, 'features')} FeatureMap = {String(c.featureMap)} <SourceTag path={`${epId}/${c.id}/65532`} />
          </span>
          <div className="commands-pills">
            {features.length === 0 && <span className="commands-none">{t(lang, 'noFeatures')}</span>}
            {features.map((f) => (
              <span key={f.bit} className="command-pill" title={`bit ${f.bit}`}>
                <code className="command-id">{f.code}</code>
                {f.name && <span className="command-name">{f.name}</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {c.accepted && c.accepted.length > 0 && (
        <div className="commands-list">
          <span className="commands-label">
            {t(lang, 'accepted')} ({c.accepted.length}) <SourceTag path={`${epId}/${c.id}/65529`} />
          </span>
          <div className="commands-pills">
            {c.accepted.map((id) => (
              <span key={id} className="command-pill">
                <code className="command-id">{hex(id, 2)}</code>
                <span className="command-name">{specCommandName(c.id, id) ?? "?"}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {c.generated && c.generated.length > 0 && (
        <div className="commands-list">
          <span className="commands-label">
            {t(lang, 'generated')} ({c.generated.length}) <SourceTag path={`${epId}/${c.id}/65528`} />
          </span>
          <div className="commands-pills">
            {c.generated.map((id) => (
              <span key={id} className="command-pill">
                <code className="command-id">{hex(id, 2)}</code>
                <span className="command-name">{specCommandName(c.id, id, true) ?? "?"}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {c.attributeList && c.attributeList.length > 0 && (
        <div className="commands-list">
          <span className="commands-label">
            {t(lang, 'attrList')} ({c.attributeList.length}) <SourceTag path={`${epId}/${c.id}/65531`} />
          </span>
          <div className="commands-pills">
            {c.attributeList.map((id) => (
              <span key={id} className="command-pill">
                <code className="command-id">{hex(id)}</code>
                <span className="command-name">{specAttributeName(c.id, id) ?? "?"}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {c.attributes.length > 0 && (
        <div className="raw-attrs">
          <CollapsibleSection title={t(lang, 'allAttrs')} badge={`${c.attributes.length}${t(lang, 'attributes')}`} defaultOpen={false}>
            <div className="attributes-table">
              <div className="attr-header">
                <span>{t(lang, 'attrId')}</span>
                <span>{t(lang, 'attrName')}</span>
                <span>{t(lang, 'value')}</span>
              </div>
              {c.attributes.map((a) => {
                const info = getAttributeInfo(cid, hex(a.id));
                return (
                  <div key={a.id} className="attr-row">
                    <code className="attr-id">{hex(a.id)}</code>
                    <span className="attr-name">{info?.name ?? "?"}</span>
                    <ValueDisplay
                      value={a.value}
                      interpretation={info?.interpret?.(a.value)}
                      status={getValueStatus(cid, hex(a.id), a.value)}
                    />
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>
        </div>
      )}
    </div>
  );
}

function RawResult({ data, lang }: { data: ParsedRaw; lang: Lang }) {
  const b = data.basic;
  // 中文用全角括号和逗号，英文用半角
  const [lp, rp, sep] = lang === 'zh' ? ['（', '）', '，'] : [' (', ')', ', '];
  const ep0 = data.endpoints.find((e) => e.id === 0);
  const appTypes = data.endpoints.flatMap((ep) =>
    ep.deviceTypes
      .filter((dt) => findDeviceType(dt.id)?.class !== "Node")
      .map((dt) => ({ ...dt, ep: ep.id }))
  );

  const rows: { key: string; value: React.ReactNode; src: string }[] = [];
  if (appTypes.length > 0) {
    rows.push({
      key: t(lang, 'rowDeviceType'),
      value: appTypes.map((dt) => `${deviceTypeDisplayName(dt.id, lang)} · EP${dt.ep}`).join(sep),
      src: [...new Set(appTypes.map((dt) => `${dt.ep}/29/0`))].join(' · '),
    });
  }
  if (b[1] !== undefined || b[2] !== undefined) {
    const vid = Number(b[2]);
    rows.push({
      key: t(lang, 'rowVendor'),
      value: `${b[1] ?? ''}${b[2] !== undefined ? `${lp}VendorID ${hex(vid)}${isTestVendor(vid) ? ` · ${t(lang, 'testVendor')}` : ''}${rp}` : ''}`,
      src: '0/40/1 · 0/40/2',
    });
  }
  if (b[3] !== undefined || b[4] !== undefined) {
    rows.push({
      key: t(lang, 'rowProduct'),
      value: `${b[3] ?? ''}${b[4] !== undefined ? `${lp}ProductID ${hex(Number(b[4]))}${rp}` : ''}`,
      src: '0/40/3 · 0/40/4',
    });
  }
  if (b[10] !== undefined || b[9] !== undefined) {
    rows.push({ key: t(lang, 'rowFirmware'), value: `${b[10] ?? ''}${b[9] !== undefined ? `${lp}${b[9]}${rp}` : ''}`, src: '0/40/10 · 0/40/9' });
  }
  if (b[8] !== undefined || b[7] !== undefined) {
    rows.push({ key: t(lang, 'rowHardware'), value: `${b[8] ?? ''}${b[7] !== undefined ? `${lp}${b[7]}${rp}` : ''}`, src: '0/40/8 · 0/40/7' });
  }
  if (b[15] !== undefined) rows.push({ key: t(lang, 'rowSerial'), value: String(b[15]), src: '0/40/15' });
  if (b[21] !== undefined) {
    rows.push({ key: t(lang, 'rowSpec'), value: `Matter ${decodeSpecVersion(Number(b[21]))}${lp}${b[21]}${rp}`, src: '0/40/21' });
  }
  if (ep0?.parts) rows.push({ key: t(lang, 'rowEndpoints'), value: ep0.parts.join(', ') || '—', src: '0/29/3' });

  return (
    <div className="parse-results">
      <div className="result-type-badge raw-badge">Raw Attributes</div>

      <div className="identity-card">
        <h3>{t(lang, 'rawTitle')}</h3>
        <p className="raw-intro">{t(lang, 'rawIntro')}</p>
        <div className="identity-grid">
          {data.nodeId && (
            <div className="identity-row">
              <span className="identity-key">Node ID</span>
              <span className="identity-value"><code>{data.nodeId}</code></span>
            </div>
          )}
          {rows.map((r) => (
            <div key={r.key} className="identity-row">
              <span className="identity-key">{r.key}</span>
              <span className="identity-value raw-value">
                <span>{r.value}</span>
                <SourceTag path={r.src} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="raw-how">
        <div className="raw-how-title">{t(lang, 'howTitle')}</div>
        <ol>
          <li>{t(lang, 'how1')}</li>
          <li>{t(lang, 'how2')}</li>
          <li>{t(lang, 'how3')}</li>
          <li>{t(lang, 'how4')}</li>
          <li>{t(lang, 'how5')}</li>
        </ol>
      </div>

      {data.endpoints.map((ep) => {
        const typeNames = ep.deviceTypes.map((dt) => deviceTypeDisplayName(dt.id, lang));
        return (
          <CollapsibleSection
            key={ep.id}
            title={typeNames.length ? `Endpoint ${ep.id} — ${typeNames.join(' · ')}` : `Endpoint ${ep.id}`}
            badge={`${ep.clusters.length}${t(lang, 'clusters')}`}
          >
            {ep.deviceTypes.length > 0 && (
              <div className="commands-list raw-ep-types">
                <span className="commands-label">
                  {t(lang, 'epDeviceTypes')} <SourceTag path={`${ep.id}/29/0`} />
                </span>
                <div className="commands-pills">
                  {ep.deviceTypes.map((dt) => (
                    <span key={dt.id} className="command-pill">
                      <code className="command-id">{hex(dt.id)}</code>
                      <span className="command-name">
                        {deviceTypeDisplayName(dt.id, lang)}
                        {dt.revision !== undefined ? ` · ${t(lang, 'revision')} ${dt.revision}` : ''}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {ep.clusters.map((c) => (
              <RawClusterCard key={c.id} epId={ep.id} c={c} lang={lang} />
            ))}
            {ep.clientList && ep.clientList.length > 0 && (
              <div className="commands-list raw-ep-types">
                <span className="commands-label">
                  {t(lang, 'clientClusters')} <SourceTag path={`${ep.id}/29/2`} />
                </span>
                <div className="commands-pills">
                  {ep.clientList.map((id) => (
                    <span key={id} className="command-pill">
                      <code className="command-id">{hex(id)}</code>
                      <span className="command-name">{clusterDisplayName(id, lang)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleSection>
        );
      })}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────

export default function MatterJsonParser({ lang = 'zh' as Lang }: { lang?: Lang }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = useCallback(() => {
    setError(null);
    setResult(null);

    const trimmed = input.trim();
    if (!trimmed) {
      setError(t(lang, 'emptyInput'));
      return;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(trimmed);
    } catch (e: any) {
      setError(`${t(lang, 'jsonError')}: ${e.message}`);
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
        case "raw":
          setResult(parseRaw(parsed));
          break;
        default:
          setError(t(lang, 'unknownType'));
      }
    } catch (e: any) {
      setError(`${t(lang, 'parseFail')}: ${e.message}`);
    }
  }, [input, lang]);

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
        <span className="sample-label">{t(lang, 'sampleLabel')}</span>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_RAW_NODE)}
          type="button"
        >
          {t(lang, 'sampleRaw')}
        </button>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_CAPABILITY)}
          type="button"
        >
          {t(lang, 'sampleCapability')}
        </button>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_STATE)}
          type="button"
        >
          {t(lang, 'sampleState')}
        </button>
        <button
          className="sample-btn"
          onClick={() => loadSample(SAMPLE_READ_RESPONSE)}
          type="button"
        >
          {t(lang, 'sampleRead')}
        </button>
      </div>

      {/* Input */}
      <textarea
        className="json-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t(lang, 'placeholder')}
        spellCheck={false}
      />

      {/* Parse button */}
      <button className="parse-btn" onClick={handleParse} type="button">
        {t(lang, 'parseBtn')}
      </button>

      {/* Error */}
      {error && <div className="parse-error">{error}</div>}

      {/* Results */}
      {result?.type === "capability" && <CapabilityResult data={result} lang={lang} />}
      {result?.type === "state" && <StateResult data={result} lang={lang} />}
      {result?.type === "read_response" && <ReadResponseResult data={result} lang={lang} />}
      {result?.type === "raw" && <RawResult data={result} lang={lang} />}

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

.raw-badge {
  background: #dcfce7;
  color: #166534;
}
:root.dark .raw-badge {
  background: rgba(34, 197, 94, 0.2);
  color: #86efac;
}

.raw-src {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  padding: 0.0625rem 0.375rem;
  border-radius: 0.25rem;
  background: var(--color-primary-50, #eef2ff);
  color: var(--color-primary-700, #4338ca);
  white-space: nowrap;
  font-weight: 400;
}
:root.dark .raw-src {
  background: rgba(99, 102, 241, 0.15);
  color: var(--color-primary-300, #a5b4fc);
}
.raw-intro {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin: -0.25rem 0 0.75rem;
}
.identity-value.raw-value {
  flex-wrap: wrap;
}
.raw-how {
  border: 1px dashed var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}
.raw-how-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}
.raw-how ol {
  margin: 0;
  padding-left: 1.25rem;
}
.raw-how li {
  margin: 0.125rem 0;
}
.raw-manual {
  margin-left: auto;
  font-size: 0.75rem;
}
.raw-attrs {
  margin-top: 0.625rem;
}
.raw-ep-types {
  padding: 0.25rem 0 0.5rem;
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
