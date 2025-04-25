import { randomBytes } from "crypto";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Data to check
const wizard = JSON.parse(
  await readFile(resolve(__dirname, "../testData/warbandData/wizards.json"))
);
const scenario = JSON.parse(
  await readFile(resolve(__dirname, "../testData/warbandData/scenarios.json"))
);
const campaign = JSON.parse(
  await readFile(resolve(__dirname, "../testData/warbandData/campaigns.json"))
);
const apprentice = JSON.parse(
  await readFile(resolve(__dirname, "../testData/warbandData/apprentices.json"))
);
const roster = JSON.parse(
  await readFile(resolve(__dirname, "../testData/warbandData/personnel.json"))
);

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
