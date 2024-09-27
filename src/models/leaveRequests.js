const mongoose = require('mongoose');

// Tạo schema cho yêu cầu nghỉ phép
const LeaveRequestSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'denied'],
        default: 'pending'
    },
    reason: {
        type: String,
        trim: true
    }
}, { timestamps: true });

// Tạo model dựa trên schema
const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);
module.exports = { LeaveRequest };
