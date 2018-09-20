const express = require("express");
const app = express();
const socket = require("socket.io");
const port = 3003;

const server = app.listen(port, () => {
  console.log("Servidor executando na porta " + port);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  console.log(`Socket connection ${socket.id}`);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});