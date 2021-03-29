require("dotenv").config();
const { PORT, DB_ACCESS } = process.env;

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const eventRoutes = require("./src/routes/event");
const usersRoutes = require("./src/routes/users");
const refreshTokenRoutes = require("./src/routes/refreshToken");
const chatRoutes = require("./src/routes/chat");
const likedRoutes = require("./src/routes/likedBy");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
//routes
app.use("/v1/user", usersRoutes);
app.use("/v1/refreshToken", refreshTokenRoutes);
app.use("/v1/event", eventRoutes);
app.use("/v1/chat", chatRoutes);
app.use("/v1/likedEvent", likedRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(DB_ACCESS)
  .then(() => {
    app.get("/", (res) =>
      res.send("<h2> Hello User! Lets surf with us! :) </h2>")
    );

    const server = app.listen(PORT, () =>
      console.log(`app listening on port ${PORT}`)
    );

    // socket io connection
    const io = socketio(server);
    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

    io.on("connection", (socket) => {
      console.log(`Client ${socket.id} connected`);

      // Join a conversation
      const { roomId } = socket.handshake.query;
      socket.join(roomId);

      // Listen for new messages
      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
      });

      // Leave the room if the user closes the socket
      socket.on("disconnect", () => {
        console.log(`Client ${socket.id} diconnected`);
        socket.leave(roomId);
      });
    });
  })
  .catch((err) => console.log(err));
