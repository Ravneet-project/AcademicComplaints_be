const multer = require("multer");

const ComplaintController = require("../server/Complaint/ComplaintController");
const UserController = require("../server/User/UserController")
const DashboardController= require("../server/Dashboard/DashboardController");

const HodController=require("../server/Hod/HodController");

//routes without token
const routes=require("express").Router()
routes.post("/login", UserController.login)
routes.post("/allComplaint",ComplaintController.allComplaint);
routes.post("/changeStatusComplaint",ComplaintController.changeStatusComplaint);

routes.use(require("../config/hodTokenChecker"))

routes.post("/dashboard", DashboardController.dashboard);




//api with token
routes.post("/changePassword", UserController.changePassword)

module.exports=routes
