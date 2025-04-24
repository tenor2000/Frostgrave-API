import mongoose from "mongoose";

const armorSchema = new mongoose.Schema(
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
    armorMod: {
      type: Number,
      required: true,
    },
    moveMod: {
      type: Number,
      default: 0,
      required: true,
    },
    notes: {
      type: String,
      default: "--",
    },
    source: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("armor", armorSchema);
