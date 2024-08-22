const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();

// Register User
router.post('/register', userController.register);

// Login User
router.post('/login', userController.login);

// Fetch all users (admin only)
router.get('/users', authMiddleware(true), userController.getAllUsers);

// Delete a user (admin only)
router.delete('/users/:id', authMiddleware(true), userController.deleteUser);

module.exports = router;