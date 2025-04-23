const mongoose=require("mongoose")
let hodSchema=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel", default:null},
    departmentId:{type:mongoose.Schema.Types.ObjectId, ref:"departmentModel", default:null},
    image:{type:String, default:"no-pic.jpg"},
    status:{type:Boolean, default:"true"},
    createdAt:{type:Date, default:Date.now()}
    
    
})
module.exports=mongoose.model("hodModel", hodSchema)