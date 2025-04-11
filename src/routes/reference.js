const express = require("express");
const router = express.Router();
const error = require("../utilityFuncs/error");
const getDataFromSource = require("../utilityFuncs/getDataFromSource");

// api/reference/

router.route("/").get(async (req, res, next) => {
  const searchtype = req.query.type || null;

  const referenceData = await getDataFromSource("referenceData", searchtype);

  referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
});

router.route("/:type").get(async (req, res, next) => {
  const referenceData = await getDataFromSource(
    "referenceData",
    req.params.type
  );
  referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
});

module.exports = router;
