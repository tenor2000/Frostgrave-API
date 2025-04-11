const express = require("express");
const router = express.Router();
const error = require("../utilityFuncs/error");
const getDataFromSource = require("../utilityFuncs/getDataFromSource");

router.route("/").get(async (req, res, next) => {
  const referenceData = await getDataFromSource();
  referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
});

router.route("/:type").get(async (req, res, next) => {
  const referenceData = await getDataFromSource(directory, req.params.type);
  referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
});

module.exports = router;
