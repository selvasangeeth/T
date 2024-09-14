const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  tasks: [
    {
      data: {
        inputTasks: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    },
  ],
});

const userDetails = mongoose.model("User", userSchema);
module.exports = userDetails;
