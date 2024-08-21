const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ where: { username } });
    if(userExists){
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ username, password: hashedPassword });

    res.send({ userId: user.id });
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { username } });
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({ message: "Invalid password" });
    }

    // Create and assign token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.header('Authorization', token).send({ token });
});

module.exports = router;