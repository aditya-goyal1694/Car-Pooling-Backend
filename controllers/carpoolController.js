const Carpool = require('../models/Carpool');

// Create a new carpool
const createCarpool = async (req, res) => {
    try {
        const { title, destination, seatsAvailable } = req.body;
        const carpool = new Carpool({
            title,
            destination,
            seatsAvailable,
            owner: req.user._id,
        });
        await carpool.save();
        res.status(201).json(carpool);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all carpools
const getCarpools = async (req, res) => {
    try {
        const carpools = await Carpool.find();
        res.json(carpools);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
