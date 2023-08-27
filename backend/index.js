const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id)
  socket.join("room1");

  socket.on('sendmessage',(data)=>{
      socket.to("room1").emit("recievemessage",data);
  })



});


server.listen(4000, () => {
  console.log('listening on *:4000');
});