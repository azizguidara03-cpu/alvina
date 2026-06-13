import fs from "fs/promises";

const categorySources = [
  { url: "https://www.alvinaonline.com/fr/-26-%C3%A9t%C3%A9/robe/", category: "robes" },
  { url: "https://www.alvinaonline.com/fr/nouvelle-saison-dhiver/robe/", category: "robes" },
  { url: "https://www.alvinaonline.com/fr/-26-%C3%A9t%C3%A9/abaya/", category: "abaya" },
  { url: "https://www.alvinaonline.com/fr/nouvelle-saison-dhiver/manteau/", category: "veste" },
  { url: "https://www.alvinaonline.com/fr/nouvelle-saison-dhiver/pantalon/", category: "pantalon" },
];

const fetchHtml = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.text();
};

const extractLinks = (html) => {
  const matches = html.match(/https:\/\/www\.alvinaonline\.com\/fr\/[^\s"'<>)]*_[a-z0-9-]+/gi) || [];
  return [...new Set(matches)];
};

const cleanText = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extract = (html, regex) => {
  const m = html.match(regex);
  return m?.[1] ? cleanText(m[1]) : "";
};

const parsePrice = (raw) => {
  const normalized = raw.replace(",", ".").replace(/[^\d.]/g, "");
  const value = Number(normalized || "0");
  if (!value) return 99;
  return Math.round(value * 0.92);
};

const safeSlug = (url) => url.split("/fr/")[1].replace(/[^a-z0-9-]/gi, "-").toLowerCase();

const run = async () => {
  const linkEntries = [];
  for (const source of categorySources) {
    const html = await fetchHtml(source.url);
    const links = extractLinks(html);
    for (const link of links) linkEntries.push({ link, category: source.category });
  }

  const unique = new Map();
  for (const entry of linkEntries) if (!unique.has(entry.link)) unique.set(entry.link, entry.category);
  const targets = [...unique.entries()].slice(0, 90);

  const products = [];
  let idx = 1;
  for (const [link, category] of targets) {
    try {
      const html = await fetchHtml(link);
      const name = extract(html, /<meta property="og:title" content="([^"]+)"/i)
        .replace("ALVINA ", "")
        .replace(" | ALVİNA", "")
        .trim();
      const image = extract(html, /<meta property="og:image" content="([^"]+)"/i);
      const priceRaw = extract(html, /([0-9]+[.,][0-9]{2})\s*USD/i);
      if (!name || !image) continue;
      products.push({
        id: `sc-${String(idx).padStart(3, "0")}`,
        slug: safeSlug(link),
        name: name.toUpperCase(),
        category,
        price: parsePrice(priceRaw),
        images: [image],
        colors: [{ name: "Assorti", hex: "#8C8279" }],
        sizes: ["38", "40", "42", "44", "46"],
        description: "Pièce issue de la collection officielle ALVINA, sélectionnée pour son élégance modeste et sa coupe contemporaine.",
        composition: "Voir fiche produit officielle ALVINA.",
        isNew: idx % 2 === 0,
        isBestseller: idx % 5 === 0,
        rating: 4.7,
        reviews: 20 + (idx % 60),
        stock: (idx % 6) + 1,
      });
      idx += 1;
    } catch {
      // ignore unavailable product pages
    }
  }

  const content = `import { Product } from "../types";\n\nexport const scrapedProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  await fs.writeFile("data/scrapedProducts.ts", content, "utf8");
  console.log(`scraped products: ${products.length}`);
};

run();
