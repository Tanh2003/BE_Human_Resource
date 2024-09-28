 import PositionServices from "../services/positionServices";

 let handleGetAllPosition = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allPosition
        })

    }
    let allPosition= await PositionServices.getAllPosition(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allPosition

    })
} 


 let handleDepartmentOfPosition = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allPosition
        })

    }
    let allPosition= await PositionServices.getDepartmentOfPosition(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allPosition

    })
} 

let handleCreatePosition = async(req, res) => {
    let createPosition = await PositionServices.createPosition(req.body);
    console.log(createPosition);
    return res.status(200).json(createPosition);


}
let handleUpdatePosition = async(req, res) => {
    let data = req.body;
    let UpdatePosition = await PositionServices.updatePosition(data);
    return res.status(200).json(UpdatePosition)

}

let handleDeletePosition = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeletePosition = await PositionServices.deletePosition(req.body.id);
    console.log(DeletePosition);
    return res.status(200).json(DeletePosition);
}


module.exports={
    handleCreatePosition,
    handleUpdatePosition,
    handleDeletePosition,
    handleGetAllPosition,
    handleDepartmentOfPosition
   
}