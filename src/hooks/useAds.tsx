import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.ads && ui) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();

      adManager.initClientSide(container, video);

      const _streamRequest = async () => {
        try {
          await adManager.requestClientSideAds(props.ads);
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, () => {
            video.volume = props.ads ? 0 : 1;
            video.play();
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
    }

  }, [player, props.ads, ui]);
};

export default useAds;
