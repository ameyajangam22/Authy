const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
		new GoogleStrategy(
			{
				clientID:
					"756369097603-1so9g1k5bls1eeumbp9lt2ptmbhpoko6.apps.googleusercontent.com",
				clientSecret: "JGVTvdzJxlofoVRvAXMGlUmd",
				callbackURL: "http://localhost:8000/google/callback",
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
