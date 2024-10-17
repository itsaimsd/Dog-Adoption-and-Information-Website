// server/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { authenticateToken } = require("./utilities/utilities"); // Import your custom middleware
const config = require("./config.json");

// Models
const User = require("./model/user.model"); // Ensure the filename matches exactly

const app = express();
const port = 5000;

// Apply Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose
  .connect(config.connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes

// Test Route
app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

// Create Account Route (Signup)
app.post("/create_account", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: true, message: "User already exists" });
    }

    const newUser = new User({ fullname, email, password });
    await newUser.save();

    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10h",
    });

    return res.status(201).json({
      error: false,
      message: "Registration Successful",
      user: newUser,
      accessToken,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: true, message: "An unexpected error occurred." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: true, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: true, message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10h",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      accessToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: true, message: "An unexpected error occurred." });
  }
});

// Get User Route (Protected)
app.get("/get-user", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: true, message: "An unexpected error occurred." });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;