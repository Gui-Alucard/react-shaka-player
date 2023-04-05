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
      'quality',
      'picture_in_picture'
    ],
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff4c',
      played: '#e93035',
      adBreaks: '#ffcc00',
    },
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
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
      smallGapLimit: 1,
      jumpLargeGaps: true,
      durationBackoff: 0
    },
  },
  ui: {
    addSeekBar: true,
    doubleClickForFullscreen: true,
    singleClickForPlayAndPause: true,
    enableKeyboardPlaybackControls: true,
    enableFullscreenOnRotation: true,
    forceLandscapeOnFullscreen: true,
    clearBufferOnQualityChange: false,
    addBigPlayButton: false,
    customContextMenu: false,
    controlPanelElements: ['play_pause', 'mute', 'volume', 'spacer', 'fullscreen', 'quality'],
    seekBarColors: {
      base: '#ffffff4c',
      buffered: '#ffffff4c',
      played: '#e93035',
      adBreaks: '#ffcc00',
    },
    volumeBarColors: {
      base: '#ffffff4c',
      level: '#0060ad'
    }
  },
};

export { vodConfig, streamingConfig };
