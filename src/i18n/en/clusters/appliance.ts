import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'mode-select': {
    title: 'ModeSelect Cluster (0x0050)',
    description: 'Complete reference for the Matter ModeSelect Cluster (0x0050) — ChangeToMode command, SupportedModes list, ModeOptionStruct/SemanticTagStruct definitions, StartUpMode power-on mode, and OnMode interlock settings.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ModeSelect Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0050</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    ModeSelect is a general-purpose mode selection Cluster that lets a device declare which operating modes it supports, allowing controllers to query and switch between them.
    It applies to any device with a "multi-mode" concept: washing machine wash cycles, dryer programs, coffee maker brew methods, and so on.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Legacy Cluster</div>
    <p>
      ModeSelect was the general-purpose mode selection mechanism defined in early Matter revisions.
      In newer versions of the Matter specification, it has been superseded by device-type-specific Mode Clusters
      (e.g., <code>LaundryWasherMode</code>, <code>DishwasherMode</code>, <code>RefrigeratorAndTemperatureControlledCabinetMode</code>).
      New device development should prefer the device-specific Mode Cluster; ModeSelect is retained for legacy device compatibility and generic scenarios.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
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
    ModeSelect Cluster has only one command — simply specify the target mode number to perform the switch.
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
          <td>ChangeToMode</td>
          <td>Switch to a specified mode</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeToMode — Switch Mode (0x00)</h3>
  <p>
    Switches the device to the specified operating mode. The <code>NewMode</code> value must match the <code>Mode</code> field
    of a <code>ModeOptionStruct</code> in the <code>SupportedModes</code> list; otherwise the device returns an <code>INVALID_COMMAND</code> error.
    On success, the <code>CurrentMode</code> attribute is updated to the <code>NewMode</code> value.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must exist in the <code>SupportedModes</code> list</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects the "Quick Wash" mode on the app. The app reads <code>SupportedModes</code> to get the mode list and corresponding numbers,
        then sends the <code>ChangeToMode</code> command with <code>NewMode</code> set to that number.
        The device switches modes upon receiving the command and <code>CurrentMode</code> updates accordingly.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ModeSelect Cluster has 6 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Basic Info -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Description</td>
          <td>string</td>
          <td><a href="#group-info">Basic Info</a></td>
          <td>Human-readable description of cluster purpose</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>StandardNamespace</td>
          <td>uint16 / null</td>
          <td><a href="#group-info">Basic Info</a></td>
          <td>Mode namespace identifier</td>
        </tr>
        <!-- Mode State -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td><a href="#group-modes">Mode List</a></td>
          <td>All modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td><a href="#group-modes">Mode List</a></td>
          <td>Current operating mode number</td>
        </tr>
        <!-- Startup & Interlock -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">Startup & Interlock</a></td>
          <td>Mode restored on power-up</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">Startup & Interlock</a></td>
          <td>Mode automatically applied when device turns on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Basic Info (0x0000, 0x0001) ====== -->
  <h3 id="group-info">Basic Information (0x0000, 0x0001)</h3>
  <p>Describes the purpose of this ModeSelect Cluster instance and its mode namespace.</p>

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
          <td>Description</td>
          <td>string</td>
          <td>A human-readable string describing the purpose of this ModeSelect Cluster instance. For example, <code>"Dry Mode"</code> or <code>"Wash Program"</code>. A single device may have multiple ModeSelect instances (on different Endpoints), each distinguished by its Description</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>StandardNamespace</td>
          <td>uint16 / null</td>
          <td>Identifies the source of meaning for <code>SemanticTag</code> values. <code>null</code> indicates a manufacturer-specific namespace (MfgSpecific); standard values are defined by the Matter specification. With a namespace, different manufacturers' "Eco" modes can use the same SemanticTag value without per-manufacturer adaptation by controllers</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Mode List (0x0002, 0x0003) ====== -->
  <h3 id="group-modes">Mode List (0x0002, 0x0003)</h3>
  <p>All operating modes supported by the device and the current mode.</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>All available modes declared by the device, each element being a <a href="#struct-mode-option">ModeOptionStruct</a>. The list must contain at least 2 entries; each Mode value and each Label must be unique. List contents typically remain constant throughout the device lifecycle</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>The mode number currently active on the device. This value always points to a <code>ModeOptionStruct.Mode</code> in <code>SupportedModes</code>. Changed via the <code>ChangeToMode</code> command, and can also be set automatically by <code>OnMode</code> or <code>StartUpMode</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Mode Values Are Not Necessarily Consecutive</div>
    <p>
      The <code>Mode</code> values in <code>SupportedModes</code> are arbitrary uint8 values — they do not need to start at 0 or be consecutive.
      Controllers should always read <code>SupportedModes</code> first to obtain the list of valid Mode values before sending <code>ChangeToMode</code>.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Startup & Interlock (0x0004, 0x0005) ====== -->
  <h3 id="group-startup">Startup & Interlock (0x0004, 0x0005)</h3>
  <p>Controls the mode behavior when the device powers up and turns on.</p>

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
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>The mode the device automatically switches to on power-up (hardware restart). The value must exist in <code>SupportedModes</code>. <code>null</code> means the device retains the mode it was in before power loss. Nullable and optional</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>The mode the device automatically switches to when transitioning from Off to On (interlinked with the OnOff Cluster). The value must exist in <code>SupportedModes</code>. <code>null</code> means turning on does not change the mode. <strong>Requires the DEPONOFF feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between StartUpMode and OnMode</div>
    <p>
      <code>StartUpMode</code> takes effect on hardware power-up (similar to OnOff's <code>StartUpOnOff</code>),
      while <code>OnMode</code> takes effect at the software level when turning on (triggered when OnOff transitions from Off to On).
      If <code>OnMode</code> is non-null, it takes priority over <code>StartUpMode</code> —
      after power-up, <code>StartUpMode</code> is applied first, then OnOff triggers <code>OnMode</code>, and the final mode is determined by <code>OnMode</code>.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>ModeSelect Cluster uses two structs to describe mode information.</p>

  <!-- ModeOptionStruct -->
  <h3 id="struct-mode-option">ModeOptionStruct</h3>
  <p>Describes an available mode option, including its display label, mode number, and semantic tag list.</p>

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
          <td>Label</td>
          <td>string</td>
          <td>Human-readable mode name, such as <code>"Standard"</code>, <code>"Eco"</code>, or <code>"Quick"</code>. Must be unique within the same <code>SupportedModes</code> list</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique within the same <code>SupportedModes</code> list. This value is used as the <code>NewMode</code> parameter in the <code>ChangeToMode</code> command</td>
        </tr>
        <tr>
          <td>SemanticTags</td>
          <td>list&lt;<a href="#struct-semantic-tag">SemanticTagStruct</a>&gt;</td>
          <td>List of semantic tags that let controllers understand the mode meaning without parsing Label text. May be an empty list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SemanticTagStruct -->
  <h3 id="struct-semantic-tag">SemanticTagStruct</h3>
  <p>
    Attaches machine-readable semantic information to a mode. Through standardized tag values, "Eco" and "Quick" modes from different manufacturers can be identified uniformly.
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
          <td>MfgCode</td>
          <td>vendor-id（uint16）</td>
          <td>Manufacturer identifier. <code>0x0000</code> indicates a Matter standard-defined tag value; a non-zero value indicates a manufacturer-specific tag value. Used together with <code>StandardNamespace</code></td>
        </tr>
        <tr>
          <td>Value</td>
          <td>uint16</td>
          <td>Tag value; its specific meaning depends on <code>MfgCode</code> and <code>StandardNamespace</code>. For example, in the standard namespace, specific values may represent semantics like "Eco" or "Quick"</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Purpose of SemanticTag</div>
    <p>
      With only a <code>Label</code> (e.g., "ECO"), a controller would need natural language processing to understand the mode meaning.
      With <code>SemanticTag</code>, the controller can determine the meaning directly by numeric value — for example, a voice assistant can identify which mode is "Eco"
      without parsing label text in various languages.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>ModeSelect Cluster declares optional device capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DEPONOFF (Depends on OnOff)</span>
        <span class="enum-desc">Depends on the OnOff Cluster — when enabled, supports the OnMode attribute so the device automatically switches to a specified mode when turning from Off to On</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">When to Enable DEPONOFF</div>
    <p>
      If the device also has an OnOff Cluster (i.e., it can be turned on/off) and you want a specific mode applied automatically each time the device turns on (e.g., an air purifier defaulting to "Auto" mode on power-on),
      then DEPONOFF should be enabled. For pure mode selection without on/off interlock, this feature is not needed.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a dryer's ModeSelect Cluster — currently running in "Eco" mode:</p>

  <pre><code>{
  // --- Basic Information ---
  "0x0000": "Dry Mode",          // Description = "Dry Mode" (cluster purpose description)
  "0x0001": 0,                   // StandardNamespace = 0 (MfgSpecific namespace)
  "0x0003": 1,                   // CurrentMode = 1 (currently running in "Eco" mode)

  // --- Supported Modes List ---
  "0x0002": [                    // SupportedModes
    {
      "Label": "Standard",      // Mode 0: Standard dry
      "Mode": 0,
      "SemanticTags": []
    },
    {
      "Label": "Eco",           // Mode 1: Eco dry
      "Mode": 1,
      "SemanticTags": [
        { "MfgCode": 0, "Value": 16384 }
      ]
    },
    {
      "Label": "Quick",         // Mode 2: Quick dry
      "Mode": 2,
      "SemanticTags": []
    }
  ],

  // --- Startup & Interlock ---
  "0x0004": null,                // StartUpMode = null (restore pre-power-loss mode)
  "0x0005": 0                    // OnMode = 0 (switch to "Standard" mode on power-on)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When displaying a mode selection UI, the controller should first read <code>SupportedModes (0x0002)</code> to get the full mode list,
      then read <code>CurrentMode (0x0003)</code> to highlight the current mode.
      There is no need to read CurrentMode before switching — just send <code>ChangeToMode</code> directly; the device validates the NewMode value.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-switch-mode">Scenario 1: App Switches Device Operating Mode</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0002)</code> to get the mode list (Label + Mode number)</li>
    <li>Display the mode list in the UI; read <code>CurrentMode (0x0003)</code> to highlight the current mode</li>
    <li>When the user taps the target mode, send <code>ChangeToMode (0x00)</code> with <code>NewMode</code> set to that mode's Mode value</li>
    <li>Subscribe to <code>CurrentMode</code> attribute changes; update the UI once the switch is confirmed</li>
  </ol>

  <h3 id="scenario-startup-mode">Scenario 2: Set Power-Up Default Mode</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0002)</code> and let the user choose the mode to restore on power-up</li>
    <li>Write the <code>StartUpMode (0x0004)</code> value:
      <ul>
        <li>A specific mode number — always switch to that mode on power-up (e.g., an AC unit always starts in "Cool" mode)</li>
        <li><code>null</code> — restore the pre-power-loss mode (recommended; the user continues with whatever they last selected)</li>
      </ul>
    </li>
    <li>Note: if the device also has <code>OnMode</code> set, OnMode will override the StartUpMode effect after power-on</li>
  </ol>

  <h3 id="scenario-on-mode">Scenario 3: Auto-Switch Mode on Power-On (OnOff Interlock)</h3>
  <ol>
    <li>Verify that the device's <code>FeatureMap (0xFFFC)</code> includes <code>DEPONOFF</code> (Bit 0 = 1)</li>
    <li>Write the <code>OnMode (0x0005)</code> value — e.g., an air purifier automatically enters "Auto" mode on power-on</li>
    <li>When the device transitions from Off to On via the OnOff Cluster, <code>CurrentMode</code> automatically changes to the OnMode value</li>
    <li>Setting <code>OnMode</code> to <code>null</code> disables the interlock — the device keeps the previous mode after power-on</li>
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
  'operational-state': {
    title: 'OperationalState Cluster (0x0060)',
    description: 'Complete reference for the Matter OperationalState Cluster (0x0060) — Pause/Stop/Start/Resume commands, operational state machine, phase list, countdown, error handling, event notifications, and enum value lookup.',
    prev: { title: 'WindowCovering', slug: 'window-covering' },
    next: undefined,
    content: `<h1>OperationalState Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0060</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    OperationalState is a <strong>general-purpose state machine Cluster</strong> in Matter for describing appliance operational states.
    It provides a unified control interface for devices requiring Start/Pause/Stop/Resume operations, such as washing machines, dryers, ovens, and robot vacuums.
    As the base Cluster, device-specific variants (e.g., OvenCavityOperationalState, RVCOperationalState) all inherit from it.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">General-Purpose Base Cluster</div>
    <p>
      OperationalState defines <strong>generic</strong> state and error enumerations. Device-specific Clusters (e.g., oven, robot vacuum)
      inherit these base definitions and extend them with their own state values and error codes.
      For example, a robot vacuum (RVC) adds states like <code>SeekingCharger</code> and <code>Charging</code>,
      as well as errors like <code>StuckAtObstacle</code> and <code>DustBinFull</code>.
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
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    OperationalState Cluster has 4 commands corresponding to basic appliance operations.
    All commands return an <code>OperationalCommandResponse</code> containing an
    <a href="#struct-errorstate">ErrorStateStruct</a> to indicate success or failure.
    Click a command ID in the table below to jump to its detailed description.
  </p>

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
          <td>Pause</td>
          <td>Pause the current operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Stop</td>
          <td>Stop the operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Start</td>
          <td>Start the operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Resume</td>
          <td>Resume a paused operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Pause (0x00)</h3>
  <p>
    Pauses the device's current operation. On success，<code>OperationalState</code> attribute changes to
    <code>Paused (2)</code>. The device preserves current progress and can be resumed via the Resume command.
    No parameters required.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">State Constraints</div>
    <p>
      Pause is only valid when the device is in the <code>Running (1)</code> state.
      Calling it in the <code>Stopped (0)</code> or <code>Error (3)</code> state
      returns a <code>CommandInvalidInState (3)</code> error.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        While the washing machine is running, the user needs to open the door to add clothes. The app sends a Pause command;
        the washer pauses, drains, and unlocks the door. After adding clothes, send Resume to continue.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">Stop (0x01)</h3>
  <p>
    Completely stops the device's current operation. On success，<code>OperationalState</code> attribute changes to
    <code>Stopped (0)</code>. Unlike Pause, Stop discards current progress;
    a new Start is required to begin a new operation cycle. No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        An oven is baking and the user realizes the settings are wrong. Sending the Stop command terminates baking;
        afterwards the user can reconfigure parameters and send Start for a new baking cycle.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Start (0x02)</h3>
  <p>
    Starts the device's operation. On success，<code>OperationalState</code> attribute changes to
    <code>Running (1)</code>. Typically called when the device is in the <code>Stopped (0)</code> state.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After the user selects the wash program and temperature, they tap Start in the app;
        the app sends the Start command to begin the wash cycle.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">Resume (0x03)</h3>
  <p>
    Resumes an operation previously paused by Pause. On success，<code>OperationalState</code> attribute changes to
    <code>Running (1)</code> and the device continues from where it was paused. No parameters required.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">State Constraints</div>
    <p>
      Resume is only valid when the device is in the <code>Paused (2)</code> state.
      Calling it in the <code>Stopped (0)</code> state returns a
      <code>CommandInvalidInState (3)</code> error — use Start instead of Resume in that case.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        With the washing machine paused, the user closes the door and taps Continue.
        The app sends the Resume command and the washer continues from where it paused.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Command Response ====== -->
  <h3 id="cmd-response">OperationalCommandResponse</h3>
  <p>
    All four commands (Pause/Stop/Start/Resume) return this response.
    It contains an <a href="#struct-errorstate">ErrorStateStruct</a> indicating whether the command succeeded.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommandResponseState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>Command execution result. <code>ErrorStateID = 0 (NoError)</code> indicates success</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>OperationalState Cluster has 6 application attributes. Click an attribute ID below to jump to its detailed description.</p>

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
        <!-- Phase Info -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PhaseList</td>
          <td>list&lt;string&gt; / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Operation phase list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentPhase</td>
          <td>uint8 / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Current phase index</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CountdownTime</td>
          <td>elapsed_s / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Remaining time (seconds)</td>
        </tr>
        <!-- Operational State -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OperationalStateList</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td><a href="#group-state">Operational State</a></td>
          <td>All states supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>OperationalState</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td><a href="#group-state">Operational State</a></td>
          <td>Current operational state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OperationalError</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td><a href="#group-state">Operational State</a></td>
          <td>Current error information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Phase Info (0x0000, 0x0001, 0x0002) ====== -->
  <h3 id="group-phase">Phase Information (0x0000, 0x0001, 0x0002)</h3>
  <p>Describes the phase progress and remaining time of the current operation. For multi-phase devices (e.g., washing machines, dryers), these attributes let the app display precise progress.</p>

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
          <td>PhaseList</td>
          <td>list&lt;string&gt; / null</td>
          <td>
            An ordered list of phase names for the device operation. E.g., a washing machine might use <code>["Soak", "Wash", "Rinse", "Spin"]</code>.
            <strong>Nullable</strong> — <code>null</code> means the device does not support the phase concept (e.g., a simple on/off device).
            Maximum 32 entries
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPhase</td>
          <td>uint8 / null</td>
          <td>
            Index of the current phase in PhaseList (zero-based).
            <strong>Nullable</strong> — when PhaseList is <code>null</code>, this value is also <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CountdownTime</td>
          <td>elapsed_s / null</td>
          <td>
            Estimated remaining time for the current operation, in <strong>seconds</strong>. The device periodically updates this value.
            <strong>Nullable</strong> — <code>null</code> means the device cannot estimate remaining time
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Phase and Countdown</div>
    <p>
      <code>CountdownTime</code> is the remaining time for the entire operation cycle, not a single phase.
      When the device transitions between phases, <code>CurrentPhase</code> updates,
      while <code>CountdownTime</code> continues counting down until the operation completes.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Operational State (0x0003, 0x0004, 0x0005) ====== -->
  <h3 id="group-state">Operational State (0x0003, 0x0004, 0x0005)</h3>
  <p>Describes the device operational state and error information. This is the primary data source for device status in the app.</p>

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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>OperationalStateList</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td>
            All operational states supported by the device. Each entry has a state ID and optional localized label.
            Beyond standard states (0-3), devices may define extended states (ID &ge; 0x80)
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>OperationalState</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td>
            The device's current operational state; see
            <a href="#enum-opstate">OperationalStateEnum</a> for possible values.
            This is the primary attribute for device status display in the app
          </td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OperationalError</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>
            The device's current error state. When <code>OperationalState</code> is
            <code>Error (3)</code>, this attribute contains the specific error information.
            When no error, <code>ErrorStateID = 0 (NoError)</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-opstate">OperationalStateEnum</h3>
  <p>Operational state enumeration. The standard defines 4 base values; device-specific Clusters may extend 0x80-0xBF.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">Stopped — device is idle; can accept Start command</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">Running — operation in progress; can be Paused or Stopped</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">Paused — operation suspended; can be Resumed or Stopped</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Error</span>
        <span class="enum-desc">Error — fault occurred; check OperationalError for details</span>
      </div>
    </div>
  </div>

  <h3 id="enum-errorstate">ErrorStateEnum</h3>
  <p>Error state enumeration. The standard defines 4 generic error codes; device-specific Clusters may extend 0x40-0x7F.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoError</span>
        <span class="enum-desc">No error — everything is normal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnableToStartOrResume</span>
        <span class="enum-desc">Unable to start or resume — the device cannot begin the operation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UnableToCompleteOperation</span>
        <span class="enum-desc">Unable to complete operation — an unrecoverable problem occurred</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CommandInvalidInState</span>
        <span class="enum-desc">Command invalid in current state — e.g., calling Resume while Stopped</span>
      </div>
    </div>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-errorstate">ErrorStateStruct</h3>
  <p>
    Describes the device's error information. Used for both the <code>OperationalError</code> attribute and command responses.
    Contains an error code, optional localized label, and detailed description.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorStateID</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>Yes</td>
          <td>Error type code. <code>0</code> indicates no error</td>
        </tr>
        <tr>
          <td>ErrorStateLabel</td>
          <td>string</td>
          <td>No</td>
          <td>Optional localized error label for app display. When ErrorStateID is outside the standard range, this field <strong>must</strong> be provided</td>
        </tr>
        <tr>
          <td>ErrorStateDetails</td>
          <td>string</td>
          <td>No</td>
          <td>Optional detailed error description for diagnostics</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-opstate">OperationalStateStruct</h3>
  <p>
    Used in the <code>OperationalStateList</code> attribute to describe each operational state the device supports.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalStateID</td>
          <td>uint8</td>
          <td>Yes</td>
          <td>State code. 0-3 are standard; 0x80-0xBF are device-specific extensions</td>
        </tr>
        <tr>
          <td>OperationalStateLabel</td>
          <td>string</td>
          <td>No</td>
          <td>Optional localized state label. For standard states (0-3), may be omitted; for extended states (&ge;0x80), <strong>must</strong> be provided</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>OperationalState Cluster defines 2 events for notifying controllers of important state changes.</p>

  <h3 id="event-error">OperationalError Event</h3>
  <p>
    Triggered when the device enters an error state. Event priority is <strong>CRITICAL</strong>,
    ensuring controllers receive timely error notifications.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>Current error information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-completion">OperationCompletion Event</h3>
  <p>
    Triggered when the device completes a full operation cycle. Event priority is <strong>INFO</strong>.
    This event carries time statistics for the app to display an operation report.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CompletionErrorCode</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>Yes</td>
          <td>Error code at completion. <code>0 (NoError)</code> indicates normal completion</td>
        </tr>
        <tr>
          <td>TotalOperationalTime</td>
          <td>elapsed_s / null</td>
          <td>No</td>
          <td>Total operation time (seconds) including pauses. <code>null</code> means device does not track time</td>
        </tr>
        <tr>
          <td>PausedTime</td>
          <td>elapsed_s / null</td>
          <td>No</td>
          <td>Cumulative paused time (seconds). <code>null</code> means device does not track time</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Actual Running Time</div>
    <p>
      To calculate actual work time (excluding pauses), use
      <code>TotalOperationalTime - PausedTime</code>.
      For example, if a washer's total time is 90 minutes with 10 paused, the actual wash time is 80 minutes.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from an OperationalState Cluster on a running washing machine:</p>

  <pre><code>{
  // --- Phase Information ---
  "0x0000": ["Soak", "Wash", "Rinse", "Spin"],  // PhaseList (operation phase list)
  "0x0001": 1,                                   // CurrentPhase = 1（currently in "Wash" phase）
  "0x0002": 1620,                                // CountdownTime = 1620 seconds (27 min remaining)

  // --- Operational State ---
  "0x0003": [                                    // OperationalStateList (supported states)
    { "OperationalStateID": 0, "OperationalStateLabel": "Stopped" },
    { "OperationalStateID": 1, "OperationalStateLabel": "Running" },
    { "OperationalStateID": 2, "OperationalStateLabel": "Paused" },
    { "OperationalStateID": 3, "OperationalStateLabel": "Error" }
  ],
  "0x0004": 1,                                   // OperationalState = Running
  "0x0005": {                                    // OperationalError (no current error)
    "ErrorStateID": 0,
    "ErrorStateLabel": "",
    "ErrorStateDetails": ""
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      <code>PhaseList</code>, <code>CurrentPhase</code>, and <code>CountdownTime</code>
      are all Nullable. Simple devices may not support phases or countdowns and return <code>null</code>.
      The app must handle <code>null</code> when rendering the UI — hide
      the corresponding elements when the value is <code>null</code>.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-lifecycle">Scenario 1: Complete Washing Machine Lifecycle</h3>
  <ol>
    <li>The user selects a wash program; the app sends <code>Start (0x02)</code> command</li>
    <li>The washer state becomes <code>Running (1)</code>; <code>PhaseList</code> returns
      <code>["Soak", "Wash", "Rinse", "Spin"]</code> with <code>CurrentPhase = 0</code> (Soak)</li>
    <li>The app subscribes to <code>CurrentPhase</code> and <code>CountdownTime</code> changes, updating progress bar and countdown in real time</li>
    <li>The washer progresses through phases: <code>CurrentPhase</code> goes 0 → 1 → 2 → 3</li>
    <li>On completion, the device becomes <code>Stopped (0)</code> and fires the <code>OperationCompletion</code> event</li>
    <li>The app shows a completion notification: "Wash complete, total: 65 minutes"</li>
  </ol>

  <h3 id="scenario-error">Scenario 2: Error Handling and Recovery</h3>
  <ol>
    <li>The washing machine is running and detects a water inlet anomaly</li>
    <li>The device state becomes <code>Error (3)</code>; <code>OperationalError</code> updates to:
      <ul>
        <li><code>ErrorStateID = 1 (UnableToStartOrResume)</code></li>
        <li><code>ErrorStateLabel = "Water Inlet Error"</code></li>
        <li><code>ErrorStateDetails = "Water flow below threshold; check if the faucet is open"</code></li>
      </ul>
    </li>
    <li>The device fires the <code>OperationalError</code> event (CRITICAL); the app shows an error notification</li>
    <li>After fixing the inlet, send <code>Stop (0x01)</code> to clear the error state</li>
    <li>The device returns to <code>Stopped (0)</code>; send <code>Start (0x02)</code> to begin a new cycle</li>
  </ol>

  <h3 id="scenario-progress">Scenario 3: Progress Tracking and UI Display</h3>
  <ol>
    <li>The app reads <code>PhaseList</code> and renders a progress indicator (e.g., a 4-step bar)</li>
    <li>Subscribe to <code>CurrentPhase</code>; highlight the corresponding step on change</li>
    <li>Subscribe to <code>CountdownTime</code>; update the countdown in real time</li>
    <li>Subscribe to <code>OperationalState</code>; switch UI based on state:
      <ul>
        <li><code>Stopped (0)</code> —— show the "Start" button</li>
        <li><code>Running (1)</code> —— show "Pause" and "Stop" buttons with progress and countdown</li>
        <li><code>Paused (2)</code> —— show "Resume" and "Stop" buttons; countdown is paused</li>
        <li><code>Error (3)</code> —— show error information and a "Stop" button</li>
      </ul>
    </li>
    <li>Handle <code>PhaseList = null</code> — do not show phase progress; display only state and countdown</li>
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
  'laundry-washer-mode': {
    title: 'LaundryWasherMode Cluster (0x0051)',
    description: 'Complete reference for the Matter LaundryWasherMode Cluster (0x0051) — derived from ModeBase, supports Normal/Delicate/Heavy/Whites mode selection, ChangeToMode command, ModeTag semantic tags, and startup mode configuration.',
    prev: undefined,
    next: undefined,
    content: `<h1>LaundryWasherMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0051</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    LaundryWasherMode is a Cluster in Matter for washing machine mode selection, derived from ModeBase Cluster.
    It allows users to switch between multiple wash modes supported by the machine, such as Normal, Delicate, Heavy, and Whites.
    Each mode uses semantic tags (ModeTag) to describe its purpose, enabling standardized control across different manufacturers' washing machines.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Derived from ModeBase</div>
    <p>
      LaundryWasherMode inherits all commands and attribute structures from the ModeBase Cluster,
      and defines washing machine-specific ModeTag values (0x4000 ~ 0x4003).
      If you are already familiar with how ModeBase works, this Cluster operates exactly the same way -- only the mode tags differ.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag Tags</a>
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
    LaundryWasherMode Cluster has only one command, ChangeToMode, for switching wash modes.
    The device returns ChangeToModeResponse to indicate whether the switch succeeded.
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>Switch to a specified wash mode</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>Mode switch response (Status + StatusText)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeToMode (0x00)</h3>
  <p>
    Requests the device to switch to a specified wash mode. The NewMode value must match the Mode field of a ModeOptionStruct in the SupportedModes list.
    The device returns ChangeToModeResponse upon receipt.
  </p>

  <h4>Request Parameters</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must exist in the SupportedModes list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Response Fields (ChangeToModeResponse)</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>Operation result status code (see <a href="#status-codes">Status Codes</a>)</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string (optional)</td>
          <td>Human-readable status description; provides the reason on failure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects "Delicate" mode in the app. The app sends ChangeToMode (NewMode = 1).
        The washer returns ChangeToModeResponse (Status = 0x00, Success) and CurrentMode updates to 1.
        If the washer is running and does not allow switching, it returns GenericFailure with the reason in StatusText.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>LaundryWasherMode Cluster inherits 4 attributes from ModeBase.</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>All wash modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Currently selected mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>Default mode on device startup</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode automatically applied when device turns on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes (0x0000)</h3>
  <p>
    All wash modes supported by the device. Each element is a ModeOptionStruct:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Mode name for human display (e.g., "Normal", "Delicate")</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique in the list, used for the ChangeToMode command</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>List of semantic tags describing the mode's purpose (see <a href="#mode-tags">ModeTag Tags</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Difference Between Label and ModeTag</div>
    <p>
      Label is vendor-defined display text; different manufacturers may use different wording ("Normal", "Standard", "Regular").
      ModeTag is a standardized semantic tag. Apps should prioritize ModeTag values for determining mode type; Label is only for UI display.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode (0x0001)</h3>
  <p>
    The currently selected wash mode number. Must be the Mode field of a ModeOptionStruct in SupportedModes.
    Modified via the ChangeToMode command. Subscribe to this attribute for mode change notifications.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">StartUpMode (0x0002)</h3>
  <p>
    Initial mode after device power-on or restart. Nullable — <code>null</code> means retain the mode from before power loss.
    When set to a specific value, it must exist in the SupportedModes list.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode (0x0003)</h3>
  <p>
    Mode automatically applied when the device switches from Off to On. Nullable — <code>null</code> means no override; CurrentMode is preserved.
    If OnMode has a value, CurrentMode is forced to that value on every power-on, overriding StartUpMode.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Priority of OnMode vs StartUpMode</div>
    <p>
      If OnMode is not null, it takes priority over StartUpMode.
      Device power-on sequence: StartUpMode is applied first (if set), then OnMode overrides when transitioning from Off &rarr; On.
      The practical effect is that the device always uses the mode specified by OnMode after powering on.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== ModeTag Semantic Tags ====== -->
  <h2 id="mode-tags">ModeTag Semantic Labels</h2>
  <p>
    LaundryWasherMode defines 4 dedicated ModeTag values for standardized wash mode identification.
    The app should use these tags to identify mode purposes rather than relying on vendor-defined Label text.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal wash — default mode for everyday laundry</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Delicate</span>
        <span class="enum-desc">Delicate wash — for silk, lingerie, and other fine fabrics</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Heavy</span>
        <span class="enum-desc">Heavy wash — for heavily soiled work clothes, sportswear, etc.</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4003</span>
      <div>
        <span class="enum-name">Whites</span>
        <span class="enum-desc">Whites wash — designed for white garments, typically at higher water temperature</span>
      </div>
    </div>
  </div>

  <!-- ====== Status Codes ====== -->
  <h2 id="status-codes">Status Codes</h2>
  <p>Possible values for the Status field in ChangeToModeResponse:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Mode switch succeeded</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">Requested mode number does not exist in SupportedModes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">Generic failure — the device's current state does not allow switching (e.g., while running)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a LaundryWasherMode Cluster on a washer with 4 modes, currently in Normal:</p>

  <pre><code>{
  // --- Supported Modes ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = Normal
    },
    {
      "Label": "Delicate",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = Delicate
    },
    {
      "Label": "Heavy",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]   // 0x4002 = Heavy
    },
    {
      "Label": "Whites",
      "Mode": 3,
      "ModeTags": [{ "Value": 16387 }]   // 0x4003 = Whites
    }
  ],

  // --- Current Mode ---
  "0x0001": 0,                   // CurrentMode = 0 (Normal)

  // --- Startup and On Modes ---
  "0x0002": null,                // StartUpMode = null (retain last mode)
  "0x0003": null                 // OnMode = null (no override, keep CurrentMode)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      SupportedModes content is defined by the device manufacturer; different washers may support different numbers and numbering of modes.
      The app should dynamically read SupportedModes to display the mode list — do not hard-code mode options.
      Use ModeTag values to determine mode types rather than comparing Label strings.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-mode-select">Scenario 1: Select Wash Mode</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0000)</code> to get all wash modes supported by the device</li>
    <li>Display the mode list in the app, showing appropriate icons and descriptions based on ModeTag values</li>
    <li>The user selects "Delicate"; send <code>ChangeToMode (0x00)</code> with NewMode set to the corresponding Mode number</li>
    <li>Check ChangeToModeResponse Status:
      <ul>
        <li><code>0x00</code> (Success) — switch succeeded; subscribe to CurrentMode to confirm the update</li>
        <li><code>0x01</code> (UnsupportedMode) — invalid mode number; check synchronization with SupportedModes</li>
        <li><code>0x02</code> (GenericFailure) — device refused the switch; read StatusText for the reason (e.g., "Cannot switch mode while washing")</li>
      </ul>
    </li>
  </ol>

  <h3 id="scenario-startup">Scenario 2: Configure Startup Mode</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0000)</code> to get the available modes</li>
    <li>Write <code>StartUpMode (0x0002)</code> to set the power-on default mode:
      <ul>
        <li>Write a specific Mode number — automatically use that mode on every power-on (e.g., always default to Normal)</li>
        <li>Write <code>null</code> — retain the mode from before power loss (recommended)</li>
      </ul>
    </li>
    <li>To force a specific mode on every power-on, set <code>OnMode (0x0003)</code>, which takes priority over StartUpMode</li>
    <li>For most household use cases, it is recommended to set both to <code>null</code>, letting the user manually select a mode each time</li>
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
  },
  'laundry-washer-controls': {
    title: 'LaundryWasherControls Cluster (0x0053)',
    description: 'Complete reference for the Matter LaundryWasherControls Cluster (0x0053) — spin speed selection, rinse count control, SPIN/RINSE Features, NumberOfRinsesEnum quick reference, and real device data examples.',
    prev: undefined,
    next: undefined,
    content: `<h1>LaundryWasherControls Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0053</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (appliance application endpoint)
  </p>
  <p>
    LaundryWasherControls manages the operational parameters of a washing machine -- spin speed and rinse count.
    It is a purely <strong>attribute-driven</strong> Cluster (no commands); all operations are performed by directly writing attributes.
    It works in conjunction with <a href="../laundry-washer-mode/">LaundryWasherMode (0x0051)</a>:
    Mode handles wash mode selection (Normal, Delicate, Heavy, etc.), while Controls handles fine-tuning of operational parameters.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Division of Responsibilities with LaundryWasherMode</div>
    <p>
      A washing machine typically implements two Clusters simultaneously:
    </p>
    <ul>
      <li><strong>LaundryWasherMode (0x0051)</strong> -- selects the wash program (Normal, Delicate, Heavy, Whites, etc.), determining the overall wash strategy</li>
      <li><strong>LaundryWasherControls (0x0053)</strong> -- fine-tunes parameters within the selected mode (spin speed, rinse count)</li>
    </ul>
    <p>
      By analogy: Mode is "which recipe to use", Controls is "a little more or less salt".
      Both typically reside on the same Endpoint, and the app UI can be designed as a combined panel for mode selection and parameter adjustment.
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
  <p>LaundryWasherControls declares supported control capabilities through <code>FeatureMap</code> (0xFFFC). Features determine which attributes are available:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SPIN（SpinSpeedControl）</span>
        <span class="enum-desc">Spin speed control — enables SpinSpeeds and SpinSpeedCurrent attributes, allowing the user to select spin speed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">RINSE（RinseControl）</span>
        <span class="enum-desc">Rinse count control — enables NumberOfRinses and SupportedRinses attributes, allowing the user to select rinse count</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      <code>FeatureMap = 0x01</code> (SPIN only) -- only spin speed can be adjusted; rinse count is fixed by the wash mode.<br/>
      <code>FeatureMap = 0x02</code> (RINSE only) -- only rinse count can be adjusted; spin speed is fixed by the wash mode.<br/>
      <code>FeatureMap = 0x03</code> (SPIN + RINSE) -- both spin speed and rinse count can be adjusted independently; this is the most fully-featured configuration.
    </p>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    LaundryWasherControls has <strong>no commands</strong>; all operations are performed by reading and writing attributes.
    There are 4 attributes in two groups, corresponding to the SPIN and RINSE Features.
    Click an attribute ID below to jump to its detailed description.
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
        <!-- Spin Speed -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SpinSpeeds</td>
          <td>list&lt;string&gt;</td>
          <td><a href="#group-spin">Spin Speed</a></td>
          <td>Supported speed list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SpinSpeedCurrent</td>
          <td>uint8 / null</td>
          <td><a href="#group-spin">Spin Speed</a></td>
          <td>Currently selected speed index</td>
        </tr>
        <!-- Rinse Count -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>NumberOfRinses</td>
          <td>enum8</td>
          <td><a href="#group-rinse">Rinse Count</a></td>
          <td>Current rinse count setting</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>SupportedRinses</td>
          <td>list&lt;enum8&gt;</td>
          <td><a href="#group-rinse">Rinse Count</a></td>
          <td>Supported rinse options list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Spin Speed (0x0000, 0x0001) ====== -->
  <h3 id="group-spin">Spin Speed (0x0000, 0x0001)</h3>
  <p>
    Requires the <strong>SPIN (SpinSpeedControl)</strong> Feature.
    Controls the spin speed during the spin-dry phase — higher speeds extract more water but increase fabric wear.
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
          <td>SpinSpeeds<br/><span class="attr-cn">Speed List</span></td>
          <td>list&lt;string&gt;</td>
          <td>All spin speeds supported by the device, represented as a string list. Read-only. Each element is a vendor-defined speed name (e.g. <code>"400"</code>, <code>"800"</code>, <code>"1200"</code>, or <code>"Low"</code>, <code>"Medium"</code>, <code>"High"</code>). The list index is used with SpinSpeedCurrent</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SpinSpeedCurrent<br/><span class="attr-cn">Current Speed</span></td>
          <td>uint8 / null</td>
          <td>The currently selected spin speed, as an index into the SpinSpeeds list (starting from 0). Read-write. Nullable -- <code>null</code> means the speed is automatically determined by the device based on the wash mode. The written value must be in the range <code>0</code> ~ <code>SpinSpeeds.length - 1</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">SpinSpeedCurrent Is an Index, Not a Speed Value</div>
    <p>
      <code>SpinSpeedCurrent</code> stores the <strong>index</strong> into the <code>SpinSpeeds</code> list, not the actual speed value.
      For example, when <code>SpinSpeeds = ["400", "800", "1200"]</code>, writing <code>SpinSpeedCurrent = 1</code> selects <code>"800"</code> RPM.
      When displaying, the app should first read SpinSpeeds, then use SpinSpeedCurrent as an index to get the corresponding string.
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Speed Names Are Not Necessarily Numbers</div>
    <p>
      The strings in SpinSpeeds are defined by the manufacturer and are not necessarily pure numbers.
      Some washing machines may use descriptive text like <code>"Low"</code>, <code>"Medium"</code>, <code>"High"</code>,
      while others may use labels with units like <code>"400 RPM"</code>, <code>"No Spin"</code>.
      The app should display these strings directly rather than attempting to parse them as numbers.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Rinse Count (0x0002, 0x0003) ====== -->
  <h3 id="group-rinse">Rinse Count (0x0002, 0x0003)</h3>
  <p>
    Requires the <strong>RINSE (RinseControl)</strong> Feature.
    Controls the number of rinse cycles — more rinses reduce detergent residue in garments but increase water and time consumption.
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
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>NumberOfRinses<br/><span class="attr-cn">Rinse Count</span></td>
          <td>enum8</td>
          <td>The currently set rinse count level. Read-write. The written value must be in the SupportedRinses list (see enum below)</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>SupportedRinses<br/><span class="attr-cn">Supported Rinse Options</span></td>
          <td>list&lt;enum8&gt;</td>
          <td>The list of supported rinse count options. Read-only. Each element is a NumberOfRinsesEnum value. Apps should only display options included in this list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NumberOfRinsesEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">No rinse — skip the rinse phase; suitable for pre-wash or quick-wash scenarios</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Standard rinse — default rinse count for everyday laundry</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Extra</span>
        <span class="enum-desc">Extra rinse — one additional rinse cycle; suitable for baby clothes or sensitive skin</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Max</span>
        <span class="enum-desc">Maximum rinse — as many rinses as possible to minimize detergent residue</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SupportedRinses Determines Available Options</div>
    <p>
      Not all washing machines support all 4 rinse levels.
      Before displaying rinse options, the app must first read <code>SupportedRinses</code> and only show the values it contains.
      For example, <code>SupportedRinses = [1, 2]</code> means only Normal and Extra are supported;
      writing <code>NumberOfRinses = 0</code> (None) or <code>3</code> (Max) will be rejected by the device.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a LaundryWasherControls Cluster on a running washer with both SPIN and RINSE Features:</p>

  <pre><code>{
  // --- Spin Speed (SPIN Feature) ---
  "0x0000": [                   // SpinSpeeds — supported speed list
    "400",
    "600",
    "800",
    "1000",
    "1200"
  ],
  "0x0001": 2,                  // SpinSpeedCurrent = 2 (currently "800" RPM)

  // --- Rinse Count (RINSE Feature) ---
  "0x0002": 1,                  // NumberOfRinses = Normal (standard rinse)
  "0x0003": [0, 1, 2, 3]       // SupportedRinses = [None, Normal, Extra, Max]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      If the device only supports the SPIN Feature (<code>FeatureMap = 0x01</code>), only SpinSpeeds and SpinSpeedCurrent are available;
      if only the RINSE Feature (<code>FeatureMap = 0x02</code>), only NumberOfRinses and SupportedRinses.
      Check <code>FeatureMap (0xFFFC)</code> first; reading an unsupported attribute returns <code>UNSUPPORTED_ATTRIBUTE</code>.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Washing Machine Control Panel — Mode + Parameter Coordination</summary>
    <div class="scenario-content">
      <p>
        When operating the washer from the app, users typically select a wash mode first, then adjust spin speed and rinse count.
        The app needs to read data from both the LaundryWasherMode and LaundryWasherControls Clusters to build a complete control interface.
      </p>
      <ol>
        <li>Read <code>LaundryWasherMode</code>'s <code>SupportedModes (0x0000)</code> and <code>CurrentMode (0x0001)</code>; display mode selection buttons</li>
        <li>Read <code>LaundryWasherControls</code>'s <code>FeatureMap (0xFFFC)</code> to confirm which parameters are adjustable</li>
        <li>If SPIN is supported: read <code>SpinSpeeds (0x0000)</code> to generate a speed picker; mark the current selection with <code>SpinSpeedCurrent (0x0001)</code></li>
        <li>If RINSE is supported: read <code>SupportedRinses (0x0003)</code> to generate rinse options; mark the current value with <code>NumberOfRinses (0x0002)</code></li>
        <li>After the user switches wash mode, the device may automatically adjust SpinSpeedCurrent and NumberOfRinses — subscribe to changes on both attributes for timely UI updates</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Sensitive Fabric Washing — Low Speed + Extra Rinse</summary>
    <div class="scenario-content">
      <p>
        When washing baby clothes or delicate fabrics like silk, the user needs to lower the spin speed to reduce wear and increase rinse count to remove detergent residue.
      </p>
      <ol>
        <li>First switch to "Delicate" mode via <code>LaundryWasherMode</code></li>
        <li>Read <code>SpinSpeeds (0x0000)</code> and find the lowest speed index (typically 0)</li>
        <li>Write <code>SpinSpeedCurrent (0x0001) = 0</code> to select the lowest speed</li>
        <li>Check if <code>SupportedRinses (0x0003)</code> contains <code>2</code> (Extra) or <code>3</code> (Max)</li>
        <li>Write <code>NumberOfRinses (0x0002) = 2</code> (Extra) to increase the rinse count</li>
        <li>The app can preset this parameter combination for common scenarios (baby clothes, allergy-prone users, etc.) for one-tap application</li>
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
  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-feature {
    color: #60a5fa;
  }

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }

  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'dishwasher-mode': {
    title: 'DishwasherMode Cluster (0x0059)',
    description: 'Complete reference for the Matter DishwasherMode Cluster (0x0059) — derived from ModeBase, supports Normal/Heavy/Light wash mode switching, including ChangeToMode command, mode attributes, and ModeTag definitions.',
    prev: undefined,
    next: undefined,
    content: `<h1>DishwasherMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0059</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    DishwasherMode is used to control wash mode selection on a dishwasher.
    It is derived from the <strong>ModeBase</strong> Cluster, with a structure identical to LaundryWasherMode,
    differing only in that ModeTag values are defined for dishwasher scenarios (Normal / Heavy / Light).
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ModeBase Derived Cluster</div>
    <p>
      DishwasherMode is a derived Cluster of ModeBase (0x0050) and cannot be implemented independently --
      it reuses all command and attribute definitions from ModeBase, only extending with its own dedicated ModeTag enum values.
      Once you understand ModeBase, all Mode-type Clusters (washer, dishwasher, refrigerator, etc.) follow the same usage pattern.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag Enum</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    DishwasherMode inherits from ModeBase with only one command pair: the client sends ChangeToMode, and the device returns ChangeToModeResponse.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Direction</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-change">
          <td><a href="#cmd-change"><code>0x00</code></a></td>
          <td>Client &rarr; Server</td>
          <td>ChangeToMode</td>
          <td>Switch to a specified mode</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-response">
          <td><a href="#cmd-response"><code>0x01</code></a></td>
          <td>Server &rarr; Client</td>
          <td>ChangeToModeResponse</td>
          <td>Return switch result</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-change">ChangeToMode (0x00)</h3>
  <p>Requests the device to switch to a specified wash mode. The target mode must exist in SupportedModes.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must exist in the SupportedModes list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Switching During Operation</div>
    <p>
      When the dishwasher is running, the device may reject mode switching and return an error status code in ChangeToModeResponse.
      The specific behavior depends on the manufacturer's implementation.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-response">ChangeToModeResponse (0x01)</h3>
  <p>Response returned by the device after receiving ChangeToMode, indicating whether the switch succeeded.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td><code>0x00</code> = success; other values are vendor-defined error codes</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string (optional)</td>
          <td>Human-readable error description on failure, up to 64 bytes</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>DishwasherMode inherits 4 attributes from ModeBase. Click an attribute ID to jump to its description.</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>List of all modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Currently active mode number</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>Initial mode after power-on</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode forced on power-on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes (0x0000)</h3>
  <p>
    All wash modes supported by the device. Each element in the list is a <code>ModeOptionStruct</code>:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Human-readable mode name (e.g., <code>"Normal"</code>, <code>"Heavy"</code>)</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique within the list</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>Mode tags identifying the semantic meaning (see <a href="#mode-tags">ModeTag Enum</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Mode Numbers Are Vendor-Defined</div>
    <p>
      Mode numbers (0, 1, 2...) are vendor-defined ordinals that may differ between manufacturers.
      To determine the semantic meaning of a mode, check the ModeTag values in ModeTags rather than the Mode number.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode (0x0001)</h3>
  <p>
    The device's currently active mode number, which must be the Mode value of an entry in SupportedModes.
    Subscribe to this attribute to update the app UI when the mode changes.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">StartUpMode (0x0002)</h3>
  <p>
    Initial mode used after device power-on (or restart). Nullable — <code>null</code> means unspecified;
    the device decides on its own (typically restores the mode from before power loss).
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode (0x0003)</h3>
  <p>
    Mode forced when the device switches from Off to On. Nullable —
    <code>null</code> means no forced switch on power-on; CurrentMode is preserved.
  </p>
  <div class="callout callout-info">
    <div class="callout-title">Difference Between StartUpMode and OnMode</div>
    <p>
      <strong>StartUpMode</strong> takes effect when the device powers on (power loss recovery);
      <strong>OnMode</strong> takes effect when the device transitions from Off to On (e.g. when the user presses the start button).
      The two are triggered at different times and can be set to different values.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== ModeTag Enum ====== -->
  <h2 id="mode-tags">ModeTag Enum</h2>
  <p>
    DishwasherMode defines 3 dedicated ModeTag values for identifying dishwasher wash mode semantics.
    The app should identify mode meaning through ModeTag rather than relying on Label strings or Mode numbers.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal wash — default mode for everyday dishes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Heavy</span>
        <span class="enum-desc">Heavy wash — heavy grease, pots, and stubborn stains</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Light</span>
        <span class="enum-desc">Light wash — lightly soiled or delicate dishes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common ModeTag</div>
    <p>
      In addition to the above dedicated Tags, devices can also use common Tags defined by ModeBase, such as
      <code>0x0000</code> (Auto), <code>0x0001</code> (Quick), <code>0x0002</code> (Quiet), etc.
      A single mode can carry multiple Tags simultaneously.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a DishwasherMode Cluster on a dishwasher with three wash modes, currently in Normal:</p>

  <pre><code>{
  // --- Current Mode ---
  "0x0000": [                 // SupportedModes — supported mode list
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]
    },
    {
      "Label": "Heavy",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]
    },
    {
      "Label": "Light",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]
    }
  ],
  "0x0001": 0,               // CurrentMode = 0 (currently Normal mode)
  "0x0002": 0,               // StartUpMode = 0 (restore Normal on power-up)
  "0x0003": null              // OnMode = null (no forced mode on power-on)
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-switch">Scenario 1: Switch Wash Mode</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0000)</code> to get all modes and their ModeTag values</li>
    <li>Display mode options in the app based on ModeTag (e.g., "Normal", "Heavy", "Light")</li>
    <li>After the user's selection, send <code>ChangeToMode</code> with NewMode set to the target mode number</li>
    <li>Check <code>ChangeToModeResponse</code> Status — the dishwasher may return an error if currently running</li>
    <li>Subscribe to <code>CurrentMode (0x0001)</code> to confirm the switch succeeded</li>
  </ol>

  <h3 id="scenario-startup">Scenario 2: Configure Default Mode</h3>
  <ol>
    <li>The user selects "Default to Heavy mode on every power-on" in app settings</li>
    <li>Write <code>OnMode (0x0003)</code> to the Heavy mode number (e.g., <code>1</code>)</li>
    <li>From then on, every time the dishwasher powers on, it automatically enters Heavy mode</li>
    <li>To cancel the forced mode, write OnMode back to <code>null</code></li>
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
  },
  'dishwasher-alarm': {
    title: 'DishwasherAlarm Cluster (0x005D)',
    description: 'Complete reference for the Matter DishwasherAlarm Cluster (0x005D) — alarm bitmaps, Mask/Latch/State/Supported attributes, Reset and ModifyEnabledAlarms commands, Notify event, and typical scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>DishwasherAlarm Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005D</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    DishwasherAlarm is a Cluster in Matter specifically for dishwasher alarm and fault reporting.
    It uses a set of bitmaps to describe which alarms the device supports, which are currently enabled, and which are currently active.
    Controllers can subscribe to alarm state changes and allow users to configure which alarms they care about.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">RESET Feature</div>
    <p>
      The DishwasherAlarm Cluster defines a <strong>RESET</strong> Feature.
      When RESET is enabled, the Cluster provides the <code>Reset</code> command and the <code>Latch</code> attribute,
      allowing users to manually reset latched alarms. For devices that do not support the RESET Feature,
      alarms are automatically cleared when the fault is resolved, with no manual reset available.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#alarm-bits">Alarm Bit Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
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
    The DishwasherAlarm Cluster has 2 commands. <code>ModifyEnabledAlarms</code> allows users to select which alarms they care about,
    and <code>Reset</code> is used to manually reset latched alarms (requires the RESET Feature).
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
          <td>Reset</td>
          <td>Reset specified latched alarms</td>
          <td class="col-required">RESET</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ModifyEnabledAlarms</td>
          <td>Modify the enabled alarm mask</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Reset (0x00)</h3>
  <p>
    Manually reset one or more latched alarms. Only alarm bits marked as latched in the <code>Latch</code> attribute require manual reset;
    other alarms are automatically cleared when the fault is resolved. This command requires the device to support the RESET Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Alarms</td>
          <td>bitmap32</td>
          <td>Alarm bitmap to reset. Each bit corresponds to one alarm type (see <a href="#alarm-bits">Alarm Bit Definitions</a>); setting a bit to 1 means resetting that alarm</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        After a dishwasher drain fault (DrainError) is fixed, the alarm remains active in State because it is latched.
        The user taps "Clear Alarm" in the app; the app sends the Reset command with bit 1 set in the Alarms parameter,
        and the device clears the DrainError bit in State.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ModifyEnabledAlarms (0x01)</h3>
  <p>
    Modifies the alarm mask (Mask), controlling which alarms are enabled. Only alarms enabled in the Mask are reported by the device.
    Users can use this command to suppress alarm types they do not care about.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>New alarm mask. Each bit corresponds to one alarm type (see <a href="#alarm-bits">Alarm Bit Definitions</a>); setting a bit to 1 enables reporting for that alarm</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Mask Constraints</div>
    <p>
      The written Mask value must not exceed the range of the <code>Supported</code> attribute.
      If you attempt to enable an alarm bit the device does not support, the command will be rejected.
      For example, if the device's Supported = <code>0x07</code> (only the first 3 alarm types are supported),
      then Mask can only be set in the range <code>0x00</code> ~ <code>0x07</code>.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user unchecks the "Door not closed" alarm (DoorError, bit 2) in the settings page.
        The app sends ModifyEnabledAlarms, clearing bit 2 in Mask.
        Afterwards, even if the door is open, the device will not report a DoorError alarm.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>DishwasherAlarm Cluster has 4 application attributes, all of type bitmap32. Click an attribute ID below to jump to its description.</p>

  <!-- Attribute Summary Table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>Enabled alarm mask</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Latch</td>
          <td>bitmap32</td>
          <td>Alarm bits requiring manual reset</td>
          <td class="col-required">RESET</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>State</td>
          <td>bitmap32</td>
          <td>Currently active alarms</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>Supported</td>
          <td>bitmap32</td>
          <td>Alarm bits supported by the device</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x0000">Mask (0x0000)</h3>
  <p>
    Indicates which alarms are currently enabled. Only alarms whose corresponding bit is 1 in Mask will be reported in State by the device.
    Users can modify this attribute via the <code>ModifyEnabledAlarms</code> command.
    See <a href="#alarm-bits">Alarm Bit Definitions</a> for the meaning of each bit in Mask.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0000</code></td>
          <td>Mask (Alarm Mask)</td>
          <td>bitmap32</td>
          <td>Each bit corresponds to one alarm type. <code>1</code> = reporting enabled, <code>0</code> = suppressed. Initial value typically equals Supported (all enabled)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">Latch (0x0001)</h3>
  <p>
    Indicates which alarms are of the "latched" type -- meaning the alarm will not automatically clear after the fault is resolved and must be manually reset via the <code>Reset</code> command.
    This attribute is only present when the device supports the RESET Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0001</code></td>
          <td>Latch (Latch Bitmap)</td>
          <td>bitmap32</td>
          <td>Each bit corresponds to one alarm type. <code>1</code> = latched (requires manual reset), <code>0</code> = auto-clear. <strong>Requires RESET Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Latched vs Auto-Clear</div>
    <p>
      Typical use of latched alarms: even after an inflow fault has been physically resolved, the device maintains the alarm state
      until the user acknowledges it has been handled. This prevents users from missing important fault events.
      Auto-clearing alarms return to normal immediately after the fault disappears, suitable for transient anomalies (e.g. momentary temperature fluctuations).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">State (0x0002)</h3>
  <p>
    Reflects the currently active alarms on the device. Each bit corresponds to an alarm type; set to 1 means that alarm is currently active.
    This is the most commonly subscribed attribute for controllers, used for real-time fault monitoring.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0002</code></td>
          <td>State (Current Alarm State)</td>
          <td>bitmap32</td>
          <td>Each bit corresponds to one alarm type. <code>1</code> = alarm active, <code>0</code> = normal. Always a subset of Mask (suppressed alarms do not appear in State)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">Supported (0x0003)</h3>
  <p>
    Declares which alarm types the device hardware supports. This is a read-only attribute determined by device firmware.
    Valid bits in Mask and State cannot exceed the range of Supported.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0003</code></td>
          <td>Supported (Supported Alarm Bits)</td>
          <td>bitmap32</td>
          <td>Each bit corresponds to one alarm type. <code>1</code> = device supports this alarm. Read-only</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Alarm Bit Definitions ====== -->
  <h2 id="alarm-bits">Alarm Bit Definitions</h2>
  <p>
    The Mask, Latch, State, and Supported attributes share the same alarm bit definitions.
    Each bit represents a possible dishwasher fault type:
  </p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">InflowError</span>
        <span class="enum-desc">Water inflow fault — insufficient water pressure, stuck inlet valve, or supply interruption</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">DrainError</span>
        <span class="enum-desc">Water drain fault — drain pump failure, clogged pipes, or drain timeout</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">DoorError</span>
        <span class="enum-desc">Door not closed — door opened during operation or door lock failure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">TempTooLow</span>
        <span class="enum-desc">Water temperature too low — heater failure or abnormal inlet water temperature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TempTooHigh</span>
        <span class="enum-desc">Water temperature too high — thermostat failure or continuous heater operation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">WaterLevelError</span>
        <span class="enum-desc">Water level abnormal — potential overflow risk or water level sensor failure</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Bitmap Reading Example</div>
    <p>
      State = <code>0x00000006</code> (binary <code>...000110</code>)
      means bit 1 (DrainError) and bit 2 (DoorError) are both active.
      The application layer can check each alarm with bitwise AND operations.
    </p>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    DishwasherAlarm Cluster defines a <code>Notify</code> event, triggered when the alarm state changes.
    Controllers should subscribe to this event for real-time alarm change notifications.
  </p>

  <h3 id="event-notify">Notify Event</h3>
  <p>
    Triggered when the alarm state changes (alarm activated or cleared). The event carries a full snapshot
    at the time of change, enabling controllers to precisely track state transitions.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Active</td>
          <td>bitmap32</td>
          <td>Alarm bits newly activated in this change (bits changed from 0 to 1)</td>
        </tr>
        <tr>
          <td>Inactive</td>
          <td>bitmap32</td>
          <td>Alarm bits cleared in this change (bits changed from 1 to 0)</td>
        </tr>
        <tr>
          <td>State</td>
          <td>bitmap32</td>
          <td>Complete alarm state after change (matches the State attribute)</td>
        </tr>
        <tr>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>Alarm mask at time of change (matches the Mask attribute)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Event Examples</summary>
    <div class="scenario-content">
      <p>
        Dishwasher drain fault triggered: device fires a Notify event with Active = <code>0x02</code> (DrainError newly activated),
        Inactive = <code>0x00</code> (no alarms cleared), State = <code>0x02</code> (only drain alarm active),
        Mask = <code>0x3F</code> (all alarms enabled).
      </p>
      <p>
        After the fault is repaired and the user sends Reset: the device fires another Notify event with Active = <code>0x00</code>,
        Inactive = <code>0x02</code> (DrainError cleared), State = <code>0x00</code> (no active alarms),
        Mask = <code>0x3F</code>.
      </p>
    </div>
  </details>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>DishwasherAlarm Cluster declares advanced capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RESET</span>
        <span class="enum-desc">Alarm reset support — enables the Reset command and Latch attribute, allowing manual reset of latched alarms</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Impact of the RESET Feature</div>
    <p>
      <strong>With RESET enabled</strong>: The device provides the Latch attribute and Reset command. Certain critical alarms (e.g. inflow, drain faults)
      can be set as latched, ensuring the user does not miss them.<br/>
      <strong>Without RESET</strong>: All alarms are auto-clearing; State resets to zero automatically after the fault disappears.
      Suitable for simple devices that do not require user acknowledgment.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of a dishwasher supporting all 6 alarm types with RESET Feature enabled, with a drain alarm currently active:</p>

  <pre><code>{
  // --- Alarm Bitmap Attributes ---
  "0x0000": "0x0000003F",    // Mask = 0x3F (all 6 alarms enabled)
  "0x0001": "0x00000003",    // Latch = 0x03 (InflowError + DrainError require manual reset)
  "0x0002": "0x00000002",    // State = 0x02 (DrainError alarm currently active)
  "0x0003": "0x0000003F"     // Supported = 0x3F (device supports all 6 alarm bits)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      After reading bitmap attributes, the application must parse each bit to determine alarm status.
      It is recommended to first read <code>Supported (0x0003)</code> to confirm supported alarms,
      then combine with <code>Mask (0x0000)</code> to determine which are enabled,
      and finally use <code>State (0x0002)</code> to get currently active alarms.
      The relationship: State is a subset of Mask, which is a subset of Supported.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-monitoring">Scenario 1: Alarm Monitoring and Handling</h3>
  <ol>
    <li>Subscribe to the <code>Notify</code> event for real-time alarm state changes</li>
    <li>On receiving the event, check the <code>Active</code> field to identify newly triggered alarms</li>
    <li>Display the corresponding alarm information in the app (e.g., "Drain Error", "Door Not Closed")</li>
    <li>Read <code>Latch (0x0001)</code> to determine whether the alarm requires manual reset</li>
    <li>If latched — after the user resolves the fault, tap "Clear Alarm" in the app and send the <code>Reset (0x00)</code> command</li>
    <li>If auto-clear — wait for the fault to resolve on its own; State updates automatically</li>
  </ol>

  <h3 id="scenario-config">Scenario 2: User-Defined Alarm Configuration</h3>
  <ol>
    <li>Read <code>Supported (0x0003)</code> to get all alarm types supported by the device</li>
    <li>Read <code>Mask (0x0000)</code> to get the currently enabled alarms</li>
    <li>Display a toggle list in the settings page for the user to check/uncheck alarm types</li>
    <li>After the user makes changes, send <code>ModifyEnabledAlarms (0x01)</code> with the new Mask value</li>
    <li>For example: the user only wants inflow and drain alarms; send Mask = <code>0x03</code> (bit 0 + bit 1)</li>
    <li>Afterwards, the device only reports InflowError and DrainError; other alarms no longer trigger notifications</li>
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
  'refrigerator-mode': {
    title: 'RefrigeratorAndTemperatureControlledCabinetMode Cluster (0x0052)',
    description: 'Complete reference for the Matter RefrigeratorAndTemperatureControlledCabinetMode Cluster (0x0052) — derived from ModeBase, supports RapidCool/RapidFreeze mode switching, with independent refrigerator and freezer compartment control in multi-Endpoint architecture.',
    prev: undefined,
    next: undefined,
    content: `<h1>RefrigeratorAndTemperatureControlledCabinetMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0052</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Refrigerator/freezer compartment endpoints (may have multiple)
  </p>
  <p>
    RefrigeratorAndTemperatureControlledCabinetMode is a Cluster in Matter for refrigerator mode control, derived from ModeBase Cluster.
    It allows users to switch the operating mode of each temperature zone in the refrigerator, such as enabling RapidCool or RapidFreeze.
    Each mode uses semantic tags (ModeTag) to describe its purpose, enabling standardized control across different manufacturers' refrigerators.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Derived from ModeBase</div>
    <p>
      RefrigeratorAndTemperatureControlledCabinetMode inherits all commands and attribute structures from the ModeBase Cluster,
      and defines refrigerator-specific ModeTag values (0x4000 ~ 0x4001).
      If you are already familiar with how ModeBase works, this Cluster operates exactly the same way -- only the mode tags differ.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Multi-Endpoint Architecture</div>
    <p>
      A refrigerator device typically contains multiple temperature-controlled zones (refrigerator compartment, freezer compartment), each corresponding to an independent Endpoint.
      Each Endpoint has its own instance of the RefrigeratorAndTemperatureControlledCabinetMode Cluster,
      each maintaining independent SupportedModes and CurrentMode.
      For example, the refrigerator compartment Endpoint may support RapidCool, while the freezer compartment Endpoint supports RapidFreeze.
      When operating, first confirm the target Endpoint to avoid sending commands to the wrong temperature zone.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag Tags</a>
    <span class="nav-sep">|</span>
    <a href="#status-codes">Status Codes</a>
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
    The RefrigeratorAndTemperatureControlledCabinetMode Cluster has only one command, ChangeToMode, for switching refrigerator modes.
    After execution, the device returns a ChangeToModeResponse indicating whether the switch was successful.
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>Switch to a specified refrigerator mode</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>Mode switch response (Status + StatusText)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- Switch Mode (0x00)</h3>
  <p>
    Request the device to switch to a specified refrigerator mode. The NewMode value must be the Mode field of a ModeOptionStruct in the SupportedModes list.
    The device returns a ChangeToModeResponse upon receipt. Note that commands must be sent to the correct Endpoint -- the refrigerator and freezer compartments are independent.
  </p>

  <h4>Request Parameters</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must exist in the SupportedModes list of that Endpoint</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Response Fields (ChangeToModeResponse)</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>Operation result status code (see <a href="#status-codes">Status Codes</a>)</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string (optional)</td>
          <td>Human-readable status description; provides the reason on failure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user enables "RapidFreeze" mode for the freezer in the app. The app sends ChangeToMode (NewMode = 1) to the freezer Endpoint.
        The refrigerator returns ChangeToModeResponse (Status = 0x00, Success), and that Endpoint's CurrentMode updates to 1.
        If the refrigerator's current state does not allow switching (e.g. currently defrosting), it returns GenericFailure with the reason in StatusText.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The RefrigeratorAndTemperatureControlledCabinetMode Cluster inherits 4 attributes from ModeBase. Each Endpoint maintains its own copy.</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>All operating modes supported by this temperature zone</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Currently selected mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>Default mode on device startup</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode automatically applied when device turns on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes -- Supported Mode List (0x0000)</h3>
  <p>
    All operating modes supported by this Endpoint (temperature zone). Each element is a ModeOptionStruct:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Mode name for human reading (e.g. "Normal", "Rapid Cool")</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique in the list, used for the ChangeToMode command</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>List of semantic tags describing the mode's purpose (see <a href="#mode-tags">ModeTag Tags</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">SupportedModes May Differ Across Endpoints</div>
    <p>
      The refrigerator compartment Endpoint may support the RapidCool mode, while the freezer compartment Endpoint supports the RapidFreeze mode.
      Apps should read each Endpoint's SupportedModes separately and display available mode lists for each temperature zone independently.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode -- Current Mode (0x0001)</h3>
  <p>
    The currently selected operating mode number. The value must be the Mode field of a ModeOptionStruct in SupportedModes.
    Modified via the ChangeToMode command. Subscribe to this attribute to receive mode change notifications.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">StartUpMode -- Startup Mode (0x0002)</h3>
  <p>
    The initial mode after the device powers on or restarts. Nullable -- when <code>null</code>, the device retains the mode from before power loss.
    When setting a specific value, it must exist in the SupportedModes list.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">Recommendations for Refrigerator Use Cases</div>
    <p>
      After power loss recovery, a refrigerator should typically return to normal mode rather than continuing RapidCool/RapidFreeze.
      It is recommended to set StartUpMode to the normal mode number (e.g. 0) to avoid the compressor running at high power for extended periods after power recovery.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode -- Power-On Mode (0x0003)</h3>
  <p>
    The mode automatically applied when the device switches from Off to On. Nullable -- when <code>null</code>, no override occurs and CurrentMode remains unchanged.
    If OnMode has a value, every power-on will force CurrentMode to that value, ignoring the StartUpMode setting.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Priority of OnMode vs StartUpMode</div>
    <p>
      If OnMode is not null, it takes priority over StartUpMode.
      Device power-on sequence: StartUpMode is applied first (if set), then OnMode overrides when transitioning from Off &rarr; On.
      The practical effect is that the device always uses the mode specified by OnMode after powering on.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">DEPONOFF Feature and OnMode</div>
    <p>
      The OnMode attribute is only present when the device supports the DEPONOFF feature.
      This feature indicates that this Cluster depends on the OnOff Cluster on the same Endpoint,
      and when the OnOff state transitions from Off to On, CurrentMode is automatically set to the value specified by OnMode.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== ModeTag Semantic Tags ====== -->
  <h2 id="mode-tags">ModeTag Semantic Tags</h2>
  <p>
    RefrigeratorAndTemperatureControlledCabinetMode defines 2 dedicated ModeTag values for standardized description of refrigerator operating modes.
    Apps should identify mode purposes based on these tags rather than relying on vendor-defined Label text.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">RapidCool</span>
        <span class="enum-desc">Rapid cool -- rapidly lowers the refrigerator compartment temperature, suitable for when a large quantity of food has just been placed inside</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">RapidFreeze</span>
        <span class="enum-desc">Rapid freeze -- rapidly lowers the freezer compartment to extremely low temperatures, suitable for quickly freezing fresh food</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Mapping Between ModeTag and Endpoints</div>
    <p>
      Typically RapidCool appears in the SupportedModes of the refrigerator compartment Endpoint,
      and RapidFreeze appears in the SupportedModes of the freezer compartment Endpoint.
      However, the specification does not enforce this mapping -- some high-end refrigerators may support both tags in the same temperature zone.
      Apps should always rely on the actual SupportedModes read from the device.
    </p>
  </div>

  <!-- ====== Status Codes ====== -->
  <h2 id="status-codes">Status Codes</h2>
  <p>Possible values of the Status field in ChangeToModeResponse:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Mode switch successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">The requested mode number does not exist in SupportedModes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">Generic failure -- the device's current state does not allow switching (e.g. currently defrosting)</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The RefrigeratorAndTemperatureControlledCabinetMode Cluster declares supported features via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DEPONOFF (OnOff Dependency)</span>
        <span class="enum-desc">The Cluster depends on the OnOff Cluster on the same Endpoint, supporting automatic mode switching via the OnMode attribute on power-on</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical Significance of DEPONOFF</div>
    <p>
      Most refrigerators are not frequently powered on and off, so the DEPONOFF feature is rarely used in refrigerator scenarios.
      However, if the refrigerator's temperature zones can be independently toggled (e.g. a convertible compartment can switch between refrigeration/freezing/off),
      enabling DEPONOFF allows using the OnMode attribute to automatically restore the specified mode when the zone is turned back on.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Cluster data read from two Endpoints of a dual-zone refrigerator:</p>

  <h3>Refrigerator Compartment Endpoint</h3>
  <pre><code>{
  // --- Refrigerator Compartment Endpoint Modes ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": []              // Normal mode, no special tags
    },
    {
      "Label": "Rapid Cool",
      "Mode": 1,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = RapidCool
    }
  ],

  // --- Current mode ---
  "0x0001": 0,                   // CurrentMode = 0（Normal）

  // --- Startup and power-on modes ---
  "0x0002": null,                // StartUpMode = null (retain previous mode)
  "0x0003": null                 // OnMode = null (no override, keep CurrentMode)
}</code></pre>

  <h3>Freezer Compartment Endpoint</h3>
  <pre><code>{
  // --- Freezer Compartment Endpoint Modes ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": []
    },
    {
      "Label": "Rapid Freeze",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = RapidFreeze
    }
  ],

  // --- Current mode ---
  "0x0001": 1,                   // CurrentMode = 1 (Rapid Freeze active)

  // --- Startup and power-on modes ---
  "0x0002": 0,                   // StartUpMode = 0 (restore Normal on power-up)
  "0x0003": null                 // OnMode = null (no override)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      SupportedModes content and numbering can be completely different across Endpoints on the same refrigerator.
      The app should read SupportedModes independently for each Endpoint; do not assume zone mode lists are identical.
      Use ModeTag values to determine mode types rather than comparing Label strings or Mode numbers.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-rapid-cool">Scenario 1: Enable Rapid Cool After Loading Groceries</h3>
  <details class="scenario">
    <summary>Steps and Details</summary>
    <div class="scenario-content">
      <p><strong>Scenario</strong>: The user has just loaded a large amount of groceries and needs to quickly lower the refrigerator temperature to keep food fresh.</p>
      <ol>
        <li>Use the Descriptor Cluster to confirm the refrigerator's Endpoint structure and find the refrigerator compartment Endpoint</li>
        <li>Read the refrigerator Endpoint's <code>SupportedModes (0x0000)</code> and find the mode entry with the RapidCool (0x4000) ModeTag</li>
        <li>Send <code>ChangeToMode (0x00)</code> with NewMode set to the RapidCool Mode number</li>
        <li>Check whether the ChangeToModeResponse Status is Success</li>
        <li>Subscribe to <code>CurrentMode (0x0001)</code> and show Rapid Cool status in the UI</li>
        <li>After Rapid Cool finishes (automatically or manually), send ChangeToMode again to return to Normal mode</li>
      </ol>
      <p>
        <strong>Note</strong>: Some refrigerators automatically revert to Normal mode once the target temperature is reached.
        The app should detect this by subscribing to CurrentMode and updating the UI accordingly.
      </p>
    </div>
  </details>

  <h3 id="scenario-multi-endpoint">Scenario 2: Independent Multi-Zone Control</h3>
  <details class="scenario">
    <summary>Steps and Details</summary>
    <div class="scenario-content">
      <p><strong>Scenario</strong>: The user wants to enable Rapid Freeze in the freezer while keeping the refrigerator compartment in Normal mode.</p>
      <ol>
        <li>Read the Descriptor Cluster (Endpoint 0) to get all Endpoints and their Device Types</li>
        <li>Identify the refrigerator Endpoint (Device Type: Refrigerator, 0x0070) and freezer Endpoint (Device Type: Temperature Controlled Cabinet, 0x0071)</li>
        <li>Read <code>SupportedModes (0x0000)</code> from both Endpoints:
          <ul>
            <li>Refrigerator: may contain Normal and RapidCool</li>
            <li>Freezer: may contain Normal and RapidFreeze</li>
          </ul>
        </li>
        <li>Send <code>ChangeToMode</code> to the freezer Endpoint to switch to RapidFreeze mode</li>
        <li>Do not change the refrigerator compartment; keep its current mode</li>
        <li>Display both zones' current modes separately in the app, with independent controls for each</li>
      </ol>
      <p>
        <strong>Key point</strong>: The refrigerator and freezer Cluster instances are completely independent;
        operating on one Endpoint does not affect the other. The app design should reflect this zoned control concept.
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
  },
  'microwave-oven-mode': {
    title: 'MicrowaveOvenMode Cluster (0x005E)',
    description: 'Complete reference for the Matter MicrowaveOvenMode Cluster (0x005E) — derived from ModeBase, supports Normal/Defrost mode selection, ChangeToMode command, ModeTag semantic tags, and coordination with MicrowaveOvenControl.',
    prev: undefined,
    next: undefined,
    content: `<h1>MicrowaveOvenMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005E</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Microwave Oven Endpoint
  </p>
  <p>
    MicrowaveOvenMode is a Cluster for microwave oven mode selection in Matter, derived from the ModeBase Cluster.
    It allows users to switch between multiple heating modes, such as Normal heating and Defrost.
    Each mode is described by semantic tags (ModeTag), enabling standardized control across manufacturers.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Derived from ModeBase</div>
    <p>
      MicrowaveOvenMode inherits all command and attribute structures from the ModeBase Cluster,
      and defines microwave oven-specific ModeTag values (0x4000 ~ 0x4001).
      If you are already familiar with how ModeBase works, this Cluster operates exactly the same way -- only the mode tags differ.
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Coordination with MicrowaveOvenControl</div>
    <p>
      MicrowaveOvenMode only handles "selecting the heating mode" — it does not control cooking parameters.
      Full microwave operation requires the <strong>MicrowaveOvenControl (0x005F)</strong> Cluster,
      which handles cooking time, power level settings, and start/stop control.
      Typical flow: select mode with MicrowaveOvenMode, then set parameters and start with MicrowaveOvenControl.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag Tags</a>
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
    The MicrowaveOvenMode Cluster has only one command, ChangeToMode, for switching heating modes.
    After execution, the device returns a ChangeToModeResponse indicating whether the switch was successful.
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>Switch to a specified heating mode</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>Mode switch response (Status + StatusText)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- Switch Mode (0x00)</h3>
  <p>
    Request the microwave to switch to a specified heating mode. The NewMode value must be the Mode field of a ModeOptionStruct in the SupportedModes list.
    The device returns a ChangeToModeResponse upon receipt.
  </p>

  <h4>Request Parameters</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must exist in the SupportedModes list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Response Fields (ChangeToModeResponse)</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>Operation result status code (see <a href="#status-codes">Status Codes</a>)</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string (optional)</td>
          <td>Human-readable status description; provides the reason on failure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects "Defrost" mode in the app. The app sends ChangeToMode (NewMode = 1).
        The microwave returns ChangeToModeResponse (Status = 0x00, Success) and CurrentMode updates to 1.
        If the microwave is heating and does not allow switching, it returns GenericFailure with the reason in StatusText.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>MicrowaveOvenMode Cluster inherits 4 attributes from ModeBase.</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>All heating modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Currently selected mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>Default mode on device startup</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode automatically applied when device turns on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes -- Supported Mode List (0x0000)</h3>
  <p>
    All heating modes supported by the device. Each element is a ModeOptionStruct:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Mode name for human display (e.g., "Normal", "Defrost")</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique in the list, used for the ChangeToMode command</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>List of semantic tags describing the mode's purpose (see <a href="#mode-tags">ModeTag Tags</a>)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Difference Between Label and ModeTag</div>
    <p>
      Label is vendor-defined display text; different manufacturers may use different wording ("Normal", "Standard", "Regular").
      ModeTag is a standardized semantic tag. Apps should prioritize ModeTag values for determining mode type; Label is only for UI display.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode -- Current Mode (0x0001)</h3>
  <p>
    The currently selected heating mode number. The value must be the Mode field of a ModeOptionStruct in SupportedModes.
    Modified via the ChangeToMode command. Subscribe to this attribute to receive mode change notifications.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">StartUpMode -- Startup Mode (0x0002)</h3>
  <p>
    The initial mode after the device powers on or restarts. Nullable -- when <code>null</code>, the device retains the mode from before power loss.
    When setting a specific value, it must exist in the SupportedModes list.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode -- Power-On Mode (0x0003)</h3>
  <p>
    The mode automatically applied when the device switches from Off to On. Nullable -- when <code>null</code>, no override occurs and CurrentMode remains unchanged.
    If OnMode has a value, every power-on will force CurrentMode to that value, ignoring the StartUpMode setting.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Priority of OnMode vs StartUpMode</div>
    <p>
      If OnMode is not null, it takes priority over StartUpMode.
      Device power-on sequence: StartUpMode is applied first (if set), then OnMode overrides when transitioning from Off &rarr; On.
      The practical effect is that the device always uses the mode specified by OnMode after powering on.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== ModeTag Semantic Tags ====== -->
  <h2 id="mode-tags">ModeTag Semantic Tags</h2>
  <p>
    MicrowaveOvenMode defines 2 dedicated ModeTag values for standardized description of microwave oven heating mode types.
    Apps should identify mode purposes based on these tags rather than relying on vendor-defined Label text.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal heating — default mode for everyday food; heats continuously at the set power level</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Defrost</span>
        <span class="enum-desc">Defrost — heats intermittently at lower power to thaw frozen food without overcooking</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Vendors Can Add Custom Modes</div>
    <p>
      Beyond the spec-defined Normal and Defrost, vendors can add custom modes to SupportedModes
      (e.g., "Popcorn", "Beverage", "Reheat") using vendor-defined ModeTag values (0x8000-0xBFFF range).
      When the app encounters an unrecognized ModeTag, it should fall back to displaying the Label text.
    </p>
  </div>

  <!-- ====== Status Codes ====== -->
  <h2 id="status-codes">Status Codes</h2>
  <p>Possible values of the Status field in ChangeToModeResponse:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Mode switch successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">The requested mode number does not exist in SupportedModes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">Generic failure — device state does not allow switching (e.g., while heating)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a MicrowaveOvenMode Cluster on a microwave oven with Normal and Defrost modes, currently in Normal:</p>

  <pre><code>{
  // --- Supported modes list ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = Normal
    },
    {
      "Label": "Defrost",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = Defrost
    }
  ],

  // --- Current mode ---
  "0x0001": 0,                   // CurrentMode = 0（Normal）

  // --- Startup and power-on modes ---
  "0x0002": null,                // StartUpMode = null (retain previous mode)
  "0x0003": null                 // OnMode = null (no override, keep CurrentMode)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The contents of SupportedModes are defined by the device manufacturer; different microwaves may support different numbers and IDs of modes.
      When displaying the mode list, apps should dynamically read SupportedModes rather than hardcoding mode options.
      Use ModeTag values to determine mode type instead of comparing Label strings.
      Complete microwave control also requires reading the cooking time and power attributes from the MicrowaveOvenControl Cluster (0x005F).
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Select Heating Mode and Start the Microwave</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>SupportedModes (0x0000)</code> to get all heating modes supported by the microwave</li>
        <li>Display the mode list in the app UI, showing corresponding icons and descriptions based on ModeTag values (e.g. show a "Normal Heating" icon for 0x4000, a "Defrost" icon for 0x4001)</li>
        <li>The user selects "Defrost"; send <code>ChangeToMode (0x00)</code> with NewMode set to the corresponding Mode number</li>
        <li>Check the Status in ChangeToModeResponse:
          <ul>
            <li><code>0x00</code> (Success) -- switch successful; subscribe to CurrentMode to confirm the update</li>
            <li><code>0x02</code> (GenericFailure) — microwave is currently heating; read StatusText for the reason</li>
          </ul>
        </li>
        <li>After the mode is selected, set cooking time and power via MicrowaveOvenControl Cluster (0x005F), then start heating</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Complete Flow for Defrosting Frozen Food</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>SupportedModes (0x0000)</code> and find the mode entry with ModeTag 0x4001 (Defrost)</li>
        <li>Send <code>ChangeToMode</code> with NewMode set to that mode entry's Mode number</li>
        <li>Confirm ChangeToModeResponse returns Success</li>
        <li>Set the defrost time via MicrowaveOvenControl (defrost mode typically uses lower power; the device may automatically adjust the power level)</li>
        <li>Start heating and subscribe to MicrowaveOvenControl's OperationalState to track heating progress</li>
        <li>After heating finishes, the microwave stops automatically and sends a notification; the app prompts the user to remove the food</li>
      </ol>
      <p>
        <strong>Note</strong>: In defrost mode, the microwave typically works intermittently (alternating heating and pausing)
        to avoid overheating the exterior while the interior remains frozen. The specific power and intermittent strategy is controlled by device firmware; no app intervention needed.
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
    padding: 0.75rem 1rem;
  }
</style>`,
  },
  'microwave-oven-control': {
    title: 'MicrowaveOvenControl Cluster (0x005F)',
    description: 'Complete reference for the Matter MicrowaveOvenControl Cluster (0x005F) — SetCookingParameters command, CookTime/PowerSetting/SupportedWatts attribute definitions, PWRNUM/WATTS/PWRLMTS feature bits, and enum value quick reference.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>MicrowaveOvenControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005F</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Microwave Oven Endpoint
  </p>
  <p>
    MicrowaveOvenControl is the core control Cluster for microwave ovens in Matter kitchen appliances, managing cooking time, power level, and wattage settings.
    It does not handle starting/stopping cooking (handled by the OperationalState Cluster) or mode selection (handled by MicrowaveOvenMode),
    focusing solely on cooking parameters.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Three Clusters Working Together</div>
    <p>
      Microwave oven devices typically require three Clusters working together:<br/>
      <strong>MicrowaveOvenMode</strong> (0x005E) — select cooking mode (Normal, Defrost, preset menus, etc.)<br/>
      <strong>MicrowaveOvenControl</strong> (0x005F) — set cooking parameters (time, power, wattage)<br/>
      <strong>OperationalState</strong> (0x0060) — control cooking flow (start, pause, stop)<br/>
      Typical flow: select mode → set parameters → start cooking.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Power Representation Is Determined by Features</div>
    <p>
      Microwave power has two representation methods: <strong>numeric percentage</strong> (PWRNUM feature, e.g., 80%) and <strong>wattage level</strong> (WATTS feature, e.g., 900W).
      The device supports at least one. Always check FeatureMap before reading/writing power attributes to determine which method the device uses.
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
    The MicrowaveOvenControl Cluster has only one command -- <code>SetCookingParameters</code>.
    It is the sole entry point for setting cooking parameters; all parameters (time, power, wattage) are set through this single command.
    Note: this command only sets parameters and does not start cooking. Starting the cooking requires calling the OperationalState Cluster's Start command.
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
          <td>SetCookingParameters</td>
          <td>Set cooking parameters (time, power, wattage)</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SetCookingParameters (0x00)</h3>
  <p>
    Sets the microwave cooking parameters. All parameters are optional — only pass the fields that need changing; unspecified parameters retain their current values.
    Parameters can be set when the device is not running; some devices also allow changes while running (implementation-dependent).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CookMode</td>
          <td>uint8</td>
          <td>No</td>
          <td>Cooking mode number, corresponding to the mode value defined in the MicrowaveOvenMode Cluster</td>
        </tr>
        <tr>
          <td>CookTime</td>
          <td>uint32</td>
          <td>No</td>
          <td>Cooking time in seconds. Range: <code>1</code> to <code>MaxCookTime</code></td>
        </tr>
        <tr>
          <td>PowerSetting</td>
          <td>uint8</td>
          <td>No</td>
          <td>Power level numeric value. Range: <code>MinPower</code> to <code>MaxPower</code>, step size <code>PowerStep</code>. <strong>Requires PWRNUM feature</strong></td>
        </tr>
        <tr>
          <td>WattSettingIndex</td>
          <td>uint8</td>
          <td>No</td>
          <td>Index into the <code>SupportedWatts</code> list (zero-based). <strong>Requires WATTS feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">PowerSetting and WattSettingIndex Are Mutually Exclusive</div>
    <p>
      Only one of <code>PowerSetting</code> or <code>WattSettingIndex</code> can be passed per call — not both.
      Which one to use depends on the device's Feature: use PowerSetting for PWRNUM, WattSettingIndex for WATTS.
      Passing both returns <code>INVALID_COMMAND</code>.
    </p>
  </div>

  <h4>Usage Example: Set by Power Percentage (PWRNUM)</h4>
  <pre><code>{
  "CookTime": 180,          // Cook for 3 minutes
  "PowerSetting": 70        // Power 70%
}</code></pre>

  <h4>Usage Example: Set by Wattage Level (WATTS)</h4>
  <pre><code>{
  "CookTime": 300,          // Cook for 5 minutes
  "WattSettingIndex": 3     // Select the wattage at SupportedWatts[3]
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When the user selects "heat for 3 minutes at medium-high power" in the app, the app sends <code>SetCookingParameters(CookTime=180, PowerSetting=70)</code>.
        After parameters are set, call the OperationalState <code>Start</code> command to begin cooking.
        If you need to add time mid-cooking (e.g. "add 1 more minute"), you can call this command again while running to update CookTime.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    MicrowaveOvenControl attributes are organized into three groups: cooking time, power level, and wattage level.
    The latter two are gated by the PWRNUM and WATTS Features respectively.
    Click an attribute ID below to jump to its detailed description.
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
        <!-- Cook Time -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CookTime</td>
          <td>uint32</td>
          <td><a href="#group-time">Cook Time</a></td>
          <td>Currently set cook time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxCookTime</td>
          <td>uint32</td>
          <td><a href="#group-time">Cook Time</a></td>
          <td>Maximum allowed cook time (seconds)</td>
        </tr>
        <!-- Power Level -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PowerSetting</td>
          <td>uint8</td>
          <td><a href="#group-power">Power Level</a></td>
          <td>Current power level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>MinPower</td>
          <td>uint8</td>
          <td><a href="#group-power">Power Level</a></td>
          <td>Minimum settable power</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>MaxPower</td>
          <td>uint8</td>
          <td><a href="#group-power">Power Level</a></td>
          <td>Maximum settable power</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>PowerStep</td>
          <td>uint8</td>
          <td><a href="#group-power">Power Level</a></td>
          <td>Power adjustment step size</td>
        </tr>
        <!-- Wattage Level -->
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>SupportedWatts</td>
          <td>list[uint16]</td>
          <td><a href="#group-watts">Wattage Level</a></td>
          <td>Supported wattage list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>SelectedWattIndex</td>
          <td>uint8</td>
          <td><a href="#group-watts">Wattage Level</a></td>
          <td>Currently selected wattage index</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>WattRating</td>
          <td>uint16</td>
          <td><a href="#group-watts">Wattage Level</a></td>
          <td>Current wattage rating</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Cook Time (0x0001, 0x0002) ====== -->
  <h3 id="group-time">Cooking Time (0x0001, 0x0002)</h3>
  <p>Cooking time is a basic attribute supported by all microwave ovens; no special Feature is required.</p>

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
          <td>CookTime<br/><span class="attr-cn">Cook Time</span></td>
          <td>uint32</td>
          <td>Currently set cooking time in seconds. Default: <code>30</code> (30 seconds). During cooking, this value counts down to reflect remaining time. Range: <code>1</code> to <code>MaxCookTime</code></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MaxCookTime<br/><span class="attr-cn">Max Cook Time</span></td>
          <td>uint32</td>
          <td>Maximum cooking time allowed by the device, in seconds, read-only. Used by the app for input validation and time picker limits. Typical value: <code>5400</code> (90 minutes)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Time Unit Is Seconds, Not Minutes</div>
    <p>
      Unlike everyday usage, <code>CookTime</code> is in <strong>seconds</strong>.
      The app should convert to min:sec format for display (e.g., <code>120</code> sec → <code>2:00</code>).
      When the user enters "3 minutes", convert to <code>180</code> before writing.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Power Level (0x0003 ~ 0x0006) ====== -->
  <h3 id="group-power">Power Level (0x0003-0x0006)</h3>
  <p>
    A group of attributes representing power level as a numeric value. These require the <strong>PWRNUM</strong> feature.
    Without PWRNUM, <code>PowerSetting</code> still exists but defaults to <code>100</code> (full power) and cannot be modified.
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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>PowerSetting<br/><span class="attr-cn">Power Setting</span></td>
          <td>uint8</td>
          <td>Current power level. Without PWRNUM, fixed at <code>100</code>; with PWRNUM, range is <code>MinPower</code> to <code>MaxPower</code>, step size <code>PowerStep</code>. Default: <code>100</code> (full power)</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>MinPower<br/><span class="attr-cn">Min Power</span></td>
          <td>uint8</td>
          <td>Minimum power value supported. Default: <code>10</code>. <strong>Requires PWRLMTS feature</strong> (fixed at 10 without PWRLMTS)</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MaxPower<br/><span class="attr-cn">Max Power</span></td>
          <td>uint8</td>
          <td>Maximum power value supported. Default: <code>100</code>. <strong>Requires PWRLMTS feature</strong> (fixed at 100 without PWRLMTS)</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>PowerStep<br/><span class="attr-cn">Power Step</span></td>
          <td>uint8</td>
          <td>Power adjustment step size. Default: <code>10</code>. With step 10, power can only be 10, 20, 30...100. <strong>Requires PWRLMTS feature</strong> (fixed at 10 without PWRLMTS)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Relationship Between PWRNUM and PWRLMTS</div>
    <p>
      <strong>PWRNUM</strong> enables numeric power adjustment — without it, power is fixed at 100 (full).<br/>
      <strong>PWRLMTS</strong> extends PWRNUM, allowing custom Min/Max/Step limit parameters.
      PWRLMTS must be enabled together with PWRNUM (cannot be enabled alone).
      With PWRNUM but without PWRLMTS, default limits apply: Min=10, Max=100, Step=10.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Wattage Level (0x0007 ~ 0x0009) ====== -->
  <h3 id="group-watts">Wattage Level (0x0007-0x0009)</h3>
  <p>
    A group of attributes representing power as actual wattage. These require the <strong>WATTS</strong> feature.
    Unlike PWRNUM's percentage approach, WATTS uses a discrete wattage list for user selection.
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
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>SupportedWatts<br/><span class="attr-cn">Supported Watts List</span></td>
          <td>list[uint16]</td>
          <td>All wattage levels supported by the device, in ascending order. E.g., <code>[100, 300, 500, 700, 900, 1100]</code>. Read-only</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>SelectedWattIndex<br/><span class="attr-cn">Selected Watt Index</span></td>
          <td>uint8</td>
          <td>Index of the currently selected wattage in the <code>SupportedWatts</code> list (zero-based). Modified via the WattSettingIndex parameter of <code>SetCookingParameters</code></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>WattRating<br/><span class="attr-cn">Watt Rating</span></td>
          <td>uint16</td>
          <td>The microwave's rated power (watts), read-only. This is the device's nominal maximum wattage, typically equal to the highest value in <code>SupportedWatts</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Set Power by Index, Not Wattage Value</div>
    <p>
      When setting wattage, use the <strong>index</strong> into <code>SupportedWatts</code> (WattSettingIndex), not the wattage value itself.
      E.g., with <code>SupportedWatts = [100, 300, 500, 700, 900, 1100]</code>, setting 700W requires <code>WattSettingIndex = 3</code>.
      The app should first read the SupportedWatts list, display it as options (e.g., "Low 100W", "Medium 500W", "High 1100W"), then pass the corresponding index after user selection.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>MicrowaveOvenControl Cluster declares supported power control methods through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PWRNUM（PowerAsNumber）</span>
        <span class="enum-desc">Power as a numeric value — enables PowerSetting read/write (10-100 range)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">WATTS（WattRating）</span>
        <span class="enum-desc">Power as wattage — enables SupportedWatts list and WattSettingIndex selection</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">PWRLMTS（PowerNumberLimits）</span>
        <span class="enum-desc">Custom power limits — enables MinPower, MaxPower, PowerStep attributes (requires PWRNUM)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature Combination Constraints</div>
    <p>
      <strong>PWRNUM and WATTS are mutually exclusive</strong> — the device can only support one power representation method.<br/>
      <strong>PWRLMTS depends on PWRNUM</strong> — PWRLMTS requires PWRNUM to also be enabled.<br/>
      Common combinations: no Feature (time control only), PWRNUM (percentage power), PWRNUM + PWRLMTS (custom-range percentage), WATTS (wattage level selection).
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read result from a microwave oven supporting both PWRNUM and WATTS (in practice, a device only supports one power method; both shown here for completeness):</p>

  <pre><code>{
  // --- Cooking Time ---
  "0x0001": 120,            // CookTime = 120 sec (currently set to cook 2 minutes)
  "0x0002": 5400,           // MaxCookTime = 5400 sec (max 90 minutes)

  // --- Power Setting (PWRNUM Feature) ---
  "0x0003": 80,             // PowerSetting = 80 (current power 80%)
  "0x0004": 10,             // MinPower = 10 (minimum 10%)
  "0x0005": 100,            // MaxPower = 100 (maximum 100%)
  "0x0006": 10,             // PowerStep = 10 (step size 10%)

  // --- Wattage Setting (WATTS Feature) ---
  "0x0007": [100, 300, 500, 700, 900, 1100],  // SupportedWatts (supported wattage list)
  "0x0008": 4,              // SelectedWattIndex = 4 → corresponds to 900W
  "0x0009": 900             // WattRating = 900 (current rated wattage)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When displaying power in the app, first check <code>FeatureMap</code>:<br/>
      &bull; PWRNUM present → show as a percentage slider or level selector (10% / 20% / ... / 100%)<br/>
      &bull; WATTS present → read <code>SupportedWatts</code> list; display as wattage options (100W / 300W / 500W ...)<br/>
      &bull; Neither → device only supports full power; no power control UI needed
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Set Cooking Parameters and Start Heating</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>MaxCookTime (0x0002)</code> to determine the time limit for the time picker range</li>
        <li>Read <code>FeatureMap (0xFFFC)</code> to determine the power control method:
          <ul>
            <li>PWRNUM → read <code>MinPower (0x0004)</code>, <code>MaxPower (0x0005)</code>, <code>PowerStep (0x0006)</code> to build the power selector</li>
            <li>WATTS → read <code>SupportedWatts (0x0007)</code> list and display available wattages</li>
          </ul>
        </li>
        <li>After the user selects time and power, send <code>SetCookingParameters (0x00)</code> to write parameters</li>
        <li>Call the OperationalState Cluster's <code>Start</code> command to begin cooking</li>
        <li>Subscribe to <code>CookTime (0x0001)</code> changes for real-time countdown updates</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Adjust Time or Power Mid-Cooking</summary>
    <div class="scenario-content">
      <ol>
        <li>Read the current state from the OperationalState Cluster to confirm the device is running</li>
        <li>Read <code>CookTime (0x0001)</code> to get the current remaining time</li>
        <li>User taps "Add 30 seconds" → send <code>SetCookingParameters(CookTime=currentValue+30)</code></li>
        <li>User lowers power → send <code>SetCookingParameters(PowerSetting=50)</code> or <code>SetCookingParameters(WattSettingIndex=2)</code></li>
        <li>Note: whether parameters can be modified while running depends on the device implementation; some devices may require pausing first</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-feature {
    color: #60a5fa;
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
  'rvc-run-mode': {
    title: 'RvcRunMode Cluster (0x0054)',
    description: 'Complete reference for the Matter RvcRunMode Cluster (0x0054) — robot vacuum run mode management, ChangeToMode command, SupportedModes/CurrentMode/OnMode attributes, ModeTag enums, StatusCode error codes, and common scenarios.',
    prev: { title: 'OperationalState', slug: 'operational-state' },
    next: undefined,
    content: `<h1>RvcRunMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0054</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint) &nbsp;|&nbsp;
    <strong>Base Class</strong>: ModeBase (0x0050)
  </p>
  <p>
    RvcRunMode is a Cluster defined in Matter for <strong>robot vacuum cleaners (RVC)</strong> to manage run modes.
    It inherits from ModeBase and specifically manages the robot vacuum's high-level operating states -- Idle, Cleaning, and Mapping.
    By switching run modes, users can control whether the robot starts cleaning, draws a map, or returns to standby.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Robot Vacuum Cluster Trio</div>
    <p>
      Matter defines three cooperating Clusters for robot vacuums, each managing a different aspect:
    </p>
    <ul>
      <li><strong>RvcRunMode (this page)</strong> -- high-level operating state: Idle / Cleaning / Mapping</li>
      <li><strong>RvcCleanMode</strong> -- cleaning intensity: Quiet / Standard / Deep Clean</li>
      <li><strong>RvcOperationalState</strong> -- real-time operational state: seeking charger, charging, stuck, etc.</li>
    </ul>
    <p>
      Typical flow: first set the cleaning intensity via RvcCleanMode, then switch to Cleaning mode via RvcRunMode to start work;
      real-time status during operation (charging, stuck, returning to dock) is reported by RvcOperationalState.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">Mode Tags</a>
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
    RvcRunMode inherits from ModeBase with only one command pair: send a mode switch request and the device returns the execution result.
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
        <tr class="clickable-row" data-href="#cmd-change-to-mode">
          <td><a href="#cmd-change-to-mode"><code>0x00</code></a></td>
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>Request switch to specified run mode</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-change-to-mode-response">
          <td><a href="#cmd-change-to-mode-response"><code>0x01</code></a></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>Return mode switch execution result</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-change-to-mode">ChangeToMode -- Switch Run Mode (0x00)</h3>
  <p>
    Request the device to switch to a specified run mode. The mode number must be a valid value defined in <code>SupportedModes</code>.
    Upon receipt, the device validates whether the current state allows the switch (e.g. it may not be possible to start cleaning while charging), then returns the result via
    <a href="#cmd-change-to-mode-response">ChangeToModeResponse</a>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number; must be the Mode field value of a mode in the SupportedModes list</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user taps "Start Cleaning" in the app. The app sends ChangeToMode(NewMode=1) to switch the robot from Idle to Cleaning mode.
        If the robot's battery is too low or the dust bin is not installed, the device returns the corresponding error status code in the response.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-change-to-mode-response">ChangeToModeResponse -- Switch Result (0x01)</h3>
  <p>
    The device's response to the ChangeToMode command. The Status field indicates whether the switch was successful; on failure, a text description is included.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>uint8</td>
          <td>
            <code>0x00</code> = Success; other values are error codes (see <a href="#status-codes">Status Codes</a> section)
          </td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string (optional)</td>
          <td>Human-readable status description for debugging or displaying to the user</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Generic Error Codes vs RVC-Specific Error Codes</div>
    <p>
      The Status field's value space is divided into two ranges: <code>0x00-0x3F</code> for ModeBase generic error codes (e.g. GenericFailure, InvalidInMode),
      and <code>0x40-0x7F</code> for <strong>robot vacuum-specific</strong> error codes (e.g. stuck, dust bin missing).
      The app needs to handle both ranges.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    RvcRunMode inherits three attributes from ModeBase. Note: ModeBase defines StartUpMode (0x0002),
    but <strong>robot vacuums do not support this attribute</strong> -- the robot's power-on behavior is determined by OnMode.
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>List of run modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Current run mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode automatically entered when device wakes up</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes -- Supported Mode List (0x0000)</h3>
  <p>
    All run modes supported by the device. Each mode contains a label name, mode number, and a set of mode tags (ModeTag).
    The list remains fixed throughout the device's lifecycle.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Display name of the mode, e.g. "Cleaning", "Mapping"</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique within the list, used as the ChangeToMode parameter</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>Mode tag list identifying the semantic meaning (see <a href="#mode-tags">Mode Tags</a> section)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode -- Current Mode (0x0001)</h3>
  <p>
    The device's current run mode number. The value must be the Mode field of a mode in SupportedModes.
    Subscribe to this attribute to track the robot vacuum's operating state changes in real-time.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Subscription Recommendation</div>
    <p>
      It is recommended that apps subscribe to CurrentMode changes rather than polling.
      When the robot finishes cleaning and automatically returns to Idle mode, or stops due to an error, subscriptions provide real-time notifications.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode -- Wake-Up Mode (0x0003)</h3>
  <p>
    The mode the device automatically enters when waking from an inactive state. The value is the Mode field of a mode in SupportedModes,
    or <code>null</code> meaning no automatic mode switch.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">No StartUpMode</div>
    <p>
      ModeBase defines the <code>StartUpMode (0x0002)</code> attribute, but RvcRunMode <strong>explicitly excludes it</strong>.
      The robot vacuum's power-on behavior is controlled solely by OnMode. If you find 0x0002 does not exist when reading attributes, this is normal.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Mode Tags (ModeTag) ====== -->
  <h2 id="mode-tags">Mode Tags (ModeTag)</h2>
  <p>
    Each run mode is identified semantically through ModeTag. ModeTag enables different manufacturers' robots to use different Label text,
    while apps can still identify whether it's a Cleaning mode or Mapping mode through standardized Tag values.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Idle</span>
        <span class="enum-desc">The robot vacuum is in standby, not performing any task</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Cleaning</span>
        <span class="enum-desc">The robot vacuum is performing a cleaning task</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Mapping</span>
        <span class="enum-desc">The robot vacuum is scanning the environment and building a map without actual cleaning</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical Usage of ModeTag</div>
    <p>
      Manufacturer A's cleaning mode is called "Auto Clean" (Mode=1), Manufacturer B calls it "Smart Clean" (Mode=3),
      but both have <code>0x4001 (Cleaning)</code> in their ModeTags.
      Apps should use ModeTag rather than Label or Mode number to determine mode semantics.
    </p>
  </div>

  <!-- ====== Status Codes (StatusCode) ====== -->
  <h2 id="status-codes">Status Codes</h2>
  <p>
    The ChangeToModeResponse Status field uses the following error codes. <code>0x00</code> indicates success;
    <code>0x01-0x03</code> are ModeBase generic error codes, and <code>0x41-0x48</code> are robot vacuum-specific error codes.
  </p>

  <h3>Generic Status Codes (ModeBase)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Mode switch successful</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">The requested mode number is not in SupportedModes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">Generic failure; cannot be attributed to a specific cause</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">InvalidInMode</span>
        <span class="enum-desc">Switching to the target mode is not allowed from the current mode</span>
      </div>
    </div>
  </div>

  <h3>Robot Vacuum-Specific Status Codes</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Stuck</span>
        <span class="enum-desc">The robot is stuck on an obstacle and cannot move</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">DustBinMissing</span>
        <span class="enum-desc">Dust bin not properly installed; cleaning start refused</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">DustBinFull</span>
        <span class="enum-desc">Dust bin is full; must be emptied before continuing</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">WaterTankEmpty</span>
        <span class="enum-desc">Water tank is empty; mopping function cannot start</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">WaterTankMissing</span>
        <span class="enum-desc">Water tank not installed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">WaterTankLidOpen</span>
        <span class="enum-desc">Water tank lid not properly closed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">MopCleaningPadMissing</span>
        <span class="enum-desc">Mop / cleaning pad not installed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x48</span>
      <div>
        <span class="enum-name">BatteryLow</span>
        <span class="enum-desc">Battery level too low to start a task; charging required first</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">App-Side Error Handling Recommendations</div>
    <p>
      These status codes all correspond to <strong>physical issues that users can resolve themselves</strong>.
      When the app receives an error code, it should display clear action guidance to the user, such as "Please empty the dust bin and try again" or "Please install the water tank",
      rather than a generic "Operation failed". The StatusText field can also serve as fallback display text.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of the RvcRunMode Cluster from a robot vacuum supporting three run modes, currently cleaning:</p>

  <pre><code>{
  // --- Supported run modes ---
  "0x0000": [                                    // SupportedModes (device supported modes list)
    {
      "Label": "Idle",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]           // 0x4000 = Idle
    },
    {
      "Label": "Cleaning",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]           // 0x4001 = Cleaning
    },
    {
      "Label": "Mapping",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]           // 0x4002 = Mapping
    }
  ],

  // --- Current state ---
  "0x0001": 1,              // CurrentMode = 1 (currently cleaning)
  "0x0003": 0               // OnMode = 0 (device defaults to Idle mode after waking up)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">About ModeTag Values</div>
    <p>
      The ModeTags Value in the example uses decimal: <code>16384</code> = <code>0x4000</code> (Idle),
      <code>16385</code> = <code>0x4001</code> (Cleaning), <code>16386</code> = <code>0x4002</code> (Mapping).
      The actual protocol transmission uses integer values; the documentation commonly uses hexadecimal for easy reference against the specification.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-start-cleaning">Scenario 1: Start Cleaning</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0000)</code>, find the mode with <code>0x4001 (Cleaning)</code> in its ModeTags, and note its Mode number</li>
    <li>Send <code>ChangeToMode (0x00)</code> with NewMode set to the number obtained above</li>
    <li>Check the <code>ChangeToModeResponse</code> Status:
      <ul>
        <li><code>0x00</code> -- Success, the vacuum starts cleaning</li>
        <li><code>0x42</code> -- Dust bin not installed; prompt the user to install it</li>
        <li><code>0x43</code> -- Dust bin full; prompt the user to empty it</li>
        <li><code>0x48</code> -- Battery low; prompt the user to charge first</li>
      </ul>
    </li>
    <li>Subscribe to <code>CurrentMode (0x0001)</code>; when the value returns to the Idle mode number, cleaning is complete</li>
  </ol>

  <h3 id="scenario-check-status">Scenario 2: Query Current Status and Display</h3>
  <ol>
    <li>Read <code>SupportedModes (0x0000)</code> to get the complete mode list</li>
    <li>Read <code>CurrentMode (0x0001)</code> to get the current mode number</li>
    <li>Find the matching mode in SupportedModes and display its Label in the app UI (e.g. "Cleaning")</li>
    <li>Also check the Tag values in ModeTags to assist UI display with standardized semantics:
      <ul>
        <li><code>0x4000 (Idle)</code> -- Display standby icon</li>
        <li><code>0x4001 (Cleaning)</code> -- Display cleaning animation</li>
        <li><code>0x4002 (Mapping)</code> -- Display map scanning progress</li>
      </ul>
    </li>
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
  'rvc-clean-mode': {
    title: 'RvcCleanMode Cluster (0x0055)',
    description: 'Complete reference for the Matter RvcCleanMode Cluster (0x0055) — robot vacuum cleaning intensity modes, ChangeToMode command, SupportedModes/CurrentMode/OnMode attributes, DeepClean/VacuumOnly/MopOnly/VacuumAndMop mode tag definitions and enum value quick reference.',
    prev: undefined,
    next: undefined,
    content: `<h1>RvcCleanMode Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0055</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    RvcCleanMode is the <strong>cleaning intensity mode</strong> Cluster for Robot Vacuum Cleaners (RVC),
    derived from ModeBase (0x0049). It defines different cleaning methods for the vacuum -- Deep Clean, Vacuum Only, Mop Only, Vacuum and Mop, etc.
    Used in conjunction with <strong>RvcRunMode</strong> (0x0054, run modes: Cleaning/Mapping/Return to Dock): RvcRunMode determines "what task to do",
    while RvcCleanMode determines "at what intensity".
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ModeBase Derived Cluster</div>
    <p>
      RvcCleanMode inherits all commands and attribute structures from ModeBase, but <strong>does not support</strong> the <code>StartUpMode</code> attribute
      (explicitly prohibited by the specification). The default cleaning mode after power-on is controlled by <code>OnMode</code>.
      Mode tags (ModeTag) define RVC-specific cleaning types in the 0x4000~0x4003 range.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">Mode Tags</a>
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
    RvcCleanMode has only one command, <code>ChangeToMode</code>, inherited from ModeBase.
    The device switches the cleaning mode upon receipt and returns the execution result via <code>ChangeToModeResponse</code>.
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>Switch cleaning mode</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>Mode switch result</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- Switch Mode (0x00)</h3>
  <p>
    Request the device to switch to the specified cleaning mode. <code>NewMode</code> must be
    a Mode value that exists in the <code>SupportedModes</code> list; otherwise the device will refuse.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>Target mode number, taken from the Mode field in SupportedModes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Switching Timing Constraints</div>
    <p>
      Switching cleaning modes while the vacuum is <strong>running</strong> may be refused by the device with
      <code>InvalidInMode (0x03)</code>. Some devices only allow switching in Idle or Docked state.
      It is recommended to first check RvcRunMode's CurrentMode to confirm the device is in an inactive state before switching.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ChangeToModeResponse -- Response (0x01)</h3>
  <p>
    The device returns this response after receiving ChangeToMode, indicating whether the switch was successful.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>uint8</td>
          <td>Status code. <code>0x00 (Success)</code> indicates a successful switch; see <a href="#status-codes">Status Codes</a> for others</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string</td>
          <td>Optional description text; provides more information on failure</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    RvcCleanMode inherits three attributes from ModeBase. Note: ModeBase's <code>StartUpMode (0x0002)</code>
    is <strong>prohibited</strong> in RvcCleanMode and will not appear.
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>All cleaning modes supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>Current cleaning mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>Mode automatically applied after power-on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Attribute Details -->
  <h3 id="attr-0x0000">SupportedModes -- Mode List (0x0000)</h3>
  <p>
    All cleaning modes supported by the device. Each mode contains a number, label, and mode tags (ModeTag);
    ModeTag identifies the cleaning type of that mode (e.g. Deep Clean, Vacuum Only).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field (ModeOptionStruct)</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>Human-readable mode name, up to 64 characters, e.g. "Deep Clean", "Vacuum Only"</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>Mode number, unique within the list. This is the value used as the ChangeToMode command parameter</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>List of mode tags, at least one. See <a href="#mode-tags">Mode Tags</a> for details</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CurrentMode -- Current Mode (0x0001)</h3>
  <p>
    The device's current cleaning mode number; always the Mode value of an entry in SupportedModes.
    Subscribing to this attribute keeps the app UI synchronized when the mode switches.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">OnMode -- Power-On Mode (0x0003)</h3>
  <p>
    The cleaning mode the device automatically switches to after power-on. <strong>Nullable</strong> -- <code>null</code>
    indicates retaining the previously used mode after power-on. Writing requires operational privilege.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">OnMode vs StartUpMode</div>
    <p>
      The ModeBase specification defines <code>StartUpMode (0x0002)</code>, but RvcCleanMode
      <strong>explicitly prohibits</strong> the use of StartUpMode. Power-on mode control is handled exclusively through OnMode.
      If OnMode is <code>null</code>, the device retains the cleaning mode from before power loss.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Mode Tags (ModeTag) ====== -->
  <h2 id="mode-tags">Mode Tags (ModeTag)</h2>
  <p>
    RvcCleanMode defines 4 dedicated tags in the 0x4000~0x4003 range to identify cleaning method semantics.
    Apps can display corresponding icons or categories based on ModeTag rather than relying on Label string matching.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">DeepClean</span>
        <span class="enum-desc">Deep Clean -- maximum suction + multiple passes, suitable for heavily soiled areas</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">VacuumOnly</span>
        <span class="enum-desc">Vacuum Only -- activates only the vacuum function, mopping module disabled</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">MopOnly</span>
        <span class="enum-desc">Mop Only -- activates only the mopping module, vacuum disabled</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4003</span>
      <div>
        <span class="enum-name">VacuumAndMop</span>
        <span class="enum-desc">Vacuum and Mop -- simultaneous vacuuming and mopping (the most common everyday mode)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">ModeTag and ModeBase Common Tags</div>
    <p>
      In addition to the RVC-specific tags above, each mode can also carry ModeBase-defined common tags,
      such as <code>Auto (0x0000)</code>, <code>Quick (0x0001)</code>, <code>Quiet (0x0002)</code>, etc.
      A mode can have multiple tags simultaneously -- for example, "Quiet Vacuum" can be tagged as
      <code>VacuumOnly (0x4001)</code> + <code>Quiet (0x0002)</code>.
    </p>
  </div>

  <!-- ====== Status Codes ====== -->
  <h2 id="status-codes">Status Codes</h2>
  <p>
    The Status field in ChangeToModeResponse uses the following status codes, sharing the same extended definitions as RvcRunMode.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Success -- mode has been switched</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">Unsupported mode -- NewMode is not in SupportedModes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">Generic failure -- unable to switch due to an unknown reason</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">InvalidInMode</span>
        <span class="enum-desc">Not allowed in current state -- e.g. switching cleaning modes while the vacuum is running</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">RVC-Specific Constraints</div>
    <p>
      Switching cleaning modes while the vacuum is in states such as "Cleaning" or "Returning to Dock" is typically refused
      (returns <code>InvalidInMode</code>). Before sending ChangeToMode,
      it is recommended to first read RvcRunMode's CurrentMode to confirm the device is in Idle or standby state.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A robot vacuum supporting four cleaning modes, currently in "Vacuum and Mop" mode:</p>

  <pre><code>{
  // --- Mode list ---
  "0x0000": [                              // SupportedModes
    {
      "Label": "Deep Clean",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]    // DeepClean (0x4000)
    },
    {
      "Label": "Vacuum Only",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]    // VacuumOnly (0x4001)
    },
    {
      "Label": "Mop Only",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]    // MopOnly (0x4002)
    },
    {
      "Label": "Vacuum and Mop",
      "Mode": 3,
      "ModeTags": [{ "Value": 16387 }]    // VacuumAndMop (0x4003)
    }
  ],

  // --- Current mode ---
  "0x0001": 3,                             // CurrentMode = 3 (Vacuum and Mop)
  "0x0003": 3                              // OnMode = 3 (default to Vacuum and Mop on power-on)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Different manufacturers' vacuums may support different numbers of modes and tags. Some models lack a mopping module
      and will not have <code>MopOnly</code> or <code>VacuumAndMop</code> tags.
      Apps should always rely on the actual list returned by <code>SupportedModes</code>,
      identifying cleaning types through ModeTag and using Label as display text.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-switch">Scenario 1: User Switches Cleaning Mode</h3>
  <ol>
    <li>The app reads <code>SupportedModes (0x0000)</code> to get all cleaning modes supported by the device</li>
    <li>Display corresponding icons based on each mode's ModeTag -- e.g. VacuumOnly shows a vacuum icon, MopOnly shows a mop icon</li>
    <li>The user selects "Mop Only" (Mode = 2); the app sends <code>ChangeToMode</code> with NewMode = 2</li>
    <li>The device returns <code>ChangeToModeResponse</code> with Status = <code>0x00 (Success)</code></li>
    <li>The app subscribes to <code>CurrentMode (0x0001)</code> changes to confirm the switch and update the highlight</li>
  </ol>

  <h3 id="scenario-onmode">Scenario 2: Set Default Power-On Cleaning Mode</h3>
  <ol>
    <li>The user selects "Default to Deep Clean on power-on" in the settings page</li>
    <li>The app writes <code>OnMode (0x0003)</code> = 0 (the Mode value for Deep Clean)</li>
    <li>Next time the vacuum powers on or activates from the charging dock, it automatically switches to Deep Clean mode</li>
    <li>If the user selects "Keep previous mode", the app writes <code>OnMode = null</code></li>
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
  'rvc-operational-state': {
    title: 'RvcOperationalState Cluster (0x0061)',
    description: 'Complete reference for the Matter RvcOperationalState Cluster (0x0061) — robot vacuum-specific state machine derived from OperationalState, Pause/Stop/GoHome commands, Charging/Docked/SeekingCharger extended states, 8 RVC-specific error codes, event notifications, and all enum value definitions.',
    prev: { title: 'OperationalState', slug: 'operational-state' },
    next: undefined,
    content: `<h1>RvcOperationalState Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0061</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint) &nbsp;|&nbsp;
    <strong>Derived from</strong>: <a href="../operational-state/">OperationalState (0x0060)</a>
  </p>
  <p>
    RvcOperationalState is a <a href="../operational-state/">OperationalState (0x0060)</a>
    <strong>robot vacuum-specific derived Cluster</strong>. It inherits all attributes and event structures from the base state machine,
    but with important adjustments based on the actual usage scenarios of robot vacuums:
  </p>
  <ul>
    <li><strong>Removed Start and Resume commands</strong> -- robot vacuums start by selecting a cleaning mode via the RvcRunMode Cluster, not by using Start directly</li>
    <li><strong>Added GoHome command (0x80)</strong> -- instructs the robot to return to the charging dock</li>
    <li><strong>Extended with 3 RVC-specific operational states</strong> -- SeekingCharger, Charging, and Docked</li>
    <li><strong>Extended with 8 RVC-specific error codes</strong> -- covering common faults involving the charging dock, stuck conditions, dust bin, water tank, mop pad, etc.</li>
  </ul>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with Base OperationalState</div>
    <p>
      RvcOperationalState does not replace OperationalState; rather, it <strong>customizes</strong> robot vacuum behavior on top of it.
      The base 4 states (Stopped/Running/Paused/Error) are still retained, and the 3 RVC-extended states (0x40~0x42)
      are added on top. Similarly, the base 4 error codes (NoError/UnableToStartOrResume, etc.) remain valid,
      and the 8 RVC-extended error codes (0x40~0x47) describe fault scenarios specific to robot vacuums.
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
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The RvcOperationalState Cluster has 3 commands. Compared to the base OperationalState's 4 commands,
    <strong>Start (0x02) and Resume (0x03) are removed</strong>,
    because robot vacuum startup and mode switching are handled by the RvcRunMode Cluster.
    A new <strong>GoHome (0x80)</strong> command is added for instructing the robot to return to the charging dock.
    All commands return an <code>OperationalCommandResponse</code> after execution, containing an
    <a href="#struct-errorstate">ErrorStateStruct</a> indicating whether the operation succeeded.
  </p>

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
          <td>Pause</td>
          <td>Pause current operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Stop</td>
          <td>Stop operation</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x80">
          <td><a href="#cmd-0x80"><code>0x80</code></a></td>
          <td>GoHome</td>
          <td>Return to charging dock</td>
          <td>OperationalCommandResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">No Start or Resume Commands</div>
    <p>
      Robot vacuum startup is not through the OperationalState Start command, but through the
      <strong>RvcRunMode Cluster</strong>'s ChangeToMode command.
      After selecting a cleaning mode (e.g. standard cleaning, deep cleaning), the robot automatically begins working.
      Similarly, resuming after a pause is also controlled through RvcRunMode.
      If Start or Resume commands are sent to RvcOperationalState, the response will be
      <code>CommandInvalidInState (3)</code> error.
    </p>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Pause (0x00)</h3>
  <p>
    Pauses the robot's current operation (cleaning, returning to dock, etc.). On success, the <code>OperationalState</code>
    attribute changes to <code>Paused (2)</code>. The robot stops in place and retains its current position and cleaning progress. No parameters required.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">State Constraints</div>
    <p>
      Pausing is only possible when the robot is in <code>Running (1)</code> or <code>SeekingCharger (0x40)</code> state.
      If called while in <code>Stopped (0)</code>, <code>Charging (0x41)</code>, <code>Docked (0x42)</code>,
      or <code>Error (3)</code> state, it returns a <code>CommandInvalidInState (3)</code> error.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The robot is cleaning the living room and the user needs to temporarily move items off the floor. The app sends a Pause command,
        and the robot stops in place and waits. After tidying up, cleaning resumes via RvcRunMode.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">Stop (0x01)</h3>
  <p>
    Completely stops the robot's current operation. On success, the <code>OperationalState</code> attribute changes to
    <code>Stopped (0)</code>. Unlike Pause, Stop terminates the current cleaning task,
    and a new mode must be selected via RvcRunMode to start a new cleaning session. No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user is leaving home and doesn't want the robot to continue cleaning. Send a Stop command to terminate the cleaning task.
        After returning home, cleaning can be restarted via RvcRunMode.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x80">GoHome -- Return to Charging Dock (0x80)</h3>
  <p>
    <strong>RVC-specific command</strong>. Instructs the robot to stop its current operation and return to the charging dock.
    On success, the <code>OperationalState</code> attribute changes to <code>SeekingCharger (0x40)</code>,
    and the robot begins automatically navigating back to the charging dock. Upon arrival, the state sequentially changes to <code>Charging (0x41)</code>
    → <code>Docked (0x42)</code>. No parameters required.
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">State Constraints</div>
    <p>
      When the robot is already in <code>Charging (0x41)</code> or <code>Docked (0x42)</code> state,
      calling GoHome returns a <code>CommandInvalidInState (3)</code> error -- the robot is already on the charging dock.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The robot is halfway through cleaning and the user wants it to return to the charging dock early. The app sends a GoHome command,
        and the robot abandons the remaining cleaning area and automatically navigates back to the dock to charge.
        Also commonly used when the robot does not automatically return to dock after finishing cleaning.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Command Response ====== -->
  <h3 id="cmd-response">OperationalCommandResponse -- Command Response</h3>
  <p>
    All three commands (Pause/Stop/GoHome) return this response after execution.
    It contains an <a href="#struct-errorstate">ErrorStateStruct</a> indicating whether the command succeeded.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommandResponseState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>Command execution result. <code>ErrorStateID = 0 (NoError)</code> indicates success</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The RvcOperationalState Cluster inherits all 6 attributes from the base OperationalState, with identical definitions.
    Click an attribute ID in the summary table below to jump to its detailed description.
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
        <!-- Phase Info -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PhaseList</td>
          <td>list&lt;string&gt; / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Operation phase list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentPhase</td>
          <td>uint8 / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Current phase index</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CountdownTime</td>
          <td>elapsed_s / null</td>
          <td><a href="#group-phase">Phase Info</a></td>
          <td>Remaining time (seconds)</td>
        </tr>
        <!-- Operational State -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OperationalStateList</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td><a href="#group-state">Operational State</a></td>
          <td>All states supported by the device (including RVC extensions)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>OperationalState</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td><a href="#group-state">Operational State</a></td>
          <td>Current operational state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OperationalError</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td><a href="#group-state">Operational State</a></td>
          <td>Current error information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Phase Info (0x0000, 0x0001, 0x0002) ====== -->
  <h3 id="group-phase">Phase Info (0x0000, 0x0001, 0x0002)</h3>
  <p>
    Describes the phase progress and remaining time of the robot's current cleaning task.
    Robot vacuum phases may include: main area sweeping, edge sweeping, mopping, returning to dock, etc.
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
          <td>PhaseList (Phase List)</td>
          <td>list&lt;string&gt; / null</td>
          <td>
            An ordered list of phase names for the robot's cleaning operation. Example: <code>["Main Brush Sweep", "Edge Sweep", "Returning to Dock"]</code>.
            <strong>Nullable</strong> -- <code>null</code> indicates the robot does not support phase tracking.
            Maximum 32 entries in the list
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPhase (Current Phase)</td>
          <td>uint8 / null</td>
          <td>
            The index of the current phase in PhaseList (starting from 0).
            <strong>Nullable</strong> -- when PhaseList is <code>null</code>, this value is also <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CountdownTime (Remaining Time)</td>
          <td>elapsed_s / null</td>
          <td>
            The estimated remaining time for the current cleaning task, in <strong>seconds</strong>. The robot periodically updates this value based on remaining area and battery level.
            <strong>Nullable</strong> -- <code>null</code> indicates the robot cannot estimate remaining time
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Phase Tracking Specifics for Robot Vacuums</div>
    <p>
      Unlike appliances such as washing machines, robot vacuum phase tracking is not necessarily a fixed linear process.
      Some robots may dynamically adjust phases during cleaning (e.g. inserting a return-to-dock phase when low battery is detected),
      so the contents of <code>PhaseList</code> may change as the task progresses.
      Apps should periodically re-read PhaseList rather than reading it only once at task start.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Operational State (0x0003, 0x0004, 0x0005) ====== -->
  <h3 id="group-state">Operational State (0x0003, 0x0004, 0x0005)</h3>
  <p>
    Describes the robot's operational state and error information. <code>OperationalStateList</code> contains the base 4 states
    plus the 3 RVC-extended states (SeekingCharger/Charging/Docked).
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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>OperationalStateList (State List)</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td>
            All operational states supported by the robot. In addition to the base 4 states (0~3),
            RVC devices also include the three extended states 0x40~0x42 in the list (seeking charger/charging/docked)
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>OperationalState (Operating State)</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td>
            The robot's current operating state; see
            <a href="#enum-opstate">OperationalStateEnum</a>(including RVC-extended values).
            This is the core attribute for displaying the robot's status in the app
          </td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OperationalError (Current Error)</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>
            The robot's current error state. When <code>OperationalState</code> is
            <code>Error (3)</code>, this attribute contains the specific error information (including RVC-extended error codes).
            When there is no error, <code>ErrorStateID = 0 (NoError)</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-opstate">OperationalStateEnum -- Operational States</h3>
  <p>
    The RVC operational state enum inherits the 4 standard values (0~3) from the base OperationalState,
    and extends with 3 robot vacuum-specific states in the 0x40~0x42 range.
  </p>

  <h4>Base States (Inherited from OperationalState)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">Stopped -- the robot is idle and can be started for cleaning via RvcRunMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">Running -- performing a cleaning task; can be Paused, Stopped, or sent GoHome</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">Paused -- cleaning is paused; can be resumed via RvcRunMode or Stopped</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Error</span>
        <span class="enum-desc">Error -- a fault has occurred; check OperationalError for details</span>
      </div>
    </div>
  </div>

  <h4>RVC Extended States</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">SeekingCharger</span>
        <span class="enum-desc">Seeking Charger -- the robot is automatically navigating back to the charging dock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Charging</span>
        <span class="enum-desc">Charging -- docked at the charging station and currently charging</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">Docked</span>
        <span class="enum-desc">Docked -- parked at the charging station, fully charged or on standby</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Charging State Transitions</div>
    <p>
      The typical charging flow is: <code>SeekingCharger (0x40)</code> → <code>Charging (0x41)</code>
      → <code>Docked (0x42)</code>. After the robot returns to the charging dock, it first enters the Charging state,
      and transitions to the Docked standby state once fully charged. To start cleaning from Docked or Charging state,
      a ChangeToMode command must be sent via the RvcRunMode Cluster.
    </p>
  </div>

  <h3 id="enum-errorstate">ErrorStateEnum -- Error Types</h3>
  <p>
    The RVC error state enum inherits the base 4 generic error codes (0~3),
    and extends with 8 robot vacuum-specific error codes in the 0x40~0x47 range, covering common issues with the charging dock, mechanical faults, consumables, etc.
  </p>

  <h4>Base Error Codes (Inherited from OperationalState)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoError</span>
        <span class="enum-desc">No Error -- everything is normal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnableToStartOrResume</span>
        <span class="enum-desc">Unable to Start or Resume -- the robot cannot begin cleaning for some reason</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UnableToCompleteOperation</span>
        <span class="enum-desc">Unable to Complete Operation -- an unrecoverable issue was encountered during cleaning</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CommandInvalidInState</span>
        <span class="enum-desc">Command invalid in current state -- e.g. calling GoHome while in Docked state</span>
      </div>
    </div>
  </div>

  <h4>RVC Extended Error Codes</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">FailedToFindChargingDock</span>
        <span class="enum-desc">Failed to find charging dock -- the robot cannot locate or navigate to the dock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Stuck</span>
        <span class="enum-desc">Stuck -- the robot is trapped by an obstacle or terrain and cannot move</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">DustBinMissing</span>
        <span class="enum-desc">Dust bin not installed -- the dust bin was removed and not replaced</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">DustBinFull</span>
        <span class="enum-desc">Dust bin full -- the dust bin must be emptied before cleaning can continue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">WaterTankEmpty</span>
        <span class="enum-desc">Water tank empty -- the water tank is empty in mopping mode; water needs to be added</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">WaterTankMissing</span>
        <span class="enum-desc">Water tank not installed -- the water tank was removed and not replaced</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">WaterTankLidOpen</span>
        <span class="enum-desc">Water tank lid open -- the tank lid is not properly closed, risking water leakage</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">MopCleaningPadMissing</span>
        <span class="enum-desc">Mop cleaning pad not installed -- mopping mode requires a mop pad to operate</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Error Handling Recommendations</div>
    <p>
      All 8 RVC-extended error codes represent <strong>physical issues that users can resolve on their own</strong>.
      When the app receives these errors, it should provide clear action guidance (e.g. "Please empty the dust bin and restart cleaning"),
      rather than just displaying the error code. After the user resolves the issue, cleaning can be restarted via RvcRunMode.
    </p>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-errorstate">ErrorStateStruct -- Error State Structure</h3>
  <p>
    Used to describe the robot's error information. Used for both the <code>OperationalError</code> attribute and command responses.
    The structure is identical to the base OperationalState.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorStateID</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>Yes</td>
          <td>Error type code. <code>0</code> indicates no error. RVC-extended error code range is 0x40~0x47</td>
        </tr>
        <tr>
          <td>ErrorStateLabel</td>
          <td>string</td>
          <td>No</td>
          <td>Optional localized error label for direct display in apps. For RVC-extended error codes (0x40~0x47), this field <strong>must</strong> be provided</td>
        </tr>
        <tr>
          <td>ErrorStateDetails</td>
          <td>string</td>
          <td>No</td>
          <td>Optional detailed error description providing more diagnostic information (e.g. "left wheel entangled by cable")</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-opstate">OperationalStateStruct -- Operational State Structure</h3>
  <p>
    Used in the <code>OperationalStateList</code> attribute to describe each operational state supported by the robot.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalStateID</td>
          <td>uint8</td>
          <td>Yes</td>
          <td>Status code. 0~3 are standard states; 0x40~0x42 are RVC extended states</td>
        </tr>
        <tr>
          <td>OperationalStateLabel</td>
          <td>string</td>
          <td>No</td>
          <td>Optional localized state label. Can be omitted for standard states (0~3); <strong>must</strong> be provided for RVC-extended states (0x40~0x42)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    The RvcOperationalState Cluster inherits 2 events from the base OperationalState,
    used to notify the controller of important state changes in the robot.
  </p>

  <h3 id="event-error">OperationalError Event</h3>
  <p>
    This event is triggered when the robot enters an error state. The event priority is <strong>CRITICAL</strong>,
    ensuring that apps receive timely error notifications (e.g. robot stuck, dust bin full, etc.).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>Current error information; ErrorStateID may be an RVC extended error code (0x40~0x47)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-completion">OperationCompletion Event</h3>
  <p>
    This event is triggered when the robot completes a full cleaning cycle. The event priority is <strong>INFO</strong>.
    The event carries time statistics for the cleaning session, enabling apps to display cleaning reports.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CompletionErrorCode</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>Yes</td>
          <td>Error code at cleaning completion. <code>0 (NoError)</code> indicates normal completion</td>
        </tr>
        <tr>
          <td>TotalOperationalTime</td>
          <td>elapsed_s / null</td>
          <td>No</td>
          <td>Total cleaning duration (seconds), including paused time. <code>null</code> indicates the robot does not support statistics</td>
        </tr>
        <tr>
          <td>PausedTime</td>
          <td>elapsed_s / null</td>
          <td>No</td>
          <td>Cumulative pause duration (seconds). <code>null</code> indicates the robot does not support statistics</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Cleaning Report</div>
    <p>
      Apps can combine the time statistics from the <code>OperationCompletion</code> event with cleaning area information
      to generate a cleaning report. For example: "This session lasted 45 minutes: 40 minutes of cleaning, 5 minutes paused."
      Note that <code>CompletionErrorCode</code> may not be NoError -- the robot may have
      ended cleaning early due to battery depletion or a fault, in which case the corresponding error code is included.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of the RvcOperationalState Cluster from a robot vacuum currently cleaning:</p>

  <pre><code>{
  // --- Phase info ---
  "0x0000": ["Main Brush Sweep", "Edge Sweep", "Returning to Dock"],  // PhaseList (operation phase list)
  "0x0001": 0,                                    // CurrentPhase = 0 (currently in "Main Brush Sweep" phase)
  "0x0002": 2400,                                  // CountdownTime = 2400 seconds (approximately 40 minutes remaining)

  // --- Operational state ---
  "0x0003": [                                      // OperationalStateList (device-supported state list)
    { "OperationalStateID": 0, "OperationalStateLabel": "Stopped" },
    { "OperationalStateID": 1, "OperationalStateLabel": "Running" },
    { "OperationalStateID": 2, "OperationalStateLabel": "Paused" },
    { "OperationalStateID": 3, "OperationalStateLabel": "Error" },
    { "OperationalStateID": 64, "OperationalStateLabel": "Seeking Charger" },
    { "OperationalStateID": 65, "OperationalStateLabel": "Charging" },
    { "OperationalStateID": 66, "OperationalStateLabel": "Docked" }
  ],
  "0x0004": 1,                                     // OperationalState = Running (currently cleaning)
  "0x0005": {                                      // OperationalError (no current error)
    "ErrorStateID": 0,
    "ErrorStateLabel": "",
    "ErrorStateDetails": ""
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The <code>OperationalStateList (0x0003)</code> of an RVC device will have
      3 additional extended state entries (ID 64/65/66, i.e. 0x40/0x41/0x42) compared to the base OperationalState. When rendering state selection or indicators,
      the app needs to handle UI display for these RVC-specific states (e.g. showing a navigation animation for "Seeking Charger" or a battery progress indicator for "Charging").
      Likewise, error handling logic needs to cover RVC-extended error codes in the 0x40~0x47 range.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-cleaning">Scenario 1: Complete Cleaning Lifecycle</h3>
  <ol>
    <li>The robot is in <code>Docked (0x42)</code> state, parked on the charging dock on standby</li>
    <li>The user sends a ChangeToMode command via the <strong>RvcRunMode</strong> Cluster, selecting the "Standard Cleaning" mode</li>
    <li>The robot leaves the dock, its state changes to <code>Running (1)</code>, and cleaning begins</li>
    <li>The app subscribes to <code>OperationalState</code>, <code>CurrentPhase</code>, and <code>CountdownTime</code>
      to update cleaning progress and remaining time in real time</li>
    <li>After cleaning is complete, the robot automatically enters <code>SeekingCharger (0x40)</code> state to return to dock</li>
    <li>After reaching the dock, it changes to <code>Charging (0x41)</code>, and to <code>Docked (0x42)</code> when fully charged</li>
    <li>The <code>OperationCompletion</code> event is triggered; the app displays a cleaning report: "Cleaning complete, total duration 45 minutes"</li>
  </ol>

  <h3 id="scenario-error">Scenario 2: Error Handling During Cleaning</h3>
  <ol>
    <li>The robot is cleaning (<code>Running (1)</code>) and suddenly gets stuck on a carpet edge</li>
    <li>The robot fails to free itself, its state changes to <code>Error (3)</code>, and <code>OperationalError</code> updates to:
      <ul>
        <li><code>ErrorStateID = 0x41 (Stuck)</code></li>
        <li><code>ErrorStateLabel = "Robot Stuck"</code></li>
        <li><code>ErrorStateDetails = "Left wheel cannot rotate; please check for foreign objects"</code></li>
      </ul>
    </li>
    <li>The device triggers the <code>OperationalError</code> event (CRITICAL priority); the app shows a push notification</li>
    <li>The app displays corresponding action guidance based on error code 0x41 (Stuck): "Please move the robot to an open area"</li>
    <li>After the user resolves the issue, send <code>Stop (0x01)</code> to clear the error state</li>
    <li>Restart the cleaning task via RvcRunMode</li>
  </ol>

  <h3 id="scenario-gohome">Scenario 3: Manual Return to Dock (GoHome)</h3>
  <ol>
    <li>The robot is cleaning (<code>Running (1)</code>) and the user wants it to return to dock early</li>
    <li>The app sends the <code>GoHome (0x80)</code> command</li>
    <li>The robot stops cleaning, its state changes to <code>SeekingCharger (0x40)</code>, and it begins automatically navigating back to the dock</li>
    <li>The app can display a "Returning to charging dock..." status message</li>
    <li>After the robot arrives at the dock, its state changes to <code>Charging (0x41)</code></li>
    <li>If the dock cannot be found during navigation, the state changes to <code>Error (3)</code>,
      with error code <code>FailedToFindChargingDock (0x40)</code></li>
    <li>The app displays: "Cannot find the charging dock. Please check that the dock is powered on and the area in front is clear."</li>
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
  'hepa-filter-monitoring': {
    title: 'HepaFilterMonitoring Cluster (0x0071)',
    description: 'Complete reference for the Matter HepaFilterMonitoring Cluster (0x0071) — filter life percentage, degradation direction, change indication, replacement product list, ResetCondition command — the core Cluster for air purifier filter lifecycle management.',
    prev: undefined,
    next: undefined,
    content: `<h1>HepaFilterMonitoring Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0071</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Application endpoint (typically <code>Endpoint 1</code>)
  </p>
  <p>
    HepaFilterMonitoring monitors the lifecycle status of HEPA filters in air purifiers, including remaining life percentage, degradation level, whether replacement is needed,
    and recommended replacement product information. After the user replaces the filter, the state can be reset via a command to begin a new monitoring cycle.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">When to Use</div>
    <p>
      Air purifiers require periodic HEPA filter replacement. This Cluster enables apps to display remaining filter life in real time,
      push reminders when the filter is nearing depletion, and even provide purchase links for replacement filters.
      After the user replaces the filter, a single ResetCondition command restarts the timer.
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>
    HepaFilterMonitoring uses the Feature Map to control optional feature activation. Devices can declare supported features based on hardware capabilities.
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
          <td>CON</td>
          <td>Condition</td>
          <td>Supports filter remaining life percentage (<code>Condition</code> attribute)</td>
        </tr>
        <tr>
          <td><code>1</code></td>
          <td>WAR</td>
          <td>Warning</td>
          <td>Supports degradation level (<code>DegradationDirection</code> attribute)</td>
        </tr>
        <tr>
          <td><code>2</code></td>
          <td>REP</td>
          <td>ReplacementProductList</td>
          <td>Supports replacement product list (<code>ReplacementProductList</code> attribute)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      Feature Map = <code>0b111</code> (7): supports life percentage, degradation direction, and replacement product list -- the most complete configuration.<br/>
      Feature Map = <code>0b001</code> (1): supports only life percentage, suitable for low-cost devices.<br/>
      Feature Map = <code>0b101</code> (5): supports life percentage + replacement product list, does not report degradation direction.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>HepaFilterMonitoring attributes are divided into required and optional parts; optional attributes depend on the features declared by the device.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Access</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Condition</td>
          <td>uint8</td>
          <td>Read-only</td>
          <td>CON</td>
          <td>Filter remaining life percentage (0-100%)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>DegradationDirection</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>WAR</td>
          <td>Degradation direction: whether higher or lower values mean worse condition</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ChangeIndication</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>Yes</td>
          <td>Change indication: OK / Warning / Critical</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>InPlaceIndicator</td>
          <td>bool</td>
          <td>Read-only</td>
          <td>No</td>
          <td>Whether the filter is physically installed</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LastChangedTime</td>
          <td>epoch_s</td>
          <td>Read-only</td>
          <td>No</td>
          <td>Time of last filter change (may be null)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>ReplacementProductList</td>
          <td>list</td>
          <td>Read-only</td>
          <td>REP</td>
          <td>Recommended replacement product list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">Condition (Filter Remaining Life)</h3>
  <p>
    Represents the filter's remaining life as a percentage, ranging from <code>0</code> to <code>100</code>.
    <code>100</code> indicates a brand new filter, <code>0</code> indicates the filter is fully depleted.
    Requires the device to declare the <strong>CON</strong> Feature for this attribute to appear.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Understanding the Condition Value</div>
    <p>
      This percentage is calculated by the device firmware based on factors such as usage duration, airflow, and particulate concentration.
      Different manufacturers may use different algorithms, but app developers only need to focus on this 0-100 value.
      It is recommended to display this in the app using a progress bar or ring chart, with highlighting when below 20%.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">DegradationDirection (Degradation Direction)</h3>
  <p>
    Indicates the degradation direction of the Condition value -- whether increasing or decreasing values represent worsening filter condition.
    Requires the device to declare the <strong>WAR</strong> Feature for this attribute to appear.
  </p>

  <h4>DegradationDirectionEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Higher values indicate worse condition (e.g. pollution index from 0 to 100)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Lower values indicate worse condition (e.g. remaining life from 100 to 0)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Why Degradation Direction Is Needed</div>
    <p>
      Different manufacturers may define the Condition value in opposite ways: some use "remaining percentage" (lower is worse), others use "pollution level" (higher is worse).
      DegradationDirection enables apps to correctly interpret the Condition value regardless of how the manufacturer defines it.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">ChangeIndication (Replacement Indication)</h3>
  <p>
    The filter's current replacement status. This is a required attribute; even if the device does not support the Condition percentage, it must report the replacement indication.
  </p>

  <h4>ChangeIndicationEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">Filter condition is normal; no replacement needed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">Filter is aging; replacement recommended soon</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Filter is severely degraded; immediate replacement required</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">InPlaceIndicator (Filter Installation Status)</h3>
  <p>
    A boolean indicating whether the filter is physically installed in the device. <code>true</code> means the filter is in place; <code>false</code> means it is not installed or has been removed.
    This is an optional attribute, depending on whether the device has a physical detection sensor.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">App-Side Tip</div>
    <p>
      When <code>InPlaceIndicator = false</code>, the app should prompt the user that the filter is not installed and prevent operation.
      The typical filter replacement flow is: remove old filter (<code>false</code>) → install new filter (<code>true</code>) → send ResetCondition command.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x04">LastChangedTime (Last Changed Time)</h3>
  <p>
    The UTC timestamp (epoch seconds) of the last filter replacement. Can be <code>null</code>, indicating the device has not recorded a replacement time.
    After the user sends a ResetCondition command, the device updates this attribute to the current time.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x05">ReplacementProductList (Replacement Product List)</h3>
  <p>
    A list of recommended replacement products; each entry contains a product identification type and value.
    Requires the device to declare the <strong>REP</strong> Feature for this attribute to appear.
    The list can contain multiple entries, identifying the same replacement filter using different coding systems.
  </p>

  <h4>ReplacementProductStruct</h4>
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
          <td>ProductIdentifierType</td>
          <td>enum8</td>
          <td>Product identification coding system</td>
        </tr>
        <tr>
          <td>ProductIdentifierValue</td>
          <td>string</td>
          <td>Product identification value (barcode, serial number, etc.)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductIdentifierTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UPC</span>
        <span class="enum-desc">Universal Product Code (12-digit North American barcode)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">GTIN8</span>
        <span class="enum-desc">Global Trade Item Number (8-digit short barcode)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">EAN</span>
        <span class="enum-desc">European Article Number (13-digit international barcode)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">GTIN14</span>
        <span class="enum-desc">Global Trade Item Number (14-digit logistics barcode)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OEM</span>
        <span class="enum-desc">OEM-defined number (e.g. model name)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    HepaFilterMonitoring has only one command, sent from Client to Server (i.e. app to device).
    Used to reset the monitoring state after the user replaces the filter.
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
          <td>ResetCondition</td>
          <td>Reset filter condition (called after filter replacement)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ResetCondition -- Reset Filter Status (0x00)</h3>
  <p>
    After the user replaces the HEPA filter, this command is sent to notify the device to restart lifecycle monitoring.
    Upon receipt, the device resets <code>Condition</code> to <code>100</code>, <code>ChangeIndication</code> to <code>OK</code>,
    and updates <code>LastChangedTime</code> to the current time.
  </p>
  <p>This command has no parameters; send it directly.</p>
  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0071",
      "commandId": "0x00"       // ResetCondition
    },
    "commandFields": {}
  }]
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">Important Notes</div>
    <p>
      ResetCondition does not verify whether the filter was actually physically replaced. If the device supports <code>InPlaceIndicator</code>,
      the app can first confirm that the attribute changed from <code>false</code> to <code>true</code> (user removed old filter and installed new one) before sending this command,
      to avoid accidental resets.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read all attributes of the HepaFilterMonitoring Cluster from an air purifier:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": 72,          // Condition = 72% (filter remaining life)
  "0x1": 1,           // DegradationDirection = Down (lower values indicate worse condition)
  "0x2": 0,           // ChangeIndication = OK (condition normal)
  "0x3": true,        // InPlaceIndicator = true (filter installed)
  "0x4": 1695206400,  // LastChangedTime = 2023-09-20T16:00:00Z
  "0x5": [            // ReplacementProductList
    {
      "0": 0,         // ProductIdentifierType = UPC
      "1": "012345678905"  // ProductIdentifierValue
    }
  ]
}</code></pre>

  <!-- ====== Scenario 1 ====== -->
  <h2 id="scenario-lifecycle">Scenario 1: Filter Lifecycle Tracking</h2>
  <p>
    The complete flow from installing a new filter to filter depletion and replacement in an air purifier.
    The app updates the UI in real time by subscribing to attribute changes, and pushes notifications at key milestones.
  </p>
  <pre><code>{
  // Scenario: After 6 months of operation, the filter begins to age
  // First read -- filter status good
  "readAttributes": {
    "0x0": 72,         // Condition = 72%
    "0x2": 0           // ChangeIndication = OK
  },

  // Two months later -- filter enters warning zone
  "readAttributes_later": {
    "0x0": 18,         // Condition = 18%
    "0x2": 1           // ChangeIndication = Warning
  },

  // Continued use -- filter enters critical state
  "readAttributes_critical": {
    "0x0": 3,          // Condition = 3%
    "0x2": 2           // ChangeIndication = Critical
  },

  // After user replaces filter, send ResetCondition command
  "resetCommand": {
    "endpointId": 1,
    "clusterId": "0x0071",
    "commandId": "0x00"
  },

  // Status after reset
  "readAttributes_after_reset": {
    "0x0": 100,        // Condition = 100% (reset)
    "0x2": 0           // ChangeIndication = OK
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      Recommended implementation for filter management in the app:
    </p>
    <ol>
      <li>Display <code>Condition</code> percentage on the home card using a ring progress bar for visual representation</li>
      <li>Subscribe to <code>ChangeIndication</code> attribute changes; push app notification when the value becomes <code>Warning</code></li>
      <li>When the value becomes <code>Critical</code>, display a red warning badge on the device card</li>
      <li>Provide a "Filter Replaced" button that sends the <code>ResetCondition</code> command when clicked</li>
      <li>If the device supports <code>InPlaceIndicator</code>, check whether the filter is installed before the button tap</li>
    </ol>
  </div>

  <!-- ====== Scenario 2 ====== -->
  <h2 id="scenario-replacement">Scenario 2: Replacement Product Purchase Guide</h2>
  <p>
    When the filter needs replacement, the app reads the replacement product list from the device to help the user quickly find the correct replacement filter and complete the purchase.
  </p>
  <pre><code>{
  // Scenario: App reads replacement product info to guide user purchase
  "readAttributes": {
    "0x2": 2,          // ChangeIndication = Critical (replacement needed)
    "0x5": [           // ReplacementProductList
      {
        "0": 0,        // ProductIdentifierType = UPC
        "1": "012345678905"
      },
      {
        "0": 4,        // ProductIdentifierType = OEM
        "1": "HEPA-H13-PRO-2024"
      }
    ]
  }
  // App can use UPC code to redirect to e-commerce search, or OEM number to redirect to manufacturer website
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      How to use replacement product information:
    </p>
    <ol>
      <li>Read <code>ReplacementProductList</code> and iterate through all entries</li>
      <li>If entries with <code>UPC</code> / <code>EAN</code> / <code>GTIN</code> types exist, redirect to e-commerce platform to search by barcode</li>
      <li>If entries with <code>OEM</code> type exist, search by manufacturer part number on the brand website or authorized channels</li>
      <li>Display all available product identifiers on the app's "Filter Replacement" page, letting users choose their preferred purchase channel</li>
    </ol>
    <p>
      The same filter may have both UPC and OEM identifiers. The app should display both to accommodate purchasing habits in different regions.
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
  'activated-carbon-filter-monitoring': {
    title: 'ActivatedCarbonFilterMonitoring Cluster (0x0072)',
    description: 'Complete reference for the Matter ActivatedCarbonFilterMonitoring Cluster (0x0072) — filter life, replacement reminders, ResetCondition command — the Cluster for monitoring activated carbon filter status.',
    prev: undefined,
    next: undefined,
    content: `<h1>ActivatedCarbonFilterMonitoring Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0072</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Application endpoint (typically <code>Endpoint 1</code> or a dedicated filter endpoint)
  </p>
  <p>
    ActivatedCarbonFilterMonitoring monitors the lifecycle of activated carbon filters -- remaining life, degradation direction, replacement reminders, and replacement product information.
    Its structure is <strong>identical</strong> to HEPA Filter Monitoring (<code>0x0071</code>) (same attributes, commands, and enums); the only difference is the filter type.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Activated Carbon vs HEPA: Different Filtration Targets</div>
    <p>
      <strong>HEPA filters</strong> capture <strong>particulates</strong> (PM2.5, dust, pollen, pet dander) through physical interception.<br/>
      <strong>Activated carbon filters</strong> adsorb <strong>gaseous pollutants</strong> (formaldehyde, VOCs, odors, smoke) through chemical adsorption.<br/>
      Air purifiers typically carry both filter layers, each with an independent lifecycle -- hence two separate Clusters are needed for individual monitoring.
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>Three optional feature bits determine which attributes the device supports, identical to HEPA Filter Monitoring.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">CON（Condition）</span>
        <span class="enum-desc">Supports the Condition attribute, reporting filter remaining percentage</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">WAR（Warning）</span>
        <span class="enum-desc">Supports the ChangeIndication attribute, issuing replacement reminders</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x04</span>
      <div>
        <span class="enum-name">REP（ReplacementProductList）</span>
        <span class="enum-desc">Supports the ReplacementProductList attribute, providing replacement filter product information</span>
      </div>
    </div>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>All attributes are identical to HEPA Filter Monitoring. The Feature column indicates which feature bit is required.</p>

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
          <td>Condition</td>
          <td>percent</td>
          <td>CON</td>
          <td>Filter remaining life percentage (0~100)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>DegradationDirection</td>
          <td>enum8</td>
          <td>CON</td>
          <td>Degradation direction (lower = older OR higher = older)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ChangeIndication</td>
          <td>enum8</td>
          <td>Required</td>
          <td>Current replacement status (OK / Warning / Critical)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>InPlaceIndicator</td>
          <td>bool</td>
          <td>Optional</td>
          <td>Whether the filter is properly installed</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LastChangedTime</td>
          <td>epoch-s</td>
          <td>Optional</td>
          <td>Timestamp of last filter replacement</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>ReplacementProductList</td>
          <td>list</td>
          <td>REP</td>
          <td>Recommended replacement product list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">Condition (Filter Remaining Life)</h3>
  <p>
    A percentage value from 0 to 100 representing the remaining adsorption capacity of the activated carbon filter. <code>100</code> means brand new; <code>0</code> means fully depleted (when DegradationDirection = Down).
    The degradation rate of activated carbon depends on the concentration of VOCs/odors in the environment; it is consumed faster in high-pollution environments.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">DegradationDirection (Degradation Direction)</h3>
  <p>Tells the app the meaning direction of the Condition value.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Value decreases from 100 to 0; the lower the value, the more replacement is needed (most common)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Value increases from 0 to 100; the higher the value, the more replacement is needed</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">ChangeIndication (Change Indication)</h3>
  <p>The device's overall assessment of the filter's current status. <strong>Mandatory attribute</strong> -- must be implemented even without the CON Feature.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">Filter status is good; no replacement needed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">Replacement recommended soon (adsorption capacity declining)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Must be replaced immediately (adsorption capacity lost)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">InPlaceIndicator (Filter Installation Status)</h3>
  <p>
    <code>true</code> indicates the filter is correctly installed; <code>false</code> indicates the filter is missing or improperly installed.
    Devices with physical detection switches can automatically update this value when the user removes the filter.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x04">LastChangedTime (Last Changed Time)</h3>
  <p>
    Unix timestamp (seconds) recording when the activated carbon filter was last replaced. Combined with Condition, it allows calculation of actual usage days and average consumption rate.
    After the user replaces the filter and executes the ResetCondition command, the device should update this value.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x05">ReplacementProductList (Replacement Product List)</h3>
  <p>
    List of replacement filter products recommended by the device. Each entry contains a product identifier type and value. The app can use this to directly guide users to purchase.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProductIdentifierType</td>
          <td>enum8</td>
          <td>Identification type (see enum below)</td>
        </tr>
        <tr>
          <td>ProductIdentifierValue</td>
          <td>string</td>
          <td>Identification value (e.g., UPC, EAN, model number)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductIdentifierTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UPC</span>
        <span class="enum-desc">Universal Product Code</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">GTIN-8</span>
        <span class="enum-desc">8-digit Global Trade Item Number</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">EAN</span>
        <span class="enum-desc">European Article Number</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">GTIN-14</span>
        <span class="enum-desc">14-digit Global Trade Item Number</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OEM</span>
        <span class="enum-desc">Vendor-defined part number</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>Only one command, used to reset the state after filter replacement.</p>

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
          <td>ResetCondition</td>
          <td>Reset filter condition (called after filter replacement)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCondition -- Reset Filter Status (0x00)</h3>
  <p>
    After the user replaces the activated carbon filter, this command is sent via the app. Upon receipt, the device should restore Condition to 100 (or 0, depending on DegradationDirection),
    reset ChangeIndication to OK, and update LastChangedTime to the current time. No parameters required; send directly.
  </p>
  <p>Request example:</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0072",
      "commandId": "0x00"          // ResetCondition
    },
    "commandFields": {}
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read the activated carbon filter status from an air purifier:</p>
  <pre><code>{
  // --- Attributes (ActivatedCarbonFilterMonitoring Cluster) ---
  "0x0": 72,          // Condition = 72% (filter remaining life)
  "0x1": 0,           // DegradationDirection = Down (lower value means more replacement needed)
  "0x2": 1,           // ChangeIndication = Warning (replacement recommended)
  "0x3": true,        // InPlaceIndicator = true (filter installed)
  "0x4": 1718380800,  // LastChangedTime = 2024-06-15T00:00:00Z
  "0x5": [{           // ReplacementProductList
    "productIdentifierType": 3,
    "productIdentifierValue": "AC-FILTER-2024-VOC"
  }]
}</code></pre>

  <!-- ====== Scenarios ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <div class="callout callout-tip">
    <div class="callout-title">Scenario 1: Dual-Filter Air Purifier</div>
    <p>
      An air purifier carries both a HEPA filter and an activated carbon filter, placed on two separate Endpoints (or two different Clusters on the same Endpoint).
      The app needs to display the lifespan of both filter layers separately, as their consumption rates differ -- in high PM2.5 environments the HEPA depletes first; in newly renovated rooms the activated carbon depletes first.
    </p>
    <pre><code>{
  // Endpoint 1 -- HEPA Filter (HEPAFilterMonitoring 0x0071)
  "hepa": {
    "0x0": 45,         // Condition = 45%
    "0x2": 1           // ChangeIndication = Warning
  },
  // Endpoint 2 -- Activated Carbon Filter (ActivatedCarbonFilterMonitoring 0x0072)
  "carbon": {
    "0x0": 78,         // Condition = 78%
    "0x2": 0           // ChangeIndication = OK
  }
}</code></pre>
    <p>
      The app is recommended to use dual progress bars or dual ring charts to display both, so users can see at a glance which filter layer needs replacement.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Scenario 2: VOC Adsorption Capacity Tracking</div>
    <p>
      Smart fresh air systems with built-in VOC sensors can analyze the actual adsorption efficiency of the activated carbon filter using its Condition attribute --
      when VOC concentration remains elevated and Condition drops below 50%, it indicates significant adsorption capacity decline, and the app can proactively push replacement suggestions
      instead of waiting until ChangeIndication becomes Critical to notify the user.
    </p>
    <p>
      Combined with LastChangedTime, the average filter lifespan can be calculated to help users plan consumable procurement cycles.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with HEPA Filter Monitoring</div>
    <p>
      The attributes, commands, and enum definitions of both Clusters are <strong>identical</strong>; only the Cluster ID differs (HEPA = <code>0x0071</code>, Activated Carbon = <code>0x0072</code>).
      During app development, the same set of UI components and data parsing logic can be reused; just display different filter names and icons based on the Cluster ID.
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
};
