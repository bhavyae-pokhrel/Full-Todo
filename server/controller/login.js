
const User=require("../models/User")

const bcrypt=require("bcryptjs")

exports.login=async(req,res)=>{
    const{email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({
            message:'Please fill the form'
        })
    }

    const user=await User.findOne({email})
    
        if(!user){
            console.log('User is not register')
            return res.status(401).json({
                success:false,
                message:'User is not register'
            }) 
        }
        else{
            if(await bcrypt.compare(password, user.password)){
                console.log('Login Successfully')
                return res.status(200).json({
                    success:true, 
                    data:user,
                    message:'Login Successfully'
                }) 
            }
            else{
                console.log("Can't login")
                return res.status(500).json({
                    success:false,
                    message:`Can't login`
                })
            }

        }
} 