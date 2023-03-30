const multer=require('multer');
const path=require('path');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImage'),function(error,success){
            if (error) throw error
        });
    },
    filename:function(req,file,cb){
        const name=Date.now()+'_'+file.originalname;
        cb(null,name,function(error1,success1){
            if(error1) throw  error1 ;
        })
    }
});

module.exports=multer({storage:storage});