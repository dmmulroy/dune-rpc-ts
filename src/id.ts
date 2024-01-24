import { CanonicalSexp } from "s-tier";
import { Brand } from "./brand";

const BRAND = Symbol("Id");

export type Id = Brand<CanonicalSexp, typeof BRAND>;

function make(id: CanonicalSexp): Id {
  return Brand.apply(id, BRAND);
}

export const Id = {
  make,
} as const;
