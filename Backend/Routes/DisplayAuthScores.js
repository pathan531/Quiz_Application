const express =require("express")
const route=express.Router()
const{AddingScore}=require("../Controller/fetchscore")
const{authVerify}=require("../MiddleWare/AuthToken")
route.post("/auth/current/score",authVerify,AddingScore)
module.exports=route