const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const fs = require("fs");

const db = mongoose.connection;

const bucket = new mongoose.mongo.GridFSBucket(db, {
	bucketName: "profilePictures",
});

// Routes nécessaires:
// GET sur tout les utilisateurs
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
// GET sur un utilisateur en particulier
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

router.get("/:id/profilePic", getUser, (req, res) => {
	try {
		bucket.openDownloadStreamByName(`${res.user.username}.jpg`).pipe(res);
	} catch (err) {
		console.log(err);
		console.log("ERROR HANDLED")
		fs.createReadStream("default pfp.jpg").pipe(
			bucket.openUploadStream(`${req.body.username}.jpg`, {
				chunkSizeBytes: 1048576,
				metadata: { field: "user", value: req.body.username },
			}),
		);
	}
});

// POST
router.post("/", async (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		rates: req.body.rates,
		comments: req.body.comments,
		watchlist: req.body.watchlist,
		favorite: req.body.favorites,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}

	try {
		fs.createReadStream("default pfp.jpg").pipe(
			bucket.openUploadStream(`${req.body.username}.jpg`, {
				chunkSizeBytes: 1048576,
				metadata: { field: "user", value: req.body.username },
			}),
		);
	} catch (err) {
		console.log(err);
	}
});

// UPDATE/PATCH
router.patch("/:id", getUser, async (req, res) => {
	if (req.body.username != null) {
		res.user.username = req.body.username;
	}
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	if (req.body.rates != null) {
		res.user.rates = req.body.rates;
	}
	if (req.body.comments != null) {
		res.user.comments = req.body.comments;
	}
	if (req.body.watchlist != null) {
		res.user.watchlist = req.body.watchlist;
	}
	if (req.body.favorites != null) {
		res.user.favorites = req.body.favorites;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// DELETE
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.User.deleteOne();
		res.json({ message: "Deleted User" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// MIDDLEWARE (permet de confirmer si l'utilisateur qu'on cherche existe)
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "cannot find User" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
