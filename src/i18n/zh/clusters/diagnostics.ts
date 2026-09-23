import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'ota-software-update-provider': {
    title: 'OTA 更新提供者 Cluster · OtaSoftwareUpdateProvider（0x0029）',
    description: 'Matter OTA Software Update Provider Cluster（0x0029）完整参考 — QueryImage 固件查询、ApplyUpdateRequest 更新确认、NotifyUpdateApplied 安装通知，以及 OTA 更新流程、回滚、多设备批量更新场景详解。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>OTA 更新提供者 Cluster（OtaSoftwareUpdateProvider）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0029</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（Root Endpoint）&nbsp;|&nbsp;
    <strong>角色</strong>: Client Cluster（由 Provider 节点实现）
  </p>
  <p>
    OtaSoftwareUpdateProvider 是 Matter OTA（Over-The-Air）固件更新机制的<strong>服务端</strong> Cluster ——
    它运行在提供固件镜像的节点上（通常是 Hub、网关或云端代理），负责响应其他设备的固件查询请求、
    管控更新节奏、以及接收更新完成通知。
  </p>
  <p>
    在 Matter 的 OTA 架构中，需要更新的设备叫做 <strong>Requestor</strong>（请求者），
    提供固件的节点叫做 <strong>Provider</strong>（提供者）。Requestor 主动向 Provider 发起查询，
    Provider 告诉它有没有新版本、从哪里下载、是否需要用户同意。整个流程是「拉取」模式，不是推送。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Client Cluster 说明</div>
    <p>
      OtaSoftwareUpdateProvider 是一个 <strong>Client Cluster</strong> —— 它定义的是 Provider 端接收的命令，
      而不是暴露的属性。因此这个 Cluster <strong>没有属性可读取</strong>，所有交互都通过命令完成。
      与之配对的 <strong>OtaSoftwareUpdateRequestor（0x002A）</strong> 是 Server Cluster，
      运行在需要更新的设备上，负责发起查询和执行下载。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
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
    OtaSoftwareUpdateProvider Cluster 共有 3 个请求命令，其中 2 个有对应的响应命令，1 个是单向通知。
    这三个命令构成了完整的 OTA 更新生命周期：查询 → 确认安装 → 通知完成。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <h3>Requestor → Provider（请求命令）</h3>
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
          <td>QueryImage</td>
          <td>查询是否有可用的固件更新</td>
          <td>QueryImageResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>ApplyUpdateRequest</td>
          <td>下载完成，请求确认是否安装</td>
          <td>ApplyUpdateResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>NotifyUpdateApplied</td>
          <td>通知 Provider 更新已成功安装</td>
          <td class="col-optional">无响应</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Provider → Requestor（响应命令）</h3>
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
          <td>QueryImageResponse</td>
          <td>返回固件查询结果（有无更新、下载地址等）</td>
          <td>QueryImage</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>ApplyUpdateResponse</td>
          <td>返回是否允许安装更新</td>
          <td>ApplyUpdateRequest</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">QueryImage —— 查询固件更新（0x00）</h3>
  <p>
    Requestor 发送此命令询问 Provider：「我是这个型号、这个版本的设备，你那有没有更新给我？」
    这是整个 OTA 流程的<strong>第一步</strong>。Provider 根据 Requestor 提供的厂商 ID、产品 ID、
    当前版本号等信息，判断是否有适用的固件镜像。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>是</td>
          <td>Requestor 的厂商 ID（与 BasicInformation Cluster 中的一致）</td>
        </tr>
        <tr>
          <td>ProductID</td>
          <td>uint16</td>
          <td>是</td>
          <td>Requestor 的产品 ID</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>是</td>
          <td>Requestor 当前运行的固件版本号</td>
        </tr>
        <tr>
          <td>ProtocolsSupported</td>
          <td>list&lt;<a href="#enum-protocol">DownloadProtocolEnum</a>&gt;</td>
          <td>是</td>
          <td>Requestor 支持的下载协议列表（如 BDX、HTTPS）</td>
        </tr>
        <tr>
          <td>HardwareVersion</td>
          <td>uint16</td>
          <td>否</td>
          <td>Requestor 的硬件版本号（某些固件仅适用于特定硬件版本）</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>String (2 字符)</td>
          <td>否</td>
          <td>ISO 3166-1 alpha-2 国家代码（如 <code>"CN"</code>），用于区域限定的固件分发</td>
        </tr>
        <tr>
          <td>RequestorCanConsent</td>
          <td>bool</td>
          <td>否</td>
          <td>Requestor 是否有能力向用户展示更新同意对话框（如带屏幕的设备）</td>
        </tr>
        <tr>
          <td>MetadataForProvider</td>
          <td>octstr</td>
          <td>否</td>
          <td>厂商自定义的元数据（Provider 可据此做额外判断）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>QueryImageResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>条件</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>始终</td>
          <td>查询结果状态</td>
        </tr>
        <tr>
          <td>DelayedActionTime</td>
          <td>uint32（秒）</td>
          <td>可选</td>
          <td>当 Status 为 Busy 时，建议 Requestor 等待这么多秒后重试</td>
        </tr>
        <tr>
          <td>ImageURI</td>
          <td>String (max 256)</td>
          <td>UpdateAvailable</td>
          <td>固件镜像的下载地址（BDX URI 或 HTTPS URL）</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>UpdateAvailable</td>
          <td>新固件的版本号</td>
        </tr>
        <tr>
          <td>SoftwareVersionString</td>
          <td>String (max 64)</td>
          <td>UpdateAvailable</td>
          <td>新固件的版本字符串（人类可读，如 <code>"2.0.0"</code>）</td>
        </tr>
        <tr>
          <td>UpdateToken</td>
          <td>octstr (max 32)</td>
          <td>UpdateAvailable</td>
          <td>更新令牌 —— 后续 ApplyUpdateRequest 和 NotifyUpdateApplied 必须携带此令牌</td>
        </tr>
        <tr>
          <td>UserConsentNeeded</td>
          <td>bool</td>
          <td>可选</td>
          <td>是否需要用户在 Requestor 侧手动确认更新（默认 false）</td>
        </tr>
        <tr>
          <td>MetadataForRequestor</td>
          <td>octstr</td>
          <td>可选</td>
          <td>Provider 返回给 Requestor 的厂商自定义数据</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">UpdateToken 的重要性</div>
    <p>
      <code>UpdateToken</code> 是贯穿整个 OTA 流程的凭据。Requestor 在后续的 <code>ApplyUpdateRequest</code>
      和 <code>NotifyUpdateApplied</code> 中必须携带同一个 Token，Provider 借此追踪更新会话。
      Token 最长 32 字节，由 Provider 生成，内容和格式由厂商自定义。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        Requestor 通常在以下时机调用 QueryImage：周期性检查（如每 24 小时）、设备重启后、或收到管理员的检查指令。
        Provider 可能返回 <code>Busy</code> 并附带 <code>DelayedActionTime</code>，让 Requestor 稍后重试
        —— 这在大规模设备场群中很常见，Provider 通过错峰控制避免同时下载导致的网络拥塞。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">ApplyUpdateRequest —— 请求安装更新（0x02）</h3>
  <p>
    Requestor 下载完固件镜像并校验通过后，发送此命令询问 Provider：「我准备好安装了，可以继续吗？」
    Provider 可以在此刻做最后的决策 —— 批准安装、要求等待、或者取消更新。
    这一步的存在让 Provider 对整个更新流程拥有最终控制权。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UpdateToken</td>
          <td>octstr</td>
          <td>QueryImageResponse 中返回的更新令牌</td>
        </tr>
        <tr>
          <td>NewVersion</td>
          <td>uint32</td>
          <td>即将安装的新固件版本号（应与 QueryImageResponse 中的 SoftwareVersion 一致）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ApplyUpdateResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Action</td>
          <td><a href="#enum-action">ApplyUpdateActionEnum</a></td>
          <td>Provider 对安装请求的决策</td>
        </tr>
        <tr>
          <td>DelayedActionTime</td>
          <td>uint32（秒）</td>
          <td>当 Action 为 AwaitNextAction 时，Requestor 应等待这么多秒后再次请求</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Provider 的更新控制权</div>
    <p>
      即使 Requestor 已经下载好了固件，Provider 仍然可以通过 <code>AwaitNextAction</code> 延迟安装时间
      （比如等到凌晨低峰期），或通过 <code>Discontinue</code> 直接取消更新（比如发现这个版本有严重 bug）。
      这种设计让 Provider 在整个 OTA 流程中始终保持控制力。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        典型流程：Requestor 下载完固件 → 校验 OTA Image 签名 → 发送 ApplyUpdateRequest → 收到 Proceed → 执行安装并重启。
        如果 Provider 返回 AwaitNextAction，Requestor 应等待 DelayedActionTime 秒后重新发送 ApplyUpdateRequest。
        如果收到 Discontinue，Requestor 应放弃安装并丢弃已下载的镜像。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">NotifyUpdateApplied —— 通知更新已完成（0x04）</h3>
  <p>
    Requestor 成功安装固件并重启后，发送此命令告知 Provider 更新已完成。
    这是整个 OTA 流程的<strong>最后一步</strong> —— 一个单向通知，没有响应命令。
    Provider 收到后可以更新自己的记录（如标记该设备已更新到新版本）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UpdateToken</td>
          <td>octstr</td>
          <td>本次更新会话的令牌（与 QueryImageResponse 中的一致）</td>
        </tr>
        <tr>
          <td>SoftwareVersion</td>
          <td>uint32</td>
          <td>更新后的当前固件版本号</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">为什么没有响应？</div>
    <p>
      NotifyUpdateApplied 是纯通知性质的 —— Requestor 不需要 Provider 的确认。
      设备已经成功重启运行在新版本上，即使 Provider 没收到这个通知，也不影响设备正常工作。
      Provider 端通常用这个通知来更新统计数据（如「已有多少设备升级到新版本」）。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景与注意事项</summary>
    <div class="scenario-content">
      <p>
        设备重启后应尽快发送此通知。如果 Requestor 在重启后无法立即连接到 Provider（如网络恢复需要时间），
        它应该在恢复连接后补发。规范建议 Requestor 在重启后的首次 Idle 状态下发送 NotifyUpdateApplied。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-status">StatusEnum（查询结果状态）</h3>
  <p>QueryImageResponse 的 <code>Status</code> 字段使用此枚举，表示 Provider 对固件查询的回答。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UpdateAvailable</span>
        <span class="enum-desc">有可用更新 —— 响应中包含下载地址、版本号、UpdateToken 等完整信息</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Busy</span>
        <span class="enum-desc">Provider 当前繁忙 —— Requestor 应等待 DelayedActionTime 秒后重试</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAvailable</span>
        <span class="enum-desc">无可用更新 —— 当前固件已是最新版本</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">DownloadProtocolNotSupported</span>
        <span class="enum-desc">下载协议不支持 —— Requestor 声明的协议列表中没有 Provider 能提供的</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Status 处理速查</div>
    <p>
      <strong>UpdateAvailable</strong> → 开始下载 ImageURI 指向的固件；
      <strong>Busy</strong> → 等待 DelayedActionTime 秒后重新 QueryImage；
      <strong>NotAvailable</strong> → 无事可做，按正常周期下次再查；
      <strong>DownloadProtocolNotSupported</strong> → 检查 Requestor 的 ProtocolsSupported 列表，确认是否遗漏了 Provider 支持的协议。
    </p>
  </div>

  <h3 id="enum-action">ApplyUpdateActionEnum（安装决策）</h3>
  <p>ApplyUpdateResponse 的 <code>Action</code> 字段使用此枚举，表示 Provider 对安装请求的决策。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Proceed</span>
        <span class="enum-desc">允许安装 —— Requestor 可以立即执行固件安装并重启</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AwaitNextAction</span>
        <span class="enum-desc">暂缓安装 —— Requestor 应等待 DelayedActionTime 秒后再次请求</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Discontinue</span>
        <span class="enum-desc">取消更新 —— Requestor 应放弃安装并丢弃已下载的镜像</span>
      </div>
    </div>
  </div>

  <h3 id="enum-protocol">DownloadProtocolEnum（下载协议）</h3>
  <p>QueryImage 的 <code>ProtocolsSupported</code> 参数使用此枚举，声明 Requestor 支持哪些固件下载方式。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">BDXSynchronous</span>
        <span class="enum-desc">BDX 同步传输 —— Matter 内置的块数据交换协议（最常用，适合局域网内传输）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">BDXAsynchronous</span>
        <span class="enum-desc">BDX 异步传输 —— 允许传输过程中穿插其他 Matter 消息</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HTTPS</span>
        <span class="enum-desc">HTTPS 下载 —— 从 Web 服务器下载，适合设备能直接访问互联网的场景</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">VendorSpecific</span>
        <span class="enum-desc">厂商自定义协议 —— 使用厂商私有的传输方式</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">BDX vs HTTPS</div>
    <p>
      大多数 Matter 设备使用 <strong>BDX（Bulk Data Exchange）</strong> 协议下载固件，
      因为它走 Matter 消息通道，不需要设备有独立的互联网连接能力。
      <strong>HTTPS</strong> 适合有 Wi-Fi 的设备直接从云端下载，速度更快但需要设备能访问外网。
      Thread 设备（如门锁、传感器）通常只支持 BDX，因为它们通过 Border Router 联网，不一定能直接发起 HTTPS 请求。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>

  <h3>QueryImage 交互示例</h3>
  <p>Requestor 向 Provider 查询可用更新 —— Provider 回复「有新版本可用」：</p>
  <pre><code>// Requestor → Provider：查询是否有可用固件
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x00"          // QueryImage
    },
    "commandFields": {
      "vendorID": 65521,           // 厂商 ID（0xFFF1 = 测试厂商）
      "productID": 32769,          // 产品 ID
      "softwareVersion": 1,        // 当前固件版本号
      "protocolsSupported": [0],   // 支持的下载协议：BDXSynchronous
      "hardwareVersion": 0,        // 可选：硬件版本
      "location": "CN",            // 可选：ISO 3166-1 国家代码
      "requestorCanConsent": true, // 可选：Requestor 能否向用户展示同意确认
      "metadataForProvider": null  // 可选：厂商自定义数据
    }
  }]
}

// Provider → Requestor：有可用更新
{
  "status": 0,                     // UpdateAvailable
  "delayedActionTime": 0,         // 无需等待，立即可下载
  "imageURI": "bdx://provider-node-id/firmware-v2.ota",
  "softwareVersion": 2,           // 新固件版本号
  "softwareVersionString": "2.0.0",
  "updateToken": "dXBkYXRlLXRva2VuLXYy", // Base64 编码的更新令牌
  "userConsentNeeded": false,      // 无需用户额外确认
  "metadataForRequestor": null     // 无厂商自定义数据
}</code></pre>

  <h3>ApplyUpdateRequest 交互示例</h3>
  <p>Requestor 下载完成，向 Provider 确认是否可以安装：</p>
  <pre><code>// Requestor → Provider：下载完成，请求应用更新
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x02"          // ApplyUpdateRequest
    },
    "commandFields": {
      "updateToken": "dXBkYXRlLXRva2VuLXYy",  // QueryImageResponse 中的令牌
      "newVersion": 2              // 即将安装的版本号
    }
  }]
}

// Provider → Requestor：确认继续安装
{
  "action": 0,                     // Proceed（允许安装）
  "delayedActionTime": 0           // 无需等待
}</code></pre>

  <h3>NotifyUpdateApplied 示例</h3>
  <p>Requestor 安装成功并重启后，通知 Provider 更新已完成：</p>
  <pre><code>// Requestor → Provider：已成功安装并重启
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0029",
      "commandId": "0x04"          // NotifyUpdateApplied
    },
    "commandFields": {
      "updateToken": "dXBkYXRlLXRva2VuLXYy",  // 原始更新令牌
      "softwareVersion": 2         // 更新后的当前版本号
    }
  }]
}
// 此命令无响应（单向通知）</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      在开发 OTA Provider 时，最核心的逻辑在 QueryImage 的处理 —— 你需要根据 VendorID + ProductID + SoftwareVersion
      匹配正确的固件，并通过 ProtocolsSupported 选择合适的下载方式。
      如果你的设备群规模较大，善用 <code>Busy</code> 状态和 <code>DelayedActionTime</code> 做错峰分发。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：标准固件更新流程</summary>
    <div class="scenario-content">
      <ol>
        <li>Requestor 向 Provider 发送 <a href="#cmd-0x00"><code>QueryImage (0x00)</code></a>，携带自身的厂商 ID、产品 ID、当前版本号和支持的下载协议</li>
        <li>Provider 回复 <code>QueryImageResponse</code>，Status = <code>UpdateAvailable</code>，包含 ImageURI、新版本号和 UpdateToken</li>
        <li>Requestor 通过 ImageURI 下载固件镜像（BDX 或 HTTPS）</li>
        <li>下载完成后，Requestor 校验镜像签名（OTA Image 头部包含厂商签名）</li>
        <li>校验通过，Requestor 发送 <a href="#cmd-0x02"><code>ApplyUpdateRequest (0x02)</code></a>，携带 UpdateToken 和 NewVersion</li>
        <li>Provider 回复 <code>ApplyUpdateResponse</code>，Action = <code>Proceed</code></li>
        <li>Requestor 执行固件安装并重启</li>
        <li>重启后，Requestor 发送 <a href="#cmd-0x04"><code>NotifyUpdateApplied (0x04)</code></a>，告知 Provider 更新成功</li>
      </ol>
      <p>整个流程从查询到安装完成，通常需要数分钟到数十分钟，取决于固件大小和网络条件。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：固件回滚（紧急撤回有问题的版本）</summary>
    <div class="scenario-content">
      <ol>
        <li>厂商发现新版本 v2.0.0 有严重 bug，需要紧急撤回</li>
        <li>Provider 端下架 v2.0.0 的固件，改为提供 v1.0.1（修复版或回退版）</li>
        <li>已更新到 v2.0.0 的设备下次 QueryImage 时，Provider 回复 UpdateAvailable，指向 v1.0.1</li>
        <li>尚未更新的设备 QueryImage 时，Provider 回复 <code>NotAvailable</code>（跳过 v2.0.0）</li>
        <li>如果有设备已下载 v2.0.0 但还没安装（在 ApplyUpdateRequest 阶段），Provider 回复 <code>Discontinue</code> 取消安装</li>
      </ol>
      <p>
        <strong>关键点</strong>：Matter OTA 规范允许「降级」更新 —— SoftwareVersion 可以比当前版本低。
        但实际能否降级取决于设备端的实现：部分设备的 bootloader 可能会拒绝安装低于当前版本的固件。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：多设备批量更新（错峰分发）</summary>
    <div class="scenario-content">
      <ol>
        <li>厂商发布新固件，设备群中有 10,000 台设备需要更新</li>
        <li>Provider 不希望所有设备同时下载，避免网络拥塞</li>
        <li>前 100 台设备 QueryImage 时，Provider 回复 <code>UpdateAvailable</code>，立即允许下载</li>
        <li>第 101 台开始，Provider 回复 <code>Busy</code>，DelayedActionTime = 3600（1 小时后重试）</li>
        <li>每批完成后，Provider 逐步放开下一批的配额</li>
        <li>如果某设备下载完成后 Provider 希望它等到凌晨再安装，ApplyUpdateRequest 回复 <code>AwaitNextAction</code>，DelayedActionTime 设为到凌晨的秒数</li>
      </ol>
      <p>
        <strong>实现建议</strong>：Provider 可以维护一个更新队列和并发计数器。
        通过灵活使用 <code>Busy</code>（控制下载并发）和 <code>AwaitNextAction</code>（控制安装时机），
        实现从容的灰度发布和错峰分发。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：需要用户同意的更新</summary>
    <div class="scenario-content">
      <ol>
        <li>Requestor 在 QueryImage 中声明 <code>RequestorCanConsent = true</code>（设备有屏幕，可以展示确认对话框）</li>
        <li>Provider 回复 UpdateAvailable，<code>UserConsentNeeded = true</code></li>
        <li>Requestor 收到响应后，在设备屏幕上弹出确认对话框：「有新版本 v2.0.0 可用，是否更新？」</li>
        <li>用户点击「确认」后，Requestor 才开始下载固件</li>
        <li>如果用户拒绝，Requestor 暂不下载，下次检查周期再次询问</li>
      </ol>
      <p>
        <strong>无屏设备</strong>：如果 Requestor 没有屏幕（<code>RequestorCanConsent = false</code>），
        Provider 通常不会设置 UserConsentNeeded = true。对于这类设备，用户同意可以通过手机 App 中的
        OTA 管理界面来实现（App 作为中间人传达用户意图）。
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
  'ota-software-update-requestor': {
    title: 'OTA 更新请求者 Cluster · OtaSoftwareUpdateRequestor（0x002A）',
    description: 'Matter OTA Software Update Requestor Cluster（0x002A）完整参考 — AnnounceOTAProvider 命令、DefaultOTAProviders / UpdateState / UpdateStateProgress 属性、UpdateStateEnum / AnnouncementReasonEnum / ChangeReasonEnum 枚举、StateTransition / VersionApplied / DownloadError 事件及典型 OTA 更新场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>OTA 更新请求者 Cluster（OtaSoftwareUpdateRequestor）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x002A</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root Endpoint）&nbsp;|&nbsp;
    <strong>角色</strong>: Server（设备作为 OTA 客户端）
  </p>
  <p>
    OtaSoftwareUpdateRequestor 是 Matter OTA 升级体系中的<strong>客户端侧</strong> —— 即<strong>需要被升级的设备</strong>。
    它负责向 OTA Provider（升级提供者，对应 Cluster 0x0029）查询是否有新版本、下载固件、应用更新。
    所有支持 OTA 的 Matter 设备都必须实现这个 Cluster。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">OTA 双 Cluster 架构</div>
    <p>
      Matter 的 OTA 升级由两个 Cluster 配合完成：
      <strong>OtaSoftwareUpdateProvider（0x0029）</strong> 是「服务端」，负责托管固件并响应查询；
      <strong>OtaSoftwareUpdateRequestor（0x002A）</strong> 是「客户端」，负责发起查询、下载并应用更新。
      本页描述的是后者 —— 设备侧的行为。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举速查</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    OtaSoftwareUpdateRequestor 只有 1 个命令。它不是由设备自己发起的，而是由外部节点
    （通常是 OTA Provider 或管理节点）发送给设备，告知设备可以去某个 Provider 查询更新。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>方向</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>AnnounceOTAProvider</td>
          <td>通知设备有可用的 OTA Provider</td>
          <td>Client → Server</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">AnnounceOTAProvider —— 通告 OTA 提供者（0x00）</h3>
  <p>
    外部节点通过此命令告知设备：「有一个 OTA Provider 可以为你提供更新」。
    收到此命令后，设备应尽快向指定的 Provider 发起更新查询（调用 Provider 的 QueryImage 命令）。
    这是推送式 OTA 的核心触发机制 —— 让设备不必一直轮询，而是被动通知后再查询。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProviderNodeID</td>
          <td>node-id</td>
          <td>是</td>
          <td>OTA Provider 节点的 Node ID</td>
        </tr>
        <tr>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td>是</td>
          <td>Provider 的 Vendor ID，设备可据此判断是否信任该 Provider</td>
        </tr>
        <tr>
          <td>AnnouncementReason</td>
          <td>AnnouncementReasonEnum</td>
          <td>是</td>
          <td>通告原因（见<a href="#enum-announcement-reason">枚举说明</a>）</td>
        </tr>
        <tr>
          <td>MetadataForNode</td>
          <td>octstr</td>
          <td>否</td>
          <td>Provider 传给设备的自定义元数据（最长 512 字节，可选）</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>是</td>
          <td>Provider 节点上 OTA Provider Cluster 所在的 Endpoint</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        管理后台发布了新固件，通过 Hub 或管理节点向所有目标设备发送 AnnounceOTAProvider 命令。
        设备收到后，会向指定的 Provider 查询可用更新。如果 AnnouncementReason 是 UrgentUpdateAvailable，
        设备应优先处理，可能跳过用户确认直接开始下载。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>OtaSoftwareUpdateRequestor 有 4 个应用属性，分为「Provider 配置」和「更新状态」两组。</p>

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
        <!-- Provider 配置 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>DefaultOTAProviders</td>
          <td>list&lt;ProviderLocation&gt;</td>
          <td><a href="#group-provider">Provider 配置</a></td>
          <td>默认 OTA Provider 列表</td>
        </tr>
        <!-- 更新状态 -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>UpdatePossible</td>
          <td>bool</td>
          <td><a href="#group-state">更新状态</a></td>
          <td>设备是否可以接受更新</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>UpdateState</td>
          <td>UpdateStateEnum</td>
          <td><a href="#group-state">更新状态</a></td>
          <td>当前 OTA 更新状态机的状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>UpdateStateProgress</td>
          <td>uint8 / null</td>
          <td><a href="#group-state">更新状态</a></td>
          <td>更新进度百分比（0-100）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Provider 配置（0x0000）====== -->
  <h3 id="group-provider">Provider 配置（0x0000）</h3>
  <p>配置设备应该向哪些 OTA Provider 查询更新。每个 Fabric 最多配置一个 Provider。</p>

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
          <td>DefaultOTAProviders（默认 OTA 提供者）</td>
          <td>list&lt;ProviderLocation&gt;</td>
          <td>
            设备默认查询的 OTA Provider 列表。每个条目是一个 <code>ProviderLocation</code> 结构体。
            写入需要 <strong>manage</strong> 权限（Administrator 角色）。
            每个 Fabric 最多包含一个条目 —— 同一 Fabric 写入新的会覆盖旧的
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProviderLocation 结构体</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProviderNodeID</td>
          <td>node-id</td>
          <td>OTA Provider 的 Node ID</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>Provider 上 OTA Provider Cluster 所在的 Endpoint</td>
        </tr>
        <tr>
          <td>FabricIndex</td>
          <td>fabric-idx</td>
          <td>此条目所属的 Fabric 索引（由系统自动填入）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Fabric 级别隔离</div>
    <p>
      DefaultOTAProviders 是按 Fabric 隔离的 —— 每个 Fabric（管理域）只能看到和修改自己的条目。
      这意味着设备同时加入多个 Fabric 时，各个 Fabric 的管理者可以各自指定自己的 OTA Provider，互不影响。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 更新状态（0x0001 - 0x0003）====== -->
  <h3 id="group-state">更新状态（0x0001 - 0x0003）</h3>
  <p>反映设备当前的 OTA 更新状态。这些属性均为只读，App 端通过订阅这些属性来跟踪更新进度。</p>

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
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>UpdatePossible（可否更新）</td>
          <td>bool</td>
          <td>
            设备当前是否能够接受 OTA 更新。<code>true</code> 表示可以，<code>false</code> 表示设备当前不允许更新
            （例如正在执行关键操作、电量过低等）。默认值为 <code>true</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>UpdateState（更新状态）</td>
          <td>UpdateStateEnum</td>
          <td>
            设备 OTA 状态机的当前状态（见<a href="#enum-update-state">枚举说明</a>）。
            从这个属性可以知道设备正在查询、下载、应用还是空闲
          </td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>UpdateStateProgress（更新进度）</td>
          <td>uint8 / null</td>
          <td>
            当前更新操作的进度百分比，取值 0-100。Nullable —— <code>null</code> 表示进度不可用
            （例如设备处于 Idle 状态，或所处阶段无法计算进度时为 null）
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">进度百分比的含义随状态变化</div>
    <p>
      <code>UpdateStateProgress</code> 的含义取决于 <code>UpdateState</code> 的当前值。
      在 Downloading 状态下表示下载进度，在 Applying 状态下表示安装/写入进度。
      状态切换时进度可能重置为 0 或 null。不要假设它是一个线性增长的全局进度值。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">枚举速查</h2>

  <!-- UpdateStateEnum -->
  <h3 id="enum-update-state">UpdateStateEnum —— 更新状态</h3>
  <p>描述设备 OTA 状态机的完整生命周期，共 9 个状态：</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知 —— 设备刚启动、尚未确定更新状态</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Idle</span>
        <span class="enum-desc">空闲 —— 无更新活动，正常运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Querying</span>
        <span class="enum-desc">查询中 —— 正在向 Provider 查询是否有可用更新</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">DelayedOnQuery</span>
        <span class="enum-desc">查询延迟 —— Provider 要求设备等待一段时间后再重试查询</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Downloading</span>
        <span class="enum-desc">下载中 —— 正在从 Provider 下载固件镜像</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Applying</span>
        <span class="enum-desc">应用中 —— 正在将下载的固件写入闪存并验证</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">DelayedOnApply</span>
        <span class="enum-desc">应用延迟 —— 固件已就绪，等待合适时机重启应用（例如等待用户确认或低峰期）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">RollingBack</span>
        <span class="enum-desc">回滚中 —— 更新失败，正在恢复到之前的固件版本</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">DelayedOnUserConsent</span>
        <span class="enum-desc">等待用户同意 —— 更新已就绪，等待用户在设备或 App 上确认后再继续</span>
      </div>
    </div>
  </div>

  <!-- AnnouncementReasonEnum -->
  <h3 id="enum-announcement-reason">AnnouncementReasonEnum —— 通告原因</h3>
  <p>AnnounceOTAProvider 命令中使用，告知设备此次通告的原因：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">SimpleAnnouncement</span>
        <span class="enum-desc">普通通告 —— 仅告知存在一个 Provider，设备可自行决定是否查询</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UpdateAvailable</span>
        <span class="enum-desc">有更新可用 —— 明确告知有新版本，设备应尽快查询</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UrgentUpdateAvailable</span>
        <span class="enum-desc">紧急更新 —— 有安全补丁或严重 bug 修复，设备应立即查询并优先更新</span>
      </div>
    </div>
  </div>

  <!-- ChangeReasonEnum -->
  <h3 id="enum-change-reason">ChangeReasonEnum —— 状态变更原因</h3>
  <p>在 StateTransition 事件中使用，说明状态机发生状态转移的原因：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知原因</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">上一步操作成功，正常推进到下一阶段</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Failure</span>
        <span class="enum-desc">操作失败（如下载中断、校验失败）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">TimeOut</span>
        <span class="enum-desc">操作超时（如 Provider 无响应）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">DelayByProvider</span>
        <span class="enum-desc">Provider 要求延迟 —— Provider 返回了 Busy 或指定了重试等待时间</span>
      </div>
    </div>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    OtaSoftwareUpdateRequestor 定义了 3 个事件，覆盖了 OTA 生命周期的关键节点。
    订阅这些事件可以实时跟踪设备的更新流程，比轮询属性更及时。
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>StateTransition</td>
          <td>Info</td>
          <td>OTA 状态机发生状态转移时触发</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>VersionApplied</td>
          <td>Critical</td>
          <td>新固件版本成功应用后触发</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>DownloadError</td>
          <td>Info</td>
          <td>固件下载过程中发生错误时触发</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- StateTransition 事件详解 -->
  <h3 id="event-0x00">StateTransition —— 状态转移事件（0x00）</h3>
  <p>
    每当 OTA 状态机从一个状态转移到另一个状态时触发。这是追踪更新流程最核心的事件 ——
    通过监听它可以知道设备从空闲到查询、从下载到应用的每一步。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousState</td>
          <td><code>0x00</code></td>
          <td>UpdateStateEnum</td>
          <td>转移前的状态</td>
        </tr>
        <tr>
          <td>NewState</td>
          <td><code>0x01</code></td>
          <td>UpdateStateEnum</td>
          <td>转移后的新状态</td>
        </tr>
        <tr>
          <td>Reason</td>
          <td><code>0x02</code></td>
          <td>ChangeReasonEnum</td>
          <td>触发此次转移的原因</td>
        </tr>
        <tr>
          <td>TargetSoftwareVersion</td>
          <td><code>0x03</code></td>
          <td>uint32 / null</td>
          <td>目标固件版本号。null 表示尚未确定（例如从 Idle 到 Querying 时还不知道目标版本）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>事件上报示例 —— 从 Idle 转入 Downloading：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x00"          // StateTransition
      },
      "eventNumber": 15,
      "priority": "INFO",
      "data": {
        "0": 1,                    // PreviousState = Idle
        "1": 4,                    // NewState = Downloading
        "2": 1,                    // Reason = Success（查询成功，开始下载）
        "3": 5                     // TargetSoftwareVersion = 5
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- VersionApplied 事件详解 -->
  <h3 id="event-0x01">VersionApplied —— 版本已应用事件（0x01）</h3>
  <p>
    新固件版本成功应用后触发（通常在设备重启后上报）。这个事件是确认「更新真正完成」的标志。
    优先级为 Critical，确保即使在事件队列满时也不会被丢弃。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SoftwareVersion</td>
          <td><code>0x00</code></td>
          <td>uint32</td>
          <td>刚刚应用的新固件版本号</td>
        </tr>
        <tr>
          <td>ProductID</td>
          <td><code>0x01</code></td>
          <td>uint16</td>
          <td>设备的产品 ID</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>事件上报示例：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x01"          // VersionApplied
      },
      "eventNumber": 18,
      "priority": "CRITICAL",
      "data": {
        "0": 5,                    // SoftwareVersion = 5（刚刚应用的版本号）
        "1": 4                     // ProductID = 4（产品 ID）
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- DownloadError 事件详解 -->
  <h3 id="event-0x02">DownloadError —— 下载错误事件（0x02）</h3>
  <p>
    固件下载过程中遇到错误时触发。此事件提供了出错时的上下文信息（已下载量、进度等），
    有助于诊断网络问题或 Provider 端故障。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SoftwareVersion</td>
          <td><code>0x00</code></td>
          <td>uint32</td>
          <td>正在下载的目标固件版本号</td>
        </tr>
        <tr>
          <td>BytesDownloaded</td>
          <td><code>0x01</code></td>
          <td>uint64</td>
          <td>出错前已成功下载的字节数</td>
        </tr>
        <tr>
          <td>ProgressPercent</td>
          <td><code>0x02</code></td>
          <td>uint8 / null</td>
          <td>出错时的下载进度百分比（0-100），null 表示无法计算</td>
        </tr>
        <tr>
          <td>PlatformCode</td>
          <td><code>0x03</code></td>
          <td>int64 / null</td>
          <td>平台特定的错误码，null 表示无额外信息。具体含义由设备厂商定义</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>事件上报示例 —— 下载到 75% 时出错：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x002A",
        "eventId": "0x02"          // DownloadError
      },
      "eventNumber": 16,
      "priority": "INFO",
      "data": {
        "0": 5,                    // SoftwareVersion = 5
        "1": 512,                  // BytesDownloaded = 512
        "2": 75,                   // ProgressPercent = 75（下载到 75% 时出错）
        "3": -1                    // PlatformCode = -1（平台错误码，nullable）
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个处于空闲状态的设备的 OtaSoftwareUpdateRequestor Cluster 属性读取结果：</p>

  <pre><code>{
  // --- 默认 OTA 提供者 ---
  "0x0000": [                     // DefaultOTAProviders（可配置多个）
    {
      "providerNodeID": 12345,    // Provider 的 Node ID
      "endpoint": 0,              // Provider 上 OTA Provider Cluster 所在的 Endpoint
      "fabricIndex": 1            // 所属 Fabric 索引
    }
  ],

  // --- 更新能力 ---
  "0x0001": true,                 // UpdatePossible = true（设备当前可以接受更新）

  // --- 更新状态 ---
  "0x0002": 0,                    // UpdateState = Idle（当前空闲，未在更新流程中）
  "0x0003": null                  // UpdateStateProgress = null（无进度信息）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      OTA Requestor Cluster 位于 <code>Endpoint 0</code>（Root Endpoint），不在功能端点上。
      读取属性时注意指定正确的 Endpoint。此外，<code>DefaultOTAProviders</code> 是 Fabric-scoped 列表，
      你只能看到当前 Fabric 的条目。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：正常 OTA 更新流程</summary>
    <div class="scenario-content">
      <p>一次完整的 OTA 更新从通告到应用的典型流程：</p>
      <ol>
        <li>管理节点向设备发送 <code>AnnounceOTAProvider (0x00)</code>，告知有可用的 Provider</li>
        <li>设备向 Provider 发起 QueryImage 请求 —— UpdateState 从 Idle 变为 <strong>Querying</strong></li>
        <li>Provider 返回可用更新 —— 设备开始下载，UpdateState 变为 <strong>Downloading</strong></li>
        <li>下载过程中，UpdateStateProgress 从 0 逐渐增长到 100</li>
        <li>下载完成，设备验证固件并开始写入 —— UpdateState 变为 <strong>Applying</strong></li>
        <li>写入完成，设备重启应用新固件 —— 重启后触发 <strong>VersionApplied</strong> 事件</li>
        <li>UpdateState 回到 <strong>Idle</strong>，整个流程结束</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：Provider 通告触发更新</summary>
    <div class="scenario-content">
      <p>通过 AnnounceOTAProvider 命令的不同原因触发不同的设备行为：</p>
      <ol>
        <li><strong>SimpleAnnouncement (0)</strong>：设备可以在方便时查询，不急迫。适合常规固件发布场景</li>
        <li><strong>UpdateAvailable (1)</strong>：明确告知有新版本，设备应尽快查询。适合功能更新</li>
        <li><strong>UrgentUpdateAvailable (2)</strong>：紧急安全补丁，设备应立即查询并优先下载。
          此时设备可能跳过 DelayedOnUserConsent 直接进入下载，确保安全漏洞尽快修补</li>
      </ol>
      <p>
        App 端在收到 StateTransition 事件时，可根据 Reason 字段判断是否需要向用户展示通知。
        UrgentUpdateAvailable 触发的更新建议弹出醒目提示。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：更新进度跟踪</summary>
    <div class="scenario-content">
      <p>App 端实时展示 OTA 更新进度的实现方式：</p>
      <ol>
        <li>订阅 <code>UpdateState (0x0002)</code> 和 <code>UpdateStateProgress (0x0003)</code> 属性</li>
        <li>同时订阅 <code>StateTransition</code>、<code>VersionApplied</code>、<code>DownloadError</code> 三个事件</li>
        <li>根据 UpdateState 的值显示不同的 UI 状态：
          <ul>
            <li>Idle → 显示「固件已是最新」或「检查更新」按钮</li>
            <li>Querying → 显示「正在检查更新...」</li>
            <li>Downloading → 显示下载进度条，数值来自 UpdateStateProgress</li>
            <li>Applying → 显示「正在安装更新，请勿断电...」</li>
            <li>DelayedOnUserConsent → 显示确认对话框，等待用户同意</li>
            <li>RollingBack → 显示「更新失败，正在恢复...」</li>
          </ul>
        </li>
        <li>收到 VersionApplied 事件 → 显示「更新成功！已升级到版本 X」</li>
        <li>收到 DownloadError 事件 → 显示「下载失败」并展示已下载进度，提供重试按钮</li>
      </ol>
      <p>
        <strong>注意</strong>：UpdateStateProgress 在状态切换时可能变为 null 或重置为 0，
        UI 应处理好 null 的情况（例如隐藏进度条或显示不确定进度指示器）。
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

  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'general-diagnostics': {
    title: '通用诊断 Cluster · GeneralDiagnostics（0x0033）',
    description: 'Matter GeneralDiagnostics Cluster（0x0033）完整参考 — 设备健康状态、网络接口信息、重启统计、故障追踪、TestEventTrigger 测试命令及所有枚举值速查。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>通用诊断 Cluster（GeneralDiagnostics）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0033</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 固定在 <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    GeneralDiagnostics 提供设备的健康状态和运行诊断信息 —— 包括网络接口详情、重启次数、运行时长、启动原因，
    以及硬件/射频/网络三类故障的实时追踪。所有 Matter 设备都必须实现这个 Cluster，是设备运维和问题排查的第一入口。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Endpoint 0 专属</div>
    <p>
      GeneralDiagnostics 只出现在 <strong>Endpoint 0</strong>（根端点），不会出现在功能端点上。
      它反映的是整个设备的健康状态，不是某个功能模块的状态。
      读取时请确保指定 <code>endpointId = 0</code>。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举速查</a>
    <span class="nav-sep">|</span>
    <a href="#structs">数据结构</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    GeneralDiagnostics 只有两个命令。<code>TestEventTrigger</code> 用于测试认证，生产环境通常禁用；
    <code>TimeSnapshot</code> 用于获取设备当前的时间快照。
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
          <td>TestEventTrigger</td>
          <td>Client → Server</td>
          <td>触发设备内部的测试事件</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>TimeSnapshot</td>
          <td>Client → Server</td>
          <td>获取设备当前时间快照</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">TestEventTrigger —— 测试事件触发（0x00）</h3>
  <p>
    触发设备预置的测试事件。这个命令主要用于 Matter 认证测试期间，允许测试工具在不拆机的情况下模拟特定的设备行为
    （如模拟传感器告警、触发故障状态等）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnableKey</td>
          <td>octstr (16 bytes)</td>
          <td>启用密钥 —— 必须与设备预设的密钥匹配，否则命令被拒绝。生产设备应将此密钥设为全零以禁用测试功能</td>
        </tr>
        <tr>
          <td>EventTrigger</td>
          <td>uint64</td>
          <td>触发器编号 —— 标识要触发的具体测试事件，由厂商或 Matter 测试规范定义</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">安全提示</div>
    <p>
      <code>TestEventTriggersEnabled</code> 属性为 <code>true</code> 时此命令才生效。
      生产环境的设备<strong>必须</strong>禁用测试触发器（将 EnableKey 设为全零），否则存在安全风险 ——
      攻击者可能利用此命令模拟故障或篡改设备行为。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        Matter 认证测试时，测试工具通过此命令让设备模拟特定状态（如烟感报警、网络断开等），
        验证设备的事件上报和故障处理逻辑是否符合规范。App 开发中几乎不会用到此命令。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">TimeSnapshot —— 时间快照（0x01）</h3>
  <p>
    请求设备返回当前的系统时间。不需要参数。
    设备会返回一个 <code>TimeSnapshotResponse</code>，包含系统启动后的毫秒计时和 POSIX 时间戳（如果设备有可靠时钟）。
  </p>

  <h4>TimeSnapshotResponse 响应字段</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SystemTimeMs</td>
          <td>uint64</td>
          <td>设备启动后经过的毫秒数（单调递增，不受时钟校准影响）</td>
        </tr>
        <tr>
          <td>PosixTimeMs</td>
          <td>uint64 / null</td>
          <td>POSIX 时间戳（毫秒精度）。如果设备没有可靠的 UTC 时钟，此字段为 <code>null</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        排查设备时间同步问题时使用。例如设备的日志时间戳明显偏差，可以通过 TimeSnapshot 确认设备当前的内部时钟是否准确。
        <code>SystemTimeMs</code> 是从启动开始的单调时钟，配合 <code>UpTime</code> 属性可以交叉验证。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>GeneralDiagnostics 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 网络接口 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>NetworkInterfaces</td>
          <td>list&lt;NetworkInterface&gt;</td>
          <td><a href="#group-network">网络接口</a></td>
          <td>设备所有网络接口信息</td>
        </tr>
        <!-- 运行统计 -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>RebootCount</td>
          <td>uint16</td>
          <td><a href="#group-runtime">运行统计</a></td>
          <td>累计重启次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>UpTime</td>
          <td>uint64</td>
          <td><a href="#group-runtime">运行统计</a></td>
          <td>设备已运行时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>TotalOperationalHours</td>
          <td>uint32</td>
          <td><a href="#group-runtime">运行统计</a></td>
          <td>累计运行小时数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>BootReason</td>
          <td>BootReasonEnum</td>
          <td><a href="#group-runtime">运行统计</a></td>
          <td>最近一次启动的原因</td>
        </tr>
        <!-- 故障追踪 -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ActiveHardwareFaults</td>
          <td>list&lt;HardwareFaultEnum&gt;</td>
          <td><a href="#group-faults">故障追踪</a></td>
          <td>当前活跃的硬件故障列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ActiveRadioFaults</td>
          <td>list&lt;RadioFaultEnum&gt;</td>
          <td><a href="#group-faults">故障追踪</a></td>
          <td>当前活跃的射频故障列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ActiveNetworkFaults</td>
          <td>list&lt;NetworkFaultEnum&gt;</td>
          <td><a href="#group-faults">故障追踪</a></td>
          <td>当前活跃的网络故障列表</td>
        </tr>
        <!-- 测试配置 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>TestEventTriggersEnabled</td>
          <td>bool</td>
          <td><a href="#group-test">测试配置</a></td>
          <td>测试事件触发器是否启用</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 网络接口（0x0000）====== -->
  <h3 id="group-network">网络接口（0x0000）</h3>
  <p>设备当前可用的所有网络接口的详细信息列表。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>NetworkInterfaces<br/><span class="attr-cn">网络接口列表</span></td>
          <td>list&lt;NetworkInterface&gt;</td>
          <td>设备当前所有网络接口的信息列表。每个元素是一个 <a href="#struct-network-interface">NetworkInterface</a> 结构体，包含接口名称、状态、IP 地址等详情。最多 8 个接口</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      NetworkInterfaces 是了解设备网络连接状况的最直接途径。
      如果设备同时有 WiFi 和 Thread 接口，列表中会包含多个条目。
      通过检查 <code>IsOperational</code> 可以判断哪个接口当前是活跃的。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 运行统计（0x0001-0x0004）====== -->
  <h3 id="group-runtime">运行统计（0x0001-0x0004）</h3>
  <p>设备的运行时间统计和启动原因，是判断设备稳定性的关键指标。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>RebootCount<br/><span class="attr-cn">重启次数</span></td>
          <td>uint16</td>
          <td>设备自出厂以来的累计重启次数。频繁重启通常意味着设备存在稳定性问题（电源不稳、固件崩溃等）</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>UpTime<br/><span class="attr-cn">运行时间</span></td>
          <td>uint64</td>
          <td>设备自最近一次启动以来已运行的时间，单位<strong>秒</strong>。可用来判断设备是否刚刚重启过</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>TotalOperationalHours<br/><span class="attr-cn">累计运行小时数</span></td>
          <td>uint32</td>
          <td>设备自出厂以来的累计运行小时数（取整）。这个值跨重启持久化保存，用于评估设备使用寿命</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>BootReason<br/><span class="attr-cn">启动原因</span></td>
          <td><a href="#enum-boot-reason">BootReasonEnum</a></td>
          <td>设备最近一次启动的原因（见下方枚举）。排查异常重启时首先检查此字段</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">时间单位注意</div>
    <p>
      <code>UpTime</code> 的单位是<strong>秒</strong>，而 <code>TotalOperationalHours</code> 的单位是<strong>小时</strong>。
      例如 <code>UpTime = 86400</code> 表示已运行 24 小时，而 <code>TotalOperationalHours = 720</code> 表示累计运行了 30 天。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 故障追踪（0x0005-0x0007）====== -->
  <h3 id="group-faults">故障追踪（0x0005-0x0007）</h3>
  <p>
    三个列表属性分别追踪硬件、射频和网络层面的当前活跃故障。
    正常运行的设备这三个列表都应该为空。一旦出现非空值，说明设备检测到了对应类型的故障。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ActiveHardwareFaults<br/><span class="attr-cn">活跃硬件故障</span></td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>当前存在的硬件故障列表。空列表 = 无故障。可能同时包含多个不同类型的故障</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ActiveRadioFaults<br/><span class="attr-cn">活跃射频故障</span></td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>当前存在的射频（无线通信）故障列表。WiFi/BLE/Thread 模块异常时会出现</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ActiveNetworkFaults<br/><span class="attr-cn">活跃网络故障</span></td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>当前存在的网络层故障列表。如连接失败、网络干扰等</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">故障列表与事件的关系</div>
    <p>
      这三个列表记录的是<strong>当前</strong>存在的故障。当故障状态发生变化时（新增或恢复），设备会同时发出对应的变更事件
      （<a href="#event-0x00">HardwareFaultChange</a>、<a href="#event-0x01">RadioFaultChange</a>、<a href="#event-0x02">NetworkFaultChange</a>），
      事件中包含变化前后的完整列表，方便追踪故障的出现和恢复过程。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 测试配置（0x0008）====== -->
  <h3 id="group-test">测试配置（0x0008）</h3>
  <p>与认证测试相关的配置属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>TestEventTriggersEnabled<br/><span class="attr-cn">测试触发器启用</span></td>
          <td>bool</td>
          <td>标识设备是否启用了 <code>TestEventTrigger</code> 命令。生产设备<strong>必须</strong>设为 <code>false</code>。如果在已上市的产品上读到 <code>true</code>，说明厂商的安全配置有缺陷</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">枚举速查</h2>
  <p>GeneralDiagnostics 涉及多个枚举类型，下面逐一列出所有枚举值。</p>

  <!-- BootReasonEnum -->
  <h3 id="enum-boot-reason">BootReasonEnum —— 启动原因</h3>
  <p>描述设备最近一次启动的原因，对应 <code>BootReason (0x0004)</code> 属性和 <a href="#event-0x03">BootReason 事件</a>。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定 —— 设备无法确定启动原因</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PowerOnReboot</span>
        <span class="enum-desc">正常上电 —— 设备接通电源后启动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BrownOutReset</span>
        <span class="enum-desc">欠压重启 —— 电源电压降到临界值以下触发复位</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SoftwareWatchdogReset</span>
        <span class="enum-desc">软件看门狗重启 —— 固件运行异常，看门狗定时器超时触发复位</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HardwareWatchdogReset</span>
        <span class="enum-desc">硬件看门狗重启 —— 硬件级别的看门狗超时，通常比软件看门狗更严重</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">SoftwareUpdateCompleted</span>
        <span class="enum-desc">固件更新完成 —— OTA 升级成功后自动重启</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">SoftwareReset</span>
        <span class="enum-desc">软件重启 —— 由软件主动触发的重启（如远程重启命令、恢复出厂设置）</span>
      </div>
    </div>
  </div>

  <!-- HardwareFaultEnum -->
  <h3 id="enum-hardware-fault">HardwareFaultEnum —— 硬件故障</h3>
  <p>描述设备可能遇到的硬件层故障，对应 <code>ActiveHardwareFaults (0x0005)</code> 属性。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定的硬件故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Radio</span>
        <span class="enum-desc">射频模块故障 —— 无线通信硬件异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Sensor</span>
        <span class="enum-desc">传感器故障 —— 温度、湿度等传感器异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ResettableOverTemp</span>
        <span class="enum-desc">可恢复过温 —— 温度过高，冷却后可自动恢复</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">NonResettableOverTemp</span>
        <span class="enum-desc">不可恢复过温 —— 严重过温，可能已造成永久损坏</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">PowerSource</span>
        <span class="enum-desc">电源故障 —— 供电模块异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">VisualDisplayFault</span>
        <span class="enum-desc">显示屏故障 —— 屏幕或 LED 指示异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">AudioOutputFault</span>
        <span class="enum-desc">音频输出故障 —— 扬声器或蜂鸣器异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">UserInterfaceFault</span>
        <span class="enum-desc">用户界面故障 —— 按键、触摸板等输入设备异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">NonVolatileMemoryError</span>
        <span class="enum-desc">非易失存储错误 —— Flash/EEPROM 读写异常，数据可能丢失</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">TamperDetected</span>
        <span class="enum-desc">检测到拆机 —— 设备外壳被打开或传感器触发防拆报警</span>
      </div>
    </div>
  </div>

  <!-- RadioFaultEnum -->
  <h3 id="enum-radio-fault">RadioFaultEnum —— 射频故障</h3>
  <p>描述设备无线通信模块的故障类型，对应 <code>ActiveRadioFaults (0x0006)</code> 属性。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定的射频故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">WiFiFault</span>
        <span class="enum-desc">WiFi 模块故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">CellularFault</span>
        <span class="enum-desc">蜂窝网络模块故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ThreadFault</span>
        <span class="enum-desc">Thread 模块故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">NFCFault</span>
        <span class="enum-desc">NFC 模块故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">BLEFault</span>
        <span class="enum-desc">蓝牙低功耗模块故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">EthernetFault</span>
        <span class="enum-desc">以太网模块故障</span>
      </div>
    </div>
  </div>

  <!-- NetworkFaultEnum -->
  <h3 id="enum-network-fault">NetworkFaultEnum —— 网络故障</h3>
  <p>描述设备网络层面的故障类型，对应 <code>ActiveNetworkFaults (0x0007)</code> 属性。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定的网络故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">网络硬件故障 —— 网卡或物理连接异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NetworkJammed</span>
        <span class="enum-desc">网络干扰 —— 检测到信道拥塞或电磁干扰</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ConnectionFailed</span>
        <span class="enum-desc">连接失败 —— 无法建立或维持网络连接</span>
      </div>
    </div>
  </div>

  <!-- InterfaceTypeEnum -->
  <h3 id="enum-interface-type">InterfaceTypeEnum —— 网络接口类型</h3>
  <p>描述网络接口的物理类型，对应 <a href="#struct-network-interface">NetworkInterface</a> 结构体中的 <code>Type</code> 字段。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定类型</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">WiFi</span>
        <span class="enum-desc">WiFi 无线接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Ethernet</span>
        <span class="enum-desc">以太网有线接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cellular</span>
        <span class="enum-desc">蜂窝移动网络接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Thread</span>
        <span class="enum-desc">Thread 网格网络接口</span>
      </div>
    </div>
  </div>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>

  <h3 id="struct-network-interface">NetworkInterface 结构体</h3>
  <p>描述一个网络接口的完整信息，是 <code>NetworkInterfaces (0x0000)</code> 属性中每个列表元素的结构。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>string (max 32)</td>
          <td>接口名称，如 <code>"wlan0"</code>、<code>"eth0"</code>、<code>"Thread"</code></td>
        </tr>
        <tr>
          <td>IsOperational</td>
          <td>bool</td>
          <td>接口是否正在运行并可用于通信</td>
        </tr>
        <tr>
          <td>OffPremiseServicesReachableIPv4</td>
          <td>bool / null</td>
          <td>通过此接口的 IPv4 是否可达外部（互联网）服务。<code>null</code> = 未知</td>
        </tr>
        <tr>
          <td>OffPremiseServicesReachableIPv6</td>
          <td>bool / null</td>
          <td>通过此接口的 IPv6 是否可达外部服务。<code>null</code> = 未知</td>
        </tr>
        <tr>
          <td>HardwareAddress</td>
          <td>octstr (6 or 8 bytes)</td>
          <td>接口的硬件地址（MAC 地址）。WiFi/Ethernet 为 6 字节，IEEE 802.15.4（Thread）为 8 字节</td>
        </tr>
        <tr>
          <td>IPv4Addresses</td>
          <td>list&lt;octstr&gt;</td>
          <td>分配给此接口的所有 IPv4 地址列表</td>
        </tr>
        <tr>
          <td>IPv6Addresses</td>
          <td>list&lt;octstr&gt;</td>
          <td>分配给此接口的所有 IPv6 地址列表（通常包含链路本地地址和全局地址）</td>
        </tr>
        <tr>
          <td>Type</td>
          <td><a href="#enum-interface-type">InterfaceTypeEnum</a></td>
          <td>接口的物理类型</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>NetworkInterface 数据示例：</p>
  <pre><code>{
  "Name": "wlan0",                              // 接口名称
  "IsOperational": true,                        // 接口正在运行
  "OffPremiseServicesReachableIPv4": true,       // IPv4 可达外部服务
  "OffPremiseServicesReachableIPv6": null,       // IPv6 可达性未知
  "HardwareAddress": "AA:BB:CC:DD:EE:FF",       // MAC 地址
  "IPv4Addresses": ["192.168.1.100"],            // IPv4 地址列表
  "IPv6Addresses": ["fe80::1", "2001:db8::1"],  // IPv6 地址列表
  "Type": 1                                     // WiFi 接口
}</code></pre>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    GeneralDiagnostics 定义了 4 个事件，均为 <strong>Critical</strong> 优先级。
    前三个分别对应硬件/射频/网络故障状态的变更通知，第四个是设备启动原因通知。
    订阅这些事件可以实时感知设备健康状态的变化。
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>HardwareFaultChange</td>
          <td class="col-required">Critical</td>
          <td>硬件故障列表发生变化</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>RadioFaultChange</td>
          <td class="col-required">Critical</td>
          <td>射频故障列表发生变化</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>NetworkFaultChange</td>
          <td class="col-required">Critical</td>
          <td>网络故障列表发生变化</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x03">
          <td><a href="#event-0x03"><code>0x03</code></a></td>
          <td>BootReason</td>
          <td class="col-required">Critical</td>
          <td>设备启动时上报启动原因</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 事件详解 -->
  <h3 id="event-0x00">HardwareFaultChange —— 硬件故障变更（0x00）</h3>
  <p>
    当设备的硬件故障状态发生变化时触发 —— 无论是新增故障还是故障恢复。
    事件数据中同时包含变化前后的完整故障列表，方便对比分析。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>变化后的当前硬件故障列表（与 <code>ActiveHardwareFaults</code> 属性一致）</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-hardware-fault">HardwareFaultEnum</a>&gt;</td>
          <td>变化前的硬件故障列表</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>解读示例</summary>
    <div class="scenario-content">
      <p>
        假设收到事件 <code>Previous = [3]</code>，<code>Current = [3, 9]</code>。
        说明之前已有「可恢复过温（3）」故障，现在又新增了「非易失存储错误（9）」。
        如果后续收到 <code>Previous = [3, 9]</code>，<code>Current = [9]</code>，说明过温故障已恢复，但存储错误仍在。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x01">RadioFaultChange —— 射频故障变更（0x01）</h3>
  <p>当设备的射频故障状态发生变化时触发。结构与 HardwareFaultChange 相同。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>变化后的当前射频故障列表</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-radio-fault">RadioFaultEnum</a>&gt;</td>
          <td>变化前的射频故障列表</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x02">NetworkFaultChange —— 网络故障变更（0x02）</h3>
  <p>当设备的网络故障状态发生变化时触发。结构与 HardwareFaultChange 相同。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Current</td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>变化后的当前网络故障列表</td>
        </tr>
        <tr>
          <td>Previous</td>
          <td>list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;</td>
          <td>变化前的网络故障列表</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x03">BootReason —— 启动原因事件（0x03）</h3>
  <p>
    设备每次启动时都会发出此事件，上报启动的原因。
    这是排查设备异常重启的第一手线索 —— 配合 <code>RebootCount</code> 属性使用效果更佳。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>BootReason</td>
          <td><a href="#enum-boot-reason">BootReasonEnum</a></td>
          <td>本次启动的原因</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>解读示例</summary>
    <div class="scenario-content">
      <p>
        收到 <code>BootReason = 3（SoftwareWatchdogReset）</code>，说明设备因固件异常被看门狗强制重启。
        如果短时间内多次收到同一原因的 BootReason 事件，强烈建议联系厂商排查固件问题。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个正常运行中的 WiFi 智能设备的 GeneralDiagnostics Cluster 读取结果：</p>

  <pre><code>{
  // --- 网络接口 ---
  "0x0000": [                   // NetworkInterfaces
    {
      "Name": "wlan0",
      "IsOperational": true,
      "OffPremiseServicesReachableIPv4": true,
      "OffPremiseServicesReachableIPv6": null,
      "HardwareAddress": "AA:BB:CC:DD:EE:FF",
      "IPv4Addresses": ["192.168.1.100"],
      "IPv6Addresses": ["fe80::1"],
      "Type": 1                 // WiFi
    }
  ],

  // --- 运行统计 ---
  "0x0001": 12,                 // RebootCount = 12（累计重启 12 次）
  "0x0002": 86400,              // UpTime = 86400 秒（已运行 24 小时）
  "0x0003": 720,                // TotalOperationalHours = 720（累计运行 30 天）
  "0x0004": 1,                  // BootReason = PowerOnReboot（正常上电启动）

  // --- 故障状态 ---
  "0x0005": [],                 // ActiveHardwareFaults = []（无硬件故障）
  "0x0006": [],                 // ActiveRadioFaults = []（无射频故障）
  "0x0007": [],                 // ActiveNetworkFaults = []（无网络故障）

  // --- 测试配置 ---
  "0x0008": false               // TestEventTriggersEnabled = false（测试触发器未启用）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      正常设备的三个故障列表（0x0005 ~ 0x0007）都应该为空数组。如果读到非空值，说明设备当前存在异常。
      配合 <code>BootReason (0x0004)</code> 和 <code>RebootCount (0x0001)</code> 可以初步判断设备的稳定性 ——
      频繁重启 + 看门狗原因 + 硬件故障列表非空，基本可以断定设备硬件有问题。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：设备健康状态总览</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>UpTime (0x0002)</code> 确认设备运行时间，判断是否刚刚重启过</li>
        <li>读取 <code>BootReason (0x0004)</code>，如果不是 PowerOnReboot(1) 或 SoftwareReset(6)，可能存在异常</li>
        <li>读取 <code>ActiveHardwareFaults (0x0005)</code>、<code>ActiveRadioFaults (0x0006)</code>、<code>ActiveNetworkFaults (0x0007)</code>，确认无活跃故障</li>
        <li>读取 <code>RebootCount (0x0001)</code>，如果值异常高，配合 <code>TotalOperationalHours (0x0003)</code> 计算平均重启频率</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：排查设备离线问题</summary>
    <div class="scenario-content">
      <ol>
        <li>设备重新上线后，读取 <code>BootReason (0x0004)</code> —— 看是重启了还是只是网络断开</li>
        <li>读取 <code>NetworkInterfaces (0x0000)</code>，检查 <code>IsOperational</code> 和 <code>OffPremiseServicesReachableIPv4</code> 状态</li>
        <li>检查 <code>ActiveNetworkFaults (0x0007)</code>，看是否有 ConnectionFailed(3) 或 NetworkJammed(2)</li>
        <li>订阅 <code>NetworkFaultChange</code> 事件，监控后续是否再次出现网络异常</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：固件更新后验证</summary>
    <div class="scenario-content">
      <ol>
        <li>OTA 升级完成后，设备应自动重启</li>
        <li>读取 <code>BootReason (0x0004)</code>，期望值为 <code>SoftwareUpdateCompleted (5)</code></li>
        <li>如果是 <code>SoftwareWatchdogReset (3)</code> 或 <code>HardwareWatchdogReset (4)</code>，说明新固件可能有问题</li>
        <li>持续监控 <code>ActiveHardwareFaults</code> 和 <code>RebootCount</code>，确保新版本运行稳定</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：生产安全检查</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>TestEventTriggersEnabled (0x0008)</code>，<strong>必须</strong>为 <code>false</code></li>
        <li>如果为 <code>true</code>，设备未关闭测试模式，存在安全风险 —— 攻击者可通过 TestEventTrigger 命令操纵设备行为</li>
        <li>这个检查通常在产品出厂前和安全审计时执行</li>
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
  'software-diagnostics': {
    title: '软件诊断 Cluster · SoftwareDiagnostics（0x0034）',
    description: 'Matter SoftwareDiagnostics Cluster（0x0034）完整参考 — 线程指标、堆内存监控、高水位线追踪、软件故障事件，嵌入式设备运行时健康诊断的基础 Cluster。',
    prev: undefined,
    next: undefined,
    content: `<h1>软件诊断 Cluster（SoftwareDiagnostics）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0034</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root / Node 级别）&nbsp;|&nbsp;
    <strong>角色</strong>: Server（只读 + 一个重置命令）
  </p>
  <p>
    SoftwareDiagnostics 用于暴露设备固件的运行时健康状态 —— 包括<strong>线程栈使用情况</strong>、<strong>堆内存分配</strong>和<strong>软件故障记录</strong>。
    这是 Matter 中面向开发者和运维人员的诊断 Cluster，帮助在不连接调试器的情况下了解嵌入式设备的内部状态。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">什么时候用</div>
    <p>
      设备运行一段时间后行为异常？读取堆内存属性检查是否存在内存泄漏。
      怀疑某个线程栈溢出？查看 ThreadMetrics 中的 StackFreeMinimum。
      OTA 升级后想确认固件稳定性？监控 SoftwareFault 事件和高水位线变化。
      这些信息在产品量产后的远程诊断中尤其有用。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>SoftwareDiagnostics Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的可选能力：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">WTRMRK（Watermarks）</span>
        <span class="enum-desc">高水位线追踪 —— 支持 CurrentHeapHighWatermark 属性和 ResetWatermarks 命令，记录堆内存使用的历史峰值</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 含义</div>
    <p>
      <code>FeatureMap = 0x01</code>（WTRMRK）：设备追踪堆内存使用峰值，可通过 ResetWatermarks 命令重置。<br/>
      <code>FeatureMap = 0x00</code>（无 Feature）：仅提供实时堆内存和线程指标，不记录历史峰值。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性</h2>
  <p>所有属性均为只读。堆内存相关属性为可选，ThreadMetrics 也为可选。点击属性 ID 可跳转到详细说明。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>条件</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>ThreadMetrics</td>
          <td>list&lt;ThreadMetricsStruct&gt;</td>
          <td>可选</td>
          <td>当前运行的线程列表及栈使用情况</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>CurrentHeapFree</td>
          <td>uint64</td>
          <td>可选</td>
          <td>当前堆空闲字节数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>CurrentHeapUsed</td>
          <td>uint64</td>
          <td>可选</td>
          <td>当前堆已用字节数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>CurrentHeapHighWatermark</td>
          <td>uint64</td>
          <td>WTRMRK</td>
          <td>堆使用历史峰值（高水位线）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">ThreadMetrics（线程指标列表）</h3>
  <p>
    返回设备当前所有运行线程的栈使用信息。每个条目是一个 <code>ThreadMetricsStruct</code>，包含线程 ID、名称和栈使用统计。
    这是排查栈溢出的关键数据来源。
  </p>

  <h4 id="thread-metrics-struct">ThreadMetricsStruct 结构</h4>
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
          <td><code>0x00</code></td>
          <td>Id</td>
          <td>uint64</td>
          <td>是</td>
          <td>线程唯一标识符</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>Name</td>
          <td>string（最长 8 字符）</td>
          <td>可选</td>
          <td>线程名称（如 "Main"、"BLE"、"WiFi"）</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>StackFreeCurrent</td>
          <td>uint32</td>
          <td>可选</td>
          <td>当前栈剩余空闲字节数</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>StackFreeMinimum</td>
          <td>uint32</td>
          <td>可选</td>
          <td>栈剩余空闲的历史最小值（栈使用水位线）</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>StackSize</td>
          <td>uint32</td>
          <td>可选</td>
          <td>线程栈总大小（字节）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">栈溢出判断</div>
    <p>
      当 <code>StackFreeMinimum</code> 接近 0 时，意味着该线程曾经几乎用完了栈空间，存在栈溢出风险。
      一般建议保持 <code>StackFreeMinimum / StackSize &gt; 10%</code> 的安全余量。
      如果低于这个阈值，应考虑增大该线程的栈分配或优化其调用深度。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">CurrentHeapFree（堆空闲字节数）</h3>
  <p>
    设备堆内存中当前可用于分配的字节数。在资源受限的嵌入式设备上（如 ESP32 系列），
    这个值持续下降可能意味着内存泄漏。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">CurrentHeapUsed（堆已用字节数）</h3>
  <p>
    设备堆内存中当前已被分配使用的字节数。与 <code>CurrentHeapFree</code> 互补 ——
    两者之和近似等于堆总大小（可能有碎片和管理开销的差异）。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">CurrentHeapHighWatermark（堆使用高水位线）</h3>
  <p>
    自上次 <code>ResetWatermarks</code> 命令或设备启动以来，<code>CurrentHeapUsed</code> 达到过的最大值。
    这个属性需要 <strong>WTRMRK</strong> Feature 支持。
  </p>
  <p>
    高水位线是评估设备内存裕度的重要指标 —— 它反映的是「最坏情况下用了多少内存」，
    而不是某一时刻的快照。即使当前 <code>CurrentHeapUsed</code> 看起来正常，高水位线也可能揭示间歇性的内存尖峰。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    SoftwareDiagnostics 只有一个命令，需要 <strong>WTRMRK</strong> Feature 支持。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>条件</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>ResetWatermarks</td>
          <td>WTRMRK</td>
          <td>重置堆使用高水位线和线程栈最小空闲值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetWatermarks —— 重置水位线（0x00）</h3>
  <p>
    将 <code>CurrentHeapHighWatermark</code> 重置为当前的 <code>CurrentHeapUsed</code> 值，
    同时将所有线程的 <code>StackFreeMinimum</code> 重置为当前的 <code>StackFreeCurrent</code> 值。
    该命令不接受任何参数。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">使用时机</div>
    <p>
      典型用法：OTA 升级后发一次 ResetWatermarks，然后观察新固件运行一段时间后的高水位线，
      评估新版本的内存占用是否有回退。也适用于排查特定操作的内存影响 —— 重置后执行操作，再读取水位线。
    </p>
  </div>
  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0034",
      "commandId": "0x00"       // ResetWatermarks
    },
    "commandFields": {}         // 无参数
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    设备运行过程中检测到软件故障时，会上报 SoftwareFault 事件。该事件为可选支持。
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>SoftwareFault</td>
          <td>Info</td>
          <td>检测到软件故障时触发</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">SoftwareFault —— 软件故障事件（0x00）</h3>
  <p>
    当设备固件检测到软件异常（如未处理的异常、断言失败、看门狗触发等）时上报此事件。
    事件数据携带故障线程信息和可选的故障现场记录。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Id</td>
          <td><code>0x00</code></td>
          <td>uint64</td>
          <td>故障发生时的线程 ID</td>
        </tr>
        <tr>
          <td>Name</td>
          <td><code>0x01</code></td>
          <td>string（最长 8 字符）</td>
          <td>故障线程名称（可选）</td>
        </tr>
        <tr>
          <td>FaultRecording</td>
          <td><code>0x02</code></td>
          <td>octstr（最长 1024 字节）</td>
          <td>故障现场数据，格式由厂商定义（可选）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">FaultRecording 的用途</div>
    <p>
      <code>FaultRecording</code> 是一段厂商自定义的二进制数据，可能包含寄存器快照、调用栈回溯、
      崩溃地址等调试信息。不同芯片平台的格式不同，需要配合厂商的解码工具使用。
      App 端通常只需要将原始数据上传到云端，由后台服务解析。
    </p>
  </div>

  <p>事件上报示例：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 0,
        "clusterId": "0x0034",
        "eventId": "0x00"       // SoftwareFault
      },
      "eventNumber": 7,
      "priority": "INFO",
      "data": {
        "0": 42,                // Id = 42（故障线程 ID）
        "1": "BLE",             // Name = "BLE"（故障线程名）
        "2": "RkVUQ0g6IDB4..."  // FaultRecording（Base64 编码的故障现场数据）
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个 ESP32 设备的 SoftwareDiagnostics Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": [                       // ThreadMetrics（线程指标列表）
    {
      "0": 1,                    // Id = 1
      "1": "Main",               // Name = "Main"
      "2": 2048,                 // StackFreeCurrent = 2048 字节
      "3": 1024,                 // StackFreeMinimum = 1024 字节
      "4": 8192                  // StackSize = 8192 字节
    },
    {
      "0": 2,                    // Id = 2
      "1": "BLE",                // Name = "BLE"
      "2": 4096,                 // StackFreeCurrent = 4096 字节
      "3": 2048,                 // StackFreeMinimum = 2048 字节
      "4": 8192                  // StackSize = 8192 字节
    }
  ],
  "0x1": 65536,                  // CurrentHeapFree = 64 KB
  "0x2": 131072,                 // CurrentHeapUsed = 128 KB
  "0x3": 196608                  // CurrentHeapHighWatermark = 192 KB（需 WTRMRK Feature）
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：内存泄漏监控</summary>
    <div class="scenario-content">
      <p>设备长时间运行后响应变慢、功能异常，怀疑存在内存泄漏。</p>
      <ol>
        <li>定期读取 <code>CurrentHeapFree</code> 和 <code>CurrentHeapUsed</code>（如每小时一次）</li>
        <li>记录到时序数据库或日志中，绘制内存趋势图</li>
        <li>如果 <code>CurrentHeapFree</code> 持续下降且不回升，基本可以确认存在内存泄漏</li>
        <li>结合 <code>ThreadMetrics</code> 排查是否某个线程的栈使用异常</li>
        <li>进一步通过 OTA 修复后，重置水位线观察新版本表现</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：线程栈健康检查</summary>
    <div class="scenario-content">
      <p>设备偶发崩溃重启，怀疑某个线程栈空间不足导致溢出。</p>
      <ol>
        <li>读取 <code>ThreadMetrics</code> 列表，关注每个线程的 <code>StackFreeMinimum</code></li>
        <li>计算栈使用率：<code>(StackSize - StackFreeMinimum) / StackSize</code></li>
        <li>使用率超过 90% 的线程有栈溢出风险，需要关注</li>
        <li>对比 <code>StackFreeCurrent</code> 和 <code>StackFreeMinimum</code> 的差距 —— 差距越大说明栈使用波动越剧烈</li>
        <li>调整固件中对应线程的栈分配大小，OTA 后再次检查</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：OTA 后高水位线对比</summary>
    <div class="scenario-content">
      <p>固件升级后需要评估新版本的内存表现是否有回退。需要 WTRMRK Feature 支持。</p>
      <ol>
        <li>OTA 完成后，设备重启，水位线自动重置</li>
        <li>让设备正常运行一段时间（建议 24-48 小时，覆盖各种使用场景）</li>
        <li>读取 <code>CurrentHeapHighWatermark</code>，与旧版本的记录对比</li>
        <li>如果新版本水位线明显高于旧版本，说明新代码引入了额外的内存开销</li>
        <li>也可以手动发 <code>ResetWatermarks</code> 后执行特定操作，精确测量该操作的内存峰值</li>
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
  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'thread-network-diagnostics': {
    title: 'Thread 网络诊断 Cluster · ThreadNetworkDiagnostics（0x0035）',
    description: 'Matter ThreadNetworkDiagnostics Cluster（0x0035）完整参考 — Thread Mesh 网络诊断、信道/拓扑/路由信息、TX/RX 收发计数器、MLE/MAC 计数器、错误统计、网络故障事件及枚举值速查。',
    prev: undefined,
    next: undefined,
    content: `<h1>Thread 网络诊断 Cluster（ThreadNetworkDiagnostics）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0035</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（根端点）
  </p>
  <p>
    ThreadNetworkDiagnostics 是 Thread 设备的网络诊断 Cluster，提供 Thread Mesh 网络的完整运行状态。
    它包含网络标识、拓扑路由、收发包统计、错误计数等 60+ 个属性，是排查 Thread 设备连接问题和分析网络质量的核心工具。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">适用场景</div>
    <p>
      这个 Cluster 主要用于<strong>诊断和调试</strong>，不控制设备功能。当 Thread 设备连接不稳定、网络延迟高、丢包严重时，
      通过读取此 Cluster 可以快速定位问题 —— 是信号差（看 RSSI/LQI）、路由不优（看 RouteTable）、
      还是链路错误多（看错误计数器）。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举值速查</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    ThreadNetworkDiagnostics 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些计数器类别。
    不同 Feature 控制不同分组的计数器属性是否可用。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">收发包计数器 —— TX/RX 各类数据包的累计统计</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">错误计数器 —— 接收错误（FCS/安全/源地址等）和缓冲区溢出统计</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MLECNT（MLECounts）</span>
        <span class="enum-desc">MLE 计数器 —— 角色变更、附着尝试、分区切换等 MLE 层事件统计</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">MACCNT（MACCounts）</span>
        <span class="enum-desc">MAC 计数器 —— MAC 层重试、CCA 失败等底层链路统计</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 与属性的关系</div>
    <p>
      基础网络信息（Channel、RoutingRole、NeighborTable 等）所有 Thread 设备都支持，不需要任何 Feature。
      计数器属性则按 Feature 分组 —— 例如只有启用了 PKTCNT 的设备才会上报 TxTotalCount 等收发统计。
      读取前先检查 <code>FeatureMap</code>，避免读到不支持的属性返回错误。
    </p>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    ThreadNetworkDiagnostics 只有一个命令，用于重置所有计数器。
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
        <tr id="cmd-0x00">
          <td><code>0x00</code></td>
          <td>ResetCounts</td>
          <td>将所有可选计数器归零</td>
          <td class="col-optional">ERRCNT 或 MACCNT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>ResetCounts —— 重置计数器（0x00）</h3>
  <p>
    将设备上所有已启用 Feature 对应的计数器（包括 OverrunCount）归零。
    不需要参数。执行后所有统计从 0 开始重新累计。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        诊断网络问题时，先调用 ResetCounts 清零，然后观察一段时间内的计数器增长情况，
        用来判断当前的错误率和网络质量。避免历史累积数据干扰判断。
      </p>
    </div>
  </details>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    ThreadNetworkDiagnostics 有 60+ 个属性，按功能分为以下几组。
    基础网络信息所有 Thread 设备都支持，计数器属性按 Feature 分组。
  </p>

  <!-- 属性汇总导航 -->
  <nav class="quick-nav">
    <a href="#group-network">网络标识</a>
    <span class="nav-sep">|</span>
    <a href="#group-topology">拓扑与路由</a>
    <span class="nav-sep">|</span>
    <a href="#group-dataset">数据集参数</a>
    <span class="nav-sep">|</span>
    <a href="#group-tx">发送计数器</a>
    <span class="nav-sep">|</span>
    <a href="#group-rx">接收计数器</a>
    <span class="nav-sep">|</span>
    <a href="#group-rxerr">接收错误计数器</a>
    <span class="nav-sep">|</span>
    <a href="#group-mle">MLE 计数器</a>
  </nav>

  <!-- ====== 网络标识 ====== -->
  <h3 id="group-network">网络标识（0x0000 - 0x0005）</h3>
  <p>Thread 网络的基本身份信息，标识设备所在的 Thread 网络。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Channel<br/><span class="attr-cn">信道</span></td>
          <td>uint16</td>
          <td>当前 Thread 网络使用的 IEEE 802.15.4 信道号。Thread 使用 2.4GHz 的 11~26 信道</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>RoutingRole<br/><span class="attr-cn">路由角色</span></td>
          <td>RoutingRoleEnum / null</td>
          <td>设备在 Thread 网络中的当前角色（见<a href="#enum-routing-role">枚举值</a>）。null 表示尚未确定</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>NetworkName<br/><span class="attr-cn">网络名称</span></td>
          <td>string / null</td>
          <td>Thread 网络名称，最长 16 字节的 UTF-8 字符串</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>PanId<br/><span class="attr-cn">PAN ID</span></td>
          <td>uint16 / null</td>
          <td>IEEE 802.15.4 的 16 位 PAN 标识符</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>ExtendedPanId<br/><span class="attr-cn">扩展 PAN ID</span></td>
          <td>uint64 / null</td>
          <td>64 位扩展 PAN 标识符，用于区分相同 PAN ID 的不同网络</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MeshLocalPrefix<br/><span class="attr-cn">Mesh 本地前缀</span></td>
          <td>octstr / null</td>
          <td>Thread Mesh 本地 IPv6 前缀（fd00::/8 范围内的 /64 前缀）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 拓扑与路由 ====== -->
  <h3 id="group-topology">拓扑与路由（0x0007 - 0x000D）</h3>
  <p>Thread Mesh 网络的拓扑结构和路由信息，包括邻居表、路由表和分区数据。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>NeighborTable<br/><span class="attr-cn">邻居表</span></td>
          <td>list&lt;NeighborTableStruct&gt;</td>
          <td>直接通信邻居的详细信息列表（见<a href="#struct-neighbor">结构体说明</a>）</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>RouteTable<br/><span class="attr-cn">路由表</span></td>
          <td>list&lt;RouteTableStruct&gt;</td>
          <td>网络路由条目列表（见<a href="#struct-route">结构体说明</a>）</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>PartitionId<br/><span class="attr-cn">分区 ID</span></td>
          <td>uint32 / null</td>
          <td>当前 Thread 网络分区的标识符。网络分裂时不同分区有不同 ID</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>Weighting<br/><span class="attr-cn">分区权重</span></td>
          <td>uint16 / null</td>
          <td>当前分区的权重，网络合并时优先保留权重高的分区</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>DataVersion<br/><span class="attr-cn">数据版本</span></td>
          <td>uint16 / null</td>
          <td>Thread 网络数据的版本号，每次网络数据变更时递增</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>StableDataVersion<br/><span class="attr-cn">稳定数据版本</span></td>
          <td>uint16 / null</td>
          <td>稳定网络数据的版本号（不含临时路由等易变数据）</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>LeaderRouterId<br/><span class="attr-cn">Leader 路由 ID</span></td>
          <td>uint8 / null</td>
          <td>当前 Thread 网络 Leader 的 Router ID</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- NeighborTable 结构体 -->
  <h4 id="struct-neighbor">NeighborTableStruct 结构体</h4>
  <p>邻居表中每个条目描述一个直接通信的邻居节点。信号质量（LQI/RSSI）和错误率是判断链路健康的关键字段。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>ExtAddress</td><td>uint64</td><td>邻居的 64 位扩展 MAC 地址</td></tr>
        <tr><td>Age</td><td>uint32</td><td>最后一次通信以来的秒数</td></tr>
        <tr><td>Rloc16</td><td>uint16</td><td>邻居的 16 位路由定位符</td></tr>
        <tr><td>LinkFrameCounter</td><td>uint32</td><td>链路层帧计数器</td></tr>
        <tr><td>MleFrameCounter</td><td>uint32</td><td>MLE 层帧计数器</td></tr>
        <tr><td>LQI</td><td>uint8</td><td>链路质量指示（0-255，越高越好）</td></tr>
        <tr><td>AverageRssi</td><td>int8 / null</td><td>平均 RSSI（dBm），典型范围 -100 到 0</td></tr>
        <tr><td>LastRssi</td><td>int8 / null</td><td>最近一次收包的 RSSI（dBm）</td></tr>
        <tr><td>FrameErrorRate</td><td>uint8</td><td>帧错误率（0-100%，缩放到 0-255）</td></tr>
        <tr><td>MessageErrorRate</td><td>uint8</td><td>消息错误率（0-100%，缩放到 0-255）</td></tr>
        <tr><td>RxOnWhenIdle</td><td>bool</td><td>空闲时是否保持接收（false = 嗜睡设备）</td></tr>
        <tr><td>FullThreadDevice</td><td>bool</td><td>是否为全功能 Thread 设备（FTD）</td></tr>
        <tr><td>FullNetworkData</td><td>bool</td><td>是否接收完整网络数据</td></tr>
        <tr><td>IsChild</td><td>bool</td><td>该邻居是否为本节点的子节点</td></tr>
      </tbody>
    </table>
  </div>

  <!-- RouteTable 结构体 -->
  <h4 id="struct-route">RouteTableStruct 结构体</h4>
  <p>路由表中每个条目描述一条到目标 Router 的路由信息。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>ExtAddress</td><td>uint64</td><td>目标路由器的 64 位扩展 MAC 地址</td></tr>
        <tr><td>Rloc16</td><td>uint16</td><td>目标路由器的 16 位路由定位符</td></tr>
        <tr><td>RouterId</td><td>uint8</td><td>路由器 ID（0-62）</td></tr>
        <tr><td>NextHop</td><td>uint8</td><td>下一跳的 Router ID</td></tr>
        <tr><td>PathCost</td><td>uint8</td><td>到达目标的路径开销（越小越优）</td></tr>
        <tr><td>LQIIn</td><td>uint8</td><td>入站链路质量指示</td></tr>
        <tr><td>LQIOut</td><td>uint8</td><td>出站链路质量指示</td></tr>
        <tr><td>Age</td><td>uint8</td><td>路由条目的存活时间</td></tr>
        <tr><td>Allocated</td><td>bool</td><td>该 Router ID 是否已被分配</td></tr>
        <tr><td>LinkEstablished</td><td>bool</td><td>与该路由器是否已建立双向链路</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 数据集参数 ====== -->
  <h3 id="group-dataset">数据集参数（0x0006, 0x0038 - 0x003E）</h3>
  <p>Thread 操作数据集（Operational Dataset）相关的参数，包括时间戳、安全策略和网络故障信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>所需特性</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>OverrunCount<br/><span class="attr-cn">溢出次数</span></td>
          <td>uint64</td>
          <td class="col-required">ERRCNT</td>
          <td>接收缓冲区溢出的累计次数</td>
        </tr>
        <tr id="attr-0x0038">
          <td><code>0x0038</code></td>
          <td>ActiveTimestamp<br/><span class="attr-cn">活跃时间戳</span></td>
          <td>uint64 / null</td>
          <td class="col-optional">无</td>
          <td>当前活跃操作数据集的时间戳</td>
        </tr>
        <tr id="attr-0x0039">
          <td><code>0x0039</code></td>
          <td>PendingTimestamp<br/><span class="attr-cn">待定时间戳</span></td>
          <td>uint64 / null</td>
          <td class="col-optional">无</td>
          <td>待生效操作数据集的时间戳（用于延迟更新网络配置）</td>
        </tr>
        <tr id="attr-0x003A">
          <td><code>0x003A</code></td>
          <td>Delay<br/><span class="attr-cn">延迟</span></td>
          <td>uint32 / null</td>
          <td class="col-optional">无</td>
          <td>待定数据集生效前的延迟时间（毫秒）</td>
        </tr>
        <tr id="attr-0x003B">
          <td><code>0x003B</code></td>
          <td>SecurityPolicy<br/><span class="attr-cn">安全策略</span></td>
          <td>SecurityPolicy / null</td>
          <td class="col-optional">无</td>
          <td>网络安全策略，包括密钥轮换时间和安全标志位</td>
        </tr>
        <tr id="attr-0x003C">
          <td><code>0x003C</code></td>
          <td>ChannelPage0Mask<br/><span class="attr-cn">信道掩码</span></td>
          <td>octstr / null</td>
          <td class="col-optional">无</td>
          <td>Page 0 的信道掩码，标识网络允许使用的信道集合</td>
        </tr>
        <tr id="attr-0x003D">
          <td><code>0x003D</code></td>
          <td>OperationalDatasetComponents<br/><span class="attr-cn">数据集组件</span></td>
          <td>Struct / null</td>
          <td class="col-optional">无</td>
          <td>标识操作数据集中哪些组件存在（见<a href="#struct-dataset-components">结构体说明</a>）</td>
        </tr>
        <tr id="attr-0x003E">
          <td><code>0x003E</code></td>
          <td>ActiveNetworkFaults<br/><span class="attr-cn">活跃网络故障</span></td>
          <td>list&lt;NetworkFaultEnum&gt;</td>
          <td class="col-optional">无</td>
          <td>当前活跃的网络故障列表（见<a href="#enum-network-fault">枚举值</a>），空列表表示无故障</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SecurityPolicy 结构体 -->
  <h4>SecurityPolicy 结构体</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>RotationTime</td><td>uint16</td><td>安全密钥轮换周期（小时）</td></tr>
        <tr><td>Flags</td><td>uint16</td><td>安全策略标志位（控制外部 Commissioner 接入、Native Commissioner 等）</td></tr>
      </tbody>
    </table>
  </div>

  <!-- OperationalDatasetComponents 结构体 -->
  <h4 id="struct-dataset-components">OperationalDatasetComponents 结构体</h4>
  <p>每个字段为 bool，标识操作数据集中对应组件是否存在。</p>
  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>字段</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>ActiveTimestampPresent</td><td>活跃时间戳</td></tr>
        <tr><td>PendingTimestampPresent</td><td>待定时间戳</td></tr>
        <tr><td>MasterKeyPresent</td><td>主密钥（Network Key）</td></tr>
        <tr><td>NetworkNamePresent</td><td>网络名称</td></tr>
        <tr><td>ExtendedPanIdPresent</td><td>扩展 PAN ID</td></tr>
        <tr><td>MeshLocalPrefixPresent</td><td>Mesh 本地前缀</td></tr>
        <tr><td>DelayPresent</td><td>延迟计时器</td></tr>
        <tr><td>PanIdPresent</td><td>PAN ID</td></tr>
        <tr><td>ChannelPresent</td><td>信道号</td></tr>
        <tr><td>PskcPresent</td><td>PSKc（Commissioner 密钥）</td></tr>
        <tr><td>SecurityPolicyPresent</td><td>安全策略</td></tr>
        <tr><td>ChannelMaskPresent</td><td>信道掩码</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 发送计数器 ====== -->
  <h3 id="group-tx">发送计数器 — TX Counters（0x000E - 0x001E）<span class="feature-tag">PKTCNT / MACCNT</span></h3>
  <p>统计设备发送数据包的各类计数。所有字段均为 <code>uint32</code> 类型，需要 <strong>PKTCNT</strong> 或 <strong>MACCNT</strong> Feature。</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x000E</code></td><td>TxTotalCount</td><td>发送的数据包总数</td></tr>
        <tr><td><code>0x000F</code></td><td>TxUnicastCount</td><td>发送的单播包数量</td></tr>
        <tr><td><code>0x0010</code></td><td>TxBroadcastCount</td><td>发送的广播包数量</td></tr>
        <tr><td><code>0x0011</code></td><td>TxAckRequestedCount</td><td>请求 ACK 确认的发送包数量</td></tr>
        <tr><td><code>0x0012</code></td><td>TxAckedCount</td><td>已收到 ACK 确认的发送包数量</td></tr>
        <tr><td><code>0x0013</code></td><td>TxNoAckRequestedCount</td><td>不要求 ACK 确认的发送包数量</td></tr>
        <tr><td><code>0x0014</code></td><td>TxDataCount</td><td>发送的数据帧数量</td></tr>
        <tr><td><code>0x0015</code></td><td>TxDataPollCount</td><td>发送的数据轮询帧数量（嗜睡设备唤醒拉取数据）</td></tr>
        <tr><td><code>0x0016</code></td><td>TxBeaconCount</td><td>发送的 Beacon 帧数量</td></tr>
        <tr><td><code>0x0017</code></td><td>TxBeaconRequestCount</td><td>发送的 Beacon 请求帧数量</td></tr>
        <tr><td><code>0x0018</code></td><td>TxOtherCount</td><td>发送的其他类型帧数量</td></tr>
        <tr><td><code>0x0019</code></td><td>TxRetryCount</td><td>发送重试次数（重试率 = TxRetryCount / TxTotalCount）</td></tr>
        <tr><td><code>0x001A</code></td><td>TxDirectMaxRetryExpiryCount</td><td>直接传输达到最大重试次数的包数量</td></tr>
        <tr><td><code>0x001B</code></td><td>TxIndirectMaxRetryExpiryCount</td><td>间接传输达到最大重试次数的包数量</td></tr>
        <tr><td><code>0x001C</code></td><td>TxErrCcaCount</td><td>CCA（信道空闲评估）失败导致的发送失败次数</td></tr>
        <tr><td><code>0x001D</code></td><td>TxErrAbortCount</td><td>发送中止的次数</td></tr>
        <tr><td><code>0x001E</code></td><td>TxErrBusyChannelCount</td><td>信道繁忙导致的发送失败次数</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">发送质量判断</div>
    <p>
      关注 <code>TxRetryCount / TxTotalCount</code> 比值 —— 重试率超过 10% 说明链路质量较差。
      <code>TxErrCcaCount</code> 持续增长通常意味着信道拥挤，可能需要换信道。
      <code>TxDirectMaxRetryExpiryCount</code> 非零说明有丢包，需要检查目标节点是否在线。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 接收计数器 ====== -->
  <h3 id="group-rx">接收计数器 — RX Counters（0x001F - 0x0029）<span class="feature-tag">PKTCNT / MACCNT</span></h3>
  <p>统计设备接收数据包的各类计数。所有字段均为 <code>uint32</code> 类型，需要 <strong>PKTCNT</strong> 或 <strong>MACCNT</strong> Feature。</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x001F</code></td><td>RxTotalCount</td><td>接收的数据包总数</td></tr>
        <tr><td><code>0x0020</code></td><td>RxUnicastCount</td><td>接收的单播包数量</td></tr>
        <tr><td><code>0x0021</code></td><td>RxBroadcastCount</td><td>接收的广播包数量</td></tr>
        <tr><td><code>0x0022</code></td><td>RxDataCount</td><td>接收的数据帧数量</td></tr>
        <tr><td><code>0x0023</code></td><td>RxDataPollCount</td><td>接收的数据轮询帧数量</td></tr>
        <tr><td><code>0x0024</code></td><td>RxBeaconCount</td><td>接收的 Beacon 帧数量</td></tr>
        <tr><td><code>0x0025</code></td><td>RxBeaconRequestCount</td><td>接收的 Beacon 请求帧数量</td></tr>
        <tr><td><code>0x0026</code></td><td>RxOtherCount</td><td>接收的其他类型帧数量</td></tr>
        <tr><td><code>0x0027</code></td><td>RxAddressFilteredCount</td><td>被地址过滤丢弃的接收包数量</td></tr>
        <tr><td><code>0x0028</code></td><td>RxDestAddrFilteredCount</td><td>因目的地址不匹配而过滤的包数量</td></tr>
        <tr><td><code>0x0029</code></td><td>RxDuplicatedCount</td><td>接收到的重复包数量</td></tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 接收错误计数器 ====== -->
  <h3 id="group-rxerr">接收错误计数器（0x002A - 0x002F）<span class="feature-tag">ERRCNT</span></h3>
  <p>统计各类接收错误。所有字段均为 <code>uint32</code> 类型，需要 <strong>ERRCNT</strong> Feature。</p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x002A</code></td><td>RxErrNoFrameCount</td><td>接收到无帧内容的错误包数量</td></tr>
        <tr><td><code>0x002B</code></td><td>RxErrUnknownNeighborCount</td><td>来自未知邻居的包数量（可能是网络攻击或新节点）</td></tr>
        <tr><td><code>0x002C</code></td><td>RxErrInvalidSrcAddrCount</td><td>源地址无效的包数量</td></tr>
        <tr><td><code>0x002D</code></td><td>RxErrSecCount</td><td>安全校验失败的包数量（解密失败或 MIC 不匹配）</td></tr>
        <tr><td><code>0x002E</code></td><td>RxErrFcsCount</td><td>FCS（帧校验序列）错误的包数量 —— 通常是射频干扰导致</td></tr>
        <tr><td><code>0x002F</code></td><td>RxErrOtherCount</td><td>其他类型的接收错误</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">错误计数器排查指南</div>
    <p>
      <strong>RxErrFcsCount 持续增长</strong>：射频干扰严重，检查是否有 2.4GHz WiFi 或微波炉等干扰源，考虑换信道。<br/>
      <strong>RxErrSecCount 非零</strong>：安全层失败，可能是网络密钥不一致或有未授权设备尝试通信。<br/>
      <strong>RxErrUnknownNeighborCount 突增</strong>：有新设备加入或附近有其他 Thread 网络干扰。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== MLE 计数器 ====== -->
  <h3 id="group-mle">MLE 计数器（0x0030 - 0x0037）<span class="feature-tag">MLECNT</span></h3>
  <p>
    MLE（Mesh Link Establishment）层事件计数，反映设备在 Thread 网络中的角色变化和附着行为。
    所有字段均为 <code>uint16</code> 类型，需要 <strong>MLECNT</strong> Feature。
  </p>

  <div class="table-wrap table-compact">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td><code>0x0030</code></td><td>DetachedRoleChangeCount</td><td>进入 Detached（脱离）状态的次数</td></tr>
        <tr><td><code>0x0031</code></td><td>ChildRoleChangeCount</td><td>变为 Child（子节点）角色的次数</td></tr>
        <tr><td><code>0x0032</code></td><td>RouterRoleChangeCount</td><td>变为 Router（路由器）角色的次数</td></tr>
        <tr><td><code>0x0033</code></td><td>LeaderRoleChangeCount</td><td>变为 Leader（领导者）角色的次数</td></tr>
        <tr><td><code>0x0034</code></td><td>AttachAttemptCount</td><td>尝试附着到网络的次数</td></tr>
        <tr><td><code>0x0035</code></td><td>PartitionIdChangeCount</td><td>分区 ID 变更的次数（网络分裂/合并）</td></tr>
        <tr><td><code>0x0036</code></td><td>BetterPartitionAttachAttemptCount</td><td>尝试附着到更优分区的次数</td></tr>
        <tr><td><code>0x0037</code></td><td>ParentChangeCount</td><td>父节点变更的次数</td></tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">MLE 计数器解读</div>
    <p>
      <strong>DetachedRoleChangeCount 频繁增长</strong>：设备经常与网络断开，需检查信号强度或父节点稳定性。<br/>
      <strong>ParentChangeCount 过高</strong>：设备频繁切换父节点，说明周围路由器不稳定或信号边界。<br/>
      <strong>PartitionIdChangeCount 非零</strong>：网络曾发生分裂和重新合并，通常是部分节点通信中断导致。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性概览</a></p>

  <!-- ====== 枚举值速查 ====== -->
  <h2 id="enums">枚举值速查</h2>

  <h3 id="enum-routing-role">RoutingRoleEnum —— 路由角色</h3>
  <p>描述设备在 Thread Mesh 网络中担任的角色。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定 —— 角色未确定</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Unassigned</span>
        <span class="enum-desc">未分配 —— 设备已加入但尚未获得角色</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">SleepyEndDevice</span>
        <span class="enum-desc">嗜睡终端 —— 大部分时间处于休眠，定期唤醒拉取数据，省电但延迟高</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">EndDevice</span>
        <span class="enum-desc">终端设备 —— 始终在线但不转发数据，不参与路由</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">REED</span>
        <span class="enum-desc">路由器候选 —— 具备路由能力但当前未激活，网络需要时可自动升级为 Router</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Router</span>
        <span class="enum-desc">路由器 —— 为其他设备转发数据，维护路由表，是 Mesh 网络的骨干</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Leader</span>
        <span class="enum-desc">领导者 —— 管理 Router ID 分配、网络数据分发，每个分区有且只有一个</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Thread 角色层级</div>
    <p>
      Thread 网络中的角色从低到高：SleepyEndDevice → EndDevice → REED → Router → Leader。
      Leader 本质上也是一个 Router，只是额外承担了管理职责。当 Leader 离线时，其他 Router 会自动选举新的 Leader。
    </p>
  </div>

  <h3 id="enum-connection-status">ConnectionStatusEnum —— 连接状态</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Connected</span>
        <span class="enum-desc">已连接到 Thread 网络</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">未连接到 Thread 网络</span>
      </div>
    </div>
  </div>

  <h3 id="enum-network-fault">NetworkFaultEnum —— 网络故障类型</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LinkDown</span>
        <span class="enum-desc">链路断开 —— 与 Thread 网络失去连接</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">硬件故障 —— 射频模块或 Thread 芯片异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NetworkJammed</span>
        <span class="enum-desc">网络干扰 —— 信道被持续占用，无法正常通信</span>
      </div>
    </div>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>ThreadNetworkDiagnostics 定义了 2 个事件，用于通知网络连接状态变化和故障发生。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>事件</th><th>优先级</th><th>字段</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ConnectionStatus</strong></td>
          <td>Info</td>
          <td>ConnectionStatus: <a href="#enum-connection-status">ConnectionStatusEnum</a></td>
          <td>Thread 网络连接状态变化时触发（连上或断开）</td>
        </tr>
        <tr>
          <td><strong>NetworkFaultChange</strong></td>
          <td>Info</td>
          <td>
            Current: list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;<br/>
            Previous: list&lt;<a href="#enum-network-fault">NetworkFaultEnum</a>&gt;
          </td>
          <td>网络故障列表变化时触发，携带变化前后的故障列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>事件订阅用途</summary>
    <div class="scenario-content">
      <p>
        <strong>ConnectionStatus 事件</strong>：App 可以订阅此事件来实时感知 Thread 设备的在线/离线状态变化，
        比如在设备列表中显示连接状态图标、断开时弹出提示。
      </p>
      <p>
        <strong>NetworkFaultChange 事件</strong>：用于监控网络健康状况。当 Current 列表从空变为非空时说明出现了故障；
        从非空变为空表示故障已恢复。对比 Current 和 Previous 可以判断是新增故障还是故障恢复。
      </p>
    </div>
  </details>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个 Thread Router 设备的 ThreadNetworkDiagnostics Cluster 典型读取结果（选取关键属性）：</p>

  <pre><code>{
  // --- 网络标识 ---
  "0x0000": 15,              // Channel = 15（Thread 信道）
  "0x0001": 5,               // RoutingRole = Router
  "0x0002": "MyThreadNet",   // NetworkName
  "0x0003": 4660,            // PanId = 0x1234
  "0x0004": "1111111122222222", // ExtendedPanId
  "0x0005": "fd11:2233:4455::/64", // MeshLocalPrefix

  // --- 拓扑信息 ---
  "0x0009": 12345678,        // PartitionId（网络分区标识）
  "0x000A": 64,              // Weighting（分区权重）
  "0x000D": 42,              // LeaderRouterId（Leader 路由 ID）

  // --- 发送计数器（PKTCNT）---
  "0x000E": 158432,          // TxTotalCount（累计发送总数）
  "0x000F": 120050,          // TxUnicastCount（单播发送）
  "0x0010": 38382,           // TxBroadcastCount（广播发送）
  "0x0019": 1024,            // TxRetryCount（重试次数）

  // --- 接收计数器（PKTCNT）---
  "0x001F": 203841,          // RxTotalCount（累计接收总数）
  "0x0020": 185200,          // RxUnicastCount（单播接收）
  "0x0021": 18641,           // RxBroadcastCount（广播接收）

  // --- 错误计数器（ERRCNT）---
  "0x0006": 0,               // OverrunCount（缓冲区溢出次数）
  "0x002E": 3,               // RxErrFcsCount（FCS 校验错误）

  // --- 活跃网络故障 ---
  "0x003E": []               // ActiveNetworkFaults = 空（当前无故障）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际使用中，通常不需要一次读取全部 60+ 个属性。根据诊断目的选择性读取：
      排查连接问题读 RoutingRole + NeighborTable + ActiveNetworkFaults；
      分析网络质量读各类计数器；了解网络配置读 Channel + NetworkName + SecurityPolicy。
      读取前先检查 <code>FeatureMap</code>，避免请求设备不支持的计数器属性。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-connectivity">场景 1：排查 Thread 设备离线</h3>
  <ol>
    <li>读取 <code>RoutingRole (0x0001)</code> —— 如果为 <code>null</code> 或 <code>Unassigned</code>，设备未成功加入网络</li>
    <li>读取 <code>ActiveNetworkFaults (0x003E)</code> —— 检查是否有 LinkDown 或 HardwareFailure</li>
    <li>读取 <code>NeighborTable (0x0007)</code> —— 查看邻居列表中的 LQI 和 RSSI，判断信号质量</li>
    <li>订阅 <strong>ConnectionStatus</strong> 事件，实时感知连接状态变化</li>
  </ol>

  <h3 id="scenario-quality">场景 2：评估网络通信质量</h3>
  <ol>
    <li>调用 <code>ResetCounts (0x00)</code> 清零所有计数器</li>
    <li>等待一段时间（如 10 分钟），然后读取计数器</li>
    <li>计算重试率：<code>TxRetryCount / TxTotalCount</code>，超过 10% 说明链路差</li>
    <li>检查 <code>RxErrFcsCount</code> —— 非零说明有射频干扰</li>
    <li>检查 <code>TxErrCcaCount</code> —— 持续增长说明信道拥挤，考虑换信道</li>
  </ol>

  <h3 id="scenario-topology">场景 3：了解网络拓扑</h3>
  <ol>
    <li>读取 <code>RoutingRole (0x0001)</code> —— 确认设备的网络角色</li>
    <li>读取 <code>LeaderRouterId (0x000D)</code> —— 找到当前 Leader</li>
    <li>读取 <code>NeighborTable (0x0007)</code> —— 获取邻居节点列表和链路质量</li>
    <li>读取 <code>RouteTable (0x0008)</code> —— 查看路由拓扑和路径开销</li>
    <li>读取 <code>PartitionId (0x0009)</code> —— 确认所有设备是否在同一分区</li>
  </ol>

  <h3 id="scenario-stability">场景 4：监控网络稳定性</h3>
  <ol>
    <li>读取 MLE 计数器（需 MLECNT Feature）：
      <ul>
        <li><code>DetachedRoleChangeCount (0x0030)</code> —— 频繁脱离说明连接不稳定</li>
        <li><code>ParentChangeCount (0x0037)</code> —— 频繁换父节点说明周围路由器不稳定</li>
        <li><code>PartitionIdChangeCount (0x0035)</code> —— 非零说明网络曾分裂</li>
      </ul>
    </li>
    <li>订阅 <strong>NetworkFaultChange</strong> 事件，及时感知故障发生和恢复</li>
    <li>定期对比计数器增量，建立网络质量基线</li>
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

  .feature-tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    margin-left: 0.5rem;
    border-radius: 9999px;
    background: #dbeafe;
    color: #1d4ed8;
    vertical-align: middle;
  }

  .dark .feature-tag {
    background: #1e3a5f;
    color: #93c5fd;
  }

  .table-compact table {
    font-size: 0.875rem;
  }

  .table-compact td,
  .table-compact th {
    padding: 0.375rem 0.75rem;
  }
</style>`,
  },
  'wifi-network-diagnostics': {
    title: 'WiFi 网络诊断 Cluster · WiFiNetworkDiagnostics（0x0036）',
    description: 'Matter WiFiNetworkDiagnostics Cluster（0x0036）完整参考 — WiFi 连接健康诊断、RSSI 信号强度、数据包/错误计数、断连与关联失败事件、ResetCounts 命令及全部属性与枚举值速查。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>WiFi 网络诊断 Cluster（WiFiNetworkDiagnostics）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0036</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root / Network Endpoint）
  </p>
  <p>
    WiFiNetworkDiagnostics 提供设备 WiFi 连接的实时健康信息 ——
    包括信号强度（RSSI）、当前接入点（BSSID）、安全类型、信道、WiFi 协议版本，
    以及可选的数据包计数和错误统计。
    它是排查设备「离线」「响应慢」「不稳定」等网络问题的第一站。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 依赖</div>
    <p>
      此 Cluster 定义了两个可选特性：
      <strong>PKTCNT</strong>（数据包计数）和 <strong>ERRCNT</strong>（错误计数）。
      启用后分别提供收发包统计和过载/关联失败计数。
      基础连接信息（BSSID、RSSI、信道等）不需要任何特性即可读取。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举速查</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些诊断能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">数据包计数 —— 启用后提供 Beacon、组播、单播的收发包统计</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">错误计数 —— 启用后提供 OverrunCount（缓冲区溢出）计数</span>
      </div>
    </div>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    WiFiNetworkDiagnostics Cluster 仅有 1 个命令，用于重置统计计数器。
    此命令需要设备启用 PKTCNT 或 ERRCNT 特性才有意义。
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
          <td>ResetCounts</td>
          <td>重置数据包和错误计数器</td>
          <td class="col-required">PKTCNT | ERRCNT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCounts —— 重置计数器（0x00）</h3>
  <p>
    将设备维护的数据包计数器和错误计数器全部归零。
    不需要任何参数。执行后，<code>BeaconLostCount</code>、<code>BeaconRxCount</code>、
    各类收发包计数、<code>OverrunCount</code> 等统计值都会重置为 <code>0</code>。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        排查网络问题时，先调用 ResetCounts 清零所有计数器，
        然后观察一段时间内各计数器的增长情况，判断丢包率和错误频率。
        也可在设备移至新位置后重置，开始新一轮的网络质量基线测量。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    WiFiNetworkDiagnostics Cluster 共有 14 个应用属性，按功能分为三组。
    点击属性 ID 可跳转到对应的详细说明。
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
        <!-- 连接信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>BSSID</td>
          <td>octstr / null</td>
          <td><a href="#group-connection">连接信息</a></td>
          <td>当前关联 AP 的 MAC 地址</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SecurityType</td>
          <td>enum / null</td>
          <td><a href="#group-connection">连接信息</a></td>
          <td>WiFi 安全认证类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>WiFiVersion</td>
          <td>enum / null</td>
          <td><a href="#group-connection">连接信息</a></td>
          <td>当前使用的 802.11 协议版本</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>ChannelNumber</td>
          <td>uint16 / null</td>
          <td><a href="#group-connection">连接信息</a></td>
          <td>当前使用的 WiFi 信道号</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>RSSI</td>
          <td>int8 / null</td>
          <td><a href="#group-connection">连接信息</a></td>
          <td>接收信号强度（dBm）</td>
        </tr>
        <!-- 数据包计数 -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>BeaconLostCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>丢失的 Beacon 帧数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>BeaconRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>成功接收的 Beacon 帧数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>PacketMulticastRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>接收的组播包数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>PacketMulticastTxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>发送的组播包数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>PacketUnicastRxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>接收的单播包数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>PacketUnicastTxCount</td>
          <td>uint32 / null</td>
          <td><a href="#group-pktcnt">数据包计数</a></td>
          <td>发送的单播包数</td>
        </tr>
        <!-- 错误与速率 -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>AssociationFailureCause</td>
          <td>enum</td>
          <td><a href="#group-error">错误与速率</a></td>
          <td>最近一次关联失败的原因</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>OverrunCount</td>
          <td>uint64 / null</td>
          <td><a href="#group-error">错误与速率</a></td>
          <td>缓冲区溢出次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>CurrentMaxRate</td>
          <td>uint64 / null</td>
          <td><a href="#group-error">错误与速率</a></td>
          <td>当前最大传输速率（bps）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 连接信息（0x0000 ~ 0x0004）====== -->
  <h3 id="group-connection">连接信息（0x0000 ~ 0x0004）</h3>
  <p>
    描述设备当前 WiFi 连接的基本信息。这些属性是基础属性，不需要任何 Feature。
    当设备未连接 WiFi 时，所有 Nullable 属性返回 <code>null</code>。
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
          <td>BSSID</td>
          <td>octstr / null</td>
          <td>当前关联的接入点（AP）的 MAC 地址，6 字节。未连接时为 <code>null</code>。可用于判断设备连的是哪个 AP（在多 AP 环境下尤其有用）</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SecurityType（安全类型）</td>
          <td>SecurityTypeEnum / null</td>
          <td>当前 WiFi 连接使用的安全认证方式。未连接时为 <code>null</code>。见下方 <a href="#enum-security-type">SecurityTypeEnum</a></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>WiFiVersion（WiFi 版本）</td>
          <td>WiFiVersionEnum / null</td>
          <td>当前连接使用的 802.11 协议版本。未连接时为 <code>null</code>。见下方 <a href="#enum-wifi-version">WiFiVersionEnum</a></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>ChannelNumber（信道号）</td>
          <td>uint16 / null</td>
          <td>当前使用的 WiFi 信道号。2.4 GHz 通常为 1~13，5 GHz 为 36~165。未连接时为 <code>null</code></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>RSSI（信号强度）</td>
          <td>int8 / null</td>
          <td>接收信号强度指示，单位 dBm，取值范围 -120 ~ 0。数值越大（越接近 0）信号越强。未连接时为 <code>null</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">RSSI 信号强度参考</div>
    <p>
      <strong>-30 ~ -50 dBm</strong>：优秀，设备就在路由器旁边<br>
      <strong>-50 ~ -60 dBm</strong>：良好，日常使用无问题<br>
      <strong>-60 ~ -70 dBm</strong>：一般，可能偶有延迟<br>
      <strong>-70 ~ -80 dBm</strong>：较差，建议移近路由器或加信号扩展器<br>
      <strong>低于 -80 dBm</strong>：极差，设备可能频繁掉线
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 数据包计数（0x0005 ~ 0x000A）====== -->
  <h3 id="group-pktcnt">数据包计数（0x0005 ~ 0x000A）</h3>
  <p>
    详细的收发包统计信息，用于分析网络质量。
    这组属性需要设备启用 <strong>PKTCNT（PacketCounts）</strong> 特性。
    可通过 <code>ResetCounts</code> 命令将所有计数器归零。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Beacon 丢包比</div>
    <p>
      <code>BeaconLostCount / (BeaconLostCount + BeaconRxCount)</code> 是衡量 WiFi 稳定性的关键指标。
      正常情况下 Beacon 丢失率应低于 1%，超过 5% 说明信号很不稳定，需要检查设备与路由器之间的距离和遮挡。
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
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>BeaconLostCount</td>
          <td>uint32 / null</td>
          <td>自上次重置以来，设备期望但未收到的 Beacon 帧数量。数值持续增长说明信号不稳定。<strong>需要 PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>BeaconRxCount</td>
          <td>uint32 / null</td>
          <td>自上次重置以来，成功接收到的 Beacon 帧数量。<strong>需要 PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>PacketMulticastRxCount</td>
          <td>uint32 / null</td>
          <td>接收的组播数据包数量。<strong>需要 PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>PacketMulticastTxCount</td>
          <td>uint32 / null</td>
          <td>发送的组播数据包数量。<strong>需要 PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>PacketUnicastRxCount</td>
          <td>uint32 / null</td>
          <td>接收的单播数据包数量。单播是设备与路由器之间的一对一通信，是主要流量。<strong>需要 PKTCNT</strong></td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>PacketUnicastTxCount</td>
          <td>uint32 / null</td>
          <td>发送的单播数据包数量。<strong>需要 PKTCNT</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 错误与速率（0x000B ~ 0x000D）====== -->
  <h3 id="group-error">错误与速率（0x000B ~ 0x000D）</h3>
  <p>关联失败原因、缓冲区溢出统计和当前连接的最大传输速率。</p>

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
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>AssociationFailureCause</td>
          <td>AssociationFailureCauseEnum</td>
          <td>最近一次 WiFi 关联失败的原因。见下方 <a href="#enum-assoc-failure">AssociationFailureCauseEnum</a></td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>OverrunCount</td>
          <td>uint64 / null</td>
          <td>接收端因缓冲区满而丢弃的数据包数量。持续增长说明设备处理能力跟不上网络流量。<strong>需要 ERRCNT</strong></td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>CurrentMaxRate</td>
          <td>uint64 / null</td>
          <td>当前连接协商的最大传输速率，单位 bps（比特/秒）。例如 866700000 = 866.7 Mbps（802.11ac 的典型速率）。未连接时为 <code>null</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举速查 ====== -->
  <h2 id="enums">枚举速查</h2>

  <h3 id="enum-security-type">SecurityTypeEnum（安全类型）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">无加密（开放网络）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">WEP</span>
        <span class="enum-desc">WEP 加密（已淘汰，极不安全）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">WPA</span>
        <span class="enum-desc">WPA-Personal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">WPA2</span>
        <span class="enum-desc">WPA2-Personal（最常见）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">WPA3</span>
        <span class="enum-desc">WPA3-Personal（最新标准）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-wifi-version">WiFiVersionEnum（WiFi 版本）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">a</span>
        <span class="enum-desc">802.11a（5 GHz，54 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">b</span>
        <span class="enum-desc">802.11b（2.4 GHz，11 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">g</span>
        <span class="enum-desc">802.11g（2.4 GHz，54 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">n</span>
        <span class="enum-desc">802.11n / WiFi 4（双频，600 Mbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">ac</span>
        <span class="enum-desc">802.11ac / WiFi 5（5 GHz，6.9 Gbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ax</span>
        <span class="enum-desc">802.11ax / WiFi 6（双频，9.6 Gbps）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ah</span>
        <span class="enum-desc">802.11ah / WiFi HaLow（Sub-1GHz，IoT 专用）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-assoc-failure">AssociationFailureCauseEnum（关联失败原因）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">原因未知</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AssociationFailed</span>
        <span class="enum-desc">关联失败 —— AP 拒绝了设备的关联请求</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AuthenticationFailed</span>
        <span class="enum-desc">认证失败 —— 通常是密码错误</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SsidNotFound</span>
        <span class="enum-desc">找不到 SSID —— 目标网络不在范围内或已关闭</span>
      </div>
    </div>
  </div>

  <h3 id="enum-conn-status">ConnectionStatusEnum（连接状态）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Connected</span>
        <span class="enum-desc">已连接</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">未连接</span>
      </div>
    </div>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    WiFiNetworkDiagnostics 定义了 3 个事件，覆盖断连、关联失败、连接状态变化三种情况。
    订阅这些事件是实时监控设备网络健康的推荐方式。
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
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>Disconnection</td>
          <td>Info</td>
          <td>设备与 AP 断开连接时触发</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>AssociationFailure</td>
          <td>Info</td>
          <td>WiFi 关联或认证失败时触发</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>ConnectionStatus</td>
          <td>Info</td>
          <td>连接状态发生变化时触发</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">Disconnection —— 断连事件（0x00）</h3>
  <p>
    设备与当前接入点断开连接时触发。事件数据中携带 802.11 标准的断连原因码（ReasonCode），
    可用于诊断断连的具体原因。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ReasonCode</td>
          <td><code>0x00</code></td>
          <td>uint16</td>
          <td>802.11 断连原因码。常见值：1 = Unspecified，4 = Disassociated due to inactivity，8 = Deauthenticated because sending station is leaving</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x01">AssociationFailure —— 关联失败事件（0x01）</h3>
  <p>
    设备尝试连接 WiFi 但关联或认证失败时触发。
    携带失败原因和 802.11 状态码，是排查「设备连不上 WiFi」问题的关键信息来源。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AssociationFailureCause</td>
          <td><code>0x00</code></td>
          <td>AssociationFailureCauseEnum</td>
          <td>失败原因分类，见上方 <a href="#enum-assoc-failure">枚举</a></td>
        </tr>
        <tr>
          <td>Status</td>
          <td><code>0x01</code></td>
          <td>uint16</td>
          <td>802.11 关联/认证状态码，提供更细粒度的失败信息</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x02">ConnectionStatus —— 连接状态变更事件（0x02）</h3>
  <p>
    设备的 WiFi 连接状态发生变化时触发（连接成功或断开）。
    相比 Disconnection 事件，这个事件同时覆盖了「连上」和「断开」两个方向。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ConnectionStatus</td>
          <td><code>0x00</code></td>
          <td>ConnectionStatusEnum</td>
          <td>新的连接状态。见上方 <a href="#enum-conn-status">ConnectionStatusEnum</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个已连接 WiFi 的 Matter 设备（支持 PKTCNT + ERRCNT）读取 WiFiNetworkDiagnostics Cluster 的完整结果：</p>

  <pre><code>{
  // --- 连接信息 ---
  "0x0000": "A4:CF:12:XX:XX:XX",  // BSSID（当前关联的 AP MAC 地址）
  "0x0001": 4,                     // SecurityType = WPA2
  "0x0002": 4,                     // WiFiVersion = ac (802.11ac)
  "0x0003": 6,                     // ChannelNumber = 6
  "0x0004": -45,                   // RSSI = -45 dBm（信号良好）

  // --- 数据包计数（需要 PKTCNT 特性）---
  "0x0005": 12,                    // BeaconLostCount = 12
  "0x0006": 98432,                 // BeaconRxCount = 98432
  "0x0007": 1024,                  // PacketMulticastRxCount
  "0x0008": 256,                   // PacketMulticastTxCount
  "0x0009": 502310,                // PacketUnicastRxCount
  "0x000A": 389120,                // PacketUnicastTxCount

  // --- 错误计数（需要 ERRCNT 特性）---
  "0x000B": 0,                     // AssociationFailureCause = Unknown
  "0x000C": 0,                     // OverrunCount = 0

  // --- 其他 ---
  "0x000D": 866700000              // CurrentMaxRate = 866.7 Mbps
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      并非所有设备都支持 PKTCNT 和 ERRCNT 特性。读取前先检查 <code>FeatureMap (0xFFFC)</code>。
      对于仅需判断「设备 WiFi 是否正常」的简单场景，
      只读 <code>RSSI (0x0004)</code> 和 <code>SecurityType (0x0001)</code> 就够了。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：WiFi 健康监控</summary>
    <div class="scenario-content">
      <p>持续监控设备的 WiFi 连接质量，在问题发生前预警。</p>
      <ol>
        <li>订阅 <code>RSSI (0x0004)</code> 属性变化，设置合理的上报间隔（如每 60 秒或变化超过 5 dBm）</li>
        <li>订阅 <code>Disconnection</code> 和 <code>ConnectionStatus</code> 事件，实时感知断连</li>
        <li>定期读取 <code>BeaconLostCount</code> 和 <code>BeaconRxCount</code>，计算 Beacon 丢失率</li>
        <li>当 RSSI 低于 -75 dBm 或 Beacon 丢失率超过 5% 时，App 提示用户「设备信号较弱，建议移近路由器」</li>
        <li>结合 <code>ChannelNumber</code> 信息，建议用户是否需要切换路由器信道避开拥堵</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：信号强度排查</summary>
    <div class="scenario-content">
      <p>用户反馈设备「响应慢」或「经常离线」，通过诊断数据定位问题。</p>
      <ol>
        <li>读取 <code>RSSI (0x0004)</code>，判断信号强度是否充足</li>
        <li>读取 <code>WiFiVersion (0x0002)</code>，确认设备使用的协议版本（如仍在用 802.11b/g 说明设备能力有限）</li>
        <li>读取 <code>CurrentMaxRate (0x000D)</code>，确认协商速率是否正常</li>
        <li>调用 <code>ResetCounts (0x00)</code> 清零计数器，等待 5~10 分钟后读取各包计数</li>
        <li>计算丢包率：如果 <code>BeaconLostCount</code> 增长很快，问题在无线环境（距离/干扰）；如果 <code>OverrunCount</code> 增长很快，问题在设备处理能力</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：漫游分析（多 AP 环境）</summary>
    <div class="scenario-content">
      <p>在 Mesh 或多 AP 网络中，追踪设备在不同接入点之间的切换行为。</p>
      <ol>
        <li>定期读取 <code>BSSID (0x0000)</code>，记录设备连接的 AP MAC 地址变化</li>
        <li>订阅 <code>Disconnection</code> 和 <code>ConnectionStatus</code> 事件，捕捉每次漫游</li>
        <li>每次 BSSID 变化时，同步读取 <code>RSSI</code> 和 <code>ChannelNumber</code>，记录新 AP 的信号质量</li>
        <li>分析漫游频率：频繁漫游（如每分钟切换）说明设备处于两个 AP 信号交界处，信号都不强</li>
        <li>如果 <code>AssociationFailure</code> 事件伴随漫游出现，说明切换过程不顺利，可能需要调整 AP 配置</li>
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
  'ethernet-network-diagnostics': {
    title: '以太网诊断 Cluster · EthernetNetworkDiagnostics（0x0037）',
    description: 'Matter EthernetNetworkDiagnostics Cluster（0x0037）完整参考 — PHYRate / FullDuplex / PacketRxCount / TxErrCount 等属性、ResetCounts 命令、PKTCNT / ERRCNT Feature 位图速查，用于监控以太网连接健康状态。',
    prev: undefined,
    next: undefined,
    content: `<h1>以太网诊断 Cluster（EthernetNetworkDiagnostics）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0037</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: <code>Endpoint 0</code>（Root Node）
  </p>
  <p>
    EthernetNetworkDiagnostics 提供以太网接口的运行状态和统计信息 —— 链路速率、双工模式、收发包计数、错误计数等。
    这个 Cluster 只有 <strong>1 个命令</strong>和 <strong>9 个属性</strong>，结构简单，主要用于网络健康监控和故障排查。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">什么时候用</div>
    <p>
      Hub 或桥接器通过以太网连接，想确认链路是否正常？读取 PHYRate 和 CarrierDetect 即可判断。
      设备网络不稳定、丢包严重？检查 TxErrCount 和 CollisionCount 定位问题。
      需要重新开始统计？发一个 ResetCounts 命令清零所有计数器。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>EthernetNetworkDiagnostics 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些诊断能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PKTCNT（PacketCounts）</span>
        <span class="enum-desc">支持收发包计数 —— 启用 PacketRxCount、PacketTxCount 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ERRCNT（ErrorCounts）</span>
        <span class="enum-desc">支持错误计数 —— 启用 TxErrCount、CollisionCount、OverrunCount 属性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 与属性的关系</div>
    <p>
      并非所有设备都支持全部属性。PacketRxCount / PacketTxCount 需要 PKTCNT 特性，
      TxErrCount / CollisionCount / OverrunCount 需要 ERRCNT 特性。
      读取前先检查 <code>FeatureMap (0xFFFC)</code> 确认设备支持哪些特性。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>点击属性 ID 可跳转到详细说明。带 Feature 标记的属性仅在设备支持对应特性时才存在。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>Feature</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>PHYRate</td>
          <td>enum8, nullable</td>
          <td>—</td>
          <td>物理层链路速率</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>FullDuplex</td>
          <td>bool, nullable</td>
          <td>—</td>
          <td>是否全双工模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>PacketRxCount</td>
          <td>uint64</td>
          <td>PKTCNT</td>
          <td>已接收的数据包总数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PacketTxCount</td>
          <td>uint64</td>
          <td>PKTCNT</td>
          <td>已发送的数据包总数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>TxErrCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>发送错误次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>CollisionCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>碰撞次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>OverrunCount</td>
          <td>uint64</td>
          <td>ERRCNT</td>
          <td>缓冲区溢出次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>CarrierDetect</td>
          <td>bool, nullable</td>
          <td>—</td>
          <td>载波检测状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>TimeSinceReset</td>
          <td>uint64</td>
          <td>—</td>
          <td>距上次计数器重置的秒数</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">PHYRate（物理层速率）</h3>
  <p>
    只读属性，表示当前以太网接口协商到的物理层链路速率。值为 <code>null</code> 时表示速率未知或接口未连接。
  </p>

  <h4>PHYRateEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Rate10M</span>
        <span class="enum-desc">10 Mbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Rate100M</span>
        <span class="enum-desc">100 Mbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Rate1G</span>
        <span class="enum-desc">1 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Rate25G</span>
        <span class="enum-desc">2.5 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rate5G</span>
        <span class="enum-desc">5 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Rate10G</span>
        <span class="enum-desc">10 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Rate40G</span>
        <span class="enum-desc">40 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Rate100G</span>
        <span class="enum-desc">100 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Rate200G</span>
        <span class="enum-desc">200 Gbps</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Rate400G</span>
        <span class="enum-desc">400 Gbps</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">FullDuplex（全双工模式）</h3>
  <p>
    只读属性，表示当前以太网链路是否工作在全双工模式。<code>true</code> 为全双工，<code>false</code> 为半双工，
    <code>null</code> 表示无法确定。现代以太网设备几乎都是全双工，半双工通常意味着协商异常。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">PacketRxCount（接收包计数）</h3>
  <p>
    只读属性，自上次重置以来接收到的数据包总数。需要设备支持 <strong>PKTCNT</strong> 特性。
    该计数器在调用 ResetCounts 命令或设备重启后归零。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">PacketTxCount（发送包计数）</h3>
  <p>
    只读属性，自上次重置以来发送的数据包总数。需要设备支持 <strong>PKTCNT</strong> 特性。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x04">TxErrCount（发送错误计数）</h3>
  <p>
    只读属性，自上次重置以来发送失败的次数。需要设备支持 <strong>ERRCNT</strong> 特性。
    持续增长通常说明线缆质量差或交换机端口有问题。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x05">CollisionCount（碰撞计数）</h3>
  <p>
    只读属性，自上次重置以来的碰撞次数。需要设备支持 <strong>ERRCNT</strong> 特性。
    在全双工链路上此值应始终为 0；如果持续增长，说明链路可能降级到了半双工。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x06">OverrunCount（溢出计数）</h3>
  <p>
    只读属性，自上次重置以来接收缓冲区溢出的次数。需要设备支持 <strong>ERRCNT</strong> 特性。
    溢出意味着设备来不及处理收到的数据，可能是设备负载过高或网络流量过大。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x07">CarrierDetect（载波检测）</h3>
  <p>
    只读属性，表示以太网接口是否检测到载波信号。<code>true</code> 表示网线已连接且对端设备正常，
    <code>false</code> 表示网线断开或对端无响应，<code>null</code> 表示无法确定。
    这是判断物理连接状态最直接的指标。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x08">TimeSinceReset（计数器重置后经过时间）</h3>
  <p>
    只读属性，自上次计数器重置（ResetCounts 命令或设备重启）以来经过的秒数。
    结合包计数和错误计数，可以计算出平均每秒的收发速率和错误率。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    EthernetNetworkDiagnostics 只有一个命令。需要设备支持 PKTCNT 或 ERRCNT 特性才有实际意义。
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
          <td>ResetCounts</td>
          <td>重置所有计数器归零</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCounts —— 重置计数器（0x00）</h3>
  <p>
    将 PacketRxCount、PacketTxCount、TxErrCount、CollisionCount、OverrunCount 全部归零，
    同时 TimeSinceReset 也会重置为 0 并重新开始计时。无需任何参数，直接发送即可。
  </p>
  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 0,
      "clusterId": "0x0037",
      "commandId": "0x00"       // ResetCounts
    },
    "commandFields": {}
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个以太网 Hub 设备的 EthernetNetworkDiagnostics Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": 2,           // PHYRate = Rate1G（千兆以太网）
  "0x1": true,        // FullDuplex = true（全双工）
  "0x2": 1048576,     // PacketRxCount = 1048576（已接收约 100 万包）
  "0x3": 524288,      // PacketTxCount = 524288（已发送约 50 万包）
  "0x4": 3,           // TxErrCount = 3（发送错误 3 次）
  "0x5": 0,           // CollisionCount = 0（无碰撞）
  "0x6": 0,           // OverrunCount = 0（无溢出）
  "0x7": true,        // CarrierDetect = true（载波检测正常）
  "0x8": 86400        // TimeSinceReset = 86400（距上次重置 24 小时）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      PHYRate 和 FullDuplex 反映的是链路协商结果，不会频繁变化，适合在设备详情页一次性展示。
      包计数和错误计数则是累积值，适合定期轮询或订阅，用于绘制趋势图或触发告警。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：链路健康检查</summary>
    <div class="scenario-content">
      <p>App 设备详情页展示以太网连接状态，帮助用户快速判断链路是否正常。</p>
      <ol>
        <li>读取 <code>CarrierDetect (0x07)</code>，确认物理连接正常（<code>true</code>）</li>
        <li>读取 <code>PHYRate (0x00)</code> 和 <code>FullDuplex (0x01)</code>，展示链路速率和双工模式</li>
        <li>如果 PHYRate 为 <code>null</code> 或 CarrierDetect 为 <code>false</code>，提示用户检查网线连接</li>
        <li>如果 FullDuplex 为 <code>false</code>，提示链路降级到半双工，建议检查交换机端口配置</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：网络故障排查</summary>
    <div class="scenario-content">
      <p>设备响应缓慢或通信不稳定时，通过计数器定位网络层问题。</p>
      <ol>
        <li>先检查 <code>FeatureMap (0xFFFC)</code>，确认设备支持 PKTCNT 和 ERRCNT</li>
        <li>发送 <code>ResetCounts (0x00)</code> 清零所有计数器</li>
        <li>等待一段时间后，读取 TxErrCount、CollisionCount、OverrunCount</li>
        <li>用 <code>TimeSinceReset (0x08)</code> 计算错误率：<code>TxErrCount / TimeSinceReset</code></li>
        <li>错误率持续偏高 → 检查网线质量和交换机端口；CollisionCount 非零 → 检查双工模式配置</li>
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
  },
};
