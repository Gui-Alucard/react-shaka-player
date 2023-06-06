import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.adsTagUrl && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const mediaElement = player.getMediaElement();
      const stats = player.getStats();
      const container = ui.getControls().getClientSideAdContainer();

      const ADS_REQUEST = props.adsRequest;
      const TAG_URL = props.adsTagUrl;
      ADS_REQUEST.setContinuousPlayback(true);
      ADS_REQUEST.setAdWillAutoPlay(true);
      ADS_REQUEST.setAdWillPlayMuted(true);
      ADS_REQUEST.linearAdSlotHeight = 100;
      ADS_REQUEST.linearAdSlotWidth = 100;
      ADS_REQUEST.nonLinearAdSlotHeight = 100;
      ADS_REQUEST.nonLinearAdSlotWidth = 100;
      ADS_REQUEST.adTagUrl = TAG_URL;

      adManager.initClientSide(container, mediaElement);

      const _streamRequest = async () => {
        try {
          // @ts-ignore
          await adManager.requestClientSideAds(ADS_REQUEST);
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, () => {
            mediaElement.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.ALL_ADS_COMPLETED, () => {
            adManager.release();
            mediaElement.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_PROGRESS, () => {
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'ad_current_time', data: stats }));
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
          // @ts-ignore 
          window.postMessage(JSON.stringify({ event: 'error', data: { shaka_error: error } }));
        }
      };
      _streamRequest();
    }

  }, [player, props.adsTagUrl, props.adsRequest, ui]);
};

export default useAds;
