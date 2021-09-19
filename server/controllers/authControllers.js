const User = require("../models/users");

exports.checkForGoogleAccount = (accessToken, refreshToken, profile, cb) => {
	/*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */

	User.findOne({
		where: {
			providerId: profile.id,
		},
	})
		.then(async (result) => {
			console.log("SEQUELIZE RES", result);
			if (result && !result.isNewRecord) {
				console.log("This is an existing user via Google");

				cb(null, result.dataValues);
			} else {
				const newUser = await User.create({
					userName: profile.displayName,
					email: profile.emails[0].value,
					providerId: profile.id,
				});
				console.log("This is a new user via Google");
				cb(null, newUser);
			}
		})
		.catch((err) => {
			throw err;
		});
};
exports.checkForFacebookAccount = (accessToken, refreshToken, profile, cb) => {
	User.findOne({
		where: {
			providerId: profile.id,
		},
	})
		.then(async (result) => {
			console.log("SEQUELIZE RES", result);
			if (result && !result.isNewRecord) {
				console.log("This is an existing user via Fb");
				cb(null, result.dataValues);
			} else {
				const newUser = await User.create({
					userName: profile.displayName,
					email: profile.emails[0].value,
					providerId: profile.id,
				});
				console.log("This is a new user via Facebook");
				cb(null, newUser);
			}
		})
		.catch((err) => {
			throw err;
		});
};
