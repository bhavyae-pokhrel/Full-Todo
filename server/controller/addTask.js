const User=require("../models/User")
const List=require("../models/List")
const mongoose=require("mongoose")

exports.addTask=async(req,res)=>{
    const {id,title,body}=req.body   //* login user id who add task

    try{
        if(!id||!title||!body){
            console.log("Please fill form")
            return res.status(400).json({
                success:false,
                message:"Please fill form"
            })
        }
        const existingUser=await User.findById(id)  
        //* {id} show error it represent as Object, id represent as String  (DB me String me save ha)

        if(!existingUser){
            console.log("No User Found")
            return res.status(401).json({
                success:false,
                message:"No User Found"
            })
        }

        //* List Model contain title,body,user ha -----syntax to update user----> user:existingUser
        const list= await List.create({title,body,user:existingUser})

        // !NOTE---> existingUser is already created in SignUp so no used of  existingUser.create
        existingUser.list.push(list)      
        existingUser.save()               
         
        console.log("Task Add Successfully")
        return res.status(200).json({
            success:true,
            message:"Task Add Successfully",
            list
        })

    }
    catch(error){
        console.log("data can't add",error.message)
        return res.status(500).json({
            success:false,
            message:"data can't add"
        })
    }
}

 








exports.updateTask=async(req,res)=>{
   

    try{
        const {title,body}=req.body
      
        await List.findByIdAndUpdate(req.params.id,{title,body}) 

         //! NOTE----> ERROR  title{1} and  body{1} must be array   
        //*await List.findByIdAndUpdate(req.params.id,{$push:{title{1}:title,body{1}:body}}) 
        //& $push: and $pull: used to update the array 

        return res.status(200).json({
            success:true,
            message:"Task Update Successfully",
        
        })

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:`${error.message}`
        })
    }
}




  //!        IMPORTANT CONCEPT

 //^   UPDATE in (list array) from  User Model----->   use $push: and $pull
 //^   DELETE (list element) from List Model -------->  findByIdAndDelete



exports.deleteTask=async(req,res)=>{ 
    try{
        const id=req.body;   //empty

        //! NOT WORKING

        const existingUser=await User.findOneAndUpdate(id,{$pull:{list:req.params.id}}) 
        //*  this will  UPDATE list array  from  User Model        
        //& $push: and $pull: used to update the array
 
        if(!existingUser){
            console.log("No User Found or Task Not Found in User's List",req.params.id)
            return res.status(401).json({
                success:false,
                message:"No User Found",
            })
        }

        // ! WORKING

        await List.findByIdAndDelete(req.params.id)
        .then(()=>{
            console.log("Task Delete Successfully",req.params.id)
            return res.status(200).json({
                success:true,
                message:"Task Delete Successfully",
                data:existingUser
            
            })

        }) 
        .catch((error)=>{
            return res.status(500).json({
                success:false,
                message:`${error.message}`,
                
            })
        })

      
        //*  this will DELETE list element from List Model 
        //&  findByIdAndDelete is used to delete element not update the array          
                                            
    } 
    catch(error){
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:`${error.message}`,
            
        })
    }
}



 



// exports.deleteTask = async (req, res) => {
//     try {
//       const id = req.body;
//       console.log('id',id)
  
//       // Try to update the user's list by pulling the task ID
//       const existingUser = await User.findOneAndUpdate(id, { $pull: { list: req.params.id } });
  
//       // If no user is found or the task doesn't exist in the user's list, return early
//       if (!existingUser) {
//         console.log("No User Found or Task Not Found in User's List", req.params.id);
//         return res.status(401).json({
//           success: false,
//           message: "No User Found or Task Not Found in User's List",
//         });
//       }
  
//       // If the task exists, delete it from the List model
//       await List.findByIdAndDelete(req.params.id)
//         .then(() => {
//           console.log("Task Deleted Successfully", req.params.id);
//           return res.status(200).json({
//             success: true,
//             message: "Task Deleted Successfully",
//             data: existingUser,
//           });
//         })
//         .catch((error) => {
//           return res.status(500).json({
//             success: false,
//             message: `Error deleting task: ${error.message}`,
//           });
//         });
  
//     } catch (error) {
//       console.log(error.message);
//       return res.status(500).json({
//         success: false,
//         message: `Server error: ${error.message}`,
//       });
//     }
// };
  




 


exports.getTask=async(req,res)=>{

    try{
        const list=await List.find({user:req.params.id})

       if (!list) {
        console.log('Task not found')
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
   
       return res.status(200).json({
       
        success:true,
        message:'get all message successfully',
        list,                                         
       })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:`${error.message}`
        })
    }
}