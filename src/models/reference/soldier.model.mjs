import mongoose from "mongoose";

const soldierSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Standard", "Specialist"],
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  move: {
    type: Number,
    required: true,
  },
  fight: {
    type: Number,
    required: true,
  },
  shoot: {
    type: Number,
    required: true,
  },
  armor: {
    type: Number,
    required: true,
  },
  will: {
    type: Number,
    required: true,
  },
  health: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  permItemSlots: {
    type: [Number],
    default: [],
  },
  notes: {
    type: String,
    default: null,
  },
});

export default mongoose.model("Soldier", soldierSchema);
