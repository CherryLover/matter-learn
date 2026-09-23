/**
 * Concepts page FULL content — English (translated)
 */
export default {
  title: 'Concepts Overview',
  description: 'Understand the Matter protocol from scratch — Node, Endpoint, Cluster, Attribute, and Command explained with a smart building analogy for the four-layer data model.',
  nextTitle: 'Cluster Manual',
  content: `
  <h1>Concepts Overview</h1>

  <div class="callout callout-info">
    <div class="callout-title">After reading this page you will know</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>How Matter uses a four-layer structure to describe what a device can do</li>
      <li>What Node, Endpoint, Cluster, Attribute, and Command each mean</li>
      <li>How to read "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 = 0x01" in plain language</li>
      <li>Whether you are an app developer, firmware engineer, QA, or product manager, you will be able to understand device data</li>
    </ul>
  </div>

  <p>
    This chapter explains the core concepts of the Matter protocol. No specific technical background is required -- anyone can follow along.
    After reading, when you see data like "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 = 0x01", you will know exactly what it means.
  </p>

  <!-- ====== What is Matter ====== -->
  <h2 id="what-is-matter">What is Matter</h2>
  <p>
    Matter is a <strong>unified smart home standard protocol</strong>, jointly developed by Apple, Google, Amazon, Samsung, and others (the organization is called CSA -- Connectivity Standards Alliance).
  </p>
  <p>
    Before Matter, if a smart light bulb wanted to be controlled by HomeKit, Google Home, and Alexa simultaneously, the manufacturer had to integrate three completely different protocols.
    Matter's goal is simple: <strong>define one standard data model and communication method that all platforms accept</strong>.
  </p>
  <p>
    Think of it this way: Matter is like USB-C. Every phone used to have its own charging port; now they are all USB-C, and cables and devices are interchangeable.
    Matter does the same thing -- it defines a "universal interface" for smart home devices.
  </p>
  <p>
    Technically, Matter is an <strong>application-layer protocol</strong>: it only defines the upper layers (what a device can do, how to interact with it, how traffic is encrypted) and runs on top of the IP networks you already have -- Wi-Fi, Thread, Ethernet. Bluetooth LE is used only briefly during commissioning.
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/stack-en.webp" alt="Matter protocol layers: Application (Cluster data model), Interaction Model, Security and Transport are defined by Matter; the IPv6 Network layer and the Wi-Fi / Thread / Ethernet Link layer reuse existing technology; Bluetooth LE is used only for commissioning" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>Matter defines only the top four layers and reuses existing IP networking below; Bluetooth LE is used only for commissioning</figcaption>
  </figure>

  <!-- ====== Four-layer data model ====== -->
  <h2 id="data-model">Matter's Four-Layer Data Model</h2>
  <p>
    Matter organizes all of a device's capabilities into four layers. This is the most fundamental concept in Matter -- understand it and you understand most of the protocol.
  </p>
  <p>
    Imagine a smart building -- this analogy will help you see the whole structure at a glance:
  </p>

  <!-- Four-layer model overview: door lock example -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 720 455" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 720px; display: block; margin: 0 auto;" role="img" aria-label="Matter four-layer data model overview: using a smart door lock as an example, showing the nesting of Node, Endpoint, Cluster, Attribute, and Command">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Node outer box -->
        <rect class="d-node-fill" x="10" y="10" width="700" height="385" rx="14" stroke-width="1.5"/>
        <text class="d-text-title" x="360" y="36" text-anchor="middle" font-size="17" font-weight="600">Node</text>
        <text class="d-text-sub" x="360" y="54" text-anchor="middle" font-size="12">e.g. a smart door lock</text>

        <!-- Endpoint 0 -->
        <g>
          <rect class="d-ep-fill" x="24" y="68" width="278" height="320" rx="10" stroke-width="1.5"/>
          <text class="d-text-ep" x="163" y="90" text-anchor="middle" font-size="14" font-weight="600">Endpoint 0</text>
          <text class="d-text-ep-sub" x="163" y="106" text-anchor="middle" font-size="12">Management Endpoint</text>
          <line class="d-ep-line" x1="38" y1="114" x2="288" y2="114" stroke-width="0.5" opacity="0.4"/>

          <!-- Cluster: BasicInformation -->
          <rect class="d-cl-fill" x="38" y="122" width="250" height="258" rx="8" stroke-width="1"/>
          <text class="d-text-cl" x="163" y="144" text-anchor="middle" font-size="13" font-weight="600">BasicInformation</text>
          <text class="d-text-sub" x="163" y="160" text-anchor="middle" font-size="11">Basic Info · 0x0028</text>
          <line class="d-cl-line" x1="48" y1="168" x2="278" y2="168" stroke-width="0.5" opacity="0.3"/>

          <!-- Attributes -->
          <text class="d-text-section" x="52" y="186" font-size="10" font-weight="600" letter-spacing="0.5">ATTRIBUTES</text>
          <rect class="d-at-fill" x="48" y="194" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="211" font-size="12">VendorName</text>
          <rect class="d-at-fill" x="48" y="226" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="243" font-size="12">ProductName</text>
          <rect class="d-at-fill" x="48" y="258" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="275" font-size="12">SoftwareVersion</text>

          <!-- Commands -->
          <text class="d-text-section" x="52" y="306" font-size="10" font-weight="600" letter-spacing="0.5">COMMANDS</text>
          <text class="d-text-muted-italic" x="62" y="326" font-size="12">(none)</text>
        </g>

        <!-- Endpoint 1 (highlighted with thicker border) -->
        <g>
          <rect class="d-ep1-fill" x="316" y="68" width="380" height="320" rx="10" stroke-width="2"/>
          <text class="d-text-ep" x="506" y="90" text-anchor="middle" font-size="14" font-weight="600">Endpoint 1</text>
          <text class="d-text-ep-sub" x="506" y="106" text-anchor="middle" font-size="12">Application Endpoint</text>
          <line class="d-ep-line" x1="330" y1="114" x2="682" y2="114" stroke-width="0.5" opacity="0.4"/>

          <!-- Cluster: DoorLock -->
          <rect class="d-cl-fill" x="330" y="122" width="352" height="258" rx="8" stroke-width="1"/>
          <text class="d-text-cl" x="506" y="144" text-anchor="middle" font-size="13" font-weight="600">DoorLock</text>
          <text class="d-text-sub" x="506" y="160" text-anchor="middle" font-size="11">Door Lock Control · 0x0101</text>
          <line class="d-cl-line" x1="340" y1="168" x2="672" y2="168" stroke-width="0.5" opacity="0.3"/>

          <!-- Attributes -->
          <text class="d-text-section" x="344" y="186" font-size="10" font-weight="600" letter-spacing="0.5">ATTRIBUTES</text>
          <rect class="d-at-fill" x="340" y="194" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="354" y="211" font-size="12">LockState</text>
          <rect class="d-at-fill" x="340" y="226" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="354" y="243" font-size="12">BatPercentRemaining</text>

          <!-- Commands -->
          <text class="d-text-section" x="344" y="274" font-size="10" font-weight="600" letter-spacing="0.5">COMMANDS</text>
          <rect class="d-cm-fill" x="340" y="282" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-cm" x="354" y="299" font-size="12">LockDoor</text>
          <rect class="d-cm-fill" x="340" y="314" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-cm" x="354" y="331" font-size="12">UnlockDoor</text>
        </g>

        <!-- Legend -->
        <g>
          <rect class="d-legend-bg" x="10" y="405" width="700" height="40" rx="8" stroke-width="1"/>
          <rect class="d-node-swatch" x="30" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="50" y="429" font-size="11">Node</text>
          <rect class="d-ep-swatch" x="120" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="140" y="429" font-size="11">Endpoint</text>
          <rect class="d-cl-swatch" x="230" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="250" y="429" font-size="11">Cluster</text>
          <rect class="d-at-swatch" x="340" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="360" y="429" font-size="11">Attribute</text>
          <rect class="d-cm-swatch" x="460" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="480" y="429" font-size="11">Command</text>
        </g>
      </g>
    </svg>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Another way to think about it: the smartphone analogy</div>
    <p>If the building analogy doesn't click, think of your phone instead: Node = the phone itself, Endpoint = an app on the phone, Cluster = a feature module within the app, Attribute = information you can see (battery at 80%), Command = actions you can perform (take a photo, send a message).</p>
  </div>

  <!-- Everyday analogy comparison chart -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 660 330" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 660px; display: block; margin: 0 auto;" role="img" aria-label="Matter concepts mapped to everyday analogies: Node maps to smart building, Endpoint to room, Cluster to building system, Attribute and Command to gauges and remote buttons">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Column headers -->
        <text class="d-text-analogy-header-left" x="130" y="22" text-anchor="middle" font-size="14" font-weight="600">Matter Concept</text>
        <text class="d-text-analogy-header-right" x="530" y="22" text-anchor="middle" font-size="14" font-weight="600">Everyday Analogy</text>

        <!-- Level 1: Node <-> Smart Building -->
        <rect class="d-analogy-left" x="20" y="38" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="60" text-anchor="middle" font-size="14" font-weight="600">Node</text>
        <text class="d-text-analogy-sub" x="130" y="76" text-anchor="middle" font-size="11">Device Node — physical device</text>
        <rect class="d-analogy-right" x="420" y="38" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="60" text-anchor="middle" font-size="14" font-weight="600">Smart Building</text>
        <text class="d-text-analogy-sub" x="530" y="76" text-anchor="middle" font-size="11">An entire building</text>
        <line class="d-analogy-dash" x1="240" y1="64" x2="420" y2="64" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 1->2 -->
        <line class="d-analogy-connector" x1="130" y1="90" x2="130" y2="110" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="90" x2="530" y2="110" stroke-width="1.5"/>

        <!-- Level 2: Endpoint <-> Room -->
        <rect class="d-analogy-left" x="20" y="110" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="132" text-anchor="middle" font-size="14" font-weight="600">Endpoint</text>
        <text class="d-text-analogy-sub" x="130" y="148" text-anchor="middle" font-size="11">Endpoint — independent function area</text>
        <rect class="d-analogy-right" x="420" y="110" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="132" text-anchor="middle" font-size="14" font-weight="600">Room / Zone</text>
        <text class="d-text-analogy-sub" x="530" y="148" text-anchor="middle" font-size="11">Management office, tenant rooms</text>
        <line class="d-analogy-dash" x1="240" y1="136" x2="420" y2="136" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 2->3 -->
        <line class="d-analogy-connector" x1="130" y1="162" x2="130" y2="182" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="162" x2="530" y2="182" stroke-width="1.5"/>

        <!-- Level 3: Cluster <-> Building System -->
        <rect class="d-analogy-left" x="20" y="182" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="204" text-anchor="middle" font-size="14" font-weight="600">Cluster</text>
        <text class="d-text-analogy-sub" x="130" y="220" text-anchor="middle" font-size="11">Cluster — a group of related capabilities</text>
        <rect class="d-analogy-right" x="420" y="182" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="204" text-anchor="middle" font-size="14" font-weight="600">Building System</text>
        <text class="d-text-analogy-sub" x="530" y="220" text-anchor="middle" font-size="11">Lighting, HVAC, door lock systems</text>
        <line class="d-analogy-dash" x1="240" y1="208" x2="420" y2="208" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 3->4 -->
        <line class="d-analogy-connector" x1="130" y1="234" x2="130" y2="254" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="234" x2="530" y2="254" stroke-width="1.5"/>

        <!-- Level 4: Attribute/Command <-> Gauges/Remote -->
        <rect class="d-analogy-left" x="20" y="254" width="220" height="56" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="276" text-anchor="middle" font-size="13" font-weight="600">Attribute / Command</text>
        <text class="d-text-analogy-sub" x="130" y="294" text-anchor="middle" font-size="11">Attribute / Command</text>
        <rect class="d-analogy-right" x="420" y="254" width="220" height="56" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="276" text-anchor="middle" font-size="13" font-weight="600">Dashboard / Remote</text>
        <text class="d-text-analogy-sub" x="530" y="294" text-anchor="middle" font-size="11">Readings / Buttons</text>
        <line class="d-analogy-dash" x1="240" y1="282" x2="420" y2="282" stroke-dasharray="6 3" stroke-width="1.5"/>
      </g>
    </svg>
  </div>

  <p>Let's go through each layer in detail.</p>

  <!-- ====== Node ====== -->
  <h3 id="node">Node</h3>
  <p>
    A Node is a <strong>physical device</strong> on the network. A door lock is a Node, a light bulb is also a Node.
  </p>
  <p>
    Analogy: <strong>a smart building</strong>. The building itself is a Node -- it has different rooms inside, and each room is equipped with different systems.
  </p>
  <div class="callout callout-info">
    <div class="callout-title">Door lock example</div>
    <p>A Matter door lock is a Node. Once it joins the Matter network via WiFi or Thread, a controller (such as a phone app) can discover and operate it.</p>
  </div>

  <!-- ====== Endpoint ====== -->
  <h3 id="endpoint">Endpoint</h3>
  <p>
    A Node can have multiple Endpoints, and each Endpoint is an <strong>independent functional area</strong>.
  </p>
  <p>
    Analogy: <strong>different rooms</strong> in a building. The management office handles building-level affairs (utilities, maintenance), while tenant rooms are where actual living happens. Endpoints work the same way -- different endpoints serve different purposes.
  </p>
  <p>Matter defines two types of Endpoints:</p>

  <!-- Endpoint diagram -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 520px; display: block; margin: 0 auto;" role="img" aria-label="Endpoint diagram: Endpoint 0 is the management endpoint, Endpoint 1 is the application endpoint, daily development mainly focuses on Endpoint 1">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Device header -->
        <rect class="d-device-fill" x="160" y="8" width="200" height="36" rx="8" stroke-width="1.5"/>
        <text class="d-text-device" x="260" y="31" text-anchor="middle" font-size="14" font-weight="600">Door Lock (Node)</text>

        <!-- Connector to EP0 -->
        <line class="d-tree-line" x1="260" y1="44" x2="260" y2="62" stroke-width="1.5"/>

        <!-- Endpoint 0 card (muted, dashed border) -->
        <rect class="d-ep0-fill" x="30" y="62" width="460" height="86" rx="10" stroke-width="1.5" stroke-dasharray="6 3"/>
        <rect class="d-ep0-tag" x="45" y="74" width="90" height="22" rx="4"/>
        <text class="d-text-ep0" x="90" y="89" text-anchor="middle" font-size="12" font-weight="600">Endpoint 0</text>
        <text class="d-text-ep0" x="148" y="89" font-size="12">Management</text>
        <text class="d-text-ep0" x="45" y="112" font-size="12">Commissioning / Certificates / Diagnostics / OTA</text>
        <text class="d-hint-text" x="45" y="134" font-size="11">Usually not a concern in day-to-day development</text>

        <!-- Connector to EP1 -->
        <line class="d-tree-line" x1="260" y1="148" x2="260" y2="168" stroke-width="1.5"/>

        <!-- Endpoint 1 card (highlighted, solid border) -->
        <rect class="d-ep1-highlight" x="30" y="168" width="460" height="104" rx="10" stroke-width="2"/>
        <rect class="d-ep1-tag" x="45" y="180" width="90" height="22" rx="4"/>
        <text class="d-text-ep1-accent" x="90" y="195" text-anchor="middle" font-size="12" font-weight="600">Endpoint 1</text>
        <text class="d-text-ep1-accent" x="148" y="195" font-size="12" font-weight="600">Application</text>
        <!-- "Key" badge -->
        <rect class="d-ep1-tag" x="430" y="180" width="48" height="22" rx="4"/>
        <text class="d-text-ep1-accent" x="454" y="195" text-anchor="middle" font-size="11" font-weight="600">Key</text>

        <text class="d-text-title" x="45" y="222" font-size="12">Lock / Unlock / User Mgmt / Battery / Identify</text>
        <text class="d-text-sub" x="45" y="242" font-size="12">This is the endpoint you work with most in daily development</text>
        <text class="d-text-sub" x="45" y="260" font-size="11">Contains DoorLock, PowerSource, Identify clusters, etc.</text>

        <!-- Dotted connector (indicating "more") -->
        <line class="d-tree-line" x1="260" y1="272" x2="260" y2="294" stroke-width="1.5" stroke-dasharray="4 4"/>

        <!-- Hint about more endpoints -->
        <text class="d-hint-text" x="260" y="312" text-anchor="middle" font-size="12">Some devices may have more endpoints (Endpoint 2, 3...)</text>
        <text class="d-hint-text" x="260" y="330" text-anchor="middle" font-size="11">e.g. a multi-sensor with separate functions on each endpoint</text>
      </g>
    </svg>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical tip</div>
    <p><strong>Endpoint 0 is required on every Matter device</strong> -- it holds the device's "ID card" and "system settings". In daily work, you mainly interact with Endpoint 1 (the application endpoint), where the door lock's lock/unlock and user management live.</p>
  </div>

  <!-- ====== Cluster ====== -->
  <h3 id="cluster">Cluster</h3>
  <p>
    Cluster is <strong>the most important concept</strong> in the Matter data model. A Cluster defines a set of related capabilities -- including what states it has (Attributes) and what operations it supports (Commands).
  </p>
  <p>
    Analogy: <strong>a system within a room</strong>. A room might have a lighting system, an HVAC system, and a door lock system. Each system manages one category of things, with its own state and controls. A Cluster is exactly such a functional system.
  </p>
  <p>
    Each Cluster has a <strong>standard ID</strong> (hexadecimal), assigned by the CSA:
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster ID</th>
          <th>Name</th>
          <th>What it does</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0101</code></td>
          <td><a href="../clusters/door-lock/">DoorLock</a></td>
          <td>Door lock system -- lock, unlock, manage users</td>
        </tr>
        <tr>
          <td><code>0x002F</code></td>
          <td><a href="../clusters/power-source/">PowerSource</a></td>
          <td>Power system -- battery level, charging status</td>
        </tr>
        <tr>
          <td><code>0x0006</code></td>
          <td><a href="../clusters/on-off/">OnOff</a></td>
          <td>Switch system -- on, off, toggle</td>
        </tr>
        <tr>
          <td><code>0x0028</code></td>
          <td><a href="../clusters/basic-information/">BasicInformation</a></td>
          <td>Nameplate info -- vendor, product name, firmware version</td>
        </tr>
        <tr>
          <td><code>0x001D</code></td>
          <td><a href="../clusters/descriptor/">Descriptor</a></td>
          <td>Directory -- lists which Clusters an endpoint has</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Door lock example</div>
    <p>A Matter door lock's Endpoint 1 typically has these Clusters:</p>
    <ul>
      <li><a href="../clusters/door-lock/"><strong>DoorLock (0x0101)</strong></a> -- core functionality: lock, unlock, manage users and credentials</li>
      <li><a href="../clusters/power-source/"><strong>PowerSource (0x002F)</strong></a> -- battery info: charge level, charging status</li>
      <li><a href="../clusters/identify/"><strong>Identify (0x0003)</strong></a> -- identification: makes the lock flash or beep so the user can locate it</li>
    </ul>
  </div>

  <!-- ====== Attribute & Command ====== -->
  <h3 id="attribute">Attribute</h3>
  <p>
    An Attribute is a piece of <strong>state information</strong> within a Cluster, and each Attribute also has an ID. Think of it as a reading on a device dashboard -- you can check it, and some can be adjusted.
  </p>
  <p>
    Some Attributes are read-only (e.g. the current lock state), while others are writable (e.g. setting the auto-relock time).
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Attribute ID</th>
          <th>Cluster</th>
          <th>Name</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0</code></td>
          <td>DoorLock</td>
          <td>LockState</td>
          <td>Current lock state (is it locked?)</td>
        </tr>
        <tr>
          <td><code>0x23</code></td>
          <td>DoorLock</td>
          <td>AutoRelockTime</td>
          <td>Auto-relock delay (how long before it auto-locks?)</td>
        </tr>
        <tr>
          <td><code>0xC</code></td>
          <td>PowerSource</td>
          <td>BatPercentRemaining</td>
          <td>Battery remaining (how much charge is left?)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="command">Command</h3>
  <p>
    A Command is an <strong>operation</strong> that a Cluster supports -- like a button on a remote control. Press it, and the device performs the corresponding action.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Command ID</th>
          <th>Cluster</th>
          <th>Name</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0</code></td>
          <td>DoorLock</td>
          <td>LockDoor</td>
          <td>Lock (press the "Lock" button)</td>
        </tr>
        <tr>
          <td><code>0x1</code></td>
          <td>DoorLock</td>
          <td>UnlockDoor</td>
          <td>Unlock (press the "Unlock" button)</td>
        </tr>
        <tr>
          <td><code>0x26</code></td>
          <td>DoorLock</td>
          <td>SetUser</td>
          <td>Add/modify a user (register a new tenant)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Full example ====== -->
  <h2 id="full-example">Full Example: A Door Lock's Matter Data Structure</h2>
  <p>Putting all the concepts together, a door lock's Matter data structure looks like this:</p>

  <pre><code>Node (Door Lock Device -- the entire building)
├── Endpoint 0 (Management Endpoint -- management office)
│   ├── BasicInformation (0x0028)    → Vendor name, product name, serial number
│   ├── Descriptor (0x001D)          → Lists which Clusters this endpoint has
│   └── NetworkCommissioning (0x0031)→ WiFi/Thread network configuration
│
└── Endpoint 1 (Application Endpoint -- tenant room)
    ├── DoorLock (0x0101)            → Door lock system
    │   ├── Attribute 0x0: LockState     = 0x01 (Locked)
    │   ├── Attribute 0x23: AutoRelockTime = 30 (auto-relock in 30s)
    │   ├── Command 0x0: LockDoor         → Lock
    │   └── Command 0x1: UnlockDoor       → Unlock
    │
    ├── PowerSource (0x002F)         → Power system
    │   ├── Attribute 0x0: Status        = 1 (Active)
    │   └── Attribute 0xC: BatPercent    = 180 (actual 90%)
    │
    └── Identify (0x0003)            → Identification system
        └── Command 0x0: Identify        → Flash/beep</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">How to read it</div>
    <p>When someone says "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 value is 0x01", in plain language that means: <strong>on the application endpoint, the door lock module's current lock state is "Locked"</strong>.</p>
  </div>

  <!-- ====== Other concepts ====== -->
  <h2 id="device-type">Device Type</h2>
  <p>
    A Device Type specifies <strong>which Clusters a device must support</strong>. It is like a certification checklist.
  </p>
  <p>
    For example, the "DoorLock" Device Type requires a device to implement at least the DoorLock Cluster, Identify Cluster, etc.
    "Dimmable Light" requires the OnOff Cluster and the LevelControl Cluster.
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/device-type-en.webp" alt="Device Type illustration: the Door Lock type must implement the DoorLock and Identify Clusters; the Dimmable Light type must implement the OnOff, LevelControl, Identify and Groups Clusters" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>The Cluster checklist required by two different Device Types</figcaption>
  </figure>
  <p>
    Analogy: just as a hotel must have a gym, pool, and 24-hour front desk to earn a five-star rating, a device must have the capabilities specified by Matter to claim a certain device type.
  </p>

  <p>
    Every device type has a number: Door Lock is <code>0x000A</code>, Dimmable Light is <code>0x0101</code>, and the Root Node that every device has is <code>0x0016</code>.
    A device declares its types in the <a href="../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a> of each endpoint, and one endpoint can declare several (e.g. "Door Lock + Power Source").
    See the full list in <a href="../tools/id-lookup/#device-types">Matter ID Lookup · Device Type IDs</a>.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">A device type only tells you the minimum</div>
    <p>
      Two locks can both declare Door Lock <code>0x000A</code> while one supports fingerprints and user management and the other only PIN codes. Both are compliant.
      The device type only fixes the mandatory part; optional capabilities are in each cluster's <code>FeatureMap</code>, <code>AttributeList</code> and <code>AcceptedCommandList</code>.
      See <a href="#device-discovery">Reading a device's capabilities after commissioning</a> below.
    </p>
  </div>

  <h2 id="fabric">Fabric</h2>
  <p>
    A Fabric is a <strong>trust domain</strong> in a Matter network. Devices within the same Fabric trust each other and can communicate and control one another directly.
  </p>
  <p>
    Analogy: <strong>a corporate intranet</strong>. When your laptop connects to the company VPN, it is inside a trust domain and can access internal services. People not on the VPN cannot.
  </p>
  <p>
    A device can join multiple Fabrics simultaneously. For example, a door lock can be controlled by both Apple Home and Google Home at the same time -- it has a separate identity in each Fabric.
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/fabric-en.webp" alt="Fabric illustration: one smart lock sits in both the Apple Home Fabric and the Google Home Fabric, holding a separate certificate in each" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>The same lock joins two Fabrics at once, with its own certificate in each</figcaption>
  </figure>

  <h2 id="commissioning">Commissioner and Commissioning</h2>
  <p>
    The process of adding a device to a Fabric is called <strong>Commissioning</strong>. The device that performs this operation is called the <strong>Commissioner</strong>.
  </p>
  <p>
    The commissioning flow in brief:
  </p>
  <ol>
    <li>The Commissioner (typically a phone app) scans the device's QR code or enters a setup code</li>
    <li>The device is discovered over Bluetooth LE (it is not on the network yet, so Bluetooth is the only way to reach it)</li>
    <li>A secure session is established via PASE (Passcode-Authenticated Session Establishment)</li>
    <li>The Commissioner assigns a certificate (NOC) to the device, officially adding it to the Fabric</li>
    <li>The Commissioner sends the Wi-Fi or Thread network credentials to the device so it can join the home network</li>
    <li>After commissioning, the phone app or smart speaker acts as a <strong>Controller</strong> and can read Attributes and send Commands to control the device</li>
  </ol>
  <figure class="diagram">
    <img src="/images/diagrams/commissioning-en.webp" alt="The six steps of Matter commissioning: scan the QR code, discover the device over Bluetooth LE, establish a PASE secure session, issue the NOC certificate and join the Fabric, configure the Wi-Fi/Thread network, done and the Controller takes over" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>Six commissioning steps: trust is established over Bluetooth and the setup code first, then the device is brought onto the home network</figcaption>
  </figure>

  <div class="callout callout-info">
    <div class="callout-title">Role clarification</div>
    <p>The <strong>Commissioner</strong> is the role during commissioning (responsible for bringing the device in), while the <strong>Controller</strong> is the role for everyday control. A phone app typically plays both roles.</p>
  </div>

  <!-- ====== Device capability discovery ====== -->
  <h2 id="device-discovery">After commissioning: what is this device and what can it do?</h2>
  <p>
    Commissioning only brings the device onto the network. Next the app needs to answer two questions: <strong>what device is this, and which features does it support?</strong>
    Matter has no separate "device manual" file. The answers live in a few <strong>standard fields</strong> that every device must provide and any Controller can read.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>To find out</th>
          <th>Read this field</th>
          <th>Where (cluster / attribute)</th>
          <th>Door lock example</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Which endpoints exist</td><td><a href="../clusters/descriptor/#attr-0x03">Descriptor.PartsList</a></td><td>Endpoint 0 · <code>0x001D</code> / <code>0x0003</code></td><td><code>[1]</code></td></tr>
        <tr><td>What each endpoint is</td><td><a href="../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a></td><td>Every endpoint · <code>0x001D</code> / <code>0x0000</code></td><td><code>0x000A</code> Door Lock + <code>0x0011</code> Power Source</td></tr>
        <tr><td>Which clusters each endpoint has</td><td><a href="../clusters/descriptor/#attr-0x01">Descriptor.ServerList</a></td><td>Every endpoint · <code>0x001D</code> / <code>0x0001</code></td><td><code>0x0003</code> <code>0x001D</code> <code>0x002F</code> <code>0x0101</code></td></tr>
        <tr><td>Which optional features a cluster enables</td><td>FeatureMap (global attribute)</td><td>Every cluster · <code>0xFFFC</code></td><td><code>389</code> = PIN + fingerprint + remote PIN + users</td></tr>
        <tr><td>Which commands it accepts</td><td>AcceptedCommandList (global attribute)</td><td>Every cluster · <code>0xFFF9</code></td><td>LockDoor, UnlockDoor, SetUser…</td></tr>
        <tr><td>Which attributes it implements</td><td>AttributeList (global attribute)</td><td>Every cluster · <code>0xFFFB</code></td><td>LockState, AutoRelockTime…</td></tr>
        <tr><td>Vendor, model, versions, serial</td><td><a href="../clusters/basic-information/">BasicInformation</a></td><td>Endpoint 0 · <code>0x0028</code></td><td>VendorName, ProductName, SoftwareVersionString</td></tr>
      </tbody>
    </table>
  </div>

  <p>The standard reading order for a Controller:</p>
  <ol>
    <li>Read PartsList on <strong>endpoint 0</strong> to get every endpoint number</li>
    <li>Read <strong>DeviceTypeList</strong> on each endpoint to learn what it is</li>
    <li>Read <strong>ServerList</strong> on each endpoint to learn which clusters it has</li>
    <li>Read <strong>FeatureMap / AcceptedCommandList / AttributeList</strong> on each cluster to learn exactly what it can do</li>
    <li>Read BasicInformation on <strong>endpoint 0</strong> for vendor, model and firmware version</li>
  </ol>

  <h3 id="raw-capabilities">Can I get the device's raw capability set?</h3>
  <p>
    Yes. Matter supports a <strong>wildcard read</strong>: set endpoint, cluster and attribute all to "any" and every attribute on the device comes back in one go, including all the fields above.
    This is the most complete, unprocessed description of a device. Whatever device info an app shows is interpreted from it.
  </p>
  <ul>
    <li><strong>chip-tool</strong> (the official CLI): <code>chip-tool any read-by-id 0xFFFFFFFF 0xFFFFFFFF &lt;node-id&gt; 0xFFFF</code>. The three wildcards mean all clusters, all attributes, all endpoints</li>
    <li><strong>A single field</strong>: <code>chip-tool descriptor read device-type-list &lt;node-id&gt; 1</code> reads the device types of endpoint 1</li>
    <li><strong>Platform SDKs</strong>: Android, iOS and Web all have equivalents, see <a href="../sdk/android/#device-discovery">SDK Guides · Reading device types and capabilities</a></li>
    <li><strong>Home Assistant</strong>: device page → Download diagnostics. Its <code>attributes</code> object is the wildcard read result, keyed as <code>endpoint/cluster/attribute</code> (decimal)</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-title">Try it</div>
    <p>
      Open the <a href="../tools/json-parser/">JSON Parser</a>, pick the "Raw device data" sample and click Parse. It turns a door lock's wildcard read into a device profile
      and labels every item with the field it came from. For any unfamiliar ID, use the <a href="../tools/id-lookup/">Matter ID Lookup</a>.
    </p>
  </div>

  <!-- ====== ID conventions ====== -->
  <h2 id="id-conventions">ID Numbering Conventions</h2>
  <p>
    Nearly everything in Matter is identified by a <strong>hexadecimal ID</strong>. Knowing the ID ranges helps you quickly determine what an ID represents.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">A Cluster ID is actually 4 bytes</div>
    <p>
      In the specification, cluster, attribute, command, event and device type IDs are all <strong>32-bit</strong>: the upper 16 bits are a <strong>vendor prefix</strong> and the lower 16 bits are the <strong>number</strong>.
      Standard definitions all use the prefix <code>0x0000</code>, which is normally omitted. So the Door Lock cluster is <code>0x0000_0101</code> in full and <code>0x0101</code> for short.
      A vendor's private extension must carry its vendor ID, e.g. <code>0x1234_FC00</code>.
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Number range (lower 16 bits)</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standard Cluster</td>
          <td><code>0x0000</code> ~ <code>0x7FFF</code></td>
          <td>Defined by CSA; the prefix is always <code>0x0000</code></td>
        </tr>
        <tr>
          <td>Vendor-specific Cluster</td>
          <td><code>0xFC00</code> ~ <code>0xFFFE</code></td>
          <td>The prefix must be the vendor ID, e.g. <code>0x1234_FC00</code></td>
        </tr>
        <tr>
          <td>Standard Attribute</td>
          <td><code>0x0000</code> ~ <code>0x4FFF</code></td>
          <td>Standard attributes within a Cluster</td>
        </tr>
        <tr>
          <td>Global Attribute</td>
          <td><code>0xF000</code> ~ <code>0xFFFE</code></td>
          <td>Present in every cluster: FeatureMap <code>0xFFFC</code>, AttributeList <code>0xFFFB</code>, AcceptedCommandList <code>0xFFF9</code>, ClusterRevision <code>0xFFFD</code>, etc.</td>
        </tr>
        <tr>
          <td>Standard Command</td>
          <td><code>0x00</code> ~ <code>0xFF</code></td>
          <td>Standard commands within a Cluster</td>
        </tr>
        <tr>
          <td>Standard Device Type</td>
          <td><code>0x0000</code> ~ <code>0xBFFF</code></td>
          <td>Device types, e.g. <code>0x000A</code> Door Lock, <code>0x0016</code> Root Node</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    Found an ID you don't recognise? Look it up in the <a href="../tools/id-lookup/">Matter ID Lookup</a>. Hex and decimal both work.
    Note that the same number means different things in different fields: <code>0x0101</code> is Door Lock as a cluster but Dimmable Light as a device type.
  </p>

  <h3 id="common-cluster-ids">Common Cluster ID Quick Reference</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cluster</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>0x001D</code></td><td><a href="../clusters/descriptor/">Descriptor</a></td><td>Describes the list of Clusters on an endpoint</td></tr>
        <tr><td><code>0x0028</code></td><td><a href="../clusters/basic-information/">BasicInformation</a></td><td>Device basic info (vendor, product name, firmware version)</td></tr>
        <tr><td><code>0x002F</code></td><td><a href="../clusters/power-source/">PowerSource</a></td><td>Power / battery status</td></tr>
        <tr><td><code>0x0031</code></td><td><a href="../clusters/network-commissioning/">NetworkCommissioning</a></td><td>Network configuration (WiFi/Thread)</td></tr>
        <tr><td><code>0x0003</code></td><td><a href="../clusters/identify/">Identify</a></td><td>Device identification (flash/beep)</td></tr>
        <tr><td><code>0x0006</code></td><td><a href="../clusters/on-off/">OnOff</a></td><td>On/off control</td></tr>
        <tr><td><code>0x0008</code></td><td><a href="../clusters/level-control/">LevelControl</a></td><td>Brightness / level control</td></tr>
        <tr><td><code>0x0101</code></td><td><a href="../clusters/door-lock/">DoorLock</a></td><td>Door lock control</td></tr>
        <tr><td><code>0x0300</code></td><td><a href="../clusters/color-control/">ColorControl</a></td><td>Color control (color temperature, HSV)</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Where to find the standard definitions</div>
    <p>The complete Matter specification is published by the CSA; members can download it at <strong>csa-iot.org</strong>. The open-source implementation is in the <a href="https://github.com/project-chip/connectedhomeip">connectedhomeip</a> repository, where <code>src/app/zap-templates/zcl/data-model/chip/*.xml</code> contains all standard Cluster definitions.</p>
  </div>
`,
} as const;
