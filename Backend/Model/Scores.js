const {DataTypes}=require("sequelize")
const sequelize=require("../Config/db")
const scores = sequelize.define("scores", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,   // ✅ Unique ID for each score record
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false       // ✅ References user.id
    },
    username: {                 // <-- Add this field
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quiz_type: {
      type: DataTypes.STRING,
      allowNull: false
      
  }
  
  })
module.exports ={scores}