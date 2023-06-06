import { Player as ShakaPlayer, ui as ShakaUI, extern as ShakaExtern } from 'shaka-player/dist/shaka-player.ui';
import { SuperConfig } from './enum';

interface IUnmute {
  p?: string;
  onUnmute?: React.MouseEventHandler<HTMLButtonElement>;
};

export interface IMediaStatsTime {
  mediaCurrentTime: number | undefined;
  mediaEndTime: number | undefined;
};

export interface IPlayerRefs {
  player: ShakaPlayer;
  ui: ShakaUI.Overlay;
  videoElement: HTMLVideoElement;
};

export type IStats = IMediaStatsTime & ShakaExtern.Stats;

export interface IOMIDAccessModeRules {
  // Open Measurement Interface Definition OMID
  // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/omsdk
  FULL?: string;
  CREATIVE?: string;
  DOMAIN?: string;
  LIMITED?: string;
}

export interface IAdsRequest {
  // https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest
  adTagUrl: string;
  /**
   * Specifies a VAST 2.0 document to be used as the ads
   * response instead of making a request through an ad tag url.
   * This can be useful for debugging and other situations
   * where a VAST response is already available.
   * 
   * @type {string | !Document}
   * @param adsResponse 
   * 
   * [IMA SDK Reference](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/omsdk#access_modes)
  */
  adsResponse?: string | NonNullable<Document> | null;
  contentDuration?: number | null;
  contentKeywords?: NonNullable<string[]> | null;
  contentTitle?: string | null;
  forceNonLinearFullSlot?: boolean;
  linearAdSlotHeight: number;
  linearAdSlotWidth: number;
  liveStreamPrefetchSeconds?: number;
  nonLinearAdSlotHeight: number;
  nonLinearAdSlotWidth: number;
  /**
   * The OM SDK supports running verification scripts
   * in different access modes, which control how much
   * the verification script can access.
   * 
   * The four access modes are:
   * @param FULL string.
   * @param CREATIVE string.
   * @param DOMAIN string.
   * @param LIMITED string.
   * 
   * [IMA SDK Reference](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/omsdk#access_modes)
  */
  omidAccessModeRules?: NonNullable<IOMIDAccessModeRules>;
  pageUrl?: string | null;
  vastLoadTimeout?: number;
  /**
   * Notifies the SDK whether the player intends to start
   * the content and ad in response to a user action or whether
   * it will be automatically played.
   * Changing this setting will have no impact on ad playback.
   * @param autoPlay boolean.
   * 
   * [IMA SDK Reference](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest#setAdWillAutoPlay)
  */
  setAdWillAutoPlay?(autoPlay: boolean): void;
  /**
   * Notifies the SDK whether the player intends to start
   * ad while muted. Changing this setting will have no impact
   * on ad playback, but will send the appropriate signal
   * in the ad request to allow buyers to bid on muted inventory.
   * @param muted boolean.
   * 
   * [IMA SDK Reference](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest#setAdWillPlayMuted)
  */
  setAdWillPlayMuted?(muted: boolean): void;
  /**
   * Notifies the SDK whether the player intends to
   * continuously play the content videos one after
   * another similar to TV broadcast.
   * 
   * Changing this setting will have no impact on the ad playback,
   * but will send the appropriate signal in this ad request
   * to allow buyers to bid on the type of ad inventory.
   * @param continuousPlayback boolean.
   * 
   * [IMA SDK Reference](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest#setContinuousPlayback)
  */
  setContinuousPlayback?(continuousPlayback: boolean): void;
}

export interface IPlayerProps {
  children?: any;
  className?: string;
  config?: ShakaExtern.PlayerConfiguration | any;
  onFoward?: React.MouseEventHandler<HTMLButtonElement>;
  onRewind?: React.MouseEventHandler<HTMLButtonElement>;
  onBuffering?(event: boolean): void | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onLoad?(data: IPlayerRefs): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onStatsChange?(stats: IStats): void | undefined;
  onTimeUpdate?(event?: Event): void | undefined;
  onUiInteraction?(event?: Event): void | undefined;
  playerClassName?: string;
  src?: string;
  startTime?: number;
  adsRequest?: IAdsRequest;
  adsTagUrl?: string;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
  unmute?: IUnmute;
  muted?: boolean;
  autoplay?: boolean;
};
