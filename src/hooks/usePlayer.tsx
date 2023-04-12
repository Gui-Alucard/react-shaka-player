import { Player as ShakaPlayer, polyfill as ShakaPolyfill, util as ShakaUtil } from 'shaka-player/dist/shaka-player.ui';
import React, { useEffect, useState } from 'react';
import * as Configs from '../configs';
import UIHooks from './useUI';

import { IPlayerProps } from "../types/";
import { SuperConfig } from "../types/enum";

const usePlayer = (
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  uiContainerRef: React.MutableRefObject<HTMLDivElement>,
  props?: IPlayerProps
) => {
  const [player, setPlayer] = useState<ShakaPlayer | null>(null);
  const ui = UIHooks(player, videoRef, uiContainerRef, props);

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
          await player.load(props.src)
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      initLoad();
    }
  }, [player, props.src]);

  useEffect(() => {
    const eventManager = new ShakaUtil.EventManager();
    eventManager.listenOnce(player, `timeupdate`, (e) => {
      console.log('[SHAKA! + EVENT =>', e);
    });
  }, [player]);

  return { player, ui };
};

export default usePlayer;