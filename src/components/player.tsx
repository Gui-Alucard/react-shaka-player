import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';

const ReactShakaPlayer = (props: IPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const uiContainerRef = useRef<HTMLDivElement | null>(null);

  const { player, ui, overlayClassName } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.usePlayerListener(player, props);
  Hooks.useUIListener(ui, player, props);
  Hooks.useStats(player, props);
  Hooks.useAds(ui, player, props);

  const {
    children,
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
    autoplay,
    withPostMessage,
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

  const unmuteClassName = superConfig !== 'STREAMING' ? 'default-theme-unmute-container' : 'default-theme-streaming-unmute-container';

  return (
    <div style={style} ref={uiContainerRef} className={overlayClassName}>
      {children}
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={style}
        autoPlay={!!autoplay}
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

export { ReactShakaPlayer };
