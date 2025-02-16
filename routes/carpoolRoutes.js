const express = require('express');
const { createCarpool, getCarpools, joinCarpool } = require('../controllers/carpoolController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Carpool routes
router.post('/', authMiddleware, createCarpool);
router.get('/', getCarpools);
router.post('/:id/join', authMiddleware, joinCarpool);

module.exports = router;
