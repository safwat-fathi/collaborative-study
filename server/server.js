const mongoose = require("mongoose");
const webSocketServer = require("websocket").server;
const webSocketsServerPort = 8000;

const User = require("./models/user.model");

const http = require("http");

// Spinning the http server and the websocket server.
const server = http.createServer();

server.listen(webSocketsServerPort);

const wsServer = new webSocketServer({
  httpServer: server,
});

wsServer.on("request", function (request) {
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);

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
          let room = data.room;
          let payload = data.payload;
          let userName = payload.userName;
          let userID = payload.userID;

          const newUser = new User({ name: userName, userID });
          newUser.save((err, doc) => {
            if (err) {
              console.error(err);
              return;
            }

            console.log("document inserted successfully");
          });
          break;
        case "chatting":
          // console.log(data);
          break;
        case "drawing":
          console.log("drawing!");
          break;
        default:
          break;
      }
      // BROADCAST the message to all connected clients
      // broadcast(data);
    } catch (err) {
      console.log(err);
    }
  });

  connection.on("close", function (reasonCode, desc) {
    console.log(reasonCode, desc);
  });

  // function broadcast(data) {
  //   // Loop through all clients
  //   for (let i in clients) {
  //     // Send a the message to every client connected except sender
  //     if (clients[i] !== clients[userID]) {
  //       clients[i].send(JSON.stringify(data));
  //     }
  //   }
  // }

  function createRoom(rooms, newRoom) {
    let isExisted = rooms.includes(newRoom);
    // pushing only rooms that is new & not garbage data

    if (!isExisted && newRoom !== undefined) {
      rooms.push(newRoom);
    }
    return;
  }
});

/* 
MongoDB >>>>>>>
----------------
*/
mongoose.connect("mongodb://localhost/27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to db!");
});

/* 
Cases should be handled:
-----------------------
- rooms has undefined named room. ALWAYS!
- chat messages needs adjustments.
- figure a better model for chat messages!
- pass the user name from App component.
- utilty functions (broadcast & userID in utils folder).
- declare client only in one component and pass to all commponents. 
*/
