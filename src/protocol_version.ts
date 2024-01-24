import { Brand } from "./brand";

const BRAND = Symbol("Version");

export type ProtocolVersion = Brand<number, typeof BRAND>;

function make(version: number): ProtocolVersion {
  return Brand.apply(version, BRAND);
}

function getVersionNumber(version: ProtocolVersion): number {
  return version;
}

export const ProtocolVersion = {
  latest: make(0),
  make,
  getVersionNumber,
};
