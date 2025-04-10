const path = require("path");
const fs = require("fs");

function getReferenceData(type = "") {
  const data = {};
  // REPLACE WITH CALL TO MONGODB
  const directoryPath = path.join(__dirname, "../testData/referenceData");
  console.log("Fetching Data");

  if (type) {
    const filePath = path.join(directoryPath, `${type}.json`);
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8").trim();
      const data = JSON.parse(fileContent);
      return data;
    } catch (err) {
      throw new Error(`Error reading ${filePath}: ${err.message}`);
    }
  } else {
    const files = fs.readdirSync(directoryPath);

    for (const filename of files) {
      if (filename.endsWith(".json")) {
        const dataname = path.basename(filename, ".json");
        const filePath = path.join(directoryPath, filename);

        try {
          const fileContent = fs.readFileSync(filePath, "utf-8").trim();

          if (!fileContent) {
            console.log(`Skipping empty file: ${filePath}`);
            continue;
          }

          const jsonData = JSON.parse(fileContent);
          data[dataname] = jsonData;
        } catch (err) {
          throw new Error(`Error reading ${filePath}: ${err.message}`);
        }
      }
    }
  }

  return data;
}

module.exports = getReferenceData;
