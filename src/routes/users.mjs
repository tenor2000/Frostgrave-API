import express from "express";
import error from "../utilityFuncs/error.mjs";
import getModelsFromDirectory from "../utilityFuncs/getModelsFromDirectory.mjs";

const router = express.Router();

// api/users/

router
  .route("/")
  .get(async (req, res, next) => {
    const searchtype = req.query.type || null;

    const userModels = await getModelsFromDirectory("user", searchtype);

    const Model = userModels["user"];

    if (!Model) {
      return res.status(404).json({ error: `No model found for type: user` });
    }

    const userData = await Model.find();
    userData ? res.json(userData) : next(error(404, "No Data Found"));
  })
  .post(async (req, res, next) => {
    // Used for seeding
    const Model = await getModelsFromDirectory("user", "user");

    if (!Model) {
      return res.status(404).json({ error: `No model found for type: user` });
    }

    try {
      const userData = await Model.create(req.body);
      res.status(201).json(userData);
    } catch (err) {
      console.error(`Error creating user:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    const Model = await getModelsFromDirectory("user", "user");

    if (!Model) {
      return res.status(404).json({ error: `No model found for type: user` });
    }

    const userData = await Model.findById(req.params.id);
    userData ? res.json(userData) : next(error(404, "No Data Found"));
  })
  .put(async (req, res, next) => {
    const Model = await getModelsFromDirectory("user", "user");

    if (!Model) {
      return res.status(404).json({ error: `No model found for type: user` });
    }

    try {
      const userData = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(userData);
    } catch (err) {
      console.error(`Error updating user:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  })
  .delete(async (req, res, next) => {
    const Model = await getModelsFromDirectory("user", "user");

    if (!Model) {
      return res.status(404).json({ error: `No model found for type: user` });
    }

    try {
      const userData = await Model.findByIdAndDelete(req.params.id);
      res.status(204).json(userData);
    } catch (err) {
      console.error(`Error deleting user:`, err);
      res.status(500).json({ status: 500, error: err.message, details: err });
    }
  });

export default router;
