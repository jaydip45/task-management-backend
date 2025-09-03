// app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db");

const taskRoutes = require("./routes/taskRoutes");
// const userRoutes = require("./routes/userRoutes"); // optional if you want user CRUD

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
// app.use("/api/users", userRoutes); // optional

app.get("/", (req, res) => {
  res.send("✅ Task Management Backend Running");
});

module.exports = app;
