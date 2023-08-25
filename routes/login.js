const LoginRoute = require("express").Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt");


LoginRoute.post("/", async (request, response)=> {
   try {
			const user = await User.findOne({ email: request.body.email });

			if (!user) {
         console.log(response);
				return response.status(401).json({ error: "No user with this email" });
			}

			const validPassword = await bcrypt.compare(
				request.body.password,
				user.password
			);

			if (!validPassword) {
				return response.status(402).send({ error: "Invalid password try again" });
			}

			console.log("Login Successful");
			return response.status(200).send({ message: "Login Successful" });
		} catch (error) {
			if (error) {
				return response.status(500).send({ error: "Internal Server Error" });
			}
			console.log(error);
		}
})


module.exports = LoginRoute;