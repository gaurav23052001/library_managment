const adminController=require('../controller/adminController');
const adminRouter=require('express').Router();
const adminAuth=require('../middleware/adminAuth');
const upload=require('../utils/pictureupload');


adminRouter.post('/issueBook',adminAuth,adminController.issuebook);

module.exports=adminRouter;
