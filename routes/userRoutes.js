const express = require("express");
const { addUser, getUsers, loginUser } = require("../controllers/userController");

const router = express.Router();

router.post("/register", addUser);
router.get("/", getUsers);
router.post("/login", loginUser);

module.exports = router;
