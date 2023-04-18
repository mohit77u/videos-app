const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({ _id: decoded._id }); // find the user with the token in the database
    req.userData = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication Failed"
    });
  }
};
