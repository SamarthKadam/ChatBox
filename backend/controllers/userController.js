const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Chat=require('../models/chatModel');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
  
    return newObj;
  };

exports.getAllUsers=catchAsync(async(req,res)=>{

    const keyword=req.query.search?{$or:[{name:{$regex:req.query.search,$options:"i"}},{email:{$regex:req.query.search,$options:"i"}}]}:{};
    const users=await User.find(keyword).find({_id:{$ne:req.user._id}})

    res.status(200).json({
        status:'success',
        users
    })

})

exports.UpdateMe=catchAsync(async(req,res,next)=>{

    const filteredBody=filterObj(req.body,"name","email")
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        status:'success',
        updatedUser
      })

})

// exports.AvailableUsersToCreateGroup=catchAsync(async(req,res)=>{

    
// })