const {user} = require("../Model/User")
const bcrypt=require("bcryptjs")
//register
const addingUser=async(req,res)=>{
     try{
         const{username,email,password}=req.body
         const search=await user.findOne({where:{email}})
         if (search){
             return res.status(400).json({message:"user already existed"})
         }
          const hashedPassword=await bcrypt.hash(password,10)
          const query= await user.create({name:username,email:email,password:hashedPassword})
          return res.status(200).json({message:"user inserted succesfully"})

    }
    catch(error){
        console.error("error during insertion of user",error)
        return res.status(500).json({message:"internal server error"})
    }
    

}
module.exports = {addingUser}

