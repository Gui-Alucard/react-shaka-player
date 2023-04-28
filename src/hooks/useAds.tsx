import { Player as ShakaPlayer } from "shaka-player/dist/shaka-player.ui";
import { useEffect } from "react";

import { IPlayerProps } from "../types";

const useStats = (player: ShakaPlayer, adHTMLElement: HTMLElement | null, props?: IPlayerProps) => {
  const { adsRequest } = props;
  useEffect(() => {
    if (player && adHTMLElement) {
      const adManager = player.getAdManager();
      const video = player.getMediaElement()

      const _streamRequest = async () => {
        adManager.initServerSide(adHTMLElement, video);
        const uri = await adManager.requestClientSideAds(adsRequest)
        player.load(uri);
      }

      if (adsRequest) {
        _streamRequest();
      }
    }
  }, [player, adsRequest]);
};

export default useStats;
