const userSchema = require("../schemas/user.schema");

async function storeGoogleUser(user) {
	try {
		let { email, provider } = user;
		// Check if the user already exists
		let response = await userSchema.findOne({ email });
		if (!response) {
			response = await userSchema.create(user);
		} else {
			response = await userSchema.updateOne({ email }, user);
		}
		return user;
	} catch (e) {
		return { error: "An error occurred" };
	}
}

async function insertNewUser(user) {
	try {
		let { email } = user;
		// Check if the user already exists
		let response = await userSchema.findOne({ email });
		if (response) {
			return { error: "User already exists" };
		}

		response = await userSchema.create(user);
		return response;
	} catch (e) {
		return { error: "An error occurred" };
	}
}

async function fetchUserByEmail(email) {
	try {
		let response = await userSchema.findOne({ email }, { __v: 0 });
		return response;
	} catch (e) {
		return { error: "An error occurred" };
	}
}

module.exports = { storeGoogleUser, insertNewUser, fetchUserByEmail };
