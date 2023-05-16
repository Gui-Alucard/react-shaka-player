import React from 'react';
import { IPlayerProps } from '../types';

const RewindButton = (props: IPlayerProps) => {
  const { onClick, label } = props;

  const handleEnter = (e: any) => {
    console.log('[ Rewind OVER', e)
    const element = document.getElementsByClassName('shaka-controls-container');
    element.item(0).setAttribute('shown', 'true');
  }

  const handleLeave = (e: any) => {
    console.log('[ Rewind LEAVE', e)
    const element = document.getElementsByClassName('shaka-controls-container');
    element.item(0).removeAttribute('shown');
  }

  return (
    <div className='sbt-theme-rewind-container'>
      <button type='button' onClick={onClick} onMouseOver={(e) => handleEnter(e)} onMouseLeave={(e) => handleLeave(e)}><p>{label && label}</p></button>
    </div>
  )
};

export { RewindButton };
