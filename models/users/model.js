const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false,
    unique: false
  },
  secondname: {
    type: String,
    required: false,
    unique: false
  },
  lastname: {
    type: String,
    required: false,
    unique: false
  },
  password: {
    type: String,
    required: true,
    unique: false
  }
});

mongoose.model("User", usersSchema, "Users");
