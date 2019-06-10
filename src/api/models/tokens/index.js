const mongoose = require("mongoose");

const expiredTokensSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
});

mongoose.model("ExpiredToken", expiredTokensSchema, "ExpiredTokens");
