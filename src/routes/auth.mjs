import express from "express";
import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";
import generateAccessToken from "../utilityFuncs/generateAccessToken.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// api/auth

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  try {
    const userModel = await getModelsFromDirectory("user", "user");
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const validPassword = await bcrypt.compare(password, user.hashword);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      username: user.username,
    });
    console.log("User logged in:", user.username);

    // Refresh Tokens to be implemented later
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    // res.json({ accessToken: accessToken, refreshToken: refreshToken });

    res.json({ accessToken: accessToken });
  } catch (err) {
    console.error(`Error logging in:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

// Refresh Tokens to be implemented later

// router.route("/token").post(async (req, res) => {
//   const refreshToken = req.body.token;
//   if (refreshToken == null) return res.sendStatus(401);
//   jwt.verify(
//     refreshToken,
//     process.env.REFRESH_TOKEN_SECRET,
//     (err, user) => {
//       if (err) return res.sendStatus(403);
//       const accessToken = generateAccessToken({
//         _id: user._id.toString(),
//         username: user.username,
//       });
//       res.json({ accessToken: accessToken });
//     }
//   );
// });

router.route("/register").post(async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  try {
    const userModel = await getModelsFromDirectory("user", "user");
    const userEmailExists = await userModel.findOne({ email });
    const userNameExists = await userModel.findOne({ username });

    if (userEmailExists) {
      console.log(`Problem Email: '${email}' already in use`);
      return res.status(409).json({ error: "Email is already in use" });
    }

    if (userNameExists) {
      console.log(`Problem Username: '${username}' already registered`);
      return res.status(409).json({ error: "Username is already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      firstname,
      lastname,
      username,
      email,
      hashword: hashedPassword,
    });
    await newUser.save();
    console.log("Username registered:", username);
    res.sendStatus(201);
  } catch (err) {
    console.error(`Error registering user:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

export default router;
