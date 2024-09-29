 import EmployeeServices from "../services/employeesServices";

 let handleGetAllEmployees = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allEmployees
        })

    }
    let allEmployees= await EmployeeServices.getAllEmployees(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allEmployees

    })
} 

 let handleGetUserEmployees = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allEmployees
        })

    }
    let allEmployees= await EmployeeServices.getUserEmployees(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allEmployees

    })
} 


let handleCreateEmployee = async(req, res) => {
    let createEmployees = await EmployeeServices.createEmployees(req.body);
    console.log(createEmployees);
    return res.status(200).json(createEmployees);


}
let handleUpdateEmployees = async(req, res) => {
    let data = req.body;
    let UpdateEmployees = await EmployeeServices.updateEmployees(data);
    return res.status(200).json(UpdateEmployees)

}

let handleDeleteEmployees = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeleteEmployees = await EmployeeServices.deleteEmployees(req.body.id);
    console.log(DeleteEmployees);
    return res.status(200).json(DeleteEmployees);
}


module.exports={
    handleCreateEmployee,
    handleUpdateEmployees,
    handleDeleteEmployees,
    handleGetAllEmployees,
    handleGetUserEmployees
   
}