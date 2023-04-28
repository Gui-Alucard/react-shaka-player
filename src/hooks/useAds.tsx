import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useStats = (player: ShakaPlayer, ui: shaka.ui.Overlay, props?: IPlayerProps) => {

  useEffect(() => {
    if (player && props.adsRequest) {
      const adManager = player.getAdManager();

      const _streamRequest = async () => {
        try {
          console.log('[__SHAKA__ adManager', adManager)
          const video = player.getMediaElement();
          const container = ui.getControls().getClientSideAdContainer();

          await adManager.initClientSide(container, video);

          const GoogleAdsLoader = new google.ima.AdsLoader(container)
          console.log('[__SHAKA__ GoogleAdsLoader', GoogleAdsLoader)
          const adsRequest = GoogleAdsLoader.requestAds(props.adsRequest)
          console.log('[__SHAKA__ adsRequest', adsRequest)

          const uri = await adManager.requestClientSideAds(adsRequest)
          console.log('[__SHAKA__ uri', uri)
          player.load(uri);
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
    }
  }, [player, props.adsRequest]);
};

export default useStats;
