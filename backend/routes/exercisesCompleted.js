const express = require('express');
const { 
    getCompleted,
    setCompleted,
    updateCompleted,
    deleteCompleted, 
    getCompletedExForDay
} = require('../controllers/completedController');
const router = express.Router();


router.route('/').get(getCompleted).post(setCompleted);
router.route('/:id').put(updateCompleted).delete(deleteCompleted);
router.get('/exercise', getCompletedExForDay);


module.exports =router;