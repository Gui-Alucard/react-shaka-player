import { Player as ShakaPlayer, polyfill as ShakaPolyfill } from 'shaka-player/dist/shaka-player.ui';
import React, { useEffect, useState } from 'react';
import * as Configs from '../configs';
import UIHook from './useUI';

import { IPlayerProps } from "../types/";
import { SuperConfig } from "../types/enum";

const usePlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  uiContainerRef: React.MutableRefObject<HTMLDivElement>,
  props?: IPlayerProps
) => {
  const [player, setPlayer] = useState<ShakaPlayer | null>(null);
  const { ui, overlayClassName } = UIHook(player, videoRef, uiContainerRef, props);

  useEffect(() => {
    ShakaPolyfill.installAll();

    const mainPlayer = new ShakaPlayer(videoRef.current);
    setPlayer(mainPlayer);

    return () => {
      mainPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    if (player && props.onLoad) {
      props.onLoad({
        player: player,
        ui: ui,
        videoElement: videoRef.current,
      });
    }
  }, [player]);

  useEffect(() => {
    if (player && props.config) {
      player.configure(props.config);
    } else if (player && props.superConfig) {
      switch (props.superConfig) {
        case SuperConfig.STREAMING:
          player.configure(Configs.streamingConfig.player);
          break;
        default:
          player.configure({});
          break;
      }
    }
  }, [player, props.config]);

  useEffect(() => {
    if (player && props.src && ShakaPlayer.isBrowserSupported()) {
      const initLoad = async () => {
        try {
          await player.load(props.src, props.startTime ? props.startTime : 0);
          const stats_ = player.getStats();
          const mediaCurrentTime = player.getMediaElement() && Math.floor(player.getMediaElement().currentTime);
          const mediaEndTime = Math.floor(player.seekRange().end);
          const stringParam = {
            event: 'player_stats',
            data: {
              currentTime: mediaCurrentTime,
              stopped_at: mediaCurrentTime,
              duration: mediaEndTime,
              videoTotalTime: mediaEndTime,
              liveIncrement: mediaCurrentTime,
              ...stats_
            }
          };
          // @ts-ignore
          window.postMessage(JSON.stringify(stringParam));
          sessionStorage.setItem('player_stats', JSON.stringify(stringParam.data));
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
          console.log('[shaka_use_player_error]', error);
        }
      };
      initLoad();
    }
  }, [player, props.src]);

  return { player, ui, overlayClassName };
};

export default usePlayer;