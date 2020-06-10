const http = require("http");
const ws = require("ws");
const app = require("./app");
const PORT = 8080;

// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket running on port ${PORT}`);
});

const wss = new ws.Server({
  server,
});

wss.on("connection", function connection(ws) {
  // handling messages
  ws.on("message", function incoming(message) {
    console.log(`recieved --> ${message}`);
  });

  ws.send("Hi there, I am a WebSocket server");
});

// // broadcasting function
// function broadcast(data) {
// 	// Loop through all clients
// 	for (let i in clients) {
// 		// Send a the message to every client connected except sender
// 		if (clients[i] !== clients[userID]) {
// 			clients[i].send(JSON.stringify(data));
// 		}
// 	}
// }

// function createRoom(rooms, newRoom) {
// 	let isExisted = rooms.includes(newRoom);
// 	// pushing only rooms that is new & not garbage data

// 	if (!isExisted && newRoom !== undefined) {
// 		rooms.push(newRoom);
// 	}
// 	return;
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
