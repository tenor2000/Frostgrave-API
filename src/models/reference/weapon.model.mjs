import mongoose from "mongoose";

const weaponSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  damageMod: {
    type: Number,
    default: 0,
    required: true,
  },
  maxRange: {
    type: String,
    default: "--",
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  source: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Weapon", weaponSchema);
