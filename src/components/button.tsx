import React from 'react';
import * as Hooks from '../hooks';

import { IUseButton } from '../types';

const Button = ({ videoElement, props, buttonRef }: IUseButton) => {
  Hooks.useButton({ videoElement, props, buttonRef });

  return (
    <div id={props && props.label} className={`sbt-container-${props && props.label}`}>
      <button ref={buttonRef} onClick={props && props.onClick}><p>{props && props.label}</p></button>
    </div>
  )
};

export { Button };