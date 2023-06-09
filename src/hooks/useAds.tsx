import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.adsTagUrl && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const mediaElement = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();

      const ADS_REQUEST = props.adsRequest;
      const TAG_URL = props.adsTagUrl;

      adManager.initClientSide(container, mediaElement);

      const _streamRequest = async () => {
        try {
          ADS_REQUEST.setContinuousPlayback(true);
          ADS_REQUEST.setAdWillAutoPlay(true);
          ADS_REQUEST.setAdWillPlayMuted(true);
          ADS_REQUEST.linearAdSlotHeight = 100;
          ADS_REQUEST.linearAdSlotWidth = 100;
          ADS_REQUEST.nonLinearAdSlotHeight = 100;
          ADS_REQUEST.nonLinearAdSlotWidth = 100;
          ADS_REQUEST.adTagUrl = TAG_URL;
          // @ts-ignore
          await adManager.requestClientSideAds(ADS_REQUEST);
          adManager.addEventListener(ShakaAds.AdManager.IMA_AD_MANAGER_LOADED, () => {
            mediaElement.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, () => {
            console.log('[ADS_LOADED]')
            mediaElement.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_STARTED, () => {
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'AD_STARTED', data: { container } }));
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_PROGRESS, () => {
            console.log('[AD_PROGRESS]', ui.getControls().getAd())
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'AD_PROGRESS', data: { container } }));
          });
          adManager.addEventListener(ShakaAds.AdManager.ALL_ADS_COMPLETED, () => {
            mediaElement.play()
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
          console.log('[shaka_ads_error]', error);
        }
      };
      _streamRequest();
    }

  }, [player, props.adsRequest, props.adsTagUrl, ui]);
};

export default useAds;
