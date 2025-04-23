const userModel=require("./UserModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const PVT_KEY="complaints"

login=(req,res)=>{
    let validation=[]
    if(!req.body.email){
        validation.push("Email is required")
    }
    if(!req.body.password){
        validation.push("Password is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        // email exists /user exists
        userModel.findOne({email:req.body.email})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"User not found!"
                })
            }else{
                //password match 
                let result=bcrypt.compareSync(req.body.password, userData.password)
                if(result){

                    let payload={
                        name:userData.name,
                        email:userData.email,
                        userId:userData._id,
                        userType: userData.userType,
                    }
                    let token=jwt.sign(payload,PVT_KEY, {expiresIn:"24h"} )
                    res.json({
                        success:true,
                        status:200,
                        message:"Login successfully!",
                        token:token,
                        data:userData
                    })
                }else{
                    res.json({
                        status:200,
                        success:false,
                        message:"Invalid credentials"
                    })
                }
                
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



changePassword=(req,res)=>{
    let validation=[]
   
    if(!req.body.oldPassword){
        validation.push("Old Password is required")
    }
    if(!req.body.newPassword){
        validation.push("New Password is required")
    }
    if(!req.body.confirmPassword){
        validation.push("Confirm Password is required")
    }
    if(validation.length>0){
        res.json({
            status:422,
            success:false,
            message:validation
        })
    }else{
        //user find 
        userModel.findOne({_id:req.decoded.userId})
        .then((userData)=>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"No user found!"
                })
            }else{
                // confirm password=== new password 
                if(req.body.confirmPassword===req.body.newPassword){
                    //old password match database password
                    let result=bcrypt.compareSync(req.body.oldPassword, userData.password)
                    if(result){
                        //password update 
                        userData.password=bcrypt.hashSync(req.body.newPassword, 10)
                        userData.save()
                        .then((userData)=>{
                            console.log(userData)
                            res.json({
                                status:200,
                                success:true,
                                message:"Password changed successfully"
                            })
                        })
                        .catch((err)=>{
                            console.log(err)
                            res.json({
                                status:422,
                                success:false,
                                message:validation
                            }) 
                        })
                    }else{
                        res.json({
                            success:false,
                            status:200,
                            message:"Old Password doesn't match"
                        })
                    }
                }else{
                    res.json({
                        success:false,
                        status:200,
                        message:"confirm password and new password doesn't match"
                    })
                }

            }
        })
        .catch((err)=>{
            console.log(err)
            res.json({
                status:422,
                success:false,
                message:validation
            })
        })
    }
}

module.exports={login, changePassword}

