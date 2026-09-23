/**
 * 全站导航分类：顶部导航栏和底部栏共用这一份数据，保证两处结构完全一致。
 * 4 个大类，每类 4–5 个入口。
 */
import { type Lang, localePath } from './config';
import { t } from './ui';

export interface SiteNavLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface SiteNavGroup {
  title: string;
  links: SiteNavLink[];
}

export function getSiteNav(lang: Lang): SiteNavGroup[] {
  const lp = (path: string) => localePath(lang, path);
  return [
    {
      title: t(lang, 'nav.getStarted'),
      links: [
        { title: t(lang, 'nav.concepts'), href: lp('/concepts/') },
        { title: t(lang, 'nav.faq'), href: lp('/faq/') },
        { title: t(lang, 'nav.compare'), href: lp('/compare/') },
        { title: t(lang, 'nav.roadmap'), href: lp('/roadmap/') },
      ],
    },
    {
      title: t(lang, 'nav.manualTools'),
      links: [
        { title: t(lang, 'nav.clusterManual'), href: lp('/clusters/') },
        { title: t(lang, 'nav.idLookup'), href: lp('/tools/id-lookup/') },
        { title: t(lang, 'nav.jsonParser'), href: lp('/tools/json-parser/') },
        { title: t(lang, 'nav.deviceTypes'), href: `${lp('/tools/id-lookup/')}#device-types` },
      ],
    },
    {
      title: t(lang, 'nav.sdkGuides'),
      links: [
        { title: t(lang, 'nav.sdk.overview'), href: lp('/sdk/') },
        { title: t(lang, 'nav.sdk.android'), href: lp('/sdk/android/') },
        { title: t(lang, 'nav.sdk.ios'), href: lp('/sdk/ios/') },
        { title: t(lang, 'nav.sdk.web'), href: lp('/sdk/web/') },
      ],
    },
    {
      title: t(lang, 'nav.resourcesMenu'),
      links: [
        { title: t(lang, 'nav.resources'), href: lp('/resources/') },
        { title: t(lang, 'nav.csaWebsite'), href: 'https://csa-iot.org/', external: true },
        { title: t(lang, 'nav.matterSpec'), href: 'https://csa-iot.org/all-solutions/matter/', external: true },
        { title: t(lang, 'nav.matterGithub'), href: 'https://github.com/project-chip/connectedhomeip', external: true },
        { title: t(lang, 'nav.deviceLibrary'), href: 'https://csa-iot.org/csa-iot/csa-device-library/', external: true },
      ],
    },
  ];
}
