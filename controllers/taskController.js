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
            whereClause.due_date = due_date;
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