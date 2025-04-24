import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

async function getDataFromSource(modelDirectory, type = "") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const modelsPath = path.join(__dirname, `../models/${modelDirectory}/`);
    let data = {};

    if (type) {
      const filename = type + "_data";
      const filePath = path.join(modelsPath, `${type}.model.mjs`);
      const modelModule = await import(filePath);
      const Model = modelModule.default;
      const modelData = await Model.find();
      data[filename] = modelData;
    } else {
      for (const file of fs.readdirSync(modelsPath)) {
        const filename = path.basename(file, ".model.mjs") + "_data";
        const filePath = path.join(modelsPath, file);
        const modelModule = await import(filePath);
        const Model = modelModule.default;
        data[filename] = await Model.find();
      }
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default getDataFromSource;
