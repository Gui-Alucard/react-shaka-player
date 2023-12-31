const vodConfig = {
  ui: {
    addSeekBar: true,
    doubleClickForFullscreen: true,
    enableFullscreenOnRotation: true,
    clearBufferOnQualityChange: true,
    enableTooltips: false,
    enableKeyboardPlaybackControls: false,
    forceLandscapeOnFullscreen: false,
    singleClickForPlayAndPause: false,
    addBigPlayButton: false,
    customContextMenu: false,
    controlPanelElements: [
      'play_pause',
      'mute',
      'volume',
      'time_and_duration',
      'spacer',
      'picture_in_picture',
      'fullscreen',
      'quality'
    ],
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
    },
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff8f',
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
      inaccurateManifestTolerance: 3,
      rebufferingGoal: 5,
      durationBackoff: 0
    },
  },
  ui: {
    addSeekBar: false,
    doubleClickForFullscreen: true,
    enableFullscreenOnRotation: true,
    enableKeyboardPlaybackControls: false,
    singleClickForPlayAndPause: false,
    forceLandscapeOnFullscreen: false,
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

export { vodConfig, streamingConfig };
