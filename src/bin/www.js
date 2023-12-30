import http from "http";
import app from "../app";
import { Server } from "socket.io";
import { PORT } from "../configs";
import { chatSpaceAuthentication, chatSpaceConnection } from "../nameSpaces";
// ------------------------------------------------------------->>
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
  },
});

io.on("connection", (socket) => {
  socket.disconnect();
});

const chatSpace = io.of("/chat");

chatSpace.use(chatSpaceAuthentication);

chatSpace.on("connection", chatSpaceConnection);

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
