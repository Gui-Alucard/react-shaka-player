const vodConfig = {
  ui: {
    controlPanelElements: [
      'play_pause',
      'mute',
      'volume',
      'time_and_duration',
      'spacer',
      'fullscreen',
      'quality',
      'picture_in_picture'
    ]
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
    addSeekBar: false,
    controlPanelElements: ['play_pause', 'mute', 'volume', 'spacer', 'fullscreen', 'quality'],
  },
};

export { vodConfig, streamingConfig };
