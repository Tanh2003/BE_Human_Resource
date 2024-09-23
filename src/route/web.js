import express from "express";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRouters = (app) => {
    //api cua User
    router.post("/api/controller/user/create-user",userController.handleCreateUser);
    router.get("/api/controller/user/get-all-user",userController.handleGetAllUser)
    router.get('/tanh', (req, res) => {
        return res.send('Hello world with NTanh');
    });
    return app.use("/", router);
}
module.exports = initWebRouters;