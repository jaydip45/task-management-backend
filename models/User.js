const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["Manager", "TeamLead", "Developer"],
    required: true
  },
});

module.exports = mongoose.model("User", userSchema);
