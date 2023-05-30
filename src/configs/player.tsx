const defaultConfig = {
  ui: {
    addSeekBar: true,
    doubleClickForFullscreen: true,
    singleClickForPlayAndPause: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    clearBufferOnQualityChange: true,
    addBigPlayButton: true,
    showUnbufferedStart: true,
    enableTooltips: true,
    castAndroidReceiverCompatible: false,
    customContextMenu: false,
    fadeDelay: 3,
    keyboardSeekDistance: 10,
    controlPanelElements: [
      'time_and_duration',
      'play_pause',
      'mute',
      'volume',
      'fullscreen',
      'overflow_menu',
      'rewind',
      'fast_forward',
      'spacer',
      'playback_rate',
      'picture_in_picture',
    ],
    overflowMenuButtons: [
      'captions',
      'language',
      'loop',
      'airplay',
      'cast',
      'quality',
    ],
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    fastForwardRates: [2, 4, 8, 1],
    rewindRates: [-1, -2, -4, -8],
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
    },
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff89',
      played: '#e93035',
      adBreaks: '#ffcc00'
    }
  },
};

const vodConfig = {
  ui: {
    addSeekBar: true,
    doubleClickForFullscreen: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    clearBufferOnQualityChange: true,
    singleClickForPlayAndPause: false,
    addBigPlayButton: false,
    customContextMenu: false,
    keyboardSeekDistance: 10,
    controlPanelElements: [
      'play_pause',
      'mute',
      'volume',
      'time_and_duration',
      'spacer',
      'fullscreen',
      'quality'
    ],
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
    },
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff4c',
      played: '#e93035',
    }
  },
};

const streamingConfig = {
  player: {
    manifest: {
      dash: {
        ignoreMinBufferTime: true,
      },
    },
    streaming: {
      lowLatencyMode: true,
      inaccurateManifestTolerance: 0,
      rebufferingGoal: 1,
      durationBackoff: 0
    },
  },
  ui: {
    addSeekBar: false,
    doubleClickForFullscreen: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    singleClickForPlayAndPause: true,
    clearBufferOnQualityChange: false,
    addBigPlayButton: false,
    customContextMenu: false,
    controlPanelElements: ['play_pause', 'mute', 'volume', 'fullscreen', 'quality', 'picture_in_picture'],
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
    },
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff4c',
      played: '#e93035',
    }
  },
};

export { vodConfig, streamingConfig, defaultConfig };
