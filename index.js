const express = require('express');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(express.json());

const cors = require("cors");

// parse application/x-www-form-urlencoded for picking data or params in post request of forms
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// decleared routes
const HomeRoute = require('./routes/home');


app.get('/status', (request, response) => {
   const status = {
      'Status': 'Running'
   };
   response.send(status);
});


//
app.use('/', HomeRoute);



// Mongodb connection
require("./config/database");

// listen to ports
const PORT = process.env.PORT || 3000;

// checking the port
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});