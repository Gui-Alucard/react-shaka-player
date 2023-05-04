import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';
import { ButtonFoward } from './foward';
import { ButtonRewind } from './rewind';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);
  Hooks.useAds(ui, player, props);

  const {
    className,
    config,
    onBuffering,
    onClick,
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
    startTime,
    label,
    ...newProps
  } = props;

  const style = {
    maxWidth: "100%",
    width: "100%",
    maxHeight: "100vh",
    overflow: "hidden",
    cursor: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const overlayClassName = className === undefined ? "sbt-theme" : "sbt-theme " + props.className;

  return (
    <div style={style} ref={uiContainerRef} className={overlayClassName}>
      <ButtonFoward player={player} ui={ui} props={props} />
      <ButtonRewind player={player} ui={ui} props={props} />
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        autoPlay
        {...newProps}
        muted
      />
    </div>
  )
};

export { ReactPlayer };
