const{scores}=require("../Model/Scores")
const {user} =require("../Model/User")
const addScore=async(req,res)=>{
    const {total_questions,score,percentage,quizType}=req.body
    const {id,email,name}=req.user
    const searchId=await user.findOne({where:{email}})
    if(!searchId){
        return res.status(400).json({message:"user email not found in the users table"})
    }
    const insertScore= await scores.create({
        userid:searchId.id,
        username:name,
        email:searchId.email,
        total_questions:total_questions,
        score:score,
        percentage:percentage,
        quiz_type:quizType
        
    })
    if (insertScore){
        return res.status(200).json({messaage:" score inserted suceesfully"})
    }else{
        return res.status(401).json({messaage:"failed to insert the user"})
    }
}
module.exports={addScore}