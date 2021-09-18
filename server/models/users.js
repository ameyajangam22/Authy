const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const user = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	userName: {
		type: Sequelize.STRING(200),
	},
	email: {
		type: Sequelize.STRING(200),
	},
	providerId: {
		type: Sequelize.STRING(200),
	},
};

module.exports = db.define("user", user);
