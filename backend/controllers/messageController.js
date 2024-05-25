const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const Message=require('../models/messageModel')
const User=require('../models/userModel')
const Chat=require('../models/chatModel');


exports.sendMessage=catchAsync(async(req,res,next)=>{

    const {content,chatId}=req.body;

    if(!content||!chatId)
    {
        return next(new AppError("Invalid data passed into request",400))
    }

    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    };

    let message=await Message.create(newMessage);
    message=await message.populate("sender","name pic")
    message=await message.populate("chat")
    message=await User.populate(message,{
        path:'chat.users',
        select:'name pic email'
    })

    await Chat.findByIdAndUpdate(req.body.chatId,{latestMessage:message})
    res.status(200).json({
        status:'success',
        data:message
    })

})

 

exports.addReaction = catchAsync(async (req, res, next) => {
    const { messageId, reactionType } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
        return next(new AppError("Message not found", 404));
    }

    // Check if the user has already reacted to this message
    const existingReactionIndex = message.reactions.findIndex(reaction => reaction.user.equals(req.user._id));
    if (existingReactionIndex !== -1) {
        // User has already reacted, update the reaction type
        message.reactions[existingReactionIndex].type = reactionType;
    } else {
        // User hasn't reacted, add a new reaction
        message.reactions.push({ type: reactionType, user: req.user._id });
    }

    // Save the updated message document
    await message.save();

    res.status(200).json({
        status: 'success',
        data: message
    });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
    const messages = await Message.find({ chat: req.params.chatId })
        .populate('sender', "name pic email")
        .populate('reactions.user', 'name pic email');

    if (!messages) {
        return next(new AppError('Something went wrong while fetching messages', 400));
    }

    res.status(200).json({
        status: 'success',
        message: messages
    });
});

exports.addReaction = catchAsync(async (req, res, next) => {
    const { messageId, reactionType } = req.body;

    const message = await Message.findById(messageId);
    if (!message) {
        return next(new AppError("Message not found", 404));
    }

    const existingReactionIndex = message.reactions.findIndex(reaction => reaction.user.equals(req.user._id));
    if (existingReactionIndex !== -1) {
        message.reactions[existingReactionIndex].type = reactionType;
    } else {
        message.reactions.push({ type: reactionType, user: req.user._id });
    }

    await message.save();

    const populatedMessage = await Message.findById(messageId)
      .populate('sender', "name pic email")
      .populate('reactions.user', 'name pic email');

    res.status(200).json({
        status: 'success',
        data: populatedMessage
    });
});
