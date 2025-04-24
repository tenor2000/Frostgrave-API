import mongoose from "mongoose";

const creatureSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  class: { type: String, required: true },
  type: { type: String, required: true },
  move: { type: Number, required: true },
  fight: { type: Number, required: true },
  shoot: { type: Number, required: true },
  armor: { type: Number, required: true },
  will: { type: Number, required: true },
  health: { type: Number, required: true },
  notes: { type: String, required: true },
  source: { type: String, required: true },
});

export default mongoose.model("Creature", creatureSchema);
