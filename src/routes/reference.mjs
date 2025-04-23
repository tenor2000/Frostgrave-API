import express from "express";
import error from "../utilityFuncs/error.mjs";
import getDataFromSource from "../utilityFuncs/getDataFromSource.mjs";

const router = express.Router();

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

export default router;
