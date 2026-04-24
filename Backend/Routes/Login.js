const {checkLogin}=require("../Controller/ControllLogin")
const express= require("express")
const route=express.Router()
route.post('/login',checkLogin)
module.exports=route