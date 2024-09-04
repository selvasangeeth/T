const express = require('express');
const app = express();
const mongoose = require('mongoose');
const condb = require("../backend/Database/data");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/",require("./Routes/UserLogin"));
condb();

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})