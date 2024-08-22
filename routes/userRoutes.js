const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();

// Register User
router.post('/register', userController.register);

// Login User
router.post('/login', userController.login);

// Admin Only Routes
// Fetch all users (admin only)
router.get('/users', authMiddleware(true), userController.getAllUsers);

// Fetch user by id (admin only)
router.get('/users/:id', authMiddleware(true), userController.getUserById);

// Update a user (admin only)
router.put('/users/:id', authMiddleware(true), userController.updateUser);

// Delete a user (admin only)
router.delete('/users/:id', authMiddleware(true), userController.deleteUser);

// Change user password (admin & user themselves only)
router.put('/users/:id/password', authMiddleware(), userController.changeUserPassword);

module.exports = router;