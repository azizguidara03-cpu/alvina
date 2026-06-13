"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useState } from "react";
import { useTranslation } from "@/lib/translations";
import { useLocaleStore } from "@/store/localeStore";

const newArrivals = products.filter((p) => p.isNew).slice(0, 8);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const } },
};

export default function NewArrivals() {
  const { t, tp } = useTranslation();
  const { convertPrice, currency } = useLocaleStore();
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  if (newArrivals.length === 0) return null;

  return (
    // BUG #1 FIX: Uses adaptive bg-[var(--bg-secondary)] to swap between F7F3EE / #111
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)] text-[var(--text-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="text-gold tracking-[0.25em] text-xs uppercase font-medium mb-3 block">
              {t.categoryNew} · SS2026
            </span>
            <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-4">
              {t.newArrivalsTitle}
            </h2>
            <div className="w-16 h-px bg-gold" />
          </div>
          <Link
            href="/shop?sort=newest"
            className="luxury-link text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors pb-1 border-b border-[var(--border-color)] hover:border-gold self-start md:self-auto whitespace-nowrap"
          >
            {t.searchViewAll} →
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {newArrivals.filter((product) => !brokenImages[product.id]).map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link href={`/shop/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-champagne">
                  <Image
                    src={product.colors[0]?.images?.[0] || product.images[0]}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() =>
                      setBrokenImages((prev) => ({
                        ...prev,
                        [product.id]: true,
                      }))
                    }
                  />
                  {product.isNew && (
                    // Badge text over dark bg — white is correct (WCAG AA)
                    <span className="absolute top-3 left-3 bg-[var(--bg-inverse)] text-[var(--text-inverse)] text-[9px] tracking-[0.15em] uppercase px-2 py-1">
                      {t.categoryNew}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-sm md:text-base leading-snug mb-1.5 group-hover:text-gold transition-colors duration-300 text-[var(--text-primary)]">
                    {tp(product.name)}
                  </h3>
                  <p suppressHydrationWarning className="text-[var(--text-secondary)] text-sm">
                    {convertPrice(product.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
