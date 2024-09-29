import express from "express";
import userController from "../controllers/userController";
import employeeController from "../controllers/employeesController";
import PositionController from "../controllers/positionController";
import PayrollController from "../controllers/payrollController";
import LeaveRequestController from "../controllers/leaveRequestController";
import DepartmentController from "../controllers/departmentController";
import AttendanceController from "../controllers/attendanceController";


let router = express.Router();

let initWebRouters = (app) => {
//API của user
    router.post("/api/login-user",userController.handleLogin);
    router.get("/api/get-all-user",userController.handleGetAllUsers);
    router.post("/api/create-user",userController.handleCreateUser);
    router.put("/api/update-user",userController.handleUpdateUsers);
    router.delete("/api/delete-user",userController.handleDeleteUsers);
//API của employee
    router.get("/api/get-all-employee",employeeController.handleGetAllEmployees);
    router.get("/api/get-user-employee",employeeController.handleGetUserEmployees);
    router.post("/api/create-employee",employeeController.handleCreateEmployee);
    router.put("/api/update-employee",employeeController.handleUpdateEmployees);
    router.delete("/api/delete-employee",employeeController.handleDeleteEmployees);
//API của positon
    router.get("/api/get-all-Position",PositionController.handleGetAllPosition);
    router.get("/api/get-Department-Of-Position",PositionController.handleDepartmentOfPosition);
    router.post("/api/create-Position",PositionController.handleCreatePosition);
    router.put("/api/update-Position",PositionController.handleUpdatePosition);
    router.delete("/api/delete-Position",PositionController.handleDeletePosition);
//API của payroll
    router.get("/api/get-all-Payroll",PayrollController.handleGetAllPayroll);
    router.post("/api/create-Payroll",PayrollController.handleCreatePayroll);
    router.put("/api/update-Payroll",PayrollController.handleUpdatePayroll);
    router.delete("/api/delete-Payroll",PayrollController.handleDeletePayroll);
//API của leaveRequest
    router.get("/api/get-all-LeaveRequest",LeaveRequestController.handleGetAllLeaveRequest);
    router.get("/api/get-id-LeaveRequest",LeaveRequestController.handleIDAllLeaveRequest);
    
    router.post("/api/create-LeaveRequest",LeaveRequestController.handleCreateLeaveRequest);
    router.put("/api/update-LeaveRequest",LeaveRequestController.handleUpdateLeaveRequest);
    router.delete("/api/delete-LeaveRequest",LeaveRequestController.handleDeleteLeaveRequest);

//API của Department
    router.get("/api/get-all-Department",DepartmentController.handleGetAllDepartment);
    router.post("/api/create-Department",DepartmentController.handleCreateDepartment);
    router.put("/api/update-Department",DepartmentController.handleUpdateDepartment);
    router.delete("/api/delete-Department",DepartmentController.handleDeleteDepartment);
   

//API của Attendance
    router.get("/api/get-all-Attendance",AttendanceController.handleGetAllAttendance);
    router.post("/api/create-Attendance",AttendanceController.handleCreateAttendance);
    router.put("/api/update-Attendance",AttendanceController.handleUpdateAttendance);
    router.delete("/api/delete-Attendance",AttendanceController.handleDeleteAttendance);



    
    
    router.get('/tanh', (req, res) => {
        return res.send('Hello world with NTanh');
    });
    return app.use("/", router);
}
module.exports = initWebRouters;