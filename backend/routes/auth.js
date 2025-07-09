const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { fullName, phone, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [ { email }, { username } ] });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      phone,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({ 
      $or: [
        { username: usernameOrEmail }, 
        { email: usernameOrEmail }
      ]
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

module.exports = router;
