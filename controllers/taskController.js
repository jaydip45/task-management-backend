const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, assignee, priority, targetDeliveryDate } = req.body;
    const task = await Task.create({
      title,
      description,
      assignedBy: req.user._id,
      assignee,
      priority,
      targetDeliveryDate
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const reassignTask = async (req, res) => {
  try {
    const { taskId, newAssignee } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.assignee = newAssignee;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.status = status;
    if (status === "Completed") {
      task.actualDeliveryDate = new Date();
    }
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { taskId, message } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.progressComments.push({ message });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedBy", "name role")
      .populate("assignee", "name role");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTask,
  reassignTask,
  updateStatus,
  addComment,
  getAllTasks
};
