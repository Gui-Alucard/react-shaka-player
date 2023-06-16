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
  /**
 * Notifies the SDK whether the player intends to
 * continuously play the content videos one after
 * another similar to TV broadcast.
 * 
 * Changing this setting will have no impact on the ad playback,
 * but will send the appropriate signal in this ad request
 * to allow buyers to bid on the type of ad inventory.
 * 
 * @param abr [shaka.extern.AbrConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.AbrConfiguration)
 * @param abrFactory [shaka.extern.AbrManager.Factory](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.AbrManager.html#.Factory)
 * @param autoShowText [shaka.config.AutoShowText](https://shaka-player-demo.appspot.com/docs/api/shaka.config.AutoShowText.html)
 * @param cmcd [shaka.extern.CmcdConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.CmcdConfiguration)
 * @param drm [shaka.extern.DrmConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.DrmConfiguration)
 * @param lcevc [shaka.extern.LcevcConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.LcevcConfiguration)
 * @param manifest [shaka.extern.ManifestConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.ManifestConfiguration)
 * @param mediaSource [shaka.extern.MediaSourceConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.MediaSourceConfiguration)
 * @param offline [shaka.extern.OfflineConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.OfflineConfiguration)
 * @param playRangeEnd number
 * @param playRangeStart number
 * @param preferForcedSubs boolean
 * @param preferredAudioChannelCount number
 * @param preferredAudioCodecs string[]
 * @param preferredAudioLanguage string
 * @param preferredDecodingAttributes string[]
 * @param preferredTextLanguage string
 * @param preferredTextRole string
 * @param preferredVariantRole string
 * @param preferredVideoCodecs string[]
 * @param restrictions [shaka.extern.Restrictions](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.Restrictions)
 * @param streaming [shaka.extern.StreamingConfiguration](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.StreamingConfiguration)
 * @param textDisplayFactory [shaka.extern.TextDisplayer.Factory](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.TextDisplayer.html#.Factory)
 * 
 * Reference - [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/tutorial-config.html)
*/
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
  /**
 * Shaka Player provides an API for serving ads to make monetization easier for apps.
 * Our current API is tailored for our integration with the
 * [Interactive Media Ads](https://developers.google.com/interactive-media-ads?hl=pt-br) SDKs, but we plan to extend our support to other
 * ad providers in v3.1+.
 * 
 * Please note that the current API is likely to undergo significant changes as our support extends.
 * 
 * Reference - [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/tutorial-ad_monetization.html)
  */
  adsRequest?: IAdsRequest;
  adsTagUrl?: string;
  superConfig?: SuperConfig | undefined;
  /**
 * Once the UI is created, you can pass in configuration options that change
 * the look and functioning of the UI bar
 * For example, if you wanted to not have a seek bar, you could add the
 * following line to the init() function from the UI basic usage tutorial,
 * after creating the UI overlay:
 * 
 * ui.configure(uiConfig);
 *  
 * @param addBigPlayButton boolean
 * @param addSeekBar boolean
 * @param castAndroidReceiverCompatible boolean
 * @param castReceiverAppId string
 * @param clearBufferOnQualityChange boolean
 * @param contextMenuElements string[]
 * @param controlPanelElements string[]
 * @param customContextMenu boolean
 * @param doubleClickForFullscreen boolean
 * @param enableFullscreenOnRotation boolean
 * @param enableKeyboardPlaybackControls boolean
 * @param enableTooltips boolean
 * @param fadeDelay number
 * @param fastForwardRates number[]
 * @param forceLandscapeOnFullscreen boolean
 * @param keyboardSeekDistance number
 * @param overflowMenuButtons string[]
 * @param playbackRates number[]
 * @param rewindRates number[]
 * @param seekBarColors [shaka.extern.UISeekBarColors](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.UISeekBarColors)
 * @param showUnbufferedStart boolean
 * @param singleClickForPlayAndPause boolean
 * @param statisticsList string[]
 * @param trackLabelFormat [shaka.ui.Overlay.TrackLabelFormat](https://shaka-player-demo.appspot.com/docs/api/shaka.ui.Overlay.html#.TrackLabelFormat)
 * @param volumeBarColors [shaka.extern.UIVolumeBarColors](https://shaka-player-demo.appspot.com/docs/api/shaka.extern.html#.UIVolumeBarColors)
 *
 * Reference - [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/tutorial-ui-customization.html)
 */
  uiConfig?: ShakaExtern.UIConfiguration | any;
  unmute?: IUnmute;
  muted?: boolean;
  autoplay?: boolean;
};
