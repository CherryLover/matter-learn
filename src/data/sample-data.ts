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
        "0x31": { "name": "NetworkCommissioning", "commands": ["0x0", "0x3", "0x4", "0x6", "0x8"] },
        "0x3e": { "name": "OperationalCredentials", "commands": ["0x0", "0x2", "0x4", "0x6", "0x7", "0x9", "0xa", "0xb"] }
      }
    },
    "0x1": {
      "device_type": "Door Lock",
      "clusters": {
        "0x101": { "name": "DoorLock", "commands": ["0x0", "0x1", "0x3", "0x1a", "0x1b", "0x1d", "0x26", "0x28", "0x29"] },
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
