const http = require("http");
const WebSocket = require("ws");
const app = require("./app");

// import helpers
const helpers = require("./helpers");
const { isExisted } = require("./helpers");

const PORT = 8080;
// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket is running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", function connection(ws, req) {
  // const clientIP = req.socket.remoteAddress;

  // handling messages
  ws.on("message", function incoming(message) {
    try {
      // parse data sent from client
      let data = JSON.parse(message);
      const { type, room, payload } = data;

      switch (type) {
        case "join":
          const { userID, userName } = payload;

          // handling duplicated connections
          helpers.addClient(clients, ws, userID, userName);
          console.log(clients.length);
          break;
        // chatting on room
        case "chatting":
          helpers.broadcast(WebSocket, clients, ws, room, data);
          break;
        // drawing on whiteboard
        case "drawing":
          helpers.broadcast(WebSocket, clients, ws, room, data);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  });

  ws.on("error", (e) => console.log(e));
  ws.on("close", (e) => console.log("websocket closed " + e));
});
