import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import React from 'react'
import { IPlayerProps } from '../types';

interface ISkipButton extends IPlayerProps {
  player: ShakaPlayer,
}

export default function SkipButton(props: ISkipButton) {
  const { label, onSkipClick } = props;
  return (
    <button className="shaka-controls-button-panel shaka-show-controls-on-mouse-over shaka-skip-button material-icons-round shaka-tooltip" onClick={onSkipClick} type='button'>{label}</button>
  )
}
