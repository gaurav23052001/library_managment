const adminController=require('../controller/adminController');
const adminRouter=require('express').Router();
const adminAuth=require('../middleware/adminAuth');
const upload=require('../utils/pictureupload');


adminRouter.post('/issueBook',adminAuth,adminController.issuebook);
adminRouter.post('/returnBook',adminAuth,adminController.returnbook);
adminRouter.get('/history',adminAuth,adminController.history);
adminRouter.get('/blackListUser',adminAuth,adminController.blacklist);
adminRouter.get('/blackListDownload',adminAuth,adminController.blacklistDownload);



module.exports=adminRouter;
