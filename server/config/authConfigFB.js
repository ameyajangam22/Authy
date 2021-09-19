const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (passport) => {
	passport.serializeUser(function (user, cb) {
		/*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
		cb(null, user);
	});

	passport.deserializeUser(function (user, cb) {
		/*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
		cb(null, user);
	});

	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_SECRET_ID,
				callbackURL: "http://localhost:8000/facebook/callback",
				profileFields: ["id", "emails", "displayName"],
			},
			function (accessToken, refreshToken, profile, cb) {
				/*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
				User.findOne({
					where: {
						providerId: profile.id,
					},
				}).then(async (result) => {
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
				});
			}
		)
	);
};
