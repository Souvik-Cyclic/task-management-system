const express = require('express');
const authMiddleware = require("../middleware/authMiddleware")
const taskController = require('../controllers/taskController');
const router = express.Router();

// Create Task
router.post('/tasks', authMiddleware(), taskController.createTask);

// Fetch tasks with filters for status, priority, due_date, and search by title or description.
router.get('/tasks', authMiddleware(), taskController.getTasks);

// Update Task
router.put('/tasks/:id', authMiddleware(), taskController.updateTask);

// Delete Task
router.delete('/tasks/:id', authMiddleware(), taskController.deleteTask);

// Admin Only Routes
// Fetch all tasks (admin only)
router.get('/tasks/all', authMiddleware(true), taskController.getAllTasks);

// Fetch all tasks assigned to a user (admin only)
router.get('/tasks/user/:id', authMiddleware(true), taskController.getTasksByUser);

// Assign a task to a user (admin only)
router.put('/tasks/:id/assign', authMiddleware(true), taskController.assignTask);

module.exports = router;