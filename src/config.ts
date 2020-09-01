import { IAction, IConfig } from './interfaces';
import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';

const handEl = document.querySelector('.hand') as HTMLElement;
const donutEl = document.querySelector('.donut') as HTMLElement;
const batmanEl = document.querySelector('.batman') as HTMLElement;
const saitamaEl = document.querySelector('.saitama') as HTMLElement;
const rickEl = document.querySelector('.rick') as HTMLElement;
const chuckNorrisEl = document.querySelector('.chuck-norris') as HTMLElement;
const crashBandicootEl = document.querySelector('.crash-bandicoot') as HTMLElement;
const elonMuskEl = document.querySelector('.elon-musk') as HTMLElement;
const obamaEl = document.querySelector('.obama') as HTMLElement;

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
      el: 'batman',
      hidden: 'batman--hidden',
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
    el: handEl,
    id: 0,
    probability: 35,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    delay: DelaysEnum.TWO,
    el: handEl,
    id: 1,
    probability: 15,
    repeats: RepeatsEnum.ONE,
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    el: handEl,
    id: 2,
    probability: 10,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    el: handEl,
    id: 3,
    probability: 10,
    repeats: RepeatsEnum.TWO,
    speed: SpeedsEnum.FAST,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    el: donutEl,
    id: 4,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: config.classes.batman.container,
    delay: DelaysEnum.ONE,
    el: batmanEl,
    id: 5,
    probability: 5,
    repeats: RepeatsEnum.ONE,
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    el: saitamaEl,
    id: 6,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    el: rickEl,
    id: 7,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    el: chuckNorrisEl,
    id: 8,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    el: crashBandicootEl,
    id: 9,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    el: elonMuskEl,
    id: 10,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    el: obamaEl,
    id: 11,
    probability: 5,
    speed: SpeedsEnum.SLOW,
  },
].sort((a: IAction, b: IAction) => a.probability - b.probability);
