// const app = require("express")();
// const fs = require("fs");
// const WebSocket = require("ws");

// const PORT = 8080;

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

// const https = require("https").createServer(options, app);
// const wss = new WebSocket.Server(https);
// // const io = require("socket.io")(https);

// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
//   });

//   ws.send("something");
// });

// app.get("/", (req, res) => {
//   res.send(`<h1>Hello from server</h1>`);
// });

// // on socket connect
// // io.on("connection", (socket) => {
// //   socket.on("drawing", (data) => {
// //     // socket.broadcast.emit("drawing", data);
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("client disconnected");
// //   });
// // });

// https.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });

/* 
//////////////////////
//////////////////////
*/
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

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  var userID = getUniqueID();

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;

  console.log("connected: " + userID);

  /* 
	//////////////
	custom events
	//////////////
	*/
  connection.on("message", (message) => {
    let msgString = JSON.stringify(message.utf8Data);

    // Loop through all clients
    for (var i in clients) {
      // Send a message to the client with the message
      clients[i].sendUTF(msgString);
    }
  });

  connection.on("close", function (reasonCode, desc) {
    delete clients[userID];
    console.log(reasonCode, desc);
  });
});
