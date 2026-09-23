import { useMemo, useState } from "react";
import {
  parseMatterId,
  hex,
  hex32,
  splitMei,
  isTestVendor,
  findCluster,
  findDeviceType,
  siteCluster,
  deviceTypeZhName,
  searchByName,
  GLOBAL_ATTRIBUTES,
  SPEC_SOURCE,
  type Lang,
  type SpecCluster,
  type SpecDeviceType,
} from "../data/matter-spec";

type Mode = "all" | "cluster";

const ui = {
  placeholder: {
    zh: "输入 ID 或名称，如 0x0101、257、0x0016、DoorLock、门锁",
    en: "Enter an ID or a name, e.g. 0x0101, 257, 0x0016, DoorLock",
  },
  placeholderCluster: {
    zh: "输入 Cluster ID 或名称，如 0x0101、257、6、门锁",
    en: "Enter a Cluster ID or name, e.g. 0x0101, 257, 6, DoorLock",
  },
  tryLabel: { zh: "试试：", en: "Try:" },
  structure: { zh: "ID 结构", en: "ID structure" },
  full32: { zh: "32 位完整写法", en: "Full 32-bit form" },
  prefix: { zh: "前 16 位 · 厂商前缀", en: "Upper 16 bits · vendor prefix" },
  suffix: { zh: "后 16 位 · 编号", en: "Lower 16 bits · number" },
  prefixStd: { zh: "0x0000 = Matter 标准（CSA 定义）", en: "0x0000 = Matter standard (defined by CSA)" },
  prefixTest: { zh: "测试用厂商 ID，量产设备不会出现", en: "Test vendor ID, never used by production devices" },
  prefixVendor: { zh: "厂商 ID，这是该厂商自己定义的扩展", en: "Vendor ID, this is that vendor's own extension" },
  shortForm: {
    zh: "前缀为 0 时通常省略，只写后 4 位，所以大家看到的 Cluster ID 大多像 0x0101 这样“两个字节”。",
    en: "When the prefix is 0 it is usually omitted, which is why most Cluster IDs look like two bytes, e.g. 0x0101.",
  },
  decimalNote: {
    zh: "你输入的是纯数字，已按十进制理解（很多工具和日志里的 ID 都是十进制）。如果你原本想输入的是省略了 0x 的十六进制，请点：",
    en: "You entered plain digits, so they were read as decimal (many tools and logs print IDs in decimal). If you meant hexadecimal without the 0x prefix, try:",
  },
  asCluster: { zh: "作为 Cluster ID", en: "As a Cluster ID" },
  asDeviceType: { zh: "作为设备类型 ID（Device Type）", en: "As a Device Type ID" },
  asGlobalAttr: { zh: "作为属性 ID（全局属性）", en: "As an Attribute ID (global attribute)" },
  notFound: { zh: "没有找到对应的定义", en: "No matching definition" },
  openManual: { zh: "查看手册详情 →", en: "Open manual page →" },
  noManual: { zh: "官方已定义，本站暂未收录详情页", en: "Defined by the spec, no detail page on this site yet" },
  attrs: { zh: "个属性", en: "attributes" },
  cmds: { zh: "个命令", en: "commands" },
  feats: { zh: "个功能位", en: "feature bits" },
  provisional: { zh: "临时（provisional）", en: "provisional" },
  deprecated: { zh: "已弃用", en: "deprecated" },
  classLabel: { zh: "类别", en: "Class" },
  revision: { zh: "当前修订版", en: "Current revision" },
  sameNumber: {
    zh: "同一个数字在不同字段里代表不同的东西。判断含义时，先看它出现在哪个字段里：cluster_id、device_type、attribute_id……",
    en: "The same number means different things in different fields. Always check which field it appears in first: cluster_id, device_type, attribute_id…",
  },
  rangeStdFree: {
    zh: "位于标准 Cluster 范围（0x0000 ~ 0x7FFF），但当前版本还没有用到这个编号。",
    en: "Inside the standard cluster range (0x0000–0x7FFF), but unused in the current spec.",
  },
  rangeVendor: {
    zh: "编号落在厂商自定义范围（0xFC00 ~ 0xFFFE）。这类 Cluster 只能查厂商自己的文档。",
    en: "The number is in the vendor-specific range (0xFC00–0xFFFE). Only the vendor's own documentation defines it.",
  },
  rangeVendorBadPrefix: {
    zh: "编号落在厂商自定义范围，但前缀是 0x0000。合法的厂商 Cluster 前面必须带上厂商 ID，比如 0x1234_FC00。",
    en: "The number is in the vendor-specific range but the prefix is 0x0000. A valid vendor cluster must carry the vendor ID, e.g. 0x1234_FC00.",
  },
  rangeInvalid: {
    zh: "不在任何合法的 Cluster 编号范围内。",
    en: "Not inside any valid cluster ID range.",
  },
  dtRangeStd: {
    zh: "位于标准设备类型范围（0x0000 ~ 0xBFFF），但当前版本还没有用到这个编号。",
    en: "Inside the standard device type range (0x0000–0xBFFF), but unused in the current spec.",
  },
  dtVendor: {
    zh: "带厂商前缀，是厂商自定义的设备类型。",
    en: "Has a vendor prefix, so it is a vendor-specific device type.",
  },
  searchClusters: { zh: "匹配的 Cluster", en: "Matching clusters" },
  searchDeviceTypes: { zh: "匹配的设备类型", en: "Matching device types" },
  searchNone: { zh: "没有匹配的名称。", en: "No matching names." },
  invalid: { zh: "无法识别。请输入十六进制（0x0101）、十进制（257）或名称。", en: "Unrecognised. Enter hex (0x0101), decimal (257) or a name." },
  source: { zh: "数据来源：", en: "Data source: " },
} as const;

function t(lang: Lang, key: keyof typeof ui) {
  return ui[key][lang];
}

const GLOBAL_ATTR_DESC: Record<string, { zh: string; en: string }> = {
  "0xFFFD": { zh: "这个 Cluster 按第几版定义实现", en: "Which revision of the cluster definition is implemented" },
  "0xFFFC": { zh: "可选功能开关，每一位代表一个功能是否启用", en: "Optional feature switches, one bit per feature" },
  "0xFFFB": { zh: "设备实际实现了哪些属性", en: "Which attributes the device actually implements" },
  "0xFFF9": { zh: "设备能接收哪些命令", en: "Which commands the device accepts" },
  "0xFFF8": { zh: "设备会回哪些响应命令", en: "Which response commands the device generates" },
};

const EXAMPLES_ALL = ["0x0101", "257", "0x0016", "0xFFFC", "0x1234FC01"];
const EXAMPLES_CLUSTER = ["0x0101", "6", "0x001D", "0x0028", "0x1234FC01"];

function clusterHref(lang: Lang, slug: string) {
  return `/${lang}/clusters/${slug}/`;
}

function MaturityBadge({ maturity, lang }: { maturity: string; lang: Lang }) {
  if (maturity === "provisional") return <span className="idl-badge idl-badge-warn">{t(lang, "provisional")}</span>;
  if (maturity === "deprecated") return <span className="idl-badge idl-badge-muted">{t(lang, "deprecated")}</span>;
  return null;
}

function ClusterHit({ c, lang }: { c: SpecCluster; lang: Lang }) {
  const site = siteCluster(c.id);
  const cmdCount = Object.keys(c.commands).length;
  return (
    <div className="idl-hit">
      <div className="idl-hit-title">
        <code>{c.id}</code>
        <strong>{lang === "zh" && site ? `${site.cnName}（${c.name}）` : c.name}</strong>
        <MaturityBadge maturity={c.maturity} lang={lang} />
      </div>
      <div className="idl-hit-meta">
        {Object.keys(c.attributes).length} {t(lang, "attrs")} · {cmdCount} {t(lang, "cmds")} · {c.features.length} {t(lang, "feats")}
      </div>
      {site ? (
        <a className="idl-link" href={clusterHref(lang, site.slug)}>{t(lang, "openManual")}</a>
      ) : (
        <span className="idl-muted">{t(lang, "noManual")}</span>
      )}
    </div>
  );
}

function DeviceTypeHit({ d, lang }: { d: SpecDeviceType; lang: Lang }) {
  const zh = deviceTypeZhName(d.id);
  return (
    <div className="idl-hit">
      <div className="idl-hit-title">
        <code>{d.id}</code>
        <strong>{lang === "zh" && zh ? `${zh}（${d.name}）` : d.name}</strong>
      </div>
      <div className="idl-hit-meta">
        {t(lang, "classLabel")}: {d.class || "—"} · {t(lang, "revision")}: {d.revision}
      </div>
    </div>
  );
}

export default function MatterIdLookup({ lang = "zh", mode = "all" }: { lang?: Lang; mode?: Mode }) {
  const [input, setInput] = useState("");
  const examples = mode === "cluster" ? EXAMPLES_CLUSTER : EXAMPLES_ALL;
  const query = input.trim();

  const result = useMemo(() => {
    if (!query) return null;
    const parsed = parseMatterId(query);
    if (parsed) return { kind: "id" as const, parsed };
    if (/[a-z一-龥]/i.test(query)) {
      const found = searchByName(query);
      if (mode === "cluster") found.deviceTypes = [];
      return { kind: "name" as const, found };
    }
    return { kind: "invalid" as const };
  }, [query, mode]);

  return (
    <div className="idl">
      <input
        className="idl-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t(lang, mode === "cluster" ? "placeholderCluster" : "placeholder")}
        spellCheck={false}
        autoComplete="off"
        aria-label={t(lang, mode === "cluster" ? "placeholderCluster" : "placeholder")}
      />
      <div className="idl-examples">
        <span>{t(lang, "tryLabel")}</span>
        {examples.map((ex) => (
          <button key={ex} type="button" className="idl-chip" onClick={() => setInput(ex)}>
            {ex}
          </button>
        ))}
      </div>

      {result?.kind === "invalid" && <div className="idl-error">{t(lang, "invalid")}</div>}

      {result?.kind === "name" && (
        <div className="idl-results">
          {result.found.clusters.length === 0 && result.found.deviceTypes.length === 0 && (
            <div className="idl-muted">{t(lang, "searchNone")}</div>
          )}
          {result.found.clusters.length > 0 && (
            <div className="idl-card">
              <div className="idl-card-title">{t(lang, "searchClusters")}</div>
              {result.found.clusters.map((c) => <ClusterHit key={c.id} c={c} lang={lang} />)}
            </div>
          )}
          {result.found.deviceTypes.length > 0 && (
            <div className="idl-card">
              <div className="idl-card-title">{t(lang, "searchDeviceTypes")}</div>
              {result.found.deviceTypes.map((d) => <DeviceTypeHit key={d.id} d={d} lang={lang} />)}
            </div>
          )}
        </div>
      )}

      {result?.kind === "id" && (
        <IdResult
          lang={lang}
          mode={mode}
          value={result.parsed.value}
          hexAlternative={result.parsed.ambiguousDecimal ? result.parsed.hexAlternative : undefined}
          onPick={(v) => setInput(hex(v, v > 0xffff ? 8 : 4))}
        />
      )}

      <div className="idl-source">{t(lang, "source")}{SPEC_SOURCE}</div>
      <style>{styles}</style>
    </div>
  );
}

function IdResult({
  lang,
  mode,
  value,
  hexAlternative,
  onPick,
}: {
  lang: Lang;
  mode: Mode;
  value: number;
  hexAlternative?: number;
  onPick: (v: number) => void;
}) {
  const { prefix, suffix } = splitMei(value);
  const cluster = findCluster(value);
  const deviceType = findDeviceType(value);
  const globalAttr = prefix === 0 ? GLOBAL_ATTRIBUTES[hex(suffix)] : undefined;

  let prefixNote: string = t(lang, "prefixStd");
  if (prefix !== 0) prefixNote = isTestVendor(prefix) ? t(lang, "prefixTest") : t(lang, "prefixVendor");

  // Cluster 范围判断
  let clusterRange = "";
  if (!cluster) {
    if (suffix >= 0xfc00 && suffix <= 0xfffe) clusterRange = prefix === 0 ? t(lang, "rangeVendorBadPrefix") : t(lang, "rangeVendor");
    else if (prefix === 0 && suffix <= 0x7fff) clusterRange = t(lang, "rangeStdFree");
    else clusterRange = t(lang, "rangeInvalid");
  }

  let dtRange = "";
  if (!deviceType) {
    if (prefix !== 0) dtRange = t(lang, "dtVendor");
    else if (suffix <= 0xbfff) dtRange = t(lang, "dtRangeStd");
  }

  return (
    <div className="idl-results">
      {hexAlternative !== undefined && (
        <div className="idl-note">
          {t(lang, "decimalNote")}{" "}
          <button type="button" className="idl-chip" onClick={() => onPick(hexAlternative)}>
            {hex(hexAlternative, hexAlternative > 0xffff ? 8 : 4)}
          </button>
        </div>
      )}

      <div className="idl-card">
        <div className="idl-card-title">{t(lang, "structure")}</div>
        <div className="idl-bits">
          <div className="idl-bits-full">
            <span className="idl-muted">{t(lang, "full32")}</span>
            <code>{hex32(value)}</code>
            {value <= 0xffffffff && <span className="idl-muted">= {value}</span>}
          </div>
          <div className="idl-bits-row">
            <div className={`idl-seg ${prefix === 0 ? "idl-seg-std" : "idl-seg-vendor"}`}>
              <code>{hex(prefix)}</code>
              <span>{t(lang, "prefix")}</span>
              <small>{prefixNote}</small>
            </div>
            <div className="idl-seg idl-seg-num">
              <code>{hex(suffix)}</code>
              <span>{t(lang, "suffix")}</span>
            </div>
          </div>
          {prefix === 0 && <p className="idl-hint">{t(lang, "shortForm")}</p>}
        </div>
      </div>

      <div className="idl-card">
        <div className="idl-card-title">{t(lang, "asCluster")}</div>
        {cluster ? <ClusterHit c={cluster} lang={lang} /> : <div className="idl-muted">{t(lang, "notFound")} — {clusterRange}</div>}
      </div>

      {mode === "all" && (
        <>
          <div className="idl-card">
            <div className="idl-card-title">{t(lang, "asDeviceType")}</div>
            {deviceType ? (
              <DeviceTypeHit d={deviceType} lang={lang} />
            ) : (
              <div className="idl-muted">{t(lang, "notFound")}{dtRange ? ` — ${dtRange}` : ""}</div>
            )}
          </div>
          {globalAttr && (
            <div className="idl-card">
              <div className="idl-card-title">{t(lang, "asGlobalAttr")}</div>
              <div className="idl-hit">
                <div className="idl-hit-title">
                  <code>{hex(suffix)}</code>
                  <strong>{globalAttr}</strong>
                </div>
                <div className="idl-hit-meta">{GLOBAL_ATTR_DESC[hex(suffix)]?.[lang]}</div>
              </div>
            </div>
          )}
          {cluster && deviceType && <p className="idl-hint">{t(lang, "sameNumber")}</p>}
        </>
      )}
    </div>
  );
}

const styles = `
.idl { margin: 1rem 0 1.5rem; }
.idl-input {
  width: 100%; box-sizing: border-box; padding: 0.75rem 1rem;
  font-family: var(--font-mono); font-size: 0.9375rem;
  border: 1px solid var(--border-color); border-radius: 0.5rem;
  background: var(--bg-primary); color: var(--text-primary); outline: none;
  transition: border-color 0.15s ease;
}
.idl-input:focus { border-color: var(--border-active); }
.idl-input::placeholder { color: var(--text-muted); font-family: var(--font-sans); }
.idl-examples { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; margin-top: 0.5rem; font-size: 0.8125rem; color: var(--text-muted); }
.idl-chip {
  font-family: var(--font-mono); font-size: 0.75rem; padding: 0.125rem 0.625rem;
  border: 1px solid var(--border-color); border-radius: 9999px;
  background: var(--bg-secondary); color: var(--text-secondary); cursor: pointer;
}
.idl-chip:hover { border-color: var(--border-active); color: var(--color-primary-600); }
:root.dark .idl-chip:hover { color: var(--color-primary-400); }
.idl-results { display: grid; gap: 0.75rem; margin-top: 1rem; }
.idl-card { border: 1px solid var(--border-color); border-radius: 0.5rem; padding: 0.875rem 1rem; background: var(--bg-secondary); }
.idl-card-title { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.02em; color: var(--text-muted); margin-bottom: 0.5rem; }
.idl-hit + .idl-hit { margin-top: 0.625rem; padding-top: 0.625rem; border-top: 1px dashed var(--border-color); }
.idl-hit-title { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; color: var(--text-primary); }
.idl-hit-title code { font-size: 0.8125rem; }
.idl-hit-meta { font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.25rem; }
.idl-link { display: inline-block; margin-top: 0.375rem; font-size: 0.8125rem; }
.idl-muted { font-size: 0.8125rem; color: var(--text-muted); }
.idl-hit .idl-muted { display: inline-block; margin-top: 0.375rem; }
.idl-badge { font-size: 0.6875rem; padding: 0.0625rem 0.5rem; border-radius: 9999px; font-weight: 500; }
.idl-badge-warn { background: #fef3c7; color: #92400e; }
:root.dark .idl-badge-warn { background: rgba(245,158,11,0.15); color: #fcd34d; }
.idl-badge-muted { background: var(--bg-hover); color: var(--text-secondary); }
.idl-bits-full { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem; font-size: 0.875rem; }
.idl-bits-full code { font-size: 1rem; }
.idl-bits-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.625rem; }
.idl-seg { display: flex; flex-direction: column; gap: 0.125rem; padding: 0.625rem 0.75rem; border-radius: 0.375rem; border: 1px solid var(--border-color); background: var(--bg-primary); min-width: 0; }
.idl-seg code { font-size: 1rem; font-weight: 600; background: none; padding: 0; }
.idl-seg span { font-size: 0.75rem; color: var(--text-secondary); }
.idl-seg small { font-size: 0.75rem; color: var(--text-muted); }
.idl-seg-std { border-color: #86efac; }
.idl-seg-vendor { border-color: #fcd34d; }
.idl-seg-num { border-color: var(--color-primary-300); }
:root.dark .idl-seg-std { border-color: rgba(34,197,94,0.45); }
:root.dark .idl-seg-vendor { border-color: rgba(245,158,11,0.45); }
:root.dark .idl-seg-num { border-color: rgba(129,140,248,0.5); }
.idl-hint { font-size: 0.8125rem; color: var(--text-secondary); margin: 0.625rem 0 0; }
.idl-note { font-size: 0.8125rem; color: var(--text-secondary); padding: 0.625rem 0.875rem; border-radius: 0.5rem; background: var(--color-primary-50); }
:root.dark .idl-note { background: rgba(99,102,241,0.12); }
.idl-error { margin-top: 0.75rem; font-size: 0.8125rem; color: #dc2626; }
:root.dark .idl-error { color: #f87171; }
.idl-source { margin-top: 0.75rem; font-size: 0.75rem; color: var(--text-muted); }
@media (max-width: 480px) { .idl-bits-row { grid-template-columns: 1fr; } }
`;
