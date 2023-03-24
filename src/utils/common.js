const jwt = require('jsonwebtoken');
const User=require('../models/user');
const bcrypt=require('bcryptjs');



exports.generateAuthToken = async(id)=>{
    return await jwt.sign({_id : id}, process.env.TOKEN_VERIFY);
}

exports.findByCredentials=async(email,password)=>{
    const User=await User.findOne({email})
    if(!User){
        throw new Error('Unable to login')
    }
    
    const ismatch = await bcrypt.compare(password, User.password)
   
    if(!ismatch){
        throw new Error('Unable to login')
    }

    return User
}