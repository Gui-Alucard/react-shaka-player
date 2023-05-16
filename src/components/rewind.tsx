import React from 'react';
import { IPlayerProps } from '../types';

const RewindButton = (props: IPlayerProps) => {
  const { onClick, label } = props;

  const handleEnter = () => {
    const element = document.getElementsByClassName('shaka-controls-container');
    element.item(0).setAttribute('shown', 'true');
  }

  const handleLeave = () => {
    const element = document.getElementsByClassName('shaka-controls-container');
    element.item(0).removeAttribute('shown');
  }

  return (
    <div className='sbt-theme-rewind-container'>
      <button type='button' onClick={onClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave}><p>{label && label}</p></button>
    </div>
  )
};

export { RewindButton };
