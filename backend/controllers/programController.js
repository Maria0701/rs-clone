const asyncHandler = require('express-async-handler');

const Program = require('../models/programsModel')
// Get program
// GET /api/program
// Private
const getPrograms = asyncHandler(async (req, res) => {
    const programs  = await Program.find()
    res.status(200).json(programs);
});

// Set exercise
// POST /api/program
// Private
const setProgram = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error ('Please Enter the field');
    }

    const program = await Program.create(req.body);

    res.status(200).json(program);
});

// update program
// PUT /api/program/:id
// Private
const updateProgram = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);

    if (!program)  {
        res.status(400);
        throw new Error ('Program not Found');
    }

    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    });

    res.status(200).json(updatedProgram);
});

// delete program
// DELETE /api/program/:id
// Private
const deleteProgram = asyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);

    if (!program)  {
        res.status(400);
        throw new Error ('Program not Found');
    }

    await exercise.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getPrograms,
    setProgram,
    updateProgram,
    deleteProgram
};