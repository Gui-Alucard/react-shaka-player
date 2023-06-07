import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useUILIstener = (
  ui: ShakaUI.Overlay,
  player: ShakaPlayer,
  props?: IPlayerProps
) => {
  useEffect(() => {
    if (player && ui) {
      const mediaElement = player.getMediaElement();
      const stats_ = player.getStats();

      const mediaCurrentTime = mediaElement && Math.floor(mediaElement.currentTime);
      const mediaEndTime = Math.floor(player.seekRange().end);
      const additionalStats = { mediaCurrentTime, mediaEndTime };
      const data = {
        ...stats_,
        ...additionalStats,
        currentTime: additionalStats.mediaCurrentTime,
        stopped_at: additionalStats.mediaCurrentTime,
        liveIncrement: additionalStats.mediaCurrentTime,
        duration: additionalStats.mediaEndTime,
        videoTotalTime: additionalStats.mediaEndTime
      };
      const _onTimeUpdate = (event: Event) => {
        props.onTimeUpdate && props.onTimeUpdate(event);
      };
      const _onUiInteraction = (event: Event) => {
        props.onUiInteraction && props.onUiInteraction(event);
        switch (event.type) {
          case 'seeked':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'update_watch_time', data }))
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'change_current_time', data }))
            break
          case 'volumechange':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'shaka_volume_change', data: null }))
            break
          case 'timeupdate':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'update_watch_time', data }))
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'change_current_time', data }))
            break
          case 'play':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'play_video', data }))
            break
          case 'pause':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'pause_video', data }))
            break
          case 'ended':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'exit', data }))
            break
          case 'error':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'error', data }))
            console.log('[shaka_ui_listener_event_error]', event);
            break
        }
      };

      try {
        mediaElement.addEventListener("play", _onUiInteraction);
        mediaElement.addEventListener("pause", _onUiInteraction);
        mediaElement.addEventListener("seeked", _onUiInteraction);
        mediaElement.addEventListener("ended", _onUiInteraction);
        mediaElement.addEventListener("error", _onUiInteraction);
        mediaElement.addEventListener("seeking", _onUiInteraction);
        mediaElement.addEventListener("volumechange", _onUiInteraction);
        mediaElement.addEventListener("timeupdate", _onTimeUpdate);
      } catch (error) {
        console.log('shaka_ui_listener_catch_error', { shaka_error: error });
        // @ts-ignore 
        window.postMessage(JSON.stringify({ event: 'error', data: { shaka_error: error } }))
      }
    }
  }, [player, ui]);
};

export default useUILIstener;
