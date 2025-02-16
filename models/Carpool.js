const mongoose = require('mongoose');

// Schema for carpool details
const carpoolSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    seatsAvailable: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    time: { type: Date, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Carpool', carpoolSchema);
