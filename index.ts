import * as net from "node:net";
import { InitializeRequest } from "./src/requests";
import { Id } from "./src/id";
import { Call } from "./src/call";
import { Canonical } from "s-tier";

const socket = net.createConnection("./ocaml_project/_build/.rpc/dune", () => {
  console.log("\nConnected to dune-rpc server!\n");
});

let initalizeCall = Call.toSexp(
  Call.make(
    "initialize",
    InitializeRequest.toSexp(InitializeRequest.make(Id.make("ts_rpc_client"))),
  ),
);

const initializeCallCSexp = Canonical.serialize(initalizeCall);

console.log("Sending client initalize request: \n", initializeCallCSexp);
socket.write(initializeCallCSexp);

socket.on("end", () => {
  console.log("client disconnected");
});

socket.on("error", (err: unknown) => {
  console.log("client error", err);
});

socket.on("data", (data) => {
  console.log("Received response from dune-rpc server: \n", data.toString());
});

socket.on("timeout", () => {
  console.log("client timeout");
});
