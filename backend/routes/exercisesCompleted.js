const express = require('express');
const { 
    getCompleted,
    setCompleted,
    updateCompleted,
    deleteCompleted 
} = require('../controllers/completedController');
const router = express.Router();


router.route('/').get(getCompleted).post(setCompleted);
router.route('/:id').put(updateCompleted).delete(deleteCompleted);



module.exports =router;