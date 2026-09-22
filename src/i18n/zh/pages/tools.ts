/**
 * Tools page translations — Chinese
 */
export default {
  title: 'JSON 解析器',
  description: '在线 Matter 设备 JSON 数据解析器 — 粘贴设备上报的原始 JSON，自动识别 Cluster ID 和属性 ID，翻译为可读名称并给出中文释义。',
  heading: 'JSON 解析器',
  intro: '解析 Matter 设备的标准数据格式，自动识别数据类型，将 Cluster ID、属性 ID 翻译为可读名称，并对关键状态值给出中文释义。',
  parserHeading: '解析工具',
  formatsHeading: '支持的数据格式',
  format1: '设备功能声明',
  format1Desc: '包含 <code>endpoints</code> 及 Cluster 的 <code>commands</code>，描述设备支持的端点、Cluster 和命令',
  format2: '属性状态',
  format2Desc: '包含 <code>endpoints</code> 及 Cluster 的 <code>attributes</code>，描述设备当前各属性值',
  format3: 'ReadAttribute 响应',
  format3Desc: '包含 <code>read_results</code> 数组，Controller 读属性的返回结果',
} as const;
