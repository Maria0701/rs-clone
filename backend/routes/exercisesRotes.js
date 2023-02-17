const express = require('express');
const { getExercises, setExercises, updateExercise, deleteExercise } = require('../controllers/exerciseController');
const router = express.Router();


router.route('/').get(getExercises).post(setExercises);
router.route('/:id').put(updateExercise).delete(deleteExercise);



module.exports=router;