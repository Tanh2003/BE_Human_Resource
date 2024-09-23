
const mongoose = require('mongoose');


const InfomationShema= new mongoose.Schema({
     Fullname: {
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
    phonenumber: [{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }],
    email: {
        type:String,
        required: true
    },

})

// Tạo schema cho người dùng
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
   
    password: {
        type: String,
        required: true
    },
    information:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Information"

    }
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

// Tạo model dựa trên schema
let User = mongoose.model('User', userSchema);
let Information = mongoose.model('Information',InfomationShema)


module.exports = {User,Information};
