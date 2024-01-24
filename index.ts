import * as net from "node:net";

const socket = net.createConnection("./ocaml_project/_build/.rpc/dune", () => {
  console.log("connected to server!");
});

const initialize_id = "(10:initialize)";

socket.write(initialize_id);

socket.on("end", () => {
  console.log("client disconnected");
});

socket.on("error", (err: unknown) => {
  console.log("client error", err);
});

socket.on("data", (data) => {
  console.log("client data", data);
});

socket.on("timeout", () => {
  console.log("client timeout");
});
