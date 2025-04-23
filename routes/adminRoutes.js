const multer = require("multer");
const DepartmentController = require("../server/Department/DepartmentController");
const StudentController = require("../server/Student/StudentController");
const EnquiryController = require("../server/Enquiry/EnquiryController");
const ComplaintController = require("../server/Complaint/ComplaintController");
const UserController = require("../server/User/UserController")
const DashboardController= require("../server/Dashboard/DashboardController");

const HodController=require("../server/Hod/HodController");

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
// hod file upload configuration
// const hodStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/hodImage/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const hodUpload = multer({ storage: hodStorage });
//complaint
// const complaintStorage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, "./public/complaintImage/");
//    },
//    filename: function (req, file, cb) {
//      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//    },
//  });
 
//  const complaintUpload = multer({ storage: complaintStorage });
 


//router
const routes=require("express").Router()

//routes without token
routes.post("/login", UserController.login)
routes.post("/allDepartment", DepartmentController.allDepartment);

routes.post("/getSingleDepartment", DepartmentController.getSingleDepartment);
routes.post("/updateDepartment", DepartmentController.update);
routes.post("/changeStatusDepartment", DepartmentController.changeStatusDepartment);
//student
routes.post("/allStudent",StudentController.allStudent);
routes.post("/getSingleStudent", StudentController.getSingleStudent);
routes.post("/update", StudentController.update);
routes.post("/changeStatus", StudentController.changeStatus);

//Enquiry
routes.post("/allEnquiry", EnquiryController.allEnquiry);
routes.post("/deleteEnquiry", EnquiryController.deleteEnquiry);
//complaint
routes.post("/allComplaint",ComplaintController.allComplaint);
routes.post("/getSingleComplaint",ComplaintController.getSingleComplaint);
routes.post("/updateComplaint",ComplaintController.updateComplaint);
routes.post("/changeStatusComplaint",ComplaintController.changeStatusComplaint);
//hod
routes.post("/allHod", HodController.allHod);

routes.post("/getSingleHod", HodController.getSingleHod);
routes.post("/updateHod",HodController.updateHod);
routes.post("/changeStatusHod", HodController.changeStatusHod);

routes.use(require("../config/adminTokenChecker"))
//api with token 
//department

routes.post("/dashboard", DashboardController.dashboard);
routes.post("/addDepartment", DepartmentController.addDepartment);




//hod
routes.post("/addHod", HodController.addHod);


//change password
routes.post("/changePassword", UserController.changePassword)
module.exports=routes
