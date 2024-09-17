const usersc = require("../model/userSchema");
const expressAsyncHandler = require("express-async-handler");

//add task to user
const getAddTask = expressAsyncHandler(async (req, res) => {
  const { UserName, data } = req.body;
  const userfind = await usersc.findOne({ UserName });
  if (!userfind) {
    return res.status(201).json("User not found");
  }
  const modifiedData = [...userfind.tasks, { data }];
  try {
    await usersc.updateOne(
      {
        UserName,
      },
      { $set: { tasks: modifiedData } }
    );

    const updatedUser = await usersc.findOne({ UserName });
    res.status(200).json({ msg: "Task Added Successfully", updatedUser });

  } catch (err) {
    res.status(500).json({ msg: "Error in adding Task", error: err.message });
  }
});

//fetch and show all data
const getTasks = expressAsyncHandler(async (req, res) => {
  const { UserName } = req.query;
  const user = await usersc.findOne({ UserName: UserName });
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
    console.log(user);
  }
});

// update tasks
const getUpdateTask = expressAsyncHandler(async (req, res) => {
  const { UserName, index, data } = req.body;
  console.log("Updatedtask");
  const user = await usersc.findOne({ UserName: UserName });
  console.log(user);
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    user.tasks[index].data = { inputTasks: data.tasks, date: data.date };
    await user.save();
    res.status(200).json({ message: "Task updated successfully" });
  }
});

//delete tasks
const getDeleteTask = expressAsyncHandler(async (req, res) => {
  const { UserName, index } = req.body;
  console.log(UserName);
  console.log(index);
  const user = await usersc.findOne({ UserName: UserName });
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    user.tasks.splice(index, 1);
    await user.save();
    res.status(200).json(user.tasks);
  }
});

module.exports = { getAddTask, getTasks, getUpdateTask, getDeleteTask };
