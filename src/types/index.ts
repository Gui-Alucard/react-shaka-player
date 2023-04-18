import { Player as ShakaPlayer, ui as ShakaUI, extern as ShakaExtern } from 'shaka-player/dist/shaka-player.ui';
import { SuperConfig } from './enum';

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
export type IMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | Event;
export type ITouchEvent = React.TouchEvent<HTMLDivElement> | Event;
export type IClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.SyntheticEvent<HTMLVideoElement, Event> | Event;
export type IFocus = React.FocusEvent<HTMLDivElement, Element> | Event;

export interface IPlayerProps {
  autoPlay?: boolean | undefined;
  children?: any;
  className?: string;
  config?: ShakaExtern.PlayerConfiguration | any;
  /**
   * Fires when the video start buffering.
   * @param event The boolean event.
   * 
   * [SHAKA Reference](https://shaka-player-demo.appspot.com/docs/api/tutorial-network-and-buffering-config.html)
  */
  onBuffering?(event: boolean): void | undefined;
  /**
  * Fires when the video ends.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onEnded?(event?: Event, stats?: IStats): void | undefined;
  onClose?(event?: Event, stats?: IStats): void | undefined;
  onError?(event?: ErrorEvent, stats?: IStats): void | undefined;
  onLoad?(data: IPlayerRefs): void | undefined;
  /**
  * Fires when the video is paused.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onPause?(event?: IClickEvent, stats?: IStats): void | undefined;
  /**
  * Fires when the video start.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onPlay?(event?: IClickEvent, stats?: IStats): void | undefined;
  onPlaying?(event?: Event, stats?: IStats): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onStatsChange?(stats: IStats, event?: any): void | undefined;
  onTimeUpdate?(event?: Event, stats?: IStats): void | undefined;
  onVolumeChange?(event?: Event, stats?: IStats): void | undefined;
  onSeeked?(event?: Event, stats?: IStats): void | undefined;
  playerClassName?: string;
  playsInline?: boolean | undefined;
  src?: string;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
};
