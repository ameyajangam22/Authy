const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/users");
const dotenv = require("dotenv");
dotenv.config();
const authControllers = require("../controllers/authControllers");
module.exports = (passport) => {
	passport.serializeUser(function (user, cb) {
		cb(null, user);
	});

	passport.deserializeUser(function (user, cb) {
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
			authControllers.checkForFacebookAccount
		)
	);
};
