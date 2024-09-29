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
                    userData.errMessage = "Sign In successfully!";
                    // Xóa mật khẩu trước khi trả về user
                    let { password, ...userWithoutPassword } = user.toObject();  // Chuyển đối tượng user sang plain object
                    userData.user = userWithoutPassword;
                    
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
            }
            else{
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
            if (!userData.email || !userData.password || !userData.role) {
                return resolve('Missing required fields: email, password, role, or isActive');
            }
            let check = await checkemail(userData.email);
            if(check) {
                return resolve('Account name already exists');
            }

            let hashPasswordFromBcrypt = await hashUserPassword(userData.password);
            const newUser = new db.Users({
                email: userData.email,
                password: hashPasswordFromBcrypt,
                role: userData.role,
                isActive: true
            });

            const savedUser = await newUser.save();
            resolve({
                errCode: 0,
                errMessage: 'Users created successfully', 
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
            console.log("Updating user data:", userData);

            // Hash the password if it's provided
            if (userData.password) {
                userData.password = await hashUserPassword(userData.password); // Hash new password before updating
            }

            // Create an object to hold the updates
            const updateData = {};

            // Check which fields are being updated
            if (userData.email) {
                updateData.email = userData.email;
            }
            if (userData.password) {
                updateData.password = userData.password;
            }
            if (userData.role) {
                updateData.role = userData.role;
            }
            if (typeof userData.isActive !== 'undefined') { // Check if isActive is provided
                updateData.isActive = userData.isActive;
            }

            // If no updates are provided, handle that case
            if (Object.keys(updateData).length === 0) {
                return reject(new Error('No valid fields to update'));
            }

            // Update the user
            const result = await db.Users.updateOne(
                { _id: userData.UserId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No user found or no changes made'));
            }

            resolve({
                errCode: 0,
               errMessage: 'User updated successfully',
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
                errMessage: 'Users deleted successfully',
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
