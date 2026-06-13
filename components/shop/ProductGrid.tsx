"use client";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { useTranslation } from "@/lib/translations";

export default function ProductGrid({ products }: { products: Product[] }) {
  const { t } = useTranslation();
  if (products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-warm-gray">
        <p className="text-xl font-serif">{t.shopNoMatch}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 gap-y-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
