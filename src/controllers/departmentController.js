 import DepartmentServices from "../services/departmentServices";

 let handleGetAllDepartment = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allDepartment
        })

    }
    let allDepartment= await DepartmentServices.getAllDepartment(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allDepartment

    })
} 

let handleCreateDepartment = async(req, res) => {
    let createDepartment = await DepartmentServices.createDepartment(req.body);
    console.log(createDepartment);
    return res.status(200).json(createDepartment);


}
let handleUpdateDepartment = async(req, res) => {
    let data = req.body;
    let UpdateDepartment = await DepartmentServices.updateDepartment(data);
    return res.status(200).json(UpdateDepartment)

}

let handleDeleteDepartment = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeleteDepartment = await DepartmentServices.deleteDepartment(req.body.id);
    console.log(DeleteDepartment);
    return res.status(200).json(DeleteDepartment);
}


module.exports={
    handleCreateDepartment,
    handleUpdateDepartment,
    handleDeleteDepartment,
    handleGetAllDepartment,
   
}