const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// User authentication routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // User login

module.exports = router;
