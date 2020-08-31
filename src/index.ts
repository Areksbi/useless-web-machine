import './styles.scss';

import { MDCSwitch } from '@material/switch';
import { MDCSnackbar } from '@material/snackbar';
import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';
import { IAction, IConfig } from './interfaces';

function init() {
  // region Action elements
  const handEl = document.querySelector('.hand') as HTMLElement;
  const donutEl = document.querySelector('.donut') as HTMLElement;
  const batmanEl = document.querySelector('.batman') as HTMLElement;
  const saitamaEl = document.querySelector('.saitama') as HTMLElement;
  const rickEl = document.querySelector('.rick') as HTMLElement;
  const chuckNorrisEl = document.querySelector('.chuck-norris') as HTMLElement;
  // endregion Action elements
  let actionCounter = 0;
  let isMouseFarEnough = false;
  let switchControl: MDCSwitch;
  let switchEl: HTMLInputElement | null;

  if (!handEl || !donutEl || !batmanEl || !saitamaEl || !rickEl || !chuckNorrisEl) return;

  // region Configs
  const config: IConfig = {
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
    },
    distanceMinToTriggerAction: 50,
    initialBasicMoves: 2,
    timerDisappearImages: 500,
  };

  const actionsOnClick: IAction[] = [
    {
      action: () => triggerAction(handEl),
      id: 0,
      probability: 50,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.FASTER, RepeatsEnum.ONE, DelaysEnum.TWO),
      id: 1,
      probability: 20,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.SLOW),
      id: 2,
      probability: 10,
    },
    {
      action: () => triggerAction(handEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.FAST, RepeatsEnum.TWO),
      id: 3,
      probability: 10,
    },
    {
      action: () => triggerAction(donutEl, AnimationsEnum.FADE_IN_UP, SpeedsEnum.SLOW),
      id: 4,
      probability: 5,
    },
    {
      action: () =>
        triggerAction(
          batmanEl,
          AnimationsEnum.FADE_IN,
          SpeedsEnum.FASTER,
          RepeatsEnum.ONE,
          DelaysEnum.ONE,
          config.classes.batman.container
        ),
      id: 5,
      probability: 5,
    },
    {
      action: () => triggerAction(saitamaEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.SLOW),
      id: 6,
      probability: 5,
    },
    {
      action: () => triggerAction(rickEl, AnimationsEnum.BOUNCE_IN_RIGHT, SpeedsEnum.SLOW),
      id: 7,
      probability: 5,
    },
    {
      action: () => triggerAction(chuckNorrisEl, AnimationsEnum.FADE_IN_UP, SpeedsEnum.SLOW),
      id: 8,
      probability: 5,
    },
  ].sort((a: IAction, b: IAction) => a.probability - b.probability);
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

    const hiddenClass = config.classes.collision.hidden;
    if (!hiddenClass) return;

    collisionEl.classList.remove(hiddenClass);

    setTimeout(() => {
      collisionEl.classList.add(hiddenClass);
      switchControl.checked = false;
    }, config.timerDisappearImages);
  }

  function handleAnimations(
    elem: HTMLElement | null,
    speed: SpeedsEnum | undefined,
    repeats: RepeatsEnum | undefined,
    delay: DelaysEnum | undefined,
    animation: AnimationsEnum,
    bgBodyClass?: string
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

      if (bgBodyClass) {
        document.body.classList.remove(bgBodyClass);
      }

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
    delay?: DelaysEnum,
    bgBodyClass?: string
  ): void {
    if (!elem) return;

    if (bgBodyClass) {
      document.body.classList.add(bgBodyClass);
    }

    const src = elem.dataset.src;
    if (src && !elem.getAttribute('src')) {
      const onImageLoad = () => {
        handleAnimations(elem, speed, repeats, delay, animation, bgBodyClass);
        elem.removeEventListener('load', onImageLoad);
      };
      elem.addEventListener('load', onImageLoad);
      elem.setAttribute('src', src);
      return;
    }

    handleAnimations(elem, speed, repeats, delay, animation, bgBodyClass);
  }
  // endregion Animations on click

  function randomClickAction(): void {
    if (actionCounter <= config.initialBasicMoves) {
      triggerAction(handEl);
      return;
    }

    const totalProbabilities = actionsOnClick.reduce((acc, curr) => acc + curr.probability, 0);
    const probabilityToTrigger = getRandomProbabilities(totalProbabilities);

    // TODO: remove before release
    console.log('probabilityToTrigger: ', probabilityToTrigger);

    let sum = 0;
    let previousSum = 0;
    const actionToTrigger = actionsOnClick.find((actionOnClick): boolean => {
      if (probabilityToTrigger === 0) return true;

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
