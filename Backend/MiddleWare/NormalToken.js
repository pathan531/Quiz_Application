const jwt = require("jsonwebtoken");
const secrect_key = "mohammed9010";

const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        
        if (!header) {
            console.log("No authorization header");  // ✅ Debug log
            return res.status(401).json({ message: "No authorization header" });
        }

        const token = header.split(" ")[1];
        
        if (!token) {
            console.log("No token found in header");  // ✅ Debug log
            return res.status(401).json({ message: "JWT token not present" });
        }

        console.log("Token received:", token);  // ✅ Debug log

        jwt.verify(token, secrect_key, (err, result) => {
            if (err) {
                console.log("JWT verification failed:", err.message);  // ✅ Debug log
                return res.status(401).json({ 
                    message: "JWT verification failed", 
                    error: err.message 
                });
            }
            
            console.log("JWT verified successfully:", result);  // ✅ Debug log
            req.user = result;
            next();
        });
    } catch (error) {
        console.error("Error in verifyToken:", error);  // ✅ Debug log
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { verifyToken };