const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

dotenv.config();

// Initialize the app
const app = express();

// MongoDB connection
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(expressSession({
  secret: process.env.SESSION_SECRET, // Secret key for sessions
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Google OAuth app');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
