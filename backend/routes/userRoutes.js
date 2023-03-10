const express = require('express');
const { getUsers, registerUser, updateUser, deleteUser, loginUser, getMe } = require('../controllers/userController');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.get('/me', protect, getMe);



module.exports = router;