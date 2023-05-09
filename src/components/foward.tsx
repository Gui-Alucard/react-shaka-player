import React from 'react';
import { IPlayerProps } from '../types';

const FowardButton = (props: IPlayerProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-theme-foward-container' >
      <button type='button' onClick={onClick}><p>{label && label}</p></button>
    </div>
  )
};

export { FowardButton };
