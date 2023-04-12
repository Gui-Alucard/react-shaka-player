import { Player as ShakaPlayer, ui as ShakaUI, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IMouseEvent, IPlayEvent, IPlayerProps, ITouchEvent } from "../types";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  useEffect(() => {
    if (player && ui) {
      const eventManager = new ShakaUtil.EventManager();
      const mediaElement = player.getMediaElement();

      const _onPlay = (event: IPlayEvent) => {
        props.onPlay && props.onPlay(event);
      };
      const _onPause = () => {
        props.onPause && props.onPause();
      };
      const _onEnded = () => {
        props.onEnded && props.onEnded();
      };
      const _onMouseOver = (event: IMouseEvent) => {
        props.onMouseOver && props.onMouseOver(event);
      };
      const _onTouchStart = (event: ITouchEvent) => {
        props.onTouchStart && props.onTouchStart(event);
      };

      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
      mediaElement.addEventListener("mouseover", _onMouseOver);
      mediaElement.addEventListener("touchstart", _onTouchStart);

      if (player) {
        eventManager.listen(player, `buffering`, (event: any) => {
          if (event.buffering == false) {
            console.log('[CONSOLE DO BUFFERING! + EVENT =>', event);
            eventManager.unlisten(player, 'buffering');
          }
        });
        eventManager.listenOnce(mediaElement, `timeupdate`, (event: any) => {
          console.log('[CONSOLE TIMEUPDATE', event);
        });
        eventManager.listenOnce(mediaElement, `mouseover`, (event: any) => {
          console.log('[CONSOLE MOUSE OVER', event);
        });
      }
    }
  }, [player, ui])
};

export default useUILIstener;
