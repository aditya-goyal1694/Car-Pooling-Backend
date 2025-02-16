const express = require('express');
const { createCarpool, getCarpools, joinCarpool } = require('../controllers/carpoolController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Carpool routes
router.post('/', authMiddleware, createCarpool); // Create a carpool (requires authentication)
router.get('/', getCarpools); // Get all available carpools
router.post('/:id/join', authMiddleware, joinCarpool); // ✅ Join a specific carpool

module.exports = router;
