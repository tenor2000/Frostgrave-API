function newWizardTemplate(
  name,
  ownerId,
  classId,
  pspellsArray,
  aspellsArray,
  nspellsArray,
  backstory
) {
  const wizardTemplate = structuredClone(
    require("../testData/warbandData/wizards.json")._TEMPLATE_
  );

  wizardTemplate.name = name;
  wizardTemplate.ownerId = parseInt(ownerId);
  wizardTemplate.classId = parseInt(classId) || wizardTemplate.classId;
  wizardTemplate.primarySpellIds = pspellsArray.map(Number);
  wizardTemplate.alignedSpellIds = aspellsArray.map(Number);
  wizardTemplate.neutralSpellIds = nspellsArray.map(Number);
  wizardTemplate.backstory = backstory;
  return wizardTemplate;
}

function newApprenticeTemplate(name) {
  const apprenticeTemplate = structuredClone(
    require("../testData/warbandData/apprentices.json")._TEMPLATE_
  );
  apprenticeTemplate.name = name;

  return apprenticeTemplate;
}

function newUserTemplate(name) {
  const userTemplate = structuredClone(
    require("../testData/userData/users.json")._TEMPLATE_
  );
  userTemplate.name = name;
  return userTemplate;
}

module.exports = { newWizardTemplate, newApprenticeTemplate, newUserTemplate };
