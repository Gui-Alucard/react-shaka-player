import React, { useCallback, useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui, overlayClassName } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useAds(ui, player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);

  const {
    className,
    config,
    onFoward,
    onRewind,
    onUnmute,
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
    label,
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

  const handleUnmute = useCallback(() => {
    if (label && label === 'ativar som') {
      return 'sbt-theme-unmute-container'
    }
    return 'sbt-theme-unmute-hidden'
  }, [label])

  return (
    <div style={style} ref={uiContainerRef} className={overlayClassName}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        {...newProps}
        muted={muted}
        autoPlay={false}
      />
      {label && onUnmute && (
        <div className={handleUnmute()} >
          <button type='button' onClick={onUnmute}>
            <p>{label && label}</p>
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
