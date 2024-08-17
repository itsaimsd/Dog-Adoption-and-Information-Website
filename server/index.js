require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const axios = require("axios"); // Add axios import
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities/utilities");

const app = express();
const port = 5000;

// Connect to the database
mongoose.connect(config.connectionstring, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

const User = require("./model/User.model");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ data: "Hello world" });
});

// Create Account Endpoint
app.post("/create_account", async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email: email });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    const user = new User({ fullname, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    return res.json({ error: false, user, accessToken, message: "Registration Successful" });
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    const userInfo = await User.findOne({ email: email });

    if (!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }

    if (userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

        return res.json({ error: false, message: "Login Successfully", email, accessToken });
    } else {
        return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }
});

// Get User Endpoint
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({ user: isUser, message: "" });
});

// Get Dog Images Endpoint
app.get('/api/dog/:code', async (req, res) => {
    const { code } = req.params;
    const url = `https://http.dog/${code}.json`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
