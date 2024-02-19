import * as STier from "s-tier";

export type Version = Readonly<{
  major: number;
  minor: number;
}>;

function make(major: number, minor: number): Version {
  return { major, minor };
}

function toSexp(version: Version): STier.Sexp {
  return STier.of([version.major.toString(), version.minor.toString()]);
}

export const Version = {
  latest: make(3, 14),
  make,
  toSexp,
} as const;
