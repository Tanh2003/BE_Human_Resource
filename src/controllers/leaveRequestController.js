 import LeaveRequestServices from "../services/leaveRequestServices";

 let handleGetAllLeaveRequest = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allLeaveRequest
        })

    }
    let allLeaveRequest= await LeaveRequestServices.getAllLeaveRequest(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allLeaveRequest

    })
} 
 let handleIDAllLeaveRequest = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allLeaveRequest
        })

    }
    let allLeaveRequest= await LeaveRequestServices.getIDLeaveRequest(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allLeaveRequest

    })
} 

let handleCreateLeaveRequest = async(req, res) => {
    let createLeaveRequest = await LeaveRequestServices.createLeaveRequest(req.body);
    console.log(createLeaveRequest);
    return res.status(200).json(createLeaveRequest);


}
let handleUpdateLeaveRequest = async(req, res) => {
    let data = req.body;
    let UpdateLeaveRequest = await LeaveRequestServices.updateLeaveRequest(data);
    return res.status(200).json(UpdateLeaveRequest)

}

let handleDeleteLeaveRequest = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeleteLeaveRequest = await LeaveRequestServices.deleteLeaveRequest(req.body.id);
    console.log(DeleteLeaveRequest);
    return res.status(200).json(DeleteLeaveRequest);
}


module.exports={
    handleCreateLeaveRequest,
    handleUpdateLeaveRequest,
    handleDeleteLeaveRequest,
    handleGetAllLeaveRequest,
    handleIDAllLeaveRequest
   
}