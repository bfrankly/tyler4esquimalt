// Regenerates index.html (single file, script inlined) from app.js + content.json.  Run:  node build.js
const fs = require("fs");
const { renderDocument } = require("./app.js");
const content = JSON.parse(fs.readFileSync("content.json", "utf8"));
const src = fs.readFileSync("app.js", "utf8");
fs.writeFileSync("index.html", renderDocument(content, src));
console.log("Wrote index.html");
