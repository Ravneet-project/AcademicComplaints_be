const DepartmentModel = require("../Department/DepartmentModel");
const ComplaintModel=require("../Complaint/ComplaintModel");
const HodModel = require("../Hod/HodModel")
const StudentModel=require("../Student/StudentModel")
const EnquiryModel = require("../Enquiry/EnquiryModel");

dashboard=async(req,res)=>{
    let departmentTotal = await DepartmentModel.countDocuments().exec()
    let complaintTotal = await ComplaintModel.countDocuments().exec()
    let studentTotal = await StudentModel.countDocuments().exec()
    let hodTotal=await HodModel.countDocuments().exec()
    let enquiryTotal = await EnquiryModel.countDocuments().exec()
    StudentModel.find().sort({createdAt:-1}).limit(5)
    .then((userData)=>{
        res.json({
        status:200,
        success:true,
        message:"Data loaded",
        totalDepartment:departmentTotal,
        totalStudent:studentTotal,
        totalComplaints:complaintTotal,
        totalEnquiry:enquiryTotal,
        totalHod:hodTotal,
        data:userData


    })
})
.catch((err)=>{
    res.json({
        status:500,
        success:false,
        message:"Internal server error"
    })
})
}
module.exports={dashboard}