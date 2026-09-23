import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'network-commissioning': {
    title: 'NetworkCommissioning Cluster (0x0031)',
    description: 'Complete reference for Matter NetworkCommissioning Cluster (0x0031) — Wi-Fi/Thread/Ethernet network scanning, credential management, connection control commands, NetworkCommissioningStatusEnum enum quick reference, and commissioning flow examples.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>NetworkCommissioning Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0031</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    NetworkCommissioning is the most critical Cluster in the Matter device commissioning process, responsible for managing device network credentials — including Wi-Fi passwords, Thread network parameters, or Ethernet configurations.
    The Commissioner (phone App) uses this Cluster to scan available networks around the device, write network credentials, and instruct the device to connect to a specified network.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      This Cluster is the <strong>infrastructure of the commissioning process</strong>. Nearly all Matter devices (except pure Ethernet devices) need it to complete network access.
      It does not control the device's business functions — it makes the device "go online." Only after network configuration is complete do remote operations from other Clusters become meaningful.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Features</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enums & Structs</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">Standard Example</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Features ====== -->
  <h2 id="features">Features (Feature Map)</h2>
  <p>
    The NetworkCommissioning Cluster uses the Feature Map to indicate which network interface types the device supports.
    A device <strong>must support exactly one</strong> of the following three features (mutually exclusive):
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">WI — WiFiNetworkInterface</span>
        <span class="enum-desc">Device supports Wi-Fi network interface, can scan Wi-Fi networks and store SSID + password</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TH — ThreadNetworkInterface</span>
        <span class="enum-desc">Device supports Thread network interface, can scan Thread networks and store Operational Dataset</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">ET — EthernetNetworkInterface</span>
        <span class="enum-desc">Device uses Ethernet connection, no scanning or credential configuration needed (plug and play)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Ethernet devices' NetworkCommissioning Cluster has only read-only attributes and does not support any commands (no scanning, adding networks, etc.).
      Checking the Feature Map is the first step in developing a commissioning flow — it determines which commands to call subsequently.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    NetworkCommissioning commands fall into two categories: <strong>Client → Server</strong> (requests from the Commissioner to the device) and
    <strong>Server → Client</strong> (responses from the device). Commissioning operations follow a request-response pattern, where each request command has a corresponding response command.
  </p>

  <h3>Client → Server (Request Commands)</h3>
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
          <td>ScanNetworks</td>
          <td>Scan available nearby networks</td>
          <td>WI or TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>AddOrUpdateWiFiNetwork</td>
          <td>Add or update Wi-Fi network credentials</td>
          <td>WI</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>AddOrUpdateThreadNetwork</td>
          <td>Add or update Thread network credentials</td>
          <td>TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>RemoveNetwork</td>
          <td>Remove stored network credentials</td>
          <td>WI or TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>ConnectNetwork</td>
          <td>Instruct the device to connect to a specified network</td>
          <td>WI or TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>ReorderNetwork</td>
          <td>Adjust network priority order</td>
          <td>WI or TH</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Server → Client (Response Commands)</h3>
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
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ScanNetworksResponse</td>
          <td>Return scan result list</td>
          <td>ScanNetworks</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>NetworkConfigResponse</td>
          <td>Return network configuration operation result</td>
          <td>Add / Remove / Reorder</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>ConnectNetworkResponse</td>
          <td>Return network connection result</td>
          <td>ConnectNetwork</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ScanNetworks — Scan Networks (0x00)</h3>
  <p>
    Instructs the device to scan for available Wi-Fi or Thread networks nearby. This is typically the first step in the commissioning flow — showing users the list of networks they can connect to.
    The device returns <a href="#cmd-0x01">ScanNetworksResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SSID</td>
          <td>OctetString / Nullable</td>
          <td>No</td>
          <td><code>null</code> = scan all networks; specified value = scan only matching SSID (Wi-Fi only)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker, used by the Commissioner to track whether commissioning steps are executed as expected</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>After the Commissioner (App) initiates a scan, the device will complete scanning and return results within <code>ScanMaxTimeSeconds</code>. The device may be unable to process other commands during scanning. Wi-Fi devices return a <a href="#struct-wifi-scan">WiFiInterfaceScanResultStruct</a> list, and Thread devices return a <a href="#struct-thread-scan">ThreadInterfaceScanResultStruct</a> list.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ScanNetworksResponse — Scan Results (0x01)</h3>
  <p>
    Response returned after the device completes a network scan, containing the list of discovered networks. Wi-Fi and Thread devices return different structures.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>Operation result status code</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information (e.g., error description)</td>
        </tr>
        <tr>
          <td>WiFiScanResults</td>
          <td><a href="#struct-wifi-scan">WiFiInterfaceScanResultStruct</a>[]</td>
          <td>Wi-Fi scan result list (WI feature only)</td>
        </tr>
        <tr>
          <td>ThreadScanResults</td>
          <td><a href="#struct-thread-scan">ThreadInterfaceScanResultStruct</a>[]</td>
          <td>Thread scan result list (TH feature only)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">AddOrUpdateWiFiNetwork — Add/Update Wi-Fi Network (0x02)</h3>
  <p>
    Write Wi-Fi network credentials (SSID + password) to the device. If credentials for the same SSID already exist, the password is updated; otherwise a new entry is added.
    The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SSID</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>SSID of the target Wi-Fi network (max 32 bytes)</td>
        </tr>
        <tr>
          <td>Credentials</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>Wi-Fi password (max 64 bytes)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker</td>
        </tr>
        <tr>
          <td>NetworkIdentity</td>
          <td>OctetString</td>
          <td>No</td>
          <td>Network identity (Matter 1.3+, for Per-Device Credentials)</td>
        </tr>
        <tr>
          <td>ClientIdentifier</td>
          <td>OctetString</td>
          <td>No</td>
          <td>Client identifier (Matter 1.3+, for Per-Device Credentials)</td>
        </tr>
        <tr>
          <td>PossessionNonce</td>
          <td>OctetString</td>
          <td>No</td>
          <td>Possession proof nonce (Matter 1.3+, for Per-Device Credentials)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>This is the key step in the commissioning flow for writing Wi-Fi credentials. Both SSID and password are OctetString type (binary), typically transmitted in Base64 encoding. Note: this command <strong>only stores credentials</strong> and does not connect immediately — a subsequent <a href="#cmd-0x06">ConnectNetwork</a> command is needed to actually connect.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">AddOrUpdateThreadNetwork — Add/Update Thread Network (0x03)</h3>
  <p>
    Write Thread network credentials (Operational Dataset) to the device. Thread credentials consist of a complete Operational Dataset
    containing PAN ID, Channel, Network Key, and other information. The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalDataset</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>Thread Operational Dataset (TLV-encoded complete network parameters)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>Thread network credentials are not a simple SSID + password, but a binary data block containing multiple parameters (Operational Dataset). The Commissioner typically obtains this Dataset from a Thread Border Router, then writes it to the device. A subsequent <a href="#cmd-0x06">ConnectNetwork</a> is also needed to actually join the Thread network.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">RemoveNetwork — Remove Network (0x04)</h3>
  <p>
    Remove stored network credentials from the device. Specify the network to remove via NetworkID. The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>Network ID to remove (SSID for Wi-Fi, Extended PAN ID for Thread)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>Used to remove old credentials when switching networks, or to clean up network configuration before factory reset. If the currently connected network is removed, the device will disconnect.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">NetworkConfigResponse — Network Config Response (0x05)</h3>
  <p>
    Unified response from the device for AddOrUpdateWiFiNetwork, AddOrUpdateThreadNetwork, RemoveNetwork, and ReorderNetwork commands.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>Operation result status code</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information</td>
        </tr>
        <tr>
          <td>NetworkIndex</td>
          <td>uint8</td>
          <td>Index position of the operated network in the list</td>
        </tr>
        <tr>
          <td>ClientIdentity</td>
          <td>OctetString</td>
          <td>Client identity (Matter 1.3+, Per-Device Credentials response)</td>
        </tr>
        <tr>
          <td>PossessionSignature</td>
          <td>OctetString</td>
          <td>Possession proof signature (Matter 1.3+, Per-Device Credentials response)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">ConnectNetwork — Connect Network (0x06)</h3>
  <p>
    Instructs the device to connect to a network previously stored via AddOrUpdateWiFiNetwork / AddOrUpdateThreadNetwork.
    This is the step in the commissioning flow that makes the device "actually go online." The device returns <a href="#cmd-0x07">ConnectNetworkResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>Network ID to connect to (must be a previously stored network)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        After sending ConnectNetwork, the device will attempt to connect within <code>ConnectMaxTimeSeconds</code>.
        <strong>Important</strong>: During the connection process, the BLE or existing communication link between the Commissioner and device may be interrupted (because the device switches to the new network).
        The Commissioner needs to rediscover and reconnect to the device through the new network.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">ConnectNetworkResponse — Connection Result (0x07)</h3>
  <p>
    Network connection result returned by the device. If the connection fails, <code>ErrorValue</code> contains a platform-level error code to help troubleshoot issues.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>Connection result status code</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information</td>
        </tr>
        <tr>
          <td>ErrorValue</td>
          <td>int32 / Nullable</td>
          <td>Platform-level error code. For Wi-Fi: <code>Status</code> (802.11 defined), for Thread: <code>OperationalError</code> (Thread protocol defined)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">What ErrorValue Actually Means</div>
    <p>
      <code>ErrorValue</code> is not a Matter-defined error code, but a raw error code returned by the underlying platform (Wi-Fi chip driver or Thread protocol stack).
      Common values in Wi-Fi scenarios include: wrong password (authentication failure), signal too weak (timeout), DHCP failure, etc.
      Interpretation requires consulting the specific chip platform's documentation.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">ReorderNetwork — Adjust Network Priority (0x08)</h3>
  <p>
    Adjust the priority order of stored networks. The device attempts connections from highest to lowest priority during restart or network switching.
    The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>Yes</td>
          <td>Network ID to reposition</td>
        </tr>
        <tr>
          <td>NetworkIndex</td>
          <td>uint8</td>
          <td>Yes</td>
          <td>Target position index (0 = highest priority)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>No</td>
          <td>Commissioning progress marker</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>When the device has stored multiple network credentials (MaxNetworks > 1), this command can adjust connection priority. Most consumer devices have MaxNetworks = 1, so this command is rarely used.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>NetworkCommissioning Cluster attributes describe the capabilities and current state of the network interface. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>MaxNetworks</td>
          <td>uint8</td>
          <td><a href="#attr-capacity">Network Capacity</a></td>
          <td>Maximum storable networks</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>Networks</td>
          <td>list&lt;NetworkInfoStruct&gt;</td>
          <td><a href="#attr-capacity">Network Capacity</a></td>
          <td>List of configured networks</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ScanMaxTimeSeconds</td>
          <td>uint8</td>
          <td><a href="#attr-timing">Timing Parameters</a></td>
          <td>Maximum scan duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>ConnectMaxTimeSeconds</td>
          <td>uint8</td>
          <td><a href="#attr-timing">Timing Parameters</a></td>
          <td>Maximum connection duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>InterfaceEnabled</td>
          <td>bool</td>
          <td><a href="#attr-status">Interface Status</a></td>
          <td>Whether the network interface is enabled</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>LastNetworkingStatus</td>
          <td>enum8 / null</td>
          <td><a href="#attr-status">Interface Status</a></td>
          <td>Result status of the last network operation</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>LastNetworkID</td>
          <td>octstr / null</td>
          <td><a href="#attr-status">Interface Status</a></td>
          <td>Network ID involved in the last operation</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>LastConnectErrorValue</td>
          <td>int32 / null</td>
          <td><a href="#attr-status">Interface Status</a></td>
          <td>Platform-level error code of the last connection failure</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>SupportedWiFiBands</td>
          <td>list&lt;WiFiBandEnum&gt;</td>
          <td><a href="#attr-wifi-extra">Wi-Fi Extensions</a></td>
          <td>List of supported Wi-Fi bands</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>SupportedThreadFeatures</td>
          <td>bitmap16</td>
          <td><a href="#attr-thread-extra">Thread Extensions</a></td>
          <td>Supported Thread features bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>ThreadVersion</td>
          <td>uint16</td>
          <td><a href="#attr-thread-extra">Thread Extensions</a></td>
          <td>Thread protocol version</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Group Details -->

  <h3 id="attr-capacity">Network Capacity (0x00-0x01)</h3>
  <p>Describes how many network credentials the device can store, and which networks are currently configured.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>MaxNetworks<br/><span class="attr-cn">Max Networks</span></td>
          <td>uint8</td>
          <td>Maximum number of network credentials the device can store. Most consumer devices support <code>1</code></td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>Networks<br/><span class="attr-cn">Network List</span></td>
          <td>list&lt;NetworkInfoStruct&gt;</td>
          <td>List of configured network credentials. Each entry contains a NetworkID (SSID for Wi-Fi or Extended PAN ID for Thread) and connection status</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NetworkInfoStruct Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString (1-32 bytes)</td>
          <td>Network identifier. SSID for Wi-Fi, Extended PAN ID for Thread</td>
        </tr>
        <tr>
          <td>Connected</td>
          <td>bool</td>
          <td>Whether the device is currently connected to this network</td>
        </tr>
        <tr>
          <td>NetworkIdentifier</td>
          <td>OctetString</td>
          <td>Optional, network identity (Matter 1.3+)</td>
        </tr>
        <tr>
          <td>ClientIdentifier</td>
          <td>OctetString</td>
          <td>Optional, client identifier (Matter 1.3+)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The Networks list <strong>does not contain passwords</strong> — for security reasons, network credentials cannot be read back once written to the device.
      You can only see the network ID and connection status, not the original password.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-timing">Timing Parameters (0x02-0x03)</h3>
  <p>Define the maximum duration for scan and connect operations, helping the Commissioner set reasonable timeouts.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>ScanMaxTimeSeconds<br/><span class="attr-cn">Scan Timeout</span></td>
          <td>uint8</td>
          <td>Maximum time for the device to complete a network scan (seconds). The Commissioner should wait at least this long before declaring a timeout</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>ConnectMaxTimeSeconds<br/><span class="attr-cn">Connection Timeout</span></td>
          <td>uint8</td>
          <td>Maximum time for the device to complete a network connection (seconds). Includes DHCP IP acquisition time</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Timeout Configuration Tips</div>
    <p>
      In practice, the App-side timeout should be set to <code>ScanMaxTimeSeconds + reasonable margin</code> (e.g., +5 seconds).
      Wi-Fi device scanning typically completes within 10-30 seconds, Thread devices may be faster.
      Connection timeout is generally 30-120 seconds, depending on network conditions and DHCP response speed.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-status">Interface Status (0x04-0x07)</h3>
  <p>The network interface's enabled state and last operation result are core information for troubleshooting commissioning issues.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>InterfaceEnabled<br/><span class="attr-cn">Interface Enabled</span></td>
          <td>bool</td>
          <td>Whether the network interface is enabled. When <code>false</code>, the device will not connect to any network, and scan/connect commands may be rejected</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>LastNetworkingStatus<br/><span class="attr-cn">Last Operation Status</span></td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a> / null</td>
          <td>Result status of the last network operation. <code>null</code> means no network operation has been performed yet</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>LastNetworkID<br/><span class="attr-cn">Last Operated Network</span></td>
          <td>OctetString / null</td>
          <td>Network ID involved in the last network operation. Combined with LastNetworkingStatus, it helps identify which network had issues</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>LastConnectErrorValue<br/><span class="attr-cn">Last Connection Error Code</span></td>
          <td>int32 / null</td>
          <td>Platform-level error code from the last failed ConnectNetwork. <code>null</code> means no error or no connection has been attempted yet</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Troubleshooting Commissioning Failures</div>
    <p>
      When commissioning fails, prioritize reading these three "Last*" attributes: <code>LastNetworkingStatus</code> tells you the general cause (wrong password? network not found?),
      <code>LastNetworkID</code> confirms which network, and <code>LastConnectErrorValue</code> provides the underlying specific error code.
      Using all three together enables rapid diagnosis of most commissioning issues.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-wifi-extra">Wi-Fi Extensions (0x08)</h3>
  <p>Wi-Fi related attributes added in Matter 1.3, present only when the Feature Map includes WI.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>SupportedWiFiBands<br/><span class="attr-cn">Supported Wi-Fi Bands</span></td>
          <td>list&lt;<a href="#enum-wifiband">WiFiBandEnum</a>&gt;</td>
          <td>List of Wi-Fi bands supported by the device (e.g., 2.4GHz, 5GHz)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-thread-extra">Thread Extensions (0x09-0x0A)</h3>
  <p>Thread related attributes added in Matter 1.3, present only when the Feature Map includes TH.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>SupportedThreadFeatures<br/><span class="attr-cn">Thread Feature Support</span></td>
          <td>bitmap16</td>
          <td>Bitmap of Thread protocol features supported by the device</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>ThreadVersion<br/><span class="attr-cn">Thread Version</span></td>
          <td>uint16</td>
          <td>Thread protocol version number supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enums & Structs ====== -->
  <h2 id="enums">Enums & Structs</h2>

  <h3 id="enum-status">NetworkCommissioningStatusEnum</h3>
  <p>All network operation command responses include this status code to indicate the operation result. This is the first field to check when troubleshooting commissioning issues.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Operation successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OutOfRange</span>
        <span class="enum-desc">Value out of valid range</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BoundsExceeded</span>
        <span class="enum-desc">Network storage limit reached (MaxNetworks)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NetworkIDNotFound</span>
        <span class="enum-desc">Specified network ID not found in the stored list</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">DuplicateNetworkID</span>
        <span class="enum-desc">Duplicate network ID (same ID already exists)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NetworkNotFound</span>
        <span class="enum-desc">Target network not found during scan or connect (not on air)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">RegulatoryError</span>
        <span class="enum-desc">Cannot use this network due to regulatory restrictions (e.g., band not compliant in the current country/region)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">AuthFailure</span>
        <span class="enum-desc">Authentication failure (typically wrong Wi-Fi password)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">UnsupportedSecurity</span>
        <span class="enum-desc">Unsupported security protocol of the target network (e.g., device does not support WPA3)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">OtherConnectionFailure</span>
        <span class="enum-desc">Other connection failure (does not fall into any of the above categories)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">IPV6Failed</span>
        <span class="enum-desc">IPv6 address acquisition failed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">IPBindFailed</span>
        <span class="enum-desc">IP address binding failed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">UnknownError</span>
        <span class="enum-desc">Unknown error</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Errors Quick Reference</div>
    <p>
      <strong>Wrong password</strong> → <code>7 (AuthFailure)</code>;
      <strong>Wrong network name or router is off</strong> → <code>5 (NetworkNotFound)</code>;
      <strong>Network storage full</strong> → <code>2 (BoundsExceeded)</code>;
      <strong>Device doesn't support 5GHz</strong> → the network won't appear in scan results; forcing a connection may yield <code>8 (UnsupportedSecurity)</code> or <code>9 (OtherConnectionFailure)</code>.
    </p>
  </div>

  <h3 id="enum-wifiband">WiFiBandEnum</h3>
  <p>Identifies the Wi-Fi operating band, used in scan results and the SupportedWiFiBands attribute.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">2G4</span>
        <span class="enum-desc">2.4 GHz band (802.11b/g/n)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">3G65</span>
        <span class="enum-desc">3.65 GHz band</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">5G</span>
        <span class="enum-desc">5 GHz band (802.11a/n/ac)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">6G</span>
        <span class="enum-desc">6 GHz band (802.11ax / Wi-Fi 6E)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">60G</span>
        <span class="enum-desc">60 GHz band (802.11ad / WiGig)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">1G</span>
        <span class="enum-desc">Sub-1 GHz band (802.11ah / Wi-Fi HaLow)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-wifi-security">WiFiSecurityBitmap</h3>
  <p>Security type bitmap for Wi-Fi networks. A network can support multiple security protocols simultaneously (multiple bits set to 1).</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Unencrypted</span>
        <span class="enum-desc">Open network, no encryption</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">WEP</span>
        <span class="enum-desc">WEP encryption (no longer secure, being phased out)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">WPA-PERSONAL</span>
        <span class="enum-desc">WPA Personal (PSK)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">WPA2-PERSONAL</span>
        <span class="enum-desc">WPA2 Personal (PSK), currently the most common</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">WPA3-PERSONAL</span>
        <span class="enum-desc">WPA3 Personal (SAE), more secure new standard</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Bitmap Reading Example</div>
    <p>
      A scan result with <code>security = 12</code> (binary <code>01100</code>) means the network supports both WPA2-PERSONAL (Bit 3) and WPA-PERSONAL (Bit 2).
      A value of <code>4</code> (binary <code>00100</code>) means only WPA-PERSONAL is supported.
    </p>
  </div>

  <h3 id="struct-wifi-scan">WiFiInterfaceScanResultStruct</h3>
  <p>Detailed information for each network in Wi-Fi scan results.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Security</td>
          <td><a href="#enum-wifi-security">WiFiSecurityBitmap</a></td>
          <td>Security type bitmap</td>
        </tr>
        <tr>
          <td>SSID</td>
          <td>OctetString (0-32 bytes)</td>
          <td>Network name</td>
        </tr>
        <tr>
          <td>BSSID</td>
          <td>OctetString (6 bytes)</td>
          <td>Access point MAC address</td>
        </tr>
        <tr>
          <td>Channel</td>
          <td>uint16</td>
          <td>Wi-Fi channel number</td>
        </tr>
        <tr>
          <td>WiFiBand</td>
          <td><a href="#enum-wifiband">WiFiBandEnum</a></td>
          <td>Operating band (2.4G / 5G, etc.)</td>
        </tr>
        <tr>
          <td>RSSI</td>
          <td>int8</td>
          <td>Signal strength (dBm), higher values mean better signal (typically -30 excellent, -70 fair, -90 poor)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#enums">&#8593; Back to Enum List</a></p>

  <h3 id="struct-thread-scan">ThreadInterfaceScanResultStruct</h3>
  <p>Detailed information for each network in Thread scan results.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PanId</td>
          <td>uint16</td>
          <td>Personal Area Network ID (PAN identifier)</td>
        </tr>
        <tr>
          <td>ExtendedPanId</td>
          <td>uint64</td>
          <td>Extended PAN ID (globally unique network identifier)</td>
        </tr>
        <tr>
          <td>NetworkName</td>
          <td>String (1-16 characters)</td>
          <td>Thread Network name</td>
        </tr>
        <tr>
          <td>Channel</td>
          <td>uint16</td>
          <td>Thread channel number</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>uint8</td>
          <td>Thread protocol version</td>
        </tr>
        <tr>
          <td>ExtendedAddress</td>
          <td>OctetString (8 bytes)</td>
          <td>Device extended MAC address (IEEE EUI-64)</td>
        </tr>
        <tr>
          <td>RSSI</td>
          <td>int8</td>
          <td>Signal strength (dBm)</td>
        </tr>
        <tr>
          <td>LQI</td>
          <td>uint8</td>
          <td>Link Quality Indicator (link quality metric, 0-255, higher is better)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#enums">&#8593; Back to Enum List</a></p>

  <!-- ====== Standard Examples ====== -->
  <h2 id="standard-example">Standard Example</h2>

  <h3>Attribute Data Example</h3>
  <p>The following is typical attribute data for a commissioned Wi-Fi device:</p>
  <pre><code>{
  // --- Network Capacity ---
  "0x00": 1,             // MaxNetworks = 1 (max 1 network credential)
  "0x01": [{             // Networks = List of configured networks
    "networkID": "TXlIb21lV2lGaQ==",  // Base64-encoded SSID
    "connected": true                   // Currently connected
  }],

  // --- Scan & Connection Timeout ---
  "0x02": 30,            // ScanMaxTimeSeconds = 30 seconds
  "0x03": 60,            // ConnectMaxTimeSeconds = 60 seconds

  // --- Interface Status ---
  "0x04": true,          // InterfaceEnabled = true (network interface enabled)

  // --- Last Operation Result ---
  "0x05": 0,             // LastNetworkingStatus = Success
  "0x06": "TXlIb21lV2lGaQ==",  // LastNetworkID (network ID of last operation)
  "0x07": null           // LastConnectErrorValue = null (no error)
}</code></pre>

  <h3>Scan Networks Flow Example</h3>
  <p>Commissioner initiates a Wi-Fi scan and retrieves results:</p>
  <pre><code>// Commissioner → Device: Scan Wi-Fi networks
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0031",
      "commandId": "0x00"        // ScanNetworks
    },
    "commandFields": {
      "ssid": null,              // null = scan all networks
      "breadcrumb": 1            // Commissioning progress marker
    }
  }]
}

// Device → Commissioner: Return scan results
{
  "networkingStatus": 0,         // Success
  "wiFiScanResults": [
    {
      "security": 4,             // WPA2-Personal
      "ssid": "MyHomeWiFi",
      "bssid": "AA:BB:CC:DD:EE:FF",
      "channel": 6,
      "wiFiBand": 0,             // 2.4GHz
      "rssi": -45
    },
    {
      "security": 8,             // WPA3-Personal
      "ssid": "Office5G",
      "bssid": "11:22:33:44:55:66",
      "channel": 36,
      "wiFiBand": 1,             // 5GHz
      "rssi": -62
    }
  ]
}</code></pre>

  <h3>Add Wi-Fi Network Example</h3>
  <p>Write Wi-Fi credentials to the device:</p>
  <pre><code>// Add Wi-Fi network credentials
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0031",
      "commandId": "0x02"        // AddOrUpdateWiFiNetwork
    },
    "commandFields": {
      "ssid": "TXlIb21lV2lGaQ==",  // Base64 of "MyHomeWiFi"
      "credentials": "cGFzc3dvcmQ=", // Base64 of password
      "breadcrumb": 2
    }
  }]
}

// Device replies with NetworkConfigResponse
{
  "networkingStatus": 0,         // Success
  "networkIndex": 0              // Stored at index 0
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Both SSID and password are <strong>OctetString</strong> (byte arrays) in the Matter protocol, typically transmitted using Base64 encoding.
      The <code>"TXlIb21lV2lGaQ=="</code> in the example above decodes to <code>"MyHomeWiFi"</code>.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Complete Wi-Fi Device Commissioning Flow</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner establishes a PASE secure channel with the device via BLE</li>
        <li>Read <code>FeatureMap</code> to confirm it is a Wi-Fi device (Bit 0 = 1)</li>
        <li>Read <code>ScanMaxTimeSeconds (0x02)</code> to get scan timeout</li>
        <li>Send <a href="#cmd-0x00"><code>ScanNetworks (0x00)</code></a> with SSID = <code>null</code> to scan all networks</li>
        <li>Receive <a href="#cmd-0x01"><code>ScanNetworksResponse (0x01)</code></a> and display Wi-Fi list to the user</li>
        <li>User selects a network and enters the password</li>
        <li>Send <a href="#cmd-0x02"><code>AddOrUpdateWiFiNetwork (0x02)</code></a> to write SSID + password</li>
        <li>Receive <a href="#cmd-0x05"><code>NetworkConfigResponse (0x05)</code></a> and confirm <code>NetworkingStatus = 0 (Success)</code></li>
        <li>Send <a href="#cmd-0x06"><code>ConnectNetwork (0x06)</code></a> to instruct the device to connect</li>
        <li>Device connects to Wi-Fi and returns result via <a href="#cmd-0x07"><code>ConnectNetworkResponse (0x07)</code></a></li>
        <li>Commissioner rediscovers the device through the Wi-Fi network and continues with subsequent commissioning steps (NOC certificate installation, etc.)</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Thread Device Commissioning</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner establishes a PASE secure channel with the device via BLE</li>
        <li>Read <code>FeatureMap</code> to confirm it is a Thread device (Bit 1 = 1)</li>
        <li>Commissioner obtains the Operational Dataset from the Thread Border Router</li>
        <li>Send <a href="#cmd-0x03"><code>AddOrUpdateThreadNetwork (0x03)</code></a> to write the Dataset</li>
        <li>Send <a href="#cmd-0x06"><code>ConnectNetwork (0x06)</code></a> to instruct the device to join the Thread network</li>
        <li>After the device joins the Thread network, the Commissioner continues commissioning through the Thread network</li>
      </ol>
      <p>Note: Thread commissioning typically does not require scanning first, as the Dataset already contains all parameters for the target network.</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Commissioning Failure Troubleshooting</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>LastNetworkingStatus (0x05)</code> to check the error type</li>
        <li>Read <code>LastNetworkID (0x06)</code> to confirm which network</li>
        <li>Read <code>LastConnectErrorValue (0x07)</code> to get the platform-level error code</li>
      </ol>
      <p>Common issue reference:</p>
      <ul>
        <li><strong>Status = 7 (AuthFailure)</strong>: Wrong password, ask the user to re-enter</li>
        <li><strong>Status = 5 (NetworkNotFound)</strong>: Network not in range, check if the router is on and if the signal is too weak</li>
        <li><strong>Status = 10 (IPV6Failed)</strong>: Router may not support IPv6, check router settings</li>
        <li><strong>Status = 8 (UnsupportedSecurity)</strong>: Device does not support the target network's encryption, check SupportedWiFiBands and scan results</li>
      </ul>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Switching Wi-Fi Networks</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>Networks (0x01)</code> to view currently stored networks</li>
        <li>Read <code>MaxNetworks (0x00)</code>; if only 1 can be stored, delete the old network first</li>
        <li>Send <a href="#cmd-0x04"><code>RemoveNetwork (0x04)</code></a> to remove old credentials</li>
        <li>Follow the Scenario 1 flow to add and connect to the new network</li>
      </ol>
      <p>Note: Removing the currently connected network will cause the device to disconnect. If MaxNetworks > 1, you can add the new network first and then remove the old one to minimize downtime.</p>
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
  'general-commissioning': {
    title: 'GeneralCommissioning Cluster (0x0030)',
    description: 'Complete reference for Matter GeneralCommissioning Cluster (0x0030) — ArmFailSafe / SetRegulatoryConfig / CommissioningComplete command details, Fail-Safe mechanism, regulatory configuration, commissioning flow and error recovery scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>GeneralCommissioning Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0030</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    GeneralCommissioning is the master control Cluster for the Matter commissioning flow — responsible for managing the entire commissioning lifecycle.
    It does not handle specific network credentials (that is <a href="../network-commissioning/">NetworkCommissioning</a>'s job),
    but rather controls the "start," "progress," and "end" of the commissioning flow, and ensures the device can safely roll back on failure through the Fail-Safe mechanism.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      If the commissioning flow is like a database transaction, GeneralCommissioning is the role responsible for <code>BEGIN</code> / <code>COMMIT</code> / <code>ROLLBACK</code>.
      <strong>ArmFailSafe</strong> is equivalent to <code>BEGIN</code> (start transaction), <strong>CommissioningComplete</strong> is equivalent to <code>COMMIT</code> (commit transaction),
      and Fail-Safe timeout automatically triggers <code>ROLLBACK</code> (rollback all changes).
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
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
    The GeneralCommissioning Cluster has 3 request commands, each with a corresponding response command.
    These three commands form the backbone of the commissioning flow: first start the safety timer, then set regulatory configuration, and finally submit completion.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <h3>Client → Server (Request Commands)</h3>
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
          <td>ArmFailSafe</td>
          <td>Start/renew the Fail-Safe timer</td>
          <td>ArmFailSafeResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>SetRegulatoryConfig</td>
          <td>Set the device regulatory area configuration</td>
          <td>SetRegulatoryConfigResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>CommissioningComplete</td>
          <td>Confirm commissioning complete, commit all changes</td>
          <td>CommissioningCompleteResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Server → Client (Response Commands)</h3>
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
          <td>ArmFailSafeResponse</td>
          <td>Return Fail-Safe activation result</td>
          <td>ArmFailSafe</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>SetRegulatoryConfigResponse</td>
          <td>Return regulatory configuration result</td>
          <td>SetRegulatoryConfig</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>CommissioningCompleteResponse</td>
          <td>Return commissioning complete result</td>
          <td>CommissioningComplete</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ArmFailSafe — Start Fail-Safe (0x00)</h3>
  <p>
    Starts or renews the Fail-Safe timer. This is the <strong>first step</strong> in the commissioning flow — before any commissioning operation, this must be called to enable safety protection.
    Once the Fail-Safe timer starts, the device enters a "commissionable" state; if the timer expires before commissioning completes (CommissioningComplete not received),
    the device will <strong>automatically roll back all commissioning changes</strong> and restore to its pre-commissioning state.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ExpiryLengthSeconds</td>
          <td>uint16</td>
          <td>Fail-Safe timeout in seconds. Set to <code>0</code> to immediately cancel the current Fail-Safe (active rollback)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>Commissioning progress marker, written to the device's Breadcrumb attribute</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ArmFailSafeResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>Operation result</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Core Constraints of Fail-Safe</div>
    <p>
      <strong>ExpiryLengthSeconds</strong> cannot exceed <code>BasicCommissioningInfo.MaxCumulativeFailsafeSeconds</code> (typically 900 seconds = 15 minutes).
      Exceeding this limit returns a <code>ValueOutsideRange</code> error.
      Additionally, only one Commissioner can hold the Fail-Safe at a time — if another Commissioner is already commissioning,
      a <code>BusyWithOtherAdmin</code> error is returned.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        The Commissioner (App) calls ArmFailSafe to start the timer at the beginning of commissioning.
        If the commissioning process takes a long time (e.g., waiting for the user to enter the Wi-Fi password), ArmFailSafe can be called again to renew before timeout.
        Setting ExpiryLengthSeconds to <code>0</code> is the way to actively abandon commissioning — the device will immediately roll back all changes.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">SetRegulatoryConfig — Set Regulatory Configuration (0x02)</h3>
  <p>
    Set the device's regulatory area (indoor/outdoor) and country code. Different countries and regions have different regulatory requirements for wireless devices (e.g., transmission power, available bands),
    and the device needs to adjust its wireless parameters based on the regulatory configuration.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewRegulatoryConfig</td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>Target regulatory configuration (Indoor / Outdoor / IndoorOutdoor)</td>
        </tr>
        <tr>
          <td>CountryCode</td>
          <td>String (2 characters)</td>
          <td>ISO 3166-1 alpha-2 country code (e.g., <code>"CN"</code>, <code>"US"</code>). <code>"XX"</code> means unspecified</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>Commissioning progress marker</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SetRegulatoryConfigResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>Operation result</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Regulatory Configuration and Device Capability</div>
    <p>
      The <code>NewRegulatoryConfig</code> setting cannot exceed the device's <code>LocationCapability</code>.
      For example: if the device's LocationCapability is <code>Indoor</code> (indoor only),
      you cannot set RegulatoryConfig to <code>Outdoor</code>, or a <code>ValueOutsideRange</code> error is returned.
      Most consumer devices have LocationCapability set to <code>IndoorOutdoor</code> (unrestricted), so this check rarely fails.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        Called after ArmFailSafe and before CommissioningComplete. Typically the Commissioner automatically obtains the user's geographic location
        and fills in the corresponding country code. If the location cannot be determined, <code>"XX"</code> can be used to indicate unspecified.
        Regulatory configuration affects which Wi-Fi channels and transmission power the device can use; incorrect settings may prevent the device from connecting to certain networks.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">CommissioningComplete — Complete Commissioning (0x04)</h3>
  <p>
    The <strong>final step</strong> of the commissioning flow. After a successful call, the device will:
  </p>
  <ol>
    <li>Stop the Fail-Safe timer</li>
    <li>Permanently save all changes made during commissioning (network credentials, NOC certificates, ACL permissions, etc.)</li>
    <li>Reset Breadcrumb to <code>0</code></li>
  </ol>
  <p>
    This command <strong>has no parameters</strong>. Only the Commissioner currently holding the Fail-Safe can call it.
  </p>

  <h4>CommissioningCompleteResponse Response Fields</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>Operation result</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>Optional debug information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Prerequisites</div>
    <p>
      CommissioningComplete must be called while the Fail-Safe is active, and the caller must be the same Commissioner that started the Fail-Safe.
      If there is no active Fail-Safe, a <code>NoFailSafe</code> error is returned;
      if called by a different Commissioner, an <code>InvalidAuthentication</code> error is returned.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        After all commissioning steps (network configuration, NOC certificate installation, ACL permission setup, etc.) are complete, send this command to lock in the changes.
        Once called successfully, the device officially joins the Matter Fabric and can be managed by controllers within the Fabric.
        If this command fails or is not sent, the device automatically rolls back after the Fail-Safe timeout, restoring everything to its original state.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The GeneralCommissioning Cluster has 5 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td><a href="#group-tracking">Commissioning Tracking</a></td>
          <td>Progress marker set by the Commissioner</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>BasicCommissioningInfo</td>
          <td>struct</td>
          <td><a href="#group-info">Basic Commissioning Info</a></td>
          <td>Fail-Safe timeout parameters</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>RegulatoryConfig</td>
          <td>RegulatoryLocationTypeEnum</td>
          <td><a href="#group-regulatory">Regulatory Config</a></td>
          <td>Current regulatory area configuration</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>LocationCapability</td>
          <td>RegulatoryLocationTypeEnum</td>
          <td><a href="#group-regulatory">Regulatory Config</a></td>
          <td>Device's supported regulatory area capability</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>SupportsConcurrentConnection</td>
          <td>bool</td>
          <td><a href="#group-connection">Connection Capability</a></td>
          <td>Whether concurrent connections are supported during commissioning</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Commissioning Tracking (0x0000) ====== -->
  <h3 id="group-tracking">Commissioning Tracking (0x0000)</h3>
  <p>Used by the Commissioner to track the progress of the commissioning flow.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Breadcrumb<br/><span class="attr-cn">Progress Marker</span></td>
          <td>uint64</td>
          <td>
            Progress tracking value written by the Commissioner through command parameters.
            Each commissioning command (ArmFailSafe, SetRegulatoryConfig, etc.) includes a Breadcrumb parameter,
            and the device updates this attribute upon successful execution. The Commissioner can read it to confirm whether the previous command actually took effect.
            Automatically reset to <code>0</code> after commissioning completes (CommissioningComplete)
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical Use of Breadcrumb</div>
    <p>
      Breadcrumb is a simple but practical "which step has been executed" marker.
      For example, the Commissioner sets Breadcrumb = 1 during ArmFailSafe, 2 during SetRegulatoryConfig, and 3 when writing network credentials.
      If commissioning encounters an error mid-way and needs to retry, reading Breadcrumb reveals which step was last executed, allowing resumption from the checkpoint instead of starting over.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Basic Commissioning Info (0x0001) ====== -->
  <h3 id="group-info">Basic Commissioning Info (0x0001)</h3>
  <p>Describes the device's Fail-Safe time limits, which the Commissioner uses to set reasonable timeout parameters.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>BasicCommissioningInfo<br/><span class="attr-cn">Basic Commissioning Info</span></td>
          <td>struct</td>
          <td>Contains key Fail-Safe timeout parameters (see structure below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>BasicCommissioningInfo Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>FailSafeExpiryLengthSeconds</td>
          <td>uint16</td>
          <td>Default Fail-Safe timeout in seconds. The Commissioner typically uses this value in the ArmFailSafe command</td>
        </tr>
        <tr>
          <td>MaxCumulativeFailsafeSeconds</td>
          <td>uint16</td>
          <td>Maximum cumulative Fail-Safe duration. ArmFailSafe's ExpiryLengthSeconds cannot exceed this value, otherwise ValueOutsideRange is returned</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Typical Values</div>
    <p>
      Most devices have <code>FailSafeExpiryLengthSeconds</code> of 60 seconds and <code>MaxCumulativeFailsafeSeconds</code> of 900 seconds (15 minutes).
      This means a single ArmFailSafe can be set to a maximum of 900 seconds. If the commissioning flow needs more time (e.g., waiting for user action),
      the Commissioner needs to call ArmFailSafe again to renew before timeout, but the total duration cannot exceed 900 seconds.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Regulatory Config (0x0002, 0x0003) ====== -->
  <h3 id="group-regulatory">Regulatory Config (0x0002, 0x0003)</h3>
  <p>Describes the device's regulatory area configuration and its capability constraints.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>RegulatoryConfig<br/><span class="attr-cn">Current Regulatory Config</span></td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>The device's current regulatory area setting. Modified via the <a href="#cmd-0x02">SetRegulatoryConfig</a> command</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>LocationCapability<br/><span class="attr-cn">Location Capability</span></td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>The regulatory area range supported by the device hardware. RegulatoryConfig values cannot exceed this capability. Read-only attribute determined by device firmware</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, most consumer Matter devices have <code>LocationCapability</code> set to <code>IndoorOutdoor (2)</code>,
      and correspondingly <code>RegulatoryConfig</code> also defaults to <code>IndoorOutdoor</code>.
      Only industrial or special-purpose devices are restricted to Indoor-only or Outdoor-only.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Connection Capability (0x0004) ====== -->
  <h3 id="group-connection">Connection Capability (0x0004)</h3>
  <p>Describes the device's network connection capability during commissioning.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>SupportsConcurrentConnection<br/><span class="attr-cn">Supports Concurrent Connection</span></td>
          <td>bool</td>
          <td>
            Whether the device can maintain multiple network connections simultaneously during commissioning.
            <code>true</code> = device can maintain BLE channel while connecting to Wi-Fi (most devices);
            <code>false</code> = device disconnects BLE after connecting to Wi-Fi, Commissioner needs to rediscover the device through the Wi-Fi network
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Impact of SupportsConcurrentConnection = false</div>
    <p>
      When this attribute is <code>false</code>, the Commissioner loses communication with the device after sending <code>ConnectNetwork</code>.
      The Commissioner then needs to:
      (1) Rediscover the device on the target network via mDNS;
      (2) Establish a CASE secure channel (since the PASE channel has disconnected);
      (3) Only then can it continue sending <code>CommissioningComplete</code>.
      This increases the complexity and duration of the commissioning flow.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-error">CommissioningErrorEnum</h3>
  <p>All GeneralCommissioning command responses include this error code to indicate the operation result.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">Operation successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ValueOutsideRange</span>
        <span class="enum-desc">Parameter value outside allowed range (e.g., ExpiryLengthSeconds exceeds limit, or RegulatoryConfig exceeds device capability)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidAuthentication</span>
        <span class="enum-desc">Invalid authentication — caller is not the Commissioner that started the Fail-Safe</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NoFailSafe</span>
        <span class="enum-desc">No active Fail-Safe — attempting CommissioningComplete without calling ArmFailSafe</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">BusyWithOtherAdmin</span>
        <span class="enum-desc">Another Commissioner is currently commissioning — only one Fail-Safe session is allowed at a time</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Errors Quick Reference</div>
    <p>
      <strong>ArmFailSafe returns BusyWithOtherAdmin</strong> → Another App or controller is commissioning this device, wait for it to complete or timeout;
      <strong>CommissioningComplete returns NoFailSafe</strong> → The Fail-Safe has already timed out and auto-rolled back, the entire commissioning flow needs to restart;
      <strong>SetRegulatoryConfig returns ValueOutsideRange</strong> → Check the device's LocationCapability and select a supported area type.
    </p>
  </div>

  <h3 id="enum-location">RegulatoryLocationTypeEnum</h3>
  <p>Identifies the device's regulatory use scenario. Used for the <code>RegulatoryConfig</code> and <code>LocationCapability</code> attributes and the <code>SetRegulatoryConfig</code> command.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Indoor</span>
        <span class="enum-desc">Indoor use only — device follows indoor radio regulations (typically less restrictive)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Outdoor</span>
        <span class="enum-desc">Outdoor use only — device follows outdoor radio regulations (some bands have stricter restrictions)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">IndoorOutdoor</span>
        <span class="enum-desc">Both indoor and outdoor — device meets both indoor and outdoor regulatory requirements (most common)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Attribute Data Example</h3>
  <p>The following is typical attribute data for a GeneralCommissioning Cluster of a device currently being commissioned:</p>
  <pre><code>{
  // --- Commissioning Tracking ---
  "0x0000": 3,                // Breadcrumb = 3（Progress marker set by the Commissioner）

  // --- Basic Commissioning Info ---
  "0x0001": {                 // BasicCommissioningInfo
    "failSafeExpiryLengthSeconds": 60,    // Fail-Safe default 60 seconds
    "maxCumulativeFailsafeSeconds": 900   // Maximum cumulative 900 seconds (15 minutes)
  },

  // --- Regulatory Config ---
  "0x0002": 2,                // RegulatoryConfig = IndoorOutdoor (current config)
  "0x0003": 2,                // LocationCapability = IndoorOutdoor (device capability)

  // --- Concurrent Connection ---
  "0x0004": true              // SupportsConcurrentConnection = true (supports concurrent connection)
}</code></pre>

  <h3>ArmFailSafe Interaction Example</h3>
  <p>Commissioner request and response for starting the Fail-Safe timer:</p>
  <pre><code>// Commissioner → Device: Start Fail-Safe timer
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0030",
      "commandId": "0x00"        // ArmFailSafe
    },
    "commandFields": {
      "expiryLengthSeconds": 60, // 60 second timeout
      "breadcrumb": 1            // Commissioning progress marker
    }
  }]
}

// Device → Commissioner: Confirm Fail-Safe started
{
  "errorCode": 0,               // OK
  "debugText": ""
}</code></pre>

  <h3>CommissioningComplete Interaction Example</h3>
  <p>Final confirmation when commissioning completes:</p>
  <pre><code>// Commissioner → Device: Complete commissioning
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0030",
      "commandId": "0x04"        // CommissioningComplete
    },
    "commandFields": {}          // No parameters
  }]
}

// Device → Commissioner: Confirm commissioning complete
{
  "errorCode": 0,               // OK
  "debugText": ""
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, Commissioner SDKs (such as Android's chip-tool or iOS's Matter.framework) typically handle the GeneralCommissioning command sequence automatically.
      App developers rarely need to send these commands manually, but understanding how they work helps troubleshoot commissioning failures.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Standard Commissioning Flow (Normal Path)</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner establishes a PASE secure channel with the device via BLE</li>
        <li>Read <code>BasicCommissioningInfo (0x0001)</code> to get Fail-Safe timeout parameters</li>
        <li>Send <a href="#cmd-0x00"><code>ArmFailSafe (0x00)</code></a> with ExpiryLengthSeconds = 60, Breadcrumb = 1</li>
        <li>Send <a href="#cmd-0x02"><code>SetRegulatoryConfig (0x02)</code></a> to set country code and regulatory area, Breadcrumb = 2</li>
        <li>Configure network credentials and connect via <a href="../network-commissioning/">NetworkCommissioning (0x0031)</a></li>
        <li>Install NOC certificate (OperationalCredentials Cluster)</li>
        <li>Set ACL permissions (AccessControl Cluster)</li>
        <li>Send <a href="#cmd-0x04"><code>CommissioningComplete (0x04)</code></a> to commit all changes</li>
        <li>Commissioning complete, device officially joins the Fabric</li>
      </ol>
      <p>The entire flow typically completes within 30 seconds (excluding user input time).</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Fail-Safe Timeout Rollback</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner sends ArmFailSafe (60 second timeout)</li>
        <li>Successfully wrote Wi-Fi credentials</li>
        <li>But encountered an error during NOC certificate installation, Commissioner decides to abandon</li>
        <li>Commissioner does not send CommissioningComplete</li>
        <li>After 60 seconds, the Fail-Safe timer expires</li>
        <li>Device automatically rolls back: <strong>deletes the just-written Wi-Fi credentials</strong>, resets Breadcrumb to 0</li>
        <li>Device returns to its pre-commissioning state, ready to restart commissioning</li>
      </ol>
      <p>
        <strong>Active rollback is also possible</strong>: Send <code>ArmFailSafe(ExpiryLengthSeconds = 0)</code> to trigger an immediate rollback
        without waiting for the 60-second timeout. This is faster and more courteous than waiting for timeout.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Regulatory Configuration Handling</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>LocationCapability (0x0003)</code> to confirm supported area types</li>
        <li>Determine CountryCode based on the user's region (e.g., China = <code>"CN"</code>, US = <code>"US"</code>)</li>
        <li>Select RegulatoryConfig based on the device's actual use scenario:
          <ul>
            <li>Smart lights, plugs, sensors → typically <code>IndoorOutdoor (2)</code></li>
            <li>Outdoor security cameras → <code>Outdoor (1)</code></li>
            <li>Unsure → use <code>IndoorOutdoor (2)</code> (if the device supports it)</li>
          </ul>
        </li>
        <li>Send <a href="#cmd-0x02"><code>SetRegulatoryConfig</code></a></li>
        <li>If <code>ValueOutsideRange</code> is returned, fall back to a value allowed by the device's LocationCapability and retry</li>
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
  'administrator-commissioning': {
    title: 'AdministratorCommissioning Cluster (0x003C)',
    description: 'Complete reference for Matter AdministratorCommissioning Cluster (0x003C) — OpenCommissioningWindow / OpenBasicCommissioningWindow / RevokeCommissioning command details, commissioning window control, Feature Map, status codes and security audit scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>AdministratorCommissioning Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003C</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    AdministratorCommissioning controls the opening and closing of the device's <strong>Commissioning Window</strong>.
    When a device has already joined a Fabric (been commissioned), and you want <em>new</em> administrators to also commission this device,
    you need to open a commissioning window through this Cluster. It does not handle the commissioning flow itself (that is
    <a href="../general-commissioning/">GeneralCommissioning</a>'s job),
    but rather controls the "whether the device accepts new commissioning requests" switch.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      If the device is like a building, AdministratorCommissioning is the <strong>access control system</strong> at the entrance.
      The building owner (existing administrator) can choose to temporarily open access, allowing new residents (new administrators) to complete move-in procedures (commissioning).
      <strong>OpenCommissioningWindow</strong> is changing to a new lock code before opening the door (more secure),
      <strong>OpenBasicCommissioningWindow</strong> is opening the door with the existing code (more convenient),
      <strong>RevokeCommissioning</strong> is closing the door at any time.
    </p>
  </div>

  <!-- Feature Map -->
  <h3>Feature Map</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Bit</th><th>Code</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>BC</td>
          <td>Basic Commissioning</td>
          <td>Supports basic commissioning method — the <a href="#cmd-0x01">OpenBasicCommissioningWindow</a> command. If the device does not support this Feature, only the enhanced commissioning method can open a window</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#status-codes">Status Codes</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The AdministratorCommissioning Cluster has 3 commands for opening an enhanced commissioning window, opening a basic commissioning window, and closing a commissioning window.
    None of these commands have dedicated response structures; they return results through the standard Status response.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>OpenCommissioningWindow</td>
          <td>--</td>
          <td>Open enhanced commissioning window with a new PAKE verifier</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>OpenBasicCommissioningWindow</td>
          <td>BC</td>
          <td>Open basic commissioning window using existing passcode</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>RevokeCommissioning</td>
          <td>--</td>
          <td>Close the currently open commissioning window</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">OpenCommissioningWindow — Enhanced Commissioning Window (0x00)</h3>
  <p>
    Opens an Enhanced Commissioning Window. The caller must provide a <strong>brand-new PAKE verifier</strong>,
    and the new Commissioner will use this verifier instead of the device's factory passcode to establish a PASE secure channel.
    This is the most secure window-opening method — each window uses a one-time password, so even if intercepted, it cannot be used for the next commissioning.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommissioningTimeout</td>
          <td>uint16</td>
          <td>Number of seconds the window stays open. Automatically closes after timeout. Range is typically <code>60 ~ 900</code> seconds</td>
        </tr>
        <tr>
          <td>PAKEPasscodeVerifier</td>
          <td>octstr</td>
          <td>New PAKE password verifier. Generated by the Commissioner based on a new passcode</td>
        </tr>
        <tr>
          <td>Discriminator</td>
          <td>uint16</td>
          <td>12-bit device discriminator, used by the new Commissioner to identify the target device during discovery</td>
        </tr>
        <tr>
          <td>Iterations</td>
          <td>uint32</td>
          <td>PBKDF2 iteration count, range <code>1000 ~ 100000</code></td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>octstr</td>
          <td>PBKDF2 salt, length <code>16 ~ 32</code> bytes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Enhanced vs Basic Commissioning</div>
    <p>
      Enhanced commissioning generates a new PAKE verifier each time a window is opened, completely invalidating the old password.
      This means even if someone sniffs the PASE handshake data during this commissioning session, it cannot be used to crack the next one.
      In contrast, <a href="#cmd-0x01">OpenBasicCommissioningWindow</a> uses the device's factory passcode (usually printed on the device label),
      which is less secure but more convenient. <strong>Enhanced commissioning is recommended for production environments</strong>.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        Typical scenario: A user has commissioned a device on App A and now wants App B to also control this device.
        App A calls OpenCommissioningWindow to open a window, providing a temporary commissioning password (displayed to the user as a QR Code or numeric code).
        The user scans the QR Code or enters the numeric code in App B to complete secondary commissioning. The window closes automatically after timeout.
      </p>
      <p>
        Note: If the device already has an active commissioning window (WindowStatus is not 0), calling again returns a <a href="#status-busy">Busy (2)</a> error.
        You need to first call <a href="#cmd-0x02">RevokeCommissioning</a> to close the existing window, or wait for it to timeout.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">OpenBasicCommissioningWindow — Basic Commissioning Window (0x01)</h3>
  <p>
    Opens a Basic Commissioning Window. Unlike the enhanced method, basic commissioning uses the device's <strong>factory passcode</strong>
    (the pairing code printed on the device label) to establish a PASE secure channel. Simpler to operate, but less secure.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Requires BC Feature</div>
    <p>
      This command requires the device to support the <strong>BC (Basic Commissioning)</strong> Feature.
      You can confirm device support by reading the Feature Map. Devices that do not support this Feature can only open windows through
      <a href="#cmd-0x00">OpenCommissioningWindow</a> (enhanced method).
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommissioningTimeout</td>
          <td>uint16</td>
          <td>Number of seconds the window stays open. Automatically closes after timeout</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        Suitable for quickly adding a second controller in a home environment. For example, a user has commissioned a light bulb with Google Home
        and now wants Apple Home to also control it. After opening a basic commissioning window in the Google Home App,
        simply use the pairing code on the back of the bulb to commission in Apple Home.
      </p>
      <p>
        Since it uses a fixed factory passcode, <strong>it is not recommended for high-security scenarios</strong>.
        The factory password may be used multiple times, and if obtained by a third party, there is a risk of unauthorized commissioning.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">RevokeCommissioning — Close Commissioning Window(0x02)</h3>
  <p>
    Closes the currently open commissioning window. This command <strong>has no parameters</strong>.
    After a successful call, the device immediately stops accepting new commissioning requests, WindowStatus returns to <code>WindowNotOpen (0)</code>,
    and AdminFabricIndex and AdminVendorId reset to <code>null</code>.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Prerequisites</div>
    <p>
      Can only be called when a commissioning window is already open. If there is no active commissioning window (WindowStatus = 0),
      a <a href="#status-windownotopen">WindowNotOpen (4)</a> error is returned.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        Main use: An administrator opened a commissioning window but changed their mind, or discovered a security concern requiring immediate window closure.
        For example, in a commercial environment, an IT admin opens a window for a new colleague to commission, but the colleague is temporarily unavailable;
        the admin can proactively close the window to prevent unauthorized access.
      </p>
      <p>
        Automated systems can also call this command as a security response when detecting abnormal commissioning attempts.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The AdministratorCommissioning Cluster has 3 attributes describing the current commissioning window state and operator information.</p>

  <!-- Attribute Summary Table -->
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
          <td>WindowStatus</td>
          <td>CommissioningWindowStatusEnum</td>
          <td>Current commissioning window status</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>AdminFabricIndex</td>
          <td>fabric-idx (nullable)</td>
          <td>Fabric index of the administrator who opened the window</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>AdminVendorId</td>
          <td>vendor-id (nullable)</td>
          <td>Vendor ID of the administrator who opened the window</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Window Status (0x0000) ====== -->
  <h3 id="attr-detail-window">Window Status (0x0000)</h3>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>WindowStatus<br/><span class="attr-cn">Window Status</span></td>
          <td><a href="#enum-window-status">CommissioningWindowStatusEnum</a></td>
          <td>
            Indicates the device's current commissioning window status.
            <code>WindowNotOpen (0)</code> means no window is open, the device does not accept new commissioning requests;
            <code>EnhancedWindowOpen (1)</code> means the enhanced commissioning window is open;
            <code>BasicWindowOpen (2)</code> means the basic commissioning window is open.
            Only one window can be open at a time
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Monitoring Window Status</div>
    <p>
      In security-sensitive deployment environments, you can subscribe to WindowStatus attribute changes to monitor the device's commissioning window state in real time.
      Once an unexpected window opening is detected (e.g., <code>BasicWindowOpen</code>),
      you can immediately call <a href="#cmd-0x02">RevokeCommissioning</a> to close the window and send an alert.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Administrator Info (0x0001, 0x0002) ====== -->
  <h3 id="attr-detail-admin">Administrator Info (0x0001, 0x0002)</h3>
  <p>Records who opened the current commissioning window. Both attributes are <code>null</code> when the window is closed or not opened.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>AdminFabricIndex<br/><span class="attr-cn">Admin Fabric Index</span></td>
          <td>fabric-idx (nullable)</td>
          <td>
            Fabric index of the administrator who opened the commissioning window.
            Can be used to trace which Fabric's administrator performed the window-opening operation.
            <code>null</code> when no window is open
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>AdminVendorId<br/><span class="attr-cn">Admin Vendor ID</span></td>
          <td>vendor-id (nullable)</td>
          <td>
            Vendor ID of the administrator who opened the commissioning window.
            Identifies which manufacturer's App or controller performed the window-opening operation.
            <code>null</code> when no window is open
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Audit Purpose</div>
    <p>
      AdminFabricIndex and AdminVendorId used together provide a complete audit trail of "who" under "what identity" opened the commissioning window.
      This is highly valuable for security audits — for example, in an enterprise environment, when a device is unexpectedly commissioned,
      these two attributes can confirm which administrator and which platform performed the window-opening operation.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-window-status">CommissioningWindowStatusEnum</h3>
  <p>Indicates the device's current commissioning window status, used for the <code>WindowStatus</code> attribute.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">Commissioning window not open — device does not accept new commissioning requests (default state)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">EnhancedWindowOpen</span>
        <span class="enum-desc">Enhanced commissioning window open — uses a new PAKE verifier, higher security</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BasicWindowOpen</span>
        <span class="enum-desc">Basic commissioning window open — uses device factory passcode, requires BC Feature support</span>
      </div>
    </div>
  </div>

  <!-- ====== Status Codes ====== -->
  <h2 id="status-codes">Cluster Status Codes (StatusCode)</h2>
  <p>AdministratorCommissioning commands return results through the standard Status response. In addition to standard status codes, the following Cluster-specific status codes are defined:</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card" id="status-busy">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Busy</span>
        <span class="enum-desc">Device already has an active commissioning window. Only one commissioning window can be open at a time; close the existing window first or wait for it to timeout</span>
      </div>
    </div>
    <div class="enum-card" id="status-pake-error">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PAKEParameterError</span>
        <span class="enum-desc">Invalid PAKE parameters — PAKEPasscodeVerifier, Iterations, or Salt parameters are invalid (OpenCommissioningWindow only)</span>
      </div>
    </div>
    <div class="enum-card" id="status-windownotopen">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">No active commissioning window — attempted to call RevokeCommissioning with no active window</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Errors Quick Reference</div>
    <p>
      <strong>OpenCommissioningWindow returns Busy</strong> → A commissioning window is already open, call RevokeCommissioning to close it first then retry;
      <strong>OpenCommissioningWindow returns PAKEParameterError</strong> → Check the PAKE verifier generation parameters, confirm Iterations and Salt are within valid ranges;
      <strong>RevokeCommissioning returns WindowNotOpen</strong> → Window has already timed out and auto-closed, or was never opened; no action needed.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Attribute Data Example (Window Not Open)</h3>
  <p>Device in normal state with no active commissioning window:</p>
  <pre><code>{
  // --- Commissioning Window Status ---
  "0x0000": 0,                // WindowStatus = WindowNotOpen (no commissioning window open)

  // --- Administrator Info ---
  "0x0001": null,             // AdminFabricIndex = null (no administrator opened window)
  "0x0002": null              // AdminVendorId = null (no administrator opened window)
}</code></pre>

  <h3>Attribute Data Example (Window Open)</h3>
  <p>An administrator has opened a commissioning window using the enhanced method:</p>
  <pre><code>{
  // --- Commissioning Window Status ---
  "0x0000": 1,                // WindowStatus = EnhancedWindowOpen (enhanced commissioning window open)

  // --- Administrator Info ---
  "0x0001": 1,                // AdminFabricIndex = 1 (administrator from Fabric index 1 opened the window)
  "0x0002": 4996              // AdminVendorId = 0x1384（Vendor ID of the administrator who opened the window）
}</code></pre>

  <h3>OpenCommissioningWindow Interaction Example</h3>
  <p>Opening a commissioning window using the enhanced method:</p>
  <pre><code>// Commissioner → Device: Open enhanced commissioning window
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x00"              // OpenCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180,     // Auto-close after 180 seconds
      "PAKEPasscodeVerifier": "base64...",  // New PAKE verifier
      "discriminator": 3840,           // 12-bit device discriminator
      "iterations": 1000,             // PBKDF2 iteration count
      "salt": "base64..."             // PBKDF2 salt
    }
  }]
}

// Device → Commissioner: Successfully opened (Status = SUCCESS)
// This command has no dedicated response structure; results are returned via standard Status</code></pre>

  <h3>OpenBasicCommissioningWindow Interaction Example</h3>
  <p>Opening a commissioning window using the basic method (requires BC Feature):</p>
  <pre><code>// Commissioner → Device: Open basic commissioning window
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x01"              // OpenBasicCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180      // Auto-close after 180 seconds
    }
  }]
}

// Device → Commissioner: Successfully opened (Status = SUCCESS)</code></pre>

  <h3>RevokeCommissioning Interaction Example</h3>
  <p>Close the currently open commissioning window：</p>
  <pre><code>// Commissioner → Device: Close commissioning window
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x02"              // RevokeCommissioning
    },
    "commandFields": {}                // No parameters
  }]
}

// Device → Commissioner: Successfully closed (Status = SUCCESS)</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, Commissioner SDKs typically wrap the OpenCommissioningWindow call and automatically handle PAKE verifier generation.
      App developers usually only need to call the SDK's "multi-admin commissioning" interface, and the SDK handles PAKE parameter calculation and command sending at a lower level.
      However, understanding the underlying principles helps troubleshoot multi-admin commissioning failures.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Adding a Second Administrator (Multi-Platform Co-Management)</summary>
    <div class="scenario-content">
      <p><strong>Background</strong>: A user has commissioned a smart light with Google Home and now wants Apple Home to also control it.</p>
      <ol>
        <li>User finds the light's device detail page in the Google Home App</li>
        <li>Click "Share Device" or "Add to Other Platform"</li>
        <li>Google Home calls <a href="#cmd-0x00"><code>OpenCommissioningWindow (0x00)</code></a> under the hood,
            generating a new PAKE verifier and temporary Discriminator</li>
        <li>The App displays a commissioning QR Code (containing the temporary password and Discriminator)</li>
        <li>User opens Apple Home and scans the QR Code</li>
        <li>Apple Home uses the temporary password to establish a PASE channel and complete commissioning</li>
        <li>After commissioning completes, the window automatically closes, WindowStatus returns to <code>WindowNotOpen (0)</code></li>
      </ol>
      <p>
        At this point, the device belongs to two Fabrics (Google and Apple) simultaneously and can be independently controlled by both platforms.
        The device's AdminFabricIndex and AdminVendorId return to <code>null</code> after the window closes.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Alternative to Factory Reset</summary>
    <div class="scenario-content">
      <p><strong>Background</strong>: The device's App has been uninstalled or Fabric info is lost, but you don't want to factory reset (which would lose all configuration).</p>
      <ol>
        <li>If the device supports BC Feature and has a physical button or other local trigger:
          <ul>
            <li>Trigger local window opening by long-pressing the device button (some devices support this)</li>
            <li>Device enters basic commissioning window state (BasicWindowOpen)</li>
          </ul>
        </li>
        <li>If the device still belongs to a valid Fabric and has another administrator:
          <ul>
            <li>Use that administrator to call <a href="#cmd-0x01"><code>OpenBasicCommissioningWindow (0x01)</code></a></li>
            <li>Use the factory passcode on the back of the device to re-commission</li>
          </ul>
        </li>
        <li>After the new Commissioner completes commissioning, the device joins the new Fabric</li>
        <li>Old, no-longer-needed Fabrics can be removed via the OperationalCredentials Cluster</li>
      </ol>
      <p>
        <strong>Note</strong>: If administrators of all the device's Fabrics are inaccessible and the device does not support local window opening,
        then factory reset may be the only option. This is why configuring at least two administrators (Fabrics) as backup is recommended.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Security Audit (Detecting Abnormal Commissioning Windows)</summary>
    <div class="scenario-content">
      <p><strong>Background</strong>: An enterprise IoT administrator needs to ensure that Matter devices in the office have not been unexpectedly opened for commissioning.</p>
      <ol>
        <li>Periodically poll all devices' <code>WindowStatus (0x0000)</code> attribute</li>
        <li>If a device's WindowStatus is not <code>WindowNotOpen (0)</code>:
          <ul>
            <li>Read <code>AdminFabricIndex (0x0001)</code> to confirm which Fabric's administrator opened the window</li>
            <li>Read <code>AdminVendorId (0x0002)</code> to confirm which platform was used</li>
          </ul>
        </li>
        <li>If this window opening is not in the expected operation log:
          <ul>
            <li>Immediately call <a href="#cmd-0x02"><code>RevokeCommissioning (0x02)</code></a> to close the window</li>
            <li>Record audit log: device ID, window opening time, AdminFabricIndex, AdminVendorId</li>
            <li>Send an alert to the security team</li>
          </ul>
        </li>
        <li>Better approach: Subscribe to WindowStatus attribute changes for real-time detection instead of polling</li>
      </ol>
      <p>
        In high-security environments, it is recommended to completely disable the BC Feature (no basic commissioning support),
        allowing only the enhanced commissioning method to open windows — this way each window opening requires a new PAKE verifier, reducing the risk of malicious exploitation.
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
  'operational-credentials': {
    title: 'OperationalCredentials Cluster (0x003E)',
    description: 'Complete reference for Matter OperationalCredentials Cluster (0x003E) — NOC certificate management, Fabric credentials, CSR generation, device attestation (DAC), multi-admin, AddNOC/RemoveFabric command details and commissioning NOC flow examples.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>OperationalCredentials Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003E</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Fixed on <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    OperationalCredentials is the cornerstone of Matter device secure communication — responsible for managing device <strong>Node Operational Certificates (NOC)</strong> and <strong>Fabric credentials</strong>.
    Every Matter device that joins a Fabric (home network) needs to complete certificate issuance and installation through this Cluster.
    It is also the core of multi-admin scenarios — a single device can join multiple Fabrics simultaneously, with each Fabric independently managing its own NOC.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Concepts Quick Reference</div>
    <p>
      <strong>Fabric</strong>: A logical "home network" defined by a certificate system issued by the same Root CA. Devices within the same Fabric can communicate with each other.<br/>
      <strong>NOC (Node Operational Certificate)</strong>: A device's "identity card" within a Fabric, containing the device's NodeID and FabricID, issued by the Commissioner's (phone App) Root CA.<br/>
      <strong>ICAC</strong>: Intermediate CA certificate, optional. Adds an extra layer to the trust chain between Root CA and NOC.<br/>
      <strong>DAC (Device Attestation Certificate)</strong>: A certificate pre-installed at factory, proving "this is a legitimate Matter device." Used for device attestation during commissioning.<br/>
      <strong>CSR</strong>: Certificate Signing Request. After the device generates a key pair, it packages the public key as a CSR and sends it to the Commissioner, who uses their own CA to issue the NOC.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Data Structures</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The OperationalCredentials Cluster has 8 commands covering the complete flow of device attestation, CSR generation, NOC installation, and Fabric management.
    Most commands are automatically called by the Commissioner during commissioning; App developers typically do not need to send them manually.
    However, understanding these commands is crucial for debugging commissioning failures and implementing multi-admin.
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
          <td>AttestationRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Request device attestation (DAC signature)</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>AttestationResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>Return device attestation data</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>CertificateChainRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Request DAC or PAI certificate</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>CertificateChainResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>Return the requested certificate</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>CSRRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Request CSR generation (Certificate Signing Request)</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>CSRResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>Return CSR data</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>AddNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Install NOC, join new Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>UpdateNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Update current Fabric's NOC</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>UpdateFabricLabel</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Modify Fabric label</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0A">
          <td><a href="#cmd-0x0A"><code>0x0A</code></a></td>
          <td>RemoveFabric</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Remove Fabric (including NOC and trust root)</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0B">
          <td><a href="#cmd-0x0B"><code>0x0B</code></a></td>
          <td>AddTrustedRootCertificate</td>
          <td class="col-direction">C &rarr; S</td>
          <td>Add trusted Root CA certificate</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">About Command Direction</div>
    <p>
      <strong>C &rarr; S</strong>: Request commands from Commissioner (phone App) to device.<br/>
      <strong>S &rarr; C</strong>: Response commands from device to Commissioner.<br/>
      Response commands (AttestationResponse, CertificateChainResponse, CSRResponse) do not need to be sent manually; they are automatic replies from the device upon receiving a request.
      Replies to AddNOC / UpdateNOC / UpdateFabricLabel / RemoveFabric are uniformly <strong>NOCResponse</strong> (containing StatusCode and FabricIndex).
    </p>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">AttestationRequest — Device Attestation Request(0x00)</h3>
  <p>
    The first step of commissioning: verify whether the device is a legitimate Matter device. The Commissioner sends a random number (Nonce),
    and the device signs the Nonce and device information with the DAC (Device Attestation Certificate) private key to prove it holds a legitimate DAC.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AttestationNonce</td>
          <td>octstr (32 bytes)</td>
          <td>32-byte random number to prevent replay attacks</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Automatically executed during commissioning. After the Commissioner establishes a PASE connection via BLE or IP, it first sends AttestationRequest.
        If the device's DAC signature verification fails, the commissioning flow terminates immediately and reports device attestation failure.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">AttestationResponse — Device Attestation Response(0x01)</h3>
  <p>
    Automatic reply after the device receives AttestationRequest. Contains device attestation information and DAC signature.
    The Commissioner verifies the signature upon receipt, checks the DAC certificate chain (DAC &rarr; PAI &rarr; PAA), and confirms device legitimacy.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AttestationElements</td>
          <td>octstr</td>
          <td>TLV-encoded attestation information (including Certification Declaration, Nonce, Timestamp, etc.)</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>ECDSA-P256 signature of AttestationElements by the DAC private key</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">CertificateChainRequest — Certificate Chain Request(0x02)</h3>
  <p>
    Request the device to return the DAC (Device Attestation Certificate) or PAI (Product Attestation Intermediate Certificate).
    The Commissioner needs the complete certificate chain to verify the device attestation signature — DAC is issued by PAI, PAI is issued by PAA.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CertificateType</td>
          <td>CertificateChainTypeEnum</td>
          <td>1 = DAC certificate, 2 = PAI certificate (see <a href="#enum-cert-chain-type">enum definition</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        During commissioning, the Commissioner typically first requests the DAC (type=1), then the PAI (type=2),
        and then combines them with the locally or cloud-stored PAA (Product Attestation Authority) root certificate to complete the full trust chain verification.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">CertificateChainResponse — Certificate Chain Response(0x03)</h3>
  <p>
    The device returns the requested certificate. Certificate format is DER-encoded X.509 v3.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Certificate</td>
          <td>octstr</td>
          <td>DER-encoded X.509 certificate (DAC or PAI)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">CSRRequest — CSR Generation Request(0x04)</h3>
  <p>
    Instructs the device to generate a new Operational Key Pair and return a CSR (Certificate Signing Request) containing the public key.
    After receiving the CSR, the Commissioner uses its own Root CA to issue the NOC certificate, then writes it to the device via AddNOC.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CSRNonce</td>
          <td>octstr (32 bytes)</td>
          <td>32-byte random number, bound to the CSR to prevent replay</td>
        </tr>
        <tr>
          <td>IsForUpdateNOC</td>
          <td>bool</td>
          <td>Optional. When <code>true</code>, indicates this CSR is for updating an existing NOC (not first-time installation)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Executed in the commissioning flow after device attestation passes. The CSR contains the device's newly generated public key; the Commissioner uses its own CA to issue the NOC for this public key.
        The device retains the corresponding private key, which is used to prove identity when establishing subsequent CASE sessions.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">CSRResponse — CSR Response(0x05)</h3>
  <p>
    The device returns CSR data and DAC signature. The Commissioner verifies the signature and extracts the CSR for issuing the NOC.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCSRElements</td>
          <td>octstr</td>
          <td>TLV-encoded NOCSR structure (containing PKCS#10 CSR and CSRNonce)</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>ECDSA-P256 signature of NOCSRElements by the DAC private key</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">AddNOC — Install NOC(0x06)</h3>
  <p>
    A critical step in the commissioning flow: write the Commissioner-issued NOC certificate to the device, officially adding the device to a new Fabric.
    This is the command with the most parameters in the entire certificate installation flow. Upon successful execution, the device receives a new FabricIndex.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCValue</td>
          <td>octstr</td>
          <td>Yes</td>
          <td>Issued NOC certificate (Matter Operational Certificate, DER-encoded)</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>Optional</td>
          <td>Intermediate CA certificate. Not required if NOC is directly issued by Root CA</td>
        </tr>
        <tr>
          <td>IPKValue</td>
          <td>octstr (16 bytes)</td>
          <td>Yes</td>
          <td>Identity Protection Key, used for group communication encryption within the Fabric</td>
        </tr>
        <tr>
          <td>CaseAdminSubject</td>
          <td>uint64</td>
          <td>Yes</td>
          <td>CASE administrator's Subject (typically the Commissioner's NodeID). This node has administrative privileges on this Fabric</td>
        </tr>
        <tr>
          <td>AdminVendorId</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>Administrator's Vendor ID (identifies which manufacturer's App initiated commissioning)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">Return Value: NOCResponse</div>
    <p>
      After AddNOC executes, the device returns <strong>NOCResponse</strong>, containing:
      <code>StatusCode</code> (see <a href="#enum-noc-status">NodeOperationalCertStatusEnum</a>) and
      <code>FabricIndex</code> (newly assigned index, only has a value on success).
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        This is the final step of commissioning. The flow is: AddTrustedRootCertificate &rarr; CSRRequest &rarr; issue NOC with CA &rarr; AddNOC.
        After successful execution, the device establishes a new CASE session, and subsequent communication switches from PASE to CASE (certificate-based secure channel).
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">UpdateNOC — Update NOC(0x07)</h3>
  <p>
    Updates the current Fabric's NOC certificate. Typically used when the certificate is about to expire or key rotation is needed.
    Can only update the NOC of the Fabric that issued this command; cross-Fabric operations are not allowed.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCValue</td>
          <td>octstr</td>
          <td>Yes</td>
          <td>New NOC certificate (DER-encoded)</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>Optional</td>
          <td>New intermediate CA certificate</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Certificate rotation scenario: Commissioner first calls CSRRequest (IsForUpdateNOC=true) to get a new CSR,
        issues a new NOC with the CA, then calls UpdateNOC to write it. The old NOC is replaced, FabricIndex remains unchanged.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x09">UpdateFabricLabel — Update Fabric Label(0x09)</h3>
  <p>
    Modify the current Fabric's user-defined label (e.g., "Home", "Office"). Purely for display purposes, does not affect security or communication.
    Can only modify the label of the Fabric that issued the command.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string (max 32)</td>
          <td>New label. Empty string clears the label. Must not duplicate labels of other Fabrics on the same device</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Users name a Fabric in the App, such as labeling it "Home" or "Office," for easy identification in multi-admin scenarios.
        If the provided Label matches an existing Fabric label on the device, the device returns a LabelConflict error.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0A">RemoveFabric — Remove Fabric(0x0A)</h3>
  <p>
    Removes the specified Fabric from the device. Deletes the Fabric's corresponding NOC, ICAC, trusted root certificate, ACL entries, and all associated data.
    <strong>Can remove any Fabric</strong> (including other administrators'), making this a high-privilege operation.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>Fabric index to remove (obtained from the Fabrics attribute list)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">Dangerous Operation</div>
    <p>
      If the device has only joined one Fabric, executing RemoveFabric will return the device to an <strong>uncommissioned state</strong> (equivalent to factory reset).
      If the removed Fabric is the one you are on, the current CASE session will disconnect immediately.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        "Unpair" operation: When a user removes a device in the App, the App calls RemoveFabric to remove its own Fabric.
        If the device is also commissioned on other platforms (e.g., Google Home / Apple Home), those Fabrics are not affected.
        Extreme scenario: If the App loses connection to the device, a physical button factory reset can clear all Fabrics.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0B">AddTrustedRootCertificate — Add Trusted Root Certificate(0x0B)</h3>
  <p>
    Writes a Root CA certificate to the device. This is a prerequisite step for AddNOC — the device needs to know which Root CA to trust
    before it can accept NOCs issued by that CA. Each Fabric corresponds to one trust root.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RootCACertificate</td>
          <td>octstr</td>
          <td>Root CA certificate (Matter Operational Certificate format, DER-encoded)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info">
    <div class="callout-title">Execution Timing</div>
    <p>
      This command can only be executed in a PASE session (i.e., the device has not completed commissioning, using a temporary secure channel established with a Passcode),
      or within a Fabric that has an established CASE session. Trust roots cannot be written without a secure channel.
      This command has no response (returns a standard Status = Success status code on success, not a NOCResponse).
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The OperationalCredentials Cluster has 6 attributes, divided into Fabric information and capacity management groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NOCs</td>
          <td>list&lt;NOCStruct&gt;</td>
          <td><a href="#group-fabric">Fabric Info</a></td>
          <td>NOC and ICAC certificates for each Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Fabrics</td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td><a href="#group-fabric">Fabric Info</a></td>
          <td>List of joined Fabric descriptions</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SupportedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">Capacity Management</a></td>
          <td>Maximum number of Fabrics the device supports</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CommissionedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">Capacity Management</a></td>
          <td>Number of Fabrics currently joined</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>TrustedRootCertificates</td>
          <td>list&lt;octstr&gt;</td>
          <td><a href="#group-fabric">Fabric Info</a></td>
          <td>List of installed trusted root certificates</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>CurrentFabricIndex</td>
          <td>uint8</td>
          <td><a href="#group-capacity">Capacity Management</a></td>
          <td>Fabric index of the current operation context</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Fabric Info ====== -->
  <h3 id="group-fabric">Fabric Info (0x0000, 0x0001, 0x0004)</h3>
  <p>Describes the certificates, identities, and trust root information for each Fabric the device has joined.</p>

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
          <td>NOCs<br/><span class="attr-cn">NOC List</span></td>
          <td>list&lt;NOCStruct&gt;</td>
          <td>Each Fabric corresponds to one NOCStruct, containing that Fabric's NOC and ICAC certificates. <strong>Fabric-scoped</strong>: Each Fabric can only read its own entry, not other Fabrics' NOCs</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Fabrics<br/><span class="attr-cn">Fabric List</span></td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td>Description information for all joined Fabrics. Unlike NOCs, <strong>all Fabrics can read the complete list</strong> (but without certificate content, only public information like public key digests)</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>TrustedRootCertificates<br/><span class="attr-cn">Trusted Root Certificate List</span></td>
          <td>list&lt;octstr&gt;</td>
          <td>List of installed Root CA public key certificates (DER-encoded). Each Fabric corresponds to one trust root. Added via AddTrustedRootCertificate</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Fabric-scoped vs Globally Visible</div>
    <p>
      <code>NOCs</code> attribute is <strong>Fabric-scoped</strong> — Fabric A reading NOCs can only see its own NOC, not Fabric B's.
      This is a security design: NOC contains that Fabric's operational key public key, which should not be exposed to other Fabrics.<br/>
      <code>Fabrics</code> attribute is globally visible — any Fabric can see which Fabrics the device has joined and their public information (Root public key, VendorID, FabricID, NodeID, Label).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Capacity Management ====== -->
  <h3 id="group-capacity">Capacity Management (0x0002, 0x0003, 0x0005)</h3>
  <p>Describes the device's Fabric capacity and current operation context.</p>

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
          <td>SupportedFabrics<br/><span class="attr-cn">Max Fabrics</span></td>
          <td>uint8</td>
          <td>Maximum number of Fabrics the device can join simultaneously. The Matter specification requires support for at least <strong>5</strong>. This value is fixed at factory and cannot be modified</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CommissionedFabrics<br/><span class="attr-cn">Joined Fabric Count</span></td>
          <td>uint8</td>
          <td>Number of Fabrics currently actually joined. When <code>CommissionedFabrics &ge; SupportedFabrics</code>, the device cannot join new Fabrics (AddNOC returns TableFull)</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>CurrentFabricIndex<br/><span class="attr-cn">Current Fabric Index</span></td>
          <td>uint8</td>
          <td>Fabric index of the current communication session. Reading this attribute tells you "which Fabric am I." A value of 0 means no associated Fabric (e.g., in a PASE session)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Multi-Admin Capacity Check</div>
    <p>
      Before initiating multi-admin commissioning, read <code>SupportedFabrics</code> and <code>CommissionedFabrics</code> first
      to confirm available slots. If full, use RemoveFabric to remove an unused Fabric first.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-noc-status">NodeOperationalCertStatusEnum</h3>
  <p>Unified return status code for AddNOC, UpdateNOC, UpdateFabricLabel, and RemoveFabric commands (StatusCode field in NOCResponse).</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">Operation successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">InvalidPublicKey</span>
        <span class="enum-desc">Public key in NOC is invalid (format error or mismatch with CSR)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidNodeOpId</span>
        <span class="enum-desc">Node Operational ID (NodeID) in NOC is invalid</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">InvalidNOC</span>
        <span class="enum-desc">NOC certificate itself is invalid (signature verification failed, format error, expired, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">MissingCsr</span>
        <span class="enum-desc">Called AddNOC/UpdateNOC without first calling CSRRequest</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">TableFull</span>
        <span class="enum-desc">Fabric table is full (CommissionedFabrics = SupportedFabrics)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">InvalidAdminSubject</span>
        <span class="enum-desc">CaseAdminSubject value is invalid (not a valid NodeID)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">FabricConflict</span>
        <span class="enum-desc">Fabric conflict — a Fabric using the same Root CA already exists on the device</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">LabelConflict</span>
        <span class="enum-desc">Label conflict — new label in UpdateFabricLabel duplicates an existing Fabric label</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">InvalidFabricIndex</span>
        <span class="enum-desc">Specified FabricIndex does not exist (invalid index passed in RemoveFabric)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-cert-chain-type">CertificateChainTypeEnum</h3>
  <p>Specifies the certificate type to retrieve in the CertificateChainRequest command.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DACCertificate</span>
        <span class="enum-desc">Device Attestation Certificate — pre-installed at factory, proves device legitimacy</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PAICertificate</span>
        <span class="enum-desc">Product Attestation Intermediate Certificate — the issuer of DAC</span>
      </div>
    </div>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-noc">NOCStruct</h3>
  <p>Each element in the NOCs attribute list, containing a Fabric's NOC and optional ICAC certificate.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOC</td>
          <td>octstr</td>
          <td>Node Operational Certificate (DER-encoded). Contains the device's NodeID, FabricID, and operational public key in this Fabric</td>
        </tr>
        <tr>
          <td>ICAC</td>
          <td>octstr / null</td>
          <td>Intermediate CA certificate. null if NOC is directly issued by Root CA</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>Fabric index this entry belongs to</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-fabric-descriptor">FabricDescriptorStruct</h3>
  <p>Each element in the Fabrics attribute list, describing a Fabric's public information.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RootPublicKey</td>
          <td>octstr (65 bytes)</td>
          <td>This Fabric's Root CA public key (uncompressed EC P-256 point, 65 bytes)</td>
        </tr>
        <tr>
          <td>VendorID</td>
          <td>uint16</td>
          <td>Vendor ID of the manufacturer that issued this Fabric's credentials (e.g., Apple = 0x1349, Google = 0x6006)</td>
        </tr>
        <tr>
          <td>FabricID</td>
          <td>uint64</td>
          <td>Fabric identifier. Different Fabrics under the same Root CA are distinguished by this value</td>
        </tr>
        <tr>
          <td>NodeID</td>
          <td>uint64</td>
          <td>Device's node ID in this Fabric. The same device has different NodeIDs in different Fabrics</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>string (max 32)</td>
          <td>User-defined label (modified via UpdateFabricLabel), e.g., "Home", "Office"</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>Index number of this Fabric (unique within the device, used to specify in RemoveFabric)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">VendorID and FabricID</div>
    <p>
      When the same device is commissioned by both Apple Home and Google Home, there will be two FabricDescriptor entries — VendorIDs being Apple's and Google's respectively,
      with different FabricIDs and NodeIDs. The device uses FabricIndex to distinguish different Fabric contexts, including ACL permissions and subscriptions.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>The following is the OperationalCredentials attribute read result of a Matter device that has joined one Fabric (excluding NOCs, as Fabric-scoped restriction only allows reading your own):</p>

  <pre><code>{
  // --- Fabric Info ---
  "0x0001": [{                    // Fabrics — Joined Fabric list
    "rootPublicKey": "BNkX2...",  // Root CA public key (Base64)
    "vendorID": 65521,            // VendorID = 0xFFF1 (test vendor)
    "fabricID": 1,                // FabricID = 1
    "nodeID": 1234,               // This device's NodeID in this Fabric
    "label": "Home",              // User-defined label
    "fabricIndex": 1              // Fabric index
  }],

  // --- Capacity & Count ---
  "0x0002": 5,                    // SupportedFabrics = 5 (max 5 Fabrics)
  "0x0003": 1,                    // CommissionedFabrics = 1 (currently joined 1)

  // --- Trusted Root Certificates ---
  "0x0004": [                     // TrustedRootCertificates — Trusted Root CA list
    "MIIBnT..."                   // One Root CA certificate per Fabric (Base64 DER)
  ],

  // --- Current Context ---
  "0x0005": 1                     // CurrentFabricIndex = 1 (current operation's Fabric)
}</code></pre>

  <h3>CSR Flow Interaction Example</h3>
  <p>Interaction during commissioning where the Commissioner requests the device to generate a CSR:</p>
  <pre><code>// 1. Commissioner → Device: Request CSR generation
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x04"          // CSRRequest
    },
    "commandFields": {
      "CSRNonce": "dGhpcyBpcyBhIDMyLWJ5dGUgbm9uY2U="  // 32-byte random number (Base64)
    }
  }]
}

// Device → Commissioner: Return CSR
{
  "NOCSRElements": "MIHd...",      // NOCSR structure (containing CSR + CSRNonce)
  "attestationSignature": "MEU..." // Device signs with DAC private key
}</code></pre>

  <h3>AddNOC Interaction Example</h3>
  <p>Commissioner writes the issued NOC to the device:</p>
  <pre><code>// 2. Commissioner → Device: Write the signed NOC
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x06"          // AddNOC
    },
    "commandFields": {
      "NOCValue": "MIIB...",       // Issued NOC certificate (DER Base64)
      "ICACValue": "MIIB...",      // Optional intermediate CA certificate
      "IPKValue": "wMs7...",       // 16-byte Identity Protection Key
      "caseAdminSubject": 112233,  // CASE administrator's Subject (NodeID)
      "adminVendorId": 65521       // Administrator's VendorID
    }
  }]
}

// Device → Commissioner: Return result
{
  "statusCode": 0,                 // OK
  "fabricIndex": 1                 // Newly assigned FabricIndex
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      In practice, these commands are typically orchestrated automatically by the platform's Commissioning SDK (e.g., Android CHIPTool, iOS Matter.framework).
      However, when debugging commissioning failures, understanding each step's parameter meaning is crucial — especially issues like CSRNonce mismatch, NOC signature verification failure, and Fabric table full.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: First Commissioning — Complete NOC Installation Flow</summary>
    <div class="scenario-content">
      <p>A newly manufactured Matter device being commissioned by a phone App for the first time, the complete certificate installation flow is:</p>
      <ol>
        <li>App establishes a <strong>PASE session</strong> with the device via BLE or SoftAP (using the device's Passcode)</li>
        <li>App sends <code>AttestationRequest (0x00)</code>, verifies DAC signature upon receiving <code>AttestationResponse</code></li>
        <li>App sends <code>CertificateChainRequest (0x02, type=1)</code> to get DAC certificate</li>
        <li>App sends <code>CertificateChainRequest (0x02, type=2)</code> to get PAI certificate</li>
        <li>App verifies the complete trust chain: DAC &rarr; PAI &rarr; PAA (PAA obtained from DCL or locally)</li>
        <li>App sends <code>AddTrustedRootCertificate (0x0B)</code> to write its own Root CA certificate to the device</li>
        <li>App sends <code>CSRRequest (0x04)</code>, device generates key pair and returns CSR</li>
        <li>App's CA issues NOC certificate based on the CSR</li>
        <li>App sends <code>AddNOC (0x06)</code> to write NOC, ICAC (optional), and IPK to the device</li>
        <li>Device returns NOCResponse (StatusCode=OK, FabricIndex=1)</li>
        <li>PASE session ends, App and device establish a <strong>CASE session</strong> (based on NOC certificate)</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Multi-Admin — Same Device Joining Multiple Platforms</summary>
    <div class="scenario-content">
      <p>User first commissions with Apple Home, then commissions the same device with Google Home:</p>
      <ol>
        <li>Apple Home has completed commissioning, device has Fabric 1 (Apple's Root CA, VendorID, NodeID)</li>
        <li>User opens the "multi-admin pairing window" in Apple Home (via Administrator Commissioning Cluster's OpenCommissioningWindow)</li>
        <li>Google Home discovers the device and connects via a new PASE session</li>
        <li>Google Home repeats steps 2-10 of Scenario 1, using Google's own Root CA to issue NOC</li>
        <li>Device now has Fabric 1 (Apple) and Fabric 2 (Google), operating independently</li>
        <li>Reading the <code>Fabrics</code> attribute shows two FabricDescriptorStruct entries</li>
        <li>Reading <code>CommissionedFabrics</code> returns 2, <code>SupportedFabrics</code> remains the factory value (e.g., 5)</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Removing a Fabric — Unpairing or Factory Reset</summary>
    <div class="scenario-content">
      <p>User wants to remove a device from a specific platform:</p>
      <ol>
        <li>App reads <code>Fabrics (0x0001)</code> to get all Fabric list</li>
        <li>App reads <code>CurrentFabricIndex (0x0005)</code> to confirm its own FabricIndex</li>
        <li>App sends <code>RemoveFabric (0x0A)</code> with its own FabricIndex</li>
        <li>Device deletes the Fabric's NOC, Root certificate, ACL, and all associated data</li>
        <li>If other Fabrics remain on the device, it continues operating normally; if this was the last Fabric, the device returns to uncommissioned state</li>
      </ol>
      <p>
        <strong>Note</strong>: RemoveFabric can specify any FabricIndex (not limited to your own Fabric),
        but typically only administrator privileges (Administrator ACL) allow execution.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Certificate Rotation — Updating an Existing NOC</summary>
    <div class="scenario-content">
      <p>When the NOC is approaching expiration or key rotation is needed due to security policy:</p>
      <ol>
        <li>App sends <code>CSRRequest (0x04)</code> with <code>IsForUpdateNOC = true</code></li>
        <li>Device generates new key pair and returns new CSR</li>
        <li>App's CA issues new NOC based on the new CSR (keeping the same NodeID and FabricID)</li>
        <li>App sends <code>UpdateNOC (0x07)</code> to write the new NOC</li>
        <li>Old NOC is replaced, FabricIndex remains unchanged, CASE session needs to be re-established</li>
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

  .col-direction {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: #6b7280;
    white-space: nowrap;
  }

  :global(.dark) .col-direction {
    color: #9ca3af;
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
  'group-key-management': {
    title: 'GroupKeyManagement Cluster (0x003F)',
    description: 'Complete reference for Matter GroupKeyManagement Cluster (0x003F) — multicast communication key management, KeySetWrite/Read/Remove commands, GroupKeyMap mapping, GroupTable query, key rotation and CacheAndSync feature.',
    prev: undefined,
    next: undefined,
    content: `<h1>GroupKeyManagement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003F</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: <code>Endpoint 0</code> (Root Endpoint)
  </p>
  <p>
    GroupKeyManagement manages the encryption keys used for multicast communication in Matter networks.
    When you need to send commands to a group of devices simultaneously (e.g., "turn off all living room lights"), devices need to share a set of symmetric keys to encrypt and verify multicast messages.
    This Cluster is used to write, read, delete, and maintain these key sets.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">CacheAndSync Feature (CS)</div>
    <p>
      GroupKeyManagement defines a <strong>CacheAndSync (CS)</strong> Feature.
      When CS is enabled, the device supports caching and syncing trusted root certificates from the Distributed Compliance Ledger (DCL),
      and allows the use of the <code>CacheAndSync</code> security policy. Devices without CS can only use the <code>TrustFirst</code> policy.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Data Structures</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Types</a>
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
    The GroupKeyManagement Cluster has 4 commands for managing the complete lifecycle of key sets (KeySets):
    write, read, delete, and enumerate. Click a command ID in the table below to jump to its detailed description.
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
          <td>KeySetWrite</td>
          <td>Client &rarr; Server</td>
          <td>Write or update a key set</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>KeySetRead</td>
          <td>Client &rarr; Server</td>
          <td>Read specified key set information</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>KeySetRemove</td>
          <td>Client &rarr; Server</td>
          <td>Delete a key set</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>KeySetReadAllIndices</td>
          <td>Client &rarr; Server</td>
          <td>List all key set IDs for the current Fabric</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">KeySetWrite — Write Key Set(0x00)</h3>
  <p>
    Writes a complete key set (GroupKeySet) to the device. If the specified GroupKeySetID already exists, it is updated.
    Each key set contains up to three Epoch keys to support smooth transitions during key rotation.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySet</td>
          <td><a href="#struct-groupkeyset">GroupKeySetStruct</a></td>
          <td>Complete key set structure, containing ID, security policy, and up to three groups of Epoch keys</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Key Security</div>
    <p>
      Written EpochKeys are sensitive data. The device will not return plaintext keys after storage —
      when reading via KeySetRead, EpochKey fields return <code>null</code>, only EpochStartTime is visible.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The Commissioner (e.g., phone App) needs to write shared keys to all devices participating in multicast
        via KeySetWrite before establishing multicast communication. Typically called after successful device commissioning and before joining a group.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">KeySetRead — Read Key Set(0x01)</h3>
  <p>
    Reads key set information for the specified ID. Returns <strong>KeySetReadResponse</strong>,
    containing the key set's metadata (ID, security policy, Epoch start times) but not the plaintext keys.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>Key set ID to read</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>KeySetReadResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySet</td>
          <td><a href="#struct-groupkeyset">GroupKeySetStruct</a></td>
          <td>Key set information (EpochKey fields are null, plaintext not returned)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Called when the management side needs to confirm whether a key set has been successfully written, or to check its security policy and Epoch time windows.
        Commonly used to check the current key set status before key rotation.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">KeySetRemove — Delete Key Set(0x03)</h3>
  <p>
    Deletes the key set with the specified ID. Before deletion, ensure no GroupKeyMap entries still reference this key set,
    otherwise the associated groups will be unable to send or receive encrypted multicast messages properly.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>Key set ID to delete (cannot be 0; ID 0 is the IPK key set and cannot be deleted)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">IPK Cannot Be Deleted</div>
    <p>
      The key set with GroupKeySetID <code>0</code> is the Identity Protection Key (IPK),
      automatically created when the Fabric is established. Attempting to delete ID 0 returns an <code>INVALID_COMMAND</code> error.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After key rotation is complete, when old key sets are no longer referenced by any group, they can be cleaned up via KeySetRemove to free device storage space.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">KeySetReadAllIndices — List All Key Sets(0x04)</h3>
  <p>
    Lists all stored key set IDs under the current Fabric. Returns <strong>KeySetReadAllIndicesResponse</strong>.
    No parameters required.
  </p>

  <h4>KeySetReadAllIndicesResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetIDs</td>
          <td>list&lt;uint16&gt;</td>
          <td>List of all key set IDs owned by the current Fabric</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Before performing key audit or rotation, the management side calls this command to get all key set IDs on the device,
        then reviews details one by one via KeySetRead to decide which need updating or deletion.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The GroupKeyManagement Cluster has 4 application attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Writable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>GroupKeyMap</td>
          <td>list&lt;GroupKeyMapStruct&gt;</td>
          <td class="col-required">Yes</td>
          <td>Mapping of group IDs to key sets</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>GroupTable</td>
          <td>list&lt;GroupTableStruct&gt;</td>
          <td class="col-optional">No</td>
          <td>Information table of all groups on the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxGroupsPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">No</td>
          <td>Maximum number of groups per Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>MaxGroupKeysPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">No</td>
          <td>Maximum number of key sets per Fabric</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- GroupKeyMap -->
  <h3 id="attr-0x0000">GroupKeyMap — Group Key Mapping(0x0000)</h3>
  <p>
    This is the most core attribute of this Cluster. It defines the mapping of "which group uses which key set."
    Each entry associates a GroupId with a GroupKeySetID, and the device uses this mapping to select the key for encrypting and decrypting multicast messages.
  </p>
  <p>
    <strong>Writable attribute</strong> — the management side can write directly to establish or modify mappings.
    A key set can be shared by multiple groups, or each group can be assigned an independent key set.
  </p>

  <h4>GroupKeyMapStruct Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>Group ID (corresponding to a group registered in the Groups Cluster)</td>
        </tr>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>Associated key set ID (must be one already written via KeySetWrite)</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Owning Fabric index (auto-filled, Fabric-isolated)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- GroupTable -->
  <h3 id="attr-0x0001">GroupTable — Group Information Table(0x0001)</h3>
  <p>
    Read-only attribute displaying detailed information for all registered groups on the device.
    This table is automatically maintained by the device based on Groups Cluster operations and GroupKeyMap; it cannot be written to directly.
  </p>

  <h4>GroupTableStruct Structure</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>Group ID</td>
        </tr>
        <tr>
          <td>Endpoints</td>
          <td>list&lt;endpoint-no&gt;</td>
          <td>List of Endpoints included in this group</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>Group name (max 16 bytes, optional)</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>Owning Fabric index</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- MaxGroupsPerFabric & MaxGroupKeysPerFabric -->
  <h3 id="attr-0x0002">MaxGroupsPerFabric — Max Groups(0x0002)</h3>
  <p>
    Read-only attribute indicating the maximum number of groups each Fabric can register.
    This is a hardware/firmware limit of the device; the management side should reference this value when planning multicast topology.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">MaxGroupKeysPerFabric — Max Key Sets(0x0003)</h3>
  <p>
    Read-only attribute indicating the maximum number of key sets each Fabric can store.
    Including the IPK (ID = 0). If the value is 3, then besides the IPK, 2 custom key sets can be stored.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Capacity Planning</div>
    <p>
      Before writing key sets or adding group mappings, first read <code>MaxGroupsPerFabric</code> and
      <code>MaxGroupKeysPerFabric</code> to confirm the device has available space.
      Write operations exceeding the limit return a <code>RESOURCE_EXHAUSTED</code> error.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-groupkeyset">GroupKeySetStruct (Key Set Structure)</h3>
  <p>
    Describes a complete multicast key set. Contains the key set ID, security policy, and up to three groups of Epoch keys with their start times.
    Three Epoch slots support key rotation — the device can hold both old and new keys simultaneously for seamless switching.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>Key set unique identifier. <code>0</code> is IPK (Identity Protection Key), automatically managed by the Fabric</td>
        </tr>
        <tr>
          <td>GroupKeySecurityPolicy</td>
          <td><a href="#enum-security-policy">GroupKeySecurityPolicyEnum</a></td>
          <td>Security policy — TrustFirst or CacheAndSync</td>
        </tr>
        <tr>
          <td>EpochKey0</td>
          <td>octstr (16 bytes) / null</td>
          <td>First Epoch key (128-bit AES key). Returns null when read</td>
        </tr>
        <tr>
          <td>EpochStartTime0</td>
          <td>epoch-us / null</td>
          <td>Effective time of EpochKey0 (microsecond-level UTC timestamp)</td>
        </tr>
        <tr>
          <td>EpochKey1</td>
          <td>octstr (16 bytes) / null</td>
          <td>Second Epoch key. Used during key rotation transition period</td>
        </tr>
        <tr>
          <td>EpochStartTime1</td>
          <td>epoch-us / null</td>
          <td>Effective time of EpochKey1</td>
        </tr>
        <tr>
          <td>EpochKey2</td>
          <td>octstr (16 bytes) / null</td>
          <td>Third Epoch key. The final key after rotation is complete</td>
        </tr>
        <tr>
          <td>EpochStartTime2</td>
          <td>epoch-us / null</td>
          <td>Effective time of EpochKey2</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Epoch Key Rotation Mechanism</div>
    <p>
      Three Epoch slots are arranged in chronological order: EpochStartTime0 &lt; EpochStartTime1 &lt; EpochStartTime2.
      The device automatically switches to the new key when the current time reaches the corresponding EpochStartTime.
      During the transition window, the device can simultaneously decrypt received messages with the old key and encrypt sent messages with the new key,
      ensuring communication is not interrupted as devices in the group gradually update their keys.
    </p>
  </div>

  <!-- ====== Enum Types ====== -->
  <h2 id="enums">Enum Types</h2>

  <h3 id="enum-security-policy">GroupKeySecurityPolicyEnum (Security Policy)</h3>
  <p>Defines the security verification policy used by the key set. Determines how the device verifies the trustworthiness of multicast message sources.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">TrustFirst</span>
        <span class="enum-desc">Trust First — the first received multicast key is trusted. Suitable for most scenarios, the default policy</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CacheAndSync</span>
        <span class="enum-desc">Cache and Sync — requires verifying the certificate chain from DCL before trusting. Higher security, requires device CS feature support</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CacheAndSync Prerequisites</div>
    <p>
      Only after the <strong>CS</strong> bit is enabled in the device's <code>FeatureMap</code>
      can the <code>CacheAndSync</code> policy be used in KeySetWrite.
      Writing a CacheAndSync key set to a device that does not support CS returns <code>INVALID_COMMAND</code>.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The GroupKeyManagement Cluster declares the device's supported advanced capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CS（CacheAndSync）</span>
        <span class="enum-desc">Cache and Sync — supports syncing trusted root certificates from DCL, allows CacheAndSync security policy</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read results of the GroupKeyManagement Cluster on a device with two configured groups:</p>

  <pre><code>{
  // --- GroupKeyMap (Key Mapping Table) ---
  "0x0000": [
    {
      "GroupId": 1,
      "GroupKeySetID": 1,
      "FabricIndex": 1
    },
    {
      "GroupId": 2,
      "GroupKeySetID": 1,
      "FabricIndex": 1
    }
  ],

  // --- GroupTable (Group Info Table, Read-only) ---
  "0x0001": [
    {
      "GroupId": 1,
      "Endpoints": [1, 2],
      "GroupName": "Living Room Lights",
      "FabricIndex": 1
    },
    {
      "GroupId": 2,
      "Endpoints": [3],
      "GroupName": "Bedroom Lights",
      "FabricIndex": 1
    }
  ],

  // --- Capacity Limits ---
  "0x0002": 4,               // MaxGroupsPerFabric = 4
  "0x0003": 3                // MaxGroupKeysPerFabric = 3
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      GroupKeyMap is the only writable attribute — write to it to bind groups and key sets.
      GroupTable is read-only, automatically calculated by the device based on Groups Cluster and GroupKeyMap.
      Key sets themselves are managed through KeySetWrite / KeySetRead commands, not through attribute read/write.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-setup">Scenario 1: Establishing Multicast Keys for a Group of Devices</h3>
  <p>When you need multiple devices to join the same group and support multicast communication:</p>
  <ol>
    <li>First read the target device's <code>MaxGroupKeysPerFabric (0x0003)</code> to confirm key set quota availability</li>
    <li>Write the same key set (same GroupKeySetID and EpochKey) to each target device via <code>KeySetWrite (0x00)</code></li>
    <li>Write the <code>GroupKeyMap (0x0000)</code> attribute on each device, mapping GroupId to the just-written GroupKeySetID</li>
    <li>Add the device to the corresponding group via the Groups Cluster's AddGroup command</li>
    <li>Read <code>GroupTable (0x0001)</code> to confirm group information and Endpoint mapping are correct</li>
    <li>Now you can send multicast commands to the group, and all member devices can decrypt and execute using the shared key</li>
  </ol>

  <h3 id="scenario-rotation">Scenario 2: Key Rotation</h3>
  <p>Regularly rotating multicast keys is a security best practice. Matter's three-Epoch mechanism allows rotation to proceed seamlessly:</p>
  <ol>
    <li>List all current key set IDs via <code>KeySetReadAllIndices (0x04)</code></li>
    <li>Read the target key set via <code>KeySetRead (0x01)</code> and check the current Epoch time windows</li>
    <li>Generate a new 128-bit AES key as the next Epoch key</li>
    <li>Update the key set via <code>KeySetWrite (0x00)</code> — keep the currently active EpochKey, write the new key into the next Epoch slot, and set a future EpochStartTime</li>
    <li>Write the same updated key set to each device in the group sequentially</li>
    <li>After all devices have been updated, when the new EpochStartTime arrives, they automatically switch to the new key</li>
    <li>After confirming all devices have switched, old Epoch keys no longer in use can be removed (overwritten in the next KeySetWrite)</li>
  </ol>

  <div class="callout callout-tip">
    <div class="callout-title">Rotation Key Points</div>
    <p>
      The key to key rotation is <strong>write to all devices first, then let the new key take effect</strong>.
      If some devices still hold the old key while others have switched to the new key, multicast communication between these devices will be interrupted.
      Therefore, it is recommended to set EpochStartTime far enough in the future to ensure all devices have time to complete the update.
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
