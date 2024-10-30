// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const passport = require("passport");
const router = express.Router();

// Google Authentication
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google authentication callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
});

// LinkedIn Authentication
router.get('/linkedin', passport.authenticate('linkedin'));

// LinkedIn authentication callback
router.get('/linkedin/callback', passport.authenticate('linkedin', {
    failureRedirect: '/',
}), (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
});

// GitHub Authentication
router.get('/github', passport.authenticate('github'));

// GitHub authentication callback
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
}), (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
});

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

module.exports = router;
