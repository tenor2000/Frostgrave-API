import fs from "fs/promises";
import path from "path";
import getModelsFromDirectory from "./getModelsFromDirectory.mjs";
import { fileURLToPath } from "url";

export async function seedData(modelType) {
  const models = await getModelsFromDirectory(modelType);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, `../seed_data/${modelType}Data`);
  const files = await fs.readdir(folderPath);

  try {
    for (let file of files) {
      const filePath = path.join(folderPath, file);
      const fileContents = await fs.readFile(filePath, "utf-8");
      const parsedData = JSON.parse(fileContents);

      let modelName = file.replace(".json", "");
      // remove plural to fit the model naming convention, although there are flaws to this
      modelName.endsWith("s")
        ? (modelName = modelName.slice(0, -1))
        : modelName;

      const Model = models[modelName];
      if (!Model) {
        console.error(`No model found for ${modelName}`);
        continue;
      }
      // Wipe clean before reseeding
      await Model.deleteMany({});
      await Model.create(parsedData);

      console.log(`Seeded ${modelName} collection successfully.`);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function setDataRelations() {
  // Sets the relational ids correctly for reseeded data
  const models = await getModelsFromDirectory("warband");
  const userModel = await getModelsFromDirectory("user", "user");
  try {
    const wizards = await models.wizard.find();
    const apprentices = await models.apprentice.find();
    const users = await userModel.find();

    for (let i = 0; i < wizards.length; i++) {
      wizards[i].user_id = users[i]._id;
      apprentices[i].wizard_id = wizards[i]._id;
      await wizards[i].save();
      await apprentices[i].save();
      await models.follower.updateMany(
        { wizard_id: `_TEMP${i}` },
        { $set: { wizard_id: wizards[i]._id } }
      );
    }

    console.log("Data relations set successfully.");
  } catch (err) {
    console.error(err);
  }
}
