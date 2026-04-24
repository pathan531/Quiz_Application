// const express = require('express')
// const cors = require('cors')
// const MySql = require('mysql2')
// const app = express()
// const bcrypt = require('bcryptjs')
// const jwt = require("jsonwebtoken")
// const secret_key = "mohammed@901020"
// const { auth } = require("express-oauth2-jwt-bearer")
// const { Sequelize } = require('sequelize')
// const sequalize=require("./Config/db")

// const port = 5000
// app.use(cors())
// app.use(express.json())

// const db = MySql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "tiger",
//   database: "quizdb"
// })

// db.connect(err => {
//   if (err) {
//     console.log("DB connectioon error", err)
//   } else {
//     console.log("DB connection successful")
//   }
// })
// // register 
// app.post("/register", (req, res) => {
//   const { username, email, password } = req.body
//   const checkQuery = "SELECT * FROM quiz_users WHERE email = ?"

//   db.query(checkQuery, [email], async (err, result) => {
//     if (err) return res.status(500).json({ message: "Error checking email" })
//     if (result.length > 0) return res.status(400).json({ message: "Email already exists" })

//     const hashedPassword = await bcrypt.hash(password, 10)
//     const insertQuery = "INSERT INTO quiz_users(username,email,password) VALUES (?,?,?)"

//     db.query(insertQuery, [username, email, hashedPassword], (err, result) => {
//       if (err) return res.status(500).json({ message: "Error inserting user" })
//       if (result) {
//         return res.status(201).json({ message: "User registered successfully" })
//       }
//     })
//   })
// })
// //login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body
//   const checkQuery = "select * from quiz_users where email=?"
  
//   db.query(checkQuery, [email], async (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "error in searching the email" })
//     }
//     if (result.length === 0) {
//       return res.status(400).json({ message: "no user found kindly register" })
//     }
    
//     const user = result[0]
//     const ismatch = await bcrypt.compare(password, user.password)
    
//     if (!ismatch) {
//       return res.status(401).json({ message: "wrong password" })
//     }
    
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       secret_key,
//       { expiresIn: "10h" }
//     )
    
//     res.json({ message: "login successfull", token })
//   })
// })
// //validate json token
// function validate(req, res, next) {
//   const header = req.headers["authorization"]
  
//   if (!header) {
//     return res.status(401).json({ message: "no token" })
//   }
  
//   const checkingToken = header.split(" ")[1]
  
//   if (!checkingToken) {
//     return res.status(401).json({ message: "token is not present" })
//   }
  
//   jwt.verify(checkingToken, secret_key, (err, result) => {
//     if (err) {
//       return res.status(401).json({ message: "invalid token or expired" })
//     }
//     req.user = result
//     next()
//   })
// }
// //json search quetions
// app.get("/api/quiz", validate, (req, res) => {
//   const searchingQuestions = "select * from quiz"
  
//   db.query(searchingQuestions, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "failed to fetch the quetions" })
//     }
//     res.json(result)
//   })
// })
// //json adding score
// app.post("/api/quiz/score", validate, (req, res) => {
//   const { total_quetions, score, percentage } = req.body
//   const { id, email } = req.user
//   const query = "select * from quiz_users where id=?"
  
//   db.query(query, [id], (err, result) => {
//     if (err) {
//       return res.status(401).json({ message: "error in your seaching id query" })
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: "User not found" })
//     }
    
//     const details = result[0]
//     const username = details.username
//     const scoreQuery = "insert into quiz_score(username,email,total_quetions,score,percentage) values (?,?,?,?,?)"
    
//     db.query(scoreQuery, [username, email, total_quetions, score, percentage], (err, result) => {
//       if (err) {
//         return res.status(400).json({ message: "error in your inserting score query" })
//       }
//       return res.status(201).json({ message: "Score successfully added" })
//     })
//   })
// })
//  //validating the auth token
// const validateAuth0Token = auth({
//     audience:'https://quiz-api.local',
//     issuerBaseURL: 'https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/',
//     tokenSigningAlg: 'RS256',
//   })
// //fetching the quetions for auth based login
// app.get("/api/quiz/auth", validateAuth0Token, (req, res) => {
//   console.log(req.auth)
//   const searchingQuestions = "select * from quiz"
  
//   db.query(searchingQuestions, (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "failed to fetch the quetions" })
//     }
//     res.json(result)
//   })
// })
// // posting auth user scores in the database
// app.post("/api/quiz/score/auth", validateAuth0Token, async(req, res) => {
//   const authheader = req.headers["authorization"]
//   const checkingAuthToken=authheader.split(" ")[1]
//   if (!checkingAuthToken){
//     return res.status(400).json({message:"token not present for auth login"})
//   }
//   // fetching the id token 
//   const idToken= await fetch("https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/userinfo",{
//     headers:{"Authorization":`Bearer ${checkingAuthToken}`}
//   })
//   if (!idToken.ok){
//     return res.status(401).json({message:"id token didnot found"})
//   }
//   const getIdToken= await idToken.json()
//   const{total_quetions,score,percentage}=req.body
//   const {name,email}=getIdToken

  
//   const scoreQuery = "insert into quiz_score(username,email,total_quetions,score,percentage) values (?,?,?,?,?)"
  
//   db.query(scoreQuery, [name, email, total_quetions, score, percentage], (err, result) => {
//     if (err) {
//       return res.status(400).json({ message: "Error inserting score" })
//     }
//     return res.status(201).json({ message: "Score successfully added" })
//   })
// })
// // posting the auth user data to the database
// app.post("/auth/users",validateAuth0Token,async(req,res)=>{

//   const authHeader= req.headers["authorization"]
//   const AccesToken= authHeader.split(" ")[1]

//   if(!AccesToken){
//     return res.status(400).json({message:"no access token is present"})
//   }
//   const idFetch= await fetch("https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/userinfo",{
//     headers:{"Authorization":`Bearer ${AccesToken}`} 
//   })
//   if(!idFetch.ok){
//     return res.status(401).json({message:"no id token is present"})
//   }
//   const userinfo= await idFetch.json()
//   const{sub,name,email}=userinfo
//   const searchauthId="select * from quiz_auth_users where auth_id=?"
//   db.query(searchauthId,[sub],(err,result)=>{
//     if (err){
//       return res.status(500).json({message:"wrong sql query for searching auth users"})
//     }
//     if(result.length>0){
//       return res.status(200).json({message:"auth user already exits"})
//     }
//     const authInsetingUser="insert into quiz_auth_users(auth_id,username,email) values (?,?,?)"
//     db.query(authInsetingUser,[sub,name,email],(err,result)=>{
//       if (err){
//         return res.status(500).json({message:"auth inserting query error"})
//       }
//       if (result){
//         return res.status(201).json({message:"successfully inserted the auth user in database"})
//       }
//     })
//   })


// })


app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})