const expressAsyncHandler = require("express-async-handler");
const tasksc = require("../model/TaskCompletion");

const getTaskCompletion = expressAsyncHandler(async (req, res) => {
  const { UserName, task } = req.body;
  const user = await tasksc.findOne({ UserName: UserName });
  if (user.task.includes(task)) {
    return res.status(200).json({ message: "Task already completed" });
  } else if (user) {
    const add = user.task.push(task);
    await user.save();
    if (add) {
      res
        .status(200)
        .json({ message: "Task completed successfully", data: add });
    } else {
      res.status(200).json({ message: "Error completing task" });
    }
  } else {
    const creation = await tasksc.create({ UserName, task });
    if (creation) {
      res
        .status(201)
        .json({ message: "Task completed successfully", data: creation });
    } else {
      res.status(400).json({ message: "Error completing task" });
    }
  }
});

const getCompletedTasks = expressAsyncHandler(async (req, res) => {
  const { UserName } = req.query;
  console.log(UserName);
  const user = await tasksc.findOne({ UserName: UserName });
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    res.status(200).json(user.task);
  }
});

const getremovedTask = expressAsyncHandler(async (req, res) => {
  const { UserName, index } = req.body;
  const user = await tasksc.findOne({ UserName: UserName });
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    user.task.splice(index, 1);
    await user.save();
    res.status(200).json(user.tasks);
  }
});

module.exports = { getTaskCompletion, getCompletedTasks, getremovedTask };
