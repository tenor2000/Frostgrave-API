import mongoose from "mongoose";

const baseResourceSchema = new mongoose.Schema(
  {
    resource_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    effects: { type: String, required: true },
    cost: { type: Number, required: true },
    source: { type: String, required: true, default: "core" },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("BaseUpgrade", baseResourceSchema);
