const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		console.log("req.user [success]", req.user);
		res.redirect("http://localhost:3000/main");
	}
);

router.get(
	"/facebook",
	passport.authenticate("facebook", { scope: ["email", "user_friends"] })
);
router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		failureRedirect: "http://localhost:3000/bad",
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		// console.log("req.user [success]", req.user);
		res.redirect("http://localhost:3000/main");
	}
);

router.get("/logout", (req, res) => {
	req.session = null;
	req.logout();
	res.redirect("http://localhost:3000");
});

module.exports = router;
