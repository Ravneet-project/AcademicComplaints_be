const express=require("express")
const app=express()
const cors=require("cors")
const db=require("./config/db")
app.use(express.json({limit:"40mb"}))

app.use(express.urlencoded({extended:true}))
app.use(express.static('public/'))
const api=require("./routes/apiRoutes")
const seed=require("./config/seed")
app.use(cors())

let studentApi=require("./routes/studentRoutes")
app.use("/student", studentApi)
let adminApi=require("./routes/adminRoutes")
app.use("/admin", adminApi)
let hodApi=require("./routes/hodRoutes")
app.use("/hod",hodApi)

const PORT=5001
app.listen(PORT,()=>{
    console.log("Server is running on PORT number ", PORT);
})

app.get("/",(req,res)=>{

    res.json({
        status:200,
        success:true,
        message:"Server running"
    })
})
//error
app.all("*",(req,res)=>{

    res.status(404).json({
        status:404,
        success:false,
        message:"Server is not  running"
    })
})
app.get("/findStudent",(req,res)=>{
    let course=req.query.course
    let x=data.filter(
        (el)=>{
            if(el.course==course){
               return el
            }
        }
    )
   
    
})