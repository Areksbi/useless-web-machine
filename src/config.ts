import { IAction, IConfig } from './interfaces';
import { ActionIdsEnum, AnimationsEnum, DelaysEnum, ProbabilitiesEnum, RepeatsEnum, SpeedsEnum } from './enums';

export const config: IConfig = {
  classes: {
    collision: {
      hidden: 'collision--hidden',
    },
    copyright: {
      el: 'copyright__date',
    },
  },
  initialBasicMoves: 2,
  timerDisappearImages: 500,
};

export const actions: IAction[] = [
  {
    id: ActionIdsEnum.HAND_BASE,
    probability: ProbabilitiesEnum.HAND_BASE,
    selector: '.hand',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    delay: DelaysEnum.TWO,
    id: ActionIdsEnum.HAND_FASTER,
    probability: ProbabilitiesEnum.HAND_FASTER,
    repeats: RepeatsEnum.ONE,
    selector: '.hand',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.HAND_SLOW,
    probability: ProbabilitiesEnum.HAND_SLOW,
    selector: '.hand',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.HAND_REPEAT,
    probability: ProbabilitiesEnum.HAND_REPEAT,
    repeats: RepeatsEnum.TWO,
    selector: '.hand',
    speed: SpeedsEnum.FAST,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.DONUT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.donut',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'batman__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.BATMAN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.batman',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SAITAMA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.saitama',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.RICK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.rick',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.CHUCK_NORRIS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.chuck-norris',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.CRASH_BANDICOOT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.crash-bandicoot',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.ELON_MUSK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.elon-musk',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.OBAMA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.obama',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.HARRY_POTTER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.harry-potter',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'james-bond__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.JAMES_BOND,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.james-bond',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.JOKER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.joker',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.IRON_MAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.iron-man',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.JACK_SPARROW,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jack-sparrow',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_DOWN,
    id: ActionIdsEnum.KILL_BILL,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.kill-bill',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'goku__container',
    delay: DelaysEnum.ZERO,
    gif: true,
    id: ActionIdsEnum.GOKU,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.goku',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    delay: DelaysEnum.ZERO,
    gif: true,
    id: ActionIdsEnum.JOHN_TRAVOLTA,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.john-travolta',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_UP,
    id: ActionIdsEnum.JACKIE_CHAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jackie-chan',
    speed: SpeedsEnum.FASTER,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'pick-of-destiny__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.PICK_OF_DESTINY,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.pick-of-destiny',
    speed: SpeedsEnum.SLOWER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.GINTOKI,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.gintoki',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.GROOT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.groot',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.LEVI,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.levi',
    speed: SpeedsEnum.FAST,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'riven__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.RIVEN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.riven',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.MINION,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.minion',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.JINX,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jinx',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SASUKE,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.sasuke',
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.TRUMP,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.trump',
    speed: SpeedsEnum.SLOW,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'matrix__container',
    delay: DelaysEnum.ZERO,
    gif: true,
    id: ActionIdsEnum.MATRIX,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.matrix',
    speed: SpeedsEnum.FASTER,
  },
];
