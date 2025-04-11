const wizardTemplate =
  require("../testData/rosterData/wizards.json")._TEMPLATE_;

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
    require("../testData/rosterData/wizards.json")._TEMPLATE_;
  wizardTemplate.name = name;
  wizardTemplate.ownerId = parseInt(ownerId);
  wizardTemplate.classId = parseInt(classId) || wizardTemplate.classId;
  wizardTemplate.primarySpellIds = pspellsArray.map(Number);
  wizardTemplate.alignedSpellIds = aspellsArray.map(Number);
  wizardTemplate.neutralSpellIds = nspellsArray.map(Number);
  wizardTemplate.backstory = backstory;
  return wizardTemplate;
}

module.exports = wizardTemplate;
