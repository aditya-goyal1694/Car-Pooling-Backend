const mongoose = require('mongoose');

// Schema for user details
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // Unique email for authentication
    password: { type: String, required: true }, // Hashed password
});

module.exports = mongoose.model('User', userSchema);
