const mongoose = require('mongoose');

// Tạo schema cho điểm danh
const AttendanceSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    check_in: {
        type: Date,
        required: true
    },
    check_out: {
        type: Date
    }
}, { timestamps: true });

// Tạo model dựa trên schema
const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = { Attendance };
