
const mongoose = require('mongoose');


const EmployeesShema= new mongoose.Schema({
     fullName: {
        type: String,
        required: true
    },
    age: {
        type:Number,
        required: true
    },
    gender: {
        type:String,
        required: true
    },
    birthday: {
        type:Date,
        required: true
    },
    phonenumber: {
         type:String,
         require:true
      

    },
    department: {
        type:String,
        required: true
    },
     position: {
        type:String,
        required: true
    },
     salary: {
        type:Number,
        required: true
    },
    hireDate: {
        type:Date,
        required: true
    },
     leaveBalance: {
        type:Number,
        required: true
    },
    userId: {  // Tham chiếu ngược tới User để đảm bảo mối quan hệ 1-1
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }


}, { timestamps: true })

let Employees = mongoose.model('Employees',EmployeesShema)


module.exports = {Employees};
