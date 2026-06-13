import fs from "fs/promises";

const categoriesToScrape = [
  { name: "Robe de Soirée", url: "https://www.alvinaonline.com/fr/%C3%A9t%C3%A9-outlet/robe-de-soir%C3%A9e/" },
  { name: "Chemisier", url: "https://www.alvinaonline.com/fr/%C3%A9t%C3%A9-outlet/chemisier/" },
  { name: "Abaya", url: "https://www.alvinaonline.com/fr/%C3%A9t%C3%A9-outlet/abaya/" },
  { name: "Jean", url: "https://www.alvinaonline.com/fr/%C3%A9t%C3%A9-outlet/jean/" },
  { name: "Veste", url: "https://www.alvinaonline.com/fr/%C3%A9t%C3%A9-outlet/veste/" }
];

const fetchHtml = async (url) => {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.text();
};

const extractLinks = (html) => {
  const matches = html.match(/\/fr\/[^\s"'<>)]*_[a-z0-9-]+/gi) || [];
  return [...new Set(matches)];
};

const safeSlug = (url) => url.split("/fr/")[1].replace(/[^a-z0-9-]/gi, "-").toLowerCase();

const run = async () => {
  const skuMap = new Map();
  let totalProcessed = 0;

  for (const category of categoriesToScrape) {
      console.log(`Fetching category: ${category.name}`);
      const html = await fetchHtml(category.url);
      const links = extractLinks(html).map(l => `https://www.alvinaonline.com${l}`);
      
      // limit to 15 unique links per category to not overload
      const uniqueLinks = [...new Set(links)].slice(0, 15);
      
      for (const link of uniqueLinks) {
        try {
          const productHtml = await fetchHtml(link);
          
          const jsonLdMatch = productHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
          let jsonData = null;
          if (jsonLdMatch) {
             try { jsonData = JSON.parse(jsonLdMatch[1]); } catch(e) {}
          }
          
          let productObj = jsonData;
          if (Array.isArray(jsonData)) productObj = jsonData.find(j => j['@type'] === 'Product') || jsonData[0];
          
          const nameMatch = productHtml.match(/<meta property="og:title" content="([^"]+)"/i);
          let name = nameMatch ? nameMatch[1] : '';
          if (!name && productObj) name = productObj.name;
          
          if (!name) continue; 
          
          name = name.replace("ALVINA ", "").replace(" | ALVİNA", "").trim();

          const imageMatch = productHtml.match(/<meta property="og:image" content="([^"]+)"/i);
          const image = imageMatch ? imageMatch[1] : (productObj?.image || '');
          
          if (!image) continue; 

          const path = link.split('/fr/')[1];
          const match = path.match(/^([^_0-9]+)-(\d+)-/i);
          
          let colorName = "Assorti";
          let sku = path; 
          
          if (match) {
             colorName = match[1].replace(/-/g, ' ').toUpperCase();
             sku = match[2];
          } else {
             const skuMatch = name.match(/\b\d{4,5}\b/);
             if (skuMatch) sku = skuMatch[0];
          }

          let price = 99;
          if (productObj?.offers?.price) {
              price = parseFloat(productObj.offers.price);
          } else {
              const priceRaw = productHtml.match(/([0-9]+[.,][0-9]{2})\s*USD/i);
              if (priceRaw) {
                 price = parseFloat(priceRaw[1].replace(',', '.'));
                 price = Math.round(price * 0.92);
              }
          }

          const slug = safeSlug(link);
          
          const colorMap = {
              "BEIGE": "#eaeab4", "BLANC": "#FFFFFF", "BLEU": "#0000FF", "BLEU MARINE": "#000033", 
              "BRUN": "#8b4500", "CORAIL": "#ff7f50", "ECRUE": "#FDFCF8", "FUCHSIA": "#ff00ff",
              "GRIS": "#808080", "JAUNE": "#ffff00", "KAKI": "#f0e68c", "NOIR": "#000000",
              "OR": "#eeb422", "ORANGE": "#ffa500", "POUDRE": "#ffe4c4", "POURPRE": "#800080",
              "PRUNE": "#48022B", "ROSE": "#ff69b4", "ROUGE": "#ff0000", "ROUGE BORDEAUX": "#800020",
              "SABLE": "#f4a460", "TABA": "#cd6600", "VERMILION": "#FF9983", "VERT": "#008000",
              "VISON": "#A18270", "ASSORTI": "#8C8279"
          };
          
          let hex = "#8C8279";
          for (const [key, val] of Object.entries(colorMap)) {
              if (colorName.includes(key)) {
                  hex = val;
                  break;
              }
          }

          const colorVariant = {
              name: colorName,
              hex,
              slug,
              images: [image]
          };

          if (skuMap.has(sku)) {
              const product = skuMap.get(sku);
              if (!product.colors.some(c => c.name === colorName)) {
                  product.colors.push(colorVariant);
                  product.images.push(image);
              }
          } else {
              skuMap.set(sku, {
                  id: `sc-${sku}`,
                  slug, 
                  name,
                  category: category.name, // Assigning real category here!
                  price,
                  images: [image], 
                  colors: [colorVariant],
                  sizes: ["38", "40", "42", "44", "46"],
                  description: "Pièce issue de la collection officielle ALVINA, sélectionnée pour son élégance modeste et sa coupe contemporaine.",
                  composition: "Voir fiche produit officielle ALVINA.",
                  isNew: skuMap.size % 2 === 0,
                  isBestseller: skuMap.size % 5 === 0,
                  rating: 4.7,
                  reviews: 20 + (skuMap.size % 60),
                  stock: (skuMap.size % 6) + 1,
              });
          }
          totalProcessed++;
        } catch (err) {
          console.log(`Failed to process ${link}`, err.message);
        }
      }
  }

  const products = Array.from(skuMap.values());
  const content = `import { Product } from "../types";\n\nexport const scrapedProducts: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  await fs.writeFile("data/scrapedProducts.ts", content, "utf8");
  console.log(`Scraped products grouped by SKU: ${products.length} (Total processed variants: ${totalProcessed})`);
};

run().catch(console.error);
