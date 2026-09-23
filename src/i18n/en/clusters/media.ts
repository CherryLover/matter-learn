import type { ClusterContent } from '../../cluster-types';

export const clusters: Record<string, ClusterContent> = {
  'media-playback': {
    title: 'MediaPlayback Cluster (0x0506)',
    description: 'Complete reference for the Matter MediaPlayback Cluster (0x0506) — Play/Pause/Stop/Seek playback control, fast-forward/rewind, audio track and text track switching, playback state and position tracking, Feature bitmap, and enum value quick reference.',
    prev: undefined,
    next: undefined,
    content: `<h1>MediaPlayback Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0506</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, speaker, set-top box, etc.)
  </p>
  <p>
    MediaPlayback is the core Cluster in Matter for controlling media playback.
    It provides standard media control operations such as play, pause, stop, fast-forward, rewind, and seek,
    applicable to TVs, smart speakers, set-top boxes, streaming players, and all devices that require media playback capabilities.
    All playback control commands return a unified <code>PlaybackResponse</code> containing an operation result status code.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Feature-Driven Capability Tiers</div>
    <p>
      MediaPlayback uses 5 Feature bits to control different capability tiers.
      Basic devices (such as simple speakers) only need to support basic commands like Play/Pause/Stop;
      advanced devices (such as smart TVs) can enable <strong>AdvancedSeek (AS)</strong> for position seeking,
      <strong>VariableSpeed (VS)</strong> for variable-speed playback,
      <strong>TextTracks (TT)</strong> and <strong>AudioTracks (AT)</strong> for subtitle and multi-audio-track switching.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Data Structures</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The MediaPlayback Cluster has 14 commands covering everything from basic playback control to advanced seeking, audio track, and text track switching.
    All commands return a <a href="#struct-response">PlaybackResponse</a> containing a
    <a href="#enum-status">StatusEnum</a> status code upon execution.
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
          <td>Play</td>
          <td>Start or resume playback</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>Pause</td>
          <td>Pause playback</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Stop</td>
          <td>Stop playback</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>StartOver</td>
          <td>Restart from beginning</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>Previous</td>
          <td>Previous track/episode</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>Next</td>
          <td>Next track/episode</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>Rewind</td>
          <td>Rewind</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x07">
          <td><a href="#cmd-0x07"><code>0x07</code></a></td>
          <td>FastForward</td>
          <td>Fast-forward</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x08">
          <td><a href="#cmd-0x08"><code>0x08</code></a></td>
          <td>SkipForward</td>
          <td>Skip forward by a specified duration</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x09">
          <td><a href="#cmd-0x09"><code>0x09</code></a></td>
          <td>SkipBackward</td>
          <td>Skip backward by a specified duration</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0B">
          <td><a href="#cmd-0x0B"><code>0x0B</code></a></td>
          <td>Seek</td>
          <td>Seek to a specified position</td>
          <td class="col-required">AS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0C">
          <td><a href="#cmd-0x0C"><code>0x0C</code></a></td>
          <td>ActivateAudioTrack</td>
          <td>Switch audio track</td>
          <td class="col-required">AT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0D">
          <td><a href="#cmd-0x0D"><code>0x0D</code></a></td>
          <td>ActivateTextTrack</td>
          <td>Enable/switch text track</td>
          <td class="col-required">TT</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x0E">
          <td><a href="#cmd-0x0E"><code>0x0E</code></a></td>
          <td>DeactivateTextTrack</td>
          <td>Disable text track</td>
          <td class="col-required">TT</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Play — Start Playback (0x00)</h3>
  <p>
    Starts or resumes media playback. On success, the <code>CurrentState</code> attribute changes to
    <code>Playing (0)</code>. If playback is already in progress, the command still succeeds with no additional effect.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user presses the play button on a remote, a voice assistant executes a "play" command, or playback is resumed after a pause.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">Pause — Pause Playback (0x01)</h3>
  <p>
    Pauses current playback. On success, the <code>CurrentState</code> attribute changes to
    <code>Paused (1)</code>. The device retains the current playback position and can resume via the Play command.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user presses the pause button, playback is auto-paused on an incoming call, or a voice assistant executes a "pause" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Stop — Stop Playback (0x02)</h3>
  <p>
    Stops media playback and releases playback resources. On success, the <code>CurrentState</code> attribute changes to
    <code>NotPlaying (2)</code>. Unlike Pause, Stop indicates the user does not intend to continue watching the current content.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user exits the current content, switches to another app, or closes the player.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">StartOver — Restart from Beginning (0x03)</h3>
  <p>
    Resets the playback position of the current content to the beginning and starts playback.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user wants to rewatch the current episode or a voice assistant executes a "start over" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">Previous — Previous Item (0x04)</h3>
  <p>
    Switches to the previous media item in the playlist (previous track/episode).
    If already at the first item, the device behavior is implementation-defined (may restart or ignore).
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user presses the previous track button on the remote or a voice assistant executes a "previous" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">Next — Next Item (0x05)</h3>
  <p>
    Switches to the next media item in the playlist (next track/episode).
    If already at the last item, the device behavior is implementation-defined (may stop playback or loop to the first item).
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user presses the next track button on the remote or a voice assistant executes a "next" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">Rewind — Rewind (0x06)</h3>
  <p>
    Starts rewinding playback. The device plays media content in reverse at an accelerated speed.
    If the device supports the <strong>VariableSpeed (VS)</strong> feature, consecutive calls can progressively increase the rewind speed
    (e.g., -2x, -4x, -8x), and <code>PlaybackSpeed</code> updates to a negative value.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>The user holds down the rewind button on the remote to find an earlier scene; consecutive presses increase the rewind speed.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x07">FastForward — Fast-Forward (0x07)</h3>
  <p>
    Starts fast-forwarding playback. The device plays media content at an accelerated forward speed.
    If the device supports the <strong>VariableSpeed (VS)</strong> feature, consecutive calls can progressively increase the fast-forward speed
    (e.g., 2x, 4x, 8x), and <code>PlaybackSpeed</code> updates to the corresponding multiplier.
    No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>The user holds the fast-forward button on the remote to skip ads or uninteresting segments; consecutive presses increase the speed.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x08">SkipForward — Skip Forward (0x08)</h3>
  <p>
    Skips forward by a specified number of milliseconds from the current position. Unlike FastForward which is continuous, SkipForward is a one-time jump.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DeltaPositionMilliseconds</td>
          <td>uint64</td>
          <td>Number of milliseconds to skip forward. For example, <code>30000</code> = skip forward 30 seconds</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked by a "Skip 30 seconds" button in an app or when a voice assistant executes a "fast-forward 1 minute" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x09">SkipBackward — Skip Backward (0x09)</h3>
  <p>
    Skips backward by a specified number of milliseconds from the current position. If the skip amount exceeds the elapsed playback time, the position resets to the beginning.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>DeltaPositionMilliseconds</td>
          <td>uint64</td>
          <td>Number of milliseconds to skip backward. For example, <code>10000</code> = skip backward 10 seconds</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>The user missed a piece of dialogue and presses the "Back 10 seconds" button to review it.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0B">Seek — Seek (0x0B)</h3>
  <p>
    Seeks to an absolute position in the media. Requires the device to support the <strong>AdvancedSeek (AS)</strong> feature.
    The seek position must be between <code>SeekRangeStart</code> and <code>SeekRangeEnd</code>;
    positions outside this range return a <code>SeekOutOfRange (5)</code> error.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Position</td>
          <td>uint64</td>
          <td>Target position in milliseconds. For example, <code>600000</code> = seek to the 10-minute mark</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="callout callout-warning">
    <div class="callout-title">Seek Range Validation</div>
    <p>
      Before invoking Seek, you should first read the <code>SeekRangeStart</code> and <code>SeekRangeEnd</code>
      attributes to determine the seekable range. For live streams, the seekable range may be a sliding window (e.g., the last 2 hours);
      positions outside this window will be rejected.
    </p>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user drags the progress bar to a specific position or a voice assistant executes a "jump to the 30-minute mark" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0C">ActivateAudioTrack — Switch Audio Track (0x0C)</h3>
  <p>
    Switches to the specified audio track. Requires the device to support the <strong>AudioTracks (AT)</strong> feature.
    The list of available audio tracks can be obtained from the <code>AvailableAudioTracks</code> attribute.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TrackID</td>
          <td>string</td>
          <td>Target audio track ID, from the AvailableAudioTracks list</td>
        </tr>
        <tr>
          <td>AudioOutputIndex</td>
          <td>uint8</td>
          <td>Audio output index (specifies which audio output the track routes to)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>The user switches the audio language of a movie on the TV, for example from the original English audio to a dubbed track.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0D">ActivateTextTrack — Enable Text Track (0x0D)</h3>
  <p>
    Enables or switches to the specified text (subtitle) track. Requires the device to support the <strong>TextTracks (TT)</strong> feature.
    The list of available text tracks can be obtained from the <code>AvailableTextTracks</code> attribute.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TrackID</td>
          <td>string</td>
          <td>Target text track ID, from the AvailableTextTracks list</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user enables subtitles while watching a foreign-language film or switches subtitle languages for practice.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x0E">DeactivateTextTrack — Disable Text Track (0x0E)</h3>
  <p>
    Disables the currently displayed text track. On success, the <code>ActiveTextTrack</code> attribute becomes <code>null</code>.
    Requires the device to support the <strong>TextTracks (TT)</strong> feature. No parameters required.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>Invoked when the user wants to turn off subtitles or a voice assistant executes a "disable subtitles" command.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Command Response ====== -->
  <h3 id="struct-response">PlaybackResponse — Command Response</h3>
  <p>
    All 14 commands return this response upon execution, containing an operation result status code and optional data.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Command execution result. <code>0 (Success)</code> indicates success</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string / null</td>
          <td>Optional additional data; content is implementation-defined</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>Response example:</p>
  <pre><code>{
  "Status": 0,     // Success
  "Data": null      // No additional data
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The MediaPlayback Cluster has 11 application attributes, divided into three groups: playback state, time information, and audio/text tracks. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <!-- Playback state -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CurrentState</td>
          <td><a href="#enum-playbackstate">PlaybackStateEnum</a></td>
          <td><a href="#group-state">Playback State</a></td>
          <td>Current playback state</td>
        </tr>
        <!-- Time information -->
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>StartTime</td>
          <td>epoch_us / null</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Media start time</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>Duration</td>
          <td>uint64 / null</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Total media duration (milliseconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>SampledPosition</td>
          <td><a href="#struct-position">PlaybackPositionStruct</a> / null</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Sampled playback position</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>PlaybackSpeed</td>
          <td>single (float)</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Current playback speed</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>SeekRangeEnd</td>
          <td>uint64 / null</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Seekable range end (milliseconds)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>SeekRangeStart</td>
          <td>uint64 / null</td>
          <td><a href="#group-time">Time Information</a></td>
          <td>Seekable range start (milliseconds)</td>
        </tr>
        <!-- Audio & text tracks -->
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>ActiveAudioTrack</td>
          <td><a href="#struct-track">TrackStruct</a> / null</td>
          <td><a href="#group-tracks">Audio & Text Tracks</a></td>
          <td>Current audio track</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0008">
          <td><a href="#attr-0x0008"><code>0x0008</code></a></td>
          <td>AvailableAudioTracks</td>
          <td>list&lt;<a href="#struct-track">TrackStruct</a>&gt; / null</td>
          <td><a href="#group-tracks">Audio & Text Tracks</a></td>
          <td>Available audio tracks list</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0009">
          <td><a href="#attr-0x0009"><code>0x0009</code></a></td>
          <td>ActiveTextTrack</td>
          <td><a href="#struct-track">TrackStruct</a> / null</td>
          <td><a href="#group-tracks">Audio & Text Tracks</a></td>
          <td>Current text track</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x000A">
          <td><a href="#attr-0x000A"><code>0x000A</code></a></td>
          <td>AvailableTextTracks</td>
          <td>list&lt;<a href="#struct-track">TrackStruct</a>&gt; / null</td>
          <td><a href="#group-tracks">Audio & Text Tracks</a></td>
          <td>Available text tracks list</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Playback State (0x0000) ====== -->
  <h3 id="group-state">Playback State (0x0000)</h3>
  <p>Describes the current playback state of the device. This is the only mandatory attribute of MediaPlayback.</p>

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
          <td>CurrentState</td>
          <td><a href="#enum-playbackstate">PlaybackStateEnum</a></td>
          <td>The current playback state of the device. Apps should subscribe to this attribute to synchronize the play/pause button state on the UI. This is the only mandatory attribute of MediaPlayback</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Time Information (0x0001 ~ 0x0006) ====== -->
  <h3 id="group-time">Time Information (0x0001 ~ 0x0006)</h3>
  <p>Describes the time-related information of the current media: start time, total duration, current position, playback speed, and seekable range. Most of these attributes require the <strong>AdvancedSeek (AS)</strong> feature.</p>

  <div class="callout callout-info">
    <div class="callout-title">Time Units</div>
    <p>
      <code>Duration</code>, <code>SampledPosition.Position</code>, <code>SeekRangeStart</code>, and <code>SeekRangeEnd</code> are in <strong>milliseconds</strong>.
      <code>StartTime</code> and <code>SampledPosition.UpdatedAt</code> are in <strong>microsecond-precision epoch</strong> (microseconds since 1970-01-01 UTC).
    </p>
  </div>

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
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>StartTime</td>
          <td>epoch_us / null</td>
          <td>
            The start time of the current media content (microsecond-precision UTC epoch). For on-demand content, this is typically the publish time;
            for live streams, it is the stream start time. <strong>Nullable</strong> — <code>null</code> means not applicable.
            <strong>Requires AS feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>Duration</td>
          <td>uint64 / null</td>
          <td>
            Total duration of the current media in <strong>milliseconds</strong>. For example, a 90-minute movie is <code>5400000</code>.
            <strong>Nullable</strong> — <code>null</code> means the duration is unknown (e.g., a live stream).
            <strong>Requires AS feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>SampledPosition</td>
          <td><a href="#struct-position">PlaybackPositionStruct</a> / null</td>
          <td>
            The playback position as last sampled by the device, including the sample time and the corresponding playback position.
            Apps can combine <code>PlaybackSpeed</code> and the time difference from the sample to estimate the current actual position.
            <strong>Nullable</strong> — <code>null</code> means the device does not support position reporting.
            <strong>Requires AS feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>PlaybackSpeed</td>
          <td>single (float)</td>
          <td>
            Current playback speed multiplier. <code>1.0</code> = normal speed, <code>2.0</code> = 2x fast-forward,
            <code>-1.0</code> = normal speed rewind, <code>0.0</code> = paused.
            Devices supporting the <strong>VS feature</strong> allow additional speed tiers.
            <strong>Requires AS feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>SeekRangeEnd</td>
          <td>uint64 / null</td>
          <td>
            The furthest seekable position in <strong>milliseconds</strong>. For on-demand content, this is typically equal to Duration;
            for live streams, it is the latest rewindable position. The Seek command Position must not exceed this value.
            <strong>Nullable</strong> — <code>null</code> means no limit.
            <strong>Requires AS feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>SeekRangeStart</td>
          <td>uint64 / null</td>
          <td>
            The earliest seekable position in <strong>milliseconds</strong>. For on-demand content, this is typically <code>0</code>;
            for live streams, it is the start boundary of the rewind window. The Seek command Position must not be less than this value.
            <strong>Nullable</strong> — <code>null</code> means no limit.
            <strong>Requires AS feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Estimating Real-Time Position</div>
    <p>
      The device does not push position updates in real time; instead, it provides a sampled snapshot via <code>SampledPosition</code>.
      Apps need to calculate the current position themselves: <code>Current Position = SampledPosition.Position + (Current Time - SampledPosition.UpdatedAt) * PlaybackSpeed</code>.
      Note that UpdatedAt is in microseconds and Position is in milliseconds, so unit alignment is required.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Audio & Text Tracks (0x0007 ~ 0x000A) ====== -->
  <h3 id="group-tracks">Audio & Text Tracks (0x0007 ~ 0x000A)</h3>
  <p>Describes the available audio tracks and text tracks for the current media, as well as the currently active audio/text track. Requires the <strong>AudioTracks (AT)</strong> or <strong>TextTracks (TT)</strong> feature.</p>

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
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>ActiveAudioTrack</td>
          <td><a href="#struct-track">TrackStruct</a> / null</td>
          <td>
            The currently active audio track. <strong>Nullable</strong> — <code>null</code> means no audio track is active.
            <strong>Requires AT feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0008">
          <td><code>0x0008</code></td>
          <td>AvailableAudioTracks</td>
          <td>list&lt;<a href="#struct-track">TrackStruct</a>&gt; / null</td>
          <td>
            All audio tracks provided by the current media. Used by apps to display the audio track selection list.
            <strong>Nullable</strong> — <code>null</code> means no audio track information is available.
            <strong>Requires AT feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0009">
          <td><code>0x0009</code></td>
          <td>ActiveTextTrack</td>
          <td><a href="#struct-track">TrackStruct</a> / null</td>
          <td>
            The currently displayed text track. <strong>Nullable</strong> — <code>null</code> means subtitles are disabled.
            <strong>Requires TT feature</strong>
          </td>
        </tr>
        <tr id="attr-0x000A">
          <td><code>0x000A</code></td>
          <td>AvailableTextTracks</td>
          <td>list&lt;<a href="#struct-track">TrackStruct</a>&gt; / null</td>
          <td>
            All text tracks provided by the current media. Used by apps to display the subtitle selection list.
            <strong>Nullable</strong> — <code>null</code> means no subtitle information is available.
            <strong>Requires TT feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-playbackstate">PlaybackStateEnum — Playback State</h3>
  <p>Playback state enumeration for the device. Defines the value range for the <code>CurrentState</code> attribute.</p>
  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Playing</span>
        <span class="enum-desc">Playing — Media is currently playing normally</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Paused</span>
        <span class="enum-desc">Paused — Playback is paused and can be resumed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotPlaying</span>
        <span class="enum-desc">Not Playing — No content is playing (idle or stopped)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Buffering</span>
        <span class="enum-desc">Buffering — Loading media data; playback is temporarily interrupted</span>
      </div>
    </div>
  </div>

  <h3 id="enum-status">StatusEnum — Command Response Status</h3>
  <p>Status code in <a href="#struct-response">PlaybackResponse</a>, indicating the command execution result.</p>
  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Success — Command executed successfully</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">InvalidStateForCommand</span>
        <span class="enum-desc">Invalid State — Command cannot be executed in the current playback state</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAllowed</span>
        <span class="enum-desc">Not Allowed — Command was rejected (e.g., insufficient permissions)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">NotActive</span>
        <span class="enum-desc">Not Active — No active playback session</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">SpeedOutOfRange</span>
        <span class="enum-desc">Speed Out of Range — Requested playback speed is outside the device's supported range</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">SeekOutOfRange</span>
        <span class="enum-desc">Seek Out of Range — Requested position is outside the SeekRange bounds</span>
      </div>
    </div>
  </div>

  <!-- ====== Data Structures ====== -->
  <h2 id="structs">Data Structures</h2>

  <h3 id="struct-position">PlaybackPositionStruct — Playback Position</h3>
  <p>
    Describes the playback position sampled by the device at a specific moment. Used for the <code>SampledPosition</code> attribute.
    After reading this structure, apps can combine it with <code>PlaybackSpeed</code> and the current time to estimate the real-time position.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>UpdatedAt</td>
          <td>epoch_us</td>
          <td>Sample timestamp (microsecond-precision UTC epoch). Indicates when this position information was captured</td>
        </tr>
        <tr>
          <td>Position</td>
          <td>uint64 / null</td>
          <td>Playback position at the sample timestamp, in <strong>milliseconds</strong>. <strong>Nullable</strong> — <code>null</code> means position is unknown</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3 id="struct-track">TrackStruct — Track Information</h3>
  <p>
    Describes information about an audio or text track. Used in audio and text track related attributes.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ID</td>
          <td>string</td>
          <td>Unique track identifier. Used as a parameter for the ActivateAudioTrack and ActivateTextTrack commands</td>
        </tr>
        <tr>
          <td>TrackAttributes</td>
          <td>TrackAttributesStruct</td>
          <td>Detailed track attribute information (see below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>TrackAttributesStruct — Track Attributes</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>LanguageCode</td>
          <td>string</td>
          <td>Yes</td>
          <td>Language code following the ISO 639-1 standard (e.g., <code>"zh"</code>, <code>"en"</code>, <code>"ja"</code>)</td>
        </tr>
        <tr>
          <td>DisplayName</td>
          <td>string / null</td>
          <td>No</td>
          <td>Optional display name for the app to show directly to the user (e.g., <code>"Chinese"</code>, <code>"English"</code>). <strong>Nullable</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The MediaPlayback Cluster declares which advanced capabilities the device supports via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">AS (AdvancedSeek)</span>
        <span class="enum-desc">Advanced Seek — Enables the Seek command, StartTime, Duration, SampledPosition, PlaybackSpeed, SeekRange, and related attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">VS (VariableSpeed)</span>
        <span class="enum-desc">Variable Speed — Allows Rewind/FastForward at multiple speed tiers (2x, 4x, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">TT (TextTracks)</span>
        <span class="enum-desc">Text Tracks — Enables text track related attributes and the ActivateTextTrack / DeactivateTextTrack commands</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">AT (AudioTracks)</span>
        <span class="enum-desc">Audio Tracks — Enables audio track related attributes and the ActivateAudioTrack command</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 4</span>
      <div>
        <span class="enum-name">AA (AudioAdvance)</span>
        <span class="enum-desc">Audio Advance — Supports advanced audio management capabilities such as audio output routing</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Feature Combination Examples</div>
    <p>
      Simple Bluetooth speaker: <code>FeatureMap = 0x00</code> (basic playback control only).
      Smart TV: <code>FeatureMap = 0x0F</code> (AS + VS + TT + AT = 0b01111), supports progress bar, variable speed, subtitles, and multi-audio tracks.
      Streaming box: <code>FeatureMap = 0x1F</code> (all features), complete media playback experience.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the MediaPlayback Cluster from a smart TV currently playing a movie (with AS + VS + AT + TT features enabled):</p>

  <pre><code>{
  // --- Playback State ---
  "0x0000": 0,                // CurrentState = Playing

  // --- Time Information (requires AS feature) ---
  "0x0001": 1695400000000000,  // StartTime (media start time, microsecond-precision epoch)
  "0x0002": 5400000,           // Duration = 5,400,000 ms (90 minutes)
  "0x0003": {                  // SampledPosition
    "UpdatedAt": 1695401200000000,
    "Position": 1230000
  },
  "0x0004": 1.0,               // PlaybackSpeed = 1.0 (normal speed)
  "0x0005": 5400000,           // SeekRangeEnd = 5,400,000 ms
  "0x0006": 0,                 // SeekRangeStart = 0 ms

  // --- Audio Track Information (requires AT feature) ---
  "0x0007": {                  // ActiveAudioTrack
    "ID": "audio-zh",
    "TrackAttributes": {
      "LanguageCode": "zh",
      "DisplayName": "Chinese"
    }
  },
  "0x0008": [                  // AvailableAudioTracks
    { "ID": "audio-zh", "TrackAttributes": { "LanguageCode": "zh", "DisplayName": "Chinese" } },
    { "ID": "audio-en", "TrackAttributes": { "LanguageCode": "en", "DisplayName": "English" } }
  ],

  // --- Text Track Information (requires TT feature) ---
  "0x0009": {                  // ActiveTextTrack
    "ID": "sub-zh",
    "TrackAttributes": {
      "LanguageCode": "zh",
      "DisplayName": "Chinese Subtitles"
    }
  },
  "0x000A": [                  // AvailableTextTracks
    { "ID": "sub-zh", "TrackAttributes": { "LanguageCode": "zh", "DisplayName": "Chinese Subtitles" } },
    { "ID": "sub-en", "TrackAttributes": { "LanguageCode": "en", "DisplayName": "English Subtitles" } }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Most attributes are <strong>Nullable</strong>; simple devices may only report <code>CurrentState (0x0000)</code>.
      Before reading, check <code>FeatureMap (0xFFFC)</code> to determine which features the device supports,
      then read the corresponding attributes as needed to avoid errors from reading non-existent attributes.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Smart TV Playback Control and Progress Bar</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap (0xFFFC)</code> to confirm the device supports the AdvancedSeek (AS) feature</li>
        <li>Send <code>Play (0x00)</code> to start playback; subscribe to <code>CurrentState (0x0000)</code> to sync the play button state</li>
        <li>Read <code>Duration (0x0002)</code> to get the total duration and render the progress bar</li>
        <li>Periodically read <code>SampledPosition (0x0003)</code> and combine it with <code>PlaybackSpeed (0x0004)</code> to estimate the current position and update the progress bar</li>
        <li>When the user drags the progress bar, read <code>SeekRangeStart (0x0006)</code> and <code>SeekRangeEnd (0x0005)</code> to confirm the range, then send <code>Seek (0x0B)</code> to jump</li>
        <li>When the user taps the pause button, send <code>Pause (0x01)</code>; tapping play again sends <code>Play (0x00)</code></li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Multi-Language Movie Audio and Subtitle Switching</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>FeatureMap</code> to confirm the device supports AudioTracks (AT) and TextTracks (TT)</li>
        <li>Read <code>AvailableAudioTracks (0x0008)</code> and display an audio track selection list in the app (e.g., "Chinese Dub," "English Original," "Japanese")</li>
        <li>Read <code>AvailableTextTracks (0x000A)</code> and display a subtitle selection list in the app (e.g., "Chinese Subtitles," "English Subtitles," "Off")</li>
        <li>User selects English original audio + Chinese subtitles:
          <ul>
            <li>Send <code>ActivateAudioTrack (0x0C)</code> with TrackID set to the English audio track ID</li>
            <li>Send <code>ActivateTextTrack (0x0D)</code> with TrackID set to the Chinese subtitle track ID</li>
          </ul>
        </li>
        <li>User wants to turn off subtitles: send <code>DeactivateTextTrack (0x0E)</code></li>
        <li>Subscribe to <code>ActiveAudioTrack (0x0007)</code> and <code>ActiveTextTrack (0x0009)</code> to keep the app's current selections in sync</li>
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
  'media-input': {
    title: 'MediaInput Cluster (0x0507)',
    description: 'Complete reference for the Matter MediaInput Cluster (0x0507) — SelectInput/ShowInputStatus/HideInputStatus/RenameInput commands, InputList input source list, InputInfoStruct structure, InputTypeEnum enum values, and NameUpdates feature explanation.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>MediaInput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0507</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, AV receiver, etc.)
  </p>
  <p>
    MediaInput manages the external input sources of a device — HDMI, USB, component, optical, and other audio/video input interfaces.
    Users can query available input sources, check which one is selected, switch to a specific source, and customize input source names.
    It is one of the core Clusters for media devices such as smart TVs and AV receivers.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">NameUpdates (NU) Feature</div>
    <p>
      The MediaInput Cluster defines a <strong>NameUpdates (NU)</strong> Feature.
      When enabled, the controller can customize input source names via the <code>RenameInput</code> command
      (e.g., renaming "HDMI 2" to "PS5"). When disabled, input source names are fixed by the device and cannot be modified.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The MediaInput Cluster has 4 commands. SelectInput switches the input source, ShowInputStatus / HideInputStatus control the OSD display of input source information,
    and RenameInput allows users to customize input source names (requires the NU feature).
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
          <td>SelectInput</td>
          <td>Switch to a specified input source</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ShowInputStatus</td>
          <td>Show input source info on screen</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>HideInputStatus</td>
          <td>Hide input source info from screen</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RenameInput</td>
          <td>Rename a specified input source</td>
          <td class="col-required">NU</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SelectInput — Switch Input Source (0x00)</h3>
  <p>
    Switches the device to the specified input source. <code>Index</code> must match the <code>Index</code> value
    of an <code>InputInfoStruct</code> in <code>InputList</code>; otherwise the device returns an error.
    On success, the <code>CurrentInput</code> attribute updates to the specified Index value.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Index of the target input source; must exist in <code>InputList</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects "HDMI 1" on the phone app. The app reads <code>InputList</code> to get the Index value of that input source,
        then sends the <code>SelectInput</code> command. The TV switches to the corresponding HDMI input, and <code>CurrentInput</code> updates accordingly.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ShowInputStatus — Show Input Source Info (0x01)</h3>
  <p>
    Requests the device to display current input source information on screen (OSD overlay), similar to pressing the "Info" button on a remote.
    No parameters required. The displayed content and duration are determined by the device.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>The user wants to verify which input source the TV is on. Sending this command via the app causes the TV to display input source information on screen (e.g., "HDMI 1 - Living Room Set-Top Box").</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">HideInputStatus — Hide Input Source Info (0x02)</h3>
  <p>
    Requests the device to hide the input source information display on screen. No parameters required.
    If no input source information is currently displayed, this command has no effect.
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>After ShowInputStatus pops up the information, the user finds it distracting and sends this command via the app to close the OSD overlay.</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">RenameInput — Rename Input Source (0x03)</h3>
  <p>
    Sets a custom name for the specified input source. After modification, the <code>Name</code> field of the corresponding entry in <code>InputList</code> updates.
    This command requires the device to have the <strong>NU (NameUpdates)</strong> feature enabled.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Index of the input source to rename; must exist in <code>InputList</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>New name for the input source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// RenameInput command example
// Rename the input source at Index=2 to "PS5"
{
  "Index": 2,
  "Name": "PS5"
}
// After execution, the Name of Index=2 in InputList becomes "PS5"</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user connected a game console to HDMI 2, but the default "HDMI 2" label is not intuitive.
        By sending <code>RenameInput</code> via the app, the input source at Index=2 is renamed to "PS5".
        Afterwards, the Name of that entry in InputList becomes "PS5", and the UI displays the new name.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The MediaInput Cluster has 2 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>InputList</td>
          <td>list&lt;<a href="#struct-input-info">InputInfoStruct</a>&gt;</td>
          <td>List of all input sources on the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentInput</td>
          <td>uint8</td>
          <td>Index of the currently selected input source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-input">Input Source State (0x0000, 0x0001)</h3>
  <p>Describes the device's currently available input source list and the currently selected input source.</p>

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
          <td>InputList</td>
          <td>list&lt;<a href="#struct-input-info">InputInfoStruct</a>&gt;</td>
          <td>All available input sources declared by the device. Each element is an <a href="#struct-input-info">InputInfoStruct</a>. The list reflects the device's actual physical and virtual input interfaces, with each Index value being unique. When a user modifies a name via <code>RenameInput</code>, the corresponding entry's Name updates</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentInput</td>
          <td>uint8</td>
          <td>The index of the currently selected input source. This value always points to an <code>InputInfoStruct.Index</code> in <code>InputList</code>. Changed via the <code>SelectInput</code> command, or by the user switching via the remote</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      Controllers should subscribe to changes in the <code>CurrentInput</code> attribute to sync the app UI when the user switches input sources via the remote or device panel.
      Likewise, if the device supports the NU feature, subscribe to <code>InputList</code> changes to get the latest input source names.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The MediaInput Cluster uses one structure to describe input source information.</p>

  <!-- InputInfoStruct -->
  <h3 id="struct-input-info">InputInfoStruct</h3>
  <p>Describes the complete information for an input source, including index, type, name, and description.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Unique index of the input source, used to identify it in <code>SelectInput</code> and <code>RenameInput</code> commands</td>
        </tr>
        <tr>
          <td>InputType</td>
          <td><a href="#enum-input-type">InputTypeEnum</a></td>
          <td>Interface type of the input source (see enum below)</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>Display name of the input source, e.g., <code>"HDMI 1"</code>, <code>"PS5"</code>. Can be modified via <code>RenameInput</code> when the NU feature is enabled</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>string</td>
          <td>Supplementary description of the input source, e.g., <code>"Living Room Set-Top Box"</code>. Provided by the device for UI display</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- InputTypeEnum -->
  <h3 id="enum-input-type">InputTypeEnum</h3>
  <p>
    Defines the physical interface type of input sources. Contains 12 enum values covering common audio/video input interfaces.
    Controllers can use this to display corresponding icons or categories in the UI.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Internal</span>
        <span class="enum-desc">Internal — Built-in tuner or streaming application</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Aux</span>
        <span class="enum-desc">Auxiliary — AUX interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Coax</span>
        <span class="enum-desc">Coaxial — Coaxial cable input</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Composite</span>
        <span class="enum-desc">Composite — Composite video (RCA yellow connector)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HDMI</span>
        <span class="enum-desc">HDMI — Most common high-definition digital interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Input</span>
        <span class="enum-desc">Generic Input — Unclassified generic input interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Line</span>
        <span class="enum-desc">Line Input — Line In audio input</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Optical</span>
        <span class="enum-desc">Optical — Optical digital audio (TOSLINK/SPDIF)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Video</span>
        <span class="enum-desc">Video — Generic video input</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">SCART</span>
        <span class="enum-desc">SCART — European standard AV interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">USB</span>
        <span class="enum-desc">USB — USB media playback interface</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other — Interface not covered by the types above</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The MediaInput Cluster declares optional capabilities the device supports via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NU (NameUpdates)</span>
        <span class="enum-desc">Name Updates — When enabled, supports the RenameInput command, allowing users to customize input source names</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">When to Enable NU</div>
    <p>
      Most smart TVs and AV receivers should enable this feature — users typically want to rename "HDMI 1" to something more meaningful (e.g., "Set-Top Box," "PS5").
      If the device's input source names are factory-fixed and cannot be modified, do not enable NU.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the MediaInput Cluster from a smart TV — currently selected HDMI 1, with 4 input sources:</p>

  <pre><code>{
  // --- Current Input Source ---
  "0x0001": 1,                   // CurrentInput = 1 (currently selected HDMI 1)

  // --- Input Source List ---
  "0x0000": [                    // InputList
    {
      "Index": 0,
      "InputType": 0,            // Internal (built-in tuner)
      "Name": "TV Tuner",
      "Description": "Built-in digital TV tuner"
    },
    {
      "Index": 1,
      "InputType": 4,            // HDMI
      "Name": "HDMI 1",
      "Description": "Living room set-top box"
    },
    {
      "Index": 2,
      "InputType": 4,            // HDMI
      "Name": "HDMI 2",
      "Description": "Game console"
    },
    {
      "Index": 3,
      "InputType": 10,           // USB
      "Name": "USB",
      "Description": "USB media playback"
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When displaying the input source switching UI, controllers should first read <code>InputList (0x0000)</code> to get the complete list,
      then read <code>CurrentInput (0x0001)</code> to highlight the currently selected item.
      Different icons can be displayed for different interface types based on <code>InputType</code> (e.g., HDMI icon, USB icon, etc.)
      to improve user recognition.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: App Switches TV Input Source</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>InputList (0x0000)</code> to get all input sources (Index, Name, InputType, Description)</li>
        <li>Read <code>CurrentInput (0x0001)</code> to highlight the currently selected input source</li>
        <li>Display the input source list in the UI with icons based on InputType</li>
        <li>When the user taps the target input source, send <code>SelectInput (0x00)</code> with Index set to that input source's index value</li>
        <li>Subscribe to <code>CurrentInput</code> attribute changes; update the UI after confirming the switch succeeded</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: User Customizes Input Source Name</summary>
    <div class="scenario-content">
      <ol>
        <li>Check the device's <code>FeatureMap (0xFFFC)</code> to confirm it supports <strong>NU</strong> (Bit 0 = 1)</li>
        <li>Read <code>InputList (0x0000)</code> and display the input source list</li>
        <li>User long-presses an input source (e.g., Index=2, current name "HDMI 2"), triggering a rename input dialog</li>
        <li>User enters the new name "PS5" and sends <code>RenameInput (0x03)</code> with Index=2, Name="PS5"</li>
        <li>Subscribe to <code>InputList</code> changes; refresh the UI after confirming the name update</li>
      </ol>
      <p>
        <strong>Note</strong>: If FeatureMap does not include the NU feature, the UI should not show the rename option,
        and sending the RenameInput command will be rejected by the device.
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
  'audio-output': {
    title: 'AudioOutput Cluster (0x050B)',
    description: 'Complete reference for the Matter AudioOutput Cluster (0x050B) — SelectOutput/RenameOutput commands, OutputList, OutputInfoStruct, OutputTypeEnum, and NameUpdates feature.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>AudioOutput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050B</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, AV receiver, Soundbar, etc.)
  </p>
  <p>
    AudioOutput manages the audio output destinations of a device — HDMI ARC, Bluetooth, optical, headphones, built-in speakers, etc.
    Users can query available audio outputs, check which one is currently in use, switch to a specified output, and customize output source names.
    It is a common Cluster for media devices such as smart TVs, AV receivers, and Soundbars, serving as the output counterpart to <a href="../media-input/">MediaInput</a>.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">NameUpdates (NU) Feature</div>
    <p>
      The AudioOutput Cluster defines a <strong>NameUpdates (NU)</strong> Feature.
      When enabled, the controller can customize output source names via the <code>RenameOutput</code> command
      (e.g., renaming "Bluetooth" to "HomePod"). When disabled, output source names are fixed by the device and cannot be modified.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The AudioOutput Cluster has 2 commands. SelectOutput switches the audio output destination,
    and RenameOutput allows users to customize output source names (requires the NU feature).
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
          <td>SelectOutput</td>
          <td>Switch to a specified audio output</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>RenameOutput</td>
          <td>Rename a specified output source</td>
          <td class="col-required">NU</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SelectOutput — Switch Audio Output (0x00)</h3>
  <p>
    Switches the device's audio output to the specified destination. <code>Index</code> must match the <code>Index</code> value
    of an <code>OutputInfoStruct</code> in <code>OutputList</code>; otherwise the device returns an error.
    On success, the <code>CurrentOutput</code> attribute updates to the specified Index value.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Index of the target output source; must exist in <code>OutputList</code></td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects "HDMI ARC" on the phone app. The app reads <code>OutputList</code> to get the Index value of that output source,
        then sends the <code>SelectOutput</code> command. The TV switches audio to HDMI ARC passthrough, and <code>CurrentOutput</code> updates accordingly.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">RenameOutput — Rename Output Source (0x01)</h3>
  <p>
    Sets a custom name for the specified output source. After modification, the <code>Name</code> field of the corresponding entry in <code>OutputList</code> updates.
    This command requires the device to have the <strong>NU (NameUpdates)</strong> feature enabled.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Index of the output source to rename; must exist in <code>OutputList</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>New name for the output source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// RenameOutput command example
// Rename the output source at Index=2 to "HomePod"
{
  "Index": 2,
  "Name": "HomePod"
}
// After execution, the Name of Index=2 in OutputList becomes "HomePod"</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user connected a Bluetooth speaker, but the default "Bluetooth" label is not intuitive.
        By sending <code>RenameOutput</code> via the app, the output source at Index=2 is renamed to "HomePod".
        Afterwards, the Name of that entry in OutputList becomes "HomePod", and the UI displays the new name.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The AudioOutput Cluster has 2 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>OutputList</td>
          <td>list&lt;<a href="#struct-output-info">OutputInfoStruct</a>&gt;</td>
          <td>List of all audio output sources on the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentOutput</td>
          <td>uint8</td>
          <td>Index of the currently selected audio output source</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-output">Audio Output State (0x0000, 0x0001)</h3>
  <p>Describes the device's currently available audio output list and the currently selected output source.</p>

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
          <td>OutputList</td>
          <td>list&lt;<a href="#struct-output-info">OutputInfoStruct</a>&gt;</td>
          <td>All available audio output destinations declared by the device. Each element is an <a href="#struct-output-info">OutputInfoStruct</a>. The list reflects the device's actual audio output interfaces, with each Index value being unique. When a user modifies a name via <code>RenameOutput</code>, the corresponding entry's Name updates</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentOutput</td>
          <td>uint8</td>
          <td>The index of the currently selected audio output. This value always points to an <code>OutputInfoStruct.Index</code> in <code>OutputList</code>. Changed via the <code>SelectOutput</code> command, or by the user switching via the remote or device panel</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      Controllers should subscribe to <code>CurrentOutput</code> attribute changes to sync the app UI when the user switches audio output via remote or device panel.
      Likewise, if the device supports the NU feature, subscribe to <code>OutputList</code> changes to get the latest name for the output source.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The AudioOutput Cluster uses one structure to describe output source information.</p>

  <!-- OutputInfoStruct -->
  <h3 id="struct-output-info">OutputInfoStruct</h3>
  <p>Describes the complete information for an audio output source, including index, type, and name.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Index</td>
          <td>uint8</td>
          <td>Unique index of the output source, used to identify it in <code>SelectOutput</code> and <code>RenameOutput</code> commands</td>
        </tr>
        <tr>
          <td>OutputType</td>
          <td><a href="#enum-output-type">OutputTypeEnum</a></td>
          <td>Interface type of the output source (see enum below)</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>Display name of the output source, e.g., <code>"HDMI ARC"</code>, <code>"HomePod"</code>. Can be modified via <code>RenameOutput</code> when the NU feature is enabled</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Comparison with MediaInput InputInfoStruct</div>
    <p>
      OutputInfoStruct has only 3 fields (Index, OutputType, Name), one less than MediaInput's InputInfoStruct which also has a <code>Description</code> field.
      Audio output source information is relatively simple — the name alone is usually sufficient to distinguish different outputs.
    </p>
  </div>

  <!-- OutputTypeEnum -->
  <h3 id="enum-output-type">OutputTypeEnum</h3>
  <p>
    Defines the interface type of audio output sources. Contains 6 enum values covering common audio output methods.
    Controllers can use this to display corresponding icons or categories in the UI.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">HDMI</span>
        <span class="enum-desc">HDMI — Audio via HDMI ARC/eARC passthrough</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">BT</span>
        <span class="enum-desc">Bluetooth — Bluetooth wireless audio output</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Optical</span>
        <span class="enum-desc">Optical — Optical digital audio output (TOSLINK/SPDIF)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Headphone</span>
        <span class="enum-desc">Headphone — 3.5mm headphone jack or USB headphones</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Internal</span>
        <span class="enum-desc">Internal — Device built-in speakers</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">Other — Output method not covered by the types above</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The AudioOutput Cluster declares optional capabilities the device supports via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NU (NameUpdates)</span>
        <span class="enum-desc">Name Updates — When enabled, supports the RenameOutput command, allowing users to customize output source names</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">When to Enable NU</div>
    <p>
      Devices that support user-customizable output source names should enable this feature — for example, users may want to rename "Bluetooth" to the specific name of their Bluetooth speaker.
      If the device's output source names are factory-fixed and cannot be modified, do not enable NU.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the AudioOutput Cluster from a smart TV — currently outputting audio to HDMI ARC, with 4 output sources:</p>

  <pre><code>{
  // --- Current Output Source ---
  "0x0001": 1,                   // CurrentOutput = 1 (currently selected HDMI ARC)

  // --- Output Source List ---
  "0x0000": [                    // OutputList
    {
      "Index": 0,
      "OutputType": 4,            // Internal (built-in speakers)
      "Name": "TV Speaker"
    },
    {
      "Index": 1,
      "OutputType": 0,            // HDMI (HDMI ARC/eARC passthrough)
      "Name": "HDMI ARC"
    },
    {
      "Index": 2,
      "OutputType": 1,            // BT (Bluetooth speaker)
      "Name": "Bluetooth"
    },
    {
      "Index": 3,
      "OutputType": 2,            // Optical (optical output)
      "Name": "Optical Out"
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When displaying the audio output switching UI, controllers should first read <code>OutputList (0x0000)</code> to get the complete list,
      then read <code>CurrentOutput (0x0001)</code> to highlight the currently selected item.
      Different icons can be displayed for different interface types based on <code>OutputType</code> (e.g., Bluetooth icon, headphone icon)
      to improve user recognition.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: App switches TV audio output</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>OutputList (0x0000)</code> to get all output sources (Index, Name, OutputType)</li>
        <li>Read <code>CurrentOutput (0x0001)</code> to highlight the currently selected output source</li>
        <li>Display the output source list in the UI with corresponding icons based on OutputType (Bluetooth, HDMI, headphones, etc.)</li>
        <li>The user clicks the target output source and sends <code>SelectOutput (0x00)</code> with Index set to that output source's index value</li>
        <li>Subscribe to <code>CurrentOutput</code> attribute changes and update the UI after confirming the switch was successful</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: User customizes output source names</summary>
    <div class="scenario-content">
      <ol>
        <li>Check the device's <code>FeatureMap (0xFFFC)</code> to confirm <strong>NU</strong> support (Bit 0 = 1)</li>
        <li>Read <code>OutputList (0x0000)</code> and display the output source list</li>
        <li>The user long-presses an output source (e.g., Index=2, current name "Bluetooth") to open the rename input dialog</li>
        <li>The user enters the new name "HomePod" and sends <code>RenameOutput (0x01)</code> with Index=2, Name="HomePod"</li>
        <li>Subscribe to <code>OutputList</code> changes and refresh the UI after confirming the name update</li>
      </ol>
      <p>
        <strong>Note</strong>: If the FeatureMap does not include the NU feature, the UI should not display a rename option;
        sending the RenameOutput command will be rejected by the device.
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
  'channel': {
    title: 'Channel Cluster (0x0504)',
    description: 'Complete reference for the Matter Channel Cluster (0x0504) — ChangeChannel fuzzy matching, ChangeChannelByNumber exact tuning, SkipChannel relative skip, ChannelList, Lineup info, CurrentChannel, and Feature Map.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>Channel Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0504</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, etc.)
  </p>
  <p>
    Channel handles channel navigation and lineup management — channel switching, skipping, name-based search, querying the channel list, and the Electronic Program Guide (EPG).
    It is one of the core Clusters for media devices such as smart TVs and set-top boxes. Unlike <a href="../media-input/">MediaInput</a> which manages physical input sources (HDMI, USB), Channel manages logical channels (CCTV-1, HBO).
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Four Optional Features</div>
    <p>
      The Channel Cluster defines four Features: <strong>CL</strong> (Channel List), <strong>LI</strong> (Lineup Info),
      <strong>EG</strong> (Electronic Guide), and <strong>RP</strong> (Record Program).
      The most basic devices can have none enabled — supporting only the ChangeChannelByNumber and SkipChannel basic tuning commands.
      Enabling CL provides a channel list for UI display; LI exposes operator and lineup info; EG enables EPG program guide queries; RP enables scheduled recording.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Values</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The Channel Cluster has 6 client commands and 2 response commands.
    Basic tuning (ChangeChannelByNumber / SkipChannel) is supported by all devices.
    ChangeChannel requires channel list or lineup info support (CL or LI), and GetProgramGuide and recording commands require more advanced features.
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
          <td>ChangeChannel</td>
          <td>Fuzzy match channel by name / call sign / number</td>
          <td class="col-required">CL or LI</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>ChangeChannelByNumber</td>
          <td>Exact tune by major + minor number</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>SkipChannel</td>
          <td>Skip forward / backward relative to current channel</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>GetProgramGuide</td>
          <td>Query the Electronic Program Guide (EPG)</td>
          <td class="col-required">EG</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>RecordProgram</td>
          <td>Schedule recording of a specified program</td>
          <td class="col-required">RP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>CancelRecordProgram</td>
          <td>Cancel a scheduled recording</td>
          <td class="col-required">RP</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>Response Commands</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Trigger Command</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeChannelResponse</td>
          <td>ChangeChannel</td>
          <td>Returns the match result status code and optional additional data</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>ProgramGuideResponse</td>
          <td>GetProgramGuide</td>
          <td>Returns the program list and pagination info</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeChannel — Fuzzy Match Channel (0x00)</h3>
  <p>
    Fuzzy matches and switches channels using a string against the channel list. The device sequentially matches channel fields including Name, CallSign, AffiliateCallSign,
    and number (MajorNumber-MinorNumber). If exactly one channel matches, it automatically switches and updates <code>CurrentChannel</code>;
    if multiple or zero matches are found, the device notifies the controller via <code>ChangeChannelResponse</code>.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Match</td>
          <td>string</td>
          <td>Match string — can be a channel name, call sign, number, etc. E.g., <code>"CCTV-6"</code>, <code>"HBO"</code>, <code>"6-1"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ChangeChannelResponse</h4>
  <p>Response to ChangeChannel, indicating the match result:</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Match result status (see enum below)</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string (optional)</td>
          <td>Additional information. May contain a list of matched channel names when MultipleMatches occurs</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// ChangeChannel command response (ChangeChannelResponse)
// Match successful
{
  "Status": 0,         // Success
  "Data": null
}

// Multiple matches found
{
  "Status": 1,         // MultipleMatches
  "Data": "CCTV-5 Sports, CCTV-5+ Events"
}

// No channels matched
{
  "Status": 2,         // NoMatches
  "Data": null
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Voice assistant scenario: the user says "Switch to CCTV-6", and the voice system passes the text to ChangeChannel's Match parameter.
        The device matches "CCTV-6 Movie" in the channel list — a unique hit — automatically switches, and returns Status = Success.
        If the user says "Switch to CCTV-5" but the device has both "CCTV-5 Sports" and "CCTV-5+ Events",
        it returns Status = MultipleMatches, and the app needs to let the user choose.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">ChangeChannelByNumber — Exact Tune (0x02)</h3>
  <p>
    Switches to a specific channel using the major number (MajorNumber) and minor number (MinorNumber).
    This is the most basic tuning command — it does not require the device to provide a channel list, and all devices implementing the Channel Cluster must support it.
    No response command is returned — on success, the <code>CurrentChannel</code> attribute updates.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>MajorNumber</td>
          <td>uint16</td>
          <td>Channel major number. E.g., the major number for CCTV-6 is <code>6</code></td>
        </tr>
        <tr>
          <td>MinorNumber</td>
          <td>uint16</td>
          <td>Channel minor number. Most channels have a minor number of <code>1</code>; minor numbers distinguish sub-channels under the same major number (e.g., 6-1, 6-2)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user clicks a channel in the app's channel list, and the app directly sends this command with the channel's MajorNumber and MinorNumber.
        Also applies to remote control numeric key input: the user presses "6-1", and the device parses it and calls ChangeChannelByNumber(6, 1).
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">SkipChannel — Relative Skip (0x03)</h3>
  <p>
    Skips a specified number of channels forward or backward relative to the current channel. Positive numbers skip forward (increasing channel numbers), negative numbers skip backward.
    The skip follows the device's internal channel ordering and wraps around at the end or beginning of the list.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Count</td>
          <td>int16</td>
          <td>Skip count. <code>+1</code> = next channel, <code>-1</code> = previous channel, <code>+5</code> = skip 5 channels forward</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Corresponds to the CH+/CH- buttons on the remote. The user presses CH+ and the app sends SkipChannel(+1);
        presses CH- and sends SkipChannel(-1). No need to know the current channel number or position in the list — the device handles it.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">GetProgramGuide — Query Program Guide (0x04)</h3>
  <p>
    Queries the Electronic Program Guide (EPG) data, returning the program list within the specified time range and channel range.
    This command requires the device to enable the <strong>EG (ElectronicGuide)</strong> feature.
    The response is returned via <code>ProgramGuideResponse</code> with pagination support.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>StartTime</td>
          <td>epoch-s (optional)</td>
          <td>Query start time (UTC seconds timestamp). Omit to start from current time</td>
        </tr>
        <tr>
          <td>EndTime</td>
          <td>epoch-s (optional)</td>
          <td>Query end time. Omit for no end time limit</td>
        </tr>
        <tr>
          <td>ChannelList</td>
          <td>list&lt;<a href="#struct-channel-info">ChannelInfoStruct</a>&gt; (optional)</td>
          <td>Limits the query to specific channels. Omit to query all channels</td>
        </tr>
        <tr>
          <td>PageToken</td>
          <td>PageTokenStruct (optional)</td>
          <td>Pagination token for fetching the next page of results</td>
        </tr>
        <tr>
          <td>RecordingFlag</td>
          <td>RecordingFlagBitmap (optional)</td>
          <td>Filter for scheduled or currently recording programs</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ProgramGuideResponse</div>
    <p>
      The response contains <code>ProgramList</code> (program list) and optional <code>Paging</code> (pagination info).
      Each program entry includes title, description, start/end time, channel, audio language, rating, and more.
      Since EPG data is typically large, controllers should use pagination and time/channel filters appropriately to control the response size.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">RecordProgram — Schedule Recording (0x05)</h3>
  <p>
    Schedules recording of a specified program. Locates the program to record via its unique identifier (ProgramIdentifier) or external ID.
    This command requires the device to enable the <strong>RP (RecordProgram)</strong> feature.
    This command is only supported by devices with storage capabilities (e.g., set-top boxes with hard drives, DVRs).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProgramIdentifier</td>
          <td>string</td>
          <td>Unique identifier of the program, from the Identifier field in EPG data</td>
        </tr>
        <tr>
          <td>ShouldRecordSeries</td>
          <td>bool</td>
          <td>Whether to record the entire series (not just a single episode)</td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;AdditionalInfoStruct&gt; (optional)</td>
          <td>External identifier list for cross-platform program identification</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>bytes (optional)</td>
          <td>Vendor-specific custom data</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">CancelRecordProgram — Cancel Recording (0x06)</h3>
  <p>
    Cancels a previously scheduled recording via RecordProgram. The parameter structure is the same as RecordProgram,
    identifying the recording to cancel via ProgramIdentifier. Requires the <strong>RP</strong> feature.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ProgramIdentifier</td>
          <td>string</td>
          <td>Identifier of the program whose recording to cancel</td>
        </tr>
        <tr>
          <td>ShouldRecordSeries</td>
          <td>bool</td>
          <td>Whether to cancel recording of the entire series</td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;AdditionalInfoStruct&gt; (optional)</td>
          <td>External identifier list</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>bytes (optional)</td>
          <td>Vendor-specific custom data</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The Channel Cluster has 3 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>ChannelList</td>
          <td>list&lt;<a href="#struct-channel-info">ChannelInfoStruct</a>&gt;</td>
          <td>List of all channels the device can tune to</td>
          <td class="col-required">CL</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Lineup</td>
          <td><a href="#struct-lineup-info">LineupInfoStruct</a></td>
          <td>Operator and lineup package information</td>
          <td class="col-required">LI</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CurrentChannel</td>
          <td><a href="#struct-channel-info">ChannelInfoStruct</a> / null</td>
          <td>The channel currently being viewed</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-channel">Channel Information (0x0000 ~ 0x0002)</h3>
  <p>Describes the device's available channel list, operator lineup information, and the currently selected channel.</p>

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
          <td>ChannelList</td>
          <td>list&lt;<a href="#struct-channel-info">ChannelInfoStruct</a>&gt;</td>
          <td>All viewable channels declared by the device. Each element is a <a href="#struct-channel-info">ChannelInfoStruct</a> containing channel number, name, call sign, type, and more. The list order determines the SkipChannel navigation order. <strong>Requires the CL feature</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Lineup</td>
          <td><a href="#struct-lineup-info">LineupInfoStruct</a></td>
          <td>The operator and lineup package information the device is connected to. Includes operator name, package name, postal code, etc. <strong>Requires LI feature</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CurrentChannel</td>
          <td><a href="#struct-channel-info">ChannelInfoStruct</a> / null</td>
          <td>The channel currently being viewed. Nullable — <code>null</code> indicates the device is not tuned to any channel (e.g., playing an HDMI input or streaming app). Changed via ChangeChannel / ChangeChannelByNumber / SkipChannel commands</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      Controllers should subscribe to <code>CurrentChannel</code> attribute changes to sync the app UI when the user changes channels via the remote.
      If the device supports the CL feature, also read <code>ChannelList</code> on initial connection to build the channel selection UI.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The Channel Cluster uses two core structures to describe channel and lineup information.</p>

  <!-- ChannelInfoStruct -->
  <h3 id="struct-channel-info">ChannelInfoStruct</h3>
  <p>Describes the complete information for a channel. MajorNumber and MinorNumber are required fields; the rest are optional.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MajorNumber</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>Channel major number. E.g., CCTV-6 corresponds to <code>6</code>, HBO to <code>100</code></td>
        </tr>
        <tr>
          <td>MinorNumber</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>Channel minor number. Sub-channels under the same major number are distinguished by minor number; most channels have minor number <code>1</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>No</td>
          <td>Channel name for UI display. E.g., <code>"CCTV-6 Movie"</code></td>
        </tr>
        <tr>
          <td>CallSign</td>
          <td>string</td>
          <td>No</td>
          <td>Channel call sign (broadcast identifier). E.g., <code>"CCTV6"</code>, <code>"HBO"</code></td>
        </tr>
        <tr>
          <td>AffiliateCallSign</td>
          <td>string</td>
          <td>No</td>
          <td>Affiliate call sign. Used for regional variants of the same channel, e.g., <code>"HBO East"</code></td>
        </tr>
        <tr>
          <td>Identifier</td>
          <td>string</td>
          <td>No</td>
          <td>Unique identifier for the channel, used to locate it in EPG and other systems. E.g., <code>"cctv6-hd"</code></td>
        </tr>
        <tr>
          <td>Type</td>
          <td><a href="#enum-channel-type">ChannelTypeEnum</a></td>
          <td>No</td>
          <td>Channel type — satellite, cable, terrestrial, or OTT streaming (see enum below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- LineupInfoStruct -->
  <h3 id="struct-lineup-info">LineupInfoStruct</h3>
  <p>Describes the operator lineup information for the device's current connection. OperatorName and LineupInfoType are required fields.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>OperatorName</td>
          <td>string</td>
          <td>Yes</td>
          <td>Operator name. E.g., <code>"China Broadcasting"</code>, <code>"Comcast"</code></td>
        </tr>
        <tr>
          <td>LineupName</td>
          <td>string</td>
          <td>No</td>
          <td>Lineup package name. E.g., <code>"Standard Digital Package"</code>, <code>"Premium HD Bundle"</code></td>
        </tr>
        <tr>
          <td>PostalCode</td>
          <td>string</td>
          <td>No</td>
          <td>Postal code of the device's location, used to distinguish channel lineup differences for the same operator in different regions</td>
        </tr>
        <tr>
          <td>LineupInfoType</td>
          <td><a href="#enum-lineup-info-type">LineupInfoTypeEnum</a></td>
          <td>Yes</td>
          <td>Lineup type (see enum below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Enum Values ====== -->
  <h2 id="enums">Enum Values</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>Match result status in ChangeChannelResponse:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Unique match successful — switched to the target channel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">MultipleMatches</span>
        <span class="enum-desc">Multiple channels matched — user needs to make a further selection</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NoMatches</span>
        <span class="enum-desc">No channels matched</span>
      </div>
    </div>
  </div>

  <!-- ChannelTypeEnum -->
  <h3 id="enum-channel-type">ChannelTypeEnum</h3>
  <p>Describes the channel's transmission method / source type:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Satellite</span>
        <span class="enum-desc">Satellite TV — received via satellite signal</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Cable</span>
        <span class="enum-desc">Cable TV — delivered via coaxial cable or fiber-to-the-home</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Terrestrial</span>
        <span class="enum-desc">Terrestrial — received via over-the-air broadcast (DVB-T / ATSC)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OTT</span>
        <span class="enum-desc">OTT streaming — delivered via the internet (IPTV / online live)</span>
      </div>
    </div>
  </div>

  <!-- LineupInfoTypeEnum -->
  <h3 id="enum-lineup-info-type">LineupInfoTypeEnum</h3>
  <p>Describes the lineup operator type:</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">MSO</span>
        <span class="enum-desc">Multiple System Operator — the most common type, such as cable TV companies and IPTV operators</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">LineupInfoType Currently Has Only One Value</div>
    <p>
      The Matter 1.4 specification currently defines only one enum value for LineupInfoTypeEnum: <code>MSO (0)</code>.
      Future versions may add more types. Device implementations should use <code>0</code> as the default value.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The Channel Cluster declares which optional capabilities the device supports via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CL (ChannelList)</span>
        <span class="enum-desc">Channel List — the device provides a browsable channel list (ChannelList attribute) and supports ChangeChannel fuzzy matching</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LI (LineupInfo)</span>
        <span class="enum-desc">Lineup Info — the device exposes operator and lineup package information (Lineup attribute) and may also support ChangeChannel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">EG (ElectronicGuide)</span>
        <span class="enum-desc">Electronic Guide — the device provides EPG data and supports the GetProgramGuide command for querying program info</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">RP (RecordProgram)</span>
        <span class="enum-desc">Record Program — the device supports scheduled recording via RecordProgram and CancelRecordProgram commands</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Feature Dependencies</div>
    <p>
      <strong>ChangeChannel</strong> requires at least CL or LI to be enabled; otherwise there is no data source for name matching.<br/>
      <strong>RP</strong> implicitly requires <strong>EG</strong> — to record programs, the device must first be able to query program information.<br/>
      <strong>ChangeChannelByNumber</strong> and <strong>SkipChannel</strong> do not depend on any feature; they are basic required commands.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the Channel Cluster from a set-top box with CL + LI features enabled, currently viewing CCTV-6:</p>

  <pre><code>{
  // --- Current Channel ---
  "0x0002": {                       // CurrentChannel
    "MajorNumber": 6,
    "MinorNumber": 1,
    "Name": "CCTV-6 Movies",
    "CallSign": "CCTV6",
    "AffiliateCallSign": null,
    "Identifier": "cctv6-hd",
    "Type": 2                        // Terrestrial
  },

  // --- Channel List (requires CL feature) ---
  "0x0000": [                        // ChannelList
    {
      "MajorNumber": 1,
      "MinorNumber": 1,
      "Name": "CCTV-1 General",
      "CallSign": "CCTV1",
      "AffiliateCallSign": null,
      "Identifier": "cctv1-hd",
      "Type": 2                      // Terrestrial
    },
    {
      "MajorNumber": 5,
      "MinorNumber": 1,
      "Name": "CCTV-5 Sports",
      "CallSign": "CCTV5",
      "AffiliateCallSign": null,
      "Identifier": "cctv5-hd",
      "Type": 2
    },
    {
      "MajorNumber": 6,
      "MinorNumber": 1,
      "Name": "CCTV-6 Movies",
      "CallSign": "CCTV6",
      "AffiliateCallSign": null,
      "Identifier": "cctv6-hd",
      "Type": 2
    },
    {
      "MajorNumber": 100,
      "MinorNumber": 1,
      "Name": "HBO",
      "CallSign": "HBO",
      "AffiliateCallSign": "HBO East",
      "Identifier": "hbo-east",
      "Type": 1                      // Cable
    }
  ],

  // --- Lineup Info (requires LI feature) ---
  "0x0001": {                        // Lineup
    "OperatorName": "China Broadcasting",
    "LineupName": "Standard Digital",
    "PostalCode": "100000",
    "LineupInfoType": 0              // MSO
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      For the simplest devices, there may only be the <code>CurrentChannel (0x0002)</code> attribute.
      Only devices supporting the CL feature return <code>ChannelList (0x0000)</code>, and only those supporting LI return <code>Lineup (0x0001)</code>.
      Check <code>FeatureMap (0xFFFC)</code> before reading to determine which features the device supports and avoid reading non-existent attributes.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: App channel list and tuning</summary>
    <div class="scenario-content">
      <ol>
        <li>Check <code>FeatureMap (0xFFFC)</code> to confirm <strong>CL</strong> support (Bit 0 = 1)</li>
        <li>Read <code>ChannelList (0x0000)</code> to get all channels (MajorNumber, MinorNumber, Name, CallSign, Type)</li>
        <li>Read <code>CurrentChannel (0x0002)</code> to highlight the current channel</li>
        <li>Display the channel list in the UI, optionally grouped by <code>Type</code> (terrestrial, cable, satellite, OTT)</li>
        <li>The user clicks a target channel and sends <code>ChangeChannelByNumber</code> with the channel's MajorNumber and MinorNumber</li>
        <li>Subscribe to <code>CurrentChannel</code> attribute changes and update the UI highlight after confirming the switch</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Voice assistant fuzzy channel search</summary>
    <div class="scenario-content">
      <ol>
        <li>Confirm the device supports <strong>CL</strong> or <strong>LI</strong> features (prerequisite for ChangeChannel)</li>
        <li>The user tells the voice assistant "Switch to HBO", and the voice system sends <code>ChangeChannel</code> with <code>"HBO"</code> as the Match parameter</li>
        <li>Check the ChangeChannelResponse Status:
          <ul>
            <li><strong>Success (0)</strong>: Channel switched, no further action needed</li>
            <li><strong>MultipleMatches (1)</strong>: Show the candidate channel list from Data to the user, then use ChangeChannelByNumber for exact tuning after their selection</li>
            <li><strong>NoMatches (2)</strong>: Notify the user that no matching channel was found and suggest different search terms</li>
          </ul>
        </li>
        <li>Subscribe to <code>CurrentChannel</code> to confirm the tuning result</li>
      </ol>
      <p>
        <strong>Note</strong>: The matching logic of ChangeChannel is determined by the device implementation. Different devices may produce different results for the same search term.
        Apps should gracefully handle both MultipleMatches and NoMatches cases.
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
  'keypad-input': {
    title: 'KeypadInput Cluster (0x0509)',
    description: 'Complete reference for the Matter KeypadInput Cluster (0x0509) — SendKey command, CecKeyCode key enums (navigation/numeric/media control/color/function keys), StatusEnum response status, NV/LK/NK feature description and usage scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>KeypadInput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0509</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, etc.)
  </p>
  <p>
    KeypadInput receives key inputs from remote controls and external controllers — directional navigation, numeric keys, media control keys, color function keys, etc.
    It is the core interaction Cluster for media devices such as smart TVs and set-top boxes, allowing phone apps to serve as remote controls.
    Key codes follow the HDMI-CEC standard (CEC Key Code), covering all common remote control buttons.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Three Key Categories</div>
    <p>
      KeypadInput uses three Features to indicate which key categories the device supports:
      <strong>NV</strong> (Navigation keys: directional, select, menu, etc.),
      <strong>LK</strong> (Location keys: channel numbers, favorites, etc.),
      <strong>NK</strong> (Number keys: 0~9, Enter, etc.).
      Check the FeatureMap before sending keys to avoid sending unsupported key categories.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The KeypadInput Cluster has only 1 command and 1 response. The controller sends <code>SendKey</code>, and the device returns <code>SendKeyResponse</code> with the processing result.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>SendKey</td>
          <td>Client &rarr; Server</td>
          <td>Send a key press to the device</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SendKeyResponse</td>
          <td>Server &rarr; Client</td>
          <td>Device processing result for SendKey</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SendKey — Send Key Press (0x00)</h3>
  <p>
    Sends a CEC key code to the device, simulating a remote control key press.
    The device processes the key based on its current state and returns <code>SendKeyResponse</code> with the result.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>KeyCode</td>
          <td><a href="#enum-cec-key-code">CecKeyCode</a></td>
          <td>Key code to send (see enum below)</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When the phone app serves as a remote control, the user taps a directional or select key, and the app sends the corresponding CecKeyCode via SendKey to the TV.
        For example, when the user presses "OK", it sends <code>KeyCode = 0x00 (Select)</code>.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">SendKeyResponse — Key Response (0x01)</h3>
  <p>
    The device's response to the SendKey command, indicating whether the key press was successfully processed.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Key processing result (see enum below)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// SendKey command example
// Send "Select" key (Select = 0x00)
{
  "KeyCode": 0       // CecKeyCode.Select
}

// Device returns SendKeyResponse
{
  "Status": 0        // StatusEnum.Success
}</code></pre>

  <div class="callout callout-warning">
    <div class="callout-title">Error Handling</div>
    <p>
      Controllers should handle exceptions based on <code>StatusEnum</code>:
      on <code>UnsupportedKey</code>, grey out or hide the corresponding button in the UI;
      on <code>InvalidKeyInCurrentState</code>, notify the user that the key is not available in the current state (e.g., pressing pause when not playing).
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>Processing results for SendKeyResponse.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Success — key press was processed normally by the device</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnsupportedKey</span>
        <span class="enum-desc">Unsupported — device does not recognize this key code</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidKeyInCurrentState</span>
        <span class="enum-desc">Invalid state — key not accepted in the current state (e.g., pressing pause when not playing)</span>
      </div>
    </div>
  </div>

  <!-- CecKeyCode -->
  <h3 id="enum-cec-key-code">CecKeyCode (CEC Key Codes)</h3>
  <p>
    Key code definitions following the HDMI-CEC standard, covering all common remote control buttons.
    Grouped by function for easy reference.
  </p>

  <!-- Navigation keys -->
  <h4 id="keys-navigation">Navigation Keys (NV Feature)</h4>
  <p>Directional navigation, select, back, menu, and other basic interaction keys — the core control area of the remote.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Select</span>
        <span class="enum-desc">Select / OK</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">Up</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">Down</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">Left</span>
        <span class="enum-desc">Left</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x04</span>
      <div>
        <span class="enum-name">Right</span>
        <span class="enum-desc">Right</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x05</span>
      <div>
        <span class="enum-name">RightUp</span>
        <span class="enum-desc">Right-Up</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x06</span>
      <div>
        <span class="enum-name">RightDown</span>
        <span class="enum-desc">Right-Down</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x07</span>
      <div>
        <span class="enum-name">LeftUp</span>
        <span class="enum-desc">Left-Up</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x08</span>
      <div>
        <span class="enum-name">LeftDown</span>
        <span class="enum-desc">Left-Down</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x09</span>
      <div>
        <span class="enum-name">RootMenu</span>
        <span class="enum-desc">Root Menu</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0A</span>
      <div>
        <span class="enum-name">SetupMenu</span>
        <span class="enum-desc">Setup Menu</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0B</span>
      <div>
        <span class="enum-name">ContentsMenu</span>
        <span class="enum-desc">Contents Menu</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0D</span>
      <div>
        <span class="enum-name">Exit</span>
        <span class="enum-desc">Exit</span>
      </div>
    </div>
  </div>

  <!-- Number keys -->
  <h4 id="keys-number">Number Keys (NK Feature)</h4>
  <p>0~9 numeric input and Enter confirmation, used for channel number entry, password input, etc.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x20</span>
      <div>
        <span class="enum-name">Number0OrNumber10</span>
        <span class="enum-desc">Number 0 (or 10)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x21</span>
      <div>
        <span class="enum-name">Numbers1</span>
        <span class="enum-desc">Number 1</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x22</span>
      <div>
        <span class="enum-name">Numbers2</span>
        <span class="enum-desc">Number 2</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x23</span>
      <div>
        <span class="enum-name">Numbers3</span>
        <span class="enum-desc">Number 3</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x24</span>
      <div>
        <span class="enum-name">Numbers4</span>
        <span class="enum-desc">Number 4</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x25</span>
      <div>
        <span class="enum-name">Numbers5</span>
        <span class="enum-desc">Number 5</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x26</span>
      <div>
        <span class="enum-name">Numbers6</span>
        <span class="enum-desc">Number 6</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x27</span>
      <div>
        <span class="enum-name">Numbers7</span>
        <span class="enum-desc">Number 7</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x28</span>
      <div>
        <span class="enum-name">Numbers8</span>
        <span class="enum-desc">Number 8</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x29</span>
      <div>
        <span class="enum-name">Numbers9</span>
        <span class="enum-desc">Number 9</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x2B</span>
      <div>
        <span class="enum-name">NumbersEnter</span>
        <span class="enum-desc">Number input confirm</span>
      </div>
    </div>
  </div>

  <!-- Media control keys -->
  <h4 id="keys-media">Media Control Keys</h4>
  <p>Play, pause, fast-forward, rewind, record, and other media playback control keys.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Play</span>
        <span class="enum-desc">Play</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">Stop</span>
        <span class="enum-desc">Stop</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">Pause</span>
        <span class="enum-desc">Pause</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">Record</span>
        <span class="enum-desc">Record</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">Rewind</span>
        <span class="enum-desc">Rewind</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">FastForward</span>
        <span class="enum-desc">Fast Forward</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">Eject</span>
        <span class="enum-desc">Eject</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x48</span>
      <div>
        <span class="enum-name">Forward</span>
        <span class="enum-desc">Next Track / Next Chapter</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x49</span>
      <div>
        <span class="enum-name">Backward</span>
        <span class="enum-desc">Previous Track / Previous Chapter</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4B</span>
      <div>
        <span class="enum-name">PausePlayFunction</span>
        <span class="enum-desc">Play/Pause Toggle</span>
      </div>
    </div>
  </div>

  <!-- Location/channel keys -->
  <h4 id="keys-location">Location / Channel Keys (LK Feature)</h4>
  <p>Channel switching, favorite channels, program guide, and other channel-related keys.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x30</span>
      <div>
        <span class="enum-name">ChannelUp</span>
        <span class="enum-desc">Channel +</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x31</span>
      <div>
        <span class="enum-name">ChannelDown</span>
        <span class="enum-desc">Channel -</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x32</span>
      <div>
        <span class="enum-name">PreviousChannel</span>
        <span class="enum-desc">Previous Channel (recall)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x60</span>
      <div>
        <span class="enum-name">Data</span>
        <span class="enum-desc">Data / Info</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x53</span>
      <div>
        <span class="enum-name">ElectronicProgramGuide</span>
        <span class="enum-desc">Electronic Program Guide (EPG)</span>
      </div>
    </div>
  </div>

  <!-- Power/volume keys -->
  <h4 id="keys-power-volume">Power / Volume Keys</h4>
  <p>Device power control and volume adjustment. These keys are typically not limited by Features and are supported by most devices.</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">Power</span>
        <span class="enum-desc">Power On/Off</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6B</span>
      <div>
        <span class="enum-name">PowerOffFunction</span>
        <span class="enum-desc">Power Off</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6C</span>
      <div>
        <span class="enum-name">PowerOnFunction</span>
        <span class="enum-desc">Power On</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">VolumeUp</span>
        <span class="enum-desc">Volume +</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">VolumeDown</span>
        <span class="enum-desc">Volume -</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">Mute</span>
        <span class="enum-desc">Mute</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6D</span>
      <div>
        <span class="enum-name">MuteFunction</span>
        <span class="enum-desc">Mute (mute only)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6E</span>
      <div>
        <span class="enum-name">RestoreVolumeFunction</span>
        <span class="enum-desc">Restore Volume (unmute)</span>
      </div>
    </div>
  </div>

  <!-- Color function keys -->
  <h4 id="keys-color">Color Function Keys</h4>
  <p>The four color shortcut keys on the remote (red, green, yellow, blue), with functions determined by the current UI context.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x72</span>
      <div>
        <span class="enum-name">F2Red</span>
        <span class="enum-desc">Red Key</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x73</span>
      <div>
        <span class="enum-name">F3Green</span>
        <span class="enum-desc">Green Key</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x74</span>
      <div>
        <span class="enum-name">F4Yellow</span>
        <span class="enum-desc">Yellow Key</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x75</span>
      <div>
        <span class="enum-name">F5Blue</span>
        <span class="enum-desc">Blue Key</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Full CEC Key Code List</div>
    <p>
      Only the most commonly used key codes are listed above. The complete CecKeyCode enum is defined in Matter 1.4 spec Section 9.10.4.1,
      with 80+ values including text input keys (F1~F5), audio selection, subtitle control, etc.
      In practice, only implement the keys used by the device and App UI.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The KeypadInput Cluster declares supported key categories via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NV (NavigationKeyCodes)</span>
        <span class="enum-desc">Navigation Keys — supports directional keys, select, menu, back, and other navigation operations</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LK (LocationKeys)</span>
        <span class="enum-desc">Location Keys — supports channel switching, channel number input, program guide, and other channel location operations</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">NK (NumberKeys)</span>
        <span class="enum-desc">Number Keys — supports 0~9 numeric input and number confirmation keys</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature to Key Mapping</div>
    <p>
      Devices do not necessarily support all keys. Check the FeatureMap before sending SendKey:
      without <strong>NV</strong>, do not send directional or menu keys;
      without <strong>NK</strong>, do not send numeric keys;
      without <strong>LK</strong>, do not send channel-related keys.
      Sending unsupported keys causes the device to return <code>UnsupportedKey</code>.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>The KeypadInput Cluster has no application attributes. Below is an example of reading the FeatureMap to determine device capabilities:</p>

  <pre><code>{
  // --- Feature Map ---
  "0xFFFC": 7          // FeatureMap = 0b111 (NV + LK + NK all enabled)

  // KeypadInput has no application attributes,
  // it only receives key input via the SendKey command.
  // Reading FeatureMap determines which key categories the device supports.
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      KeypadInput is a "command-only" Cluster — it has no readable application attributes and interacts solely through the SendKey command.
      The controller's remote UI should dynamically display key areas based on <code>FeatureMap</code>:
      show the directional pad if NV is supported, show the numeric keypad if NK is supported, and show channel switching buttons if LK is supported.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Phone app as remote control</summary>
    <div class="scenario-content">
      <ol>
        <li>Read the device's <code>FeatureMap (0xFFFC)</code> to determine supported key categories</li>
        <li>Dynamically render the remote UI based on Features:
          <ul>
            <li>NV enabled &rarr; show directional D-pad + select key + menu/back</li>
            <li>NK enabled &rarr; show numeric keypad (0~9 + Enter)</li>
            <li>LK enabled &rarr; show Channel +/- buttons and EPG entry</li>
          </ul>
        </li>
        <li>The user clicks a key on the UI and sends <code>SendKey (0x00)</code> with the corresponding CecKeyCode enum value</li>
        <li>Check the <code>SendKeyResponse</code> Status:
          <ul>
            <li><code>Success (0)</code> — normal, no further action needed</li>
            <li><code>UnsupportedKey (1)</code> — key not supported, mark as unavailable in the UI</li>
            <li><code>InvalidKeyInCurrentState (2)</code> — not available in the current state, notify the user</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Voice assistant controls TV playback</summary>
    <div class="scenario-content">
      <ol>
        <li>The user says "pause", and the voice assistant parses the intent as pause playback</li>
        <li>Send <code>SendKey</code> with KeyCode = <code>0x43 (Pause)</code></li>
        <li>The device returns <code>Success</code> and playback pauses</li>
        <li>The user says "resume playback" and sends <code>SendKey</code> with KeyCode = <code>0x41 (Play)</code></li>
        <li>
          <strong>Note</strong>: If the device is on a menu screen instead of in playback state, sending Pause may return
          <code>InvalidKeyInCurrentState</code> — the voice assistant should provide appropriate voice feedback
        </li>
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
  'content-launcher': {
    title: 'ContentLauncher Cluster (0x050A)',
    description: 'Complete reference for the Matter ContentLauncher Cluster (0x050A) — LaunchContent search-based launch, LaunchURL link playback, AcceptHeader supported types, SupportedStreamingProtocols, StatusEnum, ContentSearchStruct / ParameterStruct / BrandingInformationStruct and Feature Bitmap.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ContentLauncher Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050A</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, streaming device, etc.)
  </p>
  <p>
    ContentLauncher handles launching content playback on media devices — either by searching with criteria or by directly launching via URL.
    It is one of the core Clusters for smart TVs, set-top boxes, and streaming sticks, serving as the underlying implementation for voice assistant "play XXX" commands.
    Controllers can specify search keywords, playback preferences (subtitle language, start position), and branding information.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Three Features Determine Device Capabilities</div>
    <p>
      ContentLauncher defines three Features: <strong>CS (ContentSearch)</strong>, <strong>UP (URLPlayback)</strong>, and <strong>AP (AdvancedSeek)</strong>.
      CS enables the <code>LaunchContent</code> command (search-based launch), UP enables the <code>LaunchURL</code> command (direct URL launch),
      and AP allows <code>LaunchContent</code> to carry playback preferences (start position, subtitles, audio tracks).
      Devices should enable at least CS or UP; otherwise this Cluster has no practical use.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enums & Bitmaps</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The ContentLauncher Cluster has 2 request commands and 1 response command.
    LaunchContent searches for and launches content via criteria (requires CS feature), LaunchURL launches directly via URL (requires UP feature),
    and both return LauncherResponse with the launch result.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>LaunchContent</td>
          <td>Request</td>
          <td>Search for and launch content by criteria</td>
          <td class="col-required">CS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>LaunchURL</td>
          <td>Request</td>
          <td>Launch content directly by URL</td>
          <td class="col-required">UP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>LauncherResponse</td>
          <td>Response</td>
          <td>Launch result (shared by both commands)</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">LaunchContent — Search and Launch Content (0x00)</h3>
  <p>
    Searches for and launches content on the device using search criteria. The criteria are described by <a href="#struct-content-search">ContentSearchStruct</a>,
    which can combine multiple parameters (e.g., type + actor + genre) to precisely locate content. After receiving the command,
    the device either auto-plays (AutoPlay = true) or displays a search results list for the user to choose from.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Search</td>
          <td><a href="#struct-content-search">ContentSearchStruct</a></td>
          <td>Yes</td>
          <td>Search criteria containing a set of search parameters</td>
        </tr>
        <tr>
          <td>AutoPlay</td>
          <td>bool</td>
          <td>Yes</td>
          <td><code>true</code> = auto-play when found; <code>false</code> = only display search results</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>Application-specific additional data (e.g., season/episode info, playback parameters), parsed by the device</td>
        </tr>
        <tr>
          <td>PlaybackPreferences</td>
          <td><a href="#struct-playback-prefs">PlaybackPreferencesStruct</a></td>
          <td>No</td>
          <td>Playback preferences: start position, subtitle language, audio track selection. <strong>Requires AP feature</strong></td>
        </tr>
        <tr>
          <td>UseCurrentContext</td>
          <td>bool</td>
          <td>No</td>
          <td><code>true</code> = launch within the current playback context (e.g., search within the current app)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchContent command example
// Search for "Three-Body Problem" and auto-play, prefer Chinese subtitles
{
  "Search": {
    "ParameterList": [
      {
        "Type": 12,
        "Value": "Movie"
      },
      {
        "Type": 0,
        "Value": "Three-Body"
      }
    ]
  },
  "AutoPlay": true,
  "Data": "season=1&amp;episode=1",
  "PlaybackPreferences": {
    "PlaybackPosition": 0,
    "TextTrack": {
      "LanguageCode": "zh-CN",
      "Characteristics": [8]
    }
  },
  "UseCurrentContext": false
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user tells the voice assistant "Play Three-Body Problem Season 1". The assistant parses the search parameters (Type=Movie, Value="Three-Body"),
        constructs the ContentSearchStruct, sets AutoPlay=true, and sends the LaunchContent command.
        The TV searches for matching content in installed streaming apps and starts playback automatically.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">LaunchURL — Direct URL Launch (0x01)</h3>
  <p>
    Directly launches content playback on the device via URL. Suitable for scenarios where the content address is known,
    such as casting a video link from a phone app to the TV. Can include display text and branding information.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>ContentURL</td>
          <td>string</td>
          <td>Yes</td>
          <td>Content URL to play; the device must support the content format at this URL</td>
        </tr>
        <tr>
          <td>DisplayString</td>
          <td>string</td>
          <td>No</td>
          <td>Description text displayed on the device screen (e.g., video title)</td>
        </tr>
        <tr>
          <td>BrandingInformation</td>
          <td><a href="#struct-branding">BrandingInformationStruct</a></td>
          <td>No</td>
          <td>Content provider's branding display information (name, logo, background, etc.)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchURL command example
// Directly launch video via URL with branding info
{
  "ContentURL": "https://example.com/stream/movie-12345.m3u8",
  "DisplayString": "Three-Body Problem Season 1 Episode 1",
  "BrandingInformation": {
    "ProviderName": "ExampleTV"
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user sees a video on their phone and taps "Cast to TV". The app obtains the video's streaming URL
        and sends the LaunchURL command to the TV. The TV directly opens the URL for playback,
        displays the DisplayString as the video title, and shows the brand logo on the loading screen.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">LauncherResponse — Launch Result (0x02)</h3>
  <p>
    Unified response for LaunchContent and LaunchURL. Contains a status code and optional additional data.
    Controllers determine success based on Status; on failure, Data may contain error details.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Launch result status code (see enum below)</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>Optional additional data; may return a session ID on success or error info on failure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LauncherResponse example
// Launch successful
{
  "Status": 0,
  "Data": "playback-session-id=abc123"
}

// Launch failed — URL not available
{
  "Status": 1,
  "Data": "URL expired or geo-restricted"
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The ContentLauncher Cluster has 2 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>AcceptHeader</td>
          <td>list&lt;string&gt;</td>
          <td>List of content MIME types supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SupportedStreamingProtocols</td>
          <td><a href="#bitmap-protocols">SupportedProtocolsBitmap</a></td>
          <td>Bitmap of streaming protocols supported by the device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-content-caps">Content Capabilities (0x0000, 0x0001)</h3>
  <p>Describes the content types and streaming protocols the device can accept and play. Controllers should check these attributes before sending LaunchURL to ensure the device supports the target content format.</p>

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
          <td>AcceptHeader (Supported Content Types)</td>
          <td>list&lt;string&gt;</td>
          <td>List of MIME types the device can handle, following the HTTP Accept Header specification (e.g., <code>"video/mp4"</code>, <code>"application/dash+xml"</code>). Controllers should check if the target content's MIME type is in this list before sending LaunchURL. <strong>Requires UP feature</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SupportedStreamingProtocols (Supported Protocols)</td>
          <td><a href="#bitmap-protocols">SupportedProtocolsBitmap</a></td>
          <td>Bitmap of streaming protocols supported by the device. Controllers use this to select the appropriate stream address format (e.g., DASH .mpd or HLS .m3u8). <strong>Requires UP feature</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Relationship Between Attributes and Features</div>
    <p>
      AcceptHeader and SupportedStreamingProtocols are only meaningful when the <strong>UP (URLPlayback)</strong> feature is enabled.
      If the device only supports CS (content search), these two attributes may not exist — because search-based launching does not involve URL format decisions;
      content format is handled internally by the device's apps.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The ContentLauncher Cluster uses multiple structures to describe search criteria, playback preferences, and branding information.</p>

  <!-- ContentSearchStruct -->
  <h3 id="struct-content-search">ContentSearchStruct</h3>
  <p>Describes the complete criteria for a content search, containing a set of search parameters. Multiple parameters have an AND relationship — the device must satisfy all conditions simultaneously.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ParameterList</td>
          <td>list&lt;<a href="#struct-parameter">ParameterStruct</a>&gt;</td>
          <td>Search parameter list; each element specifies a search dimension (e.g., type, actor, genre)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ParameterStruct -->
  <h3 id="struct-parameter">ParameterStruct</h3>
  <p>Describes a single search parameter — consisting of parameter type, search value, and optional external IDs.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Type</td>
          <td><a href="#enum-parameter">ParameterEnum</a></td>
          <td>Parameter type (see enum below), determining the meaning of Value</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>string</td>
          <td>Search value, e.g., actor name <code>"Liu Cixin"</code>, genre <code>"Sci-Fi"</code></td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;<a href="#struct-additional-info">AdditionalInfoStruct</a>&gt;</td>
          <td>Optional. External platform ID list (e.g., IMDB ID, Douban ID) to help the device precisely match content</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- AdditionalInfoStruct -->
  <h3 id="struct-additional-info">AdditionalInfoStruct</h3>
  <p>Describes an external identifier key-value pair for cross-platform content matching.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>Identifier name, e.g., <code>"IMDB"</code>, <code>"Douban"</code>, <code>"TMDB"</code></td>
        </tr>
        <tr>
          <td>Value</td>
          <td>string</td>
          <td>Identifier value, e.g., <code>"tt1234567"</code> (IMDB number)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- BrandingInformationStruct -->
  <h3 id="struct-branding">BrandingInformationStruct</h3>
  <p>
    Describes content provider branding information for the LaunchURL command. The device can display the provider's brand elements while loading content.
    Except for ProviderName, all other fields are optional StyleInformationStruct (containing image URL, color, size, and other style information).
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ProviderName</td>
          <td>string</td>
          <td>Content provider name, e.g., <code>"Netflix"</code>, <code>"YouTube"</code></td>
        </tr>
        <tr>
          <td>Background</td>
          <td>StyleInformationStruct</td>
          <td>Optional. Background style information (image URL, color)</td>
        </tr>
        <tr>
          <td>Logo</td>
          <td>StyleInformationStruct</td>
          <td>Optional. Logo style information</td>
        </tr>
        <tr>
          <td>ProgressBar</td>
          <td>StyleInformationStruct</td>
          <td>Optional. Progress bar style information</td>
        </tr>
        <tr>
          <td>Splash</td>
          <td>StyleInformationStruct</td>
          <td>Optional. Splash screen style information</td>
        </tr>
        <tr>
          <td>WaterMark</td>
          <td>StyleInformationStruct</td>
          <td>Optional. Watermark style information</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PlaybackPreferencesStruct -->
  <h3 id="struct-playback-prefs">PlaybackPreferencesStruct</h3>
  <p>
    Describes playback preference settings, including start position, subtitle and audio track selection. This struct is only available when the <strong>AP (AdvancedSeek)</strong> feature is enabled.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>PlaybackPosition</td>
          <td>uint64</td>
          <td>Start playback position in milliseconds. <code>0</code> means from the beginning</td>
        </tr>
        <tr>
          <td>TextTrack</td>
          <td>TrackPreferenceStruct</td>
          <td>Subtitle track preference (language, characteristics)</td>
        </tr>
        <tr>
          <td>AudioTracks</td>
          <td>list&lt;TrackPreferenceStruct&gt;</td>
          <td>Optional. Audio track preference list, ordered by priority</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">TrackPreferenceStruct</div>
    <p>
      Track preference struct contains: <code>LanguageCode</code> (BCP-47 language code, e.g., <code>"zh-CN"</code>),
      optional <code>Characteristics</code> (track characteristics list, such as subtitles, commentary, dubbing, etc.), and
      optional <code>AudioOutputIndex</code> (specifying the audio output port index).
    </p>
  </div>

  <!-- ====== Enums & Bitmaps ====== -->
  <h2 id="enums">Enums & Bitmaps</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>Status codes in LauncherResponse, indicating the content launch result.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Success — content has been launched or search results displayed</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">URLNotAvailable</span>
        <span class="enum-desc">URL not available — link is inaccessible, format not supported, or expired</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AuthFailed</span>
        <span class="enum-desc">Auth failed — content requires login or insufficient permissions</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">TextTrackNotAvailable</span>
        <span class="enum-desc">Text track not available — requested subtitle language or type does not exist</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">AudioTrackNotAvailable</span>
        <span class="enum-desc">Audio track not available — requested audio track language or type does not exist</span>
      </div>
    </div>
  </div>

  <!-- ParameterEnum -->
  <h3 id="enum-parameter">ParameterEnum</h3>
  <p>
    Defines search parameter types. Controllers specify search dimensions via different Type values,
    and the device matches against its content library accordingly. Contains 14 enum values.
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Actor</span>
        <span class="enum-desc">Actor — search by actor name</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Channel</span>
        <span class="enum-desc">Channel — by channel name or number</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Character</span>
        <span class="enum-desc">Character — search by character name</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Director</span>
        <span class="enum-desc">Director — search by director name</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Event</span>
        <span class="enum-desc">Event — by sporting event or live event</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Franchise</span>
        <span class="enum-desc">Franchise — by content series or IP</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Genre</span>
        <span class="enum-desc">Genre — by genre tag (sci-fi, action, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">League</span>
        <span class="enum-desc">League — by sports league</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Popularity</span>
        <span class="enum-desc">Popularity — sort by popularity</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Provider</span>
        <span class="enum-desc">Provider — by content provider</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Sport</span>
        <span class="enum-desc">Sport — by sport type</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">SportsTeam</span>
        <span class="enum-desc">SportsTeam — by team name</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">Type</span>
        <span class="enum-desc">Type — content type (Movie / TV / Music, etc.)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">Video</span>
        <span class="enum-desc">Video — search directly by video title</span>
      </div>
    </div>
  </div>

  <!-- SupportedProtocolsBitmap -->
  <h3 id="bitmap-protocols">SupportedProtocolsBitmap</h3>
  <p>Bitmap of streaming protocols supported by the device. Controllers use this to select the appropriate stream address format.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DASH</span>
        <span class="enum-desc">Dynamic Adaptive Streaming over HTTP — corresponds to <code>.mpd</code> manifests</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">HLS</span>
        <span class="enum-desc">HTTP Live Streaming — corresponds to <code>.m3u8</code> manifests</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Protocol Selection</div>
    <p>
      If the device supports both DASH and HLS (value = <code>3</code>, i.e., <code>0b11</code>),
      the controller can flexibly choose based on the content source's available formats. Generally, Apple ecosystem prefers HLS, cross-platform scenarios prefer DASH.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The ContentLauncher Cluster declares device capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CS (ContentSearch)</span>
        <span class="enum-desc">Content Search — when enabled, supports the LaunchContent command for searching and launching content by criteria</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">UP (URLPlayback)</span>
        <span class="enum-desc">URL Playback — when enabled, supports the LaunchURL command and AcceptHeader / SupportedStreamingProtocols attributes</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">AP (AdvancedSeek)</span>
        <span class="enum-desc">Advanced Seek — when enabled, LaunchContent can carry PlaybackPreferences (playback position, subtitle, audio track preferences)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Enable At Least One</div>
    <p>
      Devices should enable at least <strong>CS</strong> or <strong>UP</strong>. If neither is enabled,
      the ContentLauncher Cluster has no usable commands, making it pointless to declare this Cluster.
      The AP feature enhances CS and is only effective when CS is enabled.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read results of the ContentLauncher Cluster from a smart TV supporting DASH and HLS:</p>

  <pre><code>{
  // --- Supported Content Types ---
  "0x0000": [                        // AcceptHeader
    "video/mp4",
    "video/webm",
    "audio/aac",
    "application/dash+xml",
    "application/x-mpegURL"
  ],

  // --- Supported Streaming Protocols ---
  "0x0001": 3                         // SupportedStreamingProtocols
                                      // = 0b11 (DASH + HLS)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Before sending LaunchURL, check <code>AcceptHeader (0x0000)</code> to confirm the device supports the target content's MIME type,
      then check <code>SupportedStreamingProtocols (0x0001)</code> to confirm the device's supported streaming protocols.
      If the target format is not in the supported range, notify the user in advance to avoid receiving a <code>URLNotAvailable</code> error.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Voice assistant "Play XXX"</summary>
    <div class="scenario-content">
      <ol>
        <li>The user tells the voice assistant "Play Three-Body Problem on the TV"</li>
        <li>Check the device <code>FeatureMap (0xFFFC)</code> to confirm <strong>CS</strong> support</li>
        <li>Construct <a href="#struct-content-search">ContentSearchStruct</a>: Type=Video(13), Value="Three-Body"</li>
        <li>Send <code>LaunchContent (0x00)</code> with AutoPlay=true</li>
        <li>The device searches for matching content in installed streaming apps and starts playback automatically</li>
        <li>Check the <a href="#cmd-0x02">LauncherResponse</a> Status:
          <ul>
            <li><code>0</code> (Success) — playback has started</li>
            <li><code>2</code> (AuthFailed) — content requires payment or login, notify the user</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Cast phone video to TV</summary>
    <div class="scenario-content">
      <ol>
        <li>The user is watching a video in the phone app and taps the "Cast" button</li>
        <li>Check the device <code>FeatureMap (0xFFFC)</code> to confirm <strong>UP</strong> support</li>
        <li>Read <code>AcceptHeader (0x0000)</code> to confirm the TV supports <code>video/mp4</code> or <code>application/x-mpegURL</code></li>
        <li>Read <code>SupportedStreamingProtocols (0x0001)</code> to select the appropriate stream address (e.g., HLS .m3u8)</li>
        <li>Send <code>LaunchURL (0x01)</code> with the video URL, title, and branding information</li>
        <li>The TV starts playback, displaying the brand logo and video title on screen</li>
        <li>Check <a href="#cmd-0x02">LauncherResponse</a>:
          <ul>
            <li><code>0</code> (Success) — casting successful</li>
            <li><code>1</code> (URLNotAvailable) — URL not available, possibly due to geo-restrictions or format incompatibility</li>
          </ul>
        </li>
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
  'target-navigator': {
    title: 'TargetNavigator Cluster (0x0505)',
    description: 'Complete reference for the Matter TargetNavigator Cluster (0x0505) — NavigateTarget command, TargetList, CurrentTarget, TargetInfoStruct, StatusEnum, and common scenarios.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>TargetNavigator Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0505</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, etc.)
  </p>
  <p>
    TargetNavigator handles navigation between content targets on a device — these targets can be apps, screen pages, menu items, etc.
    Users can query which targets are available on the device, which one is currently active, and navigate to a specific target.
    It is the core Cluster for app switching and UI navigation on media devices such as smart TVs and set-top boxes.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Difference from MediaInput</div>
    <p>
      <a href="../media-input/">MediaInput (0x0507)</a> manages physical/virtual input sources (e.g., HDMI 1, USB),
      while TargetNavigator manages software-level content targets (e.g., Netflix, YouTube, settings page).
      A smart TV may have both Clusters: MediaInput for switching input interfaces, TargetNavigator for switching apps.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enum Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The TargetNavigator Cluster has only 1 command and 1 response.
    NavigateTarget navigates to a specified target, and the device returns NavigateTargetResponse with the navigation result.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>NavigateTarget</td>
          <td>Client &rarr; Server</td>
          <td>Navigate to a specified target</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>NavigateTargetResponse</td>
          <td>Server &rarr; Client</td>
          <td>Navigation result response</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">NavigateTarget — Navigate to Target (0x00)</h3>
  <p>
    Requests the device to navigate to the specified target. <code>Target</code> must be the <code>Identifier</code> value
    of a <code>TargetInfoStruct</code> in <code>TargetList</code>.
    The optional <code>Data</code> field can pass additional navigation parameters (e.g., deep link path).
    The device returns <a href="#cmd-0x01">NavigateTargetResponse</a> with the result.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Target</td>
          <td>uint8</td>
          <td>Yes</td>
          <td>Target identifier; must exist in <code>TargetList</code></td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>Application-specific data passed to the target, such as deep link URL, launch parameters, etc.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// NavigateTarget command example
// Navigate to target with Identifier=1 (Netflix) with launch parameters
{
  "Target": 1,
  "Data": "movie/12345"
}

// NavigateTargetResponse response
{
  "Status": 0,                   // Success
  "Data": "launched"
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user selects to open Netflix on the TV from the phone app. The app reads <code>TargetList</code> to find Netflix's Identifier,
        sends the <code>NavigateTarget</code> command, and passes the movie ID in the Data field.
        The TV launches Netflix and navigates directly to the corresponding movie page.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">NavigateTargetResponse — Navigation Result Response (0x01)</h3>
  <p>
    The device's response to the NavigateTarget command. The <code>Status</code> field indicates navigation success,
    and the optional <code>Data</code> field can carry additional information from the device.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Yes</td>
          <td>Navigation result status (see enum below)</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>Additional information returned by the device, content is application-defined</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The TargetNavigator Cluster has 2 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>TargetList</td>
          <td>list&lt;<a href="#struct-target-info">TargetInfoStruct</a>&gt;</td>
          <td>List of all navigable targets on the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentTarget</td>
          <td>uint8</td>
          <td>Identifier of the currently active target</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-target">Target State (0x0000, 0x0001)</h3>
  <p>Describes the device's currently navigable target list and the currently active target.</p>

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
          <td>TargetList</td>
          <td>list&lt;<a href="#struct-target-info">TargetInfoStruct</a>&gt;</td>
          <td>All navigable targets declared by the device. Each element is a <a href="#struct-target-info">TargetInfoStruct</a>. The list reflects installed apps, accessible pages, or menu items on the device. Each Identifier value is unique. The list may change as apps are installed or uninstalled</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentTarget</td>
          <td>uint8</td>
          <td>Identifier of the currently active target. This value points to a <code>TargetInfoStruct.Identifier</code> in <code>TargetList</code>. A value of <code>0xFF</code> indicates no known target is currently active. Changed via the <code>NavigateTarget</code> command or when the user manually switches on the device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      Controllers should subscribe to <code>CurrentTarget</code> attribute changes to sync the highlight state in the app UI when the user manually switches apps via the remote or device UI.
      Also subscribe to <code>TargetList</code> to promptly update the available target list when apps are installed or uninstalled.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The TargetNavigator Cluster uses one structure to describe navigation target information.</p>

  <!-- TargetInfoStruct -->
  <h3 id="struct-target-info">TargetInfoStruct</h3>
  <p>Describes the basic information of a navigation target, including unique identifier and display name.</p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Identifier</td>
          <td>uint8</td>
          <td>Unique identifier for the target, unique within <code>TargetList</code>. Used to locate the target in the <code>NavigateTarget</code> command</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>Display name of the target, e.g., <code>"Netflix"</code>, <code>"Settings"</code>. Displayed to the user in the UI</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Comparison with MediaInput.InputInfoStruct</div>
    <p>
      TargetInfoStruct is more concise than <a href="../media-input/#struct-input-info">InputInfoStruct</a> —
      it has only two fields, Identifier and Name, without type enum or description fields.
      This is because the nature of navigation targets is determined by the applications themselves, unlike physical input interfaces which have fixed categories (HDMI, USB, etc.).
    </p>
  </div>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-status">StatusEnum</h3>
  <p>Enum values for the Status field in NavigateTargetResponse, indicating the navigation result.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Navigation successful — device has successfully switched to the target</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">TargetNotFound</span>
        <span class="enum-desc">Target not found — the specified Target identifier does not exist in TargetList</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAllowed</span>
        <span class="enum-desc">Navigation not allowed — the device's current state does not allow switching to this target (e.g., parental control restrictions)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the TargetNavigator Cluster from a smart TV — currently on the settings page, with 4 navigable targets:</p>

  <pre><code>{
  // --- Current Target ---
  "0x0001": 2,                   // CurrentTarget = 2 (currently on "Settings" page)

  // --- Target List ---
  "0x0000": [                    // TargetList
    {
      "Identifier": 0,
      "Name": "Home"              // Home screen
    },
    {
      "Identifier": 1,
      "Name": "Netflix"           // Netflix app
    },
    {
      "Identifier": 2,
      "Name": "Settings"          // System settings
    },
    {
      "Identifier": 3,
      "Name": "YouTube"           // YouTube app
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      When displaying the target list UI, controllers should first read <code>TargetList (0x0000)</code> to get the complete list,
      then read <code>CurrentTarget (0x0001)</code> to highlight the currently active target.
      Since TargetInfoStruct has no type enum, if icons are needed for different targets,
      you may need to match known app names (e.g., "Netflix", "YouTube") via the Name field to select icons.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: App remotely launches a streaming app on the TV</summary>
    <div class="scenario-content">
      <ol>
        <li>Read <code>TargetList (0x0000)</code> to get all navigable targets on the TV (Identifier, Name)</li>
        <li>Read <code>CurrentTarget (0x0001)</code> to highlight the currently active target</li>
        <li>Display the target list in the app UI; the user clicks "Netflix"</li>
        <li>Send <code>NavigateTarget (0x00)</code> with Target set to Netflix's Identifier value; Data can carry a deep link to the content to play</li>
        <li>Check the <code>NavigateTargetResponse</code> Status:
          <ul>
            <li><code>Success (0)</code> — navigation successful, subscribe to <code>CurrentTarget</code> to confirm the update and refresh the UI</li>
            <li><code>TargetNotFound (1)</code> — target no longer exists (app may have been uninstalled), refresh TargetList</li>
            <li><code>NotAllowed (2)</code> — access restricted, notify the user about possible parental control or policy restrictions</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Automation — voice command to switch apps</summary>
    <div class="scenario-content">
      <ol>
        <li>The user tells the voice assistant "Open YouTube"</li>
        <li>The voice assistant reads <code>TargetList (0x0000)</code> and matches "YouTube" by Name in the list</li>
        <li>After finding a match, sends <code>NavigateTarget (0x00)</code> with Target set to the corresponding Identifier</li>
        <li>If no matching name is found in TargetList, the voice assistant replies "That app is not in the available list"</li>
        <li>If <code>NotAllowed</code> is returned, the voice assistant says "Cannot open that app right now, it may be subject to usage restrictions"</li>
      </ol>
      <p>
        <strong>Note</strong>: Name field matching should account for case sensitivity and localization differences.
        Device manufacturers may use different name formats (e.g., "YouTube" vs "youtube" vs "YouTube TV"),
        so the voice assistant's matching logic should use fuzzy matching or normalization.
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
  'application-basic': {
    title: 'ApplicationBasic Cluster (0x050D)',
    description: 'Complete reference for the Matter ApplicationBasic Cluster (0x050D) — content app basic info, ApplicationStruct, ApplicationStatusEnum runtime status enum, AllowedVendorList access control, and all attribute definitions.',
    prev: { title: 'MediaPlayback', slug: 'media-playback' },
    next: undefined,
    content: `<h1>ApplicationBasic Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050D</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Application endpoint (each content app occupies a separate Endpoint)
  </p>
  <p>
    ApplicationBasic provides basic information about content apps (Content Apps) — including app name, vendor, version, runtime status, and unique identifier.
    It is a core Cluster in the Matter media/TV device ecosystem; each content app installed on a TV or set-top box exposes this Cluster through a separate Endpoint.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">One App = One Endpoint</div>
    <p>
      Matter's media architecture uses an <strong>"one Endpoint per app"</strong> model.
      For example, if a smart TV has 3 streaming apps installed (video, music, live), the device exposes their respective ApplicationBasic Clusters on Endpoints 3, 4, and 5.
      Controllers discover installed apps by enumerating Endpoints, then read each Endpoint's ApplicationBasic for app details.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs-enums">Structs & Enums</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Attribute Overview ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>ApplicationBasic has 8 attributes grouped into four categories. Click an attribute ID to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <!-- Vendor info -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>VendorName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Info</a></td>
          <td>App vendor name</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td><a href="#group-vendor">Vendor Info</a></td>
          <td>App vendor ID (assigned by CSA)</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ApplicationName</td>
          <td>string</td>
          <td><a href="#group-vendor">Vendor Info</a></td>
          <td>App name</td>
        </tr>
        <!-- Product identity -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td><a href="#group-product">Product Identity</a></td>
          <td>App product ID</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>Application</td>
          <td>ApplicationStruct</td>
          <td><a href="#group-product">Product Identity</a></td>
          <td>App unique identifier (catalog + ID)</td>
        </tr>
        <!-- Runtime status -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>Status</td>
          <td>ApplicationStatusEnum</td>
          <td><a href="#group-status">Runtime Status</a></td>
          <td>App current runtime status</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ApplicationVersion</td>
          <td>string</td>
          <td><a href="#group-status">Runtime Status</a></td>
          <td>App version</td>
        </tr>
        <!-- Access control -->
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>AllowedVendorList</td>
          <td>list&lt;vendor-id&gt;</td>
          <td><a href="#group-acl">Access Control</a></td>
          <td>List of vendor IDs allowed to access this app</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Vendor Information (0x0000-0x0002) ====== -->
  <h3 id="group-vendor">Vendor Information (0x0000 – 0x0002)</h3>
  <p>Describes the app's vendor and name. These attributes are determined after app installation and cannot be changed at runtime.</p>

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
          <td>VendorName (Vendor Name)</td>
          <td>string</td>
          <td>Human-readable name of the app vendor, max 32 characters. E.g., <code>"Netflix"</code>, <code>"YouTube"</code>. Optional attribute</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>VendorID (Vendor ID)</td>
          <td>vendor-id</td>
          <td>CSA vendor number of the app vendor. If the app vendor has not registered with CSA, this value is <code>0</code>. Optional attribute</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ApplicationName（App name）</td>
          <td>string</td>
          <td>Human-readable name of the app, max 32 characters. E.g., <code>"Netflix"</code>, <code>"Spotify"</code>. <strong>Required attribute</strong>, and the only required attribute in ApplicationBasic</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Product Identity (0x0003-0x0004) ====== -->
  <h3 id="group-product">Product Identity (0x0003 – 0x0004)</h3>
  <p>
    The app's product number and globally unique identifier. The <code>Application</code> attribute is the most important identifier — it uniquely locates an app through the catalog system.
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
        <tr id="attr-0x0003">
          <td><code>0x0003</code></td>
          <td>ProductID (Product ID)</td>
          <td>uint16</td>
          <td>Product number assigned by the app vendor. Combined with VendorID, identifies a specific app product. Optional attribute</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>Application (App Identifier)</td>
          <td>ApplicationStruct</td>
          <td>Globally unique identifier for the app, consisting of catalog vendor ID and application ID (see <a href="#struct-application">ApplicationStruct</a> below). Optional attribute</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Application vs VendorID + ProductID</div>
    <p>
      <code>VendorID + ProductID</code> identifies "which product by which vendor" — a vendor-dimension identifier.
      <code>Application</code> (ApplicationStruct) identifies "which app in which catalog" — a platform-dimension identifier.
      For example, the same video app may have an ID of <code>"com.example.video"</code> in the CSA catalog but a different ID in another platform catalog.
      Controllers typically use <code>Application</code> to locate and launch specific content apps.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Runtime Status (0x0005-0x0006) ====== -->
  <h3 id="group-status">Runtime Status (0x0005 – 0x0006)</h3>
  <p>Describes the app's current runtime status and version information.</p>

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
        <tr id="attr-0x0005">
          <td><code>0x0005</code></td>
          <td>Status (Runtime Status)</td>
          <td>ApplicationStatusEnum</td>
          <td>Current runtime status of the app (see <a href="#enum-status">ApplicationStatusEnum</a> below). Optional attribute</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ApplicationVersion (App Version)</td>
          <td>string</td>
          <td>App version string, max 32 characters. E.g., <code>"2.1.0"</code>, <code>"3.0.0-beta"</code>. <strong>Required attribute</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Access Control (0x0007) ====== -->
  <h3 id="group-acl">Access Control (0x0007)</h3>
  <p>Controls which vendors' Controllers can access this app's Clusters.</p>

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
        <tr id="attr-0x0007">
          <td><code>0x0007</code></td>
          <td>AllowedVendorList (Allowed Vendor List)</td>
          <td>list&lt;vendor-id&gt;</td>
          <td>
            List of vendor IDs allowed to access this content app.
            Only Controllers produced by vendors in this list can interact with this app's Clusters.
            <strong>Required attribute</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">AllowedVendorList and ACL Relationship</div>
    <p>
      <code>AllowedVendorList</code> is an <strong>additional</strong> access control layer on top of the standard ACL (Access Control List).
      Even if a Controller passes ACL checks, it still cannot access Clusters on this app's Endpoint if its VendorID is not in AllowedVendorList (except ApplicationBasic itself).
      This mechanism allows content providers to restrict app control to only partner devices.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Structs & Enums ====== -->
  <h2 id="structs-enums">Structs & Enums</h2>

  <!-- ApplicationStruct -->
  <h3 id="struct-application">ApplicationStruct (App Identifier Struct)</h3>
  <p>
    Uniquely identifies a content app through the catalog system. Different app catalogs (e.g., CSA, Google Play, Apple App Store)
    each have their own numbering system. <code>CatalogVendorID</code> specifies which catalog, and <code>ApplicationID</code> is the app identifier within that catalog.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CatalogVendorID</td>
          <td>uint16</td>
          <td>Vendor ID of the app catalog. Identifies which app catalog/platform the app comes from. E.g., CSA's own catalog or an OTT platform's catalog</td>
        </tr>
        <tr>
          <td>ApplicationID</td>
          <td>string</td>
          <td>String that uniquely identifies the app within the catalog. Format defined by the catalog, typically reverse domain name style, e.g., <code>"com.netflix.app"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Meaning of CatalogVendorID</div>
    <p>
      <code>CatalogVendorID</code> is NOT the app vendor's VendorID, but rather the <strong>app catalog provider's</strong> VendorID.
      Think of it as: which "app store" the app is listed in.
      If CatalogVendorID corresponds to the CSA official catalog (value <code>0x60AE</code> = 24750),
      then ApplicationID is the app identifier in the CSA catalog system.
    </p>
  </div>

  <!-- ApplicationStatusEnum -->
  <h3 id="enum-status">ApplicationStatusEnum (App Runtime Status Enum)</h3>
  <p>Describes the current runtime and visibility status of a content app.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">Stopped — app is not running, needs to be launched before use</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ActiveVisibleFocus</span>
        <span class="enum-desc">Foreground running — app is running, visible, and has user input focus (the currently active app)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActiveHidden</span>
        <span class="enum-desc">Background running — app is running but not visible (e.g., playing music in background)</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ActiveVisibleNotFocus</span>
        <span class="enum-desc">Visible without focus — app is running and visible, but user focus is on another app (e.g., picture-in-picture mode)</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">State Transition Scenarios</div>
    <p>
      Typical state transition path: when the user opens an app, <code>Stopped &rarr; ActiveVisibleFocus</code>;
      when switching to another app, <code>ActiveVisibleFocus &rarr; ActiveHidden</code> (fully hidden) or
      <code>ActiveVisibleFocus &rarr; ActiveVisibleNotFocus</code> (picture-in-picture);
      when the user closes the app, it returns to <code>Stopped</code>.
      Controllers can subscribe to Status attribute changes to track the app lifecycle.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ApplicationBasic does not define any commands. App launching and control are handled by other Clusters:
  </p>
  <ul>
    <li><strong>ApplicationLauncher</strong> (0x050C) — handles launching, stopping, and hiding apps</li>
    <li><strong>MediaPlayback</strong> (0x0506) — handles playback control (play, pause, fast-forward, etc.)</li>
    <li><strong>ContentLauncher</strong> (0x050A) — handles launching specific content (e.g., opening a video)</li>
  </ul>
  <p>
    ApplicationBasic's role is <strong>read-only information query</strong> — it tells the Controller "what this app is",
    not "what to do with this app".
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read results of the ApplicationBasic Cluster from a streaming app (Endpoint 3) on a smart TV:</p>

  <pre><code>{
  // --- Vendor Information ---
  "0x0000": "StreamCo",            // VendorName = App vendor name
  "0x0001": 4996,                  // VendorID = 0x1384 (assigned by CSA)
  "0x0002": "StreamCo Player",     // ApplicationName = App name

  // --- Product Identity ---
  "0x0003": 101,                   // ProductID = App product ID
  "0x0004": {                      // Application (app identifier struct)
    "CatalogVendorID": 24742,      //   CatalogVendorID = CSA catalog
    "ApplicationID": "com.streamco.player"  //   ApplicationID = app ID
  },

  // --- Runtime Status ---
  "0x0005": 1,                     // Status = ActiveVisibleFocus (foreground, visible with focus)
  "0x0006": "2.1.0",               // ApplicationVersion = App version

  // --- Access Control ---
  "0x0007": [4996, 65521]          // AllowedVendorList = List of vendor IDs allowed to access this app
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Typical Flow for Reading App Information</div>
    <p>
      Standard flow for a Controller to discover installed apps on a device:
    </p>
    <ol>
      <li>Read the <code>PartsList</code> from Endpoint 0's <code>Descriptor Cluster (0x001D)</code> to get all Endpoint numbers</li>
      <li>For each Endpoint, read its Descriptor's <code>ServerList</code> and check if it contains <code>0x050D</code> (ApplicationBasic)</li>
      <li>If found, read that Endpoint's <code>ApplicationName (0x0002)</code> and <code>Application (0x0004)</code> for the app name and identifier</li>
      <li>Read <code>Status (0x0005)</code> to determine if the app is currently running</li>
    </ol>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Discover and display all content apps on the TV</summary>
    <div class="scenario-content">
      <p>
        After the phone app connects to a smart TV, it needs to list all content apps installed on the TV in the interface (similar to the TV remote's app list).
      </p>
      <ol>
        <li>Read the Descriptor Cluster of Endpoint 0 to get <code>PartsList</code> (all child Endpoints)</li>
        <li>Check each Endpoint's <code>ServerList</code> one by one, filtering for those containing <code>0x050D</code></li>
        <li>For each app Endpoint, batch read <code>ApplicationName</code>, <code>VendorName</code>, <code>ApplicationVersion</code>, and <code>Status</code></li>
        <li>Render the app list in the app interface, showing name, version, and runtime status (e.g., "Running" or "Stopped")</li>
      </ol>
      <p>
        <strong>Note</strong>: Not all Endpoints are content apps — some may be other device types such as lights or sensors.
        More precise filtering can be achieved by checking if the Descriptor's <code>DeviceTypeList</code> contains Content App (0x0024).
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Locate and launch a specific app via app identifier</summary>
    <div class="scenario-content">
      <p>
        The user says "Open Netflix", and the Controller needs to find the Endpoint for Netflix and launch it.
      </p>
      <ol>
        <li>Iterate through all app Endpoints and read each Endpoint's <code>Application (0x0004)</code> attribute</li>
        <li>Compare <code>CatalogVendorID</code> and <code>ApplicationID</code> in <code>ApplicationStruct</code> to find the target app</li>
        <li>Check <code>Status (0x0005)</code>: if already <code>ActiveVisibleFocus (1)</code>, no action needed</li>
        <li>If <code>Stopped (0)</code> or another status, send the LaunchApp command via <strong>ApplicationLauncher Cluster (0x050C)</strong> to launch the app</li>
        <li>Subscribe to <code>Status</code> attribute changes to confirm the app successfully entered <code>ActiveVisibleFocus</code> state</li>
      </ol>
      <p>
        <strong>Note</strong>: Launching an app is not ApplicationBasic's responsibility — it only provides information queries.
        The actual launch operation is performed by the ApplicationLauncher Cluster on the same Endpoint.
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
  'application-launcher': {
    title: 'ApplicationLauncher Cluster (0x050C)',
    description: 'Complete reference for the Matter ApplicationLauncher Cluster (0x050C) — LaunchApp, StopApp, HideApp, LauncherResponse, CatalogList, CurrentApp, ApplicationEPStruct / ApplicationStruct, StatusEnum, and Feature Bitmap.',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ApplicationLauncher Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050C</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (smart TV, set-top box, streaming device, etc.)
  </p>
  <p>
    ApplicationLauncher handles launching, stopping, and hiding content apps on media devices —
    it is the underlying implementation for voice assistant commands like "Open Netflix" and "Close the current app".
    It manages the app lifecycle (launch/stop/hide), not in-app content playback.
    Typically deployed on the media endpoint of smart TVs or set-top boxes, used in conjunction with
    <a href="../application-basic/">ApplicationBasic</a> (app information queries).
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Division of Labor with ApplicationBasic</div>
    <p>
      <a href="../application-basic/">ApplicationBasic</a> (0x050D) handles <strong>read-only information queries</strong> — tells the Controller "what this app is and its current status".
      ApplicationLauncher (0x050C) handles <strong>operations</strong> — launching, stopping, and hiding apps.
      Both are typically deployed on the same Endpoint: first use ApplicationBasic to get app info, then use ApplicationLauncher to control the app lifecycle.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs">Struct Definitions</a>
    <span class="nav-sep">|</span>
    <a href="#enums">Enums</a>
    <span class="nav-sep">|</span>
    <a href="#features">Feature Bitmap</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The ApplicationLauncher Cluster has 3 request commands and 1 response command.
    LaunchApp launches an app, StopApp stops it, HideApp hides it (moves to background), and all three return LauncherResponse with the operation result.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
          <th>Required Feature</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>LaunchApp</td>
          <td>Request</td>
          <td>Launch the specified app</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>StopApp</td>
          <td>Request</td>
          <td>Stop the specified app</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>HideApp</td>
          <td>Request</td>
          <td>Hide the specified app (move to background)</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>LauncherResponse</td>
          <td>Response</td>
          <td>Operation result (shared by all three commands)</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">LaunchApp — Launch App (0x00)</h3>
  <p>
    Launches the specified app on the device. If the app is already running, it is brought to the foreground.
    The target app is uniquely identified via <a href="#struct-application">ApplicationStruct</a>,
    and can carry application-specific data (e.g., DeepLink, launch parameters).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td><a href="#struct-application">ApplicationStruct</a></td>
          <td>No</td>
          <td>App identifier to launch. Omit to launch the app on the current Endpoint</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>octstr</td>
          <td>No</td>
          <td>Application-specific additional data (e.g., DeepLink, launch parameters), parsed by the app</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchApp command example
// Launch the StreamCo Player app from the CSA catalog
{
  "Application": {
    "CatalogVendorID": 24742,
    "ApplicationID": "com.streamco.player"
  },
  "Data": "source=voice&amp;deeplink=/home"
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user tells the voice assistant "Open Netflix". The assistant finds Netflix's ApplicationStruct (CatalogVendorID + ApplicationID)
        and sends the LaunchApp command. The TV launches Netflix and switches it to the foreground.
        If Data is included (e.g., DeepLink), Netflix can navigate directly to the specified page.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">StopApp — Stop App (0x01)</h3>
  <p>
    Stops the specified app on the device. The app's runtime status changes to Stopped.
    If the app is playing content, playback is also terminated.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td><a href="#struct-application">ApplicationStruct</a></td>
          <td>No</td>
          <td>App identifier to stop. Omit to stop the app on the current Endpoint</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// StopApp command example
// Stop the currently running StreamCo Player app
{
  "Application": {
    "CatalogVendorID": 24742,
    "ApplicationID": "com.streamco.player"
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        The user says "Close Netflix", or an automation rule automatically stops all running entertainment apps after 11 PM.
        StopApp completely terminates the app process and releases system resources. Unlike HideApp, a stopped app needs to be relaunched to use.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">HideApp — Hide App (0x02)</h3>
  <p>
    Moves the app to the background without terminating its process. The app status changes to ActiveHidden,
    and it can still perform background tasks (e.g., continue playing music).
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Required</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td><a href="#struct-application">ApplicationStruct</a></td>
          <td>No</td>
          <td>App identifier to hide. Omit to hide the app on the current Endpoint</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// HideApp command example
// Hide app (move to background, process not terminated)
{
  "Application": {
    "CatalogVendorID": 24742,
    "ApplicationID": "com.streamco.player"
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        When the user receives a call while watching a video, the system sends HideApp to move the video app to the background and display the call screen.
        After the call ends, LaunchApp brings the video app back to the foreground, and it can resume playback from where it was interrupted.
        Difference from StopApp: HideApp preserves app state, suitable for temporary switching; StopApp completely closes the app, suitable for releasing resources when no longer in use.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">LauncherResponse — Operation Result (0x03)</h3>
  <p>
    Unified response for LaunchApp, StopApp, and HideApp. Contains a status code and optional additional data.
    Controllers determine success based on Status; on failure, Data may contain error details.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>Operation result status code (see enum below)</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>octstr</td>
          <td>Optional additional data; may return session info on success or error description on failure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LauncherResponse example
// Launch successful
{
  "Status": 0,
  "Data": "session-id=xyz789"
}

// App not available (not installed or not in catalog)
{
  "Status": 1,
  "Data": "Application not found in catalog"
}

// Waiting for user approval (e.g., first launch requires agreeing to terms)
{
  "Status": 3,
  "Data": "User approval required for first launch"
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>The ApplicationLauncher Cluster has 2 attributes. Click an attribute ID in the summary table below to jump to its detailed description.</p>

  <!-- Attribute summary table -->
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
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>CatalogList</td>
          <td>list&lt;uint16&gt;</td>
          <td>List of app catalog vendor IDs supported by the device</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentApp</td>
          <td>nullable <a href="#struct-app-ep">ApplicationEPStruct</a></td>
          <td>Currently foreground-running app</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Attribute Details ====== -->
  <h3 id="group-attrs">App Management (0x0000, 0x0001)</h3>
  <p>Describes the app catalog scope supported by the device and the current foreground app status.</p>

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
          <td>CatalogList (Catalog List)</td>
          <td>list&lt;uint16&gt;</td>
          <td>
            List of app catalog vendor IDs (CatalogVendorID) supported by the device.
            When a Controller sends LaunchApp, the CatalogVendorID in the Application parameter must be in this list; otherwise the device cannot recognize the app identifier.
            <strong>Requires AP feature</strong>
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentApp (Current App)</td>
          <td>nullable <a href="#struct-app-ep">ApplicationEPStruct</a></td>
          <td>
            Information about the currently foreground app, including app identifier and its Endpoint.
            <code>null</code> when no app is in the foreground.
            <strong>Requires AP feature</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Difference Between CurrentApp and ApplicationBasic.Status</div>
    <p>
      <code>CurrentApp</code> provides a device-global view of "which app is in the foreground", while
      <a href="../application-basic/">ApplicationBasic</a>'s <code>Status</code> attribute is each app's own report of its runtime status.
      A TV may have multiple apps with Status = ActiveHidden (running in background), but CurrentApp points to only one foreground app (or null).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== Struct Definitions ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>The ApplicationLauncher Cluster uses two structures to identify apps.</p>

  <!-- ApplicationEPStruct -->
  <h3 id="struct-app-ep">ApplicationEPStruct (App Endpoint Struct)</h3>
  <p>
    Describes an app and its corresponding Endpoint on the device. Used in the <code>CurrentApp</code> attribute,
    allowing Controllers to both know what the current foreground app is and directly locate its Endpoint for further interaction.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Application</td>
          <td><a href="#struct-application">ApplicationStruct</a></td>
          <td>Yes</td>
          <td>App's unique identifier (catalog vendor ID + app ID)</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>No</td>
          <td>Endpoint number where the app resides. With this number, the Controller can directly access other Clusters on that Endpoint (e.g., MediaPlayback, ContentLauncher)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ApplicationStruct -->
  <h3 id="struct-application">ApplicationStruct (App Identifier Struct)</h3>
  <p>
    Uniquely identifies a content app through the catalog system. This struct is used in LaunchApp / StopApp / HideApp commands and the CurrentApp attribute,
    and shares the same structure as the <a href="../application-basic/">ApplicationBasic</a> Cluster's Application (0x0004) attribute.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Field</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CatalogVendorID</td>
          <td>uint16</td>
          <td>Vendor ID of the app catalog, identifying which catalog/platform the app comes from. E.g., the CSA official catalog ID is <code>0x60AE</code> (24750)</td>
        </tr>
        <tr>
          <td>ApplicationID</td>
          <td>string</td>
          <td>String that uniquely identifies the app within the catalog, typically reverse domain name style. E.g., <code>"com.netflix.app"</code>, <code>"com.youtube.tv"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">CatalogVendorID Is Not the App Vendor</div>
    <p>
      <code>CatalogVendorID</code> is the VendorID of the <strong>app catalog provider</strong>, not the app vendor.
      Think of it as "which app store this app is listed in".
      The same app may have different ApplicationIDs in different catalogs, but the CatalogVendorID + ApplicationID combination is globally unique.
    </p>
  </div>

  <!-- ====== Enums ====== -->
  <h2 id="enums">Enums</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>Status codes in LauncherResponse, indicating the app operation result. Compared to ContentLauncher's StatusEnum, ApplicationLauncher's status codes cover app installation and permission approval scenarios.</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">Success — app has been launched/stopped/hidden</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AppNotAvailable</span>
        <span class="enum-desc">App not available — not installed, not in catalog, or delisted</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">SystemBusy</span>
        <span class="enum-desc">System busy — insufficient device resources, cannot launch a new app</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PendingUserApproval</span>
        <span class="enum-desc">Pending user approval — first launch requires user to agree to terms or authorize</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Downloading</span>
        <span class="enum-desc">Downloading — app is downloading, installation not yet complete</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Installing</span>
        <span class="enum-desc">Installing — app has been downloaded, installation in progress</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Non-Final States: Downloading and Installing</div>
    <p>
      <code>Downloading (4)</code> and <code>Installing (5)</code> are intermediate states — receiving them does not mean the operation failed.
      The Controller needs to wait and retry LaunchApp, or subscribe to related attribute changes to learn when installation is complete.
      <code>PendingUserApproval (3)</code> is similar — the user needs to complete confirmation on the device before proceeding.
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>The ApplicationLauncher Cluster declares device capabilities via <code>FeatureMap</code> (0xFFFC):</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">AP (ApplicationPlatform)</span>
        <span class="enum-desc">Application Platform — the device is an app platform (e.g., smart TV) supporting multiple independently managed content apps. When enabled, provides CatalogList and CurrentApp attributes</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Meaning of AP Feature</div>
    <p>
      A device without the AP feature is a <strong>single-app device</strong> — the device itself is the app, and LaunchApp/StopApp/HideApp operate on the device itself.
      With AP enabled, the device is an <strong>app platform</strong> (e.g., smart TV, set-top box) with multiple independent apps installed,
      each with its own Endpoint and ApplicationBasic Cluster.
      The CatalogList (which app catalogs the device supports) and CurrentApp (which app is currently in the foreground) attributes are only available when AP is enabled.
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Attribute read results of the ApplicationLauncher Cluster from a smart TV with AP (ApplicationPlatform) enabled:</p>

  <pre><code>{
  // --- Supported App Catalogs ---
  "0x0000": [24742, 4996],           // CatalogList = supported catalog vendor ID list
                                      // 24742 = CSA official catalog
                                      // 4996 = an OTT platform catalog

  // --- Current Foreground App ---
  "0x0001": {                         // CurrentApp (current app, nullable)
    "Application": {                  //   ApplicationStruct
      "CatalogVendorID": 24742,       //     Catalog vendor ID (CSA official)
      "ApplicationID": "com.streamco.player"  //  App ID
    },
    "Endpoint": 3                     //   Endpoint number of the app
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      Before sending LaunchApp, read <code>CatalogList (0x0000)</code> to confirm the device supports the target app's catalog.
      If the CatalogVendorID is not in the list, LaunchApp will return <code>AppNotAvailable (1)</code>.
      After sending, check <code>CurrentApp (0x0001)</code> changes to confirm the app successfully switched to the foreground.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Voice assistant "Open XXX app"</summary>
    <div class="scenario-content">
      <ol>
        <li>The user tells the voice assistant "Open Netflix on the TV"</li>
        <li>Check the device <code>FeatureMap (0xFFFC)</code> to confirm <strong>AP</strong> support</li>
        <li>Read <code>CatalogList (0x0000)</code> to confirm the device supports the CSA official catalog (24742)</li>
        <li>Iterate through the device's Endpoints, read <a href="../application-basic/">ApplicationBasic</a>'s <code>Application (0x0004)</code> attribute, and find Netflix's ApplicationStruct</li>
        <li>Send <code>LaunchApp (0x00)</code> with Netflix's ApplicationStruct</li>
        <li>Check <a href="#cmd-0x03">LauncherResponse</a> Status:
          <ul>
            <li><code>0</code> (Success) — Netflix has been launched</li>
            <li><code>1</code> (AppNotAvailable) — Netflix is not installed, notify the user</li>
            <li><code>3</code> (PendingUserApproval) — first launch requires confirmation on the TV</li>
          </ul>
        </li>
        <li>Confirm <code>CurrentApp (0x0001)</code> has been updated to Netflix</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Automation — sleep mode closes all apps</summary>
    <div class="scenario-content">
      <ol>
        <li>The user set up a "Sleep Mode" automation rule: automatically close all apps on the TV every night at 11 PM</li>
        <li>Read <code>CurrentApp (0x0001)</code> to get the current foreground app info</li>
        <li>If CurrentApp is not <code>null</code>, send <code>StopApp (0x01)</code> to stop that app</li>
        <li>Iterate through all app Endpoints on the device and check each <a href="../application-basic/">ApplicationBasic</a>'s <code>Status</code> attribute</li>
        <li>For all apps with Status not Stopped (0), send <code>StopApp (0x01)</code> one by one</li>
        <li>After all apps are stopped, optionally use <a href="../on-off/">OnOff Cluster</a> to turn off the TV or put it in standby mode</li>
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
  'account-login': {
    title: 'AccountLogin Cluster (0x050E)',
    description: 'Complete reference for the Matter AccountLogin Cluster (0x050E) — GetSetupPIN / Login / Logout commands, content provider authentication flow, Timed Invoke security, temporary PIN mechanism, and practical scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>AccountLogin Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050E</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (streaming device, content app on smart TV)
  </p>
  <p>
    AccountLogin handles content provider account authentication on <strong>smart TVs or streaming devices</strong>.
    When a user's phone app is already logged into a video service (e.g., Netflix, YouTube)
    and wants the corresponding content app on the TV to also gain access to that account, this Cluster handles the authentication.
    It does not handle playback control (that's <a href="../media-playback/">MediaPlayback</a>'s job),
    but rather solves the problem of "how does the TV know who you are".
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      Think of the content app on a TV as a theater that requires an access card. AccountLogin is the <strong>counter that issues temporary access cards</strong>.
      Your phone (Commissioner) takes your ID (account info) to the counter to get a temporary card (Setup PIN),
      then uses that card to enter (Login). After the movie, you return the temporary card (Logout).
      The key point is: <strong>the temporary card is single-use</strong>, and both getting and using the card must be completed within a time limit (Timed Invoke).
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#auth-flow">Authentication Flow</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#security">Security</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Authentication Flow ====== -->
  <h2 id="auth-flow">Authentication Flow</h2>
  <p>AccountLogin authentication is a <strong>three-step handshake</strong> process, driven by the phone app (Commissioner):</p>

  <ol>
    <li>
      <strong>Request PIN</strong>: The phone app sends <a href="#cmd-0x00"><code>GetSetupPIN</code></a> to the content app on the TV,
      carrying a <strong>temporary account identifier</strong> (TempAccountIdentifier).
      This identifier is generated by the content provider app on the phone, typically a temporary token associated with the user's account
    </li>
    <li>
      <strong>Receive PIN</strong>: After validating the temporary identifier, the TV-side content app
      returns a <strong>temporary Setup PIN</strong> (max 8 characters).
      This PIN is single-use, intended for the next login step
    </li>
    <li>
      <strong>Execute Login</strong>: The phone app sends the <a href="#cmd-0x02"><code>Login</code></a> command with the temporary identifier and Setup PIN together;
      after the TV-side verification succeeds, the node gains content access privileges
    </li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">All Commands Require Timed Invoke</div>
    <p>
      All three AccountLogin commands (GetSetupPIN, Login, Logout) require <strong>Timed Invoke</strong>.
      This means each command must first initiate a timed transaction (Timed Request) before sending,
      and the device only accepts commands within the transaction window. This is a critical security measure to prevent man-in-the-middle replay attacks.
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The AccountLogin Cluster has 3 commands and 1 response.
    GetSetupPIN has a dedicated response structure GetSetupPINResponse,
    while Login and Logout return results via a generic Status.
    Click a command ID in the table below to jump to its detailed description.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Direction</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>GetSetupPIN</td>
          <td>Client → Server</td>
          <td>Request temporary Setup PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>GetSetupPINResponse</td>
          <td>Server → Client</td>
          <td>Return temporary Setup PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Login</td>
          <td>Client → Server</td>
          <td>Log in with temporary identifier + PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Logout</td>
          <td>Client → Server</td>
          <td>Log out of current account</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">GetSetupPIN — Request Setup PIN (0x00)</h3>
  <p>
    Sent by the phone app (Client) to the content app on the TV (Server), requesting a temporary Setup PIN.
    Upon receiving the request, the content app queries user account information based on <code>TempAccountIdentifier</code>,
    and if valid, generates and returns a temporary PIN.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TempAccountIdentifier</td>
          <td>string</td>
          <td>Temporary account identifier generated by the content provider app on the phone. Max length <code>100</code> characters. Format defined by the content provider, typically a temporary token associated with the user account</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">What is TempAccountIdentifier</div>
    <p>
      This field is <strong>NOT</strong> the user's username or password.
      It is a temporary token generated by the phone app while the user is logged in,
      used to let the TV-side content app identify "which authenticated user this request comes from".
      The specific format and generation method are defined by the content provider (e.g., Netflix, Disney+).
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">GetSetupPINResponse — Return Setup PIN (0x01)</h3>
  <p>
    The TV-side content app's response to GetSetupPIN. If the temporary account identifier is valid, returns a temporary PIN usable for Login.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>SetupPIN</td>
          <td>string</td>
          <td>Temporary Setup PIN, max length <code>8</code> characters. Used for the subsequent Login command. The PIN is temporary, and the content app can determine its own validity period</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">PIN is Temporary</div>
    <p>
      The SetupPIN should be <strong>single-use or short-lived</strong>. The content app should not return a fixed, unchanging PIN,
      as this risks replay attacks. It is recommended to invalidate the PIN immediately after a successful Login,
      or set a short expiration time (e.g., 2 minutes).
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Login — Log In (0x02)</h3>
  <p>
    Completes login using the previously obtained temporary account identifier and Setup PIN.
    After successful login, the requesting node gains access to the content app and can browse and play the user's subscribed content.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>TempAccountIdentifier</td>
          <td>string</td>
          <td>Same temporary account identifier as used in GetSetupPIN</td>
        </tr>
        <tr>
          <td>SetupPIN</td>
          <td>string</td>
          <td>Temporary PIN returned by GetSetupPINResponse</td>
        </tr>
        <tr>
          <td>Node</td>
          <td>node-id (optional)</td>
          <td>Specifies the node ID to authorize. If omitted, authorizes the node sending this command. Used when the phone requests login on behalf of another device</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Common Causes of Login Failure</summary>
    <div class="scenario-content">
      <ul>
        <li><strong>PIN expired</strong> — too long between GetSetupPIN and Login, PIN has expired</li>
        <li><strong>PIN mismatch</strong> — TempAccountIdentifier does not correspond to the SetupPIN</li>
        <li><strong>Timed Invoke not used</strong> — command was not sent via a timed transaction, device rejects directly</li>
        <li><strong>Account identifier invalid</strong> — TempAccountIdentifier has expired or does not exist on the content provider side</li>
      </ul>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">Logout — Log Out (0x03)</h3>
  <p>
    Revokes access privileges previously obtained through Login. After logout, the corresponding node can no longer access the content app's user content.
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Node</td>
          <td>node-id (optional)</td>
          <td>Specifies the node ID to log out. If omitted, logs out the node sending this command</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        Called when the user signs out of the content provider account on the phone, switches accounts, or manually manages device access.
        Can also be triggered by automation rules — for example, automatically logging out the TV's content app when the phone leaves the home network.
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Description ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The AccountLogin Cluster has <strong>no application-level custom attributes</strong>.
    It only contains global attributes required by the Matter specification (Global Attributes), which describe the Cluster's meta-information.
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
        <tr>
          <td><code>0xFFF8</code></td>
          <td>GeneratedCommandList</td>
          <td>list&lt;command-id&gt;</td>
          <td>List of response commands the Server can generate. Typically <code>[0x01]</code> (GetSetupPINResponse)</td>
        </tr>
        <tr>
          <td><code>0xFFF9</code></td>
          <td>AcceptedCommandList</td>
          <td>list&lt;command-id&gt;</td>
          <td>List of commands the Server can accept. Typically <code>[0x00, 0x02, 0x03]</code> (GetSetupPIN / Login / Logout)</td>
        </tr>
        <tr>
          <td><code>0xFFFA</code></td>
          <td>EventList</td>
          <td>list&lt;event-id&gt;</td>
          <td>This Cluster defines no events, always an empty list</td>
        </tr>
        <tr>
          <td><code>0xFFFB</code></td>
          <td>AttributeList</td>
          <td>list&lt;attrib-id&gt;</td>
          <td>List of attribute IDs in this Cluster</td>
        </tr>
        <tr>
          <td><code>0xFFFC</code></td>
          <td>FeatureMap</td>
          <td>map32</td>
          <td>No optional features currently, value is <code>0</code></td>
        </tr>
        <tr>
          <td><code>0xFFFD</code></td>
          <td>ClusterRevision</td>
          <td>uint16</td>
          <td>Cluster specification revision</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">Why No Application Attributes</div>
    <p>
      AccountLogin is a purely <strong>command-driven</strong> Cluster.
      Its core functionality (authentication) is completed through command interactions, with no need for persistent state stored in attributes.
      Login status is managed by the content app itself, not exposed via Cluster attributes.
      This contrasts with "stateful" Clusters like AdministratorCommissioning.
    </p>
  </div>

  <!-- ====== Security Mechanisms ====== -->
  <h2 id="security">Security Mechanisms</h2>
  <p>
    AccountLogin involves user account authentication, with higher security requirements than ordinary control Clusters.
    The Matter specification imposes the following constraints:
  </p>

  <h3>Timed Invoke</h3>
  <p>
    All three commands <strong>must</strong> be sent using Timed Invoke.
    How Timed Invoke works:
  </p>
  <ol>
    <li>Client first sends a <code>TimedRequest</code>, declaring the timeout for the subsequent command</li>
    <li>Server replies with acknowledgment and starts the timer</li>
    <li>Client sends the actual command (e.g., Login) within the timeout window</li>
    <li>After the timeout window closes, Server no longer accepts the command</li>
  </ol>
  <p>
    The core purpose of this mechanism is to <strong>prevent replay attacks</strong>: even if an attacker intercepts the complete Login command packet,
    it cannot be resent after the timeout window closes.
  </p>

  <h3>Temporary PIN Mechanism</h3>
  <p>
    Setup PIN is the second line of defense in the authentication flow:
  </p>
  <ul>
    <li>PIN is <strong>dynamically generated</strong> by the TV-side content app, not a fixed password</li>
    <li>PIN is bound to a specific TempAccountIdentifier and cannot be used across accounts</li>
    <li>PIN should have a validity period (spec recommends as short as possible); even knowing the PIN, login fails after expiration</li>
    <li>PIN should be invalidated immediately after use to prevent reuse</li>
  </ul>

  <h3>Access Privilege Requirements</h3>
  <p>
    AccountLogin commands require <strong>Administer</strong> level access privilege.
    This means only nodes with administrator privileges in the device ACL can invoke these commands;
    normal Operate level privileges are insufficient.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Cluster Attribute Read</h3>
  <p>Read all attributes of the AccountLogin Cluster (global attributes only):</p>
  <pre><code>{
  // --- Global Attributes ---
  "0xFFF8": [0, 1],            // GeneratedCommandList = [GetSetupPINResponse]
  "0xFFF9": [0, 2, 3],         // AcceptedCommandList = [GetSetupPIN, Login, Logout]
  "0xFFFA": [],                 // EventList = [] (no events)
  "0xFFFB": [                   // AttributeList
    0xFFF8, 0xFFF9, 0xFFFA,
    0xFFFB, 0xFFFC, 0xFFFD
  ],
  "0xFFFC": 0,                  // FeatureMap = 0 (no optional features)
  "0xFFFD": 2                   // ClusterRevision = 2
}</code></pre>

  <h3>GetSetupPIN Interaction Example</h3>
  <p>Phone app requests Setup PIN from the TV content app:</p>
  <pre><code>// Phone App → TV Content App: Request Setup PIN
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x00"              // GetSetupPIN
    },
    "commandFields": {
      "TempAccountIdentifier": "user_abc_token_20260901"
                                       // Temporary account identifier generated by the phone
    },
    "timedRequest": true,              // Must use Timed Invoke
    "interactionTimeoutMs": 10000
  }]
}

// TV Content App → Phone App: Return Setup PIN
{
  "invokeResponseMessage": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x01"              // GetSetupPINResponse
    },
    "commandFields": {
      "SetupPIN": "34567890"           // Temporary PIN for subsequent Login
    }
  }]
}</code></pre>

  <h3>Login Interaction Example</h3>
  <p>Complete login using the obtained PIN:</p>
  <pre><code>// Phone App → TV Content App: Login with PIN
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x02"              // Login
    },
    "commandFields": {
      "TempAccountIdentifier": "user_abc_token_20260901",
      "SetupPIN": "34567890",          // PIN returned by GetSetupPINResponse
      "Node": "0x0000000012345678"     // Optional: specify the node ID to authorize
    },
    "timedRequest": true,
    "interactionTimeoutMs": 10000
  }]
}

// TV Content App → Phone App: Status = SUCCESS</code></pre>

  <h3>Logout Interaction Example</h3>
  <p>Log out of the current account:</p>
  <pre><code>// Phone App → TV Content App: Logout
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x03"              // Logout
    },
    "commandFields": {
      "Node": "0x0000000012345678"     // Optional: specify the node ID to log out
    },
    "timedRequest": true,
    "interactionTimeoutMs": 10000
  }]
}

// TV Content App → Phone App: Status = SUCCESS</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The <code>timedRequest: true</code> and <code>interactionTimeoutMs</code> in all command examples are NOT optional.
      If the SDK does not automatically handle Timed Invoke, the timed transaction must be constructed manually.
      Most Matter SDKs (such as CHIP Tool, connectedhomeip) handle this automatically when invoking commands marked as Timed Invoke,
      but custom implementations need to be aware of this.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Auto-login to TV content app when casting from phone</summary>
    <div class="scenario-content">
      <p><strong>Background</strong>: The user has Netflix open and logged in on the phone, and now wants to watch on the TV. The TV already has the Netflix content app installed.</p>
      <ol>
        <li>The user selects "Cast to TV" in the phone's Netflix app</li>
        <li>The phone discovers the Endpoint of Netflix's content app on the TV (e.g., Endpoint 3)</li>
        <li>The phone's Netflix app generates a temporary account identifier (linked to the user's Netflix account)</li>
        <li>The phone sends <a href="#cmd-0x00"><code>GetSetupPIN (0x00)</code></a> to the TV's Endpoint 3,
            carrying the temporary account identifier</li>
        <li>The TV-side Netflix app validates the identifier, generates a temporary PIN, and returns it</li>
        <li>The phone automatically sends <a href="#cmd-0x02"><code>Login (0x02)</code></a> with the identifier and PIN</li>
        <li>Login successful — Netflix on the TV can now access the user's watch history, favorites, and subscribed content</li>
        <li>The user selects content on the TV for playback, controlled via <a href="../media-playback/">MediaPlayback</a></li>
      </ol>
      <p>
        The entire process is seamless for the user: after tapping "Cast", the TV automatically switches to a logged-in state.
        <strong>PIN exchange happens in the background</strong>, and the user does not need to manually enter any information on the TV.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Multi-user switching and logout management</summary>
    <div class="scenario-content">
      <p><strong>Background</strong>: Multiple people in a household share one TV, each with their own content subscription account.</p>
      <ol>
        <li>User A's phone has logged the TV into A's account via Login</li>
        <li>User B wants to switch to their own account:
          <ul>
            <li>B's phone first sends <a href="#cmd-0x03"><code>Logout (0x03)</code></a> to log out A's session
                (if B's node has permission), or A sends Logout from their own phone</li>
            <li>B's phone then executes the full GetSetupPIN → Login flow to log in B's account</li>
          </ul>
        </li>
        <li>Recommended logout timing:
          <ul>
            <li>When the user actively switches accounts</li>
            <li>When the phone app signs out, simultaneously log out all authorized TVs</li>
            <li>Provide a "Sign out of all devices" option in the device management page</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>Note the Node parameter</strong>: The <code>Node</code> parameter in Login and Logout allows one node to operate on behalf of another.
        For example, a family administrator can log out other family members' sessions on the TV from their own phone.
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
  'wake-on-lan': {
    title: 'WakeOnLan Cluster (0x0503)',
    description: 'Complete reference for the Matter WakeOnLan Cluster (0x0503) — MACAddress / LinkLocalAddress attribute definitions, Magic Packet wake mechanism, and coordination with LowPower Cluster.',
    prev: undefined,
    next: undefined,
    content: `<h1>WakeOnLan Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0503</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, game console, etc.)&nbsp;|&nbsp;
    <strong>Role</strong>: Server (Read-only, no commands)
  </p>
  <p>
    WakeOnLan is a very simple yet practical Cluster in Matter media devices —
    it <strong>contains no commands</strong>, only exposes the device's MAC address and IPv6 link-local address,
    allowing external systems to remotely wake devices in standby or sleep mode by sending WoL Magic Packets.
  </p>
  <p>
    This Cluster is typically used in conjunction with <strong>LowPower Cluster (0x0508)</strong>:
    LowPower handles putting the device into low-power standby (Sleep command),
    while WakeOnLan provides the network address information needed for waking. One manages "sleep", the other manages "wake".
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Why Not Wake Directly with Matter Commands?</div>
    <p>
      After the device enters deep sleep, Matter's IP communication stack may have shut down and cannot receive normal Matter messages.
      However, the NIC hardware still listens for Ethernet frames matching a specific pattern (Magic Packet), and upon receipt, triggers a hardware interrupt to wake the entire system.
      This is why a dedicated Cluster is needed to expose the MAC address — the wake operation occurs below the Matter protocol layer.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#wol-mechanism">Wake Mechanism</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    The WakeOnLan Cluster has only <strong>2 attributes</strong>, all read-only, with no commands or events.
    Both attributes are optional, but at least one must be supported; otherwise this Cluster serves no practical purpose.
  </p>

  <!-- Attribute summary table -->
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Required</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>MACAddress</td>
          <td>string</td>
          <td class="col-optional">Optional</td>
          <td>Device's 48-bit MAC address</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>LinkLocalAddress</td>
          <td>octstr (bytes)</td>
          <td class="col-optional">Optional</td>
          <td>Device's IPv6 link-local address</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== MACAddress ====== -->
  <h3 id="attr-0x0000">MACAddress — MAC Address (0x0000)</h3>
  <p>
    The Ethernet MAC address used by the device to receive WoL Magic Packets.
    Format is a standard 48-bit MAC, represented as a colon-separated hexadecimal string, e.g., <code>AA:BB:CC:DD:EE:FF</code>.
  </p>
  <p>
    This address is typically the device's wired NIC address. For WiFi-only devices, it can be the wireless NIC's MAC,
    but WoL reliability over WiFi is much lower than wired connections (requires router support for WiFi WoL forwarding).
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">MAC Address Format</div>
    <p>
      The Matter specification requires MACAddress to be stored as a <strong>uppercase hex + colon-separated</strong> string format,
      e.g., <code>"AA:BB:CC:DD:EE:FF"</code>. In practice, case-insensitive handling is recommended.
      Max length is 32 bytes (including separators, covering both 48-bit and 64-bit EUI formats).
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LinkLocalAddress ====== -->
  <h3 id="attr-0x0001">LinkLocalAddress — Link-Local Address (0x0001)</h3>
  <p>
    The device's IPv6 link-local address, stored as a byte array, fixed at 16 bytes.
    Link-local addresses start with <code>fe80::</code> and are valid only within the same network link (same subnet/VLAN).
  </p>
  <p>
    The purpose of this address is to let the waking party know which link the device is on, so the Magic Packet can be sent to the correct network segment.
    For cross-subnet wake scenarios, directed broadcast or subnet forwarding is also needed.
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">When to Use LinkLocalAddress?</div>
    <p>
      When the network has multiple subnets or VLANs, MAC address alone is not enough — different broadcast domains mean the Magic Packet cannot reach the target device.
      LinkLocalAddress helps the waking party determine which link the target device is on, selecting the correct network interface to send the wake packet.
      In a simple single-subnet environment (common for home networks), MACAddress alone is usually sufficient.
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== WoL Wake Mechanism ====== -->
  <h2 id="wol-mechanism">WoL Wake Mechanism</h2>
  <p>
    Wake-on-LAN (WoL) is a decades-old network standard that allows remotely waking devices in standby, sleep, or powered-off states
    by sending a special Ethernet frame (Magic Packet). Matter's WakeOnLan Cluster does not send this packet;
    it simply tells you "which address to send to".
  </p>

  <h3>Magic Packet Structure</h3>
  <p>
    The Magic Packet format is very simple: a <strong>6-byte <code>0xFF</code> sync header</strong>,
    followed by the <strong>target MAC address repeated 16 times</strong>, totaling 102 bytes.
    It can be encapsulated in a UDP packet (commonly port 7 or 9) or sent directly as an Ethernet frame.
  </p>
  <pre><code>// WoL Magic Packet structure (102 bytes total)
FF FF FF FF FF FF          // Sync header: 6 bytes of 0xFF
AA BB CC DD EE FF          // Target MAC address, repeated 16 times
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF
AA BB CC DD EE FF</code></pre>

  <h3>Wake-up Process</h3>
  <ol>
    <li>Read <code>MACAddress</code> from the device's WakeOnLan Cluster (cache in advance while device is online)</li>
    <li>Device enters standby/sleep (may be triggered by LowPower Cluster's Sleep command)</li>
    <li>When wake-up is needed, construct a Magic Packet containing the target MAC</li>
    <li>Send via UDP broadcast (or directed broadcast) to the target network segment</li>
    <li>Device NIC hardware detects the matching Magic Packet, triggers interrupt to wake the system</li>
    <li>After device boots, it rejoins the Matter Fabric and resumes normal communication</li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">Prerequisites</div>
    <p>
      Whether WoL works depends on hardware and firmware support: the device NIC must remain powered and listening for network frames during sleep,
      and WoL must be enabled in the BIOS/firmware. Not all devices support this — especially WiFi-only devices,
      where WoL support and reliability over wireless are much lower than wired Ethernet.
    </p>
  </div>

  <!-- ====== Relationship with LowPower Cluster ====== -->
  <h3 id="lowpower-relation">Relationship with LowPower Cluster</h3>
  <p>
    In Matter media devices, WakeOnLan and LowPower (0x0508) are a complementary pair of Clusters:
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>Responsibility</th>
          <th>Direction</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>LowPower</strong>（0x0508）</td>
          <td>Put the device into standby/sleep (Sleep command)</td>
          <td>Controller → Device: "Go to sleep"</td>
        </tr>
        <tr>
          <td><strong>WakeOnLan</strong>（0x0503）</td>
          <td>Provide network address needed to wake the device</td>
          <td>Controller reads address and sends Magic Packet itself: "Wake up"</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    Typical media devices (such as TVs, set-top boxes) implement both Clusters simultaneously.
    When the user says "Turn off the TV", LowPower's Sleep is invoked; when they say "Turn on the TV", a Magic Packet is sent using WakeOnLan's address.
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read a smart TV's WakeOnLan Cluster attributes:</p>
  <pre><code>{
  // --- Wake-on-LAN Addresses ---
  "0x0000": "AA:BB:CC:DD:EE:FF",   // MACAddress = device's wired NIC MAC address
  "0x0001": "fe80::a8bb:ccff:fedd:eeff"  // LinkLocalAddress = IPv6 link-local address
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      WakeOnLan attribute values typically do not change throughout the device's lifecycle (MAC address and Link-Local address are both fixed).
      It is recommended to read them once when the device first joins the network and cache locally, with no need for frequent polling.
      This way, even if the device is already asleep and cannot respond to Matter requests, you still have the address to send a Magic Packet.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Voice assistant wakes the TV</summary>
    <div class="scenario-content">
      <p>
        The user tells the smart speaker "Turn on the living room TV". The TV is currently in standby mode, with Matter communication disconnected.
      </p>
      <ol>
        <li>The smart speaker (Hub) looks up the living room TV's WakeOnLan info from local cache (cached when it joined the network)</li>
        <li>Retrieve <code>MACAddress = "AA:BB:CC:DD:EE:FF"</code></li>
        <li>Construct Magic Packet (6 bytes 0xFF + MAC repeated 16 times = 102 bytes)</li>
        <li>Broadcast to the local network via UDP port 9</li>
        <li>TV NIC detects the Magic Packet and wakes the system</li>
        <li>After the TV boots, it rejoins the Matter Fabric, and the Hub detects the device coming online</li>
        <li>The Hub can optionally send OnOff Cluster's On command to ensure the TV is fully powered on</li>
      </ol>
      <p>
        <strong>Key point</strong>: Wake address must be cached in advance. Attributes cannot be read via Matter after the device sleeps;
        without a cache, you can only wait for the user to manually power on.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Automation integration (Home Mode)</summary>
    <div class="scenario-content">
      <p>
        The user has set up a "Home Mode" automation: when the phone connects to the home WiFi, automatically wake the TV and switch to the frequently watched input source.
      </p>
      <ol>
        <li>Hub detects the user's phone connecting to home WiFi (trigger condition)</li>
        <li>Automation engine starts the "Home Mode" action sequence</li>
        <li>Step 1: Send Magic Packet with cached MAC address to wake the TV</li>
        <li>Step 2: Wait for the TV to come back online (poll device status or listen for mDNS broadcasts)</li>
        <li>Step 3: Switch to HDMI 1 (set-top box) via MediaInput Cluster (0x0507)</li>
        <li>Simultaneously: Adjust living room light brightness to 60% via LevelControl</li>
      </ol>
      <p>
        <strong>Note</strong>: It takes time from wake-up to full device online status (typically a few seconds to tens of seconds).
        The automation engine needs to wait for the device to be ready after sending the Magic Packet before executing subsequent Matter commands.
        Sending commands immediately in succession will fail because the device's Matter stack has not yet started.
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
  .col-optional {
    color: #16a34a;
    font-size: 0.8125rem;
  }

  :global(.dark) .col-optional {
    color: #4ade80;
  }
</style>`,
  },
  'low-power': {
    title: 'LowPower Cluster (0x0508)',
    description: 'Complete reference for the Matter LowPower Cluster (0x0508) — Sleep standby command, differences from WakeOnLan / OnOff, and media device power management scenarios.',
    prev: undefined,
    next: undefined,
    content: `<h1>LowPower Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0508</code> &nbsp;|&nbsp;
    <strong>Endpoint</strong>: Media endpoint (TV, set-top box, streaming stick, etc.)
  </p>
  <p>
    LowPower is <strong>one of the simplest Clusters in Matter</strong> —
    no attributes, no events, no features, with only a single command: <strong>Sleep</strong>.
    Its responsibility is singular: put the media device into low-power standby (Standby / Sleep) mode.
  </p>
  <p>
    This Cluster is typically used in conjunction with <a href="../wake-on-lan/"><strong>WakeOnLan Cluster (0x0503)</strong></a>:
    LowPower handles "putting the device to sleep", while WakeOnLan provides the network address needed to "wake it up".
    Together they form a pair for media device power management.
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Sleep vs Off — Why Not Just Use OnOff?</div>
    <p>
      The OnOff Cluster's <code>Off</code> command semantically means "turn off the function" — for a light it means turn off, for a socket it means cut power.
      But for a TV, "off" usually doesn't mean power cut, but rather entering <strong>standby mode</strong> —
      the screen and main processor sleep, but the NIC remains listening for remote wake-up.
    </p>
    <p>
      LowPower's <code>Sleep</code> command explicitly expresses this "enter low-power standby" semantic,
      distinguishing it from OnOff's Off (completely turning off the function).
      In practice, many TVs implement both Clusters: OnOff for on/power-off state management, LowPower specifically for entering standby.
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#no-attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#relationships">Related Clusters</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    The LowPower Cluster has only <strong>1 command</strong>, no parameters, and no dedicated return data.
    This is one of the most minimal command definitions in the Matter specification.
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Parameter</th>
          <th>Response</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Sleep</td>
          <td>None</td>
          <td>Status</td>
          <td>Put the device into low-power standby mode</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Sleep — Enter Standby (0x00)</h3>
  <p>
    Puts the media device into low-power standby (Sleep / Standby) mode.
    The command has no parameters; upon successful execution, the device returns a generic <code>Status = SUCCESS</code> response.
  </p>
  <p>
    The specific behavior after receiving the Sleep command is determined by the vendor's implementation, but typically includes:
  </p>
  <ul>
    <li>Turning off screen and audio output</li>
    <li>Pausing or stopping currently playing media content</li>
    <li>Main processor entering low-power state</li>
    <li>NIC remains active, continuing to listen for WoL Magic Packets (if WakeOnLan is supported)</li>
  </ul>

  <p>Call example:</p>
  <pre><code>// Sleep command request (Command ID: 0x00)
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0508",
      "commandId": "0x00"       // Sleep
    }
    // No parameter fields — Sleep is a zero-parameter command
  }]
}

// Response: Status = SUCCESS (no return data)</code></pre>

  <div class="callout callout-warning">
    <div class="callout-title">Matter Communication May Be Unavailable After Sleep</div>
    <p>
      After entering deep standby, the Matter communication stack may shut down.
      This means after Sleep, you <strong>can no longer wake the device via Matter commands</strong> —
      waking requires low-level WoL Magic Packets or physical user action (remote control, physical button).
      Therefore, make sure the device's WakeOnLan address information is cached before sending Sleep.
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attribute Description ====== -->
  <h2 id="no-attributes">Attributes</h2>
  <p>
    The LowPower Cluster <strong>does not define any application-level attributes</strong>.
    This means you cannot determine whether the device is currently in standby by reading attributes —
    once the device enters standby, communication may be disconnected, making attribute reads impossible.
  </p>
  <p>
    To determine the device's online/standby status, common approaches include:
  </p>
  <ul>
    <li>Monitor whether the device's Matter session is still active</li>
    <li>Observe whether the device is still discoverable via mDNS broadcasts</li>
    <li>Try reading other Cluster attributes (e.g., BasicInformation); a timeout indicates the device is in standby</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-title">Only Global Attributes</div>
    <p>
      Although there are no application-level attributes, the LowPower Cluster still has global attributes required by the Matter specification
      (<code>ClusterRevision</code>, <code>FeatureMap</code>, <code>AttributeList</code>, etc.).
      These attributes are used for protocol-level version negotiation and capability discovery, not business functionality.
    </p>
  </div>

  <!-- ====== Related Clusters ====== -->
  <h2 id="relationships">Related Clusters</h2>
  <p>
    LowPower does not exist in isolation; it works closely with two other Clusters for media device power management:
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>ID</th>
          <th>Responsibility</th>
          <th>Relationship to LowPower</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="../wake-on-lan/"><strong>WakeOnLan</strong></a></td>
          <td><code>0x0503</code></td>
          <td>Provides device MAC address for WoL wake-up</td>
          <td>Complementary: LowPower puts the device to sleep, WakeOnLan helps wake it up</td>
        </tr>
        <tr>
          <td><a href="../on-off/"><strong>OnOff</strong></a></td>
          <td><code>0x0006</code></td>
          <td>Device's on/off/toggle control</td>
          <td>Semantic distinction: Off = turn off the function, Sleep = enter standby (device can still be remotely woken)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>Typical Power Cluster Combination for Media Devices</h3>
  <p>
    A smart TV typically implements the following three Clusters simultaneously, each covering a different layer of power management:
  </p>
  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">Sleep</span>
      <div>
        <span class="enum-name">LowPower（0x0508）</span>
        <span class="enum-desc">Controller sends Sleep command, device enters standby</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Wake</span>
      <div>
        <span class="enum-name">WakeOnLan（0x0503）</span>
        <span class="enum-desc">Controller reads MAC address, sends Magic Packet to wake device</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">On/Off</span>
      <div>
        <span class="enum-name">OnOff（0x0006）</span>
        <span class="enum-desc">Manages the device's power on/off state (semantically different from standby)</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>Read a TV's LowPower Cluster attributes (almost no business data):</p>
  <pre><code>{
  // LowPower Cluster (0x0508) has no application-level attributes
  // It is a pure command-type Cluster, providing only the Sleep command
  // Reading this Cluster only returns global attributes (ClusterRevision, FeatureMap, etc.)

  "0xFFFD": 1,              // ClusterRevision = 1
  "0xFFFC": 0               // FeatureMap = 0 (no features)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      The existence of the LowPower Cluster itself is a capability declaration — if a device has this Cluster on an Endpoint,
      it means the device supports entering standby mode via Matter.
      You can check whether the device implements LowPower (<code>0x0508</code>) through the <a href="../descriptor/">Descriptor Cluster</a>'s ServerList attribute,
      to decide whether to display a "Standby" button in the UI.
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>Scenario 1: Voice assistant turns off TV (Sleep + WoL cache)</summary>
    <div class="scenario-content">
      <p>
        The user tells the smart speaker "Turn off the living room TV", requesting the TV to enter standby mode while retaining remote wake-up capability.
      </p>
      <ol>
        <li>Hub confirms the target device's Endpoint has the LowPower Cluster (checks Descriptor's ServerList)</li>
        <li>Hub checks if the device's WakeOnLan address (MAC / Link-Local) is already in local cache</li>
        <li>If not cached, first read WakeOnLan Cluster's <code>MACAddress</code> and store locally</li>
        <li>Send LowPower's <code>Sleep (0x00)</code> command to the device</li>
        <li>Device turns off screen and audio, enters low-power standby mode</li>
        <li>Matter communication may disconnect — Hub records device status as "standby"</li>
        <li>When the user later says "Turn on the TV", Hub sends a WoL Magic Packet using the cached MAC address to wake it</li>
      </ol>
      <p>
        <strong>Key point</strong>: WakeOnLan address must be cached before sending the Sleep command.
        Once the device enters deep standby and Matter communication disconnects, the MAC address can no longer be read via Matter.
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>Scenario 2: Scheduled standby (energy-saving automation)</summary>
    <div class="scenario-content">
      <p>
        The user set up an energy-saving automation rule: every night at 23:00, if the TV is still running, automatically enter standby to save power.
      </p>
      <ol>
        <li>Automation engine triggers at 23:00</li>
        <li>Read the TV's <code>OnOff (0x0000)</code> attribute via OnOff Cluster to confirm if currently on</li>
        <li>If <code>OnOff = true</code> (TV is still running), send LowPower's <code>Sleep</code> command</li>
        <li>TV enters standby mode, screen turns off, but NIC remains active</li>
        <li>The next morning, the user can wake the TV via remote control, voice assistant, or WoL</li>
      </ol>
      <p>
        <strong>Why Sleep instead of Off?</strong>
        Sleep keeps the device in a remotely wakeable state. OnOff's Off may cause the device to completely power off,
        requiring the user to physically press the power button to turn it on, which is not user-friendly for smart home scenarios.
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
};
