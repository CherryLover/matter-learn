/**
 * FAQ page — English
 * Short answers here; the full explanations stay on their original pages.
 * link.href is relative to /en/faq/.
 */
export default {
  title: 'FAQ',
  description:
    'Matter FAQ — concise answers to common questions: how many bytes a Cluster ID has, how to read a device\'s type and features after commissioning, Matter vs Zigbee, bringing old devices into Matter, and more, each with a link to the full explanation.',
  heading: 'Frequently Asked Questions',
  intro: 'The questions people ask most when learning and building with Matter. Each has a short answer; follow "Read more" for the details.',
  expandAll: 'Expand all',
  collapseAll: 'Collapse all',
  detailLabel: 'Read more',
  groups: [
    {
      id: 'basics',
      title: 'Basics',
      items: [
        {
          id: 'what-is-matter',
          q: 'What is Matter and what problem does it solve?',
          a: 'Matter is a unified application-layer standard for the smart home, published by the Connectivity Standards Alliance (CSA). A Matter-certified device can be controlled directly by Apple, Google, Amazon, Samsung and other platforms, so vendors no longer need a separate integration for each one.',
          link: { href: '../concepts/#what-is-matter', label: 'Concepts · What is Matter' },
        },
        {
          id: 'application-layer',
          q: 'What does "application-layer protocol" mean? Does Matter need Bluetooth?',
          a: 'Matter only defines what a device can do, how it interacts and how it is secured; transport uses existing IP networks: Thread, Wi-Fi or Ethernet. Bluetooth is used only at commissioning time to deliver setup data, never for everyday control.',
          link: { href: '../compare/#layers', label: 'Protocol Comparison · Seven-layer model' },
        },
        {
          id: 'data-model',
          q: 'What are Endpoints, Clusters, Attributes and Commands?',
          a: 'A device (Node) is split into functional units (Endpoints); each endpoint is made of feature groups (Clusters), which contain state values (Attributes) and actions (Commands). For example: "the lock state attribute of the Door Lock cluster on endpoint 1".',
          link: { href: '../concepts/#data-model', label: 'Concepts · Four-layer data model' },
        },
        {
          id: 'device-type-vs-cluster',
          q: 'How do Device Types relate to Clusters?',
          a: 'A device type is a checklist of clusters a device must have. Declaring Door Lock (0x000A) means implementing the Door Lock and Identify clusters. The device type only sets the minimum; optional capabilities depend on the clusters themselves.',
          link: { href: '../concepts/#device-type', label: 'Concepts · Device Type' },
        },
        {
          id: 'multi-admin',
          q: 'Can one device be controlled by Apple and Google at the same time?',
          a: 'Yes. A Matter device can join several Fabrics (trust domains) at once, holding a separate certificate for each platform. The specification requires devices to support at least 5 fabrics.',
          link: { href: '../concepts/#fabric', label: 'Concepts · Fabric' },
        },
      ],
    },
    {
      id: 'ids',
      title: 'IDs and numbering',
      items: [
        {
          id: 'cluster-id-size',
          q: 'Is a Cluster ID always two bytes?',
          a: 'No, it is 4 bytes in full: the upper 2 bytes are a vendor prefix and the lower 2 bytes are the number. Standard clusters use the prefix 0x0000, which is normally omitted, so Door Lock 0x0000_0101 is written 0x0101 and looks like two bytes.',
          link: { href: '../tools/id-lookup/#cluster-id-format', label: 'Matter ID Lookup · ID structure' },
        },
        {
          id: 'same-number',
          q: 'Why does the same number have two meanings?',
          a: 'Each kind of ID has its own numbering. 0x0101 is Door Lock as a cluster but Dimmable Light as a device type. Before looking a number up, check which field it appears in.',
          link: { href: '../tools/id-lookup/', label: 'Matter ID Lookup' },
        },
        {
          id: 'decimal-vs-hex',
          q: 'Are 257 in a log and 0x0101 the same thing?',
          a: 'Yes, it is the same number in a different format. chip-tool logs usually print hex, while Home Assistant diagnostics use decimal (e.g. 1/257/0 means endpoint 1, cluster 257, attribute 0). The ID lookup accepts both.',
          link: { href: '../tools/id-lookup/', label: 'Matter ID Lookup' },
        },
        {
          id: 'vendor-cluster',
          q: 'How do I look up a vendor-specific cluster?',
          a: 'A vendor-specific cluster ID carries the vendor ID as its prefix (e.g. 0x1234_FC00), with the number in the 0xFC00–0xFFFE range. It is not part of the Matter standard, so only the vendor\'s own documentation defines it.',
          link: { href: '../tools/id-lookup/#cluster-id-format', label: 'Matter ID Lookup · ID structure' },
        },
      ],
    },
    {
      id: 'capabilities',
      title: 'Device types and capabilities',
      items: [
        {
          id: 'read-device-type',
          q: 'How do I find out what type of device it is after commissioning?',
          a: 'Read DeviceTypeList from the Descriptor cluster (0x001D) on each endpoint. Read PartsList on endpoint 0 first to get every endpoint number, then go through them. A lock\'s endpoint 1 typically returns "Door Lock 0x000A + Power Source 0x0011".',
          link: { href: '../concepts/#device-discovery', label: 'Concepts · Reading a device\'s capabilities' },
        },
        {
          id: 'read-features',
          q: 'How do I know exactly which features and commands a device supports?',
          a: 'Read the Descriptor ServerList to see which clusters exist, then three global attributes on each cluster: FeatureMap (enabled optional features), AcceptedCommandList (accepted commands) and AttributeList (implemented attributes).',
          link: { href: '../concepts/#device-discovery', label: 'Concepts · Reading a device\'s capabilities' },
        },
        {
          id: 'raw-capabilities',
          q: 'Can I get a device\'s raw capability set?',
          a: 'Yes. A wildcard read returns every attribute at once, e.g. chip-tool any read-by-id 0xFFFFFFFF 0xFFFFFFFF <node-id> 0xFFFF. Home Assistant\'s diagnostics download contains the same result and can be pasted straight into the JSON Parser.',
          link: { href: '../concepts/#raw-capabilities', label: 'Concepts · Raw capability set' },
        },
        {
          id: 'same-type-different',
          q: 'Why do two devices of the same type have different capabilities?',
          a: 'A device type only fixes the mandatory part. Two devices both declaring Door Lock may differ: one supports fingerprints and user management, the other only PIN codes. The difference shows up in the Door Lock cluster\'s FeatureMap.',
          link: { href: '../concepts/#device-type', label: 'Concepts · Device Type' },
        },
        {
          id: 'vendor-info',
          q: 'Where do I read the vendor, model and firmware version?',
          a: 'All in the BasicInformation cluster (0x0028) on endpoint 0: VendorName / VendorID, ProductName / ProductID, SoftwareVersionString, SerialNumber and more. This cluster exists only on endpoint 0.',
          link: { href: '../clusters/basic-information/', label: 'BasicInformation cluster' },
        },
      ],
    },
    {
      id: 'network',
      title: 'Commissioning and networking',
      items: [
        {
          id: 'need-hub',
          q: 'Do Matter devices need a hub?',
          a: 'Wi-Fi and Ethernet devices don\'t; they just join the home router. Thread devices need a Thread border router (built into HomePod mini, Apple TV, Nest Hub and many other speakers and hubs) to connect the Thread network to the home IP network.',
          link: { href: '../compare/#comparison', label: 'Protocol Comparison · Side by side' },
        },
        {
          id: 'thread-or-wifi',
          q: 'Should I pick Thread or Wi-Fi Matter devices?',
          a: 'Battery-powered, low-traffic devices (sensors, locks, buttons) suit Thread: low power and a stable mesh. Mains-powered, high-traffic devices (plugs, lights, cameras, appliances) suit Wi-Fi. At the Matter layer they are identical.',
          link: { href: '../compare/#choosing', label: 'Protocol Comparison · Which one to choose' },
        },
        {
          id: 'commissioning-steps',
          q: 'What does commissioning look like?',
          a: 'Scan the QR code or enter the setup code → find the device over Bluetooth and set up an encrypted session → issue it a certificate and add it to a Fabric → send it the Wi-Fi or Thread credentials → the device comes online and can be read and controlled.',
          link: { href: '../concepts/#commissioning', label: 'Concepts · Commissioner and Commissioning' },
        },
      ],
    },
    {
      id: 'protocols',
      title: 'Other protocols',
      items: [
        {
          id: 'matter-vs-zigbee',
          q: 'Matter or Zigbee?',
          a: 'They sit at different layers: Zigbee is a full stack from radio to application, Matter only an application layer. The fair comparison is "full Zigbee" vs "Matter + Thread": the same radio, but different on IP, vendor gateways and joining several platforms at once.',
          link: { href: '../compare/#layers', label: 'Protocol Comparison · Seven-layer model' },
        },
        {
          id: 'old-devices',
          q: 'Can existing Zigbee / Z-Wave devices join Matter?',
          a: 'Yes, through a hub that supports Matter bridging (e.g. the Philips Hue Bridge or Aqara M2 / M3). The hub "translates" each child device into a Bridged Node (device type 0x0013) that every platform can control.',
          link: { href: '../compare/#bridges', label: 'Protocol Comparison · Coexisting with Matter' },
        },
        {
          id: 'matter-vs-homekit',
          q: 'How does Matter relate to HomeKit?',
          a: 'HomeKit is Apple\'s own smart home protocol and only works in the Apple ecosystem. Apple is one of Matter\'s main backers and Apple Home supports Matter devices natively, so new products usually just implement Matter.',
          link: { href: '../compare/#comparison', label: 'Protocol Comparison · Side by side' },
        },
        {
          id: 'matter-vs-zigbee-clusters',
          q: 'Why do Matter and Zigbee share so many cluster numbers?',
          a: 'Matter clusters come straight from Zigbee\'s ZCL cluster library, and both are maintained by the same organisation (CSA). On/Off 0x0006, Level Control 0x0008, Color Control 0x0300, Door Lock 0x0101 and others are unchanged.',
          link: { href: '../compare/#model-mapping', label: 'Protocol Comparison · Data model mapping' },
        },
      ],
    },
    {
      id: 'dev',
      title: 'Development and tools',
      items: [
        {
          id: 'read-json',
          q: 'How do I make sense of a device\'s JSON data?',
          a: 'Paste it into the JSON Parser. It translates cluster, attribute and command numbers into names and explains key status values. For a whole-device raw dump it also builds a device profile and labels where each item came from.',
          link: { href: '../tools/json-parser/', label: 'JSON Parser' },
        },
        {
          id: 'sdk-read',
          q: 'How do I read device types and capabilities on Android, iOS and Web?',
          a: 'All platforms go through the Descriptor cluster: DescriptorCluster in connectedhomeip on Android, MTRBaseClusterDescriptor on iOS, and on the Web matterjs-server node data already contains every attribute. Sample code for all three is in the SDK Guides.',
          link: { href: '../sdk/android/#device-discovery', label: 'SDK Guides · Reading device types and capabilities' },
        },
        {
          id: 'which-version',
          q: 'What is the latest Matter version, and which should a product target?',
          a: 'The latest specification is 1.6 (June 2026); the ecosystem mainstream is 1.4 to 1.5, and the widest deployment is 1.3 to 1.4. Products usually target what the major platforms already support, moving up only when they need newer device types such as cameras or energy management.',
          link: { href: '../roadmap/', label: 'Roadmap' },
        },
      ],
    },
  ],
};
