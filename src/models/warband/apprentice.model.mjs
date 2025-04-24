const apprenticeSchema = new mongoose.Schema(
  {
    wizard_id: {
      // This points to owner, owner can only have 1 apprentice
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      default: "apprentice",
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 7, 8, 9],
      default: 8, // 0 = Dead, 1 = Active, 2 = Badly Wounded, 7 = Hired, 8 = For Hire, 9 = Vacant
      required: true,
    },
    armor: {
      type: Number,
      required: true,
      default: 10,
    },
    itemSlots: {
      slot1: {
        type: Number,
        default: 0,
      },
      slot2: {
        type: Number,
        default: 0,
      },
      slot3: {
        type: Number,
        default: 0,
      },
      slot4: {
        type: Number,
        default: 0,
      },
    },
    cost: {
      type: Number,
      required: true,
    },
    statMods: {
      move: {
        type: Number,
        default: 0,
      },
      fight: {
        type: Number,
        default: 0,
      },
      shoot: {
        type: Number,
        default: 0,
      },
      armor: {
        type: Number,
        default: 0,
      },
      will: {
        type: Number,
        default: 0,
      },
      health: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

export default mongoose.model("Apprentice", apprenticeSchema);
