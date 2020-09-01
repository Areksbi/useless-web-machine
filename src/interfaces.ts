import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';

export interface IAction {
  el: HTMLElement;
  id: number;
  probability: number;
  animation?: AnimationsEnum;
  container?: string;
  delay?: DelaysEnum;
  speed?: SpeedsEnum;
  repeats?: RepeatsEnum;
}

export interface IChance {
  active: number;
  total: number;
}

export interface IClass {
  container?: string;
  el?: string;
  hidden?: string;
}

export interface IConfig {
  chances: {
    [key: string]: IChance;
  };
  classes: {
    [key: string]: IClass;
  };
  [key: string]: any;
}
