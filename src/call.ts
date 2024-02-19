import { List } from "melange-ffi";
import * as STier from "s-tier";

export type Call = Readonly<{
  method: string;
  params: STier.Sexp;
}>;

function toSexp(call: Call): STier.Sexp {
  const idSexp = STier.of(["id", ["initialize"]]);
  const methodSexp = STier.of(["method", call.method]);
  const paramsSexp = STier.list(
    List.ofArray([STier.atom("params"), call.params]),
  );
  const list = STier.list(List.ofArray([idSexp, methodSexp, paramsSexp]));
  return list;
}

function make(method: string, params: STier.Sexp): Call {
  return { method, params };
}

export const Call = {
  make,
  toSexp,
};
