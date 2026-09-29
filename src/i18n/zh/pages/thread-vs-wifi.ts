/**
 * Thread 还是 Wi-Fi 专题页 — 中文
 * 正文里的链接都相对于 /zh/thread-vs-wifi/ 页面。
 */
export default {
  title: 'Matter over Thread 还是 Wi-Fi：区别、原理与怎么选',
  description:
    'Matter 设备选 Thread 还是 Wi-Fi？讲清两者在 Matter 里的位置，对比功耗、组网方式、速度和对边界路由器的依赖，解释 Thread 网络里各角色的分工，并按门锁、传感器、灯、插座、摄像头给出选择建议。',
  prev: { title: '概念总览', path: '/concepts/' },
  next: { title: '要不要网关：控制器、边界路由器、桥接器', path: '/hub-bridge-border-router/' },
  content: `
  <h1>Thread 还是 Wi-Fi：Matter 设备怎么选</h1>

  <div class="callout callout-info">
    <div class="callout-title">先看结论</div>
    <ul style="margin:0; padding-left:1.25rem;">
      <li>Matter 管的是“说什么”，Thread 和 Wi-Fi 管的是“走哪条路”。同一款设备不管走哪条路，控制方式和数据都完全一样。</li>
      <li><strong>电池设备</strong>（门锁、传感器、无线按键）基本都选 Thread：省电，一次换电能用很久。</li>
      <li><strong>大流量设备</strong>（摄像头、门铃、电视、大家电）选 Wi-Fi 或网线。</li>
      <li><strong>插电的小设备</strong>（灯、插座、开关）两种都常见：Wi-Fi 版连上路由器就能用；Thread 版要求家里有边界路由器，但每台都能帮别的设备转发，插电设备越多网络越稳。</li>
    </ul>
  </div>

  <p>
    买 Matter 设备或者做 Matter 产品时，绕不开的一个问题是：选 Thread 版还是 Wi-Fi 版？这一页先讲清两者在 Matter 里的位置，再逐项对比，最后按设备类型给出建议。
  </p>

  <figure class="diagram">
    <img src="/images/diagrams/thread-wifi-zh.webp" alt="Wi-Fi 与 Thread 组网对比：左边 Wi-Fi 是星形，摄像头、插座、灯泡都直连 Wi-Fi 路由器；右边 Thread 是网状，边界路由器连着灯泡和插座两台插电设备，它们之间互相转发，门锁和传感器两台电池设备挂在附近的插电设备上；边界路由器再连到 Wi-Fi 路由器，接入家庭网络" width="1536" height="1024" loading="lazy" decoding="async" />
    <figcaption>Wi-Fi 是星形，所有设备都连路由器；Thread 是网状，插电设备互相转发，再经边界路由器接入家里的网络</figcaption>
  </figure>

  <!-- ====== 位置 ====== -->
  <h2 id="where">Thread 和 Wi-Fi 在 Matter 里的位置</h2>
  <p>
    Matter 本身只规定上面几层：设备有哪些能力（Cluster）、怎么读状态、怎么发命令、怎么加密。数据实际怎么送出去，交给下面现成的网络 —— Wi-Fi、Thread 或以太网；蓝牙只在配网时临时用一下。
  </p>
  <p>
    打个比方：Matter 是大家约好的“普通话”，Wi-Fi 和 Thread 是两种路。Wi-Fi 像城市主干道，路宽车快，但每辆车都得开到同一个路口（路由器）；Thread 像小区里的步行道，走得慢、很省力，而且邻居之间可以互相捎话。不管走哪条路，说的都是同一种话，所以苹果、谷歌、亚马逊的 App 控制它们的方式完全一样。
  </p>
  <p>
    更关键的是，Thread 和 Wi-Fi 都跑 IP（IPv6）。手机在 Wi-Fi 上发出的命令，经过边界路由器就能直接送到 Thread 设备，中间不需要任何“翻译”。各协议分别管哪几层，见 <a href="../compare/#layers">协议对比 · 七层模型定位</a>。
  </p>

  <!-- ====== 对比 ====== -->
  <h2 id="differences">核心区别一览</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>对比项</th><th>Wi-Fi</th><th>Thread</th></tr>
      </thead>
      <tbody>
        <tr><td><strong>无线电</strong></td><td>2.4 GHz / 5 GHz，很多智能设备只支持 2.4 GHz</td><td>2.4 GHz，IEEE 802.15.4（和 Zigbee 同一种无线电）</td></tr>
        <tr><td><strong>速度</strong></td><td>几十到几百 Mbps，能传视频</td><td>250 kbps，只够传命令和传感器数据</td></tr>
        <tr><td><strong>网络形状</strong></td><td>星形：每台设备直连路由器</td><td>网状：插电设备互相转发，某台掉线会自动绕路</td></tr>
        <tr><td><strong>功耗</strong></td><td>高，基本都要插电</td><td>低，电池设备大部分时间可以休眠</td></tr>
        <tr><td><strong>还要买什么</strong></td><td>不用，家里的路由器就行</td><td>至少一台 Thread 边界路由器（很多音箱、电视盒子已内置）</td></tr>
        <tr><td><strong>设备多了会怎样</strong></td><td>全挤在路由器上，入门级路由器可能吃力</td><td>插电设备越多，覆盖越广、越稳</td></tr>
        <tr><td><strong>典型设备</strong></td><td>摄像头、门铃、电视、大家电，以及很多灯和插座</td><td>门锁、传感器、按键、温控阀，以及很多灯和插座</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Thread 角色 ====== -->
  <h2 id="thread-roles">Thread 网络里都有谁</h2>
  <p>
    Wi-Fi 的结构大家都熟：一个路由器，所有设备连它。Thread 是一张“网”，网里的设备按供电方式自动分工：
  </p>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>角色</th><th>通常是谁</th><th>干什么</th></tr>
      </thead>
      <tbody>
        <tr><td>路由器<br/>Router</td><td>插电设备：灯、插座、开关</td><td>帮别的设备转发数据，是这张网的骨架</td></tr>
        <tr><td>领导者<br/>Leader</td><td>自动从路由器里选出一台</td><td>管理整张网（分配路由编号、同步网络信息）；它离线了，其他路由器会自动再选一台</td></tr>
        <tr><td>路由器候选<br/>REED</td><td>插电设备</td><td>平时只当终端，网络需要更多路由器时自动升级</td></tr>
        <tr><td>终端设备<br/>End Device</td><td>插电但不转发的设备</td><td>一直在线，只收发自己的数据</td></tr>
        <tr><td>嗜睡终端<br/>Sleepy End Device</td><td>电池设备：门锁、传感器、按键</td><td>大部分时间在睡觉，定时醒来收消息，最省电</td></tr>
        <tr><td>边界路由器<br/>Border Router</td><td>HomePod mini、部分 Apple TV 4K、Google Nest Hub（第 2 代）等</td><td>把 Thread 网接到家里的 Wi-Fi / 网线网络，是 Thread 设备通往外面的出口</td></tr>
      </tbody>
    </table>
  </div>
  <p>
    这张网会自己修复：某台插电设备被拔掉，数据会自动改走别的路由器。常说“Thread 设备越多越稳”，准确地说是<strong>插电的 Thread 设备</strong>越多越稳 —— 电池设备自己不转发，加再多也不会让网变大。
  </p>
  <p>
    想看一台 Thread 设备当前的角色，读 <a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a> Cluster 的
    <code>RoutingRole</code> 属性；邻居表、信道、网络名也都在这个 Cluster 里。
  </p>

  <!-- ====== 边界路由器 ====== -->
  <h2 id="border-router">边界路由器：Thread 设备的出口</h2>
  <p>
    Thread 网和家里的 Wi-Fi 网是两张网，手机本身不会 Thread，全靠边界路由器在两张网之间转发。家里没有边界路由器，手机既加不了 Thread 设备，也控制不了它们。
  </p>
  <ul>
    <li><strong>很多设备已经内置</strong>：HomePod mini、部分 Apple TV 4K、Google Nest Hub（第 2 代）、部分 Amazon Echo，以及一些路由器和网关。买之前看参数里有没有“Thread 边界路由器（Thread Border Router）”。</li>
    <li><strong>它只转发，不翻译</strong>：Thread 设备自己就说 Matter，边界路由器只是把数据包从一张网搬到另一张网。这点和 Zigbee 网关不同，Zigbee 网关要把 Zigbee 命令翻译成别的协议。</li>
    <li><strong>可以有多台</strong>：几台边界路由器可以服务同一张 Thread 网，一台离线，其他的顶上。</li>
    <li><strong>跨品牌共享在改善</strong>：早期不同品牌的边界路由器容易各建一张 Thread 网，设备被分散在几张网里。Thread 1.4 要求边界路由器能加入已有的网络、跨平台共享网络凭证，Matter 1.4 开始集成 Thread 1.4，见 <a href="../roadmap/">版本路线</a>。</li>
  </ul>
  <p>
    边界路由器、控制器、桥接器、“网关”这几个词经常混着用，它们到底有什么区别、你家需要哪几样，见
    <a href="../hub-bridge-border-router/">要不要网关：控制器、边界路由器、桥接器一次讲清</a>。
  </p>

  <!-- ====== 功耗 ====== -->
  <h2 id="battery">为什么电池设备几乎都选 Thread</h2>
  <p>
    Wi-Fi 为了跑得快，射频要一直开着、还要和路由器保持连接，耗电大，所以 Wi-Fi 设备基本都插电。少数电池 Wi-Fi 设备（比如电池摄像头）要么电池很大，要么需要经常充电。
  </p>
  <p>
    Thread 的嗜睡终端大部分时间把射频关掉，定时醒来问一句“有没有我的消息”，处理完马上接着睡。门窗传感器、温湿度计、无线按键靠一两节电池就能用很久。
  </p>
  <p>
    代价是响应会慢一点：命令要等设备醒来才能送到。Matter 用 <a href="../clusters/icd-management/">ICD Management</a> Cluster
    管理这类“间歇连接设备”的作息：<strong>短空闲（SIT）</strong>设备通常最多隔十几秒就醒一次，控制器稍等就能送达；<strong>长空闲（LIT）</strong>设备可以睡几个小时，更省电，但控制器要等它定期“报到”（Check-In）才联系得上。门锁这类要随叫随到的设备，通常醒得很勤。电量本身在 <a href="../clusters/power-source/">PowerSource</a> Cluster 里读。
  </p>

  <!-- ====== 怎么选 ====== -->
  <h2 id="choosing">按设备怎么选</h2>
  <div class="table-wrap">
    <table class="wrap-table">
      <thead>
        <tr><th>设备</th><th>建议</th><th>原因</th></tr>
      </thead>
      <tbody>
        <tr><td>门锁</td><td>Thread</td><td>电池供电，Thread 省电；Wi-Fi 门锁也有，但一般要更大的电池或更勤地换电</td></tr>
        <tr><td>门窗、温湿度、人体等传感器</td><td>Thread</td><td>电池供电、数据量小</td></tr>
        <tr><td>无线按键、遥控器</td><td>Thread</td><td>电池供电，按下就要响应</td></tr>
        <tr><td>暖气片温控阀</td><td>Thread</td><td>装在暖气片上，靠电池供电</td></tr>
        <tr><td>灯泡、灯带</td><td>都可以</td><td>Wi-Fi 版不依赖边界路由器；Thread 版能顺便加固 Thread 网络</td></tr>
        <tr><td>插座、入墙开关</td><td>都可以，家里 Thread 设备多时优先 Thread</td><td>插电的 Thread 设备会当路由器，给附近的门锁、传感器补信号</td></tr>
        <tr><td>壁挂温控器</td><td>都可以</td><td>一般接线供电，看厂商提供哪种</td></tr>
        <tr><td>摄像头、视频门铃</td><td>Wi-Fi 或网线</td><td>视频要大带宽，Thread 的 250 kbps 远远不够；Matter 1.5 起才有摄像头设备类型</td></tr>
        <tr><td>电视、音箱、大家电</td><td>Wi-Fi 或网线</td><td>数据量大，本来就插电联网</td></tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">做产品的角度</div>
    <p>
      Wi-Fi 版对用户的门槛最低：不需要家里有边界路由器，连上路由器就能用。Thread 版需要用户先有一台边界路由器，换来的是更低的功耗和一张越用越稳的网。插电类产品两种都有人做，电池类产品基本只有 Thread 这一个选项。
    </p>
  </div>

  <!-- ====== 配网 ====== -->
  <h2 id="commissioning">配网时有什么不同</h2>
  <p>
    两种设备的配网流程几乎一样：扫码 → 通过蓝牙找到设备并建立加密会话 → 颁发证书、加入 Fabric → 把网络信息发给设备 → 设备上线。区别只在“网络信息”这一步：
  </p>
  <ul>
    <li><strong>Wi-Fi 设备</strong>收到的是 Wi-Fi 名称和密码。</li>
    <li><strong>Thread 设备</strong>收到的是 Thread 网络的一组参数（网络名、信道、网络密钥等，合称“运行数据集”）。手机要先从家里的边界路由器拿到这组参数，所以没有边界路由器，Thread 设备连配网都完成不了。</li>
  </ul>
  <p>
    这一步由 <a href="../clusters/network-commissioning/">NetworkCommissioning</a> Cluster 完成；完整流程见
    <a href="../concepts/#commissioning">概念总览 · Commissioner 与配网</a>。
  </p>

  <!-- ====== Wi-Fi 注意事项 ====== -->
  <h2 id="wifi-tips">Wi-Fi 设备的几个常见坑</h2>
  <ul>
    <li><strong>只支持 2.4 GHz</strong>：很多 Wi-Fi 智能设备只支持 2.4 GHz。路由器把 2.4 GHz 和 5 GHz 合成了同一个名字时，个别设备会配网失败，可以临时分开试试。</li>
    <li><strong>别放访客网络、别开 AP 隔离</strong>：Matter 在局域网里靠 IPv6 和组播发现设备，手机和设备被隔开就互相看不见，常见症状是配网卡在最后一步，或者配完显示“无响应”。</li>
    <li><strong>设备多了看路由器</strong>：几十台设备同时在线时，入门级路由器可能频繁掉线。把一部分插电设备换成 Thread 版，能减轻路由器的压力。</li>
  </ul>
  <p>
    Wi-Fi 信号强度、信道等可以在 <a href="../clusters/wifi-network-diagnostics/">WiFiNetworkDiagnostics</a> Cluster 里读。
  </p>

  <!-- ====== 常见疑问 ====== -->
  <h2 id="faq">常见疑问</h2>

  <h3 id="thread-vs-zigbee">Thread 和 Zigbee 是什么关系？</h3>
  <p>
    它们用同一种无线电（IEEE 802.15.4，2.4 GHz），很多芯片两种都能跑。区别在上层：Zigbee 从无线电一路管到应用层，要靠网关翻译才能接入别的系统；Thread 只管网络、基于 IP，上面直接跑 Matter，不需要翻译。详见 <a href="../compare/">协议对比</a>。
  </p>

  <h3 id="without-apple-google">没有苹果、谷歌的音箱，能用 Thread 设备吗？</h3>
  <p>
    能，只要家里有任意一台 Thread 边界路由器：别家的中枢、带边界路由功能的路由器，或者给 Home Assistant 插一个 Thread 无线模块（比如官方的 Connect ZBT 系列）都可以。
  </p>

  <h3 id="mixing">Thread 设备和 Wi-Fi 设备能混着用吗？</h3>
  <p>
    能。同一个家里两种设备可以混用，在 App 里看不出区别，场景和自动化也能互相联动 —— 在 Matter 看来它们是一样的设备。
  </p>

  <h3 id="wifi-need-hub">Wi-Fi 设备需要网关吗？</h3>
  <p>
    协议层面不需要，连上家里的路由器就行。但苹果、谷歌、亚马逊的 App 一般要求家里有一台它们自家的中枢（音箱、显示屏或电视盒子），用来跑自动化和远程控制。详见 <a href="../hub-bridge-border-router/#what-you-need">我家到底需要什么</a>。
  </p>

  <!-- ====== 延伸阅读 ====== -->
  <h2 id="related">延伸阅读</h2>
  <ul>
    <li><a href="../hub-bridge-border-router/">要不要网关：控制器、边界路由器、桥接器一次讲清</a></li>
    <li><a href="../compare/">协议对比：Matter、Zigbee、Z-Wave 及其他</a></li>
    <li><a href="../concepts/#commissioning">概念总览 · Commissioner 与配网</a></li>
    <li>相关 Cluster：<a href="../clusters/network-commissioning/">NetworkCommissioning</a>、<a href="../clusters/thread-network-diagnostics/">ThreadNetworkDiagnostics</a>、<a href="../clusters/wifi-network-diagnostics/">WiFiNetworkDiagnostics</a>、<a href="../clusters/icd-management/">ICD Management</a></li>
    <li><a href="../faq/">常见问题</a></li>
  </ul>
`,
} as const;
