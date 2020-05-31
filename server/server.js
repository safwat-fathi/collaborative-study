const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;

const http = require("http");

// Spinning the http server and the websocket server.
const server = http.createServer();

server.listen(webSocketsServerPort);

const wsServer = new webSocketServer({
  httpServer: server,
});

// I'm maintaining all active connections in this object
const clients = {};
const rooms = [];

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  const userID = getUniqueID();
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  // connection.send(
  //   JSON.stringify({
  //     type: "user data",
  //     room: rooms[0],
  //     message: userID,
  //   })
  // );
  // just console.log 😁
  // console.log("connected: " + userID, rooms);
  /* 
	//////////////
	custom events
	//////////////
	*/
  connection.on("message", (message) => {
    try {
      // parse data sent from App component
      let data = JSON.parse(message.utf8Data);

      switch (data.type) {
        case "join":
          connection.send(
            JSON.stringify({
              type: "user data",
              room: rooms[0],
              message: userID,
            })
          );
          // console.log(data);
          // create new room & push it to rooms array
          createRoom(rooms, data.room);
          // just console.log 😁
          // console.log(`current rooms: ${rooms}`);
          for (let client in clients) {
            console.log("connected: " + client);
          }
          break;
        case "chatting":
          console.log(data);
          // BROADCAST the message to all connected clients
          broadcast(data);
          break;
        case "drawing":
          // BROADCAST the message to all connected clients
          broadcast(data);
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  });

  connection.on("close", function (reasonCode, desc) {
    delete clients[userID];
    console.log(reasonCode, desc);
  });

  // broadcasting function
  function broadcast(data) {
    // Loop through all clients
    for (let i in clients) {
      // Send a the message to every client connected except sender
      if (clients[i] !== clients[userID]) {
        clients[i].send(JSON.stringify(data));
      }
    }
  }

  // pushing new room
  function createRoom(rooms, roomFromData) {
    let isExisted = rooms.includes(roomFromData);
    if (!isExisted && roomFromData !== undefined) {
      rooms.push(roomFromData);
      return;
    }
    // console.log(isExisted);
    return;
  }
});

/* 
Cases should be handled:
-----------------------
- rooms has undefined named room. ALWAYS!
- chat messages needs adjustments.
- figure a better model for chat messages!
- pass the user name from App component.
- utilty functions (broadcast & userID in utils folder).
- the client should be handled by one component as ir creates 4 connections on single request. 
*/
