const express = require("express");
const app = express();
const mongoose = require("mongoose");
const condb = require("../backend/Database/data");
const cors = require("cors");
const errorhandler = require("./middleware/errorhandler");

app.use(cors()); // to use cors middleware
app.use(express.json()); //To hava json data
app.use("/", require("./Routes/UserLogin")); // login routes
condb(); // database connection
app.use(errorhandler); // error handler



app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
