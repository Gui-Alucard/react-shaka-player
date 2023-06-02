import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui, overlayClassName } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);
  Hooks.useAds(ui, player, props);

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
    adsRequest,
    adsTagUrl,
    startTime,
    unmute,
    muted,
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

  const unmuteClassName = superConfig !== 'STREAMING' ? 'sbt-theme-unmute-container' : 'sbt-theme-streaming-unmute-container';

  return (
    <div style={style} ref={uiContainerRef} className={overlayClassName}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        autoPlay={false}
        muted={!!muted}
        {...newProps}
      />
      {unmute?.p && unmute?.onUnmute && (
        <div className={unmuteClassName}>
          <button type='button' onClick={unmute?.onUnmute}>
            <p>{unmute?.p && unmute?.p}</p>
          </button>
        </div>
      )}
      {ui && onFoward && (
        <div className='foward-container' >
          <button type='button' onClick={onFoward} />
        </div>
      )}
      {ui && onRewind && (
        <div className='rewind-container'>
          <button type='button' onClick={onRewind} />
        </div>
      )}
    </div>
  )
};

export { ReactPlayer };
