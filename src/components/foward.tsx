import React from 'react';
import * as Hooks from '../hooks';

import { IUseButton } from '../types';
import { FowardIcon } from '../icons/fowardIcon';

const ButtonFoward = ({ player, props, buttonFowardRef, buttonRewindRef }: IUseButton) => {
  Hooks.useButton({ player, props, buttonFowardRef, buttonRewindRef });

  return (
    <div id='foward' className='sbt-container-foward'>
      <button ref={buttonFowardRef}>
        <FowardIcon width={36} height={42} style={{ marginLeft: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonFoward };