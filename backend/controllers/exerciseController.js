const asyncHandler = require('express-async-handler');

// Get exercises
// GET /api/exercises
// Private
const getExercises = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get Exercises'});
});

// Set exercise
// POST /api/exercises
// Private
const setExercises = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        
    }
    res.status(200).json({message: 'Set Exercises'});
});

// update exercises
// PUT /api/exercises/:id
// Private
const updateExercise = asyncHandler(async (req, res) => {
    res.status(200).json({message:  `update Exercises ${req.params.id}`});
});

// delete exercises
// DELETE /api/exercises/:id
// Private
const deleteExercise = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'delete Exercises'});
});



module.exports = {
    getExercises,
    setExercises,
    updateExercise,
    deleteExercise
};