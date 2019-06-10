const jwt = require("jsonwebtoken");
const { checkUsedRefreshTokens, saveExpiredToken, createTokenPair } = require("../../services/modules/tokens");
const jwt_secret_key = process.env.JWT_SECRET;

// validates the refresh token and gives a new pair
module.exports.refreshController = (req, res) => {
	jwt.verify(req.token, jwt_secret_key, (error, userData) => {
		if (error || !userData) {
			console.log("get an error ", error);
			return res.status(403).send({ error: { message: "bad request", error } });
		}

		checkUsedRefreshTokens(req.token).exec((error, data) => {
			if (error) {
				console.log("check err", error);
				return res.status(403).send({ error: { message: "bad request", error } });
			}

			if (!data && req.token) {
				const { access_token, refresh_token } = createTokenPair(userData.login);

				saveExpiredToken(req.token).save((error, data) => {
					if (error) {
						console.log("check err", error);
						return res.status(500).send({ error: { message: "internal db error", error } });
					}

					console.log("refresh_token is valid, tokens were sent ", userData);
					res.status(200).send({ access_token, refresh_token });
				});

				return;
			}

			console.log("refresh token was used");
			return res.status(403).send({ error: { message: "not authorized, refresh_token is not valid" } });
		});
	});
};
