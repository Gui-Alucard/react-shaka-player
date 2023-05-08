import React from 'react';
import { IPlayerProps } from '../types';
import { Unmute, Rewind, Foward } from '../icons';

const Button = (props: IPlayerProps) => {
  const { onClick, label } = props;

  return (
    <div className='sbt-theme-button-container' >
      {label && label === 'unmute' && (
        <button className='unmute' onClick={onClick}>
          <Unmute width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>Ativar som</p>
        </button>
      )}
      {label && label === 'foward' && (
        <button className='foward' onClick={onClick}>
          <Foward width={36} height={42} /> <p>Avançar</p>
        </button>
      )}
      {label && label === 'rewind' && (
        <button className='rewind' onClick={onClick}>
          <Rewind width={36} height={41} /> <p>Retroceder</p>
        </button>
      )}
    </div>
  )
};

export { Button };
