const express =require("express")
const route=express.Router()
const{addingUser}=require("../Controller/AddUsers")
const{authVerify}=require("../MiddleWare/AuthToken")
route.post("/auth/users",authVerify,addingUser)
module.exports=route