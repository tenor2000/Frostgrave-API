import mongoose from "mongoose";

const armorSchema = new mongoose.Schema({
  id: {
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
  notes: {
    type: String,
    default: "--",
  },
  source: {
    type: String,
    required: true,
  },
});

export default mongoose.model("armor", armorSchema);
