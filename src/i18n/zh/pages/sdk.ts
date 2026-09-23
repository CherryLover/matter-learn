export default {
  title: 'Matter SDK 开发指南',
  description: '各平台 Matter SDK 的架构解析、配网流程、设备控制示例和注意事项，帮助开发者快速上手。',
  heroTitle: 'Matter SDK 开发指南',
  heroDesc: '从 Android 到 iOS 再到 Web，逐平台解析 Matter SDK 的架构、核心 API 和上手路径。',
  heroCount: '3 个平台',
  heroCategoryCount: '配网 · 控制 · 限制',

  platforms: [
    {
      id: 'android',
      name: 'Android',
      icon: 'android',
      tagline: '基于 Google Play Services 的两层配网架构',
      sdk: 'Home APIs + connectedhomeip',
      maturity: 'GA (生产就绪)',
      specVersion: 'Matter 1.4.1',
      minVersion: 'Android 8.1+ (API 27)',
      keyFeature: 'Home APIs 提供配网 + 控制 + 自动化的统一 API',
      href: '/sdk/android/',
    },
    {
      id: 'ios',
      name: 'iOS',
      icon: 'ios',
      tagline: '系统原生框架，MatterSupport 扩展接入',
      sdk: 'Matter.framework + MatterSupport',
      maturity: '成熟 (第 4 个 OS 周期)',
      specVersion: 'Matter 1.4+',
      minVersion: 'iOS 16.1+',
      keyFeature: '系统级配网 UI，无需额外依赖',
      href: '/sdk/ios/',
    },
    {
      id: 'web',
      name: 'Web / Node.js',
      icon: 'web',
      tagline: '浏览器通过 WebSocket 代理，Node.js 全功能控制',
      sdk: 'matter.js + matterjs-server',
      maturity: '生产可用 (Home Assistant 已采用)',
      specVersion: 'Matter 1.4.2 — 1.6',
      minVersion: 'Node.js 20.19+',
      keyFeature: 'Open Home Foundation 维护的纯 TypeScript 实现',
      href: '/sdk/web/',
    },
  ],

  comparisonTitle: '平台对比',
  comparisonHeaders: ['特性', 'Android', 'iOS', 'Web / Node.js'],
  comparisonRows: [
    ['配网能力', '完整 (GPS 代理)', '完整 (系统 UI)', '仅服务端 (浏览器不支持)'],
    ['设备控制', 'Home APIs / Cluster 直调', 'MTRBaseCluster / MTRDevice', 'WebSocket 代理 / 直接 Cluster'],
    ['Thread 支持', 'GPS Thread SDK', '需要 HomePod/Apple TV', 'matter.js 原生支持'],
    ['最低版本', 'Android 8.1 (API 27)', 'iOS 16.1', 'Node.js 20.19'],
    ['外部依赖', 'Google Play Services (必需)', '无 (系统内置)', '无 (纯 JS)'],
    ['开源可控', 'connectedhomeip 可选', 'Matter.framework 闭源', 'matter.js 全开源'],
  ],

  android: {
    title: 'Android Matter SDK 指南',
    description: '深入了解 Android 平台的 Matter 开发：SDK 选择、配网流程、设备控制和常见陷阱。',
    heroTitle: 'Android Matter SDK',
    heroDesc: '基于 Google Home APIs 和 connectedhomeip 的 Matter 开发完整指南。',
    sections: [
      {
        id: 'overview',
        title: '概述',
        content: `<p>Android 的 Matter 开发涉及<strong>三层 SDK</strong>：Google 的上层 API（配网和设备管理）、开源 connectedhomeip（协议栈和 Cluster 控制）、以及 Thread 网络 SDK。</p>
<p>2026 年 8 月，Google Home APIs 正式 GA（v1.10.1），提供了配网、设备控制和自动化的统一接口。新项目建议直接使用 Home APIs，旧项目可继续沿用 Legacy Mobile SDK。</p>`,
      },
      {
        id: 'sdks',
        title: 'SDK 选择',
        content: '<p>根据项目需求选择合适的 SDK 组合：</p>',
        table: {
          headers: ['SDK', 'Maven 坐标', '能力范围', '适用场景'],
          rows: [
            ['Home APIs (新)', 'play-services-home:17.0.0 + play-services-home-types:17.0.0', '配网 + 控制 + 自动化', '新项目首选'],
            ['Legacy Mobile SDK', 'play-services-home:16.0.0', '仅配网和分享', '已有项目维护'],
            ['connectedhomeip', '从源码构建 / demo SDK', '完整协议栈，Cluster 级控制', '自定义 Fabric / 无 GPS 设备'],
            ['Thread Network SDK', 'play-services-threadnetwork:16.2.1', 'Thread 凭据管理', '配合 Thread 设备使用'],
          ],
        },
      },
      {
        id: 'commissioning',
        title: '配网流程',
        content: '<p>Android 配网采用<strong>两层架构</strong>：Google Play Services 处理 BLE 发现、PASE 会话和网络配置；完成后回调到你的 CommissioningService，在自有 Fabric 上完成入网。</p>',
        flow: [
          '用户扫描 QR 码',
          'App 调用 CommissioningClient.commissionDevice()',
          'GPS 通过 BLE 发现设备，建立 PASE 会话',
          'GPS 下发 WiFi/Thread 凭据，设备入网',
          'GPS 签发 NOC，设备加入 Android Fabric',
          '回调你的 CommissioningService.onCommissioningRequested()',
          '你的 App 通过 ChipDeviceController 配网到自有 Fabric',
          '调用 sendCommissioningComplete() 完成流程',
        ],
      },
      {
        id: 'device-control',
        title: '设备控制',
        content: '<p>配网完成后，通过 connectedhomeip 的 Cluster API 控制设备。每个 Matter Cluster 对应一个 Java/Kotlin 类。</p>',
        codeExample: {
          language: 'kotlin',
          title: '开关控制示例',
          code: `// 获取已连接设备的指针
val devicePtr = suspendCoroutine<Long> { cont ->
    controller.getConnectedDevicePointer(nodeId,
        object : GetConnectedDeviceCallback {
            override fun onDeviceConnected(ptr: Long) = cont.resume(ptr)
            override fun onConnectionFailure(id: Long, e: Exception) =
                cont.resumeWithException(e)
        })
}

// 创建 OnOff Cluster 实例并发送命令
val cluster = ChipClusters.OnOffCluster(devicePtr, endpointId)
cluster.toggle(object : ChipClusters.DefaultClusterCallback {
    override fun onSuccess() { /* 设备已切换 */ }
    override fun onError(ex: Exception) { /* 处理错误 */ }
})`,
        },
      },
      {
        id: 'device-discovery',
        title: "读取设备类型与能力",
        content: "<p>配网完成后，读 <strong>Descriptor</strong>（<code>0x001D</code>）就能知道设备有哪些端点、每个端点是什么类型、有哪些 Cluster；再读各 Cluster 的 <code>FeatureMap</code> / <code>AcceptedCommandList</code> 就知道具体能力。字段含义见 <a href=\"../../concepts/#device-discovery\">概念总览 · 配网后怎么读出设备能力</a>，读到的数字可以用 <a href=\"../../tools/id-lookup/\">Matter ID 查询</a> 翻译。</p>",
        codeExample: {
          language: 'kotlin',
          title: "读 Descriptor 与 FeatureMap",
          code: `// 1. 端点 0 的 PartsList：设备有哪些端点
val root = ChipClusters.DescriptorCluster(devicePtr, 0)
root.readPartsListAttribute(object :
    ChipClusters.DescriptorCluster.PartsListAttributeCallback {
    override fun onSuccess(endpoints: List<Int>) {
        endpoints.forEach { ep -> readEndpoint(devicePtr, ep) }
    }
    override fun onError(ex: Exception) { /* 处理错误 */ }
})

// 2. 每个端点的 DeviceTypeList / ServerList：是什么、有哪些 Cluster
fun readEndpoint(devicePtr: Long, ep: Int) {
    val descriptor = ChipClusters.DescriptorCluster(devicePtr, ep)
    descriptor.readDeviceTypeListAttribute(object :
        ChipClusters.DescriptorCluster.DeviceTypeListAttributeCallback {
        override fun onSuccess(types: List<ChipStructs.DescriptorClusterDeviceTypeStruct>) {
            // 门锁端点会得到 0x000A（门锁）和 0x0011（电源）
            types.forEach { Log.d(TAG, "EP$ep type=0x%04X rev=%d".format(it.deviceType, it.revision)) }
        }
        override fun onError(ex: Exception) {}
    })
    descriptor.readServerListAttribute(object :
        ChipClusters.DescriptorCluster.ServerListAttributeCallback {
        override fun onSuccess(clusters: List<Long>) { /* 例如 [3, 29, 47, 257] */ }
        override fun onError(ex: Exception) {}
    })
}

// 3. 某个 Cluster 开了哪些可选功能：FeatureMap（全局属性 0xFFFC）
ChipClusters.DoorLockCluster(devicePtr, 1).readFeatureMapAttribute(object :
    ChipClusters.LongAttributeCallback {
    override fun onSuccess(value: Long) {
        val supportsFingerprint = (value and (1L shl 2)) != 0L  // bit 2 = FGP
    }
    override fun onError(ex: Exception) {}
})`,
        },
      },
      {
        id: 'limitations',
        title: '限制与注意事项',
        content: '<p>Android Matter 开发中最需要注意的几个问题：</p>',
        items: [
          {
            title: 'Google Play Services 强依赖',
            desc: 'GPS 是配网的必要条件。华为、Amazon Fire 等无 GMS 设备无法使用 Google 配网流程，需要直接使用 connectedhomeip。',
          },
          {
            title: '配网窗口超时',
            desc: 'Matter 设备的配网窗口仅持续 3-5 分钟。如果 SDK 初始化耗时过长，窗口会在 PASE 会话开始前关闭。建议预热 SDK。',
          },
          {
            title: 'Controller 冲突',
            desc: '配网过程中创建控制用的 ChipDeviceController 会触发 native 层冲突导致 SIGABRT。务必用标志位隔离配网和控制操作。',
          },
          {
            title: 'GPS 版本限制',
            desc: 'Home APIs 需要 GPS 26.34.30+，Legacy SDK 需要 22.50.14+。旧设备上 GPS 版本过低会导致配网静默失败。',
          },
          {
            title: 'Thread 凭据问题',
            desc: '手机可能缺少 Thread 凭据导致 "需要 Thread 边界路由器" 错误，即使网络上存在边界路由器。',
          },
          {
            title: 'sendCommissioningComplete 遗漏',
            desc: '在 CommissioningService 中忘记调用此方法会导致整个流程静默失败，且文档中未充分说明。',
          },
        ],
      },
      {
        id: 'resources',
        title: '参考资源',
        links: [
          { name: 'Home APIs 入门', url: 'https://developers.home.google.com/apis/android/get-started', desc: 'Google Home APIs 官方入门指南' },
          { name: 'Matter Codelab', url: 'https://developers.home.google.com/codelabs/matter-sample-app', desc: 'Android Matter 开发 Codelab' },
          { name: 'Home APIs 示例应用', url: 'https://github.com/google-home/google-home-api-sample-app-android', desc: '新版 Home APIs 示例代码' },
          { name: 'connectedhomeip Android', url: 'https://github.com/project-chip/connectedhomeip/blob/master/docs/platforms/android/android_building.md', desc: 'connectedhomeip Android 构建文档' },
          { name: 'Matter 虚拟设备', url: 'https://developers.home.google.com/codelabs/matter-device-virtual', desc: '无需硬件的测试设备' },
          { name: 'Kotlin Matter Controller', url: 'https://github.com/project-chip/connectedhomeip/tree/master/examples/kotlin-matter-controller', desc: 'Kotlin 独立控制器示例' },
          { name: 'Home APIs 发布说明', url: 'https://developers.home.google.com/apis/android/release-notes', desc: 'SDK 版本变更记录' },
        ],
      },
    ],
  },

  ios: {
    title: 'iOS Matter SDK 指南',
    description: '深入了解 iOS 平台的 Matter 开发：Matter.framework 与 MatterSupport、配网扩展、Cluster 控制和已知限制。',
    heroTitle: 'iOS Matter SDK',
    heroDesc: '基于 Apple 系统框架的 Matter 开发指南，覆盖 MatterSupport 扩展和 Cluster 控制。',
    sections: [
      {
        id: 'overview',
        title: '概述',
        content: `<p>iOS 的 Matter 支持内建于系统框架中，开发者使用两个核心框架：<strong>Matter.framework</strong>（底层协议栈，提供 Cluster 级控制）和 <strong>MatterSupport</strong>（高层配网扩展，让第三方 App 参与 Apple Home 的配网流程）。</p>
<p>Matter.framework 从 iOS 16.0 开始提供，目前已进入第 4 个 OS 周期，Cluster API 持续扩充。MatterSupport 从 iOS 16.1 开始可用，是第三方 App 接入 Matter 生态的推荐方式。</p>`,
      },
      {
        id: 'frameworks',
        title: '框架选择',
        content: '<p>iOS 上 Matter 开发涉及三个框架，各自定位不同：</p>',
        table: {
          headers: ['框架', '定位', '适用场景', '最低版本'],
          rows: [
            ['MatterSupport', '高层配网扩展', '第三方 App 参与 Apple Home 配网流程', 'iOS 16.1'],
            ['Matter.framework', '底层协议栈', '直接 Cluster 控制、独立 Fabric 管理', 'iOS 16.0'],
            ['HomeKit', 'Apple Home 桥接', '获取已入网设备的 matterNodeID 后用 Matter.framework 控制', 'iOS 16.1'],
          ],
        },
      },
      {
        id: 'commissioning',
        title: '配网流程',
        content: '<p>第三方 App 通过实现 <strong>MatterSupport Extension</strong> 参与系统配网流程。系统处理 BLE 发现和 PASE 会话，你的扩展在关键节点介入。</p>',
        flow: [
          'App 创建 MatterAddDeviceRequest 并调用 perform()',
          '系统弹出配网 UI，扫描 QR 码或手动输入',
          '系统通过 BLE 发现设备，建立 PASE 会话',
          '你的扩展收到 validateDeviceCredential 回调',
          '你的扩展选择 WiFi 或 Thread 网络',
          '你的扩展在 commissionDevice 中配网到自有 Fabric',
          '你的扩展在 configureDevice 中保存设备配置',
        ],
      },
      {
        id: 'device-control',
        title: '设备控制',
        content: '<p>iOS 提供两种 Cluster API 模式：<strong>Stateless</strong>（MTRBaseCluster，直接网络操作）和 <strong>Stateful</strong>（MTRCluster，带本地缓存的订阅模式）。</p>',
        codeExample: {
          language: 'swift',
          title: '开关控制示例',
          code: `import Matter

// 创建 Stateless 设备代理
let device = MTRBaseDevice(nodeID: nodeID, controller: controller)
let onOff = MTRBaseClusterOnOff(
    device: device,
    endpointID: NSNumber(value: 1),
    queue: .main
)

// 切换开关状态
try await onOff.toggle()

// 读取当前状态
let isOn = try await onOff.readAttributeOnOff()`,
        },
      },
      {
        id: 'device-discovery',
        title: "读取设备类型与能力",
        content: "<p>用 <code>MTRBaseClusterDescriptor</code> 读 Descriptor（<code>0x001D</code>）拿到端点、设备类型和 Cluster 列表；也可以用 <code>readAttributes</code> 做通配读取，一次拿回全部原始属性。字段含义见 <a href=\"../../concepts/#device-discovery\">概念总览 · 配网后怎么读出设备能力</a>，读到的数字可以用 <a href=\"../../tools/id-lookup/\">Matter ID 查询</a> 翻译。</p>",
        codeExample: {
          language: 'swift',
          title: "读 Descriptor 与通配读取",
          code: `import Matter

let device = MTRBaseDevice(nodeID: nodeID, controller: controller)

// 1. 端点 0 的 PartsList：设备有哪些端点
let root = MTRBaseClusterDescriptor(device: device, endpointID: 0, queue: .main)
let endpoints = try await root.readAttributePartsList() as? [NSNumber] ?? []

for ep in endpoints {
    let descriptor = MTRBaseClusterDescriptor(device: device, endpointID: ep, queue: .main)

    // 2. 这个端点是什么设备（门锁端点：0x000A 门锁 + 0x0011 电源）
    let types = try await descriptor.readAttributeDeviceTypeList()
        as? [MTRDescriptorClusterDeviceTypeStruct] ?? []
    for t in types {
        print("EP\(ep) type=0x\(String(t.deviceType.uint32Value, radix: 16)) rev=\(t.revision)")
    }

    // 3. 这个端点有哪些 Cluster
    let servers = try await descriptor.readAttributeServerList() as? [NSNumber] ?? []
}

// 或者：通配读取，一次拿回设备全部原始属性（三个参数都传 nil）
let all = try await device.readAttributes(withEndpointID: nil, clusterID: nil,
                                          attributeID: nil, params: nil, queue: .main)`,
        },
      },
      {
        id: 'limitations',
        title: '限制与注意事项',
        content: '<p>iOS Matter 开发中的关键限制：</p>',
        items: [
          {
            title: 'Thread 设备配网受限',
            desc: 'MatterSupport 扩展无法配网 Thread 设备（返回 "Thread Border Router Required" 错误），这是已知 Bug（FB15614070）。目前仅 Apple Home App 在 iOS 18+ 上支持 Thread 设备直连。',
          },
          {
            title: '开发者证书必装',
            desc: '"Bluetooth Central Matter Client Developer Mode" 证书必须安装在所有测试设备上（iPhone、HomePod、Apple TV），否则 BLE 配网静默失败。证书会定期过期需要续签。',
          },
          {
            title: 'TestFlight 配网问题',
            desc: 'TestFlight 构建的应用在未安装 Matter Client Developer Profile 的设备上可能配网失败。',
          },
          {
            title: '独立 Fabric 不可见',
            desc: '直接通过 Matter.framework 配网（不经过 Apple Home）会创建独立 Fabric，设备不会出现在 Apple Home 中。生产环境应使用 MatterSupport。',
          },
          {
            title: 'Thread 边界路由器需求',
            desc: 'Thread 设备需要 HomePod mini、HomePod 2 代或 Apple TV 4K 作为边界路由器。原版 HomePod 和 Apple TV HD 没有 Thread 射频。',
          },
          {
            title: 'API 风格为 Objective-C',
            desc: '所有 MTR* 类都是 Objective-C 接口，Swift 通过桥接调用。命令参数必须使用 Matter 特定的 data-value 字典格式。',
          },
        ],
      },
      {
        id: 'resources',
        title: '参考资源',
        links: [
          { name: 'Matter.framework 文档', url: 'https://developer.apple.com/documentation/matter', desc: 'Apple 官方 Matter 框架参考' },
          { name: 'MatterSupport 文档', url: 'https://developer.apple.com/documentation/mattersupport', desc: 'MatterSupport 扩展开发指南' },
          { name: '生态接入指南', url: 'https://developer.apple.com/documentation/mattersupport/adding-matter-support-to-your-ecosystem', desc: '第三方 App Matter 接入完整流程' },
          { name: 'WWDC21 Session', url: 'https://developer.apple.com/videos/play/wwdc2021/10298/', desc: '首次介绍 Matter 支持的 WWDC 视频' },
          { name: 'CHIPTool iOS', url: 'https://github.com/project-chip/connectedhomeip/tree/master/src/darwin/CHIPTool', desc: '开源 iOS Matter 控制器参考实现' },
          { name: 'ESP RainMaker iOS', url: 'https://github.com/espressif/esp-rainmaker-ios', desc: '乐鑫的 iOS Matter 参考实现' },
          { name: 'Apple 开发者论坛', url: 'https://developer.apple.com/forums/tags/matter', desc: 'Matter 相关讨论和问题解答' },
        ],
      },
    ],
  },

  web: {
    title: 'Web / Node.js Matter SDK 指南',
    description: '了解 matter.js 生态：浏览器的局限与 WebSocket 代理架构、Node.js 全功能控制器和设备桥接方案。',
    heroTitle: 'Web / Node.js Matter SDK',
    heroDesc: '基于 matter.js 的 Matter 开发指南，覆盖 Node.js 控制器、浏览器代理和设备桥接。',
    sections: [
      {
        id: 'overview',
        title: '概述',
        content: `<p><strong>matter.js</strong> 是 Matter 协议的纯 TypeScript 实现，由 Open Home Foundation 维护，可用于构建控制器、虚拟设备和桥接器。Home Assistant 2026.7 已将其作为 Matter 控制器投入生产。注意：matter.js 目前尚未获得 CSA 官方认证，认证工作仍在推进中。</p>
<p>关键点：<strong>浏览器无法直接与 Matter 设备通信</strong>（因为 Matter 使用 UDP 而浏览器不支持原始 UDP 套接字）。实际方案是 Node.js 服务端运行 matter.js，浏览器通过 WebSocket 代理控制。</p>`,
      },
      {
        id: 'architecture',
        title: '架构与模式',
        content: '<p>matter.js 生态中的核心包和使用模式：</p>',
        table: {
          headers: ['包名', '用途', '运行环境'],
          rows: [
            ['@matter/main', 'matter.js 主入口，Behavior API', 'Node.js / Bun'],
            ['@matter/nodejs', 'Node.js 平台适配器（UDP / mDNS / BLE）', 'Node.js'],
            ['@matter/node', 'ServerNode / Endpoint / Behavior', 'Node.js'],
            ['@matter-server/ws-client', '浏览器端 WebSocket 客户端', '浏览器 / Node.js'],
            ['@matter-server/ws-controller', '服务端 Matter 控制器', 'Node.js'],
            ['matterbridge', '基于插件的 Matter 桥接框架', 'Node.js'],
          ],
        },
      },
      {
        id: 'browser-limits',
        title: '浏览器限制',
        content: '<p>浏览器的安全模型从根本上阻止了 Matter 协议的直接运行：</p>',
        items: [
          {
            title: '无原始 UDP 套接字',
            desc: 'Matter 运行在 UDP 5540 端口上，浏览器无法访问原始 UDP 套接字。这是安全模型约束，不是缺少 API。',
          },
          {
            title: '无 mDNS/DNS-SD',
            desc: 'Matter 使用组播 DNS 发现设备，浏览器无法发送或接收组播 UDP 包。',
          },
          {
            title: 'BLE 能力不足',
            desc: 'Web Bluetooth 需要用户手势弹出设备选择器，无法实现 Matter 所需的静默 BLE 扫描和 PASE 会话。',
          },
          {
            title: '无 Thread 配置',
            desc: '浏览器没有 Thread 网络 API，无法配置 Thread 设备凭据。',
          },
        ],
      },
      {
        id: 'websocket-proxy',
        title: 'WebSocket 代理方案',
        content: '<p>matterjs-server 提供了经过生产验证的浏览器接入方案。Node.js 服务端持有完整的 Matter 控制器，浏览器通过 WebSocket 远程操作。</p>',
        codeExample: {
          language: 'typescript',
          title: '浏览器端设备控制',
          code: `import { MatterClient } from "@matter-server/ws-client";

// 连接到本地 matterjs-server
const client = new MatterClient("ws://localhost:5580/ws");
await client.startListening();

// 查看已配网的设备
const nodes = client.nodes;

// 发送设备命令：切换灯光 (endpoint 1, cluster 6 = OnOff)
await client.deviceCommand(nodeId, 1, 6, "toggle");

// 监听设备状态变化
client.addEventListener("nodes_changed", (event) => {
    console.log("状态变化:", event);
});`,
        },
      },
      {
        id: 'nodejs-controller',
        title: 'Node.js 控制器',
        content: '<p>在 Node.js 环境中，matter.js 可以直接运行完整的 Matter 控制器，无需任何代理层：</p>',
        codeExample: {
          language: 'typescript',
          title: 'Node.js 端设备控制',
          code: `import { CommissioningController } from "@matter/main";
import { OnOff } from "@matter/main/clusters";

// 创建并启动控制器
const controller = new CommissioningController({
    environment: { environment, id: "MyController" },
    autoConnect: true,
});
await controller.start();

// 获取已配网设备的端点
const node = controller.getNode(nodeId);
const endpoint = node.getEndpoint(1);

// 通过 Cluster API 控制设备
const onOffCluster = endpoint.getClusterClient(OnOff.Cluster);
await onOffCluster.toggle();`,
        },
      },
      {
        id: 'device-discovery',
        title: "读取设备类型与能力",
        content: "<p>matterjs-server 在配网后已经把设备的全部属性读好了，浏览器端直接从节点数据里按 <code>端点/Cluster/属性</code> 取值即可。这份数据粘进 <a href=\"../../tools/json-parser/\">JSON 解析器</a> 就能看到整理好的设备画像；字段含义见 <a href=\"../../concepts/#device-discovery\">概念总览 · 配网后怎么读出设备能力</a>。</p>",
        codeExample: {
          language: 'typescript',
          title: "从节点数据读设备类型与能力",
          code: `import { MatterClient } from "@matter-server/ws-client";

const client = new MatterClient("ws://localhost:5580/ws");
await client.startListening();

// 服务端在配网后会对设备做一次通配读取，节点数据里就是全部原始属性
// 键名为 "端点/Cluster/属性"（十进制），与 Home Assistant 诊断导出格式相同
const attrs = client.nodes[nodeId].attributes;

const endpoints = attrs["0/29/3"];          // Descriptor.PartsList → [1]
for (const ep of endpoints) {
  const types = attrs[\`\${ep}/29/0\`];        // DeviceTypeList → [{ "0": 10, "1": 3 }]  10 = 0x000A 门锁
  const servers = attrs[\`\${ep}/29/1\`];      // ServerList → [3, 29, 47, 257]
  console.log(ep, types, servers);
}

const vendorName = attrs["0/40/1"];         // BasicInformation.VendorName
const lockFeatures = attrs["1/257/65532"];  // DoorLock.FeatureMap`,
        },
      },
      {
        id: 'resources',
        title: '参考资源',
        links: [
          { name: 'matter.js 仓库', url: 'https://github.com/matter-js/matter.js/', desc: 'Open Home Foundation 维护的纯 TypeScript Matter 实现' },
          { name: 'matterjs-server', url: 'https://github.com/matter-js/matterjs-server', desc: 'Home Assistant 采用的 Matter 控制器服务' },
          { name: 'Matterbridge', url: 'https://matterbridge.io/', desc: '基于插件的 Matter 桥接框架，100+ 插件生态' },
          { name: 'matter.js API 文档', url: 'https://matter-js.github.io/docs/', desc: 'matter.js API 参考文档' },
          { name: 'Nanomatter', url: 'https://github.com/gabrielaleks/nanomatter', desc: '轻量级 Matter 控制器参考实现' },
          { name: 'HA 迁移博客', url: 'https://www.home-assistant.io/blog/2026/06/23/the-matter-upgrade-youve-been-waiting-for/', desc: 'Home Assistant 迁移到 matter.js 的技术博客' },
          { name: 'Matter 虚拟设备教程', url: 'https://www.matteralpha.com/how-to/what-is-matter-js-and-virtual-device-tutorial', desc: '用 matter.js 创建虚拟设备的教程' },
        ],
      },
    ],
  },
};
