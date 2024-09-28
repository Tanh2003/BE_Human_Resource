const db = require('../models/position'); // Sử dụng require cho toàn bộ mã





let getAllPosition = (PositionId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let Position= '';
            if (PositionId === 'ALL') {
                Position = await db.Position.find().populate({
      path: 'manager_id',
    });
            }
            else{
                 Position = await db.Position.findOne({ _id: PositionId }).populate({
      path: 'manager_id',
    });
            }
            resolve(Position);
        } catch (e) {
            reject(e);
        }
    });
};


let createPosition = async (PositionData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
            if (!PositionData.name) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
                })     
            }  
            const newPosition = new db.Position({           
                name: PositionData.name,
            });

            const savedPosition = await newPosition.save();
            resolve({
                errCode: 0,
                message: 'Position created successfully', 
                savedPosition
            });
        } catch (e) {
            reject(e);
        }
    });
};


let updatePosition = async (PositionData) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Check for required fields
              if (!PositionData.name ) {
                return resolve({
                        errCode: 1,
                        message: 'Missing required fields', 
     
                })     
            } 

            const updateData = {
                name: PositionData.name,
          
            };

            const result = await db.Position.updateOne(
                { _id: PositionData.PositionId },
                { $set: updateData } // Use $set to update only the fields that have changed
            );

            if (result.nModified === 0) {
                return reject(new Error('No Position found or no changes made'));
            }

            resolve({
                errCode: 0,
                message: 'Position updated successfully', 
                result:updateData
            });
        } catch (e) {
            reject(e);
        }
    });
};


let deletePosition = (PositionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await db.Position.deleteOne({ _id: PositionId });

            if (result.deletedCount === 0) {
                return reject(new Error('No Position found with the given ID'));
            }

            resolve({
                errCode: 0,
                message: 'Position deleted successfully',
                result
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = { 
    createPosition,
    updatePosition,
    deletePosition,
    getAllPosition
};
