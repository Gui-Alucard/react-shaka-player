import React from 'react';
import { IPlayerProps } from '../types';
import { Unmute } from '../icons/unmute';

const UnmuteButton = (props: IPlayerProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-theme-unmute-container' >
      <button type='button' onClick={onClick}>
        <Unmute width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>{label && label}</p>
      </button>
    </div>
  )
};

export { UnmuteButton };
