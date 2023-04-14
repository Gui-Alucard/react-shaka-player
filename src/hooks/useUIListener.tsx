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
      const _onTouchStart = (event: ITouchEvent) => {
        props.onTouchStart && props.onTouchStart(event);
      };
      const _onMouseOver = (event: IMouseEvent) => {
        props.onMouseOver && props.onMouseOver(event);
      };
      const _onMouseEnter = (event: IMouseEvent) => {
        props.onMouseEnter && props.onMouseEnter(event);
      };
      const _onMouseLeave = (event: IMouseEvent) => {
        props.onMouseLeave && props.onMouseLeave(event);
      };
      const _onFocus = (event: FocusEvent) => {
        props.onFocus && props.onFocus(event);
      };
      const _onBlur = (event: FocusEvent) => {
        props.onBlur && props.onBlur(event);
      };
      const _onAnimationInteration = (event: AnimationEvent) => {
        props.onAnimationInteration && props.onAnimationInteration(event);
      };
      const _onAnimationEnd = (event: AnimationEvent) => {
        props.onAnimationEnd && props.onAnimationEnd(event);
      };
      const _onTimeUpdate = (event: Event) => {
        props.onTimeUpdate && props.onTimeUpdate(event);
      };

      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("playing", _onPlaying);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
      mediaElement.addEventListener("touchstart", _onTouchStart);
      mediaElement.addEventListener("mouseover", _onMouseOver);
      mediaElement.addEventListener("mouseenter", _onMouseEnter);
      mediaElement.addEventListener("mouseleave", _onMouseLeave);
      mediaElement.addEventListener("focus", _onFocus);
      mediaElement.addEventListener("blur", _onBlur);
      mediaElement.addEventListener("animationiteration", _onAnimationInteration);
      mediaElement.addEventListener("animationend", _onAnimationEnd);
      mediaElement.addEventListener("timeupdate", _onTimeUpdate);
    }
  }, [player, ui])
};

export default useUILIstener;
