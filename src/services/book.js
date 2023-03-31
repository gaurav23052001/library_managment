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

exports.readbook=async(req)=>{
    let arr =[]
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
    let max=arr[0];

    for(let i=1;i<arr.length;i++){
        if(arr[i].issued>max.issued){
            max=arr[i];
        }
    }
    if(req.query.issued){
        arr = arr.filter((book) => book.issued>0);
    }

    if(req.query.Avilable){
        arr = arr.filter((book) => book.avilable>0);
    }

    if(req.query.sortBy){
         arr.sort((book1, book2) => book1[req.query.sortBy] - book2[req.query.sortBy]);
    }
    return{
        mostIssuedBook : max,
        Books : arr
    };
};

exports.updatebook=async(_id,req)=>{
    const updateuser = await User.findByIdAndUpdate(_id,req);
       return updateuser;
}
