import express from "express";

import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";

import {
  newPersonnelTemplate,
  newWizardTemplate,
  newApprenticeTemplate,
} from "../utilityFuncs/newTemplates.mjs";

import generateNewId from "../utilityFuncs/generateNewId.mjs";
import writeObjectToJson from "../utilityFuncs/writeObjectToJson.mjs";
import deleteObjectFromJson from "../utilityFuncs/deleteObjectFromJson.mjs";
import replaceObjectInJson from "../utilityFuncs/replaceObjectInJson.mjs";
import isValidMatchingObject from "../utilityFuncs/isValidMatchingObject.mjs";
import error from "../utilityFuncs/error.mjs";

const router = express.Router();

// Data to be replaced by MongoDB
// import path from "path";
// import fs from "fs/promises";
// import { fileURLToPath } from "url";

// // Recreate __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Read JSON files dynamically
// const apprenticesData = JSON.parse(
//   await fs.readFile(
//     path.join(__dirname, "../testData/warbandData/apprentices.json"),
//     "utf-8"
//   )
// );
// const wizardsData = JSON.parse(
//   await fs.readFile(
//     path.join(__dirname, "../testData/warbandData/wizards.json"),
//     "utf-8"
//   )
// );
// const personnelData = JSON.parse(
//   await fs.readFile(
//     path.join(__dirname, "../testData/warbandData/personnel.json"),
//     "utf-8"
//   )
// );

// api/warbands/

router.route("/").get(async (req, res, next) => {
  const queryType = req.query.type || null;
  try {
    const warbandModels = await getModelsFromDirectory("warband", queryType);
    console.log(warbandModels);
    let warbandData = {};
    for (const [key, value] of Object.entries(warbandModels)) {
      warbandData[key + "_data"] = await value.find();
    }
    warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
  } catch (err) {
    console.error(`Error retrieving data:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router
  .route("/:type")
  .get(async (req, res, next) => {
    const queryId = req.query.id || null;
    const type = req.params.type.endsWith("s")
      ? req.params.type.slice(0, -1)
      : req.params.type;

    try {
      const models = await getModelsFromDirectory("warband", type);
      const Model = models[type];
      let data;

      if (queryId) {
        data =
          type === "wizard"
            ? await Model.findById(queryId) // return a single wizard object
            : await Model.find({ wizard_id: queryId }); // returns array of objects
      } else {
        data = await Model.find();
      }

      data ? res.json(data) : next(error(404, "No Data Found"));
    } catch (err) {
      console.error(`Error retrieving ${type}:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  })
  .post(async (req, res, next) => {
    const type = req.params.type.endsWith("s")
      ? req.params.type.slice(0, -1)
      : req.params.type;
    const models = await getModelsFromDirectory("warband");
    const Model = models[type];
    const formData = req.body;

    if (!Model) {
      return res
        .status(404)
        .json({ error: `No model found for type: ${req.params.type}` });
    }

    try {
      const result = await Model.create(formData);
      res.status(201).json(result);
    } catch (err) {
      console.error(`Error inserting ${type}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  });

router
  .route("/:type/:id")
  .get(async (req, res, next) => {
    const id = req.params.id;
    const type = req.params.type.endsWith("s")
      ? req.params.type.slice(0, -1)
      : req.params.type;

    try {
      const models = await getModelsFromDirectory("warband", type);
      const Model = models[type];
      let data =
        type === "wizard"
          ? await Model.findById(id) // returns a single wizard object
          : await Model.find({ wizard_id: id }); // returns array of objects

      data ? res.json(data) : next(error(404, "No Data Found"));
    } catch (err) {
      console.error(`Error retrieving ${type}:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  })
  .put((req, res, next) => {
    // formData should be an entire apprentice object, when changes are made
    const formData = req.body;

    const apprenticeObject = apprenticesData.find(
      (a) => a.wizard_id == req.params.id
    );

    if (apprenticeObject && isValidMatchingObject(formData, apprenticeObject)) {
      apprenticeObject.wizard_id = req.params.id;
      replaceObjectInJson(
        "../testData/warbandData/apprentices.json",
        apprenticeObject,
        formData
      );
      res.status(201).json(formData);
    } else {
      next(error(400, "Invalid Data"));
    }
  })
  .delete((req, res, next) => {
    const wizard_id = req.params.id;

    const apprenticeObject = apprenticesData.find(
      (a) => a.wizard_id == wizard_id
    );

    if (apprenticeObject) {
      deleteObjectFromJson(
        "../testData/warbandData/apprentices.json",
        wizard_id
      );
      res.status(201).json(apprenticeObject);
    } else {
      next(error(404, "Apprentice not found"));
    }
  });

export default router;
