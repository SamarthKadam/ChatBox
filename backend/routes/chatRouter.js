const express=require('express');
const chatController=require('../controllers/chatController')
const authController=require('../controllers/authController')

const router=express.Router();
router.post('/',authController.protect,chatController.acessChat)
router.get('/',authController.protect,chatController.fetchChats);






module.exports=router;