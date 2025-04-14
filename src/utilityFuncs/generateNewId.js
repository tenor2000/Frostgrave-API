const { randomBytes } = require("crypto");

//Data to check
const dataSets = {
  wizard: require("../testData/warbandData/wizards.json"),
  scenario: require("../testData/warbandData/scenarios.json"),
  campaign: require("../testData/warbandData/campaigns.json"),
  apprentice: require("../testData/warbandData/apprentices.json"),
  roster: require("../testData/warbandData/personnel.json"),
};

function generateNewId(type) {
  const newId = generateRandomString(type);
  if (!validateIdString(type, newId)) {
    return getNewId(type);
  }
  return newId;
}

function generateRandomString(type) {
  let idLength;
  switch (type) {
    case "wizard":
      idLength = 9;
      break;
    case "scenario":
      idLength = 10;
      break;
    case "campaign":
      idLength = 11;
      break;
    case "roster":
      idLength = 12;
      break;
    default:
      idLength = 9;
      break;
  }

  return randomBytes(idLength)
    .toString("base64")
    .slice(0, 9)
    .replace(/[^a-zA-Z0-9]/g, "");
}

function validateIdString(type, id) {
  const dataset = dataSets[type];
  return !dataset ? false : !dataset[id];
}

module.exports = generateNewId;
