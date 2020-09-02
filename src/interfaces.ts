import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';

export interface IStatCounter {
  current: number;
  name: string;
  target: number;
}

export interface IAction {
  id: number;
  probability: number;
  selector: string;
  animation?: AnimationsEnum;
  container?: string;
  delay?: DelaysEnum;
  gif?: boolean;
  speed?: SpeedsEnum;
  repeats?: RepeatsEnum;
}

interface IClass {
  container?: string;
  el?: string;
  hidden?: string;
}

export interface IConfig {
  classes: {
    [key: string]: IClass;
  };
  [key: string]: any;
}

export interface ISuperGifOptions {
  gif: HTMLElement;
  auto_play?: boolean;
  draw_while_loading?: boolean;
  loop_delay?: number; // ms
  loop_mode?: boolean;
  max_width?: number;
  on_end?: () => void;
  show_progress_bar?: boolean;
}
