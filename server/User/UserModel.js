const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    userId:{type:Number, default:0},
    name:{type:String, default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    userType:{type:Number, default:"3"},
    status:{type:Boolean,default:true},
    createdAt:{type:Date, default:Date.now()}
})
module.exports=mongoose.model("userModel", userSchema)








