const { mongoose } = require("mongoose");
const TaskCompletion = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },

  task: [
    {
      data:{
        inputTasks:{
          type: String,
          
        },
       date:{
        type: Date,
        default: Date.now,  // set default date to current date
      
       }
      }
    },
  ],
});

module.exports = mongoose.model("TaskCompletion", TaskCompletion);
