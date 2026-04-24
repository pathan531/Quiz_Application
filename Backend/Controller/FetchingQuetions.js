const { questions } = require("../Model/Questions");

const fetchQuestions = async (req, res) => {
    try {
        // Get quizType from query param
        const { quizType } = req.query;

        if (!quizType) {
            return res.status(400).json({ message: "quizType is required" })
        }

        // Fetch questions filtered by quizType
        const search = await questions.findAll({
            where: { quiz_type: quizType } // assuming column name is quiz_type
        });

        if (!search || search.length === 0) {
            return res.status(404).json({ message: "No questions found for this quiz type" });
        }

        return res.json(search);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error while fetching questions" });
    }
};

module.exports = { fetchQuestions };
