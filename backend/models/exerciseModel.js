const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    url: {
        type: String,
        required: [true, 'Please Add Video'],
    },
    description: {
        type: String,
    },
    img: { 
        type: String,
    },
    program_ids:[String],
}, {
    timstamps: true,
});

module.exports = mongoose.model('Exercise', exerciseSchema);