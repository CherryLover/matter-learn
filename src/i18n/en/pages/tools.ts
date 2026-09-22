/**
 * Tools page translations — English
 */
export default {
  title: 'JSON Parser',
  description: 'Online Matter device JSON data parser — paste raw JSON reported by devices, automatically identify Cluster IDs and Attribute IDs, translate to readable names with explanations.',
  heading: 'JSON Parser',
  intro: 'Parse Matter device standard data formats, automatically identify data types, translate Cluster IDs and Attribute IDs to readable names, and provide explanations for key status values.',
  parserHeading: 'Parser Tool',
  formatsHeading: 'Supported Data Formats',
  format1: 'Device Capability Declaration',
  format1Desc: 'Contains <code>endpoints</code> with Cluster <code>commands</code>, describing the endpoints, Clusters and commands a device supports',
  format2: 'Attribute State',
  format2Desc: 'Contains <code>endpoints</code> with Cluster <code>attributes</code>, describing current attribute values of the device',
  format3: 'ReadAttribute Response',
  format3Desc: 'Contains a <code>read_results</code> array, the response from Controller reading attributes',
} as const;
