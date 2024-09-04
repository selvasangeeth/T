const userDetails = require("../model/userSchema");

const getUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = userDetails.findOne(userName);
  console.log(userName);
  if (user) {
    return res.status(200).json({ msg: "User alreadyfound" });
  } else {
    const cre = userDetails.create(req.body);
    return res
      .status(201)
      .json({ msg: "User created successfully", data: cre });
  }
};

module.exports = { getUser };
