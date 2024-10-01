import {createSlice,configureStore} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{user_id:"",isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true
        },
        logout(state){
            state.isLoggedIn=false
        }
    },
})

export const authAction=authSlice.actions

export const store=configureStore({
    reducer:authSlice.reducer,
})




// !MINIMUM CODE REQUIRE FOR CREATE STORE

//^import {createSlice,configureStore} from "@reduxjs/toolkit"

//^ const authSlice=createSlice({
//^    name:"",
//^     initialState:{},
//^     reducers:{},
//^ })

//^ export const authAction=authSlice.actions

//^ export const store=configureStore({
//^     reducer:authSlice.reducers
//^ })