const express = require("express");
const router = express.Router();
const getDataFromSource = require("../utilityFuncs/getDataFromSource");
const newWizardTemplate = require("../utilityFuncs/newWizardTemplate");
const createNewId = require("../utilityFuncs/createNewId");

const error = require("../utilityFuncs/error");
const rostersData = require("../testData/warbandData/rosters.json");
const wizardsData = require("../testData/warbandData/wizards.json");
const writeKeyValueToJson = require("../utilityFuncs/writeKeyValuetoJson");

// api/warbands/

router.route("/").get(async (req, res, next) => {
  const searchtype = req.query.type || null;
  const warbandData = await getDataFromSource("warbandData", searchtype);
  warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
});

router
  .route("/wizards")
  .get(async (req, res, next) => {
    const ownerId = req.query.ownerId || null;
    if (ownerId) {
      res.json(Object.values(wizardsData).filter((w) => w.ownerId == ownerId));
    }

    res.json(wizardsData);
  })
  .post((req, res, next) => {
    // get form data and assign a random id
    const formData = req.body;
    // console.log(formData);

    let newWizardId = createNewId("wizard");

    const wizardObject = newWizardTemplate(
      formData.name,
      formData.ownerId,
      formData.classId,
      formData.primarySpellIds,
      formData.alignedSpellIds,
      formData.neutralSpellIds,
      formData.backstory
    );
    writeKeyValueToJson(
      "../testData/warbandData/wizards.json",
      newWizardId,
      wizardObject
    );
    res.json(wizardObject);
  });

router.route("/wizards/:ownerId/:id").get((req, res, next) => {
  const ownerId = req.params.ownerId;
  const wizardId = req.params.id;
  res.json(wizardsData[wizardId]);
});

router.route("/rosters").get(async (req, res, next) => {
  const warbandData = await getDataFromSource("warbandData", req.params.type);
  warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
});

router.route("/:type/:id").get(async (req, res, next) => {
  const warbandData = await getDataFromSource("warbandData", req.params.type);
  const itemId = req.params.id;

  const result = warbandData.find((item) => item.id == itemId);
  console.log(result);
  result ? res.json(result) : next(error(404, "No Data Found"));
});

module.exports = router;
