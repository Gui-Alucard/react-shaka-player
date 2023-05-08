import React from 'react';
import { IPlayerProps } from '../types';
import { Unmute, Rewind, Foward } from '../icons';

const Button = (props: IPlayerProps) => {
  const { onClick, label } = props;

  const handleIcon = (label: string) => {
    if (label && label === 'unmute') {
      return (
        <div id={label} className={`sbt-theme-container-${label}`} >
          <button onClick={onClick}>
            <Unmute width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>Ativar som</p>
          </button>
        </div>
      )
    } else if (label && label === 'foward') {
      return (
        <div id={label} className={`sbt-theme-container-${label}`} >
          <button onClick={onClick}>
            <Foward width={36} height={42} /> <p>Avançar</p>
          </button>
        </div>
      )
    } else if (label && label === 'rewind') {
      return (
        <div id={label} className={`sbt-theme-container-${label}`} >
          <button onClick={onClick}>
            <Rewind width={36} height={41} /> <p>Retroceder</p>
          </button>
        </div>
      )
    }
  }

  return (
    <div id={label} className={`sbt-theme-container-${label}`} >
      <button onClick={onClick}>
        {label && handleIcon(label)}
      </button>
    </div>
  )
};

export { Button };
