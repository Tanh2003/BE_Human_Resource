const mongoose = require('mongoose');

// Tạo schema cho phòng ban
const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
}, { timestamps: true });

// Tạo model dựa trên schema
const Position = mongoose.model('Position', PositionSchema);
module.exports = { Position };
