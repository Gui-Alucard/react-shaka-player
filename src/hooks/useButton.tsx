import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import React, { useEffect, useState } from "react";

import { IPlayerProps } from "../types";

const useButton = (player: ShakaPlayer, props?: IPlayerProps, buttonRef?: React.MutableRefObject<HTMLButtonElement>) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  useEffect(() => {
    if (player && props.label) {
      const video = player.getMediaElement();
      setVideoCurrentTime(Math.floor(video.currentTime));

      const _updadeSeekStartTime = async () => {
        const _onFoward = async () => {
          await player.updateStartTime(Math.floor(video.currentTime) + 10);
          props.onFoward && props.onFoward()
        };

        const _onRewind = async () => {
          await player.updateStartTime(Math.floor(video.currentTime) - 10);
          props.onRewind && props.onRewind();
        };

        try {
          if (props.label === 'foward') {
            buttonRef.current.addEventListener("click", _onFoward);
          } else if (props.label === 'rewind') {
            buttonRef.current.addEventListener("click", _onRewind);
          }
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _updadeSeekStartTime()
    }
  }, [player, videoCurrentTime])
};

export default useButton;
