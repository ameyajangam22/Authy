const express = require("express");
const app = express();
var cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const Organisation = require("./models/organisations");
const User = require("./models/users");
const Relations = require("./models/relations");
const authRoutes = require("./routes/authRoutes");
// connect db here
const db = require("./config/dbConfig");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
//db connections
db.authenticate().then(async () => {
	await db.sync();
});

// Foreign keys of DB
User.hasMany(Relations, { onDelete: "cascade", foreignKey: "user_id" });
Organisation.hasMany(Relations, { onDelete: "cascade", foreignKey: "org_id" });
Relations.belongsTo(User, { foreignKey: "user_id" });
Relations.belongsTo(Organisation, { foreignKey: "org_id" });
app.use(
	cookieSession({
		name: "authy-session",
		keys: ["key1", "key2"],
	})
);

// initialising session from passport
app.use(passport.initialize());
app.use(passport.session());

// AUTH CONFIGS
require("./config/authConfig")(passport);
require("./config/authConfigFB")(passport);
// GOOGLE AND FB ROUTES
app.use(authRoutes);
app.listen(8000, () => {
	console.log("Server up and running");
});
