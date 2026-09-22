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

  <!-- ====== Feature 特性 ====== -->
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

  <!-- ====== 命令（Commands）====== -->
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

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ScanNetworks — Scan Networks (0x00)</h3>
  <p>
    Instructs the device to scan for available Wi-Fi or Thread networks nearby. This is typically the first step in the commissioning flow — showing users the list of networks they can connect to.
    The device returns <a href="#cmd-0x01">ScanNetworksResponse</a>。
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
          <td>否</td>
          <td><code>null</code> = scan all networks; specified value = scan only matching SSID (Wi-Fi only)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
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
    The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>。
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
          <td>是</td>
          <td>SSID of the target Wi-Fi network (max 32 bytes)</td>
        </tr>
        <tr>
          <td>Credentials</td>
          <td>OctetString</td>
          <td>是</td>
          <td>Wi-Fi password (max 64 bytes)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>Commissioning progress marker</td>
        </tr>
        <tr>
          <td>NetworkIdentity</td>
          <td>OctetString</td>
          <td>否</td>
          <td>Network identity (Matter 1.3+, for Per-Device Credentials)</td>
        </tr>
        <tr>
          <td>ClientIdentifier</td>
          <td>OctetString</td>
          <td>否</td>
          <td>Client identifier (Matter 1.3+, for Per-Device Credentials)</td>
        </tr>
        <tr>
          <td>PossessionNonce</td>
          <td>OctetString</td>
          <td>否</td>
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
    containing PAN ID, Channel, Network Key, and other information. The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>。
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
          <td>是</td>
          <td>Thread Operational Dataset (TLV-encoded complete network parameters)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
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
    Remove stored network credentials from the device. Specify the network to remove via NetworkID. The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>。
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
          <td>是</td>
          <td>Network ID to remove (SSID for Wi-Fi, Extended PAN ID for Thread)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
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
    This is the step in the commissioning flow that makes the device "actually go online." The device returns <a href="#cmd-0x07">ConnectNetworkResponse</a>。
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
          <td>是</td>
          <td>Network ID to connect to (must be a previously stored network)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
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
    The device returns <a href="#cmd-0x05">NetworkConfigResponse</a>。
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
          <td>是</td>
          <td>Network ID to reposition</td>
        </tr>
        <tr>
          <td>NetworkIndex</td>
          <td>uint8</td>
          <td>是</td>
          <td>Target position index (0 = highest priority)</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
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

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>NetworkCommissioning Cluster attributes describe the capabilities and current state of the network interface. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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

  <!-- 属性分组详解 -->

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
          <td>Whether the network interface is enabled。<code>false</code> 时设备不会连接任何网络，扫描和连接命令也可能被拒绝</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>LastNetworkingStatus<br/><span class="attr-cn">Last Operation Status</span></td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a> / null</td>
          <td>Result status of the last network operation码。<code>null</code> 表示尚未执行过任何网络操作</td>
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
          <td>设备List of supported Wi-Fi bands（如 2.4GHz、5GHz）</td>
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
          <td>设备支持的 Thread protocol version号</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举与结构体 ====== -->
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

  <!-- ====== 标准示例 ====== -->
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
  "networkIndex": 0              // 存储在索引 0
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Both SSID and password are <strong>OctetString</strong> (byte arrays) in the Matter protocol, typically transmitted using Base64 encoding.
      The <code>"TXlIb21lV2lGaQ=="</code> in the example above decodes to <code>"MyHomeWiFi"</code>.
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
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
        <li>读取 <code>FeatureMap</code> 确认是 Thread 设备（Bit 1 = 1）</li>
        <li>Commissioner 从 Thread Border Router 获取 Operational Dataset</li>
        <li>发送 <a href="#cmd-0x03"><code>AddOrUpdateThreadNetwork (0x03)</code></a> 写入 Dataset</li>
        <li>发送 <a href="#cmd-0x06"><code>ConnectNetwork (0x06)</code></a> 指示设备加入 Thread 网络</li>
        <li>设备加入 Thread 网络后，Commissioner 通过 Thread 网络继续配网</li>
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
    It does not handle specific network credentials (that is <a href="/clusters/network-commissioning/">NetworkCommissioning</a>'s job),
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

  <!-- ====== 命令（Commands）====== -->
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

  <!-- ====== 命令详解 ====== -->
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
          <td>Commissioning progress marker，写入设备的 Breadcrumb 属性</td>
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

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The GeneralCommissioning Cluster has 5 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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

  <!-- ====== 配网追踪（0x0000）====== -->
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

  <!-- ====== 基础配网信息（0x0001）====== -->
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

  <!-- ====== 法规配置（0x0002, 0x0003）====== -->
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

  <!-- ====== 连接能力（0x0004）====== -->
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

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-error">CommissioningErrorEnum</h3>
  <p>所有 GeneralCommissioning 命令的响应都包含此错误码，用于表示Operation result。</p>

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

  <!-- ====== 示例数据 ====== -->
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

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Standard Commissioning Flow (Normal Path)</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner establishes a PASE secure channel with the device via BLE</li>
        <li>读取 <code>BasicCommissioningInfo (0x0001)</code> 获取 Fail-Safe timeout parameters</li>
        <li>发送 <a href="#cmd-0x00"><code>ArmFailSafe (0x00)</code></a>，ExpiryLengthSeconds = 60，Breadcrumb = 1</li>
        <li>发送 <a href="#cmd-0x02"><code>SetRegulatoryConfig (0x02)</code></a>，设置国家代码和法规区域，Breadcrumb = 2</li>
        <li>通过 <a href="/clusters/network-commissioning/">NetworkCommissioning (0x0031)</a> 配置网络凭据并连接</li>
        <li>安装 NOC 证书（OperationalCredentials Cluster）</li>
        <li>设置 ACL 权限（AccessControl Cluster）</li>
        <li>发送 <a href="#cmd-0x04"><code>CommissioningComplete (0x04)</code></a> 提交所有变更</li>
        <li>配网完成，设备正式加入 Fabric</li>
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
    description: 'Matter AdministratorCommissioning Cluster(0x003C)完整参考 — OpenCommissioningWindow / OpenBasicCommissioningWindow / RevokeCommissioning 命令详解、配网窗口控制、Feature Map、状态码与安全审计场景。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>AdministratorCommissioning Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003C</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    AdministratorCommissioning 负责控制设备的<strong>配网窗口</strong>（Commissioning Window）的开启与关闭。
    当一个设备已经加入了某个 Fabric（已被配网），想要让<em>新的</em>管理员也能配网这台设备时，
    就需要通过这个 Cluster 打开配网窗口。它不负责配网流程本身（那是
    <a href="/clusters/general-commissioning/">GeneralCommissioning</a> 的事），
    而是控制「设备是否接受新的配网请求」这个开关。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      如果把设备比作一栋房子，AdministratorCommissioning 就是门口的<strong>门禁系统</strong>。
      房子的主人（已有管理员）可以选择暂时打开门禁，让新的住户（新管理员）进来完成入住手续（配网）。
      <strong>OpenCommissioningWindow</strong> 是换了一把新门锁密码再开门（更安全），
      <strong>OpenBasicCommissioningWindow</strong> 是直接用现有密码开门（更方便），
      <strong>RevokeCommissioning</strong> 则是随时把门关上。
    </p>
  </div>

  <!-- Feature Map -->
  <h3>Feature Map</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Bit</th><th>代码</th><th>Name</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>BC</td>
          <td>Basic Commissioning</td>
          <td>支持基础配网方法 —— 即 <a href="#cmd-0x01">OpenBasicCommissioningWindow</a> 命令。如果设备不支持此 Feature，则只能通过增强配网方式开窗</td>
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
    <a href="#status-codes">状态码</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    AdministratorCommissioning Cluster 共有 3 个命令，分别用于开启增强配网窗口、开启基础配网窗口和关闭配网窗口。
    这三个命令都没有专属的响应结构体，通过通用的 Status 响应返回结果。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>使用新的 PAKE 验证器开启增强配网窗口</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>OpenBasicCommissioningWindow</td>
          <td>BC</td>
          <td>使用现有密码开启基础配网窗口</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>RevokeCommissioning</td>
          <td>--</td>
          <td>关闭当前已开启的配网窗口</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">OpenCommissioningWindow —— 增强配网开窗(0x00)</h3>
  <p>
    开启增强配网窗口（Enhanced Commissioning Window）。调用者需要提供一个<strong>全新的 PAKE 验证器</strong>，
    新的 Commissioner 将使用这个验证器而非设备出厂密码来建立 PASE 安全通道。
    这是最安全的开窗方式 —— 每次开窗都使用一次性的密码，即使密码被截获也无法用于下一次配网。
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
          <td>窗口保持打开的秒数。超时后窗口自动关闭。范围通常为 <code>60 ~ 900</code> 秒</td>
        </tr>
        <tr>
          <td>PAKEPasscodeVerifier</td>
          <td>octstr</td>
          <td>新的 PAKE 密码验证器（Verifier）。由 Commissioner 根据新的 passcode 计算生成</td>
        </tr>
        <tr>
          <td>Discriminator</td>
          <td>uint16</td>
          <td>12-bit 设备识别码，用于新 Commissioner 在发现阶段识别目标设备</td>
        </tr>
        <tr>
          <td>Iterations</td>
          <td>uint32</td>
          <td>PBKDF2 迭代次数，范围 <code>1000 ~ 100000</code></td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>octstr</td>
          <td>PBKDF2 盐值，长度 <code>16 ~ 32</code> 字节</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">增强配网 vs 基础配网</div>
    <p>
      增强配网每次开窗都会生成新的 PAKE 验证器，旧密码完全失效。
      这意味着即便有人嗅探到了本次配网过程中的 PASE 握手数据，也无法用于破解下一次配网。
      相比之下，<a href="#cmd-0x01">OpenBasicCommissioningWindow</a> 使用设备出厂密码（通常印在设备标签上），
      安全性较低但操作更方便。<strong>生产环境建议优先使用增强配网</strong>。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        典型场景：用户在 App A 上已经配网了设备，现在希望 App B 也能控制这台设备。
        App A 调用 OpenCommissioningWindow 开窗，提供一个临时的配网密码（以 QR Code 或数字代码的形式展示给用户）。
        用户在 App B 中扫描该 QR Code 或输入数字代码即可完成二次配网。窗口会在超时后自动关闭。
      </p>
      <p>
        注意：如果设备已经有一个活跃的配网窗口（WindowStatus 不为 0），再次调用会返回 <a href="#status-busy">Busy (2)</a> 错误。
        需要先调用 <a href="#cmd-0x02">RevokeCommissioning</a> 关闭现有窗口，或等待其超时。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">OpenBasicCommissioningWindow —— 基础配网开窗(0x01)</h3>
  <p>
    开启基础配网窗口（Basic Commissioning Window）。与增强方式不同，基础配网使用设备的<strong>出厂 passcode</strong>
    （印在设备标签上的那个配对码）来建立 PASE 安全通道。操作简单，但安全性较低。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">需要 BC Feature</div>
    <p>
      此命令需要设备支持 <strong>BC（Basic Commissioning）</strong> Feature。
      可以通过读取 Feature Map 确认设备是否支持。不支持此 Feature 的设备只能通过
      <a href="#cmd-0x00">OpenCommissioningWindow</a>（增强方式）开窗。
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
          <td>窗口保持打开的秒数。超时后窗口自动关闭</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        适用于家庭环境中快速添加第二个控制器的场景。比如用户已经用 Google Home 配网了灯泡，
        现在想让 Apple Home 也能控制它。在 Google Home App 中打开基础配网窗口后，
        直接用灯泡背面的配对码在 Apple Home 中配网即可。
      </p>
      <p>
        由于使用固定的出厂 passcode，<strong>不推荐在安全要求较高的场景使用</strong>。
        出厂密码可能被多次使用，如果曾被第三方获取，存在被恶意配网的风险。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">RevokeCommissioning —— 关闭配网窗口(0x02)</h3>
  <p>
    关闭当前已开启的配网窗口。此命令<strong>没有参数</strong>。
    调用成功后，设备立即停止接受新的配网请求，WindowStatus 恢复为 <code>WindowNotOpen (0)</code>，
    AdminFabricIndex 和 AdminVendorId 重置为 <code>null</code>。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Prerequisites</div>
    <p>
      只有在配网窗口已经打开的情况下才能调用。如果当前没有活跃的配网窗口（WindowStatus = 0），
      会返回 <a href="#status-windownotopen">WindowNotOpen (4)</a> 错误。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Notes</summary>
    <div class="scenario-content">
      <p>
        主要用途：管理员开启了配网窗口后改变了主意，或者发现安全隐患需要立即关闭窗口。
        比如在商业环境中，IT 管理员开窗给新同事配网，但新同事临时有事未到场，
        管理员可以主动关闭窗口避免未授权访问。
      </p>
      <p>
        自动化系统在检测到异常配网尝试时，也可以调用此命令作为安全响应措施。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>AdministratorCommissioning Cluster 共有 3 个属性，描述配网窗口的当前状态和操作者信息。</p>

  <!-- 属性汇总表 -->
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
          <td>当前配网窗口的状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>AdminFabricIndex</td>
          <td>fabric-idx (nullable)</td>
          <td>开启窗口的管理员所在 Fabric 索引</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>AdminVendorId</td>
          <td>vendor-id (nullable)</td>
          <td>开启窗口的管理员供应商 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 窗口状态（0x0000）====== -->
  <h3 id="attr-detail-window">窗口状态(0x0000)</h3>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>WindowStatus<br/><span class="attr-cn">窗口状态</span></td>
          <td><a href="#enum-window-status">CommissioningWindowStatusEnum</a></td>
          <td>
            表示设备当前的配网窗口状态。
            <code>WindowNotOpen (0)</code> 表示未开窗，设备不接受新的配网请求；
            <code>EnhancedWindowOpen (1)</code> 表示增强配网窗口已打开；
            <code>BasicWindowOpen (2)</code> 表示基础配网窗口已打开。
            同一时间只能有一个窗口处于打开状态
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">监控窗口状态</div>
    <p>
      在安全敏感的部署环境中，可以通过订阅 WindowStatus 属性变化来实时监控设备的配网窗口状态。
      一旦检测到非预期的窗口开启（比如 <code>BasicWindowOpen</code>），
      可以立即调用 <a href="#cmd-0x02">RevokeCommissioning</a> 关闭窗口并发送告警。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 管理员信息（0x0001, 0x0002）====== -->
  <h3 id="attr-detail-admin">管理员信息(0x0001, 0x0002)</h3>
  <p>记录是谁开启了当前的配网窗口。窗口关闭或未开启时，这两个属性均为 <code>null</code>。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>AdminFabricIndex<br/><span class="attr-cn">管理员 Fabric 索引</span></td>
          <td>fabric-idx (nullable)</td>
          <td>
            开启配网窗口的管理员所在的 Fabric 索引。
            可用于追溯哪个 Fabric 的管理员执行了开窗操作。
            窗口未开启时为 <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>AdminVendorId<br/><span class="attr-cn">管理员供应商 ID</span></td>
          <td>vendor-id (nullable)</td>
          <td>
            开启配网窗口的管理员的供应商 ID（Vendor ID）。
            标识是哪个厂商的 App 或控制器执行了开窗操作。
            窗口未开启时为 <code>null</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">审计用途</div>
    <p>
      AdminFabricIndex 和 AdminVendorId 配合使用，可以完整追溯「谁」在「什么身份」下开启了配网窗口。
      这对安全审计非常有价值 —— 比如在企业环境中，发现设备被意外配网时，
      可以通过这两个属性确认是哪个管理员、使用哪个平台执行了开窗操作。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-window-status">CommissioningWindowStatusEnum</h3>
  <p>表示设备当前的配网窗口状态，用于 <code>WindowStatus</code> 属性。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">配网窗口未开启 —— 设备不接受新的配网请求（默认状态）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">EnhancedWindowOpen</span>
        <span class="enum-desc">增强配网窗口已开启 —— 使用新的 PAKE 验证器，安全性更高</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BasicWindowOpen</span>
        <span class="enum-desc">基础配网窗口已开启 —— 使用设备出厂密码，需要 BC Feature 支持</span>
      </div>
    </div>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">Cluster 状态码(StatusCode)</h2>
  <p>AdministratorCommissioning 命令通过通用 Status 响应返回结果，除标准状态码外还定义了以下 Cluster 专属状态码：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card" id="status-busy">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Busy</span>
        <span class="enum-desc">设备已有一个活跃的配网窗口。同一时间只能开启一个配网窗口，需先关闭现有窗口或等待其超时</span>
      </div>
    </div>
    <div class="enum-card" id="status-pake-error">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PAKEParameterError</span>
        <span class="enum-desc">PAKE 参数无效 —— PAKEPasscodeVerifier、Iterations 或 Salt 参数不合法（仅 OpenCommissioningWindow）</span>
      </div>
    </div>
    <div class="enum-card" id="status-windownotopen">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">当前没有活跃的配网窗口 —— 试图在无活跃窗口时调用 RevokeCommissioning</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Errors Quick Reference</div>
    <p>
      <strong>OpenCommissioningWindow 返回 Busy</strong> → 已有配网窗口在开启状态，先调用 RevokeCommissioning 关闭再重试；
      <strong>OpenCommissioningWindow 返回 PAKEParameterError</strong> → 检查 PAKE 验证器的生成参数，确认 Iterations 和 Salt 在有效范围内；
      <strong>RevokeCommissioning 返回 WindowNotOpen</strong> → 窗口已超时自动关闭或从未开启，无需处理。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>属性数据示例(窗口未开启)</h3>
  <p>设备处于正常状态，没有活跃的配网窗口：</p>
  <pre><code>{
  // --- 配网窗口状态 ---
  "0x0000": 0,                // WindowStatus = WindowNotOpen（当前未开启配网窗口）

  // --- 管理员信息 ---
  "0x0001": null,             // AdminFabricIndex = null（无管理员开启窗口）
  "0x0002": null              // AdminVendorId = null（无管理员开启窗口）
}</code></pre>

  <h3>属性数据示例(窗口已开启)</h3>
  <p>某管理员已通过增强方式开启了配网窗口：</p>
  <pre><code>{
  // --- 配网窗口状态 ---
  "0x0000": 1,                // WindowStatus = EnhancedWindowOpen（增强配网窗口已开启）

  // --- 管理员信息 ---
  "0x0001": 1,                // AdminFabricIndex = 1（Fabric 索引为 1 的管理员开启了窗口）
  "0x0002": 4996              // AdminVendorId = 0x1384（开启窗口的管理员供应商 ID）
}</code></pre>

  <h3>OpenCommissioningWindow 交互示例</h3>
  <p>使用增强配网方式开启配网窗口：</p>
  <pre><code>// Commissioner → Device：开启增强配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x00"              // OpenCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180,     // 180 秒后自动关闭
      "PAKEPasscodeVerifier": "base64...",  // 新的 PAKE 验证器
      "discriminator": 3840,           // 12-bit 设备识别码
      "iterations": 1000,             // PBKDF2 迭代次数
      "salt": "base64..."             // PBKDF2 盐值
    }
  }]
}

// Device → Commissioner：成功开启（Status = SUCCESS）
// 此命令无专属响应结构体，通过通用 Status 返回结果</code></pre>

  <h3>OpenBasicCommissioningWindow 交互示例</h3>
  <p>使用基础配网方式开启配网窗口（需要 BC Feature）：</p>
  <pre><code>// Commissioner → Device：开启基础配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x01"              // OpenBasicCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180      // 180 秒后自动关闭
    }
  }]
}

// Device → Commissioner：成功开启（Status = SUCCESS）</code></pre>

  <h3>RevokeCommissioning 交互示例</h3>
  <p>关闭当前已开启的配网窗口：</p>
  <pre><code>// Commissioner → Device：关闭配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x02"              // RevokeCommissioning
    },
    "commandFields": {}                // 无参数
  }]
}

// Device → Commissioner：成功关闭（Status = SUCCESS）</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      在实际开发中，Commissioner SDK 通常会封装 OpenCommissioningWindow 的调用，自动处理 PAKE 验证器的生成。
      App 开发者通常只需要调用 SDK 提供的「多管理员配网」接口，SDK 会在底层完成 PAKE 参数计算和命令发送。
      但理解底层原理有助于排查多管理员配网失败的问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：添加第二个管理员(多平台共管)</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：用户已经用 Google Home 配网了一盏智能灯，现在希望 Apple Home 也能控制它。</p>
      <ol>
        <li>用户在 Google Home App 中找到这盏灯的设备详情页</li>
        <li>点击「分享设备」或「添加到其他平台」</li>
        <li>Google Home 在底层调用 <a href="#cmd-0x00"><code>OpenCommissioningWindow (0x00)</code></a>，
            生成新的 PAKE 验证器和临时 Discriminator</li>
        <li>App 界面展示一个配网 QR Code（包含临时密码和 Discriminator）</li>
        <li>用户打开 Apple Home，扫描该 QR Code</li>
        <li>Apple Home 使用临时密码建立 PASE 通道，完成配网</li>
        <li>配网完成后窗口自动关闭，WindowStatus 恢复为 <code>WindowNotOpen (0)</code></li>
      </ol>
      <p>
        此时设备同时属于两个 Fabric（Google 和 Apple），可以被两个平台独立控制。
        设备的 AdminFabricIndex 和 AdminVendorId 在窗口关闭后恢复为 <code>null</code>。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：恢复出厂设置的替代方案</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：设备所属的 App 已卸载或 Fabric 信息丢失，但不想恢复出厂设置（会丢失所有配置）。</p>
      <ol>
        <li>如果设备支持 BC Feature 且有物理按钮或其他本地触发方式：
          <ul>
            <li>通过长按设备按钮等方式触发本地开窗（某些设备支持）</li>
            <li>设备进入基础配网窗口状态（BasicWindowOpen）</li>
          </ul>
        </li>
        <li>如果设备仍属于某个有效的 Fabric 且有另一个管理员：
          <ul>
            <li>用该管理员调用 <a href="#cmd-0x01"><code>OpenBasicCommissioningWindow (0x01)</code></a></li>
            <li>使用设备背面的出厂 passcode 重新配网</li>
          </ul>
        </li>
        <li>新的 Commissioner 完成配网后，设备加入新的 Fabric</li>
        <li>可以通过 OperationalCredentials Cluster 移除旧的、不再需要的 Fabric</li>
      </ol>
      <p>
        <strong>注意</strong>：如果设备所有 Fabric 的管理员都无法访问，且设备不支持本地开窗方式，
        那么恢复出厂设置可能是唯一选择。这也是为什么建议至少配置两个管理员（Fabric）作为备份的原因。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：安全审计(检测异常配网窗口)</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：企业 IoT 管理员需要确保办公室内的 Matter 设备没有被意外开窗。</p>
      <ol>
        <li>定期轮询所有设备的 <code>WindowStatus (0x0000)</code> 属性</li>
        <li>如果发现某设备的 WindowStatus 不为 <code>WindowNotOpen (0)</code>：
          <ul>
            <li>读取 <code>AdminFabricIndex (0x0001)</code> 确认是哪个 Fabric 的管理员开的窗</li>
            <li>读取 <code>AdminVendorId (0x0002)</code> 确认使用的是哪个平台</li>
          </ul>
        </li>
        <li>如果这次开窗不在预期操作记录中：
          <ul>
            <li>立即调用 <a href="#cmd-0x02"><code>RevokeCommissioning (0x02)</code></a> 关闭窗口</li>
            <li>记录审计日志：设备 ID、开窗时间、AdminFabricIndex、AdminVendorId</li>
            <li>向安全团队发送告警</li>
          </ul>
        </li>
        <li>更好的方案：订阅 WindowStatus 属性变化，实现实时检测而非轮询</li>
      </ol>
      <p>
        在安全要求较高的环境中，建议完全禁用 BC Feature（不支持基础配网），
        只允许增强配网方式开窗 —— 这样每次开窗都需要新的 PAKE 验证器，被恶意利用的风险更低。
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
    description: 'Matter OperationalCredentials Cluster(0x003E)完整参考 — NOC 证书管理、Fabric 凭据、CSR 生成、设备认证(DAC)、多管理员、AddNOC/RemoveFabric 命令详解与配网 NOC 流程示例。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>OperationalCredentials Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003E</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    OperationalCredentials 是 Matter 设备安全通信的基石 —— 负责管理设备的<strong>节点操作证书（NOC）</strong>和 <strong>Fabric 凭据</strong>。
    每台 Matter 设备要加入一个 Fabric（家庭网络），都需要通过这个 Cluster 完成证书签发和安装。
    它也是多管理员（Multi-Admin）场景的核心 —— 一台设备可以同时加入多个 Fabric，每个 Fabric 独立管理各自的 NOC。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心概念速览</div>
    <p>
      <strong>Fabric</strong>：一个逻辑上的「家庭网络」，由同一个 Root CA 签发的证书体系定义。同一 Fabric 内的设备可以互相通信。<br/>
      <strong>NOC（Node Operational Certificate）</strong>：设备在某个 Fabric 中的「身份证」，包含设备的 NodeID 和 FabricID，由 Commissioner（手机 App）的 Root CA 签发。<br/>
      <strong>ICAC</strong>：中间 CA 证书，可选。在 Root CA 和 NOC 之间增加一层信任链。<br/>
      <strong>DAC（Device Attestation Certificate）</strong>：设备出厂时预置的证书，证明「这是一个合法的 Matter 设备」。用于配网时的设备认证。<br/>
      <strong>CSR</strong>：证书签名请求。设备生成密钥对后，将公钥包装为 CSR 发给 Commissioner，Commissioner 用自己的 CA 签发 NOC。
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

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    OperationalCredentials Cluster 共有 8 个命令，覆盖了设备认证、CSR 生成、NOC 安装、Fabric 管理的完整流程。
    大多数命令在配网（Commissioning）过程中由 Commissioner 自动调用，App 开发者通常不需要手动发送。
    但理解这些命令对调试配网失败和实现多管理员至关重要。
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
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AttestationRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求设备认证（DAC 签名）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>AttestationResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回设备认证数据</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>CertificateChainRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求 DAC 或 PAI 证书</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>CertificateChainResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回请求的证书</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>CSRRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求生成 CSR（证书签名请求）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>CSRResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回 CSR 数据</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>AddNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>安装 NOC，加入新 Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>UpdateNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>更新当前 Fabric 的 NOC</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>UpdateFabricLabel</td>
          <td class="col-direction">C &rarr; S</td>
          <td>修改 Fabric 标签</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0A">
          <td><a href="#cmd-0x0A"><code>0x0A</code></a></td>
          <td>RemoveFabric</td>
          <td class="col-direction">C &rarr; S</td>
          <td>移除 Fabric（含 NOC 和信任根）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0B">
          <td><a href="#cmd-0x0B"><code>0x0B</code></a></td>
          <td>AddTrustedRootCertificate</td>
          <td class="col-direction">C &rarr; S</td>
          <td>添加受信 Root CA 证书</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">关于命令方向</div>
    <p>
      <strong>C &rarr; S</strong>：Commissioner（手机 App）发给设备的请求命令。<br/>
      <strong>S &rarr; C</strong>：设备回复给 Commissioner 的响应命令。<br/>
      响应命令（AttestationResponse、CertificateChainResponse、CSRResponse）不需要手动发送，它们是设备收到请求后自动回复的。
      AddNOC / UpdateNOC / UpdateFabricLabel / RemoveFabric 的回复统一是 <strong>NOCResponse</strong>（内含 StatusCode 和 FabricIndex）。
    </p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">AttestationRequest —— 设备认证请求(0x00)</h3>
  <p>
    配网的第一步：验证设备是否为合法的 Matter 设备。Commissioner 发送一个随机数（Nonce），
    设备用 DAC（设备认证证书）的私钥对该 Nonce 和设备信息进行签名，证明自己持有合法的 DAC。
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
          <td>32 字节随机数，防止重放攻击</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        配网过程中自动执行。Commissioner 通过 BLE 或 IP 建立 PASE 连接后，首先发送 AttestationRequest。
        如果设备的 DAC 签名验证失败，配网流程会立即终止并报告设备认证失败。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">AttestationResponse —— 设备认证响应(0x01)</h3>
  <p>
    设备收到 AttestationRequest 后的自动回复。包含设备认证信息和 DAC 签名。
    Commissioner 收到后会验证签名、检查 DAC 证书链（DAC &rarr; PAI &rarr; PAA），确认设备合法性。
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
          <td>TLV 编码的认证信息（含 Certification Declaration、Nonce、Timestamp 等）</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>DAC 私钥对 AttestationElements 的 ECDSA-P256 签名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">CertificateChainRequest —— 证书链请求(0x02)</h3>
  <p>
    请求设备返回 DAC（设备认证证书）或 PAI（产品认证中间证书）。
    Commissioner 需要完整的证书链来验证设备认证签名 —— DAC 由 PAI 签发，PAI 由 PAA 签发。
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
          <td>1 = DAC 证书，2 = PAI 证书（见<a href="#enum-cert-chain-type">枚举定义</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        配网时 Commissioner 通常会先请求 DAC（type=1），再请求 PAI（type=2），
        然后结合本地或云端存储的 PAA（Product Attestation Authority）根证书完成整条信任链验证。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">CertificateChainResponse —— 证书链响应(0x03)</h3>
  <p>
    设备返回请求的证书。证书格式为 DER 编码的 X.509 v3 证书。
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
          <td>DER 编码的 X.509 证书（DAC 或 PAI）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">CSRRequest —— CSR 生成请求(0x04)</h3>
  <p>
    让设备生成一对新的操作密钥（Operational Key Pair），并返回包含公钥的 CSR（Certificate Signing Request）。
    Commissioner 拿到 CSR 后，用自己的 Root CA 签发 NOC 证书，然后通过 AddNOC 写入设备。
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
          <td>32 字节随机数，绑定到 CSR 中防止重放</td>
        </tr>
        <tr>
          <td>IsForUpdateNOC</td>
          <td>bool</td>
          <td>可选。为 <code>true</code> 时表示此 CSR 用于更新现有 NOC（而非首次安装）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        配网流程中在设备认证通过后执行。CSR 中包含设备新生成的公钥，Commissioner 用自己的 CA 对此公钥签发 NOC。
        设备保留对应的私钥，后续 CASE 会话建立时用它来证明身份。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">CSRResponse —— CSR 响应(0x05)</h3>
  <p>
    设备返回 CSR 数据和 DAC 签名。Commissioner 验证签名后提取 CSR 用于签发 NOC。
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
          <td>TLV 编码的 NOCSR 结构（含 PKCS#10 CSR 和 CSRNonce）</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>DAC 私钥对 NOCSRElements 的 ECDSA-P256 签名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">AddNOC —— 安装 NOC(0x06)</h3>
  <p>
    配网流程的关键一步：将 Commissioner 签发的 NOC 证书写入设备，让设备正式加入一个新的 Fabric。
    这是整个证书安装流程中参数最多的命令。执行成功后设备会获得一个新的 FabricIndex。
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
          <td>是</td>
          <td>签发的 NOC 证书（Matter Operational Certificate，DER 编码）</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>可选</td>
          <td>中间 CA 证书。如果 NOC 直接由 Root CA 签发则不需要</td>
        </tr>
        <tr>
          <td>IPKValue</td>
          <td>octstr (16 bytes)</td>
          <td>是</td>
          <td>Identity Protection Key，用于 Fabric 内的群组通信加密</td>
        </tr>
        <tr>
          <td>CaseAdminSubject</td>
          <td>uint64</td>
          <td>是</td>
          <td>CASE 管理员的 Subject（通常是 Commissioner 的 NodeID）。该节点在此 Fabric 上拥有管理权限</td>
        </tr>
        <tr>
          <td>AdminVendorId</td>
          <td>uint16</td>
          <td>是</td>
          <td>管理员的 Vendor ID（标识是哪个厂商的 App 发起的配网）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">返回值：NOCResponse</div>
    <p>
      AddNOC 执行后设备返回 <strong>NOCResponse</strong>，包含：
      <code>StatusCode</code>（见 <a href="#enum-noc-status">NodeOperationalCertStatusEnum</a>）和
      <code>FabricIndex</code>（新分配的索引号，仅在成功时有值）。
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        这是配网的最后一步。流程为：AddTrustedRootCertificate &rarr; CSRRequest &rarr; 用 CA 签发 NOC &rarr; AddNOC。
        执行成功后设备会建立一个新的 CASE 会话，后续通信从 PASE 切换到 CASE（基于证书的安全通道）。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">UpdateNOC —— 更新 NOC(0x07)</h3>
  <p>
    更新当前 Fabric 的 NOC 证书。通常在证书即将过期或需要轮换密钥时使用。
    只能更新发起此命令的 Fabric 自身的 NOC，不能跨 Fabric 操作。
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
          <td>是</td>
          <td>新的 NOC 证书（DER 编码）</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>可选</td>
          <td>新的中间 CA 证书</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        证书轮换场景：Commissioner 先调用 CSRRequest（IsForUpdateNOC=true）获取新 CSR，
        用 CA 签发新 NOC 后调用 UpdateNOC 写入。旧 NOC 被替换，FabricIndex 不变。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x09">UpdateFabricLabel —— 更新 Fabric 标签(0x09)</h3>
  <p>
    修改当前 Fabric 的用户自定义标签（如「Home」「Office」）。纯展示用途，不影响安全或通信。
    只能修改发起命令的 Fabric 自身的标签。
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
          <td>新标签。空字符串表示清除标签。不允许与同设备上其他 Fabric 重名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在 App 中给某个 Fabric 起名，比如标记为「家里」或「公司」，方便在多管理员场景下区分。
        如果传入的 Label 与设备上已有的其他 Fabric 标签相同，设备返回 LabelConflict 错误。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0A">RemoveFabric —— 移除 Fabric(0x0A)</h3>
  <p>
    从设备上移除指定的 Fabric。会删除该 Fabric 对应的 NOC、ICAC、信任根证书、ACL 条目以及所有关联数据。
    <strong>可以移除任意 Fabric</strong>（包括其他管理员的），这是一个高权限操作。
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
          <td>要移除的 Fabric 索引（从 Fabrics 属性列表获取）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">危险操作</div>
    <p>
      如果设备只加入了一个 Fabric，执行 RemoveFabric 后设备会回到<strong>未配网状态</strong>（等同恢复出厂设置）。
      如果移除的是自己所在的 Fabric，当前 CASE 会话会立即断开。
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        「取消配对」操作：用户在 App 中删除设备时，App 调用 RemoveFabric 移除自己的 Fabric。
        如果设备在其他平台（如 Google Home / Apple Home）也配了网，那些 Fabric 不受影响。
        极端场景：如果 App 失去了与设备的连接，可通过物理按键恢复出厂设置来清除所有 Fabric。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0B">AddTrustedRootCertificate —— 添加信任根证书(0x0B)</h3>
  <p>
    向设备写入一个 Root CA 证书。这是 AddNOC 的前置步骤 —— 设备需要先知道信任哪个 Root CA，
    才能接受由该 CA 签发的 NOC。每个 Fabric 对应一个信任根。
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
          <td>Root CA 证书（Matter Operational Certificate 格式，DER 编码）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info">
    <div class="callout-title">执行时机</div>
    <p>
      此命令只能在 PASE 会话中执行（即设备尚未完成配网、使用 Passcode 建立的临时安全通道），
      或者在已建立 CASE 会话的 Fabric 内执行。不能在没有安全通道的情况下写入信任根。
      此命令没有响应（成功返回 Status = Success 的通用状态码，不是 NOCResponse）。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>OperationalCredentials Cluster 共有 6 个属性，分为 Fabric 信息和容量管理两组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NOCs</td>
          <td>list&lt;NOCStruct&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>各 Fabric 的 NOC 和 ICAC 证书</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Fabrics</td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>已加入的 Fabric 描述列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SupportedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>设备最多支持加入的 Fabric 数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CommissionedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>当前已加入的 Fabric 数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>TrustedRootCertificates</td>
          <td>list&lt;octstr&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>已安装的信任根证书列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>CurrentFabricIndex</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>当前操作上下文所属的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Fabric 信息 ====== -->
  <h3 id="group-fabric">Fabric 信息(0x0000, 0x0001, 0x0004)</h3>
  <p>描述设备已加入的各个 Fabric 的证书、身份和信任根信息。</p>

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
          <td>NOCs<br/><span class="attr-cn">NOC 列表</span></td>
          <td>list&lt;NOCStruct&gt;</td>
          <td>每个 Fabric 对应一个 NOCStruct，包含该 Fabric 的 NOC 和 ICAC 证书。<strong>Fabric-scoped</strong>：每个 Fabric 只能读到自己的条目，读不到其他 Fabric 的 NOC</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Fabrics<br/><span class="attr-cn">Fabric 列表</span></td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td>所有已加入 Fabric 的描述信息。与 NOCs 不同，<strong>所有 Fabric 都能读到完整列表</strong>（但不含证书内容，仅有公钥摘要等公开信息）</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>TrustedRootCertificates<br/><span class="attr-cn">信任根证书列表</span></td>
          <td>list&lt;octstr&gt;</td>
          <td>已安装的 Root CA 公钥证书列表（DER 编码）。每个 Fabric 对应一个信任根。通过 AddTrustedRootCertificate 添加</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Fabric-scoped vs 全局可见</div>
    <p>
      <code>NOCs</code> 属性是 <strong>Fabric-scoped</strong> 的 —— Fabric A 读 NOCs 只能看到自己的 NOC，看不到 Fabric B 的。
      这是安全设计：NOC 中包含了该 Fabric 的操作密钥公钥，不应暴露给其他 Fabric。<br/>
      <code>Fabrics</code> 属性是全局可见的 —— 任何 Fabric 都能看到设备加入了哪些 Fabric，以及它们的公开信息（Root 公钥、VendorID、FabricID、NodeID、Label）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 容量管理 ====== -->
  <h3 id="group-capacity">容量管理(0x0002, 0x0003, 0x0005)</h3>
  <p>描述设备的 Fabric 容量和当前操作上下文。</p>

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
          <td>SupportedFabrics<br/><span class="attr-cn">最大 Fabric 数</span></td>
          <td>uint8</td>
          <td>设备最多可同时加入的 Fabric 数量。Matter 规范要求至少支持 <strong>5 个</strong>。该值出厂固定，不可修改</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CommissionedFabrics<br/><span class="attr-cn">已加入 Fabric 数</span></td>
          <td>uint8</td>
          <td>当前实际已加入的 Fabric 数量。当 <code>CommissionedFabrics &ge; SupportedFabrics</code> 时，设备无法再加入新的 Fabric（AddNOC 会返回 TableFull）</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>CurrentFabricIndex<br/><span class="attr-cn">当前 Fabric 索引</span></td>
          <td>uint8</td>
          <td>当前通信会话所属的 Fabric 索引。读取此属性可知道「我是哪个 Fabric」。值为 0 表示当前没有关联的 Fabric（如 PASE 会话中）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">多管理员容量检查</div>
    <p>
      在发起多管理员配网（Multi-Admin）前，应先读取 <code>SupportedFabrics</code> 和 <code>CommissionedFabrics</code>，
      确认还有剩余槽位。如果已满，需要先通过 RemoveFabric 移除一个不再使用的 Fabric。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-noc-status">NodeOperationalCertStatusEnum</h3>
  <p>AddNOC、UpdateNOC、UpdateFabricLabel、RemoveFabric 命令的统一返回状态码（NOCResponse 中的 StatusCode 字段）。</p>

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
        <span class="enum-desc">NOC 中的公钥无效（格式错误或与 CSR 中的不匹配）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidNodeOpId</span>
        <span class="enum-desc">NOC 中的 Node Operational ID（NodeID）无效</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">InvalidNOC</span>
        <span class="enum-desc">NOC 证书本身无效（签名验证失败、格式错误、过期等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">MissingCsr</span>
        <span class="enum-desc">没有先调用 CSRRequest 就直接 AddNOC/UpdateNOC</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">TableFull</span>
        <span class="enum-desc">Fabric 表已满（CommissionedFabrics = SupportedFabrics）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">InvalidAdminSubject</span>
        <span class="enum-desc">CaseAdminSubject 值无效（不是合法的 NodeID）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">FabricConflict</span>
        <span class="enum-desc">Fabric 冲突 —— 设备上已存在使用相同 Root CA 的 Fabric</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">LabelConflict</span>
        <span class="enum-desc">标签冲突 —— UpdateFabricLabel 时新标签与已有 Fabric 标签重复</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">InvalidFabricIndex</span>
        <span class="enum-desc">指定的 FabricIndex 不存在（RemoveFabric 时传了无效索引）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-cert-chain-type">CertificateChainTypeEnum</h3>
  <p>CertificateChainRequest 命令中指定要获取的证书类型。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DACCertificate</span>
        <span class="enum-desc">设备认证证书（Device Attestation Certificate）—— 出厂预置，证明设备合法性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PAICertificate</span>
        <span class="enum-desc">产品认证中间证书（Product Attestation Intermediate Certificate）—— DAC 的签发者</span>
      </div>
    </div>
  </div>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-noc">NOCStruct</h3>
  <p>NOCs 属性列表中的每个元素，包含一个 Fabric 的 NOC 和可选的 ICAC 证书。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOC</td>
          <td>octstr</td>
          <td>节点操作证书（DER 编码）。包含设备在该 Fabric 中的 NodeID、FabricID 和操作公钥</td>
        </tr>
        <tr>
          <td>ICAC</td>
          <td>octstr / null</td>
          <td>中间 CA 证书。如果 NOC 直接由 Root CA 签发，则为 null</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>此条目所属的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-fabric-descriptor">FabricDescriptorStruct</h3>
  <p>Fabrics 属性列表中的每个元素，描述一个 Fabric 的公开信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RootPublicKey</td>
          <td>octstr (65 bytes)</td>
          <td>该 Fabric 的 Root CA 公钥（未压缩 EC P-256 点，65 字节）</td>
        </tr>
        <tr>
          <td>VendorID</td>
          <td>uint16</td>
          <td>签发此 Fabric 凭据的厂商 ID（如 Apple = 0x1349、Google = 0x6006）</td>
        </tr>
        <tr>
          <td>FabricID</td>
          <td>uint64</td>
          <td>Fabric 标识符。同一个 Root CA 下不同 Fabric 用此值区分</td>
        </tr>
        <tr>
          <td>NodeID</td>
          <td>uint64</td>
          <td>设备在该 Fabric 中的节点 ID。同一设备在不同 Fabric 中 NodeID 不同</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>string (max 32)</td>
          <td>用户自定义标签（通过 UpdateFabricLabel 修改），如「Home」「Office」</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>此 Fabric 的索引号（设备内唯一，RemoveFabric 时用此值指定）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">VendorID 与 FabricID</div>
    <p>
      同一台设备被 Apple Home 和 Google Home 同时配网时，会有两条 FabricDescriptor —— VendorID 分别是 Apple 和 Google 的，
      FabricID 和 NodeID 也各不相同。设备通过 FabricIndex 区分不同 Fabric 的上下文，包括 ACL 权限和订阅。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>以下是一台已加入一个 Fabric 的 Matter 设备的 OperationalCredentials 属性读取结果（NOCs 除外，因为 Fabric-scoped 限制只能读自己的）：</p>

  <pre><code>{
  // --- Fabric 信息 ---
  "0x0001": [{                    // Fabrics — 已加入的 Fabric 列表
    "rootPublicKey": "BNkX2...",  // Root CA 公钥（Base64）
    "vendorID": 65521,            // VendorID = 0xFFF1（测试厂商）
    "fabricID": 1,                // FabricID = 1
    "nodeID": 1234,               // 本设备在该 Fabric 中的 NodeID
    "label": "Home",              // 用户自定义标签
    "fabricIndex": 1              // Fabric 索引
  }],

  // --- 容量与计数 ---
  "0x0002": 5,                    // SupportedFabrics = 5（最多加入 5 个 Fabric）
  "0x0003": 1,                    // CommissionedFabrics = 1（当前已加入 1 个）

  // --- 信任根证书 ---
  "0x0004": [                     // TrustedRootCertificates — 受信 Root CA 列表
    "MIIBnT..."                   // 每个 Fabric 对应一个 Root CA 证书（Base64 DER）
  ],

  // --- 当前上下文 ---
  "0x0005": 1                     // CurrentFabricIndex = 1（当前操作所属 Fabric）
}</code></pre>

  <h3>CSR 流程交互示例</h3>
  <p>配网过程中，Commissioner 请求设备生成 CSR 的交互：</p>
  <pre><code>// 1. Commissioner → Device：请求生成 CSR
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x04"          // CSRRequest
    },
    "commandFields": {
      "CSRNonce": "dGhpcyBpcyBhIDMyLWJ5dGUgbm9uY2U="  // 32 字节随机数（Base64）
    }
  }]
}

// Device → Commissioner：返回 CSR
{
  "NOCSRElements": "MIHd...",      // NOCSR 结构（含 CSR + CSRNonce）
  "attestationSignature": "MEU..." // 设备用 DAC 私钥签名
}</code></pre>

  <h3>AddNOC 交互示例</h3>
  <p>Commissioner 将签发好的 NOC 写入设备：</p>
  <pre><code>// 2. Commissioner → Device：写入签好的 NOC
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x06"          // AddNOC
    },
    "commandFields": {
      "NOCValue": "MIIB...",       // 签发的 NOC 证书（DER Base64）
      "ICACValue": "MIIB...",      // 可选的中间 CA 证书
      "IPKValue": "wMs7...",       // 16 字节 Identity Protection Key
      "caseAdminSubject": 112233,  // CASE 管理员的 Subject（NodeID）
      "adminVendorId": 65521       // 管理员的 VendorID
    }
  }]
}

// Device → Commissioner：返回结果
{
  "statusCode": 0,                 // OK
  "fabricIndex": 1                 // 新分配的 FabricIndex
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      实际开发中，这些命令通常由平台的 Commissioning SDK 自动编排（如 Android CHIPTool、iOS Matter.framework）。
      但在调试配网失败时，理解每一步的参数含义非常关键 —— 尤其是 CSRNonce 不匹配、NOC 签名验证失败、Fabric 表已满等问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：首次配网 —— NOC 安装完整流程</summary>
    <div class="scenario-content">
      <p>一台新出厂的 Matter 设备首次被手机 App 配网，完整的证书安装流程如下：</p>
      <ol>
        <li>App 通过 BLE 或 SoftAP 与设备建立 <strong>PASE 会话</strong>（使用设备上的 Passcode）</li>
        <li>App 发送 <code>AttestationRequest (0x00)</code>，收到 <code>AttestationResponse</code> 后验证 DAC 签名</li>
        <li>App 发送 <code>CertificateChainRequest (0x02, type=1)</code> 获取 DAC 证书</li>
        <li>App 发送 <code>CertificateChainRequest (0x02, type=2)</code> 获取 PAI 证书</li>
        <li>App 验证完整信任链：DAC &rarr; PAI &rarr; PAA（PAA 从 DCL 或本地获取）</li>
        <li>App 发送 <code>AddTrustedRootCertificate (0x0B)</code> 将自己的 Root CA 证书写入设备</li>
        <li>App 发送 <code>CSRRequest (0x04)</code>，设备生成密钥对并返回 CSR</li>
        <li>App 的 CA 基于 CSR 签发 NOC 证书</li>
        <li>App 发送 <code>AddNOC (0x06)</code> 将 NOC、ICAC（可选）、IPK 写入设备</li>
        <li>设备返回 NOCResponse（StatusCode=OK，FabricIndex=1）</li>
        <li>PASE 会话结束，App 和设备建立 <strong>CASE 会话</strong>（基于 NOC 证书）</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：多管理员(Multi-Admin)—— 同一设备加入多个平台</summary>
    <div class="scenario-content">
      <p>用户先用 Apple Home 配网，再用 Google Home 配网同一台设备：</p>
      <ol>
        <li>Apple Home 已完成配网，设备有 Fabric 1（Apple 的 Root CA、VendorID、NodeID）</li>
        <li>用户在 Apple Home 中开启「多管理员配对窗口」（通过 Administrator Commissioning Cluster 的 OpenCommissioningWindow）</li>
        <li>Google Home 扫描到设备，通过新的 PASE 会话连接</li>
        <li>Google Home 重复场景 1 的步骤 2-10，使用 Google 自己的 Root CA 签发 NOC</li>
        <li>设备现在有 Fabric 1（Apple）和 Fabric 2（Google），各自独立运作</li>
        <li>读取 <code>Fabrics</code> 属性可以看到两条 FabricDescriptorStruct</li>
        <li>读取 <code>CommissionedFabrics</code> 返回 2，<code>SupportedFabrics</code> 仍然是出厂值（如 5）</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：移除 Fabric —— 取消配对或恢复出厂</summary>
    <div class="scenario-content">
      <p>用户要从某个平台上移除设备：</p>
      <ol>
        <li>App 读取 <code>Fabrics (0x0001)</code> 获取所有 Fabric 列表</li>
        <li>App 读取 <code>CurrentFabricIndex (0x0005)</code> 确认自己的 FabricIndex</li>
        <li>App 发送 <code>RemoveFabric (0x0A)</code> 并传入自己的 FabricIndex</li>
        <li>设备删除该 Fabric 的 NOC、Root 证书、ACL 等所有关联数据</li>
        <li>如果设备上还有其他 Fabric，设备继续正常运行；如果这是最后一个 Fabric，设备回到未配网状态</li>
      </ol>
      <p>
        <strong>注意</strong>：RemoveFabric 可以指定任意 FabricIndex（不限于自己的 Fabric），
        但通常只有管理员权限（Administrator ACL）才被允许执行。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：证书轮换 —— 更新已有的 NOC</summary>
    <div class="scenario-content">
      <p>当 NOC 接近过期或因安全策略需要更换密钥时：</p>
      <ol>
        <li>App 发送 <code>CSRRequest (0x04)</code> 并设置 <code>IsForUpdateNOC = true</code></li>
        <li>设备生成新密钥对，返回新 CSR</li>
        <li>App 的 CA 基于新 CSR 签发新 NOC（保持相同的 NodeID 和 FabricID）</li>
        <li>App 发送 <code>UpdateNOC (0x07)</code> 写入新 NOC</li>
        <li>旧 NOC 被替换，FabricIndex 不变，CASE 会话需要重新建立</li>
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
    description: 'Matter GroupKeyManagement Cluster(0x003F)完整参考 — 组播通信密钥管理、KeySetWrite/Read/Remove 命令、GroupKeyMap 映射、GroupTable 查询、密钥轮换与 CacheAndSync 特性。',
    prev: undefined,
    next: undefined,
    content: `<h1>GroupKeyManagement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003F</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    GroupKeyManagement 负责管理 Matter 网络中用于组播（multicast）通信的加密密钥。
    当你需要向一组设备同时发送命令（比如「关闭客厅所有灯」）时，设备之间需要共享一套对称密钥来加密和验证组播消息。
    这个 Cluster 就是用来写入、读取、删除和维护这些密钥集的。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">CacheAndSync 特性(CS)</div>
    <p>
      GroupKeyManagement 定义了一个 <strong>CacheAndSync（CS）</strong> Feature。
      启用 CS 后，设备支持从 Distributed Compliance Ledger（DCL）缓存和同步信任的根证书，
      并允许使用 <code>CacheAndSync</code> 安全策略。未启用 CS 的设备只能使用 <code>TrustFirst</code> 策略。
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
    <a href="#enums">枚举类型</a>
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
    GroupKeyManagement Cluster 共有 4 个命令，用于管理密钥集（KeySet）的完整生命周期：
    写入、读取、删除和列举。点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>写入或更新一个密钥集</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>KeySetRead</td>
          <td>Client &rarr; Server</td>
          <td>读取指定密钥集的信息</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>KeySetRemove</td>
          <td>Client &rarr; Server</td>
          <td>删除一个密钥集</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>KeySetReadAllIndices</td>
          <td>Client &rarr; Server</td>
          <td>列出当前 Fabric 的所有密钥集 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">KeySetWrite -- 写入密钥集(0x00)</h3>
  <p>
    写入一个完整的密钥集（GroupKeySet）到设备中。如果指定的 GroupKeySetID 已存在，则更新它。
    每个密钥集包含最多三个 Epoch 密钥，用于支持密钥轮换时的平滑过渡。
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
          <td>完整的密钥集结构体，包含 ID、安全策略和最多三组 Epoch 密钥</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">密钥安全</div>
    <p>
      写入的 EpochKey 是敏感数据。设备在存储后不会回传明文密钥 ——
      通过 KeySetRead 读取时，EpochKey 字段会返回 <code>null</code>，只能看到 EpochStartTime。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Commissioner（如手机 App）在建立组播通信前，需要先通过 KeySetWrite
        将共享密钥写入所有参与组播的设备。通常在设备配网成功后、加入组之前调用。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">KeySetRead -- 读取密钥集(0x01)</h3>
  <p>
    读取指定 ID 的密钥集信息。返回 <strong>KeySetReadResponse</strong>，
    其中包含密钥集的元数据（ID、安全策略、各 Epoch 起始时间），但不包含密钥明文。
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
          <td>要读取的密钥集 ID</td>
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
          <td>密钥集信息（EpochKey 字段为 null，不返回明文）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        管理端需要确认某个密钥集是否已成功写入、查看其安全策略和 Epoch 时间窗口时调用。
        常用于密钥轮换前检查当前密钥集的状态。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">KeySetRemove -- 删除密钥集(0x03)</h3>
  <p>
    删除指定 ID 的密钥集。删除前需要确保没有 GroupKeyMap 条目仍在引用该密钥集，
    否则相关组将无法正常收发加密组播消息。
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
          <td>要删除的密钥集 ID（不能为 0，ID 0 是 IPK 密钥集，不可删除）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">IPK 不可删除</div>
    <p>
      GroupKeySetID 为 <code>0</code> 的密钥集是 Identity Protection Key（IPK），
      由 Fabric 建立时自动创建。尝试删除 ID 0 会返回 <code>INVALID_COMMAND</code> 错误。
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        密钥轮换完成后，旧密钥集不再被任何组引用时，可以通过 KeySetRemove 清理掉，释放设备存储空间。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">KeySetReadAllIndices -- 列举所有密钥集(0x04)</h3>
  <p>
    列出当前 Fabric 下所有已存储的密钥集 ID。返回 <strong>KeySetReadAllIndicesResponse</strong>。
    不需要任何参数。
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
          <td>当前 Fabric 拥有的所有密钥集 ID 列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        管理端在执行密钥审计或轮换前，先调用此命令获取设备上所有密钥集的 ID，
        再逐个通过 KeySetRead 查看详情，决定哪些需要更新或删除。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>GroupKeyManagement Cluster 共有 4 个应用属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>可写</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>GroupKeyMap</td>
          <td>list&lt;GroupKeyMapStruct&gt;</td>
          <td class="col-required">是</td>
          <td>组 ID 与密钥集的映射关系</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>GroupTable</td>
          <td>list&lt;GroupTableStruct&gt;</td>
          <td class="col-optional">否</td>
          <td>设备上所有组的信息表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxGroupsPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">否</td>
          <td>每个 Fabric 最多支持的组数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>MaxGroupKeysPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">否</td>
          <td>每个 Fabric 最多支持的密钥集数量</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- GroupKeyMap -->
  <h3 id="attr-0x0000">GroupKeyMap -- 组密钥映射(0x0000)</h3>
  <p>
    这是本 Cluster 最核心的属性。它定义了「哪个组使用哪个密钥集」的映射关系。
    每个条目将一个 GroupId 关联到一个 GroupKeySetID，设备根据这个映射来选择加解密组播消息所用的密钥。
  </p>
  <p>
    <strong>可写属性</strong> —— 管理端可以直接写入来建立或修改映射。
    一个密钥集可以被多个组共享，也可以为每个组分配独立的密钥集。
  </p>

  <h4>GroupKeyMapStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>组 ID（对应 Groups Cluster 中注册的组）</td>
        </tr>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>关联的密钥集 ID（必须是已通过 KeySetWrite 写入的）</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>所属 Fabric 索引（自动填充，Fabric 隔离）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- GroupTable -->
  <h3 id="attr-0x0001">GroupTable -- 组信息表(0x0001)</h3>
  <p>
    只读属性，展示设备上所有已注册组的详细信息。
    这个表由设备根据 Groups Cluster 的操作和 GroupKeyMap 自动维护，不能直接写入。
  </p>

  <h4>GroupTableStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>组 ID</td>
        </tr>
        <tr>
          <td>Endpoints</td>
          <td>list&lt;endpoint-no&gt;</td>
          <td>该组包含的 Endpoint 列表</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>组名称（最长 16 字节，可选）</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>所属 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- MaxGroupsPerFabric & MaxGroupKeysPerFabric -->
  <h3 id="attr-0x0002">MaxGroupsPerFabric -- 最大组数(0x0002)</h3>
  <p>
    只读属性，标识每个 Fabric 最多可以注册多少个组。
    这是设备的硬件/固件限制，管理端在规划组播拓扑时需要参考这个值。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">MaxGroupKeysPerFabric -- 最大密钥集数(0x0003)</h3>
  <p>
    只读属性，标识每个 Fabric 最多可以存储多少个密钥集。
    包括 IPK（ID = 0）在内。如果值为 3，则除了 IPK 外还能存 2 个自定义密钥集。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">容量规划</div>
    <p>
      在写入密钥集或添加组映射前，先读取 <code>MaxGroupsPerFabric</code> 和
      <code>MaxGroupKeysPerFabric</code> 确认设备还有空间。
      超出限制的写入操作会返回 <code>RESOURCE_EXHAUSTED</code> 错误。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-groupkeyset">GroupKeySetStruct(密钥集结构体)</h3>
  <p>
    描述一个完整的组播密钥集。包含密钥集 ID、安全策略、以及最多三组 Epoch 密钥和对应的起始时间。
    三个 Epoch 插槽用于支持密钥轮换 —— 设备可以同时持有旧密钥和新密钥，实现无缝切换。
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
          <td>密钥集唯一标识。<code>0</code> 为 IPK（Identity Protection Key），由 Fabric 自动管理</td>
        </tr>
        <tr>
          <td>GroupKeySecurityPolicy</td>
          <td><a href="#enum-security-policy">GroupKeySecurityPolicyEnum</a></td>
          <td>安全策略 —— TrustFirst 或 CacheAndSync</td>
        </tr>
        <tr>
          <td>EpochKey0</td>
          <td>octstr (16 bytes) / null</td>
          <td>第一个 Epoch 密钥（128 位 AES 密钥）。读取时返回 null</td>
        </tr>
        <tr>
          <td>EpochStartTime0</td>
          <td>epoch-us / null</td>
          <td>EpochKey0 的生效时间（微秒级 UTC 时间戳）</td>
        </tr>
        <tr>
          <td>EpochKey1</td>
          <td>octstr (16 bytes) / null</td>
          <td>第二个 Epoch 密钥。用于密钥轮换过渡期</td>
        </tr>
        <tr>
          <td>EpochStartTime1</td>
          <td>epoch-us / null</td>
          <td>EpochKey1 的生效时间</td>
        </tr>
        <tr>
          <td>EpochKey2</td>
          <td>octstr (16 bytes) / null</td>
          <td>第三个 Epoch 密钥。完成轮换后的最终密钥</td>
        </tr>
        <tr>
          <td>EpochStartTime2</td>
          <td>epoch-us / null</td>
          <td>EpochKey2 的生效时间</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Epoch 密钥轮换机制</div>
    <p>
      三个 Epoch 插槽按时间顺序排列：EpochStartTime0 &lt; EpochStartTime1 &lt; EpochStartTime2。
      设备在当前时间到达对应的 EpochStartTime 后自动切换到新密钥。
      在切换窗口期内，设备能同时用旧密钥解密收到的消息、用新密钥加密发出的消息，
      保证组内设备逐步更新密钥时不会中断通信。
    </p>
  </div>

  <!-- ====== 枚举类型 ====== -->
  <h2 id="enums">Enum Types</h2>

  <h3 id="enum-security-policy">GroupKeySecurityPolicyEnum(安全策略)</h3>
  <p>定义密钥集使用的安全验证策略。决定设备如何验证组播消息的来源可信度。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">TrustFirst</span>
        <span class="enum-desc">信任优先 —— 首次收到的组播密钥即被信任。适用于大多数场景，是默认策略</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CacheAndSync</span>
        <span class="enum-desc">缓存与同步 —— 需要从 DCL 验证证书链后才信任。安全性更高，需要设备支持 CS 特性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CacheAndSync 前提</div>
    <p>
      只有设备的 <code>FeatureMap</code> 中启用了 <strong>CS</strong> 位后，
      才能在 KeySetWrite 中使用 <code>CacheAndSync</code> 策略。
      向不支持 CS 的设备写入 CacheAndSync 密钥集会返回 <code>INVALID_COMMAND</code>。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>GroupKeyManagement Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CS（CacheAndSync）</span>
        <span class="enum-desc">缓存与同步 —— 支持从 DCL 同步信任根证书，允许使用 CacheAndSync 安全策略</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一个已配置两个组的设备上，GroupKeyManagement Cluster 的属性读取结果：</p>

  <pre><code>{
  // --- GroupKeyMap（密钥映射表）---
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

  // --- GroupTable（组信息表，只读）---
  "0x0001": [
    {
      "GroupId": 1,
      "Endpoints": [1, 2],
      "GroupName": "客厅灯组",
      "FabricIndex": 1
    },
    {
      "GroupId": 2,
      "Endpoints": [3],
      "GroupName": "卧室灯组",
      "FabricIndex": 1
    }
  ],

  // --- 容量限制 ---
  "0x0002": 4,               // MaxGroupsPerFabric = 4
  "0x0003": 3                // MaxGroupKeysPerFabric = 3
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      GroupKeyMap 是唯一可写的属性 —— 通过写入它来绑定组和密钥集。
      GroupTable 是只读的，由设备自动根据 Groups Cluster 和 GroupKeyMap 计算生成。
      密钥集本身通过 KeySetWrite / KeySetRead 命令管理，不通过属性读写。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-setup">场景 1：为一组设备建立组播密钥</h3>
  <p>当你需要让多个设备加入同一个组并支持组播通信时：</p>
  <ol>
    <li>先读取目标设备的 <code>MaxGroupKeysPerFabric (0x0003)</code>，确认还有密钥集配额</li>
    <li>通过 <code>KeySetWrite (0x00)</code> 向每个目标设备写入相同的密钥集（相同的 GroupKeySetID 和 EpochKey）</li>
    <li>在每个设备上写入 <code>GroupKeyMap (0x0000)</code> 属性，将 GroupId 映射到刚写入的 GroupKeySetID</li>
    <li>通过 Groups Cluster 的 AddGroup 命令将设备加入对应的组</li>
    <li>读取 <code>GroupTable (0x0001)</code> 确认组信息和 Endpoint 映射正确</li>
    <li>现在可以向该组发送组播命令了，所有成员设备都能用共享密钥解密和执行</li>
  </ol>

  <h3 id="scenario-rotation">场景 2：密钥轮换(Key Rotation)</h3>
  <p>定期更换组播密钥是安全最佳实践。Matter 的三 Epoch 机制让轮换可以无缝进行：</p>
  <ol>
    <li>通过 <code>KeySetReadAllIndices (0x04)</code> 列出当前所有密钥集 ID</li>
    <li>通过 <code>KeySetRead (0x01)</code> 读取目标密钥集，检查当前的 Epoch 时间窗口</li>
    <li>生成新的 128 位 AES 密钥作为下一个 Epoch 密钥</li>
    <li>通过 <code>KeySetWrite (0x00)</code> 更新密钥集 —— 保留当前活跃的 EpochKey，将新密钥写入下一个 Epoch 插槽，设置未来的 EpochStartTime</li>
    <li>依次向组内每个设备写入相同的更新后密钥集</li>
    <li>等待所有设备都更新完毕后，新 EpochStartTime 到达时自动切换到新密钥</li>
    <li>确认所有设备已切换后，可以移除不再使用的旧 Epoch 密钥（通过下一次 KeySetWrite 覆盖）</li>
  </ol>

  <div class="callout callout-tip">
    <div class="callout-title">轮换要点</div>
    <p>
      密钥轮换的关键是 <strong>先写入所有设备，再让新密钥生效</strong>。
      如果部分设备还持有旧密钥而其他设备已切换到新密钥，这些设备之间的组播通信将中断。
      因此建议将 EpochStartTime 设置到足够远的未来，确保所有设备都有时间完成更新。
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
