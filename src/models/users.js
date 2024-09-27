
const mongoose = require('mongoose');
// Tạo schema cho người dùng
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    EmployeesId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employees"

    }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo model dựa trên schema
let Users = mongoose.model('Users', UserSchema);
module.exports = {Users};
