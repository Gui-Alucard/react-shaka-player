import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import React, { useCallback, useState } from 'react';

import { IPlayerProps } from '../types';
import { FowardIcon } from '../icons/fowardIcon';

interface IButtonFoward {
  player?: ShakaPlayer;
  ui?: ShakaUI.Overlay;
  props?: IPlayerProps;
}

const ButtonFoward = ({ player, ui, props }: IButtonFoward) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  const handleFoward = useCallback(() => {
    if (player && ui && props.label) {
      const video = player.getMediaElement();
      setVideoCurrentTime(Math.floor(video.currentTime));

      const _updadeSeekStartTime = async () => {
        try {
          if (props.label === 'foward') {
            await player.updateStartTime(Math.floor(video.currentTime) + 10)
          }
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _updadeSeekStartTime()
    }
  }, [player, videoCurrentTime])

  return (
    <div id='foward' className='sbt-container-foward'>
      <button onClick={() => handleFoward()}>
        <FowardIcon width={36} height={42} style={{ marginLeft: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonFoward };
