const mongoose= require("mongoose");
const user = require("./user");


const bookhistory=new mongoose.Schema({
    bookId :{
        type : String,
    },
    issuDate : {
        type:Date,
        default:new Date()
    },
    returnDate : {
        type:Date,
    },
      ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    

})

const history =new mongoose.model("issue", bookhistory); 
module.exports =history;
