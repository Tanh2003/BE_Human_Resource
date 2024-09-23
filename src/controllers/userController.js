 import UserServices from "../services/userServices";

let handleCreateUser = async(req, res) => {
    let message = await UserServices.createUser(req.body);
    console.log(message);
    return res.status(200).json(message);


}

let handleGetAllUser = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            errMessage: 'Missing require parameters',
            products: []
        })

    }
    let allUser = await UserServices.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allUser

    })
}
module.exports={
    handleCreateUser,
    handleGetAllUser
}