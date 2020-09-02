import './styles.scss';
import * as SuperGif from './libgif';

import { MDCDrawer } from '@material/drawer';
import { MDCSwitch } from '@material/switch';
import { MDCTopAppBar } from '@material/top-app-bar';

import { AnimationsEnum, DelaysEnum, ProbabilitiesEnum, RepeatsEnum, SpeedsEnum } from './enums';
import { actions as configActions, config } from './config';
import { getRandomProbabilities, isDevMode, isGifExt } from './utils';
import { IAction, IStatCounter, ISuperGifOptions } from './interfaces';

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
    const minProbability = Math.min(...configActions.map((action: IAction) => action.probability));
    const multiplier = 1 / (minProbability / configTotalProbabilities);
    const counters = configActions.reduce((acc: { [key: number]: number }, curr: IAction) => {
      if (!acc[curr.probability]) {
        acc[curr.probability] = 0;
      }
      ++acc[curr.probability];
      return acc;
    }, {});

    actions = configActions
      .map((action: IAction) => {
        action.probability = (action.probability / counters[action.probability]) * multiplier;
        return action;
      })
      .sort((a: IAction, b: IAction) => a.probability - b.probability);

    totalProbabilities = actions.reduce((acc: number, curr: IAction) => acc + curr.probability, 0);
  }

  function initStats() {
    if (!isDevMode()) return;

    const counters: IStatCounter[] = [
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_BASE).length,
        name: 'HAND_BASE',
        target: 1,
      },
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_FASTER).length,
        name: 'HAND_FASTER',
        target: 1,
      },
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_SLOW).length,
        name: 'HAND_SLOW',
        target: 1,
      },
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_REPEAT).length,
        name: 'HAND_REPEAT',
        target: 1,
      },
      {
        current: configActions.filter(
          (action: IAction) => action.probability === ProbabilitiesEnum.IMAGE && action.animation === AnimationsEnum.BOUNCE_IN_RIGHT
        ).length,
        name: 'IMAGE:BOUNCE_IN_RIGHT',
        target: 34,
      },
      {
        current: configActions.filter(
          (action: IAction) => action.probability === ProbabilitiesEnum.IMAGE && action.animation === AnimationsEnum.BOUNCE_IN_LEFT
        ).length,
        name: 'IMAGE:BOUNCE_IN_LEFT',
        target: 11,
      },
      {
        current: configActions.filter(
          (action: IAction) =>
            action.probability === ProbabilitiesEnum.IMAGE &&
            (action.animation === AnimationsEnum.BOUNCE_IN_UP || action.animation === AnimationsEnum.FADE_IN_UP)
        ).length,
        name: 'IMAGE:BOUNCE_IN_UP',
        target: 11,
      },
      {
        current: configActions.filter(
          (action: IAction) =>
            action.probability === ProbabilitiesEnum.IMAGE &&
            (action.animation === AnimationsEnum.BOUNCE_IN_DOWN || action.animation === AnimationsEnum.FADE_IN_DOWN)
        ).length,
        name: 'IMAGE:BOUNCE_IN_DOWN',
        target: 11,
      },
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.FULL_SCREEN).length,
        name: 'FULL_SCREEN',
        target: 18,
      },
      {
        current: configActions.filter((action: IAction) => action.probability === ProbabilitiesEnum.GIF).length,
        name: 'GIF',
        target: 12,
      },
    ];

    const separator = ':';
    const maxNameLength = Math.max(...counters.map((counter: IStatCounter) => counter.name.length)) + separator.length;
    const indentation = 4;
    const indentCol = Math.ceil(maxNameLength / indentation);

    const messages = counters.map((counter: IStatCounter) => {
      const diffFromIndentCol = indentCol - Math.floor((counter.name.length + separator.length) / indentation);
      const indentations = Array.from(Array(diffFromIndentCol))
        .map(() => '\t')
        .reduce((acc: string, curr: string) => acc + curr, '');

      return `\n${counter.name}${separator}${indentations}%c${counter.current}/${counter.target}%c`;
    });
    const colors = counters
      .map((counter: IStatCounter): string => {
        if (counter.current === counter.target) return 'color: green;';
        if (counter.current > counter.target) return 'color: yellow;';
        return 'color: red;';
      })
      .reduce((res: string[], current: string): string[] => res.concat([current, 'color: inherit;']), []);

    console.log(
      `===== ACTIONS COUNTERS =====\n\n%cTOTAL: ${counters.reduce(
        (acc: number, curr: IStatCounter) => acc + curr.current,
        0
      )}/${counters.reduce(
        (acc: number, curr: IStatCounter) => acc + curr.target,
        0
      )}%c (Release target)\n${messages}\n\n===== END ACTIONS COUNTERS =====`,
      'background: #cf0; color: black;',
      'background: inherit; color: inherit;',
      ...colors
    );
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
