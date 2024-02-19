import { Sexp, atom } from "s-tier";
import { Brand } from "./brand";

const BRAND = Symbol("Id");

export type Id = Brand<string, typeof BRAND>;

function make(id: string): Id {
  return Brand.apply(id, BRAND);
}

function toSexp(id: Id): Sexp {
  return atom(id);
}

export const Id = {
  make,
  toSexp,
} as const;
