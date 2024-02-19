import * as STier from "s-tier";

import { Call } from "./call";
import { Id } from "./id";
import { ProtocolVersion } from "./protocol_version";
import { Version } from "./version";

const BASE_REQUEST = {
  methodName: "initialize",
  duneVersion: Version.latest,
  protocolVersion: ProtocolVersion.latest,
} as const;

export type Request = InitializeRequest;

export type InitializeRequest = Readonly<{
  methodName: "initialize";
  id: Id;
  duneVersion: Version;
  protocolVersion: ProtocolVersion;
}>;

function make(id: Id): InitializeRequest {
  return { ...BASE_REQUEST, id };
}

function toSexp(request: InitializeRequest): STier.Sexp {
  return STier.of([
    [
      "dune_version",
      [
        request.duneVersion.major.toString(),
        request.duneVersion.minor.toString(),
      ],
    ],
    ["id", request.id],
    [
      "protocol_version",
      ProtocolVersion.getVersionNumber(request.protocolVersion).toString(),
    ],
  ]);
}

function toCall(request: InitializeRequest): Call {
  const sexp = InitializeRequest.toSexp(request);
  return Call.make(request.methodName, sexp);
}

export const InitializeRequest = {
  make,
  toSexp,
  toCall,
} as const;
