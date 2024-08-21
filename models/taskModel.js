const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./User');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
        defaultValue: 'Todo'
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Low'
    },
    due_date: {
        type: DataTypes.DATE
    }
}, {
    timestamps: true,
    underscored: true
});

Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;