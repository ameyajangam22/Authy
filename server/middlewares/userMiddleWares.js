const Relation = require("../models/relations");
exports.isUserAdmin = async (req, res, next) => {
	const yourId = req.body.yourId;
	console.log("LAROI", yourId);
	const orgId = req.params.orgId;
	const check = await Relation.findOne({
		where: {
			user_id: yourId,
			org_id: orgId,
		},
	});
	console.log("yourId", yourId);
	console.log("orgId", orgId);
	console.log("CCHECK", check);

	if (check.isAdmin) next();
	else {
		console.log("Tu idhar kyu nahi hai");
		res.status(401).json({ message: "Not Authorised" });
	}
};
