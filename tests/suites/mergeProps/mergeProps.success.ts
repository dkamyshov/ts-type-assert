import { Assert, MergePropsWithoutOverlapping } from '../../../index';

interface A {
  a: string;
  b: string;
}

interface B {
  c: string;
  d: string;
}

export type C = Assert<MergePropsWithoutOverlapping<A, B>>;
