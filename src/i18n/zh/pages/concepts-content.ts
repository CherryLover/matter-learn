/**
 * Concepts page FULL content — Chinese (original)
 */
export default {
  title: '概念总览',
  description: '零基础理解 Matter 协议 — Node、Endpoint、Cluster、Attribute、Command 五个核心概念，用智能大楼类比一次讲清楚四层数据模型。',
  nextTitle: 'Cluster 手册',
  content: `
  <h1>概念总览</h1>

  <div class="callout callout-info">
    <div class="callout-title">读完这页你会知道</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>Matter 用四层结构描述一个设备能做什么</li>
      <li>Node、Endpoint、Cluster、Attribute、Command 分别是什么意思</li>
      <li>看到 "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 = 0x01" 时，能直接翻译成人话</li>
      <li>不管你是 App 开发、固件工程、测试还是产品，都能看懂设备数据</li>
    </ul>
  </div>

  <p>
    这一章讲清楚 Matter 协议的核心概念，不需要特定技术背景，每个人都能看懂。
    读完之后，你看到 "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 = 0x01" 这样的数据，就能直接知道它在说什么。
  </p>

  <!-- ====== 什么是 Matter ====== -->
  <h2 id="what-is-matter">什么是 Matter</h2>
  <p>
    Matter 是一个<strong>智能家居统一标准协议</strong>，由 Apple、Google、Amazon、三星等公司联合制定（组织叫 CSA，Connectivity Standards Alliance）。
  </p>
  <p>
    在 Matter 出现之前，同一个智能灯泡想同时被 HomeKit、Google Home、Alexa 控制，厂商得分别接入三套完全不同的协议。
    Matter 的目标很简单：<strong>定义一套标准的数据模型和通信方式，所有平台都认</strong>。
  </p>
  <p>
    打个比方：Matter 就像 USB-C 接口。以前每家手机一个充电口，现在统一成 USB-C，线和设备都可以互换。
    Matter 做的事一样 —— 给智能家居设备定义了一个"统一接口"。
  </p>
  <p>
    从技术上看，Matter 是一个<strong>应用层协议</strong>：它只定义上面几层（设备能做什么、怎么交互、怎么加密），下面直接跑在现有的 Wi-Fi、Thread、以太网这些 IP 网络上；蓝牙只在配网阶段临时用一下。
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/stack-zh.webp" alt="Matter 协议分层：应用层（Cluster 数据模型）、交互模型、安全层、传输层由 Matter 定义，网络层 IPv6 和链路层 Wi-Fi / Thread / 以太网复用现有技术，蓝牙 BLE 仅用于配网" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>Matter 只定义上面四层，下面复用现有 IP 网络；蓝牙 BLE 只在配网时用</figcaption>
  </figure>
  <p>
    想知道 Matter 和 Zigbee、Z-Wave、蓝牙 Mesh 这些协议各管哪几层、有什么异同，见 <a href="../compare/">协议对比</a>。
  </p>

  <!-- ====== 四层数据模型 ====== -->
  <h2 id="data-model">Matter 的四层数据模型</h2>
  <p>
    Matter 把一个设备的所有能力组织成四个层次。这是 Matter 最核心的概念，理解了它就理解了大半。
  </p>
  <p>
    想象一栋智能大楼 —— 这个类比能帮你一下子看懂整个结构：
  </p>

  <!-- 四层模型总览图：以门锁为例 -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 720 455" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 720px; display: block; margin: 0 auto;" role="img" aria-label="Matter 四层数据模型总览：以智能门锁为例，展示 Node、Endpoint、Cluster、Attribute、Command 的嵌套关系">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Node outer box -->
        <rect class="d-node-fill" x="10" y="10" width="700" height="385" rx="14" stroke-width="1.5"/>
        <text class="d-text-title" x="360" y="36" text-anchor="middle" font-size="17" font-weight="600">Node（设备节点）</text>
        <text class="d-text-sub" x="360" y="54" text-anchor="middle" font-size="12">例：一把智能门锁</text>

        <!-- Endpoint 0 -->
        <g>
          <rect class="d-ep-fill" x="24" y="68" width="278" height="320" rx="10" stroke-width="1.5"/>
          <text class="d-text-ep" x="163" y="90" text-anchor="middle" font-size="14" font-weight="600">Endpoint 0</text>
          <text class="d-text-ep-sub" x="163" y="106" text-anchor="middle" font-size="12">管理端点</text>
          <line class="d-ep-line" x1="38" y1="114" x2="288" y2="114" stroke-width="0.5" opacity="0.4"/>

          <!-- Cluster: BasicInformation -->
          <rect class="d-cl-fill" x="38" y="122" width="250" height="258" rx="8" stroke-width="1"/>
          <text class="d-text-cl" x="163" y="144" text-anchor="middle" font-size="13" font-weight="600">BasicInformation</text>
          <text class="d-text-sub" x="163" y="160" text-anchor="middle" font-size="11">基本信息 · 0x0028</text>
          <line class="d-cl-line" x1="48" y1="168" x2="278" y2="168" stroke-width="0.5" opacity="0.3"/>

          <!-- Attributes -->
          <text class="d-text-section" x="52" y="186" font-size="10" font-weight="600" letter-spacing="0.5">ATTRIBUTES</text>
          <rect class="d-at-fill" x="48" y="194" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="211" font-size="12">厂商名 VendorName</text>
          <rect class="d-at-fill" x="48" y="226" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="243" font-size="12">产品名 ProductName</text>
          <rect class="d-at-fill" x="48" y="258" width="230" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="62" y="275" font-size="12">固件版本 SoftwareVersion</text>

          <!-- Commands -->
          <text class="d-text-section" x="52" y="306" font-size="10" font-weight="600" letter-spacing="0.5">COMMANDS</text>
          <text class="d-text-muted-italic" x="62" y="326" font-size="12">（无）</text>
        </g>

        <!-- Endpoint 1 (highlighted with thicker border) -->
        <g>
          <rect class="d-ep1-fill" x="316" y="68" width="380" height="320" rx="10" stroke-width="2"/>
          <text class="d-text-ep" x="506" y="90" text-anchor="middle" font-size="14" font-weight="600">Endpoint 1</text>
          <text class="d-text-ep-sub" x="506" y="106" text-anchor="middle" font-size="12">功能端点</text>
          <line class="d-ep-line" x1="330" y1="114" x2="682" y2="114" stroke-width="0.5" opacity="0.4"/>

          <!-- Cluster: DoorLock -->
          <rect class="d-cl-fill" x="330" y="122" width="352" height="258" rx="8" stroke-width="1"/>
          <text class="d-text-cl" x="506" y="144" text-anchor="middle" font-size="13" font-weight="600">DoorLock</text>
          <text class="d-text-sub" x="506" y="160" text-anchor="middle" font-size="11">门锁控制 · 0x0101</text>
          <line class="d-cl-line" x1="340" y1="168" x2="672" y2="168" stroke-width="0.5" opacity="0.3"/>

          <!-- Attributes -->
          <text class="d-text-section" x="344" y="186" font-size="10" font-weight="600" letter-spacing="0.5">ATTRIBUTES</text>
          <rect class="d-at-fill" x="340" y="194" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="354" y="211" font-size="12">锁状态 LockState</text>
          <rect class="d-at-fill" x="340" y="226" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-at" x="354" y="243" font-size="12">电池电量 BatPercentRemaining</text>

          <!-- Commands -->
          <text class="d-text-section" x="344" y="274" font-size="10" font-weight="600" letter-spacing="0.5">COMMANDS</text>
          <rect class="d-cm-fill" x="340" y="282" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-cm" x="354" y="299" font-size="12">上锁 LockDoor</text>
          <rect class="d-cm-fill" x="340" y="314" width="332" height="26" rx="5" stroke-width="1"/>
          <text class="d-text-cm" x="354" y="331" font-size="12">解锁 UnlockDoor</text>
        </g>

        <!-- Legend -->
        <g>
          <rect class="d-legend-bg" x="10" y="405" width="700" height="40" rx="8" stroke-width="1"/>
          <rect class="d-node-swatch" x="30" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="50" y="429" font-size="11">Node</text>
          <rect class="d-ep-swatch" x="120" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="140" y="429" font-size="11">Endpoint</text>
          <rect class="d-cl-swatch" x="230" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="250" y="429" font-size="11">Cluster</text>
          <rect class="d-at-swatch" x="340" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="360" y="429" font-size="11">Attribute</text>
          <rect class="d-cm-swatch" x="460" y="418" width="14" height="14" rx="3" stroke-width="1"/>
          <text class="d-text-legend" x="480" y="429" font-size="11">Command</text>
        </g>
      </g>
    </svg>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">另一种理解方式：手机类比</div>
    <p>如果觉得大楼不够直观，也可以想成你的手机：Node = 手机本身，Endpoint = 手机里的一个 App，Cluster = App 里的一个功能模块，Attribute = 能看到的信息（电量 80%），Command = 能执行的操作（拍照、发消息）。</p>
  </div>

  <!-- 日常类比对照图 -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 660 330" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 660px; display: block; margin: 0 auto;" role="img" aria-label="Matter 概念与日常类比对照：Node 对应智能大楼，Endpoint 对应房间，Cluster 对应设备系统，Attribute 和 Command 对应仪表读数和遥控按钮">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Column headers -->
        <text class="d-text-analogy-header-left" x="130" y="22" text-anchor="middle" font-size="14" font-weight="600">Matter 概念</text>
        <text class="d-text-analogy-header-right" x="530" y="22" text-anchor="middle" font-size="14" font-weight="600">日常类比</text>

        <!-- Level 1: Node <-> 智能大楼 -->
        <rect class="d-analogy-left" x="20" y="38" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="60" text-anchor="middle" font-size="14" font-weight="600">Node</text>
        <text class="d-text-analogy-sub" x="130" y="76" text-anchor="middle" font-size="11">设备节点 — 物理设备</text>
        <rect class="d-analogy-right" x="420" y="38" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="60" text-anchor="middle" font-size="14" font-weight="600">智能大楼</text>
        <text class="d-text-analogy-sub" x="530" y="76" text-anchor="middle" font-size="11">一栋完整的建筑</text>
        <line class="d-analogy-dash" x1="240" y1="64" x2="420" y2="64" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 1->2 -->
        <line class="d-analogy-connector" x1="130" y1="90" x2="130" y2="110" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="90" x2="530" y2="110" stroke-width="1.5"/>

        <!-- Level 2: Endpoint <-> 房间 -->
        <rect class="d-analogy-left" x="20" y="110" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="132" text-anchor="middle" font-size="14" font-weight="600">Endpoint</text>
        <text class="d-text-analogy-sub" x="130" y="148" text-anchor="middle" font-size="11">端点 — 独立功能区域</text>
        <rect class="d-analogy-right" x="420" y="110" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="132" text-anchor="middle" font-size="14" font-weight="600">房间 / 功能区</text>
        <text class="d-text-analogy-sub" x="530" y="148" text-anchor="middle" font-size="11">物业办公室、住户房间</text>
        <line class="d-analogy-dash" x1="240" y1="136" x2="420" y2="136" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 2->3 -->
        <line class="d-analogy-connector" x1="130" y1="162" x2="130" y2="182" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="162" x2="530" y2="182" stroke-width="1.5"/>

        <!-- Level 3: Cluster <-> 设备系统 -->
        <rect class="d-analogy-left" x="20" y="182" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="204" text-anchor="middle" font-size="14" font-weight="600">Cluster</text>
        <text class="d-text-analogy-sub" x="130" y="220" text-anchor="middle" font-size="11">能力簇 — 一组相关能力</text>
        <rect class="d-analogy-right" x="420" y="182" width="220" height="52" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="204" text-anchor="middle" font-size="14" font-weight="600">设备系统</text>
        <text class="d-text-analogy-sub" x="530" y="220" text-anchor="middle" font-size="11">灯光、空调、门锁系统</text>
        <line class="d-analogy-dash" x1="240" y1="208" x2="420" y2="208" stroke-dasharray="6 3" stroke-width="1.5"/>

        <!-- Vertical connectors 3->4 -->
        <line class="d-analogy-connector" x1="130" y1="234" x2="130" y2="254" stroke-width="1.5"/>
        <line class="d-analogy-connector" x1="530" y1="234" x2="530" y2="254" stroke-width="1.5"/>

        <!-- Level 4: Attribute/Command <-> 仪表/遥控器 -->
        <rect class="d-analogy-left" x="20" y="254" width="220" height="56" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-left" x="130" y="276" text-anchor="middle" font-size="13" font-weight="600">Attribute / Command</text>
        <text class="d-text-analogy-sub" x="130" y="294" text-anchor="middle" font-size="11">属性 / 命令</text>
        <rect class="d-analogy-right" x="420" y="254" width="220" height="56" rx="8" stroke-width="1.5"/>
        <text class="d-text-analogy-right" x="530" y="276" text-anchor="middle" font-size="13" font-weight="600">仪表盘 / 遥控器</text>
        <text class="d-text-analogy-sub" x="530" y="294" text-anchor="middle" font-size="11">读数 / 按钮</text>
        <line class="d-analogy-dash" x1="240" y1="282" x2="420" y2="282" stroke-dasharray="6 3" stroke-width="1.5"/>
      </g>
    </svg>
  </div>

  <p>下面逐层展开说明。</p>

  <!-- ====== Node ====== -->
  <h3 id="node">Node（设备节点）</h3>
  <p>
    Node 就是网络中的一个<strong>物理设备</strong>。一个门锁是一个 Node，一个灯泡也是一个 Node。
  </p>
  <p>
    类比：<strong>一栋智能大楼</strong>。大楼本身就是一个 Node，里面有不同的房间，每个房间装了不同的设备系统。
  </p>
  <div class="callout callout-info">
    <div class="callout-title">门锁示例</div>
    <p>一把 Matter 门锁就是一个 Node。它通过 WiFi 或 Thread 网络加入 Matter 网络后，控制端（比如手机 App）就能发现并操作它。</p>
  </div>

  <!-- ====== Endpoint ====== -->
  <h3 id="endpoint">Endpoint（端点）</h3>
  <p>
    一个 Node 上可以有多个 Endpoint，每个 Endpoint 是一个<strong>独立的功能区域</strong>。
  </p>
  <p>
    类比：大楼里的<strong>不同房间</strong>。物业办公室管大楼本身的事务（水电、维修），住户房间才是实际生活的地方。Endpoint 也是这样，不同的端点承担不同的职责。
  </p>
  <p>Matter 规定了两类 Endpoint：</p>

  <!-- Endpoint 示意图 -->
  <div style="margin: 1.5rem 0; overflow-x: auto;">
    <svg viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 520px; display: block; margin: 0 auto;" role="img" aria-label="Endpoint 示意图：Endpoint 0 是管理端点，Endpoint 1 是功能端点，日常开发主要关注 Endpoint 1">
      <g font-family="system-ui, -apple-system, sans-serif">
        <!-- Device header -->
        <rect class="d-device-fill" x="160" y="8" width="200" height="36" rx="8" stroke-width="1.5"/>
        <text class="d-text-device" x="260" y="31" text-anchor="middle" font-size="14" font-weight="600">门锁设备 (Node)</text>

        <!-- Connector to EP0 -->
        <line class="d-tree-line" x1="260" y1="44" x2="260" y2="62" stroke-width="1.5"/>

        <!-- Endpoint 0 card (muted, dashed border) -->
        <rect class="d-ep0-fill" x="30" y="62" width="460" height="86" rx="10" stroke-width="1.5" stroke-dasharray="6 3"/>
        <rect class="d-ep0-tag" x="45" y="74" width="90" height="22" rx="4"/>
        <text class="d-text-ep0" x="90" y="89" text-anchor="middle" font-size="12" font-weight="600">Endpoint 0</text>
        <text class="d-text-ep0" x="148" y="89" font-size="12">管理端点</text>
        <text class="d-text-ep0" x="45" y="112" font-size="12">配网 / 证书 / 诊断 / OTA 升级</text>
        <text class="d-hint-text" x="45" y="134" font-size="11">日常开发中通常不需要关心</text>

        <!-- Connector to EP1 -->
        <line class="d-tree-line" x1="260" y1="148" x2="260" y2="168" stroke-width="1.5"/>

        <!-- Endpoint 1 card (highlighted, solid border) -->
        <rect class="d-ep1-highlight" x="30" y="168" width="460" height="104" rx="10" stroke-width="2"/>
        <rect class="d-ep1-tag" x="45" y="180" width="90" height="22" rx="4"/>
        <text class="d-text-ep1-accent" x="90" y="195" text-anchor="middle" font-size="12" font-weight="600">Endpoint 1</text>
        <text class="d-text-ep1-accent" x="148" y="195" font-size="12" font-weight="600">功能端点</text>
        <!-- "重点" badge -->
        <rect class="d-ep1-tag" x="430" y="180" width="48" height="22" rx="4"/>
        <text class="d-text-ep1-accent" x="454" y="195" text-anchor="middle" font-size="11" font-weight="600">重点</text>

        <text class="d-text-title" x="45" y="222" font-size="12">上锁 / 解锁 / 用户管理 / 电池状态 / 设备标识</text>
        <text class="d-text-sub" x="45" y="242" font-size="12">日常开发主要与这个端点打交道</text>
        <text class="d-text-sub" x="45" y="260" font-size="11">包含 DoorLock、PowerSource、Identify 等 Cluster</text>

        <!-- Dotted connector (indicating "more") -->
        <line class="d-tree-line" x1="260" y1="272" x2="260" y2="294" stroke-width="1.5" stroke-dasharray="4 4"/>

        <!-- Hint about more endpoints -->
        <text class="d-hint-text" x="260" y="312" text-anchor="middle" font-size="12">某些设备可能有更多端点（Endpoint 2、3...）</text>
        <text class="d-hint-text" x="260" y="330" text-anchor="middle" font-size="11">例如多合一传感器的不同功能各占一个端点</text>
      </g>
    </svg>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">实用提示</div>
    <p><strong>Endpoint 0 是每个 Matter 设备都必须有的</strong>，里面放的是设备的"身份证"和"系统设置"。日常工作中主要打交道的是 Endpoint 1（功能端点），门锁的开/关锁、用户管理都在那里。</p>
  </div>

  <!-- ====== Cluster ====== -->
  <h3 id="cluster">Cluster（簇）</h3>
  <p>
    Cluster 是 Matter 数据模型里<strong>最关键的概念</strong>。一个 Cluster 定义了一组相关的能力 —— 包括它有哪些状态（Attribute）和支持哪些操作（Command）。
  </p>
  <p>
    类比：房间里的<strong>一套设备系统</strong>。比如房间里有灯光系统、空调系统、门锁系统，每套系统管一类事情，有自己的状态和操作方式。Cluster 就是这样的一套功能系统。
  </p>
  <p>
    每个 Cluster 都有一个<strong>标准 ID</strong>（十六进制），由 CSA 统一分配：
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster ID</th>
          <th>名称</th>
          <th>是什么</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0101</code></td>
          <td><a href="../clusters/door-lock/">DoorLock</a></td>
          <td>门锁系统 —— 开锁、关锁、管理用户</td>
        </tr>
        <tr>
          <td><code>0x002F</code></td>
          <td><a href="../clusters/power-source/">PowerSource</a></td>
          <td>供电系统 —— 电池电量、充电状态</td>
        </tr>
        <tr>
          <td><code>0x0006</code></td>
          <td><a href="../clusters/on-off/">OnOff</a></td>
          <td>开关系统 —— 开、关、切换</td>
        </tr>
        <tr>
          <td><code>0x0028</code></td>
          <td><a href="../clusters/basic-information/">BasicInformation</a></td>
          <td>铭牌信息 —— 厂商、产品名、固件版本</td>
        </tr>
        <tr>
          <td><code>0x001D</code></td>
          <td><a href="../clusters/descriptor/">Descriptor</a></td>
          <td>目录清单 —— 列出端点里有哪些 Cluster</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">门锁示例</div>
    <p>一把 Matter 门锁的 Endpoint 1 上通常有这些 Cluster：</p>
    <ul>
      <li><a href="../clusters/door-lock/"><strong>DoorLock (0x0101)</strong></a> —— 核心功能：开锁、关锁、管理用户和凭据</li>
      <li><a href="../clusters/power-source/"><strong>PowerSource (0x002F)</strong></a> —— 电池信息：电量、充电状态</li>
      <li><a href="../clusters/identify/"><strong>Identify (0x0003)</strong></a> —— 标识功能：让门锁闪灯或响铃，方便用户找到它</li>
    </ul>
  </div>

  <!-- ====== Attribute & Command ====== -->
  <h3 id="attribute">Attribute（属性）</h3>
  <p>
    Attribute 是 Cluster 里的<strong>状态信息</strong>，每个 Attribute 也有一个 ID。可以理解为设备仪表盘上的一个读数 —— 你可以去看它，有些还可以调整。
  </p>
  <p>
    有些 Attribute 是只读的（比如锁当前的状态），有些可以写入（比如设置自动回锁时间）。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Attribute ID</th>
          <th>所属 Cluster</th>
          <th>名称</th>
          <th>含义</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0</code></td>
          <td>DoorLock</td>
          <td>LockState</td>
          <td>门锁当前状态（锁了没有？）</td>
        </tr>
        <tr>
          <td><code>0x23</code></td>
          <td>DoorLock</td>
          <td>AutoRelockTime</td>
          <td>自动回锁时间（开门后多久自动锁上？）</td>
        </tr>
        <tr>
          <td><code>0xC</code></td>
          <td>PowerSource</td>
          <td>BatPercentRemaining</td>
          <td>电池剩余电量（还剩多少电？）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="command">Command（命令）</h3>
  <p>
    Command 是 Cluster 支持的<strong>操作</strong>，就像遥控器上的按钮 —— 按下去，设备就执行对应的动作。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Command ID</th>
          <th>所属 Cluster</th>
          <th>名称</th>
          <th>含义</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0</code></td>
          <td>DoorLock</td>
          <td>LockDoor</td>
          <td>上锁（按下"锁门"按钮）</td>
        </tr>
        <tr>
          <td><code>0x1</code></td>
          <td>DoorLock</td>
          <td>UnlockDoor</td>
          <td>解锁（按下"开门"按钮）</td>
        </tr>
        <tr>
          <td><code>0x26</code></td>
          <td>DoorLock</td>
          <td>SetUser</td>
          <td>添加/修改用户（录入新住户信息）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 完整示例 ====== -->
  <h2 id="full-example">完整示例：门锁的 Matter 数据结构</h2>
  <p>把上面的概念串起来，一个门锁设备的 Matter 数据结构长这样：</p>

  <pre><code>Node（门锁设备 —— 整栋大楼）
├── Endpoint 0（管理端点 —— 物业办公室）
│   ├── BasicInformation (0x0028)    → 厂商名、产品名、序列号
│   ├── Descriptor (0x001D)          → 列出本端点有哪些 Cluster
│   └── NetworkCommissioning (0x0031)→ WiFi/Thread 网络配置
│
└── Endpoint 1（功能端点 —— 住户房间）
    ├── DoorLock (0x0101)            → 门锁系统
    │   ├── Attribute 0x0: LockState     = 0x01（已锁定）
    │   ├── Attribute 0x23: AutoRelockTime = 30（30秒自动回锁）
    │   ├── Command 0x0: LockDoor         → 上锁
    │   └── Command 0x1: UnlockDoor       → 解锁
    │
    ├── PowerSource (0x002F)         → 供电系统
    │   ├── Attribute 0x0: Status        = 1（Active）
    │   └── Attribute 0xC: BatPercent    = 180（实际 90%）
    │
    └── Identify (0x0003)            → 定位系统
        └── Command 0x0: Identify        → 闪灯/响铃</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">读法</div>
    <p>当有人说 "Endpoint 1 / Cluster 0x0101 / Attribute 0x0 的值是 0x01"，翻译成人话就是：<strong>功能端点上的门锁模块，当前锁状态是"已锁定"</strong>。</p>
  </div>

  <!-- ====== 其他概念 ====== -->
  <h2 id="device-type">Device Type（设备类型）</h2>
  <p>
    Device Type 规定了一种设备<strong>必须支持哪些 Cluster</strong>。它就像一份资质清单。
  </p>
  <p>
    比如 "DoorLock" 这个 Device Type 要求设备至少实现 DoorLock Cluster、Identify Cluster 等。
    "Dimmable Light" 则要求实现 OnOff Cluster 和 LevelControl Cluster。
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/device-type-zh.webp" alt="Device Type 示意：门锁类型必须实现 DoorLock 和 Identify Cluster；可调光灯类型必须实现 OnOff、LevelControl、Identify 和 Groups Cluster" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>两个 Device Type 各自要求的 Cluster 清单</figcaption>
  </figure>
  <p>
    类比：就像酒店要被评为"五星级"，就必须有健身房、泳池、24 小时前台等设施。设备要声称自己是"门锁"类型，就必须具备 Matter 规定的那些能力。
  </p>

  <p>
    每种设备类型都有一个编号，例如门锁是 <code>0x000A</code>、可调光灯是 <code>0x0101</code>、每台设备都有的根节点是 <code>0x0016</code>。
    设备在每个端点的 <a href="../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a> 里声明自己是什么类型，一个端点可以同时声明多个（比如“门锁 + 电源”）。
    全部编号见 <a href="../tools/id-lookup/#device-types">Matter ID 查询 · 设备类型速查</a>。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">设备类型只说明“至少有什么”</div>
    <p>
      同样声明为门锁 <code>0x000A</code>，一把支持指纹和用户管理，另一把只支持密码，这完全合规。设备类型只规定必须有的部分，
      可选能力要看每个 Cluster 的 <code>FeatureMap</code>、<code>AttributeList</code>、<code>AcceptedCommandList</code>，见下文
      <a href="#device-discovery">配网后怎么读出设备能力</a>。
    </p>
  </div>

  <h2 id="fabric">Fabric（信任域）</h2>
  <p>
    Fabric 是 Matter 网络中的<strong>信任域</strong>。同一个 Fabric 里的设备互相信任，可以直接通信和控制。
  </p>
  <p>
    类比：<strong>公司内网</strong>。你的电脑连上公司 VPN 就在一个信任域里，可以访问内部服务。不在 VPN 里的人访问不了。
  </p>
  <p>
    一个设备可以同时加入多个 Fabric。比如一个门锁可以同时被 Apple Home 和 Google Home 控制 —— 它在两个 Fabric 里各有一个身份。
  </p>
  <figure class="diagram">
    <img src="/images/diagrams/fabric-zh.webp" alt="Fabric 示意：一把智能门锁同时处于 Apple Home Fabric 和 Google Home Fabric 中，在每个 Fabric 里持有独立的证书" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>同一把门锁同时加入两个 Fabric，各持一份独立证书</figcaption>
  </figure>

  <h2 id="commissioning">Commissioner 与配网</h2>
  <p>
    把设备加入 Fabric 的过程叫做 <strong>Commissioning（配网）</strong>。执行这个操作的设备叫 <strong>Commissioner</strong>。
  </p>
  <p>
    配网流程简单来说：
  </p>
  <ol>
    <li>Commissioner（通常是手机 App）扫描设备的二维码或输入配对码</li>
    <li>通过蓝牙 BLE 发现设备（设备还没进网络，只能靠蓝牙沟通）</li>
    <li>通过 PASE（Passcode-Authenticated Session Establishment）建立安全会话</li>
    <li>Commissioner 给设备分配证书（NOC），设备正式加入 Fabric</li>
    <li>把 Wi-Fi 或 Thread 的网络凭据发给设备，让它接入家庭网络</li>
    <li>配网完成后，手机 App 或智能音箱作为 <strong>Controller</strong> 就可以读取 Attribute、发送 Command 来控制设备了</li>
  </ol>
  <figure class="diagram">
    <img src="/images/diagrams/commissioning-zh.webp" alt="Matter 配网流程六步：扫描二维码、蓝牙发现设备、PASE 建立安全会话、颁发证书 NOC 加入 Fabric、配置 Wi-Fi/Thread 网络、配网完成由 Controller 控制" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>配网的六个步骤：前半段靠蓝牙和配对码建立信任，后半段把设备接进家庭网络</figcaption>
  </figure>

  <div class="callout callout-info">
    <div class="callout-title">角色说明</div>
    <p><strong>Commissioner</strong> 是配网时的角色（负责把设备拉进来），<strong>Controller</strong> 是日常控制的角色。手机 App 通常同时扮演这两个角色。</p>
  </div>

  <!-- ====== 设备能力发现 ====== -->
  <h2 id="device-discovery">配网后：怎么知道设备是什么、能做什么</h2>
  <p>
    配网只是把设备拉进网络。接下来 App 要回答两个问题：<strong>这是什么设备？它支持哪些功能？</strong>
    Matter 没有单独的“设备说明书”文件，答案就在几个<strong>标准字段</strong>里。每台设备都必须提供这些字段，任何 Controller 都能读。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>想知道</th>
          <th>读哪个字段</th>
          <th>在哪里（Cluster / 属性）</th>
          <th>门锁的例子</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>设备有哪些端点</td><td><a href="../clusters/descriptor/#attr-0x03">Descriptor.PartsList</a></td><td>端点 0 · <code>0x001D</code> / <code>0x0003</code></td><td><code>[1]</code></td></tr>
        <tr><td>每个端点是什么设备</td><td><a href="../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a></td><td>每个端点 · <code>0x001D</code> / <code>0x0000</code></td><td><code>0x000A</code> 门锁 + <code>0x0011</code> 电源</td></tr>
        <tr><td>每个端点有哪些功能模块</td><td><a href="../clusters/descriptor/#attr-0x01">Descriptor.ServerList</a></td><td>每个端点 · <code>0x001D</code> / <code>0x0001</code></td><td><code>0x0003</code> <code>0x001D</code> <code>0x002F</code> <code>0x0101</code></td></tr>
        <tr><td>某个模块开了哪些可选功能</td><td>FeatureMap（全局属性）</td><td>每个 Cluster · <code>0xFFFC</code></td><td><code>389</code> = 密码 + 指纹 + 远程密码 + 用户管理</td></tr>
        <tr><td>能对它发哪些命令</td><td>AcceptedCommandList（全局属性）</td><td>每个 Cluster · <code>0xFFF9</code></td><td>LockDoor、UnlockDoor、SetUser…</td></tr>
        <tr><td>实现了哪些属性</td><td>AttributeList（全局属性）</td><td>每个 Cluster · <code>0xFFFB</code></td><td>LockState、AutoRelockTime…</td></tr>
        <tr><td>厂商、型号、版本、序列号</td><td><a href="../clusters/basic-information/">BasicInformation</a></td><td>端点 0 · <code>0x0028</code></td><td>VendorName、ProductName、SoftwareVersionString</td></tr>
      </tbody>
    </table>
  </div>

  <p>Controller 的标准读取顺序：</p>
  <ol>
    <li>读<strong>端点 0</strong> 的 PartsList，拿到所有端点编号</li>
    <li>逐个端点读 <strong>DeviceTypeList</strong>，知道每个端点“是什么”</li>
    <li>逐个端点读 <strong>ServerList</strong>，知道每个端点“有哪些 Cluster”</li>
    <li>逐个 Cluster 读 <strong>FeatureMap / AcceptedCommandList / AttributeList</strong>，知道具体“能做什么”</li>
    <li>读<strong>端点 0</strong> 的 BasicInformation，拿到厂商、型号、固件版本</li>
  </ol>

  <h3 id="raw-capabilities">能不能直接拿到设备的原始功能集？</h3>
  <p>
    能。Matter 支持<strong>通配读取（Wildcard Read）</strong>：端点、Cluster、属性都填“全部”，一次把设备上所有属性读回来，上表里的字段全在里面。
    这就是一台设备最原始、最完整的能力描述，各家 App 显示的设备信息都是从这里解读出来的。
  </p>
  <ul>
    <li><strong>chip-tool</strong>（官方命令行工具）：<code>chip-tool any read-by-id 0xFFFFFFFF 0xFFFFFFFF &lt;节点ID&gt; 0xFFFF</code>，三个 F 分别代表全部 Cluster、全部属性、全部端点</li>
    <li><strong>只读某一项</strong>：<code>chip-tool descriptor read device-type-list &lt;节点ID&gt; 1</code> 读端点 1 的设备类型</li>
    <li><strong>各平台 SDK</strong>：Android、iOS、Web 都有对应接口，见 <a href="../sdk/android/#device-discovery">SDK 指南 · 读取设备类型与能力</a></li>
    <li><strong>Home Assistant</strong>：设备页面 → 下载诊断数据，其中 <code>attributes</code> 就是通配读取的结果，键名是 <code>端点/Cluster/属性</code>（十进制）</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-title">动手试试</div>
    <p>
      打开 <a href="../tools/json-parser/">JSON 解析器</a>，点“设备原始数据”示例再点解析。它会把一台门锁的通配读取结果整理成设备画像，
      并在每一项旁边标出它来自哪个字段。遇到不认识的 ID，用 <a href="../tools/id-lookup/">Matter ID 查询</a> 查。
    </p>
  </div>

  <!-- ====== ID 规范 ====== -->
  <h2 id="id-conventions">ID 编号规范</h2>
  <p>
    Matter 中几乎所有东西都用<strong>十六进制 ID</strong> 标识。了解编号范围有助于你快速判断一个 ID 的含义。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Cluster ID 其实是 4 个字节</div>
    <p>
      规范里 Cluster、属性、命令、事件、设备类型的 ID 都是 <strong>32 位</strong>：前 16 位是<strong>厂商前缀</strong>，后 16 位是<strong>编号</strong>。
      标准定义的前缀都是 <code>0x0000</code>，平时省略不写，所以门锁 Cluster 完整写法是 <code>0x0000_0101</code>，简写成 <code>0x0101</code>。
      厂商私有扩展必须带上自己的厂商 ID，例如 <code>0x1234_FC00</code>。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>类型</th>
          <th>编号范围（后 16 位）</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>标准 Cluster</td>
          <td><code>0x0000</code> ~ <code>0x7FFF</code></td>
          <td>CSA 官方定义，前缀固定为 <code>0x0000</code></td>
        </tr>
        <tr>
          <td>厂商自定义 Cluster</td>
          <td><code>0xFC00</code> ~ <code>0xFFFE</code></td>
          <td>前缀必须是厂商 ID，完整写法如 <code>0x1234_FC00</code></td>
        </tr>
        <tr>
          <td>标准 Attribute</td>
          <td><code>0x0000</code> ~ <code>0x4FFF</code></td>
          <td>Cluster 内的标准属性</td>
        </tr>
        <tr>
          <td>全局 Attribute</td>
          <td><code>0xF000</code> ~ <code>0xFFFE</code></td>
          <td>每个 Cluster 都有：FeatureMap <code>0xFFFC</code>、AttributeList <code>0xFFFB</code>、AcceptedCommandList <code>0xFFF9</code>、ClusterRevision <code>0xFFFD</code> 等</td>
        </tr>
        <tr>
          <td>标准 Command</td>
          <td><code>0x00</code> ~ <code>0xFF</code></td>
          <td>Cluster 内的标准命令</td>
        </tr>
        <tr>
          <td>标准 Device Type</td>
          <td><code>0x0000</code> ~ <code>0xBFFF</code></td>
          <td>设备类型，如 <code>0x000A</code> 门锁、<code>0x0016</code> 根节点</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    拿到一个不认识的 ID？用 <a href="../tools/id-lookup/">Matter ID 查询</a> 直接查，十六进制、十进制都能认。
    注意同一个数字在不同字段里含义不同：<code>0x0101</code> 作为 Cluster 是门锁，作为设备类型却是可调光灯。
  </p>

  <h3 id="common-cluster-ids">常见 Cluster ID 速查</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cluster</th>
          <th>用途</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>0x001D</code></td><td><a href="../clusters/descriptor/">Descriptor</a></td><td>描述端点包含的 Cluster 列表</td></tr>
        <tr><td><code>0x0028</code></td><td><a href="../clusters/basic-information/">BasicInformation</a></td><td>设备基本信息（厂商、产品名、固件版本）</td></tr>
        <tr><td><code>0x002F</code></td><td><a href="../clusters/power-source/">PowerSource</a></td><td>电源/电池状态</td></tr>
        <tr><td><code>0x0031</code></td><td><a href="../clusters/network-commissioning/">NetworkCommissioning</a></td><td>网络配置（WiFi/Thread）</td></tr>
        <tr><td><code>0x0003</code></td><td><a href="../clusters/identify/">Identify</a></td><td>设备标识（闪灯/响铃）</td></tr>
        <tr><td><code>0x0006</code></td><td><a href="../clusters/on-off/">OnOff</a></td><td>开关控制</td></tr>
        <tr><td><code>0x0008</code></td><td><a href="../clusters/level-control/">LevelControl</a></td><td>亮度/级别控制</td></tr>
        <tr><td><code>0x0101</code></td><td><a href="../clusters/door-lock/">DoorLock</a></td><td>门锁控制</td></tr>
        <tr><td><code>0x0300</code></td><td><a href="../clusters/color-control/">ColorControl</a></td><td>颜色控制（色温、HSV）</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">在哪查标准定义</div>
    <p>Matter 完整规范由 CSA 发布，成员可在 <strong>csa-iot.org</strong> 下载。开源实现在 <a href="https://github.com/project-chip/connectedhomeip">connectedhomeip</a> 仓库，其中 <code>src/app/zap-templates/zcl/data-model/chip/*.xml</code> 包含所有标准 Cluster 定义。</p>
  </div>
`,
} as const;
