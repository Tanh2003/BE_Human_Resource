const mongoose = require('mongoose');

// Tạo schema cho bảng lương
const PayrollSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0
    },
    bonus: {
        type: Number,
        default: 0,
        min: 0
    },
    deductions: {
        type: Number,
        default: 0,
        min: 0
    },
    pay_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

// Tạo model dựa trên schema
const Payroll = mongoose.model('Payroll', PayrollSchema);
module.exports = { Payroll };
