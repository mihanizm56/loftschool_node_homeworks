const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: false,
    unique: false
  },
  surName: {
    type: String,
    required: false,
    unique: false
  },
  middleName: {
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
