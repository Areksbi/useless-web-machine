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
  initialBasicMoves: 3,
};

let actionCounter = 0;
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
  }, 250);
}

function randomClickAction(): void {
  setTimeout(() => {
    setSwitchOff();
  }, 1000);
  console.log('randomClickAction');
}

function manageSwitchEvent(evt: Event): void {
  if (!(evt?.target as HTMLInputElement)?.checked) return;
  switchControl.disabled = true;

  actionCounter++;
  if (actionCounter < config.initialBasicMoves) {
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
  if (!switchContainer) return;
  switchControl = new MDCSwitch(switchContainer);

  switchEl = switchContainer.querySelector('.mdc-switch__native-control');
  if (!switchEl) return;
  switchEl.addEventListener('change', manageSwitchEvent);
}

init();
