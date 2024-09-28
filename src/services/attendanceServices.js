const db = require('../models/attendance'); // Sử dụng require cho toàn bộ mã



// Lấy ngày hiện tại
const currentDate = new Date();

// Hàm chuyển chuỗi thời gian thành đối tượng Date
function convertTimeToDate(time) {
    const [hours, minutes] = time.split(':');
    const date = new Date(currentDate);
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    return date;
}







let getAllAttendance = (AttendanceId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Attendance= '';
            if (AttendanceId === 'ALL') {
                Attendance = await db.Attendance.find().populate({
      path: 'employee_id',
      select:
      'employeesId',
    });
            }
            else{
                 Attendance = await db.Attendance.findOne({ _id: AttendanceId }).populate({
       path: 'employee_id',
      select:
        'employeesId',
    });
            }
            resolve(Attendance);
        } catch (e) {
            reject(e);
        }
    });
};


let createAttendance = async (AttendanceData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!AttendanceData) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            }  

            const newAttendance = new db.Attendance({    
                employee_id:AttendanceData.employee_id,        
                date: AttendanceData.date,
                check_in: convertTimeToDate(AttendanceData.check_in),
                check_out: convertTimeToDate(AttendanceData.check_out),
             
                

            });

            const savedAttendance = await newAttendance.save();
            resolve({
                errCode: 0,
                message: 'Attendance created successfully', 
                savedAttendance
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updateAttendance = async (AttendanceData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            //   if (!AttendanceData.name ) {
            //     return resolve({
            //             errCode: 1,
            //             message: 'Missing required fields', 
     
            //     })     
            // } 

            const updateData = {
                employee_id:AttendanceData.employee_id,  
                date: AttendanceData.date,
                check_in: convertTimeToDate(AttendanceData.check_in),
                check_out: convertTimeToDate(AttendanceData.check_out),
            };

            const result = await db.Attendance.updateOne(
                { _id: AttendanceData.AttendanceId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No Attendance found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Attendance updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deleteAttendance = (AttendanceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Attendance.deleteOne({ _id: AttendanceId });

            if (result.deletedCount === 0) {
                return reject(new Error('No Attendance found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Attendance deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createAttendance,
    updateAttendance,
    deleteAttendance,
    getAllAttendance
};
