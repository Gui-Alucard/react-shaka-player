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
  onEnded?(event?: IClickEvent): void | undefined;
  onLoad?(data: IPlayerRefs): void | undefined;
  /**
  * Fires when the mouse move over the object.
  * @param event The mouse event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#mouseevent-handler)
  */
  onMouseOver?(event?: IMouseEvent): void | undefined;
  /**
  * Fires when the video is paused.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onPause?(event?: IClickEvent): void | undefined;
  /**
  * Fires when the video start.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onPlay?(event?: IClickEvent): void | undefined;
  /**
  * Fires when the video is playing.
  * @param event The synthetic event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#react-event-object)
  */
  onPlaying?(event?: IClickEvent): void | undefined;
  onPlayerError?(event: ShakaExtern.Error): void | undefined;
  onStatsChange?(stats: IStats): void | undefined;
  /**
  * To provide quality support for touch-based user
  * interfaces touch events offer the ability to
  * interpret finger (or stylus) activity on touch
  * screens or trackpads.
  * @param event The touch event.
  *
  * [React Reference](https://react.dev/reference/react-dom/components/common#touchevent-handler)
  */
  onTouchStart?(event?: ITouchEvent): void | undefined;
  onMouseEnter?(event?: IMouseEvent): void | undefined;
  onMouseLeave?(event?: IMouseEvent): void | undefined;
  onFocus?(event?: IFocus): void | undefined;
  onBlur?(event?: IFocus): void | undefined;
  onTimeUpdate?(event?: Event): void | undefined;
  playerClassName?: string;
  playsInline?: boolean | undefined;
  src?: string;
  superConfig?: SuperConfig | undefined;
  uiConfig?: ShakaExtern.UIConfiguration | any;
};
