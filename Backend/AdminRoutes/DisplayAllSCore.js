const express =require("express")
const {verifyToken}=require("../MiddleWare/NormalToken")
const route=express.Router()
const{getAllScores,searchScores}=require("../AdminController/AllFDScores")
route.get("/all/scores",verifyToken,getAllScores)
route.post("/search/scores",verifyToken,searchScores)
module.exports=route