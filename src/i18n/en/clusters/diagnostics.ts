import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'ota-software-update-provider': {
    title: 'OtaSoftwareUpdateProvider Cluster (0x0029)',
    description: 'Complete reference for the Matter OTA Software Update Provider Cluster (0x0029) — QueryImage firmware query, ApplyUpdateRequest update confirmation, NotifyUpdateApplied installation notification, plus detailed OTA update flow, rollback, and multi-device batch update scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>OtaSoftwareUpdateProvider Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0029</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint) &nbsp;|&nbsp;
    <strong>Role</strong>: Client Cluster (implemented by the Provider node)
  </p>
  <p>
    OtaSoftwareUpdateProvider is the <strong>server-side</strong> Cluster of the Matter OTA (Over-The-Air) firmware update mechanism —
    it runs on the node that provides firmware images (typically a Hub, gateway, or cloud proxy), and is responsible for responding to firmware query requests from other devices,
    controlling update pacing, and receiving update completion notifications.
  </p>
  <p>
    In Matter's OTA architecture, the device that needs an update is called the <strong>Requestor</strong>,
    and the node that provides firmware is called the <strong>Provider</strong>. The Requestor proactively queries the Provider,
    which tells it whether a new version is available, where to download it, and whether user consent is required. The entire flow uses a "pull" model, not push.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Client Cluster Note</div>
    <p>
      OtaSoftwareUpdateProvider is a <strong>Client Cluster</strong> — it defines the commands received by the Provider,
      not exposed attributes. Therefore, this Cluster has <strong>no readable attributes</strong>, and all interactions are done through commands.
      Its counterpart, <strong>OtaSoftwareUpdateRequestor (0x002A)</strong>, is a Server Cluster
      that runs on the device needing an update, responsible for initiating queries and performing downloads.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The OtaSoftwareUpdateProvider Cluster has 3 request commands, of which 2 have corresponding response commands and 1 is a one-way notification.
    These three commands form the complete OTA update lifecycle: Query → Confirm installation → Notify completion.
    Click on a command ID in the table below to jump to its detailed description.
  </p>

  <h3>Requestor → Provider (Request Commands)</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Response</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>QueryImage</td>
          <td>Query whether a firmware update is available</td>
          <td>QueryImageResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>ApplyUpdateRequest</td>
          <td>Download complete, request confirmation to install</td>
          <td>ApplyUpdateResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>NotifyUpdateApplied</td>
          <td>Notify Provider that the update has been successfully installed</td>
          <td class="col-optional">No response</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Provider → Requestor (Response Commands)</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Corresponding Request</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x01</code></td>
          <td>QueryImageResponse</td>
          <td>Returns firmware query results (update availability, download address, etc.)</td>
          <td>QueryImage</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>ApplyUpdateResponse</td>
          <td>Returns whether the update installation is allowed</td>
          <td>ApplyUpdateRequest</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">QueryImage — Query Firmware Update (0x00)</h3>
  <p>
    The Requestor sends this command to ask the Provider: "I'm a device of this model and version — do you have an update for me?"
    This is the <strong>first step</strong> of the entire OTA flow. The Provider determines whether there is an applicable firmware image
    based on the Requestor's vendor ID, product ID, current version number, and other information.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>Yes</td>
          <td>Requestor's vendor ID (consistent with the one in BasicInformation Cluster)</td>
        </tr>
        <tr>
          <td>ProductID</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>Requestor's product ID</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>Yes</td>
          <td>Requestor's currently running firmware version number</td>
        </tr>
        <tr>
          <td>ProtocolsSupported</td>
          <td>list&lt;<a href="#enum-protocol">DownloadProtocolEnum</a>&gt;</td>
          <td>Yes</td>
          <td>List of download protocols supported by the Requestor (e.g., BDX, HTTPS)</td>
        </tr>
        <tr>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td>No</td>
          <td>Requestor's hardware version number (some firmware only applies to specific hardware versions)</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>String (2 chars)</td>
          <td>No</td>
          <td>ISO 3166-1 alpha-2 country code (e.g., <code>"CN"</code>), used for region-restricted firmware distribution</td>
        </tr>
        <tr>
          <td>RequestorCanConsent</td>
          <td>bool</td>
          <td>No</td>
          <td>Whether the Requestor can display an update consent dialog to the user (e.g., devices with a screen)</td>
        </tr>
        <tr>
          <td>MetadataForProvider</td>
          <td>octstr</td>
          <td>No</td>
          <td>Vendor-specific metadata (Provider can use this for additional decisions)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>QueryImageResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Condition</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Always</td>
          <td>Query result status</td>
        </tr>
        <tr>
          <td>DelayedActionTime</td>
          <td>uint32 (seconds)</td>
          <td>Optional</td>
          <td>When Status is Busy, suggests the Requestor wait this many seconds before retrying</td>
        </tr>
        <tr>
          <td>ImageURI</td>
          <td>String (max 256)</td>
          <td>UpdateAvailable</td>
          <td>Download address for the firmware image (BDX URI or HTTPS URL)</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>UpdateAvailable</td>
          <td>Version number of the new firmware</td>
        </tr>
        <tr>
          <td>SoftwareVersionString</td>
          <td>String (max 64)</td>
          <td>UpdateAvailable</td>
          <td>Version string of the new firmware (human-readable, e.g., <code>"2.0.0"</code>)</td>
        </tr>
        <tr>
          <td>UpdateToken</td>
          <td>octstr (max 32)</td>
          <td>UpdateAvailable</td>
          <td>Update token — subsequent ApplyUpdateRequest and NotifyUpdateApplied must carry this token</td>
        </tr>
        <tr>
          <td>UserConsentNeeded</td>
          <td>bool</td>
          <td>Optional</td>
          <td>Whether the user needs to manually confirm the update on the Requestor side (default: false)</td>
        </tr>
        <tr>
          <td>MetadataForRequestor</td>
          <td>octstr</td>
          <td>Optional</td>
          <td>Vendor-specific data returned by the Provider to the Requestor</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Importance of UpdateToken</div>
    <p>
      <code>UpdateToken</code> is the credential that spans the entire OTA flow. The Requestor must carry the same Token in subsequent <code>ApplyUpdateRequest</code>
      and <code>NotifyUpdateApplied</code> calls, allowing the Provider to track the update session.
      The Token is at most 32 bytes, generated by the Provider, with content and format defined by the vendor.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        The Requestor typically calls QueryImage at these times: periodic checks (e.g., every 24 hours), after device reboot, or upon receiving an admin's check instruction.
        The Provider may return <code>Busy</code> with a <code>DelayedActionTime</code>, telling the Requestor to retry later
        — this is common in large device fleets, where the Provider uses staggered scheduling to avoid network congestion from simultaneous downloads.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">ApplyUpdateRequest — Request to Install Update (0x02)</h3>
  <p>
    After the Requestor downloads and verifies the firmware image, it sends this command to ask the Provider: "I'm ready to install — can I proceed?"
    The Provider can make a final decision at this point — approve installation, require waiting, or cancel the update.
    This step gives the Provider ultimate control over the entire update flow.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UpdateToken</td>
          <td>octstr</td>
          <td>Update token returned in QueryImageResponse</td>
        </tr>
        <tr>
          <td>NewVersion</td>
          <td>uint32</td>
          <td>Version number of the new firmware to be installed (should match SoftwareVersion in QueryImageResponse)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ApplyUpdateResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Action</td>
          <td><a href="#enum-action">ApplyUpdateActionEnum</a></td>
          <td>Provider's decision on the installation request</td>
        </tr>
        <tr>
          <td>DelayedActionTime</td>
          <td>uint32 (seconds)</td>
          <td>When Action is AwaitNextAction, the Requestor should wait this many seconds before requesting again</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Provider's Update Control</div>
    <p>
      Even if the Requestor has already downloaded the firmware, the Provider can still delay installation via <code>AwaitNextAction</code>
      (e.g., wait until off-peak hours), or cancel the update entirely via <code>Discontinue</code> (e.g., discovering a critical bug in this version).
      This design ensures the Provider maintains control throughout the entire OTA flow.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        Typical flow: Requestor downloads firmware → verifies OTA Image signature → sends ApplyUpdateRequest → receives Proceed → performs installation and reboots.
        If the Provider returns AwaitNextAction, the Requestor should wait DelayedActionTime seconds before resending ApplyUpdateRequest.
        If Discontinue is received, the Requestor should abandon installation and discard the downloaded image.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">NotifyUpdateApplied — Notify Update Completed (0x04)</h3>
  <p>
    After the Requestor successfully installs the firmware and reboots, it sends this command to inform the Provider that the update is complete.
    This is the <strong>last step</strong> of the entire OTA flow — a one-way notification with no response command.
    Upon receipt, the Provider can update its records (e.g., marking the device as updated to the new version).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UpdateToken</td>
          <td>octstr</td>
          <td>Token for this update session (same as in QueryImageResponse)</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>Current firmware version number after the update</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Why No Response?</div>
    <p>
      NotifyUpdateApplied is purely informational — the Requestor does not need confirmation from the Provider.
      The device has already successfully rebooted and is running the new version; even if the Provider doesn't receive this notification, it doesn't affect the device's normal operation.
      The Provider typically uses this notification to update statistics (e.g., "how many devices have upgraded to the new version").
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        The device should send this notification as soon as possible after reboot. If the Requestor cannot immediately connect to the Provider after reboot (e.g., network recovery takes time),
        it should send it retroactively once the connection is restored. The specification recommends the Requestor send NotifyUpdateApplied during its first Idle state after reboot.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-status">StatusEnum (Query Result Status)</h3>
  <p>The <code>Status</code> field of QueryImageResponse uses this enum to indicate the Provider's answer to the firmware query.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UpdateAvailable</span>
        <span class="enum-desc">Update available — the response includes the download address, version number, UpdateToken, and other complete information</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Busy</span>
        <span class="enum-desc">Provider is currently busy — the Requestor should wait DelayedActionTime seconds before retrying</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAvailable</span>
        <span class="enum-desc">No update available — the current firmware is already the latest version</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">DownloadProtocolNotSupported</span>
        <span class="enum-desc">Download protocol not supported — none of the protocols declared by the Requestor are available from the Provider</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Status Handling Quick Reference</div>
    <p>
      <strong>UpdateAvailable</strong> → Start downloading the firmware from ImageURI;
      <strong>Busy</strong> → Wait DelayedActionTime seconds then re-send QueryImage;
      <strong>NotAvailable</strong> → Nothing to do, check again at the next regular interval;
      <strong>DownloadProtocolNotSupported</strong> → Check the Requestor's ProtocolsSupported list to confirm whether a protocol supported by the Provider was missed.
    </p>
  </div>

  <h3 id="enum-action">ApplyUpdateActionEnum (Installation Decision)</h3>
  <p>The <code>Action</code> field of ApplyUpdateResponse uses this enum to indicate the Provider's decision on the installation request.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Proceed</span>
        <span class="enum-desc">Proceed with installation — the Requestor can immediately install the firmware and reboot</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AwaitNextAction</span>
        <span class="enum-desc">Defer installation — the Requestor should wait DelayedActionTime seconds before requesting again</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Discontinue</span>
        <span class="enum-desc">Cancel update — the Requestor should abandon installation and discard the downloaded image</span>
      </div>
    </div>
  </div>

  <h3 id="enum-protocol">DownloadProtocolEnum (Download Protocol)</h3>
  <p>The <code>ProtocolsSupported</code> parameter of QueryImage uses this enum to declare which firmware download methods the Requestor supports.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">BDXSynchronous</span>
        <span class="enum-desc">BDX synchronous transfer — Matter's built-in Bulk Data Exchange protocol (most common, suitable for LAN transfers)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">BDXAsynchronous</span>
        <span class="enum-desc">BDX asynchronous transfer — allows interleaving other Matter messages during transfer</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HTTPS</span>
        <span class="enum-desc">HTTPS download — download from a web server, suitable for devices with direct internet access</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">VendorSpecific</span>
        <span class="enum-desc">Vendor-specific protocol — uses the vendor's proprietary transfer method</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">BDX vs HTTPS</div>
    <p>
      Most Matter devices use the <strong>BDX (Bulk Data Exchange)</strong> protocol to download firmware,
      because it uses the Matter message channel and doesn't require the device to have independent internet connectivity.
      <strong>HTTPS</strong> is suitable for Wi-Fi-enabled devices to download directly from the cloud — faster, but requires the device to access the internet.
      Thread devices (such as door locks and sensors) typically only support BDX, as they connect via Border Routers and may not be able to initiate HTTPS requests directly.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>QueryImage Interaction Example</h3>
  <p>The Requestor queries the Provider for available updates — the Provider replies "new version available":</p>
  <pre><code>// Requestor → Provider: Query for available firmware
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x00"          // QueryImage
    },
    "commandFields": {
      "vendorID": 65521,           // Vendor ID (0xFFF1 = test vendor)
      "productID": 32769,          // Product ID
      "softwareVersion": 1,        // Current firmware version number
      "protocolsSupported": [0],   // Supported download protocols: BDXSynchronous
      "hardwareVersion": 0,        // Optional: hardware version
      "location": "CN",            // Optional: ISO 3166-1 country code
      "requestorCanConsent": true, // Optional: whether Requestor can show consent dialog to user
      "metadataForProvider": null  // Optional: vendor-specific data
    }
  }]
}

// Provider → Requestor: Update available
{
  "status": 0,                     // UpdateAvailable
  "delayedActionTime": 0,         // No waiting needed, download immediately
  "imageURI": "bdx://provider-node-id/firmware-v2.ota",
  "softwareVersion": 2,           // New firmware version number
  "softwareVersionString": "2.0.0",
  "updateToken": "dXBkYXRlLXRva2VuLXYy", // Base64-encoded update token
  "userConsentNeeded": false,      // No additional user confirmation needed
  "metadataForRequestor": null     // No vendor-specific data
}</code></pre>

  <h3>ApplyUpdateRequest Interaction Example</h3>
  <p>The Requestor has finished downloading and asks the Provider to confirm whether installation can proceed:</p>
  <pre><code>// Requestor → Provider: Download complete, requesting to apply update
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x02"          // ApplyUpdateRequest
    },
    "commandFields": {
      "updateToken": "dXBkYXRlLXRva2VuLXYy",  // Token from QueryImageResponse
      "newVersion": 2              // Version number to be installed
    }
  }]
}

// Provider → Requestor: Confirm installation
{
  "action": 0,                     // Proceed (allow installation)
  "delayedActionTime": 0           // No waiting needed
}</code></pre>

  <h3>NotifyUpdateApplied Example</h3>
  <p>After the Requestor successfully installs and reboots, it notifies the Provider that the update is complete:</p>
  <pre><code>// Requestor → Provider: Successfully installed and rebooted
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x04"          // NotifyUpdateApplied
    },
    "commandFields": {
      "updateToken": "dXBkYXRlLXRva2VuLXYy",  // Original update token
      "softwareVersion": 2         // Current version number after update
    }
  }]
}
// This command has no response (one-way notification)</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When developing an OTA Provider, the core logic lies in handling QueryImage — you need to match the correct firmware based on VendorID + ProductID + SoftwareVersion,
      and select the appropriate download method via ProtocolsSupported.
      If you have a large device fleet, make good use of the <code>Busy</code> status and <code>DelayedActionTime</code> for staggered distribution.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Standard Firmware Update Flow</summary>
    <div class="scenario-content">
      <ol>
        <li>Requestor sends <a href="#cmd-0x00"><code>QueryImage (0x00)</code></a> to Provider, carrying its own vendor ID, product ID, current version number, and supported download protocols</li>
        <li>Provider replies with <code>QueryImageResponse</code>, Status = <code>UpdateAvailable</code>, including ImageURI, new version number, and UpdateToken</li>
        <li>Requestor downloads the firmware image via ImageURI (BDX or HTTPS)</li>
        <li>After download completes, Requestor verifies the image signature (OTA Image header contains vendor signature)</li>
        <li>Verification passes, Requestor sends <a href="#cmd-0x02"><code>ApplyUpdateRequest (0x02)</code></a>, carrying UpdateToken and NewVersion</li>
        <li>Provider replies with <code>ApplyUpdateResponse</code>, Action = <code>Proceed</code></li>
        <li>Requestor performs firmware installation and reboots</li>
        <li>After reboot, Requestor sends <a href="#cmd-0x04"><code>NotifyUpdateApplied (0x04)</code></a> to inform the Provider of the successful update</li>
      </ol>
      <p>The entire flow from query to installation completion typically takes several minutes to tens of minutes, depending on firmware size and network conditions.</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Firmware Rollback (Emergency Withdrawal of Problematic Version)</summary>
    <div class="scenario-content">
      <ol>
        <li>The vendor discovers a critical bug in v2.0.0 that requires emergency withdrawal</li>
        <li>The Provider removes v2.0.0 firmware and offers v1.0.1 instead (fix version or rollback version)</li>
        <li>Devices already updated to v2.0.0 will receive UpdateAvailable pointing to v1.0.1 on their next QueryImage</li>
        <li>Devices not yet updated will receive <code>NotAvailable</code> on QueryImage (skipping v2.0.0)</li>
        <li>If a device has downloaded v2.0.0 but not yet installed it (at the ApplyUpdateRequest stage), Provider replies <code>Discontinue</code> to cancel installation</li>
      </ol>
      <p>
        <strong>Key point</strong>: The Matter OTA specification allows "downgrade" updates — SoftwareVersion can be lower than the current version.
        However, whether a downgrade actually succeeds depends on the device implementation: some devices' bootloaders may reject installing firmware with a version lower than the current one.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Multi-Device Batch Update (Staggered Distribution)</summary>
    <div class="scenario-content">
      <ol>
        <li>The vendor releases new firmware, with 10,000 devices in the fleet needing updates</li>
        <li>The Provider doesn't want all devices downloading simultaneously to avoid network congestion</li>
        <li>The first 100 devices querying via QueryImage receive <code>UpdateAvailable</code>, allowed to download immediately</li>
        <li>Starting from device 101, the Provider replies <code>Busy</code> with DelayedActionTime = 3600 (retry in 1 hour)</li>
        <li>After each batch completes, the Provider gradually opens up the next batch's quota</li>
        <li>If the Provider wants a device to wait until off-peak hours after downloading, ApplyUpdateRequest replies <code>AwaitNextAction</code> with DelayedActionTime set to the seconds until the desired time</li>
      </ol>
      <p>
        <strong>Implementation suggestion</strong>: The Provider can maintain an update queue and concurrency counter.
        By flexibly using <code>Busy</code> (controlling download concurrency) and <code>AwaitNextAction</code> (controlling installation timing),
        you can achieve smooth canary releases and staggered distribution.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Update Requiring User Consent</summary>
    <div class="scenario-content">
      <ol>
        <li>Requestor declares <code>RequestorCanConsent = true</code> in QueryImage (the device has a screen and can display a confirmation dialog)</li>
        <li>Provider replies with UpdateAvailable, <code>UserConsentNeeded = true</code></li>
        <li>Upon receiving the response, the Requestor displays a confirmation dialog on the device screen: "New version v2.0.0 is available. Do you want to update?"</li>
        <li>Only after the user clicks "Confirm" does the Requestor start downloading the firmware</li>
        <li>If the user declines, the Requestor does not download and asks again at the next check interval</li>
      </ol>
      <p>
        <strong>Screenless devices</strong>: If the Requestor has no screen (<code>RequestorCanConsent = false</code>),
        the Provider typically won't set UserConsentNeeded = true. For such devices, user consent can be obtained through
        the OTA management interface in a mobile app (the app acts as an intermediary conveying the user's intent).
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

  .dark .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  .dark .col-optional {
    color: #4ade80;
  }
</style>`,
  },
  'ota-software-update-requestor': {
    title: 'OtaSoftwareUpdateRequestor Cluster (0x002A)',
    description: 'Complete reference for the Matter OTA Software Update Requestor Cluster (0x002A) — AnnounceOTAProvider command, DefaultOTAProviders / UpdateState / UpdateStateProgress attributes, UpdateStateEnum / AnnouncementReasonEnum / ChangeReasonEnum enums, StateTransition / VersionApplied / DownloadError events, and typical OTA update scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>OtaSoftwareUpdateRequestor Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002A</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Endpoint) &nbsp;|&nbsp;
    <strong>Role</strong>: Server (device acts as OTA client)
  </p>
  <p>
    OtaSoftwareUpdateRequestor is the <strong>client side</strong> of the Matter OTA update system — i.e., the <strong>device that needs to be updated</strong>.
    It is responsible for querying the OTA Provider (update provider, corresponding to Cluster 0x0029) for new versions, downloading firmware, and applying updates.
    All Matter devices that support OTA must implement this Cluster.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">OTA Dual-Cluster Architecture</div>
    <p>
      Matter's OTA update is accomplished through two Clusters working together:
      <strong>OtaSoftwareUpdateProvider (0x0029)</strong> is the "server side", responsible for hosting firmware and responding to queries;
      <strong>OtaSoftwareUpdateRequestor (0x002A)</strong> is the "client side", responsible for initiating queries, downloading, and applying updates.
      This page describes the latter — the device-side behavior.
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
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    OtaSoftwareUpdateRequestor has only 1 command. It is not initiated by the device itself, but sent to the device by an external node
    (typically an OTA Provider or management node), informing the device that it can query a specific Provider for updates.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Direction</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AnnounceOTAProvider</td>
          <td>Notify device of an available OTA Provider</td>
          <td>Client → Server</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">AnnounceOTAProvider — Announce OTA Provider (0x00)</h3>
  <p>
    An external node uses this command to inform a device: "There is an OTA Provider that can provide updates for you."
    Upon receiving this command, the device should query the specified Provider for updates as soon as possible (by invoking the Provider's QueryImage command).
    This is the core trigger mechanism for push-style OTA — allowing devices to be passively notified rather than constantly polling.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProviderNodeID</td>
          <td>node-id</td>
          <td>Yes</td>
          <td>Node ID of the OTA Provider node</td>
        </tr>
        <tr>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>Yes</td>
          <td>Provider's Vendor ID, used by the device to determine whether to trust this Provider</td>
        </tr>
        <tr>
          <td>AnnouncementReason</td>
          <td>AnnouncementReasonEnum</td>
          <td>Yes</td>
          <td>Reason for the announcement (see <a href="#enum-announcement-reason">enum description</a>)</td>
        </tr>
        <tr>
          <td>MetadataForNode</td>
          <td>octstr</td>
          <td>No</td>
          <td>Custom metadata from the Provider to the device (max 512 bytes, optional)</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>Yes</td>
          <td>Endpoint on the Provider node where the OTA Provider Cluster resides</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The management backend releases new firmware and sends the AnnounceOTAProvider command to all target devices via a Hub or management node.
        Upon receipt, devices query the specified Provider for available updates. If the AnnouncementReason is UrgentUpdateAvailable,
        the device should prioritize it, potentially skipping user confirmation and starting the download immediately.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>OtaSoftwareUpdateRequestor has 4 application attributes, divided into two groups: "Provider Configuration" and "Update State".</p>

  <!-- Attribute summary table -->
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
        <!-- Provider Configuration -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>DefaultOTAProviders</td>
          <td>list&lt;ProviderLocation&gt;</td>
          <td><a href="#group-provider">Provider Configuration</a></td>
          <td>Default OTA Provider list</td>
        </tr>
        <!-- Update State -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>UpdatePossible</td>
          <td>bool</td>
          <td><a href="#group-state">Update State</a></td>
          <td>Whether the device can accept updates</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>UpdateState</td>
          <td>UpdateStateEnum</td>
          <td><a href="#group-state">Update State</a></td>
          <td>Current state of the OTA update state machine</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>UpdateStateProgress</td>
          <td>uint8 / null</td>
          <td><a href="#group-state">Update State</a></td>
          <td>Update progress percentage (0-100)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Provider Configuration (0x0000) ====== -->
  <h3 id="group-provider">Provider Configuration (0x0000)</h3>
  <p>Configures which OTA Providers the device should query for updates. Each Fabric can configure at most one Provider.</p>

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
          <td>DefaultOTAProviders (Default OTA Providers)</td>
          <td>list&lt;ProviderLocation&gt;</td>
          <td>
            List of OTA Providers the device queries by default. Each entry is a <code>ProviderLocation</code> struct.
            Writing requires <strong>manage</strong> privileges (Administrator role).
            Each Fabric can contain at most one entry — writing a new one for the same Fabric overwrites the old one
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProviderLocation Struct</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProviderNodeID</td>
          <td>node-id</td>
          <td>Node ID of the OTA Provider</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>Endpoint on the Provider where the OTA Provider Cluster resides</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Fabric index this entry belongs to (automatically populated by the system)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Fabric-Level Isolation</div>
    <p>
      DefaultOTAProviders is isolated per Fabric — each Fabric (administrative domain) can only see and modify its own entries.
      This means when a device joins multiple Fabrics simultaneously, each Fabric's administrator can specify their own OTA Provider independently without affecting each other.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Update State (0x0001 - 0x0003) ====== -->
  <h3 id="group-state">Update State (0x0001 - 0x0003)</h3>
  <p>Reflects the device's current OTA update state. These attributes are all read-only; apps track update progress by subscribing to them.</p>

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
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>UpdatePossible (Can Update)</td>
          <td>bool</td>
          <td>
            Whether the device can currently accept OTA updates. <code>true</code> means yes, <code>false</code> means the device currently does not allow updates
            (e.g., performing a critical operation, battery too low, etc.). Default value is <code>true</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>UpdateState (Update State)</td>
          <td>UpdateStateEnum</td>
          <td>
            Current state of the device's OTA state machine (see <a href="#enum-update-state">enum description</a>).
            This attribute tells you whether the device is querying, downloading, applying, or idle
          </td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>UpdateStateProgress (Update Progress)</td>
          <td>uint8 / null</td>
          <td>
            Progress percentage of the current update operation, range 0-100. Nullable — <code>null</code> means progress is unavailable
            (e.g., when the device is in the Idle state, or when the current stage cannot calculate progress)
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Progress Percentage Meaning Changes with State</div>
    <p>
      The meaning of <code>UpdateStateProgress</code> depends on the current value of <code>UpdateState</code>.
      In the Downloading state it represents download progress; in the Applying state it represents installation/write progress.
      Progress may reset to 0 or null when the state changes. Do not assume it is a linearly increasing global progress value.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <!-- UpdateStateEnum -->
  <h3 id="enum-update-state">UpdateStateEnum — Update State</h3>
  <p>Describes the complete lifecycle of the device's OTA state machine, with 9 states:</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown — the device has just started and the update state has not been determined yet</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Idle</span>
        <span class="enum-desc">Idle — no update activity, running normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Querying</span>
        <span class="enum-desc">Querying — currently querying the Provider for available updates</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">DelayedOnQuery</span>
        <span class="enum-desc">Query delayed — the Provider requested the device wait before retrying the query</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Downloading</span>
        <span class="enum-desc">Downloading — currently downloading the firmware image from the Provider</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Applying</span>
        <span class="enum-desc">Applying — writing the downloaded firmware to flash and verifying</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">DelayedOnApply</span>
        <span class="enum-desc">Apply delayed — firmware is ready, waiting for the right time to reboot and apply (e.g., waiting for user confirmation or off-peak hours)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">RollingBack</span>
        <span class="enum-desc">Rolling back — update failed, restoring to the previous firmware version</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">DelayedOnUserConsent</span>
        <span class="enum-desc">Waiting for user consent — update is ready, waiting for user confirmation on the device or in the app before proceeding</span>
      </div>
    </div>
  </div>

  <!-- AnnouncementReasonEnum -->
  <h3 id="enum-announcement-reason">AnnouncementReasonEnum — Announcement Reason</h3>
  <p>Used in the AnnounceOTAProvider command to inform the device of the reason for this announcement:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">SimpleAnnouncement</span>
        <span class="enum-desc">Simple announcement — merely informs that a Provider exists; the device can decide whether to query</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UpdateAvailable</span>
        <span class="enum-desc">Update available — explicitly states a new version exists; the device should query soon</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UrgentUpdateAvailable</span>
        <span class="enum-desc">Urgent update — a security patch or critical bug fix is available; the device should query immediately and prioritize the update</span>
      </div>
    </div>
  </div>

  <!-- ChangeReasonEnum -->
  <h3 id="enum-change-reason">ChangeReasonEnum — State Change Reason</h3>
  <p>Used in the StateTransition event to explain the reason for the state machine transition:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown reason</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Previous operation succeeded, progressing normally to the next stage</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Failure</span>
        <span class="enum-desc">Operation failed (e.g., download interrupted, verification failed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">TimeOut</span>
        <span class="enum-desc">Operation timed out (e.g., Provider not responding)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">DelayByProvider</span>
        <span class="enum-desc">Delay requested by Provider — the Provider returned Busy or specified a retry wait time</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    OtaSoftwareUpdateRequestor defines 3 events covering the key milestones of the OTA lifecycle.
    Subscribing to these events allows real-time tracking of the device's update process, which is more timely than polling attributes.
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>StateTransition</td>
          <td>Info</td>
          <td>Triggered when the OTA state machine transitions between states</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>VersionApplied</td>
          <td>Critical</td>
          <td>Triggered after a new firmware version is successfully applied</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>DownloadError</td>
          <td>Info</td>
          <td>Triggered when an error occurs during firmware download</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- StateTransition Event Details -->
  <h3 id="event-0x00">StateTransition — State Transition Event (0x00)</h3>
  <p>
    Triggered whenever the OTA state machine transitions from one state to another. This is the most critical event for tracking the update flow —
    by listening to it, you can follow every step from idle to querying, from downloading to applying.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousState</td>
          <td><code>0x00</code></td>
          <td>UpdateStateEnum</td>
          <td>State before the transition</td>
        </tr>
        <tr>
          <td>NewState</td>
          <td><code>0x01</code></td>
          <td>UpdateStateEnum</td>
          <td>New state after the transition</td>
        </tr>
        <tr>
          <td>Reason</td>
          <td><code>0x02</code></td>
          <td>ChangeReasonEnum</td>
          <td>Reason that triggered this transition</td>
        </tr>
        <tr>
          <td>TargetSoftwareVersion</td>
          <td><code>0x03</code></td>
          <td>uint32 / null</td>
          <td>Target firmware version number. null means not yet determined (e.g., when transitioning from Idle to Querying, the target version is unknown)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Event report example — transitioning from Idle to Downloading:</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x00"          // StateTransition
      },
      "eventNumber": 15,
      "priority": "INFO",
      "data": {
        "0": 1,                    // PreviousState = Idle
        "1": 4,                    // NewState = Downloading
        "2": 1,                    // Reason = Success (query succeeded, starting download)
        "3": 5                     // TargetSoftwareVersion = 5
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- VersionApplied Event Details -->
  <h3 id="event-0x01">VersionApplied — Version Applied Event (0x01)</h3>
  <p>
    Triggered after a new firmware version is successfully applied (typically reported after device reboot). This event confirms that the update is truly complete.
    Its priority is Critical, ensuring it is not discarded even when the event queue is full.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SoftwareVersion</td>
          <td><code>0x00</code></td>
          <td>uint32</td>
          <td>Version number of the newly applied firmware</td>
        </tr>
        <tr>
          <td>ProductID</td>
          <td><code>0x01</code></td>
          <td>uint16</td>
          <td>Product ID of the device</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Event report example:</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x01"          // VersionApplied
      },
      "eventNumber": 18,
      "priority": "CRITICAL",
      "data": {
        "0": 5,                    // SoftwareVersion = 5 (newly applied version number)
        "1": 4                     // ProductID = 4 (product ID)
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- DownloadError Event Details -->
  <h3 id="event-0x02">DownloadError — Download Error Event (0x02)</h3>
  <p>
    Triggered when an error is encountered during firmware download. This event provides contextual information at the time of failure (bytes downloaded, progress, etc.),
    which helps diagnose network issues or Provider-side faults.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SoftwareVersion</td>
          <td><code>0x00</code></td>
          <td>uint32</td>
          <td>Target firmware version being downloaded</td>
        </tr>
        <tr>
          <td>BytesDownloaded</td>
          <td><code>0x01</code></td>
          <td>uint64</td>
          <td>Number of bytes successfully downloaded before the error</td>
        </tr>
        <tr>
          <td>ProgressPercent</td>
          <td><code>0x02</code></td>
          <td>uint8 / null</td>
          <td>Download progress percentage (0-100) at the time of error; null means unable to calculate</td>
        </tr>
        <tr>
          <td>PlatformCode</td>
          <td><code>0x03</code></td>
          <td>int64 / null</td>
          <td>Platform-specific error code; null means no additional information. Specific meaning is defined by the device vendor</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Event report example — error occurred at 75% download:</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x02"          // DownloadError
      },
      "eventNumber": 16,
      "priority": "INFO",
      "data": {
        "0": 5,                    // SoftwareVersion = 5
        "1": 512,                  // BytesDownloaded = 512
        "2": 75,                   // ProgressPercent = 75 (error occurred at 75% download)
        "3": -1                    // PlatformCode = -1 (platform error code, nullable)
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read results from an idle device's OtaSoftwareUpdateRequestor Cluster:</p>

  <pre><code>{
  // --- Default OTA Providers ---
  "0x0000": [                     // DefaultOTAProviders (can configure multiple)
    {
      "providerNodeID": 12345,    // Provider's Node ID
      "endpoint": 0,              // Endpoint on the Provider where the OTA Provider Cluster resides
      "fabricIndex": 1            // Fabric index this entry belongs to
    }
  ],

  // --- Update Capability ---
  "0x0001": true,                 // UpdatePossible = true (device can currently accept updates)

  // --- Update State ---
  "0x0002": 0,                    // UpdateState = Idle (currently idle, not in an update flow)
  "0x0003": null                  // UpdateStateProgress = null (no progress information)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The OTA Requestor Cluster resides on <code>Endpoint 0</code> (Root Endpoint), not on functional endpoints.
      Make sure to specify the correct Endpoint when reading attributes. Also, <code>DefaultOTAProviders</code> is a Fabric-scoped list,
      so you can only see entries for the current Fabric.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Normal OTA Update Flow</summary>
    <div class="scenario-content">
      <p>Typical flow of a complete OTA update from announcement to application:</p>
      <ol>
        <li>Management node sends <code>AnnounceOTAProvider (0x00)</code> to the device, informing it of an available Provider</li>
        <li>Device sends QueryImage request to the Provider — UpdateState changes from Idle to <strong>Querying</strong></li>
        <li>Provider returns available update — device starts downloading, UpdateState changes to <strong>Downloading</strong></li>
        <li>During download, UpdateStateProgress gradually increases from 0 to 100</li>
        <li>Download complete, device verifies firmware and starts writing — UpdateState changes to <strong>Applying</strong></li>
        <li>Write complete, device reboots to apply new firmware — <strong>VersionApplied</strong> event is triggered after reboot</li>
        <li>UpdateState returns to <strong>Idle</strong>, ending the entire flow</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Provider Announcement Triggers Update</summary>
    <div class="scenario-content">
      <p>Different announcement reasons in the AnnounceOTAProvider command trigger different device behaviors:</p>
      <ol>
        <li><strong>SimpleAnnouncement (0)</strong>: Device can query at its convenience, not urgent. Suitable for regular firmware releases</li>
        <li><strong>UpdateAvailable (1)</strong>: Explicitly states a new version is available; device should query soon. Suitable for feature updates</li>
        <li><strong>UrgentUpdateAvailable (2)</strong>: Urgent security patch; device should query immediately and prioritize download.
          The device may skip DelayedOnUserConsent and proceed directly to download to ensure the security vulnerability is patched ASAP</li>
      </ol>
      <p>
        When the app receives a StateTransition event, it can use the Reason field to determine whether to show a notification to the user.
        Updates triggered by UrgentUpdateAvailable should display a prominent alert.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Update Progress Tracking</summary>
    <div class="scenario-content">
      <p>How to implement real-time OTA update progress display in an app:</p>
      <ol>
        <li>Subscribe to <code>UpdateState (0x0002)</code> and <code>UpdateStateProgress (0x0003)</code> attributes</li>
        <li>Also subscribe to the <code>StateTransition</code>, <code>VersionApplied</code>, and <code>DownloadError</code> events</li>
        <li>Display different UI states based on UpdateState values:
          <ul>
            <li>Idle → Show "Firmware is up to date" or a "Check for Updates" button</li>
            <li>Querying → Show "Checking for updates..."</li>
            <li>Downloading → Show download progress bar with value from UpdateStateProgress</li>
            <li>Applying → Show "Installing update, do not power off..."</li>
            <li>DelayedOnUserConsent → Show confirmation dialog, waiting for user consent</li>
            <li>RollingBack → Show "Update failed, restoring..."</li>
          </ul>
        </li>
        <li>On VersionApplied event → Show "Update successful! Upgraded to version X"</li>
        <li>On DownloadError event → Show "Download failed" with downloaded progress and a retry button</li>
      </ol>
      <p>
        <strong>Note</strong>: UpdateStateProgress may become null or reset to 0 during state transitions.
        The UI should handle the null case gracefully (e.g., hide the progress bar or show an indeterminate progress indicator).
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

  .dark .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  .dark .col-optional {
    color: #4ade80;
  }

  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'general-diagnostics': {
    title: 'GeneralDiagnostics Cluster (0x0033)',
    description: 'Complete reference for the Matter GeneralDiagnostics Cluster (0x0033) — device health status, network interface information, reboot statistics, fault tracking, TestEventTrigger test command, and all enum quick references.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>GeneralDiagnostics Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0033</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    GeneralDiagnostics provides device health status and operational diagnostics — including network interface details, reboot count, uptime, boot reason,
    and real-time tracking of hardware, radio, and network faults. All Matter devices must implement this Cluster; it is the primary entry point for device operations and troubleshooting.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Endpoint 0 Exclusive</div>
    <p>
      GeneralDiagnostics only appears on <strong>Endpoint 0</strong> (Root Endpoint), never on functional endpoints.
      It reflects the health status of the entire device, not the status of a specific functional module.
      When reading, make sure to specify <code>endpointId = 0</code>.
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
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    GeneralDiagnostics has only two commands. <code>TestEventTrigger</code> is used for certification testing and is typically disabled in production;
    <code>TimeSnapshot</code> is used to get the device's current time snapshot.
    Click on a command ID in the table below to jump to its detailed description.
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
          <td>TestEventTrigger</td>
          <td>Client → Server</td>
          <td>Trigger an internal test event on the device</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>TimeSnapshot</td>
          <td>Client → Server</td>
          <td>Get the device's current time snapshot</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">TestEventTrigger — Test Event Trigger (0x00)</h3>
  <p>
    Triggers a preset test event on the device. This command is primarily used during Matter certification testing, allowing test tools to simulate specific device behaviors
    without disassembly (e.g., simulating sensor alarms, triggering fault states, etc.).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnableKey</td>
          <td>octstr (16 bytes)</td>
          <td>Enable key — must match the device's preset key, otherwise the command is rejected. Production devices should set this key to all zeros to disable test functionality</td>
        </tr>
        <tr>
          <td>EventTrigger</td>
          <td>uint64</td>
          <td>Trigger identifier — identifies the specific test event to trigger, defined by the vendor or Matter test specification</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Security Note</div>
    <p>
      This command only works when the <code>TestEventTriggersEnabled</code> attribute is <code>true</code>.
      Production devices <strong>must</strong> disable test triggers (set EnableKey to all zeros), otherwise there is a security risk —
      attackers could use this command to simulate faults or tamper with device behavior.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        During Matter certification testing, test tools use this command to make the device simulate specific states (e.g., smoke alarm, network disconnection),
        verifying that the device's event reporting and fault handling logic meets the specification. This command is rarely used in app development.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">TimeSnapshot — Time Snapshot (0x01)</h3>
  <p>
    Requests the device to return its current system time. No parameters required.
    The device returns a <code>TimeSnapshotResponse</code> containing the milliseconds since boot and a POSIX timestamp (if the device has a reliable clock).
  </p>

  <h4>TimeSnapshotResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SystemTimeMs</td>
          <td>uint64</td>
          <td>Milliseconds elapsed since device boot (monotonically increasing, unaffected by clock calibration)</td>
        </tr>
        <tr>
          <td>PosixTimeMs</td>
          <td>uint64 / null</td>
          <td>POSIX timestamp (millisecond precision). If the device has no reliable UTC clock, this field is <code>null</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Used when troubleshooting device time synchronization issues. For example, if device log timestamps are noticeably off, you can use TimeSnapshot to confirm whether the device's internal clock is accurate.
        <code>SystemTimeMs</code> is a monotonic clock from boot, and can be cross-validated with the <code>UpTime</code> attribute.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>GeneralDiagnostics attributes are divided into four groups by function. Click on an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <!-- Network Interface -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NetworkInterfaces</td>
          <td>list&lt;NetworkInterface&gt;</td>
          <td><a href="#group-network">Network Interface</a></td>
          <td>All network interface information of the device</td>
        </tr>
        <!-- Runtime Statistics -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>RebootCount</td>
          <td>uint16</td>
          <td><a href="#group-runtime">Runtime Statistics</a></td>
          <td>Total reboot count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>UpTime</td>
          <td>uint64</td>
          <td><a href="#group-runtime">Runtime Statistics</a></td>
          <td>Device uptime (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TotalOperationalHours</td>
          <td>uint32</td>
          <td><a href="#group-runtime">Runtime Statistics</a></td>
          <td>Total operational hours</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>BootReason</td>
          <td>BootReasonEnum</td>
          <td><a href="#group-runtime">Runtime Statistics</a></td>
          <td>Reason for the most recent boot</td>
        </tr>
        <!-- Fault Tracking -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ActiveHardwareFaults</td>
          <td>list&lt;HardwareFaultEnum&gt;</td>
          <td><a href="#group-faults">Fault Tracking</a></td>
          <td>List of currently active hardware faults</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ActiveRadioFaults</td>
          <td>list&lt;RadioFaultEnum&gt;</td>
          <td><a href="#group-faults">Fault Tracking</a></td>
          <td>List of currently active radio faults</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ActiveNetworkFaults</td>
          <td>list&lt;NetworkFaultEnum&gt;</td>
          <td><a href="#group-faults">Fault Tracking</a></td>
          <td>List of currently active network faults</td>
        </tr>
        <!-- Test Configuration -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>TestEventTriggersEnabled</td>
          <td>bool</td>
          <td><a href="#group-test">Test Configuration</a></td>
          <td>Whether test event triggers are enabled</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Network Interface (0x0000) ====== -->
  <h3 id="group-network">Network Interface (0x0000)</h3>
  <p>Detailed information list of all currently available network interfaces on the device.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>NetworkInterfaces<br/><span class="attr-cn">Network Interface List</span></td>
          <td>list&lt;NetworkInterface&gt;</td>
          <td>Information list of all current network interfaces on the device. Each element is a <a href="#struct-network-interface">NetworkInterface</a> struct containing interface name, status, IP address, and other details. Maximum 8 interfaces</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      NetworkInterfaces is the most direct way to understand the device's network connectivity.
      If the device has both WiFi and Thread interfaces, the list will contain multiple entries.
      By checking <code>IsOperational</code>, you can determine which interface is currently active.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Runtime Statistics (0x0001-0x0004) ====== -->
  <h3 id="group-runtime">Runtime Statistics (0x0001-0x0004)</h3>
  <p>Device uptime statistics and boot reason — key indicators for assessing device stability.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>RebootCount<br/><span class="attr-cn">Reboot Count</span></td>
          <td>uint16</td>
          <td>Total number of reboots since the device was manufactured. Frequent reboots usually indicate stability issues (unstable power supply, firmware crashes, etc.)</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>UpTime<br/><span class="attr-cn">Uptime</span></td>
          <td>uint64</td>
          <td>Time elapsed since the device's most recent boot, in <strong>seconds</strong>. Can be used to determine if the device has recently rebooted</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>TotalOperationalHours<br/><span class="attr-cn">Total Operational Hours</span></td>
          <td>uint32</td>
          <td>Total operational hours since the device was manufactured (rounded). This value is persisted across reboots and used for assessing device lifespan</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>BootReason<br/><span class="attr-cn">Boot Reason</span></td>
          <td><a href="#enum-boot-reason">BootReasonEnum</a></td>
          <td>Reason for the device's most recent boot (see enum below). Check this field first when troubleshooting abnormal reboots</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Time Unit Note</div>
    <p>
      <code>UpTime</code> is in <strong>seconds</strong>, while <code>TotalOperationalHours</code> is in <strong>hours</strong>.
      For example, <code>UpTime = 86400</code> means 24 hours of uptime, while <code>TotalOperationalHours = 720</code> means 30 days of cumulative operation.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Fault Tracking (0x0005-0x0007) ====== -->
  <h3 id="group-faults">Fault Tracking (0x0005-0x0007)</h3>
  <p>
    Three list attributes track currently active faults at the hardware, radio, and network levels respectively.
    On a normally operating device, all three lists should be empty. A non-empty value indicates the device has detected a fault of the corresponding type.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ActiveHardwareFaults<br/><span class="attr-cn">Active Hardware Faults</span></td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>List of currently existing hardware faults. Empty list = no faults. May contain multiple different fault types simultaneously</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ActiveRadioFaults<br/><span class="attr-cn">Active Radio Faults</span></td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>List of currently existing radio (wireless communication) faults. Appears when WiFi/BLE/Thread modules are abnormal</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ActiveNetworkFaults<br/><span class="attr-cn">Active Network Faults</span></td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>List of currently existing network layer faults. Such as connection failures, network interference, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Relationship Between Fault Lists and Events</div>
    <p>
      These three lists record <strong>currently</strong> existing faults. When a fault state changes (new fault or recovery), the device simultaneously emits a corresponding change event
      (<a href="#event-0x00">HardwareFaultChange</a>, <a href="#event-0x01">RadioFaultChange</a>, <a href="#event-0x02">NetworkFaultChange</a>).
      The event contains the complete lists before and after the change, making it easy to track fault occurrence and recovery.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Test Configuration (0x0008) ====== -->
  <h3 id="group-test">Test Configuration (0x0008)</h3>
  <p>Configuration attributes related to certification testing.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>TestEventTriggersEnabled<br/><span class="attr-cn">Test Triggers Enabled</span></td>
          <td>bool</td>
          <td>Indicates whether the device has enabled the <code>TestEventTrigger</code> command. Production devices <strong>must</strong> set this to <code>false</code>. If a shipped product reads <code>true</code>, it indicates a security configuration defect from the manufacturer</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>
  <p>GeneralDiagnostics involves multiple enum types, all listed below with their values.</p>

  <!-- BootReasonEnum -->
  <h3 id="enum-boot-reason">BootReasonEnum — Boot Reason</h3>
  <p>Describes the reason for the device's most recent boot, corresponding to the <code>BootReason (0x0004)</code> attribute and the <a href="#event-0x03">BootReason event</a>.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified — the device cannot determine the boot reason</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PowerOnReboot</span>
        <span class="enum-desc">Normal power-on — device started after power was connected</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BrownOutReset</span>
        <span class="enum-desc">Brown-out reset — power voltage dropped below critical threshold, triggering reset</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SoftwareWatchdogReset</span>
        <span class="enum-desc">Software watchdog reset — firmware running abnormally, watchdog timer expired and triggered reset</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HardwareWatchdogReset</span>
        <span class="enum-desc">Hardware watchdog reset — hardware-level watchdog timeout, typically more severe than software watchdog</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">SoftwareUpdateCompleted</span>
        <span class="enum-desc">Firmware update completed — automatic reboot after successful OTA upgrade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">SoftwareReset</span>
        <span class="enum-desc">Software reset — reboot actively triggered by software (e.g., remote reboot command, factory reset)</span>
      </div>
    </div>
  </div>

  <!-- HardwareFaultEnum -->
  <h3 id="enum-hardware-fault">HardwareFaultEnum — Hardware Fault</h3>
  <p>Describes hardware-level faults the device may encounter, corresponding to the <code>ActiveHardwareFaults (0x0005)</code> attribute.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified hardware fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Radio</span>
        <span class="enum-desc">Radio module fault — wireless communication hardware abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Sensor</span>
        <span class="enum-desc">Sensor fault — temperature, humidity, and other sensor abnormalities</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ResettableOverTemp</span>
        <span class="enum-desc">Resettable over-temperature — temperature too high, can auto-recover after cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">NonResettableOverTemp</span>
        <span class="enum-desc">Non-resettable over-temperature — severe overheating, may have caused permanent damage</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">PowerSource</span>
        <span class="enum-desc">Power source fault — power supply module abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">VisualDisplayFault</span>
        <span class="enum-desc">Visual display fault — screen or LED indicator abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">AudioOutputFault</span>
        <span class="enum-desc">Audio output fault — speaker or buzzer abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">UserInterfaceFault</span>
        <span class="enum-desc">User interface fault — buttons, touchpad, and other input device abnormalities</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">NonVolatileMemoryError</span>
        <span class="enum-desc">Non-volatile memory error — Flash/EEPROM read/write abnormality, data may be lost</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">TamperDetected</span>
        <span class="enum-desc">Tamper detected — device enclosure was opened or sensor triggered tamper alarm</span>
      </div>
    </div>
  </div>

  <!-- RadioFaultEnum -->
  <h3 id="enum-radio-fault">RadioFaultEnum — Radio Fault</h3>
  <p>Describes fault types for the device's wireless communication modules, corresponding to the <code>ActiveRadioFaults (0x0006)</code> attribute.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified radio fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">WiFiFault</span>
        <span class="enum-desc">WiFi module fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">CellularFault</span>
        <span class="enum-desc">Cellular network module fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ThreadFault</span>
        <span class="enum-desc">Thread module fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">NFCFault</span>
        <span class="enum-desc">NFC module fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">BLEFault</span>
        <span class="enum-desc">BLE (Bluetooth Low Energy) module fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">EthernetFault</span>
        <span class="enum-desc">Ethernet module fault</span>
      </div>
    </div>
  </div>

  <!-- NetworkFaultEnum -->
  <h3 id="enum-network-fault">NetworkFaultEnum — Network Fault</h3>
  <p>Describes network-level fault types for the device, corresponding to the <code>ActiveNetworkFaults (0x0007)</code> attribute.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified network fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">Network hardware failure — NIC or physical connection abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NetworkJammed</span>
        <span class="enum-desc">Network jammed — channel congestion or electromagnetic interference detected</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ConnectionFailed</span>
        <span class="enum-desc">Connection failed — unable to establish or maintain network connection</span>
      </div>
    </div>
  </div>

  <!-- InterfaceTypeEnum -->
  <h3 id="enum-interface-type">InterfaceTypeEnum — Network Interface Type</h3>
  <p>Describes the physical type of a network interface, corresponding to the <code>Type</code> field in the <a href="#struct-network-interface">NetworkInterface</a> struct.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified type</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">WiFi</span>
        <span class="enum-desc">WiFi wireless interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Ethernet</span>
        <span class="enum-desc">Ethernet wired interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cellular</span>
        <span class="enum-desc">Cellular mobile network interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Thread</span>
        <span class="enum-desc">Thread mesh network interface</span>
      </div>
    </div>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-network-interface">NetworkInterface Struct</h3>
  <p>Describes the complete information of a network interface, representing the structure of each list element in the <code>NetworkInterfaces (0x0000)</code> attribute.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>string (max 32)</td>
          <td>Interface name, e.g., <code>"wlan0"</code>, <code>"eth0"</code>, <code>"Thread"</code></td>
        </tr>
        <tr>
          <td>IsOperational</td>
          <td>bool</td>
          <td>Whether the interface is running and available for communication</td>
        </tr>
        <tr>
          <td>OffPremiseServicesReachableIPv4</td>
          <td>bool / null</td>
          <td>Whether IPv4 through this interface can reach external (internet) services. <code>null</code> = unknown</td>
        </tr>
        <tr>
          <td>OffPremiseServicesReachableIPv6</td>
          <td>bool / null</td>
          <td>Whether IPv6 through this interface can reach external services. <code>null</code> = unknown</td>
        </tr>
        <tr>
          <td>HardwareAddress</td>
          <td>octstr (6 or 8 bytes)</td>
          <td>Hardware address (MAC address) of the interface. WiFi/Ethernet uses 6 bytes, IEEE 802.15.4 (Thread) uses 8 bytes</td>
        </tr>
        <tr>
          <td>IPv4Addresses</td>
          <td>list&lt;octstr&gt;</td>
          <td>List of all IPv4 addresses assigned to this interface</td>
        </tr>
        <tr>
          <td>IPv6Addresses</td>
          <td>list&lt;octstr&gt;</td>
          <td>List of all IPv6 addresses assigned to this interface (typically includes link-local and global addresses)</td>
        </tr>
        <tr>
          <td>Type</td>
          <td><a href="#enum-interface-type">InterfaceTypeEnum</a></td>
          <td>Physical type of the interface</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>NetworkInterface data example:</p>
  <pre><code>{
  "Name": "wlan0",                              // Interface name
  "IsOperational": true,                        // Interface is running
  "OffPremiseServicesReachableIPv4": true,       // IPv4 can reach external services
  "OffPremiseServicesReachableIPv6": null,       // IPv6 reachability unknown
  "HardwareAddress": "AA:BB:CC:DD:EE:FF",       // MAC address
  "IPv4Addresses": ["192.168.1.100"],            // IPv4 address list
  "IPv6Addresses": ["fe80::1", "2001:db8::1"],  // IPv6 address list
  "Type": 1                                     // WiFi interface
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    GeneralDiagnostics defines 4 events, all with <strong>Critical</strong> priority.
    The first three correspond to change notifications for hardware/radio/network fault states respectively; the fourth is a device boot reason notification.
    Subscribing to these events enables real-time awareness of changes in device health status.
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>HardwareFaultChange</td>
          <td class="col-required">Critical</td>
          <td>Hardware fault list changed</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>RadioFaultChange</td>
          <td class="col-required">Critical</td>
          <td>Radio fault list changed</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>NetworkFaultChange</td>
          <td class="col-required">Critical</td>
          <td>Network fault list changed</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x03">
          <td><a href="#event-0x03"><code>0x03</code></a></td>
          <td>BootReason</td>
          <td class="col-required">Critical</td>
          <td>Reports boot reason when device starts</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Event Details -->
  <h3 id="event-0x00">HardwareFaultChange — Hardware Fault Change (0x00)</h3>
  <p>
    Triggered when the device's hardware fault state changes — whether a new fault occurs or a fault is recovered.
    The event data includes complete fault lists before and after the change for comparison analysis.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>Current hardware fault list after the change (consistent with the <code>ActiveHardwareFaults</code> attribute)</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>Hardware fault list before the change</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Interpretation Example</summary>
    <div class="scenario-content">
      <p>
        Suppose you receive an event with <code>Previous = [3]</code>, <code>Current = [3, 9]</code>.
        This indicates that a "Resettable Over-temperature (3)" fault already existed, and now a "Non-volatile Memory Error (9)" has been added.
        If you subsequently receive <code>Previous = [3, 9]</code>, <code>Current = [9]</code>, it means the over-temperature fault has recovered, but the storage error persists.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x01">RadioFaultChange — Radio Fault Change (0x01)</h3>
  <p>Triggered when the device's radio fault state changes. Structure is the same as HardwareFaultChange.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>Current radio fault list after the change</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>Radio fault list before the change</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x02">NetworkFaultChange — Network Fault Change (0x02)</h3>
  <p>Triggered when the device's network fault state changes. Structure is the same as HardwareFaultChange.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>Current network fault list after the change</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>Network fault list before the change</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x03">BootReason — Boot Reason Event (0x03)</h3>
  <p>
    This event is emitted every time the device boots, reporting the boot reason.
    This is the primary clue for troubleshooting abnormal device reboots — most effective when used with the <code>RebootCount</code> attribute.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>BootReason</td>
          <td><a href="#enum-boot-reason">BootReasonEnum</a></td>
          <td>Reason for this boot</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Interpretation Example</summary>
    <div class="scenario-content">
      <p>
        Receiving <code>BootReason = 3 (SoftwareWatchdogReset)</code> indicates the device was forcibly rebooted by the watchdog due to firmware abnormality.
        If you receive multiple BootReason events with the same cause in a short time, it is strongly recommended to contact the manufacturer to investigate firmware issues.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read results from a normally running WiFi smart device's GeneralDiagnostics Cluster:</p>

  <pre><code>{
  // --- Network Interfaces ---
  "0x0000": [                   // NetworkInterfaces
    {
      "Name": "wlan0",
      "IsOperational": true,
      "OffPremiseServicesReachableIPv4": true,
      "OffPremiseServicesReachableIPv6": null,
      "HardwareAddress": "AA:BB:CC:DD:EE:FF",
      "IPv4Addresses": ["192.168.1.100"],
      "IPv6Addresses": ["fe80::1"],
      "Type": 1                 // WiFi
    }
  ],

  // --- Runtime Statistics ---
  "0x0001": 12,                 // RebootCount = 12 (12 total reboots)
  "0x0002": 86400,              // UpTime = 86400 seconds (running for 24 hours)
  "0x0003": 720,                // TotalOperationalHours = 720 (30 days total)
  "0x0004": 1,                  // BootReason = PowerOnReboot (normal power-on boot)

  // --- Fault Status ---
  "0x0005": [],                 // ActiveHardwareFaults = [] (no hardware faults)
  "0x0006": [],                 // ActiveRadioFaults = [] (no radio faults)
  "0x0007": [],                 // ActiveNetworkFaults = [] (no network faults)

  // --- Test Configuration ---
  "0x0008": false               // TestEventTriggersEnabled = false (test triggers not enabled)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      A healthy device's three fault lists (0x0005 ~ 0x0007) should all be empty arrays. Non-empty values indicate the device currently has anomalies.
      Combined with <code>BootReason (0x0004)</code> and <code>RebootCount (0x0001)</code>, you can preliminarily assess device stability —
      frequent reboots + watchdog reasons + non-empty hardware fault list strongly suggests hardware problems.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Device Health Overview</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>UpTime (0x0002)</code> to confirm device uptime and determine if it recently rebooted</li>
        <li>Read <code>BootReason (0x0004)</code> — if it is not PowerOnReboot(1) or SoftwareReset(6), there may be an anomaly</li>
        <li>Read <code>ActiveHardwareFaults (0x0005)</code>, <code>ActiveRadioFaults (0x0006)</code>, <code>ActiveNetworkFaults (0x0007)</code> to confirm no active faults</li>
        <li>Read <code>RebootCount (0x0001)</code> — if abnormally high, combine with <code>TotalOperationalHours (0x0003)</code> to calculate average reboot frequency</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Troubleshooting Device Offline Issues</summary>
    <div class="scenario-content">
      <ol>
        <li>After the device comes back online, read <code>BootReason (0x0004)</code> — to determine if it rebooted or just lost network connection</li>
        <li>Read <code>NetworkInterfaces (0x0000)</code>, check <code>IsOperational</code> and <code>OffPremiseServicesReachableIPv4</code> status</li>
        <li>Check <code>ActiveNetworkFaults (0x0007)</code> for ConnectionFailed(3) or NetworkJammed(2)</li>
        <li>Subscribe to <code>NetworkFaultChange</code> events to monitor for subsequent network anomalies</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Post-Firmware-Update Verification</summary>
    <div class="scenario-content">
      <ol>
        <li>After OTA upgrade completes, the device should automatically reboot</li>
        <li>Read <code>BootReason (0x0004)</code>, expected value is <code>SoftwareUpdateCompleted (5)</code></li>
        <li>If it is <code>SoftwareWatchdogReset (3)</code> or <code>HardwareWatchdogReset (4)</code>, the new firmware may have issues</li>
        <li>Continue monitoring <code>ActiveHardwareFaults</code> and <code>RebootCount</code> to ensure the new version runs stably</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Production Security Check</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>TestEventTriggersEnabled (0x0008)</code>, it <strong>must</strong> be <code>false</code></li>
        <li>If <code>true</code>, the device has not disabled test mode, posing a security risk — attackers could manipulate device behavior through the TestEventTrigger command</li>
        <li>This check is typically performed before product shipment and during security audits</li>
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

  .dark .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  .dark .col-optional {
    color: #4ade80;
  }

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .dark .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'software-diagnostics': {
    title: 'SoftwareDiagnostics Cluster (0x0034)',
    description: 'Complete reference for the Matter SoftwareDiagnostics Cluster (0x0034) — thread metrics, heap memory monitoring, high watermark tracking, software fault events, the foundational cluster for embedded device runtime health diagnostics.',
    prev: undefined,
    next: undefined,
    content: `<h1>SoftwareDiagnostics Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0034</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root / Node level) &nbsp;|&nbsp;
    <strong>Role</strong>: Server (read-only + one reset command)
  </p>
  <p>
    SoftwareDiagnostics exposes the runtime health status of device firmware — including <strong>thread stack usage</strong>, <strong>heap memory allocation</strong>, and <strong>software fault records</strong>.
    This is a diagnostics cluster in Matter designed for developers and operations personnel, helping understand the internal state of embedded devices without connecting a debugger.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      Device behaving abnormally after running for a while? Read heap memory attributes to check for memory leaks.
      Suspect a thread stack overflow? Check StackFreeMinimum in ThreadMetrics.
      Want to confirm firmware stability after an OTA upgrade? Monitor SoftwareFault events and watermark changes.
      This information is especially useful for remote diagnostics after mass production.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The SoftwareDiagnostics Cluster declares optional device capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">WTRMRK（Watermarks）</span>
        <span class="enum-desc">Watermark tracking — supports CurrentHeapHighWatermark attribute and ResetWatermarks command, recording historical peak heap memory usage</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Meaning</div>
    <p>
      <code>FeatureMap = 0x01</code> (WTRMRK): Device tracks heap memory usage peaks, resettable via the ResetWatermarks command.<br/>
      <code>FeatureMap = 0x00</code> (no Feature): Only provides real-time heap memory and thread metrics, no historical peak records.
    </p>
  </div>

  <!-- ====== Attributes Overview ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>All attributes are read-only. Heap memory attributes are optional, and ThreadMetrics is also optional. Click an attribute ID to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Condition</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>ThreadMetrics</td>
          <td>list&lt;ThreadMetricsStruct&gt;</td>
          <td>Optional</td>
          <td>List of currently running threads and their stack usage</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>CurrentHeapFree</td>
          <td>uint64</td>
          <td>Optional</td>
          <td>Current free heap bytes</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>CurrentHeapUsed</td>
          <td>uint64</td>
          <td>Optional</td>
          <td>Current used heap bytes</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>CurrentHeapHighWatermark</td>
          <td>uint64</td>
          <td>WTRMRK</td>
          <td>Historical peak heap usage (high watermark)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">ThreadMetrics (Thread Metrics List)</h3>
  <p>
    Returns stack usage information for all currently running threads on the device. Each entry is a <code>ThreadMetricsStruct</code> containing thread ID, name, and stack usage statistics.
    This is a key data source for troubleshooting stack overflows.
  </p>

  <h4 id="thread-metrics-struct">ThreadMetricsStruct Structure</h4>
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
          <td><code>0x00</code></td>
          <td>Id</td>
          <td>uint64</td>
          <td>Yes</td>
          <td>Unique thread identifier</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>Name</td>
          <td>string (max 8 characters)</td>
          <td>Optional</td>
          <td>Thread name (e.g., "Main", "BLE", "WiFi")</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>StackFreeCurrent</td>
          <td>uint32</td>
          <td>Optional</td>
          <td>Current free stack bytes</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>StackFreeMinimum</td>
          <td>uint32</td>
          <td>Optional</td>
          <td>Historical minimum of free stack bytes (stack usage watermark)</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>StackSize</td>
          <td>uint32</td>
          <td>Optional</td>
          <td>Total thread stack size (bytes)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Stack Overflow Assessment</div>
    <p>
      When <code>StackFreeMinimum</code> approaches 0, it means the thread has nearly exhausted its stack space, indicating a stack overflow risk.
      It is generally recommended to maintain a safety margin of <code>StackFreeMinimum / StackSize &gt; 10%</code>.
      If below this threshold, consider increasing the thread's stack allocation or optimizing its call depth.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">CurrentHeapFree (Free Heap Bytes)</h3>
  <p>
    Number of bytes currently available for allocation in the device heap. On resource-constrained embedded devices (e.g., ESP32 series),
    a continuously decreasing value may indicate a memory leak.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">CurrentHeapUsed (Used Heap Bytes)</h3>
  <p>
    Number of bytes currently allocated in the device heap. Complementary to <code>CurrentHeapFree</code> —
    their sum approximates the total heap size (with possible differences due to fragmentation and management overhead).
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">CurrentHeapHighWatermark (Heap Usage High Watermark)</h3>
  <p>
    The maximum value <code>CurrentHeapUsed</code> has reached since the last <code>ResetWatermarks</code> command or device startup.
    This attribute requires <strong>WTRMRK</strong> Feature support.
  </p>
  <p>
    The high watermark is an important indicator for assessing device memory headroom — it reflects "how much memory was used in the worst case,"
    not a snapshot at a single moment. Even if the current <code>CurrentHeapUsed</code> looks normal, the watermark may reveal intermittent memory spikes.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    SoftwareDiagnostics has only one command, requiring <strong>WTRMRK</strong> Feature support.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Condition</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>ResetWatermarks</td>
          <td>WTRMRK</td>
          <td>Reset heap usage high watermark and thread stack minimum free values</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetWatermarks — Reset Watermarks (0x00)</h3>
  <p>
    Resets <code>CurrentHeapHighWatermark</code> to the current <code>CurrentHeapUsed</code> value,
    and simultaneously resets all threads' <code>StackFreeMinimum</code> to their current <code>StackFreeCurrent</code> values.
    This command does not accept any parameters.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">When to Use</div>
    <p>
      Typical usage: Send a ResetWatermarks after an OTA upgrade, then observe the high watermark after the new firmware runs for a period,
      to assess whether the new version has memory usage regression. Also useful for investigating memory impact of specific operations — reset, perform the operation, then read the watermark.
    </p>
  </div>
  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0034",
      "commandId": "0x00"       // ResetWatermarks
    },
    "commandFields": {}         // No parameters
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    When a software fault is detected during device operation, a SoftwareFault event is reported. This event is optionally supported.
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>SoftwareFault</td>
          <td>Info</td>
          <td>Triggered when a software fault is detected</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">SoftwareFault — Software Fault Event (0x00)</h3>
  <p>
    This event is reported when device firmware detects a software anomaly (such as unhandled exceptions, assertion failures, watchdog triggers, etc.).
    The event data carries fault thread information and optional fault scene records.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Id</td>
          <td><code>0x00</code></td>
          <td>uint64</td>
          <td>Thread ID when the fault occurred</td>
        </tr>
        <tr>
          <td>Name</td>
          <td><code>0x01</code></td>
          <td>string (max 8 characters)</td>
          <td>Fault thread name (optional)</td>
        </tr>
        <tr>
          <td>FaultRecording</td>
          <td><code>0x02</code></td>
          <td>octstr (max 1024 bytes)</td>
          <td>Fault scene data, format defined by manufacturer (optional)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Purpose of FaultRecording</div>
    <p>
      <code>FaultRecording</code> is a vendor-defined binary data blob that may contain register snapshots, call stack traces,
      crash addresses, and other debug information. The format varies by chip platform and requires the vendor's decoding tools.
      The app typically only needs to upload the raw data to the cloud for backend service parsing.
    </p>
  </div>

  <p>Event report example:</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x0034",
        "eventId": "0x00"       // SoftwareFault
      },
      "eventNumber": 7,
      "priority": "INFO",
      "data": {
        "0": 42,                // Id = 42 (fault thread ID)
        "1": "BLE",             // Name = "BLE" (fault thread name)
        "2": "RkVUQ0g6IDB4..."  // FaultRecording (Base64-encoded fault scene data)
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading a SoftwareDiagnostics Cluster's attributes from an ESP32 device:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": [                       // ThreadMetrics (thread metrics list)
    {
      "0": 1,                    // Id = 1
      "1": "Main",               // Name = "Main"
      "2": 2048,                 // StackFreeCurrent = 2048 bytes
      "3": 1024,                 // StackFreeMinimum = 1024 bytes
      "4": 8192                  // StackSize = 8192 bytes
    },
    {
      "0": 2,                    // Id = 2
      "1": "BLE",                // Name = "BLE"
      "2": 4096,                 // StackFreeCurrent = 4096 bytes
      "3": 2048,                 // StackFreeMinimum = 2048 bytes
      "4": 8192                  // StackSize = 8192 bytes
    }
  ],
  "0x1": 65536,                  // CurrentHeapFree = 64 KB
  "0x2": 131072,                 // CurrentHeapUsed = 128 KB
  "0x3": 196608                  // CurrentHeapHighWatermark = 192 KB (requires WTRMRK Feature)
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Memory Leak Monitoring</summary>
    <div class="scenario-content">
      <p>Device becomes sluggish and behaves abnormally after long-running operation, suspected memory leak.</p>
      <ol>
        <li>Periodically read <code>CurrentHeapFree</code> and <code>CurrentHeapUsed</code> (e.g., hourly)</li>
        <li>Record to a time-series database or logs, plot memory trend graphs</li>
        <li>If <code>CurrentHeapFree</code> continuously decreases without recovering, a memory leak can be confirmed</li>
        <li>Combine with <code>ThreadMetrics</code> to investigate abnormal stack usage in specific threads</li>
        <li>After fixing via OTA, reset watermarks to observe the new version's performance</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Thread Stack Health Check</summary>
    <div class="scenario-content">
      <p>Device occasionally crashes and reboots, suspected insufficient thread stack space causing overflow.</p>
      <ol>
        <li>Read the <code>ThreadMetrics</code> list, focusing on each thread's <code>StackFreeMinimum</code></li>
        <li>Calculate stack utilization: <code>(StackSize - StackFreeMinimum) / StackSize</code></li>
        <li>Threads with utilization above 90% are at risk of stack overflow and need attention</li>
        <li>Compare the gap between <code>StackFreeCurrent</code> and <code>StackFreeMinimum</code> — a larger gap indicates more volatile stack usage</li>
        <li>Adjust the corresponding thread's stack allocation in firmware, then verify again after OTA</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Post-OTA Watermark Comparison</summary>
    <div class="scenario-content">
      <p>After firmware upgrade, need to assess whether the new version's memory performance has regressed. Requires WTRMRK Feature support.</p>
      <ol>
        <li>After OTA completion, device reboots and watermarks are automatically reset</li>
        <li>Let the device run normally for a period (recommended 24-48 hours, covering various usage scenarios)</li>
        <li>Read <code>CurrentHeapHighWatermark</code> and compare with the old version's records</li>
        <li>If the new version's watermark is significantly higher than the old version, the new code has introduced additional memory overhead</li>
        <li>You can also manually send <code>ResetWatermarks</code>, perform a specific operation, and precisely measure that operation's peak memory usage</li>
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
  'thread-network-diagnostics': {
    title: 'ThreadNetworkDiagnostics Cluster (0x0035)',
    description: 'Complete reference for the Matter ThreadNetworkDiagnostics Cluster (0x0035) — Thread Mesh network diagnostics, channel/topology/routing info, TX/RX packet counters, MLE/MAC counters, error statistics, network fault events, and enum quick reference.',
    prev: undefined,
    next: undefined,
    content: `<h1>ThreadNetworkDiagnostics Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0035</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    ThreadNetworkDiagnostics is the network diagnostics cluster for Thread devices, providing the complete operational status of the Thread Mesh network.
    It contains 60+ attributes covering network identification, topology routing, packet statistics, and error counts — the core tool for troubleshooting Thread device connectivity and analyzing network quality.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Use Cases</div>
    <p>
      This cluster is primarily for <strong>diagnostics and debugging</strong> and does not control device functionality. When Thread devices have unstable connections, high latency, or severe packet loss,
      reading this cluster can quickly locate the issue — poor signal (check RSSI/LQI), suboptimal routing (check RouteTable),
      or excessive link errors (check error counters).
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Quick Reference</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    ThreadNetworkDiagnostics declares which counter categories the device supports through <code>FeatureMap</code> (0xFFFC).
    Different features control the availability of different groups of counter attributes.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">Packet counters — cumulative statistics for various TX/RX packet types</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">Error counters — receive error (FCS/security/source address, etc.) and buffer overflow statistics</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MLECNT（MLECounts）</span>
        <span class="enum-desc">MLE counters — MLE layer event statistics for role changes, attach attempts, partition switches, etc.</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">MACCNT（MACCounts）</span>
        <span class="enum-desc">MAC counters — low-level link statistics for MAC layer retries, CCA failures, etc.</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Features and Attributes</div>
    <p>
      Basic network information (Channel, RoutingRole, NeighborTable, etc.) is supported by all Thread devices and requires no features.
      Counter attributes are grouped by feature — for example, only devices with PKTCNT enabled will report TxTotalCount and other packet statistics.
      Check <code>FeatureMap</code> before reading to avoid errors from unsupported attributes.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ThreadNetworkDiagnostics has only one command, used to reset all counters.
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
        <tr id="cmd-0x00">
          <td><code>0x00</code></td>
          <td>ResetCounts</td>
          <td>Reset all optional counters to zero</td>
          <td class="col-optional">ERRCNT or MACCNT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>ResetCounts — Reset Counters (0x00)</h3>
  <p>
    Resets all counters corresponding to enabled features (including OverrunCount) to zero on the device.
    No parameters required. After execution, all statistics restart from 0.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When diagnosing network issues, first call ResetCounts to clear counters, then observe counter growth over a period,
        to determine the current error rate and network quality. This avoids historical accumulated data from interfering with judgment.
      </p>
    </div>
  </details>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    ThreadNetworkDiagnostics has 60+ attributes, organized into the following groups by function.
    Basic network information is supported by all Thread devices; counter attributes are grouped by feature.
  </p>

  <!-- Attribute Navigation -->
  <nav class="quick-nav">
    <a href="#group-network">Network Identity</a>
    <span class="nav-sep">|</span>
    <a href="#group-topology">Topology & Routing</a>
    <span class="nav-sep">|</span>
    <a href="#group-dataset">Dataset Parameters</a>
    <span class="nav-sep">|</span>
    <a href="#group-tx">TX Counters</a>
    <span class="nav-sep">|</span>
    <a href="#group-rx">RX Counters</a>
    <span class="nav-sep">|</span>
    <a href="#group-rxerr">RX Error Counters</a>
    <span class="nav-sep">|</span>
    <a href="#group-mle">MLE Counters</a>
  </nav>

  <!-- ====== Network Identity ====== -->
  <h3 id="group-network">Network Identity (0x0000 - 0x0005)</h3>
  <p>Basic identity information for the Thread network, identifying which Thread network the device belongs to.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Channel<br/><span class="attr-cn">Channel</span></td>
          <td>uint16</td>
          <td>Current IEEE 802.15.4 channel number used by the Thread network. Thread uses channels 11-26 in the 2.4GHz band</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>RoutingRole<br/><span class="attr-cn">Routing Role</span></td>
          <td>RoutingRoleEnum / null</td>
          <td>Current role of the device in the Thread network (see <a href="#enum-routing-role">enum values</a>). null means not yet determined</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>NetworkName<br/><span class="attr-cn">Network Name</span></td>
          <td>string / null</td>
          <td>Thread network name, UTF-8 string up to 16 bytes</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>PanId<br/><span class="attr-cn">PAN ID</span></td>
          <td>uint16 / null</td>
          <td>IEEE 802.15.4 16-bit PAN identifier</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>ExtendedPanId<br/><span class="attr-cn">Extended PAN ID</span></td>
          <td>uint64 / null</td>
          <td>64-bit extended PAN identifier, used to distinguish different networks with the same PAN ID</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MeshLocalPrefix<br/><span class="attr-cn">Mesh Local Prefix</span></td>
          <td>octstr / null</td>
          <td>Thread Mesh local IPv6 prefix (/64 prefix within the fd00::/8 range)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Topology & Routing ====== -->
  <h3 id="group-topology">Topology & Routing (0x0007 - 0x000D)</h3>
  <p>Topology structure and routing information of the Thread Mesh network, including neighbor table, route table, and partition data.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>NeighborTable<br/><span class="attr-cn">Neighbor Table</span></td>
          <td>list&lt;NeighborTableStruct&gt;</td>
          <td>Detailed information list of direct communication neighbors (see <a href="#struct-neighbor">struct description</a>)</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>RouteTable<br/><span class="attr-cn">Route Table</span></td>
          <td>list&lt;RouteTableStruct&gt;</td>
          <td>Network route entry list (see <a href="#struct-route">struct description</a>)</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>PartitionId<br/><span class="attr-cn">Partition ID</span></td>
          <td>uint32 / null</td>
          <td>Identifier for the current Thread network partition. Different partitions have different IDs when the network splits</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>Weighting<br/><span class="attr-cn">Partition Weight</span></td>
          <td>uint16 / null</td>
          <td>Weight of the current partition; partitions with higher weight are preferentially kept during network merges</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>DataVersion<br/><span class="attr-cn">Data Version</span></td>
          <td>uint16 / null</td>
          <td>Version number of Thread network data, incremented with each network data change</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>StableDataVersion<br/><span class="attr-cn">Stable Data Version</span></td>
          <td>uint16 / null</td>
          <td>Version number of stable network data (excluding volatile data such as temporary routes)</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>LeaderRouterId<br/><span class="attr-cn">Leader Router ID</span></td>
          <td>uint8 / null</td>
          <td>Router ID of the current Thread network Leader</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- NeighborTable Structure -->
  <h4 id="struct-neighbor">NeighborTableStruct Structure</h4>
  <p>Each entry in the neighbor table describes a directly communicating neighbor node. Signal quality (LQI/RSSI) and error rate are key fields for assessing link health.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ExtAddress</td><td>uint64</td><td>Neighbor's 64-bit extended MAC address</td></tr>
        <tr><td>Age</td><td>uint32</td><td>Seconds since last communication</td></tr>
        <tr><td>Rloc16</td><td>uint16</td><td>Neighbor's 16-bit routing locator</td></tr>
        <tr><td>LinkFrameCounter</td><td>uint32</td><td>Link layer frame counter</td></tr>
        <tr><td>MleFrameCounter</td><td>uint32</td><td>MLE layer frame counter</td></tr>
        <tr><td>LQI</td><td>uint8</td><td>Link Quality Indicator (0-255, higher is better)</td></tr>
        <tr><td>AverageRssi</td><td>int8 / null</td><td>Average RSSI (dBm), typical range -100 to 0</td></tr>
        <tr><td>LastRssi</td><td>int8 / null</td><td>RSSI of the most recent received packet (dBm)</td></tr>
        <tr><td>FrameErrorRate</td><td>uint8</td><td>Frame error rate (0-100%, scaled to 0-255)</td></tr>
        <tr><td>MessageErrorRate</td><td>uint8</td><td>Message error rate (0-100%, scaled to 0-255)</td></tr>
        <tr><td>RxOnWhenIdle</td><td>bool</td><td>Whether receiver is on when idle (false = sleepy device)</td></tr>
        <tr><td>FullThreadDevice</td><td>bool</td><td>Whether it is a Full Thread Device (FTD)</td></tr>
        <tr><td>FullNetworkData</td><td>bool</td><td>Whether it receives full network data</td></tr>
        <tr><td>IsChild</td><td>bool</td><td>Whether this neighbor is a child of this node</td></tr>
      </tbody>
    </table>
  </div>

  <!-- RouteTable Structure -->
  <h4 id="struct-route">RouteTableStruct Structure</h4>
  <p>Each entry in the route table describes routing information to a target Router.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ExtAddress</td><td>uint64</td><td>Target router's 64-bit extended MAC address</td></tr>
        <tr><td>Rloc16</td><td>uint16</td><td>Target router's 16-bit routing locator</td></tr>
        <tr><td>RouterId</td><td>uint8</td><td>Router ID (0-62)</td></tr>
        <tr><td>NextHop</td><td>uint8</td><td>Next hop Router ID</td></tr>
        <tr><td>PathCost</td><td>uint8</td><td>Path cost to reach the target (lower is better)</td></tr>
        <tr><td>LQIIn</td><td>uint8</td><td>Inbound link quality indicator</td></tr>
        <tr><td>LQIOut</td><td>uint8</td><td>Outbound link quality indicator</td></tr>
        <tr><td>Age</td><td>uint8</td><td>Route entry age</td></tr>
        <tr><td>Allocated</td><td>bool</td><td>Whether this Router ID has been allocated</td></tr>
        <tr><td>LinkEstablished</td><td>bool</td><td>Whether a bidirectional link has been established with this router</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Dataset Parameters ====== -->
  <h3 id="group-dataset">Dataset Parameters (0x0006, 0x0038 - 0x003E)</h3>
  <p>Parameters related to the Thread Operational Dataset, including timestamps, security policy, and network fault information.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Required Feature</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>OverrunCount<br/><span class="attr-cn">Overrun Count</span></td>
          <td>uint64</td>
          <td class="col-required">ERRCNT</td>
          <td>Cumulative count of receive buffer overruns</td>
        </tr>
        <tr id="attr-0x0038">
          <td><code>0x0038</code></td>
          <td>ActiveTimestamp<br/><span class="attr-cn">Active Timestamp</span></td>
          <td>uint64 / null</td>
          <td class="col-optional">None</td>
          <td>Timestamp of the current active operational dataset</td>
        </tr>
        <tr id="attr-0x0039">
          <td><code>0x0039</code></td>
          <td>PendingTimestamp<br/><span class="attr-cn">Pending Timestamp</span></td>
          <td>uint64 / null</td>
          <td class="col-optional">None</td>
          <td>Timestamp of the pending operational dataset (for deferred network configuration updates)</td>
        </tr>
        <tr id="attr-0x003A">
          <td><code>0x003A</code></td>
          <td>Delay<br/><span class="attr-cn">Delay</span></td>
          <td>uint32 / null</td>
          <td class="col-optional">None</td>
          <td>Delay time before the pending dataset takes effect (milliseconds)</td>
        </tr>
        <tr id="attr-0x003B">
          <td><code>0x003B</code></td>
          <td>SecurityPolicy<br/><span class="attr-cn">Security Policy</span></td>
          <td>SecurityPolicy / null</td>
          <td class="col-optional">None</td>
          <td>Network security policy, including key rotation time and security flags</td>
        </tr>
        <tr id="attr-0x003C">
          <td><code>0x003C</code></td>
          <td>ChannelPage0Mask<br/><span class="attr-cn">Channel Mask</span></td>
          <td>octstr / null</td>
          <td class="col-optional">None</td>
          <td>Page 0 channel mask, identifying the set of channels the network is allowed to use</td>
        </tr>
        <tr id="attr-0x003D">
          <td><code>0x003D</code></td>
          <td>OperationalDatasetComponents<br/><span class="attr-cn">Dataset Components</span></td>
          <td>Struct / null</td>
          <td class="col-optional">None</td>
          <td>Identifies which components are present in the operational dataset (see <a href="#struct-dataset-components">struct description</a>)</td>
        </tr>
        <tr id="attr-0x003E">
          <td><code>0x003E</code></td>
          <td>ActiveNetworkFaults<br/><span class="attr-cn">Active Network Faults</span></td>
          <td>list&lt;NetworkFaultEnum&gt;</td>
          <td class="col-optional">None</td>
          <td>List of currently active network faults (see <a href="#enum-network-fault">enum values</a>), empty list means no faults</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SecurityPolicy Structure -->
  <h4>SecurityPolicy Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>RotationTime</td><td>uint16</td><td>Security key rotation period (hours)</td></tr>
        <tr><td>Flags</td><td>uint16</td><td>Security policy flags (controlling external Commissioner access, Native Commissioner, etc.)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- OperationalDatasetComponents Structure -->
  <h4 id="struct-dataset-components">OperationalDatasetComponents Structure</h4>
  <p>Each field is a bool indicating whether the corresponding component is present in the operational dataset.</p>
  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>Field</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ActiveTimestampPresent</td><td>Active timestamp</td></tr>
        <tr><td>PendingTimestampPresent</td><td>Pending timestamp</td></tr>
        <tr><td>MasterKeyPresent</td><td>Master Key (Network Key)</td></tr>
        <tr><td>NetworkNamePresent</td><td>Network name</td></tr>
        <tr><td>ExtendedPanIdPresent</td><td>Extended PAN ID</td></tr>
        <tr><td>MeshLocalPrefixPresent</td><td>Mesh local prefix</td></tr>
        <tr><td>DelayPresent</td><td>Delay timer</td></tr>
        <tr><td>PanIdPresent</td><td>PAN ID</td></tr>
        <tr><td>ChannelPresent</td><td>Channel number</td></tr>
        <tr><td>PskcPresent</td><td>PSKc (Commissioner key)</td></tr>
        <tr><td>SecurityPolicyPresent</td><td>Security policy</td></tr>
        <tr><td>ChannelMaskPresent</td><td>Channel mask</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== TX Counters ====== -->
  <h3 id="group-tx">TX Counters (0x000E - 0x001E) <span class="feature-tag">PKTCNT / MACCNT</span></h3>
  <p>Statistics for various types of transmitted packets. All fields are <code>uint32</code>, requiring <strong>PKTCNT</strong> or <strong>MACCNT</strong> Feature.</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x000E</code></td><td>TxTotalCount</td><td>Total transmitted packets</td></tr>
        <tr><td><code>0x000F</code></td><td>TxUnicastCount</td><td>Unicast packets transmitted</td></tr>
        <tr><td><code>0x0010</code></td><td>TxBroadcastCount</td><td>Broadcast packets transmitted</td></tr>
        <tr><td><code>0x0011</code></td><td>TxAckRequestedCount</td><td>Packets transmitted with ACK requested</td></tr>
        <tr><td><code>0x0012</code></td><td>TxAckedCount</td><td>Packets transmitted with ACK received</td></tr>
        <tr><td><code>0x0013</code></td><td>TxNoAckRequestedCount</td><td>Packets transmitted without ACK requested</td></tr>
        <tr><td><code>0x0014</code></td><td>TxDataCount</td><td>Data frames transmitted</td></tr>
        <tr><td><code>0x0015</code></td><td>TxDataPollCount</td><td>Data poll frames transmitted (sleepy device wakeup data pulls)</td></tr>
        <tr><td><code>0x0016</code></td><td>TxBeaconCount</td><td>Beacon frames transmitted</td></tr>
        <tr><td><code>0x0017</code></td><td>TxBeaconRequestCount</td><td>Beacon request frames transmitted</td></tr>
        <tr><td><code>0x0018</code></td><td>TxOtherCount</td><td>Other frame types transmitted</td></tr>
        <tr><td><code>0x0019</code></td><td>TxRetryCount</td><td>Transmission retry count (retry rate = TxRetryCount / TxTotalCount)</td></tr>
        <tr><td><code>0x001A</code></td><td>TxDirectMaxRetryExpiryCount</td><td>Packets that reached max retry count for direct transmission</td></tr>
        <tr><td><code>0x001B</code></td><td>TxIndirectMaxRetryExpiryCount</td><td>Packets that reached max retry count for indirect transmission</td></tr>
        <tr><td><code>0x001C</code></td><td>TxErrCcaCount</td><td>Transmission failures due to CCA (Clear Channel Assessment) failure</td></tr>
        <tr><td><code>0x001D</code></td><td>TxErrAbortCount</td><td>Transmission abort count</td></tr>
        <tr><td><code>0x001E</code></td><td>TxErrBusyChannelCount</td><td>Transmission failures due to busy channel</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Transmission Quality Assessment</div>
    <p>
      Watch the <code>TxRetryCount / TxTotalCount</code> ratio — a retry rate above 10% indicates poor link quality.
      <code>TxErrCcaCount</code> continuously increasing usually means channel congestion, may need to switch channels.
      <code>TxDirectMaxRetryExpiryCount</code> being non-zero indicates packet loss, need to check if the target node is online.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== RX Counters ====== -->
  <h3 id="group-rx">RX Counters (0x001F - 0x0029) <span class="feature-tag">PKTCNT / MACCNT</span></h3>
  <p>Statistics for various types of received packets. All fields are <code>uint32</code>, requiring <strong>PKTCNT</strong> or <strong>MACCNT</strong> Feature.</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x001F</code></td><td>RxTotalCount</td><td>Total received packets</td></tr>
        <tr><td><code>0x0020</code></td><td>RxUnicastCount</td><td>Unicast packets received</td></tr>
        <tr><td><code>0x0021</code></td><td>RxBroadcastCount</td><td>Broadcast packets received</td></tr>
        <tr><td><code>0x0022</code></td><td>RxDataCount</td><td>Data frames received</td></tr>
        <tr><td><code>0x0023</code></td><td>RxDataPollCount</td><td>Data poll frames received</td></tr>
        <tr><td><code>0x0024</code></td><td>RxBeaconCount</td><td>Beacon frames received</td></tr>
        <tr><td><code>0x0025</code></td><td>RxBeaconRequestCount</td><td>Beacon request frames received</td></tr>
        <tr><td><code>0x0026</code></td><td>RxOtherCount</td><td>Other frame types received</td></tr>
        <tr><td><code>0x0027</code></td><td>RxAddressFilteredCount</td><td>Received packets discarded by address filtering</td></tr>
        <tr><td><code>0x0028</code></td><td>RxDestAddrFilteredCount</td><td>Packets filtered due to destination address mismatch</td></tr>
        <tr><td><code>0x0029</code></td><td>RxDuplicatedCount</td><td>Duplicate received packets</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== RX Error Counters ====== -->
  <h3 id="group-rxerr">RX Error Counters (0x002A - 0x002F) <span class="feature-tag">ERRCNT</span></h3>
  <p>Statistics for various receive errors. All fields are <code>uint32</code>, requiring <strong>ERRCNT</strong> Feature.</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x002A</code></td><td>RxErrNoFrameCount</td><td>Received error packets with no frame content</td></tr>
        <tr><td><code>0x002B</code></td><td>RxErrUnknownNeighborCount</td><td>Packets from unknown neighbors (possibly network attack or new node)</td></tr>
        <tr><td><code>0x002C</code></td><td>RxErrInvalidSrcAddrCount</td><td>Packets with invalid source address</td></tr>
        <tr><td><code>0x002D</code></td><td>RxErrSecCount</td><td>Packets that failed security verification (decryption failure or MIC mismatch)</td></tr>
        <tr><td><code>0x002E</code></td><td>RxErrFcsCount</td><td>Packets with FCS (Frame Check Sequence) errors — typically caused by radio interference</td></tr>
        <tr><td><code>0x002F</code></td><td>RxErrOtherCount</td><td>Other types of receive errors</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Error Counter Troubleshooting Guide</div>
    <p>
      <strong>RxErrFcsCount continuously increasing</strong>: Severe radio interference, check for 2.4GHz WiFi or microwave interference sources, consider switching channels.<br/>
      <strong>RxErrSecCount non-zero</strong>: Security layer failure, possibly inconsistent network keys or unauthorized devices attempting communication.<br/>
      <strong>RxErrUnknownNeighborCount spike</strong>: New devices joining or nearby Thread network interference.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== MLE Counters ====== -->
  <h3 id="group-mle">MLE Counters (0x0030 - 0x0037) <span class="feature-tag">MLECNT</span></h3>
  <p>
    MLE (Mesh Link Establishment) layer event counts, reflecting device role changes and attach behavior in the Thread network.
    All fields are <code>uint16</code>, requiring <strong>MLECNT</strong> Feature.
  </p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x0030</code></td><td>DetachedRoleChangeCount</td><td>Times entered Detached state</td></tr>
        <tr><td><code>0x0031</code></td><td>ChildRoleChangeCount</td><td>Times changed to Child role</td></tr>
        <tr><td><code>0x0032</code></td><td>RouterRoleChangeCount</td><td>Times changed to Router role</td></tr>
        <tr><td><code>0x0033</code></td><td>LeaderRoleChangeCount</td><td>Times changed to Leader role</td></tr>
        <tr><td><code>0x0034</code></td><td>AttachAttemptCount</td><td>Network attach attempts</td></tr>
        <tr><td><code>0x0035</code></td><td>PartitionIdChangeCount</td><td>Partition ID change count (network split/merge)</td></tr>
        <tr><td><code>0x0036</code></td><td>BetterPartitionAttachAttemptCount</td><td>Attempts to attach to a better partition</td></tr>
        <tr><td><code>0x0037</code></td><td>ParentChangeCount</td><td>Parent node change count</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">MLE Counter Interpretation</div>
    <p>
      <strong>DetachedRoleChangeCount frequently increasing</strong>: Device frequently disconnects from the network, check signal strength or parent node stability.<br/>
      <strong>ParentChangeCount too high</strong>: Device frequently switches parent nodes, indicating unstable nearby routers or signal boundaries.<br/>
      <strong>PartitionIdChangeCount non-zero</strong>: The network has experienced splits and merges, usually caused by communication interruptions between some nodes.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <h3 id="enum-routing-role">RoutingRoleEnum — Routing Role</h3>
  <p>Describes the role the device serves in the Thread Mesh network.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified — role not determined</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Unassigned</span>
        <span class="enum-desc">Unassigned — device has joined but has not yet been assigned a role</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">SleepyEndDevice</span>
        <span class="enum-desc">Sleepy End Device — mostly in sleep mode, periodically wakes to pull data, power-efficient but high latency</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">EndDevice</span>
        <span class="enum-desc">End Device — always online but does not forward data, does not participate in routing</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">REED</span>
        <span class="enum-desc">Router-Eligible End Device — has routing capability but not currently active, can auto-upgrade to Router when the network needs it</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Router</span>
        <span class="enum-desc">Router — forwards data for other devices, maintains route table, backbone of the Mesh network</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Leader</span>
        <span class="enum-desc">Leader — manages Router ID allocation and network data distribution, exactly one per partition</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Thread Role Hierarchy</div>
    <p>
      Roles in a Thread network from lowest to highest: SleepyEndDevice → EndDevice → REED → Router → Leader.
      A Leader is essentially also a Router, but with additional management responsibilities. When a Leader goes offline, other Routers automatically elect a new Leader.
    </p>
  </div>

  <h3 id="enum-connection-status">ConnectionStatusEnum — Connection Status</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Connected</span>
        <span class="enum-desc">Connected to Thread network</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">Not connected to Thread network</span>
      </div>
    </div>
  </div>

  <h3 id="enum-network-fault">NetworkFaultEnum — Network Fault Type</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LinkDown</span>
        <span class="enum-desc">Link down — lost connection to Thread network</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">Hardware failure — radio module or Thread chip abnormality</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NetworkJammed</span>
        <span class="enum-desc">Network jammed — channel persistently occupied, unable to communicate normally</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>ThreadNetworkDiagnostics defines 2 events for notifying network connection status changes and fault occurrences.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Event</th><th>Priority</th><th>Field</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ConnectionStatus</strong></td>
          <td>Info</td>
          <td>ConnectionStatus: <a href="#enum-connection-status">ConnectionStatusEnum</a></td>
          <td>Triggered when Thread network connection status changes (connected or disconnected)</td>
        </tr>
        <tr>
          <td><strong>NetworkFaultChange</strong></td>
          <td>Info</td>
          <td>
            Current: list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;<br/>
            Previous: list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;
          </td>
          <td>Triggered when the network fault list changes, carrying fault lists before and after the change</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Event Subscription Use Cases</summary>
    <div class="scenario-content">
      <p>
        <strong>ConnectionStatus event</strong>: App can subscribe to this event for real-time awareness of Thread device online/offline status changes,
        such as displaying connection status icons in the device list or showing prompts when disconnected.
      </p>
      <p>
        <strong>NetworkFaultChange event</strong>: Used for monitoring network health. When the Current list changes from empty to non-empty, a fault has occurred;
        changing from non-empty to empty means the fault has recovered. Comparing Current and Previous determines whether it is a new fault or a recovery.
      </p>
    </div>
  </details>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Typical read results from a Thread Router device's ThreadNetworkDiagnostics Cluster (key attributes selected):</p>

  <pre><code>{
  // --- Network Identity ---
  "0x0000": 15,              // Channel = 15 (Thread channel)
  "0x0001": 5,               // RoutingRole = Router
  "0x0002": "MyThreadNet",   // NetworkName
  "0x0003": 4660,            // PanId = 0x1234
  "0x0004": "1111111122222222", // ExtendedPanId
  "0x0005": "fd11:2233:4455::/64", // MeshLocalPrefix

  // --- Topology Info ---
  "0x0009": 12345678,        // PartitionId (network partition identifier)
  "0x000A": 64,              // Weighting (partition weight)
  "0x000D": 42,              // LeaderRouterId (Leader router ID)

  // --- TX Counters (PKTCNT) ---
  "0x000E": 158432,          // TxTotalCount (total transmitted)
  "0x000F": 120050,          // TxUnicastCount (unicast transmitted)
  "0x0010": 38382,           // TxBroadcastCount (broadcast transmitted)
  "0x0019": 1024,            // TxRetryCount (retry count)

  // --- RX Counters (PKTCNT) ---
  "0x001F": 203841,          // RxTotalCount (total received)
  "0x0020": 185200,          // RxUnicastCount (unicast received)
  "0x0021": 18641,           // RxBroadcastCount (broadcast received)

  // --- Error Counters (ERRCNT) ---
  "0x0006": 0,               // OverrunCount (buffer overrun count)
  "0x002E": 3,               // RxErrFcsCount (FCS check errors)

  // --- Active Network Faults ---
  "0x003E": []               // ActiveNetworkFaults = empty (no current faults)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, you typically do not need to read all 60+ attributes at once. Read selectively based on diagnostic purpose:
      For connection issues: read RoutingRole + NeighborTable + ActiveNetworkFaults;
      For network quality: read various counters; for network config: read Channel + NetworkName + SecurityPolicy.
      Check <code>FeatureMap</code> before reading to avoid requesting unsupported counter attributes.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-connectivity">Scenario 1: Troubleshooting Thread Device Offline</h3>
  <ol>
    <li>Read <code>RoutingRole (0x0001)</code> — if <code>null</code> or <code>Unassigned</code>, the device has not successfully joined the network</li>
    <li>Read <code>ActiveNetworkFaults (0x003E)</code> — check for LinkDown or HardwareFailure</li>
    <li>Read <code>NeighborTable (0x0007)</code> — check LQI and RSSI in the neighbor list to assess signal quality</li>
    <li>Subscribe to <strong>ConnectionStatus</strong> events for real-time awareness of connection status changes</li>
  </ol>

  <h3 id="scenario-quality">Scenario 2: Assessing Network Communication Quality</h3>
  <ol>
    <li>Call <code>ResetCounts (0x00)</code> to reset all counters</li>
    <li>Wait for a period (e.g., 10 minutes), then read the counters</li>
    <li>Calculate retry rate: <code>TxRetryCount / TxTotalCount</code>, above 10% indicates poor link quality</li>
    <li>Check <code>RxErrFcsCount</code> — non-zero indicates radio interference</li>
    <li>Check <code>TxErrCcaCount</code> — continuous growth indicates channel congestion, consider switching channels</li>
  </ol>

  <h3 id="scenario-topology">Scenario 3: Understanding Network Topology</h3>
  <ol>
    <li>Read <code>RoutingRole (0x0001)</code> — confirm the device's network role</li>
    <li>Read <code>LeaderRouterId (0x000D)</code> — find the current Leader</li>
    <li>Read <code>NeighborTable (0x0007)</code> — get neighbor node list and link quality</li>
    <li>Read <code>RouteTable (0x0008)</code> — view routing topology and path costs</li>
    <li>Read <code>PartitionId (0x0009)</code> — confirm if all devices are in the same partition</li>
  </ol>

  <h3 id="scenario-stability">Scenario 4: Monitoring Network Stability</h3>
  <ol>
    <li>Read MLE counters (requires MLECNT Feature):
      <ul>
        <li><code>DetachedRoleChangeCount (0x0030)</code> — frequent detachment indicates unstable connection</li>
        <li><code>ParentChangeCount (0x0037)</code> — frequent parent changes indicate unstable nearby routers</li>
        <li><code>PartitionIdChangeCount (0x0035)</code> — non-zero means the network has split</li>
      </ul>
    </li>
    <li>Subscribe to <strong>NetworkFaultChange</strong> events for timely awareness of fault occurrences and recoveries</li>
    <li>Periodically compare counter increments to establish a network quality baseline</li>
  </ol>

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

  .dark .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  .dark .col-optional {
    color: #4ade80;
  }

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .dark .attr-cn {
    color: #9ca3af;
  }

  .feature-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    margin-left: 0.5rem;
    border-radius: 9999px;
    background: #dbeafe;
    color: #1d4ed8;
    vertical-align: middle;
  }

  .dark .feature-tag {
    background: #1e3a5f;
    color: #93c5fd;
  }

  .table-compact table {
    font-size: 0.875rem;
  }

  .table-compact td,
  .table-compact th {
    padding: 0.375rem 0.75rem;
  }
</style>`,
  },
  'wifi-network-diagnostics': {
    title: 'WiFiNetworkDiagnostics Cluster (0x0036)',
    description: 'Complete reference for the Matter WiFiNetworkDiagnostics Cluster (0x0036) — WiFi connection health diagnostics, RSSI signal strength, packet/error counts, disconnection and association failure events, ResetCounts command, and complete attribute and enum quick reference.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>WiFiNetworkDiagnostics Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0036</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root / Network Endpoint)
  </p>
  <p>
    WiFiNetworkDiagnostics provides real-time health information for the device's WiFi connection —
    including signal strength (RSSI), current access point (BSSID), security type, channel, WiFi protocol version,
    as well as optional packet counts and error statistics.
    It is the first stop for troubleshooting network issues like "offline," "slow response," or "unstable" devices.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature Dependencies</div>
    <p>
      This cluster defines two optional features:
      <strong>PKTCNT</strong> (Packet Counts) and <strong>ERRCNT</strong> (Error Counts).
      When enabled, they provide packet TX/RX statistics and overrun/association failure counts respectively.
      Basic connection info (BSSID, RSSI, channel, etc.) can be read without any feature.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Quick Reference</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>Declares which diagnostic capabilities the device supports through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">Packet counts — when enabled, provides Beacon, multicast, and unicast TX/RX packet statistics</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">Error counts — when enabled, provides OverrunCount (buffer overflow) statistics</span>
      </div>
    </div>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    WiFiNetworkDiagnostics Cluster has only 1 command, used to reset statistical counters.
    This command is only meaningful when the device has PKTCNT or ERRCNT features enabled.
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
          <td>ResetCounts</td>
          <td>Reset packet and error counters</td>
          <td class="col-required">PKTCNT | ERRCNT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCounts — Reset Counters (0x00)</h3>
  <p>
    Resets all packet counters and error counters maintained by the device to zero.
    No parameters required. After execution, <code>BeaconLostCount</code>, <code>BeaconRxCount</code>,
    all TX/RX packet counts, <code>OverrunCount</code>, and other statistics are reset to <code>0</code>.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When troubleshooting network issues, first call ResetCounts to clear all counters,
        then observe counter growth over a period to determine packet loss rate and error frequency.
        Also useful after moving a device to a new location, starting a new round of network quality baseline measurement.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    WiFiNetworkDiagnostics Cluster has 14 application attributes, organized into three groups by function.
    Click an attribute ID to jump to its detailed description.
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
        <!-- Connection Info -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>BSSID</td>
          <td>octstr / null</td>
          <td><a href="#group-connection">Connection Info</a></td>
          <td>MAC address of the currently associated AP</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SecurityType</td>
          <td>enum / null</td>
          <td><a href="#group-connection">Connection Info</a></td>
          <td>WiFi security authentication type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>WiFiVersion</td>
          <td>enum / null</td>
          <td><a href="#group-connection">Connection Info</a></td>
          <td>Current 802.11 protocol version in use</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>ChannelNumber</td>
          <td>uint16 / null</td>
          <td><a href="#group-connection">Connection Info</a></td>
          <td>Current WiFi channel number in use</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>RSSI</td>
          <td>int8 / null</td>
          <td><a href="#group-connection">Connection Info</a></td>
          <td>Received signal strength (dBm)</td>
        </tr>
        <!-- Packet Counts -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>BeaconLostCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Lost Beacon frame count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>BeaconRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Successfully received Beacon frame count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>PacketMulticastRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Multicast packets received</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>PacketMulticastTxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Multicast packets transmitted</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>PacketUnicastRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Unicast packets received</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>PacketUnicastTxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">Packet Counts</a></td>
          <td>Unicast packets transmitted</td>
        </tr>
        <!-- Errors & Rate -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>AssociationFailureCause</td>
          <td>enum</td>
          <td><a href="#group-error">Errors & Rate</a></td>
          <td>Cause of the most recent association failure</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>OverrunCount</td>
          <td>uint64 / null</td>
          <td><a href="#group-error">Errors & Rate</a></td>
          <td>Buffer overrun count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>CurrentMaxRate</td>
          <td>uint64 / null</td>
          <td><a href="#group-error">Errors & Rate</a></td>
          <td>Current maximum transmission rate (bps)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Connection Info (0x0000 ~ 0x0004) ====== -->
  <h3 id="group-connection">Connection Info (0x0000 ~ 0x0004)</h3>
  <p>
    Describes basic information about the device's current WiFi connection. These are base attributes and do not require any Feature.
    When the device is not connected to WiFi, all Nullable attributes return <code>null</code>.
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
          <td>BSSID</td>
          <td>octstr / null</td>
          <td>MAC address of the currently associated access point (AP), 6 bytes. <code>null</code> when not connected. Useful for determining which AP the device is connected to (especially useful in multi-AP environments)</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SecurityType (Security Type)</td>
          <td>SecurityTypeEnum / null</td>
          <td>Security authentication method used by the current WiFi connection. <code>null</code> when not connected. See <a href="#enum-security-type">SecurityTypeEnum</a> below</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>WiFiVersion (WiFi Version)</td>
          <td>WiFiVersionEnum / null</td>
          <td>Current 802.11 protocol version used by the connection. <code>null</code> when not connected. See <a href="#enum-wifi-version">WiFiVersionEnum</a> below</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>ChannelNumber (Channel Number)</td>
          <td>uint16 / null</td>
          <td>Current WiFi channel number in use. 2.4 GHz is typically 1-13, 5 GHz is 36-165. <code>null</code> when not connected</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>RSSI (Signal Strength)</td>
          <td>int8 / null</td>
          <td>Received Signal Strength Indicator in dBm, range -120 to 0. Higher values (closer to 0) mean stronger signal. <code>null</code> when not connected</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">RSSI Signal Strength Reference</div>
    <p>
      <strong>-30 to -50 dBm</strong>: Excellent, device is right next to the router<br>
      <strong>-50 to -60 dBm</strong>: Good, no issues for daily use<br>
      <strong>-60 to -70 dBm</strong>: Fair, occasional latency possible<br>
      <strong>-70 to -80 dBm</strong>: Poor, recommend moving closer to router or adding a range extender<br>
      <strong>Below -80 dBm</strong>: Very poor, device may frequently drop offline
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Packet Counts (0x0005 ~ 0x000A) ====== -->
  <h3 id="group-pktcnt">Packet Counts (0x0005 ~ 0x000A)</h3>
  <p>
    Detailed TX/RX packet statistics for analyzing network quality.
    This group of attributes requires the device to have the <strong>PKTCNT (PacketCounts)</strong> feature enabled.
    All counters can be reset to zero via the <code>ResetCounts</code> command.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Beacon Loss Ratio</div>
    <p>
      <code>BeaconLostCount / (BeaconLostCount + BeaconRxCount)</code> is a key indicator of WiFi stability.
      Under normal conditions, Beacon loss rate should be below 1%. Above 5% indicates very unstable signal — check the distance and obstructions between the device and router.
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
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>BeaconLostCount</td>
          <td>uint32 / null</td>
          <td>Number of Beacon frames the device expected but did not receive since last reset. Continuously growing values indicate unstable signal. <strong>Requires PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>BeaconRxCount</td>
          <td>uint32 / null</td>
          <td>Number of Beacon frames successfully received since last reset. <strong>Requires PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>PacketMulticastRxCount</td>
          <td>uint32 / null</td>
          <td>Multicast packets received. <strong>Requires PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>PacketMulticastTxCount</td>
          <td>uint32 / null</td>
          <td>Multicast packets transmitted. <strong>Requires PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>PacketUnicastRxCount</td>
          <td>uint32 / null</td>
          <td>Unicast packets received. Unicast is one-to-one communication between device and router, the primary traffic. <strong>Requires PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>PacketUnicastTxCount</td>
          <td>uint32 / null</td>
          <td>Unicast packets transmitted. <strong>Requires PKTCNT</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Errors & Rate (0x000B ~ 0x000D) ====== -->
  <h3 id="group-error">Errors & Rate (0x000B ~ 0x000D)</h3>
  <p>Association failure cause, buffer overrun statistics, and current connection maximum transmission rate.</p>

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
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>AssociationFailureCause</td>
          <td>AssociationFailureCauseEnum</td>
          <td>Cause of the most recent WiFi association failure. See <a href="#enum-assoc-failure">AssociationFailureCauseEnum</a> below</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>OverrunCount</td>
          <td>uint64 / null</td>
          <td>Packets dropped by the receiver due to full buffers. Continuous growth indicates the device's processing capacity cannot keep up with network traffic. <strong>Requires ERRCNT</strong></td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>CurrentMaxRate</td>
          <td>uint64 / null</td>
          <td>Maximum transmission rate negotiated for the current connection, in bps (bits per second). For example, 866700000 = 866.7 Mbps (typical 802.11ac rate). <code>null</code> when not connected</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <h3 id="enum-security-type">SecurityTypeEnum (Security Type)</h3>
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
        <span class="enum-name">None</span>
        <span class="enum-desc">No encryption (open network)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">WEP</span>
        <span class="enum-desc">WEP encryption (deprecated, highly insecure)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">WPA</span>
        <span class="enum-desc">WPA-Personal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">WPA2</span>
        <span class="enum-desc">WPA2-Personal (most common)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">WPA3</span>
        <span class="enum-desc">WPA3-Personal (latest standard)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-wifi-version">WiFiVersionEnum (WiFi Version)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">a</span>
        <span class="enum-desc">802.11a（5 GHz，54 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">b</span>
        <span class="enum-desc">802.11b（2.4 GHz，11 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">g</span>
        <span class="enum-desc">802.11g（2.4 GHz，54 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">n</span>
        <span class="enum-desc">802.11n / WiFi 4 (dual-band, 600 Mbps)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">ac</span>
        <span class="enum-desc">802.11ac / WiFi 5（5 GHz，6.9 Gbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ax</span>
        <span class="enum-desc">802.11ax / WiFi 6 (dual-band, 9.6 Gbps)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ah</span>
        <span class="enum-desc">802.11ah / WiFi HaLow (Sub-1GHz, IoT-specific)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-assoc-failure">AssociationFailureCauseEnum (Association Failure Cause)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown cause</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AssociationFailed</span>
        <span class="enum-desc">Association failed — AP rejected the device's association request</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AuthenticationFailed</span>
        <span class="enum-desc">Authentication failed — typically incorrect password</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SsidNotFound</span>
        <span class="enum-desc">SSID not found — target network is out of range or has been turned off</span>
      </div>
    </div>
  </div>

  <h3 id="enum-conn-status">ConnectionStatusEnum (Connection Status)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Connected</span>
        <span class="enum-desc">Connected</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">Not connected</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    WiFiNetworkDiagnostics defines 3 events, covering disconnection, association failure, and connection status change.
    Subscribing to these events is the recommended way to monitor device network health in real time.
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>Disconnection</td>
          <td>Info</td>
          <td>Triggered when the device disconnects from the AP</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>AssociationFailure</td>
          <td>Info</td>
          <td>Triggered when WiFi association or authentication fails</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>ConnectionStatus</td>
          <td>Info</td>
          <td>Triggered when the connection status changes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">Disconnection — Disconnection Event (0x00)</h3>
  <p>
    Triggered when the device disconnects from the current access point. The event data carries the 802.11 standard disconnection reason code (ReasonCode),
    which can be used to diagnose the specific cause of disconnection.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ReasonCode</td>
          <td><code>0x00</code></td>
          <td>uint16</td>
          <td>802.11 disconnection reason code. Common values: 1 = Unspecified, 4 = Disassociated due to inactivity, 8 = Deauthenticated because sending station is leaving</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x01">AssociationFailure — Association Failure Event (0x01)</h3>
  <p>
    Triggered when the device attempts to connect to WiFi but association or authentication fails.
    Carries failure cause and 802.11 status code, a key information source for troubleshooting "device can't connect to WiFi" issues.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AssociationFailureCause</td>
          <td><code>0x00</code></td>
          <td>AssociationFailureCauseEnum</td>
          <td>Failure cause category, see <a href="#enum-assoc-failure">enum</a> above</td>
        </tr>
        <tr>
          <td>Status</td>
          <td><code>0x01</code></td>
          <td>uint16</td>
          <td>802.11 association/authentication status code, providing more granular failure information</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x02">ConnectionStatus — Connection Status Change Event (0x02)</h3>
  <p>
    Triggered when the device's WiFi connection status changes (connected or disconnected).
    Compared to the Disconnection event, this event covers both "connected" and "disconnected" directions.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ConnectionStatus</td>
          <td><code>0x00</code></td>
          <td>ConnectionStatusEnum</td>
          <td>New connection status. See <a href="#enum-conn-status">ConnectionStatusEnum</a> above</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Complete read results from a WiFi-connected Matter device (with PKTCNT + ERRCNT support) for the WiFiNetworkDiagnostics Cluster:</p>

  <pre><code>{
  // --- Connection Info ---
  "0x0000": "A4:CF:12:XX:XX:XX",  // BSSID (currently associated AP MAC address)
  "0x0001": 4,                     // SecurityType = WPA2
  "0x0002": 4,                     // WiFiVersion = ac (802.11ac)
  "0x0003": 6,                     // ChannelNumber = 6
  "0x0004": -45,                   // RSSI = -45 dBm (good signal)

  // --- Packet Counts (requires PKTCNT feature) ---
  "0x0005": 12,                    // BeaconLostCount = 12
  "0x0006": 98432,                 // BeaconRxCount = 98432
  "0x0007": 1024,                  // PacketMulticastRxCount
  "0x0008": 256,                   // PacketMulticastTxCount
  "0x0009": 502310,                // PacketUnicastRxCount
  "0x000A": 389120,                // PacketUnicastTxCount

  // --- Error Counts (requires ERRCNT feature) ---
  "0x000B": 0,                     // AssociationFailureCause = Unknown
  "0x000C": 0,                     // OverrunCount = 0

  // --- Other ---
  "0x000D": 866700000              // CurrentMaxRate = 866.7 Mbps
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Not all devices support PKTCNT and ERRCNT features. Check <code>FeatureMap (0xFFFC)</code> before reading.
      For simple scenarios that only need to determine "is the device WiFi working,"
      reading just <code>RSSI (0x0004)</code> and <code>SecurityType (0x0001)</code> is sufficient.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: WiFi Health Monitoring</summary>
    <div class="scenario-content">
      <p>Continuously monitor the device's WiFi connection quality, alerting before issues occur.</p>
      <ol>
        <li>Subscribe to <code>RSSI (0x0004)</code> attribute changes with a reasonable reporting interval (e.g., every 60 seconds or when change exceeds 5 dBm)</li>
        <li>Subscribe to <code>Disconnection</code> and <code>ConnectionStatus</code> events for real-time disconnection awareness</li>
        <li>Periodically read <code>BeaconLostCount</code> and <code>BeaconRxCount</code> to calculate Beacon loss rate</li>
        <li>When RSSI is below -75 dBm or Beacon loss rate exceeds 5%, the app should prompt the user "Device signal is weak, recommend moving closer to router"</li>
        <li>Combined with <code>ChannelNumber</code> info, advise the user whether to switch router channels to avoid congestion</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Signal Strength Troubleshooting</summary>
    <div class="scenario-content">
      <p>User reports device "responds slowly" or "frequently goes offline," locate the issue through diagnostic data.</p>
      <ol>
        <li>Read <code>RSSI (0x0004)</code> to determine if signal strength is sufficient</li>
        <li>Read <code>WiFiVersion (0x0002)</code> to confirm the protocol version in use (still using 802.11b/g indicates limited device capability)</li>
        <li>Read <code>CurrentMaxRate (0x000D)</code> to confirm if the negotiated rate is normal</li>
        <li>Call <code>ResetCounts (0x00)</code> to reset counters, wait 5-10 minutes, then read packet counts</li>
        <li>Calculate packet loss rate: if <code>BeaconLostCount</code> grows rapidly, the problem is the wireless environment (distance/interference); if <code>OverrunCount</code> grows rapidly, the problem is device processing capacity</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Roaming Analysis (Multi-AP Environment)</summary>
    <div class="scenario-content">
      <p>In Mesh or multi-AP networks, track device switching behavior between different access points.</p>
      <ol>
        <li>Periodically read <code>BSSID (0x0000)</code> to record changes in the AP MAC address the device connects to</li>
        <li>Subscribe to <code>Disconnection</code> and <code>ConnectionStatus</code> events to capture each roaming event</li>
        <li>Each time BSSID changes, simultaneously read <code>RSSI</code> and <code>ChannelNumber</code> to record the new AP's signal quality</li>
        <li>Analyze roaming frequency: frequent roaming (e.g., switching every minute) indicates the device is at the signal boundary between two APs, with neither signal being strong</li>
        <li>If <code>AssociationFailure</code> events accompany roaming, the handoff process is not smooth and AP configuration may need adjustment</li>
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

  .dark .col-required {
    color: #f87171;
  }

  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  .dark .col-optional {
    color: #4ade80;
  }
</style>`,
  },
  'ethernet-network-diagnostics': {
    title: 'EthernetNetworkDiagnostics Cluster (0x0037)',
    description: 'Complete reference for the Matter EthernetNetworkDiagnostics Cluster (0x0037) — PHYRate / FullDuplex / PacketRxCount / TxErrCount attributes, ResetCounts command, PKTCNT / ERRCNT Feature bitmap quick reference for monitoring Ethernet connection health.',
    prev: undefined,
    next: undefined,
    content: `<h1>EthernetNetworkDiagnostics Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0037</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Node)
  </p>
  <p>
    EthernetNetworkDiagnostics provides Ethernet interface operational status and statistics — link rate, duplex mode, TX/RX packet counts, error counts, etc.
    This cluster has only <strong>1 command</strong> and <strong>9 attributes</strong>, with a simple structure primarily for network health monitoring and troubleshooting.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      Hub or bridge connected via Ethernet, want to confirm the link is working? Just read PHYRate and CarrierDetect.
      Device network unstable with severe packet loss? Check TxErrCount and CollisionCount to locate the issue.
      Need to restart statistics? Send a ResetCounts command to reset all counters.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>EthernetNetworkDiagnostics Declares which diagnostic capabilities the device supports through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">Supports TX/RX packet counts — enables PacketRxCount, PacketTxCount attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">Supports error counts — enables TxErrCount, CollisionCount, OverrunCount attributes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Features and Attributes</div>
    <p>
      Not all devices support all attributes. PacketRxCount / PacketTxCount require the PKTCNT feature,
      TxErrCount / CollisionCount / OverrunCount require the ERRCNT feature.
      Check <code>FeatureMap (0xFFFC)</code> before reading to confirm which features the device supports.
    </p>
  </div>

  <!-- ====== Attributes Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Click an attribute ID to jump to detailed description. Attributes marked with a Feature only exist when the device supports the corresponding feature.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>PHYRate</td>
          <td>enum8, nullable</td>
          <td>—</td>
          <td>Physical layer link rate</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>FullDuplex</td>
          <td>bool, nullable</td>
          <td>—</td>
          <td>Whether in full-duplex mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>PacketRxCount</td>
          <td>uint64</td>
          <td>PKTCNT</td>
          <td>Total packets received</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PacketTxCount</td>
          <td>uint64</td>
          <td>PKTCNT</td>
          <td>Total packets transmitted</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>TxErrCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>Transmission error count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>CollisionCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>Collision count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>OverrunCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>Buffer overrun count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>CarrierDetect</td>
          <td>bool, nullable</td>
          <td>—</td>
          <td>Carrier detect status</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>TimeSinceReset</td>
          <td>uint64</td>
          <td>—</td>
          <td>Seconds since last counter reset</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">PHYRate (Physical Layer Rate)</h3>
  <p>
    Read-only attribute indicating the physical layer link rate negotiated by the current Ethernet interface. <code>null</code> indicates unknown rate or interface not connected.
  </p>

  <h4>PHYRateEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Rate10M</span>
        <span class="enum-desc">10 Mbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Rate100M</span>
        <span class="enum-desc">100 Mbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Rate1G</span>
        <span class="enum-desc">1 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Rate25G</span>
        <span class="enum-desc">2.5 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rate5G</span>
        <span class="enum-desc">5 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Rate10G</span>
        <span class="enum-desc">10 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Rate40G</span>
        <span class="enum-desc">40 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Rate100G</span>
        <span class="enum-desc">100 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Rate200G</span>
        <span class="enum-desc">200 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Rate400G</span>
        <span class="enum-desc">400 Gbps</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">FullDuplex (Full Duplex Mode)</h3>
  <p>
    Read-only attribute indicating whether the current Ethernet link operates in full-duplex mode. <code>true</code> for full-duplex, <code>false</code> for half-duplex,
    <code>null</code> means unable to determine. Modern Ethernet devices are almost always full-duplex; half-duplex usually indicates a negotiation anomaly.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">PacketRxCount (Received Packet Count)</h3>
  <p>
    Read-only attribute, total packets received since last reset. Requires device <strong>PKTCNT</strong> feature support.
    This counter resets to zero upon calling the ResetCounts command or device reboot.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">PacketTxCount (Transmitted Packet Count)</h3>
  <p>
    Read-only attribute, total packets transmitted since last reset. Requires device <strong>PKTCNT</strong> feature support.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x04">TxErrCount (Transmission Error Count)</h3>
  <p>
    Read-only attribute, number of transmission failures since last reset. Requires device <strong>ERRCNT</strong> feature support.
    Continuous growth usually indicates poor cable quality or switch port issues.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x05">CollisionCount (Collision Count)</h3>
  <p>
    Read-only attribute, collision count since last reset. Requires device <strong>ERRCNT</strong> feature support.
    On a full-duplex link, this value should always be 0; if it continues to grow, the link may have degraded to half-duplex.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x06">OverrunCount (Overrun Count)</h3>
  <p>
    Read-only attribute, number of receive buffer overruns since last reset. Requires device <strong>ERRCNT</strong> feature support.
    Overruns mean the device cannot process received data in time, possibly due to high device load or excessive network traffic.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x07">CarrierDetect (Carrier Detect)</h3>
  <p>
    Read-only attribute indicating whether the Ethernet interface detects a carrier signal. <code>true</code> means the cable is connected and the remote device is working,
    <code>false</code> means the cable is disconnected or the remote end is unresponsive, <code>null</code> means unable to determine.
    This is the most direct indicator of physical connection status.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x08">TimeSinceReset (Time Since Counter Reset)</h3>
  <p>
    Read-only attribute, seconds elapsed since the last counter reset (ResetCounts command or device reboot).
    Combined with packet counts and error counts, you can calculate average per-second TX/RX rates and error rates.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    EthernetNetworkDiagnostics has only one command. It is only meaningful when the device supports PKTCNT or ERRCNT features.
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
          <td>ResetCounts</td>
          <td>Reset all counters to zero</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCounts — Reset Counters (0x00)</h3>
  <p>
    Resets PacketRxCount, PacketTxCount, TxErrCount, CollisionCount, and OverrunCount all to zero,
    while TimeSinceReset also resets to 0 and restarts counting. No parameters needed, just send directly.
  </p>
  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0037",
      "commandId": "0x00"       // ResetCounts
    },
    "commandFields": {}
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading an Ethernet Hub device's EthernetNetworkDiagnostics Cluster attributes:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": 2,           // PHYRate = Rate1G (Gigabit Ethernet)
  "0x1": true,        // FullDuplex = true (full-duplex)
  "0x2": 1048576,     // PacketRxCount = 1048576 (approximately 1 million packets received)
  "0x3": 524288,      // PacketTxCount = 524288 (approximately 500K packets transmitted)
  "0x4": 3,           // TxErrCount = 3 (3 transmission errors)
  "0x5": 0,           // CollisionCount = 0 (no collisions)
  "0x6": 0,           // OverrunCount = 0 (no overruns)
  "0x7": true,        // CarrierDetect = true (carrier detect normal)
  "0x8": 86400        // TimeSinceReset = 86400 (24 hours since last reset)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      PHYRate and FullDuplex reflect link negotiation results, do not change frequently, and are suitable for one-time display on the device detail page.
      Packet counts and error counts are cumulative values, suitable for periodic polling or subscription, used for trend graphs or triggering alerts.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Link Health Check</summary>
    <div class="scenario-content">
      <p>App device detail page displays Ethernet connection status, helping users quickly determine if the link is healthy.</p>
      <ol>
        <li>Read <code>CarrierDetect (0x07)</code> to confirm physical connection is normal (<code>true</code>)</li>
        <li>Read <code>PHYRate (0x00)</code> and <code>FullDuplex (0x01)</code> to display link rate and duplex mode</li>
        <li>If PHYRate is <code>null</code> or CarrierDetect is <code>false</code>, prompt user to check cable connection</li>
        <li>If FullDuplex is <code>false</code>, indicate link degraded to half-duplex, recommend checking switch port configuration</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Network Fault Troubleshooting</summary>
    <div class="scenario-content">
      <p>When device is slow to respond or communication is unstable, locate network layer issues through counters.</p>
      <ol>
        <li>First check <code>FeatureMap (0xFFFC)</code> to confirm device supports PKTCNT and ERRCNT</li>
        <li>Send <code>ResetCounts (0x00)</code> to reset all counters</li>
        <li>After waiting a period, read TxErrCount, CollisionCount, OverrunCount</li>
        <li>Use <code>TimeSinceReset (0x08)</code> to calculate error rate: <code>TxErrCount / TimeSinceReset</code></li>
        <li>Persistently high error rate → check cable quality and switch port; CollisionCount non-zero → check duplex mode configuration</li>
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
  },
};
