const bcrypt = require("bcryptjs");
const moment = require("moment");
const common = require("../utils/common");
const User = require("../models/user");
const Issue = require("../models/issuehistory");
const Book = require("../models/book");

exports.createUser = async (req) => {
  const spassword = await bcrypt.hash(req.body.password, 12);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: spassword,
    address: req.body.address,
  });
  await user.save();
  return {
    message: "User register successfully",
  }
};

exports.loginUser = async (email, password) => {
  const user = await common.findByCredentials(email, password);
  if (user.role == "user") {
    const token = await common.generateAuthToken(user._id);

    return {
      message: "User login successfully",
      data: user,
      token,
    };
  }
  const token1 = await common.generateAuthTokenAdmin(user._id);
  return {
    message: "User login successfully",
    data: user,
    token1,
  };
};

exports.Issuedbook= async (req) =>{
  const issuebook=await Issue.find({ownerId:req.user._id});
  const returnData = [];
  for(let i=0;i<issuebook.length;i++){
    var obj ={};
    const today=moment();
    const x = moment(issuebook[i].issuDate);
    const days=today.diff(x,"days");
    var book = await Book.find({bookId:issuebook[i].bookId});
    if(days > 7){
      obj = {
        book,
        message : "you have exceeds the date"
      }
    }
    obj.book = book;
     obj.days = days;
     returnData.push(obj)
  }

  return{
    data : returnData
  }
};

exports.uploadImage=async(user,avtar)=>{
  user.image=avtar;
  await user.save();
  return{
    status : true,
    message : 'Image uploaded successfully'
}
};

