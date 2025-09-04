// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes"); 
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes); 

app.get("/", (req, res) => {
  res.send("Task Management Backend Running");
});

module.exports = app;
