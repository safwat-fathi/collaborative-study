const http = require("http");
const WebSocket = require("ws");
const app = require("./app");
const PORT = 8080;

// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket is running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws, req) {
  // const clientIP = req.socket.remoteAddress;

  // handling messages
  ws.on("message", function incoming(message) {
    try {
      // parse data sent from client
      let data = JSON.parse(message);
      const { type, room, payload } = data;

      switch (data.type) {
        case "join":
          console.log(`joining room: ${room}`);
          break;
        case "chatting":
          console.log(`chatting on room: ${room}`);
          // send to all connected clients
          broadcast(ws, data, false);
          break;
        case "drawing":
          console.log(`drawing on room: ${room}`);
          // send to all connected clients but not sender
          broadcast(ws, data, false);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error(err);
    }
  });
});

// // broadcasting function
function broadcast(ws, data, toSender) {
  data = JSON.stringify(data);

  if (toSender) {
    // send to all including sender
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
    return;
  }

  // send to all excluding sender
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// try {
//   // parse data sent from client
//   let data = JSON.parse(message);

//   switch (data.type) {
//     case "join":
//       console.log(`joining --> ${data}`);
//       break;
//     case "chatting":
//       console.log(`chatting --> ${data}`);
//       break;
//     case "drawing":
//       console.log(`drawing --> ${data}`);
//       break;
//     default:
//       break;
//   }
//   // BROADCAST the message to all connected clients
//   // broadcast(ws, data);
// } catch (err) {
//   console.error(err);
// }
