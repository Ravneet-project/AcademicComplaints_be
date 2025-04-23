let mongoose=require("mongoose")
let enquirySchema=mongoose.Schema({
   studentId:{type:mongoose.Schema.Types.ObjectId, ref:"studentModel", default:null},
    name:{type:String,default:""},
    subject:{type:String,default:""},
    message:{type:String, default:""},
    status:{type:Boolean, default:"true"},
    createdAt:{type:Date, default:Date.now()}

    
})
module.exports=mongoose.model("enquiryModel", enquirySchema)