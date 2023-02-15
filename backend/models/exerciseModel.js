const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    video: {
        type: String,
        required: [true, 'Please Add Video'],
    },
    description: {
        type: String,
    }
}, {
    timstamps: true,
});

module.exports = mongoose.model('Exercise', exerciseSchema);