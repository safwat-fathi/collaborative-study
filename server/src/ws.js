const http = require("http");
const WebSocket = require("ws");
const app = require("./app");
const PORT = 8080;
const axios = require("axios");
// Spinning the http server and the websocket server.
const server = http.createServer(app).listen(PORT, () => {
  console.log(`WebSocket is running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

let rooms;
// const getRooms = axios
//   .get("http://localhost:4000/rooms")
//   .then((res) => {
//     rooms = res.data.rooms;
//   })
//   .catch((err) => {
//     console.log(err);
//     return err;
//   });

wss.on("connection", function connection(ws, req) {
  // const clientIP = req.socket.remoteAddress;

  console.log("new connection");

  // handling messages
  ws.on("message", function incoming(message) {
    try {
      // parse data sent from client
      let data = JSON.parse(message);
      const { type, room, payload } = data;

      switch (data.type) {
        case "create_room":
          console.log(`new room created: ${payload}`);
          break;
        case "join":
          const { userName, userID } = payload;
          // clients[userID] = ws;

          let roomsKeys = Object.keys(rooms);

          // if (roomsKeys.includes(room)) {
          //   console.log("room existed");
          //   console.log(`rooms: ${rooms}`);
          //   rooms[room].members.push(clients[userID]);
          //   console.log(rooms[room].members);

          //   break;
          // }

          // console.log("new room");
          // rooms[room] = {
          //   members: [clients[userID]],
          // };
          // console.log(rooms[room].members);
          break;
        case "chatting":
          console.log(`chatting on room: ${room}`);
          // send to all connected clients
          broadcast(room, ws, data, false);
          break;
        case "drawing":
          console.log(`drawing on room: ${room}`);
          // send to all connected clients but not sender
          broadcast(room, ws, data, false);
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

// // broadcasting function
function broadcast(room, data, room /* toSender */) {
  data = JSON.stringify(data);

  // send to all including sender
  // if (toSender) {
  //   wss.clients.forEach(function each(client) {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(data);
  //     }
  //   });
  //   return;
  // }

  // send to all excluding sender
  let clients = rooms[room].members;

  clients.forEach(function each(client) {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// new client connected
function newClient(ws, room, clients, userName, userID) {}

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
