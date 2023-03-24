const Book=require('../models/book');

const addbook=async(req,res)=>{
    try {
        const book = new Book({
            bookId : req.body.bookId,
            name: req.body.name,
            author: req.body.author,
        });
        await book.save(book);
        console.log(req.body);
         res.status(201).send({ message: 'Book added successfully', data: book, status: 201 })
    }
    catch (err) {
        res.send(err);
    }
};

const readbook=async(req,res)=>{
    try {
        const bookData = await Book.find();
        res.send(bookData);
    } catch (error) {
        res.send(error)
    }
};

const updatebook=async(req,res)=>{
    try {
        const _id =req.params.id;
        const updatebook = await Book.findByIdAndUpdate(_id,req.body);
        res.send(updateuser);
    } catch (error) {
        res.status(404).send(error);
    }
};

const deletebook=async(req,res)=>{
    try {
        const deleteBooks= await Book.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteBooks);
    } catch (error) {
        res.send(error)
    }
};

module.exports={
    addbook,readbook,updatebook,deletebook
}
