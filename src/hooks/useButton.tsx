import React, { useEffect, useState } from "react";

import { IPlayerProps, IPlayerRefs } from "../types";

const useButton = ({ player }: IPlayerRefs, props?: IPlayerProps, buttonRef?: React.MutableRefObject<HTMLButtonElement>) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  useEffect(() => {
    if (player && props.label) {
      const video = player.getMediaElement();
      setVideoCurrentTime(Math.floor(video.currentTime));

      const _updadeSeekStartTime = async () => {
        console.log('[SHAKA___PLAYER', player)
        const _onFoward = (event: Event) => {
          player.updateStartTime(Math.floor(video.currentTime) + 10);
          console.log('[SHAKA___FOWARD clicou', event)
        };

        const _onRewind = (event: Event) => {
          player.updateStartTime(Math.floor(video.currentTime) - 10);
          console.log('[SHAKA___REWIND clicou', event)
        };

        try {
          if (props.label === 'foward') {
            buttonRef.current.addEventListener("click", (e) => _onFoward(e));
          } else if (props.label === 'rewind') {
            buttonRef.current.addEventListener("click", (e) => _onRewind(e));
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
