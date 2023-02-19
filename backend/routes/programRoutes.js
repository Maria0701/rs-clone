const express = require('express');
const { 
    getPrograms,
    setProgram,
    updateProgram,
    deleteProgram,
    getProgramsSingle
} = require('../controllers/programController');
const router = express.Router();


router.route('/').get(getPrograms).post(setProgram);
router.route('/:id').put(updateProgram).delete(deleteProgram);

module.exports=router;