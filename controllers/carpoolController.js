const Carpool = require('../models/Carpool');

// Create a new carpool
const createCarpool = async (req, res) => {
    try {
        const { pickupLocation, destination, time, seatsAvailable } = req.body;
        if (!pickupLocation || !destination || !time || !seatsAvailable) {
            return res.status(400).json({ message: "All fields are required" });
        }

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
        const carpools = await Carpool.find().populate('driver', 'name email');
        res.status(200).json(carpools);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Join a carpool
const joinCarpool = async (req, res) => {
    try {
        const carpool = await Carpool.findById(req.params.id);
        if (!carpool) return res.status(404).json({ message: "Carpool not found" });

        if (carpool.seatsAvailable > 0) {
            carpool.participants.push(req.user._id);
            carpool.seatsAvailable -= 1;
            await carpool.save();
            res.json(carpool);
        } else {
            res.status(400).json({ message: "No seats available" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCarpool, getCarpools, joinCarpool };
