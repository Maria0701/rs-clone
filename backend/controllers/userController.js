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
    const person = await User.findById(req.query.id)

    if (!person) {
        res.status(400);
        throw new Error ('User does not exist');
    }

    const {
        _id, 
        name, 
        email, 
        role,
        gender,
        weight,
        height,
        program_id,
        days,
        registrationDate,
        isAuth 
    } = person;

    res.status(200).json({
        id: _id,
        name,
        email,
        role,
        gender,
        weight,
        height,
        program_id,
        days,
        registrationDate,
        isAuth,
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
            role: user.role
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
            role: user.role
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

    if (!req.params.id)  {
        res.status(400);
        throw new Error ('user not Found');
    }

    let newObj;

    console.log(req.body);

    if ( Object.keys(req.body).length === 7) {
        newObj = {
            days: req.body.days,
            gender: req.body.gender,        
            height: req.body.height,
            id: req.body.id,
            program_id: req.body.program_id,
            $push: {weight: {value: req.body.weight2} },
            isAuth: req.body.isAuth
        }
    } else if (req.body.weight2 && Object.keys(req.body).length === 2) {
        newObj = {
            id: req.body.id,
            $push: {weight: {value: req.body.weight2} },
        }
    } else {
        newObj = req.body
    }

    console.log(newObj)

    const updateduser = await User.findByIdAndUpdate(req.params.id, newObj, {
        new: true
    });

    res.status(200).json(updateduser);
});

// update users
// PUT /api/users/weight/:id
// Private
const updateUserWeight = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!req.params.id)  {
        res.status(400);
        throw new Error ('user not Found');
    }

    var update = {$push: {weight: {value: req.body} }};
    const updatedWeight = await User.findByIdAndUpdate(user._id, update,{upsert: true});

    res.status(200).json(updatedWeight);
});

// delete users
// DELETE /api/users/:id
// Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user)  {
        res.status(400);
        throw new Error ('user not Found');
    }

    await user.remove();

    res.status(200).json({id: req.params.id});
});



module.exports = {
    getUsers,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getMe, 
    updateUserWeight
};