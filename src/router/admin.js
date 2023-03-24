const adminController=require('../controller/adminController');
const adminRouter=require('express').Router();

adminRouter.post('/signupUser',adminController.adduser);
adminRouter.post('/loginUser',adminController.loginuser);


module.exports=adminRouter;
