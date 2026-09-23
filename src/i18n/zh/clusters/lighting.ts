import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'on-off': {
    title: '开关 Cluster · OnOff（0x0006）',
    description: 'Matter OnOff Cluster（0x0006）完整参考 — Off/On/Toggle 基础命令、OffWithEffect 渐变关闭、StartUpOnOff 上电行为、定时开关等全部属性与命令定义及枚举值速查。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: undefined,
    content: `<h1>开关 Cluster（OnOff）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0006</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    OnOff 是 Matter 中最基础的控制 Cluster —— 负责设备的开/关/切换操作。
    所有需要「开关」能力的设备类型（灯、插座、开关面板等）都依赖这个 Cluster。
    它也是入门 Matter 开发时最先接触的 Cluster。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Lighting 特性（LT）</div>
    <p>
      OnOff Cluster 定义了一个 <strong>Lighting（LT）</strong> Feature。
      启用 LT 后，Cluster 会额外提供 GlobalSceneControl、OnTime、OffWaitTime、StartUpOnOff 四个属性，
      以及 OffWithEffect、OnWithRecallGlobalScene、OnWithTimedOff 三个高级命令。
      灯具类设备通常启用此特性，普通开关面板可能不需要。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    OnOff Cluster 共有 6 个命令。基础三件套（Off / On / Toggle）是所有设备都支持的，
    后三个高级命令需要设备启用 Lighting（LT）特性。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>所需特性</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Off</td>
          <td>关闭设备</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>On</td>
          <td>开启设备</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Toggle</td>
          <td>切换开关状态</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>OffWithEffect</td>
          <td>带过渡效果关闭</td>
          <td class="col-required">LT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x41">
          <td><a href="#cmd-0x41"><code>0x41</code></a></td>
          <td>OnWithRecallGlobalScene</td>
          <td>开启并恢复全局场景</td>
          <td class="col-required">LT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x42">
          <td><a href="#cmd-0x42"><code>0x42</code></a></td>
          <td>OnWithTimedOff</td>
          <td>定时开启（超时后自动关闭）</td>
          <td class="col-required">LT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Off —— 关闭（0x00）</h3>
  <p>
    将设备切换到关闭状态。执行成功后，<code>OnOff</code> 属性变为 <code>false</code>。
    这是最基础的命令，不需要任何参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户点击 App 上的关灯按钮、自动化规则触发关灯、语音助手执行「关灯」指令时调用。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">On —— 开启（0x01）</h3>
  <p>
    将设备切换到开启状态。执行成功后，<code>OnOff</code> 属性变为 <code>true</code>。
    同样不需要参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户点击开灯按钮、人体传感器检测到有人触发开灯时调用。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">Toggle —— 切换（0x02）</h3>
  <p>
    切换设备当前状态：如果当前是开，变为关；如果当前是关，变为开。
    适合不关心当前状态、只想「翻转」的场景。不需要参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>物理墙壁开关的按下动作、遥控器的单一按键操作。相比单独发 On 或 Off，Toggle 不需要先读取当前状态。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x40">OffWithEffect —— 带效果关闭（0x40）</h3>
  <p>
    关闭设备的同时应用一个视觉过渡效果（如渐灭、延迟关闭等）。
    关闭前会自动保存当前场景到全局场景（GlobalScene），以便后续通过 OnWithRecallGlobalScene 恢复。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EffectIdentifier</td>
          <td>EffectIdentifierEnum</td>
          <td>效果类型（见下方枚举）</td>
        </tr>
        <tr>
          <td>EffectVariant</td>
          <td>enum8</td>
          <td>效果变体（含义取决于 EffectIdentifier 的值）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>EffectIdentifier 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DelayedAllOff</span>
        <span class="enum-desc">延迟全灭 —— 先淡出再关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DyingLight</span>
        <span class="enum-desc">残灯效果 —— 模拟灯泡熄灭时先变亮再暗灭</span>
      </div>
    </div>
  </div>

  <h4>DelayedAllOff 的 EffectVariant</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DelayedOffFastFade</span>
        <span class="enum-desc">快速淡出（默认）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NoFade</span>
        <span class="enum-desc">无淡出，直接关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">DelayedOffSlowFade</span>
        <span class="enum-desc">慢速淡出</span>
      </div>
    </div>
  </div>

  <h4>DyingLight 的 EffectVariant</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DyingLightFadeOff</span>
        <span class="enum-desc">先增亮 20% 再缓慢熄灭（默认且唯一）</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        智能灯「晚安」场景：用户点击后灯光慢慢熄灭（DelayedAllOff + SlowFade），而非突然黑灯。
        设备会在关闭前保存当前亮度和颜色到 GlobalScene，下次调用 OnWithRecallGlobalScene 时可恢复。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x41">OnWithRecallGlobalScene —— 开启并恢复场景（0x41）</h3>
  <p>
    开启设备并恢复之前 OffWithEffect 保存的全局场景（GlobalScene）。
    没有参数。执行后 <code>GlobalSceneControl</code> 重新变为 <code>true</code>。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        与 OffWithEffect 配对使用。例如：晚上用 OffWithEffect 关灯（保存了 70% 暖光的状态），
        早上调用 OnWithRecallGlobalScene，灯会直接恢复到 70% 暖光，而不是默认的 100% 白光。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x42">OnWithTimedOff —— 定时开启（0x42）</h3>
  <p>
    开启设备并设定一个自动关闭倒计时。如果设备已经开启，则刷新倒计时时间。
    适合「只开一会儿」的临时需求。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OnOffControl</td>
          <td>OnOffControlBitmap</td>
          <td>Bit 0: AcceptOnlyWhenOn —— 为 1 时，仅在设备已开启时才接受此命令</td>
        </tr>
        <tr>
          <td>OnTime</td>
          <td>uint16</td>
          <td>开启持续时间，单位 1/10 秒。例如 <code>300</code> = 30 秒</td>
        </tr>
        <tr>
          <td>OffWaitTime</td>
          <td>uint16</td>
          <td>关闭后的等待时间（防抖），单位 1/10 秒</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>
        走廊灯、楼道灯：人体传感器触发时发送 OnWithTimedOff（OnTime=300，即 30 秒），
        如果在 30 秒内没有再次触发，灯自动关闭。
        如果有新检测，重新发一次 OnWithTimedOff 即可刷新倒计时。
      </p>
      <p>
        <strong>AcceptOnlyWhenOn</strong> 的用途：避免在用户手动关灯后，传感器又把灯打开。
        设置 AcceptOnlyWhenOn = 1 后，只有灯已经亮着时才续时，不会重新打开已关闭的灯。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>OnOff Cluster 共有 5 个应用属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>分组</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <!-- 开关状态 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>OnOff</td>
          <td>bool</td>
          <td><a href="#group-state">开关状态</a></td>
          <td>当前开关状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>GlobalSceneControl</td>
          <td>bool</td>
          <td><a href="#group-state">开关状态</a></td>
          <td>全局场景是否有效</td>
        </tr>
        <!-- 定时参数 -->
        <tr class="clickable-row" data-href="#attr-0x4001">
          <td><a href="#attr-0x4001"><code>0x4001</code></a></td>
          <td>OnTime</td>
          <td>uint16</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>剩余开启时间（1/10 秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x4002">
          <td><a href="#attr-0x4002"><code>0x4002</code></a></td>
          <td>OffWaitTime</td>
          <td>uint16</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>关闭等待时间（1/10 秒）</td>
        </tr>
        <!-- 上电行为 -->
        <tr class="clickable-row" data-href="#attr-0x4003">
          <td><a href="#attr-0x4003"><code>0x4003</code></a></td>
          <td>StartUpOnOff</td>
          <td>enum8 / null</td>
          <td><a href="#group-startup">上电行为</a></td>
          <td>设备上电时的初始状态</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 开关状态（0x0000, 0x4000）====== -->
  <h3 id="group-state">开关状态（0x0000, 0x4000）</h3>
  <p>描述设备当前的开关状态和全局场景控制标记。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>OnOff（开关状态）</td>
          <td>bool</td>
          <td>设备当前的开关状态。<code>true</code> = 开启，<code>false</code> = 关闭。这是 OnOff Cluster 唯一的必选属性</td>
        </tr>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>GlobalSceneControl（全局场景控制）</td>
          <td>bool</td>
          <td>标识全局场景是否有效。调用 OffWithEffect 后变为 <code>false</code>（场景已保存待恢复），调用 OnWithRecallGlobalScene 后恢复为 <code>true</code>。<strong>需要 LT 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 定时参数（0x4001, 0x4002）====== -->
  <h3 id="group-timing">定时参数（0x4001, 0x4002）</h3>
  <p>用于 OnWithTimedOff 命令的倒计时控制。这两个属性由设备自动维护，通常不需要手动写入。</p>

  <div class="callout callout-warning">
    <div class="callout-title">时间单位注意</div>
    <p>
      <code>OnTime</code> 和 <code>OffWaitTime</code> 的单位是 <strong>1/10 秒</strong>（100 毫秒），不是秒也不是毫秒。
      例如值为 <code>300</code> 表示 30 秒，值为 <code>10</code> 表示 1 秒。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x4001">
          <td><code>0x4001</code></td>
          <td>OnTime（开启倒计时）</td>
          <td>uint16</td>
          <td>设备剩余的开启时间，单位 1/10 秒。由 OnWithTimedOff 命令设置，倒计时归零后设备自动关闭。值为 <code>0</code> 表示未启用定时。<strong>需要 LT 特性</strong></td>
        </tr>
        <tr id="attr-0x4002">
          <td><code>0x4002</code></td>
          <td>OffWaitTime（关闭等待时间）</td>
          <td>uint16</td>
          <td>设备关闭后的等待期，单位 1/10 秒。在此期间如果收到 OnWithTimedOff 且 AcceptOnlyWhenOn = 1，命令会被忽略。用于防止传感器误触发重新开灯。<strong>需要 LT 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 上电行为（0x4003）====== -->
  <h3 id="group-startup">上电行为（0x4003）</h3>
  <p>控制设备上电（或重启）后的初始开关状态。这个属性对用户体验影响很大 —— 断电恢复后灯是亮还是灭，取决于它。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x4003">
          <td><code>0x4003</code></td>
          <td>StartUpOnOff（上电行为）</td>
          <td>enum8 / null</td>
          <td>设备上电后的开关状态（见下方枚举）。Nullable —— <code>null</code> 表示恢复断电前的状态。写入需要 <strong>manage</strong> 权限。<strong>需要 LT 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StartUpOnOff 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">上电后始终关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">上电后始终开启</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Toggle</span>
        <span class="enum-desc">上电后切换为断电前的相反状态</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Previous</span>
        <span class="enum-desc">恢复断电前的状态（最常用）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">null 与 0xFF</div>
    <p>
      StartUpOnOff 是 <strong>Nullable</strong> 类型。在 Matter 协议的线上编码中，<code>null</code> 对应 <code>0xFF</code>。
      所以如果你在底层协议数据中看到 <code>0xFF</code>，实际含义是「恢复断电前的状态」，不是一个有效的枚举值。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>OnOff Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LT（Lighting）</span>
        <span class="enum-desc">灯具特性 —— 启用场景保存/恢复、定时开关、渐变关闭、上电行为</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">DF（DeadFrontBehavior）</span>
        <span class="enum-desc">关闭时切断前端电源，设备处于「死前端」状态（不响应交互）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">OO（OffOnly）</span>
        <span class="enum-desc">仅支持关闭操作（设备由外部机制开启，如物理按钮）</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个启用了 Lighting 特性的智能灯在开启状态下的 OnOff Cluster 读取结果：</p>

  <pre><code>{
  // --- 开关状态 ---
  "0x0000": true,           // OnOff = true（当前为开启状态）
  "0x4000": true,           // GlobalSceneControl = true（全局场景有效）

  // --- 定时参数 ---
  "0x4001": 0,              // OnTime = 0（未启用定时开启）
  "0x4002": 0,              // OffWaitTime = 0（未启用关闭等待）

  // --- 上电行为 ---
  "0x4003": null             // StartUpOnOff = null（保持断电前的状态）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      对于最简单的设备（如普通开关面板、插座），可能只有 <code>OnOff (0x0000)</code> 一个属性。
      只有支持 Lighting 特性的设备才会上报 0x4000 ~ 0x4003 这四个属性。
      读取前可先检查 <code>FeatureMap (0xFFFC)</code> 判断设备支持哪些特性。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-basic">场景 1：基础开关控制</h3>
  <ol>
    <li>发送 <code>On (0x01)</code> 或 <code>Off (0x00)</code> 命令控制设备</li>
    <li>订阅 <code>OnOff (0x0000)</code> 属性变化，同步 App 界面状态</li>
    <li>如果不关心当前状态，可以直接用 <code>Toggle (0x02)</code></li>
  </ol>

  <h3 id="scenario-timed">场景 2：走廊灯 / 感应灯自动关闭</h3>
  <ol>
    <li>传感器检测到有人，发送 <code>OnWithTimedOff (0x42)</code>，OnTime 设为 <code>300</code>（30 秒）</li>
    <li>30 秒内无人，灯自动关闭</li>
    <li>如果又检测到人，再次发送 OnWithTimedOff 刷新倒计时</li>
    <li>设置 AcceptOnlyWhenOn = 1 可防止用户手动关灯后传感器又把灯打开</li>
  </ol>

  <h3 id="scenario-startup">场景 3：设置上电恢复行为</h3>
  <ol>
    <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 Lighting（LT）特性</li>
    <li>写入 <code>StartUpOnOff (0x4003)</code> 的值：
      <ul>
        <li><code>0</code>（Off）—— 停电后恢复供电时灯保持关闭</li>
        <li><code>1</code>（On）—— 恢复供电后灯自动亮起</li>
        <li><code>null</code>（Previous）—— 恢复到断电前的状态（推荐）</li>
      </ul>
    </li>
    <li>注意：写入 StartUpOnOff 需要 <strong>manage</strong> 级别的权限（Administrator 角色）</li>
  </ol>

  <h3 id="scenario-goodnight">场景 4：渐灭 + 场景恢复（晚安 / 早安）</h3>
  <ol>
    <li>晚安时：发送 <code>OffWithEffect (0x40)</code>，设备保存当前亮度和颜色到全局场景，然后渐灭</li>
    <li>早安时：发送 <code>OnWithRecallGlobalScene (0x41)</code>，设备恢复到晚安前的亮度和颜色</li>
    <li>注意：直接调用 <code>On (0x01)</code> 不会恢复场景，灯会以默认亮度开启</li>
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
    title: '亮度控制 Cluster · LevelControl（0x0008）',
    description: 'Matter LevelControl Cluster（0x0008）完整参考 — MoveToLevel/Move/Step 命令、CurrentLevel/OnLevel 等全部属性定义、枚举值速查、过渡时间机制说明与真实设备数据示例。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: undefined,
    content: `<h1>亮度控制 Cluster（LevelControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0008</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    LevelControl 提供了对设备「可调级别」的完整控制能力 —— 最典型的场景是灯的亮度调节，但也适用于风扇转速、窗帘开合度等任何可以用数值表示「程度」的设备。
    它定义了两组命令：一组不影响 OnOff 状态，另一组会联动 OnOff Cluster 的开关状态。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 OnOff Cluster 的关系</div>
    <p>
      LevelControl 通常和 <strong>OnOff Cluster（0x0006）</strong>配合使用。
      带 <code>WithOnOff</code> 后缀的命令（如 <code>MoveToLevelWithOnOff</code>）会在亮度为 0 时自动关灯、在亮度大于 0 时自动开灯。
      不带后缀的命令只调亮度，不动开关。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举与位图</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Map</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    LevelControl 提供两组命令：基本组（0x00~0x03）和 WithOnOff 组（0x04~0x07）。
    两组命令的参数完全一样，区别在于 WithOnOff 组会联动 OnOff Cluster 的开关状态。
    此外还有一个频率控制命令（0x08），仅在设备支持 Frequency feature 时可用。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>联动 OnOff</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>MoveToLevel</td>
          <td>移动到指定亮度</td>
          <td class="col-optional">不联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Move</td>
          <td>持续向上/向下移动亮度</td>
          <td class="col-optional">不联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Step</td>
          <td>按步进值调整亮度</td>
          <td class="col-optional">不联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Stop</td>
          <td>停止正在进行的亮度移动</td>
          <td class="col-optional">不联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>MoveToLevelWithOnOff</td>
          <td>移动到指定亮度（联动开关）</td>
          <td class="col-required">联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>MoveWithOnOff</td>
          <td>持续移动亮度（联动开关）</td>
          <td class="col-required">联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>StepWithOnOff</td>
          <td>按步进值调整亮度（联动开关）</td>
          <td class="col-required">联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>StopWithOnOff</td>
          <td>停止移动（联动开关）</td>
          <td class="col-required">联动</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>MoveToClosestFrequency</td>
          <td>移动到最接近的频率值</td>
          <td class="col-optional">不联动</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">过渡时间单位</div>
    <p>
      所有命令中的 <code>TransitionTime</code> 参数单位是<strong>十分之一秒</strong>（0.1s）。
      例如传入 <code>10</code> 表示 1 秒，传入 <code>50</code> 表示 5 秒。
      如果传入 <code>0xFFFF</code>（65535），设备会使用 <code>OnOffTransitionTime</code> 属性的值作为默认过渡时间。
    </p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">MoveToLevel —— 移动到指定亮度（0x00）</h3>
  <p>
    将 <code>CurrentLevel</code> 从当前值平滑过渡到指定的目标亮度。这是最常用的命令 —— App 上的亮度滑块松手时就是发这个命令。
    不会影响 OnOff 状态，即使目标亮度是 0 也不会关灯。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Level</td><td>uint8</td><td>目标亮度值，范围 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>过渡时间（0.1s 为单位）。<code>null</code> 使用 <code>OnOffTransitionTime</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码（见 <a href="#bitmap-options">OptionsBitmap</a>）</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖值</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在 App 上拖动亮度滑块时调用。发送前读取 <code>MinLevel (0x02)</code> 和 <code>MaxLevel (0x03)</code> 确认有效范围，将 UI 滑块的百分比映射到这个范围内。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">Move —— 持续移动亮度（0x01）</h3>
  <p>
    让 <code>CurrentLevel</code> 以指定速率持续向上或向下变化，直到达到 MinLevel/MaxLevel 或收到 Stop 命令。
    适合长按按钮持续调光的场景。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>MoveMode</td><td>enum8</td><td>移动方向：<code>0</code> = Up，<code>1</code> = Down（见 <a href="#enum-movemode">MoveModeEnum</a>）</td></tr>
        <tr><td>Rate</td><td>uint8 / null</td><td>每秒变化的单位数。<code>null</code> 使用 <code>DefaultMoveRate</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖值</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户长按物理调光按钮时触发。按下时发送 <code>Move</code>（指定方向），松手时发送 <code>Stop</code> 停止变化。适合实体开关或遥控器的持续调光交互。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">Step —— 按步进值调整亮度（0x02）</h3>
  <p>
    将 <code>CurrentLevel</code> 按指定步进值向上或向下调整一档。适合短按按钮「调亮一格」「调暗一格」的场景。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>StepMode</td><td>enum8</td><td>步进方向：<code>0</code> = Up，<code>1</code> = Down（见 <a href="#enum-stepmode">StepModeEnum</a>）</td></tr>
        <tr><td>StepSize</td><td>uint8</td><td>步进大小（变化的绝对值）</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>过渡时间（0.1s 为单位）。<code>null</code> 使用 <code>OnOffTransitionTime</code></td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖值</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户短按物理按钮或 App 中的「+/-」按钮调光时使用。每次按下发送一次 Step 命令，实现逐级调光。典型步进值为 25~50（约 10%~20% 亮度变化）。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">Stop —— 停止移动（0x03）</h3>
  <p>
    停止正在进行的 Move 或 Step 过渡。<code>CurrentLevel</code> 会保持在收到 Stop 命令时的值。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖值</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">MoveToLevelWithOnOff —— 移动到指定亮度（联动开关）（0x04）</h3>
  <p>
    功能与 <code>MoveToLevel</code> 完全相同，区别在于会联动 OnOff Cluster：目标亮度为 0 时自动关灯（OnOff 变为 Off），目标亮度大于 0 时自动开灯（OnOff 变为 On）。
    <strong>App 调光时应优先使用这个命令</strong>，确保亮度和开关状态始终一致。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Level</td><td>uint8</td><td>目标亮度值，范围 0~254</td></tr>
        <tr><td>TransitionTime</td><td>uint16 / null</td><td>过渡时间（0.1s 为单位）</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖值</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>App 调光的首选命令。拖动亮度滑块到 0 时灯会自动关掉，拖到任意正值时灯会自动亮起，保证用户看到的 UI 状态与实际设备一致。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">MoveWithOnOff —— 持续移动亮度（联动开关）（0x05）</h3>
  <p>功能与 <code>Move</code> 相同，但移动过程中会联动 OnOff 状态。参数与 <code>Move</code> 一致。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">StepWithOnOff —— 按步进值调整亮度（联动开关）（0x06）</h3>
  <p>功能与 <code>Step</code> 相同，但步进过程中会联动 OnOff 状态。参数与 <code>Step</code> 一致。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">StopWithOnOff —— 停止移动（联动开关）（0x07）</h3>
  <p>功能与 <code>Stop</code> 相同，但联动 OnOff 状态。参数与 <code>Stop</code> 一致。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x08">MoveToClosestFrequency —— 移动到最近频率（0x08）</h3>
  <p>
    将 <code>CurrentFrequency</code> 移动到设备支持的最接近目标频率的值。仅在设备支持 <strong>Frequency</strong> feature 时可用，日常灯控开发中很少用到。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Frequency</td><td>uint16</td><td>目标频率值</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>LevelControl 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>分组</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <!-- 当前状态 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>CurrentLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-state">当前状态</a></td>
          <td>当前亮度值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>RemainingTime</td>
          <td>uint16</td>
          <td><a href="#group-state">当前状态</a></td>
          <td>过渡剩余时间</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MinLevel</td>
          <td>uint8</td>
          <td><a href="#group-state">当前状态</a></td>
          <td>最低可用级别</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>MaxLevel</td>
          <td>uint8</td>
          <td><a href="#group-state">当前状态</a></td>
          <td>最高可用级别</td>
        </tr>
        <!-- 频率控制 -->
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>CurrentFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">频率控制</a></td>
          <td>当前频率</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>MinFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">频率控制</a></td>
          <td>最低频率</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>MaxFrequency</td>
          <td>uint16</td>
          <td><a href="#group-frequency">频率控制</a></td>
          <td>最高频率</td>
        </tr>
        <!-- 过渡与开关联动 -->
        <tr class="clickable-row" data-href="#attr-0x0F">
          <td><a href="#attr-0x0F"><code>0x0F</code></a></td>
          <td>Options</td>
          <td>bitmap8</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>命令执行选项</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>OnOffTransitionTime</td>
          <td>uint16</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>开关过渡时间</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>OnLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>开灯时的目标亮度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>OnTransitionTime</td>
          <td>uint16 / null</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>开灯过渡时间</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>OffTransitionTime</td>
          <td>uint16 / null</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>关灯过渡时间</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>DefaultMoveRate</td>
          <td>uint8 / null</td>
          <td><a href="#group-transition">过渡与开关联动</a></td>
          <td>默认移动速率</td>
        </tr>
        <!-- 启动行为 -->
        <tr class="clickable-row" data-href="#attr-0x4000">
          <td><a href="#attr-0x4000"><code>0x4000</code></a></td>
          <td>StartUpCurrentLevel</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">启动行为</a></td>
          <td>上电初始亮度</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 当前状态（0x00-0x03）====== -->
  <h3 id="group-state">当前状态（0x00 – 0x03）</h3>
  <p>描述设备当前的亮度级别和允许的范围。这是 App 展示亮度状态最直接的数据来源。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>CurrentLevel<br/><span class="attr-cn">当前亮度</span></td>
          <td>uint8 / null</td>
          <td>设备当前的亮度级别。有效范围 <code>MinLevel</code>~<code>MaxLevel</code>（通常 1~254）。<strong>Nullable</strong> —— 设备不确定当前级别时返回 <code>null</code></td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>RemainingTime<br/><span class="attr-cn">剩余过渡时间</span></td>
          <td>uint16</td>
          <td>当前过渡动画的剩余时间，单位 <strong>0.1 秒</strong>。无过渡进行时为 <code>0</code></td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>MinLevel<br/><span class="attr-cn">最低级别</span></td>
          <td>uint8</td>
          <td>设备支持的最低亮度值。支持 Lighting feature 时默认 <code>1</code>，不支持时默认 <code>0</code></td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>MaxLevel<br/><span class="attr-cn">最高级别</span></td>
          <td>uint8</td>
          <td>设备支持的最高亮度值。默认 <code>254</code>（0xFE）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CurrentLevel 是 Nullable</div>
    <p>
      和 DoorLock 的 <code>LockState</code> 一样，<code>CurrentLevel</code> 可能为 <code>null</code>。
      设备刚上电、固件升级后或硬件异常时都可能出现。
      App 端显示亮度时务必处理 <code>null</code> 值，可以显示为「未知」或使用 <code>MinLevel</code> 作为默认值。
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">亮度值映射</div>
    <p>
      <code>CurrentLevel</code> 的范围是 <code>MinLevel</code>~<code>MaxLevel</code>（通常 1~254），不是 0~100。
      转换为百分比的公式：<code>百分比 = (CurrentLevel - MinLevel) / (MaxLevel - MinLevel) * 100</code>。
      例如 MinLevel=1, MaxLevel=254, CurrentLevel=127 时约为 <strong>50%</strong> 亮度。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 频率控制（0x04-0x06）====== -->
  <h3 id="group-frequency">频率控制（0x04 – 0x06）</h3>
  <p>描述设备的频率控制能力。仅在设备支持 <strong>Frequency</strong> feature（Feature Map Bit 2）时才有这些属性。</p>

  <div class="callout callout-info">
    <div class="callout-title">适用范围</div>
    <p>
      频率控制属性在普通灯具开发中<strong>很少用到</strong>。它主要用于需要精确控制输出频率的特殊设备（如某些工业照明或信号设备）。
      绝大多数智能灯只用到当前状态和过渡相关的属性。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>CurrentFrequency<br/><span class="attr-cn">当前频率</span></td>
          <td>uint16</td>
          <td>设备当前的输出频率</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>MinFrequency<br/><span class="attr-cn">最低频率</span></td>
          <td>uint16</td>
          <td>设备支持的最低频率</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>MaxFrequency<br/><span class="attr-cn">最高频率</span></td>
          <td>uint16</td>
          <td>设备支持的最高频率</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 过渡与开关联动（0x0F-0x14）====== -->
  <h3 id="group-transition">过渡与开关联动（0x0F – 0x14）</h3>
  <p>
    控制亮度变化的过渡行为，以及 OnOff Cluster 开灯/关灯时如何影响亮度。
    这组属性直接决定了用户体验 —— 灯是突然亮/灭还是平滑过渡。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0F">
          <td><code>0x0F</code></td>
          <td>Options<br/><span class="attr-cn">选项</span></td>
          <td>bitmap8</td>
          <td>命令执行的全局选项。可写（见下方 <a href="#bitmap-options">OptionsBitmap</a>）</td>
        </tr>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>OnOffTransitionTime<br/><span class="attr-cn">开关过渡时间</span></td>
          <td>uint16</td>
          <td>开灯/关灯时亮度从 MinLevel 到 MaxLevel（或反向）的过渡时间，单位 <strong>0.1 秒</strong>。默认 <code>0</code>（瞬间切换）。可写</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>OnLevel<br/><span class="attr-cn">开灯亮度</span></td>
          <td>uint8 / null</td>
          <td>OnOff Cluster 的 On 命令执行时，亮度设为此值。<code>null</code> 表示恢复到上次关灯前的亮度。范围 1~254，可写</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>OnTransitionTime<br/><span class="attr-cn">开灯过渡时间</span></td>
          <td>uint16 / null</td>
          <td>OnOff 开灯时的过渡时间，单位 <strong>0.1 秒</strong>。<code>null</code> 时使用 <code>OnOffTransitionTime</code>。可写</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>OffTransitionTime<br/><span class="attr-cn">关灯过渡时间</span></td>
          <td>uint16 / null</td>
          <td>OnOff 关灯时的过渡时间，单位 <strong>0.1 秒</strong>。<code>null</code> 时使用 <code>OnOffTransitionTime</code>。可写</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>DefaultMoveRate<br/><span class="attr-cn">默认移动速率</span></td>
          <td>uint8 / null</td>
          <td>Move 命令不指定 Rate 时使用的默认速率（每秒变化的单位数）。<code>null</code> 表示设备自行决定。可写</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">OnLevel 的作用</div>
    <p>
      <code>OnLevel</code> 决定了用户按「开灯」时灯亮到什么程度：
    </p>
    <ul>
      <li><code>null</code>（推荐默认）—— 记忆上次关灯前的亮度，开灯后恢复到上次的亮度。用户体验最自然</li>
      <li>具体数值（如 <code>254</code>）—— 每次开灯都亮到这个固定值，忽略上次关灯时的亮度</li>
    </ul>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 启动行为（0x4000）====== -->
  <h3 id="group-startup">启动行为（0x4000）</h3>
  <p>控制设备重新上电后的初始亮度。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x4000">
          <td><code>0x4000</code></td>
          <td>StartUpCurrentLevel<br/><span class="attr-cn">上电初始亮度</span></td>
          <td>uint8 / null</td>
          <td>设备上电时 <code>CurrentLevel</code> 的初始值。可写</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StartUpCurrentLevel 特殊值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">MinLevel</span>
        <span class="enum-desc">上电时设为 MinLevel（最低亮度）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1~254</span>
      <div>
        <span class="enum-name">指定亮度</span>
        <span class="enum-desc">上电时设为这个固定值</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">恢复断电前</span>
        <span class="enum-desc">上电时恢复到断电前的亮度值（推荐默认）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">断电恢复的陷阱</div>
    <p>
      <code>StartUpCurrentLevel</code> 只控制 <code>CurrentLevel</code>，不控制 OnOff 状态。
      如果用户希望「来电后灯自动亮」，还需要配合 OnOff Cluster 的 <code>StartUpOnOff</code> 属性一起设置。
      只设 <code>StartUpCurrentLevel</code> 而不设 <code>StartUpOnOff</code>，可能出现亮度恢复了但灯是关的情况。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举与位图 ====== -->
  <h2 id="enums">枚举与位图</h2>

  <h3 id="enum-movemode">MoveModeEnum</h3>
  <p>Move 和 MoveWithOnOff 命令中的 <code>MoveMode</code> 参数使用此枚举，指定亮度移动方向。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">向上移动（增加亮度），直到 MaxLevel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">向下移动（降低亮度），直到 MinLevel</span>
      </div>
    </div>
  </div>

  <h3 id="enum-stepmode">StepModeEnum</h3>
  <p>Step 和 StepWithOnOff 命令中的 <code>StepMode</code> 参数使用此枚举，指定步进方向。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">向上步进（增加亮度）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">向下步进（降低亮度）</span>
      </div>
    </div>
  </div>

  <h3 id="bitmap-options">OptionsBitmap</h3>
  <p>
    <code>Options</code> 属性以及所有命令中 <code>OptionsMask</code> / <code>OptionsOverride</code> 参数使用此位图。
    它控制命令在特定条件下是否执行。
  </p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">ExecuteIfOff</span>
        <span class="enum-desc">设备处于 Off 状态时是否仍执行 Level 命令。置 1 = 即使灯是关的也执行调光</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CoupleColorTempToLevel</span>
        <span class="enum-desc">亮度变化时是否联动色温。置 1 = 亮度降低时色温自动变暖（需 ColorControl Cluster 配合）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">OptionsMask / OptionsOverride 怎么用</div>
    <p>
      这两个参数用于<strong>临时覆盖</strong>设备的 <code>Options</code> 属性。计算逻辑：
      <code>effectiveOptions = (Options AND NOT OptionsMask) OR (OptionsOverride AND OptionsMask)</code>。
      简单理解：<code>OptionsMask</code> 标记哪些位要被覆盖，<code>OptionsOverride</code> 提供覆盖值。
      两者都传 <code>0</code> 则直接使用设备的 <code>Options</code> 属性。
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>LevelControl 通过 Feature Map 声明设备支持的可选能力。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">OnOff (OO)</span>
        <span class="enum-desc">依赖 OnOff Cluster，支持 WithOnOff 系列命令联动开关状态</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Lighting (LT)</span>
        <span class="enum-desc">支持灯光应用行为。MinLevel 默认 1（非 0），支持 StartUpCurrentLevel 和 OnTransitionTime/OffTransitionTime</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Frequency (FQ)</span>
        <span class="enum-desc">支持频率控制（Provisional）。启用 CurrentFrequency/MinFrequency/MaxFrequency 属性和 MoveToClosestFrequency 命令</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见组合</div>
    <p>
      绝大多数智能灯的 Feature Map 是 <code>0x03</code>（OnOff + Lighting），表示同时支持开关联动和灯光行为。
      读到 Feature Map 后可以判断哪些属性和命令可用，避免读取不存在的属性导致错误。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个典型可调光灯具的 LevelControl Cluster 读取结果：</p>

  <pre><code>{
  // --- 当前状态 ---
  "0x0": 127,                // CurrentLevel = 127（约 50% 亮度）
  "0x1": 0,                  // RemainingTime = 0（无进行中的过渡）
  "0x2": 1,                  // MinLevel = 1（最低可用级别）
  "0x3": 254,                // MaxLevel = 254（最高可用级别）

  // --- 过渡与开关联动 ---
  "0xF": 0,                  // Options = 0（无特殊选项）
  "0x10": 10,                // OnOffTransitionTime = 10（1 秒过渡）
  "0x11": null,              // OnLevel = null（On 时恢复之前亮度）
  "0x12": null,              // OnTransitionTime = null（使用 OnOffTransitionTime）
  "0x13": null,              // OffTransitionTime = null（使用 OnOffTransitionTime）
  "0x14": 50,                // DefaultMoveRate = 50（每秒变化 50 个单位）

  // --- 启动行为 ---
  "0x4000": null              // StartUpCurrentLevel = null（上电恢复断电前亮度）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">亮度展示处理逻辑</div>
    <p>
      App 展示亮度信息时，典型的处理流程：
    </p>
    <ol>
      <li>读取 <code>CurrentLevel (0x00)</code>，处理 <code>null</code> 情况</li>
      <li>读取 <code>MinLevel (0x02)</code> 和 <code>MaxLevel (0x03)</code>，确定滑块范围</li>
      <li>将 <code>CurrentLevel</code> 换算为百分比：<code>(CurrentLevel - MinLevel) / (MaxLevel - MinLevel) * 100</code></li>
      <li>如果 <code>RemainingTime (0x01)</code> 大于 0，说明正在过渡中，UI 可以显示过渡动画</li>
    </ol>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-dimming">场景 1：App 调光</h3>
  <ol>
    <li>读取 <code>MinLevel (0x02)</code> 和 <code>MaxLevel (0x03)</code>，映射到滑块 0%~100%</li>
    <li>用户拖动滑块时，将百分比换算为目标亮度值</li>
    <li>发送 <code>MoveToLevelWithOnOff (0x04)</code>（推荐使用 WithOnOff 版本，保证开关状态一致）</li>
    <li>订阅 <code>CurrentLevel (0x00)</code> 的变化，实时更新 UI 显示</li>
  </ol>

  <h3 id="scenario-on-off-brightness">场景 2：记忆亮度开关灯</h3>
  <ol>
    <li>设置 <code>OnLevel (0x11)</code> 为 <code>null</code> —— 让设备记忆上次关灯前的亮度</li>
    <li>用户点击「开灯」→ OnOff Cluster 发 On 命令 → 灯自动恢复到上次的亮度</li>
    <li>用户点击「关灯」→ OnOff Cluster 发 Off 命令 → 亮度渐暗到 0</li>
    <li>可选：设置 <code>OnTransitionTime (0x12)</code> 和 <code>OffTransitionTime (0x13)</code> 控制过渡速度</li>
  </ol>

  <h3 id="scenario-startup">场景 3：断电恢复设置</h3>
  <ol>
    <li>设置 <code>StartUpCurrentLevel (0x4000)</code>：<code>null</code> = 恢复断电前亮度，<code>0x00</code> = 最低亮度，具体值 = 固定亮度</li>
    <li>同时设置 OnOff Cluster 的 <code>StartUpOnOff</code>，确保开关状态和亮度配合正确</li>
    <li>典型配置：<code>StartUpCurrentLevel=null</code> + <code>StartUpOnOff=RestorePrevious</code> → 完整恢复断电前状态</li>
  </ol>

  <h3 id="scenario-physical-button">场景 4：物理按钮调光（长按 + 短按）</h3>
  <ol>
    <li>短按 → 发送 <code>StepWithOnOff (0x06)</code>，每次增减固定步进值（如 25）</li>
    <li>长按按下 → 发送 <code>MoveWithOnOff (0x05)</code>，持续变化</li>
    <li>长按松手 → 发送 <code>StopWithOnOff (0x07)</code>，停在当前亮度</li>
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
    title: '颜色控制 Cluster · ColorControl（0x0300）',
    description: 'Matter ColorControl Cluster（0x0300）完整参考 — Hue/Saturation、XY 色坐标、色温三种颜色模型的命令与属性定义、ColorCapabilities 位图、Enhanced Hue、Color Loop 等全部枚举值速查与使用场景。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: undefined,
    content: `<h1>颜色控制 Cluster（ColorControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0300</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点，与 OnOff / LevelControl 同端点）
  </p>
  <p>
    ColorControl 是 Matter 灯具设备的颜色控制核心 Cluster，支持通过三种颜色模型控制灯光颜色：
    <strong>Hue/Saturation</strong>（色相/饱和度）、<strong>XY 色坐标</strong>（CIE 1931）、<strong>Color Temperature</strong>（色温，单位 Mireds）。
    此外还支持 Enhanced Hue（16-bit 高精度色相）和 Color Loop（自动循环变色）等高级功能。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">色温单位说明</div>
    <p>
      Matter 使用 <strong>Mireds</strong>（微倒数度）作为色温单位，换算公式：<code>Mireds = 1,000,000 / Kelvin</code>。
      例如 6500K 冷白 ≈ 153 Mireds，2700K 暖白 ≈ 370 Mireds。Mireds 值越小色温越高（偏冷白），值越大色温越低（偏暖黄）。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 能力</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">标准示例</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 能力 ====== -->
  <h2 id="features">Feature 能力（Feature Map）</h2>
  <p>
    ColorControl 通过 Feature Map 声明设备支持哪些颜色控制能力。不同能力决定了可用的命令和属性集合。
    读取 <code>ColorCapabilities (0x400A)</code> 可以获取设备支持的能力位图。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HS（Hue/Saturation）</span>
        <span class="enum-desc">支持色相/饱和度控制。MoveToHue、MoveToSaturation 等命令可用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EHUE（Enhanced Hue）</span>
        <span class="enum-desc">支持 16-bit 高精度色相控制。EnhancedMoveToHue 等命令可用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">CL（Color Loop）</span>
        <span class="enum-desc">支持自动循环变色。ColorLoopSet 命令可用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">XY</span>
        <span class="enum-desc">支持 CIE 1931 XY 色坐标控制。MoveToColor、MoveColor 等命令可用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">CT（Color Temperature）</span>
        <span class="enum-desc">支持色温控制。MoveToColorTemperature 等命令可用</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      大多数家用智能灯至少支持 CT（色温），全彩灯通常支持 HS + XY + CT。发送命令前务必先检查 <code>ColorCapabilities</code>，向不支持的能力发送命令会被设备拒绝。
    </p>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    ColorControl 定义了 19 个命令，按颜色模型分为五组：Hue/Saturation 控制、XY 色坐标控制、色温控制、Enhanced Hue 控制、Color Loop 控制。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>
  <p>
    所有命令都支持 <code>OptionsMask</code> 和 <code>OptionsOverride</code> 参数，用于临时覆盖 <code>Options (0x000F)</code> 属性中的 ExecuteIfOff 标志位。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>所需 Feature</th>
        </tr>
      </thead>
      <tbody>
        <!-- Hue/Saturation 组 -->
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>MoveToHue</td>
          <td>移动到指定色相值</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>MoveHue</td>
          <td>持续向指定方向移动色相</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StepHue</td>
          <td>色相步进</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>MoveToSaturation</td>
          <td>移动到指定饱和度</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>MoveSaturation</td>
          <td>持续向指定方向移动饱和度</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>StepSaturation</td>
          <td>饱和度步进</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>MoveToHueAndSaturation</td>
          <td>同时设置色相和饱和度</td>
          <td><span class="feature-tag">HS</span></td>
        </tr>
        <!-- XY 组 -->
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>MoveToColor</td>
          <td>移动到指定 XY 色坐标</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>MoveColor</td>
          <td>持续移动 XY 色坐标</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>StepColor</td>
          <td>XY 色坐标步进</td>
          <td><span class="feature-tag">XY</span></td>
        </tr>
        <!-- 色温组 -->
        <tr class="clickable-row" data-href="#cmd-0x0A">
          <td><a href="#cmd-0x0A"><code>0x0A</code></a></td>
          <td>MoveToColorTemperature</td>
          <td>移动到指定色温</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x4B">
          <td><a href="#cmd-0x4B"><code>0x4B</code></a></td>
          <td>MoveColorTemperature</td>
          <td>持续向指定方向移动色温</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x4C">
          <td><a href="#cmd-0x4C"><code>0x4C</code></a></td>
          <td>StepColorTemperature</td>
          <td>色温步进</td>
          <td><span class="feature-tag">CT</span></td>
        </tr>
        <!-- Enhanced Hue 组 -->
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>EnhancedMoveToHue</td>
          <td>移动到指定 Enhanced Hue（16-bit）</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x41">
          <td><a href="#cmd-0x41"><code>0x41</code></a></td>
          <td>EnhancedMoveHue</td>
          <td>持续移动 Enhanced Hue</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x42">
          <td><a href="#cmd-0x42"><code>0x42</code></a></td>
          <td>EnhancedStepHue</td>
          <td>Enhanced Hue 步进</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x43">
          <td><a href="#cmd-0x43"><code>0x43</code></a></td>
          <td>EnhancedMoveToHueAndSaturation</td>
          <td>同时设置 Enhanced Hue 和 Saturation</td>
          <td><span class="feature-tag">EHUE</span></td>
        </tr>
        <!-- Color Loop & Stop -->
        <tr class="clickable-row" data-href="#cmd-0x44">
          <td><a href="#cmd-0x44"><code>0x44</code></a></td>
          <td>ColorLoopSet</td>
          <td>配置并激活/关闭 Color Loop</td>
          <td><span class="feature-tag">CL</span></td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x47">
          <td><a href="#cmd-0x47"><code>0x47</code></a></td>
          <td>StopMoveStep</td>
          <td>停止当前的 Move 或 Step 过渡</td>
          <td><span class="feature-tag">HS</span> <span class="feature-tag">XY</span> <span class="feature-tag">CT</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">MoveToHue —— 移动到指定色相（0x00）</h3>
  <p>
    将灯光色相平滑过渡到目标值。Hue 取值 0~254，映射到 0°~360° 色环。<code>Direction</code> 参数控制色环上的过渡方向。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在 App 色环上选择一个颜色时调用。先将选中的角度换算为 0~254 的 Hue 值（<code>hue = angle * 254 / 360</code>），Direction 通常用 <code>Shortest (0)</code> 取最短路径。TransitionTime 设 10 表示 1 秒平滑过渡。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">MoveHue —— 持续移动色相（0x01）</h3>
  <p>以恒定速率持续移动色相值，直到收到 StopMoveStep 或色相到达自然边界。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户按住色相调节按钮时持续调节。松开按钮后发送 <code>StopMoveStep (0x47)</code> 停止。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">StepHue —— 色相步进（0x02）</h3>
  <p>将色相增加或减少一个指定的步长值。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">MoveToSaturation —— 移动到指定饱和度（0x03）</h3>
  <p>将灯光饱和度平滑过渡到目标值。Saturation 取值 0~254，0 为无色（白光），254 为最高饱和度。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户拖动饱和度滑条时调用。Saturation 值 0~254 对应 UI 上的 0%~100%。通常配合 MoveToHue 一起使用，也可以用 MoveToHueAndSaturation 一次设置两者。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">MoveSaturation —— 持续移动饱和度（0x04）</h3>
  <p>以恒定速率持续移动饱和度值，直到收到 StopMoveStep。参数结构同 MoveHue。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">StepSaturation —— 饱和度步进（0x05）</h3>
  <p>将饱和度增加或减少一个指定的步长值。参数结构同 StepHue。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">MoveToHueAndSaturation —— 同时设置色相和饱和度（0x06）</h3>
  <p>一次命令同时设置色相和饱和度，比分开发送两个命令更高效，过渡更平滑。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在色盘（Color Wheel）上直接选择一个颜色点时调用，一次命令完成色相 + 饱和度的设置。推荐优先使用此命令而非分别调用 MoveToHue + MoveToSaturation。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">MoveToColor —— 移动到指定 XY 色坐标（0x07）</h3>
  <p>将灯光颜色过渡到指定的 CIE 1931 XY 色坐标。X 和 Y 取值 0~0xFEFF，映射到 0.0~1.0 的色度坐标。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>需要精确控制颜色（如匹配品牌色或灯光设计方案）时使用。XY 色坐标是设备无关的绝对颜色表示，不同厂商的灯在相同 XY 值下理论上会呈现相同颜色。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x08">MoveColor —— 持续移动 XY 色坐标（0x08）</h3>
  <p>以恒定速率在 XY 色度平面上持续移动。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>RateX</td><td>int16</td><td>X 坐标每秒变化量（有符号）</td></tr>
        <tr><td>RateY</td><td>int16</td><td>Y 坐标每秒变化量（有符号）</td></tr>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x09">StepColor —— XY 色坐标步进（0x09）</h3>
  <p>将 X 和 Y 坐标各增加/减少一个步长值。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x0A">MoveToColorTemperature —— 移动到指定色温（0x0A）</h3>
  <p>
    将灯光色温平滑过渡到目标值。目标值会被裁剪到 <code>[ColorTempPhysicalMinMireds, ColorTempPhysicalMaxMireds]</code> 范围内。
    这是色温灯最常用的命令。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户拖动色温滑条时调用。UI 通常显示 Kelvin（2700K ~ 6500K），发送命令前需转换：<code>mireds = 1000000 / kelvin</code>。设备会自动将超出物理范围的值裁剪到 Min/Max Mireds。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x4B">MoveColorTemperature —— 持续移动色温（0x4B）</h3>
  <p>以恒定速率持续移动色温值，并可指定移动的上下限范围。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x4C">StepColorTemperature —— 色温步进（0x4C）</h3>
  <p>将色温增加或减少一个指定的步长值，并可指定步进的上下限范围。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x40">EnhancedMoveToHue —— 移动到指定 Enhanced Hue（0x40）</h3>
  <p>
    与 MoveToHue 类似，但使用 16-bit Enhanced Hue（0~0xFFFF），精度是标准 Hue 的 256 倍。
    适用于需要精细颜色控制的场景。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>当 8-bit Hue 的 254 级精度不够时使用（例如大型 LED 灯带需要极致平滑过渡）。Enhanced Hue = 标准 Hue * 256，但范围更大（0~65535）。发送前需检查设备是否支持 EHUE feature。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x41">EnhancedMoveHue —— 持续移动 Enhanced Hue（0x41）</h3>
  <p>以恒定速率持续移动 Enhanced Hue 值。参数结构类似 MoveHue，但 Rate 为 uint16。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x42">EnhancedStepHue —— Enhanced Hue 步进（0x42）</h3>
  <p>将 Enhanced Hue 增加或减少一个指定的步长值。参数结构类似 StepHue，但 StepSize 为 uint16。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x43">EnhancedMoveToHueAndSaturation —— 同时设置 Enhanced Hue 和 Saturation（0x43）</h3>
  <p>一次命令同时设置 16-bit Enhanced Hue 和 8-bit Saturation。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x44">ColorLoopSet —— 配置 Color Loop（0x44）</h3>
  <p>
    配置并激活/关闭 Color Loop（自动循环变色）。通过 UpdateFlags 位图控制本次命令要更新哪些参数。
    激活后，灯光会按设定的时间周期在色环上自动循环。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
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
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>氛围灯、派对模式等需要灯光自动变色的场景。UpdateFlags 设为 <code>0x0F</code>（全部更新），Action 设为 <code>2</code>（从当前色开始循环），Time 设为 <code>30</code>（30 秒一圈），Direction 设为 <code>1</code>（递增方向）。关闭时 Action 设为 <code>0</code>。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x47">StopMoveStep —— 停止过渡（0x47）</h3>
  <p>
    立即停止当前正在进行的 Move 或 Step 颜色过渡。灯光保持在当前颜色状态。
    适用于所有颜色模型（HS、XY、CT）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>OptionsMask</td><td>bitmap8</td><td>选项掩码</td></tr>
        <tr><td>OptionsOverride</td><td>bitmap8</td><td>选项覆盖</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户松开持续调节按钮（如色温滑条的长按箭头）时发送，用于停止 MoveHue / MoveSaturation / MoveColor / MoveColorTemperature 等持续移动类命令。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>ColorControl Cluster 共有 52 个属性，按功能分为六组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>分组</th>
          <th>说明</th>
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
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 颜色模式 -->
  <h3 id="attr-mode">颜色模式与选项</h3>
  <p>标识设备当前使用的颜色控制模型以及命令执行选项。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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

  <h4>ColorMode 枚举值</h4>
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

  <h4>EnhancedColorMode 枚举值</h4>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- Enhanced Hue & Color Loop -->
  <h3 id="attr-enhanced">Enhanced Hue 与 Color Loop</h3>
  <p>高精度色相控制和自动循环变色的状态属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 能力与色温范围 -->
  <h3 id="attr-capability">能力与色温范围</h3>
  <p>描述设备支持的颜色控制能力和色温物理范围。开发时必须先读取这些属性来确定可用的控制方式。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 漂移补偿与灯具信息 -->
  <h3 id="attr-info">漂移补偿与灯具信息</h3>
  <p>描述灯具的颜色漂移补偿机制和原色（Primary）数量。大多数 App 开发无需关注这些属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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

  <h4>DriftCompensation 枚举值</h4>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 原色坐标 -->
  <h3 id="attr-primary">原色坐标（Primary 1~6）</h3>
  <p>
    灯具最多可以声明 6 组原色（Primary），每组包含 CIE XY 坐标和强度值。这些属性描述灯具 LED 的物理色域，
    通常由固件设置，App 开发一般不需要读取。
  </p>

  <details class="scenario">
    <summary>Primary 1~6 属性列表（点击展开）</summary>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 白点与色点 -->
  <h3 id="attr-colorpoint">白点与色点</h3>
  <p>
    描述灯具的白点坐标和 RGB 三色点坐标，用于色彩校准。这些属性可写，通常由高级校准工具使用，
    App 开发一般不需要关注。
  </p>

  <details class="scenario">
    <summary>白点与色点属性列表（点击展开）</summary>
    <div class="scenario-content">
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
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
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">命令参数枚举值速查</h2>
  <p>以下枚举类型在多个命令的参数中复用。</p>

  <h4>DirectionEnum（色相过渡方向）</h4>
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

  <h4>MoveModeEnum（持续移动模式）</h4>
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

  <h4>StepModeEnum（步进方向）</h4>
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

  <h4>ColorLoopActionEnum（循环动作）</h4>
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

  <h4>ColorLoopDirectionEnum（循环方向）</h4>
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

  <h4>UpdateFlags 位图（ColorLoopSet 命令参数）</h4>
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
  <h2 id="standard-example">标准示例</h2>
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
    <div class="callout-title">开发提示</div>
    <p>
      实际从设备读取数据时，Attribute ID 是十六进制字符串作为 key。<code>"0x0007"</code> 是 ColorTemperatureMireds，<code>"0x400A"</code> 是 ColorCapabilities。
      位图值 31 = <code>0x1F</code> = 二进制 <code>11111</code>，表示五种能力全部支持。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-color-temp">场景 1：色温滑条调节</h3>
  <ol>
    <li>读取 <code>ColorCapabilities (0x400A)</code>，确认 Bit 4（CT）为 1</li>
    <li>读取 <code>ColorTempPhysicalMinMireds (0x400B)</code> 和 <code>ColorTempPhysicalMaxMireds (0x400C)</code> 确定滑条范围</li>
    <li>用户拖动滑条时，将 Kelvin 转换为 Mireds：<code>mireds = 1000000 / kelvin</code></li>
    <li>发送 <code>MoveToColorTemperature (0x0A)</code>，TransitionTime 设为 5（0.5 秒过渡）</li>
    <li>订阅 <code>ColorTemperatureMireds (0x0007)</code> 确认设备已到达目标色温</li>
  </ol>

  <h3 id="scenario-color-wheel">场景 2：色盘选色（Hue/Saturation）</h3>
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

  <h3 id="scenario-party-mode">场景 4：氛围灯 / 派对模式（Color Loop）</h3>
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
