import { useEffect, useState } from "react";
import { IUseButton } from "../types";

const useButton = ({ videoElement, props, buttonRef }: IUseButton) => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<number | null>(0);

  useEffect(() => {
    if (videoElement && props.label) {
      console.log('[SHAKA___ ENTROU VIDEO ELEMENT', videoElement)
      setVideoCurrentTime(Math.floor(videoElement.currentTime));

      const _updadeSeekTime = async () => {
        console.log('[SHAKA___ CURRENT TIME', videoElement.currentTime)
        const _onFoward = (event: Event) => {
          videoElement.currentTime = Math.floor(videoElement.currentTime) + 10;
          setVideoCurrentTime(Math.floor(videoElement.currentTime));
          console.log('[SHAKA___FOWARD clicou', event)
        };

        const _onRewind = (event: Event) => {
          videoElement.currentTime = Math.floor(videoElement.currentTime) - 10;
          setVideoCurrentTime(Math.floor(videoElement.currentTime));
          console.log('[SHAKA___REWIND clicou', event)
        };

        try {
          if (props.label === 'foward') {
            console.log('[TRY_CATCH___FOWARD clicou', props.label, buttonRef.current)
            buttonRef.current.addEventListener("click", (e) => _onFoward(e));
          } else if (props.label === 'rewind') {
            console.log('[TRY_CATCH___REWIND clicou', props.label, buttonRef.current)
            buttonRef.current.addEventListener("click", (e) => _onRewind(e));
          }
        } catch (error) {
          props.onPlayerError && props.onPlayerError(error);
        }
      };
      _updadeSeekTime()
    }
  }, [videoElement, videoCurrentTime])
};

export default useButton;