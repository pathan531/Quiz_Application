const express =require("express")
const route=express.Router()
const{authScore}=require("../Controller/AddAuthscore")
const{authVerify}=require("../MiddleWare/AuthToken")
route.post("/auth/users/score",authVerify,authScore)
module.exports=route