import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'electrical-power-measurement': {
    title: 'ElectricalPowerMeasurement Cluster (0x0090)',
    description: 'Complete reference for the Matter ElectricalPowerMeasurement Cluster (0x0090) — voltage, current, active/reactive/apparent power, RMS measurements, frequency, harmonics, power factor, and all attribute definitions. Includes Feature bitmap (DC/AC/polyphase/harmonics), MeasurementPeriodRanges event, and practical usage scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ElectricalPowerMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0090</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Electrical device function endpoint
  </p>
  <p>
    ElectricalPowerMeasurement is used for real-time measurement of electrical power parameters — voltage, current, active power, reactive power, apparent power, frequency, power factor, and more.
    It is a core measurement Cluster in the Matter energy management ecosystem, suitable for smart plugs, power meters, EV chargers, power monitoring panels, and other devices requiring precise electrical data.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Unit Pitfall: Millivolts / Milliamps / Milliwatts</div>
    <p>
      All voltage values are in <strong>mV</strong> (millivolts), current in <strong>mA</strong> (milliamps), power in <strong>mW</strong> (milliwatts), and frequency in <strong>mHz</strong> (millihertz).
      A device returning <code>220300</code> for voltage actually means <code>220.3 V</code>; returning <code>334856</code> for power actually means <code>334.856 W</code>.
      <strong>You must divide by 1000 when displaying values</strong>, otherwise users will see absurdly large numbers.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">DC vs AC: Features Determine Available Attributes</div>
    <p>
      This Cluster uses the Feature bitmap to distinguish between DC (DIRC) and AC (ALTC) scenarios.
      Attributes such as ReactiveCurrent, ApparentCurrent, ReactivePower, ApparentPower, the RMS series, Frequency, and PowerFactor
      are <strong>only available when the ALTC (alternating current) feature is enabled</strong>.
      DC devices (such as solar panels, batteries) only report basic attributes like Voltage, ActiveCurrent, and ActivePower.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    ElectricalPowerMeasurement has 19 application-level attributes, organized into four groups: basic information, real-time measurements, RMS measurements, and harmonics data.
    Click an attribute ID to jump to the detailed description for its group.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Group</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <!-- Basic Information -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PowerMode</td>
          <td>PowerModeEnum</td>
          <td><a href="#group-basic">Basic Info</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>NumberOfMeasurementTypes</td>
          <td>uint8</td>
          <td><a href="#group-basic">Basic Info</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>Accuracy</td>
          <td>list&lt;MeasurementAccuracyStruct&gt;</td>
          <td><a href="#group-basic">Basic Info</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>Ranges</td>
          <td>list&lt;MeasurementRangeStruct&gt;</td>
          <td><a href="#group-basic">Basic Info</a></td>
          <td class="col-optional">None</td>
        </tr>
        <!-- Real-time Measurements -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>Voltage</td>
          <td>int64 (mV)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ActiveCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ReactiveCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ApparentCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ActivePower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>ReactivePower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>ApparentPower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">Real-time</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <!-- RMS Measurements -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>RMSVoltage</td>
          <td>int64 (mV)</td>
          <td><a href="#group-rms">RMS</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>RMSCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-rms">RMS</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>RMSPower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-rms">RMS</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000E">
          <td><a href="#attr-0x000E"><code>0x000E</code></a></td>
          <td>Frequency</td>
          <td>int64 (mHz)</td>
          <td><a href="#group-rms">RMS</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <!-- Harmonics & Power Factor -->
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>HarmonicCurrents</td>
          <td>list&lt;HarmonicMeasurementStruct&gt;</td>
          <td><a href="#group-harmonics">Harmonics & Supplementary</a></td>
          <td class="col-required">HARM</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>HarmonicPhases</td>
          <td>list&lt;HarmonicMeasurementStruct&gt;</td>
          <td><a href="#group-harmonics">Harmonics & Supplementary</a></td>
          <td class="col-required">HARM</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>PowerFactor</td>
          <td>int64</td>
          <td><a href="#group-harmonics">Harmonics & Supplementary</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>NeutralCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-harmonics">Harmonics & Supplementary</a></td>
          <td class="col-required">POLY</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Basic Information (0x0000 ~ 0x0003) ====== -->
  <h3 id="group-basic">Basic Information (0x0000 ~ 0x0003)</h3>
  <p>Describes the device's power mode, number of supported measurement types, accuracy declarations, and historical measurement ranges.</p>

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
          <td>PowerMode</td>
          <td>PowerModeEnum</td>
          <td>The device's power supply type: Unknown / DC / AC (see enum below). Mandatory</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>NumberOfMeasurementTypes</td>
          <td>uint8</td>
          <td>Total number of measurement types supported by the device, corresponding to the length of the <code>Accuracy</code> list. Mandatory</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>Accuracy</td>
          <td>list&lt;MeasurementAccuracyStruct&gt;</td>
          <td>Lists each measurement type the device supports along with its accuracy range. Each element contains MeasurementType, whether it is measured, accuracy intervals, etc. Mandatory</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>Ranges</td>
          <td>list&lt;MeasurementRangeStruct&gt;</td>
          <td>Statistics of min/max values and start/end timestamps recorded over a period of time for each measurement type. Optional</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Practical Use of Accuracy</div>
    <p>
      The <code>Accuracy</code> attribute tells you what the device can measure and how precisely. The app should read this attribute first,
      then decide which measurement values to display. If a measurement type is not in the Accuracy list, the corresponding attribute should not be used even if it exists.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Real-time Measurements (0x0004 ~ 0x000A) ====== -->
  <h3 id="group-realtime">Real-time Measurements (0x0004 ~ 0x000A)</h3>
  <p>Instantaneous voltage, current, and power values from the device. All values are Nullable — a <code>null</code> return means the data is currently invalid.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Unit</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>Voltage</td>
          <td>mV</td>
          <td>Instantaneous voltage. <code>220300</code> = 220.3 V. Optional, Nullable</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ActiveCurrent</td>
          <td>mA</td>
          <td>Instantaneous active current. <code>1520</code> = 1.52 A. Optional, Nullable</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ReactiveCurrent</td>
          <td>mA</td>
          <td>Instantaneous reactive current. AC devices only. <strong>Requires ALTC</strong>, Nullable</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ApparentCurrent</td>
          <td>mA</td>
          <td>Instantaneous apparent current (vector sum of active + reactive). <strong>Requires ALTC</strong>, Nullable</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ActivePower</td>
          <td>mW</td>
          <td>Instantaneous active power (the portion that performs actual work). <code>334856</code> = 334.856 W. Mandatory, Nullable</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>ReactivePower</td>
          <td>mW</td>
          <td>Instantaneous reactive power (the portion that does no effective work). Actual unit is mVAR. <strong>Requires ALTC</strong>, Nullable</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>ApparentPower</td>
          <td>mW</td>
          <td>Instantaneous apparent power (total of active + reactive). Actual unit is mVA. <strong>Requires ALTC</strong>, Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Relationship Between Active / Reactive / Apparent Power</div>
    <p>
      <strong>Active Power</strong> = the actual energy consumed, what you pay for on your electricity bill.<br/>
      <strong>Reactive Power</strong> = the "back and forth" caused by inductors/capacitors; does no effective work but occupies line capacity.<br/>
      <strong>Apparent Power</strong> = the vector sum of both, representing the total load capacity of the line.<br/>
      Relationship: <code>ApparentPower&sup2; = ActivePower&sup2; + ReactivePower&sup2;</code>
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== RMS Measurements (0x000B ~ 0x000E) ====== -->
  <h3 id="group-rms">RMS Measurements (0x000B ~ 0x000E)</h3>
  <p>
    RMS (Root Mean Square) measurements for AC power — the effective values of alternating current. For a pure sine wave, RMS value = peak value / &radic;2.
    All attributes in this group require the <strong>ALTC</strong> feature.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Unit</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>RMSVoltage</td>
          <td>mV</td>
          <td>AC voltage effective value. Household 220V corresponds to approximately <code>220000</code>. Nullable</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>RMSCurrent</td>
          <td>mA</td>
          <td>AC current effective value. Nullable</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>RMSPower</td>
          <td>mW</td>
          <td>AC power effective value. Nullable</td>
        </tr>
        <tr id="attr-0x000E">
          <td><code>0x000E</code></td>
          <td>Frequency</td>
          <td>mHz</td>
          <td>AC frequency. <code>50000</code> = 50.0 Hz (e.g. Europe/China), <code>60000</code> = 60.0 Hz (e.g. US/Japan). Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Harmonics & Supplementary Attributes (0x000F ~ 0x0012) ====== -->
  <h3 id="group-harmonics">Harmonics & Supplementary Attributes (0x000F ~ 0x0012)</h3>
  <p>Harmonic analysis data, power factor, and neutral current. Harmonic attributes require the HARM feature, power factor requires ALTC, and neutral current requires POLY.</p>

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
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>HarmonicCurrents</td>
          <td class="col-required">HARM</td>
          <td>List of current amplitudes for each harmonic order (HarmonicMeasurementStruct), used for power quality analysis. Nullable</td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>HarmonicPhases</td>
          <td class="col-required">HARM</td>
          <td>List of phase angles for each harmonic order (HarmonicMeasurementStruct). Nullable</td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>PowerFactor</td>
          <td class="col-required">ALTC</td>
          <td>Ratio of active power to apparent power, expressed as percentage multiplied by 100. <code>9960</code> = 99.60%. Range: -10000 ~ 10000. Nullable</td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>NeutralCurrent</td>
          <td class="col-required">POLY</td>
          <td>Current in the neutral wire of a polyphase system. This value is significant when three-phase loads are unbalanced. Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">What PowerFactor Actually Means</div>
    <p>
      Power factor = active power / apparent power. The closer to 100% (i.e. 10000), the higher the energy utilization efficiency.
      Pure resistive loads (electric kettles) are close to 100%, while devices with motors (air conditioners, refrigerators) typically range from 80% to 95%.
      A negative value indicates the device is feeding energy back to the grid (e.g. a solar inverter).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-power-mode">PowerModeEnum (Power Mode)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown power mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DC</span>
        <span class="enum-desc">Direct Current (solar panels, battery systems, USB-powered devices)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AC</span>
        <span class="enum-desc">Alternating Current (household appliances, industrial equipment, grid-powered)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-measurement-type">MeasurementTypeEnum (Measurement Type)</h3>
  <p>Used in <code>Accuracy</code> and <code>Ranges</code> to identify the specific measurement type:</p>
  <div class="enum-cards">
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
        <span class="enum-name">Voltage</span>
        <span class="enum-desc">Voltage (mV)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActiveCurrent</span>
        <span class="enum-desc">Active Current (mA)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ReactiveCurrent</span>
        <span class="enum-desc">Reactive Current (mA)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">ApparentCurrent</span>
        <span class="enum-desc">Apparent Current (mA)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ActivePower</span>
        <span class="enum-desc">Active Power (mW)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ReactivePower</span>
        <span class="enum-desc">Reactive Power (mVAR)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">ApparentPower</span>
        <span class="enum-desc">Apparent Power (mVA)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">RMSVoltage</span>
        <span class="enum-desc">RMS Voltage (mV)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">RMSCurrent</span>
        <span class="enum-desc">RMS Current (mA)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">RMSPower</span>
        <span class="enum-desc">RMS Power (mW)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Frequency</span>
        <span class="enum-desc">Frequency (mHz)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">PowerFactor</span>
        <span class="enum-desc">Power Factor (1/100)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">NeutralCurrent</span>
        <span class="enum-desc">Neutral Current (mA)</span>
      </div>
    </div>
  </div>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    ElectricalPowerMeasurement defines one event, used for periodically reporting the statistical range of each measurement type over a time period.
    This is the primary way to obtain historical peak and valley data.
  </p>

  <h3 id="event-ranges">MeasurementPeriodRanges</h3>
  <p>
    <strong>Priority</strong>: INFO &nbsp;|&nbsp;
    <strong>Trigger</strong>: Automatically reported when the device completes a measurement period
  </p>
  <p>
    The event contains a <code>Ranges</code> field of type <code>list&lt;MeasurementRangeStruct&gt;</code>,
    where each element records the minimum value, maximum value, start/end timestamps, and other statistics for a measurement type within that period.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Event vs Attribute Ranges</div>
    <p>
      Both the attribute <code>Ranges (0x0003)</code> and the event <code>MeasurementPeriodRanges</code> contain MeasurementRangeStruct lists,
      but they serve different purposes: the attribute records <strong>cumulative ranges</strong> (overall extremes since the device started running),
      while the event reports <strong>per-period ranges</strong> (extremes within the most recent time window). Apps should subscribe to the event to build historical trend charts.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    ElectricalPowerMeasurement declares the device's electrical measurement capabilities through <code>FeatureMap</code> (0xFFFC).
    Different Feature combinations determine which attributes are available:
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DIRC (DirectCurrent)</span>
        <span class="enum-desc">DC measurement — supports DC voltage, current, and power measurement</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ALTC (AlternatingCurrent)</span>
        <span class="enum-desc">AC measurement — unlocks reactive/apparent power, RMS series, frequency, and power factor</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">POLY (PolyphasePower)</span>
        <span class="enum-desc">Polyphase power — supports three-phase systems, unlocks NeutralCurrent attribute</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">HARM (Harmonics)</span>
        <span class="enum-desc">Harmonic analysis — unlocks HarmonicCurrents and HarmonicPhases attributes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">DIRC and ALTC Are Mutually Exclusive</div>
    <p>
      A device is either DC (DIRC) or AC (ALTC) — it cannot declare both.
      POLY and HARM only take effect on top of ALTC.
      After reading the FeatureMap, apps should decide which attributes to display accordingly — do not request RMS data from DC devices.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ElectricalPowerMeasurement is a <strong>read-only Server Cluster</strong> with no commands.
    The device is responsible for collecting electrical data and updating attributes; the app only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Electrical data reported by a smart plug with the ALTC (AC) feature enabled:</p>
  <pre><code>{
  // --- ElectricalPowerMeasurement Cluster (Endpoint 1) ---

  // --- Basic Information ---
  "0x0000": 2,              // PowerMode = AC (Alternating Current)
  "0x0001": 5,              // NumberOfMeasurementTypes = 5

  // --- Real-time Measurements ---
  "0x0004": 220300,         // Voltage = 220300 mV → 220.3 V
  "0x0005": 1520,           // ActiveCurrent = 1520 mA → 1.52 A
  "0x0008": 334856,         // ActivePower = 334856 mW → 334.856 W
  "0x0009": 28700,          // ReactivePower = 28700 mW → 28.7 VAR
  "0x000A": 336100,         // ApparentPower = 336100 mW → 336.1 VA

  // --- RMS Measurements (AC only) ---
  "0x000B": 219800,         // RMSVoltage = 219800 mV → 219.8 V
  "0x000C": 1530,           // RMSCurrent = 1530 mA → 1.53 A
  "0x000D": 335200,         // RMSPower = 335200 mW → 335.2 W
  "0x000E": 50000,          // Frequency = 50000 mHz → 50.0 Hz

  // --- Power Factor ---
  "0x0011": 9960            // PowerFactor = 9960 → 99.60%
}</code></pre>

  <p>MeasurementPeriodRanges event example — voltage and power range statistics over a 1-hour period:</p>
  <pre><code>{
  // MeasurementPeriodRanges Event
  // Reported when the device completes a measurement period, containing statistical ranges for each measurement type
  "MeasurementPeriodRanges": {
    "Ranges": [
      {
        "MeasurementType": 1,        // Voltage
        "Min": 218500,               // Minimum 218.5 V
        "Max": 222100,               // Maximum 222.1 V
        "StartTimestamp": 1695600000,
        "EndTimestamp": 1695603600
      },
      {
        "MeasurementType": 5,        // ActivePower
        "Min": 280000,               // Minimum 280.0 W
        "Max": 350000,               // Maximum 350.0 W
        "StartTimestamp": 1695600000,
        "EndTimestamp": 1695603600
      }
    ]
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Unit Conversion Code Reference</div>
    <p>Key logic for processing device return values:</p>
    <pre><code>{\`// Device return values (int64, Nullable)
val voltageRaw: Long? = 220300     // mV
val powerRaw: Long? = 334856       // mW
val freqRaw: Long? = 50000         // mHz
val pfRaw: Long? = 9960            // percentage x 100

// Convert to human-readable values
val voltageV = voltageRaw?.let { it / 1000.0 }    // → 220.3 V
val powerW = powerRaw?.let { it / 1000.0 }         // → 334.856 W
val freqHz = freqRaw?.let { it / 1000.0 }          // → 50.0 Hz
val powerFactor = pfRaw?.let { it / 100.0 }         // → 99.60%

// Handle null when displaying
val display = voltageV?.let { String.format("%.1f V", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Smart Plug Real-time Power Monitoring Dashboard</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports ALTC (AC)</li>
        <li>Read <code>Accuracy (0x0002)</code> to determine which measurement types the device supports and their precision</li>
        <li>Subscribe to core attributes: <code>ActivePower (0x0008)</code>, <code>RMSVoltage (0x000B)</code>, <code>RMSCurrent (0x000C)</code>,
            with a reasonable reporting interval (e.g. 5 to 30 seconds)</li>
        <li>Display on the UI: Voltage 220.3 V, Current 1.52 A, Power 334.9 W, Power Factor 99.6%</li>
        <li>Optional: Subscribe to the <code>MeasurementPeriodRanges</code> event to record historical peaks for trend charts</li>
        <li>Handle <code>null</code> values — display "--" instead of 0, since 0 and "no data" have different meanings</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Home Power Consumption Anomaly Alerts</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>ActivePower (0x0008)</code> and <code>RMSCurrent (0x000C)</code> for continuous monitoring</li>
        <li>Set alert thresholds: trigger when power exceeds 2200 W (10A &times; 220V) or current exceeds 10000 mA</li>
        <li>Use the precision values in <code>Accuracy</code> for debouncing — if precision is &plusmn;5%, leave margin around the threshold</li>
        <li>Send push notifications when alerts trigger; in severe cases, link to the OnOff Cluster for automatic power cutoff protection</li>
        <li>Optional: Monitor <code>PowerFactor (0x0011)</code>; a sustained power factor below 70% may indicate device malfunction</li>
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
  'electrical-energy-measurement': {
    title: 'ElectricalEnergyMeasurement Cluster (0x0091)',
    description: 'Complete reference for the Matter ElectricalEnergyMeasurement Cluster (0x0091) — cumulative/periodic energy measurement, EnergyMeasurementStruct data structure, Feature bitmap (IMPE/EXPE/CUME/PERE), event subscriptions, and its relationship with ElectricalPowerMeasurement.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ElectricalEnergyMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0091</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on an electrical device endpoint (e.g. smart plug, energy meter, EV charger)
  </p>
  <p>
    ElectricalEnergyMeasurement is responsible for recording the cumulative energy consumption (or output) of a device over time.
    Unlike <a href="/clusters/electrical-power-measurement/">ElectricalPowerMeasurement (0x0090)</a> which measures instantaneous power,
    this Cluster focuses on <strong>"how much total energy has been used"</strong> and <strong>"how much energy was used during this period"</strong>.
    Both typically coexist on the same Endpoint — the former is like a speedometer, the latter like an odometer.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Energy Unit: Milliwatt-hours (mWh)</div>
    <p>
      All energy values are in <strong>mWh (milliwatt-hours)</strong>, with type int64.
      A device returning <code>12345678</code> represents <code>12,345.678 Wh</code>, i.e. <code>12.35 kWh</code>.
      <strong>Unit conversion is required for display</strong>: divide by 1000 to get Wh, divide again by 1000 to get kWh.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Cumulative vs Periodic</div>
    <p>
      This Cluster has two metering modes, determined by Features:<br/>
      <strong>Cumulative</strong>: Total energy accumulated from a starting point, similar to a utility meter reading — it only increases (unless reset).<br/>
      <strong>Periodic</strong>: Energy consumed within each measurement period, reset to zero at the end of each period — ideal for tracking "how much energy was used in the past hour."
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#structs">Data Structures</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>
  <p>
    ElectricalEnergyMeasurement uses two core Structs to carry data.
    Understanding these two structures is fundamental to reading the entire Cluster.
  </p>

  <h3 id="struct-energy">EnergyMeasurementStruct (Energy Measurement Data)</h3>
  <p>
    Every energy reading is represented by this structure. It contains the energy value and the corresponding time range.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Energy</td>
          <td>int64</td>
          <td>Yes</td>
          <td>Energy value in mWh (milliwatt-hours). Only increases in cumulative mode; resets each period in periodic mode</td>
        </tr>
        <tr>
          <td>StartTimestamp</td>
          <td>epoch_s</td>
          <td>No</td>
          <td>Start UTC time of the measurement interval (second-precision Unix timestamp)</td>
        </tr>
        <tr>
          <td>EndTimestamp</td>
          <td>epoch_s</td>
          <td>No</td>
          <td>End UTC time of the measurement interval (i.e. the most recent update time)</td>
        </tr>
        <tr>
          <td>StartSystime</td>
          <td>systime_ms</td>
          <td>No</td>
          <td>Start system time of the measurement interval (milliseconds, device-local monotonic clock)</td>
        </tr>
        <tr>
          <td>EndSystime</td>
          <td>systime_ms</td>
          <td>No</td>
          <td>End system time of the measurement interval (milliseconds)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Timestamp vs Systime</div>
    <p>
      Time fields come in two flavors: <code>Timestamp</code> is UTC wall-clock time (requires the device to have synced via NTP),
      while <code>Systime</code> is a monotonically increasing clock since device boot (independent of network, but resets on reboot).
      The device provides at least one set; if both are available, prefer <code>Timestamp</code>.
    </p>
  </div>

  <h3 id="struct-reset">CumulativeEnergyResetStruct (Cumulative Reset Information)</h3>
  <p>
    Records the time when the cumulative energy value was last reset. Used to determine the starting point of the current cumulative reading.
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
          <td>ImportedResetTimestamp</td>
          <td>epoch_s</td>
          <td>UTC time when the import-side cumulative value was last reset</td>
        </tr>
        <tr>
          <td>ExportedResetTimestamp</td>
          <td>epoch_s</td>
          <td>UTC time when the export-side cumulative value was last reset</td>
        </tr>
        <tr>
          <td>ImportedResetSystime</td>
          <td>systime_ms</td>
          <td>System time when the import-side cumulative value was last reset</td>
        </tr>
        <tr>
          <td>ExportedResetSystime</td>
          <td>systime_ms</td>
          <td>System time when the export-side cumulative value was last reset</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#structs">&#8593; Back to Data Structures</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ElectricalEnergyMeasurement has 6 application-level attributes. Click an attribute ID to jump to its detailed description.</p>

  <!-- Attribute Summary Table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Required Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Accuracy</td>
          <td>MeasurementAccuracyStruct</td>
          <td class="col-optional">None (Mandatory)</td>
          <td>Measurement accuracy description</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CumulativeEnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">IMPE &amp; CUME</td>
          <td>Cumulative imported energy (consumption)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CumulativeEnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">EXPE &amp; CUME</td>
          <td>Cumulative exported energy (generation)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PeriodicEnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">IMPE &amp; PERE</td>
          <td>Current period imported energy</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>PeriodicEnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">EXPE &amp; PERE</td>
          <td>Current period exported energy</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>CumulativeEnergyReset</td>
          <td>CumulativeEnergyResetStruct</td>
          <td class="col-required">CUME</td>
          <td>Cumulative value reset time information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Individual Attribute Details ====== -->
  <h3 id="attr-0x0000">Accuracy (Measurement Accuracy)</h3>
  <p>
    Describes the measurement accuracy and range of this energy metering device. Uses the <code>MeasurementAccuracyStruct</code> structure,
    containing the measurement type (fixed to ElectricalEnergy), range limits, and accuracy descriptions for different intervals.
    This is the only mandatory attribute — all devices implementing this Cluster must report it.
  </p>
  <ul>
    <li><strong>Type</strong>: MeasurementAccuracyStruct</li>
    <li><strong>Access</strong>: Read-only</li>
    <li><strong>Required</strong>: Yes</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">CumulativeEnergyImported (Cumulative Imported Energy)</h3>
  <p>
    The total energy <strong>imported (consumed)</strong> by the device from the grid since metering started (or last reset).
    This is the everyday "total energy consumption," similar to a household utility meter reading. The value only increases, unless reset to zero.
  </p>
  <ul>
    <li><strong>Type</strong>: EnergyMeasurementStruct, Nullable</li>
    <li><strong>Required Features</strong>: IMPE (ImportedEnergy) + CUME (CumulativeEnergy)</li>
    <li><strong>Conversion</strong>: <code>energy / 1000</code> = Wh, <code>energy / 1000000</code> = kWh</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">CumulativeEnergyExported (Cumulative Exported Energy)</h3>
  <p>
    The cumulative total energy <strong>exported (fed back)</strong> by the device to the grid.
    Applicable to solar inverters, energy storage systems, and other devices capable of feeding power back to the grid. Ordinary household appliances do not report this attribute.
  </p>
  <ul>
    <li><strong>Type</strong>: EnergyMeasurementStruct, Nullable</li>
    <li><strong>Required Features</strong>: EXPE (ExportedEnergy) + CUME (CumulativeEnergy)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">PeriodicEnergyImported (Periodic Imported Energy)</h3>
  <p>
    The energy imported (consumed) by the device within the current measurement period. Automatically resets at the end of each period.
    Ideal for tracking "how much energy was used in the past hour" or "today's usage."
    The period length is determined by the device implementation and can be calculated from <code>StartTimestamp</code> / <code>EndTimestamp</code>.
  </p>
  <ul>
    <li><strong>Type</strong>: EnergyMeasurementStruct, Nullable</li>
    <li><strong>Required Features</strong>: IMPE (ImportedEnergy) + PERE (PeriodicEnergy)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0004">PeriodicEnergyExported (Periodic Exported Energy)</h3>
  <p>
    The energy exported (fed back) by the device to the grid within the current measurement period. Symmetric to PeriodicEnergyImported,
    used by devices with generation capability to track energy output per period.
  </p>
  <ul>
    <li><strong>Type</strong>: EnergyMeasurementStruct, Nullable</li>
    <li><strong>Required Features</strong>: EXPE (ExportedEnergy) + PERE (PeriodicEnergy)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0005">CumulativeEnergyReset (Cumulative Reset Information)</h3>
  <p>
    Records when the cumulative energy value was last reset. Through this attribute you can determine
    when <code>CumulativeEnergyImported</code> / <code>CumulativeEnergyExported</code>
    started accumulating. If the device has never been reset, this attribute is <code>null</code>.
  </p>
  <ul>
    <li><strong>Type</strong>: CumulativeEnergyResetStruct, Nullable</li>
    <li><strong>Required Features</strong>: CUME (CumulativeEnergy)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Events ====== -->
  <h2 id="events">Events</h2>
  <p>
    ElectricalEnergyMeasurement has no commands (read-only Cluster), but defines two important events.
    Devices proactively notify the app of energy data updates through events,
    which is more efficient than polling attributes on a timer — especially useful for scenarios that need to track energy consumption changes in real time.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Priority</th>
          <th>Required Feature</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>CumulativeEnergyMeasured</td>
          <td>INFO</td>
          <td class="col-required">CUME</td>
          <td>Cumulative energy update</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>PeriodicEnergyMeasured</td>
          <td>INFO</td>
          <td class="col-required">PERE</td>
          <td>Periodic energy update</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">CumulativeEnergyMeasured (Cumulative Energy Update Event)</h3>
  <p>
    Triggered when the device's cumulative energy value changes. The event data contains the latest cumulative imported and/or exported energy.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td>Latest cumulative imported energy (optional, depends on IMPE feature)</td>
        </tr>
        <tr>
          <td>EnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td>Latest cumulative exported energy (optional, depends on EXPE feature)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <h3 id="event-0x01">PeriodicEnergyMeasured (Periodic Energy Update Event)</h3>
  <p>
    Triggered at the end of each measurement period. The event data contains the imported and/or exported energy for that period.
    Ideal for apps to append data to historical records upon receiving this event, building energy consumption charts.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td>Imported energy for this period (optional, depends on IMPE feature)</td>
        </tr>
        <tr>
          <td>EnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td>Exported energy for this period (optional, depends on EXPE feature)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; Back to Events</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    ElectricalEnergyMeasurement declares the device's metering capabilities through <code>FeatureMap</code> (0xFFFC).
    The four Features combine in pairs to determine which attributes and events the device can provide:
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">IMPE (ImportedEnergy)</span>
        <span class="enum-desc">Supports measuring imported energy (consumption) — the vast majority of devices have this feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EXPE (ExportedEnergy)</span>
        <span class="enum-desc">Supports measuring exported energy (generation/feed-back) — used by solar and energy storage devices</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">CUME (CumulativeEnergy)</span>
        <span class="enum-desc">Supports cumulative metering — provides total energy from the starting point to the present</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">PERE (PeriodicEnergy)</span>
        <span class="enum-desc">Supports periodic metering — provides energy consumption within each measurement period</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature Combination Rules</div>
    <p>
      A device must support at least one of IMPE or EXPE (it must measure energy in at least one direction),
      and at least one of CUME or PERE (it must have at least one metering mode).
      A typical smart plug usually only has <code>IMPE + CUME</code> (Bit 0 + Bit 2 = FeatureMap = 5),
      while a solar inverter may have all four enabled (FeatureMap = 15).
    </p>
  </div>

  <!-- ====== Relationship with ElectricalPowerMeasurement ====== -->
  <h2 id="relationship">Relationship with ElectricalPowerMeasurement</h2>
  <p>
    Matter splits electrical measurement into two Clusters, each serving a distinct role:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ElectricalPowerMeasurement（0x0090）</th>
          <th>ElectricalEnergyMeasurement（0x0091）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>What it measures</strong></td>
          <td>Instantaneous power (Power)</td>
          <td>Accumulated energy (Energy)</td>
        </tr>
        <tr>
          <td><strong>Unit</strong></td>
          <td>mW (milliwatts)</td>
          <td>mWh (milliwatt-hours)</td>
        </tr>
        <tr>
          <td><strong>Analogy</strong></td>
          <td>A car's speedometer -- how fast right now</td>
          <td>A car's odometer -- total distance traveled</td>
        </tr>
        <tr>
          <td><strong>Typical reading</strong></td>
          <td>"Current power 150W"</td>
          <td>"This month's consumption 45.3 kWh"</td>
        </tr>
        <tr>
          <td><strong>Data access</strong></td>
          <td>Read attributes (real-time values)</td>
          <td>Subscribe to events (cumulative/periodic updates)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    Both Clusters typically coexist on the same Endpoint. The app UI can simultaneously display real-time power (from 0x0090) and cumulative energy consumption (from 0x0091);
    the former is suited for real-time monitoring, the latter for consumption statistics and cost calculation.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of the ElectricalEnergyMeasurement Cluster for a smart plug supporting IMPE + CUME + PERE features:</p>
  <pre><code>{
  // --- ElectricalEnergyMeasurement Cluster（Endpoint 1）---

  // --- Measurement Accuracy ---
  "0x0000": {                    // Accuracy（MeasurementAccuracyStruct）
    "measurementType": 1,        // ElectricalEnergy
    "measured": true,
    "minMeasuredValue": 0,
    "maxMeasuredValue": 100000000000,  // 100,000 kWh
    "accuracyRanges": [{
      "rangeMin": 0,
      "rangeMax": 100000000000,
      "fixedMax": 5000           // Maximum fixed error 5000 mWh = 5 Wh
    }]
  },

  // --- Cumulative Energy (requires IMPE + CUME features) ---
  "0x0001": {                    // CumulativeEnergyImported
    "energy": 12345678,          // 12,345,678 mWh = 12,345.678 Wh ≈ 12.35 kWh
    "startTimestamp": 1700000000,// 2023-11-14T22:13:20Z (metering start time)
    "endTimestamp": 1700086400   // 2023-11-15T22:13:20Z (latest update time)
  },

  // --- Periodic Energy (requires IMPE + PERE features) ---
  "0x0003": {                    // PeriodicEnergyImported
    "energy": 543210,            // 543,210 mWh = 543.21 Wh ≈ 0.54 kWh (this period consumption)
    "startTimestamp": 1700082800,// Period start time
    "endTimestamp": 1700086400   // Period end time (1-hour period)
  },

  // --- Cumulative Reset Info (requires CUME feature) ---
  "0x0005": {                    // CumulativeEnergyReset
    "importedResetTimestamp": 1700000000  // Time of last cumulative value reset
  }
}</code></pre>

  <p>CumulativeEnergyMeasured event data example:</p>
  <pre><code>{
  // CumulativeEnergyMeasured Event — cumulative energy update notification
  "eventId": "0x00",
  "priority": "INFO",
  "data": {
    "energyImported": {
      "energy": 12345678,          // 12,345.678 Wh
      "startTimestamp": 1700000000,
      "endTimestamp": 1700086400
    }
    // energyExported omitted (this device does not support reverse output)
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Unit Conversion Code Reference</div>
    <p>Key logic for handling energy values returned by the device:</p>
    <pre><code>{\`// Device returns energy = 12345678 (mWh)
val rawEnergy: Long? = 12345678    // Nullable, may be null
val wattHours = rawEnergy?.let { it / 1000.0 }     // → 12,345.678 Wh
val kilowattHours = rawEnergy?.let { it / 1_000_000.0 }  // → 12.346 kWh

// Handle null + choose appropriate unit for display
val display = kilowattHours?.let {
    if (it < 1.0) String.format("%.1f Wh", it * 1000)  // Show Wh if less than 1 kWh
    else String.format("%.2f kWh", it)
} ?: "--"\`}</code></pre>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Smart Plug Energy Statistics Dashboard</summary>
    <div class="scenario-content">
      <ol>
        <li>Check <code>FeatureMap (0xFFFC)</code> to confirm the device's supported metering modes (CUME / PERE / IMPE / EXPE)</li>
        <li>Subscribe to the <code>CumulativeEnergyMeasured (0x00)</code> event to track cumulative consumption changes in real time</li>
        <li>Read <code>CumulativeEnergyImported (0x0001)</code> to get the current total consumption; divide by 1,000,000 to convert to kWh</li>
        <li>If PERE is supported, also subscribe to the <code>PeriodicEnergyMeasured (0x01)</code> event and use each period's data to plot an energy consumption chart</li>
        <li>Calculate cost using local electricity rates: <code>cost = kWh x rate (currency/kWh)</code></li>
        <li>Combine with ElectricalPowerMeasurement (0x0090) to simultaneously display "Current Power" and "Cumulative Consumption" in the UI</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Bidirectional Energy Monitoring for Solar + Storage Systems</summary>
    <div class="scenario-content">
      <ol>
        <li>Confirm the device's FeatureMap includes IMPE + EXPE (bidirectional metering) + CUME + PERE (both modes)</li>
        <li>Read <code>CumulativeEnergyImported (0x0001)</code> to get the total energy purchased from the grid</li>
        <li>Read <code>CumulativeEnergyExported (0x0002)</code> to get the total energy fed back to the grid</li>
        <li>Calculate net consumption: <code>net = Imported - Exported</code>; a negative value indicates the device is a net generator</li>
        <li>Subscribe to the <code>PeriodicEnergyMeasured (0x01)</code> event to track per-period stats: "how much energy was generated and consumed this hour"</li>
        <li>Read <code>CumulativeEnergyReset (0x0005)</code> to confirm the starting time of cumulative data, avoiding confusion across devices or periods</li>
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
  'device-energy-management': {
    title: 'DeviceEnergyManagement Cluster (0x0098)',
    description: 'Complete reference for the Matter DeviceEnergyManagement Cluster (0x0098) — commands including PowerAdjustRequest/ModifyForecastRequest, attribute definitions for ESAType/Forecast/PowerAdjustmentCapability, Feature bitmap, enum quick reference, and data examples.',
    prev: undefined,
    next: undefined,
    content: `<h1>DeviceEnergyManagement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0098</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Device endpoint with energy management capabilities
  </p>
  <p>
    DeviceEnergyManagement (DEM) is a core energy management Cluster introduced in Matter 1.4,
    enabling Energy Management Systems (EMS) to negotiate power adjustments, forecast energy usage plans, and optimize energy consumption with various energy-consuming or generating devices.
    It applies to EV chargers (EVSE), heat pumps, battery storage, solar systems, dishwashers, washing machines, and other ESA (Energy Smart Appliance) devices.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ESA (Energy Smart Appliance)</div>
    <p>
      ESA is a core concept in the Matter energy management ecosystem, referring to smart devices with energy awareness and management capabilities.
      Each ESA identifies its device category via <code>ESAType</code>, reports its current state via <code>ESAState</code>,
      and declares its energy usage plan to the EMS through <strong>Forecast</strong>. The EMS uses this information to issue power adjustments, time adjustments, and other optimization commands.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Power Unit</div>
    <p>
      All power attributes in the DeviceEnergyManagement Cluster are in <strong>milliwatts (mW)</strong>.
      For example, <code>AbsMaxPower = 7200000</code> means a maximum power of <strong>7.2 kW</strong> (7200 W).
      Always perform unit conversion when reading or writing power attributes.
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
    DeviceEnergyManagement Cluster has 8 commands, each corresponding to different Feature capabilities.
    The EMS (Energy Management System) uses these commands to adjust the device's power, start time, operating state, and energy forecast.
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
          <td>PowerAdjustRequest</td>
          <td>Request the device to adjust to a specified power level</td>
          <td class="col-feature">PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>CancelPowerAdjustRequest</td>
          <td>Cancel an ongoing power adjustment</td>
          <td class="col-feature">PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StartTimeAdjustRequest</td>
          <td>Request adjustment of the forecast start time</td>
          <td class="col-feature">STA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>PauseRequest</td>
          <td>Request the device to pause operation</td>
          <td class="col-feature">PAU</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>ResumeRequest</td>
          <td>Request the device to resume operation</td>
          <td class="col-feature">PAU</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>ModifyForecastRequest</td>
          <td>Modify the device's energy forecast</td>
          <td class="col-feature">FA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>RequestConstraintBasedForecast</td>
          <td>Request the device to regenerate its forecast based on constraints</td>
          <td class="col-feature">CON</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>CancelRequest</td>
          <td>Cancel all ongoing optimization requests</td>
          <td class="col-feature">STA | PAU | FA | CON</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">PowerAdjustRequest -- Power Adjustment Request (0x00)</h3>
  <p>
    Requests the device to adjust to a target power level for a specified duration. The EMS uses this command to reduce device power during peak pricing periods
    or increase power during off-peak periods to optimize energy costs. Upon success, <code>ESAState</code> changes to <code>PowerAdjustActive (3)</code>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Power</td>
          <td>int64</td>
          <td>Target power in mW. Must be within the device's PowerAdjustmentCapability range</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>uint32</td>
          <td>Adjustment duration in seconds. Must be within the device's declared minDuration ~ maxDuration range</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>Adjustment cause: <code>0</code> = LocalOptimization, <code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        During peak pricing, the EMS sends <code>PowerAdjustRequest(Power=1400000, Duration=7200, Cause=1)</code> to the EVSE,
        reducing charging power from 7.2 kW to 1.4 kW for 2 hours. The device continues charging at reduced power during the adjustment
        and automatically restores normal power when the duration expires.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">CancelPowerAdjustRequest -- Cancel Power Adjustment (0x01)</h3>
  <p>
    Cancels an ongoing power adjustment; the device immediately returns to normal operating state. No parameters.
    On success, <code>ESAState</code> changes from <code>PowerAdjustActive</code> back to <code>Online</code>.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The EMS previously requested reduced power operation, but grid load has dropped suddenly and the restriction is no longer needed.
        Send CancelPowerAdjustRequest to let the device resume full-speed operation.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">StartTimeAdjustRequest -- Start Time Adjustment (0x02)</h3>
  <p>
    Requests the device to shift the start time in its Forecast to a specified time.
    Used to move the device's operating period from peak to off-peak without changing total energy consumption.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RequestedStartTime</td>
          <td>epoch-s</td>
          <td>Requested new start time (UTC timestamp)</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>Adjustment cause: <code>0</code> = LocalOptimization, <code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A washing machine is scheduled to start at 18:00, but the EMS detects that 18:00-20:00 is peak hours.
        Send <code>StartTimeAdjustRequest(RequestedStartTime=UTC timestamp for 22:00, Cause=1)</code>
        to defer the wash cycle to the 22:00 off-peak period. The device will automatically start at the new time.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">PauseRequest -- Pause Operation (0x03)</h3>
  <p>
    Requests the device to pause its current operation. Only applicable to devices supporting pause (PAU Feature).
    On success, <code>ESAState</code> changes to <code>Paused (4)</code>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Duration</td>
          <td>uint32</td>
          <td>Pause duration in seconds. The device automatically resumes operation when expired</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>Pause cause: <code>0</code> = LocalOptimization, <code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        A dishwasher is running and the EMS detects the grid load is about to peak.
        Send <code>PauseRequest(Duration=1800, Cause=1)</code> to pause the dishwasher for 30 minutes.
        The device maintains its current state during the pause and automatically resumes the wash cycle after 30 minutes.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">ResumeRequest -- Resume Operation (0x04)</h3>
  <p>
    Requests the device to resume paused operation. No parameters.
    On success, <code>ESAState</code> changes from <code>Paused</code> back to <code>Online</code>.
  </p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">ModifyForecastRequest -- Modify Forecast (0x05)</h3>
  <p>
    Modifies the power and time parameters of one or more Slots in the device's current Forecast.
    The EMS uses this command to directly adjust the device's energy plan, such as reducing the expected power for a certain period.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ForecastID</td>
          <td>uint32</td>
          <td>The Forecast ID to modify; must match the forecastID in the current Forecast attribute</td>
        </tr>
        <tr>
          <td>SlotAdjustments</td>
          <td>list</td>
          <td>List of Slot adjustments, each containing fields like SlotIndex, NominalPower, Duration</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>Adjustment cause: <code>0</code> = LocalOptimization, <code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The EVSE's Forecast shows it will charge at 7.2 kW for 2 hours in Slot 0. The EMS wants to split it into two segments:
        first charge at 3.6 kW for 1 hour (avoiding peak), then at 7.2 kW for 1 hour.
        Use ModifyForecastRequest to modify the Slot parameters to implement this segmented charging strategy.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">RequestConstraintBasedForecast -- Constraint-Based Forecast Request (0x06)</h3>
  <p>
    Provides the device with a set of power/energy constraints and requests it to regenerate its Forecast accordingly.
    Unlike ModifyForecastRequest which directly modifies parameters, this command tells the device "figure out how to meet these constraints yourself".
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Constraints</td>
          <td>list</td>
          <td>List of constraints. Each entry contains limits such as StartTime, Duration, NominalPower / MaximumEnergy</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>Constraint cause: <code>0</code> = LocalOptimization, <code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The EMS knows the grid may be overloaded tomorrow from 14:00-16:00, and sends a constraint to the heat pump:
        "14:00-16:00 maximum power must not exceed 2 kW". The heat pump adjusts its internal operation plan accordingly,
        possibly pre-cooling earlier or delaying startup, to ensure it stays within 2 kW during the constrained period.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">CancelRequest -- Cancel Request (0x07)</h3>
  <p>
    Cancels all currently ongoing optimization requests (StartTimeAdjust, Pause, ModifyForecast, ConstraintBasedForecast);
    the device returns to its original autonomous operation plan. No parameters.
    Requires the device to support at least one of the STA, PAU, FA, or CON Features.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The EMS previously issued multiple optimization requests and now needs to release all restrictions to let the device resume autonomous operation.
        Send CancelRequest to clear all ongoing time adjustments, pauses, and forecast modifications in one go.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>DeviceEnergyManagement Cluster attributes are organized into three functional groups. Click an attribute ID in the summary table to jump to its detailed description.</p>

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
        <!-- ESA Basic Information -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ESAType</td>
          <td>ESATypeEnum</td>
          <td><a href="#group-esa">ESA Basic Info</a></td>
          <td>Device type identifier</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>ESACanGenerate</td>
          <td>bool</td>
          <td><a href="#group-esa">ESA Basic Info</a></td>
          <td>Whether the device can generate energy</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ESAState</td>
          <td>ESAStateEnum</td>
          <td><a href="#group-esa">ESA Basic Info</a></td>
          <td>Current energy management state of the device</td>
        </tr>
        <!-- Power Range -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>AbsMinPower</td>
          <td>int64</td>
          <td><a href="#group-power">Power & Adjustment</a></td>
          <td>Absolute minimum power of the device (mW)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AbsMaxPower</td>
          <td>int64</td>
          <td><a href="#group-power">Power & Adjustment</a></td>
          <td>Absolute maximum power of the device (mW)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>PowerAdjustmentCapability</td>
          <td>struct / null</td>
          <td><a href="#group-power">Power & Adjustment</a></td>
          <td>Adjustable power range and time limits</td>
        </tr>
        <!-- Forecast & Optimization -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>Forecast</td>
          <td>struct / null</td>
          <td><a href="#group-forecast">Forecast & Optimization</a></td>
          <td>Device's energy consumption/generation forecast plan</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>OptOutState</td>
          <td>OptOutStateEnum</td>
          <td><a href="#group-forecast">Forecast & Optimization</a></td>
          <td>User's optimization opt-out status</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== ESA Basic Information (0x0000-0x0002) ====== -->
  <h3 id="group-esa">ESA Basic Information (0x0000-0x0002)</h3>
  <p>Describes the device's type, energy generation capability, and current state. These three attributes are foundational for all DEM devices.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>ESAType<br/><span class="attr-cn">Device Type</span></td>
          <td>ESATypeEnum</td>
          <td>Identifies the ESA device type. The EMS uses this value to understand the device's energy characteristics and scheduling strategy. See enum below</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>ESACanGenerate<br/><span class="attr-cn">Can Generate Energy</span></td>
          <td>bool</td>
          <td><code>true</code> means the device can export energy to the grid (e.g. solar inverter, battery storage discharging). <code>false</code> means it only consumes energy</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ESAState<br/><span class="attr-cn">Device State</span></td>
          <td>ESAStateEnum</td>
          <td>Current energy management state of the device. See enum below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ESATypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">EVSE</span>
        <span class="enum-desc">Electric Vehicle Supply Equipment</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">SpaceHeating</span>
        <span class="enum-desc">Space Heating</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">WaterHeating</span>
        <span class="enum-desc">Water Heater</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SpaceCooling</span>
        <span class="enum-desc">Space Cooling (Air Conditioning)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">SpaceHeatingCooling</span>
        <span class="enum-desc">Heating and Cooling (Heat Pump)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">BatteryStorage</span>
        <span class="enum-desc">Battery Storage</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">SolarPV</span>
        <span class="enum-desc">Solar Photovoltaic</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">FridgeFreezer</span>
        <span class="enum-desc">Fridge / Freezer</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">WashingMachine</span>
        <span class="enum-desc">Washing Machine</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Dishwasher</span>
        <span class="enum-desc">Dishwasher</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Cooking</span>
        <span class="enum-desc">Cooking Appliance</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">HomeWaterPump</span>
        <span class="enum-desc">Home Water Pump</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">IrrigationWaterPump</span>
        <span class="enum-desc">Irrigation Water Pump</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">PoolPump</span>
        <span class="enum-desc">Pool Pump</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other Type</span>
      </div>
    </div>
  </div>

  <h4>ESAStateEnum Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Offline</span>
        <span class="enum-desc">Offline -- device does not participate in energy management</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Online</span>
        <span class="enum-desc">Online -- normal operation, can accept optimization commands</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Fault</span>
        <span class="enum-desc">Fault -- device error, energy management suspended</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PowerAdjustActive</span>
        <span class="enum-desc">Power adjusting -- executing PowerAdjustRequest</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">Paused -- operation paused due to PauseRequest</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ESAState and Command Relationship</div>
    <p>
      The device only accepts new optimization commands when <code>ESAState = Online (1)</code>.
      When in <code>Offline</code> or <code>Fault</code> state, all commands are rejected.
      In <code>PowerAdjustActive</code> state, only <code>CancelPowerAdjustRequest</code> can be sent;
      in <code>Paused</code> state, only <code>ResumeRequest</code> can be sent.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Power & Adjustment (0x0003-0x0005) ====== -->
  <h3 id="group-power">Power &amp; Adjustment (0x0003-0x0005)</h3>
  <p>Defines the device's power range and adjustment capabilities. The EMS must read these attributes to confirm the adjustment range before sending a PowerAdjustRequest.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>AbsMinPower<br/><span class="attr-cn">Absolute Min Power</span></td>
          <td>int64</td>
          <td>Absolute minimum power at which the device can operate, in mW. Can be negative (indicating export to grid). <code>0</code> means the device can completely stop consuming</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AbsMaxPower<br/><span class="attr-cn">Absolute Max Power</span></td>
          <td>int64</td>
          <td>Absolute maximum power at which the device can operate, in mW. For example, <code>7200000</code> means 7.2 kW</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>PowerAdjustmentCapability<br/><span class="attr-cn">Power Adj. Capability</span></td>
          <td>struct / null</td>
          <td>Describes the device's currently acceptable power adjustment range and time limits. <code>null</code> means the device does not currently accept power adjustments. <strong>Requires PA Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">PowerAdjustmentCapability Structure</div>
    <p>
      This attribute is a composite structure containing <code>powerAdjustCapability</code> (power adjustment capability list) and <code>cause</code> (reason).
      Each entry in the list defines an adjustment range: <code>minPower</code> / <code>maxPower</code> (power range) and <code>minDuration</code> / <code>maxDuration</code> (time range).
      The device can provide multiple non-contiguous power adjustment intervals. When sending a PowerAdjustRequest, parameters must fall within one of these intervals.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Forecast & Optimization (0x0006-0x0007) ====== -->
  <h3 id="group-forecast">Forecast &amp; Optimization (0x0006-0x0007)</h3>
  <p>The device's energy forecast plan and user opt-out state. Forecast is the most critical data structure in DEM.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>Forecast<br/><span class="attr-cn">Energy Forecast</span></td>
          <td>struct / null</td>
          <td>The device's predicted plan for future energy consumption or production. Contains multiple time Slots, each defining a time period and power parameters. <code>null</code> means no forecast is available. <strong>Requires PFR or SFR Feature</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>OptOutState<br/><span class="attr-cn">Opt-Out State</span></td>
          <td>OptOutStateEnum</td>
          <td>Whether the user has opted out of energy optimization. See enum below</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Forecast Structure Details</div>
    <p>
      Forecast contains the following key fields:<br/>
      <code>forecastID</code> -- unique forecast identifier, incremented on each update<br/>
      <code>activeSlotNumber</code> -- currently executing Slot number (<code>null</code> means not yet started)<br/>
      <code>startTime</code> / <code>endTime</code> -- start and end time of the entire forecast<br/>
      <code>slots</code> -- list of time segments, each Slot contains <code>minDuration</code>, <code>maxDuration</code>, <code>defaultDuration</code>,
      <code>nominalPower</code> (nominal power), <code>minPower</code>, <code>maxPower</code> and other parameters
    </p>
  </div>

  <h4>OptOutStateEnum Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoOptOut</span>
        <span class="enum-desc">No opt-out -- accepts all optimization requests</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LocalOptOut</span>
        <span class="enum-desc">Local opt-out -- rejects LocalOptimization type requests</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">GridOptOut</span>
        <span class="enum-desc">Grid opt-out -- rejects GridOptimization type requests</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OptOut</span>
        <span class="enum-desc">Full opt-out -- rejects all optimization requests</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Impact of OptOutState</div>
    <p>
      When the user sets <code>OptOutState</code> to opt out, the device rejects the corresponding type of commands from the EMS.
      The EMS should check this attribute before sending commands to avoid sending requests that are guaranteed to fail.
      In <code>OptOut (3)</code> state, all commands except <code>CancelPowerAdjustRequest</code> and <code>CancelRequest</code> are rejected.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The DeviceEnergyManagement Cluster declares the device's supported energy management capabilities via <code>FeatureMap</code> (0xFFFC). Different Feature combinations determine the available commands and attributes:</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PA（PowerAdjustment）</span>
        <span class="enum-desc">Power adjustment -- supports PowerAdjustRequest / CancelPowerAdjustRequest commands, provides PowerAdjustmentCapability attribute</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">PFR（PowerForecastReporting）</span>
        <span class="enum-desc">Power forecast reporting -- device reports Forecast in power units (each Slot contains power parameters)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SFR（StateForecastReporting）</span>
        <span class="enum-desc">State forecast reporting -- device reports Forecast in operating states (each Slot describes an operating phase)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">STA（StartTimeAdjustment）</span>
        <span class="enum-desc">Start time adjustment -- supports StartTimeAdjustRequest command, allows EMS to defer or advance device startup</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PAU（Pausable）</span>
        <span class="enum-desc">Pausable -- supports PauseRequest / ResumeRequest commands, device can pause during operation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">FA（ForecastAdjustment）</span>
        <span class="enum-desc">Forecast adjustment -- supports ModifyForecastRequest command, allows EMS to directly modify forecast parameters</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">CON（ConstraintBasedAdjustment）</span>
        <span class="enum-desc">Constraint-based adjustment -- supports RequestConstraintBasedForecast command, allows EMS to provide constraints for the device to self-optimize</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">PFR and SFR are Mutually Exclusive</div>
    <p>
      <strong>PFR</strong> (PowerForecastReporting) and <strong>SFR</strong> (StateForecastReporting) are mutually exclusive -- a device can only choose one forecast reporting mode.
      PFR is suitable for devices with continuously adjustable power (e.g. EVSE), while SFR is suitable for devices that run fixed programs (e.g. washing machines, dishwashers).
      The FA and CON Features require at least one of PFR or SFR as a prerequisite.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of the DeviceEnergyManagement Cluster for an online EVSE (EV charger):</p>

  <pre><code>{
  // --- ESA Basic Info ---
  "0x0000": 0,              // ESAType = EVSE (EV charger)
  "0x0001": false,          // ESACanGenerate = false (consumes only, does not generate)
  "0x0002": 1,              // ESAState = Online (running)

  // --- Power Range ---
  "0x0003": 0,              // AbsMinPower = 0 mW (can completely stop consuming)
  "0x0004": 7200000,        // AbsMaxPower = 7200000 mW (max 7.2 kW)

  // --- Power Adjustment Capability ---
  "0x0005": {               // PowerAdjustmentCapability
    "powerAdjustCapability": [
      {
        "minPower": 1400000,       // Min adjustable power 1.4 kW
        "maxPower": 7200000,       // Max adjustable power 7.2 kW
        "minDuration": 60,         // Min adjustment duration 60 seconds
        "maxDuration": 28800       // Max adjustment duration 8 hours
      }
    ],
    "cause": 0                     // NoRateChange (no rate change trigger)
  },

  // --- Forecast ---
  "0x0006": {               // Forecast
    "forecastID": 1,
    "activeSlotNumber": 0,
    "startTime": 1700000000,
    "endTime": 1700028800,
    "slots": [
      {
        "minDuration": 3600,
        "maxDuration": 7200,
        "defaultDuration": 5400,
        "nominalPower": 7200000,
        "minPower": 1400000,
        "maxPower": 7200000
      }
    ]
  },

  // --- Opt-Out State ---
  "0x0007": 0               // OptOutState = NoOptOut (not opted out of any optimization)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      All power values are in milliwatts (mW); divide by 1000 to get watts (W), and by another 1000 to get kilowatts (kW).
      <code>Forecast</code> and <code>PowerAdjustmentCapability</code> are composite structures that require recursive parsing of nested fields.
      A <code>null</code> value means the capability is currently unavailable -- for example, PowerAdjustmentCapability may be null when the device is in Offline state.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: EVSE Time-of-Use Charging -- Off-Peak Cost Reduction</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>ESAType (0x0000)</code> to confirm it is an EVSE device; read <code>ESAState (0x0002)</code> to confirm it is <code>Online (1)</code></li>
        <li>Read <code>PowerAdjustmentCapability (0x0005)</code> to get the adjustable power range (e.g. 1.4 kW ~ 7.2 kW)</li>
        <li>During peak pricing (18:00-22:00): send <code>PowerAdjustRequest(Power=1400000, Duration=14400, Cause=1)</code> to reduce to minimum power</li>
        <li>Subscribe to <code>ESAState</code> and confirm it changes to <code>PowerAdjustActive (3)</code></li>
        <li>After peak ends: send <code>CancelPowerAdjustRequest</code> to resume full-speed charging, or wait for the Duration to expire for automatic restoration</li>
        <li>Subscribe to <code>Forecast (0x0006)</code> changes throughout to monitor charging progress and estimated completion time</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Dishwasher Delayed Start -- Utilizing Off-Peak Rates</summary>
    <div class="scenario-content">
      <ol>
        <li>The user sets the dishwasher to run; the device reports a <code>Forecast</code> showing it plans to start immediately</li>
        <li>The EMS checks the electricity rate schedule and finds that off-peak rates begin after 23:00</li>
        <li>Send <code>StartTimeAdjustRequest(RequestedStartTime=UTC timestamp for 23:00, Cause=0)</code> to defer startup</li>
        <li>The dishwasher automatically starts the wash cycle at 23:00; <code>activeSlotNumber</code> in <code>Forecast</code> begins updating</li>
        <li>If the user needs the dishwasher sooner, check <code>OptOutState</code>; the user can opt out via the device panel, or the EMS can send <code>CancelRequest</code> to cancel the delay</li>
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
};
