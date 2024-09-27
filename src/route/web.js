import express from "express";
import userController from "../controllers/userController";
import employeeController from "../controllers/employeesController";
let router = express.Router();

let initWebRouters = (app) => {
    //api cua User
    router.post("/api/login-user",userController.handleLogin);
    router.get("/api/get-all-user",userController.handleGetAllUsers);
    router.post("/api/create-user",userController.handleCreateUser);
    router.put("/api/update-user",userController.handleUpdateUsers);
    router.delete("/api/delete-user",userController.handleDeleteUsers);
//API cuar employeee
    router.get("/api/get-all-employee",employeeController.handleGetAllEmployees);
    router.post("/api/create-employee",employeeController.handleCreateEmployee);
    router.put("/api/update-employee",employeeController.handleUpdateEmployees);
    router.delete("/api/delete-employee",employeeController.handleDeleteEmployees);

    
    
    router.get('/tanh', (req, res) => {
        return res.send('Hello world with NTanh');
    });
    return app.use("/", router);
}
module.exports = initWebRouters;