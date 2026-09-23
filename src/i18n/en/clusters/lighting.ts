import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'on-off': {
    title: 'OnOff Cluster (0x0006)',
    description: 'Complete reference for Matter OnOff Cluster (0x0006) — Off/On/Toggle basic commands, OffWithEffect fade-off, StartUpOnOff power-on behavior, timed on/off, all attributes, commands, and enum quick reference.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>OnOff Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0006</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    OnOff is the most fundamental control Cluster in Matter, responsible for turning devices on, off, and toggling their state.
    All device types that need on/off capability (lights, outlets, switches, etc.) depend on this Cluster.
    It is also the first Cluster you encounter when getting started with Matter development.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Lighting Feature (LT)</div>
    <p>
      The OnOff Cluster defines a <strong>Lighting (LT)</strong> Feature.
      When LT is enabled, the Cluster provides four additional attributes: GlobalSceneControl, OnTime, OffWaitTime, and StartUpOnOff,
      as well as three advanced commands: OffWithEffect, OnWithRecallGlobalScene, and OnWithTimedOff.
      Lighting devices typically enable this feature, while basic switches may not need it.
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
    The OnOff Cluster defines 6 commands. The basic trio (Off / On / Toggle) is supported by all devices,
    while the three advanced commands require the device to support the Lighting (LT) feature.
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
          <td>Off</td>
          <td>Turn off the device</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>On</td>
          <td>Turn on the device</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Toggle</td>
          <td>Toggle on/off state</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>OffWithEffect</td>
          <td>Turn off with a transition effect</td>
          <td class="col-required">LT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x41">
          <td><a href="#cmd-0x41"><code>0x41</code></a></td>
          <td>OnWithRecallGlobalScene</td>
          <td>Turn on and recall global scene</td>
          <td class="col-required">LT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x42">
          <td><a href="#cmd-0x42"><code>0x42</code></a></td>
          <td>OnWithTimedOff</td>
          <td>Timed on (auto-off after timeout)</td>
          <td class="col-required">LT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Off (0x00)</h3>
  <p>
    Switches the device to the off state. On success, the <code>OnOff</code> attribute becomes <code>false</code>.
    This is the most basic command and requires no parameters.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Called when a user taps the off button in the app, an automation rule triggers a turn-off, or a voice assistant executes a "turn off the light" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">On (0x01)</h3>
  <p>
    Switches the device to the on state. On success, the <code>OnOff</code> attribute becomes <code>true</code>.
    Also requires no parameters.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Called when a user taps the on button, or when an occupancy sensor detects presence and triggers a turn-on.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Toggle (0x02)</h3>
  <p>
    Toggles the device's current state: if currently on, it turns off; if currently off, it turns on.
    Ideal for scenarios where you don't care about the current state and just want to flip it. Requires no parameters.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>A physical wall switch press or a single-button remote control action. Unlike sending On or Off separately, Toggle does not require reading the current state first.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x40">OffWithEffect (0x40)</h3>
  <p>
    Turns off the device while applying a visual transition effect (such as fade-out or delayed off).
    Before turning off, the device automatically saves the current scene to the global scene (GlobalScene), so it can later be restored via OnWithRecallGlobalScene.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EffectIdentifier</td>
          <td>EffectIdentifierEnum</td>
          <td>Effect type (see enum values below)</td>
        </tr>
        <tr>
          <td>EffectVariant</td>
          <td>enum8</td>
          <td>Effect variant (meaning depends on the EffectIdentifier value)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>EffectIdentifier Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DelayedAllOff</span>
        <span class="enum-desc">Delayed all off -- fade out then turn off</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DyingLight</span>
        <span class="enum-desc">Dying light effect -- simulates a bulb briefly brightening before fading out</span>
      </div>
    </div>
  </div>

  <h4>EffectVariant for DelayedAllOff</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DelayedOffFastFade</span>
        <span class="enum-desc">Fast fade-out (default)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NoFade</span>
        <span class="enum-desc">No fade, turns off immediately</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">DelayedOffSlowFade</span>
        <span class="enum-desc">Slow fade-out</span>
      </div>
    </div>
  </div>

  <h4>DyingLight EffectVariant</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DyingLightFadeOff</span>
        <span class="enum-desc">Brightens by 20% then slowly fades out (default and only variant)</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        "Goodnight" scene for smart lights: the light gradually dims (DelayedAllOff + SlowFade) instead of turning off abruptly.
        The device saves the current brightness and color to GlobalScene before turning off, which can be restored later via OnWithRecallGlobalScene.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x41">OnWithRecallGlobalScene (0x41)</h3>
  <p>
    Turns on the device and restores the global scene (GlobalScene) previously saved by OffWithEffect.
    No parameters. After execution, <code>GlobalSceneControl</code> returns to <code>true</code>.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Used in tandem with OffWithEffect. For example: at night, use OffWithEffect to turn off the light (saving the 70% warm-light state).
        In the morning, call OnWithRecallGlobalScene and the light restores directly to 70% warm light instead of defaulting to 100% cool white.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x42">OnWithTimedOff (0x42)</h3>
  <p>
    Turns on the device and starts an auto-off countdown timer. If the device is already on, the countdown is refreshed.
    Ideal for "turn on briefly" scenarios.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OnOffControl</td>
          <td>OnOffControlBitmap</td>
          <td>Bit 0: AcceptOnlyWhenOn -- when set to 1, the command is accepted only if the device is already on</td>
        </tr>
        <tr>
          <td>OnTime</td>
          <td>uint16</td>
          <td>On duration in 1/10 seconds. E.g. <code>300</code> = 30 seconds</td>
        </tr>
        <tr>
          <td>OffWaitTime</td>
          <td>uint16</td>
          <td>Wait time after turning off (debounce), in 1/10 seconds</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>
        Hallway and corridor lights: when an occupancy sensor triggers, send OnWithTimedOff (OnTime=300, i.e. 30 seconds).
        If no further trigger occurs within 30 seconds, the light turns off automatically.
        A new detection simply sends OnWithTimedOff again to refresh the countdown.
      </p>
      <p>
        <strong>AcceptOnlyWhenOn</strong> purpose: prevents the sensor from turning the light back on after the user manually turned it off.
        With AcceptOnlyWhenOn = 1, the timer is only extended when the light is already on; it won't re-open a light that has been turned off.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The OnOff Cluster has 5 application attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- On/Off State -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>OnOff</td>
          <td>bool</td>
          <td><a href="#group-state">On/Off State</a></td>
          <td>Current on/off state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>GlobalSceneControl</td>
          <td>bool</td>
          <td><a href="#group-state">On/Off State</a></td>
          <td>Whether the global scene is valid</td>
        </tr>
        <!-- Timing Parameters -->
        <tr class="clickable-row" data-href="#attr-0x4001">
          <td><a href="#attr-0x4001"><code>0x4001</code></a></td>
          <td>OnTime</td>
          <td>uint16</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>Remaining on time (1/10 seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4002">
          <td><a href="#attr-0x4002"><code>0x4002</code></a></td>
          <td>OffWaitTime</td>
          <td>uint16</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>Off wait time (1/10 seconds)</td>
        </tr>
        <!-- Startup Behavior -->
        <tr class="clickable-row" data-href="#attr-0x4003">
          <td><a href="#attr-0x4003"><code>0x4003</code></a></td>
          <td>StartUpOnOff</td>
          <td>enum8 / null</td>
          <td><a href="#group-startup">Startup Behavior</a></td>
          <td>Initial state when the device powers on</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== On/Off State (0x0000, 0x4000) ====== -->
  <h3 id="group-state">On/Off State (0x0000, 0x4000)</h3>
  <p>Describes the device's current on/off state and global scene control flag.</p>

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
          <td>OnOff</td>
          <td>bool</td>
          <td>The device's current on/off state. <code>true</code> = on, <code>false</code> = off. This is the only mandatory attribute in the OnOff Cluster</td>
        </tr>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>GlobalSceneControl</td>
          <td>bool</td>
          <td>Indicates whether the global scene is valid. Becomes <code>false</code> after calling OffWithEffect (scene saved for later recall), returns to <code>true</code> after calling OnWithRecallGlobalScene. <strong>Requires LT feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Timing Parameters (0x4001, 0x4002) ====== -->
  <h3 id="group-timing">Timing Parameters (0x4001, 0x4002)</h3>
  <p>Countdown control for the OnWithTimedOff command. These two attributes are automatically maintained by the device and typically do not need to be written manually.</p>

  <div class="callout callout-warning">
    <div class="callout-title">Time Unit Note</div>
    <p>
      The unit for <code>OnTime</code> and <code>OffWaitTime</code> is <strong>1/10 second</strong> (100 milliseconds), not seconds or milliseconds.
      For example, a value of <code>300</code> means 30 seconds, and <code>10</code> means 1 second.
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
        <tr id="attr-0x4001">
          <td><code>0x4001</code></td>
          <td>OnTime</td>
          <td>uint16</td>
          <td>Remaining on time for the device, in 1/10 seconds. Set by the OnWithTimedOff command; the device turns off automatically when the countdown reaches zero. A value of <code>0</code> means timed-on is not active. <strong>Requires LT feature</strong></td>
        </tr>
        <tr id="attr-0x4002">
          <td><code>0x4002</code></td>
          <td>OffWaitTime</td>
          <td>uint16</td>
          <td>Wait period after the device turns off, in 1/10 seconds. During this period, if OnWithTimedOff is received with AcceptOnlyWhenOn = 1, the command is ignored. Prevents sensors from accidentally turning the light back on. <strong>Requires LT feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Startup Behavior (0x4003) ====== -->
  <h3 id="group-startup">Startup Behavior (0x4003)</h3>
  <p>Controls the initial on/off state after the device powers on (or restarts). This attribute significantly impacts user experience -- whether the light is on or off after a power outage depends on it.</p>

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
        <tr id="attr-0x4003">
          <td><code>0x4003</code></td>
          <td>StartUpOnOff</td>
          <td>enum8 / null</td>
          <td>The on/off state after power-on (see enum values below). Nullable -- <code>null</code> means restore the state from before power loss. Writing requires <strong>manage</strong> privilege. <strong>Requires LT feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StartUpOnOff Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">Always off after power-on</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">Always on after power-on</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Toggle</span>
        <span class="enum-desc">Toggles to the opposite of the state before power loss</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Previous</span>
        <span class="enum-desc">Restores the state from before power loss (most common)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">null vs 0xFF</div>
    <p>
      StartUpOnOff is a <strong>Nullable</strong> type. In Matter's over-the-wire encoding, <code>null</code> corresponds to <code>0xFF</code>.
      So if you see <code>0xFF</code> in raw protocol data, it actually means "restore the state before power loss", not a valid enum value.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The OnOff Cluster uses <code>FeatureMap</code> (0xFFFC) to declare which advanced capabilities the device supports:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LT（Lighting）</span>
        <span class="enum-desc">Lighting feature -- enables scene save/recall, timed on/off, fade-off effect, and startup behavior</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">DF (DeadFrontBehavior)</span>
        <span class="enum-desc">Cuts front-end power when off; the device enters a "dead front" state (unresponsive to interaction)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">OO (OffOnly)</span>
        <span class="enum-desc">Supports only the off operation (device is turned on by an external mechanism, such as a physical button)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of an OnOff Cluster from a smart light with the Lighting feature enabled, in the on state:</p>

  <pre><code>{
  // --- On/Off State ---
  "0x0000": true,           // OnOff = true (currently on)
  "0x4000": true,           // GlobalSceneControl = true (global scene valid)

  // --- Timing Parameters ---
  "0x4001": 0,              // OnTime = 0 (timed-on not active)
  "0x4002": 0,              // OffWaitTime = 0 (off-wait not active)

  // --- Startup Behavior ---
  "0x4003": null             // StartUpOnOff = null (restore state before power loss)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      For the simplest devices (such as basic switches or outlets), there may only be one attribute: <code>OnOff (0x0000)</code>.
      Only devices that support the Lighting feature report the four attributes from 0x4000 to 0x4003.
      Check <code>FeatureMap (0xFFFC)</code> first to determine which features the device supports.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-basic">Scenario 1: Basic On/Off Control</h3>
  <ol>
    <li>Send <code>On (0x01)</code> or <code>Off (0x00)</code> command to control the device</li>
    <li>Subscribe to <code>OnOff (0x0000)</code> attribute changes to keep the app UI in sync</li>
    <li>If you don't care about the current state, use <code>Toggle (0x02)</code> directly</li>
  </ol>

  <h3 id="scenario-timed">Scenario 2: Hallway / Motion-Sensor Auto-Off</h3>
  <ol>
    <li>When the sensor detects presence, send <code>OnWithTimedOff (0x42)</code> with OnTime set to <code>300</code> (30 seconds)</li>
    <li>If no one is detected within 30 seconds, the light turns off automatically</li>
    <li>If presence is detected again, send OnWithTimedOff again to refresh the countdown</li>
    <li>Set AcceptOnlyWhenOn = 1 to prevent the sensor from turning the light back on after the user manually turned it off</li>
  </ol>

  <h3 id="scenario-startup">Scenario 3: Configure Power-On Behavior</h3>
  <ol>
    <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports the Lighting (LT) feature</li>
    <li>Write the desired value to <code>StartUpOnOff (0x4003)</code>:
      <ul>
        <li><code>0</code> (Off) -- light stays off after power is restored</li>
        <li><code>1</code> (On) -- light turns on automatically after power is restored</li>
        <li><code>null</code> (Previous) -- restores the state before power loss (recommended)</li>
      </ul>
    </li>
    <li>Note: writing StartUpOnOff requires <strong>manage</strong> level privilege (Administrator role)</li>
  </ol>

  <h3 id="scenario-goodnight">Scenario 4: Fade-Off + Scene Recall (Goodnight / Good Morning)</h3>
  <ol>
    <li>At bedtime: send <code>OffWithEffect (0x40)</code>; the device saves current brightness and color to the global scene, then fades off</li>
    <li>In the morning: send <code>OnWithRecallGlobalScene (0x41)</code>; the device restores brightness and color from before bedtime</li>
    <li>Note: calling <code>On (0x01)</code> directly will not recall the scene; the light turns on at default brightness</li>
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
</style>`,
  },
  'level-control': {
    title: 'LevelControl Cluster (0x0008)',
    description: 'Complete reference for Matter LevelControl Cluster (0x0008) — MoveToLevel/Move/Step commands, CurrentLevel/OnLevel and all attribute definitions, enum quick reference, transition time mechanism, and real device data examples.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>LevelControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0008</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    LevelControl provides full control over a device's adjustable level -- the most typical use case is light dimming, but it also applies to fan speed, curtain position, or any device whose "degree" can be represented numerically.
    It defines two groups of commands: one group does not affect the OnOff state, while the other group coordinates with the OnOff Cluster's on/off state.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Relationship with OnOff Cluster</div>
    <p>
      LevelControl is typically used together with the <strong>OnOff Cluster (0x0006)</strong>.
      Commands with the <code>WithOnOff</code> suffix (e.g. <code>MoveToLevelWithOnOff</code>) automatically turn off the light when level reaches 0 and turn it on when level is above 0.
      Commands without the suffix only adjust the level without affecting the on/off state.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enums &amp; Bitmaps</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Map</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    LevelControl provides two groups of commands: the basic group (0x00~0x03) and the WithOnOff group (0x04~0x07).
    Both groups share the same parameters; the difference is that the WithOnOff group coordinates with the OnOff Cluster's on/off state.
    There is also a frequency control command (0x08), available only when the device supports the Frequency feature.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>OnOff Sync</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>MoveToLevel</td>
          <td>Move to a specified level</td>
          <td class="col-optional">No</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Move</td>
          <td>Continuously move level up/down</td>
          <td class="col-optional">No</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Step</td>
          <td>Adjust level by a step value</td>
          <td class="col-optional">No</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Stop</td>
          <td>Stop an ongoing level transition</td>
          <td class="col-optional">No</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>MoveToLevelWithOnOff</td>
          <td>Move to a specified level (syncs on/off)</td>
          <td class="col-required">Yes</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>MoveWithOnOff</td>
          <td>Continuously move level (syncs on/off)</td>
          <td class="col-required">Yes</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>StepWithOnOff</td>
          <td>Adjust level by step (syncs on/off)</td>
          <td class="col-required">Yes</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>StopWithOnOff</td>
          <td>Stop transition (syncs on/off)</td>
          <td class="col-required">Yes</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>MoveToClosestFrequency</td>
          <td>Move to the closest supported frequency</td>
          <td class="col-optional">No</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Transition Time Unit</div>
    <p>
      The <code>TransitionTime</code> parameter in all commands is in units of <strong>1/10 second</strong> (0.1s).
      For example, <code>10</code> means 1 second, and <code>50</code> means 5 seconds.
      If <code>0xFFFF</code> (65535) is passed, the device uses the value of the <code>OnOffTransitionTime</code> attribute as the default transition time.
    </p>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">MoveToLevel (0x00)</h3>
  <p>
    Smoothly transitions <code>CurrentLevel</code> from its current value to a specified target level. This is the most commonly used command -- it is what gets sent when the user releases the brightness slider in the app.
    Does not affect the OnOff state; even if the target level is 0, it will not turn off the light.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Level</td><td>uint8</td><td>Target level, range 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>Transition time in 1/10 seconds. <code>null</code> uses <code>OnOffTransitionTime</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask (see <a href="#bitmap-options">OptionsBitmap</a>)</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override value</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user drags the brightness slider in the app. Before sending, read <code>MinLevel (0x02)</code> and <code>MaxLevel (0x03)</code> to determine the valid range and map the UI slider percentage to that range.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">Move (0x01)</h3>
  <p>
    Continuously changes <code>CurrentLevel</code> up or down at a specified rate until it reaches MinLevel/MaxLevel or a Stop command is received.
    Ideal for long-press dimming scenarios.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>enum8</td><td>Move direction: <code>0</code> = Up, <code>1</code> = Down (see <a href="#enum-movemode">MoveModeEnum</a>)</td></tr>
        <tr><td>Rate</td><td>uint8 / null</td><td>Units of change per second. <code>null</code> uses <code>DefaultMoveRate</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override value</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Triggered when the user long-presses a physical dimmer button. On press, send <code>Move</code> (specifying direction); on release, send <code>Stop</code> to halt the transition. Suited for continuous dimming via physical switches or remotes.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Step (0x02)</h3>
  <p>
    Adjusts <code>CurrentLevel</code> up or down by a specified step value. Ideal for short-press "one step brighter" or "one step dimmer" interactions.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>enum8</td><td>Step direction: <code>0</code> = Up, <code>1</code> = Down (see <a href="#enum-stepmode">StepModeEnum</a>)</td></tr>
        <tr><td>StepSize</td><td>uint8</td><td>Step size (absolute value of change)</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>Transition time in 1/10 seconds. <code>null</code> uses <code>OnOffTransitionTime</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override value</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Used when the user short-presses a physical button or the +/- button in the app. Each press sends one Step command for incremental dimming. Typical step values are 25~50 (roughly 10%~20% brightness change).</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">Stop (0x03)</h3>
  <p>
    Stops an ongoing Move or Step transition. <code>CurrentLevel</code> remains at the value it held when the Stop command was received.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override value</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">MoveToLevelWithOnOff (0x04)</h3>
  <p>
    Functions identically to <code>MoveToLevel</code>, except it also coordinates with the OnOff Cluster: the light automatically turns off (OnOff becomes Off) when the target level is 0, and turns on (OnOff becomes On) when the target level is above 0.
    <strong>This is the preferred command for app dimming</strong>, ensuring brightness and on/off state are always consistent.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Level</td><td>uint8</td><td>Target level, range 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>Transition time in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override value</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>The preferred command for app dimming. When the brightness slider is dragged to 0, the light turns off automatically; when dragged to any positive value, it turns on, keeping the UI state consistent with the actual device state.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">MoveWithOnOff (0x05)</h3>
  <p>Same as <code>Move</code>, but coordinates with the OnOff state during the transition. Parameters are identical to <code>Move</code>.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">StepWithOnOff (0x06)</h3>
  <p>Same as <code>Step</code>, but coordinates with the OnOff state during the step. Parameters are identical to <code>Step</code>.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">StopWithOnOff (0x07)</h3>
  <p>Same as <code>Stop</code>, but coordinates with the OnOff state. Parameters are identical to <code>Stop</code>.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">MoveToClosestFrequency (0x08)</h3>
  <p>
    Moves <code>CurrentFrequency</code> to the closest value supported by the device. Only available when the device supports the <strong>Frequency</strong> feature; rarely used in everyday lighting control development.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Frequency</td><td>uint16</td><td>Target frequency value</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>LevelControl attributes are organized into four groups by function. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Current State -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>CurrentLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-state">Current State</a></td>
          <td>Current level value</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>RemainingTime</td>
          <td>uint16</td>
          <td><a href="#group-state">Current State</a></td>
          <td>Transition remaining time</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MinLevel</td>
          <td>uint8</td>
          <td><a href="#group-state">Current State</a></td>
          <td>Minimum available level</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>MaxLevel</td>
          <td>uint8</td>
          <td><a href="#group-state">Current State</a></td>
          <td>Maximum available level</td>
        </tr>
        <!-- Frequency Control -->
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>CurrentFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">Frequency Control</a></td>
          <td>Current frequency</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>MinFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">Frequency Control</a></td>
          <td>Minimum frequency</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>MaxFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">Frequency Control</a></td>
          <td>Maximum frequency</td>
        </tr>
        <!-- Transition & OnOff Coupling -->
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>Options</td>
          <td>bitmap8</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>Command execution options</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>OnOffTransitionTime</td>
          <td>uint16</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>On/off transition time</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>OnLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>Target level when turning on</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>OnTransitionTime</td>
          <td>uint16 / null</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>Turn-on transition time</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>OffTransitionTime</td>
          <td>uint16 / null</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>Turn-off transition time</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>DefaultMoveRate</td>
          <td>uint8 / null</td>
          <td><a href="#group-transition">Transition &amp; OnOff Coordination</a></td>
          <td>Default move rate</td>
        </tr>
        <!-- Startup Behavior -->
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>StartUpCurrentLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">Startup Behavior</a></td>
          <td>Power-on initial level</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Current State (0x00-0x03) ====== -->
  <h3 id="group-state">Current State (0x00 – 0x03)</h3>
  <p>Describes the device's current level and allowed range. This is the most direct data source for displaying brightness status in the app.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>CurrentLevel<br/><span class="attr-cn">Current Level</span></td>
          <td>uint8 / null</td>
          <td>The device's current level. Valid range is <code>MinLevel</code>~<code>MaxLevel</code> (typically 1~254). <strong>Nullable</strong> -- the device returns <code>null</code> when the current level is unknown</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>RemainingTime<br/><span class="attr-cn">Remaining Time</span></td>
          <td>uint16</td>
          <td>Remaining time of the current transition, in units of <strong>0.1 second</strong>. <code>0</code> when no transition is in progress</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>MinLevel<br/><span class="attr-cn">Minimum Level</span></td>
          <td>uint8</td>
          <td>The minimum level supported by the device. Defaults to <code>1</code> with Lighting feature, <code>0</code> without</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>MaxLevel<br/><span class="attr-cn">Maximum Level</span></td>
          <td>uint8</td>
          <td>The maximum level supported by the device. Defaults to <code>254</code> (0xFE)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CurrentLevel is Nullable</div>
    <p>
      Like DoorLock's <code>LockState</code>, <code>CurrentLevel</code> can be <code>null</code>.
      This may occur when the device has just powered on, after a firmware upgrade, or during hardware anomalies.
      Always handle <code>null</code> values when displaying brightness in the app -- show "Unknown" or use <code>MinLevel</code> as the default.
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Level-to-Percentage Mapping</div>
    <p>
      <code>CurrentLevel</code> ranges from <code>MinLevel</code>~<code>MaxLevel</code> (typically 1~254), not 0~100.
      Conversion formula: <code>percentage = (CurrentLevel - MinLevel) / (MaxLevel - MinLevel) * 100</code>.
      For example, with MinLevel=1, MaxLevel=254, CurrentLevel=127 is approximately <strong>50%</strong> brightness.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Frequency Control (0x04-0x06) ====== -->
  <h3 id="group-frequency">Frequency Control (0x04 – 0x06)</h3>
  <p>Describes the device's frequency control capabilities. These attributes are only present when the device supports the <strong>Frequency</strong> feature (Feature Map Bit 2).</p>

  <div class="callout callout-info">
    <div class="callout-title">Applicable Scope</div>
    <p>
      Frequency control attributes are <strong>rarely used</strong> in typical lighting development. They are mainly for special devices that require precise output frequency control (such as certain industrial lighting or signaling devices).
      The vast majority of smart lights only use the current state and transition-related attributes.
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>CurrentFrequency<br/><span class="attr-cn">Current Frequency</span></td>
          <td>uint16</td>
          <td>The device's current output frequency</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>MinFrequency<br/><span class="attr-cn">Minimum Frequency</span></td>
          <td>uint16</td>
          <td>The minimum frequency supported by the device</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>MaxFrequency<br/><span class="attr-cn">Maximum Frequency</span></td>
          <td>uint16</td>
          <td>The maximum frequency supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Transition & OnOff Coupling (0x0F-0x14) ====== -->
  <h3 id="group-transition">Transition &amp; OnOff Coordination (0x0F – 0x14)</h3>
  <p>
    Controls the transition behavior of level changes and how the OnOff Cluster affects brightness when turning on/off.
    These attributes directly impact user experience -- whether the light snaps on/off or transitions smoothly.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>Options<br/><span class="attr-cn">Options</span></td>
          <td>bitmap8</td>
          <td>Global options for command execution. Read/Write (see <a href="#bitmap-options">OptionsBitmap</a> below)</td>
        </tr>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>OnOffTransitionTime<br/><span class="attr-cn">On/Off Transition Time</span></td>
          <td>uint16</td>
          <td>Transition time for level change from MinLevel to MaxLevel (or reverse) when turning on/off, in units of <strong>0.1 second</strong>. Defaults to <code>0</code> (instant switch). Read/Write</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>OnLevel<br/><span class="attr-cn">On Level</span></td>
          <td>uint8 / null</td>
          <td>When the OnOff Cluster's On command is executed, the level is set to this value. <code>null</code> means restore the brightness from before the last turn-off. Range 1~254, Read/Write</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>OnTransitionTime<br/><span class="attr-cn">On Transition Time</span></td>
          <td>uint16 / null</td>
          <td>Transition time when turning on via OnOff, in units of <strong>0.1 second</strong>. <code>null</code> falls back to <code>OnOffTransitionTime</code>. Read/Write</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>OffTransitionTime<br/><span class="attr-cn">Off Transition Time</span></td>
          <td>uint16 / null</td>
          <td>Transition time when turning off via OnOff, in units of <strong>0.1 second</strong>. <code>null</code> falls back to <code>OnOffTransitionTime</code>. Read/Write</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>DefaultMoveRate<br/><span class="attr-cn">Default Move Rate</span></td>
          <td>uint8 / null</td>
          <td>Default rate used when the Move command does not specify a Rate (units of change per second). <code>null</code> means the device decides. Read/Write</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">How OnLevel Works</div>
    <p>
      <code>OnLevel</code> determines what brightness the light reaches when the user turns it on:
    </p>
    <ul>
      <li><code>null</code> (recommended default) -- remembers the brightness before the last turn-off, restoring it when turning back on. Most natural user experience</li>
      <li>Specific value (e.g. <code>254</code>) -- always turns on to this fixed level, ignoring the brightness from the last turn-off</li>
    </ul>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Startup Behavior (0x4000) ====== -->
  <h3 id="group-startup">Startup Behavior (0x4000)</h3>
  <p>Controls the initial brightness after the device powers on.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>StartUpCurrentLevel<br/><span class="attr-cn">Startup Level</span></td>
          <td>uint8 / null</td>
          <td>Initial value of <code>CurrentLevel</code> when the device powers on. Read/Write</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StartUpCurrentLevel Special Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">MinLevel</span>
        <span class="enum-desc">Set to MinLevel (minimum brightness) on power-on</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1~254</span>
      <div>
        <span class="enum-name">Specified Level</span>
        <span class="enum-desc">Set to this fixed value on power-on</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Restore Previous</span>
        <span class="enum-desc">Restores the level from before power loss on power-on (recommended default)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Power Restore Pitfall</div>
    <p>
      <code>StartUpCurrentLevel</code> only controls <code>CurrentLevel</code>, not the OnOff state.
      If the user wants the light to turn on automatically after a power outage, the <code>StartUpOnOff</code> attribute in the OnOff Cluster must also be configured.
      Setting only <code>StartUpCurrentLevel</code> without <code>StartUpOnOff</code> may result in the brightness being restored but the light remaining off.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enums & Bitmaps ====== -->
  <h2 id="enums">Enums & Bitmaps</h2>

  <h3 id="enum-movemode">MoveModeEnum</h3>
  <p>The <code>MoveMode</code> parameter in the Move and MoveWithOnOff commands uses this enum to specify the direction of level change.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Move up (increase brightness) until MaxLevel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Move down (decrease brightness) until MinLevel</span>
      </div>
    </div>
  </div>

  <h3 id="enum-stepmode">StepModeEnum</h3>
  <p>The <code>StepMode</code> parameter in the Step and StepWithOnOff commands uses this enum to specify the step direction.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Step up (increase brightness)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Step down (decrease brightness)</span>
      </div>
    </div>
  </div>

  <h3 id="bitmap-options">OptionsBitmap</h3>
  <p>
    This bitmap is used by the <code>Options</code> attribute and the <code>OptionsMask</code> / <code>OptionsOverride</code> parameters in all commands.
    It controls whether commands execute under specific conditions.
  </p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">ExecuteIfOff</span>
        <span class="enum-desc">Whether Level commands are still executed when the device is in the Off state. Set to 1 = execute dimming even when the light is off</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CoupleColorTempToLevel</span>
        <span class="enum-desc">Whether color temperature changes with brightness. Set to 1 = color temperature automatically shifts warmer as brightness decreases (requires ColorControl Cluster)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">How to Use OptionsMask / OptionsOverride</div>
    <p>
      These two parameters are used to <strong>temporarily override</strong> the device's <code>Options</code> attribute. The calculation logic:
      <code>effectiveOptions = (Options AND NOT OptionsMask) OR (OptionsOverride AND OptionsMask)</code>。
      In simple terms: <code>OptionsMask</code> marks which bits to override, and <code>OptionsOverride</code> provides the override values.
      Passing <code>0</code> for both uses the device's <code>Options</code> attribute directly.
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>LevelControl uses the Feature Map to declare the device's supported optional capabilities.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">OnOff (OO)</span>
        <span class="enum-desc">Depends on the OnOff Cluster; supports WithOnOff command variants that coordinate on/off state</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Lighting (LT)</span>
        <span class="enum-desc">Supports lighting application behavior. MinLevel defaults to 1 (not 0); enables StartUpCurrentLevel and OnTransitionTime/OffTransitionTime</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Frequency (FQ)</span>
        <span class="enum-desc">Supports frequency control (Provisional). Enables CurrentFrequency/MinFrequency/MaxFrequency attributes and the MoveToClosestFrequency command</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Common Combinations</div>
    <p>
      Most smart lights have a Feature Map of <code>0x03</code> (OnOff + Lighting), indicating support for both on/off coordination and lighting behavior.
      After reading the Feature Map, you can determine which attributes and commands are available, avoiding errors from reading non-existent attributes.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result of a typical dimmable light fixture's LevelControl Cluster:</p>

  <pre><code>{
  // --- Current State ---
  "0x0": 127,                // CurrentLevel = 127 (approximately 50% brightness)
  "0x1": 0,                  // RemainingTime = 0 (no transition in progress)
  "0x2": 1,                  // MinLevel = 1 (minimum available level)
  "0x3": 254,                // MaxLevel = 254 (maximum available level)

  // --- Transition & OnOff Coordination ---
  "0xF": 0,                  // Options = 0 (no special options)
  "0x10": 10,                // OnOffTransitionTime = 10 (1-second transition)
  "0x11": null,              // OnLevel = null (restore previous brightness on turn-on)
  "0x12": null,              // OnTransitionTime = null (uses OnOffTransitionTime)
  "0x13": null,              // OffTransitionTime = null (uses OnOffTransitionTime)
  "0x14": 50,                // DefaultMoveRate = 50 (50 units of change per second)

  // --- Startup Behavior ---
  "0x4000": null              // StartUpCurrentLevel = null (restore level before power loss)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Brightness Display Logic</div>
    <p>
      Typical processing flow when displaying brightness in the app:
    </p>
    <ol>
      <li>Read <code>CurrentLevel (0x00)</code>, handle the <code>null</code> case</li>
      <li>Read <code>MinLevel (0x02)</code> and <code>MaxLevel (0x03)</code> to determine the slider range</li>
      <li>Convert <code>CurrentLevel</code> to a percentage: <code>(CurrentLevel - MinLevel) / (MaxLevel - MinLevel) * 100</code></li>
      <li>If <code>RemainingTime (0x01)</code> is greater than 0, a transition is in progress and the UI can show a transition animation</li>
    </ol>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-dimming">Scenario 1: App Dimming</h3>
  <ol>
    <li>Read <code>MinLevel (0x02)</code> and <code>MaxLevel (0x03)</code>, map to slider 0%~100%</li>
    <li>When the user drags the slider, convert the percentage to a target level value</li>
    <li>Send <code>MoveToLevelWithOnOff (0x04)</code> (the WithOnOff variant is recommended to keep the on/off state consistent)</li>
    <li>Subscribe to changes of <code>CurrentLevel (0x00)</code> to update the UI in real time</li>
  </ol>

  <h3 id="scenario-on-off-brightness">Scenario 2: Memory Brightness On/Off</h3>
  <ol>
    <li>Set <code>OnLevel (0x11)</code> to <code>null</code> -- lets the device remember the brightness before the last turn-off</li>
    <li>User taps "Turn On" → OnOff Cluster sends On command → light automatically restores to the previous brightness</li>
    <li>User taps "Turn Off" → OnOff Cluster sends Off command → brightness gradually fades to 0</li>
    <li>Optional: set <code>OnTransitionTime (0x12)</code> and <code>OffTransitionTime (0x13)</code> to control transition speed</li>
  </ol>

  <h3 id="scenario-startup">Scenario 3: Power Restore Configuration</h3>
  <ol>
    <li>Set <code>StartUpCurrentLevel (0x4000)</code>: <code>null</code> = restore level before power loss, <code>0x00</code> = minimum brightness, specific value = fixed brightness</li>
    <li>Also set <code>StartUpOnOff</code> in the OnOff Cluster to ensure the on/off state and brightness are correctly coordinated</li>
    <li>Typical configuration: <code>StartUpCurrentLevel=null</code> + <code>StartUpOnOff=RestorePrevious</code> → fully restores the state before power loss</li>
  </ol>

  <h3 id="scenario-physical-button">Scenario 4: Physical Button Dimming (Long Press + Short Press)</h3>
  <ol>
    <li>Short press → send <code>StepWithOnOff (0x06)</code>, each press changes by a fixed step value (e.g. 25)</li>
    <li>Long press down → send <code>MoveWithOnOff (0x05)</code>, continuously changes</li>
    <li>Long press release → send <code>StopWithOnOff (0x07)</code>, stops at the current brightness</li>
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
</style>`,
  },
  'color-control': {
    title: 'ColorControl Cluster (0x0300)',
    description: 'Complete reference for Matter ColorControl Cluster (0x0300) — Hue/Saturation, XY chromaticity, and Color Temperature color models with commands and attribute definitions, ColorCapabilities bitmap, Enhanced Hue, Color Loop, all enum quick reference and usage scenarios.',
    prev: { title: 'PowerSource', slug: 'power-source' },
    next: undefined,
    content: `<h1>ColorControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0300</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint, same endpoint as OnOff / LevelControl)
  </p>
  <p>
    ColorControl is the core color control Cluster for Matter lighting devices, supporting three color models:
    <strong>Hue/Saturation</strong>, <strong>XY Chromaticity</strong> (CIE 1931), and <strong>Color Temperature</strong> (in Mireds).
    It also supports advanced features like Enhanced Hue (16-bit high-precision hue) and Color Loop (automatic color cycling).
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Color Temperature Unit</div>
    <p>
      Matter uses <strong>Mireds</strong> (micro reciprocal degrees) as the color temperature unit. Conversion formula: <code>Mireds = 1,000,000 / Kelvin</code>.
      For example, 6500K cool white ≈ 153 Mireds, 2700K warm white ≈ 370 Mireds. Lower Mireds = higher color temperature (cooler white); higher Mireds = lower color temperature (warmer yellow).
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
    <a href="#standard-example">Standard Example</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Features ====== -->
  <h2 id="features">Features (Feature Map)</h2>
  <p>
    ColorControl uses the Feature Map to declare which color control capabilities the device supports. Different capabilities determine the available command and attribute sets.
    Read <code>ColorCapabilities (0x400A)</code> to get the device's capability bitmap.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HS（Hue/Saturation）</span>
        <span class="enum-desc">Supports Hue/Saturation control. MoveToHue, MoveToSaturation, and related commands become available</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EHUE（Enhanced Hue）</span>
        <span class="enum-desc">Supports 16-bit high-precision hue control. EnhancedMoveToHue and related commands become available</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">CL（Color Loop）</span>
        <span class="enum-desc">Supports automatic color cycling. The ColorLoopSet command becomes available</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">XY</span>
        <span class="enum-desc">Supports CIE 1931 XY chromaticity control. MoveToColor, MoveColor, and related commands become available</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">CT（Color Temperature）</span>
        <span class="enum-desc">Supports color temperature control. MoveToColorTemperature and related commands become available</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Most home smart lights support at least CT (color temperature), while full-color lights typically support HS + XY + CT. Always check <code>ColorCapabilities</code> before sending commands -- sending a command for an unsupported capability will be rejected by the device.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ColorControl defines 19 commands, organized into five groups by color model: Hue/Saturation control, XY chromaticity control, Color Temperature control, Enhanced Hue control, and Color Loop control.
    Click a command ID in the table below to jump to its detailed description.
  </p>
  <p>
    All commands support <code>OptionsMask</code> and <code>OptionsOverride</code> parameters for temporarily overriding the ExecuteIfOff flag in the <code>Options (0x000F)</code> attribute.
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
        <!-- Hue/Saturation Group -->
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>MoveToHue</td>
          <td>Move to a specified hue</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>MoveHue</td>
          <td>Continuously move hue in a specified direction</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StepHue</td>
          <td>Step hue</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>MoveToSaturation</td>
          <td>Move to a specified saturation</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>MoveSaturation</td>
          <td>Continuously move saturation in a specified direction</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>StepSaturation</td>
          <td>Step saturation</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>MoveToHueAndSaturation</td>
          <td>Set hue and saturation simultaneously</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <!-- XY Group -->
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>MoveToColor</td>
          <td>Move to specified XY chromaticity coordinates</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>MoveColor</td>
          <td>Continuously move XY chromaticity</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>StepColor</td>
          <td>Step XY chromaticity</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <!-- Color Temperature Group -->
        <tr class="clickable-row" data-href="#cmd-0x0A">
          <td><a href="#cmd-0x0A"><code>0x0A</code></a></td>
          <td>MoveToColorTemperature</td>
          <td>Move to a specified color temperature</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x4B">
          <td><a href="#cmd-0x4B"><code>0x4B</code></a></td>
          <td>MoveColorTemperature</td>
          <td>Continuously move color temperature in a specified direction</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x4C">
          <td><a href="#cmd-0x4C"><code>0x4C</code></a></td>
          <td>StepColorTemperature</td>
          <td>Step color temperature</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <!-- Enhanced Hue Group -->
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>EnhancedMoveToHue</td>
          <td>Move to a specified Enhanced Hue (16-bit)</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x41">
          <td><a href="#cmd-0x41"><code>0x41</code></a></td>
          <td>EnhancedMoveHue</td>
          <td>Continuously move Enhanced Hue</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x42">
          <td><a href="#cmd-0x42"><code>0x42</code></a></td>
          <td>EnhancedStepHue</td>
          <td>Step Enhanced Hue</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x43">
          <td><a href="#cmd-0x43"><code>0x43</code></a></td>
          <td>EnhancedMoveToHueAndSaturation</td>
          <td>Set Enhanced Hue and Saturation simultaneously</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <!-- Color Loop & Stop -->
        <tr class="clickable-row" data-href="#cmd-0x44">
          <td><a href="#cmd-0x44"><code>0x44</code></a></td>
          <td>ColorLoopSet</td>
          <td>Configure and activate/deactivate Color Loop</td>
          <td><span class="feature-tag">CL</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x47">
          <td><a href="#cmd-0x47"><code>0x47</code></a></td>
          <td>StopMoveStep</td>
          <td>Stop the current Move or Step transition</td>
          <td><span class="feature-tag">HS</span> <span class="feature-tag">XY</span> <span class="feature-tag">CT</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">MoveToHue (0x00)</h3>
  <p>
    Smoothly transitions the light's hue to a target value. Hue ranges from 0~254, mapping to the 0°~360° color wheel. The <code>Direction</code> parameter controls the transition direction on the color wheel.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Hue</td><td>uint8</td><td>Target hue value, 0~254</td></tr>
        <tr><td>Direction</td><td>DirectionEnum</td><td>Transition direction: ShortestDistance / LongestDistance / Up / Down</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user selects a color on the app's color wheel. Convert the selected angle to a Hue value of 0~254 (<code>hue = angle * 254 / 360</code>). Direction is typically <code>Shortest (0)</code> for the shortest path. TransitionTime of 10 means a 1-second smooth transition.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">MoveHue (0x01)</h3>
  <p>Continuously moves the hue at a constant rate until a StopMoveStep command is received or the hue reaches its natural boundary.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>MoveModeEnum</td><td>Move mode: Stop / Up / Down</td></tr>
        <tr><td>Rate</td><td>uint8</td><td>Hue steps per second</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Continuous adjustment while the user holds down the hue adjustment button. Send <code>StopMoveStep (0x47)</code> to stop when the button is released.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">StepHue (0x02)</h3>
  <p>Increases or decreases the hue by a specified step value.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>StepModeEnum</td><td>Step direction: Up / Down</td></tr>
        <tr><td>StepSize</td><td>uint8</td><td>Hue change per step</td></tr>
        <tr><td>TransitionTime</td><td>uint8</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">MoveToSaturation (0x03)</h3>
  <p>Smoothly transitions the light's saturation to a target value. Saturation ranges from 0~254, where 0 is colorless (white light) and 254 is maximum saturation.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Saturation</td><td>uint8</td><td>Target saturation, 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user drags the saturation slider. Saturation values 0~254 correspond to 0%~100% on the UI. Typically used alongside MoveToHue, or use MoveToHueAndSaturation to set both at once.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">MoveSaturation (0x04)</h3>
  <p>Continuously moves the saturation at a constant rate until a StopMoveStep is received. Parameter structure is the same as MoveHue.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">StepSaturation (0x05)</h3>
  <p>Increases or decreases saturation by a specified step value. Parameter structure is the same as StepHue.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">MoveToHueAndSaturation (0x06)</h3>
  <p>Sets both hue and saturation in a single command, more efficient and smoother than sending two separate commands.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Hue</td><td>uint8</td><td>Target hue value, 0~254</td></tr>
        <tr><td>Saturation</td><td>uint8</td><td>Target saturation, 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user selects a color point directly on the Color Wheel, completing both hue and saturation setting in one command. Recommended over calling MoveToHue + MoveToSaturation separately.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">MoveToColor (0x07)</h3>
  <p>Transitions the light's color to specified CIE 1931 XY chromaticity coordinates. X and Y range from 0~0xFEFF, mapping to 0.0~1.0 chromaticity values.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ColorX</td><td>uint16</td><td>CIE x coordinate, 0~0xFEFF (actual value = ColorX / 65536)</td></tr>
        <tr><td>ColorY</td><td>uint16</td><td>CIE y coordinate, 0~0xFEFF (actual value = ColorY / 65536)</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Used when precise color control is needed (e.g. matching brand colors or lighting design schemes). XY chromaticity is a device-independent absolute color representation -- different manufacturers' lights should theoretically produce the same color at the same XY values.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">MoveColor (0x08)</h3>
  <p>Continuously moves at a constant rate on the XY chromaticity plane.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>RateX</td><td>int16</td><td>X coordinate change per second (signed)</td></tr>
        <tr><td>RateY</td><td>int16</td><td>Y coordinate change per second (signed)</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x09">StepColor (0x09)</h3>
  <p>Increases/decreases both X and Y coordinates by a step value.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepX</td><td>int16</td><td>X coordinate step amount (signed)</td></tr>
        <tr><td>StepY</td><td>int16</td><td>Y coordinate step amount (signed)</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0A">MoveToColorTemperature (0x0A)</h3>
  <p>
    Smoothly transitions the light's color temperature to a target value. The target is clamped to the <code>[ColorTempPhysicalMinMireds, ColorTempPhysicalMaxMireds]</code> range.
    This is the most commonly used command for color temperature lights.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ColorTemperatureMireds</td><td>uint16</td><td>Target color temperature (Mireds)</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user drags the color temperature slider. The UI typically displays Kelvin (2700K ~ 6500K); convert before sending: <code>mireds = 1000000 / kelvin</code>. The device automatically clamps values outside the physical range to Min/Max Mireds.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x4B">MoveColorTemperature (0x4B)</h3>
  <p>Continuously moves the color temperature at a constant rate, with configurable upper and lower bounds.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>MoveModeEnum</td><td>Move mode: Stop / Up / Down</td></tr>
        <tr><td>Rate</td><td>uint16</td><td>Mireds change per second</td></tr>
        <tr><td>ColorTemperatureMinimumMireds</td><td>uint16</td><td>Minimum bound for movement</td></tr>
        <tr><td>ColorTemperatureMaximumMireds</td><td>uint16</td><td>Maximum bound for movement</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x4C">StepColorTemperature (0x4C)</h3>
  <p>Increases or decreases the color temperature by a specified step value, with configurable upper and lower bounds.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>StepModeEnum</td><td>Step direction: Up / Down</td></tr>
        <tr><td>StepSize</td><td>uint16</td><td>Mireds change per step</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>ColorTemperatureMinimumMireds</td><td>uint16</td><td>Minimum bound for stepping</td></tr>
        <tr><td>ColorTemperatureMaximumMireds</td><td>uint16</td><td>Maximum bound for stepping</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x40">EnhancedMoveToHue (0x40)</h3>
  <p>
    Similar to MoveToHue, but uses 16-bit Enhanced Hue (0~0xFFFF) with 256 times the precision of standard Hue.
    Suitable for scenarios requiring fine-grained color control.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>EnhancedHue</td><td>uint16</td><td>Target Enhanced Hue value, 0~0xFFFF</td></tr>
        <tr><td>Direction</td><td>DirectionEnum</td><td>Transition direction</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Used when 254-step precision of 8-bit Hue is insufficient (e.g. large LED strips requiring ultra-smooth transitions). Enhanced Hue = standard Hue * 256, but with a larger range (0~65535). Check for EHUE feature support before sending.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x41">EnhancedMoveHue (0x41)</h3>
  <p>Continuously moves the Enhanced Hue at a constant rate. Parameter structure is similar to MoveHue, but Rate is uint16.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x42">EnhancedStepHue (0x42)</h3>
  <p>Increases or decreases Enhanced Hue by a specified step value. Parameter structure is similar to StepHue, but StepSize is uint16.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x43">EnhancedMoveToHueAndSaturation (0x43)</h3>
  <p>Sets 16-bit Enhanced Hue and 8-bit Saturation in a single command.</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>EnhancedHue</td><td>uint16</td><td>Target Enhanced Hue value</td></tr>
        <tr><td>Saturation</td><td>uint8</td><td>Target saturation, 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>Transition time, in 1/10 seconds</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x44">ColorLoopSet (0x44)</h3>
  <p>
    Configures and activates/deactivates the Color Loop (automatic color cycling). The UpdateFlags bitmap controls which parameters this command updates.
    Once activated, the light automatically cycles through the color wheel at the configured time period.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>UpdateFlags</td><td>UpdateFlagsBitmap</td><td>Specifies which fields to update (see bitmap below)</td></tr>
        <tr><td>Action</td><td>ColorLoopActionEnum</td><td>Loop action: Deactivate / Start from start hue / Start from current hue</td></tr>
        <tr><td>Direction</td><td>ColorLoopDirectionEnum</td><td>Loop direction: Decrement / Increment</td></tr>
        <tr><td>Time</td><td>uint16</td><td>Time to complete one loop cycle (seconds)</td></tr>
        <tr><td>StartHue</td><td>uint16</td><td>Starting Enhanced Hue value for the loop</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Ambient lighting, party mode, and other scenarios requiring automatic color changes. Set UpdateFlags to <code>0x0F</code> (update all), Action to <code>2</code> (start cycling from current hue), Time to <code>30</code> (30 seconds per cycle), Direction to <code>1</code> (increment). Set Action to <code>0</code> to deactivate.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x47">StopMoveStep (0x47)</h3>
  <p>
    Immediately stops any ongoing Move or Step color transition. The light remains at its current color state.
    Applies to all color models (HS, XY, CT).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>Options mask</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>Options override</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Sent when the user releases a continuous adjustment button (such as long-pressing the color temperature slider arrow). Used to stop continuous move commands like MoveHue / MoveSaturation / MoveColor / MoveColorTemperature.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Details ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The ColorControl Cluster has 52 attributes organized into six groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- Current Color State -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CurrentHue</td>
          <td>uint8</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Current hue value (0~254)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentSaturation</td>
          <td>uint8</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Current saturation (0~254)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>RemainingTime</td>
          <td>uint16</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Remaining time of current transition (1/10 seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentX</td>
          <td>uint16</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Current CIE x coordinate</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentY</td>
          <td>uint16</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Current CIE y coordinate</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ColorTemperatureMireds</td>
          <td>uint16</td>
          <td><a href="#attr-current">Current Color State</a></td>
          <td>Current color temperature (Mireds)</td>
        </tr>
        <!-- Color Mode & Options -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ColorMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Color Mode</a></td>
          <td>Current color mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>Options</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">Color Mode</a></td>
          <td>ExecuteIfOff option</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4001">
          <td><a href="#attr-0x4001"><code>0x4001</code></a></td>
          <td>EnhancedColorMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">Color Mode</a></td>
          <td>Enhanced color mode (includes Enhanced Hue)</td>
        </tr>
        <!-- Enhanced Hue & Color Loop -->
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>EnhancedCurrentHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Current Enhanced Hue value (16-bit)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4002">
          <td><a href="#attr-0x4002"><code>0x4002</code></a></td>
          <td>ColorLoopActive</td>
          <td>uint8</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Whether Color Loop is active</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4003">
          <td><a href="#attr-0x4003"><code>0x4003</code></a></td>
          <td>ColorLoopDirection</td>
          <td>uint8</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Color Loop direction</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4004">
          <td><a href="#attr-0x4004"><code>0x4004</code></a></td>
          <td>ColorLoopTime</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Time to complete one loop (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4005">
          <td><a href="#attr-0x4005"><code>0x4005</code></a></td>
          <td>ColorLoopStartEnhancedHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Loop start Enhanced Hue</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4006">
          <td><a href="#attr-0x4006"><code>0x4006</code></a></td>
          <td>ColorLoopStoredEnhancedHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue &amp; Color Loop</a></td>
          <td>Enhanced Hue restored when loop deactivates</td>
        </tr>
        <!-- Capabilities & CT Range -->
        <tr class="clickable-row" data-href="#attr-0x400A">
          <td><a href="#attr-0x400A"><code>0x400A</code></a></td>
          <td>ColorCapabilities</td>
          <td>bitmap16</td>
          <td><a href="#attr-capability">Capabilities &amp; CT Range</a></td>
          <td>Color capabilities supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400B">
          <td><a href="#attr-0x400B"><code>0x400B</code></a></td>
          <td>ColorTempPhysicalMinMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">Capabilities &amp; CT Range</a></td>
          <td>Physical minimum color temperature (Mireds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400C">
          <td><a href="#attr-0x400C"><code>0x400C</code></a></td>
          <td>ColorTempPhysicalMaxMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">Capabilities &amp; CT Range</a></td>
          <td>Physical maximum color temperature (Mireds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400D">
          <td><a href="#attr-0x400D"><code>0x400D</code></a></td>
          <td>CoupleColorTempToLevelMinMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">Capabilities &amp; CT Range</a></td>
          <td>Minimum Mireds for color temp to level coupling</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4010">
          <td><a href="#attr-0x4010"><code>0x4010</code></a></td>
          <td>StartUpColorTemperatureMireds</td>
          <td>uint16 / null</td>
          <td><a href="#attr-capability">Capabilities &amp; CT Range</a></td>
          <td>Power-on default color temperature</td>
        </tr>
        <!-- Drift Compensation & Lamp Info -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>DriftCompensation</td>
          <td>enum8</td>
          <td><a href="#attr-info">Drift Compensation &amp; Fixture Info</a></td>
          <td>Color drift compensation type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>CompensationText</td>
          <td>string</td>
          <td><a href="#attr-info">Drift Compensation &amp; Fixture Info</a></td>
          <td>Compensation mechanism description text</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>NumberOfPrimaries</td>
          <td>uint8 / null</td>
          <td><a href="#attr-info">Drift Compensation &amp; Fixture Info</a></td>
          <td>Number of fixture primaries</td>
        </tr>
        <!-- Primary Coordinates (collapsed) -->
        <tr class="clickable-row" data-href="#attr-primary">
          <td><a href="#attr-primary"><code>0x0011~0x002A</code></a></td>
          <td>Primary1~6 (X/Y/Intensity)</td>
          <td>uint16 / uint8</td>
          <td><a href="#attr-primary">Primary Coordinates</a></td>
          <td>CIE XY coordinates and intensity for 6 primaries</td>
        </tr>
        <!-- White Point & Color Points -->
        <tr class="clickable-row" data-href="#attr-colorpoint">
          <td><a href="#attr-colorpoint"><code>0x0030~0x003C</code></a></td>
          <td>WhitePoint / ColorPoint R/G/B</td>
          <td>uint16 / uint8</td>
          <td><a href="#attr-colorpoint">White Point &amp; Color Points</a></td>
          <td>White point coordinates, RGB color point coordinates and intensity</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Group Details ====== -->

  <!-- Current Color State -->
  <h3 id="attr-current">Current Color State</h3>
  <p>Reflects the light's current color parameters and serves as the core data source for app UI display and state synchronization.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>CurrentHue<br/><span class="attr-cn">Current Hue</span></td>
          <td>uint8</td>
          <td>Current hue value, 0~254 mapping to the 0°~360° color wheel. Requires HS feature</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentSaturation<br/><span class="attr-cn">Current Saturation</span></td>
          <td>uint8</td>
          <td>Current saturation, 0~254. 0 = white light, 254 = maximum saturation. Requires HS feature</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>RemainingTime<br/><span class="attr-cn">Remaining Transition Time</span></td>
          <td>uint16</td>
          <td>Remaining time for the current color transition, in 1/10 seconds. 0 means no transition in progress</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentX<br/><span class="attr-cn">Current X</span></td>
          <td>uint16</td>
          <td>Current CIE 1931 x chromaticity coordinate, 0~0xFEFF. Actual value = CurrentX / 65536. Requires XY feature</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentY<br/><span class="attr-cn">Current Y</span></td>
          <td>uint16</td>
          <td>Current CIE 1931 y chromaticity coordinate, 0~0xFEFF. Actual value = CurrentY / 65536. Requires XY feature</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ColorTemperatureMireds<br/><span class="attr-cn">Current CT</span></td>
          <td>uint16</td>
          <td>Current color temperature in Mireds. Range is determined by the physical limit attributes. Requires CT feature</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Hue Value Mapping Note</div>
    <p>
      Matter's Hue value range is <strong>0~254</strong> (not 0~255 or 0~360). Conversion formulas: <code>angle = Hue * 360 / 254</code>, <code>Hue = angle * 254 / 360</code>.
      Similarly, Saturation is also 0~254. The UI typically shows a percentage: <code>percentage = Saturation * 100 / 254</code>.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Color Mode -->
  <h3 id="attr-mode">Color Mode &amp; Options</h3>
  <p>Identifies the color control model currently in use and command execution options.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ColorMode<br/><span class="attr-cn">Color Mode</span></td>
          <td>enum8</td>
          <td>Current color mode, read-only. The device switches automatically after different color commands are sent</td>
        </tr>
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>Options<br/><span class="attr-cn">Options</span></td>
          <td>bitmap8</td>
          <td>Bit 0 = ExecuteIfOff: whether color commands are still executed when the light is off. Read/Write</td>
        </tr>
        <tr id="attr-0x4001">
          <td><code>0x4001</code></td>
          <td>EnhancedColorMode<br/><span class="attr-cn">Enhanced Color Mode</span></td>
          <td>enum8</td>
          <td>Has one more state than ColorMode: Enhanced Hue and Saturation. Read-only</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ColorMode Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">CurrentHueAndCurrentSaturation</span>
        <span class="enum-desc">Hue/Saturation mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CurrentXAndCurrentY</span>
        <span class="enum-desc">CIE XY chromaticity mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ColorTemperatureMireds</span>
        <span class="enum-desc">Color Temperature mode</span>
      </div>
    </div>
  </div>

  <h4>EnhancedColorMode Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">CurrentHueAndCurrentSaturation</span>
        <span class="enum-desc">Hue/Saturation mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CurrentXAndCurrentY</span>
        <span class="enum-desc">CIE XY chromaticity mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ColorTemperatureMireds</span>
        <span class="enum-desc">Color Temperature mode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">EnhancedCurrentHueAndCurrentSaturation</span>
        <span class="enum-desc">Enhanced Hue + Saturation mode (16-bit high-precision)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ColorMode vs EnhancedColorMode</div>
    <p>
      <code>ColorMode</code> only has 3 values (0/1/2) and is a legacy compatibility attribute. <code>EnhancedColorMode</code> adds a 4th value (3 = Enhanced Hue) and is the attribute you should read first to determine the device's current color mode.
      After sending MoveToHue, ColorMode becomes 0; after sending EnhancedMoveToHue, EnhancedColorMode becomes 3.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Enhanced Hue & Color Loop -->
  <h3 id="attr-enhanced">Enhanced Hue &amp; Color Loop</h3>
  <p>State attributes for high-precision hue control and automatic color cycling.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>EnhancedCurrentHue<br/><span class="attr-cn">Enhanced Hue</span></td>
          <td>uint16</td>
          <td>Current 16-bit Enhanced Hue value, 0~0xFFFF. 256 times the precision of standard Hue</td>
        </tr>
        <tr id="attr-0x4002">
          <td><code>0x4002</code></td>
          <td>ColorLoopActive<br/><span class="attr-cn">Loop Active</span></td>
          <td>uint8</td>
          <td>0 = inactive, 1 = active. Requires CL feature</td>
        </tr>
        <tr id="attr-0x4003">
          <td><code>0x4003</code></td>
          <td>ColorLoopDirection<br/><span class="attr-cn">Loop Direction</span></td>
          <td>uint8</td>
          <td>0 = Decrement, 1 = Increment</td>
        </tr>
        <tr id="attr-0x4004">
          <td><code>0x4004</code></td>
          <td>ColorLoopTime<br/><span class="attr-cn">Loop Time</span></td>
          <td>uint16</td>
          <td>Time to complete one hue loop cycle, in seconds</td>
        </tr>
        <tr id="attr-0x4005">
          <td><code>0x4005</code></td>
          <td>ColorLoopStartEnhancedHue<br/><span class="attr-cn">Loop Start Hue</span></td>
          <td>uint16</td>
          <td>Enhanced Hue value at the start of the Color Loop</td>
        </tr>
        <tr id="attr-0x4006">
          <td><code>0x4006</code></td>
          <td>ColorLoopStoredEnhancedHue<br/><span class="attr-cn">Stored Loop Hue</span></td>
          <td>uint16</td>
          <td>Enhanced Hue value restored when Color Loop is deactivated</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Capabilities & CT Range -->
  <h3 id="attr-capability">Capabilities &amp; Color Temperature Range</h3>
  <p>Describes the device's supported color control capabilities and the physical color temperature range. These attributes must be read during development to determine the available control modes.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x400A">
          <td><code>0x400A</code></td>
          <td>ColorCapabilities<br/><span class="attr-cn">Color Capabilities</span></td>
          <td>bitmap16</td>
          <td>Bitmap of supported color control capabilities (see Feature Map definition below)</td>
        </tr>
        <tr id="attr-0x400B">
          <td><code>0x400B</code></td>
          <td>ColorTempPhysicalMinMireds<br/><span class="attr-cn">Min CT</span></td>
          <td>uint16</td>
          <td>Minimum color temperature supported (Mireds), i.e. highest Kelvin. Range 1~65279</td>
        </tr>
        <tr id="attr-0x400C">
          <td><code>0x400C</code></td>
          <td>ColorTempPhysicalMaxMireds<br/><span class="attr-cn">Max CT</span></td>
          <td>uint16</td>
          <td>Maximum color temperature supported (Mireds), i.e. lowest Kelvin. Range 1~65279</td>
        </tr>
        <tr id="attr-0x400D">
          <td><code>0x400D</code></td>
          <td>CoupleColorTempToLevelMinMireds<br/><span class="attr-cn">CT-to-Level Min</span></td>
          <td>uint16</td>
          <td>Minimum Mireds value allowed when color-temperature-to-level coupling is enabled</td>
        </tr>
        <tr id="attr-0x4010">
          <td><code>0x4010</code></td>
          <td>StartUpColorTemperatureMireds<br/><span class="attr-cn">Startup CT</span></td>
          <td>uint16 / null</td>
          <td>Initial color temperature after power-on. null means restore the last color temperature before power-off. Read/Write</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ColorCapabilities Bitmap</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HueSaturation（0x01）</span>
        <span class="enum-desc">Supports Hue/Saturation control</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EnhancedHue（0x02）</span>
        <span class="enum-desc">Supports 16-bit Enhanced Hue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">ColorLoop（0x04）</span>
        <span class="enum-desc">Supports automatic color cycling</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">XY（0x08）</span>
        <span class="enum-desc">Supports CIE XY chromaticity control</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ColorTemperature（0x10）</span>
        <span class="enum-desc">Supports Color Temperature control</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Color Temperature Range Example</div>
    <p>
      A typical color temperature bulb: <code>MinMireds = 153</code> (approx. 6536K cool white), <code>MaxMireds = 500</code> (= 2000K warm yellow).
      The two ends of the UI color temperature slider should use these values. If the target value in a MoveToColorTemperature command exceeds this range, the device will automatically clamp it.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Drift Compensation & Fixture Info -->
  <h3 id="attr-info">Drift Compensation &amp; Fixture Info</h3>
  <p>Describes the fixture's color drift compensation mechanism and the number of primaries. Most app development does not need these attributes.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>DriftCompensation<br/><span class="attr-cn">Drift Compensation</span></td>
          <td>enum8</td>
          <td>Color drift compensation type used by the fixture</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>CompensationText<br/><span class="attr-cn">Compensation Text</span></td>
          <td>string</td>
          <td>Text description of the drift compensation mechanism</td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>NumberOfPrimaries<br/><span class="attr-cn">Number of Primaries</span></td>
          <td>uint8 / null</td>
          <td>Number of independent color primaries (LED channels) in the fixture, maximum 6. null means unknown</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>DriftCompensation Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">No drift compensation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OtherOrUnknown</span>
        <span class="enum-desc">Other or unknown compensation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">TemperatureMonitoring</span>
        <span class="enum-desc">Temperature monitoring compensation</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OpticalLuminanceMonitoringAndFeedback</span>
        <span class="enum-desc">Optical luminance monitoring and feedback</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OpticalColorMonitoringAndFeedback</span>
        <span class="enum-desc">Optical color monitoring and feedback</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Primary Coordinates -->
  <h3 id="attr-primary">Primary Coordinates (Primary 1~6)</h3>
  <p>
    A fixture can declare up to 6 primaries, each with CIE XY coordinates and an intensity value. These attributes describe the physical color gamut of the fixture's LEDs,
    typically set by firmware, and generally do not need to be read during app development.
  </p>

  <details class="scenario">
    <summary>Primary 1~6 Attribute List (click to expand)</summary>
    <div class="scenario-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Group</th><th>X Coordinate ID</th><th>Y Coordinate ID</th><th>Intensity ID</th></tr>
          </thead>
          <tbody>
            <tr><td>Primary 1</td><td><code>0x0011</code></td><td><code>0x0012</code></td><td><code>0x0013</code></td></tr>
            <tr><td>Primary 2</td><td><code>0x0015</code></td><td><code>0x0016</code></td><td><code>0x0017</code></td></tr>
            <tr><td>Primary 3</td><td><code>0x0019</code></td><td><code>0x001A</code></td><td><code>0x001B</code></td></tr>
            <tr><td>Primary 4</td><td><code>0x0020</code></td><td><code>0x0021</code></td><td><code>0x0022</code></td></tr>
            <tr><td>Primary 5</td><td><code>0x0024</code></td><td><code>0x0025</code></td><td><code>0x0026</code></td></tr>
            <tr><td>Primary 6</td><td><code>0x0028</code></td><td><code>0x0029</code></td><td><code>0x002A</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>All X / Y coordinates are uint16 type, range 0~0xFEFF; Intensity is uint8 / nullable type.</p>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- White Point & Color Points -->
  <h3 id="attr-colorpoint">White Point &amp; Color Points</h3>
  <p>
    Describes the fixture's white point and RGB color point coordinates for color calibration. These attributes are writable and typically used by advanced calibration tools;
    app development generally does not need them.
  </p>

  <details class="scenario">
    <summary>White Point &amp; Color Points Attribute List (click to expand)</summary>
    <div class="scenario-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>0x0030</code></td><td>WhitePointX</td><td>uint16</td><td>White point CIE x coordinate</td></tr>
            <tr><td><code>0x0031</code></td><td>WhitePointY</td><td>uint16</td><td>White point CIE y coordinate</td></tr>
            <tr><td><code>0x0032</code></td><td>ColorPointRX</td><td>uint16</td><td>Red color point CIE x coordinate</td></tr>
            <tr><td><code>0x0033</code></td><td>ColorPointRY</td><td>uint16</td><td>Red color point CIE y coordinate</td></tr>
            <tr><td><code>0x0034</code></td><td>ColorPointRIntensity</td><td>uint8 / null</td><td>Red color point intensity</td></tr>
            <tr><td><code>0x0036</code></td><td>ColorPointGX</td><td>uint16</td><td>Green color point CIE x coordinate</td></tr>
            <tr><td><code>0x0037</code></td><td>ColorPointGY</td><td>uint16</td><td>Green color point CIE y coordinate</td></tr>
            <tr><td><code>0x0038</code></td><td>ColorPointGIntensity</td><td>uint8 / null</td><td>Green color point intensity</td></tr>
            <tr><td><code>0x003A</code></td><td>ColorPointBX</td><td>uint16</td><td>Blue color point CIE x coordinate</td></tr>
            <tr><td><code>0x003B</code></td><td>ColorPointBY</td><td>uint16</td><td>Blue color point CIE y coordinate</td></tr>
            <tr><td><code>0x003C</code></td><td>ColorPointBIntensity</td><td>uint8 / null</td><td>Blue color point intensity</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Quick Reference ====== -->
  <h2 id="enums">Command Parameter Enum Quick Reference</h2>
  <p>The following enum types are reused across multiple command parameters.</p>

  <h4>DirectionEnum (Hue Transition Direction)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Shortest</span>
        <span class="enum-desc">Shortest path (shorter arc on the color wheel)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Longest</span>
        <span class="enum-desc">Longest path (longer arc on the color wheel)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Increasing value direction</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Decreasing value direction</span>
      </div>
    </div>
  </div>

  <h4>MoveModeEnum (Continuous Move Mode)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stop</span>
        <span class="enum-desc">Stop moving</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Up (increasing value)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Down (decreasing value)</span>
      </div>
    </div>
  </div>

  <h4>StepModeEnum (Step Direction)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Step increase</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Step decrease</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Note the Value Gaps in MoveMode / StepMode</div>
    <p>
      <code>MoveModeEnum</code> values are 0, 1, 3 (no 2), and <code>StepModeEnum</code> values are 1, 3 (no 0 or 2).
      This is a historical design inherited from ZCL (ZigBee Cluster Library). Sending an invalid value (e.g. 2) will cause the device to return an error.
    </p>
  </div>

  <h4>ColorLoopActionEnum (Loop Action)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Deactivate</span>
        <span class="enum-desc">Deactivate Color Loop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ActivateFromColorLoopStartEnhancedHue</span>
        <span class="enum-desc">Start loop from ColorLoopStartEnhancedHue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActivateFromEnhancedCurrentHue</span>
        <span class="enum-desc">Start loop from current Enhanced Hue</span>
      </div>
    </div>
  </div>

  <h4>ColorLoopDirectionEnum (Loop Direction)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Decrement</span>
        <span class="enum-desc">Loop in decreasing hue direction</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Increment</span>
        <span class="enum-desc">Loop in increasing hue direction</span>
      </div>
    </div>
  </div>

  <h4>UpdateFlags Bitmap (ColorLoopSet Command Parameter)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">UpdateAction（0x01）</span>
        <span class="enum-desc">Update the Action field</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">UpdateDirection（0x02）</span>
        <span class="enum-desc">Update the Direction field</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">UpdateTime（0x04）</span>
        <span class="enum-desc">Update the Time field</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">UpdateStartHue（0x08）</span>
        <span class="enum-desc">Update the StartHue field</span>
      </div>
    </div>
  </div>

  <!-- ====== Standard Example ====== -->
  <h2 id="standard-example">Standard Example</h2>
  <p>Below is a typical attribute data example for a full-capability (HS + XY + CT + EHUE + CL) full-color light:</p>

  <pre><code>{
  // --- Current Color State ---
  "0x0000": 127,         // CurrentHue = 127 (approx. 180°, near cyan)
  "0x0001": 200,         // CurrentSaturation = 200 (high saturation)
  "0x0003": 24939,       // CurrentX = 24939 (CIE x ≈ 0.3805)
  "0x0004": 24701,       // CurrentY = 24701 (CIE y ≈ 0.3769)
  "0x0007": 370,         // ColorTemperatureMireds = 370 (approx. 2703K warm white)
  "0x0002": 0,           // RemainingTime = 0 (no transition in progress)

  // --- Color Mode ---
  "0x0008": 2,           // ColorMode = ColorTemperature (currently using CT control)
  "0x4001": 2,           // EnhancedColorMode = ColorTemperature
  "0x000F": 0,           // Options = 0 (ExecuteIfOff not enabled)

  // --- Enhanced Hue &amp; Color Loop ---
  "0x4000": 0,           // EnhancedCurrentHue = 0
  "0x4002": 0,           // ColorLoopActive = 0 (loop not active)
  "0x4003": 0,           // ColorLoopDirection = Decrement
  "0x4004": 25,          // ColorLoopTime = 25 seconds
  "0x4005": 0,           // ColorLoopStartEnhancedHue = 0
  "0x4006": 0,           // ColorLoopStoredEnhancedHue = 0

  // --- Capabilities & CT Range ---
  "0x400A": 31,          // ColorCapabilities = 0x1F (all five capabilities supported)
  "0x400B": 153,         // ColorTempPhysicalMinMireds = 153 (approx. 6536K)
  "0x400C": 500,         // ColorTempPhysicalMaxMireds = 500 (approx. 2000K)
  "0x400D": 153,         // CoupleColorTempToLevelMinMireds = 153
  "0x4010": 370          // StartUpColorTemperatureMireds = 370 (warm white on power-on)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When reading data from the device, Attribute IDs are hexadecimal strings used as keys. <code>"0x0007"</code> is ColorTemperatureMireds, <code>"0x400A"</code> is ColorCapabilities.
      The bitmap value 31 = <code>0x1F</code> = binary <code>11111</code>, meaning all five capabilities are supported.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-color-temp">Scenario 1: Color Temperature Slider</h3>
  <ol>
    <li>Read <code>ColorCapabilities (0x400A)</code> and confirm Bit 4 (CT) is 1</li>
    <li>Read <code>ColorTempPhysicalMinMireds (0x400B)</code> and <code>ColorTempPhysicalMaxMireds (0x400C)</code> to determine the slider range</li>
    <li>When the user drags the slider, convert Kelvin to Mireds: <code>mireds = 1000000 / kelvin</code></li>
    <li>Send <code>MoveToColorTemperature (0x0A)</code> with TransitionTime set to 5 (0.5-second transition)</li>
    <li>Subscribe to <code>ColorTemperatureMireds (0x0007)</code> to confirm the device has reached the target color temperature</li>
  </ol>

  <h3 id="scenario-color-wheel">Scenario 2: Color Wheel Picker (Hue/Saturation)</h3>
  <ol>
    <li>Read <code>ColorCapabilities (0x400A)</code> and confirm Bit 0 (HS) is 1</li>
    <li>User selects a point on the color wheel, obtaining angle and radius</li>
    <li>Angle to Hue: <code>hue = angle * 254 / 360</code></li>
    <li>Radius to Saturation: <code>saturation = radius * 254 / maxRadius</code></li>
    <li>Send <code>MoveToHueAndSaturation (0x06)</code> to set both values at once</li>
    <li>Subscribe to <code>CurrentHue (0x0000)</code> and <code>CurrentSaturation (0x0001)</code> to confirm the result</li>
  </ol>

  <h3 id="scenario-ui-init">Scenario 3: Light Control Page Initialization</h3>
  <ol>
    <li>Read <code>ColorCapabilities (0x400A)</code> -- determines which control components to show in the UI (color wheel, CT slider, etc.)</li>
    <li>Read <code>EnhancedColorMode (0x4001)</code> -- determines the current color mode and highlights the corresponding UI tab</li>
    <li>Read the corresponding attributes based on the mode: CT mode reads <code>ColorTemperatureMireds</code>, HS mode reads <code>CurrentHue</code> + <code>CurrentSaturation</code></li>
    <li>If CT is supported, read <code>ColorTempPhysicalMinMireds</code> / <code>MaxMireds</code> to set the slider range</li>
    <li>Subscribe to all relevant attribute changes to keep the UI in sync with device state</li>
  </ol>

  <h3 id="scenario-party-mode">Scenario 4: Ambient / Party Mode (Color Loop)</h3>
  <ol>
    <li>Read <code>ColorCapabilities (0x400A)</code> and confirm Bit 2 (CL) is 1</li>
    <li>Send <code>ColorLoopSet (0x44)</code>: UpdateFlags = <code>0x0F</code>, Action = <code>2</code> (start from current color), Direction = <code>1</code> (increment), Time = <code>30</code> (30 seconds per cycle)</li>
    <li>Read <code>ColorLoopActive (0x4002)</code> to confirm the loop is active</li>
    <li>To stop, send ColorLoopSet again with Action = <code>0</code> (Deactivate)</li>
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
  .feature-tag {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 600;
    background: #dbeafe;
    color: #1e40af;
    letter-spacing: 0.02em;
  }

  .dark .feature-tag {
    background: #1e3a5f;
    color: #93c5fd;
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
};
