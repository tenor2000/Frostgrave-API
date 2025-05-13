import express from "express";
import error from "./src/utilityFuncs/error.mjs";
import ejs from "ejs";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {
  seedData,
  setDataRelations,
} from "./src/utilityFuncs/seedDataFuncs.mjs";
import authenticateToken from "./src/utilityFuncs/authenticateToken.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Data retrieval for reference in views
import getModelsFromDirectory from "./src/utilityFuncs/getModelsFromDirectory.mjs";
import getRandomBackstory from "./src/utilityFuncs/getRandomBackstory.mjs";

const referenceModels = await getModelsFromDirectory("reference");
const warbandModels = await getModelsFromDirectory("warband");

// mongoose connection
// const connectDir = process.env.PROD_DATABASE;
// try {
//   mongoose.connect(process.env.ATLAS_URI + connectDir);
//   mongoose.connection.once("open", () => {
//     console.log("Successfully connected to mongoDB");
//   });
// } catch (err) {
//   console.error("Error connecting to mongoDB:", err);
// }

// new
const fullURI = process.env.ATLAS_URI + process.env.PROD_DATABASE;
mongoose
  .connect(fullURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  });

// end

import reference from "./src/routes/reference.mjs";
import users from "./src/routes/users.mjs";
import warbands from "./src/routes/warbands.mjs";
import auth from "./src/routes/auth.mjs";

// Middleware
app.use(express.static("./src/styles"));
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded());

// CORS
app.use(cors());

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View Engine
app.engine("ejs", ejs.renderFile);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/api/reference", reference);
app.use("/api/warbands", warbands);
app.use("/api/users", authenticateToken, users);
app.use("/api/auth", auth);

// Routes
app.get("/", (req, res, next) => {
  const data = {
    contentEJS: "home",
  };
  res.render("index", data);
});

app.get("/create", async (req, res, next) => {
  if (!referenceModels) {
    return next(error(404, "No Data Found"));
  }
  const userModel = await getModelsFromDirectory("user", "user");
  const exampleUser = await userModel.findOne();

  const data = {
    contentEJS: "create",
    exampleUserID: exampleUser._id || null,
    spells: await referenceModels.spell.find(),
    classes: await referenceModels.magicSchool.find(),
    backstory: getRandomBackstory(),
  };

  res.render("index", data);
});

// app.get("/contact", (req, res, next) => {
//   const data = {
//     contentEJS: "contact",
//   };
//   res.render("index", data);
// });

app.get("/documentation", async (req, res, next) => {
  const warbandModels = await getModelsFromDirectory("warband");
  const userModel = await getModelsFromDirectory("user", "user");
  const exampleWizard = await warbandModels.wizard.findOne();
  const exampleUser = await userModel.findOne();
  const exampleFollower = await warbandModels.follower.findOne();
  const exampleApprentice = await warbandModels.apprentice.findOne();

  const data = {
    contentEJS: "documentation",
    referenceTypes: Object.keys(referenceModels),
    warbandTypes: Object.keys(warbandModels),
    exampleWizardID: exampleWizard._id || null,
    exampleFollowerID: exampleFollower._id || null,
    exampleApprenticeID: exampleApprentice._id || null,
    exampleUserID: exampleUser._id || null,
  };
  res.render("index", data);
});

app.post("/_seedDataNow_", async (req, res, next) => {
  // for demonstration purposes only
  try {
    await Promise.all([
      seedData("reference"),
      seedData("warband"),
      seedData("user"),
    ]);

    await setDataRelations();

    res.json({ status: 200, message: "Data Seeded Successfully" });
  } catch (err) {
    console.error(`Error seeding data:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.use((req, res, next) => {
  const data = {
    contentEJS: "page404",
    title: "404 Error",
    imgSrc: "https://media.tenor.com/fRwU2Z3GKtgAAAAM/busy-working.gif",
    content:
      "You have found a page that does not exist or is under construction.<br>Please try again later.",
  };
  res.status(404).render("index", data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
