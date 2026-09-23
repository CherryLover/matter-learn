import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'thermostat': {
    title: 'Thermostat Cluster (0x0201)',
    description: 'Complete reference for Matter Thermostat Cluster (0x0201) — Commands including SystemMode/SetpointRaiseLower, 40+ attribute definitions including LocalTemperature/OccupiedCoolingSetpoint, enum value quick reference, and real device data examples.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: { title: 'Cluster Reference', slug: 'clusters' },
    content: `<h1>Thermostat Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0201</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (functional endpoint)
  </p>
  <p>
    Thermostat is the core Cluster for Matter HVAC devices, defining all capabilities including temperature reading, cooling/heating setpoint management, system mode switching, and weekly schedule programming.
    All thermostat device development revolves around this Cluster.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Temperature Unit Pitfall</div>
    <p>
      All temperature attributes in the Thermostat Cluster use <strong>0.01°C</strong> units. For example, <code>LocalTemperature = 2150</code> means an actual temperature of <strong>21.50°C</strong>.
      Always perform unit conversion when reading/writing temperature attributes, otherwise setpoints will be off by a factor of 100.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature Bits</div>
    <p>
      Thermostat capabilities are determined by the Feature Map. <code>Bit 0 = HEAT</code>, <code>Bit 1 = COOL</code>, <code>Bit 5 = AUTO</code>, <code>Bit 6 = LTNE</code> (Local Temperature Not Exposed).
      Many attributes are Feature-gated — for example, only devices supporting COOL have <code>OccupiedCoolingSetpoint</code>. Reading an unsupported attribute returns <code>UNSUPPORTED_ATTRIBUTE</code>.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">Standard Example</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Thermostat commands are primarily used to adjust setpoints and manage weekly schedules. Unlike door locks, thermostat commands <strong>do not require Timed Interaction</strong> and can be sent directly.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Feature Required</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>SetpointRaiseLower</td>
          <td>Raise or lower temperature setpoint</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SetWeeklySchedule</td>
          <td>Set weekly temperature schedule</td>
          <td class="col-feature">SCH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>GetWeeklySchedule</td>
          <td>Query configured weekly schedule</td>
          <td class="col-feature">SCH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>ClearWeeklySchedule</td>
          <td>Clear all weekly schedules</td>
          <td class="col-feature">SCH</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SetpointRaiseLower Special Behavior</div>
    <p>
      When the value exceeds the limit range, <code>SetpointRaiseLower</code> silently <strong>clamps</strong> to the nearest valid value instead of returning an error.
      This differs from direct attribute writes — writing an out-of-range value to <code>OccupiedHeatingSetpoint</code> returns <code>CONSTRAINT_ERROR</code>.
      This asymmetric behavior is intentional in the Matter specification.
    </p>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SetpointRaiseLower — Adjust Setpoint (0x00)</h3>
  <p>
    Raise or lower temperature setpoints. This is the most commonly used command for thermostat devices — called when the user taps the "Temperature +" or "Temperature -" buttons in the App.
    Depending on the <code>Mode</code> parameter, you can adjust only the heating setpoint, only the cooling setpoint, or both simultaneously.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mode</td>
          <td>enum8</td>
          <td>Yes</td>
          <td>Adjustment target: <code>0</code> = Heat, <code>1</code> = Cool, <code>2</code> = Both</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>int8</td>
          <td>Yes</td>
          <td>Adjustment amount, in 0.1°C units. Positive values raise, negative values lower. For example, <code>10</code> means raise by 1.0°C</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>
        When the user taps "Temperature +1°C" in the App, send <code>SetpointRaiseLower(Mode=2, Amount=10)</code> to raise both heating and cooling setpoints by 1°C.
        If the current <code>SystemMode</code> is Heat, you can send just <code>Mode=0</code>.
        Values exceeding <code>MinHeatSetpointLimit</code> / <code>MaxCoolSetpointLimit</code> are automatically clamped without returning an error.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">SetWeeklySchedule — Set Weekly Schedule (0x01)</h3>
  <p>
    Set temperature transition schedules for specified days of the week. Multiple days and time points can be set in a single call.
    Requires device support for the <strong>SCH</strong> (Schedule) Feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NumberOfTransitionsForSequence</td>
          <td>uint8</td>
          <td>Number of temperature transition points in this request</td>
        </tr>
        <tr>
          <td>DayOfWeekForSequence</td>
          <td>bitmap8</td>
          <td>Applicable days of the week (bitmap: Bit 0 = Sunday, Bit 1 = Monday ... Bit 6 = Saturday)</td>
        </tr>
        <tr>
          <td>ModeForSequence</td>
          <td>bitmap8</td>
          <td>Mode bitmap: Bit 0 = includes heating setpoint, Bit 1 = includes cooling setpoint</td>
        </tr>
        <tr>
          <td>Transitions</td>
          <td>list</td>
          <td>List of transition points. Each contains TransitionTime (minutes since midnight 0:00) and corresponding setpoint temperature</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>
        Set a schedule for "weekday mornings at 7:00 raise to 22°C, evenings at 22:00 lower to 18°C".
        <code>DayOfWeekForSequence = 0b0111110</code> (Monday through Friday), with two transition points.
        Schedule capacity can be queried via <code>NumberOfWeeklyTransitions (0x21)</code> and <code>NumberOfDailyTransitions (0x22)</code>.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">GetWeeklySchedule — Query Weekly Schedule (0x02)</h3>
  <p>Query configured weekly schedules. Specify the desired days and mode; the device returns the corresponding transition table.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DaysToReturn</td>
          <td>bitmap8</td>
          <td>Days to query (bitmap format same as SetWeeklySchedule)</td>
        </tr>
        <tr>
          <td>ModeToReturn</td>
          <td>bitmap8</td>
          <td>Mode to query (Bit 0 = Heating, Bit 1 = Cooling)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">ClearWeeklySchedule — Clear Weekly Schedule (0x03)</h3>
  <p>Clear all weekly schedules on the device. No parameters; after execution, the device returns to a no-schedule state.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>Thermostat Cluster attributes are organized into five functional groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Temperature Info 0x00-0x09 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>LocalTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Locally measured temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>OutdoorTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Outdoor temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>Occupancy</td>
          <td>bitmap8</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Occupancy status</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>AbsMinHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Absolute minimum heating setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>AbsMaxHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Absolute maximum heating setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>AbsMinCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Absolute minimum cooling setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>AbsMaxCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Absolute maximum cooling setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>PICoolingDemand</td>
          <td>uint8</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Cooling demand percentage (0-100)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>PIHeatingDemand</td>
          <td>uint8</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>Heating demand percentage (0-100)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>HVACSystemTypeConfiguration</td>
          <td>bitmap8</td>
          <td><a href="#attr-temp">Temperature Info</a></td>
          <td>HVAC system type configuration</td>
        </tr>
        <!-- Setpoints 0x10-0x19 -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>LocalTemperatureCalibration</td>
          <td>int8</td>
          <td><a href="#attr-setpoint">Setpoints</a></td>
          <td>Local temperature calibration offset</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>OccupiedCoolingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>Occupied cooling setpoint temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>OccupiedHeatingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>Occupied heating setpoint temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>UnoccupiedCoolingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>Unoccupied cooling setpoint temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>UnoccupiedHeatingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>Unoccupied heating setpoint temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>MinHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>User-adjustable minimum heating setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>MaxHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>User-adjustable maximum heating setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>MinCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>User-adjustable minimum cooling setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>MaxCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>User-adjustable maximum cooling setpoint</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>MinSetpointDeadBand</td>
          <td>int8</td>
          <td><a href="#attr-setpoint">Setpoint</a></td>
          <td>Minimum gap between heating and cooling setpoints</td>
        </tr>
        <!-- Mode & Status 0x1A-0x29 -->
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>RemoteSensing</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Remote sensor usage flags</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>ControlSequenceOfOperation</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Control sequence of operation</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>SystemMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>System operating mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>ThermostatRunningMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Actual running mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>StartOfWeek</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Start of week</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>NumberOfWeeklyTransitions</td>
          <td>uint8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Maximum weekly transition points</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>NumberOfDailyTransitions</td>
          <td>uint8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Maximum daily transition points</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x23">
          <td><a href="#attr-0x23"><code>0x23</code></a></td>
          <td>TemperatureSetpointHold</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Setpoint hold toggle</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x24">
          <td><a href="#attr-0x24"><code>0x24</code></a></td>
          <td>TemperatureSetpointHoldDuration</td>
          <td>uint16 / null</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Setpoint hold duration (minutes)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x25">
          <td><a href="#attr-0x25"><code>0x25</code></a></td>
          <td>ThermostatProgrammingOperationMode</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Programming operation mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x29">
          <td><a href="#attr-0x29"><code>0x29</code></a></td>
          <td>ThermostatRunningState</td>
          <td>bitmap16</td>
          <td><a href="#attr-mode">Mode & Status</a></td>
          <td>Current running state bitmap</td>
        </tr>
        <!-- Setpoint Change Tracking 0x30-0x3A -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>SetpointChangeSource</td>
          <td>enum8</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Source of the last setpoint change</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>SetpointChangeAmount</td>
          <td>int16s / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Amount of the last setpoint change</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>SetpointChangeSourceTimestamp</td>
          <td>epoch-s</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Timestamp of the last setpoint change</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x34">
          <td><a href="#attr-0x34"><code>0x34</code></a></td>
          <td>OccupiedSetback</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Occupied energy-saving setback temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x35">
          <td><a href="#attr-0x35"><code>0x35</code></a></td>
          <td>OccupiedSetbackMin</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Occupied setback minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x36">
          <td><a href="#attr-0x36"><code>0x36</code></a></td>
          <td>OccupiedSetbackMax</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Occupied setback maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x37">
          <td><a href="#attr-0x37"><code>0x37</code></a></td>
          <td>UnoccupiedSetback</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Unoccupied energy-saving setback temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x38">
          <td><a href="#attr-0x38"><code>0x38</code></a></td>
          <td>UnoccupiedSetbackMin</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Unoccupied setback minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x39">
          <td><a href="#attr-0x39"><code>0x39</code></a></td>
          <td>UnoccupiedSetbackMax</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Unoccupied setback maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x3A">
          <td><a href="#attr-0x3A"><code>0x3A</code></a></td>
          <td>EmergencyHeatDelta</td>
          <td>uint8</td>
          <td><a href="#attr-change">Change Tracking</a></td>
          <td>Emergency heat activation delta</td>
        </tr>
        <!-- AC Capabilities 0x40-0x47 -->
        <tr class="clickable-row" data-href="#attr-0x40">
          <td><a href="#attr-0x40"><code>0x40</code></a></td>
          <td>ACType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>AC type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x41">
          <td><a href="#attr-0x41"><code>0x41</code></a></td>
          <td>ACCapacity</td>
          <td>uint16</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>AC cooling/heating capacity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x42">
          <td><a href="#attr-0x42"><code>0x42</code></a></td>
          <td>ACRefrigerantType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>Refrigerant type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x43">
          <td><a href="#attr-0x43"><code>0x43</code></a></td>
          <td>ACCompressorType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>Compressor type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x44">
          <td><a href="#attr-0x44"><code>0x44</code></a></td>
          <td>ACErrorCode</td>
          <td>bitmap32</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>AC error code bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x45">
          <td><a href="#attr-0x45"><code>0x45</code></a></td>
          <td>ACLouverPosition</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>Louver/air deflector position</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x46">
          <td><a href="#attr-0x46"><code>0x46</code></a></td>
          <td>ACCoilTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>Coil temperature</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x47">
          <td><a href="#attr-0x47"><code>0x47</code></a></td>
          <td>ACCapacityFormat</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC Capabilities</a></td>
          <td>Capacity unit format</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Group Details ====== -->

  <!-- Temperature Info 0x00-0x09 -->
  <h3 id="attr-temp">Temperature Information (0x00-0x09)</h3>
  <p>Basic measurements, absolute limits, and system demand information for the thermostat device.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>LocalTemperature<br/><span class="attr-cn">Local Temperature</span></td>
          <td>int16s / null</td>
          <td>Current temperature measured by the thermostat, in 0.01°C units. <code>null</code> indicates temperature unavailable</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>OutdoorTemperature<br/><span class="attr-cn">Outdoor Temperature</span></td>
          <td>int16s / null</td>
          <td>Outdoor temperature, provided by external sensors or remote data sources</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>Occupancy<br/><span class="attr-cn">Occupancy Status</span></td>
          <td>bitmap8</td>
          <td>Bit 0 = 1 indicates the space is occupied, device uses Occupied setpoints; = 0 uses Unoccupied setpoints</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>AbsMinHeatSetpointLimit<br/><span class="attr-cn">Abs Min Heat Setpoint</span></td>
          <td>int16s</td>
          <td>Hardware-defined absolute minimum heating setpoint, factory-fixed</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>AbsMaxHeatSetpointLimit<br/><span class="attr-cn">Abs Max Heat Setpoint</span></td>
          <td>int16s</td>
          <td>Hardware-defined absolute maximum heating setpoint, factory-fixed</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>AbsMinCoolSetpointLimit<br/><span class="attr-cn">Abs Min Cool Setpoint</span></td>
          <td>int16s</td>
          <td>Hardware-defined absolute minimum cooling setpoint</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>AbsMaxCoolSetpointLimit<br/><span class="attr-cn">Abs Max Cool Setpoint</span></td>
          <td>int16s</td>
          <td>Hardware-defined absolute maximum cooling setpoint</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>PICoolingDemand<br/><span class="attr-cn">Cooling Demand</span></td>
          <td>uint8</td>
          <td>Current cooling demand percentage (0-100%), calculated by PI algorithm</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>PIHeatingDemand<br/><span class="attr-cn">Heating Demand</span></td>
          <td>uint8</td>
          <td>Current heating demand percentage (0-100%), calculated by PI algorithm</td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>HVACSystemTypeConfiguration<br/><span class="attr-cn">HVAC System Type</span></td>
          <td>bitmap8</td>
          <td>System type bitmap — cooling system stages, heating system stages, heating type (gas/electric), heating fuel source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      <code>LocalTemperature</code> is a <strong>Nullable</strong> type — the value is <code>null</code> when the sensor is faulty or not yet ready.
      If the LTNE (Local Temperature Not Exposed) Feature is enabled, this attribute also returns <code>null</code>.
      The App must handle null values when displaying temperature.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Absolute Limits vs. User Limits</div>
    <p>
      <code>AbsMin/MaxHeatSetpointLimit</code> (0x03-0x06) are <strong>hardware-defined</strong> absolute ranges, read-only and immutable.
      <code>MinHeatSetpointLimit</code> (0x15-0x18) are <strong>user-adjustable</strong> ranges that must stay within the absolute limits.
      Setpoint write validation chain: AbsMin &le; UserMin &le; Setpoint &le; UserMax &le; AbsMax.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Setpoints 0x10-0x19 -->
  <h3 id="attr-setpoint">Setpoints (0x10-0x19)</h3>
  <p>Temperature setpoints are the core of thermostat control — the device determines heating/cooling actions based on the difference between setpoints and current temperature.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>LocalTemperatureCalibration<br/><span class="attr-cn">Temperature Calibration</span></td>
          <td>int8</td>
          <td>Calibration offset for the local temperature sensor, in 0.1°C units. For example, <code>-5</code> means actual temperature is 0.5°C lower than the sensor reading</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>OccupiedCoolingSetpoint<br/><span class="attr-cn">Occupied Cooling Setpoint</span></td>
          <td>int16s</td>
          <td>Cooling target temperature when occupied. Cooling starts when LocalTemperature exceeds this value</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>OccupiedHeatingSetpoint<br/><span class="attr-cn">Occupied Heating Setpoint</span></td>
          <td>int16s</td>
          <td>Heating target temperature when occupied. Heating starts when LocalTemperature falls below this value</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>UnoccupiedCoolingSetpoint<br/><span class="attr-cn">Unoccupied Cooling Setpoint</span></td>
          <td>int16s</td>
          <td>Cooling target temperature when unoccupied (typically higher than occupied, for energy saving)</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>UnoccupiedHeatingSetpoint<br/><span class="attr-cn">Unoccupied Heating Setpoint</span></td>
          <td>int16s</td>
          <td>Heating target temperature when unoccupied (typically lower than occupied, for energy saving)</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>MinHeatSetpointLimit<br/><span class="attr-cn">Min Heat Limit</span></td>
          <td>int16s</td>
          <td>User-configurable minimum heating temperature (writable, but cannot be lower than AbsMinHeatSetpointLimit)</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>MaxHeatSetpointLimit<br/><span class="attr-cn">Max Heat Limit</span></td>
          <td>int16s</td>
          <td>User-configurable maximum heating temperature</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>MinCoolSetpointLimit<br/><span class="attr-cn">Min Cool Limit</span></td>
          <td>int16s</td>
          <td>User-configurable minimum cooling temperature</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>MaxCoolSetpointLimit<br/><span class="attr-cn">Max Cool Limit</span></td>
          <td>int16s</td>
          <td>User-configurable maximum cooling temperature</td>
        </tr>
        <tr id="attr-0x19">
          <td><code>0x19</code></td>
          <td>MinSetpointDeadBand<br/><span class="attr-cn">Deadband</span></td>
          <td>int8</td>
          <td>Minimum temperature gap between heating and cooling setpoints, in 0.1°C units. Prevents simultaneous heating and cooling. For example, <code>25</code> means 2.5°C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Setpoint Limit Chain</div>
    <p>
      When writing setpoints, the device validates the complete limit chain (Matter spec section 4.3.6):<br/>
      <code>AbsMin &le; MinLimit &le; Setpoint &le; MaxLimit &le; AbsMax</code><br/>
      Additionally in Auto mode: <code>HeatingSetpoint + MinSetpointDeadBand &le; CoolingSetpoint</code>.<br/>
      Writing an out-of-range value directly returns <code>CONSTRAINT_ERROR</code>; via <code>SetpointRaiseLower</code> it silently clamps.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Mode & Status 0x1A-0x29 -->
  <h3 id="attr-mode">Mode & Status (0x1A-0x29)</h3>
  <p>Defines the thermostat system's operating modes, scheduling capabilities, and current running status.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>RemoteSensing<br/><span class="attr-cn">Remote Sensing Flags</span></td>
          <td>bitmap8</td>
          <td>Indicates which temperature/occupancy data comes from remote sensors. Bit 0 = Local temperature, Bit 1 = Outdoor temperature, Bit 2 = Occupancy</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>ControlSequenceOfOperation<br/><span class="attr-cn">Control Sequence</span></td>
          <td>enum8</td>
          <td>Supported operating combinations (cooling only / heating only / cooling and heating, etc.). See enum values below</td>
        </tr>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>SystemMode<br/><span class="attr-cn">System Mode</span></td>
          <td>enum8</td>
          <td>User-configured system operating mode. See enum values below</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>ThermostatRunningMode<br/><span class="attr-cn">Actual Running Mode</span></td>
          <td>enum8</td>
          <td>Current actual running mode. Available only with AUTO Feature, value is one of Off/Cool/Heat</td>
        </tr>
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>StartOfWeek<br/><span class="attr-cn">Start of Week</span></td>
          <td>enum8</td>
          <td>First day of the weekly schedule. See enum values below</td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>NumberOfWeeklyTransitions<br/><span class="attr-cn">Weekly Transitions</span></td>
          <td>uint8</td>
          <td>Maximum number of weekly temperature transition points supported by the device</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>NumberOfDailyTransitions<br/><span class="attr-cn">Daily Transitions</span></td>
          <td>uint8</td>
          <td>Maximum number of daily temperature transition points supported by the device</td>
        </tr>
        <tr id="attr-0x23">
          <td><code>0x23</code></td>
          <td>TemperatureSetpointHold<br/><span class="attr-cn">Setpoint Hold</span></td>
          <td>enum8</td>
          <td>Whether to temporarily lock the current setpoint, ignoring scheduled changes. See enum values below</td>
        </tr>
        <tr id="attr-0x24">
          <td><code>0x24</code></td>
          <td>TemperatureSetpointHoldDuration<br/><span class="attr-cn">Hold Duration</span></td>
          <td>uint16 / null</td>
          <td>Duration of the setpoint hold, in minutes (0-1440). <code>null</code> or <code>0xFFFF</code> indicates indefinite hold</td>
        </tr>
        <tr id="attr-0x25">
          <td><code>0x25</code></td>
          <td>ThermostatProgrammingOperationMode<br/><span class="attr-cn">Programming Mode</span></td>
          <td>bitmap8</td>
          <td>Programming mode bitmap. See definitions below</td>
        </tr>
        <tr id="attr-0x29">
          <td><code>0x29</code></td>
          <td>ThermostatRunningState<br/><span class="attr-cn">Running State Bitmap</span></td>
          <td>bitmap16</td>
          <td>Currently running subsystems (heating/cooling/fan stages). See bitmap below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SystemMode Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">Off, no heating or cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Auto</span>
        <span class="enum-desc">Auto mode, automatically switches between heating/cooling based on temperature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cool</span>
        <span class="enum-desc">Cooling only mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Heat</span>
        <span class="enum-desc">Heating only mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">EmergencyHeat</span>
        <span class="enum-desc">Emergency heat (backup heat source, such as electric heating elements)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Precooling</span>
        <span class="enum-desc">Precooling (pre-cool during off-peak electricity hours)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">FanOnly</span>
        <span class="enum-desc">Fan only, no heating or cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Dry</span>
        <span class="enum-desc">Dehumidification mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Sleep</span>
        <span class="enum-desc">Sleep mode (low noise, gentle temperature control)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Note the Numbering Gap</div>
    <p>The SystemMode enum has <strong>no value 2</strong> (it jumps from 1=Auto directly to 3=Cool). Do not assume consecutive values when parsing; use explicit map lookups.</p>
  </div>

  <h4>ControlSequenceOfOperation Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">CoolingOnly</span>
        <span class="enum-desc">Cooling only</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CoolingWithReheat</span>
        <span class="enum-desc">Cooling with reheat (prevents overcooling)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HeatingOnly</span>
        <span class="enum-desc">Heating only</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">HeatingWithReheat</span>
        <span class="enum-desc">Heating with reheat</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">CoolingAndHeating</span>
        <span class="enum-desc">Cooling and heating (four-pipe system)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">CoolingAndHeatingWithReheat</span>
        <span class="enum-desc">Cooling and heating with reheat</span>
      </div>
    </div>
  </div>

  <h4>ThermostatRunningMode Enum Values</h4>
  <p>Available only with the AUTO Feature, indicates the system's current actual operating direction:</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">Not currently running</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cool</span>
        <span class="enum-desc">Currently cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Heat</span>
        <span class="enum-desc">Currently heating</span>
      </div>
    </div>
  </div>

  <h4>ThermostatRunningState Bitmap</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HeatStateOn</span>
        <span class="enum-desc">First-stage heating active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CoolStateOn</span>
        <span class="enum-desc">First-stage cooling active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">FanStateOn</span>
        <span class="enum-desc">Fan active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">HeatSecondStageStateOn</span>
        <span class="enum-desc">Second-stage heating active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">CoolSecondStageStateOn</span>
        <span class="enum-desc">Second-stage cooling active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">FanSecondStageStateOn</span>
        <span class="enum-desc">Second-stage fan active</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">FanThirdStageStateOn</span>
        <span class="enum-desc">Third-stage fan active</span>
      </div>
    </div>
  </div>

  <h4>TemperatureSetpointHold Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">Not holding, setpoint follows schedule changes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">Holding, setpoint locked at current value unaffected by schedule</span>
      </div>
    </div>
  </div>

  <h4>ThermostatProgrammingOperationMode Bitmap</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">ScheduleActive</span>
        <span class="enum-desc">1 = Run according to schedule, 0 = Run according to manual setpoint</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AutoRecovery</span>
        <span class="enum-desc">1 = Enable auto recovery (start early to reach target temperature on time)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Economy</span>
        <span class="enum-desc">1 = Economy mode (Energy Star compatible operation)</span>
      </div>
    </div>
  </div>

  <h4>StartOfWeek Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Sunday</span>
        <span class="enum-desc">Sunday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Monday</span>
        <span class="enum-desc">Monday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Tuesday</span>
        <span class="enum-desc">Tuesday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Wednesday</span>
        <span class="enum-desc">Wednesday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Thursday</span>
        <span class="enum-desc">Thursday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Friday</span>
        <span class="enum-desc">Friday</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Saturday</span>
        <span class="enum-desc">Saturday</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SystemMode vs ThermostatRunningMode vs ThermostatRunningState</div>
    <p>
      Three easily confused attributes:<br/>
      <strong>SystemMode</strong> (0x1C) = User-configured target mode, read/write (e.g., "Auto")<br/>
      <strong>ThermostatRunningMode</strong> (0x1E) = Actual direction chosen in Auto mode (read-only, one of Off/Cool/Heat)<br/>
      <strong>ThermostatRunningState</strong> (0x29) = Real-time on/off status of each subsystem (heating/cooling/fan) (read-only bitmap)
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Change Tracking & Energy Saving 0x30-0x3A -->
  <h3 id="attr-change">Change Tracking & Energy Saving (0x30-0x3A)</h3>
  <p>Tracks setpoint change sources and history, as well as energy-saving setback configuration.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>SetpointChangeSource<br/><span class="attr-cn">Change Source</span></td>
          <td>enum8</td>
          <td>Source of the most recent setpoint change. See enum values below</td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>SetpointChangeAmount<br/><span class="attr-cn">Change Amount</span></td>
          <td>int16s / null</td>
          <td>Magnitude of the most recent setpoint change, in 0.01°C units. <code>null</code> indicates no change record</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>SetpointChangeSourceTimestamp<br/><span class="attr-cn">Change Timestamp</span></td>
          <td>epoch-s</td>
          <td>UTC timestamp of the most recent setpoint change</td>
        </tr>
        <tr id="attr-0x34">
          <td><code>0x34</code></td>
          <td>OccupiedSetback<br/><span class="attr-cn">Occupied Setback</span></td>
          <td>uint8 / null</td>
          <td>Energy-saving temperature setback when occupied, in 0.1°C units. Used to moderately reduce energy consumption during occupied periods</td>
        </tr>
        <tr id="attr-0x35">
          <td><code>0x35</code></td>
          <td>OccupiedSetbackMin<br/><span class="attr-cn">Occupied Setback Min</span></td>
          <td>uint8 / null</td>
          <td>Minimum allowed value for OccupiedSetback</td>
        </tr>
        <tr id="attr-0x36">
          <td><code>0x36</code></td>
          <td>OccupiedSetbackMax<br/><span class="attr-cn">Occupied Setback Max</span></td>
          <td>uint8 / null</td>
          <td>Maximum allowed value for OccupiedSetback</td>
        </tr>
        <tr id="attr-0x37">
          <td><code>0x37</code></td>
          <td>UnoccupiedSetback<br/><span class="attr-cn">Unoccupied Setback</span></td>
          <td>uint8 / null</td>
          <td>Energy-saving temperature setback when unoccupied, in 0.1°C units. Typically larger than occupied setback</td>
        </tr>
        <tr id="attr-0x38">
          <td><code>0x38</code></td>
          <td>UnoccupiedSetbackMin<br/><span class="attr-cn">Unoccupied Setback Min</span></td>
          <td>uint8 / null</td>
          <td>Minimum allowed value for UnoccupiedSetback</td>
        </tr>
        <tr id="attr-0x39">
          <td><code>0x39</code></td>
          <td>UnoccupiedSetbackMax<br/><span class="attr-cn">Unoccupied Setback Max</span></td>
          <td>uint8 / null</td>
          <td>Maximum allowed value for UnoccupiedSetback</td>
        </tr>
        <tr id="attr-0x3A">
          <td><code>0x3A</code></td>
          <td>EmergencyHeatDelta<br/><span class="attr-cn">Emergency Heat Delta</span></td>
          <td>uint8</td>
          <td>Temperature deviation threshold for triggering emergency heat, in 0.1°C units</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SetpointChangeSource Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Manual</span>
        <span class="enum-desc">Manual adjustment by user (via panel or App)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Schedule</span>
        <span class="enum-desc">Automatically triggered by weekly/daily schedule</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">External</span>
        <span class="enum-desc">Triggered by external system (such as a home automation platform)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- AC Capabilities 0x40-0x47 -->
  <h3 id="attr-ac">AC Capabilities (0x40-0x47)</h3>
  <p>Hardware capabilities and operating parameters for AC units. This group of attributes is primarily used for Mini Split AC devices.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x40">
          <td><code>0x40</code></td>
          <td>ACType<br/><span class="attr-cn">AC Type</span></td>
          <td>enum8</td>
          <td>AC type and drive method. See enum values below</td>
        </tr>
        <tr id="attr-0x41">
          <td><code>0x41</code></td>
          <td>ACCapacity<br/><span class="attr-cn">AC Capacity</span></td>
          <td>uint16</td>
          <td>Cooling/heating capacity, unit determined by ACCapacityFormat (typically BTU/h)</td>
        </tr>
        <tr id="attr-0x42">
          <td><code>0x42</code></td>
          <td>ACRefrigerantType<br/><span class="attr-cn">Refrigerant Type</span></td>
          <td>enum8</td>
          <td>Type of refrigerant used. See enum values below</td>
        </tr>
        <tr id="attr-0x43">
          <td><code>0x43</code></td>
          <td>ACCompressorType<br/><span class="attr-cn">Compressor Type</span></td>
          <td>enum8</td>
          <td>Compressor temperature rating. See enum values below</td>
        </tr>
        <tr id="attr-0x44">
          <td><code>0x44</code></td>
          <td>ACErrorCode<br/><span class="attr-cn">AC Error Code</span></td>
          <td>bitmap32</td>
          <td>AC fault status bitmap — Bit 0: Compressor fault, Bit 1: Indoor temperature sensor fault, Bit 2: Outdoor temperature sensor fault, Bit 3: Coil sensor fault, Bit 4: Fan fault</td>
        </tr>
        <tr id="attr-0x45">
          <td><code>0x45</code></td>
          <td>ACLouverPosition<br/><span class="attr-cn">Louver Position</span></td>
          <td>enum8</td>
          <td>Louver/air deflector open/close position. See enum values below</td>
        </tr>
        <tr id="attr-0x46">
          <td><code>0x46</code></td>
          <td>ACCoilTemperature<br/><span class="attr-cn">Coil Temperature</span></td>
          <td>int16s / null</td>
          <td>Real-time temperature of the evaporator/condenser coil, in 0.01°C units</td>
        </tr>
        <tr id="attr-0x47">
          <td><code>0x47</code></td>
          <td>ACCapacityFormat<br/><span class="attr-cn">Capacity Format</span></td>
          <td>enum8</td>
          <td>Unit format for ACCapacity. <code>0</code> = BTU/h</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ACType Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown type</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CoolingFixedSpeed</span>
        <span class="enum-desc">Fixed-speed cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HeatPumpFixedSpeed</span>
        <span class="enum-desc">Fixed-speed heat pump</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CoolingInverter</span>
        <span class="enum-desc">Inverter cooling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HeatPumpInverter</span>
        <span class="enum-desc">Inverter heat pump</span>
      </div>
    </div>
  </div>

  <h4>ACRefrigerantType Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">R22</span>
        <span class="enum-desc">R22 (deprecated HCFC)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">R410a</span>
        <span class="enum-desc">R410a (mainstream HFC)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">R407c</span>
        <span class="enum-desc">R407c (HFC alternative)</span>
      </div>
    </div>
  </div>

  <h4>ACCompressorType Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">T1</span>
        <span class="enum-desc">Max outdoor temperature 43°C</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">T2</span>
        <span class="enum-desc">Max outdoor temperature 35°C</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">T3</span>
        <span class="enum-desc">Max outdoor temperature 52°C (tropical regions)</span>
      </div>
    </div>
  </div>

  <h4>ACLouverPosition Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">FullyClosed</span>
        <span class="enum-desc">Fully closed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">FullyOpen</span>
        <span class="enum-desc">Fully open</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">QuarterOpen</span>
        <span class="enum-desc">Quarter open</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HalfOpen</span>
        <span class="enum-desc">Half open</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ThreeQuartersOpen</span>
        <span class="enum-desc">Three-quarters open</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Standard Example ====== -->
  <h2 id="standard-example">Standard Example</h2>
  <p>Below is a typical attribute data example for a Matter thermostat (JSON format), with each field annotated:</p>

  <pre><code>{
  // --- Temperature Info ---
  "0x00": 2150,          // LocalTemperature = 2150 → actual 21.50°C
  "0x01": 3200,          // OutdoorTemperature = 3200 → actual 32.00°C
  "0x02": 1,             // Occupancy = 1 (occupied)

  // --- Setpoints ---
  "0x11": 2400,          // OccupiedCoolingSetpoint = 2400 → 24.00°C
  "0x12": 2000,          // OccupiedHeatingSetpoint = 2000 → 20.00°C
  "0x15": 700,           // MinHeatSetpointLimit = 700 → 7.00°C
  "0x16": 3000,          // MaxHeatSetpointLimit = 3000 → 30.00°C
  "0x17": 1600,          // MinCoolSetpointLimit = 1600 → 16.00°C
  "0x18": 3200,          // MaxCoolSetpointLimit = 3200 → 32.00°C
  "0x19": 25,            // MinSetpointDeadBand = 25 → 2.5°C

  // --- Mode & Status ---
  "0x1B": 4,             // ControlSequenceOfOperation = CoolingAndHeating
  "0x1C": 1,             // SystemMode = Auto
  "0x1E": 3,             // ThermostatRunningMode = Cool
  "0x29": 0x0006,        // ThermostatRunningState = CoolStateOn + FanStateOn

  // --- AC Capabilities ---
  "0x40": 3,             // ACType = CoolingAndInverter
  "0x41": 12000,         // ACCapacity = 12000 (BTU/h)
  "0x42": 2,             // ACRefrigerantType = R410a
  "0x45": 4              // ACLouverPosition = HalfOpen
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      All temperature attribute values are integers in 0.01°C units. To display <code>2150</code> returned by the device to the user, divide by 100 to get <code>21.50°C</code>.
      <code>ThermostatRunningState = 0x0006</code> means Bit 1 (CoolStateOn) and Bit 2 (FanStateOn) are both set, indicating both cooling and fan are running.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Read Current Temperature and System Status</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>LocalTemperature (0x00)</code> — handle <code>null</code> values</li>
        <li>Read <code>SystemMode (0x1C)</code> to get the current mode (Off/Auto/Cool/Heat, etc.)</li>
        <li>Read <code>ThermostatRunningState (0x29)</code> to determine which subsystems are running</li>
        <li>Perform unit conversion when displaying — divide all temperature values by 100 for actual Celsius</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Adjust Temperature Setpoints</summary>
    <div class="scenario-content">
      <ol>
        <li>First read <code>MinHeatSetpointLimit (0x15)</code> through <code>MaxCoolSetpointLimit (0x18)</code> to determine the adjustable range</li>
        <li>Use the <code>SetpointRaiseLower</code> command for incremental adjustments, or write directly to <code>OccupiedCoolingSetpoint (0x11)</code> / <code>OccupiedHeatingSetpoint (0x12)</code></li>
        <li>In Auto mode, observe the <code>MinSetpointDeadBand (0x19)</code> constraint — heating and cooling setpoints must maintain sufficient separation</li>
        <li>Subscribe to setpoint attribute changes to confirm modifications take effect</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Switch System Mode</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>ControlSequenceOfOperation (0x1B)</code> to determine which mode combinations the device supports</li>
        <li>For cooling-only devices (value 0-1), do not show Heat options; for heating-only devices (value 2-3), do not show Cool options</li>
        <li>Write to <code>SystemMode (0x1C)</code> to switch modes</li>
        <li>After switching, read <code>ThermostatRunningMode (0x1E)</code> (in Auto mode) to confirm actual device operating direction</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Set Weekly Schedule</summary>
    <div class="scenario-content">
      <ol>
        <li>First confirm the device supports the SCH Feature (check Feature Map)</li>
        <li>Read <code>NumberOfWeeklyTransitions (0x21)</code> and <code>NumberOfDailyTransitions (0x22)</code> to understand capacity limits</li>
        <li>Read <code>StartOfWeek (0x20)</code> to determine the start of week</li>
        <li>Send <code>SetWeeklySchedule (0x01)</code> to set the schedule</li>
        <li>Verify by reading back with <code>GetWeeklySchedule (0x02)</code></li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 5: Display Thermostat Card on App Home Screen</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>LocalTemperature (0x00)</code> + <code>SystemMode (0x1C)</code> + <code>ThermostatRunningState (0x29)</code></li>
        <li>Display current temperature and target temperature (select corresponding setpoint based on SystemMode)</li>
        <li>Use ThermostatRunningState bitmap for running animations — heating / cooling / fan running</li>
        <li>Combine with PowerSource Cluster to display battery level (for battery-powered thermostats)</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-feature {
    color: #60a5fa;
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
  'thermostat-ui-configuration': {
    title: 'ThermostatUserInterfaceConfiguration Cluster (0x0204)',
    description: 'Complete reference for Matter ThermostatUserInterfaceConfiguration Cluster (0x0204) — TemperatureDisplayMode temperature display units, KeypadLockout keypad lock levels, ScheduleProgrammingVisibility schedule visibility, and thermostat physical panel behavior configuration.',
    prev: { title: 'Thermostat', slug: 'thermostat' },
    next: undefined,
    content: `<h1>Thermostat User Interface Configuration Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0204</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Same Endpoint as Thermostat (0x0201), typically on <code>Endpoint 1</code>
  </p>
  <p>
    ThermostatUserInterfaceConfiguration is used to configure the display and operation behavior of the thermostat's <strong>physical panel</strong> —
    whether the panel shows temperature in Celsius or Fahrenheit, whether keys are locked, and whether schedule programming is visible.
    This is a configuration-only Cluster with <strong>only 3 attributes and no commands</strong>, all configured through Write operations.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with Thermostat Cluster</div>
    <p>
      <a href="../thermostat/">Thermostat (0x0201)</a> handles core thermostat logic — temperature reading, setpoints, operating modes, command control.
      ThermostatUserInterfaceConfiguration (0x0204) only manages the <strong>user interface</strong> — what the panel displays and what the user can operate.
      Both coexist on the same Endpoint, each with its own responsibilities.
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Difference from Unit Localization</div>
    <p>
      <a href="../unit-localization/">Unit Localization (0x002D)</a> is on Endpoint 0 and controls <strong>device-wide temperature display preferences</strong>.
      TemperatureDisplayMode here controls <strong>the thermostat's own panel temperature display</strong>.
      Both can be set independently, but it is recommended to keep them consistent to avoid confusing users.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Scenarios</a>
  </nav>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    ThermostatUserInterfaceConfiguration has 3 attributes, all read/write.
    Click an attribute ID in the summary table below to jump to its detailed description.
  </p>

  <!-- Attribute summary table -->
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
          <td>TemperatureDisplayMode</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>Panel temperature display unit (Celsius / Fahrenheit)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>KeypadLockout</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>Panel keypad lock level (No lock / Level 1-5)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ScheduleProgrammingVisibility</td>
          <td>enum8</td>
          <td>Read/Write</td>
          <td>Whether schedule programming is visible on the panel</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== TemperatureDisplayMode ====== -->
  <h3 id="attr-0x00">TemperatureDisplayMode (Temperature Display Mode)</h3>
  <p>
    Controls the temperature display unit on the thermostat's physical panel. After writing, the temperature numbers on the panel immediately display in the new unit.
    This attribute <strong>does not affect</strong> temperature values reported by the Thermostat Cluster via the Matter protocol —
    temperatures transmitted over the protocol are always in 0.01°C units.
  </p>

  <h4>TemperatureDisplayModeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Celsius</span>
        <span class="enum-desc">Celsius (°C) — default value, used in most regions worldwide</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Fahrenheit</span>
        <span class="enum-desc">Fahrenheit (°F) — used in the United States and other regions</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== KeypadLockout ====== -->
  <h3 id="attr-0x01">KeypadLockout (Keypad Lockout)</h3>
  <p>
    Controls the keypad lock level on the thermostat panel. When locked, users cannot modify specific settings via physical keys
    and can only make changes remotely through the Matter protocol (App / automation). This is very useful in commercial and public venues — preventing unauthorized temperature adjustments.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Lock Level Description</div>
    <p>
      The Matter specification defines 5 lock levels, but <strong>which specific functions each level locks is determined by the manufacturer</strong>.
      The specification only requires that higher levels lock more functions. Level 5 locks all local operations.
      The function restriction descriptions below are typical implementation references; actual behavior depends on the device manufacturer's documentation.
    </p>
  </div>

  <h4>KeypadLockoutEnum Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoLockout</span>
        <span class="enum-desc">No lockout — all panel keys available (default)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LockoutLevel1</span>
        <span class="enum-desc">Level 1 lockout — typically locks schedule programming</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">LockoutLevel2</span>
        <span class="enum-desc">Level 2 lockout — typically also locks mode switching (heat/cool/auto)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">LockoutLevel3</span>
        <span class="enum-desc">Level 3 lockout — typically also locks fan speed adjustment</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">LockoutLevel4</span>
        <span class="enum-desc">Level 4 lockout — typically also locks temperature setpoint adjustment</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">LockoutLevel5</span>
        <span class="enum-desc">Level 5 lockout — locks all local operations, panel is view-only</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Lockout ≠ Disable</div>
    <p>
      Keypad lockout only prevents modifying settings through the <strong>physical panel</strong> and does not affect remote operations via the Matter protocol.
      Even with KeypadLockout = Level5, App and automation rules can still adjust temperature and switch modes normally.
      This is the core purpose of this attribute — centralizing control authority to the remote management side.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== ScheduleProgrammingVisibility ====== -->
  <h3 id="attr-0x02">ScheduleProgrammingVisibility (Schedule Programming Visibility)</h3>
  <p>
    Controls whether the schedule programming feature entry is displayed on the thermostat panel.
    When hidden, users cannot see schedule-related menus or buttons on the panel and can only manage schedules through the App.
  </p>

  <h4>ScheduleProgrammingVisibilityEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">ScheduleProgrammingPermitted</span>
        <span class="enum-desc">Schedule visible — users can view and edit schedules on the panel (default)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ScheduleProgrammingDenied</span>
        <span class="enum-desc">Schedule hidden — schedule function not displayed on panel, can only be managed through the App</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ThermostatUserInterfaceConfiguration <strong>does not define any commands</strong>.
    All configuration is done through direct attribute writes. This is a common pattern in Matter —
    for configuration-only Clusters, direct attribute read/write is simpler than defining dedicated commands.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">How to Configure</div>
    <p>
      Want to switch temperature display units? Simply send a Write request to the <code>TemperatureDisplayMode</code> attribute.
      Want to lock the panel? Just write to <code>KeypadLockout</code>. No Timed Interaction needed.
    </p>
  </div>

  <p>Write request example — switch to Fahrenheit display:</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0204",
      "attributeId": "0x00"           // TemperatureDisplayMode
    },
    "attributeValue": 1               // Fahrenheit
  }]
}</code></pre>

  <p>Write request example — set keypad Level 1 lockout:</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0204",
      "attributeId": "0x01"           // KeypadLockout
    },
    "attributeValue": 1               // LockoutLevel1
  }]
}</code></pre>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading ThermostatUserInterfaceConfiguration attributes on Endpoint 1 of a thermostat:</p>
  <pre><code>{
  // --- Display Configuration ---
  "0x00": 0,             // TemperatureDisplayMode = Celsius
  "0x01": 0,             // KeypadLockout = NoLockout
  "0x02": 0              // ScheduleProgrammingVisibility = ScheduleProgrammingPermitted (schedule visible)
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">Attribute Count</div>
    <p>
      This Cluster has no Feature Map controlling attribute visibility — all 3 attributes are always exposed.
      If reading an attribute returns <code>UNSUPPORTED_ATTRIBUTE</code>, it means the device has not implemented that optional attribute
      (ScheduleProgrammingVisibility is optional in the Matter specification).
    </p>
  </div>

  <!-- ====== Real-world Scenarios ====== -->
  <h2 id="scenarios">Real-world Scenarios</h2>

  <h3 id="scenario-hotel">Scenario 1: Hotel Room Thermostat — Lock Panel to Prevent Tampering</h3>
  <details class="scenario">
    <summary>Expand scenario</summary>
    <div class="scenario-content">
      <p>
        A hotel uses Matter thermostats to manage guest room HVAC. To prevent guests from freely modifying AC modes and schedules,
        the property management system configures each thermostat as follows:
      </p>
      <ol>
        <li>Write <code>KeypadLockout = 4</code> (LockoutLevel4) — guests can only view temperature, cannot adjust temperature or switch modes via the panel</li>
        <li>Write <code>ScheduleProgrammingVisibility = 1</code> (ScheduleProgrammingDenied) — hide schedule function</li>
        <li>Write <code>TemperatureDisplayMode = 0</code> (Celsius) — uniform Celsius display</li>
      </ol>
      <p>
        Guests can only see the current temperature on the panel. All temperature adjustments are done through the room App,
        which can limit the adjustment range (e.g., only allowing 20~26°C), preventing guests from setting extreme temperatures.
        During housekeeping, the property management system remotely sets all units to energy-saving temperatures.
      </p>
    </div>
  </details>

  <h3 id="scenario-region">Scenario 2: Export to Different Regions — Auto-configure Display Units During Commissioning</h3>
  <details class="scenario">
    <summary>Expand scenario</summary>
    <div class="scenario-content">
      <p>
        A Matter thermostat for the global market, factory-default displaying Celsius.
        After commissioning, the App automatically configures temperature display based on the user's phone locale:
      </p>
      <ol>
        <li>Read phone Locale: if it is <code>en_US</code> (United States) or <code>en_LR</code> (Liberia), etc., temperature preference is Fahrenheit</li>
        <li>Write <code>TemperatureDisplayMode = 1</code> (Fahrenheit) to Endpoint 1</li>
        <li>Also write <code>TemperatureUnit = 0</code> (Fahrenheit) to <a href="../unit-localization/">Unit Localization (0x002D)</a> on Endpoint 0, keeping device-wide display consistent</li>
        <li>The App interface also synchronizes to display temperature in °F</li>
      </ol>
      <p>
        This way, when users receive the device, both the panel and App show familiar temperature units without manual switching.
        If users want to change later, they select another unit in App settings, and the App updates both Cluster attributes simultaneously.
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
  'fan-control': {
    title: 'FanControl Cluster (0x0202)',
    description: 'Complete reference for Matter FanControl Cluster (0x0202) — FanMode/Step commands, percentage and multi-speed fan control, oscillation/wind modes/airflow direction, all attributes and enum value quick reference, and real device data examples.',
    prev: { title: 'Thermostat', slug: 'thermostat' },
    next: undefined,
    content: `<h1>FanControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0202</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (functional endpoint)
  </p>
  <p>
    FanControl is the core Cluster for controlling fan devices in Matter, applicable to HVAC system fans, ceiling fans, standalone fans, and more.
    It defines all capabilities including fan mode switching, speed control, oscillation, wind sensation modes, and airflow direction.
    Fan device development fundamentally revolves around this Cluster.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature-Driven Capability Differences</div>
    <p>
      FanControl capability varies widely — a simple HVAC fan may only support percentage speed control,
      while a high-end ceiling fan may support multi-speed, auto mode, oscillation, natural wind, and forward/reverse.
      Before development, read <code>FeatureMap (0xFFFC)</code> to confirm which Features the device supports, then decide the UI layout.
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
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>FanControl Cluster declares device capabilities through <code>FeatureMap</code> (0xFFFC). Features directly determine which attributes and commands are available:</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SPD（MultiSpeed）</span>
        <span class="enum-desc">Multi-speed — supports SpeedMax / SpeedSetting / SpeedCurrent speed level attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AUT（Auto）</span>
        <span class="enum-desc">Auto mode — FanMode can be set to Auto, device adjusts speed autonomously</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">RCK（Rocking）</span>
        <span class="enum-desc">Rocking — supports RockSupport / RockSetting, controls fan oscillation direction</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">WND（Wind）</span>
        <span class="enum-desc">Wind mode — supports WindSupport / WindSetting, provides sleep wind, natural wind, and other modes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">STEP（Step）</span>
        <span class="enum-desc">Step speed — supports Step command for incremental speed adjustment</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AIRDIR（AirDirection）</span>
        <span class="enum-desc">Air direction — supports AirflowDirection attribute, controls forward/reverse rotation</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      A basic HVAC fan: <code>FeatureMap = 0x00</code> (no extra Features, percentage speed only).<br/>
      A high-end ceiling fan: <code>FeatureMap = 0x3F</code> (all 6 Features), supports multi-speed, auto mode, oscillation, wind sensing, step, and forward/reverse.<br/>
      Standalone pedestal fan: <code>FeatureMap = 0x0F</code> (SPD + AUT + RCK + WND), has speed levels, auto, oscillation and wind sensing, but no step or reverse.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    FanControl Cluster has only one command — <code>Step</code>, for incremental speed adjustment.
    Most fan control is done through direct attribute writes (such as writing FanMode, PercentSetting, SpeedSetting, etc.).
    The Step command provides a convenient way to increase or decrease speed without needing to know the current state.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Feature Required</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Step</td>
          <td>Step speed (increase or decrease by one level)</td>
          <td class="col-feature">STEP</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Step — Incremental Speed Adjustment (0x00)</h3>
  <p>
    Send an incremental speed adjustment command to the fan, increasing or decreasing speed by one level.
    The specific increment is determined by the device (typically corresponding to one percentage point or one speed level).
    If the current speed is already at maximum or minimum, further adjustments in the same direction are ignored (no error).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Direction</td>
          <td>StepDirectionEnum</td>
          <td>Yes</td>
          <td>Step direction (see enum values below)</td>
        </tr>
        <tr>
          <td>Wrap</td>
          <td>bool</td>
          <td>No</td>
          <td>Whether to wrap around. <code>true</code> means Increase at maximum wraps to minimum (and vice versa)</td>
        </tr>
        <tr>
          <td>LowestOff</td>
          <td>bool</td>
          <td>No</td>
          <td>Whether the lowest level in wrap mode is Off. <code>true</code> means decreasing below minimum turns off the fan</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StepDirection Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Increase</span>
        <span class="enum-desc">Increase speed (up one level)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Decrease</span>
        <span class="enum-desc">Decrease speed (down one level)</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>
        Ideal for physical remote "Speed +" / "Speed -" buttons — each press sends a Step command without needing to read the current speed first.
        If <code>Wrap = true</code>, users can continuously press "Speed +" to cycle through levels (e.g.: Low → Medium → High → Off → Low ...).
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>FanControl Cluster attributes are organized into five functional groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Fan Mode -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>FanMode</td>
          <td>enum8</td>
          <td><a href="#group-mode">Fan Mode</a></td>
          <td>Current operating mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>FanModeSequence</td>
          <td>enum8</td>
          <td><a href="#group-mode">Fan Mode</a></td>
          <td>Supported mode sequence</td>
        </tr>
        <!-- Percentage Control -->
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>PercentSetting</td>
          <td>uint8 / null</td>
          <td><a href="#group-percent">Percentage Control</a></td>
          <td>Target speed percentage</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PercentCurrent</td>
          <td>uint8</td>
          <td><a href="#group-percent">Percentage Control</a></td>
          <td>Actual speed percentage</td>
        </tr>
        <!-- Multi-Speed Control -->
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>SpeedMax</td>
          <td>uint8</td>
          <td><a href="#group-speed">Multi-Speed Control</a></td>
          <td>Maximum speed levels</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>SpeedSetting</td>
          <td>uint8 / null</td>
          <td><a href="#group-speed">Multi-Speed Control</a></td>
          <td>Target speed level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>SpeedCurrent</td>
          <td>uint8</td>
          <td><a href="#group-speed">Multi-Speed Control</a></td>
          <td>Actual speed level</td>
        </tr>
        <!-- Oscillation -->
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>RockSupport</td>
          <td>bitmap8</td>
          <td><a href="#group-rock">Oscillation</a></td>
          <td>Supported oscillation directions</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>RockSetting</td>
          <td>bitmap8</td>
          <td><a href="#group-rock">Oscillation</a></td>
          <td>Current oscillation setting</td>
        </tr>
        <!-- Wind Mode -->
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>WindSupport</td>
          <td>bitmap8</td>
          <td><a href="#group-wind">Wind Mode</a></td>
          <td>Supported wind modes</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>WindSetting</td>
          <td>bitmap8</td>
          <td><a href="#group-wind">Wind Mode</a></td>
          <td>Current wind setting</td>
        </tr>
        <!-- Airflow Direction -->
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>AirflowDirection</td>
          <td>enum8</td>
          <td><a href="#group-airdir">Airflow Direction</a></td>
          <td>Airflow direction (forward/reverse)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Fan Mode (0x00, 0x01) ====== -->
  <h3 id="group-mode">Fan Mode (0x00, 0x01)</h3>
  <p>Controls the fan's operating mode and mode switching range. FanMode is the most essential control attribute — most App UI mode buttons correspond directly to it.</p>

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
          <td>FanMode<br/><span class="attr-cn">Fan Mode</span></td>
          <td>enum8</td>
          <td>Current fan operating mode. Write a new value to switch modes. In <code>Auto</code> and <code>Smart</code> modes, the device adjusts speed autonomously. See enum values below</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>FanModeSequence<br/><span class="attr-cn">Mode Sequence</span></td>
          <td>enum8</td>
          <td>Declares the supported mode combinations. Determines which values can be written to FanMode — if Auto is not in the sequence, Auto cannot be written. See enum values below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>FanMode Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">Off, fan stopped</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low speed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">Medium speed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">High speed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">On (specific speed determined by device, typically resumes last speed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Auto</span>
        <span class="enum-desc">Auto mode — device adjusts speed automatically based on environment. Requires AUT Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Smart</span>
        <span class="enum-desc">Smart mode — deprecated, equivalent to Auto. Retained for backward compatibility</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">FanMode Write Linkage with PercentSetting / SpeedSetting</div>
    <p>
      When writing <code>FanMode</code>, the device automatically updates <code>PercentSetting</code> and <code>SpeedSetting</code> (if SPD Feature is supported).
      For example, after writing <code>FanMode = High</code>, <code>PercentSetting</code> may automatically become <code>100</code>.
      Conversely, writing <code>PercentSetting</code> or <code>SpeedSetting</code> directly may also cause <code>FanMode</code> to change.
      When reading status, use <code>PercentCurrent</code> / <code>SpeedCurrent</code> as the source of truth, not the Setting values.
    </p>
  </div>

  <h4>FanModeSequence Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OffLowMedHigh</span>
        <span class="enum-desc">Off / Low / Medium / High</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OffLowHigh</span>
        <span class="enum-desc">Off / Low / High (no medium speed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">OffLowMedHighAuto</span>
        <span class="enum-desc">Off / Low / Medium / High / Auto</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OffLowHighAuto</span>
        <span class="enum-desc">Off / Low / High / Auto (no medium speed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OffHighAuto</span>
        <span class="enum-desc">Off / High / Auto (only two speeds + auto)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">OffHigh</span>
        <span class="enum-desc">Off / High (on/off only, no intermediate speeds)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Percentage Control (0x02, 0x03) ====== -->
  <h3 id="group-percent">Percentage Control (0x02, 0x03)</h3>
  <p>All fans support percentage control — this is the most universal speed control method, independent of any Feature.</p>

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
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>PercentSetting<br/><span class="attr-cn">Target Speed %</span></td>
          <td>uint8 / null</td>
          <td>Target speed percentage, range 0~100. Writing <code>0</code> is equivalent to <code>FanMode = Off</code>. Nullable — <code>null</code> indicates the device is in auto/smart mode, speed managed by the device</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>PercentCurrent<br/><span class="attr-cn">Actual Speed %</span></td>
          <td>uint8</td>
          <td>Actual current fan speed percentage, range 0~100. This is a read-only attribute reflecting the real physical state. UI display should use this value</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Setting vs. Current</div>
    <p>
      <code>PercentSetting</code> is the "target value" (what you want), <code>PercentCurrent</code> is the "actual value" (what the fan is actually doing).
      They may differ — for example, after writing <code>PercentSetting = 60</code>, due to motor characteristics or speed level quantization,
      the actual speed may be 58% or 65%. The App UI should use <code>PercentCurrent</code> for speed display.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Multi-Speed Control (0x04, 0x05, 0x06) ====== -->
  <h3 id="group-speed">Multi-Speed Control (0x04, 0x05, 0x06)</h3>
  <p>
    Requires <strong>SPD (MultiSpeed)</strong> Feature. Percentage is continuous, speed level is discrete —
    for fans with physical speed levels (like a 3-speed ceiling fan), SpeedSetting is more natural than percentage.
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
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>SpeedMax<br/><span class="attr-cn">Max Speed Level</span></td>
          <td>uint8</td>
          <td>Maximum speed levels supported by the device, range 1~100. Read-only. For example, <code>SpeedMax = 3</code> means the fan has 3 speed levels (1, 2, 3)</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>SpeedSetting<br/><span class="attr-cn">Target Speed Level</span></td>
          <td>uint8 / null</td>
          <td>Target speed level, range 0~SpeedMax. Writing <code>0</code> is equivalent to off. Nullable — <code>null</code> means the device decides in auto mode. <strong>Requires SPD Feature</strong></td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>SpeedCurrent<br/><span class="attr-cn">Actual Speed Level</span></td>
          <td>uint8</td>
          <td>Actual current speed level, range 0~SpeedMax. Read-only. <strong>Requires SPD Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Automatic Conversion Between Percentage and Speed Level</div>
    <p>
      The device automatically converts between percentage and speed level internally. For example, a fan with <code>SpeedMax = 4</code>:
      after writing <code>SpeedSetting = 2</code>, <code>PercentCurrent</code> is approximately 50%;
      after writing <code>PercentSetting = 75</code>, <code>SpeedCurrent</code> is approximately 3.
      The exact conversion logic is determined by device firmware and may not be a precise linear mapping.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Oscillation (0x07, 0x08) ====== -->
  <h3 id="group-rock">Oscillation (0x07, 0x08)</h3>
  <p>
    Requires <strong>RCK (Rocking)</strong> Feature. Controls the fan's physical oscillation direction — common in standalone fans and some ceiling fans.
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
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>RockSupport<br/><span class="attr-cn">Oscillation Support</span></td>
          <td>bitmap8</td>
          <td>Oscillation directions supported by the device (read-only). See bitmap below</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>RockSetting<br/><span class="attr-cn">Oscillation Setting</span></td>
          <td>bitmap8</td>
          <td>Currently enabled oscillation directions. Read/write, written value must be a subset of RockSupport. All zeros means stop oscillation</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Rock Bitmap Definition</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RockLeftRight</span>
        <span class="enum-desc">Left-right oscillation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">RockUpDown</span>
        <span class="enum-desc">Up-down oscillation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">RockRound</span>
        <span class="enum-desc">Round oscillation (360° rotation)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Oscillation Combinations</div>
    <p>
      RockSetting is a bitmap that can enable multiple directions simultaneously. For example, <code>RockSetting = 0x03</code> (Bit 0 + Bit 1) means simultaneous left-right + up-down oscillation.
      However, the corresponding bits in <code>RockSupport</code> must also be 1 — writing unsupported directions will be rejected by the device.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Wind Mode (0x09, 0x0A) ====== -->
  <h3 id="group-wind">Wind Mode (0x09, 0x0A)</h3>
  <p>
    Requires <strong>WND (Wind)</strong> Feature. Provides non-uniform airflow modes like natural wind and sleep wind for improved comfort.
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
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>WindSupport<br/><span class="attr-cn">Wind Support</span></td>
          <td>bitmap8</td>
          <td>Wind modes supported by the device (read-only). See bitmap below</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>WindSetting<br/><span class="attr-cn">Wind Setting</span></td>
          <td>bitmap8</td>
          <td>Currently enabled wind mode. Read/write, written value must be a subset of WindSupport. All zeros means constant-speed airflow</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Wind Bitmap Definition</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SleepWind</span>
        <span class="enum-desc">Sleep wind — speed gradually decreases over time, suitable for falling asleep</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">NaturalWind</span>
        <span class="enum-desc">Natural wind — speed fluctuates randomly, simulating outdoor breeze</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Wind Modes Are Mutually Exclusive</div>
    <p>
      Although WindSetting is in bitmap format, <strong>SleepWind and NaturalWind are typically mutually exclusive</strong> — both should not be enabled simultaneously.
      The specification does not explicitly prohibit simultaneous setting, but actual device behavior is undefined. It is recommended to design the App UI as radio buttons.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Airflow Direction (0x0B) ====== -->
  <h3 id="group-airdir">Airflow Direction (0x0B)</h3>
  <p>
    Requires <strong>AIRDIR (AirDirection)</strong> Feature. Controls the fan blade rotation direction — primarily used for ceiling fan summer/winter mode switching.
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
        <tr id="attr-0x0B">
          <td><code>0x0B</code></td>
          <td>AirflowDirection<br/><span class="attr-cn">Airflow Direction</span></td>
          <td>enum8</td>
          <td>Fan blade rotation direction. For ceiling fans, forward blows air downward (summer), reverse circulates air upward (winter). See enum values below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AirflowDirection Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Forward</span>
        <span class="enum-desc">Forward — blows air downward (ceiling fan summer mode)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Reverse</span>
        <span class="enum-desc">Reverse — blows air upward, uses ceiling reflection to promote air circulation (ceiling fan winter mode)</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>Practical Uses of Ceiling Fan Forward/Reverse</summary>
    <div class="scenario-content">
      <p>
        <strong>Summer (Forward)</strong>: Blades rotate counterclockwise, creating a downward airflow; people standing beneath feel a cool breeze.<br/>
        <strong>Winter (Reverse)</strong>: Blades rotate clockwise, pushing warm air along the ceiling downward.
        People do not feel a direct draft, but room temperature is more even and heating efficiency improves.<br/>
        Many users are unaware of this feature — the App can proactively suggest switching direction when seasons change.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>FanControl Cluster read results from a smart ceiling fan supporting all Features while running:</p>

  <pre><code>{
  // --- Fan Mode ---
  "0x00": 5,              // FanMode = Auto
  "0x01": 2,              // FanModeSequence = OffLowMedHighAuto

  // --- Percentage Control ---
  "0x02": 60,             // PercentSetting = 60 (target speed 60%)
  "0x03": 58,             // PercentCurrent = 58 (actual speed 58%)

  // --- Multi-Speed Control (SPD Feature) ---
  "0x04": 10,             // SpeedMax = 10 (max 10 levels)
  "0x05": 6,              // SpeedSetting = 6 (target level 6)
  "0x06": 6,              // SpeedCurrent = 6 (actual level 6)

  // --- Oscillation (RCK Feature) ---
  "0x07": 0x03,           // RockSupport = 0x03 (supports left-right + up-down)
  "0x08": 0x01,           // RockSetting = 0x01 (currently left-right oscillation)

  // --- Wind Mode (WND Feature) ---
  "0x09": 0x03,           // WindSupport = 0x03 (supports sleep wind + natural wind)
  "0x0A": 0x02,           // WindSetting = 0x02 (currently natural wind)

  // --- Airflow Direction (AIRDIR Feature) ---
  "0x0B": 0               // AirflowDirection = Forward
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The simplest fan may only have FanMode (0x00), FanModeSequence (0x01), PercentSetting (0x02), and PercentCurrent (0x03) — four attributes.
      All other attributes depend on Features. Check <code>FeatureMap (0xFFFC)</code> before reading;
      reading an unsupported attribute returns <code>UNSUPPORTED_ATTRIBUTE</code>.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-basic">Scenario 1: Basic Fan Control</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FanModeSequence (0x01)</code> to determine which modes the device supports</li>
        <li>Write <code>FanMode (0x00)</code> to switch modes (Off / Low / Medium / High)</li>
        <li>Or write <code>PercentSetting (0x02)</code> to directly set percentage speed</li>
        <li>Subscribe to <code>PercentCurrent (0x03)</code> for real-time speed display sync in the App UI</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-speed">Scenario 2: Multi-Speed Fan Interface</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Confirm <code>FeatureMap</code> includes SPD (Bit 0), read <code>SpeedMax (0x04)</code> to get maximum speed levels</li>
        <li>Dynamically generate speed level buttons based on SpeedMax (e.g., SpeedMax = 5 shows buttons 1~5)</li>
        <li>Write <code>SpeedSetting (0x05)</code> to switch speed levels</li>
        <li>Subscribe to <code>SpeedCurrent (0x06)</code> to update the current speed level highlight in the UI</li>
        <li>If STEP Feature is also supported, use the <code>Step</code> command with remote +/- buttons</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-ceiling">Scenario 3: Complete Ceiling Fan Control Panel</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap</code> to show/hide corresponding UI modules based on supported Features</li>
        <li>Speed area: show speed level slider if SPD is available, otherwise show percentage slider</li>
        <li>Oscillation area (RCK): read <code>RockSupport (0x07)</code>, only show supported direction options. Write <code>RockSetting (0x08)</code> to control oscillation</li>
        <li>Wind area (WND): read <code>WindSupport (0x09)</code>, show supported modes (sleep wind/natural wind). Write <code>WindSetting (0x0A)</code> to switch wind mode</li>
        <li>Direction area (AIRDIR): show forward/reverse toggle button, write <code>AirflowDirection (0x0B)</code></li>
        <li>Tip: Before switching airflow direction, it is recommended to stop the fan first (<code>FanMode = Off</code>), then restart after the direction switch is complete</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-hvac">Scenario 4: HVAC System Integration</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>FanControl is typically used alongside Thermostat Cluster (0x0201) on the same Endpoint</li>
        <li>When the Thermostat's <code>SystemMode</code> switches to <code>FanOnly</code>, the corresponding FanControl begins operating</li>
        <li>If the fan supports AUT Feature, set <code>FanMode = Auto</code> to let the fan automatically adjust speed based on thermostat demand</li>
        <li>Read the FanState bit in the Thermostat's <code>ThermostatRunningState (0x29)</code> to confirm whether the fan is running</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-feature {
    color: #60a5fa;
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
  'pump-configuration-and-control': {
    title: 'PumpConfigurationAndControl Cluster (0x0200)',
    description: 'Complete reference for Matter PumpConfigurationAndControl Cluster (0x0200) — Pump operation modes, control modes, speed/flow/pressure control ranges, PumpStatus bitmap, fault event monitoring, and all attributes and enum value quick reference.',
    prev: undefined,
    next: undefined,
    content: `<h1>PumpConfigurationAndControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0200</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Pump Endpoint</code> (pump functional endpoint)
  </p>
  <p>
    PumpConfigurationAndControl is the core Cluster for controlling pump devices in Matter,
    applicable to HVAC circulation pumps, domestic water supply pumps, industrial pumps, and more.
    It defines all capabilities including pump operation modes, control modes, speed/flow/pressure ranges, operating status monitoring, and fault event reporting.
    Pump device configuration and maintenance revolves around this Cluster.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature-Driven Control Modes</div>
    <p>
      PumpConfigurationAndControl capabilities vary widely — a simple fixed-speed pump may only support constant speed mode,
      while a variable-frequency pump may support constant pressure, compensated pressure, constant flow, constant temperature, and automatic modes simultaneously.
      Each control mode is enabled by its corresponding Feature, which also determines available range attributes.
      Before development, read <code>FeatureMap (0xFFFC)</code> to confirm which control modes the device supports, then decide the UI layout.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#pump-status">PumpStatus Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>PumpConfigurationAndControl Cluster declares device control capabilities through <code>FeatureMap</code> (0xFFFC). Features directly determine available attribute ranges and ControlMode options:</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PRSCONST（ConstantPressure）</span>
        <span class="enum-desc">Constant pressure — supports MinConstPressure / MaxConstPressure, ControlMode can be ConstantPressure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">PRSCOMP（CompensatedPressure）</span>
        <span class="enum-desc">Compensated pressure — supports MinCompPressure / MaxCompPressure, ControlMode can be ProportionalPressure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SPD（ConstantSpeed）</span>
        <span class="enum-desc">Constant speed — supports MinConstSpeed / MaxConstSpeed, ControlMode can be ConstantSpeed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">FLW（ConstantFlow）</span>
        <span class="enum-desc">Constant flow — supports MinConstFlow / MaxConstFlow, ControlMode can be ConstantFlow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TEMP（ConstantTemperature）</span>
        <span class="enum-desc">Constant temperature — supports MinConstTemp / MaxConstTemp, ControlMode can be ConstantTemperature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AUTO（Automatic）</span>
        <span class="enum-desc">Automatic mode — ControlMode can be Automatic, pump adjusts autonomously based on system demand</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">LOCAL（LocalOperation）</span>
        <span class="enum-desc">Local operation — OperationMode can be Local, allows pump panel local control</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      A simple fixed-speed circulation pump: <code>FeatureMap = 0x04</code> (SPD only), can only run at constant speed.<br/>
      A variable-frequency water supply pump: <code>FeatureMap = 0x23</code> (PRSCONST + PRSCOMP + AUTO), supports constant pressure, compensated pressure, and automatic mode.<br/>
      A fully-featured industrial pump: <code>FeatureMap = 0x7F</code> (all 7 Features), supports all control modes and local operation.
    </p>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>PumpConfigurationAndControl Cluster attributes are organized into five functional groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Device Capacity Limits -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>MaxPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum pressure (1/10 kPa)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>MaxSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum speed (RPM)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-capacity">Capacity Limits</a></td>
          <td>Maximum flow (1/10 m&sup3;/h)</td>
        </tr>
        <!-- Control Range Parameters -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>MinConstPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant pressure mode minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>MaxConstPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant pressure mode maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>MinCompPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Compensated pressure mode minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>MaxCompPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Compensated pressure mode maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>MinConstSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant speed mode minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>MaxConstSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant speed mode maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MinConstFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant flow mode minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>MaxConstFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant flow mode maximum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>MinConstTemp</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant temperature mode minimum</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>MaxConstTemp</td>
          <td>int16 / null</td>
          <td><a href="#group-range">Control Range</a></td>
          <td>Constant temperature mode maximum</td>
        </tr>
        <!-- Operating Status -->
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>PumpStatus</td>
          <td>bitmap16</td>
          <td><a href="#group-status">Operating Status</a></td>
          <td>Pump status bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>EffectiveOperationMode</td>
          <td>OperationModeEnum</td>
          <td><a href="#group-status">Operating Status</a></td>
          <td>Effective operation mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>EffectiveControlMode</td>
          <td>ControlModeEnum</td>
          <td><a href="#group-status">Operating Status</a></td>
          <td>Effective control mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0013">
          <td><a href="#attr-0x0013"><code>0x0013</code></a></td>
          <td>Capacity</td>
          <td>int16 / null</td>
          <td><a href="#group-status">Operating Status</a></td>
          <td>Current operating point capacity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0014">
          <td><a href="#attr-0x0014"><code>0x0014</code></a></td>
          <td>Speed</td>
          <td>uint16 / null</td>
          <td><a href="#group-status">Operating Status</a></td>
          <td>Current speed (RPM)</td>
        </tr>
        <!-- Cumulative Statistics -->
        <tr class="clickable-row" data-href="#attr-0x0015">
          <td><a href="#attr-0x0015"><code>0x0015</code></a></td>
          <td>LifetimeRunningHours</td>
          <td>uint24 / null</td>
          <td><a href="#group-stats">Cumulative Stats</a></td>
          <td>Lifetime running hours</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0016">
          <td><a href="#attr-0x0016"><code>0x0016</code></a></td>
          <td>Power</td>
          <td>uint24 / null</td>
          <td><a href="#group-stats">Cumulative Stats</a></td>
          <td>Current power (W)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0017">
          <td><a href="#attr-0x0017"><code>0x0017</code></a></td>
          <td>LifetimeEnergyConsumed</td>
          <td>uint32 / null</td>
          <td><a href="#group-stats">Cumulative Stats</a></td>
          <td>Lifetime energy consumed (Wh)</td>
        </tr>
        <!-- Control Parameters -->
        <tr class="clickable-row" data-href="#attr-0x0020">
          <td><a href="#attr-0x0020"><code>0x0020</code></a></td>
          <td>OperationMode</td>
          <td>OperationModeEnum</td>
          <td><a href="#group-control">Control Parameters</a></td>
          <td>Operation mode (writable)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0021">
          <td><a href="#attr-0x0021"><code>0x0021</code></a></td>
          <td>ControlMode</td>
          <td>ControlModeEnum</td>
          <td><a href="#group-control">Control Parameters</a></td>
          <td>Control mode (writable)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">No Commands</div>
    <p>
      PumpConfigurationAndControl Cluster does not define any commands.
      All control operations are done through attribute writes — write <code>OperationMode (0x0020)</code> to switch operation mode,
      write <code>ControlMode (0x0021)</code> to switch control mode. This is consistent with most HVAC Cluster designs.
    </p>
  </div>

  <!-- ====== Device Capacity Limits (0x0000 ~ 0x0002) ====== -->
  <h3 id="group-capacity">Device Capacity Limits (0x0000 ~ 0x0002)</h3>
  <p>Describes the physical limit parameters of pump hardware. These three attributes are read-only, set by device firmware at the factory, representing the maximum performance the pump can achieve.</p>

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
          <td>MaxPressure<br/><span class="attr-cn">Max Pressure</span></td>
          <td>int16 / null</td>
          <td>Maximum pressure the pump can output, in 1/10 kPa. For example, <code>3200</code> = 320.0 kPa. Nullable — <code>null</code> indicates the device did not provide this parameter</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>MaxSpeed<br/><span class="attr-cn">Max Speed</span></td>
          <td>uint16 / null</td>
          <td>Maximum motor speed, in RPM. For example, <code>2900</code> = 2900 RPM. Nullable</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MaxFlow<br/><span class="attr-cn">Max Flow</span></td>
          <td>uint16 / null</td>
          <td>Maximum flow the pump can output, in 1/10 m&sup3;/h. For example, <code>500</code> = 50.0 m&sup3;/h. Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Pressure and Flow Unit Precision</div>
    <p>
      The units for <code>MaxPressure</code> and <code>MaxFlow</code> are <strong>1/10 kPa</strong> and <strong>1/10 m&sup3;/h</strong> respectively,
      not integer kPa and m&sup3;/h. For example, a value of <code>3200</code> means 320.0 kPa, and <code>500</code> means 50.0 m&sup3;/h.
      Remember to divide by 10 when displaying. Temperature attributes (MinConstTemp / MaxConstTemp) also use 1/10 &deg;C precision.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Control Range (0x0003 ~ 0x000C) ====== -->
  <h3 id="group-range">Control Range (0x0003 ~ 0x000C)</h3>
  <p>
    Defines the valid range of setpoints for each control mode. Each control mode corresponds to a Min/Max attribute pair,
    which only exists when the device supports the corresponding Feature. Apps should use these values as bounds when rendering sliders or input fields.
  </p>

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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>MinConstPressure<br/><span class="attr-cn">Const Pressure Min</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCONST</td>
          <td>Minimum settable pressure in constant pressure mode, in 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>MaxConstPressure<br/><span class="attr-cn">Const Pressure Max</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCONST</td>
          <td>Maximum settable pressure in constant pressure mode, in 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MinCompPressure<br/><span class="attr-cn">Comp Pressure Min</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCOMP</td>
          <td>Minimum settable pressure in compensated pressure mode, in 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>MaxCompPressure<br/><span class="attr-cn">Comp Pressure Max</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCOMP</td>
          <td>Maximum settable pressure in compensated pressure mode, in 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>MinConstSpeed<br/><span class="attr-cn">Const Speed Min</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">SPD</td>
          <td>Minimum settable speed in constant speed mode, in RPM</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>MaxConstSpeed<br/><span class="attr-cn">Const Speed Max</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">SPD</td>
          <td>Maximum settable speed in constant speed mode, in RPM</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>MinConstFlow<br/><span class="attr-cn">Const Flow Min</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">FLW</td>
          <td>Minimum settable flow in constant flow mode, in 1/10 m&sup3;/h</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>MaxConstFlow<br/><span class="attr-cn">Const Flow Max</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">FLW</td>
          <td>Maximum settable flow in constant flow mode, in 1/10 m&sup3;/h</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>MinConstTemp<br/><span class="attr-cn">Const Temp Min</span></td>
          <td>int16 / null</td>
          <td class="col-feature">TEMP</td>
          <td>Minimum settable temperature in constant temperature mode, in 1/10 °C</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>MaxConstTemp<br/><span class="attr-cn">Const Temp Max</span></td>
          <td>int16 / null</td>
          <td class="col-feature">TEMP</td>
          <td>Maximum settable temperature in constant temperature mode, in 1/10 °C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Constant Pressure vs. Compensated Pressure</div>
    <p>
      <strong>Constant Pressure (ConstantPressure)</strong>: The pump maintains a fixed outlet pressure regardless of flow changes. Suitable for water supply systems to ensure stable pressure at all outlets.<br/>
      <strong>Compensated Pressure (ProportionalPressure / CompensatedPressure)</strong>: The pump automatically adjusts pressure based on flow — lower pressure at low flow, higher at high flow.
      Suitable for large piping networks, saving energy at low loads.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Operating Status (0x0010 ~ 0x0014) ====== -->
  <h3 id="group-status">Operating Status (0x0010 ~ 0x0014)</h3>
  <p>Reflects the pump's current real-time operating status. These attributes are all read-only, automatically maintained by the device.</p>

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
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>PumpStatus<br/><span class="attr-cn">Pump Status Bitmap</span></td>
          <td>bitmap16</td>
          <td>Bitmap flags for the pump's current status, including running/fault/remote control information. See the <a href="#pump-status">PumpStatus Bitmap</a> section below. Optional attribute</td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>EffectiveOperationMode<br/><span class="attr-cn">Effective Operation Mode</span></td>
          <td>OperationModeEnum</td>
          <td>The pump's actual effective operation mode. May differ from the written <code>OperationMode</code> — for example, when the device is under local panel control, even if Normal is written remotely, the actual mode remains Local</td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>EffectiveControlMode<br/><span class="attr-cn">Effective Control Mode</span></td>
          <td>ControlModeEnum</td>
          <td>The pump's actual effective control mode. When <code>OperationMode</code> is Minimum or Maximum, the device overrides the ControlMode setting</td>
        </tr>
        <tr id="attr-0x0013">
          <td><code>0x0013</code></td>
          <td>Capacity<br/><span class="attr-cn">Current Capacity</span></td>
          <td>int16 / null</td>
          <td>Current operating point capacity of the pump; unit and meaning depend on the current control mode (pressure / speed / flow / temperature). Nullable</td>
        </tr>
        <tr id="attr-0x0014">
          <td><code>0x0014</code></td>
          <td>Speed<br/><span class="attr-cn">Current Speed</span></td>
          <td>uint16 / null</td>
          <td>Actual current motor speed, in RPM. Nullable. Optional attribute</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Effective vs. Written Values</div>
    <p>
      <code>EffectiveOperationMode</code> and <code>EffectiveControlMode</code> are read-only "actual effective values",
      while <code>OperationMode</code> and <code>ControlMode</code> are writable "desired values".
      They may differ — for example, after writing <code>OperationMode = Normal</code>,
      if the pump panel switches to local control, <code>EffectiveOperationMode</code> becomes <code>Local</code>.
      The App UI should display current status based on Effective values.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Cumulative Statistics (0x0015 ~ 0x0017) ====== -->
  <h3 id="group-stats">Cumulative Statistics (0x0015 ~ 0x0017)</h3>
  <p>Records pump running time and energy consumption data, used for maintenance and energy efficiency analysis.</p>

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
        <tr id="attr-0x0015">
          <td><code>0x0015</code></td>
          <td>LifetimeRunningHours<br/><span class="attr-cn">Lifetime Running Hours</span></td>
          <td>uint24 / null</td>
          <td>Cumulative running hours since factory. Read/write (supports reset). Default value <code>0</code>. Nullable. Optional attribute</td>
        </tr>
        <tr id="attr-0x0016">
          <td><code>0x0016</code></td>
          <td>Power<br/><span class="attr-cn">Current Power</span></td>
          <td>uint24 / null</td>
          <td>Current electrical power consumed by the pump, in W. For example, <code>1500</code> = 1.5 kW. Nullable. Optional attribute</td>
        </tr>
        <tr id="attr-0x0017">
          <td><code>0x0017</code></td>
          <td>LifetimeEnergyConsumed<br/><span class="attr-cn">Lifetime Energy Consumed</span></td>
          <td>uint32 / null</td>
          <td>Cumulative energy consumed since factory, in Wh. Read/write (supports reset). Default value <code>0</code>. Nullable. Optional attribute</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Maintenance Tip</div>
    <p>
      <code>LifetimeRunningHours</code> is critical for pump maintenance — most pump maintenance cycles are based on running hours (e.g., replace seals every 8000 hours).
      The App can implement a "maintenance due reminder" feature based on this attribute.
      <code>LifetimeEnergyConsumed</code> is in Wh (watt-hours); typically convert to kWh (divide by 1000) for UI display.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Control Parameters (0x0020 ~ 0x0021) ====== -->
  <h3 id="group-control">Control Parameters (0x0020 ~ 0x0021)</h3>
  <p>
    Core control attributes for the pump — control the pump's operating behavior by writing these two attributes.
    These are the only writable application attributes in PumpConfigurationAndControl.
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
        <tr id="attr-0x0020">
          <td><code>0x0020</code></td>
          <td>OperationMode<br/><span class="attr-cn">Operation Mode</span></td>
          <td>OperationModeEnum</td>
          <td>Pump operation mode. Read/write, default <code>Normal (0)</code>. Determines how the pump operates. See enum values below</td>
        </tr>
        <tr id="attr-0x0021">
          <td><code>0x0021</code></td>
          <td>ControlMode<br/><span class="attr-cn">Control Mode</span></td>
          <td>ControlModeEnum</td>
          <td>Pump control mode. Read/write, default <code>ConstantSpeed (0)</code>. Determines the physical quantity used as the control target. Optional attribute. See enum values below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>OperationMode Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal operation — adjusts according to ControlMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Minimum</span>
        <span class="enum-desc">Minimum speed operation — pump runs at lowest allowed speed, ignores ControlMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Maximum</span>
        <span class="enum-desc">Maximum speed operation — pump runs at maximum speed, ignores ControlMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Local</span>
        <span class="enum-desc">Local control — operated by pump panel locally, remote settings ignored. Requires LOCAL Feature</span>
      </div>
    </div>
  </div>

  <h4>ControlMode Enum Values</h4>
  <p>ControlMode determines the physical quantity used as the pump's regulation target. Only effective when <code>OperationMode = Normal</code>.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">ConstantSpeed</span>
        <span class="enum-desc">Constant speed — maintains fixed speed. Requires SPD Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ConstantPressure</span>
        <span class="enum-desc">Constant pressure — maintains fixed outlet pressure, automatically adjusts speed. Requires PRSCONST Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ProportionalPressure</span>
        <span class="enum-desc">Compensated pressure — pressure adjusts proportionally with flow, energy saving at low loads. Requires PRSCOMP Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ConstantFlow</span>
        <span class="enum-desc">Constant flow — maintains fixed flow, automatically adjusts speed and pressure. Requires FLW Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ConstantTemperature</span>
        <span class="enum-desc">Constant temperature — adjusts flow based on return water temperature, suitable for heating circulation. Requires TEMP Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Automatic</span>
        <span class="enum-desc">Automatic mode — pump selects optimal control method autonomously. Requires AUTO Feature</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Non-Consecutive Enum Values</div>
    <p>
      Note that ControlMode enum values are not consecutive — there are no values 4 and 6.
      <code>ConstantTemperature</code> is 5, <code>Automatic</code> is 7.
      You cannot use array indices for direct mapping when parsing; use explicit matching.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== PumpStatus Bitmap ====== -->
  <h2 id="pump-status">PumpStatus Bitmap</h2>
  <p>
    <code>PumpStatus (0x0010)</code> is a 16-bit bitmap where each bit represents a pump status flag.
    Multiple bits can be set simultaneously — for example, when the pump is running and under local control, both Running and LocalOverride are set.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DeviceFault</span>
        <span class="enum-desc">Device fault — pump hardware failure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">SupplyFault</span>
        <span class="enum-desc">Supply fault — power supply abnormality (missing phase, voltage abnormal, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SpeedLow</span>
        <span class="enum-desc">Speed low — actual speed below setpoint</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">SpeedHigh</span>
        <span class="enum-desc">Speed high — actual speed above setpoint</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">LocalOverride</span>
        <span class="enum-desc">Local override — pump panel is controlling locally, remote settings ignored</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">Running — pump motor is rotating</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">RemotePressure</span>
        <span class="enum-desc">Remote pressure sensor — pressure provided by external sensor (not built-in)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">RemoteFlow</span>
        <span class="enum-desc">Remote flow sensor — flow provided by external sensor</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 8</span>
      <div>
        <span class="enum-name">RemoteTemperature</span>
        <span class="enum-desc">Remote temperature sensor — temperature provided by external sensor</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Status Bitmap Read Example</div>
    <p>
      <code>PumpStatus = 0x0020</code> (decimal 32) = Bit 5 set = pump is running (Running), all other statuses normal.<br/>
      <code>PumpStatus = 0x0023</code> (decimal 35) = Bit 0 + Bit 1 + Bit 5 = pump running with device fault and supply fault — immediate alarm required.
    </p>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    PumpConfigurationAndControl defines 17 events, all used for fault and anomaly reporting.
    This is one of the Clusters with the most events in Matter — pumps, as critical infrastructure, require fine-grained fault classification.
    All events have no data fields; the event itself represents the occurrence of the corresponding condition.
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
          <td>SupplyVoltageLow</td>
          <td class="col-event-warning">WARNING</td>
          <td>Supply voltage low</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>SupplyVoltageHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>Supply voltage high</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>PowerMissingPhase</td>
          <td class="col-event-warning">WARNING</td>
          <td>Three-phase power missing phase</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>SystemPressureLow</td>
          <td class="col-event-warning">WARNING</td>
          <td>System pressure low</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>SystemPressureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>System pressure high</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>DryRunning</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>Dry running (pump running without water, may burn out)</td>
        </tr>
        <tr>
          <td><code>0x06</code></td>
          <td>MotorTemperatureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>Motor temperature high</td>
        </tr>
        <tr>
          <td><code>0x07</code></td>
          <td>PumpMotorFatalFailure</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>Motor fatal failure (immediate shutdown required)</td>
        </tr>
        <tr>
          <td><code>0x08</code></td>
          <td>ElectronicTemperatureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>Control board temperature high</td>
        </tr>
        <tr>
          <td><code>0x09</code></td>
          <td>PumpBlocked</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>Pump blocked (impeller jammed)</td>
        </tr>
        <tr>
          <td><code>0x0A</code></td>
          <td>SensorFailure</td>
          <td class="col-event-warning">WARNING</td>
          <td>Sensor failure</td>
        </tr>
        <tr>
          <td><code>0x0B</code></td>
          <td>ElectronicNonFatalFailure</td>
          <td class="col-event-warning">WARNING</td>
          <td>Control board non-fatal failure</td>
        </tr>
        <tr>
          <td><code>0x0C</code></td>
          <td>ElectronicFatalFailure</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>Control board fatal failure</td>
        </tr>
        <tr>
          <td><code>0x0D</code></td>
          <td>GeneralFault</td>
          <td class="col-event-info">INFO</td>
          <td>General fault (unclassified general issue)</td>
        </tr>
        <tr>
          <td><code>0x0E</code></td>
          <td>Leakage</td>
          <td class="col-event-warning">WARNING</td>
          <td>Leakage — pump or piping water leak detected</td>
        </tr>
        <tr>
          <td><code>0x0F</code></td>
          <td>AirDetection</td>
          <td class="col-event-warning">WARNING</td>
          <td>Air detection — air detected in piping</td>
        </tr>
        <tr>
          <td><code>0x10</code></td>
          <td>TurbineFlow</td>
          <td class="col-event-warning">WARNING</td>
          <td>Turbine flow anomaly — turbine flow meter detected abnormal flow</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CRITICAL Events Require Immediate Response</div>
    <p>
      Events marked as <strong>CRITICAL</strong> (DryRunning, PumpMotorFatalFailure, PumpBlocked, ElectronicFatalFailure)
      indicate the pump may be suffering irreversible damage. The App should immediately show a full-screen alert when receiving these events,
      recommending the user to shut down and inspect. Dry running (DryRunning) is especially dangerous — a pump running without water for a few minutes can destroy the mechanical seal.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>PumpConfigurationAndControl Cluster read results from a variable-frequency pump with constant pressure control during normal operation:</p>

  <pre><code>{
  // --- Device Capacity Limits ---
  "0x0000": 3200,           // MaxPressure = 320.0 kPa
  "0x0001": 2900,           // MaxSpeed = 2900 RPM
  "0x0002": 500,            // MaxFlow = 50.0 m³/h

  // --- Control Range (Constant Pressure Feature) ---
  "0x0003": 500,            // MinConstPressure = 50.0 kPa
  "0x0004": 3000,           // MaxConstPressure = 300.0 kPa

  // --- Operating Status ---
  "0x0010": 32,             // PumpStatus = 0x0020 (Running bit set)
  "0x0011": 0,              // EffectiveOperationMode = Normal
  "0x0012": 1,              // EffectiveControlMode = ConstantPressure
  "0x0013": 2350,           // Capacity = 2350 (current operating point)
  "0x0014": 2450,           // Speed = 2450 RPM

  // --- Cumulative Statistics ---
  "0x0015": 8760,           // LifetimeRunningHours = 8760 hours (~1 year)
  "0x0016": 1500,           // Power = 1500 W
  "0x0017": 13140000,       // LifetimeEnergyConsumed = 13140 kWh

  // --- Control Parameters ---
  "0x0020": 0,              // OperationMode = Normal
  "0x0021": 1               // ControlMode = ConstantPressure
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The simplest fixed-speed pump may only have MaxPressure, MaxSpeed, MaxFlow, EffectiveOperationMode, EffectiveControlMode, and OperationMode as core attributes.
      Control range attributes (0x0003~0x000C) and ControlMode all depend on Features.
      Check <code>FeatureMap (0xFFFC)</code> before reading; reading an unsupported attribute returns <code>UNSUPPORTED_ATTRIBUTE</code>.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-pressure">Scenario 1: HVAC Constant Pressure Water Supply</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports PRSCONST (Bit 0)</li>
        <li>Read <code>MinConstPressure (0x0003)</code> and <code>MaxConstPressure (0x0004)</code> to get the pressure setpoint range</li>
        <li>Write <code>ControlMode (0x0021) = 1</code> (ConstantPressure) to switch the pump to constant pressure mode</li>
        <li>Write <code>OperationMode (0x0020) = 0</code> (Normal) to ensure the pump runs according to ControlMode</li>
        <li>Subscribe to <code>EffectiveControlMode (0x0012)</code> to confirm the mode has taken effect</li>
        <li>Subscribe to <code>Capacity (0x0013)</code> and <code>Speed (0x0014)</code> for real-time operating status monitoring</li>
        <li>Subscribe to <code>PumpStatus (0x0010)</code> to monitor fault flags, focusing on DeviceFault and SupplyFault bits</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-monitor">Scenario 2: Pump Fault Monitoring and Alerting</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to all events — events are the primary channel for pump fault reporting, more timely than polling PumpStatus</li>
        <li>Process events by priority level:
          <ul>
            <li><strong>CRITICAL</strong> (DryRunning / PumpMotorFatalFailure / PumpBlocked / ElectronicFatalFailure) — full-screen alert + push notification + recommend immediate shutdown</li>
            <li><strong>WARNING</strong> (SupplyVoltageLow / SystemPressureHigh / Leakage, etc.) — top banner alert + log entry</li>
            <li><strong>INFO</strong> (GeneralFault) — log entry only</li>
          </ul>
        </li>
        <li>Periodically read <code>PumpStatus (0x0010)</code> bitmap to check for persistent faults (e.g., DeviceFault continuously set)</li>
        <li>Read <code>LifetimeRunningHours (0x0015)</code> and remind users to schedule maintenance when approaching the maintenance cycle (e.g., 8000 hours)</li>
        <li>Read <code>Power (0x0016)</code> and <code>LifetimeEnergyConsumed (0x0017)</code> to calculate energy efficiency trends — abnormal power increase under the same load may indicate mechanical wear</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-feature {
    color: #60a5fa;
  }

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .dark .attr-cn {
    color: #9ca3af;
  }

  .col-event-critical {
    color: #dc2626;
    font-weight: 600;
    font-size: 0.8125rem;
  }

  .dark .col-event-critical {
    color: #f87171;
  }

  .col-event-warning {
    color: #d97706;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-event-warning {
    color: #fbbf24;
  }

  .col-event-info {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-event-info {
    color: #60a5fa;
  }
</style>`,
  },
};
