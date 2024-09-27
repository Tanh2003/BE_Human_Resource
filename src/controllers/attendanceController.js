 import AttendanceServices from "../services/attendanceServices";

 let handleGetAllAttendance = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allAttendance
        })

    }
    let allAttendance= await AttendanceServices.getAllAttendance(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allAttendance

    })
} 

let handleCreateAttendance = async(req, res) => {
    let createAttendance = await AttendanceServices.createAttendance(req.body);
    console.log(createAttendance);
    return res.status(200).json(createAttendance);


}
let handleUpdateAttendance = async(req, res) => {
    let data = req.body;
    let UpdateAttendance = await AttendanceServices.updateAttendance(data);
    return res.status(200).json(UpdateAttendance)

}

let handleDeleteAttendance = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeleteAttendance = await AttendanceServices.deleteAttendance(req.body.id);
    console.log(DeleteAttendance);
    return res.status(200).json(DeleteAttendance);
}


module.exports={
    handleCreateAttendance,
    handleUpdateAttendance,
    handleDeleteAttendance,
    handleGetAllAttendance,
   
}