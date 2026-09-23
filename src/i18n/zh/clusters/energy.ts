import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'electrical-power-measurement': {
    title: '电功率测量 Cluster · ElectricalPowerMeasurement（0x0090）',
    description: 'Matter ElectricalPowerMeasurement Cluster（0x0090）完整参考 — 电压、电流、有功/无功/视在功率、RMS 测量值、频率、谐波、功率因数等全部属性定义，Feature 位图（DC/AC/多相/谐波）、MeasurementPeriodRanges 事件及实际应用场景。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>电功率测量 Cluster（ElectricalPowerMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0090</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 电气设备功能端点
  </p>
  <p>
    ElectricalPowerMeasurement 用于实时测量电气设备的电功率参数 —— 电压、电流、有功功率、无功功率、视在功率、频率、功率因数等。
    它是 Matter 能源管理体系中的核心测量 Cluster，适用于智能插座、电表、充电桩、电力监控面板等需要精确电力数据的设备。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">单位陷阱：毫伏 / 毫安 / 毫瓦</div>
    <p>
      所有电压值以 <strong>mV</strong>（毫伏）为单位，电流以 <strong>mA</strong>（毫安），功率以 <strong>mW</strong>（毫瓦），频率以 <strong>mHz</strong>（毫赫兹）。
      设备返回 <code>220300</code> 的电压，实际是 <code>220.3 V</code>；返回 <code>334856</code> 的功率，实际是 <code>334.856 W</code>。
      <strong>展示时必须除以 1000</strong>，否则用户会看到天文数字。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">DC vs AC：Feature 决定可用属性</div>
    <p>
      这个 Cluster 通过 Feature 位图区分直流（DIRC）和交流（ALTC）场景。
      ReactiveCurrent、ApparentCurrent、ReactivePower、ApparentPower、RMS 系列、Frequency、PowerFactor 等属性
      <strong>仅在启用 ALTC（交流电）特性时才可用</strong>。
      直流设备（如太阳能面板、电池）只上报 Voltage、ActiveCurrent、ActivePower 等基础属性。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举定义</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    ElectricalPowerMeasurement 共有 19 个应用属性，分为基本信息、实时测量值、RMS 测量值、谐波数据四组。
    点击属性 ID 可跳转到对应分组的详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>分组</th>
          <th>所需特性</th>
        </tr>
      </thead>
      <tbody>
        <!-- 基本信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PowerMode</td>
          <td>PowerModeEnum</td>
          <td><a href="#group-basic">基本信息</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>NumberOfMeasurementTypes</td>
          <td>uint8</td>
          <td><a href="#group-basic">基本信息</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>Accuracy</td>
          <td>list&lt;MeasurementAccuracyStruct&gt;</td>
          <td><a href="#group-basic">基本信息</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>Ranges</td>
          <td>list&lt;MeasurementRangeStruct&gt;</td>
          <td><a href="#group-basic">基本信息</a></td>
          <td class="col-optional">无</td>
        </tr>
        <!-- 实时测量值 -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>Voltage</td>
          <td>int64 (mV)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>ActiveCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ReactiveCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ApparentCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ActivePower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>ReactivePower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>ApparentPower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-realtime">实时测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <!-- RMS 测量值 -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>RMSVoltage</td>
          <td>int64 (mV)</td>
          <td><a href="#group-rms">RMS 测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>RMSCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-rms">RMS 测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>RMSPower</td>
          <td>int64 (mW)</td>
          <td><a href="#group-rms">RMS 测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000E">
          <td><a href="#attr-0x000E"><code>0x000E</code></a></td>
          <td>Frequency</td>
          <td>int64 (mHz)</td>
          <td><a href="#group-rms">RMS 测量</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <!-- 谐波与功率因数 -->
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>HarmonicCurrents</td>
          <td>list&lt;HarmonicMeasurementStruct&gt;</td>
          <td><a href="#group-harmonics">谐波与补充</a></td>
          <td class="col-required">HARM</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>HarmonicPhases</td>
          <td>list&lt;HarmonicMeasurementStruct&gt;</td>
          <td><a href="#group-harmonics">谐波与补充</a></td>
          <td class="col-required">HARM</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>PowerFactor</td>
          <td>int64</td>
          <td><a href="#group-harmonics">谐波与补充</a></td>
          <td class="col-required">ALTC</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>NeutralCurrent</td>
          <td>int64 (mA)</td>
          <td><a href="#group-harmonics">谐波与补充</a></td>
          <td class="col-required">POLY</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 基本信息（0x0000 ~ 0x0003）====== -->
  <h3 id="group-basic">基本信息（0x0000 ~ 0x0003）</h3>
  <p>描述设备的供电模式、支持的测量类型数量、精度声明和历史测量范围。</p>

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
          <td>PowerMode（供电模式）</td>
          <td>PowerModeEnum</td>
          <td>设备的供电类型：Unknown / DC / AC（见下方枚举）。必选属性</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>NumberOfMeasurementTypes（测量类型数量）</td>
          <td>uint8</td>
          <td>设备支持的测量类型总数，对应 <code>Accuracy</code> 列表的长度。必选属性</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>Accuracy（精度声明）</td>
          <td>list&lt;MeasurementAccuracyStruct&gt;</td>
          <td>列出设备支持的每种测量类型及其精度范围。每个元素包含 MeasurementType、是否被测量、精度区间等。必选属性</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>Ranges（测量范围统计）</td>
          <td>list&lt;MeasurementRangeStruct&gt;</td>
          <td>设备在一段时间内记录的各测量类型的最小/最大/起止时间等统计信息。可选属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Accuracy 的实际用途</div>
    <p>
      <code>Accuracy</code> 属性告诉你设备能测什么、测得多准。App 端应先读取这个属性，
      再决定展示哪些测量值。如果某个测量类型不在 Accuracy 列表中，即使属性存在也不应使用。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 实时测量值（0x0004 ~ 0x000A）====== -->
  <h3 id="group-realtime">实时测量值（0x0004 ~ 0x000A）</h3>
  <p>设备当前的电压、电流和功率瞬时值。所有值均为 Nullable —— 返回 <code>null</code> 表示当前数据无效。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>单位</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>Voltage（电压）</td>
          <td>mV</td>
          <td>瞬时电压。<code>220300</code> = 220.3 V。可选，Nullable</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>ActiveCurrent（有功电流）</td>
          <td>mA</td>
          <td>瞬时有功电流。<code>1520</code> = 1.52 A。可选，Nullable</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ReactiveCurrent（无功电流）</td>
          <td>mA</td>
          <td>瞬时无功电流。仅交流电设备。<strong>需要 ALTC</strong>，Nullable</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ApparentCurrent（视在电流）</td>
          <td>mA</td>
          <td>瞬时视在电流（有功 + 无功的矢量和）。<strong>需要 ALTC</strong>，Nullable</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ActivePower（有功功率）</td>
          <td>mW</td>
          <td>瞬时有功功率（实际做功的部分）。<code>334856</code> = 334.856 W。必选属性，Nullable</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>ReactivePower（无功功率）</td>
          <td>mW</td>
          <td>瞬时无功功率（不做有效功的部分）。单位实际为 mVAR。<strong>需要 ALTC</strong>，Nullable</td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>ApparentPower（视在功率）</td>
          <td>mW</td>
          <td>瞬时视在功率（有功 + 无功的总量）。单位实际为 mVA。<strong>需要 ALTC</strong>，Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">有功 / 无功 / 视在功率的关系</div>
    <p>
      <strong>有功功率</strong>（Active Power）= 实际消耗的电能，电费按这个算。<br/>
      <strong>无功功率</strong>（Reactive Power）= 电感/电容导致的「来回搬运」，不做有效功但占用线路容量。<br/>
      <strong>视在功率</strong>（Apparent Power）= 两者的矢量和，代表线路的总负载能力。<br/>
      关系：<code>ApparentPower&sup2; = ActivePower&sup2; + ReactivePower&sup2;</code>
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== RMS 测量值（0x000B ~ 0x000E）====== -->
  <h3 id="group-rms">RMS 测量值（0x000B ~ 0x000E）</h3>
  <p>
    交流电的 RMS（均方根）测量值 —— 交流电的有效值。对于纯正弦波，RMS 值 = 峰值 / &radic;2。
    这组属性全部需要 <strong>ALTC</strong> 特性。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>单位</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>RMSVoltage（RMS 电压）</td>
          <td>mV</td>
          <td>交流电压有效值。家用电 220V 对应约 <code>220000</code>。Nullable</td>
        </tr>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>RMSCurrent（RMS 电流）</td>
          <td>mA</td>
          <td>交流电流有效值。Nullable</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>RMSPower（RMS 功率）</td>
          <td>mW</td>
          <td>交流功率有效值。Nullable</td>
        </tr>
        <tr id="attr-0x000E">
          <td><code>0x000E</code></td>
          <td>Frequency（频率）</td>
          <td>mHz</td>
          <td>交流电频率。<code>50000</code> = 50.0 Hz（中国标准），<code>60000</code> = 60.0 Hz（美国标准）。Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 谐波与补充属性（0x000F ~ 0x0012）====== -->
  <h3 id="group-harmonics">谐波与补充属性（0x000F ~ 0x0012）</h3>
  <p>谐波分析数据和功率因数、中性线电流。谐波属性需要 HARM 特性，功率因数需要 ALTC，中性线电流需要 POLY。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>所需特性</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>HarmonicCurrents（谐波电流）</td>
          <td class="col-required">HARM</td>
          <td>各次谐波的电流幅值列表（HarmonicMeasurementStruct），用于电能质量分析。Nullable</td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>HarmonicPhases（谐波相位）</td>
          <td class="col-required">HARM</td>
          <td>各次谐波的相位角列表（HarmonicMeasurementStruct）。Nullable</td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>PowerFactor（功率因数）</td>
          <td class="col-required">ALTC</td>
          <td>有功功率与视在功率的比值，以百分比的 100 倍表示。<code>9960</code> = 99.60%。范围 -10000 ~ 10000。Nullable</td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>NeutralCurrent（中性线电流）</td>
          <td class="col-required">POLY</td>
          <td>多相系统中中性线（零线）的电流。三相不平衡时此值较大。Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">PowerFactor 实际含义</div>
    <p>
      功率因数 = 有功功率 / 视在功率。值越接近 100%（即 10000），说明电能利用效率越高。
      纯电阻负载（电热水壶）接近 100%，带电机的设备（空调、冰箱）通常 80%~95%。
      负值表示设备在向电网回馈电能（如光伏逆变器）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-power-mode">PowerModeEnum（供电模式）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知供电模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">DC</span>
        <span class="enum-desc">直流电（太阳能面板、电池系统、USB 供电设备）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AC</span>
        <span class="enum-desc">交流电（家用电器、工业设备、电网供电）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-measurement-type">MeasurementTypeEnum（测量类型）</h3>
  <p>用于 <code>Accuracy</code> 和 <code>Ranges</code> 中标识具体的测量种类：</p>
  <div class="enum-cards">
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
        <span class="enum-name">Voltage</span>
        <span class="enum-desc">电压（mV）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActiveCurrent</span>
        <span class="enum-desc">有功电流（mA）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ReactiveCurrent</span>
        <span class="enum-desc">无功电流（mA）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">ApparentCurrent</span>
        <span class="enum-desc">视在电流（mA）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">ActivePower</span>
        <span class="enum-desc">有功功率（mW）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ReactivePower</span>
        <span class="enum-desc">无功功率（mVAR）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">ApparentPower</span>
        <span class="enum-desc">视在功率（mVA）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">RMSVoltage</span>
        <span class="enum-desc">RMS 电压（mV）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">RMSCurrent</span>
        <span class="enum-desc">RMS 电流（mA）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">RMSPower</span>
        <span class="enum-desc">RMS 功率（mW）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Frequency</span>
        <span class="enum-desc">频率（mHz）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">PowerFactor</span>
        <span class="enum-desc">功率因数（1/100）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">NeutralCurrent</span>
        <span class="enum-desc">中性线电流（mA）</span>
      </div>
    </div>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    ElectricalPowerMeasurement 定义了一个事件，用于周期性上报各测量类型在一段时间内的统计范围。
    这是获取历史峰值、谷值数据的主要方式。
  </p>

  <h3 id="event-ranges">MeasurementPeriodRanges</h3>
  <p>
    <strong>优先级</strong>: INFO &nbsp;|&nbsp;
    <strong>触发时机</strong>: 设备完成一个测量周期后自动上报
  </p>
  <p>
    事件包含一个 <code>Ranges</code> 字段，类型为 <code>list&lt;MeasurementRangeStruct&gt;</code>，
    每个元素记录了某种测量类型在该周期内的最小值、最大值、起止时间戳等统计信息。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">事件 vs 属性中的 Ranges</div>
    <p>
      属性 <code>Ranges (0x0003)</code> 和事件 <code>MeasurementPeriodRanges</code> 都包含 MeasurementRangeStruct 列表，
      但用途不同：属性记录的是<strong>累积范围</strong>（设备运行以来的总极值），
      事件上报的是<strong>单个周期的范围</strong>（最近一段时间内的极值）。App 端应订阅事件来构建历史趋势图。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    ElectricalPowerMeasurement 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的电气测量能力。
    不同 Feature 组合决定了哪些属性可用：
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DIRC（DirectCurrent）</span>
        <span class="enum-desc">直流测量 —— 支持 DC 电压、电流、功率测量</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">ALTC（AlternatingCurrent）</span>
        <span class="enum-desc">交流测量 —— 解锁无功/视在功率、RMS 系列、频率、功率因数</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">POLY（PolyphasePower）</span>
        <span class="enum-desc">多相电力 —— 支持三相电系统，解锁 NeutralCurrent 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">HARM（Harmonics）</span>
        <span class="enum-desc">谐波分析 —— 解锁 HarmonicCurrents 和 HarmonicPhases 属性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">DIRC 和 ALTC 互斥</div>
    <p>
      一个设备要么是直流（DIRC），要么是交流（ALTC），不能同时声明两者。
      POLY 和 HARM 只在 ALTC 基础上生效。
      App 端读取 FeatureMap 后，应据此决定展示哪些属性 —— 不要向 DC 设备请求 RMS 数据。
    </p>
  </div>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    ElectricalPowerMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集电力数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个启用了 ALTC（交流电）特性的智能插座上报的电力数据：</p>
  <pre><code>{
  // --- ElectricalPowerMeasurement Cluster（Endpoint 1）---

  // --- 基本信息 ---
  "0x0000": 2,              // PowerMode = AC（交流电）
  "0x0001": 5,              // NumberOfMeasurementTypes = 5

  // --- 实时测量值 ---
  "0x0004": 220300,         // Voltage = 220300 mV → 220.3 V
  "0x0005": 1520,           // ActiveCurrent = 1520 mA → 1.52 A
  "0x0008": 334856,         // ActivePower = 334856 mW → 334.856 W
  "0x0009": 28700,          // ReactivePower = 28700 mW → 28.7 VAR
  "0x000A": 336100,         // ApparentPower = 336100 mW → 336.1 VA

  // --- RMS 测量值（交流电专用）---
  "0x000B": 219800,         // RMSVoltage = 219800 mV → 219.8 V
  "0x000C": 1530,           // RMSCurrent = 1530 mA → 1.53 A
  "0x000D": 335200,         // RMSPower = 335200 mW → 335.2 W
  "0x000E": 50000,          // Frequency = 50000 mHz → 50.0 Hz

  // --- 功率因数 ---
  "0x0011": 9960            // PowerFactor = 9960 → 99.60%
}</code></pre>

  <p>MeasurementPeriodRanges 事件示例 —— 设备在 1 小时周期内的电压和功率范围统计：</p>
  <pre><code>{
  // MeasurementPeriodRanges 事件
  // 设备在一个测量周期结束时上报，包含各测量类型的统计范围
  "MeasurementPeriodRanges": {
    "Ranges": [
      {
        "MeasurementType": 1,        // Voltage
        "Min": 218500,               // 最低 218.5 V
        "Max": 222100,               // 最高 222.1 V
        "StartTimestamp": 1695600000,
        "EndTimestamp": 1695603600
      },
      {
        "MeasurementType": 5,        // ActivePower
        "Min": 280000,               // 最低 280.0 W
        "Max": 350000,               // 最高 350.0 W
        "StartTimestamp": 1695600000,
        "EndTimestamp": 1695603600
      }
    ]
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">单位换算代码参考</div>
    <p>处理设备返回值时的关键逻辑：</p>
    <pre><code>{\`// 设备返回值（int64, Nullable）
val voltageRaw: Long? = 220300     // mV
val powerRaw: Long? = 334856       // mW
val freqRaw: Long? = 50000         // mHz
val pfRaw: Long? = 9960            // 百分比 × 100

// 转换为可读值
val voltageV = voltageRaw?.let { it / 1000.0 }    // → 220.3 V
val powerW = powerRaw?.let { it / 1000.0 }         // → 334.856 W
val freqHz = freqRaw?.let { it / 1000.0 }          // → 50.0 Hz
val powerFactor = pfRaw?.let { it / 100.0 }         // → 99.60%

// 显示时处理 null
val display = voltageV?.let { String.format("%.1f V", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：智能插座实时功率监控面板</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code>，确认设备支持 ALTC（交流电）</li>
        <li>读取 <code>Accuracy (0x0002)</code>，确认设备能测量哪些类型及其精度</li>
        <li>订阅核心属性：<code>ActivePower (0x0008)</code>、<code>RMSVoltage (0x000B)</code>、<code>RMSCurrent (0x000C)</code>，
            设置合理的上报间隔（如 5 秒 ~ 30 秒）</li>
        <li>界面展示：电压 220.3 V、电流 1.52 A、功率 334.9 W、功率因数 99.6%</li>
        <li>可选：订阅 <code>MeasurementPeriodRanges</code> 事件，记录历史峰值用于绘制趋势图</li>
        <li>处理 <code>null</code> 值 —— 展示「--」，不要显示 0，因为 0 和「无数据」含义不同</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：家庭用电异常告警</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>ActivePower (0x0008)</code> 和 <code>RMSCurrent (0x000C)</code>，持续监听</li>
        <li>设定告警阈值：功率超过 2200 W（10A &times; 220V）或电流超过 10000 mA 时触发</li>
        <li>参考 <code>Accuracy</code> 中的精度值设置防抖 —— 如果精度为 &plusmn;5%，阈值附近应留出余量</li>
        <li>触发告警时推送通知，严重时可联动 OnOff Cluster 自动断电保护</li>
        <li>可选：监听 <code>PowerFactor (0x0011)</code>，功率因数持续低于 70% 可能意味着设备异常</li>
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
  'electrical-energy-measurement': {
    title: '电能量测量 Cluster · ElectricalEnergyMeasurement（0x0091）',
    description: 'Matter ElectricalEnergyMeasurement Cluster（0x0091）完整参考 — 累计/周期电能测量、EnergyMeasurementStruct 数据结构、Feature 位图（IMPE/EXPE/CUME/PERE）、事件订阅、与 ElectricalPowerMeasurement 的关系。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>电能量测量 Cluster（ElectricalEnergyMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0091</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在电气设备端点（如智能插座、电能表、充电桩）
  </p>
  <p>
    ElectricalEnergyMeasurement 负责记录设备随时间累积的电能消耗（或输出）。
    与实时测量瞬时功率的 <a href="../electrical-power-measurement/">ElectricalPowerMeasurement（0x0090）</a> 不同，
    这个 Cluster 关注的是<strong>「一共用了多少电」</strong>和<strong>「这段时间用了多少电」</strong>。
    两者通常共存于同一个 Endpoint，前者像车速表，后者像里程表。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">能量单位：毫瓦时（mWh）</div>
    <p>
      所有能量值的单位都是 <strong>mWh（毫瓦时）</strong>，类型为 int64。
      设备返回 <code>12345678</code>，实际电能是 <code>12,345.678 Wh</code> 即 <code>12.35 kWh</code>。
      <strong>展示时需要做单位换算</strong>：除以 1000 得 Wh，再除以 1000 得 kWh。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">累计 vs 周期</div>
    <p>
      这个 Cluster 有两种计量模式，由 Feature 决定：<br/>
      <strong>累计（Cumulative）</strong>：从某个起点开始，持续累加的总电能，类似电表读数，只增不减（除非重置）。<br/>
      <strong>周期（Periodic）</strong>：每个测量周期内消耗的电能，周期结束后归零重新计算，适合统计「过去一小时用了多少电」。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#structs">数据结构</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>
  <p>
    ElectricalEnergyMeasurement 使用两个核心 Struct 来承载数据。
    理解这两个结构体是读懂整个 Cluster 的基础。
  </p>

  <h3 id="struct-energy">EnergyMeasurementStruct（电能测量数据）</h3>
  <p>
    每一次能量读数都用这个结构体表示。它包含能量值和对应的时间范围。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>必选</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Energy</td>
          <td>int64</td>
          <td>是</td>
          <td>电能值，单位 mWh（毫瓦时）。累计模式下只增不减，周期模式下每周期重置</td>
        </tr>
        <tr>
          <td>StartTimestamp</td>
          <td>epoch_s</td>
          <td>否</td>
          <td>测量区间的起始 UTC 时间（秒级 Unix 时间戳）</td>
        </tr>
        <tr>
          <td>EndTimestamp</td>
          <td>epoch_s</td>
          <td>否</td>
          <td>测量区间的结束 UTC 时间（即最新更新时间）</td>
        </tr>
        <tr>
          <td>StartSystime</td>
          <td>systime_ms</td>
          <td>否</td>
          <td>测量区间的起始系统时间（毫秒，设备本地单调时钟）</td>
        </tr>
        <tr>
          <td>EndSystime</td>
          <td>systime_ms</td>
          <td>否</td>
          <td>测量区间的结束系统时间（毫秒）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Timestamp vs Systime</div>
    <p>
      时间字段提供两套来源：<code>Timestamp</code> 是 UTC 墙钟时间（需要设备同步过 NTP），
      <code>Systime</code> 是设备启动后的单调递增时钟（不依赖网络，但重启会归零）。
      设备至少提供其中一套；如果两套都有，优先使用 <code>Timestamp</code>。
    </p>
  </div>

  <h3 id="struct-reset">CumulativeEnergyResetStruct（累计重置信息）</h3>
  <p>
    记录累计电能值上次被重置的时间。用于判断当前累计读数的起算时间。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>字段</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ImportedResetTimestamp</td>
          <td>epoch_s</td>
          <td>输入侧累计值上次重置的 UTC 时间</td>
        </tr>
        <tr>
          <td>ExportedResetTimestamp</td>
          <td>epoch_s</td>
          <td>输出侧累计值上次重置的 UTC 时间</td>
        </tr>
        <tr>
          <td>ImportedResetSystime</td>
          <td>systime_ms</td>
          <td>输入侧累计值上次重置的系统时间</td>
        </tr>
        <tr>
          <td>ExportedResetSystime</td>
          <td>systime_ms</td>
          <td>输出侧累计值上次重置的系统时间</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#structs">&#8593; 返回数据结构</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>ElectricalEnergyMeasurement 共有 6 个应用属性。点击属性 ID 可跳转到详细说明。</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>所需特性</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Accuracy</td>
          <td>MeasurementAccuracyStruct</td>
          <td class="col-optional">无（必选）</td>
          <td>测量精度描述</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CumulativeEnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">IMPE &amp; CUME</td>
          <td>累计输入电能（用电量）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CumulativeEnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">EXPE &amp; CUME</td>
          <td>累计输出电能（发电量）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PeriodicEnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">IMPE &amp; PERE</td>
          <td>当前周期输入电能</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>PeriodicEnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td class="col-required">EXPE &amp; PERE</td>
          <td>当前周期输出电能</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>CumulativeEnergyReset</td>
          <td>CumulativeEnergyResetStruct</td>
          <td class="col-required">CUME</td>
          <td>累计值重置时间信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性逐项说明 ====== -->
  <h3 id="attr-0x0000">Accuracy（测量精度）</h3>
  <p>
    描述这个电能计量设备的测量精度和量程范围。使用 <code>MeasurementAccuracyStruct</code> 结构体，
    包含测量类型（固定为 ElectricalEnergy）、量程上下限、以及不同区间的精度描述。
    这是唯一的必选属性，所有实现此 Cluster 的设备都必须上报。
  </p>
  <ul>
    <li><strong>类型</strong>: MeasurementAccuracyStruct</li>
    <li><strong>读写</strong>: 只读</li>
    <li><strong>必选</strong>: 是</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CumulativeEnergyImported（累计输入电能）</h3>
  <p>
    从设备开始计量（或上次重置）到现在，设备从电网<strong>输入（消耗）</strong>的总电能。
    这就是日常所说的「总用电量」，类似家用电表的读数。值只增不减，除非通过重置操作归零。
  </p>
  <ul>
    <li><strong>类型</strong>: EnergyMeasurementStruct，Nullable</li>
    <li><strong>所需特性</strong>: IMPE（ImportedEnergy）+ CUME（CumulativeEnergy）</li>
    <li><strong>换算</strong>: <code>energy / 1000</code> = Wh，<code>energy / 1000000</code> = kWh</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">CumulativeEnergyExported（累计输出电能）</h3>
  <p>
    设备向电网<strong>输出（反馈）</strong>的累计总电能。
    适用于光伏逆变器、储能系统等能向电网回馈电力的设备。普通家用电器不会上报此属性。
  </p>
  <ul>
    <li><strong>类型</strong>: EnergyMeasurementStruct，Nullable</li>
    <li><strong>所需特性</strong>: EXPE（ExportedEnergy）+ CUME（CumulativeEnergy）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">PeriodicEnergyImported（周期输入电能）</h3>
  <p>
    当前测量周期内设备输入（消耗）的电能。每个周期结束后自动重置。
    适合统计「过去一小时用了多少电」「今天用了多少电」等场景。
    周期长度由设备实现决定，通过 <code>StartTimestamp</code> / <code>EndTimestamp</code> 可以计算。
  </p>
  <ul>
    <li><strong>类型</strong>: EnergyMeasurementStruct，Nullable</li>
    <li><strong>所需特性</strong>: IMPE（ImportedEnergy）+ PERE（PeriodicEnergy）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0004">PeriodicEnergyExported（周期输出电能）</h3>
  <p>
    当前测量周期内设备向电网输出（反馈）的电能。与 PeriodicEnergyImported 对称，
    用于有发电能力的设备统计周期内的发电量。
  </p>
  <ul>
    <li><strong>类型</strong>: EnergyMeasurementStruct，Nullable</li>
    <li><strong>所需特性</strong>: EXPE（ExportedEnergy）+ PERE（PeriodicEnergy）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0005">CumulativeEnergyReset（累计重置信息）</h3>
  <p>
    记录累计电能值上次被重置的时间。通过这个属性可以知道
    <code>CumulativeEnergyImported</code> / <code>CumulativeEnergyExported</code>
    是从什么时候开始累计的。如果设备从未被重置过，此属性为 <code>null</code>。
  </p>
  <ul>
    <li><strong>类型</strong>: CumulativeEnergyResetStruct，Nullable</li>
    <li><strong>所需特性</strong>: CUME（CumulativeEnergy）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    ElectricalEnergyMeasurement 没有命令（纯只读 Cluster），但定义了两个重要事件。
    设备通过事件主动通知 App 电能数据的更新，
    比定时轮询属性更高效，尤其适合需要实时跟踪用电量变化的场景。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>优先级</th>
          <th>所需特性</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#event-0x00">
          <td><a href="#event-0x00"><code>0x00</code></a></td>
          <td>CumulativeEnergyMeasured</td>
          <td>INFO</td>
          <td class="col-required">CUME</td>
          <td>累计电能更新</td>
        </tr>
        <tr class="clickable-row" data-href="#event-0x01">
          <td><a href="#event-0x01"><code>0x01</code></a></td>
          <td>PeriodicEnergyMeasured</td>
          <td>INFO</td>
          <td class="col-required">PERE</td>
          <td>周期电能更新</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-0x00">CumulativeEnergyMeasured（累计电能更新事件）</h3>
  <p>
    当设备的累计电能值发生变化时触发。事件数据中包含最新的累计输入和/或输出电能。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td>最新的累计输入电能（可选，取决于 IMPE 特性）</td>
        </tr>
        <tr>
          <td>EnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td>最新的累计输出电能（可选，取决于 EXPE 特性）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <h3 id="event-0x01">PeriodicEnergyMeasured（周期电能更新事件）</h3>
  <p>
    每个测量周期结束时触发。事件数据中包含该周期内的输入和/或输出电能。
    适合 App 在收到此事件后将数据追加到历史记录中，形成用电曲线图。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EnergyImported</td>
          <td>EnergyMeasurementStruct</td>
          <td>本周期输入电能（可选，取决于 IMPE 特性）</td>
        </tr>
        <tr>
          <td>EnergyExported</td>
          <td>EnergyMeasurementStruct</td>
          <td>本周期输出电能（可选，取决于 EXPE 特性）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#events">&#8593; 返回事件列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    ElectricalEnergyMeasurement 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些计量能力。
    四个 Feature 两两组合，决定了设备能提供哪些属性和事件：
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">IMPE（ImportedEnergy）</span>
        <span class="enum-desc">支持测量输入电能（消耗） —— 绝大多数设备都有此特性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">EXPE（ExportedEnergy）</span>
        <span class="enum-desc">支持测量输出电能（发电/回馈） —— 光伏、储能设备使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">CUME（CumulativeEnergy）</span>
        <span class="enum-desc">支持累计计量 —— 提供从起点到当前的总电能</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">PERE（PeriodicEnergy）</span>
        <span class="enum-desc">支持周期计量 —— 提供每个周期内的电能消耗</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature 组合规则</div>
    <p>
      设备必须至少支持 IMPE 或 EXPE 其中之一（总得测量某个方向的电能），
      同时至少支持 CUME 或 PERE 其中之一（总得有一种计量模式）。
      典型的智能插座通常只有 <code>IMPE + CUME</code>（Bit 0 + Bit 2 = FeatureMap = 5），
      而光伏逆变器可能四个全开（FeatureMap = 15）。
    </p>
  </div>

  <!-- ====== 与 ElectricalPowerMeasurement 的关系 ====== -->
  <h2 id="relationship">与 ElectricalPowerMeasurement 的关系</h2>
  <p>
    Matter 把电气测量拆成了两个 Cluster，各司其职：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th></th>
          <th>ElectricalPowerMeasurement（0x0090）</th>
          <th>ElectricalEnergyMeasurement（0x0091）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>测量对象</strong></td>
          <td>瞬时功率（Power）</td>
          <td>累积电能（Energy）</td>
        </tr>
        <tr>
          <td><strong>单位</strong></td>
          <td>mW（毫瓦）</td>
          <td>mWh（毫瓦时）</td>
        </tr>
        <tr>
          <td><strong>类比</strong></td>
          <td>汽车的速度表 —— 现在多快</td>
          <td>汽车的里程表 —— 一共走了多远</td>
        </tr>
        <tr>
          <td><strong>典型读数</strong></td>
          <td>「当前功率 150W」</td>
          <td>「本月用电 45.3 kWh」</td>
        </tr>
        <tr>
          <td><strong>数据获取</strong></td>
          <td>读取属性（实时值）</td>
          <td>订阅事件（累计/周期更新）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    两者通常共存于同一 Endpoint。App 界面上可以同时展示实时功率（来自 0x0090）和累计用电量（来自 0x0091），
    前者适合实时监控，后者适合用电统计和费用计算。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个支持 IMPE + CUME + PERE 特性的智能插座的 ElectricalEnergyMeasurement Cluster 读取结果：</p>
  <pre><code>{
  // --- ElectricalEnergyMeasurement Cluster（Endpoint 1）---

  // --- 测量精度 ---
  "0x0000": {                    // Accuracy（MeasurementAccuracyStruct）
    "measurementType": 1,        // ElectricalEnergy
    "measured": true,
    "minMeasuredValue": 0,
    "maxMeasuredValue": 100000000000,  // 100,000 kWh
    "accuracyRanges": [{
      "rangeMin": 0,
      "rangeMax": 100000000000,
      "fixedMax": 5000           // 最大固定误差 5000 mWh = 5 Wh
    }]
  },

  // --- 累计电能（需要 IMPE + CUME 特性）---
  "0x0001": {                    // CumulativeEnergyImported
    "energy": 12345678,          // 12,345,678 mWh = 12,345.678 Wh ≈ 12.35 kWh
    "startTimestamp": 1700000000,// 2023-11-14T22:13:20Z（开始计量时间）
    "endTimestamp": 1700086400   // 2023-11-15T22:13:20Z（最新更新时间）
  },

  // --- 周期电能（需要 IMPE + PERE 特性）---
  "0x0003": {                    // PeriodicEnergyImported
    "energy": 543210,            // 543,210 mWh = 543.21 Wh ≈ 0.54 kWh（本周期用电）
    "startTimestamp": 1700082800,// 周期开始时间
    "endTimestamp": 1700086400   // 周期结束时间（1 小时周期）
  },

  // --- 累计重置信息（需要 CUME 特性）---
  "0x0005": {                    // CumulativeEnergyReset
    "importedResetTimestamp": 1700000000  // 上次重置累计值的时间
  }
}</code></pre>

  <p>CumulativeEnergyMeasured 事件数据示例：</p>
  <pre><code>{
  // CumulativeEnergyMeasured 事件 —— 累计电能更新通知
  "eventId": "0x00",
  "priority": "INFO",
  "data": {
    "energyImported": {
      "energy": 12345678,          // 12,345.678 Wh
      "startTimestamp": 1700000000,
      "endTimestamp": 1700086400
    }
    // energyExported 省略（此设备不支持反向输出）
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">单位换算代码参考</div>
    <p>处理设备返回的电能值时的关键逻辑：</p>
    <pre><code>{\`// 设备返回 energy = 12345678 (mWh)
val rawEnergy: Long? = 12345678    // Nullable，可能为 null
val wattHours = rawEnergy?.let { it / 1000.0 }     // → 12,345.678 Wh
val kilowattHours = rawEnergy?.let { it / 1_000_000.0 }  // → 12.346 kWh

// 显示时处理 null + 选择合适单位
val display = kilowattHours?.let {
    if (it < 1.0) String.format("%.1f Wh", it * 1000)  // 小于 1 kWh 显示 Wh
    else String.format("%.2f kWh", it)
} ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：智能插座用电统计面板</summary>
    <div class="scenario-content">
      <ol>
        <li>检查 <code>FeatureMap (0xFFFC)</code> 确认设备支持的计量模式（CUME / PERE / IMPE / EXPE）</li>
        <li>订阅 <code>CumulativeEnergyMeasured (0x00)</code> 事件，实时跟踪累计用电量的变化</li>
        <li>读取 <code>CumulativeEnergyImported (0x0001)</code> 获取当前总用电量，除以 1,000,000 转换为 kWh</li>
        <li>如果支持 PERE，同时订阅 <code>PeriodicEnergyMeasured (0x01)</code> 事件，用每个周期的数据绘制用电曲线图</li>
        <li>结合当地电价计算费用：<code>费用 = kWh x 电价（元/kWh）</code></li>
        <li>配合 ElectricalPowerMeasurement（0x0090）在界面上同时显示「当前功率」和「累计用电」</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：光伏储能系统的双向电能监控</summary>
    <div class="scenario-content">
      <ol>
        <li>确认设备 FeatureMap 包含 IMPE + EXPE（双向计量）+ CUME + PERE（双模式）</li>
        <li>读取 <code>CumulativeEnergyImported (0x0001)</code> 获取从电网购入的总电量</li>
        <li>读取 <code>CumulativeEnergyExported (0x0002)</code> 获取回馈电网的总发电量</li>
        <li>计算净用电量：<code>净用电 = Imported - Exported</code>；负值表示该设备是净发电方</li>
        <li>订阅 <code>PeriodicEnergyMeasured (0x01)</code> 事件，按周期统计「这一小时发了多少电、用了多少电」</li>
        <li>读取 <code>CumulativeEnergyReset (0x0005)</code> 确认累计数据的起算时间，避免跨设备或跨周期的数据混淆</li>
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
  'device-energy-management': {
    title: '设备能源管理 Cluster · DeviceEnergyManagement（0x0098）',
    description: 'Matter DeviceEnergyManagement Cluster（0x0098）完整参考 — PowerAdjustRequest/ModifyForecastRequest 等命令、ESAType/Forecast/PowerAdjustmentCapability 等属性定义、Feature 位图、枚举值速查与数据示例。',
    prev: undefined,
    next: undefined,
    content: `<h1>设备能源管理 Cluster（DeviceEnergyManagement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0098</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 具有能源管理能力的设备端点
  </p>
  <p>
    DeviceEnergyManagement（DEM）是 Matter 1.4 引入的能源管理核心 Cluster，
    用于让能源管理系统（EMS）与各种能源消耗或产生设备协商功率调整、预测用电计划和优化能源使用。
    它适用于电动车充电桩（EVSE）、热泵、储能电池、太阳能系统、洗碗机、洗衣机等各类 ESA（Energy Smart Appliance）设备。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ESA（Energy Smart Appliance）</div>
    <p>
      ESA 是 Matter 能源管理体系中的核心概念，指具有能源感知和管理能力的智能设备。
      每个 ESA 通过 <code>ESAType</code> 标识自己的设备类别，通过 <code>ESAState</code> 报告当前状态，
      并借助 <strong>Forecast</strong>（预测）向 EMS 声明自己的用电计划。EMS 根据这些信息发出功率调整、时间调整等优化指令。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">功率单位</div>
    <p>
      DeviceEnergyManagement Cluster 中所有功率属性的单位都是 <strong>毫瓦（mW）</strong>。
      例如 <code>AbsMaxPower = 7200000</code> 表示最大功率 <strong>7.2 kW</strong>（7200 W）。
      读写功率属性时务必做好单位换算。
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
    DeviceEnergyManagement Cluster 共有 8 个命令，分别对应不同的 Feature 能力。
    EMS（能源管理系统）通过这些命令调整设备的功率、启动时间、运行状态和用电预测。
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
          <td>PowerAdjustRequest</td>
          <td>请求设备调整到指定功率</td>
          <td class="col-feature">PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>CancelPowerAdjustRequest</td>
          <td>取消正在进行的功率调整</td>
          <td class="col-feature">PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StartTimeAdjustRequest</td>
          <td>请求调整预测的启动时间</td>
          <td class="col-feature">STA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>PauseRequest</td>
          <td>请求设备暂停运行</td>
          <td class="col-feature">PAU</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>ResumeRequest</td>
          <td>请求设备恢复运行</td>
          <td class="col-feature">PAU</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>ModifyForecastRequest</td>
          <td>修改设备的用电预测</td>
          <td class="col-feature">FA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>RequestConstraintBasedForecast</td>
          <td>基于约束条件请求设备重新生成预测</td>
          <td class="col-feature">CON</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>CancelRequest</td>
          <td>取消所有进行中的优化请求</td>
          <td class="col-feature">STA | PAU | FA | CON</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">PowerAdjustRequest -- 功率调整请求（0x00）</h3>
  <p>
    请求设备在指定时间段内调整到目标功率。EMS 用这个命令在电价高峰时段降低设备功率、
    或在电价低谷时段提高功率来优化用电成本。执行成功后，<code>ESAState</code> 变为 <code>PowerAdjustActive (3)</code>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Power</td>
          <td>int64</td>
          <td>目标功率，单位 mW。必须在设备的 PowerAdjustmentCapability 范围内</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>uint32</td>
          <td>调整持续时间，单位秒。必须在设备声明的 minDuration ~ maxDuration 范围内</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>调整原因：<code>0</code> = LocalOptimization，<code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        电价高峰期间，EMS 向 EVSE 发送 <code>PowerAdjustRequest(Power=1400000, Duration=7200, Cause=1)</code>，
        将充电功率从 7.2 kW 降到 1.4 kW 持续 2 小时。设备会在功率调整期间持续以低功率充电，
        到期后自动恢复正常功率。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">CancelPowerAdjustRequest -- 取消功率调整（0x01）</h3>
  <p>
    取消正在进行的功率调整，设备立即恢复到正常运行状态。无参数。
    执行成功后，<code>ESAState</code> 从 <code>PowerAdjustActive</code> 恢复为 <code>Online</code>。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        EMS 之前请求了降功率运行，但电网负荷突然下降，不再需要限制。
        发送 CancelPowerAdjustRequest 让设备恢复全速运行。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">StartTimeAdjustRequest -- 启动时间调整（0x02）</h3>
  <p>
    请求设备将预测（Forecast）中的启动时间调整到指定时刻。
    用于在不改变总用电量的前提下，将设备的运行时段从高峰移到低谷。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>RequestedStartTime</td>
          <td>epoch-s</td>
          <td>请求的新启动时间（UTC 时间戳）</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>调整原因：<code>0</code> = LocalOptimization，<code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        洗衣机预计 18:00 启动洗涤程序，但 EMS 发现 18:00-20:00 是用电高峰。
        发送 <code>StartTimeAdjustRequest(RequestedStartTime=22:00的UTC时间戳, Cause=1)</code>，
        将洗涤推迟到 22:00 低谷时段启动。设备会在新的时间自动开始运行。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">PauseRequest -- 暂停运行（0x03）</h3>
  <p>
    请求设备暂停当前运行。仅适用于支持暂停的设备（PAU Feature）。
    执行成功后，<code>ESAState</code> 变为 <code>Paused (4)</code>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Duration</td>
          <td>uint32</td>
          <td>暂停持续时间，单位秒。到期后设备自动恢复运行</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>暂停原因：<code>0</code> = LocalOptimization，<code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        洗碗机正在运行，EMS 检测到电网负荷即将达到峰值。
        发送 <code>PauseRequest(Duration=1800, Cause=1)</code> 暂停洗碗机 30 分钟。
        设备在暂停期间保持当前状态，30 分钟后自动恢复洗涤程序。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x04">ResumeRequest -- 恢复运行（0x04）</h3>
  <p>
    请求设备恢复已暂停的运行。无参数。
    执行成功后，<code>ESAState</code> 从 <code>Paused</code> 恢复为 <code>Online</code>。
  </p>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x05">ModifyForecastRequest -- 修改预测（0x05）</h3>
  <p>
    修改设备当前 Forecast 中一个或多个 Slot 的功率和时间参数。
    EMS 通过此命令直接调整设备的用电计划，比如降低某个时段的预期功率。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ForecastID</td>
          <td>uint32</td>
          <td>要修改的 Forecast ID，必须与当前 Forecast 属性中的 forecastID 匹配</td>
        </tr>
        <tr>
          <td>SlotAdjustments</td>
          <td>list</td>
          <td>Slot 调整列表，每项包含 SlotIndex、NominalPower、Duration 等字段</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>调整原因：<code>0</code> = LocalOptimization，<code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        EVSE 的 Forecast 显示将在 Slot 0 以 7.2 kW 充电 2 小时。EMS 希望将其分成两段：
        先以 3.6 kW 充 1 小时（避开高峰），再以 7.2 kW 充 1 小时。
        通过 ModifyForecastRequest 修改 Slot 参数实现这种分段充电策略。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x06">RequestConstraintBasedForecast -- 基于约束请求预测（0x06）</h3>
  <p>
    向设备提供一组功率/能量约束条件，请求设备据此重新生成 Forecast。
    与 ModifyForecastRequest 直接修改参数不同，这个命令告诉设备"你自己想办法满足这些约束"。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Constraints</td>
          <td>list</td>
          <td>约束条件列表。每项包含 StartTime、Duration、NominalPower / MaximumEnergy 等限制</td>
        </tr>
        <tr>
          <td>Cause</td>
          <td>AdjustmentCauseEnum</td>
          <td>约束原因：<code>0</code> = LocalOptimization，<code>1</code> = GridOptimization</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        EMS 知道明天 14:00-16:00 电网可能过载，向热泵发送约束：
        "14:00-16:00 最大功率不超过 2 kW"。热泵根据约束自行调整内部运行计划，
        可能选择提前预冷或推迟启动，以确保在约束时段内不超过 2 kW。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x07">CancelRequest -- 取消请求（0x07）</h3>
  <p>
    取消所有当前进行中的优化请求（StartTimeAdjust、Pause、ModifyForecast、ConstraintBasedForecast），
    设备恢复到原始的自主运行计划。无参数。
    需要设备支持 STA、PAU、FA 或 CON 中的至少一个 Feature。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        EMS 此前发出了多项优化请求，现在需要释放所有限制让设备恢复自主运行。
        发送 CancelRequest 一次性清除所有进行中的时间调整、暂停和预测修改。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>DeviceEnergyManagement Cluster 的属性按功能分为三组。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- ESA 基本信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ESAType</td>
          <td>ESATypeEnum</td>
          <td><a href="#group-esa">ESA 基本信息</a></td>
          <td>设备类型标识</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>ESACanGenerate</td>
          <td>bool</td>
          <td><a href="#group-esa">ESA 基本信息</a></td>
          <td>设备是否能产生能源</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ESAState</td>
          <td>ESAStateEnum</td>
          <td><a href="#group-esa">ESA 基本信息</a></td>
          <td>设备当前能源管理状态</td>
        </tr>
        <!-- 功率范围 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>AbsMinPower</td>
          <td>int64</td>
          <td><a href="#group-power">功率与调整</a></td>
          <td>设备绝对最小功率 (mW)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>AbsMaxPower</td>
          <td>int64</td>
          <td><a href="#group-power">功率与调整</a></td>
          <td>设备绝对最大功率 (mW)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>PowerAdjustmentCapability</td>
          <td>struct / null</td>
          <td><a href="#group-power">功率与调整</a></td>
          <td>功率可调范围和时间限制</td>
        </tr>
        <!-- 预测与优化 -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>Forecast</td>
          <td>struct / null</td>
          <td><a href="#group-forecast">预测与优化</a></td>
          <td>设备的用电/产电预测计划</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>OptOutState</td>
          <td>OptOutStateEnum</td>
          <td><a href="#group-forecast">预测与优化</a></td>
          <td>用户退出优化的状态</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== ESA 基本信息（0x0000-0x0002）====== -->
  <h3 id="group-esa">ESA 基本信息（0x0000-0x0002）</h3>
  <p>描述设备的类型、能源产生能力和当前状态。这三个属性是所有 DEM 设备的基础属性。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>ESAType<br/><span class="attr-cn">设备类型</span></td>
          <td>ESATypeEnum</td>
          <td>标识 ESA 设备的类型。EMS 根据此值了解设备的能源特性和调度策略。见下方枚举</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>ESACanGenerate<br/><span class="attr-cn">可产生能源</span></td>
          <td>bool</td>
          <td><code>true</code> 表示设备可以向电网输出能源（如太阳能逆变器、储能电池放电）。<code>false</code> 表示设备只消耗能源</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ESAState<br/><span class="attr-cn">设备状态</span></td>
          <td>ESAStateEnum</td>
          <td>设备当前的能源管理状态。见下方枚举</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ESATypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">EVSE</span>
        <span class="enum-desc">电动车充电桩</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">SpaceHeating</span>
        <span class="enum-desc">空间加热（暖气）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">WaterHeating</span>
        <span class="enum-desc">热水器</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">SpaceCooling</span>
        <span class="enum-desc">空间制冷（空调）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">SpaceHeatingCooling</span>
        <span class="enum-desc">冷暖两用（热泵）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">BatteryStorage</span>
        <span class="enum-desc">储能电池</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">SolarPV</span>
        <span class="enum-desc">太阳能光伏</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">FridgeFreezer</span>
        <span class="enum-desc">冰箱/冷柜</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">WashingMachine</span>
        <span class="enum-desc">洗衣机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Dishwasher</span>
        <span class="enum-desc">洗碗机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Cooking</span>
        <span class="enum-desc">烹饪设备</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">HomeWaterPump</span>
        <span class="enum-desc">家用水泵</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">IrrigationWaterPump</span>
        <span class="enum-desc">灌溉水泵</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">PoolPump</span>
        <span class="enum-desc">泳池水泵</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">其他类型</span>
      </div>
    </div>
  </div>

  <h4>ESAStateEnum 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Offline</span>
        <span class="enum-desc">离线 -- 设备不参与能源管理</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Online</span>
        <span class="enum-desc">在线 -- 正常运行，可接受优化指令</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Fault</span>
        <span class="enum-desc">故障 -- 设备发生错误，暂停能源管理</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PowerAdjustActive</span>
        <span class="enum-desc">功率调整中 -- 正在执行 PowerAdjustRequest</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">已暂停 -- 因 PauseRequest 暂停运行</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ESAState 与命令的关系</div>
    <p>
      只有 <code>ESAState = Online (1)</code> 时，设备才接受新的优化命令。
      处于 <code>Offline</code> 或 <code>Fault</code> 状态时，所有命令都会被拒绝。
      <code>PowerAdjustActive</code> 状态下只能发送 <code>CancelPowerAdjustRequest</code>，
      <code>Paused</code> 状态下只能发送 <code>ResumeRequest</code>。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 功率与调整（0x0003-0x0005）====== -->
  <h3 id="group-power">功率与调整（0x0003-0x0005）</h3>
  <p>定义设备的功率范围和可调整能力。EMS 在发送 PowerAdjustRequest 之前需要先读取这些属性确认调整范围。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>AbsMinPower<br/><span class="attr-cn">绝对最小功率</span></td>
          <td>int64</td>
          <td>设备可运行的绝对最小功率，单位 mW。可为负值（表示向电网输出）。<code>0</code> 表示设备可完全停止消耗</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>AbsMaxPower<br/><span class="attr-cn">绝对最大功率</span></td>
          <td>int64</td>
          <td>设备可运行的绝对最大功率，单位 mW。例如 <code>7200000</code> 表示 7.2 kW</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>PowerAdjustmentCapability<br/><span class="attr-cn">功率调整能力</span></td>
          <td>struct / null</td>
          <td>描述设备当前可接受的功率调整范围和时间限制。<code>null</code> 表示设备当前不接受功率调整。<strong>需要 PA Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">PowerAdjustmentCapability 结构</div>
    <p>
      该属性是一个复合结构，包含 <code>powerAdjustCapability</code>（功率调整能力列表）和 <code>cause</code>（原因）。
      列表中每个条目定义了一组可调范围：<code>minPower</code> / <code>maxPower</code>（功率范围）和 <code>minDuration</code> / <code>maxDuration</code>（时间范围）。
      设备可以提供多个不连续的功率调整区间。EMS 在发送 PowerAdjustRequest 时，参数必须落在其中一个区间内。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 预测与优化（0x0006-0x0007）====== -->
  <h3 id="group-forecast">预测与优化（0x0006-0x0007）</h3>
  <p>设备的用电预测计划和用户退出优化的状态。Forecast 是 DEM 最核心的数据结构。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>Forecast<br/><span class="attr-cn">用电预测</span></td>
          <td>struct / null</td>
          <td>设备对未来用电或产电的预测计划。包含多个时间 Slot，每个 Slot 定义了时间段和功率参数。<code>null</code> 表示设备没有可用的预测。<strong>需要 PFR 或 SFR Feature</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>OptOutState<br/><span class="attr-cn">退出优化状态</span></td>
          <td>OptOutStateEnum</td>
          <td>用户是否选择退出能源优化。见下方枚举</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Forecast 结构详解</div>
    <p>
      Forecast 包含以下关键字段：<br/>
      <code>forecastID</code> -- 预测的唯一标识，每次更新递增<br/>
      <code>activeSlotNumber</code> -- 当前正在执行的 Slot 编号（<code>null</code> 表示尚未开始）<br/>
      <code>startTime</code> / <code>endTime</code> -- 整个预测的起止时间<br/>
      <code>slots</code> -- 时间段列表，每个 Slot 包含 <code>minDuration</code>、<code>maxDuration</code>、<code>defaultDuration</code>、
      <code>nominalPower</code>（标称功率）、<code>minPower</code>、<code>maxPower</code> 等参数
    </p>
  </div>

  <h4>OptOutStateEnum 枚举值</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoOptOut</span>
        <span class="enum-desc">未退出 -- 接受所有优化请求</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">LocalOptOut</span>
        <span class="enum-desc">退出本地优化 -- 拒绝 LocalOptimization 类型的请求</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">GridOptOut</span>
        <span class="enum-desc">退出电网优化 -- 拒绝 GridOptimization 类型的请求</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OptOut</span>
        <span class="enum-desc">全部退出 -- 拒绝所有优化请求</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">OptOutState 的影响</div>
    <p>
      当用户设置了 <code>OptOutState</code> 退出优化后，EMS 发送的相应类型的命令会被设备拒绝。
      EMS 在发送命令前应先检查此属性，避免发送注定会失败的请求。
      <code>OptOut (3)</code> 状态下，除了 <code>CancelPowerAdjustRequest</code> 和 <code>CancelRequest</code> 之外的所有命令都会被拒绝。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>DeviceEnergyManagement Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的能源管理能力。不同 Feature 组合决定了可用的命令和属性：</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PA（PowerAdjustment）</span>
        <span class="enum-desc">功率调整 -- 支持 PowerAdjustRequest / CancelPowerAdjustRequest 命令，提供 PowerAdjustmentCapability 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">PFR（PowerForecastReporting）</span>
        <span class="enum-desc">功率预测上报 -- 设备以功率为单位上报 Forecast（每个 Slot 包含功率参数）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">SFR（StateForecastReporting）</span>
        <span class="enum-desc">状态预测上报 -- 设备以运行状态为单位上报 Forecast（每个 Slot 描述运行阶段）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">STA（StartTimeAdjustment）</span>
        <span class="enum-desc">启动时间调整 -- 支持 StartTimeAdjustRequest 命令，允许 EMS 推迟或提前设备启动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PAU（Pausable）</span>
        <span class="enum-desc">可暂停 -- 支持 PauseRequest / ResumeRequest 命令，设备可在运行中暂停</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">FA（ForecastAdjustment）</span>
        <span class="enum-desc">预测调整 -- 支持 ModifyForecastRequest 命令，允许 EMS 直接修改预测参数</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">CON（ConstraintBasedAdjustment）</span>
        <span class="enum-desc">基于约束调整 -- 支持 RequestConstraintBasedForecast 命令，允许 EMS 提供约束让设备自行优化</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">PFR 与 SFR 互斥</div>
    <p>
      <strong>PFR</strong>（PowerForecastReporting）和 <strong>SFR</strong>（StateForecastReporting）是互斥的 -- 设备只能选择其中一种预测上报方式。
      PFR 适用于功率可连续调节的设备（如 EVSE），SFR 适用于按固定程序运行的设备（如洗衣机、洗碗机）。
      FA 和 CON Feature 需要 PFR 或 SFR 中的至少一个作为前提。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个 EVSE（电动车充电桩）在线运行时的 DeviceEnergyManagement Cluster 读取结果：</p>

  <pre><code>{
  // --- ESA 基本信息 ---
  "0x0000": 0,              // ESAType = EVSE（电动车充电桩）
  "0x0001": false,          // ESACanGenerate = false（只消耗不产生能源）
  "0x0002": 1,              // ESAState = Online（在线运行中）

  // --- 功率范围 ---
  "0x0003": 0,              // AbsMinPower = 0 mW（可完全停止消耗）
  "0x0004": 7200000,        // AbsMaxPower = 7200000 mW（最大 7.2 kW）

  // --- 功率调整能力 ---
  "0x0005": {               // PowerAdjustmentCapability
    "powerAdjustCapability": [
      {
        "minPower": 1400000,       // 最低可调功率 1.4 kW
        "maxPower": 7200000,       // 最高可调功率 7.2 kW
        "minDuration": 60,         // 最短调整持续 60 秒
        "maxDuration": 28800       // 最长调整持续 8 小时
      }
    ],
    "cause": 0                     // NoRateChange（无费率变化触发）
  },

  // --- 预测 ---
  "0x0006": {               // Forecast
    "forecastID": 1,
    "activeSlotNumber": 0,
    "startTime": 1700000000,
    "endTime": 1700028800,
    "slots": [
      {
        "minDuration": 3600,
        "maxDuration": 7200,
        "defaultDuration": 5400,
        "nominalPower": 7200000,
        "minPower": 1400000,
        "maxPower": 7200000
      }
    ]
  },

  // --- 退出状态 ---
  "0x0007": 0               // OptOutState = NoOptOut（未退出任何优化）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      所有功率值的单位是毫瓦（mW），需除以 1000 得到瓦（W），再除以 1000 得到千瓦（kW）。
      <code>Forecast</code> 和 <code>PowerAdjustmentCapability</code> 是复合结构体，解析时需要递归处理嵌套字段。
      <code>null</code> 值表示该能力当前不可用 -- 例如设备处于 Offline 状态时 PowerAdjustmentCapability 可能为 null。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：EVSE 分时充电 -- 错峰降低电费</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>ESAType (0x0000)</code> 确认是 EVSE 设备，读取 <code>ESAState (0x0002)</code> 确认为 <code>Online (1)</code></li>
        <li>读取 <code>PowerAdjustmentCapability (0x0005)</code> 获取可调功率范围（如 1.4 kW ~ 7.2 kW）</li>
        <li>电价高峰时段（18:00-22:00）：发送 <code>PowerAdjustRequest(Power=1400000, Duration=14400, Cause=1)</code> 降到最低功率</li>
        <li>订阅 <code>ESAState</code>，确认变为 <code>PowerAdjustActive (3)</code></li>
        <li>高峰结束后：发送 <code>CancelPowerAdjustRequest</code> 恢复全速充电，或等待 Duration 到期自动恢复</li>
        <li>全程订阅 <code>Forecast (0x0006)</code> 变化，监控充电进度和预计完成时间</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：洗碗机延迟启动 -- 利用低谷电价</summary>
    <div class="scenario-content">
      <ol>
        <li>用户设置洗碗机准备运行，设备上报 <code>Forecast</code> 显示预计立即启动</li>
        <li>EMS 检查电价时间表，发现 23:00 后进入低谷电价</li>
        <li>发送 <code>StartTimeAdjustRequest(RequestedStartTime=23:00的UTC时间戳, Cause=0)</code> 推迟启动</li>
        <li>洗碗机在 23:00 自动启动洗涤程序，<code>Forecast</code> 中的 <code>activeSlotNumber</code> 开始更新</li>
        <li>如果用户需要提前使用洗碗机，检查 <code>OptOutState</code>，用户可以通过设备面板退出优化，或 EMS 发送 <code>CancelRequest</code> 取消延迟</li>
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

  .col-feature {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-feature {
    color: #60a5fa;
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
};
