import path from "path";
import fs from "fs";
import { fileURLToPath, pathToFileURL } from "url";

async function getModelsFromDirectory(modelDirectory, type = "") {
  // if type is provided, return a single model, else return object of models
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  try {
    const modelsPath = path.join(__dirname, `../models/${modelDirectory}/`);
    const files = fs.readdirSync(modelsPath);
    let data = {};

    if (type) {
      const filename = type;
      const filePath = path.join(modelsPath, `${type}.model.mjs`);
      // Error here due to windows pathing using '\' instead of '/'. Import() doesn't like '\' that Windows uses.
      // const modelModule = await import(filePath);

      // Fixed by adding 'pathToFileURL' in the import() which converts it to an import() friendly url format.
      const modelModule = await import(pathToFileURL(filePath).href);

      const Model = modelModule.default;
      data = Model; // return a single model
    } else {
      for (const file of files) {
        const filename = path.basename(file, ".model.mjs");
        const filePath = path.join(modelsPath, file);
        // Error here due to windows pathing using '\' instead of '/'. Import() doesn't like '\' that Windows uses.
        // const modelModule = await import(filePath);

        // Fixed by adding 'pathToFileURL' in the import() which converts it to an import() friendly url format.
        const modelModule = await import(pathToFileURL(filePath).href);

        const Model = modelModule.default;
        data[filename] = Model; // object of models
      }
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default getModelsFromDirectory;
