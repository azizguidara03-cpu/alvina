import { Suspense } from "react";
import { products } from "@/data/products";
import ProductGrid from "@/components/shop/ProductGrid";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ShopHeader from "@/components/shop/ShopHeader";

export const metadata = {
  title: "Boutique | ALVINA",
  description: "Découvrez la collection complète ALVINA — robes, manteaux, ensembles et accessoires de mode modeste.",
};

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; maxPrice?: string };
}) {
  const category = searchParams.category || "all";
  const sort = searchParams.sort || "newest";
  const maxPrice = Number(searchParams.maxPrice || "500");
  const availableCategories = Array.from(new Set(products.map((p) => p.category)));

  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category);
  }

  filtered = filtered.filter((p) => p.price <= maxPrice);

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "popularity") {
    filtered.sort((a, b) => b.reviews - a.reviews);
  } else {
    // newest first
    filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <ShopHeader count={filtered.length} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
        <div className="col-span-1">
          <Suspense fallback={<div className="h-64 animate-pulse bg-champagne/50 rounded" />}>
            <FilterSidebar currentCategory={category} availableCategories={availableCategories} />
          </Suspense>
        </div>
        <div className="md:col-span-3">
          <ProductGrid products={filtered} />
        </div>
      </div>
    </main>
  );
}
