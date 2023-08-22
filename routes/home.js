//  Require expree router
const HomeRouter = require("express").Router();

HomeRouter.get("/", (req, res) => {
	res.send("Welcome to AFRIWATCH Api");
});

//  AfriWatch Route
module.exports = HomeRouter;
