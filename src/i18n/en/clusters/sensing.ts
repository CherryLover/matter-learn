import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'temperature-measurement': {
    title: 'TemperatureMeasurement Cluster (0x0402)',
    description: 'Complete reference for the Matter TemperatureMeasurement Cluster (0x0402) — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance attribute definitions, 0.01°C unit conversion, temperature sensor data reading, and application scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>TemperatureMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0402</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    TemperatureMeasurement is one of the simplest sensor Clusters — it has only <strong>4 Attributes</strong> and no Commands.
    The device acts as a Server, passively reporting temperature data, while the App (Client) simply reads or subscribes.
    Commonly found on temperature/humidity sensors, thermostats, and HVAC panels.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Temperature Unit Pitfall: 0.01°C</div>
    <p>
      All temperature Attribute values are in units of <strong>0.01°C</strong>. A device returning <code>2550</code> means an actual temperature of <code>25.50°C</code>;
      returning <code>-500</code> means <code>-5.00°C</code>.
      <strong>You must divide by 100 before displaying</strong>, otherwise users will see "2550 degrees".
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Meaning of null Values</div>
    <p>
      <code>MeasuredValue</code>, <code>MinMeasuredValue</code>, and <code>MaxMeasuredValue</code> are all Nullable.
      A <code>null</code> return means the data is currently invalid or the sensor has not yet completed a measurement. The App should display "--" rather than 0.
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>TemperatureMeasurement has only four Attributes, of which <code>MeasuredValue</code> is the most commonly used. Click an Attribute ID to jump to its detailed description.</p>

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
          <td>MeasuredValue</td>
          <td>int16</td>
          <td>Read-only</td>
          <td>Current temperature (unit: 0.01°C), Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>int16</td>
          <td>Read-only</td>
          <td>Minimum measurable temperature, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>int16</td>
          <td>Read-only</td>
          <td>Maximum measurable temperature, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement tolerance (unit: 0.01°C)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attr-details">Attributes</h2>

  <h3 id="attr-0x00">MeasuredValue (Current Measured Temperature)</h3>
  <p>
    The most recently measured temperature from the sensor, in units of 0.01°C. This is the most important Attribute of the entire Cluster.
  </p>
  <ul>
    <li><strong>Type</strong>: int16 (signed, supports negative temperatures)</li>
    <li><strong>Range</strong>: -27315 (-273.15°C, absolute zero) to 32767 (327.67°C)</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the sensor data is invalid or the first measurement has not yet completed</li>
    <li><strong>Conversion</strong>: <code>Actual temperature = MeasuredValue / 100</code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">Common Values Quick Reference</div>
    <p>
      <code>0</code> = 0.00°C &nbsp;|&nbsp;
      <code>2000</code> = 20.00°C &nbsp;|&nbsp;
      <code>2550</code> = 25.50°C &nbsp;|&nbsp;
      <code>3700</code> = 37.00°C &nbsp;|&nbsp;
      <code>-1000</code> = -10.00°C
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue (Minimum Measurable Temperature)</h3>
  <p>
    The lowest temperature the sensor can measure, in units of 0.01°C. The App can use this to set the lower bound of the temperature display range, or to determine whether the current reading has reached the minimum.
  </p>
  <ul>
    <li><strong>Type</strong>: int16, Nullable</li>
    <li><strong>Range</strong>: -27315 to MaxMeasuredValue - 1</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined a lower limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue (Maximum Measurable Temperature)</h3>
  <p>
    The highest temperature the sensor can measure, in units of 0.01°C. When <code>MeasuredValue</code> approaches this upper limit, it may indicate the sensor has exceeded its normal operating range.
  </p>
  <ul>
    <li><strong>Type</strong>: int16, Nullable</li>
    <li><strong>Range</strong>: MinMeasuredValue + 1 to 32767</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined an upper limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">Tolerance (Measurement Tolerance)</h3>
  <p>
    The measurement tolerance of the sensor, in units of 0.01°C. For example, a value of <code>50</code> means a measurement accuracy of <strong>&plusmn;0.50°C</strong>.
    This Attribute is optional and not all devices report it.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16 (unsigned, tolerance cannot be negative)</li>
    <li><strong>Range</strong>: 0 to 2048 (i.e., 0 to &plusmn;20.48°C)</li>
  </ul>
  <div class="callout callout-info">
    <div class="callout-title">Practical Use of Tolerance</div>
    <p>
      If the sensor reports <code>MeasuredValue = 2550</code> (25.50°C) and <code>Tolerance = 50</code> (&plusmn;0.50°C),
      the actual temperature is between 25.00°C and 26.00°C. When setting up temperature threshold automations, you should factor in the tolerance to avoid frequent triggering near the threshold.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    TemperatureMeasurement is a <strong>read-only Server Cluster</strong> with no Commands.
    The device is responsible for collecting temperature data and updating Attributes; the App only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the TemperatureMeasurement Cluster Attributes from a temperature/humidity sensor:</p>
  <pre><code>{
  // --- TemperatureMeasurement Cluster (Endpoint 1) ---
  "0x0": 2550,       // MeasuredValue = 2550 → actual 25.50°C
  "0x1": -1000,      // MinMeasuredValue = -1000 → actual -10.00°C
  "0x2": 6000,       // MaxMeasuredValue = 6000 → actual 60.00°C
  "0x3": 50          // Tolerance = 50 → actual ±0.50°C
}</code></pre>

  <p>Read request example — retrieve all Cluster Attributes at once:</p>
  <pre><code>{
  // Read all Attributes of the temperature sensor
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0402"
      // No attributeId specified → read all Attributes of this Cluster
    }
  }]
}</code></pre>

  <p>Subscribe to temperature changes — track temperature updates in real time:</p>
  <pre><code>{
  // Subscribe to temperature changes (report every 30 seconds to 5 minutes)
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0402",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 30,        // Report at least every 30 seconds
    "maxIntervalCeiling": 300      // Report at most every 5 minutes
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Temperature Conversion Code Reference</div>
    <p>
      Key logic for processing device return values:
    </p>
    <pre><code>{\`// Device returns MeasuredValue = 2550
val rawValue: Int? = 2550    // Nullable, may be null
val tempCelsius = rawValue?.let { it / 100.0 }  // → 25.50°C
val tempFahrenheit = tempCelsius?.let { it * 9.0 / 5.0 + 32 }  // → 77.90°F

// Handle null when displaying
val display = tempCelsius?.let { String.format("%.1f°C", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Reading the Current Temperature</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>MeasuredValue (0x00)</code> — first check whether it is <code>null</code></li>
        <li>Divide by 100 to convert to Celsius: <code>2550 → 25.50°C</code></li>
        <li>If Fahrenheit is needed, apply another conversion: <code>°F = °C × 9/5 + 32</code></li>
        <li>Optional: Read <code>Tolerance (0x03)</code> to assess data reliability</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Displaying a Temperature Card on the App Home Screen</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x00)</code> with a reasonable reporting interval (e.g., 30 seconds to 5 minutes)</li>
        <li>Divide the received value by 100 and display with one decimal place (e.g., <code>25.5°C</code>)</li>
        <li>Handle <code>null</code> values — display "--" or "Sensor offline", do not show 0°C</li>
        <li>Optional: Read <code>MinMeasuredValue</code> / <code>MaxMeasuredValue</code> to determine the sensor range and alert on anomalies</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Temperature Threshold Automation</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x00)</code> to continuously monitor temperature changes</li>
        <li>Factor in <code>Tolerance</code> when setting thresholds — if tolerance is &plusmn;0.5°C and the threshold is set to 30°C, the actual trigger range is 29.5°C to 30.5°C</li>
        <li>Add debounce logic: when temperature fluctuates near the threshold, require N consecutive readings above the threshold before triggering, to avoid frequently toggling AC/fans</li>
        <li>Combine with the Thermostat Cluster (0x0201) for closed-loop control: the temperature sensor reports room temperature, the thermostat adjusts the setpoint</li>
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
  .scenario-temp-note {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  :global(.dark) .scenario-temp-note {
    color: #9ca3af;
  }
</style>`,
  },
  'relative-humidity-measurement': {
    title: 'RelativeHumidityMeasurement Cluster (0x0405)',
    description: 'Complete reference for the Matter RelativeHumidityMeasurement Cluster (0x0405) — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance attribute definitions, 0.01% RH unit conversion, humidity sensor data reading, and automation scenarios.',
    prev: { title: 'Thermostat', slug: 'thermostat' },
    next: undefined,
    content: `<h1>RelativeHumidityMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0405</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    RelativeHumidityMeasurement reports the relative humidity value measured by the device.
    This Cluster is <strong>read-only</strong> — it has no Commands, only 4 Attributes, and its structure is identical to TemperatureMeasurement.
    Commonly found on humidity sensors, temperature/humidity meters, and climate-controlled enclosures.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Humidity Unit Pitfall</div>
    <p>
      All humidity Attribute values are in units of <strong>0.01% RH</strong> (one hundredth of a percent relative humidity).
      For example, a device returning <code>6500</code> means an actual humidity of <strong>65.00% RH</strong>.
      The valid range is <code>0</code> to <code>10000</code>, corresponding to 0% to 100% RH.
      A value of <code>null</code> indicates the current measurement is invalid or unknown.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>RelativeHumidityMeasurement has only 4 Attributes, of which MeasuredValue is mandatory. Click an Attribute ID to jump to its detailed description.</p>

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
          <td>MeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Current measured humidity (0.01% RH)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Minimum measurable humidity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Maximum measurable humidity</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement accuracy/tolerance (0.01% RH)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">MeasuredValue (Current Measured Humidity)</h3>
  <p>
    The current relative humidity value measured by the device sensor, in units of 0.01% RH.
    The valid range is between <code>MinMeasuredValue</code> and <code>MaxMeasuredValue</code>.
    A value of <code>null</code> indicates the sensor is temporarily unable to provide a valid reading (e.g., sensor failure or initialization in progress).
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Conversion Formula</div>
    <p>
      <code>Actual humidity = MeasuredValue / 100</code><br/>
      For example: <code>6500 / 100 = 65.00% RH</code>, <code>3275 / 100 = 32.75% RH</code>
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue (Minimum Measurable Humidity)</h3>
  <p>
    The minimum relative humidity value the sensor can measure, in units of 0.01% RH.
    This represents the hardware capability lower limit — <code>MeasuredValue</code> will not fall below this value.
    A value of <code>null</code> indicates the minimum is undefined. Range: <code>0</code> to <code>9999</code> (0% to 99.99% RH).
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue (Maximum Measurable Humidity)</h3>
  <p>
    The maximum relative humidity value the sensor can measure, in units of 0.01% RH.
    <code>MeasuredValue</code> will not exceed this value.
    A value of <code>null</code> indicates the maximum is undefined. Range: <code>1</code> to <code>10000</code> (0.01% to 100% RH), and must be greater than <code>MinMeasuredValue</code>.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">Tolerance (Measurement Tolerance)</h3>
  <p>
    The measurement accuracy of the sensor, in units of 0.01% RH. Represents the maximum deviation between the actual value and the reported value.
    For example, <code>Tolerance = 200</code> means an accuracy of &#177;2.00% RH.
    Range: <code>0</code> to <code>2048</code> (0% to 20.48% RH). This is an optional Attribute and not all devices support it.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the RelativeHumidityMeasurement Cluster Attributes from a temperature/humidity sensor:</p>

  <pre><code>{
  // --- Humidity Measurement ---
  "0x0": 6500,          // MeasuredValue = 6500 → actual 65.00% RH
  "0x1": 0,             // MinMeasuredValue = 0 → 0.00% RH
  "0x2": 10000,         // MaxMeasuredValue = 10000 → 100.00% RH
  "0x3": 200            // Tolerance = 200 → ±2.00% RH
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">Data Interpretation</div>
    <p>
      The example above indicates: current humidity <strong>65.00% RH</strong>, sensor range 0% to 100%, accuracy &#177;2.00%.
      When displaying in the App, simply read <code>MeasuredValue</code> and divide by 100. If the value is <code>null</code>,
      the UI should show "--" or "No data available" rather than 0.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Reading and Displaying Current Humidity</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>MeasuredValue (0x00)</code>, handling <code>null</code> (sensor not ready or faulty)</li>
        <li>Divide by 100 to get the actual percentage, keeping two decimal places</li>
        <li>Optionally read <code>Tolerance (0x03)</code> to display accuracy information on the detail page (e.g., "&#177;2%")</li>
        <li>Subscribe to <code>MeasuredValue</code> change notifications to update the UI in real time</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Comfort Zone Automation</summary>
    <div class="scenario-content">
      <ol>
        <li>Define the comfort humidity range, e.g., 40% to 60% RH (corresponding to raw values 4000 to 6000)</li>
        <li>Subscribe to <code>MeasuredValue</code> changes; when humidity drops below 4000, trigger the humidifier to turn on</li>
        <li>Turn off the humidifier when humidity returns above 5000 (with hysteresis to avoid frequent toggling)</li>
        <li>Combine with temperature data from the TemperatureMeasurement Cluster for comprehensive comfort assessment</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Dehumidifier Linked Control</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>MaxMeasuredValue (0x02)</code> to confirm the sensor range covers high-humidity scenarios</li>
        <li>Set a dehumidification threshold (e.g., 70% RH = 7000); when <code>MeasuredValue</code> exceeds the threshold, activate dehumidification</li>
        <li>Stop after the dehumidification target reaches 55% RH (5500), with hysteresis to prevent repeated start/stop cycles</li>
        <li>Use the <code>Tolerance</code> Attribute to evaluate measurement precision — if tolerance is large (e.g., &#177;5%), threshold settings should be more conservative</li>
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
  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'pressure-measurement': {
    title: 'PressureMeasurement Cluster (0x0403)',
    description: 'Complete reference for the Matter PressureMeasurement Cluster (0x0403) — MeasuredValue / Tolerance / EXT extended precision attributes, kPa unit explanation, weather station and HVAC pressure monitoring scenarios.',
    prev: { title: 'TemperatureMeasurement', slug: 'temperature-measurement' },
    next: undefined,
    content: `<h1>PressureMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0403</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    PressureMeasurement reports the pressure value measured by an atmospheric/barometric pressure sensor.
    This Cluster is <strong>read-only</strong> — it has no Commands. The device acts as a Server, passively reporting data, while the App (Client) simply reads or subscribes.
    Commonly found on weather stations, temperature/humidity/barometer combos, and HVAC systems.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">The Unit is kPa, Not hPa!</div>
    <p>
      The unit of <code>MeasuredValue</code> is <strong>kPa</strong> (kilopascal), not the hPa (hectopascal) commonly used in meteorology.
      Standard atmospheric pressure ≈ <strong>101.325 kPa = 1013.25 hPa</strong>, so the device returns values around <code>101</code>.
      To display in hPa, <strong>multiply by 10</strong>: <code>101 kPa × 10 = 1010 hPa</code>.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Meaning of null Values</div>
    <p>
      <code>MeasuredValue</code>, <code>MinMeasuredValue</code>, and <code>MaxMeasuredValue</code> are all Nullable.
      A <code>null</code> return means the sensor data is invalid or a measurement has not yet completed. The App should display "--" rather than 0.
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>PressureMeasurement defines one optional Feature for providing higher-precision pressure data.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>Name</th>
          <th>Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>Extended</td>
          <td><code>EXT</code></td>
          <td>Extended precision — enables high-precision Attributes such as ScaledValue</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">What Is the EXT Feature For?</div>
    <p>
      The base Attribute <code>MeasuredValue</code> is an int16 type with a unit of kPa, providing only 1 kPa precision.
      This is too coarse for meteorological applications — weather-related pressure fluctuations are typically only a few hPa (fractions of a kPa).
      With EXT enabled, the device can provide pressure values at arbitrary precision through <code>ScaledValue</code> + <code>Scale</code> (exponent).
    </p>
  </div>

  <!-- ====== Base Attributes ====== -->
  <h2 id="attributes">Base Attributes</h2>
  <p>The following 4 Attributes are supported by all PressureMeasurement devices. Click an Attribute ID to jump to its detailed description.</p>

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
          <td>MeasuredValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>Current pressure (unit: kPa), Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>Minimum measurable pressure, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>Maximum measurable pressure, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement tolerance (unit: kPa)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x00">MeasuredValue (Current Measured Pressure)</h3>
  <p>
    The most recently measured pressure from the sensor, in units of kPa. This is the most important Attribute of the entire Cluster.
  </p>
  <ul>
    <li><strong>Type</strong>: int16 (signed), Nullable</li>
    <li><strong>Range</strong>: -32767 to 32767 kPa</li>
    <li><strong>Conversion</strong>: <code>hPa = MeasuredValue × 10</code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">Common Values Quick Reference</div>
    <p>
      <code>101</code> = 101 kPa ≈ standard atmospheric pressure &nbsp;|&nbsp;
      <code>100</code> = 1000 hPa (low pressure) &nbsp;|&nbsp;
      <code>103</code> = 1030 hPa (high pressure) &nbsp;|&nbsp;
      <code>70</code> = 700 hPa (approx. 3000m altitude)
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue (Minimum Measurable Pressure)</h3>
  <p>
    The lowest pressure the sensor can measure, in units of kPa.
    A value of <code>null</code> indicates the device has not defined a lower limit.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue (Maximum Measurable Pressure)</h3>
  <p>
    The highest pressure the sensor can measure, in units of kPa.
    A value of <code>null</code> indicates the device has not defined an upper limit.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">Tolerance (Measurement Tolerance)</h3>
  <p>
    The measurement tolerance of the sensor, in units of kPa. For example, a value of <code>1</code> means an accuracy of &plusmn;1 kPa (&plusmn;10 hPa).
    This is an optional Attribute and not all devices report it.
  </p>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Extended Attributes ====== -->
  <h2 id="ext-attributes">Extended Attributes (EXT Feature)</h2>
  <p>The following Attributes are only present when the device supports the <code>EXT</code> Feature, providing higher precision than the base kPa integer values.</p>

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
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>ScaledValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>High-precision pressure value, requires Scale for conversion</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>MinScaledValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>Minimum value of ScaledValue, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>MaxScaledValue</td>
          <td>int16 / null</td>
          <td>Read-only</td>
          <td>Maximum value of ScaledValue, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>ScaledTolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement tolerance for ScaledValue</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>Scale</td>
          <td>int8</td>
          <td>Read-only</td>
          <td>Exponent factor: actual value = ScaledValue &times; 10<sup>Scale</sup> kPa</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x10">ScaledValue (High-Precision Pressure Value)</h3>
  <p>
    The high-precision pressure measurement, which requires the <code>Scale</code> Attribute for conversion:
  </p>
  <p><strong>Actual pressure = ScaledValue &times; 10<sup>Scale</sup> kPa</strong></p>
  <div class="callout callout-tip">
    <div class="callout-title">Conversion Example</div>
    <p>
      <code>ScaledValue = 10132</code>, <code>Scale = -1</code><br/>
      Actual pressure = 10132 &times; 10<sup>-1</sup> = <strong>1013.2 hPa = 101.32 kPa</strong><br/><br/>
      <code>ScaledValue = 101325</code>... impossible, int16 max is 32767.
      So the choice of Scale determines the trade-off between precision and range — <code>Scale = -1</code> gives 0.1 kPa (1 hPa) precision,
      <code>Scale = -2</code> gives 0.01 kPa precision but reduces the range to &plusmn;327.67 kPa.
    </p>
  </div>
  <p class="back-link"><a href="#ext-attributes">&#8593; Back to Extended Attributes</a></p>

  <h3 id="attr-0x11">MinScaledValue / <span id="attr-0x12">MaxScaledValue</span></h3>
  <p>
    The valid range bounds for <code>ScaledValue</code>, corresponding to the Min/Max of the base Attributes.
    Both are Nullable; <code>null</code> indicates undefined. Conversion is the same as ScaledValue (multiply by 10<sup>Scale</sup>).
  </p>
  <p class="back-link"><a href="#ext-attributes">&#8593; Back to Extended Attributes</a></p>

  <h3 id="attr-0x13">ScaledTolerance (Extended Tolerance)</h3>
  <p>
    The measurement tolerance for <code>ScaledValue</code>, converted the same way.
    For example, <code>ScaledTolerance = 10</code> with <code>Scale = -1</code> means an accuracy of &plusmn;1 hPa.
  </p>
  <p class="back-link"><a href="#ext-attributes">&#8593; Back to Extended Attributes</a></p>

  <h3 id="attr-0x14">Scale (Exponent Factor)</h3>
  <p>
    An int8 exponent value that determines the actual precision of the ScaledValue family of Attributes.
    Common values:
  </p>
  <ul>
    <li><code>0</code> — same as the base Attributes, unit kPa, no additional precision</li>
    <li><code>-1</code> — precision 0.1 kPa (= 1 hPa), most commonly used</li>
    <li><code>-2</code> — precision 0.01 kPa (= 0.1 hPa), for high-precision weather stations</li>
  </ul>
  <p class="back-link"><a href="#ext-attributes">&#8593; Back to Extended Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    PressureMeasurement is a <strong>read-only Server Cluster</strong> with no Commands.
    The device is responsible for collecting pressure data and updating Attributes; the App only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the PressureMeasurement base Attributes from a weather station device:</p>
  <pre><code>{
  // --- PressureMeasurement Cluster (Endpoint 1) ---
  "0x0": 101,         // MeasuredValue = 101 → actual 101 kPa (≈ standard atmospheric pressure)
  "0x1": 30,          // MinMeasuredValue = 30 → 30 kPa
  "0x2": 110,         // MaxMeasuredValue = 110 → 110 kPa
  "0x3": 1            // Tolerance = 1 → ±1 kPa
}</code></pre>

  <p>Devices supporting the EXT Feature also return extended Attributes:</p>
  <pre><code>{
  // --- Extended precision Attributes (requires EXT Feature) ---
  "0x10": 10132,      // ScaledValue = 10132, Scale = -1 → 10132 × 10⁻¹ = 1013.2 kPa?
                       // No, Scale is for subdivision: 10132 × 10⁻¹ = 1013.2 hPa = 101.32 kPa
  "0x11": 3000,       // MinScaledValue = 3000
  "0x12": 11000,      // MaxScaledValue = 11000
  "0x13": 10,         // ScaledTolerance = 10
  "0x14": -1          // Scale = -1 (exponent)
  // Actual value = ScaledValue × 10^Scale kPa = 10132 × 0.1 = 1013.2 hPa
}</code></pre>

  <p>Subscribe to pressure changes — track pressure trends in real time:</p>
  <pre><code>{
  // Subscribe to pressure changes (report every 60 seconds to 10 minutes)
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0403",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 60,        // Report at least every 60 seconds
    "maxIntervalCeiling": 600      // Report at most every 10 minutes
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Unit Conversion Code Reference</div>
    <p>Key logic for processing device return values:</p>
    <pre><code>{\`// Base Attribute: MeasuredValue in kPa
val rawKpa: Int? = 101               // Nullable
val hPa = rawKpa?.let { it * 10.0 }  // → 1010.0 hPa
val display = hPa?.let { "%.0f hPa".format(it) } ?: "--"

// EXT extended Attributes: ScaledValue + Scale
val scaled: Int? = 10132
val scale: Int = -1
val actualKpa = scaled?.let { it * Math.pow(10.0, scale.toDouble()) }  // → 1013.2 hPa
val displayExt = actualKpa?.let { "%.1f hPa".format(it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Weather Station — Pressure Trend Monitoring</summary>
    <div class="scenario-content">
      <ol>
        <li>Check if the device's FeatureMap includes <code>EXT</code> (bit 0); if so, prefer <code>ScaledValue</code> for high-precision data</li>
        <li>Subscribe to pressure changes and record historical data to plot trend graphs</li>
        <li>A sustained pressure drop (&gt; 3 hPa in 3 hours) typically indicates worsening weather; push a notification</li>
        <li>Display in hPa (meteorological convention); for base Attributes, simply use <code>MeasuredValue × 10</code></li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Altitude Estimation</summary>
    <div class="scenario-content">
      <ol>
        <li>Use the relationship between pressure and altitude for a rough estimation (barometric altimetry)</li>
        <li>International Standard Atmosphere approximation: <code>Altitude(m) ≈ 44330 × (1 - (P/P₀)^0.1903)</code>, P₀ = 101.325 kPa</li>
        <li>Accuracy is significantly affected by temperature, humidity, and weather systems — use as a reference only</li>
        <li>Use the EXT extended Attributes for more accurate pressure values to improve altitude estimation</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: HVAC Pressure Monitoring</summary>
    <div class="scenario-content">
      <ol>
        <li>Cleanrooms, laboratories, and similar environments require monitoring of indoor/outdoor pressure differentials</li>
        <li>Subscribe to <code>MeasuredValue</code> and set positive/negative pressure thresholds</li>
        <li>Trigger an alarm or automatically adjust the fresh air system when the pressure differential is abnormal</li>
        <li>Combine with TemperatureMeasurement (0x0402) and RelativeHumidityMeasurement (0x0405) for comprehensive environmental monitoring</li>
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
  'illuminance-measurement': {
    title: 'IlluminanceMeasurement Cluster (0x0400)',
    description: 'Complete reference for the Matter IlluminanceMeasurement Cluster (0x0400) — MeasuredValue logarithmic conversion, MinMeasuredValue / MaxMeasuredValue / Tolerance / LightSensorType attribute definitions, lux conversion formula, and light sensor application scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>IlluminanceMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0400</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    IlluminanceMeasurement reports the ambient light intensity (in lux).
    This is a <strong>read-only Server Cluster</strong> — it has no Commands, only <strong>5 Attributes</strong>.
    Commonly found on light sensors, multi-function environmental sensors, and smart curtain controllers.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Key Pitfall: Logarithmic Scale, Not Linear</div>
    <p>
      <code>MeasuredValue</code> is not the direct lux value, but an integer after <strong>logarithmic transformation</strong>:
    </p>
    <p style="text-align: center; font-size: 1.125rem;">
      <code>MeasuredValue = 10000 &times; log<sub>10</sub>(lux) + 1</code>
    </p>
    <p>
      Reverse conversion (the App must perform this):
    </p>
    <p style="text-align: center; font-size: 1.125rem;">
      <code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code>
    </p>
    <p>
      For example, a device returning <code>10001</code> means an actual illuminance of <strong>10 lux</strong>, not over ten thousand lux.
      Displaying the raw value would mislead users into thinking the brightness is extremely high. <strong>You must apply the logarithmic reverse conversion before displaying</strong>.
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Common MeasuredValue Quick Reference</div>
    <p>
      <code>1</code> = 1 lux (moonlight) &nbsp;|&nbsp;
      <code>10001</code> = 10 lux (dim hallway) &nbsp;|&nbsp;
      <code>20001</code> = 100 lux (typical indoor) &nbsp;|&nbsp;
      <code>30001</code> = 1000 lux (overcast outdoor) &nbsp;|&nbsp;
      <code>40001</code> = 10000 lux (sunny outdoor)
    </p>
    <p>
      A value of <code>0</code> means the illuminance is below the sensor's measurable minimum; <code>null</code> means the sensor has not completed a measurement or the data is invalid — the App should display "--".
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>IlluminanceMeasurement has 5 Attributes, of which <code>MeasuredValue</code> is the most important. Click an Attribute ID to jump to its detailed description.</p>

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
          <td>MeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Current illuminance (logarithmic scale), Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Minimum measurable illuminance, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16 / null</td>
          <td>Read-only</td>
          <td>Maximum measurable illuminance, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement tolerance (logarithmic scale)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LightSensorType</td>
          <td>enum8 / null</td>
          <td>Read-only</td>
          <td>Sensor type, Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attr-details">Attributes</h2>

  <h3 id="attr-0x00">MeasuredValue (Current Illuminance)</h3>
  <p>
    The most recently measured light intensity from the sensor, <strong>encoded on a logarithmic scale</strong>. This is the most important Attribute of the entire Cluster.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16, Nullable</li>
    <li><strong>Valid range</strong>: <code>1</code> to <code>65534</code> (corresponding to approximately 1 lux to 3.5 &times; 10<sup>6</sup> lux)</li>
    <li><strong>Special values</strong>: <code>0</code> = illuminance below the measurable minimum; <code>null</code> = data invalid or measurement not completed</li>
    <li><strong>Conversion</strong>: <code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">Conversion Code Reference</div>
    <pre><code>{\`// Device returns MeasuredValue
val rawValue: Int? = 10001    // Nullable, may be null
val lux = when {
    rawValue == null -> null           // Sensor not ready
    rawValue == 0    -> 0.0            // Below measurable minimum
    else -> Math.pow(10.0, (rawValue - 1).toDouble() / 10000.0)
}
// rawValue = 10001 → lux = 10.0
// rawValue = 20001 → lux = 100.0
// rawValue = 30001 → lux = 1000.0

// Handle null and precision when displaying
val display = lux?.let { String.format("%.0f lux", it) } ?: "--"\`}</code></pre>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue (Minimum Measurable Illuminance)</h3>
  <p>
    The minimum illuminance value the sensor can measure (logarithmic scale encoded). When <code>MeasuredValue</code> is <code>0</code>,
    it indicates the actual illuminance is below this lower limit.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16, Nullable</li>
    <li><strong>Range</strong>: <code>1</code> to <code>65533</code></li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined a lower limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue (Maximum Measurable Illuminance)</h3>
  <p>
    The maximum illuminance value the sensor can measure (logarithmic scale encoded).
    <code>MeasuredValue</code> will not exceed this value.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16, Nullable</li>
    <li><strong>Range</strong>: <code>2</code> to <code>65534</code>, and must be greater than <code>MinMeasuredValue</code></li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined an upper limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">Tolerance (Measurement Tolerance)</h3>
  <p>
    The measurement tolerance of the sensor, also on a logarithmic scale. This is an optional Attribute and not all devices report it.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16 (unsigned)</li>
    <li><strong>Range</strong>: <code>0</code> to <code>2048</code></li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x04">LightSensorType (Sensor Type)</h3>
  <p>
    Describes the type of light sensor used by the device. Different sensor types have varying spectral responses and sensitivities.
    A value of <code>null</code> indicates the sensor type is unknown.
  </p>

  <h4>LightSensorTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Photodiode</span>
        <span class="enum-desc">Photodiode — fast response, good linearity, commonly found in professional lux meters</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CMOS</span>
        <span class="enum-desc">CMOS image sensor — low cost, high integration, commonly found in multi-function sensors</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Sensor type unknown</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    IlluminanceMeasurement is a <strong>read-only Server Cluster</strong> with no Commands.
    The device is responsible for collecting light data and updating Attributes; the App only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the IlluminanceMeasurement Cluster Attributes from a light sensor:</p>
  <pre><code>{
  // --- IlluminanceMeasurement Cluster (Endpoint 1) ---
  "0x0":  10001,       // MeasuredValue = 10001 → 10 lux (typical hallway illuminance)
  "0x1":  1,           // MinMeasuredValue = 1 → 1 lux
  "0x2":  50001,       // MaxMeasuredValue = 50001 → 100000 lux
  "0x3":  0,           // Tolerance = 0 (tolerance not reported)
  "0x4":  0            // LightSensorType = Photodiode
}</code></pre>

  <p>Subscribe to illuminance changes — track light level updates in real time:</p>
  <pre><code>{
  // Subscribe to illuminance changes (report every 10 seconds to 2 minutes)
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0400",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 10,        // Report at least every 10 seconds
    "maxIntervalCeiling": 120      // Report at most every 2 minutes
  }]
}</code></pre>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Reading and Displaying Current Illuminance</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>MeasuredValue (0x00)</code>, checking for <code>null</code> (sensor not ready) and <code>0</code> (below measurable minimum)</li>
        <li>Apply logarithmic reverse conversion: <code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code></li>
        <li>Choose an appropriate display unit based on the lux value — below 1000, show as an integer (e.g., "320 lux"); above 1000, consider using "klux" (e.g., "12.5 klux")</li>
        <li>Optional: Read <code>LightSensorType (0x04)</code> to display the sensor type on the device detail page</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Automatic Curtain / Lighting Automation</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x00)</code> to continuously monitor illuminance changes</li>
        <li>Set thresholds — e.g., automatically turn on lights when below 100 lux (corresponding to MeasuredValue &asymp; 20001), and turn off when above 500 lux (corresponding to &asymp; 26990)</li>
        <li>Add hysteresis — separate the on/off thresholds to avoid repeated toggling caused by intermittent cloud cover on overcast days</li>
        <li>Combine with OccupancySensing Cluster (0x0406): only respond to illuminance changes when occupied, keep lights off when unoccupied</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Daylight Statistics and Energy Analysis</summary>
    <div class="scenario-content">
      <ol>
        <li>Periodically sample <code>MeasuredValue</code> (e.g., every 5 minutes), convert to lux, and store</li>
        <li>Generate daily illuminance curves — useful for determining room orientation and shading effectiveness</li>
        <li>Combine with dimming records from LevelControl Cluster (0x0008) to analyze natural light utilization and optimize lighting strategy</li>
        <li>The logarithmic scale is naturally suited for wide-range illuminance recording — from moonlight (1 lux) to direct sunlight (100000 lux) with precise representation</li>
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
  'flow-measurement': {
    title: 'FlowMeasurement Cluster (0x0404)',
    description: 'Complete reference for the Matter FlowMeasurement Cluster (0x0404) — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance attribute definitions, 0.1 m³/h unit conversion, liquid and gas flow sensor data reading, and application scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>FlowMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0404</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    FlowMeasurement measures the flow rate of liquids or gases. It is a read-only sensor Cluster — it has only <strong>4 Attributes</strong> and no Commands.
    The device acts as a Server, passively reporting flow data, while the App (Client) simply reads or subscribes.
    Commonly found on water flow sensors, gas flow meters, and HVAC airflow detection devices.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Flow Rate Unit Pitfall: 0.1 m³/h</div>
    <p>
      All flow rate Attribute values are in units of <strong>0.1 m³/h</strong> (cubic meters per hour). A device returning <code>150</code> means an actual flow rate of <code>15.0 m³/h</code>;
      returning <code>23</code> means <code>2.3 m³/h</code>.
      <strong>You must divide by 10 before displaying</strong>, otherwise users will see an absurd value of "150 cubic meters per hour".
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Meaning of null Values</div>
    <p>
      <code>MeasuredValue</code>, <code>MinMeasuredValue</code>, and <code>MaxMeasuredValue</code> are all Nullable.
      A <code>null</code> return means the data is currently invalid or the sensor has not yet completed a measurement. The App should display "--" rather than 0.
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>FlowMeasurement has only four Attributes, of which <code>MeasuredValue</code> is the most commonly used. Click an Attribute ID to jump to its detailed description.</p>

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
          <td>MeasuredValue</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Current flow rate (unit: 0.1 m³/h), Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Minimum measurable flow rate, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Maximum measurable flow rate, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>Read-only</td>
          <td>Measurement tolerance (unit: 0.1 m³/h)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attr-details">Attributes</h2>

  <h3 id="attr-0x00">MeasuredValue (Current Measured Flow Rate)</h3>
  <p>
    The most recently measured flow rate from the sensor, in units of 0.1 m³/h. This is the most important Attribute of the entire Cluster.
  </p>
  <ul>
    <li><strong>Type</strong>: uint16 (unsigned)</li>
    <li><strong>Range</strong>: 0 to 65534</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the sensor data is invalid or the first measurement has not yet completed</li>
    <li><strong>Conversion</strong>: <code>Actual flow rate = MeasuredValue / 10</code> (unit: m³/h)</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">Common Values Quick Reference</div>
    <p>
      <code>0</code> = 0.0 m³/h &nbsp;|&nbsp;
      <code>50</code> = 5.0 m³/h &nbsp;|&nbsp;
      <code>150</code> = 15.0 m³/h &nbsp;|&nbsp;
      <code>1000</code> = 100.0 m³/h &nbsp;|&nbsp;
      <code>5000</code> = 500.0 m³/h
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue(可测最低流量)</h3>
  <p>
    传感器能够测量的最低流量值，单位 0.1 m³/h。App 可以用它来设置流量显示范围的下限，或判断当前读数是否已经触底。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: 0 到 MaxMeasuredValue - 1</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义下限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue(可测最高流量)</h3>
  <p>
    传感器能够测量的最高流量值，单位 0.1 m³/h。当 <code>MeasuredValue</code> 接近此上限时，可能意味着流量已超出传感器正常工作范围。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: MinMeasuredValue + 1 到 65534</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义上限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">Tolerance(测量容差)</h3>
  <p>
    传感器的测量精度容差，单位 0.1 m³/h。例如值为 <code>10</code>，表示测量精度为 <strong>&plusmn;1.0 m³/h</strong>。
    这个属性是可选的，不是所有设备都上报。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16（无符号，容差不会为负）</li>
    <li><strong>范围</strong>: 0 到 2048（即 0 到 &plusmn;204.8 m³/h）</li>
  </ul>
  <div class="callout callout-info">
    <div class="callout-title">Tolerance 的实际用途</div>
    <p>
      如果传感器报告 <code>MeasuredValue = 150</code>（15.0 m³/h）且 <code>Tolerance = 10</code>（&plusmn;1.0 m³/h），
      那么实际流量在 14.0 m³/h ~ 16.0 m³/h 之间。做流量阈值触发自动化时，应将容差纳入考量，避免在阈值附近频繁触发报警。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    FlowMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集流量数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一个水流量传感器的 FlowMeasurement Cluster 属性：</p>
  <pre><code>{
  // --- FlowMeasurement Cluster（Endpoint 1）---
  "0x0": 150,        // MeasuredValue = 150 → 实际 15.0 m³/h
  "0x1": 0,          // MinMeasuredValue = 0 → 实际 0.0 m³/h
  "0x2": 5000,       // MaxMeasuredValue = 5000 → 实际 500.0 m³/h
  "0x3": 10          // Tolerance = 10 → 实际 ±1.0 m³/h
}</code></pre>

  <p>读取请求示例 —— 一次性获取 Cluster 全部属性：</p>
  <pre><code>{
  // 读取流量传感器的所有属性
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0404"
      // 不指定 attributeId → 读取该 Cluster 全部属性
    }
  }]
}</code></pre>

  <p>订阅流量变化 —— 实时跟踪流量更新：</p>
  <pre><code>{
  // 订阅流量变化（每 10 秒~2 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0404",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 10,        // 最少 10 秒上报一次
    "maxIntervalCeiling": 120      // 最多 2 分钟上报一次
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">流量转换代码参考</div>
    <p>
      处理设备返回值时的关键逻辑：
    </p>
    <pre><code>{\`// 设备返回 MeasuredValue = 150
val rawValue: Int? = 150    // Nullable，可能为 null
val flowRate = rawValue?.let { it / 10.0 }  // → 15.0 m³/h
val flowLiterPerMin = flowRate?.let { it * 1000.0 / 60.0 }  // → 250.0 L/min

// 显示时处理 null
val display = flowRate?.let { String.format("%.1f m³/h", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：家庭水流监测</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，设置合理的上报间隔（如 10 秒 ~ 2 分钟）</li>
        <li>收到新值后除以 10，得到实际流量：<code>150 → 15.0 m³/h</code></li>
        <li>处理 <code>null</code> 值 —— 展示「--」或「传感器离线」，不要显示 0</li>
        <li>设定异常流量阈值 —— 例如凌晨持续检测到流量大于 0，可能存在漏水，触发报警通知</li>
        <li>可选：累计流量统计，定期读取 <code>MeasuredValue</code> 并按时间积分估算用水量</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：HVAC 风量检测</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，持续监听风管内气体流量变化</li>
        <li>读取 <code>MinMeasuredValue</code> / <code>MaxMeasuredValue</code> 确认传感器量程，判断当前风量是否在正常工作范围内</li>
        <li>考虑 <code>Tolerance</code> 容差 —— 如果容差为 &plusmn;1.0 m³/h，阈值设定时应留出裕量，避免在边界值频繁触发</li>
        <li>配合 FanControl Cluster（0x0202）实现闭环控制：流量传感器报告实际风量，风扇控制器调整转速以维持目标风量</li>
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
  'occupancy-sensing': {
    title: 'OccupancySensing Cluster (0x0406)',
    description: 'Complete reference for Matter OccupancySensing Cluster (0x0406) — Occupancy bitmap, PIR / ultrasonic / physical contact / radar sensor types, delay and threshold parameters, HoldTime configuration. A purely read-only cluster with no commands.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>OccupancySensing Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0406</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    OccupancySensing reports whether a person (or object) is present in the area where the device is located.
    Sensor types include <strong>Passive Infrared (PIR)</strong>, <strong>Ultrasonic</strong>, <strong>Physical Contact</strong>, and <strong>Radar</strong>.
    This cluster is <strong>purely read-only</strong> — it has attributes only, no commands. Apps receive real-time occupancy updates by subscribing to attribute changes.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Sensor Type Determines Behavior</div>
    <p>
      Different sensor types work very differently: PIR detects changes in body heat radiation, ultrasonic detects motion via reflected sound waves, physical contact relies on pressure sensors, and radar uses microwave signals that can penetrate walls.
      The <code>OccupancySensorType</code> attribute determines which set of delay/threshold parameters the device supports, and apps should present different configuration interfaces based on the sensor type.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>Attributes are organized into four groups: Core State, PIR Sensor Parameters, Ultrasonic Sensor Parameters, and Physical Contact Sensor Parameters. Click an attribute ID to jump to its detailed description.</p>

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
        <!-- Core State -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Occupancy</td>
          <td>bitmap8</td>
          <td><a href="#group-core">Core State</a></td>
          <td>Current occupancy status bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>OccupancySensorType</td>
          <td>enum8</td>
          <td><a href="#group-core">Core State</a></td>
          <td>Sensor type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>OccupancySensorTypeBitmap</td>
          <td>bitmap8</td>
          <td><a href="#group-core">Core State</a></td>
          <td>Sensor type bitmap (supports multiple types)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>HoldTime</td>
          <td>uint16</td>
          <td><a href="#group-core">Core State</a></td>
          <td>Occupancy state hold time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>HoldTimeLimits</td>
          <td>struct</td>
          <td><a href="#group-core">Core State</a></td>
          <td>Adjustable range for HoldTime</td>
        </tr>
        <!-- PIR Sensor -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>PIROccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-pir">PIR Sensor</a></td>
          <td>PIR occupied-to-unoccupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>PIRUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-pir">PIR Sensor</a></td>
          <td>PIR unoccupied-to-occupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>PIRUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-pir">PIR Sensor</a></td>
          <td>PIR trigger count threshold</td>
        </tr>
        <!-- Ultrasonic Sensor -->
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>UltrasonicOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-ultrasonic">Ultrasonic Sensor</a></td>
          <td>Ultrasonic occupied-to-unoccupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>UltrasonicUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-ultrasonic">Ultrasonic Sensor</a></td>
          <td>Ultrasonic unoccupied-to-occupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>UltrasonicUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-ultrasonic">Ultrasonic Sensor</a></td>
          <td>Ultrasonic trigger count threshold</td>
        </tr>
        <!-- Physical Contact Sensor -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>PhysicalContactOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-physical">Physical Contact Sensor</a></td>
          <td>Physical contact occupied-to-unoccupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>PhysicalContactUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-physical">Physical Contact Sensor</a></td>
          <td>Physical contact unoccupied-to-occupied delay (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>PhysicalContactUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-physical">Physical Contact Sensor</a></td>
          <td>Physical contact trigger count threshold</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Core State (0x00-0x04) ====== -->
  <h3 id="group-core">Core State (0x00 - 0x04)</h3>
  <p>Attributes that all OccupancySensing devices must support, describing the current occupancy state and sensor type.</p>

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
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>Occupancy</td>
          <td>bitmap8</td>
          <td>Read-only</td>
          <td>Bit 0 (SensedOccupancy): <code>1</code> = occupied, <code>0</code> = unoccupied. Remaining bits are reserved</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>OccupancySensorType</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>Primary sensor type used by the device (see enum below)</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>OccupancySensorTypeBitmap</td>
          <td>bitmap8</td>
          <td>Read-only</td>
          <td>Bitmap of all sensor types supported by the device (see bit definitions below)</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>HoldTime</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Number of seconds to maintain the "occupied" state after the last occupancy detection. Prevents frequent state toggling during brief absences</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>HoldTimeLimits</td>
          <td>struct</td>
          <td>Read-only</td>
          <td>Contains HoldTimeMin, HoldTimeMax, and HoldTimeDefault fields, describing the adjustable range of HoldTime</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Occupancy Is a Bitmap, Not a Boolean</div>
    <p>
      The type of <code>Occupancy</code> is <code>bitmap8</code>, not <code>bool</code>. Only <strong>bit 0</strong> (SensedOccupancy) indicates occupancy state; the remaining bits are reserved for future use.
      When reading, use bitwise operations: <code>isOccupied = (Occupancy &amp; 0x01) != 0</code> — do not compare directly against <code>1</code>.
    </p>
  </div>

  <h4>OccupancySensorTypeEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PIR</span>
        <span class="enum-desc">Passive Infrared — detects changes in body heat radiation; the most common type</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Ultrasonic</span>
        <span class="enum-desc">Ultrasonic — emits ultrasonic waves and detects reflection changes; suitable for detecting subtle movements</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PIRAndUltrasonic</span>
        <span class="enum-desc">PIR + Ultrasonic dual detection; higher accuracy with fewer false positives</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PhysicalContact</span>
        <span class="enum-desc">Physical Contact — pressure sensors, seat occupancy sensors, etc.</span>
      </div>
    </div>
  </div>

  <h4>OccupancySensorTypeBitmap Bit Definitions</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">bit 0</span>
      <div>
        <span class="enum-name">PIR</span>
        <span class="enum-desc">Supports passive infrared sensing</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">bit 1</span>
      <div>
        <span class="enum-name">Ultrasonic</span>
        <span class="enum-desc">Supports ultrasonic sensing</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">bit 2</span>
      <div>
        <span class="enum-name">PhysicalContact</span>
        <span class="enum-desc">Supports physical contact sensing</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">What HoldTime Does</div>
    <p>
      Imagine a meeting room occupancy sensor: someone briefly steps out to get water, and you don't want the lights to turn off immediately.
      <code>HoldTime</code> is this "grace period" — setting it to <code>30</code> seconds means the device will maintain the "occupied" state for 30 seconds after the last detection, before switching to "unoccupied."
      Apps can let users adjust this value within the <code>HoldTimeLimits</code> range.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== PIR Sensor (0x10-0x12) ====== -->
  <h3 id="group-pir">PIR Sensor Parameters (0x10 - 0x12)</h3>
  <p>
    Only relevant when <code>OccupancySensorType</code> is PIR (0) or PIRAndUltrasonic (2).
    Controls the delay and sensitivity of PIR sensor state transitions.
  </p>

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
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>PIROccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "unoccupied" after PIR no longer detects occupancy. Default <code>0</code> (immediate transition)</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>PIRUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "occupied" after PIR detects occupancy. Used to filter momentary false triggers</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>PIRUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td>Read/Write</td>
          <td>Number of occupancy events required within the delay period to trigger a state transition. Range 1~254, default <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Using Delay and Threshold Together</div>
    <p>
      For example, with <code>PIRUnoccupiedToOccupiedDelay = 10</code> and <code>PIRUnoccupiedToOccupiedThreshold = 3</code>:
      the sensor must detect 3 occupancy events within 10 seconds before transitioning from "unoccupied" to "occupied."
      This combination effectively filters false triggers from pets passing by, curtains moving, etc.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Ultrasonic Sensor (0x20-0x22) ====== -->
  <h3 id="group-ultrasonic">Ultrasonic Sensor Parameters (0x20 - 0x22)</h3>
  <p>
    Only relevant when <code>OccupancySensorType</code> is Ultrasonic (1) or PIRAndUltrasonic (2).
    Parameter semantics are fully symmetric with the PIR group.
  </p>

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
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>UltrasonicOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "unoccupied" after ultrasonic sensor no longer detects occupancy. Default <code>0</code></td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>UltrasonicUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "occupied" after ultrasonic sensor detects occupancy</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>UltrasonicUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td>Read/Write</td>
          <td>Number of occupancy events required within the delay period to trigger a state transition. Range 1~254, default <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Physical Contact Sensor (0x30-0x32) ====== -->
  <h3 id="group-physical">Physical Contact Sensor Parameters (0x30 - 0x32)</h3>
  <p>
    Only relevant when <code>OccupancySensorType</code> is PhysicalContact (3).
    Parameter semantics are fully symmetric with the PIR group.
  </p>

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
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>PhysicalContactOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "unoccupied" after physical contact sensor no longer detects occupancy. Default <code>0</code></td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>PhysicalContactUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td>Read/Write</td>
          <td>Delay in seconds before switching to "occupied" after physical contact sensor detects occupancy</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>PhysicalContactUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td>Read/Write</td>
          <td>Number of occupancy events required within the delay period to trigger a state transition. Range 1~254, default <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A typical read result from an OccupancySensing Cluster on a PIR occupancy sensor:</p>
  <pre><code>{
  // --- Core State ---
  "0x0": 1,              // Occupancy = 0b00000001 (bit 0 = 1, occupancy detected)
  "0x1": 0,              // OccupancySensorType = PIR (Passive Infrared)
  "0x2": 1,              // OccupancySensorTypeBitmap = 0b00000001 (PIR)

  // --- PIR Sensor Parameters ---
  "0x10": 0,             // PIROccupiedToUnoccupiedDelay = 0 seconds (immediate transition)
  "0x11": 10,            // PIRUnoccupiedToOccupiedDelay = 10 seconds (delayed transition)
  "0x12": 1,             // PIRUnoccupiedToOccupiedThreshold = 1 (triggers on 1 event)

  // --- Hold Time ---
  "0x3": 30,             // HoldTime = 30 seconds
  "0x4": {               // HoldTimeLimits
    "HoldTimeMin": 1,
    "HoldTimeMax": 600,
    "HoldTimeDefault": 10
  }
}</code></pre>

  <!-- ====== Usage Scenarios ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>
  <p>OccupancySensing is one of the core trigger sources for smart home automation. Below are three typical integration scenarios.</p>

  <details class="scenario">
    <summary>Scenario 1: Smart Home Automation (Lighting Control)</summary>
    <div class="scenario-content">
      <p>
        The most classic use case — lights on when someone enters, lights off when they leave.
      </p>
      <ol>
        <li>Subscribe to <code>Occupancy (0x00)</code> attribute changes</li>
        <li>When <code>Occupancy</code> bit 0 changes from <code>0</code> to <code>1</code> (someone enters), send the OnOff Cluster <code>On</code> command to turn on the lights</li>
        <li>When <code>Occupancy</code> bit 0 changes from <code>1</code> to <code>0</code> (no one present), send the <code>Off</code> command to turn off the lights</li>
        <li>Adjust <code>HoldTime</code> to control the turn-off delay — 300 seconds (5 minutes) is recommended for meeting rooms, 30 seconds for hallways</li>
      </ol>
      <p>
        <strong>Advanced</strong>: Combine with the LevelControl Cluster to set brightness to 20% at night and 100% during the day when occupancy is detected.
        You can also combine multiple sensors for zone-based automation — a hallway sensor triggers both the hallway lights and the destination room lights.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: HVAC Energy Saving Integration</summary>
    <div class="scenario-content">
      <p>
        Link occupancy sensing with the Thermostat Cluster to achieve "comfort when present, energy saving when away."
      </p>
      <ol>
        <li>Subscribe to <code>Occupancy (0x00)</code> attribute changes</li>
        <li>When occupancy is detected, set the Thermostat's <code>OccupiedCoolingSetpoint</code> / <code>OccupiedHeatingSetpoint</code> to comfort temperatures (e.g., 24°C / 22°C)</li>
        <li>When no occupancy is detected (after the <code>HoldTime</code> delay), switch to <code>UnoccupiedCoolingSetpoint</code> / <code>UnoccupiedHeatingSetpoint</code> energy-saving temperatures (e.g., 28°C / 18°C)</li>
        <li>Recommend setting <code>HoldTime</code> to 600~900 seconds (10~15 minutes) to avoid temperature changes during brief absences</li>
      </ol>
      <p>
        <strong>Note</strong>: The Thermostat Cluster itself has an Occupancy attribute (<code>0x02</code>), but it only passively receives state.
        The actual occupancy detection data comes from the OccupancySensing Cluster, typically bridged via automation rules.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Security and Intrusion Detection</summary>
    <div class="scenario-content">
      <p>
        After the user arms the system upon leaving home, occupancy sensors trigger alarms when abnormal activity is detected.
      </p>
      <ol>
        <li>The user enables "Away Mode" (armed) via the app</li>
        <li>Subscribe to <code>Occupancy (0x00)</code> changes from all occupancy sensors</li>
        <li>When <code>Occupancy</code> bit 0 = <code>1</code> is detected while armed, trigger security actions:
          <ul>
            <li>Push alarm notifications to the user's phone</li>
            <li>Start camera recording</li>
            <li>Activate sirens and strobe lights</li>
          </ul>
        </li>
        <li>To reduce false alarms, increase sensitivity requirements: <code>PIRUnoccupiedToOccupiedThreshold = 3</code>, <code>PIRUnoccupiedToOccupiedDelay = 5</code></li>
      </ol>
      <p>
        <strong>Tip</strong>: For security scenarios, PIRAndUltrasonic dual-mode sensors are recommended. PIR alone is prone to false triggers from pets; ultrasonic provides secondary confirmation.
        Also be sure to distinguish between sensors in armed zones and those in unarmed zones.
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Advice</div>
    <p>
      A typical workflow for displaying occupancy sensor state in an app:
    </p>
    <ol>
      <li>Read <code>OccupancySensorType (0x01)</code> and display the appropriate sensor type icon and name in the UI</li>
      <li>Subscribe to <code>Occupancy (0x00)</code>, use bitwise <code>&amp; 0x01</code> to extract bit 0, and show "Occupied / Unoccupied" status</li>
      <li>Based on the sensor type, only show the relevant delay/threshold settings (e.g., don't show ultrasonic parameters for a PIR device)</li>
      <li>Allow users to adjust <code>HoldTime</code> within the <code>HoldTimeLimits</code> range — a slider control is more intuitive</li>
      <li>Provide event history — record the timestamp of each occupancy state change to help users understand activity patterns</li>
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
  'air-quality': {
    title: 'AirQuality Cluster (0x005B)',
    description: 'Complete reference for Matter Air Quality Cluster (0x005B) — AirQuality attribute, AirQualityEnum value quick reference, air purifier automation and dashboard display scenarios. The foundational cluster for air quality monitoring.',
    prev: undefined,
    next: undefined,
    content: `<h1>Air Quality Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005B</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Application endpoint (typically <code>Endpoint 1</code> or the endpoint corresponding to the air quality sensor)
  </p>
  <p>
    The Air Quality Cluster provides a comprehensive air quality index as an enum value that reflects the overall air condition of the current environment.
    This is a minimal read-only cluster — it has only <strong>1 attribute</strong>, <strong>no commands</strong>, and no Feature Map.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Purpose and Companion Clusters</div>
    <p>
      Air Quality provides an overall rating level and does not include specific pollutant concentration data.
      In practice, it typically appears alongside concentration measurement clusters such as PM2.5 Concentration Measurement (<code>0x042A</code>),
      CO2 Concentration Measurement (<code>0x040D</code>), and TVOC Concentration Measurement (<code>0x042E</code>).
      Those clusters provide precise values, while Air Quality provides an at-a-glance level assessment.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>The Air Quality Cluster has only one attribute.</p>

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
          <td>AirQuality</td>
          <td>AirQualityEnum</td>
          <td>Read-only</td>
          <td>Current overall air quality level</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="attr-0x00">AirQuality (Air Quality Level)</h3>
  <p>
    A read-only attribute indicating the device's current overall air quality level. Values range from <code>0</code> (Unknown) to <code>6</code> (ExtremelyPoor), covering 7 levels in total.
    The device computes and reports this value based on its built-in sensor readings; the specific calculation algorithm is determined by the device manufacturer.
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Unknown Does Not Mean Offline</div>
    <p>
      <code>Unknown (0)</code> means the device currently cannot determine the air quality level (e.g., the sensor is warming up, calibrating, or lacks sufficient data).
      It does not mean the device is offline or malfunctioning. Apps should display this as "Detecting" or "No data yet," not as an error state.
    </p>
  </div>

  <h4>AirQualityEnum Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown — sensor is warming up or has insufficient data</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Good</span>
        <span class="enum-desc">Good — air quality is satisfactory with no health risk</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Fair</span>
        <span class="enum-desc">Fair — acceptable; sensitive individuals may experience minor effects</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Moderate</span>
        <span class="enum-desc">Moderate — sensitive individuals may experience health effects</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Poor</span>
        <span class="enum-desc">Poor — everyone may begin to experience health effects</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">VeryPoor</span>
        <span class="enum-desc">Very Poor — health alert; everyone may experience more serious effects</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ExtremelyPoor</span>
        <span class="enum-desc">Extremely Poor — health emergency; protective measures should be taken immediately</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The Air Quality Cluster is purely read-only and has <strong>no commands</strong>.
    Apps can only obtain air quality data by reading attributes or subscribing to reports — they cannot send control commands to the device.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading the Air Quality Cluster attributes from an air quality sensor:</p>
  <pre><code>{
  // --- Attributes ---
  "0x0": 1           // AirQuality = Good (air quality is good)
}</code></pre>

  <p>Subscribing to air quality changes (recommended approach):</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x005B",
      "attributeId": "0x00"       // AirQuality
    },
    "minInterval": 10,            // Minimum reporting interval: 10 seconds
    "maxInterval": 60             // Maximum reporting interval: 60 seconds
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Why Subscribe Instead of Poll</div>
    <p>
      Air quality is a continuously changing metric. Rather than reading periodically, use Subscribe to have the device proactively report when values change.
      Setting appropriate <code>minInterval</code> and <code>maxInterval</code> values balances real-time responsiveness with power consumption.
    </p>
  </div>

  <!-- ====== Scenario 1 ====== -->
  <h2 id="scenario-purifier">Scenario 1: Air Purifier Automation</h2>
  <p>
    The air quality sensor and purifier work together: the purifier automatically turns on when the sensor detects worsening air quality, and turns off when conditions improve.
  </p>
  <div class="callout callout-info">
    <div class="callout-title">Implementation Approach</div>
    <ol>
      <li>Subscribe to the air quality sensor's <code>AirQuality</code> attribute changes</li>
      <li>
        Upon receiving a report, take action based on the level:
        <ul>
          <li><code>Moderate (3)</code> or above: send the On/Off Cluster On command to turn on the purifier</li>
          <li><code>Good (1)</code>: send the Off command to turn off the purifier</li>
          <li><code>Fair (2)</code>: maintain the current state to avoid frequent switching</li>
        </ul>
      </li>
      <li>You can also use the Level Control Cluster to adjust purifier fan speed — <code>Poor (4)</code> for high speed, <code>Moderate (3)</code> for low speed</li>
    </ol>
    <p>
      This logic can be implemented on the app side, or pushed to a Hub/Bridge via Matter automation rules, which allows it to run without the app being online.
    </p>
  </div>

  <!-- ====== Scenario 2 ====== -->
  <h2 id="scenario-dashboard">Scenario 2: Dashboard Display</h2>
  <p>
    Visualize air quality levels in a smart home app, typically presented alongside concentration measurement data.
  </p>
  <div class="callout callout-info">
    <div class="callout-title">Display Recommendations</div>
    <ol>
      <li>
        Use colors to differentiate levels (following common AQI color schemes):
        <ul>
          <li><code>Good</code> → Green</li>
          <li><code>Fair</code> → Yellow</li>
          <li><code>Moderate</code> → Orange</li>
          <li><code>Poor</code> → Red</li>
          <li><code>VeryPoor</code> → Purple</li>
          <li><code>ExtremelyPoor</code> → Maroon</li>
        </ul>
      </li>
      <li>Display <code>Unknown</code> in gray with the text "Detecting" to avoid users mistaking it for an error</li>
      <li>
        Below the level card, show specific concentration data (from companion clusters):
        <ul>
          <li>PM2.5 Concentration (<code>0x042A</code>)</li>
          <li>CO2 Concentration (<code>0x040D</code>)</li>
          <li>TVOC Concentration (<code>0x042E</code>)</li>
        </ul>
      </li>
      <li>Include a historical trend chart so users can see how air quality changes over time</li>
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
  'carbon-dioxide-concentration-measurement': {
    title: 'CarbonDioxideConcentrationMeasurement Cluster (0x040D)',
    description: 'Matter CarbonDioxideConcentrationMeasurement Cluster (0x040D) complete reference — CO2 concentration measurement attributes, Feature Map (MEA/LEV/PEA/AVG), MeasurementUnit/MeasurementMedium/LevelValue enum quick reference, and the shared Concentration Measurement Cluster pattern.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>CarbonDioxideConcentrationMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x040D</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    CarbonDioxideConcentrationMeasurement reports the CO2 (carbon dioxide) concentration in the air and is a core Cluster for indoor air quality monitoring.
    This is a <strong>read-only</strong> Server Cluster — it has no commands. The device passively collects data, and the App simply reads or subscribes.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Concentration Measurement Cluster Family — Shared Template</div>
    <p>
      All Concentration Measurement Clusters in Matter share <strong>exactly the same attribute set and Feature Map structure</strong>, differing only in Cluster ID.
      CO2 is the most common one, and this page's documentation applies equally to the following Clusters:
    </p>
    <ul>
      <li><strong>CarbonMonoxideConcentrationMeasurement</strong> (0x040C) — Carbon Monoxide</li>
      <li><strong>NitrogenDioxideConcentrationMeasurement</strong> (0x0413) — Nitrogen Dioxide</li>
      <li><strong>OzoneConcentrationMeasurement</strong> (0x0415) — Ozone</li>
      <li><strong>FormaldehydeConcentrationMeasurement</strong> (0x042B) — Formaldehyde</li>
      <li><strong>PM1ConcentrationMeasurement</strong> (0x042C) — PM1</li>
      <li><strong>PM25ConcentrationMeasurement</strong> (0x042A) — PM2.5</li>
      <li><strong>PM10ConcentrationMeasurement</strong> (0x042D) — PM10</li>
      <li><strong>RadonConcentrationMeasurement</strong> (0x042F) — Radon</li>
      <li><strong>TotalVolatileOrganicCompoundsConcentrationMeasurement</strong> (0x042E) — TVOC</li>
    </ul>
    <p>
      The only differences are the <strong>target substance</strong> and <strong>typical value ranges</strong>. Once you understand the CO2 structure, you can apply the same pattern to all other Concentration Clusters.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attribute Overview</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Quick Reference</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    Concentration Measurement Clusters declare their supported measurement capabilities via <code>FeatureMap</code> (0xFFFC).
    Features directly determine which attributes are available — you must read FeatureMap first to decide what data the UI should display.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MEA (Numeric Measurement)</span>
        <span class="enum-desc">Numeric Measurement — enables MeasuredValue / Min / Max / Uncertainty / MeasurementUnit / MeasurementMedium</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LEV (Level Indication)</span>
        <span class="enum-desc">Level Indication — enables LevelValue (Low / Medium / High / Critical), without providing precise numeric values</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MED (Medium Level)</span>
        <span class="enum-desc">Medium Level — requires LEV; LevelValue may return Medium</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">CRI (Critical Level)</span>
        <span class="enum-desc">Critical Level — requires LEV; LevelValue may return Critical</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PEA (Peak Measurement)</span>
        <span class="enum-desc">Peak Measurement — requires MEA; enables PeakMeasuredValue / PeakMeasuredValueWindow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AVG (Average Measurement)</span>
        <span class="enum-desc">Average Measurement — requires MEA; enables AverageMeasuredValue / AverageMeasuredValueWindow</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature Dependencies</div>
    <p>
      <code>MED</code> and <code>CRI</code> both depend on <code>LEV</code> — without LEV there are no Medium or Critical levels.<br/>
      <code>PEA</code> and <code>AVG</code> both depend on <code>MEA</code> — peak and average values require the device to provide precise numeric measurements.<br/>
      At least one of <code>MEA</code> or <code>LEV</code> must be supported; otherwise the Cluster has no reportable data.
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      Low-end CO2 sensor: <code>FeatureMap = 0x01</code> (MEA only) — reports numeric values only, no level classification.<br/>
      Mid-range air quality panel: <code>FeatureMap = 0x07</code> (MEA + LEV + MED) — provides both numeric values and level classification.<br/>
      High-end indoor environment monitor: <code>FeatureMap = 0x3F</code> (all 6 Features) — numeric values + levels + peak + average.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>
    All attributes are read-only and divided into four groups. The Feature column indicates which Feature is required for that attribute to exist.
    Click an attribute ID to jump to its detailed description.
  </p>

  <h3 id="attr-group-mea">Numeric Measurement (MEA Feature)</h3>
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
          <td>MeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>Current concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>Minimum measurable concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>Maximum measurable concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>MEA</td>
          <td>Measurement uncertainty</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>Measurement unit (PPM / PPB, etc.)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>Measurement medium (Air / Water / Soil)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-group-peak-avg">Peak and Average Measurement</h3>
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
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PeakMeasuredValue</td>
          <td>float</td>
          <td>PEA</td>
          <td>Peak concentration within the window, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>PEA</td>
          <td>Peak measurement window (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>AverageMeasuredValue</td>
          <td>float</td>
          <td>AVG</td>
          <td>Average concentration within the window, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>AVG</td>
          <td>Average measurement window (seconds)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-group-level">Level Indication (LEV Feature)</h3>
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
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>LEV</td>
          <td>Current concentration level (Low / Medium / High / Critical)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attr-details">Attributes</h2>

  <h3 id="attr-0x00">MeasuredValue (Current Concentration)</h3>
  <p>
    The most recent CO2 concentration reading from the sensor. This is the most important attribute of the entire Cluster.
    Unlike the Temperature Cluster, Concentration Clusters use a <strong>float type</strong> — the value is the actual concentration and requires no conversion.
  </p>
  <ul>
    <li><strong>Type</strong>: float (single-precision floating point)</li>
    <li><strong>Unit</strong>: Determined by the <code>MeasurementUnit</code> attribute (typically PPM)</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates invalid sensor data or that the first measurement has not yet completed</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">CO2 Concentration Reference Values</div>
    <p>
      <code>400</code> ppm = Fresh outdoor air &nbsp;|&nbsp;
      <code>600~800</code> ppm = Well-ventilated indoor &nbsp;|&nbsp;
      <code>1000~1500</code> ppm = Ventilation needed &nbsp;|&nbsp;
      <code>2000+</code> ppm = Noticeable discomfort, must ventilate &nbsp;|&nbsp;
      <code>5000</code> ppm = Occupational safety limit
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x01">MinMeasuredValue (Minimum Measurable Concentration)</h3>
  <p>
    The lowest concentration the sensor can measure. The App can use this to set the lower bound of the display range.
    For CO2 sensors, this is typically 400 ppm (atmospheric background concentration).
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue (Maximum Measurable Concentration)</h3>
  <p>
    The highest concentration the sensor can measure. When <code>MeasuredValue</code> approaches this upper limit,
    it may indicate the sensor is beyond its normal operating range. For CO2 sensors, common upper limits are 5000 or 10000 ppm.
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x03">PeakMeasuredValue (Peak Concentration)</h3>
  <p>
    The highest concentration recorded by the sensor within the time window specified by <code>PeakMeasuredValueWindow</code>.
    Useful for tracking "the worst air quality concentration in the last 24 hours."
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: PEA (depends on MEA)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x04">PeakMeasuredValueWindow (Peak Measurement Window)</h3>
  <p>
    The time window for PeakMeasuredValue, in seconds. For example, <code>86400</code> means the peak is the maximum value over the past 24 hours.
    When the window expires, PeakMeasuredValue resets and starts tracking again.
  </p>
  <ul>
    <li><strong>Type</strong>: elapsed-s (uint32, elapsed seconds)</li>
    <li><strong>Feature</strong>: PEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x05">AverageMeasuredValue (Average Concentration)</h3>
  <p>
    The arithmetic average of concentration within the time window specified by <code>AverageMeasuredValueWindow</code>.
    The average is more stable than real-time values and is suitable for trend analysis and air quality scoring.
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: AVG (depends on MEA)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x06">AverageMeasuredValueWindow (Average Measurement Window)</h3>
  <p>
    The time window for AverageMeasuredValue, in seconds. For example, <code>3600</code> means the average is calculated over the past 1 hour.
  </p>
  <ul>
    <li><strong>Type</strong>: elapsed-s (uint32, elapsed seconds)</li>
    <li><strong>Feature</strong>: AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x07">Uncertainty (Measurement Uncertainty)</h3>
  <p>
    The sensor's measurement precision, in the same unit as <code>MeasurementUnit</code>.
    For example, a value of <code>15.0</code> with the unit PPM means the measurement accuracy is <strong>&plusmn;15 ppm</strong>.
    When using concentration thresholds to trigger automation, uncertainty should be taken into account.
  </p>
  <ul>
    <li><strong>Type</strong>: float</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x08">MeasurementUnit (Measurement Unit)</h3>
  <p>
    Declares the unit of measurement used by numeric attributes such as <code>MeasuredValue</code>.
    The vast majority of CO2 sensors use PPM (parts per million).
    See <a href="#enum-unit">MeasurementUnitEnum</a> below for detailed enum values.
  </p>
  <ul>
    <li><strong>Type</strong>: enum8</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x09">MeasurementMedium (Measurement Medium)</h3>
  <p>
    Declares which medium the sensor measures concentration in. CO2 sensors almost always use <code>Air</code>,
    but the Concentration Measurement Cluster family also covers water quality monitoring (Water) and soil monitoring (Soil).
    See <a href="#enum-medium">MeasurementMediumEnum</a> below for detailed enum values.
  </p>
  <ul>
    <li><strong>Type</strong>: enum8</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0A">LevelValue (Concentration Level)</h3>
  <p>
    The device's own assessment of the current concentration level. Suitable for scenarios that don't require precise values — such as a simple traffic-light indicator.
    Note: If the device does not have the <code>MED</code> Feature, LevelValue will not return <code>Medium</code>;
    without the <code>CRI</code> Feature, it will not return <code>Critical</code>.
    See <a href="#enum-level">LevelValueEnum</a> below for detailed enum values.
  </p>
  <ul>
    <li><strong>Type</strong>: enum8</li>
    <li><strong>Feature</strong>: LEV</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    CarbonDioxideConcentrationMeasurement is a <strong>read-only Server Cluster</strong> with no commands.
    The device is responsible for collecting CO2 concentration and updating attributes; the App only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Enum Quick Reference</h2>

  <h3 id="enum-unit">MeasurementUnitEnum (Measurement Unit)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">Parts per million (most common for CO2 sensors)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">Parts per billion (ultra-low concentration gases)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">Parts per trillion (trace analysis)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">Milligrams per cubic meter (mg/m&sup3;)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">Micrograms per cubic meter (&mu;g/m&sup3;, commonly used for PM2.5)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">Nanograms per cubic meter (ng/m&sup3;)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">Particles per cubic meter (p/m&sup3;, particle counting)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">Becquerels per cubic meter (Bq/m&sup3;, radioactive radon)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-medium">MeasurementMediumEnum (Measurement Medium)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Air</span>
        <span class="enum-desc">Air (CO2, PM2.5, and other gas/particulate sensors)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Water</span>
        <span class="enum-desc">Water (water quality monitoring, dissolved oxygen, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Soil</span>
        <span class="enum-desc">Soil (agriculture and environmental monitoring)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-level">LevelValueEnum (Concentration Level)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown (sensor has not yet completed assessment)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low concentration (good air quality)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">Medium concentration (requires MED Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">High concentration (improved ventilation recommended)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Critical concentration (requires CRI Feature, immediate action needed)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading all attributes from an indoor CO2 sensor (typical indoor environment, approximately 800 ppm):</p>
  <pre><code>{
  // --- CarbonDioxideConcentrationMeasurement Cluster (Endpoint 1) ---

  // Numeric Measurement (MEA Feature)
  "0x00": 823.5,          // MeasuredValue = 823.5 ppm (current CO2 concentration)
  "0x01": 400.0,          // MinMeasuredValue = 400 ppm (sensor lower limit)
  "0x02": 5000.0,         // MaxMeasuredValue = 5000 ppm (sensor upper limit)
  "0x07": 15.0,           // Uncertainty = ±15 ppm

  // Measurement Unit and Medium (MEA Feature)
  "0x08": 0,              // MeasurementUnit = PPM
  "0x09": 0,              // MeasurementMedium = Air

  // Peak Measurement (PEA Feature)
  "0x03": 1250.0,         // PeakMeasuredValue = 1250 ppm (historical peak)
  "0x04": 86400,          // PeakMeasuredValueWindow = 86400 seconds (24-hour window)

  // Average Measurement (AVG Feature)
  "0x05": 680.5,          // AverageMeasuredValue = 680.5 ppm (average)
  "0x06": 3600,           // AverageMeasuredValueWindow = 3600 seconds (1-hour window)

  // Level Indication (LEV Feature)
  "0x0A": 2               // LevelValue = Medium
}</code></pre>

  <p>Read request example — read all Cluster attributes at once:</p>
  <pre><code>{
  // Read all CO2 Cluster attributes at once
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040D"
      // No attributeId specified → reads all attributes
    }
  }]
}</code></pre>

  <p>Subscribe to CO2 concentration changes — track air quality in real time:</p>
  <pre><code>{
  // Subscribe to CO2 concentration changes (reports every 30 seconds to 5 minutes)
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040D",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 30,
    "maxIntervalCeiling": 300
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Differences from the Temperature Measurement Cluster</div>
    <p>
      The Temperature Cluster (0x0402) uses int16 type with values in units of 0.01°C, requiring division by 100 for conversion.
      Concentration Clusters use <strong>float type</strong>, where the value is the actual concentration directly — <strong>no conversion is needed</strong>.
      However, you must read <code>MeasurementUnit</code> to confirm whether the unit is PPM or something else.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Fresh Air System Auto Ventilation Control</summary>
    <div class="scenario-content">
      <p>Automatically adjust the fresh air system's airflow based on CO2 concentration to maintain indoor air quality.</p>
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x00)</code> with a reporting interval of 30 seconds to 2 minutes</li>
        <li>Confirm <code>MeasurementUnit (0x08)</code> is PPM (different units require different thresholds)</li>
        <li>Set multi-level thresholds for ventilation control:
          <ul>
            <li><code>&lt; 600 ppm</code>: Low speed or turn off fresh air</li>
            <li><code>600 ~ 1000 ppm</code>: Medium speed</li>
            <li><code>&gt; 1000 ppm</code>: Full speed</li>
          </ul>
        </li>
        <li>Use <code>Uncertainty (0x07)</code> for debouncing — if uncertainty is &plusmn;15 ppm, add a 15 ppm hysteresis zone around thresholds to avoid frequent switching</li>
        <li>Use FanControl Cluster (0x0202) to control fresh air system fan speed</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Air Quality Dashboard</summary>
    <div class="scenario-content">
      <p>Display a comprehensive indoor air quality panel on the App's home screen.</p>
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm device capabilities and determine UI display content</li>
        <li>With <code>MEA</code>: Show precise values and measurement range (Min/Max), use a gradient bar to indicate current position</li>
        <li>With <code>LEV</code>: Show level badges (Low/Medium/High/Critical) with color-coded visual indicators</li>
        <li>With <code>PEA</code>: Show a "Today's Peak" card, reading <code>PeakMeasuredValue (0x03)</code> and the window duration</li>
        <li>With <code>AVG</code>: Show an "Average" trend line — <code>AverageMeasuredValue (0x05)</code> is more suitable for trend display than real-time values</li>
        <li>Handle <code>null</code> values — display "--" or "Sensor Offline", never show 0</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Classroom CO2 Monitoring and Alerts</summary>
    <div class="scenario-content">
      <p>Deploy CO2 sensors in school classrooms and notify teachers to open windows or start ventilation when concentration is too high.</p>
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x00)</code> and <code>LevelValue (0x0A)</code> (if the device supports LEV)</li>
        <li>Push an alert notification when LevelValue changes to <code>High (3)</code> or <code>Critical (4)</code></li>
        <li>If the device only has MEA without LEV, the App determines levels on its own:
          <ul>
            <li><code>&gt; 1500 ppm</code>: Push "Recommend opening windows for ventilation"</li>
            <li><code>&gt; 2500 ppm</code>: Push "CO2 concentration too high, ventilate immediately"</li>
          </ul>
        </li>
        <li>Use <code>AverageMeasuredValue (0x05)</code> to analyze daily CO2 patterns — e.g., concentration peaks at 2 PM after class, schedule ventilation in advance</li>
        <li>When peak values exceed the threshold for multiple consecutive days (<code>PeakMeasuredValue &gt; 2000</code>), recommend inspecting the classroom ventilation system</li>
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
  'pm25-concentration-measurement': {
    title: 'Pm25ConcentrationMeasurement Cluster (0x042A)',
    description: 'Matter Pm25ConcentrationMeasurement Cluster (0x042A) complete reference — Feature Map (MEA/LEV/MED/CRI/PEA/AVG), MeasuredValue / PeakMeasuredValue / AverageMeasuredValue attributes, MeasurementUnit / MeasurementMedium / LevelValue enums, PM2.5 AQI reference table and application scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>Pm25ConcentrationMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x042A</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1+</code> (application endpoint)
  </p>
  <p>
    Pm25ConcentrationMeasurement measures <strong>PM2.5 (fine particulate matter)</strong> concentration in the air.
    PM2.5 refers to particles with a diameter of 2.5 micrometers or less that can penetrate deep into the lungs, making it one of the most critical indicators of air quality.
    Commonly found in air quality sensors, air purifiers, fresh air systems, and smart environment panels.
    The device acts as a Server and passively reports concentration data; the App (Client) simply reads or subscribes.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Concentration Measurement Cluster Family</div>
    <p>
      Matter defines a group of structurally identical "<strong>Concentration Measurement</strong>" Clusters,
      including CO2 (0x040D), PM2.5 (0x042A), PM10 (0x042D), Formaldehyde (0x042B), TVOC (0x042E), etc.
      They share the same attribute set, Feature Map, enum definitions, and behavioral model — only the target substance differs.
      Master one, and you've mastered the entire family. This page uses PM2.5 as an example to explain this shared pattern.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attribute Overview</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#aqi-reference">AQI Reference</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    Pm25ConcentrationMeasurement declares its supported capabilities via <code>FeatureMap</code> (0xFFFC).
    Features determine which attributes are available — for example, a device without the PEA Feature will not report peak data.
    <strong>All Concentration Measurement Clusters share identical Feature definitions.</strong>
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MEA (NumericMeasurement)</span>
        <span class="enum-desc">Numeric Measurement — enables MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Uncertainty attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LEV (LevelIndication)</span>
        <span class="enum-desc">Level Indication — enables the LevelValue attribute, mapping concentration to Low / Medium / High / Critical levels</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MED (MediumLevel)</span>
        <span class="enum-desc">Medium Level — LevelValue may return Medium (requires LEV Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">CRI (CriticalLevel)</span>
        <span class="enum-desc">Critical Level — LevelValue may return Critical (requires LEV Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PEA (PeakMeasurement)</span>
        <span class="enum-desc">Peak Measurement — enables PeakMeasuredValue / PeakMeasuredValueWindow attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AVG (AverageMeasurement)</span>
        <span class="enum-desc">Average Measurement — enables AverageMeasuredValue / AverageMeasuredValueWindow attributes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      Entry-level PM2.5 sensor: <code>FeatureMap = 0x01</code> (MEA only) — reports raw concentration values only.<br/>
      Sensor with level indication: <code>FeatureMap = 0x0F</code> (MEA + LEV + MED + CRI) — provides graded assessment in addition to numeric values.<br/>
      Full-featured sensor: <code>FeatureMap = 0x3F</code> (all 6 Features) — supports numeric values, levels, peak, and average.
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">At Least One of MEA or LEV Is Required</div>
    <p>
      The specification requires devices to support at least one of <code>MEA</code> (Numeric Measurement) or <code>LEV</code> (Level Indication).
      Without either, the Cluster has no readable measurement data and is non-compliant.
      The App should ensure compatibility after reading the FeatureMap — do not assume the device always has MeasuredValue.
    </p>
  </div>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>
    The Concentration Measurement Cluster has many attributes, but most are controlled by Features. The core attributes are <code>MeasuredValue</code> (requires MEA) and <code>LevelValue</code> (requires LEV).
    Click an attribute ID to jump to its detailed description.
  </p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>MeasuredValue</td>
          <td>float</td>
          <td>Read-only</td>
          <td>MEA</td>
          <td>Current PM2.5 concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>MinMeasuredValue</td>
          <td>float</td>
          <td>Read-only</td>
          <td>MEA</td>
          <td>Minimum measurable concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>float</td>
          <td>Read-only</td>
          <td>MEA</td>
          <td>Maximum measurable concentration, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PeakMeasuredValue</td>
          <td>float</td>
          <td>Read-only</td>
          <td>PEA</td>
          <td>Peak concentration within the window, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>Read-only</td>
          <td>PEA</td>
          <td>Peak measurement window duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>AverageMeasuredValue</td>
          <td>float</td>
          <td>Read-only</td>
          <td>AVG</td>
          <td>Average concentration within the window, Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>Read-only</td>
          <td>AVG</td>
          <td>Average measurement window duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>Read-only</td>
          <td>MEA</td>
          <td>Measurement uncertainty</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>MEA</td>
          <td>Measurement unit (typically UGM3 for PM2.5)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>—</td>
          <td>Measurement medium (fixed to Air for PM2.5)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>Read-only</td>
          <td>LEV</td>
          <td>Concentration level (Low / Medium / High / Critical)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attr-details">Attributes</h2>

  <h3 id="attr-0x0000">MeasuredValue (Current PM2.5 Concentration)</h3>
  <p>
    The most recent PM2.5 concentration reading from the sensor. This is the most important attribute of the entire Cluster, and the App relies on it primarily for displaying air quality.
  </p>
  <ul>
    <li><strong>Type</strong>: float (single-precision floating point)</li>
    <li><strong>Unit</strong>: Determined by <code>MeasurementUnit</code>; PM2.5 sensors typically use <code>UGM3</code> (micrograms per cubic meter, &mu;g/m&sup3;)</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates invalid sensor data or that measurement has not yet completed</li>
    <li><strong>Feature</strong>: Requires MEA</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">Common Values Quick Reference</div>
    <p>
      <code>5.0</code> = Excellent &nbsp;|&nbsp;
      <code>12.0</code> = AQI "Good" upper limit &nbsp;|&nbsp;
      <code>25.0</code> = Light pollution &nbsp;|&nbsp;
      <code>55.0</code> = Moderate pollution &nbsp;|&nbsp;
      <code>150.0</code> = Heavy pollution &nbsp;|&nbsp;
      <code>250.0+</code> = Severe pollution
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0001">MinMeasuredValue (Minimum Measurable Concentration)</h3>
  <p>
    The lowest concentration the sensor can measure. Most PM2.5 sensors have a lower limit of <code>0.0</code>.
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: Requires MEA</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined a lower limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0002">MaxMeasuredValue (Maximum Measurable Concentration)</h3>
  <p>
    The highest concentration the sensor can measure. Consumer-grade PM2.5 sensors typically have an upper limit between 500 ~ 1000 &mu;g/m&sup3;.
    When <code>MeasuredValue</code> approaches this upper limit, it indicates extremely poor air quality and the sensor may also be near saturation.
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: Requires MEA</li>
    <li><strong>Nullable</strong>: <code>null</code> indicates the device has not defined an upper limit</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0003">PeakMeasuredValue (Peak Concentration)</h3>
  <p>
    The highest concentration measured by the sensor within the time window specified by <code>PeakMeasuredValueWindow</code>.
    Useful for detecting short-term air quality deterioration events (such as momentary high concentrations from cooking or smoking).
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: Requires PEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0004">PeakMeasuredValueWindow (Peak Measurement Window)</h3>
  <p>
    The time window for peak measurement, in seconds. For example, a value of <code>3600</code> means <code>PeakMeasuredValue</code> is the maximum over the past 1 hour.
  </p>
  <ul>
    <li><strong>Type</strong>: uint32 (elapsed-s, elapsed seconds)</li>
    <li><strong>Feature</strong>: Requires PEA</li>
    <li><strong>Default</strong>: Determined by the device manufacturer</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0005">AverageMeasuredValue (Average Concentration)</h3>
  <p>
    The average concentration value within the time window specified by <code>AverageMeasuredValueWindow</code>.
    Suitable for assessing long-term air quality trends, more stable than instantaneous values.
  </p>
  <ul>
    <li><strong>Type</strong>: float, Nullable</li>
    <li><strong>Feature</strong>: Requires AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0006">AverageMeasuredValueWindow (Average Measurement Window)</h3>
  <p>
    The time window for average measurement, in seconds. For example, a value of <code>86400</code> means <code>AverageMeasuredValue</code> is the average over the past 24 hours.
  </p>
  <ul>
    <li><strong>Type</strong>: uint32 (elapsed-s, elapsed seconds)</li>
    <li><strong>Feature</strong>: Requires AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0007">Uncertainty (Measurement Uncertainty)</h3>
  <p>
    The sensor's measurement uncertainty, using the same unit as <code>MeasuredValue</code>.
    For example, a value of <code>2.0</code> means the actual concentration is within the range of <code>MeasuredValue &plusmn; 2.0 &mu;g/m&sup3;</code>.
    Uncertainty should be taken into account when making threshold-based decisions.
  </p>
  <ul>
    <li><strong>Type</strong>: float</li>
    <li><strong>Feature</strong>: Requires MEA (optional attribute)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0008">MeasurementUnit (Measurement Unit)</h3>
  <p>
    Indicates the unit used by <code>MeasuredValue</code> and related concentration attributes. PM2.5 sensors almost always use <code>UGM3</code> (&mu;g/m&sup3;).
    This attribute remains fixed throughout the device's lifetime.
  </p>
  <ul>
    <li><strong>Type</strong>: MeasurementUnitEnum (see enum below)</li>
    <li><strong>Feature</strong>: Requires MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x0009">MeasurementMedium (Measurement Medium)</h3>
  <p>
    Indicates the target medium the sensor measures. For PM2.5 sensors, this value is fixed at <code>Air</code>.
    This attribute is common across the Concentration Measurement family — some water quality sensors use <code>Water</code>.
  </p>
  <ul>
    <li><strong>Type</strong>: MeasurementMediumEnum (see enum below)</li>
    <li><strong>Feature</strong>: No requirement (available on all devices)</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <h3 id="attr-0x000A">LevelValue (Concentration Level)</h3>
  <p>
    The device's graded assessment of the current concentration. Different manufacturers may use different grading thresholds, but the enum values are standardized.
    This attribute is mandatory when the LEV Feature is supported.
    Suitable for displaying air quality with color labels in the UI (green / yellow / orange / red).
  </p>
  <ul>
    <li><strong>Type</strong>: LevelValueEnum (see enum below)</li>
    <li><strong>Feature</strong>: Requires LEV</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Pm25ConcentrationMeasurement is a <strong>read-only Server Cluster</strong> with no commands.
    The device is responsible for collecting concentration data and updating attributes; the App only needs to Read or Subscribe to obtain data.
  </p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>
  <p>
    The following three enum groups are <strong>shared by all Concentration Measurement Clusters</strong> — CO2, PM2.5, PM10, Formaldehyde, TVOC, and other Clusters all use identical enum definitions.
  </p>

  <h3 id="enum-unit">MeasurementUnitEnum (Measurement Unit)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">Parts per million</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">Parts per billion</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">Parts per trillion</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">Milligrams per cubic meter (mg/m&sup3;)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">Micrograms per cubic meter (&mu;g/m&sup3;) — most common unit for PM2.5</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">Nanograms per cubic meter (ng/m&sup3;)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">Particles per cubic meter (particles/m&sup3;)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">Becquerels per cubic meter (Bq/m&sup3;, for radioactive gases such as radon)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Standard Unit for PM2.5</div>
    <p>
      PM2.5 standards worldwide (AQI, WHO guidelines) all use <strong>&mu;g/m&sup3;</strong> as the unit.
      When reading a PM2.5 sensor, <code>MeasurementUnit</code> should be <code>4 (UGM3)</code>.
      If a different unit is encountered, unit conversion must be performed before AQI assessment.
    </p>
  </div>

  <h3 id="enum-medium">MeasurementMediumEnum (Measurement Medium)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Air</span>
        <span class="enum-desc">Air — fixed value for PM2.5 sensors</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Water</span>
        <span class="enum-desc">Water (for water quality sensors)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Soil</span>
        <span class="enum-desc">Soil (for soil sensors)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-level">LevelValueEnum (Concentration Level)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown — sensor has not yet completed assessment or data is invalid</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low — good air quality, PM2.5 concentration within safe range</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">Medium — moderate air quality (requires MED Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">High — poor air quality, sensitive groups should reduce outdoor activities</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Critical — severely polluted air, everyone should avoid outdoor activities (requires CRI Feature)</span>
      </div>
    </div>
  </div>

  <!-- ====== PM2.5 AQI Reference Table ====== -->
  <h2 id="aqi-reference">PM2.5 and AQI Reference Table</h2>
  <p>
    PM2.5 concentration is one of the core indicators for calculating the <strong>AQI (Air Quality Index)</strong>.
    The following is the US EPA standard (24-hour average) PM2.5 concentration to AQI level mapping, which is the most commonly used reference worldwide:
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>PM2.5 (&mu;g/m&sup3;)</th>
          <th>AQI Range</th>
          <th>Level</th>
          <th>Health Impact</th>
          <th>Suggested Color</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0 ~ 12.0</td>
          <td>0 ~ 50</td>
          <td><strong>Good</strong></td>
          <td>Air quality is satisfactory, essentially no health risk</td>
          <td style="color: #31a354;">&#9632; Green</td>
        </tr>
        <tr>
          <td>12.1 ~ 35.4</td>
          <td>51 ~ 100</td>
          <td><strong>Moderate</strong></td>
          <td>Acceptable; very few sensitive individuals may be affected</td>
          <td style="color: #d4a017;">&#9632; Yellow</td>
        </tr>
        <tr>
          <td>35.5 ~ 55.4</td>
          <td>101 ~ 150</td>
          <td><strong>Unhealthy for Sensitive Groups</strong></td>
          <td>The elderly, children, and people with respiratory conditions should reduce outdoor activities</td>
          <td style="color: #e07020;">&#9632; Orange</td>
        </tr>
        <tr>
          <td>55.5 ~ 150.4</td>
          <td>151 ~ 200</td>
          <td><strong>Unhealthy</strong></td>
          <td>Everyone begins to be affected; sensitive groups should avoid outdoor activities</td>
          <td style="color: #e02020;">&#9632; Red</td>
        </tr>
        <tr>
          <td>150.5 ~ 250.4</td>
          <td>201 ~ 300</td>
          <td><strong>Very Unhealthy</strong></td>
          <td>Health alert; everyone should reduce outdoor activities</td>
          <td style="color: #8b30a0;">&#9632; Purple</td>
        </tr>
        <tr>
          <td>250.5+</td>
          <td>301+</td>
          <td><strong>Hazardous</strong></td>
          <td>Emergency conditions; everyone should avoid all outdoor activities</td>
          <td style="color: #7e0023;">&#9632; Maroon</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">WHO 2021 Guidelines Are Stricter</div>
    <p>
      The World Health Organization's 2021 revised Air Quality Guidelines lowered the PM2.5 annual average limit from 10 &mu;g/m&sup3; to <strong>5 &mu;g/m&sup3;</strong>,
      and the 24-hour average limit from 25 &mu;g/m&sup3; to <strong>15 &mu;g/m&sup3;</strong>.
      China's national standard (GB 3095-2012) sets the 24-hour average Grade II limit at 75 &mu;g/m&sup3; and the annual average at 35 &mu;g/m&sup3;.
      When displaying air quality levels, the App should indicate which standard system is being referenced.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading Pm25ConcentrationMeasurement Cluster attributes from an indoor air quality sensor (PM2.5 approximately 25 &mu;g/m&sup3;):</p>
  <pre><code>{
  // --- Pm25ConcentrationMeasurement Cluster (Endpoint 1) ---
  // Scenario: Indoor air quality sensor, current PM2.5 approximately 25 μg/m³

  "0x0000": 25.0,         // MeasuredValue = 25.0 μg/m³ (current concentration)
  "0x0001": 0.0,          // MinMeasuredValue = 0.0 μg/m³
  "0x0002": 500.0,        // MaxMeasuredValue = 500.0 μg/m³
  "0x0003": 28.0,         // PeakMeasuredValue = 28.0 μg/m³ (peak)
  "0x0005": 22.5,         // AverageMeasuredValue = 22.5 μg/m³ (average)
  "0x0007": 2.0,          // Uncertainty = 2.0 (measurement uncertainty ±2 μg/m³)
  "0x0008": 4,            // MeasurementUnit = UGM3 (micrograms per cubic meter)
  "0x0009": 0,            // MeasurementMedium = Air
  "0x000A": 1             // LevelValue = Low (concentration level: low)
}</code></pre>

  <p>Read request example — read all Cluster attributes at once:</p>
  <pre><code>{
  // Read all attributes from the PM2.5 sensor
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x042A"
      // No attributeId specified → reads all Cluster attributes
    }
  }]
}</code></pre>

  <p>Subscribe to PM2.5 concentration changes — track air quality in real time:</p>
  <pre><code>{
  // Subscribe to PM2.5 concentration changes (reports every 30 seconds to 5 minutes)
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x042A",
      "attributeId": "0x0000"      // MeasuredValue
    },
    "minIntervalFloor": 30,        // Report at least every 30 seconds
    "maxIntervalCeiling": 300      // Report at most every 5 minutes
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Data Processing Code Reference</div>
    <p>
      Key logic for reading PM2.5 concentration and mapping it to an AQI level:
    </p>
    <pre><code>{\`// Device returns MeasuredValue = 25.0 (μg/m³)
val rawValue: Float? = 25.0f    // Nullable, may be null
val pm25 = rawValue ?: run {
    // null → sensor data invalid, show "--"
    showPlaceholder(); return
}

// Map to AQI level
val aqiLevel = when {
    pm25 <= 12.0f  -> "Good"                        // Green
    pm25 <= 35.4f  -> "Moderate"                     // Yellow
    pm25 <= 55.4f  -> "Unhealthy for Sensitive"      // Orange
    pm25 <= 150.4f -> "Unhealthy"                    // Red
    pm25 <= 250.4f -> "Very Unhealthy"               // Purple
    else           -> "Hazardous"                    // Maroon
}

// Can also use the device's LevelValue directly (if LEV Feature is supported)
val level: Int? = readAttribute(0x000A)  // LevelValueEnum\`}</code></pre>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Air Purifier Auto Mode</summary>
    <div class="scenario-content">
      <p>An air purifier with a built-in PM2.5 sensor automatically adjusts fan speed and operating mode based on concentration.</p>
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x0000)</code> with a short reporting interval (e.g., 10 ~ 60 seconds) to respond quickly to air quality changes</li>
        <li>Automatically adjust purifier fan speed based on concentration ranges:
          <ul>
            <li><code>&lt; 12 &mu;g/m&sup3;</code>: Low speed or sleep mode</li>
            <li><code>12 ~ 35 &mu;g/m&sup3;</code>: Medium speed</li>
            <li><code>35 ~ 55 &mu;g/m&sup3;</code>: High speed</li>
            <li><code>&gt; 55 &mu;g/m&sup3;</code>: Maximum power</li>
          </ul>
        </li>
        <li>Read <code>Uncertainty (0x0007)</code> and add a hysteresis zone around thresholds to prevent the purifier from frequently switching between two speed levels</li>
        <li>If the device supports the AVG Feature, combine with <code>AverageMeasuredValue (0x0005)</code> for trend analysis — reduce speed proactively when the average is continuously declining to save energy</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Outdoor Air Quality Panel</summary>
    <div class="scenario-content">
      <p>A smart home panel or App displays outdoor air quality to help users decide whether to open windows for ventilation.</p>
      <ol>
        <li>Subscribe to the outdoor PM2.5 sensor's <code>MeasuredValue (0x0000)</code></li>
        <li>First check <code>MeasurementUnit (0x0008)</code> to confirm the unit is <code>UGM3</code>; otherwise, perform unit conversion before AQI mapping</li>
        <li>Map the concentration value to an AQI level and display with the corresponding color in the UI (green / yellow / orange / red / purple / maroon)</li>
        <li>If the device supports the LEV Feature, you can also use <code>LevelValue (0x000A)</code> directly for a rough level display, avoiding manual calculation</li>
        <li>If the device supports the PEA Feature, display <code>PeakMeasuredValue (0x0003)</code> as today's peak to show the user the worst period of the day</li>
        <li>Linked suggestions: When PM2.5 &lt; 35 &mu;g/m&sup3;, suggest "Good time to open windows"; when &gt; 75 &mu;g/m&sup3;, suggest "Close windows and turn on the purifier"</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Health Alerts and Automation Linkage</summary>
    <div class="scenario-content">
      <p>Set up PM2.5 health alerts for sensitive groups (elderly, children, people with respiratory conditions) and automatically trigger protective measures.</p>
      <ol>
        <li>Subscribe to <code>MeasuredValue (0x0000)</code> and <code>LevelValue (0x000A)</code> (if LEV Feature is supported)</li>
        <li>Set multi-level alert thresholds:
          <ul>
            <li><strong>Notice</strong>: PM2.5 &gt; 35 &mu;g/m&sup3; → Push notification "Air quality deteriorating, sensitive groups take note"</li>
            <li><strong>Warning</strong>: PM2.5 &gt; 55 &mu;g/m&sup3; → Automatically close the fresh air system's outside air intake and close windows</li>
            <li><strong>Emergency</strong>: PM2.5 &gt; 150 &mu;g/m&sup3; → Automatically turn all purifiers to maximum power and push an emergency notification</li>
          </ul>
        </li>
        <li>Add debounce logic — require 3 consecutive samples (e.g., every 30 seconds, meaning at least 1.5 minutes) to exceed the threshold before triggering, to avoid false alarms from momentary fluctuations</li>
        <li>Factor <code>Uncertainty (0x0007)</code> into threshold calculations: if uncertainty is &plusmn;2 &mu;g/m&sup3;, the actual trigger point for a threshold of 35 should be 37</li>
        <li>Alert clearance also needs hysteresis — e.g., if the trigger threshold is 55, set the clearance threshold at 45 to avoid repeated alerts near the boundary</li>
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
  'carbon-monoxide-concentration-measurement': {
    title: 'CarbonMonoxideConcentrationMeasurement Cluster (0x040C)',
    description: 'Matter CarbonMonoxideConcentrationMeasurement Cluster (0x040C) reference — CO concentration, safety thresholds, level classification, Feature bitmap, enum quick reference and typical usage scenarios.',
    prev: { title: 'SmokeCOAlarm', slug: 'smoke-co-alarm' },
    next: undefined,
    content: `<h1>CarbonMonoxideConcentrationMeasurement Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x040C</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    This Cluster reports the concentration of carbon monoxide (CO) in the air and belongs to the Matter Concentration Measurement family.
    It shares the same attribute structure, Feature bitmap, and enum definitions with other concentration measurement Clusters such as CO<sub>2</sub> and PM2.5 —
    only the measurement target and safety thresholds differ.
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Safety Critical — CO Is a Colorless, Odorless, Lethal Gas</div>
    <p>
      Carbon monoxide poisoning is one of the leading causes of accidental death in homes. CO sensor data must be transmitted reliably with timely alerts.
      Apps must handle CO readings with extreme care:
    </p>
    <ul>
      <li>Do not over-smooth or delay CO readings — this can mask sudden spikes</li>
      <li>When LevelValue jumps to <code>Warning</code> or above, push a notification immediately</li>
      <li>This Cluster is typically used alongside <strong>SmokeCOAlarm (0x005C)</strong> — SmokeCOAlarm handles local audible/visual alarms, while this Cluster provides precise ppm values for remote monitoring and trend analysis</li>
    </ul>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>
    Concentration measurement Clusters share the same set of Feature definitions. Devices declare their supported capabilities via <code>FeatureMap (0xFFFC)</code>.
    Features determine which attributes are available — always check before reading.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>Abbreviation</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>MEA</td>
          <td>NumericMeasurement</td>
          <td>Supports precise numeric measurement (MeasuredValue / Min / Max)</td>
        </tr>
        <tr>
          <td>1</td>
          <td>LEV</td>
          <td>LevelIndication</td>
          <td>Supports level indication (LevelValue: Low / Medium / High / Critical)</td>
        </tr>
        <tr>
          <td>2</td>
          <td>MED</td>
          <td>MediumLevel</td>
          <td>Extension of LEV — LevelValue can report the Medium level</td>
        </tr>
        <tr>
          <td>3</td>
          <td>CRI</td>
          <td>CriticalLevel</td>
          <td>Extension of LEV — LevelValue can report the Critical level</td>
        </tr>
        <tr>
          <td>4</td>
          <td>PEA</td>
          <td>PeakMeasurement</td>
          <td>Extension of MEA — records peak value (PeakMeasuredValue)</td>
        </tr>
        <tr>
          <td>5</td>
          <td>AVG</td>
          <td>AverageMeasurement</td>
          <td>Extension of MEA — records average value within a time window</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Combinations</div>
    <p>
      Most CO sensors support at least <code>MEA + LEV</code> (numeric value + level).
      Higher-safety-rated devices add <code>CRI</code> (to distinguish critical levels) and <code>PEA</code> (to record peak values for post-incident analysis).
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>All attributes are read-only. The App retrieves data via Read / Subscribe.</p>

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
        <tr>
          <td><code>0x0000</code></td>
          <td>MeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>Current CO concentration (unit per MeasurementUnit); null means invalid</td>
        </tr>
        <tr>
          <td><code>0x0001</code></td>
          <td>MinMeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>Minimum value the sensor can measure</td>
        </tr>
        <tr>
          <td><code>0x0002</code></td>
          <td>MaxMeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>Maximum value the sensor can measure (full-scale range)</td>
        </tr>
        <tr>
          <td><code>0x0003</code></td>
          <td>PeakMeasuredValue</td>
          <td>float (nullable)</td>
          <td>PEA</td>
          <td>Peak value within the time window</td>
        </tr>
        <tr>
          <td><code>0x0004</code></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>PEA</td>
          <td>Time window for peak measurement (seconds)</td>
        </tr>
        <tr>
          <td><code>0x0005</code></td>
          <td>AverageMeasuredValue</td>
          <td>float (nullable)</td>
          <td>AVG</td>
          <td>Average value within the time window</td>
        </tr>
        <tr>
          <td><code>0x0006</code></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>AVG</td>
          <td>Time window for average measurement (seconds)</td>
        </tr>
        <tr>
          <td><code>0x0007</code></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>MEA</td>
          <td>Measurement uncertainty (± range)</td>
        </tr>
        <tr>
          <td><code>0x0008</code></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>Measurement unit (PPM / PPB / ...)</td>
        </tr>
        <tr>
          <td><code>0x0009</code></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>—</td>
          <td>Measurement medium (Air / Water / Soil)</td>
        </tr>
        <tr>
          <td><code>0x000A</code></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>LEV</td>
          <td>Current concentration level (Low / Medium / High / Critical)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 关键枚举 ====== -->
  <h2 id="enums">Key Enums</h2>
  <p>The following enums are shared across all concentration measurement Clusters. Only the two most commonly used in CO scenarios are listed here.</p>

  <h3 id="enum-level">LevelValueEnum (Concentration Level)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown (sensor initializing)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Normal — concentration within safe range</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">Attention Needed — elevated concentration (requires MED Feature)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">Dangerous — immediate ventilation required</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">Critical — evacuate immediately (requires CRI Feature)</span>
      </div>
    </div>
  </div>

  <h3 id="enum-unit">MeasurementUnitEnum (Measurement Unit)</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">Parts per million — most common unit for CO sensors</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">Parts per billion (high-precision scenarios)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">Parts per trillion (rarely used for CO)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">Milligrams per cubic meter (mg/m³)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">Micrograms per cubic meter (μg/m³)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">Nanograms per cubic meter (ng/m³)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">Particles per cubic meter (not applicable to CO)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">Becquerels per cubic meter (not applicable to CO)</span>
      </div>
    </div>
  </div>

  <!-- ====== CO 安全阈值参考 ====== -->
  <h2 id="thresholds">CO Safety Threshold Reference</h2>
  <p>
    The following thresholds are derived from WHO and UL 2034 standards, provided as a reference for App alarm strategy design.
    The actual LevelValue classification on a device is set by the manufacturer and may not align exactly with this table.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Concentration Range</th>
          <th>Level</th>
          <th>Description</th>
          <th>Recommended Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>&lt; 9 ppm</code></td>
          <td style="color: var(--color-success, #16a34a);">Normal</td>
          <td>Good indoor air quality</td>
          <td>No action needed</td>
        </tr>
        <tr>
          <td><code>9 ~ 35 ppm</code></td>
          <td style="color: var(--color-warning, #ca8a04);">Attention Needed</td>
          <td>Mildly elevated; possible gas leak or poor ventilation</td>
          <td>Open windows for ventilation; check gas appliances</td>
        </tr>
        <tr>
          <td><code>36 ~ 70 ppm</code></td>
          <td style="color: var(--color-warning, #ca8a04);">Warning</td>
          <td>Prolonged exposure may cause headache and dizziness</td>
          <td>Ventilate immediately; shut off potential CO sources</td>
        </tr>
        <tr>
          <td><code>71 ~ 150 ppm</code></td>
          <td style="color: var(--color-danger, #dc2626);">Dangerous</td>
          <td>Poisoning symptoms can appear within a short time</td>
          <td>Evacuate the room; call emergency services</td>
        </tr>
        <tr>
          <td><code>&gt; 150 ppm</code></td>
          <td style="color: var(--color-danger, #dc2626);">Lethal</td>
          <td>Can cause loss of consciousness or death within minutes</td>
          <td>Evacuate the building immediately; call emergency services</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Thresholds Are for Reference Only</div>
    <p>
      Sensitivity to CO varies significantly across populations (elderly, children, pregnant women, patients with cardiopulmonary conditions).
      Apps should not rely solely on MeasuredValue for safety decisions — use the device-reported <code>LevelValue</code> as the authority,
      and prioritize the alarm state from the SmokeCOAlarm Cluster.
    </p>
  </div>

  <!-- ====== Integration with SmokeCOAlarm ====== -->
  <h2 id="smoke-co-pairing">Integration with SmokeCOAlarm</h2>
  <p>
    In real products, CO sensor devices typically implement two Clusters simultaneously:
  </p>
  <ul>
    <li><strong>SmokeCOAlarm (0x005C)</strong> — handles local audible/visual alarms and device interlock, providing boolean-style states such as <code>COState</code> (Normal / Warning / Critical)</li>
    <li><strong>CarbonMonoxideConcentrationMeasurement (0x040C)</strong> — provides precise ppm values, supporting trend analysis and remote monitoring</li>
  </ul>
  <p>
    The division of responsibility: SmokeCOAlarm determines "whether to alarm," while this Cluster reports "the exact ppm reading."
    App alarm logic should primarily follow SmokeCOAlarm's state, with this Cluster's values displayed as supplementary information.
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Reading all attributes from a CO sensor device (FeatureMap = MEA + LEV + AVG):</p>
  <pre><code>{
  // --- Concentration Measurements ---
  "0x0000": 3.2,          // MeasuredValue = 3.2 ppm (current CO concentration)
  "0x0001": 0.0,          // MinMeasuredValue = 0 ppm
  "0x0002": 1000.0,       // MaxMeasuredValue = 1000 ppm (sensor full-scale range)
  "0x0003": null,         // PeakMeasuredValue = null (PEA Feature not enabled)
  "0x0004": null,         // PeakMeasuredValueWindow (not enabled)
  "0x0005": 2.8,          // AverageMeasuredValue = 2.8 ppm
  "0x0006": 3600,         // AverageMeasuredValueWindow = 3600 seconds (1-hour average)

  // --- Uncertainty ---
  "0x0007": 1.5,          // Uncertainty = ±1.5 ppm

  // --- Unit and Medium ---
  "0x0008": 0,            // MeasurementUnit = PPM
  "0x0009": 0,            // MeasurementMedium = Air

  // --- Level Indication ---
  "0x000A": 0             // LevelValue = Low (Normal)
}</code></pre>

  <p>Subscribing to CO concentration and level changes (recommended min interval 10 seconds, max interval 60 seconds):</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040C",
      "attributeId": "0x0000"     // MeasuredValue
    },
    "minInterval": 10,
    "maxInterval": 60
  }, {
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040C",
      "attributeId": "0x000A"     // LevelValue
    },
    "minInterval": 10,
    "maxInterval": 60
  }]
}</code></pre>

  <!-- ====== 应用场景 ====== -->
  <h2 id="scenarios">Usage Scenarios</h2>

  <h3 id="scenario-garage">Scenario 1: Garage Ventilation Interlock</h3>
  <div class="callout callout-tip">
    <div class="callout-title">Garage CO Monitoring + Auto Exhaust Fan Control</div>
    <p>
      Garages are high-risk areas for CO buildup (idling vehicles, fuel-burning equipment). A typical approach:
    </p>
    <ol>
      <li>Subscribe to <code>MeasuredValue (0x0000)</code> at 10–30 second intervals</li>
      <li>When concentration exceeds <strong>9 ppm</strong>, trigger an automation rule to start the exhaust fan (OnOff Cluster)</li>
      <li>When concentration exceeds <strong>35 ppm</strong>, push a mobile notification reminding the user to check if a vehicle is running</li>
      <li>When concentration drops below <strong>5 ppm</strong> and stays there for 5 minutes, turn off the exhaust fan</li>
    </ol>
    <p>
      The drop-off threshold (5 ppm) being lower than the activation threshold (9 ppm) prevents frequent fan cycling — this is a classic hysteresis control strategy.
    </p>
  </div>

  <h3 id="scenario-kitchen">Scenario 2: Kitchen Gas Safety</h3>
  <div class="callout callout-tip">
    <div class="callout-title">Kitchen CO Sensor + Gas Valve Interlock</div>
    <p>
      Incomplete combustion from gas stoves produces CO. In a kitchen scenario:
    </p>
    <ol>
      <li>Subscribe to <code>LevelValue (0x000A)</code> and watch for level transitions</li>
      <li>When LevelValue jumps to <code>Medium (2)</code>: push a notification "Kitchen CO elevated — check gas stove"</li>
      <li>When LevelValue jumps to <code>High (3)</code>: trigger emergency automation — shut off the smart gas valve, turn on range hood/exhaust fan, activate whole-home alarm</li>
      <li>Simultaneously check SmokeCOAlarm's <code>COState</code> to confirm whether the local alarm has been triggered</li>
    </ol>
    <p>
      Note: Brief CO spikes during cooking are normal (especially stir-frying and grilling).
      Use <code>AverageMeasuredValue</code> to distinguish between sustained leaks and transient fluctuations to avoid false alarms.
    </p>
  </div>

  <!-- ====== 开发建议 ====== -->
  <h2 id="dev-tips">Developer Tips</h2>
  <div class="callout callout-tip">
    <div class="callout-title">Implementation Notes</div>
    <ol>
      <li><strong>Read FeatureMap first</strong> — not all CO sensors support ppm values; budget devices may only have LEV (level) without MEA (numeric value)</li>
      <li><strong>Subscribe over polling</strong> — CO concentration changes require timely response; use Subscribe instead of periodic Read</li>
      <li><strong>Handle null</strong> — a null MeasuredValue means the sensor reading is invalid (warming up, fault, etc.); the UI should display "Sensor initializing" rather than 0</li>
      <li><strong>Check the unit</strong> — although the vast majority of CO sensors use PPM, always check MeasurementUnit to avoid displaying PPB values as PPM</li>
      <li><strong>This Cluster has no commands</strong> — it is a purely read-only sensor data report with no Client-to-Server commands</li>
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
};
