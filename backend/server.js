const express = require("express");
// const app = express();
const http = require("http");
const mongoose = require("mongoose");
const moment = require("moment");
const User = require("./models/userModel");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });
const DBAuth = process.env.DB.replace("<password>", process.env.DBpassword);

mongoose
  .connect(DBAuth, {
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection");
});

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`SERVER RUNNING IN PORTNO:${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "https://chat-box-samarthkadam.vercel.app",
      "http://localhost:3000",
    ],
  },
});

io.on("connection", (socket) => {
  socket.on("setup", async (userData) => {
    socket.userId = userData._id;
    await User.findByIdAndUpdate(socket.userId, {
      isOnline: true,
      lastOnline: null,
    });
    socket.join(userData._id);
    socket.emit("connected");
    io.emit("status update", {
      userId: socket.userId,
      isOnline: true,
      lastOnline: null,
    });
  });

  socket.on("disconnect", async () => {
    if (socket.userId) {
      const lastOnline = moment().toISOString();
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastOnline,
      });
      io.emit("status update", {
        userId: socket.userId,
        isOnline: false,
        lastOnline,
      });
    }
  });

  socket.on("logout", async () => {
    if (socket.userId) {
      const lastOnline = moment().toISOString();
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastOnline,
      });
      io.emit("status update", {
        userId: socket.userId,
        isOnline: false,
        lastOnline,
      });
      socket.userId = null;
      socket.emit("server processed logout..!");
    }
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => {
    socket.to(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing", room));

  socket.on("removechatbar-send", (chatId) => {
    console.log("remove chat bar for this id", chatId);
    socket.to(chatId).emit("removechatbar-recieve", chatId);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return chat.users("users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});
