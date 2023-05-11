import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();

      adManager.initClientSide(container, video);

      const _streamRequest = async () => {
        try {
          await adManager.requestClientSideAds(props.adsRequest);
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, (e) => {
            console.log('ADS_LOADED + ENTROU', ShakaAds.AdManager.ADS_LOADED, e)
            video.autoplay = true;
            video.play();
            console.log('ADS_LOADED + PASSOU', ShakaAds.AdManager.AD_LOADED, e)
          })
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
    }

  }, [player, props.adsRequest, ui]);
};

export default useAds;
