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

type IStats = IMediaStatsTime & ShakaExtern.Stats;
export type IMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | Event;
export type ITouchEvent = React.TouchEvent<HTMLDivElement> | Event;
export type IClickEvent = React.SyntheticEvent<HTMLDivElement, Event> | React.SyntheticEvent<HTMLVideoElement, Event> | Event;

export interface IPlayerProps {
  autoPlay?: boolean | undefined;
  children?: any;
  className?: string;
  config?: ShakaExtern.PlayerConfiguration | any;
  onBuffering?(event: boolean): void | undefined;
  onEnded?(event?: IClickEvent): void | undefined;
  onLoad?(data: IPlayerRefs): void | undefined;
  onMouseOver?(event?: IMouseEvent): void | undefined;
  onPause?(event?: IClickEvent): void | undefined;
  onPlay?(event?: IClickEvent): void | undefined;
  onPlaying?(event?: IClickEvent): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onStatsChange?(stats: IStats): void | undefined;
  onTouchStart?(event?: ITouchEvent): void | undefined;
  playerClassName?: string;
  playsInline?: boolean | undefined;
  src?: string;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
};
