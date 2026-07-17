const express = require('express');
const tasksroute = express.Router();
const auth = require('../middlewares/auth');
const Task = require('../utils/taskschema');

tasksroute.post('/addtask', auth, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const assignedby = req.user.id;
        const newTask = new Task({
            title,  
            description,
            priority,
            dueDate,
            assignedby
        });
        await newTask.save();
        res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = tasksroute;