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
  onBuffering?(event: boolean): void | undefined;
  onEnded?(event?: Event): void | undefined;
  onClose?(event?: Event): void | undefined;
  onError?(event?: ErrorEvent): void | undefined;
  onLoad?(data: IPlayerRefs): void | undefined;
  onPause?(event?: IClickEvent): void | undefined;
  onPlay?(event?: IClickEvent): void | undefined;
  onPlaying?(event?: Event): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onStatsChange?(stats: IStats): void | undefined;
  onTimeUpdate?(event?: Event): void | undefined;
  onVolumeChange?(event?: Event): void | undefined;
  onSeeked?(event?: Event): void | undefined;
  playerClassName?: string;
  playsInline?: boolean | undefined;
  src?: string;
  adsRequest?: google.ima.AdsRequest | undefined;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
};
