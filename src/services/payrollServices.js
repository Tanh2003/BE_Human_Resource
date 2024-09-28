const db = require('../models/payroll'); // Sử dụng require cho toàn bộ mã

let getAllPayroll = (PayrollId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Payroll= '';
            if (PayrollId === 'ALL') {
                Payroll = await db.Payroll.find().populate({
       path: 'employee_id',
      select:
        'employeesId',
    });
            }
            else{
                 Payroll = await db.Payroll.findOne({ _id: PayrollId }).populate({
       path: 'employee_id',
      select:
        'employeesId',
    });
            }
            resolve(Payroll);
        } catch (e) {
            reject(e);
        }
    });
};


let createPayroll = async (PayrollData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!PayrollData.salary||!PayrollData.bonus||!PayrollData.deductions||!PayrollData.pay_date) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            }  

            const newPayroll = new db.Payroll({        
                employee_id:PayrollData.employee_id,   
                salary: PayrollData.salary,
                bonus: PayrollData.bonus,
                deductions: PayrollData.deductions,
                pay_date: PayrollData.pay_date,
                

            });

            const savedPayroll = await newPayroll.save();
            resolve({
                errCode: 0,
                message: 'Payroll created successfully', 
                savedPayroll
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updatePayroll = async (PayrollData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
              if (!PayrollData) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            } 

            const updateData = {
                employee_id:PayrollData.employee_id, 
                salary: PayrollData.salary,
                bonus: PayrollData.bonus,
                deductions: PayrollData.deductions,
                pay_date: PayrollData.pay_date,
          
            };

            const result = await db.Payroll.updateOne(
                { _id: PayrollData.PayrollId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No Payroll found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Payroll updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deletePayroll = (PayrollId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Payroll.deleteOne({ _id: PayrollId });

            if (result.deletedCount === 0) {
                return reject(new Error('No Payroll found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Payroll deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createPayroll,
    updatePayroll,
    deletePayroll,
    getAllPayroll
};
