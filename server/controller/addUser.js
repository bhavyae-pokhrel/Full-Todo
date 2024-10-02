const User=require('../models/User') 
const bcrypt=require('bcryptjs')

exports.addUser=async(req,res)=>{
    try{
        
       const { name, email, password}=req.body

       if(!name || !email || !password){
        console.log('Please fill the form')
          return res.status(400).json({
            success:false,
            message:'Please fill the form'
           })
       } 
       
       const existingUser=await User.findOne({email});  //find not working but findOne is working
       if(existingUser){
          console.log('User Already Exist')
           return res.status(400).json({
              success:false,
              data:existingUser,
              message:'User Already Exist'
           })
       }

       let hasedPassword;
        try{
           hasedPassword=await bcrypt.hash(password,10)
        }
        catch(error){
            console.log('Error in Hashing Password')
           return res.status(500).json({
                success:false,
                message:'Error in Hashing Password'
            })
        }

        const user=await User.create({
           name, email, password:hasedPassword})
           console.log('Data Sumbit Successfully')
            return res.status(200).json({
                success:true,
                data:user,
                message:'Data Sumbit Successfully'
            })
    

    }
    catch(error){
        console.log('Error in addUser line 44',error.message)
        return res.status(400).json({
            success:false,
            message:'Something Went Wrong'
        })
    }
}