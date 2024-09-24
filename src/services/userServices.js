const db = require('../models/users'); // Sử dụng require cho toàn bộ mã
const bcryptjs = require('bcryptjs');

const salt = bcryptjs.genSaltSync(10);

let hashUserPassword = (password) => {
    return bcryptjs.hashSync(password, salt); // Sử dụng hashSync trực tiếp
};

let checkemail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.Users.findOne({ email: email });
            resolve(!!user); 
        } catch (e) {
            reject(e); 
        }
    });
};

let handleUserLogin = async (email, password) => {
    let userData = {};
    try {
        let isExist = await checkemail(email);
        if (isExist) {
            const user = await db.Users.findOne({ email: email })

            if (user) {
                let check = await bcryptjs.compare(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = "Login successfully";
                    // userData.user = user; // Password has been removed
                } else {
                    userData.errCode = 3;
                    userData.errMessage = "Incorrect password";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "User does not exist";
            }
        } else {
            userData.errCode = 1;
            userData.errMessage = "Account does not exist. Please register or check again.";
        }
    } catch (e) {
        userData.errCode = 500;
        userData.errMessage = "An error occurred";
        console.error(e); // Log lỗi ra console
    }
    return userData; // Trả về userData
};

let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users= '';
            if (userId === 'ALL') {
                users = await db.Users.find(); 
            }else{
                 users = await db.Users.findOne({ _id: userId });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

let createUser = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userData.email || !userData.password || !userData.role || !userData.isActive) {
                return reject(new Error('Missing required fields: email, password, role, or isActive'));
            }
            let check = await checkemail(userData.email);
            if(check) {
                return reject(new Error('Account name already exists'));
            }

            let hashPasswordFromBcrypt = await hashUserPassword(userData.password);
            const newUser = new db.Users({
                email: userData.email,
                password: hashPasswordFromBcrypt,
                role: userData.role,
                isActive: userData.isActive
            });

            const savedUser = await newUser.save();
            resolve({
                errCode: 0,
                message: 'Users created successfully', 
                savedUser
            });
        } catch (e) {
            reject(e);
        }
    });
};

let updateUsers = async (userData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userData.email || !userData.role || userData.isActive === undefined) {
                return reject(new Error('Missing required fields: email, role, or isActive'));
            }

            if (userData.password) {
                userData.password = await hashUserPassword(userData.password); // Hash mật khẩu mới trước khi cập nhật
            }

            const result = await db.Users.updateOne(
                { _id: userData.userId },
                {
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                    isActive: userData.isActive
                }
            );

            if (result.nModified === 0) {
                return reject(new Error('No user found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Users updated successfully', 
                result 
            });
        } catch (e) {
            reject(e);
        }
    });
};

let deleteUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Users.deleteOne({ _id: userId });

            if (result.deletedCount === 0) {
                return reject(new Error('No user found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Users deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    handleUserLogin,
    createUser,
    updateUsers,
    deleteUsers,
    getAllUsers
};
