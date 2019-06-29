const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model("User", usersSchema, "Users");
