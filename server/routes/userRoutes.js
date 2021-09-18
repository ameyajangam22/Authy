const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.json({});
	}
});

module.exports = router;
