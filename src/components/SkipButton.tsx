import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import React, { useEffect } from 'react'
import { IPlayerProps } from '../types';

interface ISkipButton extends IPlayerProps {
  player: ShakaPlayer,
}

export default function SkipButton(props: ISkipButton) {
  const { player, label, content, onSkipClick } = props;

  useEffect(() => {
    if (player && content.currentTime) {
      const mediaElement = player.getMediaElement();
      const _onClick = () => {
        onSkipClick && onSkipClick();
        if (label === 'less') return player.updateStartTime(content.currentTime - 0.10)
        if (label === 'plus') return player.updateStartTime(content.currentTime + 0.10)
      };

      mediaElement.addEventListener("onclick", _onClick);
    }
  }, [label, content])

  return (
    <button onClick={onSkipClick} type='button'>{label}</button>
  )
}
