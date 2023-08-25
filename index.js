const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();
const methodOverride = require("method-override");

const app = express();
// middleware
app.use(express.json());

const cors = require("cors");


// parse application/x-www-form-urlencoded for picking data or params in post request of forms
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))



// decleared routes
const HomeRoute = require('./routes/home');
const SignupRoute = require('./routes/signup');
const LoginRoute = require('./routes/login');


//
app.use(cors());
app.use('/', HomeRoute);
app.use("/signup", SignupRoute);
app.use("/login", LoginRoute);



// Mongodb connection
require("./config/database");

// listen to ports
const PORT = process.env.PORT || 3000;

// checking the port
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});