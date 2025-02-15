const express = require('express');
const { createCarpool, getCarpools } = require('../controllers/carpoolController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Carpool routes
router.post('/', authMiddleware, createCarpool); // Create a carpool (requires authentication)
router.get('/', getCarpools); // Get all available carpools

module.exports = router;
