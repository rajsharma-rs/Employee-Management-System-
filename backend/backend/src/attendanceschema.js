const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  
    date: {
        type: String,
        required: true,
    },
    clockIn: {
        type: Date,
        default: null,
    },
    clockOut: {
        type: Date,
        default: null,
    },
    totalHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['working','completed', 'Absent'],
        default: 'Absent'
    }

});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;