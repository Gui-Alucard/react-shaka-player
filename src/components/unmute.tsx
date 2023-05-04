import React from 'react';
import { IUnmuteProps } from '../types';
import { UnMuteIcon } from '../icons/unmuteIcon';

const ButtonUnmute = (props: IUnmuteProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-theme container_unmute'>
      <button onClick={onClick}>
        <UnMuteIcon width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>{label}</p>
      </button>
    </div>
  )
};

export { ButtonUnmute };
