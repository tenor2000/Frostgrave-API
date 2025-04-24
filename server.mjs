import express from "express";
import error from "./src/utilityFuncs/error.mjs";
import ejs from "ejs";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// Data retrieval for reference in views
import getDataFromSource from "./src/utilityFuncs/getDataFromSource.mjs";
import getRandomBackstory from "./src/utilityFuncs/getRandomBackstory.mjs";

// mongoose connection
const connectDir = "frostgraveDB";
mongoose.connect(process.env.ATLAS_URI + connectDir);
mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

import reference from "./src/routes/reference.mjs";
import users from "./src/routes/users.mjs";
import warbands from "./src/routes/warbands.mjs";

// Middleware
app.use(express.static("./src/styles"));
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  next();
});

app.use("/api", (req, res, next) => {
  let apiKey = req.get("x-api-key");

  // code to override null api-key for now
  if (!apiKey) {
    apiKey = "notanapikey";
  }
  //

  console.log("Checking for API Key...");

  if (apiKey !== "notanapikey") {
    return res.status(403).json({ error: "Forbidden - Invalid API Key" });
  }

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
app.use("/api/users", users);

// Routes
app.get("/", (req, res, next) => {
  const data = {
    contentEJS: "home",
  };
  res.render("index", data);
});

app.get("/create", (req, res, next) => {
  const referenceData = getDataFromSource("reference");
  //const warbandData = getDataFromSource("warbandData");

  if (!referenceData) {
    return next(error(404, "No Data Found"));
  }

  const data = {
    contentEJS: "create",
    spells: referenceData.spells,
    classes: referenceData.schoolsOfMagic,
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

app.get("/documentation", (req, res, next) => {
  const data = {
    contentEJS: "documentation",
    referenceTypes: Object.keys(referenceData),
    warbandTypes: Object.keys(warbandData),
  };
  res.render("index", data);
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
      "You have found a page that does not exist or is under construction. Please try again later.",
  };
  res.status(404).render("index", data);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
