/**
 * Protocol comparison page — English
 */
export default {
  title: 'Protocol Comparison: Matter, Zigbee, Z-Wave and More',
  description:
    'A full comparison of Matter with Zigbee, Z-Wave, Thread, Bluetooth Mesh, HomeKit and proprietary Wi-Fi solutions: each protocol placed on the OSI seven-layer model, compared on band, topology, scale, security, onboarding, power, interoperability and ecosystem, with a side-by-side data model mapping.',
  heading: 'Protocol Comparison: Matter, Zigbee, Z-Wave and More',
  intro:
    'Matter is not the only smart home protocol. This page puts it next to its peers: first the seven-layer model shows <strong>which layers each one covers</strong>, then a side-by-side comparison, and finally how similarly they describe devices.',

  tldrTitle: 'The short version',
  tldr: [
    '<strong>Matter only covers the upper layers</strong> (application, presentation, session) and borrows Thread, Wi-Fi or Ethernet underneath. Zigbee, Z-Wave and Bluetooth Mesh are full stacks, from the radio up to the application layer.',
    'So the like-for-like comparisons are <strong>Thread vs the Zigbee network layer</strong> (both run on 802.15.4) and <strong>Matter vs ZCL / Z-Wave Command Classes / Bluetooth Mesh models</strong> (all application layers).',
    '<strong>Matter and Zigbee are relatives</strong>: same standards body (CSA), same radio chips, and Matter clusters come straight from Zigbee\'s ZCL, down to the same numbers (On/Off is <code>0x0006</code> in both).',
    'Matter stands out for being <strong>IP-based, free of proprietary gateways and able to join several ecosystems at once</strong>. Z-Wave wins on sub-GHz range and mandatory interoperability; Bluetooth Mesh wins on direct phone control and low cost.',
  ],

  layersHeading: 'Placing them on the seven-layer model',
  layersIntro:
    'The chart places each protocol on the OSI seven-layer model. Real protocols do not split cleanly into seven layers, so this is an <strong>approximate mapping</strong> by function. Colours show what a layer does; a block spanning several rows handles several layers at once.',
  osiHeader: 'OSI layer',
  osiLayers: [
    { n: 7, name: 'Application' },
    { n: 6, name: 'Presentation' },
    { n: 5, name: 'Session' },
    { n: 4, name: 'Transport' },
    { n: 3, name: 'Network' },
    { n: 2, name: 'Data link' },
    { n: 1, name: 'Physical' },
  ],
  stackColumns: ['Matter over Thread', 'Matter over Wi-Fi', 'Zigbee 3.0', 'Z-Wave', 'Bluetooth Mesh', 'HomeKit (IP)'],
  stackCells: [
    { col: 1, span: 2, top: 7, bottom: 7, kind: 'app', label: 'Data model + Interaction model', sub: 'Clusters / attributes / commands / events' },
    { col: 1, span: 2, top: 6, bottom: 6, kind: 'app', label: 'TLV encoding', sub: 'compact binary format' },
    { col: 1, span: 2, top: 5, bottom: 5, kind: 'sec', label: 'Secure session · message layer', sub: 'PASE / CASE · AES-CCM · MRP retransmission' },
    { col: 1, top: 4, bottom: 4, kind: 'transport', label: 'UDP' },
    { col: 1, top: 3, bottom: 3, kind: 'net', label: 'IPv6 · Thread mesh routing', sub: '6LoWPAN compression' },
    { col: 1, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.15.4 MAC' },
    { col: 1, top: 1, bottom: 1, kind: 'phy', label: '802.15.4 PHY', sub: '2.4 GHz · 250 kbps' },
    { col: 2, top: 4, bottom: 4, kind: 'transport', label: 'UDP / TCP' },
    { col: 2, top: 3, bottom: 3, kind: 'net', label: 'IPv6' },
    { col: 2, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.11 MAC' },
    { col: 2, top: 1, bottom: 1, kind: 'phy', label: '802.11 PHY', sub: '2.4 / 5 GHz' },
    { col: 3, top: 7, bottom: 7, kind: 'app', label: 'ZCL + ZDO', sub: 'Zigbee 3.0 unified application layer' },
    { col: 3, top: 6, bottom: 4, kind: 'transport', label: 'APS sublayer', sub: 'binding · fragmentation · end-to-end ack · link-key encryption' },
    { col: 3, top: 3, bottom: 3, kind: 'net', label: 'Zigbee NWK', sub: 'mesh routing · network-key encryption' },
    { col: 3, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.15.4 MAC' },
    { col: 3, top: 1, bottom: 1, kind: 'phy', label: '802.15.4 PHY', sub: '2.4 GHz (optional sub-GHz since PRO 2023)' },
    { col: 4, top: 7, bottom: 7, kind: 'app', label: 'Command Classes' },
    { col: 4, top: 6, bottom: 4, kind: 'transport', label: 'Transport service + S2 encapsulation', sub: 'segmentation · Curve25519 + AES-128' },
    { col: 4, top: 3, bottom: 3, kind: 'net', label: 'Z-Wave routing layer', sub: 'source routing · up to 4 hops' },
    { col: 4, top: 2, bottom: 2, kind: 'link', label: 'ITU-T G.9959 MAC' },
    { col: 4, top: 1, bottom: 1, kind: 'phy', label: 'G.9959 PHY', sub: 'sub-GHz · EU 868 / US 908 MHz' },
    { col: 5, top: 7, bottom: 7, kind: 'app', label: 'Models · Access layer', sub: 'Generic OnOff, etc.' },
    { col: 5, top: 6, bottom: 5, kind: 'sec', label: 'Upper Transport', sub: 'AppKey encryption' },
    { col: 5, top: 4, bottom: 4, kind: 'transport', label: 'Lower Transport', sub: 'segmentation & reassembly' },
    { col: 5, top: 3, bottom: 3, kind: 'net', label: 'Network layer', sub: 'managed flooding · NetKey encryption' },
    { col: 5, top: 2, bottom: 2, kind: 'link', label: 'Bearer + BLE link layer', sub: 'advertising / GATT bearer' },
    { col: 5, top: 1, bottom: 1, kind: 'phy', label: 'BLE PHY', sub: '2.4 GHz · 1 Mbps' },
    { col: 6, top: 7, bottom: 7, kind: 'app', label: 'Services / Characteristics' },
    { col: 6, top: 6, bottom: 6, kind: 'app', label: 'JSON' },
    { col: 6, top: 5, bottom: 5, kind: 'sec', label: 'HAP session', sub: 'SRP pairing · ChaCha20-Poly1305' },
    { col: 6, top: 4, bottom: 4, kind: 'transport', label: 'TCP (HTTP)' },
    { col: 6, top: 3, bottom: 3, kind: 'net', label: 'IPv4 / IPv6' },
    { col: 6, top: 2, bottom: 1, kind: 'phy', label: 'Wi-Fi / Ethernet', sub: 'also runs over BLE and Thread' },
  ],
  legend: [
    { kind: 'app', label: 'Application & data model' },
    { kind: 'sec', label: 'Secure session' },
    { kind: 'transport', label: 'Transport' },
    { kind: 'net', label: 'Network & routing' },
    { kind: 'link', label: 'Link (MAC)' },
    { kind: 'phy', label: 'Radio / physical medium' },
  ],
  layersNotes: [
    '<strong>The top of the first two columns is one shared block</strong>: whether Thread or Wi-Fi sits underneath, Matter\'s application layer is identical. That is what "application-layer protocol" means.',
    '<strong>Matter over Thread and Zigbee share the bottom two layers exactly</strong>: both use IEEE 802.15.4. Many chips (e.g. Silicon Labs EFR32MG24, Nordic nRF52840) support both, and one hub can run Zigbee while acting as a Thread border router.',
    '<strong>Z-Wave is the only one outside 2.4 GHz.</strong> Its sub-GHz band does not compete with Wi-Fi and gets through walls better.',
    '<strong>The Bluetooth used during commissioning</strong> (Matter sends onboarding data over BLE) is not shown, because it is used only at join time and carries no everyday traffic.',
  ],

  mistakeTitle: 'The most common misconception: "Matter or Zigbee?"',
  mistakeBody:
    'The question mixes two things at different layers. Zigbee is a complete stack; Matter is only an application layer that needs Thread or Wi-Fi underneath. The accurate question is <strong>"full Zigbee" or "Matter + Thread"?</strong> Both use the same radio. They differ in the network layer (Zigbee\'s own routing vs standard IPv6), the application layer (ZCL vs the Matter data model), and whether a vendor gateway is required.',

  tableHeading: 'Side-by-side comparison',
  tableIntro: 'On narrow screens the table scrolls sideways with the first column pinned. "Depends on transport" means the value depends on whether it runs over Wi-Fi, BLE or Thread.',
  tableColumns: ['Aspect', 'Matter', 'Zigbee', 'Z-Wave', 'Bluetooth Mesh', 'HomeKit', 'Proprietary Wi-Fi'],
  tableRows: [
    ['Layers covered', 'Application layer (over Thread / Wi-Fi / Ethernet)', 'Full stack: radio to application', 'Full stack: radio to application', 'Full stack (on BLE)', 'Application layer (IP / BLE / Thread)', 'Proprietary application layer over Wi-Fi + cloud'],
    ['Standards body', 'CSA (Connectivity Standards Alliance)', 'CSA (formerly Zigbee Alliance)', 'Z-Wave Alliance; PHY/MAC is ITU-T G.9959', 'Bluetooth SIG', 'Apple', 'Each vendor (Tuya, Xiaomi, etc.)'],
    ['Released', '1.0 in 2022; currently 1.6', '1.0 in 2004; 3.0 in 2016; PRO 2023', 'around 2001; spec opened in 2020', '1.0 in 2017; 1.1 in 2023', '2014', '—'],
    ['Band', '2.4 GHz (Thread / Wi-Fi); Wi-Fi also 5 GHz', '2.4 GHz; PRO 2023 adds EU 800 / US 900 MHz', 'sub-GHz: EU 868 / US 908 MHz, etc.', '2.4 GHz', 'Depends on transport', 'Mostly 2.4 GHz'],
    ['Data rate', 'Thread 250 kbps; Wi-Fi in Mbps', '250 kbps', '9.6 / 40 / 100 kbps', '1 Mbps (PHY)', 'Depends on transport', 'Mbps'],
    ['Topology', 'Thread mesh; Wi-Fi star', 'Mesh (coordinator + routers + end devices)', 'Mesh (source routing, up to 4 hops); Long Range is star', 'Mesh (managed flooding)', 'Star (via home hub)', 'Star (via router + cloud)'],
    ['Network size', 'Thread: up to 32 routers, ~250 devices recommended per network', '~65k address space, typically hundreds in practice', '232 classic; 4000 with Long Range', '~32k unicast addresses', 'Home scale', 'Limited by the home router, usually dozens'],
    ['Range per hop (indoor)', 'Thread ~10–30 m; Wi-Fi depends on router', '~10–20 m', '~30–40 m; Long Range 1.5 km+ in open air', '~10–30 m', 'Depends on transport', 'Router coverage'],
    ['IP-based', 'Yes (IPv6)', 'No', 'No', 'No', 'Yes (IP mode)', 'Yes'],
    ['Gateway needed?', 'Thread devices need a border router; Wi-Fi devices need no gateway', 'Coordinator / gateway required', 'Controller / gateway required', 'Phone can connect directly; remote and automations need a gateway', 'Remote and automations need a home hub (HomePod / Apple TV)', 'No gateway, but depends on vendor cloud'],
    ['Local control', 'Yes, local-first', 'Yes (via gateway)', 'Yes (via gateway)', 'Yes', 'Yes', 'Mostly cloud-dependent'],
    ['Security', 'Factory device certificate (DAC) + PASE / CASE + AES-128-CCM', 'AES-128; install codes; dynamic link keys (Curve25519) since PRO 2023', 'S2: Curve25519 key exchange + AES-128', 'AES-CCM; network / application / device keys', 'SRP pairing + Ed25519 + ChaCha20-Poly1305', 'TLS to the cloud, varies by vendor'],
    ['Onboarding', 'QR or setup code; over BLE or an existing network', 'Gateway opens the network; install code or QR', 'SmartStart QR, or button inclusion', 'Phone acts as Provisioner', 'QR or setup code', 'Vendor app (BLE-assisted or hotspot mode)'],
    ['Power', 'Thread low (sleepy end devices); Wi-Fi high', 'Low, years on a coin cell', 'Low; Long Range up to ~10 years on a coin cell', 'Low to medium (relays need mains power)', 'Depends on transport', 'High, mostly mains-powered'],
    ['Multiple platforms at once', 'Yes (Multi-Admin: Apple / Google / Amazon, etc. simultaneously)', 'A network belongs to one coordinator', 'A network belongs to one primary controller', 'One provisioner per network', 'Apple Home only', 'Vendor app only, or cloud-to-cloud'],
    ['Cross-brand interoperability', 'Mandatory certification, standard data model', '3.0 unified the application layer, but vendor extensions are common and cross-gateway support varies', 'Mandatory certification, strong backward compatibility', 'Standard models interoperate; vendor models are common', 'Apple ecosystem only', 'Essentially none'],
    ['Chip ecosystem', 'Many (Silicon Labs, Nordic, Espressif, NXP, TI, etc.)', 'Many, often on the same chip as Thread', 'Mostly Silicon Labs; Trident IoT since 2024', 'Nearly every Bluetooth chip', '—', 'Many Wi-Fi chips'],
    ['Presence in China', 'Growing fast', 'Very common (Aqara, Tuya Zigbee, etc.)', 'Almost none', 'Very common (Xiaomi BLE Mesh lighting, etc.)', 'Some users', 'Very common'],
  ],

  sameHeading: 'What they have in common',
  same: [
    { title: 'Nearly the same way of describing devices', desc: 'All use a "device → functional unit → feature group → state and actions" structure with different names; see the <a href="#model-mapping">data model mapping</a> below.' },
    { title: 'Low-power protocols all use mesh', desc: 'Thread, Zigbee, Z-Wave and Bluetooth Mesh rely on mains-powered devices to relay traffic, extending coverage around obstacles; only Wi-Fi-based options are star networks.' },
    { title: 'Mains-powered vs battery devices', desc: 'Plugged-in devices relay; battery devices sleep most of the time and wake periodically. Matter ICDs, Zigbee sleepy end devices and Z-Wave FLiRS devices follow the same idea.' },
    { title: 'Key exchange at onboarding, symmetric crypto afterwards', desc: 'Trust is established with a QR code, setup code or install code at join time; everyday traffic then uses symmetric ciphers such as AES-128 or ChaCha20.' },
    { title: 'Alliances and certification', desc: 'Apart from proprietary solutions, every protocol has a standards body that maintains the spec and certifies products. Certification is what makes cross-brand interoperability possible.' },
  ],

  diffHeading: 'Where they differ',
  diffs: [
    { title: 'How many layers they cover', desc: 'Matter and HomeKit only define the application layer and can swap the network underneath; Zigbee, Z-Wave and Bluetooth Mesh are full stacks tied to their radio.' },
    { title: 'IP or not', desc: 'Every Matter device has an IPv6 address and can talk to phones, routers and the cloud without translation; Zigbee, Z-Wave and Bluetooth Mesh are not IP and need a gateway to translate.' },
    { title: 'Band and wall penetration', desc: 'Z-Wave uses sub-GHz, which gets through walls and avoids Wi-Fi interference; most others share 2.4 GHz. Zigbee PRO 2023 added sub-GHz, but products are still rare.' },
    { title: 'Gateway and ecosystem lock-in', desc: 'Zigbee / Z-Wave devices only talk to the gateway they paired with, and switching gateways means re-pairing; Matter devices can join several ecosystems at once, and since Thread 1.4 border routers from different vendors can share one Thread network.' },
    { title: 'Scale and range', desc: 'Z-Wave Long Range reaches 4000 devices and 1.5 km+ per network, suiting large homes and outdoor use; Thread / Zigbee have short hops and rely on multi-hop routing.' },
    { title: 'Degree of interoperability', desc: 'Z-Wave and Matter both mandate certification and interoperate best; Zigbee has 3.0 but many vendor extensions; Bluetooth Mesh vendor models are common; proprietary Wi-Fi is cloud-to-cloud at best.' },
    { title: 'Markets and regions', desc: 'China is dominated by Zigbee, Bluetooth Mesh and proprietary Wi-Fi, with almost no Z-Wave; in North America and Europe Z-Wave is strong in security and locks; Matter is spreading globally.' },
  ],

  mappingHeading: 'Data model mapping',
  mappingIntro: 'These protocols describe devices in very similar ways. Once you know Matter\'s four-layer model, the others map almost one to one:',
  mappingColumns: ['Concept', 'Matter', 'Zigbee', 'Z-Wave', 'Bluetooth Mesh', 'HomeKit'],
  mappingRows: [
    ['A device', 'Node', 'Node', 'Node', 'Node', 'Accessory'],
    ['A functional unit inside it', 'Endpoint', 'Endpoint', 'Endpoint (Multi Channel)', 'Element', 'Bridged accessory'],
    ['A group of related features', 'Cluster', 'Cluster (ZCL)', 'Command Class', 'Model', 'Service'],
    ['A state value', 'Attribute', 'Attribute', 'Value read via Get / Report', 'State', 'Characteristic'],
    ['An action', 'Command', 'Command', 'Set and other commands', 'Message (Set / Get)', 'Write a Characteristic'],
    ['Unsolicited updates', 'Event / subscription', 'Attribute reporting', 'Report (to the Lifeline association group)', 'Status message (Publish)', 'Event notification'],
  ],
  exampleHeading: 'The same task: turning on a light',
  exampleColumns: ['Protocol', 'Feature group', 'Action', 'Parameter'],
  exampleRows: [
    ['Matter', 'OnOff cluster <code>0x0006</code>', 'Command On <code>0x01</code>', 'none'],
    ['Zigbee', 'ZCL On/Off cluster <code>0x0006</code>', 'Command On <code>0x01</code>', 'none'],
    ['Z-Wave', 'Binary Switch Command Class <code>0x25</code>', 'Set <code>0x01</code>', 'value <code>0xFF</code> (on)'],
    ['Bluetooth Mesh', 'Generic OnOff Server model', 'Generic OnOff Set (opcode <code>0x8202</code>)', 'OnOff = 1'],
    ['HomeKit', 'Lightbulb service', 'Write the On characteristic (type <code>0x25</code>)', 'true'],
  ],
  exampleNote:
    'The first two rows are <strong>identical</strong>: Matter clusters come straight from Zigbee\'s ZCL, and many cluster numbers are unchanged, such as Level Control <code>0x0008</code>, Color Control <code>0x0300</code>, Door Lock <code>0x0101</code>, Thermostat <code>0x0201</code> and Temperature Measurement <code>0x0402</code>. Engineers who know Zigbee pick up Matter quickly. To look up a number, use the <a href="../tools/id-lookup/">Matter ID Lookup</a>.',

  bridgeHeading: 'How they coexist with Matter',
  bridgeBody: `<p>
    Existing Zigbee and Z-Wave devices don't need to be thrown away. A Matter-capable hub can act as a <strong>Matter Bridge</strong>, "translating" the devices behind it into Matter devices that Apple, Google, Amazon and other platforms can control directly.
  </p>
  <ul>
    <li>Besides its root node, the hub declares an <strong>Aggregator</strong> endpoint (device type <code>0x000E</code>)</li>
    <li>Each child device becomes a <strong>Bridged Node</strong> endpoint (device type <code>0x0013</code>) that also carries its real type, e.g. "Bridged Node + Dimmable Light"</li>
    <li>The child's name and reachability live in the <a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a> cluster</li>
  </ul>
  <p>
    The Philips Hue Bridge and Aqara M2 / M3 hubs work this way. You can paste a bridge's data into the <a href="../tools/json-parser/">JSON Parser</a> to see the type of every endpoint.
  </p>`,

  chooseHeading: 'Which one to choose',
  chooseColumns: ['Scenario', 'Recommendation'],
  chooseRows: [
    ['A new smart home product that should work with Apple, Google, Amazon and others', 'Matter: Thread for battery devices (sensors, locks), Wi-Fi for mains-powered and high-bandwidth devices'],
    ['A home or project that already has lots of Zigbee devices', 'Keep them and add a hub that supports Matter bridging'],
    ['Security and locks in North America / Europe that need range and wall penetration', 'Z-Wave (consider Long Range for large homes or outdoors)'],
    ['Low-cost lighting in China with direct phone control', 'Bluetooth Mesh'],
    ['Apple ecosystem only', 'HomeKit still works, but new products should go straight to Matter, which Apple Home supports natively'],
    ['High-bandwidth devices such as cameras', 'Wi-Fi. Matter has a camera device type since 1.5'],
  ],

  othersHeading: 'Other protocols often brought into the comparison',
  othersIntro: 'These also come up in IoT discussions, but they run in a different race from the protocols above:',
  othersColumns: ['Protocol', 'Layer', 'Main use', 'Relation to smart home protocols'],
  othersRows: [
    ['MQTT', 'Application-layer messaging (over TCP)', 'Messaging between devices and the cloud', 'Defines how messages travel, not a device model; widely used by proprietary Wi-Fi solutions to reach the cloud'],
    ['LoRaWAN', 'Full stack, low-power wide-area network', 'Kilometre-range, low data rate: metering, agriculture, campuses', 'Long range but very slow; unsuited to real-time home control'],
    ['NB-IoT / LTE-M', 'Cellular (operator network)', 'Stand-alone remote devices: water meters, smoke alarms, trackers', 'No home gateway, but needs a SIM and data plan'],
    ['KNX', 'Full stack, mainly wired bus', 'Building automation: lighting, blinds, HVAC', 'Common in European buildings, installer-oriented; can reach Matter via a gateway'],
    ['Wi-Fi HaLow (802.11ah)', 'Physical + link layer', 'Sub-GHz Wi-Fi with longer range and lower power', 'Carries IP, so it could run Matter in principle; products are still rare'],
  ],

  sourcesHeading: 'References',
  sources: [
    { name: 'CSA · Zigbee FAQ', url: 'https://csa-iot.org/all-solutions/zigbee/zigbee-faq/' },
    { name: 'CSA · Zigbee PRO 2023 new features', url: 'https://csa-iot.org/newsroom/zigbee-pro-2023/' },
    { name: 'Thread Group · Thread 1.4 features white paper', url: 'https://www.threadgroup.org/Portals/0/Documents/Thread_1.4_Features_White_Paper_September_2024.pdf' },
    { name: 'Trident IoT · Taurus Z-Wave silicon launch', url: 'https://tridentiot.com/2024/04/30/trident-iot-launches-z-wave-series-silicon/' },
    { name: 'Z-Wave Alliance', url: 'https://z-wavealliance.org/' },
    { name: 'Bluetooth SIG · Mesh specification', url: 'https://www.bluetooth.com/specifications/specs/mesh-protocol/' },
  ],
};
