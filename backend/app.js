const express=require('express');
const app=express();
const AppError=require('./utils/AppError')
const globalErrorHandler=require('./utils/errorController');
const cookieParser=require('cookie-parser');
const cors=require('cors');

app.use(cors());

app.use(cookieParser());

app.use(express.json());



app.get('/',(req,res)=>{
    res.status(200).json({
        status:"success",
        message:'you are all set to go'
    })
})

app.all("*",(req,res,next)=>{
    
    next(new AppError("TypeError",404));
})


app.use(globalErrorHandler)

module.exports=app;