export interface IAction {
  action: () => void;
  id: number;
  probability: number;
}

export interface IChance {
  active: number;
  total: number;
}
