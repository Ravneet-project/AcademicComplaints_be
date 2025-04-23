let mongoose=require("mongoose")
let departmentSchema=mongoose.Schema({
    departmentName:{type:String, default:""},
    description:{type:String, default:""},
    status:{type:Boolean, default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("departmentModel",departmentSchema)