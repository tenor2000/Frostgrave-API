import express from "express";
import error from "../utilityFuncs/error.mjs";
import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";
const router = express.Router();

// api/reference/

router.route("/data").get(async (req, res, next) => {
  const searchtype = req.query.type || null;

  try {
    const models = await getModelsFromDirectory("reference", searchtype);
    let referenceData = {};
    for (const [key, value] of Object.entries(models)) {
      referenceData[key + "_data"] = await value.find();
    }
    referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
  } catch (err) {
    console.error(`Error retrieving ${type}:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router
  .route("/data/:type")
  .get(async (req, res, next) => {
    try {
      const models = await getModelsFromDirectory("reference", req.params.type);
      let referenceData = {};
      referenceData[req.params.type + "_data"] = await models[
        req.params.type
      ].find();

      referenceData
        ? res.json(referenceData)
        : next(error(404, "No Data Found"));
    } catch (err) {
      console.error(`Error retrieving ${type}:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  })
  .post(async (req, res, next) => {
    // Used for seeding
    const modelMap = await getModelsFromDirectory("reference");
    const type = req.params.type;
    const data = req.body;

    const Model = modelMap[type];

    if (!Model) {
      return res
        .status(404)
        .json({ error: `No model found for type: ${type}` });
    }

    try {
      const result = await Model.create(data);
      res.status(201).json(result);
    } catch (err) {
      console.error(`Error inserting ${type}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  });

export default router;
