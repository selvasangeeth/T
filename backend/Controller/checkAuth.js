const jwt = require("jsonwebtoken");

const authen = (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, "hello");
      res.status(200).json({ isAuthenticated: true });
    } catch (error) {
      res.status(401).json({ isAuthenticated: false });
    }
  } else {
    console.log("Authentication failed");
    res.status(401).json({ isAuthenticated: false });
  }
};

const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out" });
};

module.exports = { authen,logout };
