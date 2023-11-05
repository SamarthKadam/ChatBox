const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');
const userController=require('../controllers/userController');


router.get('/',authController.protect,userController.getAllUsers)
// router.get('/groupUsers',authController.protect,userController.AvailableUsersToCreateGroup)
router.post('/updateMe',authController.protect,userController.UpdateMe)
router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/ispresent',authController.isUserPresent)
router.post('/protect',authController.protect,authController.send);
router.post('/uploadPhoto',authController.protect,userController.uploadUserPhoto,userController.UploadPhoto)


module.exports=router;