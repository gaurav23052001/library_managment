const bookController=require('../controller/bookController');
const router=require('express').Router();

router.post('/addBook',bookController.addbook);
router.get('/readBook',bookController.readbook);
router.put('/updateBook/:id',bookController.updatebook);
router.delete('/deleteBook/:id',bookController.deletebook);

module.exports=router;