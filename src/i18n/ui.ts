/**
 * Common UI translations used across layouts and components
 */

const ui = {
  // ── Header navigation ─────────────────────────────────────────────
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.concepts': { zh: '概念总览', en: 'Concepts' },
  'nav.clusterManual': { zh: 'Cluster 手册', en: 'Cluster Manual' },
  'nav.dataTools': { zh: '数据工具', en: 'Data Tools' },
  'nav.jsonParser': { zh: 'JSON 解析器', en: 'JSON Parser' },
  'nav.officialStandards': { zh: '官方标准', en: 'Official Standards' },
  'nav.csaWebsite': { zh: 'CSA 官网', en: 'CSA Website' },
  'nav.matterSpec': { zh: 'Matter 规范', en: 'Matter Spec' },
  'nav.matterGithub': { zh: 'Matter GitHub', en: 'Matter GitHub' },
  'nav.deviceLibrary': { zh: 'Device Library', en: 'Device Library' },
  'nav.viewAll82': { zh: '查看全部 82 个 Cluster', en: 'View All 82 Clusters' },

  // ── Cluster mega-menu group headings ───────────────────────────────
  'nav.group.lighting': { zh: '照明控制', en: 'Lighting' },
  'nav.group.closure': { zh: '闭合设备', en: 'Closure Devices' },
  'nav.group.hvac': { zh: '暖通空调', en: 'HVAC' },
  'nav.group.sensing': { zh: '传感与测量', en: 'Sensing & Measurement' },
  'nav.group.safety': { zh: '安防与输入', en: 'Safety & Input' },
  'nav.group.appliance': { zh: '家电', en: 'Appliances' },
  'nav.group.media': { zh: '媒体', en: 'Media' },
  'nav.group.general': { zh: '通用功能', en: 'General' },
  'nav.group.node': { zh: '节点与配置', en: 'Node & Config' },
  'nav.group.commissioning': { zh: '配网与安全', en: 'Commissioning & Security' },
  'nav.group.diagnostics': { zh: 'OTA 与诊断', en: 'OTA & Diagnostics' },
  'nav.group.energy': { zh: '能源管理', en: 'Energy Management' },

  // ── Cluster mega-menu items ────────────────────────────────────────
  'nav.cluster.onOff': { zh: '开关 OnOff', en: 'OnOff' },
  'nav.cluster.levelControl': { zh: '亮度 LevelControl', en: 'LevelControl' },
  'nav.cluster.colorControl': { zh: '颜色 ColorControl', en: 'ColorControl' },
  'nav.cluster.doorLock': { zh: '门锁 DoorLock', en: 'DoorLock' },
  'nav.cluster.windowCovering': { zh: '窗帘 WindowCovering', en: 'WindowCovering' },
  'nav.cluster.valveConfig': { zh: '阀门 ValveConfig', en: 'ValveConfig' },
  'nav.cluster.thermostat': { zh: '温控 Thermostat', en: 'Thermostat' },
  'nav.cluster.fanControl': { zh: '风扇 FanControl', en: 'FanControl' },
  'nav.cluster.temperature': { zh: '温度 Temperature', en: 'Temperature' },
  'nav.cluster.humidity': { zh: '湿度 Humidity', en: 'Humidity' },
  'nav.cluster.occupancy': { zh: '占位 Occupancy', en: 'Occupancy' },
  'nav.cluster.airQuality': { zh: '空气 AirQuality', en: 'AirQuality' },
  'nav.cluster.smokeCOAlarm': { zh: '烟感 SmokeCOAlarm', en: 'SmokeCOAlarm' },
  'nav.cluster.booleanState': { zh: '布尔 BooleanState', en: 'BooleanState' },
  'nav.cluster.operationalState': { zh: '运行状态 OperationalState', en: 'OperationalState' },
  'nav.cluster.laundryWasher': { zh: '洗衣机 LaundryWasher', en: 'LaundryWasher' },
  'nav.cluster.rvcRunMode': { zh: '扫地机 RvcRunMode', en: 'RvcRunMode' },
  'nav.cluster.mediaPlayback': { zh: '播放 MediaPlayback', en: 'MediaPlayback' },
  'nav.cluster.channel': { zh: '频道 Channel', en: 'Channel' },
  'nav.cluster.identify': { zh: '标识 Identify', en: 'Identify' },
  'nav.cluster.descriptor': { zh: '描述 Descriptor', en: 'Descriptor' },
  'nav.cluster.accessControl': { zh: '权限 AccessControl', en: 'AccessControl' },
  'nav.cluster.basicInfo': { zh: '基本信息 BasicInfo', en: 'BasicInfo' },
  'nav.cluster.powerSource': { zh: '电源 PowerSource', en: 'PowerSource' },
  'nav.cluster.timeSync': { zh: '时间 TimeSynchronization', en: 'TimeSynchronization' },
  'nav.cluster.networkComm': { zh: '网络配置 NetworkComm', en: 'NetworkCommissioning' },
  'nav.cluster.opCred': { zh: '凭据 OperationalCred', en: 'OperationalCredentials' },
  'nav.cluster.otaProvider': { zh: 'OTA Provider', en: 'OTA Provider' },
  'nav.cluster.generalDiag': { zh: '通用诊断 GeneralDiag', en: 'GeneralDiagnostics' },
  'nav.cluster.elecPower': { zh: '电功率 ElecPower', en: 'ElectricalPower' },

  // ── Resources navigation ───────────────────────────────────────────
  'nav.resources': { zh: '生态资源', en: 'Resources' },

  // ── SDK navigation ────────────────────────────────────────────────
  'nav.sdkGuides': { zh: 'SDK 指南', en: 'SDK Guides' },
  'nav.sdk.android': { zh: 'Android SDK', en: 'Android SDK' },
  'nav.sdk.ios': { zh: 'iOS SDK', en: 'iOS SDK' },
  'nav.sdk.web': { zh: 'Web / Node.js', en: 'Web / Node.js' },
  'nav.sdk.overview': { zh: '全部 SDK 指南', en: 'All SDK Guides' },

  // ── Roadmap navigation ────────────────────────────────────────────
  'nav.roadmap': { zh: '版本路线', en: 'Roadmap' },

  // ── Header buttons ────────────────────────────────────────────────
  'header.toggleTheme': { zh: '切换主题', en: 'Toggle theme' },
  'header.toggleMenu': { zh: '展开菜单', en: 'Toggle menu' },
  'header.switchLang': { zh: 'EN', en: '中' },
  'header.switchLangLabel': { zh: 'Switch to English', en: '切换到中文' },

  // ── Footer ─────────────────────────────────────────────────────────
  'footer.about': {
    zh: 'Matter 协议学习与参考平台，帮助开发者理解智能家居统一标准。',
    en: 'A learning and reference platform for the Matter protocol, helping developers understand the unified smart home standard.',
  },
  'footer.siteNav': { zh: '站内导航', en: 'Site Navigation' },
  'footer.concepts': { zh: '概念总览', en: 'Concepts' },
  'footer.clusterManual': { zh: 'Cluster 手册', en: 'Cluster Manual' },
  'footer.jsonParser': { zh: 'JSON 解析器', en: 'JSON Parser' },
  'footer.officialResources': { zh: '官方资源', en: 'Official Resources' },
  'footer.resources': { zh: '生态资源', en: 'Resources' },
  'footer.resources.official': { zh: '官方标准', en: 'Official Standards' },
  'footer.resources.platforms': { zh: '开发平台', en: 'Dev Platforms' },
  'footer.resources.openSource': { zh: '开源项目', en: 'Open Source' },
  'footer.resources.community': { zh: '社区站点', en: 'Community Sites' },
  'footer.devGuides': { zh: '开发指南', en: 'Dev Guides' },
  'footer.devGuides.android': { zh: 'Android SDK', en: 'Android SDK' },
  'footer.devGuides.ios': { zh: 'iOS SDK', en: 'iOS SDK' },
  'footer.devGuides.web': { zh: 'Web / Node.js', en: 'Web / Node.js' },
  'footer.devGuides.roadmap': { zh: '版本路线图', en: 'Version Roadmap' },
  'footer.more': { zh: '更多', en: 'More' },
  'footer.dataSourceLabel': { zh: '数据来源说明', en: 'Data Source' },
  'footer.dataSourceText': {
    zh: '本站数据基于 Matter 标准规范整理，部分示例来自真实设备采集。',
    en: 'Data on this site is compiled from the Matter standard specification. Some examples come from real devices.',
  },
  'footer.copyright': {
    zh: '© 2026 Matter Learn · 基于 Matter 标准规范整理',
    en: '© 2026 Matter Learn · Built on the Matter Standard Specification',
  },

  // ── DocLayout ──────────────────────────────────────────────────────
  'doc.prev': { zh: '上一篇', en: 'Previous' },
  'doc.next': { zh: '下一篇', en: 'Next' },

  // ── TableOfContents ────────────────────────────────────────────────
  'toc.title': { zh: '目录', en: 'Contents' },

  // ── Back to top ────────────────────────────────────────────────────
  'backToTop': { zh: '回到顶部', en: 'Back to top' },

  // ── BaseLayout meta ────────────────────────────────────────────────
  'meta.defaultDescription': {
    zh: 'Matter 协议学习站点 — 从零理解智能家居统一标准协议的核心概念，快速查阅 Cluster 定义，在线解析设备数据。',
    en: 'Matter Protocol Learning Hub — Understand the core concepts of the unified smart home standard from scratch, browse Cluster definitions, and parse device data online.',
  },
} as const;

export type UiKey = keyof typeof ui;

import type { Lang } from './config';

/**
 * Get a UI translation string
 */
export function t(lang: Lang, key: UiKey): string {
  const entry = ui[key];
  return entry[lang] ?? entry['zh'];
}

export default ui;
