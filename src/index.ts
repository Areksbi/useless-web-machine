import './styles.scss';

import { MDCSwitch } from '@material/switch';
import { MDCSnackbar } from '@material/snackbar';

// region Interfaces
interface IAction {
  action: () => void;
  probability: number;
}

interface IChance {
  active: number;
  total: number;
}
// endregion Interfaces

// region Enums
enum SpeedsEnum {
  SLOW = 'slow',
  SLOWER = 'slower',
  FAST = 'fast',
  FASTER = 'faster',
}

enum DelaysEnum {
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

enum RepeatsEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

enum AnimationsEnum {
  BOUNCE_IN_LEFT = 'bounceInLeft',
  BOUNCE_IN_RIGHT = 'bounceInRight',
  BOUNCE_IN_UP = 'bounceInUP',

  FADE_IN_DOWN = 'fadeInDown',
  FADE_IN_UP = 'fadeInUp',
}
// endregion Enums

function init() {
  let actionCounter = 0;
  let handEl = document.querySelector('.hand') as HTMLElement;
  let donutEl = document.querySelector('.donut') as HTMLElement;
  let isMouseFarEnough = false;
  let switchControl: MDCSwitch;
  let switchEl: HTMLInputElement | null;

  if (!handEl || !donutEl) return;

  // region Configs
  const config: { chances: { [key: string]: IChance }; [key: string]: any } = {
    chances: {
      mousemove: {
        active: 0,
        total: 100,
      },
    },
    distanceMinToTriggerAction: 50,
    initialBasicMoves: 2,
    timerDisappearImages: 500,
  };

  const actionsOnClick: IAction[] = [
    {
      action: () => triggerAction(handEl),
      probability: 65,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.FASTER, RepeatsEnum.ONE, DelaysEnum.TWO),
      probability: 25,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.SLOW),
      probability: 10,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.FAST, RepeatsEnum.TWO),
      probability: 10,
    },
    {
      action: () => triggerAction(donutEl, AnimationsEnum.FADE_IN_UP, SpeedsEnum.SLOW),
      probability: 5,
    },
  ].sort((a: IAction, b: IAction) => a.probability + b.probability);
  // endregion Configs

  function calculateDistance(elem: HTMLElement, mouseX: number, mouseY: number): number {
    const rect = elem.getBoundingClientRect();
    return Math.floor(
      Math.sqrt(Math.pow(mouseX - (rect.left + elem.offsetWidth / 2), 2) + Math.pow(mouseY - (rect.top + elem.offsetHeight / 2), 2))
    );
  }

  function getRandomProbabilities(multiplier: number = 100): number {
    return Math.floor(Math.random() * multiplier);
  }

  function randomMousemoveAction(): void {
    setTimeout(() => {
      switchControl.disabled = false;
      setSwitchOff();
    }, 1000);
    console.log('randomMousemoveAction');
  }

  function manageFirstMousemove(): void {
    if (!window.sessionStorage.getItem('isFirstMousemove')) {
      const snackbarEl = document.querySelector('.mdc-snackbar');
      if (!snackbarEl) return;

      const snackbar = new MDCSnackbar(snackbarEl);
      snackbar.open();

      window.sessionStorage.setItem('isFirstMousemove', 'false');
    }
  }

  function manageMousemoveAction(evt: MouseEvent): void {
    if (!switchEl) return;

    const mX = evt.pageX;
    const mY = evt.pageY;
    const distance = calculateDistance(switchEl, mX, mY);

    if (distance > config.distanceMinToTriggerAction) isMouseFarEnough = true;
    if (distance < config.distanceMinToTriggerAction && !isMouseFarEnough) return;

    randomMousemoveAction();

    document.removeEventListener('mousemove', manageMousemoveAction);
    isMouseFarEnough = false;
  }

  function setSwitchOff(): void {
    const collisionEl = document.querySelector('.collision');
    if (!collisionEl) return;

    collisionEl.classList.remove('collision--hidden');

    setTimeout(() => {
      collisionEl.classList.add('collision--hidden');
      switchControl.checked = false;
    }, config.timerDisappearImages);
  }

  function handleAnimations(
    elem: HTMLElement | null,
    speed: SpeedsEnum | undefined,
    repeats: RepeatsEnum | undefined,
    delay: DelaysEnum | undefined,
    animation: AnimationsEnum
  ) {
    if (!elem) return;

    const hiddenClass = Array.from(elem.classList).find((className: string) => className.endsWith('--hidden'));
    if (!hiddenClass) return;
    elem.classList.remove(hiddenClass);
    elem.classList.add(
      `animate__${speed}`,
      `animate__repeat-${repeats}`,
      `animate__delay-${delay}s`,
      'animate__animated',
      `animate__${animation}`
    );

    function onEndAnimationEnd() {
      if (!elem) return;

      elem.classList.remove(`animate__${speed}`, 'animate__animated', `animate__${animation}`, 'alternate-animation');
      elem.removeEventListener('animationend', onEndAnimationEnd);

      if (!hiddenClass) return;
      elem.classList.add(hiddenClass);

      switchControl.disabled = false;
    }

    function onStartAnimationEnd() {
      setSwitchOff();

      if (!elem) return;

      setTimeout(() => {
        elem.classList.remove(`animate__${animation}`, `animate__repeat-${repeats}`, `animate__delay-${delay}s`);
        elem.removeEventListener('animationend', onStartAnimationEnd);

        setTimeout(() => {
          elem.classList.add('alternate-animation', `animate__${animation}`);
          elem.addEventListener('animationend', onEndAnimationEnd);
        }, 0);
      }, config.timerDisappearImages);
    }

    elem.addEventListener('animationend', onStartAnimationEnd);
  }

  // region Animations on click
  function triggerAction(
    elem: HTMLElement | null,
    animation: AnimationsEnum = AnimationsEnum.BOUNCE_IN_RIGHT,
    speed?: SpeedsEnum,
    repeats?: RepeatsEnum,
    delay?: DelaysEnum
  ): void {
    if (!elem) return;

    const src = elem.dataset.src;
    if (src && !elem.getAttribute('src')) {
      const onImageLoad = () => {
        handleAnimations(elem, speed, repeats, delay, animation);
        elem.removeEventListener('load', onImageLoad);
      };
      elem.addEventListener('load', onImageLoad);
      elem.setAttribute('src', src);
      return;
    }

    handleAnimations(elem, speed, repeats, delay, animation);
  }
  // endregion Animations on click

  function randomClickAction(): void {
    if (actionCounter <= config.initialBasicMoves) {
      triggerAction(handEl);
      return;
    }

    const totalProbabilities = actionsOnClick.reduce((acc, curr) => acc + curr.probability, 0);
    const probabilityToTrigger = getRandomProbabilities(totalProbabilities);

    let sum = 0;
    let previousSum = 0;
    const actionToTrigger = actionsOnClick.find((actionOnClick): boolean => {
      sum += actionOnClick.probability;
      if (probabilityToTrigger > previousSum && probabilityToTrigger <= sum) return true;

      previousSum += actionOnClick.probability;
      return false;
    });

    if (!actionToTrigger) return;
    actionToTrigger.action();
  }

  function manageSwitchEvent(evt: Event): void {
    if (!(evt?.target as HTMLInputElement)?.checked) return;
    switchControl.disabled = true;

    actionCounter++;
    if (actionCounter <= config.initialBasicMoves) {
      randomClickAction();
      return;
    }

    const randomProbability = getRandomProbabilities(config.chances.mousemove.total);
    const doesNextMoveHasOnMoveAction = randomProbability < config.chances.mousemove.active;
    if (!doesNextMoveHasOnMoveAction) {
      randomClickAction();
      return;
    }

    manageFirstMousemove();
    document.addEventListener('mousemove', manageMousemoveAction);
  }

  function start() {
    const switchContainer = document.querySelector('.mdc-switch');
    if (!switchContainer || !handEl) return;
    switchControl = new MDCSwitch(switchContainer);

    switchEl = switchContainer.querySelector('.mdc-switch__native-control');
    if (!switchEl) return;
    switchEl.addEventListener('change', manageSwitchEvent);
  }

  start();

  document.removeEventListener('DOMContentLoaded', init);
}

document.addEventListener('DOMContentLoaded', init);
