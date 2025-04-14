function newWizardTemplate(
  name,
  ownerId,
  classId,
  pspellsArray,
  aspellsArray,
  nspellsArray,
  backstory
) {
  const wizardTemplate =
    require("../testData/warbandData/wizards.json")._TEMPLATE_;

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
  const apprenticeTemplate =
    require("../testData/warbandData/apprentices.json")._TEMPLATE_;
  apprenticeTemplate.name = name;

  return apprenticeTemplate;
}

(module.exports = newWizardTemplate), newApprenticeTemplate;
