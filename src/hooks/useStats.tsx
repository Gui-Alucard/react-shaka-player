import { Player as ShakaPlayer, util as ShakaUtil } from "shaka-player/dist/shaka-player.ui";
import { useEffect, useRef } from "react";

import { IClickEvent, IPlayerProps } from "../types";

const useStats = (player: ShakaPlayer, props?: IPlayerProps) => {
  const timer = useRef<ShakaUtil.Timer | null>(null);

  useEffect(() => {
    if (player) {
      const mediaElement = player.getMediaElement();

      const _onPause = (event: IClickEvent) => {
        props.onPause && props.onPause(event);
      };

      const _sendStats = (event: any) => {
        const stats_ = player.getStats();

        const mediaCurrentTime = player.getMediaElement() && Math.floor(player.getMediaElement().currentTime);
        const mediaEndTime = Math.floor(player.seekRange().end);
        const additionalStats = { mediaCurrentTime, mediaEndTime };

        props.onStatsChange && props.onStatsChange({ ...stats_, ...additionalStats }, event);
      };

      mediaElement.addEventListener("pause", _sendStats);
      const _timer = new ShakaUtil.Timer(() => {
        _sendStats(_onPause);
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
