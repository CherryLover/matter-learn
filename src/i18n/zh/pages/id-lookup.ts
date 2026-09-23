/**
 * Matter ID 查询页 — 中文
 */
export default {
  title: 'Matter ID 查询',
  description:
    'Matter ID 在线查询 — 输入 Cluster ID、设备类型 ID 或全局属性 ID（十六进制或十进制均可），立即查到它对应什么，并拆解 32 位 ID 的厂商前缀与编号。附全部标准设备类型 ID 速查表。',
  heading: 'Matter ID 查询',
  intro:
    '日志、抓包、设备上报数据里全是 <code>0x0101</code>、<code>257</code>、<code>0x0016</code> 这样的数字。把它粘进下面的输入框，就能知道它是哪个 Cluster、哪种设备类型，还是某个全局属性。十六进制、十进制、名称都能查。',
  lookupHeading: '查询',

  formatHeading: 'Cluster ID 是固定两个字节吗？',
  formatBody: `<p>
    <strong>不是。</strong>在 Matter 规范里，Cluster ID 是 <strong>32 位（4 个字节）</strong>的数字，前 16 位是<strong>厂商前缀</strong>，后 16 位才是<strong>编号</strong>：
  </p>
  <pre><code>0x0000_0101
  │    └─ 编号 0x0101（门锁）
  └────── 厂商前缀 0x0000（0 = Matter 标准）</code></pre>
  <p>
    所有 Matter 标准 Cluster 的前缀都是 <code>0x0000</code>，所以大家习惯把前面的 0 省掉，只写 <code>0x0101</code>。看起来像“两个字节”，其实是省略写法。
    厂商自己扩展的 Cluster 就不能省了，它的前缀是厂商 ID，例如 <code>0x1234_FC00</code> 表示厂商 <code>0x1234</code> 的第一个私有 Cluster。
  </p>
  <p>不只是 Cluster，属性、命令、事件、设备类型的 ID 都是同样的“前缀 + 编号”结构，只是各自的编号范围不同：</p>`,
  formatTable: {
    headers: ['字段', '长度', '标准范围（前缀 0x0000）', '厂商自定义范围', '例子'],
    rows: [
      ['Cluster ID', '32 位', '<code>0x0000</code> ~ <code>0x7FFF</code>', '<code>0xVVVV_FC00</code> ~ <code>0xVVVV_FFFE</code>', '<code>0x0101</code> 门锁'],
      ['Attribute ID', '32 位', '<code>0x0000</code> ~ <code>0x4FFF</code>；全局属性 <code>0xF000</code> ~ <code>0xFFFE</code>', '<code>0xVVVV_0000</code> ~ <code>0xVVVV_4FFF</code>', '<code>0x0000</code> LockState'],
      ['Command ID', '32 位', '<code>0x00</code> ~ <code>0xFF</code>', '<code>0xVVVV_0000</code> ~ <code>0xVVVV_00FF</code>', '<code>0x00</code> LockDoor'],
      ['Event ID', '32 位', '<code>0x00</code> ~ <code>0xFF</code>', '<code>0xVVVV_0000</code> ~ <code>0xVVVV_00FF</code>', '<code>0x00</code> DoorLockAlarm'],
      ['Device Type ID', '32 位', '<code>0x0000</code> ~ <code>0xBFFF</code>', '<code>0xVVVV_0000</code> ~ <code>0xVVVV_BFFF</code>', '<code>0x000A</code> 门锁'],
      ['Endpoint ID', '16 位', '<code>0</code> ~ <code>0xFFFE</code>（0 固定是根节点）', '—', '<code>1</code> 功能端点'],
      ['Vendor ID', '16 位', '由 CSA 分配；<code>0xFFF1</code> ~ <code>0xFFF4</code> 为测试专用', '—', '<code>0xFFF1</code> 测试厂商'],
    ],
  },
  formatNote: `<div class="callout callout-warning">
    <div class="callout-title">同一个数字，在不同字段里是不同的东西</div>
    <p>
      <code>0x0101</code> 放在 cluster_id 里是<strong>门锁 Cluster</strong>，放在 device_type 里却是<strong>可调光灯</strong>。
      每类 ID 各有一套编号，互不相干。看到一个数字时，先确认它出现在哪个字段里，再去查它的含义。
    </p>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">十进制还是十六进制？</div>
    <p>
      协议本身传的是整数，显示成什么格式取决于工具：chip-tool 日志常写 <code>0x0000_0101</code>，Home Assistant 的诊断数据写成十进制 <code>1/257/0</code>（端点/Cluster/属性）。
      257 和 0x0101 是同一个数。上面的查询框两种写法都认，纯数字默认按十进制理解。
    </p>
  </div>`,

  deviceTypesHeading: '设备类型 ID 速查',
  deviceTypesIntro:
    '设备类型写在每个端点的 <a href="../../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a> 里。下表列出当前版本全部 {count} 个标准设备类型。“类别”说明它的角色：',
  deviceTypeClasses: [
    { label: 'Node', desc: '整台设备只有一个，放在根端点 0（如根节点）' },
    { label: 'Utility', desc: '辅助类型，叠加在其他类型上（如电源、被桥接节点）' },
    { label: 'Simple', desc: '具体的设备功能（如门锁、灯、传感器）' },
  ],
  deviceTypesHeaders: ['ID', '中文名', '官方名称', '类别'],

  nextHeading: '查到 ID 之后',
  nextBody: `<ul>
    <li>想知道一台设备<strong>配网后是什么类型、支持什么功能</strong>：看 <a href="../../concepts/#device-discovery">概念总览 · 配网后怎么读出设备能力</a></li>
    <li>手上有设备的<strong>原始数据</strong>：粘进 <a href="../json-parser/">JSON 解析器</a>，选“设备原始数据”示例，每个 ID 都会自动翻译</li>
    <li>要看某个 Cluster 的字段细节：去 <a href="../../clusters/">Cluster 手册</a></li>
  </ul>`,
};
