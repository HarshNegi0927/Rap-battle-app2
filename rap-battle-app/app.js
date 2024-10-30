const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Load passport strategies

dotenv.config();

// Log environment variables to ensure they are loaded correctly
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("LinkedIn Client ID:", process.env.LINKEDIN_CLIENT_ID);
console.log("LinkedIn Client Secret:", process.env.LINKEDIN_CLIENT_SECRET);
console.log("GitHub Client ID:", process.env.GITHUB_CLIENT_ID);
console.log("GitHub Client Secret:", process.env.GITHUB_CLIENT_SECRET);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret for session
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to the database
connectDB();

// Authentication routes
app.use("/api/auth", authRoutes);

// Health check route
app.use("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
