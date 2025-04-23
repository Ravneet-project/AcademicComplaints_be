const studentModel = require("./StudentModel");
const userModel=require("../User/UserModel");
const bcrypt=require("bcryptjs")
const registerStudent = async (req, res) => {
    let validation = [];
    if (!req.body.name){
        validation.push("Name is required!");
    }
    if (!req.body.email) {
        validation.push("Email is required!");
    }
    if (!req.body.password) {
        validation.push("Password is required!");
    }
    if (!req.body.rollNo){ 
        validation.push("Roll Number is required!");
    }
    if (!req.body.address){ 
        validation.push("Address is required!");
    }
    if (!req.body.contact) {
        validation.push("Contact is required!");
    }
    if (!req.body.course) {
        validation.push("Course is required!");
    }
    if (!req.body.image){ 
        validation.push("Image is required!");
    }

    // If validation fails, send response
    if (validation.length > 0) {
        return res.status(422).json({
            success: false,
            status: 422,
            message: validation,
        });
    } else {
        userModel.findOne({ email: req.body.email })
        .then((userData) => {
            if (!userData) {
                let userObj = new userModel();
                userObj.name = req.body.name;
                userObj.email = req.body.email;
                userObj.password = bcrypt.hashSync(req.body.password, 10);
                userObj.userType = 3;
                userObj.save()
                    .then((userData) => {
                        let studentObj = new studentModel();
                        studentObj.rollNo = req.body.rollNo; // Corrected casing
                        studentObj.contact = req.body.contact;
                        studentObj.address = req.body.address;
                        studentObj.course = req.body.course;
                        studentObj.image = req.body.image
                        studentObj.userId = userData._id;
                        studentObj.save()
                            .then((studentData) => {
                                res.json({
                                    status: 200,
                                    success: true,
                                    message: "Student added",
                                    userData: userData,
                                    studentData: studentData,
                                });
                            })
                            .catch((err) => {
                                res.json({
                                    status: 500,
                                    success: false,
                                    message: "Internal server error",
                                    error: err,
                                });
                            });
                    })
                    .catch((error) => {
                        res.json({
                            status: 500,
                            success: false,
                            message: "Internal server error!!",
                            error: error,
                        });
                    });
            } else {
                res.status(200).json({
                    success: false,
                    status: 200,
                    message: "Student already exists!",
                    data: userData,
                });
            }
        }).catch((err) => {
            res.json({
                status: 500,
                success: false,
                message: "Internal server error!",
                error: err,
            });
        });
    }
};

//get all api
allStudent=async(req,res)=>{
let limit=req.body.limit  ||null
let currentPage=req.body.currentPage-1 ||null
delete req.body.limit
delete req.body.currentPage
let total = await studentModel.countDocuments().exec()


  studentModel.find()
  .sort({createdAt:-1})
  .limit(limit)
  .skip(currentPage*limit)
  .populate("userId")
    .then((studentData)=>{
      if(studentData.length>0){
        res.json({
          success:true,
          status:200,
          message:"student loaded successfully",
          total:total,
          data:studentData
        })
      }else{
        res.json({
          success:false,
          status:200,
          message:"No data found"
        })
      }
    })
    .catch((err)=>{
        res.json({
          success:false,
          status:500,
          message:"Internal server error ",
          error:err
        })
    })
}
//pagination

//getsingle
getSingleStudent=(req,res)=>{
  let validation=[]
  if(!req.body.userId){
      validation.push("userId is required")
  }
  if(validation.length>0){
      res.json({
          status:422,
          success:false,
          message:validation
      })
  }else{
      studentModel.findOne({userId:req.body.userId}).populate("userId")
      .then((studentData)=>{
          if(!studentData){
              res.json({
                  status:404,
                  success:false,
                  message:"student not found on given Id"
              })
          }else{
              res.json({
                  status:200,
                  success:true,
                  message:"student exists",
                  data:studentData
              })
          }
      }).catch((err)=>{
          res.json({
              status:500,
              success:false,
              message:"Internal server error"
          })
      })
  }
}
//update api
update = (req, res) => {
  if (!req.body.userId) {
    return res.status(422).json({
      status: 422,
      success: false,
      message: "User ID is required",
    });
  }

  studentModel.findOne({ userId: req.body.userId })
    .then((studentData) => {
      if (!studentData) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "student does not exist",
        });
      }

      if (!!req.body.userId)
         studentData.course = req.body.course;
      if (!!req.body.userId.rollNo)
        studentData.rollNo=req.body.rollNo;
      studentData.save()
        .then(() => {
          userModel
            .findOne(studentData.userId)
            .then((userData) => {
              if (!!req.body.name) 
                userData.name = req.body.name;
               

              userData.save()
                .then(() => {
                  res.json({
                    status: 200,
                    success: true,
                    message: "student updated successfully",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    status: 500,
                    success: false,
                    message: "Failed to update user data",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              res.status(500).json({
                status: 500,
                success: false,
                message: "User data not found",
                error: err,
              });
            });
        })
        .catch((err) => {
            console.log(err);
          res.status(500).json({
            status: 500,
            success: false,
            message: "Failed to update student data",
            error: err,
          });
        });
    })
    .catch((err) => {
        console.log(err);
      res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        error: err,
      });
    });
};

//status api

changeStatus=(req,res)=>{
    let validation=[]
    if(!req.body.userId){
        validation.push("userId is required")
    }
    if(validation.length>0){
        res.status(422).json({
            status:422,
            success:false,
            message:validation
        })
    }else{
       studentModel.findOne({userId:req.body.userId})
        .then((studentData)=>{
            if(!studentData){
                res.json({
                    status:404,
                    success:false,
                    message:"student does not exist at given id"
                })
            }else{
                // if(!!req.body.status){
                    studentData.status=req.body.status
                // }
                studentData.save()
                .then((updatedStudent)=>{

                    userModel.findOne({_id:req.body.userId})
                    .then((userData)=>{
                    userData.status=req.body.status   
                    userData.save()
                    .then((userData)=>{
                      res.json({
                        status:200,
                        success:true,
                        message:"User data already exists",
                        data:userData
                      })
                    })
                    .catch((err)=>{
                      console.log(err);
                        res.status(500).json({
                            status:500,
                            success:false,
                            message:"Internal server error"
                        })
                    })

                    })
                    .catch((err)=>{
                      console.log(err);
                        res.status(500).json({
                            status:500,
                            success:false,
                            message:"Internal server error"
                        })
                    })
                })
                .catch((err)=>{
                  console.log(err);
                    res.status(500).json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
            }       
        })
        .catch((err)=>{
            res.status(500).json({
                status:500,
                success:false,
                message:"Internal server error"
            })
            console.log(err);
        })
    }
}




module.exports = { registerStudent,allStudent,getSingleStudent,update,changeStatus};
