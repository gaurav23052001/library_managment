const userController=require('../controller/userController');
const userRouter=require('express').Router();
const userAuth=require('../middleware/userAuth');
const upload=require('../utils/pictureupload');


userRouter.post('/signupUser',userController.adduser);
userRouter.post('/loginUser',userController.loginuser);
userRouter.get('/getUser',userAuth,userController.getuser);
userRouter.post('/uploadProfile',userAuth,upload.single('image'),userController.uploadprofilepic);

module.exports=userRouter;
