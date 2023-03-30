const bcrypt = require("bcryptjs");
const common = require("../utils/common");
const User = require("../models/user");
const Book = require("../models/book");
const Issue = require("../models/issuehistory");

exports.issubook = async (email,bookId) =>{
  const book = await Book.findOne({bookId});
        const user = await Book.findOne({email});
        
        if(!book){
            throw new Error('Invalid book id');
        }
        if(!user){
            throw new Error('user not found');
        }
        
        if(book.status=='Issued'){
            throw new Error('Book is already issued');
        }

        const issue = new Issue({
            bookId : book.bookId,
            ownerId : user._id,
        });

        await issue.save();
        book.status = "Issued";
        await book.save();
        return {
          message: "book Issued successfully",
        };
};

exports.returnbook= async(bookId)=>{
  const book = await Book.findOne({bookId});

  if(!book){
      throw new Error('Invalid book id');
  }

  if(book.status!=="Issued"){
      throw new Error('Book is already returned');
  }

  const Activity=await Issue.findOne({bookId, issueDate : book.issudate}); 
  Activity.returnDate = new Date;
  book.status = 'Available';
  Issue.ownerId=undefined;
  await Activity.save();
  return {
    message: "book returned successfully",
  };
}
