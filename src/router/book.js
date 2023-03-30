const bookController=require('../controller/bookController');
const router=require('express').Router();
const adminAuth=require('../middleware/adminAuth');

router.post('/addBook',adminAuth,bookController.addbook);
router.get('/readBook',bookController.readbook);
router.get('/readBook/:id',bookController.readbookId);
router.put('/updateBook/:id',adminAuth,bookController.updatebook);
router.delete('/deleteBook/:id',adminAuth,bookController.deletebook);

module.exports=router;