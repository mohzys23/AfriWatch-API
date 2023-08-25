const SignupRouter = require("express").Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const saltRounds = 10;


SignupRouter.post("/", async (request, response) => {
	const { fullname, email, password } = request.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return response
			.status(423)
			.json({ msg: "Please enter a valid email address." });
  }
		if (!email) {
			return response
				.status(422)
				.json({ msg: "Email can not be empty, please enter a valid" });
		}
  // check if a user with same email already exist
  const existUser = await User.findOne({email: email})
  if (existUser) {
		return response.status(409).json({ msg: "A user with this email already exists" });
	}

  if (!password || password.length <= 5) {
    return response.status(400).json({ msg: "Enter a password with more than 5 characters"})
  }

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = new User({
			email: email,
			fullname: fullname,
			password: hashedPassword, // Save the hashed password
		});

		user.save((error) => {
			if (error) {
				return response
					.status(500)
					.json({ msg: "Sorry, internal server error" });
			}
			// SignupPost saved
			response.json({
				user: {
					id: user.id,
					email: user.email,
				},
				msg: "Your data has been saved!",
			});
		});
	} catch (error) {
		console.error("Error during signup:", error);
		response.status(500).json({ msg: "Error during signup" });
	}
});


module.exports = SignupRouter;