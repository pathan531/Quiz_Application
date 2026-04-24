const {addScore}=require("../Controller/AddNormalScore")
const {verifyToken}=require("../MiddleWare/NormalToken")
const express =require("express")
const route=express.Router()
route.post("/score",verifyToken,addScore)
module.exports=route