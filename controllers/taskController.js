const Task = require('../models/Task');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;
        const task = await Task.create({ title, description, status, priority, due_date, userId: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Get Task (Read Task)
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;
        const [updated] = await Task.update(
            { title, description, status, priority, due_date }, 
            { where: { id: req.params.id, userId: req.user.id } }
        );

        if (updated) {
            const updatedTask = await Task.findByPk(req.params.id);
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        const deleted = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });

        if (deleted) {
            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};