const express = require("express");
const app = express();
var cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
// connect db here

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(
	cookieSession({
		name: "authy-session",
		keys: ["key1", "key2"],
	})
);

// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// AUTH CONFIGS
require("./config/authConfig")(passport);
require("./config/authConfigFB")(passport);
// GOOGLE AND FB ROUTES
app.use(authRoutes);
app.listen(8000, () => {
	console.log("Server up and running");
});
