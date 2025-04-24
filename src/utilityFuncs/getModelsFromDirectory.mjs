import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

async function getModelsFromDirectory(modelDirectory, type = "") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const modelsPath = path.join(__dirname, `../models/${modelDirectory}/`);
    const files = fs.readdirSync(modelsPath);
    let data = {};

    if (type) {
      const filename = type;
      const filePath = path.join(modelsPath, `${type}.model.mjs`);
      const modelModule = await import(filePath);
      const Model = modelModule.default;
      data[filename] = Model;
    } else {
      for (const file of files) {
        const filename = path.basename(file, ".model.mjs");
        const filePath = path.join(modelsPath, file);
        const modelModule = await import(filePath);
        const Model = modelModule.default;
        data[filename] = Model;
      }
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default getModelsFromDirectory;
