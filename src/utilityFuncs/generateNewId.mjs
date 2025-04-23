import { randomBytes } from "crypto";

//Data to check
import wizard from "../testData/warbandData/wizards.json";
import scenario from "../testData/warbandData/scenarios.json";
import campaign from "../testData/warbandData/campaigns.json";
import apprentice from "../testData/warbandData/apprentices.json";
import roster from "../testData/warbandData/personnel.json";

const dataSets = {
  wizard,
  scenario,
  campaign,
  apprentice,
  roster,
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

export default generateNewId;
