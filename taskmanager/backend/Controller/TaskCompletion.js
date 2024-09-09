const expressAsyncHandler = require("express-async-handler");
const tasksc = require("../model/TaskCompletion");

const getTaskCompletion = expressAsyncHandler(async (req, res) => {
  const { UserName, task } = req.body;
  console.log(req.body);
  const user = await tasksc.findOne({ UserName: UserName });
  if (user) {
    const tasksSet = new Set(user.task);

    if (tasksSet.has(task)) {
      return res.status(200).json({ message: "Task already completed" });
    } else {
      tasksSet.add(task); // Add the new task to the Set
      user.task = [...tasksSet]; // Convert Set back to an array
      await user.save();
      return res  
        .status(200)
        .json({ message: "Task completed successfully", data: user.task });
    }
  } else {
    const creation = await tasksc.create({ UserName: UserName, task: [task] });
    if (creation) {
      return res
        .status(201)
        .json({ message: "Task completed successfully", data: creation });
    } else {
      return res.status(400).json({ message: "Error completing task" });
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
