import React from 'react';
import { IPlayerProps } from '../types';
import { UnMuteIcon } from '../icons/unmuteIcon';

const ButtonUnmute = (props: IPlayerProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-container-unmute'>
      <button onClick={onClick}>
        <UnMuteIcon width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>{label}</p>
      </button>
    </div>
  )
};

export { ButtonUnmute };
