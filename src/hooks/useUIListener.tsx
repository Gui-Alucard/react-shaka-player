import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IClickEvent, IPlayerProps, IStats } from "../types";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  useEffect(() => {
    if (player && ui) {
      const mediaElement = player.getMediaElement();

      const _onPlay = (event: IClickEvent, stats?: IStats) => {
        props.onPlay && props.onPlay(event, stats);
      };
      const _onPlaying = (event: Event, stats?: IStats) => {
        props.onPlaying && props.onPlaying(event, stats);
      };
      const _onPause = (event: IClickEvent, stats?: IStats) => {
        props.onPause && props.onPause(event, stats);
      };
      const _onEnded = (event: Event, stats?: IStats) => {
        props.onEnded && props.onEnded(event, stats);
      };
      const _onClose = (event: Event, stats?: IStats) => {
        props.onClose && props.onClose(event, stats);
      };
      const _onError = (event: ErrorEvent, stats?: IStats) => {
        props.onError && props.onError(event, stats);
      };
      const _onVolumeChange = (event: Event, stats?: IStats) => {
        props.onVolumeChange && props.onVolumeChange(event, stats);
      };
      const _onTimeUpdate = (event: Event, stats?: IStats) => {
        props.onTimeUpdate && props.onTimeUpdate(event, stats);
      };
      const _onSeeked = (event: Event, stats?: IStats) => {
        props.onSeeked && props.onSeeked(event, stats);
      };

      mediaElement.addEventListener("play", _onPlay);
      mediaElement.addEventListener("playing", _onPlaying);
      mediaElement.addEventListener("pause", _onPause);
      mediaElement.addEventListener("ended", _onEnded);
      mediaElement.addEventListener("close", _onClose);
      mediaElement.addEventListener("error", _onError);
      mediaElement.addEventListener("volumechange", _onVolumeChange);
      mediaElement.addEventListener("timeupdate", _onTimeUpdate);
      mediaElement.addEventListener("seeked", _onSeeked);
    }
  }, [player, ui])
};

export default useUILIstener;
