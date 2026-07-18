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

tasksroute.get('/gettasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedby: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

tasksroute.put('/updatetask/:id', auth, async (req, res) => {
    try { console.log(req.body);
        const { id } = req.params;
        const { title, description, priority, status, dueDate } = req.body;
        const checkTask = await Task.findById(id);
        if (!checkTask) {
            return res.status(404).json({ message: 'Task not found' });
        } else if (checkTask.assignedby.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this task' });
        }
        checkTask.title = title || checkTask.title;
        checkTask.description = description || checkTask.description;
        checkTask.priority = priority || checkTask.priority;
        checkTask.status = status || checkTask.status;
        checkTask.dueDate = dueDate || checkTask.dueDate;
        await checkTask.save();
        res.status(200).json({ message: 'Task updated successfully', task: checkTask });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

tasksroute.delete('/deletetask/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const checkTask = await Task.findById(id);
        if (!checkTask) {
            return res.status(404).json({ message: 'Task not found' });
        } else if (checkTask.assignedby.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this task' });
        }
        await checkTask.deleteOne();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = tasksroute;