const express = require('express')
const cors = require('cors')
const app = express()
const sequelize=require("./Config/db")


const AuthQuestionsRoute = require("./Routes/AuthQuestions");
const AuthScoresRoute = require("./Routes/AuthScores");
const AuthUsersRoute = require("./Routes/AuthUsers");
const DisplayAllScoreRoute = require("./AdminRoutes/DisplayAllSCore");
const DisplayAuthScoresRoute = require("./Routes/DisplayAuthScores");
const DisplayScoreRoute = require("./Routes/DisplayScore");
const LoginRoute = require("./Routes/Login");
const QuestionsRoute = require("./Routes/Questions");
const UserRoute = require("./Routes/User");
const AddNormalScore=require("./Routes/Addingscore")
const AddQuestion=require("./AdminRoutes/QuestionsRoute")

const port = 5000
app.use(cors())
app.use(express.json())
app.use("/api", AuthQuestionsRoute);
app.use("/api", AuthScoresRoute);
app.use("/api", AuthUsersRoute);
app.use("/api", DisplayAllScoreRoute);
app.use("/api", DisplayAuthScoresRoute);
app.use("/api", DisplayScoreRoute);
app.use("/api", LoginRoute);
app.use("/api", QuestionsRoute);
app.use("/api", UserRoute);
app.use("/api",AddNormalScore)
app.use("/api",AddQuestion)
sequelize.sync({alter:true})
.then(()=>console.log("db sync succeesfull"))
.catch((err)=>console.log("db not sync",err))


app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})