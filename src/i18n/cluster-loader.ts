/**
 * Cluster content loader — merges all category files into a single lookup
 */
import type { ClusterContent } from './cluster-types';
import type { Lang } from './config';

// Pre-import all category modules for both languages
// Chinese
import { clusters as zhLighting } from './zh/clusters/lighting';
import { clusters as zhHvac } from './zh/clusters/hvac';
import { clusters as zhClosure } from './zh/clusters/closure';
import { clusters as zhSensing } from './zh/clusters/sensing';
import { clusters as zhSafety } from './zh/clusters/safety';
import { clusters as zhAppliance } from './zh/clusters/appliance';
import { clusters as zhMedia } from './zh/clusters/media';
import { clusters as zhGeneral } from './zh/clusters/general';
import { clusters as zhNode } from './zh/clusters/node';
import { clusters as zhCommissioning } from './zh/clusters/commissioning';
import { clusters as zhDiagnostics } from './zh/clusters/diagnostics';
import { clusters as zhEnergy } from './zh/clusters/energy';

// English
import { clusters as enLighting } from './en/clusters/lighting';
import { clusters as enHvac } from './en/clusters/hvac';
import { clusters as enClosure } from './en/clusters/closure';
import { clusters as enSensing } from './en/clusters/sensing';
import { clusters as enSafety } from './en/clusters/safety';
import { clusters as enAppliance } from './en/clusters/appliance';
import { clusters as enMedia } from './en/clusters/media';
import { clusters as enGeneral } from './en/clusters/general';
import { clusters as enNode } from './en/clusters/node';
import { clusters as enCommissioning } from './en/clusters/commissioning';
import { clusters as enDiagnostics } from './en/clusters/diagnostics';
import { clusters as enEnergy } from './en/clusters/energy';

const zhAll: Record<string, ClusterContent> = {
  ...zhLighting, ...zhHvac, ...zhClosure, ...zhSensing,
  ...zhSafety, ...zhAppliance, ...zhMedia, ...zhGeneral,
  ...zhNode, ...zhCommissioning, ...zhDiagnostics, ...zhEnergy,
};

const enAll: Record<string, ClusterContent> = {
  ...enLighting, ...enHvac, ...enClosure, ...enSensing,
  ...enSafety, ...enAppliance, ...enMedia, ...enGeneral,
  ...enNode, ...enCommissioning, ...enDiagnostics, ...enEnergy,
};

const allClusters: Record<Lang, Record<string, ClusterContent>> = {
  zh: zhAll,
  en: enAll,
};

/**
 * Get cluster content by slug and language
 */
export function getCluster(lang: Lang, slug: string): ClusterContent | undefined {
  return allClusters[lang]?.[slug];
}

/**
 * Get all cluster slugs (same for both languages)
 */
export function getAllClusterSlugs(): string[] {
  return Object.keys(zhAll);
}
