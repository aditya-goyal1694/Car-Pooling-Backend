const express = require('express');
const { createCarpool, getCarpools, joinCarpool } = require('../controllers/carpoolController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createCarpool);   // Create a carpool
router.get('/', getCarpools);                      // Get all carpools
router.post('/:id/join', authMiddleware, joinCarpool);  // Join a carpool

module.exports = router;
