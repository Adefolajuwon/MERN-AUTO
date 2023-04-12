const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("User", userSchema);
