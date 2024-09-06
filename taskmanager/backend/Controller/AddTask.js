const usersc = require("../model/userSchema");
const expressAsyncHandler = require("express-async-handler");

//update task to user
const getAddTask = expressAsyncHandler(async(req,res)=>{
  const {UserName,tasks} = req.body;
  const userfind  =await usersc.findOne({UserName});
  if(!userfind){
    res.status(201).json("User not found");
  }
  if(typeof userfind.tasks == "string"){
    userfind.tasks = [userfind.tasks];
  }
  if(!Array.isArray(userfind.tasks)){
   userfind.tasks= [];
  }
  if(userfind.tasks.contains(tasks))
  try{
    await usersc.updateOne({
      UserName
    },
    {$push:{tasks:{$each:tasks}}}
  )
  const updatedUser = await usersc.findOne({UserName});
  res.status(200),json({msg:
  "Task Added Successfully",updatedUser});
  }
  catch(err){
    res.status(500).json({msg:"Error in adding Task",error:err.message})
  }

})


//fetch and show all data 
const getTasks = expressAsyncHandler(async (req, res) => {
  const { UserName } = req.query;
  const user = await usersc.findOne({ UserName: UserName });
  if (!user) {
    return res.status(201).json({ message: "User not found" });
  } else {
    res.status(200).json(user);
  }
});

module.exports = { getAddTask, getTasks };
