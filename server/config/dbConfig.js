const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
module.exports = new Sequelize("authy", "root", process.env.DB_PASSWORD, {
	host: "localhost",
	dialect: "mysql",
	logging: false, // translates to mysql query

	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
	dialectModule: require("mysql2"),
	define: {
		timestamps: true,
		timezone: "+05:30",
	},
	timezone: "+05:30",
});
