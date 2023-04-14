import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IClickEvent, IMouseEvent, IPlayerProps, ITouchEvent } from "../types";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  useEffect(() => {
    if (player && ui) {
      const mediaElement = player.getMediaElement();

      const _onPlay = (event: IClickEvent) => {
        props.onPlay && props.onPlay(event);
      };
      const _onPlaying = (event: IClickEvent) => {
        props.onPlaying && props.onPlaying(event);
      };
      const _onPause = (event: IClickEvent) => {
        props.onPause && props.onPause(event);
      };
      const _onEnded = (event: IClickEvent) => {
        props.onEnded && props.onEnded(event);
      };
      const _onMouseOver = (event: IMouseEvent) => {
        props.onMouseOver && props.onMouseOver(event);
      };
      const _onTouchStart = (event: ITouchEvent) => {
        props.onTouchStart && props.onTouchStart(event);
      };

      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("playing", _onPlaying);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
      mediaElement.addEventListener("mouseover", _onMouseOver);
      mediaElement.addEventListener("touchstart", _onTouchStart);
    }
  }, [player, ui])
};

export default useUILIstener;
