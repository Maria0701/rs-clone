const asyncHandler = require('express-async-handler');

const Exercise = require('../models/exerciseModel')
// Get exercises
// GET /api/exercises
// Private
const getExercises = asyncHandler(async (req, res) => {
    if (req.query.program_ids) {
        const exercises  = await Exercise.find({program_ids: {$eq: req.query.program_ids}})
        res.status(200).json(exercises);
    } else {
        const exercises  = await Exercise.find()
        res.status(200).json(exercises);
    }
});

// Get exercises
// GET /api/exercises/:id
// Private
const getExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise)  {
        res.status(400);
        throw new Error ('Exercise not Found');
    }
   res.status(200).json(exercise);
});


// Set exercise
// POST /api/exercises
// Private
const setExercises = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error ('Please Enter the field')
    }

    const exercise = await Exercise.create(req.body)

    res.status(200).json(exercise);
});

// update exercises
// PUT /api/exercises/:id
// Private
const updateExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise)  {
        res.status(400);
        throw new Error ('Exercise not Found');
    }

    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    });

    res.status(200).json(updatedExercise);
});

// delete exercises
// DELETE /api/exercises/:id
// Private
const deleteExercise = asyncHandler(async (req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise)  {
        res.status(400);
        throw new Error ('Exercise not Found');
    }

    await exercise.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getExercises,
    setExercises,
    updateExercise,
    deleteExercise,
    getExercise
};