const Task = require('../models/taskModel');
const { Op } = require('sequelize');

const validStatuses = ['Todo', 'In Progress', 'Done'];
const validPriorities = ['Low', 'Medium', 'High'];

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;

        // Validate status & priority
        if(status && !validStatuses.includes(status)){
            return res.status(400).json({ message: "Invalid status" });
        }
        if(priority && !validPriorities.includes(priority)){
            return res.status(400).json({ message: "Invalid priority" });
        }

        const task = await Task.create(
            { title, description, status, priority, due_date, userId: req.user.id }
        );
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Fetch tasks with filters for status, priority, due_date, and search by title or description.
exports.getTasks = async (req, res) => {
    try {
        const { status, priority, due_date, search } = req.query;

        // Validate status & priority
        if(status && !validStatuses.includes(status)){
            return res.status(400).json({ message: "Invalid status value" });
        }
        if(priority && !validPriorities.includes(priority)){
            return res.status(400).json({ message: "Invalid priority value" });
        }

        const whereClause = { userId: req.user.id };

        if(status){
            whereClause.status = status;
        }
        if(priority){
            whereClause.priority = priority;
        }
        if(due_date){
            const dateStart = new Date(due_date);
            const dateEnd = new Date(due_date);
            dateEnd.setDate(dateEnd.getDate() + 1);
        
            whereClause.due_date = {
                [Op.between]: [dateStart, dateEnd]
            };
        }
        if(search){
            whereClause[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const tasks = await Task.findAll({ where: whereClause });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;

        // Validate status & priority
        if(status && !validStatuses.includes(status)){
            return res.status(400).json({ message: "Invalid status value" });
        }
        if(priority && !validPriorities.includes(priority)){
            return res.status(400).json({ message: "Invalid priority value" });
        }

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

// Admin Only Routes
// Fetch all tasks (admin only)
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

// Fetch all tasks assigned to a user (admin only)
exports.getTasksByUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const tasks = await Task.findAll({ where: { userId : id } });

        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
};

// Assign a task to a user (admin only)
exports.assignTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        task.userId = userId;
        await task.save();

        res.status(200).json({ message: "Task successfully assigned", task });
    } catch (error) {
        res.status(500).json({ message: "Error assigning task", error });
    }
}