import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useStats = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {

  useEffect(() => {
    if (player && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer()
      adManager.initClientSide(container, video);

      const _streamRequest = async () => {
        try {
          console.log('[__SHAKA__ ENTROU')
          adManager.requestClientSideAds(props.adsRequest);
          console.log('[__SHAKA__ adsRequest', props.adsRequest)
          console.log('[__SHAKA__ PASSOU', props.adsRequest.adTagUrl)
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
      console.log('[__SHAKA__ STATS', adManager.getStats())
    }

  }, [player, props.adsRequest, ui]);
};

export default useStats;