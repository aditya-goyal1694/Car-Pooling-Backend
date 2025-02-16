const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to authenticate users using JWT
const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ? req.headers.authorization.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify token and extract user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password field

        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ message: "Not authorized, invalid or expired token" });
    }
};

module.exports = authMiddleware;
