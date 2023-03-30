const User=require('../models/user');
const Book=require('../models/book');
const Issue=require('../models/issuehistory');
const common=require('../utils/common');
const services=require('../services/admin');

exports.issuebook=async (req, res) => {

    const email = req.body.email;
    const bookId = req.body.bookId;
    try {
        const book = await Book.findOne({bookId});
        const user = await Book.findOne({email});
        
        if(!book){
            throw new Error('Invalid book id');
        }
        if(!user){
            throw new Error('user not found');
        }
        
        if(book.issue){
            throw new Error('Book is already issued');
        }

        const issue = new Issue({
            bookId : book.bookId,
            ownerId : user._id,
        });

        await issue.save();
        book.status = "Issued";
        await book.save();

        res.send({message:"Book issued"});
    } catch (error) {
        res.status(400).send({error : error.message});
    }
};

exports.returnbook=async(req, res) =>{
    const bookId = req.body.bookId;
    try {
        const book = await Book.findOne({bookId});

        if(!book){
            throw new Error('Invalid book id');
        }

        if(book.avilable){
            throw new Error('Book is already returned');
        }

        book.ownerId = null;
        book.status = "Available";
        book.re

    } catch (error) {
        res.status(400).send({error : error.message});
    }
};

   