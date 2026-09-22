import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'smoke-co-alarm': {
    title: '烟雾/一氧化碳报警 Cluster · SmokeCOAlarm（0x005C）',
    description: 'Matter SmokeCOAlarm Cluster（0x005C）完整参考 — 烟雾报警、CO 报警、电池状态、静音控制、自检命令、联动报警、事件定义及枚举值速查。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>烟雾/一氧化碳报警 Cluster（SmokeCOAlarm）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005C</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    SmokeCOAlarm 是 Matter 中消防安全设备的核心 Cluster，负责烟雾探测、一氧化碳（CO）探测、电池状态监控、设备自检和联动报警。
    住宅中常见的独立式烟感、烟雾/CO 二合一探测器、互联式报警系统都依赖这个 Cluster。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature 驱动的能力声明</div>
    <p>
      SmokeCOAlarm 的两个 Feature（<strong>SMOKE</strong> 和 <strong>CO</strong>）决定设备支持哪些报警类型。
      纯烟感设备只启用 SMOKE，纯 CO 探测器只启用 CO，二合一设备同时启用两者。
      Feature 的组合直接影响哪些属性和事件可用 —— 读取前务必先检查 <code>FeatureMap (0xFFFC)</code>。
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
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>SmokeCOAlarm 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些报警能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SMOKE（烟雾报警）</span>
        <span class="enum-desc">启用烟雾探测能力 —— 提供 SmokeState 属性和 SmokeAlarm / InterconnectSmokeAlarm 事件</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CO（一氧化碳报警）</span>
        <span class="enum-desc">启用 CO 探测能力 —— 提供 COState 属性和 COAlarm / InterconnectCOAlarm 事件</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见组合</div>
    <p>
      <code>FeatureMap = 0x01</code>（Bit 0）：纯烟感设备。<br/>
      <code>FeatureMap = 0x02</code>（Bit 1）：纯 CO 探测器。<br/>
      <code>FeatureMap = 0x03</code>（Bit 0 + Bit 1）：烟雾/CO 二合一设备（最常见的家用设备）。
    </p>
  </div>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    SmokeCOAlarm Cluster 只有一个命令 —— 触发设备自检。报警设备的核心动作（报警、静音等）
    由设备自主触发，不需要外部命令控制。
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
          <td>SelfTestRequest</td>
          <td>触发设备自检</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">SelfTestRequest —— 触发自检（0x00）</h3>
  <p>
    请求设备执行自检流程。设备会检测传感器、蜂鸣器、电池等是否正常工作。
    自检期间 <code>TestInProgress</code> 属性变为 <code>true</code>，完成后触发 <code>SelfTestComplete</code> 事件。
    不需要任何参数。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">自检注意事项</div>
    <p>
      自检会让设备短暂发出报警声（测试蜂鸣器），需要提前告知用户。
      如果设备当前已经处于报警状态（<code>ExpressedState ≠ Normal</code>），自检请求会被拒绝。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 中点击「设备自检」按钮时调用。建议每月定期自检一次以确保设备正常工作。
        发送命令后，订阅 <code>TestInProgress (0x0005)</code> 属性变化来跟踪自检进度，
        监听 <code>SelfTestComplete</code> 事件获取自检结果。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>SmokeCOAlarm Cluster 的属性按功能分为四组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 报警状态 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ExpressedState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">报警状态</a></td>
          <td>设备当前最高优先级状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SmokeState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">报警状态</a></td>
          <td>烟雾探测状态（需 SMOKE feature）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>COState</td>
          <td>enum8</td>
          <td><a href="#group-alarm">报警状态</a></td>
          <td>一氧化碳探测状态（需 CO feature）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>BatteryAlert</td>
          <td>enum8</td>
          <td><a href="#group-alarm">报警状态</a></td>
          <td>电池电量报警级别</td>
        </tr>
        <!-- 设备控制 -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>DeviceMuted</td>
          <td>enum8</td>
          <td><a href="#group-control">设备控制</a></td>
          <td>报警是否被静音</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TestInProgress</td>
          <td>bool</td>
          <td><a href="#group-control">设备控制</a></td>
          <td>是否正在自检</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>HardwareFaultAlert</td>
          <td>bool</td>
          <td><a href="#group-control">设备控制</a></td>
          <td>是否存在硬件故障</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>EndOfServiceAlert</td>
          <td>enum8</td>
          <td><a href="#group-control">设备控制</a></td>
          <td>设备是否已到使用寿命</td>
        </tr>
        <!-- 联动报警 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>InterconnectSmokeAlarm</td>
          <td>enum8</td>
          <td><a href="#group-interconnect">联动报警</a></td>
          <td>联动烟雾报警状态（需 SMOKE feature）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>InterconnectCOAlarm</td>
          <td>enum8</td>
          <td><a href="#group-interconnect">联动报警</a></td>
          <td>联动 CO 报警状态（需 CO feature）</td>
        </tr>
        <!-- 传感器与寿命 -->
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>ContaminationState</td>
          <td>enum8</td>
          <td><a href="#group-sensor">传感器与寿命</a></td>
          <td>传感器污染程度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>SmokeSensitivityLevel</td>
          <td>enum8</td>
          <td><a href="#group-sensor">传感器与寿命</a></td>
          <td>烟雾灵敏度设置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>ExpiryDate</td>
          <td>epoch_s</td>
          <td><a href="#group-sensor">传感器与寿命</a></td>
          <td>设备过期日期</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 报警状态（0x0000 - 0x0003）====== -->
  <h3 id="group-alarm">报警状态（0x0000 - 0x0003）</h3>
  <p>描述设备当前的各类报警状态。<code>ExpressedState</code> 是所有状态的综合优先级结果，其他三个是分项状态。</p>

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
          <td>ExpressedState<br/><span class="attr-cn">综合状态</span></td>
          <td>enum8</td>
          <td>设备当前最高优先级的报警状态。当多个报警同时存在时，设备选择优先级最高的一个作为 ExpressedState（见下方枚举）。这是 SmokeCOAlarm 最核心的属性</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SmokeState<br/><span class="attr-cn">烟雾状态</span></td>
          <td>enum8</td>
          <td>烟雾传感器当前探测到的报警级别。<strong>需要 SMOKE feature</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>COState<br/><span class="attr-cn">CO 状态</span></td>
          <td>enum8</td>
          <td>一氧化碳传感器当前探测到的报警级别。<strong>需要 CO feature</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>BatteryAlert<br/><span class="attr-cn">电池报警</span></td>
          <td>enum8</td>
          <td>电池电量状态的报警级别。电池供电的报警设备必须支持此属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ExpressedState 枚举值</h4>
  <p>
    ExpressedState 反映设备当前最需要关注的状态。优先级从高到低排列：
  </p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常 —— 无任何报警，一切正常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">SmokeAlarm</span>
        <span class="enum-desc">烟雾报警 —— 检测到烟雾，可能有火灾</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">COAlarm</span>
        <span class="enum-desc">CO 报警 —— 检测到一氧化碳泄漏</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">BatteryAlert</span>
        <span class="enum-desc">电池报警 —— 电量低或电池故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Testing</span>
        <span class="enum-desc">自检中 —— 设备正在执行自检流程</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">HardwareFault</span>
        <span class="enum-desc">硬件故障 —— 设备自身检测到故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">EndOfService</span>
        <span class="enum-desc">寿命到期 —— 设备已达使用年限，需更换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">InterconnectSmoke</span>
        <span class="enum-desc">联动烟雾 —— 其他联动设备触发了烟雾报警</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">InterconnectCO</span>
        <span class="enum-desc">联动 CO —— 其他联动设备触发了 CO 报警</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">ExpressedState 的优先级机制</div>
    <p>
      当多种报警同时存在时，设备只在 ExpressedState 中反映优先级最高的那一个。
      例如同时有烟雾报警和低电量，ExpressedState 会显示 <code>SmokeAlarm (1)</code>。
      要获取所有分项状态，需要分别读取 SmokeState、COState、BatteryAlert 等属性。
    </p>
  </div>

  <h4>SmokeState / COState / BatteryAlert / InterconnectSmokeAlarm / InterconnectCOAlarm 枚举值</h4>
  <p>以上五个属性共用同一套三级报警枚举：</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常 —— 未检测到异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">预警 —— 检测到轻微异常，需注意</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">严重 —— 确认危险，需要立即处理</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Warning 与 Critical 的区别</div>
    <p>
      <strong>Warning</strong> 表示传感器检测到了异常但尚未确认为紧急情况（如轻微烟雾、电池电量偏低），
      通常是预警级别，设备可能发出间歇性提示音。
      <strong>Critical</strong> 表示已确认的紧急状况（如持续浓烟、CO 浓度超标、电池严重不足），
      设备会持续发出高音量报警。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 设备控制（0x0004 - 0x0007）====== -->
  <h3 id="group-control">设备控制（0x0004 - 0x0007）</h3>
  <p>描述设备的静音状态、自检进度、硬件健康和使用寿命。</p>

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
          <td>DeviceMuted<br/><span class="attr-cn">静音状态</span></td>
          <td>enum8</td>
          <td>报警是否已被用户静音。静音后设备停止发声，但报警状态仍然保持（见下方枚举）</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>TestInProgress<br/><span class="attr-cn">自检进行中</span></td>
          <td>bool</td>
          <td>设备是否正在执行自检。<code>true</code> = 自检中，此时不接受新的 SelfTestRequest</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>HardwareFaultAlert<br/><span class="attr-cn">硬件故障</span></td>
          <td>bool</td>
          <td>设备是否检测到自身硬件故障。<code>true</code> 表示设备可能无法正常工作，需要维修或更换</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>EndOfServiceAlert<br/><span class="attr-cn">寿命到期</span></td>
          <td>enum8</td>
          <td>设备是否已达到使用寿命（见下方枚举）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>DeviceMuted 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NotMuted</span>
        <span class="enum-desc">未静音 —— 报警声正常发出</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Muted</span>
        <span class="enum-desc">已静音 —— 报警声被抑制，但报警状态仍保持</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">静音的限制</div>
    <p>
      静音是通过设备上的物理按键触发的，不能通过远程命令控制。
      静音只会持续一段有限的时间（通常几分钟），之后报警会自动恢复。
      如果危险持续存在，设备可能拒绝静音或缩短静音时间。
    </p>
  </div>

  <h4>EndOfServiceAlert 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常 —— 设备在使用寿命内</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Expired</span>
        <span class="enum-desc">已过期 —— 设备已达使用年限，传感器可能不再准确，应尽快更换</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">烟感的使用寿命</div>
    <p>
      烟雾/CO 探测器的传感器会随时间老化。大多数设备的设计寿命是 <strong>7~10 年</strong>。
      当 <code>EndOfServiceAlert</code> 变为 <code>Expired</code> 时，App 应提醒用户更换设备，
      即使设备看起来仍能工作。配合 <code>ExpiryDate (0x000C)</code> 可以提前预告过期时间。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 联动报警（0x0008 - 0x0009）====== -->
  <h3 id="group-interconnect">联动报警（0x0008 - 0x0009）</h3>
  <p>
    当多个报警设备互联时，一个设备触发报警后，其他设备会通过联动属性反映该状态。
    联动报警让整栋房屋都能听到警报声，即使火源不在当前设备所在的房间。
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
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>InterconnectSmokeAlarm<br/><span class="attr-cn">联动烟雾报警</span></td>
          <td>enum8</td>
          <td>其他联动设备触发的烟雾报警状态。枚举值与 SmokeState 相同（Normal / Warning / Critical）。<strong>需要 SMOKE feature</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>InterconnectCOAlarm<br/><span class="attr-cn">联动 CO 报警</span></td>
          <td>enum8</td>
          <td>其他联动设备触发的 CO 报警状态。枚举值与 COState 相同（Normal / Warning / Critical）。<strong>需要 CO feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">联动与本机报警的区别</div>
    <p>
      <code>SmokeState</code> 是本机传感器的探测结果，<code>InterconnectSmokeAlarm</code> 是其他联动设备传来的报警。
      在 <code>ExpressedState</code> 的优先级中，本机报警（SmokeAlarm = 1）高于联动报警（InterconnectSmoke = 7），
      因为本机探测到的烟雾意味着危险就在附近。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 传感器与寿命（0x000A - 0x000C）====== -->
  <h3 id="group-sensor">传感器与寿命（0x000A - 0x000C）</h3>
  <p>传感器健康状态和设备使用寿命相关信息。</p>

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
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>ContaminationState<br/><span class="attr-cn">污染状态</span></td>
          <td>enum8</td>
          <td>烟雾传感器的污染程度。灰尘、油烟等会影响传感器灵敏度（见下方枚举）</td>
        </tr>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>SmokeSensitivityLevel<br/><span class="attr-cn">烟雾灵敏度</span></td>
          <td>enum8</td>
          <td>烟雾探测的灵敏度设置。可读可写（见下方枚举）</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>ExpiryDate<br/><span class="attr-cn">过期日期</span></td>
          <td>epoch_s</td>
          <td>设备的过期时间，以 Unix 时间戳（秒）表示。超过此时间后设备应被更换</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ContaminationState 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">正常 —— 传感器清洁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">轻度污染 —— 不影响正常使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">中度污染 —— 灵敏度可能降低，建议清洁</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">严重污染 —— 传感器可能无法正常工作，必须清洁或更换</span>
      </div>
    </div>
  </div>

  <h4>SmokeSensitivityLevel 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">高灵敏度 —— 轻微烟雾即触发，适合卧室等重要区域</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Standard</span>
        <span class="enum-desc">标准灵敏度 —— 默认设置，适合大多数场景</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">低灵敏度 —— 降低误报，适合厨房等容易产生烟雾的区域</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">灵敏度调整建议</div>
    <p>
      <code>SmokeSensitivityLevel</code> 是可写属性，App 可以提供设置入口让用户调整。
      如果设备安装在厨房附近频繁误报，可以建议用户调低灵敏度。
      但要注意：<strong>低灵敏度意味着可能延迟发现真正的火灾</strong>，需要明确提示风险。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    SmokeCOAlarm 是 Matter 中事件最丰富的 Cluster 之一。事件记录了报警设备从触发到解除的完整生命周期，
    是 App 推送通知和历史记录的主要数据来源。所有事件的优先级均为 <strong>Critical</strong>。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>事件名称</th>
          <th>说明</th>
          <th>所需特性</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>SmokeAlarm</td>
          <td>本机烟雾报警触发</td>
          <td class="col-required">SMOKE</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>COAlarm</td>
          <td>本机 CO 报警触发</td>
          <td class="col-required">CO</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>LowBattery</td>
          <td>电池电量低</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x03</code></td>
          <td>HardwareFault</td>
          <td>硬件故障</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x04</code></td>
          <td>EndOfService</td>
          <td>设备到达使用寿命</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x05</code></td>
          <td>SelfTestComplete</td>
          <td>自检完成</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x06</code></td>
          <td>AlarmMuted</td>
          <td>报警已被静音</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x07</code></td>
          <td>MuteEnded</td>
          <td>静音结束，报警恢复</td>
          <td class="col-optional">无</td>
        </tr>
        <tr>
          <td><code>0x08</code></td>
          <td>InterconnectSmokeAlarm</td>
          <td>联动烟雾报警触发</td>
          <td class="col-required">SMOKE</td>
        </tr>
        <tr>
          <td><code>0x09</code></td>
          <td>InterconnectCOAlarm</td>
          <td>联动 CO 报警触发</td>
          <td class="col-required">CO</td>
        </tr>
        <tr>
          <td><code>0x0A</code></td>
          <td>AllClear</td>
          <td>所有报警已解除，恢复正常</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">事件与属性的关系</div>
    <p>
      事件是「发生了什么」（一次性记录），属性是「当前是什么」（持续状态）。
      例如 <code>SmokeAlarm</code> 事件在烟雾报警触发时产生一次，
      而 <code>SmokeState</code> 属性会一直保持 <code>Warning</code> 或 <code>Critical</code> 直到烟雾消散。
      App 应同时订阅事件（用于推送通知）和属性（用于界面实时显示）。
    </p>
  </div>

  <h3>事件的典型时序</h3>
  <p>一次完整的烟雾报警生命周期会产生以下事件序列：</p>
  <ol>
    <li><code>SmokeAlarm</code> — 传感器检测到烟雾，报警开始</li>
    <li><code>AlarmMuted</code> — 用户按下静音按钮（可选）</li>
    <li><code>MuteEnded</code> — 静音超时，报警恢复（如果烟雾未消散）</li>
    <li><code>AllClear</code> — 烟雾消散，所有报警状态恢复正常</li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">AllClear 的含义</div>
    <p>
      <code>AllClear</code> 事件只在<strong>所有</strong>报警都解除后才会触发。
      如果烟雾报警解除但 CO 报警仍然存在，不会触发 AllClear。
      收到 AllClear 后，<code>ExpressedState</code> 保证为 <code>Normal (0)</code>。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个支持烟雾和 CO 双报警的设备在正常状态下的 SmokeCOAlarm Cluster 读取结果：</p>

  <pre><code>{
  // --- 报警综合状态 ---
  "0x0000": 0,              // ExpressedState = Normal（当前无报警）
  "0x0001": 0,              // SmokeState = Normal
  "0x0002": 0,              // COState = Normal
  "0x0003": 0,              // BatteryAlert = Normal
  "0x0004": 0,              // DeviceMuted = NotMuted（未静音）
  "0x0005": false,          // TestInProgress = false（未在自检）
  "0x0006": false,          // HardwareFaultAlert = false
  "0x0007": 0,              // EndOfServiceAlert = Normal

  // --- 联动报警 ---
  "0x0008": 0,              // InterconnectSmokeAlarm = Normal
  "0x0009": 0,              // InterconnectCOAlarm = Normal

  // --- 传感器与寿命 ---
  "0x000A": 0,              // ContaminationState = Normal
  "0x000B": 1,              // SmokeSensitivityLevel = Standard
  "0x000C": 1893456000      // ExpiryDate = 2029-12-31（epoch_s）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      实际读取数据时，建议先检查 <code>FeatureMap (0xFFFC)</code> 确定设备支持哪些特性。
      纯烟感设备不会上报 COState (0x0002) 和 InterconnectCOAlarm (0x0009)，
      纯 CO 探测器不会上报 SmokeState (0x0001) 和 InterconnectSmokeAlarm (0x0008)。
      <code>ExpiryDate (0x000C)</code> 的值是 Unix 时间戳（秒），需要转换为可读日期后展示给用户。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：火灾探测与通知</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>SmokeAlarm</code> 事件 —— 收到后立即推送紧急通知给用户</li>
        <li>读取 <code>SmokeState (0x0001)</code> 确认报警级别（Warning / Critical）</li>
        <li>读取 <code>ExpressedState (0x0000)</code> 了解设备综合状态</li>
        <li>界面上用醒目颜色（红色）展示报警状态，提示用户检查现场并拨打消防电话</li>
        <li>监听 <code>AllClear</code> 事件确认报警解除，界面恢复正常</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：一氧化碳泄漏处理</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>COAlarm</code> 事件 —— CO 泄漏比烟雾更危险（无色无味），推送必须即时</li>
        <li>读取 <code>COState (0x0002)</code> 确认报警级别</li>
        <li>
          在通知中提供安全指引：
          <ul>
            <li>立即打开窗户通风</li>
            <li>关闭燃气设备</li>
            <li>撤离到室外安全区域</li>
            <li>拨打 119 或燃气公司紧急电话</li>
          </ul>
        </li>
        <li>检查 <code>InterconnectCOAlarm (0x0009)</code> 确认是否有其他区域也在报警</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：设备维护与健康监控</summary>
    <div class="scenario-content">
      <ol>
        <li>定期读取 <code>BatteryAlert (0x0003)</code> —— 出现 Warning 时提醒用户更换电池</li>
        <li>读取 <code>ContaminationState (0x000A)</code> —— 达到 Warning 时提醒用户清洁传感器</li>
        <li>读取 <code>ExpiryDate (0x000C)</code> —— 临近过期时提前通知用户购买替换设备</li>
        <li>监控 <code>HardwareFaultAlert (0x0006)</code> —— 为 <code>true</code> 时提醒用户联系售后</li>
        <li>每月通过 <code>SelfTestRequest (0x00)</code> 命令触发一次自检，确保设备正常</li>
        <li>监听 <code>SelfTestComplete</code> 事件获取自检结果</li>
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
  'boolean-state': {
    title: '布尔状态 Cluster · BooleanState（0x0045）',
    description: 'Matter BooleanState Cluster（0x0045）完整参考 — StateValue 属性、StateChange 事件、门窗传感器 / 水浸传感器等典型设备的布尔语义说明。',
    prev: undefined,
    next: undefined,
    content: `<h1>布尔状态 Cluster（BooleanState）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0045</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）&nbsp;|&nbsp;
    <strong>角色</strong>: Server（只读，无命令）
  </p>
  <p>
    BooleanState 是 Matter 中最简单的 Cluster 之一 —— 只有 <strong>1 个属性</strong>、<strong>0 个命令</strong>、<strong>1 个事件</strong>。
    它用于报告一个通用的布尔（true/false）状态，典型的使用场景包括门窗传感器、水浸传感器、烟雾报警器等只需要表达「正常 / 异常」两态的设备。
  </p>
  <p>
    这个 Cluster 是<strong>纯只读</strong>的 —— App 端只能读取状态和订阅变化，不能向设备发送任何命令来改变状态。
    状态的变化完全由设备端的物理传感器驱动。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">true 和 false 到底代表什么？</div>
    <p>
      BooleanState 本身<strong>不定义</strong> true/false 的具体含义 —— 语义由搭配的<strong>设备类型（Device Type）</strong>决定。
      这是开发中最容易踩的坑。
    </p>
    <p>
      例如，对于 <strong>ContactSensor（门窗传感器，Device Type 0x0015）</strong>：
    </p>
    <ul>
      <li><code>true</code> = 门/窗<strong>已关闭</strong>（正常，触点闭合）</li>
      <li><code>false</code> = 门/窗<strong>已打开</strong>（告警，触点断开）</li>
    </ul>
    <p>
      这和直觉可能相反 —— 很多人会以为 <code>true = 打开</code>。
      Matter 的设计逻辑是：<strong>true 表示「正常/安全」状态，false 表示「需要注意」的状态</strong>。
      务必根据具体设备类型的规范来解读，不要想当然。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性</h2>
  <p>BooleanState 只有一个属性，且是必须支持的。</p>

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
          <td>StateValue</td>
          <td>bool</td>
          <td>只读</td>
          <td>当前布尔状态</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">StateValue（当前状态）</h3>
  <p>
    设备当前的布尔状态值。只读，不能通过写属性或命令来改变 —— 只有设备端的物理传感器触发才会更新这个值。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>值</th><th>通用含义</th><th>ContactSensor 含义</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>true</code></td>
          <td>正常 / 安全</td>
          <td>门窗已关闭（触点闭合）</td>
        </tr>
        <tr>
          <td><code>false</code></td>
          <td>异常 / 需注意</td>
          <td>门窗已打开（触点断开）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      不要在代码里硬写 <code>if (stateValue) "已关闭"</code>。应该根据设备的 Device Type
      （从 Descriptor Cluster 的 DeviceTypeList 获取）来决定如何展示文案。
      未来可能有新的设备类型复用 BooleanState，true/false 的含义可能完全不同。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    BooleanState 定义了一个事件，当 <code>StateValue</code> 发生变化时由设备端主动上报。
    相比轮询属性，订阅事件是监听状态变化的推荐方式。
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
          <td>StateChange</td>
          <td>Info</td>
          <td>StateValue 发生变化时触发</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">StateChange —— 状态变更事件（0x00）</h3>
  <p>
    当设备的物理状态发生变化（如门被打开、检测到漏水）时，设备会发出此事件。
    事件数据中携带变化后的新 <code>StateValue</code>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>StateValue</td>
          <td><code>0x00</code></td>
          <td>bool</td>
          <td>变化后的新状态值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>事件上报示例：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 1,
        "clusterId": "0x0045",
        "eventId": "0x00"       // StateChange
      },
      "eventNumber": 42,
      "priority": "INFO",
      "data": {
        "0": false              // StateValue = false（状态变化：如门被打开）
      }
    }
  }]
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">订阅 vs 轮询</div>
    <p>
      对于门窗传感器这类设备，状态变化通常很突然且不频繁。
      推荐使用 Subscribe 同时订阅 <code>StateValue</code> 属性和 <code>StateChange</code> 事件，
      这样既能在连接建立时立即获取当前状态，又能实时收到变化通知。
    </p>
  </div>
  <p>订阅请求示例：</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributeRequests": [{
      "endpointId": 1,
      "clusterId": "0x0045",
      "attributeId": "0x00"     // StateValue
    }],
    "eventRequests": [{
      "endpointId": 1,
      "clusterId": "0x0045",
      "eventId": "0x00"         // StateChange
    }]
  }],
  "minIntervalFloor": 0,        // 最短上报间隔（秒）
  "maxIntervalCeiling": 300     // 最长上报间隔（秒）
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个门窗传感器的 BooleanState Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": true          // StateValue = true（正常状态，如门已关闭、无漏水）
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：门窗传感器（ContactSensor）</summary>
    <div class="scenario-content">
      <p>最常见的使用场景。门窗传感器由磁铁和簧片开关组成，门关闭时磁铁靠近簧片，触点闭合。</p>
      <ol>
        <li>从 Descriptor Cluster 确认设备类型为 <code>0x0015</code>（ContactSensor）</li>
        <li>订阅 BooleanState 的 <code>StateValue</code> 属性和 <code>StateChange</code> 事件</li>
        <li>收到 <code>true</code> → 显示「门已关闭」（绿色安全状态）</li>
        <li>收到 <code>false</code> → 显示「门已打开」（黄色提醒状态）</li>
        <li>可结合自动化：门打开超过 5 分钟未关 → 推送提醒</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：水浸传感器（Water Leak Detector）</summary>
    <div class="scenario-content">
      <p>水浸传感器放置在可能漏水的位置（洗衣机旁、热水器下方），检测到水时触发告警。</p>
      <ol>
        <li>订阅 <code>StateChange</code> 事件</li>
        <li>收到 <code>true</code> → 正常，无漏水</li>
        <li>收到 <code>false</code> → 检测到漏水，触发紧急通知</li>
        <li>建议搭配自动化规则：漏水时自动关闭对应区域的智能水阀</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：通用接触式传感器</summary>
    <div class="scenario-content">
      <p>BooleanState 不局限于门窗和水浸，任何需要二值状态的传感器都可以复用。</p>
      <ul>
        <li><strong>冰箱门传感器</strong> —— 门开着时 <code>false</code>，搭配定时提醒</li>
        <li><strong>邮箱传感器</strong> —— 邮箱被打开时触发通知</li>
        <li><strong>抽屉/柜门传感器</strong> —— 安防场景，异常打开时告警</li>
      </ul>
      <p>
        关键是要从 Descriptor Cluster 读取设备类型，根据具体类型决定 UI 文案和图标，
        而不是假设所有 BooleanState 都是门窗传感器。
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
    padding: 0.5rem 0;
  }
</style>`,
  },
  'boolean-state-configuration': {
    title: '布尔状态配置 Cluster · BooleanStateConfiguration（0x0080）',
    description: 'Matter BooleanStateConfiguration Cluster（0x0080）完整参考 — 告警抑制/启用命令、灵敏度级别、AlarmModeBitmap 位图、Feature 特性及典型传感器配置场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>布尔状态配置 Cluster（BooleanStateConfiguration）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0080</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 与 <a href="/clusters/boolean-state/">BooleanState</a> 同一 Endpoint（功能端点）
  </p>
  <p>
    BooleanStateConfiguration 是 <a href="/clusters/boolean-state/">BooleanState（0x0045）</a>的配套 Cluster ——
    BooleanState 负责报告传感器的二值状态（true/false），而 BooleanStateConfiguration 则负责<strong>配置传感器的行为</strong>：
    管理告警输出（视觉闪烁、蜂鸣声）以及调节传感器灵敏度。
  </p>
  <p>
    典型使用场景：门窗传感器检测到门被打开时，BooleanState 的 StateValue 变为 false，
    同时 BooleanStateConfiguration 控制是否亮灯闪烁（Visual）、是否发出蜂鸣声（Audible），
    以及传感器的触发灵敏度等级。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 BooleanState 的关系</div>
    <p>
      这两个 Cluster 必须部署在<strong>同一个 Endpoint</strong> 上。
      BooleanState 是只读的数据源（传感器读数），
      BooleanStateConfiguration 是可配置的行为层（告警 + 灵敏度）。
      开发时不要混淆：读取传感器状态用 BooleanState，配置传感器行为用 BooleanStateConfiguration。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#alarm-bitmap">AlarmModeBitmap</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
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
    BooleanStateConfiguration Cluster 有 2 个命令，分别用于抑制告警和启用/禁用告警。
    两个命令都通过 <a href="#alarm-bitmap">AlarmModeBitmap</a> 位图来指定操作哪些告警通道。
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
          <td>SuppressAlarm</td>
          <td>临时抑制正在响的告警</td>
          <td class="col-required">SPRS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>EnableDisableAlarm</td>
          <td>启用或禁用告警通道</td>
          <td class="col-required">VIS 或 AUD</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">SuppressAlarm —— 抑制告警（0x00）</h3>
  <p>
    临时抑制当前正在激活的告警。例如传感器正在蜂鸣报警，用户按了「静音」按钮后，
    App 发送此命令让蜂鸣暂停。抑制不等于禁用 —— 告警通道仍然是启用的，
    下次传感器再次触发时告警会重新激活。此命令需要设备支持 <strong>SPRS（AlarmSuppress）</strong> 特性。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsToSuppress</td>
          <td>AlarmModeBitmap</td>
          <td>要抑制的告警通道位图（见 <a href="#alarm-bitmap">AlarmModeBitmap</a>）。只能抑制当前在 AlarmsActive 中激活且在 AlarmsSupported 中支持的告警</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">抑制 vs 禁用</div>
    <p>
      <strong>SuppressAlarm（抑制）</strong>：临时静音当前这一次告警，下次触发照常响起。相当于闹钟的「稍后提醒」。<br/>
      <strong>EnableDisableAlarm（禁用）</strong>：永久关闭告警通道，后续触发都不再告警。相当于关掉闹钟。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        水浸传感器检测到漏水，蜂鸣器响起（AlarmsActive 的 Audible 位 = 1）。
        用户已经注意到并在处理，按下 App 中的「静音」按钮。
        App 发送 SuppressAlarm（AlarmsToSuppress = 0x02，即 Audible），
        设备停止蜂鸣，AlarmsSuppressed 的 Audible 位变为 1。
        等用户修好漏水、传感器恢复正常后，抑制自动解除。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">EnableDisableAlarm —— 启用/禁用告警（0x01）</h3>
  <p>
    启用或禁用指定的告警通道。修改的是 <code>AlarmsEnabled</code> 属性，
    决定后续传感器触发时哪些告警通道会响应。此命令需要设备支持至少一个告警特性（VIS 或 AUD）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsToEnableDisable</td>
          <td>AlarmModeBitmap</td>
          <td>新的告警启用位图（见 <a href="#alarm-bitmap">AlarmModeBitmap</a>）。置 1 的通道启用，置 0 的通道禁用。只能设置 AlarmsSupported 中支持的位</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在设置页面关闭了门窗传感器的蜂鸣告警（只保留闪灯提醒）。
        App 发送 EnableDisableAlarm（AlarmsToEnableDisable = 0x01，即只启用 Visual），
        此后传感器触发时只有指示灯闪烁，不再蜂鸣。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    BooleanStateConfiguration Cluster 共有 7 个应用属性，分为灵敏度配置和告警状态两组。
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
          <th>分组</th>
          <th>说明</th>
          <th>所需特性</th>
        </tr>
      </thead>
      <tbody>
        <!-- 灵敏度配置 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CurrentSensitivityLevel</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">灵敏度</a></td>
          <td>当前灵敏度级别</td>
          <td class="col-required">SENS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SupportedSensitivityLevels</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">灵敏度</a></td>
          <td>支持的灵敏度级别数</td>
          <td class="col-required">SENS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>DefaultSensitivityLevel</td>
          <td>uint8</td>
          <td><a href="#group-sensitivity">灵敏度</a></td>
          <td>出厂默认灵敏度级别</td>
          <td class="col-required">SENS</td>
        </tr>
        <!-- 告警状态 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>AlarmsActive</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">告警状态</a></td>
          <td>当前正在激活的告警</td>
          <td class="col-required">VIS 或 AUD</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AlarmsSuppressed</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">告警状态</a></td>
          <td>当前被抑制的告警</td>
          <td class="col-required">SPRS</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>AlarmsEnabled</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">告警状态</a></td>
          <td>已启用的告警通道</td>
          <td class="col-required">VIS 或 AUD</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>AlarmsSupported</td>
          <td>AlarmModeBitmap</td>
          <td><a href="#group-alarm">告警状态</a></td>
          <td>设备支持的告警通道</td>
          <td class="col-required">VIS 或 AUD</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 灵敏度配置（0x0000 ~ 0x0002）====== -->
  <h3 id="group-sensitivity">灵敏度配置（0x0000 ~ 0x0002）</h3>
  <p>
    控制传感器的触发灵敏度。灵敏度用一个从 0 开始的整数级别表示，
    0 是最高灵敏度（最容易触发），数值越大灵敏度越低。
    这组属性需要设备支持 <strong>SENS（SensitivityLevel）</strong> 特性。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">灵敏度级别的含义</div>
    <p>
      级别是一个抽象数值，<strong>0 = 最敏感，数值越大越不敏感</strong>。
      具体每个级别对应的物理参数（如磁场强度阈值、振动幅度等）由设备厂商定义，
      Matter 规范不做规定。应用层建议用「高 / 中 / 低」等文案映射，而非显示原始数字。
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
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>CurrentSensitivityLevel（当前灵敏度）</td>
          <td>uint8</td>
          <td>当前生效的灵敏度级别。可读可写，取值范围 <code>0</code> ~ <code>SupportedSensitivityLevels - 1</code>。<strong>需要 SENS 特性</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SupportedSensitivityLevels（支持级别数）</td>
          <td>uint8</td>
          <td>设备支持的灵敏度级别总数。最小值为 2（至少有高和低两档）。只读，由设备固件决定。<strong>需要 SENS 特性</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>DefaultSensitivityLevel（默认灵敏度）</td>
          <td>uint8</td>
          <td>出厂默认的灵敏度级别。只读。App 可以提供「恢复默认」按钮，将 CurrentSensitivityLevel 写回此值。<strong>需要 SENS 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>灵敏度级别映射示例</summary>
    <div class="scenario-content">
      <p>假设一个门窗传感器支持 3 个灵敏度级别（SupportedSensitivityLevels = 3）：</p>
      <ul>
        <li><code>0</code> = 高灵敏度 —— 轻微振动即触发（适合贵重物品柜）</li>
        <li><code>1</code> = 中灵敏度 —— 正常开关门触发（默认，适合大多数场景）</li>
        <li><code>2</code> = 低灵敏度 —— 只有明显开门才触发（适合有风的环境，减少误报）</li>
      </ul>
    </div>
  </details>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 告警状态（0x0003 ~ 0x0006）====== -->
  <h3 id="group-alarm">告警状态（0x0003 ~ 0x0006）</h3>
  <p>
    管理传感器的告警输出通道。所有告警属性都使用 <a href="#alarm-bitmap">AlarmModeBitmap</a> 类型，
    通过位图控制视觉（闪灯）和听觉（蜂鸣）两种告警模式。
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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>AlarmsActive（激活的告警）</td>
          <td>AlarmModeBitmap</td>
          <td>当前正在激活的告警通道。只读，由设备在传感器触发时自动设置。<strong>需要 VIS 或 AUD 特性</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AlarmsSuppressed（被抑制的告警）</td>
          <td>AlarmModeBitmap</td>
          <td>当前被用户抑制（静音）的告警通道。通过 <a href="#cmd-0x00">SuppressAlarm</a> 命令设置。传感器恢复正常后自动清除。<strong>需要 SPRS 特性</strong></td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>AlarmsEnabled（已启用的告警）</td>
          <td>AlarmModeBitmap</td>
          <td>用户配置的告警通道启用状态。通过 <a href="#cmd-0x01">EnableDisableAlarm</a> 命令修改。只有启用的通道才会在传感器触发时激活。<strong>需要 VIS 或 AUD 特性</strong></td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>AlarmsSupported（支持的告警）</td>
          <td>AlarmModeBitmap</td>
          <td>设备硬件支持的告警通道。只读，由设备固件决定。AlarmsEnabled 的有效位不能超出此范围。<strong>需要 VIS 或 AUD 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">四个告警属性的关系</div>
    <p>
      <strong>AlarmsSupported</strong> ⊇ <strong>AlarmsEnabled</strong> ⊇ <strong>AlarmsActive</strong>，
      <strong>AlarmsSuppressed</strong> ⊆ <strong>AlarmsActive</strong>。<br/>
      设备支持哪些通道（Supported）→ 用户启用了哪些（Enabled）→ 当前哪些在响（Active）→ 哪些被临时静音了（Suppressed）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== AlarmModeBitmap ====== -->
  <h2 id="alarm-bitmap">AlarmModeBitmap</h2>
  <p>
    AlarmsActive、AlarmsSuppressed、AlarmsEnabled、AlarmsSupported 四个属性，
    以及两个命令的参数，都使用同一套 AlarmModeBitmap 位图定义。
    每一位代表一种告警输出通道：
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Visual（视觉告警）</span>
        <span class="enum-desc">指示灯闪烁 —— 设备上的 LED 灯闪烁提醒</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Audible（听觉告警）</span>
        <span class="enum-desc">蜂鸣器响铃 —— 发出声音告警提醒</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">位图值速查</div>
    <p>
      <code>0x00</code> = 无告警，
      <code>0x01</code> = 仅闪灯，
      <code>0x02</code> = 仅蜂鸣，
      <code>0x03</code> = 闪灯 + 蜂鸣。
    </p>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    BooleanStateConfiguration 定义了一个 <code>AlarmsStateChanged</code> 事件，
    在告警状态发生任何变化时由设备端主动上报。
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
          <td>AlarmsStateChanged</td>
          <td>Info</td>
          <td>告警状态变化时触发</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">AlarmsStateChanged —— 告警状态变更事件（0x00）</h3>
  <p>
    当告警状态发生变化时（告警激活、解除或被抑制），设备会产生此事件。
    事件携带变化后的完整告警快照。控制器应当订阅此事件以实时获取告警变化通知。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>ID</th><th>类型</th><th>所需特性</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>AlarmsActive</td>
          <td><code>0x00</code></td>
          <td>AlarmModeBitmap</td>
          <td class="col-required">VIS 或 AUD</td>
          <td>变化后当前激活的告警通道（可选字段，设备支持 VIS/AUD 时携带）</td>
        </tr>
        <tr>
          <td>AlarmsSuppressed</td>
          <td><code>0x01</code></td>
          <td>AlarmModeBitmap</td>
          <td class="col-required">SPRS</td>
          <td>变化后当前被抑制的告警通道（可选字段，设备支持 SPRS 时携带）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>事件上报示例（视觉告警激活，听觉告警被抑制）：</p>
  <pre><code>{
  "eventReports": [{
    "eventData": {
      "path": {
        "endpointId": 1,
        "clusterId": "0x0080",
        "eventId": "0x00"       // AlarmsStateChanged
      },
      "eventNumber": 15,
      "priority": "INFO",
      "data": {
        "0": "0x01",            // AlarmsActive = 0x01（视觉告警激活）
        "1": "0x02"             // AlarmsSuppressed = 0x02（听觉告警已抑制）
      }
    }
  }]
}</code></pre>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>BooleanStateConfiguration 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些能力：</p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">VIS（Visual）</span>
        <span class="enum-desc">视觉告警 —— 设备支持 LED 闪烁告警。启用后提供 AlarmsActive/Enabled/Supported 属性（Visual 位有效）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">AUD（Audible）</span>
        <span class="enum-desc">听觉告警 —— 设备支持蜂鸣器声音告警。启用后提供 AlarmsActive/Enabled/Supported 属性（Audible 位有效）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SPRS（AlarmSuppress）</span>
        <span class="enum-desc">告警抑制 —— 支持临时静音正在响的告警。启用后提供 SuppressAlarm 命令和 AlarmsSuppressed 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">SENS（SensitivityLevel）</span>
        <span class="enum-desc">灵敏度级别 —— 支持调节传感器灵敏度。启用后提供 CurrentSensitivityLevel/SupportedSensitivityLevels/DefaultSensitivityLevel 三个属性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">特性组合要求</div>
    <p>
      设备必须至少支持 VIS、AUD、SENS 三个特性中的一个（否则这个 Cluster 没有意义）。
      SPRS（告警抑制）特性需要 VIS 或 AUD 中至少一个同时存在，因为没有告警就无从抑制。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个同时支持视觉告警、听觉告警和灵敏度调节的门窗传感器，读取 BooleanStateConfiguration 属性的结果：</p>

  <pre><code>{
  // --- 灵敏度配置（SENS 特性）---
  "0x0000": 1,              // CurrentSensitivityLevel = 1（当前灵敏度级别）
  "0x0001": 3,              // SupportedSensitivityLevels = 3（支持 0/1/2 三个级别）
  "0x0002": 1,              // DefaultSensitivityLevel = 1（出厂默认级别）

  // --- 告警状态（VIS + AUD 特性）---
  "0x0003": "0x03",         // AlarmsActive = 0x03（视觉 + 听觉告警均已激活）
  "0x0004": "0x00",         // AlarmsSuppressed = 0x00（无告警被抑制）
  "0x0005": "0x03",         // AlarmsEnabled = 0x03（视觉 + 听觉告警均已启用）
  "0x0006": "0x03"          // AlarmsSupported = 0x03（设备支持视觉 + 听觉告警）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      先读 <code>FeatureMap (0xFFFC)</code> 判断设备支持哪些特性。
      只支持 SENS 的设备没有告警相关属性，只支持 VIS/AUD 的设备没有灵敏度属性。
      读取不存在的属性会返回 UNSUPPORTED_ATTRIBUTE 错误。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：门窗传感器告警配置与静音</summary>
    <div class="scenario-content">
      <p>用户安装了一个带蜂鸣器的门窗传感器，希望在夜间只保留闪灯告警（关闭蜂鸣），并能随时静音。</p>
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 VIS + AUD + SPRS</li>
        <li>读取 <code>AlarmsSupported (0x0006)</code>，确认设备支持 Visual（0x01）和 Audible（0x02）</li>
        <li>夜间模式：发送 <code>EnableDisableAlarm</code>，AlarmsToEnableDisable = <code>0x01</code>（仅启用 Visual），关闭蜂鸣</li>
        <li>日间模式：发送 <code>EnableDisableAlarm</code>，AlarmsToEnableDisable = <code>0x03</code>（恢复 Visual + Audible）</li>
        <li>告警响起时：用户按「静音」，发送 <code>SuppressAlarm</code>，AlarmsToSuppress = <code>0x02</code>（抑制蜂鸣）</li>
        <li>订阅 <code>AlarmsStateChanged</code> 事件，实时同步 App 上的告警状态图标</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：水浸传感器灵敏度调节</summary>
    <div class="scenario-content">
      <p>用户的水浸传感器放在洗衣机旁边，正常使用时偶尔溅水导致误报，需要降低灵敏度。</p>
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 SENS 特性</li>
        <li>读取 <code>SupportedSensitivityLevels (0x0001)</code> = 3，表示支持 0/1/2 三档</li>
        <li>读取 <code>DefaultSensitivityLevel (0x0002)</code> = 1，出厂默认为中档</li>
        <li>在设置页面显示滑块：高(0) / 中(1) / 低(2)</li>
        <li>用户选择「低」，写入 <code>CurrentSensitivityLevel (0x0000)</code> = 2</li>
        <li>提供「恢复默认」按钮：点击后将 CurrentSensitivityLevel 写回 DefaultSensitivityLevel 的值（1）</li>
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
</style>`,
  },
  'switch': {
    title: '物理开关 Cluster · Switch（0x003B）',
    description: 'Matter Switch Cluster（0x003B）完整参考 — 物理输入设备（拨动开关、按钮、旋钮）的 Feature Map、属性定义、7 种事件详解、事件驱动模型说明与典型场景示例。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>物理开关 Cluster（Switch）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x003B</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    Switch Cluster 描述的是<strong>物理输入设备</strong> —— 墙壁上的拨动开关、门铃按钮、调光旋钮等。
    它不控制任何输出（开灯、关灯那是 OnOff Cluster 的事），而是<strong>把用户的物理操作转化为事件</strong>，
    由绑定的目标设备或自动化规则来决定具体动作。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">Switch ≠ OnOff</div>
    <p>
      容易混淆的两个 Cluster：<strong>Switch（0x003B）</strong>是物理输入设备，负责上报「用户按了什么」；
      <strong>OnOff（0x0006）</strong>是输出控制，负责执行「设备开还是关」。
      一个墙壁开关面板通常同时包含两者 —— Switch 检测按压动作，OnOff 执行开关控制。
      但 Switch Cluster 本身<strong>没有任何命令</strong>，它是纯粹的事件源。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">事件驱动模型</div>
    <p>
      Switch Cluster 是 Matter 中最典型的<strong>事件驱动 Cluster</strong>。
      它没有命令（不接受外部指令），所有信息通过事件上报。
      控制器（手机、Hub）需要<strong>订阅事件</strong>来感知用户操作，而不是轮询属性变化。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件详解</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    Switch Cluster 的 Feature Map 非常重要 —— 它决定了设备是哪种类型的开关，以及会上报哪些事件。
    设备必须声明 <strong>LS</strong>（锁定开关）或 <strong>MS</strong>（瞬时开关）中的一个，且两者互斥。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LS（Latching Switch）</span>
        <span class="enum-desc">锁定式开关 —— 拨到某个位置后保持不动（如传统墙壁拨动开关）。与 MS 互斥</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">MS（Momentary Switch）</span>
        <span class="enum-desc">瞬时开关 —— 按下后松手会自动回弹（如按钮、门铃）。与 LS 互斥</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MSR（Momentary Switch Release）</span>
        <span class="enum-desc">松手检测 —— 支持检测按钮释放动作。依赖 MS</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">MSL（Momentary Switch Long Press）</span>
        <span class="enum-desc">长按检测 —— 支持区分短按和长按。依赖 MS + MSR</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">MSM（Momentary Switch Multi Press）</span>
        <span class="enum-desc">多次按压 —— 支持双击、三击等连续按压检测。依赖 MS + MSR</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 依赖关系</div>
    <p>
      <strong>LS</strong> 和 <strong>MS</strong> 二选一，不能同时声明。<br/>
      <strong>MSR</strong> 依赖 MS（只有瞬时开关才有「松手」概念）。<br/>
      <strong>MSL</strong> 和 <strong>MSM</strong> 都依赖 MS + MSR（需要精确的按下/释放时机才能判断长按或连击）。
    </p>
  </div>

  <h3>Feature 组合示例</h3>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>设备类型</th>
          <th>Feature 值</th>
          <th>启用的 Feature</th>
          <th>支持的事件</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>传统墙壁拨动开关</td>
          <td><code>0x01</code></td>
          <td>LS</td>
          <td>SwitchLatched</td>
        </tr>
        <tr>
          <td>简单按钮</td>
          <td><code>0x06</code></td>
          <td>MS + MSR</td>
          <td>InitialPress, ShortRelease</td>
        </tr>
        <tr>
          <td>支持长按的按钮</td>
          <td><code>0x0E</code></td>
          <td>MS + MSR + MSL</td>
          <td>InitialPress, ShortRelease, LongPress, LongRelease</td>
        </tr>
        <tr>
          <td>全功能按钮（长按 + 连击）</td>
          <td><code>0x1E</code></td>
          <td>MS + MSR + MSL + MSM</td>
          <td>全部瞬时事件</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>Switch Cluster 只有 3 个属性，都是只读的。开关的核心信息通过事件上报，属性主要用于描述设备能力。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>必选</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>NumberOfPositions</td>
          <td>uint8</td>
          <td class="col-required">是</td>
          <td>开关的位置总数。最小值为 <code>2</code>。普通开关是 2（开/关），多档旋钮可以更多</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPosition</td>
          <td>uint8</td>
          <td class="col-required">是</td>
          <td>当前所在位置，范围 <code>0</code> ~ <code>NumberOfPositions - 1</code>。对于锁定式开关，这个值在拨动后持久保持；对于瞬时开关，按下时变化、松手后可能回到 0</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MultiPressMax</td>
          <td>uint8</td>
          <td class="col-optional">MSM</td>
          <td>设备支持的最大连续按压次数。例如值为 <code>3</code> 表示最多识别三连击。<strong>仅在启用 MSM Feature 时存在</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">位置编号从 0 开始</div>
    <p>
      位置编号从 <code>0</code> 开始。一个两位拨动开关的位置是 0 和 1，不是 1 和 2。
      如果是一个 4 档旋钮，位置就是 0、1、2、3。
    </p>
  </div>

  <!-- ====== 事件详解 ====== -->
  <h2 id="events">事件详解（Events）</h2>
  <p>
    事件是 Switch Cluster 的<strong>核心</strong>。所有用户操作都通过事件上报给控制器。
    不同 Feature 组合决定设备会上报哪些事件。点击下方表格中的事件 ID 可跳转到详细说明。
  </p>

  <!-- 事件汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>所需 Feature</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>SwitchLatched</td>
          <td class="col-required">LS</td>
          <td>锁定式开关拨到新位置</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>InitialPress</td>
          <td class="col-required">MS</td>
          <td>瞬时按钮被按下</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x02">
          <td><a href="#event-0x02"><code>0x02</code></a></td>
          <td>LongPress</td>
          <td class="col-required">MS + MSL</td>
          <td>按钮被长按（超过阈值未松手）</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x03">
          <td><a href="#event-0x03"><code>0x03</code></a></td>
          <td>ShortRelease</td>
          <td class="col-required">MS + MSR</td>
          <td>按钮短按后松手</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x04">
          <td><a href="#event-0x04"><code>0x04</code></a></td>
          <td>LongRelease</td>
          <td class="col-required">MS + MSL</td>
          <td>按钮长按后松手</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x05">
          <td><a href="#event-0x05"><code>0x05</code></a></td>
          <td>MultiPressOngoing</td>
          <td class="col-required">MS + MSM</td>
          <td>连续按压进行中（每次按下都上报）</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x06">
          <td><a href="#event-0x06"><code>0x06</code></a></td>
          <td>MultiPressComplete</td>
          <td class="col-required">MS + MSM</td>
          <td>连续按压结束（上报总次数）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 事件逐条详解 ====== -->

  <!-- SwitchLatched -->
  <h3 id="event-0x00">SwitchLatched —— 锁定开关拨动（0x00）</h3>
  <p>
    当锁定式开关（Latching Switch）被拨到一个新位置时触发。
    这是 LS 类型设备唯一会上报的事件 —— 简单直接：拨了就报，报完就没了。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>开关被拨到的新位置</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>传统墙壁拨动开关：用户把开关从「下」拨到「上」，设备上报 <code>SwitchLatched {'{ NewPosition: 1 }'}</code>。
         控制器收到后通过绑定关系向灯发送 On 命令。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- InitialPress -->
  <h3 id="event-0x01">InitialPress —— 按下（0x01）</h3>
  <p>
    瞬时按钮被按下的瞬间触发。这是所有瞬时开关（MS）操作序列的起点 ——
    无论后续是短按、长按还是连击，都从 InitialPress 开始。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>按下后的位置（通常为 <code>1</code>）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>用户按下门铃按钮，设备立即上报 <code>InitialPress {'{ NewPosition: 1 }'}</code>。
         控制器可以在这个时刻就触发门铃响铃，不用等松手。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- LongPress -->
  <h3 id="event-0x02">LongPress —— 长按（0x02）</h3>
  <p>
    按钮被持续按住，超过设备内部的长按阈值后触发。
    在 InitialPress 之后、松手之前上报。需要 <strong>MSL</strong> Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>按住时的位置（与 InitialPress 的 NewPosition 一致）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>调光按钮：短按切换开关，长按开始调亮度。
         用户按住不放，收到 LongPress 后控制器开始持续调整灯的亮度（通过 LevelControl Cluster 的 MoveWithOnOff 命令），
         直到收到 LongRelease 时停止调整。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ShortRelease -->
  <h3 id="event-0x03">ShortRelease —— 短按松手（0x03）</h3>
  <p>
    按钮在触发 LongPress 之前被松开时触发（即：这是一次短按）。
    需要 <strong>MSR</strong> Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>按下时的位置（即松手前的位置）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">注意字段名</div>
    <p>
      ShortRelease 和 LongRelease 的字段是 <strong>PreviousPosition</strong>（松手前的位置），
      而 InitialPress 和 LongPress 的字段是 <strong>NewPosition</strong>（按下后的位置）。
      虽然数值通常相同，但语义不同 —— 一个描述「按下去到哪」，一个描述「从哪松开」。
    </p>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>智能按钮：收到 ShortRelease 确认这是一次短按，执行对应的短按动作（如 Toggle 开关灯）。
         如果启用了 MSM Feature，设备会等待判断是否有后续按压（连击），此时 ShortRelease 可能不会立即触发。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- LongRelease -->
  <h3 id="event-0x04">LongRelease —— 长按松手（0x04）</h3>
  <p>
    在 LongPress 触发之后松手时触发（即：长按结束）。
    需要 <strong>MSL</strong> Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>长按时的位置（即松手前的位置）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>调光按钮长按松手：收到 LongRelease 后，控制器停止亮度调整（发送 StopWithOnOff 命令），灯保持在当前亮度。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- MultiPressOngoing -->
  <h3 id="event-0x05">MultiPressOngoing —— 连续按压进行中（0x05）</h3>
  <p>
    在连续快速按压过程中，<strong>每次按下</strong>都会触发此事件，携带当前已累计的按压次数。
    需要 <strong>MSM</strong> Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewPosition</td>
          <td>uint8</td>
          <td>按下后的位置</td>
        </tr>
        <tr>
          <td>CurrentNumberOfPressesCounted</td>
          <td>uint8</td>
          <td>到目前为止已累计的按压次数（从 2 开始，因为第一次按压是 InitialPress）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>用户快速三连击按钮。事件序列：</p>
      <ol>
        <li><code>InitialPress {'{ NewPosition: 1 }'}</code> —— 第一次按下</li>
        <li><code>MultiPressOngoing {'{ NewPosition: 1, CurrentNumberOfPressesCounted: 2 }'}</code> —— 第二次按下</li>
        <li><code>MultiPressOngoing {'{ NewPosition: 1, CurrentNumberOfPressesCounted: 3 }'}</code> —— 第三次按下</li>
        <li><code>MultiPressComplete {'{ PreviousPosition: 1, TotalNumberOfPressesCounted: 3 }'}</code> —— 连击结束</li>
      </ol>
      <p>控制器通常等 MultiPressComplete 再执行动作，而不是对每个 Ongoing 都响应。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- MultiPressComplete -->
  <h3 id="event-0x06">MultiPressComplete —— 连续按压结束（0x06）</h3>
  <p>
    连续按压结束后触发，携带最终的总按压次数。这是控制器判断用户意图的关键事件 ——
    根据总次数决定执行什么动作（单击、双击、三击等）。
    需要 <strong>MSM</strong> Feature。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PreviousPosition</td>
          <td>uint8</td>
          <td>按压时的位置</td>
        </tr>
        <tr>
          <td>TotalNumberOfPressesCounted</td>
          <td>uint8</td>
          <td>总按压次数。值为 <code>1</code> 表示单击，<code>2</code> 表示双击，以此类推。最大值不超过 MultiPressMax</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">TotalNumberOfPressesCounted = 0 的特殊含义</div>
    <p>
      如果 <code>TotalNumberOfPressesCounted</code> 为 <code>0</code>，表示这次连续按压<strong>无效</strong>
      （例如按压次数超过了 MultiPressMax，或者设备判定为误触）。控制器收到 0 时不应执行任何动作。
    </p>
  </div>
  <details class="scenario">
    <summary>典型场景</summary>
    <div class="scenario-content">
      <p>Aqara 无线按钮：单击开灯、双击切换场景、三击关闭所有灯。
         控制器等收到 MultiPressComplete 后，根据 TotalNumberOfPressesCounted 的值分发不同自动化动作。</p>
    </div>
  </details>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== 事件序列图 ====== -->
  <h3 id="event-sequences">事件序列对比</h3>
  <p>不同操作方式下的事件上报顺序：</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>操作</th>
          <th>事件序列</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>拨动（LS）</td>
          <td><code>SwitchLatched</code></td>
        </tr>
        <tr>
          <td>短按（MS+MSR）</td>
          <td><code>InitialPress</code> &#8594; <code>ShortRelease</code></td>
        </tr>
        <tr>
          <td>长按（MS+MSR+MSL）</td>
          <td><code>InitialPress</code> &#8594; <code>LongPress</code> &#8594; <code>LongRelease</code></td>
        </tr>
        <tr>
          <td>双击（MS+MSR+MSM）</td>
          <td><code>InitialPress</code> &#8594; <code>MultiPressOngoing(2)</code> &#8594; <code>MultiPressComplete(2)</code></td>
        </tr>
        <tr>
          <td>单击（MS+MSR+MSM，等待后确认）</td>
          <td><code>InitialPress</code> &#8594; <code>MultiPressComplete(1)</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个支持长按和双击的智能按钮（Feature: MS+MSR+MSL+MSM）的属性读取结果：</p>

  <pre><code>{
  // --- 开关位置 ---
  "0x0000": 2,              // NumberOfPositions = 2（两个位置，如常见的上/下拨动开关）
  "0x0001": 0,              // CurrentPosition = 0（当前处于位置 0）

  // --- 多次按压 ---
  "0x0002": 3               // MultiPressMax = 3（最多识别 3 连按）
}</code></pre>

  <h3>事件订阅与接收示例</h3>
  <p>订阅 Switch Cluster 的事件，以及收到事件时的数据格式：</p>

  <pre><code>// 事件订阅示例 —— 订阅 Switch Cluster 的所有事件
{
  "subscribeRequest": {
    "eventRequests": [{
      "endpoint": 1,
      "cluster": "0x003B"    // Switch Cluster
    }],
    "minInterval": 0,
    "maxInterval": 60
  }
}

// 收到的 InitialPress 事件
{
  "eventPath": {
    "endpoint": 1,
    "cluster": "0x003B",
    "event": "0x01"          // InitialPress
  },
  "eventData": {
    "NewPosition": 1         // 按下后的位置
  }
}

// 收到的 MultiPressComplete 事件
{
  "eventPath": {
    "endpoint": 1,
    "cluster": "0x003B",
    "event": "0x06"          // MultiPressComplete
  },
  "eventData": {
    "PreviousPosition": 1,
    "TotalNumberOfPressesCounted": 2  // 总共按了 2 次（双击）
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      Switch Cluster 的属性很少，核心价值在事件。开发时重点关注：
    </p>
    <ul>
      <li>先读 <code>FeatureMap (0xFFFC)</code> 判断设备支持哪些操作模式</li>
      <li>订阅事件而不是轮询 <code>CurrentPosition</code></li>
      <li>如果支持 MSM，读取 <code>MultiPressMax</code> 知道最多几连击</li>
      <li>对于支持多种操作的按钮，建议在 UI 中提示用户可配置单击/双击/长按的动作</li>
    </ul>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：墙壁拨动开关（Latching Switch）</summary>
    <div class="scenario-content">
      <p><strong>设备</strong>：传统上下拨动式墙壁开关，Feature = LS（0x01）</p>
      <ol>
        <li>设备声明 <code>NumberOfPositions = 2</code>（上/下两个位置）</li>
        <li>用户把开关从下拨到上，设备上报 <code>SwitchLatched {'{ NewPosition: 1 }'}</code></li>
        <li>控制器通过绑定关系找到对应的灯，发送 <code>On</code> 命令</li>
        <li>用户把开关从上拨到下，设备上报 <code>SwitchLatched {'{ NewPosition: 0 }'}</code></li>
        <li>控制器发送 <code>Off</code> 命令，灯关闭</li>
      </ol>
      <p>这种开关最简单 —— 一个事件、一个动作，没有长按和连击的概念。开关位置和灯的状态是物理对应的。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：调光旋钮 / 调光按钮（Dimmer）</summary>
    <div class="scenario-content">
      <p><strong>设备</strong>：带按压功能的旋钮或调光按钮，Feature = MS + MSR + MSL（0x0E）</p>
      <ol>
        <li>用户<strong>短按</strong>：收到 InitialPress &#8594; ShortRelease，控制器执行 Toggle（切换开关）</li>
        <li>用户<strong>长按</strong>：
          <ul>
            <li>收到 InitialPress —— 暂不动作，等后续事件</li>
            <li>收到 LongPress —— 开始连续调亮度（发送 MoveWithOnOff 命令）</li>
            <li>收到 LongRelease —— 停止调亮度（发送 StopWithOnOff 命令）</li>
          </ul>
        </li>
      </ol>
      <p>关键设计：不要在 InitialPress 时就执行 Toggle，否则长按也会先触发一次开关切换。
         正确做法是等 ShortRelease 或 LongPress 再决定动作。</p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：多功能无线按钮（Multi Press）</summary>
    <div class="scenario-content">
      <p><strong>设备</strong>：Aqara / Eve 等无线智能按钮，Feature = MS + MSR + MSL + MSM（0x1E），MultiPressMax = 3</p>
      <ol>
        <li><strong>单击</strong>（等待超时后确认）：InitialPress &#8594; MultiPressComplete(1) &#8594; 执行动作 A（如开灯）</li>
        <li><strong>双击</strong>：InitialPress &#8594; MultiPressOngoing(2) &#8594; MultiPressComplete(2) &#8594; 执行动作 B（如切换场景）</li>
        <li><strong>三击</strong>：InitialPress &#8594; MultiPressOngoing(2) &#8594; MultiPressOngoing(3) &#8594; MultiPressComplete(3) &#8594; 执行动作 C（如全屋关灯）</li>
        <li><strong>长按</strong>：InitialPress &#8594; LongPress &#8594; LongRelease &#8594; 执行动作 D（如进入配对模式）</li>
      </ol>
      <p>在 App 中，可以让用户自定义每种操作对应的自动化动作，类似 Apple HomeKit 的按钮配置界面。</p>
      <p><strong>注意</strong>：单击的确认有延迟 —— 设备要等一小段时间确认没有后续按压才上报 MultiPressComplete(1)。
         这是为了区分单击和双击的第一下，用户能感知到轻微的响应延迟。</p>
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
</style>`,
  },
};
