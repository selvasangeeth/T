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
  tasks:[{
    type:String,
    // required:true
  }],
  dated:{
    type:Date,
    default:Date.now
 }
 });

const userDetails = mongoose.model("User", userSchema);
module.exports = userDetails;
