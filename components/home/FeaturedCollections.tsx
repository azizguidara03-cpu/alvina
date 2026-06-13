"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useTranslation } from "@/lib/translations";

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
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);

  const collections = [
    {
      title: t.catDresses,
      subtitle: t.coll1Sub,
      image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KELB0045823-001/45823-2-li-triko-elbise-38-46_26kelb0045823-001_siyah-siyah_1_659x985.jpg",
      slug: "robes",
    },
    {
      title: t.catCoats,
      subtitle: t.coll2Sub,
      image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KKBN0090603-036/90603-winter-almeda-kaban-38-46-tek42_26kkbn0090603-036_gumus-gumus_3_659x985.jpg",
      slug: "veste",
    },
    {
      title: t.catSets,
      subtitle: t.coll3Sub,
      image: "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KTKP0046020-045/46020-17235-2li-pant-tk-38-42-tek38-cift40_26ktkp0046020-045_kahve-kahve_1_659x985.jpg",
      slug: "pantalon",
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
