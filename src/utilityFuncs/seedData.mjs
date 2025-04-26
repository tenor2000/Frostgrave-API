import fs from "fs/promises";
import path from "path";
import getModelsFromDirectory from "./getModelsFromDirectory.mjs";
import { fileURLToPath } from "url";

const dataPath = "../seed_data";

async function seedData(modelType) {
  const models = await getModelsFromDirectory(modelType);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, dataPath, `${modelType}Data`);
  const files = await fs.readdir(folderPath);

  for (let file of files) {
    const filePath = path.join(folderPath, file);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(fileContents);

    let modelName = file.replace(".json", "");
    modelName.endsWith("s") ? (modelName = modelName.slice(0, -1)) : modelName;

    const Model = models[modelName];
    if (!Model) {
      console.error(`No model found for ${modelName}`);
      continue;
    }

    // Wipe existing
    await Model.deleteMany({});
    // Insert all new
    await Model.create(parsedData);

    console.log(`Seeded ${modelName} successfully.`);
  }
}

export default seedData;
