const jwt = require('jsonwebtoken')
const User = require('../model/user')
const adminauth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.TOKEN_VERIFY);      // verify token
        const user = await User.findById(decoded._id);

        if(user.role == 'user'){
            throw new Error();
        }
        req.user =  user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
module.exports = adminauth;