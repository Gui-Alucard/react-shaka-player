import { Player as ShakaPlayer, extern as ShakaExtern, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const usePlayerListener = (player: ShakaPlayer, props?: IPlayerProps) => {

  useEffect(() => {
    const _onPlayerErrorEvent = (error: ShakaExtern.Error | any) => {
      props.onPlayerError && props.onPlayerError(error);
    }
    const _onBufferingEvent = (bufferStatus: any) => {
      const boolOfBuffering: boolean = bufferStatus.buffering
      props.onBuffering && props.onBuffering(boolOfBuffering);
    };
    const _onMouseOver = () => {
      props.onMouseOver && props.onMouseOver();
    };

    console.log('[ANTES', player)
    if (player) {
      player.addEventListener("error", _onPlayerErrorEvent);
      player.addEventListener("buffering", _onBufferingEvent);
      player.addEventListener("mouseover", _onMouseOver);
      console.log('[TEM PLAYER', player)
      const eventManager = new ShakaUtil.EventManager();
      eventManager.listen(player, `buffering`, (event: any) => {
        if (event.buffering == false) {
          console.log('[CONSOLE DO BUFFERING! + EVENT =>', event);
          eventManager.unlisten(player, 'buffering');
        }
      });
    }
  }, [player]);
};

export default usePlayerListener;
