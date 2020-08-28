export interface IAction {
  action: () => void;
  probability: number;
}

export interface IChance {
  active: number;
  total: number;
}
