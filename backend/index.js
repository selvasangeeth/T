const express = require("express");
const app = express();
const mongoose = require("mongoose");
const condb = require("../backend/Database/data");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorhandler = require("./middleware/errorhandler");
require('dotenv').config();


app.use(cors({
  origin: process.env.ORIGIN_URL || '*',
  methods : "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  credentials: true,
  allowedHeaders:'Origin,X-Requested-With,Content-Type,Accept,Authorization'

}));  // to use cors middleware
app.use(express.json()); //To hava json data
app.use(cookieParser());
app.use("/", require("./Routes/UserLogin")); // for all routes
condb(); // database connection
app.use(errorhandler); // error handler



app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
