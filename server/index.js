const express=require('express')
const cors=require('cors')
const app=express();
    
app.use(express.json())
require("dotenv").config()

const allowedOrigins = ['https://todo-frontend-liart-alpha.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));


const router=require("./routes/route")
app.use("/api/v1",router)

const dbConnect=require("./config/database");
dbConnect()

app.get("/",(req,res)=>{   
   res.send(`<h1>TODO-LIST BACKEND</h1>`)
})

app.listen(5000,()=>{
    console.log('Server is running in 5000')
})