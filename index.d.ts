/**
 * Represents successful type assertion.
 */
interface AssertionSuccess<T> {
  __value: T;
  __asserted: true;
}

/**
 * Represents failed type assertion.
 */
type AssertionError<T, Extras = {}> = {
  __error: T;
} & Extras;

/**
 * Checks if type T1 is of (extends) type T2.
 */
export type Is<T1, T2> = T1 extends T2
  ? AssertionSuccess<T1>
  : AssertionError<'T1 is not a type of T2'>;

/**
 * Merges props from T1 and T2 and asserts that there are no
 * overlapping properties.
 *
 *     type A = {
 *       a: number;
 *     }
 *
 *     type B = {
 *       b: string;
 *     }
 *
 *     type C = Assert<MergePropsWithoutOverlapping<A, B>>;
 *
 *     // => { a: number; b: string; }
 *
 *     type D = {
 *       a: string;
 *     };
 *
 *     type D = Assert<MergePropsWithoutOverlapping<A, D>>; // error!
 */
export type MergePropsWithoutOverlapping<T1, T2> = Extract<
  keyof T1,
  keyof T2
> extends never
  ? AssertionSuccess<T1 & T2>
  : AssertionError<
      'Some properties of T1 and T2 overlap',
      {
        __properties: Extract<keyof T1, keyof T2>;
      }
    >;

/**
 * Performs type assertion and extracts saved type.
 */
export type Assert<T extends AssertionSuccess<unknown>> = T extends {
  __value: infer R;
}
  ? R
  : never;
