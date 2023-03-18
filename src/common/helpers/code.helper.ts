import { QueryBuilder, SelectQueryBuilder } from 'typeorm';

function getActiveFromQuery(active: number) {
  if (active == 0) return null;
  else if (active == 1) return true;
  else if (active == 2) return false;
  else return null;
}

function copyFromTo<T, V>(from: T, to: V, props: string[]) {
  const propsFrom = Object.keys(from);
  for (const prop of props) {
    const propToFind = propsFrom.find((x) => x == prop);
    if (!propToFind || from[prop] == null || from[prop] == undefined) continue;
    to[prop] = from[prop];
  }
  return to;
}

export const CodeHelper = {
  getActiveFromQuery,
  copyFromTo,
};
