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

      const _handleWindowMessages = (eventName: string) => {
        const mediaCurrentTime = mediaElement && Math.floor(mediaElement.currentTime);
        const mediaEndTime = Math.floor(player.seekRange().end);
        const additionalStats = { mediaCurrentTime, mediaEndTime };
        // @ts-ignore
        window.postMessage(JSON.stringify({ event: eventName, data: { adManager: additionalStats, player: player.getStats() } }));
      };

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
          adManager.addEventListener(ShakaAds.AdManager.AD_STARTED, () => {
            _handleWindowMessages('AD_STARTED');
          });
          adManager.addEventListener(ShakaAds.AdManager.AD_PROGRESS, () => {
            _handleWindowMessages('AD_PROGRESS');
          });
          adManager.addEventListener(ShakaAds.AdManager.ALL_ADS_COMPLETED, () => {
            console.log('[ALL_ADS_COMPLETED]', mediaElement.src, props.src);
            mediaElement.play()
          });
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
          console.log('[shaka_ads_error]', error);
        }
      };
      _streamRequest();
    }

  }, [props.adsRequest, props.adsTagUrl]);
};

export default useAds;
