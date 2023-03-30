const Book=require('../models/book');
const count=0;

exports.addbook=async (req, res) => {

    const book = new Book({
        bookId : req.body.bookId,
        name: req.body.name,
        author: req.body.author,
    });
    await book.save(book);
    return {
        message: "Book added successfully",
      }
};

exports.readbook=async(arr)=>{
    const bookData = await Book.distinct('name');
    for(let i=0;i<bookData.length;i++){
       let n = await Book.count({name : bookData[i]})
     let issued_book=await Book.count({name : bookData[i],status:'Issued'})
     const object={
        name:bookData[i],
        total:n,
        issued:issued_book,
        avilable:n-issued_book
    }
        arr.push(object)

    }  
    res.send(arr);
}
