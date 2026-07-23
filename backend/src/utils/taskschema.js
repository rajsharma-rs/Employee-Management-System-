const mongosse = require('mongoose');

const taskSchema = new mongosse.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },  
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'medium',
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
        required: true, 
    },
    category:{
        type: String,
        default: "",
        required:true 
    },
    assignedby: {
        type: mongosse.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Task = mongosse.model('Task', taskSchema);
module.exports = Task;