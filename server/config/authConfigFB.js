const FacebookStrategy = require("passport-facebook").Strategy;
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
				clientID: "231878395575706",
				clientSecret: "72ceb7fa2b3ec6df7ae1881fe1b864e6",
				callbackURL: "http://localhost:8000/facebook/callback",
			},
			function (accessToken, refreshToken, profile, cb) {
				/*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */

				console.log("This is your profile", profile);
				cb(null, profile);
			}
		)
	);
};
