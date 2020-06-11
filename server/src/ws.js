const http = require("http");
const ws = require("ws");
const app = require("./app");
const PORT = 8080;

// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket is running on port ${PORT}`);
});

const wss = new ws.Server({ server });

wss.on("connection", function connection(ws, req) {
  const clientIP = req.socket.remoteAddress;
  console.log(`connected client IP: ${clientIP}`);

  // handling messages
  ws.on("message", function incoming(message) {
    console.log(`recieved --> ${message}`);
  });

  ws.send("Hi there, I am a WebSocket server");
});

// // broadcasting function
// function broadcast(data) {
// send to all excluding sender
// wss.clients.forEach(function each(client) {
// 	if (client !== ws && client.readyState === WebSocket.OPEN) {
// 		client.send(data);
// 	}
// });
// send to all including sender
// 	wss.clients.forEach(function each(client) {
// 	if (client.readyState === WebSocket.OPEN) {
// 		client.send(data);
// 	}
// });
// }

// try {
//   // parse data sent from client
//   let data = JSON.parse(message.utf8Data);

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
//   // broadcast(data);
// } catch (err) {
//   console.error(err);
// }
