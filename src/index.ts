import './styles.scss';
import { MDCSwitch } from '@material/switch';

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
  }, 2000);
  console.log('randomMousemoveAction');
}

function manageMousemoveAction(evt: MouseEvent) {
  if (!switchEl) return;

  const mX = evt.pageX;
  const mY = evt.pageY;
  const distance = calculateDistance(switchEl, mX, mY);

  const distanceMinToTriggerAction = 50;
  if (distance > distanceMinToTriggerAction) isMouseFarEnough = true;
  if (distance < distanceMinToTriggerAction && !isMouseFarEnough) return;

  randomMousemoveAction();

  document.removeEventListener('mousemove', manageMousemoveAction);
  isMouseFarEnough = false;
}

function setSwitchOff() {
  switchControl.checked = false;
  switchControl.disabled = false;
}

function randomClickAction(): void {
  setTimeout(() => {
    setSwitchOff();
  }, 2000);
  console.log('randomClickAction');
}

function manageSwitchEvent(evt: Event): void {
  if (!(evt?.target as HTMLInputElement)?.checked) return;
  switchControl.disabled = true;

  actionCounter++;
  if (actionCounter < 3) {
    randomClickAction();
    return;
  }

  const randomProbability = getRandomProbabilities(100);
  const doesNextMoveHasOnMoveAction = randomProbability < 20;
  if (!doesNextMoveHasOnMoveAction) {
    randomClickAction();
    return;
  }

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
