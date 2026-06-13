"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/lib/translations";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );
    });

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: { trigger: item, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="pt-0">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[80vh] md:h-[100dvh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558171813-fb5d6f07d45e?w=1600&q=85&fit=crop"
          alt="Alvina Atelier Istanbul"
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay — intentional, always dark for cinematic feel */}
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="max-w-3xl">
            <motion.div
              className="h-px bg-gold w-0 mx-auto mb-8"
              animate={{ width: "80px" }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            {/* BUG #1 FIX: text-white is correct here — over dark overlay on image */}
            <h1 className="text-white font-serif text-5xl md:text-7xl tracking-widest uppercase mb-6">
              {t.aboutHeroTitle}
            </h1>
            <p className="text-white/75 text-lg md:text-xl font-light italic font-serif">
              {t.aboutHeroSub}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── STORY SECTIONS ───────────────────────────────────────────── */}
      {/* BUG #1 FIX: All body text now uses text-[var(--text-secondary)] instead of
          text-warm-gray (which stays adaptive) and headings use default adaptive color */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-28">

        {/* Notre Histoire */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] md:aspect-square overflow-hidden bg-champagne">
            <Image
              src="\0a1c8049ea123fef6ebc69ba2a20b878.jpg"
              alt="Histoire Alvina"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="md:pl-12">
            <span className="text-gold tracking-[0.25em] text-xs uppercase font-medium mb-4 block">
              Depuis 2010
            </span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest mb-6 text-[var(--text-primary)]">
              {t.aboutStoryTitle}
            </h2>
            <div className="h-px bg-gold w-16 mb-8" />
            <p className="text-[var(--text-secondary)] leading-loose mb-6">
              {t.aboutStoryP1}
            </p>
            <p className="text-[var(--text-secondary)] leading-loose">
              {t.aboutStoryP2}
            </p>
          </div>
        </div>

        {/* Notre Vision */}
        <div className="reveal-section grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 md:pr-12 flex flex-col items-start md:items-end text-left md:text-right">
            <span className="text-gold tracking-[0.25em] text-xs uppercase font-medium mb-4 block">
              Mode Modeste
            </span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-widest mb-6 text-[var(--text-primary)]">
              {t.aboutVisionTitle}
            </h2>
            <div className="h-px bg-gold w-16 mb-8" />
            <p className="text-[var(--text-secondary)] leading-loose mb-6">
              {t.aboutVisionP1}
            </p>
            <p className="text-[var(--text-secondary)] leading-loose">
              {t.aboutVisionP2}
            </p>
          </div>
          <div className="order-1 md:order-2 relative aspect-[3/4] md:aspect-square overflow-hidden bg-champagne">
            <Image
              src="\321261b58b71cb6fbb5eeb75825e40d7.jpg"
              alt="Vision Alvina"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────── */}
      {/* BUG #1 FIX: Uses bg-champagne (adaptive token) + text-[var(--text-primary)] */}
      <section className="bg-champagne py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2010", label: t.aboutStatsSince },
            { value: "50+", label: t.aboutStatsCountries },
            { value: "500+", label: t.aboutStatsModels },
            { value: "1M+", label: t.aboutStatsClients },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-serif text-3xl md:text-4xl text-gold mb-2">{stat.value}</p>
              <p className="text-[var(--text-secondary)] text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      {/* This section is intentionally always dark — explicit dark palette */}
      <section className="bg-[#111008] text-[#FAF7F2] py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-center text-3xl md:text-4xl uppercase tracking-widest mb-16 text-[#FAF7F2]">
            {t.aboutEvoTitle}
          </h2>
          <div className="relative border-l border-gold/30 pl-8 ml-4 md:ml-12 space-y-16">
            {[
              { year: "2010", title: t.aboutEvo1, desc: t.aboutEvo1Desc },
              { year: "2015", title: t.aboutEvo2, desc: t.aboutEvo2Desc },
              { year: "2019", title: t.aboutEvo3, desc: t.aboutEvo3Desc },
              { year: "2020", title: t.aboutEvo4, desc: t.aboutEvo4Desc },
              { year: "2025", title: t.aboutEvo5, desc: t.aboutEvo5Desc },
            ].map((item) => (
              <div key={item.year} className="timeline-item relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gold" />
                <span className="text-gold font-serif text-2xl">{item.year}</span>
                <h3 className="text-lg tracking-widest uppercase mt-2 mb-3 text-[#FAF7F2]">{item.title}</h3>
                <p className="text-[#8C8279] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
