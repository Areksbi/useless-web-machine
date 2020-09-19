import { actions } from './config';
import { AnimationsEnum, TypesEnum } from './enums';
import { IAction, IStatCounter } from './interfaces';

export default function stats() {
  const counters: IStatCounter[] = [
    {
      current: actions.filter((action: IAction) => action.type === TypesEnum.HAND).length,
      name: 'HAND',
      target: 4,
    },
    {
      current: actions.filter((action: IAction) => action.type === TypesEnum.SURRENDER).length,
      name: 'SURRENDER',
      target: 1,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.type === TypesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_RIGHT || action.animation === AnimationsEnum.FADE_IN_RIGHT)
      ).length,
      name: 'IMAGE:IN_RIGHT',
      target: 37,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.type === TypesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_LEFT || action.animation === AnimationsEnum.FADE_IN_LEFT)
      ).length,
      name: 'IMAGE:IN_LEFT',
      target: 10,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.type === TypesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_UP || action.animation === AnimationsEnum.FADE_IN_UP)
      ).length,
      name: 'IMAGE:IN_UP',
      target: 13,
    },
    {
      current: actions.filter(
        (action: IAction) =>
          action.type === TypesEnum.IMAGE &&
          (action.animation === AnimationsEnum.BOUNCE_IN_DOWN || action.animation === AnimationsEnum.FADE_IN_DOWN)
      ).length,
      name: 'IMAGE:IN_DOWN',
      target: 11,
    },
    {
      current: actions.filter((action: IAction) => action.type === TypesEnum.FULL_SCREEN).length,
      name: 'FULL_SCREEN',
      target: 15,
    },
    {
      current: actions.filter((action: IAction) => action.type === TypesEnum.GIF).length,
      name: 'GIF',
      target: 10,
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
