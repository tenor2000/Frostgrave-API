import mongoose from "mongoose";

const soldierSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Standard", "Specialist"],
      required: true,
      default: "Standard",
    },
    source: {
      type: String,
      required: true,
      default: "core",
    },
    soldier_id: {
      type: Number,
      ref: "Follower",
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
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Soldier", soldierSchema);
