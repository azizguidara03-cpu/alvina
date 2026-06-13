"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useUiStore } from "@/store/uiStore";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/translations";

export default function LookbookSection() {
  const { setCursorText } = useUiStore();
  const { t, tp } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);
  const mainProduct = bestsellers[0];
  const sideProducts = bestsellers.slice(1, 4);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const images = containerRef.current.querySelectorAll(".lookbook-img");
    gsap.fromTo(
      images,
      { scale: 1.08, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.3,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 72%" },
      }
    );
  }, []);

  if (!mainProduct || sideProducts.length < 3) return null;

  return (
    // BUG #1 FIX: Uses adaptive bg-cream token instead of hardcoded colors
    <section
      ref={containerRef}
      className="py-24 px-6 md:px-12 bg-cream"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-4 text-[var(--text-primary)]">
              {t.lookbookTitle}
            </h2>
            <div className="w-16 h-px bg-gold" />
          </motion.div>
          <Link
            href="/shop"
            className="luxury-link text-sm tracking-[0.15em] uppercase hover:text-gold transition-colors pb-1 border-b border-[var(--border-color)] hover:border-gold self-start md:self-auto"
          >
            {t.searchViewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main large image */}
          <Link
            href={`/shop/${mainProduct.slug}`}
            className="lg:col-span-7 relative group block h-[500px] lg:h-[720px] overflow-hidden"
            onMouseEnter={() => setCursorText("Voir")}
            onMouseLeave={() => setCursorText("")}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <Image
              src={mainProduct.colors[0]?.images?.[0] || mainProduct.images[0]}
              alt={mainProduct.name}
              fill
              unoptimized
              className="object-cover lookbook-img transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Text over image — white is correct (dark overlay guarantees contrast) */}
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <div className="h-px bg-gold w-0 group-hover:w-12 transition-all duration-500 mb-3" />
              <h3 className="font-serif text-2xl md:text-3xl tracking-widest mb-2 text-white">
                {tp(mainProduct.name)}
              </h3>
              <span className="text-xs tracking-[0.2em] uppercase border-b border-gold/60 pb-0.5 text-white/80">
                {t.shopTheLook}
              </span>
            </div>
          </Link>

          {/* 3 stacked side images */}
          <div className="lg:col-span-5 grid grid-rows-3 gap-4 lg:gap-6 h-[600px] lg:h-[720px]">
            {sideProducts.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="relative group block overflow-hidden"
                onMouseEnter={() => setCursorText("Voir")}
                onMouseLeave={() => setCursorText("")}
              >
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <Image
                  src={product.colors[0]?.images?.[0] || product.images[0]}
                  alt={product.name}
                  fill
                  unoptimized
                  className="object-cover lookbook-img transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <h3 className="font-serif text-base tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1.5 text-white">
                    {tp(product.name)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
