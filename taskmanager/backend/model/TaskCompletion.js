const { mongoose } = require("mongoose");
const TaskCompletion = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },

  task: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("TaskCompletion", TaskCompletion);
