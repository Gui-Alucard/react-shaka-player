import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IClickEvent, IPlayerProps } from "../types";

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
      const _onPause = (event: IClickEvent) => {
        props.onPause && props.onPause(event);
      };
      const _onEnded = (event: IClickEvent) => {
        props.onEnded && props.onEnded(event);
      };
      const _onError = (event: ErrorEvent) => {
        props.onError && props.onError(event);
      };
      const _onVolumeChange = (event: Event) => {
        props.onVolumeChange && props.onVolumeChange(event);
      };
      const _onTimeUpdate = (event: Event) => {
        props.onTimeUpdate && props.onTimeUpdate(event);
      };

      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
      mediaElement.addEventListener("error", _onTimeUpdate);
      mediaElement.addEventListener("volumechange", _onVolumeChange);
      mediaElement.addEventListener("timeupdate", _onError);
      player.addEventListener('loading', (e) => console.log('[VEIO DO SHAKA', e));
    }
  }, [player, ui])
};

export default useUILIstener;
