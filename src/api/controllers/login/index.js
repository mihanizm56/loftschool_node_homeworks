const { addUserInDb } = require("../../services/modules/auth");
const { createTokenPair } = require("../../services/modules/tokens");

/// add the new user to db
module.exports.loginUserController = (req, res) => {
	const newUser = req.body;
	const { user, password, login } = newUser;
	console.log("check data of user", newUser);

	if (!login || !password || !user) {
		console.log("not full user data");
		return res.status(403).send({ error: { message: "enter the correct user data" } });
	}

	addUserInDb(newUser).save((error, data) => {
		if (error) {
			console.log("USER SAVE ERROR", error);

			if (error.code === 11000) {
				return res.status(403).send({ error: { message: "user is not new" } });
			}

			return res.status(500).send({ error: { message: "internal db error", error } });
		}

		const { access_token, refresh_token } = createTokenPair(login);
		console.log("user added ", newUser);

		return res.status(200).send({ access_token, refresh_token });
	});
};
