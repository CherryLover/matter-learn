/**
 * Matter 官方 ID 数据表（由 scripts/gen-matter-spec.py 从 connectedhomeip ZAP XML 生成）
 * 以及基于它的查询工具函数。ID 查询工具、JSON 解析器都用这里。
 */
import spec from './matter-spec.json';
import zhClusterIndex from '../i18n/zh/pages/cluster-index';

export type Lang = 'zh' | 'en';

export interface SpecFeature {
  bit: number;
  code: string;
  name: string;
}

export interface SpecCluster {
  id: string; // 0xXXXX
  name: string;
  maturity: string; // stable | provisional | deprecated
  attributes: Record<string, string>; // 0xXXXX → name
  commands: Record<string, string>; // 0xXX → name（客户端发给设备的请求）
  responses: Record<string, string>; // 0xXX → name（设备回给客户端的响应）
  events: Record<string, string>;
  features: SpecFeature[];
}

export interface SpecDeviceType {
  id: string;
  name: string;
  class: string;
  revision: number;
}

export const SPEC_SOURCE: string = spec.source;
export const SPEC_CLUSTERS = spec.clusters as SpecCluster[];
export const SPEC_DEVICE_TYPES = spec.deviceTypes as SpecDeviceType[];
export const GLOBAL_ATTRIBUTES = spec.globalAttributes as Record<string, string>;

const clusterById = new Map<number, SpecCluster>(SPEC_CLUSTERS.map((c) => [parseInt(c.id, 16), c]));
const deviceTypeById = new Map<number, SpecDeviceType>(SPEC_DEVICE_TYPES.map((d) => [parseInt(d.id, 16), d]));

// 站内有详情页的 Cluster：ID → { slug, 中文名, 英文名 }
interface SiteCluster {
  slug: string;
  cnName: string;
  enName: string;
}
const siteClusterById = new Map<number, SiteCluster>();
for (const cat of zhClusterIndex.categories) {
  for (const c of cat.clusters) {
    const slug = c.href.replace(/^\/clusters\//, '').replace(/\/$/, '');
    siteClusterById.set(parseInt(c.id, 16), { slug, cnName: c.cnName, enName: c.enName });
  }
}

// 设备类型中文名（官方只有英文，这里补上译名）
const DEVICE_TYPE_ZH: Record<string, string> = {
  '0x000A': '门锁',
  '0x000B': '门锁控制器',
  '0x000E': '聚合器（桥接器）',
  '0x000F': '通用开关（按键）',
  '0x0011': '电源',
  '0x0012': 'OTA 升级请求方',
  '0x0013': '被桥接节点',
  '0x0014': 'OTA 升级提供方',
  '0x0015': '门窗磁传感器',
  '0x0016': '根节点',
  '0x0017': '太阳能发电',
  '0x0018': '储能电池',
  '0x0019': '副网络接口',
  '0x0022': '音箱',
  '0x0023': '投屏播放器',
  '0x0024': '内容应用',
  '0x0027': '模式选择',
  '0x0028': '基础视频播放器',
  '0x0029': '投屏客户端',
  '0x002A': '视频遥控器',
  '0x002B': '风扇',
  '0x002C': '空气质量传感器',
  '0x002D': '空气净化器',
  '0x0041': '防冻检测器',
  '0x0042': '水阀',
  '0x0043': '漏水检测器',
  '0x0044': '雨量传感器',
  '0x0045': '土壤传感器',
  '0x0070': '冰箱',
  '0x0071': '温控柜',
  '0x0072': '房间空调',
  '0x0073': '洗衣机',
  '0x0074': '扫地机器人',
  '0x0075': '洗碗机',
  '0x0076': '烟雾/一氧化碳报警器',
  '0x0077': '灶头',
  '0x0078': '灶具',
  '0x0079': '微波炉',
  '0x007A': '抽油烟机',
  '0x007B': '烤箱',
  '0x007C': '干衣机',
  '0x007D': '加湿/除湿器',
  '0x0090': '网络基础设施管理器',
  '0x0091': 'Thread 边界路由器',
  '0x0100': '开关灯',
  '0x0101': '可调光灯',
  '0x0103': '灯光开关',
  '0x0104': '调光开关',
  '0x0105': '调色调光开关',
  '0x0106': '光照传感器',
  '0x0107': '人体存在传感器',
  '0x010A': '智能插座',
  '0x010B': '可调光插座',
  '0x010C': '色温灯',
  '0x010D': '彩色灯',
  '0x010F': '嵌入式开关控制',
  '0x0110': '嵌入式调光控制',
  '0x0130': '联合 Fabric 管理员',
  '0x0140': '对讲机',
  '0x0141': '音频门铃',
  '0x0142': '摄像头',
  '0x0143': '可视门铃',
  '0x0144': '泛光灯摄像头',
  '0x0145': '快照摄像头',
  '0x0146': '门铃铃声器',
  '0x0147': '摄像头控制器',
  '0x0148': '门铃',
  '0x0150': '环境感知传感器',
  '0x0152': '距离测量器',
  '0x0202': '窗帘',
  '0x0203': '窗帘控制器',
  '0x0230': '开合设备',
  '0x0231': '开合面板',
  '0x023E': '开合控制器',
  '0x0301': '温控器',
  '0x0302': '温度传感器',
  '0x0303': '水泵',
  '0x0304': '水泵控制器',
  '0x0305': '气压传感器',
  '0x0306': '流量传感器',
  '0x0307': '湿度传感器',
  '0x0309': '热泵',
  '0x030A': '温控控制器',
  '0x050C': '电动汽车充电桩',
  '0x050D': '设备能源管理',
  '0x050F': '热水器',
  '0x0510': '电气传感器',
  '0x0511': '电力公用事业电表',
  '0x0512': '电表参考点',
  '0x0513': '电价',
  '0x0514': '电表',
  '0x0516': '断路器',
  '0x0517': '配电箱',
  '0x0840': '控制桥',
  '0x0850': '开关传感器',
};

// ── ID 解析 ─────────────────────────────────────────────────────────────

export interface ParsedId {
  value: number; // 32 位无符号整数
  /** 用户输入的是纯数字（可能是十进制，也可能是省略了 0x 的十六进制） */
  ambiguousDecimal: boolean;
  /** 纯数字时按十六进制理解的值 */
  hexAlternative?: number;
}

/** 解析用户输入的 ID：支持 0x0101 / 0x0000_0101 / 257 / 0101h / 1234FC01 */
export function parseMatterId(raw: string): ParsedId | null {
  const s = raw.trim().replace(/[_\s]/g, '');
  if (!s) return null;
  let m = s.match(/^0x([0-9a-f]{1,8})$/i) || s.match(/^([0-9a-f]{1,8})h$/i);
  if (m) return { value: parseInt(m[1], 16) >>> 0, ambiguousDecimal: false };
  if (/^\d+$/.test(s)) {
    const dec = Number(s);
    if (dec > 0xffffffff) return null;
    const hex = s.length <= 8 ? parseInt(s, 16) : undefined;
    return { value: dec, ambiguousDecimal: true, hexAlternative: hex !== dec ? hex : undefined };
  }
  m = s.match(/^([0-9a-f]{1,8})$/i);
  if (m) return { value: parseInt(m[1], 16) >>> 0, ambiguousDecimal: false };
  return null;
}

export function hex(n: number, width = 4): string {
  return '0x' + n.toString(16).toUpperCase().padStart(width, '0');
}

/** 32 位完整写法：0x0000_0101 */
export function hex32(n: number): string {
  const h = (n >>> 0).toString(16).toUpperCase().padStart(8, '0');
  return `0x${h.slice(0, 4)}_${h.slice(4)}`;
}

export function splitMei(n: number) {
  return { prefix: (n >>> 16) & 0xffff, suffix: n & 0xffff };
}

/** 测试用厂商 ID（0xFFF1 ~ 0xFFF4），量产设备不会用 */
export function isTestVendor(vendorId: number) {
  return vendorId >= 0xfff1 && vendorId <= 0xfff4;
}

// ── 查询 ────────────────────────────────────────────────────────────────

export function toNumber(id: string | number): number {
  if (typeof id === 'number') return id;
  const s = id.trim();
  return /^0x/i.test(s) ? parseInt(s, 16) : /^\d+$/.test(s) ? Number(s) : parseInt(s, 16);
}

export function findCluster(id: string | number): SpecCluster | undefined {
  return clusterById.get(toNumber(id));
}

export function findDeviceType(id: string | number): SpecDeviceType | undefined {
  return deviceTypeById.get(toNumber(id));
}

export function siteCluster(id: string | number): SiteCluster | undefined {
  return siteClusterById.get(toNumber(id));
}

/** Cluster 展示名：中文站优先用站内中文名 */
export function clusterDisplayName(id: string | number, lang: Lang): string {
  const n = toNumber(id);
  const site = siteClusterById.get(n);
  const c = clusterById.get(n);
  if (site) return lang === 'zh' ? `${site.cnName}（${site.enName}）` : site.enName;
  if (c) return c.name;
  const { prefix } = splitMei(n);
  if (prefix !== 0) return lang === 'zh' ? '厂商自定义 Cluster' : 'Vendor-specific cluster';
  return lang === 'zh' ? '未知 Cluster' : 'Unknown cluster';
}

export function deviceTypeDisplayName(id: string | number, lang: Lang): string {
  const n = toNumber(id);
  const d = deviceTypeById.get(n);
  if (!d) {
    const { prefix } = splitMei(n);
    if (prefix !== 0) return lang === 'zh' ? '厂商自定义设备类型' : 'Vendor-specific device type';
    return lang === 'zh' ? '未知设备类型' : 'Unknown device type';
  }
  const zh = DEVICE_TYPE_ZH[d.id];
  return lang === 'zh' && zh ? `${zh}（${d.name}）` : d.name;
}

export function deviceTypeZhName(id: string): string | undefined {
  return DEVICE_TYPE_ZH[id];
}

export function attributeName(clusterId: string | number, attrId: string | number): string | undefined {
  const a = toNumber(attrId);
  const key = hex(a & 0xffff);
  if ((a >>> 16) === 0 && GLOBAL_ATTRIBUTES[key]) return GLOBAL_ATTRIBUTES[key];
  return findCluster(clusterId)?.attributes[key];
}

export function commandName(clusterId: string | number, cmdId: string | number, response = false): string | undefined {
  const c = findCluster(clusterId);
  if (!c) return undefined;
  const key = hex(toNumber(cmdId) & 0xff, 2);
  return response ? c.responses[key] ?? c.commands[key] : c.commands[key] ?? c.responses[key];
}

/** 把 FeatureMap 数值拆成逐位的功能开关 */
export function decodeFeatureMap(clusterId: string | number, value: number) {
  const c = findCluster(clusterId);
  const known = new Map((c?.features ?? []).map((f) => [f.bit, f]));
  const bits: { bit: number; code: string; name: string }[] = [];
  for (let bit = 0; bit < 32; bit++) {
    if ((value >>> bit) & 1) {
      const f = known.get(bit);
      bits.push({ bit, code: f?.code ?? '?', name: f?.name ?? '' });
    }
  }
  return bits;
}

/** BasicInformation.SpecificationVersion：0x01040200 → 1.4.2 */
export function decodeSpecVersion(v: number): string {
  const major = (v >>> 24) & 0xff;
  const minor = (v >>> 16) & 0xff;
  const dot = (v >>> 8) & 0xff;
  return `${major}.${minor}${dot ? '.' + dot : ''}`;
}

/** 名称模糊搜索（Cluster + 设备类型） */
export function searchByName(q: string, limit = 12) {
  const needle = q.trim().toLowerCase().replace(/[\s/_-]/g, '');
  if (!needle) return { clusters: [] as SpecCluster[], deviceTypes: [] as SpecDeviceType[] };
  const norm = (s: string) => s.toLowerCase().replace(/[\s/_-]/g, '');
  const clusters = SPEC_CLUSTERS.filter((c) => {
    const site = siteClusterById.get(parseInt(c.id, 16));
    return norm(c.name).includes(needle) || (site && (norm(site.cnName).includes(needle) || norm(site.enName).includes(needle)));
  }).slice(0, limit);
  const deviceTypes = SPEC_DEVICE_TYPES.filter((d) => {
    const zh = DEVICE_TYPE_ZH[d.id];
    return norm(d.name).includes(needle) || (zh && norm(zh).includes(needle));
  }).slice(0, limit);
  return { clusters, deviceTypes };
}
