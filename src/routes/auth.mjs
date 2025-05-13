import express from "express";
import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

const jwtExpireTime = "15m";

// api/auth

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const userModel = await getModelsFromDirectory("user", "user");
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.sendStatus(401).json({ error: "Invalid username" });
    }

    const validPassword = await bcrypt.compare(password, user.hashword);

    if (!validPassword) {
      return res.sendStatus(401).json({ error: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { _id: user._id.toString(), username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: jwtExpireTime,
      }
    );
    console.log("User logged in:", user.username);
    res.json({ accessToken: accessToken });
  } catch (err) {
    console.error(`Error logging in:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router.route("/register").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const userModel = await getModelsFromDirectory("user", "user");
    const user = await userModel.findOne({ username });

    if (user) {
      return res.sendStatus(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      email,
      hashword: hashedPassword,
    });
    await newUser.save();
    console.log("User registered:", username);
    res.sendStatus(201);
  } catch (err) {
    console.error(`Error registering user:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

export default router;
