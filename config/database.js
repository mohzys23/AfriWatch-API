const mongoose = require("mongoose");

const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("Database connected successfully");
	} catch (error) {
		console.log(error.message);
	}
};
connectToDatabase();
