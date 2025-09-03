const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    assignedDate: { type: Date, default: Date.now },
    targetDeliveryDate: { type: Date, required: true },
    actualDeliveryDate: { type: Date },
    status: {
        type: String,
        enum: ["In Progress", "R&D Phase", "Completed", "Deadlines", "Pending"],
        default: "Pending"
    },
    progressComments: [{ message: String, date: { type: Date, default: Date.now } }],
}, { timestamps: true });

// Virtual field for timeTaken
taskSchema.virtual("timeTaken").get(function () {
    if (this.actualDeliveryDate && this.assignedDate) {
        const diff = this.actualDeliveryDate - this.assignedDate;
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days";
    }
    return null;
});

module.exports = mongoose.model("Task", taskSchema);
