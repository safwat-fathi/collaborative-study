// broadcasting function
broadcast = (WebSocket, clients, ws, room, data) => {
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
};

// check if user already connected to WS
addClient = (clients, ws, userID, userName, room) => {
  if (clients.length === 0) {
    clients.push({ ws, userID, userName, room });
  }

  for (let client of clients) {
    if (client.userID === userID) {
      return;
    }
  }

  clients.push({ ws, userID, userName, room });
};

module.exports = {
  broadcast,
  addClient,
};
