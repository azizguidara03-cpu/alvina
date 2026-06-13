import fs from "fs";

const path = "data/scrapedProducts.ts";
const raw = fs.readFileSync(path, "utf8");

const patched = raw.replace(
  /"id":\s+"(sc-\d{3})",\s*\n\s*"slug":\s+""/g,
  (_match, id) => `"id":  "${id}",\n        "slug":  "alvina-${id}"`
);

fs.writeFileSync(path, patched, "utf8");
console.log("patched scraped slugs");
