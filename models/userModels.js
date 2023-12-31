const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

const User = mongoose.model("Users", userSchema);
module.exports = User;