const Sequelize = require("sequelize");
const db = require("../config/dbConfig");

const organisation = {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	orgName: {
		type: Sequelize.STRING(200),
	},
	orgInfo: {
		type: Sequelize.STRING(300),
	},
};

module.exports = db.define("organisation", organisation);
