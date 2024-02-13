import { Any } from 'lib/src/types';

export const sameProps = (oldProps: Any, newProps: Any, props: string[]) =>
  props.find(p => oldProps[p] !== newProps[p]) === undefined;
