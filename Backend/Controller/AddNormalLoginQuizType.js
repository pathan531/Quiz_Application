const { user } = require("../Model/User");
// Update quiz type for logged-in user
const updateQuizType = async (req, res) => {
    try {
        const { quiz_type } = req.body;
        const { email } = req.user; // from token middleware

        if (!quiz_type) {
            return res.status(400).json({ message: "Quiz type is required" });
        }

        const updated = await user.update(
            { quiz_type: quiz_type },
            { where: { email } }
        );

        if (updated[0] === 0) {
            return res.status(404).json({ message: "User not found or quiz type not updated" });
        }

        return res.status(200).json({ message: "Quiz type updated successfully" });
    } catch (err) {
        console.error("Error updating quiz type:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { updateQuizType };
