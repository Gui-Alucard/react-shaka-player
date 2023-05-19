const vodConfig = {
  ui: {
    addSeekBar: true,
    doubleClickForFullscreen: true,
    singleClickForPlayAndPause: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    clearBufferOnQualityChange: true,
    addBigPlayButton: false,
    customContextMenu: false,
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
    singleClickForPlayAndPause: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    clearBufferOnQualityChange: false,
    addBigPlayButton: true,
    customContextMenu: false,
    controlPanelElements: ['mute', 'volume', 'fullscreen', 'quality', 'picture_in_picture'],
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

export { vodConfig, streamingConfig };
