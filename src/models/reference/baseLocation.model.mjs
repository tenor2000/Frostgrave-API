import mongoose from "mongoose";

const baseLocationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  effects: { type: String, required: true },
  source: { type: String, required: true },
});

export default mongoose.model("baseLocation", locationSchema);
