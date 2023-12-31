import { Player as ShakaPlayer, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect, useRef } from "react";

import { IPlayerProps } from "../types";

const useStats = (player: ShakaPlayer, props?: IPlayerProps) => {
  const timer = useRef<ShakaUtil.Timer | null>(null);

  useEffect(() => {
    if (player) {
      const _sendStats = () => {
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

        // @ts-ignore
        window.postMessage(JSON.stringify({ event: 'shaka_change_current_time', data: data }));
        props.onStatsChange && props.onStatsChange(data);
      };
      const _timer = new ShakaUtil.Timer(() => {
        _sendStats();
      });
      _timer.tickEvery(1);
      timer.current = _timer;
    }

    return () => {
      if (player && timer) {
        timer.current.stop();
      }
    };
  }, [player]);
};

export default useStats;
