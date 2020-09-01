import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';

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
