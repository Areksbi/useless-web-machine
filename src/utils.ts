export function getRandomProbabilities(multiplier: number = 100): number {
  return Math.floor(Math.random() * multiplier);
}

export function isGifExt(file: string): boolean {
  return /.*\.gif/.test(file);
}
