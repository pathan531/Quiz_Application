const {user} = require("../Model/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
secrect_key="mohammed9010"
const checkLogin=async(req,res)=>{
    try{
        const{email,password}=req.body
        const emailSearch= await user.findOne({where:{email} })
      
        
        if(!emailSearch){
            return res.status(400).json({message:"user not existed kindly register"})
        }
        const uniqueUser=emailSearch
        const comparition= await bcrypt.compare(password,uniqueUser.password)
        if (!comparition){
            return res.status(401).json({message:"password mismatach"})
        }
        const token=jwt.sign(
            {id:emailSearch.id,email:emailSearch.email,name:uniqueUser.name},
            secrect_key,
            {expiresIn:"10h"}
        )
        return res.status(200).json({message:"login successfull",token,role:uniqueUser.role})

    }
    catch(err){
        console.log("failed to login",err)
    }

}
module.exports={checkLogin}