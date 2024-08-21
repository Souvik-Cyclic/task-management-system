const express = require('express');
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

// Create Task
router.post('/tasks', auth, taskController.createTask);

// Fetch tasks with filters for status, priority, due_date, and search by title or description.
router.get('/tasks', auth, taskController.getTasks);

// Update Task
router.put('/tasks/:id', auth, taskController.updateTask);

// Delete Task
router.delete('/tasks/:id', auth, taskController.deleteTask);

module.exports = router;