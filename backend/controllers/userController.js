const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Chat=require('../models/chatModel');
const multer=require('multer');

const multerstorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/img/user')
  },
  filename:(req,file,cb)=>{
    const ext=file.mimetype.split('/')[1];
    cb(null,`user-${req.user._id}-${Date.now()}.${ext}`)
  }
})

const multerfilter=(req,file,cb)=>{

  if(file.mimetype.startsWith('image'))
  {
    cb(null,true);
  }
  else{
    cb(new AppError(`Please upload images only`,400),false);
  }
}

const upload=multer({
  storage:multerstorage,
  fileFilter:multerfilter
})

exports.uploadUserPhoto=upload.single('photo')
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

    if(!req.body.name||!req.body.email)
    next(new AppError('Empty fields are not allowed',400))

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

exports.UploadPhoto=catchAsync(async(req,res,next)=>{

  let data;
  if (req.file)
  data= req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id,{pic:data}, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status:'success',
    data:{
      user:updatedUser
    }
  })
})

// exports.AvailableUsersToCreateGroup=catchAsync(async(req,res)=>{

    
// })