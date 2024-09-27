 import PayrollServices from "../services/payrollServices";

 let handleGetAllPayroll = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allPayroll
        })

    }
    let allPayroll= await PayrollServices.getAllPayroll(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allPayroll

    })
} 

let handleCreatePayroll = async(req, res) => {
    let createPayroll = await PayrollServices.createPayroll(req.body);
    console.log(createPayroll);
    return res.status(200).json(createPayroll);


}
let handleUpdatePayroll = async(req, res) => {
    let data = req.body;
    let UpdatePayroll = await PayrollServices.updatePayroll(data);
    return res.status(200).json(UpdatePayroll)

}

let handleDeletePayroll = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeletePayroll = await PayrollServices.deletePayroll(req.body.id);
    console.log(DeletePayroll);
    return res.status(200).json(DeletePayroll);
}


module.exports={
    handleCreatePayroll,
    handleUpdatePayroll,
    handleDeletePayroll,
    handleGetAllPayroll,
   
}