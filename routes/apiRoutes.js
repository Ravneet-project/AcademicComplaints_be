// const multer = require("multer");
// const DepartmentController = require("../server/Department/DepartmentController");
// const StudentController = require("../server/Student/StudentController");
// const EnquiryController = require("../server/Enquiry/EnquiryController");
// const ComplaintController = require("../server/Complaint/ComplaintController");
// const UserController = require("../server/User/UserController")
// const DashboardController= require("../server/Dashboard/DashboardController");

// const HodController=require("../server/Hod/HodController");

// const routes = require("express").Router();
// //login
//  routes.post("/login", UserController.login);

// //  token checker
// //  routes.use(require("../config/adminTokenChecker"))
 



// // Department routes
// // routes.post("/dashboard", DashboardController.dashboard);
// // routes.post("/addDepartment", DepartmentController.addDepartment);
// // routes.post("/allDepartment", DepartmentController.allDepartment);

// // routes.post("/getSingleDepartment", DepartmentController.getSingleDepartment);
// // routes.post("/updateDepartment", DepartmentController.update);
// // routes.post("/changeStatusDepartment", DepartmentController.changeStatusDepartment);

// // Student file upload configuration
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
// routes.post("/registerStudent",studentUpload.single("image"),StudentController.registerStudent);
// // routes.post("/allStudent",StudentController.allStudent);
// // routes.post("/getSingleStudent", StudentController.getSingleStudent);
// // routes.post("/update", studentUpload.single("image"),StudentController.update);
// // routes.post("/changeStatus", StudentController.changeStatus);

// // Enquiry
// routes.post("/addEnquiry", EnquiryController.addEnquiry);
// // routes.post("/allEnquiry", EnquiryController.allEnquiry);
// // routes.post("/deleteEnquiry", EnquiryController.deleteEnquiry);

// // Complaints
// // Complaints file upload configuration
// const complaintStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/complaintImage/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const complaintUpload = multer({ storage: complaintStorage });
// routes.post("/addComplaint", complaintUpload.single("profile"), ComplaintController.addComplaint);
// routes.post("/allComplaint",ComplaintController.allComplaint);
// routes.post("/getSingleComplaint",ComplaintController.getSingleComplaint);

// routes.post("/updateComplaint",complaintUpload.single("profile"),ComplaintController.updateComplaint);
// routes.post("/changeStatusComplaint",ComplaintController.changeStatusComplaint);
// routes.post("/deleteComplaint",ComplaintController.deleteComplaint);

// //Hod
// // // hod file upload configuration
// // const hodStorage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./public/hodImage/");
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// //     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
// //   },
// // });

// // const hodUpload = multer({ storage: hodStorage });
// // routes.post("/addHod", hodUpload.single("image"), HodController.addHod);
// routes.post("/allHod", HodController.allHod);

// // routes.post("/getSingleHod", HodController.getSingleHod);
// // routes.post("/updateHod", hodUpload.single("image"),HodController.updateHod);
// // routes.post("/changeStatusHod", HodController.changeStatusHod);
// //change Password
// routes.post("/changePassword", UserController.changePassword)

// //middleware
// // Middleware
// routes.post("/middleware", require("../config/middleware"));

// module.exports = routes;
