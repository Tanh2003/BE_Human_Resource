const { User, Information } = require('../models/user');

// Hàm tạo mới người dùng
const createUser = async (userData) => {
    try {
    

        // Tạo mới người dùng trong bảng User
        const newUser = new User({
            username: userData.username,
            password: userData.password,
            // information: savedInformation._id 
        });

        // Lưu người dùng vào database
        const savedUser = await newUser.save();
        

        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
};
let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users= '';
            if (userId == 'ALL') {
                users = await User.find(); 
            }
         
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })

}

// Hàm tạo mới người dùng
const createInformation = async (informationData) => {
    try {
        // Tạo mới thông tin cá nhân trong bảng Information
        const newInformation = new Information({
            Fullname: informationData.Fullname,
            age: informationData.age,
            gender: informationData.gender,
            birthday: informationData.birthday,
            phonenumber: informationData.phonenumber,
            email: informationData.email
        });

        // Lưu thông tin cá nhân vào database
        const savedInformation = await newInformation.save();

      

        return savedInformation;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Could not create user');
    }
};

module.exports = { createUser,createInformation,getAllUsers};
