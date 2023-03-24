const User=require('../models/user');
const bcrypt=require('bcryptjs');

exports.adduser=async (req, res) => {

    try {
        const spassword=await bcrypt.hash(req.body.password,12);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password:spassword,   
            address: req.body.address,
        })

        await user.save();
        return res.status(201).send({ message: 'User register successfully', data: user, token, status: 201 });
   
    }
    catch (err) {
        res.send(err);
    }
};

exports.loginuser= async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        
        const token = await user.generateAuthToken() ;

        res.status(200).send({message:'User login successfully', data:user, status : 200 })
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send({message:'Enter the correct credidentials', data:null, status : 400 })
    }
};


