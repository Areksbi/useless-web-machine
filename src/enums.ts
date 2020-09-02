export enum SpeedsEnum {
  SLOW = 'slow',
  SLOWER = 'slower',
  FAST = 'fast',
  FASTER = 'faster',
}

export enum DelaysEnum {
  ZERO = 0,
  ONE = 1, // Standard for body background-color (look at: styles.scss > body > transition)
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
  MATRIX = 29,
  JOHNNY_SINS = 30,
  LARA_CROFT = 30,
}

// Must be unique values with sum 100(%)
export enum ProbabilitiesEnum {
  HAND_BASE = 30,
  HAND_FASTER = 15,
  HAND_SLOW = 8,
  HAND_REPEAT = 12,

  IMAGE = 20,
  FULL_SCREEN = 10,
  GIF = 5,
}
