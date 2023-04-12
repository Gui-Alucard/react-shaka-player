import { Player as ShakaPlayer, extern as ShakaExtern, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IMouseEvent, IPlayerProps } from "../types";

const usePlayerListener = (player: ShakaPlayer, props?: IPlayerProps) => {

  useEffect(() => {
    const _onPlayerErrorEvent = (error: ShakaExtern.Error | any) => {
      props.onPlayerError && props.onPlayerError(error);
    }
    const _onBufferingEvent = (bufferStatus: any) => {
      const boolOfBuffering: boolean = bufferStatus.buffering
      props.onBuffering && props.onBuffering(boolOfBuffering);
    };
    const _onMouseOver = (event: IMouseEvent) => {
      props.onMouseOver && props.onMouseOver(event);
    };
    const _onPlay = () => {
      props.onPlay && props.onPlay();
    };

    if (player) {
      player.addEventListener("error", _onPlayerErrorEvent);
      player.addEventListener("buffering", _onBufferingEvent);
      player.addEventListener("mouseover", _onMouseOver);
      console.log('[PLAYER', player)
      const eventManager = new ShakaUtil.EventManager();
      eventManager.listen(player, `buffering`, (event: any) => {
        if (event.buffering == false) {
          console.log('[CONSOLE DO BUFFERING! + EVENT =>', event);
          eventManager.unlisten(player, 'buffering');
        }
      });
      eventManager.listen(player, `timeupdate`, (event: any) => {
        console.log('[CONSOLE DO TIME UPDATE! + EVENT =>', event);
      });
      eventManager.listen(player, `mouseover`, (event: any) => {
        console.log('[CONSOLE DO MOUSE OVER! + EVENT =>', event);
        _onMouseOver(event)
      });
      eventManager.listen(player, `play`, (event: any) => {
        console.log('[CONSOLE DO PLAY! + EVENT =>', event);
        _onPlay()
      });
    }
  }, [player]);
};

export default usePlayerListener;
