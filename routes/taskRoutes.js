const express = require('express');
const auth = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');
const router = express.Router();

// Create Task
router.post('/create', auth, taskController.createTask);

// Get Task (Read Task)
router.get('/read', auth, taskController.getTasks);

// Update Task
router.put('/update/:id', auth, taskController.updateTask);

// Delete Task
router.delete('/delete/:id', auth, taskController.deleteTask);

module.exports = router;