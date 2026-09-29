/**
 * 网关 / 控制器 / 边界路由器 / 桥接器 专题页 — 中文
 * 正文里的链接都相对于 /zh/hub-bridge-border-router/ 页面。
 */
export default {
  title: 'Matter 要不要网关：控制器、边界路由器、桥接器一次讲清',
  description:
    'Matter 设备要不要网关？讲清控制器、Thread 边界路由器、桥接器和平台“中枢”分别干什么，Wi-Fi 和 Thread 设备各需要什么，苹果、谷歌、Home Assistant 用户家里该准备哪几样，以及它们在设备数据里长什么样。',
  prev: { title: 'Thread 还是 Wi-Fi', path: '/thread-vs-wifi/' },
  next: { title: '协议对比', path: '/compare/' },
  content: `
  <h1>Matter 要不要网关？控制器、边界路由器、桥接器一次讲清</h1>

  <div class="callout callout-info">
    <div class="callout-title">先看结论</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>“网关”是个大筐：在 Matter 里它可能指三种完全不同的角色 —— <strong>控制器</strong>、<strong>Thread 边界路由器</strong>、<strong>桥接器</strong>。很多产品一台身兼几职，所以特别容易混。</li>
      <li>按协议算：Wi-Fi 设备连上家里的路由器就能被控制；Thread 设备需要一台边界路由器；Zigbee 等老设备想进 Matter，需要一台桥接器。</li>
      <li>按实际使用算：苹果、谷歌、亚马逊的 App 一般要求家里有一台它们自家的<strong>中枢</strong>（音箱、显示屏或电视盒子），用来跑自动化和远程控制，这台中枢往往同时就是边界路由器。</li>
    </ul>
  </div>

  <p>
    “Matter 设备要不要网关”几乎是每个新手都会问的问题，难就难在“网关”这个词被用来指好几样东西。这一页先用一张表把几个角色分开，再逐个讲清它们干什么、什么时候需要、在设备数据里长什么样，最后告诉你家里到底要准备什么。
  </p>

  <figure class="diagram">
    <img src="/images/diagrams/hub-roles-zh.webp" alt="家庭 Matter 网络里的几种角色：手机 App 作为控制器连到家里的路由器；智能音箱作为中枢，既是控制器也是边界路由器，通过 Thread 连着门锁和传感器；桥接器连到路由器，通过 Zigbee 连着 Zigbee 灯泡，把老设备翻译成 Matter；Wi-Fi 插座直接连路由器，不需要网关" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>控制器负责发命令，边界路由器把 Thread 网接进家里的网络，桥接器把 Zigbee 老设备翻译成 Matter 设备</figcaption>
  </figure>

  <!-- ====== 总表 ====== -->
  <h2 id="roles">一张表看懂</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>角色</th><th>干什么</th><th>懂 Matter 吗</th><th>什么时候需要</th><th>常见例子</th></tr>
      </thead>
      <tbody>
        <tr><td>控制器<br/>Controller</td><td>发命令、读状态、跑自动化</td><td>懂</td><td>一直需要，手机 App 就是一个</td><td>手机 App、HomePod、Apple TV、Nest Hub、Echo、Home Assistant</td></tr>
        <tr><td>边界路由器<br/>Border Router</td><td>把 Thread 网接进家里的 Wi-Fi / 网线网络</td><td>不需要懂，只转发数据</td><td>家里有 Thread 设备时</td><td>HomePod mini、部分 Apple TV 4K、Nest Hub（第 2 代）、部分 Echo</td></tr>
        <tr><td>桥接器<br/>Bridge</td><td>把 Zigbee、Z-Wave 等老设备翻译成 Matter 设备</td><td>懂，而且两边都懂</td><td>想把老设备接进 Matter 时</td><td>飞利浦 Hue 桥、Aqara M2 / M3、宜家 DIRIGERA</td></tr>
        <tr><td>中枢<br/>Hub</td><td>平台的叫法，通常是一台常开的控制器，多半兼做边界路由器</td><td>懂</td><td>用苹果、谷歌、亚马逊的 App 时一般都要</td><td>HomePod、Apple TV、Nest Hub、Echo</td></tr>
        <tr><td>家里的路由器</td><td>普通上网，Wi-Fi 设备和手机都连它</td><td>不需要懂</td><td>一直需要，但不必“支持 Matter”</td><td>任意 Wi-Fi 路由器</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 控制器 ====== -->
  <h2 id="controller">控制器：发号施令的一方</h2>
  <p>
    控制器（Controller）是给设备发命令、读设备状态的那一方。你在手机 App 里点“开灯”，这个 App 就是控制器；智能音箱按时关灯、Home Assistant 跑自动化，它们也是控制器。
  </p>
  <ul>
    <li><strong>配网的和控制的可以不是同一个</strong>：把设备拉进家庭的角色叫 Commissioner（配网方），通常是手机 App；拉进来以后日常控制设备的叫 Controller。手机 App 一般两个都当，见 <a href="../concepts/#commissioning">概念总览 · Commissioner 与配网</a>。</li>
    <li><strong>一台设备可以同时被好几个控制器管</strong>：苹果家庭、谷歌家庭、Home Assistant 各自是一个 <a href="../concepts/#fabric">Fabric</a>，Matter 要求设备至少能同时加入 5 个。把设备分享给第二个平台时，第一个平台会给设备临时打开一个配网窗口，见 <a href="../clusters/administrator-commissioning/">AdministratorCommissioning</a>。</li>
    <li><strong>为什么光有手机不够</strong>：手机会出门、会锁屏，没法 24 小时跑自动化，也没法当远程控制的入口。所以各平台会让一台常开的设备（音箱、显示屏、电视盒子）来当控制器，这就是平台说的“中枢”。</li>
  </ul>
  <p>
    在设备数据里：<a href="../clusters/operational-credentials/">OperationalCredentials</a> Cluster 的 <code>Fabrics</code> 属性列出这台设备加入了哪些平台（带厂商 ID 和名称标签），<code>SupportedFabrics</code> 说明它最多能加入几个；<a href="../clusters/access-control/">AccessControl</a> Cluster 记录每个平台有什么权限。
  </p>

  <!-- ====== 边界路由器 ====== -->
  <h2 id="border-router">边界路由器：只转发，不翻译</h2>
  <p>
    Thread 设备在自己的一张网里，手机和 Wi-Fi 设备在家里的另一张网里。<strong>Thread 边界路由器</strong>（Thread Border Router）横跨两张网，负责在它们之间转发数据。
  </p>
  <ul>
    <li><strong>只有 Thread 设备需要它</strong>：没有边界路由器，Thread 设备配不了网，也没法被控制；家里全是 Wi-Fi 设备就用不上它。</li>
    <li><strong>它不懂 Matter，也不需要懂</strong>：Thread 设备自己就说 Matter，边界路由器只是把 IP 数据包从一张网搬到另一张网。这是它和桥接器最根本的区别。</li>
    <li><strong>通常内置在中枢里</strong>：HomePod mini、部分 Apple TV 4K、Google Nest Hub（第 2 代）、部分 Amazon Echo，以及一些路由器和多功能网关都带这个功能。</li>
    <li><strong>可以有多台</strong>：几台边界路由器能服务同一张 Thread 网，互为备份。Thread 1.4 进一步要求不同品牌的边界路由器能加入同一张网、共享网络凭证，Matter 1.4 开始集成 Thread 1.4。</li>
  </ul>
  <p>
    在设备数据里：边界路由器工作在网络层，本身不一定是一台 Matter 设备。想看一台 Thread 设备连在哪张网、邻居是谁，读它的
    <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a> Cluster。Thread 和 Wi-Fi 的完整对比见 <a href="../thread-vs-wifi/">Thread 还是 Wi-Fi</a>。
  </p>

  <!-- ====== 桥接器 ====== -->
  <h2 id="bridge">桥接器：给老设备当翻译</h2>
  <p>
    Zigbee、Z-Wave、蓝牙和各家私有协议的设备不说 Matter。<strong>桥接器</strong>（Matter Bridge）两边都懂：一边用原来的协议控制这些老设备，一边把每个老设备“扮演”成一台 Matter 设备，苹果、谷歌、亚马逊的 App 就能直接控制它们。
  </p>
  <p>在 Matter 的数据里，桥接器长这样：</p>
  <ul>
    <li>桥接器本身是一个节点，根端点之外有一个<strong>聚合器</strong>端点（设备类型 <code>0x000E</code>）</li>
    <li>每个老设备变成一个<strong>被桥接节点</strong>端点（设备类型 <code>0x0013</code>），同时带上它本来的类型，比如“被桥接节点 + 可调光灯”</li>
    <li>老设备的名称、是否在线放在 <a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a> Cluster 里</li>
    <li>桥接器下面挂了哪些设备，读根端点上 <a href="../clusters/descriptor/">Descriptor</a> Cluster 的 <code>PartsList</code></li>
  </ul>
  <p>
    飞利浦 Hue 桥、Aqara M2 / M3、宜家 DIRIGERA 都是这样把自家的 Zigbee 设备接进 Matter 的。要注意，桥接只能“翻译”桥接器支持的那部分功能，老设备的一些特色功能在 Matter 里可能用不了。把桥接器的设备数据粘进 <a href="../tools/json-parser/">JSON 解析器</a>，能直接看到每个端点的类型。
  </p>

  <!-- ====== 中枢与网关 ====== -->
  <h2 id="hub">“中枢”和“网关”到底指什么</h2>
  <p>
    这两个词是产品和平台的叫法，不是 Matter 规范里的角色。看到“XX 是 Matter 网关 / 中枢”，要拆开看它具体承担了哪几样：
  </p>
  <ul>
    <li><strong>苹果的家居中枢</strong>（HomePod、Apple TV）：控制器，负责自动化和远程访问；HomePod mini 等部分型号同时是边界路由器。</li>
    <li><strong>谷歌、亚马逊的中枢</strong>（Nest Hub、Nest 音箱、Echo 等）：控制器；部分型号同时是边界路由器。</li>
    <li><strong>Home Assistant</strong>：控制器；插上 Thread 无线模块后也能当边界路由器。</li>
    <li><strong>多功能网关</strong>（比如 Aqara M3）：控制器、边界路由器、桥接器三样都干。</li>
    <li><strong>飞利浦 Hue 桥</strong>：在 Matter 里的角色是桥接器，把 Hue 的 Zigbee 灯接进 Matter。</li>
  </ul>
  <div class="callout callout-warning">
    <div class="callout-title">买之前看清楚</div>
    <p>
      商品页写着“支持 Matter”的网关，可能只是桥接器（只能把自家老设备接进 Matter），也可能是控制器（能控制别家的 Matter 设备），或者是边界路由器（能让 Thread 设备联网）。按你缺的那一样去对参数，别只看“Matter 网关”几个字。
    </p>
  </div>

  <!-- ====== 需要什么 ====== -->
  <h2 id="what-you-need">我家到底需要什么</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>你的情况</th><th>需要准备</th></tr>
      </thead>
      <tbody>
        <tr><td>只有 Wi-Fi Matter 设备，用 Home Assistant</td><td>不用额外买设备，Home Assistant 本身就是控制器</td></tr>
        <tr><td>只有 Wi-Fi Matter 设备，用苹果 / 谷歌 / 亚马逊</td><td>一台对应平台的中枢（音箱、显示屏或电视盒子）</td></tr>
        <tr><td>有 Thread 设备</td><td>至少一台 Thread 边界路由器。上面那台中枢多半已经内置，买前确认具体型号</td></tr>
        <tr><td>有 Zigbee / Z-Wave 老设备想接进来</td><td>一台支持 Matter 桥接的网关，很多老网关升级固件后就支持，比如 Hue 桥、Aqara M2</td></tr>
        <tr><td>想同时用两个平台</td><td>不用多买设备：在第一个平台里打开设备的配对模式（或“分享到其他平台”），拿到新的配对码，到第二个平台里添加</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 路由器 ====== -->
  <h2 id="router">家里的路由器要换成“Matter 路由器”吗</h2>
  <p>
    不用。Matter 设备把家里的路由器当普通网络用，路由器本身不需要“支持 Matter”。需要注意的只有两点：
  </p>
  <ul>
    <li><strong>别把设备和手机隔开</strong>：不要把设备放进访客网络，不要开“AP 隔离”。Matter 在局域网里靠 IPv6 和组播发现设备，被隔开就会出现配网卡在最后一步，或者配完显示“无响应”。</li>
    <li><strong>设备多时看路由器能力</strong>：几十台 Wi-Fi 设备同时在线，入门级路由器可能吃力，可以把一部分插电设备换成 Thread 版。</li>
  </ul>
  <p>
    市面上说的“Matter 路由器”，一般是指<strong>内置了 Thread 边界路由器</strong>的路由器。Matter 1.4 专门为这类产品定义了“家用路由器与接入点”（HRAP）设备类型，见 <a href="../roadmap/">版本路线</a>。
  </p>

  <!-- ====== 延伸阅读 ====== -->
  <h2 id="related">延伸阅读</h2>
  <ul>
    <li><a href="../thread-vs-wifi/">Thread 还是 Wi-Fi：Matter 设备怎么选</a></li>
    <li><a href="../compare/#bridges">协议对比 · 它们怎么和 Matter 共存</a></li>
    <li><a href="../concepts/#fabric">概念总览 · Fabric（信任域）</a></li>
    <li>相关 Cluster：<a href="../clusters/operational-credentials/">OperationalCredentials</a>、<a href="../clusters/access-control/">AccessControl</a>、<a href="../clusters/administrator-commissioning/">AdministratorCommissioning</a>、<a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a>、<a href="../clusters/descriptor/">Descriptor</a>、<a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a></li>
    <li><a href="../faq/">常见问题</a></li>
  </ul>
`,
} as const;
