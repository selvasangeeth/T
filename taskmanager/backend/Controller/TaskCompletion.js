const expressAsyncHandler = require("express-async-handler");
const tasksc = require("../model/TaskCompletion");

const getTaskCompletion = expressAsyncHandler(async (req, res) => {
  const { task, UserName } = req.body;
  console.log("hello");
  console.log(task);
  const userFind = tasksc.findOne({ UserName });

  const formattedDate = new Date().toISOString().split("T")[0];

  if (!userFind) {
    res.status(201).json({ msg: "User not found !!" });
  }
  // const taskset = new Set(userFind.data.inputTasks);
  // if(taskset.has(task)){
  //   res.status(201).json({msg:"Task already Completed !!"});
  // }
  else {
    const newTask = {
      data: {
        inputTasks: task,
        date: formattedDate,
      },
    };
    try {
      await tasksc.updateOne({ UserName }, { $push: { task: newTask } });

      res.status(200).json({ msg: "Congrats Task completed successfully!!" });
    } catch (err) {
      res.status(500).json({ msg: "Error in adding task" });
    }
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
