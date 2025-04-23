import fs from "fs";
import path from "path";

// This will not be necessary when implementing mongodb

function deleteObjectFromJson(jsonPath, id) {
  const fullPath = path.join(__dirname, jsonPath);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
  const updatedData = data.filter((item) => item.wizard_id !== id);
  fs.writeFileSync(fullPath, JSON.stringify(updatedData, null, 2));
}

export default deleteObjectFromJson;
