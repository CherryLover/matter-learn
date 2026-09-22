import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'identify': {
    title: 'Identify Cluster (0x0003)',
    description: 'Complete reference for Matter Identify Cluster (0x0003) — IdentifyTime / IdentifyType attributes, Identify / TriggerEffect commands, EffectIdentifier enum quick reference. The foundational Cluster for locating devices.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>Identify Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0003</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint); also commonly found on <code>Endpoint 0</code> (Root)
  </p>
  <p>
    Identify triggers a visual or audible indicator on the device (flashing light, beeping, screen blinking, etc.) to help users locate a specific device among many.
    This Cluster is very small — only <strong>2 attributes</strong> and <strong>2 commands</strong> — but nearly every Matter device is required to support it.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      After commissioning, not sure which light was just added? Send an Identify command to make it flash for a few seconds.
      During debugging, need to confirm whether the app is connected to the right device? Use TriggerEffect to get clear feedback from the device.
      This is the simplest way to answer "where is this device?"
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Identify has only two attributes, both mandatory. Click an attribute ID to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>IdentifyTime</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Remaining identify time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>IdentifyType</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>The identify method supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">IdentifyTime (Remaining Identify Time)</h3>
  <p>
    The remaining seconds of the current identify effect. Writing a non-zero value immediately starts identification; the device counts down by one each second until it reaches <code>0</code> and stops.
    Writing <code>0</code> immediately stops any ongoing identification.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Writing the Attribute vs Sending a Command</div>
    <p>
      Writing <code>IdentifyTime = 10</code> directly and sending the <code>Identify(IdentifyTime: 10)</code> command produce the same result.
      The command approach is more common because it is semantically clearer, and some SDKs provide better wrappers for commands.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">IdentifyType (Identify Method)</h3>
  <p>
    A read-only attribute that describes which method the device uses for identification. Different devices have different hardware capabilities — a light bulb flashes its light, a door lock may beep, and a device with a screen may blink its display.
  </p>

  <h4>IdentifyTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">No identification capability</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LightOutput</span>
        <span class="enum-desc">Identify via light output (flashing, color change)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">VisibleIndicator</span>
        <span class="enum-desc">Identify via a visible indicator (LED indicator light)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">AudibleBeep</span>
        <span class="enum-desc">Identify via audible sound (buzzer)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Display</span>
        <span class="enum-desc">Identify via display (blinking screen)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Actuator</span>
        <span class="enum-desc">Identify via actuator (e.g., motor vibration)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The Identify Cluster has two commands, both sent from Client to Server (i.e., from the app to the device).
    No Timed Interaction is required and there are no access restrictions — they can be sent directly.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Identify</td>
          <td>Start identification; the device flashes for the specified number of seconds</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>TriggerEffect</td>
          <td>Trigger a specific identify effect</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Identify — Start Identification (0x00)</h3>
  <p>
    Tells the device to begin identification for the specified number of seconds. The device chooses the identify method based on its <code>IdentifyType</code> capability (flashing light, beeping, etc.).
    After receiving the command, the <code>IdentifyTime</code> attribute is set to the provided value and counts down to 0 each second.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>IdentifyTime</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>Identify duration in seconds. Pass <code>0</code> to stop immediately</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0003",
      "commandId": "0x00"       // Identify
    },
    "commandFields": {
      "0": 10                   // IdentifyTime = 10 seconds
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x40">TriggerEffect — Trigger Effect (0x40)</h3>
  <p>
    Triggers a predefined identify effect. Unlike the Identify command, TriggerEffect specifies an <strong>effect type</strong> rather than a duration —
    each effect has its own fixed duration and behavior.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EffectIdentifier</td>
          <td>enum8</td>
          <td>Yes</td>
          <td>The effect type to trigger (see enum values below)</td>
        </tr>
        <tr>
          <td>EffectVariant</td>
          <td>enum8</td>
          <td>Yes</td>
          <td>Effect variant; currently only <code>0 = Default</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>EffectIdentifierEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Blink</span>
        <span class="enum-desc">A single quick blink (~0.5 seconds)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">Breathe</span>
        <span class="enum-desc">Breathe effect (~15 seconds of gradual brightening and dimming)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">Okay</span>
        <span class="enum-desc">Acknowledgment feedback (two flashes meaning "received")</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0B</span>
      <div>
        <span class="enum-name">ChannelChange</span>
        <span class="enum-desc">Channel change effect (~8 seconds of color/brightness variation)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFE</span>
      <div>
        <span class="enum-name">FinishEffect</span>
        <span class="enum-desc">Gracefully finish the currently playing effect</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFF</span>
      <div>
        <span class="enum-name">StopEffect</span>
        <span class="enum-desc">Immediately stop the current effect</span>
      </div>
    </div>
  </div>

  <h4>EffectVariantEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Default</span>
        <span class="enum-desc">Default variant (currently the only option)</span>
      </div>
    </div>
  </div>

  <p>Request example (trigger a breathe effect):</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0003",
      "commandId": "0x40"       // TriggerEffect
    },
    "commandFields": {
      "0": 1,                   // EffectIdentifier = Breathe
      "1": 0                    // EffectVariant = Default
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the Identify Cluster attributes of a light bulb device:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": 0,         // IdentifyTime = 0 (not currently identifying)
  "0x1": 2          // IdentifyType = VisibleIndicator (LED indicator light)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      A typical "locate device" feature in an app is implemented like this:
    </p>
    <ol>
      <li>The user taps the "Locate Device" button</li>
      <li>The app sends an <code>Identify</code> command with <code>IdentifyTime = 15</code> (flash for 15 seconds)</li>
      <li>The app displays a 15-second countdown in sync</li>
      <li>Once the user locates the device, they can send <code>Identify(IdentifyTime: 0)</code> to stop early</li>
    </ol>
    <p>
      For finer effect control (e.g., a single flash to confirm connection), <code>TriggerEffect(Blink, Default)</code> is more appropriate than Identify.
    </p>
  </div>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
  },
  'descriptor': {
    title: 'Descriptor Cluster (0x001D)',
    description: 'Complete reference for Matter Descriptor Cluster (0x001D) — DeviceTypeList, ServerList, ClientList, PartsList, TagList attribute definitions, the special role of Endpoint 0, and endpoint discovery mechanism.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>Descriptor Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001D</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <strong>Every Endpoint must have it</strong> (including Endpoint 0)
  </p>
  <p>
    Descriptor is the most fundamental Cluster in the Matter protocol. It answers one core question: <strong>What is on this Endpoint?</strong>
    When a Controller (phone, smart speaker, hub) connects to a Matter device, the first thing it does is read the Descriptor on each Endpoint
    to learn which Device Types the device supports, which Clusters are implemented, and the hierarchical relationship between Endpoints.
  </p>
  <p>
    This Cluster is <strong>entirely read-only</strong> — it has no Commands, only Attributes. The information is determined at manufacturing time and does not change at runtime.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Mandatory: Every Endpoint Must Implement Descriptor</div>
    <p>
      The Descriptor Cluster is a <strong>mandatory requirement</strong> in the Matter specification.
      Whether it is Endpoint 0 (Root Node) or an application Endpoint (Endpoint 1, 2, 3...), every Endpoint must include the Descriptor Cluster.
      If your device is missing it, it will not pass Matter certification, and Controllers will be unable to correctly identify the device's capabilities.
    </p>
  </div>

  <!-- ====== Core Concept ====== -->
  <h2 id="concept">What Problem Does Descriptor Solve</h2>
  <p>
    The data model of a Matter device is a tree structure: a Node (physical device) contains multiple Endpoints, and each Endpoint represents a functional unit.
    However, when a Controller connects to a device, it does not know what this tree looks like. Descriptor is the <strong>self-describing mechanism</strong> of this tree:
  </p>
  <ul>
    <li><strong>DeviceTypeList</strong> — Tells the Controller "what I am" (door lock? light? switch?)</li>
    <li><strong>ServerList / ClientList</strong> — Tells the Controller "what I can do" (which Clusters are supported)</li>
    <li><strong>PartsList</strong> — Tells the Controller "what is under me" (list of child Endpoints)</li>
  </ul>

  <div class="callout callout-info">
    <div class="callout-title">The Special Role of Endpoint 0</div>
    <p>
      Endpoint 0 is the <strong>Root Node</strong>, and its Descriptor has special significance:
    </p>
    <ul>
      <li>Its <code>PartsList</code> enumerates <strong>all other Endpoint numbers on the device</strong> and serves as the entry point for device discovery</li>
      <li>The standard Controller flow is: first read Endpoint 0's PartsList to get all Endpoint numbers, then read each Endpoint's Descriptor individually</li>
      <li>The Root Node's DeviceType is <code>0x0016</code> (Root Node Device Type)</li>
    </ul>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Descriptor has only 5 attributes, but each one is essential. Click an attribute ID to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x0000</code></a></td>
          <td>DeviceTypeList</td>
          <td>list&lt;DeviceTypeStruct&gt;</td>
          <td>Yes</td>
          <td>List of Device Types supported by the Endpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x0001</code></a></td>
          <td>ServerList</td>
          <td>list&lt;cluster_id&gt;</td>
          <td>Yes</td>
          <td>List of Server Clusters implemented by the Endpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x0002</code></a></td>
          <td>ClientList</td>
          <td>list&lt;cluster_id&gt;</td>
          <td>Yes</td>
          <td>List of Client Clusters implemented by the Endpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x0003</code></a></td>
          <td>PartsList</td>
          <td>list&lt;endpoint_id&gt;</td>
          <td>Yes</td>
          <td>List of child Endpoint numbers</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x0004</code></a></td>
          <td>TagList</td>
          <td>list&lt;SemanticTagStruct&gt;</td>
          <td>No</td>
          <td>Semantic tag list (used to distinguish similar Endpoints)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attribute-details">Attributes</h2>

  <!-- DeviceTypeList -->
  <h3 id="attr-0x00">DeviceTypeList (0x0000)</h3>
  <p>
    Lists all Device Types supported by this Endpoint. Each entry is a <code>DeviceTypeStruct</code> containing the Device Type ID and revision number.
    Most Endpoints have only one Device Type, but the specification allows an Endpoint to declare multiple.
  </p>

  <h4>DeviceTypeStruct Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DeviceType</td>
          <td>devtype_id (uint32)</td>
          <td>Device Type ID, e.g. <code>0x000A</code> = Door Lock, <code>0x0100</code> = On/Off Light</td>
        </tr>
        <tr>
          <td>Revision</td>
          <td>uint16</td>
          <td>The revision number of this Device Type definition, used to distinguish differences between specification versions</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Device Type IDs</div>
    <p>
      <code>0x0016</code> Root Node &nbsp;|&nbsp;
      <code>0x000A</code> Door Lock &nbsp;|&nbsp;
      <code>0x0100</code> On/Off Light &nbsp;|&nbsp;
      <code>0x010D</code> Extended Color Light &nbsp;|&nbsp;
      <code>0x000E</code> Aggregator (Bridge) &nbsp;|&nbsp;
      <code>0x0107</code> Dimmable Light
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ServerList -->
  <h3 id="attr-0x01">ServerList (0x0001)</h3>
  <p>
    Lists all Cluster IDs that this Endpoint implements as a <strong>Server</strong>.
    A Server is the side that holds data and responds to read/write requests.
    For example, the ServerList of a door lock's Endpoint 1 would include <code>0x0101</code> (DoorLock),
    because the lock's state (locked/unlocked, user list, etc.) is stored on the device.
  </p>
  <p>
    By reading the ServerList, a Controller knows which Clusters it can send read/write/command requests to on this Endpoint.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ClientList -->
  <h3 id="attr-0x02">ClientList (0x0002)</h3>
  <p>
    Lists all Cluster IDs that this Endpoint implements as a <strong>Client</strong>.
    A Client is the side that initiates requests — most end devices (lights, locks, sensors) have an empty ClientList
    because they are only controlled and do not actively control other devices.
  </p>
  <p>
    A typical scenario where ClientList is non-empty: <strong>a physical switch</strong>.
    A wall switch declares <code>0x0006</code> (OnOff Client) in its ClientList,
    indicating that it will actively send on/off commands to lights.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- PartsList -->
  <h3 id="attr-0x03">PartsList (0x0003)</h3>
  <p>
    Lists the <strong>child Endpoint numbers</strong> of this Endpoint. This attribute defines the hierarchical relationship between Endpoints.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Two Usages of PartsList</div>
    <p><strong>On Endpoint 0 (Root Node):</strong></p>
    <ul>
      <li>PartsList is a <strong>flat list</strong> containing the numbers of <strong>all other Endpoints</strong> on the Node</li>
      <li>This is the sole entry point for a Controller to discover all application Endpoints on the device</li>
      <li>Example: <code>[1, 2, 3]</code> means the device has 3 additional application Endpoints</li>
    </ul>
    <p><strong>On application Endpoints (Endpoint 1, 2, 3...):</strong></p>
    <ul>
      <li>In most cases it is an <strong>empty list</strong> (leaf Endpoint with no children)</li>
      <li>Only Bridge / Aggregator device Endpoints have a non-empty PartsList, pointing to their bridged child device Endpoints</li>
    </ul>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- TagList -->
  <h3 id="attr-0x04">TagList (0x0004) — Optional</h3>
  <p>
    Attaches <strong>semantic tags</strong> to the Endpoint, used to distinguish Endpoints that have the same function but different locations or purposes.
    For example, a device with two temperature sensor Endpoints can use TagList to label one as "Indoor" and the other as "Outdoor".
  </p>
  <p>
    TagList requires the device to declare the <code>TAGLIST</code> Feature (Feature Bit 0) in order to be present.
  </p>

  <h4>SemanticTagStruct Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MfgCode</td>
          <td>vendor_id (nullable)</td>
          <td>Vendor code. <code>null</code> means a standard-defined tag; non-null indicates a vendor-specific custom tag</td>
        </tr>
        <tr>
          <td>NamespaceID</td>
          <td>uint8</td>
          <td>Tag namespace ID, defining the tag classification system</td>
        </tr>
        <tr>
          <td>Tag</td>
          <td>uint8</td>
          <td>Tag value, with specific meaning within the corresponding namespace</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>string (nullable)</td>
          <td>Optional human-readable tag text, e.g. <code>"Indoor"</code>, <code>"Left"</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Device Discovery Flow ====== -->
  <h2 id="discovery-flow">How Controllers Use Descriptor to Discover Devices</h2>
  <p>After connecting to a Matter device, the Controller follows this standard Endpoint discovery flow:</p>
  <ol>
    <li><strong>Read Endpoint 0's PartsList</strong> — Get all application Endpoint numbers, e.g. <code>[1, 2, 3]</code></li>
    <li><strong>Iterate over each Endpoint and read DeviceTypeList</strong> — Learn that Endpoint 1 is a door lock, Endpoint 2 is a temperature sensor, etc.</li>
    <li><strong>Read ServerList</strong> — Learn which specific Clusters each Endpoint supports (what operations are available)</li>
    <li><strong>Build the UI based on this information</strong> — Show an unlock button for the door lock Endpoint, display a temperature reading for the sensor Endpoint</li>
  </ol>

  <div class="callout callout-tip">
    <div class="callout-title">The Wildcard Read Alternative</div>
    <p>
      In practice, Controllers typically do not read attributes one by one. Instead, they use a <strong>Wildcard Read</strong>
      to fetch the Descriptor Cluster from all Endpoints in a single request, which is much more efficient.
      However, understanding the step-by-step flow above helps clarify the role of each Descriptor attribute.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Scenario 1: Standard Device (Door Lock)</h3>
  <p>Descriptor of Endpoint 0 (Root Node):</p>
  <pre><code>{
  // Descriptor of Endpoint 0 (Root Node)
  "DeviceTypeList": [
    { "DeviceType": "0x0016", "Revision": 2 }   // Root Node
  ],
  "ServerList": [
    "0x001D",   // Descriptor
    "0x0028",   // BasicInformation
    "0x002F",   // PowerSource
    "0x0030",   // GeneralCommissioning
    "0x0031",   // NetworkCommissioning
    "0x003E",   // OperationalCredentials
    "0x0033"    // GeneralDiagnostics
  ],
  "ClientList": [],
  "PartsList": [ 1, 2, 3 ]   // This Node also has Endpoints 1, 2, 3
}</code></pre>

  <p>Descriptor of Endpoint 1 (door lock application Endpoint):</p>
  <pre><code>{
  // Descriptor of Endpoint 1 (application Endpoint, e.g. a door lock)
  "DeviceTypeList": [
    { "DeviceType": "0x000A", "Revision": 3 }   // DoorLock
  ],
  "ServerList": [
    "0x001D",   // Descriptor (itself)
    "0x0003",   // Identify
    "0x0101",   // DoorLock
    "0x002F"    // PowerSource
  ],
  "ClientList": [],
  "PartsList": []   // Leaf Endpoint, no children
}</code></pre>

  <h3>Scenario 2: Bridge Device</h3>
  <p>The PartsList of a Bridge (gateway/aggregator) device's Endpoint 0 lists all bridged child devices:</p>
  <pre><code>{
  // Descriptor of Endpoint 0 (Bridge device)
  "DeviceTypeList": [
    { "DeviceType": "0x000E", "Revision": 2 }   // Aggregator (Bridge)
  ],
  "ServerList": [ "0x001D", "0x0028", "0x0039" ],
  "PartsList": [ 1, 2, 3, 4, 5 ]   // Bridging 5 child devices

  // Each child Endpoint (1-5) has its own independent Descriptor,
  // describing its own DeviceType and Cluster lists
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">Developer Tip</div>
    <p>
      When debugging, if a Controller fails to recognize a device's functionality, check the Descriptor first:
    </p>
    <ul>
      <li>Does Endpoint 0's PartsList include the application Endpoint in question?</li>
      <li>Is the application Endpoint's DeviceTypeList correct?</li>
      <li>Does the application Endpoint's ServerList include the required Clusters?</li>
    </ul>
  </div>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
  },
  'groups': {
    title: 'Groups Cluster (0x0004)',
    description: 'Complete reference for Matter Groups Cluster (0x0004) — AddGroup / ViewGroup / RemoveGroup / GetGroupMembership / AddGroupIfIdentifying commands, NameSupport attribute, Feature Map (GN), multicast messaging mechanism, and common scenario quick reference.',
    prev: { title: 'Identify', slug: 'identify' },
    next: undefined,
    content: `<h1>Groups Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0004</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    The Groups Cluster manages group membership for devices and is the foundation of Matter multicast messaging.
    By adding multiple devices to the same Group, commands sent to that Group ID are received by all member devices simultaneously --
    for example, "turn off all living room lights at once" is a typical multicast scenario.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Multicast vs. Unicast</div>
    <p>
      Without Groups, controlling 5 lights requires sending 5 individual unicast commands, and latency increases linearly with the number of devices.
      With Groups, only 1 multicast command is needed, and all members respond almost simultaneously.
      This is also where the combination of Groups and Scenes delivers the most value --
      a single multicast command can make different devices each execute their preset actions (lights to warm tone, curtains half open, AC to 26 degrees).
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The Groups Cluster has 6 commands for managing device group membership.
    AddGroup, RemoveGroup, and RemoveAllGroups are write operations; ViewGroup and GetGroupMembership are query operations;
    AddGroupIfIdentifying is a conditional write command (the device must be in Identify mode for it to take effect).
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AddGroup</td>
          <td>Request / Response</td>
          <td>Add the device to a specified group</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ViewGroup</td>
          <td>Request / Response</td>
          <td>Query the name of a specified group</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>GetGroupMembership</td>
          <td>Request / Response</td>
          <td>Query the list of groups the device belongs to</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RemoveGroup</td>
          <td>Request / Response</td>
          <td>Remove the device from a specified group</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>RemoveAllGroups</td>
          <td>Request only</td>
          <td>Remove the device from all groups</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>AddGroupIfIdentifying</td>
          <td>Request only</td>
          <td>Add to group only when in Identify mode</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">AddGroup -- Add to Group (0x00)</h3>
  <p>
    Adds the current device (Endpoint) to a specified Group. If the device is already a member of that group, the command still succeeds (idempotent),
    but will update the group name (if the device supports the GN feature).
    Returns an <code>AddGroupResponse</code> containing the operation status and GroupID.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Yes</td>
          <td>Target Group ID, range <code>0x0001</code> ~ <code>0xFEFF</code></td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>Yes</td>
          <td>Group name (max 16 bytes). Pass an empty string if the device does not support the GN feature</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AddGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS, <code>0x89</code> = RESOURCE_EXHAUSTED (group table is full)</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>The GroupID from the request, echoed back</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x00"       // AddGroup
    },
    "commandFields": {
      "0": 1,                   // GroupID = 0x0001
      "1": "Living Room Lights" // GroupName
    }
  }]
}</code></pre>
  <p>Response example:</p>
  <pre><code>{
  "invokeResponseValue": {
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x00"       // AddGroupResponse
    },
    "commandFields": {
      "0": 0,                   // Status = SUCCESS
      "1": 1                    // GroupID = 0x0001
    }
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After the user creates a "Living Room" room in the app, the app automatically assigns a GroupID to that room,
        then sends an AddGroup command to each device in the room to add them all to the same group.
        When the user taps "Turn off all lights," the app only needs to send one multicast Off command to that GroupID.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ViewGroup -- View Group (0x01)</h3>
  <p>
    Queries whether the device belongs to a specified Group, and if so, returns the group's name.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Yes</td>
          <td>The Group ID to query</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ViewGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS (device belongs to the group), <code>0x8B</code> = NOT_FOUND (not a member)</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>The GroupID from the request, echoed back</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>Group name. Only valid when Status = SUCCESS; returns an empty string if the GN feature is not supported</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After the app restores room configurations from the cloud, it sends ViewGroup to each device to confirm whether the group membership is still intact --
        if a device lost its group information due to a factory reset, the app needs to re-send AddGroup.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">GetGroupMembership -- Query Group Membership (0x02)</h3>
  <p>
    Queries which groups a device belongs to in bulk. You can pass a list of GroupIDs for a filtered query, or pass an empty list to retrieve all groups the device belongs to.
    The response also includes a <code>Capacity</code> field that indicates how many more groups the device can join.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupList</td>
          <td>list[group-id]</td>
          <td>Yes</td>
          <td>List of Group IDs to query. Pass an empty list <code>[]</code> to query all groups the device belongs to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>GetGroupMembershipResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Capacity</td>
          <td>uint8 / null</td>
          <td>Number of additional groups the device can join. <code>null</code> means unknown</td>
        </tr>
        <tr>
          <td>GroupList</td>
          <td>list[group-id]</td>
          <td>List of Group IDs the device actually belongs to (the intersection of the request list and actual membership; returns all when the request list is empty)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>Request example (query whether the device belongs to groups 1, 2, 3):</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x02"       // GetGroupMembership
    },
    "commandFields": {
      "0": [1, 2, 3]            // GroupList -- query if device belongs to these three groups
    }
  }]
}</code></pre>
  <p>Response example (device belongs to groups 1 and 3, can join 5 more groups):</p>
  <pre><code>{
  "invokeResponseValue": {
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x02"       // GetGroupMembershipResponse
    },
    "commandFields": {
      "0": 5,                   // Capacity = 5 (can join 5 more groups)
      "1": [1, 3]               // GroupList -- device belongs to groups 1 and 3
    }
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        At app startup, the device's group membership needs to be synchronized: pass an empty GroupList to retrieve all groups the device belongs to,
        then compare with the room configuration stored in the cloud to handle any added or lost group memberships.
        The Capacity field can be used to determine whether the device has room to join additional groups.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">RemoveGroup -- Remove from Group (0x03)</h3>
  <p>
    Removes the device from a specified Group. If the device is not a member of that group, returns NOT_FOUND.
    After removing the group membership, the device will no longer respond to multicast commands for that group.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Yes</td>
          <td>The Group ID to remove the device from</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS, <code>0x8B</code> = NOT_FOUND</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>The GroupID from the request, echoed back</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Associated Scenes Are Deleted</div>
    <p>
      When removing a group, all Scenes bound to that group are also automatically deleted.
      If you only want to temporarily stop the device from responding to multicast while keeping the Scene configuration,
      there is currently no "pause group membership" mechanism -- you can only remove and re-add.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user moves a light from the "Living Room" to the "Bedroom":
        The app first sends RemoveGroup (Living Room GroupID) to the light, then sends AddGroup (Bedroom GroupID).
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">RemoveAllGroups -- Remove from All Groups (0x04)</h3>
  <p>
    Removes the device from all joined groups, effectively clearing the group table. Takes no parameters and has no response.
    Also deletes all associated Scenes.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Use with Caution</div>
    <p>
      This command clears all group memberships and all Scenes from the device at once, and cannot be undone.
      Typically used only during factory reset, device handover, or re-commissioning.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        During the factory reset process, the app sends RemoveAllGroups before Remove Fabric
        to ensure no multicast configuration remains on the device.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">AddGroupIfIdentifying -- Add to Group If Identifying (0x05)</h3>
  <p>
    Functions the same as AddGroup, but with an added precondition: the device must currently be in <strong>Identify mode</strong>
    (i.e., the Identify Cluster's <code>IdentifyTime &gt; 0</code>) for the command to execute.
    If the device is not in Identify mode, the command is silently ignored. There is no response.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Yes</td>
          <td>Target Group ID</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>Yes</td>
          <td>Group name (max 16 bytes)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Why This Command Exists</div>
    <p>
      During commissioning, devices are typically put into Identify mode first (the user confirms "this is the right device"),
      then AddGroupIfIdentifying is sent via multicast in bulk --
      only the device that is currently flashing/beeping will join the group, while other devices are unaffected.
      This avoids the complex process of obtaining each device's address individually to send unicast AddGroup commands.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Bulk configuration of newly installed light fixtures: the installer triggers Identify on each light one by one (via physical button or scanning a code),
        then sends the same AddGroupIfIdentifying multicast command in bulk.
        Each light that is flashing when it receives the command automatically joins the specified group; lights not flashing ignore the command.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The Groups Cluster has only one application attribute. Click the attribute ID to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NameSupport</td>
          <td>bitmap8</td>
          <td>Read-only</td>
          <td>Whether the device supports storing group names</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x0000">NameSupport (Name Support)</h3>
  <p>
    An 8-bit bitmap indicating whether the device supports storing group names. Currently only Bit 7 (the most significant bit) is used.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>NameSupport</td>
          <td>bitmap8</td>
          <td>Bit 7 (<code>0x80</code>): GroupNames -- when <code>1</code>, the device can store group names. When <code>0</code>, the GroupName in AddGroup is ignored, and the GroupName in ViewGroup responses is always an empty string</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NameSupport Bitmap</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">GroupNames</span>
        <span class="enum-desc">Supports storing group names (corresponds to GN Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 0~6</span>
      <div>
        <span class="enum-name">Reserved</span>
        <span class="enum-desc">Reserved bits, always 0</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between NameSupport and FeatureMap</div>
    <p>
      Bit 7 of <code>NameSupport</code> and Bit 0 (GN) of <code>FeatureMap</code> are linked:
      if FeatureMap declares GN, then Bit 7 of NameSupport must also be 1.
      The two should remain consistent when read.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The Groups Cluster declares optional capabilities supported by the device through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">GN (GroupNames)</span>
        <span class="enum-desc">Supports storing group names -- when enabled, the GroupName in AddGroup is saved, and ViewGroup can retrieve the name</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Most Devices Support GN</div>
    <p>
      Storing group names consumes very few resources (max 16 bytes per group), and the vast majority of Matter devices enable the GN feature.
      Devices that do not support GN are typically extremely resource-constrained sensor products.
      The app should check FeatureMap first and not display the group name editing UI when GN is not supported.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the Groups Cluster attributes of a device that supports the GN feature:</p>

  <pre><code>{
  // --- Attributes ---
  "0x0000": 128          // NameSupport -- Bit 7 = 1, supports group names
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">GroupID Range</div>
    <p>
      The valid GroupID range is <code>0x0001</code> ~ <code>0xFEFF</code>.
      <code>0x0000</code> is invalid, and <code>0xFF00</code> ~ <code>0xFFFF</code> are reserved for internal Matter use.
      When assigning GroupIDs, the app must ensure they are within the valid range and that different groups within the same Fabric use different IDs.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Organizing Devices by Room (Most Common)</summary>
    <div class="scenario-content">
      <ol>
        <li>The app assigns a unique GroupID to each room (e.g., Living Room = 0x0001, Bedroom = 0x0002)</li>
        <li>When the user drags a device into a room, the app sends <code>AddGroup(GroupID, RoomName)</code> to the device</li>
        <li>When the user taps "Turn off all living room lights," the app sends a single multicast <code>Off</code> command to GroupID 0x0001</li>
        <li>All lights in the living room turn off simultaneously with near-zero latency</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Multi-Device Linked Control</summary>
    <div class="scenario-content">
      <ol>
        <li>The user creates a "Theater Mode" group (GroupID = 0x0010) containing a chandelier, LED strip, and motorized curtain</li>
        <li>Send AddGroup to all devices in the group</li>
        <li>When Theater Mode is triggered, send multicast commands to GroupID 0x0010:
          <ul>
            <li>Lights receive <code>LevelControl.MoveToLevel(20)</code> to dim the brightness</li>
            <li>Curtain receives <code>WindowCovering.GoToLiftPercentage(100)</code> to fully close</li>
          </ul>
        </li>
        <li>Note: multicast commands are sent to all devices in the group; each device only executes Cluster commands it supports</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Groups + Scenes Combined (Automation Presets)</summary>
    <div class="scenario-content">
      <p>
        Groups and Scenes are the most powerful combination in Matter -- Groups define "which devices act together,"
        and Scenes define "what each device does individually."
      </p>
      <ol>
        <li>Create a "Living Room" group (GroupID = 0x0001), adding 3 lights and 1 curtain</li>
        <li>Create a Scene "Reading Mode" (SceneID = 0x01) under that group:
          <ul>
            <li>Chandelier: brightness 80%, color temperature 4000K</li>
            <li>Desk lamp: brightness 100%, color temperature 5000K</li>
            <li>LED strip: off</li>
            <li>Curtain: open 50%</li>
          </ul>
        </li>
        <li>When triggered, send a single <code>Scenes.RecallScene(SceneID: 0x01)</code> multicast command to GroupID 0x0001</li>
        <li>All devices simultaneously switch to their respective preset states with a single command</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Bulk Group Setup During Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>The installer puts the target device into Identify mode (by pressing a physical button or triggering via app scan)</li>
        <li>Send <code>AddGroupIfIdentifying(GroupID, GroupName)</code> to the network multicast address</li>
        <li>Only the device that is currently flashing joins the group; other devices ignore the command</li>
        <li>Repeat the above steps for the next device, completing group setup one by one</li>
        <li>This approach is especially suitable for initial deployment of large numbers of devices (e.g., offices, hotels)</li>
      </ol>
    </div>
  </details>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
    styles: `<style>
  .col-required {
    color: #dc2626;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-optional {
    color: #4ade80;
  }
</style>`,
  },
  'scene-management': {
    title: 'SceneManagement Cluster (0x0062)',
    description: 'Matter SceneManagement Cluster (0x0062) complete reference — all commands including AddScene/RecallScene/StoreScene, ExtensionFieldSets structure, FabricSceneInfo attribute, scene transition mechanism, and practical usage examples.',
    prev: undefined,
    next: undefined,
    content: `<h1>SceneManagement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0062</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    SceneManagement is the scene management Cluster in Matter — it bundles attribute values from multiple Clusters into a single "snapshot"
    and restores the entire set of states with one command.
    For example, a "Movie Mode" scene can simultaneously dim the lights, set a warm color temperature, and close the curtains — all in one scene.
  </p>
  <p>
    Each scene is uniquely identified by <strong>GroupID + SceneID</strong> and belongs to a Group,
    which can contain multiple scenes. The core data structure of a scene is <strong>ExtensionFieldSets</strong>
    — a set of "Cluster ID + attribute value list" snapshots that define which attributes of which Clusters are set to what values.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Matter 1.4+ Replaces Legacy Scenes (0x0005)</div>
    <p>
      SceneManagement (0x0062) is the new Cluster introduced in Matter 1.4, replacing the legacy Scenes (0x0005).
      The new version introduces <strong>Fabric-level isolation</strong> (each Fabric independently manages its own scene table) and
      the <strong>FabricSceneInfo</strong> struct, resolving the security issues of shared scene tables across multiple Fabrics in the old version.
      New projects should use 0x0062 directly; the legacy 0x0005 has been marked as deprecated.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Core Data Structures</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The SceneManagement Cluster has 8 commands covering scene CRUD operations, one-tap recall, and cross-group copying.
    AddScene and RecallScene are the two most commonly used in daily development.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Response Command</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AddScene</td>
          <td>Add or update a scene</td>
          <td>AddSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ViewScene</td>
          <td>View full data of a specified scene</td>
          <td>ViewSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>RemoveScene</td>
          <td>Remove a specified scene</td>
          <td>RemoveSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RemoveAllScenes</td>
          <td>Remove all scenes in a specified Group</td>
          <td>RemoveAllScenesResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>StoreScene</td>
          <td>Capture current state and store as a scene</td>
          <td>StoreSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>RecallScene</td>
          <td>Recall a specified scene in one step</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>GetSceneMembership</td>
          <td>Query the list of scenes in a Group</td>
          <td>GetSceneMembershipResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>CopyScene</td>
          <td>Copy scenes between Groups</td>
          <td>CopySceneResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">AddScene — Add Scene (0x00)</h3>
  <p>
    Adds a new scene to the device's scene table, or updates an existing one.
    The core scene data is passed via <code>ExtensionFieldSets</code> — it defines which attributes of which Clusters this scene controls.
    If the specified GroupID + SceneID already exists, it will be overwritten.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Group ID the scene belongs to. <code>0x0000</code> means not belonging to any Group</td>
        </tr>
        <tr>
          <td>SceneID</td>
          <td>uint8</td>
          <td>Scene ID, unique within the Group (0x00 ~ 0xFF)</td>
        </tr>
        <tr>
          <td>TransitionTime</td>
          <td>uint32</td>
          <td>Transition time in units of <strong>0.1 second</strong> (100 ms). For example, <code>10</code> = 1.0 second</td>
        </tr>
        <tr>
          <td>SceneName</td>
          <td>string</td>
          <td>Scene name (max 16 bytes). Requires the device to support the <strong>SN</strong> feature</td>
        </tr>
        <tr>
          <td>ExtensionFieldSets</td>
          <td>list</td>
          <td>List of attribute snapshots per Cluster (see <a href="#struct-efs">data structure details</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AddSceneResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID the scene belongs to</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID</td></tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A user creates a "Movie Mode" in the app: lights dimmed to 10%, color temperature set to warm white, curtains closed.
        The app packages these attribute values into ExtensionFieldSets, stores them on the device via AddScene,
        and later recalls them with RecallScene in one step.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ViewScene — View Scene (0x01)</h3>
  <p>
    Reads the full data of a specified scene, including transition time, scene name, and ExtensionFieldSets.
    Used to display scene details in the app UI or to retrieve the current configuration before editing.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID the scene belongs to</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID to view</td></tr>
      </tbody>
    </table>
  </div>

  <h4>ViewSceneResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID</td></tr>
        <tr><td>TransitionTime</td><td>uint32</td><td>Transition time (0.1 second)</td></tr>
        <tr><td>SceneName</td><td>string</td><td>Scene name</td></tr>
        <tr><td>ExtensionFieldSets</td><td>list</td><td>Attribute snapshots per Cluster</td></tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When the app's scene editing page loads, it first uses ViewScene to read the current configuration and display it to the user.
        After the user makes changes, the app updates the scene via AddScene.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">RemoveScene — Remove Scene (0x02)</h3>
  <p>
    Removes a specified scene from the device's scene table. After removal, the SceneID can be reused.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID the scene belongs to</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID to remove</td></tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveSceneResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>A user removes a scene no longer needed from the app, such as deleting an old "Party Mode".</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">RemoveAllScenes — Remove All Scenes in Group (0x03)</h3>
  <p>
    Removes all scenes in a specified Group at once. Suitable for resetting or clearing all scene configurations in an area.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID whose scenes are to be removed</td></tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveAllScenesResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>After redecorating, a user clears all old scenes in the "Living Room" Group to reconfigure from scratch.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">StoreScene — Capture Current State (0x04)</h3>
  <p>
    Takes a "snapshot" of the device's current actual state and saves it as a scene. The device automatically reads the current attribute values
    from its own Clusters and packages them into ExtensionFieldSets stored in the scene table. Unlike AddScene, which requires manually specifying each attribute value,
    StoreScene is more like a "save current state" shortcut.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID the scene belongs to</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID (overwrites if it already exists)</td></tr>
      </tbody>
    </table>
  </div>

  <h4>StoreSceneResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>Scene ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After a user adjusts the lights to their preferred state using a slider, they tap the "Save as Scene" button.
        The app sends a StoreScene command, and the device automatically stores the current brightness, color temperature, and other attribute values into the scene table.
        No need for the app to read each attribute value individually and pass them via AddScene.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">RecallScene — Recall Scene (0x05)</h3>
  <p>
    Recalls a specified scene in one step. The device reads the ExtensionFieldSets saved in the scene
    and sets each Cluster's attribute values to the target values recorded in the scene.
    If TransitionTime is specified, the device transitions smoothly within the given duration (e.g., gradual dimming).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>Yes</td>
          <td>Group ID the scene belongs to</td>
        </tr>
        <tr>
          <td>SceneID</td>
          <td>uint8</td>
          <td>Yes</td>
          <td>Scene ID to recall</td>
        </tr>
        <tr>
          <td>TransitionTime</td>
          <td>uint32</td>
          <td>No</td>
          <td>Overrides the scene's own transition time (0.1 second). If omitted, uses the value stored with the scene</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">TransitionTime Unit Note</div>
    <p>
      The unit of TransitionTime is <strong>0.1 second</strong> (100 ms), not seconds or milliseconds.
      For example, a value of <code>10</code> means 1.0 second, and <code>30</code> means 3.0 seconds.
      This differs from the legacy Scenes Cluster which used whole-second units; the new version provides higher precision.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A user taps the "Movie Mode" button in the app, which sends RecallScene.
        The lights dim from their current brightness to 10% within 1 second, the color temperature gradually shifts to warm white, and the curtains slowly close.
        All devices execute synchronously with a smooth, natural transition.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">GetSceneMembership — Query Scene List (0x06)</h3>
  <p>
    Queries which scenes exist in a specified Group. Returns the list of all stored SceneIDs under that Group and the remaining capacity.
    Used to display the scene list in the app UI or to determine how many more scenes can be created.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID to query</td></tr>
      </tbody>
    </table>
  </div>

  <h4>GetSceneMembershipResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>Capacity</td><td>uint8 / null</td><td>Remaining scene storage capacity. <code>null</code> means unknown</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>Group ID</td></tr>
        <tr><td>SceneList</td><td>list&lt;uint8&gt;</td><td>List of SceneIDs stored in this Group</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When the app opens the "Scene Management" page, it first calls GetSceneMembership to retrieve all scene IDs in the current Group,
        then calls ViewScene for each one to fetch the scene details and display them in a list.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x40">CopyScene — Copy Scene (0x40)</h3>
  <p>
    Copies scenes between Groups. Can copy a single scene or all scenes from a source Group to a target Group at once.
    Ideal for sharing the same scene configuration across different rooms.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mode</td>
          <td>CopyModeBitmap</td>
          <td>Bit 0: CopyAllScenes — when set to 1, copies all scenes from the source Group</td>
        </tr>
        <tr>
          <td>GroupIdentifierFrom</td>
          <td>group-id</td>
          <td>Source Group ID</td>
        </tr>
        <tr>
          <td>SceneIdentifierFrom</td>
          <td>uint8</td>
          <td>Source Scene ID (ignored when CopyAllScenes = 1)</td>
        </tr>
        <tr>
          <td>GroupIdentifierTo</td>
          <td>group-id</td>
          <td>Target Group ID</td>
        </tr>
        <tr>
          <td>SceneIdentifierTo</td>
          <td>uint8</td>
          <td>Target Scene ID (ignored when CopyAllScenes = 1)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>CopySceneResponse Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>Operation result status code</td></tr>
        <tr><td>GroupIdentifierFrom</td><td>group-id</td><td>Source Group ID</td></tr>
        <tr><td>SceneIdentifierFrom</td><td>uint8</td><td>Source Scene ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A user has configured a "Reading Mode" scene in the living room and wants the same configuration in the study.
        Using CopyScene, the scene is copied from the living room Group to the study Group without needing to reconfigure each attribute value.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The SceneManagement Cluster has 3 attributes. Scene data itself is not exposed through attributes
    but is read via the ViewScene / GetSceneMembership commands.
    The attributes provide metadata such as scene table capacity and current state information.
  </p>

  <!-- Attributes summary table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>LastConfiguredBy</td>
          <td>node-id / null</td>
          <td>Node ID that last modified the scene table</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SceneTableSize</td>
          <td>uint16</td>
          <td>Total scene table capacity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>FabricSceneInfo</td>
          <td>list&lt;FabricSceneInfo&gt;</td>
          <td>Scene summary info per Fabric</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x0000">LastConfiguredBy(0x0000)</h3>
  <p>
    Records the Node ID that last modified the scene table.
    Useful for troubleshooting "who changed the scene configuration" issues.
    A value of <code>null</code> means the scene table has never been modified, or the device does not support tracking this information.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-detail-0x0000">
          <td><code>0x0000</code></td>
          <td>LastConfiguredBy</td>
          <td>node-id / null</td>
          <td>Nullable. Records the Node that last modified the scene table via AddScene / RemoveScene / StoreScene or similar commands. <code>null</code> = not recorded or never modified</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">SceneTableSize(0x0001)</h3>
  <p>
    The maximum capacity of the device's scene table, i.e., the maximum number of scenes it can store.
    This is the total capacity shared across all Fabrics. Typical device values range from 8 to 16.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-detail-0x0001">
          <td><code>0x0001</code></td>
          <td>SceneTableSize</td>
          <td>uint16</td>
          <td>Total scene table capacity. Multiple Fabrics share this capacity limit; for example, a value of 16 means all Fabrics combined can store at most 16 scenes</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">FabricSceneInfo(0x0002)</h3>
  <p>
    Scene state information independently maintained by each Fabric. This is a list where each element corresponds to one Fabric.
    Through it, you can determine how many scenes the current Fabric has, which scene is currently active, and how many more can be stored.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Fabric-Level Isolation</div>
    <p>
      An important design aspect of SceneManagement is <strong>Fabric-level isolation</strong>:
      each Fabric (think of it as each smart home platform, such as Apple Home or Google Home) can only see and operate its own scenes,
      and cannot read or modify another Fabric's scene data. FabricSceneInfo also only returns information for the current Fabric.
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SceneCount</td>
          <td>uint8</td>
          <td>Number of scenes currently stored by this Fabric</td>
        </tr>
        <tr>
          <td>CurrentScene</td>
          <td>uint8</td>
          <td>Currently active Scene ID (the scene from the last RecallScene / StoreScene)</td>
        </tr>
        <tr>
          <td>CurrentGroup</td>
          <td>group-id</td>
          <td>Group ID of the currently active scene</td>
        </tr>
        <tr>
          <td>SceneValid</td>
          <td>bool</td>
          <td>Whether the current scene state is still valid. Becomes <code>false</code> if device attributes are manually changed (not through a scene operation)</td>
        </tr>
        <tr>
          <td>RemainingCapacity</td>
          <td>uint8</td>
          <td>Number of additional scenes this Fabric can still store</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Fabric index this record corresponds to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Meaning of SceneValid</div>
    <p>
      After a scene is recalled via RecallScene, <code>SceneValid</code> becomes <code>true</code>.
      However, if the user subsequently adjusts brightness or color temperature manually (not through a scene operation), the device's actual state no longer matches the scene record,
      and <code>SceneValid</code> reverts to <code>false</code>.
      This field can be used to determine whether the current device state still matches a scene.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Core Data Structures ====== -->
  <h2 id="structs">Core Data Structures</h2>

  <h3 id="struct-efs">ExtensionFieldSets (Extension Field Sets)</h3>
  <p>
    ExtensionFieldSets is the core data of a scene — it records "which attributes of which Clusters this scene sets to what values."
    The structure is a list where each element contains a Cluster ID and the list of attribute values to set for that Cluster.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Level</th><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">ExtensionFieldSet</td>
          <td>ClusterID</td>
          <td>cluster-id</td>
          <td>Cluster ID to control, e.g. <code>0x0006</code> (OnOff)</td>
        </tr>
        <tr>
          <td>AttributeValueList</td>
          <td>list</td>
          <td>List of attribute values for this Cluster</td>
        </tr>
        <tr>
          <td rowspan="2">AttributeValuePair</td>
          <td>AttributeID</td>
          <td>attrib-id</td>
          <td>Attribute ID, e.g. <code>0x0000</code> (OnOff on/off state)</td>
        </tr>
        <tr>
          <td>ValueUnsigned8/16/...</td>
          <td>various</td>
          <td>Attribute value; the type depends on the attribute's definition</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>For example, a "Movie Mode" scene's ExtensionFieldSets might contain:</p>
  <ul>
    <li><strong>OnOff (0x0006)</strong>: On/Off = On</li>
    <li><strong>LevelControl (0x0008)</strong>: Brightness = 25 (approx. 10%)</li>
    <li><strong>ColorControl (0x0300)</strong>: Color X = 370, Color Y = 300 (warm white)</li>
  </ul>
  <p>
    When the device executes RecallScene, it reads these attribute pairs one by one and invokes the corresponding Cluster's logic to set the attribute values.
    Each Cluster needs to implement the <code>ScenesManagement</code> callback interface to support scene storage and recall.
  </p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The SceneManagement Cluster declares the device's advanced capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SN（SceneNames）</span>
        <span class="enum-desc">Scene Names — when enabled, AddScene can set the SceneName field and ViewScene returns the scene name</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Is the SN Feature Required?</div>
    <p>
      The SN feature is optional. Devices that do not support SN will ignore the SceneName parameter in AddScene,
      and ViewScene will return an empty string for SceneName.
      If the app needs to display scene names, it can store them locally in the app without relying on the device.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Attribute Read Example</h3>
  <p>Return data when reading SceneManagement Cluster attributes:</p>
  <pre><code>{
  // --- Scene table info ---
  "0x0000": null,          // LastConfiguredBy = null (last configurator not recorded)
  "0x0001": 16,            // SceneTableSize = 16 (max 16 scenes)

  // --- Fabric scene info ---
  "0x0002": [              // FabricSceneInfo (current Fabric's scene summary)
    {
      "SceneCount": 3,           // Current Fabric has 3 stored scenes
      "CurrentScene": 1,         // Currently active Scene ID
      "CurrentGroup": 0,         // Group ID of the currently active scene
      "SceneValid": true,        // Current scene state is valid
      "RemainingCapacity": 13,   // Can store 13 more scenes
      "FabricIndex": 1           // Fabric index
    }
  ]
}</code></pre>

  <h3>AddScene Command Example</h3>
  <p>Create a "Movie Mode" scene containing attribute snapshots from three Clusters: OnOff, LevelControl, and ColorControl:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0062",
      "commandId": "0x00"       // AddScene
    },
    "commandFields": {
      "GroupID": 0,              // Group ID (0 = not in any Group)
      "SceneID": 1,              // Scene ID
      "TransitionTime": 10,      // Transition time = 1.0 second (unit: 0.1 second)
      "SceneName": "Movie",      // Scene name (requires SN feature)
      "ExtensionFieldSets": [    // Attribute snapshots per Cluster
        {
          "ClusterID": "0x0006", // OnOff Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0000", "ValueUnsigned8": 1 }
          ]
        },
        {
          "ClusterID": "0x0008", // LevelControl Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0000", "ValueUnsigned8": 25 }
          ]
        },
        {
          "ClusterID": "0x0300", // ColorControl Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0003", "ValueUnsigned16": 370 },
            { "AttributeID": "0x0004", "ValueUnsigned16": 300 }
          ]
        }
      ]
    }
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, ExtensionFieldSets should only include Clusters that the device actually supports.
      Before sending, you can check which Clusters the device has via the Descriptor Cluster's (0x001D) ServerList,
      to avoid command failures caused by including unsupported Clusters.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Movie Mode — Dim Lights in One Tap</summary>
    <div class="scenario-content">
      <p><strong>Goal</strong>: User taps the "Movie Mode" button, and the lights transition to dim warm lighting within 2 seconds.</p>
      <ol>
        <li>When creating the scene, use <code>AddScene (0x00)</code> to set ExtensionFieldSets:
          <ul>
            <li>OnOff: On</li>
            <li>LevelControl: Brightness = 25 (approx. 10%)</li>
            <li>ColorControl: Color temperature set to warm white</li>
          </ul>
          TransitionTime = 20 (i.e., 2.0-second transition)
        </li>
        <li>For daily use, the app sends <code>RecallScene (0x05)</code> with the GroupID and SceneID</li>
        <li>The device smoothly transitions to the target state within 2 seconds, with lights naturally dimming and warming</li>
        <li>If the user wants an instant switch without transition, override TransitionTime = 0 in RecallScene</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Wake-Up Mode — Natural Morning Wake-Up</summary>
    <div class="scenario-content">
      <p><strong>Goal</strong>: Every morning at 7:00 AM, the lights gradually brighten from off to bright cool white, simulating a sunrise.</p>
      <ol>
        <li>Use <code>AddScene (0x00)</code> to create a "Wake-Up" scene:
          <ul>
            <li>OnOff: On</li>
            <li>LevelControl: Brightness = 254 (100%)</li>
            <li>ColorControl: Color temperature set to cool white (daylight)</li>
          </ul>
          TransitionTime = 600 (i.e., 60-second transition, a 1-minute sunrise effect)
        </li>
        <li>Set up an automation rule: trigger <code>RecallScene (0x05)</code> daily at 07:00</li>
        <li>The lights gradually brighten from off to daylight white over 1 minute for a natural wake-up</li>
        <li>Can be combined with OnOff Cluster's OnWithTimedOff as a forget-to-turn-off safeguard: auto-off 30 minutes after wake-up</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: One-Tap Scene Switching — Physical Button Trigger</summary>
    <div class="scenario-content">
      <p><strong>Goal</strong>: A wall switch's single-press / double-press triggers different scenes respectively.</p>
      <ol>
        <li>Pre-configure two scenes:
          <ul>
            <li>SceneID = 1 "Daily": Brightness 80%, natural white light</li>
            <li>SceneID = 2 "Movie": Brightness 10%, warm white light</li>
          </ul>
        </li>
        <li>Configure in binding rules (Binding):
          <ul>
            <li>Switch single-press -> RecallScene (GroupID=0, SceneID=1)</li>
            <li>Switch double-press -> RecallScene (GroupID=0, SceneID=2)</li>
          </ul>
        </li>
        <li>Scene switching executes entirely locally (via Group multicast), without cloud dependency, for extremely fast response</li>
        <li>
          Using <code>StoreScene (0x04)</code>, users can customize: adjust the lights to their preferred state,
          then long-press the switch to trigger StoreScene, saving the current state as the scene mapped to that button
        </li>
      </ol>
    </div>
  </details>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
    styles: `<style>
  .col-required {
    color: #dc2626;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-optional {
    color: #4ade80;
  }
</style>`,
  },
  'binding': {
    title: 'Binding Cluster (0x001E)',
    description: 'Matter Binding Cluster (0x001E) complete reference — device-to-device binding relationships, TargetStruct structure, unicast/multicast binding write methods, and typical wiring scenarios such as switch-controls-light.',
    prev: undefined,
    next: undefined,
    content: `<h1>Binding Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001E</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Functional endpoint (e.g. <code>Endpoint 1</code>) &nbsp;|&nbsp;
    <strong>Role</strong>: Client-side configuration (no commands; configured via Write Attribute)
  </p>
  <p>
    Binding is the Cluster in Matter that defines the "wiring relationships" between devices. The core problem it solves is:
    <strong>When a device sends a command, who should receive it?</strong>
  </p>
  <p>
    For example: you have a smart switch and a smart light bulb. When the switch is pressed, how does it know which light to control?
    The answer is Binding -- write the light bulb's address into the switch's Binding attribute, and the switch now "knows" this light.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Concept: Binding Is a Client-Side Configuration</div>
    <p>
      Binding is configured on the <strong>command sender</strong> (Client), not on the command receiver (Server).
      For example, in a switch-controls-light scenario: Binding is written on the <strong>switch</strong>, not on the light bulb.
    </p>
    <p>
      Think of Binding as a "contact list" -- the switch's contact list has the light bulb's address,
      so when the button is pressed, it sends an OnOff command to the address in the contact list. The light bulb itself does not need to know who is controlling it.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">No Commands, Only Attribute Writes</div>
    <p>
      Binding Cluster <strong>has no commands at all</strong>. All configuration is done via
      <strong>Write Attribute</strong> operations -- directly writing to the <code>Binding</code> attribute.
      This means every write is a <strong>full replacement</strong> of the entire binding list, not an append.
      When modifying bindings, first read the current list, make changes, then write the entire list back.
    </p>
  </div>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>Binding Cluster has only one attribute, and it is mandatory.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Binding</td>
          <td>list&lt;TargetStruct&gt;</td>
          <td>Read/Write</td>
          <td>Binding target list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">Binding (Binding Target List)</h3>
  <p>
    A list of <code>TargetStruct</code> entries, where each entry describes a binding target.
    The device sends commands to the addresses in this list. An empty list means no targets are bound.
  </p>
  <p>
    Writing is a <strong>full replacement</strong> -- the newly written list completely overwrites the old one.
    If you only want to add one binding, you need to first read the existing list, append the new entry, then write the entire list back.
  </p>

  <h4 id="target-struct">TargetStruct Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>Node</td>
          <td>node-id</td>
          <td>Optional</td>
          <td>Target Node ID (used for unicast binding)</td>
        </tr>
        <tr>
          <td><code>1</code></td>
          <td>Group</td>
          <td>group-id</td>
          <td>Optional</td>
          <td>Target Group ID (used for multicast binding)</td>
        </tr>
        <tr>
          <td><code>2</code></td>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>Optional</td>
          <td>Target Endpoint (used together with Node for unicast binding)</td>
        </tr>
        <tr>
          <td><code>3</code></td>
          <td>Cluster</td>
          <td>cluster-id</td>
          <td>Optional</td>
          <td>Which Cluster on the target to bind to</td>
        </tr>
        <tr>
          <td><code>254</code></td>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Yes</td>
          <td>The Fabric this binding belongs to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Unicast vs Multicast: Choose One</div>
    <p>
      Each <code>TargetStruct</code> is either a <strong>unicast binding</strong> (specifying <code>Node</code> + <code>Endpoint</code>),
      or a <strong>multicast binding</strong> (specifying <code>Group</code>). Both cannot appear in the same entry.
    </p>
    <ul>
      <li><strong>Unicast</strong>: Controls a specific Endpoint on a specific device, e.g. "this switch controls the bedroom bedside lamp"</li>
      <li><strong>Multicast</strong>: Controls all devices in a group, e.g. "this switch controls all lights in the living room"</li>
    </ul>
    <p>
      The <code>Cluster</code> field is optional -- omitting it means binding to all Clusters on the target,
      while specifying it means binding only to a specific Cluster (e.g. only OnOff, not LevelControl).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Read the Binding List</h3>
  <pre><code>{
  // Read the binding list
  "attributeRequests": [{
    "endpointId": 1,
    "clusterId": "0x001E",
    "attributeId": "0x00"          // Binding
  }]
}</code></pre>

  <h3>Unicast Binding (Switch → Light Bulb)</h3>
  <p>Bind the switch (Endpoint 1) to the light bulb (Endpoint 1) on Node 2 for the OnOff Cluster:</p>
  <pre><code>{
  // Unicast binding: Switch → Light Bulb
  // Write to the Binding attribute on Endpoint 1
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"        // Binding
    },
    "dataVersion": 0,
    "data": [
      {
        "0": 2,                    // Node = 2 (target light bulb's Node ID)
        "2": 1,                    // Endpoint = 1 (target light bulb's functional endpoint)
        "3": "0x0006",             // Cluster = OnOff (bind to OnOff Cluster)
        "254": 1                   // FabricIndex = 1
      }
    ]
  }]
}</code></pre>

  <h3>Multicast Binding (Switch → Light Group)</h3>
  <p>Bind the switch to Group 1, so all lights in the group respond when the switch is pressed:</p>
  <pre><code>{
  // Multicast binding: Switch → a group of lights
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"        // Binding
    },
    "dataVersion": 0,
    "data": [
      {
        "1": 1,                    // Group = 1 (target Group ID)
        "3": "0x0006",             // Cluster = OnOff (bind to OnOff Cluster)
        "254": 1                   // FabricIndex = 1
      }
    ]
  }]
}</code></pre>

  <h3>Multiple Bindings (One Switch Controls Multiple Targets)</h3>
  <p>The same switch simultaneously bound to two lights and one group -- each entry in the list is an independent binding target:</p>
  <pre><code>{
  // Multiple bindings: one switch controls multiple targets
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"
    },
    "dataVersion": 0,
    "data": [
      {
        "0": 2, "2": 1, "3": "0x0006",   // Light A (Node 2, Endpoint 1, OnOff)
        "254": 1
      },
      {
        "0": 3, "2": 1, "3": "0x0006",   // Light B (Node 3, Endpoint 1, OnOff)
        "254": 1
      },
      {
        "1": 1, "3": "0x0006",            // Group 1 (all living room lights)
        "254": 1
      }
    ]
  }]
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Switch Controls a Light Bulb (Unicast Binding)</summary>
    <div class="scenario-content">
      <p>The most classic Binding scenario. A wall switch controls a specific light.</p>
      <ol>
        <li>Both the switch and the light bulb have been commissioned into the same Fabric</li>
        <li>Confirm the light bulb's Node ID (e.g. 2) and functional Endpoint (e.g. Endpoint 1)</li>
        <li>Write the Binding attribute on the switch's Endpoint 1, adding a record with <code>Node=2, Endpoint=1, Cluster=0x0006(OnOff)</code></li>
        <li>Press the switch → the switch automatically sends an OnOff Toggle command to Node 2 / Endpoint 1 → the light bulb responds</li>
      </ol>
      <p>
        This process does not require a Hub or cloud relay -- the switch and light bulb communicate directly within the local Fabric.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Switch Controls a Group of Lights (Multicast Binding)</summary>
    <div class="scenario-content">
      <p>The living room has 3 lights, and the user wants one switch to control them all simultaneously.</p>
      <ol>
        <li>First use the Groups Cluster to add all 3 lights to the same group (e.g. Group ID = 1)</li>
        <li>Write a record with <code>Group=1, Cluster=0x0006</code> in the switch's Binding attribute</li>
        <li>Press the switch → the switch sends a multicast OnOff command to Group 1 → all 3 lights respond simultaneously</li>
      </ol>
      <p>
        Multicast is more efficient than sending individual unicast commands, with lower latency -- all lights respond almost simultaneously.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Multiple Bindings (One Switch Controls Multiple Different Targets)</summary>
    <div class="scenario-content">
      <p>A scene switch needs to control different types of devices simultaneously.</p>
      <ol>
        <li>Write multiple records in the Binding list, each pointing to a different target</li>
        <li>Unicast and multicast can be mixed -- for example, one entry pointing to a bedroom light (unicast) and another to a living room light group (multicast)</li>
        <li>When the switch is pressed, the device iterates through the Binding list and sends a command to each target</li>
      </ol>
      <p>
        Note: With multiple bindings, all targets receive the <strong>same command</strong>.
        If you need to send different commands to different devices (e.g. turn on lights while turning off the AC), you should use automation rules instead of Binding.
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      Typical workflow for managing Bindings in an App:
    </p>
    <ol>
      <li>First read the current Binding list (Read Attribute)</li>
      <li>Display the bound target devices in the App UI</li>
      <li>User adds or removes binding targets</li>
      <li>Write the modified complete list back (Write Attribute) -- note this is a full replacement</li>
    </ol>
    <p>
      When writing, you must provide the correct <code>FabricIndex</code>, typically obtained from the current connection's Fabric information.
      Binding entries from other Fabrics are not affected by write operations -- each Fabric can only manage its own bindings.
    </p>
  </div>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
    styles: `<style>
  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'access-control': {
    title: 'AccessControl Cluster (0x001F)',
    description: 'Matter AccessControl Cluster (0x001F) complete reference — ACL entry management, Privilege/AuthMode enums, AccessControlEntryStruct definition, event definitions, and typical ACL configuration examples.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>AccessControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001F</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (root endpoint)
  </p>
  <p>
    AccessControl is the permission management hub of a Matter device -- it determines "who" can perform "what operations" on "which resources".
    Every Matter device must implement this Cluster on Endpoint 0.
    It has no commands; all configuration is done by directly writing to the <code>ACL</code> attribute.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Concept</div>
    <p>
      ACLs are isolated by Fabric -- each Fabric (control domain) maintains an independent list of access control entries without interfering with each other.
      After Commissioning is complete, the device automatically creates an Administer privilege entry for the Commissioner,
      which is the foundation for all subsequent operations. If the ACL is misconfigured, the device may become "unreachable" and can only be recovered via factory reset.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Structs</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Types</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The attributes of the AccessControl Cluster are divided into two groups: ACL Data (read/write permission configuration) and Capacity Limits (read-only device capability limits).
    Click on an attribute ID in the summary table below to jump to its detailed description.
  </p>

  <!-- Attribute Summary Table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Group</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- ACL Data -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ACL</td>
          <td>list&lt;AccessControlEntryStruct&gt;</td>
          <td><a href="#group-acl-data">ACL Data</a></td>
          <td>Access control entry list (core attribute)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Extension</td>
          <td>list&lt;AccessControlExtensionStruct&gt;</td>
          <td><a href="#group-acl-data">ACL Data</a></td>
          <td>Vendor-specific extension data</td>
        </tr>
        <!-- Capacity Limits -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SubjectsPerAccessControlEntry</td>
          <td>uint16</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum number of Subjects per ACL entry</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TargetsPerAccessControlEntry</td>
          <td>uint16</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum number of Targets per ACL entry</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AccessControlEntriesPerFabric</td>
          <td>uint16</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum number of ACL entries per Fabric</td>
        </tr>
        <!-- MNGD Feature -->
        <tr class="clickable-row" data-href="#attr-0x0400">
          <td><a href="#attr-0x0400"><code>0x0400</code></a></td>
          <td>CommissioningARL</td>
          <td>list&lt;CommissioningAccessRestrictionEntryStruct&gt;</td>
          <td><a href="#group-arl">Access Restrictions</a></td>
          <td>Access restriction list during Commissioning phase</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0401">
          <td><a href="#attr-0x0401"><code>0x0401</code></a></td>
          <td>ARL</td>
          <td>list&lt;AccessRestrictionEntryStruct&gt;</td>
          <td><a href="#group-arl">Access Restrictions</a></td>
          <td>Runtime access restriction list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== ACL Data (0x0000, 0x0001) ====== -->
  <h3 id="group-acl-data">ACL Data (0x0000, 0x0001)</h3>
  <p>Access control entries and extension data -- the core writable attributes of AccessControl.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>ACL (Access Control List)</td>
          <td>list&lt;AccessControlEntryStruct&gt;</td>
          <td>
            The device's access control entry list. Each entry defines a "who can do what" rule.
            Isolated by Fabric -- each Fabric can only read and write its own entries.
            Writing requires a full replacement (incremental modification of individual entries is not supported) and requires <strong>Administer</strong> privilege.
            See <a href="#struct-entry">AccessControlEntryStruct</a> for struct details
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Extension (Extension Data)</td>
          <td>list&lt;AccessControlExtensionStruct&gt;</td>
          <td>
            Vendor-specific permission extensions. Each entry contains TLV-encoded data of up to 128 bytes.
            Standard Matter implementations typically do not use this field. <strong>Requires the EXTS feature</strong>.
            Writing requires <strong>Administer</strong> privilege
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Important Notes on Writing ACL</div>
    <p>
      Writing ACL is a <strong>full replacement</strong> operation -- you must write the complete entry list at once; you cannot modify just one entry.
      If the newly written list does not include your own Administer entry, you will <strong>permanently lose administrative access to the device</strong>,
      and the only recovery is a factory reset. It is recommended to read the current ACL first, modify it, then write the entire list back.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Capacity Limits (0x0002 ~ 0x0004) ====== -->
  <h3 id="group-capacity">Capacity Limits (0x0002 ~ 0x0004)</h3>
  <p>Read-only attributes that describe the device's capacity limits for ACL entries. Read these values before writing ACL to avoid exceeding the device's capabilities.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>SubjectsPerAccessControlEntry</td>
          <td>uint16</td>
          <td>Maximum length of the <code>subjects</code> list in a single ACL entry. Minimum value is 4</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>TargetsPerAccessControlEntry</td>
          <td>uint16</td>
          <td>Maximum length of the <code>targets</code> list in a single ACL entry. Minimum value is 3</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AccessControlEntriesPerFabric</td>
          <td>uint16</td>
          <td>Maximum total number of ACL entries a Fabric can have. Minimum value is 4 (enough for at least one administrator entry and a few user entries)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Typical Device Capacity</div>
    <p>
      Typical values for most devices: SubjectsPerAccessControlEntry = 4, TargetsPerAccessControlEntry = 3,
      AccessControlEntriesPerFabric = 4. Resource-constrained devices (such as battery-powered sensors) may have smaller values.
      Always read these three values before planning during development.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Access Restrictions (0x0400, 0x0401) ====== -->
  <h3 id="group-arl">Access Restrictions (0x0400, 0x0401) — MNGD Feature</h3>
  <p>
    The Access Restriction List (ARL) is an advanced feature introduced by the MNGD (Managed Device) feature,
    allowing device manufacturers to restrict access to certain resources even if the ACL permits it.
    Most consumer devices do not implement this feature.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0400">
          <td><code>0x0400</code></td>
          <td>CommissioningARL</td>
          <td>list</td>
          <td>Access restrictions during the Commissioning phase. The device informs the Commissioner which resources are restricted during commissioning. <strong>Requires the MNGD feature</strong></td>
        </tr>
        <tr id="attr-0x0401">
          <td><code>0x0401</code></td>
          <td>ARL</td>
          <td>list</td>
          <td>Runtime access restriction list. Even if the ACL grants permission, resources listed in the ARL remain inaccessible. <strong>Requires the MNGD feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>

  <h3 id="struct-entry">AccessControlEntryStruct — Access Control Entry</h3>
  <p>
    The core data structure of ACL. Each record defines the privilege level that a set of subjects (who) have on a set of targets (which resources).
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Privilege</td>
          <td><a href="#enum-privilege">AccessControlEntryPrivilegeEnum</a></td>
          <td>Granted privilege level (View / Operate / Manage / Administer)</td>
        </tr>
        <tr>
          <td>AuthMode</td>
          <td><a href="#enum-authmode">AccessControlEntryAuthModeEnum</a></td>
          <td>Authentication mode (PASE / CASE / Group)</td>
        </tr>
        <tr>
          <td>Subjects</td>
          <td>list&lt;subject-id&gt; / null</td>
          <td>
            List of subjects allowed to access (Node ID or Group ID).
            <code>null</code> means <strong>all Nodes</strong> within the same Fabric are allowed access
          </td>
        </tr>
        <tr>
          <td>Targets</td>
          <td>list&lt;<a href="#struct-target">AccessControlTargetStruct</a>&gt; / null</td>
          <td>
            Scope of allowed access targets.
            <code>null</code> means <strong>all Endpoints and Clusters</strong> on the device are accessible
          </td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Fabric index this entry belongs to (automatically populated by the device; does not need to be specified manually)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">The Meaning of null for Subjects and Targets</div>
    <p>
      <code>null</code> in ACL means "no restriction", not "deny".
      <code>Subjects = null</code> means all Nodes within the same Fabric match;
      <code>Targets = null</code> means all Endpoints and Clusters on the device are in scope.
      The default administrator entry typically sets <code>Targets = null</code> because administrators need access to everything.
    </p>
  </div>

  <h3 id="struct-target">AccessControlTargetStruct — Access Target</h3>
  <p>
    Defines the specific resource scope an ACL entry allows access to. <strong>At least one</strong> of the three fields must be specified; unspecified fields mean no restriction.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cluster</td>
          <td>cluster-id / null</td>
          <td>Restrict to a specific Cluster. <code>null</code> = no Cluster restriction</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no / null</td>
          <td>Restrict to a specific Endpoint. <code>null</code> = no Endpoint restriction</td>
        </tr>
        <tr>
          <td>DeviceType</td>
          <td>devtype-id / null</td>
          <td>Restrict to a specific device type. <code>null</code> = no device type restriction</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Endpoint and DeviceType Are Mutually Exclusive</div>
    <p>
      <code>Endpoint</code> and <code>DeviceType</code> cannot be specified simultaneously -- either match precisely by Endpoint number,
      or match broadly by device type. If both are set, the device will reject the entry.
      The most common approach is to specify only <code>Endpoint</code>.
    </p>
  </div>

  <h3 id="struct-extension">AccessControlExtensionStruct — Extension Data</h3>
  <p>
    A vendor-specific extension structure that requires the EXTS feature to be enabled. Rarely used in standard Matter development.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data</td>
          <td>octstr (max 128 bytes)</td>
          <td>TLV-encoded extension data, content defined by the vendor</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Fabric index this entry belongs to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Enum Types ====== -->
  <h2 id="enums">Enum Types</h2>

  <h3 id="enum-privilege">AccessControlEntryPrivilegeEnum — Privilege Levels</h3>
  <p>
    Defines the privilege level granted by an ACL entry. Privileges are <strong>inclusive</strong> -- higher-level privileges automatically include all capabilities of lower-level privileges.
    For example, Operate includes the capabilities of View, and Administer includes all capabilities.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">View</span>
        <span class="enum-desc">Read-only privilege -- can read attributes and subscribe to events, but cannot perform any write operations or commands</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ProxyView</span>
        <span class="enum-desc">Proxy read-only -- similar to View, used for Proxy Node scenarios (rarely used)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Operate</span>
        <span class="enum-desc">Operate privilege -- can read attributes + invoke commands (everyday operations like turning on lights, unlocking doors). <strong>The most commonly used user privilege</strong></span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Manage</span>
        <span class="enum-desc">Manage privilege -- can operate + write configuration attributes (modify device name, set power-on behavior, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Administer</span>
        <span class="enum-desc">Highest privilege -- can manage + modify ACL itself + perform Commissioning-related operations. <strong>Intended for controllers/Hubs only</strong></span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Privilege Inheritance</div>
    <p>
      Administer &supset; Manage &supset; Operate &supset; View.
      After assigning Operate privilege to a user, they automatically have View capability, so there is no need to add a separate View ACL entry.
    </p>
  </div>

  <h3 id="enum-authmode">AccessControlEntryAuthModeEnum — Authentication Mode</h3>
  <p>Specifies the authentication mode that an ACL entry matches. Different authentication modes determine the meaning of the IDs in the Subjects field.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PASE</span>
        <span class="enum-desc">Passcode authentication -- used only during the Commissioning phase; automatically expires after commissioning is complete. No manual configuration needed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">CASE</span>
        <span class="enum-desc">Certificate authentication -- the most commonly used method, based on certificate-backed point-to-point secure communication. Subjects field contains Node IDs</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Group</span>
        <span class="enum-desc">Group authentication -- used for Group messages (e.g. controlling a group of lights simultaneously). Subjects field contains Group IDs</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    The AccessControl Cluster records ACL change history through events. Each time the ACL or Extension attribute is written,
    the device generates a corresponding event. These events are important for security auditing and troubleshooting.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Priority</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>AccessControlEntryChanged</td>
          <td>Info</td>
          <td>An ACL entry has changed (added, modified, or removed). Event data includes the change type (Changed/Added/Removed), the latest entry content, the operator's Node ID, and the Fabric index</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>AccessControlExtensionChanged</td>
          <td>Info</td>
          <td>Extension data has changed. Structure is similar to the previous event, recording additions, deletions, and modifications to extension data. <strong>Requires the EXTS feature</strong></td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>FabricRestrictionReviewUpdate</td>
          <td>Info</td>
          <td>Fabric access restriction review update. Triggered when ARL rules change. <strong>Requires the MNGD feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Audit Recommendation</div>
    <p>
      In production environments, it is recommended to subscribe to the <code>AccessControlEntryChanged</code> event.
      If someone accidentally modifies the ACL (e.g. accidentally deletes the administrator entry), the event log can help quickly identify the issue.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The AccessControl Cluster declares the device's supported extension capabilities through the <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">EXTS (Extension)</span>
        <span class="enum-desc">Supports vendor-specific extension data -- when enabled, the Extension (0x0001) attribute can be written</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">MNGD (Managed Device)</span>
        <span class="enum-desc">Managed device -- supports Access Restriction List (ARL), allowing manufacturers to additionally restrict resource access</span>
      </div>
    </div>
  </div>

  <p>
    Most consumer devices have a FeatureMap of <code>0x0000</code> (no features enabled).
    EXTS is for vendor devices with custom permission requirements, and MNGD is for cloud-platform-managed devices.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>
    A typical smart light's AccessControl Cluster read result after Commissioning is complete and a user privilege entry has been added:
  </p>

  <pre><code>{
  // --- ACL entries (list, independently maintained per Fabric) ---
  "0x0000": [                    // ACL — AccessControlEntryStruct list
    {
      "privilege": 5,            // Administer (administrator)
      "authMode": 2,             // CASE authentication
      "subjects": [112233],      // Bound to Commissioner Node ID
      "targets": null,           // null = can access all Endpoints and Clusters
      "fabricIndex": 1
    },
    {
      "privilege": 3,            // Operate (operate privilege)
      "authMode": 2,             // CASE authentication
      "subjects": null,          // null = all Nodes within the same Fabric
      "targets": [               // Restrict the accessible scope
        { "cluster": null, "endpoint": 1, "deviceType": null }
      ],
      "fabricIndex": 1
    }
  ],

  // --- Capacity Limits ---
  "0x0002": 4,                   // SubjectsPerAccessControlEntry = 4
  "0x0003": 3,                   // TargetsPerAccessControlEntry = 3
  "0x0004": 4                    // AccessControlEntriesPerFabric = 4
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The first ACL entry (Privilege = 5, Administer) is automatically created during Commissioning and <strong>must never be deleted</strong>.
      When adding user privileges, first read the complete ACL list, append the new entry, then write the entire list back.
      Note that Extension (0x0001) only exists when the FeatureMap includes the EXTS feature.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Default Administrator ACL (Auto-Generated After Commissioning)</summary>
    <div class="scenario-content">
      <p>
        After the device completes Commissioning, it automatically creates an administrator privilege entry for the Commissioner (typically a phone App or Hub):
      </p>
      <ul>
        <li><strong>Privilege</strong> = Administer (5) -- highest privilege</li>
        <li><strong>AuthMode</strong> = CASE (2) -- certificate-based secure authentication</li>
        <li><strong>Subjects</strong> = [Commissioner's Node ID] -- only this controller</li>
        <li><strong>Targets</strong> = null -- can access everything on the device</li>
      </ul>
      <p>
        This ACL entry is the foundation for all subsequent operations. If it is accidentally deleted, the device can no longer be controlled and can only be recovered via factory reset.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Add Operate Privilege for a Family Member</summary>
    <div class="scenario-content">
      <p>
        The administrator wants a family member (another phone) to be able to control lights and switches, but not modify device configuration:
      </p>
      <ol>
        <li>Read the current ACL list (ensure it contains the administrator entry)</li>
        <li>Append a new entry:
          <ul>
            <li><strong>Privilege</strong> = Operate (3)</li>
            <li><strong>AuthMode</strong> = CASE (2)</li>
            <li><strong>Subjects</strong> = [family member's Node ID]</li>
            <li><strong>Targets</strong> = [&#123; endpoint: 1 &#125;] (only allow operations on the functional Endpoint)</li>
          </ul>
        </li>
        <li>Write the complete list containing both the administrator entry and the new entry to the ACL</li>
      </ol>
      <p>
        After writing, the family member can turn lights on and off, but cannot modify ACL, device name, power-on behavior, or other management-level configurations.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Set Up Group Multicast Privilege</summary>
    <div class="scenario-content">
      <p>
        You need to control a group of lights simultaneously via multicast, e.g. "all living room lights":
      </p>
      <ol>
        <li>First configure the Group Key for each light (via the GroupKeyManagement Cluster)</li>
        <li>Add a Group privilege entry in each light's ACL:
          <ul>
            <li><strong>Privilege</strong> = Operate (3)</li>
            <li><strong>AuthMode</strong> = Group (3)</li>
            <li><strong>Subjects</strong> = [Group ID]</li>
            <li><strong>Targets</strong> = [&#123; endpoint: 1 &#125;]</li>
          </ul>
        </li>
        <li>Then send OnOff commands to the Group, and all lights respond simultaneously</li>
      </ol>
      <p>
        The privilege level in Group mode <strong>can only go up to Operate</strong>; Manage or Administer operations are not allowed through Group.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Troubleshoot "Access Denied" Issues</summary>
    <div class="scenario-content">
      <p>
        When the device returns an <code>UNSUPPORTED_ACCESS</code> or <code>ACCESS_DENIED</code> error, follow these troubleshooting steps:
      </p>
      <ol>
        <li>Read the device's ACL (0x0000) and verify whether there is an entry matching the current Node</li>
        <li>Check whether the matching entry's <strong>Privilege</strong> is sufficient (e.g. writing attributes requires Manage, modifying ACL requires Administer)</li>
        <li>Check whether the <strong>AuthMode</strong> matches (a CASE-authenticated Node will not match a Group-type ACL entry)</li>
        <li>Check whether <strong>Targets</strong> covers the target Endpoint and Cluster</li>
        <li>Verify capacity limits -- read SubjectsPerAccessControlEntry and AccessControlEntriesPerFabric to see if limits are exceeded</li>
      </ol>
    </div>
  </details>

  <script>
    document.querySelectorAll('.clickable-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') {
          const href = row.dataset.href;
          if (href) {
            window.location.hash = href.replace('#', '');
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  </script>`,
    styles: `<style>
  .col-required {
    color: #dc2626;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-optional {
    color: #4ade80;
  }
</style>`,
  },
};
