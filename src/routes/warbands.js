const express = require("express");
const router = express.Router();
const error = require("../utilityFuncs/error");
const getReferenceData = require("../utilityFuncs/getReferenceData");

router.route("/").get(async (req, res, next) => {
  const referenceData = getReferenceData();
  referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
});

router.route("/create").post(async (req, res, next) => {
  // this should be POST
});

module.exports = router;
