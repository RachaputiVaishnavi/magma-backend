const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config(); // ✅ Must be before passport config

require('../config/passport'); // Ensure this line imports your passport configuration

const router = express.Router();

// Route to start Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

// Profile route (show user details)
router.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.displayName}`);
  } else {
    res.redirect('/');
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    res.redirect('/');
  });
});

module.exports = router;
