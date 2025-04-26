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
    const modelMap = await getModelsFromDirectory("user");
    const Model = modelMap["user"];

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

router.route("/:_id").get(async (req, res, next) => {
  const models = await getModelsFromDirectory("user", req.params.type);
  userData ? res.json(userData) : next(error(404, "No Data Found"));
});

export default router;
