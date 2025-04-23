const multer=require("multer")
const EnquiryController = require("../server/Enquiry/EnquiryController");
const ComplaintController = require("../server/Complaint/ComplaintController");
const UserController = require("../server/User/UserController")
 const DashboardController= require("../server/Dashboard/DashboardController");
 const StudentController=require("../server/Student/StudentController")
 const DepartmentController=require("../server/Department/DepartmentController")
const HodController=require("../server/Hod/HodController")
 //complaints
//  const complaintStorage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, "./public/complaintImage/");
//    },
//    filename: function (req, file, cb) {
//      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//    },
//  });
 
//  const complaintUpload = multer({ storage: complaintStorage });
 // Student file upload configuration
// const studentStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/studentProfile/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const studentUpload = multer({ storage: studentStorage });

 const routes=require("express").Router()
 
 //routes without token
 routes.post("/registerStudent",StudentController.registerStudent);
 routes.post("/login", UserController.login)
 routes.post("/allDepartment", DepartmentController.allDepartment);
 routes.post("/getSingleStudent", StudentController.getSingleStudent);
 
 
 routes.use(require("../config/studentTokenChecker"))
 routes.post("/dashboard", DashboardController.dashboard);

 
 routes.post("/addEnquiry", EnquiryController.addEnquiry);
 routes.post("/allHod", HodController.allHod);



 routes.use(require("../config/studentTokenChecker"))
//api with token

routes.post("/addComplaint",  ComplaintController.addComplaint);

routes.post("/changePassword", UserController.changePassword)

module.exports=routes

