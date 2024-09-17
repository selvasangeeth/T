const expressAsyncHandler = require("express-async-handler");
const tasksc = require("../model/TaskCompletion");

const getTaskCompletion = expressAsyncHandler(async (req, res) => {
  const { task, UserName } = req.body;
  const userFind = await tasksc.findOne({ UserName });

  if (!userFind) {
    const newTask = {
      data: {
        inputTasks: task,
      },
    };

    const creation = await tasksc.create({ UserName: UserName, task: newTask });

    if (creation) {
      return res.status(201).json({ msg: "Task completed successfully" });
    } else {
      res.status(400).json({ message: "Error completing task" });
      return res.status(400).json({ message: "Error completing task" });
    }
  } else {
    // User found, check if the task already exists
    const taskExists = userFind.task.some((t) => t.data.inputTasks === task);

    if (taskExists) {
      return res
        .status(201)
        .json({ message: "Task is already marked as completed" });
    }
  }
  const newTask = {
    data: {
      inputTasks: task,
    },
  };
  try {
    await tasksc.updateOne({ UserName }, { $push: { task: newTask } });

    res.status(200).json({ msg: "Task completed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error in adding task" });
  }
});

const getCompletedTasks = expressAsyncHandler(async (req, res) => {
  const { UserName } = req.query;
  // console.log(UserName);
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
    res.status(200).json(user.task);
  }
});

module.exports = { getTaskCompletion, getCompletedTasks, getremovedTask };
