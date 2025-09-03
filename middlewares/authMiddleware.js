// middlewares/authMiddleware.js
const User = require("../models/User");

const attachUser = async (req, res, next) => {
  try {
    const userId = req.header("x-user-id");
    if (!userId) {
      return res.status(401).json({ message: "User ID missing in headers" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { attachUser, checkRole };
