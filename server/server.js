require('dotenv').config();

let port = process.env.DB_PORT;

const express = require("express"),
cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config")

app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

// This is where we import the users routes function from our user.routes.js file
const AllMyUserRoutes = require("./routes/user.routes");
const { Mongoose } = require('mongoose');
AllMyUserRoutes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
