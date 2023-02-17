const mongoose = require('mongoose');
const completedSchema = mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now 
    },
    program_name: {
        type: String
    },
    program_id: {
        type: String
    },
    exercise_name: {
        type: String
    },
    exercise_id: {
        type: String
    },
    preview: {
        type: String
    },
    time: {
        type: String
    },
    user_id:  {
        type: String
    },
})