const express = require("express");
const {
  createTask,
  reassignTask,
  updateStatus,
  addComment,
  getAllTasks
} = require("../controllers/taskController");
const { attachUser, checkRole } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(attachUser);

router.post("/create", checkRole(["Manager"]), createTask);
router.put("/reassign", checkRole(["TeamLead"]), reassignTask);
router.put("/status", checkRole(["TeamLead", "Manager"]), updateStatus);
router.post("/comment", checkRole(["Developer"]), addComment);
router.get("/all", getAllTasks);

module.exports = router;
