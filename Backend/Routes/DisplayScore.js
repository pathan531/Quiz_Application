const {AddingScore}=require("../Controller/fetchscore")
const {verifyToken}=require("../MiddleWare/NormalToken")
const express =require("express")
const route=express.Router()
route.post("/normal/current/score",verifyToken,AddingScore)
module.exports=route