"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/translations";
import { products } from "@/data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.0, 0.0, 0.2, 1] as const, delay: i * 0.15 },
  }),
};

export default function FeaturedCollections() {
  const { t, tp } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const robesProduct = products.find(p => p.category === "Robe de Soirée" || p.category === "Robe");
  const abayaProduct = products.find(p => p.category === "Abaya");
  const chemisierProduct = products.find(p => p.category === "Chemisier");

  const collections = [
    {
      title: tp("Robe de Soirée"),
      subtitle: t.collectionSub,
      image: robesProduct?.colors[0]?.images?.[0] || robesProduct?.images?.[0] || "",
      slug: "Robe%20de%20Soirée",
    },
    {
      title: tp("Abaya"),
      subtitle: t.collectionSub,
      image: abayaProduct?.colors[0]?.images?.[0] || abayaProduct?.images?.[0] || "",
      slug: "Abaya",
    },
    {
      title: tp("Chemisier"),
      subtitle: t.collectionSub,
      image: chemisierProduct?.colors[0]?.images?.[0] || chemisierProduct?.images?.[0] || "",
      slug: "Chemisier",
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  return (
    // BUG #1 FIX: Uses adaptive bg-cream (token) and omits hardcoded text colors
    <section className="py-24 px-6 md:px-12 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-serif tracking-widest uppercase mb-4 opacity-0 text-[var(--text-primary)]"
          >
            {t.collectionsTitle}
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
            >
              <Link
                href={`/shop?category=${collection.slug}`}
                className="group relative aspect-[3/4] overflow-hidden block"
              >
                <div className="absolute inset-0">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                {/* Strong gradient overlay to ensure text contrast — WCAG AA compliant */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-colors duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="h-px bg-gold w-0 group-hover:w-12 transition-all duration-500 mb-4" />
                  {/* Text over image overlay — white is correct here for contrast */}
                  <h3 className="text-2xl font-serif tracking-widest uppercase mb-1 text-white">
                    {collection.title}
                  </h3>
                  <p className="text-white/60 text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {collection.subtitle}
                  </p>
                  <span className="mt-3 inline-block text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75 border-b border-gold pb-0.5 text-white">
                    {t.discoverBtn}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
