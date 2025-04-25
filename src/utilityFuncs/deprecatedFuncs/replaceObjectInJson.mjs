import fs from "fs";
import path from "path";

// This will literally write to json, this will be replaced by Mongodb

function replaceObjectInJson(jsonPath, prevObject, newObject) {
  const fullPath = path.join(__dirname, jsonPath);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));

  const index = data.findIndex((object) => object.id == prevObject.id);
  if (index !== -1) {
    data[index] = newObject;
    data.find((object) => object.id == prevObject.id);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  } else {
    console.log("Object not found");
  }
}

export default replaceObjectInJson;
