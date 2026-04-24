const { questions } = require("../Model/Questions");

const addQuestions = async (req, res) => {
  try {
    console.log(" Received body:", req.body);  // Debug log
    
    const { question, option1, option2, option3, option4, answer, quiz_type } = req.body;

    // Validate required fields
    if (!question || !option1 || !option2 || !option3 || !option4 || !answer || !quiz_type) {
      console.log("❌ Validation failed");
      return res.status(400).json({ message: "All fields are required!" });
    }

    console.log("✅ All fields present, creating question...");
    console.log("Data to insert:", { question, option1, option2, option3, option4, answer, quiz_type });

    // Insert question
    const newQuestion = await questions.create({
      question,
      option1,
      option2,
      option3,
      option4,
      answer,
      quiz_type
    });

    console.log("✅ Question created successfully:", newQuestion.id);

    return res.status(200).json({ 
      message: "Question inserted successfully!",
      questionId: newQuestion.id 
    });

  } catch (error) {
    console.error("❌ Error inserting question:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return res.status(500).json({ 
      message: "Internal server error",
      error: error.message,  // Send error details to frontend
      errorType: error.name
    });
  }
};

module.exports = { addQuestions };