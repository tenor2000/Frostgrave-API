const express = require("express");
const router = express.Router();
const getDataFromSource = require("../utilityFuncs/getDataFromSource");
const newWizardTemplate = require("../utilityFuncs/newTemplates");
const newApprenticeTemplate = require("../utilityFuncs/newTemplates");
const generateNewId = require("../utilityFuncs/generateNewId");

const error = require("../utilityFuncs/error");
const apprenticesData = require("../testData/warbandData/apprentices.json");
const wizardsData = require("../testData/warbandData/wizards.json");
const writeKeyValueToJson = require("../utilityFuncs/writeKeyValuetoJson");

// api/warbands/

router.route("/").get(async (req, res, next) => {
  const searchtype = req.query.type || null;
  const warbandData = await getDataFromSource("warbandData", searchtype);
  warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
});

router
  .route("/apprentices")
  .get(async (req, res, next) => {
    const warbandData = await getDataFromSource("warbandData", "apprentices");
    warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
  })
  .post((req, res, next) => {
    // get form data and assign a random id
    const formData = req.body;
    // console.log(formData);

    const newApprenticeId = generateNewId("apprentice");
    const wizardId = formData.wizardId;

    if (wizardsData[wizardId]) {
      wizardsData[wizardId].apprenticeIds = newApprenticeId;
    } else {
      return next(error(404, "Wizard not found"));
    }

    const apprenticeObject = newApprenticeTemplate(formData.name);

    writeKeyValueToJson(
      "../testData/warbandData/apprentices.json",
      newApprenticeId,
      apprenticeObject
    );
    writeKeyValueToJson(
      "../testData/warbandData/wizards.json",
      wizardId,
      wizardsData[wizardId]
    );
    res.status(201).json(apprenticeObject);
  });

router
  .route("/apprentices/:id")
  .get((req, res, next) => {
    const apprenticeId = req.params.id;

    apprenticesData[apprenticeId]
      ? res.json(apprenticesData[apprenticeId])
      : next(error(404, "No Data Found"));
  })
  .put((req, res, next) => {
    const apprenticeId = req.params.id;
    // WIP
  })
  .delete((req, res, next) => {
    const apprenticeId = req.params.id;
    // WIP
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

    const newWizardId = generateNewId("wizard");

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
    res.status(201).json(wizardObject);
  });

router
  .route("/wizards/:id")
  .get((req, res, next) => {
    const wizardId = req.params.id;

    wizardsData[wizardId]
      ? res.json(wizardsData[wizardId])
      : next(error(404, "No Data Found"));
  })
  .put((req, res, next) => {
    const formData = req.body;
  })
  .delete((req, res, next) => {
    //WIP
  });

router
  .route("/rosters")
  .get(async (req, res, next) => {
    const warbandData = await getDataFromSource("warbandData", "rosters");
    warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
  })
  .post((req, res, next) => {
    // get form data and assign a random id
    const formData = req.body;
    // WIP
  });

router
  .route("/rosters/:id")
  .get((req, res, next) => {
    const rosterId = req.params.id;

    rostersData[rosterId]
      ? res.json(rostersData[rosterId])
      : next(error(404, "No Data Found"));
  })
  .put((req, res, next) => {
    //WIP
  })
  .delete((req, res, next) => {
    //WIP
  });

module.exports = router;
