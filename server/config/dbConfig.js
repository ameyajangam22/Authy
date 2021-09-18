const Sequelize = require("sequelize");

module.exports = new Sequelize("authy", "root", "Ameya@2001", {
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
