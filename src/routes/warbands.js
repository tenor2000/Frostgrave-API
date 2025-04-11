const express = require("express");
const router = express.Router();
const getDataFromSource = require("../utilityFuncs/getDataFromSource");

const error = require("../utilityFuncs/error");
const wizardsData = require("../testData/rosterData/wizards.json");
const rostersData = require("../testData/rosterData/rosters.json");

router.route("/").get(async (req, res, next) => {
  const warbandData = await getDataFromSource("rosterData");
  warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
});

router.route("/:type").get(async (req, res, next) => {
  const warbandData = await getDataFromSource("rosterData", req.params.type);
  warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
});

router.route("/create").post((req, res, next) => {
  console.log("req.body", req.body);
});

module.exports = router;
