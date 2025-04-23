const mongoose=require("mongoose")
let complaintSchema=mongoose.Schema({
    studentId:{type:mongoose.Schema.Types.ObjectId, ref:"studentModel", default:null},
    departmentId:{type:mongoose.Schema.Types.ObjectId, ref:"departmentModel", default:null},
   
    complaintId:{type:Number, default:0},
    profile:{type:String, default:"no-pic.jpg"},
    complaintDesc:{type:String, default:""},
    isAnonymous: { type: Boolean, default: false },

    subject:{type:String,default:""},
   
    status:{type:Number, default:1},
    //1->Pending, 2->Approve, 3->Decline, 4-> Assign5->In-progress, 6->Complete
    createdAt:{type:Date, default:Date.now()}

    
})
module.exports=mongoose.model("complaintModel", complaintSchema)
