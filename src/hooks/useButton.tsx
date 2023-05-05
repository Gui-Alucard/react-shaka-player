import { useEffect, useState } from "react";
import { IUseButton } from "../types";

const useButton = ({ player, props, buttonFowardRef, buttonRewindRef }: IUseButton) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  useEffect(() => {
    if (player && props.label) {
      console.log('[USEBUTTON___ENTROU', player)
      const video = player.getMediaElement();
      setVideoCurrentTime(Math.floor(video.currentTime));

      const _updadeSeekStartTime = async () => {
        console.log('[SHAKA___PLAYER', player)
        const _onFoward = (event: Event) => {
          setVideoCurrentTime(Math.floor(video.currentTime));
          player.updateStartTime(Math.floor(video.currentTime) + 10);
          console.log('[SHAKA___FOWARD clicou', event)
        };

        const _onRewind = (event: Event) => {
          setVideoCurrentTime(Math.floor(video.currentTime));
          player.updateStartTime(Math.floor(video.currentTime) - 10);
          console.log('[SHAKA___REWIND clicou', event)
        };

        try {
          if (props.label === 'foward') {
            console.log('[TRY_CATCH___FOWARD clicou', props.label, buttonFowardRef.current)
            buttonFowardRef.current.addEventListener("click", (e) => _onFoward(e));
          } else if (props.label === 'rewind') {
            console.log('[TRY_CATCH___REWIND clicou', props.label, buttonRewindRef.current)
            buttonRewindRef.current.addEventListener("click", (e) => _onRewind(e));
          }
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _updadeSeekStartTime()
    }
  }, [player, videoCurrentTime])
};

export default useButton;
