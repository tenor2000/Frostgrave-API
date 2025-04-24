import mongoose from "mongoose";

const spellSchema = new mongoose.Schema(
  {
    spell_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    base_cast: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Spell", spellSchema);
