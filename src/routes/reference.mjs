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

router.route("/data").post(async (req, res, next) => {
  const data = req.body;
});

export default router;
