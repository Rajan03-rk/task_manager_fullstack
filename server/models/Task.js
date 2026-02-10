import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    dueDate: { type: Date, default: null },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);
