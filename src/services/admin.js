const bcrypt = require("bcryptjs");
const moment =require('moment');
const ExcelJS = require('exceljs');

const common = require("../utils/common");
const User = require("../models/user");
const Book = require("../models/book");
const Issue = require("../models/issuehistory");

exports.issubook = async (email,bookId) =>{
  const book = await Book.findOne({bookId});
        const user = await User.findOne({email});
        
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

exports.returnbook= async(bookId,email)=>{
  const book = await Book.findOne({bookId});
  const user = await User.findOne({email});

  if(!book){
      throw new Error('Invalid book id');
  }

  if(book.status=="Available"){
    throw new Error('Book is avilable can not be rertured');
  }
  
  const Activity=await Issue.findOne({bookId, issueDate : book.issudate}); 
  const issuedate=moment(Activity.issuDate);
  Activity.returnDate = new Date;
  const today=moment(Activity.returnDate);
  book.status = 'Available';
  Activity.ownerId=undefined;
  const diff=issuedate.diff(today,'days');
  const days= diff;
  if(days>7){
    user.blacklist=true;
  }
  await user.save();
  await Activity.save();
  await book.save();
  return {
    message: "book returned successfully",
  };
};

exports.blacklist=async()=>{
  const user= await User.find({blacklist :true});
if (!user) {
  return {
    message: "no user found"
  }
}
return user;
};

exports.blacklistDownload=async()=>{
  const user= await User.find({blacklist :true});
if (!user) {
  return {
    message: "no user found"
  }
}

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('My Worksheet');

worksheet.columns = [
  { header: 'Name', key: 'name', width: 40 },
  { header: 'Email', key: 'email', width: 40 },
];

for(let i=0; i< user.length ; i++){
  worksheet.addRow({ name: user[i].name, email: user[i].email });
}
await workbook.xlsx.writeFile('./src/Blacklist/myWorkbook.xlsx');
return{
  message : 'File downloaded'
};
}

