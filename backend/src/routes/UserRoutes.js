const express = require('express');
const User = require('../models/UserModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors');
router.use(cors());
// Sign up
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required." });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save();
        res.status(201).send({ message: "User created successfully.", user_id: newUser._id });
    } catch (err) {
        res.status(500).send({ message: "Error creating user." });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "Invalid credentials." });
        }

        // Compare provided password with the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send({ message: "Invalid credentials." });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(200).send({ message: "Login successful.", token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error logging in." });
    }
});

module.exports = router;
