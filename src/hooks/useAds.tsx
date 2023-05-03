import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useStats = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  const { ADS_LOADED, AD_CLICKED, AD_LOADED, AD_STARTED, AD_SKIPPED, AD_SKIP_STATE_CHANGED, AD_COMPLETE, AD_CLOSED, AD_STOPPED, AD_RESUMED, AD_PAUSED, AD_PROGRESS, AD_MUTED, AD_METADATA, AD_BUFFERING, IMA_AD_MANAGER_LOADED, ALL_ADS_COMPLETED, AD_INTERACTION, AD_VOLUME_CHANGED } = ShakaAds.AdManager

  useEffect(() => {
    if (player && props.adsRequest && ui) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer()
      adManager.initClientSide(container, video);

      const skipButton = new ShakaUI.SkipAdButton(container, ui.getControls())
      const _streamRequest = async () => {
        try {
          adManager.requestClientSideAds(props.adsRequest);
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
      console.log('[__SHAKA__ STATS', adManager.getStats())
      console.log('[__SHAKA__ SKIPBUTTON', skipButton)
    }

  }, [player, props.adsRequest, ui]);

  useEffect(() => {
    if (player && ui) {
      const adManager = player.getAdManager();

      adManager.addEventListener(ADS_LOADED, (e) => {
        console.log('ADS_LOADED + Event', ADS_LOADED, e)
      })
      adManager.addEventListener(AD_CLICKED, (e) => {
        console.log('AD_CLICKED + Event', AD_CLICKED, e)
      })
      adManager.addEventListener(AD_LOADED, (e) => {
        console.log('AD_LOADED + Event', AD_LOADED, e)
      })
      adManager.addEventListener(AD_STARTED, (e) => {
        console.log('AD_STARTED + Event', AD_STARTED, e)
      })
      adManager.addEventListener(AD_SKIPPED, (e) => {
        console.log('AD_SKIPPED + Event', AD_SKIPPED, e)
      })
      adManager.addEventListener(AD_SKIP_STATE_CHANGED, (e) => {
        console.log('AD_SKIP_STATE_CHANGED + Event', AD_SKIP_STATE_CHANGED, e)
      })
      adManager.addEventListener(AD_COMPLETE, (e) => {
        console.log('AD_COMPLETE + Event', AD_COMPLETE, e)
      })
      adManager.addEventListener(AD_CLOSED, (e) => {
        console.log('AD_CLOSED + Event', AD_CLOSED, e)
      })
      adManager.addEventListener(AD_STOPPED, (e) => {
        console.log('AD_STOPPED + Event', AD_STOPPED, e)
      })
      adManager.addEventListener(AD_RESUMED, (e) => {
        console.log('AD_RESUMED + Event', AD_RESUMED, e)
      })
      adManager.addEventListener(AD_PAUSED, (e) => {
        console.log('AD_PAUSED + Event', AD_PAUSED, e)
      })
      adManager.addEventListener(AD_PROGRESS, (e) => {
        console.log('AD_PROGRESS + Event', AD_PROGRESS, e)
      })
      adManager.addEventListener(AD_MUTED, (e) => {
        console.log('AD_MUTED + Event', AD_MUTED, e)
      })
      adManager.addEventListener(AD_METADATA, (e) => {
        console.log('AD_METADATA + Event', AD_METADATA, e)
      })
      adManager.addEventListener(AD_BUFFERING, (e) => {
        console.log('AD_BUFFERING + Event', AD_BUFFERING, e)
      })
      adManager.addEventListener(IMA_AD_MANAGER_LOADED, (e) => {
        console.log('IMA_AD_MANAGER_LOADED + Event', IMA_AD_MANAGER_LOADED, e)
      })
      adManager.addEventListener(ALL_ADS_COMPLETED, (e) => {
        console.log('ALL_ADS_COMPLETED + Event', ALL_ADS_COMPLETED, e)
      })
      adManager.addEventListener(AD_INTERACTION, (e) => {
        console.log('AD_INTERACTION + Event', AD_INTERACTION, e)
      })
      adManager.addEventListener(AD_VOLUME_CHANGED, (e) => {
        console.log('AD_VOLUME_CHANGED + Event', AD_VOLUME_CHANGED, e)
      })
    }
  }, [player, ui])
};

export default useStats;
