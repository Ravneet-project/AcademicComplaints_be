const complaintModel = require("./ComplaintModel");

addComplaint = (req, res) => {
    // Validation using an array
    let validation = [];
    
    if (!req.body.subject) {
        validation.push("subject is required!");
    }
    if (!req.body.complaintDesc) {
        validation.push("complaintDesc is required!");
    }
    if (typeof req.body.isAnonymous === "undefined") {
        validation.push("isAnonymous is required!");
    }
    
    if (!req.body.departmentId) {
        validation.push("departmentId is required!");
    }
    
    // Only validate studentId if the complaint is NOT anonymous
    if (!req.body.isAnonymous && !req.body.studentId) {
        validation.push("studentId is required!");
    }

    if (!req.body.profile) {
        validation.push("profile is required");
    }

    if (validation.length > 0) {
        return res.json({
            success: false,
            status: 422,
            message: validation
        });
    }

    complaintModel
        .countDocuments()
        .then((total) => {
            let complaintObj = new complaintModel({
                complaintId: total + 1,
                subject: req.body.subject,
                complaintDesc: req.body.complaintDesc,
                studentId: (req.body.isAnonymous==1) ? null : req.body.studentId,  // Set null if anonymous
                departmentId: req.body.departmentId,
                isAnonymous: req.body.isAnonymous,
                profile: req.body.profile
            });

            complaintObj
                .save()
                .then((savedComplaint) => {
                    res.json({
                        success: true,
                        status: 200,
                        message: "Complaint added successfully!",
                        data: savedComplaint,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.json({
                        status: 500,
                        success: false,
                        message: "Internal server error",
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
            });
        });
};




//getall
allComplaint = async (req, res) => {
    let limit= req.body.limit
    let  currentPage= req.body.currentPage-1
    delete req.body.limit
    let total =await complaintModel.countDocuments().exec()
    complaintModel
        .find()
        .populate({
            path: "studentId", 
            populate: "userId"
        })
        .populate("departmentId") // Populate departmentId
       
        .sort({createdAt:-1})
        .limit(limit)
        .skip(currentPage * limit)
          .then((complaintData)=>{
            if(complaintData.length>0){
              res.json({
                success:true,
                status:200,
                message:"complaint loaded successfully",
                total:total,
                data:complaintData
              })
            } else {
                res.json({
                    status: 200,
                    success: false,
                    message: "No data found!",
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                success: false,
                message: "Internal server error",
            });
        });
};



//getSingle

getSingleComplaint=(req,res)=>{
  let validation=[]
  if(!req.body._id){
      validation.push("_id is required")
  }
  if(validation.length>0){
      res.json({
          status:422,
          success:false,
          message:validation
      })
  }else{
      complaintModel.findOne({_id:req.body._id})
      .populate("hodId")
       .then((complaintData)=>{
          if(!complaintData){
            console.log(complaintData);
              res.json({
                  status:404,
                  success:false,
                  message:"complaint not found on given Id"
              })
          }else{
              res.json({
                  status:200,
                  success:true,
                  message:"complaint exists",
                  data:complaintData
              })
          }
      }).catch((err)=>{
        console.log(err);
          res.json({
              status:500,
              success:false,
              message:"Internal server error"
          })
      })
  }
}
updateComplaint=(req,res)=>{
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
       complaintModel.findOne({userId:req.body.userId})
       .then((complaintData)=>{
            if(!complaintData){
                res.json({
                    status:404,
                    success:false,
                    message:"No complaint found!"
                })
            }else{
                if(!!req.body.subject){
                    complaintData.subject=req.body.subject 
                }
                if(!!req.body.complaintDesc){
                    complaintData.complaintDesc=req.body.complaintDesc
                }
                if(!!req.file){
                    complaintData.profile=req.file.filename
                }
              
                if(req.body.isAnonymous){
                    complaintData.isAnonymous=req.body.isAnonymous
                }
                
                if(!!req.body.studentId){
                    complaintData.studentId=req.body.studentId 
                }
                if(!!req.body.departmentId){
                    complaintData.departmentId=req.body.departmentId 
                }
             
                complaintData.save()
                .then((updateData)=>{
                    console.log(1);
                    res.json({
                        success:true,
                        status:200,
                        message:"complaint updated!",
                        data:updateData
                    })
                })
                .catch((err)=>{
                    console.log(err);
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
            }
       })
       .catch((err)=>{
       console.log(err);
        res.json({
            status:500,
            success:false,
            message:"Internal server error"
        })
       })
    }

}
changeStatusComplaint=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
       complaintModel.findOne({_id:req.body._id})
      
       .then((complaintData)=>{
            if(!complaintData){
                res.json({
                    status:404,
                    success:false,
                    message:"no complaint found!"
                })
            }else{
                if(!!req.body.status){
                    complaintData.status=req.body.status 
                }
           
                complaintData.save()
                .then((updateData)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"complaint status changed!",
                        data:updateData
                    })
                })
                .catch((err)=>{
                    console.log(err);
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error"
                    })
                })
            }
       })
       .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error"
        })
       })
    }

}

deleteComplaint=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.status(422).json({
            status:422,
            success:false,
            message:validation
        })
    }else{
       complaintModel.findOne({_id:req.body._id})
       .then((complaintData)=>{
            if(!complaintData){
                res.json({
                    status:404,
                    success:false,
                    message:"No complaint found!"
                })
            }else{
                complaintModel.deleteOne({_id:req.body._id})
                .then((result)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"Deleted successfully",
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
       })
       .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error"
        })
       })
    }
}
module.exports={addComplaint,allComplaint,  getSingleComplaint,updateComplaint,changeStatusComplaint,deleteComplaint}

