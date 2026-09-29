/**
 * Thread vs Wi-Fi guide — English
 * Links in the content are relative to /en/thread-vs-wifi/.
 */
export default {
  title: 'Matter over Thread vs Wi-Fi: How to Choose',
  description:
    'Thread or Wi-Fi for Matter devices? Compare power, mesh vs star, speed and border router needs, learn each Thread role, and pick the right one for each device.',
  prev: { title: 'Concepts Overview', path: '/concepts/' },
  next: { title: 'Hubs, Border Routers and Bridges', path: '/hub-bridge-border-router/' },
  content: `
  <h1>Thread or Wi-Fi: Choosing a Network for Matter Devices</h1>

  <div class="callout callout-info">
    <div class="callout-title">The short answer</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>Matter defines what devices say; Thread and Wi-Fi are the roads the messages travel on. A device is controlled the same way, with the same data, whichever road it uses.</li>
      <li><strong>Battery devices</strong> (locks, sensors, wireless buttons) almost always use Thread: it sips power, so batteries last a long time.</li>
      <li><strong>High-bandwidth devices</strong> (cameras, doorbells, TVs, large appliances) use Wi-Fi or Ethernet.</li>
      <li><strong>Small mains-powered devices</strong> (lights, plugs, switches) come both ways: the Wi-Fi version works as soon as it joins your router; the Thread version needs a border router in the home, but each one relays traffic for its neighbors, so the network gets sturdier as you add more.</li>
    </ul>
  </div>

  <p>
    Thread or Wi-Fi is one of the first questions you hit when buying Matter devices or building a Matter product.
    This page explains where the two sit in Matter, compares them point by point, and ends with a recommendation for each kind of device.
  </p>

  <figure class="diagram">
    <img src="/images/diagrams/thread-wifi-en.webp" alt="Wi-Fi vs Thread topology: on the left, Wi-Fi is a star, with a camera, a plug and a bulb each connected directly to the Wi-Fi router; on the right, Thread is a mesh, where a border router connects to a mains-powered bulb and plug that relay for each other, and a battery-powered door lock and sensor hang off the nearest mains device; the border router links to the Wi-Fi router to join the home network" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>Wi-Fi is a star where every device talks to the router; Thread is a mesh where mains-powered devices relay traffic and a border router connects it to the home network</figcaption>
  </figure>

  <!-- ====== Where they fit ====== -->
  <h2 id="where">Where Thread and Wi-Fi fit in Matter</h2>
  <p>
    Matter itself only defines the upper layers: what a device can do (Clusters), how to read its state, how to send it commands and how to encrypt it all.
    How the data actually travels is left to existing networks underneath — Wi-Fi, Thread or Ethernet. Bluetooth is only used briefly during setup.
  </p>
  <p>
    An analogy: Matter is a common language everyone agreed on, and Wi-Fi and Thread are two kinds of road. Wi-Fi is a city highway — wide and fast,
    but every car has to pass through the same junction (the router). Thread is a network of footpaths through a neighborhood — slower and effortless,
    and neighbors can pass messages along for each other. Whichever road a message takes, it is in the same language,
    which is why Apple, Google and Amazon apps control both kinds of device in exactly the same way.
  </p>
  <p>
    Just as important, Thread and Wi-Fi both carry IP (IPv6). A command your phone sends over Wi-Fi reaches a Thread device through a border router without any translation.
    For which layers each protocol covers, see <a href="../compare/#layers">Protocol Comparison · Placing them on the seven-layer model</a>.
  </p>

  <!-- ====== Comparison ====== -->
  <h2 id="differences">Key differences at a glance</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>Aspect</th><th>Wi-Fi</th><th>Thread</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>Radio</strong></td><td>2.4 GHz / 5 GHz; many smart devices support 2.4 GHz only</td><td>2.4 GHz, IEEE 802.15.4 (the same radio as Zigbee)</td></tr>
        <tr><td><strong>Speed</strong></td><td>Tens to hundreds of Mbps, enough for video</td><td>250 kbps, enough for commands and sensor data only</td></tr>
        <tr><td><strong>Topology</strong></td><td>Star: every device connects straight to the router</td><td>Mesh: mains-powered devices relay for each other and route around a device that drops out</td></tr>
        <tr><td><strong>Power</strong></td><td>High; devices are almost always mains-powered</td><td>Low; battery devices can sleep most of the time</td></tr>
        <tr><td><strong>Extra hardware</strong></td><td>None; your home router is enough</td><td>At least one Thread border router (built into many speakers and TV boxes)</td></tr>
        <tr><td><strong>With many devices</strong></td><td>Everything crowds onto the router; entry-level routers may struggle</td><td>More mains-powered devices mean wider coverage and a sturdier network</td></tr>
        <tr><td><strong>Typical devices</strong></td><td>Cameras, doorbells, TVs, large appliances, plus many lights and plugs</td><td>Locks, sensors, buttons, radiator valves, plus many lights and plugs</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Thread roles ====== -->
  <h2 id="thread-roles">Who's who in a Thread network</h2>
  <p>
    Wi-Fi's structure is familiar: one router, and every device connects to it. Thread is a mesh, and the devices in it split the work automatically based on how they are powered:
  </p>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>Role</th><th>Usually played by</th><th>What it does</th></tr>
      </thead>
      <tbody>
        <tr><td>Router</td><td>Mains-powered devices: lights, plugs, switches</td><td>Relays data for other devices; the backbone of the mesh</td></tr>
        <tr><td>Leader</td><td>One router, elected automatically</td><td>Manages the network (assigns router IDs, distributes network data); if it goes offline, the other routers elect a new one</td></tr>
        <tr><td>REED<br/>(Router-Eligible End Device)</td><td>Mains-powered devices</td><td>Acts as an end device until the network needs more routers, then promotes itself</td></tr>
        <tr><td>End Device</td><td>Mains-powered devices that don't relay</td><td>Always on, but only sends and receives its own data</td></tr>
        <tr><td>Sleepy End Device</td><td>Battery devices: locks, sensors, buttons</td><td>Sleeps most of the time and wakes periodically to collect messages; the most power-efficient role</td></tr>
        <tr><td>Border Router</td><td>HomePod mini, some Apple TV 4K models, Google Nest Hub (2nd gen) and others</td><td>Connects the Thread mesh to the home Wi-Fi / Ethernet network; the Thread devices' way out</td></tr>
      </tbody>
    </table>
  </div>
  <p>
    The mesh heals itself: unplug one mains-powered device and traffic reroutes through another router. People often say "the more Thread devices, the better",
    but strictly it is <strong>mains-powered Thread devices</strong> that make the network better — battery devices don't relay, so adding more of them doesn't extend the mesh.
  </p>
  <p>
    To see which role a Thread device currently plays, read the <code>RoutingRole</code> attribute of the
    <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a> cluster; its neighbor table, channel and network name are in the same cluster.
  </p>

  <!-- ====== Border router ====== -->
  <h2 id="border-router">Border routers: the way out of a Thread network</h2>
  <p>
    The Thread mesh and your home Wi-Fi are two separate networks. Your phone doesn't speak Thread, so everything relies on a border router forwarding traffic between the two.
    Without one, your phone can neither add Thread devices nor control them.
  </p>
  <ul>
    <li><strong>Many devices already have one built in</strong>: HomePod mini, some Apple TV 4K models, Google Nest Hub (2nd gen), some Amazon Echo models, and a number of routers and hubs. Look for "Thread Border Router" in the specs before you buy.</li>
    <li><strong>It forwards, it doesn't translate</strong>: Thread devices already speak Matter, so the border router just moves packets from one network to the other. That is different from a Zigbee hub, which has to translate Zigbee commands into another protocol.</li>
    <li><strong>You can have several</strong>: multiple border routers can serve the same Thread network; if one goes offline, the others take over.</li>
    <li><strong>Cross-brand sharing is improving</strong>: border routers from different brands used to create separate Thread networks, scattering devices across them. Thread 1.4 requires border routers to join an existing network and share network credentials across platforms, and Matter 1.4 brought in Thread 1.4 — see the <a href="../roadmap/">Roadmap</a>.</li>
  </ul>
  <p>
    Border router, controller, bridge and "hub" are often used interchangeably. For what each one actually does and which ones your home needs, see
    <a href="../hub-bridge-border-router/">Matter Hubs, Border Routers and Bridges Explained</a>.
  </p>

  <!-- ====== Battery ====== -->
  <h2 id="battery">Why battery devices almost always choose Thread</h2>
  <p>
    To be fast, a Wi-Fi radio stays on and keeps a connection to the router, which uses a lot of power — so Wi-Fi devices are almost always mains-powered.
    The few battery-powered Wi-Fi devices (battery cameras, for example) either carry large batteries or need frequent charging.
  </p>
  <p>
    A Thread sleepy end device switches its radio off most of the time, wakes up periodically to ask "anything for me?", and goes straight back to sleep once it's done.
    Door and window sensors, temperature sensors and wireless buttons can run for a long time on one or two batteries.
  </p>
  <p>
    The trade-off is slightly slower response: a command has to wait until the device wakes up. Matter manages the schedule of these
    "intermittently connected devices" with the <a href="../clusters/icd-management/">ICD Management</a> cluster: <strong>Short Idle Time (SIT)</strong> devices
    usually wake at least every dozen seconds or so, so a controller only has to wait briefly; <strong>Long Idle Time (LIT)</strong> devices can sleep for hours and save more power,
    but a controller can only reach them after they check in (Check-In). Devices that must respond on demand, such as locks, usually wake up very often.
    Battery level itself is read from the <a href="../clusters/power-source/">PowerSource</a> cluster.
  </p>

  <!-- ====== Choosing ====== -->
  <h2 id="choosing">What to choose for each device</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>Device</th><th>Recommendation</th><th>Why</th></tr>
      </thead>
      <tbody>
        <tr><td>Door locks</td><td>Thread</td><td>Battery-powered, and Thread saves power; Wi-Fi locks exist but usually need bigger batteries or more frequent changes</td></tr>
        <tr><td>Door/window, temperature, motion and other sensors</td><td>Thread</td><td>Battery-powered, little data</td></tr>
        <tr><td>Wireless buttons and remotes</td><td>Thread</td><td>Battery-powered and expected to respond instantly</td></tr>
        <tr><td>Radiator thermostat valves</td><td>Thread</td><td>Mounted on the radiator and battery-powered</td></tr>
        <tr><td>Bulbs and light strips</td><td>Either</td><td>The Wi-Fi version doesn't depend on a border router; the Thread version strengthens the Thread mesh</td></tr>
        <tr><td>Plugs and in-wall switches</td><td>Either; prefer Thread if you have many Thread devices</td><td>A mains-powered Thread device becomes a router and boosts coverage for nearby locks and sensors</td></tr>
        <tr><td>Wall thermostats</td><td>Either</td><td>Usually wired for power; depends on what the manufacturer offers</td></tr>
        <tr><td>Cameras and video doorbells</td><td>Wi-Fi or Ethernet</td><td>Video needs bandwidth far beyond Thread's 250 kbps; Matter only added camera device types in 1.5</td></tr>
        <tr><td>TVs, speakers, large appliances</td><td>Wi-Fi or Ethernet</td><td>Lots of data, and they are mains-powered and networked anyway</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">From a product maker's point of view</div>
    <p>
      A Wi-Fi version has the lowest barrier for users: no border router needed, it just joins the router. A Thread version requires the user to own a border router first,
      and in return offers lower power and a network that gets sturdier over time. Mains-powered products are built both ways; for battery products, Thread is essentially the only option.
    </p>
  </div>

  <!-- ====== Commissioning ====== -->
  <h2 id="commissioning">How setup differs</h2>
  <p>
    Setting up either kind of device is almost identical: scan the code → find the device over Bluetooth and open an encrypted session → issue it a certificate and add it to a Fabric → send it network details → the device comes online.
    The only difference is the "network details" step:
  </p>
  <ul>
    <li><strong>A Wi-Fi device</strong> receives your Wi-Fi name and password.</li>
    <li><strong>A Thread device</strong> receives a set of Thread network parameters (network name, channel, network key and so on, together called the Operational Dataset). Your phone first gets these parameters from the border router in your home — so without a border router, a Thread device can't even finish setup.</li>
  </ul>
  <p>
    This step is handled by the <a href="../clusters/network-commissioning/">NetworkCommissioning</a> cluster; for the whole flow, see
    <a href="../concepts/#commissioning">Concepts · Commissioner and Commissioning</a>.
  </p>

  <!-- ====== Wi-Fi tips ====== -->
  <h2 id="wifi-tips">Common Wi-Fi pitfalls</h2>
  <ul>
    <li><strong>2.4 GHz only</strong>: many Wi-Fi smart devices support 2.4 GHz only. If your router merges 2.4 GHz and 5 GHz under one network name, a few devices fail to set up; splitting the bands temporarily can help.</li>
    <li><strong>No guest network, no AP isolation</strong>: Matter finds devices on the local network using IPv6 and multicast. If the phone and the device are isolated from each other, they can't see each other — typically setup stalls at the last step, or the device shows "No Response" afterwards.</li>
    <li><strong>Mind your router's capacity</strong>: with dozens of devices online, entry-level routers may drop connections. Moving some mains-powered devices to Thread takes load off the router.</li>
  </ul>
  <p>
    Wi-Fi signal strength, channel and more can be read from the <a href="../clusters/wifi-network-diagnostics/">WiFiNetworkDiagnostics</a> cluster.
  </p>

  <!-- ====== FAQ ====== -->
  <h2 id="faq">Common questions</h2>

  <h3 id="thread-vs-zigbee">How are Thread and Zigbee related?</h3>
  <p>
    They use the same radio (IEEE 802.15.4 at 2.4 GHz), and many chips can run either. The difference is higher up: Zigbee covers everything from the radio to the application layer
    and needs a hub to translate before it can talk to other systems, while Thread only handles networking, is IP-based and carries Matter directly with no translation.
    See the <a href="../compare/">Protocol Comparison</a>.
  </p>

  <h3 id="without-apple-google">Can I use Thread devices without an Apple or Google speaker?</h3>
  <p>
    Yes, as long as your home has any Thread border router: a hub from another brand, a router with a built-in border router, or Home Assistant with a Thread radio plugged in
    (such as the official Connect ZBT series) will all do.
  </p>

  <h3 id="mixing">Can Thread and Wi-Fi devices be mixed?</h3>
  <p>
    Yes. The two can be mixed freely in one home; they look the same in the app, and scenes and automations work across both — to Matter they are the same kind of device.
  </p>

  <h3 id="wifi-need-hub">Do Wi-Fi devices need a hub?</h3>
  <p>
    Not at the protocol level — joining your home router is enough. But the Apple, Google and Amazon apps generally require one of their own hubs in the home
    (a speaker, smart display or TV box) to run automations and provide remote access. See <a href="../hub-bridge-border-router/#what-you-need">What does my home need?</a>
  </p>

  <!-- ====== Related ====== -->
  <h2 id="related">Further reading</h2>
  <ul>
    <li><a href="../hub-bridge-border-router/">Matter Hubs, Border Routers and Bridges Explained</a></li>
    <li><a href="../compare/">Protocol Comparison: Matter, Zigbee, Z-Wave and More</a></li>
    <li><a href="../concepts/#commissioning">Concepts · Commissioner and Commissioning</a></li>
    <li>Related clusters: <a href="../clusters/network-commissioning/">NetworkCommissioning</a>, <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a>, <a href="../clusters/wifi-network-diagnostics/">WiFiNetworkDiagnostics</a>, <a href="../clusters/icd-management/">ICD Management</a></li>
    <li><a href="../faq/">FAQ</a></li>
  </ul>
`,
} as const;
