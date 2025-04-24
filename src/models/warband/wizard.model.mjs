import mongoose from "mongoose";

const wizardSchema = new mongoose.Schema(
  {
    wizard_id: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    classId: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
    currentHealth: {
      type: Number,
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
    cost: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    itemSlots: {
      type: [Number],
      default: [0, 0, 0, 0, 0],
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
    gold: {
      type: Number,
      required: true,
    },
    primarySpellIds: {
      type: [Number],
      default: [],
    },
    alignedSpellIds: {
      type: [Number],
      default: [],
    },
    neutralSpellIds: {
      type: [Number],
      default: [],
    },
    opposedSpellIds: {
      type: [Number],
      default: [],
    },
    spellModifiers: {
      type: Map,
      of: Number,
      default: {},
    },
    soldiersLost: {
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      required: true,
    },
    xpSpent: {
      type: Number,
      required: true,
    },
    vaultItems: {
      type: [Number],
      default: [],
    },
    base: {
      type: Number,
      required: true,
    },
    currentScenario: {
      type: String,
      default: null,
    },
    careerHistory: {
      type: [String], // maybe array objects with timestamps and scenarios and comment data?
      default: [],
    },
    backstory: {
      type: String,
      default: null,
    },
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

// Create and export the model
export default mongoose.model("Wizard", wizardSchema);
