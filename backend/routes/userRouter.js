const express=require('express');
const router=express.Router();
const authController=require('../controllers/authController');

router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/ispresent',authController.isUserPresent)


module.exports=router;