const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register User
exports.register = async (req, res) => {
    const { username, password, role } = req.body;

    // convert to lowercase
    let convertedRole;
    if(role){
        convertedRole = role.toLowerCase();
    }
    else{
        convertedRole = 'user';
    }
    
    // Check if user already exists
    try {
        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({ username, password: hashedPassword, role: convertedRole });

        res.send({ userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login User
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create and assign token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.header('Authorization', token).send({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Admin Only Routes
// Fetch all users (admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch user by id (admin only)
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Update a user (admin only)
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        if(username){
            user.username = username;
        }
        if(role){
            user.role = role;
        }

        await user.save();
        res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Delete a user (admin only)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted" });
    } catch (error){
        console.error('Error deleting user:', error);
        res.status(500).json({ message: "Server error" });
    }
};