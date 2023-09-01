const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const jwt=require('jsonwebtoken');
const AppError = require('../utils/AppError');
const {promisify}=require('util');
const path = require('path')
const dotenv=require('dotenv');
dotenv.config({path:path.join(__dirname,'../config.env')});


const signToken=(id)=>{
    const token=jwt.sign({id},process.env.JWTSECRET,{expiresIn:process.env.JWTEXPIRES});
    return token;
}

exports.signup=catchAsync(async(req,res,next)=>{

    const user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        confirmEmail:req.body.confirmEmail 
    })
    const token=signToken(user._id);
    res.cookie('jwt',token,{
        httpOnly:false,
        expire:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES*24*60*60*1000)
    })
    res.status(201).json({
        status:'success',
        token,
        data:user
    })
})

exports.login=catchAsync(async (req,res,next)=>{

    const {email,password}=req.body;
    if(!email||!password)
    {
        return next(new AppError('Please provide email and password',400))
    }
    const user=await User.findOne({email}).select('+password');
    console.log(user);
    if(!user || !(await user.correctPassword(user.password,password)))
    {
        return next( new AppError('Incorrect email or password',400))
    }
    const token=signToken(user._id);
    res.status(200).json({
        status:'success',
        token,
    })
});
