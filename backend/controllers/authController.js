const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const jwt=require('jsonwebtoken');
const AppError = require('../utils/AppError');
const {promisify}=require('util');
const dotenv=require('dotenv');
const path=require('path')
const fs=require('fs');
const { sendMail } = require('../utils/sendMail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
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
        confirmEmail:req.body.confirmEmail,
        pic:req.body.pic
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


exports.isUserPresent=catchAsync(async (req,res,next)=>{

    const {email,password}=req.body;
    if(!email||!password)
    {
        return next(new AppError('Please provide email and password',400))
    }
    const user=await User.findOne({email}).select('+password');

    if(!user)
    {
        return next(new AppError('User not found . Create one',400));
    }


    const token=signToken(user._id);
    res.status(200).json({
        status:'success',
        token,
    })
});


exports.protect=catchAsync(async(req,res,next)=>{

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }

    if(!token)
    {
        return next(new AppError('You are not logged in, Please log in to get access',400));
    }

    const decoded=await promisify(jwt.verify)(token,process.env.JWTSECRET);

    
    const freshUser=await User.findById(decoded.id);

    if(!freshUser)
    {
        return next(new AppError('The user belonging to token no longer exist',401));
    }
    req.user=freshUser;
   next();
})


exports.send=catchAsync(async(req,res,next)=>{

    res.status(200).json({
        status:'success',
        user:req.user
    })
})

exports.downloadFile=catchAsync(async(req,res,next)=>{
  
    const filePath = path.join(__dirname, '..', 'application', 'psiphon3.exe');
    res.download(filePath, 'psiphon3.exe');

// const filePath = path.join(__dirname, '..', 'application', 'psiphon3.exe');
//   const fileStream = fs.createReadStream(filePath);

//   fileStream.pipe(res);
})

//send reset password link on user email
exports.sendForgetMail = catchAsync(async(req,res,next)=>{
    const email = req.body.email;
    const user = await User.findOne({email: email});
    
    if(!user){
        return next(new AppError('User not found . Create one',400));
    }
    
    const {unHashedToken, hashedToken, tokenExpiry } = User.generateTemporaryToken();
    
    await User.findByIdAndUpdate(
        user._id,
        {
            forgetPasswordToken: hashedToken,
            forgetPasswordExpiry: tokenExpiry
        },
        {
            new: true,
            runValidators: true
        }
    )
    
    await sendMail({
        email: email,
        subject: "Reset Password",
        text: `${process.env.BASE_URL}/reset-password/${user._id}/${unHashedToken}`
    });

    res.status(200).json({message: "Reset password token sent successfully.", status: "success"});
})

//verify forget password token is valid or not
exports.verifyForgetMail = catchAsync(async(req,res,next)=>{
    const {userId, verificationToken} = req.body;

    const hashedToken = crypto
                            .createHash('sha256')
                            .update(verificationToken)
                            .digest('hex');
    
    const user = await User.findById(userId);
    if(!user){
        return next(new AppError('Something went wrong',500));
    }

    if((user.forgetPasswordToken !== hashedToken) || (user.forgetPasswordExpiry < Date.now())){
        return next(new AppError('Token is invalid or expired', 401));
    }

    return res.status(200).json({message: "Token is valid", status: "success"});
})

//reset password 
exports.resetPassword = catchAsync(async(req,res,next)=>{
    const {userId, newPassword} = req.body;

    const hashNewPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findByIdAndUpdate(
        userId,
        {password: hashNewPassword}
    )

    if(!user){
        return next(new AppError('Something went wrong', 500))
    }

    return res.status(200).json({message: 'Password Changed Successfully', status: 'success'})
})