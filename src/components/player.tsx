import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  const adHTMLElement = document.getElementById('ad-container');

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);
  Hooks.useAds(player, adHTMLElement, props)

  const {
    autoPlay,
    className,
    config,
    onBuffering,
    onEnded,
    onError,
    onLoad,
    onPause,
    onPlay,
    onPlayerError,
    onStatsChange,
    onTimeUpdate,
    onVolumeChange,
    onPlaying,
    onSeeked,
    playerClassName,
    superConfig,
    uiConfig,
    adsRequest,
    ...newProps
  } = props;

  const style = {
    maxWidth: "100%",
    width: "100%",
    maxHeight: "100vh",
    overflow: "hidden"
  };

  const overlayClassName = className === undefined ? "sbt-theme" : "sbt-theme " + props.className;

  return (
    <div id="ad-container" style={{ position: 'absolute', top: 0, left: 0, ...style }} ref={adContainerRef}>
      <div style={style} ref={uiContainerRef} className={overlayClassName}>
        <video
          ref={videoRef}
          className={props.playerClassName}
          style={style}
          autoPlay={autoPlay}
          {...newProps}
          muted
        />
      </div>
    </div>
  )
};

export { ReactPlayer };
