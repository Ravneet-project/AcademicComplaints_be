const enquiryModel=require("./EnquiryModel")
addEnquiry=async (req,res)=>{
    // validation using 1st way using array
    let validation=[]
    if(!req.body.name){
        validation.push(" name is required!")
    }
    if(!req.body.subject){
        validation.push("subject is required!")
    }
    if(!req.body.message){
        validation.push("message is required!")
    }
   
    if(validation.length>0){
        res.json({
            success:false,
            status:422,
            message:validation
        })
    }else{
        let total=await enquiryModel.countDocuments().exec()
        // console.log(total);
        let enquiryObj= new enquiryModel()  
        enquiryObj.enquiryId=total+1
        enquiryObj.name=req.body.name
        enquiryObj.subject=req.body.subject
        enquiryObj.message=req.body.message
        enquiryObj.studentId=req.body.studentId
       
        enquiryObj.save()
        .then((enquiryData)=>{
            
            res.json({
                status:200,
                success:true,
                message:"Enquiry added successfully!",
                data:enquiryData
              
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
            
    }
    
}
allEnquiry=async(req,res)=>{
    let limit=req.body.limit 
    let currentPage=req.body.currentPage-1
    delete req.body.limit
     delete req.body.currentPage
    let total=await enquiryModel.countDocuments().exec()
  enquiryModel.find()
  .sort({createdAt:-1})
  .limit(limit)
  .skip(currentPage * limit)
    .then((enquiryData)=>{
      if(enquiryData.length>0){
        res.json({
          success:true,
          status:200,
          message:"enquiry loaded successfully",
          total:total,
          data:enquiryData
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
        console.log("err");
        res.json({
          success:false,
          status:500,
          message:"Internal server error ",
          error:err
        })
    })
}
// pagination

deleteEnquiry=(req,res)=>{
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
       enquiryModel.findOne({_id:req.body._id})
       .populate({
        path:"studentId", populate:"userId"
    })
       .then((enquiryData)=>{
            if(!enquiryData){
                res.json({
                    status:404,
                    success:false,
                    message:"No enquiry found!"
                })
            }else{
                enquiryModel.deleteOne({_id:req.body._id})
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

module.exports={addEnquiry, allEnquiry, deleteEnquiry}

