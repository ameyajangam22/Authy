const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Organisation = require("../models/organisations");
const Relation = require("../models/relations");
const { route } = require("./authRoutes");
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
router.get("/getOrganisation/:id", async (req, res) => {
	const id = req.params.id;
	let organisation = await Organisation.findOne({
		include: [
			{
				model: Relation,
				where: {
					org_id: id,
				},
				attributes: ["isAdmin", "user_id"],
			},
		],
	});
	res.json(organisation);
});
router.get("/checkIsAdmin/:userId/:orgId", async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;

	let isAdmin = await Relation.findOne({
		where: { user_id: userId, org_id: orgId },
		attributes: ["isAdmin"],
	});
	res.json(isAdmin);
});
router.get("/getUsers", async (req, res) => {
	let users = await User.findAll({
		attributes: ["id", "userName", "email"],
	});
	res.json(users);
});
router.post("/addUser/:userId/:orgId", async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;

	const newRelation = await Relation.create({
		user_id: userId,
		org_id: orgId,
		isAdmin: false,
	});
	res.json(newRelation);
});
router.get("/getUserList/:orgId", async (req, res) => {
	const orgId = req.params.orgId;
	const userList = await User.findAll({
		include: [
			{
				model: Relation,
				where: {
					org_id: orgId,
				},
				attributes: ["isAdmin"],
			},
		],
		attributes: ["userName"],
	});
	res.json(userList);
});
module.exports = router;
