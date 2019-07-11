# ts-type-assert

Type assertion library for TypeScript.

**The library requires conditional types, so the minimum supported TypeScript version is 2.8.0.**

## Installation

`$ npm i --save-dev ts-type-assert`

or

`$ yarn add -D ts-type-assert`

## Basics and motivation

Let's suppose you want to declare a type that is a union of two other types. One type is built-in and the other one is custom:

```typescript
import { ComponentProps } from 'react';

type NativeButtonProps = ComponentProps<'button'>;

interface CustomButtonProps {
  error?: string;
  warning?: string;
}

type ButtonProps = NativeButtonProps & CustomButtonProps;
```

How do you make sure that none of the properties from `CustomButtonProps` overlap those defined in `NativeButtonProps`? `ts-type-assert` is to the rescue! Just use `MergePropsWithoutOverlapping` utility type:

```typescript
import { Assert, MergePropsWithoutOverlapping } from 'ts-type-assert';

// ...

type ButtonProps = Assert<
  MergePropsWithoutOverlapping<NativeButtonProps, CustomButtonProps>
>;
```

In case props overlap you will get a (somewhat) handy error message:

```typescript
type CustomButtonProps = {
  disabled?: string;
};
```

```
error TS2344: Type 'AssertionError<"Some properties of T1 and T2 overlap", { __properties: "disabled"; }>' does not satisfy the constraint 'AssertionSuccess<unknown>'.
  Type 'AssertionError<"Some properties of T1 and T2 overlap", { __properties: "disabled"; }>' is missing the following properties from type 'AssertionSuccess<unknown>': __value, __asserted

10 export type ButtonProps = Assert<MergePropsWithoutOverlapping<NativeButtonProps, CustomButtonProps>>;
                                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

## Other utility types

### `Is<T1, T2>`

Checks whether T1 extends T2.

```typescript
import { User } from './generated-models';

type UserId = Assert<Is<User['id'], number>>;
```

## Other packages similar to this one

These two are very similar, but require you to actually write code (call dummy `assert` function) instead of using plain types:

- [`static-type-assert`](https://github.com/ksxnodemodules/static-type-assert)
- [`ts-expect`](https://github.com/TypeStrong/ts-expect)

Other utility types libraries:

- [`dtslint`](https://github.com/Microsoft/dtslint)
- [`tsd-check`](https://github.com/SamVerschueren/tsd-check/issues/10)
- [`type-plus`](https://github.com/unional/type-plus)
