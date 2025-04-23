import fs from "fs";
import path from "path";

// This will not be necessary when implementing mongodb

function deleteKeyFromJson(jsonPath, key) {
  const fullPath = path.join(__dirname, jsonPath);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  delete data[key];
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}

export default deleteKeyFromJson;
