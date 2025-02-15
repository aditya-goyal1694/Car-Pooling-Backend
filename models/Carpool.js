const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatsAvailable: { type: Number, required: true },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    time: { type: Date, required: true },
});

module.exports = mongoose.model('Carpool', carpoolSchema);
