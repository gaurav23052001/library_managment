const jwt = require('jsonwebtoken');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const multer=require('multer');



exports.generateAuthToken = async(id)=>{
    return await jwt.sign({_id : id}, process.env.TOKEN_VERIFY);
}

exports.generateAuthTokenAdmin = async(id)=>{
    return await jwt.sign({_id : id}, process.env.TOKEN_VERIFY_ADMIN);
};

exports.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    
    const ismatch = await bcrypt.compare(password, user.password)
   
    if(!ismatch){
        throw new Error('Unable to login')
    }

    return user;
};

