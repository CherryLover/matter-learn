import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'smoke-co-alarm': {
    title: 'SmokeCOAlarm Cluster (0x005C)',
    description: 'Complete reference for the Matter SmokeCOAlarm Cluster (0x005C) — smoke alarm, CO alarm, battery status, mute control, self-test command, interconnect alarm, event definitions, and enum value quick reference.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>SmokeCOAlarm Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005C</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    SmokeCOAlarm is the core Cluster for fire safety devices in Matter, responsible for smoke detection, carbon monoxide (CO) detection, battery status monitoring, device self-testing, and interconnect alarms.
    Standalone smoke detectors, combination smoke/CO detectors, and interconnected alarm systems commonly found in residential settings all rely on this Cluster.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature-Driven Capability Declaration</div>
    <p>
      The two Features of SmokeCOAlarm (<strong>SMOKE</strong> and <strong>CO</strong>) determine which alarm types the device supports.
      A smoke-only device enables only SMOKE, a CO-only detector enables only CO, and a combination device enables both.
      The Feature combination directly affects which attributes and events are available — always check <code>FeatureMap (0xFFFC)</code> before reading.
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
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>SmokeCOAlarm declares its supported alarm capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SMOKE (Smoke Alarm)</span>
        <span class="enum-desc">Enables smoke detection capability — provides the SmokeState attribute and SmokeAlarm / InterconnectSmokeAlarm events</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CO (Carbon Monoxide Alarm)</span>
        <span class="enum-desc">Enables CO detection capability — provides the COState attribute and COAlarm / InterconnectCOAlarm events</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Combinations</div>
    <p>
      <code>FeatureMap = 0x01</code> (Bit 0): Smoke-only device.<br/>
      <code>FeatureMap = 0x02</code> (Bit 1): CO-only detector.<br/>
      <code>FeatureMap = 0x03</code> (Bit 0 + Bit 1): Combination smoke/CO device (the most common residential device).
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The SmokeCOAlarm Cluster has only one command — trigger a device self-test. The core actions of an alarm device (alarming, muting, etc.)
    are triggered autonomously by the device and do not require external command control.
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
          <td>SelfTestRequest</td>
          <td>Trigger a device self-test</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SelfTestRequest — Trigger Self-Test (0x00)</h3>
  <p>
    Requests the device to perform a self-test procedure. The device checks whether its sensors, buzzer, battery, and other components are functioning properly.
    During the self-test, the <code>TestInProgress</code> attribute becomes <code>true</code>, and the <code>SelfTestComplete</code> event is emitted upon completion.
    No parameters are required.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Self-Test Considerations</div>
    <p>
      A self-test causes the device to briefly emit an alarm sound (to test the buzzer), so users should be informed in advance.
      If the device is currently in an alarm state (<code>ExpressedState ≠ Normal</code>), the self-test request will be rejected.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Invoke this when the user taps the "Device Self-Test" button in the app. A monthly self-test is recommended to ensure the device is working properly.
        After sending the command, subscribe to the <code>TestInProgress (0x0005)</code> attribute changes to track self-test progress,
        and listen for the <code>SelfTestComplete</code> event to obtain the self-test result.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The SmokeCOAlarm Cluster attributes are organized into four groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Alarm State -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ExpressedState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Current highest-priority device state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SmokeState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Smoke detection state (requires SMOKE feature)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>COState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Carbon monoxide detection state (requires CO feature)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>BatteryAlert</td>
          <td>enum8</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Battery level alert severity</td>
        </tr>
        <!-- Device Control -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>DeviceMuted</td>
          <td>enum8</td>
          <td><a href="#group-control">Device Control</a></td>
          <td>Whether the alarm is muted</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TestInProgress</td>
          <td>bool</td>
          <td><a href="#group-control">Device Control</a></td>
          <td>Whether a self-test is in progress</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>HardwareFaultAlert</td>
          <td>bool</td>
          <td><a href="#group-control">Device Control</a></td>
          <td>Whether a hardware fault is present</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>EndOfServiceAlert</td>
          <td>enum8</td>
          <td><a href="#group-control">Device Control</a></td>
          <td>Whether the device has reached end of service life</td>
        </tr>
        <!-- Interconnect Alarm -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>InterconnectSmokeAlarm</td>
          <td>enum8</td>
          <td><a href="#group-interconnect">Interconnect Alarm</a></td>
          <td>Interconnect smoke alarm state (requires SMOKE feature)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>InterconnectCOAlarm</td>
          <td>enum8</td>
          <td><a href="#group-interconnect">Interconnect Alarm</a></td>
          <td>Interconnect CO alarm state (requires CO feature)</td>
        </tr>
        <!-- Sensor & Lifetime -->
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>ContaminationState</td>
          <td>enum8</td>
          <td><a href="#group-sensor">Sensor & Lifetime</a></td>
          <td>Sensor contamination level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>SmokeSensitivityLevel</td>
          <td>enum8</td>
          <td><a href="#group-sensor">Sensor & Lifetime</a></td>
          <td>Smoke sensitivity setting</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>ExpiryDate</td>
          <td>epoch_s</td>
          <td><a href="#group-sensor">Sensor & Lifetime</a></td>
          <td>Device expiry date</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Alarm State (0x0000 - 0x0003) ====== -->
  <h3 id="group-alarm">Alarm State (0x0000 - 0x0003)</h3>
  <p>Describes the device's current alarm states. <code>ExpressedState</code> is the overall prioritized result of all states; the other three are individual states.</p>

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
          <td>ExpressedState<br/><span class="attr-cn">Overall State</span></td>
          <td>enum8</td>
          <td>The highest-priority alarm state of the device. When multiple alarms are active simultaneously, the device selects the one with the highest priority as the ExpressedState (see enum below). This is the most critical attribute of SmokeCOAlarm</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SmokeState<br/><span class="attr-cn">Smoke State</span></td>
          <td>enum8</td>
          <td>The alarm level currently detected by the smoke sensor. <strong>Requires SMOKE feature</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>COState<br/><span class="attr-cn">CO State</span></td>
          <td>enum8</td>
          <td>The alarm level currently detected by the carbon monoxide sensor. <strong>Requires CO feature</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>BatteryAlert<br/><span class="attr-cn">Battery Alert</span></td>
          <td>enum8</td>
          <td>The alarm level for battery charge status. Battery-powered alarm devices must support this attribute</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ExpressedState Enum Values</h4>
  <p>
    ExpressedState reflects the state that currently requires the most attention. Priority is listed from highest to lowest:
  </p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal — no alarms active, everything is operating normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">SmokeAlarm</span>
        <span class="enum-desc">Smoke alarm — smoke detected, possible fire</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">COAlarm</span>
        <span class="enum-desc">CO alarm — carbon monoxide leak detected</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">BatteryAlert</span>
        <span class="enum-desc">Battery alert — low battery or battery fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Testing</span>
        <span class="enum-desc">Testing — device is performing a self-test</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">HardwareFault</span>
        <span class="enum-desc">Hardware fault — device has detected an internal fault</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">EndOfService</span>
        <span class="enum-desc">End of service — device has reached its service life and needs replacement</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">InterconnectSmoke</span>
        <span class="enum-desc">Interconnect smoke — another interconnected device has triggered a smoke alarm</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">InterconnectCO</span>
        <span class="enum-desc">Interconnect CO — another interconnected device has triggered a CO alarm</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">ExpressedState Priority Mechanism</div>
    <p>
      When multiple alarms are active simultaneously, the device reflects only the highest-priority one in ExpressedState.
      For example, if both a smoke alarm and low battery are present, ExpressedState will show <code>SmokeAlarm (1)</code>.
      To obtain all individual states, you need to read the SmokeState, COState, BatteryAlert, and other attributes separately.
    </p>
  </div>

  <h4>SmokeState / COState / BatteryAlert / InterconnectSmokeAlarm / InterconnectCOAlarm Enum Values</h4>
  <p>The five attributes above share the same three-level alarm enum:</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal — no anomaly detected</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">Warning — minor anomaly detected, attention needed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Critical — confirmed danger, immediate action required</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Difference Between Warning and Critical</div>
    <p>
      <strong>Warning</strong> indicates that the sensor has detected an anomaly but has not yet confirmed it as an emergency (e.g., light smoke, slightly low battery).
      This is typically a pre-alert level, and the device may emit intermittent beeps.
      <strong>Critical</strong> indicates a confirmed emergency (e.g., persistent heavy smoke, CO concentration exceeding safe limits, critically low battery).
      The device will emit a continuous high-volume alarm.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Device Control (0x0004 - 0x0007) ====== -->
  <h3 id="group-control">Device Control (0x0004 - 0x0007)</h3>
  <p>Describes the device's mute state, self-test progress, hardware health, and service lifetime.</p>

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
          <td>DeviceMuted<br/><span class="attr-cn">Mute State</span></td>
          <td>enum8</td>
          <td>Whether the alarm has been muted by the user. When muted, the device stops sounding, but the alarm state persists (see enum below)</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>TestInProgress<br/><span class="attr-cn">Self-Test In Progress</span></td>
          <td>bool</td>
          <td>Whether the device is currently performing a self-test. <code>true</code> = self-test in progress; no new SelfTestRequest will be accepted during this time</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>HardwareFaultAlert<br/><span class="attr-cn">Hardware Fault</span></td>
          <td>bool</td>
          <td>Whether the device has detected an internal hardware fault. <code>true</code> indicates the device may not function properly and needs repair or replacement</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>EndOfServiceAlert<br/><span class="attr-cn">End of Service</span></td>
          <td>enum8</td>
          <td>Whether the device has reached its service life (see enum below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>DeviceMuted Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NotMuted</span>
        <span class="enum-desc">Not muted — alarm sounds normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Muted</span>
        <span class="enum-desc">Muted — alarm sound is suppressed, but the alarm state persists</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Mute Limitations</div>
    <p>
      Muting is triggered by a physical button on the device and cannot be controlled via remote commands.
      Muting only lasts for a limited duration (typically a few minutes), after which the alarm automatically resumes.
      If the danger persists, the device may refuse to mute or shorten the mute duration.
    </p>
  </div>

  <h4>EndOfServiceAlert Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal — device is within its service life</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Expired</span>
        <span class="enum-desc">Expired — device has reached its service life; sensors may no longer be accurate and the device should be replaced as soon as possible</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Smoke Detector Service Life</div>
    <p>
      The sensors in smoke/CO detectors degrade over time. Most devices have a designed service life of <strong>7 to 10 years</strong>.
      When <code>EndOfServiceAlert</code> changes to <code>Expired</code>, the app should prompt the user to replace the device,
      even if the device appears to still be functioning. Combined with <code>ExpiryDate (0x000C)</code>, you can provide advance notice of the expiry date.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Interconnect Alarm (0x0008 - 0x0009) ====== -->
  <h3 id="group-interconnect">Interconnect Alarm (0x0008 - 0x0009)</h3>
  <p>
    When multiple alarm devices are interconnected, if one device triggers an alarm, the others reflect that state through interconnect attributes.
    Interconnect alarms ensure the alarm can be heard throughout the entire home, even if the fire source is not in the same room as the current device.
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
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>InterconnectSmokeAlarm<br/><span class="attr-cn">Interconnect Smoke Alarm</span></td>
          <td>enum8</td>
          <td>Smoke alarm state triggered by other interconnected devices. Uses the same enum values as SmokeState (Normal / Warning / Critical). <strong>Requires SMOKE feature</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>InterconnectCOAlarm<br/><span class="attr-cn">Interconnect CO Alarm</span></td>
          <td>enum8</td>
          <td>CO alarm state triggered by other interconnected devices. Uses the same enum values as COState (Normal / Warning / Critical). <strong>Requires CO feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Interconnect vs. Local Alarm</div>
    <p>
      <code>SmokeState</code> is the detection result from the local sensor, while <code>InterconnectSmokeAlarm</code> is an alarm relayed from other interconnected devices.
      In the <code>ExpressedState</code> priority order, a local alarm (SmokeAlarm = 1) ranks higher than an interconnect alarm (InterconnectSmoke = 7),
      because locally detected smoke means the danger is nearby.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Sensor & Lifetime (0x000A - 0x000C) ====== -->
  <h3 id="group-sensor">Sensor & Lifetime (0x000A - 0x000C)</h3>
  <p>Information related to sensor health and device service lifetime.</p>

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
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>ContaminationState<br/><span class="attr-cn">Contamination State</span></td>
          <td>enum8</td>
          <td>The contamination level of the smoke sensor. Dust, cooking fumes, etc. can affect sensor sensitivity (see enum below)</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>SmokeSensitivityLevel<br/><span class="attr-cn">Smoke Sensitivity</span></td>
          <td>enum8</td>
          <td>The sensitivity setting for smoke detection. Read/Write (see enum below)</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>ExpiryDate<br/><span class="attr-cn">Expiry Date</span></td>
          <td>epoch_s</td>
          <td>The device's expiry time expressed as a Unix timestamp (seconds). The device should be replaced after this date</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ContaminationState Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal — sensor is clean</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low contamination — does not affect normal operation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">Moderate contamination — sensitivity may be reduced, cleaning recommended</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Severe contamination — sensor may not function properly, must be cleaned or replaced</span>
      </div>
    </div>
  </div>

  <h4>SmokeSensitivityLevel Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">High sensitivity — triggers on light smoke, suitable for bedrooms and other critical areas</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Standard</span>
        <span class="enum-desc">Standard sensitivity — default setting, suitable for most scenarios</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low sensitivity — reduces false alarms, suitable for kitchens and other areas prone to smoke</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Sensitivity Adjustment Recommendations</div>
    <p>
      <code>SmokeSensitivityLevel</code> is a writable attribute, and the app can provide a settings entry for users to adjust it.
      If a device installed near a kitchen triggers frequent false alarms, you may suggest the user lower the sensitivity.
      However, note that <strong>lower sensitivity may delay detection of an actual fire</strong>, so the risk must be clearly communicated.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    SmokeCOAlarm is one of the most event-rich Clusters in Matter. Events record the complete lifecycle of an alarm device from trigger to clearance,
    and are the primary data source for app push notifications and alarm history. All events have a priority of <strong>Critical</strong>.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Event Name</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>SmokeAlarm</td>
          <td>Local smoke alarm triggered</td>
          <td class="col-required">SMOKE</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>COAlarm</td>
          <td>Local CO alarm triggered</td>
          <td class="col-required">CO</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>LowBattery</td>
          <td>Low battery</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>HardwareFault</td>
          <td>Hardware fault</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>EndOfService</td>
          <td>Device has reached end of service life</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>SelfTestComplete</td>
          <td>Self-test completed</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x06</code></td>
          <td>AlarmMuted</td>
          <td>Alarm has been muted</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x07</code></td>
          <td>MuteEnded</td>
          <td>Mute ended, alarm resumed</td>
          <td class="col-optional">None</td>
        </tr>
        <tr>
          <td><code>0x08</code></td>
          <td>InterconnectSmokeAlarm</td>
          <td>Interconnect smoke alarm triggered</td>
          <td class="col-required">SMOKE</td>
        </tr>
        <tr>
          <td><code>0x09</code></td>
          <td>InterconnectCOAlarm</td>
          <td>Interconnect CO alarm triggered</td>
          <td class="col-required">CO</td>
        </tr>
        <tr>
          <td><code>0x0A</code></td>
          <td>AllClear</td>
          <td>All alarms cleared, returned to normal</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Relationship Between Events and Attributes</div>
    <p>
      Events represent "what happened" (a one-time record), while attributes represent "what is the current state" (a persistent state).
      For example, the <code>SmokeAlarm</code> event is generated once when the smoke alarm triggers,
      while the <code>SmokeState</code> attribute remains at <code>Warning</code> or <code>Critical</code> until the smoke dissipates.
      The app should subscribe to both events (for push notifications) and attributes (for real-time UI display).
    </p>
  </div>

  <h3>Typical Event Sequence</h3>
  <p>A complete smoke alarm lifecycle produces the following event sequence:</p>
  <ol>
    <li><code>SmokeAlarm</code> — sensor detects smoke, alarm begins</li>
    <li><code>AlarmMuted</code> — user presses the mute button (optional)</li>
    <li><code>MuteEnded</code> — mute times out, alarm resumes (if smoke has not cleared)</li>
    <li><code>AllClear</code> — smoke dissipates, all alarm states return to normal</li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">Meaning of AllClear</div>
    <p>
      The <code>AllClear</code> event is only triggered when <strong>all</strong> alarms have been cleared.
      If the smoke alarm clears but a CO alarm is still active, AllClear will not be triggered.
      Upon receiving AllClear, <code>ExpressedState</code> is guaranteed to be <code>Normal (0)</code>.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A SmokeCOAlarm Cluster read result from a device supporting both smoke and CO alarms in a normal state:</p>

  <pre><code>{
  // --- Overall Alarm State ---
  "0x0000": 0,              // ExpressedState = Normal (no active alarms)
  "0x0001": 0,              // SmokeState = Normal
  "0x0002": 0,              // COState = Normal
  "0x0003": 0,              // BatteryAlert = Normal
  "0x0004": 0,              // DeviceMuted = NotMuted (not muted)
  "0x0005": false,          // TestInProgress = false (not self-testing)
  "0x0006": false,          // HardwareFaultAlert = false
  "0x0007": 0,              // EndOfServiceAlert = Normal

  // --- Interconnect Alarm ---
  "0x0008": 0,              // InterconnectSmokeAlarm = Normal
  "0x0009": 0,              // InterconnectCOAlarm = Normal

  // --- Sensor & Lifetime ---
  "0x000A": 0,              // ContaminationState = Normal
  "0x000B": 1,              // SmokeSensitivityLevel = Standard
  "0x000C": 1893456000      // ExpiryDate = 2029-12-31 (epoch_s)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When reading data, it is recommended to first check <code>FeatureMap (0xFFFC)</code> to determine which features the device supports.
      A smoke-only device will not report COState (0x0002) or InterconnectCOAlarm (0x0009),
      and a CO-only detector will not report SmokeState (0x0001) or InterconnectSmokeAlarm (0x0008).
      The value of <code>ExpiryDate (0x000C)</code> is a Unix timestamp (seconds) that needs to be converted to a human-readable date before displaying to the user.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Fire Detection and Notification</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to the <code>SmokeAlarm</code> event — send an urgent push notification to the user immediately upon receipt</li>
        <li>Read <code>SmokeState (0x0001)</code> to confirm the alarm severity (Warning / Critical)</li>
        <li>Read <code>ExpressedState (0x0000)</code> to understand the overall device state</li>
        <li>Display the alarm state in the UI with a prominent color (red), and prompt the user to check the premises and call emergency services</li>
        <li>Listen for the <code>AllClear</code> event to confirm the alarm has been cleared, and return the UI to normal</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Carbon Monoxide Leak Response</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to the <code>COAlarm</code> event — CO leaks are more dangerous than smoke (colorless and odorless), so notifications must be immediate</li>
        <li>Read <code>COState (0x0002)</code> to confirm the alarm severity</li>
        <li>
          Provide safety instructions in the notification:
          <ul>
            <li>Immediately open windows for ventilation</li>
            <li>Shut off gas appliances</li>
            <li>Evacuate to a safe outdoor area</li>
            <li>Call emergency services or the gas company</li>
          </ul>
        </li>
        <li>Check <code>InterconnectCOAlarm (0x0009)</code> to determine if other areas are also alarming</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Device Maintenance and Health Monitoring</summary>
    <div class="scenario-content">
      <ol>
        <li>Periodically read <code>BatteryAlert (0x0003)</code> — prompt the user to replace the battery when Warning appears</li>
        <li>Read <code>ContaminationState (0x000A)</code> — prompt the user to clean the sensor when it reaches Warning</li>
        <li>Read <code>ExpiryDate (0x000C)</code> — notify the user in advance to purchase a replacement device as it approaches expiry</li>
        <li>Monitor <code>HardwareFaultAlert (0x0006)</code> — when <code>true</code>, prompt the user to contact customer support</li>
        <li>Trigger a self-test monthly via the <code>SelfTestRequest (0x00)</code> command to ensure the device is working properly</li>
        <li>Listen for the <code>SelfTestComplete</code> event to obtain the self-test result</li>
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
  'boolean-state': {
    title: 'BooleanState Cluster (0x0045)',
    description: 'Complete reference for the Matter BooleanState Cluster (0x0045) — StateValue attribute, StateChange event, and boolean semantics for typical devices such as contact sensors and water leak detectors.',
    prev: undefined,
    next: undefined,
    content: `<h1>BooleanState Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0045</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint) &nbsp;|&nbsp;
    <strong>Role</strong>: Server (read-only, no commands)
  </p>
  <p>
    BooleanState is one of the simplest Clusters in Matter — it has only <strong>1 attribute</strong>, <strong>0 commands</strong>, and <strong>1 event</strong>.
    It reports a generic boolean (true/false) state, and is typically used by devices that only need to express a two-state condition, such as contact sensors, water leak detectors, and smoke alarms.
  </p>
  <p>
    This Cluster is <strong>purely read-only</strong> — the app can only read the state and subscribe to changes; it cannot send any commands to the device to change the state.
    State changes are driven entirely by the device's physical sensors.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">What Do true and false Actually Mean?</div>
    <p>
      BooleanState itself <strong>does not define</strong> the specific meaning of true/false — the semantics are determined by the associated <strong>Device Type</strong>.
      This is the most common pitfall in development.
    </p>
    <p>
      For example, for a <strong>ContactSensor (contact sensor, Device Type 0x0015)</strong>:
    </p>
    <ul>
      <li><code>true</code> = door/window is <strong>closed</strong> (normal, contact closed)</li>
      <li><code>false</code> = door/window is <strong>open</strong> (alert, contact broken)</li>
    </ul>
    <p>
      This may be counter-intuitive — many people assume <code>true = open</code>.
      The Matter design logic is: <strong>true represents the "normal/safe" state, and false represents the "attention needed" state</strong>.
      Always interpret values according to the specific Device Type specification, and never assume.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>BooleanState has only one attribute, and it is mandatory.</p>

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
          <td>StateValue</td>
          <td>bool</td>
          <td>Read-only</td>
          <td>Current boolean state</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">StateValue (Current State)</h3>
  <p>
    The device's current boolean state value. Read-only — it cannot be changed by writing the attribute or sending a command. Only a trigger from the device's physical sensor updates this value.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Value</th><th>Generic Meaning</th><th>ContactSensor Meaning</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>true</code></td>
          <td>Normal / Safe</td>
          <td>Door/window is closed (contact closed)</td>
        </tr>
        <tr>
          <td><code>false</code></td>
          <td>Abnormal / Attention needed</td>
          <td>Door/window is open (contact broken)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      Do not hard-code <code>if (stateValue) "Closed"</code> in your code. Instead, determine the display text based on the device's Device Type
      (obtained from the Descriptor Cluster's DeviceTypeList).
      Future Device Types may reuse BooleanState, and the meaning of true/false could be entirely different.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    BooleanState defines one event, which the device proactively reports when <code>StateValue</code> changes.
    Subscribing to events is the recommended approach for monitoring state changes, rather than polling the attribute.
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
          <td>StateChange</td>
          <td>Info</td>
          <td>Triggered when StateValue changes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">StateChange — State Change Event (0x00)</h3>
  <p>
    When the device's physical state changes (e.g., a door is opened, a water leak is detected), the device emits this event.
    The event data carries the new <code>StateValue</code> after the change.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>StateValue</td>
          <td><code>0x00</code></td>
          <td>bool</td>
          <td>The new state value after the change</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Event report example:</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 1,
        "clusterId": "0x0045",
        "eventId": "0x00"       // StateChange
      },
      "eventNumber": 42,
      "priority": "INFO",
      "data": {
        "0": false              // StateValue = false (state changed: e.g., door opened)
      }
    }
  }]
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">Subscribe vs. Poll</div>
    <p>
      For devices like contact sensors, state changes are typically sudden and infrequent.
      It is recommended to use Subscribe to subscribe to both the <code>StateValue</code> attribute and the <code>StateChange</code> event,
      so you can immediately obtain the current state when the connection is established, and also receive real-time change notifications.
    </p>
  </div>
  <p>Subscription request example:</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributeRequests": [{
      "endpointId": 1,
      "clusterId": "0x0045",
      "attributeId": "0x00"     // StateValue
    }],
    "eventRequests": [{
      "endpointId": 1,
      "clusterId": "0x0045",
      "eventId": "0x00"         // StateChange
    }]
  }],
  "minIntervalFloor": 0,        // Minimum reporting interval (seconds)
  "maxIntervalCeiling": 300     // Maximum reporting interval (seconds)
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the BooleanState Cluster attributes of a contact sensor:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": true          // StateValue = true (normal state, e.g., door closed, no water leak)
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Contact Sensor (ContactSensor)</summary>
    <div class="scenario-content">
      <p>The most common use case. A contact sensor consists of a magnet and a reed switch; when the door is closed, the magnet approaches the reed switch and the contact closes.</p>
      <ol>
        <li>Confirm the Device Type is <code>0x0015</code> (ContactSensor) from the Descriptor Cluster</li>
        <li>Subscribe to BooleanState's <code>StateValue</code> attribute and <code>StateChange</code> event</li>
        <li>Receive <code>true</code> → display "Door Closed" (green safe state)</li>
        <li>Receive <code>false</code> → display "Door Open" (yellow alert state)</li>
        <li>Can be combined with automation: if the door is open for more than 5 minutes → send a reminder notification</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Water Leak Detector</summary>
    <div class="scenario-content">
      <p>A water leak detector is placed in locations prone to leaks (beside the washing machine, under the water heater) and triggers an alert when water is detected.</p>
      <ol>
        <li>Subscribe to the <code>StateChange</code> event</li>
        <li>Receive <code>true</code> → normal, no water leak</li>
        <li>Receive <code>false</code> → water leak detected, trigger an urgent notification</li>
        <li>Recommended to combine with automation rules: when a leak is detected, automatically shut off the smart water valve in the corresponding area</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Generic Contact Sensor</summary>
    <div class="scenario-content">
      <p>BooleanState is not limited to doors/windows and water leaks — any sensor that needs a binary state can reuse it.</p>
      <ul>
        <li><strong>Refrigerator door sensor</strong> — <code>false</code> when the door is open, with a timed reminder</li>
        <li><strong>Mailbox sensor</strong> — triggers a notification when the mailbox is opened</li>
        <li><strong>Drawer/cabinet door sensor</strong> — security scenario, alert when opened unexpectedly</li>
      </ul>
      <p>
        The key is to read the Device Type from the Descriptor Cluster and determine the UI text and icon based on the specific type,
        rather than assuming all BooleanState instances are contact sensors.
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
  'boolean-state-configuration': {
    title: 'BooleanStateConfiguration Cluster (0x0080)',
    description: 'Complete reference for the Matter BooleanStateConfiguration Cluster (0x0080) — alarm suppress/enable commands, sensitivity levels, AlarmModeBitmap, Features, and typical sensor configuration scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>BooleanStateConfiguration Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0080</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Same Endpoint as <a href="/clusters/boolean-state/">BooleanState</a> (application endpoint)
  </p>
  <p>
    BooleanStateConfiguration is the companion Cluster to <a href="/clusters/boolean-state/">BooleanState (0x0045)</a> —
    BooleanState is responsible for reporting the sensor's binary state (true/false), while BooleanStateConfiguration is responsible for <strong>configuring sensor behavior</strong>:
    managing alarm outputs (visual flashing, audible buzzer) and adjusting sensor sensitivity.
  </p>
  <p>
    Typical use case: when a contact sensor detects that a door has been opened, BooleanState's StateValue changes to false,
    while BooleanStateConfiguration controls whether the LED flashes (Visual), whether the buzzer sounds (Audible),
    and the sensor's trigger sensitivity level.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with BooleanState</div>
    <p>
      These two Clusters must be deployed on the <strong>same Endpoint</strong>.
      BooleanState is a read-only data source (sensor readings),
      while BooleanStateConfiguration is a configurable behavior layer (alarms + sensitivity).
      Do not confuse them during development: use BooleanState to read the sensor state, and BooleanStateConfiguration to configure sensor behavior.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#alarm-bitmap">AlarmModeBitmap</a>
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
    The BooleanStateConfiguration Cluster has 2 commands, used for suppressing alarms and enabling/disabling alarms respectively.
    Both commands use the <a href="#alarm-bitmap">AlarmModeBitmap</a> to specify which alarm channels to operate on.
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
          <td>SuppressAlarm</td>
          <td>Temporarily suppress an active alarm</td>
          <td class="col-required">SPRS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>EnableDisableAlarm</td>
          <td>Enable or disable alarm channels</td>
          <td class="col-required">VIS or AUD</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SuppressAlarm — Suppress Alarm (0x00)</h3>
  <p>
    Temporarily suppresses currently active alarms. For example, when a sensor is buzzing an alarm and the user presses the "Mute" button,
    the app sends this command to pause the buzzing. Suppression is not the same as disabling — the alarm channel remains enabled,
    and the alarm will reactivate the next time the sensor triggers. This command requires the device to support the <strong>SPRS (AlarmSuppress)</strong> feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsToSuppress</td>
          <td>AlarmModeBitmap</td>
          <td>Bitmap of alarm channels to suppress (see <a href="#alarm-bitmap">AlarmModeBitmap</a>). Only alarms currently active in AlarmsActive and supported in AlarmsSupported can be suppressed</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Suppress vs. Disable</div>
    <p>
      <strong>SuppressAlarm (suppress)</strong>: Temporarily mutes the current alarm; the next trigger will sound as usual. Like hitting "snooze" on an alarm clock.<br/>
      <strong>EnableDisableAlarm (disable)</strong>: Permanently turns off the alarm channel; future triggers will no longer alarm. Like turning off the alarm clock entirely.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A water leak detector detects a leak and the buzzer activates (AlarmsActive Audible bit = 1).
        The user has noticed the issue and is addressing it, then presses the "Mute" button in the app.
        The app sends SuppressAlarm (AlarmsToSuppress = 0x02, i.e., Audible),
        the device stops buzzing, and the AlarmsSuppressed Audible bit becomes 1.
        Once the user fixes the leak and the sensor returns to normal, the suppression is automatically cleared.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">EnableDisableAlarm — Enable/Disable Alarm (0x01)</h3>
  <p>
    Enables or disables specified alarm channels. This modifies the <code>AlarmsEnabled</code> attribute,
    determining which alarm channels will respond when the sensor triggers in the future. This command requires the device to support at least one alarm feature (VIS or AUD).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsToEnableDisable</td>
          <td>AlarmModeBitmap</td>
          <td>New alarm enable bitmap (see <a href="#alarm-bitmap">AlarmModeBitmap</a>). Channels with bits set to 1 are enabled; bits set to 0 are disabled. Only bits supported in AlarmsSupported can be set</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user disables the audible alarm for a contact sensor on the settings page (keeping only the visual LED reminder).
        The app sends EnableDisableAlarm (AlarmsToEnableDisable = 0x01, i.e., Visual only),
        and thereafter the sensor will only flash its indicator LED when triggered, without buzzing.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The BooleanStateConfiguration Cluster has 7 application attributes, divided into two groups: sensitivity configuration and alarm state.
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
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <!-- Sensitivity Configuration -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CurrentSensitivityLevel</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">Sensitivity</a></td>
          <td>Current sensitivity level</td>
          <td class="col-required">SENS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SupportedSensitivityLevels</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">Sensitivity</a></td>
          <td>Number of supported sensitivity levels</td>
          <td class="col-required">SENS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>DefaultSensitivityLevel</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">Sensitivity</a></td>
          <td>Factory default sensitivity level</td>
          <td class="col-required">SENS</td>
        </tr>
        <!-- Alarm State -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>AlarmsActive</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Currently active alarms</td>
          <td class="col-required">VIS or AUD</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AlarmsSuppressed</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Currently suppressed alarms</td>
          <td class="col-required">SPRS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>AlarmsEnabled</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Enabled alarm channels</td>
          <td class="col-required">VIS or AUD</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>AlarmsSupported</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">Alarm State</a></td>
          <td>Alarm channels supported by the device</td>
          <td class="col-required">VIS or AUD</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Sensitivity Configuration (0x0000 ~ 0x0002) ====== -->
  <h3 id="group-sensitivity">Sensitivity Configuration (0x0000 ~ 0x0002)</h3>
  <p>
    Controls the sensor's trigger sensitivity. Sensitivity is represented as an integer level starting from 0,
    where 0 is the highest sensitivity (most easily triggered) and higher values mean lower sensitivity.
    These attributes require the device to support the <strong>SENS (SensitivityLevel)</strong> feature.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Meaning of Sensitivity Levels</div>
    <p>
      The level is an abstract numeric value: <strong>0 = most sensitive, higher values = less sensitive</strong>.
      The specific physical parameters each level corresponds to (e.g., magnetic field strength threshold, vibration amplitude, etc.) are defined by the device manufacturer;
      the Matter specification does not prescribe them. The application layer should map levels to labels like "High / Medium / Low" rather than displaying raw numbers.
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
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>CurrentSensitivityLevel (Current Sensitivity)</td>
          <td>uint8</td>
          <td>The currently active sensitivity level. Read/Write, value range <code>0</code> to <code>SupportedSensitivityLevels - 1</code>. <strong>Requires SENS feature</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SupportedSensitivityLevels (Supported Levels Count)</td>
          <td>uint8</td>
          <td>Total number of sensitivity levels supported by the device. Minimum value is 2 (at least a high and low setting). Read-only, determined by device firmware. <strong>Requires SENS feature</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>DefaultSensitivityLevel (Default Sensitivity)</td>
          <td>uint8</td>
          <td>The factory default sensitivity level. Read-only. The app can provide a "Restore Default" button that writes CurrentSensitivityLevel back to this value. <strong>Requires SENS feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Sensitivity Level Mapping Example</summary>
    <div class="scenario-content">
      <p>Suppose a contact sensor supports 3 sensitivity levels (SupportedSensitivityLevels = 3):</p>
      <ul>
        <li><code>0</code> = High sensitivity — triggers on slight vibration (suitable for valuables cabinets)</li>
        <li><code>1</code> = Medium sensitivity — triggers on normal door open/close (default, suitable for most scenarios)</li>
        <li><code>2</code> = Low sensitivity — triggers only on obvious door opening (suitable for windy environments, reduces false alarms)</li>
      </ul>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Alarm State (0x0003 ~ 0x0006) ====== -->
  <h3 id="group-alarm">Alarm State (0x0003 ~ 0x0006)</h3>
  <p>
    Manages the sensor's alarm output channels. All alarm attributes use the <a href="#alarm-bitmap">AlarmModeBitmap</a> type,
    controlling two alarm modes via bitmap: visual (LED flash) and audible (buzzer).
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
          <td>AlarmsActive (Active Alarms)</td>
          <td>AlarmModeBitmap</td>
          <td>Currently active alarm channels. Read-only, automatically set by the device when the sensor triggers. <strong>Requires VIS or AUD feature</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AlarmsSuppressed (Suppressed Alarms)</td>
          <td>AlarmModeBitmap</td>
          <td>Alarm channels currently suppressed (muted) by the user. Set via the <a href="#cmd-0x00">SuppressAlarm</a> command. Automatically cleared when the sensor returns to normal. <strong>Requires SPRS feature</strong></td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>AlarmsEnabled (Enabled Alarms)</td>
          <td>AlarmModeBitmap</td>
          <td>User-configured alarm channel enable status. Modified via the <a href="#cmd-0x01">EnableDisableAlarm</a> command. Only enabled channels will activate when the sensor triggers. <strong>Requires VIS or AUD feature</strong></td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>AlarmsSupported (Supported Alarms)</td>
          <td>AlarmModeBitmap</td>
          <td>Alarm channels supported by the device hardware. Read-only, determined by device firmware. The valid bits of AlarmsEnabled cannot exceed this range. <strong>Requires VIS or AUD feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between the Four Alarm Attributes</div>
    <p>
      <strong>AlarmsSupported</strong> ⊇ <strong>AlarmsEnabled</strong> ⊇ <strong>AlarmsActive</strong>,
      <strong>AlarmsSuppressed</strong> ⊆ <strong>AlarmsActive</strong>.<br/>
      Which channels the device supports (Supported) → which the user has enabled (Enabled) → which are currently sounding (Active) → which have been temporarily muted (Suppressed).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== AlarmModeBitmap ====== -->
  <h2 id="alarm-bitmap">AlarmModeBitmap</h2>
  <p>
    The four attributes AlarmsActive, AlarmsSuppressed, AlarmsEnabled, and AlarmsSupported,
    as well as the parameters of both commands, all use the same AlarmModeBitmap definition.
    Each bit represents an alarm output channel:
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Visual (Visual Alarm)</span>
        <span class="enum-desc">LED flash — the device's LED indicator flashes as an alert</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Audible (Audible Alarm)</span>
        <span class="enum-desc">Buzzer sound — emits an audible alarm alert</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Bitmap Value Quick Reference</div>
    <p>
      <code>0x00</code> = no alarm,
      <code>0x01</code> = visual only,
      <code>0x02</code> = audible only,
      <code>0x03</code> = visual + audible.
    </p>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    BooleanStateConfiguration defines one <code>AlarmsStateChanged</code> event,
    which the device proactively reports when any alarm state changes.
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
          <td>AlarmsStateChanged</td>
          <td>Info</td>
          <td>Triggered when alarm state changes</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">AlarmsStateChanged — Alarm State Change Event (0x00)</h3>
  <p>
    When the alarm state changes (alarm activated, cleared, or suppressed), the device generates this event.
    The event carries a complete snapshot of the alarm state after the change. Controllers should subscribe to this event to receive real-time alarm change notifications.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>ID</th><th>Type</th><th>Required Feature</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsActive</td>
          <td><code>0x00</code></td>
          <td>AlarmModeBitmap</td>
          <td class="col-required">VIS or AUD</td>
          <td>Currently active alarm channels after the change (optional field, included when the device supports VIS/AUD)</td>
        </tr>
        <tr>
          <td>AlarmsSuppressed</td>
          <td><code>0x01</code></td>
          <td>AlarmModeBitmap</td>
          <td class="col-required">SPRS</td>
          <td>Currently suppressed alarm channels after the change (optional field, included when the device supports SPRS)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Event report example (visual alarm active, audible alarm suppressed):</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 1,
        "clusterId": "0x0080",
        "eventId": "0x00"       // AlarmsStateChanged
      },
      "eventNumber": 15,
      "priority": "INFO",
      "data": {
        "0": "0x01",            // AlarmsActive = 0x01 (visual alarm active)
        "1": "0x02"             // AlarmsSuppressed = 0x02 (audible alarm suppressed)
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>BooleanStateConfiguration declares its supported capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">VIS (Visual)</span>
        <span class="enum-desc">Visual alarm — device supports LED flash alerts. When enabled, provides AlarmsActive/Enabled/Supported attributes (Visual bit valid)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AUD (Audible)</span>
        <span class="enum-desc">Audible alarm — device supports buzzer sound alerts. When enabled, provides AlarmsActive/Enabled/Supported attributes (Audible bit valid)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SPRS (AlarmSuppress)</span>
        <span class="enum-desc">Alarm suppression — supports temporarily muting active alarms. When enabled, provides the SuppressAlarm command and AlarmsSuppressed attribute</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">SENS (SensitivityLevel)</span>
        <span class="enum-desc">Sensitivity level — supports adjusting sensor sensitivity. When enabled, provides the CurrentSensitivityLevel/SupportedSensitivityLevels/DefaultSensitivityLevel attributes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature Combination Requirements</div>
    <p>
      The device must support at least one of the VIS, AUD, or SENS features (otherwise this Cluster serves no purpose).
      The SPRS (alarm suppression) feature requires at least one of VIS or AUD to also be present, since there is nothing to suppress without an alarm.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading BooleanStateConfiguration attributes from a contact sensor that supports visual alarms, audible alarms, and sensitivity adjustment:</p>

  <pre><code>{
  // --- Sensitivity Configuration (SENS feature) ---
  "0x0000": 1,              // CurrentSensitivityLevel = 1 (current sensitivity level)
  "0x0001": 3,              // SupportedSensitivityLevels = 3 (supports levels 0/1/2)
  "0x0002": 1,              // DefaultSensitivityLevel = 1 (factory default level)

  // --- Alarm State (VIS + AUD features) ---
  "0x0003": "0x03",         // AlarmsActive = 0x03 (both visual + audible alarms active)
  "0x0004": "0x00",         // AlarmsSuppressed = 0x00 (no alarms suppressed)
  "0x0005": "0x03",         // AlarmsEnabled = 0x03 (both visual + audible alarms enabled)
  "0x0006": "0x03"          // AlarmsSupported = 0x03 (device supports visual + audible alarms)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      First read <code>FeatureMap (0xFFFC)</code> to determine which features the device supports.
      A device that only supports SENS will not have alarm-related attributes, and a device that only supports VIS/AUD will not have sensitivity attributes.
      Reading a non-existent attribute will return an UNSUPPORTED_ATTRIBUTE error.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Contact Sensor Alarm Configuration and Muting</summary>
    <div class="scenario-content">
      <p>A user installs a contact sensor with a buzzer and wants to keep only the LED alert at night (disable the buzzer), with the ability to mute at any time.</p>
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports VIS + AUD + SPRS</li>
        <li>Read <code>AlarmsSupported (0x0006)</code> to confirm the device supports Visual (0x01) and Audible (0x02)</li>
        <li>Night mode: send <code>EnableDisableAlarm</code> with AlarmsToEnableDisable = <code>0x01</code> (Visual only), disabling the buzzer</li>
        <li>Day mode: send <code>EnableDisableAlarm</code> with AlarmsToEnableDisable = <code>0x03</code> (restore Visual + Audible)</li>
        <li>When the alarm sounds: user taps "Mute", send <code>SuppressAlarm</code> with AlarmsToSuppress = <code>0x02</code> (suppress Audible)</li>
        <li>Subscribe to the <code>AlarmsStateChanged</code> event to synchronize the alarm state icon in the app in real time</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Water Leak Detector Sensitivity Adjustment</summary>
    <div class="scenario-content">
      <p>A user's water leak detector placed beside the washing machine occasionally triggers false alarms from splashing water, and the sensitivity needs to be lowered.</p>
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports the SENS feature</li>
        <li>Read <code>SupportedSensitivityLevels (0x0001)</code> = 3, indicating support for 3 levels: 0/1/2</li>
        <li>Read <code>DefaultSensitivityLevel (0x0002)</code> = 1, factory default is medium</li>
        <li>Display a slider in the settings page: High (0) / Medium (1) / Low (2)</li>
        <li>User selects "Low", write <code>CurrentSensitivityLevel (0x0000)</code> = 2</li>
        <li>Provide a "Restore Default" button: when tapped, write CurrentSensitivityLevel back to the DefaultSensitivityLevel value (1)</li>
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
  'switch': {
    title: 'Switch Cluster (0x003B)',
    description: 'Complete reference for the Matter Switch Cluster (0x003B) — physical input devices (toggle switches, buttons, knobs), Feature Map, attribute definitions, 7 event types, event-driven model, and typical scenario examples.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>Switch Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003B</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    The Switch Cluster describes <strong>physical input devices</strong> — wall-mounted toggle switches, doorbell buttons, dimmer knobs, and so on.
    It does not control any outputs (turning a light on or off is the job of the OnOff Cluster); instead, it <strong>converts the user's physical actions into events</strong>,
    and the bound target devices or automation rules decide the actual actions.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Switch ≠ OnOff</div>
    <p>
      Two easily confused Clusters: <strong>Switch (0x003B)</strong> is a physical input device, responsible for reporting "what the user pressed";
      <strong>OnOff (0x0006)</strong> is an output control, responsible for executing "whether the device is on or off".
      A wall switch panel typically includes both — Switch detects press actions, OnOff executes on/off control.
      However, the Switch Cluster itself has <strong>no commands</strong>; it is purely an event source.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Event-Driven Model</div>
    <p>
      The Switch Cluster is the most typical <strong>event-driven Cluster</strong> in Matter.
      It has no commands (does not accept external instructions); all information is reported through events.
      Controllers (phones, hubs) need to <strong>subscribe to events</strong> to detect user actions, rather than polling attribute changes.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#events">Event Details</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    The Switch Cluster's Feature Map is very important — it determines what type of switch the device is and which events it will report.
    The device must declare either <strong>LS</strong> (Latching Switch) or <strong>MS</strong> (Momentary Switch), and the two are mutually exclusive.
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LS (Latching Switch)</span>
        <span class="enum-desc">Latching switch — stays in position after being toggled (e.g., a traditional wall toggle switch). Mutually exclusive with MS</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">MS (Momentary Switch)</span>
        <span class="enum-desc">Momentary switch — springs back automatically after being pressed (e.g., a pushbutton, doorbell). Mutually exclusive with LS</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MSR (Momentary Switch Release)</span>
        <span class="enum-desc">Release detection — supports detecting button release actions. Depends on MS</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">MSL (Momentary Switch Long Press)</span>
        <span class="enum-desc">Long press detection — supports distinguishing short press and long press. Depends on MS + MSR</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">MSM (Momentary Switch Multi Press)</span>
        <span class="enum-desc">Multi-press — supports detecting consecutive presses such as double-tap, triple-tap. Depends on MS + MSR</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Dependencies</div>
    <p>
      <strong>LS</strong> and <strong>MS</strong> are mutually exclusive; both cannot be declared simultaneously.<br/>
      <strong>MSR</strong> depends on MS (only momentary switches have a "release" concept).<br/>
      <strong>MSL</strong> and <strong>MSM</strong> both depend on MS + MSR (precise press/release timing is needed to determine long press or multi-press).
    </p>
  </div>

  <h3>Feature Combination Examples</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Device Type</th>
          <th>Feature Value</th>
          <th>Enabled Features</th>
          <th>Supported Events</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Traditional wall toggle switch</td>
          <td><code>0x01</code></td>
          <td>LS</td>
          <td>SwitchLatched</td>
        </tr>
        <tr>
          <td>Simple pushbutton</td>
          <td><code>0x06</code></td>
          <td>MS + MSR</td>
          <td>InitialPress, ShortRelease</td>
        </tr>
        <tr>
          <td>Button with long press support</td>
          <td><code>0x0E</code></td>
          <td>MS + MSR + MSL</td>
          <td>InitialPress, ShortRelease, LongPress, LongRelease</td>
        </tr>
        <tr>
          <td>Full-featured button (long press + multi-press)</td>
          <td><code>0x1E</code></td>
          <td>MS + MSR + MSL + MSM</td>
          <td>All momentary events</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The Switch Cluster has only 3 attributes, all read-only. The switch's core information is reported through events; attributes mainly describe device capabilities.</p>

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
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>NumberOfPositions</td>
          <td>uint8</td>
          <td class="col-required">Yes</td>
          <td>Total number of switch positions. Minimum value is <code>2</code>. A regular switch has 2 (on/off); a multi-position knob can have more</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPosition</td>
          <td>uint8</td>
          <td class="col-required">Yes</td>
          <td>Current position, range <code>0</code> to <code>NumberOfPositions - 1</code>. For a latching switch, this value persists after toggling; for a momentary switch, it changes on press and may return to 0 on release</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MultiPressMax</td>
          <td>uint8</td>
          <td class="col-optional">MSM</td>
          <td>Maximum number of consecutive presses the device can recognize. For example, a value of <code>3</code> means it can recognize up to a triple-tap. <strong>Only present when the MSM Feature is enabled</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Positions Are Zero-Indexed</div>
    <p>
      Position numbering starts from <code>0</code>. A two-position toggle switch has positions 0 and 1, not 1 and 2.
      A 4-position knob has positions 0, 1, 2, 3.
    </p>
  </div>

  <!-- ====== Event Details ====== -->
  <h2 id="events">Event Details</h2>
  <p>
    Events are the <strong>core</strong> of the Switch Cluster. All user actions are reported to controllers through events.
    Different Feature combinations determine which events the device will report. Click an event ID in the table below to jump to its detailed description.
  </p>

  <!-- Event Summary Table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Required Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>SwitchLatched</td>
          <td class="col-required">LS</td>
          <td>Latching switch toggled to a new position</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>InitialPress</td>
          <td class="col-required">MS</td>
          <td>Momentary button pressed</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>LongPress</td>
          <td class="col-required">MS + MSL</td>
          <td>Button held past the long-press threshold</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x03">
          <td><a href="#event-0x03"><code>0x03</code></a></td>
          <td>ShortRelease</td>
          <td class="col-required">MS + MSR</td>
          <td>Button released after a short press</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x04">
          <td><a href="#event-0x04"><code>0x04</code></a></td>
          <td>LongRelease</td>
          <td class="col-required">MS + MSL</td>
          <td>Button released after a long press</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x05">
          <td><a href="#event-0x05"><code>0x05</code></a></td>
          <td>MultiPressOngoing</td>
          <td class="col-required">MS + MSM</td>
          <td>Multi-press in progress (reported on each press)</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x06">
          <td><a href="#event-0x06"><code>0x06</code></a></td>
          <td>MultiPressComplete</td>
          <td class="col-required">MS + MSM</td>
          <td>Multi-press completed (reports total count)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Individual Event Details ====== -->

  <!-- SwitchLatched -->
  <h3 id="event-0x00">SwitchLatched — Latching Switch Toggled (0x00)</h3>
  <p>
    Triggered when a latching switch is toggled to a new position.
    This is the only event reported by LS-type devices — simple and straightforward: toggle and report.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>The new position the switch was toggled to</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>Traditional wall toggle switch: the user flips the switch from "down" to "up", and the device reports <code>SwitchLatched {'{ NewPosition: 1 }'}</code>.
         The controller then sends an On command to the bound light via the binding relationship.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- InitialPress -->
  <h3 id="event-0x01">InitialPress — Button Pressed (0x01)</h3>
  <p>
    Triggered the instant a momentary button is pressed. This is the starting point for all momentary switch (MS) action sequences —
    regardless of whether a short press, long press, or multi-press follows, it all begins with InitialPress.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>Position after pressing (typically <code>1</code>)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>The user presses a doorbell button, and the device immediately reports <code>InitialPress {'{ NewPosition: 1 }'}</code>.
         The controller can trigger the doorbell chime at this moment, without waiting for release.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- LongPress -->
  <h3 id="event-0x02">LongPress — Long Press (0x02)</h3>
  <p>
    Triggered when a button is held continuously past the device's internal long-press threshold.
    Reported after InitialPress and before release. Requires the <strong>MSL</strong> Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>Position while held (same as InitialPress NewPosition)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>Dimmer button: short press toggles on/off, long press starts brightness adjustment.
         The user holds the button, and upon receiving LongPress, the controller begins continuously adjusting the light's brightness (via LevelControl Cluster's MoveWithOnOff command),
         until it receives LongRelease, at which point it stops.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ShortRelease -->
  <h3 id="event-0x03">ShortRelease — Short Press Release (0x03)</h3>
  <p>
    Triggered when a button is released before the LongPress threshold is reached (i.e., this was a short press).
    Requires the <strong>MSR</strong> Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>Position while pressed (i.e., position before release)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">Note the Field Name</div>
    <p>
      ShortRelease and LongRelease use <strong>PreviousPosition</strong> (position before release),
      while InitialPress and LongPress use <strong>NewPosition</strong> (position after pressing).
      Although the values are usually the same, the semantics differ — one describes "where it went when pressed", the other describes "where it was released from".
    </p>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>Smart button: upon receiving ShortRelease, confirm this was a short press and execute the corresponding short-press action (e.g., Toggle light on/off).
         If the MSM Feature is enabled, the device waits to determine if there are subsequent presses (multi-press), so ShortRelease may not fire immediately.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- LongRelease -->
  <h3 id="event-0x04">LongRelease — Long Press Release (0x04)</h3>
  <p>
    Triggered when the button is released after LongPress has fired (i.e., the long press ends).
    Requires the <strong>MSL</strong> Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>Position during the long press (i.e., position before release)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>Dimmer button long-press release: upon receiving LongRelease, the controller stops brightness adjustment (sends StopWithOnOff command), and the light stays at the current brightness.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- MultiPressOngoing -->
  <h3 id="event-0x05">MultiPressOngoing — Multi-Press In Progress (0x05)</h3>
  <p>
    During a rapid consecutive press sequence, this event is triggered on <strong>each press</strong>, carrying the cumulative press count so far.
    Requires the <strong>MSM</strong> Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>Position after pressing</td>
        </tr>
        <tr>
          <td>CurrentNumberOfPressesCounted</td>
          <td>uint8</td>
          <td>Cumulative press count so far (starts from 2, since the first press is InitialPress)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>User rapidly triple-taps a button. Event sequence:</p>
      <ol>
        <li><code>InitialPress {'{ NewPosition: 1 }'}</code> — first press</li>
        <li><code>MultiPressOngoing {'{ NewPosition: 1, CurrentNumberOfPressesCounted: 2 }'}</code> — second press</li>
        <li><code>MultiPressOngoing {'{ NewPosition: 1, CurrentNumberOfPressesCounted: 3 }'}</code> — third press</li>
        <li><code>MultiPressComplete {'{ PreviousPosition: 1, TotalNumberOfPressesCounted: 3 }'}</code> — multi-press complete</li>
      </ol>
      <p>Controllers typically wait for MultiPressComplete before executing an action, rather than responding to each Ongoing event.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- MultiPressComplete -->
  <h3 id="event-0x06">MultiPressComplete — Multi-Press Complete (0x06)</h3>
  <p>
    Triggered after a consecutive press sequence ends, carrying the final total press count. This is the key event for the controller to determine user intent —
    based on the total count, it decides which action to execute (single-tap, double-tap, triple-tap, etc.).
    Requires the <strong>MSM</strong> Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>Position during the presses</td>
        </tr>
        <tr>
          <td>TotalNumberOfPressesCounted</td>
          <td>uint8</td>
          <td>Total press count. A value of <code>1</code> indicates a single-tap, <code>2</code> indicates a double-tap, and so on. Maximum value does not exceed MultiPressMax</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">Special Meaning of TotalNumberOfPressesCounted = 0</div>
    <p>
      If <code>TotalNumberOfPressesCounted</code> is <code>0</code>, it means this multi-press sequence was <strong>invalid</strong>
      (e.g., the press count exceeded MultiPressMax, or the device determined it was an accidental touch). Controllers should not execute any action when receiving 0.
    </p>
  </div>
  <details class="scenario">
    <summary>Typical Scenario</summary>
    <div class="scenario-content">
      <p>Aqara wireless button: single-tap turns on the light, double-tap switches scenes, triple-tap turns off all lights.
         The controller waits for MultiPressComplete, then dispatches different automation actions based on the TotalNumberOfPressesCounted value.</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Event Sequence Diagram ====== -->
  <h3 id="event-sequences">Event Sequence Comparison</h3>
  <p>Event reporting order for different operation types:</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Operation</th>
          <th>Event Sequence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Toggle (LS)</td>
          <td><code>SwitchLatched</code></td>
        </tr>
        <tr>
          <td>Short press (MS+MSR)</td>
          <td><code>InitialPress</code> &#8594; <code>ShortRelease</code></td>
        </tr>
        <tr>
          <td>Long press (MS+MSR+MSL)</td>
          <td><code>InitialPress</code> &#8594; <code>LongPress</code> &#8594; <code>LongRelease</code></td>
        </tr>
        <tr>
          <td>Double-tap (MS+MSR+MSM)</td>
          <td><code>InitialPress</code> &#8594; <code>MultiPressOngoing(2)</code> &#8594; <code>MultiPressComplete(2)</code></td>
        </tr>
        <tr>
          <td>Single-tap (MS+MSR+MSM, confirmed after timeout)</td>
          <td><code>InitialPress</code> &#8594; <code>MultiPressComplete(1)</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read result from a smart button supporting long press and double-tap (Features: MS+MSR+MSL+MSM):</p>

  <pre><code>{
  // --- Switch Position ---
  "0x0000": 2,              // NumberOfPositions = 2 (two positions, e.g., a common up/down toggle switch)
  "0x0001": 0,              // CurrentPosition = 0 (currently at position 0)

  // --- Multi-Press ---
  "0x0002": 3               // MultiPressMax = 3 (recognizes up to 3 consecutive presses)
}</code></pre>

  <h3>Event Subscription and Reception Example</h3>
  <p>Subscribing to Switch Cluster events and the data format when receiving events:</p>

  <pre><code>// Event subscription example — subscribe to all events of the Switch Cluster
{
  "subscribeRequest": {
    "eventRequests": [{
      "endpoint": 1,
      "cluster": "0x003B"    // Switch Cluster
    }],
    "minInterval": 0,
    "maxInterval": 60
  }
}

// Received InitialPress event
{
  "eventPath": {
    "endpoint": 1,
    "cluster": "0x003B",
    "event": "0x01"          // InitialPress
  },
  "eventData": {
    "NewPosition": 1         // Position after pressing
  }
}

// Received MultiPressComplete event
{
  "eventPath": {
    "endpoint": 1,
    "cluster": "0x003B",
    "event": "0x06"          // MultiPressComplete
  },
  "eventData": {
    "PreviousPosition": 1,
    "TotalNumberOfPressesCounted": 2  // Total 2 presses (double-tap)
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The Switch Cluster has few attributes; its core value is in events. Key points during development:
    </p>
    <ul>
      <li>First read <code>FeatureMap (0xFFFC)</code> to determine which operation modes the device supports</li>
      <li>Subscribe to events rather than polling <code>CurrentPosition</code></li>
      <li>If MSM is supported, read <code>MultiPressMax</code> to know the maximum multi-press count</li>
      <li>For buttons that support multiple operation types, consider providing a UI for users to configure actions for single-tap/double-tap/long-press</li>
    </ul>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Wall Toggle Switch (Latching Switch)</summary>
    <div class="scenario-content">
      <p><strong>Device</strong>: Traditional up/down wall toggle switch, Feature = LS (0x01)</p>
      <ol>
        <li>Device declares <code>NumberOfPositions = 2</code> (up/down, two positions)</li>
        <li>User flips the switch from down to up, device reports <code>SwitchLatched {'{ NewPosition: 1 }'}</code></li>
        <li>Controller finds the corresponding light via binding relationship and sends the <code>On</code> command</li>
        <li>User flips the switch from up to down, device reports <code>SwitchLatched {'{ NewPosition: 0 }'}</code></li>
        <li>Controller sends the <code>Off</code> command, light turns off</li>
      </ol>
      <p>This type of switch is the simplest — one event, one action, with no concept of long press or multi-press. The switch position and light state have a direct physical correspondence.</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Dimmer Knob / Dimmer Button</summary>
    <div class="scenario-content">
      <p><strong>Device</strong>: A knob with press capability or a dimmer button, Feature = MS + MSR + MSL (0x0E)</p>
      <ol>
        <li>User <strong>short presses</strong>: receives InitialPress &#8594; ShortRelease, controller executes Toggle (switch on/off)</li>
        <li>User <strong>long presses</strong>:
          <ul>
            <li>Receives InitialPress — do not act yet, wait for subsequent events</li>
            <li>Receives LongPress — begin continuous brightness adjustment (send MoveWithOnOff command)</li>
            <li>Receives LongRelease — stop brightness adjustment (send StopWithOnOff command)</li>
          </ul>
        </li>
      </ol>
      <p>Key design point: do not execute Toggle on InitialPress, otherwise a long press would also trigger an on/off toggle first.
         The correct approach is to wait for ShortRelease or LongPress before deciding on the action.</p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Multi-Function Wireless Button (Multi Press)</summary>
    <div class="scenario-content">
      <p><strong>Device</strong>: Aqara / Eve wireless smart button, Feature = MS + MSR + MSL + MSM (0x1E), MultiPressMax = 3</p>
      <ol>
        <li><strong>Single-tap</strong> (confirmed after timeout): InitialPress &#8594; MultiPressComplete(1) &#8594; Execute action A (e.g., turn on light)</li>
        <li><strong>Double-tap</strong>: InitialPress &#8594; MultiPressOngoing(2) &#8594; MultiPressComplete(2) &#8594; Execute action B (e.g., switch scene)</li>
        <li><strong>Triple-tap</strong>: InitialPress &#8594; MultiPressOngoing(2) &#8594; MultiPressOngoing(3) &#8594; MultiPressComplete(3) &#8594; Execute action C (e.g., turn off all lights)</li>
        <li><strong>Long press</strong>: InitialPress &#8594; LongPress &#8594; LongRelease &#8594; Execute action D (e.g., enter pairing mode)</li>
      </ol>
      <p>In the app, you can let users customize the automation action for each operation type, similar to Apple HomeKit's button configuration interface.</p>
      <p><strong>Note</strong>: Single-tap confirmation has a delay — the device waits a brief period to confirm there are no subsequent presses before reporting MultiPressComplete(1).
         This is to distinguish a single-tap from the first press of a double-tap; users may notice a slight response delay.</p>
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
