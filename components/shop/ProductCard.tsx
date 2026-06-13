"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { useLocaleStore } from "@/store/localeStore";
import { useTranslation } from "@/lib/translations";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const setCursorText = useUiStore((state) => state.setCursorText);
  const { convertPrice } = useLocaleStore();
  const { t, tp } = useTranslation();
  const [mainImage, setMainImage] = useState(product.images[0] || "");
  const [hoverImage, setHoverImage] = useState(product.images[1] || product.images[0] || "");
  const [isImageInvalid, setIsImageInvalid] = useState(!product.images[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
      quantity: 1,
    });
  };

  if (isImageInvalid) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block"
        onMouseEnter={() => setCursorText("Voir")}
        onMouseLeave={() => setCursorText("")}
      >
        <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-champagne">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-1"
            onError={() => setIsImageInvalid(true)}
          />
          {product.images[1] && (
            <Image
              src={hoverImage}
              alt={`${product.name} — vue 2`}
              fill
              unoptimized
              className="object-cover absolute inset-0 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
              onError={() => setHoverImage(mainImage)}
            />
          )}

          {/* Badges — BUG #1 FIX: use adaptive tokens instead of hardcoded bg-white/text-charcoal */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isNew && (
              <span className="bg-[var(--bg-card)] text-[var(--text-primary)] text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-medium">
                {t.categoryNew}
              </span>
            )}
            {product.isBestseller && (
              <span className="bg-gold text-white text-[9px] tracking-[0.15em] uppercase px-2 py-1 font-medium">
                {t.categoryBest}
              </span>
            )}
          </div>

          {/* Quick Add — BUG #1 FIX: adaptive bg/text tokens */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
            <button
              onClick={handleAddToCart}
              className="luxury-button w-full bg-[var(--bg-inverse)]/90 backdrop-blur-sm text-[var(--text-inverse)] py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-white transition-colors duration-300"
            >
              {t.addToCart}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center text-center px-2">
          <span className="text-[10px] text-[var(--text-secondary)] tracking-[0.2em] uppercase mb-1.5">
            {product.category === "veste"
              ? t.catCoats
              : product.category === "robes"
              ? t.catDresses
              : product.category === "pantalon"
              ? t.catSets
              : product.category === "abaya"
              ? t.catAbaya
              : t.catAccessories}
          </span>
          <h3 className="font-serif text-base md:text-lg mb-2 group-hover:text-gold transition-colors duration-300 leading-snug text-[var(--text-primary)]">
            {tp(product.name)}
          </h3>
          <div className="flex gap-3 items-center">
            {product.originalPrice && (
              <span suppressHydrationWarning className="text-[var(--text-secondary)] line-through text-sm">
                {convertPrice(product.originalPrice)}
              </span>
            )}
            <span suppressHydrationWarning className="text-[var(--text-primary)] text-sm font-medium">
              {convertPrice(product.price)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
