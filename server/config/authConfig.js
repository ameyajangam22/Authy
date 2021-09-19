const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/users");
const dotenv = require("dotenv");
const authControllers = require("../controllers/authControllers");
dotenv.config();
module.exports = (passport) => {
	passport.serializeUser(function (user, cb) {
		cb(null, user);
	});

	passport.deserializeUser(function (user, cb) {
		cb(null, user);
	});

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_SECRET_ID,
				callbackURL: "http://localhost:8000/google/callback",
			},
			authControllers.checkForGoogleAccount
		)
	);
};
