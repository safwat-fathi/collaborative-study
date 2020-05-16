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
    let data = JSON.parse(message.utf8Data);

    broadcast(data);
  });

  connection.on("close", function (reasonCode, desc) {
    delete clients[userID];
    console.log(reasonCode, desc);
  });

  function broadcast(data) {
    // Loop through all clients
    for (var i in clients) {
      // Send a message to the client with the message
      clients[i].send(JSON.stringify(data));
    }
  }
});
