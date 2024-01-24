import * as STier from "s-tier";

export type Version = Readonly<{
  major: number;
  minor: number;
}>;

function make(major: number, minor: number): Version {
  return { major, minor };
}

function toSexp(version: Version): STier.Sexp {
  return STier.of([version.major, version.minor]);
}
export const Version = {
  latest: make(0, 1),
  make,
  toSexp,
} as const;
