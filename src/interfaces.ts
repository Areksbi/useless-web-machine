export interface IAction {
  action: () => void;
  id: number;
  probability: number;
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
