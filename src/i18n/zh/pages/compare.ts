/**
 * 协议对比页 — 中文
 */
export default {
  title: '协议对比：Matter、Zigbee、Z-Wave 及其他',
  description:
    'Matter 与 Zigbee、Z-Wave、Thread、蓝牙 Mesh、HomeKit、Wi-Fi 私有方案的全面对比：用 OSI 七层模型定位各协议所处层级，逐项比较频段、组网、规模、安全、配网、功耗、互通与生态，并对照它们的数据模型。',
  heading: '协议对比：Matter、Zigbee、Z-Wave 及其他',
  intro:
    '智能家居里常见的协议不止 Matter。这一页把 Matter 放到同行中间比一比：先用七层模型看清它们<strong>各自管哪几层</strong>，再逐项对比参数，最后看它们描述设备的方式有多像。',

  tldrTitle: '先看结论',
  tldr: [
    '<strong>Matter 只管上面几层</strong>（应用、表示、会话），下面借用 Thread、Wi-Fi、以太网。Zigbee、Z-Wave、蓝牙 Mesh 则是从无线电一路管到应用层的“全套协议”。',
    '所以同层对比应该是：<strong>Thread 对 Zigbee 网络层</strong>（都跑在 802.15.4 上），<strong>Matter 对 ZCL / Z-Wave 命令类 / 蓝牙 Mesh 模型</strong>（都是应用层）。',
    '<strong>Matter 和 Zigbee 是“亲戚”</strong>：同一个标准组织（CSA），同一种无线电芯片，Matter 的 Cluster 直接继承自 Zigbee 的 ZCL，连编号都一样（开关都是 <code>0x0006</code>）。',
    'Matter 最大的不同是<strong>基于 IP、不依赖私有网关、可同时接入多个生态</strong>；Z-Wave 胜在 sub-GHz 穿墙远和强制互通；蓝牙 Mesh 胜在手机直连、成本低。',
  ],

  layersHeading: '七层模型定位',
  layersIntro:
    '下图把各协议放进 OSI 七层模型。实际协议并不严格按七层切分，这里按功能<strong>近似定位</strong>。颜色表示这一层做的事，横跨多格表示一个模块同时承担了几层的职责。',
  osiHeader: 'OSI 层级',
  osiLayers: [
    { n: 7, name: '应用层' },
    { n: 6, name: '表示层' },
    { n: 5, name: '会话层' },
    { n: 4, name: '传输层' },
    { n: 3, name: '网络层' },
    { n: 2, name: '数据链路层' },
    { n: 1, name: '物理层' },
  ],
  stackColumns: ['Matter over Thread', 'Matter over Wi-Fi', 'Zigbee 3.0', 'Z-Wave', '蓝牙 Mesh', 'HomeKit（IP）'],
  // col 从 1 开始；top / bottom 为 OSI 层号（top >= bottom）
  stackCells: [
    { col: 1, span: 2, top: 7, bottom: 7, kind: 'app', label: '数据模型 + 交互模型', sub: 'Cluster / 属性 / 命令 / 事件' },
    { col: 1, span: 2, top: 6, bottom: 6, kind: 'app', label: 'TLV 编码', sub: '紧凑的二进制格式' },
    { col: 1, span: 2, top: 5, bottom: 5, kind: 'sec', label: '安全会话 · 消息层', sub: 'PASE / CASE · AES-CCM · MRP 可靠重传' },
    { col: 1, top: 4, bottom: 4, kind: 'transport', label: 'UDP' },
    { col: 1, top: 3, bottom: 3, kind: 'net', label: 'IPv6 · Thread 网状路由', sub: '6LoWPAN 压缩' },
    { col: 1, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.15.4 MAC' },
    { col: 1, top: 1, bottom: 1, kind: 'phy', label: '802.15.4 PHY', sub: '2.4 GHz · 250 kbps' },
    { col: 2, top: 4, bottom: 4, kind: 'transport', label: 'UDP / TCP' },
    { col: 2, top: 3, bottom: 3, kind: 'net', label: 'IPv6' },
    { col: 2, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.11 MAC' },
    { col: 2, top: 1, bottom: 1, kind: 'phy', label: '802.11 PHY', sub: '2.4 / 5 GHz' },
    { col: 3, top: 7, bottom: 7, kind: 'app', label: 'ZCL 集群库 + ZDO', sub: 'Zigbee 3.0 统一应用层' },
    { col: 3, top: 6, bottom: 4, kind: 'transport', label: 'APS 应用支持子层', sub: '绑定 · 分片 · 端到端确认 · 链路密钥加密' },
    { col: 3, top: 3, bottom: 3, kind: 'net', label: 'Zigbee NWK', sub: '网状路由 · 网络密钥加密' },
    { col: 3, top: 2, bottom: 2, kind: 'link', label: 'IEEE 802.15.4 MAC' },
    { col: 3, top: 1, bottom: 1, kind: 'phy', label: '802.15.4 PHY', sub: '2.4 GHz（PRO 2023 起可选 sub-GHz）' },
    { col: 4, top: 7, bottom: 7, kind: 'app', label: 'Command Classes 命令类' },
    { col: 4, top: 6, bottom: 4, kind: 'transport', label: '传输服务 + S2 安全封装', sub: '分段重组 · Curve25519 + AES-128' },
    { col: 4, top: 3, bottom: 3, kind: 'net', label: 'Z-Wave 路由层', sub: '源路由 · 最多 4 跳' },
    { col: 4, top: 2, bottom: 2, kind: 'link', label: 'ITU-T G.9959 MAC' },
    { col: 4, top: 1, bottom: 1, kind: 'phy', label: 'G.9959 PHY', sub: 'sub-GHz · 欧 868 / 美 908 MHz' },
    { col: 5, top: 7, bottom: 7, kind: 'app', label: 'Models 模型 · Access 层', sub: 'Generic OnOff 等' },
    { col: 5, top: 6, bottom: 5, kind: 'sec', label: 'Upper Transport', sub: 'AppKey 应用层加密' },
    { col: 5, top: 4, bottom: 4, kind: 'transport', label: 'Lower Transport', sub: '分段重组' },
    { col: 5, top: 3, bottom: 3, kind: 'net', label: 'Network 层', sub: '受管泛洪 · NetKey 加密' },
    { col: 5, top: 2, bottom: 2, kind: 'link', label: 'Bearer + BLE 链路层', sub: '广播 / GATT 承载' },
    { col: 5, top: 1, bottom: 1, kind: 'phy', label: 'BLE PHY', sub: '2.4 GHz · 1 Mbps' },
    { col: 6, top: 7, bottom: 7, kind: 'app', label: '服务 / 特征', sub: 'Service / Characteristic' },
    { col: 6, top: 6, bottom: 6, kind: 'app', label: 'JSON' },
    { col: 6, top: 5, bottom: 5, kind: 'sec', label: 'HAP 会话', sub: 'SRP 配对 · ChaCha20-Poly1305' },
    { col: 6, top: 4, bottom: 4, kind: 'transport', label: 'TCP（HTTP）' },
    { col: 6, top: 3, bottom: 3, kind: 'net', label: 'IPv4 / IPv6' },
    { col: 6, top: 2, bottom: 1, kind: 'phy', label: 'Wi-Fi / 以太网', sub: '也可跑在 BLE、Thread 上' },
  ],
  legend: [
    { kind: 'app', label: '应用与数据模型' },
    { kind: 'sec', label: '安全会话' },
    { kind: 'transport', label: '传输' },
    { kind: 'net', label: '网络与路由' },
    { kind: 'link', label: '链路（MAC）' },
    { kind: 'phy', label: '无线电 / 物理介质' },
  ],
  layersNotes: [
    '<strong>左边两列上半截是连在一起的</strong>：不管底下是 Thread 还是 Wi-Fi，Matter 的应用层完全一样，这正是“应用层协议”的含义。',
    '<strong>Matter over Thread 和 Zigbee 的最下两层完全相同</strong>，都是 IEEE 802.15.4。很多芯片（如 Silicon Labs EFR32MG24、Nordic nRF52840）同时支持两者，同一台网关可以一边跑 Zigbee 一边做 Thread 边界路由器。',
    '<strong>Z-Wave 是唯一不在 2.4 GHz 的</strong>，它用 sub-GHz 频段，不和 Wi-Fi 抢信道，穿墙也更好。',
    '<strong>配网时用到的蓝牙</strong>（Matter 用 BLE 传配网信息）没画进来，因为它只在入网那一刻用一下，不承载日常通信。',
  ],

  mistakeTitle: '最常见的误解：“Matter 和 Zigbee 选哪个？”',
  mistakeBody:
    '这个问题本身把两件不同层级的事混在了一起。Zigbee 是一整套协议；Matter 只是应用层，要搭配 Thread 或 Wi-Fi 才能用。更准确的问法是：<strong>“Zigbee 全套”还是“Matter + Thread”？</strong>两者用同样的无线电，区别在网络层（Zigbee 私有路由 vs 标准 IPv6）和应用层（ZCL vs Matter 数据模型），以及是否需要厂商网关。',

  tableHeading: '核心参数对比',
  tableIntro: '屏幕较窄时表格可以左右滑动，第一列固定不动。“随承载网”表示这一项取决于它底下跑的是 Wi-Fi、BLE 还是 Thread。',
  tableColumns: ['对比项', 'Matter', 'Zigbee', 'Z-Wave', '蓝牙 Mesh', 'HomeKit', 'Wi-Fi 私有方案'],
  tableRows: [
    ['管哪几层', '应用层（下接 Thread / Wi-Fi / 以太网）', '全栈：无线电到应用层', '全栈：无线电到应用层', '全栈（基于 BLE）', '应用层（IP / BLE / Thread）', '应用层私有，底层 Wi-Fi + 云'],
    ['标准组织', 'CSA 连接标准联盟', 'CSA（原 Zigbee 联盟）', 'Z-Wave 联盟；物理/链路层为 ITU-T G.9959', '蓝牙技术联盟（SIG）', 'Apple', '各厂商自定（涂鸦、米家等）'],
    ['发布时间', '2022 年 1.0；当前 1.6', '2004 年 1.0；3.0 于 2016；PRO 2023', '约 2001 年；2020 年规范开放', '2017 年 1.0；2023 年 1.1', '2014 年', '—'],
    ['频段', '2.4 GHz（Thread / Wi-Fi）；Wi-Fi 也可 5 GHz', '2.4 GHz；PRO 2023 增加欧 800 / 美 900 MHz', 'sub-GHz：欧 868 / 美 908 MHz 等', '2.4 GHz', '随承载网', '2.4 GHz 为主'],
    ['速率', 'Thread 250 kbps；Wi-Fi 为 Mbps 级', '250 kbps', '9.6 / 40 / 100 kbps', '1 Mbps（物理层）', '随承载网', 'Mbps 级'],
    ['拓扑', 'Thread 网状；Wi-Fi 星型', '网状（协调器 + 路由器 + 终端）', '网状（源路由，最多 4 跳）；长距离版为星型', '网状（受管泛洪）', '星型（经家庭中枢）', '星型（经路由器 + 云）'],
    ['网络规模', 'Thread 最多 32 个路由器，单网络建议约 250 台以内', '地址空间约 6.5 万，实际一般数百台', '经典 232 台；长距离版 4000 台', '单播地址约 3.2 万', '家庭级', '受家用路由器限制，一般几十台'],
    ['单跳距离（室内）', 'Thread 约 10–30 m；Wi-Fi 看路由器', '约 10–20 m', '约 30–40 m；长距离版空旷处可达 1.5 km 以上', '约 10–30 m', '随承载网', '看路由器覆盖'],
    ['基于 IP', '是（IPv6）', '否', '否', '否', '是（IP 模式）', '是'],
    ['需要网关吗', 'Thread 设备需要边界路由器；Wi-Fi 设备不需要网关', '需要协调器 / 网关', '需要控制器 / 网关', '手机可直连；远程和自动化需要网关', '远程和自动化需要家庭中枢（HomePod / Apple TV）', '不需要网关，但依赖厂商云'],
    ['本地控制', '是，本地优先', '是（经网关）', '是（经网关）', '是', '是', '多数依赖云'],
    ['安全', '出厂设备证书（DAC）+ PASE / CASE 会话 + AES-128-CCM', 'AES-128；安装码；PRO 2023 起动态链路密钥（Curve25519）', 'S2：Curve25519 密钥交换 + AES-128', 'AES-CCM；网络 / 应用 / 设备三层密钥', 'SRP 配对 + Ed25519 + ChaCha20-Poly1305', '到云端走 TLS，各家实现不同'],
    ['配网方式', '扫码或输入配对码；经 BLE 或已有网络', '网关开放入网；安装码或扫码', 'SmartStart 扫码，或按键入网', '手机作为配置者（Provisioner）', '扫码或输入配对码', '厂商 App 配网（BLE 辅助或热点模式）'],
    ['功耗', 'Thread 低（可休眠终端）；Wi-Fi 高', '低，纽扣电池可用数年', '低；长距离版纽扣电池可达约 10 年', '低到中（中继节点需常供电）', '随承载网', '高，多为插电设备'],
    ['多平台同时接入', '支持（Multi-Admin，可同时接 Apple / Google / Amazon 等）', '一个网络只属于一个协调器', '一个网络只属于一个主控制器', '一个网络一个配置者', '仅 Apple 家庭', '只能用厂商 App，或云对云'],
    ['跨品牌互通', '强制认证，按标准数据模型互通', '3.0 统一了应用层，但厂商私有扩展多，跨网关不一定通', '强制认证，向下兼容做得好', '标准模型可互通，厂商私有模型常见', '仅限 Apple 生态', '基本不互通'],
    ['芯片生态', '多家（Silicon Labs、Nordic、乐鑫、NXP、TI 等）', '多家，常与 Thread 共用同一颗芯片', '以 Silicon Labs 为主，2024 年起有 Trident IoT', '几乎所有蓝牙芯片', '—', '多家 Wi-Fi 芯片'],
    ['国内常见度', '快速增长', '很常见（Aqara、涂鸦 Zigbee 等）', '几乎没有', '很常见（米家蓝牙 Mesh 灯具等）', '有一定用户', '非常常见'],
  ],

  sameHeading: '相同点',
  same: [
    { title: '描述设备的思路几乎一样', desc: '都是“设备 → 功能分区 → 功能模块 → 状态和操作”四层结构，只是叫法不同，见下方<a href="#model-mapping">数据模型对照</a>。' },
    { title: '低功耗协议都用网状组网', desc: 'Thread、Zigbee、Z-Wave、蓝牙 Mesh 都靠常供电设备帮忙转发，扩大覆盖、绕开障碍；只有 Wi-Fi 类方案是星型。' },
    { title: '都分“常供电”和“电池”两类设备', desc: '插电设备当中继，电池设备大部分时间休眠、定时醒来。Matter 的 ICD、Zigbee 的休眠终端、Z-Wave 的 FLiRS 都是这个思路。' },
    { title: '都是“配网时交换密钥，运行时对称加密”', desc: '入网时用扫码、配对码或安装码建立信任，之后的日常通信用 AES-128 或 ChaCha20 这类对称加密。' },
    { title: '都有联盟和认证', desc: '除了私有方案，各协议都有标准组织维护规范、做产品认证，认证是跨品牌互通的前提。' },
  ],

  diffHeading: '不同点',
  diffs: [
    { title: '管的层数不同', desc: 'Matter 和 HomeKit 只定义应用层，可以换底层网络；Zigbee、Z-Wave、蓝牙 Mesh 是全栈，换不了无线电。' },
    { title: '是否基于 IP', desc: 'Matter 设备都有 IPv6 地址，能和手机、路由器、云直接对话，不需要协议转换；Zigbee、Z-Wave、蓝牙 Mesh 不是 IP，要靠网关翻译。' },
    { title: '频段与穿墙', desc: 'Z-Wave 用 sub-GHz，穿墙好、不受 Wi-Fi 干扰；其余大多挤在 2.4 GHz。Zigbee PRO 2023 也开始支持 sub-GHz，但产品还少。' },
    { title: '网关与生态绑定', desc: 'Zigbee / Z-Wave 设备只认配对的那个网关，换网关要重新配网；Matter 设备可以同时加入多个生态，Thread 1.4 起不同厂商的边界路由器还能共享同一个 Thread 网络。' },
    { title: '规模与距离', desc: 'Z-Wave 长距离版单网可达 4000 台、1.5 km 以上，适合大户型和户外；Thread / Zigbee 单跳距离短，靠多跳补足。' },
    { title: '互通程度', desc: 'Z-Wave 和 Matter 都强制认证，互通最好；Zigbee 虽有 3.0，但各家私有扩展多；蓝牙 Mesh 各厂商私有模型也很常见；Wi-Fi 私有方案基本只能云对云。' },
    { title: '市场与地域', desc: '国内以 Zigbee、蓝牙 Mesh、Wi-Fi 私有方案为主，Z-Wave 几乎没有；北美和欧洲 Z-Wave 在安防、门锁领域很强；Matter 在全球快速铺开。' },
  ],

  mappingHeading: '数据模型对照',
  mappingIntro: '各协议描述设备的方式非常像。学会 Matter 的四层模型，其他协议基本可以一一对上：',
  mappingColumns: ['概念', 'Matter', 'Zigbee', 'Z-Wave', '蓝牙 Mesh', 'HomeKit'],
  mappingRows: [
    ['一台设备', 'Node', 'Node', 'Node', 'Node', 'Accessory'],
    ['设备里的功能分区', 'Endpoint', 'Endpoint', 'Endpoint（Multi Channel）', 'Element', '桥接下的子配件'],
    ['一组相关功能', 'Cluster', 'Cluster（ZCL）', 'Command Class', 'Model', 'Service'],
    ['一个状态值', 'Attribute', 'Attribute', '通过 Get / Report 读取的值', 'State', 'Characteristic'],
    ['一个操作', 'Command', 'Command', 'Set 等命令', 'Message（Set / Get）', '写入 Characteristic'],
    ['主动上报', 'Event / 订阅', '属性上报（Reporting）', 'Report（发往 Lifeline 关联组）', 'Status 消息（Publish）', '事件通知'],
  ],
  exampleHeading: '同一件事：打开一盏灯',
  exampleColumns: ['协议', '功能模块', '操作', '参数'],
  exampleRows: [
    ['Matter', 'OnOff Cluster <code>0x0006</code>', '命令 On <code>0x01</code>', '无'],
    ['Zigbee', 'ZCL On/Off Cluster <code>0x0006</code>', '命令 On <code>0x01</code>', '无'],
    ['Z-Wave', 'Binary Switch 命令类 <code>0x25</code>', 'Set <code>0x01</code>', '值 <code>0xFF</code>（开）'],
    ['蓝牙 Mesh', 'Generic OnOff Server 模型', 'Generic OnOff Set（操作码 <code>0x8202</code>）', 'OnOff = 1'],
    ['HomeKit', 'Lightbulb 服务', '写 On 特征（类型 <code>0x25</code>）', 'true'],
  ],
  exampleNote:
    '注意前两行<strong>完全一样</strong>：Matter 的 Cluster 直接继承自 Zigbee 的 ZCL，大量 Cluster 编号都没变，比如亮度 <code>0x0008</code>、颜色 <code>0x0300</code>、门锁 <code>0x0101</code>、温控 <code>0x0201</code>、温度测量 <code>0x0402</code>。熟悉 Zigbee 的工程师上手 Matter 会很快。想查某个编号，用 <a href="../tools/id-lookup/">Matter ID 查询</a>。',

  bridgeHeading: '它们怎么和 Matter 共存',
  bridgeBody: `<p>
    已有的 Zigbee、Z-Wave 设备不用扔。支持 Matter 的网关可以当<strong>桥接器（Matter Bridge）</strong>，把下面的老设备“翻译”成 Matter 设备，让 Apple、Google、Amazon 等平台直接控制。
  </p>
  <ul>
    <li>网关自己在根节点之外声明一个 <strong>聚合器</strong>（设备类型 <code>0x000E</code>）端点</li>
    <li>每个子设备变成一个 <strong>被桥接节点</strong>（设备类型 <code>0x0013</code>）端点，同时带上它本来的类型，比如“被桥接节点 + 可调光灯”</li>
    <li>子设备的名称、在线状态放在 <a href="../clusters/bridged-device-basic-information/">BridgedDeviceBasicInformation</a> Cluster 里</li>
  </ul>
  <p>
    飞利浦 Hue 桥、Aqara M2 / M3 网关都属于这种用法。桥接器的数据可以直接粘进 <a href="../tools/json-parser/">JSON 解析器</a> 查看每个端点的类型。
  </p>`,

  chooseHeading: '怎么选',
  chooseColumns: ['场景', '建议'],
  chooseRows: [
    ['新做智能家居产品，想同时进入苹果、谷歌、亚马逊等生态', 'Matter：电池设备（传感器、门锁）用 Thread，插电和大流量设备用 Wi-Fi'],
    ['家里或项目里已经有大量 Zigbee 设备', '继续用，选一个支持 Matter 桥接的网关接入新生态'],
    ['北美 / 欧洲的安防、门锁，需要穿墙和远距离', 'Z-Wave（大户型或户外可考虑长距离版）'],
    ['国内低成本灯具、希望手机直连', '蓝牙 Mesh'],
    ['只做 Apple 生态', 'HomeKit 仍可用，但新产品建议直接做 Matter，Apple 家庭原生支持'],
    ['摄像头等大流量设备', 'Wi-Fi。Matter 1.5 起已有摄像头设备类型'],
  ],

  othersHeading: '其他常被拿来比较的协议',
  othersIntro: '下面这些也常出现在物联网讨论里，但和上面的协议不在同一条赛道：',
  othersColumns: ['协议', '所在层级', '主要用途', '和智能家居协议的关系'],
  othersRows: [
    ['MQTT', '应用层消息协议（跑在 TCP 上）', '设备与云之间收发消息', '只管“怎么传消息”，不定义设备模型；常被 Wi-Fi 私有方案用来上云'],
    ['LoRaWAN', '全栈，低功耗广域网', '公里级远距离、低速率：抄表、农业、园区', '覆盖远但速率极低，不适合家庭实时控制'],
    ['NB-IoT / LTE-M', '蜂窝网络（运营商）', '独立联网的远程设备：水表、烟感、追踪器', '不需要家庭网关，但要 SIM 卡和流量费'],
    ['KNX', '全栈，以有线总线为主', '楼宇自动化：灯光、窗帘、暖通', '欧洲楼宇常用，偏工程安装；可通过网关接入 Matter'],
    ['Wi-Fi HaLow（802.11ah）', '物理层 + 链路层', 'sub-GHz 的 Wi-Fi，距离远、功耗低', '可以承载 IP，理论上能跑 Matter，产品还很少'],
  ],

  sourcesHeading: '参考资料',
  sources: [
    { name: 'CSA · Zigbee 常见问题', url: 'https://csa-iot.org/all-solutions/zigbee/zigbee-faq/' },
    { name: 'CSA · Zigbee PRO 2023 新特性', url: 'https://csa-iot.org/newsroom/zigbee-pro-2023/' },
    { name: 'Thread Group · Thread 1.4 特性白皮书', url: 'https://www.threadgroup.org/Portals/0/Documents/Thread_1.4_Features_White_Paper_September_2024.pdf' },
    { name: 'Trident IoT · Taurus Z-Wave 芯片发布', url: 'https://tridentiot.com/2024/04/30/trident-iot-launches-z-wave-series-silicon/' },
    { name: 'Z-Wave 联盟', url: 'https://z-wavealliance.org/' },
    { name: '蓝牙技术联盟 · Mesh 规范', url: 'https://www.bluetooth.com/specifications/specs/mesh-protocol/' },
  ],
};
