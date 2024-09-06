const express = require("express");
const router = express.Router();

const { getUser, getRegister} = require("../Controller/userController");
const{getAddTask, getTasks} = require("../Controller/AddTask");

router.post("/login", getUser);
router.post("/register",getRegister);
router.post("/addtask", getAddTask);
router.get("/gettasks", getTasks);

module.exports = router;
