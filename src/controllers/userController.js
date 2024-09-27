 import UserServices from "../services/userServices";


let handleLogin=async(req,res)=>{
    let email =req.body.email;
    let password=req.body.password;
    //check phoneNumber exist
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message:'Please enter complete information'
        });
    }
    let userData = await  UserServices.handleUserLogin(email,password);
    console.log(userData)
        return res.status(200).json({
            errCode: userData.errCode,
            errMessage:userData.errMessage,
            user: userData.user ? userData.user:{}// check trên api in ra
          
          });
}


 let handleGetAllUsers = async(req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing require parameters',
            allUsers
        })

    }
    let allUsers= await UserServices.getAllUsers(id);
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        allUsers

    })
} 

let handleCreateUser = async(req, res) => {
    let createUsers = await UserServices.createUser(req.body);
    console.log(createUsers);
    return res.status(200).json(createUsers);


}
let handleUpdateUsers = async(req, res) => {
    let data = req.body;
    let UpdateUsers = await UserServices.updateUsers(data);
    console.log(data);

    return res.status(200).json(UpdateUsers)
    
}

let handleDeleteUsers = async(req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters !"

        })
    }
    let DeleteUsers = await UserServices.deleteUsers(req.body.id);
    console.log(DeleteUsers);
    return res.status(200).json(DeleteUsers);
}


module.exports={
    handleCreateUser,
    handleUpdateUsers,
    handleDeleteUsers,
    handleGetAllUsers,
    handleLogin
}