/**
 * i18n configuration and utility functions
 */

export const LANGUAGES = {
  zh: '中文',
  en: 'English',
} as const;

export type Lang = keyof typeof LANGUAGES;

export const DEFAULT_LANG: Lang = 'zh';
export const SUPPORTED_LANGS = Object.keys(LANGUAGES) as Lang[];

/**
 * Extract language from URL path
 * e.g. /zh/clusters/door-lock/ → 'zh'
 */
export function getLangFromPath(path: string): Lang {
  const seg = path.split('/').filter(Boolean)[0];
  if (seg && seg in LANGUAGES) return seg as Lang;
  return DEFAULT_LANG;
}

/**
 * Strip the language prefix from a path
 * e.g. /zh/clusters/door-lock/ → /clusters/door-lock/
 */
export function stripLangPrefix(path: string): string {
  const seg = path.split('/').filter(Boolean);
  if (seg[0] && seg[0] in LANGUAGES) {
    seg.shift();
  }
  return '/' + seg.join('/') + (seg.length > 0 ? '/' : '');
}

/**
 * Build a localised path
 * e.g. ('en', '/clusters/door-lock/') → '/en/clusters/door-lock/'
 */
export function localePath(lang: Lang, path: string): string {
  const clean = stripLangPrefix(path);
  return `/${lang}${clean}`;
}

/**
 * Get the alternate language
 */
export function getAlternateLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}
