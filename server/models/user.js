const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	rates: [
		{
			type: Object,
			required: true,
			default: {},
		},
	],
	comments: [
		{
			type: Object,
			required: true,
			default: {},
		},
	],
	watchlist: [
		{
			type: Object,
			default: {},
		},
	],
	favorites: [
		{
			type: Object,
			default: {},
		},
	],
});

module.exports = mongoose.model("User", userSchema);
