import './styles.scss';
import * as SuperGif from './libgif';

import { MDCDrawer } from '@material/drawer';
import { MDCSwitch } from '@material/switch';
import { MDCSnackbar } from '@material/snackbar';
import { MDCTopAppBar } from '@material/top-app-bar';

import { AnimationsEnum, DelaysEnum, RepeatsEnum, SpeedsEnum } from './enums';
import { actions as configActions, config } from './config';
import { calculateDistance, getRandomProbabilities, isGifExt } from './utils';
import { IAction, ISuperGifOptions } from './interfaces';

function init() {
  const counter = document.querySelector('.counter') as HTMLSpanElement;
  let actionCounter = 0;
  let actions: IAction[];
  let isMouseFarEnough = false;
  let switchControl: MDCSwitch;
  let switchEl: HTMLInputElement | null;

  function initCopyright() {
    const copyrightDate = document.querySelector(`.${config.classes.copyright.el}`) as HTMLSpanElement;
    if (!copyrightDate) return;

    copyrightDate.innerText = new Date().getFullYear().toString();
  }

  function initMenu() {
    const drawerEl = document.querySelector('.mdc-drawer');
    const topAppBarEl = document.querySelector('.mdc-top-app-bar');
    if (!drawerEl || !topAppBarEl) return;

    const drawer = MDCDrawer.attachTo(drawerEl);
    const topAppBar = MDCTopAppBar.attachTo(topAppBarEl);

    const main = document.querySelector('main');
    if (!main) return;

    topAppBar.setScrollTarget(main);
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });
  }

  function initCounter() {
    const counterFromStorage = window.localStorage.getItem('counter');
    if (counterFromStorage && counter) {
      counter.innerText = counterFromStorage;
      actionCounter = parseInt(counterFromStorage, 10);
    }
  }

  function manageMousemoveAction(evt: MouseEvent): void {
    if (!switchEl) return;

    const mX = evt.pageX;
    const mY = evt.pageY;
    const distance = calculateDistance(switchEl, mX, mY);

    if (distance > config.distanceMinToTriggerAction) isMouseFarEnough = true;
    if (distance < config.distanceMinToTriggerAction && !isMouseFarEnough) return;

    randomAction();

    document.removeEventListener('mousemove', manageMousemoveAction);
    isMouseFarEnough = false;
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
    bgBodyClass?: string,
    isGif?: boolean,
    selector?: string
  ) {
    function onEndAnimationEnd() {
      if (!elem) return;

      elem.classList.remove(`animate__${speed}`, 'animate__animated', `animate__${animation}`, 'alternate-animation');
      elem.removeEventListener('animationend', onEndAnimationEnd);

      if (!hiddenClass) return;
      elem.classList.add(hiddenClass);

      if (bgBodyClass) {
        document.body.classList.remove(bgBodyClass);
      }

      elem.style.willChange = 'auto';
      switchControl.disabled = false;
    }

    function onStartAnimationEnd() {
      setSwitchOff();
      setTimeout(() => {
        // TODO: remove after the release
        console.log('onStartAnimationEnd - first');
        elem?.classList.remove(`animate__${animation}`, `animate__repeat-${repeats}`, `animate__delay-${delay}s`);
        elem?.removeEventListener('animationend', onStartAnimationEnd);

        setTimeout(() => {
          // TODO: remove after the release
          console.log('onStartAnimationEnd - second');
          elem?.classList.add('alternate-animation', `animate__${animation}`);
          elem?.addEventListener('animationend', onEndAnimationEnd);
        }, config.timerDisappearImages);
      }, config.timerDisappearImages);
    }

    function handleGif() {
      if (!elem || !selector) return;

      const originalEl = elem.cloneNode(true);
      const superGifOptions: ISuperGifOptions = {
        draw_while_loading: false,
        gif: elem,
        loop_mode: false,
        on_end: () => {
          onStartAnimationEnd();
          const jsGifEl = document.querySelector('.jsgif');
          if (!jsGifEl) return;

          jsGifEl?.parentNode?.appendChild(originalEl);
          jsGifEl.remove();

          elem = document.querySelector(selector);
          onEndAnimationEnd();
        },
      };
      if (delay) {
        superGifOptions.loop_delay = delay * 1000;
      }
      const rub = SuperGif(superGifOptions);
      const src = elem.dataset.src;
      rub.load_url(src);

      const jsGifEl = document.querySelector('.jsgif');
      if (!jsGifEl || selector.charAt(0) !== '.') return;
      jsGifEl.classList.add(selector.replace('.', ''));
    }

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

    const src = elem.dataset.src;
    if (selector && isGif && src && isGifExt(src)) {
      handleGif();
    } else {
      elem.addEventListener('animationend', onStartAnimationEnd);
    }
  }

  function triggerAction(
    selector: string,
    animation: AnimationsEnum = AnimationsEnum.BOUNCE_IN_RIGHT,
    speed?: SpeedsEnum,
    repeats?: RepeatsEnum,
    delay?: DelaysEnum,
    bgBodyClass?: string,
    isGif?: boolean
  ): void {
    const elem = document.querySelector(selector) as HTMLElement;
    if (!elem) return;
    elem.style.willChange = 'transform';

    if (bgBodyClass) {
      document.body.classList.add(bgBodyClass);
    }

    const src = elem.dataset.src;
    if (src && !elem.getAttribute('src') && !isGifExt(src)) {
      const onImageLoad = () => {
        handleAnimations(elem, speed, repeats, delay, animation, bgBodyClass, isGif, selector);
        elem.removeEventListener('load', onImageLoad);
      };
      elem.addEventListener('load', onImageLoad);
      elem.setAttribute('src', src);
      return;
    }

    handleAnimations(elem, speed, repeats, delay, animation, bgBodyClass, isGif, selector);
  }

  function randomAction(): void {
    switchControl.disabled = true;

    if (actionCounter <= config.initialBasicMoves) {
      const basicAction = actions.find((action) => action.id === 0);
      if (basicAction) {
        triggerAction(
          basicAction.selector,
          basicAction.animation,
          basicAction.speed,
          basicAction.repeats,
          basicAction.delay,
          basicAction.container,
          basicAction.gif
        );
        return;
      }
    }

    const totalProbabilities = actions.reduce((acc, curr) => acc + curr.probability, 0);
    const probabilityToTrigger = getRandomProbabilities(totalProbabilities);

    // TODO: remove after the release
    console.log('probabilityToTrigger: ', probabilityToTrigger);

    let sum = 0;
    let previousSum = 0;
    const actionToTrigger = actions.find((actionOnClick): boolean => {
      if (probabilityToTrigger === 0) return true;

      sum += actionOnClick.probability;
      if (probabilityToTrigger > previousSum && probabilityToTrigger <= sum) return true;

      previousSum += actionOnClick.probability;
      return false;
    });

    if (!actionToTrigger) return;
    triggerAction(
      actionToTrigger.selector,
      actionToTrigger.animation,
      actionToTrigger.speed,
      actionToTrigger.repeats,
      actionToTrigger.delay,
      actionToTrigger.container,
      actionToTrigger.gif
    );
  }

  function manageSwitchEvent(evt: Event): void {
    if (!(evt?.target as HTMLInputElement)?.checked) return;

    actionCounter++;
    window.localStorage.setItem('counter', actionCounter.toString());

    if (counter) {
      counter.innerText = actionCounter.toString();
    }

    if (actionCounter <= config.initialBasicMoves) {
      randomAction();
      return;
    }

    const randomProbability = getRandomProbabilities(config.chances.mousemove.total);
    const doesNextMoveHasOnMoveAction = randomProbability < config.chances.mousemove.active;
    if (!doesNextMoveHasOnMoveAction) {
      randomAction();
      return;
    }

    manageFirstMousemove();
    document.addEventListener('mousemove', manageMousemoveAction);
  }

  function initSwitch() {
    const switchContainer = document.querySelector('.mdc-switch');
    if (!switchContainer) return;
    switchControl = new MDCSwitch(switchContainer);

    switchEl = switchContainer.querySelector('.mdc-switch__native-control');
    if (!switchEl) return;
    switchEl.addEventListener('change', manageSwitchEvent);
  }

  function initProbabilities() {
    const counters: { [key: number]: number } = {};
    actions = configActions
      .map((action: IAction) => {
        if (!counters[action.probability]) {
          counters[action.probability] = 0;
        }
        ++counters[action.probability];
        return action;
      })
      .map((action: IAction) => {
        action.probability = (action.probability / counters[action.probability]) * 100;
        return action;
      })
      .sort((a: IAction, b: IAction) => a.probability - b.probability);
  }

  initProbabilities();
  initSwitch();
  initCounter();
  initMenu();
  initCopyright();

  document.removeEventListener('DOMContentLoaded', init);
}

document.addEventListener('DOMContentLoaded', init);
