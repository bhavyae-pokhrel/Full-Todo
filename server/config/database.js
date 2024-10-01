const mongoose=require("mongoose")

const dbConnect=()=>{
  mongoose.connect("mongodb://localhost:27017/Full-Todo",{

  })
  .then(()=>{
      console.log('DB is connect')
  })
  .catch((error)=>{
    console.log('DB is not connect',error.message)
  })
  
}
 
module.exports=dbConnect  