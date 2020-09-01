import { IAction, IConfig } from './interfaces';
import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';

export const config: IConfig = {
  chances: {
    mousemove: {
      active: 0,
      total: 100,
    },
  },
  classes: {
    batman: {
      container: 'batman__container',
    },
    collision: {
      hidden: 'collision--hidden',
    },
    copyright: {
      el: 'copyright__date',
    },
  },
  distanceMinToTriggerAction: 50,
  initialBasicMoves: 2,
  timerDisappearImages: 500,
};

export const actions: IAction[] = [
  {
    id: 0,
    probability: 35,
    selector: '.hand',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    delay: DelaysEnum.TWO,
    id: 1,
    probability: 15,
    repeats: RepeatsEnum.ONE,
    selector: '.hand',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: 2,
    probability: 10,
    selector: '.hand',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: 3,
    probability: 10,
    repeats: RepeatsEnum.TWO,
    selector: '.hand',
    speed: SpeedsEnum.FAST,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: 4,
    probability: 5,
    selector: '.donut',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: config.classes.batman.container,
    delay: DelaysEnum.ONE,
    id: 5,
    probability: 5,
    repeats: RepeatsEnum.ONE,
    selector: '.batman',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: 6,
    probability: 5,
    selector: '.saitama',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: 7,
    probability: 5,
    selector: '.rick',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: 8,
    probability: 5,
    selector: '.chuck-norris',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: 9,
    probability: 5,
    selector: '.crash-bandicoot',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: 10,
    probability: 5,
    selector: '.elon-musk',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: 11,
    probability: 5,
    selector: '.obama',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: 12,
    probability: 5,
    selector: '.harry-potter',
    speed: SpeedsEnum.SLOW,
  },
].sort((a: IAction, b: IAction) => a.probability - b.probability);
