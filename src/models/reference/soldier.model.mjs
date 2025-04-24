import mongoose from "mongoose";

const soldierSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["standard", "specialist"],
      required: true,
      default: "standard",
    },
    source: {
      type: String,
      required: true,
      default: "core",
    },
    soldier_id: {
      type: Number,
      required: true,
    },
    name: {
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
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Soldier", soldierSchema);
