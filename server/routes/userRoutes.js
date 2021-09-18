const express = require("express");
const router = express.Router();
const Organisation = require("../models/organisations");
const Relation = require("../models/relations");
router.get("/me", (req, res) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.json({});
	}
});
router.post("/addOrganisation/:id", async (req, res) => {
	const id = req.params.id;
	const orgName = req.body.orgName;
	const orgInfo = req.body.orgInfo;

	/* create organisation in organisation table and create relation between
	 organisation and user in relations table*/
	const newOrganisation = await Organisation.create({
		orgName: orgName,
		orgInfo: orgInfo,
	});
	const orgId = newOrganisation.id;
	const newRelation = await Relation.create({
		user_id: id,
		org_id: orgId,
		isAdmin: true,
	});
	res.send("ok");
});
router.get("/getOrganisations/:id", async (req, res) => {
	const id = req.params.id;
	let organisations = await Organisation.findAll({
		include: [
			{
				model: Relation,
				where: {
					user_id: id,
				},
				attributes: ["isAdmin", "createdAt"],
			},
		],
	});
	res.json(organisations);
});

module.exports = router;
