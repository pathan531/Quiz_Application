const {user} = require("./User");
const {scores} = require("./Scores");

// ✅ Define relationships here (after both models are loaded)
user.hasMany(scores, { foreignKey: "userid" });
scores.belongsTo(user, { foreignKey: "userid" });

module.exports = { user, scores };
