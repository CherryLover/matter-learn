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

  <!-- ====== 命令（Commands）====== -->
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

  <!-- ====== 命令详解 ====== -->
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

  <h4>DelayedAllOff 的 EffectVariant</h4>
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

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The OnOff Cluster has 5 application attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- 开关状态 -->
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

  <!-- ====== 开关状态（0x0000, 0x4000）====== -->
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

  <!-- ====== 定时参数（0x4001, 0x4002）====== -->
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

  <!-- ====== 上电行为（0x4003）====== -->
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
    <div class="callout-title">null 与 0xFF</div>
    <p>
      StartUpOnOff is a <strong>Nullable</strong> type. In Matter's over-the-wire encoding, <code>null</code> corresponds to <code>0xFF</code>.
      So if you see <code>0xFF</code> in raw protocol data, it actually means "restore the state before power loss", not a valid enum value.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature 位图 ====== -->
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

  <!-- ====== 示例数据 ====== -->
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

  <!-- ====== 常见场景 ====== -->
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

  <!-- ====== 命令（Commands）====== -->
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

  <!-- ====== 命令详解 ====== -->
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

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>LevelControl attributes are organized into four groups by function. Click an attribute ID in the summary table below to jump to its detailed description.</p>

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
        <!-- 当前状态 -->
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
        <!-- 频率控制 -->
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
        <!-- 过渡与开关联动 -->
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
        <!-- 启动行为 -->
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

  <!-- ====== 当前状态（0x00-0x03）====== -->
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

  <!-- ====== 频率控制（0x04-0x06）====== -->
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

  <!-- ====== 过渡与开关联动（0x0F-0x14）====== -->
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

  <!-- ====== 启动行为（0x4000）====== -->
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

  <!-- ====== 枚举与位图 ====== -->
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

  <!-- ====== 示例数据 ====== -->
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

  <!-- ====== 常见场景 ====== -->
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

  <!-- ====== Feature 能力 ====== -->
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

  <!-- ====== 命令（Commands）====== -->
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
        <!-- Hue/Saturation 组 -->
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
        <!-- XY 组 -->
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
        <!-- 色温组 -->
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
        <!-- Enhanced Hue 组 -->
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

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">MoveToHue —— 移动到指定色相(0x00)</h3>
  <p>
    将灯光色相平滑过渡到目标值。Hue 取值 0~254，映射到 0°~360° 色环。<code>Direction</code> 参数控制色环上的过渡方向。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Hue</td><td>uint8</td><td>目标色相值，0~254</td></tr>
        <tr><td>Direction</td><td>DirectionEnum</td><td>过渡方向：ShortestDistance / LongestDistance / Up / Down</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户在 App 色环上选择一个颜色时调用。先将选中的角度换算为 0~254 的 Hue 值（<code>hue = angle * 254 / 360</code>），Direction 通常用 <code>Shortest (0)</code> 取最短路径。TransitionTime 设 10 表示 1 秒平滑过渡。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">MoveHue —— 持续移动色相(0x01)</h3>
  <p>以恒定速率持续移动色相值，直到收到 StopMoveStep 或色相到达自然边界。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>MoveModeEnum</td><td>移动模式：Stop / Up / Down</td></tr>
        <tr><td>Rate</td><td>uint8</td><td>每秒变化的色相步数</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户按住色相调节按钮时持续调节。松开按钮后发送 <code>StopMoveStep (0x47)</code> 停止。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">StepHue —— 色相步进(0x02)</h3>
  <p>将色相增加或减少一个指定的步长值。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>StepModeEnum</td><td>步进方向：Up / Down</td></tr>
        <tr><td>StepSize</td><td>uint8</td><td>每次步进的色相变化量</td></tr>
        <tr><td>TransitionTime</td><td>uint8</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">MoveToSaturation —— 移动到指定饱和度(0x03)</h3>
  <p>将灯光饱和度平滑过渡到目标值。Saturation 取值 0~254，0 为无色（白光），254 为最高饱和度。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Saturation</td><td>uint8</td><td>目标饱和度，0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户拖动饱和度滑条时调用。Saturation 值 0~254 对应 UI 上的 0%~100%。通常配合 MoveToHue 一起使用，也可以用 MoveToHueAndSaturation 一次设置两者。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">MoveSaturation —— 持续移动饱和度(0x04)</h3>
  <p>以恒定速率持续移动饱和度值，直到收到 StopMoveStep。参数结构同 MoveHue。</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">StepSaturation —— 饱和度步进(0x05)</h3>
  <p>将饱和度增加或减少一个指定的步长值。参数结构同 StepHue。</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">MoveToHueAndSaturation —— 同时设置色相和饱和度(0x06)</h3>
  <p>一次命令同时设置色相和饱和度，比分开发送两个命令更高效，过渡更平滑。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>Hue</td><td>uint8</td><td>目标色相值，0~254</td></tr>
        <tr><td>Saturation</td><td>uint8</td><td>目标饱和度，0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户在色盘（Color Wheel）上直接选择一个颜色点时调用，一次命令完成色相 + 饱和度的设置。推荐优先使用此命令而非分别调用 MoveToHue + MoveToSaturation。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">MoveToColor —— 移动到指定 XY 色坐标(0x07)</h3>
  <p>将灯光颜色过渡到指定的 CIE 1931 XY 色坐标。X 和 Y 取值 0~0xFEFF，映射到 0.0~1.0 的色度坐标。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ColorX</td><td>uint16</td><td>CIE x 坐标，0~0xFEFF（实际值 = ColorX / 65536）</td></tr>
        <tr><td>ColorY</td><td>uint16</td><td>CIE y 坐标，0~0xFEFF（实际值 = ColorY / 65536）</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>需要精确控制颜色（如匹配品牌色或灯光设计方案）时使用。XY 色坐标是设备无关的绝对颜色表示，不同厂商的灯在相同 XY 值下理论上会呈现相同颜色。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">MoveColor —— 持续移动 XY 色坐标(0x08)</h3>
  <p>以恒定速率在 XY 色度平面上持续移动。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>RateX</td><td>int16</td><td>X 坐标每秒变化量（有符号）</td></tr>
        <tr><td>RateY</td><td>int16</td><td>Y 坐标每秒变化量（有符号）</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x09">StepColor —— XY 色坐标步进(0x09)</h3>
  <p>将 X 和 Y 坐标各增加/减少一个步长值。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepX</td><td>int16</td><td>X 坐标步进量（有符号）</td></tr>
        <tr><td>StepY</td><td>int16</td><td>Y 坐标步进量（有符号）</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0A">MoveToColorTemperature —— 移动到指定色温(0x0A)</h3>
  <p>
    将灯光色温平滑过渡到目标值。目标值会被裁剪到 <code>[ColorTempPhysicalMinMireds, ColorTempPhysicalMaxMireds]</code> 范围内。
    这是色温灯最常用的命令。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>ColorTemperatureMireds</td><td>uint16</td><td>目标色温值（Mireds）</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户拖动色温滑条时调用。UI 通常显示 Kelvin（2700K ~ 6500K），发送命令前需转换：<code>mireds = 1000000 / kelvin</code>。设备会自动将超出物理范围的值裁剪到 Min/Max Mireds。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x4B">MoveColorTemperature —— 持续移动色温(0x4B)</h3>
  <p>以恒定速率持续移动色温值，并可指定移动的上下限范围。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>MoveModeEnum</td><td>移动模式：Stop / Up / Down</td></tr>
        <tr><td>Rate</td><td>uint16</td><td>每秒变化的 Mireds 值</td></tr>
        <tr><td>ColorTemperatureMinimumMireds</td><td>uint16</td><td>移动下限</td></tr>
        <tr><td>ColorTemperatureMaximumMireds</td><td>uint16</td><td>移动上限</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x4C">StepColorTemperature —— 色温步进(0x4C)</h3>
  <p>将色温增加或减少一个指定的步长值，并可指定步进的上下限范围。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>StepModeEnum</td><td>步进方向：Up / Down</td></tr>
        <tr><td>StepSize</td><td>uint16</td><td>每次步进的 Mireds 变化量</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>ColorTemperatureMinimumMireds</td><td>uint16</td><td>步进下限</td></tr>
        <tr><td>ColorTemperatureMaximumMireds</td><td>uint16</td><td>步进上限</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x40">EnhancedMoveToHue —— 移动到指定 Enhanced Hue(0x40)</h3>
  <p>
    与 MoveToHue 类似，但使用 16-bit Enhanced Hue（0~0xFFFF），精度是标准 Hue 的 256 倍。
    适用于需要精细颜色控制的场景。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>EnhancedHue</td><td>uint16</td><td>目标 Enhanced Hue 值，0~0xFFFF</td></tr>
        <tr><td>Direction</td><td>DirectionEnum</td><td>过渡方向</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>当 8-bit Hue 的 254 级精度不够时使用（例如大型 LED 灯带需要极致平滑过渡）。Enhanced Hue = 标准 Hue * 256，但范围更大（0~65535）。发送前需检查设备是否支持 EHUE feature。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x41">EnhancedMoveHue —— 持续移动 Enhanced Hue(0x41)</h3>
  <p>以恒定速率持续移动 Enhanced Hue 值。参数结构类似 MoveHue，但 Rate 为 uint16。</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x42">EnhancedStepHue —— Enhanced Hue 步进(0x42)</h3>
  <p>将 Enhanced Hue 增加或减少一个指定的步长值。参数结构类似 StepHue，但 StepSize 为 uint16。</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x43">EnhancedMoveToHueAndSaturation —— 同时设置 Enhanced Hue 和 Saturation(0x43)</h3>
  <p>一次命令同时设置 16-bit Enhanced Hue 和 8-bit Saturation。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>EnhancedHue</td><td>uint16</td><td>目标 Enhanced Hue 值</td></tr>
        <tr><td>Saturation</td><td>uint8</td><td>目标饱和度，0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16</td><td>过渡时间，单位 1/10 秒</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x44">ColorLoopSet —— 配置 Color Loop(0x44)</h3>
  <p>
    配置并激活/关闭 Color Loop（自动循环变色）。通过 UpdateFlags 位图控制本次命令要更新哪些参数。
    激活后，灯光会按设定的时间周期在色环上自动循环。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>UpdateFlags</td><td>UpdateFlagsBitmap</td><td>指定本次更新哪些字段（见下方位图）</td></tr>
        <tr><td>Action</td><td>ColorLoopActionEnum</td><td>循环动作：关闭 / 从起始色开始 / 从当前色开始</td></tr>
        <tr><td>Direction</td><td>ColorLoopDirectionEnum</td><td>循环方向：递减 / 递增</td></tr>
        <tr><td>Time</td><td>uint16</td><td>完成一圈循环的时间（秒）</td></tr>
        <tr><td>StartHue</td><td>uint16</td><td>循环起始的 Enhanced Hue 值</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>氛围灯、派对模式等需要灯光自动变色的场景。UpdateFlags 设为 <code>0x0F</code>（全部更新），Action 设为 <code>2</code>（从当前色开始循环），Time 设为 <code>30</code>（30 秒一圈），Direction 设为 <code>1</code>（递增方向）。关闭时 Action 设为 <code>0</code>。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x47">StopMoveStep —— 停止过渡(0x47)</h3>
  <p>
    立即停止当前正在进行的 Move 或 Step 颜色过渡。灯光保持在当前颜色状态。
    适用于所有颜色模型（HS、XY、CT）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>用户松开持续调节按钮（如色温滑条的长按箭头）时发送，用于停止 MoveHue / MoveSaturation / MoveColor / MoveColorTemperature 等持续移动类命令。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ColorControl Cluster 共有 52 个属性，按功能分为六组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 当前颜色状态 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CurrentHue</td>
          <td>uint8</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前色相值（0~254）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentSaturation</td>
          <td>uint8</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前饱和度（0~254）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>RemainingTime</td>
          <td>uint16</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前过渡的剩余时间（1/10 秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentX</td>
          <td>uint16</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前 CIE x 坐标</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentY</td>
          <td>uint16</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前 CIE y 坐标</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ColorTemperatureMireds</td>
          <td>uint16</td>
          <td><a href="#attr-current">当前颜色状态</a></td>
          <td>当前色温（Mireds）</td>
        </tr>
        <!-- 颜色模式与选项 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ColorMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">颜色模式</a></td>
          <td>当前颜色模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>Options</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">颜色模式</a></td>
          <td>ExecuteIfOff 选项</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4001">
          <td><a href="#attr-0x4001"><code>0x4001</code></a></td>
          <td>EnhancedColorMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">颜色模式</a></td>
          <td>增强颜色模式（含 Enhanced Hue）</td>
        </tr>
        <!-- Enhanced Hue & Color Loop -->
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>EnhancedCurrentHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>当前 Enhanced Hue 值（16-bit）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4002">
          <td><a href="#attr-0x4002"><code>0x4002</code></a></td>
          <td>ColorLoopActive</td>
          <td>uint8</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>Color Loop 是否激活</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4003">
          <td><a href="#attr-0x4003"><code>0x4003</code></a></td>
          <td>ColorLoopDirection</td>
          <td>uint8</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>Color Loop 循环方向</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4004">
          <td><a href="#attr-0x4004"><code>0x4004</code></a></td>
          <td>ColorLoopTime</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>循环一圈的时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4005">
          <td><a href="#attr-0x4005"><code>0x4005</code></a></td>
          <td>ColorLoopStartEnhancedHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>循环起始 Enhanced Hue</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4006">
          <td><a href="#attr-0x4006"><code>0x4006</code></a></td>
          <td>ColorLoopStoredEnhancedHue</td>
          <td>uint16</td>
          <td><a href="#attr-enhanced">Enhanced Hue 与 Color Loop</a></td>
          <td>循环关闭时恢复的 Enhanced Hue</td>
        </tr>
        <!-- 能力与色温范围 -->
        <tr class="clickable-row" data-href="#attr-0x400A">
          <td><a href="#attr-0x400A"><code>0x400A</code></a></td>
          <td>ColorCapabilities</td>
          <td>bitmap16</td>
          <td><a href="#attr-capability">能力与色温范围</a></td>
          <td>设备支持的颜色能力</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400B">
          <td><a href="#attr-0x400B"><code>0x400B</code></a></td>
          <td>ColorTempPhysicalMinMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">能力与色温范围</a></td>
          <td>物理最小色温（Mireds）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400C">
          <td><a href="#attr-0x400C"><code>0x400C</code></a></td>
          <td>ColorTempPhysicalMaxMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">能力与色温范围</a></td>
          <td>物理最大色温（Mireds）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x400D">
          <td><a href="#attr-0x400D"><code>0x400D</code></a></td>
          <td>CoupleColorTempToLevelMinMireds</td>
          <td>uint16</td>
          <td><a href="#attr-capability">能力与色温范围</a></td>
          <td>色温联动亮度的最小 Mireds</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4010">
          <td><a href="#attr-0x4010"><code>0x4010</code></a></td>
          <td>StartUpColorTemperatureMireds</td>
          <td>uint16 / null</td>
          <td><a href="#attr-capability">能力与色温范围</a></td>
          <td>开机默认色温</td>
        </tr>
        <!-- 漂移补偿 & 灯具信息 -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>DriftCompensation</td>
          <td>enum8</td>
          <td><a href="#attr-info">漂移补偿与灯具信息</a></td>
          <td>颜色漂移补偿类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>CompensationText</td>
          <td>string</td>
          <td><a href="#attr-info">漂移补偿与灯具信息</a></td>
          <td>补偿机制描述文本</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>NumberOfPrimaries</td>
          <td>uint8 / null</td>
          <td><a href="#attr-info">漂移补偿与灯具信息</a></td>
          <td>灯具原色（Primary）数量</td>
        </tr>
        <!-- Primary 色坐标（折叠） -->
        <tr class="clickable-row" data-href="#attr-primary">
          <td><a href="#attr-primary"><code>0x0011~0x002A</code></a></td>
          <td>Primary1~6 (X/Y/Intensity)</td>
          <td>uint16 / uint8</td>
          <td><a href="#attr-primary">原色坐标</a></td>
          <td>6 组原色的 CIE XY 坐标与强度</td>
        </tr>
        <!-- 白点 & 色点 -->
        <tr class="clickable-row" data-href="#attr-colorpoint">
          <td><a href="#attr-colorpoint"><code>0x0030~0x003C</code></a></td>
          <td>WhitePoint / ColorPoint R/G/B</td>
          <td>uint16 / uint8</td>
          <td><a href="#attr-colorpoint">白点与色点</a></td>
          <td>白点坐标、RGB 色点坐标与强度</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性分组详解 ====== -->

  <!-- 当前颜色状态 -->
  <h3 id="attr-current">当前颜色状态</h3>
  <p>反映灯光当前的颜色参数，是 App UI 展示和状态同步的核心数据源。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>CurrentHue<br/><span class="attr-cn">当前色相</span></td>
          <td>uint8</td>
          <td>当前色相值，0~254 映射到 0°~360° 色环。需 HS feature</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentSaturation<br/><span class="attr-cn">当前饱和度</span></td>
          <td>uint8</td>
          <td>当前饱和度，0~254。0 = 白光，254 = 最高饱和度。需 HS feature</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>RemainingTime<br/><span class="attr-cn">剩余过渡时间</span></td>
          <td>uint16</td>
          <td>当前颜色过渡的剩余时间，单位 1/10 秒。0 表示无过渡进行中</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentX<br/><span class="attr-cn">当前 X 坐标</span></td>
          <td>uint16</td>
          <td>当前 CIE 1931 x 色坐标，0~0xFEFF。实际值 = CurrentX / 65536。需 XY feature</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentY<br/><span class="attr-cn">当前 Y 坐标</span></td>
          <td>uint16</td>
          <td>当前 CIE 1931 y 色坐标，0~0xFEFF。实际值 = CurrentY / 65536。需 XY feature</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ColorTemperatureMireds<br/><span class="attr-cn">当前色温</span></td>
          <td>uint16</td>
          <td>当前色温值，单位 Mireds。范围由物理限制属性决定。需 CT feature</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Hue 值映射注意</div>
    <p>
      Matter 的 Hue 取值范围是 <strong>0~254</strong>（不是 0~255 或 0~360）。换算公式：<code>角度 = Hue * 360 / 254</code>，<code>Hue = 角度 * 254 / 360</code>。
      同理 Saturation 也是 0~254。UI 上通常显示百分比：<code>百分比 = Saturation * 100 / 254</code>。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 颜色模式 -->
  <h3 id="attr-mode">颜色模式与选项</h3>
  <p>标识设备当前使用的颜色控制模型以及命令执行选项。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ColorMode<br/><span class="attr-cn">颜色模式</span></td>
          <td>enum8</td>
          <td>当前颜色模式，只读。发送不同颜色命令后设备自动切换</td>
        </tr>
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>Options<br/><span class="attr-cn">选项</span></td>
          <td>bitmap8</td>
          <td>Bit 0 = ExecuteIfOff：灯关着时是否仍然执行颜色命令。可写</td>
        </tr>
        <tr id="attr-0x4001">
          <td><code>0x4001</code></td>
          <td>EnhancedColorMode<br/><span class="attr-cn">增强颜色模式</span></td>
          <td>enum8</td>
          <td>比 ColorMode 多一个状态：Enhanced Hue and Saturation。只读</td>
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
        <span class="enum-desc">色相/饱和度模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CurrentXAndCurrentY</span>
        <span class="enum-desc">CIE XY 色坐标模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ColorTemperatureMireds</span>
        <span class="enum-desc">色温模式</span>
      </div>
    </div>
  </div>

  <h4>EnhancedColorMode Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">CurrentHueAndCurrentSaturation</span>
        <span class="enum-desc">色相/饱和度模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CurrentXAndCurrentY</span>
        <span class="enum-desc">CIE XY 色坐标模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ColorTemperatureMireds</span>
        <span class="enum-desc">色温模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">EnhancedCurrentHueAndCurrentSaturation</span>
        <span class="enum-desc">Enhanced Hue + 饱和度模式（16-bit 高精度）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ColorMode vs EnhancedColorMode</div>
    <p>
      <code>ColorMode</code> 只有 3 种值（0/1/2），是旧版兼容属性。<code>EnhancedColorMode</code> 多了第 4 种值（3 = Enhanced Hue），是实际判断设备当前颜色模式时应该优先读取的属性。
      发送 MoveToHue 命令后 ColorMode 变为 0，发送 EnhancedMoveToHue 后 EnhancedColorMode 变为 3。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Enhanced Hue & Color Loop -->
  <h3 id="attr-enhanced">Enhanced Hue 与 Color Loop</h3>
  <p>高精度色相控制和自动循环变色的状态属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>EnhancedCurrentHue<br/><span class="attr-cn">增强色相</span></td>
          <td>uint16</td>
          <td>当前 16-bit Enhanced Hue 值，0~0xFFFF。精度是标准 Hue 的 256 倍</td>
        </tr>
        <tr id="attr-0x4002">
          <td><code>0x4002</code></td>
          <td>ColorLoopActive<br/><span class="attr-cn">循环激活</span></td>
          <td>uint8</td>
          <td>0 = 未激活，1 = 已激活。需 CL feature</td>
        </tr>
        <tr id="attr-0x4003">
          <td><code>0x4003</code></td>
          <td>ColorLoopDirection<br/><span class="attr-cn">循环方向</span></td>
          <td>uint8</td>
          <td>0 = Decrement（递减），1 = Increment（递增）</td>
        </tr>
        <tr id="attr-0x4004">
          <td><code>0x4004</code></td>
          <td>ColorLoopTime<br/><span class="attr-cn">循环时间</span></td>
          <td>uint16</td>
          <td>完成一圈色相循环的时间，单位秒</td>
        </tr>
        <tr id="attr-0x4005">
          <td><code>0x4005</code></td>
          <td>ColorLoopStartEnhancedHue<br/><span class="attr-cn">循环起始色</span></td>
          <td>uint16</td>
          <td>Color Loop 开始时的 Enhanced Hue 值</td>
        </tr>
        <tr id="attr-0x4006">
          <td><code>0x4006</code></td>
          <td>ColorLoopStoredEnhancedHue<br/><span class="attr-cn">循环存储色</span></td>
          <td>uint16</td>
          <td>Color Loop 关闭时恢复到的 Enhanced Hue 值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 能力与色温范围 -->
  <h3 id="attr-capability">能力与色温范围</h3>
  <p>描述设备支持的颜色控制能力和色温物理范围。开发时必须先读取这些属性来确定可用的控制方式。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x400A">
          <td><code>0x400A</code></td>
          <td>ColorCapabilities<br/><span class="attr-cn">颜色能力</span></td>
          <td>bitmap16</td>
          <td>设备支持的颜色控制能力位图（见下方 Feature Map 定义）</td>
        </tr>
        <tr id="attr-0x400B">
          <td><code>0x400B</code></td>
          <td>ColorTempPhysicalMinMireds<br/><span class="attr-cn">最小色温</span></td>
          <td>uint16</td>
          <td>设备支持的最低色温值（Mireds），即最高 Kelvin。范围 1~65279</td>
        </tr>
        <tr id="attr-0x400C">
          <td><code>0x400C</code></td>
          <td>ColorTempPhysicalMaxMireds<br/><span class="attr-cn">最大色温</span></td>
          <td>uint16</td>
          <td>设备支持的最高色温值（Mireds），即最低 Kelvin。范围 1~65279</td>
        </tr>
        <tr id="attr-0x400D">
          <td><code>0x400D</code></td>
          <td>CoupleColorTempToLevelMinMireds<br/><span class="attr-cn">色温联动亮度最小值</span></td>
          <td>uint16</td>
          <td>当色温联动亮度功能启用时，允许的最小 Mireds 值</td>
        </tr>
        <tr id="attr-0x4010">
          <td><code>0x4010</code></td>
          <td>StartUpColorTemperatureMireds<br/><span class="attr-cn">开机色温</span></td>
          <td>uint16 / null</td>
          <td>设备上电后的初始色温。null 表示恢复上次断电前的色温。可写</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ColorCapabilities 位图</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HueSaturation（0x01）</span>
        <span class="enum-desc">支持 Hue/Saturation 控制</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EnhancedHue（0x02）</span>
        <span class="enum-desc">支持 16-bit Enhanced Hue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">ColorLoop（0x04）</span>
        <span class="enum-desc">支持自动循环变色</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">XY（0x08）</span>
        <span class="enum-desc">支持 CIE XY 色坐标控制</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ColorTemperature（0x10）</span>
        <span class="enum-desc">支持色温控制</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">色温范围举例</div>
    <p>
      一个典型的色温灯泡：<code>MinMireds = 153</code>（≈ 6536K 冷白）、<code>MaxMireds = 500</code>（= 2000K 暖黄）。
      UI 上色温滑条的两端应该取这两个值。发送 MoveToColorTemperature 时目标值超出此范围，设备会自动裁剪。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 漂移补偿与灯具信息 -->
  <h3 id="attr-info">漂移补偿与灯具信息</h3>
  <p>描述灯具的颜色漂移补偿机制和原色（Primary）数量。大多数 App 开发无需关注这些属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>DriftCompensation<br/><span class="attr-cn">漂移补偿</span></td>
          <td>enum8</td>
          <td>灯具使用的颜色漂移补偿类型</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>CompensationText<br/><span class="attr-cn">补偿描述</span></td>
          <td>string</td>
          <td>对漂移补偿机制的文字描述</td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>NumberOfPrimaries<br/><span class="attr-cn">原色数量</span></td>
          <td>uint8 / null</td>
          <td>灯具中独立颜色原色（LED 通道）的数量，最大 6。null 表示未知</td>
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
        <span class="enum-desc">无漂移补偿</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OtherOrUnknown</span>
        <span class="enum-desc">其他或未知补偿方式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">TemperatureMonitoring</span>
        <span class="enum-desc">温度监测补偿</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OpticalLuminanceMonitoringAndFeedback</span>
        <span class="enum-desc">光学亮度监测与反馈</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OpticalColorMonitoringAndFeedback</span>
        <span class="enum-desc">光学颜色监测与反馈</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 原色坐标 -->
  <h3 id="attr-primary">原色坐标(Primary 1~6)</h3>
  <p>
    灯具最多可以声明 6 组原色（Primary），每组包含 CIE XY 坐标和强度值。这些属性描述灯具 LED 的物理色域，
    通常由固件设置，App 开发一般不需要读取。
  </p>

  <details class="scenario">
    <summary>Primary 1~6 属性列表(点击展开)</summary>
    <div class="scenario-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>组</th><th>X 坐标 ID</th><th>Y 坐标 ID</th><th>强度 ID</th></tr>
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
      <p>所有 X / Y 坐标为 uint16 类型，范围 0~0xFEFF；Intensity 为 uint8 / nullable 类型。</p>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 白点与色点 -->
  <h3 id="attr-colorpoint">白点与色点</h3>
  <p>
    描述灯具的白点坐标和 RGB 三色点坐标，用于色彩校准。这些属性可写，通常由高级校准工具使用，
    App 开发一般不需要关注。
  </p>

  <details class="scenario">
    <summary>白点与色点属性列表(点击展开)</summary>
    <div class="scenario-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>0x0030</code></td><td>WhitePointX</td><td>uint16</td><td>白点 CIE x 坐标</td></tr>
            <tr><td><code>0x0031</code></td><td>WhitePointY</td><td>uint16</td><td>白点 CIE y 坐标</td></tr>
            <tr><td><code>0x0032</code></td><td>ColorPointRX</td><td>uint16</td><td>红色点 CIE x 坐标</td></tr>
            <tr><td><code>0x0033</code></td><td>ColorPointRY</td><td>uint16</td><td>红色点 CIE y 坐标</td></tr>
            <tr><td><code>0x0034</code></td><td>ColorPointRIntensity</td><td>uint8 / null</td><td>红色点强度</td></tr>
            <tr><td><code>0x0036</code></td><td>ColorPointGX</td><td>uint16</td><td>绿色点 CIE x 坐标</td></tr>
            <tr><td><code>0x0037</code></td><td>ColorPointGY</td><td>uint16</td><td>绿色点 CIE y 坐标</td></tr>
            <tr><td><code>0x0038</code></td><td>ColorPointGIntensity</td><td>uint8 / null</td><td>绿色点强度</td></tr>
            <tr><td><code>0x003A</code></td><td>ColorPointBX</td><td>uint16</td><td>蓝色点 CIE x 坐标</td></tr>
            <tr><td><code>0x003B</code></td><td>ColorPointBY</td><td>uint16</td><td>蓝色点 CIE y 坐标</td></tr>
            <tr><td><code>0x003C</code></td><td>ColorPointBIntensity</td><td>uint8 / null</td><td>蓝色点强度</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">命令参数枚举值速查</h2>
  <p>以下枚举类型在多个命令的参数中复用。</p>

  <h4>DirectionEnum(色相过渡方向)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Shortest</span>
        <span class="enum-desc">最短路径（在色环上取近路）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Longest</span>
        <span class="enum-desc">最长路径（在色环上绕远路）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">数值递增方向</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">数值递减方向</span>
      </div>
    </div>
  </div>

  <h4>MoveModeEnum(持续移动模式)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stop</span>
        <span class="enum-desc">停止移动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">向上（数值递增）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">向下（数值递减）</span>
      </div>
    </div>
  </div>

  <h4>StepModeEnum(步进方向)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">步进增加</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">步进减少</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">注意 MoveMode / StepMode 的值间隔</div>
    <p>
      <code>MoveModeEnum</code> 的值是 0、1、3（没有 2），<code>StepModeEnum</code> 的值是 1、3（没有 0 和 2）。
      这是沿用自 ZCL（ZigBee Cluster Library）的历史设计。传错值（比如 2）设备会返回错误。
    </p>
  </div>

  <h4>ColorLoopActionEnum(循环动作)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Deactivate</span>
        <span class="enum-desc">关闭 Color Loop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ActivateFromColorLoopStartEnhancedHue</span>
        <span class="enum-desc">从 ColorLoopStartEnhancedHue 开始循环</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActivateFromEnhancedCurrentHue</span>
        <span class="enum-desc">从当前 Enhanced Hue 开始循环</span>
      </div>
    </div>
  </div>

  <h4>ColorLoopDirectionEnum(循环方向)</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Decrement</span>
        <span class="enum-desc">色相递减方向循环</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Increment</span>
        <span class="enum-desc">色相递增方向循环</span>
      </div>
    </div>
  </div>

  <h4>UpdateFlags 位图(ColorLoopSet Commands参数)</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">UpdateAction（0x01）</span>
        <span class="enum-desc">更新 Action 字段</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">UpdateDirection（0x02）</span>
        <span class="enum-desc">更新 Direction 字段</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">UpdateTime（0x04）</span>
        <span class="enum-desc">更新 Time 字段</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">UpdateStartHue（0x08）</span>
        <span class="enum-desc">更新 StartHue 字段</span>
      </div>
    </div>
  </div>

  <!-- ====== 标准示例 ====== -->
  <h2 id="standard-example">Standard Example</h2>
  <p>以下是一个支持全能力（HS + XY + CT + EHUE + CL）的全彩灯的典型属性数据示例：</p>

  <pre><code>{
  // --- 当前颜色状态 ---
  "0x0000": 127,         // CurrentHue = 127（约 180°，青色附近）
  "0x0001": 200,         // CurrentSaturation = 200（高饱和度）
  "0x0003": 24939,       // CurrentX = 24939（CIE x ≈ 0.3805）
  "0x0004": 24701,       // CurrentY = 24701（CIE y ≈ 0.3769）
  "0x0007": 370,         // ColorTemperatureMireds = 370（≈ 2703K 暖白）
  "0x0002": 0,           // RemainingTime = 0（无过渡进行中）

  // --- 颜色模式 ---
  "0x0008": 2,           // ColorMode = ColorTemperature（当前用色温控制）
  "0x4001": 2,           // EnhancedColorMode = ColorTemperature
  "0x000F": 0,           // Options = 0（不启用 ExecuteIfOff）

  // --- Enhanced Hue &amp; Color Loop ---
  "0x4000": 0,           // EnhancedCurrentHue = 0
  "0x4002": 0,           // ColorLoopActive = 0（未激活循环）
  "0x4003": 0,           // ColorLoopDirection = Decrement
  "0x4004": 25,          // ColorLoopTime = 25 秒
  "0x4005": 0,           // ColorLoopStartEnhancedHue = 0
  "0x4006": 0,           // ColorLoopStoredEnhancedHue = 0

  // --- 能力与色温范围 ---
  "0x400A": 31,          // ColorCapabilities = 0x1F（支持全部五种能力）
  "0x400B": 153,         // ColorTempPhysicalMinMireds = 153（≈ 6536K）
  "0x400C": 500,         // ColorTempPhysicalMaxMireds = 500（≈ 2000K）
  "0x400D": 153,         // CoupleColorTempToLevelMinMireds = 153
  "0x4010": 370          // StartUpColorTemperatureMireds = 370（开机暖白）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      实际从设备读取数据时，Attribute ID 是十六进制字符串作为 key。<code>"0x0007"</code> 是 ColorTemperatureMireds，<code>"0x400A"</code> 是 ColorCapabilities。
      位图值 31 = <code>0x1F</code> = 二进制 <code>11111</code>，表示五种能力全部支持。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-color-temp">场景 1：色温滑条调节</h3>
  <ol>
    <li>读取 <code>ColorCapabilities (0x400A)</code>，确认 Bit 4（CT）为 1</li>
    <li>读取 <code>ColorTempPhysicalMinMireds (0x400B)</code> 和 <code>ColorTempPhysicalMaxMireds (0x400C)</code> 确定滑条范围</li>
    <li>用户拖动滑条时，将 Kelvin 转换为 Mireds：<code>mireds = 1000000 / kelvin</code></li>
    <li>发送 <code>MoveToColorTemperature (0x0A)</code>，TransitionTime 设为 5（0.5 秒过渡）</li>
    <li>订阅 <code>ColorTemperatureMireds (0x0007)</code> 确认设备已到达目标色温</li>
  </ol>

  <h3 id="scenario-color-wheel">场景 2：色盘选色(Hue/Saturation)</h3>
  <ol>
    <li>读取 <code>ColorCapabilities (0x400A)</code>，确认 Bit 0（HS）为 1</li>
    <li>用户在色盘上选择一个点，获取角度和半径</li>
    <li>角度 → Hue：<code>hue = angle * 254 / 360</code></li>
    <li>半径 → Saturation：<code>saturation = radius * 254 / maxRadius</code></li>
    <li>发送 <code>MoveToHueAndSaturation (0x06)</code> 一次设置两个值</li>
    <li>订阅 <code>CurrentHue (0x0000)</code> 和 <code>CurrentSaturation (0x0001)</code> 确认结果</li>
  </ol>

  <h3 id="scenario-ui-init">场景 3：灯光控制页面初始化</h3>
  <ol>
    <li>读取 <code>ColorCapabilities (0x400A)</code> —— 决定 UI 上展示哪些控制组件（色盘、色温滑条等）</li>
    <li>读取 <code>EnhancedColorMode (0x4001)</code> —— 确定当前是哪种颜色模式，高亮对应的 UI Tab</li>
    <li>根据模式读取对应属性：色温模式读 <code>ColorTemperatureMireds</code>，HS 模式读 <code>CurrentHue</code> + <code>CurrentSaturation</code></li>
    <li>如支持 CT，读取 <code>ColorTempPhysicalMinMireds</code> / <code>MaxMireds</code> 设置滑条范围</li>
    <li>订阅所有相关属性的变化，保持 UI 与设备状态同步</li>
  </ol>

  <h3 id="scenario-party-mode">场景 4：氛围灯 / 派对模式(Color Loop)</h3>
  <ol>
    <li>读取 <code>ColorCapabilities (0x400A)</code>，确认 Bit 2（CL）为 1</li>
    <li>发送 <code>ColorLoopSet (0x44)</code>：UpdateFlags = <code>0x0F</code>，Action = <code>2</code>（从当前色开始），Direction = <code>1</code>（递增），Time = <code>30</code>（30 秒一圈）</li>
    <li>读取 <code>ColorLoopActive (0x4002)</code> 确认循环已激活</li>
    <li>关闭时再次发送 ColorLoopSet，Action = <code>0</code>（Deactivate）</li>
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

  :global(.dark) .feature-tag {
    background: #1e3a5f;
    color: #93c5fd;
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
