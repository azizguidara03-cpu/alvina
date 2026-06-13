import fs from "fs/promises";

const fetchHtml = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.text();
};

const run = async () => {
  const url = "https://www.alvinaonline.com/fr/kaki-50357-clup-saten-abiye-38-44-23yabl0050357-037-9";
  const html = await fetchHtml(url);
  
  // Find everything that looks like cdn.alvinaonline.com/ContentImages/...
  const matches = html.match(/https:\/\/cdn\.alvinaonline\.com\/ContentImages\/Product\/[^"'\s>]+/gi);
  const unique = [...new Set(matches)];
  console.log("Images:");
  unique.forEach(img => console.log(img));
};

run().catch(console.error);
