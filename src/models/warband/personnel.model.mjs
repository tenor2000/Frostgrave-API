import mongoose from "mongoose";

const personnelSchema = new mongoose.Schema(
  {
    wizard_id: {
      type: String,
      required: true,
    },
    rosterPosition: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 7, 8, 9], // 0 = Dead, 1 = Active, 2 = Badly Wounded, 7 = Hired, 8 = For Hire, 9 = Vacant
      default: 8,
    },
    classId: {
      type: Number,
      required: true,
    },
    itemSlots: {
      type: [Number],
      default: [0],
    },
    rosterState: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

const Personnel = mongoose.model("Personnel", personnelSchema);

export default Personnel;
