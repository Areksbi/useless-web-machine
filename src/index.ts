import './styles.scss';
import * as SuperGif from './libgif';

import { MDCDrawer } from '@material/drawer';
import { MDCSwitch } from '@material/switch';
import { MDCTopAppBar } from '@material/top-app-bar';

import { ActionIdsEnum, AnimationsEnum, DelaysEnum, ProbabilitiesEnum, RepeatsEnum, SpeedsEnum } from './enums';
import { actions as configActions, config } from './config';
import { getRandomProbabilities, isDevMode, isGifExt } from './utils';
import { IAction, ISuperGifOptions } from './interfaces';

function init() {
  const counter = document.querySelector('.counter') as HTMLSpanElement;
  let actionCounter = 0;
  let actions: IAction[];
  let switchControl: MDCSwitch;
  let totalProbabilities = 0;

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
        elem?.classList.remove(`animate__${animation}`, `animate__repeat-${repeats}`, `animate__delay-${delay}s`);
        elem?.removeEventListener('animationend', onStartAnimationEnd);

        setTimeout(() => {
          elem?.classList.add('alternate-animation', `animate__${animation}`);
          elem?.addEventListener('animationend', onEndAnimationEnd);
        }, config.timerDisappearImages);
      }, config.timerDisappearImages);
    }

    function handleOnEndGif(originalEl: Node) {
      if (!selector) return;

      onStartAnimationEnd();
      const jsGifEl = document.querySelector('.jsgif');
      if (!jsGifEl) return;

      jsGifEl?.parentNode?.appendChild(originalEl);
      jsGifEl.remove();

      elem = document.querySelector(selector);
      onEndAnimationEnd();
    }

    function handleGif(isSurrender: boolean = false) {
      if (!elem || !selector) return;

      const originalEl = elem.cloneNode(true);
      const superGifOptions: ISuperGifOptions = {
        draw_while_loading: false,
        gif: elem,
        loop_mode: isSurrender,
        on_end: () => {
          if (isSurrender) {
            import('@material/ripple/index').then(({ MDCRipple }) => {
              const onKeepPlayingClick = () => {
                if (!keepPlaying) return;

                rub.pause();
                handleOnEndGif(originalEl);
                keepPlaying.classList.add('keep-playing--hidden');
                buttonRipple.unlisten('click', onKeepPlayingClick);
              };

              const continueAfterSurrenderBtn = document.querySelector('.mdc-button');
              const keepPlaying = document.querySelector('.keep-playing');
              if (!continueAfterSurrenderBtn || !keepPlaying) return;

              const buttonRipple = new MDCRipple(continueAfterSurrenderBtn);
              buttonRipple.listen('click', onKeepPlayingClick);
              keepPlaying.classList.remove('keep-playing--hidden');
            });
            return;
          }

          handleOnEndGif(originalEl);
        },
      };
      if (delay) {
        superGifOptions.loop_delay = delay * config.surrenderOn;
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
      handleGif(actionCounter === config.surrenderOn);
      return;
    }

    elem.addEventListener('animationend', onStartAnimationEnd);
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

    if (actionCounter === config.surrenderOn) {
      const surrenderAction = actions.find((action) => action.id === ActionIdsEnum.SURRENDER);
      if (surrenderAction) {
        triggerAction(
          surrenderAction.selector,
          surrenderAction.animation,
          surrenderAction.speed,
          surrenderAction.repeats,
          surrenderAction.delay,
          surrenderAction.container,
          surrenderAction.gif
        );
        return;
      }
    }

    if (actionCounter <= config.initialBasicMoves) {
      const basicAction = actions.find((action) => action.id === ActionIdsEnum.HAND_BASE);
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

    const probabilityToTrigger = getRandomProbabilities(totalProbabilities);
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

    randomAction();
  }

  function initSwitch() {
    const switchContainer = document.querySelector('.mdc-switch');
    if (!switchContainer) return;
    switchControl = new MDCSwitch(switchContainer);

    const switchEl = switchContainer.querySelector('.mdc-switch__native-control');
    if (!switchEl) return;
    switchEl.addEventListener('change', manageSwitchEvent);
  }

  function initProbabilities() {
    const configTotalProbabilities = configActions.reduce((acc: number, curr: IAction) => acc + curr.probability, 0);
    const minProbability = Math.min(
      ...configActions
        .map((action: IAction) => action.probability)
        .filter((probability: number) => probability !== ProbabilitiesEnum.SURRENDER)
    );
    const multiplier = 1 / (minProbability / configTotalProbabilities);
    const counters = configActions.reduce((acc: { [key: number]: number }, curr: IAction) => {
      if (!acc[curr.probability]) {
        acc[curr.probability] = 0;
      }
      ++acc[curr.probability];
      return acc;
    }, {});

    actions = configActions
      .map((action: IAction) => ({
        ...action,
        probability: (action.probability / counters[action.probability]) * multiplier,
      }))
      .sort((a: IAction, b: IAction) => a.probability - b.probability);

    totalProbabilities = actions.reduce((acc: number, curr: IAction) => acc + curr.probability, 0);
  }

  function initStats() {
    if (!isDevMode()) return;
    import('./stats').then(({ default: stats }) => stats());
  }

  initStats();
  initProbabilities();
  initSwitch();
  initCounter();
  initMenu();
  initCopyright();

  document.removeEventListener('DOMContentLoaded', init);
}

document.addEventListener('DOMContentLoaded', init);
