const Book=require('../models/book');
const services=require("../services/book")
const count=0;

const addbook=async(req,res)=>{
    try {
        const response = await services.addbook(req);
        return res.status(201).send(response);
    }
    catch (err) {
        res.send(err);
    }
};

const readbook=async(req,res)=>{
    try {
        const response = await services.readbook(req);
        return res.status(201).send(response);

    } catch (error) {
        res.send(error)
    }
};

const readbookId=async(req,res)=>{
    try {
        const bookId =req.params.id;
        const bookData = await Book.findOne({bookId});
        if (!bookData) {
            return res.status(404).send();
        } 
        res.send(bookData);
    } catch (error) {
        res.send(error)
    }
};

const updatebook=async(req,res)=>{
    try {
        const _id =req.params.id;
      const response= await services.updatebook(_id,req);
      res.status(200).send(response);
    } catch (error) {
        res.status(404).send(error);
    }
};

const deletebook=async(req,res)=>{
    try {
        const deleteBooks= await Book.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(404).send();
        }
        res.send(deleteBooks);
    } catch (error) {
        res.send(error)
    }
};

module.exports={
    addbook,readbook,updatebook,deletebook,readbookId
}
