import React from 'react';
import * as Hooks from '../hooks';

import { IUseButton } from '../types';
import { RewindIcon } from '../icons/rewindIcon';

const ButtonRewind = ({ player, props, buttonRef }: IUseButton) => {
  Hooks.useButton({ player, props, buttonRef });

  return (
    <div id='rewind' className='sbt-container-rewind'>
      <button ref={buttonRef}>
        <RewindIcon width={36} height={41} style={{ marginRight: '5px' }} /> <p>{props && props.label}</p>
      </button>
    </div>
  )
};

export { ButtonRewind };