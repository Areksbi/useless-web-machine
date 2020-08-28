import './styles.scss';
import { MDCSwitch } from '@material/switch';
import { MDCSnackbar } from '@material/snackbar';

const config = {
  chances: {
    mousemove: {
      total: 100,
      active: 20,
    },
  },
  distanceMinToTriggerAction: 50,
  initialBasicMoves: 2,
  timerDisappearImages: 500,
};

const actionsOnClick = [
  {
    action: bounceInRight,
    probability: 20,
  },
  {
    action: bounceInRight,
    probability: 70,
  },
  {
    action: bounceInRight,
    probability: 90,
  },
];

let actionCounter = 0;
let handEl: HTMLElement | null;
let isMouseFarEnough = false;
let switchControl: MDCSwitch;
let switchEl: HTMLInputElement | null;

function calculateDistance(elem: HTMLInputElement, mouseX: number, mouseY: number) {
  const rect = elem.getBoundingClientRect();
  return Math.floor(
    Math.sqrt(Math.pow(mouseX - (rect.left + elem.offsetWidth / 2), 2) + Math.pow(mouseY - (rect.top + elem.offsetHeight / 2), 2))
  );
}

function getRandomProbabilities(multiplier: number = 100): number {
  return Math.floor(Math.random() * multiplier);
}

function randomMousemoveAction() {
  setTimeout(() => {
    setSwitchOff();
  }, 1000);
  console.log('randomMousemoveAction');
}

function manageFirstMousemove(): void {
  if (!window.localStorage.getItem('isFirstMousemove')) {
    const snackbarEl = document.querySelector('.mdc-snackbar');
    if (!snackbarEl) return;

    const snackbar = new MDCSnackbar(snackbarEl);
    snackbar.open();

    window.localStorage.setItem('isFirstMousemove', 'false');
  }
}

function manageMousemoveAction(evt: MouseEvent) {
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

function setSwitchOff() {
  const collisionEl = document.querySelector('.collision');
  if (!collisionEl) return;

  collisionEl.classList.remove('collision--hidden');

  setTimeout(() => {
    collisionEl.classList.add('collision--hidden');
    switchControl.checked = false;
    switchControl.disabled = false;
  }, config.timerDisappearImages);
}

// region Animations on click
function bounceInRight(): void {
  if (!handEl) return;

  handEl.classList.remove('hand--hidden');
  handEl.classList.add('animate__animated', 'animate__bounceInRight');

  function onAnimationEnd() {
    setSwitchOff();

    setTimeout(() => {
      if (!handEl) return;
      handEl.classList.remove('animate__animated', 'animate__bounceInRight');
      handEl.classList.add('hand--hidden');
      handEl.removeEventListener('animationend', onAnimationEnd);
    }, config.timerDisappearImages);
  }

  handEl.addEventListener('animationend', onAnimationEnd);
}
// endregion Animations on click

function randomClickAction(): void {
  if (actionCounter <= config.initialBasicMoves) {
    bounceInRight();
    return;
  }

  const totalProbabilities = actionsOnClick.reduce((acc, curr) => acc + curr.probability, 0);
  const probabilityToTrigger = getRandomProbabilities(totalProbabilities);

  let sum = 0;
  let previousSum = 0;
  const actionToTrigger = actionsOnClick.find((actionOnClick) => {
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

function init(): void {
  const switchContainer = document.querySelector('.mdc-switch');
  handEl = document.querySelector('.hand');
  if (!switchContainer || !handEl) return;
  switchControl = new MDCSwitch(switchContainer);

  switchEl = switchContainer.querySelector('.mdc-switch__native-control');
  if (!switchEl) return;
  switchEl.addEventListener('change', manageSwitchEvent);
}

init();
