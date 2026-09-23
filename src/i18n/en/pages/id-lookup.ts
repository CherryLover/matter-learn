/**
 * Matter ID lookup page — English
 */
export default {
  title: 'Matter ID Lookup',
  description:
    'Look up any Matter ID online — enter a Cluster ID, Device Type ID or global Attribute ID (hex or decimal) to see what it means, with the 32-bit vendor prefix and number broken down. Includes a full table of standard device type IDs.',
  heading: 'Matter ID Lookup',
  intro:
    'Logs, packet captures and device reports are full of numbers like <code>0x0101</code>, <code>257</code> and <code>0x0016</code>. Paste one into the box below to find out whether it is a cluster, a device type or a global attribute. Hex, decimal and names all work.',
  lookupHeading: 'Lookup',

  formatHeading: 'Is a Cluster ID always two bytes?',
  formatBody: `<p>
    <strong>No.</strong> In the Matter specification a Cluster ID is a <strong>32-bit (4-byte)</strong> number. The upper 16 bits are a <strong>vendor prefix</strong> and the lower 16 bits are the <strong>number</strong>:
  </p>
  <pre><code>0x0000_0101
  │    └─ number 0x0101 (Door Lock)
  └────── vendor prefix 0x0000 (0 = Matter standard)</code></pre>
  <p>
    Every standard Matter cluster has the prefix <code>0x0000</code>, so people drop the leading zeros and write <code>0x0101</code>. It looks like two bytes, but that is just shorthand.
    A vendor-specific cluster cannot drop it: its prefix is the vendor ID, e.g. <code>0x1234_FC00</code> is the first private cluster of vendor <code>0x1234</code>.
  </p>
  <p>Attributes, commands, events and device types use the same "prefix + number" structure, each with its own number range:</p>`,
  formatTable: {
    headers: ['Field', 'Size', 'Standard range (prefix 0x0000)', 'Vendor-specific range', 'Example'],
    rows: [
      ['Cluster ID', '32-bit', '<code>0x0000</code> – <code>0x7FFF</code>', '<code>0xVVVV_FC00</code> – <code>0xVVVV_FFFE</code>', '<code>0x0101</code> Door Lock'],
      ['Attribute ID', '32-bit', '<code>0x0000</code> – <code>0x4FFF</code>; global <code>0xF000</code> – <code>0xFFFE</code>', '<code>0xVVVV_0000</code> – <code>0xVVVV_4FFF</code>', '<code>0x0000</code> LockState'],
      ['Command ID', '32-bit', '<code>0x00</code> – <code>0xFF</code>', '<code>0xVVVV_0000</code> – <code>0xVVVV_00FF</code>', '<code>0x00</code> LockDoor'],
      ['Event ID', '32-bit', '<code>0x00</code> – <code>0xFF</code>', '<code>0xVVVV_0000</code> – <code>0xVVVV_00FF</code>', '<code>0x00</code> DoorLockAlarm'],
      ['Device Type ID', '32-bit', '<code>0x0000</code> – <code>0xBFFF</code>', '<code>0xVVVV_0000</code> – <code>0xVVVV_BFFF</code>', '<code>0x000A</code> Door Lock'],
      ['Endpoint ID', '16-bit', '<code>0</code> – <code>0xFFFE</code> (0 is always the root node)', '—', '<code>1</code> application endpoint'],
      ['Vendor ID', '16-bit', 'Assigned by CSA; <code>0xFFF1</code> – <code>0xFFF4</code> are for testing', '—', '<code>0xFFF1</code> test vendor'],
    ],
  },
  formatNote: `<div class="callout callout-warning">
    <div class="callout-title">The same number means different things in different fields</div>
    <p>
      <code>0x0101</code> in a cluster_id is the <strong>Door Lock cluster</strong>, but in a device_type it is a <strong>Dimmable Light</strong>.
      Each kind of ID has its own numbering. When you see a number, first check which field it appears in, then look it up.
    </p>
  </div>
  <div class="callout callout-tip">
    <div class="callout-title">Decimal or hexadecimal?</div>
    <p>
      The protocol carries plain integers; the display format depends on the tool. chip-tool logs often print <code>0x0000_0101</code>, while Home Assistant diagnostics use decimal <code>1/257/0</code> (endpoint/cluster/attribute).
      257 and 0x0101 are the same number. The lookup box accepts both; plain digits are read as decimal.
    </p>
  </div>`,

  deviceTypesHeading: 'Device Type ID reference',
  deviceTypesIntro:
    'Device types are listed in each endpoint\'s <a href="../../clusters/descriptor/#attr-0x00">Descriptor.DeviceTypeList</a>. The table below lists all {count} standard device types in the current release. The class describes its role:',
  deviceTypeClasses: [
    { label: 'Node', desc: 'one per device, on root endpoint 0 (e.g. Root Node)' },
    { label: 'Utility', desc: 'a helper type layered on top of others (e.g. Power Source, Bridged Node)' },
    { label: 'Simple', desc: 'an actual device function (e.g. Door Lock, lights, sensors)' },
  ],
  deviceTypesHeaders: ['ID', 'Name', 'Class'],

  nextHeading: 'After you find an ID',
  nextBody: `<ul>
    <li>Want to know <strong>what a device is and what it supports after commissioning</strong>? See <a href="../../concepts/#device-discovery">Concepts · Reading a device's capabilities</a></li>
    <li>Have a device's <strong>raw data</strong>? Paste it into the <a href="../json-parser/">JSON Parser</a> and pick the "Raw device data" sample. Every ID is translated for you</li>
    <li>Need the field details of a cluster? Go to the <a href="../../clusters/">Cluster Manual</a></li>
  </ul>`,
};
