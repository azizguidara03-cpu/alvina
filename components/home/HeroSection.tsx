"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useTranslation } from "@/lib/translations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Stagger animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const lineReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0 0 0)",
    opacity: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay },
  }),
};



// Floating particle config
const particles = [
  { left: "15%", top: "65%", size: 3, duration: 4.2, delay: 1.5 },
  { left: "78%", top: "50%", size: 2, duration: 5.8, delay: 2.1 },
  { left: "42%", top: "70%", size: 4, duration: 3.9, delay: 0.8 },
  { left: "60%", top: "60%", size: 2, duration: 6.1, delay: 3.0 },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const heroImages = [
    "https://cdn.alvinaonline.com/ContentImages/Banner/4976E20BE1F944179A3DB7B5926C5104.jpg",
    "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KMNT0090605-020/90605-molly-manto-40-48-tek42_26kmnt0090605-020_a-bej-bej_4_enbuyuk.jpg",
    "https://cdn.alvinaonline.com/ContentImages/Product/2026-kis/26KTRC0010986-020/10986-edna-suet-trenckot-38-46-tek-42_26ktrc0010986-020_a-bej-bej_1_enbuyuk.jpg",
  ];
  const heroImagePositions = [
    "center 22%", // slide 1 (jaune)
    "center 8%",  // slide 2: show more full body
    "center 6%",  // slide 3: show more full body
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const slideTheme = [
    {
      primaryBtn: "bg-[#E6D4AF] hover:bg-[#d8c08d] text-[#3f3224]",
      secondaryBtn:
        "bg-black/20 backdrop-blur-sm text-[#F8EED8] border border-[#E6D4AF]/80 hover:bg-[#E6D4AF]/20 hover:border-[#E6D4AF]",
    },
    {
      primaryBtn: "bg-[#DCC7A2] hover:bg-[#cbb185] text-[#2f261c]",
      secondaryBtn:
        "bg-black/25 backdrop-blur-sm text-[#F1E7D0] border border-[#DCC7A2]/70 hover:bg-[#DCC7A2]/20 hover:border-[#DCC7A2]",
    },
    {
      primaryBtn: "bg-[#F1E1C3] hover:bg-[#e7d1a6] text-[#44321f]",
      secondaryBtn:
        "bg-black/15 backdrop-blur-sm text-[#FCF2E0] border border-[#F1E1C3]/80 hover:bg-[#F1E1C3]/20 hover:border-[#F1E1C3]",
    },
  ][heroIndex % 3];

  // GSAP parallax scroll effect on image
  useEffect(() => {
    if (!imageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#0F0E0D]">
      {/* ── HERO IMAGE — BUG #2 FIX ──────────────────────────────────────
          - No filter applied (removes color distortion in light mode)
          - Appearance controlled exclusively through overlays
          - Image fades in from scale 1.08 → 1.0 (cinematic entrance)
          ────────────────────────────────────────────────────────────── */}
      <div ref={imageRef} className="absolute inset-0 w-full h-[130%] hero-image-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1.09, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.03, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 1.35, ease: "easeInOut" }}
          >
            <Image
              src={heroImages[heroIndex]}
              alt="Alvina Haute Couture — Collection SS 2025"
              fill
              className="object-cover"
              style={{ objectPosition: heroImagePositions[heroIndex] || "center 20%" }}
              priority
              unoptimized
              onError={() => setHeroIndex((prev) => (prev < heroImages.length - 1 ? prev + 1 : prev))}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── ADAPTIVE GRADIENT OVERLAY — BUG #2 FIX ───────────────────────
          Light mode: very light cream tint at top + dark at bottom for text
          Dark mode:  deeper dark vignette for cinematic effect
          ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/52 via-black/22 to-transparent" />
      {/* Extra bottom fade to ensure text readability on all screens */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/55 to-transparent z-[2]" />

      {/* ── HERO CONTENT — BUG #3 FIX ────────────────────────────────────
          Full editorial hierarchy with Cormorant Garamond
          ────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-center text-white px-6 md:px-16 text-center md:text-left z-10 mt-16">

        {/* Gold label */}
        <motion.div
          custom={0.4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          <span className="text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-sans font-medium">
            {t.heroCollection}
          </span>
        </motion.div>

        {/* Animated gold line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "60px", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
          className="h-[1px] bg-gold mb-8 md:mb-10"
        />

        {/* Headline — clip-path line reveal, staggered */}
        <h1 className="font-serif font-light leading-[0.92] tracking-[-0.02em] mb-7 md:mb-10 overflow-hidden">
          {[t.heroLine1, t.heroLine2, t.heroLine3].map((line, i) => (
            <motion.span
              key={line}
              custom={0.6 + i * 0.18}
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="block"
              style={{
                fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
              }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          custom={1.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-white/75 font-sans text-xs md:text-sm tracking-[0.2em] uppercase mb-10 md:mb-12 hidden sm:block"
        >
          {t.heroSub}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={1.35}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <Link
            href="/shop"
            className={`luxury-button ${slideTheme.primaryBtn} px-10 py-4 tracking-[0.15em] uppercase text-xs font-sans transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)]`}
          >
            {t.heroDiscover}
          </Link>
          <Link
            href="/about"
            className={`luxury-button ${slideTheme.secondaryBtn} px-10 py-4 tracking-[0.15em] uppercase text-xs font-sans transition-all duration-300`}
          >
            {t.heroStory}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-14 right-8 md:right-14 z-10 flex items-center gap-2">
        {heroImages.map((_, i) => (
          <button
            key={`hero-dot-${i}`}
            aria-label={`Afficher la slide ${i + 1}`}
            onClick={() => setHeroIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === heroIndex ? "w-10 bg-[#E8D7B3]" : "w-4 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ── FLOATING PARTICLES ──────────────────────────────────────────── */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle z-[3]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold transition-colors z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans">{t.heroScroll}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={20} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}
