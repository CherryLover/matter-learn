import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'identify': {
    title: '设备标识 Cluster · Identify（0x0003）',
    description: 'Matter Identify Cluster（0x0003）完整参考 — IdentifyTime / IdentifyType 属性、Identify / TriggerEffect 命令、EffectIdentifier 枚举值速查，帮助用户定位设备的基础 Cluster。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: undefined,
    content: `<h1>设备标识 Cluster（Identify）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0003</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点），也常见于 <code>Endpoint 0</code>（Root）
  </p>
  <p>
    Identify 用于触发设备上的视觉或听觉指示器（闪灯、响铃、屏幕闪烁等），帮助用户在多个设备中定位某一台。
    这个 Cluster 非常小 —— 只有 <strong>2 个属性</strong>和 <strong>2 个命令</strong>，但几乎所有 Matter 设备都必须支持它。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">什么时候用</div>
    <p>
      配网完成后，用户不确定刚加入的是哪台灯？发一个 Identify 命令让它闪几秒。
      调试时想确认 App 连的是不是目标设备？TriggerEffect 让设备做出明确反馈。
      这是最简单的「设备在哪」确认手段。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>Identify 只有两个属性，都是必须支持的。点击属性 ID 可跳转到详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>读写</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>IdentifyTime</td>
          <td>uint16</td>
          <td>读写</td>
          <td>标识剩余时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>IdentifyType</td>
          <td>enum8</td>
          <td>只读</td>
          <td>设备支持的标识方式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">IdentifyTime（标识剩余时间）</h3>
  <p>
    当前标识效果的剩余秒数。写入一个非零值会立即开始标识，设备以每秒递减的方式倒计时到 <code>0</code> 后停止。
    写入 <code>0</code> 可以立即停止正在进行的标识。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">直接写属性 vs 发命令</div>
    <p>
      直接写 <code>IdentifyTime = 10</code> 和发送 <code>Identify(IdentifyTime: 10)</code> 命令效果完全相同。
      命令方式更常用，因为语义更清晰，且部分 SDK 对命令有更好的封装。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">IdentifyType（标识方式）</h3>
  <p>
    只读属性，描述设备使用哪种方式进行标识。不同的设备硬件能力不同，灯泡会闪灯，门锁可能会响铃，带屏幕的设备会闪烁显示。
  </p>

  <h4>IdentifyTypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">无标识能力</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LightOutput</span>
        <span class="enum-desc">通过灯光标识（闪灯、变色）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">VisibleIndicator</span>
        <span class="enum-desc">通过可见指示器标识（LED 指示灯）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">AudibleBeep</span>
        <span class="enum-desc">通过声音标识（蜂鸣器）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Display</span>
        <span class="enum-desc">通过屏幕标识（闪烁显示）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Actuator</span>
        <span class="enum-desc">通过执行器标识（如电机振动）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    Identify Cluster 有两个命令，都是 Client 发给 Server（即 App 发给设备）。
    不需要 Timed Interaction，也没有安全限制，直接发送即可。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Identify</td>
          <td>开始标识，设备闪烁指定秒数</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>TriggerEffect</td>
          <td>触发指定的标识效果</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Identify —— 开始标识（0x00）</h3>
  <p>
    让设备开始标识，持续指定的秒数。设备会根据自身 <code>IdentifyType</code> 的能力选择标识方式（闪灯、响铃等）。
    发送后 <code>IdentifyTime</code> 属性会被设置为传入的值，然后逐秒递减到 0。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>IdentifyTime</td>
          <td>uint16</td>
          <td>是</td>
          <td>标识持续时间，单位秒。传 <code>0</code> 立即停止</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0003",
      "commandId": "0x00"       // Identify
    },
    "commandFields": {
      "0": 10                   // IdentifyTime = 10 秒
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x40">TriggerEffect —— 触发效果（0x40）</h3>
  <p>
    触发一个预定义的标识效果。与 Identify 命令不同，TriggerEffect 指定的是<strong>效果类型</strong>而非持续时间 ——
    每种效果有自己的固定时长和表现方式。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EffectIdentifier</td>
          <td>enum8</td>
          <td>是</td>
          <td>要触发的效果类型（见下方枚举）</td>
        </tr>
        <tr>
          <td>EffectVariant</td>
          <td>enum8</td>
          <td>是</td>
          <td>效果变体，目前只有 <code>0 = Default</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>EffectIdentifierEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Blink</span>
        <span class="enum-desc">快速闪烁一次（约 0.5 秒）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">Breathe</span>
        <span class="enum-desc">呼吸灯效果（约 15 秒渐亮渐暗循环）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">Okay</span>
        <span class="enum-desc">确认反馈（闪两下表示「收到」）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0B</span>
      <div>
        <span class="enum-name">ChannelChange</span>
        <span class="enum-desc">频道切换效果（约 8 秒的色彩/亮度变化）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFE</span>
      <div>
        <span class="enum-name">FinishEffect</span>
        <span class="enum-desc">平滑结束当前正在播放的效果</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0xFF</span>
      <div>
        <span class="enum-name">StopEffect</span>
        <span class="enum-desc">立即停止当前效果</span>
      </div>
    </div>
  </div>

  <h4>EffectVariantEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Default</span>
        <span class="enum-desc">默认变体（目前是唯一选项）</span>
      </div>
    </div>
  </div>

  <p>请求示例（触发呼吸灯效果）：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0003",
      "commandId": "0x40"       // TriggerEffect
    },
    "commandFields": {
      "0": 1,                   // EffectIdentifier = Breathe（呼吸灯效果）
      "1": 0                    // EffectVariant = Default
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个灯泡设备的 Identify Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": 0,         // IdentifyTime = 0（当前未在标识中）
  "0x1": 2          // IdentifyType = VisibleIndicator（LED 指示灯）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      App 中的「设备定位」功能通常这样实现：
    </p>
    <ol>
      <li>用户点击「定位设备」按钮</li>
      <li>发送 <code>Identify</code> 命令，<code>IdentifyTime = 15</code>（闪 15 秒）</li>
      <li>App 端同步显示 15 秒倒计时</li>
      <li>用户找到设备后可发 <code>Identify(IdentifyTime: 0)</code> 提前停止</li>
    </ol>
    <p>
      如果想要更精细的效果控制（比如只闪一下确认连接），用 <code>TriggerEffect(Blink, Default)</code> 比 Identify 更合适。
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
  'descriptor': {
    title: '端点描述 Cluster · Descriptor（0x001D）',
    description: 'Matter Descriptor Cluster（0x001D）完整参考 — DeviceTypeList、ServerList、ClientList、PartsList、TagList 全部属性定义，以及 Endpoint 0 的特殊地位和端点发现机制。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: undefined,
    content: `<h1>端点描述 Cluster（Descriptor）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001D</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <strong>每个 Endpoint 都必须有</strong>（包括 Endpoint 0）
  </p>
  <p>
    Descriptor 是 Matter 协议中最基础的 Cluster，它回答一个核心问题：<strong>这个 Endpoint 上有什么？</strong>
    Controller（手机、音箱、Hub）连上一个 Matter 设备后，第一件事就是读取各个 Endpoint 的 Descriptor，
    从而知道设备支持哪些 Device Type、实现了哪些 Cluster、以及端点之间的层级关系。
  </p>
  <p>
    这个 Cluster 是<strong>纯只读的</strong> —— 没有任何 Command，只有 Attribute。设备在出厂时就决定了这些信息，运行时不会改变。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">强制要求：每个 Endpoint 都必须实现 Descriptor</div>
    <p>
      Descriptor Cluster 是 Matter 规范中的<strong>硬性要求（Mandatory）</strong>。
      无论是 Endpoint 0（Root Node）还是功能端点（Endpoint 1、2、3...），都必须包含 Descriptor Cluster。
      如果你的设备缺少它，将无法通过 Matter 认证，Controller 也无法正确识别设备能力。
    </p>
  </div>

  <!-- ====== 核心概念 ====== -->
  <h2 id="concept">Descriptor 解决什么问题</h2>
  <p>
    Matter 设备的数据模型是树状结构：一个 Node（物理设备）包含多个 Endpoint，每个 Endpoint 代表一个功能单元。
    但 Controller 连上设备时，并不知道这棵树长什么样。Descriptor 就是这棵树的<strong>自描述机制</strong>：
  </p>
  <ul>
    <li><strong>DeviceTypeList</strong> —— 告诉 Controller "我是什么"（门锁？灯？开关？）</li>
    <li><strong>ServerList / ClientList</strong> —— 告诉 Controller "我能做什么"（支持哪些 Cluster）</li>
    <li><strong>PartsList</strong> —— 告诉 Controller "我下面还有谁"（子端点列表）</li>
  </ul>

  <div class="callout callout-info">
    <div class="callout-title">Endpoint 0 的特殊地位</div>
    <p>
      Endpoint 0 是 <strong>Root Node（根节点）</strong>，它的 Descriptor 有特殊含义：
    </p>
    <ul>
      <li>它的 <code>PartsList</code> 列出了<strong>该设备所有其他 Endpoint 的编号</strong>，是设备发现的起点</li>
      <li>Controller 的标准流程是：先读 Endpoint 0 的 PartsList，拿到所有端点编号，再逐个读取每个端点的 Descriptor</li>
      <li>Root Node 的 DeviceType 是 <code>0x0016</code>（Root Node Device Type）</li>
    </ul>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>Descriptor 只有 5 个属性，但每个都至关重要。点击属性 ID 可跳转到详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>必选</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x0000</code></a></td>
          <td>DeviceTypeList</td>
          <td>list&lt;DeviceTypeStruct&gt;</td>
          <td>是</td>
          <td>端点支持的 Device Type 列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x0001</code></a></td>
          <td>ServerList</td>
          <td>list&lt;cluster_id&gt;</td>
          <td>是</td>
          <td>端点实现的 Server Cluster 列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x0002</code></a></td>
          <td>ClientList</td>
          <td>list&lt;cluster_id&gt;</td>
          <td>是</td>
          <td>端点实现的 Client Cluster 列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x0003</code></a></td>
          <td>PartsList</td>
          <td>list&lt;endpoint_id&gt;</td>
          <td>是</td>
          <td>子端点编号列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x0004</code></a></td>
          <td>TagList</td>
          <td>list&lt;SemanticTagStruct&gt;</td>
          <td>否</td>
          <td>语义标签列表（用于区分同类端点）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attribute-details">属性详解</h2>

  <!-- DeviceTypeList -->
  <h3 id="attr-0x00">DeviceTypeList（0x0000）</h3>
  <p>
    列出该端点支持的所有 Device Type。每个条目是一个 <code>DeviceTypeStruct</code>，包含设备类型 ID 和版本号。
    大多数端点只有一个 Device Type，但规范允许一个端点同时声明多个。
  </p>

  <h4>DeviceTypeStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DeviceType</td>
          <td>devtype_id (uint32)</td>
          <td>Device Type ID，如 <code>0x000A</code> = Door Lock，<code>0x0100</code> = On/Off Light</td>
        </tr>
        <tr>
          <td>Revision</td>
          <td>uint16</td>
          <td>该 Device Type 定义的版本号，用于区分不同规范版本间的差异</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见 Device Type ID</div>
    <p>
      <code>0x0016</code> Root Node &nbsp;|&nbsp;
      <code>0x000A</code> Door Lock &nbsp;|&nbsp;
      <code>0x0100</code> On/Off Light &nbsp;|&nbsp;
      <code>0x010D</code> Extended Color Light &nbsp;|&nbsp;
      <code>0x000E</code> Aggregator (Bridge) &nbsp;|&nbsp;
      <code>0x0107</code> Dimmable Light
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ServerList -->
  <h3 id="attr-0x01">ServerList（0x0001）</h3>
  <p>
    列出该端点作为 <strong>Server</strong> 实现的所有 Cluster ID。
    所谓 Server，就是"持有数据、响应读写请求"的一方。
    例如一把门锁的 Endpoint 1 的 ServerList 会包含 <code>0x0101</code>（DoorLock），
    因为锁的状态（是否上锁、用户列表等）存储在设备端。
  </p>
  <p>
    Controller 通过读取 ServerList，就知道可以对这个端点发送哪些 Cluster 的读/写/命令请求。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ClientList -->
  <h3 id="attr-0x02">ClientList（0x0002）</h3>
  <p>
    列出该端点作为 <strong>Client</strong> 实现的所有 Cluster ID。
    Client 是"发起请求"的一方 —— 大多数终端设备（灯、锁、传感器）的 ClientList 为空，
    因为它们只被控制，不主动控制别人。
  </p>
  <p>
    ClientList 非空的典型场景：<strong>物理开关（Switch）</strong>。
    一个墙壁开关会在 ClientList 中声明 <code>0x0006</code>（OnOff Client），
    表示它会主动向灯具发送开关命令。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- PartsList -->
  <h3 id="attr-0x03">PartsList（0x0003）</h3>
  <p>
    列出该端点的<strong>子端点编号</strong>。这个属性定义了端点之间的层级关系。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">PartsList 的两种用法</div>
    <p><strong>在 Endpoint 0（Root Node）上：</strong></p>
    <ul>
      <li>PartsList 是一个<strong>扁平列表</strong>，包含该节点上<strong>所有其他 Endpoint</strong> 的编号</li>
      <li>这是 Controller 发现设备全部功能端点的唯一入口</li>
      <li>例如：<code>[1, 2, 3]</code> 表示设备还有 3 个功能端点</li>
    </ul>
    <p><strong>在功能端点上（Endpoint 1, 2, 3...）：</strong></p>
    <ul>
      <li>大多数情况下为<strong>空列表</strong>（叶子端点，没有子端点）</li>
      <li>只有 Bridge / Aggregator 设备的端点才会有非空的 PartsList，指向其桥接的子设备端点</li>
    </ul>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- TagList -->
  <h3 id="attr-0x04">TagList（0x0004）— 可选</h3>
  <p>
    为端点附加<strong>语义标签</strong>，用于区分功能相同但位置或用途不同的端点。
    例如一个设备有两个温度传感器端点，可以通过 TagList 标记一个是"室内"，另一个是"室外"。
  </p>
  <p>
    TagList 需要设备声明 <code>TAGLIST</code> Feature（Feature Bit 0）才会出现。
  </p>

  <h4>SemanticTagStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MfgCode</td>
          <td>vendor_id (nullable)</td>
          <td>厂商代码。<code>null</code> 表示使用标准定义的标签，非 null 表示厂商自定义标签</td>
        </tr>
        <tr>
          <td>NamespaceID</td>
          <td>uint8</td>
          <td>标签命名空间 ID，定义标签的分类体系</td>
        </tr>
        <tr>
          <td>Tag</td>
          <td>uint8</td>
          <td>标签值，在对应 Namespace 下的具体含义</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>string (nullable)</td>
          <td>可选的人类可读标签文字，如 <code>"Indoor"</code>、<code>"Left"</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 设备发现流程 ====== -->
  <h2 id="discovery-flow">Controller 如何使用 Descriptor 发现设备</h2>
  <p>Controller 连上一个 Matter 设备后，标准的端点发现流程如下：</p>
  <ol>
    <li><strong>读取 Endpoint 0 的 PartsList</strong> —— 拿到所有功能端点编号，如 <code>[1, 2, 3]</code></li>
    <li><strong>遍历每个端点，读取 DeviceTypeList</strong> —— 知道 Endpoint 1 是门锁、Endpoint 2 是温度传感器...</li>
    <li><strong>读取 ServerList</strong> —— 知道每个端点具体支持哪些 Cluster（能做哪些操作）</li>
    <li><strong>根据以上信息构建 UI</strong> —— 门锁端点显示开锁按钮，温度传感器端点显示温度数值</li>
  </ol>

  <div class="callout callout-tip">
    <div class="callout-title">Wildcard Read 的替代方案</div>
    <p>
      实际开发中，Controller 通常不会逐个属性读取，而是使用 <strong>Wildcard Read</strong>（通配符读取）
      一次性读取所有 Endpoint 的 Descriptor Cluster，效率更高。
      但理解上面的逐步流程有助于理解 Descriptor 各属性的作用。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>场景一：普通设备（门锁）</h3>
  <p>Endpoint 0（Root Node）的 Descriptor：</p>
  <pre><code>{
  // Endpoint 0（Root Node）的 Descriptor
  "DeviceTypeList": [
    { "DeviceType": "0x0016", "Revision": 2 }   // Root Node
  ],
  "ServerList": [
    "0x001D",   // Descriptor
    "0x0028",   // BasicInformation
    "0x002F",   // PowerSource
    "0x0030",   // GeneralCommissioning
    "0x0031",   // NetworkCommissioning
    "0x003E",   // OperationalCredentials
    "0x0033"    // GeneralDiagnostics
  ],
  "ClientList": [],
  "PartsList": [ 1, 2, 3 ]   // 该节点还有 Endpoint 1、2、3
}</code></pre>

  <p>Endpoint 1（门锁功能端点）的 Descriptor：</p>
  <pre><code>{
  // Endpoint 1（功能端点，比如一把门锁）的 Descriptor
  "DeviceTypeList": [
    { "DeviceType": "0x000A", "Revision": 3 }   // DoorLock
  ],
  "ServerList": [
    "0x001D",   // Descriptor（自身）
    "0x0003",   // Identify
    "0x0101",   // DoorLock
    "0x002F"    // PowerSource
  ],
  "ClientList": [],
  "PartsList": []   // 叶子端点，没有子端点
}</code></pre>

  <h3>场景二：Bridge 设备</h3>
  <p>Bridge（网关/桥接器）的 Endpoint 0 的 PartsList 会列出所有桥接的子设备：</p>
  <pre><code>{
  // Endpoint 0（Bridge 设备）的 Descriptor
  "DeviceTypeList": [
    { "DeviceType": "0x000E", "Revision": 2 }   // Aggregator（Bridge）
  ],
  "ServerList": [ "0x001D", "0x0028", "0x0039" ],
  "PartsList": [ 1, 2, 3, 4, 5 ]   // 桥接了 5 个子设备

  // 每个子端点（1~5）各自有独立的 Descriptor，
  // 描述各自的 DeviceType 和 Cluster 列表
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">开发提示</div>
    <p>
      调试时如果发现 Controller 无法识别设备的某个功能，优先检查 Descriptor：
    </p>
    <ul>
      <li>Endpoint 0 的 PartsList 是否包含了该功能端点？</li>
      <li>功能端点的 DeviceTypeList 是否正确？</li>
      <li>功能端点的 ServerList 是否包含了所需的 Cluster？</li>
    </ul>
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
  'groups': {
    title: '组管理 Cluster · Groups（0x0004）',
    description: 'Matter Groups Cluster（0x0004）完整参考 — AddGroup / ViewGroup / RemoveGroup / GetGroupMembership / AddGroupIfIdentifying 命令、NameSupport 属性、Feature Map（GN）、组播消息机制及常见场景速查。',
    prev: { title: '设备标识（Identify）', slug: 'identify' },
    next: undefined,
    content: `<h1>组管理 Cluster（Groups）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0004</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    Groups Cluster 管理设备的组成员关系，是 Matter 组播（Multicast）消息的基础。
    将多个设备加入同一个 Group，之后向该 Group ID 发送命令，所有成员设备都会同时响应 ——
    比如「一键关闭客厅所有灯」就是典型的组播场景。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">组播 vs 逐一发送</div>
    <p>
      不使用 Groups 时，控制 5 盏灯需要发 5 条单播命令，延迟会随设备数量线性增加。
      使用 Groups 后，只需发 1 条组播命令，所有成员几乎同时响应。
      这也是 Groups 与 Scenes（场景）配合后最有价值的地方 ——
      一条组播命令可以让不同设备各自执行预设动作（灯调暖光、窗帘半开、空调 26 度）。
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
    Groups Cluster 共有 6 个命令，用于管理设备的组成员关系。
    其中 AddGroup、RemoveGroup、RemoveAllGroups 是写操作，ViewGroup 和 GetGroupMembership 是查询操作，
    AddGroupIfIdentifying 是一个条件写入命令（设备必须处于 Identify 模式才生效）。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>方向</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AddGroup</td>
          <td>请求 / 响应</td>
          <td>将设备加入指定组</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ViewGroup</td>
          <td>请求 / 响应</td>
          <td>查询指定组的名称</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>GetGroupMembership</td>
          <td>请求 / 响应</td>
          <td>查询设备所属的组列表</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RemoveGroup</td>
          <td>请求 / 响应</td>
          <td>将设备从指定组中移除</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>RemoveAllGroups</td>
          <td>仅请求</td>
          <td>移除设备的所有组成员关系</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>AddGroupIfIdentifying</td>
          <td>仅请求</td>
          <td>仅在 Identify 模式下加入组</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">AddGroup —— 加入组（0x00）</h3>
  <p>
    将当前设备（Endpoint）加入指定的 Group。如果设备已经是该组的成员，命令仍然成功（幂等），
    但会更新组名称（如果设备支持 GN 特性）。
    执行后返回 <code>AddGroupResponse</code>，包含操作状态和 GroupID。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>是</td>
          <td>目标组 ID，范围 <code>0x0001</code> ~ <code>0xFEFF</code></td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>是</td>
          <td>组名称（最长 16 字节）。如果设备不支持 GN 特性，传空字符串即可</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AddGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS，<code>0x89</code> = RESOURCE_EXHAUSTED（组表已满）</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>请求中的 GroupID 原样返回</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x00"       // AddGroup
    },
    "commandFields": {
      "0": 1,                   // GroupID = 0x0001
      "1": "客厅灯组"            // GroupName
    }
  }]
}</code></pre>
  <p>响应示例：</p>
  <pre><code>{
  "invokeResponseValue": {
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x00"       // AddGroupResponse
    },
    "commandFields": {
      "0": 0,                   // Status = SUCCESS
      "1": 1                    // GroupID = 0x0001
    }
  }
}</code></pre>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 中创建「客厅」房间后，App 自动为该房间分配一个 GroupID，
        然后对房间内的每台设备发送 AddGroup 命令，把它们都加入同一个组。
        之后用户点击「全部关灯」，App 只需向该 GroupID 发一条组播 Off 命令。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">ViewGroup —— 查询组（0x01）</h3>
  <p>
    查询设备是否属于指定的 Group，如果属于则返回该组的名称。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>是</td>
          <td>要查询的组 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ViewGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS（设备属于该组），<code>0x8B</code> = NOT_FOUND（不属于该组）</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>请求中的 GroupID 原样返回</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>组名称。仅在 Status = SUCCESS 时有效；不支持 GN 特性时返回空字符串</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        App 从云端恢复房间配置后，向每台设备发送 ViewGroup 确认组关系是否还在 ——
        如果设备因恢复出厂丢失了组信息，App 需要重新发送 AddGroup。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">GetGroupMembership —— 查询组成员关系（0x02）</h3>
  <p>
    批量查询设备属于哪些组。可以传入一组 GroupID 做筛选查询，也可以传空列表获取设备所属的全部组。
    响应中还包含 <code>Capacity</code> 字段，告诉你设备还能加入多少个组。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupList</td>
          <td>list[group-id]</td>
          <td>是</td>
          <td>要查询的组 ID 列表。传空列表 <code>[]</code> 表示查询设备所属的全部组</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>GetGroupMembershipResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Capacity</td>
          <td>uint8 / null</td>
          <td>设备还能加入的组数量。<code>null</code> 表示未知</td>
        </tr>
        <tr>
          <td>GroupList</td>
          <td>list[group-id]</td>
          <td>设备实际所属的组 ID 列表（是请求列表与实际成员的交集；请求为空时返回全部）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>请求示例（查询设备是否属于组 1、2、3）：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x02"       // GetGroupMembership
    },
    "commandFields": {
      "0": [1, 2, 3]            // GroupList — 查询设备是否属于这三个组
    }
  }]
}</code></pre>
  <p>响应示例（设备属于组 1 和组 3，还可再加入 5 个组）：</p>
  <pre><code>{
  "invokeResponseValue": {
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0004",
      "commandId": "0x02"       // GetGroupMembershipResponse
    },
    "commandFields": {
      "0": 5,                   // Capacity = 5（还能再加入 5 个组）
      "1": [1, 3]               // GroupList — 设备属于组 1 和组 3
    }
  }
}</code></pre>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        App 启动时需要同步设备的组关系：传空 GroupList 获取设备所属的全部组，
        再与云端存储的房间配置比对，处理新增或丢失的组关系。
        Capacity 字段可以用来判断设备是否还有空间加入新的组。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">RemoveGroup —— 移出组（0x03）</h3>
  <p>
    将设备从指定的 Group 中移除。如果设备不属于该组，返回 NOT_FOUND。
    移除组成员关系后，设备将不再响应该组的组播命令。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>是</td>
          <td>要移出的组 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveGroupResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>status</td>
          <td><code>0x00</code> = SUCCESS，<code>0x8B</code> = NOT_FOUND</td>
        </tr>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>请求中的 GroupID 原样返回</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">关联的 Scene 会被清除</div>
    <p>
      移除组时，该组下绑定的所有 Scene 也会被自动删除。
      如果你只是想暂时让设备不响应组播，但保留 Scene 配置，
      目前没有「暂停组成员」的机制 —— 只能移除后重新添加。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户把一盏灯从「客厅」房间移到「卧室」房间：
        App 先对该灯发送 RemoveGroup（客厅 GroupID），再发送 AddGroup（卧室 GroupID）。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">RemoveAllGroups —— 移出所有组（0x04）</h3>
  <p>
    将设备从所有已加入的组中移除，相当于清空组表。没有参数，也没有响应。
    同时会清除所有关联的 Scene。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">谨慎使用</div>
    <p>
      这个命令会一次性清除设备的全部组关系和全部 Scene，无法撤销。
      通常只在恢复出厂设置、设备移交、或重新配网时才使用。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        设备恢复出厂设置流程中，App 在 Remove Fabric 之前先发送 RemoveAllGroups，
        确保设备上不残留任何组播配置。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">AddGroupIfIdentifying —— 在标识模式下加入组（0x05）</h3>
  <p>
    功能与 AddGroup 相同，但增加了一个前置条件：设备必须正处于 <strong>Identify 模式</strong>
    （即 Identify Cluster 的 <code>IdentifyTime &gt; 0</code>）才会执行。
    如果设备不在 Identify 模式，命令会被静默忽略。没有响应。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>是</td>
          <td>目标组 ID</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>是</td>
          <td>组名称（最长 16 字节）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">为什么需要这个命令</div>
    <p>
      配网阶段通常会先让设备进入 Identify 模式（用户确认「就是这台设备」），
      然后用 AddGroupIfIdentifying 以组播方式批量发送 ——
      只有正在闪灯/响铃的那台设备会加入组，其他设备不受影响。
      这避免了需要逐一获取每台设备地址再单播 AddGroup 的复杂流程。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        批量配置新安装的灯具：安装人员逐一触发每盏灯的 Identify（物理按键或扫码），
        然后用同一个 AddGroupIfIdentifying 组播命令批量发送。
        每盏灯在闪灯期间收到命令后自动加入指定组，不闪灯的灯忽略该命令。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>Groups Cluster 只有一个应用属性。点击属性 ID 可跳转到详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>读写</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NameSupport</td>
          <td>bitmap8</td>
          <td>只读</td>
          <td>是否支持存储组名称</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x0000">NameSupport（名称支持）</h3>
  <p>
    一个 8 位的位图，描述设备是否支持存储组名称。目前只使用了 Bit 7（最高位）。
  </p>

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
          <td>NameSupport</td>
          <td>bitmap8</td>
          <td>Bit 7（<code>0x80</code>）: GroupNames —— 为 <code>1</code> 时表示设备可以存储组名称。为 <code>0</code> 时 AddGroup 中的 GroupName 会被忽略，ViewGroup 响应中的 GroupName 始终为空字符串</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NameSupport 位图</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">GroupNames</span>
        <span class="enum-desc">支持存储组名称（对应 GN Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 0~6</span>
      <div>
        <span class="enum-name">Reserved</span>
        <span class="enum-desc">保留位，始终为 0</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">NameSupport 与 FeatureMap 的关系</div>
    <p>
      <code>NameSupport</code> 的 Bit 7 与 <code>FeatureMap</code> 的 GN（Bit 0）是联动的：
      如果 FeatureMap 声明了 GN，那么 NameSupport 的 Bit 7 也必须为 1。
      读取时两者应保持一致。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>Groups Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的可选能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">GN（GroupNames）</span>
        <span class="enum-desc">支持存储组名称 —— 启用后 AddGroup 的 GroupName 会被保存，ViewGroup 可查询到名称</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">大多数设备都支持 GN</div>
    <p>
      组名称存储占用的资源极少（每组最多 16 字节），绝大多数 Matter 设备都会启用 GN 特性。
      不支持 GN 的设备通常是资源极度受限的传感器类产品。
      App 端应先检查 FeatureMap，不支持 GN 时就不要在 UI 上显示组名称编辑功能。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个支持 GN 特性的设备的 Groups Cluster 属性：</p>

  <pre><code>{
  // --- 属性 ---
  "0x0000": 128          // NameSupport — Bit 7 = 1，支持组名称
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">GroupID 范围</div>
    <p>
      有效的 GroupID 范围是 <code>0x0001</code> ~ <code>0xFEFF</code>。
      <code>0x0000</code> 是无效值，<code>0xFF00</code> ~ <code>0xFFFF</code> 保留给 Matter 内部使用。
      App 分配 GroupID 时需要确保在有效范围内，且同一 Fabric 中不同组使用不同的 ID。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：按房间组织设备（最常见）</summary>
    <div class="scenario-content">
      <ol>
        <li>App 为每个房间分配唯一的 GroupID（如客厅 = 0x0001，卧室 = 0x0002）</li>
        <li>用户把设备拖入房间时，App 向设备发送 <code>AddGroup(GroupID, 房间名)</code></li>
        <li>用户点击「客厅全部关灯」，App 向 GroupID 0x0001 发送一条组播 <code>Off</code> 命令</li>
        <li>客厅的所有灯同时关闭，延迟几乎为零</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：多设备联动控制</summary>
    <div class="scenario-content">
      <ol>
        <li>用户创建一个「影院模式」组（GroupID = 0x0010），包含吊灯、灯带、电动窗帘</li>
        <li>向组内所有设备发送 AddGroup</li>
        <li>触发影院模式时，向 GroupID 0x0010 发送组播命令：
          <ul>
            <li>灯具收到 <code>LevelControl.MoveToLevel(20)</code> 调低亮度</li>
            <li>窗帘收到 <code>WindowCovering.GoToLiftPercentage(100)</code> 完全关闭</li>
          </ul>
        </li>
        <li>注意：组播命令会发给组内所有设备，每台设备只执行自己支持的 Cluster 命令</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：Groups + Scenes 联合使用（自动化预设）</summary>
    <div class="scenario-content">
      <p>
        Groups 和 Scenes 是 Matter 中最强的组合 —— Groups 定义「哪些设备一起动」，
        Scenes 定义「每台设备分别做什么」。
      </p>
      <ol>
        <li>创建「客厅」组（GroupID = 0x0001），加入 3 盏灯和 1 个窗帘</li>
        <li>在该组下创建 Scene「阅读模式」（SceneID = 0x01）：
          <ul>
            <li>吊灯：亮度 80%，色温 4000K</li>
            <li>台灯：亮度 100%，色温 5000K</li>
            <li>灯带：关闭</li>
            <li>窗帘：打开 50%</li>
          </ul>
        </li>
        <li>触发时，向 GroupID 0x0001 发送一条 <code>Scenes.RecallScene(SceneID: 0x01)</code> 组播命令</li>
        <li>所有设备同时切换到各自的预设状态，一条命令搞定</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：配网时批量建组</summary>
    <div class="scenario-content">
      <ol>
        <li>安装人员先让目标设备进入 Identify 模式（按物理按钮或通过 App 扫码触发）</li>
        <li>向网络组播地址发送 <code>AddGroupIfIdentifying(GroupID, GroupName)</code></li>
        <li>只有正在闪灯的设备会加入组，其他设备忽略这条命令</li>
        <li>对下一台设备重复以上操作，逐一完成建组</li>
        <li>这种方式特别适合大量设备的初始部署场景（如办公室、酒店）</li>
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
  'scene-management': {
    title: '场景管理 Cluster · SceneManagement（0x0062）',
    description: 'Matter SceneManagement Cluster（0x0062）完整参考 — AddScene/RecallScene/StoreScene 等全部命令、ExtensionFieldSets 结构、FabricSceneInfo 属性、场景过渡机制说明与实际应用场景示例。',
    prev: undefined,
    next: undefined,
    content: `<h1>场景管理 Cluster（SceneManagement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0062</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    SceneManagement 是 Matter 中的场景管理 Cluster —— 负责将多个 Cluster 的属性值打包成一个「快照」，
    然后通过一条命令一键恢复到这组状态。
    比如「观影模式」可以同时把灯调暗、色温调暖、窗帘关上，这些动作就是一个场景。
  </p>
  <p>
    每个场景由 <strong>GroupID + SceneID</strong> 唯一标识，属于某个组（Group），
    组内可以包含多个场景。场景的核心数据结构是 <strong>ExtensionFieldSets</strong>
    —— 一组「Cluster ID + 属性值列表」的快照，定义了这个场景要把哪些 Cluster 的哪些属性设成什么值。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Matter 1.4+ 替代旧版 Scenes（0x0005）</div>
    <p>
      SceneManagement（0x0062）是 Matter 1.4 引入的新 Cluster，取代了旧版 Scenes（0x0005）。
      新版本引入了 <strong>Fabric 级隔离</strong>（每个 Fabric 独立管理自己的场景表）和
      <strong>FabricSceneInfo</strong> 结构体，解决了旧版多 Fabric 共享场景表的安全问题。
      新项目应直接使用 0x0062，旧版 0x0005 已标记为弃用。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#structs">核心数据结构</a>
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
    SceneManagement Cluster 共有 8 个命令，覆盖场景的增删改查、一键召回和跨组复制。
    其中 AddScene 和 RecallScene 是日常开发最常用的两个。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>响应命令</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AddScene</td>
          <td>添加或更新一个场景</td>
          <td>AddSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ViewScene</td>
          <td>查看指定场景的完整数据</td>
          <td>ViewSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>RemoveScene</td>
          <td>删除指定场景</td>
          <td>RemoveSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RemoveAllScenes</td>
          <td>删除指定组内的所有场景</td>
          <td>RemoveAllScenesResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>StoreScene</td>
          <td>捕获当前状态存为场景</td>
          <td>StoreSceneResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>RecallScene</td>
          <td>一键恢复指定场景</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>GetSceneMembership</td>
          <td>查询组内已有的场景列表</td>
          <td>GetSceneMembershipResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x40">
          <td><a href="#cmd-0x40"><code>0x40</code></a></td>
          <td>CopyScene</td>
          <td>在组之间复制场景</td>
          <td>CopySceneResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">AddScene —— 添加场景（0x00）</h3>
  <p>
    向设备的场景表中添加一个新场景，或更新已有场景。
    场景的核心数据通过 <code>ExtensionFieldSets</code> 传入 —— 它定义了这个场景要控制哪些 Cluster 的哪些属性值。
    如果指定的 GroupID + SceneID 已存在，会覆盖更新。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>场景所属的组 ID。<code>0x0000</code> 表示不属于任何组</td>
        </tr>
        <tr>
          <td>SceneID</td>
          <td>uint8</td>
          <td>场景 ID，在组内唯一（0x00 ~ 0xFF）</td>
        </tr>
        <tr>
          <td>TransitionTime</td>
          <td>uint32</td>
          <td>过渡时间，单位 <strong>0.1 秒</strong>（毫秒的十分之一）。例如 <code>10</code> = 1.0 秒</td>
        </tr>
        <tr>
          <td>SceneName</td>
          <td>string</td>
          <td>场景名称（最长 16 字节）。需要设备支持 <strong>SN</strong> 特性</td>
        </tr>
        <tr>
          <td>ExtensionFieldSets</td>
          <td>list</td>
          <td>各 Cluster 的属性快照列表（详见<a href="#struct-efs">数据结构说明</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AddSceneResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>场景所属的组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>场景 ID</td></tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 中创建「观影模式」：灯光调到 10%、色温设为暖白、窗帘关闭。
        App 将这些属性值封装进 ExtensionFieldSets，通过 AddScene 存入设备，
        之后用 RecallScene 一键恢复。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">ViewScene —— 查看场景（0x01）</h3>
  <p>
    读取指定场景的完整数据，包括过渡时间、场景名称和 ExtensionFieldSets。
    用于在 App 界面上展示场景详情或编辑前获取当前配置。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>场景所属的组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>要查看的场景 ID</td></tr>
      </tbody>
    </table>
  </div>

  <h4>ViewSceneResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>场景 ID</td></tr>
        <tr><td>TransitionTime</td><td>uint32</td><td>过渡时间（0.1 秒）</td></tr>
        <tr><td>SceneName</td><td>string</td><td>场景名称</td></tr>
        <tr><td>ExtensionFieldSets</td><td>list</td><td>各 Cluster 的属性快照</td></tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        App 场景编辑页面加载时，先用 ViewScene 读取当前配置，展示给用户，
        用户修改后再通过 AddScene 更新。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">RemoveScene —— 删除场景（0x02）</h3>
  <p>
    从设备的场景表中删除指定的一个场景。删除后该 SceneID 可以被重新使用。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>场景所属的组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>要删除的场景 ID</td></tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveSceneResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>场景 ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户在 App 中删除不再需要的场景，如删掉旧的「派对模式」。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">RemoveAllScenes —— 删除组内所有场景（0x03）</h3>
  <p>
    一次性删除指定组内的全部场景。适合重置或清空某个区域的场景配置。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>要清空场景的组 ID</td></tr>
      </tbody>
    </table>
  </div>

  <h4>RemoveAllScenesResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>组 ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户重新装修后，清空「客厅」组的所有旧场景，准备重新配置。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">StoreScene —— 捕获当前状态（0x04）</h3>
  <p>
    将设备当前的实际状态「拍快照」保存为一个场景。设备会自动读取自身各 Cluster 的当前属性值，
    打包成 ExtensionFieldSets 存入场景表。相比 AddScene 需要手动指定每个属性值，
    StoreScene 更像一个「保存当前状态」的快捷操作。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>场景所属的组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>场景 ID（如果已存在则覆盖）</td></tr>
      </tbody>
    </table>
  </div>

  <h4>StoreSceneResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>组 ID</td></tr>
        <tr><td>SceneID</td><td>uint8</td><td>场景 ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户通过滑块把灯光调到自己喜欢的状态后，点击「保存为场景」按钮，
        App 发送 StoreScene 命令，设备自动将当前亮度、色温等属性值存入场景表。
        不需要 App 逐个读取属性值再用 AddScene 传入。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">RecallScene —— 恢复场景（0x05）</h3>
  <p>
    一键恢复指定场景。设备会读取场景中保存的 ExtensionFieldSets，
    将各 Cluster 的属性值设置到场景记录的目标值。
    如果指定了 TransitionTime，设备会在过渡时间内平滑切换（如灯光渐变）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupID</td>
          <td>group-id</td>
          <td>是</td>
          <td>场景所属的组 ID</td>
        </tr>
        <tr>
          <td>SceneID</td>
          <td>uint8</td>
          <td>是</td>
          <td>要恢复的场景 ID</td>
        </tr>
        <tr>
          <td>TransitionTime</td>
          <td>uint32</td>
          <td>否</td>
          <td>覆盖场景自带的过渡时间（0.1 秒）。省略则使用场景存储时的值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">过渡时间单位注意</div>
    <p>
      TransitionTime 的单位是 <strong>0.1 秒</strong>（100 毫秒），不是秒也不是毫秒。
      例如值为 <code>10</code> 表示 1.0 秒，<code>30</code> 表示 3.0 秒。
      这与旧版 Scenes Cluster 的秒级单位不同，新版精度更高。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户点击 App 中的「观影模式」按钮，App 发送 RecallScene，
        灯在 1 秒内从当前亮度渐暗到 10%，色温渐变为暖白，窗帘缓缓关闭。
        所有设备同步执行，过渡自然流畅。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">GetSceneMembership —— 查询场景列表（0x06）</h3>
  <p>
    查询指定组内有哪些场景。返回该组下所有已存储的 SceneID 列表和剩余容量。
    用于在 App 界面展示场景列表或判断还能创建多少个场景。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>GroupID</td><td>group-id</td><td>要查询的组 ID</td></tr>
      </tbody>
    </table>
  </div>

  <h4>GetSceneMembershipResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>Capacity</td><td>uint8 / null</td><td>剩余可存场景数量。<code>null</code> 表示未知</td></tr>
        <tr><td>GroupID</td><td>group-id</td><td>组 ID</td></tr>
        <tr><td>SceneList</td><td>list&lt;uint8&gt;</td><td>该组内已存储的 SceneID 列表</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        App 打开「场景管理」页面时，先调用 GetSceneMembership 获取当前组的所有场景 ID，
        再逐个调用 ViewScene 拿到场景详情展示列表。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x40">CopyScene —— 复制场景（0x40）</h3>
  <p>
    在组之间复制场景。可以复制单个场景，也可以一次性复制源组的全部场景到目标组。
    适合在不同房间之间共享相同的场景配置。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mode</td>
          <td>CopyModeBitmap</td>
          <td>Bit 0: CopyAllScenes —— 为 1 时复制源组的全部场景</td>
        </tr>
        <tr>
          <td>GroupIdentifierFrom</td>
          <td>group-id</td>
          <td>源组 ID</td>
        </tr>
        <tr>
          <td>SceneIdentifierFrom</td>
          <td>uint8</td>
          <td>源场景 ID（CopyAllScenes = 1 时忽略）</td>
        </tr>
        <tr>
          <td>GroupIdentifierTo</td>
          <td>group-id</td>
          <td>目标组 ID</td>
        </tr>
        <tr>
          <td>SceneIdentifierTo</td>
          <td>uint8</td>
          <td>目标场景 ID（CopyAllScenes = 1 时忽略）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>CopySceneResponse 返回字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>Status</td><td>status</td><td>操作结果状态码</td></tr>
        <tr><td>GroupIdentifierFrom</td><td>group-id</td><td>源组 ID</td></tr>
        <tr><td>SceneIdentifierFrom</td><td>uint8</td><td>源场景 ID</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在客厅配置好了「阅读模式」场景，想要在书房也用同样的配置。
        通过 CopyScene 把客厅组的场景复制到书房组，不需要重新设置每个属性值。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    SceneManagement Cluster 有 3 个属性。场景数据本身不通过属性暴露，
    而是通过 ViewScene / GetSceneMembership 命令读取。
    属性提供的是场景表的容量、当前状态等元信息。
  </p>

  <!-- 属性汇总表 -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>LastConfiguredBy</td>
          <td>node-id / null</td>
          <td>最后修改场景表的节点 ID</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SceneTableSize</td>
          <td>uint16</td>
          <td>场景表总容量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>FabricSceneInfo</td>
          <td>list&lt;FabricSceneInfo&gt;</td>
          <td>各 Fabric 的场景概况信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x0000">LastConfiguredBy（0x0000）</h3>
  <p>
    记录最后一次修改场景表的节点 ID（Node ID）。
    可以用来排查「是谁改了场景配置」的问题。
    值为 <code>null</code> 表示场景表从未被修改，或设备不支持追踪此信息。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-detail-0x0000">
          <td><code>0x0000</code></td>
          <td>LastConfiguredBy</td>
          <td>node-id / null</td>
          <td>Nullable。记录最后一次通过 AddScene / RemoveScene / StoreScene 等命令修改场景表的节点。<code>null</code> = 未记录或从未修改</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">SceneTableSize（0x0001）</h3>
  <p>
    设备场景表的最大容量，即最多能存储多少个场景。
    这是所有 Fabric 共享的总容量。典型设备值在 8~16 之间。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-detail-0x0001">
          <td><code>0x0001</code></td>
          <td>SceneTableSize</td>
          <td>uint16</td>
          <td>场景表总容量。多个 Fabric 共享这个容量上限，例如值为 16 表示所有 Fabric 加起来最多 16 个场景</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">FabricSceneInfo（0x0002）</h3>
  <p>
    每个 Fabric 独立维护的场景状态信息。这是一个列表，每个元素对应一个 Fabric。
    通过它可以知道当前 Fabric 有多少个场景、当前激活的是哪个场景、还能再存多少个。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Fabric 级隔离</div>
    <p>
      SceneManagement 的一个重要设计是 <strong>Fabric 级隔离</strong>：
      每个 Fabric（可以理解为每个智能家居平台，如 Apple Home、Google Home）只能看到和操作自己的场景，
      无法读取或修改其他 Fabric 的场景数据。FabricSceneInfo 也只返回当前 Fabric 自己的信息。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SceneCount</td>
          <td>uint8</td>
          <td>当前 Fabric 已存储的场景数量</td>
        </tr>
        <tr>
          <td>CurrentScene</td>
          <td>uint8</td>
          <td>当前激活的场景 ID（最后一次 RecallScene / StoreScene 的场景）</td>
        </tr>
        <tr>
          <td>CurrentGroup</td>
          <td>group-id</td>
          <td>当前激活场景所属的组 ID</td>
        </tr>
        <tr>
          <td>SceneValid</td>
          <td>bool</td>
          <td>当前场景状态是否仍然有效。如果设备属性被手动修改（不通过场景），会变为 <code>false</code></td>
        </tr>
        <tr>
          <td>RemainingCapacity</td>
          <td>uint8</td>
          <td>当前 Fabric 还能再存储多少个场景</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>此记录对应的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">SceneValid 的含义</div>
    <p>
      当通过 RecallScene 恢复了一个场景后，<code>SceneValid</code> 变为 <code>true</code>。
      但如果之后用户手动调节了亮度或色温（不通过场景操作），设备的实际状态就与场景记录不一致了，
      <code>SceneValid</code> 会变回 <code>false</code>。
      可以用这个字段判断当前设备状态是否仍然匹配某个场景。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 核心数据结构 ====== -->
  <h2 id="structs">核心数据结构</h2>

  <h3 id="struct-efs">ExtensionFieldSets（扩展字段集）</h3>
  <p>
    ExtensionFieldSets 是场景的核心数据 —— 它记录了「这个场景要把哪些 Cluster 的哪些属性设成什么值」。
    结构是一个列表，每个元素包含一个 Cluster ID 和该 Cluster 下要设置的属性值列表。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>层级</th><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2">ExtensionFieldSet</td>
          <td>ClusterID</td>
          <td>cluster-id</td>
          <td>要控制的 Cluster ID，如 <code>0x0006</code>（OnOff）</td>
        </tr>
        <tr>
          <td>AttributeValueList</td>
          <td>list</td>
          <td>该 Cluster 下的属性值列表</td>
        </tr>
        <tr>
          <td rowspan="2">AttributeValuePair</td>
          <td>AttributeID</td>
          <td>attrib-id</td>
          <td>属性 ID，如 <code>0x0000</code>（OnOff 的开关状态）</td>
        </tr>
        <tr>
          <td>ValueUnsigned8/16/...</td>
          <td>各类型</td>
          <td>属性值，类型取决于该属性的定义</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>举个例子，一个「观影模式」场景的 ExtensionFieldSets 可能包含：</p>
  <ul>
    <li><strong>OnOff（0x0006）</strong>：开关 = 开启</li>
    <li><strong>LevelControl（0x0008）</strong>：亮度 = 25（约 10%）</li>
    <li><strong>ColorControl（0x0300）</strong>：色温 X = 370，色温 Y = 300（暖白光）</li>
  </ul>
  <p>
    设备执行 RecallScene 时，会逐个读取这些属性对，调用对应 Cluster 的逻辑设置属性值。
    每个 Cluster 需要实现 <code>ScenesManagement</code> 的回调接口来支持场景存取。
  </p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>SceneManagement Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SN（SceneNames）</span>
        <span class="enum-desc">场景名称 —— 启用后 AddScene 可以设置 SceneName 字段，ViewScene 返回场景名称</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">SN 特性是否必须</div>
    <p>
      SN 特性是可选的。不支持 SN 的设备在 AddScene 时会忽略 SceneName 参数，
      ViewScene 返回的 SceneName 也会是空字符串。
      如果 App 需要展示场景名称，可以在 App 本地存储，不依赖设备端。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>属性读取示例</h3>
  <p>读取 SceneManagement Cluster 属性时的返回数据：</p>
  <pre><code>{
  // --- 场景表信息 ---
  "0x0000": null,          // LastConfiguredBy = null（未记录最后配置者）
  "0x0001": 16,            // SceneTableSize = 16（最多存储 16 个场景）

  // --- Fabric 场景信息 ---
  "0x0002": [              // FabricSceneInfo（当前 Fabric 的场景概况）
    {
      "SceneCount": 3,           // 当前 Fabric 已存储 3 个场景
      "CurrentScene": 1,         // 当前激活的场景 ID
      "CurrentGroup": 0,         // 当前激活场景所属的组 ID
      "SceneValid": true,        // 当前场景状态有效
      "RemainingCapacity": 13,   // 还能再存 13 个场景
      "FabricIndex": 1           // 所属 Fabric 索引
    }
  ]
}</code></pre>

  <h3>AddScene 命令示例</h3>
  <p>创建一个「观影模式」场景，包含 OnOff、LevelControl、ColorControl 三个 Cluster 的属性快照：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0062",
      "commandId": "0x00"       // AddScene
    },
    "commandFields": {
      "GroupID": 0,              // 组 ID（0 = 不属于任何组）
      "SceneID": 1,              // 场景 ID
      "TransitionTime": 10,      // 过渡时间 = 1.0 秒（单位 0.1 秒）
      "SceneName": "Movie",      // 场景名称（需 SN 特性）
      "ExtensionFieldSets": [    // 各 Cluster 的属性快照
        {
          "ClusterID": "0x0006", // OnOff Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0000", "ValueUnsigned8": 1 }
          ]
        },
        {
          "ClusterID": "0x0008", // LevelControl Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0000", "ValueUnsigned8": 25 }
          ]
        },
        {
          "ClusterID": "0x0300", // ColorControl Cluster
          "AttributeValueList": [
            { "AttributeID": "0x0003", "ValueUnsigned16": 370 },
            { "AttributeID": "0x0004", "ValueUnsigned16": 300 }
          ]
        }
      ]
    }
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际开发中，ExtensionFieldSets 里应该只包含设备实际支持的 Cluster。
      发送前可以先通过 Descriptor Cluster（0x001D）的 ServerList 确认设备有哪些 Cluster，
      避免传入设备不支持的 Cluster 导致命令失败。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：观影模式 —— 一键调暗灯光</summary>
    <div class="scenario-content">
      <p><strong>目标</strong>：用户点击「观影模式」按钮，灯光在 2 秒内渐变到暗暖光。</p>
      <ol>
        <li>创建场景时，用 <code>AddScene (0x00)</code> 设置 ExtensionFieldSets：
          <ul>
            <li>OnOff：开启</li>
            <li>LevelControl：亮度 = 25（约 10%）</li>
            <li>ColorControl：色温设为暖白</li>
          </ul>
          TransitionTime = 20（即 2.0 秒渐变）
        </li>
        <li>日常使用时，App 发送 <code>RecallScene (0x05)</code>，传入 GroupID 和 SceneID</li>
        <li>设备在 2 秒内平滑切换到目标状态，灯光自然变暗变暖</li>
        <li>如果用户想快速切换不要渐变，在 RecallScene 中覆盖 TransitionTime = 0</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：起床模式 —— 清晨自然唤醒</summary>
    <div class="scenario-content">
      <p><strong>目标</strong>：每天早上 7:00 灯光从关闭渐亮到明亮冷白光，模拟日出。</p>
      <ol>
        <li>用 <code>AddScene (0x00)</code> 创建「起床」场景：
          <ul>
            <li>OnOff：开启</li>
            <li>LevelControl：亮度 = 254（100%）</li>
            <li>ColorControl：色温设为冷白（日光色）</li>
          </ul>
          TransitionTime = 600（即 60 秒渐变，1 分钟日出效果）
        </li>
        <li>在自动化规则中设定：每天 07:00 触发 <code>RecallScene (0x05)</code></li>
        <li>灯光在 1 分钟内从关闭状态缓缓亮起到日光白，自然唤醒</li>
        <li>可配合 OnOff Cluster 的 OnWithTimedOff 做防忘关灯：起床 30 分钟后自动关闭</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：一键场景切换 —— 物理按钮触发</summary>
    <div class="scenario-content">
      <p><strong>目标</strong>：墙壁开关的单击 / 双击分别切换不同场景。</p>
      <ol>
        <li>预先配置两个场景：
          <ul>
            <li>SceneID = 1「日常」：亮度 80%，自然白光</li>
            <li>SceneID = 2「观影」：亮度 10%，暖白光</li>
          </ul>
        </li>
        <li>在绑定规则（Binding）中配置：
          <ul>
            <li>开关单击 → RecallScene（GroupID=0, SceneID=1）</li>
            <li>开关双击 → RecallScene（GroupID=0, SceneID=2）</li>
          </ul>
        </li>
        <li>场景切换完全在本地执行（通过 Group 组播），不依赖云端，响应速度极快</li>
        <li>
          用 <code>StoreScene (0x04)</code> 可以让用户自定义：把灯调到喜欢的状态，
          长按开关触发 StoreScene，当前状态就保存为该按键对应的场景
        </li>
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
  'binding': {
    title: '绑定 Cluster · Binding（0x001E）',
    description: 'Matter Binding Cluster（0x001E）完整参考 — 设备间绑定关系、TargetStruct 结构、单播 / 组播绑定写入方式、开关控灯等典型配线场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>绑定 Cluster（Binding）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001E</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 功能端点（如 <code>Endpoint 1</code>）&nbsp;|&nbsp;
    <strong>角色</strong>: Client 侧配置（无命令，通过写属性配置）
  </p>
  <p>
    Binding 是 Matter 中定义设备间「接线关系」的 Cluster。它解决的核心问题是：
    <strong>一个设备发出的命令，应该发给谁？</strong>
  </p>
  <p>
    举个例子：你有一个智能开关和一个智能灯泡。按下开关时，开关怎么知道该控制哪盏灯？
    答案就是 Binding —— 在开关的 Binding 属性里写入灯泡的地址，开关就「认识」了这盏灯。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心概念：Binding 是 Client 侧的配置</div>
    <p>
      Binding 配置在<strong>发送命令的一方</strong>（Client），而不是接收命令的一方（Server）。
      比如开关控灯的场景：Binding 写在<strong>开关</strong>上，不是写在灯泡上。
    </p>
    <p>
      可以把 Binding 理解为「通讯录」—— 开关的通讯录里记着灯泡的地址，
      按下按钮时就按照通讯录里的地址发送 OnOff 命令。灯泡自己不需要知道是谁在控制它。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">没有命令，只有属性写入</div>
    <p>
      Binding Cluster <strong>没有任何命令</strong>。所有配置都通过
      <strong>Write Attribute</strong> 操作完成 —— 直接写入 <code>Binding</code> 属性。
      这意味着每次写入都是<strong>全量替换</strong>整个绑定列表，不是追加。
      修改绑定时，先读取当前列表，修改后整体写回。
    </p>
  </div>

  <!-- ====== 属性 ====== -->
  <h2 id="attributes">属性</h2>
  <p>Binding Cluster 只有一个属性，且是必须支持的。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>读写</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Binding</td>
          <td>list&lt;TargetStruct&gt;</td>
          <td>读写</td>
          <td>绑定目标列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">Binding（绑定目标列表）</h3>
  <p>
    一个 <code>TargetStruct</code> 的列表，每个条目描述一个绑定目标。
    设备会按照这个列表中的地址发送命令。列表为空表示没有绑定任何目标。
  </p>
  <p>
    写入时是<strong>全量替换</strong> —— 新写入的列表会完全覆盖旧的。
    如果只想添加一个绑定，需要先读取现有列表，追加新条目后整体写回。
  </p>

  <h4 id="target-struct">TargetStruct 字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>字段</th>
          <th>类型</th>
          <th>必填</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>Node</td>
          <td>node-id</td>
          <td>可选</td>
          <td>目标节点 ID（单播绑定时使用）</td>
        </tr>
        <tr>
          <td><code>1</code></td>
          <td>Group</td>
          <td>group-id</td>
          <td>可选</td>
          <td>目标群组 ID（组播绑定时使用）</td>
        </tr>
        <tr>
          <td><code>2</code></td>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>可选</td>
          <td>目标端点（单播绑定时与 Node 配合使用）</td>
        </tr>
        <tr>
          <td><code>3</code></td>
          <td>Cluster</td>
          <td>cluster-id</td>
          <td>可选</td>
          <td>绑定到目标的哪个 Cluster</td>
        </tr>
        <tr>
          <td><code>254</code></td>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>是</td>
          <td>此绑定所属的 Fabric</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">单播 vs 组播：二选一</div>
    <p>
      每个 <code>TargetStruct</code> 要么是<strong>单播绑定</strong>（指定 <code>Node</code> + <code>Endpoint</code>），
      要么是<strong>组播绑定</strong>（指定 <code>Group</code>）。两者不能同时出现在同一个条目中。
    </p>
    <ul>
      <li><strong>单播</strong>：控制一台特定设备的特定端点，如「这个开关控制卧室床头灯」</li>
      <li><strong>组播</strong>：控制一个群组内的所有设备，如「这个开关控制客厅所有灯」</li>
    </ul>
    <p>
      <code>Cluster</code> 字段可选 —— 省略时表示绑定目标上的所有 Cluster，
      填写时表示只绑定到特定 Cluster（如只绑定 OnOff，不绑定 LevelControl）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>读取绑定列表</h3>
  <pre><code>{
  // 读取绑定列表
  "attributeRequests": [{
    "endpointId": 1,
    "clusterId": "0x001E",
    "attributeId": "0x00"          // Binding
  }]
}</code></pre>

  <h3>单播绑定（开关 → 灯泡）</h3>
  <p>将开关（Endpoint 1）绑定到 Node 2 上的灯泡（Endpoint 1）的 OnOff Cluster：</p>
  <pre><code>{
  // 单播绑定：开关 → 灯泡
  // 写入 Endpoint 1 的 Binding 属性
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"        // Binding
    },
    "dataVersion": 0,
    "data": [
      {
        "0": 2,                    // Node = 2（目标灯泡的 Node ID）
        "2": 1,                    // Endpoint = 1（目标灯泡的功能端点）
        "3": "0x0006",             // Cluster = OnOff（绑定到 OnOff Cluster）
        "254": 1                   // FabricIndex = 1
      }
    ]
  }]
}</code></pre>

  <h3>组播绑定（开关 → 灯群组）</h3>
  <p>将开关绑定到群组 1，按下时群组内所有灯一起响应：</p>
  <pre><code>{
  // 组播绑定：开关 → 一组灯
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"        // Binding
    },
    "dataVersion": 0,
    "data": [
      {
        "1": 1,                    // Group = 1（目标群组 ID）
        "3": "0x0006",             // Cluster = OnOff（绑定到 OnOff Cluster）
        "254": 1                   // FabricIndex = 1
      }
    ]
  }]
}</code></pre>

  <h3>多重绑定（一个开关控制多个目标）</h3>
  <p>同一个开关同时绑定两盏灯和一个群组 —— 列表中的每个条目都是一个独立的绑定目标：</p>
  <pre><code>{
  // 多重绑定：一个开关同时控制多个目标
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x001E",
      "attributeId": "0x00"
    },
    "dataVersion": 0,
    "data": [
      {
        "0": 2, "2": 1, "3": "0x0006",   // 灯泡 A（Node 2, Endpoint 1, OnOff）
        "254": 1
      },
      {
        "0": 3, "2": 1, "3": "0x0006",   // 灯泡 B（Node 3, Endpoint 1, OnOff）
        "254": 1
      },
      {
        "1": 1, "3": "0x0006",            // 群组 1（客厅所有灯）
        "254": 1
      }
    ]
  }]
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：开关控制灯泡（单播绑定）</summary>
    <div class="scenario-content">
      <p>最经典的 Binding 场景。一个墙壁开关控制一盏特定的灯。</p>
      <ol>
        <li>开关和灯泡都已配网到同一个 Fabric</li>
        <li>确认灯泡的 Node ID（如 2）和功能端点（如 Endpoint 1）</li>
        <li>在开关的 Endpoint 1 写入 Binding 属性，添加一条 <code>Node=2, Endpoint=1, Cluster=0x0006(OnOff)</code> 的记录</li>
        <li>按下开关 → 开关自动向 Node 2 / Endpoint 1 发送 OnOff Toggle 命令 → 灯泡响应</li>
      </ol>
      <p>
        这个过程不需要 Hub 或云端中转 —— 开关和灯泡在本地 Fabric 内直接通信。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：开关控制一组灯（组播绑定）</summary>
    <div class="scenario-content">
      <p>客厅有 3 盏灯，用户希望一个开关同时控制它们。</p>
      <ol>
        <li>先通过 Groups Cluster 将 3 盏灯加入同一个群组（如 Group ID = 1）</li>
        <li>在开关的 Binding 属性写入一条 <code>Group=1, Cluster=0x0006</code> 的记录</li>
        <li>按下开关 → 开关向群组 1 发送组播 OnOff 命令 → 3 盏灯同时响应</li>
      </ol>
      <p>
        组播比逐个发送单播命令更高效，延迟更低，所有灯几乎同时响应。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：多重绑定（一个开关控制多个不同目标）</summary>
    <div class="scenario-content">
      <p>一个场景开关需要同时控制不同类型的设备。</p>
      <ol>
        <li>Binding 列表中写入多条记录，每条指向不同的目标</li>
        <li>可以混合使用单播和组播 —— 比如一条指向卧室灯（单播），一条指向客厅灯组（组播）</li>
        <li>按下开关时，设备会遍历 Binding 列表，向每个目标都发送命令</li>
      </ol>
      <p>
        注意：多重绑定时，所有目标收到的是<strong>相同的命令</strong>。
        如果需要对不同设备发送不同命令（比如开灯的同时关空调），应该使用自动化规则而不是 Binding。
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      App 中管理 Binding 的典型流程：
    </p>
    <ol>
      <li>先读取当前 Binding 列表（Read Attribute）</li>
      <li>在 App UI 中展示已绑定的目标设备</li>
      <li>用户添加或移除绑定目标</li>
      <li>将修改后的完整列表写回（Write Attribute）—— 注意是全量替换</li>
    </ol>
    <p>
      写入时需要提供正确的 <code>FabricIndex</code>，通常从当前连接的 Fabric 信息中获取。
      跨 Fabric 的绑定条目不会被写入操作影响 —— 每个 Fabric 只能管理自己的绑定。
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
  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'access-control': {
    title: '访问控制 Cluster · AccessControl（0x001F）',
    description: 'Matter AccessControl Cluster（0x001F）完整参考 — ACL 权限条目管理、Privilege/AuthMode 枚举、AccessControlEntryStruct 结构体、事件定义及典型 ACL 配置示例。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>访问控制 Cluster（AccessControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x001F</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    AccessControl 是 Matter 设备的权限管理中枢 —— 决定了「谁」可以对「哪些资源」执行「什么操作」。
    每台 Matter 设备都必须在 Endpoint 0 上实现此 Cluster。
    它没有命令（Command），所有配置通过直接写入 <code>ACL</code> 属性完成。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心概念</div>
    <p>
      ACL 按 Fabric 隔离 —— 每个 Fabric（控制域）维护独立的权限条目列表，互不干扰。
      Commissioning 完成后，设备会自动为 Commissioner 创建一条 Administer 权限条目，
      这是后续所有操作的基础。如果 ACL 配置错误，可能导致设备「失联」，只能通过恢复出厂设置解决。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#structs">结构体</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举类型</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    AccessControl Cluster 的属性分为两组：ACL 数据（可读写的权限配置）和容量限制（只读的设备能力上限）。
    点击下方汇总表中的属性 ID 可跳转到对应的详细说明。
  </p>

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
        <!-- ACL 数据 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ACL</td>
          <td>list&lt;AccessControlEntryStruct&gt;</td>
          <td><a href="#group-acl-data">ACL 数据</a></td>
          <td>权限条目列表（核心属性）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Extension</td>
          <td>list&lt;AccessControlExtensionStruct&gt;</td>
          <td><a href="#group-acl-data">ACL 数据</a></td>
          <td>厂商自定义扩展数据</td>
        </tr>
        <!-- 容量限制 -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SubjectsPerAccessControlEntry</td>
          <td>uint16</td>
          <td><a href="#group-capacity">容量限制</a></td>
          <td>每条 ACL 最多包含多少个 Subject</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TargetsPerAccessControlEntry</td>
          <td>uint16</td>
          <td><a href="#group-capacity">容量限制</a></td>
          <td>每条 ACL 最多包含多少个 Target</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AccessControlEntriesPerFabric</td>
          <td>uint16</td>
          <td><a href="#group-capacity">容量限制</a></td>
          <td>每个 Fabric 最多有多少条 ACL</td>
        </tr>
        <!-- MNGD Feature -->
        <tr class="clickable-row" data-href="#attr-0x0400">
          <td><a href="#attr-0x0400"><code>0x0400</code></a></td>
          <td>CommissioningARL</td>
          <td>list&lt;CommissioningAccessRestrictionEntryStruct&gt;</td>
          <td><a href="#group-arl">访问限制</a></td>
          <td>Commissioning 阶段的访问限制列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0401">
          <td><a href="#attr-0x0401"><code>0x0401</code></a></td>
          <td>ARL</td>
          <td>list&lt;AccessRestrictionEntryStruct&gt;</td>
          <td><a href="#group-arl">访问限制</a></td>
          <td>运行时访问限制列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== ACL 数据（0x0000, 0x0001）====== -->
  <h3 id="group-acl-data">ACL 数据（0x0000, 0x0001）</h3>
  <p>权限条目和扩展数据，这是 AccessControl 的核心可写属性。</p>

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
          <td>ACL（访问控制列表）</td>
          <td>list&lt;AccessControlEntryStruct&gt;</td>
          <td>
            设备的权限条目列表。每个条目定义一条「谁可以做什么」的规则。
            按 Fabric 隔离 —— 每个 Fabric 只能读写自己的条目。
            写入时必须整体替换（不支持增量修改单条），需要 <strong>Administer</strong> 权限。
            结构体详情见 <a href="#struct-entry">AccessControlEntryStruct</a>
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Extension（扩展数据）</td>
          <td>list&lt;AccessControlExtensionStruct&gt;</td>
          <td>
            厂商自定义的权限扩展。每条包含一个不超过 128 字节的 TLV 编码数据。
            标准 Matter 实现通常不使用此字段。<strong>需要 EXTS 特性</strong>。
            写入需要 <strong>Administer</strong> 权限
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">写入 ACL 的注意事项</div>
    <p>
      写入 ACL 是<strong>整体替换</strong>操作 —— 你必须把完整的条目列表一次性写入，不能只修改其中一条。
      如果新写入的列表中没有包含自己的 Administer 条目，你将<strong>永久失去对设备的管理权限</strong>，
      只能恢复出厂设置。建议写入前先读取当前 ACL，在其基础上修改，再整体写回。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 容量限制（0x0002 ~ 0x0004）====== -->
  <h3 id="group-capacity">容量限制（0x0002 ~ 0x0004）</h3>
  <p>只读属性，描述设备对 ACL 条目的容量上限。写入 ACL 前应先读取这些值，避免超出设备能力。</p>

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
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>SubjectsPerAccessControlEntry</td>
          <td>uint16</td>
          <td>单条 ACL 中 <code>subjects</code> 列表的最大长度。最小值为 4</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>TargetsPerAccessControlEntry</td>
          <td>uint16</td>
          <td>单条 ACL 中 <code>targets</code> 列表的最大长度。最小值为 3</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AccessControlEntriesPerFabric</td>
          <td>uint16</td>
          <td>每个 Fabric 可以拥有的 ACL 条目总数上限。最小值为 4（至少容纳一条管理员条目和几条用户条目）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">典型设备的容量</div>
    <p>
      大多数设备的典型值：SubjectsPerAccessControlEntry = 4，TargetsPerAccessControlEntry = 3，
      AccessControlEntriesPerFabric = 4。资源受限的设备（如电池供电传感器）可能更小，
      开发时务必先读取这三个值再做规划。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 访问限制（0x0400, 0x0401）====== -->
  <h3 id="group-arl">访问限制（0x0400, 0x0401）— MNGD 特性</h3>
  <p>
    Access Restriction List（ARL）是 MNGD（Managed Device）特性引入的高级功能，
    允许设备制造商限制某些资源的访问权限，即使 ACL 允许也不行。
    普通设备通常不实现此特性。
  </p>

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
        <tr id="attr-0x0400">
          <td><code>0x0400</code></td>
          <td>CommissioningARL</td>
          <td>list</td>
          <td>Commissioning 阶段的访问限制。设备在配网时告知 Commissioner 哪些资源受限。<strong>需要 MNGD 特性</strong></td>
        </tr>
        <tr id="attr-0x0401">
          <td><code>0x0401</code></td>
          <td>ARL</td>
          <td>list</td>
          <td>运行时的访问限制列表。即使 ACL 授予了权限，ARL 中列出的资源仍然不可访问。<strong>需要 MNGD 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 结构体详解 ====== -->
  <h2 id="structs">结构体详解</h2>

  <h3 id="struct-entry">AccessControlEntryStruct —— 权限条目</h3>
  <p>
    ACL 的核心数据结构。每条记录定义了一组主体（谁）在一组目标（哪些资源）上拥有的权限级别。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Privilege</td>
          <td><a href="#enum-privilege">AccessControlEntryPrivilegeEnum</a></td>
          <td>授予的权限级别（View / Operate / Manage / Administer）</td>
        </tr>
        <tr>
          <td>AuthMode</td>
          <td><a href="#enum-authmode">AccessControlEntryAuthModeEnum</a></td>
          <td>认证方式（PASE / CASE / Group）</td>
        </tr>
        <tr>
          <td>Subjects</td>
          <td>list&lt;subject-id&gt; / null</td>
          <td>
            允许访问的主体列表（Node ID 或 Group ID）。
            <code>null</code> 表示同 Fabric 下的<strong>所有节点</strong>都可以访问
          </td>
        </tr>
        <tr>
          <td>Targets</td>
          <td>list&lt;<a href="#struct-target">AccessControlTargetStruct</a>&gt; / null</td>
          <td>
            允许访问的目标范围。
            <code>null</code> 表示设备上<strong>所有 Endpoint 和 Cluster</strong> 都可以访问
          </td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>此条目所属的 Fabric 索引（由设备自动填充，不需要手动指定）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Subjects 和 Targets 的 null 含义</div>
    <p>
      <code>null</code> 在 ACL 中表示「不限制」而非「拒绝」。
      <code>Subjects = null</code> 意味着同 Fabric 内所有节点都匹配；
      <code>Targets = null</code> 意味着设备上所有 Endpoint 和 Cluster 都在范围内。
      默认的管理员条目通常设置 <code>Targets = null</code>，因为管理员需要访问一切。
    </p>
  </div>

  <h3 id="struct-target">AccessControlTargetStruct —— 访问目标</h3>
  <p>
    定义 ACL 条目允许访问的具体资源范围。三个字段中<strong>至少指定一个</strong>，未指定的字段表示不限制。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cluster</td>
          <td>cluster-id / null</td>
          <td>限定到特定 Cluster。<code>null</code> = 不限制 Cluster</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no / null</td>
          <td>限定到特定 Endpoint。<code>null</code> = 不限制 Endpoint</td>
        </tr>
        <tr>
          <td>DeviceType</td>
          <td>devtype-id / null</td>
          <td>限定到特定设备类型。<code>null</code> = 不限制设备类型</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Endpoint 和 DeviceType 互斥</div>
    <p>
      <code>Endpoint</code> 和 <code>DeviceType</code> 不能同时指定 —— 要么按 Endpoint 编号精确匹配，
      要么按设备类型模糊匹配。如果两个都设了值，设备会拒绝此条目。
      最常用的方式是只指定 <code>Endpoint</code>。
    </p>
  </div>

  <h3 id="struct-extension">AccessControlExtensionStruct —— 扩展数据</h3>
  <p>
    厂商自定义的扩展结构，需要启用 EXTS 特性。标准 Matter 开发中很少用到。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data</td>
          <td>octstr（最大 128 字节）</td>
          <td>TLV 编码的扩展数据，内容由厂商定义</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>所属 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 枚举类型 ====== -->
  <h2 id="enums">枚举类型</h2>

  <h3 id="enum-privilege">AccessControlEntryPrivilegeEnum —— 权限级别</h3>
  <p>
    定义 ACL 条目授予的权限等级。权限是<strong>包含关系</strong> —— 高级别权限自动包含低级别权限的所有能力。
    例如 Operate 包含 View 的能力，Administer 包含所有能力。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">View</span>
        <span class="enum-desc">只读权限 —— 可以读取属性、订阅事件，不能执行任何写操作或命令</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ProxyView</span>
        <span class="enum-desc">代理只读 —— 类似 View，用于 Proxy 节点场景（较少使用）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Operate</span>
        <span class="enum-desc">操作权限 —— 可以读取属性 + 执行命令（开灯、开锁等日常操作）。<strong>最常用的用户权限</strong></span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Manage</span>
        <span class="enum-desc">管理权限 —— 可以操作 + 写入配置属性（修改设备名称、设置上电行为等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Administer</span>
        <span class="enum-desc">最高权限 —— 可以管理 + 修改 ACL 本身 + 执行 Commissioning 相关操作。<strong>仅限控制器/Hub</strong></span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">权限继承关系</div>
    <p>
      Administer &supset; Manage &supset; Operate &supset; View。
      给用户分配 Operate 权限后，他自动拥有 View 的能力，不需要再单独加一条 View 的 ACL。
    </p>
  </div>

  <h3 id="enum-authmode">AccessControlEntryAuthModeEnum —— 认证方式</h3>
  <p>指定 ACL 条目匹配的认证方式。不同认证方式决定了 Subjects 字段中 ID 的含义。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PASE</span>
        <span class="enum-desc">Passcode 认证 —— 仅在 Commissioning 阶段使用，配网完成后自动失效。不需要手动配置</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">CASE</span>
        <span class="enum-desc">Certificate 认证 —— 最常用的方式，基于证书的点对点安全通信。Subjects 中填 Node ID</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Group</span>
        <span class="enum-desc">组播认证 —— 用于 Group 消息（如同时控制一组灯）。Subjects 中填 Group ID</span>
      </div>
    </div>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    AccessControl Cluster 通过事件记录 ACL 的变更历史。每次写入 ACL 或 Extension 属性时，
    设备都会生成对应的事件。这些事件对安全审计和故障排查非常重要。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>优先级</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>AccessControlEntryChanged</td>
          <td>Info</td>
          <td>ACL 条目发生变更（新增、修改或删除）。事件数据包含变更类型（Changed/Added/Removed）、最新条目内容、操作者 Node ID 和 Fabric 索引</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>AccessControlExtensionChanged</td>
          <td>Info</td>
          <td>Extension 扩展数据发生变更。结构与上一个事件类似，记录了扩展数据的增删改。<strong>需要 EXTS 特性</strong></td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>FabricRestrictionReviewUpdate</td>
          <td>Info</td>
          <td>Fabric 访问限制审核更新。当 ARL 规则变化时触发。<strong>需要 MNGD 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">审计建议</div>
    <p>
      在生产环境中，建议订阅 <code>AccessControlEntryChanged</code> 事件。
      如果有人意外修改了 ACL（比如误删了管理员条目），可以通过事件记录快速定位问题。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>AccessControl Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的扩展能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">EXTS（Extension）</span>
        <span class="enum-desc">支持厂商自定义扩展数据 —— 启用后可写入 Extension（0x0001）属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">MNGD（Managed Device）</span>
        <span class="enum-desc">托管设备 —— 支持 Access Restriction List（ARL），制造商可额外限制资源访问</span>
      </div>
    </div>
  </div>

  <p>
    大多数消费级设备的 FeatureMap 为 <code>0x0000</code>（不启用任何特性）。
    EXTS 用于有自定义权限需求的厂商设备，MNGD 用于云平台管理的设备。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>
    一台典型智能灯在 Commissioning 完成并添加了一条用户权限后的 AccessControl Cluster 读取结果：
  </p>

  <pre><code>{
  // --- ACL 权限条目（列表，每个 Fabric 独立维护）---
  "0x0000": [                    // ACL — AccessControlEntryStruct 列表
    {
      "privilege": 5,            // Administer（管理员）
      "authMode": 2,             // CASE 认证
      "subjects": [112233],      // 绑定到 Commissioner Node ID
      "targets": null,           // null = 可访问所有 Endpoint 和 Cluster
      "fabricIndex": 1
    },
    {
      "privilege": 3,            // Operate（操作权限）
      "authMode": 2,             // CASE 认证
      "subjects": null,          // null = 同 Fabric 下所有节点
      "targets": [               // 限定可访问的范围
        { "cluster": null, "endpoint": 1, "deviceType": null }
      ],
      "fabricIndex": 1
    }
  ],

  // --- 容量限制 ---
  "0x0002": 4,                   // SubjectsPerAccessControlEntry = 4
  "0x0003": 3,                   // TargetsPerAccessControlEntry = 3
  "0x0004": 4                    // AccessControlEntriesPerFabric = 4
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      第一条 ACL（Privilege = 5, Administer）是 Commissioning 时自动创建的，<strong>绝对不能删除</strong>。
      添加用户权限时，先读取完整的 ACL 列表，追加新条目，再整体写回。
      注意 Extension（0x0001）只有在 FeatureMap 包含 EXTS 时才存在。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：默认管理员 ACL（Commissioning 后自动生成）</summary>
    <div class="scenario-content">
      <p>
        设备完成 Commissioning 后，会自动为 Commissioner（通常是手机 App 或 Hub）创建一条管理员权限条目：
      </p>
      <ul>
        <li><strong>Privilege</strong> = Administer（5）—— 最高权限</li>
        <li><strong>AuthMode</strong> = CASE（2）—— 基于证书的安全认证</li>
        <li><strong>Subjects</strong> = [Commissioner 的 Node ID] —— 只有这个控制器</li>
        <li><strong>Targets</strong> = null —— 可访问设备上的一切</li>
      </ul>
      <p>
        这条 ACL 是后续所有操作的基础。如果误删了它，设备将无法被控制，只能恢复出厂设置。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：为家庭成员添加操作权限</summary>
    <div class="scenario-content">
      <p>
        管理员想让家庭成员（另一台手机）可以控制灯和开关，但不能修改设备配置：
      </p>
      <ol>
        <li>读取当前 ACL 列表（确保包含管理员条目）</li>
        <li>追加一条新条目：
          <ul>
            <li><strong>Privilege</strong> = Operate（3）</li>
            <li><strong>AuthMode</strong> = CASE（2）</li>
            <li><strong>Subjects</strong> = [家庭成员的 Node ID]</li>
            <li><strong>Targets</strong> = [&#123; endpoint: 1 &#125;]（只允许操作功能端点）</li>
          </ul>
        </li>
        <li>将包含管理员条目和新条目的完整列表写入 ACL</li>
      </ol>
      <p>
        写入后，家庭成员可以开关灯，但不能修改 ACL、设备名称或上电行为等管理级配置。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：设置 Group 组播权限</summary>
    <div class="scenario-content">
      <p>
        需要通过组播（Multicast）同时控制一组灯，例如「客厅全部灯」：
      </p>
      <ol>
        <li>先为每盏灯配置 Group Key（通过 GroupKeyManagement Cluster）</li>
        <li>在每盏灯的 ACL 中添加一条 Group 权限：
          <ul>
            <li><strong>Privilege</strong> = Operate（3）</li>
            <li><strong>AuthMode</strong> = Group（3）</li>
            <li><strong>Subjects</strong> = [Group ID]</li>
            <li><strong>Targets</strong> = [&#123; endpoint: 1 &#125;]</li>
          </ul>
        </li>
        <li>之后向该 Group 发送 OnOff 命令，所有灯同时响应</li>
      </ol>
      <p>
        Group 模式下的权限级别<strong>最高只能到 Operate</strong>，不允许通过 Group 执行管理或 Administer 操作。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：排查「操作被拒绝」问题</summary>
    <div class="scenario-content">
      <p>
        当设备返回 <code>UNSUPPORTED_ACCESS</code> 或 <code>ACCESS_DENIED</code> 错误时，排查步骤：
      </p>
      <ol>
        <li>读取设备的 ACL（0x0000），确认是否有匹配当前 Node 的条目</li>
        <li>检查匹配条目的 <strong>Privilege</strong> 是否足够（例如写入属性需要 Manage，修改 ACL 需要 Administer）</li>
        <li>检查 <strong>AuthMode</strong> 是否匹配（CASE 认证的节点不会匹配 Group 类型的 ACL 条目）</li>
        <li>检查 <strong>Targets</strong> 是否覆盖了目标 Endpoint 和 Cluster</li>
        <li>确认容量限制 —— 读取 SubjectsPerAccessControlEntry 和 AccessControlEntriesPerFabric，看是否超限</li>
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
};
