const http = require("http");
const WebSocket = require("ws");
const app = require("./app");

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
        // case "rooms":
        //   console.log(type);
        //   console.log(payload);
        //   break;
        case "join":
          const { userID, userName } = payload;
          clients.push({ ws, userID, userName, room });
          console.log("new user joined");
          // handling duplicated connetcions
          // if (checkClientExist(clients, userID)) {
          //   console.log("user existed");
          //   clients[userID].send("you are already connected!");
          //   ws.close();
          // }
          // let roomsKeys = Object.keys(rooms);

          // console.log([rooms[room]]);

          // if (roomsKeys.includes(room)) {
          //   console.log("room existed");
          //   rooms[room].members.push(clients[userID]);
          // }
          // console.log("new room");
          // rooms[room] = {
          //   members: [clients[userID]],
          // };
          break;
        // chatting on room
        case "chatting":
          broadcast(clients, ws, room, data);
          break;
        // drawing on whiteboard
        case "drawing":
          broadcast(clients, ws, room, data);
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
function broadcast(clients, ws, room, data) {
  try {
    data = JSON.stringify(data);

    // send to all excluding sender
    clients.forEach((client) => {
      if (
        client.ws !== ws &&
        client.ws.readyState === WebSocket.OPEN &&
        client.room === room
      ) {
        client.ws.send(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function checkClientExist(clients, userID) {
  let isExisted = Object.keys(clients).includes(userID);
  return isExisted;
}

// new client connected
// function newClient(ws, room, clients, userName, userID) {}

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
