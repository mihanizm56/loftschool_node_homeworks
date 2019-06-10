const { userCollection } = require("../../services/modules/auth");
const { compareHashedPasswords, makeHashedPassword } = require("../../services/modules/passwords");
const { createTokenPair } = require("../../services/modules/tokens");

module.exports.authController = (req, res) => {
	const userData = req.body;
	const { user, password, login } = userData;

	if (!login || !password || !user) {
		console.log("not full user data");
		return res.status(403).send({ error: { message: "enter the correct user data" } });
	}

	userCollection(login).exec((error, data) => {
		if (error) {
			console.log("check err", error);
			return res.status(500).json({ error: "internal db error" });
		}

		if (data) {
			const hashedRequestPassword = makeHashedPassword(password);
			const verifyPassword = compareHashedPasswords(hashedRequestPassword, data.password);

			if (verifyPassword) {
				const { access_token, refresh_token } = createTokenPair(userData.login);
				console.log("user is valid, tokens were sent ", userData);

				return res.status(200).send({ access_token, refresh_token });
			}

			console.log("user is not authorized");
			return res.status(401).send({ error: { message: "unauthorized" } });
		}

		return res.status(401).send({ error: { message: "there is no user in db" } });
	});
};
