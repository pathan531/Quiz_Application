const {addQuestions}=require("../AdminController/AddQuestions")
const express=require("express")
const route=express.Router()
const {verifyToken}=require("../MiddleWare/NormalToken")
route.post("/add/questions",addQuestions)
module.exports=route