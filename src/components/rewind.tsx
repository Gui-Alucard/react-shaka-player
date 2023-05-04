import { Player as ShakaPlayer, ui as ShakaUI } from "shaka-player/dist/shaka-player.ui";
import React, { useCallback, useState } from 'react';

import { IPlayerProps } from '../types';
import { RewindIcon } from '../icons/rewindIcon';

interface IButtonRewind {
  player?: ShakaPlayer;
  ui?: ShakaUI.Overlay;
  props?: IPlayerProps;
}

const ButtonRewind = ({ player, ui, props }: IButtonRewind) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  const handleRewind = useCallback(() => {
    if (player && ui && props.label) {
      const video = player.getMediaElement();
      setVideoCurrentTime(Math.floor(video.currentTime));

      const _updadeSeekStartTime = async () => {
        try {
          if (props.label === 'rewind') {
            await player.updateStartTime(Math.floor(video.currentTime) - 10)
          }
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _updadeSeekStartTime()
    }
  }, [player, videoCurrentTime])

  return (
    <div id='rewind' className='sbt-container-rewind'>
      <button onClick={() => handleRewind()}>
        <RewindIcon width={36} height={41} style={{ marginRight: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonRewind };
