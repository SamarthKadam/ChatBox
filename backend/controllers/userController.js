const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Chat=require('../models/chatModel');

exports.getAllUsers=catchAsync(async(req,res)=>{

    const keyword=req.query.search?{$or:[{name:{$regex:req.query.search,$options:"i"}},{email:{$regex:req.query.search,$options:"i"}}]}:{};
    const users=await User.find(keyword).find({_id:{$ne:req.user._id}})

    res.status(200).json({
        status:'success',
        users
    })

})

// exports.AvailableUsersToCreateGroup=catchAsync(async(req,res)=>{

    
// })