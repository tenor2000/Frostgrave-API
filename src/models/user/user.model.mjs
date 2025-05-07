import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    profile: {
      bio: {
        type: String,
        default: "",
      },
      location: {
        type: String,
        default: "",
      },
      avatar: {
        type: String,
        default: "",
      },
    },
    auth: {
      salt: { type: String, required: true },
      hash: { type: String, required: true }, // encrypted password,
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "last_modified" },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals for relationships when importing specific whole warband data
userSchema.virtual("wizards", {
  ref: "Wizard",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", userSchema);

export default User;
