// import des variables d'environnement (le lien de la db par exemple)
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// connexion à la base de données
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json({ limit: "50mb" }));

// authorisation d'utilisation de l'API
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE",
	);

	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,Content-Type, Authorization",
	);
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

// emplacement des endpoint de l'api
const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.listen(3000, () => console.log("server started"));
