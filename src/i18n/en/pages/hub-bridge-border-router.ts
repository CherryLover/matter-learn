/**
 * Hubs / controllers / border routers / bridges guide — English
 * Links in the content are relative to /en/hub-bridge-border-router/.
 */
export default {
  title: 'Matter Hubs, Border Routers and Bridges Explained',
  description:
    'Does Matter need a hub? What controllers, Thread border routers, bridges and hubs each do, what Wi-Fi and Thread devices need, and how they show up in data.',
  prev: { title: 'Thread vs Wi-Fi', path: '/thread-vs-wifi/' },
  next: { title: 'Protocol Comparison', path: '/compare/' },
  content: `
  <h1>Do You Need a Matter Hub? Controllers, Border Routers and Bridges Explained</h1>

  <div class="callout callout-info">
    <div class="callout-title">The short answer</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>"Hub" is a catch-all word. In Matter it can mean three completely different roles — a <strong>controller</strong>, a <strong>Thread border router</strong> or a <strong>bridge</strong>. Many products play several roles at once, which is why they are so easy to mix up.</li>
      <li>By the protocol: Wi-Fi devices can be controlled as soon as they join your home router; Thread devices need a border router; Zigbee and other older devices need a bridge to get into Matter.</li>
      <li>In practice: the Apple, Google and Amazon apps generally require one of their own <strong>hubs</strong> in the home (a speaker, smart display or TV box) to run automations and provide remote access — and that hub is often a border router as well.</li>
    </ul>
  </div>

  <p>
    "Do Matter devices need a hub?" is a question almost every newcomer asks, and it is hard to answer because "hub" is used for several different things.
    This page first separates the roles in one table, then explains what each one does, when you need it and how it shows up in device data, and finally tells you what your home actually needs.
  </p>

  <figure class="diagram">
    <img src="/images/diagrams/hub-roles-en.webp" alt="The roles in a home Matter network: a phone app acts as the controller and connects to the home router; a smart speaker acts as the hub, both controller and border router, and connects over Thread to a door lock and a sensor; a bridge connects to the router and over Zigbee to a Zigbee bulb, translating older devices into Matter; a Wi-Fi plug connects straight to the router with no hub needed" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>The controller sends commands, the border router connects the Thread mesh to the home network, and the bridge translates older Zigbee devices into Matter devices</figcaption>
  </figure>

  <!-- ====== Table ====== -->
  <h2 id="roles">The roles in one table</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>Role</th><th>What it does</th><th>Speaks Matter?</th><th>When you need it</th><th>Common examples</th></tr>
      </thead>
      <tbody>
        <tr><td>Controller</td><td>Sends commands, reads state, runs automations</td><td>Yes</td><td>Always; your phone app is one</td><td>Phone apps, HomePod, Apple TV, Nest Hub, Echo, Home Assistant</td></tr>
        <tr><td>Border Router</td><td>Connects the Thread mesh to the home Wi-Fi / Ethernet network</td><td>Doesn't need to; it only forwards data</td><td>When you have Thread devices</td><td>HomePod mini, some Apple TV 4K models, Nest Hub (2nd gen), some Echo models</td></tr>
        <tr><td>Bridge</td><td>Translates Zigbee, Z-Wave and other older devices into Matter devices</td><td>Yes, and the other protocol too</td><td>When you want older devices in Matter</td><td>Philips Hue Bridge, Aqara M2 / M3, IKEA DIRIGERA</td></tr>
        <tr><td>Hub</td><td>A platform term: usually an always-on controller, often doubling as a border router</td><td>Yes</td><td>Generally required by the Apple, Google and Amazon apps</td><td>HomePod, Apple TV, Nest Hub, Echo</td></tr>
        <tr><td>Home router</td><td>Ordinary internet access; Wi-Fi devices and phones connect to it</td><td>Doesn't need to</td><td>Always, but it doesn't have to "support Matter"</td><td>Any Wi-Fi router</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Controller ====== -->
  <h2 id="controller">Controllers: the ones giving orders</h2>
  <p>
    A controller is whatever sends commands to a device and reads its state. When you tap "turn on" in a phone app, that app is the controller;
    a smart speaker switching lights off on a schedule or Home Assistant running an automation is a controller too.
  </p>
  <ul>
    <li><strong>Setting up and controlling can be separate jobs</strong>: the role that brings a device into your home is the Commissioner, usually a phone app; whatever controls the device day to day afterwards is a Controller. Phone apps usually do both. See <a href="../concepts/#commissioning">Concepts · Commissioner and Commissioning</a>.</li>
    <li><strong>One device can have several controllers</strong>: Apple Home, Google Home and Home Assistant each form their own <a href="../concepts/#fabric">Fabric</a>, and Matter requires devices to support at least 5 at the same time. When you share a device with a second platform, the first platform temporarily opens a commissioning window on the device — see <a href="../clusters/administrator-commissioning/">AdministratorCommissioning</a>.</li>
    <li><strong>Why a phone isn't enough</strong>: phones leave the house and go to sleep, so they can't run automations around the clock or serve as the entry point for remote control. Platforms therefore use an always-on device (a speaker, smart display or TV box) as the controller — that is what they call a "hub".</li>
  </ul>
  <p>
    In device data: the <code>Fabrics</code> attribute of the <a href="../clusters/operational-credentials/">OperationalCredentials</a> cluster lists the platforms a device has joined (with vendor ID and label),
    and <code>SupportedFabrics</code> tells you how many it can join; the <a href="../clusters/access-control/">AccessControl</a> cluster records what each platform is allowed to do.
  </p>

  <!-- ====== Border router ====== -->
  <h2 id="border-router">Border routers: forwarding, not translating</h2>
  <p>
    Thread devices live on their own mesh network, while phones and Wi-Fi devices live on the home network. A <strong>Thread Border Router</strong> sits on both and forwards traffic between them.
  </p>
  <ul>
    <li><strong>Only Thread devices need one</strong>: without a border router, Thread devices can't be set up or controlled; a home with only Wi-Fi devices has no use for it.</li>
    <li><strong>It doesn't speak Matter, and doesn't need to</strong>: Thread devices already speak Matter, so the border router just moves IP packets from one network to the other. That is the fundamental difference from a bridge.</li>
    <li><strong>It usually comes built into a hub</strong>: HomePod mini, some Apple TV 4K models, Google Nest Hub (2nd gen), some Amazon Echo models, and a number of routers and multi-function hubs have one.</li>
    <li><strong>You can have several</strong>: multiple border routers can serve the same Thread network and back each other up. Thread 1.4 goes further and requires border routers from different brands to join the same network and share network credentials; Matter 1.4 brought in Thread 1.4.</li>
  </ul>
  <p>
    In device data: a border router works at the network layer and is not necessarily a Matter device itself. To see which network a Thread device is on and who its neighbors are, read its
    <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a> cluster.
    For the full Thread versus Wi-Fi comparison, see <a href="../thread-vs-wifi/">Thread vs Wi-Fi</a>.
  </p>

  <!-- ====== Bridge ====== -->
  <h2 id="bridge">Bridges: translators for older devices</h2>
  <p>
    Zigbee, Z-Wave, Bluetooth and proprietary devices don't speak Matter. A <strong>Matter Bridge</strong> speaks both sides:
    it controls those older devices over their original protocol and presents each one as a Matter device, so Apple, Google and Amazon apps can control them directly.
  </p>
  <p>In Matter data, a bridge looks like this:</p>
  <ul>
    <li>The bridge itself is one node that, besides its root endpoint, declares an <strong>Aggregator</strong> endpoint (device type <code>0x000E</code>)</li>
    <li>Each older device becomes a <strong>Bridged Node</strong> endpoint (device type <code>0x0013</code>) that also carries its real type, e.g. "Bridged Node + Dimmable Light"</li>
    <li>Each device's name and reachability live in the <a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a> cluster</li>
    <li>To list the devices behind the bridge, read the <code>PartsList</code> of the <a href="../clusters/descriptor/">Descriptor</a> cluster on the root endpoint</li>
  </ul>
  <p>
    The Philips Hue Bridge, Aqara M2 / M3 and IKEA DIRIGERA all bring their own Zigbee devices into Matter this way.
    Keep in mind that a bridge can only translate the features it supports, so some special features of an older device may not be available through Matter.
    Paste a bridge's data into the <a href="../tools/json-parser/">JSON Parser</a> to see the type of every endpoint.
  </p>

  <!-- ====== Hub ====== -->
  <h2 id="hub">What "hub" and "gateway" actually mean</h2>
  <p>
    Both are product and platform terms, not roles defined by the Matter specification. When something is called a "Matter hub" or "Matter gateway", break down which roles it actually plays:
  </p>
  <ul>
    <li><strong>Apple home hubs</strong> (HomePod, Apple TV): a controller that runs automations and provides remote access; some models, such as HomePod mini, are also border routers.</li>
    <li><strong>Google and Amazon hubs</strong> (Nest Hub, Nest speakers, Echo and so on): a controller; some models are also border routers.</li>
    <li><strong>Home Assistant</strong>: a controller; with a Thread radio plugged in, it can be a border router too.</li>
    <li><strong>Multi-function hubs</strong> (such as the Aqara M3): controller, border router and bridge all in one.</li>
    <li><strong>Philips Hue Bridge</strong>: in Matter it acts as a bridge, bringing Hue's Zigbee lights into Matter.</li>
  </ul>
  <div class="callout callout-warning">
    <div class="callout-title">Check before you buy</div>
    <p>
      A hub whose product page says "supports Matter" might only be a bridge (it brings its own older devices into Matter), might be a controller (it can control other brands' Matter devices),
      or might be a border router (it gets Thread devices online). Check the specs for the role you are missing instead of trusting the words "Matter hub".
    </p>
  </div>

  <!-- ====== What you need ====== -->
  <h2 id="what-you-need">What does my home need?</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>Your situation</th><th>What you need</th></tr>
      </thead>
      <tbody>
        <tr><td>Wi-Fi Matter devices only, using Home Assistant</td><td>Nothing extra; Home Assistant is the controller</td></tr>
        <tr><td>Wi-Fi Matter devices only, using Apple / Google / Amazon</td><td>One hub from that platform (a speaker, smart display or TV box)</td></tr>
        <tr><td>Any Thread devices</td><td>At least one Thread border router. The hub above most likely has one built in — check the exact model before you buy</td></tr>
        <tr><td>Older Zigbee / Z-Wave devices you want to bring in</td><td>A hub that supports Matter bridging; many older hubs gained it through a firmware update, such as the Hue Bridge and Aqara M2</td></tr>
        <tr><td>Using two platforms at once</td><td>No extra hardware: turn on pairing mode (or "share with another platform") for the device in the first platform, get a new setup code, and add it in the second platform</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Router ====== -->
  <h2 id="router">Do I need a "Matter router"?</h2>
  <p>
    No. Matter devices use your home router as an ordinary network, and the router itself doesn't have to "support Matter". Just watch out for two things:
  </p>
  <ul>
    <li><strong>Don't isolate devices from your phone</strong>: don't put devices on a guest network and don't turn on AP isolation. Matter finds devices on the local network using IPv6 and multicast; if they are isolated, setup stalls at the last step or the device shows "No Response" afterwards.</li>
    <li><strong>Mind your router's capacity</strong>: with dozens of Wi-Fi devices online, entry-level routers may struggle; moving some mains-powered devices to Thread helps.</li>
  </ul>
  <p>
    What is marketed as a "Matter router" usually means a router with a <strong>built-in Thread border router</strong>. Matter 1.4 defined a dedicated
    Home Router and Access Point (HRAP) device type for these products — see the <a href="../roadmap/">Roadmap</a>.
  </p>

  <!-- ====== Related ====== -->
  <h2 id="related">Further reading</h2>
  <ul>
    <li><a href="../thread-vs-wifi/">Thread or Wi-Fi: Choosing a Network for Matter Devices</a></li>
    <li><a href="../compare/#bridges">Protocol Comparison · How they coexist with Matter</a></li>
    <li><a href="../concepts/#fabric">Concepts · Fabric</a></li>
    <li>Related clusters: <a href="../clusters/operational-credentials/">OperationalCredentials</a>, <a href="../clusters/access-control/">AccessControl</a>, <a href="../clusters/administrator-commissioning/">AdministratorCommissioning</a>, <a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a>, <a href="../clusters/descriptor/">Descriptor</a>, <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a></li>
    <li><a href="../faq/">FAQ</a></li>
  </ul>
`,
} as const;
