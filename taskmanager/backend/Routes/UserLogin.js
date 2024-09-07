const express = require("express");
const router = express.Router();

const { getUser, getRegister} = require("../Controller/userController");
const{getAddTask, getTasks,getUpdateTask,getDeleteTask} = require("../Controller/AddTask");
const {getTaskCompletion,getCompletedTasks,getremovedTask} = require("../Controller/TaskCompletion")

router.post("/login", getUser);
router.post("/register",getRegister);
router.post("/addtask", getAddTask);
router.get("/gettasks", getTasks);
router.put("/updatetask",getUpdateTask)
router.delete("/deletetask", getDeleteTask);
router.post("/taskcompletion", getTaskCompletion);
router.get("/getcompletedtasks",getCompletedTasks);
router.delete("/deletetask2",getremovedTask);
module.exports = router;
