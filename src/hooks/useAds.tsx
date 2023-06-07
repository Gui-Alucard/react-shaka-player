import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useAds = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  useEffect(() => {
    if (player && props.adsTagUrl && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const mediaElement = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();
      const stats = adManager.getStats();

      const ADS_REQUEST = props.adsRequest;
      const TAG_URL = props.adsTagUrl;

      adManager.initClientSide(container, mediaElement);

      const _handleWindowMessages = (eventName: string) => {
        // @ts-ignore
        window.postMessage(JSON.stringify({ event: eventName, data: { adManager: stats, player: player.getStats() } }));
      };

      const _streamRequest = async () => {
        ADS_REQUEST.setContinuousPlayback(true);
        ADS_REQUEST.setAdWillAutoPlay(true);
        ADS_REQUEST.setAdWillPlayMuted(true);
        ADS_REQUEST.linearAdSlotHeight = 100;
        ADS_REQUEST.linearAdSlotWidth = 100;
        ADS_REQUEST.nonLinearAdSlotHeight = 100;
        ADS_REQUEST.nonLinearAdSlotWidth = 100;
        ADS_REQUEST.adTagUrl = TAG_URL;
        try {
          // @ts-ignore
          await adManager.requestClientSideAds(ADS_REQUEST);
          adManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, () => {
            mediaElement.play();
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_STARTED, () => {
            _handleWindowMessages('AD_STARTED');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_PROGRESS, () => {
            _handleWindowMessages('AD_PROGRESS');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_FIRST_QUARTILE, () => {
            _handleWindowMessages('AD_FIRST_QUARTILE');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_MIDPOINT, () => {
            _handleWindowMessages('AD_MIDPOINT');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_THIRD_QUARTILE, () => {
            _handleWindowMessages('AD_THIRD_QUARTILE');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_COMPLETE, () => {
            _handleWindowMessages('AD_COMPLETE');
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
          console.log('[shaka_ads_error]', error);
        }
      };
      _streamRequest();
    }

  }, [props.adsRequest, props.adsTagUrl, ui]);
};

export default useAds;
