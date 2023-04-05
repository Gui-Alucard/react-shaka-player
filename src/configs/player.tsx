const vodConfig = {
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
  volumeBarColors: {
    base: '#ffffff4c',
    level: '#0060ad'
  },
  seekBarColors: {
    base: '#ffffff4c',
    buffered: '#ffffff4c',
    played: '#e93035',
    adBreaks: '#ffcc00',
  }
};

const streamingConfig = {
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
  volumeBarColors: {
    base: '#ffffff4c',
    level: '#0060ad'
  },
  seekBarColors: {
    base: '#ffffff4c',
    buffered: '#ffffff4c',
    played: '#e93035',
    adBreaks: '#ffcc00',
  }
};

export { vodConfig, streamingConfig };
