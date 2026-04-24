// const {addingUser,checkLogin,fetchQuestions,addScore,authScore}=require("../Controller/AddUsers")
// const {AddingScore} =require("../Controller/fetchscore")
// const{ getAllScores}=require("../Controller/AllFDScores")
// const express =require("express")
// const jwt=require("jsonwebtoken")
// const { questions } = require("../Model/User")
// secrect_key="mohammed9010"
// const route=express.Router()
// route.post("/register",addingUser)
// route.post('/login',checkLogin)
// const { auth } = require("express-oauth2-jwt-bearer")
// const verifyToken=async(req,res,next)=>{
//     const header=req.headers["authorization"]
//     const token=header.split(" ")[1]
//     if(!token){
//         return res.status(400).json({message:"jwt token not present"})
//     }
//     jwt.verify(token,secrect_key,(err,result)=>{
//         if(err){
//             return res.status(401).json({message:"jwt verification failed"})
//         }
//         req.user=result
//         next()

//     })

// }
// const authVerify=auth({
//      audience:'https://quiz-api.local',
//      issuerBaseURL: 'https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/',
//      tokenSigningAlg: 'RS256',

// })

// route.get("/questions",verifyToken,fetchQuestions)
// route.post("/score",verifyToken,addScore)
// route.get("/auth/questions",authVerify,fetchQuestions)
// route.post("/auth/users",authVerify,addingUser)
// route.post("/auth/users/score",authVerify,authScore)
// route.post("/normal/current/score",verifyToken,AddingScore)
// route.post("/auth/current/score",authVerify,AddingScore)
// route.get("/all/scores",getAllScores)

// module.exports=route