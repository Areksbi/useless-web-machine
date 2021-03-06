import { IAction, IConfig } from './interfaces';
import { ActionIdsEnum, AnimationsEnum, DelaysEnum, ProbabilitiesEnum, RepeatsEnum, SpeedsEnum, TypesEnum } from './enums';

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
  surrenderOn: 1000,
  timerDisappearImages: 500,
};

export const actions: IAction[] = [
  {
    id: ActionIdsEnum.HAND_BASE,
    probability: ProbabilitiesEnum.HAND_BASE,
    selector: '.hand',
    type: TypesEnum.HAND,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    delay: DelaysEnum.TWO,
    id: ActionIdsEnum.HAND_FASTER,
    probability: ProbabilitiesEnum.HAND_FASTER,
    repeats: RepeatsEnum.ONE,
    selector: '.hand',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.HAND,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.HAND_SLOW,
    probability: ProbabilitiesEnum.HAND_SLOW,
    selector: '.hand',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.HAND,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.HAND_REPEAT,
    probability: ProbabilitiesEnum.HAND_REPEAT,
    repeats: RepeatsEnum.TWO,
    selector: '.hand',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.HAND,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.DONUT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.donut',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
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
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SAITAMA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.saitama',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.RICK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.rick',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.CHUCK_NORRIS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.chuck-norris',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.CRASH_BANDICOOT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.crash-bandicoot',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.ELON_MUSK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.elon-musk',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.OBAMA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.obama',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.HARRY_POTTER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.harry-potter',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
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
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.JOKER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.joker',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.IRON_MAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.iron-man',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.JACK_SPARROW,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jack-sparrow',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_DOWN,
    id: ActionIdsEnum.KILL_BILL,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.kill-bill',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'goku__container',
    gif: true,
    id: ActionIdsEnum.GOKU,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.goku',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    gif: true,
    id: ActionIdsEnum.JOHN_TRAVOLTA,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.john-travolta',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_UP,
    id: ActionIdsEnum.JACKIE_CHAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jackie-chan',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
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
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.GINTOKI,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.gintoki',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.GROOT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.groot',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.LEVI,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.levi',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'riven__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.RIVEN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.riven',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.MINION,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.minion',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.JINX,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jinx',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SASUKE,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.sasuke',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.TRUMP,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.trump',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'matrix__container',
    gif: true,
    id: ActionIdsEnum.MATRIX,
    probability: ProbabilitiesEnum.GIF,
    repeats: RepeatsEnum.ONE,
    selector: '.matrix',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.JOHNNY_SINS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.johnny-sins',
    speed: SpeedsEnum.SLOWER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.LARA_CROFT,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.lara-croft',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'devil-may-cry__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.DEVIL_MAY_CRY,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    repeats: RepeatsEnum.ONE,
    selector: '.devil-may-cry',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN_DOWN,
    id: ActionIdsEnum.BREAKING_BAD,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.breaking-bad',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'death-note__container',
    gif: true,
    id: ActionIdsEnum.DEATH_NOTE,
    probability: ProbabilitiesEnum.GIF,
    selector: '.death-note',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'cloud-vs-sephiroth__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.CLOUD_VS_SEPHIROTH,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.cloud-vs-sephiroth',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.ADVENTURE_TIME,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.adventure-time',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.PABLO_ESCOBAR,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.pablo-escobar',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.TIMMY_TURNER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.timmy-turner',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_LEFT,
    id: ActionIdsEnum.SHREK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.shrek',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.LEONARDO_DICAPRIO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.leonardo-dicaprio',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SORA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.sora',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.JOTARU,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jotaru',
    speed: SpeedsEnum.SLOWER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.PHINEAS_AND_FERB,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.phineas-and-ferb',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'power-rangers__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.POWER_RANGERS,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.power-rangers',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.INUYASHA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.inuyasha',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'spider-man__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.SPIDER_MAN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.spider-man',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.DUCK_WITH_KNIFE,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.duck-with-knife',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.ROOSTER_WITH_KNIFE,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.rooster-with-knife',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_DOWN,
    id: ActionIdsEnum.LUFFY,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.luffy',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'surrender__container',
    gif: true,
    id: ActionIdsEnum.SURRENDER,
    probability: ProbabilitiesEnum.SURRENDER,
    selector: '.surrender',
    speed: SpeedsEnum.SLOWER,
    type: TypesEnum.SURRENDER,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SOLID_SNAKE,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.solid-snake',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.NEMESIS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.nemesis',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.LINK,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.link',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.DARTH_VADER,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.darth-vader',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.RAMBO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.rambo',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.MARTY,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.marty',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'terminator__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.TERMINATOR,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.terminator',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.HARTMAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.hartman',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.LEGOLAS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.legolas',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_DOWN,
    id: ActionIdsEnum.THOR,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.thor',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.SHINING,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.shining',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.MR_BEAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.mr-bean',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'the-mask__container',
    gif: true,
    id: ActionIdsEnum.THE_MASK,
    probability: ProbabilitiesEnum.GIF,
    selector: '.the-mask',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.OLAF,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.olaf',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'wall-e__container',
    gif: true,
    id: ActionIdsEnum.WALL_E,
    probability: ProbabilitiesEnum.GIF,
    selector: '.wall-e',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'this-is-sparta__container',
    gif: true,
    id: ActionIdsEnum.THIS_IS_SPARTA,
    probability: ProbabilitiesEnum.GIF,
    selector: '.this-is-sparta',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.LEGO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.lego',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.GENIE,
    probability: ProbabilitiesEnum.IMAGE,
    repeats: RepeatsEnum.THREE,
    selector: '.genie',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.NOKIA_3310,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.nokia-3310',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.FULLMETAL_ALCHEMIST,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.fullmetal-alchemist',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.MY_HERO_ACADEMIA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.my-hero-academia',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'black-rock-shooter__container',
    delay: DelaysEnum.ONE,
    id: ActionIdsEnum.BLACK_ROCK_SHOOTER,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.black-rock-shooter',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.KIM_JONG_UN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.kim-jong-un',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.JEFF_BEZOS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.jeff-bezos',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.EINSTEIN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.einstein',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.MARSHALL_LAW,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.marshall-law',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.MICHEAL_JORDAN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.micheal-jordan',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_DOWN,
    id: ActionIdsEnum.TETRIS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.tetris',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_UP,
    id: ActionIdsEnum.AREKSBI_SBRAZO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.areksbi-sbrazo',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'charizard__container',
    gif: true,
    id: ActionIdsEnum.CHARIZARD,
    probability: ProbabilitiesEnum.GIF,
    selector: '.charizard',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'nier__container',
    gif: true,
    id: ActionIdsEnum.NIER,
    probability: ProbabilitiesEnum.GIF,
    selector: '.nier',
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_UP,
    id: ActionIdsEnum.SUPER_MARIO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.super-mario',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'got__container',
    id: ActionIdsEnum.GOT,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.got',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'superman__container',
    id: ActionIdsEnum.SUPERMAN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.superman',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.GRETA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.greta',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_LEFT,
    id: ActionIdsEnum.PUTIN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.putin',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'nightmare__container',
    id: ActionIdsEnum.NIGHTMARE,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.nightmare',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'alien__container',
    id: ActionIdsEnum.ALIEN,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.alien',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'undertaker__container',
    gif: true,
    id: ActionIdsEnum.UNDERTAKER,
    probability: ProbabilitiesEnum.GIF,
    selector: '.undertaker',
    speed: SpeedsEnum.SLOW,
    type: TypesEnum.GIF,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.LUPIN,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.lupin',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.PEPPA_PIG,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.peppa-pig',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_UP,
    id: ActionIdsEnum.DARK_SOULS,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.dark-souls',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.MARK_ZUCKERBERG,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.mark-zuckerberg',
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN_RIGHT,
    id: ActionIdsEnum.TORADORA,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.toradora',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.MR_BUBZ,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.mr-bubz',
    speed: SpeedsEnum.FASTER,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.FADE_IN,
    container: 'spongebob__container',
    id: ActionIdsEnum.SPONGEBOB,
    probability: ProbabilitiesEnum.FULL_SCREEN,
    selector: '.spongebob',
    type: TypesEnum.FULL_SCREEN,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_LEFT,
    id: ActionIdsEnum.PSY,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.psy',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.MICHAEL_JACKSON,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.michael-jackson',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
  {
    animation: AnimationsEnum.BOUNCE_IN_RIGHT,
    id: ActionIdsEnum.ROBERTO,
    probability: ProbabilitiesEnum.IMAGE,
    selector: '.roberto',
    speed: SpeedsEnum.FAST,
    type: TypesEnum.IMAGE,
  },
];
