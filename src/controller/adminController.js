const User=require('../models/user');
const Book=require('../models/book');
const Issue=require('../models/issuehistory');
const common=require('../utils/common');
const services=require('../services/admin');

exports.issuebook=async (req, res) => {

    const email = req.body.email;
    const bookId = req.body.bookId;
    try {
        const response= await services.issubook(email, bookId);
        return res.status(201).send(response);
    } catch (error) {
        res.status(400).send({error : error.message});
    }
};

exports.returnbook=async(req, res) =>{
    const bookId = req.body.bookId;
    const email = req.body.email;
    try {
        const response= await services.returnbook(bookId,email);
        return res.status(201).send(response);
    
    } catch (error) {
        res.status(400).send({error : error.message});
    }
};

exports.history=async(req,res)=>{
    try {
        const history= await Issue.find().populate('ownerId');
        res.send(history);

    } catch (error) {
        res.status(400).send({message :'unable to fetch history'});
    }
};

exports.blacklist=async(req,res)=>{
    try {
        const response= await services.blacklist();
        return res.status(201).send(response);
    
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.blacklistDownload=async(req,res)=>{
    try {
        const response= await services.blacklistDownload();
        return res.status(201).send(response);
    } catch (error) {
        
    }
}

   