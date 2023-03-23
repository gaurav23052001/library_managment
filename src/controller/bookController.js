const Book=require('../models/book');

const addbook=(req,res)=>{
    try {
        const book = new Book({
            bookId : req.body.bookId,
            name: req.body.name,
            author: req.body.author,
        })
        await book.save(book);
        console.log(req.body);
         res.status(201).send({ message: 'Book added successfully', data: book, status: 201 })
    }
    catch (err) {
        res.send(err);
    }
}

module.exports={
    addbook,
}
