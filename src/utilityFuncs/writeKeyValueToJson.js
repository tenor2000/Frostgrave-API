function writeKeyValueToJson(path, key, value) {
  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync(path, "utf-8"));
  data[key] = value;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = writeKeyValueToJson;
