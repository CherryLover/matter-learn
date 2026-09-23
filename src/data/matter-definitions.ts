import { findCluster, attributeName as specAttributeName, commandName as specCommandName } from "./matter-spec";

// Cluster ID → name mapping
export const CLUSTER_NAMES: Record<string, string> = {
  "0x3": "Identify",
  "0x6": "OnOff",
  "0x8": "LevelControl",
  "0x1d": "Descriptor",
  "0x1f": "AccessControl",
  "0x28": "BasicInformation",
  "0x2f": "PowerSource",
  "0x30": "GeneralCommissioning",
  "0x31": "NetworkCommissioning",
  "0x33": "GeneralDiagnostics",
  "0x34": "SoftwareDiagnostics",
  "0x35": "ThreadNetworkDiagnostics",
  "0x3c": "AdministratorCommissioning",
  "0x3e": "OperationalCredentials",
  "0x3f": "GroupKeyManagement",
  "0x46": "IcdManagement",
  "0x101": "DoorLock",
  "0x300": "ColorControl",
};

// Cluster descriptions (Chinese)
export const CLUSTER_DESCRIPTIONS: Record<string, string> = {
  "0x3": "设备识别",
  "0x6": "开关控制",
  "0x8": "亮度调节",
  "0x1d": "端点描述",
  "0x1f": "访问控制",
  "0x28": "基本信息",
  "0x2f": "电源管理",
  "0x30": "通用配网",
  "0x31": "网络配网",
  "0x33": "通用诊断",
  "0x34": "软件诊断",
  "0x35": "Thread 网络诊断",
  "0x3c": "管理员配网",
  "0x3e": "操作凭据",
  "0x3f": "组密钥管理",
  "0x46": "ICD 管理",
  "0x101": "门锁",
  "0x300": "色彩控制",
};

// DoorLock command ID → name（与 connectedhomeip door-lock-cluster.xml 一致）
export const DOOR_LOCK_COMMANDS: Record<string, string> = {
  "0x0": "LockDoor",
  "0x1": "UnlockDoor",
  "0x3": "UnlockWithTimeout",
  "0x1a": "SetUser",
  "0x1b": "GetUser",
  "0x1d": "ClearUser",
  "0x22": "SetCredential",
  "0x24": "GetCredentialStatus",
  "0x26": "ClearCredential",
  "0x27": "UnboltDoor",
  "0x28": "SetAliroReaderConfig",
  "0x29": "ClearAliroReaderConfig",
};

// General command names for common clusters
export const GENERAL_COMMANDS: Record<string, Record<string, string>> = {
  "0x30": { // GeneralCommissioning
    "0x0": "ArmFailSafe",
    "0x2": "SetRegulatoryConfig",
    "0x4": "CommissioningComplete",
  },
  "0x31": { // NetworkCommissioning
    "0x0": "ScanNetworks",
    "0x2": "AddOrUpdateWiFiNetwork",
    "0x3": "AddOrUpdateThreadNetwork",
    "0x4": "RemoveNetwork",
    "0x6": "ConnectNetwork",
    "0x8": "ReorderNetwork",
  },
  "0x33": { // GeneralDiagnostics
    "0x0": "TestEventTrigger",
  },
  "0x34": { // SoftwareDiagnostics
    "0x0": "ResetWatermarks",
  },
  "0x35": { // ThreadNetworkDiagnostics
    "0x0": "ResetCounts",
  },
  "0x3c": { // AdministratorCommissioning
    "0x0": "OpenCommissioningWindow",
    "0x2": "RevokeCommissioning",
  },
  "0x3e": { // OperationalCredentials
    "0x0": "AttestationRequest",
    "0x2": "CertificateChainRequest",
    "0x4": "CSRRequest",
    "0x6": "AddNOC",
    "0x7": "UpdateNOC",
    "0x9": "UpdateFabricLabel",
    "0xa": "RemoveFabric",
    "0xb": "AddTrustedRootCertificate",
  },
  "0x3f": { // GroupKeyManagement
    "0x0": "KeySetWrite",
    "0x1": "KeySetRead",
    "0x3": "KeySetRemove",
    "0x4": "KeySetReadAllIndices",
  },
  "0x3": { // Identify
    "0x0": "Identify",
  },
};

interface AttributeDef {
  name: string;
  interpret?: (v: any) => string;
}

// DoorLock attribute interpretations
export const DOOR_LOCK_ATTRIBUTES: Record<string, AttributeDef> = {
  "0x0": {
    name: "LockState",
    interpret: (v) =>
      ({ 0: "未完全锁定", 1: "已锁定", 2: "已解锁", 3: "未完全解锁" }[
        v as number
      ] || `未知(${v})`),
  },
  "0x1": {
    name: "LockType",
    interpret: (v) =>
      ({
        0: "DeadBolt (插销锁)",
        1: "Magnetic (磁力锁)",
        2: "Other",
      }[v as number] || `未知(${v})`),
  },
  "0x2": {
    name: "ActuatorEnabled",
    interpret: (v) => (v ? "已启用" : "已禁用（所有操作将被拒绝）"),
  },
  "0x11": {
    name: "NumberOfTotalUsersSupported",
    interpret: (v) => `最多 ${v} 个用户`,
  },
  "0x12": {
    name: "NumberOfPINUsersSupported",
    interpret: (v) => `最多 ${v} 个 PIN 用户`,
  },
  "0x17": {
    name: "MaxPINCodeLength",
    interpret: (v) => `最长 ${v} 位`,
  },
  "0x18": {
    name: "MinPINCodeLength",
    interpret: (v) => `最短 ${v} 位`,
  },
  "0x1B": {
    name: "OperatingMode",
    interpret: (v) =>
      ({
        0: "Normal (正常)",
        1: "Vacation (假期)",
        2: "Privacy (隐私)",
        3: "NoRemoteLock",
        4: "Passage (通行)",
      }[v as number] || `未知(${v})`),
  },
  "0x1C": {
    name: "SupportedOperatingModes",
    interpret: (v) => {
      const modes: string[] = [];
      if (v & 1) modes.push("Normal");
      if (v & 2) modes.push("Vacation");
      if (v & 4) modes.push("Privacy");
      if (v & 8) modes.push("NoRemoteLock");
      if (v & 16) modes.push("Passage");
      return modes.length ? modes.join(", ") : `原始值: ${v}`;
    },
  },
  "0x23": {
    name: "AutoRelockTime",
    interpret: (v) => `${v} 秒后自动回锁`,
  },
  "0x24": {
    name: "SoundVolume",
    interpret: (v) => (v === 0 ? "静音" : `音量级别 ${v}`),
  },
  "0x25": {
    name: "OperatingMode (DefaultConfig)",
    interpret: (v) => `默认模式 ${v}`,
  },
  "0x26": {
    name: "SupportedFeatures",
  },
  "0x33": {
    name: "RequirePINForRemoteOperation",
    interpret: (v) => (v ? "需要 PIN" : "不需要 PIN"),
  },
  "0x80": { name: "AliroReaderVerificationKey" },
  "0x81": { name: "AliroReaderGroupIdentifier" },
  "0x82": { name: "AliroReaderGroupSubIdentifier" },
  "0x83": { name: "AliroSupportedBLEUWBProtocolVersions" },
  "0x87": { name: "AliroBLEAdvertisingVersion" },
  "0x88": { name: "NumberOfAliroCredentialIssuerKeysSupported" },
};

// PowerSource attribute interpretations
export const POWER_SOURCE_ATTRIBUTES: Record<string, AttributeDef> = {
  "0x0": {
    name: "Status",
    interpret: (v) =>
      ({
        0: "Unspecified",
        1: "Active (工作中)",
        2: "Standby (待机)",
        3: "Unavailable (不可用)",
      }[v as number] || `未知(${v})`),
  },
  "0x1": {
    name: "Order",
    interpret: (v) => `优先级 ${v}`,
  },
  "0x2": {
    name: "Description",
  },
  "0xC": {
    name: "BatPercentRemaining",
    interpret: (v) => `${v / 2}%`,
  },
  "0xE": {
    name: "BatChargeLevel",
    interpret: (v) =>
      ({
        0: "OK (正常)",
        1: "Warning (低电量)",
        2: "Critical (严重低电量)",
      }[v as number] || `未知(${v})`),
  },
  "0xF": {
    name: "BatReplacementNeeded",
    interpret: (v) => (v ? "需要更换" : "不需要更换"),
  },
  "0x10": {
    name: "BatReplaceability",
    interpret: (v) =>
      ({
        0: "Unspecified",
        1: "NotReplaceable (不可更换)",
        2: "UserReplaceable (用户可更换)",
        3: "FactoryReplaceable (工厂更换)",
      }[v as number] || `未知(${v})`),
  },
  "0x13": { name: "BatReplacementDescription" },
  "0x19": {
    name: "BatQuantity",
    interpret: (v) => `${v} 节`,
  },
  "0x1F": { name: "EndpointList" },
};

// Identify cluster attributes
export const IDENTIFY_ATTRIBUTES: Record<string, AttributeDef> = {
  "0x0": {
    name: "IdentifyTime",
    interpret: (v) => (v === 0 ? "未在识别中" : `识别中 (${v}s)`),
  },
  "0x1": {
    name: "IdentifyType",
    interpret: (v) =>
      ({
        0: "None",
        1: "LightOutput",
        2: "VisibleIndicator",
        3: "AudibleBeep",
        4: "Display",
        5: "Actuator",
      }[v as number] || `未知(${v})`),
  },
};

// Map cluster ID to its attribute definitions
export const CLUSTER_ATTRIBUTE_MAP: Record<
  string,
  Record<string, AttributeDef>
> = {
  "0x101": DOOR_LOCK_ATTRIBUTES,
  "0x2f": POWER_SOURCE_ATTRIBUTES,
  "0x2F": POWER_SOURCE_ATTRIBUTES,
  "0x3": IDENTIFY_ATTRIBUTES,
};

/**
 * Normalize a hex cluster/attribute ID for lookup.
 * Handles "0x00000101" → "0x101", "0x0000002F" → "0x2f", etc.
 */
export function normalizeHexId(id: string): string {
  if (!id.startsWith("0x") && !id.startsWith("0X")) return id;
  const num = parseInt(id, 16);
  return "0x" + num.toString(16);
}

/**
 * Look up a cluster name by its ID (handles both short and long hex forms).
 */
export function getClusterName(clusterId: string): string {
  const normalized = normalizeHexId(clusterId);
  return CLUSTER_NAMES[normalized] || findCluster(clusterId)?.name || `Unknown (${clusterId})`;
}

/**
 * Look up a command name for a given cluster and command ID.
 */
export function getCommandName(
  clusterId: string,
  commandId: string
): string {
  const normalizedCluster = normalizeHexId(clusterId);
  const normalizedCommand = normalizeHexId(commandId);

  const fromSpec = specCommandName(clusterId, commandId);
  if (fromSpec) return fromSpec;

  if (normalizedCluster === "0x101") {
    return DOOR_LOCK_COMMANDS[normalizedCommand] || commandId;
  }

  const commands = GENERAL_COMMANDS[normalizedCluster];
  if (commands) {
    return commands[normalizedCommand] || commandId;
  }

  return commandId;
}

/**
 * Look up attribute info for a given cluster and attribute ID.
 */
export function getAttributeInfo(
  clusterId: string,
  attributeId: string
): AttributeDef | undefined {
  const normalizedCluster = normalizeHexId(clusterId);
  // Try both original case and lowercase for CLUSTER_ATTRIBUTE_MAP
  const attrMap =
    CLUSTER_ATTRIBUTE_MAP[normalizedCluster] ||
    CLUSTER_ATTRIBUTE_MAP[normalizedCluster.toLowerCase()];
  const normalizedAttr = normalizeHexId(attributeId);
  // Try both original and uppercase for attribute lookup
  const known =
    attrMap?.[normalizedAttr] ||
    attrMap?.[normalizedAttr.toUpperCase().replace("0X", "0x")];
  if (known) return known;

  // 没有专门解读的属性，至少从官方数据表里给出名字
  const name = specAttributeName(clusterId, attributeId);
  return name ? { name } : undefined;
}
