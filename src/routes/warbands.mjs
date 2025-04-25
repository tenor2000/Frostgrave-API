import express from "express";
import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";
import error from "../utilityFuncs/error.mjs";

const router = express.Router();

// api/warbands/

router.route("/").get(async (req, res, next) => {
  const queryType = req.query.type || null;
  try {
    const warbandModels = await getModelsFromDirectory("warband", queryType);
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

router.route("/warband/").get(async (req, res, next) => {
  // Get all warband info in one object by wizard
  const id = req.params._id || null;

  if (!id) {
    return res.status(400).json({ error: "No id provided" });
  }

  try {
    const warbandModels = await getModelsFromDirectory("warband", "wizard");
    const Model = warbandModels["wizard"];
    let data = await Model.findById(id)
      .populate("apprentices")
      .populate("followers");

    data ? res.json(data) : next(error(404, "No Data Found"));
  } catch (err) {
    console.error(`Error retrieving data:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router.route("/warband/:_id").get(async (req, res, next) => {
  // Get all warband info in one object by wizard
  const id = req.params._id || null;
  try {
    const warbandModels = await getModelsFromDirectory("warband", "wizard");
    const Model = warbandModels["wizard"];
    let data = await Model.findById(id)
      .populate("apprentices")
      .populate("followers");

    data ? res.json(data) : next(error(404, "No Data Found"));
  } catch (err) {
    console.error(`Error retrieving data:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router
  .route("/:type")
  .get(async (req, res, next) => {
    const queryId = req.query._id || null;
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
      console.log(`Status 201: Creation Successful`);
      res.status(201).json(result);
    } catch (err) {
      console.error(`Error inserting ${type}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  });

router
  .route("/:type/:_id")
  .get(async (req, res, next) => {
    const id = req.params._id;
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
  .put(async (req, res, next) => {
    // ALL Changes are by the document's _id and NOT wizard_id
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
      const changedDoc = await Model.findByIdAndUpdate(
        req.params._id,
        formData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!changedDoc) {
        return res.status(404).json({ error: "Document not found" });
      }

      console.log(`Status 200: Update Successful - ID: ${req.params._id}`);
      res.status(200).json(changedDoc);
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  })
  .delete(async (req, res, next) => {
    // ALL DELETES are by the document's '_id' and NOT 'wizard_id'

    // This is example document and cannot be deleted
    const protected_id = "680aa65cb7232c85534d3f6b";
    if (req.params._id === protected_id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const type = req.params.type.endsWith("s")
      ? req.params.type.slice(0, -1)
      : req.params.type;
    const models = await getModelsFromDirectory("warband");
    const Model = models[type];

    if (!Model) {
      return res
        .status(404)
        .json({ error: `No model found for type: ${req.params.type}` });
    }

    try {
      const delectedDoc = await Model.findByIdAndDelete(req.params._id);

      if (!delectedDoc) {
        return res.status(404).json({ error: "Document not found" });
      }

      console.log(`Status 204: Deletion Successful - ID: ${req.params._id}`);
      res.status(204);
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  });

export default router;
