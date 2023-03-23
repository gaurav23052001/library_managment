// const User=require('../models/book');
const bookController=require('../controller/bookController');


router.post('/addBook',bookController.addbook)

module.exports=router;