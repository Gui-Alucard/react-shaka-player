import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useAds(ui, player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);

  const {
    className,
    config,
    onFoward,
    onRewind,
    onBuffering,
    onClick,
    onLoad,
    onPlayerError,
    onStatsChange,
    onTimeUpdate,
    onUiInteraction,
    playerClassName,
    superConfig,
    uiConfig,
    ads,
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
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        {...newProps}
        autoPlay={false}
      />
      {onFoward && (
        <div className='foward-container' >
          <button type='button' onClick={onFoward} />
        </div>
      )}
      {onRewind && (
        <div className='rewind-container'>
          <button type='button' onClick={onRewind} />
        </div>
      )}
    </div>
  )
};

export { ReactPlayer };
