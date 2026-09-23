import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'network-commissioning': {
    title: '网络配置 Cluster · NetworkCommissioning（0x0031）',
    description: 'Matter NetworkCommissioning Cluster（0x0031）完整参考 — Wi-Fi/Thread/Ethernet 网络扫描、凭据管理、连接控制命令详解，NetworkCommissioningStatusEnum 枚举速查，配网流程示例。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>网络配置 Cluster（NetworkCommissioning）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0031</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    NetworkCommissioning 是 Matter 设备配网过程中最关键的 Cluster，负责管理设备的网络凭据 —— 包括 Wi-Fi 密码、Thread 网络参数或以太网配置。
    Commissioner（手机 App）通过这个 Cluster 扫描设备周围的可用网络、写入网络凭据、指示设备连接到指定网络。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心定位</div>
    <p>
      这个 Cluster 是<strong>配网流程的基础设施</strong>。几乎所有 Matter 设备（除了纯以太网设备）都需要通过它完成网络接入。
      它不控制设备的业务功能，而是让设备「上网」—— 只有网络配置完成后，其他 Cluster 的远程操作才有意义。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 特性</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举与结构体</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">标准示例</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 特性 ====== -->
  <h2 id="features">Feature 特性（Feature Map）</h2>
  <p>
    NetworkCommissioning Cluster 通过 Feature Map 标识设备支持的网络接口类型。
    一个设备<strong>必须且只能</strong>支持以下三种特性之一（互斥关系）：
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">WI — WiFiNetworkInterface</span>
        <span class="enum-desc">设备支持 Wi-Fi 网络接口，可扫描 Wi-Fi 网络并存储 SSID + 密码</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TH — ThreadNetworkInterface</span>
        <span class="enum-desc">设备支持 Thread 网络接口，可扫描 Thread 网络并存储 Operational Dataset</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">ET — EthernetNetworkInterface</span>
        <span class="enum-desc">设备使用以太网连接，无需扫描或配置凭据（即插即用）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      以太网设备的 NetworkCommissioning Cluster 只有只读属性，不支持任何命令（没有扫描、添加网络等操作）。
      判断 Feature Map 是开发配网流程的第一步 —— 它决定了后续要调用哪些命令。
    </p>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    NetworkCommissioning 的命令分为两类：<strong>Client → Server</strong>（Commissioner 发给设备的请求）和
    <strong>Server → Client</strong>（设备返回的响应）。配网操作是请求-响应模式，每个请求命令都有对应的响应命令。
  </p>

  <h3>Client → Server（请求命令）</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>依赖 Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>ScanNetworks</td>
          <td>扫描周围可用网络</td>
          <td>WI 或 TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>AddOrUpdateWiFiNetwork</td>
          <td>添加或更新 Wi-Fi 网络凭据</td>
          <td>WI</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>AddOrUpdateThreadNetwork</td>
          <td>添加或更新 Thread 网络凭据</td>
          <td>TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>RemoveNetwork</td>
          <td>删除已存储的网络凭据</td>
          <td>WI 或 TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>ConnectNetwork</td>
          <td>指示设备连接到指定网络</td>
          <td>WI 或 TH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>ReorderNetwork</td>
          <td>调整网络优先级顺序</td>
          <td>WI 或 TH</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Server → Client（响应命令）</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>对应请求</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ScanNetworksResponse</td>
          <td>返回扫描结果列表</td>
          <td>ScanNetworks</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>NetworkConfigResponse</td>
          <td>返回网络配置操作结果</td>
          <td>Add / Remove / Reorder</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>ConnectNetworkResponse</td>
          <td>返回网络连接结果</td>
          <td>ConnectNetwork</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ScanNetworks —— 扫描网络（0x00）</h3>
  <p>
    指示设备扫描周围可用的 Wi-Fi 或 Thread 网络。这通常是配网流程的第一步 —— 让用户看到可以连接的网络列表。
    设备会返回 <a href="#cmd-0x01">ScanNetworksResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SSID</td>
          <td>OctetString / Nullable</td>
          <td>否</td>
          <td><code>null</code> = 扫描所有网络；指定值 = 只扫描匹配的 SSID（仅 Wi-Fi）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记，Commissioner 用来追踪配网步骤是否按预期执行</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>Commissioner（App）发起扫描后，设备会在 <code>ScanMaxTimeSeconds</code> 时间内完成扫描并返回结果。扫描期间设备可能无法处理其他命令。Wi-Fi 设备返回 <a href="#struct-wifi-scan">WiFiInterfaceScanResultStruct</a> 列表，Thread 设备返回 <a href="#struct-thread-scan">ThreadInterfaceScanResultStruct</a> 列表。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">ScanNetworksResponse —— 扫描结果（0x01）</h3>
  <p>
    设备完成网络扫描后返回的响应，包含扫描到的网络列表。Wi-Fi 和 Thread 设备返回的结构体不同。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>操作结果状态码</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息（如错误描述）</td>
        </tr>
        <tr>
          <td>WiFiScanResults</td>
          <td><a href="#struct-wifi-scan">WiFiInterfaceScanResultStruct</a>[]</td>
          <td>Wi-Fi 扫描结果列表（仅 WI feature）</td>
        </tr>
        <tr>
          <td>ThreadScanResults</td>
          <td><a href="#struct-thread-scan">ThreadInterfaceScanResultStruct</a>[]</td>
          <td>Thread 扫描结果列表（仅 TH feature）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">AddOrUpdateWiFiNetwork —— 添加/更新 Wi-Fi 网络（0x02）</h3>
  <p>
    向设备写入 Wi-Fi 网络凭据（SSID + 密码）。如果设备已存储相同 SSID 的凭据，则更新密码；否则新增一条。
    设备返回 <a href="#cmd-0x05">NetworkConfigResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SSID</td>
          <td>OctetString</td>
          <td>是</td>
          <td>目标 Wi-Fi 网络的 SSID（最长 32 字节）</td>
        </tr>
        <tr>
          <td>Credentials</td>
          <td>OctetString</td>
          <td>是</td>
          <td>Wi-Fi 密码（最长 64 字节）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记</td>
        </tr>
        <tr>
          <td>NetworkIdentity</td>
          <td>OctetString</td>
          <td>否</td>
          <td>网络身份标识（Matter 1.3+，用于 Per-Device Credentials）</td>
        </tr>
        <tr>
          <td>ClientIdentifier</td>
          <td>OctetString</td>
          <td>否</td>
          <td>客户端标识（Matter 1.3+，用于 Per-Device Credentials）</td>
        </tr>
        <tr>
          <td>PossessionNonce</td>
          <td>OctetString</td>
          <td>否</td>
          <td>持有者证明随机数（Matter 1.3+，用于 Per-Device Credentials）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>这是配网流程中写入 Wi-Fi 凭据的关键步骤。SSID 和密码都是 OctetString 类型（二进制），通常以 Base64 编码传输。注意：此命令<strong>只是存储凭据</strong>，不会立即连接 —— 需要后续发送 <a href="#cmd-0x06">ConnectNetwork</a> 才会真正连接。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">AddOrUpdateThreadNetwork —— 添加/更新 Thread 网络（0x03）</h3>
  <p>
    向设备写入 Thread 网络凭据（Operational Dataset）。Thread 的凭据是一个完整的 Operational Dataset，
    包含 PAN ID、Channel、Network Key 等信息。设备返回 <a href="#cmd-0x05">NetworkConfigResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalDataset</td>
          <td>OctetString</td>
          <td>是</td>
          <td>Thread Operational Dataset（TLV 编码的完整网络参数）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>Thread 网络的凭据不是简单的 SSID + 密码，而是一个包含多种参数的二进制数据块（Operational Dataset）。Commissioner 通常从 Thread Border Router 获取这个 Dataset，然后写入设备。同样需要后续 <a href="#cmd-0x06">ConnectNetwork</a> 才会真正加入 Thread 网络。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">RemoveNetwork —— 删除网络（0x04）</h3>
  <p>
    删除设备上已存储的网络凭据。通过 NetworkID 指定要删除的网络。设备返回 <a href="#cmd-0x05">NetworkConfigResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>是</td>
          <td>要删除的网络 ID（Wi-Fi 为 SSID，Thread 为 Extended PAN ID）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>用于切换网络时先移除旧凭据，或者恢复出厂设置前清理网络配置。如果删除的是当前连接的网络，设备会断开连接。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">NetworkConfigResponse —— 网络配置响应（0x05）</h3>
  <p>
    设备对 AddOrUpdateWiFiNetwork、AddOrUpdateThreadNetwork、RemoveNetwork、ReorderNetwork 命令的统一响应。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>操作结果状态码</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息</td>
        </tr>
        <tr>
          <td>NetworkIndex</td>
          <td>uint8</td>
          <td>被操作的网络在列表中的索引位置</td>
        </tr>
        <tr>
          <td>ClientIdentity</td>
          <td>OctetString</td>
          <td>客户端身份（Matter 1.3+，Per-Device Credentials 响应）</td>
        </tr>
        <tr>
          <td>PossessionSignature</td>
          <td>OctetString</td>
          <td>持有者证明签名（Matter 1.3+，Per-Device Credentials 响应）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">ConnectNetwork —— 连接网络（0x06）</h3>
  <p>
    指示设备连接到之前通过 AddOrUpdateWiFiNetwork / AddOrUpdateThreadNetwork 存储的网络。
    这是配网流程中让设备「真正上网」的那一步。设备返回 <a href="#cmd-0x07">ConnectNetworkResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>是</td>
          <td>要连接的网络 ID（必须是已存储的网络）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        发送 ConnectNetwork 后，设备会在 <code>ConnectMaxTimeSeconds</code> 时间内尝试连接。
        <strong>重要</strong>：连接过程中，Commissioner 和设备之间的 BLE 或现有通信链路可能会中断（因为设备切换到了新网络）。
        Commissioner 需要通过新网络重新发现并连接设备。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">ConnectNetworkResponse —— 连接结果（0x07）</h3>
  <p>
    设备返回的网络连接结果。如果连接失败，<code>ErrorValue</code> 会包含平台层的错误码，有助于排查问题。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkingStatus</td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a></td>
          <td>连接结果状态码</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息</td>
        </tr>
        <tr>
          <td>ErrorValue</td>
          <td>int32 / Nullable</td>
          <td>平台层错误码。Wi-Fi 为 <code>Status</code>（802.11 定义），Thread 为 <code>OperationalError</code>（Thread 协议定义）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">ErrorValue 的实际含义</div>
    <p>
      <code>ErrorValue</code> 不是 Matter 定义的错误码，而是底层平台（Wi-Fi 芯片驱动或 Thread 协议栈）返回的原始错误码。
      Wi-Fi 场景下常见的值包括：密码错误（认证失败）、信号太弱（超时）、DHCP 失败等。
      需要结合具体芯片平台的文档来解读。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x08">ReorderNetwork —— 调整网络优先级（0x08）</h3>
  <p>
    调整已存储网络的优先级顺序。设备在重启或网络切换时，会按优先级从高到低尝试连接。
    设备返回 <a href="#cmd-0x05">NetworkConfigResponse</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString</td>
          <td>是</td>
          <td>要调整位置的网络 ID</td>
        </tr>
        <tr>
          <td>NetworkIndex</td>
          <td>uint8</td>
          <td>是</td>
          <td>目标位置索引（0 = 最高优先级）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>否</td>
          <td>配网进度标记</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>当设备存储了多个网络凭据时（MaxNetworks > 1），可以通过此命令调整连接优先级。大多数消费级设备 MaxNetworks 为 1，此命令较少使用。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>NetworkCommissioning Cluster 的属性描述了网络接口的能力和当前状态。点击下方汇总表中的属性 ID 可跳转到详细说明。</p>

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
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>MaxNetworks</td>
          <td>uint8</td>
          <td><a href="#attr-capacity">网络容量</a></td>
          <td>最大可存储网络数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>Networks</td>
          <td>list&lt;NetworkInfoStruct&gt;</td>
          <td><a href="#attr-capacity">网络容量</a></td>
          <td>已配置的网络列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ScanMaxTimeSeconds</td>
          <td>uint8</td>
          <td><a href="#attr-timing">时间参数</a></td>
          <td>扫描最大耗时（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>ConnectMaxTimeSeconds</td>
          <td>uint8</td>
          <td><a href="#attr-timing">时间参数</a></td>
          <td>连接最大耗时（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>InterfaceEnabled</td>
          <td>bool</td>
          <td><a href="#attr-status">接口状态</a></td>
          <td>网络接口是否启用</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>LastNetworkingStatus</td>
          <td>enum8 / null</td>
          <td><a href="#attr-status">接口状态</a></td>
          <td>上次网络操作的结果状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>LastNetworkID</td>
          <td>octstr / null</td>
          <td><a href="#attr-status">接口状态</a></td>
          <td>上次操作涉及的网络 ID</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>LastConnectErrorValue</td>
          <td>int32 / null</td>
          <td><a href="#attr-status">接口状态</a></td>
          <td>上次连接失败的平台层错误码</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>SupportedWiFiBands</td>
          <td>list&lt;WiFiBandEnum&gt;</td>
          <td><a href="#attr-wifi-extra">Wi-Fi 扩展</a></td>
          <td>支持的 Wi-Fi 频段列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>SupportedThreadFeatures</td>
          <td>bitmap16</td>
          <td><a href="#attr-thread-extra">Thread 扩展</a></td>
          <td>支持的 Thread 特性位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>ThreadVersion</td>
          <td>uint16</td>
          <td><a href="#attr-thread-extra">Thread 扩展</a></td>
          <td>Thread 协议版本</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性分组详解 -->

  <h3 id="attr-capacity">网络容量（0x00-0x01）</h3>
  <p>描述设备能存储多少个网络凭据，以及当前已配置了哪些网络。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>MaxNetworks<br/><span class="attr-cn">最大网络数</span></td>
          <td>uint8</td>
          <td>设备最多可存储的网络凭据数量。大多数消费级设备为 <code>1</code></td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>Networks<br/><span class="attr-cn">网络列表</span></td>
          <td>list&lt;NetworkInfoStruct&gt;</td>
          <td>已配置的网络凭据列表。每项包含 NetworkID（Wi-Fi 的 SSID 或 Thread 的 Extended PAN ID）和连接状态</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NetworkInfoStruct 结构体</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NetworkID</td>
          <td>OctetString (1-32 字节)</td>
          <td>网络标识。Wi-Fi 为 SSID，Thread 为 Extended PAN ID</td>
        </tr>
        <tr>
          <td>Connected</td>
          <td>bool</td>
          <td>是否当前已连接到此网络</td>
        </tr>
        <tr>
          <td>NetworkIdentifier</td>
          <td>OctetString</td>
          <td>可选，网络身份标识（Matter 1.3+）</td>
        </tr>
        <tr>
          <td>ClientIdentifier</td>
          <td>OctetString</td>
          <td>可选，客户端标识（Matter 1.3+）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      Networks 列表<strong>不包含密码</strong> —— 出于安全考虑，网络凭据一旦写入设备就无法读回。
      你只能看到网络的 ID 和连接状态，无法获取密码原文。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-timing">时间参数（0x02-0x03）</h3>
  <p>定义扫描和连接操作的最大耗时，帮助 Commissioner 设置合理的超时等待。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>ScanMaxTimeSeconds<br/><span class="attr-cn">扫描超时</span></td>
          <td>uint8</td>
          <td>设备完成网络扫描的最大时间（秒）。Commissioner 应至少等待这么长时间再判定超时</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>ConnectMaxTimeSeconds<br/><span class="attr-cn">连接超时</span></td>
          <td>uint8</td>
          <td>设备完成网络连接的最大时间（秒）。包括 DHCP 获取 IP 的时间</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">超时设置建议</div>
    <p>
      实际开发中，App 端的超时时间应该设置为 <code>ScanMaxTimeSeconds + 适当余量</code>（如 +5 秒）。
      Wi-Fi 设备的扫描通常在 10-30 秒内完成，Thread 设备可能更快。
      连接超时一般在 30-120 秒，取决于网络环境和 DHCP 响应速度。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-status">接口状态（0x04-0x07）</h3>
  <p>网络接口的启用状态和上次操作结果，是排查配网问题的核心信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>InterfaceEnabled<br/><span class="attr-cn">接口启用</span></td>
          <td>bool</td>
          <td>网络接口是否启用。<code>false</code> 时设备不会连接任何网络，扫描和连接命令也可能被拒绝</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>LastNetworkingStatus<br/><span class="attr-cn">上次操作状态</span></td>
          <td><a href="#enum-status">NetworkCommissioningStatusEnum</a> / null</td>
          <td>上次网络操作的结果状态码。<code>null</code> 表示尚未执行过任何网络操作</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>LastNetworkID<br/><span class="attr-cn">上次操作网络</span></td>
          <td>OctetString / null</td>
          <td>上次网络操作涉及的网络 ID。配合 LastNetworkingStatus 可定位是哪个网络出了问题</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>LastConnectErrorValue<br/><span class="attr-cn">上次连接错误码</span></td>
          <td>int32 / null</td>
          <td>上次 ConnectNetwork 失败时的平台层错误码。<code>null</code> 表示无错误或尚未执行过连接</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">排查配网失败</div>
    <p>
      配网失败时，优先读取这三个「Last*」属性：<code>LastNetworkingStatus</code> 告诉你大类原因（密码错误？网络找不到？），
      <code>LastNetworkID</code> 确认是哪个网络，<code>LastConnectErrorValue</code> 给出底层的具体错误码。
      三者配合使用，能快速定位绝大多数配网问题。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-wifi-extra">Wi-Fi 扩展（0x08）</h3>
  <p>Matter 1.3 新增的 Wi-Fi 相关属性，仅当 Feature Map 包含 WI 时存在。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>SupportedWiFiBands<br/><span class="attr-cn">支持的 Wi-Fi 频段</span></td>
          <td>list&lt;<a href="#enum-wifiband">WiFiBandEnum</a>&gt;</td>
          <td>设备支持的 Wi-Fi 频段列表（如 2.4GHz、5GHz）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-thread-extra">Thread 扩展（0x09-0x0A）</h3>
  <p>Matter 1.3 新增的 Thread 相关属性，仅当 Feature Map 包含 TH 时存在。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>SupportedThreadFeatures<br/><span class="attr-cn">Thread 特性支持</span></td>
          <td>bitmap16</td>
          <td>设备支持的 Thread 协议特性位图</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>ThreadVersion<br/><span class="attr-cn">Thread 版本</span></td>
          <td>uint16</td>
          <td>设备支持的 Thread 协议版本号</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举与结构体 ====== -->
  <h2 id="enums">枚举与结构体</h2>

  <h3 id="enum-status">NetworkCommissioningStatusEnum</h3>
  <p>所有网络操作命令的响应都会包含这个状态码，用于表示操作结果。这是排查配网问题时最先看的字段。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">操作成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OutOfRange</span>
        <span class="enum-desc">值超出有效范围</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BoundsExceeded</span>
        <span class="enum-desc">已达网络存储上限（MaxNetworks）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NetworkIDNotFound</span>
        <span class="enum-desc">指定的网络 ID 在已存储列表中找不到</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">DuplicateNetworkID</span>
        <span class="enum-desc">网络 ID 重复（已存在相同 ID）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NetworkNotFound</span>
        <span class="enum-desc">扫描或连接时找不到目标网络（不在空中）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">RegulatoryError</span>
        <span class="enum-desc">因法规限制无法使用该网络（如频段在当前国家/地区不合规）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">AuthFailure</span>
        <span class="enum-desc">认证失败（通常是 Wi-Fi 密码错误）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">UnsupportedSecurity</span>
        <span class="enum-desc">不支持目标网络的安全协议（如设备不支持 WPA3）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">OtherConnectionFailure</span>
        <span class="enum-desc">其他连接失败（不属于以上任何类别）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">IPV6Failed</span>
        <span class="enum-desc">IPv6 地址获取失败</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">IPBindFailed</span>
        <span class="enum-desc">IP 地址绑定失败</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">UnknownError</span>
        <span class="enum-desc">未知错误</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见错误速查</div>
    <p>
      <strong>密码错了</strong> → <code>7 (AuthFailure)</code>；
      <strong>网络名写错或路由器关了</strong> → <code>5 (NetworkNotFound)</code>；
      <strong>网络存满了</strong> → <code>2 (BoundsExceeded)</code>；
      <strong>设备不支持 5GHz</strong> → 扫描结果里就没有该网络，硬连可能得到 <code>8 (UnsupportedSecurity)</code> 或 <code>9 (OtherConnectionFailure)</code>。
    </p>
  </div>

  <h3 id="enum-wifiband">WiFiBandEnum</h3>
  <p>标识 Wi-Fi 工作频段，用于扫描结果和 SupportedWiFiBands 属性。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">2G4</span>
        <span class="enum-desc">2.4 GHz 频段（802.11b/g/n）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">3G65</span>
        <span class="enum-desc">3.65 GHz 频段</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">5G</span>
        <span class="enum-desc">5 GHz 频段（802.11a/n/ac）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">6G</span>
        <span class="enum-desc">6 GHz 频段（802.11ax / Wi-Fi 6E）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">60G</span>
        <span class="enum-desc">60 GHz 频段（802.11ad / WiGig）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">1G</span>
        <span class="enum-desc">Sub-1 GHz 频段（802.11ah / Wi-Fi HaLow）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-wifi-security">WiFiSecurityBitmap</h3>
  <p>Wi-Fi 网络的安全类型位图，一个网络可以同时支持多种安全协议（多个 bit 为 1）。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Unencrypted</span>
        <span class="enum-desc">开放网络，无加密</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">WEP</span>
        <span class="enum-desc">WEP 加密（已不安全，逐步淘汰）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">WPA-PERSONAL</span>
        <span class="enum-desc">WPA 个人版（PSK）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">WPA2-PERSONAL</span>
        <span class="enum-desc">WPA2 个人版（PSK），目前最常见</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">WPA3-PERSONAL</span>
        <span class="enum-desc">WPA3 个人版（SAE），更安全的新标准</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">位图读取示例</div>
    <p>
      扫描结果中 <code>security = 12</code>（二进制 <code>01100</code>）表示该网络同时支持 WPA2-PERSONAL（Bit 3）和 WPA-PERSONAL（Bit 2）。
      值为 <code>4</code>（二进制 <code>00100</code>）表示只支持 WPA-PERSONAL。
    </p>
  </div>

  <h3 id="struct-wifi-scan">WiFiInterfaceScanResultStruct</h3>
  <p>Wi-Fi 扫描结果中每个网络的详细信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Security</td>
          <td><a href="#enum-wifi-security">WiFiSecurityBitmap</a></td>
          <td>安全类型位图</td>
        </tr>
        <tr>
          <td>SSID</td>
          <td>OctetString (0-32 字节)</td>
          <td>网络名称</td>
        </tr>
        <tr>
          <td>BSSID</td>
          <td>OctetString (6 字节)</td>
          <td>接入点 MAC 地址</td>
        </tr>
        <tr>
          <td>Channel</td>
          <td>uint16</td>
          <td>Wi-Fi 信道号</td>
        </tr>
        <tr>
          <td>WiFiBand</td>
          <td><a href="#enum-wifiband">WiFiBandEnum</a></td>
          <td>工作频段（2.4G / 5G 等）</td>
        </tr>
        <tr>
          <td>RSSI</td>
          <td>int8</td>
          <td>信号强度（dBm），值越大信号越好（通常 -30 极好，-70 一般，-90 很差）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#enums">&#8593; 返回枚举列表</a></p>

  <h3 id="struct-thread-scan">ThreadInterfaceScanResultStruct</h3>
  <p>Thread 扫描结果中每个网络的详细信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PanId</td>
          <td>uint16</td>
          <td>Personal Area Network ID（PAN 标识）</td>
        </tr>
        <tr>
          <td>ExtendedPanId</td>
          <td>uint64</td>
          <td>Extended PAN ID（全局唯一网络标识）</td>
        </tr>
        <tr>
          <td>NetworkName</td>
          <td>String (1-16 字符)</td>
          <td>Thread 网络名称</td>
        </tr>
        <tr>
          <td>Channel</td>
          <td>uint16</td>
          <td>Thread 信道号</td>
        </tr>
        <tr>
          <td>Version</td>
          <td>uint8</td>
          <td>Thread 协议版本</td>
        </tr>
        <tr>
          <td>ExtendedAddress</td>
          <td>OctetString (8 字节)</td>
          <td>设备扩展 MAC 地址（IEEE EUI-64）</td>
        </tr>
        <tr>
          <td>RSSI</td>
          <td>int8</td>
          <td>信号强度（dBm）</td>
        </tr>
        <tr>
          <td>LQI</td>
          <td>uint8</td>
          <td>Link Quality Indicator（链路质量指标，0-255，越大越好）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#enums">&#8593; 返回枚举列表</a></p>

  <!-- ====== 标准示例 ====== -->
  <h2 id="standard-example">标准示例</h2>

  <h3>属性数据示例</h3>
  <p>以下是一个已配网的 Wi-Fi 设备的典型属性数据：</p>
  <pre><code>{
  // --- 网络容量 ---
  "0x00": 1,             // MaxNetworks = 1（最多存 1 个网络凭据）
  "0x01": [{             // Networks = 已配置的网络列表
    "networkID": "TXlIb21lV2lGaQ==",  // Base64 编码的 SSID
    "connected": true                   // 当前已连接
  }],

  // --- 扫描与连接超时 ---
  "0x02": 30,            // ScanMaxTimeSeconds = 30 秒
  "0x03": 60,            // ConnectMaxTimeSeconds = 60 秒

  // --- 接口状态 ---
  "0x04": true,          // InterfaceEnabled = true（网络接口已启用）

  // --- 上次操作结果 ---
  "0x05": 0,             // LastNetworkingStatus = Success
  "0x06": "TXlIb21lV2lGaQ==",  // LastNetworkID（上次操作的网络 ID）
  "0x07": null           // LastConnectErrorValue = null（无错误）
}</code></pre>

  <h3>扫描网络流程示例</h3>
  <p>Commissioner 发起 Wi-Fi 扫描并获取结果：</p>
  <pre><code>// Commissioner → Device：扫描 Wi-Fi 网络
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0031",
      "commandId": "0x00"        // ScanNetworks
    },
    "commandFields": {
      "ssid": null,              // null = 扫描所有网络
      "breadcrumb": 1            // 配网进度标记
    }
  }]
}

// Device → Commissioner：返回扫描结果
{
  "networkingStatus": 0,         // Success
  "wiFiScanResults": [
    {
      "security": 4,             // WPA2-Personal
      "ssid": "MyHomeWiFi",
      "bssid": "AA:BB:CC:DD:EE:FF",
      "channel": 6,
      "wiFiBand": 0,             // 2.4GHz
      "rssi": -45
    },
    {
      "security": 8,             // WPA3-Personal
      "ssid": "Office5G",
      "bssid": "11:22:33:44:55:66",
      "channel": 36,
      "wiFiBand": 1,             // 5GHz
      "rssi": -62
    }
  ]
}</code></pre>

  <h3>添加 Wi-Fi 网络示例</h3>
  <p>向设备写入 Wi-Fi 凭据：</p>
  <pre><code>// 添加 Wi-Fi 网络凭据
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0031",
      "commandId": "0x02"        // AddOrUpdateWiFiNetwork
    },
    "commandFields": {
      "ssid": "TXlIb21lV2lGaQ==",  // "MyHomeWiFi" 的 Base64
      "credentials": "cGFzc3dvcmQ=", // 密码的 Base64
      "breadcrumb": 2
    }
  }]
}

// 设备回复 NetworkConfigResponse
{
  "networkingStatus": 0,         // Success
  "networkIndex": 0              // 存储在索引 0
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      SSID 和密码在 Matter 协议中都是 <strong>OctetString</strong>（字节数组），传输时通常使用 Base64 编码。
      上面示例中的 <code>"TXlIb21lV2lGaQ=="</code> 解码后就是 <code>"MyHomeWiFi"</code>。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：Wi-Fi 设备配网完整流程</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner 通过 BLE 与设备建立 PASE 安全通道</li>
        <li>读取 <code>FeatureMap</code> 确认是 Wi-Fi 设备（Bit 0 = 1）</li>
        <li>读取 <code>ScanMaxTimeSeconds (0x02)</code> 获取扫描超时</li>
        <li>发送 <a href="#cmd-0x00"><code>ScanNetworks (0x00)</code></a>，SSID 传 <code>null</code> 扫描所有网络</li>
        <li>收到 <a href="#cmd-0x01"><code>ScanNetworksResponse (0x01)</code></a>，展示 Wi-Fi 列表给用户</li>
        <li>用户选择网络并输入密码</li>
        <li>发送 <a href="#cmd-0x02"><code>AddOrUpdateWiFiNetwork (0x02)</code></a> 写入 SSID + 密码</li>
        <li>收到 <a href="#cmd-0x05"><code>NetworkConfigResponse (0x05)</code></a>，确认 <code>NetworkingStatus = 0 (Success)</code></li>
        <li>发送 <a href="#cmd-0x06"><code>ConnectNetwork (0x06)</code></a> 指示设备连接</li>
        <li>设备连接 Wi-Fi，通过 <a href="#cmd-0x07"><code>ConnectNetworkResponse (0x07)</code></a> 返回结果</li>
        <li>Commissioner 通过 Wi-Fi 网络重新发现设备，继续后续配网步骤（NOC 证书安装等）</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：Thread 设备配网</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner 通过 BLE 与设备建立 PASE 安全通道</li>
        <li>读取 <code>FeatureMap</code> 确认是 Thread 设备（Bit 1 = 1）</li>
        <li>Commissioner 从 Thread Border Router 获取 Operational Dataset</li>
        <li>发送 <a href="#cmd-0x03"><code>AddOrUpdateThreadNetwork (0x03)</code></a> 写入 Dataset</li>
        <li>发送 <a href="#cmd-0x06"><code>ConnectNetwork (0x06)</code></a> 指示设备加入 Thread 网络</li>
        <li>设备加入 Thread 网络后，Commissioner 通过 Thread 网络继续配网</li>
      </ol>
      <p>注意：Thread 配网通常不需要先扫描，因为 Dataset 已经包含了目标网络的全部参数。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：配网失败排查</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>LastNetworkingStatus (0x05)</code> 查看错误类型</li>
        <li>读取 <code>LastNetworkID (0x06)</code> 确认是哪个网络</li>
        <li>读取 <code>LastConnectErrorValue (0x07)</code> 获取平台层错误码</li>
      </ol>
      <p>常见问题对照：</p>
      <ul>
        <li><strong>Status = 7 (AuthFailure)</strong>：密码错误，让用户重新输入</li>
        <li><strong>Status = 5 (NetworkNotFound)</strong>：网络不在范围内，检查路由器是否开启、信号是否太弱</li>
        <li><strong>Status = 10 (IPV6Failed)</strong>：路由器可能不支持 IPv6，检查路由器设置</li>
        <li><strong>Status = 8 (UnsupportedSecurity)</strong>：设备不支持目标网络的加密方式，检查 SupportedWiFiBands 和扫描结果</li>
      </ul>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：切换 Wi-Fi 网络</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>Networks (0x01)</code> 查看当前已存储的网络</li>
        <li>读取 <code>MaxNetworks (0x00)</code>，如果只能存 1 个，需要先删除旧网络</li>
        <li>发送 <a href="#cmd-0x04"><code>RemoveNetwork (0x04)</code></a> 删除旧凭据</li>
        <li>按照场景 1 的流程添加并连接新网络</li>
      </ol>
      <p>注意：删除当前连接的网络会导致设备断网。如果 MaxNetworks > 1，可以先添加新网络再删除旧网络，减少断网时间。</p>
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

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'general-commissioning': {
    title: '通用配网 Cluster · GeneralCommissioning（0x0030）',
    description: 'Matter GeneralCommissioning Cluster（0x0030）完整参考 — ArmFailSafe / SetRegulatoryConfig / CommissioningComplete 命令详解、Fail-Safe 机制、法规配置、配网流程与错误恢复场景。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>通用配网 Cluster（GeneralCommissioning）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0030</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    GeneralCommissioning 是 Matter 配网（Commissioning）流程的总控 Cluster —— 负责管理整个配网过程的生命周期。
    它不处理具体的网络凭据（那是 <a href="../network-commissioning/">NetworkCommissioning</a> 的事），
    而是控制配网流程的「开始」「推进」和「结束」，并通过 Fail-Safe 机制保证配网失败时设备能安全回滚。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心定位</div>
    <p>
      如果把配网流程比作一次数据库事务，GeneralCommissioning 就是负责 <code>BEGIN</code> / <code>COMMIT</code> / <code>ROLLBACK</code> 的那个角色。
      <strong>ArmFailSafe</strong> 相当于 <code>BEGIN</code>（开启事务），<strong>CommissioningComplete</strong> 相当于 <code>COMMIT</code>（提交事务），
      而 Fail-Safe 超时则自动触发 <code>ROLLBACK</code>（回滚所有变更）。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举定义</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    GeneralCommissioning Cluster 共有 3 个请求命令，每个都有对应的响应命令。
    这三个命令构成了配网流程的骨架：先启动安全计时器，再设置法规配置，最后提交完成。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <h3>Client → Server（请求命令）</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>响应</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>ArmFailSafe</td>
          <td>启动/续期 Fail-Safe 计时器</td>
          <td>ArmFailSafeResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>SetRegulatoryConfig</td>
          <td>设置设备的法规区域配置</td>
          <td>SetRegulatoryConfigResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>CommissioningComplete</td>
          <td>确认配网完成，提交所有变更</td>
          <td>CommissioningCompleteResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Server → Client（响应命令）</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>对应请求</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x01</code></td>
          <td>ArmFailSafeResponse</td>
          <td>返回 Fail-Safe 启动结果</td>
          <td>ArmFailSafe</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>SetRegulatoryConfigResponse</td>
          <td>返回法规配置结果</td>
          <td>SetRegulatoryConfig</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>CommissioningCompleteResponse</td>
          <td>返回配网完成结果</td>
          <td>CommissioningComplete</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ArmFailSafe —— 启动 Fail-Safe（0x00）</h3>
  <p>
    启动或续期 Fail-Safe 计时器。这是配网流程的<strong>第一步</strong> —— 在做任何配网操作之前，必须先调用它开启安全保护。
    Fail-Safe 计时器一旦启动，设备会进入「可配网」状态；如果计时器超时而配网未完成（未收到 CommissioningComplete），
    设备会<strong>自动回滚所有已执行的配网变更</strong>，恢复到配网前的状态。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ExpiryLengthSeconds</td>
          <td>uint16</td>
          <td>Fail-Safe 超时秒数。设为 <code>0</code> 表示立即取消当前 Fail-Safe（主动回滚）</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>配网进度标记，写入设备的 Breadcrumb 属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ArmFailSafeResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>操作结果</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Fail-Safe 的核心约束</div>
    <p>
      <strong>ExpiryLengthSeconds</strong> 不能超过 <code>BasicCommissioningInfo.MaxCumulativeFailsafeSeconds</code>（通常 900 秒 = 15 分钟）。
      超过此上限会返回 <code>ValueOutsideRange</code> 错误。
      此外，同一时间只有一个 Commissioner 能持有 Fail-Safe —— 如果另一个 Commissioner 已经在配网，
      会返回 <code>BusyWithOtherAdmin</code>。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        Commissioner（App）在开始配网时调用 ArmFailSafe 启动计时器。
        如果配网过程耗时较长（比如等用户输入 Wi-Fi 密码），可以在超时前再次调用 ArmFailSafe 续期。
        将 ExpiryLengthSeconds 设为 <code>0</code> 是主动放弃配网的方式 —— 设备会立即回滚所有变更。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">SetRegulatoryConfig —— 设置法规配置（0x02）</h3>
  <p>
    设置设备的法规区域（室内/室外）和国家代码。不同国家和地区对无线电设备有不同的法规要求（如发射功率、可用频段），
    设备需要根据法规配置来调整自己的无线参数。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewRegulatoryConfig</td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>目标法规配置（Indoor / Outdoor / IndoorOutdoor）</td>
        </tr>
        <tr>
          <td>CountryCode</td>
          <td>String (2 字符)</td>
          <td>ISO 3166-1 alpha-2 国家代码（如 <code>"CN"</code>、<code>"US"</code>）。<code>"XX"</code> 表示不指定</td>
        </tr>
        <tr>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td>配网进度标记</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SetRegulatoryConfigResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>操作结果</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">法规配置与设备能力</div>
    <p>
      设置的 <code>NewRegulatoryConfig</code> 不能超出设备的 <code>LocationCapability</code>。
      例如：如果设备的 LocationCapability 是 <code>Indoor</code>（仅支持室内），
      你不能把 RegulatoryConfig 设置为 <code>Outdoor</code>，否则会返回 <code>ValueOutsideRange</code>。
      大多数消费级设备的 LocationCapability 都是 <code>IndoorOutdoor</code>（不限制），所以这个检查很少失败。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        在 ArmFailSafe 之后、CommissioningComplete 之前调用。通常 Commissioner 会自动获取用户的地理位置，
        填入对应的国家代码。如果无法确定位置，可以使用 <code>"XX"</code> 表示不指定。
        法规配置影响设备可使用的 Wi-Fi 信道和发射功率，设置错误可能导致设备无法连接某些网络。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">CommissioningComplete —— 完成配网（0x04）</h3>
  <p>
    配网流程的<strong>最后一步</strong>。调用成功后，设备会：
  </p>
  <ol>
    <li>停止 Fail-Safe 计时器</li>
    <li>永久保存所有配网期间的变更（网络凭据、NOC 证书、ACL 权限等）</li>
    <li>将 Breadcrumb 重置为 <code>0</code></li>
  </ol>
  <p>
    此命令<strong>没有参数</strong>。只有当前持有 Fail-Safe 的 Commissioner 才能调用它。
  </p>

  <h4>CommissioningCompleteResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorCode</td>
          <td><a href="#enum-error">CommissioningErrorEnum</a></td>
          <td>操作结果</td>
        </tr>
        <tr>
          <td>DebugText</td>
          <td>String</td>
          <td>可选的调试信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">调用前提</div>
    <p>
      CommissioningComplete 必须在 Fail-Safe 激活状态下调用，并且调用者必须是启动 Fail-Safe 的同一个 Commissioner。
      如果没有活跃的 Fail-Safe，会返回 <code>NoFailSafe</code> 错误；
      如果是另一个 Commissioner 调用，会返回 <code>InvalidAuthentication</code>。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        所有配网步骤（网络配置、NOC 证书安装、ACL 权限设置等）都完成后，发送此命令锁定变更。
        一旦调用成功，设备就正式加入 Matter Fabric，可以被 Fabric 内的控制器管理。
        如果此命令失败或未发送，Fail-Safe 超时后设备会自动回滚，一切恢复原样。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>GeneralCommissioning Cluster 共有 5 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Breadcrumb</td>
          <td>uint64</td>
          <td><a href="#group-tracking">配网追踪</a></td>
          <td>Commissioner 设置的进度标记</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>BasicCommissioningInfo</td>
          <td>struct</td>
          <td><a href="#group-info">基础配网信息</a></td>
          <td>Fail-Safe 超时参数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>RegulatoryConfig</td>
          <td>RegulatoryLocationTypeEnum</td>
          <td><a href="#group-regulatory">法规配置</a></td>
          <td>当前法规区域配置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>LocationCapability</td>
          <td>RegulatoryLocationTypeEnum</td>
          <td><a href="#group-regulatory">法规配置</a></td>
          <td>设备支持的法规区域能力</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>SupportsConcurrentConnection</td>
          <td>bool</td>
          <td><a href="#group-connection">连接能力</a></td>
          <td>是否支持配网期间并发连接</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 配网追踪（0x0000）====== -->
  <h3 id="group-tracking">配网追踪（0x0000）</h3>
  <p>用于 Commissioner 追踪配网流程的推进状态。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Breadcrumb<br/><span class="attr-cn">进度标记</span></td>
          <td>uint64</td>
          <td>
            由 Commissioner 通过命令参数写入的进度追踪值。
            每个配网命令（ArmFailSafe、SetRegulatoryConfig 等）都带有 Breadcrumb 参数，
            执行成功后设备会更新此属性。Commissioner 可以读取它来确认上一步命令是否真正生效。
            配网完成（CommissioningComplete）后自动重置为 <code>0</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Breadcrumb 的实际用途</div>
    <p>
      Breadcrumb 是一个简单但实用的「已执行到哪一步」标记。
      例如 Commissioner 在 ArmFailSafe 时设 Breadcrumb = 1，SetRegulatoryConfig 时设为 2，写入网络凭据时设为 3。
      如果配网中途出错需要重试，读取 Breadcrumb 就知道上次执行到了第几步，可以从断点继续而不必从头来过。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 基础配网信息（0x0001）====== -->
  <h3 id="group-info">基础配网信息（0x0001）</h3>
  <p>描述设备的 Fail-Safe 时间限制，Commissioner 据此设置合理的超时参数。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>BasicCommissioningInfo<br/><span class="attr-cn">基础配网信息</span></td>
          <td>struct</td>
          <td>包含 Fail-Safe 超时的关键参数（见下方结构体）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>BasicCommissioningInfo 结构体</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>FailSafeExpiryLengthSeconds</td>
          <td>uint16</td>
          <td>Fail-Safe 默认超时秒数。Commissioner 通常在 ArmFailSafe 命令中使用此值</td>
        </tr>
        <tr>
          <td>MaxCumulativeFailsafeSeconds</td>
          <td>uint16</td>
          <td>Fail-Safe 的最大累计时长。ArmFailSafe 的 ExpiryLengthSeconds 不能超过此值，否则返回 ValueOutsideRange</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">典型值</div>
    <p>
      大多数设备的 <code>FailSafeExpiryLengthSeconds</code> 为 60 秒，<code>MaxCumulativeFailsafeSeconds</code> 为 900 秒（15 分钟）。
      这意味着单次 ArmFailSafe 最长可设 900 秒。如果配网流程需要更长时间（如等用户操作），
      Commissioner 需要在超时前重新调用 ArmFailSafe 续期，但总时长不能超过 900 秒。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 法规配置（0x0002, 0x0003）====== -->
  <h3 id="group-regulatory">法规配置（0x0002, 0x0003）</h3>
  <p>描述设备的法规区域配置及其能力限制。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>RegulatoryConfig<br/><span class="attr-cn">当前法规配置</span></td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>设备当前的法规区域设置。通过 <a href="#cmd-0x02">SetRegulatoryConfig</a> 命令修改</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>LocationCapability<br/><span class="attr-cn">区域能力</span></td>
          <td><a href="#enum-location">RegulatoryLocationTypeEnum</a></td>
          <td>设备硬件支持的法规区域范围。RegulatoryConfig 的取值不能超出此能力。只读属性，由设备固件决定</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际开发中，大多数消费级 Matter 设备的 <code>LocationCapability</code> 都是 <code>IndoorOutdoor (2)</code>，
      对应地 <code>RegulatoryConfig</code> 也默认设为 <code>IndoorOutdoor</code>。
      只有工业级或特殊用途的设备才会限制为纯 Indoor 或纯 Outdoor。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 连接能力（0x0004）====== -->
  <h3 id="group-connection">连接能力（0x0004）</h3>
  <p>描述设备在配网期间的网络连接能力。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>SupportsConcurrentConnection<br/><span class="attr-cn">支持并发连接</span></td>
          <td>bool</td>
          <td>
            设备是否能在配网期间同时维持多个网络连接。
            <code>true</code> = 设备可以在连接 Wi-Fi 的同时保持 BLE 通道（大多数设备）；
            <code>false</code> = 设备连接 Wi-Fi 后会断开 BLE，Commissioner 需要通过 Wi-Fi 网络重新发现设备
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">SupportsConcurrentConnection = false 的影响</div>
    <p>
      当此属性为 <code>false</code> 时，Commissioner 在发送 <code>ConnectNetwork</code> 后会失去与设备的通信。
      此时 Commissioner 需要：
      (1) 通过 mDNS 在目标网络上重新发现设备；
      (2) 建立 CASE 安全通道（因为 PASE 通道已断开）；
      (3) 然后才能继续发送 <code>CommissioningComplete</code>。
      这增加了配网流程的复杂性和耗时。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-error">CommissioningErrorEnum</h3>
  <p>所有 GeneralCommissioning 命令的响应都包含此错误码，用于表示操作结果。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">操作成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ValueOutsideRange</span>
        <span class="enum-desc">参数值超出允许范围（如 ExpiryLengthSeconds 超过上限，或 RegulatoryConfig 超出设备能力）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidAuthentication</span>
        <span class="enum-desc">认证无效 —— 调用者不是启动 Fail-Safe 的那个 Commissioner</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NoFailSafe</span>
        <span class="enum-desc">没有活跃的 Fail-Safe —— 在未调用 ArmFailSafe 的情况下尝试 CommissioningComplete</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">BusyWithOtherAdmin</span>
        <span class="enum-desc">另一个 Commissioner 正在配网中 —— 同一时间只允许一个 Fail-Safe 会话</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见错误速查</div>
    <p>
      <strong>ArmFailSafe 返回 BusyWithOtherAdmin</strong> → 另一个 App 或控制器正在配网这个设备，等待其完成或超时；
      <strong>CommissioningComplete 返回 NoFailSafe</strong> → Fail-Safe 已经超时自动回滚了，需要重新开始整个配网流程；
      <strong>SetRegulatoryConfig 返回 ValueOutsideRange</strong> → 检查设备的 LocationCapability，选择其支持的区域类型。
    </p>
  </div>

  <h3 id="enum-location">RegulatoryLocationTypeEnum</h3>
  <p>标识设备的法规使用场景。用于 <code>RegulatoryConfig</code>、<code>LocationCapability</code> 属性和 <code>SetRegulatoryConfig</code> 命令。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Indoor</span>
        <span class="enum-desc">仅限室内使用 —— 设备遵守室内无线电法规（通常限制更宽松）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Outdoor</span>
        <span class="enum-desc">仅限室外使用 —— 设备遵守室外无线电法规（某些频段限制更严格）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">IndoorOutdoor</span>
        <span class="enum-desc">室内外均可 —— 设备同时满足室内和室外法规要求（最常见）</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>属性数据示例</h3>
  <p>以下是一个正在配网中的设备的 GeneralCommissioning Cluster 典型属性数据：</p>
  <pre><code>{
  // --- 配网追踪 ---
  "0x0000": 3,                // Breadcrumb = 3（Commissioner 设置的进度标记）

  // --- 基础配网信息 ---
  "0x0001": {                 // BasicCommissioningInfo
    "failSafeExpiryLengthSeconds": 60,    // Fail-Safe 默认 60 秒
    "maxCumulativeFailsafeSeconds": 900   // 最长累计 900 秒（15 分钟）
  },

  // --- 法规配置 ---
  "0x0002": 2,                // RegulatoryConfig = IndoorOutdoor（当前配置）
  "0x0003": 2,                // LocationCapability = IndoorOutdoor（设备能力）

  // --- 并发连接 ---
  "0x0004": true              // SupportsConcurrentConnection = true（支持并发连接）
}</code></pre>

  <h3>ArmFailSafe 交互示例</h3>
  <p>Commissioner 启动 Fail-Safe 计时器的请求与响应：</p>
  <pre><code>// Commissioner → Device：启动 Fail-Safe 计时器
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0030",
      "commandId": "0x00"        // ArmFailSafe
    },
    "commandFields": {
      "expiryLengthSeconds": 60, // 60 秒超时
      "breadcrumb": 1            // 配网进度标记
    }
  }]
}

// Device → Commissioner：确认 Fail-Safe 已启动
{
  "errorCode": 0,               // OK
  "debugText": ""
}</code></pre>

  <h3>CommissioningComplete 交互示例</h3>
  <p>配网完成时的最终确认：</p>
  <pre><code>// Commissioner → Device：完成配网
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0030",
      "commandId": "0x04"        // CommissioningComplete
    },
    "commandFields": {}          // 无参数
  }]
}

// Device → Commissioner：确认配网完成
{
  "errorCode": 0,               // OK
  "debugText": ""
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      在实际开发中，Commissioner SDK（如 Android 的 chip-tool 或 iOS 的 Matter.framework）通常会自动处理 GeneralCommissioning 的命令序列。
      App 开发者很少需要手动发送这些命令，但理解它们的工作原理有助于排查配网失败的问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：标准配网流程（正常路径）</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner 通过 BLE 与设备建立 PASE 安全通道</li>
        <li>读取 <code>BasicCommissioningInfo (0x0001)</code> 获取 Fail-Safe 超时参数</li>
        <li>发送 <a href="#cmd-0x00"><code>ArmFailSafe (0x00)</code></a>，ExpiryLengthSeconds = 60，Breadcrumb = 1</li>
        <li>发送 <a href="#cmd-0x02"><code>SetRegulatoryConfig (0x02)</code></a>，设置国家代码和法规区域，Breadcrumb = 2</li>
        <li>通过 <a href="../network-commissioning/">NetworkCommissioning (0x0031)</a> 配置网络凭据并连接</li>
        <li>安装 NOC 证书（OperationalCredentials Cluster）</li>
        <li>设置 ACL 权限（AccessControl Cluster）</li>
        <li>发送 <a href="#cmd-0x04"><code>CommissioningComplete (0x04)</code></a> 提交所有变更</li>
        <li>配网完成，设备正式加入 Fabric</li>
      </ol>
      <p>整个流程通常在 30 秒内完成（不计用户输入时间）。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：Fail-Safe 超时回滚</summary>
    <div class="scenario-content">
      <ol>
        <li>Commissioner 发送 ArmFailSafe（60 秒超时）</li>
        <li>成功写入了 Wi-Fi 凭据</li>
        <li>但在安装 NOC 证书时出错，Commissioner 决定放弃</li>
        <li>Commissioner 未发送 CommissioningComplete</li>
        <li>60 秒后 Fail-Safe 计时器超时</li>
        <li>设备自动回滚：<strong>删除刚写入的 Wi-Fi 凭据</strong>、重置 Breadcrumb 为 0</li>
        <li>设备恢复到配网前的状态，可以重新开始配网</li>
      </ol>
      <p>
        <strong>也可以主动回滚</strong>：发送 <code>ArmFailSafe(ExpiryLengthSeconds = 0)</code> 立即触发回滚，
        不需要等待 60 秒超时。这比等超时更快，也更礼貌。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：法规配置处理</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>LocationCapability (0x0003)</code> 确认设备支持的区域类型</li>
        <li>根据用户所在地区确定 CountryCode（如中国 = <code>"CN"</code>，美国 = <code>"US"</code>）</li>
        <li>根据设备的实际使用场景选择 RegulatoryConfig：
          <ul>
            <li>智能灯、插座、传感器 → 通常 <code>IndoorOutdoor (2)</code></li>
            <li>户外安防摄像头 → <code>Outdoor (1)</code></li>
            <li>不确定 → 使用 <code>IndoorOutdoor (2)</code>（如果设备支持）</li>
          </ul>
        </li>
        <li>发送 <a href="#cmd-0x02"><code>SetRegulatoryConfig</code></a></li>
        <li>如果返回 <code>ValueOutsideRange</code>，降级到设备的 LocationCapability 允许的值重试</li>
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

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'administrator-commissioning': {
    title: '管理员配网 Cluster · AdministratorCommissioning（0x003C）',
    description: 'Matter AdministratorCommissioning Cluster（0x003C）完整参考 — OpenCommissioningWindow / OpenBasicCommissioningWindow / RevokeCommissioning 命令详解、配网窗口控制、Feature Map、状态码与安全审计场景。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>管理员配网 Cluster（AdministratorCommissioning）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003C</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    AdministratorCommissioning 负责控制设备的<strong>配网窗口</strong>（Commissioning Window）的开启与关闭。
    当一个设备已经加入了某个 Fabric（已被配网），想要让<em>新的</em>管理员也能配网这台设备时，
    就需要通过这个 Cluster 打开配网窗口。它不负责配网流程本身（那是
    <a href="../general-commissioning/">GeneralCommissioning</a> 的事），
    而是控制「设备是否接受新的配网请求」这个开关。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心定位</div>
    <p>
      如果把设备比作一栋房子，AdministratorCommissioning 就是门口的<strong>门禁系统</strong>。
      房子的主人（已有管理员）可以选择暂时打开门禁，让新的住户（新管理员）进来完成入住手续（配网）。
      <strong>OpenCommissioningWindow</strong> 是换了一把新门锁密码再开门（更安全），
      <strong>OpenBasicCommissioningWindow</strong> 是直接用现有密码开门（更方便），
      <strong>RevokeCommissioning</strong> 则是随时把门关上。
    </p>
  </div>

  <!-- Feature Map -->
  <h3>Feature Map</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Bit</th><th>代码</th><th>名称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>BC</td>
          <td>Basic Commissioning</td>
          <td>支持基础配网方法 —— 即 <a href="#cmd-0x01">OpenBasicCommissioningWindow</a> 命令。如果设备不支持此 Feature，则只能通过增强配网方式开窗</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举定义</a>
    <span class="nav-sep">|</span>
    <a href="#status-codes">状态码</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    AdministratorCommissioning Cluster 共有 3 个命令，分别用于开启增强配网窗口、开启基础配网窗口和关闭配网窗口。
    这三个命令都没有专属的响应结构体，通过通用的 Status 响应返回结果。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>Feature</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>OpenCommissioningWindow</td>
          <td>--</td>
          <td>使用新的 PAKE 验证器开启增强配网窗口</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>OpenBasicCommissioningWindow</td>
          <td>BC</td>
          <td>使用现有密码开启基础配网窗口</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>RevokeCommissioning</td>
          <td>--</td>
          <td>关闭当前已开启的配网窗口</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">OpenCommissioningWindow —— 增强配网开窗（0x00）</h3>
  <p>
    开启增强配网窗口（Enhanced Commissioning Window）。调用者需要提供一个<strong>全新的 PAKE 验证器</strong>，
    新的 Commissioner 将使用这个验证器而非设备出厂密码来建立 PASE 安全通道。
    这是最安全的开窗方式 —— 每次开窗都使用一次性的密码，即使密码被截获也无法用于下一次配网。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommissioningTimeout</td>
          <td>uint16</td>
          <td>窗口保持打开的秒数。超时后窗口自动关闭。范围通常为 <code>60 ~ 900</code> 秒</td>
        </tr>
        <tr>
          <td>PAKEPasscodeVerifier</td>
          <td>octstr</td>
          <td>新的 PAKE 密码验证器（Verifier）。由 Commissioner 根据新的 passcode 计算生成</td>
        </tr>
        <tr>
          <td>Discriminator</td>
          <td>uint16</td>
          <td>12-bit 设备识别码，用于新 Commissioner 在发现阶段识别目标设备</td>
        </tr>
        <tr>
          <td>Iterations</td>
          <td>uint32</td>
          <td>PBKDF2 迭代次数，范围 <code>1000 ~ 100000</code></td>
        </tr>
        <tr>
          <td>Salt</td>
          <td>octstr</td>
          <td>PBKDF2 盐值，长度 <code>16 ~ 32</code> 字节</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">增强配网 vs 基础配网</div>
    <p>
      增强配网每次开窗都会生成新的 PAKE 验证器，旧密码完全失效。
      这意味着即便有人嗅探到了本次配网过程中的 PASE 握手数据，也无法用于破解下一次配网。
      相比之下，<a href="#cmd-0x01">OpenBasicCommissioningWindow</a> 使用设备出厂密码（通常印在设备标签上），
      安全性较低但操作更方便。<strong>生产环境建议优先使用增强配网</strong>。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        典型场景：用户在 App A 上已经配网了设备，现在希望 App B 也能控制这台设备。
        App A 调用 OpenCommissioningWindow 开窗，提供一个临时的配网密码（以 QR Code 或数字代码的形式展示给用户）。
        用户在 App B 中扫描该 QR Code 或输入数字代码即可完成二次配网。窗口会在超时后自动关闭。
      </p>
      <p>
        注意：如果设备已经有一个活跃的配网窗口（WindowStatus 不为 0），再次调用会返回 <a href="#status-busy">Busy (2)</a> 错误。
        需要先调用 <a href="#cmd-0x02">RevokeCommissioning</a> 关闭现有窗口，或等待其超时。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">OpenBasicCommissioningWindow —— 基础配网开窗（0x01）</h3>
  <p>
    开启基础配网窗口（Basic Commissioning Window）。与增强方式不同，基础配网使用设备的<strong>出厂 passcode</strong>
    （印在设备标签上的那个配对码）来建立 PASE 安全通道。操作简单，但安全性较低。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">需要 BC Feature</div>
    <p>
      此命令需要设备支持 <strong>BC（Basic Commissioning）</strong> Feature。
      可以通过读取 Feature Map 确认设备是否支持。不支持此 Feature 的设备只能通过
      <a href="#cmd-0x00">OpenCommissioningWindow</a>（增强方式）开窗。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommissioningTimeout</td>
          <td>uint16</td>
          <td>窗口保持打开的秒数。超时后窗口自动关闭</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        适用于家庭环境中快速添加第二个控制器的场景。比如用户已经用 Google Home 配网了灯泡，
        现在想让 Apple Home 也能控制它。在 Google Home App 中打开基础配网窗口后，
        直接用灯泡背面的配对码在 Apple Home 中配网即可。
      </p>
      <p>
        由于使用固定的出厂 passcode，<strong>不推荐在安全要求较高的场景使用</strong>。
        出厂密码可能被多次使用，如果曾被第三方获取，存在被恶意配网的风险。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">RevokeCommissioning —— 关闭配网窗口（0x02）</h3>
  <p>
    关闭当前已开启的配网窗口。此命令<strong>没有参数</strong>。
    调用成功后，设备立即停止接受新的配网请求，WindowStatus 恢复为 <code>WindowNotOpen (0)</code>，
    AdminFabricIndex 和 AdminVendorId 重置为 <code>null</code>。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">调用前提</div>
    <p>
      只有在配网窗口已经打开的情况下才能调用。如果当前没有活跃的配网窗口（WindowStatus = 0），
      会返回 <a href="#status-windownotopen">WindowNotOpen (4)</a> 错误。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        主要用途：管理员开启了配网窗口后改变了主意，或者发现安全隐患需要立即关闭窗口。
        比如在商业环境中，IT 管理员开窗给新同事配网，但新同事临时有事未到场，
        管理员可以主动关闭窗口避免未授权访问。
      </p>
      <p>
        自动化系统在检测到异常配网尝试时，也可以调用此命令作为安全响应措施。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>AdministratorCommissioning Cluster 共有 3 个属性，描述配网窗口的当前状态和操作者信息。</p>

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
          <td>WindowStatus</td>
          <td>CommissioningWindowStatusEnum</td>
          <td>当前配网窗口的状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>AdminFabricIndex</td>
          <td>fabric-idx (nullable)</td>
          <td>开启窗口的管理员所在 Fabric 索引</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>AdminVendorId</td>
          <td>vendor-id (nullable)</td>
          <td>开启窗口的管理员供应商 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 窗口状态（0x0000）====== -->
  <h3 id="attr-detail-window">窗口状态（0x0000）</h3>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>WindowStatus<br/><span class="attr-cn">窗口状态</span></td>
          <td><a href="#enum-window-status">CommissioningWindowStatusEnum</a></td>
          <td>
            表示设备当前的配网窗口状态。
            <code>WindowNotOpen (0)</code> 表示未开窗，设备不接受新的配网请求；
            <code>EnhancedWindowOpen (1)</code> 表示增强配网窗口已打开；
            <code>BasicWindowOpen (2)</code> 表示基础配网窗口已打开。
            同一时间只能有一个窗口处于打开状态
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">监控窗口状态</div>
    <p>
      在安全敏感的部署环境中，可以通过订阅 WindowStatus 属性变化来实时监控设备的配网窗口状态。
      一旦检测到非预期的窗口开启（比如 <code>BasicWindowOpen</code>），
      可以立即调用 <a href="#cmd-0x02">RevokeCommissioning</a> 关闭窗口并发送告警。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 管理员信息（0x0001, 0x0002）====== -->
  <h3 id="attr-detail-admin">管理员信息（0x0001, 0x0002）</h3>
  <p>记录是谁开启了当前的配网窗口。窗口关闭或未开启时，这两个属性均为 <code>null</code>。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>AdminFabricIndex<br/><span class="attr-cn">管理员 Fabric 索引</span></td>
          <td>fabric-idx (nullable)</td>
          <td>
            开启配网窗口的管理员所在的 Fabric 索引。
            可用于追溯哪个 Fabric 的管理员执行了开窗操作。
            窗口未开启时为 <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>AdminVendorId<br/><span class="attr-cn">管理员供应商 ID</span></td>
          <td>vendor-id (nullable)</td>
          <td>
            开启配网窗口的管理员的供应商 ID（Vendor ID）。
            标识是哪个厂商的 App 或控制器执行了开窗操作。
            窗口未开启时为 <code>null</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">审计用途</div>
    <p>
      AdminFabricIndex 和 AdminVendorId 配合使用，可以完整追溯「谁」在「什么身份」下开启了配网窗口。
      这对安全审计非常有价值 —— 比如在企业环境中，发现设备被意外配网时，
      可以通过这两个属性确认是哪个管理员、使用哪个平台执行了开窗操作。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-window-status">CommissioningWindowStatusEnum</h3>
  <p>表示设备当前的配网窗口状态，用于 <code>WindowStatus</code> 属性。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">配网窗口未开启 —— 设备不接受新的配网请求（默认状态）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">EnhancedWindowOpen</span>
        <span class="enum-desc">增强配网窗口已开启 —— 使用新的 PAKE 验证器，安全性更高</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BasicWindowOpen</span>
        <span class="enum-desc">基础配网窗口已开启 —— 使用设备出厂密码，需要 BC Feature 支持</span>
      </div>
    </div>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">Cluster 状态码（StatusCode）</h2>
  <p>AdministratorCommissioning 命令通过通用 Status 响应返回结果，除标准状态码外还定义了以下 Cluster 专属状态码：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card" id="status-busy">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Busy</span>
        <span class="enum-desc">设备已有一个活跃的配网窗口。同一时间只能开启一个配网窗口，需先关闭现有窗口或等待其超时</span>
      </div>
    </div>
    <div class="enum-card" id="status-pake-error">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PAKEParameterError</span>
        <span class="enum-desc">PAKE 参数无效 —— PAKEPasscodeVerifier、Iterations 或 Salt 参数不合法（仅 OpenCommissioningWindow）</span>
      </div>
    </div>
    <div class="enum-card" id="status-windownotopen">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">WindowNotOpen</span>
        <span class="enum-desc">当前没有活跃的配网窗口 —— 试图在无活跃窗口时调用 RevokeCommissioning</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见错误速查</div>
    <p>
      <strong>OpenCommissioningWindow 返回 Busy</strong> → 已有配网窗口在开启状态，先调用 RevokeCommissioning 关闭再重试；
      <strong>OpenCommissioningWindow 返回 PAKEParameterError</strong> → 检查 PAKE 验证器的生成参数，确认 Iterations 和 Salt 在有效范围内；
      <strong>RevokeCommissioning 返回 WindowNotOpen</strong> → 窗口已超时自动关闭或从未开启，无需处理。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>属性数据示例（窗口未开启）</h3>
  <p>设备处于正常状态，没有活跃的配网窗口：</p>
  <pre><code>{
  // --- 配网窗口状态 ---
  "0x0000": 0,                // WindowStatus = WindowNotOpen（当前未开启配网窗口）

  // --- 管理员信息 ---
  "0x0001": null,             // AdminFabricIndex = null（无管理员开启窗口）
  "0x0002": null              // AdminVendorId = null（无管理员开启窗口）
}</code></pre>

  <h3>属性数据示例（窗口已开启）</h3>
  <p>某管理员已通过增强方式开启了配网窗口：</p>
  <pre><code>{
  // --- 配网窗口状态 ---
  "0x0000": 1,                // WindowStatus = EnhancedWindowOpen（增强配网窗口已开启）

  // --- 管理员信息 ---
  "0x0001": 1,                // AdminFabricIndex = 1（Fabric 索引为 1 的管理员开启了窗口）
  "0x0002": 4996              // AdminVendorId = 0x1384（开启窗口的管理员供应商 ID）
}</code></pre>

  <h3>OpenCommissioningWindow 交互示例</h3>
  <p>使用增强配网方式开启配网窗口：</p>
  <pre><code>// Commissioner → Device：开启增强配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x00"              // OpenCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180,     // 180 秒后自动关闭
      "PAKEPasscodeVerifier": "base64...",  // 新的 PAKE 验证器
      "discriminator": 3840,           // 12-bit 设备识别码
      "iterations": 1000,             // PBKDF2 迭代次数
      "salt": "base64..."             // PBKDF2 盐值
    }
  }]
}

// Device → Commissioner：成功开启（Status = SUCCESS）
// 此命令无专属响应结构体，通过通用 Status 返回结果</code></pre>

  <h3>OpenBasicCommissioningWindow 交互示例</h3>
  <p>使用基础配网方式开启配网窗口（需要 BC Feature）：</p>
  <pre><code>// Commissioner → Device：开启基础配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x01"              // OpenBasicCommissioningWindow
    },
    "commandFields": {
      "commissioningTimeout": 180      // 180 秒后自动关闭
    }
  }]
}

// Device → Commissioner：成功开启（Status = SUCCESS）</code></pre>

  <h3>RevokeCommissioning 交互示例</h3>
  <p>关闭当前已开启的配网窗口：</p>
  <pre><code>// Commissioner → Device：关闭配网窗口
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003C",
      "commandId": "0x02"              // RevokeCommissioning
    },
    "commandFields": {}                // 无参数
  }]
}

// Device → Commissioner：成功关闭（Status = SUCCESS）</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      在实际开发中，Commissioner SDK 通常会封装 OpenCommissioningWindow 的调用，自动处理 PAKE 验证器的生成。
      App 开发者通常只需要调用 SDK 提供的「多管理员配网」接口，SDK 会在底层完成 PAKE 参数计算和命令发送。
      但理解底层原理有助于排查多管理员配网失败的问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：添加第二个管理员（多平台共管）</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：用户已经用 Google Home 配网了一盏智能灯，现在希望 Apple Home 也能控制它。</p>
      <ol>
        <li>用户在 Google Home App 中找到这盏灯的设备详情页</li>
        <li>点击「分享设备」或「添加到其他平台」</li>
        <li>Google Home 在底层调用 <a href="#cmd-0x00"><code>OpenCommissioningWindow (0x00)</code></a>，
            生成新的 PAKE 验证器和临时 Discriminator</li>
        <li>App 界面展示一个配网 QR Code（包含临时密码和 Discriminator）</li>
        <li>用户打开 Apple Home，扫描该 QR Code</li>
        <li>Apple Home 使用临时密码建立 PASE 通道，完成配网</li>
        <li>配网完成后窗口自动关闭，WindowStatus 恢复为 <code>WindowNotOpen (0)</code></li>
      </ol>
      <p>
        此时设备同时属于两个 Fabric（Google 和 Apple），可以被两个平台独立控制。
        设备的 AdminFabricIndex 和 AdminVendorId 在窗口关闭后恢复为 <code>null</code>。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：恢复出厂设置的替代方案</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：设备所属的 App 已卸载或 Fabric 信息丢失，但不想恢复出厂设置（会丢失所有配置）。</p>
      <ol>
        <li>如果设备支持 BC Feature 且有物理按钮或其他本地触发方式：
          <ul>
            <li>通过长按设备按钮等方式触发本地开窗（某些设备支持）</li>
            <li>设备进入基础配网窗口状态（BasicWindowOpen）</li>
          </ul>
        </li>
        <li>如果设备仍属于某个有效的 Fabric 且有另一个管理员：
          <ul>
            <li>用该管理员调用 <a href="#cmd-0x01"><code>OpenBasicCommissioningWindow (0x01)</code></a></li>
            <li>使用设备背面的出厂 passcode 重新配网</li>
          </ul>
        </li>
        <li>新的 Commissioner 完成配网后，设备加入新的 Fabric</li>
        <li>可以通过 OperationalCredentials Cluster 移除旧的、不再需要的 Fabric</li>
      </ol>
      <p>
        <strong>注意</strong>：如果设备所有 Fabric 的管理员都无法访问，且设备不支持本地开窗方式，
        那么恢复出厂设置可能是唯一选择。这也是为什么建议至少配置两个管理员（Fabric）作为备份的原因。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：安全审计（检测异常配网窗口）</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：企业 IoT 管理员需要确保办公室内的 Matter 设备没有被意外开窗。</p>
      <ol>
        <li>定期轮询所有设备的 <code>WindowStatus (0x0000)</code> 属性</li>
        <li>如果发现某设备的 WindowStatus 不为 <code>WindowNotOpen (0)</code>：
          <ul>
            <li>读取 <code>AdminFabricIndex (0x0001)</code> 确认是哪个 Fabric 的管理员开的窗</li>
            <li>读取 <code>AdminVendorId (0x0002)</code> 确认使用的是哪个平台</li>
          </ul>
        </li>
        <li>如果这次开窗不在预期操作记录中：
          <ul>
            <li>立即调用 <a href="#cmd-0x02"><code>RevokeCommissioning (0x02)</code></a> 关闭窗口</li>
            <li>记录审计日志：设备 ID、开窗时间、AdminFabricIndex、AdminVendorId</li>
            <li>向安全团队发送告警</li>
          </ul>
        </li>
        <li>更好的方案：订阅 WindowStatus 属性变化，实现实时检测而非轮询</li>
      </ol>
      <p>
        在安全要求较高的环境中，建议完全禁用 BC Feature（不支持基础配网），
        只允许增强配网方式开窗 —— 这样每次开窗都需要新的 PAKE 验证器，被恶意利用的风险更低。
      </p>
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

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  :global(.dark) .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'operational-credentials': {
    title: '操作凭据 Cluster · OperationalCredentials（0x003E）',
    description: 'Matter OperationalCredentials Cluster（0x003E）完整参考 — NOC 证书管理、Fabric 凭据、CSR 生成、设备认证（DAC）、多管理员、AddNOC/RemoveFabric 命令详解与配网 NOC 流程示例。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>操作凭据 Cluster（OperationalCredentials）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003E</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）
  </p>
  <p>
    OperationalCredentials 是 Matter 设备安全通信的基石 —— 负责管理设备的<strong>节点操作证书（NOC）</strong>和 <strong>Fabric 凭据</strong>。
    每台 Matter 设备要加入一个 Fabric（家庭网络），都需要通过这个 Cluster 完成证书签发和安装。
    它也是多管理员（Multi-Admin）场景的核心 —— 一台设备可以同时加入多个 Fabric，每个 Fabric 独立管理各自的 NOC。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">核心概念速览</div>
    <p>
      <strong>Fabric</strong>：一个逻辑上的「家庭网络」，由同一个 Root CA 签发的证书体系定义。同一 Fabric 内的设备可以互相通信。<br/>
      <strong>NOC（Node Operational Certificate）</strong>：设备在某个 Fabric 中的「身份证」，包含设备的 NodeID 和 FabricID，由 Commissioner（手机 App）的 Root CA 签发。<br/>
      <strong>ICAC</strong>：中间 CA 证书，可选。在 Root CA 和 NOC 之间增加一层信任链。<br/>
      <strong>DAC（Device Attestation Certificate）</strong>：设备出厂时预置的证书，证明「这是一个合法的 Matter 设备」。用于配网时的设备认证。<br/>
      <strong>CSR</strong>：证书签名请求。设备生成密钥对后，将公钥包装为 CSR 发给 Commissioner，Commissioner 用自己的 CA 签发 NOC。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举定义</a>
    <span class="nav-sep">|</span>
    <a href="#structs">数据结构</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    OperationalCredentials Cluster 共有 8 个命令，覆盖了设备认证、CSR 生成、NOC 安装、Fabric 管理的完整流程。
    大多数命令在配网（Commissioning）过程中由 Commissioner 自动调用，App 开发者通常不需要手动发送。
    但理解这些命令对调试配网失败和实现多管理员至关重要。
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
          <td>AttestationRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求设备认证（DAC 签名）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>AttestationResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回设备认证数据</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>CertificateChainRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求 DAC 或 PAI 证书</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>CertificateChainResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回请求的证书</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>CSRRequest</td>
          <td class="col-direction">C &rarr; S</td>
          <td>请求生成 CSR（证书签名请求）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>CSRResponse</td>
          <td class="col-direction">S &rarr; C</td>
          <td>返回 CSR 数据</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>AddNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>安装 NOC，加入新 Fabric</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>UpdateNOC</td>
          <td class="col-direction">C &rarr; S</td>
          <td>更新当前 Fabric 的 NOC</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>UpdateFabricLabel</td>
          <td class="col-direction">C &rarr; S</td>
          <td>修改 Fabric 标签</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0A">
          <td><a href="#cmd-0x0A"><code>0x0A</code></a></td>
          <td>RemoveFabric</td>
          <td class="col-direction">C &rarr; S</td>
          <td>移除 Fabric（含 NOC 和信任根）</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0B">
          <td><a href="#cmd-0x0B"><code>0x0B</code></a></td>
          <td>AddTrustedRootCertificate</td>
          <td class="col-direction">C &rarr; S</td>
          <td>添加受信 Root CA 证书</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">关于命令方向</div>
    <p>
      <strong>C &rarr; S</strong>：Commissioner（手机 App）发给设备的请求命令。<br/>
      <strong>S &rarr; C</strong>：设备回复给 Commissioner 的响应命令。<br/>
      响应命令（AttestationResponse、CertificateChainResponse、CSRResponse）不需要手动发送，它们是设备收到请求后自动回复的。
      AddNOC / UpdateNOC / UpdateFabricLabel / RemoveFabric 的回复统一是 <strong>NOCResponse</strong>（内含 StatusCode 和 FabricIndex）。
    </p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">AttestationRequest —— 设备认证请求（0x00）</h3>
  <p>
    配网的第一步：验证设备是否为合法的 Matter 设备。Commissioner 发送一个随机数（Nonce），
    设备用 DAC（设备认证证书）的私钥对该 Nonce 和设备信息进行签名，证明自己持有合法的 DAC。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AttestationNonce</td>
          <td>octstr (32 bytes)</td>
          <td>32 字节随机数，防止重放攻击</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        配网过程中自动执行。Commissioner 通过 BLE 或 IP 建立 PASE 连接后，首先发送 AttestationRequest。
        如果设备的 DAC 签名验证失败，配网流程会立即终止并报告设备认证失败。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">AttestationResponse —— 设备认证响应（0x01）</h3>
  <p>
    设备收到 AttestationRequest 后的自动回复。包含设备认证信息和 DAC 签名。
    Commissioner 收到后会验证签名、检查 DAC 证书链（DAC &rarr; PAI &rarr; PAA），确认设备合法性。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AttestationElements</td>
          <td>octstr</td>
          <td>TLV 编码的认证信息（含 Certification Declaration、Nonce、Timestamp 等）</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>DAC 私钥对 AttestationElements 的 ECDSA-P256 签名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">CertificateChainRequest —— 证书链请求（0x02）</h3>
  <p>
    请求设备返回 DAC（设备认证证书）或 PAI（产品认证中间证书）。
    Commissioner 需要完整的证书链来验证设备认证签名 —— DAC 由 PAI 签发，PAI 由 PAA 签发。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CertificateType</td>
          <td>CertificateChainTypeEnum</td>
          <td>1 = DAC 证书，2 = PAI 证书（见<a href="#enum-cert-chain-type">枚举定义</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        配网时 Commissioner 通常会先请求 DAC（type=1），再请求 PAI（type=2），
        然后结合本地或云端存储的 PAA（Product Attestation Authority）根证书完成整条信任链验证。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">CertificateChainResponse —— 证书链响应（0x03）</h3>
  <p>
    设备返回请求的证书。证书格式为 DER 编码的 X.509 v3 证书。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Certificate</td>
          <td>octstr</td>
          <td>DER 编码的 X.509 证书（DAC 或 PAI）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">CSRRequest —— CSR 生成请求（0x04）</h3>
  <p>
    让设备生成一对新的操作密钥（Operational Key Pair），并返回包含公钥的 CSR（Certificate Signing Request）。
    Commissioner 拿到 CSR 后，用自己的 Root CA 签发 NOC 证书，然后通过 AddNOC 写入设备。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CSRNonce</td>
          <td>octstr (32 bytes)</td>
          <td>32 字节随机数，绑定到 CSR 中防止重放</td>
        </tr>
        <tr>
          <td>IsForUpdateNOC</td>
          <td>bool</td>
          <td>可选。为 <code>true</code> 时表示此 CSR 用于更新现有 NOC（而非首次安装）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        配网流程中在设备认证通过后执行。CSR 中包含设备新生成的公钥，Commissioner 用自己的 CA 对此公钥签发 NOC。
        设备保留对应的私钥，后续 CASE 会话建立时用它来证明身份。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">CSRResponse —— CSR 响应（0x05）</h3>
  <p>
    设备返回 CSR 数据和 DAC 签名。Commissioner 验证签名后提取 CSR 用于签发 NOC。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCSRElements</td>
          <td>octstr</td>
          <td>TLV 编码的 NOCSR 结构（含 PKCS#10 CSR 和 CSRNonce）</td>
        </tr>
        <tr>
          <td>AttestationSignature</td>
          <td>octstr (64 bytes)</td>
          <td>DAC 私钥对 NOCSRElements 的 ECDSA-P256 签名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">AddNOC —— 安装 NOC（0x06）</h3>
  <p>
    配网流程的关键一步：将 Commissioner 签发的 NOC 证书写入设备，让设备正式加入一个新的 Fabric。
    这是整个证书安装流程中参数最多的命令。执行成功后设备会获得一个新的 FabricIndex。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCValue</td>
          <td>octstr</td>
          <td>是</td>
          <td>签发的 NOC 证书（Matter Operational Certificate，DER 编码）</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>可选</td>
          <td>中间 CA 证书。如果 NOC 直接由 Root CA 签发则不需要</td>
        </tr>
        <tr>
          <td>IPKValue</td>
          <td>octstr (16 bytes)</td>
          <td>是</td>
          <td>Identity Protection Key，用于 Fabric 内的群组通信加密</td>
        </tr>
        <tr>
          <td>CaseAdminSubject</td>
          <td>uint64</td>
          <td>是</td>
          <td>CASE 管理员的 Subject（通常是 Commissioner 的 NodeID）。该节点在此 Fabric 上拥有管理权限</td>
        </tr>
        <tr>
          <td>AdminVendorId</td>
          <td>uint16</td>
          <td>是</td>
          <td>管理员的 Vendor ID（标识是哪个厂商的 App 发起的配网）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">返回值：NOCResponse</div>
    <p>
      AddNOC 执行后设备返回 <strong>NOCResponse</strong>，包含：
      <code>StatusCode</code>（见 <a href="#enum-noc-status">NodeOperationalCertStatusEnum</a>）和
      <code>FabricIndex</code>（新分配的索引号，仅在成功时有值）。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        这是配网的最后一步。流程为：AddTrustedRootCertificate &rarr; CSRRequest &rarr; 用 CA 签发 NOC &rarr; AddNOC。
        执行成功后设备会建立一个新的 CASE 会话，后续通信从 PASE 切换到 CASE（基于证书的安全通道）。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">UpdateNOC —— 更新 NOC（0x07）</h3>
  <p>
    更新当前 Fabric 的 NOC 证书。通常在证书即将过期或需要轮换密钥时使用。
    只能更新发起此命令的 Fabric 自身的 NOC，不能跨 Fabric 操作。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOCValue</td>
          <td>octstr</td>
          <td>是</td>
          <td>新的 NOC 证书（DER 编码）</td>
        </tr>
        <tr>
          <td>ICACValue</td>
          <td>octstr</td>
          <td>可选</td>
          <td>新的中间 CA 证书</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        证书轮换场景：Commissioner 先调用 CSRRequest（IsForUpdateNOC=true）获取新 CSR，
        用 CA 签发新 NOC 后调用 UpdateNOC 写入。旧 NOC 被替换，FabricIndex 不变。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x09">UpdateFabricLabel —— 更新 Fabric 标签（0x09）</h3>
  <p>
    修改当前 Fabric 的用户自定义标签（如「Home」「Office」）。纯展示用途，不影响安全或通信。
    只能修改发起命令的 Fabric 自身的标签。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string (max 32)</td>
          <td>新标签。空字符串表示清除标签。不允许与同设备上其他 Fabric 重名</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 中给某个 Fabric 起名，比如标记为「家里」或「公司」，方便在多管理员场景下区分。
        如果传入的 Label 与设备上已有的其他 Fabric 标签相同，设备返回 LabelConflict 错误。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x0A">RemoveFabric —— 移除 Fabric（0x0A）</h3>
  <p>
    从设备上移除指定的 Fabric。会删除该 Fabric 对应的 NOC、ICAC、信任根证书、ACL 条目以及所有关联数据。
    <strong>可以移除任意 Fabric</strong>（包括其他管理员的），这是一个高权限操作。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>要移除的 Fabric 索引（从 Fabrics 属性列表获取）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">危险操作</div>
    <p>
      如果设备只加入了一个 Fabric，执行 RemoveFabric 后设备会回到<strong>未配网状态</strong>（等同恢复出厂设置）。
      如果移除的是自己所在的 Fabric，当前 CASE 会话会立即断开。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        「取消配对」操作：用户在 App 中删除设备时，App 调用 RemoveFabric 移除自己的 Fabric。
        如果设备在其他平台（如 Google Home / Apple Home）也配了网，那些 Fabric 不受影响。
        极端场景：如果 App 失去了与设备的连接，可通过物理按键恢复出厂设置来清除所有 Fabric。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x0B">AddTrustedRootCertificate —— 添加信任根证书（0x0B）</h3>
  <p>
    向设备写入一个 Root CA 证书。这是 AddNOC 的前置步骤 —— 设备需要先知道信任哪个 Root CA，
    才能接受由该 CA 签发的 NOC。每个 Fabric 对应一个信任根。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RootCACertificate</td>
          <td>octstr</td>
          <td>Root CA 证书（Matter Operational Certificate 格式，DER 编码）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-info">
    <div class="callout-title">执行时机</div>
    <p>
      此命令只能在 PASE 会话中执行（即设备尚未完成配网、使用 Passcode 建立的临时安全通道），
      或者在已建立 CASE 会话的 Fabric 内执行。不能在没有安全通道的情况下写入信任根。
      此命令没有响应（成功返回 Status = Success 的通用状态码，不是 NOCResponse）。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>OperationalCredentials Cluster 共有 6 个属性，分为 Fabric 信息和容量管理两组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NOCs</td>
          <td>list&lt;NOCStruct&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>各 Fabric 的 NOC 和 ICAC 证书</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Fabrics</td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>已加入的 Fabric 描述列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SupportedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>设备最多支持加入的 Fabric 数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CommissionedFabrics</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>当前已加入的 Fabric 数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>TrustedRootCertificates</td>
          <td>list&lt;octstr&gt;</td>
          <td><a href="#group-fabric">Fabric 信息</a></td>
          <td>已安装的信任根证书列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>CurrentFabricIndex</td>
          <td>uint8</td>
          <td><a href="#group-capacity">容量管理</a></td>
          <td>当前操作上下文所属的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Fabric 信息 ====== -->
  <h3 id="group-fabric">Fabric 信息（0x0000, 0x0001, 0x0004）</h3>
  <p>描述设备已加入的各个 Fabric 的证书、身份和信任根信息。</p>

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
          <td>NOCs<br/><span class="attr-cn">NOC 列表</span></td>
          <td>list&lt;NOCStruct&gt;</td>
          <td>每个 Fabric 对应一个 NOCStruct，包含该 Fabric 的 NOC 和 ICAC 证书。<strong>Fabric-scoped</strong>：每个 Fabric 只能读到自己的条目，读不到其他 Fabric 的 NOC</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Fabrics<br/><span class="attr-cn">Fabric 列表</span></td>
          <td>list&lt;FabricDescriptorStruct&gt;</td>
          <td>所有已加入 Fabric 的描述信息。与 NOCs 不同，<strong>所有 Fabric 都能读到完整列表</strong>（但不含证书内容，仅有公钥摘要等公开信息）</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>TrustedRootCertificates<br/><span class="attr-cn">信任根证书列表</span></td>
          <td>list&lt;octstr&gt;</td>
          <td>已安装的 Root CA 公钥证书列表（DER 编码）。每个 Fabric 对应一个信任根。通过 AddTrustedRootCertificate 添加</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Fabric-scoped vs 全局可见</div>
    <p>
      <code>NOCs</code> 属性是 <strong>Fabric-scoped</strong> 的 —— Fabric A 读 NOCs 只能看到自己的 NOC，看不到 Fabric B 的。
      这是安全设计：NOC 中包含了该 Fabric 的操作密钥公钥，不应暴露给其他 Fabric。<br/>
      <code>Fabrics</code> 属性是全局可见的 —— 任何 Fabric 都能看到设备加入了哪些 Fabric，以及它们的公开信息（Root 公钥、VendorID、FabricID、NodeID、Label）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 容量管理 ====== -->
  <h3 id="group-capacity">容量管理（0x0002, 0x0003, 0x0005）</h3>
  <p>描述设备的 Fabric 容量和当前操作上下文。</p>

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
          <td>SupportedFabrics<br/><span class="attr-cn">最大 Fabric 数</span></td>
          <td>uint8</td>
          <td>设备最多可同时加入的 Fabric 数量。Matter 规范要求至少支持 <strong>5 个</strong>。该值出厂固定，不可修改</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CommissionedFabrics<br/><span class="attr-cn">已加入 Fabric 数</span></td>
          <td>uint8</td>
          <td>当前实际已加入的 Fabric 数量。当 <code>CommissionedFabrics &ge; SupportedFabrics</code> 时，设备无法再加入新的 Fabric（AddNOC 会返回 TableFull）</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>CurrentFabricIndex<br/><span class="attr-cn">当前 Fabric 索引</span></td>
          <td>uint8</td>
          <td>当前通信会话所属的 Fabric 索引。读取此属性可知道「我是哪个 Fabric」。值为 0 表示当前没有关联的 Fabric（如 PASE 会话中）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">多管理员容量检查</div>
    <p>
      在发起多管理员配网（Multi-Admin）前，应先读取 <code>SupportedFabrics</code> 和 <code>CommissionedFabrics</code>，
      确认还有剩余槽位。如果已满，需要先通过 RemoveFabric 移除一个不再使用的 Fabric。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-noc-status">NodeOperationalCertStatusEnum</h3>
  <p>AddNOC、UpdateNOC、UpdateFabricLabel、RemoveFabric 命令的统一返回状态码（NOCResponse 中的 StatusCode 字段）。</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">操作成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">InvalidPublicKey</span>
        <span class="enum-desc">NOC 中的公钥无效（格式错误或与 CSR 中的不匹配）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidNodeOpId</span>
        <span class="enum-desc">NOC 中的 Node Operational ID（NodeID）无效</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">InvalidNOC</span>
        <span class="enum-desc">NOC 证书本身无效（签名验证失败、格式错误、过期等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">MissingCsr</span>
        <span class="enum-desc">没有先调用 CSRRequest 就直接 AddNOC/UpdateNOC</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">TableFull</span>
        <span class="enum-desc">Fabric 表已满（CommissionedFabrics = SupportedFabrics）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">InvalidAdminSubject</span>
        <span class="enum-desc">CaseAdminSubject 值无效（不是合法的 NodeID）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">FabricConflict</span>
        <span class="enum-desc">Fabric 冲突 —— 设备上已存在使用相同 Root CA 的 Fabric</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">LabelConflict</span>
        <span class="enum-desc">标签冲突 —— UpdateFabricLabel 时新标签与已有 Fabric 标签重复</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">InvalidFabricIndex</span>
        <span class="enum-desc">指定的 FabricIndex 不存在（RemoveFabric 时传了无效索引）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-cert-chain-type">CertificateChainTypeEnum</h3>
  <p>CertificateChainRequest 命令中指定要获取的证书类型。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DACCertificate</span>
        <span class="enum-desc">设备认证证书（Device Attestation Certificate）—— 出厂预置，证明设备合法性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PAICertificate</span>
        <span class="enum-desc">产品认证中间证书（Product Attestation Intermediate Certificate）—— DAC 的签发者</span>
      </div>
    </div>
  </div>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>

  <h3 id="struct-noc">NOCStruct</h3>
  <p>NOCs 属性列表中的每个元素，包含一个 Fabric 的 NOC 和可选的 ICAC 证书。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NOC</td>
          <td>octstr</td>
          <td>节点操作证书（DER 编码）。包含设备在该 Fabric 中的 NodeID、FabricID 和操作公钥</td>
        </tr>
        <tr>
          <td>ICAC</td>
          <td>octstr / null</td>
          <td>中间 CA 证书。如果 NOC 直接由 Root CA 签发，则为 null</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>此条目所属的 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-fabric-descriptor">FabricDescriptorStruct</h3>
  <p>Fabrics 属性列表中的每个元素，描述一个 Fabric 的公开信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RootPublicKey</td>
          <td>octstr (65 bytes)</td>
          <td>该 Fabric 的 Root CA 公钥（未压缩 EC P-256 点，65 字节）</td>
        </tr>
        <tr>
          <td>VendorID</td>
          <td>uint16</td>
          <td>签发此 Fabric 凭据的厂商 ID（如 Apple = 0x1349、Google = 0x6006）</td>
        </tr>
        <tr>
          <td>FabricID</td>
          <td>uint64</td>
          <td>Fabric 标识符。同一个 Root CA 下不同 Fabric 用此值区分</td>
        </tr>
        <tr>
          <td>NodeID</td>
          <td>uint64</td>
          <td>设备在该 Fabric 中的节点 ID。同一设备在不同 Fabric 中 NodeID 不同</td>
        </tr>
        <tr>
          <td>Label</td>
          <td>string (max 32)</td>
          <td>用户自定义标签（通过 UpdateFabricLabel 修改），如「Home」「Office」</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>uint8</td>
          <td>此 Fabric 的索引号（设备内唯一，RemoveFabric 时用此值指定）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">VendorID 与 FabricID</div>
    <p>
      同一台设备被 Apple Home 和 Google Home 同时配网时，会有两条 FabricDescriptor —— VendorID 分别是 Apple 和 Google 的，
      FabricID 和 NodeID 也各不相同。设备通过 FabricIndex 区分不同 Fabric 的上下文，包括 ACL 权限和订阅。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>以下是一台已加入一个 Fabric 的 Matter 设备的 OperationalCredentials 属性读取结果（NOCs 除外，因为 Fabric-scoped 限制只能读自己的）：</p>

  <pre><code>{
  // --- Fabric 信息 ---
  "0x0001": [{                    // Fabrics — 已加入的 Fabric 列表
    "rootPublicKey": "BNkX2...",  // Root CA 公钥（Base64）
    "vendorID": 65521,            // VendorID = 0xFFF1（测试厂商）
    "fabricID": 1,                // FabricID = 1
    "nodeID": 1234,               // 本设备在该 Fabric 中的 NodeID
    "label": "Home",              // 用户自定义标签
    "fabricIndex": 1              // Fabric 索引
  }],

  // --- 容量与计数 ---
  "0x0002": 5,                    // SupportedFabrics = 5（最多加入 5 个 Fabric）
  "0x0003": 1,                    // CommissionedFabrics = 1（当前已加入 1 个）

  // --- 信任根证书 ---
  "0x0004": [                     // TrustedRootCertificates — 受信 Root CA 列表
    "MIIBnT..."                   // 每个 Fabric 对应一个 Root CA 证书（Base64 DER）
  ],

  // --- 当前上下文 ---
  "0x0005": 1                     // CurrentFabricIndex = 1（当前操作所属 Fabric）
}</code></pre>

  <h3>CSR 流程交互示例</h3>
  <p>配网过程中，Commissioner 请求设备生成 CSR 的交互：</p>
  <pre><code>// 1. Commissioner → Device：请求生成 CSR
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x04"          // CSRRequest
    },
    "commandFields": {
      "CSRNonce": "dGhpcyBpcyBhIDMyLWJ5dGUgbm9uY2U="  // 32 字节随机数（Base64）
    }
  }]
}

// Device → Commissioner：返回 CSR
{
  "NOCSRElements": "MIHd...",      // NOCSR 结构（含 CSR + CSRNonce）
  "attestationSignature": "MEU..." // 设备用 DAC 私钥签名
}</code></pre>

  <h3>AddNOC 交互示例</h3>
  <p>Commissioner 将签发好的 NOC 写入设备：</p>
  <pre><code>// 2. Commissioner → Device：写入签好的 NOC
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x003E",
      "commandId": "0x06"          // AddNOC
    },
    "commandFields": {
      "NOCValue": "MIIB...",       // 签发的 NOC 证书（DER Base64）
      "ICACValue": "MIIB...",      // 可选的中间 CA 证书
      "IPKValue": "wMs7...",       // 16 字节 Identity Protection Key
      "caseAdminSubject": 112233,  // CASE 管理员的 Subject（NodeID）
      "adminVendorId": 65521       // 管理员的 VendorID
    }
  }]
}

// Device → Commissioner：返回结果
{
  "statusCode": 0,                 // OK
  "fabricIndex": 1                 // 新分配的 FabricIndex
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际开发中，这些命令通常由平台的 Commissioning SDK 自动编排（如 Android CHIPTool、iOS Matter.framework）。
      但在调试配网失败时，理解每一步的参数含义非常关键 —— 尤其是 CSRNonce 不匹配、NOC 签名验证失败、Fabric 表已满等问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：首次配网 —— NOC 安装完整流程</summary>
    <div class="scenario-content">
      <p>一台新出厂的 Matter 设备首次被手机 App 配网，完整的证书安装流程如下：</p>
      <ol>
        <li>App 通过 BLE 或 SoftAP 与设备建立 <strong>PASE 会话</strong>（使用设备上的 Passcode）</li>
        <li>App 发送 <code>AttestationRequest (0x00)</code>，收到 <code>AttestationResponse</code> 后验证 DAC 签名</li>
        <li>App 发送 <code>CertificateChainRequest (0x02, type=1)</code> 获取 DAC 证书</li>
        <li>App 发送 <code>CertificateChainRequest (0x02, type=2)</code> 获取 PAI 证书</li>
        <li>App 验证完整信任链：DAC &rarr; PAI &rarr; PAA（PAA 从 DCL 或本地获取）</li>
        <li>App 发送 <code>AddTrustedRootCertificate (0x0B)</code> 将自己的 Root CA 证书写入设备</li>
        <li>App 发送 <code>CSRRequest (0x04)</code>，设备生成密钥对并返回 CSR</li>
        <li>App 的 CA 基于 CSR 签发 NOC 证书</li>
        <li>App 发送 <code>AddNOC (0x06)</code> 将 NOC、ICAC（可选）、IPK 写入设备</li>
        <li>设备返回 NOCResponse（StatusCode=OK，FabricIndex=1）</li>
        <li>PASE 会话结束，App 和设备建立 <strong>CASE 会话</strong>（基于 NOC 证书）</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：多管理员（Multi-Admin）—— 同一设备加入多个平台</summary>
    <div class="scenario-content">
      <p>用户先用 Apple Home 配网，再用 Google Home 配网同一台设备：</p>
      <ol>
        <li>Apple Home 已完成配网，设备有 Fabric 1（Apple 的 Root CA、VendorID、NodeID）</li>
        <li>用户在 Apple Home 中开启「多管理员配对窗口」（通过 Administrator Commissioning Cluster 的 OpenCommissioningWindow）</li>
        <li>Google Home 扫描到设备，通过新的 PASE 会话连接</li>
        <li>Google Home 重复场景 1 的步骤 2-10，使用 Google 自己的 Root CA 签发 NOC</li>
        <li>设备现在有 Fabric 1（Apple）和 Fabric 2（Google），各自独立运作</li>
        <li>读取 <code>Fabrics</code> 属性可以看到两条 FabricDescriptorStruct</li>
        <li>读取 <code>CommissionedFabrics</code> 返回 2，<code>SupportedFabrics</code> 仍然是出厂值（如 5）</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：移除 Fabric —— 取消配对或恢复出厂</summary>
    <div class="scenario-content">
      <p>用户要从某个平台上移除设备：</p>
      <ol>
        <li>App 读取 <code>Fabrics (0x0001)</code> 获取所有 Fabric 列表</li>
        <li>App 读取 <code>CurrentFabricIndex (0x0005)</code> 确认自己的 FabricIndex</li>
        <li>App 发送 <code>RemoveFabric (0x0A)</code> 并传入自己的 FabricIndex</li>
        <li>设备删除该 Fabric 的 NOC、Root 证书、ACL 等所有关联数据</li>
        <li>如果设备上还有其他 Fabric，设备继续正常运行；如果这是最后一个 Fabric，设备回到未配网状态</li>
      </ol>
      <p>
        <strong>注意</strong>：RemoveFabric 可以指定任意 FabricIndex（不限于自己的 Fabric），
        但通常只有管理员权限（Administrator ACL）才被允许执行。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：证书轮换 —— 更新已有的 NOC</summary>
    <div class="scenario-content">
      <p>当 NOC 接近过期或因安全策略需要更换密钥时：</p>
      <ol>
        <li>App 发送 <code>CSRRequest (0x04)</code> 并设置 <code>IsForUpdateNOC = true</code></li>
        <li>设备生成新密钥对，返回新 CSR</li>
        <li>App 的 CA 基于新 CSR 签发新 NOC（保持相同的 NodeID 和 FabricID）</li>
        <li>App 发送 <code>UpdateNOC (0x07)</code> 写入新 NOC</li>
        <li>旧 NOC 被替换，FabricIndex 不变，CASE 会话需要重新建立</li>
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

  .col-direction {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: #6b7280;
    white-space: nowrap;
  }

  :global(.dark) .col-direction {
    color: #9ca3af;
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
  'group-key-management': {
    title: '组密钥管理 Cluster · GroupKeyManagement（0x003F）',
    description: 'Matter GroupKeyManagement Cluster（0x003F）完整参考 — 组播通信密钥管理、KeySetWrite/Read/Remove 命令、GroupKeyMap 映射、GroupTable 查询、密钥轮换与 CacheAndSync 特性。',
    prev: undefined,
    next: undefined,
    content: `<h1>组密钥管理 Cluster（GroupKeyManagement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003F</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    GroupKeyManagement 负责管理 Matter 网络中用于组播（multicast）通信的加密密钥。
    当你需要向一组设备同时发送命令（比如「关闭客厅所有灯」）时，设备之间需要共享一套对称密钥来加密和验证组播消息。
    这个 Cluster 就是用来写入、读取、删除和维护这些密钥集的。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">CacheAndSync 特性（CS）</div>
    <p>
      GroupKeyManagement 定义了一个 <strong>CacheAndSync（CS）</strong> Feature。
      启用 CS 后，设备支持从 Distributed Compliance Ledger（DCL）缓存和同步信任的根证书，
      并允许使用 <code>CacheAndSync</code> 安全策略。未启用 CS 的设备只能使用 <code>TrustFirst</code> 策略。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#structs">数据结构</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举类型</a>
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
    GroupKeyManagement Cluster 共有 4 个命令，用于管理密钥集（KeySet）的完整生命周期：
    写入、读取、删除和列举。点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>KeySetWrite</td>
          <td>Client &rarr; Server</td>
          <td>写入或更新一个密钥集</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>KeySetRead</td>
          <td>Client &rarr; Server</td>
          <td>读取指定密钥集的信息</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>KeySetRemove</td>
          <td>Client &rarr; Server</td>
          <td>删除一个密钥集</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>KeySetReadAllIndices</td>
          <td>Client &rarr; Server</td>
          <td>列出当前 Fabric 的所有密钥集 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">KeySetWrite -- 写入密钥集（0x00）</h3>
  <p>
    写入一个完整的密钥集（GroupKeySet）到设备中。如果指定的 GroupKeySetID 已存在，则更新它。
    每个密钥集包含最多三个 Epoch 密钥，用于支持密钥轮换时的平滑过渡。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySet</td>
          <td><a href="#struct-groupkeyset">GroupKeySetStruct</a></td>
          <td>完整的密钥集结构体，包含 ID、安全策略和最多三组 Epoch 密钥</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">密钥安全</div>
    <p>
      写入的 EpochKey 是敏感数据。设备在存储后不会回传明文密钥 ——
      通过 KeySetRead 读取时，EpochKey 字段会返回 <code>null</code>，只能看到 EpochStartTime。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        Commissioner（如手机 App）在建立组播通信前，需要先通过 KeySetWrite
        将共享密钥写入所有参与组播的设备。通常在设备配网成功后、加入组之前调用。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">KeySetRead -- 读取密钥集（0x01）</h3>
  <p>
    读取指定 ID 的密钥集信息。返回 <strong>KeySetReadResponse</strong>，
    其中包含密钥集的元数据（ID、安全策略、各 Epoch 起始时间），但不包含密钥明文。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>要读取的密钥集 ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>KeySetReadResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySet</td>
          <td><a href="#struct-groupkeyset">GroupKeySetStruct</a></td>
          <td>密钥集信息（EpochKey 字段为 null，不返回明文）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        管理端需要确认某个密钥集是否已成功写入、查看其安全策略和 Epoch 时间窗口时调用。
        常用于密钥轮换前检查当前密钥集的状态。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">KeySetRemove -- 删除密钥集（0x03）</h3>
  <p>
    删除指定 ID 的密钥集。删除前需要确保没有 GroupKeyMap 条目仍在引用该密钥集，
    否则相关组将无法正常收发加密组播消息。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>要删除的密钥集 ID（不能为 0，ID 0 是 IPK 密钥集，不可删除）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">IPK 不可删除</div>
    <p>
      GroupKeySetID 为 <code>0</code> 的密钥集是 Identity Protection Key（IPK），
      由 Fabric 建立时自动创建。尝试删除 ID 0 会返回 <code>INVALID_COMMAND</code> 错误。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        密钥轮换完成后，旧密钥集不再被任何组引用时，可以通过 KeySetRemove 清理掉，释放设备存储空间。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">KeySetReadAllIndices -- 列举所有密钥集（0x04）</h3>
  <p>
    列出当前 Fabric 下所有已存储的密钥集 ID。返回 <strong>KeySetReadAllIndicesResponse</strong>。
    不需要任何参数。
  </p>

  <h4>KeySetReadAllIndicesResponse</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetIDs</td>
          <td>list&lt;uint16&gt;</td>
          <td>当前 Fabric 拥有的所有密钥集 ID 列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        管理端在执行密钥审计或轮换前，先调用此命令获取设备上所有密钥集的 ID，
        再逐个通过 KeySetRead 查看详情，决定哪些需要更新或删除。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>GroupKeyManagement Cluster 共有 4 个应用属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>可写</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>GroupKeyMap</td>
          <td>list&lt;GroupKeyMapStruct&gt;</td>
          <td class="col-required">是</td>
          <td>组 ID 与密钥集的映射关系</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>GroupTable</td>
          <td>list&lt;GroupTableStruct&gt;</td>
          <td class="col-optional">否</td>
          <td>设备上所有组的信息表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxGroupsPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">否</td>
          <td>每个 Fabric 最多支持的组数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>MaxGroupKeysPerFabric</td>
          <td>uint16</td>
          <td class="col-optional">否</td>
          <td>每个 Fabric 最多支持的密钥集数量</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- GroupKeyMap -->
  <h3 id="attr-0x0000">GroupKeyMap -- 组密钥映射（0x0000）</h3>
  <p>
    这是本 Cluster 最核心的属性。它定义了「哪个组使用哪个密钥集」的映射关系。
    每个条目将一个 GroupId 关联到一个 GroupKeySetID，设备根据这个映射来选择加解密组播消息所用的密钥。
  </p>
  <p>
    <strong>可写属性</strong> —— 管理端可以直接写入来建立或修改映射。
    一个密钥集可以被多个组共享，也可以为每个组分配独立的密钥集。
  </p>

  <h4>GroupKeyMapStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>组 ID（对应 Groups Cluster 中注册的组）</td>
        </tr>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>关联的密钥集 ID（必须是已通过 KeySetWrite 写入的）</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>所属 Fabric 索引（自动填充，Fabric 隔离）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- GroupTable -->
  <h3 id="attr-0x0001">GroupTable -- 组信息表（0x0001）</h3>
  <p>
    只读属性，展示设备上所有已注册组的详细信息。
    这个表由设备根据 Groups Cluster 的操作和 GroupKeyMap 自动维护，不能直接写入。
  </p>

  <h4>GroupTableStruct 结构</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupId</td>
          <td>group-id</td>
          <td>组 ID</td>
        </tr>
        <tr>
          <td>Endpoints</td>
          <td>list&lt;endpoint-no&gt;</td>
          <td>该组包含的 Endpoint 列表</td>
        </tr>
        <tr>
          <td>GroupName</td>
          <td>string</td>
          <td>组名称（最长 16 字节，可选）</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>所属 Fabric 索引</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- MaxGroupsPerFabric & MaxGroupKeysPerFabric -->
  <h3 id="attr-0x0002">MaxGroupsPerFabric -- 最大组数（0x0002）</h3>
  <p>
    只读属性，标识每个 Fabric 最多可以注册多少个组。
    这是设备的硬件/固件限制，管理端在规划组播拓扑时需要参考这个值。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">MaxGroupKeysPerFabric -- 最大密钥集数（0x0003）</h3>
  <p>
    只读属性，标识每个 Fabric 最多可以存储多少个密钥集。
    包括 IPK（ID = 0）在内。如果值为 3，则除了 IPK 外还能存 2 个自定义密钥集。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">容量规划</div>
    <p>
      在写入密钥集或添加组映射前，先读取 <code>MaxGroupsPerFabric</code> 和
      <code>MaxGroupKeysPerFabric</code> 确认设备还有空间。
      超出限制的写入操作会返回 <code>RESOURCE_EXHAUSTED</code> 错误。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>

  <h3 id="struct-groupkeyset">GroupKeySetStruct（密钥集结构体）</h3>
  <p>
    描述一个完整的组播密钥集。包含密钥集 ID、安全策略、以及最多三组 Epoch 密钥和对应的起始时间。
    三个 Epoch 插槽用于支持密钥轮换 —— 设备可以同时持有旧密钥和新密钥，实现无缝切换。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>GroupKeySetID</td>
          <td>uint16</td>
          <td>密钥集唯一标识。<code>0</code> 为 IPK（Identity Protection Key），由 Fabric 自动管理</td>
        </tr>
        <tr>
          <td>GroupKeySecurityPolicy</td>
          <td><a href="#enum-security-policy">GroupKeySecurityPolicyEnum</a></td>
          <td>安全策略 —— TrustFirst 或 CacheAndSync</td>
        </tr>
        <tr>
          <td>EpochKey0</td>
          <td>octstr (16 bytes) / null</td>
          <td>第一个 Epoch 密钥（128 位 AES 密钥）。读取时返回 null</td>
        </tr>
        <tr>
          <td>EpochStartTime0</td>
          <td>epoch-us / null</td>
          <td>EpochKey0 的生效时间（微秒级 UTC 时间戳）</td>
        </tr>
        <tr>
          <td>EpochKey1</td>
          <td>octstr (16 bytes) / null</td>
          <td>第二个 Epoch 密钥。用于密钥轮换过渡期</td>
        </tr>
        <tr>
          <td>EpochStartTime1</td>
          <td>epoch-us / null</td>
          <td>EpochKey1 的生效时间</td>
        </tr>
        <tr>
          <td>EpochKey2</td>
          <td>octstr (16 bytes) / null</td>
          <td>第三个 Epoch 密钥。完成轮换后的最终密钥</td>
        </tr>
        <tr>
          <td>EpochStartTime2</td>
          <td>epoch-us / null</td>
          <td>EpochKey2 的生效时间</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Epoch 密钥轮换机制</div>
    <p>
      三个 Epoch 插槽按时间顺序排列：EpochStartTime0 &lt; EpochStartTime1 &lt; EpochStartTime2。
      设备在当前时间到达对应的 EpochStartTime 后自动切换到新密钥。
      在切换窗口期内，设备能同时用旧密钥解密收到的消息、用新密钥加密发出的消息，
      保证组内设备逐步更新密钥时不会中断通信。
    </p>
  </div>

  <!-- ====== 枚举类型 ====== -->
  <h2 id="enums">枚举类型</h2>

  <h3 id="enum-security-policy">GroupKeySecurityPolicyEnum（安全策略）</h3>
  <p>定义密钥集使用的安全验证策略。决定设备如何验证组播消息的来源可信度。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">TrustFirst</span>
        <span class="enum-desc">信任优先 —— 首次收到的组播密钥即被信任。适用于大多数场景，是默认策略</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CacheAndSync</span>
        <span class="enum-desc">缓存与同步 —— 需要从 DCL 验证证书链后才信任。安全性更高，需要设备支持 CS 特性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CacheAndSync 前提</div>
    <p>
      只有设备的 <code>FeatureMap</code> 中启用了 <strong>CS</strong> 位后，
      才能在 KeySetWrite 中使用 <code>CacheAndSync</code> 策略。
      向不支持 CS 的设备写入 CacheAndSync 密钥集会返回 <code>INVALID_COMMAND</code>。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>GroupKeyManagement Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CS（CacheAndSync）</span>
        <span class="enum-desc">缓存与同步 —— 支持从 DCL 同步信任根证书，允许使用 CacheAndSync 安全策略</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个已配置两个组的设备上，GroupKeyManagement Cluster 的属性读取结果：</p>

  <pre><code>{
  // --- GroupKeyMap（密钥映射表）---
  "0x0000": [
    {
      "GroupId": 1,
      "GroupKeySetID": 1,
      "FabricIndex": 1
    },
    {
      "GroupId": 2,
      "GroupKeySetID": 1,
      "FabricIndex": 1
    }
  ],

  // --- GroupTable（组信息表，只读）---
  "0x0001": [
    {
      "GroupId": 1,
      "Endpoints": [1, 2],
      "GroupName": "客厅灯组",
      "FabricIndex": 1
    },
    {
      "GroupId": 2,
      "Endpoints": [3],
      "GroupName": "卧室灯组",
      "FabricIndex": 1
    }
  ],

  // --- 容量限制 ---
  "0x0002": 4,               // MaxGroupsPerFabric = 4
  "0x0003": 3                // MaxGroupKeysPerFabric = 3
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      GroupKeyMap 是唯一可写的属性 —— 通过写入它来绑定组和密钥集。
      GroupTable 是只读的，由设备自动根据 Groups Cluster 和 GroupKeyMap 计算生成。
      密钥集本身通过 KeySetWrite / KeySetRead 命令管理，不通过属性读写。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-setup">场景 1：为一组设备建立组播密钥</h3>
  <p>当你需要让多个设备加入同一个组并支持组播通信时：</p>
  <ol>
    <li>先读取目标设备的 <code>MaxGroupKeysPerFabric (0x0003)</code>，确认还有密钥集配额</li>
    <li>通过 <code>KeySetWrite (0x00)</code> 向每个目标设备写入相同的密钥集（相同的 GroupKeySetID 和 EpochKey）</li>
    <li>在每个设备上写入 <code>GroupKeyMap (0x0000)</code> 属性，将 GroupId 映射到刚写入的 GroupKeySetID</li>
    <li>通过 Groups Cluster 的 AddGroup 命令将设备加入对应的组</li>
    <li>读取 <code>GroupTable (0x0001)</code> 确认组信息和 Endpoint 映射正确</li>
    <li>现在可以向该组发送组播命令了，所有成员设备都能用共享密钥解密和执行</li>
  </ol>

  <h3 id="scenario-rotation">场景 2：密钥轮换（Key Rotation）</h3>
  <p>定期更换组播密钥是安全最佳实践。Matter 的三 Epoch 机制让轮换可以无缝进行：</p>
  <ol>
    <li>通过 <code>KeySetReadAllIndices (0x04)</code> 列出当前所有密钥集 ID</li>
    <li>通过 <code>KeySetRead (0x01)</code> 读取目标密钥集，检查当前的 Epoch 时间窗口</li>
    <li>生成新的 128 位 AES 密钥作为下一个 Epoch 密钥</li>
    <li>通过 <code>KeySetWrite (0x00)</code> 更新密钥集 —— 保留当前活跃的 EpochKey，将新密钥写入下一个 Epoch 插槽，设置未来的 EpochStartTime</li>
    <li>依次向组内每个设备写入相同的更新后密钥集</li>
    <li>等待所有设备都更新完毕后，新 EpochStartTime 到达时自动切换到新密钥</li>
    <li>确认所有设备已切换后，可以移除不再使用的旧 Epoch 密钥（通过下一次 KeySetWrite 覆盖）</li>
  </ol>

  <div class="callout callout-tip">
    <div class="callout-title">轮换要点</div>
    <p>
      密钥轮换的关键是 <strong>先写入所有设备，再让新密钥生效</strong>。
      如果部分设备还持有旧密钥而其他设备已切换到新密钥，这些设备之间的组播通信将中断。
      因此建议将 EpochStartTime 设置到足够远的未来，确保所有设备都有时间完成更新。
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
