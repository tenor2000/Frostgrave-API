import mongoose from "mongoose";

const magicSchoolSchema = new mongoose.Schema(
  {
    school_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    nicknames: [{ type: String }],
    aligned: [{ type: Number, required: true }],
    neutral: [{ type: Number, required: true }],
    opposed: [{ type: Number, required: true }],
    description: { type: String },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("MagicSchool", magicSchoolSchema);
