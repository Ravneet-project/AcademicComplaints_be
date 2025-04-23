const departmentModel=require("./DepartmentModel")
//add api
addDepartment=(req,res)=>{
    // validation using 1st way using array
    let validation=[]
    if(!req.body.departmentName){
        validation.push("Department name is required!")
    }
    if(!req.body.description){
        validation.push("Description is required!")
    }
    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation
        })
    }else{
        //duplicacy check
       departmentModel.findOne({departmentName:req.body.departmentName})
       .then(async (departmentData)=>{
           
            if(!departmentData){
                let total=await departmentModel.countDocuments().exec()
              
                let departmentObj= new departmentModel()  
                departmentObj.departmentId=total+1
                departmentObj.departmentName=req.body.departmentName
                departmentObj.description=req.body.description
                departmentObj.save()
                .then((departmentData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"department added successfully!",
                        data:departmentData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err
                    })
                })
            }else{
                res.json({
                    status:200,
                    success:false,
                    message:"department already exists with same name",
                    data:departmentData
                })
            }
       })
       .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err
            }) 
       })
    }
}


//get all api
allDepartment=async(req,res)=>{
    let limit=req.body.limit 
    let currentPage=req.body.currentPage-1
    delete req.body.limit
    delete req.body.currentPage
    let total=await departmentModel.countDocuments().exec()

  departmentModel.find()
  .sort({createdAt:-1})
  .limit(limit)
  .skip(currentPage * limit)
    .then((departmentData)=>{
      if(departmentData.length>0){
        res.json({
          success:true,
          status:200,
          message:"department loaded successfully",
          total:total,
          data:departmentData
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

//getsingle
getSingleDepartment=(req,res)=>{
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
      departmentModel.findOne({_id:req.body._id})
      .then((departmentData)=>{
          if(!departmentData){
              res.json({
                  status:404,
                  success:false,
                  message:"department not found on given Id"
              })
          }else{
              res.json({
                  status:200,
                  success:true,
                  message:"department exists",
                  data:departmentData
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
update=(req,res)=>{
    let validation=[]
    if(!req.body._id){
        validation.push("_id is required")
    }
    if(validation.length>0){
        res.status(422).json({
            satus:422,
            success:false,
            message:validation
        })
    }else{
        departmentModel.findOne({_id:req.body._id})
            .then((departmentData)=>{
                // console.log(departmentData);
                if(!departmentData){
                    res.json({
                        success:false,
                        status:404,
                        message: "department does not exist at given id"
                    })
                }else{
                    if(!!req.body.departmentName){
                        departmentData.departmentName=req.body.departmentName
                   
                    }
                    if(!!req.body.description){
                        departmentData.description=req.body.description
                   
                    }
                    departmentData.save()
                    .then((updateDepartment)=>{
                        res.json({
                            status:200,
                            success:true,
                            message:"department updated successfully",
                            data:updateDepartment
                        })

                    })
                    .catch((err)=>{
                        res.satus(500).json({
                            status:500,
                            success:false,
                            message:"internal server error"
                        })
                    })
                }
            })
            .catch((err)=>{
                res.status(500).json({
                    status:500,
                    success:false,
                    message:"internal server error"
                })
            })
        
    }
}
//status api

changeStatusDepartment=(req,res)=>{
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
        departmentModel.findOne({_id:req.body._id})
        .then((departmentData)=>{
            if(!departmentData){
                res.json({
                    status:404,
                    success:false,
                    message:"department does not exist at given id"
                })
            }else{
                if(!!req.body.status){
                    departmentData.status=req.body.status
                }
                departmentData.save()
                .then((updatedDepartment)=>{
                    res.json({
                        success:true,
                        status:200,
                        message:"department updated successfully",
                        data:updatedDepartment
                    })
                })
                .catch((err)=>{
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
        })
    }
}



module.exports={addDepartment, allDepartment,getSingleDepartment,update,changeStatusDepartment}


