const express=require('express')
const cors=require('cors')
const app=express();
    
app.use(express.json())
require("dotenv").config()
 
app.use(  
    cors({ 
        origin:"*", 
    })
)

const router=require("./routes/route")
app.use("/api/v1",router)

const dbConnect=require("./config/database");
dbConnect()

app.get("/",(res,req)=>{   
   res.send(`<h1>TODO-LIST BACKEND</h1>`)
})

app.listen(5000,()=>{
    console.log('Server is running in 5000')
})