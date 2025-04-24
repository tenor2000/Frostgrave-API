import express from "express";
import error from "../utilityFuncs/error.mjs";
import getDataFromSource from "../utilityFuncs/getDataFromSource.mjs";

const router = express.Router();

import ArmorModel from "../models/reference/armor.model.mjs";
import WeaponModel from "../models/reference/weapon.model.mjs";
import CreatureModel from "../models/reference/creature.model.mjs";
import MagicSchoolModel from "../models/reference/magicSchool.model.mjs";
import SpellModel from "../models/reference/spell.model.mjs";
import SoldierModel from "../models/reference/soldier.model.mjs";

const modelMap = {
  armor: ArmorModel,
  weapon: WeaponModel,
  creature: CreatureModel,
  magicSchool: MagicSchoolModel,
  spell: SpellModel,
  soldier: SoldierModel,
};

// api/reference/

router.route("/data").get(async (req, res, next) => {
  const searchtype = req.query.type || null;
  console.log(searchtype);

  try {
    const referenceData = await getDataFromSource("reference", searchtype);
    referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
  } catch (err) {
    console.error(`Error inserting ${type}:`, err);
    res.status(500).json({ status: 500, error: err.message, details: err });
  }
});

router
  .route("/data/:type")
  .get(async (req, res, next) => {
    const referenceData = await getDataFromSource("reference", req.params.type);
    referenceData ? res.json(referenceData) : next(error(404, "No Data Found"));
  })
  .post(async (req, res, next) => {
    // Used for seeding
    const { type } = req.params;
    const data = req.body;

    const Model = modelMap[type];

    if (!Model) {
      return res
        .status(404)
        .json({ error: `No model found for type: ${modelType}` });
    }

    try {
      const result = await Model.create(data);
      res.json(result);
    } catch (err) {
      console.error(`Error inserting ${modelType}:`, err);
      res.status(500).json({ error: err.message, details: err });
    }
  });

export default router;
