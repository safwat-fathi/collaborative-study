const http = require("http");
const WebSocket = require("ws");
const app = require("./app");

// import helpers
const { broadcast, addClient, removeClient } = require("./helpers");

const PORT = 8080;

// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket is running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", function connection(ws, req) {
  // const clientIP = req.socket.remoteAddress;
  console.log(`ws connected at: ${new Date().toLocaleString()}`);
  console.log("===============");

  // handling messages
  ws.on("message", function incoming(message) {
    try {
      // parse data sent from client
      let data = JSON.parse(message);
      const { type, room, payload } = data;

      switch (type) {
        case "closing":
          console.log("type: closing");

          const { userID } = payload;
          removeClient(clients, userID);
          break;
        case "join":
          // handling duplicated connections
          addClient(clients, ws, payload.userID, payload.userName, room);
          break;
        // chatting on room
        case "chatting":
          broadcast(WebSocket, clients, ws, room, data);
          break;
        // drawing on whiteboard
        case "drawing":
          broadcast(WebSocket, clients, ws, room, data);
          break;
        case "erasing":
          broadcast(WebSocket, clients, ws, room, data);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  });

  ws.on("error", (e) => console.log(e));

  ws.on("close", (e) => {
    console.log(`ws closed at: ${new Date().toLocaleString()}, Reason: ${e}`);
  });
});
