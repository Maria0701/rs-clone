const mongoose = require('mongoose');
const programSchema = mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'Please add a name'],
    },
    date: { type: Date, default: Date.now },
    img: { 
        type: String,
    },
    description: { 
        type: String,
    },
    exersises_ids:[String]
});

module.exports = mongoose.model('Program', programSchema);