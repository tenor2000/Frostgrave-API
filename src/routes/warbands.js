const express = require("express");
const router = express.Router();
const getDataFromSource = require("../utilityFuncs/getDataFromSource");
const {
  newPersonnelTemplate,
  newWizardTemplate,
  newApprenticeTemplate,
} = require("../utilityFuncs/newTemplates");

const generateNewId = require("../utilityFuncs/generateNewId");
const writeObjectToJson = require("../utilityFuncs/writeObjectToJson");
const deleteObjectFromJson = require("../utilityFuncs/deleteObjectFromJson");
const replaceObjectInJson = require("../utilityFuncs/replaceObjectInJson");
const isValidMatchingObject = require("../utilityFuncs/isValidMatchingObject");
const error = require("../utilityFuncs/error");

const apprenticesData = require("../testData/warbandData/apprentices.json");
const wizardsData = require("../testData/warbandData/wizards.json");
const personnelData = require("../testData/warbandData/personnel.json");

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
    // get form data and assign a object to wizardId
    const formData = req.body;
    // console.log(formData);

    const wizardId = formData.id;

    if (!wizardsData.find((w) => w.wizardId == wizardId)) {
      return next(error(404, "Wizard not found"));
    }

    const apprenticeObject = newApprenticeTemplate(formData.name);
    apprenticeObject.wizardId = wizardId;

    writeObjectToJson(
      "../testData/warbandData/apprentices.json",
      apprenticeObject
    );
    res.status(201).json(apprenticeObject);
  });

router
  .route("/apprentices/:id")
  .get((req, res, next) => {
    const wizardId = req.params.id;

    const apprentice = apprenticesData.find((a) => a.wizardId == wizardId);

    apprentice
      ? res.json(apprentice)
      : next(error(404, "No Data Found with that ID"));
  })
  .put((req, res, next) => {
    // formData should be an entire apprentice object, when changes are made
    const formData = req.body;

    const apprenticeObject = apprenticesData.find(
      (a) => a.wizardId == req.params.id
    );

    if (isValidMatchingObject(apprenticeObject, formData)) {
      apprenticeObject[wizardId] = req.params.id;
      writeObjectToJson(
        "../testData/warbandData/apprentices.json",
        req.params.id,
        formData
      );
      res.status(201).json(formData);
    } else {
      next(error(400, "Invalid Data"));
    }
  })
  .delete((req, res, next) => {
    const wizardId = req.params.id;
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
    console.log(formData);

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
    console.log(wizardObject);

    wizardObject._id = newWizardId;
    writeObjectToJson("../testData/warbandData/wizards.json", wizardObject);
    res.status(201).json(wizardObject);
  });

router
  .route("/wizards/:id")
  .get((req, res, next) => {
    const wizard_id = req.params.id;

    const wizardObject = wizardsData.find((w) => w.wizard_id == wizard_id);

    wizardObject ? res.json(wizardObject) : next(error(404, "No Data Found"));
  })
  .put((req, res, next) => {
    // formData should be an entire wizard object, when changes are made
    const formData = req.body;

    const wizardObject = wizardsData.find(
      (w) => w.wizard_id == req.body.wizard_id
    );

    if (wizardObject && isValidMatchingObject(wizardObject, formData)) {
      replaceObjectInJson(
        "../testData/warbandData/wizards.json",
        wizardObject,
        formData
      );
      res.status(201).json(formData);
    } else {
      next(error(400, "Invalid Data"));
    }
  })
  .delete((req, res, next) => {
    //WIP
    const wizard_id = req.params.id;

    const wizardObject = wizardsData.find((w) => w.wizard_id == wizard_id);

    if (wizardObject) {
      deleteObjectFromJson("../testData/warbandData/wizards.json", wizard_id);
      res.status(201).json(wizardObject);
    } else {
      next(error(404, "Wizard not found"));
    }
  });

router
  .route("/personnel")
  .get(async (req, res, next) => {
    const warbandData = await getDataFromSource("warbandData", "personnel");
    warbandData ? res.json(warbandData) : next(error(404, "No Data Found"));
  })
  .post((req, res, next) => {
    // get form data and assign a random id
    const formData = req.body;
    // console.log(formData);

    // const newRosterId = generateNewId("personnel");
    const wizardId = formData.wizardId;

    if (!wizardsData.find((w) => w.wizardId == wizardId)) {
      next(error(404, "Wizard not found"));
    }

    const personnelObject = newPersonnelTemplate(formData.name, wizardId);

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
  .route("/personnel/:id")
  .get((req, res, next) => {
    const wizardId = req.params.id;

    const personnel = personnelData.filter((p) => p.wizardId == wizardId);

    personnel ? res.json(personnel) : next(error(404, "No Data Found"));
  })
  .put((req, res, next) => {
    //WIP
  })
  .delete((req, res, next) => {
    //WIP
  });

module.exports = router;
