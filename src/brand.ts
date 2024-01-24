export type Brand<T, B> = T & { [BRAND]: B };

declare const BRAND: unique symbol;

/** Creates a new branded type by intersecting a given type with an object containing a unique brand symbol. */
export function apply<T, B>(value: T, _brand: B): Brand<T, B> {
  return value as Brand<T, B>;
}

export const Brand = {
  apply,
} as const;
