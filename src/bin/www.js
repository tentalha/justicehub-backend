import http from "http";
import app from "../app";
import { Server } from "socket.io";
import { PORT } from "../configs";
// ------------------------------------------------------------->>
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});
//------------------------------------------------------------->>

server.listen(PORT);

server.on("listening", () => {
  console.log(`Server running on PORT ${server.address().port}.`);
});

server.on("error", onError);

//---------------------------------------------------------------->>

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}
