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
      const stats_ = player.getStats();

      const mediaCurrentTime = player.getMediaElement() && Math.floor(player.getMediaElement().currentTime);
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
      const mediaElement = player.getMediaElement();
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
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'update_watch_time_live', data }))
            break
          case 'timeupdate':
            // @ts-ignore  
            window.postMessage(JSON.stringify({ event: 'update_watch_time', data }))
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'change_current_time', data }))
            // @ts-ignore
            window.postMessage(JSON.stringify({ event: 'update_watch_time_live', data }))
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
            break
        }
      };

      mediaElement.addEventListener("timeupdate", _onTimeUpdate);
      mediaElement.addEventListener("play", _onUiInteraction);
      mediaElement.addEventListener("pause", _onUiInteraction);
      mediaElement.addEventListener("seeked", _onUiInteraction);
      mediaElement.addEventListener("ended", _onUiInteraction);
      mediaElement.addEventListener("error", _onUiInteraction);
    }
  }, [player, ui]);
};

export default useUILIstener;
