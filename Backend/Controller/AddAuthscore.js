const {scores} =require("../Model/Scores")
const {user} =require("../Model/User")
const jwt = require("jsonwebtoken");
const authScore = async (req, res) => {
    try {
        const authheader = req.headers["authorization"];
        if (!authheader) {
            return res.status(400).json({ message: "Authorization header missing" });
        }

        const checkingAuthToken = authheader.split(" ")[1];
        if (!checkingAuthToken) {
            return res.status(400).json({ message: "Token not present" });
        }

        // Decode the JWT token
        const decoded = jwt.decode(checkingAuthToken);

        let email, name;

        if (!decoded || !decoded.email) {
            // If token doesn’t have email, fetch from Auth0 userinfo
            const response = await fetch("https://dev-4qvcpdg6vfkv0i6p.us.auth0.com/userinfo", {
                headers: { "Authorization": `Bearer ${checkingAuthToken}` }
            });

            if (!response.ok) {
                return res.status(401).json({ message: "Failed to fetch user info" });
            }

            const userInfo = await response.json();
            email = userInfo.email;
            name = userInfo.name || userInfo.nickname || "Unknown"; // pick a field that represents username
        } else {
            email = decoded.email;
            name = decoded.name || "Unknown"; // use name from JWT if present
        }

        const { total_questions, score, percentage,quizType } = req.body;

        // Check if user exists
        const searchId = await user.findOne({ where: { email } });
        if (!searchId) {
            return res.status(400).json({ message: "User not found. Please register first." });
        }

        // Insert the score including username
        const insertScore = await scores.create({
            userid: searchId.id,
            username: name,           // <-- added username here
            email: searchId.email,
            total_questions: total_questions,
            score: score,
            percentage: percentage,
            quiz_type:quizType
        });

        return res.status(200).json({ message: "Score inserted successfully" });

    } catch (err) {
        console.error("AuthScore error:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
module.exports={authScore}