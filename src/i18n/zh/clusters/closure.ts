import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'door-lock': {
    title: '门锁 Cluster · DoorLock（0x0101）',
    description: 'Matter DoorLock Cluster（0x0101）完整参考 — LockDoor/UnlockDoor 命令、LockState 等 40+ 属性定义、枚举值速查、Timed Interaction 安全机制说明与真实设备数据示例。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: { title: '电源（PowerSource）', slug: 'power-source' },
    content: `<h1>门锁 Cluster（DoorLock）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0101</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    DoorLock 是 Matter 门锁设备的核心 Cluster，定义了锁的状态查询、开/关锁操作、用户管理、凭据（PIN 码/指纹/NFC）管理等全部能力。
    门锁类设备的日常开发基本都围绕这个 Cluster 展开。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">适用角色</div>
    <p>无论你是 App 开发、固件调试、测试验证还是产品评审，这些字段和命令都是你需要了解的核心内容。</p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#timed-interaction">定时交互</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">标准示例</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    Command 是发送给门锁执行的操作。大多数写操作都要求 <strong>Timed Interaction</strong>（定时交互），这是 Matter 针对门锁等安全设备的安全要求。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>定时交互</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>LockDoor</td>
          <td>上锁</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>UnlockDoor</td>
          <td>解锁</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>UnlockWithTimeout</td>
          <td>解锁，到时间后自动回锁</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1A">
          <td><a href="#cmd-0x1A"><code>0x1A</code></a></td>
          <td>SetCredential</td>
          <td>添加或修改凭据（PIN 码、指纹等）</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1B">
          <td><a href="#cmd-0x1B"><code>0x1B</code></a></td>
          <td>GetCredentialStatus</td>
          <td>查询指定凭据槽位的状态</td>
          <td class="col-optional">不需要</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1D">
          <td><a href="#cmd-0x1D"><code>0x1D</code></a></td>
          <td>ClearCredential</td>
          <td>删除凭据</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x22">
          <td><a href="#cmd-0x22"><code>0x22</code></a></td>
          <td>SetAliroReaderConfig</td>
          <td>配置 Aliro NFC 读卡器参数</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x24">
          <td><a href="#cmd-0x24"><code>0x24</code></a></td>
          <td>ClearAliroReaderConfig</td>
          <td>清除 Aliro NFC 配置</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x26">
          <td><a href="#cmd-0x26"><code>0x26</code></a></td>
          <td>SetUser</td>
          <td>添加或修改用户（可设置权限、有效期等）</td>
          <td class="col-required">必须</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x28">
          <td><a href="#cmd-0x28"><code>0x28</code></a></td>
          <td>GetUser</td>
          <td>查询指定用户信息</td>
          <td class="col-optional">不需要</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x29">
          <td><a href="#cmd-0x29"><code>0x29</code></a></td>
          <td>ClearUser</td>
          <td>删除用户（同时删除其关联的所有凭据）</td>
          <td class="col-required">必须</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">什么是定时交互（Timed Interaction）</div>
    <p>
      对于门锁这种安全敏感设备，Matter 要求写操作必须附带一个<strong>超时时间</strong>（通常 5000~10000 毫秒）。
      这是为了防止中间人截获命令后延迟重放 —— 如果命令在超时时间内没有被执行，设备会自动拒绝。
    </p>
    <p>发送 LockDoor 命令时如果没有带超时参数，设备会直接返回错误。</p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">LockDoor —— 上锁（0x00）</h3>
  <p>
    向门锁发送上锁指令。执行成功后，<code>LockState</code> 属性会从当前值变为 <code>Locked (1)</code>。
    这是门锁最核心、最常用的命令之一。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>视配置</td>
          <td>当 <code>RequirePINforRemoteOperation</code> 为 <code>true</code> 时，远程上锁必须提供 PIN 码</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在 App 首页点击「锁门」按钮时调用。需要先检查 <code>ActuatorEnabled (0x02)</code> 确认执行器可用，再以 Timed Interaction 方式发送此命令。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">UnlockDoor —— 解锁（0x01）</h3>
  <p>
    向门锁发送解锁指令。执行成功后，<code>LockState</code> 属性会变为 <code>Unlocked (2)</code>。
    与 LockDoor 对称，同样是最常用的命令。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>视配置</td>
          <td>当 <code>RequirePINforRemoteOperation</code> 为 <code>true</code> 时必须提供</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在 App 点击「开锁」或访客到达时远程开门。解锁后建议订阅 <code>LockState</code> 变化，配合 <code>AutoRelockTime</code> 确认是否自动回锁。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">UnlockWithTimeout —— 限时解锁（0x03）</h3>
  <p>
    解锁门锁，经过指定时间后自动回锁。功能上等同于先 UnlockDoor 再等待 AutoRelockTime，但超时时间由命令参数指定，不受 AutoRelockTime 属性影响。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Timeout</td>
          <td>U16</td>
          <td>是</td>
          <td>自动回锁等待时间，单位秒</td>
        </tr>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>视配置</td>
          <td>同 LockDoor</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>适用于访客临时进入、快递代收等场景 —— 开门后自动锁回，无需用户手动操作。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x1A">SetCredential —— 设置凭据（0x1A）</h3>
  <p>
    为用户添加或修改凭据。凭据是用户用来开锁的「钥匙」—— 可以是 PIN 码、指纹、RFID 卡等。
    每个凭据需要绑定到一个已存在的用户（通过 <code>SetUser</code> 创建）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>OperationType</td><td>U8</td><td>0 = 添加, 2 = 修改</td></tr>
        <tr><td>Credential</td><td>Struct</td><td>包含 CredentialType（PIN/指纹/RFID 等）和 CredentialIndex（槽位号）</td></tr>
        <tr><td>CredentialData</td><td>OctetString</td><td>凭据数据，如 PIN 码的数字序列</td></tr>
        <tr><td>UserIndex</td><td>U16 / Nullable</td><td>绑定的用户索引。添加时如果传 null，设备会自动创建新用户</td></tr>
        <tr><td>UserStatus</td><td>U8 / Nullable</td><td>用户状态（仅在自动创建用户时生效）</td></tr>
        <tr><td>UserType</td><td>U8 / Nullable</td><td>用户类型（仅在自动创建用户时生效）</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>用户在 App 上添加新密码或录入指纹时调用。添加前需通过 <code>MinPINCodeLength (0x17)</code> / <code>MaxPINCodeLength (0x16)</code> 校验 PIN 码长度，通过 <code>NumberOfCredentialsSupportedPerUser (0x1B)</code> 检查凭据容量。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x1B">GetCredentialStatus —— 查询凭据状态（0x1B）</h3>
  <p>查询指定凭据槽位是否已被占用、绑定在哪个用户上。不需要 Timed Interaction，是只读查询操作。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x1D">ClearCredential —— 删除凭据（0x1D）</h3>
  <p>删除指定的凭据。如果传入特定的 CredentialType 和 CredentialIndex，则精确删除对应凭据；也可以批量清除某类凭据或全部凭据。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x22">SetAliroReaderConfig —— 配置 Aliro 读卡器（0x22）</h3>
  <p>配置 Aliro NFC 读卡器的签名密钥、群组密钥、支持的协议版本等参数。Aliro 是 Matter 为门锁新增的 NFC 无感开锁标准。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x24">ClearAliroReaderConfig —— 清除 Aliro 配置（0x24）</h3>
  <p>重置 Aliro NFC 读卡器的所有配置，恢复到未配置状态。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x26">SetUser —— 设置用户（0x26）</h3>
  <p>
    创建或修改门锁上的用户。用户是凭据的「容器」—— 每个用户可以绑定多个凭据（密码、指纹等），
    并且可以设置权限级别和有效期。用户管理和凭据管理是门锁最复杂的两个操作。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr><td>OperationType</td><td>U8</td><td>0 = 添加, 2 = 修改, 3 = 清除</td></tr>
        <tr><td>UserIndex</td><td>U16</td><td>用户索引号（从 1 开始）</td></tr>
        <tr><td>UserName</td><td>String / Nullable</td><td>用户名称（可选）</td></tr>
        <tr><td>UniqueID</td><td>U32 / Nullable</td><td>用户唯一标识（可选，跨设备同步时有用）</td></tr>
        <tr><td>UserStatus</td><td>U8 / Nullable</td><td>1 = OccupiedEnabled（正常）, 3 = OccupiedDisabled（已禁用）</td></tr>
        <tr><td>UserType</td><td>U8 / Nullable</td><td>0 = 普通, 1 = 一年定期, 6 = 远程专用, 等</td></tr>
        <tr><td>CredentialRule</td><td>U8 / Nullable</td><td>凭据规则：0 = 单一凭据即可, 1 = 需双重认证, 2 = 三重</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>在门锁上注册新用户时调用。典型流程：先 <code>SetUser</code> 创建用户，再 <code>SetCredential</code> 为该用户绑定凭据。删除用户时建议用 <code>ClearUser</code>，它会同时清理关联的所有凭据。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x28">GetUser —— 查询用户（0x28）</h3>
  <p>按 UserIndex 查询用户的详细信息，包括名称、状态、类型、绑定的凭据列表等。不需要 Timed Interaction。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x29">ClearUser —— 删除用户（0x29）</h3>
  <p>删除指定用户及其关联的<strong>所有凭据</strong>。这是一个「级联删除」操作 —— 不需要额外调用 ClearCredential。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 定时交互示例 ====== -->
  <h3 id="timed-interaction">定时交互示例（Timed Interaction）</h3>
  <p>发送上锁命令时，请求结构大致如下：</p>
  <pre><code>{
  "timedRequest": {
    "timeoutMs": 5000       // 超时时间 5 秒
  },
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,       // 功能端点
      "clusterId": "0x0101", // DoorLock
      "commandId": "0x00"    // LockDoor
    },
    "commandFields": {}      // LockDoor 无额外参数
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>DoorLock Cluster 的属性按功能分为五组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 锁核心状态 0x00-0x06 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>LockState</td>
          <td>enum8 / null</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>锁当前状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>LockType</td>
          <td>enum8</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>锁芯类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ActuatorEnabled</td>
          <td>bool</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>执行器是否启用</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>DoorState</td>
          <td>enum8 / null</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>门体状态（需 DoorPositionSensor feature）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>DoorOpenEvents</td>
          <td>uint32</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>门被打开的累计次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>DoorClosedEvents</td>
          <td>uint32</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>门被关闭的累计次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>OpenPeriod</td>
          <td>uint16</td>
          <td><a href="#attr-core">锁核心状态</a></td>
          <td>门打开持续时间（秒）</td>
        </tr>
        <!-- 用户与凭据 0x10-0x1B -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>NumberOfTotalUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>支持的最大用户总数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>NumberOfPINUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>支持 PIN 码的最大用户数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>NumberOfRFIDUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>支持 RFID 的最大用户数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>NumberOfWeekDaySchedulesSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>每用户工作日时间表数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>NumberOfYearDaySchedulesSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>每用户年度时间表数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>NumberOfHolidaySchedulesSupported</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>假日时间表总数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>MaxPINCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>PIN 码最大长度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>MinPINCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>PIN 码最小长度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>MaxRFIDCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>RFID 码最大长度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>MinRFIDCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>RFID 码最小长度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>CredentialRulesSupport</td>
          <td>bitmap8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>凭据规则支持位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>NumberOfCredentialsSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">用户与凭据</a></td>
          <td>每用户最大凭据数</td>
        </tr>
        <!-- 操作与显示 0x1C-0x27 -->
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>Language</td>
          <td>string</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>锁界面语言（ISO 639-1）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1D">
          <td><a href="#attr-0x1D"><code>0x1D</code></a></td>
          <td>LEDSettings</td>
          <td>uint8</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>LED 指示灯设置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>AutoRelockTime</td>
          <td>uint32</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>自动回锁时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1F">
          <td><a href="#attr-0x1F"><code>0x1F</code></a></td>
          <td>SoundVolume</td>
          <td>uint8</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>操作音量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>OperatingMode</td>
          <td>enum8</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>当前操作模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>SupportedOperatingModes</td>
          <td>bitmap16</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>支持的操作模式位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>DefaultConfigurationRegister</td>
          <td>bitmap16</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>默认配置寄存器</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x23">
          <td><a href="#attr-0x23"><code>0x23</code></a></td>
          <td>EnableLocalProgramming</td>
          <td>bool</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>是否允许本地编程</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x24">
          <td><a href="#attr-0x24"><code>0x24</code></a></td>
          <td>EnableOneTouchLocking</td>
          <td>bool</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>是否启用一键上锁</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x25">
          <td><a href="#attr-0x25"><code>0x25</code></a></td>
          <td>EnableInsideStatusLED</td>
          <td>bool</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>是否启用内侧状态 LED</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x26">
          <td><a href="#attr-0x26"><code>0x26</code></a></td>
          <td>EnablePrivacyModeButton</td>
          <td>bool</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>是否启用隐私模式按钮</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x27">
          <td><a href="#attr-0x27"><code>0x27</code></a></td>
          <td>LocalProgrammingFeatures</td>
          <td>bitmap8</td>
          <td><a href="#attr-operating">操作与显示</a></td>
          <td>本地编程功能位图</td>
        </tr>
        <!-- 远程操作 0x30-0x33 -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>WrongCodeEntryLimit</td>
          <td>uint8</td>
          <td><a href="#attr-remote">远程操作</a></td>
          <td>错误码输入限制次数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>UserCodeTemporaryDisableTime</td>
          <td>uint8</td>
          <td><a href="#attr-remote">远程操作</a></td>
          <td>错误码锁定时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>SendPINOverTheAir</td>
          <td>bool</td>
          <td><a href="#attr-remote">远程操作</a></td>
          <td>是否通过无线发送 PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x33">
          <td><a href="#attr-0x33"><code>0x33</code></a></td>
          <td>RequirePINforRemoteOperation</td>
          <td>bool</td>
          <td><a href="#attr-remote">远程操作</a></td>
          <td>远程操作是否需要 PIN</td>
        </tr>
        <!-- Aliro 0x80-0x88 -->
        <tr class="clickable-row" data-href="#attr-0x80">
          <td><a href="#attr-0x80"><code>0x80</code></a></td>
          <td>AliroReaderVerificationKey</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>读卡器验证密钥</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x81">
          <td><a href="#attr-0x81"><code>0x81</code></a></td>
          <td>AliroReaderGroupIdentifier</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>读卡器组标识</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x82">
          <td><a href="#attr-0x82"><code>0x82</code></a></td>
          <td>AliroReaderGroupSubIdentifier</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>读卡器子标识</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x83">
          <td><a href="#attr-0x83"><code>0x83</code></a></td>
          <td>AliroExpeditedTransactionSupportedProtocolVersions</td>
          <td>list</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>快速交易支持的协议版本</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x84">
          <td><a href="#attr-0x84"><code>0x84</code></a></td>
          <td>AliroGroupResolvingKey</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>组解析密钥</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x85">
          <td><a href="#attr-0x85"><code>0x85</code></a></td>
          <td>AliroSupportedBLEUWBProtocolVersions</td>
          <td>list</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>支持的 BLE UWB 协议版本</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x86">
          <td><a href="#attr-0x86"><code>0x86</code></a></td>
          <td>AliroBLEAdvertisingVersion</td>
          <td>uint8</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>BLE 广播版本</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x87">
          <td><a href="#attr-0x87"><code>0x87</code></a></td>
          <td>NumberOfAliroCredentialIssuerKeysSupported</td>
          <td>uint16</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>凭据发行密钥数量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x88">
          <td><a href="#attr-0x88"><code>0x88</code></a></td>
          <td>NumberOfAliroEndpointKeysSupported</td>
          <td>uint16</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>端点密钥数量</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性分组详解 ====== -->

  <!-- 锁核心状态 0x00-0x06 -->
  <h3 id="attr-core">锁核心状态（0x00-0x06）</h3>
  <p>门锁最基本的状态信息，包括锁状态、锁类型、执行器以及门体位置传感器数据。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>LockState<br/><span class="attr-cn">锁状态</span></td>
          <td>enum8 / null</td>
          <td>锁当前状态。null 表示设备尚未确定锁芯位置（如刚上电时）</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>LockType<br/><span class="attr-cn">锁类型</span></td>
          <td>enum8</td>
          <td>锁芯的物理类型，设备出厂固定</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>ActuatorEnabled<br/><span class="attr-cn">执行器启用</span></td>
          <td>bool</td>
          <td>执行器是否启用。为 <code>false</code> 时所有上锁/解锁命令都会被拒绝</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>DoorState<br/><span class="attr-cn">门体状态</span></td>
          <td>enum8 / null</td>
          <td>门的物理开合状态。需设备支持 DoorPositionSensor feature</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>DoorOpenEvents<br/><span class="attr-cn">开门次数</span></td>
          <td>uint32</td>
          <td>门被打开的累计次数（可写入重置计数）</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>DoorClosedEvents<br/><span class="attr-cn">关门次数</span></td>
          <td>uint32</td>
          <td>门被关闭的累计次数（可写入重置计数）</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>OpenPeriod<br/><span class="attr-cn">开门持续时间</span></td>
          <td>uint16</td>
          <td>门打开后持续未关闭的时间，单位秒</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>LockState 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NotFullyLocked</span>
        <span class="enum-desc">未完全锁定（可能是机械故障或门没关好）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Locked</span>
        <span class="enum-desc">已锁定</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Unlocked</span>
        <span class="enum-desc">已解锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Unlatched</span>
        <span class="enum-desc">门闩已缩回（未完全解锁的中间状态）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">设备尚未确定锁芯位置</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>LockState 是 <strong>Nullable</strong> 类型 —— 当设备刚启动、还没来得及检测锁芯位置时，这个值可能是 <code>null</code>。处理这个字段时不要直接当数字用，需要先判断是否为空。</p>
  </div>

  <h4>LockType 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DeadBolt</span>
        <span class="enum-desc">锁舌锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Magnetic</span>
        <span class="enum-desc">磁力锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">其他类型</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Mortise</span>
        <span class="enum-desc">嵌入式锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rim</span>
        <span class="enum-desc">明装锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">LatchBolt</span>
        <span class="enum-desc">弹簧锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">CylindricalLock</span>
        <span class="enum-desc">圆柱锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">TubularLock</span>
        <span class="enum-desc">管状锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">InterconnectedLock</span>
        <span class="enum-desc">联动锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">DeadLatch</span>
        <span class="enum-desc">防拨锁舌</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">DoorFurniture</span>
        <span class="enum-desc">门配件</span>
      </div>
    </div>
  </div>

  <h4>DoorState 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Open</span>
        <span class="enum-desc">门已打开</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Closed</span>
        <span class="enum-desc">门已关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">JammedOpen</span>
        <span class="enum-desc">门被卡住（处于打开状态）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ForcedOpen</span>
        <span class="enum-desc">门被强制打开（安全告警）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">未指定</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Ajar</span>
        <span class="enum-desc">门虚掩（未完全关闭）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">传感器未能确定门状态</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 用户与凭据 0x10-0x1B -->
  <h3 id="attr-credential">用户与凭据（0x10-0x1B）</h3>
  <p>描述门锁支持的用户数量、凭据类型容量以及时间表调度能力。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>NumberOfTotalUsersSupported<br/><span class="attr-cn">最大用户总数</span></td>
          <td>uint16</td>
          <td>设备支持的最大用户总数</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>NumberOfPINUsersSupported<br/><span class="attr-cn">PIN 用户数</span></td>
          <td>uint16</td>
          <td>支持 PIN 码的最大用户数</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>NumberOfRFIDUsersSupported<br/><span class="attr-cn">RFID 用户数</span></td>
          <td>uint16</td>
          <td>支持 RFID 的最大用户数</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>NumberOfWeekDaySchedulesSupportedPerUser<br/><span class="attr-cn">工作日时间表数</span></td>
          <td>uint8</td>
          <td>每个用户支持的工作日时间表数量（如周一至周五特定时段可开锁）</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>NumberOfYearDaySchedulesSupportedPerUser<br/><span class="attr-cn">年度时间表数</span></td>
          <td>uint8</td>
          <td>每个用户支持的年度时间表数量（指定日期范围可开锁）</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>NumberOfHolidaySchedulesSupported<br/><span class="attr-cn">假日时间表数</span></td>
          <td>uint8</td>
          <td>设备支持的假日时间表总数（全局生效，覆盖常规时间表）</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>MaxPINCodeLength<br/><span class="attr-cn">PIN 码最大长度</span></td>
          <td>uint8</td>
          <td>设备支持的 PIN 码最大字符数</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>MinPINCodeLength<br/><span class="attr-cn">PIN 码最小长度</span></td>
          <td>uint8</td>
          <td>设备要求的 PIN 码最小字符数</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>MaxRFIDCodeLength<br/><span class="attr-cn">RFID 码最大长度</span></td>
          <td>uint8</td>
          <td>设备支持的 RFID 码最大字节数</td>
        </tr>
        <tr id="attr-0x19">
          <td><code>0x19</code></td>
          <td>MinRFIDCodeLength<br/><span class="attr-cn">RFID 码最小长度</span></td>
          <td>uint8</td>
          <td>设备要求的 RFID 码最小字节数</td>
        </tr>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>CredentialRulesSupport<br/><span class="attr-cn">凭据规则支持</span></td>
          <td>bitmap8</td>
          <td>设备支持的凭据验证规则（见下方位图）</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>NumberOfCredentialsSupportedPerUser<br/><span class="attr-cn">每用户凭据数</span></td>
          <td>uint8</td>
          <td>每个用户可绑定的最大凭据数量</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>CredentialRulesSupport 位图</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Single</span>
        <span class="enum-desc">支持单一凭据即可开锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Dual</span>
        <span class="enum-desc">支持双重凭据验证（如 PIN + 指纹）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Tri</span>
        <span class="enum-desc">支持三重凭据验证</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">凭据类型说明</div>
    <p>
      Matter 定义的凭据类型包括：PIN（数字密码）、RFID（卡片）、Fingerprint（指纹）、FingerVein（指静脉）、Face（人脸）。
      具体支持哪些凭据类型取决于门锁硬件实现。凭据通过 <code>SetCredential</code> 命令管理。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 操作与显示 0x1C-0x27 -->
  <h3 id="attr-operating">操作与显示（0x1C-0x27）</h3>
  <p>控制门锁的操作行为、界面显示和本地编程功能。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>Language<br/><span class="attr-cn">界面语言</span></td>
          <td>string</td>
          <td>锁界面显示语言，2 字符 ISO 639-1 编码（如 "en"、"zh"）</td>
        </tr>
        <tr id="attr-0x1D">
          <td><code>0x1D</code></td>
          <td>LEDSettings<br/><span class="attr-cn">LED 设置</span></td>
          <td>uint8</td>
          <td>LED 指示灯在什么操作下点亮（见下方枚举）</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>AutoRelockTime<br/><span class="attr-cn">自动回锁时间</span></td>
          <td>uint32</td>
          <td>解锁后自动回锁的等待时间，单位秒。<code>0</code> 表示不自动回锁</td>
        </tr>
        <tr id="attr-0x1F">
          <td><code>0x1F</code></td>
          <td>SoundVolume<br/><span class="attr-cn">操作音量</span></td>
          <td>uint8</td>
          <td>门锁操作提示音的音量级别（见下方枚举）</td>
        </tr>
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>OperatingMode<br/><span class="attr-cn">操作模式</span></td>
          <td>enum8</td>
          <td>门锁当前的操作模式（见下方枚举）</td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>SupportedOperatingModes<br/><span class="attr-cn">支持的操作模式</span></td>
          <td>bitmap16</td>
          <td>设备支持哪些操作模式（位掩码，对应 OperatingMode 枚举值）</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>DefaultConfigurationRegister<br/><span class="attr-cn">默认配置寄存器</span></td>
          <td>bitmap16</td>
          <td>标识哪些配置项已从出厂默认值被修改过</td>
        </tr>
        <tr id="attr-0x23">
          <td><code>0x23</code></td>
          <td>EnableLocalProgramming<br/><span class="attr-cn">本地编程</span></td>
          <td>bool</td>
          <td>是否允许通过门锁面板本地添加/修改用户和凭据</td>
        </tr>
        <tr id="attr-0x24">
          <td><code>0x24</code></td>
          <td>EnableOneTouchLocking<br/><span class="attr-cn">一键上锁</span></td>
          <td>bool</td>
          <td>是否启用一键上锁功能（触摸面板即可锁门）</td>
        </tr>
        <tr id="attr-0x25">
          <td><code>0x25</code></td>
          <td>EnableInsideStatusLED<br/><span class="attr-cn">内侧状态 LED</span></td>
          <td>bool</td>
          <td>是否启用门锁内侧的状态指示 LED</td>
        </tr>
        <tr id="attr-0x26">
          <td><code>0x26</code></td>
          <td>EnablePrivacyModeButton<br/><span class="attr-cn">隐私模式按钮</span></td>
          <td>bool</td>
          <td>是否启用物理隐私模式按钮（按下后拒绝远程操作）</td>
        </tr>
        <tr id="attr-0x27">
          <td><code>0x27</code></td>
          <td>LocalProgrammingFeatures<br/><span class="attr-cn">本地编程功能</span></td>
          <td>bitmap8</td>
          <td>允许通过本地编程执行的具体功能（添加用户、修改时间表等）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>LEDSettings 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Never</span>
        <span class="enum-desc">LED 从不亮起</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AccessLockUnlock</span>
        <span class="enum-desc">仅在开锁/上锁操作时亮起</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAccessLockUnlock</span>
        <span class="enum-desc">仅在非开关锁操作时亮起</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">All</span>
        <span class="enum-desc">所有操作都亮起</span>
      </div>
    </div>
  </div>

  <h4>SoundVolume 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Silent</span>
        <span class="enum-desc">静音</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">低音量</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">高音量</span>
      </div>
    </div>
  </div>

  <h4>OperatingMode 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常模式，所有用户可正常使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Vacation</span>
        <span class="enum-desc">度假模式，限制远程操作</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Privacy</span>
        <span class="enum-desc">隐私模式，只允许本地操作</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NoRemoteLockUnlock</span>
        <span class="enum-desc">禁止远程开关锁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Passage</span>
        <span class="enum-desc">通行模式，门保持解锁状态</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 远程操作 0x30-0x33 -->
  <h3 id="attr-remote">远程操作（0x30-0x33）</h3>
  <p>与远程（网络/无线）操作安全策略相关的属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>WrongCodeEntryLimit<br/><span class="attr-cn">错误码次数限制</span></td>
          <td>uint8</td>
          <td>连续输入错误码的最大允许次数，超过后触发临时锁定</td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>UserCodeTemporaryDisableTime<br/><span class="attr-cn">错误码锁定时间</span></td>
          <td>uint8</td>
          <td>触发临时锁定后的禁用时间，单位秒</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>SendPINOverTheAir<br/><span class="attr-cn">无线传输 PIN</span></td>
          <td>bool</td>
          <td>是否允许通过无线网络发送 PIN 码（安全相关，通常建议关闭）</td>
        </tr>
        <tr id="attr-0x33">
          <td><code>0x33</code></td>
          <td>RequirePINforRemoteOperation<br/><span class="attr-cn">远程操作需 PIN</span></td>
          <td>bool</td>
          <td>远程（App/网络）操作是否必须附带 PIN 码。为 <code>true</code> 时，LockDoor/UnlockDoor 必须在命令中携带有效 PIN</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">安全提示</div>
    <p>
      <code>WrongCodeEntryLimit</code> 和 <code>UserCodeTemporaryDisableTime</code> 构成门锁的防暴力破解机制。
      典型配置为 5 次错误后锁定 60 秒。App 端应在用户达到限制前给出提示，避免误触发锁定。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- Aliro NFC 门禁 0x80-0x88 -->
  <h3 id="attr-aliro">Aliro NFC 门禁（0x80-0x88）</h3>
  <p>
    Aliro 是 Matter 为门锁新增的 NFC 无感开锁标准。支持手机靠近门锁自动解锁，类似 Apple 数字车钥匙的体验。
    通过 <code>SetAliroReaderConfig</code> / <code>ClearAliroReaderConfig</code> 命令管理。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x80">
          <td><code>0x80</code></td>
          <td>AliroReaderVerificationKey<br/><span class="attr-cn">读卡器验证密钥</span></td>
          <td>octstr</td>
          <td>用于验证读卡器身份的公钥</td>
        </tr>
        <tr id="attr-0x81">
          <td><code>0x81</code></td>
          <td>AliroReaderGroupIdentifier<br/><span class="attr-cn">读卡器组标识</span></td>
          <td>octstr</td>
          <td>读卡器所属组的标识符，同组读卡器共享访问权限</td>
        </tr>
        <tr id="attr-0x82">
          <td><code>0x82</code></td>
          <td>AliroReaderGroupSubIdentifier<br/><span class="attr-cn">读卡器子标识</span></td>
          <td>octstr</td>
          <td>读卡器在组内的唯一子标识</td>
        </tr>
        <tr id="attr-0x83">
          <td><code>0x83</code></td>
          <td>AliroExpeditedTransactionSupportedProtocolVersions<br/><span class="attr-cn">快速交易协议版本</span></td>
          <td>list</td>
          <td>支持的快速（无需完整握手）交易协议版本列表</td>
        </tr>
        <tr id="attr-0x84">
          <td><code>0x84</code></td>
          <td>AliroGroupResolvingKey<br/><span class="attr-cn">组解析密钥</span></td>
          <td>octstr</td>
          <td>用于解析和识别 Aliro 组成员身份的密钥</td>
        </tr>
        <tr id="attr-0x85">
          <td><code>0x85</code></td>
          <td>AliroSupportedBLEUWBProtocolVersions<br/><span class="attr-cn">BLE UWB 协议版本</span></td>
          <td>list</td>
          <td>支持的 BLE 和 UWB 协议版本列表（用于测距定位）</td>
        </tr>
        <tr id="attr-0x86">
          <td><code>0x86</code></td>
          <td>AliroBLEAdvertisingVersion<br/><span class="attr-cn">BLE 广播版本</span></td>
          <td>uint8</td>
          <td>Aliro 读卡器的 BLE 广播协议版本号</td>
        </tr>
        <tr id="attr-0x87">
          <td><code>0x87</code></td>
          <td>NumberOfAliroCredentialIssuerKeysSupported<br/><span class="attr-cn">凭据发行密钥数</span></td>
          <td>uint16</td>
          <td>设备支持的 Aliro 凭据发行者密钥数量</td>
        </tr>
        <tr id="attr-0x88">
          <td><code>0x88</code></td>
          <td>NumberOfAliroEndpointKeysSupported<br/><span class="attr-cn">端点密钥数</span></td>
          <td>uint16</td>
          <td>设备支持的 Aliro 端点密钥数量</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 标准示例 ====== -->
  <h2 id="standard-example">标准示例</h2>
  <p>以下是 Matter 门锁的典型属性数据示例（JSON 格式），逐字段标注含义：</p>

  <pre><code>{
  // --- 锁核心状态 ---
  "0x00": 1,           // LockState = Locked（已锁定）
  "0x01": 0,           // LockType = DeadBolt（锁舌锁）
  "0x02": true,        // ActuatorEnabled = true（执行器启用）
  "0x03": 1,           // DoorState = Closed（门已关闭）

  // --- 用户与凭据 ---
  "0x10": 10,          // NumberOfTotalUsersSupported = 10
  "0x11": 10,          // NumberOfPINUsersSupported = 10
  "0x16": 8,           // MaxPINCodeLength = 8 位
  "0x17": 4,           // MinPINCodeLength = 4 位
  "0x1B": 5,           // NumberOfCredentialsSupportedPerUser = 5

  // --- 操作与显示 ---
  "0x1E": 30,          // AutoRelockTime = 30 秒
  "0x1F": 2,           // SoundVolume = High
  "0x20": 0,           // OperatingMode = Normal
  "0x21": 65535,       // SupportedOperatingModes（支持所有模式）

  // --- 远程操作 ---
  "0x30": 5,           // WrongCodeEntryLimit = 5 次
  "0x33": false        // RequirePINforRemoteOperation = false
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际从设备读取数据时，Attribute ID 会是十六进制字符串作为 key。上面的 JSON 中 <code>"0x00"</code> 对应 LockState，
      <code>"0x20"</code> 对应 OperatingMode。对照本页的属性表就能逐个翻译。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-lock-unlock">场景 1：远程开锁 / 关锁</h3>
  <ol>
    <li>读取 <code>ActuatorEnabled (0x02)</code>，确认执行器是否启用</li>
    <li>读取 <code>RequirePINforRemoteOperation (0x33)</code>，判断是否需要用户输入 PIN</li>
    <li>发送 <code>LockDoor (0x00)</code> 或 <code>UnlockDoor (0x01)</code> 命令（必须带 Timed Interaction）</li>
    <li>订阅 <code>LockState (0x00)</code> 的变化，确认操作结果</li>
  </ol>

  <h3 id="scenario-add-user">场景 2：添加新用户和 PIN 码</h3>
  <ol>
    <li>读取 <code>NumberOfTotalUsersSupported (0x10)</code> 确认用户容量</li>
    <li>发送 <code>SetUser (0x26)</code> 创建用户</li>
    <li>读取 <code>MinPINCodeLength (0x17)</code> 和 <code>MaxPINCodeLength (0x16)</code> 确认 PIN 长度要求</li>
    <li>发送 <code>SetCredential (0x1A)</code> 为该用户绑定 PIN 码</li>
    <li>可通过 <code>GetCredentialStatus (0x1B)</code> 验证凭据是否设置成功</li>
  </ol>

  <h3 id="scenario-check-state">场景 3：首页展示锁状态</h3>
  <ol>
    <li>读取 <code>LockState (0x00)</code> —— 注意处理 <code>null</code> 值</li>
    <li>读取 <code>OperatingMode (0x20)</code> —— 如果不是 Normal，界面上可能需要提示</li>
    <li>配合 PowerSource Cluster 读取电池电量</li>
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
  'window-covering': {
    title: '窗帘 Cluster · WindowCovering（0x0102）',
    description: 'Matter WindowCovering Cluster（0x0102）完整参考 — UpOrOpen/DownOrClose/GoToLiftPercentage 等命令、升降与倾斜位置属性、Feature Map（LF/TL/PA/AB）、Type/EndProductType 枚举、OperationalStatus/SafetyStatus 位图及常见场景。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>窗帘 Cluster（WindowCovering）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0102</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    WindowCovering 是 Matter 中控制窗帘类设备的核心 Cluster，适用于电动卷帘、百叶窗、窗帘轨道、遮阳篷、投影幕布等所有需要「升降」或「倾斜」控制的设备。
    它定义了窗帘的运动控制命令、位置反馈属性，以及设备类型与安全状态的完整描述。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">位置值约定：0 = 全开，10000 = 全关</div>
    <p>
      WindowCovering 使用 <strong>percent100ths</strong>（百分之一的百分比）表示位置，范围 0&ndash;10000。
      <code>0</code> 代表完全打开（窗帘收起），<code>10000</code> 代表完全关闭（窗帘放下）。
      这与直觉可能相反 &mdash; 数值越大，遮挡越多。百分比属性（如 CurrentPositionLiftPercentage）的范围是 0&ndash;100，含义一致。
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
    WindowCovering Cluster 共有 7 个命令。基础三件套（UpOrOpen / DownOrClose / StopMotion）是所有窗帘设备都支持的，
    后四个精确定位命令需要设备启用对应的 Feature 组合。
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
          <td>UpOrOpen</td>
          <td>升起 / 打开窗帘</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>DownOrClose</td>
          <td>降下 / 关闭窗帘</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StopMotion</td>
          <td>立即停止运动</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>GoToLiftValue</td>
          <td>升降到指定绝对值</td>
          <td class="col-required">LF + AB</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>GoToLiftPercentage</td>
          <td>升降到指定百分比</td>
          <td class="col-required">LF + PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>GoToTiltValue</td>
          <td>倾斜到指定绝对值</td>
          <td class="col-required">TL + AB</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>GoToTiltPercentage</td>
          <td>倾斜到指定百分比</td>
          <td class="col-required">TL + PA</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">UpOrOpen &mdash; 升起 / 打开（0x00）</h3>
  <p>
    将窗帘向「全开」方向运动。对卷帘来说是向上收起，对窗帘轨道来说是向两侧拉开。
    不需要任何参数，设备收到后立即开始运动，直到到达全开位置或收到 StopMotion 命令。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户点击 App 上的「打开窗帘」按钮、语音助手执行「打开窗帘」、早安自动化场景触发时调用。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">DownOrClose &mdash; 降下 / 关闭（0x01）</h3>
  <p>
    将窗帘向「全关」方向运动。对卷帘来说是向下展开，对窗帘轨道来说是向中间合拢。
    不需要任何参数，设备收到后立即运动到全关位置。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>用户点击「关闭窗帘」按钮、晚安场景自动关闭窗帘、光线传感器检测到强光时自动调用。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">StopMotion &mdash; 停止运动（0x02）</h3>
  <p>
    立即停止窗帘所有轴的运动（升降和倾斜）。不需要参数。
    停止后 <code>OperationalStatus</code> 的所有运动位归零。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        窗帘运动过程中，用户再次点击控制按钮可发送 StopMotion 让窗帘停在当前位置。
        也用于安全保护 &mdash; 检测到障碍物或异常时紧急停止。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">GoToLiftValue &mdash; 升降到绝对值（0x04）</h3>
  <p>
    将窗帘升降到指定的绝对位置值。这个值对应设备内部的物理单位（如电机步数），
    范围由 <code>InstalledOpenLimitLift</code> 和 <code>InstalledClosedLimitLift</code> 决定。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LiftValue</td>
          <td>uint16</td>
          <td>目标升降位置的绝对值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>需要精确控制窗帘到物理刻度位置时使用。大多数场景建议用 GoToLiftPercentage（百分比更直观）。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">GoToLiftPercentage &mdash; 升降到百分比（0x05）</h3>
  <p>
    将窗帘升降到指定的百分比位置。这是最常用的精确控制命令。
    参数使用 percent100ths（百分之一的百分比，范围 0&ndash;10000），<code>0</code> = 全开，<code>10000</code> = 全关。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LiftPercent100thsValue</td>
          <td>percent100ths</td>
          <td>目标升降位置。<code>0</code> = 全开，<code>5000</code> = 半开，<code>10000</code> = 全关</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>
        App 上的滑块控件拖动到 30% 位置时，发送 GoToLiftPercentage（LiftPercent100thsValue = 3000）。
        「打开到一半」的语音指令可发送 5000。建议在 App 上把滑块显示为「打开程度」（0% = 全关，100% = 全开），
        发送时做 <code>10000 - 用户值 * 100</code> 的换算。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">GoToTiltValue &mdash; 倾斜到绝对值（0x07）</h3>
  <p>
    将百叶窗叶片倾斜到指定的绝对位置值。仅支持带倾斜功能的百叶窗类设备。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TiltValue</td>
          <td>uint16</td>
          <td>目标倾斜位置的绝对值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x08">GoToTiltPercentage &mdash; 倾斜到百分比（0x08）</h3>
  <p>
    将百叶窗叶片倾斜到指定的百分比位置。与升降百分比逻辑一致，
    <code>0</code> = 叶片完全打开（平行于窗面），<code>10000</code> = 叶片完全关闭（垂直于窗面）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TiltPercent100thsValue</td>
          <td>percent100ths</td>
          <td>目标倾斜位置。<code>0</code> = 叶片全开，<code>10000</code> = 叶片全关</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>百叶窗的叶片角度调节。例如下午阳光直射时，把叶片调到 7000（70% 关闭）既能遮阳又能保持通风。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>WindowCovering Cluster 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 类型与配置 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Type</td>
          <td>enum8</td>
          <td><a href="#group-type">类型与配置</a></td>
          <td>窗帘类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>EndProductType</td>
          <td>enum8</td>
          <td><a href="#group-type">类型与配置</a></td>
          <td>终端产品类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ConfigStatus</td>
          <td>bitmap8</td>
          <td><a href="#group-type">类型与配置</a></td>
          <td>配置与运行状态标志</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0017">
          <td><a href="#attr-0x0017"><code>0x0017</code></a></td>
          <td>Mode</td>
          <td>bitmap8</td>
          <td><a href="#group-type">类型与配置</a></td>
          <td>运行模式标志</td>
        </tr>
        <!-- 升降位置 -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>TargetPositionLiftPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>目标升降位置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000E">
          <td><a href="#attr-0x000E"><code>0x000E</code></a></td>
          <td>CurrentPositionLiftPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>当前升降位置（高精度）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>CurrentPositionLiftPercentage</td>
          <td>uint8 / null</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>当前升降位置（百分比）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentPositionLift</td>
          <td>uint16 / null</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>当前升降绝对值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>PhysicalClosedLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>物理关闭极限值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>InstalledOpenLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>安装后的全开极限</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>InstalledClosedLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">升降位置</a></td>
          <td>安装后的全关极限</td>
        </tr>
        <!-- 倾斜位置 -->
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>TargetPositionTiltPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>目标倾斜位置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>CurrentPositionTiltPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>当前倾斜位置（高精度）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>CurrentPositionTiltPercentage</td>
          <td>uint8 / null</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>当前倾斜位置（百分比）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentPositionTilt</td>
          <td>uint16 / null</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>当前倾斜绝对值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>PhysicalClosedLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>物理关闭极限值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>InstalledOpenLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>安装后的全开极限</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0013">
          <td><a href="#attr-0x0013"><code>0x0013</code></a></td>
          <td>InstalledClosedLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">倾斜位置</a></td>
          <td>安装后的全关极限</td>
        </tr>
        <!-- 运行状态 -->
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>OperationalStatus</td>
          <td>bitmap8</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>各轴运动方向</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x001A">
          <td><a href="#attr-0x001A"><code>0x001A</code></a></td>
          <td>SafetyStatus</td>
          <td>bitmap16</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>安全异常标志</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 类型与配置（0x0000, 0x000D, 0x0007, 0x0017）====== -->
  <h3 id="group-type">类型与配置（0x0000, 0x000D, 0x0007, 0x0017）</h3>
  <p>描述窗帘设备的物理类型、产品分类以及当前的配置和运行模式。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Type<br/><span class="attr-cn">窗帘类型</span></td>
          <td>enum8</td>
          <td>窗帘的机械类型（见下方枚举），决定了设备支持升降、倾斜还是两者兼有</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>EndProductType<br/><span class="attr-cn">终端产品类型</span></td>
          <td>enum8</td>
          <td>更细化的产品分类（见下方枚举），用于 App 展示合适的图标和控制界面</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ConfigStatus<br/><span class="attr-cn">配置状态</span></td>
          <td>bitmap8</td>
          <td>设备的配置与能力标志位（见下方位图）</td>
        </tr>
        <tr id="attr-0x0017">
          <td><code>0x0017</code></td>
          <td>Mode<br/><span class="attr-cn">运行模式</span></td>
          <td>bitmap8</td>
          <td>设备的运行模式标志位（见下方位图）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Type 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Rollershade</span>
        <span class="enum-desc">卷帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Rollershade - 2 Motor</span>
        <span class="enum-desc">双电机卷帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Rollershade - Exterior</span>
        <span class="enum-desc">室外卷帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Rollershade - Exterior - 2 Motor</span>
        <span class="enum-desc">室外双电机卷帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Drapery</span>
        <span class="enum-desc">窗帘（左右拉开式）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Awning</span>
        <span class="enum-desc">遮阳篷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Shutter</span>
        <span class="enum-desc">百叶窗 / 卷闸</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">TiltBlindTiltOnly</span>
        <span class="enum-desc">倾斜百叶窗（仅支持倾斜）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">TiltBlindLiftAndTilt</span>
        <span class="enum-desc">倾斜百叶窗（支持升降 + 倾斜）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">ProjectorScreen</span>
        <span class="enum-desc">投影幕布</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知类型</span>
      </div>
    </div>
  </div>

  <h4>EndProductType 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">RollerShade</span>
        <span class="enum-desc">卷帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">RomanShade</span>
        <span class="enum-desc">罗马帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BalloonShade</span>
        <span class="enum-desc">气球帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">WovenWood</span>
        <span class="enum-desc">编织木帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">PleatedShade</span>
        <span class="enum-desc">风琴帘 / 蜂巢帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">RollerShutter</span>
        <span class="enum-desc">卷闸</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ExteriorVenetianBlind</span>
        <span class="enum-desc">室外百叶窗</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">LateralLeftCurtain</span>
        <span class="enum-desc">左侧拉帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">LateralRightCurtain</span>
        <span class="enum-desc">右侧拉帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">CentralCurtain</span>
        <span class="enum-desc">对开帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">RollerCurtain</span>
        <span class="enum-desc">滚筒帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">ExteriorVerticalScreen</span>
        <span class="enum-desc">室外垂直遮阳屏</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">AwningTerracePatio</span>
        <span class="enum-desc">露台遮阳篷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">AwningVerticalScreen</span>
        <span class="enum-desc">垂直遮阳篷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">14</span>
      <div>
        <span class="enum-name">TiltOnlyInteriorBlind</span>
        <span class="enum-desc">室内百叶窗（仅倾斜）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">InteriorBlind</span>
        <span class="enum-desc">室内百叶窗</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">16</span>
      <div>
        <span class="enum-name">VerticalBlindStripCurtain</span>
        <span class="enum-desc">垂直百叶帘 / 条帘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">17</span>
      <div>
        <span class="enum-name">InteriorVenetianBlind</span>
        <span class="enum-desc">室内威尼斯百叶窗</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">18</span>
      <div>
        <span class="enum-name">ExteriorVenetianBlind</span>
        <span class="enum-desc">室外威尼斯百叶窗</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">19</span>
      <div>
        <span class="enum-name">LateralLeftVerticalBlind</span>
        <span class="enum-desc">左侧垂直百叶</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">20</span>
      <div>
        <span class="enum-name">LateralRightVerticalBlind</span>
        <span class="enum-desc">右侧垂直百叶</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">21</span>
      <div>
        <span class="enum-name">CentralVerticalBlind</span>
        <span class="enum-desc">对开垂直百叶</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">22</span>
      <div>
        <span class="enum-name">RollerShutterTerrace</span>
        <span class="enum-desc">露台卷闸</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">23</span>
      <div>
        <span class="enum-name">ProjectorScreen</span>
        <span class="enum-desc">投影幕布</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知产品类型</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Type vs EndProductType</div>
    <p>
      <code>Type</code> 决定设备的机械能力（能升降、能倾斜、还是两者兼有），影响哪些 Feature 和命令可用。
      <code>EndProductType</code> 是更细致的产品分类，主要用于 App 选择合适的图标和控制界面。
      两者都是设备出厂固定的，不可修改。
    </p>
  </div>

  <h4>ConfigStatus 位图</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Operational</span>
        <span class="enum-desc">设备可正常运行（1 = 正常，0 = 未就绪）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">OnlineReserved</span>
        <span class="enum-desc">在线（保留位，目前始终为 1）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">LiftMovementReversed</span>
        <span class="enum-desc">升降方向反转（1 = 电机反向运行）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">LiftPositionAware</span>
        <span class="enum-desc">升降位置感知（1 = 可报告精确位置）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TiltPositionAware</span>
        <span class="enum-desc">倾斜位置感知（1 = 可报告精确倾斜角度）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">LiftEncoderControlled</span>
        <span class="enum-desc">升降编码器控制（1 = 使用编码器反馈位置）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">TiltEncoderControlled</span>
        <span class="enum-desc">倾斜编码器控制（1 = 使用编码器反馈角度）</span>
      </div>
    </div>
  </div>

  <h4>Mode 位图</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MotorDirectionReversed</span>
        <span class="enum-desc">电机方向反转</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CalibrationMode</span>
        <span class="enum-desc">校准模式（设备正在校准行程极限）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MaintenanceMode</span>
        <span class="enum-desc">维护模式（设备暂停正常操作）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">LEDFeedback</span>
        <span class="enum-desc">LED 反馈（1 = 运动时 LED 指示）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 升降位置 ====== -->
  <h3 id="group-lift">升降位置（0x0001&ndash;0x0011）</h3>
  <p>描述窗帘升降轴的当前位置、目标位置和行程极限。所有升降属性需要设备支持 <strong>LF（Lift）</strong> 特性。</p>

  <div class="callout callout-warning">
    <div class="callout-title">percent100ths 与 percentage 的区别</div>
    <p>
      <code>CurrentPositionLiftPercent100ths</code> 的范围是 <strong>0&ndash;10000</strong>（精度为 0.01%），
      而 <code>CurrentPositionLiftPercentage</code> 的范围是 <strong>0&ndash;100</strong>（精度为 1%）。
      两者表达同一个位置，percent100ths 精度更高，开发时优先使用它。
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>TargetPositionLiftPercent100ths<br/><span class="attr-cn">目标升降位置</span></td>
          <td>percent100ths / null</td>
          <td>窗帘正在前往的目标升降位置。运动中此值与当前位置不同，停止后两者一致。<code>null</code> 表示未知。<strong>需要 LF + PA</strong></td>
        </tr>
        <tr id="attr-0x000E">
          <td><code>0x000E</code></td>
          <td>CurrentPositionLiftPercent100ths<br/><span class="attr-cn">当前升降位置（高精度）</span></td>
          <td>percent100ths / null</td>
          <td>当前升降位置，0 = 全开，10000 = 全关。运动过程中实时更新。<code>null</code> 表示位置未知（如刚上电尚未校准）。<strong>需要 LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>CurrentPositionLiftPercentage<br/><span class="attr-cn">当前升降百分比</span></td>
          <td>uint8 / null</td>
          <td>当前升降位置的粗略百分比（0&ndash;100）。是 Percent100ths 的低精度版本。<strong>需要 LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentPositionLift<br/><span class="attr-cn">当前升降绝对值</span></td>
          <td>uint16 / null</td>
          <td>当前升降位置的绝对值（设备内部单位）。<strong>需要 LF + AB</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>PhysicalClosedLimitLift<br/><span class="attr-cn">物理关闭极限</span></td>
          <td>uint16</td>
          <td>升降轴物理关闭位置的绝对值上限。<strong>需要 LF + AB</strong></td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>InstalledOpenLimitLift<br/><span class="attr-cn">安装全开极限</span></td>
          <td>uint16</td>
          <td>安装后实际可到达的全开位置绝对值。<strong>需要 LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>InstalledClosedLimitLift<br/><span class="attr-cn">安装全关极限</span></td>
          <td>uint16</td>
          <td>安装后实际可到达的全关位置绝对值。<strong>需要 LF + PA</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 倾斜位置 ====== -->
  <h3 id="group-tilt">倾斜位置（0x0002&ndash;0x0013）</h3>
  <p>描述窗帘倾斜轴（百叶窗叶片角度）的当前位置、目标位置和行程极限。所有倾斜属性需要设备支持 <strong>TL（Tilt）</strong> 特性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>TargetPositionTiltPercent100ths<br/><span class="attr-cn">目标倾斜位置</span></td>
          <td>percent100ths / null</td>
          <td>叶片正在前往的目标倾斜位置。<code>null</code> 表示未知。<strong>需要 TL + PA</strong></td>
        </tr>
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>CurrentPositionTiltPercent100ths<br/><span class="attr-cn">当前倾斜位置（高精度）</span></td>
          <td>percent100ths / null</td>
          <td>当前叶片倾斜位置，0 = 叶片全开，10000 = 叶片全关。<strong>需要 TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>CurrentPositionTiltPercentage<br/><span class="attr-cn">当前倾斜百分比</span></td>
          <td>uint8 / null</td>
          <td>当前叶片倾斜位置的粗略百分比（0&ndash;100）。<strong>需要 TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentPositionTilt<br/><span class="attr-cn">当前倾斜绝对值</span></td>
          <td>uint16 / null</td>
          <td>当前叶片倾斜位置的绝对值。<strong>需要 TL + AB</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>PhysicalClosedLimitTilt<br/><span class="attr-cn">物理关闭极限</span></td>
          <td>uint16</td>
          <td>倾斜轴物理关闭位置的绝对值上限。<strong>需要 TL + AB</strong></td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>InstalledOpenLimitTilt<br/><span class="attr-cn">安装全开极限</span></td>
          <td>uint16</td>
          <td>安装后实际可到达的叶片全开位置绝对值。<strong>需要 TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0013">
          <td><code>0x0013</code></td>
          <td>InstalledClosedLimitTilt<br/><span class="attr-cn">安装全关极限</span></td>
          <td>uint16</td>
          <td>安装后实际可到达的叶片全关位置绝对值。<strong>需要 TL + PA</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 运行状态 ====== -->
  <h3 id="group-status">运行状态（0x000A, 0x001A）</h3>
  <p>描述窗帘当前的运动方向和安全异常状态。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>OperationalStatus<br/><span class="attr-cn">运行状态</span></td>
          <td>bitmap8</td>
          <td>各运动轴的当前运动方向（见下方位图）。全部为 0 表示已停止</td>
        </tr>
        <tr id="attr-0x001A">
          <td><code>0x001A</code></td>
          <td>SafetyStatus<br/><span class="attr-cn">安全状态</span></td>
          <td>bitmap16</td>
          <td>安全异常标志（见下方位图）。任何位为 1 都表示存在异常</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>OperationalStatus 位图</h4>
  <div class="callout callout-info">
    <div class="callout-title">编码方式</div>
    <p>
      OperationalStatus 用 3 组 2-bit 字段表示三个轴的运动方向：
      <code>00</code> = 已停止，<code>01</code> = 正在打开（向 0 方向），<code>10</code> = 正在关闭（向 10000 方向）。
    </p>
  </div>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0&ndash;1</span>
      <div>
        <span class="enum-name">Global</span>
        <span class="enum-desc">全局运动方向（综合升降和倾斜的整体状态）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2&ndash;3</span>
      <div>
        <span class="enum-name">Lift</span>
        <span class="enum-desc">升降轴运动方向</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4&ndash;5</span>
      <div>
        <span class="enum-name">Tilt</span>
        <span class="enum-desc">倾斜轴运动方向</span>
      </div>
    </div>
  </div>

  <h4>SafetyStatus 位图</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RemoteLockout</span>
        <span class="enum-desc">远程锁定（设备拒绝远程操作）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TamperDetection</span>
        <span class="enum-desc">篡改检测（设备检测到异常干预）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">FailedCommunication</span>
        <span class="enum-desc">通信故障（与电机控制器通信失败）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">PositionFailure</span>
        <span class="enum-desc">定位故障（位置传感器异常）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ThermalProtection</span>
        <span class="enum-desc">热保护（电机过热，暂停运行）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">ObstacleDetected</span>
        <span class="enum-desc">检测到障碍物（运动路径上有阻挡）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">Power</span>
        <span class="enum-desc">电源异常（供电不足或中断）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">StopInput</span>
        <span class="enum-desc">外部停止信号（收到硬件停止输入）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 8</span>
      <div>
        <span class="enum-name">MotorJammed</span>
        <span class="enum-desc">电机堵转</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 9</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">硬件故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 10</span>
      <div>
        <span class="enum-name">ManualOperation</span>
        <span class="enum-desc">手动操作中（用户正在手动拉动窗帘）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>WindowCovering Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些能力。Feature 的组合决定了哪些命令和属性可用：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LF（Lift）</span>
        <span class="enum-desc">支持升降运动 &mdash; 窗帘可以上下移动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TL（Tilt）</span>
        <span class="enum-desc">支持倾斜调节 &mdash; 百叶窗叶片可旋转</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">PA（Position Aware Lift）</span>
        <span class="enum-desc">位置感知 &mdash; 可报告和定位到精确百分比位置</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">AB（Absolute Position）</span>
        <span class="enum-desc">绝对位置 &mdash; 支持以设备内部单位定位</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合与设备类型</div>
    <p>
      <strong>电动卷帘</strong>：通常为 LF + PA（支持升降和百分比定位），FeatureMap = <code>0x05</code>。<br/>
      <strong>百叶窗</strong>：通常为 LF + TL + PA（升降 + 倾斜 + 位置感知），FeatureMap = <code>0x07</code>。<br/>
      <strong>纯倾斜百叶窗</strong>：通常为 TL + PA（仅倾斜），FeatureMap = <code>0x06</code>。<br/>
      读取 FeatureMap 后，App 应据此决定显示升降控件、倾斜控件还是两者都显示。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个支持升降 + 位置感知的电动卷帘在 30% 位置（接近全开）时的 WindowCovering Cluster 读取结果：</p>

  <pre><code>{
  // --- 类型与配置 ---
  "0x0000": 0,              // Type = Rollershade（卷帘）
  "0x000D": 0,              // EndProductType = RollerShade
  "0x0007": 0x09,           // ConfigStatus = Operational + LiftPositionAware
  "0x0017": 0x00,           // Mode = 正常运行（所有位为 0）

  // --- 升降位置 ---
  "0x000E": 3000,           // CurrentPositionLiftPercent100ths = 30.00%
  "0x0008": 30,             // CurrentPositionLiftPercentage = 30%
  "0x000B": 3000,           // TargetPositionLiftPercent100ths = 30.00%（目标与当前一致，已停止）
  "0x0010": 0,              // InstalledOpenLimitLift = 0（全开位置）
  "0x0011": 10000,          // InstalledClosedLimitLift = 10000（全关位置）

  // --- 运行状态 ---
  "0x000A": 0x00,           // OperationalStatus = 所有轴已停止
  "0x001A": 0x0000          // SafetyStatus = 无异常
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      对于只支持 UpOrOpen / DownOrClose 的简单窗帘（无位置感知），可能没有百分比属性。
      读取前先检查 <code>FeatureMap (0xFFFC)</code> 判断设备支持哪些能力，再决定读取哪些属性和展示什么控件。
      不支持倾斜的设备不会上报 Tilt 相关属性。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：基础开合控制</summary>
    <div class="scenario-content">
      <ol>
        <li>发送 <code>UpOrOpen (0x00)</code> 打开窗帘，或 <code>DownOrClose (0x01)</code> 关闭窗帘</li>
        <li>订阅 <code>OperationalStatus (0x000A)</code> 监控运动状态</li>
        <li>运动过程中，用户可发送 <code>StopMotion (0x02)</code> 让窗帘停在当前位置</li>
        <li>订阅 <code>CurrentPositionLiftPercent100ths (0x000E)</code> 实时更新 App 上的位置显示</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：滑块精确控制位置</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 LF + PA 特性</li>
        <li>App 上展示一个 0%&ndash;100% 的滑块，0% = 全关，100% = 全开</li>
        <li>用户拖动滑块到 70%（表示打开 70%），换算后发送 <code>GoToLiftPercentage (0x05)</code>，参数 LiftPercent100thsValue = <code>3000</code>（因为 0 = 全开，所以 100% - 70% = 30% = 3000）</li>
        <li>订阅 <code>CurrentPositionLiftPercent100ths</code> 和 <code>TargetPositionLiftPercent100ths</code>，前者跟踪实际位置，后者可用于显示目标指示器</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：百叶窗升降 + 叶片倾斜</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FeatureMap</code>，确认设备同时支持 LF + TL（升降和倾斜）</li>
        <li>App 上展示两个控件：升降滑块 + 倾斜滑块</li>
        <li>升降用 <code>GoToLiftPercentage (0x05)</code> 控制窗帘高度</li>
        <li>倾斜用 <code>GoToTiltPercentage (0x08)</code> 调节叶片角度</li>
        <li>用户场景：「百叶窗放到一半高度，叶片倾斜 45 度让光线进来但挡住视线」 &mdash; 升降发 5000，倾斜发 5000</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：自动化 &mdash; 日出日落联动</summary>
    <div class="scenario-content">
      <ol>
        <li>早晨日出时，自动化规则触发 <code>UpOrOpen (0x00)</code> 打开所有窗帘</li>
        <li>下午阳光强烈时，触发 <code>GoToLiftPercentage (0x05)</code> 关到 70%（LiftPercent100thsValue = 7000）</li>
        <li>晚上日落后，触发 <code>DownOrClose (0x01)</code> 完全关闭</li>
        <li>配合光照传感器（IlluminanceMeasurement Cluster），可实现更智能的光线自适应</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 5：异常处理</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>SafetyStatus (0x001A)</code>，监控安全异常</li>
        <li>如果 <code>ObstacleDetected</code>（Bit 5）为 1，说明窗帘运行路径有障碍物，App 应提示用户检查</li>
        <li>如果 <code>MotorJammed</code>（Bit 8）为 1，说明电机堵转，可能需要维修</li>
        <li>如果 <code>ThermalProtection</code>（Bit 4）为 1，电机过热保护中，等待冷却后自动恢复</li>
        <li>检查 <code>Mode (0x0017)</code> 的 CalibrationMode（Bit 1），如果为 1 说明设备正在校准，暂不接受位置命令</li>
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
  'valve-configuration-and-control': {
    title: '阀门控制 Cluster · ValveConfigurationAndControl（0x0081）',
    description: 'Matter ValveConfigurationAndControl Cluster（0x0081）完整参考 — Open/Close 开关命令、开度百分比控制、定时自动关阀、阀门状态枚举、故障位图、事件上报等全部属性与命令定义及枚举值速查。',
    prev: undefined,
    next: undefined,
    content: `<h1>阀门控制 Cluster（ValveConfigurationAndControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0081</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Valve Endpoint</code>（阀门功能端点）
  </p>
  <p>
    ValveConfigurationAndControl 是 Matter 中控制阀门设备的核心 Cluster，
    适用于水阀、燃气阀、灌溉阀等需要「开/关/定时/开度调节」能力的场景。
    它定义了阀门的开关命令、持续时间控制、当前/目标状态、开度百分比、故障检测和事件上报等全部能力。
    与简单的 OnOff 开关不同，阀门 Cluster 内置了定时自动关阀和精确开度控制，
    更适合需要安全保护的流体控制场景。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 驱动的能力差异</div>
    <p>
      ValveConfigurationAndControl 的能力取决于两个 Feature：
      <strong>TimeSync（TS）</strong> 启用基于 UTC 时间戳的自动关阀能力，
      <strong>Level（LVL）</strong> 启用百分比开度控制（0~100%）。
      一个简单的水阀可能只支持全开/全关，而一个灌溉控制阀可能同时支持定时和开度调节。
      开发前先读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持哪些能力，再决定 UI 布局。
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
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件列表</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    ValveConfigurationAndControl Cluster 共有 2 个命令：Open 和 Close。
    Open 命令支持可选的持续时间和目标开度参数，Close 命令无参数直接关阀。
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
          <td>Open</td>
          <td>打开阀门（可指定持续时间和开度）</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Close</td>
          <td>关闭阀门</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Open —— 打开阀门（0x00）</h3>
  <p>
    打开阀门。可以通过可选参数指定开阀持续时间和目标开度。
    如果不传任何参数，阀门按 <code>DefaultOpenDuration</code> 的时间全开。
    如果阀门已经打开，再次发送 Open 命令会更新持续时间和目标开度。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>是否必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OpenDuration</td>
          <td>elapsed-s / null</td>
          <td>可选</td>
          <td>开阀持续时间，单位秒。<code>null</code> 表示使用 DefaultOpenDuration 的值。省略时也使用默认值</td>
        </tr>
        <tr>
          <td>TargetLevel</td>
          <td>percent</td>
          <td>可选（需 LVL）</td>
          <td>目标开度百分比，1~100。省略时全开（100%）。需要 <strong>LVL</strong> Feature</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">安全提示：DefaultOpenDuration</div>
    <p>
      如果 <code>DefaultOpenDuration</code> 为 <code>null</code> 且 Open 命令也未指定 OpenDuration，
      阀门将无限期保持打开状态，直到收到 Close 命令。对于水阀和燃气阀，
      建议始终设置 DefaultOpenDuration 作为安全兜底，防止网络断连后阀门长期开启导致水漫或气泄。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上点击「打开水阀」按钮，发送 Open 命令，阀门打开。
        花园灌溉系统发送 Open(OpenDuration=1800)，阀门开启 30 分钟后自动关闭。
        智能暖通系统发送 Open(TargetLevel=50)，阀门打开到 50% 开度，精确控制热水流量。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">Close —— 关闭阀门（0x01）</h3>
  <p>
    关闭阀门。没有任何参数。执行成功后，<code>TargetState</code> 变为 <code>Closed (0)</code>，
    阀门开始执行关闭动作。如果阀门正在定时开启中，Close 命令会取消定时并立即关阀。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户手动关闭水阀、水浸传感器检测到漏水后自动化规则触发紧急关阀、
        燃气报警器联动关闭燃气阀门时调用。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>ValveConfigurationAndControl Cluster 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 定时参数 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>OpenDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>当前开阀持续时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>DefaultOpenDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>默认开阀持续时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>AutoCloseTime</td>
          <td>epoch-us / null</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>自动关阀的 UTC 时间戳</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>RemainingDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">定时参数</a></td>
          <td>剩余开阀时间（秒）</td>
        </tr>
        <!-- 阀门状态 -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentState</td>
          <td>ValveStateEnum / null</td>
          <td><a href="#group-state">阀门状态</a></td>
          <td>当前阀门状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TargetState</td>
          <td>ValveStateEnum / null</td>
          <td><a href="#group-state">阀门状态</a></td>
          <td>目标阀门状态</td>
        </tr>
        <!-- 开度控制 -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>CurrentLevel</td>
          <td>percent / null</td>
          <td><a href="#group-level">开度控制</a></td>
          <td>当前开度百分比</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>TargetLevel</td>
          <td>percent / null</td>
          <td><a href="#group-level">开度控制</a></td>
          <td>目标开度百分比</td>
        </tr>
        <!-- 故障状态 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ValveFault</td>
          <td>ValveFaultBitmap</td>
          <td><a href="#group-fault">故障状态</a></td>
          <td>阀门故障位图</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 定时参数（0x0000 ~ 0x0003）====== -->
  <h3 id="group-timing">定时参数（0x0000 ~ 0x0003）</h3>
  <p>控制阀门的开启持续时间和自动关闭机制。这是阀门 Cluster 区别于简单 OnOff 开关的关键能力 —— 内置定时保护，防止阀门意外长期开启。</p>

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
          <td>OpenDuration<br/><span class="attr-cn">开阀持续时间</span></td>
          <td>elapsed-s / null</td>
          <td>本次开阀的持续时间，单位秒。由 Open 命令设置。<code>null</code> 表示无限期开启（直到收到 Close 命令）。阀门关闭后此值变为 <code>null</code></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>DefaultOpenDuration<br/><span class="attr-cn">默认开阀时间</span></td>
          <td>elapsed-s / null</td>
          <td>当 Open 命令未指定 OpenDuration 时使用的默认值，单位秒。<strong>可读写</strong>。<code>null</code> 表示无默认时间（Open 不带参数时将无限期开启）。建议设置一个合理的安全值</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>AutoCloseTime<br/><span class="attr-cn">自动关阀时间</span></td>
          <td>epoch-us / null</td>
          <td>阀门将自动关闭的 UTC 时间戳，单位微秒。由设备根据 OpenDuration 和开阀时间自动计算。<code>null</code> 表示无自动关闭计划。<strong>需要 TS Feature</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>RemainingDuration<br/><span class="attr-cn">剩余开阀时间</span></td>
          <td>elapsed-s / null</td>
          <td>距离自动关阀还剩多少秒。设备自动维护，倒计时归零后阀门关闭。<code>null</code> 表示无定时或阀门已关闭</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">定时参数之间的关系</div>
    <p>
      <code>DefaultOpenDuration</code> 是预设值，<code>OpenDuration</code> 是本次实际生效值，
      <code>RemainingDuration</code> 是实时倒计时，<code>AutoCloseTime</code> 是绝对时间点。
      Open 命令不带参数时，<code>OpenDuration</code> = <code>DefaultOpenDuration</code>；
      带参数时，<code>OpenDuration</code> = 命令参数值。
      App 界面通常显示 <code>RemainingDuration</code> 作为倒计时。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 阀门状态（0x0004 ~ 0x0005）====== -->
  <h3 id="group-state">阀门状态（0x0004 ~ 0x0005）</h3>
  <p>描述阀门当前的开关状态和目标状态。阀门动作需要时间（电机驱动），所以 CurrentState 和 TargetState 可能不一致 —— 阀门正在动作时 CurrentState 为 Transitioning。</p>

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
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentState<br/><span class="attr-cn">当前状态</span></td>
          <td>ValveStateEnum / null</td>
          <td>阀门当前的实际状态。Nullable —— <code>null</code> 表示设备无法确定当前状态（如刚上电、无位置传感器）</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>TargetState<br/><span class="attr-cn">目标状态</span></td>
          <td>ValveStateEnum / null</td>
          <td>阀门的目标状态。发送 Open 命令后变为 <code>Open (1)</code>，发送 Close 后变为 <code>Closed (0)</code>。Nullable —— <code>null</code> 表示无待执行的目标</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">状态转换流程</div>
    <p>
      发送 Open 命令后：<code>TargetState</code> 立即变为 <code>Open</code>，<code>CurrentState</code> 变为 <code>Transitioning</code>，
      阀门电机开始动作。到位后 <code>CurrentState</code> 变为 <code>Open</code>。
      Close 命令同理。App 界面应根据 <code>CurrentState</code> 显示实时状态，
      当值为 <code>Transitioning</code> 时可显示加载动画。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 开度控制（0x0006 ~ 0x0007）====== -->
  <h3 id="group-level">开度控制（0x0006 ~ 0x0007）</h3>
  <p>
    控制阀门的精确开度百分比。需要设备支持 <strong>Level（LVL）</strong> Feature。
    不支持 LVL 的阀门只有全开/全关两种状态。
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
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>CurrentLevel<br/><span class="attr-cn">当前开度</span></td>
          <td>percent / null</td>
          <td>阀门当前的实际开度百分比，0~100。<code>0</code> = 全关，<code>100</code> = 全开。Nullable —— <code>null</code> 表示无法确定当前开度。<strong>需要 LVL Feature</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>TargetLevel<br/><span class="attr-cn">目标开度</span></td>
          <td>percent / null</td>
          <td>阀门的目标开度百分比，1~100。由 Open 命令的 TargetLevel 参数设置。Nullable —— <code>null</code> 表示无待执行的目标开度。<strong>需要 LVL Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开度与状态的关系</div>
    <p>
      <code>CurrentLevel = 0</code> 等价于 <code>CurrentState = Closed</code>，
      <code>CurrentLevel > 0</code> 等价于 <code>CurrentState = Open</code>。
      对于支持 LVL 的设备，App 可以用滑块控件让用户精确设置开度，
      Open 命令的 TargetLevel 参数值即对应滑块位置。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 故障状态（0x0008）====== -->
  <h3 id="group-fault">故障状态（0x0008）</h3>
  <p>记录阀门的故障信息。ValveFault 是一个位图属性，多个故障可以同时存在。</p>

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
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ValveFault<br/><span class="attr-cn">阀门故障</span></td>
          <td>ValveFaultBitmap</td>
          <td>阀门故障位图，每个位代表一种故障类型。<code>0</code> = 无故障。详见下方 <a href="#valve-fault-bitmap">ValveFaultBitmap</a> 章节</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举与位图 ====== -->
  <h2 id="enums">枚举与位图</h2>

  <!-- ValveStateEnum -->
  <h3 id="valve-state-enum">ValveStateEnum（阀门状态枚举）</h3>
  <p>用于 <code>CurrentState</code> 和 <code>TargetState</code> 属性，描述阀门的开关状态。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Closed</span>
        <span class="enum-desc">关闭 —— 阀门完全关闭，无流体通过</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Open</span>
        <span class="enum-desc">打开 —— 阀门已打开（全开或部分开启）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Transitioning</span>
        <span class="enum-desc">过渡中 —— 阀门正在执行开启或关闭动作（电机运转中）</span>
      </div>
    </div>
  </div>

  <!-- ValveFaultBitmap -->
  <h3 id="valve-fault-bitmap">ValveFaultBitmap（阀门故障位图）</h3>
  <p>
    <code>ValveFault (0x0008)</code> 属性的位图定义。每个位代表一种故障类型，多个位可以同时置位。
    当任意位从 0 变为 1 时，设备会上报 <code>ValveFault</code> 事件。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">GeneralFault</span>
        <span class="enum-desc">通用故障 —— 未归类的一般性硬件或软件问题</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Blocked</span>
        <span class="enum-desc">阻塞 —— 阀门机械卡住，无法正常开启或关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Leaking</span>
        <span class="enum-desc">泄漏 —— 阀门关闭状态下仍检测到流体通过</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">未连接 —— 阀门执行器与控制器之间通信断开</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ShortCircuit</span>
        <span class="enum-desc">短路 —— 阀门电机或驱动电路发生短路</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">CurrentExceeded</span>
        <span class="enum-desc">过流 —— 阀门电机电流超出安全范围</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">故障位图读取示例</div>
    <p>
      <code>ValveFault = 0x00</code>（十进制 0）= 无故障，一切正常。<br/>
      <code>ValveFault = 0x06</code>（十进制 6）= Bit 1 + Bit 2 = 阀门卡住且有泄漏 —— 需要立即检修。<br/>
      <code>ValveFault = 0x30</code>（十进制 48）= Bit 4 + Bit 5 = 电路短路且过流 —— 可能是电机损坏，需要断电检查。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>ValveConfigurationAndControl Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">TS（TimeSync）</span>
        <span class="enum-desc">时间同步 —— 启用 AutoCloseTime 属性，设备可基于 UTC 时间戳精确计算自动关阀时刻。需要设备接入 Time Synchronization Cluster</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LVL（Level）</span>
        <span class="enum-desc">开度控制 —— 启用 CurrentLevel、TargetLevel 属性和 Open 命令的 TargetLevel 参数，支持 0~100% 精确开度调节</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      一个简单的水阀（开/关）：<code>FeatureMap = 0x00</code>，只支持全开全关和基于秒数的定时。<br/>
      一个灌溉控制阀：<code>FeatureMap = 0x03</code>（TS + LVL），支持精确开度调节和基于 UTC 时间的自动关阀。<br/>
      一个带时间同步的燃气阀：<code>FeatureMap = 0x01</code>（仅 TS），只能全开全关，但支持 UTC 时间戳的精确定时。
    </p>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    ValveConfigurationAndControl Cluster 定义了 2 个事件，分别用于阀门状态变化通知和故障上报。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>优先级</th>
          <th>数据字段</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>ValveStateChanged</td>
          <td class="col-event-info">INFO</td>
          <td>ValveState (ValveStateEnum), ValveLevel (percent)</td>
          <td>阀门状态或开度发生变化时触发</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ValveFault</td>
          <td class="col-event-warning">WARNING</td>
          <td>ValveFault (ValveFaultBitmap)</td>
          <td>阀门故障位图发生变化时触发（新增或清除故障）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">事件订阅建议</div>
    <p>
      <strong>ValveStateChanged</strong> 事件包含变化后的状态和开度值，App 订阅后可实时更新界面，
      无需轮询 CurrentState 和 CurrentLevel 属性。
      <strong>ValveFault</strong> 事件在故障出现或消除时都会触发，携带最新的完整故障位图。
      对于水阀和燃气阀，建议始终订阅 ValveFault 事件并在收到 Leaking（泄漏）故障时立即告警。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个支持 Level（LVL）特性的智能水阀在 75% 开度运行中的 ValveConfigurationAndControl Cluster 读取结果：</p>

  <pre><code>{
  // --- 定时参数 ---
  "0x0000": 1800,            // OpenDuration = 1800 秒（本次开阀 30 分钟）
  "0x0001": 3600,            // DefaultOpenDuration = 3600 秒（默认每次开阀 1 小时）
  "0x0002": null,            // AutoCloseTime = null（未设置自动关阀时间点）
  "0x0003": 1200,            // RemainingDuration = 1200 秒（还剩 20 分钟关阀）

  // --- 阀门状态 ---
  "0x0004": 1,               // CurrentState = Open（当前已打开）
  "0x0005": 1,               // TargetState = Open（目标也是打开）

  // --- 开度控制（LVL Feature）---
  "0x0006": 75,              // CurrentLevel = 75%（当前开度 75%）
  "0x0007": 75,              // TargetLevel = 75%（目标开度 75%）

  // --- 故障状态 ---
  "0x0008": 0                // ValveFault = 0（无故障）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      最简单的阀门可能只有 OpenDuration、DefaultOpenDuration、RemainingDuration、CurrentState、TargetState 和 ValveFault 这几个核心属性。
      CurrentLevel / TargetLevel 需要 LVL Feature，AutoCloseTime 需要 TS Feature。
      读取前先检查 <code>FeatureMap (0xFFFC)</code>，对不支持的属性发起读取会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-irrigation">场景 1：花园灌溉定时浇水</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>写入 <code>DefaultOpenDuration (0x0001) = 1800</code>，预设每次浇水 30 分钟</li>
        <li>自动化规则在早晨 6 点触发，发送 <code>Open (0x00)</code> 命令（不带参数，使用默认时间）</li>
        <li>阀门打开，<code>CurrentState</code> 变为 <code>Open (1)</code>，<code>RemainingDuration</code> 开始从 1800 倒计时</li>
        <li>App 订阅 <code>RemainingDuration (0x0003)</code>，界面显示「还剩 XX 分钟自动关闭」</li>
        <li>30 分钟后阀门自动关闭，<code>CurrentState</code> 变为 <code>Closed (0)</code></li>
        <li>如果需要中途取消浇水，发送 <code>Close (0x01)</code> 命令立即关阀</li>
        <li>订阅 <code>ValveFault</code> 事件，当检测到 <code>Blocked (Bit 1)</code> 时提醒用户清理阀门</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-leak">场景 2：水浸传感器联动紧急关阀</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>水浸传感器（BooleanState Cluster）检测到漏水，<code>StateValue</code> 变为 <code>true</code></li>
        <li>自动化规则触发，向水阀发送 <code>Close (0x01)</code> 命令紧急关阀</li>
        <li>读取 <code>CurrentState (0x0004)</code> 确认阀门已关闭（<code>Closed = 0</code>）</li>
        <li>如果 CurrentState 为 <code>Transitioning (2)</code>，等待几秒后再次确认</li>
        <li>检查 <code>ValveFault (0x0008)</code> 位图中的 <code>Leaking (Bit 2)</code> 位 —— 如果阀门关闭后仍检测到泄漏，说明阀门密封失效，需要人工干预</li>
        <li>向用户推送告警通知：「检测到漏水，已自动关闭水阀。请检查现场。」</li>
        <li>漏水解除后，用户手动发送 <code>Open</code> 命令恢复供水</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-feature {
    color: #60a5fa;
  }

  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .dark .attr-cn {
    color: #9ca3af;
  }

  .col-event-critical {
    color: #dc2626;
    font-weight: 600;
    font-size: 0.8125rem;
  }

  .dark .col-event-critical {
    color: #f87171;
  }

  .col-event-warning {
    color: #d97706;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-event-warning {
    color: #fbbf24;
  }

  .col-event-info {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  .dark .col-event-info {
    color: #60a5fa;
  }
</style>`,
  },
};
