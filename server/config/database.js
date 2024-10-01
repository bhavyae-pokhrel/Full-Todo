const mongoose=require("mongoose")

const dbConnect=()=>{
  mongoose.connect("mongodb+srv://bhavyaeprasadpokhrel:VUwalom0MrBlLkOe@cluster0.spbza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Todo",{

  })
  .then(()=>{
      console.log('DB is connect')
  })
  .catch((error)=>{
    console.log('DB is not connect',error.message)
  })
  
}
 
module.exports=dbConnect  