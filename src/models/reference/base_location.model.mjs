import mongoose from "mongoose";

const baseLocationSchema = new mongoose.Schema(
  {
    location_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    effects: { type: String, required: true },
    source: { type: String, required: true, default: "core" },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("BaseLocation", baseLocationSchema);
