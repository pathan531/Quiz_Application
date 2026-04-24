const {DataTypes}=require("sequelize")

const sequelize=require("../Config/db")
const questions =sequelize.define("questions",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    question:{
        type:DataTypes.STRING,
        allowNull:false
    },
    option1:{
        type: DataTypes.STRING,
        allowNull:false

    },
    option2:{
        type:DataTypes.STRING,
        allowNull:false
    },
    option3:{
        type:DataTypes.STRING,
        allowNull:false
    },
    option4:{
        type:DataTypes.STRING,
        allowNull:false
    },
    answer:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
     quiz_type: {
        type: DataTypes.STRING,
        allowNull: false
      }
})
module.exports ={questions}