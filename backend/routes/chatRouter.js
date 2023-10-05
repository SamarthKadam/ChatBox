const express=require('express');
const chatController=require('../controllers/chatController')
const authController=require('../controllers/authController')

const router=express.Router();
router.post('/',authController.protect,chatController.acessChat)
router.get('/',authController.protect,chatController.fetchChats);
router.post('/group',authController.protect,chatController.createGroupChat)
router.put('/rename',authController.protect,chatController.renameGroup)
router.put('/groupadd',authController.protect,chatController.AddPersonGroup)
router.put('/groupremove',authController.protect,chatController.RemovePersonGroup)
router.delete('/deleteChat',authController.protect,chatController.DeleteChat)





module.exports=router;