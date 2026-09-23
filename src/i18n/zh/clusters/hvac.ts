import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'thermostat': {
    title: '温控 Cluster · Thermostat（0x0201）',
    description: 'Matter Thermostat Cluster（0x0201）完整参考 — SystemMode/SetpointRaiseLower 等命令、LocalTemperature/OccupiedCoolingSetpoint 等 40+ 属性定义、枚举值速查与真实设备数据示例。',
    prev: { title: '电源（PowerSource）', slug: 'power-source' },
    next: { title: 'Cluster 手册', slug: 'clusters' },
    content: `<h1>温控 Cluster（Thermostat）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0201</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    Thermostat 是 Matter HVAC（暖通空调）设备的核心 Cluster，定义了温度读取、制冷/制热设定点管理、系统模式切换、周计划调度等全部能力。
    所有温控类设备的日常开发都围绕这个 Cluster 展开。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">温度单位陷阱</div>
    <p>
      Thermostat Cluster 中所有温度属性的单位都是 <strong>0.01°C</strong>。例如 <code>LocalTemperature = 2150</code> 表示实际温度 <strong>21.50°C</strong>。
      读写温度属性时务必做好单位换算，否则设定点会偏离预期 100 倍。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature 特性位</div>
    <p>
      Thermostat 的能力由 Feature Map 决定。<code>Bit 0 = HEAT</code>、<code>Bit 1 = COOL</code>、<code>Bit 5 = AUTO</code>、<code>Bit 6 = LTNE</code>（Local Temperature Not Exposed）。
      很多属性有 Feature 门控 —— 例如只有支持 COOL 的设备才有 <code>OccupiedCoolingSetpoint</code>。读取不支持的属性会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">标准示例</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    Thermostat 的命令主要用于调整设定点和管理周计划。与门锁不同，温控命令<strong>不要求 Timed Interaction</strong>（定时交互），可以直接发送。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>Feature 要求</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>SetpointRaiseLower</td>
          <td>升高或降低温度设定点</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SetWeeklySchedule</td>
          <td>设置一周的温度调度计划</td>
          <td class="col-feature">SCH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>GetWeeklySchedule</td>
          <td>查询已设置的周计划</td>
          <td class="col-feature">SCH</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>ClearWeeklySchedule</td>
          <td>清除所有周计划</td>
          <td class="col-feature">SCH</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SetpointRaiseLower 的特殊行为</div>
    <p>
      当设定值超出限制范围时，<code>SetpointRaiseLower</code> 会静默<strong>钳位</strong>（Clamp）到最近的合法值，而不是返回错误。
      这与直接写属性不同 —— 直接给 <code>OccupiedHeatingSetpoint</code> 写入一个超范围值会返回 <code>CONSTRAINT_ERROR</code>。
      这个不对称行为是 Matter 规范有意设计的。
    </p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">SetpointRaiseLower —— 调整设定点（0x00）</h3>
  <p>
    升高或降低温度设定点。这是温控设备最常用的命令 —— 用户在 App 上点击"温度+"或"温度-"按钮时调用。
    根据 <code>Mode</code> 参数，可以只调整制热设定点、只调整制冷设定点、或同时调整两者。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mode</td>
          <td>enum8</td>
          <td>是</td>
          <td>调整目标：<code>0</code> = Heat（制热），<code>1</code> = Cool（制冷），<code>2</code> = Both（两者同时）</td>
        </tr>
        <tr>
          <td>Amount</td>
          <td>int8</td>
          <td>是</td>
          <td>调整量，单位 0.1°C。正值升高、负值降低。例如 <code>10</code> 表示升高 1.0°C</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上点「温度 +1°C」时，发送 <code>SetpointRaiseLower(Mode=2, Amount=10)</code>，同时升高制热和制冷设定点各 1°C。
        如果当前 <code>SystemMode</code> 是 Heat，可以只发 <code>Mode=0</code>。
        超出 <code>MinHeatSetpointLimit</code> / <code>MaxCoolSetpointLimit</code> 范围时会自动钳位，不会报错。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">SetWeeklySchedule —— 设置周计划（0x01）</h3>
  <p>
    为指定的星期几设置温度切换时间表。可以一次设置多天、多个时间点的温度计划。
    需要设备支持 <strong>SCH</strong>（Schedule）Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NumberOfTransitionsForSequence</td>
          <td>uint8</td>
          <td>本次设置包含的时间切换点数量</td>
        </tr>
        <tr>
          <td>DayOfWeekForSequence</td>
          <td>bitmap8</td>
          <td>适用的星期几（位图：Bit 0 = 周日，Bit 1 = 周一 ... Bit 6 = 周六）</td>
        </tr>
        <tr>
          <td>ModeForSequence</td>
          <td>bitmap8</td>
          <td>模式位图：Bit 0 = 包含制热设定点，Bit 1 = 包含制冷设定点</td>
        </tr>
        <tr>
          <td>Transitions</td>
          <td>list</td>
          <td>时间切换点列表。每个包含 TransitionTime（距当天 0:00 的分钟数）和对应的设定点温度</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>
        设置"工作日早上 7:00 升温到 22°C，晚上 22:00 降到 18°C"的计划。
        <code>DayOfWeekForSequence = 0b0111110</code>（周一到周五），Transitions 包含两个切换点。
        计划容量可通过 <code>NumberOfWeeklyTransitions (0x21)</code> 和 <code>NumberOfDailyTransitions (0x22)</code> 查询。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">GetWeeklySchedule —— 查询周计划（0x02）</h3>
  <p>查询已设置的周计划。指定想查询的星期几和模式，设备返回对应的时间切换表。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DaysToReturn</td>
          <td>bitmap8</td>
          <td>要查询的星期几（位图格式同 SetWeeklySchedule）</td>
        </tr>
        <tr>
          <td>ModeToReturn</td>
          <td>bitmap8</td>
          <td>要查询的模式（Bit 0 = 制热，Bit 1 = 制冷）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">ClearWeeklySchedule —— 清除周计划（0x03）</h3>
  <p>清除设备上所有已设置的周计划。无参数，执行后设备恢复为无计划状态。</p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>Thermostat Cluster 的属性按功能分为五组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 温度信息 0x00-0x09 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>LocalTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>本地测量温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>OutdoorTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>室外温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>Occupancy</td>
          <td>bitmap8</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>空间占用状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>AbsMinHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制热设定点绝对最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>AbsMaxHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制热设定点绝对最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>AbsMinCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制冷设定点绝对最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>AbsMaxCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制冷设定点绝对最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>PICoolingDemand</td>
          <td>uint8</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制冷需求百分比（0-100）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>PIHeatingDemand</td>
          <td>uint8</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>制热需求百分比（0-100）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>HVACSystemTypeConfiguration</td>
          <td>bitmap8</td>
          <td><a href="#attr-temp">温度信息</a></td>
          <td>HVAC 系统类型配置</td>
        </tr>
        <!-- 设定点 0x10-0x19 -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>LocalTemperatureCalibration</td>
          <td>int8</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>本地温度校准偏移量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>OccupiedCoolingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>有人时制冷设定温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>OccupiedHeatingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>有人时制热设定温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>UnoccupiedCoolingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>无人时制冷设定温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>UnoccupiedHeatingSetpoint</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>无人时制热设定温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>MinHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>制热设定点用户可调最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>MaxHeatSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>制热设定点用户可调最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>MinCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>制冷设定点用户可调最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>MaxCoolSetpointLimit</td>
          <td>int16s</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>制冷设定点用户可调最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>MinSetpointDeadBand</td>
          <td>int8</td>
          <td><a href="#attr-setpoint">设定点</a></td>
          <td>制热与制冷设定点之间的最小间隔</td>
        </tr>
        <!-- 模式与状态 0x1A-0x29 -->
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>RemoteSensing</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>远程传感器使用标记</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>ControlSequenceOfOperation</td>
          <td>enum8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>控制运行序列</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>SystemMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>系统运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>ThermostatRunningMode</td>
          <td>enum8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>实际运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>StartOfWeek</td>
          <td>enum8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>一周起始日</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>NumberOfWeeklyTransitions</td>
          <td>uint8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>每周最大切换点数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>NumberOfDailyTransitions</td>
          <td>uint8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>每天最大切换点数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x23">
          <td><a href="#attr-0x23"><code>0x23</code></a></td>
          <td>TemperatureSetpointHold</td>
          <td>enum8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>设定点保持开关</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x24">
          <td><a href="#attr-0x24"><code>0x24</code></a></td>
          <td>TemperatureSetpointHoldDuration</td>
          <td>uint16 / null</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>设定点保持持续时间（分钟）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x25">
          <td><a href="#attr-0x25"><code>0x25</code></a></td>
          <td>ThermostatProgrammingOperationMode</td>
          <td>bitmap8</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>编程运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x29">
          <td><a href="#attr-0x29"><code>0x29</code></a></td>
          <td>ThermostatRunningState</td>
          <td>bitmap16</td>
          <td><a href="#attr-mode">模式与状态</a></td>
          <td>当前运行状态位图</td>
        </tr>
        <!-- 设定点变更追踪 0x30-0x3A -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>SetpointChangeSource</td>
          <td>enum8</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>最近一次设定点变更来源</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>SetpointChangeAmount</td>
          <td>int16s / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>最近一次设定点变更量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>SetpointChangeSourceTimestamp</td>
          <td>epoch-s</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>最近一次设定点变更时间戳</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x34">
          <td><a href="#attr-0x34"><code>0x34</code></a></td>
          <td>OccupiedSetback</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>有人时的节能回退温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x35">
          <td><a href="#attr-0x35"><code>0x35</code></a></td>
          <td>OccupiedSetbackMin</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>有人回退最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x36">
          <td><a href="#attr-0x36"><code>0x36</code></a></td>
          <td>OccupiedSetbackMax</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>有人回退最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x37">
          <td><a href="#attr-0x37"><code>0x37</code></a></td>
          <td>UnoccupiedSetback</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>无人时的节能回退温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x38">
          <td><a href="#attr-0x38"><code>0x38</code></a></td>
          <td>UnoccupiedSetbackMin</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>无人回退最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x39">
          <td><a href="#attr-0x39"><code>0x39</code></a></td>
          <td>UnoccupiedSetbackMax</td>
          <td>uint8 / null</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>无人回退最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x3A">
          <td><a href="#attr-0x3A"><code>0x3A</code></a></td>
          <td>EmergencyHeatDelta</td>
          <td>uint8</td>
          <td><a href="#attr-change">变更追踪</a></td>
          <td>紧急制热启动偏差</td>
        </tr>
        <!-- AC 能力 0x40-0x47 -->
        <tr class="clickable-row" data-href="#attr-0x40">
          <td><a href="#attr-0x40"><code>0x40</code></a></td>
          <td>ACType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>空调类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x41">
          <td><a href="#attr-0x41"><code>0x41</code></a></td>
          <td>ACCapacity</td>
          <td>uint16</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>空调制冷/制热容量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x42">
          <td><a href="#attr-0x42"><code>0x42</code></a></td>
          <td>ACRefrigerantType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>制冷剂类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x43">
          <td><a href="#attr-0x43"><code>0x43</code></a></td>
          <td>ACCompressorType</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>压缩机类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x44">
          <td><a href="#attr-0x44"><code>0x44</code></a></td>
          <td>ACErrorCode</td>
          <td>bitmap32</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>空调错误码位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x45">
          <td><a href="#attr-0x45"><code>0x45</code></a></td>
          <td>ACLouverPosition</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>百叶窗/导风板位置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x46">
          <td><a href="#attr-0x46"><code>0x46</code></a></td>
          <td>ACCoilTemperature</td>
          <td>int16s / null</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>盘管温度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x47">
          <td><a href="#attr-0x47"><code>0x47</code></a></td>
          <td>ACCapacityFormat</td>
          <td>enum8</td>
          <td><a href="#attr-ac">AC 能力</a></td>
          <td>容量单位格式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性分组详解 ====== -->

  <!-- 温度信息 0x00-0x09 -->
  <h3 id="attr-temp">温度信息（0x00-0x09）</h3>
  <p>温控设备的基础测量值、绝对限制和系统需求信息。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>LocalTemperature<br/><span class="attr-cn">本地温度</span></td>
          <td>int16s / null</td>
          <td>温控器测量到的当前温度，单位 0.01°C。<code>null</code> 表示温度不可用</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>OutdoorTemperature<br/><span class="attr-cn">室外温度</span></td>
          <td>int16s / null</td>
          <td>室外温度，由外部传感器或远程数据源提供</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>Occupancy<br/><span class="attr-cn">占用状态</span></td>
          <td>bitmap8</td>
          <td>Bit 0 = 1 表示空间有人占用，设备使用 Occupied 设定点；= 0 使用 Unoccupied 设定点</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>AbsMinHeatSetpointLimit<br/><span class="attr-cn">制热绝对最小值</span></td>
          <td>int16s</td>
          <td>设备硬件支持的制热设定点绝对最小值，出厂固定</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>AbsMaxHeatSetpointLimit<br/><span class="attr-cn">制热绝对最大值</span></td>
          <td>int16s</td>
          <td>设备硬件支持的制热设定点绝对最大值，出厂固定</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>AbsMinCoolSetpointLimit<br/><span class="attr-cn">制冷绝对最小值</span></td>
          <td>int16s</td>
          <td>设备硬件支持的制冷设定点绝对最小值</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>AbsMaxCoolSetpointLimit<br/><span class="attr-cn">制冷绝对最大值</span></td>
          <td>int16s</td>
          <td>设备硬件支持的制冷设定点绝对最大值</td>
        </tr>
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>PICoolingDemand<br/><span class="attr-cn">制冷需求</span></td>
          <td>uint8</td>
          <td>当前制冷需求百分比（0-100%），由 PI 算法计算</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>PIHeatingDemand<br/><span class="attr-cn">制热需求</span></td>
          <td>uint8</td>
          <td>当前制热需求百分比（0-100%），由 PI 算法计算</td>
        </tr>
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>HVACSystemTypeConfiguration<br/><span class="attr-cn">HVAC 系统类型</span></td>
          <td>bitmap8</td>
          <td>系统类型位图 —— 制冷系统阶段数、制热系统阶段数、制热类型（燃气/电热）、制热燃料来源</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      <code>LocalTemperature</code> 是 <strong>Nullable</strong> 类型 —— 设备传感器故障或尚未就绪时值为 <code>null</code>。
      如果启用了 LTNE（Local Temperature Not Exposed）Feature，这个属性也会返回 <code>null</code>。
      App 端展示温度时需要处理空值情况。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">绝对限制 vs 用户限制</div>
    <p>
      <code>AbsMin/MaxHeatSetpointLimit</code>（0x03-0x06）是设备<strong>硬件决定</strong>的绝对范围，只读不可改。
      <code>MinHeatSetpointLimit</code>（0x15-0x18）是<strong>用户可调</strong>的范围，必须在绝对限制以内。
      设定点写入校验链：AbsMin &le; UserMin &le; Setpoint &le; UserMax &le; AbsMax。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 设定点 0x10-0x19 -->
  <h3 id="attr-setpoint">设定点（0x10-0x19）</h3>
  <p>温度设定点是温控的核心 —— 设备根据设定点与当前温度的差值来决定制热/制冷动作。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>LocalTemperatureCalibration<br/><span class="attr-cn">温度校准</span></td>
          <td>int8</td>
          <td>本地温度传感器的校准偏移量，单位 0.1°C。例如 <code>-5</code> 表示实际温度比传感器读数低 0.5°C</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>OccupiedCoolingSetpoint<br/><span class="attr-cn">有人制冷设定</span></td>
          <td>int16s</td>
          <td>有人占用时的制冷目标温度。当 LocalTemperature 高于此值时启动制冷</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>OccupiedHeatingSetpoint<br/><span class="attr-cn">有人制热设定</span></td>
          <td>int16s</td>
          <td>有人占用时的制热目标温度。当 LocalTemperature 低于此值时启动制热</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>UnoccupiedCoolingSetpoint<br/><span class="attr-cn">无人制冷设定</span></td>
          <td>int16s</td>
          <td>无人时的制冷目标温度（通常比有人时高，节能）</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>UnoccupiedHeatingSetpoint<br/><span class="attr-cn">无人制热设定</span></td>
          <td>int16s</td>
          <td>无人时的制热目标温度（通常比有人时低，节能）</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>MinHeatSetpointLimit<br/><span class="attr-cn">制热最小限制</span></td>
          <td>int16s</td>
          <td>用户可设定的制热温度下限（可写，但不能低于 AbsMinHeatSetpointLimit）</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>MaxHeatSetpointLimit<br/><span class="attr-cn">制热最大限制</span></td>
          <td>int16s</td>
          <td>用户可设定的制热温度上限</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>MinCoolSetpointLimit<br/><span class="attr-cn">制冷最小限制</span></td>
          <td>int16s</td>
          <td>用户可设定的制冷温度下限</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>MaxCoolSetpointLimit<br/><span class="attr-cn">制冷最大限制</span></td>
          <td>int16s</td>
          <td>用户可设定的制冷温度上限</td>
        </tr>
        <tr id="attr-0x19">
          <td><code>0x19</code></td>
          <td>MinSetpointDeadBand<br/><span class="attr-cn">死区间隔</span></td>
          <td>int8</td>
          <td>制热与制冷设定点之间的最小温差，单位 0.1°C。防止制热和制冷同时工作。例如 <code>25</code> 表示 2.5°C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">设定点限制链</div>
    <p>
      设定点写入时，设备会校验完整的限制链（Matter 规范 4.3.6 节）：<br/>
      <code>AbsMin &le; MinLimit &le; Setpoint &le; MaxLimit &le; AbsMax</code><br/>
      并且在 Auto 模式下：<code>HeatingSetpoint + MinSetpointDeadBand &le; CoolingSetpoint</code>。<br/>
      直接写入超范围值会返回 <code>CONSTRAINT_ERROR</code>；通过 <code>SetpointRaiseLower</code> 则静默钳位。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 模式与状态 0x1A-0x29 -->
  <h3 id="attr-mode">模式与状态（0x1A-0x29）</h3>
  <p>定义温控系统的运行模式、调度能力和当前运行状态。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>RemoteSensing<br/><span class="attr-cn">远程传感标记</span></td>
          <td>bitmap8</td>
          <td>标记哪些温度/占用数据来自远程传感器。Bit 0 = 本地温度, Bit 1 = 室外温度, Bit 2 = 占用状态</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>ControlSequenceOfOperation<br/><span class="attr-cn">控制运行序列</span></td>
          <td>enum8</td>
          <td>设备支持的运行组合方式（仅制冷 / 仅制热 / 冷热兼备 等）。见下方枚举</td>
        </tr>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>SystemMode<br/><span class="attr-cn">系统模式</span></td>
          <td>enum8</td>
          <td>用户设定的系统运行模式。见下方枚举</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>ThermostatRunningMode<br/><span class="attr-cn">实际运行模式</span></td>
          <td>enum8</td>
          <td>系统当前实际的运行模式。仅 AUTO Feature 下可用，值为 Off/Cool/Heat 三选一</td>
        </tr>
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>StartOfWeek<br/><span class="attr-cn">一周起始日</span></td>
          <td>enum8</td>
          <td>周计划的第一天。见下方枚举</td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>NumberOfWeeklyTransitions<br/><span class="attr-cn">每周切换点数</span></td>
          <td>uint8</td>
          <td>设备支持的每周最大时间切换点数量</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>NumberOfDailyTransitions<br/><span class="attr-cn">每天切换点数</span></td>
          <td>uint8</td>
          <td>设备支持的每天最大时间切换点数量</td>
        </tr>
        <tr id="attr-0x23">
          <td><code>0x23</code></td>
          <td>TemperatureSetpointHold<br/><span class="attr-cn">设定点保持</span></td>
          <td>enum8</td>
          <td>是否暂时锁定当前设定点、不跟随计划变化。见下方枚举</td>
        </tr>
        <tr id="attr-0x24">
          <td><code>0x24</code></td>
          <td>TemperatureSetpointHoldDuration<br/><span class="attr-cn">保持持续时间</span></td>
          <td>uint16 / null</td>
          <td>设定点保持的持续时间，单位分钟（0-1440）。<code>null</code> 或 <code>0xFFFF</code> 表示无限期保持</td>
        </tr>
        <tr id="attr-0x25">
          <td><code>0x25</code></td>
          <td>ThermostatProgrammingOperationMode<br/><span class="attr-cn">编程运行模式</span></td>
          <td>bitmap8</td>
          <td>编程模式位图。见下方定义</td>
        </tr>
        <tr id="attr-0x29">
          <td><code>0x29</code></td>
          <td>ThermostatRunningState<br/><span class="attr-cn">运行状态位图</span></td>
          <td>bitmap16</td>
          <td>当前正在运行的子系统（制热/制冷/风扇的各阶段）。见下方位图</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SystemMode 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">关闭，不制热也不制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Auto</span>
        <span class="enum-desc">自动模式，根据温度自动切换制热/制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cool</span>
        <span class="enum-desc">仅制冷模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Heat</span>
        <span class="enum-desc">仅制热模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">EmergencyHeat</span>
        <span class="enum-desc">紧急制热（备用热源，如电加热丝）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Precooling</span>
        <span class="enum-desc">预冷（在低电价时段提前降温）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">FanOnly</span>
        <span class="enum-desc">仅送风，不制热也不制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Dry</span>
        <span class="enum-desc">除湿模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Sleep</span>
        <span class="enum-desc">睡眠模式（低噪音、温和温控）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">注意编号跳跃</div>
    <p>SystemMode 枚举中 <strong>没有值 2</strong>（从 1=Auto 直接跳到 3=Cool）。解析时不要假设连续，直接做 map 映射。</p>
  </div>

  <h4>ControlSequenceOfOperation 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">CoolingOnly</span>
        <span class="enum-desc">仅支持制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CoolingWithReheat</span>
        <span class="enum-desc">制冷 + 再热（防过冷）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HeatingOnly</span>
        <span class="enum-desc">仅支持制热</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">HeatingWithReheat</span>
        <span class="enum-desc">制热 + 再热</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">CoolingAndHeating</span>
        <span class="enum-desc">冷热兼备（四管制）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">CoolingAndHeatingWithReheat</span>
        <span class="enum-desc">冷热兼备 + 再热</span>
      </div>
    </div>
  </div>

  <h4>ThermostatRunningMode 枚举值</h4>
  <p>仅在 AUTO Feature 下可用，表示系统当前实际选择的运行方向：</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">当前不在运行</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Cool</span>
        <span class="enum-desc">当前正在制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Heat</span>
        <span class="enum-desc">当前正在制热</span>
      </div>
    </div>
  </div>

  <h4>ThermostatRunningState 位图</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">HeatStateOn</span>
        <span class="enum-desc">一级制热运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CoolStateOn</span>
        <span class="enum-desc">一级制冷运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">FanStateOn</span>
        <span class="enum-desc">风扇运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">HeatSecondStageStateOn</span>
        <span class="enum-desc">二级制热运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">CoolSecondStageStateOn</span>
        <span class="enum-desc">二级制冷运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">FanSecondStageStateOn</span>
        <span class="enum-desc">二级风扇运行中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">FanThirdStageStateOn</span>
        <span class="enum-desc">三级风扇运行中</span>
      </div>
    </div>
  </div>

  <h4>TemperatureSetpointHold 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">未保持，设定点跟随计划变化</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">保持中，设定点锁定在当前值不受计划影响</span>
      </div>
    </div>
  </div>

  <h4>ThermostatProgrammingOperationMode 位图</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">ScheduleActive</span>
        <span class="enum-desc">1 = 按计划调度运行，0 = 按手动设定点运行</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AutoRecovery</span>
        <span class="enum-desc">1 = 启用自动恢复（提前启动以准时达到目标温度）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Economy</span>
        <span class="enum-desc">1 = 节能模式（Energy Star 兼容运行）</span>
      </div>
    </div>
  </div>

  <h4>StartOfWeek 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Sunday</span>
        <span class="enum-desc">周日</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Monday</span>
        <span class="enum-desc">周一</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Tuesday</span>
        <span class="enum-desc">周二</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Wednesday</span>
        <span class="enum-desc">周三</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Thursday</span>
        <span class="enum-desc">周四</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Friday</span>
        <span class="enum-desc">周五</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Saturday</span>
        <span class="enum-desc">周六</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SystemMode vs ThermostatRunningMode vs ThermostatRunningState</div>
    <p>
      三个容易混淆的属性：<br/>
      <strong>SystemMode</strong>（0x1C）= 用户设定的目标模式，可读可写（如"自动"）<br/>
      <strong>ThermostatRunningMode</strong>（0x1E）= Auto 模式下设备实际选择的方向（只读，Off/Cool/Heat 三选一）<br/>
      <strong>ThermostatRunningState</strong>（0x29）= 当前各子系统（制热/制冷/风扇）的实时开关状态（只读位图）
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- 变更追踪与节能 0x30-0x3A -->
  <h3 id="attr-change">变更追踪与节能（0x30-0x3A）</h3>
  <p>追踪设定点的变更来源和历史，以及节能回退（Setback）配置。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>SetpointChangeSource<br/><span class="attr-cn">变更来源</span></td>
          <td>enum8</td>
          <td>最近一次设定点变更的来源。见下方枚举</td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>SetpointChangeAmount<br/><span class="attr-cn">变更量</span></td>
          <td>int16s / null</td>
          <td>最近一次设定点变更的幅度，单位 0.01°C。<code>null</code> 表示无变更记录</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>SetpointChangeSourceTimestamp<br/><span class="attr-cn">变更时间戳</span></td>
          <td>epoch-s</td>
          <td>最近一次设定点变更的 UTC 时间戳</td>
        </tr>
        <tr id="attr-0x34">
          <td><code>0x34</code></td>
          <td>OccupiedSetback<br/><span class="attr-cn">有人节能回退</span></td>
          <td>uint8 / null</td>
          <td>有人时的节能温度回退量，单位 0.1°C。用于在占用状态下适度降低能耗</td>
        </tr>
        <tr id="attr-0x35">
          <td><code>0x35</code></td>
          <td>OccupiedSetbackMin<br/><span class="attr-cn">有人回退最小值</span></td>
          <td>uint8 / null</td>
          <td>OccupiedSetback 的允许最小值</td>
        </tr>
        <tr id="attr-0x36">
          <td><code>0x36</code></td>
          <td>OccupiedSetbackMax<br/><span class="attr-cn">有人回退最大值</span></td>
          <td>uint8 / null</td>
          <td>OccupiedSetback 的允许最大值</td>
        </tr>
        <tr id="attr-0x37">
          <td><code>0x37</code></td>
          <td>UnoccupiedSetback<br/><span class="attr-cn">无人节能回退</span></td>
          <td>uint8 / null</td>
          <td>无人时的节能温度回退量，单位 0.1°C。通常大于有人回退</td>
        </tr>
        <tr id="attr-0x38">
          <td><code>0x38</code></td>
          <td>UnoccupiedSetbackMin<br/><span class="attr-cn">无人回退最小值</span></td>
          <td>uint8 / null</td>
          <td>UnoccupiedSetback 的允许最小值</td>
        </tr>
        <tr id="attr-0x39">
          <td><code>0x39</code></td>
          <td>UnoccupiedSetbackMax<br/><span class="attr-cn">无人回退最大值</span></td>
          <td>uint8 / null</td>
          <td>UnoccupiedSetback 的允许最大值</td>
        </tr>
        <tr id="attr-0x3A">
          <td><code>0x3A</code></td>
          <td>EmergencyHeatDelta<br/><span class="attr-cn">紧急制热偏差</span></td>
          <td>uint8</td>
          <td>触发紧急制热的温度偏差阈值，单位 0.1°C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>SetpointChangeSource 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Manual</span>
        <span class="enum-desc">用户手动调整（通过面板或 App）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Schedule</span>
        <span class="enum-desc">由周计划/日计划自动触发</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">External</span>
        <span class="enum-desc">由外部系统（如家庭自动化平台）触发</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- AC 能力 0x40-0x47 -->
  <h3 id="attr-ac">AC 能力（0x40-0x47）</h3>
  <p>空调设备的硬件能力和运行参数。这组属性主要用于分体空调（Mini Split AC）设备。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x40">
          <td><code>0x40</code></td>
          <td>ACType<br/><span class="attr-cn">空调类型</span></td>
          <td>enum8</td>
          <td>空调的类型和驱动方式。见下方枚举</td>
        </tr>
        <tr id="attr-0x41">
          <td><code>0x41</code></td>
          <td>ACCapacity<br/><span class="attr-cn">空调容量</span></td>
          <td>uint16</td>
          <td>制冷/制热容量，单位由 ACCapacityFormat 决定（通常为 BTU/h）</td>
        </tr>
        <tr id="attr-0x42">
          <td><code>0x42</code></td>
          <td>ACRefrigerantType<br/><span class="attr-cn">制冷剂类型</span></td>
          <td>enum8</td>
          <td>使用的制冷剂种类。见下方枚举</td>
        </tr>
        <tr id="attr-0x43">
          <td><code>0x43</code></td>
          <td>ACCompressorType<br/><span class="attr-cn">压缩机类型</span></td>
          <td>enum8</td>
          <td>压缩机的温度等级。见下方枚举</td>
        </tr>
        <tr id="attr-0x44">
          <td><code>0x44</code></td>
          <td>ACErrorCode<br/><span class="attr-cn">空调错误码</span></td>
          <td>bitmap32</td>
          <td>空调故障状态位图 —— Bit 0: 压缩机故障, Bit 1: 室温传感器故障, Bit 2: 室外温度传感器故障, Bit 3: 盘管传感器故障, Bit 4: 风扇故障</td>
        </tr>
        <tr id="attr-0x45">
          <td><code>0x45</code></td>
          <td>ACLouverPosition<br/><span class="attr-cn">导风板位置</span></td>
          <td>enum8</td>
          <td>百叶窗/导风板的开合位置。见下方枚举</td>
        </tr>
        <tr id="attr-0x46">
          <td><code>0x46</code></td>
          <td>ACCoilTemperature<br/><span class="attr-cn">盘管温度</span></td>
          <td>int16s / null</td>
          <td>蒸发器/冷凝器盘管的实时温度，单位 0.01°C</td>
        </tr>
        <tr id="attr-0x47">
          <td><code>0x47</code></td>
          <td>ACCapacityFormat<br/><span class="attr-cn">容量格式</span></td>
          <td>enum8</td>
          <td>ACCapacity 的单位格式。<code>0</code> = BTU/h</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ACType 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知类型</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CoolingFixedSpeed</span>
        <span class="enum-desc">定频制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">HeatPumpFixedSpeed</span>
        <span class="enum-desc">定频热泵</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CoolingInverter</span>
        <span class="enum-desc">变频制冷</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HeatPumpInverter</span>
        <span class="enum-desc">变频热泵</span>
      </div>
    </div>
  </div>

  <h4>ACRefrigerantType 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">R22</span>
        <span class="enum-desc">R22（已淘汰的 HCFC）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">R410a</span>
        <span class="enum-desc">R410a（主流 HFC）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">R407c</span>
        <span class="enum-desc">R407c（HFC 替代品）</span>
      </div>
    </div>
  </div>

  <h4>ACCompressorType 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">T1</span>
        <span class="enum-desc">最高室外温度 43°C</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">T2</span>
        <span class="enum-desc">最高室外温度 35°C</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">T3</span>
        <span class="enum-desc">最高室外温度 52°C（热带地区）</span>
      </div>
    </div>
  </div>

  <h4>ACLouverPosition 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">FullyClosed</span>
        <span class="enum-desc">完全关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">FullyOpen</span>
        <span class="enum-desc">完全打开</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">QuarterOpen</span>
        <span class="enum-desc">开启 1/4</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HalfOpen</span>
        <span class="enum-desc">开启 1/2</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ThreeQuartersOpen</span>
        <span class="enum-desc">开启 3/4</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 标准示例 ====== -->
  <h2 id="standard-example">标准示例</h2>
  <p>以下是 Matter 温控器的典型属性数据示例（JSON 格式），逐字段标注含义：</p>

  <pre><code>{
  // --- 温度信息 ---
  "0x00": 2150,          // LocalTemperature = 2150 → 实际 21.50°C
  "0x01": 3200,          // OutdoorTemperature = 3200 → 实际 32.00°C
  "0x02": 1,             // Occupancy = 1（有人占用）

  // --- 设定点 ---
  "0x11": 2400,          // OccupiedCoolingSetpoint = 2400 → 24.00°C
  "0x12": 2000,          // OccupiedHeatingSetpoint = 2000 → 20.00°C
  "0x15": 700,           // MinHeatSetpointLimit = 700 → 7.00°C
  "0x16": 3000,          // MaxHeatSetpointLimit = 3000 → 30.00°C
  "0x17": 1600,          // MinCoolSetpointLimit = 1600 → 16.00°C
  "0x18": 3200,          // MaxCoolSetpointLimit = 3200 → 32.00°C
  "0x19": 25,            // MinSetpointDeadBand = 25 → 2.5°C

  // --- 模式与状态 ---
  "0x1B": 4,             // ControlSequenceOfOperation = CoolingAndHeating
  "0x1C": 1,             // SystemMode = Auto
  "0x1E": 3,             // ThermostatRunningMode = Cool
  "0x29": 0x0006,        // ThermostatRunningState = CoolStateOn + FanStateOn

  // --- AC 能力 ---
  "0x40": 3,             // ACType = CoolingAndInverter
  "0x41": 12000,         // ACCapacity = 12000（BTU/h）
  "0x42": 2,             // ACRefrigerantType = R410a
  "0x45": 4              // ACLouverPosition = HalfOpen
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      所有温度属性的值都是 0.01°C 为单位的整数。将设备返回的 <code>2150</code> 显示给用户时，需要除以 100 得到 <code>21.50°C</code>。
      <code>ThermostatRunningState = 0x0006</code> 表示 Bit 1（CoolStateOn）和 Bit 2（FanStateOn）同时为 1，即制冷和风扇都在运行。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：读取当前温度和系统状态</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>LocalTemperature (0x00)</code> —— 注意处理 <code>null</code> 值</li>
        <li>读取 <code>SystemMode (0x1C)</code> 获取当前模式（Off/Auto/Cool/Heat 等）</li>
        <li>读取 <code>ThermostatRunningState (0x29)</code> 判断哪些子系统正在运行</li>
        <li>展示时做好单位换算 —— 所有温度值除以 100 才是实际摄氏度</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：调整温度设定点</summary>
    <div class="scenario-content">
      <ol>
        <li>先读取 <code>MinHeatSetpointLimit (0x15)</code> 到 <code>MaxCoolSetpointLimit (0x18)</code> 确定可调范围</li>
        <li>使用 <code>SetpointRaiseLower</code> 命令逐步调整，或直接写入 <code>OccupiedCoolingSetpoint (0x11)</code> / <code>OccupiedHeatingSetpoint (0x12)</code></li>
        <li>Auto 模式下注意 <code>MinSetpointDeadBand (0x19)</code> 约束 —— 制热和制冷设定点之间必须保持足够间距</li>
        <li>订阅设定点属性的变化，确认修改生效</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：切换系统模式</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>ControlSequenceOfOperation (0x1B)</code> 确定设备支持哪些模式组合</li>
        <li>仅制冷设备（值 0-1）不要显示 Heat 选项；仅制热设备（值 2-3）不要显示 Cool 选项</li>
        <li>写入 <code>SystemMode (0x1C)</code> 切换模式</li>
        <li>切换后读取 <code>ThermostatRunningMode (0x1E)</code>（Auto 模式下）确认设备实际运行方向</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 4：设置周计划</summary>
    <div class="scenario-content">
      <ol>
        <li>先确认设备支持 SCH Feature（检查 Feature Map）</li>
        <li>读取 <code>NumberOfWeeklyTransitions (0x21)</code> 和 <code>NumberOfDailyTransitions (0x22)</code> 了解容量限制</li>
        <li>读取 <code>StartOfWeek (0x20)</code> 确定一周起始日</li>
        <li>发送 <code>SetWeeklySchedule (0x01)</code> 设置计划</li>
        <li>可通过 <code>GetWeeklySchedule (0x02)</code> 回读验证</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 5：App 首页展示温控卡片</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>LocalTemperature (0x00)</code> + <code>SystemMode (0x1C)</code> + <code>ThermostatRunningState (0x29)</code></li>
        <li>展示当前温度、目标温度（根据 SystemMode 选取对应设定点）</li>
        <li>用 ThermostatRunningState 位图显示运行动画 —— 制热中 / 制冷中 / 风扇运转中</li>
        <li>配合 PowerSource Cluster 显示电池电量（电池供电的温控器）</li>
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
</style>`,
  },
  'thermostat-ui-configuration': {
    title: '温控器界面配置 Cluster · ThermostatUserInterfaceConfiguration（0x0204）',
    description: 'Matter ThermostatUserInterfaceConfiguration Cluster（0x0204）完整参考 — TemperatureDisplayMode 温度显示单位、KeypadLockout 按键锁定级别、ScheduleProgrammingVisibility 日程可见性，温控器物理面板行为配置。',
    prev: { title: '温控（Thermostat）', slug: 'thermostat' },
    next: undefined,
    content: `<h1>温控器界面配置 Cluster（Thermostat User Interface Configuration）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0204</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 与 Thermostat（0x0201）同一 Endpoint，通常在 <code>Endpoint 1</code>
  </p>
  <p>
    ThermostatUserInterfaceConfiguration 用于配置温控器<strong>物理面板</strong>的显示和操作行为 ——
    面板上温度用摄氏还是华氏显示、按键是否锁定、日程编排功能是否可见。
    这是一个纯配置型 Cluster，<strong>只有 3 个属性、没有命令</strong>，全部通过 Write 操作完成配置。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 Thermostat Cluster 的关系</div>
    <p>
      <a href="../thermostat/">Thermostat（0x0201）</a> 负责温控的核心逻辑 —— 温度读取、设定点、运行模式、命令控制。
      ThermostatUserInterfaceConfiguration（0x0204）则只管<strong>用户界面</strong> —— 面板显示什么、用户能操作什么。
      两者在同一个 Endpoint 上共存，各司其职。
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">与 Unit Localization 的区别</div>
    <p>
      <a href="../unit-localization/">Unit Localization（0x002D）</a> 在 Endpoint 0 上，控制的是<strong>全设备的温度显示偏好</strong>。
      而这里的 TemperatureDisplayMode 控制的是<strong>温控器自身面板的温度显示</strong>。
      两者可以独立设置，但通常建议保持一致以免造成用户困惑。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">实际场景</a>
  </nav>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    ThermostatUserInterfaceConfiguration 共有 3 个属性，全部可读写。
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
          <th>读写</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>TemperatureDisplayMode</td>
          <td>enum8</td>
          <td>读写</td>
          <td>面板温度显示单位（摄氏 / 华氏）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>KeypadLockout</td>
          <td>enum8</td>
          <td>读写</td>
          <td>面板按键锁定级别（无锁定 / 1~5 级）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ScheduleProgrammingVisibility</td>
          <td>enum8</td>
          <td>读写</td>
          <td>日程编排功能是否在面板上可见</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== TemperatureDisplayMode ====== -->
  <h3 id="attr-0x00">TemperatureDisplayMode（温度显示模式）</h3>
  <p>
    控制温控器物理面板上温度的显示单位。写入后，面板上的温度数字会立即按新单位显示。
    这个属性<strong>不影响</strong> Thermostat Cluster 通过 Matter 协议上报的温度值 ——
    协议传输的温度始终以 0.01°C 为单位。
  </p>

  <h4>TemperatureDisplayModeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Celsius</span>
        <span class="enum-desc">摄氏度（°C）—— 默认值，全球大多数地区使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Fahrenheit</span>
        <span class="enum-desc">华氏度（°F）—— 美国等地区使用</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== KeypadLockout ====== -->
  <h3 id="attr-0x01">KeypadLockout（按键锁定）</h3>
  <p>
    控制温控器面板上的按键锁定级别。锁定后，用户无法通过物理按键修改特定的设置项，
    只能通过 Matter 协议（App / 自动化）远程修改。这在商业和公共场所非常有用 —— 防止人为随意调温。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">锁定级别说明</div>
    <p>
      Matter 规范定义了 5 个锁定级别，但<strong>每个级别具体锁定哪些功能由厂商自行决定</strong>。
      规范只要求级别越高、锁定的范围越大。Level 5 锁定全部本地操作。
      下方的功能限制描述是典型实现参考，实际以设备厂商文档为准。
    </p>
  </div>

  <h4>KeypadLockoutEnum 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoLockout</span>
        <span class="enum-desc">无锁定 —— 面板按键全部可用（默认值）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LockoutLevel1</span>
        <span class="enum-desc">一级锁定 —— 通常锁定日程编排功能</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">LockoutLevel2</span>
        <span class="enum-desc">二级锁定 —— 通常额外锁定模式切换（制热/制冷/自动）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">LockoutLevel3</span>
        <span class="enum-desc">三级锁定 —— 通常额外锁定风速调节</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">LockoutLevel4</span>
        <span class="enum-desc">四级锁定 —— 通常额外锁定温度设定点调节</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">LockoutLevel5</span>
        <span class="enum-desc">五级锁定 —— 锁定全部本地操作，面板只能查看不能修改</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">锁定 ≠ 禁用</div>
    <p>
      按键锁定只是阻止通过<strong>物理面板</strong>修改设置，不影响通过 Matter 协议的远程操作。
      即使 KeypadLockout = Level5，App 和自动化规则依然可以正常调节温度、切换模式。
      这正是这个属性的核心用途 —— 把操作权集中在远程管理端。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== ScheduleProgrammingVisibility ====== -->
  <h3 id="attr-0x02">ScheduleProgrammingVisibility（日程编排可见性）</h3>
  <p>
    控制温控器面板上是否显示日程编排（Schedule Programming）功能入口。
    隐藏后，用户在面板上看不到日程相关的菜单或按钮，只能通过 App 管理日程。
  </p>

  <h4>ScheduleProgrammingVisibilityEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">ScheduleProgrammingPermitted</span>
        <span class="enum-desc">日程可见 —— 用户可以在面板上查看和编辑日程（默认值）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ScheduleProgrammingDenied</span>
        <span class="enum-desc">日程隐藏 —— 面板上不显示日程功能，只能通过 App 管理</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    ThermostatUserInterfaceConfiguration <strong>没有定义任何命令</strong>。
    所有配置通过直接 Write 属性完成。这在 Matter 中是常见的模式 ——
    对于纯配置类的 Cluster，直接读写属性比定义专用命令更简洁。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">怎么配置</div>
    <p>
      想切换温度显示单位？直接对 <code>TemperatureDisplayMode</code> 属性发一个 Write 请求。
      想锁定面板？写入 <code>KeypadLockout</code> 即可。不需要 Timed Interaction。
    </p>
  </div>

  <p>Write 请求示例 —— 切换到华氏度显示：</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0204",
      "attributeId": "0x00"           // TemperatureDisplayMode
    },
    "attributeValue": 1               // Fahrenheit（华氏度）
  }]
}</code></pre>

  <p>Write 请求示例 —— 设置按键一级锁定：</p>
  <pre><code>{
  "writeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0204",
      "attributeId": "0x01"           // KeypadLockout
    },
    "attributeValue": 1               // LockoutLevel1（锁定一级）
  }]
}</code></pre>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一台温控器 Endpoint 1 上的 ThermostatUserInterfaceConfiguration 属性：</p>
  <pre><code>{
  // --- 显示配置 ---
  "0x00": 0,             // TemperatureDisplayMode = Celsius（摄氏度显示）
  "0x01": 0,             // KeypadLockout = NoLockout（按键无锁定）
  "0x02": 0              // ScheduleProgrammingVisibility = ScheduleProgrammingPermitted（日程可见）
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">属性数量</div>
    <p>
      这个 Cluster 没有 Feature Map 控制属性可见性 —— 3 个属性始终全部暴露。
      如果读取某个属性返回 <code>UNSUPPORTED_ATTRIBUTE</code>，说明设备没有实现这个可选属性
      （ScheduleProgrammingVisibility 在 Matter 规范中是可选的）。
    </p>
  </div>

  <!-- ====== 实际场景 ====== -->
  <h2 id="scenarios">实际场景</h2>

  <h3 id="scenario-hotel">场景一：酒店客房温控器 —— 锁定面板防止乱调</h3>
  <details class="scenario">
    <summary>展开场景</summary>
    <div class="scenario-content">
      <p>
        一家酒店使用 Matter 温控器管理客房空调。为了防止客人随意修改空调模式和日程，
        物业管理系统在每台温控器上做了如下配置：
      </p>
      <ol>
        <li>写入 <code>KeypadLockout = 4</code>（LockoutLevel4）—— 客人只能看到温度，不能通过面板调温度和切换模式</li>
        <li>写入 <code>ScheduleProgrammingVisibility = 1</code>（ScheduleProgrammingDenied）—— 隐藏日程功能</li>
        <li>写入 <code>TemperatureDisplayMode = 0</code>（Celsius）—— 统一显示摄氏度</li>
      </ol>
      <p>
        客人只能在面板上看到当前温度。所有温度调节通过客房 App 完成，
        App 可以限制调节范围（比如只允许 20~26°C），避免客人把空调开到极端温度。
        物业保洁时通过管理系统远程统一设置到节能温度。
      </p>
    </div>
  </details>

  <h3 id="scenario-region">场景二：出口到不同地区 —— 配网时自动设置显示单位</h3>
  <details class="scenario">
    <summary>展开场景</summary>
    <div class="scenario-content">
      <p>
        一款面向全球市场的 Matter 温控器，出厂默认显示摄氏度。
        App 在配网完成后，根据用户手机的地区设置自动配置温度显示：
      </p>
      <ol>
        <li>读取手机 Locale：如果是 <code>en_US</code>（美国）或 <code>en_LR</code>（利比里亚）等，温度偏好为华氏度</li>
        <li>向 Endpoint 1 写入 <code>TemperatureDisplayMode = 1</code>（Fahrenheit）</li>
        <li>同时向 Endpoint 0 的 <a href="../unit-localization/">Unit Localization（0x002D）</a> 写入 <code>TemperatureUnit = 0</code>（Fahrenheit），保持全设备显示一致</li>
        <li>App 界面也同步以 °F 显示温度</li>
      </ol>
      <p>
        这样用户拿到设备后，面板、App 看到的都是自己熟悉的温度单位，无需手动切换。
        如果用户后续想改，在 App 设置中选择另一个单位即可，App 同时更新两个 Cluster 的属性。
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
  .scenario-content {
    padding: 0.75rem 1rem;
  }
</style>`,
  },
  'fan-control': {
    title: '风扇 Cluster · FanControl（0x0202）',
    description: 'Matter FanControl Cluster（0x0202）完整参考 — FanMode/Step 命令、百分比与多档位风速控制、摇头/风感/送风方向等全部属性与枚举值速查及真实设备数据示例。',
    prev: { title: '温控（Thermostat）', slug: 'thermostat' },
    next: undefined,
    content: `<h1>风扇 Cluster（FanControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0202</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    FanControl 是 Matter 中控制风扇设备的核心 Cluster，适用于 HVAC 系统风扇、吊扇、独立风扇等场景。
    它定义了风扇模式切换、转速控制、摇头、风感模式、送风方向等全部能力。
    风扇类设备的日常开发基本都围绕这个 Cluster 展开。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 驱动的能力差异</div>
    <p>
      FanControl 的能力差异很大 —— 一个简单的 HVAC 风扇可能只支持百分比调速，
      而一台高端吊扇可能同时支持多档位、自动模式、摇头、自然风和正反转。
      开发前先读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持哪些 Feature，再决定 UI 布局。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>FanControl Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些能力。Feature 直接决定了哪些属性和命令可用：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SPD（MultiSpeed）</span>
        <span class="enum-desc">多档位 —— 支持 SpeedMax / SpeedSetting / SpeedCurrent 三个档位属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AUT（Auto）</span>
        <span class="enum-desc">自动模式 —— FanMode 可选 Auto，设备自行调节转速</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">RCK（Rocking）</span>
        <span class="enum-desc">摇头 —— 支持 RockSupport / RockSetting，控制风扇摆动方向</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">WND（Wind）</span>
        <span class="enum-desc">风感模式 —— 支持 WindSupport / WindSetting，提供睡眠风、自然风等模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">STEP（Step）</span>
        <span class="enum-desc">步进调速 —— 支持 Step 命令，逐级增减风速</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AIRDIR（AirDirection）</span>
        <span class="enum-desc">送风方向 —— 支持 AirflowDirection 属性，控制正转/反转</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      一台普通 HVAC 风扇：<code>FeatureMap = 0x00</code>（无额外 Feature，仅百分比调速）。<br/>
      一台高端吊扇：<code>FeatureMap = 0x3F</code>（全部 6 个 Feature），支持多档位、自动模式、摇头、风感、步进和正反转。<br/>
      独立落地扇：<code>FeatureMap = 0x0F</code>（SPD + AUT + RCK + WND），有档位、自动、摇头和风感，但不支持步进和反转。
    </p>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    FanControl Cluster 只有一个命令 —— <code>Step</code>，用于步进式调整风速。
    大部分风扇控制通过直接写属性完成（如写入 FanMode、PercentSetting、SpeedSetting 等），
    Step 命令提供了一种不需要知道当前状态就能增减风速的便捷方式。
    点击下方表格中的命令 ID 可跳转到详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>说明</th>
          <th>Feature 要求</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Step</td>
          <td>步进调速（增加或减少一档）</td>
          <td class="col-feature">STEP</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Step —— 步进调速（0x00）</h3>
  <p>
    向风扇发送步进调速指令，逐级增大或减小风速。
    具体增减的幅度由设备自行决定（通常对应一个百分比或一个档位）。
    如果当前风速已到最大或最小值，再向同方向调整时设备会忽略（不报错）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Direction</td>
          <td>StepDirectionEnum</td>
          <td>是</td>
          <td>步进方向（见下方枚举）</td>
        </tr>
        <tr>
          <td>Wrap</td>
          <td>bool</td>
          <td>否</td>
          <td>是否循环。<code>true</code> 表示到最大后再 Increase 会回到最小值（反之亦然）</td>
        </tr>
        <tr>
          <td>LowestOff</td>
          <td>bool</td>
          <td>否</td>
          <td>循环时最低档是否为关闭。<code>true</code> 表示减到最低后再减一步会关闭风扇</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>StepDirection 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Increase</span>
        <span class="enum-desc">增大风速（升一档）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Decrease</span>
        <span class="enum-desc">减小风速（降一档）</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>使用场景与参数</summary>
    <div class="scenario-content">
      <p>
        适合物理遥控器的「风速+」「风速-」按键 —— 每按一次发送一个 Step 命令，不需要事先读取当前速度。
        如果 <code>Wrap = true</code>，用户可以不断按「风速+」循环切换档位（如：低 → 中 → 高 → 关 → 低 ...）。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>FanControl Cluster 的属性按功能分为五组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 风扇模式 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>FanMode</td>
          <td>enum8</td>
          <td><a href="#group-mode">风扇模式</a></td>
          <td>当前工作模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>FanModeSequence</td>
          <td>enum8</td>
          <td><a href="#group-mode">风扇模式</a></td>
          <td>支持的模式序列</td>
        </tr>
        <!-- 百分比控制 -->
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>PercentSetting</td>
          <td>uint8 / null</td>
          <td><a href="#group-percent">百分比控制</a></td>
          <td>目标风速百分比</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PercentCurrent</td>
          <td>uint8</td>
          <td><a href="#group-percent">百分比控制</a></td>
          <td>实际风速百分比</td>
        </tr>
        <!-- 多档位控制 -->
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>SpeedMax</td>
          <td>uint8</td>
          <td><a href="#group-speed">多档位控制</a></td>
          <td>最大档位数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>SpeedSetting</td>
          <td>uint8 / null</td>
          <td><a href="#group-speed">多档位控制</a></td>
          <td>目标档位</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>SpeedCurrent</td>
          <td>uint8</td>
          <td><a href="#group-speed">多档位控制</a></td>
          <td>实际档位</td>
        </tr>
        <!-- 摇头功能 -->
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>RockSupport</td>
          <td>bitmap8</td>
          <td><a href="#group-rock">摇头功能</a></td>
          <td>支持的摇头方向</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>RockSetting</td>
          <td>bitmap8</td>
          <td><a href="#group-rock">摇头功能</a></td>
          <td>当前摇头设置</td>
        </tr>
        <!-- 风感模式 -->
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>WindSupport</td>
          <td>bitmap8</td>
          <td><a href="#group-wind">风感模式</a></td>
          <td>支持的风感模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>WindSetting</td>
          <td>bitmap8</td>
          <td><a href="#group-wind">风感模式</a></td>
          <td>当前风感设置</td>
        </tr>
        <!-- 送风方向 -->
        <tr class="clickable-row" data-href="#attr-0x0B">
          <td><a href="#attr-0x0B"><code>0x0B</code></a></td>
          <td>AirflowDirection</td>
          <td>enum8</td>
          <td><a href="#group-airdir">送风方向</a></td>
          <td>送风方向（正转/反转）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 风扇模式（0x00, 0x01）====== -->
  <h3 id="group-mode">风扇模式（0x00, 0x01）</h3>
  <p>控制风扇的工作模式和模式切换范围。FanMode 是最核心的控制属性 —— 大部分 App 界面上的模式按钮直接对应它。</p>

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
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>FanMode<br/><span class="attr-cn">风扇模式</span></td>
          <td>enum8</td>
          <td>风扇当前的工作模式。写入新值可切换模式。<code>Auto</code> 和 <code>Smart</code> 模式下设备自行调节转速。见下方枚举</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>FanModeSequence<br/><span class="attr-cn">模式序列</span></td>
          <td>enum8</td>
          <td>声明设备支持的模式组合。决定 FanMode 可写入哪些值 —— 如果序列里没有 Auto，就不能写 Auto。见下方枚举</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>FanMode 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Off</span>
        <span class="enum-desc">关闭，风扇停转</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">低速挡</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">中速挡</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">高速挡</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">On</span>
        <span class="enum-desc">开启（具体速度由设备决定，通常恢复上次的速度）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Auto</span>
        <span class="enum-desc">自动模式 —— 设备根据环境自动调节转速。需要 AUT Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Smart</span>
        <span class="enum-desc">智能模式 —— 已废弃，等同于 Auto。兼容旧设备保留</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">FanMode 写入与 PercentSetting / SpeedSetting 的联动</div>
    <p>
      写入 <code>FanMode</code> 时，设备会自动更新 <code>PercentSetting</code> 和 <code>SpeedSetting</code>（如果支持 SPD Feature）。
      例如写入 <code>FanMode = High</code> 后，<code>PercentSetting</code> 可能自动变为 <code>100</code>。
      反过来，直接写 <code>PercentSetting</code> 或 <code>SpeedSetting</code> 也可能导致 <code>FanMode</code> 联动变化。
      读取状态时以 <code>PercentCurrent</code> / <code>SpeedCurrent</code> 为准，不要依赖 Setting 值。
    </p>
  </div>

  <h4>FanModeSequence 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OffLowMedHigh</span>
        <span class="enum-desc">Off / Low / Medium / High</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">OffLowHigh</span>
        <span class="enum-desc">Off / Low / High（无中速挡）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">OffLowMedHighAuto</span>
        <span class="enum-desc">Off / Low / Medium / High / Auto</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OffLowHighAuto</span>
        <span class="enum-desc">Off / Low / High / Auto（无中速挡）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OffHighAuto</span>
        <span class="enum-desc">Off / High / Auto（仅两挡 + 自动）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">OffHigh</span>
        <span class="enum-desc">Off / High（仅开关，无中间挡位）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 百分比控制（0x02, 0x03）====== -->
  <h3 id="group-percent">百分比控制（0x02, 0x03）</h3>
  <p>所有风扇都支持百分比控制 —— 这是最通用的调速方式，不依赖任何 Feature。</p>

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
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>PercentSetting<br/><span class="attr-cn">目标风速百分比</span></td>
          <td>uint8 / null</td>
          <td>目标风速百分比，范围 0~100。写入 <code>0</code> 等同于 <code>FanMode = Off</code>。Nullable —— <code>null</code> 表示设备处于自动/智能模式，风速由设备自行管理</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>PercentCurrent<br/><span class="attr-cn">实际风速百分比</span></td>
          <td>uint8</td>
          <td>风扇当前实际运转的风速百分比，范围 0~100。这是只读属性，反映真实物理状态。界面展示应以此值为准</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Setting 与 Current 的区别</div>
    <p>
      <code>PercentSetting</code> 是「目标值」（你想要多少），<code>PercentCurrent</code> 是「实际值」（风扇真正在转多少）。
      两者可能不一致 —— 例如写入 <code>PercentSetting = 60</code> 后，由于电机特性或档位量化，
      实际转速可能是 58% 或 65%。App 界面上展示风速时应使用 <code>PercentCurrent</code>。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 多档位控制（0x04, 0x05, 0x06）====== -->
  <h3 id="group-speed">多档位控制（0x04, 0x05, 0x06）</h3>
  <p>
    需要 <strong>SPD（MultiSpeed）</strong> Feature。百分比是连续值，档位是离散值 ——
    对于有物理挡位的风扇（如 3 挡吊扇），用 SpeedSetting 比百分比更自然。
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
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>SpeedMax<br/><span class="attr-cn">最大档位</span></td>
          <td>uint8</td>
          <td>设备支持的最大档位数，范围 1~100。只读属性。例如 <code>SpeedMax = 3</code> 表示风扇有 3 个档位（1、2、3）</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>SpeedSetting<br/><span class="attr-cn">目标档位</span></td>
          <td>uint8 / null</td>
          <td>目标档位，范围 0~SpeedMax。写入 <code>0</code> 等同于关闭。Nullable —— <code>null</code> 表示自动模式下由设备决定。<strong>需要 SPD Feature</strong></td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>SpeedCurrent<br/><span class="attr-cn">实际档位</span></td>
          <td>uint8</td>
          <td>风扇当前实际运转的档位，范围 0~SpeedMax。只读属性。<strong>需要 SPD Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">百分比与档位的自动换算</div>
    <p>
      设备内部会在百分比和档位之间自动换算。例如 <code>SpeedMax = 4</code> 的风扇：
      写入 <code>SpeedSetting = 2</code> 后，<code>PercentCurrent</code> 大约是 50%；
      写入 <code>PercentSetting = 75</code> 后，<code>SpeedCurrent</code> 大约是 3。
      具体换算逻辑由设备固件决定，不一定是精确的线性映射。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 摇头功能（0x07, 0x08）====== -->
  <h3 id="group-rock">摇头功能（0x07, 0x08）</h3>
  <p>
    需要 <strong>RCK（Rocking）</strong> Feature。控制风扇的物理摆动方向 —— 常见于独立风扇和部分吊扇。
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
        <tr id="attr-0x07">
          <td><code>0x07</code></td>
          <td>RockSupport<br/><span class="attr-cn">摇头能力位图</span></td>
          <td>bitmap8</td>
          <td>设备支持哪些摇头方向（只读）。见下方位图</td>
        </tr>
        <tr id="attr-0x08">
          <td><code>0x08</code></td>
          <td>RockSetting<br/><span class="attr-cn">摇头设置位图</span></td>
          <td>bitmap8</td>
          <td>当前启用的摇头方向。可读写，写入的值必须是 RockSupport 的子集。全部清零表示停止摇头</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Rock 位图定义</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RockLeftRight</span>
        <span class="enum-desc">左右摇头</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">RockUpDown</span>
        <span class="enum-desc">上下摇头</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">RockRound</span>
        <span class="enum-desc">环绕摇头（360 度旋转）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">摇头组合</div>
    <p>
      RockSetting 是位图，可以同时启用多个方向。例如 <code>RockSetting = 0x03</code>（Bit 0 + Bit 1）表示同时左右 + 上下摇头。
      但前提是 <code>RockSupport</code> 的对应位也是 1 —— 写入不支持的方向会被设备拒绝。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 风感模式（0x09, 0x0A）====== -->
  <h3 id="group-wind">风感模式（0x09, 0x0A）</h3>
  <p>
    需要 <strong>WND（Wind）</strong> Feature。提供模拟自然风、睡眠风等非匀速送风模式，让体感更舒适。
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
        <tr id="attr-0x09">
          <td><code>0x09</code></td>
          <td>WindSupport<br/><span class="attr-cn">风感能力位图</span></td>
          <td>bitmap8</td>
          <td>设备支持哪些风感模式（只读）。见下方位图</td>
        </tr>
        <tr id="attr-0x0A">
          <td><code>0x0A</code></td>
          <td>WindSetting<br/><span class="attr-cn">风感设置位图</span></td>
          <td>bitmap8</td>
          <td>当前启用的风感模式。可读写，写入值必须是 WindSupport 的子集。全部清零表示匀速送风</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Wind 位图定义</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SleepWind</span>
        <span class="enum-desc">睡眠风 —— 风速随时间逐渐降低，适合入睡</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">NaturalWind</span>
        <span class="enum-desc">自然风 —— 风速随机波动，模拟户外微风</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">风感模式是互斥的</div>
    <p>
      虽然 WindSetting 是位图格式，但 <strong>SleepWind 和 NaturalWind 通常互斥</strong> —— 不应同时启用两种风感。
      规范未明确禁止同时设置，但实际设备的行为未定义。建议 App 界面上设计为单选按钮。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 送风方向（0x0B）====== -->
  <h3 id="group-airdir">送风方向（0x0B）</h3>
  <p>
    需要 <strong>AIRDIR（AirDirection）</strong> Feature。控制风扇叶片的旋转方向 —— 主要用于吊扇的夏/冬模式切换。
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
        <tr id="attr-0x0B">
          <td><code>0x0B</code></td>
          <td>AirflowDirection<br/><span class="attr-cn">送风方向</span></td>
          <td>enum8</td>
          <td>风扇叶片的旋转方向。对于吊扇，正转向下送风（夏季），反转向上循环（冬季）。见下方枚举</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>AirflowDirection 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Forward</span>
        <span class="enum-desc">正转 —— 向下送风（吊扇夏季模式）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Reverse</span>
        <span class="enum-desc">反转 —— 向上送风，利用天花板反射促进空气循环（吊扇冬季模式）</span>
      </div>
    </div>
  </div>

  <details class="scenario">
    <summary>吊扇正反转的实际用途</summary>
    <div class="scenario-content">
      <p>
        <strong>夏季（Forward / 正转）</strong>：叶片逆时针旋转，产生向下气流，人站在扇下感受到凉风。<br/>
        <strong>冬季（Reverse / 反转）</strong>：叶片顺时针旋转，将热空气沿天花板向下推送。
        人不会直接感受到风吹，但房间温度更均匀，暖气效率更高。<br/>
        很多用户不知道吊扇有这个功能 —— App 可以在换季时主动提示切换方向。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持全部 Feature 的智能吊扇在运转中的 FanControl Cluster 读取结果：</p>

  <pre><code>{
  // --- 风扇模式 ---
  "0x00": 5,              // FanMode = Auto（自动模式）
  "0x01": 2,              // FanModeSequence = OffLowMedHighAuto

  // --- 百分比控制 ---
  "0x02": 60,             // PercentSetting = 60（目标风速 60%）
  "0x03": 58,             // PercentCurrent = 58（实际风速 58%）

  // --- 多档位控制（SPD Feature）---
  "0x04": 10,             // SpeedMax = 10（最多 10 档）
  "0x05": 6,              // SpeedSetting = 6（目标档位 6）
  "0x06": 6,              // SpeedCurrent = 6（实际档位 6）

  // --- 摇头功能（RCK Feature）---
  "0x07": 0x03,           // RockSupport = 0x03（支持左右 + 上下）
  "0x08": 0x01,           // RockSetting = 0x01（当前左右摇头）

  // --- 风感模式（WND Feature）---
  "0x09": 0x03,           // WindSupport = 0x03（支持睡眠风 + 自然风）
  "0x0A": 0x02,           // WindSetting = 0x02（当前自然风）

  // --- 送风方向（AIRDIR Feature）---
  "0x0B": 0               // AirflowDirection = Forward（正转送风）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      最简单的风扇可能只有 FanMode（0x00）、FanModeSequence（0x01）、PercentSetting（0x02）和 PercentCurrent（0x03）四个属性。
      其余属性都依赖 Feature。读取前先检查 <code>FeatureMap (0xFFFC)</code>，
      对不支持的属性发起读取会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-basic">场景 1：基础风扇控制</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FanModeSequence (0x01)</code> 确定设备支持哪些模式</li>
        <li>写入 <code>FanMode (0x00)</code> 切换模式（Off / Low / Medium / High）</li>
        <li>或者写入 <code>PercentSetting (0x02)</code> 直接设置百分比风速</li>
        <li>订阅 <code>PercentCurrent (0x03)</code> 实时同步 App 界面的风速显示</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-speed">场景 2：多档位风扇界面</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>确认 <code>FeatureMap</code> 包含 SPD（Bit 0），读取 <code>SpeedMax (0x04)</code> 获取最大档位数</li>
        <li>根据 SpeedMax 动态生成档位按钮（例如 SpeedMax = 5 就显示 1~5 五个按钮）</li>
        <li>写入 <code>SpeedSetting (0x05)</code> 切换档位</li>
        <li>订阅 <code>SpeedCurrent (0x06)</code> 更新界面上的当前档位高亮</li>
        <li>如果同时支持 STEP Feature，可以用 <code>Step</code> 命令配合遥控器的 +/- 按键</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-ceiling">场景 3：吊扇完整控制面板</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FeatureMap</code>，按支持的 Feature 显示/隐藏对应 UI 模块</li>
        <li>风速区域：如有 SPD 显示档位滑块，否则显示百分比滑块</li>
        <li>摇头区域（RCK）：读取 <code>RockSupport (0x07)</code>，只显示支持的方向选项。写入 <code>RockSetting (0x08)</code> 控制摇头</li>
        <li>风感区域（WND）：读取 <code>WindSupport (0x09)</code>，显示支持的模式（睡眠风/自然风）。写入 <code>WindSetting (0x0A)</code> 切换风感</li>
        <li>方向区域（AIRDIR）：显示正转/反转切换按钮，写入 <code>AirflowDirection (0x0B)</code></li>
        <li>提示：切换送风方向前建议先将风扇停止（<code>FanMode = Off</code>），待方向切换完成后再开启</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-hvac">场景 4：HVAC 系统联动</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>FanControl 通常和 Thermostat Cluster（0x0201）在同一个 Endpoint 上配合使用</li>
        <li>当 Thermostat 的 <code>SystemMode</code> 切换为 <code>FanOnly</code> 时，对应的 FanControl 开始工作</li>
        <li>如果风扇支持 AUT Feature，可以设为 <code>FanMode = Auto</code>，让风扇根据温控需求自动调节转速</li>
        <li>读取 Thermostat 的 <code>ThermostatRunningState (0x29)</code> 中的 FanState 位，确认风扇是否在运转</li>
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
</style>`,
  },
  'pump-configuration-and-control': {
    title: '水泵控制 Cluster · PumpConfigurationAndControl（0x0200）',
    description: 'Matter PumpConfigurationAndControl Cluster（0x0200）完整参考 — 水泵运行模式、控制模式、转速/流量/压力控制范围、PumpStatus 状态位图、故障事件监控等全部属性与枚举值速查。',
    prev: undefined,
    next: undefined,
    content: `<h1>水泵控制 Cluster（PumpConfigurationAndControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0200</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Pump Endpoint</code>（水泵功能端点）
  </p>
  <p>
    PumpConfigurationAndControl 是 Matter 中控制水泵设备的核心 Cluster，
    适用于 HVAC 系统循环泵、生活供水泵、工业用泵等场景。
    它定义了水泵的运行模式、控制模式、转速/流量/压力范围、运行状态监控和故障事件上报等全部能力。
    水泵类设备的配置和运维都围绕这个 Cluster 展开。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 驱动的控制模式</div>
    <p>
      PumpConfigurationAndControl 的能力差异很大 —— 一个简单的定速泵可能只支持恒定转速模式，
      而一台变频泵可能同时支持恒定压力、补偿压力、恒定流量、恒定温度和自动模式。
      每种控制模式由对应的 Feature 启用，Feature 还决定了哪些范围属性可用。
      开发前先读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持哪些控制模式，再决定 UI 布局。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#pump-status">PumpStatus 位图</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件列表</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>PumpConfigurationAndControl Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些控制模式。Feature 直接决定了可用的属性范围和 ControlMode 选项：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PRSCONST（ConstantPressure）</span>
        <span class="enum-desc">恒定压力 —— 支持 MinConstPressure / MaxConstPressure，ControlMode 可选 ConstantPressure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">PRSCOMP（CompensatedPressure）</span>
        <span class="enum-desc">补偿压力 —— 支持 MinCompPressure / MaxCompPressure，ControlMode 可选 ProportionalPressure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SPD（ConstantSpeed）</span>
        <span class="enum-desc">恒定转速 —— 支持 MinConstSpeed / MaxConstSpeed，ControlMode 可选 ConstantSpeed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">FLW（ConstantFlow）</span>
        <span class="enum-desc">恒定流量 —— 支持 MinConstFlow / MaxConstFlow，ControlMode 可选 ConstantFlow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TEMP（ConstantTemperature）</span>
        <span class="enum-desc">恒定温度 —— 支持 MinConstTemp / MaxConstTemp，ControlMode 可选 ConstantTemperature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AUTO（Automatic）</span>
        <span class="enum-desc">自动模式 —— ControlMode 可选 Automatic，水泵根据系统需求自行调节</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">LOCAL（LocalOperation）</span>
        <span class="enum-desc">本地操作 —— OperationMode 可选 Local，允许水泵面板本地控制</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      一台简单的定速循环泵：<code>FeatureMap = 0x04</code>（仅 SPD），只能以恒定转速运行。<br/>
      一台变频供水泵：<code>FeatureMap = 0x23</code>（PRSCONST + PRSCOMP + AUTO），支持恒定压力、补偿压力和自动模式。<br/>
      一台全功能工业泵：<code>FeatureMap = 0x7F</code>（全部 7 个 Feature），支持所有控制模式和本地操作。
    </p>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>PumpConfigurationAndControl Cluster 的属性按功能分为五组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 设备能力上限 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>MaxPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-capacity">设备能力上限</a></td>
          <td>最大压力（1/10 kPa）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>MaxSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-capacity">设备能力上限</a></td>
          <td>最大转速（RPM）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-capacity">设备能力上限</a></td>
          <td>最大流量（1/10 m&sup3;/h）</td>
        </tr>
        <!-- 控制范围参数 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>MinConstPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定压力模式最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>MaxConstPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定压力模式最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>MinCompPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>补偿压力模式最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>MaxCompPressure</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>补偿压力模式最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>MinConstSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定转速模式最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>MaxConstSpeed</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定转速模式最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MinConstFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定流量模式最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>MaxConstFlow</td>
          <td>uint16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定流量模式最大值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>MinConstTemp</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定温度模式最小值</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>MaxConstTemp</td>
          <td>int16 / null</td>
          <td><a href="#group-range">控制范围</a></td>
          <td>恒定温度模式最大值</td>
        </tr>
        <!-- 运行状态 -->
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>PumpStatus</td>
          <td>bitmap16</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>水泵状态位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>EffectiveOperationMode</td>
          <td>OperationModeEnum</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>实际生效的运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>EffectiveControlMode</td>
          <td>ControlModeEnum</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>实际生效的控制模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0013">
          <td><a href="#attr-0x0013"><code>0x0013</code></a></td>
          <td>Capacity</td>
          <td>int16 / null</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>当前工作点容量</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0014">
          <td><a href="#attr-0x0014"><code>0x0014</code></a></td>
          <td>Speed</td>
          <td>uint16 / null</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>当前转速（RPM）</td>
        </tr>
        <!-- 累计统计 -->
        <tr class="clickable-row" data-href="#attr-0x0015">
          <td><a href="#attr-0x0015"><code>0x0015</code></a></td>
          <td>LifetimeRunningHours</td>
          <td>uint24 / null</td>
          <td><a href="#group-stats">累计统计</a></td>
          <td>累计运行小时数</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0016">
          <td><a href="#attr-0x0016"><code>0x0016</code></a></td>
          <td>Power</td>
          <td>uint24 / null</td>
          <td><a href="#group-stats">累计统计</a></td>
          <td>当前功率（W）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0017">
          <td><a href="#attr-0x0017"><code>0x0017</code></a></td>
          <td>LifetimeEnergyConsumed</td>
          <td>uint32 / null</td>
          <td><a href="#group-stats">累计统计</a></td>
          <td>累计耗电量（Wh）</td>
        </tr>
        <!-- 控制参数 -->
        <tr class="clickable-row" data-href="#attr-0x0020">
          <td><a href="#attr-0x0020"><code>0x0020</code></a></td>
          <td>OperationMode</td>
          <td>OperationModeEnum</td>
          <td><a href="#group-control">控制参数</a></td>
          <td>运行模式（可写）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0021">
          <td><a href="#attr-0x0021"><code>0x0021</code></a></td>
          <td>ControlMode</td>
          <td>ControlModeEnum</td>
          <td><a href="#group-control">控制参数</a></td>
          <td>控制模式（可写）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">无命令（Commands）</div>
    <p>
      PumpConfigurationAndControl Cluster 没有定义任何命令。
      所有控制操作通过写入属性完成 —— 写入 <code>OperationMode (0x0020)</code> 切换运行模式，
      写入 <code>ControlMode (0x0021)</code> 切换控制模式。这与大部分 HVAC 类 Cluster 的设计一致。
    </p>
  </div>

  <!-- ====== 设备能力上限（0x0000 ~ 0x0002）====== -->
  <h3 id="group-capacity">设备能力上限（0x0000 ~ 0x0002）</h3>
  <p>描述水泵硬件的物理极限参数。这三个属性是只读的，由设备固件在出厂时设定，代表水泵能达到的最大性能指标。</p>

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
          <td>MaxPressure<br/><span class="attr-cn">最大压力</span></td>
          <td>int16 / null</td>
          <td>水泵能输出的最大压力，单位 1/10 kPa。例如 <code>3200</code> = 320.0 kPa。Nullable —— <code>null</code> 表示设备未提供此参数</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>MaxSpeed<br/><span class="attr-cn">最大转速</span></td>
          <td>uint16 / null</td>
          <td>水泵电机的最大转速，单位 RPM。例如 <code>2900</code> = 2900 转/分钟。Nullable</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MaxFlow<br/><span class="attr-cn">最大流量</span></td>
          <td>uint16 / null</td>
          <td>水泵能输出的最大流量，单位 1/10 m&sup3;/h。例如 <code>500</code> = 50.0 m&sup3;/h。Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">压力和流量的单位精度</div>
    <p>
      <code>MaxPressure</code> 和 <code>MaxFlow</code> 的单位分别是 <strong>1/10 kPa</strong> 和 <strong>1/10 m&sup3;/h</strong>，
      不是整数 kPa 和 m&sup3;/h。例如值为 <code>3200</code> 表示 320.0 kPa，值为 <code>500</code> 表示 50.0 m&sup3;/h。
      界面展示时记得除以 10。温度类属性（MinConstTemp / MaxConstTemp）也是 1/10 &deg;C 精度。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 控制范围（0x0003 ~ 0x000C）====== -->
  <h3 id="group-range">控制范围（0x0003 ~ 0x000C）</h3>
  <p>
    定义各控制模式下设定值的有效范围。每种控制模式对应一对 Min/Max 属性，
    只有设备支持对应 Feature 时这对属性才存在。App 在渲染滑块或输入框时应以这些值为上下限。
  </p>

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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>MinConstPressure<br/><span class="attr-cn">恒定压力下限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCONST</td>
          <td>恒定压力模式下可设定的最小压力，单位 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>MaxConstPressure<br/><span class="attr-cn">恒定压力上限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCONST</td>
          <td>恒定压力模式下可设定的最大压力，单位 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MinCompPressure<br/><span class="attr-cn">补偿压力下限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCOMP</td>
          <td>补偿压力模式下可设定的最小压力，单位 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>MaxCompPressure<br/><span class="attr-cn">补偿压力上限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">PRSCOMP</td>
          <td>补偿压力模式下可设定的最大压力，单位 1/10 kPa</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>MinConstSpeed<br/><span class="attr-cn">恒定转速下限</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">SPD</td>
          <td>恒定转速模式下可设定的最小转速，单位 RPM</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>MaxConstSpeed<br/><span class="attr-cn">恒定转速上限</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">SPD</td>
          <td>恒定转速模式下可设定的最大转速，单位 RPM</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>MinConstFlow<br/><span class="attr-cn">恒定流量下限</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">FLW</td>
          <td>恒定流量模式下可设定的最小流量，单位 1/10 m&sup3;/h</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>MaxConstFlow<br/><span class="attr-cn">恒定流量上限</span></td>
          <td>uint16 / null</td>
          <td class="col-feature">FLW</td>
          <td>恒定流量模式下可设定的最大流量，单位 1/10 m&sup3;/h</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>MinConstTemp<br/><span class="attr-cn">恒定温度下限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">TEMP</td>
          <td>恒定温度模式下可设定的最小温度，单位 1/10 &deg;C</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>MaxConstTemp<br/><span class="attr-cn">恒定温度上限</span></td>
          <td>int16 / null</td>
          <td class="col-feature">TEMP</td>
          <td>恒定温度模式下可设定的最大温度，单位 1/10 &deg;C</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">恒定压力 vs 补偿压力</div>
    <p>
      <strong>恒定压力（ConstantPressure）</strong>：水泵维持固定的出口压力，不管流量如何变化。适合供水系统，保证各出水口压力稳定。<br/>
      <strong>补偿压力（ProportionalPressure / CompensatedPressure）</strong>：水泵根据流量自动调整压力 —— 流量小时压力低，流量大时压力高。
      适合大型管网系统，在低负荷时节能。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 运行状态（0x0010 ~ 0x0014）====== -->
  <h3 id="group-status">运行状态（0x0010 ~ 0x0014）</h3>
  <p>反映水泵当前的实时运行状况。这些属性都是只读的，由设备自动维护。</p>

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
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>PumpStatus<br/><span class="attr-cn">水泵状态位图</span></td>
          <td>bitmap16</td>
          <td>水泵当前状态的位图标志，包含运行/故障/远程控制等信息。详见下方 <a href="#pump-status">PumpStatus 位图</a> 章节。可选属性</td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>EffectiveOperationMode<br/><span class="attr-cn">实际运行模式</span></td>
          <td>OperationModeEnum</td>
          <td>水泵实际生效的运行模式。可能与写入的 <code>OperationMode</code> 不同 —— 例如设备处于本地面板控制时，即使远程写入 Normal，实际仍为 Local</td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>EffectiveControlMode<br/><span class="attr-cn">实际控制模式</span></td>
          <td>ControlModeEnum</td>
          <td>水泵实际生效的控制模式。当 <code>OperationMode</code> 为 Minimum 或 Maximum 时，设备会覆盖 ControlMode 的设定值</td>
        </tr>
        <tr id="attr-0x0013">
          <td><code>0x0013</code></td>
          <td>Capacity<br/><span class="attr-cn">当前容量</span></td>
          <td>int16 / null</td>
          <td>水泵当前工作点的容量值，单位和含义取决于当前控制模式（压力 / 转速 / 流量 / 温度）。Nullable</td>
        </tr>
        <tr id="attr-0x0014">
          <td><code>0x0014</code></td>
          <td>Speed<br/><span class="attr-cn">当前转速</span></td>
          <td>uint16 / null</td>
          <td>水泵电机当前实际转速，单位 RPM。Nullable。可选属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Effective vs 写入值</div>
    <p>
      <code>EffectiveOperationMode</code> 和 <code>EffectiveControlMode</code> 是只读的「实际生效值」，
      <code>OperationMode</code> 和 <code>ControlMode</code> 是可写的「期望值」。
      两者可能不一致 —— 例如写入 <code>OperationMode = Normal</code> 后，
      如果水泵面板切换到本地控制，<code>EffectiveOperationMode</code> 会变为 <code>Local</code>。
      App 界面应以 Effective 值为准显示当前状态。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 累计统计（0x0015 ~ 0x0017）====== -->
  <h3 id="group-stats">累计统计（0x0015 ~ 0x0017）</h3>
  <p>记录水泵的运行时长和能耗数据，用于运维和能效分析。</p>

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
        <tr id="attr-0x0015">
          <td><code>0x0015</code></td>
          <td>LifetimeRunningHours<br/><span class="attr-cn">累计运行小时</span></td>
          <td>uint24 / null</td>
          <td>水泵从出厂至今的累计运行小时数。可读写（支持重置）。默认值 <code>0</code>。Nullable。可选属性</td>
        </tr>
        <tr id="attr-0x0016">
          <td><code>0x0016</code></td>
          <td>Power<br/><span class="attr-cn">当前功率</span></td>
          <td>uint24 / null</td>
          <td>水泵当前消耗的电功率，单位 W。例如 <code>1500</code> = 1.5 kW。Nullable。可选属性</td>
        </tr>
        <tr id="attr-0x0017">
          <td><code>0x0017</code></td>
          <td>LifetimeEnergyConsumed<br/><span class="attr-cn">累计耗电量</span></td>
          <td>uint32 / null</td>
          <td>水泵从出厂至今的累计耗电量，单位 Wh。可读写（支持重置）。默认值 <code>0</code>。Nullable。可选属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">运维提示</div>
    <p>
      <code>LifetimeRunningHours</code> 对水泵维保非常重要 —— 大部分水泵的维保周期按运行小时计算（如每 8000 小时更换密封件）。
      App 可以基于此属性实现「维保到期提醒」功能。
      <code>LifetimeEnergyConsumed</code> 单位是 Wh（瓦时），界面展示时通常转换为 kWh（除以 1000）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 控制参数（0x0020 ~ 0x0021）====== -->
  <h3 id="group-control">控制参数（0x0020 ~ 0x0021）</h3>
  <p>
    水泵的核心控制属性 —— 通过写入这两个属性控制水泵的运行方式。
    这是 PumpConfigurationAndControl 唯一可写的应用属性。
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
        <tr id="attr-0x0020">
          <td><code>0x0020</code></td>
          <td>OperationMode<br/><span class="attr-cn">运行模式</span></td>
          <td>OperationModeEnum</td>
          <td>水泵的运行模式。可读写，默认 <code>Normal (0)</code>。决定水泵以什么方式运行。见下方枚举</td>
        </tr>
        <tr id="attr-0x0021">
          <td><code>0x0021</code></td>
          <td>ControlMode<br/><span class="attr-cn">控制模式</span></td>
          <td>ControlModeEnum</td>
          <td>水泵的控制模式。可读写，默认 <code>ConstantSpeed (0)</code>。决定水泵以什么物理量为控制目标。可选属性。见下方枚举</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>OperationMode 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常运行 —— 按 ControlMode 指定的方式调节</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Minimum</span>
        <span class="enum-desc">最低速运行 —— 水泵以最低允许转速运转，忽略 ControlMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Maximum</span>
        <span class="enum-desc">最高速运行 —— 水泵以最大转速运转，忽略 ControlMode</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Local</span>
        <span class="enum-desc">本地控制 —— 由水泵面板本地操控，远程设定被忽略。需要 LOCAL Feature</span>
      </div>
    </div>
  </div>

  <h4>ControlMode 枚举值</h4>
  <p>ControlMode 决定水泵以什么物理量为调节目标。仅在 <code>OperationMode = Normal</code> 时生效。</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">ConstantSpeed</span>
        <span class="enum-desc">恒定转速 —— 维持固定转速。需要 SPD Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ConstantPressure</span>
        <span class="enum-desc">恒定压力 —— 维持固定出口压力，自动调节转速。需要 PRSCONST Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ProportionalPressure</span>
        <span class="enum-desc">补偿压力 —— 压力随流量比例调节，低负荷时节能。需要 PRSCOMP Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ConstantFlow</span>
        <span class="enum-desc">恒定流量 —— 维持固定流量，自动调节转速和压力。需要 FLW Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ConstantTemperature</span>
        <span class="enum-desc">恒定温度 —— 根据回水温度调节流量，适合供暖循环。需要 TEMP Feature</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Automatic</span>
        <span class="enum-desc">自动模式 —— 水泵自行选择最优控制方式。需要 AUTO Feature</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">枚举值不连续</div>
    <p>
      注意 ControlMode 枚举值不是连续的 —— 没有 4 和 6。
      <code>ConstantTemperature</code> 是 5，<code>Automatic</code> 是 7。
      解析时不能用数组下标直接映射，需要显式匹配。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== PumpStatus 位图 ====== -->
  <h2 id="pump-status">PumpStatus 位图</h2>
  <p>
    <code>PumpStatus (0x0010)</code> 是一个 16 位位图，每个位代表水泵的一种状态标志。
    多个位可以同时为 1 —— 例如水泵正在运行且处于本地控制时，Running 和 LocalOverride 同时置位。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DeviceFault</span>
        <span class="enum-desc">设备故障 —— 水泵硬件发生故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">SupplyFault</span>
        <span class="enum-desc">供电故障 —— 电源异常（缺相、电压异常等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SpeedLow</span>
        <span class="enum-desc">转速偏低 —— 实际转速低于设定值</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">SpeedHigh</span>
        <span class="enum-desc">转速偏高 —— 实际转速高于设定值</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">LocalOverride</span>
        <span class="enum-desc">本地覆盖 —— 水泵面板正在本地控制，远程设定被忽略</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">运行中 —— 水泵电机正在转动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">RemotePressure</span>
        <span class="enum-desc">远程压力传感器 —— 压力由外部传感器提供（非水泵内置）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">RemoteFlow</span>
        <span class="enum-desc">远程流量传感器 —— 流量由外部传感器提供</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 8</span>
      <div>
        <span class="enum-name">RemoteTemperature</span>
        <span class="enum-desc">远程温度传感器 —— 温度由外部传感器提供</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">状态位图读取示例</div>
    <p>
      <code>PumpStatus = 0x0020</code>（十进制 32）= Bit 5 置位 = 水泵正在运行（Running），其他状态均正常。<br/>
      <code>PumpStatus = 0x0023</code>（十进制 35）= Bit 0 + Bit 1 + Bit 5 = 水泵运行中，但有设备故障和供电故障 —— 需要立即告警。
    </p>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    PumpConfigurationAndControl 定义了 17 个事件，全部用于故障和异常上报。
    这是 Matter 中事件最多的 Cluster 之一 —— 水泵作为关键基础设施，需要细粒度的故障分类。
    所有事件均无数据字段，事件本身即代表对应状况的发生。
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
          <td>SupplyVoltageLow</td>
          <td class="col-event-warning">WARNING</td>
          <td>供电电压过低</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>SupplyVoltageHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>供电电压过高</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>PowerMissingPhase</td>
          <td class="col-event-warning">WARNING</td>
          <td>三相电缺相</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>SystemPressureLow</td>
          <td class="col-event-warning">WARNING</td>
          <td>系统压力过低</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>SystemPressureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>系统压力过高</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>DryRunning</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>干转（水泵无水运行，可能烧毁）</td>
        </tr>
        <tr>
          <td><code>0x06</code></td>
          <td>MotorTemperatureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>电机温度过高</td>
        </tr>
        <tr>
          <td><code>0x07</code></td>
          <td>PumpMotorFatalFailure</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>电机致命故障（需立即停机）</td>
        </tr>
        <tr>
          <td><code>0x08</code></td>
          <td>ElectronicTemperatureHigh</td>
          <td class="col-event-warning">WARNING</td>
          <td>控制板温度过高</td>
        </tr>
        <tr>
          <td><code>0x09</code></td>
          <td>PumpBlocked</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>水泵堵转（叶轮卡住）</td>
        </tr>
        <tr>
          <td><code>0x0A</code></td>
          <td>SensorFailure</td>
          <td class="col-event-warning">WARNING</td>
          <td>传感器故障</td>
        </tr>
        <tr>
          <td><code>0x0B</code></td>
          <td>ElectronicNonFatalFailure</td>
          <td class="col-event-warning">WARNING</td>
          <td>控制板非致命故障</td>
        </tr>
        <tr>
          <td><code>0x0C</code></td>
          <td>ElectronicFatalFailure</td>
          <td class="col-event-critical">CRITICAL</td>
          <td>控制板致命故障</td>
        </tr>
        <tr>
          <td><code>0x0D</code></td>
          <td>GeneralFault</td>
          <td class="col-event-info">INFO</td>
          <td>通用故障（未归类的一般性问题）</td>
        </tr>
        <tr>
          <td><code>0x0E</code></td>
          <td>Leakage</td>
          <td class="col-event-warning">WARNING</td>
          <td>泄漏 —— 检测到水泵或管路漏水</td>
        </tr>
        <tr>
          <td><code>0x0F</code></td>
          <td>AirDetection</td>
          <td class="col-event-warning">WARNING</td>
          <td>气体检测 —— 管路中检测到空气</td>
        </tr>
        <tr>
          <td><code>0x10</code></td>
          <td>TurbineOperation</td>
          <td class="col-event-warning">WARNING</td>
          <td>涡轮流量异常 —— 涡轮流量计检测到异常流量</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">CRITICAL 事件需立即响应</div>
    <p>
      标记为 <strong>CRITICAL</strong> 的事件（DryRunning、PumpMotorFatalFailure、PumpBlocked、ElectronicFatalFailure）
      表示水泵可能正在遭受不可逆损伤。App 收到这些事件时应立即弹出全屏告警，
      建议用户停机检查。干转（DryRunning）尤其危险 —— 水泵无水运行几分钟就可能烧毁机械密封。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持恒定压力控制的变频水泵在正常运行中的 PumpConfigurationAndControl Cluster 读取结果：</p>

  <pre><code>{
  // --- 设备能力上限 ---
  "0x0000": 3200,           // MaxPressure = 320.0 kPa（最大压力）
  "0x0001": 2900,           // MaxSpeed = 2900 RPM（最大转速）
  "0x0002": 500,            // MaxFlow = 50.0 m³/h（最大流量）

  // --- 控制范围（恒定压力 Feature）---
  "0x0003": 500,            // MinConstPressure = 50.0 kPa
  "0x0004": 3000,           // MaxConstPressure = 300.0 kPa

  // --- 运行状态 ---
  "0x0010": 32,             // PumpStatus = 0x0020（Running 位置 1）
  "0x0011": 0,              // EffectiveOperationMode = Normal
  "0x0012": 1,              // EffectiveControlMode = ConstantPressure
  "0x0013": 2350,           // Capacity = 2350（当前工作点容量）
  "0x0014": 2450,           // Speed = 2450 RPM（当前转速）

  // --- 累计统计 ---
  "0x0015": 8760,           // LifetimeRunningHours = 8760 小时（约 1 年）
  "0x0016": 1500,           // Power = 1500 W（当前功率）
  "0x0017": 13140000,       // LifetimeEnergyConsumed = 13140 kWh

  // --- 控制参数 ---
  "0x0020": 0,              // OperationMode = Normal（正常运行）
  "0x0021": 1               // ControlMode = ConstantPressure（恒定压力）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      最简单的定速水泵可能只有 MaxPressure、MaxSpeed、MaxFlow、EffectiveOperationMode、EffectiveControlMode 和 OperationMode 这几个核心属性。
      控制范围属性（0x0003~0x000C）和 ControlMode 都依赖 Feature。
      读取前先检查 <code>FeatureMap (0xFFFC)</code>，对不支持的属性发起读取会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-pressure">场景 1：HVAC 恒定压力供水</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 PRSCONST（Bit 0）</li>
        <li>读取 <code>MinConstPressure (0x0003)</code> 和 <code>MaxConstPressure (0x0004)</code> 获取压力设定范围</li>
        <li>写入 <code>ControlMode (0x0021) = 1</code>（ConstantPressure），将水泵切换到恒定压力模式</li>
        <li>写入 <code>OperationMode (0x0020) = 0</code>（Normal），确保水泵按 ControlMode 运行</li>
        <li>订阅 <code>EffectiveControlMode (0x0012)</code> 确认模式已生效</li>
        <li>订阅 <code>Capacity (0x0013)</code> 和 <code>Speed (0x0014)</code> 实时监控运行状态</li>
        <li>订阅 <code>PumpStatus (0x0010)</code> 监控故障标志，关注 DeviceFault 和 SupplyFault 位</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-monitor">场景 2：水泵故障监控与告警</h3>
  <details class="scenario">
    <summary>查看步骤</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅全部事件 —— 事件是水泵故障上报的主要通道，比轮询 PumpStatus 更及时</li>
        <li>按事件优先级分级处理：
          <ul>
            <li><strong>CRITICAL</strong>（DryRunning / PumpMotorFatalFailure / PumpBlocked / ElectronicFatalFailure）—— 全屏告警 + 推送通知 + 建议立即停机</li>
            <li><strong>WARNING</strong>（SupplyVoltageLow / SystemPressureHigh / Leakage 等）—— 顶部横幅告警 + 记录日志</li>
            <li><strong>INFO</strong>（GeneralFault）—— 仅记录日志</li>
          </ul>
        </li>
        <li>定期读取 <code>PumpStatus (0x0010)</code> 位图，检查是否有持续性故障（如 DeviceFault 一直置位）</li>
        <li>读取 <code>LifetimeRunningHours (0x0015)</code>，当接近维保周期（如 8000 小时）时提醒用户安排维保</li>
        <li>读取 <code>Power (0x0016)</code> 和 <code>LifetimeEnergyConsumed (0x0017)</code>，计算能效趋势 —— 同等负荷下功率异常升高可能预示机械磨损</li>
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
