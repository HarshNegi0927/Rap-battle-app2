// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    linkedinId: { type: String, unique: true, sparse: true }, // Added LinkedIn ID
    githubId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String }, // Add if you have phone field
    password: { type: String }, // Store password if used for traditional login
});

module.exports = mongoose.model('User', userSchema);
