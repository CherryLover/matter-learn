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

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>BasicInformation has 23 attributes organized into five groups. Click an attribute ID to jump to its detailed description.</p>

  <!-- 属性汇总表 -->
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
        <!-- 厂商信息 -->
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
        <!-- 产品信息 -->
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
        <!-- 版本信息 -->
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
        <!-- 设备状态 -->
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
        <!-- 规格能力 -->
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

  <!-- ====== 厂商信息（0x00-0x04）====== -->
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

  <!-- ====== 产品信息（0x05-0x06, 0x0B-0x0F, 0x12）====== -->
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

  <!-- ====== 版本信息（0x07-0x0A）====== -->
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

  <!-- ====== 设备状态（0x10-0x11）====== -->
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

  <!-- ====== 规格能力（0x13-0x16）====== -->
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

  <!-- CapabilityMinima 结构体 -->
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

  <!-- ProductAppearance 结构体 -->
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

  <!-- ====== 示例数据 ====== -->
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
    BridgedDeviceBasicInformation is a subset version of <a href="/clusters/basic-information/">BasicInformation (0x0028)</a>,
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

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>BridgedDeviceBasicInformation has 17 attributes, a subset of BasicInformation. Organized into five groups:</p>

  <!-- 属性汇总表 -->
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
        <!-- 厂商信息 -->
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
        <!-- 产品信息 -->
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
        <!-- 版本信息 -->
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
        <!-- 设备状态 -->
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>Reachable</td>
          <td>bool</td>
          <td><a href="#group-state">Device Status</a></td>
          <td>Whether the sub-device is currently reachable (core attribute)</td>
        </tr>
        <!-- 产品外观 -->
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

  <!-- ====== 厂商信息（0x01-0x04）====== -->
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

  <!-- ====== 产品信息（0x05, 0x0B-0x0F, 0x12）====== -->
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

  <!-- ====== 版本信息（0x07-0x0A）====== -->
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

  <!-- ====== 设备状态（0x11）====== -->
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

  <!-- ====== 产品外观（0x14）====== -->
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

  <!-- ProductAppearance 结构体 -->
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
  <p>BridgedDeviceBasicInformation <strong>没有定义任何 Command</strong>。</p>

  <div class="callout callout-info">
    <div class="callout-title">为什么没有 Command？</div>
    <p>
      与 BasicInformation 不同（它有一个可选的 <code>MfgSpecificPing</code>），
      BridgedDeviceBasicInformation 纯粹是一个<strong>信息展示</strong> Cluster。
      所有对子设备的控制操作（开关、调光、读传感器等）通过各自的功能 Cluster 完成，
      而不是通过基本信息 Cluster。如果需要检测子设备是否在线，直接读取 <code>Reachable</code> 属性即可。
    </p>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">Events</h2>
  <p>BridgedDeviceBasicInformation 定义了 4 个事件，用于通知 Controller 子设备的生命周期和可达状态变化。</p>

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
            子设备启动完成。携带 <code>SoftwareVersion</code> 字段，
            Controller 可据此检测固件是否在离线期间被升级
          </td>
        </tr>
        <tr id="event-shutdown">
          <td><code>0x01</code></td>
          <td>ShutDown</td>
          <td>Critical</td>
          <td>子设备正在关闭。无附加字段</td>
        </tr>
        <tr id="event-leave">
          <td><code>0x02</code></td>
          <td>Leave</td>
          <td>Info</td>
          <td>子设备从 Bridge 中移除（取消配对 / 解绑）。无附加字段</td>
        </tr>
        <tr id="event-reachable-changed">
          <td><code>0x03</code></td>
          <td>ReachableChanged</td>
          <td>Info</td>
          <td>
            子设备可达状态发生变化。携带 <code>ReachableNewValue</code>（bool）字段，
            表示变化后的新状态
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">ReachableChanged —— 桥接设备必须关注的事件</div>
    <p>
      <code>ReachableChanged</code> 是 BridgedDeviceBasicInformation 中<strong>最关键的事件</strong>，
      也是该 Cluster 独有的（BasicInformation 没有这个事件）。
    </p>
    <p>典型触发场景：</p>
    <ul>
      <li>Zigbee 子设备电池耗尽 &rarr; Bridge 检测到通信超时 &rarr; 触发 <code>ReachableChanged(false)</code></li>
      <li>Z-Wave 门锁信号恢复 &rarr; Bridge 重新收到响应 &rarr; 触发 <code>ReachableChanged(true)</code></li>
      <li>蓝牙灯泡被移出 Bridge 蓝牙范围 &rarr; 触发 <code>ReachableChanged(false)</code></li>
    </ul>
    <p>
      <strong>App 开发建议</strong>：订阅所有桥接子设备 Endpoint 上的 <code>ReachableChanged</code> 事件，
      在收到事件时立即更新设备列表的在线状态图标。不要依赖轮询 <code>Reachable</code> 属性 ——
      事件驱动更及时、更省资源。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一个通过 Zigbee Bridge 接入的温度传感器的 BridgedDeviceBasicInformation Cluster 读取结果：</p>

  <pre><code>{
  // --- Vendor Information ---
  "0x1": "Aqara",                // VendorName
  "0x2": 4447,                   // VendorID = 0x115F（Aqara）
  "0x3": "Temperature Sensor",   // ProductName
  "0x4": 514,                    // ProductID = 0x0202

  // --- Product Information ---
  "0x5": "客厅温度计",          // NodeLabel (user-defined name)
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
  "0x11": true,                  // Reachable = true（当前可达）

  // --- 产品外观 ---
  "0x14": {                      // ProductAppearance
    "Finish": 1,                 // Matte
    "PrimaryColor": 14           // White（白色）
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">读取桥接设备信息的典型流程</div>
    <p>
      当发现一个 Bridge 设备后，App 需要枚举所有桥接子设备并获取其信息：
    </p>
    <ol>
      <li>读取 Bridge 的 Endpoint 0 上的 <a href="/clusters/descriptor/"><code>Descriptor</code> Cluster</a> 的 <code>PartsList</code>，获取所有子设备 Endpoint 列表</li>
      <li>对每个子设备 Endpoint，读取 <code>BridgedDeviceBasicInformation</code>：
        <ul>
          <li><code>ProductName (0x03)</code> + <code>NodeLabel (0x05)</code> 作为设备显示名</li>
          <li><code>Reachable (0x11)</code> 判断在线状态</li>
          <li><code>SoftwareVersionString (0x0A)</code> 展示固件版本</li>
        </ul>
      </li>
      <li>订阅每个子设备 Endpoint 上的 <code>ReachableChanged</code> 事件</li>
      <li>注意：读取时指定的是<strong>子设备的 Endpoint</strong>（如 1、2、3），不是 Endpoint 0</li>
    </ol>
  </div>

  <!-- ====== 使用场景 ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <h3>Scenario 1: Zigbee Gateway Bridging Multiple Sub-devices</h3>
  <p>
    一个常见的 Matter Bridge 场景：Zigbee 网关（如 Aqara Hub M2）同时管理多个 Zigbee 子设备，
    通过 Matter 协议将它们暴露给 Apple Home / Google Home / Amazon Alexa。
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
          <td>Bridge（网关自身）</td>
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
    注意 Endpoint 3 的 <code>Reachable</code> 为 <code>false</code> ——
    这意味着该 IKEA 智能插座当前不可达（可能是信号问题或已断电）。
    App 应在设备列表中将其标记为离线状态。
  </p>

  <h3>Scenario 2: Reachable Status Monitoring</h3>
  <p>
    App 需要实时追踪桥接子设备的在线状态，以提供准确的 UI 反馈和可靠的自动化执行。
  </p>
  <div class="callout callout-info">
    <div class="callout-title">监控流程</div>
    <ol>
      <li>
        <strong>初始化</strong>：App 连接 Bridge 后，读取所有子设备 Endpoint 的 <code>Reachable</code> 属性，
        建立初始在线状态表
      </li>
      <li>
        <strong>订阅</strong>：对每个子设备 Endpoint 订阅 <code>ReachableChanged</code> 事件
      </li>
      <li>
        <strong>响应</strong>：收到 <code>ReachableChanged</code> 事件后：
        <ul>
          <li>如果 <code>ReachableNewValue = false</code>：设备列表标灰、禁用控制按钮、通知用户</li>
          <li>如果 <code>ReachableNewValue = true</code>：恢复设备图标、启用控制按钮</li>
        </ul>
      </li>
      <li>
        <strong>自动化</strong>：在执行包含桥接设备的自动化之前，先检查 <code>Reachable</code>，
        避免向不可达设备发送命令导致超时
      </li>
    </ol>
  </div>

  <h3>Scenario 3: Device Identification and Deduplication</h3>
  <p>
    当 Bridge 重启或固件升级后，子设备的 Endpoint 编号可能发生变化。
    App 需要正确识别"这还是之前那台设备"，避免出现重复设备或丢失用户配置。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">识别策略</div>
    <p>推荐的设备识别优先级：</p>
    <ol>
      <li>
        <strong><code>UniqueID (0x12)</code></strong>（最优先）：全局唯一且在 Bridge 重启后不变。
        Bridge 通常使用子设备的 Zigbee IEEE 地址（如 <code>00:15:8d:00:02:3a:4b:5c</code>）
        或 Z-Wave DSK 生成
      </li>
      <li>
        <strong><code>SerialNumber (0x0F)</code></strong>：如果子设备提供序列号，可作为辅助标识
      </li>
      <li>
        <strong><code>VendorID + ProductID</code></strong>：仅能识别产品型号，不能区分同型号的不同设备。
        结合 Endpoint 编号使用时需注意 Endpoint 可能在 Bridge 重启后变化
      </li>
    </ol>
    <p>
      <strong>最佳实践</strong>：以 <code>UniqueID</code> 作为主键存储设备信息，
      当 Bridge 重启后重新枚举子设备时，用 <code>UniqueID</code> 匹配已有记录，
      即使 Endpoint 编号变了也能正确恢复房间归属、设备名称和自动化规则。
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
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    PowerSource 描述设备的电源信息，包括电源状态、有线供电参数、电池电量与充电信息。
    这个 Cluster 是<strong>只读的</strong> —— 没有 Command，只有 Attribute。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">电量计算陷阱</div>
    <p>
      <code>BatPercentRemaining</code> 的值需要<strong>除以 2</strong> 才是实际百分比。
      例如设备返回 <code>200</code>，实际电量是 <code>100%</code>；返回 <code>150</code>，实际电量是 <code>75%</code>。
      如果直接拿原始值当百分比显示，用户会看到 "200%" 的电量。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>PowerSource 的属性按功能分为五组。点击属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
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
        <!-- 状态信息 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Status</td>
          <td>enum8</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>电源状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>Order</td>
          <td>uint8</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>电源优先级排序</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>Description</td>
          <td>string</td>
          <td><a href="#group-status">Status Information</a></td>
          <td>电源描述文字</td>
        </tr>
        <!-- 有线供电 -->
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>WiredAssessedInputVoltage</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>检测输入电压（mV）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>WiredAssessedInputFrequency</td>
          <td>uint16</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>检测输入频率（Hz）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>WiredCurrentType</td>
          <td>enum8</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>电流类型（AC/DC）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>WiredAssessedCurrent</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>检测电流（mA）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>WiredNominalVoltage</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>额定电压（mV）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>WiredMaximumCurrent</td>
          <td>uint32</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>最大电流（mA）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>WiredPresent</td>
          <td>bool</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>有线电源是否连接</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>ActiveWiredFaults</td>
          <td>list</td>
          <td><a href="#group-wired">Wired Power</a></td>
          <td>当前有线电源故障列表</td>
        </tr>
        <!-- 电池基础 -->
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>BatVoltage</td>
          <td>uint32</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池电压（mV）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0C">
          <td><a href="#attr-0x0C"><code>0x0C</code></a></td>
          <td>BatPercentRemaining</td>
          <td>uint8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池剩余百分比（需除以 2）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0D">
          <td><a href="#attr-0x0D"><code>0x0D</code></a></td>
          <td>BatTimeRemaining</td>
          <td>uint32</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>预估剩余时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0E">
          <td><a href="#attr-0x0E"><code>0x0E</code></a></td>
          <td>BatChargeLevel</td>
          <td>enum8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池电量等级</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>BatReplacementNeeded</td>
          <td>bool</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>是否需要更换电池</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>BatReplaceability</td>
          <td>enum8</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池可更换性</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>BatPresent</td>
          <td>bool</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池是否安装</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>ActiveBatFaults</td>
          <td>list</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>当前电池故障列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>BatReplacementDescription</td>
          <td>string</td>
          <td><a href="#group-battery-basic">Battery Basics</a></td>
          <td>电池更换说明</td>
        </tr>
        <!-- 电池规格 -->
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>BatCommonDesignation</td>
          <td>enum16</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>电池通用型号代码</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>BatANSIDesignation</td>
          <td>string</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>ANSI 标准编号</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>BatIECDesignation</td>
          <td>string</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>IEC 标准编号</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>BatApprovedChemistry</td>
          <td>enum16</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>电池化学类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>BatCapacity</td>
          <td>uint32</td>
          <td><a href="#group-battery-spec">Battery Specifications</a></td>
          <td>电池容量（mAh）</td>
        </tr>
        <!-- 充电信息 -->
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>BatQuantity</td>
          <td>uint8</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>电池数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>BatChargeState</td>
          <td>enum8</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>充电状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>BatTimeToFullCharge</td>
          <td>uint32</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>充满预估时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>BatFunctionalWhileCharging</td>
          <td>bool</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>充电时设备是否可用</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1D">
          <td><a href="#attr-0x1D"><code>0x1D</code></a></td>
          <td>BatChargingCurrent</td>
          <td>uint32</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>充电电流（mA）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>ActiveBatChargeFaults</td>
          <td>list</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>当前充电故障列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1F">
          <td><a href="#attr-0x1F"><code>0x1F</code></a></td>
          <td>EndpointList</td>
          <td>list</td>
          <td><a href="#group-charging">Charging Information</a></td>
          <td>该电源供电的 Endpoint 列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 状态信息（0x00-0x02）====== -->
  <h3 id="group-status">Status Information (0x00 – 0x02)</h3>
  <p>每个 PowerSource 实例必须具备的基础属性，描述电源的当前状态和身份。</p>

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
          <td>Status（电源状态）</td>
          <td>enum8</td>
          <td>当前电源工作状态（见下方枚举）</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>Order（优先级）</td>
          <td>uint8</td>
          <td>电源优先级排序。设备有多个电源时，数值越小优先级越高</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>Description（描述）</td>
          <td>string</td>
          <td>电源描述文字，如 <code>"Battery"</code>、<code>"USB-C"</code>、<code>"DC Power"</code></td>
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

  <!-- ====== 有线供电（0x03-0x0A）====== -->
  <h3 id="group-wired">Wired Power (0x03 – 0x0A)</h3>
  <p>描述有线电源的电气参数和状态。这组属性仅在电源类型为有线时才有意义。</p>
  <div class="callout callout-info">
    <div class="callout-title">Applicable Scope</div>
    <p>
      大多数电池供电设备（如门锁、传感器）不会上报有线供电属性。
      这组属性主要出现在使用 AC/DC 适配器、USB 或 PoE 供电的设备上。
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
          <td>WiredAssessedInputVoltage（检测输入电压）</td>
          <td>uint32</td>
          <td>有线输入的实际检测电压，单位 mV</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>WiredAssessedInputFrequency（检测输入频率）</td>
          <td>uint16</td>
          <td>有线输入的实际检测频率，单位 Hz。仅交流供电时有意义</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>WiredCurrentType（电流类型）</td>
          <td>enum8</td>
          <td>电流类型：<code>0</code> = AC（交流），<code>1</code> = DC（直流）</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>WiredAssessedCurrent（检测电流）</td>
          <td>uint32</td>
          <td>有线输入的实际检测电流，单位 mA</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>WiredNominalVoltage（额定电压）</td>
          <td>uint32</td>
          <td>有线电源的额定电压，单位 mV</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>WiredMaximumCurrent（最大电流）</td>
          <td>uint32</td>
          <td>有线电源支持的最大电流，单位 mA</td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>WiredPresent（有线电源在位）</td>
          <td>bool</td>
          <td>有线电源是否已连接。<code>true</code> = 已插入，<code>false</code> = 未连接</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>ActiveWiredFaults（有线故障列表）</td>
          <td>list</td>
          <td>当前有线电源的活跃故障列表，如过压、过流等</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 电池基础（0x0B-0x13）====== -->
  <h3 id="group-battery-basic">Battery Basics (0x0B – 0x13)</h3>
  <p>电池供电设备最常用的属性组 —— App 展示电池电量和低电提醒都依赖这些属性。</p>

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
          <td>BatVoltage（电池电压）</td>
          <td>uint32</td>
          <td>当前电池电压，单位 mV</td>
        </tr>
        <tr id="attr-0x0C">
          <td><code>0x0C</code></td>
          <td>BatPercentRemaining（剩余百分比）</td>
          <td>uint8</td>
          <td>电池剩余百分比。<strong>实际百分比 = 值 / 2</strong>，范围 0~200 对应 0%~100%。Nullable，设备不支持精确电量时返回 <code>null</code></td>
        </tr>
        <tr id="attr-0x0D">
          <td><code>0x0D</code></td>
          <td>BatTimeRemaining（预估剩余时间）</td>
          <td>uint32</td>
          <td>电池预估可用时间，单位秒。Nullable</td>
        </tr>
        <tr id="attr-0x0E">
          <td><code>0x0E</code></td>
          <td>BatChargeLevel（电量等级）</td>
          <td>enum8</td>
          <td>电池电量等级（见下方枚举）</td>
        </tr>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>BatReplacementNeeded（需要更换）</td>
          <td>bool</td>
          <td>是否需要更换电池。<code>true</code> = 应尽快更换</td>
        </tr>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>BatReplaceability（可更换性）</td>
          <td>enum8</td>
          <td>电池的可更换方式（见下方枚举）</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>BatPresent（电池在位）</td>
          <td>bool</td>
          <td>电池是否已安装。<code>true</code> = 已安装</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>ActiveBatFaults（电池故障列表）</td>
          <td>list</td>
          <td>当前电池的活跃故障列表，如过热、电压异常等</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>BatReplacementDescription（更换说明）</td>
          <td>string</td>
          <td>电池更换说明，包括型号、规格等，如 <code>"4x AA"</code>、<code>"CR2032"</code></td>
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

  <!-- ====== 电池规格（0x14-0x18）====== -->
  <h3 id="group-battery-spec">Battery Specifications (0x14 – 0x18)</h3>
  <p>描述电池的具体型号和技术规格，用于指导用户选择正确的替换电池。</p>

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
          <td>BatCommonDesignation（通用型号代码）</td>
          <td>enum16</td>
          <td>电池通用型号的数字代码，如 AA=15, AAA=10, CR2032=40 等</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>BatANSIDesignation（ANSI 编号）</td>
          <td>string</td>
          <td>电池的 ANSI 标准编号</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>BatIECDesignation（IEC 编号）</td>
          <td>string</td>
          <td>电池的 IEC 标准编号</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>BatApprovedChemistry（化学类型）</td>
          <td>enum16</td>
          <td>电池化学类型，如 Alkaline=1, LithiumIon=6 等</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>BatCapacity（电池容量）</td>
          <td>uint32</td>
          <td>电池容量，单位 mAh</td>
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

  <!-- ====== 充电信息（0x19-0x1F）====== -->
  <h3 id="group-charging">Charging Information (0x19 – 0x1F)</h3>
  <p>描述电池的充电状态和充电参数，以及电源与 Endpoint 的映射关系。</p>

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
          <td>BatQuantity（电池数量）</td>
          <td>uint8</td>
          <td>设备使用的电池数量</td>
        </tr>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>BatChargeState（充电状态）</td>
          <td>enum8</td>
          <td>当前充电状态（见下方枚举）</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>BatTimeToFullCharge（充满时间）</td>
          <td>uint32</td>
          <td>预估充满剩余时间，单位秒。Nullable</td>
        </tr>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>BatFunctionalWhileCharging（充电时可用）</td>
          <td>bool</td>
          <td>充电期间设备是否仍可正常使用。<code>true</code> = 可用</td>
        </tr>
        <tr id="attr-0x1D">
          <td><code>0x1D</code></td>
          <td>BatChargingCurrent（充电电流）</td>
          <td>uint32</td>
          <td>当前充电电流，单位 mA</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>ActiveBatChargeFaults（充电故障列表）</td>
          <td>list</td>
          <td>当前充电过程中的活跃故障列表</td>
        </tr>
        <tr id="attr-0x1F">
          <td><code>0x1F</code></td>
          <td>EndpointList（供电端点列表）</td>
          <td>list</td>
          <td>该电源所供电的 Endpoint 编号列表。用于标识一个电源为哪些功能端点供电</td>
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

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一个典型电池供电设备的 PowerSource Cluster 读取结果：</p>

  <pre><code>{
  // --- 状态信息 ---
  "0x0": 1,                  // Status = Active（正在供电）
  "0x1": 0,                  // Order = 0（最高优先级）
  "0x2": "Battery",          // Description = "Battery"

  // --- 电池基础 ---
  "0xB": 3200,               // BatVoltage = 3200 mV
  "0xC": 180,                // BatPercentRemaining = 180 → 实际 90%
  "0xD": 7776000,            // BatTimeRemaining = 7776000 秒（约 90 天）
  "0xE": 0,                  // BatChargeLevel = OK
  "0xF": false,              // BatReplacementNeeded = false
  "0x10": 2,                 // BatReplaceability = UserReplaceable
  "0x11": true,              // BatPresent = true（电池已安装）
  "0x13": "4x AA",           // BatReplacementDescription

  // --- 电池规格 ---
  "0x14": 15,                // BatCommonDesignation = 15（AA）
  "0x18": 2800,              // BatCapacity = 2800 mAh

  // --- 充电信息 ---
  "0x1A": 3                  // BatChargeState = IsNotCharging（干电池不充电）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">电量展示处理逻辑</div>
    <p>
      展示电量信息时，典型的处理流程：
    </p>
    <ol>
      <li>读取 <code>BatPercentRemaining (0x0C)</code>，<strong>除以 2</strong> 得到百分比</li>
      <li>根据 <code>BatChargeLevel (0x0E)</code> 决定图标颜色：OK 绿色，Warning 黄色，Critical 红色</li>
      <li>如果 <code>BatReplacementNeeded (0x0F)</code> 为 <code>true</code>，额外显示更换提示</li>
      <li>注意 <code>BatPercentRemaining</code> 是 <strong>Nullable</strong>，可能为 <code>null</code>（设备不支持精确电量时），此时用 <code>BatChargeLevel</code> 做粗略展示</li>
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
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root Node）
  </p>
  <p>
    PowerSourceConfiguration 是一个极其简单的 Cluster —— 只有<strong>一个属性、没有命令</strong>。
    它的唯一职责是告诉你：这台设备的电源信息分别在哪些 Endpoint 上，以及它们的优先级顺序。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">和 PowerSource 的关系</div>
    <p>
      这两个 Cluster 是搭档关系，分工明确：
    </p>
    <ul>
      <li><strong>PowerSourceConfiguration</strong>（本页）—— 在 Endpoint 0，回答「电源信息在哪」：哪些 Endpoint 承载了 PowerSource Cluster，优先级怎么排</li>
      <li><strong>PowerSource</strong>（<a href="/clusters/power-source/">0x002F</a>）—— 在各功能 Endpoint 上，回答「电源状态是什么」：电量多少、在不在充电、电压多少</li>
    </ul>
    <p>
      App 的典型流程：先读 PowerSourceConfiguration 拿到端点列表 → 再逐个去对应 Endpoint 读 PowerSource 拿实际数据。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>PowerSourceConfiguration 只有一个属性，是必须支持的。</p>

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
          <td>承载 PowerSource Cluster 的端点列表，按优先级排序</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">Sources (Power Endpoint List)</h3>
  <p>
    一个<strong>有序列表</strong>，每个元素是一个 Endpoint 编号，指向一个承载了 PowerSource Cluster 的端点。
    列表的顺序即优先级：<strong>第一个元素是主电源</strong>，后续依次为备用电源。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">为什么需要这个列表</div>
    <p>
      一台设备可能有多个电源（市电 + 电池、USB + 太阳能），每个电源的详细信息各自在不同的 Endpoint 上。
      Sources 列表就是这些 Endpoint 的「目录」，App 不需要遍历所有 Endpoint 去猜哪个有电源信息 ——
      直接读这个列表就知道该去哪些 Endpoint 拿数据。
    </p>
  </div>
  <p>
    如果列表为空，说明设备没有报告任何电源信息。列表中的 Endpoint 编号与 Descriptor Cluster 中的 PartsList 一致。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 没有命令 ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    PowerSourceConfiguration <strong>没有任何命令</strong>。它是一个纯只读的配置型 Cluster，所有信息通过读取 Sources 属性获得。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取 Endpoint 0 上的 PowerSourceConfiguration Cluster：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": [1, 2]    // Sources = [Endpoint 1, Endpoint 2]
                    // 优先级：Endpoint 1 是主电源，Endpoint 2 是备用电源
}</code></pre>

  <!-- ====== 场景一 ====== -->
  <h2 id="scenario-single">Scenario 1: Single Power Source Device (Battery Door Lock)</h2>
  <p>
    一台电池供电的智能门锁，只有一个电源。PowerSourceConfiguration 的 Sources 列表只包含一个 Endpoint，
    App 直接去那个 Endpoint 读取 PowerSource 就能拿到电池电量。
  </p>
  <pre><code>// 场景一：只有一个电源的简单设备（如电池门锁）
// Endpoint 0 — PowerSourceConfiguration
{
  "0x0": [1]       // Sources = [Endpoint 1]
                   // 只有一个电源，在 Endpoint 1 的 PowerSource Cluster 里查看详情
}

// Endpoint 1 — PowerSource（去这里读电池电量）
{
  "0x0": 1,        // Status = Active
  "0x1": 0,        // Order = 0（唯一电源）
  "0x2": "Battery",
  "0xC": 180       // BatPercentRemaining = 180 → 实际 90%
}</code></pre>
  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      对于只有一个电源的设备，Sources 列表长度为 1，App 逻辑可以简化 —— 直接读第一个 Endpoint 的 PowerSource 即可，不需要展示优先级或切换逻辑。
    </p>
  </div>

  <!-- ====== 场景二 ====== -->
  <h2 id="scenario-multi">Scenario 2: Dual Power Source Device (UPS Gateway)</h2>
  <p>
    一台网关设备同时支持市电和内置电池供电。PowerSourceConfiguration 列出两个 Endpoint，
    第一个是市电（主电源），第二个是电池（备用电源）。停电时设备自动切换到电池，App 可以据此展示当前供电状态。
  </p>
  <pre><code>// 场景二：双电源设备（如 UPS 供电的网关）
// Endpoint 0 — PowerSourceConfiguration
{
  "0x0": [1, 2]    // Sources = [Endpoint 1, Endpoint 2]
                   // Endpoint 1 优先级更高（主电源），Endpoint 2 是备用
}

// Endpoint 1 — PowerSource（主电源：市电）
{
  "0x0": 1,        // Status = Active（正在供电）
  "0x1": 0,        // Order = 0（最高优先级）
  "0x2": "Mains"   // Description = "Mains"（市电）
}

// Endpoint 2 — PowerSource（备用电源：内置电池）
{
  "0x0": 0,        // Status = Unspecified（待命中）
  "0x1": 1,        // Order = 1（次优先级）
  "0x2": "Battery",
  "0xC": 200       // BatPercentRemaining = 200 → 实际 100%
}</code></pre>
  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      双电源场景下，App 可以这样处理：
    </p>
    <ol>
      <li>读取 Sources 列表，遍历每个 Endpoint 的 PowerSource</li>
      <li>检查每个电源的 <code>Status</code> 属性，找到当前 <code>Active</code> 的那个</li>
      <li>如果主电源（列表第一个）不是 Active，说明设备在用备用电源，可以提示用户</li>
      <li>订阅各 PowerSource 的 <code>Status</code> 变化，实时感知电源切换</li>
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
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root）或各功能 Endpoint
  </p>
  <p>
    Fixed Label 存储设备在出厂时写入的标签（键值对），用于描述设备的物理属性或预设分类。
    这些标签是<strong>只读的</strong> —— 用户和 App 都无法修改，只能读取。
    标签内容由制造商在生产阶段确定，比如设备预设的房间、楼层、朝向等信息。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">和 UserLabel 的关系</div>
    <p>
      Fixed Label（<code>0x0040</code>）是只读的出厂标签，UserLabel（<code>0x0041</code>）是用户可写的自定义标签。
      两者结构完全相同（都用 <code>LabelStruct</code>），区别只在于谁能改 ——
      Fixed Label 由制造商在工厂写入后锁定，UserLabel 由用户随时修改。
      App 通常会合并读取两者，出厂标签作为默认值，用户标签作为覆盖。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Fixed Label 只有一个属性，非常简单。</p>

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
          <td>出厂标签列表（键值对数组）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">LabelList (Factory Label List)</h3>
  <p>
    一个 <code>LabelStruct</code> 数组，每个元素是一个键值对。列表可以为空（设备没有预设标签），
    也可以包含多个条目。标签的键（Label）在同一个列表中<strong>不应重复</strong>。
  </p>
  <p>
    这个属性是只读的，设备启动后内容固定不变。如果需要可写的标签，使用 UserLabel Cluster（<code>0x0041</code>）。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">空列表也是合法的</div>
    <p>
      并非所有设备都有出厂标签。很多设备的 <code>LabelList</code> 返回空数组 <code>[]</code>，
      这是完全正常的。App 应当处理空列表的情况，不要假设一定有标签数据。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LabelStruct 结构体 ====== -->
  <h2 id="label-struct">LabelStruct 结构体</h2>
  <p>
    <code>LabelStruct</code> 是 Fixed Label 和 UserLabel 共用的数据结构，定义了一个标签的键和值。
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
          <td>16 字符</td>
          <td>标签键，描述标签的含义（如 "room"、"floor"）</td>
        </tr>
        <tr>
          <td><code>Value</code></td>
          <td>string</td>
          <td>16 字符</td>
          <td>标签值，键对应的具体内容（如 "kitchen"、"2"）</td>
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
        <span class="enum-desc">如 "kitchen"、"bedroom"、"living room"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">floor</span>
      <div>
        <span class="enum-name">Floor</span>
        <span class="enum-desc">如 "1"、"2"、"B1"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">orientation</span>
      <div>
        <span class="enum-name">Orientation</span>
        <span class="enum-desc">如 "N"、"S"、"NE"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">position</span>
      <div>
        <span class="enum-name">Position</span>
        <span class="enum-desc">如 "left"、"right"、"top"</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">zone</span>
      <div>
        <span class="enum-name">Zone</span>
        <span class="enum-desc">如 "A"、"B"、"public"</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">标签键没有强制规范</div>
    <p>
      Matter 规范没有定义标签键的固定列表，上面只是常见用法。
      制造商可以使用任意字符串作为键，只要不超过 16 个字符。
      App 端不应硬编码对特定键的依赖，而应优雅地展示任何键值对。
    </p>
  </div>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Fixed Label Cluster <strong>没有任何命令</strong>。这是一个纯数据 Cluster ——
    只提供只读属性供 App 读取，不接受任何写入或操作指令。
    如果需要修改标签，请使用 UserLabel Cluster（<code>0x0041</code>）。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一个厨房传感器设备的 Fixed Label 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": [                    // LabelList — 出厂标签列表
    {
      "Label": "room",        // 标签键：房间
      "Value": "kitchen"      // 标签值：厨房
    },
    {
      "Label": "floor",       // 标签键：楼层
      "Value": "2"            // 标签值：2 楼
    },
    {
      "Label": "orientation", // 标签键：朝向
      "Value": "N"            // 标签值：北
    }
  ]
}</code></pre>

  <!-- ====== 应用场景 ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <h3 id="scenario-1">Scenario 1: Automatically Assign Device to Room</h3>
  <p>
    用户配网完成后，App 读取设备的出厂标签。如果标签中包含 <code>room</code> 键，
    App 可以自动将设备归类到对应房间，省去用户手动选择的步骤。
  </p>
  <pre><code>// 场景：App 读取设备的出厂标签，自动归类到对应房间
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x0040",
      "attributeId": "0x00"     // LabelList
    }
  }]
}

// 返回结果
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
      配网完成后自动读取 Fixed Label，用已知的键（room、floor）做初始分组建议，
      但始终让用户确认或修改。出厂标签只是参考，用户的实际安装位置可能不同。
    </p>
  </div>

  <h3 id="scenario-2">Scenario 2: Distinguishing Sub-functions in Multi-Endpoint Devices</h3>
  <p>
    一个双路开关有两个 Endpoint，每个 Endpoint 上的 Fixed Label 标注了物理位置（左/右）。
    App 读取标签后可以直接在 UI 上标注「左开关」「右开关」，而不是显示无意义的 Endpoint 编号。
  </p>
  <pre><code>// 场景：多 Endpoint 设备，每个 Endpoint 有不同的出厂标签
// Endpoint 1 — 左侧开关
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0040",
      "attributeId": "0x00"
    }
  }]
}
// 返回: [{ "Label": "position", "Value": "left" }]

// Endpoint 2 — 右侧开关
{
  "readRequests": [{
    "attributePath": {
      "endpointId": 2,
      "clusterId": "0x0040",
      "attributeId": "0x00"
    }
  }]
}
// 返回: [{ "Label": "position", "Value": "right" }]</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      对于多 Endpoint 设备，逐个读取每个 Endpoint 的 Fixed Label。
      如果标签中有 <code>position</code> 键，用它来标注 UI 中的子设备名称，
      给用户更直观的控制界面。
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
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 0</code>（Root）或功能端点 &nbsp;|&nbsp;
    <strong>角色</strong>: Server（可读写，无命令）
  </p>
  <p>
    UserLabel 允许用户或 App 为设备打上自定义的键值对标签，用于分类、分组、备注等用途。
    这是一个极其简单的 Cluster —— <strong>0 个命令</strong>、<strong>0 个事件</strong>，
    只有 <strong>1 个可写属性</strong> <code>LabelList</code>，通过直接写属性来管理标签。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">UserLabel vs FixedLabel</div>
    <p>
      Matter 有两个标签 Cluster，区别在于谁能改：
    </p>
    <ul>
      <li><strong>FixedLabel（0x0040）</strong> —— 厂商在出厂时写入的标签，<strong>只读</strong>，App 无法修改。例如 <code>"room"/"factory-default"</code>、<code>"model"/"v2"</code></li>
      <li><strong>UserLabel（0x0041）</strong> —— 用户自定义的标签，<strong>可读写</strong>，App 可以随时增删改。例如 <code>"zone"/"living-room"</code>、<code>"owner"/"alice"</code></li>
    </ul>
    <p>
      两者数据结构完全相同（都是 <code>LabelStruct</code> 列表），只是读写权限不同。
      读取设备标签时，应该合并两个 Cluster 的结果，FixedLabel 提供厂商默认值，UserLabel 提供用户自定义值。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Per-Fabric 隔离</div>
    <p>
      UserLabel 的标签是 <strong>per-fabric（按 Fabric 隔离）</strong>的。
      每个 Fabric 只能看到和修改自己写入的标签，无法访问其他 Fabric 的标签。
      例如，用户通过 Apple Home 写入的 <code>"zone"/"kitchen"</code>，在 Google Home 上是看不到的。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>UserLabel 只有一个属性，且是必须支持的。</p>

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
          <td>用户自定义的标签列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">LabelList (Label List)</h3>
  <p>
    一个 <code>LabelStruct</code> 的列表，每个元素是一对 Label（键）+ Value（值）字符串。
    App 通过 <strong>Write Attribute</strong> 操作来增删改标签 —— 每次写入都是<strong>整体替换</strong>，
    不是追加。如果想新增一个标签，需要先读取现有列表，追加后再整体写回。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">没有命令，全靠写属性</div>
    <p>
      UserLabel 没有定义任何命令。所有操作（新增、修改、删除标签）都通过写 <code>LabelList</code> 属性完成。
      这是 Matter 中少数「纯属性驱动」的 Cluster 之一。写入时要注意整体替换的语义 —— 漏掉已有标签相当于删除它。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LabelStruct 结构体 ====== -->
  <h2 id="label-struct">LabelStruct 结构体</h2>
  <p>
    <code>LabelStruct</code> 是 UserLabel 和 FixedLabel 共用的数据结构，表示一个键值对标签。
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
          <td>最长 16 字符</td>
          <td>标签的键名，如 <code>"zone"</code>、<code>"owner"</code></td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>Value</td>
          <td>string</td>
          <td>最长 16 字符</td>
          <td>标签的值，如 <code>"living-room"</code>、<code>"alice"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">长度限制</div>
    <p>
      Label 和 Value 都有 <strong>最长 16 字符</strong>的硬限制。
      App 端在写入前应做校验，超出长度的写入会被设备拒绝（返回 <code>CONSTRAINT_ERROR</code>）。
      建议使用短小精悍的英文缩写作为键名，值可以适当使用中文但要注意字符长度（中文字符按 UTF-8 编码计算可能占 3 字节，但 Matter 按字符数计算，16 个中文字符是允许的）。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一台智能灯的 UserLabel Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": [                    // LabelList（标签列表）
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

  <p>写入标签（Write Attribute 请求）：</p>
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
      写属性的流程是<strong>读 → 改 → 写</strong>三步：
    </p>
    <ol>
      <li>先 Read Attribute 获取当前 <code>LabelList</code></li>
      <li>在本地修改列表（增 / 删 / 改某个标签）</li>
      <li>将完整列表通过 Write Attribute 写回设备</li>
    </ol>
    <p>
      直接写入新列表而不先读取，会丢失其他 App 之前写入的标签。
      如果多个 App 可能同时操作标签，建议加上乐观锁逻辑（读取时记录版本，写入前再次确认）。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Group Devices by Zone</summary>
    <div class="scenario-content">
      <p>
        用户家中有多台同类设备（例如 5 个智能灯泡），需要按房间、楼层等维度组织管理。
        通过 UserLabel 为每台设备打上位置标签，App 就可以按标签分组展示。
      </p>
      <ol>
        <li>配网完成后，引导用户为设备设置区域标签</li>
        <li>写入标签：<code>{'{"zone": "living-room", "floor": "1F"}'}</code></li>
        <li>App 首页按 <code>zone</code> 值分组显示设备</li>
        <li>用户搬动设备后，可在 App 中修改 <code>zone</code> 值</li>
        <li>支持自定义区域名，不限于预置列表</li>
      </ol>
      <p>
        与 Matter 的 Groups Cluster 不同，UserLabel 是纯元数据标记，不影响设备的群组控制行为。
        适合做 App 层面的 UI 分组，而非设备层面的联动控制。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Device Ownership Tagging in Multi-user Households</summary>
    <div class="scenario-content">
      <p>
        一个家庭中有多个成员，某些设备归属于特定成员（如儿童房的灯、书房的台灯）。
        通过 UserLabel 记录归属信息，App 可以为不同成员展示不同的设备视图。
      </p>
      <ol>
        <li>为设备写入归属标签：<code>{'{"owner": "alice", "usage": "reading"}'}</code></li>
        <li>App 根据当前登录用户的名字过滤 <code>owner</code> 标签</li>
        <li>「我的设备」页面只展示 owner 匹配的设备</li>
        <li>管理员视图仍可看到全部设备</li>
      </ol>
      <p>
        注意：UserLabel 是 per-fabric 的，如果家庭成员使用不同的 Fabric（不同品牌的 App），
        各自的标签互相不可见。同一 Fabric 下的所有 App 共享同一套标签。
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
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root / Node 级别）
  </p>
  <p>
    LocalizationConfiguration 用于管理设备的语言和区域设置。它让控制端（App / 语音助手）能够查询设备支持哪些语言，
    并切换设备当前使用的语言区域。语言标签遵循 <strong>BCP 47</strong> 标准（如 <code>"en-US"</code>、<code>"zh-CN"</code>）。
  </p>
  <p>
    这个 Cluster 非常简单 —— 只有 <strong>2 个属性</strong>，<strong>没有命令</strong>。
    语言切换通过直接 <strong>Write（写入）</strong> <code>ActiveLocale</code> 属性完成。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      用户在 App 里切换设备语言（比如把门锁的语音提示从英文改成中文）时，
      就是向这个 Cluster 写入新的 <code>ActiveLocale</code> 值。
      也可以在配网完成后自动将设备语言设置为与手机系统语言一致。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>LocalizationConfiguration 只有两个属性，都是必须支持的。点击属性 ID 可跳转到详细说明。</p>

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
          <td>当前生效的语言区域（BCP 47 标签）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>SupportedLocales</td>
          <td>list&lt;string&gt;</td>
          <td>Read-only</td>
          <td>设备支持的所有语言区域列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">ActiveLocale (Current Language Region)</h3>
  <p>
    设备当前生效的语言区域标签，格式为 BCP 47（如 <code>"en-US"</code>、<code>"zh-CN"</code>）。
    写入一个新值即可切换设备语言，但写入的值<strong>必须</strong>在 <code>SupportedLocales</code> 列表中，
    否则设备会返回 <code>CONSTRAINT_ERROR</code>。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">BCP 47 标签格式</div>
    <p>
      BCP 47 语言标签由语言代码和可选的区域代码组成，中间用连字符连接。常见示例：
    </p>
    <ul>
      <li><code>en-US</code> — 英语（美国）</li>
      <li><code>zh-CN</code> — 简体中文（中国大陆）</li>
      <li><code>zh-TW</code> — 繁体中文（台湾）</li>
      <li><code>ja-JP</code> — 日语（日本）</li>
      <li><code>de-DE</code> — 德语（德国）</li>
    </ul>
  </div>
  <p>写入示例（将设备切换为简体中文）：</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002B",
      "attributeId": "0x00"        // ActiveLocale
    },
    "attributeValue": "zh-CN"      // 切换为简体中文
  }]
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">SupportedLocales (Supported Language List)</h3>
  <p>
    只读属性，返回设备支持的所有语言区域标签列表。列表内容由设备固件决定，App 端无法修改。
    在切换语言之前，应先读取这个属性确认设备支持目标语言。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">Note</div>
    <p>
      不同设备的支持列表差异很大。低成本设备可能只支持 <code>["en-US"]</code> 一种语言，
      而高端设备可能支持十几种。App 切换语言前务必检查此列表，避免写入不支持的值导致错误。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 没有命令 ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    LocalizationConfiguration Cluster <strong>没有定义任何命令</strong>。
    所有操作都通过直接读写属性完成 —— 读取 <code>SupportedLocales</code> 查看支持的语言，
    写入 <code>ActiveLocale</code> 切换语言。这是 Matter 中最简单的交互模式之一。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一个智能门锁设备的 LocalizationConfiguration Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": "en-US",           // ActiveLocale = 当前语言区域
  "0x1": [                  // SupportedLocales = 设备支持的语言列表
    "en-US",
    "zh-CN",
    "zh-TW",
    "ja-JP",
    "ko-KR",
    "de-DE",
    "fr-FR"
  ]
}</code></pre>

  <!-- ====== 实际场景 ====== -->
  <h2 id="scenarios">Real-world Scenarios</h2>

  <details>
    <summary>Scenario 1: Automatically Set Device Language After Commissioning</summary>
    <div class="scenario-content">
      <p>
        设备配网完成后，App 自动将设备语言与手机系统语言对齐，避免用户手动设置：
      </p>
      <ol>
        <li>获取手机系统语言（如 <code>"zh-CN"</code>）</li>
        <li>读取设备的 <code>SupportedLocales</code> 属性，得到支持列表</li>
        <li>检查系统语言是否在支持列表中：
          <ul>
            <li>精确匹配优先（<code>"zh-CN"</code>）</li>
            <li>无精确匹配则尝试语言前缀匹配（<code>"zh"</code> 开头的任意项）</li>
            <li>都没有则保持设备默认语言，不做修改</li>
          </ul>
        </li>
        <li>匹配成功后，Write 写入 <code>ActiveLocale</code> 完成切换</li>
      </ol>
    </div>
  </details>

  <details>
    <summary>Scenario 2: App Language Settings UI</summary>
    <div class="scenario-content">
      <p>
        在设备详情页提供「语言设置」选项，让用户手动选择设备语言：
      </p>
      <ol>
        <li>进入设备语言设置页，读取 <code>SupportedLocales</code> 渲染可选列表</li>
        <li>读取 <code>ActiveLocale</code> 标记当前选中项</li>
        <li>用户选择新语言后，Write 写入 <code>ActiveLocale</code></li>
        <li>写入成功后刷新 UI；若返回 <code>CONSTRAINT_ERROR</code>，提示用户该语言不受支持</li>
      </ol>
      <p>
        建议将 BCP 47 标签转换为用户可读的语言名称显示（如 <code>"zh-CN"</code> 显示为「简体中文」），
        避免直接展示原始标签。
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      LocalizationConfiguration 影响的是设备本身的语言行为（如语音提示、屏幕显示文字），
      不影响 App 端的 UI 语言。切换后设备可能需要几秒钟才能完成内部语言资源的加载，
      期间设备行为可能短暂保持旧语言。
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
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root）&nbsp;|&nbsp;
    <strong>角色</strong>: Server（通过 Write 属性配置，无命令）
  </p>
  <p>
    TimeFormatLocalization 控制设备上的时间和日期<strong>显示格式</strong>偏好。
    它不负责时间本身的获取或同步（那是 TimeSynchronization Cluster 的工作），
    而是决定设备在屏幕、面板等界面上怎么<strong>展示</strong>时间 —— 用 12 小时制还是 24 小时制，用公历还是其他日历。
  </p>
  <p>
    这个 Cluster 非常精简 —— 最少只有 <strong>1 个属性</strong>（HourFormat），
    支持 CALFMT Feature 时再增加 2 个日历相关属性。没有任何命令，所有配置都通过<strong>直接写属性</strong>完成。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      用户拿到一台带屏幕的智能设备（恒温器、智能面板、带显示的门锁），
      发现上面的时间显示是 12 小时制，想改成 24 小时制？写一下 <code>HourFormat</code> 就行。
      需要在设备屏幕上显示农历日期？先确认设备支持 CALFMT Feature，然后写 <code>ActiveCalendarType</code>。
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

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>TimeFormatLocalization 通过 <code>FeatureMap</code>（0xFFFC）声明设备是否支持日历格式配置：</p>

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
    <div class="callout-title">Feature 影响哪些属性</div>
    <p>
      <code>HourFormat</code> 是必须支持的，与 Feature 无关。
      只有当设备声明了 <strong>CALFMT</strong> Feature 时，<code>ActiveCalendarType</code> 和
      <code>SupportedCalendarTypes</code> 才可用。
      简单的设备（如只有时钟显示的插座）通常不支持 CALFMT，只有 HourFormat 一个属性。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>TimeFormatLocalization 最多有 3 个属性，其中 2 个依赖 CALFMT Feature。点击属性 ID 可跳转到详细说明。</p>

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
          <td>时间显示格式（12/24 小时制）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>ActiveCalendarType</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>CALFMT</td>
          <td>当前使用的日历类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>SupportedCalendarTypes</td>
          <td>list&lt;enum8&gt;</td>
          <td>Read-only</td>
          <td>CALFMT</td>
          <td>设备支持的所有日历类型列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">HourFormat (Time Display Format)</h3>
  <p>
    控制设备以 12 小时制还是 24 小时制显示时间。这是 TimeFormatLocalization 唯一的必须属性，
    所有支持此 Cluster 的设备都必须实现。可读可写，直接写属性即可切换。
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
    <div class="callout-title">UseActiveLocale 的行为</div>
    <p>
      当 HourFormat 设为 <code>0xFF</code>（UseActiveLocale）时，设备会根据
      LocalizationConfiguration Cluster 中的 <code>ActiveLocale</code> 属性自动选择时间格式。
      例如 <code>en-US</code> 自动使用 12 小时制，<code>zh-CN</code> 自动使用 24 小时制。
      这是最省心的选择，让设备自己跟随语言设置。
    </p>
  </div>
  <p>写属性示例（切换为 12 小时制）：</p>
  <pre><code>// App → Device：将时间显示切换为 12 小时制
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
    控制设备使用哪种日历系统来显示日期。可读可写，但只能写入 <code>SupportedCalendarTypes</code> 列表中包含的值。
    需要设备支持 <strong>CALFMT</strong> Feature，否则此属性不存在。
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
    <div class="callout-title">写入前先检查支持列表</div>
    <p>
      不是所有设备都支持全部 12 种日历。写入 <code>ActiveCalendarType</code> 之前，
      <strong>必须</strong>先读取 <code>SupportedCalendarTypes</code> 确认目标日历在列表中。
      写入不支持的值会被设备拒绝（返回 CONSTRAINT_ERROR）。
    </p>
  </div>
  <p>写属性示例（切换为中国农历）：</p>
  <pre><code>// App → Device：将日历切换为中国农历
{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002C",
      "attributeId": "0x01"        // ActiveCalendarType
    },
    "data": 1                      // Chinese（中国农历）
  }]
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">SupportedCalendarTypes (Supported Calendar List)</h3>
  <p>
    只读属性，返回设备支持的所有日历类型列表。列表中的每个元素都是 <code>CalendarTypeEnum</code> 的一个值。
    App 应该用这个列表来构建日历选择的 UI —— 只展示设备实际支持的选项。
    需要设备支持 <strong>CALFMT</strong> Feature。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      读取 <code>SupportedCalendarTypes</code> 后，用它动态生成设置页面的日历选项列表。
      大多数设备只会支持 Gregorian（公历）和当地常用的一两种日历，
      不要硬编码全部 12 种。如果列表里只有一项，可以考虑隐藏日历切换入口。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一台支持 CALFMT Feature 的智能恒温器的 TimeFormatLocalization 属性：</p>
  <pre><code>{
  // --- 时间格式 ---
  "0x00": 1,              // HourFormat = 24hr（24 小时制）

  // --- 日历格式（需 CALFMT Feature）---
  "0x01": 4,              // ActiveCalendarType = Gregorian（公历）
  "0x02": [4, 0, 1]       // SupportedCalendarTypes = [Gregorian, Buddhist, Chinese]
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Thermostat Time Format Settings</summary>
    <div class="scenario-content">
      <p>
        用户新装了一台智能恒温器，屏幕上显示的是 12 小时制（如 2:30 PM），
        习惯 24 小时制的用户希望通过 App 切换显示格式。
      </p>
      <ol>
        <li>读取 <code>HourFormat</code> 确认当前值为 <code>0</code>（12hr）</li>
        <li>App 设置页展示三个选项：12 小时制、24 小时制、跟随系统语言</li>
        <li>用户选择 24 小时制，App 写入 <code>HourFormat = 1</code>（24hr）</li>
        <li>设备屏幕立即从「2:30 PM」变为「14:30」</li>
        <li>如果设备支持 CALFMT，同一设置页还可以展示日历切换选项</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Calendar Localization for Multi-region Smart Panels</summary>
    <div class="scenario-content">
      <p>
        一款面向全球市场的智能家居面板，主屏幕显示日期和时间。
        不同地区的用户需要看到不同的日历格式 —— 中国用户想看农历，中东用户想看伊斯兰历。
      </p>
      <ol>
        <li>读取 <code>FeatureMap</code> 确认设备支持 CALFMT（Bit 0 = 1）</li>
        <li>读取 <code>SupportedCalendarTypes</code>，假设返回 <code>[4, 1, 7]</code>（公历、农历、伊斯兰历）</li>
        <li>App 设置页根据列表动态生成选项，附上本地化名称：「公历」「农历」「伊斯兰历」</li>
        <li>中国用户选择农历，App 写入 <code>ActiveCalendarType = 1</code>（Chinese）</li>
        <li>面板屏幕日期区域从「2024-09-22」变为同时显示「甲辰年八月二十」</li>
        <li>也可以设为 <code>UseActiveLocale (0xFF)</code>，让面板根据语言设置自动选择合适的日历</li>
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
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root Node）
  </p>
  <p>
    Unit Localization 用于存储用户的温度单位显示偏好。设备收到这个设置后，在本地屏幕、面板等界面上按用户偏好的单位展示温度。
    这是 Matter 中最简单的 Cluster 之一 —— <strong>只有 1 个属性</strong>，<strong>没有命令</strong>，通过 Write 操作直接配置。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      恒温器面板上显示的是华氏度，但用户习惯看摄氏度？写入 <code>TemperatureUnit = Celsius</code> 即可切换。
      这个 Cluster 只影响<strong>显示单位</strong>，不会改变设备内部的温度数据（内部始终使用标准单位存储和传输）。
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>
    Unit Localization 定义了一个 Feature —— <code>TEMP</code>。设备声明支持该 Feature 后，才会暴露 <code>TemperatureUnit</code> 属性。
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
          <td>支持温度单位配置。启用后暴露 <code>TemperatureUnit</code> 属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 与属性的关系</div>
    <p>
      如果设备的 Feature Map 中 <code>TEMP</code> 位为 0，则不会暴露 TemperatureUnit 属性，读取会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
      对于恒温器、温度传感器这类需要显示温度的设备，通常都会启用 TEMP。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Unit Localization 只有一个属性，依赖 <code>TEMP</code> Feature。</p>

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
          <td>温度显示单位偏好</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">TemperatureUnit (Temperature Display Unit)</h3>
  <p>
    用户偏好的温度显示单位。写入该属性后，设备在本地界面（屏幕、面板、LED 等）上按指定单位显示温度值。
    这个属性<strong>不影响</strong>设备通过 Matter 协议上报的温度数据 —— 协议传输的温度始终以 0.01°C 为单位。
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

  <!-- ====== 没有命令 ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Unit Localization <strong>没有定义任何命令</strong>。所有配置通过直接 Write 属性完成。
    这是 Matter 中常见的模式 —— 对于纯配置类的 Cluster，直接读写属性比定义专用命令更简洁。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">How to Configure</div>
    <p>
      想切换温度单位？直接对 <code>TemperatureUnit</code> 属性发一个 Write 请求就行。
      不需要 Timed Interaction，也没有安全限制。
    </p>
  </div>

  <p>Write 请求示例（切换到摄氏度）：</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 0,
      "clusterId": "0x002D",
      "attributeId": "0x00"        // TemperatureUnit
    },
    "attributeValue": 1            // Celsius（摄氏度）
  }]
}</code></pre>

  <p>Read 请求示例（查询当前设置）：</p>
  <pre><code>{
  "attributeRequests": [{
    "endpointId": 0,
    "clusterId": "0x002D",
    "attributeId": "0x00"          // TemperatureUnit
  }]
}</code></pre>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一台恒温器设备 Endpoint 0 上的 Unit Localization Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": 0          // TemperatureUnit = Fahrenheit（华氏度）
}</code></pre>

  <!-- ====== 实际场景 ====== -->
  <h2 id="scenarios">Real-world Scenarios</h2>

  <h3>Scenario 1: US User — Keep Fahrenheit</h3>
  <div class="callout callout-info">
    <div class="callout-title">Scenario Description</div>
    <p>
      一位美国用户购买了一台 Matter 恒温器。恒温器出厂默认 <code>TemperatureUnit = Fahrenheit</code>，
      面板上显示 <strong>72°F</strong>。用户习惯华氏度，无需修改。
    </p>
  </div>
  <p>
    App 配网完成后读取属性，发现 <code>TemperatureUnit = 0</code>（Fahrenheit），App 界面同步以 °F 显示温度。
    用户在 App 和设备面板上看到的单位一致，不需要额外操作。
  </p>

  <h3>Scenario 2: Metric User — Switch to Celsius</h3>
  <div class="callout callout-info">
    <div class="callout-title">Scenario Description</div>
    <p>
      一位中国用户购买了同一台恒温器（出厂默认华氏度）。面板上显示 <strong>72°F</strong>，用户看不懂。
      用户在 App 设置中选择「摄氏度」，App 向设备写入 <code>TemperatureUnit = 1</code>（Celsius）。
    </p>
  </div>
  <p>
    写入成功后，恒温器面板立即切换显示为 <strong>22°C</strong>。App 界面也同步以 °C 显示。
    注意：设备通过 Matter 协议上报的原始数据（比如 Thermostat Cluster 的 LocalTemperature）始终是 0.01°C 为单位的整数值，
    不受 TemperatureUnit 的影响。这个属性只控制设备<strong>本地显示</strong>和 App 的<strong>展示偏好</strong>。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      App 中的「温度单位设置」功能通常这样实现：
    </p>
    <ol>
      <li>配网完成后，根据用户手机的地区设置自动判断偏好单位（<code>Locale</code> 为 <code>en_US</code> 等用华氏度，其余用摄氏度）</li>
      <li>向设备 Endpoint 0 写入 <code>TemperatureUnit</code></li>
      <li>App 端温度显示同步使用相同单位，保持一致</li>
      <li>在设置页提供手动切换入口，用户随时可以改</li>
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
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    TimeSynchronization 负责 Matter 设备的时间管理 —— 让设备知道「现在几点」「在哪个时区」「有没有夏令时」。
    很多功能依赖准确的时间：定时自动化、日志时间戳、证书有效期校验、能源统计等。
    没有时间同步，这些功能要么无法工作，要么会给出错误的结果。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 特性</div>
    <p>
      TimeSynchronization Cluster 定义了三个 Feature，设备根据自身能力选择支持：
      <strong>TZ</strong>（时区管理）支持时区列表和夏令时配置；
      <strong>NTPC</strong>（NTP 客户端）可主动从 NTP 服务器获取时间；
      <strong>NTPS</strong>（NTP 服务器）可作为时间源向其他设备提供时间。
      未启用任何 Feature 的设备仅支持最基础的 SetUTCTime 手动设置时间。
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

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    TimeSynchronization Cluster 共有 5 个请求命令，其中 SetTimeZone 有对应的响应命令。
    最基础的 SetUTCTime 所有设备都支持，其余命令需要设备启用对应的 Feature。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>设置设备的 UTC 时间</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SetTrustedTimeSource</td>
          <td>指定可信时间源节点</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>SetTimeZone</td>
          <td>设置时区列表</td>
          <td class="col-required">TZ</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>SetDSTOffset</td>
          <td>设置夏令时偏移列表</td>
          <td class="col-required">TZ</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>SetDefaultNTP</td>
          <td>设置默认 NTP 服务器地址</td>
          <td class="col-required">NTPC</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">SetUTCTime — Set UTC Time (0x00)</h3>
  <p>
    直接设置设备的 UTC 时间。这是最基础的时间设置方式 —— 在配网阶段，Commissioner 通常通过此命令为设备注入当前时间。
    设备收到后会同时更新 <code>Granularity</code> 和 <code>TimeSource</code> 属性。
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
          <td>UTC 时间，<strong>微秒级</strong>（自 2000-01-01T00:00:00Z 起的微秒数）</td>
        </tr>
        <tr>
          <td>Granularity</td>
          <td><a href="#enum-granularity">GranularityEnum</a></td>
          <td>时间精度等级 —— 告知设备这个时间有多精确</td>
        </tr>
        <tr>
          <td>TimeSource</td>
          <td><a href="#enum-timesource">TimeSourceEnum</a></td>
          <td>时间来源 —— 告知设备这个时间从哪里获取</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">时间精度要求</div>
    <p>
      设备会根据 <code>Granularity</code> 参数判断时间的可靠性。
      如果设备当前已有更高精度的时间源（例如已从 NTP 同步），它可能会拒绝来自低精度源的 SetUTCTime 请求。
      配网阶段设备通常没有时间，此时设置一定会成功。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        最常见的使用场景是配网完成后，Commissioner 立即调用 SetUTCTime 为设备设置初始时间。
        Granularity 通常传 <code>SecondsGranularity (2)</code> 或 <code>MillisecondsGranularity (3)</code>，
        TimeSource 传 <code>Admin (2)</code>（表示时间由管理者手动设置）。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">SetTrustedTimeSource — Set Trusted Time Source (0x01)</h3>
  <p>
    指定一个 Fabric 内的节点作为可信时间源。设备会周期性地从这个节点同步时间，
    类似于局域网内部的「时间权威」。设置为 <code>null</code> 可清除可信时间源。
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
          <td>可信时间源节点信息，包含 NodeID 和 Endpoint。设为 <code>null</code> 清除</td>
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
          <td>时间源节点的 Node ID</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>该节点上 TimeSynchronization Cluster 所在的 Endpoint（通常是 0）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        在 Fabric 中，通常由 Hub（如 Apple HomePod、Google Nest Hub）充当可信时间源。
        Commissioner 在配网时设置 TrustedTimeSource 指向 Hub 的 Node ID，
        之后设备就会自动从 Hub 同步时间，无需外部 NTP 服务器。
        这对于没有直接互联网访问的 Thread 设备尤其重要。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">SetTimeZone — Set Timezone (0x02)</h3>
  <p>
    设置设备的时区列表。可以包含多个时区条目，每个条目有生效时间（<code>validAt</code>），
    用于支持历史或未来的时区变更。设备处理成功后返回 <code>SetTimeZoneResponse</code>，
    告知 Commissioner 是否需要继续设置夏令时偏移。
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
          <td>时区列表（最多 <code>TimeZoneListMaxSize</code> 个条目）</td>
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
          <td>相对 UTC 的偏移量，单位<strong>秒</strong>。例如 UTC+8 = <code>28800</code>，UTC-5 = <code>-18000</code></td>
        </tr>
        <tr>
          <td>ValidAt</td>
          <td>epoch_us</td>
          <td>此条目的生效时间（微秒级 epoch）。第一个条目的 ValidAt 必须为 <code>0</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string（可选）</td>
          <td>IANA 时区名称（如 <code>"Asia/Shanghai"</code>），用于显示和夏令时数据库查询</td>
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
          <td><code>true</code> 表示设备需要 Commissioner 接着调用 <a href="#cmd-0x04">SetDSTOffset</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">DSTOffsetRequired 的含义</div>
    <p>
      如果设备内置了 IANA 时区数据库（<code>TimeZoneDatabase = Full</code>），
      设备可以自己推算夏令时规则，此时响应 <code>DSTOffsetRequired = false</code>。
      如果设备没有时区数据库（<code>TimeZoneDatabase = None</code>），
      则返回 <code>true</code>，Commissioner 必须手动下发夏令时偏移。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户搬家到新时区，或设备首次配网时需要设置时区。
        对于中国用户，通常只需一条记录：Offset = 28800（UTC+8），ValidAt = 0，Name = "Asia/Shanghai"。
        中国没有夏令时，所以 DSTOffset 可以设为偏移量 0 的单条记录。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">SetDSTOffset — Set DST Offset (0x04)</h3>
  <p>
    设置夏令时（DST）偏移列表。每个条目定义一段时间范围内的额外偏移量。
    设备根据当前时间匹配对应的条目，将偏移量叠加到时区偏移上，得出本地时间。
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
          <td>夏令时偏移列表（最多 <code>DSTOffsetListMaxSize</code> 个条目）</td>
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
          <td>夏令时额外偏移量，单位<strong>秒</strong>。例如美国夏令时 = <code>3600</code>（+1 小时），无夏令时 = <code>0</code></td>
        </tr>
        <tr>
          <td>ValidStarting</td>
          <td>epoch_us</td>
          <td>此条目的生效起始时间（微秒级 epoch）</td>
        </tr>
        <tr>
          <td>ValidUntil</td>
          <td>epoch_us / null</td>
          <td>此条目的失效时间。最后一条的 ValidUntil 必须为 <code>null</code>（表示一直有效直到被新列表替换）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">本地时间计算</div>
    <p>
      <code>LocalTime = UTCTime + TimeZone.Offset + DSTOffset.Offset</code><br/>
      例如：UTC 时间 12:00，时区 UTC+8（28800 秒），夏令时 +1h（3600 秒）→ 本地时间 21:00。
      对于不使用夏令时的地区（如中国），DSTOffset 列表只需一条 Offset = 0 的记录。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        美国东部时区（UTC-5）的设备需要在每年 3 月第二个周日进入夏令时（+1h），
        11 月第一个周日退出。Commissioner 可以下发两条 DSTOffset 记录来覆盖当前年份的切换。
        当列表中最后一条的 ValidUntil 到期后，设备会触发 <code>DSTTableEmpty</code> 事件，
        提醒 Commissioner 需要更新夏令时表。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">SetDefaultNTP — Set Default NTP Server (0x07)</h3>
  <p>
    设置设备用于时间同步的默认 NTP 服务器地址。需要设备启用 <strong>NTPC</strong>（NTP 客户端）特性。
    设为 <code>null</code> 可清除默认 NTP 服务器。
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
          <td>NTP 服务器地址（域名或 IPv6 地址）。设为 <code>null</code> 清除</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">DNS 解析能力</div>
    <p>
      如果传入的是域名（如 <code>"pool.ntp.org"</code>），设备需要具备 DNS 解析能力
      （检查 <code>SupportsDNSResolve</code> 属性）。
      不支持 DNS 的设备只能接受 IPv6 地址形式的 NTP 服务器。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        配网完成后，Commissioner 可以为支持 NTPC 的设备配置 NTP 服务器。
        设备随后会自动通过 NTP 协议同步时间，不再依赖 Commissioner 手动设置。
        常用的公共 NTP 服务器：<code>pool.ntp.org</code>、<code>time.google.com</code>、<code>ntp.aliyun.com</code>。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>TimeSynchronization Cluster 共有 13 个应用属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
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
        <!-- 时间状态 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>UTCTime</td>
          <td>epoch_us / null</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>当前 UTC 时间（微秒级）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Granularity</td>
          <td>GranularityEnum</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>当前时间的精度等级</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>TimeSource</td>
          <td>TimeSourceEnum</td>
          <td><a href="#group-time">Time Status</a></td>
          <td>当前时间的来源</td>
        </tr>
        <!-- 时间源配置 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TrustedTimeSource</td>
          <td>struct / null</td>
          <td><a href="#group-source">Time Source Config</a></td>
          <td>Fabric 内可信时间源节点</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>DefaultNTP</td>
          <td>string / null</td>
          <td><a href="#group-source">Time Source Config</a></td>
          <td>默认 NTP 服务器地址</td>
        </tr>
        <!-- 时区与夏令时 -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TimeZone</td>
          <td>list&lt;TimeZoneStruct&gt;</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>时区配置列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>DSTOffset</td>
          <td>list&lt;DSTOffsetStruct&gt;</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>夏令时偏移列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>LocalTime</td>
          <td>epoch_us / null</td>
          <td><a href="#group-tz">Timezone &amp; DST</a></td>
          <td>当前本地时间（已含时区 + 夏令时偏移）</td>
        </tr>
        <!-- 能力与限制 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>TimeZoneDatabase</td>
          <td>TimeZoneDatabaseEnum</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>设备的时区数据库类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>TimeZoneListMaxSize</td>
          <td>uint8</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>时区列表最大条目数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>DSTOffsetListMaxSize</td>
          <td>uint8</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>夏令时偏移列表最大条目数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>SupportsDNSResolve</td>
          <td>bool</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>是否支持 DNS 域名解析</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>NTPServerAvailable</td>
          <td>bool</td>
          <td><a href="#group-cap">Capabilities &amp; Limits</a></td>
          <td>设备是否可用作 NTP 服务器</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 时间状态（0x0000 ~ 0x0002）====== -->
  <h3 id="group-time">Time Status (0x0000 ~ 0x0002)</h3>
  <p>描述设备当前的时间值以及时间的精度和来源。</p>

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
            设备当前的 UTC 时间，微秒级精度（自 2000-01-01T00:00:00Z 起）。
            <code>null</code> 表示设备尚未获得有效时间 —— 这是刚上电、未经时间同步的设备的默认状态
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Granularity<br/><span class="attr-cn">Time Granularity</span></td>
          <td><a href="#enum-granularity">GranularityEnum</a></td>
          <td>
            当前时间的精度等级。<code>NoTimeGranularity (0)</code> 表示设备没有可信时间。
            精度越高，说明时间来源越可靠（见下方枚举定义）
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>TimeSource<br/><span class="attr-cn">Time Source</span></td>
          <td><a href="#enum-timesource">TimeSourceEnum</a></td>
          <td>
            当前时间是从哪里获取的 —— NTP、管理员手动设置、GNSS、还是其他 Matter 节点等。
            用于判断时间的可信程度（见下方枚举定义）
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Epoch 基准</div>
    <p>
      Matter 的时间 epoch 基准是 <strong>2000-01-01T00:00:00Z</strong>，不是 Unix 的 1970 年。
      转换公式：<code>Matter epoch_us = (Unix timestamp - 946684800) * 1000000</code>。
      读取 UTCTime 后需要注意转换。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 时间源配置（0x0003, 0x0004）====== -->
  <h3 id="group-source">Time Source Configuration (0x0003, 0x0004)</h3>
  <p>描述设备的时间同步源 —— 从哪里获取精确时间。</p>

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
            Fabric 内指定的可信时间源节点。包含 FabricIndex、NodeID 和 Endpoint 三个字段。
            <code>null</code> 表示未配置。通过 <a href="#cmd-0x01">SetTrustedTimeSource</a> 命令设置
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>DefaultNTP<br/><span class="attr-cn">Default NTP Server</span></td>
          <td>string / null</td>
          <td>
            设备使用的默认 NTP 服务器地址（域名或 IPv6 地址）。
            <code>null</code> 表示未配置。通过 <a href="#cmd-0x07">SetDefaultNTP</a> 命令设置。
            <strong>需要 NTPC 特性</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">时间源优先级</div>
    <p>
      设备获取时间的优先级通常是：<strong>NTP 服务器</strong> &gt; <strong>可信时间源节点</strong> &gt; <strong>管理员手动设置</strong>。
      如果设备支持 NTPC 且配置了 DefaultNTP，它会自动通过 NTP 同步，精度最高。
      对于不能直接访问互联网的 Thread 设备，TrustedTimeSource 是唯一的自动同步途径。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 时区与夏令时（0x0005 ~ 0x0007）====== -->
  <h3 id="group-tz">Timezone and DST (0x0005 ~ 0x0007)</h3>
  <p>管理时区配置、夏令时偏移和本地时间计算。需要设备启用 <strong>TZ</strong> 特性。</p>

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
            当前生效的时区配置列表。每条包含 Offset（秒）、ValidAt（生效时间）、Name（IANA 时区名）。
            通过 <a href="#cmd-0x02">SetTimeZone</a> 命令设置。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>DSTOffset<br/><span class="attr-cn">DST Offset List</span></td>
          <td>list&lt;DSTOffsetStruct&gt;</td>
          <td>
            当前生效的夏令时偏移列表。每条包含 Offset（秒）、ValidStarting、ValidUntil。
            通过 <a href="#cmd-0x04">SetDSTOffset</a> 命令设置。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>LocalTime<br/><span class="attr-cn">Local Time</span></td>
          <td>epoch_us / null</td>
          <td>
            设备计算得出的本地时间 = UTCTime + TimeZone.Offset + DSTOffset.Offset。
            <code>null</code> 表示缺少 UTC 时间或时区配置，无法计算。只读属性。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 能力与限制（0x0008 ~ 0x000C）====== -->
  <h3 id="group-cap">Capabilities and Limits (0x0008 ~ 0x000C)</h3>
  <p>描述设备在时间同步方面的能力上限和硬件特性。这些属性大部分是只读的，由设备固件决定。</p>

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
            设备内置的时区数据库类型。
            <code>Full (0)</code> = 完整 IANA 数据库，可自动推算夏令时；
            <code>Partial (1)</code> = 部分数据库；
            <code>None (2)</code> = 无数据库，完全依赖 Commissioner 手动设置。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>TimeZoneListMaxSize<br/><span class="attr-cn">Timezone List Max Size</span></td>
          <td>uint8</td>
          <td>
            TimeZone 列表允许的最大条目数。最小为 1，最大为 2。
            <a href="#cmd-0x02">SetTimeZone</a> 的列表长度不能超过此值。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>DSTOffsetListMaxSize<br/><span class="attr-cn">DST Offset List Max Size</span></td>
          <td>uint8</td>
          <td>
            DSTOffset 列表允许的最大条目数。
            <a href="#cmd-0x04">SetDSTOffset</a> 的列表长度不能超过此值。<strong>需要 TZ 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>SupportsDNSResolve<br/><span class="attr-cn">Supports DNS Resolve</span></td>
          <td>bool</td>
          <td>
            设备是否支持将域名解析为 IP 地址。
            如果为 <code>false</code>，<a href="#cmd-0x07">SetDefaultNTP</a> 只能接受 IPv6 地址，不能传域名。
            <strong>需要 NTPC 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>NTPServerAvailable<br/><span class="attr-cn">NTP Server Available</span></td>
          <td>bool</td>
          <td>
            设备自身是否可作为 NTP 服务器向其他节点提供时间。
            <code>true</code> 表示其他设备可以将此设备设为 TrustedTimeSource。
            <strong>需要 NTPS 特性</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>TimeSynchronization Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些时间同步能力：</p>

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
      <strong>基础设备</strong>（如低功耗传感器）：无 Feature，仅支持 SetUTCTime 手动设置；<br/>
      <strong>普通设备</strong>（如灯、插座）：TZ，支持时区和夏令时配置；<br/>
      <strong>联网设备</strong>（如 Wi-Fi 灯）：TZ + NTPC，可自动从 NTP 同步；<br/>
      <strong>Hub 设备</strong>（如边界路由器）：TZ + NTPC + NTPS，不仅自己同步，还能为其他设备提供时间。
    </p>
  </div>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-granularity">GranularityEnum</h3>
  <p>描述设备当前时间的精度等级。精度越高，表示设备的时间源越可靠。</p>

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
  <p>标识设备当前时间的获取来源。数值越高通常意味着更可靠的时间源。NTS 后缀表示使用了网络时间安全（Network Time Security）认证。</p>

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
  <p>描述设备内置的时区数据库能力，决定设备能否自行推算夏令时规则。</p>

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

  <!-- ====== 事件 ====== -->
  <h2 id="events">Events</h2>
  <p>TimeSynchronization Cluster 定义了 5 个事件，用于通知 Commissioner 或自动化系统时间状态的变化。</p>

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
          <td>夏令时表已耗尽 —— 所有 DSTOffset 条目都已过期，设备无法继续正确计算本地时间。Commissioner 需要下发新的 DSTOffset 列表</td>
        </tr>
        <tr>
          <td>DSTStatus</td>
          <td>Info</td>
          <td class="col-required">TZ</td>
          <td>夏令时状态变更 —— 设备进入或退出夏令时。包含一个 <code>DSTOffsetActive</code> 布尔字段，<code>true</code> = 夏令时生效中</td>
        </tr>
        <tr>
          <td>TimeZoneStatus</td>
          <td>Info</td>
          <td class="col-required">TZ</td>
          <td>时区切换 —— 时区列表中的下一条生效了（ValidAt 到达）。包含新的 Offset 和 Name 字段</td>
        </tr>
        <tr>
          <td>TimeFailure</td>
          <td>Info</td>
          <td class="col-optional">无</td>
          <td>时间同步失败 —— 设备无法从任何时间源获取或验证时间。可能是 NTP 不可达、可信时间源离线等原因</td>
        </tr>
        <tr>
          <td>MissingTrustedTimeSource</td>
          <td>Info</td>
          <td class="col-optional">无</td>
          <td>缺少可信时间源 —— 设备需要时间同步但没有配置 TrustedTimeSource，也没有可用的 NTP。提醒 Commissioner 配置时间源</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Event Subscription Advice</div>
    <p>
      建议 Commissioner 订阅 <strong>DSTTableEmpty</strong> 和 <strong>TimeFailure</strong> 事件。
      前者在夏令时表过期时触发，如果不及时更新，设备的本地时间会出错（影响定时自动化等功能）；
      后者在时间同步链路断裂时触发，可及时发现并修复问题。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Attribute Data Example</h3>
  <p>以下是一个支持 TZ + NTPC 的智能灯（中国地区）的 TimeSynchronization Cluster 典型属性数据：</p>
  <pre><code>{
  // --- 时间状态 ---
  "0x0000": 1695312000000000,    // UTCTime = 2023-09-21T16:00:00Z（微秒级 epoch）
  "0x0001": 3,                   // Granularity = MillisecondsGranularity
  "0x0002": 7,                   // TimeSource = MatterNTP

  // --- 信任时间源 ---
  "0x0003": {                    // TrustedTimeSource
    "fabricIndex": 1,
    "nodeID": "0x0000000000000001",
    "endpoint": 0
  },
  "0x0004": "pool.ntp.org",      // DefaultNTP

  // --- 时区与夏令时 ---
  "0x0005": [{                   // TimeZone
    "offset": 28800,             //   UTC+8（秒）
    "validAt": 0,
    "name": "Asia/Shanghai"
  }],
  "0x0006": [{                   // DSTOffset
    "offset": 0,                 //   无夏令时
    "validStarting": 0,
    "validUntil": null
  }],

  // --- 本地时间 ---
  "0x0007": 1695340800000000,    // LocalTime（已加时区偏移）

  // --- 能力与限制 ---
  "0x0008": 1,                   // TimeZoneDatabase = Full
  "0x0009": 2,                   // TimeZoneListMaxSize = 2
  "0x000A": 2,                   // DSTOffsetListMaxSize = 2
  "0x000B": true,                // SupportsDNSResolve = true
  "0x000C": false                // NTPServerAvailable = false
}</code></pre>

  <h3>SetUTCTime 交互示例</h3>
  <p>Commissioner 在配网完成后为设备设置初始时间：</p>
  <pre><code>// Commissioner → Device：设置 UTC 时间
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0038",
      "commandId": "0x00"            // SetUTCTime
    },
    "commandFields": {
      "UTCTime": 1695312000000000,   // 2023-09-21T16:00:00Z（微秒）
      "granularity": 3,              // MillisecondsGranularity
      "timeSource": 2                // Admin
    }
  }]
}</code></pre>

  <h3>SetTimeZone 交互示例</h3>
  <p>为设备设置中国时区（UTC+8）：</p>
  <pre><code>// Commissioner → Device：设置时区
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0038",
      "commandId": "0x02"            // SetTimeZone
    },
    "commandFields": {
      "timeZone": [{
        "offset": 28800,             // UTC+8（秒）
        "validAt": 0,                // 立即生效
        "name": "Asia/Shanghai"      // IANA 时区名（可选）
      }]
    }
  }]
}

// Device → Commissioner：确认时区设置
{
  "DSTOffsetRequired": true          // 需要跟进设置夏令时偏移
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      大多数 Matter SDK（如 connectedhomeip）在配网流程中会自动处理基础的时间设置。
      App 开发者通常只需要关注时区配置（特别是用户更换地区时），以及夏令时表的定期更新。
      订阅 <code>DSTTableEmpty</code> 事件可以在需要更新时得到通知。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Set Initial Time During Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>配网完成（CommissioningComplete 成功）后，读取设备的 <code>FeatureMap (0xFFFC)</code> 确认时间同步能力</li>
        <li>发送 <a href="#cmd-0x00"><code>SetUTCTime (0x00)</code></a>，注入当前 UTC 时间，Granularity = <code>SecondsGranularity (2)</code>，TimeSource = <code>Admin (2)</code></li>
        <li>发送 <a href="#cmd-0x01"><code>SetTrustedTimeSource (0x01)</code></a>，指定 Fabric 中的 Hub 作为可信时间源</li>
        <li>如果设备支持 NTPC，发送 <a href="#cmd-0x07"><code>SetDefaultNTP (0x07)</code></a> 配置 NTP 服务器</li>
        <li>验证：读取 <code>UTCTime (0x0000)</code> 确认时间已设置，<code>Granularity (0x0001)</code> 不再是 0</li>
      </ol>
      <p>设备后续会自动从 NTP 或 TrustedTimeSource 同步时间，精度会逐步提升。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Timezone Configuration (User Moves to a New Timezone)</summary>
    <div class="scenario-content">
      <ol>
        <li>确认设备支持 TZ 特性（<code>FeatureMap</code> Bit 0 = 1）</li>
        <li>读取 <code>TimeZoneListMaxSize (0x0009)</code> 确认列表容量</li>
        <li>发送 <a href="#cmd-0x02"><code>SetTimeZone (0x02)</code></a>，传入新时区信息：
          <ul>
            <li>从北京搬到纽约：Offset = <code>-18000</code>（UTC-5），Name = <code>"America/New_York"</code></li>
          </ul>
        </li>
        <li>检查响应的 <code>DSTOffsetRequired</code>：
          <ul>
            <li>如果 <code>true</code>：设备没有内置时区数据库，需要接着调用 <a href="#cmd-0x04"><code>SetDSTOffset (0x04)</code></a> 手动设置美东夏令时规则</li>
            <li>如果 <code>false</code>：设备有内置数据库，已自动推算夏令时，无需额外操作</li>
          </ul>
        </li>
        <li>验证：读取 <code>LocalTime (0x0007)</code> 确认本地时间已正确反映新时区</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: NTP Auto-sync Configuration</summary>
    <div class="scenario-content">
      <ol>
        <li>确认设备支持 NTPC 特性（<code>FeatureMap</code> Bit 1 = 1）</li>
        <li>检查 <code>SupportsDNSResolve (0x000B)</code>：
          <ul>
            <li><code>true</code>：可以传域名，如 <code>"pool.ntp.org"</code></li>
            <li><code>false</code>：只能传 IPv6 地址</li>
          </ul>
        </li>
        <li>发送 <a href="#cmd-0x07"><code>SetDefaultNTP (0x07)</code></a>，设置 NTP 服务器地址</li>
        <li>等待一段时间后，读取 <code>Granularity (0x0001)</code> 和 <code>TimeSource (0x0002)</code>，
            确认已从 NTP 成功同步（Granularity 应提升到 MillisecondsGranularity，TimeSource 变为 NTP 相关值）</li>
      </ol>
      <p>
        <strong>推荐的 NTP 服务器</strong>：<code>pool.ntp.org</code>（全球）、<code>ntp.aliyun.com</code>（中国）、<code>time.google.com</code>（全球）。
        对于企业环境，可以使用内部 NTP 服务器以确保安全性。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Handling the DSTTableEmpty Event (DST Table Expired)</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅设备的 <code>DSTTableEmpty</code> 事件</li>
        <li>收到事件后，说明所有 DSTOffset 条目已过期</li>
        <li>根据设备所在时区查询未来的夏令时切换时间</li>
        <li>发送 <a href="#cmd-0x04"><code>SetDSTOffset (0x04)</code></a>，下发新的夏令时偏移列表</li>
        <li>最后一条的 <code>ValidUntil</code> 设为 <code>null</code>，确保列表覆盖到下次更新</li>
      </ol>
      <p>
        <strong>注意</strong>：如果不及时处理此事件，设备的 <code>LocalTime</code> 会因为缺少夏令时信息而出错，
        影响所有依赖本地时间的自动化规则（如「每天早上 7 点开灯」实际上会提前或延后一小时）。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 5: Time Synchronization Strategy for Thread Devices</summary>
    <div class="scenario-content">
      <p>
        Thread 设备通常没有直接的互联网访问能力，无法使用 NTP。它们依赖以下时间同步链路：
      </p>
      <ol>
        <li><strong>配网阶段</strong>：Commissioner 通过 <a href="#cmd-0x00">SetUTCTime</a> 注入初始时间</li>
        <li><strong>运行阶段</strong>：通过 <a href="#cmd-0x01">SetTrustedTimeSource</a> 指向 Thread 边界路由器（Border Router），
            边界路由器从互联网获取 NTP 时间后转发给 Thread 设备</li>
        <li>如果 TrustedTimeSource 离线，设备会触发 <code>MissingTrustedTimeSource</code> 事件</li>
        <li>时间精度会逐渐降低（Granularity 可能从 Milliseconds 退化到 Seconds 甚至 Minutes）</li>
      </ol>
      <p>
        <strong>最佳实践</strong>：确保 Fabric 中至少有一个可靠的时间源节点（如 Hub 或边界路由器），
        并在配网时为所有设备配置 TrustedTimeSource 指向它。
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
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    ICD Management 管理「间歇连接设备」（Intermittently Connected Device，简称 ICD），
    也就是俗称的「休眠设备」或「Sleepy Device」—— 门窗传感器、温湿度传感器、电池供电的按钮等。
    这些设备为了省电，大部分时间处于休眠状态，只在固定周期或特定事件时短暂唤醒通信。
    ICD Management 负责定义设备的休眠/唤醒周期、管理订阅者注册、以及通过 Check-In 协议保持连接。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">SIT 与 LIT —— 两种运行模式</div>
    <p>
      ICD 设备有两种运行模式：<strong>SIT（Short Idle Time）</strong>短空闲时间模式和
      <strong>LIT（Long Idle Time）</strong>长空闲时间模式。
      SIT 设备的空闲间隔较短（通常不超过 15 秒），Controller 可以在正常 MRP 重试窗口内等到设备醒来；
      LIT 设备的空闲间隔更长（可达数小时），Controller 必须依赖 Check-In 协议才能与设备建立通信。
      LIT 模式显著延长电池寿命，但交互响应速度更慢。
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

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ICD Management 共有 4 个命令。<code>RegisterClient</code> 和 <code>UnregisterClient</code> 用于管理
    Check-In 消息的订阅者列表；<code>StayActiveRequest</code> 让设备临时保持唤醒。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>注册一个 Check-In 客户端</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>RegisterClientResponse</td>
          <td>Server &rarr; Client</td>
          <td>注册结果，返回 ICDCounter</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>UnregisterClient</td>
          <td>Client &rarr; Server</td>
          <td>取消注册一个 Check-In 客户端</td>
          <td class="col-required">CIP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>StayActiveRequest</td>
          <td>Client &rarr; Server</td>
          <td>请求设备保持活跃一段时间</td>
          <td class="col-required">LITS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>StayActiveResponse</td>
          <td>Server &rarr; Client</td>
          <td>返回设备实际承诺的活跃时长</td>
          <td class="col-required">LITS</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">RegisterClient — Register Client (0x00)</h3>
  <p>
    向 ICD 设备注册一个 Check-In 客户端。注册成功后，设备每次从休眠中唤醒时都会向该客户端发送
    Check-In 消息，告知「我醒了，有什么事赶紧说」。这是 LIT 设备与 Controller 保持连接的核心机制。
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
          <td>接收 Check-In 消息的目标节点 ID —— 通常是 Controller 或 Hub 的 NodeID</td>
        </tr>
        <tr>
          <td>MonitoredSubject</td>
          <td>uint64</td>
          <td>被监控的 Subject（Case-AuthTag 或 NodeID）—— 标识哪个用户/实体在关注此设备</td>
        </tr>
        <tr>
          <td>Key</td>
          <td>octstr (16 bytes)</td>
          <td>HMAC 验证密钥 —— 用于验证 Check-In 消息的真实性，防止伪造</td>
        </tr>
        <tr>
          <td>VerificationKey</td>
          <td>octstr (16 bytes)</td>
          <td>可选。验证密钥 —— 用于在注册时验证发起方的身份。如果设备要求验证，此字段必填</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        配网完成后，Hub/Controller 向电池传感器注册自己为 Check-In 客户端。
        之后传感器每次醒来时发送 Check-In 消息，Hub 收到后在设备短暂的活跃窗口内发送订阅请求或读取数据。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">RegisterClientResponse — Registration Response (0x01)</h3>
  <p>
    设备对 RegisterClient 的响应。返回当前的 ICDCounter 值，
    客户端用它来验证后续收到的 Check-In 消息的新鲜度（防重放攻击）。
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
          <td>设备当前的 Check-In 计数器值。客户端应保存此值，后续收到的 Check-In 消息的 Counter 必须大于此值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">UnregisterClient — Unregister Client (0x02)</h3>
  <p>
    从 ICD 设备的注册列表中移除一个 Check-In 客户端。
    移除后，设备不再向该客户端发送 Check-In 消息。
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
          <td>要移除的客户端的节点 ID —— 必须与注册时使用的 CheckInNodeID 一致</td>
        </tr>
        <tr>
          <td>VerificationKey</td>
          <td>octstr (16 bytes)</td>
          <td>可选。验证密钥 —— 同注册时的用途，防止未授权的取消注册</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户从家庭中移除一个 Hub，该 Hub 需要先调用 UnregisterClient 将自己从所有已注册的 ICD 设备上注销，
        避免设备继续向一个不存在的节点发送 Check-In 消息浪费电量。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">StayActiveRequest — Request Stay Active (0x03)</h3>
  <p>
    请求 ICD 设备在活跃模式下额外保持一段时间，暂时不要回到休眠状态。
    适用于需要与设备进行一系列交互（如 OTA 升级、批量配置）但设备默认活跃时间太短的场景。
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
          <td>请求的额外活跃时长，单位<strong>毫秒</strong>。设备会在当前活跃周期结束后继续保持唤醒至少这么久</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Controller 需要对门窗传感器进行 OTA 固件升级。传感器的默认活跃窗口只有 10 秒，不够传输固件。
        Controller 发送 StayActiveRequest（StayActiveDuration = 120000，即 2 分钟），
        传感器回复 StayActiveResponse 告知实际可以维持多久，Controller 在此窗口内完成升级。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">StayActiveResponse — Stay Active Response (0x04)</h3>
  <p>
    设备对 StayActiveRequest 的响应。设备可能无法完全满足请求的时长（例如电池电量不足），
    响应中包含设备实际承诺的活跃时长。
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
          <td>设备实际承诺的活跃时长，单位<strong>毫秒</strong>。可能小于请求值。Controller 应在此时间内完成所有操作</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ICD Management 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
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
        <!-- 休眠/唤醒参数 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>IdleModeDuration</td>
          <td>uint32</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>空闲模式持续时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>ActiveModeDuration</td>
          <td>uint32</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>活跃模式持续时间（毫秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ActiveModeThreshold</td>
          <td>uint16</td>
          <td><a href="#group-timing">Sleep/Wake Parameters</a></td>
          <td>活跃模式延长阈值（毫秒）</td>
        </tr>
        <!-- 注册管理 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>RegisteredClients</td>
          <td>list&lt;MonitoringRegistrationStruct&gt;</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>已注册的监控客户端列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>ICDCounter</td>
          <td>uint32</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>Check-In 消息计数器</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ClientsSupportedPerFabric</td>
          <td>uint16</td>
          <td><a href="#group-registration">Registration Management</a></td>
          <td>每个 Fabric 支持的最大注册客户端数</td>
        </tr>
        <!-- 用户唤醒提示 -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>UserActiveModeTriggerHint</td>
          <td>UserActiveModeTriggerBitmap</td>
          <td><a href="#group-trigger">User Wake-up Hints</a></td>
          <td>用户可用的唤醒方式提示位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>UserActiveModeTriggerInstruction</td>
          <td>string (max 128)</td>
          <td><a href="#group-trigger">User Wake-up Hints</a></td>
          <td>唤醒操作的文字说明</td>
        </tr>
        <!-- 运行模式 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>OperatingMode</td>
          <td>OperatingModeEnum</td>
          <td><a href="#group-mode">Operating Mode</a></td>
          <td>当前运行模式（SIT / LIT）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MaximumCheckInBackOff</td>
          <td>uint32</td>
          <td><a href="#group-mode">Operating Mode</a></td>
          <td>Check-In 最大回退间隔（秒）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 休眠/唤醒参数（0x0000-0x0002）====== -->
  <h3 id="group-timing">Sleep/Wake Parameters (0x0000-0x0002)</h3>
  <p>
    定义设备的休眠与唤醒周期参数。这三个值直接决定了设备的省电程度和通信响应速度 ——
    空闲时间越长越省电，但响应越慢。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Time Unit Note</div>
    <p>
      <code>IdleModeDuration</code> 的单位是<strong>秒</strong>，
      而 <code>ActiveModeDuration</code> 和 <code>ActiveModeThreshold</code> 的单位是<strong>毫秒</strong>。
      例如 IdleModeDuration = 300 表示空闲 5 分钟，ActiveModeDuration = 10000 表示活跃 10 秒。
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
          <td>设备在空闲（休眠）模式下的持续时间，单位<strong>秒</strong>。这段时间内设备不主动收发消息。SIT 设备通常 &le; 15 秒，LIT 设备可达数小时。最小值 1 秒</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>ActiveModeDuration<br/><span class="attr-cn">Active Mode Duration</span></td>
          <td>uint32</td>
          <td>设备在活跃模式下的持续时间，单位<strong>毫秒</strong>。设备每次醒来后至少保持这么久的通信窗口。最小值 300 毫秒</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ActiveModeThreshold<br/><span class="attr-cn">Active Mode Threshold</span></td>
          <td>uint16</td>
          <td>设备在活跃模式下收到通信后，额外延长的活跃时间，单位<strong>毫秒</strong>。每次收到消息都会重新计时，避免正在交互时设备突然休眠。SIT 设备最小值 300ms，LIT 设备最小值 5000ms</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      SIT 设备的 <code>IdleModeDuration</code> &le; 15 秒，与 MRP 的 Idle Retransmission Timeout 对齐，
      Controller 可以在正常重试窗口内等到设备醒来。
      如果 IdleModeDuration &gt; 15 秒，设备就是 LIT 模式，Controller 必须等 Check-In 消息才能通信。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 注册管理（0x0003-0x0005）====== -->
  <h3 id="group-registration">Registration Management (0x0003-0x0005)</h3>
  <p>
    管理 Check-In 客户端的注册列表。只有注册过的客户端才会收到设备的 Check-In 消息。
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
          <td>当前已注册的 Check-In 客户端列表。每个 Fabric 的注册数不超过 <code>ClientsSupportedPerFabric</code>。<strong>需要 CIP 特性</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>ICDCounter<br/><span class="attr-cn">Check-In Counter</span></td>
          <td>uint32</td>
          <td>设备发送 Check-In 消息的单调递增计数器。客户端据此检测消息重放 —— 如果收到的 Counter &le; 上次保存的值，说明可能是重放攻击。<strong>需要 CIP 特性</strong></td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ClientsSupportedPerFabric<br/><span class="attr-cn">Max Clients Per Fabric</span></td>
          <td>uint16</td>
          <td>每个 Fabric 最多可注册的 Check-In 客户端数量。最小值 1。受限于设备的存储和电量资源 —— 更多客户端意味着每次唤醒时要发更多 Check-In 消息。<strong>需要 CIP 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 用户唤醒提示（0x0006-0x0007）====== -->
  <h3 id="group-trigger">User Wake-up Hints (0x0006-0x0007)</h3>
  <p>
    当 Controller 需要与 LIT 设备通信但不想等 Check-In 时，可以提示用户手动唤醒设备。
    这两个属性告诉 App 如何指导用户操作 —— 比如「按一下设备上的按钮」或「打开/关闭门窗一次」。
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
          <td>位图，标识用户可以通过哪些方式手动唤醒设备。App 应根据此位图显示对应的引导提示。<strong>需要 UAT 特性</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>UserActiveModeTriggerInstruction<br/><span class="attr-cn">Wake-up Instruction</span></td>
          <td>string (max 128)</td>
          <td>厂商自定义的操作说明文字。当位图中设置了 ActuateSensorLightsBlink 等较特殊的触发方式时，此字段提供具体的操作指引（如「连续按顶部按钮 3 次」）。<strong>需要 UAT 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>UserActiveModeTriggerBitmap 常见位</h4>
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

  <!-- ====== 运行模式（0x0008-0x0009）====== -->
  <h3 id="group-mode">Operating Mode (0x0008-0x0009)</h3>
  <p>设备当前的运行模式和 Check-In 回退参数。</p>

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
          <td>设备当前的 ICD 运行模式：SIT（短空闲）或 LIT（长空闲）。支持 DSLS 特性的设备可以在两种模式间动态切换。<strong>需要 LITS 特性</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>MaximumCheckInBackOff<br/><span class="attr-cn">Max Check-In Backoff</span></td>
          <td>uint32</td>
          <td>设备在没有已注册客户端时，Check-In 消息的最大发送间隔，单位<strong>秒</strong>。设备会逐渐拉长间隔直到此上限，用于在无人监听时进一步省电。<strong>需要 LITS 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <h3 id="enum-operating-mode">OperatingModeEnum — Operating Mode</h3>
  <p>描述 ICD 设备的当前运行模式，对应 <code>OperatingMode (0x0008)</code> 属性。</p>
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

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-monitoring-registration">MonitoringRegistrationStruct</h3>
  <p>描述一个已注册的 Check-In 客户端的信息，是 <code>RegisteredClients (0x0003)</code> 属性中每个列表元素的结构。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CheckInNodeID</td>
          <td>uint64</td>
          <td>接收 Check-In 消息的节点 ID —— 通常是注册时的 Controller 或 Hub</td>
        </tr>
        <tr>
          <td>MonitoredSubject</td>
          <td>uint64</td>
          <td>被监控的 Subject —— 标识哪个用户或实体关注此设备</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>该注册所属的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>MonitoringRegistrationStruct 数据示例：</p>
  <pre><code>{
  "CheckInNodeID": 1,                   // Check-In 消息目标节点 ID
  "MonitoredSubject": 112233,           // 被监控的 Subject（通常是用户的 NodeID）
  "FabricIndex": 1                      // 所属 Fabric 索引
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>ICD Management 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的 ICD 能力：</p>

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
    <div class="callout-title">Feature 依赖关系</div>
    <p>
      LITS 依赖 CIP（长空闲设备必须支持 Check-In 协议才能被找到），DSLS 依赖 LITS（动态切换必须先支持 LIT 模式）。
      因此，一个支持 DSLS 的设备的 FeatureMap 至少是 <code>0b1111</code>（CIP + UAT + LITS + DSLS）。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一个运行在 LIT 模式下的电池门窗传感器的 ICD Management Cluster 读取结果：</p>

  <pre><code>{
  // --- 休眠/唤醒时间参数 ---
  "0x0000": 300,              // IdleModeDuration = 300 秒（空闲模式持续 5 分钟）
  "0x0001": 10,               // ActiveModeDuration = 10000 毫秒（活跃模式持续 10 秒）
  "0x0002": 5000,             // ActiveModeThreshold = 5000 毫秒（活跃模式延长阈值 5 秒）

  // --- 注册管理 ---
  "0x0003": [                 // RegisteredClients（已注册的监控客户端列表）
    {
      "CheckInNodeID": 1,
      "MonitoredSubject": 1,
      "FabricIndex": 1
    }
  ],
  "0x0004": 42,               // ICDCounter = 42（Check-In 消息计数器）
  "0x0005": 2,                // ClientsSupportedPerFabric = 2（每个 Fabric 最多注册 2 个客户端）

  // --- 用户唤醒提示 ---
  "0x0006": 1,                // UserActiveModeTriggerHint = PowerCycle（提示用户通过重新上电唤醒）
  "0x0007": "",               // UserActiveModeTriggerInstruction = ""（无额外说明）

  // --- 运行模式 ---
  "0x0008": 1,                // OperatingMode = LIT（长空闲时间模式）
  "0x0009": 3600              // MaximumCheckInBackOff = 3600 秒（最大 Check-In 回退间隔 1 小时）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      读取 ICD Management 属性时需注意设备可能正在休眠。
      对于 SIT 设备，Controller 可以在 MRP 重试窗口内等到设备醒来并完成读取；
      对于 LIT 设备，需要先收到 Check-In 消息或用户手动唤醒后才能读取。
      读取前可先检查 <code>OperatingMode (0x0008)</code> 判断设备的运行模式。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Register Check-In Monitoring After Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>完成设备配网后，读取 <code>FeatureMap (0xFFFC)</code> 确认设备支持 CIP 特性</li>
        <li>读取 <code>ClientsSupportedPerFabric (0x0005)</code> 确认还有注册名额</li>
        <li>发送 <code>RegisterClient (0x00)</code>，传入 Hub 的 NodeID 作为 CheckInNodeID，并生成一个 16 字节的 HMAC Key</li>
        <li>保存 <code>RegisterClientResponse</code> 中返回的 ICDCounter 值，用于后续 Check-In 消息验证</li>
        <li>设备每次醒来时，Hub 会收到 Check-In 消息，在活跃窗口内完成数据同步</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: OTA Upgrade — Extend Active Window</summary>
    <div class="scenario-content">
      <ol>
        <li>等待 LIT 设备发送 Check-In 消息（或提示用户手动唤醒设备）</li>
        <li>在设备活跃窗口内，发送 <code>StayActiveRequest (0x03)</code>，请求足够长的活跃时间（如 120 秒）</li>
        <li>检查 <code>StayActiveResponse</code> 中的 <code>PromisedActiveDuration</code>，确认设备实际承诺的时长</li>
        <li>在承诺的时间窗口内执行 OTA 升级流程</li>
        <li>如果一次不够，可在窗口结束前再发一次 StayActiveRequest 续时</li>
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
