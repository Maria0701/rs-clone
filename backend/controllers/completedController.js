const asyncHandler = require('express-async-handler');

const Completed = require('../models/completedModel')
// Get completed
// GET /api/completed
// Private
const getCompleted = asyncHandler(async (req, res) => {
    //const completed  = await Completed.find()
    const userId = req.query.user_id;

    if(!userId) {
        return res.status(404).json({
         status:'failure',
         message:'Login? please'
        })
    }
    const startDate = req.query.startDate || new Date("2000-01-01T00:00:00Z");
    const endDate = req.query.endDate || new Date();
    const completed = await Completed.find({ 
        date: {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lt: new Date(new Date(endDate).setHours(23, 59, 59)) 
        },
        user_id: userId
    });
    res.status(200).json(completed);

});

// Set completed
// POST /api/completed
// Private
const setCompleted = asyncHandler(async (req, res) => {
    // if (!req.body.name) {
    //     res.status(400);
    //     throw new Error ('Please Enter the field')
    // }

    const completed = await Completed.create(req.body)

    res.status(200).json(completed);
});

// update completed
// PUT /api/completed/:id
// Private
const updateCompleted = asyncHandler(async (req, res) => {
    const completed = await Completed.findById(req.params.id);

    if (!completed)  {
        res.status(400);
        throw new Error ('completed not Found');
    }

    const updatedcompleted = await Completed.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    });

    res.status(200).json(updatedcompleted);
});

// delete completed
// DELETE /api/completed/:id
// Private
const deleteCompleted = asyncHandler(async (req, res) => {
    const completed = await Completed.findById(req.params.id);

    if (!completed)  {
        res.status(400);
        throw new Error ('completed not Found');
    }

    await completed.remove();

    res.status(200).json({id: req.params.id});
});

module.exports = {
    getCompleted,
    setCompleted,
    updateCompleted,
    deleteCompleted
};