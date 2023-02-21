const mongoose = require('mongoose');
const weightSchema = mongoose.Schema({
    value: { type: Number},
    date: { type: Date, default: Date.now },
})


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    role: {
        type: Number
    },
    gender: {
        type: String,
    },
    weight: [{
        type: weightSchema,
    }],
    height: {
        type: Number,
        min: 100,
        max: 2100
    },
    target: {
        type: String
    },
    days: {
        type: Number
    },
    registrationDate: { 
        type: Date, 
        default: Date.now,
        immutable: true
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    program_id: {
        type: String,
        required: [true, 'Please choose a Program'],
    }
}, {
    timstamps: true,
});

module.exports = mongoose.model('User', userSchema);