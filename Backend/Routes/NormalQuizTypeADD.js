const express = require("express");
const router = express.Router();
const { updateQuizType } = require("../Controller/AddNormalLoginQuizType");
const { verifyToken } = require("../MiddleWare/NormalToken"); // or Auth0 middleware

// PUT /api/update/quiz_type
router.put("/update/quiz_type", verifyToken, updateQuizType);

module.exports = router;