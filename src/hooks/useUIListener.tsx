import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect, useState } from "react";

import { IPlayerProps } from "../types";
import { SuperConfig } from "../types/enum";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  const [overlayClassName, setOverlayClassName] = useState<string>('sbt-theme');

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
  }, [player, ui]);

  useEffect(() => {
    if (props.superConfig) {
      switch (props.superConfig) {
        case SuperConfig.STREAMING:
          setOverlayClassName(`sbt-theme ${props.superConfig}`);
          break;
        case SuperConfig.VOD:
          setOverlayClassName(`sbt-theme ${props.superConfig}`);
          break;
        case SuperConfig.DEFAULT:
          setOverlayClassName(`sbt-theme ${props.superConfig}`);
          break;
        default:
          setOverlayClassName('sbt-theme');
          break;
      };
    };
  }, [props.superConfig]);

  return { overlayClassName };
};

export default useUILIstener;
