import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import './SignUp.css';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios"

function SignUp() {
  const [hidepassword,setHidePassword]=useState(true)
  const [formData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
    
  });
  
  const navigate = useNavigate();

  const HandlerChange = (event) => { 
    const { name, value } = event.target;
    SetformData((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  };

 
  const SubmitForm = async (data) => {    
   event.preventDefault();

   console.log(data)
   console.log(formData)

   //  !    Using Fetch 

   //^   const savedResponse=await fetch("http://localhost:5000/api/v1/addUser", {
   //^     method: "POST",
   //^     headers: {
   //^       "Content-Type": "application/json",
   //^     },
   //^     body: JSON.stringify({ ...formData}),
   //^   });
   //^   console.log('savedResponse SignUp 37----->',savedResponse)
    
   //^   if(savedResponse.status===200){
   //^     navigate("/dashboard")
   //^     toast.success("User Register Successfully")
   //^   }
   //^   else{
   //^     toast.error("User not registered")
   //^   }
   //^ };



   // ! Using Axios

   await axios.post("https://todo-backend-irj3.onrender.com/api/v1/addUser",formData)
    .then((response)=>{
     console.log(response);

      //if(response.status===200){    //* ELSE NOT WORKING, SO NO NEED
        alert(response.data.message)
        navigate("/")
        toast.success(response.data.message)
      //}

      // else{     //* ELSE NOT WORKING
      //   alert(response.data.message)
      //   toast.error(response.data.message) 
      // }
     
   })
   .catch((error)=>{ //^ response.data.status!==200  then run
      toast.error("User Cant't Register Successfully")
       console.log(error.message)   
   }) 
  }

                      

return (
  <div className="container">
    <form onSubmit={SubmitForm} className="form">
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={(event) => HandlerChange(event)}
      />
      
      <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" required value={formData.email} onChange={(event) => HandlerChange(event)}/>
      
 
      <label htmlFor="password">Password:  </label>
        <input id="password" type={hidepassword?"password":"text"} name="password" minLength={5} required value={formData.password} onChange={(event) => HandlerChange(event)}/>
        <span onClick={()=>setHidePassword((prev)=>!prev)}>
          {hidepassword?<FaEye/>:<FaEyeSlash/>}
        </span>
      
      
      <button type="submit">Submit</button>
      <button className="newUserButton" onClick={() => navigate("/")}>Already User</button>
    </form>
     
  </div>
);
}

export default SignUp;
