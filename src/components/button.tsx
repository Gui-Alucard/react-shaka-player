import React from 'react';

import { IUseButton } from '../types';

const Button = ({ label, onClick }: IUseButton) => {
  return (
    <div id={label} className={`sbt-theme-container-${label}`}>
      <button type='button' onClick={onClick}><p>{label}</p></button>
    </div>
  )
};

export { Button };