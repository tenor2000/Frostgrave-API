import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    wizard_id: {
      // This points to wizard owner
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
    soldier_id: {
      // This points to soldier stats in soldier collection
      type: Number,
      required: true,
    },
    itemSlots: {
      slot1: { type: Number, default: 0 },
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

followerSchema.virtual("soldier", {
  ref: "Soldier",
  localField: "soldier_id",
  foreignField: "soldier_id",
});

// This is a composite key, ensures that only 1 follower can be in each roster position per wizard
followerSchema.index({ wizard_id: 1, rosterPosition: 1 }, { unique: true });

export default mongoose.model("Follower", followerSchema);
