import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps, IPlayerRefs } from '../types';
import { RewindIcon } from '../icons/rewindIcon';

const ButtonRewind = (player?: IPlayerRefs, props?: IPlayerProps) => {
  const buttonRewindRef = useRef<HTMLButtonElement | null>(null);

  Hooks.useButton(player, props, buttonRewindRef);

  return (
    <div id='rewind' className='sbt-container-rewind'>
      <button ref={buttonRewindRef}>
        <RewindIcon width={36} height={41} style={{ marginRight: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonRewind };