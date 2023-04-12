import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);

  const {
    autoPlay,
    className,
    config,
    onBuffering,
    onEnded,
    onLoad,
    onMouseOver,
    onPause,
    onPlay,
    onPlayerError,
    onStatsChange,
    onTouchStart,
    playerClassName,
    superConfig,
    uiConfig,
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
    <div onMouseOver={onMouseOver} onTouchStart={onTouchStart} style={style} ref={uiContainerRef} className={overlayClassName}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        autoPlay={autoPlay}
        onPlay={onPlay}
        {...newProps}
      />
    </div>
  )
};

export { ReactPlayer };
