const { scores } = require("../Model/Scores");

// ============================
// GET ALL SCORES
// ============================
const getAllScores = async (req, res) => {
  try {
    const all = await scores.findAll();
    res.json(all);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ============================
// SEARCH SCORES (EMAIL + QUIZ TYPE)
// ============================
const searchScores = async (req, res) => {
  const { email, quizType } = req.body;

  try {
    let result;

    // 1. If only email
    if (email && !quizType) {
      result = await scores.findAll({
        where: { email: email },
      });
    }

    // 2. If only quiz type
    else if (!email && quizType) {
      result = await scores.findAll({
        where: { quiz_type: quizType },
      });
    }

    // 3. If both email and quiz type
    else if (email && quizType) {
      result = await scores.findAll({
        where: { email: email, quiz_type: quizType },
      });
    }

    // 4. If neither — return empty
    else {
      return res.json([]);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { getAllScores, searchScores };
