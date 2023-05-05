import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps } from '../types';
import { FowardIcon } from '../icons/fowardIcon';

interface IButtonFoward {
  player?: ShakaPlayer;
  props?: IPlayerProps;
}

const ButtonFoward = ({ player, props }: IButtonFoward) => {
  const buttonFoward = useRef<HTMLButtonElement | null>(null);

  Hooks.useButton(player, props, buttonFoward);

  return (
    <div id='foward' className='sbt-container-foward'>
      <button ref={buttonFoward} onClick={props && props.onFoward}>
        <FowardIcon width={36} height={42} style={{ marginLeft: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonFoward };