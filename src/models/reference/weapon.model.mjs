import mongoose from "mongoose";

const weaponSchema = new mongoose.Schema(
  {
    item_id: {
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
      type: Number,
      default: 0,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      required: true,
      default: "core",
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Weapon", weaponSchema);
