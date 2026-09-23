import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'temperature-measurement': {
    title: '温度测量 Cluster · TemperatureMeasurement（0x0402）',
    description: 'Matter TemperatureMeasurement Cluster（0x0402）完整参考 — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance 属性定义、0.01°C 单位换算、温度传感器数据读取与场景应用。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>温度测量 Cluster（TemperatureMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0402</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    TemperatureMeasurement 是最简单的传感器 Cluster 之一 —— 只有 <strong>4 个属性</strong>，没有任何命令。
    设备作为 Server 角色被动上报温度数据，App（Client）读取或订阅即可。
    常见于温湿度传感器、温控器、空调面板等设备。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">温度单位陷阱：0.01°C</div>
    <p>
      所有温度属性的值都以 <strong>0.01°C</strong> 为单位。设备返回 <code>2550</code>，实际温度是 <code>25.50°C</code>；
      返回 <code>-500</code>，实际温度是 <code>-5.00°C</code>。
      <strong>展示时必须除以 100</strong>，否则用户会看到「2550 度」。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">null 值含义</div>
    <p>
      <code>MeasuredValue</code>、<code>MinMeasuredValue</code>、<code>MaxMeasuredValue</code> 都是 Nullable。
      返回 <code>null</code> 表示当前数据无效或传感器尚未完成测量。App 应展示「--」而非 0。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>TemperatureMeasurement 只有四个属性，其中 <code>MeasuredValue</code> 是最常用的。点击属性 ID 可跳转到详细说明。</p>

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
          <td>MeasuredValue</td>
          <td>int16</td>
          <td>只读</td>
          <td>当前温度（单位 0.01°C），Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>int16</td>
          <td>只读</td>
          <td>传感器可测最低温度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>int16</td>
          <td>只读</td>
          <td>传感器可测最高温度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>测量精度容差（单位 0.01°C）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attr-details">属性详解</h2>

  <h3 id="attr-0x00">MeasuredValue（当前测量温度）</h3>
  <p>
    传感器最近一次测量到的温度值，单位 0.01°C。这是整个 Cluster 最核心的属性。
  </p>
  <ul>
    <li><strong>类型</strong>: int16（有符号，支持负温度）</li>
    <li><strong>范围</strong>: -27315（-273.15°C，绝对零度）到 32767（327.67°C）</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示传感器数据无效或尚未完成首次测量</li>
    <li><strong>换算</strong>: <code>实际温度 = MeasuredValue / 100</code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">常见值速查</div>
    <p>
      <code>0</code> = 0.00°C &nbsp;|&nbsp;
      <code>2000</code> = 20.00°C &nbsp;|&nbsp;
      <code>2550</code> = 25.50°C &nbsp;|&nbsp;
      <code>3700</code> = 37.00°C &nbsp;|&nbsp;
      <code>-1000</code> = -10.00°C
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（可测最低温度）</h3>
  <p>
    传感器能够测量的最低温度值，单位 0.01°C。App 可以用它来设置温度显示范围的下限，或判断当前读数是否已经触底。
  </p>
  <ul>
    <li><strong>类型</strong>: int16，Nullable</li>
    <li><strong>范围</strong>: -27315 到 MaxMeasuredValue - 1</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义下限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（可测最高温度）</h3>
  <p>
    传感器能够测量的最高温度值，单位 0.01°C。当 <code>MeasuredValue</code> 接近此上限时，可能意味着传感器已经超出正常工作范围。
  </p>
  <ul>
    <li><strong>类型</strong>: int16，Nullable</li>
    <li><strong>范围</strong>: MinMeasuredValue + 1 到 32767</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义上限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">Tolerance（测量容差）</h3>
  <p>
    传感器的测量精度容差，单位 0.01°C。例如值为 <code>50</code>，表示测量精度为 <strong>&plusmn;0.50°C</strong>。
    这个属性是可选的，不是所有设备都上报。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16（无符号，容差不会为负）</li>
    <li><strong>范围</strong>: 0 到 2048（即 0 到 &plusmn;20.48°C）</li>
  </ul>
  <div class="callout callout-info">
    <div class="callout-title">Tolerance 的实际用途</div>
    <p>
      如果传感器报告 <code>MeasuredValue = 2550</code>（25.50°C）且 <code>Tolerance = 50</code>（&plusmn;0.50°C），
      那么实际温度在 25.00°C ~ 26.00°C 之间。做温度阈值触发自动化时，应将容差纳入考量，避免在阈值附近频繁触发。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    TemperatureMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集温度数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个温湿度传感器的 TemperatureMeasurement Cluster 属性：</p>
  <pre><code>{
  // --- TemperatureMeasurement Cluster（Endpoint 1）---
  "0x0": 2550,       // MeasuredValue = 2550 → 实际 25.50°C
  "0x1": -1000,      // MinMeasuredValue = -1000 → 实际 -10.00°C
  "0x2": 6000,       // MaxMeasuredValue = 6000 → 实际 60.00°C
  "0x3": 50          // Tolerance = 50 → 实际 ±0.50°C
}</code></pre>

  <p>读取请求示例 —— 一次性获取 Cluster 全部属性：</p>
  <pre><code>{
  // 读取温度传感器的所有属性
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0402"
      // 不指定 attributeId → 读取该 Cluster 全部属性
    }
  }]
}</code></pre>

  <p>订阅温度变化 —— 实时跟踪温度更新：</p>
  <pre><code>{
  // 订阅温度变化（每 30 秒~5 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0402",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 30,        // 最少 30 秒上报一次
    "maxIntervalCeiling": 300      // 最多 5 分钟上报一次
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">温度转换代码参考</div>
    <p>
      处理设备返回值时的关键逻辑：
    </p>
    <pre><code>{\`// 设备返回 MeasuredValue = 2550
val rawValue: Int? = 2550    // Nullable，可能为 null
val tempCelsius = rawValue?.let { it / 100.0 }  // → 25.50°C
val tempFahrenheit = tempCelsius?.let { it * 9.0 / 5.0 + 32 }  // → 77.90°F

// 显示时处理 null
val display = tempCelsius?.let { String.format("%.1f°C", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：读取当前温度</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>MeasuredValue (0x00)</code> —— 先判断是否为 <code>null</code></li>
        <li>除以 100 转换为摄氏度：<code>2550 → 25.50°C</code></li>
        <li>如果需要华氏度，再做一次转换：<code>°F = °C × 9/5 + 32</code></li>
        <li>可选：读取 <code>Tolerance (0x03)</code> 评估数据可信度</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：App 首页展示温度卡片</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，设置合理的上报间隔（如 30 秒 ~ 5 分钟）</li>
        <li>收到新值后除以 100，显示一位小数即可（如 <code>25.5°C</code>）</li>
        <li>处理 <code>null</code> 值 —— 展示「--」或「传感器离线」，不要显示 0°C</li>
        <li>可选：读取 <code>MinMeasuredValue</code> / <code>MaxMeasuredValue</code> 判断传感器量程，在异常时给出提示</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：温度阈值自动化</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，持续监听温度变化</li>
        <li>设定阈值时考虑 <code>Tolerance</code> —— 如果容差为 &plusmn;0.5°C，阈值设为 30°C，则实际触发范围是 29.5°C ~ 30.5°C</li>
        <li>加入防抖逻辑：温度在阈值附近波动时，要求连续 N 次超过阈值才触发，避免频繁开关空调/风扇</li>
        <li>配合 Thermostat Cluster（0x0201）实现闭环控制：温度传感器报告室温，温控器调整设定点</li>
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
  .scenario-temp-note {
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  .dark .scenario-temp-note {
    color: #9ca3af;
  }
</style>`,
  },
  'relative-humidity-measurement': {
    title: '相对湿度测量 Cluster · RelativeHumidityMeasurement（0x0405）',
    description: 'Matter RelativeHumidityMeasurement Cluster（0x0405）完整参考 — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance 属性定义、0.01% RH 单位换算、湿度传感器数据读取与自动化场景。',
    prev: { title: '温控（Thermostat）', slug: 'thermostat' },
    next: undefined,
    content: `<h1>相对湿度测量 Cluster（RelativeHumidityMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0405</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    RelativeHumidityMeasurement 用于上报设备测量到的相对湿度值。
    这个 Cluster 是<strong>纯只读的</strong> —— 没有 Command，只有 4 个 Attribute，结构与 TemperatureMeasurement 完全一致。
    湿度传感器、温湿度计、恒温恒湿箱等设备都会用到它。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">湿度单位陷阱</div>
    <p>
      所有湿度属性的单位都是 <strong>0.01% RH</strong>（百分之一的相对湿度百分比）。
      例如设备返回 <code>6500</code>，实际湿度是 <strong>65.00% RH</strong>。
      有效范围 <code>0</code> ~ <code>10000</code>，对应 0% ~ 100% RH。
      值为 <code>null</code> 表示当前测量值无效或未知。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>RelativeHumidityMeasurement 只有 4 个属性，其中 MeasuredValue 是必须支持的。点击属性 ID 可跳转到详细说明。</p>

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
          <td>MeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>当前测量湿度（0.01% RH）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>传感器可测量的最小湿度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>传感器可测量的最大湿度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>测量精度/容差（0.01% RH）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">MeasuredValue（当前测量湿度）</h3>
  <p>
    设备传感器当前测量到的相对湿度值，单位 0.01% RH。
    有效范围是 <code>MinMeasuredValue</code> 到 <code>MaxMeasuredValue</code> 之间。
    值为 <code>null</code> 表示传感器暂时无法提供有效读数（如传感器故障或正在初始化）。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">换算公式</div>
    <p>
      <code>实际湿度 = MeasuredValue / 100</code><br/>
      例如：<code>6500 / 100 = 65.00% RH</code>，<code>3275 / 100 = 32.75% RH</code>
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（最小可测量湿度）</h3>
  <p>
    传感器能够测量的最小相对湿度值，单位 0.01% RH。
    这是硬件能力的下限 —— <code>MeasuredValue</code> 不会低于此值。
    值为 <code>null</code> 表示最小值未定义。范围 <code>0</code> ~ <code>9999</code>（0% ~ 99.99% RH）。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（最大可测量湿度）</h3>
  <p>
    传感器能够测量的最大相对湿度值，单位 0.01% RH。
    <code>MeasuredValue</code> 不会超过此值。
    值为 <code>null</code> 表示最大值未定义。范围 <code>1</code> ~ <code>10000</code>（0.01% ~ 100% RH），且必须大于 <code>MinMeasuredValue</code>。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">Tolerance（测量容差）</h3>
  <p>
    传感器的测量精度，单位 0.01% RH。表示实际值与上报值之间的最大偏差。
    例如 <code>Tolerance = 200</code> 表示精度为 &#177;2.00% RH。
    范围 <code>0</code> ~ <code>2048</code>（0% ~ 20.48% RH）。这是可选属性，不是所有设备都支持。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个温湿度传感器的 RelativeHumidityMeasurement Cluster 属性：</p>

  <pre><code>{
  // --- 湿度测量 ---
  "0x0": 6500,          // MeasuredValue = 6500 → 实际 65.00% RH
  "0x1": 0,             // MinMeasuredValue = 0 → 0.00% RH
  "0x2": 10000,         // MaxMeasuredValue = 10000 → 100.00% RH
  "0x3": 200            // Tolerance = 200 → ±2.00% RH
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">数据解读</div>
    <p>
      上面的示例表示：当前湿度 <strong>65.00% RH</strong>，传感器量程 0% ~ 100%，精度 &#177;2.00%。
      App 展示时只需读取 <code>MeasuredValue</code> 并除以 100 即可。如果值为 <code>null</code>，
      界面应显示"--"或"暂无数据"而非 0。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：读取并展示当前湿度</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>MeasuredValue (0x00)</code>，注意处理 <code>null</code>（传感器未就绪或故障）</li>
        <li>除以 100 得到实际百分比，保留两位小数</li>
        <li>可选读取 <code>Tolerance (0x03)</code>，在详情页展示精度信息（如"&#177;2%"）</li>
        <li>订阅 <code>MeasuredValue</code> 的变化通知，实时更新界面</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：舒适区间自动化</summary>
    <div class="scenario-content">
      <ol>
        <li>定义舒适湿度区间，例如 40% ~ 60% RH（对应原始值 4000 ~ 6000）</li>
        <li>订阅 <code>MeasuredValue</code> 变化，当湿度低于 4000 时触发加湿器开启</li>
        <li>当湿度回到 5000 以上时关闭加湿器（留出回差避免频繁开关）</li>
        <li>结合 TemperatureMeasurement Cluster 的温度数据，综合判断环境舒适度</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：除湿机联动控制</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>MaxMeasuredValue (0x02)</code> 确认传感器量程覆盖高湿场景</li>
        <li>设定除湿阈值（如 70% RH = 7000），当 <code>MeasuredValue</code> 超过阈值时启动除湿</li>
        <li>除湿目标达到 55% RH（5500）后停止，预留回差防止反复启停</li>
        <li>利用 <code>Tolerance</code> 属性评估判断精度 —— 如果容差较大（如 &#177;5%），阈值设置应更保守</li>
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
  .attr-cn {
    font-size: 0.8125rem;
    color: #6b7280;
  }

  .dark .attr-cn {
    color: #9ca3af;
  }
</style>`,
  },
  'pressure-measurement': {
    title: '气压测量 Cluster · PressureMeasurement（0x0403）',
    description: 'Matter PressureMeasurement Cluster（0x0403）完整参考 — MeasuredValue / Tolerance / EXT 扩展精度属性、kPa 单位说明、气象站与 HVAC 气压监控场景。',
    prev: { title: '温度测量（TemperatureMeasurement）', slug: 'temperature-measurement' },
    next: undefined,
    content: `<h1>气压测量 Cluster（PressureMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0403</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    PressureMeasurement 用于上报大气压/气压传感器测量到的压力值。
    这个 Cluster 是<strong>纯只读的</strong> —— 没有 Command，设备作为 Server 被动上报数据，App（Client）读取或订阅即可。
    常见于气象站、温湿度气压计、HVAC 系统等设备。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">单位是 kPa，不是 hPa！</div>
    <p>
      <code>MeasuredValue</code> 的单位是 <strong>kPa</strong>（千帕），不是气象领域常用的 hPa（百帕）。
      标准大气压 ≈ <strong>101.325 kPa = 1013.25 hPa</strong>，所以设备返回的值大约在 <code>101</code> 左右。
      如果需要展示 hPa，需要 <strong>乘以 10</strong>：<code>101 kPa × 10 = 1010 hPa</code>。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">null 值含义</div>
    <p>
      <code>MeasuredValue</code>、<code>MinMeasuredValue</code>、<code>MaxMeasuredValue</code> 都是 Nullable。
      返回 <code>null</code> 表示传感器数据无效或尚未完成测量。App 应展示「--」而非 0。
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map</h2>
  <p>PressureMeasurement 定义了一个可选 Feature，用于提供更高精度的压力数据。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>名称</th>
          <th>代码</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>Extended</td>
          <td><code>EXT</code></td>
          <td>扩展精度 —— 启用 ScaledValue 等高精度属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">EXT 有什么用？</div>
    <p>
      基础属性 <code>MeasuredValue</code> 是 int16 类型，单位 kPa，精度只到 1 kPa。
      对于气象应用来说太粗 —— 天气变化引起的气压波动通常只有几个 hPa（零点几 kPa）。
      启用 EXT 后，设备可以通过 <code>ScaledValue</code> + <code>Scale</code>（指数）提供任意精度的压力值。
    </p>
  </div>

  <!-- ====== 基础属性 ====== -->
  <h2 id="attributes">基础属性</h2>
  <p>以下 4 个属性所有 PressureMeasurement 设备都支持。点击属性 ID 可跳转到详细说明。</p>

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
          <td>MeasuredValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>当前气压（单位 kPa），Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>传感器可测最低气压，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>传感器可测最高气压，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>测量容差（单位 kPa）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x00">MeasuredValue（当前测量气压）</h3>
  <p>
    传感器最近一次测量到的气压值，单位 kPa。这是整个 Cluster 最核心的属性。
  </p>
  <ul>
    <li><strong>类型</strong>: int16（有符号），Nullable</li>
    <li><strong>范围</strong>: -32767 到 32767 kPa</li>
    <li><strong>换算</strong>: <code>hPa = MeasuredValue × 10</code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">常见值速查</div>
    <p>
      <code>101</code> = 101 kPa ≈ 标准大气压 &nbsp;|&nbsp;
      <code>100</code> = 1000 hPa（低气压）&nbsp;|&nbsp;
      <code>103</code> = 1030 hPa（高气压）&nbsp;|&nbsp;
      <code>70</code> = 700 hPa（约海拔 3000m）
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（可测最低气压）</h3>
  <p>
    传感器能够测量的最低气压值，单位 kPa。
    值为 <code>null</code> 时表示设备未定义下限。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（可测最高气压）</h3>
  <p>
    传感器能够测量的最高气压值，单位 kPa。
    值为 <code>null</code> 时表示设备未定义上限。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">Tolerance（测量容差）</h3>
  <p>
    传感器的测量精度容差，单位 kPa。例如值为 <code>1</code>，表示精度为 &plusmn;1 kPa（&plusmn;10 hPa）。
    可选属性，不是所有设备都上报。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 扩展属性 ====== -->
  <h2 id="ext-attributes">扩展属性（EXT Feature）</h2>
  <p>以下属性仅在设备支持 <code>EXT</code> Feature 时存在，提供比基础 kPa 整数更高的精度。</p>

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
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>ScaledValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>高精度气压值，需配合 Scale 换算</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>MinScaledValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>ScaledValue 的最小值，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>MaxScaledValue</td>
          <td>int16 / null</td>
          <td>只读</td>
          <td>ScaledValue 的最大值，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>ScaledTolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>ScaledValue 的测量容差</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>Scale</td>
          <td>int8</td>
          <td>只读</td>
          <td>指数因子，实际值 = ScaledValue &times; 10<sup>Scale</sup> kPa</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-0x10">ScaledValue（高精度气压值）</h3>
  <p>
    高精度的压力测量值，需要配合 <code>Scale</code> 属性换算：
  </p>
  <p><strong>实际压力 = ScaledValue &times; 10<sup>Scale</sup> kPa</strong></p>
  <div class="callout callout-tip">
    <div class="callout-title">换算示例</div>
    <p>
      <code>ScaledValue = 10132</code>，<code>Scale = -1</code><br/>
      实际压力 = 10132 &times; 10<sup>-1</sup> = <strong>1013.2 hPa = 101.32 kPa</strong><br/><br/>
      <code>ScaledValue = 101325</code>... 不可能，int16 最大 32767。
      所以 Scale 的选择决定了精度和量程的平衡 —— <code>Scale = -1</code> 时精度 0.1 kPa（1 hPa），
      <code>Scale = -2</code> 时精度 0.01 kPa 但量程缩小到 &plusmn;327.67 kPa。
    </p>
  </div>
  <p class="back-link"><a href="#ext-attributes">&#8593; 返回扩展属性列表</a></p>

  <h3 id="attr-0x11">MinScaledValue / <span id="attr-0x12">MaxScaledValue</span></h3>
  <p>
    <code>ScaledValue</code> 的有效范围上下限，含义与基础属性的 Min/Max 对应。
    同样是 Nullable，为 <code>null</code> 表示未定义。换算方式与 ScaledValue 一致（乘以 10<sup>Scale</sup>）。
  </p>
  <p class="back-link"><a href="#ext-attributes">&#8593; 返回扩展属性列表</a></p>

  <h3 id="attr-0x13">ScaledTolerance（扩展容差）</h3>
  <p>
    <code>ScaledValue</code> 的测量精度容差，换算方式同上。
    例如 <code>ScaledTolerance = 10</code>，<code>Scale = -1</code>，则精度为 &plusmn;1 hPa。
  </p>
  <p class="back-link"><a href="#ext-attributes">&#8593; 返回扩展属性列表</a></p>

  <h3 id="attr-0x14">Scale（指数因子）</h3>
  <p>
    int8 类型的指数值，决定 ScaledValue 系列属性的实际精度。
    常见值：
  </p>
  <ul>
    <li><code>0</code> —— 与基础属性相同，单位 kPa，无额外精度</li>
    <li><code>-1</code> —— 精度 0.1 kPa（= 1 hPa），最常用</li>
    <li><code>-2</code> —— 精度 0.01 kPa（= 0.1 hPa），高精度气象站</li>
  </ul>
  <p class="back-link"><a href="#ext-attributes">&#8593; 返回扩展属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    PressureMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集气压数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个气象站设备的 PressureMeasurement 基础属性：</p>
  <pre><code>{
  // --- PressureMeasurement Cluster（Endpoint 1）---
  "0x0": 101,         // MeasuredValue = 101 → 实际 101 kPa（≈标准大气压）
  "0x1": 30,          // MinMeasuredValue = 30 → 30 kPa
  "0x2": 110,         // MaxMeasuredValue = 110 → 110 kPa
  "0x3": 1            // Tolerance = 1 → ±1 kPa
}</code></pre>

  <p>支持 EXT Feature 的设备还会返回扩展属性：</p>
  <pre><code>{
  // --- 扩展精度属性（需要 EXT Feature）---
  "0x10": 10132,      // ScaledValue = 10132，Scale = -1 → 10132 × 10⁻¹ = 1013.2 kPa？
                       // 不，Scale 用于细分：10132 × 10⁻¹ = 1013.2 hPa = 101.32 kPa
  "0x11": 3000,       // MinScaledValue = 3000
  "0x12": 11000,      // MaxScaledValue = 11000
  "0x13": 10,         // ScaledTolerance = 10
  "0x14": -1          // Scale = -1（指数）
  // 实际值 = ScaledValue × 10^Scale kPa = 10132 × 0.1 = 1013.2 hPa
}</code></pre>

  <p>订阅气压变化 —— 实时跟踪气压趋势：</p>
  <pre><code>{
  // 订阅气压变化（每 60 秒~10 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0403",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 60,        // 最少 60 秒上报一次
    "maxIntervalCeiling": 600      // 最多 10 分钟上报一次
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">单位转换代码参考</div>
    <p>处理设备返回值时的关键逻辑：</p>
    <pre><code>{\`// 基础属性：MeasuredValue 单位 kPa
val rawKpa: Int? = 101               // Nullable
val hPa = rawKpa?.let { it * 10.0 }  // → 1010.0 hPa
val display = hPa?.let { "%.0f hPa".format(it) } ?: "--"

// EXT 扩展属性：ScaledValue + Scale
val scaled: Int? = 10132
val scale: Int = -1
val actualKpa = scaled?.let { it * Math.pow(10.0, scale.toDouble()) }  // → 1013.2 hPa
val displayExt = actualKpa?.let { "%.1f hPa".format(it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：气象站 —— 气压趋势监测</summary>
    <div class="scenario-content">
      <ol>
        <li>检查设备 FeatureMap 是否包含 <code>EXT</code>（bit 0），有则优先使用 <code>ScaledValue</code> 获取高精度数据</li>
        <li>订阅气压变化，记录历史数据绘制趋势图</li>
        <li>气压持续下降（3 小时内下降 &gt; 3 hPa）通常预示天气转差，可推送提醒</li>
        <li>展示时建议使用 hPa（气象习惯），基础属性 <code>MeasuredValue × 10</code> 即可</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：海拔高度估算</summary>
    <div class="scenario-content">
      <ol>
        <li>利用气压与海拔的关系进行粗略估算（气压测高法）</li>
        <li>国际标准大气近似公式：<code>海拔(m) ≈ 44330 × (1 - (P/P₀)^0.1903)</code>，P₀ = 101.325 kPa</li>
        <li>精度受温度、湿度、天气系统影响较大，仅供参考</li>
        <li>建议使用 EXT 扩展属性以获得更精确的气压值，提高海拔估算准确度</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：HVAC 气压监控</summary>
    <div class="scenario-content">
      <ol>
        <li>洁净室、实验室等场景需要监控室内外压差</li>
        <li>订阅 <code>MeasuredValue</code>，设定正压/负压阈值</li>
        <li>压差异常时触发报警或自动调节新风系统</li>
        <li>结合 TemperatureMeasurement（0x0402）和 RelativeHumidityMeasurement（0x0405）实现环境综合监控</li>
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
  'illuminance-measurement': {
    title: '光照度测量 Cluster · IlluminanceMeasurement（0x0400）',
    description: 'Matter IlluminanceMeasurement Cluster（0x0400）完整参考 — MeasuredValue 对数换算、MinMeasuredValue / MaxMeasuredValue / Tolerance / LightSensorType 属性定义、lux 转换公式与光照传感器应用场景。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>光照度测量 Cluster（IlluminanceMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0400</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    IlluminanceMeasurement 用于上报环境光照强度（单位 lux）。
    这是一个<strong>纯只读的 Server Cluster</strong> —— 没有任何命令，只有 <strong>5 个属性</strong>。
    光照传感器、多合一环境传感器、智能窗帘控制器等设备会用到它。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">关键陷阱：对数刻度，不是线性值</div>
    <p>
      <code>MeasuredValue</code> 不是 lux 的直接值，而是经过<strong>对数变换</strong>后的整数：
    </p>
    <p style="text-align: center; font-size: 1.125rem;">
      <code>MeasuredValue = 10000 &times; log<sub>10</sub>(lux) + 1</code>
    </p>
    <p>
      反向换算（App 必须做的）：
    </p>
    <p style="text-align: center; font-size: 1.125rem;">
      <code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code>
    </p>
    <p>
      例如设备返回 <code>10001</code>，实际光照是 <strong>10 lux</strong>，不是一万多 lux。
      直接展示原始值会让用户误以为亮度极高。<strong>展示前必须做对数反转</strong>。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">常见 MeasuredValue 速查</div>
    <p>
      <code>1</code> = 1 lux（月光）&nbsp;|&nbsp;
      <code>10001</code> = 10 lux（昏暗走廊）&nbsp;|&nbsp;
      <code>20001</code> = 100 lux（普通室内）&nbsp;|&nbsp;
      <code>30001</code> = 1000 lux（阴天户外）&nbsp;|&nbsp;
      <code>40001</code> = 10000 lux（晴天户外）
    </p>
    <p>
      值为 <code>0</code> 表示光照低于传感器可测下限；值为 <code>null</code> 表示传感器尚未完成测量或数据无效，App 应显示"--"。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>IlluminanceMeasurement 有 5 个属性，其中 <code>MeasuredValue</code> 是最核心的。点击属性 ID 可跳转到详细说明。</p>

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
          <td>MeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>当前光照度（对数刻度），Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>传感器可测最低光照度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16 / null</td>
          <td>只读</td>
          <td>传感器可测最高光照度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>测量容差（对数刻度）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LightSensorType</td>
          <td>enum8 / null</td>
          <td>只读</td>
          <td>传感器类型，Nullable</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attr-details">属性详解</h2>

  <h3 id="attr-0x00">MeasuredValue（当前光照度）</h3>
  <p>
    传感器最近一次测量到的光照强度，<strong>采用对数刻度编码</strong>。这是整个 Cluster 最核心的属性。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>有效范围</strong>: <code>1</code> ~ <code>65534</code>（对应约 1 lux ~ 3.5 &times; 10<sup>6</sup> lux）</li>
    <li><strong>特殊值</strong>: <code>0</code> = 光照低于可测下限；<code>null</code> = 数据无效或未完成测量</li>
    <li><strong>换算</strong>: <code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code></li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">转换代码参考</div>
    <pre><code>{\`// 设备返回 MeasuredValue
val rawValue: Int? = 10001    // Nullable，可能为 null
val lux = when {
    rawValue == null -> null           // 传感器未就绪
    rawValue == 0    -> 0.0            // 低于可测下限
    else -> Math.pow(10.0, (rawValue - 1).toDouble() / 10000.0)
}
// rawValue = 10001 → lux = 10.0
// rawValue = 20001 → lux = 100.0
// rawValue = 30001 → lux = 1000.0

// 显示时处理 null 和精度
val display = lux?.let { String.format("%.0f lux", it) } ?: "--"\`}</code></pre>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（可测最低光照度）</h3>
  <p>
    传感器能够测量的最低光照度值（对数刻度编码）。当 <code>MeasuredValue</code> 为 <code>0</code> 时，
    表示实际光照低于此下限。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: <code>1</code> ~ <code>65533</code></li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义下限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（可测最高光照度）</h3>
  <p>
    传感器能够测量的最高光照度值（对数刻度编码）。
    <code>MeasuredValue</code> 不会超过此值。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: <code>2</code> ~ <code>65534</code>，且必须大于 <code>MinMeasuredValue</code></li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义上限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">Tolerance（测量容差）</h3>
  <p>
    传感器的测量精度容差，同样采用对数刻度。这是可选属性，不是所有设备都上报。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16（无符号）</li>
    <li><strong>范围</strong>: <code>0</code> ~ <code>2048</code></li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x04">LightSensorType（传感器类型）</h3>
  <p>
    描述设备使用的光照传感器类型。不同传感器类型在光谱响应和灵敏度上有差异。
    值为 <code>null</code> 表示传感器类型未知。
  </p>

  <h4>LightSensorTypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Photodiode</span>
        <span class="enum-desc">光电二极管 — 响应快、线性度好，常见于专业照度计</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">CMOS</span>
        <span class="enum-desc">CMOS 图像传感器 — 成本低、集成度高，常见于多合一传感器</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">传感器类型未知</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    IlluminanceMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集光照数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个光照传感器的 IlluminanceMeasurement Cluster 属性：</p>
  <pre><code>{
  // --- IlluminanceMeasurement Cluster（Endpoint 1）---
  "0x0":  10001,       // MeasuredValue = 10001 → 10 lux（普通走廊照度）
  "0x1":  1,           // MinMeasuredValue = 1 → 1 lux
  "0x2":  50001,       // MaxMeasuredValue = 50001 → 100000 lux
  "0x3":  0,           // Tolerance = 0（未上报容差）
  "0x4":  0            // LightSensorType = Photodiode
}</code></pre>

  <p>订阅光照变化 —— 实时跟踪光照更新：</p>
  <pre><code>{
  // 订阅光照变化（每 10 秒~2 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0400",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 10,        // 最少 10 秒上报一次
    "maxIntervalCeiling": 120      // 最多 2 分钟上报一次
  }]
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：读取并展示当前光照度</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>MeasuredValue (0x00)</code>，先判断 <code>null</code>（传感器未就绪）和 <code>0</code>（低于可测下限）</li>
        <li>对数反转：<code>lux = 10<sup>(MeasuredValue - 1) / 10000</sup></code></li>
        <li>根据 lux 值选择合适的展示单位 —— 低于 1000 显示整数（如"320 lux"），超过 1000 可用"klux"（如"12.5 klux"）</li>
        <li>可选：读取 <code>LightSensorType (0x04)</code>，在设备详情页展示传感器类型</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：自动窗帘 / 灯光联动</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，持续监听光照变化</li>
        <li>设定阈值 —— 例如低于 100 lux（对应 MeasuredValue &asymp; 20001）时自动开灯，高于 500 lux（对应 &asymp; 26990）时自动关灯</li>
        <li>加入回差（Hysteresis） —— 开灯阈值和关灯阈值拉开差距，避免阴天云层间歇导致灯光反复开关</li>
        <li>结合 OccupancySensing Cluster（0x0406）：只在有人时响应光照变化，无人时保持关灯</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：日照统计与节能分析</summary>
    <div class="scenario-content">
      <ol>
        <li>定时采样 <code>MeasuredValue</code>（如每 5 分钟一次），转换为 lux 后存储</li>
        <li>按日统计光照曲线 —— 可以判断房间朝向、遮光效果</li>
        <li>结合 LevelControl Cluster（0x0008）的调光记录，分析自然光利用率，优化灯光策略</li>
        <li>对数刻度天然适合大范围光照记录 —— 从月光（1 lux）到直射阳光（100000 lux）都能精确表达</li>
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
  'flow-measurement': {
    title: '流量测量 Cluster · FlowMeasurement（0x0404）',
    description: 'Matter FlowMeasurement Cluster（0x0404）完整参考 — MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Tolerance 属性定义、0.1 m³/h 单位换算、液体与气体流量传感器数据读取与场景应用。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>流量测量 Cluster（FlowMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0404</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    FlowMeasurement 用于测量液体或气体的流速，是一个纯只读的传感器 Cluster —— 只有 <strong>4 个属性</strong>，没有任何命令。
    设备作为 Server 角色被动上报流量数据，App（Client）读取或订阅即可。
    常见于水流量传感器、气体流量计、HVAC 风量检测装置等设备。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">流量单位陷阱：0.1 m³/h</div>
    <p>
      所有流量属性的值都以 <strong>0.1 m³/h</strong>（立方米每小时）为单位。设备返回 <code>150</code>，实际流量是 <code>15.0 m³/h</code>；
      返回 <code>23</code>，实际流量是 <code>2.3 m³/h</code>。
      <strong>展示时必须除以 10</strong>，否则用户会看到「150 立方米每小时」的离谱数值。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">null 值含义</div>
    <p>
      <code>MeasuredValue</code>、<code>MinMeasuredValue</code>、<code>MaxMeasuredValue</code> 都是 Nullable。
      返回 <code>null</code> 表示当前数据无效或传感器尚未完成测量。App 应展示「--」而非 0。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>FlowMeasurement 只有四个属性，其中 <code>MeasuredValue</code> 是最常用的。点击属性 ID 可跳转到详细说明。</p>

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
          <td>MeasuredValue</td>
          <td>uint16</td>
          <td>只读</td>
          <td>当前流量（单位 0.1 m³/h），Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>uint16</td>
          <td>只读</td>
          <td>传感器可测最低流量，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>uint16</td>
          <td>只读</td>
          <td>传感器可测最高流量，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>Tolerance</td>
          <td>uint16</td>
          <td>只读</td>
          <td>测量精度容差（单位 0.1 m³/h）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attr-details">属性详解</h2>

  <h3 id="attr-0x00">MeasuredValue（当前测量流量）</h3>
  <p>
    传感器最近一次测量到的流量值，单位 0.1 m³/h。这是整个 Cluster 最核心的属性。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16（无符号）</li>
    <li><strong>范围</strong>: 0 到 65534</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示传感器数据无效或尚未完成首次测量</li>
    <li><strong>换算</strong>: <code>实际流量 = MeasuredValue / 10</code>（单位 m³/h）</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">常见值速查</div>
    <p>
      <code>0</code> = 0.0 m³/h &nbsp;|&nbsp;
      <code>50</code> = 5.0 m³/h &nbsp;|&nbsp;
      <code>150</code> = 15.0 m³/h &nbsp;|&nbsp;
      <code>1000</code> = 100.0 m³/h &nbsp;|&nbsp;
      <code>5000</code> = 500.0 m³/h
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（可测最低流量）</h3>
  <p>
    传感器能够测量的最低流量值，单位 0.1 m³/h。App 可以用它来设置流量显示范围的下限，或判断当前读数是否已经触底。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: 0 到 MaxMeasuredValue - 1</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义下限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（可测最高流量）</h3>
  <p>
    传感器能够测量的最高流量值，单位 0.1 m³/h。当 <code>MeasuredValue</code> 接近此上限时，可能意味着流量已超出传感器正常工作范围。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16，Nullable</li>
    <li><strong>范围</strong>: MinMeasuredValue + 1 到 65534</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义上限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">Tolerance（测量容差）</h3>
  <p>
    传感器的测量精度容差，单位 0.1 m³/h。例如值为 <code>10</code>，表示测量精度为 <strong>&plusmn;1.0 m³/h</strong>。
    这个属性是可选的，不是所有设备都上报。
  </p>
  <ul>
    <li><strong>类型</strong>: uint16（无符号，容差不会为负）</li>
    <li><strong>范围</strong>: 0 到 2048（即 0 到 &plusmn;204.8 m³/h）</li>
  </ul>
  <div class="callout callout-info">
    <div class="callout-title">Tolerance 的实际用途</div>
    <p>
      如果传感器报告 <code>MeasuredValue = 150</code>（15.0 m³/h）且 <code>Tolerance = 10</code>（&plusmn;1.0 m³/h），
      那么实际流量在 14.0 m³/h ~ 16.0 m³/h 之间。做流量阈值触发自动化时，应将容差纳入考量，避免在阈值附近频繁触发报警。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    FlowMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集流量数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个水流量传感器的 FlowMeasurement Cluster 属性：</p>
  <pre><code>{
  // --- FlowMeasurement Cluster（Endpoint 1）---
  "0x0": 150,        // MeasuredValue = 150 → 实际 15.0 m³/h
  "0x1": 0,          // MinMeasuredValue = 0 → 实际 0.0 m³/h
  "0x2": 5000,       // MaxMeasuredValue = 5000 → 实际 500.0 m³/h
  "0x3": 10          // Tolerance = 10 → 实际 ±1.0 m³/h
}</code></pre>

  <p>读取请求示例 —— 一次性获取 Cluster 全部属性：</p>
  <pre><code>{
  // 读取流量传感器的所有属性
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0404"
      // 不指定 attributeId → 读取该 Cluster 全部属性
    }
  }]
}</code></pre>

  <p>订阅流量变化 —— 实时跟踪流量更新：</p>
  <pre><code>{
  // 订阅流量变化（每 10 秒~2 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x0404",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 10,        // 最少 10 秒上报一次
    "maxIntervalCeiling": 120      // 最多 2 分钟上报一次
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">流量转换代码参考</div>
    <p>
      处理设备返回值时的关键逻辑：
    </p>
    <pre><code>{\`// 设备返回 MeasuredValue = 150
val rawValue: Int? = 150    // Nullable，可能为 null
val flowRate = rawValue?.let { it / 10.0 }  // → 15.0 m³/h
val flowLiterPerMin = flowRate?.let { it * 1000.0 / 60.0 }  // → 250.0 L/min

// 显示时处理 null
val display = flowRate?.let { String.format("%.1f m³/h", it) } ?: "--"\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：家庭水流监测</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，设置合理的上报间隔（如 10 秒 ~ 2 分钟）</li>
        <li>收到新值后除以 10，得到实际流量：<code>150 → 15.0 m³/h</code></li>
        <li>处理 <code>null</code> 值 —— 展示「--」或「传感器离线」，不要显示 0</li>
        <li>设定异常流量阈值 —— 例如凌晨持续检测到流量大于 0，可能存在漏水，触发报警通知</li>
        <li>可选：累计流量统计，定期读取 <code>MeasuredValue</code> 并按时间积分估算用水量</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：HVAC 风量检测</summary>
    <div class="scenario-content">
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，持续监听风管内气体流量变化</li>
        <li>读取 <code>MinMeasuredValue</code> / <code>MaxMeasuredValue</code> 确认传感器量程，判断当前风量是否在正常工作范围内</li>
        <li>考虑 <code>Tolerance</code> 容差 —— 如果容差为 &plusmn;1.0 m³/h，阈值设定时应留出裕量，避免在边界值频繁触发</li>
        <li>配合 FanControl Cluster（0x0202）实现闭环控制：流量传感器报告实际风量，风扇控制器调整转速以维持目标风量</li>
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
  'occupancy-sensing': {
    title: '占用感应 Cluster · OccupancySensing（0x0406）',
    description: 'Matter OccupancySensing Cluster（0x0406）完整参考 — Occupancy 位图、PIR / 超声波 / 物理接触 / 雷达传感器类型、延迟与阈值参数、HoldTime 配置，纯只读 Cluster，无命令。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>占用感应 Cluster（OccupancySensing）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0406</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    OccupancySensing 用于报告设备所在区域是否有人（或物体）存在。
    传感器类型包括 <strong>被动红外（PIR）</strong>、<strong>超声波</strong>、<strong>物理接触</strong>和<strong>雷达</strong>。
    这个 Cluster 是<strong>纯只读的</strong> —— 只有属性，没有命令。App 通过订阅属性变化来获取占用状态的实时更新。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">传感器类型决定行为</div>
    <p>
      不同传感器类型的工作原理差异很大：PIR 靠检测人体热辐射变化，超声波通过反射波检测运动，物理接触依赖压力传感器，雷达则用微波信号穿墙检测。
      <code>OccupancySensorType</code> 属性决定了设备支持哪组延迟/阈值参数，App 应根据传感器类型展示不同的配置界面。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>属性按功能分为四组：核心状态、PIR 传感器参数、超声波传感器参数、物理接触传感器参数。点击属性 ID 可跳转到详细说明。</p>

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
        <!-- 核心状态 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Occupancy</td>
          <td>bitmap8</td>
          <td><a href="#group-core">核心状态</a></td>
          <td>当前占用状态位图</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>OccupancySensorType</td>
          <td>enum8</td>
          <td><a href="#group-core">核心状态</a></td>
          <td>传感器类型</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>OccupancySensorTypeBitmap</td>
          <td>bitmap8</td>
          <td><a href="#group-core">核心状态</a></td>
          <td>传感器类型位图（支持多种类型）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>HoldTime</td>
          <td>uint16</td>
          <td><a href="#group-core">核心状态</a></td>
          <td>占用状态保持时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>HoldTimeLimits</td>
          <td>struct</td>
          <td><a href="#group-core">核心状态</a></td>
          <td>HoldTime 的可调范围</td>
        </tr>
        <!-- PIR 传感器 -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>PIROccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-pir">PIR 传感器</a></td>
          <td>PIR 占用→未占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>PIRUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-pir">PIR 传感器</a></td>
          <td>PIR 未占用→占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>PIRUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-pir">PIR 传感器</a></td>
          <td>PIR 触发次数阈值</td>
        </tr>
        <!-- 超声波传感器 -->
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>UltrasonicOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-ultrasonic">超声波传感器</a></td>
          <td>超声波 占用→未占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>UltrasonicUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-ultrasonic">超声波传感器</a></td>
          <td>超声波 未占用→占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>UltrasonicUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-ultrasonic">超声波传感器</a></td>
          <td>超声波触发次数阈值</td>
        </tr>
        <!-- 物理接触传感器 -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>PhysicalContactOccupiedToUnoccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-physical">物理接触传感器</a></td>
          <td>物理接触 占用→未占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>PhysicalContactUnoccupiedToOccupiedDelay</td>
          <td>uint16</td>
          <td><a href="#group-physical">物理接触传感器</a></td>
          <td>物理接触 未占用→占用延迟（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>PhysicalContactUnoccupiedToOccupiedThreshold</td>
          <td>uint8</td>
          <td><a href="#group-physical">物理接触传感器</a></td>
          <td>物理接触触发次数阈值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 核心状态（0x00-0x04）====== -->
  <h3 id="group-core">核心状态（0x00 - 0x04）</h3>
  <p>所有 OccupancySensing 设备必须支持的属性，描述当前占用状态和传感器类型。</p>

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
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>Occupancy（占用状态）</td>
          <td>bitmap8</td>
          <td>只读</td>
          <td>bit 0（SensedOccupancy）：<code>1</code> = 已占用，<code>0</code> = 未占用。其余 bit 保留</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>OccupancySensorType（传感器类型）</td>
          <td>enum8</td>
          <td>只读</td>
          <td>设备使用的主要传感器类型（见下方枚举）</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>OccupancySensorTypeBitmap（传感器类型位图）</td>
          <td>bitmap8</td>
          <td>只读</td>
          <td>设备支持的所有传感器类型的位图（见下方位定义）</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>HoldTime（保持时间）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>最后一次检测到占用后，状态保持「已占用」的秒数。防止状态在短暂离开时频繁翻转</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>HoldTimeLimits（保持时间范围）</td>
          <td>struct</td>
          <td>只读</td>
          <td>包含 HoldTimeMin、HoldTimeMax、HoldTimeDefault 三个字段，描述 HoldTime 的可调范围</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Occupancy 是位图，不是布尔值</div>
    <p>
      <code>Occupancy</code> 的类型是 <code>bitmap8</code>，不是 <code>bool</code>。只有 <strong>bit 0</strong>（SensedOccupancy）表示占用状态，其余 bit 保留供未来使用。
      读取时应做位运算：<code>isOccupied = (Occupancy &amp; 0x01) != 0</code>，不要直接判断是否等于 <code>1</code>。
    </p>
  </div>

  <h4>OccupancySensorTypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PIR</span>
        <span class="enum-desc">被动红外 —— 检测人体热辐射变化，最常见的类型</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Ultrasonic</span>
        <span class="enum-desc">超声波 —— 发射超声波并检测反射变化，适合检测微小运动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PIRAndUltrasonic</span>
        <span class="enum-desc">PIR + 超声波双重检测，精度更高，误报更少</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PhysicalContact</span>
        <span class="enum-desc">物理接触 —— 压力传感器、座椅感应器等</span>
      </div>
    </div>
  </div>

  <h4>OccupancySensorTypeBitmap 位定义</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">bit 0</span>
      <div>
        <span class="enum-name">PIR</span>
        <span class="enum-desc">支持被动红外传感</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">bit 1</span>
      <div>
        <span class="enum-name">Ultrasonic</span>
        <span class="enum-desc">支持超声波传感</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">bit 2</span>
      <div>
        <span class="enum-name">PhysicalContact</span>
        <span class="enum-desc">支持物理接触传感</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">HoldTime 的作用</div>
    <p>
      想象一个会议室人体传感器：有人短暂离开去接水，不希望灯立即关闭。
      <code>HoldTime</code> 就是这个「缓冲期」—— 设置为 <code>30</code> 秒意味着最后一次检测到人之后，设备会再保持 30 秒的「已占用」状态，然后才切换到「未占用」。
      App 可以让用户在 <code>HoldTimeLimits</code> 范围内自行调整这个值。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== PIR 传感器（0x10-0x12）====== -->
  <h3 id="group-pir">PIR 传感器参数（0x10 - 0x12）</h3>
  <p>
    仅当 <code>OccupancySensorType</code> 为 PIR（0）或 PIRAndUltrasonic（2）时才有意义。
    控制 PIR 传感器状态切换的延迟和灵敏度。
  </p>

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
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>PIROccupiedToUnoccupiedDelay（占用→未占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>PIR 检测到占用消失后，延迟多少秒才切换到「未占用」。默认 <code>0</code>（立即切换）</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>PIRUnoccupiedToOccupiedDelay（未占用→占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>PIR 检测到占用出现后，延迟多少秒才切换到「已占用」。用于过滤瞬间误触发</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>PIRUnoccupiedToOccupiedThreshold（触发阈值）</td>
          <td>uint8</td>
          <td>读写</td>
          <td>在延迟时间内需要检测到多少次占用事件才触发切换。范围 1~254，默认 <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">延迟与阈值配合使用</div>
    <p>
      假设 <code>PIRUnoccupiedToOccupiedDelay = 10</code>，<code>PIRUnoccupiedToOccupiedThreshold = 3</code>：
      传感器需要在 10 秒内检测到 3 次占用事件，才会从「未占用」切换到「已占用」。
      这种组合能有效过滤宠物经过、窗帘飘动等误触发。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 超声波传感器（0x20-0x22）====== -->
  <h3 id="group-ultrasonic">超声波传感器参数（0x20 - 0x22）</h3>
  <p>
    仅当 <code>OccupancySensorType</code> 为 Ultrasonic（1）或 PIRAndUltrasonic（2）时才有意义。
    参数含义与 PIR 组完全对称。
  </p>

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
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>UltrasonicOccupiedToUnoccupiedDelay（占用→未占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>超声波检测到占用消失后，延迟多少秒才切换到「未占用」。默认 <code>0</code></td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>UltrasonicUnoccupiedToOccupiedDelay（未占用→占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>超声波检测到占用出现后，延迟多少秒才切换到「已占用」</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>UltrasonicUnoccupiedToOccupiedThreshold（触发阈值）</td>
          <td>uint8</td>
          <td>读写</td>
          <td>延迟时间内需要检测到多少次占用事件才触发切换。范围 1~254，默认 <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 物理接触传感器（0x30-0x32）====== -->
  <h3 id="group-physical">物理接触传感器参数（0x30 - 0x32）</h3>
  <p>
    仅当 <code>OccupancySensorType</code> 为 PhysicalContact（3）时才有意义。
    参数含义与 PIR 组完全对称。
  </p>

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
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>PhysicalContactOccupiedToUnoccupiedDelay（占用→未占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>物理接触检测到占用消失后，延迟多少秒才切换到「未占用」。默认 <code>0</code></td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>PhysicalContactUnoccupiedToOccupiedDelay（未占用→占用延迟）</td>
          <td>uint16</td>
          <td>读写</td>
          <td>物理接触检测到占用出现后，延迟多少秒才切换到「已占用」</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>PhysicalContactUnoccupiedToOccupiedThreshold（触发阈值）</td>
          <td>uint8</td>
          <td>读写</td>
          <td>延迟时间内需要检测到多少次占用事件才触发切换。范围 1~254，默认 <code>1</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个典型 PIR 人体传感器的 OccupancySensing Cluster 读取结果：</p>
  <pre><code>{
  // --- 核心状态 ---
  "0x0": 1,              // Occupancy = 0b00000001（bit 0 = 1，检测到占用）
  "0x1": 0,              // OccupancySensorType = PIR（被动红外）
  "0x2": 1,              // OccupancySensorTypeBitmap = 0b00000001（PIR）

  // --- PIR 传感器参数 ---
  "0x10": 0,             // PIROccupiedToUnoccupiedDelay = 0 秒（立即切换）
  "0x11": 10,            // PIRUnoccupiedToOccupiedDelay = 10 秒（延迟切换）
  "0x12": 1,             // PIRUnoccupiedToOccupiedThreshold = 1（触发 1 次即切换）

  // --- 保持时间 ---
  "0x3": 30,             // HoldTime = 30 秒
  "0x4": {               // HoldTimeLimits
    "HoldTimeMin": 1,
    "HoldTimeMax": 600,
    "HoldTimeDefault": 10
  }
}</code></pre>

  <!-- ====== 应用场景 ====== -->
  <h2 id="scenarios">应用场景</h2>
  <p>OccupancySensing 是智能家居自动化的核心触发源之一，以下是三个典型集成场景。</p>

  <details class="scenario">
    <summary>场景 1：智能家居自动化（灯光联动）</summary>
    <div class="scenario-content">
      <p>
        最经典的用法 —— 人来灯亮，人走灯灭。
      </p>
      <ol>
        <li>订阅 <code>Occupancy (0x00)</code> 属性变化</li>
        <li>当 <code>Occupancy</code> bit 0 从 <code>0</code> 变为 <code>1</code>（有人进入），发送 OnOff Cluster 的 <code>On</code> 命令开灯</li>
        <li>当 <code>Occupancy</code> bit 0 从 <code>1</code> 变为 <code>0</code>（无人），发送 <code>Off</code> 命令关灯</li>
        <li>通过调整 <code>HoldTime</code> 控制关灯延迟 —— 会议室建议 300 秒（5 分钟），走廊建议 30 秒</li>
      </ol>
      <p>
        <strong>进阶</strong>：结合 LevelControl Cluster，夜间检测到人时只开到 20% 亮度，白天开到 100%。
        还可以结合多个传感器做区域联动 —— 走廊传感器触发后开启走廊灯和目标房间灯。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：HVAC 节能集成</summary>
    <div class="scenario-content">
      <p>
        将占用感应与 Thermostat Cluster 联动，实现「人在舒适、人走节能」。
      </p>
      <ol>
        <li>订阅 <code>Occupancy (0x00)</code> 属性变化</li>
        <li>检测到占用时，将 Thermostat 的 <code>OccupiedCoolingSetpoint</code> / <code>OccupiedHeatingSetpoint</code> 设为舒适温度（如 24°C / 22°C）</li>
        <li>检测到无人后（经过 <code>HoldTime</code> 延迟），切换到 <code>UnoccupiedCoolingSetpoint</code> / <code>UnoccupiedHeatingSetpoint</code> 节能温度（如 28°C / 18°C）</li>
        <li>建议 <code>HoldTime</code> 设置为 600~900 秒（10~15 分钟），避免短暂离开就切换温度</li>
      </ol>
      <p>
        <strong>注意</strong>：Thermostat Cluster 本身有 Occupancy 属性（<code>0x02</code>），但它只是被动接收状态。
        真正的占用检测数据来源是 OccupancySensing Cluster，通常由自动化规则桥接两者。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：安防与入侵检测</summary>
    <div class="scenario-content">
      <p>
        用户离家设防后，占用传感器检测到异常活动即触发报警。
      </p>
      <ol>
        <li>用户通过 App 启用「离家模式」（设防）</li>
        <li>订阅所有占用传感器的 <code>Occupancy (0x00)</code> 变化</li>
        <li>设防状态下检测到 <code>Occupancy</code> bit 0 = <code>1</code>，触发安防联动：
          <ul>
            <li>推送报警通知到用户手机</li>
            <li>开启摄像头录像</li>
            <li>触发声光报警器</li>
          </ul>
        </li>
        <li>为减少误报，建议提高灵敏度要求：<code>PIRUnoccupiedToOccupiedThreshold = 3</code>，<code>PIRUnoccupiedToOccupiedDelay = 5</code></li>
      </ol>
      <p>
        <strong>提示</strong>：安防场景下建议使用 PIRAndUltrasonic 双模传感器，PIR 容易被宠物误触发，超声波可以做二次确认。
        同时要注意区分设防区域和非设防区域的传感器。
      </p>
    </div>
  </details>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      App 展示占用传感器状态时，典型的处理流程：
    </p>
    <ol>
      <li>读取 <code>OccupancySensorType (0x01)</code>，在 UI 上显示传感器类型图标和名称</li>
      <li>订阅 <code>Occupancy (0x00)</code>，用位运算 <code>&amp; 0x01</code> 取 bit 0，展示「有人 / 无人」状态</li>
      <li>根据传感器类型，仅展示对应的延迟/阈值配置项（PIR 设备不显示超声波参数）</li>
      <li>让用户在 <code>HoldTimeLimits</code> 的范围内调整 <code>HoldTime</code>，用滑块控件更直观</li>
      <li>提供事件历史记录 —— 记录每次占用状态变化的时间，帮助用户了解活动规律</li>
    </ol>
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
  },
  'air-quality': {
    title: '空气质量 Cluster · AirQuality（0x005B）',
    description: 'Matter Air Quality Cluster（0x005B）完整参考 — AirQuality 属性、AirQualityEnum 枚举值速查，空气净化器联动与仪表盘展示场景，空气质量监测的基础 Cluster。',
    prev: undefined,
    next: undefined,
    content: `<h1>空气质量 Cluster（Air Quality）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005B</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 功能端点（通常 <code>Endpoint 1</code> 或空气质量传感器对应的端点）
  </p>
  <p>
    Air Quality Cluster 提供一个综合性的空气质量指数，以枚举值的形式反映当前环境的整体空气状况。
    这是一个极简的只读 Cluster —— 只有 <strong>1 个属性</strong>，<strong>没有任何命令</strong>，也没有 Feature Map。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">定位与搭配</div>
    <p>
      Air Quality 给出的是一个「总评」级别，不包含具体的污染物浓度数据。
      实际应用中它通常与浓度测量类 Cluster 搭配出现，比如 PM2.5 浓度测量（<code>0x042A</code>）、
      CO2 浓度测量（<code>0x040D</code>）、TVOC 浓度测量（<code>0x042E</code>）等。
      这些 Cluster 提供精确数值，Air Quality 则提供一目了然的等级判断。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>Air Quality Cluster 只有一个属性。</p>

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
          <td>AirQuality</td>
          <td>AirQualityEnum</td>
          <td>只读</td>
          <td>当前综合空气质量等级</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">AirQuality（空气质量等级）</h3>
  <p>
    只读属性，表示设备所测得的当前综合空气质量等级。值从 <code>0</code>（Unknown）到 <code>6</code>（ExtremelyPoor）共 7 个级别。
    设备根据内置传感器的读数综合计算后报告此值，具体的计算算法由设备厂商决定。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">Unknown 不等于离线</div>
    <p>
      <code>Unknown(0)</code> 表示设备当前无法确定空气质量等级（比如传感器正在预热、校准、或数据不足），
      并不意味着设备离线或故障。App 端应将其展示为「检测中」或「暂无数据」，而非错误状态。
    </p>
  </div>

  <h4>AirQualityEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知 —— 传感器预热中或数据不足</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Good</span>
        <span class="enum-desc">优 —— 空气质量令人满意，无健康风险</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Fair</span>
        <span class="enum-desc">良 —— 可接受，敏感人群可能有轻微影响</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Moderate</span>
        <span class="enum-desc">中等 —— 敏感人群可能出现健康反应</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Poor</span>
        <span class="enum-desc">差 —— 所有人可能开始感受到健康影响</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">VeryPoor</span>
        <span class="enum-desc">很差 —— 健康警告，所有人可能有较严重反应</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ExtremelyPoor</span>
        <span class="enum-desc">极差 —— 健康紧急状况，应立即采取防护措施</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    Air Quality Cluster 是纯只读的，<strong>没有任何命令</strong>。
    App 只能通过读取属性或订阅上报来获取空气质量数据，无法向设备发送控制指令。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个空气质量传感器的 Air Quality Cluster 属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": 1           // AirQuality = Good（空气质量良好）
}</code></pre>

  <p>订阅空气质量变化（推荐方式）：</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x005B",
      "attributeId": "0x00"       // AirQuality
    },
    "minInterval": 10,            // 最短上报间隔 10 秒
    "maxInterval": 60             // 最长上报间隔 60 秒
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">为什么要订阅而不是轮询</div>
    <p>
      空气质量是一个持续变化的指标。与其定时读取，不如通过 Subscribe 让设备在数值变化时主动上报。
      设置合理的 <code>minInterval</code> 和 <code>maxInterval</code> 可以在实时性和功耗之间取得平衡。
    </p>
  </div>

  <!-- ====== 场景一 ====== -->
  <h2 id="scenario-purifier">场景一：空气净化器联动控制</h2>
  <p>
    空气质量传感器与净化器组成联动：传感器检测到空气变差时自动开启净化器，好转后自动关闭。
  </p>
  <div class="callout callout-info">
    <div class="callout-title">实现思路</div>
    <ol>
      <li>订阅空气质量传感器的 <code>AirQuality</code> 属性变化</li>
      <li>
        收到上报后根据等级判断：
        <ul>
          <li><code>Moderate(3)</code> 及以上 → 发送 On/Off Cluster 的 On 命令，开启净化器</li>
          <li><code>Good(1)</code> → 发送 Off 命令，关闭净化器</li>
          <li><code>Fair(2)</code> → 维持当前状态，避免频繁开关</li>
        </ul>
      </li>
      <li>还可以结合 Level Control Cluster 调节净化器风速 —— <code>Poor(4)</code> 开高速，<code>Moderate(3)</code> 用低速</li>
    </ol>
    <p>
      这个逻辑可以在 App 端实现，也可以利用 Matter 的自动化规则下发到 Hub/Bridge 上运行，后者不依赖 App 在线。
    </p>
  </div>

  <!-- ====== 场景二 ====== -->
  <h2 id="scenario-dashboard">场景二：仪表盘展示</h2>
  <p>
    在智能家居 App 中将空气质量等级可视化展示，通常与浓度测量数据搭配呈现。
  </p>
  <div class="callout callout-info">
    <div class="callout-title">展示建议</div>
    <ol>
      <li>
        用颜色区分等级（参考常见 AQI 配色）：
        <ul>
          <li><code>Good</code> → 绿色</li>
          <li><code>Fair</code> → 黄色</li>
          <li><code>Moderate</code> → 橙色</li>
          <li><code>Poor</code> → 红色</li>
          <li><code>VeryPoor</code> → 紫色</li>
          <li><code>ExtremelyPoor</code> → 褐红色</li>
        </ul>
      </li>
      <li><code>Unknown</code> 显示为灰色并附文字「检测中」，避免用户误以为是故障</li>
      <li>
        在等级卡片下方展示具体浓度数据（来自搭配的 Cluster）：
        <ul>
          <li>PM2.5 浓度（<code>0x042A</code>）</li>
          <li>CO2 浓度（<code>0x040D</code>）</li>
          <li>TVOC 浓度（<code>0x042E</code>）</li>
        </ul>
      </li>
      <li>保留历史趋势图，让用户看到空气质量随时间的变化</li>
    </ol>
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
  },
  'carbon-dioxide-concentration-measurement': {
    title: 'CO2 浓度测量 Cluster · CarbonDioxideConcentrationMeasurement（0x040D）',
    description: 'Matter CarbonDioxideConcentrationMeasurement Cluster（0x040D）完整参考 — CO2 浓度测量属性、Feature Map（MEA/LEV/PEA/AVG）、MeasurementUnit/MeasurementMedium/LevelValue 枚举值速查、浓度测量 Cluster 通用模式说明。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>CO2 浓度测量 Cluster（CarbonDioxideConcentrationMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x040D</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    CarbonDioxideConcentrationMeasurement 用于报告空气中 CO2（二氧化碳）浓度，是室内空气质量监测的核心 Cluster。
    这是一个<strong>纯只读</strong>的 Server Cluster —— 没有任何命令，设备被动采集数据，App 端读取或订阅即可。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">浓度测量 Cluster 家族 —— 通用模板</div>
    <p>
      Matter 中所有浓度测量 Cluster 共享<strong>完全相同的属性集和 Feature Map 结构</strong>，仅 Cluster ID 不同。
      CO2 是其中最常见的一个，本页文档同样适用于以下 Cluster：
    </p>
    <ul>
      <li><strong>CarbonMonoxideConcentrationMeasurement</strong>（0x040C）—— 一氧化碳</li>
      <li><strong>NitrogenDioxideConcentrationMeasurement</strong>（0x0413）—— 二氧化氮</li>
      <li><strong>OzoneConcentrationMeasurement</strong>（0x0415）—— 臭氧</li>
      <li><strong>FormaldehydeConcentrationMeasurement</strong>（0x042B）—— 甲醛</li>
      <li><strong>PM1ConcentrationMeasurement</strong>（0x042C）—— PM1</li>
      <li><strong>PM25ConcentrationMeasurement</strong>（0x042A）—— PM2.5</li>
      <li><strong>PM10ConcentrationMeasurement</strong>（0x042D）—— PM10</li>
      <li><strong>RadonConcentrationMeasurement</strong>（0x042F）—— 氡</li>
      <li><strong>TotalVolatileOrganicCompoundsConcentrationMeasurement</strong>（0x042E）—— TVOC</li>
    </ul>
    <p>
      区别只在于<strong>被测物质</strong>和<strong>典型数值范围</strong>。理解了 CO2 的结构，其他浓度 Cluster 可以直接套用。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性总览</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举值速查</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    浓度测量 Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些测量能力。
    Feature 直接决定了哪些属性可用 —— 必须先读取 FeatureMap，再决定 UI 展示哪些数据。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MEA（Numeric Measurement）</span>
        <span class="enum-desc">数值测量 —— 支持 MeasuredValue / Min / Max / Uncertainty / MeasurementUnit / MeasurementMedium</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LEV（Level Indication）</span>
        <span class="enum-desc">等级指示 —— 支持 LevelValue（Low / Medium / High / Critical），不提供精确数值</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MED（Medium Level）</span>
        <span class="enum-desc">中等等级 —— 需要 LEV，LevelValue 可返回 Medium</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">CRI（Critical Level）</span>
        <span class="enum-desc">危险等级 —— 需要 LEV，LevelValue 可返回 Critical</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PEA（Peak Measurement）</span>
        <span class="enum-desc">峰值测量 —— 需要 MEA，支持 PeakMeasuredValue / PeakMeasuredValueWindow</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AVG（Average Measurement）</span>
        <span class="enum-desc">均值测量 —— 需要 MEA，支持 AverageMeasuredValue / AverageMeasuredValueWindow</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature 依赖关系</div>
    <p>
      <code>MED</code> 和 <code>CRI</code> 都依赖 <code>LEV</code> —— 没有 LEV 就不会有 Medium 或 Critical 等级。<br/>
      <code>PEA</code> 和 <code>AVG</code> 都依赖 <code>MEA</code> —— 峰值和均值的前提是设备能提供精确数值。<br/>
      <code>MEA</code> 和 <code>LEV</code> 至少要支持一个，否则这个 Cluster 什么数据都报不出来。
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      低端 CO2 传感器：<code>FeatureMap = 0x01</code>（仅 MEA），只报数值，没有等级判定。<br/>
      中端空气质量面板：<code>FeatureMap = 0x07</code>（MEA + LEV + MED），有数值也有等级。<br/>
      高端室内环境监测：<code>FeatureMap = 0x3F</code>（全部 6 个 Feature），数值 + 等级 + 峰值 + 均值。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>
    所有属性都是只读的，分为四组。Feature 列标注了该属性需要哪个 Feature 才会存在。
    点击属性 ID 可跳转到详细说明。
  </p>

  <h3 id="attr-group-mea">数值测量（MEA Feature）</h3>
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
          <td>MeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>当前浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>MinMeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>传感器可测最低浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>float</td>
          <td>MEA</td>
          <td>传感器可测最高浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x07">
          <td><a href="#attr-0x07"><code>0x07</code></a></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>MEA</td>
          <td>测量不确定度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x08">
          <td><a href="#attr-0x08"><code>0x08</code></a></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>测量单位（PPM / PPB 等）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x09">
          <td><a href="#attr-0x09"><code>0x09</code></a></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>测量介质（空气 / 水 / 土壤）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-group-peak-avg">峰值与均值测量</h3>
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
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>PeakMeasuredValue</td>
          <td>float</td>
          <td>PEA</td>
          <td>窗口期内的峰值浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>PEA</td>
          <td>峰值统计窗口（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>AverageMeasuredValue</td>
          <td>float</td>
          <td>AVG</td>
          <td>窗口期内的平均浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>AVG</td>
          <td>均值统计窗口（秒）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="attr-group-level">等级指示（LEV Feature）</h3>
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
        <tr class="clickable-row" data-href="#attr-0x0A">
          <td><a href="#attr-0x0A"><code>0x0A</code></a></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>LEV</td>
          <td>当前浓度等级（Low / Medium / High / Critical）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attr-details">属性详解</h2>

  <h3 id="attr-0x00">MeasuredValue（当前浓度）</h3>
  <p>
    传感器最近一次测量到的 CO2 浓度值。这是整个 Cluster 最核心的属性。
    与温度 Cluster 不同，浓度 Cluster 使用 <strong>float 类型</strong>，值就是实际浓度，不需要换算。
  </p>
  <ul>
    <li><strong>类型</strong>: float（单精度浮点数）</li>
    <li><strong>单位</strong>: 由 <code>MeasurementUnit</code> 属性决定（通常是 PPM）</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示传感器数据无效或尚未完成首次测量</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">CO2 浓度参考值</div>
    <p>
      <code>400</code> ppm = 室外新鲜空气 &nbsp;|&nbsp;
      <code>600~800</code> ppm = 通风良好的室内 &nbsp;|&nbsp;
      <code>1000~1500</code> ppm = 需要开窗通风 &nbsp;|&nbsp;
      <code>2000+</code> ppm = 明显不适，必须换气 &nbsp;|&nbsp;
      <code>5000</code> ppm = 职业安全上限
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">MinMeasuredValue（可测最低浓度）</h3>
  <p>
    传感器能够测量的最低浓度值。App 可以用它来设置显示范围的下限。
    对于 CO2 传感器，通常是 400 ppm（大气本底浓度）。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">MaxMeasuredValue（可测最高浓度）</h3>
  <p>
    传感器能够测量的最高浓度值。当 <code>MeasuredValue</code> 接近此上限时，
    可能意味着传感器已超出正常工作范围。对于 CO2 传感器，常见上限是 5000 或 10000 ppm。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">PeakMeasuredValue（峰值浓度）</h3>
  <p>
    在 <code>PeakMeasuredValueWindow</code> 指定的时间窗口内，传感器记录到的最高浓度值。
    用于追踪「最近 24 小时内最差的空气质量发生在什么浓度」。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: PEA（依赖 MEA）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x04">PeakMeasuredValueWindow（峰值统计窗口）</h3>
  <p>
    PeakMeasuredValue 的统计时间窗口，单位秒。例如 <code>86400</code> 表示峰值是过去 24 小时内的最大值。
    窗口到期后，PeakMeasuredValue 会重置并重新统计。
  </p>
  <ul>
    <li><strong>类型</strong>: elapsed-s（uint32，经过的秒数）</li>
    <li><strong>Feature</strong>: PEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x05">AverageMeasuredValue（平均浓度）</h3>
  <p>
    在 <code>AverageMeasuredValueWindow</code> 指定的时间窗口内，浓度的算术平均值。
    均值比实时值更稳定，适合用于趋势分析和空气质量评分。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: AVG（依赖 MEA）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x06">AverageMeasuredValueWindow（均值统计窗口）</h3>
  <p>
    AverageMeasuredValue 的统计时间窗口，单位秒。例如 <code>3600</code> 表示平均值是过去 1 小时的均值。
  </p>
  <ul>
    <li><strong>类型</strong>: elapsed-s（uint32，经过的秒数）</li>
    <li><strong>Feature</strong>: AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x07">Uncertainty（测量不确定度）</h3>
  <p>
    传感器的测量精度，单位与 <code>MeasurementUnit</code> 一致。
    例如值为 <code>15.0</code> 且单位是 PPM，表示测量精度为 <strong>&plusmn;15 ppm</strong>。
    做浓度阈值触发自动化时，应将不确定度纳入考量。
  </p>
  <ul>
    <li><strong>类型</strong>: float</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x08">MeasurementUnit（测量单位）</h3>
  <p>
    声明 <code>MeasuredValue</code> 等数值属性使用的计量单位。
    对于 CO2 传感器，绝大多数使用 PPM（百万分之一）。
    详细枚举值见下方 <a href="#enum-unit">MeasurementUnitEnum</a>。
  </p>
  <ul>
    <li><strong>类型</strong>: enum8</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x09">MeasurementMedium（测量介质）</h3>
  <p>
    声明传感器测量的是哪种介质中的浓度。CO2 传感器几乎都是 <code>Air</code>（空气），
    但浓度测量 Cluster 家族还涵盖水质监测（Water）和土壤监测（Soil）等场景。
    详细枚举值见下方 <a href="#enum-medium">MeasurementMediumEnum</a>。
  </p>
  <ul>
    <li><strong>类型</strong>: enum8</li>
    <li><strong>Feature</strong>: MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0A">LevelValue（浓度等级）</h3>
  <p>
    设备自行判定的当前浓度等级。适用于不需要精确数值的场景 —— 比如简单的红绿灯指示。
    注意：如果设备没有 <code>MED</code> Feature，LevelValue 不会返回 <code>Medium</code>；
    没有 <code>CRI</code> Feature，不会返回 <code>Critical</code>。
    详细枚举值见下方 <a href="#enum-level">LevelValueEnum</a>。
  </p>
  <ul>
    <li><strong>类型</strong>: enum8</li>
    <li><strong>Feature</strong>: LEV</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    CarbonDioxideConcentrationMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集 CO2 浓度并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 枚举值速查 ====== -->
  <h2 id="enums">枚举值速查</h2>

  <h3 id="enum-unit">MeasurementUnitEnum（测量单位）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">百万分之一（CO2 传感器最常用）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">十亿分之一（超低浓度气体）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">万亿分之一（痕量分析）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">毫克/立方米（mg/m&sup3;）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">微克/立方米（&mu;g/m&sup3;，PM2.5 常用）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">纳克/立方米（ng/m&sup3;）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">颗粒数/立方米（p/m&sup3;，颗粒物计数）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">贝克勒尔/立方米（Bq/m&sup3;，放射性氡气）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-medium">MeasurementMediumEnum（测量介质）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Air</span>
        <span class="enum-desc">空气（CO2、PM2.5 等气体/颗粒物传感器）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Water</span>
        <span class="enum-desc">水（水质监测、溶解氧等场景）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Soil</span>
        <span class="enum-desc">土壤（农业、环境监测场景）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-level">LevelValueEnum（浓度等级）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知（传感器尚未完成判定）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">低浓度（空气质量良好）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">中等浓度（需要 MED Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">高浓度（建议改善通风）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">危险浓度（需要 CRI Feature，立即处理）</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个室内 CO2 传感器的全部属性（典型室内环境，约 800 ppm）：</p>
  <pre><code>{
  // --- CarbonDioxideConcentrationMeasurement Cluster（Endpoint 1）---

  // 数值测量（MEA Feature）
  "0x00": 823.5,          // MeasuredValue = 823.5 ppm（当前 CO2 浓度）
  "0x01": 400.0,          // MinMeasuredValue = 400 ppm（传感器下限）
  "0x02": 5000.0,         // MaxMeasuredValue = 5000 ppm（传感器上限）
  "0x07": 15.0,           // Uncertainty = ±15 ppm

  // 测量单位与介质（MEA Feature）
  "0x08": 0,              // MeasurementUnit = PPM
  "0x09": 0,              // MeasurementMedium = Air（空气）

  // 峰值测量（PEA Feature）
  "0x03": 1250.0,         // PeakMeasuredValue = 1250 ppm（历史峰值）
  "0x04": 86400,          // PeakMeasuredValueWindow = 86400 秒（24 小时窗口）

  // 均值测量（AVG Feature）
  "0x05": 680.5,          // AverageMeasuredValue = 680.5 ppm（平均值）
  "0x06": 3600,           // AverageMeasuredValueWindow = 3600 秒（1 小时窗口）

  // 等级指示（LEV Feature）
  "0x0A": 2               // LevelValue = Medium（中等）
}</code></pre>

  <p>读取请求示例 —— 一次性获取 Cluster 全部属性：</p>
  <pre><code>{
  // 一次性读取 CO2 Cluster 全部属性
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040D"
      // 不指定 attributeId → 读取全部属性
    }
  }]
}</code></pre>

  <p>订阅 CO2 浓度变化 —— 实时跟踪空气质量：</p>
  <pre><code>{
  // 订阅 CO2 浓度变化（每 30 秒~5 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040D",
      "attributeId": "0x00"        // MeasuredValue
    },
    "minIntervalFloor": 30,
    "maxIntervalCeiling": 300
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">与温度测量 Cluster 的差异</div>
    <p>
      温度 Cluster（0x0402）使用 int16 类型，值以 0.01°C 为单位，需要除以 100 转换。
      浓度 Cluster 使用 <strong>float 类型</strong>，值直接就是实际浓度，<strong>不需要任何换算</strong>。
      但必须读取 <code>MeasurementUnit</code> 确认单位是 PPM 还是其他。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：新风系统自动通风控制</summary>
    <div class="scenario-content">
      <p>根据 CO2 浓度自动调节新风系统的风量，维持室内空气质量。</p>
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code>，设置 30 秒 ~ 2 分钟的上报间隔</li>
        <li>确认 <code>MeasurementUnit (0x08)</code> 为 PPM（不同单位需要不同的阈值）</li>
        <li>设定多级阈值触发通风策略：
          <ul>
            <li><code>&lt; 600 ppm</code>：低速或关闭新风</li>
            <li><code>600 ~ 1000 ppm</code>：中速运行</li>
            <li><code>&gt; 1000 ppm</code>：全速运行</li>
          </ul>
        </li>
        <li>考虑 <code>Uncertainty (0x07)</code> 做防抖 —— 如果不确定度是 &plusmn;15 ppm，阈值附近加 15 ppm 的滞回区，避免频繁切换</li>
        <li>配合 FanControl Cluster（0x0202）控制新风系统风速</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：空气质量仪表盘</summary>
    <div class="scenario-content">
      <p>在 App 首页展示室内空气质量综合面板。</p>
      <ol>
        <li>读取 <code>FeatureMap (0xFFFC)</code> 确认设备能力，决定 UI 展示内容</li>
        <li>有 <code>MEA</code>：显示精确数值和量程范围（Min/Max），用渐变色条表示当前位置</li>
        <li>有 <code>LEV</code>：显示等级徽章（Low/Medium/High/Critical），颜色编码直观提示</li>
        <li>有 <code>PEA</code>：显示「今日峰值」卡片，读取 <code>PeakMeasuredValue (0x03)</code> 和窗口时长</li>
        <li>有 <code>AVG</code>：显示「平均值」趋势线，<code>AverageMeasuredValue (0x05)</code> 比实时值更适合做趋势展示</li>
        <li>处理 <code>null</code> 值 —— 展示「--」或「传感器离线」，不要显示 0</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：教室 CO2 监测与告警</summary>
    <div class="scenario-content">
      <p>学校教室部署 CO2 传感器，浓度过高时通知教师开窗或启动排风。</p>
      <ol>
        <li>订阅 <code>MeasuredValue (0x00)</code> 和 <code>LevelValue (0x0A)</code>（如果设备支持 LEV）</li>
        <li>LevelValue 变为 <code>High (3)</code> 或 <code>Critical (4)</code> 时推送告警通知</li>
        <li>如果设备只有 MEA 没有 LEV，App 自行判定：
          <ul>
            <li><code>&gt; 1500 ppm</code>：推送「建议开窗通风」</li>
            <li><code>&gt; 2500 ppm</code>：推送「CO2 浓度过高，请立即通风」</li>
          </ul>
        </li>
        <li>利用 <code>AverageMeasuredValue (0x05)</code> 分析每日 CO2 规律 —— 例如下午 2 点课后浓度最高，提前安排通风</li>
        <li>连续多天峰值超标（<code>PeakMeasuredValue &gt; 2000</code>）时，建议检查教室通风系统</li>
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
  'pm25-concentration-measurement': {
    title: 'PM2.5 浓度测量 Cluster · Pm25ConcentrationMeasurement（0x042A）',
    description: 'Matter Pm25ConcentrationMeasurement Cluster（0x042A）完整参考 — Feature Map（MEA/LEV/MED/CRI/PEA/AVG）、MeasuredValue / PeakMeasuredValue / AverageMeasuredValue 属性、MeasurementUnit / MeasurementMedium / LevelValue 枚举、PM2.5 AQI 对照表及场景应用。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>PM2.5 浓度测量 Cluster（Pm25ConcentrationMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x042A</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（功能端点）
  </p>
  <p>
    Pm25ConcentrationMeasurement 用于测量空气中 <strong>PM2.5（细颗粒物）</strong>的浓度。
    PM2.5 是直径小于或等于 2.5 微米的颗粒物，能深入肺泡，是衡量空气质量最关键的指标之一。
    常见于空气质量传感器、空气净化器、新风系统、智能环境面板等设备。
    设备作为 Server 角色被动上报浓度数据，App（Client）读取或订阅即可。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">浓度测量 Cluster 家族</div>
    <p>
      Matter 定义了一组结构完全相同的「<strong>Concentration Measurement</strong>」Cluster，
      包括 CO2（0x040D）、PM2.5（0x042A）、PM10（0x042D）、甲醛（0x042B）、TVOC（0x042E）等。
      它们共享相同的属性集、Feature Map、枚举定义和行为模型 —— 只是测量的目标物质不同。
      掌握一个，就等于掌握了整个家族。本页以 PM2.5 为例讲解这套通用模式。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性总览</a>
    <span class="nav-sep">|</span>
    <a href="#enums">枚举定义</a>
    <span class="nav-sep">|</span>
    <a href="#aqi-reference">AQI 对照</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    Pm25ConcentrationMeasurement 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些能力。
    Feature 决定了哪些属性可用 —— 比如没有 PEA Feature 的设备不会上报峰值数据。
    <strong>所有浓度测量 Cluster 的 Feature 定义完全相同。</strong>
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MEA（NumericMeasurement）</span>
        <span class="enum-desc">数值测量 —— 支持 MeasuredValue / MinMeasuredValue / MaxMeasuredValue / Uncertainty 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LEV（LevelIndication）</span>
        <span class="enum-desc">等级指示 —— 支持 LevelValue 属性，将浓度映射为 Low / Medium / High / Critical 等级</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MED（MediumLevel）</span>
        <span class="enum-desc">中等级别 —— LevelValue 可取 Medium（需要 LEV Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">CRI（CriticalLevel）</span>
        <span class="enum-desc">危险级别 —— LevelValue 可取 Critical（需要 LEV Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">PEA（PeakMeasurement）</span>
        <span class="enum-desc">峰值测量 —— 支持 PeakMeasuredValue / PeakMeasuredValueWindow 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">AVG（AverageMeasurement）</span>
        <span class="enum-desc">均值测量 —— 支持 AverageMeasuredValue / AverageMeasuredValueWindow 属性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      入门级 PM2.5 传感器：<code>FeatureMap = 0x01</code>（仅 MEA），只上报原始浓度数值。<br/>
      带等级指示的传感器：<code>FeatureMap = 0x0F</code>（MEA + LEV + MED + CRI），除数值外还提供分级评估。<br/>
      全功能传感器：<code>FeatureMap = 0x3F</code>（全部 6 个 Feature），支持数值、等级、峰值和均值。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">MEA 和 LEV 至少要有一个</div>
    <p>
      规范要求设备至少支持 <code>MEA</code>（数值测量）或 <code>LEV</code>（等级指示）其中一个。
      如果两者都没有，这个 Cluster 就没有任何可读取的测量数据，不符合规范。
      App 端应在读取 FeatureMap 后做好兼容 —— 不要假设设备一定有 MeasuredValue。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>
    浓度测量 Cluster 的属性较多，但大部分受 Feature 控制。核心属性是 <code>MeasuredValue</code>（需要 MEA）和 <code>LevelValue</code>（需要 LEV）。
    点击属性 ID 可跳转到详细说明。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>读写</th>
          <th>Feature</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>MeasuredValue</td>
          <td>float</td>
          <td>只读</td>
          <td>MEA</td>
          <td>当前 PM2.5 浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>MinMeasuredValue</td>
          <td>float</td>
          <td>只读</td>
          <td>MEA</td>
          <td>传感器可测最低浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxMeasuredValue</td>
          <td>float</td>
          <td>只读</td>
          <td>MEA</td>
          <td>传感器可测最高浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PeakMeasuredValue</td>
          <td>float</td>
          <td>只读</td>
          <td>PEA</td>
          <td>窗口期内的峰值浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>只读</td>
          <td>PEA</td>
          <td>峰值统计窗口时长（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>AverageMeasuredValue</td>
          <td>float</td>
          <td>只读</td>
          <td>AVG</td>
          <td>窗口期内的平均浓度，Nullable</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>只读</td>
          <td>AVG</td>
          <td>均值统计窗口时长（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>只读</td>
          <td>MEA</td>
          <td>测量不确定度</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>只读</td>
          <td>MEA</td>
          <td>测量单位（PM2.5 通常为 UGM3）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>只读</td>
          <td>—</td>
          <td>测量介质（PM2.5 固定为 Air）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>只读</td>
          <td>LEV</td>
          <td>浓度等级（Low / Medium / High / Critical）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attr-details">属性详解</h2>

  <h3 id="attr-0x0000">MeasuredValue（当前 PM2.5 浓度）</h3>
  <p>
    传感器最近一次测量到的 PM2.5 浓度值。这是整个 Cluster 最核心的属性，App 端展示空气质量主要依赖它。
  </p>
  <ul>
    <li><strong>类型</strong>: float（单精度浮点数）</li>
    <li><strong>单位</strong>: 由 <code>MeasurementUnit</code> 决定，PM2.5 传感器通常使用 <code>UGM3</code>（微克每立方米，&mu;g/m&sup3;）</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示传感器数据无效或尚未完成测量</li>
    <li><strong>Feature</strong>: 需要 MEA</li>
  </ul>
  <div class="callout callout-tip">
    <div class="callout-title">常见值速查</div>
    <p>
      <code>5.0</code> = 优秀 &nbsp;|&nbsp;
      <code>12.0</code> = AQI「优」上限 &nbsp;|&nbsp;
      <code>25.0</code> = 轻度污染 &nbsp;|&nbsp;
      <code>55.0</code> = 中度污染 &nbsp;|&nbsp;
      <code>150.0</code> = 重度污染 &nbsp;|&nbsp;
      <code>250.0+</code> = 严重污染
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">MinMeasuredValue（可测最低浓度）</h3>
  <p>
    传感器能够测量的最低浓度值。大多数 PM2.5 传感器的下限为 <code>0.0</code>。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: 需要 MEA</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义下限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">MaxMeasuredValue（可测最高浓度）</h3>
  <p>
    传感器能够测量的最高浓度值。常见的消费级 PM2.5 传感器上限通常在 500 ~ 1000 &mu;g/m&sup3; 之间。
    当 <code>MeasuredValue</code> 接近此上限时，说明空气质量极差，传感器可能也接近饱和。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: 需要 MEA</li>
    <li><strong>Nullable</strong>: 为 <code>null</code> 时表示设备未定义上限</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">PeakMeasuredValue（峰值浓度）</h3>
  <p>
    在 <code>PeakMeasuredValueWindow</code> 指定的时间窗口内，传感器测量到的最高浓度值。
    有助于发现短时间内的空气质量恶化事件（如做饭、吸烟产生的瞬时高浓度）。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: 需要 PEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0004">PeakMeasuredValueWindow（峰值窗口）</h3>
  <p>
    峰值统计的时间窗口，单位为秒。例如值为 <code>3600</code>，表示 <code>PeakMeasuredValue</code> 是最近 1 小时内的最高值。
  </p>
  <ul>
    <li><strong>类型</strong>: uint32（elapsed-s，经过秒数）</li>
    <li><strong>Feature</strong>: 需要 PEA</li>
    <li><strong>默认</strong>: 由设备厂商决定</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0005">AverageMeasuredValue（平均浓度）</h3>
  <p>
    在 <code>AverageMeasuredValueWindow</code> 指定的时间窗口内的平均浓度值。
    适合用于判断长时间的空气质量趋势，比瞬时值更稳定。
  </p>
  <ul>
    <li><strong>类型</strong>: float，Nullable</li>
    <li><strong>Feature</strong>: 需要 AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0006">AverageMeasuredValueWindow（均值窗口）</h3>
  <p>
    均值统计的时间窗口，单位为秒。例如值为 <code>86400</code>，表示 <code>AverageMeasuredValue</code> 是最近 24 小时的平均值。
  </p>
  <ul>
    <li><strong>类型</strong>: uint32（elapsed-s，经过秒数）</li>
    <li><strong>Feature</strong>: 需要 AVG</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0007">Uncertainty（测量不确定度）</h3>
  <p>
    传感器的测量不确定度，与 <code>MeasuredValue</code> 使用相同单位。
    例如值为 <code>2.0</code>，表示实际浓度在 <code>MeasuredValue &plusmn; 2.0 &mu;g/m&sup3;</code> 范围内。
    做阈值判断时应将不确定度纳入考量。
  </p>
  <ul>
    <li><strong>类型</strong>: float</li>
    <li><strong>Feature</strong>: 需要 MEA（可选属性）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0008">MeasurementUnit（测量单位）</h3>
  <p>
    表示 <code>MeasuredValue</code> 及相关浓度属性使用的单位。PM2.5 传感器几乎都使用 <code>UGM3</code>（&mu;g/m&sup3;）。
    该属性在设备整个生命周期中固定不变。
  </p>
  <ul>
    <li><strong>类型</strong>: MeasurementUnitEnum（见下方枚举）</li>
    <li><strong>Feature</strong>: 需要 MEA</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0009">MeasurementMedium（测量介质）</h3>
  <p>
    表示传感器测量的目标介质。对于 PM2.5 传感器，该值固定为 <code>Air</code>（空气）。
    这个属性在浓度测量家族中是通用的 —— 一些水质传感器会使用 <code>Water</code>。
  </p>
  <ul>
    <li><strong>类型</strong>: MeasurementMediumEnum（见下方枚举）</li>
    <li><strong>Feature</strong>: 无要求（所有设备都可有）</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x000A">LevelValue（浓度等级）</h3>
  <p>
    设备对当前浓度的分级评估。不同厂商的分级阈值可能不同，但枚举值是统一的。
    支持 LEV Feature 时必须提供此属性。
    适合在 UI 上用颜色标签展示空气质量（绿 / 黄 / 橙 / 红）。
  </p>
  <ul>
    <li><strong>类型</strong>: LevelValueEnum（见下方枚举）</li>
    <li><strong>Feature</strong>: 需要 LEV</li>
  </ul>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令说明 ====== -->
  <h2 id="commands">命令</h2>
  <p>
    Pm25ConcentrationMeasurement 是一个<strong>纯只读的 Server Cluster</strong>，没有任何命令。
    设备负责采集浓度数据并更新属性，App 端只需读取（Read）或订阅（Subscribe）即可获取数据。
  </p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>
  <p>
    以下三组枚举是<strong>所有浓度测量 Cluster 共享的</strong> —— CO2、PM2.5、PM10、甲醛、TVOC 等 Cluster 使用完全相同的枚举定义。
  </p>

  <h3 id="enum-unit">MeasurementUnitEnum（测量单位）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">百万分之一（parts per million）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">十亿分之一（parts per billion）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">万亿分之一（parts per trillion）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">毫克每立方米（mg/m&sup3;）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">微克每立方米（&mu;g/m&sup3;）—— PM2.5 最常用单位</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">纳克每立方米（ng/m&sup3;）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">每立方米颗粒数（particles/m&sup3;）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">贝克勒尔每立方米（Bq/m&sup3;，用于放射性气体如氡）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">PM2.5 的标准单位</div>
    <p>
      全球各国的 PM2.5 标准（AQI、WHO 指南）都以 <strong>&mu;g/m&sup3;</strong> 为单位。
      读取 PM2.5 传感器时，<code>MeasurementUnit</code> 应为 <code>4 (UGM3)</code>。
      如果遇到其他单位，需要先做单位换算再进行 AQI 判定。
    </p>
  </div>

  <h3 id="enum-medium">MeasurementMediumEnum（测量介质）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Air</span>
        <span class="enum-desc">空气 —— PM2.5 传感器固定使用此值</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Water</span>
        <span class="enum-desc">水（用于水质传感器）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Soil</span>
        <span class="enum-desc">土壤（用于土壤传感器）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-level">LevelValueEnum（浓度等级）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知 —— 传感器尚未完成评估或数据无效</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">低 —— 空气质量良好，PM2.5 浓度处于安全范围</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">中等 —— 空气质量一般（需要 MED Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">高 —— 空气质量差，敏感人群应减少户外活动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">危险 —— 空气严重污染，所有人应避免户外活动（需要 CRI Feature）</span>
      </div>
    </div>
  </div>

  <!-- ====== PM2.5 AQI 对照表 ====== -->
  <h2 id="aqi-reference">PM2.5 与 AQI 对照表</h2>
  <p>
    PM2.5 浓度是计算 <strong>AQI（空气质量指数）</strong> 的核心指标之一。
    以下是美国 EPA 标准（24 小时平均）的 PM2.5 浓度与 AQI 等级对照，也是全球最常用的参考标准：
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>PM2.5（&mu;g/m&sup3;）</th>
          <th>AQI 范围</th>
          <th>等级</th>
          <th>健康影响</th>
          <th>建议颜色</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0 ~ 12.0</td>
          <td>0 ~ 50</td>
          <td><strong>优</strong>（Good）</td>
          <td>空气质量令人满意，基本无健康风险</td>
          <td style="color: #31a354;">&#9632; 绿色</td>
        </tr>
        <tr>
          <td>12.1 ~ 35.4</td>
          <td>51 ~ 100</td>
          <td><strong>良</strong>（Moderate）</td>
          <td>可以接受，极少数敏感人群可能受影响</td>
          <td style="color: #d4a017;">&#9632; 黄色</td>
        </tr>
        <tr>
          <td>35.5 ~ 55.4</td>
          <td>101 ~ 150</td>
          <td><strong>敏感人群不健康</strong></td>
          <td>老人、儿童、呼吸系统疾病患者应减少户外活动</td>
          <td style="color: #e07020;">&#9632; 橙色</td>
        </tr>
        <tr>
          <td>55.5 ~ 150.4</td>
          <td>151 ~ 200</td>
          <td><strong>不健康</strong>（Unhealthy）</td>
          <td>所有人开始受影响，敏感人群应避免户外</td>
          <td style="color: #e02020;">&#9632; 红色</td>
        </tr>
        <tr>
          <td>150.5 ~ 250.4</td>
          <td>201 ~ 300</td>
          <td><strong>非常不健康</strong></td>
          <td>健康警报，所有人应减少户外活动</td>
          <td style="color: #8b30a0;">&#9632; 紫色</td>
        </tr>
        <tr>
          <td>250.5+</td>
          <td>301+</td>
          <td><strong>危险</strong>（Hazardous）</td>
          <td>紧急状况，所有人应避免任何户外活动</td>
          <td style="color: #7e0023;">&#9632; 褐红色</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">WHO 2021 新标准更严格</div>
    <p>
      世界卫生组织 2021 年修订的空气质量指南将 PM2.5 年均限值从 10 &mu;g/m&sup3; 降至 <strong>5 &mu;g/m&sup3;</strong>，
      24 小时均值限值从 25 &mu;g/m&sup3; 降至 <strong>15 &mu;g/m&sup3;</strong>。
      中国国标（GB 3095-2012）的 24 小时均值二级标准为 75 &mu;g/m&sup3;，年均为 35 &mu;g/m&sup3;。
      App 在展示空气质量等级时，建议标注所参照的标准体系。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个室内空气质量传感器的 Pm25ConcentrationMeasurement Cluster 属性（PM2.5 约 25 &mu;g/m&sup3;）：</p>
  <pre><code>{
  // --- Pm25ConcentrationMeasurement Cluster（Endpoint 1）---
  // 场景：室内空气质量传感器，当前 PM2.5 约 25 μg/m³

  "0x0000": 25.0,         // MeasuredValue = 25.0 μg/m³（当前浓度）
  "0x0001": 0.0,          // MinMeasuredValue = 0.0 μg/m³
  "0x0002": 500.0,        // MaxMeasuredValue = 500.0 μg/m³
  "0x0003": 28.0,         // PeakMeasuredValue = 28.0 μg/m³（峰值）
  "0x0005": 22.5,         // AverageMeasuredValue = 22.5 μg/m³（均值）
  "0x0007": 2.0,          // Uncertainty = 2.0（测量不确定度 ±2 μg/m³）
  "0x0008": 4,            // MeasurementUnit = UGM3（微克每立方米）
  "0x0009": 0,            // MeasurementMedium = Air（空气）
  "0x000A": 1             // LevelValue = Low（浓度等级：低）
}</code></pre>

  <p>读取请求示例 —— 一次性获取 Cluster 全部属性：</p>
  <pre><code>{
  // 读取 PM2.5 传感器的所有属性
  "readRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x042A"
      // 不指定 attributeId → 读取该 Cluster 全部属性
    }
  }]
}</code></pre>

  <p>订阅 PM2.5 浓度变化 —— 实时跟踪空气质量：</p>
  <pre><code>{
  // 订阅 PM2.5 浓度变化（每 30 秒~5 分钟上报一次）
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x042A",
      "attributeId": "0x0000"      // MeasuredValue
    },
    "minIntervalFloor": 30,        // 最少 30 秒上报一次
    "maxIntervalCeiling": 300      // 最多 5 分钟上报一次
  }]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">数据处理代码参考</div>
    <p>
      读取 PM2.5 浓度并映射到 AQI 等级的关键逻辑：
    </p>
    <pre><code>{\`// 设备返回 MeasuredValue = 25.0 (μg/m³)
val rawValue: Float? = 25.0f    // Nullable，可能为 null
val pm25 = rawValue ?: run {
    // null → 传感器数据无效，展示「--」
    showPlaceholder(); return
}

// 映射到 AQI 等级
val aqiLevel = when {
    pm25 <= 12.0f  -> "优"      // 绿色
    pm25 <= 35.4f  -> "良"      // 黄色
    pm25 <= 55.4f  -> "敏感"    // 橙色
    pm25 <= 150.4f -> "不健康"  // 红色
    pm25 <= 250.4f -> "很差"    // 紫色
    else           -> "危险"    // 褐红色
}

// 也可以直接使用设备的 LevelValue（如果支持 LEV Feature）
val level: Int? = readAttribute(0x000A)  // LevelValueEnum\`}</code></pre>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：空气净化器自动模式</summary>
    <div class="scenario-content">
      <p>空气净化器内置 PM2.5 传感器，根据浓度自动调节风速和工作模式。</p>
      <ol>
        <li>订阅 <code>MeasuredValue (0x0000)</code>，设置较短的上报间隔（如 10 ~ 60 秒），以便快速响应空气质量变化</li>
        <li>根据浓度区间自动调节净化器风速：
          <ul>
            <li><code>&lt; 12 &mu;g/m&sup3;</code>：低速或睡眠模式</li>
            <li><code>12 ~ 35 &mu;g/m&sup3;</code>：中速</li>
            <li><code>35 ~ 55 &mu;g/m&sup3;</code>：高速</li>
            <li><code>&gt; 55 &mu;g/m&sup3;</code>：最大风力</li>
          </ul>
        </li>
        <li>读取 <code>Uncertainty (0x0007)</code>，在阈值附近增加迟滞区间，避免净化器在两个档位之间频繁切换</li>
        <li>如果设备支持 AVG Feature，可以结合 <code>AverageMeasuredValue (0x0005)</code> 进行趋势判断 —— 均值持续下降时提前降速，节省能耗</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：户外空气质量面板</summary>
    <div class="scenario-content">
      <p>智能家居面板或 App 展示室外空气质量，帮助用户决定是否开窗通风。</p>
      <ol>
        <li>订阅室外 PM2.5 传感器的 <code>MeasuredValue (0x0000)</code></li>
        <li>先检查 <code>MeasurementUnit (0x0008)</code>，确认单位为 <code>UGM3</code>，否则需要做单位换算后再进行 AQI 映射</li>
        <li>将浓度值映射到 AQI 等级，在 UI 上用对应颜色（绿 / 黄 / 橙 / 红 / 紫 / 褐红）展示</li>
        <li>如果设备支持 LEV Feature，也可以直接使用 <code>LevelValue (0x000A)</code> 做粗略分级展示，省去自行计算</li>
        <li>如果设备支持 PEA Feature，展示 <code>PeakMeasuredValue (0x0003)</code> 作为今日峰值，让用户了解一天中最差的时段</li>
        <li>联动建议：PM2.5 &lt; 35 &mu;g/m&sup3; 时提示「适合开窗」，&gt; 75 &mu;g/m&sup3; 时提示「建议关窗并开启净化器」</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 3：健康预警与自动化联动</summary>
    <div class="scenario-content">
      <p>为敏感人群（老人、儿童、呼吸系统疾病患者）设置 PM2.5 健康预警，自动触发保护措施。</p>
      <ol>
        <li>订阅 <code>MeasuredValue (0x0000)</code> 和 <code>LevelValue (0x000A)</code>（如果支持 LEV Feature）</li>
        <li>设定多级预警阈值：
          <ul>
            <li><strong>提醒</strong>：PM2.5 &gt; 35 &mu;g/m&sup3; → 推送通知「空气质量转差，敏感人群注意」</li>
            <li><strong>警告</strong>：PM2.5 &gt; 55 &mu;g/m&sup3; → 自动关闭新风系统外循环、关闭窗户</li>
            <li><strong>紧急</strong>：PM2.5 &gt; 150 &mu;g/m&sup3; → 自动开启全部净化器至最大风力，推送紧急通知</li>
          </ul>
        </li>
        <li>加入防抖逻辑 —— 要求连续 3 次采样（如每 30 秒一次，即至少 1.5 分钟）都超过阈值才触发，避免瞬间波动产生误报</li>
        <li>将 <code>Uncertainty (0x0007)</code> 纳入阈值计算：如果不确定度为 &plusmn;2 &mu;g/m&sup3;，阈值 35 的实际触发点应为 37</li>
        <li>预警消除也需要迟滞 —— 例如触发阈值 55，消除阈值设为 45，避免在分界线反复告警</li>
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
  'carbon-monoxide-concentration-measurement': {
    title: '一氧化碳浓度测量 Cluster · CarbonMonoxideConcentrationMeasurement（0x040C）',
    description: 'Matter CarbonMonoxideConcentrationMeasurement Cluster（0x040C）参考 — CO 浓度、安全阈值、等级判定、Feature 位图、枚举值速查及典型应用场景。',
    prev: { title: '烟雾/CO 报警（SmokeCOAlarm）', slug: 'smoke-co-alarm' },
    next: undefined,
    content: `<h1>一氧化碳浓度测量 Cluster（CarbonMonoxideConcentrationMeasurement）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x040C</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    该 Cluster 用于报告空气中一氧化碳（CO）的浓度，属于 Matter 浓度测量（Concentration Measurement）家族。
    它与 CO<sub>2</sub>、PM2.5 等浓度测量 Cluster 共享相同的属性结构、Feature 位图和枚举定义，
    只是测量对象和安全阈值不同。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">安全关键 — CO 是无色无味的致命气体</div>
    <p>
      一氧化碳中毒是家庭意外死亡的主要原因之一。CO 传感器数据必须可靠传输、及时报警，
      App 对 CO 读数的处理需要格外谨慎：
    </p>
    <ul>
      <li>不要对 CO 读数做过度的平滑或延迟，避免掩盖突发峰值</li>
      <li>LevelValue 跳到 <code>Warning</code> 或以上时，应立即推送通知</li>
      <li>该 Cluster 通常与 <strong>SmokeCOAlarm（0x005C）</strong> 配合使用 —— SmokeCOAlarm 负责本地声光报警，本 Cluster 提供精确的 ppm 数值供远程监控和趋势分析</li>
    </ul>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>
    浓度测量 Cluster 共享同一套 Feature 定义，设备通过 <code>FeatureMap (0xFFFC)</code> 声明支持哪些能力。
    Feature 决定了哪些属性可用 —— 读取前务必先检查。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>缩写</th>
          <th>名称</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>MEA</td>
          <td>NumericMeasurement</td>
          <td>支持精确数值测量（MeasuredValue / Min / Max）</td>
        </tr>
        <tr>
          <td>1</td>
          <td>LEV</td>
          <td>LevelIndication</td>
          <td>支持等级判定（LevelValue: Low / Medium / High / Critical）</td>
        </tr>
        <tr>
          <td>2</td>
          <td>MED</td>
          <td>MediumLevel</td>
          <td>LEV 的扩展 — LevelValue 可报告 Medium 等级</td>
        </tr>
        <tr>
          <td>3</td>
          <td>CRI</td>
          <td>CriticalLevel</td>
          <td>LEV 的扩展 — LevelValue 可报告 Critical 等级</td>
        </tr>
        <tr>
          <td>4</td>
          <td>PEA</td>
          <td>PeakMeasurement</td>
          <td>MEA 的扩展 — 记录峰值（PeakMeasuredValue）</td>
        </tr>
        <tr>
          <td>5</td>
          <td>AVG</td>
          <td>AverageMeasurement</td>
          <td>MEA 的扩展 — 记录时间窗口内均值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">常见组合</div>
    <p>
      大多数 CO 传感器至少支持 <code>MEA + LEV</code>（数值 + 等级）。
      安全等级较高的设备会加上 <code>CRI</code>（区分危急等级）和 <code>PEA</code>（记录峰值，用于事后分析）。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>所有属性均为只读，App 端通过 Read / Subscribe 获取数据。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>依赖 Feature</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0000</code></td>
          <td>MeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>当前 CO 浓度（单位见 MeasurementUnit），null 表示无效</td>
        </tr>
        <tr>
          <td><code>0x0001</code></td>
          <td>MinMeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>传感器可测最小值</td>
        </tr>
        <tr>
          <td><code>0x0002</code></td>
          <td>MaxMeasuredValue</td>
          <td>float (nullable)</td>
          <td>MEA</td>
          <td>传感器可测最大值（量程上限）</td>
        </tr>
        <tr>
          <td><code>0x0003</code></td>
          <td>PeakMeasuredValue</td>
          <td>float (nullable)</td>
          <td>PEA</td>
          <td>时间窗口内的峰值</td>
        </tr>
        <tr>
          <td><code>0x0004</code></td>
          <td>PeakMeasuredValueWindow</td>
          <td>uint32</td>
          <td>PEA</td>
          <td>峰值统计的时间窗口（秒）</td>
        </tr>
        <tr>
          <td><code>0x0005</code></td>
          <td>AverageMeasuredValue</td>
          <td>float (nullable)</td>
          <td>AVG</td>
          <td>时间窗口内的均值</td>
        </tr>
        <tr>
          <td><code>0x0006</code></td>
          <td>AverageMeasuredValueWindow</td>
          <td>uint32</td>
          <td>AVG</td>
          <td>均值统计的时间窗口（秒）</td>
        </tr>
        <tr>
          <td><code>0x0007</code></td>
          <td>Uncertainty</td>
          <td>float</td>
          <td>MEA</td>
          <td>测量不确定度（±范围）</td>
        </tr>
        <tr>
          <td><code>0x0008</code></td>
          <td>MeasurementUnit</td>
          <td>enum8</td>
          <td>MEA</td>
          <td>测量单位（PPM / PPB / ...）</td>
        </tr>
        <tr>
          <td><code>0x0009</code></td>
          <td>MeasurementMedium</td>
          <td>enum8</td>
          <td>—</td>
          <td>测量介质（Air / Water / Soil）</td>
        </tr>
        <tr>
          <td><code>0x000A</code></td>
          <td>LevelValue</td>
          <td>enum8</td>
          <td>LEV</td>
          <td>当前浓度等级（Low / Medium / High / Critical）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 关键枚举 ====== -->
  <h2 id="enums">关键枚举</h2>
  <p>以下枚举与所有浓度测量 Cluster 共享，此处仅列出 CO 场景下最常用的两个。</p>

  <h3 id="enum-level">LevelValueEnum（浓度等级）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">未知（传感器初始化中）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">正常 — 浓度处于安全范围</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Medium</span>
        <span class="enum-desc">需关注 — 浓度偏高（需 MED Feature）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">危险 — 需要立即通风</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">危急 — 立即撤离（需 CRI Feature）</span>
      </div>
    </div>
  </div>

  <h3 id="enum-unit">MeasurementUnitEnum（测量单位）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">PPM</span>
        <span class="enum-desc">百万分之一 — CO 传感器最常用单位</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">PPB</span>
        <span class="enum-desc">十亿分之一（高精度场景）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">PPT</span>
        <span class="enum-desc">万亿分之一（极少用于 CO）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">MGM3</span>
        <span class="enum-desc">毫克/立方米（mg/m³）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">UGM3</span>
        <span class="enum-desc">微克/立方米（μg/m³）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">NGM3</span>
        <span class="enum-desc">纳克/立方米（ng/m³）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">PM3</span>
        <span class="enum-desc">颗粒/立方米（不适用于 CO）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">BQM3</span>
        <span class="enum-desc">贝克勒尔/立方米（不适用于 CO）</span>
      </div>
    </div>
  </div>

  <!-- ====== CO 安全阈值参考 ====== -->
  <h2 id="thresholds">CO 安全阈值参考</h2>
  <p>
    以下阈值来自 WHO 和 UL 2034 标准，供 App 设计报警策略时参考。
    实际设备的 LevelValue 等级划分由制造商设定，可能与此表不完全一致。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>浓度范围</th>
          <th>等级</th>
          <th>含义</th>
          <th>建议响应</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>&lt; 9 ppm</code></td>
          <td style="color: var(--color-success, #16a34a);">正常</td>
          <td>室内空气质量良好</td>
          <td>无需操作</td>
        </tr>
        <tr>
          <td><code>9 ~ 35 ppm</code></td>
          <td style="color: var(--color-warning, #ca8a04);">需关注</td>
          <td>轻度升高，可能有燃气泄漏或通风不良</td>
          <td>开窗通风，检查燃气设备</td>
        </tr>
        <tr>
          <td><code>36 ~ 70 ppm</code></td>
          <td style="color: var(--color-warning, #ca8a04);">警告</td>
          <td>持续暴露可能引起头痛、头晕</td>
          <td>立即通风，关闭可能的 CO 源</td>
        </tr>
        <tr>
          <td><code>71 ~ 150 ppm</code></td>
          <td style="color: var(--color-danger, #dc2626);">危险</td>
          <td>短时间内即可出现中毒症状</td>
          <td>撤离房间，拨打急救电话</td>
        </tr>
        <tr>
          <td><code>&gt; 150 ppm</code></td>
          <td style="color: var(--color-danger, #dc2626);">致命</td>
          <td>数分钟内可致意识丧失甚至死亡</td>
          <td>立即撤离建筑，拨打 119/120</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">阈值仅供参考</div>
    <p>
      不同人群（老人、儿童、孕妇、心肺疾病患者）对 CO 的敏感度差异极大。
      App 不应仅依赖 MeasuredValue 做安全判断 —— 应以设备报告的 <code>LevelValue</code> 为准，
      并优先响应 SmokeCOAlarm Cluster 的报警状态。
    </p>
  </div>

  <!-- ====== 与 SmokeCOAlarm 的配合 ====== -->
  <h2 id="smoke-co-pairing">与 SmokeCOAlarm 的配合</h2>
  <p>
    在实际产品中，CO 传感器设备通常同时实现两个 Cluster：
  </p>
  <ul>
    <li><strong>SmokeCOAlarm（0x005C）</strong> — 负责本地声光报警和设备联动，提供 <code>COState</code>（Normal / Warning / Critical）等布尔式状态</li>
    <li><strong>CarbonMonoxideConcentrationMeasurement（0x040C）</strong> — 提供精确的 ppm 数值，支持趋势分析和远程监控</li>
  </ul>
  <p>
    两者的分工是：SmokeCOAlarm 管「报不报警」，本 Cluster 管「具体多少 ppm」。
    App 的报警逻辑应以 SmokeCOAlarm 的状态为主，本 Cluster 的数值作为辅助信息展示。
  </p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一个 CO 传感器设备的全部属性（FeatureMap = MEA + LEV + AVG）：</p>
  <pre><code>{
  // --- 浓度测量值 ---
  "0x0000": 3.2,          // MeasuredValue = 3.2 ppm（当前 CO 浓度）
  "0x0001": 0.0,          // MinMeasuredValue = 0 ppm
  "0x0002": 1000.0,       // MaxMeasuredValue = 1000 ppm（传感器量程上限）
  "0x0003": null,         // PeakMeasuredValue = null（未启用 PEA Feature）
  "0x0004": null,         // PeakMeasuredValueWindow（未启用）
  "0x0005": 2.8,          // AverageMeasuredValue = 2.8 ppm
  "0x0006": 3600,         // AverageMeasuredValueWindow = 3600 秒（1 小时均值）

  // --- 不确定度 ---
  "0x0007": 1.5,          // Uncertainty = ±1.5 ppm

  // --- 单位与介质 ---
  "0x0008": 0,            // MeasurementUnit = PPM
  "0x0009": 0,            // MeasurementMedium = Air（空气）

  // --- 等级判定 ---
  "0x000A": 0             // LevelValue = Low（正常）
}</code></pre>

  <p>订阅 CO 浓度和等级变化（推荐的最小间隔 10 秒，最大间隔 60 秒）：</p>
  <pre><code>{
  "subscribeRequests": [{
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040C",
      "attributeId": "0x0000"     // MeasuredValue
    },
    "minInterval": 10,
    "maxInterval": 60
  }, {
    "attributePath": {
      "endpointId": 1,
      "clusterId": "0x040C",
      "attributeId": "0x000A"     // LevelValue
    },
    "minInterval": 10,
    "maxInterval": 60
  }]
}</code></pre>

  <!-- ====== 应用场景 ====== -->
  <h2 id="scenarios">应用场景</h2>

  <h3 id="scenario-garage">场景一：车库通风联动</h3>
  <div class="callout callout-tip">
    <div class="callout-title">车库 CO 监测 + 排风扇自动启停</div>
    <p>
      车库是 CO 积聚的高风险区域（汽车怠速、燃油设备）。典型方案：
    </p>
    <ol>
      <li>Subscribe <code>MeasuredValue (0x0000)</code>，间隔 10~30 秒</li>
      <li>浓度超过 <strong>9 ppm</strong> 时，通过自动化规则启动排风扇（OnOff Cluster）</li>
      <li>浓度超过 <strong>35 ppm</strong> 时，推送手机通知，提醒用户检查车辆是否在运行</li>
      <li>浓度回落到 <strong>5 ppm</strong> 以下并保持 5 分钟后，关闭排风扇</li>
    </ol>
    <p>
      回落阈值（5 ppm）低于启动阈值（9 ppm）是为了避免排风扇频繁启停 —— 这是典型的迟滞控制策略。
    </p>
  </div>

  <h3 id="scenario-kitchen">场景二：厨房燃气安全</h3>
  <div class="callout callout-tip">
    <div class="callout-title">厨房 CO 传感器 + 燃气阀门联动</div>
    <p>
      燃气灶不完全燃烧会产生 CO。在厨房场景中：
    </p>
    <ol>
      <li>Subscribe <code>LevelValue (0x000A)</code>，关注等级跳变</li>
      <li>LevelValue 跳到 <code>Medium (2)</code>：推送通知「厨房 CO 偏高，请检查燃气灶」</li>
      <li>LevelValue 跳到 <code>High (3)</code>：触发紧急自动化 —— 关闭智能燃气阀门、打开油烟机/排气扇、全屋警报</li>
      <li>同步检查 SmokeCOAlarm 的 <code>COState</code>，确认本地报警是否已触发</li>
    </ol>
    <p>
      注意：厨房烹饪时 CO 短暂升高是正常的（尤其是炒菜、烤肉），
      可以结合 <code>AverageMeasuredValue</code> 判断是持续泄漏还是短暂波动，避免误报。
    </p>
  </div>

  <!-- ====== 开发建议 ====== -->
  <h2 id="dev-tips">开发建议</h2>
  <div class="callout callout-tip">
    <div class="callout-title">实现要点</div>
    <ol>
      <li><strong>先读 FeatureMap</strong> — 不是所有 CO 传感器都支持 ppm 数值，便宜的设备可能只有 LEV（等级），没有 MEA（数值）</li>
      <li><strong>Subscribe 优先于轮询</strong> — CO 浓度变化需要及时响应，用 Subscribe 而不是定时 Read</li>
      <li><strong>处理 null</strong> — MeasuredValue 为 null 表示传感器读数无效（预热中、故障等），UI 应显示「传感器初始化中」而非 0</li>
      <li><strong>注意单位</strong> — 虽然绝大多数 CO 传感器用 PPM，但仍应检查 MeasurementUnit，避免将 PPB 误当 PPM 显示</li>
      <li><strong>该 Cluster 没有命令</strong> — 它是纯只读的传感器数据上报，不存在 Client → Server 的命令</li>
    </ol>
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
  },
};
