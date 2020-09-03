import { actions } from './config';
import { AnimationsEnum, ProbabilitiesEnum } from './enums';
import { IAction, IStatCounter } from './interfaces';

export default function stats() {
  const counters: IStatCounter[] = [
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_BASE).length,
      name: 'HAND_BASE',
      target: 1,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_FASTER).length,
      name: 'HAND_FASTER',
      target: 1,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_SLOW).length,
      name: 'HAND_SLOW',
      target: 1,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.HAND_REPEAT).length,
      name: 'HAND_REPEAT',
      target: 1,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.SURRENDER).length,
      name: 'SURRENDER',
      target: 1,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.probability === ProbabilitiesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_RIGHT || action.animation === AnimationsEnum.FADE_IN_RIGHT)
      ).length,
      name: 'IMAGE:IN_RIGHT',
      target: 34,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.probability === ProbabilitiesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_LEFT || action.animation === AnimationsEnum.FADE_IN_LEFT)
      ).length,
      name: 'IMAGE:IN_LEFT',
      target: 11,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.probability === ProbabilitiesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_UP || action.animation === AnimationsEnum.FADE_IN_UP)
      ).length,
      name: 'IMAGE:IN_UP',
      target: 11,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.probability === ProbabilitiesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_DOWN || action.animation === AnimationsEnum.FADE_IN_DOWN)
      ).length,
      name: 'IMAGE:IN_DOWN',
      target: 11,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.FULL_SCREEN).length,
      name: 'FULL_SCREEN',
      target: 18,
    },
    {
      current: actions.filter((action: IAction) => action.probability === ProbabilitiesEnum.GIF).length,
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
