const jwt=require("jsonwebtoken")
const PVT_KEY="complaints"
module.exports=(req,res, next)=>{
    let token=req.headers.authorization;
    if(!token){
        res.json({
            status:403,
            success:false,
            message:"Token not found!"
        })
    }else{
        jwt.verify(token,PVT_KEY, function (err, decoded){
            if(!err){  
                req.decoded=decoded
                if(decoded.userType==1 || decoded.userType==3 || decoded.userType==2){
                    next()
                }else{
                    res.json({
                        status:403,
                        success:false, 
                        message:"You are not allowed to access this page"
                    })   
                }
            }else{
                res.json({
                    status:403,
                    success:false, 
                    message:"Unauthorized access"
                })
            }
            
        } )
    
    }
   
}
