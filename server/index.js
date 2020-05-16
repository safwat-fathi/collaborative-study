const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 4000;

app.get("/", (req, res) => {
  res.send(`<h1>Hello from server</h1>`);
});

// on socket connect
io.on("connection", (socket) => {
  // console.log("a user connected");

  socket.on("drawing", (data) => {
    io.sockets.emit("drawing", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
