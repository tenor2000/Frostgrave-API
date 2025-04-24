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

router.route("/data/:modelType").post(async (req, res, next) => {
  const { modelType } = req.params;
  const data = req.body;

  const Model = modelMap[modelType];

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
