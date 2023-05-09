import React from 'react';
import { IPlayerProps } from '../types';
import { Unmute } from '../icons/unmute';

const Button = (props: IPlayerProps) => {
  const { onClick, label, placeholder } = props;

  return (
    <div className='sbt-theme-button' >
      {label && label === 'unmute' ? (
        <div className={`${label}-container`}>
          <button onClick={onClick}>
            <Unmute width={20} height={18.87} style={{ marginRight: '5px' }} /> <p>{placeholder}</p>
          </button>
        </div>
      ) : (
        <div className={`${label}-container`}>
          <button onClick={onClick}><p>{placeholder}</p></button>
        </div>
      )}
    </div>
  )
};

export { Button };
