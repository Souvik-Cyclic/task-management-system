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

module.exports = router;