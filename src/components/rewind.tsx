import React from 'react';
import { IPlayerProps } from '../types';

const RewindButton = (props: IPlayerProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-theme-rewind-container' >
      <button type='button' onClick={onClick}><p>{label && label}</p></button>
    </div>
  )
};

export { RewindButton };
