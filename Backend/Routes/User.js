const express =require("express")
const route=express.Router()
const {addingUser}=require("../Controller/AddUsers")
route.post("/register",addingUser)
module.exports=route