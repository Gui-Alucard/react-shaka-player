import { Player as ShakaPlayer, extern as ShakaExtern } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IMouseEvent, IPlayerProps } from "../types";

const usePlayerListener = (player: ShakaPlayer, props?: IPlayerProps) => {

  useEffect(() => {
    const _onPlayerErrorEvent = (error: ShakaExtern.Error | any) => {
      props.onPlayerError && props.onPlayerError(error);
    }
    const _onBufferingEvent = (bufferStatus: any) => {
      const boolOfBuffering: boolean = bufferStatus.buffering
      props.onBuffering && props.onBuffering(boolOfBuffering);
    };
    const _onMouseMove = (event: IMouseEvent) => {
      props.onMouseMove && props.onMouseMove(event);
    };
    const _onMouseOver = (event: IMouseEvent) => {
      props.onMouseOver && props.onMouseOver(event);
    };

    if (player) {
      player.addEventListener("error", _onPlayerErrorEvent);
      player.addEventListener("buffering", _onBufferingEvent);
      player.addEventListener("onmousemove", (event) => _onMouseMove(event));
      player.addEventListener("onmouseover", (event) => _onMouseOver(event));
    }
  }, [player]);
};

export default usePlayerListener;
