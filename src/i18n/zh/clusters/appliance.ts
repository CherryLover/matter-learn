import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'mode-select': {
    title: '模式选择 Cluster · ModeSelect（0x0050）',
    description: 'Matter ModeSelect Cluster（0x0050）完整参考 — ChangeToMode 命令、SupportedModes 模式列表、ModeOptionStruct/SemanticTagStruct 结构体定义、StartUpMode 上电模式及 OnMode 联动设置。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>模式选择 Cluster（ModeSelect）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0050</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    ModeSelect 是一个通用的模式选择 Cluster —— 让设备声明自己支持哪些运行模式，控制端可以查询和切换这些模式。
    它适用于任何有"多模式"概念的设备：洗衣机的洗涤模式、烘干机的烘干程序、咖啡机的冲泡方式等。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">历史遗留（Legacy）Cluster</div>
    <p>
      ModeSelect 是 Matter 早期定义的通用模式选择方案。
      在较新的 Matter 规范中，它已被各设备类型专属的 Mode Cluster 替代
      （如 <code>LaundryWasherMode</code>、<code>DishwasherMode</code>、<code>RefrigeratorAndTemperatureControlledCabinetMode</code> 等）。
      新设备开发建议优先使用设备专属 Mode Cluster；ModeSelect 仍用于旧设备兼容和通用场景。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#structs">结构体定义</a>
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
    ModeSelect Cluster 只有 1 个命令，非常简洁 —— 指定目标模式的编号即可完成切换。
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
          <td>ChangeToMode</td>
          <td>切换到指定模式</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ChangeToMode —— 切换模式（0x00）</h3>
  <p>
    将设备切换到指定的运行模式。<code>NewMode</code> 的值必须是 <code>SupportedModes</code> 列表中某个
    <code>ModeOptionStruct</code> 的 <code>Mode</code> 字段值，否则设备会返回 <code>INVALID_COMMAND</code> 错误。
    执行成功后，<code>CurrentMode</code> 属性会更新为 <code>NewMode</code> 的值。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须存在于 <code>SupportedModes</code> 列表中</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上选择洗衣机的"快洗"模式，App 读取 <code>SupportedModes</code> 获取模式列表和对应编号，
        然后发送 <code>ChangeToMode</code> 命令将 <code>NewMode</code> 设为该编号。
        设备收到命令后切换模式，<code>CurrentMode</code> 随之更新。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>ModeSelect Cluster 共有 6 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 基本信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Description</td>
          <td>string</td>
          <td><a href="#group-info">基本信息</a></td>
          <td>集群用途的可读描述</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>StandardNamespace</td>
          <td>uint16 / null</td>
          <td><a href="#group-info">基本信息</a></td>
          <td>模式命名空间标识</td>
        </tr>
        <!-- 模式状态 -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td><a href="#group-modes">模式列表</a></td>
          <td>设备支持的所有模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td><a href="#group-modes">模式列表</a></td>
          <td>当前运行模式的编号</td>
        </tr>
        <!-- 启动与联动 -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">启动与联动</a></td>
          <td>上电时恢复的模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td><a href="#group-startup">启动与联动</a></td>
          <td>设备开机时自动切换的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 基本信息（0x0000, 0x0001）====== -->
  <h3 id="group-info">基本信息（0x0000, 0x0001）</h3>
  <p>描述这个 ModeSelect Cluster 实例的用途和模式命名空间。</p>

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
          <td>Description（描述）</td>
          <td>string</td>
          <td>人类可读的字符串，描述这个 ModeSelect Cluster 的用途。例如 <code>"烘干模式"</code>、<code>"洗涤程序"</code>。同一设备可能有多个 ModeSelect 实例（分布在不同 Endpoint），每个实例通过 Description 区分功能</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>StandardNamespace（标准命名空间）</td>
          <td>uint16 / null</td>
          <td>标识 <code>SemanticTag</code> 值的含义来源。<code>null</code> 表示厂商自定义命名空间（MfgSpecific），标准值由 Matter 规范定义。有了命名空间，不同厂商的"节能"模式可以使用相同的 SemanticTag 值，控制端无需逐厂商适配</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 模式列表（0x0002, 0x0003）====== -->
  <h3 id="group-modes">模式列表（0x0002, 0x0003）</h3>
  <p>设备支持的所有运行模式及当前模式。</p>

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
          <td>SupportedModes（支持的模式）</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备声明的全部可用模式，每个元素是一个 <a href="#struct-mode-option">ModeOptionStruct</a>。列表至少包含 2 个条目，每个 Mode 值唯一、每个 Label 唯一。列表内容在设备生命周期内通常不变</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentMode（当前模式）</td>
          <td>uint8</td>
          <td>设备当前正在运行的模式编号。该值始终指向 <code>SupportedModes</code> 中某个 <code>ModeOptionStruct.Mode</code>。通过 <code>ChangeToMode</code> 命令改变，也可被 <code>OnMode</code> 或 <code>StartUpMode</code> 自动设置</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Mode 值不一定连续</div>
    <p>
      <code>SupportedModes</code> 中的 <code>Mode</code> 值是任意 uint8，不要求从 0 开始、也不要求连续。
      控制端应始终先读取 <code>SupportedModes</code>，拿到合法的 Mode 值列表后再发送 <code>ChangeToMode</code>。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 启动与联动（0x0004, 0x0005）====== -->
  <h3 id="group-startup">启动与联动（0x0004, 0x0005）</h3>
  <p>控制设备上电和开机时的模式行为。</p>

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
          <td>StartUpMode（上电模式）</td>
          <td>uint8 / null</td>
          <td>设备上电（硬件重启）时自动切换到的模式。值必须存在于 <code>SupportedModes</code> 中。<code>null</code> 表示保持断电前的模式。Nullable 且可选</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OnMode（开机模式）</td>
          <td>uint8 / null</td>
          <td>设备从 Off 变为 On 时自动切换到的模式（与 OnOff Cluster 联动）。值必须存在于 <code>SupportedModes</code> 中。<code>null</code> 表示开机不改变模式。<strong>需要 DEPONOFF 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">StartUpMode 与 OnMode 的关系</div>
    <p>
      <code>StartUpMode</code> 在硬件上电时生效（类似 OnOff 的 <code>StartUpOnOff</code>），
      <code>OnMode</code> 在软件层面开机时生效（OnOff 从 Off 切到 On 时触发）。
      如果 <code>OnMode</code> 非空，它的优先级高于 <code>StartUpMode</code> ——
      设备上电后，先应用 <code>StartUpMode</code>，再由 OnOff 触发 <code>OnMode</code>，最终模式以 <code>OnMode</code> 为准。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">结构体定义</h2>
  <p>ModeSelect Cluster 使用两个结构体来描述模式信息。</p>

  <!-- ModeOptionStruct -->
  <h3 id="struct-mode-option">ModeOptionStruct</h3>
  <p>描述一个可选模式，包含显示标签、模式编号和语义标签列表。</p>

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
          <td>Label</td>
          <td>string</td>
          <td>人类可读的模式名称，如 <code>"标准"</code>、<code>"节能"</code>、<code>"快速"</code>。在同一个 <code>SupportedModes</code> 列表中唯一</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在同一个 <code>SupportedModes</code> 列表中唯一。此值用于 <code>ChangeToMode</code> 命令的 <code>NewMode</code> 参数</td>
        </tr>
        <tr>
          <td>SemanticTags</td>
          <td>list&lt;<a href="#struct-semantic-tag">SemanticTagStruct</a>&gt;</td>
          <td>语义标签列表，让控制端理解模式含义而无需解析 Label 文本。可为空列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- SemanticTagStruct -->
  <h3 id="struct-semantic-tag">SemanticTagStruct</h3>
  <p>
    为模式附加机器可读的语义信息。通过标准化的标签值，不同厂商设备的"节能""快速"等模式可以被统一识别。
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
          <td>MfgCode</td>
          <td>vendor-id（uint16）</td>
          <td>厂商标识。<code>0x0000</code> 表示 Matter 标准定义的标签值；非零值表示该厂商自定义的标签值。配合 <code>StandardNamespace</code> 使用</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>uint16</td>
          <td>标签值，具体含义取决于 <code>MfgCode</code> 和 <code>StandardNamespace</code>。例如在标准命名空间中，特定值可能代表"节能"、"快速"等语义</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SemanticTag 的意义</div>
    <p>
      如果只有 <code>Label</code>（如"ECO"），控制端需要做自然语言识别才能理解模式含义。
      有了 <code>SemanticTag</code>，控制端可以直接通过数值判断 —— 比如语音助手可以识别出哪个模式是"节能"，
      而不用解析各国语言的标签文本。
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>ModeSelect Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的可选能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DEPONOFF（Depends on OnOff）</span>
        <span class="enum-desc">依赖 OnOff Cluster —— 启用后支持 OnMode 属性，设备从关变开时自动切换到指定模式</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">何时启用 DEPONOFF</div>
    <p>
      如果设备同时拥有 OnOff Cluster（即可以开关），且希望每次开机时自动切到特定模式（如空气净化器开机默认"自动"模式），
      就应该启用 DEPONOFF 特性。纯模式选择、不涉及开关联动的场景则无需启用。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台烘干机的 ModeSelect Cluster 读取结果 —— 当前运行在"节能"模式：</p>

  <pre><code>{
  // --- 基本信息 ---
  "0x0000": "烘干模式",          // Description = "烘干模式"（集群用途描述）
  "0x0001": 0,                   // StandardNamespace = 0（MfgSpecific 命名空间）
  "0x0003": 1,                   // CurrentMode = 1（当前运行在"节能"模式）

  // --- 支持的模式列表 ---
  "0x0002": [                    // SupportedModes
    {
      "Label": "标准",           // 模式 0：标准烘干
      "Mode": 0,
      "SemanticTags": []
    },
    {
      "Label": "节能",           // 模式 1：节能烘干
      "Mode": 1,
      "SemanticTags": [
        { "MfgCode": 0, "Value": 16384 }
      ]
    },
    {
      "Label": "快速",           // 模式 2：快速烘干
      "Mode": 2,
      "SemanticTags": []
    }
  ],

  // --- 启动与联动 ---
  "0x0004": null,                // StartUpMode = null（上电恢复断电前的模式）
  "0x0005": 0                    // OnMode = 0（设备开机时切换到"标准"模式）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      控制端显示模式选择 UI 时，应先读取 <code>SupportedModes (0x0002)</code> 获取完整模式列表，
      再读取 <code>CurrentMode (0x0003)</code> 高亮当前模式。
      切换模式前无需先读 CurrentMode —— 直接发 <code>ChangeToMode</code> 即可，设备会校验 NewMode 的合法性。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-switch-mode">场景 1：App 切换设备运行模式</h3>
  <ol>
    <li>读取 <code>SupportedModes (0x0002)</code>，获取模式列表（Label + Mode 编号）</li>
    <li>在 UI 上展示模式列表，读取 <code>CurrentMode (0x0003)</code> 高亮当前模式</li>
    <li>用户点击目标模式，发送 <code>ChangeToMode (0x00)</code>，<code>NewMode</code> 设为该模式的 Mode 值</li>
    <li>订阅 <code>CurrentMode</code> 属性变化，确认切换成功后更新 UI</li>
  </ol>

  <h3 id="scenario-startup-mode">场景 2：设置设备上电默认模式</h3>
  <ol>
    <li>读取 <code>SupportedModes (0x0002)</code>，让用户选择上电后希望恢复的模式</li>
    <li>写入 <code>StartUpMode (0x0004)</code> 的值：
      <ul>
        <li>指定模式编号 —— 上电后始终切到该模式（如空调始终以"制冷"模式启动）</li>
        <li><code>null</code> —— 恢复断电前的模式（推荐，用户上次选什么就继续用什么）</li>
      </ul>
    </li>
    <li>注意：如果设备同时设置了 <code>OnMode</code>，开机后 OnMode 会覆盖 StartUpMode 的效果</li>
  </ol>

  <h3 id="scenario-on-mode">场景 3：开机自动切换模式（OnOff 联动）</h3>
  <ol>
    <li>确认设备的 <code>FeatureMap (0xFFFC)</code> 包含 <code>DEPONOFF</code>（Bit 0 = 1）</li>
    <li>写入 <code>OnMode (0x0005)</code> 的值 —— 比如空气净化器开机自动进入"自动"模式</li>
    <li>当设备通过 OnOff Cluster 从 Off 切到 On 时，<code>CurrentMode</code> 会自动变为 OnMode 指定的值</li>
    <li>将 <code>OnMode</code> 设为 <code>null</code> 可取消联动 —— 开机后沿用上一次的模式</li>
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
</style>`,
  },
  'operational-state': {
    title: '操作状态 Cluster · OperationalState（0x0060）',
    description: 'Matter OperationalState Cluster（0x0060）完整参考 — Pause/Stop/Start/Resume 命令、运行状态机、阶段列表、倒计时、错误处理、事件通知等全部定义及枚举值速查。',
    prev: { title: '窗帘（WindowCovering）', slug: 'window-covering' },
    next: undefined,
    content: `<h1>操作状态 Cluster（OperationalState）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0060</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    OperationalState 是 Matter 中用于描述家电运行状态的<strong>通用状态机 Cluster</strong>。
    它为洗衣机、烘干机、烤箱、扫地机器人等需要「启动/暂停/停止/恢复」操作的设备提供统一的控制接口。
    作为基础 Cluster，设备特定的变体（如 OvenCavityOperationalState、RVCOperationalState）都继承自它。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">通用基础 Cluster</div>
    <p>
      OperationalState 定义了<strong>通用的</strong>状态和错误枚举。设备特定的 Cluster（如烤箱、扫地机器人）
      会继承这些基础定义，并在此基础上扩展自己的状态值和错误码。
      例如，扫地机器人（RVC）会增加 <code>SeekingCharger</code>、<code>Charging</code> 等状态，
      以及 <code>StuckAtObstacle</code>、<code>DustBinFull</code> 等错误。
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
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    OperationalState Cluster 共有 4 个命令，对应家电操作的基本动作。
    所有命令执行后都会返回 <code>OperationalCommandResponse</code>，包含一个
    <a href="#struct-errorstate">ErrorStateStruct</a> 用于指示操作是否成功。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
  </p>

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
          <td>Pause</td>
          <td>暂停当前操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Stop</td>
          <td>停止操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Start</td>
          <td>启动操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Resume</td>
          <td>恢复暂停的操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Pause —— 暂停（0x00）</h3>
  <p>
    暂停设备当前正在进行的操作。执行成功后，<code>OperationalState</code> 属性变为
    <code>Paused (2)</code>。设备会保留当前进度，可以通过 Resume 命令恢复。
    不需要参数。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">状态限制</div>
    <p>
      只有当设备处于 <code>Running (1)</code> 状态时才能暂停。
      如果在 <code>Stopped (0)</code> 或 <code>Error (3)</code> 状态下调用，
      会返回 <code>CommandInvalidInState (3)</code> 错误。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        洗衣机正在洗涤时，用户需要临时打开门添加衣物。App 发送 Pause 命令，
        洗衣机暂停洗涤、排水解锁门。添加衣物后发送 Resume 继续。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">Stop —— 停止（0x01）</h3>
  <p>
    完全停止设备的当前操作。执行成功后，<code>OperationalState</code> 属性变为
    <code>Stopped (0)</code>。与 Pause 不同，Stop 会放弃当前进度，
    需要重新 Start 才能开始新的操作周期。不需要参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        烤箱正在烤制食物，用户发现设置有误需要完全取消。发送 Stop 命令终止烤制，
        之后可以重新配置参数再发送 Start 开始新的烤制周期。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x02">Start —— 启动（0x02）</h3>
  <p>
    启动设备的操作。执行成功后，<code>OperationalState</code> 属性变为
    <code>Running (1)</code>。通常在设备处于 <code>Stopped (0)</code> 状态时调用。
    不需要参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在洗衣机上选好洗涤程序和温度后，点击 App 上的启动按钮，
        App 发送 Start 命令开始洗涤周期。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x03">Resume —— 恢复（0x03）</h3>
  <p>
    恢复之前被 Pause 暂停的操作。执行成功后，<code>OperationalState</code> 属性变为
    <code>Running (1)</code>，设备从暂停的位置继续执行。不需要参数。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">状态限制</div>
    <p>
      只有当设备处于 <code>Paused (2)</code> 状态时才能恢复。
      如果在 <code>Stopped (0)</code> 状态下调用，会返回
      <code>CommandInvalidInState (3)</code> 错误 —— 此时应该用 Start 而不是 Resume。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        洗衣机在暂停状态下，用户关上门后点击继续按钮。
        App 发送 Resume 命令，洗衣机从暂停位置继续洗涤。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 命令响应 ====== -->
  <h3 id="cmd-response">OperationalCommandResponse —— 命令响应</h3>
  <p>
    所有四个命令（Pause/Stop/Start/Resume）执行后都会返回此响应。
    它包含一个 <a href="#struct-errorstate">ErrorStateStruct</a>，用于指示命令是否成功。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommandResponseState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>命令执行结果。<code>ErrorStateID = 0 (NoError)</code> 表示成功</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>OperationalState Cluster 共有 6 个应用属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 阶段信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PhaseList</td>
          <td>list&lt;string&gt; / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>操作阶段列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentPhase</td>
          <td>uint8 / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>当前所处阶段索引</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CountdownTime</td>
          <td>elapsed_s / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>剩余时间（秒）</td>
        </tr>
        <!-- 运行状态 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OperationalStateList</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td><a href="#group-state">运行状态</a></td>
          <td>设备支持的所有状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>OperationalState</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td><a href="#group-state">运行状态</a></td>
          <td>当前运行状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OperationalError</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td><a href="#group-state">运行状态</a></td>
          <td>当前错误信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 阶段信息（0x0000, 0x0001, 0x0002）====== -->
  <h3 id="group-phase">阶段信息（0x0000, 0x0001, 0x0002）</h3>
  <p>描述设备当前操作的阶段进度和剩余时间。对于支持多阶段流程的设备（如洗衣机、烘干机），这些属性可以让 App 展示精确的进度信息。</p>

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
          <td>PhaseList（阶段列表）</td>
          <td>list&lt;string&gt; / null</td>
          <td>
            设备操作的有序阶段名称列表。例如洗衣机可能是 <code>["浸泡", "洗涤", "漂洗", "脱水"]</code>。
            <strong>Nullable</strong> —— <code>null</code> 表示设备不支持阶段概念（如简单的开关设备）。
            列表最多 32 项
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPhase（当前阶段）</td>
          <td>uint8 / null</td>
          <td>
            当前所处阶段在 PhaseList 中的索引（从 0 开始）。
            <strong>Nullable</strong> —— 当 PhaseList 为 <code>null</code> 时，此值也为 <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CountdownTime（剩余时间）</td>
          <td>elapsed_s / null</td>
          <td>
            当前操作的预计剩余时间，单位<strong>秒</strong>。设备会定期更新此值。
            <strong>Nullable</strong> —— <code>null</code> 表示设备无法预估剩余时间
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">阶段与倒计时的关系</div>
    <p>
      <code>CountdownTime</code> 是整个操作周期的剩余时间，不是单个阶段的剩余时间。
      当设备从一个阶段进入下一个阶段时，<code>CurrentPhase</code> 会更新，
      而 <code>CountdownTime</code> 则持续倒数直到整个操作完成。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 运行状态（0x0003, 0x0004, 0x0005）====== -->
  <h3 id="group-state">运行状态（0x0003, 0x0004, 0x0005）</h3>
  <p>描述设备的运行状态和错误信息。这是 App 上展示设备状态的核心数据源。</p>

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
          <td>OperationalStateList（状态列表）</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td>
            设备支持的所有运行状态。每个条目包含状态 ID 和可选的本地化标签。
            标准状态（0~3）之外，设备可以定义自己的扩展状态（ID &ge; 0x80）
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>OperationalState（运行状态）</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td>
            设备当前的运行状态，取值范围见
            <a href="#enum-opstate">OperationalStateEnum</a>。
            这是 App 展示设备状态的核心属性
          </td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OperationalError（当前错误）</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>
            设备当前的错误状态。当 <code>OperationalState</code> 为
            <code>Error (3)</code> 时，此属性包含具体的错误信息。
            无错误时 <code>ErrorStateID = 0 (NoError)</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-opstate">OperationalStateEnum —— 运行状态</h3>
  <p>设备的运行状态枚举。标准定义了 4 个基础值，设备特定的 Cluster 可以在 0x80~0xBF 范围内扩展。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">已停止 —— 设备空闲，可以接受 Start 命令</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">运行中 —— 正在执行操作，可以 Pause 或 Stop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">已暂停 —— 操作被暂停，可以 Resume 或 Stop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Error</span>
        <span class="enum-desc">错误 —— 发生故障，查看 OperationalError 获取详情</span>
      </div>
    </div>
  </div>

  <h3 id="enum-errorstate">ErrorStateEnum —— 错误类型</h3>
  <p>错误状态枚举。标准定义了 4 个通用错误码，设备特定的 Cluster 可以在 0x40~0x7F 范围内扩展。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoError</span>
        <span class="enum-desc">无错误 —— 一切正常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnableToStartOrResume</span>
        <span class="enum-desc">无法启动或恢复 —— 设备因某种原因无法开始操作</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UnableToCompleteOperation</span>
        <span class="enum-desc">无法完成操作 —— 操作过程中遇到了不可恢复的问题</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CommandInvalidInState</span>
        <span class="enum-desc">命令在当前状态无效 —— 如在 Stopped 状态下调用 Resume</span>
      </div>
    </div>
  </div>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>

  <h3 id="struct-errorstate">ErrorStateStruct —— 错误状态结构</h3>
  <p>
    用于描述设备的错误信息。既用于 <code>OperationalError</code> 属性，也用于命令响应。
    包含错误码、可选的本地化标签和详细描述。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorStateID</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>是</td>
          <td>错误类型编码。<code>0</code> 表示无错误</td>
        </tr>
        <tr>
          <td>ErrorStateLabel</td>
          <td>string</td>
          <td>否</td>
          <td>可选的本地化错误标签，供 App 直接展示。当 ErrorStateID 在标准范围之外时，此字段<strong>必须</strong>提供</td>
        </tr>
        <tr>
          <td>ErrorStateDetails</td>
          <td>string</td>
          <td>否</td>
          <td>可选的错误详细描述，提供更多诊断信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-opstate">OperationalStateStruct —— 操作状态结构</h3>
  <p>
    用于 <code>OperationalStateList</code> 属性中，描述设备支持的每一个运行状态。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalStateID</td>
          <td>uint8</td>
          <td>是</td>
          <td>状态编码。0~3 为标准状态，0x80~0xBF 为设备特定扩展状态</td>
        </tr>
        <tr>
          <td>OperationalStateLabel</td>
          <td>string</td>
          <td>否</td>
          <td>可选的本地化状态标签。对于标准状态（0~3），此字段可以省略；对于扩展状态（&ge;0x80），此字段<strong>必须</strong>提供</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>OperationalState Cluster 定义了 2 个事件，用于通知控制端设备的重要状态变化。</p>

  <h3 id="event-error">OperationalError 事件</h3>
  <p>
    当设备进入错误状态时触发此事件。事件优先级为 <strong>CRITICAL</strong>，
    确保控制端能及时收到错误通知。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>当前的错误信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-completion">OperationCompletion 事件</h3>
  <p>
    当设备完成一个完整操作周期时触发此事件。事件优先级为 <strong>INFO</strong>。
    该事件携带操作的时间统计信息，方便 App 展示操作报告。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CompletionErrorCode</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>是</td>
          <td>操作完成时的错误码。<code>0 (NoError)</code> 表示正常完成</td>
        </tr>
        <tr>
          <td>TotalOperationalTime</td>
          <td>elapsed_s / null</td>
          <td>否</td>
          <td>操作总耗时（秒），包含暂停时间。<code>null</code> 表示设备不支持统计</td>
        </tr>
        <tr>
          <td>PausedTime</td>
          <td>elapsed_s / null</td>
          <td>否</td>
          <td>暂停累计时长（秒）。<code>null</code> 表示设备不支持统计</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">实际运行时间</div>
    <p>
      如果需要计算实际工作时间（不含暂停），可以用
      <code>TotalOperationalTime - PausedTime</code>。
      例如洗衣机总耗时 90 分钟，其中暂停了 10 分钟，则实际洗涤时间为 80 分钟。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台正在运行中的洗衣机的 OperationalState Cluster 读取结果：</p>

  <pre><code>{
  // --- 阶段信息 ---
  "0x0000": ["浸泡", "洗涤", "漂洗", "脱水"],  // PhaseList（操作阶段列表）
  "0x0001": 1,                                   // CurrentPhase = 1（当前处于「洗涤」阶段）
  "0x0002": 1620,                                // CountdownTime = 1620 秒（剩余 27 分钟）

  // --- 运行状态 ---
  "0x0003": [                                    // OperationalStateList（设备支持的状态列表）
    { "OperationalStateID": 0, "OperationalStateLabel": "已停止" },
    { "OperationalStateID": 1, "OperationalStateLabel": "运行中" },
    { "OperationalStateID": 2, "OperationalStateLabel": "已暂停" },
    { "OperationalStateID": 3, "OperationalStateLabel": "错误" }
  ],
  "0x0004": 1,                                   // OperationalState = Running（正在运行）
  "0x0005": {                                    // OperationalError（当前无错误）
    "ErrorStateID": 0,
    "ErrorStateLabel": "",
    "ErrorStateDetails": ""
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      <code>PhaseList</code>、<code>CurrentPhase</code>、<code>CountdownTime</code>
      都是 Nullable 类型。简单的设备可能不支持阶段和倒计时，这些值会返回 <code>null</code>。
      App 在渲染界面时需要处理 <code>null</code> 的情况 —— 当值为 <code>null</code> 时，
      隐藏对应的 UI 元素即可。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-lifecycle">场景 1：洗衣机完整洗涤生命周期</h3>
  <ol>
    <li>用户选好洗涤程序，App 发送 <code>Start (0x02)</code> 命令</li>
    <li>洗衣机状态变为 <code>Running (1)</code>，<code>PhaseList</code> 返回
      <code>["浸泡", "洗涤", "漂洗", "脱水"]</code>，<code>CurrentPhase = 0</code>（浸泡）</li>
    <li>App 订阅 <code>CurrentPhase</code> 和 <code>CountdownTime</code> 属性变化，实时更新进度条和倒计时</li>
    <li>洗衣机依次进入各阶段，<code>CurrentPhase</code> 从 0 → 1 → 2 → 3</li>
    <li>操作完成后，设备状态变为 <code>Stopped (0)</code>，触发 <code>OperationCompletion</code> 事件</li>
    <li>App 收到事件，展示完成通知：「洗涤完成，总耗时 65 分钟」</li>
  </ol>

  <h3 id="scenario-error">场景 2：错误处理与恢复</h3>
  <ol>
    <li>洗衣机正在运行，突然检测到进水管异常</li>
    <li>设备状态变为 <code>Error (3)</code>，<code>OperationalError</code> 更新为：
      <ul>
        <li><code>ErrorStateID = 1 (UnableToStartOrResume)</code></li>
        <li><code>ErrorStateLabel = "进水异常"</code></li>
        <li><code>ErrorStateDetails = "进水流量低于阈值，请检查水龙头是否打开"</code></li>
      </ul>
    </li>
    <li>设备触发 <code>OperationalError</code> 事件（CRITICAL 优先级），App 弹出错误通知</li>
    <li>用户检查并修复进水管后，发送 <code>Stop (0x01)</code> 清除错误状态</li>
    <li>设备回到 <code>Stopped (0)</code>，用户重新发送 <code>Start (0x02)</code> 开始新周期</li>
  </ol>

  <h3 id="scenario-progress">场景 3：进度追踪与界面展示</h3>
  <ol>
    <li>App 读取 <code>PhaseList</code>，根据阶段数量渲染进度指示器（如 4 个步骤的进度条）</li>
    <li>订阅 <code>CurrentPhase</code> 属性，收到变化后高亮对应的阶段步骤</li>
    <li>订阅 <code>CountdownTime</code> 属性，实时更新倒计时显示</li>
    <li>订阅 <code>OperationalState</code> 属性，根据不同状态切换界面：
      <ul>
        <li><code>Stopped (0)</code> —— 显示「启动」按钮</li>
        <li><code>Running (1)</code> —— 显示「暂停」和「停止」按钮，展示进度和倒计时</li>
        <li><code>Paused (2)</code> —— 显示「继续」和「停止」按钮，倒计时暂停</li>
        <li><code>Error (3)</code> —— 显示错误信息和「停止」按钮</li>
      </ul>
    </li>
    <li>注意处理 <code>PhaseList = null</code> 的情况 —— 不显示阶段进度，仅显示状态和倒计时</li>
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
</style>`,
  },
  'laundry-washer-mode': {
    title: '洗衣机模式 Cluster · LaundryWasherMode（0x0051）',
    description: 'Matter LaundryWasherMode Cluster（0x0051）完整参考 — 基于 ModeBase 派生，支持 Normal/Delicate/Heavy/Whites 模式选择，ChangeToMode 命令、ModeTag 语义标签及启动模式配置。',
    prev: undefined,
    next: undefined,
    content: `<h1>洗衣机模式 Cluster（LaundryWasherMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0051</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    LaundryWasherMode 是 Matter 中用于洗衣机模式选择的 Cluster，派生自 ModeBase Cluster。
    它允许用户在洗衣机支持的多种洗涤模式之间切换，例如标准洗、轻柔洗、强力洗、漂白洗等。
    每种模式通过语义标签（ModeTag）描述其用途，使不同厂商的洗衣机能以统一方式被控制。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">派生自 ModeBase</div>
    <p>
      LaundryWasherMode 继承了 ModeBase Cluster 的全部命令和属性结构，
      并定义了洗衣机专属的 ModeTag 值（0x4000 ~ 0x4003）。
      如果你已经熟悉 ModeBase 的工作方式，这个 Cluster 的使用方式完全一致，只是模式标签不同。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag 标签</a>
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
    LaundryWasherMode Cluster 只有一个命令 ChangeToMode，用于切换洗涤模式。
    命令执行后设备返回 ChangeToModeResponse，告知切换是否成功。
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>切换到指定洗涤模式</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>切换结果响应（Status + StatusText）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- 切换模式（0x00）</h3>
  <p>
    请求设备切换到指定的洗涤模式。NewMode 的值必须是 SupportedModes 列表中某个 ModeOptionStruct 的 Mode 字段。
    设备收到后返回 ChangeToModeResponse。
  </p>

  <h4>请求参数</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须存在于 SupportedModes 列表中</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>响应字段（ChangeToModeResponse）</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>操作结果状态码（见<a href="#status-codes">状态码</a>）</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string（可选）</td>
          <td>人类可读的状态描述，失败时提供原因</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上选择「轻柔洗」模式，App 发送 ChangeToMode（NewMode = 1）。
        洗衣机返回 ChangeToModeResponse（Status = 0x00, Success），CurrentMode 更新为 1。
        如果洗衣机正在运行中不允许切换，会返回 GenericFailure 并在 StatusText 中说明原因。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>LaundryWasherMode Cluster 继承 ModeBase 的 4 个属性。</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备支持的所有洗涤模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前选中的模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>设备启动时的默认模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>设备开机时自动切换到的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性逐个说明 -->
  <h3 id="attr-0x0000">SupportedModes -- 支持的模式列表（0x0000）</h3>
  <p>
    设备支持的全部洗涤模式，每个元素是一个 ModeOptionStruct：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式名称，供人类阅读（如 "Normal"、"Delicate"）</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表中唯一，用于 ChangeToMode 命令</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>语义标签列表，描述模式的用途（见<a href="#mode-tags">ModeTag 标签</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Label 与 ModeTag 的区别</div>
    <p>
      Label 是厂商自定义的显示文字，不同厂商可能用不同措辞（"Normal"、"Standard"、"Regular"）。
      ModeTag 是标准化的语义标签，App 应优先根据 ModeTag 值判断模式类型，Label 仅用于界面展示。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode -- 当前模式（0x0001）</h3>
  <p>
    当前选中的洗涤模式编号。值必须是 SupportedModes 中某个 ModeOptionStruct 的 Mode 字段。
    通过 ChangeToMode 命令修改。可订阅此属性获取模式变更通知。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">StartUpMode -- 启动模式（0x0002）</h3>
  <p>
    设备上电或重启后的初始模式。Nullable -- 值为 <code>null</code> 时表示保持上次断电前的模式。
    设置具体值时，该值必须存在于 SupportedModes 列表中。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode -- 开机模式（0x0003）</h3>
  <p>
    当设备从 Off 切换到 On 时自动应用的模式。Nullable -- 值为 <code>null</code> 时不覆盖，保持 CurrentMode 不变。
    如果 OnMode 有值，每次开机都会将 CurrentMode 强制设为该值，忽略 StartUpMode 的设置。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">OnMode 与 StartUpMode 的优先级</div>
    <p>
      如果 OnMode 不为 null，它的优先级高于 StartUpMode。
      设备上电流程：先应用 StartUpMode（如果有），再在 Off &rarr; On 时应用 OnMode 覆盖。
      实际效果是开机后始终使用 OnMode 指定的模式。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== ModeTag 语义标签 ====== -->
  <h2 id="mode-tags">ModeTag 语义标签</h2>
  <p>
    LaundryWasherMode 定义了 4 个专属 ModeTag 值，用于标准化描述洗涤模式的类型。
    App 应根据这些标签识别模式用途，而不是依赖厂商自定义的 Label 文字。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">标准洗 -- 日常衣物的默认洗涤模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Delicate</span>
        <span class="enum-desc">轻柔洗 -- 适用于丝绸、内衣等精细衣物</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Heavy</span>
        <span class="enum-desc">强力洗 -- 适用于重度污渍的工作服、运动服等</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4003</span>
      <div>
        <span class="enum-name">Whites</span>
        <span class="enum-desc">漂白洗 -- 专为白色衣物设计，通常使用更高水温</span>
      </div>
    </div>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">状态码（StatusCode）</h2>
  <p>ChangeToModeResponse 中 Status 字段的可能取值：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">模式切换成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">请求的模式编号不存在于 SupportedModes 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">通用失败 -- 设备当前状态不允许切换（如正在运行中）</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持 4 种洗涤模式、当前处于标准洗的洗衣机的 LaundryWasherMode Cluster 读取结果：</p>

  <pre><code>{
  // --- 支持的模式列表 ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = Normal
    },
    {
      "Label": "Delicate",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = Delicate
    },
    {
      "Label": "Heavy",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]   // 0x4002 = Heavy
    },
    {
      "Label": "Whites",
      "Mode": 3,
      "ModeTags": [{ "Value": 16387 }]   // 0x4003 = Whites
    }
  ],

  // --- 当前模式 ---
  "0x0001": 0,                   // CurrentMode = 0（Normal）

  // --- 启动与开机模式 ---
  "0x0002": null,                // StartUpMode = null（保持上次模式）
  "0x0003": null                 // OnMode = null（不覆盖，保持 CurrentMode）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      SupportedModes 的内容由设备厂商定义，不同洗衣机支持的模式数量和编号可能不同。
      App 展示模式列表时应动态读取 SupportedModes，不要硬编码模式选项。
      使用 ModeTag 值判断模式类型，而不是比较 Label 字符串。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-mode-select">场景 1：选择洗涤模式</h3>
  <ol>
    <li>读取 <code>SupportedModes (0x0000)</code> 获取设备支持的所有洗涤模式</li>
    <li>在 App 界面展示模式列表，根据 ModeTag 值显示对应图标和说明</li>
    <li>用户选择「轻柔洗」，发送 <code>ChangeToMode (0x00)</code>，NewMode 填入对应的 Mode 编号</li>
    <li>检查 ChangeToModeResponse 的 Status：
      <ul>
        <li><code>0x00</code>（Success）-- 切换成功，订阅 CurrentMode 确认更新</li>
        <li><code>0x01</code>（UnsupportedMode）-- 模式编号无效，检查是否与 SupportedModes 同步</li>
        <li><code>0x02</code>（GenericFailure）-- 设备拒绝切换，读取 StatusText 展示原因（如「洗涤中无法切换模式」）</li>
      </ul>
    </li>
  </ol>

  <h3 id="scenario-startup">场景 2：配置启动模式</h3>
  <ol>
    <li>读取 <code>SupportedModes (0x0000)</code> 获取可选模式列表</li>
    <li>写入 <code>StartUpMode (0x0002)</code> 设置上电默认模式：
      <ul>
        <li>写入具体 Mode 编号 -- 每次上电自动使用该模式（如始终默认标准洗）</li>
        <li>写入 <code>null</code> -- 保持断电前的模式（推荐）</li>
      </ul>
    </li>
    <li>如需每次开机强制使用某个模式，可设置 <code>OnMode (0x0003)</code>，其优先级高于 StartUpMode</li>
    <li>大多数家用场景建议两者都设为 <code>null</code>，让用户每次手动选择模式</li>
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
  },
  'laundry-washer-controls': {
    title: '洗衣机控制 Cluster · LaundryWasherControls（0x0053）',
    description: 'Matter LaundryWasherControls Cluster（0x0053）完整参考 — 脱水转速选择、漂洗次数控制、SPIN/RINSE Feature、NumberOfRinsesEnum 枚举值速查及真实设备数据示例。',
    prev: undefined,
    next: undefined,
    content: `<h1>洗衣机控制 Cluster（LaundryWasherControls）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0053</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1+</code>（家电功能端点）
  </p>
  <p>
    LaundryWasherControls 用于管理洗衣机的操作参数 —— 脱水转速和漂洗次数。
    它是一个<strong>纯属性驱动</strong>的 Cluster（没有命令），所有操作通过直接写属性完成。
    与 <a href="../laundry-washer-mode/">LaundryWasherMode（0x0051）</a> 配合使用：
    Mode 负责选择洗涤模式（标准、轻柔、强力等），Controls 负责调整具体的运行参数。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 LaundryWasherMode 的分工</div>
    <p>
      洗衣机通常同时实现两个 Cluster：
    </p>
    <ul>
      <li><strong>LaundryWasherMode（0x0051）</strong> —— 选择洗涤程序（标准、轻柔、强力、漂白等），决定整体洗涤策略</li>
      <li><strong>LaundryWasherControls（0x0053）</strong> —— 在选定模式的基础上微调参数（脱水转速、漂洗次数）</li>
    </ul>
    <p>
      类比来说：Mode 是「选哪个菜谱」，Controls 是「盐多放一点还是少放一点」。
      两者通常在同一个 Endpoint 上，App 界面上可以设计为模式选择 + 参数调节的组合面板。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#features">Feature 位图</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>LaundryWasherControls 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些控制能力。Feature 决定了哪些属性可用：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">SPIN（SpinSpeedControl）</span>
        <span class="enum-desc">脱水转速控制 —— 启用 SpinSpeeds 和 SpinSpeedCurrent 属性，允许用户选择脱水转速</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">RINSE（RinseControl）</span>
        <span class="enum-desc">漂洗次数控制 —— 启用 NumberOfRinses 和 SupportedRinses 属性，允许用户选择漂洗次数</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      <code>FeatureMap = 0x01</code>（仅 SPIN）—— 只能调转速，漂洗次数由洗涤模式固定。<br/>
      <code>FeatureMap = 0x02</code>（仅 RINSE）—— 只能调漂洗次数，脱水转速由洗涤模式固定。<br/>
      <code>FeatureMap = 0x03</code>（SPIN + RINSE）—— 转速和漂洗次数都可以独立调节，这是功能最完整的配置。
    </p>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    LaundryWasherControls <strong>没有命令</strong>，所有操作通过读写属性完成。
    共有 4 个属性，分属两组，分别对应 SPIN 和 RINSE 两个 Feature。
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
        </tr>
      </thead>
      <tbody>
        <!-- 脱水转速 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SpinSpeeds</td>
          <td>list&lt;string&gt;</td>
          <td><a href="#group-spin">脱水转速</a></td>
          <td>支持的转速列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SpinSpeedCurrent</td>
          <td>uint8 / null</td>
          <td><a href="#group-spin">脱水转速</a></td>
          <td>当前选择的转速索引</td>
        </tr>
        <!-- 漂洗次数 -->
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>NumberOfRinses</td>
          <td>enum8</td>
          <td><a href="#group-rinse">漂洗次数</a></td>
          <td>当前漂洗次数设置</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>SupportedRinses</td>
          <td>list&lt;enum8&gt;</td>
          <td><a href="#group-rinse">漂洗次数</a></td>
          <td>支持的漂洗选项列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 脱水转速（0x0000, 0x0001）====== -->
  <h3 id="group-spin">脱水转速（0x0000, 0x0001）</h3>
  <p>
    需要 <strong>SPIN（SpinSpeedControl）</strong> Feature。
    控制洗衣机脱水阶段的转速 —— 转速越高脱水越彻底，但对衣物的磨损也越大。
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
          <td>SpinSpeeds<br/><span class="attr-cn">转速列表</span></td>
          <td>list&lt;string&gt;</td>
          <td>设备支持的所有脱水转速，以字符串列表表示。只读属性。列表中的每个元素是厂商定义的转速名称（如 <code>"400"</code>、<code>"800"</code>、<code>"1200"</code>，或 <code>"Low"</code>、<code>"Medium"</code>、<code>"High"</code>）。列表的索引用于 SpinSpeedCurrent</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SpinSpeedCurrent<br/><span class="attr-cn">当前转速</span></td>
          <td>uint8 / null</td>
          <td>当前选择的脱水转速，值为 SpinSpeeds 列表的索引（从 0 开始）。可读写。Nullable —— <code>null</code> 表示转速由设备根据洗涤模式自动决定。写入时值必须在 <code>0</code> ~ <code>SpinSpeeds.length - 1</code> 范围内</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">SpinSpeedCurrent 是索引，不是转速值</div>
    <p>
      <code>SpinSpeedCurrent</code> 存储的是 <code>SpinSpeeds</code> 列表的<strong>索引</strong>，不是实际转速数字。
      例如 <code>SpinSpeeds = ["400", "800", "1200"]</code> 时，写入 <code>SpinSpeedCurrent = 1</code> 表示选择 <code>"800"</code> 转。
      App 展示时应先读取 SpinSpeeds，再用 SpinSpeedCurrent 的值作为索引去取对应的字符串。
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">转速名称不一定是数字</div>
    <p>
      SpinSpeeds 里的字符串由厂商自行定义，不一定是纯数字。
      有些洗衣机可能用 <code>"Low"</code>、<code>"Medium"</code>、<code>"High"</code> 这样的描述性文字，
      也有些可能用 <code>"400 RPM"</code>、<code>"No Spin"</code> 等带单位的标记。
      App 应直接显示这些字符串，而不是尝试解析成数字做计算。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 漂洗次数（0x0002, 0x0003）====== -->
  <h3 id="group-rinse">漂洗次数（0x0002, 0x0003）</h3>
  <p>
    需要 <strong>RINSE（RinseControl）</strong> Feature。
    控制洗涤过程中漂洗的次数 —— 漂洗越多，衣物残留的洗涤剂越少，但耗水耗时也更多。
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
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>NumberOfRinses<br/><span class="attr-cn">漂洗次数</span></td>
          <td>enum8</td>
          <td>当前设置的漂洗次数级别。可读写。写入的值必须在 SupportedRinses 列表中（见下方枚举）</td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>SupportedRinses<br/><span class="attr-cn">支持的漂洗选项</span></td>
          <td>list&lt;enum8&gt;</td>
          <td>设备支持的漂洗次数选项列表。只读属性。列表中的每个元素是 NumberOfRinsesEnum 值。App 应只展示此列表中包含的选项</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>NumberOfRinsesEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">None</span>
        <span class="enum-desc">不漂洗 —— 跳过漂洗阶段，适合预洗或快洗场景</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">标准漂洗 —— 默认的漂洗次数，适合日常衣物</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Extra</span>
        <span class="enum-desc">额外漂洗 —— 多漂洗一次，适合婴儿衣物或敏感肌肤</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Max</span>
        <span class="enum-desc">最大漂洗 —— 尽可能多次漂洗，最大程度减少洗涤剂残留</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">SupportedRinses 决定可选项</div>
    <p>
      并非所有洗衣机都支持全部 4 个漂洗级别。
      App 在展示漂洗选项前，必须先读取 <code>SupportedRinses</code>，只显示其中包含的值。
      例如 <code>SupportedRinses = [1, 2]</code> 表示只支持 Normal 和 Extra 两个选项，
      写入 <code>NumberOfRinses = 0</code>（None）或 <code>3</code>（Max）会被设备拒绝。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台同时支持 SPIN 和 RINSE Feature 的洗衣机在运行中的 LaundryWasherControls Cluster 读取结果：</p>

  <pre><code>{
  // --- 脱水转速（SPIN Feature）---
  "0x0000": [                   // SpinSpeeds — 支持的转速列表
    "400",
    "600",
    "800",
    "1000",
    "1200"
  ],
  "0x0001": 2,                  // SpinSpeedCurrent = 2（当前选择 "800" 转）

  // --- 漂洗次数（RINSE Feature）---
  "0x0002": 1,                  // NumberOfRinses = Normal（标准漂洗）
  "0x0003": [0, 1, 2, 3]       // SupportedRinses = [None, Normal, Extra, Max]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      如果设备只支持 SPIN Feature（<code>FeatureMap = 0x01</code>），则只有 SpinSpeeds 和 SpinSpeedCurrent 两个属性；
      如果只支持 RINSE Feature（<code>FeatureMap = 0x02</code>），则只有 NumberOfRinses 和 SupportedRinses。
      读取前先检查 <code>FeatureMap (0xFFFC)</code>，对不支持的属性发起读取会返回 <code>UNSUPPORTED_ATTRIBUTE</code>。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：洗衣机控制面板 —— 模式 + 参数联动</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上操作洗衣机时，通常先选洗涤模式，再调整转速和漂洗次数。
        App 需要同时读取 LaundryWasherMode 和 LaundryWasherControls 两个 Cluster 的数据来构建完整的控制界面。
      </p>
      <ol>
        <li>读取 <code>LaundryWasherMode</code> 的 <code>SupportedModes (0x0000)</code> 和 <code>CurrentMode (0x0001)</code>，展示模式选择按钮</li>
        <li>读取 <code>LaundryWasherControls</code> 的 <code>FeatureMap (0xFFFC)</code>，确认支持哪些参数调节</li>
        <li>如果支持 SPIN：读取 <code>SpinSpeeds (0x0000)</code> 生成转速选择器，用 <code>SpinSpeedCurrent (0x0001)</code> 标记当前选中项</li>
        <li>如果支持 RINSE：读取 <code>SupportedRinses (0x0003)</code> 生成漂洗选项，用 <code>NumberOfRinses (0x0002)</code> 标记当前值</li>
        <li>用户切换洗涤模式后，设备可能自动调整 SpinSpeedCurrent 和 NumberOfRinses —— 订阅这两个属性的变化，及时刷新界面</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：敏感衣物洗涤 —— 低转速 + 额外漂洗</summary>
    <div class="scenario-content">
      <p>
        用户洗婴儿衣物或丝绸等精细织物时，需要降低脱水转速以减少磨损，同时增加漂洗次数以去除洗涤剂残留。
      </p>
      <ol>
        <li>先通过 <code>LaundryWasherMode</code> 切换到「轻柔 / Delicate」模式</li>
        <li>读取 <code>SpinSpeeds (0x0000)</code>，找到最低转速的索引（通常是 0）</li>
        <li>写入 <code>SpinSpeedCurrent (0x0001) = 0</code>，选择最低转速</li>
        <li>检查 <code>SupportedRinses (0x0003)</code> 是否包含 <code>2</code>（Extra）或 <code>3</code>（Max）</li>
        <li>写入 <code>NumberOfRinses (0x0002) = 2</code>（Extra），增加漂洗次数</li>
        <li>App 可以为常见场景（婴儿衣物、过敏体质等）预设这套参数组合，一键应用</li>
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

  .scenario-content {
    padding: 0.5rem 0;
  }
</style>`,
  },
  'dishwasher-mode': {
    title: '洗碗机模式 Cluster · DishwasherMode（0x0059）',
    description: 'Matter DishwasherMode Cluster（0x0059）完整参考 — 派生自 ModeBase，支持 Normal/Heavy/Light 三种洗涤模式切换，含 ChangeToMode 命令、模式属性及 ModeTag 定义。',
    prev: undefined,
    next: undefined,
    content: `<h1>洗碗机模式 Cluster（DishwasherMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0059</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    DishwasherMode 用于控制洗碗机的洗涤模式选择。
    它派生自 <strong>ModeBase</strong> Cluster，结构与 LaundryWasherMode 完全一致，
    区别仅在于 ModeTag 值针对洗碗机场景定义（Normal / Heavy / Light）。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ModeBase 派生 Cluster</div>
    <p>
      DishwasherMode 是 ModeBase（0x0050）的派生 Cluster，不能独立实现 ——
      它复用 ModeBase 的全部命令和属性定义，仅扩展了专属的 ModeTag 枚举值。
      了解 ModeBase 的机制后，所有 Mode 类 Cluster（洗衣机、洗碗机、冰箱等）都是同一套用法。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag 枚举</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    DishwasherMode 继承自 ModeBase，只有一对命令：客户端发送 ChangeToMode，设备返回 ChangeToModeResponse。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>方向</th>
          <th>名称</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-change">
          <td><a href="#cmd-change"><code>0x00</code></a></td>
          <td>客户端 → 设备</td>
          <td>ChangeToMode</td>
          <td>切换到指定模式</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-response">
          <td><a href="#cmd-response"><code>0x01</code></a></td>
          <td>设备 → 客户端</td>
          <td>ChangeToModeResponse</td>
          <td>返回切换结果</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-change">ChangeToMode —— 切换模式（0x00）</h3>
  <p>请求设备切换到指定的洗涤模式。目标模式必须是 SupportedModes 中存在的值。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须在 SupportedModes 列表中存在</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">运行中切换</div>
    <p>
      洗碗机正在运行时，设备可能拒绝模式切换并在 ChangeToModeResponse 中返回错误状态码。
      具体行为取决于厂商实现。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-response">ChangeToModeResponse —— 切换结果（0x01）</h3>
  <p>设备收到 ChangeToMode 后返回的响应，告知切换是否成功。</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td><code>0x00</code> = 成功；其他值为厂商自定义错误码</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string（可选）</td>
          <td>失败时的可读错误描述，最长 64 字节</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>DishwasherMode 继承 ModeBase 的 4 个属性。点击属性 ID 可跳转到详细说明。</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备支持的所有模式列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前激活的模式编号</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>上电后的初始模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>开机时强制切换到的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性详细说明 -->
  <h3 id="attr-0x0000">SupportedModes —— 支持的模式列表（0x0000）</h3>
  <p>
    设备支持的全部洗涤模式，列表中每个元素是一个 <code>ModeOptionStruct</code>：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式的可读名称（如 <code>"Normal"</code>、<code>"Heavy"</code>）</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表中唯一</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>模式标签，用于标识模式的语义（见 <a href="#mode-tags">ModeTag 枚举</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Mode 编号由厂商定义</div>
    <p>
      Mode 编号（0、1、2 …）只是厂商自定义的序号，不同厂商可能不一样。
      要判断某个模式的语义含义，应查看 ModeTags 中的 ModeTag 值而非 Mode 编号。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode —— 当前模式（0x0001）</h3>
  <p>
    设备当前激活的模式编号，值必须是 SupportedModes 中某个条目的 Mode 值。
    订阅此属性可以在模式变化时同步更新 App 界面。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">StartUpMode —— 上电模式（0x0002）</h3>
  <p>
    设备上电（或重启）后使用的初始模式。Nullable —— <code>null</code> 表示不指定，
    由设备自行决定（通常恢复断电前的模式）。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode —— 开机模式（0x0003）</h3>
  <p>
    设备从 Off 切换到 On 时强制切换到的模式。Nullable ——
    <code>null</code> 表示开机时不强制切换，保持 CurrentMode 不变。
  </p>
  <div class="callout callout-info">
    <div class="callout-title">StartUpMode 与 OnMode 的区别</div>
    <p>
      <strong>StartUpMode</strong> 在设备上电（断电恢复）时生效；
      <strong>OnMode</strong> 在设备从关闭状态切换到开启状态时生效（如用户按下开始按钮）。
      两者触发时机不同，可以设置不同的值。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== ModeTag 枚举 ====== -->
  <h2 id="mode-tags">ModeTag 枚举</h2>
  <p>
    DishwasherMode 定义了 3 个专属 ModeTag 值，用于标识洗碗机洗涤模式的语义。
    App 应通过 ModeTag 识别模式含义，而非依赖 Label 字符串或 Mode 编号。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">标准洗涤 —— 日常餐具的默认模式</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Heavy</span>
        <span class="enum-desc">强力洗涤 —— 重油污、锅具等顽固污渍</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Light</span>
        <span class="enum-desc">轻柔洗涤 —— 轻微脏污、精致餐具</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">通用 ModeTag</div>
    <p>
      除了上述专属 Tag，设备也可以使用 ModeBase 定义的通用 Tag，例如
      <code>0x0000</code>（Auto）、<code>0x0001</code>（Quick）、<code>0x0002</code>（Quiet）等。
      一个模式可以同时携带多个 Tag。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持三种洗涤模式的洗碗机，当前处于 Normal 模式时的 DishwasherMode Cluster 读取结果：</p>

  <pre><code>{
  // --- 当前模式 ---
  "0x0000": [                 // SupportedModes — 支持的模式列表
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]
    },
    {
      "Label": "Heavy",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]
    },
    {
      "Label": "Light",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]
    }
  ],
  "0x0001": 0,               // CurrentMode = 0（当前为 Normal 模式）
  "0x0002": 0,               // StartUpMode = 0（上电恢复 Normal）
  "0x0003": null              // OnMode = null（开机不强制切换模式）
}</code></pre>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-switch">场景 1：切换洗涤模式</h3>
  <ol>
    <li>读取 <code>SupportedModes (0x0000)</code>，获取设备支持的全部模式及其 ModeTag</li>
    <li>在 App 中根据 ModeTag 展示模式选项（如「标准」「强力」「轻柔」）</li>
    <li>用户选择后，发送 <code>ChangeToMode</code>，参数 NewMode 设为目标模式的编号</li>
    <li>检查 <code>ChangeToModeResponse</code> 的 Status —— 如果洗碗机正在运行，可能返回错误</li>
    <li>订阅 <code>CurrentMode (0x0001)</code> 确认切换成功</li>
  </ol>

  <h3 id="scenario-startup">场景 2：配置默认模式</h3>
  <ol>
    <li>用户在 App 设置页选择「每次开机默认使用强力模式」</li>
    <li>写入 <code>OnMode (0x0003)</code> 为 Heavy 模式对应的编号（例如 <code>1</code>）</li>
    <li>之后每次洗碗机从关闭切换到开启，都会自动进入强力模式</li>
    <li>如需取消强制模式，将 OnMode 写回 <code>null</code></li>
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
  },
  'dishwasher-alarm': {
    title: '洗碗机告警 Cluster · DishwasherAlarm（0x005D）',
    description: 'Matter DishwasherAlarm Cluster（0x005D）完整参考 — 告警位图、Mask/Latch/State/Supported 属性、Reset 与 ModifyEnabledAlarms 命令、Notify 事件及典型场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>洗碗机告警 Cluster（DishwasherAlarm）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005D</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    DishwasherAlarm 是 Matter 中专门用于洗碗机告警和故障上报的 Cluster。
    它通过一组位图（bitmap）来描述设备支持哪些告警、当前启用了哪些、哪些正在激活。
    控制器可以订阅告警状态变化，也可以让用户自行配置关心哪些告警。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">RESET 特性</div>
    <p>
      DishwasherAlarm Cluster 定义了一个 <strong>RESET</strong> Feature。
      启用 RESET 后，Cluster 提供 <code>Reset</code> 命令以及 <code>Latch</code> 属性，
      允许用户手动复位已锁存（latch）的告警。不支持 RESET 特性的设备，
      告警会在故障解除后自动清除，无法手动复位。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#alarm-bits">告警位定义</a>
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
    DishwasherAlarm Cluster 有 2 个命令。<code>ModifyEnabledAlarms</code> 允许用户选择关心哪些告警，
    <code>Reset</code> 用于手动复位锁存的告警（需要 RESET 特性）。
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
          <td>Reset</td>
          <td>复位指定的锁存告警</td>
          <td class="col-required">RESET</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ModifyEnabledAlarms</td>
          <td>修改启用的告警掩码</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Reset —— 复位告警（0x00）</h3>
  <p>
    手动复位一个或多个已锁存（latched）的告警。只有在 <code>Latch</code> 属性中标记为锁存的告警位才需要手动复位，
    其他告警会在故障解除后自动清除。此命令需要设备支持 RESET 特性。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Alarms</td>
          <td>bitmap32</td>
          <td>要复位的告警位图。每一位对应一种告警（见<a href="#alarm-bits">告警位定义</a>），置 1 表示要复位该告警</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        洗碗机排水故障（DrainError）被修复后，由于该告警是锁存类型，State 中仍然保持激活。
        用户在 App 上点击「清除告警」，App 发送 Reset 命令并将 Alarms 参数的 bit 1 置为 1，
        设备收到后清除 State 中的 DrainError 位。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">ModifyEnabledAlarms —— 修改启用告警（0x01）</h3>
  <p>
    修改告警掩码（Mask），控制哪些告警处于启用状态。只有在 Mask 中启用的告警才会被设备上报。
    用户可以通过这个命令屏蔽不关心的告警类型。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>新的告警掩码。每一位对应一种告警（见<a href="#alarm-bits">告警位定义</a>），置 1 表示启用该告警的上报</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Mask 限制</div>
    <p>
      写入的 Mask 值不能超出 <code>Supported</code> 属性的范围。
      如果尝试启用设备不支持的告警位，命令会被拒绝。
      例如设备 Supported = <code>0x07</code>（只支持前 3 种告警），
      则 Mask 只能在 <code>0x00</code> ~ <code>0x07</code> 范围内设置。
    </p>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在设置页面取消勾选「门未关好」告警（DoorError, bit 2），
        App 发送 ModifyEnabledAlarms 命令，将 Mask 中的 bit 2 清零。
        之后即使门未关好，设备也不会上报 DoorError 告警。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>DishwasherAlarm Cluster 共有 4 个应用属性，全部为 bitmap32 类型。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>说明</th>
          <th>所需特性</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>已启用的告警掩码</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Latch</td>
          <td>bitmap32</td>
          <td>需要手动复位的告警位</td>
          <td class="col-required">RESET</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>State</td>
          <td>bitmap32</td>
          <td>当前激活的告警</td>
          <td class="col-optional">无</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>Supported</td>
          <td>bitmap32</td>
          <td>设备支持的告警位</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性逐条详解 ====== -->
  <h3 id="attr-0x0000">Mask —— 告警掩码（0x0000）</h3>
  <p>
    指示哪些告警当前处于启用状态。只有 Mask 中对应位为 1 的告警，设备才会在 State 中上报。
    用户可以通过 <code>ModifyEnabledAlarms</code> 命令修改此属性。
    Mask 的每一位含义见<a href="#alarm-bits">告警位定义</a>。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0000</code></td>
          <td>Mask（告警掩码）</td>
          <td>bitmap32</td>
          <td>每一位对应一种告警。<code>1</code> = 启用上报，<code>0</code> = 屏蔽。初始值通常等于 Supported（全部启用）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">Latch —— 锁存位图（0x0001）</h3>
  <p>
    指示哪些告警是「锁存」类型 —— 即故障解除后告警不会自动清除，必须通过 <code>Reset</code> 命令手动复位。
    此属性仅在设备支持 RESET 特性时存在。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0001</code></td>
          <td>Latch（锁存位图）</td>
          <td>bitmap32</td>
          <td>每一位对应一种告警。<code>1</code> = 锁存（需手动复位），<code>0</code> = 自动清除。<strong>需要 RESET 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">锁存 vs 自动清除</div>
    <p>
      锁存告警的典型用途：即使进水故障已经物理排除，设备仍然保持告警状态，
      直到用户确认已处理。这避免了用户错过重要的故障事件。
      自动清除的告警则在故障消失后立即恢复正常，适合临时性异常（如瞬时温度波动）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">State —— 当前告警状态（0x0002）</h3>
  <p>
    反映设备当前正在激活的告警。每一位对应一种告警类型，置 1 表示该告警当前处于激活状态。
    这是控制器最常订阅的属性，用于实时监测设备故障。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0002</code></td>
          <td>State（当前告警状态）</td>
          <td>bitmap32</td>
          <td>每一位对应一种告警。<code>1</code> = 告警激活，<code>0</code> = 正常。值始终是 Mask 的子集（被屏蔽的告警不会出现在 State 中）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">Supported —— 支持的告警位（0x0003）</h3>
  <p>
    声明设备硬件层面支持哪些告警类型。这是一个只读属性，由设备固件决定。
    Mask 和 State 的有效位不能超出 Supported 的范围。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>名称</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x0003</code></td>
          <td>Supported（支持的告警位）</td>
          <td>bitmap32</td>
          <td>每一位对应一种告警。<code>1</code> = 设备支持该告警。只读，不可写入</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 告警位定义 ====== -->
  <h2 id="alarm-bits">告警位定义</h2>
  <p>
    Mask、Latch、State、Supported 四个属性共享同一套告警位定义。
    每一位代表一种洗碗机可能出现的故障类型：
  </p>

  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">InflowError（进水异常）</span>
        <span class="enum-desc">进水管路故障 —— 水压不足、进水阀卡住或供水中断</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">DrainError（排水异常）</span>
        <span class="enum-desc">排水管路故障 —— 排水泵故障、管路堵塞或排水超时</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">DoorError（门未关好）</span>
        <span class="enum-desc">洗碗机门未完全关闭 —— 运行中门被打开或门锁故障</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">TempTooLow（温度过低）</span>
        <span class="enum-desc">水温低于正常工作范围 —— 加热器故障或进水温度异常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TempTooHigh（温度过高）</span>
        <span class="enum-desc">水温超出安全范围 —— 温控器失灵或加热器持续加热</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">WaterLevelError（水位异常）</span>
        <span class="enum-desc">水位超出正常范围 —— 可能是溢水风险或水位传感器故障</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">位图读取示例</div>
    <p>
      State = <code>0x00000006</code>（二进制 <code>...000110</code>）
      表示 bit 1（DrainError）和 bit 2（DoorError）同时处于激活状态。
      应用层可以通过按位与操作逐一检查每种告警是否激活。
    </p>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    DishwasherAlarm Cluster 定义了一个 <code>Notify</code> 事件，在告警状态发生变化时触发。
    控制器应当订阅此事件以实时获取告警变更通知。
  </p>

  <h3 id="event-notify">Notify —— 告警通知事件</h3>
  <p>
    当告警状态发生变化（告警激活或解除）时，设备会产生 Notify 事件。
    事件携带变化时刻的完整快照，方便控制器精确掌握状态变更。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Active</td>
          <td>bitmap32</td>
          <td>本次变化中新激活的告警位（从 0 变为 1 的位）</td>
        </tr>
        <tr>
          <td>Inactive</td>
          <td>bitmap32</td>
          <td>本次变化中已解除的告警位（从 1 变为 0 的位）</td>
        </tr>
        <tr>
          <td>State</td>
          <td>bitmap32</td>
          <td>变化后的完整告警状态（与属性 State 一致）</td>
        </tr>
        <tr>
          <td>Mask</td>
          <td>bitmap32</td>
          <td>变化时刻的告警掩码（与属性 Mask 一致）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>事件示例</summary>
    <div class="scenario-content">
      <p>
        洗碗机排水故障触发：设备产生 Notify 事件，Active = <code>0x02</code>（DrainError 新激活），
        Inactive = <code>0x00</code>（无告警解除），State = <code>0x02</code>（当前只有排水告警），
        Mask = <code>0x3F</code>（全部告警已启用）。
      </p>
      <p>
        故障修复后用户发送 Reset：设备产生另一个 Notify 事件，Active = <code>0x00</code>，
        Inactive = <code>0x02</code>（DrainError 已解除），State = <code>0x00</code>（无活跃告警），
        Mask = <code>0x3F</code>。
      </p>
    </div>
  </details>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>DishwasherAlarm Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些高级能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RESET</span>
        <span class="enum-desc">支持告警复位 —— 启用 Reset 命令和 Latch 属性，允许手动复位锁存的告警</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">RESET 特性的影响</div>
    <p>
      <strong>启用 RESET</strong>：设备提供 Latch 属性和 Reset 命令。某些关键告警（如进水、排水故障）
      可以设置为锁存，确保用户不会错过。<br/>
      <strong>不启用 RESET</strong>：所有告警都是自动清除的，故障消失后 State 自动归零。
      适合不需要用户确认的简单设备。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持全部 6 种告警、启用了 RESET 特性的洗碗机，当前存在排水告警时的 Cluster 读取结果：</p>

  <pre><code>{
  // --- 告警位图属性 ---
  "0x0000": "0x0000003F",    // Mask = 0x3F（全部 6 种告警均已启用）
  "0x0001": "0x00000003",    // Latch = 0x03（InflowError + DrainError 需手动复位）
  "0x0002": "0x00000002",    // State = 0x02（当前 DrainError 告警激活）
  "0x0003": "0x0000003F"     // Supported = 0x3F（设备支持全部 6 种告警位）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      位图属性读取后，应用层需要逐位解析来确定各告警的状态。
      建议先读 <code>Supported (0x0003)</code> 确认设备支持哪些告警位，
      再结合 <code>Mask (0x0000)</code> 判断哪些已启用，
      最后用 <code>State (0x0002)</code> 获取当前激活的告警。
      三者的关系是：State 是 Mask 的子集，Mask 是 Supported 的子集。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-monitoring">场景 1：告警监控与处理</h3>
  <ol>
    <li>订阅 <code>Notify</code> 事件，实时接收告警状态变化</li>
    <li>收到事件后，检查 <code>Active</code> 字段确定哪些新告警被触发</li>
    <li>在 App 上显示对应的告警信息（如「排水异常」、「门未关好」等）</li>
    <li>读取 <code>Latch (0x0001)</code>，判断该告警是否需要手动复位</li>
    <li>如果是锁存告警 —— 用户处理故障后，在 App 上点击「清除告警」，发送 <code>Reset (0x00)</code> 命令</li>
    <li>如果是自动清除告警 —— 等待故障自行消除即可，State 会自动更新</li>
  </ol>

  <h3 id="scenario-config">场景 2：用户自定义告警配置</h3>
  <ol>
    <li>读取 <code>Supported (0x0003)</code>，获取设备支持的全部告警类型</li>
    <li>读取 <code>Mask (0x0000)</code>，获取当前已启用的告警</li>
    <li>在设置页面展示开关列表，让用户勾选/取消关心的告警类型</li>
    <li>用户修改后，发送 <code>ModifyEnabledAlarms (0x01)</code> 写入新的 Mask 值</li>
    <li>例如：用户只关心进水和排水告警，发送 Mask = <code>0x03</code>（bit 0 + bit 1）</li>
    <li>之后设备只会上报 InflowError 和 DrainError，其他告警不再触发通知</li>
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
</style>`,
  },
  'refrigerator-mode': {
    title: '冰箱模式 Cluster · RefrigeratorAndTemperatureControlledCabinetMode（0x0052）',
    description: 'Matter RefrigeratorAndTemperatureControlledCabinetMode Cluster（0x0052）完整参考 — 基于 ModeBase 派生，支持 RapidCool/RapidFreeze 模式切换，多 Endpoint 架构下冷藏室与冷冻室独立控制。',
    prev: undefined,
    next: undefined,
    content: `<h1>冰箱模式 Cluster（RefrigeratorAndTemperatureControlledCabinetMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0052</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 冷藏室 / 冷冻室功能端点（可能有多个）
  </p>
  <p>
    RefrigeratorAndTemperatureControlledCabinetMode 是 Matter 中用于冰箱模式控制的 Cluster，派生自 ModeBase Cluster。
    它允许用户切换冰箱各温区的工作模式，例如启用急速制冷（RapidCool）或急速冷冻（RapidFreeze）。
    每种模式通过语义标签（ModeTag）描述其用途，使不同厂商的冰箱能以统一方式被控制。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">派生自 ModeBase</div>
    <p>
      RefrigeratorAndTemperatureControlledCabinetMode 继承了 ModeBase Cluster 的全部命令和属性结构，
      并定义了冰箱专属的 ModeTag 值（0x4000 ~ 0x4001）。
      如果你已经熟悉 ModeBase 的工作方式，这个 Cluster 的使用方式完全一致，只是模式标签不同。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">多 Endpoint 架构</div>
    <p>
      一台冰箱设备通常包含多个温控区域（冷藏室、冷冻室），每个区域对应一个独立的 Endpoint。
      每个 Endpoint 上都有自己的 RefrigeratorAndTemperatureControlledCabinetMode Cluster 实例，
      各自维护独立的 SupportedModes 和 CurrentMode。
      例如冷藏室 Endpoint 可能支持 RapidCool，冷冻室 Endpoint 则支持 RapidFreeze。
      操作时需先确认目标 Endpoint，避免对错误的温区发送命令。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag 标签</a>
    <span class="nav-sep">|</span>
    <a href="#status-codes">状态码</a>
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
    RefrigeratorAndTemperatureControlledCabinetMode Cluster 只有一个命令 ChangeToMode，用于切换冰箱模式。
    命令执行后设备返回 ChangeToModeResponse，告知切换是否成功。
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>切换到指定冰箱模式</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>切换结果响应（Status + StatusText）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- 切换模式（0x00）</h3>
  <p>
    请求设备切换到指定的冰箱模式。NewMode 的值必须是 SupportedModes 列表中某个 ModeOptionStruct 的 Mode 字段。
    设备收到后返回 ChangeToModeResponse。注意需要向正确的 Endpoint 发送命令 -- 冷藏室和冷冻室是独立的。
  </p>

  <h4>请求参数</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须存在于该 Endpoint 的 SupportedModes 列表中</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>响应字段（ChangeToModeResponse）</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>操作结果状态码（见<a href="#status-codes">状态码</a>）</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string（可选）</td>
          <td>人类可读的状态描述，失败时提供原因</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上对冷冻室启用「急速冷冻」模式，App 向冷冻室 Endpoint 发送 ChangeToMode（NewMode = 1）。
        冰箱返回 ChangeToModeResponse（Status = 0x00, Success），该 Endpoint 的 CurrentMode 更新为 1。
        如果冰箱当前状态不允许切换（例如正在除霜），会返回 GenericFailure 并在 StatusText 中说明原因。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>RefrigeratorAndTemperatureControlledCabinetMode Cluster 继承 ModeBase 的 4 个属性。每个 Endpoint 各自维护一份。</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>该温区支持的所有工作模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前选中的模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>设备启动时的默认模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>设备开机时自动切换到的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性逐个说明 -->
  <h3 id="attr-0x0000">SupportedModes -- 支持的模式列表（0x0000）</h3>
  <p>
    该 Endpoint（温区）支持的全部工作模式，每个元素是一个 ModeOptionStruct：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式名称，供人类阅读（如 "Normal"、"Rapid Cool"）</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表中唯一，用于 ChangeToMode 命令</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>语义标签列表，描述模式的用途（见<a href="#mode-tags">ModeTag 标签</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">不同 Endpoint 的 SupportedModes 可能不同</div>
    <p>
      冷藏室 Endpoint 可能支持 RapidCool 模式，而冷冻室 Endpoint 支持 RapidFreeze 模式。
      App 应分别读取每个 Endpoint 的 SupportedModes，独立展示各温区的可用模式列表。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode -- 当前模式（0x0001）</h3>
  <p>
    当前选中的工作模式编号。值必须是 SupportedModes 中某个 ModeOptionStruct 的 Mode 字段。
    通过 ChangeToMode 命令修改。可订阅此属性获取模式变更通知。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">StartUpMode -- 启动模式（0x0002）</h3>
  <p>
    设备上电或重启后的初始模式。Nullable -- 值为 <code>null</code> 时表示保持上次断电前的模式。
    设置具体值时，该值必须存在于 SupportedModes 列表中。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">冰箱场景下的建议</div>
    <p>
      冰箱断电恢复后，通常应回到普通模式而非继续急速制冷/冷冻。
      建议将 StartUpMode 设为普通模式的编号（如 0），避免断电恢复后压缩机长时间高功率运行。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode -- 开机模式（0x0003）</h3>
  <p>
    当设备从 Off 切换到 On 时自动应用的模式。Nullable -- 值为 <code>null</code> 时不覆盖，保持 CurrentMode 不变。
    如果 OnMode 有值，每次开机都会将 CurrentMode 强制设为该值，忽略 StartUpMode 的设置。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">OnMode 与 StartUpMode 的优先级</div>
    <p>
      如果 OnMode 不为 null，它的优先级高于 StartUpMode。
      设备上电流程：先应用 StartUpMode（如果有），再在 Off &rarr; On 时应用 OnMode 覆盖。
      实际效果是开机后始终使用 OnMode 指定的模式。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">DEPONOFF 特性与 OnMode</div>
    <p>
      OnMode 属性仅在设备支持 DEPONOFF 特性时才存在。
      该特性表示此 Cluster 依赖同一 Endpoint 上的 OnOff Cluster，
      当 OnOff 状态从 Off 变为 On 时，会自动将 CurrentMode 设为 OnMode 指定的值。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== ModeTag 语义标签 ====== -->
  <h2 id="mode-tags">ModeTag 语义标签</h2>
  <p>
    RefrigeratorAndTemperatureControlledCabinetMode 定义了 2 个专属 ModeTag 值，用于标准化描述冰箱工作模式。
    App 应根据这些标签识别模式用途，而不是依赖厂商自定义的 Label 文字。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">RapidCool</span>
        <span class="enum-desc">急速制冷 -- 快速降低冷藏室温度，适合大量食材刚放入时使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">RapidFreeze</span>
        <span class="enum-desc">急速冷冻 -- 快速将冷冻室降至极低温度，适合快速冻结新鲜食材</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">ModeTag 与 Endpoint 的对应关系</div>
    <p>
      通常 RapidCool 出现在冷藏室 Endpoint 的 SupportedModes 中，
      RapidFreeze 出现在冷冻室 Endpoint 的 SupportedModes 中。
      但规范并不强制这种对应关系 -- 某些高端冰箱可能在同一温区同时支持两种标签。
      App 应始终以实际读取到的 SupportedModes 为准。
    </p>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">状态码（StatusCode）</h2>
  <p>ChangeToModeResponse 中 Status 字段的可能取值：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">模式切换成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">请求的模式编号不存在于 SupportedModes 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">通用失败 -- 设备当前状态不允许切换（如正在除霜）</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>RefrigeratorAndTemperatureControlledCabinetMode Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的特性：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DEPONOFF（OnOff 依赖）</span>
        <span class="enum-desc">Cluster 依赖同一 Endpoint 上的 OnOff Cluster，支持通过 OnMode 属性在开机时自动切换模式</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">DEPONOFF 的实际意义</div>
    <p>
      大多数冰箱不会频繁开关机，因此 DEPONOFF 特性在冰箱场景下使用较少。
      但如果冰箱的温区可以独立开关（例如变温室可在冷藏/冷冻/关闭之间切换），
      启用 DEPONOFF 后可通过 OnMode 属性在温区重新开启时自动恢复到指定模式。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台双温区冰箱的两个 Endpoint 分别读取到的 Cluster 数据：</p>

  <h3>冷藏室 Endpoint</h3>
  <pre><code>{
  // --- 冷藏室 Endpoint 的模式列表 ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": []              // 普通模式，无特殊标签
    },
    {
      "Label": "Rapid Cool",
      "Mode": 1,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = RapidCool
    }
  ],

  // --- 当前模式 ---
  "0x0001": 0,                   // CurrentMode = 0（Normal）

  // --- 启动与开机模式 ---
  "0x0002": null,                // StartUpMode = null（保持上次模式）
  "0x0003": null                 // OnMode = null（不覆盖，保持 CurrentMode）
}</code></pre>

  <h3>冷冻室 Endpoint</h3>
  <pre><code>{
  // --- 冷冻室 Endpoint 的模式列表 ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": []
    },
    {
      "Label": "Rapid Freeze",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = RapidFreeze
    }
  ],

  // --- 当前模式 ---
  "0x0001": 1,                   // CurrentMode = 1（Rapid Freeze 急冻中）

  // --- 启动与开机模式 ---
  "0x0002": 0,                   // StartUpMode = 0（上电后恢复普通模式）
  "0x0003": null                 // OnMode = null（不覆盖）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      同一台冰箱的不同 Endpoint 上，SupportedModes 的内容和编号可以完全不同。
      App 展示模式列表时应针对每个 Endpoint 独立读取 SupportedModes，不要假设各温区的模式列表相同。
      使用 ModeTag 值判断模式类型，而不是比较 Label 字符串或 Mode 编号。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-rapid-cool">场景 1：大量食材入库后启用急速制冷</h3>
  <details class="scenario">
    <summary>操作步骤与说明</summary>
    <div class="scenario-content">
      <p><strong>场景</strong>：用户采购大量食材回家，需要快速降低冷藏室温度以保持食材新鲜。</p>
      <ol>
        <li>通过 Descriptor Cluster 确认冰箱的 Endpoint 结构，找到冷藏室对应的 Endpoint</li>
        <li>读取冷藏室 Endpoint 的 <code>SupportedModes (0x0000)</code>，找到带有 RapidCool（0x4000）ModeTag 的模式条目</li>
        <li>发送 <code>ChangeToMode (0x00)</code>，NewMode 填入 RapidCool 模式的 Mode 编号</li>
        <li>检查 ChangeToModeResponse 的 Status 是否为 Success</li>
        <li>订阅 <code>CurrentMode (0x0001)</code>，在用户界面显示当前处于急速制冷状态</li>
        <li>急速制冷结束后（设备自动或用户手动），再次发送 ChangeToMode 切回普通模式</li>
      </ol>
      <p>
        <strong>注意</strong>：部分冰箱会在急速制冷达到目标温度后自动回退到普通模式，
        App 应通过订阅 CurrentMode 感知这种自动切换，及时更新界面状态。
      </p>
    </div>
  </details>

  <h3 id="scenario-multi-endpoint">场景 2：多温区独立控制</h3>
  <details class="scenario">
    <summary>操作步骤与说明</summary>
    <div class="scenario-content">
      <p><strong>场景</strong>：用户想对冷冻室启用急速冷冻，同时保持冷藏室的普通模式不变。</p>
      <ol>
        <li>读取设备的 Descriptor Cluster（Endpoint 0），获取所有 Endpoint 及其 Device Type</li>
        <li>识别冷藏室 Endpoint（Device Type: Refrigerator，0x0070）和冷冻室 Endpoint（Device Type: Temperature Controlled Cabinet，0x0071）</li>
        <li>分别读取两个 Endpoint 的 <code>SupportedModes (0x0000)</code>：
          <ul>
            <li>冷藏室：可能包含 Normal 和 RapidCool</li>
            <li>冷冻室：可能包含 Normal 和 RapidFreeze</li>
          </ul>
        </li>
        <li>向冷冻室 Endpoint 发送 <code>ChangeToMode</code>，切换到 RapidFreeze 模式</li>
        <li>冷藏室不做操作，保持当前模式</li>
        <li>App 界面上分区展示两个温区的当前模式，各自独立控制</li>
      </ol>
      <p>
        <strong>关键点</strong>：冷藏室和冷冻室的 Cluster 实例是完全独立的，
        对一个 Endpoint 的操作不会影响另一个。App 设计时应体现这种分区控制的概念。
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
  },
  'microwave-oven-mode': {
    title: '微波炉模式 Cluster · MicrowaveOvenMode（0x005E）',
    description: 'Matter MicrowaveOvenMode Cluster（0x005E）完整参考 — 基于 ModeBase 派生，支持 Normal/Defrost 模式选择，ChangeToMode 命令、ModeTag 语义标签及与 MicrowaveOvenControl 的协作关系。',
    prev: undefined,
    next: undefined,
    content: `<h1>微波炉模式 Cluster（MicrowaveOvenMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005E</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 微波炉功能端点（Microwave Oven Endpoint）
  </p>
  <p>
    MicrowaveOvenMode 是 Matter 中用于微波炉模式选择的 Cluster，派生自 ModeBase Cluster。
    它允许用户在微波炉支持的多种加热模式之间切换，例如常规加热和解冻。
    每种模式通过语义标签（ModeTag）描述其用途，使不同厂商的微波炉能以统一方式被控制。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">派生自 ModeBase</div>
    <p>
      MicrowaveOvenMode 继承了 ModeBase Cluster 的全部命令和属性结构，
      并定义了微波炉专属的 ModeTag 值（0x4000 ~ 0x4001）。
      如果你已经熟悉 ModeBase 的工作方式，这个 Cluster 的使用方式完全一致，只是模式标签不同。
    </p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">与 MicrowaveOvenControl 协作</div>
    <p>
      MicrowaveOvenMode 只负责「选择加热模式」，不控制具体的烹饪参数。
      微波炉的完整操作需要配合 <strong>MicrowaveOvenControl（0x005F）</strong> Cluster，
      后者负责设置烹饪时间、功率等级、启动/停止加热等。
      典型流程是：先用 MicrowaveOvenMode 选择模式，再用 MicrowaveOvenControl 设置参数并启动。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令列表</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性详解</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">ModeTag 标签</a>
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
    MicrowaveOvenMode Cluster 只有一个命令 ChangeToMode，用于切换加热模式。
    命令执行后设备返回 ChangeToModeResponse，告知切换是否成功。
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
          <td>ChangeToMode</td>
          <td>Client &rarr; Server</td>
          <td>切换到指定加热模式</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeToModeResponse</td>
          <td>Server &rarr; Client</td>
          <td>切换结果响应（Status + StatusText）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ChangeToMode -- 切换模式（0x00）</h3>
  <p>
    请求微波炉切换到指定的加热模式。NewMode 的值必须是 SupportedModes 列表中某个 ModeOptionStruct 的 Mode 字段。
    设备收到后返回 ChangeToModeResponse。
  </p>

  <h4>请求参数</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须存在于 SupportedModes 列表中</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>响应字段（ChangeToModeResponse）</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>enum8</td>
          <td>操作结果状态码（见<a href="#status-codes">状态码</a>）</td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string（可选）</td>
          <td>人类可读的状态描述，失败时提供原因</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上选择「解冻」模式，App 发送 ChangeToMode（NewMode = 1）。
        微波炉返回 ChangeToModeResponse（Status = 0x00, Success），CurrentMode 更新为 1。
        如果微波炉正在加热中不允许切换，会返回 GenericFailure 并在 StatusText 中说明原因。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>MicrowaveOvenMode Cluster 继承 ModeBase 的 4 个属性。</p>

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
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备支持的所有加热模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前选中的模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>StartUpMode</td>
          <td>uint8 / null</td>
          <td>设备启动时的默认模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>设备开机时自动切换到的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性逐个说明 -->
  <h3 id="attr-0x0000">SupportedModes -- 支持的模式列表（0x0000）</h3>
  <p>
    设备支持的全部加热模式，每个元素是一个 ModeOptionStruct：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式名称，供人类阅读（如 "Normal"、"Defrost"）</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表中唯一，用于 ChangeToMode 命令</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>语义标签列表，描述模式的用途（见<a href="#mode-tags">ModeTag 标签</a>）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Label 与 ModeTag 的区别</div>
    <p>
      Label 是厂商自定义的显示文字，不同厂商可能用不同措辞（"Normal"、"Standard"、"Regular"）。
      ModeTag 是标准化的语义标签，App 应优先根据 ModeTag 值判断模式类型，Label 仅用于界面展示。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode -- 当前模式（0x0001）</h3>
  <p>
    当前选中的加热模式编号。值必须是 SupportedModes 中某个 ModeOptionStruct 的 Mode 字段。
    通过 ChangeToMode 命令修改。可订阅此属性获取模式变更通知。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0002">StartUpMode -- 启动模式（0x0002）</h3>
  <p>
    设备上电或重启后的初始模式。Nullable -- 值为 <code>null</code> 时表示保持上次断电前的模式。
    设置具体值时，该值必须存在于 SupportedModes 列表中。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode -- 开机模式（0x0003）</h3>
  <p>
    当设备从 Off 切换到 On 时自动应用的模式。Nullable -- 值为 <code>null</code> 时不覆盖，保持 CurrentMode 不变。
    如果 OnMode 有值，每次开机都会将 CurrentMode 强制设为该值，忽略 StartUpMode 的设置。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">OnMode 与 StartUpMode 的优先级</div>
    <p>
      如果 OnMode 不为 null，它的优先级高于 StartUpMode。
      设备上电流程：先应用 StartUpMode（如果有），再在 Off &rarr; On 时应用 OnMode 覆盖。
      实际效果是开机后始终使用 OnMode 指定的模式。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== ModeTag 语义标签 ====== -->
  <h2 id="mode-tags">ModeTag 语义标签</h2>
  <p>
    MicrowaveOvenMode 定义了 2 个专属 ModeTag 值，用于标准化描述微波炉加热模式的类型。
    App 应根据这些标签识别模式用途，而不是依赖厂商自定义的 Label 文字。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">常规加热 -- 日常食物加热的默认模式，按设定功率持续加热</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Defrost</span>
        <span class="enum-desc">解冻 -- 以较低功率间歇加热，用于解冻冷冻食品而不过度烹饪</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">厂商可扩展自定义模式</div>
    <p>
      除了规范定义的 Normal 和 Defrost，厂商可以在 SupportedModes 中添加额外的自定义模式
      （如 "Popcorn"、"Beverage"、"Reheat" 等），使用厂商自定义的 ModeTag 值（0x8000 ~ 0xBFFF 范围）。
      App 遇到不认识的 ModeTag 时，应回退到显示 Label 文字。
    </p>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">状态码（StatusCode）</h2>
  <p>ChangeToModeResponse 中 Status 字段的可能取值：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">模式切换成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">请求的模式编号不存在于 SupportedModes 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">通用失败 -- 设备当前状态不允许切换（如正在加热中）</span>
      </div>
    </div>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持常规加热和解冻两种模式、当前处于常规加热的微波炉的 MicrowaveOvenMode Cluster 读取结果：</p>

  <pre><code>{
  // --- 支持的模式列表 ---
  "0x0000": [                    // SupportedModes
    {
      "Label": "Normal",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]   // 0x4000 = Normal
    },
    {
      "Label": "Defrost",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]   // 0x4001 = Defrost
    }
  ],

  // --- 当前模式 ---
  "0x0001": 0,                   // CurrentMode = 0（Normal）

  // --- 启动与开机模式 ---
  "0x0002": null,                // StartUpMode = null（保持上次模式）
  "0x0003": null                 // OnMode = null（不覆盖，保持 CurrentMode）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      SupportedModes 的内容由设备厂商定义，不同微波炉支持的模式数量和编号可能不同。
      App 展示模式列表时应动态读取 SupportedModes，不要硬编码模式选项。
      使用 ModeTag 值判断模式类型，而不是比较 Label 字符串。
      完整的微波炉控制还需要读取 MicrowaveOvenControl Cluster（0x005F）的烹饪时间和功率属性。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：选择加热模式并启动微波炉</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>SupportedModes (0x0000)</code> 获取微波炉支持的所有加热模式</li>
        <li>在 App 界面展示模式列表，根据 ModeTag 值显示对应图标和说明（如 0x4000 显示「常规加热」图标，0x4001 显示「解冻」图标）</li>
        <li>用户选择「解冻」，发送 <code>ChangeToMode (0x00)</code>，NewMode 填入对应的 Mode 编号</li>
        <li>检查 ChangeToModeResponse 的 Status：
          <ul>
            <li><code>0x00</code>（Success）-- 切换成功，订阅 CurrentMode 确认更新</li>
            <li><code>0x02</code>（GenericFailure）-- 微波炉正在加热中，读取 StatusText 展示原因</li>
          </ul>
        </li>
        <li>模式选定后，通过 MicrowaveOvenControl Cluster（0x005F）设置烹饪时间和功率，然后启动加热</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：解冻冷冻食品的完整流程</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>SupportedModes (0x0000)</code>，找到带有 ModeTag 0x4001（Defrost）的模式项</li>
        <li>发送 <code>ChangeToMode</code>，将 NewMode 设为该模式项的 Mode 编号</li>
        <li>确认 ChangeToModeResponse 返回 Success</li>
        <li>通过 MicrowaveOvenControl 设置解冻时间（解冻模式通常使用较低功率，设备可能自动调整功率等级）</li>
        <li>启动加热，订阅 MicrowaveOvenControl 的 OperationalState 跟踪加热进度</li>
        <li>加热完成后，微波炉自动停止并发出通知，App 提示用户取出食物</li>
      </ol>
      <p>
        <strong>注意</strong>：解冻模式下微波炉通常以间歇方式工作（加热一段时间、暂停一段时间），
        避免外层过度加热而内层仍是冰冻状态。具体的功率和间歇策略由设备固件控制，App 无需干预。
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
  'microwave-oven-control': {
    title: '微波炉控制 Cluster · MicrowaveOvenControl（0x005F）',
    description: 'Matter MicrowaveOvenControl Cluster（0x005F）完整参考 — SetCookingParameters 命令、CookTime/PowerSetting/SupportedWatts 等属性定义、PWRNUM/WATTS/PWRLMTS 特性位与枚举值速查。',
    prev: { title: 'Cluster 手册', slug: 'clusters' },
    next: undefined,
    content: `<h1>微波炉控制 Cluster（MicrowaveOvenControl）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x005F</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 微波炉功能端点（Microwave Oven Endpoint）
  </p>
  <p>
    MicrowaveOvenControl 是 Matter 厨电设备中微波炉的核心控制 Cluster，负责管理烹饪时间、功率等级和瓦数设定。
    它不负责启动/停止烹饪（由 OperationalState Cluster 处理），也不负责模式选择（由 MicrowaveOvenMode Cluster 处理），
    专注于「烹饪参数」这一件事。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">三个 Cluster 协同工作</div>
    <p>
      微波炉设备通常需要三个 Cluster 配合：<br/>
      <strong>MicrowaveOvenMode</strong>（0x005E）—— 选择烹饪模式（如普通加热、解冻、预设菜单等）<br/>
      <strong>MicrowaveOvenControl</strong>（0x005F）—— 设置烹饪参数（时间、功率、瓦数）<br/>
      <strong>OperationalState</strong>（0x0060）—— 控制烹饪流程（开始、暂停、停止）<br/>
      典型流程：先选模式 → 再设参数 → 最后启动烹饪。
    </p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">功率表示方式由 Feature 决定</div>
    <p>
      微波炉的功率有两种表示方式：<strong>数值百分比</strong>（PWRNUM 特性，如 80%）和<strong>瓦数等级</strong>（WATTS 特性，如 900W）。
      设备至少支持其中一种。读写功率属性前，务必先检查 FeatureMap 确定设备使用哪种方式，否则会读到不支持的属性。
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
    MicrowaveOvenControl Cluster 只有一个命令 —— <code>SetCookingParameters</code>。
    它是设置烹饪参数的唯一入口，所有参数（时间、功率、瓦数）都通过这一个命令设置。
    注意：这个命令只设置参数，不会启动烹饪。启动烹饪需要调用 OperationalState Cluster 的 Start 命令。
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
          <td>SetCookingParameters</td>
          <td>设置烹饪参数（时间、功率、瓦数）</td>
          <td class="col-optional">无</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">SetCookingParameters —— 设置烹饪参数（0x00）</h3>
  <p>
    设置微波炉的烹饪参数。所有参数都是可选的 —— 只传需要修改的字段即可，未传的参数保持当前值不变。
    设备处于非运行状态时可以设置参数；某些设备也允许在运行中修改（取决于具体实现）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>必填</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CookMode</td>
          <td>uint8</td>
          <td>否</td>
          <td>烹饪模式编号，对应 MicrowaveOvenMode Cluster 中定义的模式值</td>
        </tr>
        <tr>
          <td>CookTime</td>
          <td>uint32</td>
          <td>否</td>
          <td>烹饪时间，单位秒。范围 <code>1</code> ~ <code>MaxCookTime</code></td>
        </tr>
        <tr>
          <td>PowerSetting</td>
          <td>uint8</td>
          <td>否</td>
          <td>功率等级数值。范围 <code>MinPower</code> ~ <code>MaxPower</code>，步长为 <code>PowerStep</code>。<strong>需要 PWRNUM 特性</strong></td>
        </tr>
        <tr>
          <td>WattSettingIndex</td>
          <td>uint8</td>
          <td>否</td>
          <td><code>SupportedWatts</code> 列表的索引（从 0 开始）。<strong>需要 WATTS 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">PowerSetting 与 WattSettingIndex 互斥</div>
    <p>
      一次调用中只能传 <code>PowerSetting</code> 或 <code>WattSettingIndex</code> 之一，不能同时传。
      传哪个取决于设备支持的 Feature：支持 PWRNUM 用 PowerSetting，支持 WATTS 用 WattSettingIndex。
      同时传两个会返回 <code>INVALID_COMMAND</code>。
    </p>
  </div>

  <h4>使用示例：按功率百分比设置（PWRNUM）</h4>
  <pre><code>{
  "CookTime": 180,          // 烹饪 3 分钟
  "PowerSetting": 70        // 功率 70%
}</code></pre>

  <h4>使用示例：按瓦数等级设置（WATTS）</h4>
  <pre><code>{
  "CookTime": 300,          // 烹饪 5 分钟
  "WattSettingIndex": 3     // 选择 SupportedWatts[3] 对应的瓦数
}</code></pre>

  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上选择「加热 3 分钟、中高火」时，App 发送 <code>SetCookingParameters(CookTime=180, PowerSetting=70)</code>。
        参数设好后，再调用 OperationalState 的 <code>Start</code> 命令启动烹饪。
        如果需要在烹饪中途加时间（如「再加 1 分钟」），可以在运行状态下再次调用此命令更新 CookTime。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    MicrowaveOvenControl 的属性按功能分为三组：烹饪时间、功率数值、瓦数等级。
    后两组分别由 PWRNUM 和 WATTS Feature 门控。
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
        </tr>
      </thead>
      <tbody>
        <!-- 烹饪时间 -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CookTime</td>
          <td>uint32</td>
          <td><a href="#group-time">烹饪时间</a></td>
          <td>当前设定的烹饪时间（秒）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>MaxCookTime</td>
          <td>uint32</td>
          <td><a href="#group-time">烹饪时间</a></td>
          <td>允许的最大烹饪时间（秒）</td>
        </tr>
        <!-- 功率数值 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>PowerSetting</td>
          <td>uint8</td>
          <td><a href="#group-power">功率数值</a></td>
          <td>当前功率等级</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>MinPower</td>
          <td>uint8</td>
          <td><a href="#group-power">功率数值</a></td>
          <td>最低可设功率</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>MaxPower</td>
          <td>uint8</td>
          <td><a href="#group-power">功率数值</a></td>
          <td>最高可设功率</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>PowerStep</td>
          <td>uint8</td>
          <td><a href="#group-power">功率数值</a></td>
          <td>功率调节步长</td>
        </tr>
        <!-- 瓦数等级 -->
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>SupportedWatts</td>
          <td>list[uint16]</td>
          <td><a href="#group-watts">瓦数等级</a></td>
          <td>设备支持的瓦数列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>SelectedWattIndex</td>
          <td>uint8</td>
          <td><a href="#group-watts">瓦数等级</a></td>
          <td>当前选中的瓦数索引</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>WattRating</td>
          <td>uint16</td>
          <td><a href="#group-watts">瓦数等级</a></td>
          <td>当前瓦数额定值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 烹饪时间（0x0001, 0x0002）====== -->
  <h3 id="group-time">烹饪时间（0x0001, 0x0002）</h3>
  <p>烹饪时间是所有微波炉都支持的基础属性，不需要特殊 Feature 门控。</p>

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
          <td>CookTime<br/><span class="attr-cn">烹饪时间</span></td>
          <td>uint32</td>
          <td>当前设定的烹饪时间，单位秒。默认值 <code>30</code>（30 秒）。烹饪过程中此值会倒计时递减，实时反映剩余时间。范围 <code>1</code> ~ <code>MaxCookTime</code></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>MaxCookTime<br/><span class="attr-cn">最大烹饪时间</span></td>
          <td>uint32</td>
          <td>设备允许的最大烹饪时间，单位秒，只读。用于 App 端校验用户输入和限制时间选择器的上限。典型值如 <code>5400</code>（90 分钟）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">时间单位是秒，不是分钟</div>
    <p>
      与日常使用习惯不同，<code>CookTime</code> 的单位是<strong>秒</strong>。
      App 展示时需要转换为分:秒格式（如 <code>120</code> 秒 → <code>2:00</code>）。
      用户输入「3 分钟」时需要转换为 <code>180</code> 再写入。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 功率数值（0x0003 ~ 0x0006）====== -->
  <h3 id="group-power">功率数值（0x0003 ~ 0x0006）</h3>
  <p>
    用数值表示功率等级的一组属性。这组属性需要 <strong>PWRNUM</strong> 特性支持。
    无 PWRNUM 特性时，<code>PowerSetting</code> 仍然存在但默认值固定为 <code>100</code>（满功率），不可修改。
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
          <td>PowerSetting<br/><span class="attr-cn">功率设置</span></td>
          <td>uint8</td>
          <td>当前功率等级。无 PWRNUM 时固定为 <code>100</code>；有 PWRNUM 时范围为 <code>MinPower</code> ~ <code>MaxPower</code>，步长 <code>PowerStep</code>。默认值 <code>100</code>（满功率）</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>MinPower<br/><span class="attr-cn">最低功率</span></td>
          <td>uint8</td>
          <td>设备支持的最低功率值。默认 <code>10</code>。<strong>需要 PWRLMTS 特性</strong>（无 PWRLMTS 时固定为 10）</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>MaxPower<br/><span class="attr-cn">最高功率</span></td>
          <td>uint8</td>
          <td>设备支持的最高功率值。默认 <code>100</code>。<strong>需要 PWRLMTS 特性</strong>（无 PWRLMTS 时固定为 100）</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>PowerStep<br/><span class="attr-cn">功率步长</span></td>
          <td>uint8</td>
          <td>功率调节的步进值。默认 <code>10</code>。例如步长为 10 时，功率只能是 10、20、30...100。<strong>需要 PWRLMTS 特性</strong>（无 PWRLMTS 时固定为 10）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">PWRNUM 与 PWRLMTS 的关系</div>
    <p>
      <strong>PWRNUM</strong> 启用功率数值调节能力 —— 没有它，功率只能是满功率 100。<br/>
      <strong>PWRLMTS</strong> 是 PWRNUM 的扩展，允许自定义 Min/Max/Step 三个限制参数。
      PWRLMTS 必须和 PWRNUM 一起启用（不能单独启用 PWRLMTS）。
      如果只有 PWRNUM 没有 PWRLMTS，则使用默认限制：Min=10, Max=100, Step=10。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 瓦数等级（0x0007 ~ 0x0009）====== -->
  <h3 id="group-watts">瓦数等级（0x0007 ~ 0x0009）</h3>
  <p>
    用实际瓦数表示功率的一组属性。这组属性需要 <strong>WATTS</strong> 特性支持。
    与 PWRNUM 的百分比方式不同，WATTS 用离散的瓦数列表让用户选择。
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
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>SupportedWatts<br/><span class="attr-cn">支持的瓦数列表</span></td>
          <td>list[uint16]</td>
          <td>设备支持的所有瓦数等级列表，升序排列。例如 <code>[100, 300, 500, 700, 900, 1100]</code>。只读</td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>SelectedWattIndex<br/><span class="attr-cn">选中的瓦数索引</span></td>
          <td>uint8</td>
          <td>当前选中的瓦数在 <code>SupportedWatts</code> 列表中的索引（从 0 开始）。通过 <code>SetCookingParameters</code> 的 WattSettingIndex 参数修改</td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>WattRating<br/><span class="attr-cn">瓦数额定值</span></td>
          <td>uint16</td>
          <td>微波炉的额定功率（瓦），只读。这是设备的标称最大瓦数，通常等于 <code>SupportedWatts</code> 列表中的最大值</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">用索引而非瓦数值设置功率</div>
    <p>
      设置瓦数时使用的是 <code>SupportedWatts</code> 的<strong>索引</strong>（WattSettingIndex），不是瓦数值本身。
      例如 <code>SupportedWatts = [100, 300, 500, 700, 900, 1100]</code>，要设置 700W 需要传 <code>WattSettingIndex = 3</code>。
      App 端应先读取 SupportedWatts 列表，展示为可选项（如「低火 100W」「中火 500W」「高火 1100W」），用户选择后传对应索引。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature 位图</h2>
  <p>MicrowaveOvenControl Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些功率控制方式：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">PWRNUM（PowerAsNumber）</span>
        <span class="enum-desc">功率以数值表示 —— 启用 PowerSetting 的读写（10~100 范围）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">WATTS（WattRating）</span>
        <span class="enum-desc">功率以瓦数表示 —— 启用 SupportedWatts 列表和 WattSettingIndex 选择</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">PWRLMTS（PowerNumberLimits）</span>
        <span class="enum-desc">自定义功率限制 —— 启用 MinPower、MaxPower、PowerStep 属性（需同时启用 PWRNUM）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature 组合约束</div>
    <p>
      <strong>PWRNUM 和 WATTS 互斥</strong> —— 设备只能选择一种功率表示方式，不能同时支持两种。<br/>
      <strong>PWRLMTS 依赖 PWRNUM</strong> —— 启用 PWRLMTS 时必须同时启用 PWRNUM。<br/>
      常见组合：无 Feature（仅时间控制）、PWRNUM（百分比功率）、PWRNUM + PWRLMTS（自定义范围的百分比功率）、WATTS（瓦数等级选择）。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一个同时支持 PWRNUM 和 WATTS 特性的微波炉设备的属性读取结果（实际设备只会支持其中一种功率方式，此处为展示完整属性）：</p>

  <pre><code>{
  // --- 烹饪时间 ---
  "0x0001": 120,            // CookTime = 120 秒（当前设定烹饪 2 分钟）
  "0x0002": 5400,           // MaxCookTime = 5400 秒（最大可设 90 分钟）

  // --- 功率设置（PWRNUM 特性）---
  "0x0003": 80,             // PowerSetting = 80（当前功率 80%）
  "0x0004": 10,             // MinPower = 10（最低功率 10%）
  "0x0005": 100,            // MaxPower = 100（最高功率 100%）
  "0x0006": 10,             // PowerStep = 10（功率调节步长 10%）

  // --- 瓦数设置（WATTS 特性）---
  "0x0007": [100, 300, 500, 700, 900, 1100],  // SupportedWatts（支持的瓦数列表）
  "0x0008": 4,              // SelectedWattIndex = 4 → 对应 900W
  "0x0009": 900             // WattRating = 900（当前瓦数额定值）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      App 展示功率时，先检查 <code>FeatureMap</code>：<br/>
      &bull; 有 PWRNUM → 展示为百分比滑块或档位选择器（10% / 20% / ... / 100%）<br/>
      &bull; 有 WATTS → 读取 <code>SupportedWatts</code> 列表，展示为瓦数选项（100W / 300W / 500W ...）<br/>
      &bull; 两者都没有 → 设备只支持满功率，不需要展示功率控制 UI
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <details class="scenario">
    <summary>场景 1：App 设置烹饪参数并启动加热</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>MaxCookTime (0x0002)</code> 确定时间上限，用于限制时间选择器范围</li>
        <li>读取 <code>FeatureMap (0xFFFC)</code> 判断功率控制方式：
          <ul>
            <li>PWRNUM → 读取 <code>MinPower (0x0004)</code>、<code>MaxPower (0x0005)</code>、<code>PowerStep (0x0006)</code> 构建功率选择器</li>
            <li>WATTS → 读取 <code>SupportedWatts (0x0007)</code> 列表，展示可选瓦数</li>
          </ul>
        </li>
        <li>用户选好时间和功率后，发送 <code>SetCookingParameters (0x00)</code> 写入参数</li>
        <li>调用 OperationalState Cluster 的 <code>Start</code> 命令启动烹饪</li>
        <li>订阅 <code>CookTime (0x0001)</code> 属性变化，实时更新倒计时显示</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：烹饪中途调整时间或功率</summary>
    <div class="scenario-content">
      <ol>
        <li>通过 OperationalState Cluster 读取当前状态，确认设备正在运行</li>
        <li>读取 <code>CookTime (0x0001)</code> 获取当前剩余时间</li>
        <li>用户点击「加 30 秒」→ 发送 <code>SetCookingParameters(CookTime=当前值+30)</code></li>
        <li>用户调低功率 → 发送 <code>SetCookingParameters(PowerSetting=50)</code> 或 <code>SetCookingParameters(WattSettingIndex=2)</code></li>
        <li>注意：能否在运行中修改参数取决于设备实现，部分设备可能要求先暂停再修改</li>
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
  'rvc-run-mode': {
    title: '扫地机运行模式 Cluster · RvcRunMode（0x0054）',
    description: 'Matter RvcRunMode Cluster（0x0054）完整参考 — 扫地机器人运行模式管理，ChangeToMode 命令、SupportedModes/CurrentMode/OnMode 属性、ModeTag 枚举、StatusCode 错误码及常见场景。',
    prev: { title: '操作状态（OperationalState）', slug: 'operational-state' },
    next: undefined,
    content: `<h1>扫地机运行模式 Cluster（RvcRunMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0054</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）&nbsp;|&nbsp;
    <strong>基类</strong>: ModeBase（0x0050）
  </p>
  <p>
    RvcRunMode 是 Matter 为<strong>扫地机器人（Robot Vacuum Cleaner）</strong>定义的运行模式 Cluster。
    它继承自 ModeBase，专门管理扫地机的高级运行状态 —— 空闲、清扫、建图。
    通过切换运行模式，用户可以控制扫地机是开始打扫、绘制地图还是返回待命。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">扫地机 Cluster 三件套</div>
    <p>
      Matter 为扫地机器人定义了三个协作 Cluster，各管一面：
    </p>
    <ul>
      <li><strong>RvcRunMode（本页）</strong>—— 高级运行状态：空闲 / 清扫 / 建图</li>
      <li><strong>RvcCleanMode</strong> —— 清扫强度：静音 / 标准 / 深度清洁</li>
      <li><strong>RvcOperationalState</strong> —— 实时运行状态：寻找充电座、充电中、卡住等</li>
    </ul>
    <p>
      典型流程：先通过 RvcCleanMode 设好清扫强度，再通过 RvcRunMode 切到清扫模式启动工作，
      运行过程中的实时状态（充电、卡住、回充）由 RvcOperationalState 上报。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">模式标签</a>
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
    RvcRunMode 继承自 ModeBase，只有一对命令：发送模式切换请求，设备返回执行结果。
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
        <tr class="clickable-row" data-href="#cmd-change-to-mode">
          <td><a href="#cmd-change-to-mode"><code>0x00</code></a></td>
          <td>ChangeToMode</td>
          <td>客户端 → 设备</td>
          <td>请求切换到指定运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-change-to-mode-response">
          <td><a href="#cmd-change-to-mode-response"><code>0x01</code></a></td>
          <td>ChangeToModeResponse</td>
          <td>设备 → 客户端</td>
          <td>返回模式切换的执行结果</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-change-to-mode">ChangeToMode —— 切换运行模式（0x00）</h3>
  <p>
    请求设备切换到指定的运行模式。模式编号必须是 <code>SupportedModes</code> 中定义的有效值。
    设备收到后会校验当前状态是否允许切换（例如正在充电时可能无法直接开始清扫），然后通过
    <a href="#cmd-change-to-mode-response">ChangeToModeResponse</a> 返回结果。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，必须是 SupportedModes 列表中某个模式的 Mode 字段值</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户在 App 上点击「开始清扫」，App 发送 ChangeToMode(NewMode=1) 将扫地机从空闲切换到清扫模式。
        如果扫地机电量过低或尘盒未安装，设备会在响应中返回对应的错误状态码。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-change-to-mode-response">ChangeToModeResponse —— 切换结果（0x01）</h3>
  <p>
    设备对 ChangeToMode 命令的响应。通过 Status 字段告知切换是否成功，失败时附带文字说明。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>uint8</td>
          <td>
            <code>0x00</code> = 成功；其他值为错误码（见<a href="#status-codes">状态码</a>章节）
          </td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string（可选）</td>
          <td>人类可读的状态描述，用于调试或展示给用户</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">通用错误码 vs 扫地机专属错误码</div>
    <p>
      Status 字段的值空间分为两段：<code>0x00–0x3F</code> 是 ModeBase 通用错误码（如 GenericFailure、InvalidInMode），
      <code>0x40–0x7F</code> 是<strong>扫地机专属</strong>的错误码（如卡住、尘盒缺失等）。
      App 端处理时需要覆盖两段。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    RvcRunMode 继承 ModeBase 的三个属性。注意：ModeBase 定义了 StartUpMode（0x0002），
    但<strong>扫地机不支持该属性</strong> —— 扫地机每次上电后的行为由 OnMode 决定。
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备支持的运行模式列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前运行模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>设备唤醒时自动进入的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性详细说明 -->
  <h3 id="attr-0x0000">SupportedModes —— 支持的模式列表（0x0000）</h3>
  <p>
    设备支持的全部运行模式。每个模式包含标签名称、模式编号和一组模式标签（ModeTag）。
    列表在设备整个生命周期中固定不变。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式的显示名称，如 "清扫"、"建图"</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表内唯一，作为 ChangeToMode 的参数</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>模式标签列表，标识该模式的语义（见<a href="#mode-tags">模式标签</a>章节）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode —— 当前模式（0x0001）</h3>
  <p>
    设备当前的运行模式编号，值必须是 SupportedModes 中某个模式的 Mode 字段。
    订阅此属性可以实时跟踪扫地机的运行状态变化。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">订阅推荐</div>
    <p>
      建议 App 通过 Subscribe 订阅 CurrentMode 的变化，而不是轮询。
      当扫地机完成清扫自动回到空闲模式、或因异常停止时，订阅能实时收到通知。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode —— 唤醒模式（0x0003）</h3>
  <p>
    设备从非活跃状态唤醒时自动进入的模式。值为 SupportedModes 中某个模式的 Mode 字段，
    或 <code>null</code> 表示不自动切换模式。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">没有 StartUpMode</div>
    <p>
      ModeBase 定义了 <code>StartUpMode（0x0002）</code> 属性，但 RvcRunMode <strong>明确排除了它</strong>。
      扫地机的上电行为仅由 OnMode 控制。如果你在读取属性时发现 0x0002 不存在，这是正常的。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 模式标签（ModeTag）====== -->
  <h2 id="mode-tags">模式标签（ModeTag）</h2>
  <p>
    每个运行模式通过 ModeTag 标识其语义。ModeTag 让不同厂商的扫地机能用不同的 Label 文字，
    但 App 仍然能通过标准化的 Tag 值识别出「这是清扫模式」还是「这是建图模式」。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">Idle（空闲）</span>
        <span class="enum-desc">扫地机处于待命状态，未执行任何任务</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">Cleaning（清扫）</span>
        <span class="enum-desc">扫地机正在执行清扫任务</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">Mapping（建图）</span>
        <span class="enum-desc">扫地机正在扫描环境、构建地图，不进行实际清扫</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ModeTag 的实际用法</div>
    <p>
      厂商 A 的清扫模式叫 "Auto Clean"（Mode=1），厂商 B 叫 "智能清扫"（Mode=3），
      但两者的 ModeTags 都包含 <code>0x4001 (Cleaning)</code>。
      App 判断模式语义时应看 ModeTag 而非 Label 或 Mode 编号。
    </p>
  </div>

  <!-- ====== 状态码（StatusCode）====== -->
  <h2 id="status-codes">状态码（StatusCode）</h2>
  <p>
    ChangeToModeResponse 的 Status 字段使用以下错误码。<code>0x00</code> 表示成功，
    <code>0x01–0x03</code> 是 ModeBase 通用错误码，<code>0x41–0x48</code> 是扫地机专属错误码。
  </p>

  <h3>通用状态码（ModeBase）</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">模式切换成功</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">请求的模式编号不在 SupportedModes 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">通用失败，无法归类到具体原因</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">InvalidInMode</span>
        <span class="enum-desc">当前模式下不允许切换到目标模式</span>
      </div>
    </div>
  </div>

  <h3>扫地机专属状态码</h3>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Stuck（卡住）</span>
        <span class="enum-desc">扫地机被障碍物卡住，无法移动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">DustBinMissing（尘盒缺失）</span>
        <span class="enum-desc">尘盒未安装到位，拒绝启动清扫</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">DustBinFull（尘盒已满）</span>
        <span class="enum-desc">尘盒已满，需要清理后才能继续</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">WaterTankEmpty（水箱空）</span>
        <span class="enum-desc">水箱无水，拖地功能无法启动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">WaterTankMissing（水箱缺失）</span>
        <span class="enum-desc">水箱未安装</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">WaterTankLidOpen（水箱盖未关）</span>
        <span class="enum-desc">水箱盖子未正确关闭</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">MopCleaningPadMissing（拖布缺失）</span>
        <span class="enum-desc">拖布 / 清洁垫未安装</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x48</span>
      <div>
        <span class="enum-name">BatteryLow（电量不足）</span>
        <span class="enum-desc">电池电量过低，无法启动任务，需要先充电</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">App 端错误处理建议</div>
    <p>
      这些状态码对应的都是<strong>用户可以自行解决的物理问题</strong>。
      App 收到错误码后应向用户展示明确的操作指引，例如「请清空尘盒后重试」「请安装水箱」，
      而不是显示通用的「操作失败」。StatusText 字段也可作为兜底的展示文案。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持三种运行模式的扫地机器人，当前正在清扫中的 RvcRunMode Cluster 读取结果：</p>

  <pre><code>{
  // --- 支持的运行模式 ---
  "0x0000": [                                    // SupportedModes（设备支持的模式列表）
    {
      "Label": "空闲",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]           // 0x4000 = Idle
    },
    {
      "Label": "清扫",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]           // 0x4001 = Cleaning
    },
    {
      "Label": "建图",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]           // 0x4002 = Mapping
    }
  ],

  // --- 当前状态 ---
  "0x0001": 1,              // CurrentMode = 1（当前正在清扫）
  "0x0003": 0               // OnMode = 0（设备唤醒后默认进入空闲模式）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">关于 ModeTag 的数值</div>
    <p>
      示例中 ModeTags 的 Value 使用十进制：<code>16384</code> = <code>0x4000</code>（Idle），
      <code>16385</code> = <code>0x4001</code>（Cleaning），<code>16386</code> = <code>0x4002</code>（Mapping）。
      实际协议传输中使用的是整数值，文档中常写十六进制是为了方便对照规范。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-start-cleaning">场景 1：启动清扫</h3>
  <ol>
    <li>读取 <code>SupportedModes（0x0000）</code>，找到 ModeTags 包含 <code>0x4001 (Cleaning)</code> 的模式，记下其 Mode 编号</li>
    <li>发送 <code>ChangeToMode（0x00）</code>，NewMode 设为上一步得到的编号</li>
    <li>检查 <code>ChangeToModeResponse</code> 的 Status：
      <ul>
        <li><code>0x00</code> —— 成功，扫地机开始清扫</li>
        <li><code>0x42</code> —— 尘盒未安装，提示用户装好尘盒</li>
        <li><code>0x43</code> —— 尘盒已满，提示用户清空</li>
        <li><code>0x48</code> —— 电量不足，提示用户先充电</li>
      </ul>
    </li>
    <li>订阅 <code>CurrentMode（0x0001）</code>，当值变回 Idle 对应的编号时，说明清扫完成</li>
  </ol>

  <h3 id="scenario-check-status">场景 2：查询当前状态并展示</h3>
  <ol>
    <li>读取 <code>SupportedModes（0x0000）</code> 获取完整模式列表</li>
    <li>读取 <code>CurrentMode（0x0001）</code> 获取当前模式编号</li>
    <li>在 SupportedModes 中找到匹配的模式，取其 Label 展示在 App 界面上（如「清扫中」）</li>
    <li>同时检查 ModeTags 中的 Tag 值，用标准化语义辅助 UI 展示：
      <ul>
        <li><code>0x4000 (Idle)</code> —— 显示待命图标</li>
        <li><code>0x4001 (Cleaning)</code> —— 显示清扫动画</li>
        <li><code>0x4002 (Mapping)</code> —— 显示地图扫描进度</li>
      </ul>
    </li>
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
</style>`,
  },
  'rvc-clean-mode': {
    title: '扫地机清洁模式 Cluster · RvcCleanMode（0x0055）',
    description: 'Matter RvcCleanMode Cluster（0x0055）完整参考 — 扫地机器人清洁强度模式，ChangeToMode 命令、SupportedModes / CurrentMode / OnMode 属性、DeepClean / VacuumOnly / MopOnly / VacuumAndMop 模式标签定义及枚举值速查。',
    prev: undefined,
    next: undefined,
    content: `<h1>扫地机清洁模式 Cluster（RvcCleanMode）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0055</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）
  </p>
  <p>
    RvcCleanMode 是扫地机器人（Robotic Vacuum Cleaner）的<strong>清洁强度模式</strong> Cluster，
    派生自 ModeBase（0x0049）。它定义了扫地机不同的清洁方式 —— 深度清洁、仅吸尘、仅拖地、吸拖一体等。
    与 <strong>RvcRunMode</strong>（0x0054，运行模式：清扫/映射/回充）搭配使用：RvcRunMode 决定「做什么任务」，
    RvcCleanMode 决定「用什么强度做」。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">ModeBase 派生 Cluster</div>
    <p>
      RvcCleanMode 继承 ModeBase 的全部命令和属性结构，但<strong>不支持</strong> <code>StartUpMode</code> 属性
      （规范明确禁止）。开机后的默认清洁模式由 <code>OnMode</code> 控制。
      模式标签（ModeTag）在 0x4000~0x4003 范围内定义了 RVC 专属的清洁类型。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性</a>
    <span class="nav-sep">|</span>
    <a href="#mode-tags">模式标签</a>
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
    RvcCleanMode 只有一个命令 <code>ChangeToMode</code>，继承自 ModeBase。
    设备收到后切换清洁模式，并通过 <code>ChangeToModeResponse</code> 返回执行结果。
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
          <td>ChangeToMode</td>
          <td>客户端 → 设备</td>
          <td>切换清洁模式</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ChangeToModeResponse</td>
          <td>设备 → 客户端</td>
          <td>模式切换结果</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ChangeToMode —— 切换模式（0x00）</h3>
  <p>
    请求设备切换到指定的清洁模式。<code>NewMode</code> 必须是
    <code>SupportedModes</code> 列表中存在的 Mode 值，否则设备会拒绝。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>参数</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>NewMode</td>
          <td>uint8</td>
          <td>目标模式编号，取自 SupportedModes 中的 Mode 字段</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">切换时机限制</div>
    <p>
      扫地机<strong>运行中</strong>时切换清洁模式，设备可能会拒绝并返回
      <code>InvalidInMode (0x03)</code>。部分设备只允许在空闲或回充状态下切换。
      建议先检查 RvcRunMode 的 CurrentMode，确认设备处于非活动状态再切换。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">ChangeToModeResponse —— 响应（0x01）</h3>
  <p>
    设备收到 ChangeToMode 后返回此响应，指示切换是否成功。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td>uint8</td>
          <td>状态码。<code>0x00 (Success)</code> 表示切换成功，其余见<a href="#status-codes">状态码</a></td>
        </tr>
        <tr>
          <td>StatusText</td>
          <td>string</td>
          <td>可选的说明文字，失败时提供更多信息</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    RvcCleanMode 继承 ModeBase 的三个属性。注意：ModeBase 定义的 <code>StartUpMode (0x0002)</code>
    在 RvcCleanMode 中<strong>被禁止</strong>，不会出现。
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>SupportedModes</td>
          <td>list&lt;ModeOptionStruct&gt;</td>
          <td>设备支持的所有清洁模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentMode</td>
          <td>uint8</td>
          <td>当前清洁模式</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OnMode</td>
          <td>uint8 / null</td>
          <td>开机后自动切换到的模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- 属性详解 -->
  <h3 id="attr-0x0000">SupportedModes —— 模式列表（0x0000）</h3>
  <p>
    设备支持的全部清洁模式列表。每个模式包含编号、标签和模式标签（ModeTag），
    ModeTag 用于标识该模式的清洁类型（如深度清洁、仅吸尘等）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段（ModeOptionStruct）</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Label</td>
          <td>string</td>
          <td>模式的可读名称，最长 64 字符，如「深度清洁」「仅吸尘」</td>
        </tr>
        <tr>
          <td>Mode</td>
          <td>uint8</td>
          <td>模式编号，在列表内唯一。ChangeToMode 命令的参数就是这个值</td>
        </tr>
        <tr>
          <td>ModeTags</td>
          <td>list&lt;ModeTagStruct&gt;</td>
          <td>模式标签列表，至少一个。详见<a href="#mode-tags">模式标签</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0001">CurrentMode —— 当前模式（0x0001）</h3>
  <p>
    设备当前的清洁模式编号，始终是 SupportedModes 中某个条目的 Mode 值。
    订阅此属性可以在模式切换时同步更新 App 界面。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x0003">OnMode —— 开机模式（0x0003）</h3>
  <p>
    设备开机后自动切换到的清洁模式。<strong>Nullable</strong> —— <code>null</code>
    表示开机后保持上次使用的模式。写入需要操作权限。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">OnMode vs StartUpMode</div>
    <p>
      ModeBase 规范中定义了 <code>StartUpMode (0x0002)</code>，但 RvcCleanMode
      <strong>明确禁止</strong>使用 StartUpMode。开机模式的控制统一通过 OnMode 完成。
      如果 OnMode 为 <code>null</code>，设备保持断电前的清洁模式。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 模式标签（ModeTag）====== -->
  <h2 id="mode-tags">模式标签（ModeTag）</h2>
  <p>
    RvcCleanMode 在 0x4000~0x4003 范围内定义了 4 个专属标签，用于标识清洁方式的语义。
    App 可以根据 ModeTag 展示对应的图标或分类，而不依赖 Label 字符串匹配。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x4000</span>
      <div>
        <span class="enum-name">DeepClean</span>
        <span class="enum-desc">深度清洁 —— 最大吸力 + 多次覆盖，适合重度脏污场景</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4001</span>
      <div>
        <span class="enum-name">VacuumOnly</span>
        <span class="enum-desc">仅吸尘 —— 只启动吸尘功能，不启用拖地模块</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4002</span>
      <div>
        <span class="enum-name">MopOnly</span>
        <span class="enum-desc">仅拖地 —— 只启用拖地模块，不启动吸尘</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4003</span>
      <div>
        <span class="enum-name">VacuumAndMop</span>
        <span class="enum-desc">吸拖一体 —— 同时吸尘和拖地（最常用的日常模式）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">ModeTag 与 ModeBase 通用标签</div>
    <p>
      除了上述 RVC 专属标签，每个模式还可以携带 ModeBase 定义的通用标签，
      如 <code>Auto (0x0000)</code>、<code>Quick (0x0001)</code>、<code>Quiet (0x0002)</code> 等。
      一个模式可以同时拥有多个标签 —— 例如「安静吸尘」可以标记为
      <code>VacuumOnly (0x4001)</code> + <code>Quiet (0x0002)</code>。
    </p>
  </div>

  <!-- ====== 状态码 ====== -->
  <h2 id="status-codes">状态码（StatusCode）</h2>
  <p>
    ChangeToModeResponse 中的 Status 字段使用以下状态码，与 RvcRunMode 共享同一套扩展定义。
  </p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">成功 —— 模式已切换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">UnsupportedMode</span>
        <span class="enum-desc">不支持的模式 —— NewMode 不在 SupportedModes 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">GenericFailure</span>
        <span class="enum-desc">通用失败 —— 未知原因导致无法切换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">InvalidInMode</span>
        <span class="enum-desc">当前状态不允许 —— 如扫地机正在运行时切换清洁模式</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">RVC 专属约束</div>
    <p>
      扫地机在「清扫中」「回充中」等运行状态下，切换清洁模式通常会被拒绝
      （返回 <code>InvalidInMode</code>）。建议在发送 ChangeToMode 前，
      先读取 RvcRunMode 的 CurrentMode 确认设备处于空闲或待机状态。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台支持四种清洁模式的扫地机器人，当前处于「吸拖一体」模式：</p>

  <pre><code>{
  // --- 模式列表 ---
  "0x0000": [                              // SupportedModes
    {
      "Label": "深度清洁",
      "Mode": 0,
      "ModeTags": [{ "Value": 16384 }]    // DeepClean (0x4000)
    },
    {
      "Label": "仅吸尘",
      "Mode": 1,
      "ModeTags": [{ "Value": 16385 }]    // VacuumOnly (0x4001)
    },
    {
      "Label": "仅拖地",
      "Mode": 2,
      "ModeTags": [{ "Value": 16386 }]    // MopOnly (0x4002)
    },
    {
      "Label": "吸拖一体",
      "Mode": 3,
      "ModeTags": [{ "Value": 16387 }]    // VacuumAndMop (0x4003)
    }
  ],

  // --- 当前模式 ---
  "0x0001": 3,                             // CurrentMode = 3（吸拖一体）
  "0x0003": 3                              // OnMode = 3（开机默认吸拖一体）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      不同厂商的扫地机支持的模式数量和标签可能不同。有些机型没有拖地模块，
      就不会出现 <code>MopOnly</code> 和 <code>VacuumAndMop</code> 标签。
      App 应始终以 <code>SupportedModes</code> 返回的实际列表为准，
      通过 ModeTag 识别清洁类型，用 Label 作为展示文字。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-switch">场景 1：用户切换清洁模式</h3>
  <ol>
    <li>App 读取 <code>SupportedModes (0x0000)</code>，获取设备支持的所有清洁模式列表</li>
    <li>根据每个模式的 ModeTag 展示对应图标 —— 如 VacuumOnly 显示吸尘器图标，MopOnly 显示拖布图标</li>
    <li>用户选择「仅拖地」（Mode = 2），App 发送 <code>ChangeToMode</code>，NewMode = 2</li>
    <li>设备返回 <code>ChangeToModeResponse</code>，Status = <code>0x00 (Success)</code></li>
    <li>App 订阅 <code>CurrentMode (0x0001)</code> 变化，确认已切换到目标模式并更新高亮</li>
  </ol>

  <h3 id="scenario-onmode">场景 2：设置开机默认清洁模式</h3>
  <ol>
    <li>用户在设置页选择「开机默认使用深度清洁」</li>
    <li>App 写入 <code>OnMode (0x0003)</code> = 0（深度清洁的 Mode 值）</li>
    <li>下次扫地机开机或从充电桩激活时，自动切换到深度清洁模式</li>
    <li>如果用户选择「保持上次模式」，App 写入 <code>OnMode = null</code></li>
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
</style>`,
  },
  'rvc-operational-state': {
    title: '扫地机器人操作状态 Cluster · RvcOperationalState（0x0061）',
    description: 'Matter RvcOperationalState Cluster（0x0061）完整参考 — 继承自 OperationalState 的扫地机器人专用状态机，Pause/Stop/GoHome 命令、充电/停靠/寻充扩展状态、8 种 RVC 专属错误码、事件通知等全部定义及枚举值速查。',
    prev: { title: '操作状态（OperationalState）', slug: 'operational-state' },
    next: undefined,
    content: `<h1>扫地机器人操作状态 Cluster（RvcOperationalState）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0061</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 通常在 <code>Endpoint 1</code>（功能端点）&nbsp;|&nbsp;
    <strong>继承自</strong>: <a href="../operational-state/">OperationalState（0x0060）</a>
  </p>
  <p>
    RvcOperationalState 是 <a href="../operational-state/">OperationalState（0x0060）</a>
    的<strong>扫地机器人专用派生 Cluster</strong>。它继承了基础状态机的所有属性和事件结构，
    但根据扫地机器人的实际使用场景做了重要调整：
  </p>
  <ul>
    <li><strong>去掉了 Start 和 Resume 命令</strong> —— 扫地机器人通过 RvcRunMode Cluster 选择清扫模式来启动，不直接用 Start</li>
    <li><strong>新增了 GoHome 命令（0x80）</strong> —— 让机器人主动回充电座</li>
    <li><strong>扩展了 3 个 RVC 专属运行状态</strong> —— SeekingCharger（寻找充电座）、Charging（充电中）、Docked（已停靠）</li>
    <li><strong>扩展了 8 个 RVC 专属错误码</strong> —— 涵盖充电座、卡住、尘盒、水箱、拖布等常见故障</li>
  </ul>

  <div class="callout callout-info">
    <div class="callout-title">与基础 OperationalState 的关系</div>
    <p>
      RvcOperationalState 并非替代 OperationalState，而是在其基础上<strong>定制</strong>了扫地机器人的行为。
      基础的 4 个状态（Stopped/Running/Paused/Error）仍然保留，RVC 扩展的 3 个状态（0x40~0x42）
      是在此基础上增加的。同样，基础的 4 个错误码（NoError/UnableToStartOrResume 等）仍然有效，
      RVC 扩展的 8 个错误码（0x40~0x47）用于描述扫地机器人特有的故障场景。
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
    <a href="#events">事件</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">示例数据</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">常见场景</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    RvcOperationalState Cluster 共有 3 个命令。相比基础 OperationalState 的 4 个命令，
    <strong>去掉了 Start（0x02）和 Resume（0x03）</strong>，
    因为扫地机器人的启动和模式切换由 RvcRunMode Cluster 负责。
    新增了 <strong>GoHome（0x80）</strong> 命令，用于让机器人返回充电座。
    所有命令执行后都会返回 <code>OperationalCommandResponse</code>，包含一个
    <a href="#struct-errorstate">ErrorStateStruct</a> 用于指示操作是否成功。
  </p>

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
          <td>Pause</td>
          <td>暂停当前操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Stop</td>
          <td>停止操作</td>
          <td>OperationalCommandResponse</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x80">
          <td><a href="#cmd-0x80"><code>0x80</code></a></td>
          <td>GoHome</td>
          <td>返回充电座</td>
          <td>OperationalCommandResponse</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">没有 Start 和 Resume 命令</div>
    <p>
      扫地机器人的启动不是通过 OperationalState 的 Start 命令，而是通过
      <strong>RvcRunMode Cluster</strong> 的 ChangeToMode 命令来实现。
      选择清扫模式（如标准清扫、深度清扫）后，机器人自动开始工作。
      同理，暂停后的恢复也通过 RvcRunMode 来控制。
      如果向 RvcOperationalState 发送 Start 或 Resume 命令，会收到
      <code>CommandInvalidInState (3)</code> 错误。
    </p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Pause —— 暂停（0x00）</h3>
  <p>
    暂停机器人当前正在进行的操作（清扫、回充等）。执行成功后，<code>OperationalState</code>
    属性变为 <code>Paused (2)</code>。机器人会原地停止并保留当前位置和清扫进度。不需要参数。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">状态限制</div>
    <p>
      只有当机器人处于 <code>Running (1)</code> 或 <code>SeekingCharger (0x40)</code> 状态时才能暂停。
      如果在 <code>Stopped (0)</code>、<code>Charging (0x41)</code>、<code>Docked (0x42)</code>
      或 <code>Error (3)</code> 状态下调用，会返回 <code>CommandInvalidInState (3)</code> 错误。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        机器人正在清扫客厅，用户需要临时搬开地上的杂物。App 发送 Pause 命令，
        机器人原地停止等待。整理完毕后通过 RvcRunMode 恢复清扫。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x01">Stop —— 停止（0x01）</h3>
  <p>
    完全停止机器人的当前操作。执行成功后，<code>OperationalState</code> 属性变为
    <code>Stopped (0)</code>。与 Pause 不同，Stop 会结束本次清扫任务，
    需要通过 RvcRunMode 重新选择模式才能开始新的清扫。不需要参数。
  </p>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        用户要出门，不想让机器人继续清扫。发送 Stop 命令终止清扫任务。
        回家后可以通过 RvcRunMode 重新启动清扫。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <h3 id="cmd-0x80">GoHome —— 返回充电座（0x80）</h3>
  <p>
    <strong>RVC 专属命令</strong>。指示机器人停止当前操作并返回充电座。
    执行成功后，<code>OperationalState</code> 属性变为 <code>SeekingCharger (0x40)</code>，
    机器人开始自动导航回充电座。到达后状态依次变为 <code>Charging (0x41)</code>
    → <code>Docked (0x42)</code>。不需要参数。
  </p>
  <div class="callout callout-warning">
    <div class="callout-title">状态限制</div>
    <p>
      当机器人已经处于 <code>Charging (0x41)</code> 或 <code>Docked (0x42)</code> 状态时，
      调用 GoHome 会返回 <code>CommandInvalidInState (3)</code> 错误 —— 机器人已经在充电座上了。
    </p>
  </div>
  <details class="scenario">
    <summary>使用场景</summary>
    <div class="scenario-content">
      <p>
        机器人清扫到一半，用户想让它提前回充电座。App 发送 GoHome 命令，
        机器人放弃剩余清扫区域，自动导航回充电座充电。
        也常用于清扫完成后未自动回充的情况。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 命令响应 ====== -->
  <h3 id="cmd-response">OperationalCommandResponse —— 命令响应</h3>
  <p>
    所有三个命令（Pause/Stop/GoHome）执行后都会返回此响应。
    它包含一个 <a href="#struct-errorstate">ErrorStateStruct</a>，用于指示命令是否成功。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CommandResponseState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>命令执行结果。<code>ErrorStateID = 0 (NoError)</code> 表示成功</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">属性详解</h2>
  <p>
    RvcOperationalState Cluster 继承了基础 OperationalState 的全部 6 个属性，定义完全一致。
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
        </tr>
      </thead>
      <tbody>
        <!-- 阶段信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>PhaseList</td>
          <td>list&lt;string&gt; / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>操作阶段列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentPhase</td>
          <td>uint8 / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>当前所处阶段索引</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CountdownTime</td>
          <td>elapsed_s / null</td>
          <td><a href="#group-phase">阶段信息</a></td>
          <td>剩余时间（秒）</td>
        </tr>
        <!-- 运行状态 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>OperationalStateList</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td><a href="#group-state">运行状态</a></td>
          <td>设备支持的所有状态（含 RVC 扩展）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>OperationalState</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td><a href="#group-state">运行状态</a></td>
          <td>当前运行状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>OperationalError</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td><a href="#group-state">运行状态</a></td>
          <td>当前错误信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 阶段信息（0x0000, 0x0001, 0x0002）====== -->
  <h3 id="group-phase">阶段信息（0x0000, 0x0001, 0x0002）</h3>
  <p>
    描述机器人当前清扫任务的阶段进度和剩余时间。
    扫地机器人的阶段划分可能包括：主区域清扫、沿边清扫、拖地、回充等。
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
          <td>PhaseList（阶段列表）</td>
          <td>list&lt;string&gt; / null</td>
          <td>
            机器人清扫操作的有序阶段名称列表。例如 <code>["主刷清扫", "沿边清扫", "回充中"]</code>。
            <strong>Nullable</strong> —— <code>null</code> 表示机器人不支持阶段划分。
            列表最多 32 项
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentPhase（当前阶段）</td>
          <td>uint8 / null</td>
          <td>
            当前所处阶段在 PhaseList 中的索引（从 0 开始）。
            <strong>Nullable</strong> —— 当 PhaseList 为 <code>null</code> 时，此值也为 <code>null</code>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CountdownTime（剩余时间）</td>
          <td>elapsed_s / null</td>
          <td>
            当前清扫任务的预计剩余时间，单位<strong>秒</strong>。机器人会根据剩余面积和电量定期更新此值。
            <strong>Nullable</strong> —— <code>null</code> 表示机器人无法预估剩余时间
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">扫地机器人的阶段特殊性</div>
    <p>
      与洗衣机等家电不同，扫地机器人的阶段划分不一定是固定的线性流程。
      有些机器人可能在清扫过程中动态调整阶段（如发现电量不足时插入回充阶段），
      因此 <code>PhaseList</code> 的内容可能随任务执行而变化。
      App 应定期重新读取 PhaseList，而不是只在任务开始时读取一次。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 运行状态（0x0003, 0x0004, 0x0005）====== -->
  <h3 id="group-state">运行状态（0x0003, 0x0004, 0x0005）</h3>
  <p>
    描述机器人的运行状态和错误信息。<code>OperationalStateList</code> 会包含基础的 4 个状态
    以及 RVC 扩展的 3 个状态（SeekingCharger/Charging/Docked）。
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
          <td>OperationalStateList（状态列表）</td>
          <td>list&lt;OperationalStateStruct&gt;</td>
          <td>
            机器人支持的所有运行状态。除了基础的 0~3 四个状态之外，
            RVC 还会在列表中包含 0x40~0x42 三个扩展状态（寻找充电座/充电中/已停靠）
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>OperationalState（运行状态）</td>
          <td><a href="#enum-opstate">OperationalStateEnum</a></td>
          <td>
            机器人当前的运行状态，取值范围见
            <a href="#enum-opstate">OperationalStateEnum</a>（含 RVC 扩展值）。
            这是 App 展示机器人状态的核心属性
          </td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>OperationalError（当前错误）</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>
            机器人当前的错误状态。当 <code>OperationalState</code> 为
            <code>Error (3)</code> 时，此属性包含具体的错误信息（含 RVC 扩展错误码）。
            无错误时 <code>ErrorStateID = 0 (NoError)</code>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 枚举定义 ====== -->
  <h2 id="enums">枚举定义</h2>

  <h3 id="enum-opstate">OperationalStateEnum —— 运行状态</h3>
  <p>
    RVC 的运行状态枚举继承了基础 OperationalState 的 4 个标准值（0~3），
    并在 0x40~0x42 范围内扩展了 3 个扫地机器人专属状态。
  </p>

  <h4>基础状态（继承自 OperationalState）</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">已停止 —— 机器人空闲，可以通过 RvcRunMode 启动清扫</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Running</span>
        <span class="enum-desc">运行中 —— 正在执行清扫任务，可以 Pause、Stop 或 GoHome</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">已暂停 —— 清扫被暂停，可以通过 RvcRunMode 恢复或 Stop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Error</span>
        <span class="enum-desc">错误 —— 发生故障，查看 OperationalError 获取详情</span>
      </div>
    </div>
  </div>

  <h4>RVC 扩展状态</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">SeekingCharger</span>
        <span class="enum-desc">寻找充电座 —— 机器人正在自动导航回充电座的途中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Charging</span>
        <span class="enum-desc">充电中 —— 已停靠在充电座上并正在充电</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">Docked</span>
        <span class="enum-desc">已停靠 —— 停靠在充电座上，电量已满或待机中</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">充电状态的变迁</div>
    <p>
      典型的充电流程是：<code>SeekingCharger (0x40)</code> → <code>Charging (0x41)</code>
      → <code>Docked (0x42)</code>。机器人回到充电座后先进入 Charging 状态充电，
      电量充满后转为 Docked 待机状态。从 Docked 或 Charging 状态启动清扫，
      需要通过 RvcRunMode Cluster 发送 ChangeToMode 命令。
    </p>
  </div>

  <h3 id="enum-errorstate">ErrorStateEnum —— 错误类型</h3>
  <p>
    RVC 的错误状态枚举继承了基础的 4 个通用错误码（0~3），
    并在 0x40~0x47 范围内扩展了 8 个扫地机器人专属错误码，涵盖充电座、机械故障、耗材等常见问题。
  </p>

  <h4>基础错误码（继承自 OperationalState）</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NoError</span>
        <span class="enum-desc">无错误 —— 一切正常</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnableToStartOrResume</span>
        <span class="enum-desc">无法启动或恢复 —— 机器人因某种原因无法开始清扫</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">UnableToCompleteOperation</span>
        <span class="enum-desc">无法完成操作 —— 清扫过程中遇到了不可恢复的问题</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">CommandInvalidInState</span>
        <span class="enum-desc">命令在当前状态无效 —— 如在 Docked 状态下调用 GoHome</span>
      </div>
    </div>
  </div>

  <h4>RVC 扩展错误码</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">FailedToFindChargingDock</span>
        <span class="enum-desc">找不到充电座 —— 机器人无法定位或导航到充电座</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Stuck</span>
        <span class="enum-desc">卡住了 —— 机器人被障碍物或地形困住无法移动</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">DustBinMissing</span>
        <span class="enum-desc">尘盒未安装 —— 尘盒被取出后未放回</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">DustBinFull</span>
        <span class="enum-desc">尘盒已满 —— 需要清倒尘盒才能继续清扫</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">WaterTankEmpty</span>
        <span class="enum-desc">水箱无水 —— 拖地模式下水箱已空，需要加水</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">WaterTankMissing</span>
        <span class="enum-desc">水箱未安装 —— 水箱被取出后未放回</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">WaterTankLidOpen</span>
        <span class="enum-desc">水箱盖未关 —— 水箱盖子未正确关闭，有漏水风险</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">MopCleaningPadMissing</span>
        <span class="enum-desc">拖布未安装 —— 拖地模式需要安装拖布才能工作</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">错误处理建议</div>
    <p>
      RVC 的 8 个扩展错误码都是<strong>用户可自行解决的物理问题</strong>。
      App 在收到这些错误时，应该给出明确的操作指引（如「请清倒尘盒后重启清扫」），
      而不只是显示错误码。用户处理完问题后，通过 RvcRunMode 重新启动清扫即可。
    </p>
  </div>

  <!-- ====== 数据结构 ====== -->
  <h2 id="structs">数据结构</h2>

  <h3 id="struct-errorstate">ErrorStateStruct —— 错误状态结构</h3>
  <p>
    用于描述机器人的错误信息。既用于 <code>OperationalError</code> 属性，也用于命令响应。
    结构与基础 OperationalState 完全一致。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorStateID</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>是</td>
          <td>错误类型编码。<code>0</code> 表示无错误。RVC 扩展错误码范围 0x40~0x47</td>
        </tr>
        <tr>
          <td>ErrorStateLabel</td>
          <td>string</td>
          <td>否</td>
          <td>可选的本地化错误标签，供 App 直接展示。对于 RVC 扩展错误码（0x40~0x47），此字段<strong>必须</strong>提供</td>
        </tr>
        <tr>
          <td>ErrorStateDetails</td>
          <td>string</td>
          <td>否</td>
          <td>可选的错误详细描述，提供更多诊断信息（如「左侧轮子被线缆缠绕」）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-opstate">OperationalStateStruct —— 操作状态结构</h3>
  <p>
    用于 <code>OperationalStateList</code> 属性中，描述机器人支持的每一个运行状态。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OperationalStateID</td>
          <td>uint8</td>
          <td>是</td>
          <td>状态编码。0~3 为标准状态，0x40~0x42 为 RVC 扩展状态</td>
        </tr>
        <tr>
          <td>OperationalStateLabel</td>
          <td>string</td>
          <td>否</td>
          <td>可选的本地化状态标签。对于标准状态（0~3）可省略；对于 RVC 扩展状态（0x40~0x42）<strong>必须</strong>提供</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 事件 ====== -->
  <h2 id="events">事件（Events）</h2>
  <p>
    RvcOperationalState Cluster 继承了基础 OperationalState 的 2 个事件，
    用于通知控制端机器人的重要状态变化。
  </p>

  <h3 id="event-error">OperationalError 事件</h3>
  <p>
    当机器人进入错误状态时触发此事件。事件优先级为 <strong>CRITICAL</strong>，
    确保 App 能及时收到错误通知（如机器人卡住、尘盒已满等）。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ErrorState</td>
          <td><a href="#struct-errorstate">ErrorStateStruct</a></td>
          <td>当前的错误信息，ErrorStateID 可能是 RVC 扩展错误码（0x40~0x47）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="event-completion">OperationCompletion 事件</h3>
  <p>
    当机器人完成一个完整清扫周期时触发此事件。事件优先级为 <strong>INFO</strong>。
    该事件携带清扫的时间统计信息，方便 App 展示清扫报告。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>必选</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>CompletionErrorCode</td>
          <td><a href="#enum-errorstate">ErrorStateEnum</a></td>
          <td>是</td>
          <td>清扫完成时的错误码。<code>0 (NoError)</code> 表示正常完成</td>
        </tr>
        <tr>
          <td>TotalOperationalTime</td>
          <td>elapsed_s / null</td>
          <td>否</td>
          <td>清扫总耗时（秒），包含暂停时间。<code>null</code> 表示机器人不支持统计</td>
        </tr>
        <tr>
          <td>PausedTime</td>
          <td>elapsed_s / null</td>
          <td>否</td>
          <td>暂停累计时长（秒）。<code>null</code> 表示机器人不支持统计</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">清扫报告</div>
    <p>
      App 可以结合 <code>OperationCompletion</code> 事件的时间统计和清扫面积等信息，
      生成清扫报告。例如：「本次清扫耗时 45 分钟，实际清扫 40 分钟，暂停 5 分钟」。
      注意 <code>CompletionErrorCode</code> 不一定是 NoError —— 机器人可能因为
      电量耗尽或故障而提前结束清扫，此时会携带对应的错误码。
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>一台正在清扫中的扫地机器人的 RvcOperationalState Cluster 读取结果：</p>

  <pre><code>{
  // --- 阶段信息 ---
  "0x0000": ["主刷清扫", "沿边清扫", "回充中"],  // PhaseList（操作阶段列表）
  "0x0001": 0,                                    // CurrentPhase = 0（当前处于「主刷清扫」阶段）
  "0x0002": 2400,                                  // CountdownTime = 2400 秒（剩余约 40 分钟）

  // --- 运行状态 ---
  "0x0003": [                                      // OperationalStateList（设备支持的状态列表）
    { "OperationalStateID": 0, "OperationalStateLabel": "已停止" },
    { "OperationalStateID": 1, "OperationalStateLabel": "运行中" },
    { "OperationalStateID": 2, "OperationalStateLabel": "已暂停" },
    { "OperationalStateID": 3, "OperationalStateLabel": "错误" },
    { "OperationalStateID": 64, "OperationalStateLabel": "寻找充电座" },
    { "OperationalStateID": 65, "OperationalStateLabel": "充电中" },
    { "OperationalStateID": 66, "OperationalStateLabel": "已停靠" }
  ],
  "0x0004": 1,                                     // OperationalState = Running（正在清扫）
  "0x0005": {                                      // OperationalError（当前无错误）
    "ErrorStateID": 0,
    "ErrorStateLabel": "",
    "ErrorStateDetails": ""
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发提示</div>
    <p>
      RVC 设备的 <code>OperationalStateList (0x0003)</code> 会比基础 OperationalState 多出
      3 个扩展状态条目（ID 64/65/66 即 0x40/0x41/0x42）。App 在渲染状态选择或状态指示时，
      需要处理这些 RVC 专属状态的 UI 展示（如为「寻找充电座」显示导航动画、为「充电中」显示电量进度）。
      同样，错误处理逻辑也需要覆盖 0x40~0x47 范围的 RVC 扩展错误码。
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">常见场景</h2>

  <h3 id="scenario-cleaning">场景 1：完整清扫生命周期</h3>
  <ol>
    <li>机器人处于 <code>Docked (0x42)</code> 状态，停靠在充电座上待机</li>
    <li>用户通过 <strong>RvcRunMode</strong> Cluster 发送 ChangeToMode 命令，选择「标准清扫」模式</li>
    <li>机器人离开充电座，状态变为 <code>Running (1)</code>，开始清扫</li>
    <li>App 订阅 <code>OperationalState</code>、<code>CurrentPhase</code>、<code>CountdownTime</code>，
      实时更新清扫进度和剩余时间</li>
    <li>清扫完成后，机器人自动进入 <code>SeekingCharger (0x40)</code> 状态回充</li>
    <li>到达充电座后变为 <code>Charging (0x41)</code>，充满电后变为 <code>Docked (0x42)</code></li>
    <li>触发 <code>OperationCompletion</code> 事件，App 展示清扫报告：「清扫完成，总耗时 45 分钟」</li>
  </ol>

  <h3 id="scenario-error">场景 2：清扫中的错误处理</h3>
  <ol>
    <li>机器人正在清扫（<code>Running (1)</code>），突然被地毯边缘卡住</li>
    <li>机器人尝试脱困失败，状态变为 <code>Error (3)</code>，<code>OperationalError</code> 更新为：
      <ul>
        <li><code>ErrorStateID = 0x41 (Stuck)</code></li>
        <li><code>ErrorStateLabel = "机器人卡住"</code></li>
        <li><code>ErrorStateDetails = "左侧轮子无法转动，请检查是否有异物缠绕"</code></li>
      </ul>
    </li>
    <li>设备触发 <code>OperationalError</code> 事件（CRITICAL 优先级），App 弹出推送通知</li>
    <li>App 根据错误码 0x41（Stuck）展示对应的操作指引：「请将机器人搬到开阔位置」</li>
    <li>用户处理完毕后，发送 <code>Stop (0x01)</code> 清除错误状态</li>
    <li>通过 RvcRunMode 重新启动清扫任务</li>
  </ol>

  <h3 id="scenario-gohome">场景 3：手动回充（GoHome）</h3>
  <ol>
    <li>机器人正在清扫（<code>Running (1)</code>），用户想让它提前回充</li>
    <li>App 发送 <code>GoHome (0x80)</code> 命令</li>
    <li>机器人停止清扫，状态变为 <code>SeekingCharger (0x40)</code>，开始自动导航回充电座</li>
    <li>App 可以展示「正在返回充电座...」的状态提示</li>
    <li>机器人到达充电座后，状态变为 <code>Charging (0x41)</code></li>
    <li>如果导航过程中找不到充电座，状态变为 <code>Error (3)</code>，
      错误码为 <code>FailedToFindChargingDock (0x40)</code></li>
    <li>App 展示：「找不到充电座，请检查充电座是否通电并且前方无障碍物」</li>
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
</style>`,
  },
  'hepa-filter-monitoring': {
    title: 'HEPA 滤芯监测 Cluster · HepaFilterMonitoring（0x0071）',
    description: 'Matter HepaFilterMonitoring Cluster（0x0071）完整参考 — 滤芯寿命百分比、劣化方向、更换指示、替换产品列表、ResetCondition 命令，空气净化器滤芯生命周期管理的核心 Cluster。',
    prev: undefined,
    next: undefined,
    content: `<h1>HEPA 滤芯监测 Cluster（HepaFilterMonitoring）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0071</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 功能端点（通常 <code>Endpoint 1</code>）
  </p>
  <p>
    HepaFilterMonitoring 用于监测空气净化器中 HEPA 滤芯的生命周期状态，包括剩余寿命百分比、劣化程度、是否需要更换，
    以及推荐的替换产品信息。当用户更换滤芯后，可以通过命令重置状态，开始新一轮监测周期。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">什么时候用</div>
    <p>
      空气净化器需要定期更换 HEPA 滤芯。这个 Cluster 让 App 能实时展示滤芯剩余寿命，
      在滤芯接近耗尽时推送提醒，甚至直接提供替换滤芯的购买链接。
      用户更换完滤芯后，发一个 ResetCondition 命令就能重新开始计时。
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map（功能特性）</h2>
  <p>
    HepaFilterMonitoring 通过 Feature Map 控制可选功能的启用。设备可以根据硬件能力声明支持哪些特性。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Bit</th>
          <th>代码</th>
          <th>名称</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0</code></td>
          <td>CON</td>
          <td>Condition</td>
          <td>支持滤芯剩余寿命百分比（<code>Condition</code> 属性）</td>
        </tr>
        <tr>
          <td><code>1</code></td>
          <td>WAR</td>
          <td>Warning</td>
          <td>支持劣化程度等级（<code>DegradationDirection</code> 属性）</td>
        </tr>
        <tr>
          <td><code>2</code></td>
          <td>REP</td>
          <td>ReplacementProductList</td>
          <td>支持替换产品列表（<code>ReplacementProductList</code> 属性）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature 组合示例</div>
    <p>
      Feature Map = <code>0b111</code>（7）：同时支持寿命百分比、劣化方向和替换产品列表 —— 这是功能最完整的配置。<br/>
      Feature Map = <code>0b001</code>（1）：只支持寿命百分比，适合低成本设备。<br/>
      Feature Map = <code>0b101</code>（5）：支持寿命百分比 + 替换产品列表，不报告劣化方向。
    </p>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>HepaFilterMonitoring 的属性分为必选和可选两部分，可选属性取决于设备声明的 Feature。</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>类型</th>
          <th>读写</th>
          <th>必选</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>Condition</td>
          <td>uint8</td>
          <td>只读</td>
          <td>CON</td>
          <td>滤芯剩余寿命百分比（0-100%）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>DegradationDirection</td>
          <td>enum8</td>
          <td>只读</td>
          <td>WAR</td>
          <td>劣化方向：数值升高还是降低表示更差</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ChangeIndication</td>
          <td>enum8</td>
          <td>只读</td>
          <td>是</td>
          <td>更换指示：正常 / 警告 / 临界</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>InPlaceIndicator</td>
          <td>bool</td>
          <td>只读</td>
          <td>否</td>
          <td>滤芯是否已物理安装</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LastChangedTime</td>
          <td>epoch_s</td>
          <td>只读</td>
          <td>否</td>
          <td>上次更换滤芯的时间（可为 null）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>ReplacementProductList</td>
          <td>list</td>
          <td>只读</td>
          <td>REP</td>
          <td>推荐的替换产品列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">Condition（滤芯剩余寿命）</h3>
  <p>
    表示滤芯剩余寿命的百分比，范围 <code>0</code> 到 <code>100</code>。
    <code>100</code> 表示全新滤芯，<code>0</code> 表示滤芯已完全耗尽。
    需要设备声明 <strong>CON</strong> Feature 才会出现此属性。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">如何理解 Condition 值</div>
    <p>
      这个百分比由设备固件根据使用时长、风量、颗粒物浓度等因素综合计算。
      不同厂商的算法可能不同，但对 App 开发者来说只需关注这个 0-100 的值即可。
      建议在 App 中用进度条或环形图展示，低于 20% 时高亮提醒。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">DegradationDirection（劣化方向）</h3>
  <p>
    指示 Condition 值的劣化方向 —— 即数值变大还是变小代表滤芯状态变差。
    需要设备声明 <strong>WAR</strong> Feature 才会出现此属性。
  </p>

  <h4>DegradationDirectionEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">数值越高表示越差（如污染指数从 0 升到 100）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">数值越低表示越差（如剩余寿命从 100 降到 0）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">为什么需要劣化方向</div>
    <p>
      不同厂商对 Condition 值的定义可能相反：有的用「剩余百分比」（越低越差），有的用「污染程度」（越高越差）。
      DegradationDirection 让 App 能正确解读 Condition 值，无论厂商如何定义。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">ChangeIndication（更换指示）</h3>
  <p>
    滤芯当前的更换状态。这是一个必选属性，即使设备不支持 Condition 百分比，也必须报告更换指示。
  </p>

  <h4>ChangeIndicationEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">滤芯状态正常，无需更换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">滤芯开始老化，建议近期更换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">滤芯已严重老化，必须立即更换</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">InPlaceIndicator（滤芯安装状态）</h3>
  <p>
    布尔值，表示滤芯是否已物理安装到设备中。<code>true</code> 表示滤芯在位，<code>false</code> 表示滤芯未安装或已取出。
    这是一个可选属性，取决于设备是否有物理检测传感器。
  </p>
  <div class="callout callout-tip">
    <div class="callout-title">App 端提示</div>
    <p>
      当 <code>InPlaceIndicator = false</code> 时，App 应提示用户「滤芯未安装」并禁止开机运行。
      用户更换滤芯的流程通常是：取出旧滤芯（<code>false</code>）→ 装入新滤芯（<code>true</code>）→ 发送 ResetCondition 命令。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x04">LastChangedTime（上次更换时间）</h3>
  <p>
    上次更换滤芯的 UTC 时间戳（epoch 秒数）。可以为 <code>null</code>，表示设备未记录过更换时间。
    当用户发送 ResetCondition 命令后，设备会将此属性更新为当前时间。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x05">ReplacementProductList（替换产品列表）</h3>
  <p>
    推荐的替换产品列表，每个条目包含产品标识类型和标识值。
    需要设备声明 <strong>REP</strong> Feature 才会出现此属性。
    列表可以包含多个条目，用不同的编码体系标识同一款替换滤芯。
  </p>

  <h4>ReplacementProductStruct 结构</h4>
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
          <td>ProductIdentifierType</td>
          <td>enum8</td>
          <td>产品标识编码体系</td>
        </tr>
        <tr>
          <td>ProductIdentifierValue</td>
          <td>string</td>
          <td>产品标识值（条码号、编号等）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductIdentifierTypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UPC</span>
        <span class="enum-desc">通用产品代码（北美 12 位条码）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">GTIN8</span>
        <span class="enum-desc">全球贸易项目代码（8 位短条码）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">EAN</span>
        <span class="enum-desc">欧洲商品编码（13 位国际条码）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">GTIN14</span>
        <span class="enum-desc">全球贸易项目代码（14 位物流条码）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OEM</span>
        <span class="enum-desc">厂商自定义编号（如型号名称）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>
    HepaFilterMonitoring 只有一个命令，由 Client 发给 Server（即 App 发给设备）。
    用于在用户更换滤芯后重置监测状态。
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
          <td>ResetCondition</td>
          <td>重置滤芯状态（更换滤芯后调用）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">ResetCondition —— 重置滤芯状态（0x00）</h3>
  <p>
    用户更换完 HEPA 滤芯后，发送此命令通知设备重新开始生命周期监测。
    设备收到后会将 <code>Condition</code> 重置为 <code>100</code>，<code>ChangeIndication</code> 重置为 <code>OK</code>，
    并更新 <code>LastChangedTime</code> 为当前时间。
  </p>
  <p>此命令没有参数，直接发送即可。</p>
  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0071",
      "commandId": "0x00"       // ResetCondition
    },
    "commandFields": {}
  }]
}</code></pre>

  <div class="callout callout-info">
    <div class="callout-title">注意事项</div>
    <p>
      ResetCondition 不会检查滤芯是否真的被物理更换。如果设备支持 <code>InPlaceIndicator</code>，
      App 可以先确认该属性从 <code>false</code> 变为 <code>true</code>（用户取出旧滤芯再装入新滤芯）后再发送此命令，
      避免误操作。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一台空气净化器的 HepaFilterMonitoring Cluster 全部属性：</p>
  <pre><code>{
  // --- 属性 ---
  "0x0": 72,          // Condition = 72%（滤芯剩余寿命）
  "0x1": 1,           // DegradationDirection = Down（数值越低越差）
  "0x2": 0,           // ChangeIndication = OK（状态正常）
  "0x3": true,        // InPlaceIndicator = true（滤芯已安装）
  "0x4": 1695206400,  // LastChangedTime = 2023-09-20T16:00:00Z
  "0x5": [            // ReplacementProductList
    {
      "0": 0,         // ProductIdentifierType = UPC
      "1": "012345678905"  // ProductIdentifierValue
    }
  ]
}</code></pre>

  <!-- ====== 场景一 ====== -->
  <h2 id="scenario-lifecycle">场景一：滤芯生命周期追踪</h2>
  <p>
    一台空气净化器从安装新滤芯到滤芯耗尽再到更换的完整流程。
    App 通过订阅属性变化来实时更新 UI，在关键节点推送通知。
  </p>
  <pre><code>{
  // 场景：空气净化器运行 6 个月后，滤芯开始老化
  // 第一次读取 —— 滤芯状态良好
  "readAttributes": {
    "0x0": 72,         // Condition = 72%
    "0x2": 0           // ChangeIndication = OK
  },

  // 两个月后 —— 滤芯进入警告区间
  "readAttributes_later": {
    "0x0": 18,         // Condition = 18%
    "0x2": 1           // ChangeIndication = Warning
  },

  // 继续使用 —— 滤芯进入临界状态
  "readAttributes_critical": {
    "0x0": 3,          // Condition = 3%
    "0x2": 2           // ChangeIndication = Critical
  },

  // 用户更换滤芯后，发送 ResetCondition 命令
  "resetCommand": {
    "endpointId": 1,
    "clusterId": "0x0071",
    "commandId": "0x00"
  },

  // 重置后的状态
  "readAttributes_after_reset": {
    "0x0": 100,        // Condition = 100%（已重置）
    "0x2": 0           // ChangeIndication = OK
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      App 中的滤芯管理功能推荐这样实现：
    </p>
    <ol>
      <li>首页卡片展示 <code>Condition</code> 百分比，用环形进度条直观呈现</li>
      <li>订阅 <code>ChangeIndication</code> 属性变化，当值变为 <code>Warning</code> 时推送 App 通知</li>
      <li>当值变为 <code>Critical</code> 时，在设备卡片上显示红色警告标识</li>
      <li>提供「已更换滤芯」按钮，点击后发送 <code>ResetCondition</code> 命令</li>
      <li>如果设备支持 <code>InPlaceIndicator</code>，在按钮点击前先检查滤芯是否已装入</li>
    </ol>
  </div>

  <!-- ====== 场景二 ====== -->
  <h2 id="scenario-replacement">场景二：替换产品购买引导</h2>
  <p>
    当滤芯需要更换时，App 读取设备中的替换产品列表，帮助用户快速找到正确的替换滤芯并完成购买。
  </p>
  <pre><code>{
  // 场景：App 读取替换产品信息，引导用户购买
  "readAttributes": {
    "0x2": 2,          // ChangeIndication = Critical（需要更换）
    "0x5": [           // ReplacementProductList
      {
        "0": 0,        // ProductIdentifierType = UPC
        "1": "012345678905"
      },
      {
        "0": 4,        // ProductIdentifierType = OEM
        "1": "HEPA-H13-PRO-2024"
      }
    ]
  }
  // App 可以用 UPC 码跳转电商搜索，或用 OEM 编号跳转厂商官网
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">开发建议</div>
    <p>
      替换产品信息的使用方式：
    </p>
    <ol>
      <li>读取 <code>ReplacementProductList</code>，遍历所有条目</li>
      <li>如果有 <code>UPC</code> / <code>EAN</code> / <code>GTIN</code> 类型的条目，可以直接跳转到电商平台搜索对应条码</li>
      <li>如果有 <code>OEM</code> 类型的条目，用厂商编号在品牌官网或授权渠道搜索</li>
      <li>在 App 的「滤芯更换」页面展示所有可用的产品标识，让用户自行选择购买渠道</li>
    </ol>
    <p>
      同一款滤芯可能同时有 UPC 和 OEM 两种标识，App 应同时展示，适应不同地区用户的购买习惯。
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
  },
  'activated-carbon-filter-monitoring': {
    title: '活性炭滤芯监测 Cluster · ActivatedCarbonFilterMonitoring（0x0072）',
    description: 'Matter ActivatedCarbonFilterMonitoring Cluster（0x0072）完整参考 — 滤芯寿命、更换提醒、ResetCondition 命令，用于监测活性炭滤芯状态的 Cluster。',
    prev: undefined,
    next: undefined,
    content: `<h1>活性炭滤芯监测 Cluster（ActivatedCarbonFilterMonitoring）</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0072</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 功能端点（通常为 <code>Endpoint 1</code> 或独立滤芯端点）
  </p>
  <p>
    ActivatedCarbonFilterMonitoring 用于监测活性炭滤芯的生命周期 —— 剩余寿命、降解方向、更换提醒、替换产品信息。
    它与 HEPA Filter Monitoring（<code>0x0071</code>）<strong>结构完全相同</strong>（相同的属性、命令、枚举），区别仅在滤芯类型。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">活性炭 vs HEPA：过滤对象不同</div>
    <p>
      <strong>HEPA 滤芯</strong>捕捉<strong>颗粒物</strong>（PM2.5、粉尘、花粉、宠物毛发），靠物理拦截。<br/>
      <strong>活性炭滤芯</strong>吸附<strong>气态污染物</strong>（甲醛、VOC、异味、烟味），靠化学吸附。<br/>
      空气净化器通常同时搭载两层滤芯，各自有独立的寿命周期 —— 因此需要两个独立的 Cluster 分别监测。
    </p>
  </div>

  <!-- ====== Feature Map ====== -->
  <h2 id="features">Feature Map（功能位）</h2>
  <p>三个可选功能位决定设备支持哪些属性，与 HEPA Filter Monitoring 完全一致。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">CON（Condition）</span>
        <span class="enum-desc">支持 Condition 属性，报告滤芯剩余百分比</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">WAR（Warning）</span>
        <span class="enum-desc">支持 ChangeIndication 属性，发出更换提醒</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x04</span>
      <div>
        <span class="enum-name">REP（ReplacementProductList）</span>
        <span class="enum-desc">支持 ReplacementProductList 属性，提供替换滤芯产品信息</span>
      </div>
    </div>
  </div>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">属性总览</h2>
  <p>所有属性均与 HEPA Filter Monitoring 相同，Feature 列标注需要哪个功能位。</p>

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
          <td>Condition</td>
          <td>percent</td>
          <td>CON</td>
          <td>滤芯剩余寿命百分比（0~100）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>DegradationDirection</td>
          <td>enum8</td>
          <td>CON</td>
          <td>降解方向（值变小=更旧 or 值变大=更旧）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ChangeIndication</td>
          <td>enum8</td>
          <td>必选</td>
          <td>当前更换状态（OK / Warning / Critical）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>InPlaceIndicator</td>
          <td>bool</td>
          <td>可选</td>
          <td>滤芯是否已安装到位</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>LastChangedTime</td>
          <td>epoch-s</td>
          <td>可选</td>
          <td>上次更换滤芯的时间戳</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>ReplacementProductList</td>
          <td>list</td>
          <td>REP</td>
          <td>推荐替换产品列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详解 ====== -->
  <h3 id="attr-0x00">Condition（滤芯剩余寿命）</h3>
  <p>
    0~100 的百分比值，表示活性炭滤芯的剩余吸附能力。<code>100</code> 表示全新，<code>0</code> 表示完全耗尽（当 DegradationDirection = Down 时）。
    活性炭的衰减速度取决于环境中 VOC/异味的浓度，高污染环境下消耗更快。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x01">DegradationDirection（降解方向）</h3>
  <p>告诉 App 端 Condition 值的含义方向。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">值从 100 降到 0，越小越需更换（最常见）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">值从 0 升到 100，越大越需更换</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x02">ChangeIndication（更换状态）</h3>
  <p>设备对滤芯当前状态的综合判断。<strong>必选属性</strong>，即使不支持 CON Feature 也必须实现。</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">OK</span>
        <span class="enum-desc">滤芯状态良好，无需更换</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Warning</span>
        <span class="enum-desc">建议尽快更换（吸附能力下降）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Critical</span>
        <span class="enum-desc">必须立即更换（已丧失吸附能力）</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x03">InPlaceIndicator（滤芯安装状态）</h3>
  <p>
    <code>true</code> 表示滤芯已正确安装，<code>false</code> 表示滤芯缺失或未装好。
    带有物理检测开关的设备可以在用户取出滤芯时自动更新此值。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x04">LastChangedTime（上次更换时间）</h3>
  <p>
    Unix 时间戳（秒），记录上一次更换活性炭滤芯的时间。配合 Condition 可以计算滤芯的实际使用天数和平均消耗速度。
    用户更换滤芯并执行 ResetCondition 命令后，设备应更新此值。
  </p>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <h3 id="attr-0x05">ReplacementProductList（替换产品列表）</h3>
  <p>
    设备推荐的替换滤芯产品列表，每条记录包含产品标识类型和标识值。App 可据此直接引导用户购买。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>字段</th><th>类型</th><th>说明</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProductIdentifierType</td>
          <td>enum8</td>
          <td>标识类型（见下方枚举）</td>
        </tr>
        <tr>
          <td>ProductIdentifierValue</td>
          <td>string</td>
          <td>标识值（如 UPC 码、EAN 码、型号等）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ProductIdentifierTypeEnum 枚举值</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">UPC</span>
        <span class="enum-desc">通用产品代码</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">GTIN-8</span>
        <span class="enum-desc">8 位全球贸易项目代码</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">EAN</span>
        <span class="enum-desc">欧洲商品编号</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">GTIN-14</span>
        <span class="enum-desc">14 位全球贸易项目代码</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">OEM</span>
        <span class="enum-desc">厂商自定义型号</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; 返回属性列表</a></p>

  <!-- ====== 命令 ====== -->
  <h2 id="commands">命令（Commands）</h2>
  <p>只有一个命令，用于更换滤芯后重置状态。</p>

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
          <td>ResetCondition</td>
          <td>重置滤芯状态（更换滤芯后调用）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="cmd-0x00">ResetCondition —— 重置滤芯状态（0x00）</h3>
  <p>
    用户更换活性炭滤芯后，通过 App 发送此命令。设备收到后应将 Condition 恢复到 100（或 0，取决于 DegradationDirection），
    将 ChangeIndication 重置为 OK，并更新 LastChangedTime 为当前时间。无参数，直接发送即可。
  </p>
  <p>请求示例：</p>
  <pre><code>{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0072",
      "commandId": "0x00"          // ResetCondition
    },
    "commandFields": {}
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; 返回命令列表</a></p>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">示例数据</h2>
  <p>读取一台空气净化器的活性炭滤芯状态：</p>
  <pre><code>{
  // --- 属性（ActivatedCarbonFilterMonitoring Cluster） ---
  "0x0": 72,          // Condition = 72%（滤芯剩余寿命）
  "0x1": 0,           // DegradationDirection = Down（值越小越需更换）
  "0x2": 1,           // ChangeIndication = Warning（建议更换）
  "0x3": true,        // InPlaceIndicator = true（滤芯已安装）
  "0x4": 1718380800,  // LastChangedTime = 2024-06-15T00:00:00Z
  "0x5": [{           // ReplacementProductList
    "productIdentifierType": 3,
    "productIdentifierValue": "AC-FILTER-2024-VOC"
  }]
}</code></pre>

  <!-- ====== 场景 ====== -->
  <h2 id="scenarios">应用场景</h2>

  <div class="callout callout-tip">
    <div class="callout-title">场景一：双滤芯空气净化器</div>
    <p>
      一台空气净化器同时搭载 HEPA 滤芯和活性炭滤芯，分别放在两个 Endpoint 上（或同一 Endpoint 上两个不同的 Cluster）。
      App 需要分别显示两层滤芯的寿命，因为它们的消耗速度不同 —— PM2.5 高的环境 HEPA 先耗尽，装修房间则活性炭先耗尽。
    </p>
    <pre><code>{
  // Endpoint 1 — HEPA 滤芯（HEPAFilterMonitoring 0x0071）
  "hepa": {
    "0x0": 45,         // Condition = 45%
    "0x2": 1           // ChangeIndication = Warning
  },
  // Endpoint 2 — 活性炭滤芯（ActivatedCarbonFilterMonitoring 0x0072）
  "carbon": {
    "0x0": 78,         // Condition = 78%
    "0x2": 0           // ChangeIndication = OK
  }
}</code></pre>
    <p>
      App 端建议用双进度条或双环形图分别展示，让用户一目了然知道该换哪层滤芯。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">场景二：VOC 吸附能力追踪</div>
    <p>
      智能新风系统内置 VOC 传感器，结合活性炭滤芯的 Condition 属性，可以分析滤芯的实际吸附效率 ——
      当 VOC 浓度持续偏高且 Condition 下降到 50% 以下时，说明吸附能力明显衰减，App 可提前推送更换建议，
      而不是等到 ChangeIndication 变为 Critical 才通知用户。
    </p>
    <p>
      结合 LastChangedTime 还可以统计滤芯的平均使用寿命，帮助用户规划耗材采购周期。
    </p>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">与 HEPA Filter Monitoring 的关系</div>
    <p>
      两个 Cluster 的属性、命令、枚举定义<strong>完全一致</strong>，仅 Cluster ID 不同（HEPA = <code>0x0071</code>，活性炭 = <code>0x0072</code>）。
      App 开发时可以复用同一套 UI 组件和数据解析逻辑，只需根据 Cluster ID 显示不同的滤芯名称和图标即可。
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
  },
};
