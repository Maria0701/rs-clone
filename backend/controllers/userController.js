const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Get users
// GET /api/users
// Private
const getUsers = asyncHandler(async (req, res) => {
    const user  = await User.find()
    res.status(200).json(user);
});

// Get users
// GET /api/users/me
// Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email,
    })
});

// Register user
// POST /api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error ('Plese check fields');
    }

    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User

    const user = await User.create({
        name,
        email,
        password: hashedPassword,        
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }

});

// Login user
// POST /api/users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
    const  {email, password} = req.body;

    //Check for user Email 
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials')
    }
});

// update users
// PUT /api/users/:id
// Private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)  {
        res.status(400);
        throw new Error ('user not Found');
    }

    const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    });

    res.status(200).json(updateduser);
});

// delete users
// DELETE /api/users/:id
// Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await user.findById(req.params.id);

    if (!user)  {
        res.status(400);
        throw new Error ('user not Found');
    }

    await user.remove;

    res.status(200).json({id: req.params.id});
});



module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getMe
};