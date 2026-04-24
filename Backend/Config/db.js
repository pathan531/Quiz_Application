const { Sequelize } = require('sequelize');
const sequelize=new Sequelize("quiz","root","tiger",{host:"localhost",dialect:"mysql"})
const connectDB=async()=>{
    try{
        await sequelize.authenticate()
        console.log("db connected successfully")

    }
    catch(err){
        console.error("not connected to db",err)
    }
    
}
connectDB()
module.exports =sequelize