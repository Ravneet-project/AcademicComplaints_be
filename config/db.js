const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://ravneetsawhney123:Cfaba2RpHXd2b7MQ@cluster0.w9n68.mongodb.net/")
.then(()=>{
    console.log("Database connected");
})
.catch((err)=>{
    console.log("Database not connected", err);
})