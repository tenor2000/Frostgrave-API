import mongoose from "mongoose";

const magicSchoolSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  nicknames: [{ type: String, required: true }],
  aligned: [{ type: Number, required: true }],
  neutral: [{ type: Number, required: true }],
  opposed: [{ type: Number, required: true }],
});

export default mongoose.model("MagicSchool", wizardSchema);
