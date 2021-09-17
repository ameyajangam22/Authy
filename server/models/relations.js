const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const relation = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
};

module.exports = db.define("relation", relation);
