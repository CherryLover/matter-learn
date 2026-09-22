import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'door-lock': {
    title: 'DoorLock Cluster (0x0101)',
    description: 'Complete reference for Matter DoorLock Cluster (0x0101) — LockDoor/UnlockDoor commands, 40+ attribute definitions including LockState, enum value quick reference, Timed Interaction security mechanism, and real device data examples.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: { title: 'PowerSource', slug: 'power-source' },
    content: `<h1>DoorLock Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0101</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    DoorLock is the core Cluster for Matter door lock devices, defining all capabilities including lock state queries, lock/unlock operations, user management, and credential (PIN code/fingerprint/NFC) management.
    Day-to-day development of door lock devices revolves around this Cluster.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Target Audience</div>
    <p>Whether you are an app developer, firmware engineer, QA tester, or product manager, these attributes and commands are essential knowledge you need to understand.</p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#timed-interaction">Timed Interaction</a>
    <span class="nav-sep">|</span>
    <a href="#standard-example">Standard Example</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    Commands are operations sent to the door lock for execution. Most write operations require a <strong>Timed Interaction</strong>, which is a Matter security requirement for safety-critical devices like door locks.
    Click on a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Timed Interaction</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>LockDoor</td>
          <td>Lock the door</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>UnlockDoor</td>
          <td>Unlock the door</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>UnlockWithTimeout</td>
          <td>Unlock, then automatically re-lock after a timeout</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1A">
          <td><a href="#cmd-0x1A"><code>0x1A</code></a></td>
          <td>SetCredential</td>
          <td>Add or modify a credential (PIN code, fingerprint, etc.)</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1B">
          <td><a href="#cmd-0x1B"><code>0x1B</code></a></td>
          <td>GetCredentialStatus</td>
          <td>Query the status of a specific credential slot</td>
          <td class="col-optional">Not required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x1D">
          <td><a href="#cmd-0x1D"><code>0x1D</code></a></td>
          <td>ClearCredential</td>
          <td>Delete a credential</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x22">
          <td><a href="#cmd-0x22"><code>0x22</code></a></td>
          <td>SetAliroReaderConfig</td>
          <td>Configure Aliro NFC reader parameters</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x24">
          <td><a href="#cmd-0x24"><code>0x24</code></a></td>
          <td>ClearAliroReaderConfig</td>
          <td>Clear Aliro NFC configuration</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x26">
          <td><a href="#cmd-0x26"><code>0x26</code></a></td>
          <td>SetUser</td>
          <td>Add or modify a user (with permissions, validity period, etc.)</td>
          <td class="col-required">Required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x28">
          <td><a href="#cmd-0x28"><code>0x28</code></a></td>
          <td>GetUser</td>
          <td>Query a specific user's information</td>
          <td class="col-optional">Not required</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x29">
          <td><a href="#cmd-0x29"><code>0x29</code></a></td>
          <td>ClearUser</td>
          <td>Delete a user (along with all associated credentials)</td>
          <td class="col-required">Required</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">What is Timed Interaction?</div>
    <p>
      For security-sensitive devices like door locks, Matter requires write operations to include a <strong>timeout value</strong> (typically 5000~10000 milliseconds).
      This prevents man-in-the-middle attacks where an intercepted command could be replayed later &mdash; if the command is not executed within the timeout window, the device automatically rejects it.
    </p>
    <p>If a LockDoor command is sent without the timeout parameter, the device will return an error immediately.</p>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">LockDoor &mdash; Lock (0x00)</h3>
  <p>
    Sends a lock command to the door lock. On successful execution, the <code>LockState</code> attribute changes from its current value to <code>Locked (1)</code>.
    This is one of the most essential and frequently used commands for door locks.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>Conditional</td>
          <td>Required when <code>RequirePINforRemoteOperation</code> is <code>true</code>; a valid PIN code must be provided for remote locking</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user taps the "Lock" button on the app home screen. First check <code>ActuatorEnabled (0x02)</code> to confirm the actuator is available, then send this command using a Timed Interaction.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">UnlockDoor &mdash; Unlock (0x01)</h3>
  <p>
    Sends an unlock command to the door lock. On successful execution, the <code>LockState</code> attribute changes to <code>Unlocked (2)</code>.
    Symmetric to LockDoor, this is also one of the most frequently used commands.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>Conditional</td>
          <td>Required when <code>RequirePINforRemoteOperation</code> is <code>true</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user taps "Unlock" in the app, or for remote unlocking when a guest arrives. After unlocking, it is recommended to subscribe to <code>LockState</code> changes and use <code>AutoRelockTime</code> to verify automatic re-locking.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">UnlockWithTimeout &mdash; Timed Unlock (0x03)</h3>
  <p>
    Unlocks the door lock and automatically re-locks after a specified duration. Functionally equivalent to issuing UnlockDoor followed by waiting for AutoRelockTime, but the timeout is specified by the command parameter and is not affected by the AutoRelockTime attribute.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Timeout</td>
          <td>U16</td>
          <td>Yes</td>
          <td>Auto re-lock wait time, in seconds</td>
        </tr>
        <tr>
          <td>PINCode</td>
          <td>OctetString</td>
          <td>Conditional</td>
          <td>Same as LockDoor</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Ideal for temporary guest access or package delivery scenarios &mdash; the door automatically re-locks after opening, requiring no manual action from the user.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x1A">SetCredential &mdash; Set Credential (0x1A)</h3>
  <p>
    Adds or modifies a credential for a user. Credentials are the "keys" users use to unlock the door &mdash; they can be PIN codes, fingerprints, RFID cards, etc.
    Each credential must be bound to an existing user (created via <code>SetUser</code>).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>OperationType</td><td>U8</td><td>0 = Add, 2 = Modify</td></tr>
        <tr><td>Credential</td><td>Struct</td><td>Contains CredentialType (PIN/Fingerprint/RFID, etc.) and CredentialIndex (slot number)</td></tr>
        <tr><td>CredentialData</td><td>OctetString</td><td>Credential data, such as the digit sequence for a PIN code</td></tr>
        <tr><td>UserIndex</td><td>U16 / Nullable</td><td>Bound user index. If null is passed during addition, the device automatically creates a new user</td></tr>
        <tr><td>UserStatus</td><td>U8 / Nullable</td><td>User status (only effective when automatically creating a user)</td></tr>
        <tr><td>UserType</td><td>U8 / Nullable</td><td>User type (only effective when automatically creating a user)</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when the user adds a new password or enrolls a fingerprint in the app. Before adding, validate the PIN code length via <code>MinPINCodeLength (0x17)</code> / <code>MaxPINCodeLength (0x16)</code>, and check credential capacity via <code>NumberOfCredentialsSupportedPerUser (0x1B)</code>.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x1B">GetCredentialStatus &mdash; Query Credential Status (0x1B)</h3>
  <p>Queries whether a specific credential slot is occupied and which user it is bound to. Does not require a Timed Interaction; this is a read-only query operation.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x1D">ClearCredential &mdash; Delete Credential (0x1D)</h3>
  <p>Deletes a specified credential. If a specific CredentialType and CredentialIndex are provided, the exact credential is removed; it can also batch-clear all credentials of a given type or all credentials entirely.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x22">SetAliroReaderConfig &mdash; Configure Aliro Reader (0x22)</h3>
  <p>Configures the Aliro NFC reader's signing key, group key, supported protocol versions, and other parameters. Aliro is a new NFC tap-to-unlock standard introduced by Matter for door locks.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x24">ClearAliroReaderConfig &mdash; Clear Aliro Config (0x24)</h3>
  <p>Resets all Aliro NFC reader configuration, restoring the device to an unconfigured state.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x26">SetUser &mdash; Set User (0x26)</h3>
  <p>
    Creates or modifies a user on the door lock. Users are "containers" for credentials &mdash; each user can have multiple bound credentials (passwords, fingerprints, etc.),
    and can be assigned a permission level and validity period. User management and credential management are the two most complex operations for door locks.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>OperationType</td><td>U8</td><td>0 = Add, 2 = Modify, 3 = Clear</td></tr>
        <tr><td>UserIndex</td><td>U16</td><td>User index number (starting from 1)</td></tr>
        <tr><td>UserName</td><td>String / Nullable</td><td>User name (optional)</td></tr>
        <tr><td>UniqueID</td><td>U32 / Nullable</td><td>User unique identifier (optional, useful for cross-device synchronization)</td></tr>
        <tr><td>UserStatus</td><td>U8 / Nullable</td><td>1 = OccupiedEnabled (active), 3 = OccupiedDisabled (disabled)</td></tr>
        <tr><td>UserType</td><td>U8 / Nullable</td><td>0 = Unrestricted, 1 = Year Day Schedule, 6 = Remote Only, etc.</td></tr>
        <tr><td>CredentialRule</td><td>U8 / Nullable</td><td>Credential rule: 0 = Single credential sufficient, 1 = Dual authentication required, 2 = Triple</td></tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>Called when registering a new user on the door lock. Typical workflow: first <code>SetUser</code> to create the user, then <code>SetCredential</code> to bind credentials to that user. When deleting a user, use <code>ClearUser</code> instead, which also cleans up all associated credentials.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x28">GetUser &mdash; Query User (0x28)</h3>
  <p>Queries detailed user information by UserIndex, including name, status, type, bound credentials list, etc. Does not require a Timed Interaction.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x29">ClearUser &mdash; Delete User (0x29)</h3>
  <p>Deletes the specified user along with <strong>all associated credentials</strong>. This is a "cascading delete" operation &mdash; no additional ClearCredential calls are needed.</p>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 定时交互示例 ====== -->
  <h3 id="timed-interaction">Timed Interaction Example</h3>
  <p>When sending a lock command, the request structure looks roughly like this:</p>
  <pre><code>{
  "timedRequest": {
    "timeoutMs": 5000       // Timeout: 5 seconds
  },
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,       // Application endpoint
      "clusterId": "0x0101", // DoorLock
      "commandId": "0x00"    // LockDoor
    },
    "commandFields": {}      // LockDoor has no additional parameters
  }]
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The DoorLock Cluster attributes are organized into five functional groups. Click on an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Group</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- 锁核心状态 0x00-0x06 -->
        <tr class="clickable-row" data-href="#attr-0x00">
          <td><a href="#attr-0x00"><code>0x00</code></a></td>
          <td>LockState</td>
          <td>enum8 / null</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Current lock state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x01">
          <td><a href="#attr-0x01"><code>0x01</code></a></td>
          <td>LockType</td>
          <td>enum8</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Lock mechanism type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x02">
          <td><a href="#attr-0x02"><code>0x02</code></a></td>
          <td>ActuatorEnabled</td>
          <td>bool</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Whether the actuator is enabled</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x03">
          <td><a href="#attr-0x03"><code>0x03</code></a></td>
          <td>DoorState</td>
          <td>enum8 / null</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Door physical state (requires DoorPositionSensor feature)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x04">
          <td><a href="#attr-0x04"><code>0x04</code></a></td>
          <td>DoorOpenEvents</td>
          <td>uint32</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Cumulative count of door open events</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x05">
          <td><a href="#attr-0x05"><code>0x05</code></a></td>
          <td>DoorClosedEvents</td>
          <td>uint32</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Cumulative count of door close events</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x06">
          <td><a href="#attr-0x06"><code>0x06</code></a></td>
          <td>OpenPeriod</td>
          <td>uint16</td>
          <td><a href="#attr-core">Lock Core State</a></td>
          <td>Door open duration (seconds)</td>
        </tr>
        <!-- 用户与凭据 0x10-0x1B -->
        <tr class="clickable-row" data-href="#attr-0x10">
          <td><a href="#attr-0x10"><code>0x10</code></a></td>
          <td>NumberOfTotalUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum total users supported</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x11">
          <td><a href="#attr-0x11"><code>0x11</code></a></td>
          <td>NumberOfPINUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum PIN code users supported</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x12">
          <td><a href="#attr-0x12"><code>0x12</code></a></td>
          <td>NumberOfRFIDUsersSupported</td>
          <td>uint16</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum RFID users supported</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x13">
          <td><a href="#attr-0x13"><code>0x13</code></a></td>
          <td>NumberOfWeekDaySchedulesSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Week day schedules per user</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x14">
          <td><a href="#attr-0x14"><code>0x14</code></a></td>
          <td>NumberOfYearDaySchedulesSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Year day schedules per user</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x15">
          <td><a href="#attr-0x15"><code>0x15</code></a></td>
          <td>NumberOfHolidaySchedulesSupported</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Total holiday schedules</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x16">
          <td><a href="#attr-0x16"><code>0x16</code></a></td>
          <td>MaxPINCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum PIN code length</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x17">
          <td><a href="#attr-0x17"><code>0x17</code></a></td>
          <td>MinPINCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Minimum PIN code length</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x18">
          <td><a href="#attr-0x18"><code>0x18</code></a></td>
          <td>MaxRFIDCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum RFID code length</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x19">
          <td><a href="#attr-0x19"><code>0x19</code></a></td>
          <td>MinRFIDCodeLength</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Minimum RFID code length</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1A">
          <td><a href="#attr-0x1A"><code>0x1A</code></a></td>
          <td>CredentialRulesSupport</td>
          <td>bitmap8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Credential rules support bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1B">
          <td><a href="#attr-0x1B"><code>0x1B</code></a></td>
          <td>NumberOfCredentialsSupportedPerUser</td>
          <td>uint8</td>
          <td><a href="#attr-credential">Users & Credentials</a></td>
          <td>Maximum credentials per user</td>
        </tr>
        <!-- 操作与显示 0x1C-0x27 -->
        <tr class="clickable-row" data-href="#attr-0x1C">
          <td><a href="#attr-0x1C"><code>0x1C</code></a></td>
          <td>Language</td>
          <td>string</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Lock interface language (ISO 639-1)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1D">
          <td><a href="#attr-0x1D"><code>0x1D</code></a></td>
          <td>LEDSettings</td>
          <td>uint8</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>LED indicator settings</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1E">
          <td><a href="#attr-0x1E"><code>0x1E</code></a></td>
          <td>AutoRelockTime</td>
          <td>uint32</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Auto re-lock time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x1F">
          <td><a href="#attr-0x1F"><code>0x1F</code></a></td>
          <td>SoundVolume</td>
          <td>uint8</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Operating sound volume</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x20">
          <td><a href="#attr-0x20"><code>0x20</code></a></td>
          <td>OperatingMode</td>
          <td>enum8</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Current operating mode</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x21">
          <td><a href="#attr-0x21"><code>0x21</code></a></td>
          <td>SupportedOperatingModes</td>
          <td>bitmap16</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Supported operating modes bitmap</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x22">
          <td><a href="#attr-0x22"><code>0x22</code></a></td>
          <td>DefaultConfigurationRegister</td>
          <td>bitmap16</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Default configuration register</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x23">
          <td><a href="#attr-0x23"><code>0x23</code></a></td>
          <td>EnableLocalProgramming</td>
          <td>bool</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Whether local programming is allowed</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x24">
          <td><a href="#attr-0x24"><code>0x24</code></a></td>
          <td>EnableOneTouchLocking</td>
          <td>bool</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Whether one-touch locking is enabled</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x25">
          <td><a href="#attr-0x25"><code>0x25</code></a></td>
          <td>EnableInsideStatusLED</td>
          <td>bool</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Whether inside status LED is enabled</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x26">
          <td><a href="#attr-0x26"><code>0x26</code></a></td>
          <td>EnablePrivacyModeButton</td>
          <td>bool</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Whether privacy mode button is enabled</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x27">
          <td><a href="#attr-0x27"><code>0x27</code></a></td>
          <td>LocalProgrammingFeatures</td>
          <td>bitmap8</td>
          <td><a href="#attr-operating">Operation & Display</a></td>
          <td>Local programming features bitmap</td>
        </tr>
        <!-- 远程操作 0x30-0x33 -->
        <tr class="clickable-row" data-href="#attr-0x30">
          <td><a href="#attr-0x30"><code>0x30</code></a></td>
          <td>WrongCodeEntryLimit</td>
          <td>uint8</td>
          <td><a href="#attr-remote">Remote Operation</a></td>
          <td>Wrong code entry limit</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x31">
          <td><a href="#attr-0x31"><code>0x31</code></a></td>
          <td>UserCodeTemporaryDisableTime</td>
          <td>uint8</td>
          <td><a href="#attr-remote">Remote Operation</a></td>
          <td>Wrong code lockout time (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x32">
          <td><a href="#attr-0x32"><code>0x32</code></a></td>
          <td>SendPINOverTheAir</td>
          <td>bool</td>
          <td><a href="#attr-remote">Remote Operation</a></td>
          <td>Whether to send PIN over the air</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x33">
          <td><a href="#attr-0x33"><code>0x33</code></a></td>
          <td>RequirePINforRemoteOperation</td>
          <td>bool</td>
          <td><a href="#attr-remote">Remote Operation</a></td>
          <td>Whether PIN is required for remote operations</td>
        </tr>
        <!-- Aliro 0x80-0x88 -->
        <tr class="clickable-row" data-href="#attr-0x80">
          <td><a href="#attr-0x80"><code>0x80</code></a></td>
          <td>AliroReaderVerificationKey</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Reader verification key</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x81">
          <td><a href="#attr-0x81"><code>0x81</code></a></td>
          <td>AliroReaderGroupIdentifier</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Reader group identifier</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x82">
          <td><a href="#attr-0x82"><code>0x82</code></a></td>
          <td>AliroReaderGroupSubIdentifier</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Reader group sub-identifier</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x83">
          <td><a href="#attr-0x83"><code>0x83</code></a></td>
          <td>AliroExpeditedTransactionSupportedProtocolVersions</td>
          <td>list</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Expedited transaction supported protocol versions</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x84">
          <td><a href="#attr-0x84"><code>0x84</code></a></td>
          <td>AliroGroupResolvingKey</td>
          <td>octstr</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Group resolving key</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x85">
          <td><a href="#attr-0x85"><code>0x85</code></a></td>
          <td>AliroSupportedBLEUWBProtocolVersions</td>
          <td>list</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Supported BLE UWB protocol versions</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x86">
          <td><a href="#attr-0x86"><code>0x86</code></a></td>
          <td>AliroBLEAdvertisingVersion</td>
          <td>uint8</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>BLE advertising version</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x87">
          <td><a href="#attr-0x87"><code>0x87</code></a></td>
          <td>NumberOfAliroCredentialIssuerKeysSupported</td>
          <td>uint16</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Credential issuer keys count</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x88">
          <td><a href="#attr-0x88"><code>0x88</code></a></td>
          <td>NumberOfAliroEndpointKeysSupported</td>
          <td>uint16</td>
          <td><a href="#attr-aliro">Aliro NFC</a></td>
          <td>Endpoint keys count</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性分组详解 ====== -->

  <!-- 锁核心状态 0x00-0x06 -->
  <h3 id="attr-core">Lock Core State (0x00-0x06)</h3>
  <p>The most fundamental status information of the door lock, including lock state, lock type, actuator, and door position sensor data.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x00">
          <td><code>0x00</code></td>
          <td>LockState<br/><span class="attr-cn">Lock State</span></td>
          <td>enum8 / null</td>
          <td>Current lock state. null indicates the device has not yet determined the lock bolt position (e.g., during initial power-up)</td>
        </tr>
        <tr id="attr-0x01">
          <td><code>0x01</code></td>
          <td>LockType<br/><span class="attr-cn">Lock Type</span></td>
          <td>enum8</td>
          <td>Physical type of the lock mechanism, fixed at factory</td>
        </tr>
        <tr id="attr-0x02">
          <td><code>0x02</code></td>
          <td>ActuatorEnabled<br/><span class="attr-cn">Actuator Enabled</span></td>
          <td>bool</td>
          <td>Whether the actuator is enabled. When <code>false</code>, all lock/unlock commands are rejected</td>
        </tr>
        <tr id="attr-0x03">
          <td><code>0x03</code></td>
          <td>DoorState<br/><span class="attr-cn">Door State</span></td>
          <td>enum8 / null</td>
          <td>Physical open/close state of the door. Requires the device to support the DoorPositionSensor feature</td>
        </tr>
        <tr id="attr-0x04">
          <td><code>0x04</code></td>
          <td>DoorOpenEvents<br/><span class="attr-cn">Door Open Events</span></td>
          <td>uint32</td>
          <td>Cumulative count of door open events (writable to reset the counter)</td>
        </tr>
        <tr id="attr-0x05">
          <td><code>0x05</code></td>
          <td>DoorClosedEvents<br/><span class="attr-cn">Door Closed Events</span></td>
          <td>uint32</td>
          <td>Cumulative count of door close events (writable to reset the counter)</td>
        </tr>
        <tr id="attr-0x06">
          <td><code>0x06</code></td>
          <td>OpenPeriod<br/><span class="attr-cn">Open Period</span></td>
          <td>uint16</td>
          <td>Duration the door has remained open without closing, in seconds</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>LockState Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">NotFullyLocked</span>
        <span class="enum-desc">Not fully locked (possibly due to a mechanical fault or door not fully closed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Locked</span>
        <span class="enum-desc">Locked</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Unlocked</span>
        <span class="enum-desc">Unlocked</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Unlatched</span>
        <span class="enum-desc">Latch bolt retracted (intermediate state, not fully unlocked)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Device has not yet determined the lock bolt position</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>LockState is a <strong>Nullable</strong> type &mdash; when the device has just started up and has not yet detected the lock bolt position, this value may be <code>null</code>. Do not treat this field directly as a number; always check for null first.</p>
  </div>

  <h4>LockType Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">DeadBolt</span>
        <span class="enum-desc">Deadbolt lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Magnetic</span>
        <span class="enum-desc">Magnetic lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other type</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Mortise</span>
        <span class="enum-desc">Mortise lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Rim</span>
        <span class="enum-desc">Rim lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">LatchBolt</span>
        <span class="enum-desc">Latch bolt lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">CylindricalLock</span>
        <span class="enum-desc">Cylindrical lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">TubularLock</span>
        <span class="enum-desc">Tubular lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">InterconnectedLock</span>
        <span class="enum-desc">Interconnected lock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">DeadLatch</span>
        <span class="enum-desc">Dead latch</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">DoorFurniture</span>
        <span class="enum-desc">Door furniture</span>
      </div>
    </div>
  </div>

  <h4>DoorState Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Open</span>
        <span class="enum-desc">Door is open</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Closed</span>
        <span class="enum-desc">Door is closed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">JammedOpen</span>
        <span class="enum-desc">Door is jammed in the open position</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ForcedOpen</span>
        <span class="enum-desc">Door was forced open (security alert)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Unspecified</span>
        <span class="enum-desc">Unspecified</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Ajar</span>
        <span class="enum-desc">Door is ajar (not fully closed)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">null</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Sensor could not determine door state</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 用户与凭据 0x10-0x1B -->
  <h3 id="attr-credential">Users & Credentials (0x10-0x1B)</h3>
  <p>Describes the number of users supported by the door lock, credential type capacities, and schedule capabilities.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x10">
          <td><code>0x10</code></td>
          <td>NumberOfTotalUsersSupported<br/><span class="attr-cn">Total Users Supported</span></td>
          <td>uint16</td>
          <td>Maximum total number of users supported by the device</td>
        </tr>
        <tr id="attr-0x11">
          <td><code>0x11</code></td>
          <td>NumberOfPINUsersSupported<br/><span class="attr-cn">PIN Users</span></td>
          <td>uint16</td>
          <td>Maximum number of users with PIN codes</td>
        </tr>
        <tr id="attr-0x12">
          <td><code>0x12</code></td>
          <td>NumberOfRFIDUsersSupported<br/><span class="attr-cn">RFID Users</span></td>
          <td>uint16</td>
          <td>Maximum number of users with RFID credentials</td>
        </tr>
        <tr id="attr-0x13">
          <td><code>0x13</code></td>
          <td>NumberOfWeekDaySchedulesSupportedPerUser<br/><span class="attr-cn">Week Day Schedules</span></td>
          <td>uint8</td>
          <td>Number of week day schedules per user (e.g., specific time slots on Monday through Friday when unlocking is allowed)</td>
        </tr>
        <tr id="attr-0x14">
          <td><code>0x14</code></td>
          <td>NumberOfYearDaySchedulesSupportedPerUser<br/><span class="attr-cn">Year Day Schedules</span></td>
          <td>uint8</td>
          <td>Number of year day schedules per user (specified date ranges when unlocking is allowed)</td>
        </tr>
        <tr id="attr-0x15">
          <td><code>0x15</code></td>
          <td>NumberOfHolidaySchedulesSupported<br/><span class="attr-cn">Holiday Schedules</span></td>
          <td>uint8</td>
          <td>Total number of holiday schedules supported by the device (applies globally, overrides regular schedules)</td>
        </tr>
        <tr id="attr-0x16">
          <td><code>0x16</code></td>
          <td>MaxPINCodeLength<br/><span class="attr-cn">Max PIN Length</span></td>
          <td>uint8</td>
          <td>Maximum number of characters for a PIN code</td>
        </tr>
        <tr id="attr-0x17">
          <td><code>0x17</code></td>
          <td>MinPINCodeLength<br/><span class="attr-cn">Min PIN Length</span></td>
          <td>uint8</td>
          <td>Minimum number of characters required for a PIN code</td>
        </tr>
        <tr id="attr-0x18">
          <td><code>0x18</code></td>
          <td>MaxRFIDCodeLength<br/><span class="attr-cn">Max RFID Length</span></td>
          <td>uint8</td>
          <td>Maximum number of bytes for an RFID code</td>
        </tr>
        <tr id="attr-0x19">
          <td><code>0x19</code></td>
          <td>MinRFIDCodeLength<br/><span class="attr-cn">Min RFID Length</span></td>
          <td>uint8</td>
          <td>Minimum number of bytes required for an RFID code</td>
        </tr>
        <tr id="attr-0x1A">
          <td><code>0x1A</code></td>
          <td>CredentialRulesSupport<br/><span class="attr-cn">Credential Rules</span></td>
          <td>bitmap8</td>
          <td>Supported credential verification rules (see bitmap below)</td>
        </tr>
        <tr id="attr-0x1B">
          <td><code>0x1B</code></td>
          <td>NumberOfCredentialsSupportedPerUser<br/><span class="attr-cn">Credentials Per User</span></td>
          <td>uint8</td>
          <td>Maximum number of credentials that can be bound to each user</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>CredentialRulesSupport Bitmap</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Single</span>
        <span class="enum-desc">Supports single credential to unlock</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Dual</span>
        <span class="enum-desc">Supports dual credential verification (e.g., PIN + fingerprint)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Tri</span>
        <span class="enum-desc">Supports triple credential verification</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Credential Types</div>
    <p>
      Matter-defined credential types include: PIN (numeric passcode), RFID (card), Fingerprint, FingerVein, and Face.
      Which credential types are actually supported depends on the door lock hardware. Credentials are managed via the <code>SetCredential</code> command.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 操作与显示 0x1C-0x27 -->
  <h3 id="attr-operating">Operation & Display (0x1C-0x27)</h3>
  <p>Controls the door lock's operating behavior, display settings, and local programming features.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x1C">
          <td><code>0x1C</code></td>
          <td>Language<br/><span class="attr-cn">Interface Language</span></td>
          <td>string</td>
          <td>Lock interface display language, 2-character ISO 639-1 code (e.g., "en", "zh")</td>
        </tr>
        <tr id="attr-0x1D">
          <td><code>0x1D</code></td>
          <td>LEDSettings<br/><span class="attr-cn">LED Settings</span></td>
          <td>uint8</td>
          <td>Which operations cause the LED indicator to light up (see enum below)</td>
        </tr>
        <tr id="attr-0x1E">
          <td><code>0x1E</code></td>
          <td>AutoRelockTime<br/><span class="attr-cn">Auto Re-lock Time</span></td>
          <td>uint32</td>
          <td>Wait time before automatic re-locking after unlock, in seconds. <code>0</code> means no automatic re-locking</td>
        </tr>
        <tr id="attr-0x1F">
          <td><code>0x1F</code></td>
          <td>SoundVolume<br/><span class="attr-cn">Sound Volume</span></td>
          <td>uint8</td>
          <td>Volume level of the door lock's operation notification sound (see enum below)</td>
        </tr>
        <tr id="attr-0x20">
          <td><code>0x20</code></td>
          <td>OperatingMode<br/><span class="attr-cn">Operating Mode</span></td>
          <td>enum8</td>
          <td>The door lock's current operating mode (see enum below)</td>
        </tr>
        <tr id="attr-0x21">
          <td><code>0x21</code></td>
          <td>SupportedOperatingModes<br/><span class="attr-cn">Supported Operating Modes</span></td>
          <td>bitmap16</td>
          <td>Which operating modes the device supports (bitmask corresponding to OperatingMode enum values)</td>
        </tr>
        <tr id="attr-0x22">
          <td><code>0x22</code></td>
          <td>DefaultConfigurationRegister<br/><span class="attr-cn">Default Config Register</span></td>
          <td>bitmap16</td>
          <td>Indicates which configuration items have been modified from factory defaults</td>
        </tr>
        <tr id="attr-0x23">
          <td><code>0x23</code></td>
          <td>EnableLocalProgramming<br/><span class="attr-cn">Local Programming</span></td>
          <td>bool</td>
          <td>Whether local adding/modifying of users and credentials via the lock panel is allowed</td>
        </tr>
        <tr id="attr-0x24">
          <td><code>0x24</code></td>
          <td>EnableOneTouchLocking<br/><span class="attr-cn">One-Touch Locking</span></td>
          <td>bool</td>
          <td>Whether one-touch locking is enabled (touch the panel to lock the door)</td>
        </tr>
        <tr id="attr-0x25">
          <td><code>0x25</code></td>
          <td>EnableInsideStatusLED<br/><span class="attr-cn">Inside Status LED</span></td>
          <td>bool</td>
          <td>Whether the status indicator LED on the inside of the door lock is enabled</td>
        </tr>
        <tr id="attr-0x26">
          <td><code>0x26</code></td>
          <td>EnablePrivacyModeButton<br/><span class="attr-cn">Privacy Mode Button</span></td>
          <td>bool</td>
          <td>Whether the physical privacy mode button is enabled (when pressed, remote operations are rejected)</td>
        </tr>
        <tr id="attr-0x27">
          <td><code>0x27</code></td>
          <td>LocalProgrammingFeatures<br/><span class="attr-cn">Local Programming Features</span></td>
          <td>bitmap8</td>
          <td>Specific features allowed via local programming (adding users, modifying schedules, etc.)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>LEDSettings Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Never</span>
        <span class="enum-desc">LED never lights up</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AccessLockUnlock</span>
        <span class="enum-desc">Lights up only during lock/unlock operations</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAccessLockUnlock</span>
        <span class="enum-desc">Lights up only during non-lock/unlock operations</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">All</span>
        <span class="enum-desc">Lights up for all operations</span>
      </div>
    </div>
  </div>

  <h4>SoundVolume Enum Values</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Silent</span>
        <span class="enum-desc">Silent</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Low</span>
        <span class="enum-desc">Low volume</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">High</span>
        <span class="enum-desc">High volume</span>
      </div>
    </div>
  </div>

  <h4>OperatingMode Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Normal</span>
        <span class="enum-desc">Normal mode, all users can operate normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Vacation</span>
        <span class="enum-desc">Vacation mode, remote operations restricted</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Privacy</span>
        <span class="enum-desc">Privacy mode, only local operations allowed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NoRemoteLockUnlock</span>
        <span class="enum-desc">Remote lock/unlock disabled</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Passage</span>
        <span class="enum-desc">Passage mode, door remains unlocked</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- 远程操作 0x30-0x33 -->
  <h3 id="attr-remote">Remote Operation (0x30-0x33)</h3>
  <p>Attributes related to remote (network/wireless) operation security policies.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x30">
          <td><code>0x30</code></td>
          <td>WrongCodeEntryLimit<br/><span class="attr-cn">Wrong Code Limit</span></td>
          <td>uint8</td>
          <td>Maximum number of consecutive incorrect code entries before triggering a temporary lockout</td>
        </tr>
        <tr id="attr-0x31">
          <td><code>0x31</code></td>
          <td>UserCodeTemporaryDisableTime<br/><span class="attr-cn">Lockout Duration</span></td>
          <td>uint8</td>
          <td>Disable time after temporary lockout is triggered, in seconds</td>
        </tr>
        <tr id="attr-0x32">
          <td><code>0x32</code></td>
          <td>SendPINOverTheAir<br/><span class="attr-cn">Send PIN Over Air</span></td>
          <td>bool</td>
          <td>Whether sending PIN codes over wireless networks is allowed (security-related, generally recommended to disable)</td>
        </tr>
        <tr id="attr-0x33">
          <td><code>0x33</code></td>
          <td>RequirePINforRemoteOperation<br/><span class="attr-cn">Require PIN for Remote</span></td>
          <td>bool</td>
          <td>Whether remote (app/network) operations must include a PIN code. When <code>true</code>, LockDoor/UnlockDoor commands must carry a valid PIN</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Security Note</div>
    <p>
      <code>WrongCodeEntryLimit</code> and <code>UserCodeTemporaryDisableTime</code> together form the door lock's brute-force protection mechanism.
      A typical configuration is lockout for 60 seconds after 5 wrong entries. The app should warn the user before reaching the limit to avoid accidentally triggering a lockout.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- Aliro NFC 门禁 0x80-0x88 -->
  <h3 id="attr-aliro">Aliro NFC Access (0x80-0x88)</h3>
  <p>
    Aliro is a new NFC tap-to-unlock standard introduced by Matter for door locks. It supports automatic unlocking when a phone is brought near the door lock, similar to the Apple digital car key experience.
    Managed via <code>SetAliroReaderConfig</code> / <code>ClearAliroReaderConfig</code> commands.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x80">
          <td><code>0x80</code></td>
          <td>AliroReaderVerificationKey<br/><span class="attr-cn">Reader Verification Key</span></td>
          <td>octstr</td>
          <td>Public key used to verify the reader's identity</td>
        </tr>
        <tr id="attr-0x81">
          <td><code>0x81</code></td>
          <td>AliroReaderGroupIdentifier<br/><span class="attr-cn">Reader Group ID</span></td>
          <td>octstr</td>
          <td>Identifier for the group the reader belongs to; readers in the same group share access permissions</td>
        </tr>
        <tr id="attr-0x82">
          <td><code>0x82</code></td>
          <td>AliroReaderGroupSubIdentifier<br/><span class="attr-cn">Reader Sub-ID</span></td>
          <td>octstr</td>
          <td>Unique sub-identifier for the reader within its group</td>
        </tr>
        <tr id="attr-0x83">
          <td><code>0x83</code></td>
          <td>AliroExpeditedTransactionSupportedProtocolVersions<br/><span class="attr-cn">Expedited Protocol Versions</span></td>
          <td>list</td>
          <td>List of supported expedited (no full handshake required) transaction protocol versions</td>
        </tr>
        <tr id="attr-0x84">
          <td><code>0x84</code></td>
          <td>AliroGroupResolvingKey<br/><span class="attr-cn">Group Resolving Key</span></td>
          <td>octstr</td>
          <td>Key used to resolve and identify Aliro group membership</td>
        </tr>
        <tr id="attr-0x85">
          <td><code>0x85</code></td>
          <td>AliroSupportedBLEUWBProtocolVersions<br/><span class="attr-cn">BLE UWB Protocol Versions</span></td>
          <td>list</td>
          <td>List of supported BLE and UWB protocol versions (used for ranging and positioning)</td>
        </tr>
        <tr id="attr-0x86">
          <td><code>0x86</code></td>
          <td>AliroBLEAdvertisingVersion<br/><span class="attr-cn">BLE Advertising Version</span></td>
          <td>uint8</td>
          <td>BLE advertising protocol version of the Aliro reader</td>
        </tr>
        <tr id="attr-0x87">
          <td><code>0x87</code></td>
          <td>NumberOfAliroCredentialIssuerKeysSupported<br/><span class="attr-cn">Issuer Keys Count</span></td>
          <td>uint16</td>
          <td>Number of Aliro credential issuer keys supported by the device</td>
        </tr>
        <tr id="attr-0x88">
          <td><code>0x88</code></td>
          <td>NumberOfAliroEndpointKeysSupported<br/><span class="attr-cn">Endpoint Keys Count</span></td>
          <td>uint16</td>
          <td>Number of Aliro endpoint keys supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 标准示例 ====== -->
  <h2 id="standard-example">Standard Example</h2>
  <p>Below is a typical attribute data example for a Matter door lock (JSON format), with field-by-field annotations:</p>

  <pre><code>{
  // --- Lock Core State ---
  "0x00": 1,           // LockState = Locked
  "0x01": 0,           // LockType = DeadBolt
  "0x02": true,        // ActuatorEnabled = true (actuator enabled)
  "0x03": 1,           // DoorState = Closed

  // --- Users & Credentials ---
  "0x10": 10,          // NumberOfTotalUsersSupported = 10
  "0x11": 10,          // NumberOfPINUsersSupported = 10
  "0x16": 8,           // MaxPINCodeLength = 8 digits
  "0x17": 4,           // MinPINCodeLength = 4 digits
  "0x1B": 5,           // NumberOfCredentialsSupportedPerUser = 5

  // --- Operation & Display ---
  "0x1E": 30,          // AutoRelockTime = 30 seconds
  "0x1F": 2,           // SoundVolume = High
  "0x20": 0,           // OperatingMode = Normal
  "0x21": 65535,       // SupportedOperatingModes (all modes supported)

  // --- Remote Operation ---
  "0x30": 5,           // WrongCodeEntryLimit = 5 attempts
  "0x33": false        // RequirePINforRemoteOperation = false
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When reading data from a device, attribute IDs are hexadecimal strings used as keys. In the JSON above, <code>"0x00"</code> corresponds to LockState,
      and <code>"0x20"</code> corresponds to OperatingMode. Cross-reference with the attribute table on this page for each field.
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-lock-unlock">Scenario 1: Remote Lock / Unlock</h3>
  <ol>
    <li>Read <code>ActuatorEnabled (0x02)</code> to confirm the actuator is enabled</li>
    <li>Read <code>RequirePINforRemoteOperation (0x33)</code> to determine if user PIN input is required</li>
    <li>Send <code>LockDoor (0x00)</code> or <code>UnlockDoor (0x01)</code> command (must use Timed Interaction)</li>
    <li>Subscribe to <code>LockState (0x00)</code> changes to confirm the operation result</li>
  </ol>

  <h3 id="scenario-add-user">Scenario 2: Add New User and PIN Code</h3>
  <ol>
    <li>Read <code>NumberOfTotalUsersSupported (0x10)</code> to check user capacity</li>
    <li>Send <code>SetUser (0x26)</code> to create the user</li>
    <li>Read <code>MinPINCodeLength (0x17)</code> and <code>MaxPINCodeLength (0x16)</code> to verify PIN length requirements</li>
    <li>Send <code>SetCredential (0x1A)</code> to bind a PIN code to that user</li>
    <li>Optionally use <code>GetCredentialStatus (0x1B)</code> to verify the credential was set successfully</li>
  </ol>

  <h3 id="scenario-check-state">Scenario 3: Display Lock Status on Home Screen</h3>
  <ol>
    <li>Read <code>LockState (0x00)</code> &mdash; handle the <code>null</code> value properly</li>
    <li>Read <code>OperatingMode (0x20)</code> &mdash; if not Normal, the UI may need to show a notice</li>
    <li>Read battery level from the PowerSource Cluster alongside lock status</li>
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
  'window-covering': {
    title: 'WindowCovering Cluster (0x0102)',
    description: 'Complete reference for Matter WindowCovering Cluster (0x0102) — UpOrOpen/DownOrClose/GoToLiftPercentage commands, lift and tilt position attributes, Feature Map (LF/TL/PA/AB), Type/EndProductType enums, OperationalStatus/SafetyStatus bitmaps, and common scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>WindowCovering Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0102</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on <code>Endpoint 1</code> (application endpoint)
  </p>
  <p>
    WindowCovering is the core Cluster in Matter for controlling window covering devices. It applies to motorized roller shades, venetian blinds, curtain tracks, awnings, projector screens, and all devices requiring lift or tilt control.
    It defines motion control commands, position feedback attributes, and a complete description of device types and safety states.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Position Value Convention: 0 = Fully Open, 10000 = Fully Closed</div>
    <p>
      WindowCovering uses <strong>percent100ths</strong> (hundredths of a percent) to represent positions, ranging from 0&ndash;10000.
      <code>0</code> represents fully open (covering retracted), <code>10000</code> represents fully closed (covering extended).
      This may be counterintuitive &mdash; the larger the value, the more coverage. Percentage attributes (such as CurrentPositionLiftPercentage) range from 0&ndash;100 with the same meaning.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The WindowCovering Cluster has 7 commands. The basic trio (UpOrOpen / DownOrClose / StopMotion) is supported by all window covering devices.
    The four precise positioning commands require the device to have the corresponding Feature combinations enabled.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>UpOrOpen</td>
          <td>Raise / open the covering</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>DownOrClose</td>
          <td>Lower / close the covering</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>StopMotion</td>
          <td>Stop all motion immediately</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>GoToLiftValue</td>
          <td>Move lift to a specified absolute value</td>
          <td class="col-required">LF + AB</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>GoToLiftPercentage</td>
          <td>Move lift to a specified percentage</td>
          <td class="col-required">LF + PA</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>GoToTiltValue</td>
          <td>Move tilt to a specified absolute value</td>
          <td class="col-required">TL + AB</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>GoToTiltPercentage</td>
          <td>Move tilt to a specified percentage</td>
          <td class="col-required">TL + PA</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">UpOrOpen &mdash; Raise / Open (0x00)</h3>
  <p>
    Moves the covering toward the fully open position. For roller shades this means retracting upward; for curtain tracks, pulling apart to both sides.
    Requires no parameters. The device begins moving immediately upon receipt, until it reaches the fully open position or a StopMotion command is received.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Called when the user taps the "Open covering" button in the app, when a voice assistant executes "open the curtains", or when a good-morning automation scene is triggered.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">DownOrClose &mdash; Lower / Close (0x01)</h3>
  <p>
    Moves the covering toward the fully closed position. For roller shades this means extending downward; for curtain tracks, drawing together to the center.
    Requires no parameters. The device moves to the fully closed position immediately upon receipt.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Called when the user taps the "Close covering" button, when a good-night scene automatically closes coverings, or when a light sensor detects bright light.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">StopMotion &mdash; Stop Motion (0x02)</h3>
  <p>
    Immediately stops all axis motion (both lift and tilt). Requires no parameters.
    After stopping, all motion bits in <code>OperationalStatus</code> are cleared to zero.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        While the covering is in motion, the user can tap the control button again to send StopMotion, stopping the covering at its current position.
        Also used for safety protection &mdash; emergency stop when an obstacle or anomaly is detected.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">GoToLiftValue &mdash; Lift to Absolute Value (0x04)</h3>
  <p>
    Moves the covering lift to a specified absolute position value. This value corresponds to the device's internal physical units (such as motor steps),
    with the range determined by <code>InstalledOpenLimitLift</code> and <code>InstalledClosedLimitLift</code>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LiftValue</td>
          <td>uint16</td>
          <td>Target lift position absolute value</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Used when precise control to a physical scale position is needed. For most scenarios, GoToLiftPercentage is recommended (percentages are more intuitive).</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">GoToLiftPercentage &mdash; Lift to Percentage (0x05)</h3>
  <p>
    Moves the covering lift to a specified percentage position. This is the most commonly used precise control command.
    The parameter uses percent100ths (hundredths of a percent, range 0&ndash;10000): <code>0</code> = fully open, <code>10000</code> = fully closed.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LiftPercent100thsValue</td>
          <td>percent100ths</td>
          <td>Target lift position. <code>0</code> = fully open, <code>5000</code> = half open, <code>10000</code> = fully closed</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios & Parameters</summary>
    <div class="scenario-content">
      <p>
        When the slider control in the app is dragged to 30%, send GoToLiftPercentage (LiftPercent100thsValue = 3000).
        A voice command like "open halfway" can send 5000. It is recommended to display the slider as "openness" in the app (0% = fully closed, 100% = fully open),
        and convert when sending: <code>10000 - userValue * 100</code>.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">GoToTiltValue &mdash; Tilt to Absolute Value (0x07)</h3>
  <p>
    Tilts the blind slats to a specified absolute position value. Only supported by blind-type devices with tilt capability.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TiltValue</td>
          <td>uint16</td>
          <td>Target tilt position absolute value</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">GoToTiltPercentage &mdash; Tilt to Percentage (0x08)</h3>
  <p>
    Tilts the blind slats to a specified percentage position. The logic is consistent with lift percentage:
    <code>0</code> = slats fully open (parallel to the window), <code>10000</code> = slats fully closed (perpendicular to the window).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TiltPercent100thsValue</td>
          <td>percent100ths</td>
          <td>Target tilt position. <code>0</code> = slats fully open, <code>10000</code> = slats fully closed</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Adjusting the slat angle on venetian blinds. For example, during afternoon direct sunlight, tilting slats to 7000 (70% closed) provides shade while maintaining ventilation.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>WindowCovering Cluster attributes are organized into four functional groups. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Group</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- 类型与配置 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>Type</td>
          <td>enum8</td>
          <td><a href="#group-type">Type & Configuration</a></td>
          <td>Covering type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000D">
          <td><a href="#attr-0x000D"><code>0x000D</code></a></td>
          <td>EndProductType</td>
          <td>enum8</td>
          <td><a href="#group-type">Type & Configuration</a></td>
          <td>End product type</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ConfigStatus</td>
          <td>bitmap8</td>
          <td><a href="#group-type">Type & Configuration</a></td>
          <td>Configuration and operational status flags</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0017">
          <td><a href="#attr-0x0017"><code>0x0017</code></a></td>
          <td>Mode</td>
          <td>bitmap8</td>
          <td><a href="#group-type">Type & Configuration</a></td>
          <td>Operating mode flags</td>
        </tr>
        <!-- 升降位置 -->
        <tr class="clickable-row" data-href="#attr-0x000B">
          <td><a href="#attr-0x000B"><code>0x000B</code></a></td>
          <td>TargetPositionLiftPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Target lift position</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000E">
          <td><a href="#attr-0x000E"><code>0x000E</code></a></td>
          <td>CurrentPositionLiftPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Current lift position (high precision)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>CurrentPositionLiftPercentage</td>
          <td>uint8 / null</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Current lift position (percentage)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>CurrentPositionLift</td>
          <td>uint16 / null</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Current lift absolute value</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>PhysicalClosedLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Physical closed limit value</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0010">
          <td><a href="#attr-0x0010"><code>0x0010</code></a></td>
          <td>InstalledOpenLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Installed open limit</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0011">
          <td><a href="#attr-0x0011"><code>0x0011</code></a></td>
          <td>InstalledClosedLimitLift</td>
          <td>uint16</td>
          <td><a href="#group-lift">Lift Position</a></td>
          <td>Installed closed limit</td>
        </tr>
        <!-- 倾斜位置 -->
        <tr class="clickable-row" data-href="#attr-0x000C">
          <td><a href="#attr-0x000C"><code>0x000C</code></a></td>
          <td>TargetPositionTiltPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Target tilt position</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000F">
          <td><a href="#attr-0x000F"><code>0x000F</code></a></td>
          <td>CurrentPositionTiltPercent100ths</td>
          <td>percent100ths / null</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Current tilt position (high precision)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>CurrentPositionTiltPercentage</td>
          <td>uint8 / null</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Current tilt position (percentage)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentPositionTilt</td>
          <td>uint16 / null</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Current tilt absolute value</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>PhysicalClosedLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Physical closed limit value</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0012">
          <td><a href="#attr-0x0012"><code>0x0012</code></a></td>
          <td>InstalledOpenLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Installed open limit</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0013">
          <td><a href="#attr-0x0013"><code>0x0013</code></a></td>
          <td>InstalledClosedLimitTilt</td>
          <td>uint16</td>
          <td><a href="#group-tilt">Tilt Position</a></td>
          <td>Installed closed limit</td>
        </tr>
        <!-- Operational Status -->
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>OperationalStatus</td>
          <td>bitmap8</td>
          <td><a href="#group-status">Operational Status</a></td>
          <td>Motion direction per axis</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x001A">
          <td><a href="#attr-0x001A"><code>0x001A</code></a></td>
          <td>SafetyStatus</td>
          <td>bitmap16</td>
          <td><a href="#group-status">Operational Status</a></td>
          <td>Safety anomaly flags</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 类型与配置（0x0000, 0x000D, 0x0007, 0x0017）====== -->
  <h3 id="group-type">Type & Configuration (0x0000, 0x000D, 0x0007, 0x0017)</h3>
  <p>Describes the physical type, product classification, and current configuration and operating mode of the window covering device.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>Type<br/><span class="attr-cn">Covering Type</span></td>
          <td>enum8</td>
          <td>Mechanical type of the covering (see enum below), determines whether the device supports lift, tilt, or both</td>
        </tr>
        <tr id="attr-0x000D">
          <td><code>0x000D</code></td>
          <td>EndProductType<br/><span class="attr-cn">End Product Type</span></td>
          <td>enum8</td>
          <td>More granular product classification (see enum below), used by the app to display appropriate icons and controls</td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ConfigStatus<br/><span class="attr-cn">Config Status</span></td>
          <td>bitmap8</td>
          <td>Device configuration and capability flags (see bitmap below)</td>
        </tr>
        <tr id="attr-0x0017">
          <td><code>0x0017</code></td>
          <td>Mode<br/><span class="attr-cn">Operating Mode</span></td>
          <td>bitmap8</td>
          <td>Device operating mode flags (see bitmap below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Type Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Rollershade</span>
        <span class="enum-desc">Roller shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Rollershade - 2 Motor</span>
        <span class="enum-desc">Dual-motor roller shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Rollershade - Exterior</span>
        <span class="enum-desc">Exterior roller shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Rollershade - Exterior - 2 Motor</span>
        <span class="enum-desc">Exterior dual-motor roller shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Drapery</span>
        <span class="enum-desc">Drapery (side-opening curtain)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Awning</span>
        <span class="enum-desc">Awning</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Shutter</span>
        <span class="enum-desc">Shutter / roller shutter</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">TiltBlindTiltOnly</span>
        <span class="enum-desc">Tilt blind (tilt only)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">TiltBlindLiftAndTilt</span>
        <span class="enum-desc">Tilt blind (lift + tilt)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">ProjectorScreen</span>
        <span class="enum-desc">Projector screen</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown type</span>
      </div>
    </div>
  </div>

  <h4>EndProductType Enum Values</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">RollerShade</span>
        <span class="enum-desc">Roller shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">RomanShade</span>
        <span class="enum-desc">Roman shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">BalloonShade</span>
        <span class="enum-desc">Balloon shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">WovenWood</span>
        <span class="enum-desc">Woven wood shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">PleatedShade</span>
        <span class="enum-desc">Pleated shade / cellular shade</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">RollerShutter</span>
        <span class="enum-desc">Roller shutter</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">ExteriorVenetianBlind</span>
        <span class="enum-desc">Exterior venetian blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">LateralLeftCurtain</span>
        <span class="enum-desc">Lateral left curtain</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">LateralRightCurtain</span>
        <span class="enum-desc">Lateral right curtain</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">CentralCurtain</span>
        <span class="enum-desc">Central (split-draw) curtain</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">RollerCurtain</span>
        <span class="enum-desc">Roller curtain</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">ExteriorVerticalScreen</span>
        <span class="enum-desc">Exterior vertical screen</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">AwningTerracePatio</span>
        <span class="enum-desc">Terrace/patio awning</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">AwningVerticalScreen</span>
        <span class="enum-desc">Vertical awning screen</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">14</span>
      <div>
        <span class="enum-name">TiltOnlyInteriorBlind</span>
        <span class="enum-desc">Interior blind (tilt only)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">15</span>
      <div>
        <span class="enum-name">InteriorBlind</span>
        <span class="enum-desc">Interior blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">16</span>
      <div>
        <span class="enum-name">VerticalBlindStripCurtain</span>
        <span class="enum-desc">Vertical blind / strip curtain</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">17</span>
      <div>
        <span class="enum-name">InteriorVenetianBlind</span>
        <span class="enum-desc">Interior venetian blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">18</span>
      <div>
        <span class="enum-name">ExteriorVenetianBlind</span>
        <span class="enum-desc">Exterior venetian blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">19</span>
      <div>
        <span class="enum-name">LateralLeftVerticalBlind</span>
        <span class="enum-desc">Lateral left vertical blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">20</span>
      <div>
        <span class="enum-name">LateralRightVerticalBlind</span>
        <span class="enum-desc">Lateral right vertical blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">21</span>
      <div>
        <span class="enum-name">CentralVerticalBlind</span>
        <span class="enum-desc">Central (split-draw) vertical blind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">22</span>
      <div>
        <span class="enum-name">RollerShutterTerrace</span>
        <span class="enum-desc">Terrace roller shutter</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">23</span>
      <div>
        <span class="enum-name">ProjectorScreen</span>
        <span class="enum-desc">Projector screen</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">255</span>
      <div>
        <span class="enum-name">Unknown</span>
        <span class="enum-desc">Unknown product type</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Type vs EndProductType</div>
    <p>
      <code>Type</code> determines the device's mechanical capabilities (lift, tilt, or both), which affects available features and commands.
      <code>EndProductType</code> is a more granular product classification, primarily used by the app to select appropriate icons and control interfaces.
      Both are fixed at factory and cannot be modified.
    </p>
  </div>

  <h4>ConfigStatus Bitmap</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">Operational</span>
        <span class="enum-desc">Device operational (1 = ready, 0 = not ready)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">OnlineReserved</span>
        <span class="enum-desc">Online (reserved bit, currently always 1)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">LiftMovementReversed</span>
        <span class="enum-desc">Lift movement reversed (1 = motor runs in reverse)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">LiftPositionAware</span>
        <span class="enum-desc">Lift position aware (1 = can report precise position)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">TiltPositionAware</span>
        <span class="enum-desc">Tilt position aware (1 = can report precise tilt angle)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">LiftEncoderControlled</span>
        <span class="enum-desc">Lift encoder controlled (1 = uses encoder for position feedback)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">TiltEncoderControlled</span>
        <span class="enum-desc">Tilt encoder controlled (1 = uses encoder for angle feedback)</span>
      </div>
    </div>
  </div>

  <h4>Mode Bitmap</h4>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">MotorDirectionReversed</span>
        <span class="enum-desc">Motor direction reversed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">CalibrationMode</span>
        <span class="enum-desc">Calibration mode (device is calibrating travel limits)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">MaintenanceMode</span>
        <span class="enum-desc">Maintenance mode (device has suspended normal operation)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">LEDFeedback</span>
        <span class="enum-desc">LED feedback (1 = LED indicates during motion)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 升降位置 ====== -->
  <h3 id="group-lift">Lift Position (0x0001&ndash;0x0011)</h3>
  <p>Describes the current position, target position, and travel limits of the covering's lift axis. All lift attributes require the device to support the <strong>LF (Lift)</strong> feature.</p>

  <div class="callout callout-warning">
    <div class="callout-title">Difference Between percent100ths and percentage</div>
    <p>
      <code>CurrentPositionLiftPercent100ths</code> ranges from <strong>0&ndash;10000</strong> (0.01% precision),
      while <code>CurrentPositionLiftPercentage</code> ranges from <strong>0&ndash;100</strong> (1% precision).
      Both represent the same position; percent100ths has higher precision and should be preferred in development.
    </p>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000B">
          <td><code>0x000B</code></td>
          <td>TargetPositionLiftPercent100ths<br/><span class="attr-cn">Target Lift Position</span></td>
          <td>percent100ths / null</td>
          <td>The target lift position the covering is moving toward. During motion this differs from the current position; they match once stopped. <code>null</code> means unknown.<strong>Requires LF + PA</strong></td>
        </tr>
        <tr id="attr-0x000E">
          <td><code>0x000E</code></td>
          <td>CurrentPositionLiftPercent100ths<br/><span class="attr-cn">Current Lift Position (High Precision)</span></td>
          <td>percent100ths / null</td>
          <td>Current lift position, 0 = fully open, 10000 = fully closed. Updates in real time during motion. <code>null</code> means position unknown (e.g., just powered on and not yet calibrated).<strong>Requires LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>CurrentPositionLiftPercentage<br/><span class="attr-cn">Current Lift Percentage</span></td>
          <td>uint8 / null</td>
          <td>Coarse percentage of the current lift position (0&ndash;100). A lower-precision version of Percent100ths.<strong>Requires LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>CurrentPositionLift<br/><span class="attr-cn">Current Lift Absolute Value</span></td>
          <td>uint16 / null</td>
          <td>Absolute value of the current lift position (device-internal units).<strong>Requires LF + AB</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>PhysicalClosedLimitLift<br/><span class="attr-cn">Physical Closed Limit</span></td>
          <td>uint16</td>
          <td>Absolute value upper limit of the lift axis physical closed position.<strong>Requires LF + AB</strong></td>
        </tr>
        <tr id="attr-0x0010">
          <td><code>0x0010</code></td>
          <td>InstalledOpenLimitLift<br/><span class="attr-cn">Installed Open Limit</span></td>
          <td>uint16</td>
          <td>Absolute value of the actual fully open position reachable after installation. <strong>Requires LF + PA</strong></td>
        </tr>
        <tr id="attr-0x0011">
          <td><code>0x0011</code></td>
          <td>InstalledClosedLimitLift<br/><span class="attr-cn">Installed Closed Limit</span></td>
          <td>uint16</td>
          <td>Absolute value of the actual fully closed position reachable after installation. <strong>Requires LF + PA</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 倾斜位置 ====== -->
  <h3 id="group-tilt">Tilt Position (0x0002&ndash;0x0013)</h3>
  <p>Describes the current position, target position, and travel limits of the covering's tilt axis (blind slat angle). All tilt attributes require the device to support the <strong>TL (Tilt)</strong> feature.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000C">
          <td><code>0x000C</code></td>
          <td>TargetPositionTiltPercent100ths<br/><span class="attr-cn">Target Tilt Position</span></td>
          <td>percent100ths / null</td>
          <td>The target tilt position the slats are moving toward. <code>null</code> means unknown.<strong>Requires TL + PA</strong></td>
        </tr>
        <tr id="attr-0x000F">
          <td><code>0x000F</code></td>
          <td>CurrentPositionTiltPercent100ths<br/><span class="attr-cn">Current Tilt Position (High Precision)</span></td>
          <td>percent100ths / null</td>
          <td>Current slat tilt position, 0 = slats fully open, 10000 = slats fully closed.<strong>Requires TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>CurrentPositionTiltPercentage<br/><span class="attr-cn">Current Tilt Percentage</span></td>
          <td>uint8 / null</td>
          <td>Coarse percentage of the current slat tilt position (0&ndash;100).<strong>Requires TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentPositionTilt<br/><span class="attr-cn">Current Tilt Absolute Value</span></td>
          <td>uint16 / null</td>
          <td>Absolute value of the current slat tilt position.<strong>Requires TL + AB</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>PhysicalClosedLimitTilt<br/><span class="attr-cn">Physical Closed Limit</span></td>
          <td>uint16</td>
          <td>Absolute value upper limit of the tilt axis physical closed position.<strong>Requires TL + AB</strong></td>
        </tr>
        <tr id="attr-0x0012">
          <td><code>0x0012</code></td>
          <td>InstalledOpenLimitTilt<br/><span class="attr-cn">Installed Open Limit</span></td>
          <td>uint16</td>
          <td>Absolute value of the actual slat fully open position reachable after installation.<strong>Requires TL + PA</strong></td>
        </tr>
        <tr id="attr-0x0013">
          <td><code>0x0013</code></td>
          <td>InstalledClosedLimitTilt<br/><span class="attr-cn">Installed Closed Limit</span></td>
          <td>uint16</td>
          <td>Absolute value of the actual slat fully closed position reachable after installation.<strong>Requires TL + PA</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Operational Status ====== -->
  <h3 id="group-status">Operational Status(0x000A, 0x001A)</h3>
  <p>Describes the current motion direction and safety status of the covering.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>ID</th><th>Name</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>OperationalStatus<br/><span class="attr-cn">Operational Status</span></td>
          <td>bitmap8</td>
          <td>Current motion direction of each axis (see bitmap below). All zeros means stopped</td>
        </tr>
        <tr id="attr-0x001A">
          <td><code>0x001A</code></td>
          <td>SafetyStatus<br/><span class="attr-cn">Safety Status</span></td>
          <td>bitmap16</td>
          <td>Safety anomaly flags (see bitmap below). Any bit set to 1 indicates an anomaly</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>OperationalStatus Bitmap</h4>
  <div class="callout callout-info">
    <div class="callout-title">Encoding</div>
    <p>
      OperationalStatus uses 3 groups of 2-bit fields to indicate the motion direction of three axes:
      <code>00</code> = stopped, <code>01</code> = opening (toward 0), <code>10</code> = closing (toward 10000).
    </p>
  </div>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0&ndash;1</span>
      <div>
        <span class="enum-name">Global</span>
        <span class="enum-desc">Global motion direction (combined lift and tilt overall status)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2&ndash;3</span>
      <div>
        <span class="enum-name">Lift</span>
        <span class="enum-desc">Lift axis motion direction</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4&ndash;5</span>
      <div>
        <span class="enum-name">Tilt</span>
        <span class="enum-desc">Tilt axis motion direction</span>
      </div>
    </div>
  </div>

  <h4>SafetyStatus Bitmap</h4>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">RemoteLockout</span>
        <span class="enum-desc">Remote lockout (device rejects remote operations)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TamperDetection</span>
        <span class="enum-desc">Tamper detection (device detected abnormal interference)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">FailedCommunication</span>
        <span class="enum-desc">Communication failure (failed to communicate with motor controller)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">PositionFailure</span>
        <span class="enum-desc">Position failure (position sensor malfunction)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ThermalProtection</span>
        <span class="enum-desc">Thermal protection (motor overheated, operation suspended)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">ObstacleDetected</span>
        <span class="enum-desc">Obstacle detected (obstruction in motion path)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 6</span>
      <div>
        <span class="enum-name">Power</span>
        <span class="enum-desc">Power anomaly (insufficient or interrupted power supply)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 7</span>
      <div>
        <span class="enum-name">StopInput</span>
        <span class="enum-desc">External stop signal (hardware stop input received)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 8</span>
      <div>
        <span class="enum-name">MotorJammed</span>
        <span class="enum-desc">Motor jammed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 9</span>
      <div>
        <span class="enum-name">HardwareFailure</span>
        <span class="enum-desc">Hardware failure</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 10</span>
      <div>
        <span class="enum-name">ManualOperation</span>
        <span class="enum-desc">Manual operation in progress (user is manually moving the covering)</span>
      </div>
    </div>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The WindowCovering Cluster declares supported capabilities via <code>FeatureMap</code> (0xFFFC). The combination of features determines which commands and attributes are available:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">LF（Lift）</span>
        <span class="enum-desc">Supports lift movement &mdash; the covering can move up and down</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">TL（Tilt）</span>
        <span class="enum-desc">Supports tilt adjustment &mdash; blind slats can rotate</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">PA（Position Aware Lift）</span>
        <span class="enum-desc">Position aware &mdash; can report and move to precise percentage positions</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">AB（Absolute Position）</span>
        <span class="enum-desc">Absolute position &mdash; supports positioning in device-internal units</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combinations and Device Types</div>
    <p>
      <strong>Motorized roller shade</strong>: typically LF + PA (supports lift and percentage positioning), FeatureMap = <code>0x05</code>.<br/>
      <strong>Venetian blind</strong>: typically LF + TL + PA (lift + tilt + position aware), FeatureMap = <code>0x07</code>.<br/>
      <strong>Tilt-only blind</strong>: typically TL + PA (tilt only), FeatureMap = <code>0x06</code>.<br/>
      After reading the FeatureMap, the app should decide whether to display lift controls, tilt controls, or both.
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read result from a WindowCovering Cluster of a motorized roller shade with lift + position awareness at the 30% position (near fully open):</p>

  <pre><code>{
  // --- Type & Configuration ---
  "0x0000": 0,              // Type = Rollershade (roller shade)
  "0x000D": 0,              // EndProductType = RollerShade
  "0x0007": 0x09,           // ConfigStatus = Operational + LiftPositionAware
  "0x0017": 0x00,           // Mode = normal operation (all bits 0)

  // --- Lift Position ---
  "0x000E": 3000,           // CurrentPositionLiftPercent100ths = 30.00%
  "0x0008": 30,             // CurrentPositionLiftPercentage = 30%
  "0x000B": 3000,           // TargetPositionLiftPercent100ths = 30.00% (target matches current, stopped)
  "0x0010": 0,              // InstalledOpenLimitLift = 0 (fully open position)
  "0x0011": 10000,          // InstalledClosedLimitLift = 10000 (fully closed position)

  // --- Operational Status ---
  "0x000A": 0x00,           // OperationalStatus = all axes stopped
  "0x001A": 0x0000          // SafetyStatus = no anomalies
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      For simple coverings that only support UpOrOpen / DownOrClose (no position awareness), percentage attributes may not exist.
      Check <code>FeatureMap (0xFFFC)</code> first to determine supported capabilities, then decide which attributes to read and which controls to display.
      Devices that do not support tilt will not report tilt-related attributes.
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Basic Open/Close Control</summary>
    <div class="scenario-content">
      <ol>
        <li>Send <code>UpOrOpen (0x00)</code> to open the covering, or <code>DownOrClose (0x01)</code> to close it</li>
        <li>Subscribe to <code>OperationalStatus (0x000A)</code> to monitor motion status</li>
        <li>During motion, the user can send <code>StopMotion (0x02)</code> to stop the covering at the current position</li>
        <li>Subscribe to <code>CurrentPositionLiftPercent100ths (0x000E)</code> to update the position display in the app in real time</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Precise Position Control via Slider</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports LF + PA features</li>
        <li>Display a 0%&ndash;100% slider in the app, where 0% = fully closed and 100% = fully open</li>
        <li>The user drags the slider to 70% (meaning 70% open), then send <code>GoToLiftPercentage (0x05)</code> with LiftPercent100thsValue = <code>3000</code> (since 0 = fully open, 100% - 70% = 30% = 3000)</li>
        <li>Subscribe to <code>CurrentPositionLiftPercent100ths</code> and <code>TargetPositionLiftPercent100ths</code>; the former tracks actual position, the latter can be used to display a target indicator</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 3: Blind Lift + Slat Tilt</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap</code> to confirm the device supports both LF + TL (lift and tilt)</li>
        <li>Display two controls in the app: a lift slider and a tilt slider</li>
        <li>Use <code>GoToLiftPercentage (0x05)</code> to control the covering height</li>
        <li>Use <code>GoToTiltPercentage (0x08)</code> to adjust the slat angle</li>
        <li>User scenario: "Lower the blind to half height, tilt slats 45 degrees to let light in while blocking the view" &mdash; send 5000 for lift and 5000 for tilt</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 4: Automation &mdash; Sunrise/Sunset Linkage</summary>
    <div class="scenario-content">
      <ol>
        <li>At sunrise in the morning, an automation rule triggers <code>UpOrOpen (0x00)</code> to open all coverings</li>
        <li>When afternoon sun is strong, trigger <code>GoToLiftPercentage (0x05)</code> to close to 70% (LiftPercent100thsValue = 7000)</li>
        <li>After sunset in the evening, trigger <code>DownOrClose (0x01)</code> to fully close</li>
        <li>Combined with a light sensor (IlluminanceMeasurement Cluster), smarter adaptive lighting control can be achieved</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 5: Error Handling</summary>
    <div class="scenario-content">
      <ol>
        <li>Subscribe to <code>SafetyStatus (0x001A)</code> to monitor safety anomalies</li>
        <li>If <code>ObstacleDetected</code> (Bit 5) is 1, it indicates an obstruction in the covering's path; the app should prompt the user to check</li>
        <li>If <code>MotorJammed</code> (Bit 8) is 1, the motor is jammed and may need service</li>
        <li>If <code>ThermalProtection</code> (Bit 4) is 1, the motor is in thermal protection mode and will automatically recover after cooling</li>
        <li>Check CalibrationMode (Bit 1) in <code>Mode (0x0017)</code>; if it is 1, the device is calibrating and will not accept position commands</li>
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
  'valve-configuration-and-control': {
    title: 'ValveConfigurationAndControl Cluster (0x0081)',
    description: 'Complete reference for Matter ValveConfigurationAndControl Cluster (0x0081) — Open/Close commands, opening percentage control, timed auto-close, valve state enums, fault bitmaps, event reporting, and all attribute and command definitions with enum value quick reference.',
    prev: undefined,
    next: undefined,
    content: `<h1>ValveConfigurationAndControl Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0081</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Typically on the <code>Valve Endpoint</code> (valve function endpoint)
  </p>
  <p>
    ValveConfigurationAndControl is the core Cluster in Matter for controlling valve devices,
    applicable to water valves, gas valves, irrigation valves, and other scenarios requiring "open/close/timed/level control" capabilities.
    It defines valve open/close commands, duration control, current/target state, opening percentage, fault detection, and event reporting.
    Unlike a simple OnOff switch, the Valve Cluster has built-in timed auto-close and precise level control,
    making it more suitable for fluid control scenarios that require safety protection.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature-Driven Capability Differences</div>
    <p>
      ValveConfigurationAndControl capabilities depend on two Features:
      <strong>TimeSync (TS)</strong> enables UTC timestamp-based auto-close capability,
      and <strong>Level (LVL)</strong> enables percentage opening control (0~100%).
      A simple water valve may only support fully open/fully closed, while an irrigation control valve may support both timed and level adjustment.
      Before development, read <code>FeatureMap (0xFFFC)</code> to determine what capabilities the device supports, then decide on the UI layout.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enums & Bitmaps</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#events">Events</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 命令（Commands）====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The ValveConfigurationAndControl Cluster has 2 commands: Open and Close.
    The Open command supports optional duration and target level parameters; the Close command takes no parameters and directly closes the valve.
    Click on a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Open</td>
          <td>Open the valve (optionally specify duration and level)</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Close</td>
          <td>Close the valve</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 命令详解 ====== -->
  <h3 id="cmd-0x00">Open &mdash; Open Valve (0x00)</h3>
  <p>
    Opens the valve. Optional parameters can specify the open duration and target level.
    If no parameters are provided, the valve opens fully for the duration specified by <code>DefaultOpenDuration</code>.
    If the valve is already open, sending another Open command updates the duration and target level.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>OpenDuration</td>
          <td>elapsed-s / null</td>
          <td>Optional</td>
          <td>Open duration in seconds. <code>null</code> means use the DefaultOpenDuration value. Omitting also uses the default</td>
        </tr>
        <tr>
          <td>TargetLevel</td>
          <td>percent</td>
          <td>Optional (requires LVL)</td>
          <td>Target opening percentage, 1~100. Omitting means fully open (100%). Requires <strong>LVL</strong> Feature</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Safety Note: DefaultOpenDuration</div>
    <p>
      If <code>DefaultOpenDuration</code> is <code>null</code> and the Open command also does not specify OpenDuration,
      the valve will remain open indefinitely until a Close command is received. For water and gas valves,
      it is recommended to always set a DefaultOpenDuration as a safety fallback to prevent the valve from remaining open long-term after a network disconnection, which could cause flooding or gas leaks.
    </p>
  </div>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        User taps "Open Water Valve" in the app, sending the Open command to open the valve.
        A garden irrigation system sends Open(OpenDuration=1800), opening the valve for 30 minutes before auto-closing.
        A smart HVAC system sends Open(TargetLevel=50), opening the valve to 50% to precisely control hot water flow.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">Close &mdash; Close Valve (0x01)</h3>
  <p>
    Closes the valve. Takes no parameters. On successful execution, <code>TargetState</code> changes to <code>Closed (0)</code>,
    and the valve begins its closing action. If the valve is currently in a timed open state, the Close command cancels the timer and closes the valve immediately.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        User manually closes the water valve; a water leak sensor detects a leak and an automation rule triggers an emergency valve close;
        a gas alarm triggers a linked gas valve closure.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性详解 ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ValveConfigurationAndControl Cluster attributes are organized into four functional groups. Click on an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- 属性汇总表 -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Group</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <!-- 定时参数 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>OpenDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>Current open duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>DefaultOpenDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>Default open duration (seconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>AutoCloseTime</td>
          <td>epoch-us / null</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>UTC timestamp for auto-close</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>RemainingDuration</td>
          <td>elapsed-s / null</td>
          <td><a href="#group-timing">Timing Parameters</a></td>
          <td>Remaining open time (seconds)</td>
        </tr>
        <!-- 阀门状态 -->
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>CurrentState</td>
          <td>ValveStateEnum / null</td>
          <td><a href="#group-state">Valve State</a></td>
          <td>Current valve state</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>TargetState</td>
          <td>ValveStateEnum / null</td>
          <td><a href="#group-state">Valve State</a></td>
          <td>Target valve state</td>
        </tr>
        <!-- 开度控制 -->
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>CurrentLevel</td>
          <td>percent / null</td>
          <td><a href="#group-level">Level Control</a></td>
          <td>Current opening percentage</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>TargetLevel</td>
          <td>percent / null</td>
          <td><a href="#group-level">Level Control</a></td>
          <td>Target opening percentage</td>
        </tr>
        <!-- 故障状态 -->
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>ValveFault</td>
          <td>ValveFaultBitmap</td>
          <td><a href="#group-fault">Fault Status</a></td>
          <td>Valve fault bitmap</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 定时参数（0x0000 ~ 0x0003）====== -->
  <h3 id="group-timing">Timing Parameters (0x0000 ~ 0x0003)</h3>
  <p>Controls the valve's open duration and auto-close mechanism. This is the key capability that distinguishes the Valve Cluster from a simple OnOff switch &mdash; built-in timed protection prevents the valve from accidentally remaining open for extended periods.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0000">
          <td><code>0x0000</code></td>
          <td>OpenDuration<br/><span class="attr-cn">Open Duration</span></td>
          <td>elapsed-s / null</td>
          <td>Duration of the current valve open session, in seconds. Set by the Open command. <code>null</code> means the valve remains open indefinitely (until a Close command is received). Becomes <code>null</code> after the valve closes</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>DefaultOpenDuration<br/><span class="attr-cn">Default Open Duration</span></td>
          <td>elapsed-s / null</td>
          <td>Default value used when the Open command does not specify OpenDuration, in seconds. <strong>Read/Write</strong>. <code>null</code> means no default time (Open without parameters will keep the valve open indefinitely). It is recommended to set a reasonable safety value</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>AutoCloseTime<br/><span class="attr-cn">Auto Close Time</span></td>
          <td>epoch-us / null</td>
          <td>UTC timestamp when the valve will auto-close, in microseconds. Automatically calculated by the device based on OpenDuration and the time the valve was opened. <code>null</code> means no auto-close scheduled. <strong>Requires TS Feature</strong></td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>RemainingDuration<br/><span class="attr-cn">Remaining Duration</span></td>
          <td>elapsed-s / null</td>
          <td>Seconds remaining until auto-close. Automatically maintained by the device; when the countdown reaches zero, the valve closes. <code>null</code> means no timer is set or the valve is already closed</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Timing Parameters</div>
    <p>
      <code>DefaultOpenDuration</code> is the preset value, <code>OpenDuration</code> is the value in effect for the current session,
      <code>RemainingDuration</code> is the real-time countdown, and <code>AutoCloseTime</code> is the absolute time point.
      When the Open command is sent without parameters, <code>OpenDuration</code> = <code>DefaultOpenDuration</code>;
      when sent with parameters, <code>OpenDuration</code> = the command parameter value.
      The app UI typically displays <code>RemainingDuration</code> as the countdown.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 阀门状态（0x0004 ~ 0x0005）====== -->
  <h3 id="group-state">Valve State (0x0004 ~ 0x0005)</h3>
  <p>Describes the valve's current open/close state and target state. Valve actions take time (motor-driven), so CurrentState and TargetState may differ &mdash; while the valve is in motion, CurrentState is Transitioning.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>CurrentState<br/><span class="attr-cn">Current State</span></td>
          <td>ValveStateEnum / null</td>
          <td>Actual current state of the valve. Nullable &mdash; <code>null</code> means the device cannot determine the current state (e.g., just powered up, no position sensor)</td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>TargetState<br/><span class="attr-cn">Target State</span></td>
          <td>ValveStateEnum / null</td>
          <td>Target state of the valve. Changes to <code>Open (1)</code> after an Open command, and to <code>Closed (0)</code> after a Close command. Nullable &mdash; <code>null</code> means no pending target</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">State Transition Flow</div>
    <p>
      After sending an Open command: <code>TargetState</code> immediately changes to <code>Open</code>, <code>CurrentState</code> changes to <code>Transitioning</code>,
      and the valve motor begins operating. Once the target position is reached, <code>CurrentState</code> changes to <code>Open</code>.
      The Close command works the same way. The app UI should display real-time status based on <code>CurrentState</code>,
      and can show a loading animation when the value is <code>Transitioning</code>.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 开度控制（0x0006 ~ 0x0007）====== -->
  <h3 id="group-level">Level Control (0x0006 ~ 0x0007)</h3>
  <p>
    Controls the valve's precise opening percentage. Requires the device to support the <strong>Level (LVL)</strong> Feature.
    Valves without LVL support only have fully open/fully closed states.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>CurrentLevel<br/><span class="attr-cn">Current Level</span></td>
          <td>percent / null</td>
          <td>Current actual opening percentage of the valve, 0~100. <code>0</code> = fully closed, <code>100</code> = fully open. Nullable &mdash; <code>null</code> means the current level cannot be determined. <strong>Requires LVL Feature</strong></td>
        </tr>
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>TargetLevel<br/><span class="attr-cn">Target Level</span></td>
          <td>percent / null</td>
          <td>Target opening percentage of the valve, 1~100. Set by the Open command's TargetLevel parameter. Nullable &mdash; <code>null</code> means no pending target level. <strong>Requires LVL Feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Level and State</div>
    <p>
      <code>CurrentLevel = 0</code> is equivalent to <code>CurrentState = Closed</code>,
      and <code>CurrentLevel > 0</code> is equivalent to <code>CurrentState = Open</code>.
      For devices that support LVL, the app can use a slider control to let users set the precise opening level;
      the Open command's TargetLevel parameter value corresponds directly to the slider position.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 故障状态（0x0008）====== -->
  <h3 id="group-fault">Fault Status (0x0008)</h3>
  <p>Records valve fault information. ValveFault is a bitmap attribute; multiple faults can exist simultaneously.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>ValveFault<br/><span class="attr-cn">Valve Fault</span></td>
          <td>ValveFaultBitmap</td>
          <td>Valve fault bitmap; each bit represents a fault type. <code>0</code> = no fault. See the <a href="#valve-fault-bitmap">ValveFaultBitmap</a> section below</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 枚举与位图 ====== -->
  <h2 id="enums">Enums & Bitmaps</h2>

  <!-- ValveStateEnum -->
  <h3 id="valve-state-enum">ValveStateEnum (Valve State Enum)</h3>
  <p>Used by the <code>CurrentState</code> and <code>TargetState</code> attributes to describe the valve's open/close state.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Closed</span>
        <span class="enum-desc">Closed &mdash; valve is fully closed, no fluid passes through</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Open</span>
        <span class="enum-desc">Open &mdash; valve is open (fully or partially)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Transitioning</span>
        <span class="enum-desc">Transitioning &mdash; valve is executing an open or close action (motor running)</span>
      </div>
    </div>
  </div>

  <!-- ValveFaultBitmap -->
  <h3 id="valve-fault-bitmap">ValveFaultBitmap (Valve Fault Bitmap)</h3>
  <p>
    Bitmap definition for the <code>ValveFault (0x0008)</code> attribute. Each bit represents a fault type; multiple bits can be set simultaneously.
    When any bit changes from 0 to 1, the device reports a <code>ValveFault</code> event.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">GeneralFault</span>
        <span class="enum-desc">General fault &mdash; uncategorized general hardware or software issue</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">Blocked</span>
        <span class="enum-desc">Blocked &mdash; valve is mechanically stuck and cannot open or close normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">Leaking</span>
        <span class="enum-desc">Leaking &mdash; fluid flow detected while the valve is in the closed state</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">NotConnected</span>
        <span class="enum-desc">Not connected &mdash; communication between the valve actuator and controller is lost</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">ShortCircuit</span>
        <span class="enum-desc">Short circuit &mdash; short circuit in the valve motor or driver circuit</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 5</span>
      <div>
        <span class="enum-name">CurrentExceeded</span>
        <span class="enum-desc">Current exceeded &mdash; valve motor current exceeds the safe range</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Fault Bitmap Reading Examples</div>
    <p>
      <code>ValveFault = 0x00</code> (decimal 0) = No fault, everything is normal.<br/>
      <code>ValveFault = 0x06</code> (decimal 6) = Bit 1 + Bit 2 = Valve is stuck and leaking &mdash; immediate repair needed.<br/>
      <code>ValveFault = 0x30</code> (decimal 48) = Bit 4 + Bit 5 = Short circuit and overcurrent &mdash; possible motor damage, power off and inspect.
    </p>
  </div>

  <!-- ====== Feature 位图 ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The ValveConfigurationAndControl Cluster declares supported advanced capabilities through <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">TS (TimeSync)</span>
        <span class="enum-desc">Time synchronization &mdash; enables the AutoCloseTime attribute, allowing the device to precisely calculate auto-close timing based on UTC timestamps. Requires the device to be connected to the Time Synchronization Cluster</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LVL (Level)</span>
        <span class="enum-desc">Level control &mdash; enables CurrentLevel, TargetLevel attributes and the Open command's TargetLevel parameter, supporting 0~100% precise opening adjustment</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      A simple water valve (open/close): <code>FeatureMap = 0x00</code>, only supports fully open/fully closed and second-based timing.<br/>
      An irrigation control valve: <code>FeatureMap = 0x03</code> (TS + LVL), supports precise level adjustment and UTC timestamp-based auto-close.<br/>
      A gas valve with time sync: <code>FeatureMap = 0x01</code> (TS only), only fully open/fully closed, but supports precise timing via UTC timestamps.
    </p>
  </div>

  <!-- ====== 事件（Events）====== -->
  <h2 id="events">Events</h2>
  <p>
    The ValveConfigurationAndControl Cluster defines 2 events, used for valve state change notifications and fault reporting.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Priority</th>
          <th>Data Fields</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x00</code></td>
          <td>ValveStateChanged</td>
          <td class="col-event-info">INFO</td>
          <td>ValveState (ValveStateEnum), ValveLevel (percent)</td>
          <td>Triggered when valve state or opening level changes</td>
        </tr>
        <tr>
          <td><code>0x01</code></td>
          <td>ValveFault</td>
          <td class="col-event-warning">WARNING</td>
          <td>ValveFault (ValveFaultBitmap)</td>
          <td>Triggered when the valve fault bitmap changes (fault added or cleared)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Event Subscription Advice</div>
    <p>
      The <strong>ValveStateChanged</strong> event includes the post-change state and opening level; subscribing to it allows the app to update the interface in real time
      without polling CurrentState and CurrentLevel attributes.
      The <strong>ValveFault</strong> event triggers when faults appear or are cleared, carrying the latest complete fault bitmap.
      For water and gas valves, it is recommended to always subscribe to ValveFault events and immediately alert when a Leaking fault is received.
    </p>
  </div>

  <!-- ====== 示例数据 ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>A smart water valve with Level (LVL) feature running at 75% opening, ValveConfigurationAndControl Cluster read result:</p>

  <pre><code>{
  // --- Timing Parameters ---
  "0x0000": 1800,            // OpenDuration = 1800 seconds (this session open for 30 minutes)
  "0x0001": 3600,            // DefaultOpenDuration = 3600 seconds (default 1 hour per open)
  "0x0002": null,            // AutoCloseTime = null (no auto-close time set)
  "0x0003": 1200,            // RemainingDuration = 1200 seconds (20 minutes until close)

  // --- Valve State ---
  "0x0004": 1,               // CurrentState = Open (currently open)
  "0x0005": 1,               // TargetState = Open (target is also open)

  // --- Level Control (LVL Feature) ---
  "0x0006": 75,              // CurrentLevel = 75% (current opening 75%)
  "0x0007": 75,              // TargetLevel = 75% (target opening 75%)

  // --- Fault Status ---
  "0x0008": 0                // ValveFault = 0 (no fault)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The simplest valves may only have the core attributes: OpenDuration, DefaultOpenDuration, RemainingDuration, CurrentState, TargetState, and ValveFault.
      CurrentLevel / TargetLevel requires the LVL Feature; AutoCloseTime requires the TS Feature.
      Check <code>FeatureMap (0xFFFC)</code> first; reading unsupported attributes will return <code>UNSUPPORTED_ATTRIBUTE</code>.
    </p>
  </div>

  <!-- ====== 常见场景 ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <h3 id="scenario-irrigation">Scenario 1: Garden Irrigation Timed Watering</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>Write <code>DefaultOpenDuration (0x0001) = 1800</code> to preset 30 minutes of watering per session</li>
        <li>An automation rule triggers at 6 AM, sending the <code>Open (0x00)</code> command (without parameters, using the default duration)</li>
        <li>The valve opens, <code>CurrentState</code> changes to <code>Open (1)</code>, and <code>RemainingDuration</code> begins counting down from 1800</li>
        <li>The app subscribes to <code>RemainingDuration (0x0003)</code> and the interface displays "XX minutes until auto-close"</li>
        <li>After 30 minutes the valve auto-closes, <code>CurrentState</code> changes to <code>Closed (0)</code></li>
        <li>If watering needs to be cancelled mid-session, send the <code>Close (0x01)</code> command to immediately close the valve</li>
        <li>Subscribe to <code>ValveFault</code> events; when <code>Blocked (Bit 1)</code> is detected, remind the user to clean the valve</li>
      </ol>
    </div>
  </details>

  <h3 id="scenario-leak">Scenario 2: Water Leak Sensor Linked Emergency Valve Close</h3>
  <details class="scenario">
    <summary>View Steps</summary>
    <div class="scenario-content">
      <ol>
        <li>A water leak sensor (BooleanState Cluster) detects a leak, <code>StateValue</code> changes to <code>true</code></li>
        <li>An automation rule triggers, sending <code>Close (0x01)</code> to the water valve for an emergency close</li>
        <li>Read <code>CurrentState (0x0004)</code> to confirm the valve is closed (<code>Closed = 0</code>)</li>
        <li>If CurrentState is <code>Transitioning (2)</code>, wait a few seconds and check again</li>
        <li>Check the <code>ValveFault (0x0008)</code> bitmap for the <code>Leaking (Bit 2)</code> bit &mdash; if the valve is closed but leaking is still detected, the valve seal has failed and manual intervention is needed</li>
        <li>Send an alert notification to the user: "Water leak detected. The water valve has been automatically closed. Please check the area."</li>
        <li>After the leak is resolved, the user manually sends an <code>Open</code> command to restore water supply</li>
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

  .col-event-critical {
    color: #dc2626;
    font-weight: 600;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-event-critical {
    color: #f87171;
  }

  .col-event-warning {
    color: #d97706;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-event-warning {
    color: #fbbf24;
  }

  .col-event-info {
    color: #2563eb;
    font-weight: 500;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-event-info {
    color: #60a5fa;
  }
</style>`,
  },
};
