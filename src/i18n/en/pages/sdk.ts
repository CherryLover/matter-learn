export default {
  title: 'Matter SDK Developer Guide',
  description: 'Architecture breakdown, commissioning flows, device control examples, and caveats for Matter SDKs across platforms.',
  heroTitle: 'Matter SDK Developer Guide',
  heroDesc: 'Platform-by-platform breakdown of Matter SDK architecture, core APIs, and getting-started paths — from Android to iOS to Web.',
  heroCount: '3 Platforms',
  heroCategoryCount: 'Commissioning · Control · Limits',

  platforms: [
    {
      id: 'android',
      name: 'Android',
      icon: 'android',
      tagline: 'Two-layer commissioning via Google Play Services',
      sdk: 'Home APIs + connectedhomeip',
      maturity: 'GA (Production Ready)',
      specVersion: 'Matter 1.4.1',
      minVersion: 'Android 8.1+ (API 27)',
      keyFeature: 'Home APIs provide unified commissioning + control + automation',
      href: '/sdk/android/',
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: 'ios',
      tagline: 'Native system frameworks with MatterSupport extension',
      sdk: 'Matter.framework + MatterSupport',
      maturity: 'Mature (4th OS cycle)',
      specVersion: 'Matter 1.4+',
      minVersion: 'iOS 16.1+',
      keyFeature: 'System-level commissioning UI, no external dependencies',
      href: '/sdk/ios/',
    },
    {
      id: 'web',
      name: 'Web / Node.js',
      icon: 'web',
      tagline: 'Browser via WebSocket proxy, full control on Node.js',
      sdk: 'matter.js + matterjs-server',
      maturity: 'Production (adopted by Home Assistant)',
      specVersion: 'Matter 1.4.2 — 1.6',
      minVersion: 'Node.js 20.19+',
      keyFeature: 'Pure TypeScript implementation by Open Home Foundation',
      href: '/sdk/web/',
    },
  ],

  comparisonTitle: 'Platform Comparison',
  comparisonHeaders: ['Feature', 'Android', 'iOS', 'Web / Node.js'],
  comparisonRows: [
    ['Commissioning', 'Full (GPS proxy)', 'Full (system UI)', 'Server-side only (no browser support)'],
    ['Device Control', 'Home APIs / direct Cluster', 'MTRBaseCluster / MTRDevice', 'WebSocket proxy / direct Cluster'],
    ['Thread Support', 'GPS Thread SDK', 'Requires HomePod / Apple TV', 'Native in matter.js'],
    ['Minimum Version', 'Android 8.1 (API 27)', 'iOS 16.1', 'Node.js 20.19'],
    ['External Dependency', 'Google Play Services (required)', 'None (built into OS)', 'None (pure JS)'],
    ['Open Source', 'connectedhomeip (optional)', 'Matter.framework (closed)', 'matter.js (fully open)'],
  ],

  android: {
    title: 'Android Matter SDK Guide',
    description: 'Deep dive into Android Matter development: SDK choices, commissioning flow, device control, and common pitfalls.',
    heroTitle: 'Android Matter SDK',
    heroDesc: 'A complete guide to Matter development with Google Home APIs and connectedhomeip.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `<p>Android Matter development involves <strong>three SDK layers</strong>: Google's high-level APIs (commissioning and device management), the open-source connectedhomeip (protocol stack and Cluster control), and the Thread Network SDK.</p>
<p>In August 2026, Google Home APIs reached GA (v1.10.1), providing a unified interface for commissioning, device control, and automation. New projects should use the Home APIs directly; existing projects can continue with the Legacy Mobile SDK.</p>`,
      },
      {
        id: 'sdks',
        title: 'SDK Selection',
        content: '<p>Choose the right SDK combination for your project needs:</p>',
        table: {
          headers: ['SDK', 'Maven Artifact', 'Capabilities', 'Best For'],
          rows: [
            ['Home APIs (New)', 'play-services-home:17.0.0 + play-services-home-types:17.0.0', 'Commission + Control + Automation', 'New projects'],
            ['Legacy Mobile SDK', 'play-services-home:16.0.0', 'Commissioning and sharing only', 'Existing projects'],
            ['connectedhomeip', 'Build from source / demo SDK', 'Full protocol stack, cluster-level control', 'Custom fabric / non-GPS devices'],
            ['Thread Network SDK', 'play-services-threadnetwork:16.2.1', 'Thread credential management', 'Thread device pairing'],
          ],
        },
      },
      {
        id: 'commissioning',
        title: 'Commissioning Flow',
        content: '<p>Android commissioning uses a <strong>two-layer architecture</strong>: Google Play Services handles BLE discovery, PASE session, and network provisioning; then it calls back into your CommissioningService for fabric enrollment.</p>',
        flow: [
          'User scans QR code',
          'App calls CommissioningClient.commissionDevice()',
          'GPS discovers device via BLE, establishes PASE session',
          'GPS provisions WiFi/Thread credentials, device joins network',
          'GPS issues NOC, device joins Android fabric',
          'Callback to your CommissioningService.onCommissioningRequested()',
          'Your app commissions to your own fabric via ChipDeviceController',
          'Call sendCommissioningComplete() to finish',
        ],
      },
      {
        id: 'device-control',
        title: 'Device Control',
        content: '<p>After commissioning, control devices through the connectedhomeip Cluster API. Each Matter Cluster maps to a Java/Kotlin class.</p>',
        codeExample: {
          language: 'kotlin',
          title: 'OnOff Control Example',
          code: `// Get connected device pointer
val devicePtr = suspendCoroutine<Long> { cont ->
    controller.getConnectedDevicePointer(nodeId,
        object : GetConnectedDeviceCallback {
            override fun onDeviceConnected(ptr: Long) = cont.resume(ptr)
            override fun onConnectionFailure(id: Long, e: Exception) =
                cont.resumeWithException(e)
        })
}

// Create OnOff cluster instance and send command
val cluster = ChipClusters.OnOffCluster(devicePtr, endpointId)
cluster.toggle(object : ChipClusters.DefaultClusterCallback {
    override fun onSuccess() { /* device toggled */ }
    override fun onError(ex: Exception) { /* handle error */ }
})`,
        },
      },
      {
        id: 'limitations',
        title: 'Limitations & Caveats',
        content: '<p>Key issues to watch out for in Android Matter development:</p>',
        items: [
          {
            title: 'Google Play Services Dependency',
            desc: 'GPS is mandatory for the Google commissioning flow. Devices without GMS (Huawei, Amazon Fire, custom ROMs) cannot use it — use connectedhomeip directly instead.',
          },
          {
            title: 'Commissioning Window Timeout',
            desc: 'Matter devices keep their commissioning window open for 3-5 minutes. If SDK initialization takes too long, the window expires before PASE starts. Pre-warm the SDK.',
          },
          {
            title: 'Controller Conflict',
            desc: 'Creating a control ChipDeviceController while a commissioning one is active causes a native platform conflict and SIGABRT. Gate control operations behind a commissioningInProgress flag.',
          },
          {
            title: 'GPS Version Requirements',
            desc: 'Home APIs need GPS 26.34.30+, Legacy SDK needs 22.50.14+. Older devices stuck on old GPS versions will silently fail.',
          },
          {
            title: 'Thread Credential Issues',
            desc: 'Phone may lack Thread credentials needed for pairing, producing "Thread border router required" errors even when a border router exists on the network.',
          },
          {
            title: 'Missing sendCommissioningComplete()',
            desc: 'Forgetting to call this method in your CommissioningService silently fails the entire flow. Not clearly documented.',
          },
        ],
      },
      {
        id: 'resources',
        title: 'Resources',
        links: [
          { name: 'Home APIs Getting Started', url: 'https://developers.home.google.com/apis/android/get-started', desc: 'Official Google Home APIs onboarding guide' },
          { name: 'Matter Codelab', url: 'https://developers.home.google.com/codelabs/matter-sample-app', desc: 'Android Matter development codelab' },
          { name: 'Home APIs Sample App', url: 'https://github.com/google-home/google-home-api-sample-app-android', desc: 'New Home APIs reference code' },
          { name: 'connectedhomeip Android', url: 'https://github.com/project-chip/connectedhomeip/blob/master/docs/platforms/android/android_building.md', desc: 'connectedhomeip Android build guide' },
          { name: 'Virtual Matter Device', url: 'https://developers.home.google.com/codelabs/matter-device-virtual', desc: 'Test device without hardware' },
          { name: 'Kotlin Matter Controller', url: 'https://github.com/project-chip/connectedhomeip/tree/master/examples/kotlin-matter-controller', desc: 'Standalone Kotlin controller example' },
          { name: 'Home APIs Release Notes', url: 'https://developers.home.google.com/apis/android/release-notes', desc: 'SDK version changelog' },
        ],
      },
    ],
  },

  ios: {
    title: 'iOS Matter SDK Guide',
    description: 'Deep dive into iOS Matter development: Matter.framework vs MatterSupport, commissioning extensions, Cluster control, and known limitations.',
    heroTitle: 'iOS Matter SDK',
    heroDesc: 'A guide to Matter development with Apple system frameworks, covering MatterSupport extensions and Cluster control.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `<p>iOS Matter support is built into the system frameworks. Developers use two core frameworks: <strong>Matter.framework</strong> (low-level protocol stack with Cluster-level control) and <strong>MatterSupport</strong> (high-level commissioning extension that lets third-party apps join Apple Home's commissioning flow).</p>
<p>Matter.framework shipped with iOS 16.0 and is now in its 4th OS cycle with continuously expanding Cluster APIs. MatterSupport, available from iOS 16.1, is the recommended path for third-party apps.</p>`,
      },
      {
        id: 'frameworks',
        title: 'Framework Selection',
        content: '<p>iOS Matter development involves three frameworks, each with a distinct role:</p>',
        table: {
          headers: ['Framework', 'Role', 'Use Case', 'Min Version'],
          rows: [
            ['MatterSupport', 'High-level commissioning extension', 'Third-party apps joining Apple Home commissioning', 'iOS 16.1'],
            ['Matter.framework', 'Low-level protocol stack', 'Direct Cluster control, standalone fabric management', 'iOS 16.0'],
            ['HomeKit', 'Apple Home bridge', 'Get matterNodeID from HMAccessory, then use Matter.framework', 'iOS 16.1'],
          ],
        },
      },
      {
        id: 'commissioning',
        title: 'Commissioning Flow',
        content: '<p>Third-party apps participate in system commissioning by implementing a <strong>MatterSupport Extension</strong>. The system handles BLE discovery and PASE sessions; your extension intervenes at key steps.</p>',
        flow: [
          'App creates MatterAddDeviceRequest and calls perform()',
          'System presents commissioning UI with QR scanning',
          'System discovers device via BLE and establishes PASE session',
          'Your extension receives validateDeviceCredential callback',
          'Your extension selects WiFi or Thread network',
          'Your extension commissions to your own fabric in commissionDevice',
          'Your extension saves device configuration in configureDevice',
        ],
      },
      {
        id: 'device-control',
        title: 'Device Control',
        content: '<p>iOS offers two Cluster API patterns: <strong>Stateless</strong> (MTRBaseCluster, direct network operations) and <strong>Stateful</strong> (MTRCluster, subscription-based local cache).</p>',
        codeExample: {
          language: 'swift',
          title: 'OnOff Control Example',
          code: `import Matter

// Create a stateless device proxy
let device = MTRBaseDevice(nodeID: nodeID, controller: controller)
let onOff = MTRBaseClusterOnOff(
    device: device,
    endpointID: NSNumber(value: 1),
    queue: .main
)

// Toggle the switch
try await onOff.toggle()

// Read current state
let isOn = try await onOff.readAttributeOnOff()`,
        },
      },
      {
        id: 'limitations',
        title: 'Limitations & Caveats',
        content: '<p>Key limitations in iOS Matter development:</p>',
        items: [
          {
            title: 'Thread Device Commissioning Blocked',
            desc: 'MatterSupport extensions cannot commission Thread devices (returns "Thread Border Router Required" error). This is a known bug (FB15614070). Only the Apple Home app on iOS 18+ with compatible iPhones supports Thread device direct pairing.',
          },
          {
            title: 'Developer Profile Required',
            desc: 'The "Bluetooth Central Matter Client Developer Mode" profile must be installed on all test devices (iPhone, HomePod, Apple TV). Without it, BLE commissioning silently fails. The profile expires periodically.',
          },
          {
            title: 'TestFlight Commissioning Issues',
            desc: 'TestFlight builds may fail commissioning on devices without the Matter Client Developer Profile.',
          },
          {
            title: 'Separate Fabric Isolation',
            desc: 'Commissioning directly via Matter.framework (not through Apple Home) creates a separate fabric. Devices will not appear in Apple Home. Use MatterSupport for production.',
          },
          {
            title: 'Thread Border Router Requirement',
            desc: 'Thread devices require HomePod mini, HomePod 2nd gen, or Apple TV 4K as border routers. Original HomePod and Apple TV HD lack Thread radios.',
          },
          {
            title: 'Objective-C API Style',
            desc: 'All MTR* classes are Objective-C interfaces used via Swift bridging. Command fields must use Matter\'s specific data-value dictionary format.',
          },
        ],
      },
      {
        id: 'resources',
        title: 'Resources',
        links: [
          { name: 'Matter.framework Docs', url: 'https://developer.apple.com/documentation/matter', desc: 'Apple official Matter framework reference' },
          { name: 'MatterSupport Docs', url: 'https://developer.apple.com/documentation/mattersupport', desc: 'MatterSupport extension development guide' },
          { name: 'Ecosystem Integration', url: 'https://developer.apple.com/documentation/mattersupport/adding-matter-support-to-your-ecosystem', desc: 'Complete third-party app Matter integration guide' },
          { name: 'WWDC21 Session', url: 'https://developer.apple.com/videos/play/wwdc2021/10298/', desc: 'First WWDC session introducing Matter support' },
          { name: 'CHIPTool iOS', url: 'https://github.com/project-chip/connectedhomeip/tree/master/src/darwin/CHIPTool', desc: 'Open-source iOS Matter controller reference' },
          { name: 'ESP RainMaker iOS', url: 'https://github.com/espressif/esp-rainmaker-ios', desc: "Espressif's iOS Matter reference implementation" },
          { name: 'Apple Developer Forums', url: 'https://developer.apple.com/forums/tags/matter', desc: 'Matter-related discussions and Q&A' },
        ],
      },
    ],
  },

  web: {
    title: 'Web / Node.js Matter SDK Guide',
    description: 'Understand the matter.js ecosystem: browser limitations, WebSocket proxy architecture, Node.js full controllers, and device bridging.',
    heroTitle: 'Web / Node.js Matter SDK',
    heroDesc: 'A guide to Matter development with matter.js, covering Node.js controllers, browser proxies, and device bridging.',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        content: `<p><strong>matter.js</strong> is a pure TypeScript implementation of the Matter protocol, maintained by the Open Home Foundation. It can build controllers, virtual devices, and bridges. Home Assistant adopted it as their production Matter controller in 2026.7. Note: matter.js has not yet received official CSA certification; certification efforts are ongoing.</p>
<p>Key point: <strong>browsers cannot communicate directly with Matter devices</strong> because Matter uses UDP and browsers have no raw UDP socket access. The practical solution is to run matter.js on a Node.js server and proxy browser requests via WebSocket.</p>`,
      },
      {
        id: 'architecture',
        title: 'Architecture & Packages',
        content: '<p>Core packages and usage patterns in the matter.js ecosystem:</p>',
        table: {
          headers: ['Package', 'Purpose', 'Runtime'],
          rows: [
            ['@matter/main', 'Primary entry point, Behavior API', 'Node.js / Bun'],
            ['@matter/nodejs', 'Node.js platform adapter (UDP / mDNS / BLE)', 'Node.js'],
            ['@matter/node', 'ServerNode / Endpoint / Behavior', 'Node.js'],
            ['@matter-server/ws-client', 'Browser-side WebSocket client', 'Browser / Node.js'],
            ['@matter-server/ws-controller', 'Server-side Matter controller', 'Node.js'],
            ['matterbridge', 'Plugin-based Matter bridge framework', 'Node.js'],
          ],
        },
      },
      {
        id: 'browser-limits',
        title: 'Browser Limitations',
        content: '<p>The browser security model fundamentally prevents direct Matter protocol execution:</p>',
        items: [
          {
            title: 'No Raw UDP Sockets',
            desc: 'Matter runs on UDP port 5540. Browsers have no raw UDP socket API. This is a security model constraint, not a missing feature.',
          },
          {
            title: 'No mDNS/DNS-SD',
            desc: 'Matter uses multicast DNS for device discovery. Browsers cannot send or receive multicast UDP packets.',
          },
          {
            title: 'Insufficient BLE Access',
            desc: 'Web Bluetooth requires a user-gesture device chooser dialog and cannot perform the silent BLE scanning and PASE sessions that Matter requires.',
          },
          {
            title: 'No Thread Configuration',
            desc: 'Browsers have no Thread network API and cannot configure Thread device credentials.',
          },
        ],
      },
      {
        id: 'websocket-proxy',
        title: 'WebSocket Proxy Pattern',
        content: '<p>matterjs-server provides a production-proven browser access pattern. The Node.js server holds the full Matter controller; browsers control devices remotely via WebSocket.</p>',
        codeExample: {
          language: 'typescript',
          title: 'Browser-Side Device Control',
          code: `import { MatterClient } from "@matter-server/ws-client";

// Connect to local matterjs-server
const client = new MatterClient("ws://localhost:5580/ws");
await client.startListening();

// View commissioned devices
const nodes = client.nodes;

// Send device command: toggle light (endpoint 1, cluster 6 = OnOff)
await client.deviceCommand(nodeId, 1, 6, "toggle");

// Listen for device state changes
client.addEventListener("nodes_changed", (event) => {
    console.log("State changed:", event);
});`,
        },
      },
      {
        id: 'nodejs-controller',
        title: 'Node.js Controller',
        content: '<p>In a Node.js environment, matter.js can run a full Matter controller directly with no proxy layer needed:</p>',
        codeExample: {
          language: 'typescript',
          title: 'Node.js Direct Control',
          code: `import { CommissioningController } from "@matter/main";
import { OnOff } from "@matter/main/clusters";

// Create and start controller
const controller = new CommissioningController({
    environment: { environment, id: "MyController" },
    autoConnect: true,
});
await controller.start();

// Get commissioned device endpoint
const node = controller.getNode(nodeId);
const endpoint = node.getEndpoint(1);

// Control device via Cluster API
const onOffCluster = endpoint.getClusterClient(OnOff.Cluster);
await onOffCluster.toggle();`,
        },
      },
      {
        id: 'resources',
        title: 'Resources',
        links: [
          { name: 'matter.js Repository', url: 'https://github.com/matter-js/matter.js/', desc: 'Pure TypeScript Matter implementation by Open Home Foundation' },
          { name: 'matterjs-server', url: 'https://github.com/matter-js/matterjs-server', desc: 'Matter controller server used by Home Assistant' },
          { name: 'Matterbridge', url: 'https://matterbridge.io/', desc: 'Plugin-based Matter bridge framework with 100+ plugins' },
          { name: 'matter.js API Docs', url: 'https://matter-js.github.io/docs/', desc: 'matter.js API reference documentation' },
          { name: 'Nanomatter', url: 'https://github.com/gabrielaleks/nanomatter', desc: 'Lightweight Matter controller reference implementation' },
          { name: 'HA Migration Blog', url: 'https://www.home-assistant.io/blog/2026/06/23/the-matter-upgrade-youve-been-waiting-for/', desc: 'Home Assistant migration to matter.js technical blog' },
          { name: 'Virtual Device Tutorial', url: 'https://www.matteralpha.com/how-to/what-is-matter-js-and-virtual-device-tutorial', desc: 'Tutorial for creating virtual devices with matter.js' },
        ],
      },
    ],
  },
};
