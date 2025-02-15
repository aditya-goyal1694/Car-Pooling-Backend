const Carpool = require('../models/Carpool');

// Create a new carpool
const createCarpool = async (req, res) => {
    try {
        const { pickupLocation, destination, time, seatsAvailable } = req.body;

        if (!pickupLocation || !destination || !time || !seatsAvailable) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Assign the logged-in user as the driver
        const carpool = new Carpool({
            driver: req.user._id,
            pickupLocation,
            destination,
            time,
            seatsAvailable
        });

        await carpool.save();
        res.status(201).json(carpool);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all carpools
const getCarpools = async (req, res) => {
    try {
        // Fetch all carpools with driver details (name and email)
        const carpools = await Carpool.find().populate('driver', 'name email');
        res.status(200).json(carpools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createCarpool, getCarpools };
