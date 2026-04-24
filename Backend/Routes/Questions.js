const {fetchQuestions} =require("../Controller/FetchingQuetions")
const express=require("express")
const route=express.Router()
const{verifyToken}=require("../MiddleWare/NormalToken")
route.get("/questions",verifyToken,fetchQuestions)
module.exports=route
