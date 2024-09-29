const db = require('../models/employees'); // Sử dụng require cho toàn bộ mã





let getAllEmployees = (EmployeeId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Employees= '';
            if (EmployeeId === 'ALL') {
                Employees = await db.Employees.find(); 
            }
            else{
                 Employees = await db.Employees.findOne({ _id: EmployeeId }).populate({
      path: 'userId',
      select:
        'email',
    });
            }
            resolve(Employees);
        } catch (e) {
            reject(e);
        }
    });
};


let getUserEmployees = (EmployeeId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Employees= '';
           if(EmployeeId){
                 Employees = await db.Employees.findOne({ userId: EmployeeId }).populate({
      path: 'userId',
      select:
        'email',
    });
            }
            resolve(Employees);
        } catch (e) {
            reject(e);
        }
    });
};


let createEmployees = async (EmployeeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!EmployeeData.fullName || !EmployeeData.age || !EmployeeData.gender || 
                !EmployeeData.birthday || !EmployeeData.phonenumber || !EmployeeData.department ||
                !EmployeeData.position || !EmployeeData.salary || !EmployeeData.hireDate || 
                EmployeeData.leaveBalance === undefined || !EmployeeData.userId === undefined) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            }  
             const employeeCount = await db.Employees.countDocuments({});
            const newEmployeeId = `24HR${(employeeCount + 1).toString().padStart(3, '0')}`;
            const newEmployee = new db.Employees({
                employeesId:newEmployeeId,
                fullName: EmployeeData.fullName,
                age: EmployeeData.age,
                gender: EmployeeData.gender,
                birthday: EmployeeData.birthday,
                phonenumber: EmployeeData.phonenumber,
                department: EmployeeData.department,
                position: EmployeeData.position,
                salary: EmployeeData.salary,
                hireDate: EmployeeData.hireDate,
                leaveBalance: EmployeeData.leaveBalance,
                userId:EmployeeData.userId
          
            });

            const savedEmployee = await newEmployee.save();
            resolve({
                errCode: 0,
                message: 'Employee created successfully', 
                savedEmployee
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updateEmployees = async (EmployeeData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
              if (!EmployeeData.fullName || !EmployeeData.age || !EmployeeData.gender || 
                !EmployeeData.birthday || !EmployeeData.phonenumber || !EmployeeData.department ||
                !EmployeeData.position || !EmployeeData.salary || !EmployeeData.hireDate || 
                !EmployeeData.leaveBalance|| !EmployeeData.EmployeeId) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            } 

            const updateData = {
                fullName: EmployeeData.fullName,
                age: EmployeeData.age,
                gender: EmployeeData.gender,
                birthday: EmployeeData.birthday,
                phonenumber: EmployeeData.phonenumber,
                department: EmployeeData.department,
                position: EmployeeData.position,
                salary: EmployeeData.salary,
                hireDate: EmployeeData.hireDate,
                leaveBalance: EmployeeData.leaveBalance,
            };

            const result = await db.Employees.updateOne(
                { _id: EmployeeData.EmployeeId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No Employee found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Employee updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deleteEmployees = (EmployeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Employees.deleteOne({ _id: EmployeeId });

            if (result.deletedCount === 0) {
                return reject(new Error('No Employee found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Employees deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createEmployees,
    updateEmployees,
    deleteEmployees,
    getAllEmployees,
    getUserEmployees
};
