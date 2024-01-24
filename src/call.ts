import { CanonicalSexp, Sexp } from "s-tier";

export type Call = Readonly<{
  method: string;
  params: CanonicalSexp | Sexp;
}>;

function make(method: string, params: CanonicalSexp | Sexp): Call {
  return { method, params };
}

export const Call = {
  make,
};
