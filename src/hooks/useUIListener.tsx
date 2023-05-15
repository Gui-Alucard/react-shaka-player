import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  useEffect(() => {
    if (player && ui) {
      const mediaElement = player.getMediaElement();
      const _onTimeUpdate = (event: Event) => {
        props.onTimeUpdate && props.onTimeUpdate(event);
      };
      const _onUiInteraction = (event: Event) => {
        props.onUiInteraction && props.onUiInteraction(event);
      };

      mediaElement.addEventListener("timeupdate", _onTimeUpdate);
      mediaElement.addEventListener("play", _onUiInteraction);
      mediaElement.addEventListener("pause", _onUiInteraction);
      mediaElement.addEventListener("seeked", _onUiInteraction);
      mediaElement.addEventListener("ended", _onUiInteraction);
      mediaElement.addEventListener("error", _onUiInteraction);
    }
  }, [player, ui])
};

export default useUILIstener;
