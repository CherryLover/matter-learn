/**
 * 常见问题页 — 中文
 * 每题给简短回答，详细讲解链接回原页面，避免同一内容维护两份。
 * link.href 相对于 /zh/faq/ 页面。
 */
export default {
  title: '常见问题',
  description:
    'Matter 常见问题 — Cluster ID 是几个字节、配网后怎么读出设备类型和功能、Matter 和 Zigbee 选哪个、旧设备能否接入 Matter 等高频问题的简明回答，每题附详细讲解链接。',
  heading: '常见问题',
  intro: '学习和开发 Matter 时最常被问到的问题。每题先给简短回答，想深入了解点“详细讲解”。',
  expandAll: '全部展开',
  collapseAll: '全部收起',
  detailLabel: '详细讲解',
  groups: [
    {
      id: 'basics',
      title: '基础概念',
      items: [
        {
          id: 'what-is-matter',
          q: 'Matter 是什么？解决什么问题？',
          a: 'Matter 是智能家居的统一应用层标准，由 CSA 连接标准联盟发布。设备只要通过 Matter 认证，就能被 Apple、Google、Amazon、三星等不同平台直接控制，厂商不用再为每个平台各做一套接入。',
          link: { href: '../concepts/#what-is-matter', label: '概念总览 · 什么是 Matter' },
        },
        {
          id: 'application-layer',
          q: '说 Matter 是“应用层协议”，是什么意思？需要蓝牙吗？',
          a: 'Matter 只定义设备能做什么、怎么交互、怎么加密，底下的传输直接用现有的 IP 网络：Thread、Wi-Fi 或以太网。蓝牙只在配网那一刻用来传配网信息，日常控制不走蓝牙。',
          link: { href: '../compare/#layers', label: '协议对比 · 七层模型定位' },
        },
        {
          id: 'data-model',
          q: 'Endpoint、Cluster、Attribute、Command 分别是什么？',
          a: '一台设备（Node）分成若干功能分区（Endpoint），每个分区由若干功能模块（Cluster）组成，模块里有状态值（Attribute）和操作（Command）。例如“端点 1 上门锁模块的锁状态属性”。',
          link: { href: '../concepts/#data-model', label: '概念总览 · 四层数据模型' },
        },
        {
          id: 'device-type-vs-cluster',
          q: '设备类型（Device Type）和 Cluster 是什么关系？',
          a: '设备类型是一份“必须具备哪些 Cluster”的清单。比如声明为门锁（0x000A），就必须实现门锁 Cluster 和 Identify Cluster。设备类型只规定下限，可选能力还要看各个 Cluster 本身。',
          link: { href: '../concepts/#device-type', label: '概念总览 · Device Type' },
        },
        {
          id: 'multi-admin',
          q: '一个设备能同时被苹果和谷歌控制吗？',
          a: '能。Matter 设备可以同时加入多个 Fabric（信任域），每个平台各持一份证书，互不干扰。规范要求设备至少支持 5 个 Fabric。',
          link: { href: '../concepts/#fabric', label: '概念总览 · Fabric' },
        },
      ],
    },
    {
      id: 'ids',
      title: 'ID 与编号',
      items: [
        {
          id: 'cluster-id-size',
          q: 'Cluster ID 是固定的两个字节吗？',
          a: '不是，完整是 4 个字节：前 2 个字节是厂商前缀，后 2 个字节才是编号。标准 Cluster 的前缀都是 0x0000，平时省略不写，所以门锁 0x0000_0101 通常写成 0x0101，看起来像两个字节。',
          link: { href: '../tools/id-lookup/#cluster-id-format', label: 'Matter ID 查询 · ID 结构说明' },
        },
        {
          id: 'same-number',
          q: '同一个编号为什么能查出两种意思？',
          a: '每类 ID 各有一套编号，互不相干。0x0101 作为 Cluster 是门锁，作为设备类型却是可调光灯。判断含义前，先看这个数字出现在哪个字段里。',
          link: { href: '../tools/id-lookup/', label: 'Matter ID 查询' },
        },
        {
          id: 'decimal-vs-hex',
          q: '日志里的 257 和 0x0101 是一回事吗？',
          a: '是同一个数，只是显示格式不同。chip-tool 日志常用十六进制，Home Assistant 的诊断数据用十进制（例如 1/257/0 表示端点 1、Cluster 257、属性 0）。ID 查询工具两种写法都认。',
          link: { href: '../tools/id-lookup/', label: 'Matter ID 查询' },
        },
        {
          id: 'vendor-cluster',
          q: '厂商自定义的 Cluster 怎么查？',
          a: '厂商自定义 Cluster 的完整 ID 带有厂商编号前缀（例如 0x1234_FC00），编号落在 0xFC00 ~ 0xFFFE 范围。它不在 Matter 标准里，只能查该厂商自己的文档。',
          link: { href: '../tools/id-lookup/#cluster-id-format', label: 'Matter ID 查询 · ID 结构说明' },
        },
      ],
    },
    {
      id: 'capabilities',
      title: '设备类型与能力',
      items: [
        {
          id: 'read-device-type',
          q: '配网后怎么知道设备是什么类型？',
          a: '读每个端点 Descriptor Cluster（0x001D）里的 DeviceTypeList。先读端点 0 的 PartsList 拿到所有端点编号，再逐个读。门锁的端点 1 通常会返回“门锁 0x000A + 电源 0x0011”。',
          link: { href: '../concepts/#device-discovery', label: '概念总览 · 配网后怎么读出设备能力' },
        },
        {
          id: 'read-features',
          q: '怎么知道设备具体支持哪些功能、能发哪些命令？',
          a: '先读 Descriptor 的 ServerList 看有哪些 Cluster，再读每个 Cluster 的三个全局属性：FeatureMap（开了哪些可选功能）、AcceptedCommandList（能接收哪些命令）、AttributeList（实现了哪些属性）。',
          link: { href: '../concepts/#device-discovery', label: '概念总览 · 配网后怎么读出设备能力' },
        },
        {
          id: 'raw-capabilities',
          q: '能拿到设备的原始功能集吗？',
          a: '能。用通配读取（Wildcard Read）一次读回设备的全部属性，例如 chip-tool any read-by-id 0xFFFFFFFF 0xFFFFFFFF <节点ID> 0xFFFF。Home Assistant 下载的诊断数据也是这个结果，可以直接粘进 JSON 解析器查看。',
          link: { href: '../concepts/#raw-capabilities', label: '概念总览 · 原始功能集' },
        },
        {
          id: 'same-type-different',
          q: '两个同类型的设备，能力为什么不一样？',
          a: '设备类型只规定必须有的部分。两把都声明为门锁的设备，一把可以支持指纹和用户管理，另一把只支持密码，差别体现在门锁 Cluster 的 FeatureMap 上。',
          link: { href: '../concepts/#device-type', label: '概念总览 · Device Type' },
        },
        {
          id: 'vendor-info',
          q: '厂商、型号、固件版本从哪里读？',
          a: '都在端点 0 的 BasicInformation Cluster（0x0028）里：VendorName / VendorID、ProductName / ProductID、SoftwareVersionString、SerialNumber 等。这个 Cluster 只存在于端点 0。',
          link: { href: '../clusters/basic-information/', label: 'BasicInformation Cluster' },
        },
      ],
    },
    {
      id: 'network',
      title: '配网与网络',
      items: [
        {
          id: 'need-hub',
          q: 'Matter 设备必须要网关吗？',
          a: 'Wi-Fi 和以太网设备不需要网关，连上家里路由器就行。Thread 设备需要一个 Thread 边界路由器（HomePod mini、Apple TV、Nest Hub 等很多音箱和网关都内置），把 Thread 网络接到家里的 IP 网络上。',
          link: { href: '../compare/#comparison', label: '协议对比 · 核心参数对比' },
        },
        {
          id: 'thread-or-wifi',
          q: 'Thread 版和 Wi-Fi 版 Matter 设备怎么选？',
          a: '电池供电、数据量小的设备（传感器、门锁、按键）选 Thread，省电且组网稳定；插电、数据量大的设备（插座、灯、摄像头、家电）选 Wi-Fi。两种设备在 Matter 层面完全一样。',
          link: { href: '../compare/#choosing', label: '协议对比 · 怎么选' },
        },
        {
          id: 'commissioning-steps',
          q: '配网大致是什么流程？',
          a: '扫二维码或输入配对码 → 通过蓝牙找到设备并建立加密会话 → 给设备颁发证书、加入 Fabric → 把 Wi-Fi 或 Thread 网络信息发给设备 → 设备上线，之后就能读写属性、发命令。',
          link: { href: '../concepts/#commissioning', label: '概念总览 · Commissioner 与配网' },
        },
      ],
    },
    {
      id: 'protocols',
      title: '和其他协议',
      items: [
        {
          id: 'matter-vs-zigbee',
          q: 'Matter 和 Zigbee 选哪个？',
          a: '两者不在同一层：Zigbee 是从无线电到应用层的全套协议，Matter 只是应用层。该比的是“Zigbee 全套”和“Matter + Thread”：无线电相同，区别在是否基于 IP、是否需要厂商网关、能否同时接入多个平台。',
          link: { href: '../compare/#layers', label: '协议对比 · 七层模型定位' },
        },
        {
          id: 'old-devices',
          q: '旧的 Zigbee / Z-Wave 设备能接入 Matter 吗？',
          a: '能，通过支持 Matter 桥接的网关（如飞利浦 Hue 桥、Aqara M2 / M3）。网关把每个子设备“翻译”成 Matter 里的被桥接节点（设备类型 0x0013），各平台就能直接控制。',
          link: { href: '../compare/#bridges', label: '协议对比 · 怎么和 Matter 共存' },
        },
        {
          id: 'matter-vs-homekit',
          q: 'Matter 和 HomeKit 是什么关系？',
          a: 'HomeKit 是苹果自己的智能家居协议，只能在苹果生态用。苹果是 Matter 的主要推动者之一，Apple 家庭原生支持 Matter 设备，新产品一般直接做 Matter 就能进入苹果生态。',
          link: { href: '../compare/#comparison', label: '协议对比 · 核心参数对比' },
        },
        {
          id: 'matter-vs-zigbee-clusters',
          q: '为什么 Matter 和 Zigbee 的很多 Cluster 编号一样？',
          a: 'Matter 的 Cluster 直接继承自 Zigbee 的 ZCL 集群库，两者由同一个组织（CSA）维护。开关 0x0006、亮度 0x0008、颜色 0x0300、门锁 0x0101 等编号都没变。',
          link: { href: '../compare/#model-mapping', label: '协议对比 · 数据模型对照' },
        },
      ],
    },
    {
      id: 'dev',
      title: '开发与工具',
      items: [
        {
          id: 'read-json',
          q: '设备上报的 JSON 数据怎么看懂？',
          a: '粘进 JSON 解析器，它会把 Cluster、属性、命令的编号翻译成名称，关键状态值给出中文释义。如果是整台设备的原始数据，还会生成设备画像，并标出每项来自哪个字段。',
          link: { href: '../tools/json-parser/', label: 'JSON 解析器' },
        },
        {
          id: 'sdk-read',
          q: 'Android、iOS、Web 上怎么读设备类型和能力？',
          a: '各平台都通过 Descriptor Cluster 读取：Android 用 connectedhomeip 的 DescriptorCluster，iOS 用 MTRBaseClusterDescriptor，Web 端 matterjs-server 的节点数据里已经带好全部属性。三个平台的示例代码见 SDK 指南。',
          link: { href: '../sdk/android/#device-discovery', label: 'SDK 指南 · 读取设备类型与能力' },
        },
        {
          id: 'which-version',
          q: '现在最新的 Matter 版本是哪个？产品该对齐哪个版本？',
          a: '最新规范是 2026 年 6 月发布的 1.6；生态主流在 1.4 到 1.5，部署最广的是 1.3 到 1.4。产品一般对齐主流平台已支持的版本，需要新设备类型（如摄像头、能源管理）再看更新版本。',
          link: { href: '../roadmap/', label: '版本路线图' },
        },
      ],
    },
  ],
};
