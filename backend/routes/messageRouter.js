const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController')
const messageController=require('../controllers/messageController');

router.route('/').post(authController.protect,messageController.sendMessage)
router.route('/:chatId').get(authController.protect,messageController.getAllMessages);

module.exports=router;