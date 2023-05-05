import { Player as ShakaPlayer, ui as ShakaUI, ads as ShakaAds } from "shaka-player/dist/shaka-player.ui";
import { useEffect, useState } from "react";

import { IPlayerProps } from "../types";

const useStats = (ui: ShakaUI.Overlay, player: ShakaPlayer, props?: IPlayerProps) => {
  const [adsManager, setAdsManager] = useState<shaka.extern.IAdManager | null>(null)

  useEffect(() => {
    if (player && ui) {
      setAdsManager(player.getAdManager());
      const video = player.getMediaElement();
      const container = ui.getControls().getClientSideAdContainer();

      player.getAdManager().initClientSide(container, video);
    };
  }, [player, ui]);

  useEffect(() => {
    if (props.adsRequest, adsManager) {
      const _streamRequest = async () => {
        try {
          await adsManager.requestClientSideAds(props.adsRequest);
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _streamRequest();
    }
  }, [props.adsRequest, adsManager]);

  useEffect(() => {
    if (player && props.adsRequest && ui) {
      adsManager.addEventListener(ShakaAds.AdManager.ADS_LOADED, (e) => {
        console.log('ADS_LOADED + Event', ShakaAds.AdManager.ADS_LOADED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_CLICKED, (e) => {
        console.log('AD_CLICKED + Event', ShakaAds.AdManager.AD_CLICKED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_LOADED, (e) => {
        console.log('AD_LOADED + Event', ShakaAds.AdManager.AD_LOADED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_STARTED, (e) => {
        console.log('AD_STARTED + Event', ShakaAds.AdManager.AD_STARTED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_SKIPPED, (e) => {
        adsManager.release();
        console.log('AD_SKIPPED + Event', ShakaAds.AdManager.AD_SKIPPED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_SKIP_STATE_CHANGED, (e) => {
        adsManager.release();
        console.log('AD_SKIP_STATE_CHANGED + Event', ShakaAds.AdManager.AD_SKIP_STATE_CHANGED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_COMPLETE, (e) => {
        console.log('AD_COMPLETE + Event', ShakaAds.AdManager.AD_COMPLETE, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_CLOSED, (e) => {
        console.log('AD_CLOSED + Event', ShakaAds.AdManager.AD_CLOSED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_STOPPED, (e) => {
        console.log('AD_STOPPED + Event', ShakaAds.AdManager.AD_STOPPED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_RESUMED, (e) => {
        console.log('AD_RESUMED + Event', ShakaAds.AdManager.AD_RESUMED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_PAUSED, (e) => {
        console.log('AD_PAUSED + Event', ShakaAds.AdManager.AD_PAUSED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_PROGRESS, (e) => {
        const time = Math.floor(e.timeStamp)
        console.log('AD_PROGRESS + Event', ShakaAds.AdManager.AD_PROGRESS, e, time)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_MUTED, (e) => {
        console.log('AD_MUTED + Event', ShakaAds.AdManager.AD_MUTED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_METADATA, (e) => {
        console.log('AD_METADATA + Event', ShakaAds.AdManager.AD_METADATA, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_BUFFERING, (e) => {
        console.log('AD_BUFFERING + Event', ShakaAds.AdManager.AD_BUFFERING, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.IMA_AD_MANAGER_LOADED, (e) => {
        console.log('IMA_AD_MANAGER_LOADED + Event', ShakaAds.AdManager.IMA_AD_MANAGER_LOADED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.ALL_ADS_COMPLETED, (e) => {
        console.log('ALL_ADS_COMPLETED + Event', ShakaAds.AdManager.ALL_ADS_COMPLETED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_INTERACTION, (e) => {
        console.log('AD_INTERACTION + Event', ShakaAds.AdManager.AD_INTERACTION, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_VOLUME_CHANGED, (e) => {
        console.log('AD_VOLUME_CHANGED + Event', ShakaAds.AdManager.AD_VOLUME_CHANGED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_BREAK_READY, (e) => {
        console.log('AD_BREAK_READY + Event', ShakaAds.AdManager.AD_BREAK_READY, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_DURATION_CHANGED, (e) => {
        console.log('AD_DURATION_CHANGED + Event', ShakaAds.AdManager.AD_DURATION_CHANGED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_FIRST_QUARTILE, (e) => {
        console.log('AD_FIRST_QUARTILE + Event', ShakaAds.AdManager.AD_FIRST_QUARTILE, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_IMPRESSION, (e) => {
        console.log('AD_IMPRESSION + Event', ShakaAds.AdManager.AD_IMPRESSION, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_LINEAR_CHANGED, (e) => {
        console.log('AD_LINEAR_CHANGED + Event', ShakaAds.AdManager.AD_LINEAR_CHANGED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_MIDPOINT, (e) => {
        console.log('AD_MIDPOINT + Event', ShakaAds.AdManager.AD_MIDPOINT, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_RECOVERABLE_ERROR, (e) => {
        console.log('AD_RECOVERABLE_ERROR + Event', ShakaAds.AdManager.AD_RECOVERABLE_ERROR, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.AD_THIRD_QUARTILE, (e) => {
        console.log('AD_THIRD_QUARTILE + Event', ShakaAds.AdManager.AD_THIRD_QUARTILE, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.CUEPOINTS_CHANGED, (e) => {
        console.log('CUEPOINTS_CHANGED + Event', ShakaAds.AdManager.CUEPOINTS_CHANGED, e)
      })
      adsManager.addEventListener(ShakaAds.AdManager.IMA_STREAM_MANAGER_LOADED, (e) => {
        console.log('IMA_STREAM_MANAGER_LOADED + Event', ShakaAds.AdManager.IMA_STREAM_MANAGER_LOADED, e)
      })
    }
  }, [player, props.adsRequest, ui])
};

export default useStats;
