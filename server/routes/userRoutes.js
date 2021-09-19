const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Organisation = require("../models/organisations");
const Relation = require("../models/relations");
const UserMiddleWare = require("../middlewares/userMiddleWares");
const UserControllers = require("../controllers/userControllers");

router.get("/me", UserControllers.me);

router.post("/addOrganisation/:id", UserControllers.addOrganisation);

router.get("/getOrganisations/:id", UserControllers.getOrganisations);

router.get("/getOrganisation/:id", UserControllers.getOrganisation);

router.get("/checkIsAdmin/:userId/:orgId", UserControllers.checkIsAdmin);

router.get("/getUsers", UserControllers.getUsers);

router.post(
	"/addUser/:userId/:orgId",
	UserMiddleWare.isUserAdmin,
	UserControllers.addUser
);

router.get("/getUserList/:orgId", UserControllers.getUserList);

router.patch(
	"/makeAdmin/:userId/:orgId",
	UserMiddleWare.isUserAdmin,
	UserMiddleWare.isUserAdmin,
	UserControllers.makeAdmin
);

router.patch(
	"/removeAdmin/:userId/:orgId",
	UserMiddleWare.isUserAdmin,
	UserControllers.removeAdmin
);

router.delete(
	"/deleteUser/:userId/:orgId",
	UserMiddleWare.isUserAdmin,
	UserControllers.deleteUser
);

module.exports = router;
