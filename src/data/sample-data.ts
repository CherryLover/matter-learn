export const SAMPLE_CAPABILITY = `{
  "matter_node_id": "8E6F8426C2534118",
  "device_type": "DoorLock",
  "endpoints": {
    "0x0": {
      "device_type": "Root Node",
      "clusters": {
        "0x1d": { "name": "Descriptor", "commands": [] },
        "0x28": { "name": "BasicInformation", "commands": [] },
        "0x30": { "name": "GeneralCommissioning", "commands": ["0x0", "0x2", "0x4"] },
        "0x31": { "name": "NetworkCommissioning", "commands": ["0x0", "0x2", "0x4", "0x6", "0x8"] },
        "0x3e": { "name": "OperationalCredentials", "commands": ["0x0", "0x2", "0x4", "0x6", "0x7", "0x9", "0xa", "0xb"] }
      }
    },
    "0x1": {
      "device_type": "Door Lock",
      "clusters": {
        "0x101": { "name": "DoorLock", "commands": ["0x0", "0x1", "0x3", "0x1a", "0x1b", "0x1d", "0x22", "0x24", "0x26"] },
        "0x2f": { "name": "PowerSource", "commands": [] },
        "0x3": { "name": "Identify", "commands": ["0x0"] },
        "0x1d": { "name": "Descriptor", "commands": [] }
      }
    }
  }
}`;

export const SAMPLE_STATE = `{
  "matter_node_id": "8E6F8426C2534118",
  "endpoints": {
    "0x1": {
      "clusters": {
        "0x101": {
          "attributes": {
            "0x0": 1,
            "0x1": 0,
            "0x2": true,
            "0x11": 10,
            "0x12": 6,
            "0x17": 8,
            "0x18": 4,
            "0x1B": 0,
            "0x23": 30,
            "0x24": 0,
            "0x33": false
          }
        },
        "0x2F": {
          "attributes": {
            "0x0": 1,
            "0x1": 1,
            "0x2": "Battery",
            "0xC": 160,
            "0xE": 0,
            "0xF": false
          }
        },
        "0x3": {
          "attributes": {
            "0x0": 0,
            "0x1": 2
          }
        }
      }
    }
  }
}`;

export const SAMPLE_READ_RESPONSE = `{
  "matter_node_id": "8E6F8426C2534118",
  "read_results": [
    {
      "endpoint_id": 1,
      "cluster_id": "0x0101",
      "attribute_id": "0x0000",
      "attribute_value": 2
    },
    {
      "endpoint_id": 1,
      "cluster_id": "0x0101",
      "attribute_id": "0x0002",
      "attribute_value": true
    },
    {
      "endpoint_id": 1,
      "cluster_id": "0x002F",
      "attribute_id": "0x000C",
      "attribute_value": 160
    }
  ]
}`;

/**
 * 设备原始数据：配网后对整台设备做一次通配读取（Wildcard Read）得到的全部属性。
 * 格式与 Home Assistant「下载诊断数据」/ matter-server 一致：
 * key 为 "端点/Cluster/属性"（十进制），结构体字段用字段编号表示。
 */
export const SAMPLE_RAW_NODE = `{
  "node_id": 1,
  "available": true,
  "is_bridge": false,
  "attributes": {
    "0/29/0": [{ "0": 22, "1": 3 }],
    "0/29/1": [29, 31, 40, 42, 48, 49, 51, 60, 62, 63],
    "0/29/2": [41],
    "0/29/3": [1],
    "0/29/65532": 0,
    "0/29/65533": 2,
    "0/40/0": 17,
    "0/40/1": "Demo Lock Co.",
    "0/40/2": 65521,
    "0/40/3": "Smart Lock S1",
    "0/40/4": 32769,
    "0/40/5": "",
    "0/40/7": 2,
    "0/40/8": "v2.0",
    "0/40/9": 16,
    "0/40/10": "1.0.16",
    "0/40/15": "SN2026090100017",
    "0/40/18": "8E6F8426C2534118",
    "0/40/21": 17039360,
    "0/40/65532": 0,
    "0/40/65533": 3,
    "0/49/0": 1,
    "0/49/65532": 1,
    "0/62/2": 5,
    "0/62/3": 2,
    "1/29/0": [{ "0": 10, "1": 3 }, { "0": 17, "1": 1 }],
    "1/29/1": [3, 29, 47, 257],
    "1/29/2": [],
    "1/29/3": [],
    "1/29/65532": 0,
    "1/3/0": 0,
    "1/3/1": 2,
    "1/3/65532": 0,
    "1/3/65533": 4,
    "1/3/65529": [0, 64],
    "1/3/65528": [],
    "1/47/0": 1,
    "1/47/1": 1,
    "1/47/2": "Battery",
    "1/47/12": 160,
    "1/47/14": 0,
    "1/47/15": false,
    "1/47/65532": 10,
    "1/47/65533": 2,
    "1/257/0": 1,
    "1/257/1": 0,
    "1/257/2": true,
    "1/257/17": 10,
    "1/257/18": 6,
    "1/257/23": 8,
    "1/257/24": 4,
    "1/257/27": 1,
    "1/257/35": 30,
    "1/257/37": 0,
    "1/257/38": 65526,
    "1/257/51": false,
    "1/257/65532": 389,
    "1/257/65533": 7,
    "1/257/65531": [0, 1, 2, 17, 18, 23, 24, 27, 35, 37, 38, 51, 65528, 65529, 65531, 65532, 65533],
    "1/257/65529": [0, 1, 3, 26, 27, 29, 34, 36, 38],
    "1/257/65528": [28, 35, 37]
  }
}`;
