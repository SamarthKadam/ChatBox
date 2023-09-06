const Chat=require('../models/chatModel')
const catchAsync=require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');


exports.acessChat=catchAsync(async(req,res,next)=>{

    const {userId}=req.body;
    if(!userId)
    {
        return next(new AppError("Something went wrong",400))
    }

    var isChat=await Chat.find({isGroupChat:false,$and:[
        {
            users:{$elemMatch:{$eq:userId}},
            users:{$elemMatch:{$eq:req.user._id}}
        }
    ]}).populate('users','-password').populate('latestMessage');

    isChat=await User.populate(isChat,{
        path:'latestMessage.sender',
        select:'name pic email'
    })

    if(isChat.length>0)
    {
        res.send(isChat[0]);
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }

        try{
            const createdChat=await Chat.create(chatData);
            const FullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).json(FullChat);
        }catch(err)
        {
            next(new AppError("Something went wrong",400))
        }

    }

})


exports.fetchChats=catchAsync(async(req,res,next)=>{
    try{
        Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate('users',"-password").populate('groupAdmin','-password').populate('latestMessage').sort({updatedAt:-1})
        .then(async(data)=>{
            data=await User.populate(data,{
                path:'latestMessage.sender',
                select:"name pic email"
            })

            res.status(200).json({
                status:'success',
                data
            })
        })

    }catch(err)
    {
        next(new AppError("Something went wrong",400))
    }
})