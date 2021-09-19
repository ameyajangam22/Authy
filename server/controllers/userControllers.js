const User = require("../models/users");
const Organisation = require("../models/organisations");
const Relation = require("../models/relations");

exports.me = (req, res) => {
	if (req.user) {
		res.json(req.user);
	} else {
		res.status(401).json({ message: "unauthorized" });
	}
};

exports.addOrganisation = async (req, res) => {
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
};
exports.getOrganisations = async (req, res) => {
	const id = req.params.id;
	try {
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
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.getOrganisation = async (req, res) => {
	const id = req.params.id;
	try {
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
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.checkIsAdmin = async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;
	try {
		let isAdmin = await Relation.findOne({
			where: { user_id: userId, org_id: orgId },
			attributes: ["isAdmin"],
		});
		res.json(isAdmin);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.getUsers = async (req, res) => {
	try {
		let users = await User.findAll({
			attributes: ["id", "userName", "email"],
		});
		res.json(users);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.addUser = async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;
	console.log("Wapas aagaya");
	try {
		const newRelation = await Relation.create({
			user_id: userId,
			org_id: orgId,
			isAdmin: false,
		});
		res.json(newRelation);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.getUserList = async (req, res) => {
	const orgId = req.params.orgId;
	try {
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
			attributes: ["userName", "id"],
		});
		res.json(userList);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.makeAdmin = async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;
	try {
		const updateRelation = await Relation.update(
			{ isAdmin: true },
			{
				where: {
					user_id: userId,
					org_id: orgId,
				},
			}
		);
		res.json(updateRelation);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.removeAdmin = async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;
	try {
		const updateRelation = await Relation.update(
			{ isAdmin: false },
			{
				where: {
					user_id: userId,
					org_id: orgId,
				},
			}
		);

		res.json(updateRelation);
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
exports.deleteUser = async (req, res) => {
	const userId = req.params.userId;
	const orgId = req.params.orgId;
	try {
		await Relation.destroy({
			where: {
				user_id: userId,
				org_id: orgId,
			},
		});
		res.json({ ok: "ok" });
	} catch (err) {
		res.json({ message: "Something went wrong" });
	}
};
