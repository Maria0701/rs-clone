const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            //verify tocken
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get userId
            req.user = await User.findById(decoded.id).select('-password');
            next();

        } catch {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token ) {
        res.status(401);
        throw new Error('Not autorized, no token')
    }
});

module.exports = { protect };