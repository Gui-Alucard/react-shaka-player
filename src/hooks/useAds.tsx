import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.adsTagUrl && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();

      const ADS_REQUEST = props.adsRequest;
      const TAG_URL = props.adsTagUrl;
      ADS_REQUEST.setContinuousPlayback(true)
      ADS_REQUEST.setAdWillAutoPlay(true)
      ADS_REQUEST.setAdWillPlayMuted(true)
      ADS_REQUEST.linearAdSlotHeight = 100
      ADS_REQUEST.linearAdSlotWidth = 100
      ADS_REQUEST.nonLinearAdSlotHeight = 100
      ADS_REQUEST.nonLinearAdSlotWidth = 100
      ADS_REQUEST.adTagUrl = TAG_URL;

      adManager.initClientSide(container, video);

      const _streamRequest = async () => {
        try {
          // @ts-ignore
          await adManager.requestClientSideAds(ADS_REQUEST);
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, () => {
            video.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_DURATION_CHANGED, () => {
            const stats = adManager.getStats();
            console.log('[SHAKA ADS STATS___', stats);
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
    }

  }, [player, props.adsTagUrl, props.adsRequest, ui]);
};

export default useAds;
