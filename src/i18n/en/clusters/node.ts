import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'basic-information': {
    title: 'BasicInformation Cluster (0x0028)',
    description: 'Complete reference for Matter BasicInformation Cluster (0x0028) — vendor name, product ID, hardware/software version, serial number, product appearance, CapabilityMinima, and all attribute definitions with enum value quick reference.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>BasicInformation Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0028</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Only on <code>Endpoint 0</code> (Root Node)
  </p>
  <p>
    BasicInformation provides core device metadata — including vendor information, product identification, hardware/software versions, serial numbers, product appearance, and protocol capabilities.
    This Cluster is <strong>mandatory for every Matter device</strong> and <strong>only exists on Endpoint 0</strong>.
    Most of its attributes are <strong>read-only</strong>; only <code>NodeLabel</code> and <code>LocalConfigDisabled</code> are writable.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Endpoint 0 Only</div>
    <p>
      Unlike most functional Clusters, BasicInformation can <strong>only appear on Endpoint 0</strong> (Root Node Endpoint).
      Reading this Cluster on Endpoint 1 will return an <code>UNSUPPORTED_CLUSTER</code> error.
      Always specify <code>endpointId = 0</code> when reading device information in code.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>BasicInformation has 23 attributes organized into five groups. Click an attribute ID to jump to its detailed description.</p>

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
        <!-- Vendor Information -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>DataModelRevision</td>
          <td>uint16</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Data Model revision number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>VendorName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Vendor name</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Vendor ID (assigned by CSA)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>ProductName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Product name</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Product ID (vendor-defined)</td>
        </tr>
        <!-- Product Information -->
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>NodeLabel</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>User-defined device name (writable)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>Location</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>ISO 3166-1 alpha-2 country code</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>ManufacturingDate</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Manufacturing date (ISO 8601 format)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0C">
          <td><a href="#attr-0x0C"><code>0x0C</code></a></td>
          <td>PartNumber</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Part number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0D">
          <td><a href="#attr-0x0D"><code>0x0D</code></a></td>
          <td>ProductURL</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Product page URL</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0E">
          <td><a href="#attr-0x0E"><code>0x0E</code></a></td>
          <td>ProductLabel</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Product label (user-facing short name)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>SerialNumber</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Serial number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>UniqueID</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Device unique identifier</td>
        </tr>
        <!-- Version Information -->
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Hardware version number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>HardwareVersionString</td>
          <td>string</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Hardware version string</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Software version number (used for OTA comparison)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>SoftwareVersionString</td>
          <td>string</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Software version string (user-facing)</td>
        </tr>
        <!-- Device Status -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>LocalConfigDisabled</td>
          <td>bool</td>
          <td><a href="#group-state">Device Status</a></td>
          <td>Whether local configuration is disabled (writable)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>Reachable</td>
          <td>bool</td>
          <td><a href="#group-state">Device Status</a></td>
          <td>Whether the device is reachable</td>
        </tr>
        <!-- Capabilities -->
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>CapabilityMinima</td>
          <td>struct</td>
          <td><a href="#group-capability">Capabilities</a></td>
          <td>Device minimum capability declaration</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>ProductAppearance</td>
          <td>struct</td>
          <td><a href="#group-capability">Capabilities</a></td>
          <td>Product appearance description (finish + color)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>SpecificationVersion</td>
          <td>uint32</td>
          <td><a href="#group-capability">Capabilities</a></td>
          <td>Matter specification version implemented by device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>MaxPathsPerInvoke</td>
          <td>uint16</td>
          <td><a href="#group-capability">Capabilities</a></td>
          <td>Maximum paths per single Invoke</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Vendor Information (0x00-0x04) ====== -->
  <h3 id="group-vendor">Vendor Information (0x00 – 0x04)</h3>
  <p>Device vendor and product identifiers, assigned by CSA or set by the vendor. These attributes are fixed at manufacturing time and cannot be changed at runtime.</p>

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
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>DataModelRevision</td>
          <td>uint16</td>
          <td>The Data Model revision implemented by the device. Used to determine which data model features the device supports</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>VendorName</td>
          <td>string</td>
          <td>Human-readable vendor name, max 32 characters. E.g. <code>"Acme Corp"</code>, <code>"Espressif"</code></td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>Vendor number assigned by CSA (Connectivity Standards Alliance). Test VIDs are <code>0xFFF1</code>–<code>0xFFF4</code></td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>ProductName</td>
          <td>string</td>
          <td>Human-readable product name, max 32 characters. E.g. <code>"Smart Light"</code>, <code>"Door Lock Pro"</code></td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td>Product number assigned by the vendor; combined with VendorID to uniquely identify a product</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">VendorID + ProductID Combination</div>
    <p>
      The combination of <code>VendorID</code> and <code>ProductID</code> uniquely identifies a Matter product.
      During commissioning, the Commissioner (e.g. phone App) uses these two values to match the correct device driver and UI configuration.
      The DCL (Distributed Compliance Ledger) also uses this combination to query device certification information.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Product Information (0x05-0x06, 0x0B-0x0F, 0x12) ====== -->
  <h3 id="group-product">Product Information (0x05 – 0x06, 0x0B – 0x0F, 0x12)</h3>
  <p>
    Detailed product information — user labels, manufacturing date, serial numbers, etc.
    Most of these attributes are optional; actual devices may only implement a few of them.
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
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>NodeLabel</td>
          <td>string</td>
          <td>User-defined device name, max 32 characters. <strong>Writable</strong> — App can modify via Write operation, e.g. rename to <code>"Living Room Light"</code></td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>Location</td>
          <td>string</td>
          <td>Device country/region, ISO 3166-1 alpha-2 format, e.g. <code>"CN"</code>, <code>"US"</code>. Fixed 2 characters</td>
        </tr>
        <tr id="attr-0x0B">
          <td><code>0x0B</code></td>
          <td>ManufacturingDate</td>
          <td>string</td>
          <td>Manufacturing date, ISO 8601 format, e.g. <code>"2025-01-15"</code>. Optional attribute</td>
        </tr>
        <tr id="attr-0x0C">
          <td><code>0x0C</code></td>
          <td>PartNumber</td>
          <td>string</td>
          <td>Vendor's internal part number, max 32 characters. Optional attribute</td>
        </tr>
        <tr id="attr-0x0D">
          <td><code>0x0D</code></td>
          <td>ProductURL</td>
          <td>string</td>
          <td>Product page URL, max 256 characters. Optional. Directs users to product details or manuals</td>
        </tr>
        <tr id="attr-0x0E">
          <td><code>0x0E</code></td>
          <td>ProductLabel</td>
          <td>string</td>
          <td>User-facing product short name, max 64 characters. Usually shorter than ProductName, suitable for UI display</td>
        </tr>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>SerialNumber</td>
          <td>string</td>
          <td>Device serial number, max 32 characters. Unique per device</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>UniqueID</td>
          <td>string</td>
          <td>Device globally unique identifier, max 32 characters. Does not change even after factory reset; useful for device deduplication</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">NodeLabel Is the Only Commonly Used Writable Attribute</div>
    <p>
      Among BasicInformation's 23 attributes, only <code>NodeLabel</code> and <code>LocalConfigDisabled</code> support Write operations.
      <code>NodeLabel</code> is the most commonly used — when users rename a device in the App, they are actually modifying this attribute.
      Write operations require ACL permission checks and <strong>Manage</strong>-level privilege by default.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Version Information (0x07-0x0A) ====== -->
  <h3 id="group-version">Version Information (0x07 – 0x0A)</h3>
  <p>Device hardware and software version information. The OTA upgrade process relies on these version numbers to determine whether an update is needed.</p>

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
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td>Hardware version numeric code, vendor-defined. Used to distinguish different hardware batches</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>HardwareVersionString</td>
          <td>string</td>
          <td>Human-readable hardware version, 1–64 characters, e.g. <code>"v1.0"</code>, <code>"Rev B"</code></td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>Firmware version numeric code. OTA Provider compares this value with the new firmware version to decide whether to push an update. <strong>Higher value = newer version</strong></td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>SoftwareVersionString</td>
          <td>string</td>
          <td>Human-readable software version, 1–64 characters, e.g. <code>"v2.0.1"</code>. The version shown to users</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Version Number vs Version String</div>
    <p>
      Each version has two attributes: a <strong>numeric code</strong> (Version) and a <strong>string</strong> (VersionString).
      The numeric code is used for programmatic comparison (e.g. OTA version checks); the string is for UI display.
      Apps should use <code>SoftwareVersionString</code> when displaying firmware versions;
      compare <code>SoftwareVersion</code> numeric values when determining whether an upgrade is needed.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Device Status (0x10-0x11) ====== -->
  <h3 id="group-state">Device Status (0x10 – 0x11)</h3>
  <p>Describes the device's current operating status and configuration mode.</p>

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
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>LocalConfigDisabled</td>
          <td>bool</td>
          <td><strong>Writable</strong>. When set to <code>true</code>, the device should prohibit configuration changes via physical buttons or other local methods. Default <code>false</code></td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>Reachable</td>
          <td>bool</td>
          <td>Whether the device is currently reachable. Especially important for Bridged devices — the Bridge uses this attribute to inform the Controller of sub-device online status. Directly connected devices are typically always <code>true</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Reachable and Bridged Devices</div>
    <p>
      For devices directly connected to the Matter Fabric, <code>Reachable</code> essentially means "<code>true</code> as long as communication is possible".
      But for sub-devices connected via a Bridge (e.g. Zigbee light bulbs exposed through a Matter Bridge), <code>Reachable</code> reflects
      the connection status between the Bridge and the sub-device. When a sub-device goes offline, the Bridge sets <code>Reachable</code> to <code>false</code>
      and triggers the <code>ReachableChanged</code> event.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Capabilities (0x13-0x16) ====== -->
  <h3 id="group-capability">Capabilities (0x13 – 0x16)</h3>
  <p>Describes the protocol capabilities and product appearance supported by the device.</p>

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
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>CapabilityMinima</td>
          <td>struct</td>
          <td>Minimum protocol capabilities declared by the device (see struct description below)</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>ProductAppearance</td>
          <td>struct</td>
          <td>Physical appearance of the product: surface finish and primary color (see struct and enum descriptions below)</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>SpecificationVersion</td>
          <td>uint32</td>
          <td>Matter specification version implemented by the device. Encoded as <code>Major.Minor.Patch.Reserved</code>, 8 bits each. E.g. <code>0x01010000</code> = Matter 1.1.0</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>MaxPathsPerInvoke</td>
          <td>uint16</td>
          <td>Maximum number of Command paths allowed in a single Invoke Request. Minimum <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- CapabilityMinima Struct -->
  <h4 id="struct-capability-minima">CapabilityMinima Struct</h4>
  <p>Describes the device's minimum protocol processing capabilities. Controllers can adjust their interaction strategy accordingly.</p>
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
          <td>CaseSessionsPerFabric</td>
          <td>uint16</td>
          <td>Maximum concurrent CASE Sessions per Fabric. Minimum <code>3</code></td>
        </tr>
        <tr>
          <td>SubscriptionsPerFabric</td>
          <td>uint16</td>
          <td>Maximum concurrent Subscriptions per Fabric. Minimum <code>3</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical Significance of CapabilityMinima</div>
    <p>
      If a Controller needs to establish multiple CASE Sessions with the same device (e.g. simultaneous OTA and control),
      it should first check <code>CaseSessionsPerFabric</code> to confirm the device supports it.
      The same applies to <code>SubscriptionsPerFabric</code> — if an App needs to subscribe to multiple attribute change notifications,
      ensure the total subscription count does not exceed the device's declared limit.
    </p>
  </div>

  <!-- ProductAppearance Struct -->
  <h4 id="struct-product-appearance">ProductAppearance Struct</h4>
  <p>Describes the product's physical appearance characteristics, used for displaying device icons or color schemes in the App.</p>
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
          <td>Finish</td>
          <td>ProductFinishEnum</td>
          <td>Product surface finish (see enum below)</td>
        </tr>
        <tr>
          <td>PrimaryColor</td>
          <td>ColorEnum</td>
          <td>Product primary color (see enum below). Nullable — <code>null</code> when not applicable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductFinishEnum (Surface Finish)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Matte</span>
        <span class="enum-desc">Matte</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Satin</span>
        <span class="enum-desc">Satin</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Polished</span>
        <span class="enum-desc">Polished</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rugged</span>
        <span class="enum-desc">Rugged (industrial)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Fabric</span>
        <span class="enum-desc">Fabric</span>
      </div>
    </div>
  </div>

  <h4>ColorEnum (Product Color)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Black</span>
        <span class="enum-desc">Black</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Navy</span>
        <span class="enum-desc">Navy</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Green</span>
        <span class="enum-desc">Green</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Teal</span>
        <span class="enum-desc">Teal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Maroon</span>
        <span class="enum-desc">Maroon</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Purple</span>
        <span class="enum-desc">Purple</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Olive</span>
        <span class="enum-desc">Olive</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Gray</span>
        <span class="enum-desc">Gray</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Blue</span>
        <span class="enum-desc">Blue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Lime</span>
        <span class="enum-desc">Lime</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Aqua</span>
        <span class="enum-desc">Aqua</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Red</span>
        <span class="enum-desc">Red</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">Fuchsia</span>
        <span class="enum-desc">Fuchsia</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">Yellow</span>
        <span class="enum-desc">Yellow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">14</span>
      <div>
        <span class="enum-name">White</span>
        <span class="enum-desc">White</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">Nickel</span>
        <span class="enum-desc">Nickel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">16</span>
      <div>
        <span class="enum-name">Chrome</span>
        <span class="enum-desc">Chrome</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">17</span>
      <div>
        <span class="enum-name">Brass</span>
        <span class="enum-desc">Brass</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">18</span>
      <div>
        <span class="enum-name">Copper</span>
        <span class="enum-desc">Copper</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">19</span>
      <div>
        <span class="enum-name">Silver</span>
        <span class="enum-desc">Silver</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">20</span>
      <div>
        <span class="enum-name">Gold</span>
        <span class="enum-desc">Gold</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Command ====== -->
  <h2 id="commands">Command</h2>
  <p>BasicInformation has only one optional Command:</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>MfgSpecificPing</td>
          <td>Client &rarr; Server</td>
          <td>Optional</td>
          <td>Vendor-specific Ping command for detecting device response. No parameters, no return value</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Most Devices Do Not Implement MfgSpecificPing</div>
    <p>
      This is an <strong>optional</strong> command that very few devices actually implement.
      To check if a device is online, simply read any attribute (e.g. <code>SoftwareVersion</code>) —
      a successful read means the device is online.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A typical Matter device's BasicInformation Cluster read result:</p>

  <pre><code>{
  // --- Vendor Information ---
  "0x0": 17,                   // DataModelRevision = 17
  "0x1": "Acme Corp",          // VendorName
  "0x2": 65521,                // VendorID = 0xFFF1 (test vendor)
  "0x3": "Smart Light",        // ProductName
  "0x4": 32769,                // ProductID = 0x8001

  // --- Product Information ---
  "0x5": "Living Room Light",  // NodeLabel (user-defined name)
  "0x6": "CN",                 // Location = China
  "0xB": "2025-01-15",         // ManufacturingDate
  "0xC": "ABC-1234",           // PartNumber
  "0xD": "https://example.com/product",  // ProductURL
  "0xE": "Smart Light Pro",    // ProductLabel
  "0xF": "SN20250115001",      // SerialNumber
  "0x12": "a1b2c3d4e5f6",     // UniqueID

  // --- Version Information ---
  "0x7": 1,                    // HardwareVersion = 1
  "0x8": "v1.0",               // HardwareVersionString
  "0x9": 2,                    // SoftwareVersion = 2
  "0xA": "v2.0.1",             // SoftwareVersionString

  // --- Device Status ---
  "0x10": false,               // LocalConfigDisabled = false (local config enabled)
  "0x11": true,                // Reachable = true (device reachable)

  // --- Capabilities ---
  "0x13": {                    // CapabilityMinima
    "CaseSessionsPerFabric": 3,
    "SubscriptionsPerFabric": 3
  },
  "0x14": {                    // ProductAppearance
    "Finish": 1,               // Matte
    "PrimaryColor": 7          // Gray
  },
  "0x15": 65792,               // SpecificationVersion = 0x01010000 → 1.1.0.0
  "0x16": 1                    // MaxPathsPerInvoke = 1
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Typical Flow for Reading Device Information</div>
    <p>
      After the App first connects to a device, it typically reads BasicInformation to display the device details page:
    </p>
    <ol>
      <li>Read <code>VendorName (0x01)</code> + <code>ProductName (0x03)</code> as the device title</li>
      <li>Read <code>NodeLabel (0x05)</code> to display the user-defined name (if available)</li>
      <li>Read <code>SoftwareVersionString (0x0A)</code> to display the current firmware version</li>
      <li>Read <code>SerialNumber (0x0F)</code> for after-sales support or device management</li>
      <li>Read <code>Reachable (0x11)</code> to determine device online status (Bridged devices)</li>
    </ol>
    <p>
      Note that all reads must specify <code>endpointId = 0</code>, since BasicInformation only exists on the Root Node.
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
  'bridged-device-basic-information': {
    title: 'BridgedDeviceBasicInformation Cluster (0x0039)',
    description: 'Complete reference for Matter BridgedDeviceBasicInformation Cluster (0x0039) — bridged device vendor info, product identification, Reachable status, ReachableChanged event, and all attribute definitions with usage scenarios.',
    prev: { title: 'BasicInformation', slug: 'basic-information' },
    next: undefined,
    content: `<h1>BridgedDeviceBasicInformation Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0039</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Bridged sub-device's Endpoint (<code>Endpoint 1+</code>)
  </p>
  <p>
    BridgedDeviceBasicInformation is a subset version of <a href="../basic-information/">BasicInformation (0x0028)</a>,
    specifically for describing <strong>non-native devices connected to the Matter network through a Bridge</strong> —
    such as Zigbee temperature sensors, Z-Wave door locks, Bluetooth light bulbs, etc.
    These devices lack native Matter capabilities; the Bridge acts as their proxy to expose them as Matter nodes.
  </p>
  <p>
    Compared to BasicInformation, it <strong>removes</strong> several root-node-only attributes
    (such as <code>DataModelRevision</code>, <code>Location</code>, <code>CapabilityMinima</code>),
    <strong>retains</strong> information meaningful for sub-devices (vendor, version, serial number, etc.),
    and <strong>emphasizes the <code>Reachable</code> attribute and <code>ReachableChanged</code> event</strong> — the core mechanism for bridging scenarios.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Bridge Architecture Concept</div>
    <p>
      A Matter Bridge is a special Matter device: it is itself a native Matter node (BasicInformation on Endpoint 0),
      while simultaneously "mapping" the multiple non-Matter sub-devices it manages to different Endpoints.
      Each sub-device's Endpoint hosts a <code>BridgedDeviceBasicInformation</code> Cluster,
      rather than <code>BasicInformation</code>.
    </p>
    <p>
      For example, a Zigbee gateway bridging 3 sensors appears in the Matter network as:
    </p>
    <ul>
      <li><strong>Endpoint 0</strong>: Bridge itself — <code>BasicInformation</code> (gateway info)</li>
      <li><strong>Endpoint 1</strong>: Temperature Sensor — <code>BridgedDeviceBasicInformation</code></li>
      <li><strong>Endpoint 2</strong>: Humidity Sensor — <code>BridgedDeviceBasicInformation</code></li>
      <li><strong>Endpoint 3</strong>: Contact Sensor — <code>BridgedDeviceBasicInformation</code></li>
    </ul>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>BridgedDeviceBasicInformation has 17 attributes, a subset of BasicInformation. Organized into five groups:</p>

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
        <!-- Vendor Information -->
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>VendorName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Sub-device vendor name</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Sub-device vendor ID</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>ProductName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Sub-device product name</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td><a href="#group-vendor">Vendor Information</a></td>
          <td>Sub-device product ID</td>
        </tr>
        <!-- Product Information -->
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>NodeLabel</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>User-defined device name (writable)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>ManufacturingDate</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Manufacturing date (ISO 8601 format)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0C">
          <td><a href="#attr-0x0C"><code>0x0C</code></a></td>
          <td>PartNumber</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Part number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0D">
          <td><a href="#attr-0x0D"><code>0x0D</code></a></td>
          <td>ProductURL</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Product page URL</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0E">
          <td><a href="#attr-0x0E"><code>0x0E</code></a></td>
          <td>ProductLabel</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Product label (user-facing short name)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>SerialNumber</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Serial number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>UniqueID</td>
          <td>string</td>
          <td><a href="#group-product">Product Information</a></td>
          <td>Device unique identifier</td>
        </tr>
        <!-- Version Information -->
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Hardware version number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>HardwareVersionString</td>
          <td>string</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Hardware version string</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Software version number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>SoftwareVersionString</td>
          <td>string</td>
          <td><a href="#group-version">Version Information</a></td>
          <td>Software version string</td>
        </tr>
        <!-- Device Status -->
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>Reachable</td>
          <td>bool</td>
          <td><a href="#group-state">Device Status</a></td>
          <td>Whether the sub-device is currently reachable (core attribute)</td>
        </tr>
        <!-- Product Appearance -->
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>ProductAppearance</td>
          <td>struct</td>
          <td><a href="#group-appearance">Product Appearance</a></td>
          <td>Product appearance description (finish + color)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Differences from BasicInformation</div>
    <p>
      BridgedDeviceBasicInformation is a <strong>strict subset</strong> of BasicInformation, removing the following attributes:
    </p>
    <ul>
      <li><code>DataModelRevision (0x00)</code> — Bridged sub-devices don't directly participate in data model version negotiation</li>
      <li><code>Location (0x06)</code> — Sub-device location is managed centrally by the Bridge</li>
      <li><code>LocalConfigDisabled (0x10)</code> — Sub-devices have no Matter local configuration concept</li>
      <li><code>CapabilityMinima (0x13)</code> — Sub-devices don't directly handle CASE Sessions and Subscriptions</li>
      <li><code>SpecificationVersion (0x15)</code> — Sub-devices don't declare Matter specification versions</li>
      <li><code>MaxPathsPerInvoke (0x16)</code> — Sub-devices don't directly handle Invoke requests</li>
    </ul>
    <p>
      These "root-node-level" attributes are only meaningful on the Bridge's own Endpoint 0 (BasicInformation).
    </p>
  </div>

  <!-- ====== Vendor Information (0x01-0x04) ====== -->
  <h3 id="group-vendor">Vendor Information (0x01 – 0x04)</h3>
  <p>
    Original vendor and product identification of the sub-device. Note that vendor information here describes <strong>the bridged sub-device itself</strong>,
    not the Bridge gateway. For example, if an Aqara gateway bridges a Philips Hue light bulb,
    the VendorName here should be <code>"Philips"</code> not <code>"Aqara"</code>.
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
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>VendorName</td>
          <td>string</td>
          <td>Human-readable sub-device vendor name, max 32 characters. E.g. <code>"Philips"</code>, <code>"IKEA"</code></td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>Sub-device vendor number. If the original device isn't a Matter device (e.g. Zigbee), the Bridge may use a vendor-mapped value</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>ProductName</td>
          <td>string</td>
          <td>Sub-device product name, max 32 characters. E.g. <code>"Temperature Sensor"</code></td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td>Sub-device product number, mapped from original protocol information by the Bridge</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">How the Bridge Populates Vendor Information</div>
    <p>
      For Zigbee devices, the Bridge typically maps from the Zigbee Basic Cluster's <code>ManufacturerName</code>
      and <code>ModelIdentifier</code> to Matter's <code>VendorName</code> and <code>ProductName</code>.
      For Z-Wave devices, it maps from <code>Manufacturer ID</code> and <code>Product Type ID</code>.
      The mapping logic is implemented by the Bridge vendor; different gateways may map differently.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Product Information (0x05, 0x0B-0x0F, 0x12) ====== -->
  <h3 id="group-product">Product Information (0x05, 0x0B – 0x0F, 0x12)</h3>
  <p>
    Detailed product information for the sub-device. Most of these attributes are optional; the Bridge will do its best to extract and populate them from the original protocol.
    <code>NodeLabel</code> is the only writable attribute.
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
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>NodeLabel</td>
          <td>string</td>
          <td>User-defined device name, max 32 characters. <strong>Writable</strong> — this is the attribute modified when users rename a bridged sub-device in the App</td>
        </tr>
        <tr id="attr-0x0B">
          <td><code>0x0B</code></td>
          <td>ManufacturingDate</td>
          <td>string</td>
          <td>Manufacturing date, ISO 8601 format. Optional — many low-power sub-devices don't provide this information</td>
        </tr>
        <tr id="attr-0x0C">
          <td><code>0x0C</code></td>
          <td>PartNumber</td>
          <td>string</td>
          <td>Vendor's internal part/model number, max 32 characters. E.g. a Zigbee device's Model Identifier</td>
        </tr>
        <tr id="attr-0x0D">
          <td><code>0x0D</code></td>
          <td>ProductURL</td>
          <td>string</td>
          <td>Product page URL, max 256 characters. Optional</td>
        </tr>
        <tr id="attr-0x0E">
          <td><code>0x0E</code></td>
          <td>ProductLabel</td>
          <td>string</td>
          <td>User-facing product short name, max 64 characters. Suitable for display in App lists</td>
        </tr>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>SerialNumber</td>
          <td>string</td>
          <td>Sub-device serial number, max 32 characters. Bridge will populate if the original device has one</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>UniqueID</td>
          <td>string</td>
          <td>Sub-device globally unique identifier, max 32 characters. Bridge typically generates from the original device's IEEE address or similar unique ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">UniqueID Is Especially Important for Bridged Devices</div>
    <p>
      When the Bridge restarts or a sub-device rejoins, the Controller needs to identify "this is still the same device".
      <code>UniqueID</code> provides this stability — even if a sub-device's Endpoint number changes after a Bridge restart,
      the Controller can still match to the same physical device via <code>UniqueID</code>, preserving automation rules and room assignments.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Version Information (0x07-0x0A) ====== -->
  <h3 id="group-version">Version Information (0x07 – 0x0A)</h3>
  <p>Sub-device hardware and software version information. If the sub-device supports OTA (upgrade via original protocol), these version numbers reflect its current state.</p>

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
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td>Sub-device hardware version numeric code</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>HardwareVersionString</td>
          <td>string</td>
          <td>Human-readable hardware version, 1–64 characters</td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>Sub-device firmware version numeric code</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>SoftwareVersionString</td>
          <td>string</td>
          <td>Human-readable firmware version, 1–64 characters, e.g. <code>"v1.2.1"</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Device Status (0x11) ====== -->
  <h3 id="group-state">Device Status (0x11)</h3>
  <p>The most critical attribute in bridging scenarios — the sub-device's online status.</p>

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
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>Reachable</td>
          <td>bool</td>
          <td>
            Whether the Bridge can communicate normally with the sub-device. <code>true</code> = sub-device online and responding normally;
            <code>false</code> = sub-device offline, signal lost, battery depleted, or otherwise unreachable
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Reachable — The Core Mechanism for Bridging</div>
    <p>
      <code>Reachable</code> is the <strong>most important attribute</strong> in BridgedDeviceBasicInformation,
      and the key difference from BasicInformation.
    </p>
    <p>
      For devices directly connected to the Matter network, "online status" is determined by the Matter protocol stack's communication layer — receiving a reply means online.
      But bridged devices are different: Matter communication between Controller and Bridge may be perfectly normal,
      while the Zigbee/Z-Wave/Bluetooth link between Bridge and sub-device may have been disconnected.
    </p>
    <p>
      <code>Reachable</code> precisely reflects the status of the <strong>second half of the link</strong> (Bridge &harr; sub-device).
      When a sub-device goes offline:
    </p>
    <ol>
      <li>Bridge sets <code>Reachable</code> to <code>false</code></li>
      <li>Bridge triggers the <a href="#event-reachable-changed"><code>ReachableChanged</code></a> event</li>
      <li>Controllers subscribed to this event (e.g. phone App) can immediately mark the device as offline in the UI</li>
      <li>When the sub-device comes back online, the process reverses — <code>Reachable</code> returns to <code>true</code>, triggering the event again</li>
    </ol>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Product Appearance (0x14) ====== -->
  <h3 id="group-appearance">Product Appearance (0x14)</h3>
  <p>Physical appearance of the sub-device.</p>

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
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>ProductAppearance</td>
          <td>struct</td>
          <td>Physical appearance description, including finish and color (see struct and enum descriptions below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ProductAppearance Struct -->
  <h4 id="struct-product-appearance">ProductAppearance Struct</h4>
  <p>Describes the sub-device's physical appearance. Apps can use this for device icon color schemes.</p>
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
          <td>Finish</td>
          <td>ProductFinishEnum</td>
          <td>Product surface finish (see enum below)</td>
        </tr>
        <tr>
          <td>PrimaryColor</td>
          <td>ColorEnum</td>
          <td>Product primary color (see enum below). Nullable — <code>null</code> when not applicable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductFinishEnum (Surface Finish)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Matte</span>
        <span class="enum-desc">Matte</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Satin</span>
        <span class="enum-desc">Satin</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Polished</span>
        <span class="enum-desc">Polished</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rugged</span>
        <span class="enum-desc">Rugged (industrial)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Fabric</span>
        <span class="enum-desc">Fabric</span>
      </div>
    </div>
  </div>

  <h4>ColorEnum (Product Color)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Black</span>
        <span class="enum-desc">Black</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Navy</span>
        <span class="enum-desc">Navy</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Green</span>
        <span class="enum-desc">Green</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Teal</span>
        <span class="enum-desc">Teal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Maroon</span>
        <span class="enum-desc">Maroon</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Purple</span>
        <span class="enum-desc">Purple</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Olive</span>
        <span class="enum-desc">Olive</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Gray</span>
        <span class="enum-desc">Gray</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Blue</span>
        <span class="enum-desc">Blue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Lime</span>
        <span class="enum-desc">Lime</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Aqua</span>
        <span class="enum-desc">Aqua</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Red</span>
        <span class="enum-desc">Red</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">Fuchsia</span>
        <span class="enum-desc">Fuchsia</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">Yellow</span>
        <span class="enum-desc">Yellow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">14</span>
      <div>
        <span class="enum-name">White</span>
        <span class="enum-desc">White</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">Nickel</span>
        <span class="enum-desc">Nickel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">16</span>
      <div>
        <span class="enum-name">Chrome</span>
        <span class="enum-desc">Chrome</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">17</span>
      <div>
        <span class="enum-name">Brass</span>
        <span class="enum-desc">Brass</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">18</span>
      <div>
        <span class="enum-name">Copper</span>
        <span class="enum-desc">Copper</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">19</span>
      <div>
        <span class="enum-name">Silver</span>
        <span class="enum-desc">Silver</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">20</span>
      <div>
        <span class="enum-name">Gold</span>
        <span class="enum-desc">Gold</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Command ====== -->
  <h2 id="commands">Command</h2>
  <p>BridgedDeviceBasicInformation <strong>does not define any Commands</strong>.</p>

  <div class="callout callout-info">
    <div class="callout-title">Why No Commands?</div>
    <p>
      Unlike BasicInformation (which has an optional <code>MfgSpecificPing</code>),
      BridgedDeviceBasicInformation is purely an <strong>informational</strong> Cluster.
      All control operations on sub-devices (on/off, dimming, reading sensors, etc.) are done through their respective functional Clusters,
      not through the basic information Cluster. To check if a sub-device is online, simply read the <code>Reachable</code> attribute.
    </p>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>BridgedDeviceBasicInformation defines 4 events to notify Controllers of sub-device lifecycle and reachable status changes.</p>

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
        <tr id="event-startup">
          <td><code>0x00</code></td>
          <td>StartUp</td>
          <td>Critical</td>
          <td>
            Sub-device startup complete. Carries the <code>SoftwareVersion</code> field;
            Controller can use this to detect if firmware was upgraded while offline
          </td>
        </tr>
        <tr id="event-shutdown">
          <td><code>0x01</code></td>
          <td>ShutDown</td>
          <td>Critical</td>
          <td>Sub-device is shutting down. No additional fields</td>
        </tr>
        <tr id="event-leave">
          <td><code>0x02</code></td>
          <td>Leave</td>
          <td>Info</td>
          <td>Sub-device removed from Bridge (unpaired / unbound). No additional fields</td>
        </tr>
        <tr id="event-reachable-changed">
          <td><code>0x03</code></td>
          <td>ReachableChanged</td>
          <td>Info</td>
          <td>
            Sub-device reachable status has changed. Carries the <code>ReachableNewValue</code> (bool) field,
            indicating the new status after the change
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">ReachableChanged — A Must-Watch Event for Bridged Devices</div>
    <p>
      <code>ReachableChanged</code> is the <strong>most critical event</strong> in BridgedDeviceBasicInformation,
      and is unique to this Cluster (BasicInformation does not have this event).
    </p>
    <p>Typical trigger scenarios:</p>
    <ul>
      <li>Zigbee sub-device battery depleted &rarr; Bridge detects communication timeout &rarr; triggers <code>ReachableChanged(false)</code></li>
      <li>Z-Wave door lock signal recovered &rarr; Bridge receives response again &rarr; triggers <code>ReachableChanged(true)</code></li>
      <li>Bluetooth light bulb moved out of Bridge's Bluetooth range &rarr; triggers <code>ReachableChanged(false)</code></li>
    </ul>
    <p>
      <strong>App development tip</strong>: Subscribe to <code>ReachableChanged</code> events on all bridged sub-device Endpoints.
      Update device list online status icons immediately upon receiving events. Do not rely on polling the <code>Reachable</code> attribute —
      event-driven is more timely and resource-efficient.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of a BridgedDeviceBasicInformation Cluster from a temperature sensor connected via Zigbee Bridge:</p>

  <pre><code>{
  // --- Vendor Information ---
  "0x1": "Aqara",                // VendorName
  "0x2": 4447,                   // VendorID = 0x115F（Aqara）
  "0x3": "Temperature Sensor",   // ProductName
  "0x4": 514,                    // ProductID = 0x0202

  // --- Product Information ---
  "0x5": "Living Room Thermometer",          // NodeLabel (user-defined name)
  "0xB": "2024-08-20",           // ManufacturingDate
  "0xC": "WSDCGQ11LM",          // PartNumber
  "0xD": "https://www.aqara.com/sensor",  // ProductURL
  "0xE": "Aqara Temp Sensor",   // ProductLabel
  "0xF": "AQ20240820T001",      // SerialNumber
  "0x12": "aqara-wsdcgq11lm-001",  // UniqueID

  // --- Version Information ---
  "0x7": 2,                      // HardwareVersion = 2
  "0x8": "v2.0",                 // HardwareVersionString
  "0x9": 3,                      // SoftwareVersion = 3
  "0xA": "v1.2.1",               // SoftwareVersionString

  // --- Device Status ---
  "0x11": true,                  // Reachable = true (currently reachable)

  // --- Product Appearance ---
  "0x14": {                      // ProductAppearance
    "Finish": 1,                 // Matte
    "PrimaryColor": 14           // White
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Typical Flow for Reading Bridged Device Information</div>
    <p>
      After discovering a Bridge device, the App needs to enumerate all bridged sub-devices and retrieve their information:
    </p>
    <ol>
      <li>Read the <code>PartsList</code> from the <a href="../descriptor/"><code>Descriptor</code> Cluster</a> on Bridge's Endpoint 0 to get the list of all sub-device Endpoints</li>
      <li>For each sub-device Endpoint, read <code>BridgedDeviceBasicInformation</code>:
        <ul>
          <li><code>ProductName (0x03)</code> + <code>NodeLabel (0x05)</code> as the device display name</li>
          <li><code>Reachable (0x11)</code> to determine online status</li>
          <li><code>SoftwareVersionString (0x0A)</code> to display firmware version</li>
        </ul>
      </li>
      <li>Subscribe to <code>ReachableChanged</code> events on each sub-device Endpoint</li>
      <li>Note: reads target the <strong>sub-device's Endpoint</strong> (e.g. 1, 2, 3), not Endpoint 0</li>
    </ol>
  </div>

  <!-- ====== Usage Scenarios ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <h3>Scenario 1: Zigbee Gateway Bridging Multiple Sub-devices</h3>
  <p>
    A common Matter Bridge scenario: a Zigbee gateway (e.g. Aqara Hub M2) managing multiple Zigbee sub-devices simultaneously,
    exposing them to Apple Home / Google Home / Amazon Alexa via the Matter protocol.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Endpoint</th>
          <th>Device Type</th>
          <th>Cluster</th>
          <th>VendorName</th>
          <th>ProductName</th>
          <th>Reachable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>Bridge (gateway itself)</td>
          <td>BasicInformation</td>
          <td>Aqara</td>
          <td>Hub M2</td>
          <td>—</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Temperature Sensor</td>
          <td>BridgedDeviceBasicInfo</td>
          <td>Aqara</td>
          <td>Temp Sensor</td>
          <td>true</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Contact Sensor</td>
          <td>BridgedDeviceBasicInfo</td>
          <td>Aqara</td>
          <td>Door Sensor</td>
          <td>true</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Smart Plug</td>
          <td>BridgedDeviceBasicInfo</td>
          <td>IKEA</td>
          <td>TRADFRI Plug</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    Note that Endpoint 3's <code>Reachable</code> is <code>false</code> —
    this means the IKEA smart plug is currently unreachable (possibly due to signal issues or power loss).
    The App should mark it as offline in the device list.
  </p>

  <h3>Scenario 2: Reachable Status Monitoring</h3>
  <p>
    The App needs to track bridged sub-device online status in real-time for accurate UI feedback and reliable automation execution.
  </p>
  <div class="callout callout-info">
    <div class="callout-title">Monitoring Flow</div>
    <ol>
      <li>
        <strong>Initialization</strong>: After connecting to the Bridge, read <code>Reachable</code> attributes on all sub-device Endpoints
        to establish the initial online status table
      </li>
      <li>
        <strong>Subscribe</strong>: Subscribe to <code>ReachableChanged</code> events on each sub-device Endpoint
      </li>
      <li>
        <strong>Respond</strong>: Upon receiving a <code>ReachableChanged</code> event:
        <ul>
          <li>If <code>ReachableNewValue = false</code>: grey out device list, disable control buttons, notify user</li>
          <li>If <code>ReachableNewValue = true</code>: restore device icon, enable control buttons</li>
        </ul>
      </li>
      <li>
        <strong>Automation</strong>: Before executing automations involving bridged devices, first check <code>Reachable</code>,
        to avoid timeouts from sending commands to unreachable devices
      </li>
    </ol>
  </div>

  <h3>Scenario 3: Device Identification and Deduplication</h3>
  <p>
    After a Bridge restart or firmware upgrade, sub-device Endpoint numbers may change.
    The App needs to correctly identify "this is still the same device" to avoid duplicates or lost user configurations.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Identification Strategy</div>
    <p>Recommended device identification priority:</p>
    <ol>
      <li>
        <strong><code>UniqueID (0x12)</code></strong> (highest priority): Globally unique and unchanged after Bridge restart.
        Bridge typically uses the sub-device's Zigbee IEEE address (e.g. <code>00:15:8d:00:02:3a:4b:5c</code>)
        or Z-Wave DSK to generate it
      </li>
      <li>
        <strong><code>SerialNumber (0x0F)</code></strong>: Can serve as a secondary identifier if the sub-device provides a serial number
      </li>
      <li>
        <strong><code>VendorID + ProductID</code></strong>: Can only identify product models, not distinguish between different devices of the same model.
        When used with Endpoint numbers, note that Endpoints may change after Bridge restart
      </li>
    </ol>
    <p>
      <strong>Best practice</strong>: Use <code>UniqueID</code> as the primary key for storing device information.
      When re-enumerating sub-devices after a Bridge restart, match existing records using <code>UniqueID</code>,
      correctly restoring room assignments, device names, and automation rules even if Endpoint numbers changed.
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
  'power-source': {
    title: 'PowerSource Cluster (0x002F)',
    description: 'Complete reference for Matter PowerSource Cluster (0x002F) — battery level (BatPercentRemaining must be divided by 2), charge state, wired power parameters, battery specifications, and all attribute definitions with enum value quick reference.',
    prev: { title: 'DoorLock', slug: 'door-lock' },
    next: { title: 'OnOff', slug: 'on-off' },
    content: `<h1>PowerSource Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002F</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (functional endpoint)
  </p>
  <p>
    PowerSource describes the device's power information, including power status, wired power parameters, battery level, and charging information.
    This Cluster is <strong>read-only</strong> — no Commands, only Attributes.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Battery Level Calculation Pitfall</div>
    <p>
      The <code>BatPercentRemaining</code> value must be <strong>divided by 2</strong> to get the actual percentage.
      For example, if the device returns <code>200</code>, the actual level is <code>100%</code>; <code>150</code> means <code>75%</code>.
      If the raw value is displayed directly as a percentage, users will see "200%" battery level.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>PowerSource attributes are organized into five groups. Click an attribute ID to jump to its detailed description.</p>

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
        <!-- Status Information -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Status</td>
          <td>enum8</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>Power status</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>Order</td>
          <td>uint8</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>Power priority order</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>Description</td>
          <td>string</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>Power description text</td>
        </tr>
        <!-- Wired Power -->
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>WiredAssessedInputVoltage</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Assessed input voltage (mV)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>WiredAssessedInputFrequency</td>
          <td>uint16</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Assessed input frequency (Hz)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>WiredCurrentType</td>
          <td>enum8</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Current type (AC/DC)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>WiredAssessedCurrent</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Assessed current (mA)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>WiredNominalVoltage</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Nominal voltage (mV)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>WiredMaximumCurrent</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Maximum current (mA)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>WiredPresent</td>
          <td>bool</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Whether wired power is connected</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>ActiveWiredFaults</td>
          <td>list</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>Current wired power fault list</td>
        </tr>
        <!-- Battery Basics -->
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>BatVoltage</td>
          <td>uint32</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Battery voltage (mV)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0C">
          <td><a href="#attr-0x0C"><code>0x0C</code></a></td>
          <td>BatPercentRemaining</td>
          <td>uint8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Battery remaining percentage (divide by 2)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0D">
          <td><a href="#attr-0x0D"><code>0x0D</code></a></td>
          <td>BatTimeRemaining</td>
          <td>uint32</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Estimated remaining time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0E">
          <td><a href="#attr-0x0E"><code>0x0E</code></a></td>
          <td>BatChargeLevel</td>
          <td>enum8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Battery charge level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>BatReplacementNeeded</td>
          <td>bool</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Whether battery replacement is needed</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>BatReplaceability</td>
          <td>enum8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Battery replaceability</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>BatPresent</td>
          <td>bool</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Whether battery is present</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>ActiveBatFaults</td>
          <td>list</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Current battery fault list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>BatReplacementDescription</td>
          <td>string</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>Battery replacement description</td>
        </tr>
        <!-- Battery Specifications -->
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>BatCommonDesignation</td>
          <td>enum16</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>Battery common designation code</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>BatANSIDesignation</td>
          <td>string</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>ANSI designation</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>BatIECDesignation</td>
          <td>string</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>IEC designation</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>BatApprovedChemistry</td>
          <td>enum16</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>Battery chemistry type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>BatCapacity</td>
          <td>uint32</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>Battery capacity (mAh)</td>
        </tr>
        <!-- Charging Information -->
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>BatQuantity</td>
          <td>uint8</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Battery quantity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>BatChargeState</td>
          <td>enum8</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Charge state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>BatTimeToFullCharge</td>
          <td>uint32</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Estimated time to full charge (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>BatFunctionalWhileCharging</td>
          <td>bool</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Whether device is functional while charging</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1D">
          <td><a href="#attr-0x1D"><code>0x1D</code></a></td>
          <td>BatChargingCurrent</td>
          <td>uint32</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Charging current (mA)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>ActiveBatChargeFaults</td>
          <td>list</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>Current charging fault list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1F">
          <td><a href="#attr-0x1F"><code>0x1F</code></a></td>
          <td>EndpointList</td>
          <td>list</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>List of Endpoints powered by this source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Status Information (0x00-0x02) ====== -->
  <h3 id="group-status">Status Information (0x00 – 0x02)</h3>
  <p>Required base attributes for every PowerSource instance, describing the power source's current state and identity.</p>

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
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>Status</td>
          <td>enum8</td>
          <td>Current power source operating state (see enum below)</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>Order</td>
          <td>uint8</td>
          <td>Power source priority. When a device has multiple sources, lower value = higher priority</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>Description</td>
          <td>string</td>
          <td>Power source description text, e.g. <code>"Battery"</code>, <code>"USB-C"</code>, <code>"DC Power"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Status Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Active</span>
        <span class="enum-desc">Actively powering (normal operating state)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Standby</span>
        <span class="enum-desc">Standby (not the primary power source)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Unavailable</span>
        <span class="enum-desc">Unavailable (battery removed or power fault)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Wired Power (0x03-0x0A) ====== -->
  <h3 id="group-wired">Wired Power (0x03 – 0x0A)</h3>
  <p>Describes wired power source electrical parameters and status. These attributes are only meaningful when the power source type is wired.</p>
  <div class="callout callout-info">
    <div class="callout-title">Applicable Scope</div>
    <p>
      Most battery-powered devices (e.g. door locks, sensors) do not report wired power attributes.
      These attributes mainly appear on devices powered by AC/DC adapters, USB, or PoE.
    </p>
  </div>

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
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>WiredAssessedInputVoltage</td>
          <td>uint32</td>
          <td>Actual assessed voltage of wired input, in mV</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>WiredAssessedInputFrequency</td>
          <td>uint16</td>
          <td>Actual assessed frequency of wired input, in Hz. Only meaningful for AC power</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>WiredCurrentType</td>
          <td>enum8</td>
          <td>Current type: <code>0</code> = AC, <code>1</code> = DC</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>WiredAssessedCurrent</td>
          <td>uint32</td>
          <td>Actual assessed current of wired input, in mA</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>WiredNominalVoltage</td>
          <td>uint32</td>
          <td>Nominal voltage of wired power source, in mV</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>WiredMaximumCurrent</td>
          <td>uint32</td>
          <td>Maximum current supported by wired power source, in mA</td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>WiredPresent</td>
          <td>bool</td>
          <td>Whether wired power is connected. <code>true</code> = plugged in, <code>false</code> = not connected</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>ActiveWiredFaults</td>
          <td>list</td>
          <td>Active fault list for the wired power source, such as overvoltage, overcurrent, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Battery Basics (0x0B-0x13) ====== -->
  <h3 id="group-battery-basic">Battery Basics (0x0B – 0x13)</h3>
  <p>The most commonly used attribute group for battery-powered devices — Apps rely on these for displaying battery level and low-battery alerts.</p>

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
        <tr id="attr-0x0B">
          <td><code>0x0B</code></td>
          <td>BatVoltage</td>
          <td>uint32</td>
          <td>Current battery voltage, in mV</td>
        </tr>
        <tr id="attr-0x0C">
          <td><code>0x0C</code></td>
          <td>BatPercentRemaining</td>
          <td>uint8</td>
          <td>Battery remaining percentage. <strong>Actual percentage = value / 2</strong>, range 0~200 maps to 0%~100%. Nullable; returns <code>null</code> when device doesn't support precise level</td>
        </tr>
        <tr id="attr-0x0D">
          <td><code>0x0D</code></td>
          <td>BatTimeRemaining</td>
          <td>uint32</td>
          <td>Estimated battery remaining time, in seconds. Nullable</td>
        </tr>
        <tr id="attr-0x0E">
          <td><code>0x0E</code></td>
          <td>BatChargeLevel</td>
          <td>enum8</td>
          <td>Battery charge level (see enum below)</td>
        </tr>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>BatReplacementNeeded</td>
          <td>bool</td>
          <td>Whether battery needs replacement. <code>true</code> = should be replaced soon</td>
        </tr>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>BatReplaceability</td>
          <td>enum8</td>
          <td>Battery replaceability method (see enum below)</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>BatPresent</td>
          <td>bool</td>
          <td>Whether battery is installed. <code>true</code> = installed</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>ActiveBatFaults</td>
          <td>list</td>
          <td>Active fault list for the battery, such as overheating, voltage anomaly, etc.</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>BatReplacementDescription</td>
          <td>string</td>
          <td>Battery replacement instructions, including model and specifications, e.g. <code>"4x AA"</code>, <code>"CR2032"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>BatChargeLevel Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">Battery level normal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">Low battery warning</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Critically low battery, requires immediate attention</span>
      </div>
    </div>
  </div>

  <h4>BatReplaceability Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NotReplaceable</span>
        <span class="enum-desc">Not replaceable (built-in battery)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UserReplaceable</span>
        <span class="enum-desc">User replaceable</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">FactoryReplaceable</span>
        <span class="enum-desc">Factory replaceable (requires professional service)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Battery Specifications (0x14-0x18) ====== -->
  <h3 id="group-battery-spec">Battery Specifications (0x14 – 0x18)</h3>
  <p>Describes specific battery model and technical specifications to guide users in selecting the correct replacement battery.</p>

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
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>BatCommonDesignation</td>
          <td>enum16</td>
          <td>Battery common designation numeric code, e.g. AA=15, AAA=10, CR2032=40, etc.</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>BatANSIDesignation</td>
          <td>string</td>
          <td>Battery's ANSI standard designation</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>BatIECDesignation</td>
          <td>string</td>
          <td>Battery's IEC standard designation</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>BatApprovedChemistry</td>
          <td>enum16</td>
          <td>Battery chemistry type, e.g. Alkaline=1, LithiumIon=6, etc.</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>BatCapacity</td>
          <td>uint32</td>
          <td>Battery capacity, in mAh</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>BatCommonDesignation Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">AAA</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">AA</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">17</span>
      <div>
        <span class="enum-name">C</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">18</span>
      <div>
        <span class="enum-name">D</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">40</span>
      <div>
        <span class="enum-name">CR2032</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">41</span>
      <div>
        <span class="enum-name">CR2025</span>
      </div>
    </div>
  </div>

  <h4>BatApprovedChemistry Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Alkaline</span>
        <span class="enum-desc">Alkaline</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">LithiumIon</span>
        <span class="enum-desc">Lithium-Ion</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">LithiumPolymer</span>
        <span class="enum-desc">Lithium Polymer</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">NickelMetalHydride</span>
        <span class="enum-desc">Nickel Metal Hydride</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Charging Information (0x19-0x1F) ====== -->
  <h3 id="group-charging">Charging Information (0x19 – 0x1F)</h3>
  <p>Describes battery charging status, charging parameters, and the mapping between power sources and Endpoints.</p>

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
        <tr id="attr-0x19">
          <td><code>0x19</code></td>
          <td>BatQuantity</td>
          <td>uint8</td>
          <td>Number of batteries used by the device</td>
        </tr>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>BatChargeState</td>
          <td>enum8</td>
          <td>Current charge state (see enum below)</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>BatTimeToFullCharge</td>
          <td>uint32</td>
          <td>Estimated time to full charge, in seconds. Nullable</td>
        </tr>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>BatFunctionalWhileCharging</td>
          <td>bool</td>
          <td>Whether the device remains functional while charging. <code>true</code> = functional</td>
        </tr>
        <tr id="attr-0x1D">
          <td><code>0x1D</code></td>
          <td>BatChargingCurrent</td>
          <td>uint32</td>
          <td>Current charging current, in mA</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>ActiveBatChargeFaults</td>
          <td>list</td>
          <td>Active fault list during charging</td>
        </tr>
        <tr id="attr-0x1F">
          <td><code>0x1F</code></td>
          <td>EndpointList</td>
          <td>list</td>
          <td>List of Endpoint numbers powered by this source. Used to identify which functional endpoints a power source supplies</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>BatChargeState Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Charge state unknown</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">IsCharging</span>
        <span class="enum-desc">Charging</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">IsAtFullCharge</span>
        <span class="enum-desc">Fully charged</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">IsNotCharging</span>
        <span class="enum-desc">Not charging (typical for non-rechargeable battery devices)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A typical battery-powered device's PowerSource Cluster read result:</p>

  <pre><code>{
  // --- Status Information ---
  "0x0": 1,                  // Status = Active (currently powering)
  "0x1": 0,                  // Order = 0 (highest priority)
  "0x2": "Battery",          // Description = "Battery"

  // --- Battery Basics ---
  "0xB": 3200,               // BatVoltage = 3200 mV
  "0xC": 180,                // BatPercentRemaining = 180 → actual 90%
  "0xD": 7776000,            // BatTimeRemaining = 7776000 seconds (approx. 90 days)
  "0xE": 0,                  // BatChargeLevel = OK
  "0xF": false,              // BatReplacementNeeded = false
  "0x10": 2,                 // BatReplaceability = UserReplaceable
  "0x11": true,              // BatPresent = true (battery installed)
  "0x13": "4x AA",           // BatReplacementDescription

  // --- Battery Specifications ---
  "0x14": 15,                // BatCommonDesignation = 15（AA）
  "0x18": 2800,              // BatCapacity = 2800 mAh

  // --- Charging Information ---
  "0x1A": 3                  // BatChargeState = IsNotCharging (non-rechargeable battery)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Battery Level Display Logic</div>
    <p>
      Typical processing flow when displaying battery information:
    </p>
    <ol>
      <li>Read <code>BatPercentRemaining (0x0C)</code>, <strong>divide by 2</strong> to get percentage</li>
      <li>Determine icon color based on <code>BatChargeLevel (0x0E)</code>: OK = green, Warning = yellow, Critical = red</li>
      <li>If <code>BatReplacementNeeded (0x0F)</code> is <code>true</code>, show an additional replacement prompt</li>
      <li>Note that <code>BatPercentRemaining</code> is <strong>Nullable</strong> and may be <code>null</code> (when device doesn't support precise levels); in that case, use <code>BatChargeLevel</code> for a rough display</li>
    </ol>
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
  'power-source-configuration': {
    title: 'PowerSourceConfiguration Cluster (0x002E)',
    description: 'Complete reference for Matter PowerSourceConfiguration Cluster (0x002E) — Sources attribute details, coordination with PowerSource Cluster, power endpoint mapping, and priority mechanism.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>PowerSourceConfiguration Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002E</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Node)
  </p>
  <p>
    PowerSourceConfiguration is an extremely simple Cluster — only <strong>one attribute, no commands</strong>.
    Its sole purpose is to tell you: which Endpoints hold this device's power information and their priority order.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with PowerSource</div>
    <p>
      These two Clusters work as partners with a clear division of labor:
    </p>
    <ul>
      <li><strong>PowerSourceConfiguration</strong> (this page) — on Endpoint 0, answers "where is the power information": which Endpoints host a PowerSource Cluster and their priority order</li>
      <li><strong>PowerSource</strong> (<a href="../power-source/">0x002F</a>) — on functional Endpoints, answers "what is the power status": battery level, charging state, voltage, etc.</li>
    </ul>
    <p>
      Typical App flow: first read PowerSourceConfiguration to get the endpoint list → then read PowerSource on each corresponding Endpoint for actual data.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>PowerSourceConfiguration has only one attribute, which is mandatory.</p>

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
          <td>Sources</td>
          <td>list&lt;endpoint-no&gt;</td>
          <td>Read-only</td>
          <td>List of endpoints hosting PowerSource Cluster, sorted by priority</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">Sources (Power Endpoint List)</h3>
  <p>
    An <strong>ordered list</strong> where each element is an Endpoint number pointing to an endpoint hosting a PowerSource Cluster.
    The list order represents priority: <strong>the first element is the primary power source</strong>, followed by backup sources in order.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Why This List Is Needed</div>
    <p>
      A device may have multiple power sources (mains + battery, USB + solar), with each source's detailed information on a different Endpoint.
      The Sources list serves as a "directory" of these Endpoints, so the App doesn't need to iterate all Endpoints to guess which has power information —
      simply read this list to know which Endpoints to query for data.
    </p>
  </div>
  <p>
    An empty list means the device hasn't reported any power information. Endpoint numbers in the list align with the Descriptor Cluster's PartsList.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== No Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    PowerSourceConfiguration has <strong>no commands</strong>. It is a purely read-only configuration Cluster; all information is obtained by reading the Sources attribute.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the PowerSourceConfiguration Cluster on Endpoint 0:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": [1, 2]    // Sources = [Endpoint 1, Endpoint 2]
                    // Priority: Endpoint 1 is primary, Endpoint 2 is backup
}</code></pre>

  <!-- ====== Scenario 1 ====== -->
  <h2 id="scenario-single">Scenario 1: Single Power Source Device (Battery Door Lock)</h2>
  <p>
    A battery-powered smart door lock with only one power source. PowerSourceConfiguration's Sources list contains only one Endpoint;
    the App goes directly to that Endpoint to read PowerSource for battery level.
  </p>
  <pre><code>// Scenario 1: Simple device with only one power source (e.g. battery door lock)
// Endpoint 0 — PowerSourceConfiguration
{
  "0x0": [1]       // Sources = [Endpoint 1]
                   // Only one power source; see details in Endpoint 1's PowerSource Cluster
}

// Endpoint 1 — PowerSource (read battery level here)
{
  "0x0": 1,        // Status = Active
  "0x1": 0,        // Order = 0 (only power source)
  "0x2": "Battery",
  "0xC": 180       // BatPercentRemaining = 180 → actual 90%
}</code></pre>
  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      For devices with only one power source, the Sources list length is 1 and App logic can be simplified — just read the first Endpoint's PowerSource directly, no need for priority display or switching logic.
    </p>
  </div>

  <!-- ====== Scenario 2 ====== -->
  <h2 id="scenario-multi">Scenario 2: Dual Power Source Device (UPS Gateway)</h2>
  <p>
    A gateway device supporting both mains and built-in battery power. PowerSourceConfiguration lists two Endpoints;
    the first is mains (primary), the second is battery (backup). During power outage, the device automatically switches to battery, and the App can display the current power status accordingly.
  </p>
  <pre><code>// Scenario 2: Dual power source device (e.g. UPS-powered gateway)
// Endpoint 0 — PowerSourceConfiguration
{
  "0x0": [1, 2]    // Sources = [Endpoint 1, Endpoint 2]
                   // Endpoint 1 has higher priority (primary), Endpoint 2 is backup
}

// Endpoint 1 — PowerSource (primary: mains)
{
  "0x0": 1,        // Status = Active (currently powering)
  "0x1": 0,        // Order = 0 (highest priority)
  "0x2": "Mains"   // Description = "Mains"
}

// Endpoint 2 — PowerSource (backup: built-in battery)
{
  "0x0": 0,        // Status = Unspecified (on standby)
  "0x1": 1,        // Order = 1 (secondary priority)
  "0x2": "Battery",
  "0xC": 200       // BatPercentRemaining = 200 → actual 100%
}</code></pre>
  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      In dual power source scenarios, the App can handle it as follows:
    </p>
    <ol>
      <li>Read the Sources list and iterate each Endpoint's PowerSource</li>
      <li>Check each source's <code>Status</code> attribute to find the currently <code>Active</code> one</li>
      <li>If the primary source (first in list) is not Active, the device is using backup power and the user should be notified</li>
      <li>Subscribe to each PowerSource's <code>Status</code> changes for real-time power switching awareness</li>
    </ol>
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
  'fixed-label': {
    title: 'FixedLabel Cluster (0x0040)',
    description: 'Complete reference for Matter Fixed Label Cluster (0x0040) — LabelList attribute, LabelStruct structure, reading and usage scenarios for factory labels. Read-only key-value pair labels written at manufacturing time.',
    prev: undefined,
    next: undefined,
    content: `<h1>Fixed Label Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0040</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root) or functional Endpoints
  </p>
  <p>
    Fixed Label stores labels (key-value pairs) written to the device at manufacturing time, describing physical attributes or preset categories.
    These labels are <strong>read-only</strong> — neither users nor Apps can modify them.
    Label content is determined by the manufacturer during production, such as preset room, floor, orientation, etc.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with UserLabel</div>
    <p>
      Fixed Label (<code>0x0040</code>) contains read-only factory labels; UserLabel (<code>0x0041</code>) contains user-writable custom labels.
      Both share the exact same structure (using <code>LabelStruct</code>); the only difference is who can modify them —
      Fixed Label is written and locked by the manufacturer at the factory; UserLabel can be modified by users at any time.
      Apps typically merge both, using factory labels as defaults and user labels as overrides.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Fixed Label has only one attribute — very simple.</p>

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
          <td>LabelList</td>
          <td>list&lt;LabelStruct&gt;</td>
          <td>Read-only</td>
          <td>Factory label list (key-value pair array)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">LabelList (Factory Label List)</h3>
  <p>
    A <code>LabelStruct</code> array where each element is a key-value pair. The list can be empty (device has no preset labels),
    or contain multiple entries. Label keys should <strong>not be duplicated</strong> within the same list.
  </p>
  <p>
    This attribute is read-only; content is fixed after device startup. For writable labels, use the UserLabel Cluster (<code>0x0041</code>).
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">An Empty List Is Valid</div>
    <p>
      Not all devices have factory labels. Many devices return an empty array <code>[]</code> for <code>LabelList</code>;
      this is perfectly normal. Apps should handle the empty list case and not assume label data is always present.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LabelStruct Struct ====== -->
  <h2 id="label-struct">LabelStruct Structure</h2>
  <p>
    <code>LabelStruct</code> is the shared data structure for Fixed Label and UserLabel, defining a label's key and value.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Max Length</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Label</code></td>
          <td>string</td>
          <td>16 chars</td>
          <td>Label key, describing what the label means (e.g. "room", "floor")</td>
        </tr>
        <tr>
          <td><code>Value</code></td>
          <td>string</td>
          <td>16 chars</td>
          <td>Label value, the specific content for the key (e.g. "kitchen", "2")</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Common Factory Label Examples</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">room</span>
      <div>
        <span class="enum-name">Room</span>
        <span class="enum-desc">e.g. "kitchen", "bedroom", "living room"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">floor</span>
      <div>
        <span class="enum-name">Floor</span>
        <span class="enum-desc">e.g. "1", "2", "B1"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">orientation</span>
      <div>
        <span class="enum-name">Orientation</span>
        <span class="enum-desc">e.g. "N", "S", "NE"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">position</span>
      <div>
        <span class="enum-name">Position</span>
        <span class="enum-desc">e.g. "left", "right", "top"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">zone</span>
      <div>
        <span class="enum-name">Zone</span>
        <span class="enum-desc">e.g. "A", "B", "public"</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Label Keys Are Not Strictly Standardized</div>
    <p>
      The Matter specification does not define a fixed list of label keys; the above are just common usages.
      Manufacturers can use any string as a key, as long as it doesn't exceed 16 characters.
      Apps should not hardcode dependencies on specific keys; instead, they should gracefully display any key-value pair.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Fixed Label Cluster has <strong>no commands</strong>. This is a pure data Cluster —
    it only provides read-only attributes for Apps to read, accepting no write or action commands.
    To modify labels, use the UserLabel Cluster (<code>0x0041</code>).
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading Fixed Label attributes of a kitchen sensor device:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": [                    // LabelList — Factory label list
    {
      "Label": "room",        // Label key: room
      "Value": "kitchen"      // Label value: kitchen
    },
    {
      "Label": "floor",       // Label key: floor
      "Value": "2"            // Label value: 2nd floor
    },
    {
      "Label": "orientation", // Label key: orientation
      "Value": "N"            // Label value: north
    }
  ]
}</code></pre>

  <!-- ====== Usage Scenarios ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <h3 id="scenario-1">Scenario 1: Automatically Assign Device to Room</h3>
  <p>
    After commissioning, the App reads the device's factory labels. If the labels contain a <code>room</code> key,
    the App can automatically categorize the device to the corresponding room, saving the user from manual selection.
  </p>
  <pre><code>// Scenario: App reads factory labels and auto-assigns to room
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x0040",
      "attributeId": "0x00"     // LabelList
    }
  }]
}

// Response
{
  "attributeReports": [{
    "attributeData": {
      "dataVersion": 1,
      "data": [
        { "Label": "room", "Value": "kitchen" },
        { "Label": "floor", "Value": "2" }
      ]
    }
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      Automatically read Fixed Label after commissioning. Use known keys (room, floor) for initial grouping suggestions,
      but always let users confirm or modify. Factory labels are just a reference; the actual installation location may differ.
    </p>
  </div>

  <h3 id="scenario-2">Scenario 2: Distinguishing Sub-functions in Multi-Endpoint Devices</h3>
  <p>
    A dual-switch has two Endpoints, each with Fixed Labels marking the physical position (left/right).
    After reading labels, the App can directly label them as "Left Switch" and "Right Switch" in the UI, instead of showing meaningless Endpoint numbers.
  </p>
  <pre><code>// Scenario: Multi-Endpoint device, each Endpoint with different factory labels
// Endpoint 1 — Left Switch
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0040",
      "attributeId": "0x00"
    }
  }]
}
// Returns: [{ "Label": "position", "Value": "left" }]

// Endpoint 2 — Right Switch
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 2,
      "clusterId": "0x0040",
      "attributeId": "0x00"
    }
  }]
}
// Returns: [{ "Label": "position", "Value": "right" }]</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      For multi-Endpoint devices, read Fixed Labels from each Endpoint individually.
      If a <code>position</code> key exists in the labels, use it to label the sub-device name in the UI,
      providing users with a more intuitive control interface.
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
  'user-label': {
    title: 'UserLabel Cluster (0x0041)',
    description: 'Complete reference for Matter UserLabel Cluster (0x0041) — LabelList attribute, LabelStruct structure, differences from FixedLabel, and usage scenarios for user-defined device labels.',
    prev: undefined,
    next: undefined,
    content: `<h1>UserLabel Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0041</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 0</code> (Root) or functional endpoints &nbsp;|&nbsp;
    <strong>Role</strong>: Server (read/write, no commands)
  </p>
  <p>
    UserLabel allows users or Apps to tag devices with custom key-value pair labels for classification, grouping, notes, etc.
    This is an extremely simple Cluster — <strong>0 commands</strong>, <strong>0 events</strong>,
    with only <strong>1 writable attribute</strong> <code>LabelList</code>, managing labels through direct attribute writes.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">UserLabel vs FixedLabel</div>
    <p>
      Matter has two label Clusters, differing in who can modify them:
    </p>
    <ul>
      <li><strong>FixedLabel (0x0040)</strong> — Labels written by the manufacturer at factory, <strong>read-only</strong>, Apps cannot modify. E.g. <code>"room"/"factory-default"</code>, <code>"model"/"v2"</code></li>
      <li><strong>UserLabel (0x0041)</strong> — User-defined labels, <strong>read/write</strong>, Apps can add/remove/modify at any time. E.g. <code>"zone"/"living-room"</code>, <code>"owner"/"alice"</code></li>
    </ul>
    <p>
      Both share the same data structure (<code>LabelStruct</code> list); they differ only in read/write permissions.
      When reading device labels, merge results from both Clusters: FixedLabel provides vendor defaults, UserLabel provides user customizations.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Per-Fabric Isolation</div>
    <p>
      UserLabel's labels are <strong>per-fabric (isolated by Fabric)</strong>.
      Each Fabric can only see and modify its own labels; it cannot access other Fabrics' labels.
      For example, <code>"zone"/"kitchen"</code> written via Apple Home is not visible on Google Home.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>UserLabel has only one attribute, which is mandatory.</p>

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
          <td>LabelList</td>
          <td>list&lt;LabelStruct&gt;</td>
          <td>Read/Write</td>
          <td>User-defined label list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">LabelList (Label List)</h3>
  <p>
    A list of <code>LabelStruct</code>, where each element is a Label (key) + Value (value) string pair.
    Apps add/remove/modify labels via <strong>Write Attribute</strong> operations — each write is a <strong>full replacement</strong>,
    not an append. To add a new label, first read the existing list, append, then write the entire list back.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">No Commands, All Attribute Writes</div>
    <p>
      UserLabel defines no commands. All operations (add, modify, delete labels) are done by writing the <code>LabelList</code> attribute.
      This is one of the few "purely attribute-driven" Clusters in Matter. Note the full-replacement semantics — omitting an existing label is equivalent to deleting it.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LabelStruct Struct ====== -->
  <h2 id="label-struct">LabelStruct Structure</h2>
  <p>
    <code>LabelStruct</code> is the shared data structure for UserLabel and FixedLabel, representing a key-value pair label.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Constraint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>Label</td>
          <td>string</td>
          <td>Max 16 chars</td>
          <td>Label key name, e.g. <code>"zone"</code>, <code>"owner"</code></td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>Value</td>
          <td>string</td>
          <td>Max 16 chars</td>
          <td>Label value, e.g. <code>"living-room"</code>, <code>"alice"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Length Limit</div>
    <p>
      Both Label and Value have a hard limit of <strong>max 16 characters</strong>.
      Apps should validate before writing; exceeding the length limit will be rejected by the device (returning <code>CONSTRAINT_ERROR</code>).
      It is recommended to use short English abbreviations as key names. Values can use characters from any language, but note the character length (Matter counts by characters, not bytes, so 16 characters of any language are allowed).
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading UserLabel Cluster attributes of a smart light:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": [                    // LabelList (label list)
    {
      "0": "zone",            // Label = "zone"
      "1": "living-room"      // Value = "living-room"
    },
    {
      "0": "owner",           // Label = "owner"
      "1": "alice"            // Value = "alice"
    },
    {
      "0": "floor",           // Label = "floor"
      "1": "2F"               // Value = "2F"
    }
  ]
}</code></pre>

  <p>Writing labels (Write Attribute request):</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0041",
      "attributeId": "0x00"       // LabelList
    },
    "data": [
      { "0": "zone",  "1": "living-room" },
      { "0": "owner", "1": "alice" },
      { "0": "floor", "1": "2F" }
    ]
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      The write attribute flow is a three-step <strong>read → modify → write</strong> process:
    </p>
    <ol>
      <li>First Read Attribute to get the current <code>LabelList</code></li>
      <li>Modify the list locally (add / remove / change a label)</li>
      <li>Write the complete list back to the device via Write Attribute</li>
    </ol>
    <p>
      Writing a new list without reading first will lose labels previously written by other Apps.
      If multiple Apps may operate on labels simultaneously, consider adding optimistic locking logic (record version on read, verify before write).
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Group Devices by Zone</summary>
    <div class="scenario-content">
      <p>
        A user has multiple devices of the same type (e.g. 5 smart light bulbs) and needs to organize them by room, floor, etc.
        By tagging each device with location labels via UserLabel, the App can display them grouped by label.
      </p>
      <ol>
        <li>After commissioning, guide users to set zone labels for devices</li>
        <li>Write labels: <code>{'{"zone": "living-room", "floor": "1F"}'}</code></li>
        <li>App home page groups devices by <code>zone</code> value</li>
        <li>After moving a device, users can modify the <code>zone</code> value in the App</li>
        <li>Supports custom zone names, not limited to preset lists</li>
      </ol>
      <p>
        Unlike Matter's Groups Cluster, UserLabel is pure metadata tagging and does not affect device group control behavior.
        Suitable for App-level UI grouping, not device-level coordinated control.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Device Ownership Tagging in Multi-user Households</summary>
    <div class="scenario-content">
      <p>
        A household has multiple members, with some devices belonging to specific members (e.g. children's room light, study desk lamp).
        By recording ownership information via UserLabel, the App can show different device views for different members.
      </p>
      <ol>
        <li>Write ownership labels for the device: <code>{'{"owner": "alice", "usage": "reading"}'}</code></li>
        <li>App filters by the <code>owner</code> label based on the currently logged-in user's name</li>
        <li>The "My Devices" page only shows devices with matching owner</li>
        <li>Admin view can still see all devices</li>
      </ol>
      <p>
        Note: UserLabel is per-fabric. If family members use different Fabrics (different brand Apps),
        their labels are invisible to each other. All Apps under the same Fabric share the same set of labels.
      </p>
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
  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'localization-configuration': {
    title: 'LocalizationConfiguration Cluster (0x002B)',
    description: 'Complete reference for Matter LocalizationConfiguration Cluster (0x002B) — ActiveLocale / SupportedLocales attributes, BCP 47 language tags, and switching device language via Write operation.',
    prev: undefined,
    next: undefined,
    content: `<h1>LocalizationConfiguration Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002B</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root / Node level)
  </p>
  <p>
    LocalizationConfiguration manages the device's language and regional settings. It enables the controller (App / voice assistant) to query which languages the device supports
    and switch the device's current language locale. Language tags follow the <strong>BCP 47</strong> standard (e.g. <code>"en-US"</code>, <code>"zh-CN"</code>).
  </p>
  <p>
    This Cluster is very simple — only <strong>2 attributes</strong>, <strong>no commands</strong>.
    Language switching is done by directly <strong>writing</strong> the <code>ActiveLocale</code> attribute.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      When users switch device language in the App (e.g. changing a door lock's voice prompts from English to Chinese),
      they are writing a new <code>ActiveLocale</code> value to this Cluster.
      It can also be used to automatically set the device language to match the phone's system language after commissioning.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>LocalizationConfiguration has only two attributes, both mandatory. Click an attribute ID to jump to its detailed description.</p>

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
          <td>ActiveLocale</td>
          <td>string</td>
          <td>Read/Write</td>
          <td>Currently active language locale (BCP 47 tag)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>SupportedLocales</td>
          <td>list&lt;string&gt;</td>
          <td>Read-only</td>
          <td>List of all language locales supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">ActiveLocale (Current Language Region)</h3>
  <p>
    The device's currently active language locale tag, in BCP 47 format (e.g. <code>"en-US"</code>, <code>"zh-CN"</code>).
    Writing a new value switches the device language, but the written value <strong>must</strong> be in the <code>SupportedLocales</code> list;
    otherwise the device will return <code>CONSTRAINT_ERROR</code>.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">BCP 47 Tag Format</div>
    <p>
      BCP 47 language tags consist of a language code and an optional region code, connected by a hyphen. Common examples:
    </p>
    <ul>
      <li><code>en-US</code> — English (United States)</li>
      <li><code>zh-CN</code> — Simplified Chinese (Mainland China)</li>
      <li><code>zh-TW</code> — Traditional Chinese (Taiwan)</li>
      <li><code>ja-JP</code> — Japanese (Japan)</li>
      <li><code>de-DE</code> — German (Germany)</li>
    </ul>
  </div>
  <p>Write example (switching device to Simplified Chinese):</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002B",
      "attributeId": "0x00"        // ActiveLocale
    },
    "attributeValue": "zh-CN"      // Switch to Simplified Chinese
  }]
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">SupportedLocales (Supported Language List)</h3>
  <p>
    Read-only attribute, returning the list of all language locale tags supported by the device. List content is determined by device firmware; Apps cannot modify it.
    Before switching languages, read this attribute first to confirm the device supports the target language.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">Note</div>
    <p>
      Support lists vary widely across devices. Low-cost devices may only support one language <code>["en-US"]</code>,
      while high-end devices may support over a dozen. Always check this list before switching languages to avoid errors from writing unsupported values.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== No Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    LocalizationConfiguration Cluster <strong>does not define any commands</strong>.
    All operations are done through direct attribute reads/writes — read <code>SupportedLocales</code> to check supported languages,
    write <code>ActiveLocale</code> to switch language. This is one of the simplest interaction patterns in Matter.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading LocalizationConfiguration Cluster attributes of a smart door lock device:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": "en-US",           // ActiveLocale = current language locale
  "0x1": [                  // SupportedLocales = device supported language list
    "en-US",
    "zh-CN",
    "zh-TW",
    "ja-JP",
    "ko-KR",
    "de-DE",
    "fr-FR"
  ]
}</code></pre>

  <!-- ====== Real-world Scenarios ====== -->
  <h2 id="scenarios">Real-world Scenarios</h2>

  <details>
    <summary>Scenario 1: Automatically Set Device Language After Commissioning</summary>
    <div class="scenario-content">
      <p>
        After device commissioning, the App automatically aligns the device language with the phone's system language, avoiding manual setup:
      </p>
      <ol>
        <li>Get the phone's system language (e.g. <code>"zh-CN"</code>)</li>
        <li>Read the device's <code>SupportedLocales</code> attribute to get the supported list</li>
        <li>Check if the system language is in the supported list:
          <ul>
            <li>Exact match takes priority (<code>"zh-CN"</code>)</li>
            <li>If no exact match, try language prefix matching (any item starting with <code>"zh"</code>)</li>
            <li>If neither matches, keep the device's default language without modification</li>
          </ul>
        </li>
        <li>After a successful match, Write to <code>ActiveLocale</code> to complete the switch</li>
      </ol>
    </div>
  </details>

  <details>
    <summary>Scenario 2: App Language Settings UI</summary>
    <div class="scenario-content">
      <p>
        Provide a "Language Settings" option on the device details page for manual language selection:
      </p>
      <ol>
        <li>Enter the device language settings page, read <code>SupportedLocales</code> to render the options list</li>
        <li>Read <code>ActiveLocale</code> to mark the currently selected item</li>
        <li>After the user selects a new language, Write to <code>ActiveLocale</code></li>
        <li>Refresh UI after successful write; if <code>CONSTRAINT_ERROR</code> is returned, notify the user that the language is not supported</li>
      </ol>
      <p>
        It is recommended to convert BCP 47 tags to user-readable language names (e.g. display <code>"zh-CN"</code> as "Simplified Chinese"),
        instead of showing raw tags directly.
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      LocalizationConfiguration affects the device's own language behavior (e.g. voice prompts, screen display text),
      not the App's UI language. After switching, the device may need a few seconds to load internal language resources,
      during which the device behavior may briefly remain in the old language.
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
  'time-format-localization': {
    title: 'TimeFormatLocalization Cluster (0x002C)',
    description: 'Complete reference for Matter TimeFormatLocalization Cluster (0x002C) — HourFormat / ActiveCalendarType / SupportedCalendarTypes attributes, CALFMT Feature, enum value quick reference, and real-world usage scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>TimeFormatLocalization Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002C</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root) &nbsp;|&nbsp;
    <strong>Role</strong>: Server (configured via Write attribute, no commands)
  </p>
  <p>
    TimeFormatLocalization controls the time and date <strong>display format</strong> preferences on the device.
    It is not responsible for obtaining or synchronizing time itself (that is the job of TimeSynchronization Cluster),
    but rather determines how the device <strong>displays</strong> time on screens, panels, etc. — 12-hour or 24-hour format, Gregorian or other calendars.
  </p>
  <p>
    This Cluster is very compact — at minimum only <strong>1 attribute</strong> (HourFormat),
    with 2 additional calendar-related attributes when CALFMT Feature is supported. No commands; all configuration is done through <strong>direct attribute writes</strong>.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      A user gets a smart device with a screen (thermostat, smart panel, door lock with display),
      finds the time displayed in 12-hour format, and wants to change to 24-hour? Just write <code>HourFormat</code>.
      Need to display a lunar calendar date on the device screen? First confirm the device supports CALFMT Feature, then write <code>ActiveCalendarType</code>.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>TimeFormatLocalization declares calendar format support through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CALFMT（CalendarFormat）</span>
        <span class="enum-desc">Calendar format — enables ActiveCalendarType and SupportedCalendarTypes attributes for switching between Gregorian, Chinese lunar, and other calendar systems</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Impact on Attributes</div>
    <p>
      <code>HourFormat</code> is mandatory, regardless of Features.
      Only when the device declares the <strong>CALFMT</strong> Feature are <code>ActiveCalendarType</code> and
      <code>SupportedCalendarTypes</code> available.
      Simple devices (e.g. outlets with only a clock display) typically don't support CALFMT and have only the HourFormat attribute.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>TimeFormatLocalization has up to 3 attributes, 2 of which depend on CALFMT Feature. Click an attribute ID to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>HourFormat</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>-</td>
          <td>Time display format (12/24-hour)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>ActiveCalendarType</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>CALFMT</td>
          <td>Currently used calendar type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>SupportedCalendarTypes</td>
          <td>list&lt;enum8&gt;</td>
          <td>Read-only</td>
          <td>CALFMT</td>
          <td>List of all calendar types supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">HourFormat (Time Display Format)</h3>
  <p>
    Controls whether the device displays time in 12-hour or 24-hour format. This is TimeFormatLocalization's only mandatory attribute;
    all devices supporting this Cluster must implement it. Read/write; switch by directly writing the attribute.
  </p>

  <h4>HourFormatEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">12hr</span>
        <span class="enum-desc">12-hour format with AM/PM (e.g. 2:30 PM)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">24hr</span>
        <span class="enum-desc">24-hour format (e.g. 14:30)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFF</span>
      <div>
        <span class="enum-name">UseActiveLocale</span>
        <span class="enum-desc">Automatically determined by current locale setting (follows LocalizationConfiguration Cluster's ActiveLocale)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">UseActiveLocale Behavior</div>
    <p>
      When HourFormat is set to <code>0xFF</code> (UseActiveLocale), the device will follow
      the <code>ActiveLocale</code> attribute in the LocalizationConfiguration Cluster to automatically select the time format.
      For example, <code>en-US</code> automatically uses 12-hour format, <code>zh-CN</code> automatically uses 24-hour format.
      This is the most hassle-free choice, letting the device follow language settings automatically.
    </p>
  </div>
  <p>Write attribute example (switch to 12-hour format):</p>
  <pre><code>// App → Device: Switch time display to 12-hour format
{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002C",
      "attributeId": "0x00"        // HourFormat
    },
    "data": 0                      // 12hr
  }]
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">ActiveCalendarType (Current Calendar Type)</h3>
  <p>
    Controls which calendar system the device uses to display dates. Read/write, but only values in the <code>SupportedCalendarTypes</code> list can be written.
    Requires device support for the <strong>CALFMT</strong> Feature; otherwise this attribute does not exist.
  </p>

  <h4>CalendarTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Buddhist</span>
        <span class="enum-desc">Buddhist calendar (used in Thailand, Sri Lanka, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Chinese</span>
        <span class="enum-desc">Chinese lunar calendar (with solar terms and zodiac)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Coptic</span>
        <span class="enum-desc">Coptic calendar (used by the Coptic Church in Egypt)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Ethiopian</span>
        <span class="enum-desc">Ethiopian calendar</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Gregorian</span>
        <span class="enum-desc">Gregorian calendar (global standard, most common)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Hebrew</span>
        <span class="enum-desc">Hebrew calendar (Jewish calendar)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Indian</span>
        <span class="enum-desc">Indian National Calendar</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Islamic</span>
        <span class="enum-desc">Islamic calendar (Hijri)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Japanese</span>
        <span class="enum-desc">Japanese calendar (era names such as Reiwa, Heisei)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Korean</span>
        <span class="enum-desc">Korean Dangun calendar</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Persian</span>
        <span class="enum-desc">Persian calendar (Iranian calendar)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Taiwanese</span>
        <span class="enum-desc">Taiwanese Minguo calendar</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFF</span>
      <div>
        <span class="enum-name">UseActiveLocale</span>
        <span class="enum-desc">Automatically determined by current locale setting</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Check Supported List Before Writing</div>
    <p>
      Not all devices support all 12 calendar types. Before writing to <code>ActiveCalendarType</code>,
      you <strong>must</strong> first read <code>SupportedCalendarTypes</code> to confirm the target calendar is in the list.
      Writing an unsupported value will be rejected by the device (returns CONSTRAINT_ERROR).
    </p>
  </div>
  <p>Write attribute example (switch to Chinese lunar calendar):</p>
  <pre><code>// App → Device: Switch calendar to Chinese Lunar
{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002C",
      "attributeId": "0x01"        // ActiveCalendarType
    },
    "data": 1                      // Chinese (Chinese Lunar)
  }]
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">SupportedCalendarTypes (Supported Calendar List)</h3>
  <p>
    Read-only attribute returning a list of all calendar types the device supports. Each element in the list is a <code>CalendarTypeEnum</code> value.
    Apps should use this list to build the calendar selection UI — only showing options the device actually supports.
    Requires device support for the <strong>CALFMT</strong> Feature.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      After reading <code>SupportedCalendarTypes</code>, use it to dynamically generate the calendar options list on the settings page.
      Most devices will only support Gregorian and one or two locally common calendars;
      don't hardcode all 12. If the list has only one item, consider hiding the calendar switching entry.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading TimeFormatLocalization attributes from a smart thermostat supporting CALFMT Feature:</p>
  <pre><code>{
  // --- Time Format ---
  "0x00": 1,              // HourFormat = 24hr (24-hour format)

  // --- Calendar Format (requires CALFMT Feature) ---
  "0x01": 4,              // ActiveCalendarType = Gregorian
  "0x02": [4, 0, 1]       // SupportedCalendarTypes = [Gregorian, Buddhist, Chinese]
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Thermostat Time Format Settings</summary>
    <div class="scenario-content">
      <p>
        A user has installed a new smart thermostat, and the screen shows 12-hour format (e.g. 2:30 PM).
        The user prefers 24-hour format and wants to switch via the App.
      </p>
      <ol>
        <li>Read <code>HourFormat</code> to confirm current value is <code>0</code> (12hr)</li>
        <li>App settings page shows three options: 12-hour, 24-hour, follow system language</li>
        <li>User selects 24-hour format, App writes <code>HourFormat = 1</code> (24hr)</li>
        <li>Device screen immediately changes from "2:30 PM" to "14:30"</li>
        <li>If the device supports CALFMT, the same settings page can also show calendar switching options</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Calendar Localization for Multi-region Smart Panels</summary>
    <div class="scenario-content">
      <p>
        A smart home panel for the global market, with the main screen displaying date and time.
        Users in different regions need different calendar formats — Chinese users want the lunar calendar, Middle Eastern users want the Islamic calendar.
      </p>
      <ol>
        <li>Read <code>FeatureMap</code> to confirm the device supports CALFMT (Bit 0 = 1)</li>
        <li>Read <code>SupportedCalendarTypes</code>, assume it returns <code>[4, 1, 7]</code> (Gregorian, Chinese Lunar, Islamic)</li>
        <li>App settings page dynamically generates options from the list with localized names: "Gregorian", "Chinese Lunar", "Islamic"</li>
        <li>Chinese user selects lunar calendar, App writes <code>ActiveCalendarType = 1</code> (Chinese)</li>
        <li>Panel screen date area changes from "2024-09-22" to also display the corresponding lunar date</li>
        <li>Can also be set to <code>UseActiveLocale (0xFF)</code>, letting the panel automatically choose the appropriate calendar based on language settings</li>
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
  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'unit-localization': {
    title: 'UnitLocalization Cluster (0x002D)',
    description: 'Complete reference for Matter Unit Localization Cluster (0x002D) — TemperatureUnit attribute, TempUnitEnum enum value quick reference, Feature Map (TEMP) description. A foundational Cluster for setting temperature display unit preference.',
    prev: undefined,
    next: undefined,
    content: `<h1>Unit Localization Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002D</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Node)
  </p>
  <p>
    Unit Localization stores the user's temperature unit display preference. After receiving this setting, the device displays temperature in the user's preferred unit on its local screen, panel, etc.
    This is one of the simplest Clusters in Matter — <strong>only 1 attribute</strong>, <strong>no commands</strong>, configured directly via Write operations.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      The thermostat panel shows Fahrenheit, but the user prefers Celsius? Just write <code>TemperatureUnit = Celsius</code> to switch.
      This Cluster only affects the <strong>display unit</strong>; it does not change the device's internal temperature data (internal storage and transmission always use standard units).
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>
    Unit Localization defines one Feature — <code>TEMP</code>. Only after the device declares support for this Feature will it expose the <code>TemperatureUnit</code> attribute.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>Code</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>TEMP</td>
          <td>Temperature Unit</td>
          <td>Supports temperature unit configuration. Exposes <code>TemperatureUnit</code> attribute when enabled</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Feature and Attribute</div>
    <p>
      If the <code>TEMP</code> bit is 0 in the device's Feature Map, the TemperatureUnit attribute will not be exposed, and reading it returns <code>UNSUPPORTED_ATTRIBUTE</code>.
      For devices that need to display temperature such as thermostats and temperature sensors, TEMP is typically enabled.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Unit Localization has only one attribute, depending on the <code>TEMP</code> Feature.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Required Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>TemperatureUnit</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>TEMP</td>
          <td>Temperature display unit preference</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">TemperatureUnit (Temperature Display Unit)</h3>
  <p>
    The user's preferred temperature display unit. After writing this attribute, the device displays temperature values in the specified unit on its local interface (screen, panel, LED, etc.).
    This attribute <strong>does not affect</strong> temperature data reported by the device via Matter protocol — protocol-transmitted temperatures are always in units of 0.01°C.
  </p>

  <h4>TempUnitEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Fahrenheit</span>
        <span class="enum-desc">Fahrenheit (°F) — used in the US and a few other regions</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Celsius</span>
        <span class="enum-desc">Celsius (°C) — used in most of the world</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Kelvin</span>
        <span class="enum-desc">Kelvin (K) — used in scientific/industrial applications</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== No Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Unit Localization <strong>does not define any commands</strong>. All configuration is done through direct attribute writes.
    This is a common pattern in Matter — for purely configurational Clusters, directly reading/writing attributes is simpler than defining dedicated commands.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">How to Configure</div>
    <p>
      Want to switch temperature units? Just send a Write request to the <code>TemperatureUnit</code> attribute.
      No Timed Interaction required, no security restrictions.
    </p>
  </div>

  <p>Write request example (switch to Celsius):</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002D",
      "attributeId": "0x00"        // TemperatureUnit
    },
    "attributeValue": 1            // Celsius
  }]
}</code></pre>

  <p>Read request example (query current settings):</p>
  <pre><code>{
  "attributeRequests": [{
    "endpointId": 0,
    "clusterId": "0x002D",
    "attributeId": "0x00"          // TemperatureUnit
  }]
}</code></pre>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading Unit Localization Cluster attributes on a thermostat device's Endpoint 0:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": 0          // TemperatureUnit = Fahrenheit
}</code></pre>

  <!-- ====== Real-world Scenarios ====== -->
  <h2 id="scenarios">Real-world Scenarios</h2>

  <h3>Scenario 1: US User — Keep Fahrenheit</h3>
  <div class="callout callout-info">
    <div class="callout-title">Scenario Description</div>
    <p>
      A US user purchases a Matter thermostat. The thermostat defaults to <code>TemperatureUnit = Fahrenheit</code> out of the box,
      displaying <strong>72°F</strong> on the panel. The user is accustomed to Fahrenheit, no changes needed.
    </p>
  </div>
  <p>
    After commissioning, the App reads the attribute, finds <code>TemperatureUnit = 0</code> (Fahrenheit), and syncs the App interface to display temperature in °F.
    The user sees consistent units on both the App and device panel, requiring no additional action.
  </p>

  <h3>Scenario 2: Metric User — Switch to Celsius</h3>
  <div class="callout callout-info">
    <div class="callout-title">Scenario Description</div>
    <p>
      A Chinese user purchases the same thermostat (factory default Fahrenheit). The panel shows <strong>72°F</strong>, which the user doesn't understand.
      The user selects "Celsius" in the App settings, and the App writes <code>TemperatureUnit = 1</code> (Celsius) to the device.
    </p>
  </div>
  <p>
    After successful write, the thermostat panel immediately switches to display <strong>22°C</strong>. The App interface also syncs to display in °C.
    Note: Raw data reported by the device via Matter protocol (e.g. Thermostat Cluster's LocalTemperature) is always an integer in units of 0.01°C,
    unaffected by TemperatureUnit. This attribute only controls the device's <strong>local display</strong> and the App's <strong>display preference</strong>.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      The "Temperature Unit Settings" feature in Apps is typically implemented as follows:
    </p>
    <ol>
      <li>After commissioning, automatically determine the preferred unit based on the phone's locale settings (<code>Locale</code> such as <code>en_US</code> uses Fahrenheit, others use Celsius)</li>
      <li>Write <code>TemperatureUnit</code> to device Endpoint 0</li>
      <li>App-side temperature display uses the same unit for consistency</li>
      <li>Provide a manual switch entry in settings, allowing users to change at any time</li>
    </ol>
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
  'time-synchronization': {
    title: 'TimeSynchronization Cluster (0x0038)',
    description: 'Complete reference for Matter TimeSynchronization Cluster (0x0038) — SetUTCTime / SetTrustedTimeSource / SetTimeZone / SetDSTOffset / SetDefaultNTP command details, timezone and DST management, NTP configuration, GranularityEnum / TimeSourceEnum enum quick reference, event definitions, and common scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>TimeSynchronization Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0038</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    TimeSynchronization handles Matter device time management — telling the device "what time is it," "what timezone," and "is there daylight saving time."
    Many features depend on accurate time: scheduled automations, log timestamps, certificate validity checks, energy statistics, etc.
    Without time synchronization, these features either won't work or will produce incorrect results.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Features</div>
    <p>
      TimeSynchronization Cluster defines three Features; devices choose which to support based on their capabilities:
      <strong>TZ</strong> (timezone management) supports timezone lists and DST configuration;
      <strong>NTPC</strong> (NTP client) can actively obtain time from NTP servers;
      <strong>NTPS</strong> (NTP server) can serve as a time source providing time to other devices.
      Devices without any Feature enabled only support the most basic SetUTCTime manual time setting.
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
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    TimeSynchronization Cluster has 5 request commands, with SetTimeZone having a corresponding response command.
    The most basic SetUTCTime is supported by all devices; other commands require the device to enable the corresponding Feature.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>SetUTCTime</td>
          <td>Set the device's UTC time</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SetTrustedTimeSource</td>
          <td>Specify a trusted time source node</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>SetTimeZone</td>
          <td>Set timezone list</td>
          <td class="col-required">TZ</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>SetDSTOffset</td>
          <td>Set DST offset list</td>
          <td class="col-required">TZ</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>SetDefaultNTP</td>
          <td>Set default NTP server address</td>
          <td class="col-required">NTPC</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SetUTCTime — Set UTC Time (0x00)</h3>
  <p>
    Directly sets the device's UTC time. This is the most basic time setting method — during commissioning, the Commissioner typically uses this command to inject the current time into the device.
    Upon receiving it, the device updates both <code>Granularity</code> and <code>TimeSource</code> attributes.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UTCTime</td>
          <td>epoch_us</td>
          <td>UTC time, <strong>microsecond-level</strong> (microseconds since 2000-01-01T00:00:00Z)</td>
        </tr>
        <tr>
          <td>Granularity</td>
          <td><a href="#enum-granularity">GranularityEnum</a></td>
          <td>Time granularity level — tells the device how precise this time is</td>
        </tr>
        <tr>
          <td>TimeSource</td>
          <td><a href="#enum-timesource">TimeSourceEnum</a></td>
          <td>Time source — tells the device where this time was obtained from</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Time Precision Requirements</div>
    <p>
      The device evaluates time reliability based on the <code>Granularity</code> parameter.
      If the device already has a higher-precision time source (e.g. already synced from NTP), it may reject SetUTCTime requests from lower-precision sources.
      During commissioning, the device typically has no time, so the setting will always succeed.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The most common usage is the Commissioner immediately calling SetUTCTime after commissioning to set the device's initial time.
        Granularity is typically passed as <code>SecondsGranularity (2)</code> or <code>MillisecondsGranularity (3)</code>,
        and TimeSource as <code>Admin (2)</code> (indicating time was manually set by an administrator).
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">SetTrustedTimeSource — Set Trusted Time Source (0x01)</h3>
  <p>
    Specifies a node within the Fabric as a trusted time source. The device will periodically synchronize time from this node,
    similar to a local network "time authority." Setting to <code>null</code> clears the trusted time source.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TrustedTimeSource</td>
          <td>struct / null</td>
          <td>Trusted time source node info, containing NodeID and Endpoint. Set to <code>null</code> to clear</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>TrustedTimeSource Struct</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NodeID</td>
          <td>node-id</td>
          <td>Time source node's Node ID</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>Endpoint where TimeSynchronization Cluster resides on that node (typically 0)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        In a Fabric, a Hub (e.g. Apple HomePod, Google Nest Hub) typically serves as the trusted time source.
        The Commissioner sets TrustedTimeSource to point to the Hub's Node ID during commissioning,
        after which the device will automatically synchronize time from the Hub without an external NTP server.
        This is especially important for Thread devices without direct internet access.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">SetTimeZone — Set Timezone (0x02)</h3>
  <p>
    Sets the device's timezone list. Can contain multiple timezone entries, each with an effective time (<code>validAt</code>),
    to support historical or future timezone changes. After successful processing, the device returns <code>SetTimeZoneResponse</code>,
    informing the Commissioner whether DST offset setting is needed next.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TimeZone</td>
          <td>list&lt;TimeZoneStruct&gt;</td>
          <td>Timezone list (up to <code>TimeZoneListMaxSize</code> entries)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>TimeZoneStruct Struct</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Offset</td>
          <td>int32</td>
          <td>Offset from UTC, in <strong>seconds</strong>. E.g. UTC+8 = <code>28800</code>, UTC-5 = <code>-18000</code></td>
        </tr>
        <tr>
          <td>ValidAt</td>
          <td>epoch_us</td>
          <td>Effective time for this entry (microsecond-level epoch). First entry's ValidAt must be <code>0</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string (Optional)</td>
          <td>IANA timezone name (e.g. <code>"Asia/Shanghai"</code>), used for display and DST database lookup</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SetTimeZoneResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DSTOffsetRequired</td>
          <td>bool</td>
          <td><code>true</code> means the device needs the Commissioner to follow up with <a href="#cmd-0x04">SetDSTOffset</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Meaning of DSTOffsetRequired</div>
    <p>
      If the device has a built-in IANA timezone database (<code>TimeZoneDatabase = Full</code>),
      the device can calculate DST rules on its own, responding with <code>DSTOffsetRequired = false</code>.
      If the device has no timezone database (<code>TimeZoneDatabase = None</code>),
      it returns <code>true</code>, and the Commissioner must manually provide DST offsets.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user moves to a new timezone, or the device needs timezone setup during first commissioning.
        For Chinese users, typically only one record is needed: Offset = 28800 (UTC+8), ValidAt = 0, Name = "Asia/Shanghai".
        China doesn't observe DST, so DSTOffset can be set to a single record with offset 0.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">SetDSTOffset — Set DST Offset (0x04)</h3>
  <p>
    Sets the daylight saving time (DST) offset list. Each entry defines an additional offset within a time range.
    The device matches entries based on current time and adds the offset on top of the timezone offset to calculate local time.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DSTOffset</td>
          <td>list&lt;DSTOffsetStruct&gt;</td>
          <td>DST offset list (up to <code>DSTOffsetListMaxSize</code> entries)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>DSTOffsetStruct Struct</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Offset</td>
          <td>int32</td>
          <td>DST additional offset, in <strong>seconds</strong>. E.g. US DST = <code>3600</code> (+1 hour), no DST = <code>0</code></td>
        </tr>
        <tr>
          <td>ValidStarting</td>
          <td>epoch_us</td>
          <td>Effective start time for this entry (microsecond-level epoch)</td>
        </tr>
        <tr>
          <td>ValidUntil</td>
          <td>epoch_us / null</td>
          <td>Expiry time for this entry. The last entry's ValidUntil must be <code>null</code> (meaning it remains valid until replaced by a new list)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Local Time Calculation</div>
    <p>
      <code>LocalTime = UTCTime + TimeZone.Offset + DSTOffset.Offset</code><br/>
      Example: UTC time 12:00, timezone UTC+8 (28800 seconds), DST +1h (3600 seconds) → local time 21:00.
      For regions that don't observe DST (e.g. China), the DSTOffset list only needs one record with Offset = 0.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A device in US Eastern Time (UTC-5) needs to enter DST (+1h) on the second Sunday of March each year
        and exit on the first Sunday of November. The Commissioner can provide two DSTOffset records to cover the current year's transitions.
        When the last entry's ValidUntil expires, the device triggers a <code>DSTTableEmpty</code> event,
        reminding the Commissioner to update the DST table.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">SetDefaultNTP — Set Default NTP Server (0x07)</h3>
  <p>
    Sets the default NTP server address for device time synchronization. Requires the device to have <strong>NTPC</strong> (NTP client) feature enabled.
    Set to <code>null</code> to clear the default NTP server.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DefaultNTP</td>
          <td>string / null</td>
          <td>NTP server address (domain name or IPv6 address). Set to <code>null</code> to clear</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">DNS Resolution Capability</div>
    <p>
      If a domain name is provided (e.g. <code>"pool.ntp.org"</code>), the device needs DNS resolution capability
      (check the <code>SupportsDNSResolve</code> attribute).
      Devices that don't support DNS can only accept NTP servers in IPv6 address format.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After commissioning, the Commissioner can configure NTP servers for devices supporting NTPC.
        The device will then automatically synchronize time via NTP protocol, no longer depending on manual Commissioner setup.
        Common public NTP servers: <code>pool.ntp.org</code>, <code>time.google.com</code>, <code>ntp.aliyun.com</code>.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>TimeSynchronization Cluster has 13 application attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Time Status -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>UTCTime</td>
          <td>epoch_us / null</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>Current UTC time (microsecond-level)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Granularity</td>
          <td>GranularityEnum</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>Current time's granularity level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>TimeSource</td>
          <td>TimeSourceEnum</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>Current time's source</td>
        </tr>
        <!-- Time Source Config -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TrustedTimeSource</td>
          <td>struct / null</td>
          <td><a href="#group-source">Time Source Config</a></td>
          <td>Trusted time source node within Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>DefaultNTP</td>
          <td>string / null</td>
          <td><a href="#group-source">Time Source Config</a></td>
          <td>Default NTP server address</td>
        </tr>
        <!-- Timezone & DST -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TimeZone</td>
          <td>list&lt;TimeZoneStruct&gt;</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>Timezone configuration list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>DSTOffset</td>
          <td>list&lt;DSTOffsetStruct&gt;</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>DST offset list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>LocalTime</td>
          <td>epoch_us / null</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>Current local time (includes timezone + DST offset)</td>
        </tr>
        <!-- Capabilities & Limits -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>TimeZoneDatabase</td>
          <td>TimeZoneDatabaseEnum</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>Device's timezone database type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>TimeZoneListMaxSize</td>
          <td>uint8</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>Maximum timezone list entries</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>DSTOffsetListMaxSize</td>
          <td>uint8</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>Maximum DST offset list entries</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>SupportsDNSResolve</td>
          <td>bool</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>Whether DNS name resolution is supported</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>NTPServerAvailable</td>
          <td>bool</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>Whether device can serve as NTP server</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Time Status (0x0000 ~ 0x0002) ====== -->
  <h3 id="group-time">Time Status (0x0000 ~ 0x0002)</h3>
  <p>Describes the device's current time value and its precision and source.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>UTCTime<br/><span class="attr-cn">UTC Time</span></td>
          <td>epoch_us / null</td>
          <td>
            The device's current UTC time, microsecond-level precision (since 2000-01-01T00:00:00Z).
            <code>null</code> means the device has not yet obtained valid time — this is the default state for a freshly powered-on, unsynchronized device
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Granularity<br/><span class="attr-cn">Time Granularity</span></td>
          <td><a href="#enum-granularity">GranularityEnum</a></td>
          <td>
            Current time's granularity level. <code>NoTimeGranularity (0)</code> means the device has no trusted time.
            Higher precision indicates a more reliable time source (see enum definitions below)
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>TimeSource<br/><span class="attr-cn">Time Source</span></td>
          <td><a href="#enum-timesource">TimeSourceEnum</a></td>
          <td>
            Where the current time was obtained from — NTP, manually set by administrator, GNSS, or other Matter nodes, etc.
            Used to assess time reliability (see enum definitions below)
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Epoch Reference</div>
    <p>
      Matter's time epoch reference is <strong>2000-01-01T00:00:00Z</strong>, not Unix's 1970.
      Conversion formula: <code>Matter epoch_us = (Unix timestamp - 946684800) * 1000000</code>.
      Be aware of conversion when reading UTCTime.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Time Source Config (0x0003, 0x0004) ====== -->
  <h3 id="group-source">Time Source Configuration (0x0003, 0x0004)</h3>
  <p>Describes the device's time synchronization source — where precise time is obtained from.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>TrustedTimeSource<br/><span class="attr-cn">Trusted Time Source</span></td>
          <td>struct / null</td>
          <td>
            The designated trusted time source node within the Fabric. Contains three fields: FabricIndex, NodeID, and Endpoint.
            <code>null</code> means not configured. Set via the <a href="#cmd-0x01">SetTrustedTimeSource</a> command
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>DefaultNTP<br/><span class="attr-cn">Default NTP Server</span></td>
          <td>string / null</td>
          <td>
            The default NTP server address used by the device (domain name or IPv6 address).
            <code>null</code> means not configured. Set via the <a href="#cmd-0x07">SetDefaultNTP</a> command.
            <strong>Requires NTPC feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Time Source Priority</div>
    <p>
      Device time acquisition priority is typically: <strong>NTP server</strong> &gt; <strong>trusted time source node</strong> &gt; <strong>manual admin setting</strong>.
      If the device supports NTPC and DefaultNTP is configured, it will automatically sync via NTP with the highest precision.
      For Thread devices that cannot directly access the internet, TrustedTimeSource is the only automatic synchronization path.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Timezone & DST (0x0005 ~ 0x0007) ====== -->
  <h3 id="group-tz">Timezone and DST (0x0005 ~ 0x0007)</h3>
  <p>Manages timezone configuration, DST offsets, and local time calculation. Requires the device to have <strong>TZ</strong> feature enabled.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>TimeZone<br/><span class="attr-cn">Timezone List</span></td>
          <td>list&lt;TimeZoneStruct&gt;</td>
          <td>
            Currently effective timezone configuration list. Each entry contains Offset (seconds), ValidAt (effective time), Name (IANA timezone name).
            Set via the <a href="#cmd-0x02">SetTimeZone</a> command. <strong>Requires TZ feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>DSTOffset<br/><span class="attr-cn">DST Offset List</span></td>
          <td>list&lt;DSTOffsetStruct&gt;</td>
          <td>
            Currently effective DST offset list. Each entry contains Offset (seconds), ValidStarting, ValidUntil.
            Set via the <a href="#cmd-0x04">SetDSTOffset</a> command. <strong>Requires TZ feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>LocalTime<br/><span class="attr-cn">Local Time</span></td>
          <td>epoch_us / null</td>
          <td>
            Local time calculated by the device = UTCTime + TimeZone.Offset + DSTOffset.Offset.
            <code>null</code> means UTC time or timezone configuration is missing, unable to calculate. Read-only attribute. <strong>Requires TZ feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Capabilities & Limits (0x0008 ~ 0x000C) ====== -->
  <h3 id="group-cap">Capabilities and Limits (0x0008 ~ 0x000C)</h3>
  <p>Describes the device's capability limits and hardware characteristics for time synchronization. Most of these attributes are read-only, determined by device firmware.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>TimeZoneDatabase<br/><span class="attr-cn">Timezone Database</span></td>
          <td>TimeZoneDatabaseEnum</td>
          <td>
            Device's built-in timezone database type.
            <code>Full (0)</code> = full IANA database, can automatically calculate DST;
            <code>Partial (1)</code> = partial database;
            <code>None (2)</code> = no database, fully depends on Commissioner for manual setup. <strong>Requires TZ feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>TimeZoneListMaxSize<br/><span class="attr-cn">Timezone List Max Size</span></td>
          <td>uint8</td>
          <td>
            Maximum number of entries allowed in the TimeZone list. Minimum 1, maximum 2.
            The list length of <a href="#cmd-0x02">SetTimeZone</a> cannot exceed this value. <strong>Requires TZ feature</strong>
          </td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>DSTOffsetListMaxSize<br/><span class="attr-cn">DST Offset List Max Size</span></td>
          <td>uint8</td>
          <td>
            Maximum number of entries allowed in the DSTOffset list.
            The list length of <a href="#cmd-0x04">SetDSTOffset</a> cannot exceed this value. <strong>Requires TZ feature</strong>
          </td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>SupportsDNSResolve<br/><span class="attr-cn">Supports DNS Resolve</span></td>
          <td>bool</td>
          <td>
            Whether the device supports resolving domain names to IP addresses.
            If <code>false</code>, <a href="#cmd-0x07">SetDefaultNTP</a> can only accept IPv6 addresses, not domain names.
            <strong>Requires NTPC feature</strong>
          </td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>NTPServerAvailable<br/><span class="attr-cn">NTP Server Available</span></td>
          <td>bool</td>
          <td>
            Whether the device itself can serve as an NTP server to provide time to other nodes.
            <code>true</code> means other devices can set this device as their TrustedTimeSource.
            <strong>Requires NTPS feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>TimeSynchronization Cluster declares device time synchronization capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">TZ（TimeZone）</span>
        <span class="enum-desc">Timezone management — enables SetTimeZone and SetDSTOffset commands, along with timezone, DST, and local time related attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">NTPC（NTPClient）</span>
        <span class="enum-desc">NTP client — device can actively synchronize time from an NTP server, enables SetDefaultNTP command</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">NTPS（NTPServer）</span>
        <span class="enum-desc">NTP server — device itself can serve as a time source, providing NTP time service to other devices in the Fabric</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Common Combinations</div>
    <p>
      <strong>Basic devices</strong> (e.g. low-power sensors): no Features, only support manual SetUTCTime;<br/>
      <strong>Standard devices</strong> (e.g. lights, outlets): TZ, supports timezone and DST configuration;<br/>
      <strong>Connected devices</strong> (e.g. Wi-Fi lights): TZ + NTPC, can auto-sync from NTP;<br/>
      <strong>Hub devices</strong> (e.g. border routers): TZ + NTPC + NTPS, not only syncing themselves but also providing time to other devices.
    </p>
  </div>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-granularity">GranularityEnum</h3>
  <p>Describes the device's current time precision level. Higher precision indicates a more reliable time source.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoTimeGranularity</span>
        <span class="enum-desc">No valid time — device has not obtained any time information yet</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">MinutesGranularity</span>
        <span class="enum-desc">Minutes granularity — time error may be up to several minutes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">SecondsGranularity</span>
        <span class="enum-desc">Seconds granularity — time error within seconds</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MillisecondsGranularity</span>
        <span class="enum-desc">Milliseconds granularity — typically from NTP synchronization</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">MicrosecondsGranularity</span>
        <span class="enum-desc">Microseconds granularity — typically from PTP or GNSS</span>
      </div>
    </div>
  </div>

  <h3 id="enum-timesource">TimeSourceEnum</h3>
  <p>Identifies the source of the device's current time. Higher values typically indicate a more reliable time source. The NTS suffix indicates Network Time Security authentication was used.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">No time source</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Source unknown</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Admin</span>
        <span class="enum-desc">Manually set by administrator (via SetUTCTime)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NodeTimeCluster</span>
        <span class="enum-desc">Synchronized from another Matter node's TimeSynchronization Cluster</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">NonMatterSNTP</span>
        <span class="enum-desc">SNTP server from non-Matter network</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NonMatterNTP</span>
        <span class="enum-desc">NTP server from non-Matter network</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">MatterSNTP</span>
        <span class="enum-desc">SNTP server within Matter Fabric</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">MatterNTP</span>
        <span class="enum-desc">NTP server within Matter Fabric</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">MixedNTP</span>
        <span class="enum-desc">Mixed NTP sources (Matter + non-Matter)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">NonMatterSNTPNTS</span>
        <span class="enum-desc">Non-Matter SNTP + NTS authentication</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">NonMatterNTPNTS</span>
        <span class="enum-desc">Non-Matter NTP + NTS authentication</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">MatterSNTPNTS</span>
        <span class="enum-desc">Matter SNTP + NTS authentication</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">MatterNTPNTS</span>
        <span class="enum-desc">Matter NTP + NTS authentication</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">MixedNTPNTS</span>
        <span class="enum-desc">Mixed NTP sources + NTS authentication</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">14</span>
      <div>
        <span class="enum-name">CloudSource</span>
        <span class="enum-desc">Cloud time source</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">PTP</span>
        <span class="enum-desc">Precision Time Protocol (IEEE 1588), microsecond-level accuracy</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">16</span>
      <div>
        <span class="enum-name">GNSS</span>
        <span class="enum-desc">Global Navigation Satellite System (GPS/BeiDou, etc.), highest accuracy time source</span>
      </div>
    </div>
  </div>

  <h3 id="enum-tzdb">TimeZoneDatabaseEnum</h3>
  <p>Describes the device's built-in timezone database capability, determining whether the device can calculate DST rules on its own.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Full</span>
        <span class="enum-desc">Full IANA timezone database — device can automatically calculate DST; usually no need to manually set DSTOffset after SetTimeZone</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Partial</span>
        <span class="enum-desc">Partial timezone database — covers only some regions; regions not covered still require manual DSTOffset configuration</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">No timezone database — fully depends on Commissioner to manually provide timezone and DST configuration</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>TimeSynchronization Cluster defines 5 events to notify the Commissioner or automation systems of time status changes.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Severity</th>
          <th>Required Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DSTTableEmpty</td>
          <td>Info</td>
          <td class="col-required">TZ</td>
          <td>DST table exhausted — all DSTOffset entries have expired, device can no longer correctly calculate local time. Commissioner needs to provide a new DSTOffset list</td>
        </tr>
        <tr>
          <td>DSTStatus</td>
          <td>Info</td>
          <td class="col-required">TZ</td>
          <td>DST status change — device entering or exiting DST. Contains a <code>DSTOffsetActive</code> boolean field, <code>true</code> = DST is active</td>
        </tr>
        <tr>
          <td>TimeZoneStatus</td>
          <td>Info</td>
          <td class="col-required">TZ</td>
          <td>Timezone switch — the next entry in the timezone list has taken effect (ValidAt reached). Contains new Offset and Name fields</td>
        </tr>
        <tr>
          <td>TimeFailure</td>
          <td>Info</td>
          <td class="col-optional">None</td>
          <td>Time sync failure — device cannot obtain or verify time from any source. Possible causes include NTP unreachable, trusted time source offline, etc.</td>
        </tr>
        <tr>
          <td>MissingTrustedTimeSource</td>
          <td>Info</td>
          <td class="col-optional">None</td>
          <td>Missing trusted time source — device needs time sync but has no TrustedTimeSource configured and no available NTP. Reminds Commissioner to configure a time source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Event Subscription Advice</div>
    <p>
      It is recommended that the Commissioner subscribe to <strong>DSTTableEmpty</strong> and <strong>TimeFailure</strong> events.
      The former triggers when the DST table expires; if not updated promptly, the device's local time will be incorrect (affecting scheduled automations, etc.);
      the latter triggers when the time sync chain breaks, enabling timely discovery and resolution of issues.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Attribute Data Example</h3>
  <p>Below is typical attribute data from a TimeSynchronization Cluster of a smart light (China region) supporting TZ + NTPC:</p>
  <pre><code>{
  // --- Time Status ---
  "0x0000": 1695312000000000,    // UTCTime = 2023-09-21T16:00:00Z (microsecond-level epoch)
  "0x0001": 3,                   // Granularity = MillisecondsGranularity
  "0x0002": 7,                   // TimeSource = MatterNTP

  // --- Trusted Time Source ---
  "0x0003": {                    // TrustedTimeSource
    "fabricIndex": 1,
    "nodeID": "0x0000000000000001",
    "endpoint": 0
  },
  "0x0004": "pool.ntp.org",      // DefaultNTP

  // --- Timezone & DST ---
  "0x0005": [{                   // TimeZone
    "offset": 28800,             //   UTC+8 (seconds)
    "validAt": 0,
    "name": "Asia/Shanghai"
  }],
  "0x0006": [{                   // DSTOffset
    "offset": 0,                 //   No DST
    "validStarting": 0,
    "validUntil": null
  }],

  // --- Local Time ---
  "0x0007": 1695340800000000,    // LocalTime (timezone offset applied)

  // --- Capabilities & Limits ---
  "0x0008": 1,                   // TimeZoneDatabase = Full
  "0x0009": 2,                   // TimeZoneListMaxSize = 2
  "0x000A": 2,                   // DSTOffsetListMaxSize = 2
  "0x000B": true,                // SupportsDNSResolve = true
  "0x000C": false                // NTPServerAvailable = false
}</code></pre>

  <h3>SetUTCTime Interaction Example</h3>
  <p>Commissioner sets initial time for the device after commissioning:</p>
  <pre><code>// Commissioner → Device: Set UTC time
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0038",
      "commandId": "0x00"            // SetUTCTime
    },
    "commandFields": {
      "UTCTime": 1695312000000000,   // 2023-09-21T16:00:00Z (microseconds)
      "granularity": 3,              // MillisecondsGranularity
      "timeSource": 2                // Admin
    }
  }]
}</code></pre>

  <h3>SetTimeZone Interaction Example</h3>
  <p>Setting the China timezone (UTC+8) for the device:</p>
  <pre><code>// Commissioner → Device: Set timezone
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0038",
      "commandId": "0x02"            // SetTimeZone
    },
    "commandFields": {
      "timeZone": [{
        "offset": 28800,             // UTC+8 (seconds)
        "validAt": 0,                // Effective immediately
        "name": "Asia/Shanghai"      // IANA timezone name (optional)
      }]
    }
  }]
}

// Device → Commissioner: Confirm timezone setting
{
  "DSTOffsetRequired": true          // Need to follow up with DST offset setting
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Most Matter SDKs (e.g. connectedhomeip) automatically handle basic time setup during commissioning.
      App developers typically only need to focus on timezone configuration (especially when users change regions) and periodic DST table updates.
      Subscribing to the <code>DSTTableEmpty</code> event provides notification when an update is needed.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Set Initial Time During Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>After commissioning (CommissioningComplete succeeded), read the device's <code>FeatureMap (0xFFFC)</code> to confirm time sync capabilities</li>
        <li>Send <a href="#cmd-0x00"><code>SetUTCTime (0x00)</code></a> to inject current UTC time with Granularity = <code>SecondsGranularity (2)</code>, TimeSource = <code>Admin (2)</code></li>
        <li>Send <a href="#cmd-0x01"><code>SetTrustedTimeSource (0x01)</code></a> to designate a Hub in the Fabric as the trusted time source</li>
        <li>If the device supports NTPC, send <a href="#cmd-0x07"><code>SetDefaultNTP (0x07)</code></a> to configure the NTP server</li>
        <li>Verify: read <code>UTCTime (0x0000)</code> to confirm time is set, <code>Granularity (0x0001)</code> is no longer 0</li>
      </ol>
      <p>The device will subsequently auto-sync time from NTP or TrustedTimeSource, with precision gradually improving.</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Timezone Configuration (User Moves to a New Timezone)</summary>
    <div class="scenario-content">
      <ol>
        <li>Confirm device supports TZ feature (<code>FeatureMap</code> Bit 0 = 1)</li>
        <li>Read <code>TimeZoneListMaxSize (0x0009)</code> to confirm list capacity</li>
        <li>Send <a href="#cmd-0x02"><code>SetTimeZone (0x02)</code></a> with new timezone info:
          <ul>
            <li>Moving from Beijing to New York: Offset = <code>-18000</code> (UTC-5), Name = <code>"America/New_York"</code></li>
          </ul>
        </li>
        <li>Check the response's <code>DSTOffsetRequired</code>:
          <ul>
            <li>If <code>true</code>: device has no built-in timezone database, need to follow up with <a href="#cmd-0x04"><code>SetDSTOffset (0x04)</code></a> to manually set US Eastern DST rules</li>
            <li>If <code>false</code>: device has a built-in database and has already calculated DST automatically, no additional action needed</li>
          </ul>
        </li>
        <li>Verify: read <code>LocalTime (0x0007)</code> to confirm local time correctly reflects the new timezone</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: NTP Auto-sync Configuration</summary>
    <div class="scenario-content">
      <ol>
        <li>Confirm device supports NTPC feature (<code>FeatureMap</code> Bit 1 = 1)</li>
        <li>Check <code>SupportsDNSResolve (0x000B)</code>:
          <ul>
            <li><code>true</code>: can pass domain names, e.g. <code>"pool.ntp.org"</code></li>
            <li><code>false</code>: can only pass IPv6 addresses</li>
          </ul>
        </li>
        <li>Send <a href="#cmd-0x07"><code>SetDefaultNTP (0x07)</code></a> to set the NTP server address</li>
        <li>After waiting some time, read <code>Granularity (0x0001)</code> and <code>TimeSource (0x0002)</code>,
            to confirm successful NTP sync (Granularity should upgrade to MillisecondsGranularity, TimeSource changes to NTP-related value)</li>
      </ol>
      <p>
        <strong>Recommended NTP servers</strong>: <code>pool.ntp.org</code> (global), <code>ntp.aliyun.com</code> (China), <code>time.google.com</code> (global).
        For enterprise environments, internal NTP servers can be used for security.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Handling the DSTTableEmpty Event (DST Table Expired)</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to the device's <code>DSTTableEmpty</code> event</li>
        <li>When the event is received, it means all DSTOffset entries have expired</li>
        <li>Query future DST transition times based on the device's timezone</li>
        <li>Send <a href="#cmd-0x04"><code>SetDSTOffset (0x04)</code></a> to provide a new DST offset list</li>
        <li>Set the last entry's <code>ValidUntil</code> to <code>null</code>, ensuring the list covers until the next update</li>
      </ol>
      <p>
        <strong>Note</strong>: If this event is not handled promptly, the device's <code>LocalTime</code> will be incorrect due to missing DST information,
        affecting all automation rules that depend on local time (e.g. "turn on lights at 7 AM" would actually be an hour early or late).
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 5: Time Synchronization Strategy for Thread Devices</summary>
    <div class="scenario-content">
      <p>
        Thread devices typically lack direct internet access and cannot use NTP. They rely on the following time sync chain:
      </p>
      <ol>
        <li><strong>Commissioning phase</strong>: Commissioner injects initial time via <a href="#cmd-0x00">SetUTCTime</a></li>
        <li><strong>Running phase</strong>: Via <a href="#cmd-0x01">SetTrustedTimeSource</a>, point to the Thread Border Router,
            which forwards NTP time obtained from the internet to Thread devices</li>
        <li>If TrustedTimeSource goes offline, the device triggers a <code>MissingTrustedTimeSource</code> event</li>
        <li>Time precision will gradually degrade (Granularity may deteriorate from Milliseconds to Seconds or even Minutes)</li>
      </ol>
      <p>
        <strong>Best practice</strong>: Ensure at least one reliable time source node in the Fabric (e.g. Hub or Border Router),
        and configure TrustedTimeSource pointing to it for all devices during commissioning.
      </p>
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

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'icd-management': {
    title: 'IcdManagement Cluster (0x0046)',
    description: 'Complete reference for Matter ICD Management Cluster (0x0046) — Intermittently Connected Device (Sleepy Device) Check-In protocol, client registration, SIT/LIT operating modes, wake-up strategies, and all attribute/command/enum value quick reference.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>IcdManagement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0046</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    ICD Management manages Intermittently Connected Devices (ICD),
    commonly known as "sleepy devices" — door/window sensors, temperature/humidity sensors, battery-powered buttons, etc.
    These devices spend most of their time in sleep mode to conserve power, only briefly waking for communication at fixed intervals or specific events.
    ICD Management defines the device's sleep/wake cycles, manages subscriber registrations, and maintains connectivity through the Check-In protocol.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">SIT and LIT — Two Operating Modes</div>
    <p>
      ICD devices have two operating modes: <strong>SIT (Short Idle Time)</strong> mode and
      <strong>LIT (Long Idle Time)</strong> mode.
      SIT devices have short idle intervals (typically no more than 15 seconds), so the Controller can wait for the device to wake within the normal MRP retry window;
      LIT devices have longer idle intervals (up to several hours), requiring the Controller to rely on the Check-In protocol to establish communication.
      LIT mode significantly extends battery life, but interaction response is slower.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Quick Reference</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Data Structures</a>
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
    ICD Management has 4 commands. <code>RegisterClient</code> and <code>UnregisterClient</code> manage
    the Check-In message subscriber list; <code>StayActiveRequest</code> keeps the device temporarily awake.
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
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>RegisterClient</td>
          <td>Client &rarr; Server</td>
          <td>Register a Check-In client</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>RegisterClientResponse</td>
          <td>Server &rarr; Client</td>
          <td>Registration result, returns ICDCounter</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>UnregisterClient</td>
          <td>Client &rarr; Server</td>
          <td>Unregister a Check-In client</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>StayActiveRequest</td>
          <td>Client &rarr; Server</td>
          <td>Request the device to stay active for a period</td>
          <td class="col-required">LITS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>StayActiveResponse</td>
          <td>Server &rarr; Client</td>
          <td>Returns the actual active duration promised by the device</td>
          <td class="col-required">LITS</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">RegisterClient — Register Client (0x00)</h3>
  <p>
    Registers a Check-In client with the ICD device. After successful registration, the device sends
    a Check-In message to the client each time it wakes from sleep, saying "I'm awake, send any pending requests now." This is the core mechanism for LIT devices to maintain connectivity with Controllers.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CheckInNodeID</td>
          <td>uint64</td>
          <td>Target node ID for receiving Check-In messages — typically the Controller or Hub's NodeID</td>
        </tr>
        <tr>
          <td>MonitoredSubject</td>
          <td>uint64</td>
          <td>Monitored Subject (Case-AuthTag or NodeID) — identifies which user/entity is watching this device</td>
        </tr>
        <tr>
          <td>Key</td>
          <td>octstr (16 bytes)</td>
          <td>HMAC verification key — used to verify Check-In message authenticity and prevent forgery</td>
        </tr>
        <tr>
          <td>VerificationKey</td>
          <td>octstr (16 bytes)</td>
          <td>Optional. Verification key — used to verify the initiator's identity during registration. Required if the device demands verification</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After commissioning, Hub/Controller registers itself as a Check-In client with the battery sensor.
        Subsequently, the sensor sends a Check-In message each time it wakes; the Hub then sends subscription requests or reads data during the device's brief active window.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">RegisterClientResponse — Registration Response (0x01)</h3>
  <p>
    Device response to RegisterClient. Returns the current ICDCounter value,
    which the client uses to verify the freshness of subsequent Check-In messages (prevents replay attacks).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ICDCounter</td>
          <td>uint32</td>
          <td>Device's current Check-In counter value. The client should save this value; subsequent Check-In messages must have a Counter greater than this</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">UnregisterClient — Unregister Client (0x02)</h3>
  <p>
    Removes a Check-In client from the ICD device's registration list.
    After removal, the device no longer sends Check-In messages to that client.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CheckInNodeID</td>
          <td>uint64</td>
          <td>Node ID of the client to remove — must match the CheckInNodeID used during registration</td>
        </tr>
        <tr>
          <td>VerificationKey</td>
          <td>octstr (16 bytes)</td>
          <td>Optional. Verification key — same purpose as during registration, prevents unauthorized unregistration</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When removing a Hub from the home, the Hub needs to first call UnregisterClient to unregister itself from all registered ICD devices,
        to prevent devices from wasting battery by continuing to send Check-In messages to a non-existent node.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">StayActiveRequest — Request Stay Active (0x03)</h3>
  <p>
    Requests the ICD device to stay in active mode for an additional period, temporarily not returning to sleep.
    Applicable when needing to perform a series of interactions with the device (e.g. OTA upgrade, batch configuration) but the device's default active time is too short.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>StayActiveDuration</td>
          <td>uint32</td>
          <td>Requested additional active duration, in <strong>milliseconds</strong>. The device will remain awake for at least this long after the current active period ends</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The Controller needs to perform an OTA firmware upgrade on a door/window sensor. The sensor's default active window is only 10 seconds, insufficient for firmware transfer.
        The Controller sends StayActiveRequest (StayActiveDuration = 120000, i.e. 2 minutes),
        the sensor replies with StayActiveResponse indicating how long it can actually maintain, and the Controller completes the upgrade within this window.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">StayActiveResponse — Stay Active Response (0x04)</h3>
  <p>
    Device response to StayActiveRequest. The device may not fully satisfy the requested duration (e.g. low battery),
    and the response contains the actual active duration the device promises.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PromisedActiveDuration</td>
          <td>uint32</td>
          <td>Actual active duration promised by the device, in <strong>milliseconds</strong>. May be less than requested. The Controller should complete all operations within this time</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ICD Management attributes are divided into four functional groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Sleep/Wake Parameters -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>IdleModeDuration</td>
          <td>uint32</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>Idle mode duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>ActiveModeDuration</td>
          <td>uint32</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>Active mode duration (milliseconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ActiveModeThreshold</td>
          <td>uint16</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>Active mode extension threshold (milliseconds)</td>
        </tr>
        <!-- Registration Management -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>RegisteredClients</td>
          <td>list&lt;MonitoringRegistrationStruct&gt;</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>List of registered monitoring clients</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>ICDCounter</td>
          <td>uint32</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>Check-In message counter</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ClientsSupportedPerFabric</td>
          <td>uint16</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>Maximum registered clients per Fabric</td>
        </tr>
        <!-- User Wake-up Hints -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>UserActiveModeTriggerHint</td>
          <td>UserActiveModeTriggerBitmap</td>
          <td><a href="#group-trigger">User Wake-up Hints</a></td>
          <td>Bitmap of user-available wake-up methods</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>UserActiveModeTriggerInstruction</td>
          <td>string (max 128)</td>
          <td><a href="#group-trigger">User Wake-up Hints</a></td>
          <td>Wake-up operation text instructions</td>
        </tr>
        <!-- Operating Mode -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>OperatingMode</td>
          <td>OperatingModeEnum</td>
          <td><a href="#group-mode">Operating Mode</a></td>
          <td>Current operating mode (SIT / LIT)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MaximumCheckInBackOff</td>
          <td>uint32</td>
          <td><a href="#group-mode">Operating Mode</a></td>
          <td>Maximum Check-In back-off interval (seconds)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Sleep/Wake Parameters (0x0000-0x0002) ====== -->
  <h3 id="group-timing">Sleep/Wake Parameters (0x0000-0x0002)</h3>
  <p>
    Defines the device's sleep and wake cycle parameters. These three values directly determine the device's power saving level and communication responsiveness —
    the longer the idle time, the more power saved, but the slower the response.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Time Unit Note</div>
    <p>
      <code>IdleModeDuration</code> is in <strong>seconds</strong>,
      while <code>ActiveModeDuration</code> and <code>ActiveModeThreshold</code> are in <strong>milliseconds</strong>.
      For example, IdleModeDuration = 300 means 5 minutes idle, ActiveModeDuration = 10000 means 10 seconds active.
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>IdleModeDuration<br/><span class="attr-cn">Idle Mode Duration</span></td>
          <td>uint32</td>
          <td>Duration the device stays in idle (sleep) mode, in <strong>seconds</strong>. The device does not actively send or receive messages during this time. SIT devices typically &le; 15 seconds, LIT devices can reach hours. Minimum 1 second</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>ActiveModeDuration<br/><span class="attr-cn">Active Mode Duration</span></td>
          <td>uint32</td>
          <td>Duration the device stays in active mode, in <strong>milliseconds</strong>. The device maintains a communication window for at least this long each time it wakes. Minimum 300 milliseconds</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ActiveModeThreshold<br/><span class="attr-cn">Active Mode Threshold</span></td>
          <td>uint16</td>
          <td>Additional active time extension after receiving communication in active mode, in <strong>milliseconds</strong>. Timer resets on each received message, preventing the device from suddenly sleeping during interaction. SIT device minimum 300ms, LIT device minimum 5000ms</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      SIT device's <code>IdleModeDuration</code> &le; 15 seconds, aligned with MRP's Idle Retransmission Timeout,
      allowing the Controller to wait for the device to wake within the normal retry window.
      If IdleModeDuration &gt; 15 seconds, the device is in LIT mode, and the Controller must wait for Check-In messages to communicate.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Registration Management (0x0003-0x0005) ====== -->
  <h3 id="group-registration">Registration Management (0x0003-0x0005)</h3>
  <p>
    Manages the Check-In client registration list. Only registered clients will receive Check-In messages from the device.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>RegisteredClients<br/><span class="attr-cn">Registered Clients</span></td>
          <td>list&lt;<a href="#struct-monitoring-registration">MonitoringRegistrationStruct</a>&gt;</td>
          <td>List of currently registered Check-In clients. Number of registrations per Fabric cannot exceed <code>ClientsSupportedPerFabric</code>. <strong>Requires CIP feature</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>ICDCounter<br/><span class="attr-cn">Check-In Counter</span></td>
          <td>uint32</td>
          <td>Monotonically increasing counter for Check-In messages sent by the device. Clients use this to detect message replay — if the received Counter &le; the last saved value, it may indicate a replay attack. <strong>Requires CIP feature</strong></td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ClientsSupportedPerFabric<br/><span class="attr-cn">Max Clients Per Fabric</span></td>
          <td>uint16</td>
          <td>Maximum number of Check-In clients that can be registered per Fabric. Minimum 1. Limited by the device's storage and power resources — more clients means more Check-In messages to send each wake-up. <strong>Requires CIP feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== User Wake-up Hints (0x0006-0x0007) ====== -->
  <h3 id="group-trigger">User Wake-up Hints (0x0006-0x0007)</h3>
  <p>
    When the Controller needs to communicate with a LIT device but doesn't want to wait for Check-In, it can prompt the user to manually wake the device.
    These two attributes tell the App how to guide user actions — e.g. "press the button on the device" or "open/close the door once."
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>UserActiveModeTriggerHint<br/><span class="attr-cn">Wake-up Mode Hint</span></td>
          <td>UserActiveModeTriggerBitmap</td>
          <td>Bitmap identifying which methods users can use to manually wake the device. The App should display corresponding guidance based on this bitmap. <strong>Requires UAT feature</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>UserActiveModeTriggerInstruction<br/><span class="attr-cn">Wake-up Instruction</span></td>
          <td>string (max 128)</td>
          <td>Vendor-defined operation instruction text. When special trigger methods like ActuateSensorLightsBlink are set in the bitmap, this field provides specific operational guidance (e.g. "press the top button 3 times consecutively"). <strong>Requires UAT feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>UserActiveModeTriggerBitmap Common Bits</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PowerCycle</span>
        <span class="enum-desc">Power cycle — remove battery and reinsert</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">SettingsMenu</span>
        <span class="enum-desc">Device's built-in settings menu can trigger wake-up</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">CustomInstruction</span>
        <span class="enum-desc">See the UserActiveModeTriggerInstruction field for details</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">DeviceManual</span>
        <span class="enum-desc">Refer to device user manual</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ActuateSensor</span>
        <span class="enum-desc">Actuate sensor — e.g. open/close door/window, walk in front of PIR sensor</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">ActuateSensorSeconds</span>
        <span class="enum-desc">Actuate sensor then wait several seconds (Instruction field specifies seconds)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">ActuateSensorTimes</span>
        <span class="enum-desc">Actuate sensor multiple times (Instruction field specifies count)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">ActuateSensorLightsBlink</span>
        <span class="enum-desc">Actuate sensor until indicator light blinks</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 8</span>
      <div>
        <span class="enum-name">ResetButton</span>
        <span class="enum-desc">Press the device's Reset button</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 9</span>
      <div>
        <span class="enum-name">ResetButtonLightsBlink</span>
        <span class="enum-desc">Press Reset button until indicator light blinks</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 10</span>
      <div>
        <span class="enum-name">ResetButtonSeconds</span>
        <span class="enum-desc">Long press Reset button for several seconds (Instruction field specifies seconds)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 11</span>
      <div>
        <span class="enum-name">ResetButtonTimes</span>
        <span class="enum-desc">Press Reset button multiple times (Instruction field specifies count)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Operating Mode (0x0008-0x0009) ====== -->
  <h3 id="group-mode">Operating Mode (0x0008-0x0009)</h3>
  <p>Device's current operating mode and Check-In back-off parameters.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>OperatingMode<br/><span class="attr-cn">Operating Mode</span></td>
          <td><a href="#enum-operating-mode">OperatingModeEnum</a></td>
          <td>Device's current ICD operating mode: SIT (short idle) or LIT (long idle). Devices supporting DSLS feature can dynamically switch between modes. <strong>Requires LITS feature</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>MaximumCheckInBackOff<br/><span class="attr-cn">Max Check-In Backoff</span></td>
          <td>uint32</td>
          <td>Maximum Check-In message sending interval when there are no registered clients, in <strong>seconds</strong>. The device gradually extends the interval up to this limit to further conserve power when no one is listening. <strong>Requires LITS feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <h3 id="enum-operating-mode">OperatingModeEnum — Operating Mode</h3>
  <p>Describes the ICD device's current operating mode, corresponding to the <code>OperatingMode (0x0008)</code> attribute.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">SIT（Short Idle Time）</span>
        <span class="enum-desc">Short Idle Time mode — idle interval &le; 15 seconds, Controller can communicate within MRP retry window, Check-In protocol not required</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LIT（Long Idle Time）</span>
        <span class="enum-desc">Long Idle Time mode — idle interval can be up to hours, Controller must wait for Check-In message or prompt user to manually wake device</span>
      </div>
    </div>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-monitoring-registration">MonitoringRegistrationStruct</h3>
  <p>Describes a registered Check-In client's information, the structure of each list element in the <code>RegisteredClients (0x0003)</code> attribute.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CheckInNodeID</td>
          <td>uint64</td>
          <td>Node ID for receiving Check-In messages — typically the Controller or Hub from registration</td>
        </tr>
        <tr>
          <td>MonitoredSubject</td>
          <td>uint64</td>
          <td>Monitored Subject — identifies which user or entity is watching this device</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>Fabric index this registration belongs to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>MonitoringRegistrationStruct data example:</p>
  <pre><code>{
  "CheckInNodeID": 1,                   // Check-In message target node ID
  "MonitoredSubject": 112233,           // Monitored Subject (typically the user's NodeID)
  "FabricIndex": 1                      // Fabric index
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>ICD Management declares device ICD capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CIP（Check-In Protocol）</span>
        <span class="enum-desc">Check-In Protocol — device sends Check-In messages to registered clients upon waking. Enables RegisterClient / UnregisterClient commands and RegisteredClients / ICDCounter / ClientsSupportedPerFabric attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">UAT（User Active Mode Trigger）</span>
        <span class="enum-desc">User Active Mode Trigger — device supports manual wake-up by user (pressing button, triggering sensor, etc.). Enables UserActiveModeTriggerHint and UserActiveModeTriggerInstruction attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">LITS（Long Idle Time Sitting）</span>
        <span class="enum-desc">Long Idle Time Sitting — device can operate in LIT mode with idle intervals exceeding 15 seconds. Enables OperatingMode, MaximumCheckInBackOff attributes and StayActiveRequest / StayActiveResponse commands. <strong>Depends on CIP</strong></span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">DSLS（Dynamic SIT LIT Switching）</span>
        <span class="enum-desc">Dynamic SIT/LIT Switching — device can dynamically switch between SIT and LIT based on conditions (e.g., switch to SIT when there are active subscriptions for faster response, switch back to LIT when idle to save power). <strong>Depends on LITS</strong></span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature Dependencies</div>
    <p>
      LITS depends on CIP (long-idle devices must support Check-In protocol to be discoverable), DSLS depends on LITS (dynamic switching requires LIT mode support first).
      Therefore, a device supporting DSLS must have a FeatureMap of at least <code>0b1111</code> (CIP + UAT + LITS + DSLS).
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results from an ICD Management Cluster of a battery-powered door/window sensor running in LIT mode:</p>

  <pre><code>{
  // --- Sleep/Wake Time Parameters ---
  "0x0000": 300,              // IdleModeDuration = 300 seconds (idle mode lasts 5 minutes)
  "0x0001": 10,               // ActiveModeDuration = 10000 milliseconds (active mode lasts 10 seconds)
  "0x0002": 5000,             // ActiveModeThreshold = 5000 milliseconds (active mode extension threshold 5 seconds)

  // --- Registration Management ---
  "0x0003": [                 // RegisteredClients (list of registered monitoring clients)
    {
      "CheckInNodeID": 1,
      "MonitoredSubject": 1,
      "FabricIndex": 1
    }
  ],
  "0x0004": 42,               // ICDCounter = 42 (Check-In message counter)
  "0x0005": 2,                // ClientsSupportedPerFabric = 2 (max 2 clients per Fabric)

  // --- User Wake-up Hints ---
  "0x0006": 1,                // UserActiveModeTriggerHint = PowerCycle (hint user to wake by power cycling)
  "0x0007": "",               // UserActiveModeTriggerInstruction = "" (no additional instructions)

  // --- Operating Mode ---
  "0x0008": 1,                // OperatingMode = LIT (Long Idle Time mode)
  "0x0009": 3600              // MaximumCheckInBackOff = 3600 seconds (max Check-In back-off interval 1 hour)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When reading ICD Management attributes, note that the device may be sleeping.
      For SIT devices, the Controller can wait for the device to wake within the MRP retry window and complete the read;
      for LIT devices, a Check-In message must be received or the user must manually wake the device before reading.
      Before reading, you can first check <code>OperatingMode (0x0008)</code> to determine the device's operating mode.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Register Check-In Monitoring After Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>After commissioning the device, read <code>FeatureMap (0xFFFC)</code> to confirm the device supports the CIP feature</li>
        <li>Read <code>ClientsSupportedPerFabric (0x0005)</code> to confirm registration slots are available</li>
        <li>Send <code>RegisterClient (0x00)</code> with the Hub's NodeID as CheckInNodeID and generate a 16-byte HMAC Key</li>
        <li>Save the ICDCounter value returned in <code>RegisterClientResponse</code> for subsequent Check-In message verification</li>
        <li>Each time the device wakes, the Hub receives a Check-In message and completes data synchronization within the active window</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: OTA Upgrade — Extend Active Window</summary>
    <div class="scenario-content">
      <ol>
        <li>Wait for the LIT device to send a Check-In message (or prompt the user to manually wake the device)</li>
        <li>Within the device's active window, send <code>StayActiveRequest (0x03)</code> requesting sufficient active time (e.g. 120 seconds)</li>
        <li>Check <code>PromisedActiveDuration</code> in <code>StayActiveResponse</code> to confirm the actual duration the device promises</li>
        <li>Execute the OTA upgrade process within the promised time window</li>
        <li>If not enough, send another StayActiveRequest before the window ends to extend the time</li>
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

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
};
