const mongoose = require('mongoose');

// Schema for carpool details
const carpoolSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    seatsAvailable: { type: Number, required: true }, // Number of available seats
    pickupLocation: { type: String, required: true }, // Starting point
    destination: { type: String, required: true }, // Destination
    time: { type: Date, required: true }, // Scheduled time
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Users who joined the carpool
});

module.exports = mongoose.model('Carpool', carpoolSchema);
