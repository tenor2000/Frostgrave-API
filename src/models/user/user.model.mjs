import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
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
    dateJoined: {
      type: Date,
      default: Date.now,
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
  },
  { timestamps: { createdAt: "created", updatedAt: "last_modified" } }
);

// Virtuals for relationships when importing specific whole warband data
userSchema.virtual("wizards", {
  ref: "Wizard",
  localField: "_id",
  foreignField: "user_id",
});

const User = mongoose.model("User", userSchema);

export default User;
