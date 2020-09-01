export function calculateDistance(elem: HTMLElement, mouseX: number, mouseY: number): number {
  const rect = elem.getBoundingClientRect();
  return Math.floor(
    Math.sqrt(Math.pow(mouseX - (rect.left + elem.offsetWidth / 2), 2) + Math.pow(mouseY - (rect.top + elem.offsetHeight / 2), 2))
  );
}

export function getRandomProbabilities(multiplier: number = 100): number {
  return Math.floor(Math.random() * multiplier);
}

export function isGifExt(file: string): boolean {
  return /.*\.gif/.test(file);
}
