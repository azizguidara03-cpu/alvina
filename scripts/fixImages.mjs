import fs from "fs/promises";

const run = async () => {
  try {
    const file = "data/scrapedProducts.ts";
    let data = await fs.readFile(file, "utf8");
    
    // Replace all _4_enbuyuk.jpg, _5_enbuyuk.jpg, etc. with _1_enbuyuk.jpg
    // We can just regex replace _[2-9]_enbuyuk\.jpg with _1_enbuyuk.jpg
    data = data.replace(/_([2-9])_enbuyuk\.jpg/g, "_1_enbuyuk.jpg");
    data = data.replace(/_([2-9])_659x985\.jpg/g, "_1_659x985.jpg");

    await fs.writeFile(file, data, "utf8");
    console.log("Fixed images in data/scrapedProducts.ts");
  } catch (err) {
    console.error(err);
  }
};

run();
