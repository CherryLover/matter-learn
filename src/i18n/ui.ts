/**
 * Common UI translations used across layouts and components
 */

const ui = {
  // ── Header navigation ─────────────────────────────────────────────
  'nav.concepts': { zh: '概念总览', en: 'Concepts' },
  'nav.clusterManual': { zh: 'Cluster 手册', en: 'Cluster Manual' },
  'nav.jsonParser': { zh: 'JSON 解析器', en: 'JSON Parser' },
  'nav.idLookup': { zh: 'Matter ID 查询', en: 'Matter ID Lookup' },
  'nav.csaWebsite': { zh: 'CSA 官网', en: 'CSA Website' },
  'nav.matterSpec': { zh: 'Matter 规范', en: 'Matter Spec' },
  'nav.matterGithub': { zh: 'Matter GitHub', en: 'Matter GitHub' },
  'nav.deviceLibrary': { zh: 'Matter 设备库', en: 'Matter Device Library' },
  'nav.manualTools': { zh: '手册与工具', en: 'Manual & Tools' },
  'nav.deviceTypes': { zh: '设备类型速查', en: 'Device Type IDs' },

  // ── Cluster mega-menu group headings ───────────────────────────────

  // ── Cluster mega-menu items ────────────────────────────────────────

  // ── Resources navigation ───────────────────────────────────────────
  'nav.resources': { zh: '生态资源', en: 'Ecosystem Resources' },
  'nav.resourcesMenu': { zh: '资源', en: 'Resources' },

  // ── SDK navigation ────────────────────────────────────────────────
  'nav.sdkGuides': { zh: 'SDK 指南', en: 'SDK Guides' },
  'nav.sdk.android': { zh: 'Android SDK', en: 'Android SDK' },
  'nav.sdk.ios': { zh: 'iOS SDK', en: 'iOS SDK' },
  'nav.sdk.web': { zh: 'Web / Node.js', en: 'Web / Node.js' },
  'nav.sdk.overview': { zh: 'SDK 总览', en: 'SDK Overview' },

  // ── Roadmap navigation ────────────────────────────────────────────
  'nav.roadmap': { zh: '版本路线', en: 'Roadmap' },
  'nav.compare': { zh: '协议对比', en: 'Protocol Comparison' },
  'nav.getStarted': { zh: '入门', en: 'Get Started' },
  'nav.faq': { zh: '常见问题', en: 'FAQ' },

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
