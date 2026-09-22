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
    description: 'Matter MediaInput Cluster(0x0507)完整参考 — SelectInput/ShowInputStatus/HideInputStatus/RenameInput 命令、InputList 输入源列表、InputInfoStruct 结构体、InputTypeEnum 枚举值及 NameUpdates 特性说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>MediaInput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0507</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、AV 接收器等）
  </p>
  <p>
    MediaInput 负责管理设备的外部输入源 —— HDMI、USB、分量、光纤等各种音视频输入接口。
    用户可以通过它查询设备有哪些输入源、当前选中哪个、切换到指定输入源，以及为输入源自定义名称。
    它是智能电视和 AV 接收器等媒体设备的核心 Cluster 之一。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">NameUpdates(NU)特性</div>
    <p>
      MediaInput Cluster 定义了一个 <strong>NameUpdates（NU）</strong> Feature。
      启用后，控制端可以通过 <code>RenameInput</code> 命令为输入源自定义名称
      （例如把"HDMI 2"改成"PS5"）。未启用时，输入源名称由设备固定，不可修改。
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
    MediaInput Cluster 共有 4 个命令。SelectInput 用于切换输入源，ShowInputStatus / HideInputStatus 控制输入源信息的 OSD 显示，
    RenameInput 允许用户为输入源自定义名称（需要 NU 特性）。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>切换到指定输入源</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>ShowInputStatus</td>
          <td>在屏幕上显示输入源信息</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>HideInputStatus</td>
          <td>隐藏输入源信息的屏幕显示</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>RenameInput</td>
          <td>重命名指定输入源</td>
          <td class="col-required">NU</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SelectInput —— 切换输入源(0x00)</h3>
  <p>
    将设备切换到指定的输入源。<code>Index</code> 必须是 <code>InputList</code> 中某个
    <code>InputInfoStruct</code> 的 <code>Index</code> 值，否则设备会返回错误。
    执行成功后，<code>CurrentInput</code> 属性会更新为指定的 Index 值。
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
          <td>目标输入源的索引值，必须存在于 <code>InputList</code> 中</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在手机 App 上选择"HDMI 1"，App 读取 <code>InputList</code> 获取该输入源的 Index 值，
        然后发送 <code>SelectInput</code> 命令。电视切换到对应的 HDMI 输入，<code>CurrentInput</code> 随之更新。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">ShowInputStatus —— 显示输入源信息(0x01)</h3>
  <p>
    请求设备在屏幕上显示当前输入源的信息（OSD 叠加层），类似按遥控器上的"信息"按钮。
    不需要参数。显示的内容和持续时间由设备自行决定。
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>用户想确认当前电视在哪个输入源上，通过 App 发送此命令，电视屏幕上会弹出输入源信息（如"HDMI 1 - 客厅机顶盒"）。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">HideInputStatus —— 隐藏输入源信息(0x02)</h3>
  <p>
    请求设备隐藏屏幕上的输入源信息显示。不需要参数。
    如果当前没有显示输入源信息，此命令不产生任何效果。
  </p>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>在 ShowInputStatus 弹出信息后，用户觉得碍眼，通过 App 发送此命令关闭 OSD 叠加层。</p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">RenameInput —— 重命名输入源(0x03)</h3>
  <p>
    为指定的输入源设置一个自定义名称。修改后，<code>InputList</code> 中对应条目的 <code>Name</code> 字段会更新。
    此命令需要设备启用 <strong>NU（NameUpdates）</strong> 特性。
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
          <td>要重命名的输入源索引，必须存在于 <code>InputList</code> 中</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>新的输入源名称</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// RenameInput 命令示例
// 将 Index=2 的输入源重命名为 "PS5"
{
  "Index": 2,
  "Name": "PS5"
}
// 执行后 InputList 中 Index=2 的 Name 变为 "PS5"</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户把游戏主机接到了 HDMI 2，但设备默认显示"HDMI 2"不够直观。
        通过 App 发送 <code>RenameInput</code>，将 Index=2 的输入源重命名为"PS5"。
        之后 InputList 中该条目的 Name 会变为"PS5"，UI 上也会显示新名称。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>MediaInput Cluster 共有 2 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备所有输入源的列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentInput</td>
          <td>uint8</td>
          <td>当前选中的输入源索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-input">输入源状态(0x0000, 0x0001)</h3>
  <p>描述设备当前可用的输入源列表和当前选中的输入源。</p>

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
          <td>InputList（输入源列表）</td>
          <td>list&lt;<a href="#struct-input-info">InputInfoStruct</a>&gt;</td>
          <td>设备声明的全部可用输入源，每个元素是一个 <a href="#struct-input-info">InputInfoStruct</a>。列表内容反映设备实际的物理和虚拟输入接口，每个 Index 值唯一。当用户通过 <code>RenameInput</code> 修改名称后，对应条目的 Name 会更新</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentInput（当前输入源）</td>
          <td>uint8</td>
          <td>当前选中的输入源索引。该值始终指向 <code>InputList</code> 中某个 <code>InputInfoStruct.Index</code>。通过 <code>SelectInput</code> 命令改变，也可能由用户通过遥控器切换</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      控制端应订阅 <code>CurrentInput</code> 属性的变化，以便在用户通过遥控器或设备面板切换输入源时同步 App 界面。
      同样，如果设备支持 NU 特性，也应订阅 <code>InputList</code> 的变化以获取最新的输入源名称。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>MediaInput Cluster 使用一个结构体来描述输入源信息。</p>

  <!-- InputInfoStruct -->
  <h3 id="struct-input-info">InputInfoStruct</h3>
  <p>描述一个输入源的完整信息，包括索引、类型、名称和描述。</p>

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
          <td>输入源的唯一索引，用于 <code>SelectInput</code> 和 <code>RenameInput</code> 命令的定位</td>
        </tr>
        <tr>
          <td>InputType</td>
          <td><a href="#enum-input-type">InputTypeEnum</a></td>
          <td>输入源的接口类型（见下方枚举）</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>输入源的显示名称，如 <code>"HDMI 1"</code>、<code>"PS5"</code>。启用 NU 特性后可通过 <code>RenameInput</code> 修改</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>string</td>
          <td>输入源的补充描述，如 <code>"客厅机顶盒"</code>。由设备提供，供 UI 展示</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- InputTypeEnum -->
  <h3 id="enum-input-type">InputTypeEnum</h3>
  <p>
    定义输入源的物理接口类型。共 12 个枚举值，涵盖常见的音视频输入接口。
    控制端可据此在 UI 上展示对应的图标或分类。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Internal</span>
        <span class="enum-desc">内置源 —— 内置调谐器或流媒体应用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Aux</span>
        <span class="enum-desc">辅助输入 —— AUX 接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Coax</span>
        <span class="enum-desc">同轴 —— 同轴电缆输入</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Composite</span>
        <span class="enum-desc">复合 —— 复合视频（RCA 黄色接口）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">HDMI</span>
        <span class="enum-desc">HDMI —— 最常用的高清数字接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Input</span>
        <span class="enum-desc">通用输入 —— 未分类的通用输入接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Line</span>
        <span class="enum-desc">线路输入 —— Line In 音频输入</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">Optical</span>
        <span class="enum-desc">光纤 —— 光纤数字音频（TOSLINK/SPDIF）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Video</span>
        <span class="enum-desc">视频 —— 通用视频输入</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">SCART</span>
        <span class="enum-desc">SCART —— 欧洲标准音视频接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">USB</span>
        <span class="enum-desc">USB —— USB 媒体播放接口</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">其他 —— 以上类型未涵盖的接口</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>MediaInput Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的可选能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NU（NameUpdates）</span>
        <span class="enum-desc">名称更新 —— 启用后支持 RenameInput 命令，允许用户为输入源自定义名称</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">When to Enable NU</div>
    <p>
      大多数智能电视和 AV 接收器都应启用此特性 —— 用户通常希望把"HDMI 1"改成更有意义的名称（如"机顶盒""PS5"）。
      如果设备的输入源名称是出厂固定的且不支持修改，则不启用 NU。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台智能电视的 MediaInput Cluster 读取结果 —— 当前选中 HDMI 1，共有 4 个输入源：</p>

  <pre><code>{
  // --- 当前输入源 ---
  "0x0001": 1,                   // CurrentInput = 1（当前选中 HDMI 1）

  // --- 输入源列表 ---
  "0x0000": [                    // InputList
    {
      "Index": 0,
      "InputType": 0,            // Internal（内置调谐器）
      "Name": "TV Tuner",
      "Description": "内置数字电视调谐器"
    },
    {
      "Index": 1,
      "InputType": 4,            // HDMI
      "Name": "HDMI 1",
      "Description": "客厅机顶盒"
    },
    {
      "Index": 2,
      "InputType": 4,            // HDMI
      "Name": "HDMI 2",
      "Description": "游戏主机"
    },
    {
      "Index": 3,
      "InputType": 10,           // USB
      "Name": "USB",
      "Description": "USB 媒体播放"
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      控制端显示输入源切换 UI 时，应先读取 <code>InputList (0x0000)</code> 获取完整列表，
      再读取 <code>CurrentInput (0x0001)</code> 高亮当前选中项。
      可以根据 <code>InputType</code> 为不同接口类型显示不同图标（如 HDMI 图标、USB 图标等），
      提升用户识别效率。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：App 切换电视输入源</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>InputList (0x0000)</code>，获取所有输入源（Index、Name、InputType、Description）</li>
        <li>读取 <code>CurrentInput (0x0001)</code>，高亮当前选中的输入源</li>
        <li>在 UI 上展示输入源列表，根据 InputType 显示对应图标</li>
        <li>用户点击目标输入源，发送 <code>SelectInput (0x00)</code>，Index 设为该输入源的索引值</li>
        <li>订阅 <code>CurrentInput</code> 属性变化，确认切换成功后更新 UI</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：用户自定义输入源名称</summary>
    <div class="scenario-content">
      <ol>
        <li>检查设备的 <code>FeatureMap (0xFFFC)</code>，确认支持 <strong>NU</strong>（Bit 0 = 1）</li>
        <li>读取 <code>InputList (0x0000)</code>，展示输入源列表</li>
        <li>用户长按某个输入源（如 Index=2，当前名称"HDMI 2"），弹出重命名输入框</li>
        <li>用户输入新名称"PS5"，发送 <code>RenameInput (0x03)</code>，Index=2，Name="PS5"</li>
        <li>订阅 <code>InputList</code> 变化，确认名称更新后刷新 UI</li>
      </ol>
      <p>
        <strong>注意</strong>：如果 FeatureMap 不包含 NU 特性，UI 上不应显示重命名入口，
        发送 RenameInput 命令会被设备拒绝。
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
    description: 'Matter AudioOutput Cluster(0x050B)完整参考 — SelectOutput/RenameOutput 命令、OutputList 输出源列表、OutputInfoStruct 结构体、OutputTypeEnum 枚举值及 NameUpdates 特性说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>AudioOutput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050B</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、AV 接收器、Soundbar 等）
  </p>
  <p>
    AudioOutput 负责管理设备的音频输出目的地 —— HDMI ARC、蓝牙、光纤、耳机、内置扬声器等。
    用户可以通过它查询设备有哪些音频输出、当前正在使用哪个、切换到指定输出，以及为输出源自定义名称。
    它是智能电视、AV 接收器、Soundbar 等媒体设备的常见 Cluster 之一，与 <a href="/clusters/media-input/">MediaInput</a> 互为输入/输出的对应关系。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">NameUpdates(NU)特性</div>
    <p>
      AudioOutput Cluster 定义了一个 <strong>NameUpdates（NU）</strong> Feature。
      启用后，控制端可以通过 <code>RenameOutput</code> 命令为输出源自定义名称
      （例如把"Bluetooth"改成"HomePod"）。未启用时，输出源名称由设备固定，不可修改。
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
    AudioOutput Cluster 共有 2 个命令。SelectOutput 用于切换音频输出目的地，
    RenameOutput 允许用户为输出源自定义名称（需要 NU 特性）。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>切换到指定音频输出</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>RenameOutput</td>
          <td>重命名指定输出源</td>
          <td class="col-required">NU</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SelectOutput —— 切换音频输出(0x00)</h3>
  <p>
    将设备的音频输出切换到指定目的地。<code>Index</code> 必须是 <code>OutputList</code> 中某个
    <code>OutputInfoStruct</code> 的 <code>Index</code> 值，否则设备会返回错误。
    执行成功后，<code>CurrentOutput</code> 属性会更新为指定的 Index 值。
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
          <td>目标输出源的索引值，必须存在于 <code>OutputList</code> 中</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在手机 App 上选择"HDMI ARC"，App 读取 <code>OutputList</code> 获取该输出源的 Index 值，
        然后发送 <code>SelectOutput</code> 命令。电视将音频切换到 HDMI ARC 回传，<code>CurrentOutput</code> 随之更新。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">RenameOutput —— 重命名输出源(0x01)</h3>
  <p>
    为指定的输出源设置一个自定义名称。修改后，<code>OutputList</code> 中对应条目的 <code>Name</code> 字段会更新。
    此命令需要设备启用 <strong>NU（NameUpdates）</strong> 特性。
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
          <td>要重命名的输出源索引，必须存在于 <code>OutputList</code> 中</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>新的输出源名称</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// RenameOutput 命令示例
// 将 Index=2 的输出源重命名为 "HomePod"
{
  "Index": 2,
  "Name": "HomePod"
}
// 执行后 OutputList 中 Index=2 的 Name 变为 "HomePod"</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户连接了蓝牙音箱，但设备默认显示"Bluetooth"不够直观。
        通过 App 发送 <code>RenameOutput</code>，将 Index=2 的输出源重命名为"HomePod"。
        之后 OutputList 中该条目的 Name 会变为"HomePod"，UI 上也会显示新名称。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>AudioOutput Cluster 共有 2 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备所有音频输出源的列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentOutput</td>
          <td>uint8</td>
          <td>当前选中的音频输出源索引</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-output">音频输出状态(0x0000, 0x0001)</h3>
  <p>描述设备当前可用的音频输出列表和当前选中的输出源。</p>

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
          <td>OutputList（输出源列表）</td>
          <td>list&lt;<a href="#struct-output-info">OutputInfoStruct</a>&gt;</td>
          <td>设备声明的全部可用音频输出目的地，每个元素是一个 <a href="#struct-output-info">OutputInfoStruct</a>。列表内容反映设备实际的音频输出接口，每个 Index 值唯一。当用户通过 <code>RenameOutput</code> 修改名称后，对应条目的 Name 会更新</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentOutput（当前输出源）</td>
          <td>uint8</td>
          <td>当前选中的音频输出索引。该值始终指向 <code>OutputList</code> 中某个 <code>OutputInfoStruct.Index</code>。通过 <code>SelectOutput</code> 命令改变，也可能由用户通过遥控器或设备面板切换</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      控制端应订阅 <code>CurrentOutput</code> 属性的变化，以便在用户通过遥控器或设备面板切换音频输出时同步 App 界面。
      同样，如果设备支持 NU 特性，也应订阅 <code>OutputList</code> 的变化以获取最新的输出源名称。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>AudioOutput Cluster 使用一个结构体来描述输出源信息。</p>

  <!-- OutputInfoStruct -->
  <h3 id="struct-output-info">OutputInfoStruct</h3>
  <p>描述一个音频输出源的完整信息，包括索引、类型和名称。</p>

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
          <td>输出源的唯一索引，用于 <code>SelectOutput</code> 和 <code>RenameOutput</code> 命令的定位</td>
        </tr>
        <tr>
          <td>OutputType</td>
          <td><a href="#enum-output-type">OutputTypeEnum</a></td>
          <td>输出源的接口类型（见下方枚举）</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>输出源的显示名称，如 <code>"HDMI ARC"</code>、<code>"HomePod"</code>。启用 NU 特性后可通过 <code>RenameOutput</code> 修改</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">与 MediaInput 的 InputInfoStruct 对比</div>
    <p>
      OutputInfoStruct 只有 3 个字段（Index、OutputType、Name），比 MediaInput 的 InputInfoStruct 少了一个 <code>Description</code> 字段。
      音频输出源的信息相对简单，通常名称本身就足以区分不同输出。
    </p>
  </div>

  <!-- OutputTypeEnum -->
  <h3 id="enum-output-type">OutputTypeEnum</h3>
  <p>
    定义音频输出源的接口类型。共 6 个枚举值，涵盖常见的音频输出方式。
    控制端可据此在 UI 上展示对应的图标或分类。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">HDMI</span>
        <span class="enum-desc">HDMI —— 通过 HDMI ARC/eARC 回传音频</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">BT</span>
        <span class="enum-desc">蓝牙 —— 蓝牙无线音频输出</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Optical</span>
        <span class="enum-desc">光纤 —— 光纤数字音频输出（TOSLINK/SPDIF）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Headphone</span>
        <span class="enum-desc">耳机 —— 3.5mm 耳机插孔或 USB 耳机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Internal</span>
        <span class="enum-desc">内置 —— 设备内置扬声器</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Other</span>
        <span class="enum-desc">其他 —— 以上类型未涵盖的输出方式</span>
      </div>
    </div>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>AudioOutput Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的可选能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NU（NameUpdates）</span>
        <span class="enum-desc">名称更新 —— 启用后支持 RenameOutput 命令，允许用户为输出源自定义名称</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">When to Enable NU</div>
    <p>
      支持用户自定义输出源名称的设备应启用此特性 —— 例如用户希望把"Bluetooth"改成蓝牙音箱的具体名称。
      如果设备的输出源名称是出厂固定的且不支持修改，则不启用 NU。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台智能电视的 AudioOutput Cluster 读取结果 —— 当前音频输出到 HDMI ARC，共有 4 个输出源：</p>

  <pre><code>{
  // --- 当前输出源 ---
  "0x0001": 1,                   // CurrentOutput = 1（当前选中 HDMI ARC）

  // --- 输出源列表 ---
  "0x0000": [                    // OutputList
    {
      "Index": 0,
      "OutputType": 4,            // Internal（内置扬声器）
      "Name": "TV Speaker"
    },
    {
      "Index": 1,
      "OutputType": 0,            // HDMI（HDMI ARC/eARC 回传）
      "Name": "HDMI ARC"
    },
    {
      "Index": 2,
      "OutputType": 1,            // BT（蓝牙音箱）
      "Name": "Bluetooth"
    },
    {
      "Index": 3,
      "OutputType": 2,            // Optical（光纤输出）
      "Name": "Optical Out"
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      控制端显示音频输出切换 UI 时，应先读取 <code>OutputList (0x0000)</code> 获取完整列表，
      再读取 <code>CurrentOutput (0x0001)</code> 高亮当前选中项。
      可以根据 <code>OutputType</code> 为不同接口类型显示不同图标（如蓝牙图标、耳机图标等），
      提升用户识别效率。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：App 切换电视音频输出</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>OutputList (0x0000)</code>，获取所有输出源（Index、Name、OutputType）</li>
        <li>读取 <code>CurrentOutput (0x0001)</code>，高亮当前选中的输出源</li>
        <li>在 UI 上展示输出源列表，根据 OutputType 显示对应图标（蓝牙、HDMI、耳机等）</li>
        <li>用户点击目标输出源，发送 <code>SelectOutput (0x00)</code>，Index 设为该输出源的索引值</li>
        <li>订阅 <code>CurrentOutput</code> 属性变化，确认切换成功后更新 UI</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：用户自定义输出源名称</summary>
    <div class="scenario-content">
      <ol>
        <li>检查设备的 <code>FeatureMap (0xFFFC)</code>，确认支持 <strong>NU</strong>（Bit 0 = 1）</li>
        <li>读取 <code>OutputList (0x0000)</code>，展示输出源列表</li>
        <li>用户长按某个输出源（如 Index=2，当前名称"Bluetooth"），弹出重命名输入框</li>
        <li>用户输入新名称"HomePod"，发送 <code>RenameOutput (0x01)</code>，Index=2，Name="HomePod"</li>
        <li>订阅 <code>OutputList</code> 变化，确认名称更新后刷新 UI</li>
      </ol>
      <p>
        <strong>注意</strong>：如果 FeatureMap 不包含 NU 特性，UI 上不应显示重命名入口，
        发送 RenameOutput 命令会被设备拒绝。
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
    description: 'Matter Channel Cluster(0x0504)完整参考 — ChangeChannel 模糊匹配、ChangeChannelByNumber 精确切台、SkipChannel 相对跳转、ChannelList 频道列表、Lineup 线路信息、CurrentChannel 当前频道及 Feature Map 说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>Channel Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0504</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒等）
  </p>
  <p>
    Channel 负责频道的导航和频道线路（Lineup）管理 —— 切台、跳台、按名称搜台、查询频道列表和电子节目单（EPG）。
    它是智能电视和机顶盒等媒体设备的核心 Cluster 之一，与 <a href="/clusters/media-input/">MediaInput</a> 分工不同：
    MediaInput 管理物理输入源（HDMI、USB），Channel 管理逻辑频道（CCTV-1、HBO）。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">四个可选特性</div>
    <p>
      Channel Cluster 定义了四个 Feature：<strong>CL</strong>（频道列表）、<strong>LI</strong>（线路信息）、
      <strong>EG</strong>（电子节目单）、<strong>RP</strong>（节目录制）。
      最基础的设备可以一个都不启用 —— 只支持 ChangeChannelByNumber 和 SkipChannel 两个基础切台命令。
      启用 CL 后提供频道列表供 UI 展示；启用 LI 后暴露运营商和线路信息；启用 EG 后可查询 EPG 节目单；启用 RP 后可预约录制。
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
    Channel Cluster 共有 6 个客户端命令和 2 个响应命令。
    基础切台（ChangeChannelByNumber / SkipChannel）所有设备都支持，
    ChangeChannel 需要频道列表或线路信息支撑（CL 或 LI），GetProgramGuide 和录制相关命令需要更高级的特性。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>按名称 / 呼号 / 编号模糊匹配切台</td>
          <td class="col-required">CL 或 LI</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>ChangeChannelByNumber</td>
          <td>按主号 + 副号精确切台</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>SkipChannel</td>
          <td>相对当前频道向前 / 向后跳转</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x04">
          <td><a href="#cmd-0x04"><code>0x04</code></a></td>
          <td>GetProgramGuide</td>
          <td>查询电子节目单（EPG）</td>
          <td class="col-required">EG</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x05">
          <td><a href="#cmd-0x05"><code>0x05</code></a></td>
          <td>RecordProgram</td>
          <td>预约录制指定节目</td>
          <td class="col-required">RP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x06">
          <td><a href="#cmd-0x06"><code>0x06</code></a></td>
          <td>CancelRecordProgram</td>
          <td>取消已预约的录制</td>
          <td class="col-required">RP</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>响应Commands</h4>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>触发命令</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>0x01</code></td>
          <td>ChangeChannelResponse</td>
          <td>ChangeChannel</td>
          <td>返回匹配结果的状态码和可选附加信息</td>
        </tr>
        <tr>
          <td><code>0x02</code></td>
          <td>ProgramGuideResponse</td>
          <td>GetProgramGuide</td>
          <td>返回节目列表和分页信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">ChangeChannel —— 模糊匹配切台(0x00)</h3>
  <p>
    通过一个字符串在频道列表中模糊匹配并切换频道。设备会依次匹配频道的 Name、CallSign、AffiliateCallSign、
    编号（MajorNumber-MinorNumber）等字段。如果唯一匹配到一个频道，自动切换并更新 <code>CurrentChannel</code>；
    如果匹配到多个或零个，通过 <code>ChangeChannelResponse</code> 告知控制端。
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
          <td>匹配字符串，可以是频道名称、呼号、编号等。例如 <code>"CCTV-6"</code>、<code>"HBO"</code>、<code>"6-1"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h4>ChangeChannelResponse</h4>
  <p>ChangeChannel 的响应，告知匹配结果：</p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Status</td>
          <td><a href="#enum-status">StatusEnum</a></td>
          <td>匹配结果状态（见下方枚举）</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string（可选）</td>
          <td>附加信息。MultipleMatches 时可能包含匹配到的频道名称列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// ChangeChannel 命令响应（ChangeChannelResponse）
// 匹配成功
{
  "Status": 0,         // Success
  "Data": null
}

// 匹配到多个结果
{
  "Status": 1,         // MultipleMatches
  "Data": "CCTV-5 体育, CCTV-5+ 赛事"
}

// 未匹配到任何频道
{
  "Status": 2,         // NoMatches
  "Data": null
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        语音助手场景：用户说「换到 CCTV-6」，语音系统将文本传入 ChangeChannel 的 Match 参数。
        设备在频道列表中匹配到 "CCTV-6 电影"，唯一命中，自动切台，返回 Status = Success。
        如果用户说「换到 CCTV-5」但设备同时有"CCTV-5 体育"和"CCTV-5+ 赛事"两个频道，
        返回 Status = MultipleMatches，App 需要让用户进一步选择。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">ChangeChannelByNumber —— 精确切台(0x02)</h3>
  <p>
    通过主号（MajorNumber）和副号（MinorNumber）精确切换到指定频道。
    这是最基础的切台命令，不需要设备提供频道列表，所有实现 Channel Cluster 的设备都必须支持。
    不返回响应命令 —— 切台成功后 <code>CurrentChannel</code> 属性会更新。
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
          <td>频道主号。例如 CCTV-6 的主号为 <code>6</code></td>
        </tr>
        <tr>
          <td>MinorNumber</td>
          <td>uint16</td>
          <td>频道副号。大多数频道副号为 <code>1</code>；同一主号下有子频道时用副号区分（如 6-1、6-2）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在 App 的频道列表中点击某个频道，App 直接用该频道的 MajorNumber 和 MinorNumber 发送此命令。
        也适用于遥控器数字键输入场景：用户按下 "6-1"，设备解析后调用 ChangeChannelByNumber(6, 1)。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">SkipChannel —— 相对跳台(0x03)</h3>
  <p>
    相对当前频道向前或向后跳转指定数量的频道。正数向前（频道号增大方向），负数向后。
    跳转依据的是设备内部的频道排列顺序，到达列表末尾或开头时会循环（wrap around）。
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
          <td>跳转数量。<code>+1</code> = 下一个频道，<code>-1</code> = 上一个频道，<code>+5</code> = 向前跳 5 个频道</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        对应遥控器上的频道 +/- 按钮。用户按一下 CH+，App 发送 SkipChannel(+1)；
        按一下 CH-，发送 SkipChannel(-1)。不需要知道当前频道的编号或列表中的位置，设备自行处理。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x04">GetProgramGuide —— 查询节目单(0x04)</h3>
  <p>
    查询电子节目单（EPG）数据，返回指定时间范围和频道范围内的节目列表。
    此命令需要设备启用 <strong>EG（ElectronicGuide）</strong> 特性。
    响应通过 <code>ProgramGuideResponse</code> 返回，支持分页。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>StartTime</td>
          <td>epoch-s（可选）</td>
          <td>查询的起始时间（UTC 秒级时间戳）。省略表示从当前时间开始</td>
        </tr>
        <tr>
          <td>EndTime</td>
          <td>epoch-s（可选）</td>
          <td>查询的结束时间。省略表示不限结束时间</td>
        </tr>
        <tr>
          <td>ChannelList</td>
          <td>list&lt;<a href="#struct-channel-info">ChannelInfoStruct</a>&gt;（可选）</td>
          <td>限定查询的频道范围。省略表示查询所有频道</td>
        </tr>
        <tr>
          <td>PageToken</td>
          <td>PageTokenStruct（可选）</td>
          <td>分页令牌，用于获取下一页结果</td>
        </tr>
        <tr>
          <td>RecordingFlag</td>
          <td>RecordingFlagBitmap（可选）</td>
          <td>筛选已预约录制或正在录制的节目</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">ProgramGuideResponse</div>
    <p>
      响应中包含 <code>ProgramList</code>（节目列表）和可选的 <code>Paging</code>（分页信息）。
      每个节目条目包含标题、描述、起止时间、所属频道、音频语言、分级等信息。
      由于 EPG 数据量通常较大，控制端应合理使用分页和时间 / 频道筛选来控制返回量。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x05">RecordProgram —— 预约录制(0x05)</h3>
  <p>
    预约录制指定节目。通过节目的唯一标识符（ProgramIdentifier）或外部 ID 定位要录制的节目。
    此命令需要设备启用 <strong>RP（RecordProgram）</strong> 特性。
    该命令只支持具备存储能力的设备（如带硬盘的机顶盒、DVR）。
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
          <td>节目的唯一标识符，来自 EPG 数据中的 Identifier 字段</td>
        </tr>
        <tr>
          <td>ShouldRecordSeries</td>
          <td>bool</td>
          <td>是否录制整个系列（而非单集）</td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;AdditionalInfoStruct&gt;（可选）</td>
          <td>外部标识符列表，用于跨平台定位同一节目</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>bytes（可选）</td>
          <td>厂商自定义数据</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x06">CancelRecordProgram —— 取消录制(0x06)</h3>
  <p>
    取消之前通过 RecordProgram 预约的录制任务。参数结构与 RecordProgram 相同，
    通过 ProgramIdentifier 定位要取消的录制。需要 <strong>RP</strong> 特性。
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
          <td>要取消录制的节目标识符</td>
        </tr>
        <tr>
          <td>ShouldRecordSeries</td>
          <td>bool</td>
          <td>是否取消整个系列的录制</td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;AdditionalInfoStruct&gt;（可选）</td>
          <td>外部标识符列表</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>bytes（可选）</td>
          <td>厂商自定义数据</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>Channel Cluster 共有 3 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备可收看的全部频道列表</td>
          <td class="col-required">CL</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>Lineup</td>
          <td><a href="#struct-lineup-info">LineupInfoStruct</a></td>
          <td>运营商和线路套餐信息</td>
          <td class="col-required">LI</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>CurrentChannel</td>
          <td><a href="#struct-channel-info">ChannelInfoStruct</a> / null</td>
          <td>当前正在收看的频道</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-channel">频道信息(0x0000 ~ 0x0002)</h3>
  <p>描述设备可用的频道列表、运营商线路信息以及当前选中的频道。</p>

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
          <td>ChannelList（频道列表）</td>
          <td>list&lt;<a href="#struct-channel-info">ChannelInfoStruct</a>&gt;</td>
          <td>设备声明的全部可收看频道。每个元素是一个 <a href="#struct-channel-info">ChannelInfoStruct</a>，包含频道编号、名称、呼号、类型等信息。列表的排列顺序即为 SkipChannel 的跳转顺序。<strong>需要 CL 特性</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>Lineup（线路信息）</td>
          <td><a href="#struct-lineup-info">LineupInfoStruct</a></td>
          <td>当前设备接入的运营商和线路套餐信息。包含运营商名称、套餐名、邮编等。<strong>需要 LI 特性</strong></td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>CurrentChannel（当前频道）</td>
          <td><a href="#struct-channel-info">ChannelInfoStruct</a> / null</td>
          <td>当前正在收看的频道信息。Nullable —— <code>null</code> 表示设备当前未调谐到任何频道（例如正在播放 HDMI 输入或流媒体 App）。通过 ChangeChannel / ChangeChannelByNumber / SkipChannel 命令改变</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      控制端应订阅 <code>CurrentChannel</code> 属性的变化，以便在用户通过遥控器换台时同步 App 界面。
      如果设备支持 CL 特性，也应在初次连接时读取 <code>ChannelList</code> 构建频道选择 UI。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>Channel Cluster 使用两个核心结构体来描述频道和线路信息。</p>

  <!-- ChannelInfoStruct -->
  <h3 id="struct-channel-info">ChannelInfoStruct</h3>
  <p>描述一个频道的完整信息。MajorNumber 和 MinorNumber 是必选字段，其余为可选。</p>

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
          <td>频道主号。例如 CCTV-6 对应 <code>6</code>，HBO 对应 <code>100</code></td>
        </tr>
        <tr>
          <td>MinorNumber</td>
          <td>uint16</td>
          <td>Yes</td>
          <td>频道副号。同一主号下的子频道用副号区分，大多数频道副号为 <code>1</code></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>No</td>
          <td>频道名称，供 UI 显示。例如 <code>"CCTV-6 电影"</code></td>
        </tr>
        <tr>
          <td>CallSign</td>
          <td>string</td>
          <td>No</td>
          <td>频道呼号（广播标识符）。例如 <code>"CCTV6"</code>、<code>"HBO"</code></td>
        </tr>
        <tr>
          <td>AffiliateCallSign</td>
          <td>string</td>
          <td>No</td>
          <td>附属呼号。用于同一频道在不同地区的分支版本，例如 <code>"HBO East"</code></td>
        </tr>
        <tr>
          <td>Identifier</td>
          <td>string</td>
          <td>No</td>
          <td>频道的唯一标识符，用于在 EPG 等系统中定位频道。例如 <code>"cctv6-hd"</code></td>
        </tr>
        <tr>
          <td>Type</td>
          <td><a href="#enum-channel-type">ChannelTypeEnum</a></td>
          <td>No</td>
          <td>频道类型 —— 卫星、有线、地面广播还是 OTT 流媒体（见下方枚举）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- LineupInfoStruct -->
  <h3 id="struct-lineup-info">LineupInfoStruct</h3>
  <p>描述设备当前接入的运营商线路信息。OperatorName 和 LineupInfoType 是必选字段。</p>

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
          <td>运营商名称。例如 <code>"中国广电"</code>、<code>"Comcast"</code></td>
        </tr>
        <tr>
          <td>LineupName</td>
          <td>string</td>
          <td>No</td>
          <td>线路套餐名称。例如 <code>"标清数字套餐"</code>、<code>"Premium HD Bundle"</code></td>
        </tr>
        <tr>
          <td>PostalCode</td>
          <td>string</td>
          <td>No</td>
          <td>设备所在地区的邮政编码，用于区分同一运营商在不同地区的频道编排差异</td>
        </tr>
        <tr>
          <td>LineupInfoType</td>
          <td><a href="#enum-lineup-info-type">LineupInfoTypeEnum</a></td>
          <td>Yes</td>
          <td>线路类型（见下方枚举）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 枚举值 ====== -->
  <h2 id="enums">枚举值</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>ChangeChannelResponse 中的匹配结果状态：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">唯一匹配成功 —— 已切换到目标频道</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">MultipleMatches</span>
        <span class="enum-desc">匹配到多个频道 —— 需要用户进一步选择</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NoMatches</span>
        <span class="enum-desc">未匹配到任何频道</span>
      </div>
    </div>
  </div>

  <!-- ChannelTypeEnum -->
  <h3 id="enum-channel-type">ChannelTypeEnum</h3>
  <p>描述频道的传输方式 / 来源类型：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Satellite</span>
        <span class="enum-desc">卫星电视 —— 通过卫星信号接收</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Cable</span>
        <span class="enum-desc">有线电视 —— 通过同轴电缆或光纤入户</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Terrestrial</span>
        <span class="enum-desc">地面广播 —— 通过地面无线信号接收（DVB-T / ATSC）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">OTT</span>
        <span class="enum-desc">OTT 流媒体 —— 通过互联网传输（IPTV / 网络直播）</span>
      </div>
    </div>
  </div>

  <!-- LineupInfoTypeEnum -->
  <h3 id="enum-lineup-info-type">LineupInfoTypeEnum</h3>
  <p>描述线路运营商的类型：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">MSO</span>
        <span class="enum-desc">Multiple System Operator —— 多系统运营商（最常见，如有线电视公司、IPTV 运营商）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">LineupInfoType 目前只有一个值</div>
    <p>
      Matter 1.4 规范中 LineupInfoTypeEnum 目前只定义了 <code>MSO (0)</code> 一个枚举值。
      未来版本可能会扩展更多类型。设备实现时应使用 <code>0</code> 作为默认值。
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>Channel Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持哪些可选能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CL（ChannelList）</span>
        <span class="enum-desc">频道列表 —— 设备提供可浏览的频道列表（ChannelList 属性），支持 ChangeChannel 模糊匹配</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LI（LineupInfo）</span>
        <span class="enum-desc">线路信息 —— 设备暴露运营商和线路套餐信息（Lineup 属性），也可支持 ChangeChannel</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">EG（ElectronicGuide）</span>
        <span class="enum-desc">电子节目单 —— 设备提供 EPG 数据，支持 GetProgramGuide 命令查询节目信息</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 3</span>
      <div>
        <span class="enum-name">RP（RecordProgram）</span>
        <span class="enum-desc">节目录制 —— 设备支持预约录制，提供 RecordProgram 和 CancelRecordProgram 命令</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">特性依赖关系</div>
    <p>
      <strong>ChangeChannel</strong> 命令要求设备至少启用 CL 或 LI 之一，否则没有数据来源进行名称匹配。<br/>
      <strong>RP</strong> 特性隐含要求 <strong>EG</strong> —— 要录制节目，必须先能查询到节目信息。<br/>
      <strong>ChangeChannelByNumber</strong> 和 <strong>SkipChannel</strong> 不依赖任何特性，是基础必选命令。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台启用了 CL + LI 特性的机顶盒，当前正在收看 CCTV-6 的 Channel Cluster 读取结果：</p>

  <pre><code>{
  // --- 当前频道 ---
  "0x0002": {                       // CurrentChannel
    "MajorNumber": 6,
    "MinorNumber": 1,
    "Name": "CCTV-6 电影",
    "CallSign": "CCTV6",
    "AffiliateCallSign": null,
    "Identifier": "cctv6-hd",
    "Type": 2                        // Terrestrial（地面广播）
  },

  // --- 频道列表（需要 CL 特性）---
  "0x0000": [                        // ChannelList
    {
      "MajorNumber": 1,
      "MinorNumber": 1,
      "Name": "CCTV-1 综合",
      "CallSign": "CCTV1",
      "AffiliateCallSign": null,
      "Identifier": "cctv1-hd",
      "Type": 2                      // Terrestrial
    },
    {
      "MajorNumber": 5,
      "MinorNumber": 1,
      "Name": "CCTV-5 体育",
      "CallSign": "CCTV5",
      "AffiliateCallSign": null,
      "Identifier": "cctv5-hd",
      "Type": 2
    },
    {
      "MajorNumber": 6,
      "MinorNumber": 1,
      "Name": "CCTV-6 电影",
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
      "Type": 1                      // Cable（有线电视）
    }
  ],

  // --- 线路信息（需要 LI 特性）---
  "0x0001": {                        // Lineup
    "OperatorName": "中国广电",
    "LineupName": "标清数字套餐",
    "PostalCode": "100000",
    "LineupInfoType": 0              // MSO
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      对于最简单的设备，可能只有 <code>CurrentChannel (0x0002)</code> 一个属性。
      只有支持 CL 特性的设备才会返回 <code>ChannelList (0x0000)</code>，只有支持 LI 的设备才会返回 <code>Lineup (0x0001)</code>。
      读取前可先检查 <code>FeatureMap (0xFFFC)</code> 判断设备支持哪些特性，避免读取不存在的属性。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：App 频道列表与换台</summary>
    <div class="scenario-content">
      <ol>
        <li>检查 <code>FeatureMap (0xFFFC)</code>，确认设备支持 <strong>CL</strong>（Bit 0 = 1）</li>
        <li>读取 <code>ChannelList (0x0000)</code>，获取全部频道（MajorNumber、MinorNumber、Name、CallSign、Type）</li>
        <li>读取 <code>CurrentChannel (0x0002)</code>，高亮当前频道</li>
        <li>在 UI 上展示频道列表，可根据 <code>Type</code> 分组显示（地面广播、有线、卫星、OTT）</li>
        <li>用户点击目标频道，发送 <code>ChangeChannelByNumber</code>，传入该频道的 MajorNumber 和 MinorNumber</li>
        <li>订阅 <code>CurrentChannel</code> 属性变化，确认切台成功后更新 UI 高亮</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：语音助手模糊搜台</summary>
    <div class="scenario-content">
      <ol>
        <li>确认设备支持 <strong>CL</strong> 或 <strong>LI</strong> 特性（ChangeChannel 的前提条件）</li>
        <li>用户对语音助手说「换到 HBO」，语音系统将文本 <code>"HBO"</code> 作为 Match 参数发送 <code>ChangeChannel</code></li>
        <li>检查 ChangeChannelResponse 的 Status：
          <ul>
            <li><strong>Success (0)</strong>：已切台，无需额外操作</li>
            <li><strong>MultipleMatches (1)</strong>：向用户展示 Data 中的候选频道列表，让用户选择后用 ChangeChannelByNumber 精确切台</li>
            <li><strong>NoMatches (2)</strong>：提示用户未找到匹配频道，建议更换搜索词</li>
          </ul>
        </li>
        <li>订阅 <code>CurrentChannel</code> 确认切台结果</li>
      </ol>
      <p>
        <strong>注意</strong>：ChangeChannel 的匹配逻辑由设备实现决定。不同设备对同一搜索词的匹配结果可能不同。
        App 应优雅处理 MultipleMatches 和 NoMatches 两种情况。
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
    description: 'Matter KeypadInput Cluster(0x0509)完整参考 — SendKey 命令、CecKeyCode 按键枚举(导航/数字/媒体控制/颜色/功能键)、StatusEnum 响应状态、NV/LK/NK 特性说明及实际场景示例。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>KeypadInput Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0509</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒等）
  </p>
  <p>
    KeypadInput 负责接收遥控器和外部控制端的按键输入 —— 方向导航、数字键、媒体控制键、颜色功能键等。
    它是智能电视、机顶盒等媒体设备的核心交互 Cluster，让手机 App 可以充当遥控器使用。
    按键编码沿用 HDMI-CEC 标准（CEC Key Code），覆盖了遥控器上常见的所有按键。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">三类按键特性</div>
    <p>
      KeypadInput 通过三个 Feature 标记设备支持哪些按键类别：
      <strong>NV</strong>（导航键：方向、确认、菜单等）、
      <strong>LK</strong>（位置键：频道号、收藏等）、
      <strong>NK</strong>（数字键：0~9、Enter 等）。
      发送按键前应先检查 FeatureMap，避免发送设备不支持的按键类别。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令</a>
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
    KeypadInput Cluster 只有 1 个命令和 1 个响应。控制端发送 <code>SendKey</code>，设备返回 <code>SendKeyResponse</code> 表示处理结果。
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
          <td>发送一个按键到设备</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>SendKeyResponse</td>
          <td>Server &rarr; Client</td>
          <td>设备对 SendKey 的处理结果</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">SendKey —— 发送按键(0x00)</h3>
  <p>
    向设备发送一个 CEC 按键码，模拟遥控器按键操作。
    设备收到后根据当前状态处理按键，并返回 <code>SendKeyResponse</code> 告知处理结果。
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
          <td>要发送的按键码（见下方枚举）</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        手机 App 充当遥控器时，用户点击方向键或确认键，App 将对应的 CecKeyCode 通过 SendKey 发送给电视。
        例如用户按"确认"，发送 <code>KeyCode = 0x00 (Select)</code>。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">SendKeyResponse —— 按键响应(0x01)</h3>
  <p>
    设备对 SendKey 命令的响应，告知控制端按键是否被成功处理。
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
          <td>按键处理结果（见下方枚举）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// SendKey 命令示例
// 发送"确认"键（Select = 0x00）
{
  "KeyCode": 0       // CecKeyCode.Select
}

// 设备返回 SendKeyResponse
{
  "Status": 0        // StatusEnum.Success
}</code></pre>

  <div class="callout callout-warning">
    <div class="callout-title">错误处理</div>
    <p>
      控制端应根据 <code>StatusEnum</code> 处理异常情况：
      收到 <code>UnsupportedKey</code> 时，UI 上对应按键可置灰或隐藏；
      收到 <code>InvalidKeyInCurrentState</code> 时，可提示用户当前状态下该按键不可用（如非播放状态下按暂停）。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>SendKeyResponse 的处理结果。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">成功 —— 按键已被设备正常处理</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">UnsupportedKey</span>
        <span class="enum-desc">不支持 —— 设备不识别该按键码</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">InvalidKeyInCurrentState</span>
        <span class="enum-desc">状态无效 —— 当前状态下不接受该按键（如未播放时按暂停）</span>
      </div>
    </div>
  </div>

  <!-- CecKeyCode -->
  <h3 id="enum-cec-key-code">CecKeyCode(CEC 按键码)</h3>
  <p>
    沿用 HDMI-CEC 标准的按键码定义，覆盖遥控器上常见的所有按键。
    按功能分为以下几组，方便按需查阅。
  </p>

  <!-- 导航键 -->
  <h4 id="keys-navigation">导航键(NV 特性)</h4>
  <p>方向导航、确认、返回、菜单等基础交互按键，是遥控器最核心的操作区域。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x00</span>
      <div>
        <span class="enum-name">Select</span>
        <span class="enum-desc">确认 / OK</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x01</span>
      <div>
        <span class="enum-name">Up</span>
        <span class="enum-desc">上</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x02</span>
      <div>
        <span class="enum-name">Down</span>
        <span class="enum-desc">下</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x03</span>
      <div>
        <span class="enum-name">Left</span>
        <span class="enum-desc">左</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x04</span>
      <div>
        <span class="enum-name">Right</span>
        <span class="enum-desc">右</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x05</span>
      <div>
        <span class="enum-name">RightUp</span>
        <span class="enum-desc">右上</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x06</span>
      <div>
        <span class="enum-name">RightDown</span>
        <span class="enum-desc">右下</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x07</span>
      <div>
        <span class="enum-name">LeftUp</span>
        <span class="enum-desc">左上</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x08</span>
      <div>
        <span class="enum-name">LeftDown</span>
        <span class="enum-desc">左下</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x09</span>
      <div>
        <span class="enum-name">RootMenu</span>
        <span class="enum-desc">主菜单</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0A</span>
      <div>
        <span class="enum-name">SetupMenu</span>
        <span class="enum-desc">设置菜单</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0B</span>
      <div>
        <span class="enum-name">ContentsMenu</span>
        <span class="enum-desc">内容菜单</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x0D</span>
      <div>
        <span class="enum-name">Exit</span>
        <span class="enum-desc">退出</span>
      </div>
    </div>
  </div>

  <!-- 数字键 -->
  <h4 id="keys-number">数字键(NK 特性)</h4>
  <p>0~9 数字输入和 Enter 确认，用于频道号输入、密码输入等场景。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x20</span>
      <div>
        <span class="enum-name">Number0OrNumber10</span>
        <span class="enum-desc">数字 0（或 10）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x21</span>
      <div>
        <span class="enum-name">Numbers1</span>
        <span class="enum-desc">数字 1</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x22</span>
      <div>
        <span class="enum-name">Numbers2</span>
        <span class="enum-desc">数字 2</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x23</span>
      <div>
        <span class="enum-name">Numbers3</span>
        <span class="enum-desc">数字 3</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x24</span>
      <div>
        <span class="enum-name">Numbers4</span>
        <span class="enum-desc">数字 4</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x25</span>
      <div>
        <span class="enum-name">Numbers5</span>
        <span class="enum-desc">数字 5</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x26</span>
      <div>
        <span class="enum-name">Numbers6</span>
        <span class="enum-desc">数字 6</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x27</span>
      <div>
        <span class="enum-name">Numbers7</span>
        <span class="enum-desc">数字 7</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x28</span>
      <div>
        <span class="enum-name">Numbers8</span>
        <span class="enum-desc">数字 8</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x29</span>
      <div>
        <span class="enum-name">Numbers9</span>
        <span class="enum-desc">数字 9</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x2B</span>
      <div>
        <span class="enum-name">NumbersEnter</span>
        <span class="enum-desc">数字输入确认</span>
      </div>
    </div>
  </div>

  <!-- 媒体控制键 -->
  <h4 id="keys-media">媒体控制键</h4>
  <p>播放、暂停、快进、快退、录制等媒体播放控制按键。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">Play</span>
        <span class="enum-desc">播放</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">Stop</span>
        <span class="enum-desc">停止</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">Pause</span>
        <span class="enum-desc">暂停</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x44</span>
      <div>
        <span class="enum-name">Record</span>
        <span class="enum-desc">录制</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x45</span>
      <div>
        <span class="enum-name">Rewind</span>
        <span class="enum-desc">快退</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x46</span>
      <div>
        <span class="enum-name">FastForward</span>
        <span class="enum-desc">快进</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x47</span>
      <div>
        <span class="enum-name">Eject</span>
        <span class="enum-desc">弹出</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x48</span>
      <div>
        <span class="enum-name">Forward</span>
        <span class="enum-desc">下一曲 / 下一章</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x49</span>
      <div>
        <span class="enum-name">Backward</span>
        <span class="enum-desc">上一曲 / 上一章</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x4B</span>
      <div>
        <span class="enum-name">PausePlayFunction</span>
        <span class="enum-desc">播放/暂停切换</span>
      </div>
    </div>
  </div>

  <!-- 位置/频道键 -->
  <h4 id="keys-location">位置 / 频道键(LK 特性)</h4>
  <p>频道切换、收藏频道、节目指南等与频道定位相关的按键。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x30</span>
      <div>
        <span class="enum-name">ChannelUp</span>
        <span class="enum-desc">频道 +</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x31</span>
      <div>
        <span class="enum-name">ChannelDown</span>
        <span class="enum-desc">频道 -</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x32</span>
      <div>
        <span class="enum-name">PreviousChannel</span>
        <span class="enum-desc">上一个频道（回看）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x60</span>
      <div>
        <span class="enum-name">Data</span>
        <span class="enum-desc">数据 / 信息</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x53</span>
      <div>
        <span class="enum-name">ElectronicProgramGuide</span>
        <span class="enum-desc">电子节目指南（EPG）</span>
      </div>
    </div>
  </div>

  <!-- 音量/电源键 -->
  <h4 id="keys-power-volume">电源 / 音量键</h4>
  <p>设备电源控制和音量调节。这些按键通常不受 Feature 限制，大多数设备都支持。</p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0x40</span>
      <div>
        <span class="enum-name">Power</span>
        <span class="enum-desc">电源开/关</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6B</span>
      <div>
        <span class="enum-name">PowerOffFunction</span>
        <span class="enum-desc">关机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6C</span>
      <div>
        <span class="enum-name">PowerOnFunction</span>
        <span class="enum-desc">开机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x41</span>
      <div>
        <span class="enum-name">VolumeUp</span>
        <span class="enum-desc">音量 +</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x42</span>
      <div>
        <span class="enum-name">VolumeDown</span>
        <span class="enum-desc">音量 -</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x43</span>
      <div>
        <span class="enum-name">Mute</span>
        <span class="enum-desc">静音</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6D</span>
      <div>
        <span class="enum-name">MuteFunction</span>
        <span class="enum-desc">静音（仅静音）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x6E</span>
      <div>
        <span class="enum-name">RestoreVolumeFunction</span>
        <span class="enum-desc">恢复音量（取消静音）</span>
      </div>
    </div>
  </div>

  <!-- 颜色功能键 -->
  <h4 id="keys-color">颜色功能键</h4>
  <p>遥控器上的四色快捷键（红、绿、黄、蓝），功能由当前界面上下文决定。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0x72</span>
      <div>
        <span class="enum-name">F2Red</span>
        <span class="enum-desc">红色键</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x73</span>
      <div>
        <span class="enum-name">F3Green</span>
        <span class="enum-desc">绿色键</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x74</span>
      <div>
        <span class="enum-name">F4Yellow</span>
        <span class="enum-desc">黄色键</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">0x75</span>
      <div>
        <span class="enum-name">F5Blue</span>
        <span class="enum-desc">蓝色键</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">CEC 按键码完整列表</div>
    <p>
      以上仅列出最常用的按键码。完整的 CecKeyCode 枚举定义在 Matter 1.4 规范 Section 9.10.4.1 中，
      共计 80+ 个值，还包括文字输入键（F1~F5）、音频选择、字幕控制等。
      实际开发中，只需实现设备和 App UI 用到的按键即可。
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>KeypadInput Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的按键类别：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">NV（NavigationKeyCodes）</span>
        <span class="enum-desc">导航键 —— 支持方向键、确认、菜单、返回等导航操作</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">LK（LocationKeys）</span>
        <span class="enum-desc">位置键 —— 支持频道切换、频道号输入、节目指南等频道定位操作</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">NK（NumberKeys）</span>
        <span class="enum-desc">数字键 —— 支持 0~9 数字输入和数字确认键</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">Feature 与按键的对应关系</div>
    <p>
      设备不一定支持所有按键。发送 SendKey 前应检查 FeatureMap：
      没有 <strong>NV</strong> 就不要发方向键和菜单键；
      没有 <strong>NK</strong> 就不要发数字键；
      没有 <strong>LK</strong> 就不要发频道相关的键。
      发送不支持的按键，设备会返回 <code>UnsupportedKey</code>。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>KeypadInput Cluster 没有应用属性，以下是读取 FeatureMap 判断设备能力的示例：</p>

  <pre><code>{
  // --- Feature Map ---
  "0xFFFC": 7          // FeatureMap = 0b111（NV + LK + NK 全部启用）

  // KeypadInput 没有应用属性，
  // 只通过 SendKey 命令接收按键输入。
  // 读取 FeatureMap 可判断设备支持哪些按键类别。
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      KeypadInput 是一个「纯命令型」Cluster —— 没有可读取的应用属性，只通过 SendKey 命令进行交互。
      控制端的遥控器 UI 应根据 <code>FeatureMap</code> 动态显示按键区域：
      支持 NV 就显示方向键区域，支持 NK 就显示数字键盘，支持 LK 就显示频道切换按钮。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：手机 App 充当遥控器</summary>
    <div class="scenario-content">
      <ol>
        <li>读取设备的 <code>FeatureMap (0xFFFC)</code>，判断支持哪些按键类别</li>
        <li>根据 Feature 动态渲染遥控器 UI：
          <ul>
            <li>NV 启用 &rarr; 显示方向键十字盘 + 确认键 + 菜单/返回</li>
            <li>NK 启用 &rarr; 显示数字键盘（0~9 + Enter）</li>
            <li>LK 启用 &rarr; 显示频道 +/- 按钮和 EPG 入口</li>
          </ul>
        </li>
        <li>用户点击 UI 上的按键，发送 <code>SendKey (0x00)</code>，KeyCode 对应 CecKeyCode 枚举值</li>
        <li>检查 <code>SendKeyResponse</code> 的 Status：
          <ul>
            <li><code>Success (0)</code> —— 正常，无需额外处理</li>
            <li><code>UnsupportedKey (1)</code> —— 该按键不受支持，UI 上标记为不可用</li>
            <li><code>InvalidKeyInCurrentState (2)</code> —— 当前状态下不可用，提示用户</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：语音助手控制电视播放</summary>
    <div class="scenario-content">
      <ol>
        <li>用户说"暂停"，语音助手解析意图为暂停播放</li>
        <li>发送 <code>SendKey</code>，KeyCode = <code>0x43 (Pause)</code></li>
        <li>设备返回 <code>Success</code>，播放暂停</li>
        <li>用户说"继续播放"，发送 <code>SendKey</code>，KeyCode = <code>0x41 (Play)</code></li>
        <li>
          <strong>注意</strong>：如果设备正在菜单界面而非播放状态，发送 Pause 可能返回
          <code>InvalidKeyInCurrentState</code>，语音助手应给出相应的语音反馈
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
    description: 'Matter ContentLauncher Cluster(0x050A)完整参考 — LaunchContent 内容搜索启动、LaunchURL 链接播放、AcceptHeader 支持类型、SupportedStreamingProtocols 流协议、StatusEnum 状态码、ContentSearchStruct / ParameterStruct / BrandingInformationStruct 结构体及 Feature 位图说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ContentLauncher Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050A</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒、流媒体设备等）
  </p>
  <p>
    ContentLauncher 负责在媒体设备上启动内容播放 —— 既可以通过搜索条件查找内容，也可以直接通过 URL 启动。
    它是智能电视、机顶盒、流媒体棒等设备的核心 Cluster 之一，是语音助手「播放 XXX」指令的底层实现。
    控制端可以指定搜索关键词、播放偏好（字幕语言、起始位置）和品牌展示信息。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">三个 Feature 决定设备能力</div>
    <p>
      ContentLauncher 定义了三个 Feature：<strong>CS（ContentSearch）</strong>、<strong>UP（URLPlayback）</strong> 和 <strong>AP（AdvancedSeek）</strong>。
      CS 启用后支持 <code>LaunchContent</code> 命令（按关键词搜索启动），UP 启用后支持 <code>LaunchURL</code> 命令（按 URL 直接启动），
      AP 启用后 <code>LaunchContent</code> 可携带播放偏好（起始位置、字幕、音轨）。
      设备至少应启用 CS 或 UP 中的一个，否则这个 Cluster 没有实际意义。
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
    <a href="#enums">枚举与位图</a>
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
    ContentLauncher Cluster 有 2 个请求命令和 1 个响应命令。
    LaunchContent 通过搜索条件查找并启动内容（需要 CS 特性），LaunchURL 通过 URL 直接启动（需要 UP 特性），
    两者都返回 LauncherResponse 告知启动结果。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>请求</td>
          <td>按搜索条件查找并启动内容</td>
          <td class="col-required">CS</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>LaunchURL</td>
          <td>请求</td>
          <td>按 URL 直接启动内容</td>
          <td class="col-required">UP</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>LauncherResponse</td>
          <td>响应</td>
          <td>启动结果（两个命令共用）</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">LaunchContent —— 搜索启动内容(0x00)</h3>
  <p>
    通过搜索条件在设备上查找并启动内容。搜索条件由 <a href="#struct-content-search">ContentSearchStruct</a> 描述，
    可以组合多个参数（如类型 + 演员 + 流派）来精确定位内容。设备收到命令后，
    根据搜索结果自动播放（AutoPlay = true）或展示搜索结果列表让用户选择。
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
          <td>搜索条件，包含一组搜索参数</td>
        </tr>
        <tr>
          <td>AutoPlay</td>
          <td>bool</td>
          <td>Yes</td>
          <td><code>true</code> = 找到后自动播放；<code>false</code> = 只展示搜索结果</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>应用特定的附加数据（如季/集信息、播放参数），由设备自行解析</td>
        </tr>
        <tr>
          <td>PlaybackPreferences</td>
          <td><a href="#struct-playback-prefs">PlaybackPreferencesStruct</a></td>
          <td>No</td>
          <td>播放偏好：起始位置、字幕语言、音轨选择。<strong>需要 AP 特性</strong></td>
        </tr>
        <tr>
          <td>UseCurrentContext</td>
          <td>bool</td>
          <td>No</td>
          <td><code>true</code> = 在当前播放上下文中启动（如当前 App 内搜索）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchContent 命令示例
// 搜索"三体"并自动播放，偏好中文字幕
{
  "Search": {
    "ParameterList": [
      {
        "Type": 12,
        "Value": "Movie"
      },
      {
        "Type": 0,
        "Value": "三体"
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
        用户对语音助手说「播放三体第一季」，助手解析出搜索参数（Type=Movie，Value="三体"），
        构造 ContentSearchStruct，设置 AutoPlay=true，发送 LaunchContent 命令。
        电视在已安装的流媒体应用中搜索匹配内容并自动开始播放。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">LaunchURL —— URL 直接启动(0x01)</h3>
  <p>
    通过 URL 直接在设备上启动内容播放。适用于已知内容地址的场景，
    比如从手机 App 分享一个视频链接到电视播放。可以附带显示文本和品牌信息。
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
          <td>要播放的内容 URL，设备需要支持该 URL 指向的内容格式</td>
        </tr>
        <tr>
          <td>DisplayString</td>
          <td>string</td>
          <td>No</td>
          <td>在设备屏幕上展示的描述文本（如视频标题）</td>
        </tr>
        <tr>
          <td>BrandingInformation</td>
          <td><a href="#struct-branding">BrandingInformationStruct</a></td>
          <td>No</td>
          <td>内容提供商的品牌展示信息（名称、Logo、背景等）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchURL 命令示例
// 直接通过 URL 启动视频，附带品牌信息
{
  "ContentURL": "https://example.com/stream/movie-12345.m3u8",
  "DisplayString": "三体 第一季 第1集",
  "BrandingInformation": {
    "ProviderName": "ExampleTV"
  }
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在手机上看到一个视频，点击「投屏到电视」，App 获取视频的流媒体 URL，
        发送 LaunchURL 命令到电视。电视收到后直接打开该 URL 播放，
        屏幕上显示 DisplayString 作为视频标题，加载画面展示品牌 Logo。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">LauncherResponse —— 启动结果(0x02)</h3>
  <p>
    LaunchContent 和 LaunchURL 的统一响应。包含一个状态码和可选的附加数据。
    控制端根据 Status 判断启动是否成功，失败时 Data 中可能包含错误详情。
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
          <td>启动结果状态码（见下方枚举）</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>可选的附加数据，成功时可能返回会话 ID，失败时返回错误信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LauncherResponse 响应示例
// 启动成功
{
  "Status": 0,
  "Data": "playback-session-id=abc123"
}

// 启动失败 —— URL 不可用
{
  "Status": 1,
  "Data": "URL expired or geo-restricted"
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ContentLauncher Cluster 共有 2 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备支持的内容 MIME 类型列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>SupportedStreamingProtocols</td>
          <td><a href="#bitmap-protocols">SupportedProtocolsBitmap</a></td>
          <td>设备支持的流媒体协议位图</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-content-caps">内容能力(0x0000, 0x0001)</h3>
  <p>描述设备能够接受和播放的内容类型与流媒体协议。控制端在发送 LaunchURL 前应检查这些属性，确保设备支持目标内容格式。</p>

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
          <td>AcceptHeader（支持的内容类型）</td>
          <td>list&lt;string&gt;</td>
          <td>设备能处理的 MIME 类型列表，格式遵循 HTTP Accept Header 规范（如 <code>"video/mp4"</code>、<code>"application/dash+xml"</code>）。控制端发送 LaunchURL 前应检查目标内容的 MIME 类型是否在此列表中。<strong>需要 UP 特性</strong></td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>SupportedStreamingProtocols（支持的流协议）</td>
          <td><a href="#bitmap-protocols">SupportedProtocolsBitmap</a></td>
          <td>设备支持的流媒体协议位图。控制端据此选择合适的流地址格式（如 DASH 的 .mpd 或 HLS 的 .m3u8）。<strong>需要 UP 特性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">属性与 Feature 的关系</div>
    <p>
      AcceptHeader 和 SupportedStreamingProtocols 只在启用 <strong>UP（URLPlayback）</strong> 特性时才有意义。
      如果设备只支持 CS（内容搜索），这两个属性可能不存在 —— 因为搜索启动不涉及 URL 格式判断，
      内容格式由设备内部的应用自行处理。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>ContentLauncher Cluster 使用多个结构体来描述搜索条件、播放偏好和品牌信息。</p>

  <!-- ContentSearchStruct -->
  <h3 id="struct-content-search">ContentSearchStruct</h3>
  <p>描述一次内容搜索的完整条件，包含一组搜索参数。多个参数之间是 AND 关系 —— 设备需要同时满足所有条件。</p>

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
          <td>搜索参数列表，每个元素指定一个搜索维度（如类型、演员、流派）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ParameterStruct -->
  <h3 id="struct-parameter">ParameterStruct</h3>
  <p>描述单个搜索参数 —— 由参数类型、搜索值和可选的外部 ID 组成。</p>

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
          <td>参数类型（见下方枚举），决定 Value 的含义</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>string</td>
          <td>搜索值，如演员名 <code>"刘慈欣"</code>、流派 <code>"Sci-Fi"</code></td>
        </tr>
        <tr>
          <td>ExternalIDList</td>
          <td>list&lt;<a href="#struct-additional-info">AdditionalInfoStruct</a>&gt;</td>
          <td>可选。外部平台的 ID 列表（如 IMDB ID、豆瓣 ID），帮助设备精确匹配内容</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- AdditionalInfoStruct -->
  <h3 id="struct-additional-info">AdditionalInfoStruct</h3>
  <p>描述一个外部标识符的键值对，用于跨平台内容匹配。</p>

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
          <td>标识符名称，如 <code>"IMDB"</code>、<code>"Douban"</code>、<code>"TMDB"</code></td>
        </tr>
        <tr>
          <td>Value</td>
          <td>string</td>
          <td>标识符的值，如 <code>"tt1234567"</code>（IMDB 编号）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- BrandingInformationStruct -->
  <h3 id="struct-branding">BrandingInformationStruct</h3>
  <p>
    描述内容提供商的品牌展示信息，用于 LaunchURL 命令。设备在加载内容时可以显示提供商的品牌元素。
    除 ProviderName 外，其他字段都是可选的 StyleInformationStruct（包含图片 URL、颜色、尺寸等样式信息）。
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
          <td>内容提供商名称，如 <code>"Netflix"</code>、<code>"YouTube"</code></td>
        </tr>
        <tr>
          <td>Background</td>
          <td>StyleInformationStruct</td>
          <td>可选。背景样式信息（图片 URL、颜色）</td>
        </tr>
        <tr>
          <td>Logo</td>
          <td>StyleInformationStruct</td>
          <td>可选。Logo 样式信息</td>
        </tr>
        <tr>
          <td>ProgressBar</td>
          <td>StyleInformationStruct</td>
          <td>可选。进度条样式信息</td>
        </tr>
        <tr>
          <td>Splash</td>
          <td>StyleInformationStruct</td>
          <td>可选。启动画面样式信息</td>
        </tr>
        <tr>
          <td>WaterMark</td>
          <td>StyleInformationStruct</td>
          <td>可选。水印样式信息</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- PlaybackPreferencesStruct -->
  <h3 id="struct-playback-prefs">PlaybackPreferencesStruct</h3>
  <p>
    描述播放偏好设置，包括起始播放位置、字幕和音轨选择。此结构体仅在启用 <strong>AP（AdvancedSeek）</strong> 特性时可用。
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
          <td>起始播放位置，单位毫秒。<code>0</code> 表示从头开始</td>
        </tr>
        <tr>
          <td>TextTrack</td>
          <td>TrackPreferenceStruct</td>
          <td>字幕轨道偏好（语言、特征）</td>
        </tr>
        <tr>
          <td>AudioTracks</td>
          <td>list&lt;TrackPreferenceStruct&gt;</td>
          <td>可选。音轨偏好列表，按优先级排列</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">TrackPreferenceStruct</div>
    <p>
      轨道偏好结构体包含：<code>LanguageCode</code>（BCP-47 语言代码，如 <code>"zh-CN"</code>）、
      可选的 <code>Characteristics</code>（轨道特征列表，如字幕、解说、配音等）和
      可选的 <code>AudioOutputIndex</code>（指定音频输出端口索引）。
    </p>
  </div>

  <!-- ====== 枚举与位图 ====== -->
  <h2 id="enums">Enums & Bitmaps</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>LauncherResponse 中的状态码，表示内容启动的结果。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">成功 —— 内容已启动或搜索结果已展示</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">URLNotAvailable</span>
        <span class="enum-desc">URL 不可用 —— 链接无法访问、格式不支持或已过期</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">AuthFailed</span>
        <span class="enum-desc">认证失败 —— 内容需要登录或权限不足</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">TextTrackNotAvailable</span>
        <span class="enum-desc">字幕不可用 —— 请求的字幕语言或类型不存在</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">AudioTrackNotAvailable</span>
        <span class="enum-desc">音轨不可用 —— 请求的音轨语言或类型不存在</span>
      </div>
    </div>
  </div>

  <!-- ParameterEnum -->
  <h3 id="enum-parameter">ParameterEnum</h3>
  <p>
    定义搜索参数的类型。控制端通过不同的 Type 值指定搜索维度，
    设备据此在内容库中匹配。共 14 个枚举值。
  </p>

  <div class="enum-cards enum-cards-grid">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Actor</span>
        <span class="enum-desc">演员 —— 按演员名搜索</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">Channel</span>
        <span class="enum-desc">频道 —— 按频道名称或编号</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">Character</span>
        <span class="enum-desc">角色 —— 按角色名搜索</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">Director</span>
        <span class="enum-desc">导演 —— 按导演名搜索</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Event</span>
        <span class="enum-desc">事件 —— 按体育赛事或直播事件</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Franchise</span>
        <span class="enum-desc">系列 —— 按内容系列或 IP</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">6</span>
      <div>
        <span class="enum-name">Genre</span>
        <span class="enum-desc">流派 —— 按类型标签（科幻、动作等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">7</span>
      <div>
        <span class="enum-name">League</span>
        <span class="enum-desc">联赛 —— 按体育联赛</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">8</span>
      <div>
        <span class="enum-name">Popularity</span>
        <span class="enum-desc">热度 —— 按流行度排序</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">9</span>
      <div>
        <span class="enum-name">Provider</span>
        <span class="enum-desc">提供商 —— 按内容提供方</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">10</span>
      <div>
        <span class="enum-name">Sport</span>
        <span class="enum-desc">运动 —— 按运动类型</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">11</span>
      <div>
        <span class="enum-name">SportsTeam</span>
        <span class="enum-desc">球队 —— 按运动队名</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">12</span>
      <div>
        <span class="enum-name">Type</span>
        <span class="enum-desc">类型 —— 内容类型（Movie / TV / Music 等）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">13</span>
      <div>
        <span class="enum-name">Video</span>
        <span class="enum-desc">视频 —— 按视频标题直接搜索</span>
      </div>
    </div>
  </div>

  <!-- SupportedProtocolsBitmap -->
  <h3 id="bitmap-protocols">SupportedProtocolsBitmap</h3>
  <p>设备支持的流媒体协议位图。控制端据此选择合适的流地址格式。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">DASH</span>
        <span class="enum-desc">Dynamic Adaptive Streaming over HTTP —— 对应 <code>.mpd</code> 清单</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">HLS</span>
        <span class="enum-desc">HTTP Live Streaming —— 对应 <code>.m3u8</code> 清单</span>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">协议选择</div>
    <p>
      如果设备同时支持 DASH 和 HLS（值 = <code>3</code>，即 <code>0b11</code>），
      控制端可根据内容源的可用格式灵活选择。一般来说，Apple 生态优先用 HLS，跨平台场景优先用 DASH。
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>ContentLauncher Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">CS（ContentSearch）</span>
        <span class="enum-desc">内容搜索 —— 启用后支持 LaunchContent 命令，通过搜索条件查找并启动内容</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 1</span>
      <div>
        <span class="enum-name">UP（URLPlayback）</span>
        <span class="enum-desc">URL 播放 —— 启用后支持 LaunchURL 命令和 AcceptHeader / SupportedStreamingProtocols 属性</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">Bit 2</span>
      <div>
        <span class="enum-name">AP（AdvancedSeek）</span>
        <span class="enum-desc">高级定位 —— 启用后 LaunchContent 可携带 PlaybackPreferences（播放位置、字幕、音轨偏好）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">至少启用一个</div>
    <p>
      设备至少应启用 <strong>CS</strong> 或 <strong>UP</strong> 中的一个。如果两个都不启用，
      ContentLauncher Cluster 没有可用的命令，声明这个 Cluster 就没有意义。
      AP 特性是对 CS 的增强，必须在 CS 启用的基础上才有效。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台支持 DASH 和 HLS 的智能电视的 ContentLauncher Cluster 属性读取结果：</p>

  <pre><code>{
  // --- 支持的内容类型 ---
  "0x0000": [                        // AcceptHeader
    "video/mp4",
    "video/webm",
    "audio/aac",
    "application/dash+xml",
    "application/x-mpegURL"
  ],

  // --- 支持的流媒体协议 ---
  "0x0001": 3                         // SupportedStreamingProtocols
                                      // = 0b11 (DASH + HLS)
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      发送 LaunchURL 前，应先检查 <code>AcceptHeader (0x0000)</code> 确认设备支持目标内容的 MIME 类型，
      再检查 <code>SupportedStreamingProtocols (0x0001)</code> 确认设备支持的流协议。
      如果目标格式不在支持范围内，应提前提示用户，避免收到 <code>URLNotAvailable</code> 错误。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：语音助手「播放 XXX」</summary>
    <div class="scenario-content">
      <ol>
        <li>用户对语音助手说「在电视上播放三体」</li>
        <li>检查设备 <code>FeatureMap (0xFFFC)</code>，确认支持 <strong>CS</strong> 特性</li>
        <li>构造 <a href="#struct-content-search">ContentSearchStruct</a>：Type=Video(13)，Value="三体"</li>
        <li>发送 <code>LaunchContent (0x00)</code>，AutoPlay=true</li>
        <li>设备在已安装的流媒体应用中搜索匹配内容，找到后自动开始播放</li>
        <li>检查 <a href="#cmd-0x02">LauncherResponse</a> 的 Status：
          <ul>
            <li><code>0</code>（Success）—— 播放已开始</li>
            <li><code>2</code>（AuthFailed）—— 内容需要付费或登录，提示用户</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：手机视频投屏到电视</summary>
    <div class="scenario-content">
      <ol>
        <li>用户在手机 App 中观看视频，点击「投屏」按钮</li>
        <li>检查设备 <code>FeatureMap (0xFFFC)</code>，确认支持 <strong>UP</strong> 特性</li>
        <li>读取 <code>AcceptHeader (0x0000)</code>，确认电视支持 <code>video/mp4</code> 或 <code>application/x-mpegURL</code></li>
        <li>读取 <code>SupportedStreamingProtocols (0x0001)</code>，选择合适的流地址（如 HLS 的 .m3u8）</li>
        <li>发送 <code>LaunchURL (0x01)</code>，附带视频 URL、标题和品牌信息</li>
        <li>电视开始播放，屏幕上展示品牌 Logo 和视频标题</li>
        <li>检查 <a href="#cmd-0x02">LauncherResponse</a>：
          <ul>
            <li><code>0</code>（Success）—— 投屏成功</li>
            <li><code>1</code>（URLNotAvailable）—— URL 不可用，可能是地域限制或格式不兼容</li>
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
    description: 'Matter TargetNavigator Cluster(0x0505)完整参考 — NavigateTarget 导航命令、TargetList 目标列表、CurrentTarget 当前目标、TargetInfoStruct 结构体、StatusEnum 状态枚举及常见场景说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>TargetNavigator Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0505</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒等）
  </p>
  <p>
    TargetNavigator 负责在设备的内容目标之间进行导航 —— 这些目标可以是应用、屏幕页面、菜单项等。
    用户可以通过它查询设备有哪些可导航的目标、当前处于哪个目标，并跳转到指定目标。
    它是智能电视和机顶盒等媒体设备中用于应用切换和界面导航的核心 Cluster。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 MediaInput 的区别</div>
    <p>
      <a href="/clusters/media-input/">MediaInput（0x0507）</a>管理的是物理/虚拟输入源（如 HDMI 1、USB），
      而 TargetNavigator 管理的是软件层面的内容目标（如 Netflix、YouTube、设置页面）。
      一台智能电视可能同时拥有两个 Cluster：MediaInput 切换输入接口，TargetNavigator 切换应用。
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
    TargetNavigator Cluster 只有 1 个命令和 1 个响应。
    NavigateTarget 用于跳转到指定目标，设备返回 NavigateTargetResponse 告知导航结果。
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
          <td>导航到指定目标</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>NavigateTargetResponse</td>
          <td>Server &rarr; Client</td>
          <td>导航结果响应</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">NavigateTarget —— 导航到目标(0x00)</h3>
  <p>
    请求设备跳转到指定的目标。<code>Target</code> 必须是 <code>TargetList</code> 中某个
    <code>TargetInfoStruct</code> 的 <code>Identifier</code> 值。
    可选的 <code>Data</code> 字段可以传递额外的导航参数（如深度链接路径）。
    设备收到命令后会返回 <a href="#cmd-0x01">NavigateTargetResponse</a> 告知结果。
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
          <td>目标的标识符，必须存在于 <code>TargetList</code> 中</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>传递给目标的应用自定义数据，如深度链接 URL、启动参数等</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// NavigateTarget 命令示例
// 导航到 Identifier=1 的目标（Netflix），附带启动参数
{
  "Target": 1,
  "Data": "movie/12345"
}

// NavigateTargetResponse 响应
{
  "Status": 0,                   // Success
  "Data": "launched"
}</code></pre>

  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在手机 App 上选择打开电视上的 Netflix。App 读取 <code>TargetList</code> 找到 Netflix 对应的 Identifier，
        发送 <code>NavigateTarget</code> 命令，并在 Data 字段传入要播放的影片 ID。
        电视启动 Netflix 并直接跳转到对应影片页面。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">NavigateTargetResponse —— 导航结果响应(0x01)</h3>
  <p>
    设备对 NavigateTarget 命令的响应。通过 <code>Status</code> 字段告知导航是否成功，
    可选的 <code>Data</code> 字段可以携带设备返回的额外信息。
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
          <td>导航结果状态（见下方枚举）</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>string</td>
          <td>No</td>
          <td>设备返回的附加信息，内容由应用自定义</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>TargetNavigator Cluster 共有 2 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备所有可导航目标的列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentTarget</td>
          <td>uint8</td>
          <td>当前所在目标的标识符</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-target">目标状态(0x0000, 0x0001)</h3>
  <p>描述设备当前可导航的目标列表和当前所在的目标。</p>

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
          <td>TargetList（目标列表）</td>
          <td>list&lt;<a href="#struct-target-info">TargetInfoStruct</a>&gt;</td>
          <td>设备声明的全部可导航目标，每个元素是一个 <a href="#struct-target-info">TargetInfoStruct</a>。列表内容反映设备上已安装的应用、可访问的页面或菜单项。每个 Identifier 值唯一。列表可能随设备安装或卸载应用而变化</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentTarget（当前目标）</td>
          <td>uint8</td>
          <td>当前所在目标的标识符。该值指向 <code>TargetList</code> 中某个 <code>TargetInfoStruct.Identifier</code>。值为 <code>0xFF</code> 时表示当前没有处于任何已知目标上。通过 <code>NavigateTarget</code> 命令或用户在设备上手动切换时改变</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Subscribe to Changes</div>
    <p>
      控制端应订阅 <code>CurrentTarget</code> 属性的变化，以便在用户通过遥控器或设备界面手动切换应用时同步 App 界面上的高亮状态。
      同时也应订阅 <code>TargetList</code>，以便在设备安装或卸载应用后及时更新可用目标列表。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>TargetNavigator Cluster 使用一个结构体来描述导航目标信息。</p>

  <!-- TargetInfoStruct -->
  <h3 id="struct-target-info">TargetInfoStruct</h3>
  <p>描述一个导航目标的基本信息，包括唯一标识和显示名称。</p>

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
          <td>目标的唯一标识符，在 <code>TargetList</code> 内唯一。用于 <code>NavigateTarget</code> 命令定位目标</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>string</td>
          <td>目标的显示名称，如 <code>"Netflix"</code>、<code>"Settings"</code>。供 UI 展示给用户</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">与 MediaInput.InputInfoStruct 的对比</div>
    <p>
      TargetInfoStruct 比 <a href="/clusters/media-input/#struct-input-info">InputInfoStruct</a> 更简洁 ——
      只有 Identifier 和 Name 两个字段，没有类型枚举和描述字段。
      这是因为导航目标的性质由应用自身决定，不像物理输入接口那样有固定的分类（HDMI、USB 等）。
    </p>
  </div>

  <!-- ====== Enum Definitions ====== -->
  <h2 id="enums">Enum Definitions</h2>

  <h3 id="enum-status">StatusEnum</h3>
  <p>NavigateTargetResponse 中 Status 字段的枚举值，表示导航操作的结果。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">导航成功 —— 设备已成功切换到目标</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">TargetNotFound</span>
        <span class="enum-desc">目标未找到 —— 指定的 Target 标识符不存在于 TargetList 中</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">NotAllowed</span>
        <span class="enum-desc">不允许导航 —— 设备当前状态不允许切换到该目标（如家长控制限制）</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台智能电视的 TargetNavigator Cluster 读取结果 —— 当前在设置页面，共有 4 个可导航目标：</p>

  <pre><code>{
  // --- 当前目标 ---
  "0x0001": 2,                   // CurrentTarget = 2（当前在"设置"页面）

  // --- 目标列表 ---
  "0x0000": [                    // TargetList
    {
      "Identifier": 0,
      "Name": "Home"              // 主屏幕
    },
    {
      "Identifier": 1,
      "Name": "Netflix"           // Netflix 应用
    },
    {
      "Identifier": 2,
      "Name": "Settings"          // 系统设置
    },
    {
      "Identifier": 3,
      "Name": "YouTube"           // YouTube 应用
    }
  ]
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      控制端展示目标列表 UI 时，应先读取 <code>TargetList (0x0000)</code> 获取完整列表，
      再读取 <code>CurrentTarget (0x0001)</code> 高亮当前所在目标。
      由于 TargetInfoStruct 没有类型枚举，如果需要为不同目标显示图标，
      可能需要通过 Name 字段匹配已知的应用名称（如"Netflix""YouTube"）来选择图标。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：App 远程启动电视上的流媒体应用</summary>
    <div class="scenario-content">
      <ol>
        <li>读取 <code>TargetList (0x0000)</code>，获取电视上所有可导航目标（Identifier、Name）</li>
        <li>读取 <code>CurrentTarget (0x0001)</code>，高亮当前所在目标</li>
        <li>在 App UI 上展示目标列表，用户点击"Netflix"</li>
        <li>发送 <code>NavigateTarget (0x00)</code>，Target 设为 Netflix 的 Identifier 值，Data 可传入要播放内容的深度链接</li>
        <li>检查 <code>NavigateTargetResponse</code> 的 Status：
          <ul>
            <li><code>Success (0)</code> —— 导航成功，订阅 <code>CurrentTarget</code> 确认更新后刷新 UI</li>
            <li><code>TargetNotFound (1)</code> —— 目标已不存在（可能应用被卸载），刷新 TargetList</li>
            <li><code>NotAllowed (2)</code> —— 被限制访问，提示用户可能受家长控制等策略限制</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：自动化场景 —— 语音指令切换应用</summary>
    <div class="scenario-content">
      <ol>
        <li>用户对语音助手说"打开 YouTube"</li>
        <li>语音助手读取 <code>TargetList (0x0000)</code>，在列表中按 Name 匹配"YouTube"</li>
        <li>找到匹配项后，发送 <code>NavigateTarget (0x00)</code>，Target 设为对应 Identifier</li>
        <li>如果 TargetList 中没有匹配的名称，语音助手回复"该应用不在可用列表中"</li>
        <li>如果返回 <code>NotAllowed</code>，语音助手提示"当前无法打开该应用，可能受到使用限制"</li>
      </ol>
      <p>
        <strong>注意</strong>：Name 字段的匹配需要考虑大小写和本地化差异。
        设备厂商可能使用不同的名称格式（如"YouTube"vs"youtube"vs"YouTube TV"），
        语音助手的匹配逻辑应做模糊匹配或规范化处理。
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
    description: 'Matter ApplicationBasic Cluster(0x050D)完整参考 — 内容应用基本信息、ApplicationStruct 结构体、ApplicationStatusEnum 运行状态枚举、AllowedVendorList 访问控制等全部属性定义及速查。',
    prev: { title: 'MediaPlayback', slug: 'media-playback' },
    next: undefined,
    content: `<h1>ApplicationBasic Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050D</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 应用端点（每个内容应用占用一个独立的 Endpoint）
  </p>
  <p>
    ApplicationBasic 提供内容应用（Content App）的基本信息 —— 包括应用名称、开发商、版本号、运行状态和唯一标识。
    它是 Matter 媒体/电视设备生态中的核心 Cluster，每个安装在电视或机顶盒上的内容应用都通过一个独立的 Endpoint 暴露这个 Cluster。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">每个应用 = 一个 Endpoint</div>
    <p>
      Matter 的媒体架构采用<strong>「每个应用一个 Endpoint」</strong>的模型。
      例如一台智能电视上装了 3 个流媒体应用（视频、音乐、直播），设备就会在 Endpoint 3、4、5 上分别暴露各自的 ApplicationBasic Cluster。
      Controller 通过枚举 Endpoint 来发现设备上安装了哪些应用，再读取每个 Endpoint 的 ApplicationBasic 获取应用详情。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#structs-enums">结构体与枚举</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 属性总览 ====== -->
  <h2 id="attributes">Attribute Overview</h2>
  <p>ApplicationBasic 共有 8 个属性，按功能分为四组。点击属性 ID 可跳转到对应的详细说明。</p>

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
        <!-- 厂商信息 -->
        <tr class="clickable-row" data-href="#attr-0x0000">
          <td><a href="#attr-0x0000"><code>0x0000</code></a></td>
          <td>VendorName</td>
          <td>string</td>
          <td><a href="#group-vendor">厂商信息</a></td>
          <td>应用开发商名称</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>VendorID</td>
          <td>vendor-id</td>
          <td><a href="#group-vendor">厂商信息</a></td>
          <td>应用开发商 ID（CSA 分配）</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0002">
          <td><a href="#attr-0x0002"><code>0x0002</code></a></td>
          <td>ApplicationName</td>
          <td>string</td>
          <td><a href="#group-vendor">厂商信息</a></td>
          <td>应用名称</td>
        </tr>
        <!-- 产品标识 -->
        <tr class="clickable-row" data-href="#attr-0x0003">
          <td><a href="#attr-0x0003"><code>0x0003</code></a></td>
          <td>ProductID</td>
          <td>uint16</td>
          <td><a href="#group-product">产品标识</a></td>
          <td>应用产品 ID</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0004">
          <td><a href="#attr-0x0004"><code>0x0004</code></a></td>
          <td>Application</td>
          <td>ApplicationStruct</td>
          <td><a href="#group-product">产品标识</a></td>
          <td>应用唯一标识（目录 + ID）</td>
        </tr>
        <!-- 运行状态 -->
        <tr class="clickable-row" data-href="#attr-0x0005">
          <td><a href="#attr-0x0005"><code>0x0005</code></a></td>
          <td>Status</td>
          <td>ApplicationStatusEnum</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>应用当前运行状态</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0006">
          <td><a href="#attr-0x0006"><code>0x0006</code></a></td>
          <td>ApplicationVersion</td>
          <td>string</td>
          <td><a href="#group-status">运行状态</a></td>
          <td>应用版本号</td>
        </tr>
        <!-- 访问控制 -->
        <tr class="clickable-row" data-href="#attr-0x0007">
          <td><a href="#attr-0x0007"><code>0x0007</code></a></td>
          <td>AllowedVendorList</td>
          <td>list&lt;vendor-id&gt;</td>
          <td><a href="#group-acl">访问控制</a></td>
          <td>允许访问此应用的厂商 ID 列表</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 厂商信息（0x0000-0x0002）====== -->
  <h3 id="group-vendor">厂商信息(0x0000 – 0x0002)</h3>
  <p>描述应用的开发商和名称。这些属性在应用安装后就已确定，运行时不可更改。</p>

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
          <td>VendorName（开发商名称）</td>
          <td>string</td>
          <td>应用开发商的人类可读名称，最长 32 字符。如 <code>"Netflix"</code>、<code>"YouTube"</code>。可选属性</td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>VendorID（开发商 ID）</td>
          <td>vendor-id</td>
          <td>应用开发商的 CSA 厂商编号。如果应用开发商未向 CSA 注册，此值为 <code>0</code>。可选属性</td>
        </tr>
        <tr id="attr-0x0002">
          <td><code>0x0002</code></td>
          <td>ApplicationName（应用名称）</td>
          <td>string</td>
          <td>应用的人类可读名称，最长 32 字符。如 <code>"Netflix"</code>、<code>"Spotify"</code>。<strong>必选属性</strong>，也是 ApplicationBasic 中唯一的必选属性</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 产品标识（0x0003-0x0004）====== -->
  <h3 id="group-product">产品标识(0x0003 – 0x0004)</h3>
  <p>
    应用的产品编号和全局唯一标识。<code>Application</code> 属性是最重要的标识 —— 它通过目录体系唯一定位一个应用。
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
          <td>ProductID（产品 ID）</td>
          <td>uint16</td>
          <td>应用开发商自行分配的产品编号。与 VendorID 组合可标识一款特定应用产品。可选属性</td>
        </tr>
        <tr id="attr-0x0004">
          <td><code>0x0004</code></td>
          <td>Application（应用标识）</td>
          <td>ApplicationStruct</td>
          <td>应用的全局唯一标识，由目录厂商 ID 和应用 ID 两个字段组成（见下方 <a href="#struct-application">ApplicationStruct</a>）。可选属性</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">Application 与 VendorID + ProductID 的区别</div>
    <p>
      <code>VendorID + ProductID</code> 标识的是「谁开发的哪款产品」，是厂商维度的标识。
      <code>Application</code>（ApplicationStruct）标识的是「在哪个应用目录中的哪个应用」，是平台维度的标识。
      例如同一个视频应用，在 CSA 目录中的 ID 是 <code>"com.example.video"</code>，在另一个平台目录中可能有不同的 ID。
      Controller 通常用 <code>Application</code> 来定位和启动特定的内容应用。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 运行状态（0x0005-0x0006）====== -->
  <h3 id="group-status">运行状态(0x0005 – 0x0006)</h3>
  <p>描述应用的当前运行状态和版本信息。</p>

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
          <td>Status（运行状态）</td>
          <td>ApplicationStatusEnum</td>
          <td>应用当前的运行状态（见下方 <a href="#enum-status">ApplicationStatusEnum</a>）。可选属性</td>
        </tr>
        <tr id="attr-0x0006">
          <td><code>0x0006</code></td>
          <td>ApplicationVersion（应用版本）</td>
          <td>string</td>
          <td>应用的版本字符串，最长 32 字符。如 <code>"2.1.0"</code>、<code>"3.0.0-beta"</code>。<strong>必选属性</strong></td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 访问控制（0x0007）====== -->
  <h3 id="group-acl">访问控制(0x0007)</h3>
  <p>控制哪些厂商的 Controller 可以访问此应用的 Cluster。</p>

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
          <td>AllowedVendorList（允许的厂商列表）</td>
          <td>list&lt;vendor-id&gt;</td>
          <td>
            允许访问此内容应用的厂商 ID 列表。
            只有列表中的厂商所生产的 Controller 才能与此应用的 Cluster 交互。
            <strong>必选属性</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">AllowedVendorList 与 ACL 的关系</div>
    <p>
      <code>AllowedVendorList</code> 是在标准 ACL（Access Control List）之上的<strong>额外</strong>访问控制层。
      即使 Controller 通过了 ACL 检查，如果它的 VendorID 不在 AllowedVendorList 中，
      仍然无法访问这个应用 Endpoint 上的 Cluster（ApplicationBasic 本身除外）。
      这个机制允许内容提供商限制只有合作方的设备才能控制自己的应用。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体与枚举 ====== -->
  <h2 id="structs-enums">结构体与枚举</h2>

  <!-- ApplicationStruct -->
  <h3 id="struct-application">ApplicationStruct(应用标识结构体)</h3>
  <p>
    通过目录体系唯一标识一个内容应用。不同的应用目录（如 CSA、Google Play、Apple App Store）
    各自有独立的编号体系，<code>CatalogVendorID</code> 指明使用哪个目录，<code>ApplicationID</code> 是该目录内的应用标识。
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
          <td>应用目录的厂商 ID。标识应用来源于哪个应用目录/平台。例如 CSA 自己的目录、或某个 OTT 平台的目录</td>
        </tr>
        <tr>
          <td>ApplicationID</td>
          <td>string</td>
          <td>在目录内唯一标识应用的字符串。格式由目录定义，通常是反向域名风格，如 <code>"com.netflix.app"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">CatalogVendorID 的含义</div>
    <p>
      <code>CatalogVendorID</code> 不是应用开发商的 VendorID，而是<strong>应用目录提供商</strong>的 VendorID。
      可以理解为：这个应用是在哪个「应用商店」上架的。
      如果 CatalogVendorID 对应 CSA 官方目录（值为 <code>0x60AE</code> = 24750），
      那么 ApplicationID 就是 CSA 目录体系下的应用标识。
    </p>
  </div>

  <!-- ApplicationStatusEnum -->
  <h3 id="enum-status">ApplicationStatusEnum(应用运行状态枚举)</h3>
  <p>描述内容应用当前的运行和可见状态。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Stopped</span>
        <span class="enum-desc">已停止 —— 应用未运行，需要先启动才能使用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">ActiveVisibleFocus</span>
        <span class="enum-desc">前台运行 —— 应用正在运行、可见，且拥有用户输入焦点（当前正在使用的应用）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">ActiveHidden</span>
        <span class="enum-desc">后台运行 —— 应用正在运行但不可见（如后台播放音乐）</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">ActiveVisibleNotFocus</span>
        <span class="enum-desc">可见但无焦点 —— 应用正在运行且可见，但用户焦点在其他应用上（如画中画模式）</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">状态转换场景</div>
    <p>
      典型的状态变化路径：用户打开应用时 <code>Stopped &rarr; ActiveVisibleFocus</code>；
      切换到另一个应用时 <code>ActiveVisibleFocus &rarr; ActiveHidden</code>（完全隐藏）或
      <code>ActiveVisibleFocus &rarr; ActiveVisibleNotFocus</code>（画中画）；
      用户关闭应用时回到 <code>Stopped</code>。
      Controller 可以订阅 Status 属性变化来追踪应用的生命周期。
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    ApplicationBasic 没有定义任何命令。应用的启动和控制由其他 Cluster 负责：
  </p>
  <ul>
    <li><strong>ApplicationLauncher</strong>（0x050C）—— 负责启动、停止和隐藏应用</li>
    <li><strong>MediaPlayback</strong>（0x0506）—— 负责播放控制（播放、暂停、快进等）</li>
    <li><strong>ContentLauncher</strong>（0x050A）—— 负责启动特定内容（如打开某个视频）</li>
  </ul>
  <p>
    ApplicationBasic 的定位是<strong>Read-only的信息查询</strong> —— 它告诉 Controller「这个应用是什么」，
    而不负责「对这个应用做什么」。
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台智能电视上某个流媒体应用（Endpoint 3）的 ApplicationBasic Cluster 读取结果：</p>

  <pre><code>{
  // --- 厂商信息 ---
  "0x0000": "StreamCo",            // VendorName = 应用开发商名称
  "0x0001": 4996,                  // VendorID = 0x1384（CSA 分配）
  "0x0002": "StreamCo Player",     // ApplicationName = 应用名称

  // --- 产品标识 ---
  "0x0003": 101,                   // ProductID = 应用产品 ID
  "0x0004": {                      // Application（应用标识结构体）
    "CatalogVendorID": 24742,      //   CatalogVendorID = CSA 目录
    "ApplicationID": "com.streamco.player"  //   ApplicationID = 应用 ID
  },

  // --- 运行状态 ---
  "0x0005": 1,                     // Status = ActiveVisibleFocus（前台可见且有焦点）
  "0x0006": "2.1.0",               // ApplicationVersion = 应用版本号

  // --- 访问控制 ---
  "0x0007": [4996, 65521]          // AllowedVendorList = 允许访问此应用的厂商 ID 列表
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">读取应用信息的典型流程</div>
    <p>
      Controller 发现设备上安装了哪些应用的常规流程：
    </p>
    <ol>
      <li>读取 Endpoint 0 的 <code>Descriptor Cluster (0x001D)</code> 的 <code>PartsList</code> 获取所有 Endpoint 编号</li>
      <li>对每个 Endpoint，读取其 Descriptor 的 <code>ServerList</code>，检查是否包含 <code>0x050D</code>（ApplicationBasic）</li>
      <li>找到后，读取该 Endpoint 的 <code>ApplicationName (0x0002)</code> 和 <code>Application (0x0004)</code> 获取应用名和标识</li>
      <li>读取 <code>Status (0x0005)</code> 判断应用当前是否在运行</li>
    </ol>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：发现并展示电视上的所有内容应用</summary>
    <div class="scenario-content">
      <p>
        手机 App 连接到一台智能电视后，需要在界面上列出电视上安装的所有内容应用（类似电视遥控器的应用列表）。
      </p>
      <ol>
        <li>读取 Endpoint 0 的 Descriptor Cluster，获取 <code>PartsList</code>（所有子 Endpoint）</li>
        <li>逐个检查每个 Endpoint 的 <code>ServerList</code>，过滤出包含 <code>0x050D</code> 的 Endpoint</li>
        <li>对每个应用 Endpoint，批量读取 <code>ApplicationName</code>、<code>VendorName</code>、<code>ApplicationVersion</code>、<code>Status</code></li>
        <li>在 App 界面上渲染应用列表，显示名称、版本和运行状态（如「运行中」或「已停止」）</li>
      </ol>
      <p>
        <strong>注意</strong>：不是所有 Endpoint 都是内容应用，有些可能是灯、传感器等其他设备类型。
        通过检查 Descriptor 的 <code>DeviceTypeList</code> 是否包含 Content App（0x0024）可以更精确地过滤。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：通过应用标识定位并启动特定应用</summary>
    <div class="scenario-content">
      <p>
        用户说「打开 Netflix」，Controller 需要找到 Netflix 对应的 Endpoint 并启动它。
      </p>
      <ol>
        <li>遍历所有应用 Endpoint，读取每个 Endpoint 的 <code>Application (0x0004)</code> 属性</li>
        <li>比对 <code>ApplicationStruct</code> 中的 <code>CatalogVendorID</code> 和 <code>ApplicationID</code>，找到目标应用</li>
        <li>检查 <code>Status (0x0005)</code>：如果已经是 <code>ActiveVisibleFocus (1)</code>，无需操作</li>
        <li>如果是 <code>Stopped (0)</code> 或其他状态，通过 <strong>ApplicationLauncher Cluster (0x050C)</strong> 发送 LaunchApp 命令启动应用</li>
        <li>订阅 <code>Status</code> 属性变化，确认应用成功进入 <code>ActiveVisibleFocus</code> 状态</li>
      </ol>
      <p>
        <strong>注意</strong>：启动应用不是 ApplicationBasic 的职责 —— 它只提供信息查询。
        实际启动操作由同一 Endpoint 上的 ApplicationLauncher Cluster 完成。
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
    description: 'Matter ApplicationLauncher Cluster(0x050C)完整参考 — LaunchApp 启动应用、StopApp 停止应用、HideApp 隐藏应用、LauncherResponse 响应、CatalogList 目录列表、CurrentApp 当前应用、ApplicationEPStruct / ApplicationStruct 结构体、StatusEnum 状态码及 Feature 位图说明。',
    prev: { title: 'Cluster Reference', slug: 'clusters' },
    next: undefined,
    content: `<h1>ApplicationLauncher Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050C</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（智能电视、机顶盒、流媒体设备等）
  </p>
  <p>
    ApplicationLauncher 负责在媒体设备上启动、停止和隐藏内容应用 ——
    是语音助手「打开 Netflix」「关闭当前应用」等指令的底层实现。
    它管理的是应用的生命周期（启动/停止/隐藏），而不是应用内的内容播放。
    通常部署在智能电视或机顶盒的媒体端点上，与
    <a href="/clusters/application-basic/">ApplicationBasic</a>（应用信息查询）配合使用。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">与 ApplicationBasic 的分工</div>
    <p>
      <a href="/clusters/application-basic/">ApplicationBasic</a>（0x050D）负责<strong>Read-only的信息查询</strong> —— 告诉 Controller「这个应用是什么、当前什么状态」。
      ApplicationLauncher（0x050C）负责<strong>操作</strong> —— 启动、停止、隐藏应用。
      两者通常部署在同一个 Endpoint 上：先通过 ApplicationBasic 获取应用信息，再通过 ApplicationLauncher 控制应用生命周期。
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
    <a href="#enums">枚举</a>
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
    ApplicationLauncher Cluster 有 3 个请求命令和 1 个响应命令。
    LaunchApp 启动应用，StopApp 停止应用，HideApp 隐藏应用（退到后台），三者都返回 LauncherResponse 告知操作结果。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>请求</td>
          <td>启动指定应用</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>StopApp</td>
          <td>请求</td>
          <td>停止指定应用</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>HideApp</td>
          <td>请求</td>
          <td>隐藏指定应用（退到后台）</td>
          <td class="col-optional">None</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>LauncherResponse</td>
          <td>响应</td>
          <td>操作结果（三个命令共用）</td>
          <td class="col-optional">None</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">LaunchApp —— 启动应用(0x00)</h3>
  <p>
    启动设备上的指定应用。如果应用已在运行，则将其带到前台。
    通过 <a href="#struct-application">ApplicationStruct</a> 唯一标识目标应用，
    可附带应用特定数据（如 DeepLink、启动参数）。
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
          <td>要启动的应用标识。省略时表示启动当前 Endpoint 上的应用</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>octstr</td>
          <td>No</td>
          <td>应用特定的附加数据（如 DeepLink、启动参数），由应用自行解析</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LaunchApp 命令示例
// 启动 CSA 目录中的 StreamCo Player 应用
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
        用户对语音助手说「打开 Netflix」，助手查找到 Netflix 对应的 ApplicationStruct（CatalogVendorID + ApplicationID），
        发送 LaunchApp 命令。电视启动 Netflix 并切换到前台显示。
        如果附带 Data 参数（如 DeepLink），Netflix 可以直接跳转到指定页面。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">StopApp —— 停止应用(0x01)</h3>
  <p>
    停止设备上的指定应用。应用的运行状态会变为 Stopped。
    如果该应用正在播放内容，播放也会一并终止。
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
          <td>要停止的应用标识。省略时表示停止当前 Endpoint 上的应用</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// StopApp 命令示例
// 停止当前运行的 StreamCo Player 应用
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
        用户说「关闭 Netflix」，或自动化规则在晚上 11 点后自动停止所有正在运行的娱乐应用。
        StopApp 会彻底终止应用进程，释放系统资源。与 HideApp 不同，被 Stop 的应用需要重新启动才能使用。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">HideApp —— 隐藏应用(0x02)</h3>
  <p>
    将应用退到后台，但不终止其进程。应用状态变为 ActiveHidden，
    仍然可以执行后台任务（如继续播放音乐）。
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
          <td>要隐藏的应用标识。省略时表示隐藏当前 Endpoint 上的应用</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// HideApp 命令示例
// 隐藏应用（退到后台，不终止进程）
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
        用户在看视频时收到来电，系统发送 HideApp 将视频应用退到后台，显示来电界面。
        通话结束后再通过 LaunchApp 将视频应用切回前台，应用可以从中断处继续播放。
        与 StopApp 的区别：HideApp 保留应用状态，适合临时切换；StopApp 彻底关闭，适合不再使用时释放资源。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">LauncherResponse —— 操作结果(0x03)</h3>
  <p>
    LaunchApp、StopApp 和 HideApp 的统一响应。包含一个状态码和可选的附加数据。
    控制端根据 Status 判断操作是否成功，失败时 Data 中可能包含错误详情。
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
          <td>操作结果状态码（见下方枚举）</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>octstr</td>
          <td>可选的附加数据，成功时可能返回会话信息，失败时返回错误描述</td>
        </tr>
      </tbody>
    </table>
  </div>

  <pre><code>// LauncherResponse 响应示例
// 启动成功
{
  "Status": 0,
  "Data": "session-id=xyz789"
}

// 应用不可用（未安装或不在目录中）
{
  "Status": 1,
  "Data": "Application not found in catalog"
}

// 等待用户确认（如首次启动需要同意条款）
{
  "Status": 3,
  "Data": "User approval required for first launch"
}</code></pre>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>ApplicationLauncher Cluster 共有 2 个属性。点击下方汇总表中的属性 ID 可跳转到对应的详细说明。</p>

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
          <td>设备支持的应用目录厂商 ID 列表</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>CurrentApp</td>
          <td>nullable <a href="#struct-app-ep">ApplicationEPStruct</a></td>
          <td>当前前台运行的应用</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== 属性详细说明 ====== -->
  <h3 id="group-attrs">应用管理(0x0000, 0x0001)</h3>
  <p>描述设备支持的应用目录范围和当前前台应用的状态。</p>

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
          <td>CatalogList（目录列表）</td>
          <td>list&lt;uint16&gt;</td>
          <td>
            设备支持的应用目录厂商 ID（CatalogVendorID）列表。
            Controller 发送 LaunchApp 时，Application 参数中的 CatalogVendorID 必须在此列表中，否则设备无法识别该应用标识。
            <strong>需要 AP 特性</strong>
          </td>
        </tr>
        <tr id="attr-0x0001">
          <td><code>0x0001</code></td>
          <td>CurrentApp（当前应用）</td>
          <td>nullable <a href="#struct-app-ep">ApplicationEPStruct</a></td>
          <td>
            当前处于前台的应用信息，包括应用标识和所在 Endpoint。
            当没有应用在前台时为 <code>null</code>。
            <strong>需要 AP 特性</strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">CurrentApp 与 ApplicationBasic.Status 的区别</div>
    <p>
      <code>CurrentApp</code> 是从设备全局视角看「谁在前台」，而
      <a href="/clusters/application-basic/">ApplicationBasic</a> 的 <code>Status</code> 属性是每个应用各自报告自己的运行状态。
      一台电视上同时有多个应用的 Status 为 ActiveHidden（后台运行），但 CurrentApp 只指向一个前台应用（或 null）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== 结构体定义 ====== -->
  <h2 id="structs">Struct Definitions</h2>
  <p>ApplicationLauncher Cluster 使用两个结构体来标识应用。</p>

  <!-- ApplicationEPStruct -->
  <h3 id="struct-app-ep">ApplicationEPStruct(应用端点结构体)</h3>
  <p>
    描述一个应用及其在设备上对应的 Endpoint。用于 <code>CurrentApp</code> 属性，
    让 Controller 既能知道当前前台应用是什么，也能直接定位到它的 Endpoint 进行进一步交互。
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
          <td>应用的唯一标识（目录厂商 ID + 应用 ID）</td>
        </tr>
        <tr>
          <td>Endpoint</td>
          <td>endpoint-no</td>
          <td>No</td>
          <td>应用所在的 Endpoint 编号。有了这个编号，Controller 可以直接访问该 Endpoint 上的其他 Cluster（如 MediaPlayback、ContentLauncher）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ApplicationStruct -->
  <h3 id="struct-application">ApplicationStruct(应用标识结构体)</h3>
  <p>
    通过目录体系唯一标识一个内容应用。这个结构体在 LaunchApp / StopApp / HideApp 命令和 CurrentApp 属性中都会用到，
    也与 <a href="/clusters/application-basic/">ApplicationBasic</a> Cluster 的 Application（0x0004）属性共用同一结构。
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
          <td>应用目录的厂商 ID，标识应用来源于哪个目录/平台。例如 CSA 官方目录的 ID 为 <code>0x60AE</code>（24750）</td>
        </tr>
        <tr>
          <td>ApplicationID</td>
          <td>string</td>
          <td>在目录内唯一标识应用的字符串，通常是反向域名风格。如 <code>"com.netflix.app"</code>、<code>"com.youtube.tv"</code></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">CatalogVendorID 不是应用开发商</div>
    <p>
      <code>CatalogVendorID</code> 是<strong>应用目录提供商</strong>的 VendorID，不是应用开发商的 VendorID。
      可以理解为「这个应用在哪个应用商店上架的」。
      同一个应用在不同目录中可能有不同的 ApplicationID，但 CatalogVendorID + ApplicationID 的组合在全局唯一。
    </p>
  </div>

  <!-- ====== 枚举 ====== -->
  <h2 id="enums">枚举</h2>

  <!-- StatusEnum -->
  <h3 id="enum-status">StatusEnum</h3>
  <p>LauncherResponse 中的状态码，表示应用操作的结果。相比 ContentLauncher 的 StatusEnum，ApplicationLauncher 的状态码涵盖了应用安装和权限审批等场景。</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">0</span>
      <div>
        <span class="enum-name">Success</span>
        <span class="enum-desc">成功 —— 应用已启动/停止/隐藏</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">1</span>
      <div>
        <span class="enum-name">AppNotAvailable</span>
        <span class="enum-desc">应用不可用 —— 未安装、不在目录中或已下架</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">2</span>
      <div>
        <span class="enum-name">SystemBusy</span>
        <span class="enum-desc">系统繁忙 —— 设备资源不足，无法启动新应用</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">3</span>
      <div>
        <span class="enum-name">PendingUserApproval</span>
        <span class="enum-desc">等待用户确认 —— 首次启动需要用户同意条款或授权</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">4</span>
      <div>
        <span class="enum-name">Downloading</span>
        <span class="enum-desc">下载中 —— 应用正在下载，尚未安装完成</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">5</span>
      <div>
        <span class="enum-name">Installing</span>
        <span class="enum-desc">安装中 —— 应用已下载，正在安装过程中</span>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">非终态：Downloading 和 Installing</div>
    <p>
      <code>Downloading (4)</code> 和 <code>Installing (5)</code> 是中间状态 —— 收到后不代表操作失败，
      而是需要 Controller 等待一段时间后重试 LaunchApp，或订阅相关属性变化来获知安装完成的时机。
      <code>PendingUserApproval (3)</code> 同理，需要用户在设备端完成确认后才能继续。
    </p>
  </div>

  <!-- ====== Feature Bitmap ====== -->
  <h2 id="features">Feature Bitmap</h2>
  <p>ApplicationLauncher Cluster 通过 <code>FeatureMap</code>（0xFFFC）声明设备支持的能力：</p>

  <div class="enum-cards enum-cards-row">
    <div class="enum-card">
      <span class="enum-badge">Bit 0</span>
      <div>
        <span class="enum-name">AP（ApplicationPlatform）</span>
        <span class="enum-desc">应用平台 —— 设备是一个应用平台（如智能电视），支持多个可独立管理的内容应用。启用后提供 CatalogList 和 CurrentApp 属性</span>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">AP 特性的含义</div>
    <p>
      不启用 AP 特性的设备是<strong>单应用设备</strong> —— 设备本身就是一个应用，LaunchApp/StopApp/HideApp 操作的就是这个设备自身。
      启用 AP 后，设备是一个<strong>应用平台</strong>（如智能电视、机顶盒），上面安装了多个独立应用，
      每个应用有自己的 Endpoint 和 ApplicationBasic Cluster。
      AP 特性启用后才有 CatalogList（设备支持哪些应用目录）和 CurrentApp（当前前台是哪个应用）两个属性。
    </p>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>一台启用了 AP（ApplicationPlatform）特性的智能电视的 ApplicationLauncher Cluster 属性读取结果：</p>

  <pre><code>{
  // --- 支持的应用目录 ---
  "0x0000": [24742, 4996],           // CatalogList = 支持的目录厂商 ID 列表
                                      // 24742 = CSA 官方目录
                                      // 4996 = 某 OTT 平台目录

  // --- 当前前台应用 ---
  "0x0001": {                         // CurrentApp（当前应用，nullable）
    "Application": {                  //   ApplicationStruct
      "CatalogVendorID": 24742,       //     目录厂商 ID（CSA 官方）
      "ApplicationID": "com.streamco.player"  //  应用 ID
    },
    "Endpoint": 3                     //   应用所在 Endpoint 编号
  }
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      发送 LaunchApp 前，应先读取 <code>CatalogList (0x0000)</code> 确认设备支持目标应用所在的目录。
      如果 CatalogVendorID 不在列表中，LaunchApp 会返回 <code>AppNotAvailable (1)</code>。
      发送后检查 <code>CurrentApp (0x0001)</code> 的变化来确认应用是否成功切换到前台。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：语音助手「打开 XXX 应用」</summary>
    <div class="scenario-content">
      <ol>
        <li>用户对语音助手说「在电视上打开 Netflix」</li>
        <li>检查设备 <code>FeatureMap (0xFFFC)</code>，确认支持 <strong>AP</strong> 特性</li>
        <li>读取 <code>CatalogList (0x0000)</code>，确认设备支持 CSA 官方目录（24742）</li>
        <li>遍历设备的各个 Endpoint，读取 <a href="/clusters/application-basic/">ApplicationBasic</a> 的 <code>Application (0x0004)</code> 属性，找到 Netflix 对应的 ApplicationStruct</li>
        <li>发送 <code>LaunchApp (0x00)</code>，传入 Netflix 的 ApplicationStruct</li>
        <li>检查 <a href="#cmd-0x03">LauncherResponse</a> 的 Status：
          <ul>
            <li><code>0</code>（Success）—— Netflix 已启动</li>
            <li><code>1</code>（AppNotAvailable）—— Netflix 未安装，提示用户</li>
            <li><code>3</code>（PendingUserApproval）—— 首次启动需要在电视上确认</li>
          </ul>
        </li>
        <li>确认 <code>CurrentApp (0x0001)</code> 已更新为 Netflix</li>
      </ol>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：自动化场景 —— 睡眠模式关闭所有应用</summary>
    <div class="scenario-content">
      <ol>
        <li>用户设置了「睡眠模式」自动化规则：每晚 11 点自动关闭电视上的所有应用</li>
        <li>读取 <code>CurrentApp (0x0001)</code> 获取当前前台应用信息</li>
        <li>如果 CurrentApp 不为 <code>null</code>，发送 <code>StopApp (0x01)</code> 停止该应用</li>
        <li>遍历设备上所有应用 Endpoint，检查各自的 <a href="/clusters/application-basic/">ApplicationBasic</a> 的 <code>Status</code> 属性</li>
        <li>对所有 Status 不为 Stopped（0）的应用，逐个发送 <code>StopApp (0x01)</code></li>
        <li>全部停止后，可配合 <a href="/clusters/on-off/">OnOff Cluster</a> 将电视关闭或进入待机模式</li>
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
    description: 'Matter AccountLogin Cluster(0x050E)完整参考 — GetSetupPIN / Login / Logout 命令详解、内容提供商认证流程、Timed Invoke 安全要求、临时 PIN 机制及实际场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>AccountLogin Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x050E</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（流媒体设备、智能电视上的内容应用）
  </p>
  <p>
    AccountLogin 负责在<strong>智能电视或流媒体设备</strong>上完成内容提供商的账户认证。
    当用户的手机 App 已登录某个视频服务（如 Netflix、YouTube），
    想让电视上的对应内容应用也获得该账户的访问权限时，就需要通过这个 Cluster 完成认证。
    它不负责播放控制（那是 <a href="/clusters/media-playback/">MediaPlayback</a> 的事），
    而是解决「电视怎么知道你是谁」这个问题。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Core Purpose</div>
    <p>
      如果把电视上的内容应用比作一个需要门禁卡的影院，AccountLogin 就是<strong>发临时门禁卡的柜台</strong>。
      你的手机（Commissioner）拿着身份证（账户信息）去柜台领一张临时卡（Setup PIN），
      再用这张卡刷卡进入（Login）。看完电影后，交还临时卡（Logout）。
      整个过程的关键是：<strong>临时卡是一次性的</strong>，而且领卡和刷卡都必须在限定时间内完成（Timed Invoke）。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#auth-flow">认证流程</a>
    <span class="nav-sep">|</span>
    <a href="#commands">Commands</a>
    <span class="nav-sep">|</span>
    <a href="#attributes">属性说明</a>
    <span class="nav-sep">|</span>
    <a href="#security">安全机制</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== 认证流程 ====== -->
  <h2 id="auth-flow">认证流程</h2>
  <p>AccountLogin 的认证是一个<strong>三步握手</strong>流程，由手机 App（Commissioner）主导：</p>

  <ol>
    <li>
      <strong>请求 PIN</strong>：手机 App 向电视上的内容应用发送 <a href="#cmd-0x00"><code>GetSetupPIN</code></a>，
      携带一个<strong>临时账户标识</strong>（TempAccountIdentifier）。
      这个标识由手机端的内容提供商 App 生成，通常是一个关联到用户账户的临时令牌
    </li>
    <li>
      <strong>获取 PIN</strong>：电视端的内容应用验证临时标识后，
      返回一个<strong>临时 Setup PIN</strong>（最长 8 个字符）。
      这个 PIN 是一次性的，用于下一步的登录
    </li>
    <li>
      <strong>执行登录</strong>：手机 App 将临时标识和 Setup PIN 一起发送 <a href="#cmd-0x02"><code>Login</code></a> 命令，
      电视端验证通过后，该节点获得内容访问权限
    </li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">所有命令都要求 Timed Invoke</div>
    <p>
      AccountLogin 的三个命令（GetSetupPIN、Login、Logout）全部要求使用 <strong>Timed Invoke</strong>。
      这意味着每个命令在发送前必须先发起一个限时事务（Timed Request），
      设备只在事务窗口内接受命令。这是防止中间人重放攻击的关键安全措施。
    </p>
  </div>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    AccountLogin Cluster 共有 3 个命令和 1 个响应。
    其中 GetSetupPIN 有专属的响应结构体 GetSetupPINResponse，
    Login 和 Logout 通过通用 Status 返回结果。
    点击下方表格中的命令 ID 可跳转到对应的详细说明。
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
          <td>请求临时 Setup PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x01">
          <td><a href="#cmd-0x01"><code>0x01</code></a></td>
          <td>GetSetupPINResponse</td>
          <td>Server → Client</td>
          <td>返回临时 Setup PIN</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x02">
          <td><a href="#cmd-0x02"><code>0x02</code></a></td>
          <td>Login</td>
          <td>Client → Server</td>
          <td>使用临时标识 + PIN 登录</td>
        </tr>
        <tr class="clickable-row" data-href="#cmd-0x03">
          <td><a href="#cmd-0x03"><code>0x03</code></a></td>
          <td>Logout</td>
          <td>Client → Server</td>
          <td>登出当前账户</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">GetSetupPIN —— 请求 Setup PIN(0x00)</h3>
  <p>
    由手机 App（Client）发送给电视端的内容应用（Server），请求一个临时的 Setup PIN。
    内容应用收到后，会根据 <code>TempAccountIdentifier</code> 查询对应的用户账户信息，
    如果确认有效，则生成并返回一个临时 PIN。
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
          <td>手机端内容提供商 App 生成的临时账户标识。最大长度 <code>100</code> 字符。由内容提供商自行定义格式，通常是与用户账户关联的临时令牌</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-tip">
    <div class="callout-title">TempAccountIdentifier 是什么</div>
    <p>
      这个字段<strong>不是</strong>用户的用户名或密码。
      它是手机端 App 在用户已登录状态下生成的一个临时令牌（token），
      用于让电视端的内容应用识别「这个请求来自哪个已认证用户」。
      具体格式和生成方式由内容提供商（如 Netflix、Disney+）自行定义。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x01">GetSetupPINResponse —— 返回 Setup PIN(0x01)</h3>
  <p>
    电视端内容应用对 GetSetupPIN 的响应。如果临时账户标识有效，返回一个可用于 Login 的临时 PIN。
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
          <td>临时 Setup PIN，最大长度 <code>8</code> 字符。用于后续 Login 命令。PIN 是临时的，内容应用可以自行决定有效期</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-warning">
    <div class="callout-title">PIN 是临时的</div>
    <p>
      SetupPIN 应当是<strong>一次性或短时有效</strong>的。内容应用不应该返回固定不变的 PIN，
      否则存在被重放攻击利用的风险。建议在 Login 成功后立即失效该 PIN，
      或者设置一个较短的过期时间（如 2 分钟）。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x02">Login —— 登录(0x02)</h3>
  <p>
    使用前面获取的临时账户标识和 Setup PIN 完成登录。
    登录成功后，发起请求的节点获得该内容应用的访问权限，可以浏览和播放用户订阅的内容。
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
          <td>与 GetSetupPIN 相同的临时账户标识</td>
        </tr>
        <tr>
          <td>SetupPIN</td>
          <td>string</td>
          <td>GetSetupPINResponse 返回的临时 PIN</td>
        </tr>
        <tr>
          <td>Node</td>
          <td>node-id（可选）</td>
          <td>指定要授权的节点 ID。如果省略，则授权发送此命令的节点。当手机代替另一台设备请求登录时使用</td>
        </tr>
      </tbody>
    </table>
  </div>

  <details class="scenario">
    <summary>Login 失败的常见原因</summary>
    <div class="scenario-content">
      <ul>
        <li><strong>PIN 已过期</strong> —— 从 GetSetupPIN 到 Login 之间间隔太久，PIN 已失效</li>
        <li><strong>PIN 不匹配</strong> —— TempAccountIdentifier 与 SetupPIN 不对应</li>
        <li><strong>未使用 Timed Invoke</strong> —— 命令没有通过限时事务发送，设备直接拒绝</li>
        <li><strong>账户标识无效</strong> —— TempAccountIdentifier 在内容提供商侧已失效或不存在</li>
      </ul>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <h3 id="cmd-0x03">Logout —— 登出(0x03)</h3>
  <p>
    撤销之前通过 Login 获得的访问权限。登出后，对应节点将无法再访问该内容应用的用户内容。
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Node</td>
          <td>node-id（可选）</td>
          <td>指定要登出的节点 ID。如果省略，则登出发送此命令的节点</td>
        </tr>
      </tbody>
    </table>
  </div>
  <details class="scenario">
    <summary>Usage Scenarios</summary>
    <div class="scenario-content">
      <p>
        用户在手机上退出内容提供商账户、切换账户、或手动管理设备访问权限时调用。
        也可以由自动化规则触发 —— 例如当手机离开家庭网络时自动登出电视上的内容应用。
      </p>
    </div>
  </details>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性说明 ====== -->
  <h2 id="attributes">属性说明</h2>
  <p>
    AccountLogin Cluster <strong>没有应用层面的自定义属性</strong>。
    它只包含 Matter 规范要求的全局属性（Global Attributes），这些属性描述 Cluster 本身的元信息。
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
          <td>Server 能生成的响应命令列表。通常为 <code>[0x01]</code>（GetSetupPINResponse）</td>
        </tr>
        <tr>
          <td><code>0xFFF9</code></td>
          <td>AcceptedCommandList</td>
          <td>list&lt;command-id&gt;</td>
          <td>Server 能接受的命令列表。通常为 <code>[0x00, 0x02, 0x03]</code>（GetSetupPIN / Login / Logout）</td>
        </tr>
        <tr>
          <td><code>0xFFFA</code></td>
          <td>EventList</td>
          <td>list&lt;event-id&gt;</td>
          <td>此 Cluster 不定义事件，固定为空列表</td>
        </tr>
        <tr>
          <td><code>0xFFFB</code></td>
          <td>AttributeList</td>
          <td>list&lt;attrib-id&gt;</td>
          <td>本 Cluster 包含的属性 ID 列表</td>
        </tr>
        <tr>
          <td><code>0xFFFC</code></td>
          <td>FeatureMap</td>
          <td>map32</td>
          <td>当前无可选特性，值为 <code>0</code></td>
        </tr>
        <tr>
          <td><code>0xFFFD</code></td>
          <td>ClusterRevision</td>
          <td>uint16</td>
          <td>Cluster 规范版本</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="callout callout-info">
    <div class="callout-title">为什么没有应用属性</div>
    <p>
      AccountLogin 是一个<strong>纯命令驱动</strong>的 Cluster。
      它的核心功能（认证）是通过命令交互完成的，不需要持久存储状态到属性中。
      登录状态由内容应用自身管理，而非通过 Cluster 属性暴露。
      这与 AdministratorCommissioning 等「有状态」的 Cluster 形成对比。
    </p>
  </div>

  <!-- ====== 安全机制 ====== -->
  <h2 id="security">安全机制</h2>
  <p>
    AccountLogin 涉及用户账户认证，安全要求高于普通控制类 Cluster。
    Matter 规范对它施加了以下约束：
  </p>

  <h3>Timed Invoke(限时调用)</h3>
  <p>
    所有三个命令都<strong>必须</strong>使用 Timed Invoke 发送。
    Timed Invoke 的工作方式：
  </p>
  <ol>
    <li>Client 先发一个 <code>TimedRequest</code>，声明后续命令的超时时间</li>
    <li>Server 回复确认并开始计时</li>
    <li>Client 在超时窗口内发送实际命令（如 Login）</li>
    <li>超时窗口关闭后，Server 不再接受该命令</li>
  </ol>
  <p>
    这种机制的核心目的是<strong>防止重放攻击</strong>：即使攻击者截获了 Login 命令的完整数据包，
    也无法在超时窗口关闭后重新发送。
  </p>

  <h3>临时 PIN 机制</h3>
  <p>
    Setup PIN 是认证流程中的第二道防线：
  </p>
  <ul>
    <li>PIN 由电视端内容应用<strong>动态生成</strong>，不是固定密码</li>
    <li>PIN 绑定到特定的 TempAccountIdentifier，不能跨账户使用</li>
    <li>PIN 应设置有效期（规范建议尽可能短），过期后即使知道 PIN 也无法登录</li>
    <li>PIN 使用后应立即失效，防止被二次使用</li>
  </ul>

  <h3>访问权限要求</h3>
  <p>
    AccountLogin 的命令需要 <strong>Administer</strong> 级别的访问权限（Access Privilege）。
    这意味着只有在设备 ACL 中拥有管理员权限的节点才能调用这些命令，
    普通的 Operate 级别权限不够。
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>

  <h3>Cluster 属性读取</h3>
  <p>读取 AccountLogin Cluster 的全部属性（仅全局属性）：</p>
  <pre><code>{
  // --- 全局属性 ---
  "0xFFF8": [0, 1],            // GeneratedCommandList = [GetSetupPINResponse]
  "0xFFF9": [0, 2, 3],         // AcceptedCommandList = [GetSetupPIN, Login, Logout]
  "0xFFFA": [],                 // EventList = []（无事件）
  "0xFFFB": [                   // AttributeList
    0xFFF8, 0xFFF9, 0xFFFA,
    0xFFFB, 0xFFFC, 0xFFFD
  ],
  "0xFFFC": 0,                  // FeatureMap = 0（无可选特性）
  "0xFFFD": 2                   // ClusterRevision = 2
}</code></pre>

  <h3>GetSetupPIN 交互示例</h3>
  <p>手机 App 向电视内容应用请求 Setup PIN：</p>
  <pre><code>// 手机 App → 电视内容应用：请求 Setup PIN
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x00"              // GetSetupPIN
    },
    "commandFields": {
      "TempAccountIdentifier": "user_abc_token_20260901"
                                       // 手机端生成的临时账户标识
    },
    "timedRequest": true,              // 必须使用 Timed Invoke
    "interactionTimeoutMs": 10000
  }]
}

// 电视内容应用 → 手机 App：返回 Setup PIN
{
  "invokeResponseMessage": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x01"              // GetSetupPINResponse
    },
    "commandFields": {
      "SetupPIN": "34567890"           // 临时 PIN，用于后续 Login
    }
  }]
}</code></pre>

  <h3>Login 交互示例</h3>
  <p>使用获取到的 PIN 完成登录：</p>
  <pre><code>// 手机 App → 电视内容应用：使用 PIN 登录
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x02"              // Login
    },
    "commandFields": {
      "TempAccountIdentifier": "user_abc_token_20260901",
      "SetupPIN": "34567890",          // GetSetupPINResponse 返回的 PIN
      "Node": "0x0000000012345678"     // 可选：指定授权的节点 ID
    },
    "timedRequest": true,
    "interactionTimeoutMs": 10000
  }]
}

// 电视内容应用 → 手机 App：Status = SUCCESS</code></pre>

  <h3>Logout 交互示例</h3>
  <p>登出当前账户：</p>
  <pre><code>// 手机 App → 电视内容应用：登出
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 3,
      "clusterId": "0x050E",
      "commandId": "0x03"              // Logout
    },
    "commandFields": {
      "Node": "0x0000000012345678"     // 可选：指定要登出的节点 ID
    },
    "timedRequest": true,
    "interactionTimeoutMs": 10000
  }]
}

// 电视内容应用 → 手机 App：Status = SUCCESS</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      所有命令示例中的 <code>timedRequest: true</code> 和 <code>interactionTimeoutMs</code> 不是可选的。
      如果 SDK 没有自动处理 Timed Invoke，需要手动构造限时事务。
      大多数 Matter SDK（如 CHIP Tool、connectedhomeip）在调用标记为 Timed Invoke 的命令时会自动处理，
      但自定义实现需要注意这一点。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：手机投屏时自动登录电视内容应用</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：用户在手机上打开 Netflix App 并已登录，现在想在电视上观看。电视上已安装 Netflix 内容应用。</p>
      <ol>
        <li>用户在手机 Netflix App 中选择「投射到电视」</li>
        <li>手机发现电视上的 Netflix 内容应用所在的 Endpoint（例如 Endpoint 3）</li>
        <li>手机 Netflix App 生成一个临时账户标识（关联到用户的 Netflix 账户）</li>
        <li>手机向电视 Endpoint 3 发送 <a href="#cmd-0x00"><code>GetSetupPIN (0x00)</code></a>，
            携带临时账户标识</li>
        <li>电视端 Netflix 应用验证标识，生成临时 PIN 并返回</li>
        <li>手机自动使用标识和 PIN 发送 <a href="#cmd-0x02"><code>Login (0x02)</code></a></li>
        <li>登录成功 —— 电视上的 Netflix 现在可以访问用户的观看历史、收藏列表和订阅内容</li>
        <li>用户在电视上选择内容播放，通过 <a href="/clusters/media-playback/">MediaPlayback</a> 控制播放</li>
      </ol>
      <p>
        整个过程对用户来说是无感的：点击「投射」后，电视自动切换到已登录状态。
        <strong>PIN 交换发生在后台</strong>，用户不需要在电视上手动输入任何信息。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：多用户切换与登出管理</summary>
    <div class="scenario-content">
      <p><strong>背景</strong>：家庭中多人共用一台电视，每个人有自己的内容订阅账户。</p>
      <ol>
        <li>用户 A 的手机已通过 Login 让电视登录了 A 的账户</li>
        <li>用户 B 想切换到自己的账户：
          <ul>
            <li>B 的手机先发送 <a href="#cmd-0x03"><code>Logout (0x03)</code></a> 登出 A 的会话
                （如果 B 的节点有权限），或者 A 自己从手机端发送 Logout</li>
            <li>B 的手机再执行完整的 GetSetupPIN → Login 流程登录 B 的账户</li>
          </ul>
        </li>
        <li>登出时机建议：
          <ul>
            <li>用户主动切换账户时</li>
            <li>手机 App 退出登录时，同步登出所有已授权的电视</li>
            <li>设备管理页面中提供「退出所有设备」的选项</li>
          </ul>
        </li>
      </ol>
      <p>
        <strong>注意 Node 参数</strong>：Login 和 Logout 的 <code>Node</code> 参数允许一个节点代替另一个节点操作。
        例如，家庭管理员可以从自己的手机登出其他家庭成员在电视上的会话。
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
    description: 'Matter WakeOnLan Cluster(0x0503)完整参考 — MACAddress / LinkLocalAddress 属性定义，Magic Packet 唤醒机制，与 LowPower Cluster 的配合使用。',
    prev: undefined,
    next: undefined,
    content: `<h1>WakeOnLan Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0503</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒、游戏主机等）&nbsp;|&nbsp;
    <strong>角色</strong>: Server（Read-only，无命令）
  </p>
  <p>
    WakeOnLan 是 Matter 媒体设备中一个非常简单但实用的 Cluster ——
    它<strong>不包含任何命令</strong>，只暴露设备的 MAC 地址和 IPv6 链路本地地址，
    让外部系统能够通过发送 WoL Magic Packet（魔术包）将处于待机或休眠状态的设备远程唤醒。
  </p>
  <p>
    这个 Cluster 通常和 <strong>LowPower Cluster（0x0508）</strong>配合使用：
    LowPower 负责让设备进入低功耗待机状态（Sleep 命令），
    WakeOnLan 则提供唤醒所需的网络地址信息。两者一个管"睡"，一个管"醒"。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">为什么不直接用 Matter 命令唤醒？</div>
    <p>
      设备进入深度休眠后，Matter 的 IP 通信栈可能已经关闭，无法接收正常的 Matter 消息。
      但网卡硬件仍然监听特定模式的以太网帧（Magic Packet），收到后触发硬件中断唤醒整个系统。
      这就是为什么需要一个专门的 Cluster 来暴露 MAC 地址 —— 唤醒操作发生在 Matter 协议层之下。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#attributes">Attributes</a>
    <span class="nav-sep">|</span>
    <a href="#wol-mechanism">唤醒机制</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Attributes ====== -->
  <h2 id="attributes">Attributes</h2>
  <p>
    WakeOnLan Cluster 只有 <strong>2 个属性</strong>，全部Read-only，没有任何命令和事件。
    两个属性都是可选的，但至少要支持其中一个，否则这个 Cluster 没有实际意义。
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
          <td class="col-optional">可选</td>
          <td>设备的 48 位 MAC 地址</td>
        </tr>
        <tr class="clickable-row" data-href="#attr-0x0001">
          <td><a href="#attr-0x0001"><code>0x0001</code></a></td>
          <td>LinkLocalAddress</td>
          <td>octstr (bytes)</td>
          <td class="col-optional">可选</td>
          <td>设备的 IPv6 链路本地地址</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== MACAddress ====== -->
  <h3 id="attr-0x0000">MACAddress —— MAC 地址(0x0000)</h3>
  <p>
    设备用于接收 WoL Magic Packet 的以太网 MAC 地址。
    格式为标准的 48 位 MAC，以冒号分隔的十六进制字符串表示，例如 <code>AA:BB:CC:DD:EE:FF</code>。
  </p>
  <p>
    这个地址通常是设备有线网卡的地址。对于只有 WiFi 的设备，也可以是无线网卡的 MAC，
    但 WoL 在 WiFi 环境下的可靠性远不如有线连接（需要路由器支持 WiFi WoL 转发）。
  </p>

  <div class="callout callout-warning">
    <div class="callout-title">MAC 地址格式</div>
    <p>
      Matter 规范要求 MACAddress 以 <strong>大写十六进制 + 冒号分隔</strong> 的字符串格式存储，
      例如 <code>"AA:BB:CC:DD:EE:FF"</code>。实际开发中建议做大小写兼容处理。
      最大长度为 32 字节（含分隔符，可覆盖 48 位和 64 位 EUI 格式）。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== LinkLocalAddress ====== -->
  <h3 id="attr-0x0001">LinkLocalAddress —— 链路本地地址(0x0001)</h3>
  <p>
    设备的 IPv6 链路本地地址（Link-Local Address），以字节数组形式存储，固定 16 字节。
    链路本地地址以 <code>fe80::</code> 开头，仅在同一网络链路（同一子网/VLAN）内有效。
  </p>
  <p>
    这个地址的用途是让唤醒方知道设备在哪个链路上，以便将 Magic Packet 发送到正确的网段。
    对于跨子网唤醒场景，还需要配合定向广播或子网转发。
  </p>

  <div class="callout callout-tip">
    <div class="callout-title">什么时候用 LinkLocalAddress？</div>
    <p>
      当网络中存在多个子网或 VLAN 时，仅靠 MAC 地址不够 —— 广播域不同，Magic Packet 到不了目标设备。
      LinkLocalAddress 可以帮助唤醒方确定目标设备所在的链路，选择正确的网络接口发送唤醒包。
      如果你的环境是简单的单一子网（家庭网络的常见情况），通常只用 MACAddress 就够了。
    </p>
  </div>
  <p class="back-link"><a href="#attributes">&#8593; Back to Attributes</a></p>

  <!-- ====== WoL 唤醒机制 ====== -->
  <h2 id="wol-mechanism">WoL 唤醒机制</h2>
  <p>
    Wake-on-LAN（WoL）是一项已有数十年历史的网络标准，允许通过发送一个特殊的以太网帧（Magic Packet）
    来远程唤醒处于待机、休眠或关机状态的设备。Matter 的 WakeOnLan Cluster 并不负责发送这个包，
    它只是告诉你「往哪个地址发」。
  </p>

  <h3>Magic Packet 结构</h3>
  <p>
    Magic Packet 的格式非常简单：<strong>6 字节的 <code>0xFF</code> 同步头</strong>，
    后面跟着<strong>目标 MAC 地址重复 16 次</strong>，总计 102 字节。
    可以封装在 UDP 包中（常用端口 7 或 9），也可以直接作为以太网帧发送。
  </p>
  <pre><code>// WoL Magic Packet 结构（共 102 字节）
FF FF FF FF FF FF          // 同步头：6 字节全 0xFF
AA BB CC DD EE FF          // 目标 MAC 地址，重复 16 次
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

  <h3>唤醒流程</h3>
  <ol>
    <li>从设备的 WakeOnLan Cluster 读取 <code>MACAddress</code>（设备在线时提前缓存）</li>
    <li>设备进入待机/休眠（可能由 LowPower Cluster 的 Sleep 命令触发）</li>
    <li>需要唤醒时，构造包含目标 MAC 的 Magic Packet</li>
    <li>通过 UDP 广播（或定向广播）发送到目标网段</li>
    <li>设备网卡硬件检测到匹配的 Magic Packet，触发中断唤醒系统</li>
    <li>设备启动后重新加入 Matter Fabric，恢复正常通信</li>
  </ol>

  <div class="callout callout-warning">
    <div class="callout-title">前提条件</div>
    <p>
      WoL 能否工作取决于硬件和固件支持：设备的网卡必须在休眠时仍然通电并监听网络帧，
      且 BIOS/固件中需要启用 WoL 功能。不是所有设备都支持 —— 尤其是纯 WiFi 设备，
      WoL 在无线环境下的支持度和可靠性都不如有线以太网。
    </p>
  </div>

  <!-- ====== 与 LowPower Cluster 的关系 ====== -->
  <h3 id="lowpower-relation">与 LowPower Cluster 的关系</h3>
  <p>
    在 Matter 媒体设备中，WakeOnLan 和 LowPower（0x0508）是一对互补的 Cluster：
  </p>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>职责</th>
          <th>Direction</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>LowPower</strong>（0x0508）</td>
          <td>让设备进入待机/休眠（Sleep 命令）</td>
          <td>Controller → Device：「去睡觉」</td>
        </tr>
        <tr>
          <td><strong>WakeOnLan</strong>（0x0503）</td>
          <td>提供唤醒设备所需的网络地址</td>
          <td>Controller 读取地址后自行发送 Magic Packet：「起来了」</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p>
    典型的媒体设备（如电视、机顶盒）会同时实现这两个 Cluster。
    用户说「关闭电视」时调用 LowPower 的 Sleep，说「打开电视」时用 WakeOnLan 的地址发送 Magic Packet。
  </p>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一台智能电视的 WakeOnLan Cluster 属性：</p>
  <pre><code>{
  // --- 网络唤醒地址 ---
  "0x0000": "AA:BB:CC:DD:EE:FF",   // MACAddress = 设备有线网卡的 MAC 地址
  "0x0001": "fe80::a8bb:ccff:fedd:eeff"  // LinkLocalAddress = IPv6 链路本地地址
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      WakeOnLan 的属性值在设备整个生命周期内通常不变（MAC 地址和 Link-Local 地址都是固定的）。
      建议在设备首次入网时读取一次并缓存到本地，不需要频繁轮询。
      这样即使设备已经休眠、无法响应 Matter 请求，你仍然有地址可以发送 Magic Packet。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：语音助手唤醒电视</summary>
    <div class="scenario-content">
      <p>
        用户对着智能音箱说「打开客厅电视」，电视当前处于待机状态，Matter 通信已断开。
      </p>
      <ol>
        <li>智能音箱（Hub）从本地缓存中查找客厅电视的 WakeOnLan 信息（入网时已缓存）</li>
        <li>取出 <code>MACAddress = "AA:BB:CC:DD:EE:FF"</code></li>
        <li>构造 Magic Packet（6 字节 0xFF + MAC 重复 16 次 = 102 字节）</li>
        <li>通过 UDP 端口 9 广播到本地网络</li>
        <li>电视网卡检测到 Magic Packet，唤醒系统</li>
        <li>电视启动后重新加入 Matter Fabric，Hub 检测到设备上线</li>
        <li>Hub 可选择性地发送 OnOff Cluster 的 On 命令确保电视完全开启</li>
      </ol>
      <p>
        <strong>关键点</strong>：唤醒地址必须提前缓存。设备休眠后无法通过 Matter 读取属性，
        如果没有缓存就只能等用户手动开机。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：自动化场景联动(回家模式)</summary>
    <div class="scenario-content">
      <p>
        用户设置了「回家模式」自动化：手机连上家庭 WiFi 时，自动唤醒电视并切换到常看的输入源。
      </p>
      <ol>
        <li>Hub 检测到用户手机连入家庭 WiFi（触发条件）</li>
        <li>自动化引擎启动「回家模式」动作序列</li>
        <li>第一步：用缓存的 MAC 地址发送 Magic Packet 唤醒电视</li>
        <li>第二步：等待电视重新上线（轮询设备在线状态或监听 mDNS 广播）</li>
        <li>第三步：通过 MediaInput Cluster（0x0507）切换到 HDMI 1（机顶盒）</li>
        <li>同时：通过 LevelControl 调整客厅灯光亮度到 60%</li>
      </ol>
      <p>
        <strong>注意</strong>：唤醒到设备完全上线需要时间（通常几秒到十几秒），
        自动化引擎需要在发送 Magic Packet 后等待设备就绪，再执行后续的 Matter 命令。
        直接连续发送会失败，因为设备的 Matter 栈还没启动。
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
    description: 'Matter LowPower Cluster(0x0508)完整参考 — Sleep 待机命令、与 WakeOnLan / OnOff 的区别、媒体设备电源管理场景。',
    prev: undefined,
    next: undefined,
    content: `<h1>LowPower Cluster</h1>
  <p>
    <strong>Cluster ID</strong>: <code>0x0508</code> &nbsp;|&nbsp;
    <strong>所在 Endpoint</strong>: 媒体端点（电视、机顶盒、流媒体棒等）
  </p>
  <p>
    LowPower 是 Matter 中<strong>最简单的 Cluster 之一</strong> ——
    没有任何属性、没有事件、没有 Feature，只有唯一一个命令：<strong>Sleep</strong>。
    它的职责非常单一：让媒体设备进入低功耗待机（Standby / Sleep）模式。
  </p>
  <p>
    这个 Cluster 通常和 <a href="/clusters/wake-on-lan/"><strong>WakeOnLan Cluster（0x0503）</strong></a> 配合使用：
    LowPower 负责「让设备睡下去」，WakeOnLan 提供「把设备叫醒」所需的网络地址。
    两者是媒体设备电源管理的一对搭档。
  </p>

  <div class="callout callout-info">
    <div class="callout-title">Sleep vs Off —— 为什么不直接用 OnOff？</div>
    <p>
      OnOff Cluster 的 <code>Off</code> 命令语义是「关闭功能」，对灯来说是灭灯，对插座是断电。
      但对电视而言，「关闭」通常不是断电，而是进入<strong>待机模式</strong> ——
      屏幕和主处理器休眠，但网卡仍然保持监听状态，以便远程唤醒。
    </p>
    <p>
      LowPower 的 <code>Sleep</code> 命令明确表达了这种「进入低功耗待机」的语义，
      与 OnOff 的 Off（彻底关闭功能）形成区分。
      实际上，很多电视同时实现了两个 Cluster：OnOff 用于开/关机状态管理，LowPower 专门用于进入待机。
    </p>
  </div>

  <!-- Quick navigation -->
  <nav class="quick-nav">
    <a href="#commands">命令</a>
    <span class="nav-sep">|</span>
    <a href="#no-attributes">属性说明</a>
    <span class="nav-sep">|</span>
    <a href="#relationships">关联 Cluster</a>
    <span class="nav-sep">|</span>
    <a href="#example-data">Example Data</a>
    <span class="nav-sep">|</span>
    <a href="#scenarios">Common Scenarios</a>
  </nav>

  <!-- ====== Commands ====== -->
  <h2 id="commands">Commands</h2>
  <p>
    LowPower Cluster 只有 <strong>1 个命令</strong>，没有参数，也没有专用的返回数据。
    这是 Matter 规范中最精简的命令定义之一。
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Parameter</th>
          <th>响应</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="clickable-row" data-href="#cmd-0x00">
          <td><a href="#cmd-0x00"><code>0x00</code></a></td>
          <td>Sleep</td>
          <td>无</td>
          <td>Status</td>
          <td>让设备进入低功耗待机模式</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ====== Command Details ====== -->
  <h3 id="cmd-0x00">Sleep —— 进入待机(0x00)</h3>
  <p>
    让媒体设备进入低功耗待机（Sleep / Standby）模式。
    命令没有任何参数，执行成功后设备返回通用的 <code>Status = SUCCESS</code> 响应。
  </p>
  <p>
    设备收到 Sleep 命令后的具体行为由厂商实现决定，但通常包括：
  </p>
  <ul>
    <li>关闭屏幕和音频输出</li>
    <li>暂停或停止正在播放的媒体内容</li>
    <li>主处理器进入低功耗状态</li>
    <li>网卡保持活跃，继续监听 WoL Magic Packet（如果支持 WakeOnLan）</li>
  </ul>

  <p>调用示例：</p>
  <pre><code>// Sleep 命令请求（Command ID: 0x00）
{
  "invokeRequests": [{
    "commandPath": {
      "endpointId": 1,
      "clusterId": "0x0508",
      "commandId": "0x00"       // Sleep
    }
    // 无参数字段 —— Sleep 是零参数命令
  }]
}

// 响应：Status = SUCCESS（无返回数据）</code></pre>

  <div class="callout callout-warning">
    <div class="callout-title">Sleep 之后可能无法通过 Matter 通信</div>
    <p>
      设备进入深度待机后，Matter 通信栈可能随之关闭。
      这意味着 Sleep 之后你<strong>无法再通过 Matter 命令唤醒设备</strong> ——
      唤醒需要走底层的 WoL 魔术包或用户物理操作（遥控器、机身按钮）。
      因此，发送 Sleep 之前务必确保已缓存设备的 WakeOnLan 地址信息。
    </p>
  </div>
  <p class="back-link"><a href="#commands">&#8593; Back to Commands</a></p>

  <!-- ====== 属性说明 ====== -->
  <h2 id="no-attributes">属性说明</h2>
  <p>
    LowPower Cluster <strong>没有定义任何应用层属性</strong>。
    这意味着你无法通过读取属性来判断设备当前是否处于待机状态 ——
    设备一旦进入待机，通信都可能断开了，属性也就无从读取。
  </p>
  <p>
    如果需要判断设备的在线/待机状态，通常有以下方式：
  </p>
  <ul>
    <li>监测设备的 Matter 会话（Session）是否仍然活跃</li>
    <li>通过 mDNS 广播观察设备是否仍可发现</li>
    <li>尝试读取其他 Cluster 属性（如 BasicInformation），超时即认为设备已待机</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-title">只有全局属性</div>
    <p>
      虽然没有应用层属性，但 LowPower Cluster 仍然有 Matter 规范要求的全局属性
      （<code>ClusterRevision</code>、<code>FeatureMap</code>、<code>AttributeList</code> 等）。
      这些属性用于协议层面的版本协商和能力发现，不涉及业务功能。
    </p>
  </div>

  <!-- ====== 关联 Cluster ====== -->
  <h2 id="relationships">关联 Cluster</h2>
  <p>
    LowPower 不是孤立存在的，它在媒体设备的电源管理中与另外两个 Cluster 紧密配合：
  </p>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>ID</th>
          <th>职责</th>
          <th>与 LowPower 的关系</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="/clusters/wake-on-lan/"><strong>WakeOnLan</strong></a></td>
          <td><code>0x0503</code></td>
          <td>提供设备 MAC 地址用于 WoL 唤醒</td>
          <td>互补关系：LowPower 让设备睡下，WakeOnLan 帮你把它叫醒</td>
        </tr>
        <tr>
          <td><a href="/clusters/on-off/"><strong>OnOff</strong></a></td>
          <td><code>0x0006</code></td>
          <td>设备的开/关/切换控制</td>
          <td>语义区分：Off = 关闭功能，Sleep = 进入待机（设备仍可被远程唤醒）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h3>媒体设备的典型电源 Cluster 组合</h3>
  <p>
    一台智能电视通常同时实现以下三个 Cluster，分别覆盖电源管理的不同层面：
  </p>
  <div class="enum-cards">
    <div class="enum-card">
      <span class="enum-badge">睡</span>
      <div>
        <span class="enum-name">LowPower（0x0508）</span>
        <span class="enum-desc">Controller 发送 Sleep 命令，设备进入待机</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">醒</span>
      <div>
        <span class="enum-name">WakeOnLan（0x0503）</span>
        <span class="enum-desc">Controller 读取 MAC 地址，发送 Magic Packet 唤醒设备</span>
      </div>
    </div>
    <div class="enum-card">
      <span class="enum-badge">开关</span>
      <div>
        <span class="enum-name">OnOff（0x0006）</span>
        <span class="enum-desc">管理设备的开机/关机状态（语义不同于待机）</span>
      </div>
    </div>
  </div>

  <!-- ====== Example Data ====== -->
  <h2 id="example-data">Example Data</h2>
  <p>读取一台电视的 LowPower Cluster 属性（几乎没有业务数据）：</p>
  <pre><code>{
  // LowPower Cluster（0x0508）没有应用层属性
  // 它是一个纯命令型 Cluster，只提供 Sleep 命令
  // 读取该 Cluster 只会返回全局属性（ClusterRevision、FeatureMap 等）

  "0xFFFD": 1,              // ClusterRevision = 1
  "0xFFFC": 0               // FeatureMap = 0（无 Feature）
}</code></pre>

  <div class="callout callout-tip">
    <div class="callout-title">Developer Tip</div>
    <p>
      LowPower Cluster 的存在本身就是一种能力声明 —— 如果设备的某个 Endpoint 上有这个 Cluster，
      说明该设备支持通过 Matter 进入待机模式。
      你可以通过 <a href="/clusters/descriptor/">Descriptor Cluster</a> 的 ServerList 属性
      来检查设备是否实现了 LowPower（<code>0x0508</code>），从而决定是否在 UI 上显示「待机」按钮。
    </p>
  </div>

  <!-- ====== Common Scenarios ====== -->
  <h2 id="scenarios">Common Scenarios</h2>

  <details class="scenario">
    <summary>场景 1：语音助手关闭电视(Sleep + WoL 缓存)</summary>
    <div class="scenario-content">
      <p>
        用户对着智能音箱说「关闭客厅电视」，要求电视进入待机模式，同时保留远程唤醒能力。
      </p>
      <ol>
        <li>Hub 确认目标设备的 Endpoint 上存在 LowPower Cluster（检查 Descriptor 的 ServerList）</li>
        <li>Hub 检查本地缓存中是否已有该设备的 WakeOnLan 地址（MAC / Link-Local）</li>
        <li>如果没有缓存，先读取 WakeOnLan Cluster 的 <code>MACAddress</code> 并存储到本地</li>
        <li>向设备发送 LowPower 的 <code>Sleep (0x00)</code> 命令</li>
        <li>设备关闭屏幕和音频，进入低功耗待机模式</li>
        <li>Matter 通信可能断开 —— Hub 记录设备状态为「待机」</li>
        <li>后续用户说「打开电视」时，Hub 使用缓存的 MAC 地址发送 WoL Magic Packet 唤醒</li>
      </ol>
      <p>
        <strong>关键点</strong>：Sleep 命令发送前必须确保 WakeOnLan 地址已缓存。
        一旦设备进入深度待机，Matter 通信断开，就再也无法通过 Matter 读取 MAC 地址了。
      </p>
    </div>
  </details>

  <details class="scenario">
    <summary>场景 2：定时待机(节能自动化)</summary>
    <div class="scenario-content">
      <p>
        用户设置了节能自动化规则：每晚 23:00 如果电视仍在运行，自动进入待机以节省电量。
      </p>
      <ol>
        <li>自动化引擎在 23:00 触发</li>
        <li>通过 OnOff Cluster 读取电视的 <code>OnOff (0x0000)</code> 属性，确认当前是否开启</li>
        <li>如果 <code>OnOff = true</code>（电视仍在运行），发送 LowPower 的 <code>Sleep</code> 命令</li>
        <li>电视进入待机模式，屏幕熄灭，但网卡保持活跃</li>
        <li>第二天早上，用户可以通过遥控器、语音助手或 WoL 唤醒电视</li>
      </ol>
      <p>
        <strong>为什么用 Sleep 而不是 Off？</strong>
        Sleep 让设备保持可远程唤醒的状态，OnOff 的 Off 可能导致设备完全关机，
        需要用户物理按下电源按钮才能开启，对智能家居场景不友好。
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
