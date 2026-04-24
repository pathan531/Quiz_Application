const {fetchQuestions} =require("../Controller/FetchingQuetions")
const express=require("express")
const route=express.Router()
const{authVerify}=require("../MiddleWare/AuthToken")
route.get("/auth/questions",authVerify,fetchQuestions)
module.exports=route
