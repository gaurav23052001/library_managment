const mongooes= require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const UserSchema=new mongooes.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:[true,"Email is already present"],
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required:true
       },
    address:{
        type:String,
        required:true
       },   
   role:{
    type: String,
    enum: ['admin', 'sub-admin', 'user'],
    default:'user'
   },
   image:String,
   tokens:[{
    token:{
        type:String,
    }
   }],
})

const user =new mongooes.model("user",UserSchema); 
module.exports =user;