import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    wizard_id: {
      type: String,
      required: true,
    },
    rosterPosition: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8],
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
    class_id: {
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
      enum: [1, 2, 3],
      default: 1,
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Follower", personnelSchema);
