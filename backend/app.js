const express=require('express');
const app=express();
const AppError=require('./utils/AppError')
const globalErrorHandler=require('./utils/errorController');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const userRouter=require('./routes/userRouter');
const chatRouter=require('./routes/chatRouter');
const messageRouter=require('./routes/messageRouter')

app.use(cors());
app.use(cookieParser());
app.use(express.json());




app.use('/api/v1/users',userRouter);
app.use('/api/v1/chat',chatRouter)
// app.use('/api/v1/message',messageRouter)



app.all("*",(req,res,next)=>{
    
    next(new AppError("TypeError",404));
})


app.use(globalErrorHandler)

module.exports=app;