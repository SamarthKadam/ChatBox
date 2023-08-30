const express = require('express');
// const app = express();
const http = require('http');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=require('./app');
dotenv.config({path:'./config.env'});
const DBAuth=process.env.DB.replace('<password>',process.env.DBpassword);
console.log(DBAuth);


mongoose.connect(DBAuth,{
useUnifiedTopology: true 
}).then((con)=>{
    console.log("DB connection successful");
})

process.on('unhandledRejection',err=>{
    console.log(err.name,err.message);
    console.log("Unhandled rejection");
})

const port=process.env.PORT;

const server=app.listen(port,()=>{
    console.log(`SERVER RUNNING IN PORTNO:${port}`);
})





















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
