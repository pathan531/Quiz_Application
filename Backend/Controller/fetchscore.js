const { scores } = require("../Model/Scores");

const AddingScore = async (req, res) => {
  try {
    const { email,quiz_type} = req.body;

    if (!email || !quiz_type ) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find all scores for this email
    const userScores = await scores.findAll({
        where: { email,quiz_type },
        order: [["id", "DESC"]]
      });

    if (userScores.length > 0) {
      return res.status(200).json(userScores); // Return all found scores
    } else {
      return res.status(404).json({ message: "No records found for this email" });
    }
  } catch (error) {
    console.error("Error fetching scores:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { AddingScore };
