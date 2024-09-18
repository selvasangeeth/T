const userDetails = require("../model/userSchema");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
require('dotenv').config();

// Register User
const getRegister = asynchandler(async (req, res) => {
  const { UserName, Password } = req.body;
  const hashedPassword = await bcrypt.hash(Password, 10); // hash password
  const user = await userDetails.findOne({ UserName });
  if (user) {
    return res.status(200).json({ msg: "User already exists" });
  } else {
    const creat = await userDetails.create({
      UserName,
      Password: hashedPassword,
    });
    return res
      .status(201)
      .json({ msg: "User created successfully", data: creat });
  }
});

// Login User
const getUser = asynchandler(async (req, res) => {
  const { UserName, Password } = req.body;
  const user = await userDetails.findOne({ UserName });
  console.log(UserName, Password);
  if (!user) {
    return res.status(200).json({ msg: "User not found Please Register !!" });
  }
  const paswd = user.Password;
  const match = await bcrypt.compare(Password, paswd);
  if (!match) {
    return res.json({ msg: "Invalid Details" });
  }

  const token = jwt.sign({UserName}, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ msg: "LoginSuccess", UserName: UserName });
});




module.exports = { getUser, getRegister };
