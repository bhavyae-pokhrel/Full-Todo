import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { authAction } from '../store';


function Login() {

  const dispatch= useDispatch()

  const [hidepassword,setHidePassword]=useState(true)
  const [loginData,SetloginData]=useState({email:"",password:""})
  const navigate=useNavigate()

  const HandlerChange = (event) => { 
    const { name, value } = event.target;
    SetloginData((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  };

  const findUser=async(data)=>{
    event.preventDefault()
    console.log('data-->',data)
    console.log('loginData-->',loginData)

    //!  Using Fetch 

    //^ const User=await fetch("http://localhost:5000/api/v1/login",{ 
    //^   method:"POST",
    //^   headers:{
    //^     "Content-Type":"application/json"
    //^   },
    //^   body: JSON.stringify({...loginData})
    //^ })
    //^ console.log('Response Login-->',User)

    //^ if(User.status==200){
    //^   navigate("/dashboard")
    //^   toast.success("Login Succesfully")
    //^ }
    //^ else{
    //^   toast.error("Email or Password is incorrect")
    //^ }

    // ! Using Axios' VUwalom0MrBlLkOe
    //mongodb+srv://bhavyaeprasadpokhrel:VUwalom0MrBlLkOe@cluster0.spbza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    await axios.post("https://todo-backend-irj3.onrender.com/api/v1/login",loginData) //http://localhost:5000
    .then((response)=>{
    
      console.log(response) //* Using this, Check where id present in API                       
      console.log(response.data.data._id);  

      //* Store in sessionStorage (not remove on refresh page), (localStorage me bhi store ho sakta ha)
      //* Inspect-->Application-->SessionStore  key(id):Value

      sessionStorage.setItem("id",response.data.data._id)
      dispatch(authAction.login())
      //~ sessionStorage.setItem("id")
      //~ sessionStorage.clear("id")

     
      navigate("/dashboard")
      toast.success(response.data.message)
    })
    .catch((error)=>{
      console.log(error.message)
    })
   
  }

  return (
    <div className="container">
      <form onSubmit={findUser} className="form">
        <label htmlFor="email">Email: </label>
        <input id="email" type="email" name="email" value={loginData.email} onChange={(event) => HandlerChange(event)} required/>
        

        <label htmlFor="password">Password: </label>
        <input id="password" type={hidepassword?"password":"text"} name="password" minLength={5} value={loginData.password} onChange={(event) => HandlerChange(event)} required />
        <span onClick={()=>setHidePassword((prev)=>!prev)}>
          {hidepassword?<FaEye/>:<FaEyeSlash/>}
        </span>
        

        <button type="submit">Login</button>
        <button className="newUserButton" onClick={() => navigate("/signup")}>
          New User
        </button>
      </form>
    </div>
  );
}


export default Login
