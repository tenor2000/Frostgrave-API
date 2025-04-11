const { randomBytes } = require("crypto");

//Data to check
const wizardsData = require("../testData/rosterData/wizards.json");
const scenariosData = require("../testData/rosterData/scenarios.json");
const campaignsData = require("../testData/rosterData/campaigns.json");
const apprenticesData = require("../testData/rosterData/apprentices.json");
const rostersData = require("../testData/rosterData/rosters.json");

function createNewId(type) {
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
  switch (type) {
    case "wizard":
      return wizardsData.find((w) => w.id == id) ? false : true;
    case "scenario":
      return scenariosData.find((s) => s.id == id) ? false : true;
    case "campaign":
      return campaignsData.find((c) => c.id == id) ? false : true;
    case "apprentice":
      return apprenticesData.find((a) => a.id == id) ? false : true;
    case "roster":
      return rostersData.find((r) => r.id == id) ? false : true;
  }
}

module.exports = createNewId;
