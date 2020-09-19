export enum GenresEnum {
  ANIME,
  CARTOON,
  GAME,
  MOVIE,
  RANDOM,
}

export enum SpeedsEnum {
  SLOW = 'slow',
  SLOWER = 'slower',
  FAST = 'fast',
  FASTER = 'faster',
}

export enum DelaysEnum {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export enum RepeatsEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export enum AnimationsEnum {
  BOUNCE_IN_DOWN = 'bounceInDown',
  BOUNCE_IN_LEFT = 'bounceInLeft',
  BOUNCE_IN_RIGHT = 'bounceInRight',
  BOUNCE_IN_UP = 'bounceInUP',

  FADE_IN = 'fadeIn',
  FADE_IN_DOWN = 'fadeInDown',
  FADE_IN_LEFT = 'fadeinLeft',
  FADE_IN_RIGHT = 'fadeInRight',
  FADE_IN_UP = 'fadeInUp',
}

// Must be unique values
export enum ActionIdsEnum {
  HAND_BASE = 0,
  HAND_FASTER = 1,
  HAND_SLOW = 2,
  HAND_REPEAT = 3,
  DONUT = 4,
  BATMAN = 5,
  SAITAMA = 6,
  RICK = 7,
  CHUCK_NORRIS = 8,
  CRASH_BANDICOOT = 9,
  ELON_MUSK = 10,
  OBAMA = 11,
  HARRY_POTTER = 12,
  JAMES_BOND = 13,
  JOKER = 14,
  IRON_MAN = 15,
  JACK_SPARROW = 16,
  KILL_BILL = 17,
  GOKU = 18,
  JOHN_TRAVOLTA = 19,
  JACKIE_CHAN = 20,
  PICK_OF_DESTINY = 21,
  GINTOKI = 22,
  GROOT = 23,
  LEVI = 24,
  RIVEN = 25,
  MINION = 26,
  JINX = 27,
  SASUKE = 28,
  TRUMP = 29,
  JOHNNY_SINS = 30,
  LARA_CROFT = 31,
  DEVIL_MAY_CRY = 32,
  BREAKING_BAD = 33,
  DEATH_NOTE = 34,
  CLOUD_VS_SEPHIROTH = 35,
  ADVENTURE_TIME = 36,
  PABLO_ESCOBAR = 37,
  TIMMY_TURNER = 38,
  SHREK = 39,
  LEONARDO_DICAPRIO = 40,
  SORA = 41,
  JOTARU = 42,
  PHINEAS_AND_FERB = 43,
  MATRIX = 44,
  POWER_RANGERS = 45,
  INUYASHA = 46,
  SPIDER_MAN = 47,
  DUCK_WITH_KNIFE = 48,
  ROOSTER_WITH_KNIFE = 49,
  LUFFY = 50,
  SOLID_SNAKE = 51,
  NEMESIS = 52,
  LINK = 53,
  DARTH_VADER = 54,
  RAMBO = 55,
  MARTY = 56,
  TERMINATOR = 57,
  HARTMAN = 58,
  LEGOLAS = 59,
  THOR = 60,
  SHINING = 61,
  MR_BEAN = 62,
  THE_MASK = 63,
  OLAF = 64,
  WALL_E = 65,
  THIS_IS_SPARTA = 66,
  LEGO = 67,
  GENIE = 68,
  NOKIA_3310 = 69,
  FULLMETAL_ALCHEMIST = 70,
  MY_HERO_ACADEMIA = 71,
  BLACK_ROCK_SHOOTER = 72,
  KIM_JONG_UN = 73,
  JEFF_BEZOS = 74,
  EINSTEIN = 75,
  MARSHALL_LAW = 76,
  MICHEAL_JORDAN = 77,
  TETRIS = 78,
  AREKSBI_SBRAZO = 79,
  CHARIZARD = 80,
  NIER = 81,
  SUPER_MARIO = 82,
  GOT = 83,

  SURRENDER = 101,
}

// Must be unique values with sum 100(%)
export enum ProbabilitiesEnum {
  HAND_BASE = 30,
  HAND_FASTER = 15,
  HAND_SLOW = 8,
  HAND_REPEAT = 12,

  IMAGE = 25,
  FULL_SCREEN = 6,
  GIF = 4,

  SURRENDER = 0,
}
