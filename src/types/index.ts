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

export interface IPlayerProps {
  children?: any;
  className?: string;
  config?: ShakaExtern.PlayerConfiguration | any;
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
  label?: string;
  ads?: google.ima.AdsRequest | undefined;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
};
