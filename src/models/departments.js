const mongoose = require('mongoose');

// Tạo schema cho phòng ban
const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees'
    }
}, { timestamps: true });

// Tạo model dựa trên schema
const Department = mongoose.model('Department', DepartmentSchema);
module.exports = { Department };
