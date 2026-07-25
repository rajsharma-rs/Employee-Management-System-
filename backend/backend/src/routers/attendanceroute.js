const express = require('express');
const attendanceroute = express.Router();
const auth = require('../middlewares/auth');
const Attendance = require('../attendanceschema');

attendanceroute.post('/clockin', auth, async (req, res) => {
    try { 
        const empolyeeId = req.user.id;
        const today = new Date();
        const date = new Date().toISOString().split('T')[0];
        const alreadyClockedIn = await Attendance.findOne({ employeeId: empolyeeId, date: date });
        if (alreadyClockedIn) {
            return res.status(400).json({ message: 'You have already clocked in today' });
        }
        const attendance = new Attendance({
            employeeId: empolyeeId,
            date: date, 
            clockIn: today,
            status: 'working',
        });
        await attendance.save();
        res.status(201).json({ message: 'Clock in recorded successfully'  , attendance});
    } catch (error) {
        res.status(500).json({ message: error.message , });
    }
});

attendanceroute.post('/clockout', auth, async (req, res) => {
    try {
        const empolyeeId = req.user.id;
        const today = new Date();
        const date = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.findOne({ employeeId: empolyeeId, date: date });
        if (!attendance) {
            return res.status(400).json({ message: 'You have not clocked in today' });
        }
        attendance.clockOut = today;
        attendance.status = 'completed';
        await attendance.save();
        res.status(200).json({ message: 'Clock out recorded successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

attendanceroute.get('/history', auth, async (req, res) => {
    try {
        const empolyeeId = req.user.id;
        const attendanceHistory = await Attendance.find({ employeeId: empolyeeId })
        .sort({ date: -1 });
        res.status(200).json({ attendanceHistory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = attendanceroute;