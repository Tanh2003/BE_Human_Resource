const db = require('../models/leaveRequests'); // Sử dụng require cho toàn bộ mã

let getAllLeaveRequest = (LeaveRequestId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let LeaveRequest= '';
            if (LeaveRequestId === 'ALL') {
                LeaveRequest = await db.LeaveRequest.find().populate({
      path: 'Employees',
    });
            }
            else{
                 LeaveRequest = await db.LeaveRequest.findOne({ _id: LeaveRequestId }).populate({
      path: 'Employees',
    });
            }
            resolve(LeaveRequest);
        } catch (e) {
            reject(e);
        }
    });
};


let createLeaveRequest = async (LeaveRequestData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!LeaveRequestData.name) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            }  

            const newLeaveRequest = new db.LeaveRequest({           
                start_date: LeaveRequestData.start_date,
                end_date: LeaveRequestData.end_date,
                status: LeaveRequestData. status,
                reason: LeaveRequestData.reason,
                

            });

            const savedLeaveRequest = await newLeaveRequest.save();
            resolve({
                errCode: 0,
                message: 'LeaveRequest created successfully', 
                savedLeaveRequest
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updateLeaveRequest = async (LeaveRequestData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
              if (!LeaveRequestData.name ) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            } 

            const updateData = {
                start_date: LeaveRequestData.start_date,
                end_date: LeaveRequestData.end_date,
                status: LeaveRequestData. status,
                reason: LeaveRequestData.reason,
          
            };

            const result = await db.LeaveRequest.updateOne(
                { _id: LeaveRequestData.LeaveRequestId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No LeaveRequest found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'LeaveRequest updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deleteLeaveRequest = (LeaveRequestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.LeaveRequest.deleteOne({ _id: LeaveRequestId });

            if (result.deletedCount === 0) {
                return reject(new Error('No LeaveRequest found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'LeaveRequest deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createLeaveRequest,
    updateLeaveRequest,
    deleteLeaveRequest,
    getAllLeaveRequest
};
