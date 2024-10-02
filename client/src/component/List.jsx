import React, { useState,useEffect } from 'react'
import Task from "./Task"
import { toast } from "react-toastify";
import axios from "axios"

function List(){
   const [title,setTitle]=useState('')
   const [body,setBody]=useState('')
   const [collection,setCollection]=useState([])
   let id=sessionStorage.getItem("id") 
   //console.log(id)
     

      const AddTask=async()=>{
         if(title===""||body===""){
            return toast.error("Fill the Date")
         }
         else{
            if(id){
              await axios.post("https://todo-backend-irj3.onrender.com/api/v1/addTask",{id:id,title:title,body:body})
              .then((response)=>{
                 // console.log(response)
                  console.log(response.data.message) 
                  toast.success(response.data.message)  
              })
              .catch((error)=>{
                 console.log(error.message)
              })
              let newCollection=[...collection,{title,body}];
              setCollection(newCollection);
              console.log(collection);
              setTitle("")         
              setBody("")  
            }
                
         }
       
      }
  
      useEffect(()=>{
         if(id){
            const fetch=async()=>{
               await axios.get(`http://localhost:5000/api/v1/getTask/${id}`)
               .then((response)=>{
                 //console.log(response)
                 setCollection(response.data.list)
                 
               })
               .catch((error)=>{
                 console.log(error)
                 })
            }
            fetch()
         }
     

      },[AddTask])

   // & value={title} AND setTitle("") are just used empty input bar after click button

   // ^    value={task}  is used to manipulate the value in input tag
  return (
    <div className='todo'>
       <div>
          <input type='text' placeholder='Enter the title here...'  value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input type='text' placeholder='Enter the body here...'  value={body}  onChange={(e)=>setBody(e.target.value)} style={{marginLeft:"50px"}} />
          <button onClick={AddTask} style={{marginLeft:"50px"}}>Add To Task</button>
       </div>
       
        <br/>
        <Task collection={collection}/>

       
        
    </div>
  )
}

export default List