import mongoose from "mongoose";

const wizardSchema = new mongoose.Schema(
  {
    // wizards will be identified by their mongo id
    owner_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    wizard_class_id: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    health: {
      type: Number,
      required: true,
      default: 14,
    },
    currentHealth: {
      //this may be eliminated and only handled in front end
      type: Number,
      required: true,
    },
    move: {
      type: Number,
      required: true,
      default: 6,
    },
    fight: {
      type: Number,
      required: true,
      default: 2,
    },
    shoot: {
      type: Number,
      required: true,
      default: 0,
    },
    armor: {
      type: Number,
      required: true,
      default: 10,
    },
    will: {
      type: Number,
      required: true,
      default: 4,
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    itemSlots: {
      slot1: { type: Number, default: 0 },
      slot2: { type: Number, default: 0 },
      slot3: { type: Number, default: 0 },
      slot4: { type: Number, default: 0 },
      slot5: { type: Number, default: 0 },
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
      default: 400,
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
      // may be just a simple count of soldiers status 0 in the personeel collection
      type: Number,
      default: 0,
    },
    xp: {
      type: Number,
      required: true,
      default: 0,
    },
    xpSpent: {
      type: Number,
      required: true,
      default: 0,
    },
    vaultItems: {
      type: [Number],
      default: [],
    },
    base: {
      type: Number,
      default: null,
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

export default mongoose.model("Wizard", wizardSchema);
