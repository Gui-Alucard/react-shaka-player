import { Player as ShakaPlayer, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect, useRef } from "react";

import { IPlayerProps } from "../types";

const useStats = (player: ShakaPlayer, props?: IPlayerProps) => {
  const timer = useRef<ShakaUtil.Timer | null>(null);

  useEffect(() => {
    if (player) {
      const ads_ = player.getAdManager();
      const _sendStats = () => {
        const stats_ = player.getStats();
        // const newStartTime_ = player.updateStartTime(props.wacthTime)

        const mediaCurrentTime = player.getMediaElement() && Math.floor(player.getMediaElement().currentTime);
        const mediaEndTime = Math.floor(player.seekRange().end);
        const additionalStats = { mediaCurrentTime, mediaEndTime };

        props.onStatsChange && props.onStatsChange({ ...stats_, ...additionalStats });
      };
      const _timer = new ShakaUtil.Timer(() => {
        _sendStats();
        player.addEventListener("timeupdate", _sendStats);
        console.log('[CONSOLE do STATS ===>', ads_)
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
