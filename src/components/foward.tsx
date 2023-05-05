import React, { useRef } from 'react';
import * as Hooks from '../hooks';

import { IPlayerProps, IPlayerRefs } from '../types';
import { FowardIcon } from '../icons/fowardIcon';

const ButtonFoward = (player?: IPlayerRefs, props?: IPlayerProps) => {
  const buttonFowardRef = useRef<HTMLButtonElement | null>(null);

  Hooks.useButton(player, props, buttonFowardRef);

  return (
    <div id='foward' className='sbt-container-foward'>
      <button ref={buttonFowardRef}>
        <FowardIcon width={36} height={42} style={{ marginLeft: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonFoward };