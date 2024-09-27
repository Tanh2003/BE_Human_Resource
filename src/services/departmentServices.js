const db = require('../models/departments'); // Sử dụng require cho toàn bộ mã





let getAllDepartment = (DepartmentId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Department= '';
            if (DepartmentId === 'ALL') {
                Department = await db.Department.find().populate({
      path: 'manager_id',
    });
            }
            else{
                 Department = await db.Department.findOne({ _id: DepartmentId }).populate({
      path: 'manager_id',
    });
            }
            resolve(Department);
        } catch (e) {
            reject(e);
        }
    });
};


let createDepartment = async (DepartmentData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!DepartmentData.name) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            }  

            const newDepartment = new db.Department({           
                name: DepartmentData.name,
            });

            const savedDepartment = await newDepartment.save();
            resolve({
                errCode: 0,
                message: 'Department created successfully', 
                savedDepartment
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updateDepartment = async (DepartmentData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
              if (!DepartmentData.name ) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            } 

            const updateData = {
                name: DepartmentData.name,
          
            };

            const result = await db.Department.updateOne(
                { _id: DepartmentData.DepartmentId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No Department found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Department updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deleteDepartment = (DepartmentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Department.deleteOne({ _id: DepartmentId });

            if (result.deletedCount === 0) {
                return reject(new Error('No Department found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Department deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getAllDepartment
};
