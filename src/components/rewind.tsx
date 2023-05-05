import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';
import { RewindIcon } from '../icons/rewindIcon';

interface IButtonRewind {
  player?: ShakaPlayer;
  props?: IPlayerProps;
}

const ButtonRewind = ({ player, props }: IButtonRewind) => {
  const buttonRewind = useRef<HTMLButtonElement | null>(null);

  Hooks.useButton(player, props, buttonRewind);

  return (
    <div id='rewind' className='sbt-container-rewind'>
      <button ref={buttonRewind} onClick={props && props.onRewind}>
        <RewindIcon width={36} height={41} style={{ marginRight: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonRewind };