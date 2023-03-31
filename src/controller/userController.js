const User=require('../models/user');
const common=require('../utils/common');
const services=require('../services/user');

exports.adduser=async (req, res) => {

    try {
        const response = await services.createUser(req);
        return res.status(201).send(response);
    }
    catch (err) {
        res.send(err);
    }
};

exports.loginuser= async (req, res) => {
    try {
        const response= await services.loginUser(req.body.email, req.body.password);
        res.status(200).send(response);
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send(e.message);
    }
};

exports.getuser= async (req, res) => {
    try {
        res.send(req.user);
    } catch (e) {
        console.log("error => ",e)
        res.status(400).send(e.message);
    }
};

exports.uploadprofilepic= async (req, res) => {
    try {
        res.send("proflie picture uploaded");
    } catch (e) {
        res.status(400).send(e.message);
    }
};

exports.Issuedbook= async(req ,res)=>{
    try {
        const response = await services.Issuedbook(req);
        return res.status(201).send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
}